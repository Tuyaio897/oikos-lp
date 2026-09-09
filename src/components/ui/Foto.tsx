import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { FOTOS, type ChaveFoto } from '@/config/fotos';

/**
 * Slot de foto.
 *
 * Se o arquivo já existe em `public/`, renderiza a foto. Se ainda não existe,
 * renderiza um placeholder com o briefing, para que ninguém precise adivinhar
 * o que entra ali. Basta salvar o arquivo no caminho do registro que a foto
 * aparece sozinha, sem tocar em código.
 */

const PROPORCOES: Record<string, { css: string; valor: number }> = {
  '3/2': { css: '3 / 2', valor: 3 / 2 },
  '4/3': { css: '4 / 3', valor: 4 / 3 },
  '1/1': { css: '1 / 1', valor: 1 },
  '16/9': { css: '16 / 9', valor: 16 / 9 },
};

function arquivoExiste(caminhoPublico: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), 'public', caminhoPublico));
  } catch {
    return false;
  }
}

export function Foto({
  slot,
  prioridade = false,
  sizes = '(min-width: 1024px) 46vw, 100vw',
  className = '',
}: {
  slot: ChaveFoto;
  prioridade?: boolean;
  sizes?: string;
  className?: string;
}) {
  const foto = FOTOS[slot];
  const proporcao = PROPORCOES[foto.proporcao];

  if (!arquivoExiste(foto.arquivo)) {
    return (
      <div
        className={`foto-pendente ${className}`.trim()}
        style={{ aspectRatio: proporcao.css }}
        role="img"
        aria-label={`Espaço reservado para foto: ${foto.rotulo}`}
      >
        <Camera size={26} aria-hidden="true" />
        <p className="t-small" style={{ fontWeight: 600 }}>
          {foto.rotulo}
        </p>
        <p className="t-small foto-pendente-briefing">{foto.briefing}</p>
        <code className="t-small foto-pendente-caminho">public{foto.arquivo}</code>
      </div>
    );
  }

  return (
    <Image
      src={foto.arquivo}
      alt={foto.alt}
      width={1600}
      height={Math.round(1600 / proporcao.valor)}
      sizes={sizes}
      priority={prioridade}
      className={className}
      style={{ width: '100%', height: 'auto', aspectRatio: proporcao.css, objectFit: 'cover' }}
    />
  );
}
