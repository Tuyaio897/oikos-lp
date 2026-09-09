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

  useEffect(() => setAberto(false), [pathname]);

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
      <div className="container cabecalho-linha">
        <Link href="/" aria-label="Oikos, página inicial" style={{ flexShrink: 0, display: 'flex' }}>
          {/* O logo original é branco, feito para o fundo escuro antigo.
              O header é claro, então usa a variante em Vapor Oliva. */}
          <Image
            src="/imagens/logo-oikos-escuro.svg"
            alt="Oikos"
            width={124}
            height={34}
            priority
            style={{ height: 34, width: 'auto' }}
          />
        </Link>

        <nav aria-label="Navegação principal" className="nav-desktop">
          <ul>
            {NAV_PRINCIPAL.map((item) => {
              const ativo = pathname === item.href || pathname.startsWith(`${item.href}/`);
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

        <div className="acoes-desktop" style={{ alignItems: 'center', gap: 22, flexShrink: 0 }}>
          {tel && preenchido(SITE.telefone) ? (
            <a
              href={tel}
              className="tel-header"
              style={{
                alignItems: 'center',
                gap: 7,
                fontSize: 15,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                color: 'var(--grafite-700)',
              }}
            >
              <Phone size={15} aria-hidden="true" />
              <span className="num">{SITE.telefone}</span>
            </a>
          ) : null}

          <Link
            href={linkSistema()}
            className="nav-link link-sistema-header"
            style={{ height: 'auto', fontWeight: 600, color: 'var(--azul-700)' }}
          >
            Acessar o sistema
          </Link>

          <Link
            href="/contato"
            className="btn btn-primario"
            style={{ minHeight: 46, padding: '11px 20px', fontSize: 15, whiteSpace: 'nowrap' }}
          >
            Falar com especialista
          </Link>
        </div>

        <button
          type="button"
          className="botao-menu"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((v) => !v)}
          style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          {aberto ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {aberto ? (
        <div
          id="menu-mobile"
          style={{
            position: 'fixed',
            inset: '76px 0 0',
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
                    style={{
                      display: 'block',
                      fontSize: 19,
                      fontWeight: 600,
                      padding: '15px 0',
                      minHeight: 48,
                    }}
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
