'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  CALCULADORA_PUBLICADA,
  PADRAO,
  calcularPerda,
  formatarBRLCurto,
  reaisPorSegundo,
} from '@/lib/calculo-perda';
import { FONTES } from '@/lib/fontes';

const CENTAVOS = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Elemento de dado do herói (§7.3).
 *
 * O número grande é a estimativa anual, que é o que impressiona e o que se
 * leva embora. O contador ao vivo entra abaixo, com centavos: na metodologia
 * real a perda acumula cerca de R$ 0,05 por segundo, então um contador sem
 * casas decimais ficaria parado em "R$ 0" nos primeiros vinte segundos.
 *
 * A taxa vem da mesma fórmula da calculadora — não é número mágico. Em
 * `prefers-reduced-motion` o contador não corre.
 */
export function ContadorPerda() {
  if (!CALCULADORA_PUBLICADA) return <CartaoReferencia />;
  return <CartaoContador />;
}

/** Usado enquanto a metodologia oficial não estiver na engine. */
function CartaoReferencia() {
  return (
    <div className="card pilha-2">
      <p className="t-small" style={{ fontWeight: 600 }}>
        Purgadores em falha numa planta sem programa de inspeção
      </p>
      <p className="t-data" style={{ color: 'var(--laranja-700)' }}>
        15% a 30%
      </p>
      <p className="t-small t-mudo">
        do parque instalado, operando com perda ativa — 24 horas por dia, sem alarme.
      </p>
      <p className="t-small t-mudo" style={{ marginTop: 8 }}>
        Fonte:{' '}
        <a href={FONTES.doeFemp.href} target="_blank" rel="noopener noreferrer" className="link-azul">
          {FONTES.doeFemp.rotulo}
        </a>
      </p>
      <Link href="/laudo-exemplo" className="link-azul t-small" style={{ marginTop: 4 }}>
        Ver como isso aparece num laudo →
      </Link>
    </div>
  );
}

function CartaoContador() {
  const [acumulado, setAcumulado] = useState(0);
  const [animado, setAnimado] = useState(true);
  const inicio = useRef<number | null>(null);
  const quadro = useRef<number | null>(null);

  const porSegundo = reaisPorSegundo(PADRAO);
  const { purgadoresComFalha, minimoAnual, maximoAnual } = calcularPerda(PADRAO);

  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (consulta.matches) {
      setAnimado(false);
      setAcumulado(porSegundo * 60); // valor estático: um minuto de operação
      return;
    }

    const passo = (agora: number) => {
      if (inicio.current === null) inicio.current = agora;
      setAcumulado(((agora - inicio.current) / 1000) * porSegundo);
      quadro.current = requestAnimationFrame(passo);
    };
    quadro.current = requestAnimationFrame(passo);

    return () => {
      if (quadro.current !== null) cancelAnimationFrame(quadro.current);
    };
  }, [porSegundo]);

  return (
    <div className="card card-filete pilha-2">
      <p className="t-small" style={{ fontWeight: 600 }}>
        Perda estimada numa planta de {PADRAO.purgadores} purgadores
      </p>

      <p className="t-data" style={{ color: 'var(--laranja-700)' }}>
        {formatarBRLCurto(minimoAnual)}
        <span
          className="t-body"
          style={{ display: 'block', fontWeight: 400, color: 'var(--grafite-500)' }}
        >
          a {formatarBRLCurto(maximoAnual)} por ano
        </span>
      </p>

      <p
        className="t-small num"
        style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 10,
          marginTop: 4,
          fontWeight: 600,
        }}
      >
        <span style={{ color: 'var(--laranja-700)' }}>{CENTAVOS.format(acumulado)}</span>{' '}
        <span style={{ fontWeight: 400, color: 'var(--grafite-500)' }}>
          {animado ? 'desde que você abriu esta página' : 'a cada minuto de operação'}
        </span>
      </p>

      <p className="t-small t-mudo">
        Premissa: {purgadoresComFalha} pontos com falha (20%, DOE/FEMP) · {PADRAO.pressaoBar} bar ·
        orifício de {PADRAO.diametroOrificioMm} mm · vapor a R$ {PADRAO.custoVaporPorTonelada}/t ·{' '}
        {PADRAO.horasAno.toLocaleString('pt-BR')} h/ano.
      </p>

      <Link href="/calculadora" className="link-azul t-small" style={{ marginTop: 4 }}>
        Ajuste com os dados da sua planta →
      </Link>
    </div>
  );
}
