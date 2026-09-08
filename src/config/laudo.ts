/**
 * Estado do laudo de exemplo (§7.7 e §8).
 *
 * Vire `pdfDisponivel` para true depois de colocar o arquivo anonimizado em
 * public/documentos/laudo-exemplo.pdf. Enquanto for false, a página oferece o
 * envio por e-mail em vez de um link de download quebrado.
 */
export const LAUDO = {
  pdfDisponivel: false,
  caminhoPdf: '/documentos/laudo-exemplo.pdf',
} as const;
