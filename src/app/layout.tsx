import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BannerCookies } from '@/components/layout/BannerCookies';
import { SITE, urlCanonica, preenchido } from '@/config/site';
import './globals.css';

/**
 * Fontes self-hosted pelo next/font: zero CLS e nenhuma requisição para o
 * Google em runtime — o que também ajuda em LGPD (§10.2). O @import de fonte
 * que existia no CSS antigo bloqueava o render e foi removido.
 */
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(urlCanonica()),
  title: {
    default: 'Oikos — Inspeção de purgadores de vapor e gestão de perdas',
    template: '%s | Oikos',
  },
  description:
    'Inspeção técnica purgador a purgador, laudo com a perda convertida em reais e gestão contínua do parque. Atendimento em SP, PR e SC.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Oikos',
    url: urlCanonica(),
  },
  robots: { index: true, follow: true },
};

function OrganizationJsonLd() {
  const dados: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.razaoSocial,
    alternateName: SITE.nomeCompleto,
    url: urlCanonica(),
    logo: `${urlCanonica()}/imagens/logo-oikos.svg`,
    taxID: SITE.cnpj,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.endereco.logradouro,
      addressLocality: SITE.endereco.cidade,
      addressRegion: SITE.endereco.uf,
      postalCode: SITE.endereco.cep,
      addressCountry: 'BR',
    },
    areaServed: SITE.regiaoAtendimento.map((uf) => ({
      '@type': 'State',
      name: uf,
    })),
    description:
      'Engenharia de eficiência térmica: inspeção de purgadores de vapor, laudo de perdas em reais e gestão contínua do parque.',
  };

  if (preenchido(SITE.telefone)) {
    dados.contactPoint = {
      '@type': 'ContactPoint',
      telephone: SITE.telefoneE164,
      contactType: 'sales',
      areaServed: 'BR',
      availableLanguage: 'pt-BR',
    };
  }
  if (preenchido(SITE.email)) dados.email = SITE.email;
  if (preenchido(SITE.linkedin)) dados.sameAs = [SITE.linkedin];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <a href="#conteudo" className="pular-para-conteudo">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <BannerCookies />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
