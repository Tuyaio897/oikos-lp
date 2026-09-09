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

  chamada: 'Deixamos o equipamento e treinamos a sua equipe.',

  explicacao:
    'A Oikos faz a inspeção inicial e entrega o laudo com a perda de cada ponto em reais. A partir daí, o contrato mensal mantém o parque sob controle sem que você precise contratar mais ninguém: o UP100 fica na sua planta, treinamos a sua própria equipe de manutenção para medir, e nós continuamos cuidando do método, da análise e do histórico.',

  /** Combate a leitura errada de que o cliente teria de contratar inspetor. */
  semContratarNinguem:
    'Você não precisa contratar um inspetor externo nem manter alguém dedicado a isso. Quem faz a ronda é a equipe de manutenção que já está na planta, com o equipamento que a Oikos deixa e o treinamento que a Oikos dá.',

  /** Por que o modelo é diferente de contratar auditoria avulsa. */
  pilares: [
    {
      titulo: 'Equipamento cedido, sem custo à parte',
      texto:
        'O UP100 fica na sua planta durante todo o contrato. Um por cliente, não compartilhado nem emprestado por visita. Você não compra o aparelho nem aluga de terceiros.',
    },
    {
      titulo: 'Treinamento da sua equipe incluído',
      texto:
        'Nós treinamos a sua equipe de manutenção para medir com o UP100 e classificar o que encontrar. Ninguém precisa ser contratado para isso: quem já cuida da planta passa a medir.',
    },
    {
      titulo: 'Método e análise com a Oikos',
      texto:
        'Medir é a parte fácil. O que sustenta o laudo é a classificação padronizada e o cálculo da perda. Isso continua sendo nosso, todo mês.',
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

/** Equipamento de medição usado em campo e cedido no contrato mensal. */
export const EQUIPAMENTO = {
  modelo: 'UP100',
  fabricante: 'UE Systems',
  categoria: 'Detector ultrassônico de inspeção de purgadores',
  descricao:
    'O UP100, da UE Systems, é um dos detectores ultrassônicos de referência para inspeção de purgadores. Ele desloca a leitura para a faixa acima de 20 kHz, onde o escoamento de vapor por um orifício realmente se manifesta, e onde o ouvido humano não alcança.',
  /** No contrato, o aparelho fica na planta. Cada cliente tem o seu. */
  cessao:
    'Durante o contrato, o UP100 fica na sua planta. Não é equipamento compartilhado entre clientes nem emprestado por visita: cada cliente tem o seu, disponível no dia em que a equipe precisar medir.',
  pontos: [
    'Detecta vazamento parcial, que o tato e o ouvido não separam de operação normal',
    'Funciona com a linha em operação, sem parar a produção',
    'Leitura objetiva, que dois técnicos diferentes conseguem repetir',
    'Cedido pela Oikos e com treinamento incluído no contrato',
  ],
} as const;
