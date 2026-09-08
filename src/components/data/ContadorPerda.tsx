'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  CALCULADORA_PUBLICADA,
  PADRAO,
  calcularPerda,
  formatarBRL,
  reaisPorSegundo,
} from '@/lib/calculo-perda';
import { FONTES } from '@/lib/fontes';

/**
 * Elemento de dado do herói (§7.3).
 *
 * O contador só corre quando a engine já tem a tabela oficial de perda: a taxa
 * de incremento vem da mesma fórmula da calculadora, então publicá-lo com a
 * tabela provisória seria publicar um número que o laudo não sustenta (§9).
 * Enquanto isso, o mesmo espaço mostra o dado de literatura, com fonte — que é
 * igualmente concreto e é verdadeiro hoje.
 */
export function ContadorPerda() {
  if (!CALCULADORA_PUBLICADA) return <CartaoReferencia />;
  return <CartaoContador />;
}

function CartaoReferencia() {
  return (
    <div className="card pilha-2">
      <p className="t-small" style={{ fontWeight: 600 }}>
        Purgadores em falha numa planta sem programa de inspeção
      </p>
      <p className="t-data" style={{ color: 'var(--oikos-laranja-700)' }}>
        15% a 30%
      </p>
      <p className="t-small t-mudo">
        do parque instalado, operando com perda ativa — 24 horas por dia, sem alarme.
      </p>
      <p className="t-small t-mudo" style={{ marginTop: 8 }}>
        Fonte:{' '}
        <a
          href={FONTES.doeFemp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-azul"
        >
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
  const [valor, setValor] = useState(0);
  const [animado, setAnimado] = useState(true);
  const inicio = useRef<number | null>(null);
  const quadro = useRef<number | null>(null);

  const porSegundo = reaisPorSegundo(PADRAO);
  const { purgadoresComFalha } = calcularPerda(PADRAO);

  useEffect(() => {
    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (consulta.matches) {
      setAnimado(false);
      // Valor estático equivalente a um minuto de operação.
      setValor(porSegundo * 60);
      return;
    }

    const passo = (agora: number) => {
      if (inicio.current === null) inicio.current = agora;
      setValor(((agora - inicio.current) / 1000) * porSegundo);
      quadro.current = requestAnimationFrame(passo);
    };
    quadro.current = requestAnimationFrame(passo);

    return () => {
      if (quadro.current !== null) cancelAnimationFrame(quadro.current);
    };
  }, [porSegundo]);

  return (
    <div className="card pilha-2">
      <p className="t-small" style={{ fontWeight: 600 }}>
        Perda estimada em uma planta média de {PADRAO.purgadores} purgadores
      </p>

      <p className="t-data" style={{ color: 'var(--oikos-laranja-700)' }} aria-live="off">
        {formatarBRL(valor)}
      </p>

      <p className="t-small t-mudo">
        {animado ? 'desde que você abriu esta página' : 'a cada minuto de operação'}
      </p>

      <p className="t-small t-mudo" style={{ marginTop: 8 }}>
        Premissa: {purgadoresComFalha} purgadores com falha (20%) · {PADRAO.pressaoBar} bar ·
        vapor a R$ {PADRAO.custoVaporPorTonelada}/t · operação{' '}
        {PADRAO.horasAno.toLocaleString('pt-BR')} h/ano.
      </p>

      <Link href="/calculadora" className="link-azul t-small" style={{ marginTop: 4 }}>
        Ajuste com os dados da sua planta →
      </Link>
    </div>
  );
}
