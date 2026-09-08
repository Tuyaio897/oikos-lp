import type { MetadataRoute } from 'next';
import { urlCanonica } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dev/'],
    },
    sitemap: `${urlCanonica()}/sitemap.xml`,
  };
}
