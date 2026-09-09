/**
 * Modelo comercial da Oikos.
 *
 * O site antigo prometia "diagnóstico gratuito", contradizendo a Estratégia de
 * Precificação ("gratuidade, nunca") e o pedido mínimo por visita.
 *
 * Modelo atual: contrato mensal de cuidado com o purgador. A Oikos faz a
 * inspeção inicial e o laudo; a partir daí a própria equipe da planta passa a
 * fazer a inspeção periódica com o equipamento, sob acompanhamento técnico e
 * com o histórico vivo no sistema.
 */

export const OFERTA = {
  nome: 'Contrato de cuidado com o purgador',

  chamada: 'Sua equipe inspecionando, o nosso método garantindo o resultado.',

  explicacao:
    'A Oikos faz a inspeção inicial e entrega o laudo com a perda de cada ponto em reais. A partir daí, o contrato mensal mantém o parque sob controle: sua própria equipe faz as rondas periódicas com o equipamento, e nós cuidamos do método, da análise e do histórico.',

  /** Por que o modelo é diferente de contratar auditoria avulsa. */
  pilares: [
    {
      titulo: 'Autonomia da sua equipe',
      texto:
        'A inspeção periódica deixa de depender de agendar visita. Sua equipe de manutenção mede quando precisa, na frequência que a planta pede.',
    },
    {
      titulo: 'Método e análise com a Oikos',
      texto:
        'Medir é a parte fácil. O que sustenta o laudo é a classificação padronizada e o cálculo da perda — isso continua sendo nosso, todo mês.',
    },
    {
      titulo: 'A perda não volta',
      texto:
        'De 5% a 10% dos purgadores voltam a falhar por ano. Com ronda periódica, a falha é encontrada em semanas em vez de anos.',
    },
  ],

  ctaPrimario: 'Solicitar diagnóstico da minha planta',
  ctaSecundario: 'Ver um laudo de exemplo',
} as const;

/**
 * Equipamento de medição usado em campo e no contrato mensal.
 *
 * CONFIRMAR: o modelo foi informado como "UP100". Se for o Ultraprobe 100 da
 * UE Systems, vale nomear o fabricante aqui — nome de fabricante não foi
 * assumido. Ver docs/DECISOES.md.
 */
export const EQUIPAMENTO = {
  modelo: 'UP100',
  categoria: 'Detector ultrassônico de inspeção de purgadores',
  descricao:
    'O UP100 é um dos detectores ultrassônicos de referência para inspeção de purgadores. Ele desloca a leitura para a faixa acima de 20 kHz, onde o escoamento de vapor por um orifício realmente se manifesta — e onde o ouvido humano não alcança.',
  pontos: [
    'Detecta vazamento parcial, que o tato e o ouvido não separam de operação normal',
    'Funciona com a linha em operação, sem parar a produção',
    'Leitura objetiva, que dois técnicos diferentes conseguem repetir',
    'Operável pela equipe da planta após treinamento',
  ],
} as const;
