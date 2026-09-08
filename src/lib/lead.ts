import { z } from 'zod';

/**
 * Contrato do lead (§10.5).
 *
 * Vive fora do arquivo da Server Action porque um módulo 'use server' só pode
 * exportar funções async — o schema é um objeto.
 */
export const LeadSchema = z.object({
  nome: z.string().min(3, 'Informe seu nome completo.'),
  whatsapp: z
    .string()
    .regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, 'Informe um WhatsApp válido, com DDD.'),
  email: z.string().email('Informe um e-mail corporativo válido.'),
  empresa: z.string().min(2).optional(),
  cidadeUf: z.string().optional(),
  faixaPurgadores: z
    .enum(['ate-100', '100-250', '250-500', 'mais-500', 'nao-sei'])
    .optional(),
  segmento: z.string().optional(),
  consentimento: z.literal(true, {
    message: 'É necessário aceitar a política de privacidade.',
  }),
  /** Honeypot: precisa vir vazio (§10.2 — nunca captcha aritmético). */
  website: z.string().max(0),
  etapa: z.enum(['parcial', 'completo']),
});

export type Lead = z.infer<typeof LeadSchema>;

export type EstadoEnvio =
  | { status: 'inicial' }
  | { status: 'ok'; etapa: 'parcial' | 'completo' }
  | { status: 'erro'; mensagem: string; campos?: Record<string, string> };

export const FAIXAS_PURGADORES: Record<string, string> = {
  'ate-100': 'até 100 purgadores',
  '100-250': '100 a 250 purgadores',
  '250-500': '250 a 500 purgadores',
  'mais-500': 'mais de 500 purgadores',
  'nao-sei': 'não sei',
};
