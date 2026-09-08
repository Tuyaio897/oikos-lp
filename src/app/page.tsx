import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { Dado, ListaFontes } from '@/components/data/Dado';
import { ContadorPerda } from '@/components/data/ContadorPerda';
import { FAQ, FAQJsonLd } from '@/components/blocks/FAQ';
import { FormDiagnostico } from '@/components/forms/FormDiagnostico';
import { PreviaHistorico } from '@/components/blocks/PreviaPainel';
import { FAQ_HOME } from '@/config/faq';
import { OFERTA } from '@/config/oferta';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oikos — Inspeção de purgadores de vapor e gestão de perdas',
  description:
    'Inspeção purgador a purgador com ultrassom, laudo com a perda em R$/ano e gestão contínua no sistema Oikos. Independentes de fabricante. SP, PR e SC.',
  alternates: { canonical: '/' },
};

const SETORES = [
  'Alimentos e bebidas',
  'Papel e celulose',
  'Química',
  'Farmacêutica',
  'Têxtil',
  'Frigoríficos',
];

const PASSOS = [
  {
    numero: '01',
    titulo: 'Inspeção em campo',
    texto:
      'Nosso técnico avalia cada purgador com ultrassom e medição de temperatura. Cada ponto é registrado no aplicativo Oikos com tag, localização, fabricante, modelo, diâmetro e pressão, e recebe o cálculo de perda de massa em kg/h.',
  },
  {
    numero: '02',
    titulo: 'Laudo com a perda em reais',
    texto:
      'Ao final da visita, você recebe o relatório completo: mapa dos purgadores, status de cada um, perda em kg/h e o custo correspondente por hora, mês e ano — no custo de vapor da sua planta. É o documento que sustenta o pedido de verba de manutenção.',
  },
  {
    numero: '03',
    titulo: 'Gestão contínua no sistema Oikos',
    texto:
      'Os dados alimentam o sistema. Sua equipe registra as rondas pelo aplicativo, o histórico de cada purgador fica rastreável por tag, as intervenções são priorizadas por perda estimada e o relatório de economia acumulada é gerado automaticamente.',
  },
];

const COMPARATIVO = [
  {
    antes:
      'Inspeção termina em PDF arquivado em e-mail. Ninguém cruza com a inspeção anterior.',
    depois:
      'Registro digital em campo, disponível no mesmo dia, comparável com todo o histórico da planta.',
  },
  {
    antes:
      'Diagnóstico em linguagem técnica: "vazamento, defeito mecânico". A diretoria não consegue avaliar.',
    depois:
      'Perda convertida em R$/hora, R$/mês e R$/ano no custo de vapor da planta. A verba se justifica sozinha.',
  },
  {
    antes:
      'A cada falha, a análise recomeça do zero. Ninguém sabe qual modelo dura menos na linha.',
    depois:
      'Linha do tempo por tag: intervenções, vida útil por fabricante e reincidência identificada.',
  },
];

const CONSTA_NO_LAUDO = [
  'Identificação e tag de cada purgador',
  'Localização na planta (área, linha, cavalete)',
  'Fabricante, modelo, DN e pressão de operação',
  'Status da avaliação',
  'Perda estimada em kg/h',
  'Custo por hora, por mês e por ano',
  'Foto do ponto inspecionado',
  'Acessórios e observações de campo',
  'Resumo executivo com taxa de falha e perda total',
];

