import type { Metadata } from 'next';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { Foto } from '@/components/ui/Foto';
import { Dado, ListaFontes } from '@/components/data/Dado';
import { FAQ, FAQJsonLd } from '@/components/blocks/FAQ';
import { OFERTA } from '@/config/oferta';
import { SITE, urlCanonica } from '@/config/site';
import type { Pergunta } from '@/components/blocks/FAQ';

export const metadata: Metadata = {
  title: 'Inspeção de purgadores de vapor',
  description:
    'Inspeção técnica purgador a purgador com ultrassom e medição de temperatura, com laudo da perda em R$/ano. Sem parar a produção. SP, PR e SC.',
  alternates: { canonical: '/inspecao' },
};

const FAQ_INSPECAO: Pergunta[] = [
  {
    pergunta: 'Preciso parar a produção durante a inspeção?',
    resposta:
      'Não. A avaliação é feita com o sistema em operação, é com vapor passando que o ultrassom distingue um purgador travado aberto de um operando normalmente.',
  },
  {
    pergunta: 'Quanto tempo leva por purgador?',
    resposta:
      'A avaliação de um ponto leva poucos minutos. O que define o prazo total é o deslocamento dentro da planta e o acesso a pontos elevados ou confinados. O cronograma é fechado antes da visita.',
  },
  {
    pergunta: 'Quanto custa?',
    resposta: OFERTA.explicacao,
  },
  {
    pergunta: 'Que equipamento vocês usam?',
    resposta:
      'O detector ultrassônico UP100, somado à medição de temperatura de entrada e saída. A combinação das duas leituras é o que separa um purgador operando normalmente de um travado aberto, só a temperatura, sozinha, engana. No contrato mensal, é o mesmo equipamento que fica com a sua equipe para as rondas periódicas.',
  },
  {
    pergunta: 'Vocês fazem o reparo também?',
    resposta:
      'Não trocamos nem vendemos purgadores. Entregamos o diagnóstico e a prioridade de intervenção; a execução fica com a sua equipe ou com o fornecedor que você escolher. É essa separação que mantém o laudo isento.',
  },
];

const ETAPAS = [
  {
    titulo: 'Levantamento prévio',
    texto:
      'Antes de ir a campo, alinhamos o escopo: quantidade estimada de pontos, áreas cobertas, pressões de operação e o custo do vapor da sua planta, o número que vai converter kg/h em reais no laudo.',
  },
  {
    titulo: 'Avaliação ponto a ponto',
    texto:
      'Cada purgador recebe leitura de ultrassom e de temperatura. O técnico registra no aplicativo Oikos, ainda em campo, a tag, a localização, o fabricante, o modelo, o DN, a pressão e a condição encontrada, com foto do ponto.',
  },
  {
    titulo: 'Classificação padronizada',
    texto:
      'A condição é classificada em uma escala fechada, operando, vazando, bloqueado, fora de operação ou não avaliado. A escala é a mesma para toda a equipe, o que torna a inspeção deste ano comparável com a do ano que vem.',
  },
  {
    titulo: 'Cálculo da perda',
    texto:
      'A perda de massa é calculada em kg/h a partir do diâmetro, da pressão e da condição. Multiplicada pelas horas de operação e pelo custo do vapor da planta, vira R$/hora, R$/mês e R$/ano.',
  },
  {
    titulo: 'Entrega do laudo',
    texto:
      'Você recebe o relatório completo com o inventário, o mapa de status, a perda por ponto, o resumo executivo com a taxa de falha do parque e a fila de intervenção ordenada por valor.',
  },
];

function ServiceJsonLd() {
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Inspeção de purgadores de vapor',
    serviceType: 'Inspeção e diagnóstico de purgadores de vapor industriais',
    provider: { '@type': 'Organization', name: SITE.razaoSocial, taxID: SITE.cnpj },
    areaServed: SITE.regiaoAtendimento.map((uf) => ({ '@type': 'State', name: uf })),
    url: `${urlCanonica()}/inspecao`,
    description:
      'Inspeção técnica purgador a purgador com ultrassom e medição de temperatura, com laudo da perda convertida em reais.',
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />
  );
}

