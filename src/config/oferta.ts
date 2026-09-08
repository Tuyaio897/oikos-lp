/**
 * Flag da oferta de entrada (§1.5).
 *
 * O site antigo prometia "diagnostico gratuito" em quatro lugares, o que
 * contradiz frontalmente a Estrategia de Precificacao (secao 5: "gratuidade,
 * nunca") e o pedido minimo de R$ 7.500 por visita.
 *
 * Modelo atual: 'garantia' (Opcao A recomendada pela spec). Para trocar,
 * mude apenas `modelo` — todo o copy do site consome este objeto.
 */

export type ModeloOferta = 'garantia' | 'piloto' | 'gratuito';

const MODELO: ModeloOferta = 'garantia';

const TEXTOS: Record<ModeloOferta, { nome: string; selo: string; explicacao: string }> = {
  garantia: {
    nome: 'Diagnóstico Oikos',
    selo: 'Se o laudo não identificar perdas maiores que o valor da inspeção, você não paga.',
    explicacao:
      'A inspeção é cobrada por purgador, com escopo fechado antes da visita. Se o laudo não identificar perdas superiores ao valor da inspeção, você não paga.',
  },
  piloto: {
    nome: 'Diagnóstico Piloto',
    selo: 'Uma linha da sua planta, preço fechado, laudo completo.',
    explicacao:
      'Inspecionamos uma linha ou setor da planta — até 30 purgadores — por preço fechado, e entregamos o laudo completo desse piloto antes de qualquer decisão sobre o parque inteiro.',
  },
  gratuito: {
    nome: 'Diagnóstico gratuito',
    selo: 'Campanha por tempo limitado.',
    explicacao:
      'Campanha datada e limitada geograficamente. Não é a proposta permanente da Oikos.',
  },
};

export const OFERTA = {
  modelo: MODELO,
  nome: TEXTOS[MODELO].nome,
  selo: TEXTOS[MODELO].selo,
  explicacao: TEXTOS[MODELO].explicacao,
  ctaPrimario: 'Solicitar diagnóstico da minha planta',
  ctaSecundario: 'Ver um laudo de exemplo',
} as const;
