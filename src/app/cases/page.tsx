import type { Metadata } from 'next';
import Link from 'next/link';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { listarCases } from '@/lib/conteudo';

export const metadata: Metadata = {
  title: 'Cases',
  description:
    'Resultados de inspeção de purgadores por segmento industrial: taxa de falha encontrada, perda identificada e economia após a correção.',
  alternates: { canonical: '/cases' },
};

/**
 * Índice de cases (§8).
 *
 * Regra explícita da especificação: NÃO publicar case fictício. Enquanto não
 * houver caso real, mesmo que anonimizado por segmento, esta página assume o
 * estado vazio de forma honesta, em vez de encenar prova social que não existe.
 */
export default function Cases() {
  const cases = listarCases();

  return (
    <Secao>
      <div style={{ maxWidth: '62ch' }} className="pilha-6">
        <TituloSecao
          nivel={1}
          titulo="Cases"
          lead="Cada caso publicado segue a mesma estrutura: contexto da planta, número de purgadores, taxa de falha encontrada, perda identificada em R$/ano, ações executadas e o resultado medido depois de 6 e 12 meses."
        />
      </div>

      {cases.length > 0 ? (
        <ul style={{ listStyle: 'none', marginTop: 48, maxWidth: 820 }}>
          {cases.map((item) => (
            <li key={item.slug} style={{ borderTop: '1px solid var(--border)', paddingBlock: 28 }}>
              <article className="pilha-2">
                {item.segmento ? <span className="tag">{item.segmento}</span> : null}
                <h2 className="t-h3">
                  <Link href={`/cases/${item.slug}`}>{item.titulo}</Link>
                </h2>
                <p className="t-body t-mudo prosa">{item.descricao}</p>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card pilha-4" style={{ marginTop: 48, maxWidth: 720 }}>
          <h2 className="t-h3">Ainda não publicamos nenhum case</h2>
          <p className="t-body t-mudo">
            Não publicamos caso sem autorização do cliente, e não publicamos caso
            construído. Quando o primeiro estiver liberado, anonimizado por segmento, se
            for o caso, ele aparece aqui com os números de campo.
          </p>
          <p className="t-body t-mudo">
            Enquanto isso, o que dá para inspecionar de verdade é o formato do nosso
            entregável: o laudo de exemplo está aberto, com a estrutura completa do
            relatório que você receberia.
          </p>
          <div className="linha-botoes">
            <Botao href="/laudo-exemplo">Ver o laudo de exemplo</Botao>
            <Botao href="/contato" variante="secundario">
              Falar com um especialista
            </Botao>
          </div>
        </div>
      )}
    </Secao>
  );
}
