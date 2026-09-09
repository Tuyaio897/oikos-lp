import type { Metadata } from 'next';
import Link from 'next/link';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { Foto } from '@/components/ui/Foto';
import { Dado, ListaFontes } from '@/components/data/Dado';
import { CartaoPerdaHeroi } from '@/components/data/ContadorPerda';
import { FAQ, FAQJsonLd } from '@/components/blocks/FAQ';
import { FormDiagnostico } from '@/components/forms/FormDiagnostico';
import { PreviaHistorico } from '@/components/blocks/PreviaPainel';
import { ListaReferencias } from '@/components/blocks/ListaReferencias';
import { IlustracaoUltrassom } from '@/components/blocks/Ilustracoes';
import { FAQ_HOME } from '@/config/faq';
import { OFERTA, EQUIPAMENTO } from '@/config/oferta';
import { REFERENCIAS } from '@/config/referencias';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: 'Oikos, inspeção de purgadores de vapor e gestão de perdas',
  description:
    'Inspeção purgador a purgador com ultrassom, laudo com a perda em R$/ano e contrato mensal para a sua equipe manter o parque sob controle. SP, PR e SC.',
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
      'Ao final da visita você recebe o relatório completo: mapa dos purgadores, status de cada um, perda em kg/h e o custo correspondente por hora, mês e ano, no custo de vapor da sua planta. É o documento que sustenta o pedido de verba de manutenção.',
  },
  {
    numero: '03',
    titulo: 'Contrato mensal de cuidado',
    texto:
      'Deixamos o UP100 na sua planta e treinamos a sua equipe de manutenção para medir. As rondas passam a ser feitas por quem já está lá, sem contratar ninguém, e a Oikos segue cuidando do método, da análise e do histórico.',
  },
];

