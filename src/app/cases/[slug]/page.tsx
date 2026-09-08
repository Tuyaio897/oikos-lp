import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Secao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { buscarCase, listarCases } from '@/lib/conteudo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listarCases().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = buscarCase(slug);
  if (!item) return {};
  return {
    title: item.titulo,
    description: item.descricao,
    alternates: { canonical: `/cases/${item.slug}` },
  };
}

export default async function CaseIndividual({ params }: Props) {
  const { slug } = await params;
  const item = buscarCase(slug);
  if (!item) notFound();

  return (
    <>
      <Secao>
        <nav aria-label="Trilha de navegação" className="t-small t-mudo" style={{ marginBottom: 24 }}>
          <Link href="/cases" className="link-azul">
            Cases
          </Link>
        </nav>

        <article style={{ maxWidth: 720 }}>
          <header className="pilha-4" style={{ marginBottom: 40 }}>
            {item.segmento ? <span className="tag">{item.segmento}</span> : null}
            <h1 className="t-h2">{item.titulo}</h1>
            <p className="t-body-lg t-mudo">{item.descricao}</p>
          </header>
          <div className="md" dangerouslySetInnerHTML={{ __html: item.html }} />
        </article>
      </Secao>

      <Secao fundo="alt">
        <div style={{ maxWidth: '62ch' }} className="pilha-4">
          <h2 className="t-h2">Sua planta tem um parque parecido?</h2>
          <p className="t-body t-mudo">
            O ponto de partida é o mesmo: inventário completo e a perda de cada ponto em
            reais.
          </p>
          <div className="linha-botoes">
            <Botao href="/contato">Solicitar diagnóstico da minha planta</Botao>
          </div>
        </div>
      </Secao>
    </>
  );
}
