/**
 * Engine de cálculo de perda por purgador com falha do tipo blow-thru.
 *
 * Implementa a Metodologia OIKOS de Cálculo de Vazamento (Base Napier), v4.
 * Esta é a MESMA física do aplicativo e do relatório RPV — o site não pode
 * divergir do laudo.
 *
 * Validação: a implementação reproduz os três valores citados no relatório de
 * demonstração com desvio inferior a 0,6%:
 *
 *   d0 = 10,0 mm @ 20 bar g  ->  311,8 kg/h   (relatório: 313,71)
 *   d0 =  5,1 mm @ 10 bar g  ->   42,9 kg/h   (relatório:  43,11)
 *   d0 =  3,1 mm @  8 bar g  ->   13,0 kg/h   (relatório:  12,99)
 */

// ── Constantes da Equação de Napier (documento de metodologia, §1.1) ────────
/** Fator de escoamento crítico derivado da termodinâmica de gases. */
const K_CRITICO = 0.66;
/** Conversão de unidades: m³/s para kg/h. */
const K_UNIDADES = 2.73;
/** Coeficiente de descarga padrão para orifícios em vapor. */
const C_DESCARGA = 0.72;
/** Constante de normalização para entrada de diâmetro em milímetros. */
const K_DIAMETRO = 4.654;
/** Fator de calor específico para vapor saturado. */
const F_GAMA = 0.96;
/** Fator de pressão diferencial. */
const X_T = 0.72;

// ── Ajuste para o mundo real (documento de metodologia, §2) ─────────────────
/**
 * Fator de Trabalho. Absorve a dinâmica de campo: o vazamento de vapor vivo é
 * parcialmente interrompido pela chegada intermitente de condensado ao orifício.
 */
const FATOR_TRABALHO = 0.6;
/**
 * Fator de Conservadorismo. Margem de segurança operacional padrão, para
 * proteger a estimativa contra superdimensionamento.
 */
const FATOR_CONSERVADORISMO = 0.7;

/**
 * Incerteza documentada de todo cálculo de perda de vapor (metodologia, §3).
 * A Oikos publica essa variabilidade em vez de fingir precisão decimal.
 */
export const INCERTEZA = { minima: 0.2, maxima: 0.3 } as const;

/** Pressão atmosférica ao nível do mar, em bar. */
const P_ATMOSFERICA = 1.01325;

/**
 * Densidade do vapor saturado (kg/m³) por pressão absoluta (bar a).
 * Valores de tabela de vapor; interpolados linearmente entre os pontos.
 */
const DENSIDADE_VAPOR: Record<number, number> = {
  1: 0.59, 2: 1.129, 3: 1.651, 4: 2.163, 5: 2.669, 6: 3.17, 7: 3.667,
  8: 4.162, 9: 4.655, 10: 5.145, 11: 5.634, 12: 6.124, 13: 6.612,
  14: 7.1, 15: 7.593, 16: 8.085, 17: 8.579, 18: 9.074, 19: 9.569,
  20: 10.07, 21: 10.57, 22: 11.07,
};

function densidadeVapor(pressaoAbsolutaBar: number): number {
  const limitada = Math.min(Math.max(pressaoAbsolutaBar, 1), 22);
  const inferior = Math.floor(limitada);
  const superior = Math.min(inferior + 1, 22);
  if (inferior === superior) return DENSIDADE_VAPOR[inferior];
  const fracao = limitada - inferior;
  return (
    DENSIDADE_VAPOR[inferior] +
    fracao * (DENSIDADE_VAPOR[superior] - DENSIDADE_VAPOR[inferior])
  );
}

/**
 * Perda de massa de um purgador travado aberto, em kg/h.
 *
 * ms(teórico) = 0,66 × 2,73 × C × (d0 / 4,654)² × √(Fγ × xT × p1 × ρ)
 * ms(OIKOS)   = ms(teórico) × FT × FC
 *
 * @param diametroOrificioMm diâmetro real do orifício de descarga (mm)
 * @param pressaoBarManometrica pressão de operação a montante (bar g)
 */
export function perdaKgH(
  diametroOrificioMm: number,
  pressaoBarManometrica: number,
): { teorico: number; oikos: number } {
  const pressaoAbsolutaBar = pressaoBarManometrica + P_ATMOSFERICA;
  const p1kPa = pressaoAbsolutaBar * 100;
  const rho = densidadeVapor(pressaoAbsolutaBar);

  const areaRelativa = (diametroOrificioMm / K_DIAMETRO) ** 2;
  const raiz = Math.sqrt(F_GAMA * X_T * p1kPa * rho);

  const teorico = K_CRITICO * K_UNIDADES * C_DESCARGA * areaRelativa * raiz;

  return { teorico, oikos: teorico * FATOR_TRABALHO * FATOR_CONSERVADORISMO };
}

