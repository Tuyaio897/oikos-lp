import type { Metadata } from 'next';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { KPI } from '@/components/data/Dado';
import { IlustracaoUltrassom } from '@/components/blocks/Ilustracoes';
import { INCERTEZA, perdaKgH, ORIFICIOS_TIPICOS } from '@/lib/calculo-perda';
import { OFERTA } from '@/config/oferta';

export const metadata: Metadata = {
  title: 'Metodologia de cálculo de perda de vapor',
  description:
    'Como a Oikos calcula a perda de um purgador com falha: Equação de Napier para escoamento crítico, fatores de correção abertos e a incerteza declarada.',
  alternates: { canonical: '/metodologia' },
};

/** Exemplos calculados pela engine — nenhum número é digitado à mão. */
const EXEMPLOS = ORIFICIOS_TIPICOS.map((o) => {
  const pressao = o.rotulo === 'DN50' ? 20 : o.rotulo === 'DN25' ? 10 : 8;
  const { teorico, oikos } = perdaKgH(o.diametroMm, pressao);
  return { ...o, pressao, teorico, oikos };
});

const CONSTANTES = [
  ['0,66', 'Fator de escoamento crítico derivado da termodinâmica de gases'],
  ['2,73', 'Conversão de unidades, de m³/s para kg/h'],
  ['C = 0,72', 'Coeficiente de descarga padrão para orifícios em vapor'],
  ['4,654', 'Constante de normalização para diâmetro em milímetros'],
  ['Fγ = 0,96', 'Fator de calor específico para vapor saturado'],
  ['xT = 0,72', 'Fator de pressão diferencial'],
  ['p₁', 'Pressão absoluta a montante, em kPa'],
  ['ρ', 'Densidade do vapor saturado, em kg/m³'],
  ['d₀', 'Diâmetro real do orifício de descarga, em mm'],
];

