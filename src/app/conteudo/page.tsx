import type { Metadata } from 'next';
import Link from 'next/link';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { listarArtigos } from '@/lib/conteudo';

export const metadata: Metadata = {
  title: 'Conteúdo técnico',
  description:
    'Artigos sobre inspeção de purgadores, cálculo de perda de vapor e gestão de sistemas de vapor industriais.',
  alternates: { canonical: '/conteudo' },
};

export default function Conteudo() {
  const artigos = listarArtigos();

  return (
    <Secao>
      <div style={{ maxWidth: '62ch' }}>
        <TituloSecao
          nivel={1}
          titulo="Conhecimento técnico"
          lead="O que a gente aprende em campo, escrito para quem toma decisão de manutenção."
        />
      </div>

      <ul style={{ listStyle: 'none', marginTop: 48, maxWidth: 820 }}>
        {artigos.map((artigo) => (
          <li key={artigo.slug} style={{ borderTop: '1px solid var(--border)', paddingBlock: 28 }}>
            <article className="pilha-2">
              <h2 className="t-h3">
                <Link href={`/conteudo/${artigo.slug}`}>{artigo.titulo}</Link>
              </h2>
              <p className="t-body t-mudo prosa">{artigo.descricao}</p>
              {artigo.data ? (
                <time className="t-small t-mudo num" dateTime={artigo.data}>
                  {new Date(`${artigo.data}T12:00:00`).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
    </Secao>
  );
}
