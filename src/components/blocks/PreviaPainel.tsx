import { LinhaStatus } from '@/components/ui/StatusChip';

/**
 * Prévia estrutural do sistema Oikos.
 *
 * Os screenshots herdados do site antigo não podiam ser publicados: eram fotos
 * de tela de celular (com barra do iOS e URL do navegador visíveis) de um
 * painel administrativo interno, com dados de teste e com nomes de empresas
 * reais que sugeririam clientes. Ver docs/DECISOES.md.
 *
 * Até existirem capturas reais anonimizadas, mostramos a estrutura da tela em
 * HTML, com os mesmos tokens e as mesmas cores de status do laudo. É honesto —
 * não finge ser uma captura — e é coerente com a direção de design do §6.1,
 * que pede estrutura tabular.
 */

const INVENTARIO = [
  { tag: 'PV-1042', local: 'Cavalete 02', tipo: 'Termodinâmico DN25', status: 'vazando' as const, kgh: '43,11', ano: 'R$ 86.220' },
  { tag: 'PV-1051', local: 'Coletor principal', tipo: 'Balde invertido DN15', status: 'bloqueado' as const, kgh: '12,99', ano: 'R$ 25.980' },
  { tag: 'PV-1043', local: 'Cavalete 02', tipo: 'Termodinâmico DN25', status: 'ok' as const, kgh: '—', ano: '—' },
  { tag: 'PV-1077', local: 'Traço de vapor', tipo: 'Termostático DN15', status: 'fora' as const, kgh: '—', ano: '—' },
];

export function PreviaInventario({ legenda }: { legenda?: string }) {
  return (
    <figure className="pilha-2">
      <div className="card pilha-4" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-alt)',
          }}
        >
          <p className="t-small" style={{ fontWeight: 600 }}>
            Inventário — fila ordenada por perda anual
          </p>
        </div>
        <div className="tabela-wrap" style={{ border: 'none', borderRadius: 0 }}>
          <table className="tabela">
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Local</th>
                <th scope="col">Tipo</th>
                <th scope="col">Status</th>
                <th scope="col" className="num">
                  kg/h
                </th>
                <th scope="col" className="num">
                  Custo/ano
                </th>
              </tr>
            </thead>
            <tbody>
              {INVENTARIO.map((linha) => (
                <tr key={linha.tag}>
                  <td style={{ fontWeight: 600 }}>{linha.tag}</td>
                  <td className="t-mudo">{linha.local}</td>
                  <td className="t-mudo">{linha.tipo}</td>
                  <td>
                    <LinhaStatus status={linha.status} />
                  </td>
                  <td className="num">{linha.kgh}</td>
                  <td className="num">{linha.ano}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <figcaption className="t-small t-mudo">
        {legenda ??
          'Representação da tela de inventário, com dados de uma planta de demonstração.'}
      </figcaption>
    </figure>
  );
}

const HISTORICO = [
  { data: '12/03/2026', evento: 'Substituição — termodinâmico DN25', detalhe: 'Durou 19 meses' },
  { data: '04/08/2024', evento: 'Reparo de sede', detalhe: 'Reincidência em 7 meses' },
  { data: '15/01/2024', evento: 'Primeira inspeção', detalhe: 'Encontrado vazando' },
];

export function PreviaHistorico() {
  return (
    <figure className="pilha-2">
      <div className="card pilha-4">
        <p className="t-small" style={{ fontWeight: 600 }}>
          Histórico da tag PV-1042
        </p>
        <ol style={{ listStyle: 'none' }} className="pilha-4">
          {HISTORICO.map((item) => (
            <li
              key={item.data}
              style={{
                display: 'grid',
                gridTemplateColumns: '104px 1fr',
                gap: 16,
                paddingBottom: 16,
                borderBottom: '1px solid var(--border)',
              }}
            >
              <time className="t-small t-mudo num">{item.data}</time>
              <div>
                <p className="t-body" style={{ fontWeight: 600 }}>
                  {item.evento}
                </p>
                <p className="t-small t-mudo">{item.detalhe}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="t-small t-mudo">
        Representação do histórico por tag: cada intervenção, com data e duração.
      </figcaption>
    </figure>
  );
}
