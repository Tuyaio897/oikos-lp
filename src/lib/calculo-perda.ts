/**
 * Engine de estimativa de perda por purgador com falha (§9).
 *
 * ATENCAO — [BLOQUEADOR] em aberto:
 * A tabela `PERDA_KG_H` abaixo e PROVISORIA e conservadora. A tabela oficial
 * por DN e pressao vive na engine do aplicativo Oikos (a mesma que gera os
 * 313,71 / 43,11 / 12,99 kg/h do relatorio RPV) e precisa substituir esta.
 *
 * Enquanto `TABELA_OFICIAL` for false, a calculadora publica fica desligada
 * pela flag `CALCULADORA_PUBLICADA` — o §9 e explicito: "nao publicar a
 * calculadora com o placeholder".
 */

// TODO(bloqueador): substituir pela tabela oficial da engine do app Oikos,
// indexada por DN e pressao. Enquanto isso, valores conservadores por pressao.
const PERDA_KG_H: Record<number, number> = {
  4: 6,
  6: 9,
  8: 12,
  10: 15,
  12: 18,
  15: 23,
  20: 30,
};

/** Vira true quando PERDA_KG_H for a tabela oficial do app. */
export const TABELA_OFICIAL = false;

/** A calculadora so vai ao ar com numero oficial (§9). */
export const CALCULADORA_PUBLICADA = TABELA_OFICIAL;

export const PRESSOES = [4, 6, 8, 10, 12, 15, 20] as const;
export const HORAS_ANO = [4000, 6000, 8000, 8760] as const;

/** Taxas de falha assumidas, conforme DOE/FEMP (§7.5). */
export const TAXA_FALHA = {
  comPrograma: 0.08,
  semPrograma: 0.2,
} as const;

export type EntradaCalculo = {
  purgadores: number;
  pressaoBar: number;
  custoVaporPorTonelada: number;
  horasAno: number;
  temProgramaInspecao: boolean;
};

export type ResultadoCalculo = {
  purgadoresComFalha: number;
  taxaFalha: number;
  perdaKgH: number;
  /** Faixa, nunca um numero unico (§9). */
  minimoAnual: number;
  maximoAnual: number;
  central: number;
};

export const PADRAO: EntradaCalculo = {
  purgadores: 250,
  pressaoBar: 8,
  custoVaporPorTonelada: 250,
  horasAno: 8000,
  temProgramaInspecao: false,
};

function perdaMediaKgH(pressaoBar: number): number {
  if (PERDA_KG_H[pressaoBar] !== undefined) return PERDA_KG_H[pressaoBar];
  // Interpola linearmente entre as pressoes tabeladas mais proximas.
  const chaves = Object.keys(PERDA_KG_H)
    .map(Number)
    .sort((a, b) => a - b);
  const abaixo = [...chaves].reverse().find((p) => p < pressaoBar) ?? chaves[0];
  const acima = chaves.find((p) => p > pressaoBar) ?? chaves[chaves.length - 1];
  if (abaixo === acima) return PERDA_KG_H[abaixo];
  const fracao = (pressaoBar - abaixo) / (acima - abaixo);
  return PERDA_KG_H[abaixo] + fracao * (PERDA_KG_H[acima] - PERDA_KG_H[abaixo]);
}

/**
 * perda_anual = n_purgadores x taxa_falha x perda_kg_h x horas_ano
 *               x (custo_vapor_por_tonelada / 1000)
 *
 * A faixa e +/- 30% em torno do valor central, refletindo a dispersao real de
 * orificio, tipo de purgador e regime de operacao.
 */
export function calcularPerda(entrada: EntradaCalculo): ResultadoCalculo {
  const taxaFalha = entrada.temProgramaInspecao
    ? TAXA_FALHA.comPrograma
    : TAXA_FALHA.semPrograma;

  const purgadoresComFalha = Math.round(entrada.purgadores * taxaFalha);
  const perdaKgH = perdaMediaKgH(entrada.pressaoBar);

  const central =
    purgadoresComFalha *
    perdaKgH *
    entrada.horasAno *
    (entrada.custoVaporPorTonelada / 1000);

  return {
    purgadoresComFalha,
    taxaFalha,
    perdaKgH,
    central,
    minimoAnual: central * 0.7,
    maximoAnual: central * 1.3,
  };
}

/**
 * Taxa de incremento do contador do heroi (§7.3), em R$ por segundo.
 * Vem da mesma formula acima — nao e um numero magico.
 */
export function reaisPorSegundo(entrada: EntradaCalculo = PADRAO): number {
  const { central } = calcularPerda(entrada);
  return central / (entrada.horasAno * 3600);
}

const FORMATADOR_BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

export function formatarBRL(valor: number): string {
  return FORMATADOR_BRL.format(valor);
}

/** "R$ 380 mil" / "R$ 1,2 milhão" — para faixas, onde o centavo e ruido. */
export function formatarBRLCurto(valor: number): string {
  if (valor >= 1_000_000) {
    const milhoes = valor / 1_000_000;
    const texto = milhoes.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
    return `R$ ${texto} ${milhoes >= 2 ? 'milhões' : 'milhão'}`;
  }
  if (valor >= 1000) {
    return `R$ ${Math.round(valor / 1000).toLocaleString('pt-BR')} mil`;
  }
  return formatarBRL(valor);
}
