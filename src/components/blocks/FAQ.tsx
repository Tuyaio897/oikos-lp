export type Pergunta = { pergunta: string; resposta: string };

/**
 * FAQ com <details> nativo (§7.11): zero JS, navegável por teclado de graça,
 * e o conteúdo indexa no Google mesmo fechado.
 */
export function FAQ({ perguntas }: { perguntas: Pergunta[] }) {
  return (
    <div style={{ borderTop: '1px solid var(--border)' }}>
      {perguntas.map((p) => (
        <details key={p.pergunta} className="faq-item">
          <summary>{p.pergunta}</summary>
          <div className="faq-resposta t-body">{p.resposta}</div>
        </details>
      ))}
    </div>
  );
}

/** JSON-LD FAQPage (§11.1). */
export function FAQJsonLd({ perguntas }: { perguntas: Pergunta[] }) {
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: perguntas.map((p) => ({
      '@type': 'Question',
      name: p.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: p.resposta },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}
