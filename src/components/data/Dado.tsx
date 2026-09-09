import type { ReactNode } from 'react';
import { FONTES, type ChaveFonte } from '@/lib/fontes';

/**
 * Número + fonte (§6.5).
 *
 * Existe para forçar a regra do §4: todo número publicado tem origem
 * declarada. Se um dado não cabe neste componente, ele não vai para o site.
 */
export function Dado({
  valor,
  fonte,
  children,
}: {
  valor: string;
  fonte: ChaveFonte;
  children: ReactNode;
}) {
  const f = FONTES[fonte];
  return (
    <div className="pilha-2">
      <span className="t-data" style={{ color: 'var(--oikos-laranja-700)' }}>
        {valor}
      </span>
      <p className="t-body t-mudo" style={{ maxWidth: '32ch' }}>
        {children}{' '}
        <a
          href={f.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-azul t-small"
        >
          {f.rotulo.split(', ')[0]}
        </a>
      </p>
    </div>
  );
}

/** KPI sem fonte externa, para números que vêm do próprio cálculo. */
export function KPI({
  valor,
  rotulo,
  nota,
}: {
  valor: string;
  rotulo: string;
  nota?: string;
}) {
  return (
    <div className="pilha-2">
      <span className="t-data">{valor}</span>
      <span className="t-small" style={{ fontWeight: 600 }}>
        {rotulo}
      </span>
      {nota ? <span className="t-small t-mudo">{nota}</span> : null}
    </div>
  );
}

/** Lista de fontes no rodapé de uma seção. */
export function ListaFontes({ chaves }: { chaves: ChaveFonte[] }) {
  return (
    <p className="t-small t-mudo">
      Fontes:{' '}
      {chaves.map((c, i) => (
        <span key={c}>
          {i > 0 ? ' · ' : ''}
          <a href={FONTES[c].href} target="_blank" rel="noopener noreferrer" className="link-azul">
            {FONTES[c].rotulo}
          </a>
        </span>
      ))}
    </p>
  );
}
