'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CHAVE = 'oikos-consentimento-analytics';

/**
 * Banner de cookies (§12).
 *
 * O GTM só é injetado depois do aceite, recusar é uma opção real, não
 * decorativa, e é o padrão enquanto o visitante não escolhe. Sem GTM_ID
 * configurado, o banner nem aparece: não há o que consentir.
 */
export function BannerCookies() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const [visivel, setVisivel] = useState(false);
  const [aceito, setAceito] = useState(false);

  useEffect(() => {
    if (!gtmId) return;
    let guardado: string | null = null;
    try {
      guardado = localStorage.getItem(CHAVE);
    } catch {
      return; // storage bloqueado: não rastreia e não incomoda
    }
    if (guardado === 'sim') setAceito(true);
    else if (guardado !== 'nao') setVisivel(true);
  }, [gtmId]);

  useEffect(() => {
    if (!aceito || !gtmId) return;
    if (document.getElementById('gtm-script')) return;

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.id = 'gtm-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);
  }, [aceito, gtmId]);

  const decidir = (resposta: 'sim' | 'nao') => {
    try {
      localStorage.setItem(CHAVE, resposta);
    } catch {
      /* sem storage: a decisão vale só para esta visita */
    }
    setAceito(resposta === 'sim');
    setVisivel(false);
  };

  if (!gtmId || !visivel) return null;

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: 16,
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between' }}
      >
        <p className="t-small" style={{ maxWidth: '60ch' }}>
          Usamos cookies de análise para entender como o site é usado. Eles não são
          necessários para navegar.{' '}
          <Link href="/politica-de-privacidade" className="link-azul">
            Política de privacidade
          </Link>
          .
        </p>
        <div className="linha-botoes">
          <button
            type="button"
            className="btn btn-secundario"
            style={{ minHeight: 44 }}
            onClick={() => decidir('nao')}
          >
            Recusar
          </button>
          <button
            type="button"
            className="btn btn-primario"
            style={{ minHeight: 44 }}
            onClick={() => decidir('sim')}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
