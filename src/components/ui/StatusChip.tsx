export type Status = 'ok' | 'vazando' | 'bloqueado' | 'fora' | 'nao-aval';

/**
 * Cores e rótulos de status — os MESMOS do app e do relatório RPV.
 *
 * A consistência entre o que o cliente vê no site e o que recebe no laudo é
 * uma prova de seriedade (§6.2). Não divergir daqui.
 */
const STATUS: Record<Status, { classe: string; rotulo: string }> = {
  ok: { classe: 'chip-ok', rotulo: 'Operando' },
  vazando: { classe: 'chip-vazando', rotulo: 'Vazando' },
  bloqueado: { classe: 'chip-bloqueado', rotulo: 'Bloqueado' },
  fora: { classe: 'chip-fora', rotulo: 'Fora de operação' },
  'nao-aval': { classe: 'chip-nao-aval', rotulo: 'Não avaliado' },
};

export function LinhaStatus({ status }: { status: Status }) {
  const { classe, rotulo } = STATUS[status];
  return <span className={`chip-status ${classe}`}>{rotulo}</span>;
}