const COMPARATIVO = [
  {
    antes: 'Inspeção termina em PDF arquivado em e-mail. Ninguém cruza com a inspeção anterior.',
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
    antes: 'A cada falha, a análise recomeça do zero. Ninguém sabe qual modelo dura menos na linha.',
    depois: 'Linha do tempo por tag: intervenções, vida útil por fabricante e reincidência identificada.',
  },
  {
    antes: 'A próxima medição depende de contratar e agendar uma nova auditoria.',
    depois: 'Sua equipe mede quando precisa, na frequência que a planta pede.',
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
  'Resumo executivo com taxa de falha e perda total',
];

export default function Home() {
  return (
    <>
      {/* ══ HERÓI ══ */}
      <section className="heroi">
        <div className="container">
          <div className="grade-2 topo">
            <div className="pilha-6 entrada">
              <span className="marcador">Engenharia de eficiência térmica</span>
              <h1 className="t-display">
                Sua planta perde vapor agora. A Oikos mede quanto isso custa.
              </h1>
              <p className="t-body-lg t-mudo prosa">
                Inspeção técnica purgador a purgador com ultrassom, laudo com a perda
                convertida em reais e um contrato mensal que deixa a sua própria equipe
                mantendo o parque sob controle. Atendimento em {SITE.regiaoAtendimentoTexto}.
              </p>
              <div className="linha-botoes">
                <Botao href="/contato" seta>
                  {OFERTA.ctaPrimario}
                </Botao>
                <Botao href="/laudo-exemplo" variante="secundario">
                  {OFERTA.ctaSecundario}
                </Botao>
              </div>
              <p className="t-small t-mudo">
                Independentes de fabricante. Não vendemos purgadores.
              </p>
            </div>

            {/* O cartão de perda flutua sobre um canto da foto, sem cobri-la. */}
            <div className="foto-com-cartao entrada entrada-2">
              <div className="moldura">
                <Foto slot="heroiCavalete" prioridade />
              </div>
              <div className="cartao-flutuante">
                <CartaoPerdaHeroi />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SETORES ATENDIDOS ══ */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBlock: 22 }}>
        <div className="container">
          <p className="t-small t-mudo" style={{ textAlign: 'center' }}>
            {SETORES.join('  ·  ')}
          </p>
        </div>
      </div>

      {/* ══ O PROBLEMA ══ */}
      <Secao fundo="alt">
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              marcador="O problema"
              titulo="O custo que não aparece em nenhum relatório"
            />
            <div className="prosa t-body t-mudo">
              <p>
                Purgador com falha não dispara alarme, não aparece no SCADA e não entra em
                relatório gerencial. Ele simplesmente deixa passar vapor vivo, 24 horas por
                dia, 365 dias por ano, até alguém abrir a linha e olhar.
              </p>
              <p>
                A literatura técnica é consistente:{' '}
                <strong style={{ color: 'var(--grafite)' }}>
                  entre 15% e 30% dos purgadores instalados operam com algum tipo de falha
                </strong>{' '}
                quando não há programa regular de inspeção. Mesmo plantas com manutenção
                estruturada convivem com 5% a 10% de falha ao ano.
              </p>
              <p>
                Em uma planta de 250 purgadores, isso significa dezenas de pontos de perda
                simultâneos que ninguém consegue nomear, porque ninguém mediu.
              </p>
            </div>
          </div>

          <div className="moldura">
            <Foto slot="problemaVazamento" />
          </div>
        </div>

        <div className="grade-3" style={{ marginTop: 56 }}>
          <div className="card card-filete">
            <Dado valor="15% a 30%" fonte="doeFemp">
              dos purgadores falham sem programa regular de inspeção.
            </Dado>
          </div>
          <div className="card card-filete">
            <Dado valor="5% a 10%" fonte="doeFemp">
              falham a cada ano mesmo com manutenção ativa.
            </Dado>
          </div>
          <div className="card card-filete">
            <Dado valor="2 de 3" fonte="emerson">
              das falhas passaram despercebidas em auditoria manual documentada.
            </Dado>
          </div>
        </div>
      </Secao>

      {/* ══ COMO FUNCIONA ══ */}
      <Secao>
        <TituloSecao
          marcador="Como funciona"
          titulo="Da inspeção ao controle permanente"
          centralizado
        />
        <div className="grade-3" style={{ marginTop: 56 }}>
          {PASSOS.map((passo) => (
            <article key={passo.numero} className="card card-interativo pilha-4">
              <span
                className="num"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(30px, 2.6vw, 38px)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: 'var(--azul-300)',
                }}
                aria-hidden="true"
              >
                {passo.numero}
              </span>
              <h3 className="t-h3">{passo.titulo}</h3>
              <p className="t-body t-mudo">{passo.texto}</p>
            </article>
          ))}
        </div>
      </Secao>

      {/* ══ O EQUIPAMENTO ══ */}
      <Secao fundo="escura">
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              marcador="O equipamento"
              titulo={`Medimos com ${EQUIPAMENTO.modelo}, e ensinamos sua equipe a medir`}
              lead={EQUIPAMENTO.descricao}
            />
            <ul style={{ listStyle: 'none' }} className="pilha-4">
              {EQUIPAMENTO.pontos.map((ponto) => (
                <li key={ponto} style={{ display: 'flex', gap: 12 }} className="t-body">
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: 22,
                      height: 22,
                      borderRadius: 999,
                      background: 'var(--verde-500)',
                      color: '#14180B',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      marginTop: 3,
                    }}
                  >
                    ✓
                  </span>
                  <span className="t-mudo">{ponto}</span>
                </li>
              ))}
            </ul>
            <p className="t-body t-mudo prosa">
              {EQUIPAMENTO.cessao} O treinamento de uso para a sua equipe está incluído no
              contrato.
            </p>
          </div>

          <div className="pilha-4">
            <div className="moldura">
              <Foto slot="equipamentoUP100" />
            </div>
            <div className="card">
              <IlustracaoUltrassom />
              <p className="t-small t-mudo" style={{ marginTop: 16 }}>
                A energia acústica do vazamento se concentra acima de 20 kHz. É por isso
                que tato e ouvido encontram o purgador rompido, mas não o que perde 12 kg/h
                em silêncio.
              </p>
            </div>
          </div>
        </div>
      </Secao>

      {/* ══ MODELO COMERCIAL ══ */}
      <Secao fundo="verde">
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              marcador="Modelo de contrato"
              titulo={OFERTA.chamada}
              lead={OFERTA.explicacao}
            />
            <div className="card" style={{ background: 'var(--bg)' }}>
              <p className="t-body" style={{ fontWeight: 600, marginBottom: 6 }}>
                Você não contrata mais ninguém
              </p>
              <p className="t-body t-mudo">{OFERTA.semContratarNinguem}</p>
            </div>
            <div className="linha-botoes">
              <Botao href="/contato" seta>
                Falar sobre o contrato
              </Botao>
            </div>
          </div>

          <div className="pilha-4">
            <div className="moldura">
              <Foto slot="manterRonda" />
            </div>
            {OFERTA.pilares.map((pilar) => (
              <div key={pilar.titulo} className="card card-interativo">
                <h3 className="t-h3" style={{ marginBottom: 8 }}>
                  {pilar.titulo}
                </h3>
                <p className="t-body t-mudo">{pilar.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </Secao>

      {/* ══ O LAUDO ══ */}
      <Secao>
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              marcador="O entregável"
              titulo="O que você recebe ao final da inspeção"
              lead="Um documento de 10 a 40 páginas com cada purgador da sua planta identificado, classificado e precificado. Não é uma lista técnica: é um demonstrativo financeiro que a gerência consegue ler e aprovar."
            />
            <ul className="pilha-2" style={{ listStyle: 'none' }}>
              {CONSTA_NO_LAUDO.map((item) => (
                <li key={item} className="t-body" style={{ display: 'flex', gap: 12 }}>
                  <span aria-hidden="true" style={{ color: 'var(--azul-500)', fontWeight: 700 }}>
                    ·
                  </span>
                  <span className="t-mudo">{item}</span>
                </li>
              ))}
            </ul>
            <div className="linha-botoes">
              <Botao href="/laudo-exemplo" seta>
                Ver o laudo completo de exemplo
              </Botao>
            </div>
          </div>

          <div className="card pilha-4">
            <p className="t-small" style={{ fontWeight: 600 }}>
              Trecho do relatório, status por ponto
            </p>
            <div className="tabela-wrap compacta" style={{ boxShadow: 'none' }}>
              <table className="tabela compacta">
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
                    <td style={{ fontWeight: 600 }}>PV-1042</td>
                    <td>
                      <span className="chip-status chip-vazando">Vazando</span>
                    </td>
                    <td className="num">43,11</td>
                    <td className="num">R$ 86.220</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>PV-1043</td>
                    <td>
                      <span className="chip-status chip-ok">Operando</span>
                    </td>
                    <td className="num">0</td>
                    <td className="num">R$ 0</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>PV-1051</td>
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
              do laudo e do sistema: o que você vê aqui é o que chega no relatório.
            </p>
          </div>
        </div>
      </Secao>

      {/* ══ SISTEMA OIKOS ══ */}
      <Secao fundo="alt">
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              marcador="Sistema Oikos"
              titulo="O laudo não pode virar um PDF esquecido no e-mail"
            />
            <div className="prosa t-body t-mudo">
              <p>
                Corrigir os purgadores uma vez não resolve: de 5% a 10% da população falha
                novamente a cada ano. Sem gestão contínua, a planta volta ao patamar de
                perda original em dois a três anos.
              </p>
              <p>
                O sistema Oikos mantém o inventário vivo. Sua equipe registra as rondas
                pelo aplicativo, cada purgador acumula histórico por tag, e o painel mostra
                o que priorizar por valor de perda.
              </p>
            </div>
            <div className="linha-botoes">
              <Botao href="/sistema" variante="secundario" seta>
                Conhecer o sistema Oikos
              </Botao>
            </div>
          </div>

          <PreviaHistorico />
        </div>

        <div className="grade-3" style={{ marginTop: 56 }}>
          {[
            {
              titulo: 'Inventário permanente',
              texto: 'Todos os purgadores com tag, localização, modelo, pressão e status atual.',
            },
            {
              titulo: 'Prioridade por valor',
              texto: 'A fila de manutenção ordenada pelo que custa mais caro deixar quebrado.',
            },
            {
              titulo: 'Histórico por tag',
              texto:
                'O que foi trocado, quando, por qual fabricante e quanto durou. O conhecimento deixa de morar na cabeça de uma pessoa.',
            },
          ].map((bloco) => (
            <div key={bloco.titulo} className="card card-interativo pilha-2">
              <h3 className="t-h3">{bloco.titulo}</h3>
              <p className="t-body t-mudo">{bloco.texto}</p>
            </div>
          ))}
        </div>
      </Secao>

      {/* ══ COMPARATIVO ══ */}
      <Secao>
        <TituloSecao
          marcador="Antes e depois"
          titulo="Inspeção pontual e gestão permanente não são a mesma coisa"
          centralizado
        />
        <div className="tabela-wrap" style={{ marginTop: 48 }}>
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

      {/* ══ INDEPENDÊNCIA ══ */}
      <Secao fundo="escura">
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao marcador="Independência" titulo="Não vendemos purgadores" />
            <div className="prosa t-body t-mudo">
              <p>
                Fabricantes fazem auditoria para vender peça. A Oikos é remunerada pela
                gestão da eficiência, não pela troca, e nosso interesse é que o purgador
                dure. O diagnóstico é isento, e a recomendação de reparo é a tecnicamente
                correta, não a comercialmente conveniente.
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

          <div className="moldura">
            <Foto slot="inspecaoCasaCaldeiras" />
          </div>
        </div>
      </Secao>

      {/* ══ REFERÊNCIAS ══ */}
      <Secao fundo="alt">
        <TituloSecao
          marcador="Base científica"
          titulo="A conta não é nossa, é da literatura"
          lead="Todo número deste site vem de uma destas fontes ou do cálculo do próprio laudo. Elas estão abertas, para você conferir antes de falar com qualquer vendedor."
          centralizado
        />
        <div style={{ marginTop: 48 }}>
          <ListaReferencias itens={REFERENCIAS.slice(0, 3)} />
        </div>
        <div className="linha-botoes" style={{ marginTop: 32, justifyContent: 'center' }}>
          <Botao href="/referencias" variante="secundario" seta>
            Ver todas as referências
          </Botao>
        </div>
      </Secao>

      {/* ══ FAQ ══ */}
      <Secao>
        <TituloSecao marcador="Dúvidas" titulo="Perguntas que sempre aparecem" centralizado />
        <div style={{ marginTop: 48, maxWidth: 840, marginInline: 'auto' }}>
          <FAQ perguntas={FAQ_HOME} />
        </div>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <ListaFontes chaves={['doeFemp', 'emerson']} />
        </div>
      </Secao>

      {/* ══ CTA FINAL ══ */}
      <Secao fundo="verde" id="contato">
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              marcador="Comece pela medição"
              titulo="Descubra quanto sua planta está perdendo"
              lead="Em uma visita, você recebe o inventário completo dos seus purgadores e o custo real de cada falha."
            />
            <p className="t-small t-mudo prosa">
              Prefere entender a ordem de grandeza antes de falar com alguém?{' '}
              <Link href="/laudo-exemplo" className="link-azul">
                Veja um laudo de exemplo
              </Link>
              , está aberto, sem formulário.
            </p>
          </div>
          <FormDiagnostico />
        </div>
      </Secao>

      <FAQJsonLd perguntas={FAQ_HOME} />
    </>
  );
}
