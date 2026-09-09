# Decisões e pendências

Atualizado em 09/09/2026.

---

## 1. Bloqueadores abertos

Cada item abaixo tem um lugar exato no código. Preencher o valor é a única ação necessária.

### 1.1 Tabela oficial de perda (kg/h por DN e pressão) — [BLOQUEADOR]

**Arquivo:** `src/lib/calculo-perda.ts`

A constante `PERDA_KG_H` é provisória e conservadora. A tabela oficial vive na engine do aplicativo Oikos — é ela que gera os 313,71 / 43,11 / 12,99 kg/h do relatório RPV. Se o site e o laudo divergirem, a credibilidade cai a zero na primeira reunião.

Enquanto `TABELA_OFICIAL` for `false`:

- `/calculadora` responde **404** (o §9 é explícito: não publicar com placeholder);
- a rota some do sitemap e do rodapé automaticamente;
- o **contador de perda do herói** não corre — o mesmo espaço mostra o dado de literatura do DOE/FEMP, com fonte. A taxa de incremento do contador viria da mesma fórmula, então publicá-lo com a tabela provisória seria publicar um número que o laudo não sustenta.

**Para liberar:** substituir `PERDA_KG_H` pela tabela oficial e trocar `TABELA_OFICIAL` para `true`. Nada mais precisa mudar.

### 1.2 Revisão jurídica das políticas — [BLOQUEADOR]

**Arquivos:** `content/legal/politica-de-privacidade.md`, `content/legal/termos-de-uso.md`

Os textos publicados **descrevem com precisão o que o site realmente faz** — quais campos são coletados, para onde vão (Resend, webhook do CRM, Vercel, GTM sob consentimento), com que base legal e por quanto tempo. Não são texto genérico.

Ainda assim, **o §12 exige revisão por quem tem responsabilidade legal** e este item continua aberto até isso acontecer. Foi publicado em vez de deixar 404 porque o rodapé e o checkbox de consentimento apontam para essas páginas — um link quebrado ali é pior, inclusive juridicamente.

### 1.3 Confirmação do telefone / WhatsApp

**Arquivo:** `src/config/site.ts`

O CNPJ registra `(41) 9952-8006` — oito dígitos após o DDD, formato de telefone fixo. Se for celular (e portanto WhatsApp), o número correto é provavelmente `(41) 99952-8006`, mas **o dígito extra não foi assumido**: inventar um dígito de telefone é pior do que não ter o campo.

Estado atual:
- `telefone` publicado exatamente como registrado;
- `whatsapp` marcado como `PENDENTE` → **todos os CTAs de WhatsApp estão ocultos**, incluindo o do estado de sucesso do formulário.

**Para liberar:** preencher `whatsapp` com o número em formato E.164 sem símbolos (ex.: `5541999528006`) e conferir `telefone` / `telefoneE164`.

### 1.4 Sócios da página /empresa

**Arquivo:** `src/config/equipe.ts`

A lista `EQUIPE` está vazia e a seção "Quem faz" simplesmente não renderiza. Não inventamos pessoas. O §15 pede "/empresa com pessoas reais" — este item fica aberto até haver nome, cargo, formação e foto (colocar em `public/imagens/equipe/`).

### 1.5 Cases

**Pasta:** `content/cases/` (vazia)

A regra do §8 é explícita: **não publicar case fictício.** `/cases` assume um estado vazio honesto, explicando que não publicamos caso sem autorização nem caso construído, e redireciona para o laudo de exemplo.

**Para publicar:** criar `content/cases/<slug>.md` com front-matter `titulo`, `segmento`, `descricao`. A estrutura fixa pedida pelo §8 é: contexto da planta · nº de purgadores · taxa de falha encontrada · perda identificada em R$/ano · ações · resultado após 6/12 meses.

### 1.6 PDF do laudo de exemplo

**Arquivo:** `src/config/laudo.ts`

`pdfDisponivel: false`. A página `/laudo-exemplo` está completa e **aberta, sem formulário** — o §7.7 proíbe bloquear a visualização. O que falta é só o arquivo para download.

**Para liberar:** colocar o PDF anonimizado em `public/documentos/laudo-exemplo.pdf` e trocar a flag para `true`.

### 1.7 Fotografia real de campo

`public/imagens/campo/` ainda usa os renders herdados do site antigo, redimensionados. O §10.4 é claro que este é o investimento de maior retorno visual do projeto: purgador em cavalete, técnico com ultrassom, tablet em campo, sala de caldeira. Fotografar na próxima inspeção.

### 1.8 Domínio próprio

`oikos.eco.br` já é da Oikos, mas está parqueado na Hostinger. Você disse que vai apontá-lo pela Vercel.

**Quando fizer:** trocar `dominioProprioAtivo` para `true` em `src/config/site.ts`. Isso já move canonical, `metadataBase`, sitemap, robots e todo o JSON-LD para o domínio novo de uma vez. Configurar também o redirect 301 do `oikos-lp.vercel.app`.

### 1.9 Variáveis de ambiente

