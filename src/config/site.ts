/**
 * Dados institucionais da Oikos.
 *
 * Fonte: Comprovante de Inscricao e de Situacao Cadastral (CNPJ), emitido em
 * 02/09/2026. Nada aqui e inventado — regra §4 da especificacao.
 *
 * Campos ainda marcados com PENDENTE nao sao renderizados: os componentes
 * chamam `preenchido()` antes de exibir, para que o site nunca mostre um dado
 * falso nem um campo quebrado. Ver docs/DECISOES.md.
 */

export const PENDENTE = 'PENDENTE' as const;

/** true quando o campo tem valor real (nao e placeholder nem vazio). */
export function preenchido(valor: string | undefined | null): valor is string {
  return typeof valor === 'string' && valor.length > 0 && !valor.startsWith(PENDENTE);
}

export const SITE = {
  nome: 'Oikos',
  nomeCompleto: 'Oikos Desenvolvimento',
  razaoSocial: 'Oikos Desenvolvimento Ltda',
  cnpj: '68.928.719/0001-20',

  /**
   * Dominio proprio. O dominio ja e da Oikos (registrado na Hostinger) mas
   * ainda esta parqueado. Enquanto `dominioProprioAtivo` for false, o canonical
   * e os metadados apontam para a URL da Vercel, que e o que esta no ar.
   * Para virar a chave: apontar o DNS para a Vercel e trocar para true.
   */
  url: 'https://oikos.eco.br',
  urlVercel: 'https://oikos-lp.vercel.app',
  dominioProprioAtivo: false,

  /** Subdominio do sistema. Enquanto PENDENTE, "Acessar o sistema" vai para /contato. */
  urlSistema: `${PENDENTE}_URL_SISTEMA`,

  /** Telefone conforme registrado no CNPJ, confirmado pelo time. */
  telefone: '(41) 9952-8006',
  telefoneE164: '+554199528006',

  /** So digitos com DDI, para links wa.me. */
  whatsapp: '554199528006',

  email: 'comercial@oikos.eco.br',

  endereco: {
    logradouro: 'R. Monsenhor Manoel Vicente, 550',
    /** Complemento residencial (apto) omitido do site por privacidade. Ver DECISOES.md. */
    bairro: 'Água Verde',
    cidade: 'Curitiba',
    uf: 'PR',
    cep: '80620-230',
  },

  linkedin: `${PENDENTE}_LINKEDIN`,

  regiaoAtendimento: ['SP', 'PR', 'SC'],
  regiaoAtendimentoTexto: 'São Paulo, Paraná e Santa Catarina',
  horarioAtendimento: 'Segunda a sexta, das 8h às 18h',
} as const;

/** Endereco em uma linha, para rodape e JSON-LD. */
export const ENDERECO_LINHA = `${SITE.endereco.logradouro} — ${SITE.endereco.bairro}, ${SITE.endereco.cidade}/${SITE.endereco.uf}, CEP ${SITE.endereco.cep}`;

/** URL que realmente responde hoje. Usada em canonical, sitemap e JSON-LD. */
export function urlCanonica(): string {
  return SITE.dominioProprioAtivo ? SITE.url : SITE.urlVercel;
}

export function linkWhatsApp(mensagem: string): string | null {
  if (!preenchido(SITE.whatsapp)) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export function linkTelefone(): string | null {
  if (!preenchido(SITE.telefone)) return null;
  return `tel:${SITE.telefoneE164}`;
}

export function linkEmail(assunto?: string): string | null {
  if (!preenchido(SITE.email)) return null;
  return assunto ? `mailto:${SITE.email}?subject=${encodeURIComponent(assunto)}` : `mailto:${SITE.email}`;
}

/** Destino do botao "Acessar o sistema" (§7.2). */
export function linkSistema(): string {
  return preenchido(SITE.urlSistema) ? SITE.urlSistema : '/contato?assunto=acesso-sistema';
}
