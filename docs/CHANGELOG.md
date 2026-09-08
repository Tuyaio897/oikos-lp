# Changelog

## 08/09/2026 — Redesign e migração para Next.js

Reescrita completa do site conforme a *Especificação de Redesign do Site Oikos v1.0*.

### Fundação

- Migração de site estático de arquivo único (`index.html`, 54 KB com CSS e JS inline) para **Next.js 15 + App Router + TypeScript**.
- **Multi-página**: 14 rotas reais no lugar de uma página só com âncoras. Cada uma é uma porta de entrada de busca orgânica e um link que o comercial pode enviar isoladamente.
- Fontes **self-hosted** via `next/font` (Sora + Inter). O `@import` do Google Fonts, que bloqueava o render e enviava dados ao Google em runtime, foi removido.
- Assets reorganizados de `assets/PRINT DASHBOARD/` (com espaço no nome e arquivos com nome de UUID) para `public/imagens/` com nomes descritivos.

### Design system

- Tokens do manual de marca em `src/styles/tokens.css`, com os hex **corrigidos para contraste AA**: `--oikos-laranja-700` para texto laranja sobre claro; botão laranja com texto `#1A1A1A`.
- Direção estética invertida: de dark-tech-SaaS para **claro, alto contraste e estrutura tabular**.
- Removidos gradientes decorativos, glow, glassmorphism e sombras coloridas. Bordas de 1px no lugar de sombras; raio máximo de 4px.
- Movimento reduzido a uma sequência de entrada no herói. `prefers-reduced-motion` desliga tudo.
- `/dev/styleguide` (noindex) para QA visual.

### Credibilidade

- **Removido** `R$ 109.990/mês em um único purgador — TG-002, Cavalete 02`.
- **Removida** a fonte inexistente `timesind.co/energy-economics`; no lugar, DOE/FEMP e Emerson com link real.
- **Removida** a estatística vazia `R$ 0 de retorno sem identificação da falha`.
- **Removidos os quatro screenshots do painel** — eram fotos de tela de celular de um painel administrativo interno, com dados de teste e nomes de empresas reais que sugeririam clientes. Substituídos por representação estrutural em HTML, rotulada como tal.
- Componente `<Dado>` obriga toda afirmação numérica de literatura a citar a fonte.
- **Rodapé institucional completo**: razão social, CNPJ, endereço, telefone, e-mail, região de atendimento, links para as políticas.
- Página `/empresa` com os dados institucionais e JSON-LD `Organization` com `taxID`.

### Estratégia comercial

- **Eliminada a promessa de "diagnóstico gratuito"**, que aparecia em quatro lugares e contradizia a *Estratégia de Precificação Oikos* ("gratuidade, nunca") e o pedido mínimo de R$ 7.500 por visita.
- No lugar, o modelo de **garantia de resultado**, controlado por flag em `src/config/oferta.ts`.

### Conteúdo e copy

- Copy reescrito no registro de engenharia. Fora: "plataforma", "dashboard", "na palma da mão", "sem enrolação", "reparologia", "flutuando em sua dashboard online viva", o emoji `⚙️` e os sete eyebrows em caixa alta.
- Corrigido "sistemas de vapor indústriais" → "industriais".
- Corrigida a duplicação dos 5 itens da faixa rolante (a faixa foi substituída por uma linha discreta de setores atendidos).
- **Nova página `/laudo-exemplo`** — o maior ganho disponível: mostra o entregável, aberta, sem formulário.
- Blog técnico com dois artigos e FAQ de 9 perguntas com JSON-LD `FAQPage`.

### UX

- Formulário em **duas etapas** com lead parcial enviado ao final da etapa 1.
- Header com telefone visível em desktop, "Acessar o sistema" e "Falar com um especialista".
- Menu mobile em painel de tela cheia, alvos de toque acima de 48px, fecha com Esc e trava o scroll.
- Canais diretos (telefone, e-mail, endereço) sempre visíveis ao lado do formulário.

### Técnico

- Server Action com validação `zod`, honeypot e rate limit por IP.
- `sitemap.ts`, `robots.ts`, canonical e metadata por página; JSON-LD `Organization`, `Service`, `FAQPage`, `Article` e `BreadcrumbList`.
- Banner de cookies com recusa real — o GTM só carrega após aceite.
- Acessibilidade: skip-link, foco visível preservado, um `h1` por página, `lang="pt-BR"`, contraste AA.
- **Peso dos assets: 28 MB → 2,9 MB.** JS na home: 116 KB (meta: < 150 KB).

### Removido do repositório

Preservado no histórico do git: `index.html`, `rewrite.py`, `rewrite_v2.py`, `rewrite_v3.py`, `assets/purgador.mp4` e os quatro screenshots do painel.

### Pendências

Ver [`DECISOES.md`](DECISOES.md). Os bloqueadores abertos são a tabela oficial de kg/h (que mantém a calculadora e o contador do herói desligados), a revisão jurídica das políticas, a confirmação do WhatsApp, os sócios da `/empresa` e a fotografia de campo.
