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
 * Contador ao vivo da perda.
 *
 * A taxa vem da mesma fórmula da calculadora, não de um número mágico. Na
 * metodologia real a perda acumula cerca de R$ 0,05 por segundo, por isso o
 * valor aparece com centavos: sem casas decimais ficaria parado em "R$ 0" nos
 * primeiros vinte segundos.
 *
 * Em `prefers-reduced-motion` o contador não corre e mostra um valor estático.
 */
function useContador(): { valor: number; animado: boolean } {
  const [valor, setValor] = useState(0);
  const [animado, setAnimado] = useState(true);
  const inicio = useRef<number | null>(null);
  const quadro = useRef<number | null>(null);
  const porSegundo = reaisPorSegundo(PADRAO);

  useEffect(() => {
    if (!CALCULADORA_PUBLICADA) return;

    const consulta = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (consulta.matches) {
      setAnimado(false);
      setValor(porSegundo * 60); // valor estático: um minuto de operação
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

  return { valor, animado };
}

/**
 * Cartão compacto que flutua sobre a foto do herói.
 *
 * É estreito de propósito: cobre um canto da imagem, não a imagem inteira.
 */
export function CartaoPerdaHeroi() {
  const { valor, animado } = useContador();
  const { minimoAnual, maximoAnual, purgadoresComFalha } = calcularPerda(PADRAO);

  return (
    <div className="card card-filete pilha-2" style={{ padding: 20 }}>
      <p className="t-small" style={{ fontWeight: 600 }}>
        Perda numa planta de {PADRAO.purgadores} purgadores
      </p>

      <p
        className="num"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(19px, 1.7vw, 24px)',
          lineHeight: 1.15,
          letterSpacing: '-0.025em',
          color: 'var(--laranja-700)',
        }}
      >
        {formatarBRLCurto(minimoAnual)} a {formatarBRLCurto(maximoAnual)}
        <span
          className="t-small"
          style={{ display: 'block', fontWeight: 400, color: 'var(--grafite-500)' }}
        >
          por ano
        </span>
      </p>

      {CALCULADORA_PUBLICADA ? (
        <p
          className="t-small num"
          style={{ borderTop: '1px solid var(--border)', paddingTop: 10, fontWeight: 600 }}
        >
          <span style={{ color: 'var(--laranja-700)' }}>{CENTAVOS.format(valor)}</span>{' '}
          <span style={{ fontWeight: 400, color: 'var(--grafite-500)' }}>
            {animado ? 'desde que você abriu esta página' : 'a cada minuto'}
          </span>
        </p>
      ) : null}

      <p className="t-mudo" style={{ fontSize: 12.5, lineHeight: 1.45 }}>
        {purgadoresComFalha} pontos com falha, {PADRAO.pressaoBar} bar, vapor a R${' '}
        {PADRAO.custoVaporPorTonelada}/t.{' '}
        <Link href="/calculadora" className="link-azul">
          Calcular para a minha planta
        </Link>
      </p>
    </div>
  );
}

/** Contador solto, para faixas de dados sobre fundo escuro. */
export function ContadorPerda() {
  const { valor, animado } = useContador();

  if (!CALCULADORA_PUBLICADA) {
    return (
      <div className="pilha-2">
        <span className="t-data" style={{ color: 'var(--azul-300)' }}>
          24 h por dia
        </span>
        <span className="t-small" style={{ fontWeight: 600 }}>
          É o regime da perda, sem alarme e sem registro
        </span>
        <a
          href={FONTES.doeFemp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-azul t-small"
        >
          {FONTES.doeFemp.rotulo}
        </a>
      </div>
    );
  }

  return (
    <div className="pilha-2">
      <span className="t-data num" style={{ color: 'var(--azul-300)' }}>
        {CENTAVOS.format(valor)}
      </span>
      <span className="t-small" style={{ fontWeight: 600 }}>
        {animado
          ? 'Perdidos desde que você abriu esta página'
          : 'Perdidos a cada minuto de operação'}
      </span>
      <Link href="/calculadora" className="link-azul t-small">
        Ajuste com os dados da sua planta
      </Link>
    </div>
  );
}
