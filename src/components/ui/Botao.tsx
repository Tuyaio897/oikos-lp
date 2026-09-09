import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Variante = 'primario' | 'secundario' | 'verde';

const CLASSE: Record<Variante, string> = {
  primario: 'btn btn-primario',
  secundario: 'btn btn-secundario',
  verde: 'btn btn-verde',
};

type Props = {
  href: string;
  variante?: Variante;
  children: ReactNode;
  className?: string;
  /** Seta que desliza no hover. Use no CTA principal de cada seção. */
  seta?: boolean;
};

/** Botão-link. Para ações de formulário, use <button className="btn btn-primario">. */
export function Botao({ href, variante = 'primario', children, className = '', seta = false }: Props) {
  const classe = `${CLASSE[variante]} ${seta ? 'link-seta' : ''} ${className}`.trim();
  const conteudo = (
    <>
      {children}
      {seta ? <ArrowRight size={18} aria-hidden="true" /> : null}
    </>
  );

  const externo = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:');

  if (externo) {
    return (
      <a
        href={href}
        className={classe}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {conteudo}
      </a>
    );
  }

  return (
    <Link href={href} className={classe}>
      {conteudo}
    </Link>
  );
}
