import type { Metadata } from 'next';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { KPI } from '@/components/data/Dado';
import { OFERTA } from '@/config/oferta';
import { LAUDO } from '@/config/laudo';
import {
  PADRAO,
  calcularPerda,
  formatarBRLCurto,
  type EntradaCalculo,
} from '@/lib/calculo-perda';

/**
 * Parque hipotético usado no exemplo. Os agregados são derivados da engine —
 * nenhum número aqui é digitado à mão, para que o site nunca divirja do laudo.
 */
const DEMO: EntradaCalculo = { ...PADRAO, pressaoBar: 10 };
const resumo = calcularPerda(DEMO);

export const metadata: Metadata = {
  title: 'Laudo de exemplo — relatório de perdas por purgador',
  description:
    'Veja um laudo de inspeção de purgadores completo e anonimizado: inventário, status por ponto, perda em kg/h e custo por hora, mês e ano.',
  alternates: { canonical: '/laudo-exemplo' },
};

/**
 * Página aberta, sem formulário (§7.7).
 *
 * Regra: nunca bloquear a visualização; bloquear só o download.
 */

const PONTOS = [
  {
    tag: 'PV-1042',
    local: 'Cavalete 02 — Linha de secagem',
    fabricante: 'Termodinâmico DN25',
    pressao: '10 bar',
    status: 'vazando' as const,
    rotulo: 'Vazando',
    kgh: '43,11',
    ano: 'R$ 86.220',
  },
  {
    tag: 'PV-1043',
    local: 'Cavalete 02 — Linha de secagem',
    fabricante: 'Termodinâmico DN25',
    pressao: '10 bar',
    status: 'ok' as const,
    rotulo: 'Operando',
    kgh: '—',
    ano: '—',
  },
  {
    tag: 'PV-1051',
    local: 'Casa de caldeiras — Coletor principal',
    fabricante: 'Balde invertido DN15',
    pressao: '8 bar',
    status: 'bloqueado' as const,
    rotulo: 'Bloqueado',
    kgh: '12,99',
    ano: 'R$ 25.980',
  },
  {
    tag: 'PV-1077',
    local: 'Área 300 — Traço de vapor',
    fabricante: 'Termostático DN15',
    pressao: '6 bar',
    status: 'fora' as const,
    rotulo: 'Fora de operação',
    kgh: '—',
    ano: '—',
  },
  {
    tag: 'PV-1090',
    local: 'Área 400 — Trocador de calor',
    fabricante: 'Boia DN50',
    pressao: '12 bar',
    status: 'nao-aval' as const,
    rotulo: 'Não avaliado',
    kgh: '—',
    ano: '—',
  },
];

const CLASSE_STATUS: Record<string, string> = {
  ok: 'chip-status chip-ok',
  vazando: 'chip-status chip-vazando',
  bloqueado: 'chip-status chip-bloqueado',
  fora: 'chip-status chip-fora',
  'nao-aval': 'chip-status chip-nao-aval',
};

const BLOCOS_COMENTADOS = [
  {
    titulo: 'Resumo executivo',
    texto:
      'Abre o documento com a taxa de falha do parque, a perda total anual e a quantidade de pontos por status. É a página que circula na diretoria — as outras existem para sustentá-la.',
  },
  {
    titulo: 'Inventário completo',
    texto:
      'Todos os pontos avaliados, com tag, localização, fabricante, modelo, DN e pressão. Serve como cadastro da planta mesmo depois que as falhas forem corrigidas.',
  },
  {
    titulo: 'Status por ponto',
    texto:
      'A classificação em escala fechada. As cores são as mesmas no laudo, no sistema e neste site — é o que torna a leitura imediata para quem já viu um relatório anterior.',
  },
  {
    titulo: 'Perda em kg/h e em reais',
    texto:
      'A conversão que muda a conversa. A massa perdida é calculada por ponto; o custo usa o custo de vapor da sua planta, não uma média de mercado, e a premissa aparece no rodapé de cada tabela.',
  },
  {
    titulo: 'Foto e observações de campo',
    texto:
      'Cada ponto com falha traz a foto e a observação do técnico. É o que evita a discussão de "será que era esse mesmo?" três semanas depois.',
  },
  {
    titulo: 'Fila de intervenção',
    texto:
      'Os pontos ordenados por perda anual. A ordem de serviço sai daqui, e o critério é o valor, não a facilidade de acesso.',
  },
];

