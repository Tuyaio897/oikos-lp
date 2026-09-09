import type { Metadata } from 'next';
import { Secao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { Dado, KPI } from '@/components/data/Dado';
import { FAQ } from '@/components/blocks/FAQ';

/** QA visual do design system (§14, Fase 2). Fora do índice de busca. */
export const metadata: Metadata = {
  title: 'Styleguide (interno)',
  robots: { index: false, follow: false },
};

const CORES = [
  ['--azul-950', 'Azul 950 (superfície escura)'],
  ['--azul', 'Azul Industrial'],
  ['--azul-700', 'Azul 700 (texto e botão)'],
  ['--azul-500', 'Azul 500 (realce)'],
  ['--azul-100', 'Azul 100'],
  ['--azul-50', 'Azul 50 (fundo alternado)'],
  ['--verde-800', 'Vapor Oliva'],
  ['--verde', 'Verde (texto sobre claro)'],
  ['--verde-500', 'Verde 500 (status operando)'],
  ['--verde-50', 'Verde 50 (fundo alternado)'],
  ['--laranja', 'Laranja Energia (dado de perda)'],
  ['--laranja-700', 'Laranja 700 (texto sobre claro)'],
  ['--grafite', 'Grafite (texto)'],
  ['--grafite-500', 'Grafite 500 (texto secundário)'],
  ['--border', 'Borda'],
];

const STATUS = [
  ['chip-ok', 'Operando'],
  ['chip-vazando', 'Vazando'],
  ['chip-bloqueado', 'Bloqueado'],
  ['chip-fora', 'Fora de operação'],
  ['chip-nao-aval', 'Não avaliado'],
];

export default function Styleguide() {
  return (
    <>
      <Secao>
        <h1 className="t-display">Styleguide</h1>
        <p className="t-body-lg t-mudo prosa" style={{ marginTop: 16 }}>
          Página interna de QA visual. Não indexada, não linkada na navegação.
        </p>
      </Secao>

      <Secao fundo="alt">
        <h2 className="t-h2">Escala tipográfica</h2>
        <div className="pilha-6" style={{ marginTop: 32 }}>
          <p className="t-display">display, 34/60px</p>
          <p className="t-h2">h2, 26/40px</p>
          <p className="t-h3">h3, 20/24px</p>
          <p className="t-body-lg">body-lg, 17/19px</p>
          <p className="t-body">body, 16/17px</p>
          <p className="t-small">small, 14px</p>
          <p className="t-data">1.234.567</p>
        </div>
      </Secao>

      <Secao>
        <h2 className="t-h2">Cores</h2>
        <div
          style={{
            marginTop: 32,
            display: 'grid',
            gap: 16,
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          }}
        >
          {CORES.map(([token, nome]) => (
            <div key={token} className="pilha-2">
              <div
                style={{
                  height: 64,
                  background: `var(${token})`,
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--raio-card)',
                }}
              />
              <p className="t-small" style={{ fontWeight: 600 }}>
                {nome}
              </p>
              <code className="t-small t-mudo">{token}</code>
            </div>
          ))}
        </div>
      </Secao>

      <Secao fundo="alt">
        <h2 className="t-h2">Botões e tags</h2>
        <div className="linha-botoes" style={{ marginTop: 32 }}>
          <Botao href="#">Primário</Botao>
          <Botao href="#" variante="secundario">
            Secundário
          </Botao>
          <Botao href="#" variante="verde">
            Verde
          </Botao>
        </div>
        <div className="linha-botoes" style={{ marginTop: 24 }}>
          <span className="tag">Tag</span>
          {STATUS.map(([classe, rotulo]) => (
            <span key={classe} className={`chip-status ${classe}`}>
              {rotulo}
            </span>
          ))}
        </div>
      </Secao>

      <Secao>
        <h2 className="t-h2">Dados</h2>
        <div className="grade-3" style={{ marginTop: 32 }}>
          <Dado valor="15 a 30%" fonte="doeFemp">
            dos purgadores falham sem programa regular de inspeção.
          </Dado>
          <KPI valor="250" rotulo="Purgadores avaliados" nota="planta de exemplo" />
          <KPI valor="R$ 612 mil" rotulo="Perda anual estimada" />
        </div>
      </Secao>

      <Secao fundo="alt">
        <h2 className="t-h2">Tabela</h2>
        <div className="tabela-wrap" style={{ marginTop: 32, background: 'var(--bg)' }}>
          <table className="tabela">
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Status</th>
                <th scope="col" className="num">
                  Perda (kg/h)
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
              </tr>
              <tr>
                <td>PV-1043</td>
                <td>
                  <span className="chip-status chip-ok">Operando</span>
                </td>
                <td className="num"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Secao>

      <Secao>
        <h2 className="t-h2">Formulário</h2>
        <div className="pilha-4" style={{ marginTop: 32, maxWidth: 420 }}>
          <div className="campo">
            <label className="campo-rotulo" htmlFor="sg-texto">
              Campo de texto
            </label>
            <input id="sg-texto" className="campo-input" placeholder="Placeholder" />
          </div>
          <div className="campo">
            <label className="campo-rotulo" htmlFor="sg-select">
              Seleção
            </label>
            <select id="sg-select" className="campo-select" defaultValue="a">
              <option value="a">Opção A</option>
              <option value="b">Opção B</option>
            </select>
          </div>
          <div className="campo">
            <label className="campo-rotulo" htmlFor="sg-erro">
              Campo com erro
            </label>
            <input id="sg-erro" className="campo-input" aria-invalid="true" />
            <p className="campo-erro">Mensagem de erro.</p>
          </div>
        </div>
      </Secao>

      <Secao fundo="alt">
        <h2 className="t-h2">FAQ</h2>
        <div style={{ marginTop: 32, maxWidth: 720 }}>
          <FAQ
            perguntas={[
              { pergunta: 'Primeira pergunta', resposta: 'Resposta curta, de duas a quatro linhas.' },
              { pergunta: 'Segunda pergunta', resposta: 'Outra resposta curta.' },
            ]}
          />
        </div>
      </Secao>
    </>
  );
}
