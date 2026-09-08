import { CALCULADORA_PUBLICADA } from '@/lib/calculo-perda';

export type ItemNav = { href: string; rotulo: string };

export const NAV_PRINCIPAL: ItemNav[] = [
  { href: '/inspecao', rotulo: 'Inspeção' },
  { href: '/sistema', rotulo: 'Sistema Oikos' },
  { href: '/cases', rotulo: 'Cases' },
  { href: '/conteudo', rotulo: 'Conteúdo' },
  { href: '/empresa', rotulo: 'Empresa' },
];

export const RODAPE: { titulo: string; itens: ItemNav[] }[] = [
  {
    titulo: 'Serviços',
    itens: [
      { href: '/inspecao', rotulo: 'Inspeção de purgadores' },
      { href: '/sistema', rotulo: 'Sistema Oikos' },
      { href: '/laudo-exemplo', rotulo: 'Laudo de exemplo' },
      // A calculadora só entra na navegação quando estiver publicada (§9).
      ...(CALCULADORA_PUBLICADA
        ? [{ href: '/calculadora', rotulo: 'Calculadora de perdas' }]
        : []),
    ],
  },
  {
    titulo: 'Empresa',
    itens: [
      { href: '/empresa', rotulo: 'Quem somos' },
      { href: '/cases', rotulo: 'Cases' },
      { href: '/contato', rotulo: 'Contato' },
    ],
  },
  {
    titulo: 'Conteúdo',
    itens: [
      { href: '/conteudo', rotulo: 'Conhecimento técnico' },
      { href: '/conteudo/quanto-custa-um-purgador-com-falha', rotulo: 'Quanto custa um purgador com falha' },
      { href: '/conteudo/auditoria-manual-deixa-passar-falhas', rotulo: 'Por que a auditoria manual falha' },
    ],
  },
];
