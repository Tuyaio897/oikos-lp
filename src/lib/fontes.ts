/**
 * Registro central de fontes (§4 e §6.5).
 *
 * Todo numero publicado no site precisa referenciar uma destas entradas.
 * Se um dado nao tem fonte aqui e nao vem da engine de calculo, ele nao vai
 * para o site.
 */

export type Fonte = {
  id: string;
  rotulo: string;
  href: string;
};

export const FONTES = {
  doeFemp: {
    id: 'doe-femp',
    rotulo: 'U.S. DOE / FEMP, Steam Trap Performance Assessment',
    href: 'https://www.energy.gov/eere/amo/articles/steam-trap-performance-assessment',
  },
  doeVapor: {
    id: 'doe-vapor',
    rotulo: 'U.S. DOE, Improving Steam System Performance',
    href: 'https://www.energy.gov/eere/amo/articles/improving-steam-system-performance-sourcebook-industry',
  },
  emerson: {
    id: 'emerson',
    rotulo: 'Emerson, Steam Trap Monitoring',
    href: 'https://www.emerson.com/en-us/automation/measurement-instrumentation/steam-trap-monitoring',
  },
} as const satisfies Record<string, Fonte>;

export type ChaveFonte = keyof typeof FONTES;
