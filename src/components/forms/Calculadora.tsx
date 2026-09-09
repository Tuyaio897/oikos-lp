'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  PADRAO,
  PRESSOES,
  HORAS_ANO,
  ORIFICIOS_TIPICOS,
  INCERTEZA,
  calcularPerda,
  formatarBRLCurto,
  type EntradaCalculo,
} from '@/lib/calculo-perda';
import { rastrear } from '@/lib/analytics';

/**
 * Calculadora de perdas (§9), rodando a Metodologia OIKOS (Base Napier).
 *
 * Regras que o componente respeita:
 *  - cálculo em tempo real, sem botão "calcular";
 *  - o resultado é uma FAIXA, nunca um número único;
 *  - resultado visível sem pedir e-mail;
 *  - premissas e metodologia sempre acessíveis.
 */
export function Calculadora() {
  const [entrada, setEntrada] = useState<EntradaCalculo>(PADRAO);

  const resultado = useMemo(() => calcularPerda(entrada), [entrada]);

  const atualizar = <C extends keyof EntradaCalculo>(campo: C, valor: EntradaCalculo[C]) => {
    setEntrada((e) => ({ ...e, [campo]: valor }));
    rastrear({ nome: 'calculadora_interacao', campo: String(campo) });
  };

  return (
    <div className="grade-2 topo">
      <div className="pilha-6">
        <div className="campo">
          <label className="campo-rotulo" htmlFor="purgadores">
            Quantidade de purgadores na planta
          </label>
          <input
            id="purgadores"
            type="number"
            min={1}
            max={10000}
            className="campo-input"
            value={entrada.purgadores}
            onChange={(e) => atualizar('purgadores', Math.max(1, Number(e.target.value) || 1))}
          />
        </div>

        <div className="campo">
          <label className="campo-rotulo" htmlFor="pressao">
            Pressão média de operação:{' '}
            <span className="num">{entrada.pressaoBar} bar</span>
          </label>
          <input
            id="pressao"
            type="range"
            min={0}
            max={PRESSOES.length - 1}
            step={1}
            value={PRESSOES.indexOf(entrada.pressaoBar as (typeof PRESSOES)[number])}
            onChange={(e) => atualizar('pressaoBar', PRESSOES[Number(e.target.value)])}
            style={{ width: '100%', minHeight: 44, accentColor: 'var(--azul-500)' }}
            aria-valuetext={`${entrada.pressaoBar} bar manométricos`}
          />
          <div
            className="t-small t-mudo num"
            style={{ display: 'flex', justifyContent: 'space-between' }}
            aria-hidden="true"
          >
            {PRESSOES.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>

        <div className="campo">
          <label className="campo-rotulo" htmlFor="orificio">
            Diâmetro do orifício de descarga:{' '}
            <span className="num">{entrada.diametroOrificioMm.toFixed(1)} mm</span>
          </label>
          <input
            id="orificio"
            type="range"
            min={1}
            max={12}
            step={0.1}
            value={entrada.diametroOrificioMm}
            onChange={(e) => atualizar('diametroOrificioMm', Number(e.target.value))}
            style={{ width: '100%', minHeight: 44, accentColor: 'var(--azul-500)' }}
            aria-valuetext={`${entrada.diametroOrificioMm.toFixed(1)} milímetros`}
          />
          <div className="linha-botoes" style={{ gap: 8 }}>
            {ORIFICIOS_TIPICOS.map((o) => (
              <button
                key={o.rotulo}
                type="button"
                className="tag"
                aria-pressed={entrada.diametroOrificioMm === o.diametroMm}
                onClick={() => atualizar('diametroOrificioMm', o.diametroMm)}
                style={
                  entrada.diametroOrificioMm === o.diametroMm
                    ? { background: 'var(--azul-100)', borderColor: 'var(--azul-500)' }
                    : undefined
                }
              >
                {o.rotulo}
              </button>
            ))}
          </div>
          <p className="t-small t-mudo">
            É o diâmetro que mais pesa no resultado, a perda cresce com o quadrado dele.
            Se não souber, use a bitola típica acima.
          </p>
        </div>

        <div className="campo">
          <label className="campo-rotulo" htmlFor="custoVapor">
            Custo do vapor (R$ por tonelada)
          </label>
          <input
            id="custoVapor"
            type="number"
            min={1}
            className="campo-input"
            value={entrada.custoVaporPorTonelada}
            onChange={(e) =>
              atualizar('custoVaporPorTonelada', Math.max(1, Number(e.target.value) || 1))
            }
          />
          <p className="t-small t-mudo">
            Peça à área de utilidades. Gás natural costuma ficar acima dessa faixa;
            biomassa, abaixo.
          </p>
        </div>

        <div className="campo">
          <label className="campo-rotulo" htmlFor="horas">
            Horas de operação por ano
          </label>
          <select
            id="horas"
            className="campo-select"
            value={entrada.horasAno}
            onChange={(e) => atualizar('horasAno', Number(e.target.value))}
          >
            {HORAS_ANO.map((h) => (
              <option key={h} value={h}>
                {h.toLocaleString('pt-BR')} h
              </option>
            ))}
          </select>
        </div>

        <fieldset className="campo" style={{ border: 'none' }}>
          <legend className="campo-rotulo" style={{ marginBottom: 8 }}>
            Existe programa regular de inspeção?
          </legend>
          <div className="linha-botoes">
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', minHeight: 44 }}>
              <input
                type="radio"
                name="programa"
                checked={entrada.temProgramaInspecao}
                onChange={() => atualizar('temProgramaInspecao', true)}
                style={{ width: 20, height: 20, accentColor: 'var(--azul-500)' }}
              />
              Sim
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', minHeight: 44 }}>
              <input
                type="radio"
                name="programa"
                checked={!entrada.temProgramaInspecao}
                onChange={() => atualizar('temProgramaInspecao', false)}
                style={{ width: 20, height: 20, accentColor: 'var(--azul-500)' }}
              />
              Não
            </label>
          </div>
        </fieldset>
      </div>

      <div className="pilha-6">
        <div className="card card-filete pilha-4" aria-live="polite">
          <p className="t-small" style={{ fontWeight: 600 }}>
            Perda estimada da sua planta
          </p>
          <p className="t-data" style={{ color: 'var(--laranja-700)' }}>
            {formatarBRLCurto(resultado.minimoAnual)} a{' '}
            {formatarBRLCurto(resultado.maximoAnual)}
            <span
              className="t-body"
              style={{ display: 'block', fontWeight: 400, color: 'var(--grafite-500)' }}
            >
              por ano
            </span>
          </p>

          <div className="tabela-wrap" style={{ boxShadow: 'none' }}>
            <table className="tabela" style={{ minWidth: 0 }}>
              <tbody>
                <tr>
                  <td className="t-mudo">Purgadores com falha estimados</td>
                  <td className="num" style={{ fontWeight: 600 }}>
                    {resultado.purgadoresComFalha.toLocaleString('pt-BR')} de{' '}
                    {entrada.purgadores.toLocaleString('pt-BR')}
                  </td>
                </tr>
                <tr>
                  <td className="t-mudo">Perda por ponto</td>
                  <td className="num" style={{ fontWeight: 600 }}>
                    {resultado.perdaKgHporPonto.toLocaleString('pt-BR', {
                      maximumFractionDigits: 2,
                    })}{' '}
                    kg/h
                  </td>
                </tr>
                <tr>
                  <td className="t-mudo">Vapor perdido por ano</td>
                  <td className="num" style={{ fontWeight: 600 }}>
                    {Math.round(resultado.toneladasAno).toLocaleString('pt-BR')} t
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="t-small t-mudo">
            Taxa de falha assumida de {Math.round(resultado.taxaFalha * 100)}% (DOE/FEMP),{' '}
            {entrada.pressaoBar} bar, orifício de{' '}
            {entrada.diametroOrificioMm.toFixed(1)} mm, vapor a R${' '}
            {entrada.custoVaporPorTonelada}/t, {entrada.horasAno.toLocaleString('pt-BR')} h/ano.
          </p>

          <Link
            href="/contato"
            className="btn btn-primario"
            onClick={() => rastrear({ nome: 'calculadora_cta' })}
          >
            Quero o cálculo real da minha planta
          </Link>
        </div>

        <details className="card">
          <summary
            style={{
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: 44,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Entender a metodologia
          </summary>
          <div className="pilha-4" style={{ marginTop: 16 }}>
            <p className="t-body t-mudo">
              A perda de cada ponto vem da Equação de Napier para escoamento crítico de
              fluidos compressíveis, a mesma física do laudo, não uma fórmula empírica.
            </p>
            <p
              className="t-small num"
              style={{
                background: 'var(--azul-50)',
                border: '1px solid var(--azul-100)',
                borderRadius: 'var(--raio-btn)',
                padding: 12,
                overflowX: 'auto',
              }}
            >
              ms = 0,66 × 2,73 × C × (d₀ / 4,654)² × √(Fγ × x<sub>T</sub> × p₁ × ρ) × FT × FC
            </p>
            <p className="t-body t-mudo">
              Sobre o resultado teórico aplicamos o Fator de Trabalho (0,6), que absorve a
              chegada intermitente de condensado ao orifício, e o Fator de Conservadorismo
              (0,7), nossa margem de segurança contra superdimensionamento.
            </p>
            <p className="t-body t-mudo">
              A faixa exibida reflete a incerteza documentada de{' '}
              {Math.round(INCERTEZA.minima * 100)}% a {Math.round(INCERTEZA.maxima * 100)}%
              que todo cálculo de perda de vapor carrega. Publicamos essa variabilidade em
              vez de fingir precisão decimal.
            </p>
            <Link href="/metodologia" className="link-seta t-small">
              Ver a metodologia completa →
            </Link>
          </div>
        </details>

        <p className="t-small t-mudo">
          Estimativa baseada na metodologia Oikos e em taxas de falha de referência
          setorial. O valor real só é conhecido após inspeção. Não constitui compromisso de
          resultado.
        </p>
      </div>
    </div>
  );
}
