# Site Oikos

Site institucional da Oikos Desenvolvimento Ltda. — engenharia de eficiência térmica para sistemas de vapor industriais.

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · deploy na Vercel.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run typecheck` | Checagem de tipos sem emitir |

## Onde mexer em quê

Quase tudo que muda com frequência está centralizado. Antes de editar uma página, veja se o que você quer não está em `src/config/`.

| Preciso mudar… | Arquivo |
|---|---|
| CNPJ, endereço, telefone, e-mail, região | `src/config/site.ts` |
| Modelo comercial (garantia / piloto / gratuito) e CTAs | `src/config/oferta.ts` |
| Itens do menu e do rodapé | `src/config/navegacao.ts` |
| Perguntas do FAQ da home | `src/config/faq.ts` |
| Sócios da página /empresa | `src/config/equipe.ts` |
| Disponibilidade do PDF do laudo | `src/config/laudo.ts` |
| Fórmula e tabela de perda | `src/lib/calculo-perda.ts` |
| Fontes citadas (DOE, Emerson…) | `src/lib/fontes.ts` |
| Artigos do blog | `content/conteudo/*.md` |
| Cases | `content/cases/*.md` |
| Política de privacidade e termos | `content/legal/*.md` |
| Cores, tipografia, espaçamento | `src/styles/tokens.css` e `src/app/globals.css` |

`/dev/styleguide` mostra todos os componentes do design system em uma página só. Serve de QA visual e não é indexada.

## Regras do projeto

Três coisas que o código faz de propósito e que é fácil desfazer sem querer:

1. **Nenhum número sem origem.** Todo dado de literatura passa pelo componente `<Dado fonte="..." />`, que obriga a citar a fonte. Todo agregado financeiro sai de `src/lib/calculo-perda.ts` — nunca é digitado à mão.

2. **Campos não preenchidos não aparecem.** `src/config/site.ts` marca com `PENDENTE` o que ainda não temos, e os componentes chamam `preenchido()` antes de renderizar. É por isso que os CTAs de WhatsApp estão ocultos: o número ainda não foi confirmado. Preencher o campo faz o elemento aparecer sozinho.

3. **A calculadora está atrás de uma flag.** `/calculadora` responde 404 e some da navegação e do sitemap enquanto `TABELA_OFICIAL` for `false` em `src/lib/calculo-perda.ts`. A tabela provisória de kg/h não pode ir ao ar, porque divergiria do laudo.

O que ainda falta e onde preencher está em [`docs/DECISOES.md`](docs/DECISOES.md).

## Variáveis de ambiente

Ver `.env.example`. Nenhuma é obrigatória para o build, mas sem `RESEND_API_KEY` e `CRM_WEBHOOK_URL` **o lead do formulário não chega a lugar nenhum**. Sem `NEXT_PUBLIC_GTM_ID` não há analytics nem banner de cookies — que é o padrão correto sob LGPD enquanto o GTM não estiver configurado.

## Deploy

A Vercel builda a partir de `main`. O `vercel.json` declara o preset `nextjs`.

**Se este for o primeiro deploy após a migração:** confirme no painel da Vercel que o Framework Preset do projeto é **Next.js**. O projeto era um site estático de arquivo único até esta versão.

## Documentação

- [`docs/AUDITORIA.md`](docs/AUDITORIA.md) — o que existia antes da migração
- [`docs/DECISOES.md`](docs/DECISOES.md) — decisões tomadas, desvios da especificação e pendências
- [`docs/CHANGELOG.md`](docs/CHANGELOG.md) — o que mudou
