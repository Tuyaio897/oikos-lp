import Link from 'next/link';
import Image from 'next/image';
import { RODAPE } from '@/config/navegacao';
import {
  SITE,
  ENDERECO_LINHA,
  preenchido,
  linkTelefone,
  linkEmail,
} from '@/config/site';

/**
 * Rodapé institucional (§5 e §12).
 *
 * Para o comprador industrial, a ausência de CNPJ, endereço e telefone é sinal
 * de que "não existe empresa". Cada campo só aparece quando tem valor real —
 * ver `preenchido()` em src/config/site.ts.
 */
export function Footer() {
  const tel = linkTelefone();
  const mail = linkEmail();

  return (
    <footer className="secao-escura" style={{ paddingBlock: 64 }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gap: 40,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          <div className="pilha-4">
            <Image
              src="/imagens/logo-oikos.svg"
              alt="Oikos"
              width={120}
              height={32}
              style={{ height: 32, width: 'auto' }}
            />
            <p className="t-small t-mudo" style={{ maxWidth: '30ch' }}>
              Engenharia de eficiência térmica para sistemas de vapor industriais.
              Inspeção de purgadores, laudo de perdas e gestão contínua.
            </p>
            <p className="t-small t-mudo">
              Atendimento em {SITE.regiaoAtendimentoTexto}.
            </p>
          </div>

          {RODAPE.map((coluna) => (
            <nav key={coluna.titulo} aria-label={coluna.titulo}>
              <h2 className="t-small" style={{ fontWeight: 600, marginBottom: 12, color: '#FFFFFF' }}>
                {coluna.titulo}
              </h2>
              <ul style={{ listStyle: 'none' }} className="pilha-2">
                {coluna.itens.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="t-small t-mudo">
                      {item.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="t-small" style={{ fontWeight: 600, marginBottom: 12, color: '#FFFFFF' }}>
              Contato
            </h2>
            <ul style={{ listStyle: 'none' }} className="pilha-2">
              {tel && preenchido(SITE.telefone) ? (
                <li>
                  <a href={tel} className="t-small t-mudo num">
                    {SITE.telefone}
                  </a>
                </li>
              ) : null}
              {mail ? (
                <li>
                  <a href={mail} className="t-small t-mudo">
                    {SITE.email}
                  </a>
                </li>
              ) : null}
              <li className="t-small t-mudo">{ENDERECO_LINHA}</li>
              <li className="t-small t-mudo">{SITE.horarioAtendimento}</li>
              {preenchido(SITE.linkedin) ? (
                <li>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-small t-mudo"
                  >
                    LinkedIn
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,.15)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'space-between',
          }}
        >
          <p className="t-small t-mudo">
            {SITE.razaoSocial} — CNPJ {SITE.cnpj}
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/politica-de-privacidade" className="t-small t-mudo">
              Política de privacidade
            </Link>
            <Link href="/termos-de-uso" className="t-small t-mudo">
              Termos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