Ver `.env.example`. Nenhuma é obrigatória para o build — o site sobe e funciona sem elas —, mas **sem `RESEND_API_KEY` e `CRM_WEBHOOK_URL` o lead do formulário não chega a lugar nenhum** além do log do servidor.

| Variável | Efeito se ausente |
|---|---|
| `RESEND_API_KEY` + `LEAD_EMAIL_FROM` | Nenhum e-mail de lead é enviado |
| `CRM_WEBHOOK_URL` | Lead não entra no CRM |
| `NEXT_PUBLIC_GTM_ID` | Sem analytics e **sem banner de cookies** (não há o que consentir) |

---

## 2. Decisões tomadas

### 2.1 Modelo comercial: contrato mensal de cuidado (§1.5)

O site antigo prometia "diagnóstico gratuito" em quatro lugares, contradizendo a *Estratégia de Precificação Oikos*, seção 5 ("Desconto pontual, sim; gratuidade, nunca").

A primeira versão deste redesign resolveu isso com uma garantia de resultado ("se o laudo não identificar perdas maiores que o valor da inspeção, você não paga"). **O time pediu para remover essa promessa** — ela foi retirada de todo o site.

**Modelo publicado:** a Oikos faz a inspeção inicial e entrega o laudo; a partir daí, um **contrato mensal de cuidado com o purgador** deixa a própria equipe da planta fazendo as rondas periódicas com o equipamento, enquanto a Oikos mantém o método, a análise e o histórico.

Todo o copy consome `src/config/oferta.ts` — `chamada`, `explicacao` e `pilares`. Não existe mais campo `selo`.

### 2.1.1 Equipamento UP100 — CONFIRMAR

`EQUIPAMENTO` em `src/config/oferta.ts` publica o modelo como **UP100**, descrito como detector ultrassônico de referência.

**Pendente:** o fabricante não foi assumido. Se for o Ultraprobe 100 da UE Systems, vale nomear — mas nome de fabricante não se inventa. Confirmar antes de divulgar o site.

Também vale confirmar a mecânica comercial exata do equipamento no contrato (cedido, locado ou vendido junto), porque o texto atual diz apenas "com o equipamento".

### 2.1.2 Referências científicas

Nova página `/referencias` e bloco na home, alimentados por `src/config/referencias.ts`.

Cada link foi verificado antes de entrar. Inclui um artigo revisado por pares (*Measurement*, Elsevier, 2026, sobre detecção acústica com arranjo MEMS), as duas publicações do DOE/FEMP que sustentam as faixas de falha citadas no site, o registro OSTI/NREL, a prática recomendada da ASHE e a literatura técnica da UE Systems sobre o método ultrassônico.

**Regra:** se uma referência sair do ar, remover a entrada em vez de deixar link quebrado. Nenhuma citação foi construída.

### 2.2 Markdown em vez de MDX — desvio da spec

O §10.2 pedia MDX. Foi usado **Markdown puro** em `content/`, lido no build e renderizado com `marked`.

**Motivo:** mesma ergonomia de autoria (arquivos versionados, front-matter, editáveis por qualquer pessoa), sem a cadeia de build do MDX e sem risco de quebrar o deploy. Nenhum conteúdo atual precisa de componente React embutido. Se isso mudar, a migração para MDX é direta — a interface de `src/lib/conteudo.ts` não muda.

### 2.3 Rate limit em memória em vez de @upstash/ratelimit — desvio da spec

O §10.2 pedia `@upstash/ratelimit`, que exige um Redis provisionado. Foi implementado um limitador em memória por IP (5 requisições por minuto) em `src/app/actions/enviar-lead.ts`.

**Motivo:** cobre o caso real (bot batendo no endpoint) sem adicionar uma dependência que quebraria o build por falta de variável de ambiente que ainda não existe. Migrar quando houver Redis — a função `excedeuLimite` é o único ponto a trocar.

**Limitação conhecida e aceita:** em ambiente serverless a memória não é compartilhada entre instâncias, então o limite é por instância. Isso é suficiente contra spam trivial, não contra ataque distribuído. O honeypot continua sendo a primeira linha.

### 2.4 Endereço: complemento residencial omitido

O CNPJ registra `APT 104 BLOCO ANAVILHENAS ED`. O site publica logradouro, número, bairro, cidade/UF e CEP, **sem o complemento** — é um endereço residencial, e o número do apartamento não acrescenta nada em credibilidade institucional.

Se a Oikos passar a ter endereço comercial, atualizar `SITE.endereco`.

### 2.5 Vídeo do herói removido

`assets/purgador.mp4` (4,5 MB) foi removido. O §6.1 oferecia duas opções para o herói, e foi adotada a recomendada (foto + componente de dado sobreposto), o que deixou o vídeo sem uso. Ele **continua recuperável no histórico do git**.

Se um dia voltar, o §10.4 vale: reencodar para ≤1,5 MB, gerar `.webm` + `.mp4`, `poster` obrigatório, e substituir por imagem estática abaixo de 768px.

### 2.6 Variante escura do logotipo

O logo original tem `fill:white` em todos os paths — invisível no header claro. Foi gerado `public/imagens/logo-oikos-escuro.svg` em Vapor Oliva (`#323725`) para o header; o branco original continua no rodapé escuro.

