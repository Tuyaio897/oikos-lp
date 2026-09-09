/**
 * Referências técnicas e científicas.
 *
 * Regra: só entra aqui o que existe e pode ser aberto. Nenhuma citação foi
 * construída, cada link foi verificado. Se uma referência sair do ar, tirar
 * daqui em vez de deixar o link quebrado.
 */

export type Referencia = {
  titulo: string;
  autor: string;
  ano: string;
  tipo: 'Artigo revisado por pares' | 'Publicação governamental' | 'Norma e prática recomendada' | 'Literatura técnica';
  resumo: string;
  href: string;
};

export const REFERENCIAS: Referencia[] = [
  {
    titulo:
      'Universal acoustic leak detection in high-pressure industrial steam traps using MEMS arrays and statistical baseline modeling',
    autor: 'Measurement (Elsevier)',
    ano: '2026',
    tipo: 'Artigo revisado por pares',
    resumo:
      'Detecção acústica automatizada de vazamento em purgadores de alta pressão com arranjo de 24 microfones MEMS. Reporta 95,9% de acerto de classificação em todo o espectro de pressão, validado contra imagem térmica. Parte do mesmo princípio físico do ultrassom usado em campo: o escoamento se manifesta acima da faixa audível.',
    href: 'https://www.sciencedirect.com/science/article/abs/pii/S0263224126022049',
  },
  {
    titulo: 'Steam Trap Performance Assessment, Federal Technology Alert',
    autor: 'U.S. Department of Energy / FEMP',
    ano: '1999',
    tipo: 'Publicação governamental',
    resumo:
      'O documento de referência do setor sobre avaliação de desempenho de purgadores. Descreve os métodos de teste, as taxas de falha típicas por regime de manutenção e a metodologia de cálculo de perda que sustenta a maior parte da literatura posterior.',
    href: 'https://www1.eere.energy.gov/femp/pdfs/fta_steamtrap.pdf',
  },
  {
    titulo: 'Inspect and Repair Steam Traps, Energy Tips: Steam, Tip Sheet #1',
    autor: 'U.S. Department of Energy',
    ano: '2012',
    tipo: 'Publicação governamental',
    resumo:
      'A folha técnica que estabelece as faixas de falha mais citadas do setor: 15% a 30% do parque em falha sem programa regular de inspeção, e 5% a 10% ao ano mesmo com manutenção estruturada. Traz o exemplo de cálculo de perda por orifício.',
    href: 'https://www.energy.gov/sites/prod/files/2014/05/f16/steam1_traps.pdf',
  },
  {
    titulo: 'Inspect and Repair Steam Traps (registro completo)',
    autor: 'National Renewable Energy Laboratory / OSTI',
    ano: '2012',
    tipo: 'Publicação governamental',
    resumo:
      'Registro bibliográfico oficial da Tip Sheet #1, com metadados de publicação. Útil quando o documento precisa ser citado formalmente em um relatório de auditoria energética.',
    href: 'https://www.osti.gov/biblio/1543095-inspect-repair-steam-traps-energy-tips-steam-steam-tip-sheet-fact-sheet',
  },
  {
    titulo: 'Evaluate Steam Traps for Repair or Replacement',
    autor: 'American Society for Health Care Engineering (ASHE)',
    ano: '2022',
    tipo: 'Norma e prática recomendada',
    resumo:
      'Prática recomendada para decidir entre reparo e substituição, com critérios de priorização. Escrita para gestão de instalações, é um bom material para justificar internamente o critério de fila de manutenção por valor.',
    href: 'https://www.ashe.org/system/files/media/file/2022/04/29-Evaluate-steam-traps.pdf',
  },
  {
    titulo: 'Ultrasonic Steam Trap and Valve Testing',
    autor: 'UE Systems',
    ano: '2026',
    tipo: 'Literatura técnica',
    resumo:
      'Fundamento do método de inspeção ultrassônica de purgadores: por que a leitura acima de 20 kHz separa operação normal de vazamento parcial, e por que temperatura sozinha não faz essa distinção.',
    href: 'https://www.uesystems.com/steam-trap-valve-inspection-application/',
  },
];

export const TIPOS_REFERENCIA = [
  'Artigo revisado por pares',
  'Publicação governamental',
  'Norma e prática recomendada',
  'Literatura técnica',
] as const;
