import Link from 'next/link';
import type { ReactNode } from 'react';

type Variante = 'primario' | 'secundario' | 'escuro';

const CLASSE: Record<Variante, string> = {
  primario: 'btn btn-primario',
  secundario: 'btn btn-secundario',
  escuro: 'btn btn-escuro',
};

type Props = {
  href: string;
  variante?: Variante;
  children: ReactNode;
  className?: string;
};

/** Botão-link. Para ações de formulário, use <button className="btn btn-primario">. */
export function Botao({ href, variante = 'primario', children, className = '' }: Props) {
  const classe = `${CLASSE[variante]} ${className}`.trim();
  const externo = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

  if (externo) {
    return (
      <a
        href={href}
        className={classe}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classe}>
      {children}
    </Link>
  );
}
