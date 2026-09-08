import type { ReactNode } from 'react';

type Fundo = 'claro' | 'alt' | 'escura';

const FUNDO: Record<Fundo, string> = {
  claro: 'secao',
  alt: 'secao secao-alt',
  escura: 'secao secao-escura',
};

export function Secao({
  children,
  fundo = 'claro',
  id,
  className = '',
}: {
  children: ReactNode;
  fundo?: Fundo;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`${FUNDO[fundo]} ${className}`.trim()}>
      <div className="container">{children}</div>
    </section>
  );
}

/**
 * Título de seção.
 *
 * Não existe prop de "eyebrow": os rótulos em caixa alta acima de cada título
 * foram removidos por decisão do §7.1 — eram redundantes com o próprio título
 * e são o padrão de template mais reconhecível que existe.
 */
export function TituloSecao({
  titulo,
  lead,
  centralizado = false,
  nivel = 2,
}: {
  titulo: ReactNode;
  lead?: ReactNode;
  centralizado?: boolean;
  nivel?: 1 | 2;
}) {
  const Tag = nivel === 1 ? 'h1' : 'h2';
  return (
    <div className={centralizado ? 'pilha-4' : 'pilha-4'} style={centralizado ? { textAlign: 'center' } : undefined}>
      <Tag className={nivel === 1 ? 't-display' : 't-h2'}>{titulo}</Tag>
      {lead ? (
        <p
          className="t-body-lg t-mudo prosa"
          style={centralizado ? { marginInline: 'auto' } : undefined}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
