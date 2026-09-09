---
titulo: Por que a auditoria manual deixa passar dois terços das falhas
descricao: A verificação por tato e ruído encontra o purgador obviamente quebrado. O problema é o que ela não encontra, e o quanto isso custa por ano.
data: 2026-09-05
---

A objeção mais comum que ouvimos é razoável: *"minha equipe já verifica os purgadores"*.

Verifica mesmo. E é justamente por isso que o resultado surpreende.

## O dado desconfortável

A Emerson documentou uma auditoria manual de purgadores em que a equipe responsável avaliava a própria taxa de acerto em **95% a 97%**. Uma verificação instrumentada posterior encontrou o seguinte: dos 24 purgadores que estavam efetivamente falhando, **16 não haviam sido detectados**.

Dois terços. Numa equipe competente, que se considerava quase perfeita.

Isso não é uma história sobre negligência. É uma história sobre o limite físico do método.

## Por que o tato e o ouvido falham

A verificação manual clássica combina duas leituras: temperatura pelo toque (ou por termômetro infravermelho) e ruído pelo ouvido (ou por uma chave de fenda encostada no corpo do purgador).

As duas têm pontos cegos previsíveis:

**A temperatura não distingue vazamento parcial.** Um purgador operando corretamente está quente, porque condensado a 180 °C passa por ele. Um purgador travado aberto também está quente, pela mesma razão. A temperatura confirma que há fluido passando; ela não diz *o quê* está passando. É exatamente por isso que um purgador vazando vapor vivo pode parecer perfeitamente normal ao toque.

**O ruído audível cobre uma faixa estreita.** O escoamento de vapor por um orifício gera energia acústica majoritariamente em ultrassom, acima dos 20 kHz. O ouvido humano capta uma fração disso, e apenas quando a perda já é grande. Num ambiente de casa de caldeiras, com ruído de fundo alto, essa fração encolhe ainda mais.

**O resultado combinado:** o método encontra bem o purgador catastroficamente aberto. Encontra mal o purgador que perde 12 kg/h, que é o caso mais comum e, somado ao longo de um parque, o mais caro.

## O purgador caro não é o que grita

Vale insistir nesse ponto, porque ele é contraintuitivo.

Um purgador rompido, que faz barulho e solta pluma visível, é encontrado e corrigido rápido, em dias, não em anos. Ele custa caro por hora, mas por poucas horas.

O purgador que perde 12 kg/h em silêncio não é encontrado por ninguém. Ele opera assim por dois, três anos. A R$ 250 a tonelada de vapor e 8.000 horas por ano, são cerca de **R$ 24 mil por ano**, em um ponto que nenhum relatório menciona.

Multiplique por 30 ou 50 pontos parecidos num parque de 250 purgadores. É esse o número que aparece no laudo e que ninguém esperava.

## O que muda com ultrassom

O detector de ultrassom desloca a leitura para a faixa onde o escoamento realmente se manifesta. Combinado com a medição de temperatura de entrada e saída, ele permite separar três condições que o tato confunde:

- **operando**, descarga intermitente de condensado, com o padrão acústico característico de abertura e fechamento;
- **vazando**, escoamento contínuo, sem o ciclo de fechamento;
- **bloqueado**, nenhum escoamento, com queda de temperatura à jusante.

Não é uma tecnologia nova nem cara. O que costuma faltar não é o instrumento, é o método padronizado e o registro que torna a leitura comparável no ano seguinte.

## E depois da correção?

Corrigir tudo uma vez não encerra o assunto. As referências do DOE/FEMP indicam que **entre 5% e 10% da população de purgadores volta a falhar a cada ano**, mesmo em plantas com manutenção estruturada.

Sem reinspeção periódica e sem histórico por tag, uma planta que zerou as falhas volta ao patamar de perda original em dois a três anos. O ganho não se perde de uma vez, ele vaza de volta, devagar, do mesmo jeito silencioso.

É por isso que a inspeção isolada resolve menos do que parece, e o histórico resolve mais do que parece.

## Referências

- Emerson, *Steam Trap Monitoring*
- U.S. Department of Energy / FEMP, *Steam Trap Performance Assessment*
