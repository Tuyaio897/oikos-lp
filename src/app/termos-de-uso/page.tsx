import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Secao } from '@/components/layout/Secao';
import { lerDocumentoLegal } from '@/lib/conteudo';

const SLUG = 'termos-de-uso';

export async function generateMetadata(): Promise<Metadata> {
  const doc = lerDocumentoLegal(SLUG);
  return {
    title: doc?.titulo ?? 'Documento',
    description: 'Documento legal da Oikos Desenvolvimento Ltda.',
    alternates: { canonical: `/${SLUG}` },
  };
}

export default function Pagina() {
  const doc = lerDocumentoLegal(SLUG);
  if (!doc) notFound();

  return (
    <Secao>
      <article style={{ maxWidth: 720 }}>
        <header className="pilha-2" style={{ marginBottom: 40 }}>
          <h1 className="t-h2">{doc.titulo}</h1>
          {doc.atualizadoEm ? (
            <p className="t-small t-mudo num">
              Última atualização:{' '}
              <time dateTime={doc.atualizadoEm}>
                {new Date(`${doc.atualizadoEm}T12:00:00`).toLocaleDateString('pt-BR')}
              </time>
            </p>
          ) : null}
        </header>
        <div className="md" dangerouslySetInnerHTML={{ __html: doc.html }} />
      </article>
    </Secao>
  );
}
