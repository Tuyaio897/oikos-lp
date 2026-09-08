---
titulo: Quanto custa um purgador com falha: o cálculo passo a passo
descricao: A conta que transforma kg/h de vapor perdido em R$/ano, com as premissas que precisam estar declaradas para o número sobreviver a uma reunião.
data: 2026-09-08
---

Toda discussão sobre purgador trava no mesmo ponto: o pessoal de manutenção sabe que há perda, e a diretoria não aprova verba para "perda". O que destrava é a conversão para reais — feita de um jeito que aguente ser questionada.

A conta em si é simples. O que separa um número que convence de um número que constrange é a disciplina com as premissas.

## A fórmula

```
perda_anual (R$) = perda_de_massa (kg/h)
                 × horas_de_operação (h/ano)
                 × custo_do_vapor (R$/t) ÷ 1000
```

Três variáveis. Cada uma tem um jeito certo e um jeito preguiçoso de ser obtida.

## 1. A perda de massa (kg/h)

É a única variável realmente técnica, e a única que não dá para estimar de longe.

A vazão de vapor que escapa por um purgador travado aberto depende do diâmetro do orifício, da pressão diferencial e da condição do vapor que passa. Um purgador termodinâmico DN25 a 10 bar totalmente aberto perde uma ordem de grandeza a mais que um termostático DN15 a 6 bar com vazamento parcial.

Por isso a inspeção registra, para cada ponto: diâmetro nominal, pressão de operação, tipo construtivo e a condição encontrada. Sem esses quatro dados, qualquer número de kg/h é chute.

**O erro comum:** aplicar uma perda média por purgador ao parque inteiro. Serve para decidir se vale investigar. Não serve para pedir orçamento, porque a primeira pergunta da diretoria vai ser "de onde saiu esse número?".

## 2. As horas de operação (h/ano)

Aqui mora o exagero mais frequente.

Usar 8.760 h/ano — o ano inteiro — só é honesto se a planta realmente opera sem parada. A maioria não opera: há parada programada, há sazonalidade, há linha que roda em dois turnos.

Uma planta de alimentos com parada anual e operação em três turnos costuma ficar entre 7.500 e 8.200 horas. Uma sucroalcooleira na entressafra é outra história completamente.

**Recomendação:** use a hora real da linha onde o purgador está, não a hora da planta. Um purgador em traço de vapor de uma linha que roda 4.000 horas não perde durante 8.000.

## 3. O custo do vapor (R$/t)

Este é o número que mais gente erra — e o mais fácil de acertar, porque a planta já tem.

O custo do vapor é o custo do combustível somado ao tratamento da água, à energia elétrica das bombas e ao rateio de manutenção da caldeira, dividido pela massa de vapor gerada. Ele varia muito conforme o combustível: uma planta a gás natural e uma a biomassa não têm o mesmo custo por tonelada, nem de longe.

**O erro comum:** usar uma média de mercado encontrada em artigo. Isso torna o cálculo indefensável na primeira reunião com o controller, que sabe qual é o custo real. Peça o número à área de utilidades antes de calcular qualquer coisa.

## Um exemplo com as premissas à vista

Um purgador termodinâmico DN25 operando a 10 bar, travado aberto, numa linha que roda 8.000 horas por ano, numa planta cujo vapor custa R$ 250 por tonelada:

- perda medida em campo: **43,11 kg/h**
- massa perdida no ano: 43,11 × 8.000 = **344.880 kg**, ou 344,9 t
- custo: 344,9 × R$ 250 = **R$ 86.220 por ano**

Um ponto. E a planta tem centenas.

Repare que o número só significa alguma coisa porque veio acompanhado de DN, pressão, condição, horas e custo do vapor. Tire qualquer uma dessas cinco informações e ele vira uma alegação.

## Por que a faixa é mais honesta que o número exato

Quando a estimativa é feita antes da inspeção — sem medição ponto a ponto — o resultado correto é uma **faixa**, não um valor único.

A dispersão é real: dois purgadores do mesmo modelo, na mesma pressão, podem perder valores bem diferentes conforme o grau de abertura e o estado da sede. Apresentar "R$ 612.480,00 por ano" para uma planta que ainda não foi inspecionada é falsa precisão, e o interlocutor técnico percebe.

Apresentar "entre R$ 430 mil e R$ 800 mil por ano, e a inspeção dirá onde nessa faixa" é mais defensável — e, na prática, converte melhor, porque soa como engenharia em vez de venda.

## O que sustenta o número numa auditoria

Se a intenção é usar o dado como evidência em auditoria energética (ISO 50001, por exemplo), três coisas precisam estar no documento:

1. **A memória de cálculo por ponto**, não só o total.
2. **A origem de cada premissa** — quem forneceu o custo do vapor, de onde veio a hora de operação.
3. **O método de medição**, incluindo o instrumento e a escala de classificação usada.

É o que separa um relatório de um orçamento com aparência de relatório.

## Referências

- U.S. Department of Energy / FEMP — *Steam Trap Performance Assessment*
- U.S. Department of Energy — *Improving Steam System Performance: A Sourcebook for Industry*
