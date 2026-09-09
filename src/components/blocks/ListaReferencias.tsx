import { ExternalLink } from 'lucide-react';
import { REFERENCIAS, type Referencia } from '@/config/referencias';

/**
 * Lista de referências técnicas e científicas.
 *
 * Cada item abre a fonte original. Nenhuma citação foi construída — se um link
 * sair do ar, tirar a entrada em vez de deixar o link quebrado.
 */
export function ListaReferencias({ itens = REFERENCIAS }: { itens?: Referencia[] }) {
  return (
    <ul style={{ listStyle: 'none' }} className="pilha-4">
      {itens.map((ref) => (
        <li key={ref.href}>
          <a
            href={ref.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card card-interativo card-filete"
            style={{ display: 'block' }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <span className={ref.tipo === 'Artigo revisado por pares' ? 'tag tag-verde' : 'tag'}>
                {ref.tipo}
              </span>
              <span className="t-small t-mudo num">
                {ref.autor} · {ref.ano}
              </span>
            </div>

            <h3 className="t-h3" style={{ marginBottom: 10 }}>
              {ref.titulo}
            </h3>

            <p className="t-body t-mudo" style={{ maxWidth: '72ch' }}>
              {ref.resumo}
            </p>

            <span className="link-seta t-small" style={{ marginTop: 14 }}>
              Abrir a fonte
              <ExternalLink size={15} aria-hidden="true" className="seta" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
