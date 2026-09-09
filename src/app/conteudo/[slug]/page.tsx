import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Secao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { buscarArtigo, listarArtigos } from '@/lib/conteudo';
import { SITE, urlCanonica } from '@/config/site';
import { CALCULADORA_PUBLICADA } from '@/lib/calculo-perda';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listarArtigos().map((artigo) => ({ slug: artigo.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  if (!artigo) return {};
  return {
    title: artigo.titulo,
    description: artigo.descricao,
    alternates: { canonical: `/conteudo/${artigo.slug}` },
    openGraph: { type: 'article', title: artigo.titulo, description: artigo.descricao },
  };
}

export default async function Artigo({ params }: Props) {
  const { slug } = await params;
  const artigo = buscarArtigo(slug);
  if (!artigo) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artigo.titulo,
    description: artigo.descricao,
    datePublished: artigo.data,
    author: { '@type': 'Organization', name: SITE.razaoSocial },
    publisher: { '@type': 'Organization', name: SITE.razaoSocial },
    mainEntityOfPage: `${urlCanonica()}/conteudo/${artigo.slug}`,
  };

  const migalhas = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Conteúdo', item: `${urlCanonica()}/conteudo` },
      {
        '@type': 'ListItem',
        position: 2,
        name: artigo.titulo,
        item: `${urlCanonica()}/conteudo/${artigo.slug}`,
      },
    ],
  };

  return (
    <>
      <Secao>
        <nav aria-label="Trilha de navegação" className="t-small t-mudo" style={{ marginBottom: 24 }}>
          <Link href="/conteudo" className="link-azul">
            Conteúdo
          </Link>
        </nav>

        <article style={{ maxWidth: 720 }}>
          <header className="pilha-4" style={{ marginBottom: 40 }}>
            <h1 className="t-h2">{artigo.titulo}</h1>
            <p className="t-body-lg t-mudo">{artigo.descricao}</p>
            {artigo.data ? (
              <time className="t-small t-mudo num" dateTime={artigo.data}>
                {new Date(`${artigo.data}T12:00:00`).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            ) : null}
          </header>

          <div className="md" dangerouslySetInnerHTML={{ __html: artigo.html }} />
        </article>
      </Secao>

      {/* Cada artigo termina em CTA para a calculadora (§11.3); enquanto ela não
          está publicada, o destino é o laudo de exemplo, que é o próximo passo
          de menor atrito disponível. */}
      <Secao fundo="alt">
        <div style={{ maxWidth: '62ch' }} className="pilha-4">
          {CALCULADORA_PUBLICADA ? (
            <>
              <h2 className="t-h2">Faça a conta com os números da sua planta</h2>
              <p className="t-body t-mudo">
                Quantidade de pontos, pressão, custo do vapor e horas de operação. O
                resultado aparece na hora, sem formulário.
              </p>
              <div className="linha-botoes">
                <Botao href="/calculadora">Abrir a calculadora</Botao>
              </div>
            </>
          ) : (
            <>
              <h2 className="t-h2">Veja como isso aparece num laudo</h2>
              <p className="t-body t-mudo">
                Um relatório de inspeção completo e anonimizado, aberto, sem formulário
                para visualizar.
              </p>
              <div className="linha-botoes">
                <Botao href="/laudo-exemplo">Ver o laudo de exemplo</Botao>
              </div>
            </>
          )}
        </div>
      </Secao>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(migalhas) }} />
    </>
  );
}
