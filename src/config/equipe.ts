/**
 * Sócios e equipe (§8 — página /empresa "com pessoas reais").
 *
 * Vazio de propósito: não inventamos pessoas. Enquanto a lista estiver vazia, a
 * seção não é renderizada. Para publicar, adicione as entradas com foto em
 * public/imagens/equipe/ e preencha formação e responsabilidade.
 */
export type Pessoa = {
  nome: string;
  cargo: string;
  formacao: string;
  foto?: string;
  linkedin?: string;
};

export const EQUIPE: Pessoa[] = [];