export default function Inspecao() {
  return (
    <>
      <Secao>
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              nivel={1}
              marcador="O serviço de campo"
              titulo="Inspeção de purgadores de vapor"
              lead="Cada purgador da sua planta avaliado com ultrassom, classificado por uma escala padronizada e precificado no custo de vapor da sua operação. Com a produção rodando."
            />
            <div className="linha-botoes">
              <Botao href="/contato" seta>
                {OFERTA.ctaPrimario}
              </Botao>
              <Botao href="/laudo-exemplo" variante="secundario">
                {OFERTA.ctaSecundario}
              </Botao>
            </div>
          </div>
          <div className="moldura">
            <Foto slot="inspecaoCasaCaldeiras" prioridade />
          </div>
        </div>
      </Secao>

      <Secao fundo="alt">
        <TituloSecao
          titulo="Por que a verificação da própria equipe não basta"
          lead="Não é uma questão de diligência. É de instrumento e de método."
        />
        <div className="grade-3" style={{ marginTop: 48 }}>
          <Dado valor="2 de 3" fonte="emerson">
            das falhas passaram despercebidas em uma auditoria manual que a própria equipe
            considerava 95% a 97% confiável.
          </Dado>
          <Dado valor="15 a 30%" fonte="doeFemp">
            dos purgadores instalados operam com falha quando não há programa regular de
            inspeção.
          </Dado>
          <Dado valor="5 a 10%" fonte="doeFemp">
            da população volta a falhar a cada ano, mesmo depois de um programa bem
            executado.
          </Dado>
        </div>
        <div style={{ marginTop: 32 }}>
          <ListaFontes chaves={['doeFemp', 'emerson']} />
        </div>
      </Secao>

      <Secao>
        <TituloSecao marcador="Passo a passo" titulo="Como a inspeção é feita" />
        <ol style={{ marginTop: 40, listStyle: 'none', maxWidth: 820 }}>
          {ETAPAS.map((etapa, i) => (
            <li
              key={etapa.titulo}
              style={{
                display: 'grid',
                gridTemplateColumns: '48px 1fr',
                gap: 20,
                paddingBlock: 24,
                borderTop: '1px solid var(--border)',
              }}
            >
              <span
                className="t-data"
                style={{ fontSize: 28, color: 'var(--azul-300)' }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pilha-2">
                <h3 className="t-h3">{etapa.titulo}</h3>
                <p className="t-body t-mudo">{etapa.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </Secao>

      <Secao fundo="alt">
        <div className="grade-2">
          <div className="pilha-4">
            <h2 className="t-h2">O que você recebe</h2>
            <p className="t-body t-mudo prosa">
              O laudo é o produto da inspeção, e é o documento que sustenta o pedido de
              verba de manutenção, porque fala em reais e não em kg/h.
            </p>
            <div className="linha-botoes">
              <Botao href="/laudo-exemplo" variante="secundario">
                Ver um laudo de exemplo
              </Botao>
            </div>
          </div>
          <div className="card card-filete pilha-4">
            <h3 className="t-h3">Modelo comercial</h3>
            <p className="t-body" style={{ fontWeight: 600 }}>
              {OFERTA.chamada}
            </p>
            <p className="t-body t-mudo">{OFERTA.explicacao}</p>
            <p className="t-body t-mudo">{OFERTA.semContratarNinguem}</p>
            <p className="t-small t-mudo">
              Atendimento em {SITE.regiaoAtendimentoTexto}, com equipe própria. Escopo e
              preço fechados antes da visita.
            </p>
          </div>
        </div>
      </Secao>

      <Secao>
        <TituloSecao titulo="Dúvidas sobre a inspeção" />
        <div style={{ marginTop: 32, maxWidth: 820 }}>
          <FAQ perguntas={FAQ_INSPECAO} />
        </div>
        <div className="linha-botoes" style={{ marginTop: 40 }}>
          <Botao href="/contato">{OFERTA.ctaPrimario}</Botao>
        </div>
      </Secao>

      <FAQJsonLd perguntas={FAQ_INSPECAO} />
      <ServiceJsonLd />
    </>
  );
}