export default function Home() {
  return (
    <>
      {/* ══ HERÓI (§7.3) ══ */}
      <section className="secao" style={{ paddingBlock: 48 }}>
        <div className="container grade-2">
          <div className="pilha-6 entrada">
            <h1 className="t-display">
              Sua planta perde vapor agora. A Oikos mede quanto isso custa.
            </h1>
            <p className="t-body-lg t-mudo prosa">
              Inspeção técnica purgador a purgador, laudo com a perda convertida em reais
              e gestão contínua do parque no sistema Oikos. Atendimento em{' '}
              {SITE.regiaoAtendimentoTexto}.
            </p>
            <div className="linha-botoes">
              <Botao href="/contato">{OFERTA.ctaPrimario}</Botao>
              <Botao href="/laudo-exemplo" variante="secundario">
                {OFERTA.ctaSecundario}
              </Botao>
            </div>
            <p className="t-small t-mudo">
              Independentes de fabricante — não vendemos purgadores.
            </p>
          </div>

          <div style={{ position: 'relative' }} className="entrada entrada-2">
            <Image
              src="/imagens/campo/caldeira-vapor.png"
              alt="Linha de vapor industrial com perda visível em ponto de purga"
              width={900}
              height={600}
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              style={{ width: '100%', height: 'auto', borderRadius: 'var(--raio-card)' }}
            />
            <div className="cartao-contador">
              <ContadorPerda />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SETORES ATENDIDOS (§7.4) ══ */}
      <div className="secao-alt" style={{ paddingBlock: 20, borderBlock: '1px solid var(--border)' }}>
        <div className="container">
          <p className="t-small t-mudo" style={{ textAlign: 'center' }}>
            {SETORES.join(' · ')}
          </p>
        </div>
      </div>

      {/* ══ O PROBLEMA (§7.5) ══ */}
      <Secao fundo="alt">
        <div className="grade-2">
          <div className="pilha-6">
            <h2 className="t-h2">O custo que não aparece em nenhum relatório</h2>
            <div className="prosa t-body t-mudo">
              <p>
                Purgador com falha não dispara alarme, não aparece no SCADA e não entra em
                relatório gerencial. Ele simplesmente deixa passar vapor vivo — 24 horas
                por dia, 365 dias por ano — até alguém abrir a linha e olhar.
              </p>
              <p>
                A literatura técnica é consistente:{' '}
                <strong style={{ color: 'var(--oikos-grafite)' }}>
                  entre 15% e 30% dos purgadores instalados operam com algum tipo de falha
                </strong>{' '}
                quando não há programa regular de inspeção. Mesmo plantas com manutenção
                estruturada convivem com 5% a 10% de falha ao ano.
              </p>
              <p>
                Em uma planta de 250 purgadores, isso significa dezenas de pontos de perda
                simultâneos que ninguém consegue nomear — porque ninguém mediu.
              </p>
            </div>
          </div>

          <Image
            src="/imagens/campo/purgador-partes/body.png"
            alt="Corpo de purgador termodinâmico aberto, com o disco e a sede expostos"
            width={800}
            height={600}
            sizes="(min-width: 1024px) 46vw, 100vw"
            style={{ width: '100%', height: 'auto', borderRadius: 'var(--raio-card)', background: 'var(--bg)' }}
          />
        </div>

        <div className="grade-3" style={{ marginTop: 48 }}>
          <Dado valor="15–30%" fonte="doeFemp">
            dos purgadores falham sem programa regular de inspeção.
          </Dado>
          <Dado valor="5–10%" fonte="doeFemp">
            falham a cada ano mesmo com manutenção ativa.
          </Dado>
          <Dado valor="2 de 3" fonte="emerson">
            das falhas passaram despercebidas em auditoria manual documentada.
          </Dado>
        </div>
      </Secao>

      {/* ══ COMO FUNCIONA (§7.6) ══ */}
      <Secao>
        <TituloSecao titulo="Da inspeção ao controle permanente" />
        <div className="grade-3" style={{ marginTop: 48 }}>
          {PASSOS.map((passo) => (
            <div
              key={passo.numero}
              className="pilha-4"
              style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}
            >
              <span
                className="t-data"
                style={{ color: 'var(--oikos-aco)', fontSize: 32 }}
                aria-hidden="true"
              >
                {passo.numero}
              </span>
              <h3 className="t-h3">{passo.titulo}</h3>
              <p className="t-body t-mudo">{passo.texto}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* ══ O LAUDO (§7.7) ══ */}
      <Secao fundo="alt">
        <div className="grade-2">
          <div className="pilha-6">
            <h2 className="t-h2">O que você recebe ao final da inspeção</h2>
            <p className="t-body-lg t-mudo prosa">
              Um documento de 10 a 40 páginas com cada purgador da sua planta identificado,
              classificado e precificado. Não é uma lista técnica: é um demonstrativo
              financeiro que a gerência consegue ler e aprovar.
            </p>
            <ul className="pilha-2" style={{ listStyle: 'none' }}>
              {CONSTA_NO_LAUDO.map((item) => (
                <li key={item} className="t-body" style={{ display: 'flex', gap: 10 }}>
                  <span aria-hidden="true" style={{ color: 'var(--oikos-laranja-700)' }}>
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="linha-botoes">
              <Botao href="/laudo-exemplo">Ver o laudo completo de exemplo</Botao>
            </div>
          </div>

          <div className="card pilha-4">
            <p className="t-small" style={{ fontWeight: 600 }}>
              Trecho do relatório — status por ponto
            </p>
            <div className="tabela-wrap">
              <table className="tabela">
                <thead>
                  <tr>
                    <th scope="col">Tag</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="num">
                      Perda (kg/h)
                    </th>
                    <th scope="col" className="num">
                      Custo/ano
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PV-1042</td>
                    <td>
                      <span className="chip-status chip-vazando">Vazando</span>
                    </td>
                    <td className="num">43,11</td>
                    <td className="num">R$ 86.220</td>
                  </tr>
                  <tr>
                    <td>PV-1043</td>
                    <td>
                      <span className="chip-status chip-ok">OK</span>
                    </td>
                    <td className="num">—</td>
                    <td className="num">—</td>
                  </tr>
                  <tr>
                    <td>PV-1051</td>
                    <td>
                      <span className="chip-status chip-bloqueado">Bloqueado</span>
                    </td>
                    <td className="num">12,99</td>
                    <td className="num">R$ 25.980</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="t-small t-mudo">
              Exemplo ilustrativo com dados anonimizados. As cores de status são as mesmas
              do laudo e do sistema — o que você vê aqui é o que chega no relatório.
            </p>
          </div>
        </div>
      </Secao>

      {/* ══ SISTEMA OIKOS (§7.8) ══ */}
      <Secao>
        <div className="grade-2">
          <div className="pilha-6">
            <h2 className="t-h2">O laudo não pode virar um PDF esquecido no e-mail</h2>
            <div className="prosa t-body t-mudo">
              <p>
                Corrigir os purgadores uma vez não resolve: de 5% a 10% da população falha
                novamente a cada ano. Sem gestão contínua, a planta volta ao patamar de
                perda original em dois a três anos.
              </p>
              <p>
                O sistema Oikos mantém o inventário vivo: sua equipe registra as rondas
                pelo aplicativo, cada purgador acumula histórico por tag, e o painel mostra
                o que priorizar por valor de perda.
              </p>
            </div>
            <div className="linha-botoes">
              <Botao href="/sistema" variante="secundario">
                Conhecer o sistema Oikos
              </Botao>
            </div>
          </div>

          <PreviaHistorico />
        </div>

        <div className="grade-3" style={{ marginTop: 48 }}>
          {[
            {
              titulo: 'Inventário permanente',
              texto:
                'Todos os purgadores com tag, localização, modelo, pressão e status atual.',
            },
            {
              titulo: 'Prioridade por valor',
              texto:
                'A fila de manutenção ordenada pelo que custa mais caro deixar quebrado.',
            },
            {
              titulo: 'Histórico por tag',
              texto:
                'O que foi trocado, quando, por qual fabricante e quanto durou. O conhecimento deixa de morar na cabeça de uma pessoa.',
            },
          ].map((bloco) => (
            <div
              key={bloco.titulo}
              className="pilha-2"
              style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}
            >
              <h3 className="t-h3">{bloco.titulo}</h3>
              <p className="t-body t-mudo">{bloco.texto}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* ══ COMPARATIVO (§7.9) ══ */}
      <Secao fundo="alt">
        <TituloSecao titulo="Inspeção pontual e gestão permanente não são a mesma coisa" />
        <div className="tabela-wrap" style={{ marginTop: 40, background: 'var(--bg)' }}>
          <table className="tabela">
            <thead>
              <tr>
                <th scope="col" style={{ width: '50%' }}>
                  Hoje na maioria das plantas
                </th>
                <th scope="col" style={{ width: '50%' }}>
                  Com a Oikos
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIVO.map((linha) => (
                <tr key={linha.antes}>
                  <td className="t-mudo">{linha.antes}</td>
                  <td>{linha.depois}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Secao>

      {/* ══ INDEPENDÊNCIA E MÉTODO (§7.10) ══ */}
      <Secao fundo="escura">
        <div className="pilha-6" style={{ maxWidth: '62ch' }}>
          <h2 className="t-h2">Não vendemos purgadores</h2>
          <div className="prosa t-body t-mudo">
            <p>
              Fabricantes fazem auditoria para vender peça. A Oikos é remunerada pela
              gestão da eficiência, não pela troca — nosso interesse é que o purgador dure.
              O diagnóstico é isento, e a recomendação de reparo é a tecnicamente correta,
              não a comercialmente conveniente.
            </p>
            <p>
              A metodologia é padronizada e apoiada por leitura assistida: o mesmo
              purgador, avaliado por dois técnicos diferentes, recebe a mesma
              classificação. É isso que torna o histórico comparável ao longo dos anos.
            </p>
          </div>
          <div className="linha-botoes">
            <Botao href="/empresa" variante="secundario">
              Sobre a Oikos
            </Botao>
          </div>
        </div>
      </Secao>

      {/* ══ FAQ (§7.11) ══ */}
      <Secao>
        <TituloSecao titulo="Perguntas que sempre aparecem" />
        <div style={{ marginTop: 32, maxWidth: 820 }}>
          <FAQ perguntas={FAQ_HOME} />
        </div>
        <div style={{ marginTop: 32 }}>
          <ListaFontes chaves={['doeFemp', 'emerson']} />
        </div>
      </Secao>

      {/* ══ CTA FINAL (§7.12) ══ */}
      <Secao fundo="alt" id="contato">
        <div className="grade-2">
          <div className="pilha-6">
            <h2 className="t-h2">Descubra quanto sua planta está perdendo</h2>
            <p className="t-body-lg t-mudo prosa">
              Em uma visita, você recebe o inventário completo dos seus purgadores e o
              custo real de cada falha.
            </p>
            <p className="t-body" style={{ fontWeight: 600 }}>
              {OFERTA.selo}
            </p>
            <p className="t-small t-mudo prosa">
              Prefere entender a ordem de grandeza antes de falar com alguém?{' '}
              <Link href="/laudo-exemplo" className="link-azul">
                Veja um laudo de exemplo
              </Link>{' '}
              — está aberto, sem formulário.
            </p>
          </div>
          <FormDiagnostico />
        </div>
      </Secao>

      <FAQJsonLd perguntas={FAQ_HOME} />
    </>
  );
}
