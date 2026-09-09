import type { ReactNode } from 'react';

type Fundo = 'claro' | 'alt' | 'verde' | 'escura';

const FUNDO: Record<Fundo, string> = {
  claro: 'secao',
  alt: 'secao secao-alt',
  verde: 'secao secao-verde',
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
 * `marcador` é um rótulo pequeno e colorido acima do título — não é o eyebrow
 * em CAIXA ALTA que foi removido do site antigo. Serve de marcador visual de
 * navegação e carrega o filete azul→verde da marca.
 */
export function TituloSecao({
  marcador,
  titulo,
  lead,
  centralizado = false,
  nivel = 2,
}: {
  marcador?: string;
  titulo: ReactNode;
  lead?: ReactNode;
  centralizado?: boolean;
  nivel?: 1 | 2;
}) {
  const Tag = nivel === 1 ? 'h1' : 'h2';
  return (
    <div
      className="pilha-4"
      style={
        centralizado
          ? { textAlign: 'center', alignItems: 'center', maxWidth: 760, marginInline: 'auto' }
          : undefined
      }
    >
      {marcador ? <span className="marcador">{marcador}</span> : null}
      <Tag className={nivel === 1 ? 't-display' : 't-h2'}>{titulo}</Tag>
      {lead ? <p className="t-body-lg t-mudo prosa">{lead}</p> : null}
    </div>
  );
}