### 2.7 Cor de texto do laranja

O manual de marca define Laranja Energia `#CE893B`. Como **texto sobre branco** ele tem contraste ~2,4:1 e reprova AA. O site usa `--oikos-laranja-700` (`#9C5F1D`) para texto laranja e reserva `#CE893B` para fundo de botão, com texto `#1A1A1A` — branco sobre esse laranja também reprova.

### 2.8 Números removidos do site antigo

Conforme §4 e §13, saíram e **não foram substituídos por equivalentes inventados**:

| Removido | Substituído por |
|---|---|
| `R$ 109.990/mês em um único purgador` | nada — o argumento agora é a taxa de falha do parque, com fonte |
| Fonte `timesind.co/energy-economics` | DOE/FEMP e Emerson, com link real, via componente `<Dado>` |
| `R$ 0 de retorno sem identificação da falha` | removido |
| "3% a 5% do consumo total de energia" | removido — a spec aponta que o site misturava esse número com o de 37%; nenhum dos dois foi republicado sem confirmação do time técnico |

**Pendente relacionado:** o §4 pede corrigir a citação do DOE decidindo qual afirmação a Oikos quer sustentar (3–5% do consumo total vs. 37% da energia passando pelo sistema de vapor). Como isso não foi decidido, nenhuma das duas está no site.

---

## 3. Conflitos entre a especificação e a realidade

Registrados aqui conforme a regra de trabalho nº 5.

1. **Screenshots do painel — removidos, não reaproveitados.** O §4 manda refazer os prints com uma planta-demonstração realista. Ao inspecionar as quatro imagens, o problema se mostrou mais grave do que a especificação supunha:

   - são **fotos de tela de celular**, com barra de status do iOS, botão "◀ WhatsApp" e a barra de endereço do Safari mostrando `...nt-panel.vercel.app` visíveis na imagem;
   - mostram um **painel administrativo interno** — abas "Dashboard / Peças / Painéis / Pedidos", com botões "Novo painel" e "Nova peça" — e não o produto que o cliente usaria;
   - contêm dados de teste: "Teste 44", "Exibindo 1 de 1 peças", um único pedido;
   - listam **"Copacol"** e **"Mondeleza"** como empresas. Copacol é uma cooperativa agroindustrial real; publicar essa tela sugeriria uma relação de cliente que não está comprovada, e "Mondeleza" é uma grafia próxima de uma multinacional real.

   Nenhuma delas ilustra o que o copy descreve (inventário de purgadores, perda em reais, histórico por tag). Foram **removidas do repositório** — continuam recuperáveis no histórico do git.

   No lugar, `src/components/blocks/PreviaPainel.tsx` mostra a **estrutura** das telas em HTML, com os tokens e as cores de status do laudo, rotulada como representação — sem fingir ser uma captura. É coerente com a direção de design do §6.1, que pede estrutura tabular.

   **Pendente:** capturas reais do sistema, em desktop, com uma planta de demonstração anonimizada e sem cromo de navegador. Quando existirem, substituir os componentes de prévia por `next/image`.

2. **Contador de perda do herói.** O §6.1 elege o contador como "onde gastar ousadia". Ele está implementado e funcional, mas desligado pela dependência do item 1.1 — a alternativa seria publicar um número que o laudo não sustenta, o que viola o §4. Volta sozinho quando a tabela oficial chegar.

3. **Direção visual — o §6.2 foi sobreposto pelo time.** A especificação pedia site predominantemente claro, laranja em no máximo ~5% da área, azul restrito a links e **proibia gradiente, glow e sombra colorida**.

   O time pediu explicitamente mais azul e mais verde por todo o site, botões mais elaborados e um acabamento visual mais forte. Pela regra de trabalho nº 5, a instrução do time vence — e fica registrada aqui.

   O que mudou: paleta ampliada com escalas completas de azul e verde; herói e duas seções em azul quase preto; botões com gradiente, sombra e elevação no hover; cards com sombra e reação ao ponteiro; raio de canto de 8px em botão e 14px em card (a spec pedia 2px e 4px).

   O que foi mantido da spec: **o laranja continua reservado a dado de perda** — não virou cor de ícone nem de decoração; o contraste AA continua verificado em todo texto; e não há fade-and-slide-up em cada seção ao rolar.

4. **Chips de status.** O §6.2 exige que as cores de status sejam idênticas às do app e do relatório RPV. Aplicadas como preenchimento sólido com texto branco, elas reprovavam AA em 13px (vazando 4,29:1; operando 3,95:1).

   A cor foi mantida, mas mudou a aplicação: fundo tingido claro, borda e ponto na cor do status, texto escuro. A cor continua sendo o sinal de identificação e o contraste subiu para cerca de 15:1. Se o relatório precisar bater pixel a pixel com o site, este é o ponto a revisar junto.

5. **`index.html` legado.** Foi removido do repositório. Se o projeto na Vercel não estiver com o preset **Next.js**, o deploy vai falhar de forma visível em vez de servir silenciosamente o site antigo — o que é o comportamento desejado, mas exige conferir o preset.
