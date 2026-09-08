'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  PADRAO,
  PRESSOES,
  HORAS_ANO,
  calcularPerda,
  formatarBRLCurto,
  type EntradaCalculo,
} from '@/lib/calculo-perda';
import { FONTES } from '@/lib/fontes';
import { rastrear } from '@/lib/analytics';

/**
 * Calculadora de perdas (§9).
 *
 * Regras que o componente respeita:
 *  - cálculo em tempo real, sem botão "calcular";
 *  - o resultado é uma FAIXA, nunca um número único;
 *  - resultado visível sem pedir e-mail;
 *  - metodologia e premissas sempre acessíveis.
 */
export function Calculadora() {
  const [entrada, setEntrada] = useState<EntradaCalculo>(PADRAO);

  const resultado = useMemo(() => calcularPerda(entrada), [entrada]);

  const atualizar = <C extends keyof EntradaCalculo>(campo: C, valor: EntradaCalculo[C]) => {
    setEntrada((e) => ({ ...e, [campo]: valor }));
    rastrear({ nome: 'calculadora_interacao', campo: String(campo) });
  };

  return (
    <div className="grade-2">
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
            onChange={(e) =>
              atualizar('purgadores', Math.max(1, Number(e.target.value) || 1))
            }
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
            style={{ width: '100%', minHeight: 44 }}
            aria-valuetext={`${entrada.pressaoBar} bar`}
          />
          <div className="t-small t-mudo num" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {PRESSOES.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
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
            Se não souber, use o padrão. Gás natural costuma ficar acima dessa faixa;
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
                style={{ width: 20, height: 20 }}
              />
              Sim
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', minHeight: 44 }}>
              <input
                type="radio"
                name="programa"
                checked={!entrada.temProgramaInspecao}
                onChange={() => atualizar('temProgramaInspecao', false)}
                style={{ width: 20, height: 20 }}
              />
              Não
            </label>
          </div>
        </fieldset>
      </div>

      <div className="pilha-6">
        <div className="card pilha-4" aria-live="polite">
          <p className="t-small" style={{ fontWeight: 600 }}>
            Perda estimada da sua planta
          </p>
          <p className="t-data" style={{ color: 'var(--oikos-laranja-700)' }}>
            {formatarBRLCurto(resultado.minimoAnual)} a {formatarBRLCurto(resultado.maximoAnual)}
            <span className="t-body" style={{ display: 'block', fontWeight: 400, color: 'var(--oikos-grafite-600)' }}>
              por ano
            </span>
          </p>
          <p className="t-small t-mudo">
            Baseado em {entrada.purgadores.toLocaleString('pt-BR')} purgadores,{' '}
            {Math.round(resultado.taxaFalha * 100)}% de taxa de falha estimada (
            {resultado.purgadoresComFalha.toLocaleString('pt-BR')} pontos), vapor a R${' '}
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
          <summary style={{ fontWeight: 600, cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center' }}>
            Entender a metodologia
          </summary>
          <div className="pilha-4" style={{ marginTop: 16 }}>
            <p className="t-body t-mudo">
              A estimativa multiplica a quantidade de purgadores pela taxa de falha
              assumida, pela perda média de massa no ponto (kg/h), pelas horas de operação
              e pelo custo do vapor por tonelada.
            </p>
            <p className="t-body t-mudo">
              A taxa de falha padrão é de 20% sem programa regular de inspeção e 8% com
              programa ativo, conforme as referências do DOE/FEMP. A faixa exibida é de
              ±30% em torno do valor central, refletindo a dispersão real de orifício, tipo
              de purgador e regime de operação.
            </p>
            <p className="t-small t-mudo">
              Fonte:{' '}
              <a href={FONTES.doeFemp.href} target="_blank" rel="noopener noreferrer" className="link-azul">
                {FONTES.doeFemp.rotulo}
              </a>
            </p>
          </div>
        </details>

        <p className="t-small t-mudo">
          Estimativa baseada em referências setoriais. O valor real só é conhecido após
          inspeção. Não constitui compromisso de resultado.
        </p>
      </div>
    </div>
  );
}
