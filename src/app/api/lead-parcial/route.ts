import { NextResponse } from 'next/server';
import { enviarLead } from '@/app/actions/enviar-lead';

/**
 * Recebe o lead parcial da etapa 1 (§7.12).
 *
 * É best-effort: o formulário dispara e segue para a etapa 2 sem esperar. Por
 * isso a resposta é sempre 200, falha aqui não pode travar o usuário, e o
 * lead completo ainda vai chegar pela Server Action.
 */
export async function POST(requisicao: Request) {
  try {
    const formData = await requisicao.formData();
    formData.set('etapa', 'parcial');
    await enviarLead({ status: 'inicial' }, formData);
  } catch (erro) {
    console.error('[lead-parcial] falha ao registrar', erro);
  }
  return NextResponse.json({ ok: true });
}
