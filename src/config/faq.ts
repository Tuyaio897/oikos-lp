import type { Pergunta } from '@/components/blocks/FAQ';
import { OFERTA } from './oferta';
import { SITE } from './site';

/** FAQ da home (§7.11), derivado da tabela de objeções do documento comercial. */
export const FAQ_HOME: Pergunta[] = [
  {
    pergunta: 'Minha equipe já verifica os purgadores. Por que preciso da Oikos?',
    resposta:
      'Verificação por tato e ruído identifica o purgador obviamente quebrado, não o que está passando vapor a 12 kg/h. Em uma auditoria manual documentada pela Emerson, considerada 95% a 97% confiável pela própria equipe, 16 de 24 purgadores falhos não foram detectados. A diferença não é diligência: é instrumento e método padronizado.',
  },
  {
    pergunta: 'Como funciona a contratação?',
    resposta: OFERTA.explicacao,
  },
  {
    pergunta: 'Preciso contratar alguém para fazer as rondas?',
    resposta:
      'Não. A Oikos cede o UP100, que fica na sua planta durante todo o contrato, e treina a sua própria equipe de manutenção para medir. Quem já cuida da planta passa a fazer a ronda; você não contrata inspetor externo nem cria uma função nova.',
  },
  {
    pergunta: 'Minha equipe consegue mesmo fazer a inspeção sozinha?',
    resposta:
      'Consegue, e é para isso que existe o treinamento. O UP100 foi feito para uso de campo por equipe de manutenção, e a leitura é objetiva, não depende de ouvido treinado. O que exige método é a classificação e o cálculo da perda, e essa parte continua sendo nossa, todo mês.',
  },
  {
    pergunta: 'Quanto tempo leva uma inspeção?',
    resposta:
      'Depende do tamanho e da dispersão do parque. Uma planta de 250 purgadores costuma ser coberta em poucos dias de campo. O escopo e o prazo são fechados antes da visita, junto com o orçamento.',
  },
  {
    pergunta: 'Vocês atendem qual região?',
    resposta: `Atendemos ${SITE.regiaoAtendimentoTexto} com equipe própria. Para plantas fora dessa região, avaliamos caso a caso, fale com a gente antes de descartar.`,
  },
  {
    pergunta: 'Preciso parar a produção durante a inspeção?',
    resposta:
      'Não. A avaliação é feita com o sistema em operação, é justamente com vapor passando que o ultrassom e a leitura de temperatura conseguem distinguir um purgador travado aberto de um operando normalmente.',
  },
  {
    pergunta: 'Vocês vendem ou trocam purgadores?',
    resposta:
      'Não. A Oikos é independente de fabricante e é remunerada pela gestão da eficiência, não pela troca de peça. Nosso interesse é que o purgador dure. O diagnóstico é isento e a recomendação é a tecnicamente correta.',
  },
  {
    pergunta: 'Como é calculada a perda em reais?',
    resposta:
      'A perda de massa de cada purgador é calculada em kg/h a partir do diâmetro, da pressão de operação e da condição encontrada. Essa massa é multiplicada pelas horas de operação e pelo custo do vapor da sua planta, o seu custo, não uma média de mercado. Todas as premissas ficam declaradas no laudo.',
  },
  {
    pergunta: 'E se eu quiser gerir tudo em planilha?',
    resposta:
      'Funciona até a primeira troca de pessoa. Planilha não guarda foto do ponto, não compara a inspeção deste ano com a do ano passado por tag e não prioriza a fila de manutenção por valor de perda. O histórico é o que faz a economia durar.',
  },
  {
    pergunta: 'Meus dados de planta ficam seguros?',
    resposta:
      'Os dados da sua planta são seus. Ficam restritos aos usuários que você autoriza, não são compartilhados com fabricantes nem com outros clientes, e podem ser exportados a qualquer momento.',
  },
];
