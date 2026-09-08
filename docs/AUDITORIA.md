# Auditoria — Fase 0

Data: 08/09/2026
Repositório: `Tuyaio897/oikos-lp`
Site no ar no momento da auditoria: `https://oikos-lp.vercel.app/`

## Conclusão: Cenário A

O repositório **não era um projeto Next.js**. Era um site estático de arquivo único.

```
.claude/launch.json
.claude/settings.local.json
assets/PRINT DASHBOARD/{4 arquivos .jpg com nome UUID}
assets/boiler_steam_problem.png
assets/logo-oikos.svg
assets/purgador.mp4
assets/purgador/{body,cap,disco}.png
index.html          ← 54 KB, HTML + CSS + JS inline, tudo em um arquivo
rewrite.py
rewrite_v2.py
rewrite_v3.py
```

- Sem `package.json`, sem build step, sem gerenciador de dependências.
- `index.html` continha ~700 linhas de CSS inline no `<head>` e todo o conteúdo do site em uma única página com âncoras (`#s-prod`, `#s-prob`, `#s-como`, `#s-cta`).
- Fontes carregadas por `@import`/`<link>` do Google Fonts — bloqueando render e enviando dados ao Google em runtime.
- GSAP e efeitos de scroll aplicados via script inline.
- `rewrite*.py` eram scripts de geração de conteúdo deixados no repositório; sem uso em produção.

Conforme §10.1, **Cenário A → migrar para Next.js**.

## Histórico de commits antes da migração

```
efe8861 Fix footer alignment centrally for mobile
94d11f7 Fix mobile video positioning, set hero stats horizontally on mobile and resize ticker text
2e481b0 Standardize card dimensions, remove margin gap, and apply folder style to all sections
5aecb7c Fix mobile responsiveness, logo size, menu fonts, and use matchMedia to disable scrub on mobile
01add1b Fix dark gap by setting min-height 100vh on sticky section
ff24ad6 Update video with keyint=1 for smoother scrolling
a9e090e Fix video scroll performance
8950905 feat: Oikos Landing Page - Premium Redesign com GSAP e Efeitos High End
```

## Problemas confirmados em campo

Todos os pontos do §1 foram confirmados no código real:

| Item | Confirmado | Onde |
|---|---|---|
| `R$ 109.990/mês em um único purgador — TG-002, Cavalete 02` | Sim | ticker, duplicado no DOM |
| Fonte `timesind.co/energy-economics` | Sim | seção "credibilidade", como URL falsa em mockup de navegador |
| Estatística `R$ 0 de retorno` | Sim | `hero-stats` |
| Prints com dados fictícios | Sim | 4 JPGs com nomes UUID em pasta com espaço no nome |
| Zero dado institucional | Sim | rodapé só com copyright |
| Zero prova social | Sim | nenhum cliente, logo, case ou depoimento |
| Sem política de privacidade | Sim | formulário coletava nome/WhatsApp/empresa sem base legal |
| "reparologia" (palavra inexistente) | Sim | passo 03 de "Como funciona" |
| "sistemas de vapor indústriais" (typo) | Sim | rodapé |
| Emoji `⚙️` no herói | Sim | eyebrow do herói |
| Eyebrows em caixa alta | Sim | 7 ocorrências (`A PLATAFORMA`, `O PROBLEMA`, `COMO FUNCIONA`, `POR QUE OIKOS`, `FUNDAMENTOS`, `EM DESTAQUE`, `COMECE AGORA`) |
| Ticker duplicado no DOM | Sim | os mesmos 5 itens repetidos literalmente |
| Vídeo sem poster | Sim | `<video src="./assets/purgador.mp4" muted playsinline>` sem `poster` nem fallback |
| Pasta com espaço no nome | Sim | `assets/PRINT DASHBOARD/` |
| "Diagnóstico gratuito" | Sim | 4 ocorrências, contradizendo a estratégia de precificação |

## Peso dos assets (antes → depois)

A auditoria encontrou 28 MB em assets, com um PNG de 13 MB usado como imagem de seção.

| Arquivo | Antes | Depois |
|---|---|---|
| `caldeira-vapor.png` (era `boiler_steam_problem.png`) | 13,0 MB (5673px) | 1,26 MB (1800px) |
| `purgador-partes/disco.png` | 6,4 MB | 0,51 MB |
| `purgador-partes/body.png` | 2,8 MB | 0,68 MB |
| `purgador-partes/cap.png` | 1,9 MB | 0,35 MB |
| `purgador.mp4` | 4,5 MB | removido (ver DECISOES.md) |
| **Total `public/`** | **28 MB** | **2,9 MB** |

## Descobertas fora do escopo previsto

1. **O domínio `oikos.eco.br` já existe e é da Oikos** (aparece no e-mail institucional do cartão CNPJ). Está registrado na Hostinger e responde HTTP 200, mas com página de domínio parqueado — ainda não aponta para a Vercel. Isso torna o [BLOQUEADOR] de domínio do §11.1 muito mais barato de resolver do que a especificação supunha.

2. **O logotipo é branco** (`fill:white` em todos os paths). Foi desenhado para o fundo escuro do site antigo e ficava invisível no novo layout claro. Foi gerada a variante `logo-oikos-escuro.svg` em Vapor Oliva para uso no header claro; a original continua em uso no rodapé escuro.

3. **A empresa foi aberta em 01/09/2026** (uma semana antes desta auditoria). Nenhum texto do site faz alegação de tempo de mercado, experiência acumulada ou volume de clientes — não haveria como sustentar.
