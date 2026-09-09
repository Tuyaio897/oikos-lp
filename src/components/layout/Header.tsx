'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_PRINCIPAL } from '@/config/navegacao';
import { SITE, preenchido, linkTelefone, linkSistema } from '@/config/site';

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolado, setRolado] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const aoRolar = () => setRolado(window.scrollY > 8);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Fecha o menu ao navegar.
  useEffect(() => setAberto(false), [pathname]);

  // Trava o scroll do corpo enquanto o painel mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAberto(false);
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [aberto]);

  const tel = linkTelefone();

  return (
    <header className="cabecalho" data-rolado={rolado}>
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          minHeight: 72,
        }}
      >
        <Link href="/" aria-label="Oikos — página inicial" style={{ flexShrink: 0 }}>
          {/* O logo original é branco (feito para o fundo escuro antigo). O
              header agora é claro, então usa a variante em Vapor Oliva. */}
          <Image
            src="/imagens/logo-oikos-escuro.svg"
            alt="Oikos"
            width={132}
            height={36}
            priority
            style={{ height: 36, width: 'auto' }}
          />
        </Link>

        <nav aria-label="Navegação principal" className="nav-desktop">
          <ul style={{ display: 'flex', gap: 28, listStyle: 'none', alignItems: 'center' }}>
            {NAV_PRINCIPAL.map((item) => {
              const ativo = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={ativo ? 'page' : undefined}
                  >
                    {item.rotulo}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="acoes-desktop" style={{ alignItems: 'center', gap: 16 }}>
          {/* Indústria liga. Telefone visível em desktop (§7.2). */}
          {tel && preenchido(SITE.telefone) ? (
            <a
              href={tel}
              className="nav-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
            >
              <Phone size={16} aria-hidden="true" />
              <span className="num">{SITE.telefone}</span>
            </a>
          ) : null}
          <Link
            href={linkSistema()}
            className="btn btn-secundario"
            style={{ minHeight: 44, padding: '10px 18px', fontSize: 15 }}
          >
            Acessar o sistema
          </Link>
          <Link
            href="/contato"
            className="btn btn-primario"
            style={{ minHeight: 44, padding: '10px 20px', fontSize: 15 }}
          >
            Falar com um especialista
          </Link>
        </div>

        <button
          type="button"
          className="botao-menu"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
          style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}
        >
          {aberto ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {aberto ? (
        <div
          id="menu-mobile"
          style={{
            position: 'fixed',
            inset: '72px 0 0',
            background: 'var(--bg)',
            padding: '24px',
            overflowY: 'auto',
            zIndex: 99,
          }}
        >
          <nav aria-label="Navegação principal (mobile)">
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
              {NAV_PRINCIPAL.map((item) => (
                <li key={item.href} style={{ borderBottom: '1px solid var(--border)' }}>
                  <Link
                    href={item.href}
                    style={{ display: 'block', fontSize: 20, fontWeight: 600, padding: '14px 0', minHeight: 48 }}
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pilha-4" style={{ marginTop: 32 }}>
            <Link href="/contato" className="btn btn-primario">
              Falar com um especialista
            </Link>
            <Link href={linkSistema()} className="btn btn-secundario">
              Acessar o sistema
            </Link>
            {tel && preenchido(SITE.telefone) ? (
              <a href={tel} className="btn btn-secundario">
                <Phone size={16} aria-hidden="true" /> {SITE.telefone}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
