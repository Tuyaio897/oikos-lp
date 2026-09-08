/**
 * Eventos de analytics (§9 e §10.2).
 *
 * Empurra para o dataLayer do GTM apenas se o consentimento tiver sido dado —
 * o GTM so e carregado depois do aceite no banner de cookies (§12).
 */

type Evento =
  | { nome: 'calculadora_interacao'; campo: string }
  | { nome: 'calculadora_resultado'; faixaPurgadores: string }
  | { nome: 'calculadora_cta' }
  | { nome: 'lead_etapa1' }
  | { nome: 'lead_completo'; faixaPurgadores?: string }
  | { nome: 'clique_whatsapp'; origem: string }
  | { nome: 'clique_telefone'; origem: string }
  | { nome: 'download_laudo' };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function rastrear(evento: Evento): void {
  if (typeof window === 'undefined') return;
  if (!window.dataLayer) return;
  const { nome, ...resto } = evento;
  window.dataLayer.push({ event: nome, ...resto });
}
