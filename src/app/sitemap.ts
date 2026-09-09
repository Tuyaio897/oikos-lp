import type { MetadataRoute } from 'next';
import { urlCanonica } from '@/config/site';
import { listarArtigos, listarCases } from '@/lib/conteudo';
import { CALCULADORA_PUBLICADA } from '@/lib/calculo-perda';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = urlCanonica();
  const agora = new Date();

  const fixas: { rota: string; prioridade: number }[] = [
    { rota: '', prioridade: 1 },
    { rota: '/inspecao', prioridade: 0.9 },
    { rota: '/sistema', prioridade: 0.8 },
    { rota: '/laudo-exemplo', prioridade: 0.9 },
    { rota: '/referencias', prioridade: 0.7 },
    { rota: '/metodologia', prioridade: 0.8 },
    { rota: '/empresa', prioridade: 0.6 },
    { rota: '/cases', prioridade: 0.6 },
    { rota: '/conteudo', prioridade: 0.7 },
    { rota: '/contato', prioridade: 0.8 },
    { rota: '/politica-de-privacidade', prioridade: 0.2 },
    { rota: '/termos-de-uso', prioridade: 0.2 },
  ];

  // A calculadora só entra no sitemap quando estiver publicada (§9).
  if (CALCULADORA_PUBLICADA) fixas.push({ rota: '/calculadora', prioridade: 0.9 });

  return [
    ...fixas.map(({ rota, prioridade }) => ({
      url: `${base}${rota}`,
      lastModified: agora,
      changeFrequency: 'monthly' as const,
      priority: prioridade,
    })),
    ...listarArtigos().map((artigo) => ({
      url: `${base}/conteudo/${artigo.slug}`,
      lastModified: artigo.data ? new Date(`${artigo.data}T12:00:00`) : agora,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
    ...listarCases().map((item) => ({
      url: `${base}/cases/${item.slug}`,
      lastModified: agora,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
