import type { Metadata } from 'next';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { FormDiagnostico } from '@/components/forms/FormDiagnostico';
import {
  SITE,
  ENDERECO_LINHA,
  preenchido,
  linkTelefone,
  linkEmail,
  linkWhatsApp,
} from '@/config/site';
import { OFERTA } from '@/config/oferta';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Fale com a Oikos: telefone, e-mail e formulário para solicitar o diagnóstico de purgadores da sua planta. Atendimento em SP, PR e SC.',
  alternates: { canonical: '/contato' },
};

export default function Contato() {
  const tel = linkTelefone();
  const mail = linkEmail('Diagnóstico de purgadores');
  const wpp = linkWhatsApp('Olá! Gostaria de falar sobre inspeção de purgadores.');

  return (
    <Secao>
      <div className="grade-2">
        <div className="pilha-8">
          <TituloSecao
            nivel={1}
            titulo="Falar com um especialista"
            lead="Conte o tamanho aproximado do seu parque e a cidade da planta. Retornamos em até 1 dia útil."
          />

          <div className="pilha-4">
            <h2 className="t-h3">Canais diretos</h2>
            <ul style={{ listStyle: 'none' }} className="pilha-4">
              {tel && preenchido(SITE.telefone) ? (
                <li>
                  <p className="t-small t-mudo">Telefone</p>
                  <a href={tel} className="t-body-lg link-azul num">
                    {SITE.telefone}
                  </a>
                </li>
              ) : null}
              {wpp ? (
                <li>
                  <p className="t-small t-mudo">WhatsApp</p>
                  <a
                    href={wpp}
                    className="t-body-lg link-azul"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir conversa
                  </a>
                </li>
              ) : null}
              {mail && preenchido(SITE.email) ? (
                <li>
                  <p className="t-small t-mudo">E-mail</p>
                  <a href={mail} className="t-body-lg link-azul">
                    {SITE.email}
                  </a>
                </li>
              ) : null}
              <li>
                <p className="t-small t-mudo">Localização</p>
                <p className="t-body">{ENDERECO_LINHA}</p>
              </li>
              <li>
                <p className="t-small t-mudo">Horário de atendimento</p>
                <p className="t-body">{SITE.horarioAtendimento}</p>
              </li>
              <li>
                <p className="t-small t-mudo">Região de atendimento</p>
                <p className="t-body">{SITE.regiaoAtendimentoTexto}</p>
              </li>
            </ul>
          </div>

          <div className="card card-filete pilha-2">
            <h2 className="t-h3">{OFERTA.nome}</h2>
            <p className="t-body" style={{ fontWeight: 600 }}>
              {OFERTA.chamada}
            </p>
            <p className="t-body t-mudo">{OFERTA.explicacao}</p>
          </div>
        </div>

        <FormDiagnostico />
      </div>
    </Secao>
  );
}
