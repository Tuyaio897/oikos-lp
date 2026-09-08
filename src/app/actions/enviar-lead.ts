'use server';

import { headers } from 'next/headers';
import { SITE } from '@/config/site';
import { LeadSchema, FAIXAS_PURGADORES, type Lead, type EstadoEnvio } from '@/lib/lead';

/**
 * Rate limit em memória por IP.
 *
 * O §10.2 pede @upstash/ratelimit, que exige um Redis provisionado. Enquanto a
 * infraestrutura não existe, este limitador cobre o caso real (bot batendo no
 * mesmo endpoint) sem adicionar uma dependência que quebraria o build por falta
 * de variável de ambiente. Ver docs/DECISOES.md.
 */
const JANELA_MS = 60_000;
const MAX_POR_JANELA = 5;
const acessos = new Map<string, number[]>();

function excedeuLimite(ip: string): boolean {
  const agora = Date.now();
  const anteriores = (acessos.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  anteriores.push(agora);
  acessos.set(ip, anteriores);
  if (acessos.size > 5000) acessos.clear();
  return anteriores.length > MAX_POR_JANELA;
}

function corpoEmail(lead: Lead): string {
  const linhas = [
    `Etapa: ${lead.etapa === 'parcial' ? 'LEAD PARCIAL (abandonou antes da etapa 2)' : 'completo'}`,
    `Nome: ${lead.nome}`,
    `WhatsApp: ${lead.whatsapp}`,
    `E-mail: ${lead.email}`,
  ];
  if (lead.empresa) linhas.push(`Empresa: ${lead.empresa}`);
  if (lead.cidadeUf) linhas.push(`Cidade/UF: ${lead.cidadeUf}`);
  if (lead.faixaPurgadores) linhas.push(`Purgadores: ${FAIXAS_PURGADORES[lead.faixaPurgadores]}`);
  if (lead.segmento) linhas.push(`Segmento: ${lead.segmento}`);
  return linhas.join('\n');
}

async function dispararEmail(lead: Lead): Promise<void> {
  const chave = process.env.RESEND_API_KEY;
  const para = process.env.LEAD_EMAIL_TO ?? SITE.email;
  const de = process.env.LEAD_EMAIL_FROM;
  if (!chave || !de) return;

  const { Resend } = await import('resend');
  const resend = new Resend(chave);
  await resend.emails.send({
    from: de,
    to: para,
    subject: `[Oikos] ${lead.etapa === 'parcial' ? 'Lead parcial' : 'Novo lead'} — ${lead.nome}`,
    text: corpoEmail(lead),
  });
}

async function dispararWebhook(lead: Lead): Promise<void> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...lead, origem: 'site-oikos', recebidoEm: new Date().toISOString() }),
  });
}

export async function enviarLead(
  _anterior: EstadoEnvio,
  formData: FormData,
): Promise<EstadoEnvio> {
  const bruto = {
    nome: String(formData.get('nome') ?? ''),
    whatsapp: String(formData.get('whatsapp') ?? ''),
    email: String(formData.get('email') ?? ''),
    empresa: (formData.get('empresa') as string) || undefined,
    cidadeUf: (formData.get('cidadeUf') as string) || undefined,
    faixaPurgadores: (formData.get('faixaPurgadores') as string) || undefined,
    segmento: (formData.get('segmento') as string) || undefined,
    consentimento:
      formData.get('consentimento') === 'on' || formData.get('consentimento') === 'true',
    website: String(formData.get('website') ?? ''),
    etapa: String(formData.get('etapa') ?? 'completo'),
  };

  const analise = LeadSchema.safeParse(bruto);
  if (!analise.success) {
    const campos: Record<string, string> = {};
    for (const problema of analise.error.issues) {
      const campo = String(problema.path[0] ?? 'geral');
      campos[campo] ??= problema.message;
    }
    // Honeypot preenchido: responde como sucesso para não ensinar o bot.
    if (campos.website) return { status: 'ok', etapa: 'completo' };
    return { status: 'erro', mensagem: 'Confira os campos destacados.', campos };
  }

  const lead = analise.data;

  const cabecalhos = await headers();
  const ip =
    cabecalhos.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    cabecalhos.get('x-real-ip') ??
    'desconhecido';

  if (excedeuLimite(ip)) {
    return { status: 'erro', mensagem: 'Muitas tentativas. Aguarde um minuto e tente de novo.' };
  }

  try {
    await Promise.all([dispararEmail(lead), dispararWebhook(lead)]);
  } catch (erro) {
    console.error('[enviar-lead] falha ao entregar o lead', erro);
    return {
      status: 'erro',
      mensagem:
        'Não conseguimos registrar seu contato agora. Tente novamente ou fale direto pelo telefone.',
    };
  }

  return { status: 'ok', etapa: lead.etapa };
}
