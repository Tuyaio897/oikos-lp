/**
 * Registro de fotos do site.
 *
 * Cada slot tem um arquivo esperado, o texto alternativo que vai ao ar e o
 * briefing do que fotografar. Basta colocar o arquivo no caminho indicado
 * dentro de `public/` que a foto entra sozinha no lugar do placeholder.
 *
 * Regra: nada de banco de imagem genérico de "indústria". A tese do site é
 * credibilidade, e foto de banco é reconhecível. Foto de celular bem
 * enquadrada, feita numa inspeção real, vale mais.
 */

export type SlotFoto = {
  /** Caminho dentro de public/. É só salvar o arquivo aqui. */
  arquivo: string;
  /** Texto alternativo publicado. Descreve o que se vê, não o conceito. */
  alt: string;
  /** O que fotografar. Escrito para quem vai a campo com o celular. */
  briefing: string;
  /** Proporção usada no layout, para enquadrar já na hora da foto. */
  proporcao: '3/2' | '4/3' | '1/1' | '16/9';
  /** Rótulo curto mostrado no placeholder enquanto a foto não existe. */
  rotulo: string;
};

export const FOTOS = {
  heroiCavalete: {
    arquivo: '/imagens/campo/heroi-cavalete.jpg',
    alt: 'Cavalete de purgadores em linha de vapor de planta industrial',
    rotulo: 'Herói: cavalete de purgadores',
    proporcao: '3/2',
    briefing:
      'Um cavalete de purgadores real, na planta, visto de frente e de corpo inteiro. Luz do dia, sem flash. Se houver pluma de vapor visível em algum ponto, melhor ainda. Enquadrar na horizontal, deixando espaço nas laterais: a imagem aparece grande e é a primeira coisa que o visitante vê.',
  },

  problemaVazamento: {
    arquivo: '/imagens/campo/purgador-vazando.jpg',
    alt: 'Purgador de vapor com vazamento visível na descarga',
    rotulo: 'Problema: purgador vazando',
    proporcao: '4/3',
    briefing:
      'O flagrante do problema: um purgador descarregando vapor vivo, com a pluma visível. É a foto mais valiosa do site inteiro. Se der, fotografar contra um fundo escuro, que faz a pluma aparecer. Vale também um purgador aberto na bancada com a sede visivelmente desgastada.',
  },

  medirTecnico: {
    arquivo: '/imagens/campo/tecnico-ultrassom.jpg',
    alt: 'Técnico da Oikos medindo um purgador com detector ultrassônico',
    rotulo: 'Etapa 01: medição com ultrassom',
    proporcao: '4/3',
    briefing:
      'Técnico encostando a ponta do UP100 no corpo do purgador, de fone no ouvido. Enquadrar das mãos até o rosto. Precisa ficar claro que é medição de contato num ponto específico, não alguém segurando um aparelho para a câmera.',
  },

  traduzirLaudo: {
    arquivo: '/imagens/campo/laudo-mesa.jpg',
    alt: 'Laudo de inspeção de purgadores impresso sobre a mesa',
    rotulo: 'Etapa 02: o laudo',
    proporcao: '4/3',
    briefing:
      'O laudo impresso sobre uma mesa, aberto numa página com tabela e valores. Pode ter caneta e café ao lado, sem excesso de cenário. Cuidado: nenhum nome de cliente legível na foto. Use um laudo de demonstração ou cubra a identificação.',
  },

  manterRonda: {
    arquivo: '/imagens/campo/ronda-tablet.jpg',
    alt: 'Equipe de manutenção registrando a ronda de purgadores pelo aplicativo',
    rotulo: 'Etapa 03: ronda da equipe',
    proporcao: '4/3',
    briefing:
      'Alguém da equipe da planta, de EPI, com o celular ou tablet na mão registrando um ponto, com a tubulação ao fundo. Esta foto sustenta o argumento central do contrato: quem mede no dia a dia é a equipe do cliente.',
  },

  equipamentoUP100: {
    arquivo: '/imagens/equipamento/up100.jpg',
    alt: 'Detector ultrassônico UP100 da UE Systems',
    rotulo: 'Equipamento: o UP100',
    proporcao: '1/1',
    briefing:
      'O UP100 sozinho, com o kit e o fone, sobre fundo neutro e claro. Foto de produto mesmo: aparelho limpo, luz difusa, sem sombra dura. É o que mostra que o equipamento cedido no contrato é um instrumento sério.',
  },

  inspecaoCasaCaldeiras: {
    arquivo: '/imagens/campo/casa-caldeiras.jpg',
    alt: 'Casa de caldeiras de planta industrial com linhas de vapor',
    rotulo: 'Inspeção: casa de caldeiras',
    proporcao: '16/9',
    briefing:
      'Vista ampla de casa de caldeiras ou de uma galeria de tubulação de vapor, mostrando a escala do parque. Serve para o visitante reconhecer a própria planta na foto.',
  },

  sistemaEmUso: {
    arquivo: '/imagens/sistema/sistema-em-uso.jpg',
    alt: 'Sistema Oikos aberto em um computador dentro da fábrica',
    rotulo: 'Sistema em uso',
    proporcao: '3/2',
    briefing:
      'Notebook ou desktop na sala da manutenção com o sistema Oikos aberto na tela. Fotografar de leve ângulo, com a fábrica ao fundo desfocada. Atenção: a tela precisa mostrar dados de demonstração, nunca de cliente real, e sem os nomes de teste antigos.',
  },

  equipeOikos: {
    arquivo: '/imagens/equipe/equipe.jpg',
    alt: 'Equipe da Oikos',
    rotulo: 'Empresa: a equipe',
    proporcao: '3/2',
    briefing:
      'Os sócios, de preferência em campo e de EPI, não em foto de estúdio com fundo branco. Para a página da empresa, vale também um retrato individual de cada um, em vertical, mesma luz e mesmo enquadramento.',
  },
} as const satisfies Record<string, SlotFoto>;

export type ChaveFoto = keyof typeof FOTOS;
