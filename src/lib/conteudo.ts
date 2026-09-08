import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

/**
 * Leitura do conteúdo em Markdown de `content/` no build (§10.2).
 *
 * Desvio registrado em docs/DECISOES.md: a spec pedia MDX. Usamos Markdown puro
 * com front-matter simples — mesma ergonomia de autoria, arquivos versionados no
 * repositório e sem a cadeia de build do MDX. Se algum dia o conteúdo precisar
 * de componentes React embutidos, migrar para MDX é direto.
 */

export type Artigo = {
  slug: string;
  titulo: string;
  descricao: string;
  data: string;
  html: string;
};

export type Case = {
  slug: string;
  titulo: string;
  segmento: string;
  descricao: string;
  html: string;
};

type FrontMatter = Record<string, string>;

function separarFrontMatter(bruto: string): { dados: FrontMatter; corpo: string } {
  const conteudo = bruto.replace(/^﻿/, '');
  if (!conteudo.startsWith('---')) return { dados: {}, corpo: conteudo };

  const fim = conteudo.indexOf('\n---', 3);
  if (fim === -1) return { dados: {}, corpo: conteudo };

  const cabecalho = conteudo.slice(3, fim);
  const corpo = conteudo.slice(fim + 4).replace(/^\r?\n/, '');

  const dados: FrontMatter = {};
  for (const linha of cabecalho.split('\n')) {
    const separador = linha.indexOf(':');
    if (separador === -1) continue;
    const chave = linha.slice(0, separador).trim();
    const valor = linha.slice(separador + 1).trim().replace(/^["']|["']$/g, '');
    if (chave) dados[chave] = valor;
  }
  return { dados, corpo };
}

function lerPasta(pasta: string): { slug: string; dados: FrontMatter; html: string }[] {
  const diretorio = path.join(process.cwd(), 'content', pasta);
  if (!fs.existsSync(diretorio)) return [];

  return fs
    .readdirSync(diretorio)
    .filter((arquivo) => arquivo.endsWith('.md'))
    .map((arquivo) => {
      const bruto = fs.readFileSync(path.join(diretorio, arquivo), 'utf8');
      const { dados, corpo } = separarFrontMatter(bruto);
      return {
        slug: arquivo.replace(/\.md$/, ''),
        dados,
        html: marked.parse(corpo, { async: false }),
      };
    });
}

export function listarArtigos(): Artigo[] {
  return lerPasta('conteudo')
    .map(({ slug, dados, html }) => ({
      slug,
      titulo: dados.titulo ?? slug,
      descricao: dados.descricao ?? '',
      data: dados.data ?? '',
      html,
    }))
    .sort((a, b) => b.data.localeCompare(a.data));
}

export function buscarArtigo(slug: string): Artigo | undefined {
  return listarArtigos().find((a) => a.slug === slug);
}

export function listarCases(): Case[] {
  return lerPasta('cases').map(({ slug, dados, html }) => ({
    slug,
    titulo: dados.titulo ?? slug,
    segmento: dados.segmento ?? '',
    descricao: dados.descricao ?? '',
    html,
  }));
}

export function buscarCase(slug: string): Case | undefined {
  return listarCases().find((c) => c.slug === slug);
}

export type Documento = { titulo: string; atualizadoEm: string; html: string };

/** Documentos avulsos em content/legal — política de privacidade, termos. */
export function lerDocumentoLegal(slug: string): Documento | undefined {
  const encontrado = lerPasta('legal').find((d) => d.slug === slug);
  if (!encontrado) return undefined;
  return {
    titulo: encontrado.dados.titulo ?? slug,
    atualizadoEm: encontrado.dados.atualizadoEm ?? '',
    html: encontrado.html,
  };
}
