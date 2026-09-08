import type { Metadata } from 'next';
import { PreviaInventario, PreviaHistorico } from '@/components/blocks/PreviaPainel';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { OFERTA } from '@/config/oferta';
import { linkSistema } from '@/config/site';

export const metadata: Metadata = {
  title: 'Sistema Oikos — gestão contínua de purgadores',
  description:
    'Inventário permanente por tag, fila de manutenção priorizada por valor de perda, histórico de intervenções e relatório de economia acumulada.',
  alternates: { canonical: '/sistema' },
};

const RECURSOS = [
  {
    titulo: 'Inventário permanente',
    texto:
      'Todos os purgadores da planta com tag, localização, fabricante, modelo, DN, pressão e status atual. O parque deixa de ser uma estimativa e passa a ser uma lista.',
  },
  {
    titulo: 'Prioridade por valor',
    texto:
      'A fila de manutenção ordenada pelo que custa mais caro deixar quebrado — não pelo que é mais fácil de alcançar. É o critério que a diretoria entende.',
  },
  {
    titulo: 'Histórico por tag',
    texto:
      'O que foi trocado, quando, por qual fabricante e quanto durou. Depois de dois ciclos, você sabe qual modelo não aguenta a sua linha.',
  },
  {
    titulo: 'Aplicativo de campo',
    texto:
      'A ronda é registrada no ponto, com foto, sem papel e sem redigitação depois. O relatório fica disponível no mesmo dia.',
  },
  {
    titulo: 'Relatório de economia',
    texto:
      'A perda evitada acumulada desde a primeira inspeção, calculada com as mesmas premissas do laudo. É o que justifica a renovação do contrato.',
  },
  {
    titulo: 'Acesso da sua equipe',
    texto:
      'Sua equipe de manutenção acessa de qualquer computador da fábrica. Os dados da planta são seus e podem ser exportados a qualquer momento.',
  },
];

export default function Sistema() {
  return (
    <>
      <Secao>
        <div className="grade-2">
          <div className="pilha-6">
            <TituloSecao
              nivel={1}
              titulo="O laudo não pode virar um PDF esquecido no e-mail"
              lead="Corrigir os purgadores uma vez não resolve: de 5% a 10% da população falha novamente a cada ano. Sem gestão contínua, a planta volta ao patamar de perda original em dois a três anos."
            />
            <div className="linha-botoes">
              <Botao href="/contato">{OFERTA.ctaPrimario}</Botao>
              <Botao href={linkSistema()} variante="secundario">
                Acessar o sistema
              </Botao>
            </div>
          </div>
          <PreviaInventario legenda="Representação da fila de manutenção: os pontos ordenados pelo que custa mais caro deixar quebrado." />
        </div>
      </Secao>

      <Secao fundo="alt">
        <TituloSecao titulo="O que o sistema mantém sob controle" />
        <div className="grade-3" style={{ marginTop: 48 }}>
          {RECURSOS.map((recurso) => (
            <div
              key={recurso.titulo}
              className="pilha-2"
              style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}
            >
              <h3 className="t-h3">{recurso.titulo}</h3>
              <p className="t-body t-mudo">{recurso.texto}</p>
            </div>
          ))}
        </div>
      </Secao>

      <Secao>
        <TituloSecao
          titulo="Histórico por tag"
          lead="As mesmas cores de status do laudo. O que você vê aqui é o que chega no relatório."
        />
        <div style={{ marginTop: 48, maxWidth: 620 }}>
          <PreviaHistorico />
        </div>
        <p className="t-small t-mudo" style={{ marginTop: 24, maxWidth: '62ch' }}>
          Depois de dois ciclos de inspeção, essa linha do tempo responde a pergunta que
          nenhuma planilha responde: qual modelo não aguenta a sua linha.
        </p>
      </Secao>

      <Secao fundo="escura">
        <div className="pilha-6" style={{ maxWidth: '62ch' }}>
          <h2 className="t-h2">Segurança dos dados da sua planta</h2>
          <div className="prosa t-body t-mudo">
            <p>
              O inventário da sua planta é um documento sensível: ele diz onde estão os
              pontos frágeis da sua operação. O acesso é restrito aos usuários que você
              autoriza, nada é compartilhado com fabricantes ou com outros clientes, e a
              exportação completa está disponível a qualquer momento.
            </p>
          </div>
          <div className="linha-botoes">
            <Botao href="/contato" variante="secundario">
              Falar com um especialista
            </Botao>
          </div>
        </div>
      </Secao>
    </>
  );
}