export default function Metodologia() {
  return (
    <>
      <Secao>
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              nivel={1}
              marcador="Metodologia"
              titulo={
                <>
                  Sem <span className="realce">caixa preta</span>
                </>
              }
              lead="Toda perda que a Oikos publica sai da Equação de Napier para escoamento crítico, com os fatores de correção declarados. Você pode refazer a conta."
            />
            <div className="linha-botoes">
              <Botao href="/calculadora" seta>
                Abrir a calculadora
              </Botao>
              <Botao href="/referencias" variante="secundario">
                Ver as referências
              </Botao>
            </div>
          </div>
          <div className="card">
            <IlustracaoUltrassom />
            <p className="t-small t-mudo" style={{ marginTop: 16 }}>
              A medição em campo identifica o ponto que está passando vapor vivo. A
              metodologia converte essa condição em massa e em reais.
            </p>
          </div>
        </div>
      </Secao>

      <Secao fundo="alt">
        <div style={{ maxWidth: '68ch' }} className="pilha-6">
          <TituloSecao marcador="1. Fundamentação" titulo="Escoamento crítico" />
          <div className="prosa t-body t-mudo">
            <p>
              Um purgador travado aberto descarregando para a atmosfera ou para uma linha
              de retorno de baixa pressão opera em <strong>regime sônico</strong>: o
              escoamento atinge a velocidade do som no orifício e deixa de depender da
              pressão a jusante. Formalmente, quando (p₁ − p₂) / p₁ ≥ 0,691 — condição
              praticamente sempre atendida na operação industrial.
            </p>
            <p>
              Nesse regime vale a Equação de Napier, que mantém coerência dimensional
              estrita com a ISO 5167 e a IEC 60534.
            </p>
          </div>

          <div
            className="card num"
            style={{ overflowX: 'auto', background: 'var(--bg)', fontSize: 17 }}
          >
            ms<sub>(teórico)</sub> = 0,66 × 2,73 × C × (d₀ / 4,654)² × √(Fγ × x
            <sub>T</sub> × p₁ × ρ)
          </div>

          <div className="tabela-wrap">
            <table className="tabela">
              <caption className="so-leitor">Termos da equação</caption>
              <thead>
                <tr>
                  <th scope="col">Termo</th>
                  <th scope="col">O que é</th>
                </tr>
              </thead>
              <tbody>
                {CONSTANTES.map(([termo, texto]) => (
                  <tr key={termo}>
                    <td className="num" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {termo}
                    </td>
                    <td className="t-mudo">{texto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Secao>

      <Secao>
        <div style={{ maxWidth: '68ch' }} className="pilha-6">
          <TituloSecao
            marcador="2. Ajuste"
            titulo="Do laboratório para a planta"
            lead="A física de Napier é inquestionável em condição ideal. Purgador real opera com condensado intermitente, pressão flutuante e desgaste irregular."
          />

          <div
            className="card num"
            style={{ overflowX: 'auto', background: 'var(--bg)', fontSize: 17 }}
          >
            ms<sub>(OIKOS)</sub> = ms<sub>(teórico)</sub> × FT × FC
          </div>

          <div className="grade-2">
            <div className="card card-filete pilha-2">
              <span className="t-data" style={{ color: 'var(--azul-700)' }}>
                FT = 0,6
              </span>
              <h3 className="t-h3">Fator de Trabalho</h3>
              <p className="t-body t-mudo">
                Absorve a dinâmica real de campo: o vazamento de vapor vivo é parcialmente
                interrompido pela chegada intermitente de condensado ao orifício de
                descarga.
              </p>
            </div>
            <div className="card card-filete pilha-2">
              <span className="t-data" style={{ color: 'var(--verde)' }}>
                FC = 0,7
              </span>
              <h3 className="t-h3">Fator de Conservadorismo</h3>
              <p className="t-body t-mudo">
                Margem de segurança operacional padrão. Protege a estimativa contra
                superdimensionamento, para que a projeção financeira sobreviva à
                auditoria de quem vai aprovar a verba.
              </p>
            </div>
          </div>
        </div>
      </Secao>

      <Secao fundo="alt">
        <TituloSecao
          marcador="Exemplos"
          titulo="A conta rodando"
          lead="Três pontos típicos, calculados pela mesma engine que roda no laudo e na calculadora deste site."
        />
        <div className="tabela-wrap" style={{ marginTop: 40 }}>
          <table className="tabela">
            <thead>
              <tr>
                <th scope="col">Bitola</th>
                <th scope="col" className="num">
                  Orifício
                </th>
                <th scope="col" className="num">
                  Pressão
                </th>
                <th scope="col" className="num">
                  Teórico
                </th>
                <th scope="col" className="num">
                  Após FT e FC
                </th>
              </tr>
            </thead>
            <tbody>
              {EXEMPLOS.map((e) => (
                <tr key={e.rotulo}>
                  <td style={{ fontWeight: 600 }}>{e.rotulo}</td>
                  <td className="num t-mudo">{e.diametroMm.toFixed(1)} mm</td>
                  <td className="num t-mudo">{e.pressao} bar</td>
                  <td className="num t-mudo">
                    {e.teorico.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} kg/h
                  </td>
                  <td className="num" style={{ fontWeight: 600 }}>
                    {e.oikos.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} kg/h
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="t-small t-mudo" style={{ marginTop: 16 }}>
          A perda cresce com o quadrado do diâmetro do orifício: dobrar o furo multiplica a
          perda por quatro. É por isso que o diâmetro real de cada ponto é registrado em
          campo, e não estimado por média.
        </p>
      </Secao>

      <Secao fundo="escura">
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              marcador="3. Transparência"
              titulo="Honestidade técnica em primeiro lugar"
            />
            <div className="prosa t-body t-mudo">
              <p>
                Todo cálculo de perda de vapor carrega uma incerteza inerente de{' '}
                {Math.round(INCERTEZA.minima * 100)}% a {Math.round(INCERTEZA.maxima * 100)}%.
                A Oikos documenta abertamente essa variabilidade em vez de escondê-la.
              </p>
              <p>
                Rejeitamos equações empíricas cegas — fórmulas que somam linearmente
                pressão manométrica com densidade quebram a coerência dimensional e não
                sobrevivem a uma conferência técnica. Entregamos a física, ajustada por
                fatores abertos e auditáveis.
              </p>
              <p>
                Nossa proposta não é precisão decimal irreal, algo impossível dadas as
                variáveis dinâmicas de uma planta de vapor. É uma estimativa defensável,
                capaz de embasar decisão gerencial com segurança.
              </p>
            </div>
            <div className="linha-botoes">
              <Botao href="/contato" seta>
                {OFERTA.ctaPrimario}
              </Botao>
            </div>
          </div>

          <div className="grade-2" style={{ gap: 24 }}>
            <div className="card-vidro">
              <KPI
                valor={`${Math.round(INCERTEZA.minima * 100)}–${Math.round(INCERTEZA.maxima * 100)}%`}
                rotulo="Incerteza declarada"
                nota="publicada, não escondida"
              />
            </div>
            <div className="card-vidro">
              <KPI valor="ISO 5167" rotulo="Coerência dimensional" nota="e IEC 60534" />
            </div>
          </div>
        </div>
      </Secao>
    </>
  );
}