/**
 * Condição de aplicação do modelo (metodologia, §1.2): regime sônico, quando
 * (p1 - p2) / p1 ≥ 0,691. Para purgador defeituoso descarregando na atmosfera
 * ou em retorno de baixa pressão, é praticamente sempre atendida.
 */
export function emRegimeSonico(
  pressaoBarManometrica: number,
  pressaoJusanteBarManometrica = 0,
): boolean {
  const p1 = pressaoBarManometrica + P_ATMOSFERICA;
  const p2 = pressaoJusanteBarManometrica + P_ATMOSFERICA;
  return (p1 - p2) / p1 >= 0.691;
}

// ── Calculadora do site ────────────────────────────────────────────────────

/** A calculadora agora roda com a metodologia oficial. */
export const METODOLOGIA_OFICIAL = true;
export const CALCULADORA_PUBLICADA = METODOLOGIA_OFICIAL;

export const PRESSOES = [4, 6, 8, 10, 12, 15, 20] as const;
export const HORAS_ANO = [4000, 6000, 8000, 8760] as const;

/**
 * Diâmetros de orifício típicos por bitola.
 *
 * Derivados por engenharia reversa dos valores publicados no relatório RPV
 * (10,03 mm reproduz os 313,71 kg/h de um DN50 a 20 bar; 5,11 mm reproduz os
 * 43,11 kg/h; 3,10 mm reproduz os 12,99 kg/h). São valores de partida — o
 * diâmetro real do ponto é sempre editável na calculadora.
 *
 * CONFIRMAR com o time técnico se existe tabela oficial de d0 por DN e tipo
 * construtivo. Ver docs/DECISOES.md.
 */
export const ORIFICIOS_TIPICOS = [
  { rotulo: 'DN15', diametroMm: 3.1 },
  { rotulo: 'DN25', diametroMm: 5.1 },
  { rotulo: 'DN50', diametroMm: 10 },
] as const;

/** Taxas de falha assumidas, conforme DOE/FEMP. */
export const TAXA_FALHA = {
  comPrograma: 0.08,
  semPrograma: 0.2,
} as const;

export type EntradaCalculo = {
  purgadores: number;
  pressaoBar: number;
  diametroOrificioMm: number;
  custoVaporPorTonelada: number;
  horasAno: number;
  temProgramaInspecao: boolean;
};

export type ResultadoCalculo = {
  purgadoresComFalha: number;
  taxaFalha: number;
  perdaKgHporPonto: number;
  toneladasAno: number;
  /** Faixa, nunca um número único: a incerteza é documentada, não escondida. */
  minimoAnual: number;
  maximoAnual: number;
  central: number;
};

export const PADRAO: EntradaCalculo = {
  purgadores: 250,
  pressaoBar: 8,
  diametroOrificioMm: 3.1,
  custoVaporPorTonelada: 250,
  horasAno: 8000,
  temProgramaInspecao: false,
};

/**
 * perda_anual = n_purgadores × taxa_falha × perda_kg_h × horas_ano
 *               × (custo_vapor_por_tonelada / 1000)
 *
 * A faixa aplica a incerteza documentada na metodologia (§3).
 */
export function calcularPerda(entrada: EntradaCalculo): ResultadoCalculo {
  const taxaFalha = entrada.temProgramaInspecao
    ? TAXA_FALHA.comPrograma
    : TAXA_FALHA.semPrograma;

  const purgadoresComFalha = Math.round(entrada.purgadores * taxaFalha);
  const { oikos: perdaKgHporPonto } = perdaKgH(
    entrada.diametroOrificioMm,
    entrada.pressaoBar,
  );

  const toneladasAno = (purgadoresComFalha * perdaKgHporPonto * entrada.horasAno) / 1000;
  const central = toneladasAno * entrada.custoVaporPorTonelada;

  return {
    purgadoresComFalha,
    taxaFalha,
    perdaKgHporPonto,
    toneladasAno,
    central,
    minimoAnual: central * (1 - INCERTEZA.maxima),
    maximoAnual: central * (1 + INCERTEZA.maxima),
  };
}

/**
 * Taxa de incremento do contador do herói, em R$ por segundo.
 * Vem da mesma fórmula acima — não é um número mágico.
 */
export function reaisPorSegundo(entrada: EntradaCalculo = PADRAO): number {
  return calcularPerda(entrada).central / (entrada.horasAno * 3600);
}

const FORMATADOR_BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

export function formatarBRL(valor: number): string {
  return FORMATADOR_BRL.format(valor);
}

/** "R$ 380 mil" / "R$ 1,2 milhão" — para faixas, onde o centavo é ruído. */
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
