'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { enviarLead } from '@/app/actions/enviar-lead';
import type { EstadoEnvio } from '@/lib/lead';
import { SITE, preenchido, linkTelefone, linkWhatsApp } from '@/config/site';
import { rastrear } from '@/lib/analytics';

const INICIAL: EstadoEnvio = { status: 'inicial' };

const SEGMENTOS = [
  'Alimentos e bebidas',
  'Papel e celulose',
  'Química',
  'Farmacêutica',
  'Têxtil',
  'Frigorífico',
  'Sucroalcooleira',
  'Outro',
];

const FAIXAS = [
  { valor: 'ate-100', rotulo: 'Até 100' },
  { valor: '100-250', rotulo: '100 a 250' },
  { valor: '250-500', rotulo: '250 a 500' },
  { valor: 'mais-500', rotulo: 'Mais de 500' },
  { valor: 'nao-sei', rotulo: 'Não sei' },
];

/**
 * Formulário em duas etapas (§7.12).
 *
 * O lead é enviado ao final da etapa 1 também (lead parcial), para não perder
 * quem abandona antes de qualificar a planta.
 */
export function FormDiagnostico() {
  const [estado, acao, pendente] = useActionState(enviarLead, INICIAL);
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [contato, setContato] = useState({ nome: '', whatsapp: '', email: '' });

  const erros = estado.status === 'erro' ? (estado.campos ?? {}) : {};

  if (estado.status === 'ok') {
    const wpp = linkWhatsApp('Olá! Acabei de solicitar um diagnóstico pelo site.');
    return (
      <div className="card pilha-4" role="status" aria-live="polite">
        <h3 className="t-h3">Recebemos sua solicitação.</h3>
        <p className="t-body t-mudo">
          Um especialista entra em contato pelo WhatsApp em até 1 dia útil.
        </p>
        {wpp ? (
          <a href={wpp} className="btn btn-primario" target="_blank" rel="noopener noreferrer">
            Se preferir adiantar, chame agora
          </a>
        ) : preenchido(SITE.email) ? (
          <a href={`mailto:${SITE.email}`} className="btn btn-primario">
            Se preferir adiantar, escreva para {SITE.email}
          </a>
        ) : null}
      </div>
    );
  }

  const avancar = () => {
    // Envia o lead parcial antes de pedir os dados da planta.
    const dados = new FormData();
    dados.set('nome', contato.nome);
    dados.set('whatsapp', contato.whatsapp);
    dados.set('email', contato.email);
    dados.set('consentimento', 'true');
    dados.set('website', '');
    dados.set('etapa', 'parcial');
    void fetch('/api/lead-parcial', {
      method: 'POST',
      body: dados,
    }).catch(() => {
      /* lead parcial é best-effort: nunca bloqueia o usuário */
    });
    rastrear({ nome: 'lead_etapa1' });
    setEtapa(2);
  };

  const contatoCompleto =
    contato.nome.trim().length >= 3 &&
    contato.whatsapp.trim().length >= 10 &&
    contato.email.includes('@');

  const tel = linkTelefone();

  return (
    <div className="card pilha-6">
      <div className="pilha-2">
        <div className="barra-progresso" aria-hidden="true">
          <span style={{ width: etapa === 1 ? '50%' : '100%' }} />
        </div>
        <p className="t-small t-mudo">
          Etapa {etapa} de 2 — {etapa === 1 ? 'contato' : 'sua planta'}
        </p>
      </div>

      <form action={acao} className="pilha-4">
        <input type="hidden" name="etapa" value="completo" />
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Não preencha este campo</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div style={{ display: etapa === 1 ? 'flex' : 'none', flexDirection: 'column', gap: 16 }}>
          <div className="campo">
            <label className="campo-rotulo" htmlFor="nome">
              Nome completo
            </label>
            <input
              id="nome"
              name="nome"
              className="campo-input"
              autoComplete="name"
              required
              value={contato.nome}
              onChange={(e) => setContato((c) => ({ ...c, nome: e.target.value }))}
              aria-invalid={erros.nome ? 'true' : undefined}
            />
            {erros.nome ? <p className="campo-erro">{erros.nome}</p> : null}
          </div>

          <div className="campo">
            <label className="campo-rotulo" htmlFor="whatsapp">
              WhatsApp
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              className="campo-input"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(41) 99999-9999"
              required
              value={contato.whatsapp}
              onChange={(e) => setContato((c) => ({ ...c, whatsapp: e.target.value }))}
              aria-invalid={erros.whatsapp ? 'true' : undefined}
            />
            {erros.whatsapp ? <p className="campo-erro">{erros.whatsapp}</p> : null}
          </div>

          <div className="campo">
            <label className="campo-rotulo" htmlFor="email">
              E-mail corporativo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="campo-input"
              autoComplete="email"
              required
              value={contato.email}
              onChange={(e) => setContato((c) => ({ ...c, email: e.target.value }))}
              aria-invalid={erros.email ? 'true' : undefined}
            />
            {erros.email ? <p className="campo-erro">{erros.email}</p> : null}
          </div>

          <button
            type="button"
            className="btn btn-primario"
            onClick={avancar}
            disabled={!contatoCompleto}
          >
            Continuar
          </button>
        </div>

        <div style={{ display: etapa === 2 ? 'flex' : 'none', flexDirection: 'column', gap: 16 }}>
          <div className="campo">
            <label className="campo-rotulo" htmlFor="empresa">
              Empresa
            </label>
            <input id="empresa" name="empresa" className="campo-input" autoComplete="organization" />
          </div>

          <div className="campo">
            <label className="campo-rotulo" htmlFor="cidadeUf">
              Cidade / UF da planta
            </label>
            <input id="cidadeUf" name="cidadeUf" className="campo-input" placeholder="Ponta Grossa / PR" />
          </div>

          <div className="campo">
            <label className="campo-rotulo" htmlFor="faixaPurgadores">
              Quantidade aproximada de purgadores
            </label>
            <select id="faixaPurgadores" name="faixaPurgadores" className="campo-select" defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              {FAIXAS.map((f) => (
                <option key={f.valor} value={f.valor}>
                  {f.rotulo}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label className="campo-rotulo" htmlFor="segmento">
              Segmento
            </label>
            <select id="segmento" name="segmento" className="campo-select" defaultValue="">
              <option value="" disabled>
                Selecione
              </option>
              {SEGMENTOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <input
              id="consentimento"
              name="consentimento"
              type="checkbox"
              required
              style={{ marginTop: 4, width: 20, height: 20, flexShrink: 0 }}
              aria-invalid={erros.consentimento ? 'true' : undefined}
            />
            <label htmlFor="consentimento" className="t-small">
              Autorizo a Oikos a usar meus dados para retornar este contato comercial, conforme a{' '}
              <Link href="/politica-de-privacidade" className="link-azul">
                política de privacidade
              </Link>
              .
            </label>
          </div>
          {erros.consentimento ? <p className="campo-erro">{erros.consentimento}</p> : null}

          <div className="linha-botoes">
            <button type="button" className="btn btn-secundario" onClick={() => setEtapa(1)}>
              Voltar
            </button>
            <button type="submit" className="btn btn-primario" disabled={pendente} style={{ flex: 1 }}>
              {pendente ? 'Enviando…' : 'Solicitar diagnóstico'}
            </button>
          </div>
        </div>

        <div aria-live="polite">
          {estado.status === 'erro' ? <p className="campo-erro">{estado.mensagem}</p> : null}
        </div>
      </form>

      {/* Muita gente não preenche formulário nenhum (§7.12). */}
      <div className="pilha-2" style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
        <p className="t-small" style={{ fontWeight: 600 }}>
          Prefere falar direto?
        </p>
        {tel && preenchido(SITE.telefone) ? (
          <a href={tel} className="t-small link-azul num">
            {SITE.telefone}
          </a>
        ) : null}
        {preenchido(SITE.email) ? (
          <a href={`mailto:${SITE.email}`} className="t-small link-azul">
            {SITE.email}
          </a>
        ) : null}
      </div>
    </div>
  );
}
