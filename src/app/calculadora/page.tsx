import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { Calculadora } from '@/components/forms/Calculadora';
import { CALCULADORA_PUBLICADA } from '@/lib/calculo-perda';

export const metadata: Metadata = {
  title: 'Calculadora de perda de vapor por purgador',
  description:
    'Estime quanto a sua planta perde por ano com purgadores em falha, a partir da quantidade de pontos, da pressão e do custo do seu vapor.',
  alternates: { canonical: '/calculadora' },
};

/**
 * A calculadora só vai ao ar com a tabela oficial de perda por DN e pressão
 * (§9 — "não publicar a calculadora com o placeholder"). Enquanto
 * `CALCULADORA_PUBLICADA` for false, a rota responde 404: o código está pronto
 * e o conteúdo não fica exposto.
 */
export default function CalculadoraPagina() {
  if (!CALCULADORA_PUBLICADA) notFound();

  return (
    <>
      <Secao>
        <div style={{ maxWidth: '62ch' }}>
          <TituloSecao
            nivel={1}
            titulo="Quanto sua planta perde com purgadores em falha"
            lead="Ajuste os parâmetros da sua planta e veja a ordem de grandeza. A conta é a mesma do laudo, roda na hora e não pede e-mail."
          />
        </div>
      </Secao>

      <Secao fundo="alt">
        <Calculadora />
      </Secao>

      <Secao>
        <div style={{ maxWidth: '62ch' }} className="pilha-4">
          <h2 className="t-h2">Estimativa não é laudo</h2>
          <p className="t-body t-mudo">
            Esta conta usa taxas de falha de literatura e uma perda média por ponto. Ela
            serve para decidir se vale investigar — não para pedir verba. O número que
            sustenta orçamento é o do laudo, medido purgador a purgador na sua planta.
          </p>
          <div className="linha-botoes">
            <Botao href="/laudo-exemplo" variante="secundario">
              Ver um laudo de exemplo
            </Botao>
          </div>
        </div>
      </Secao>
    </>
  );
}