export default function LaudoExemplo() {
  return (
    <>
      <Secao>
        <div style={{ maxWidth: '62ch' }} className="pilha-6">
          <TituloSecao
            nivel={1}
            titulo="Um laudo de inspeção, aberto"
            lead="Este é o documento que você recebe ao final da inspeção: de 10 a 40 páginas com cada purgador identificado, classificado e precificado. Está aberto de propósito — sem formulário para ver."
          />
        </div>
      </Secao>

      <Secao fundo="alt">
        <TituloSecao
          titulo="Resumo executivo"
          lead="Planta de demonstração — Alimentos / PR. É um exemplo construído para mostrar o formato do documento, não um cliente: os agregados abaixo saem da mesma fórmula que a Oikos usa em campo, aplicada a um parque hipotético de 250 pontos."
        />

        <div className="grade-3" style={{ marginTop: 48 }}>
          <KPI valor={String(DEMO.purgadores)} rotulo="Purgadores avaliados" />
          <KPI
            valor={`${Math.round(resumo.taxaFalha * 100)}%`}
            rotulo="Taxa de falha do parque"
            nota={`${resumo.purgadoresComFalha} pontos com perda ativa`}
          />
          <KPI
            valor={`${formatarBRLCurto(resumo.minimoAnual)} a ${formatarBRLCurto(resumo.maximoAnual)}`}
            rotulo="Perda estimada por ano"
            nota={`${DEMO.pressaoBar} bar · vapor a R$ ${DEMO.custoVaporPorTonelada}/t · ${DEMO.horasAno.toLocaleString('pt-BR')} h/ano`}
          />
        </div>

        <div className="tabela-wrap" style={{ marginTop: 48, background: 'var(--bg)' }}>
          <table className="tabela">
            <caption className="so-leitor">
              Amostra do inventário de purgadores com status, perda e custo anual
            </caption>
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Localização</th>
                <th scope="col">Tipo / DN</th>
                <th scope="col">Pressão</th>
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
              {PONTOS.map((ponto) => (
                <tr key={ponto.tag}>
                  <td style={{ fontWeight: 600 }}>{ponto.tag}</td>
                  <td className="t-mudo">{ponto.local}</td>
                  <td className="t-mudo">{ponto.fabricante}</td>
                  <td className="num t-mudo">{ponto.pressao}</td>
                  <td>
                    <span className={CLASSE_STATUS[ponto.status]}>{ponto.rotulo}</span>
                  </td>
                  <td className="num">{ponto.kgh}</td>
                  <td className="num">{ponto.ano}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="t-small t-mudo" style={{ marginTop: 16 }}>
          Amostra de 5 dos {DEMO.purgadores} pontos do exemplo. Custo calculado com vapor a
          R$ {DEMO.custoVaporPorTonelada}/t e {DEMO.horasAno.toLocaleString('pt-BR')} horas
          de operação por ano — no laudo real, as premissas são as da sua planta e ficam
          declaradas no rodapé de cada tabela.
        </p>
      </Secao>

      <Secao>
        <TituloSecao titulo="O que tem em cada bloco do relatório" />
        <div className="grade-2" style={{ marginTop: 48 }}>
          {BLOCOS_COMENTADOS.map((bloco) => (
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

      <Secao fundo="alt">
        <div className="grade-2">
          <div className="pilha-4">
            <h2 className="t-h2">Levar o laudo completo</h2>
            <p className="t-body t-mudo prosa">
              O PDF completo, com todas as páginas e todas as tabelas, para encaminhar
              internamente antes de qualquer conversa comercial.
            </p>
          </div>
          <div className="card pilha-4">
            {LAUDO.pdfDisponivel ? (
              <>
                <h3 className="t-h3">Baixar em PDF</h3>
                <p className="t-body t-mudo">
                  Informe nome, e-mail corporativo e empresa para receber o arquivo.
                </p>
                <Botao href="/contato?assunto=laudo-exemplo">Receber o PDF</Botao>
              </>
            ) : (
              <>
                <h3 className="t-h3">Quer o PDF completo?</h3>
                <p className="t-body t-mudo">
                  O arquivo para download está em preparação. Enquanto isso, pedimos por
                  e-mail e enviamos no mesmo dia útil.
                </p>
                <Botao href="/contato?assunto=laudo-exemplo">Solicitar o laudo completo</Botao>
              </>
            )}
          </div>
        </div>
        <div className="linha-botoes" style={{ marginTop: 48 }}>
          <Botao href="/contato">{OFERTA.ctaPrimario}</Botao>
          <Botao href="/inspecao" variante="secundario">
            Como a inspeção é feita
          </Botao>
        </div>
      </Secao>
    </>
  );
}
