import type { Metadata } from 'next';
import Image from 'next/image';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { Foto } from '@/components/ui/Foto';
import { EQUIPE } from '@/config/equipe';
import { SITE, ENDERECO_LINHA, preenchido } from '@/config/site';

export const metadata: Metadata = {
  title: 'Empresa',
  description:
    'A Oikos é uma empresa de engenharia de eficiência térmica independente de fabricante. Conheça a metodologia, a região de atendimento e os dados institucionais.',
  alternates: { canonical: '/empresa' },
};

export default function Empresa() {
  return (
    <>
      <Secao>
        <div className="grade-2 topo">
          <div className="pilha-6">
            <TituloSecao
              nivel={1}
              marcador="Quem somos"
              titulo="Engenharia de eficiência térmica, não software de prateleira"
              lead="A Oikos mede a perda de vapor da sua planta purgador a purgador, traduz o resultado em reais e mantém o parque sob controle ao longo dos anos. O sistema é a ferramenta que faz o resultado durar, não o produto."
            />
          </div>
          <div className="moldura">
            <Foto slot="equipeOikos" prioridade />
          </div>
        </div>
      </Secao>

      <Secao fundo="alt">
        <div className="grade-2">
          <div className="pilha-4">
            <h2 className="t-h2">Por que &ldquo;Oikos&rdquo;</h2>
            <div className="prosa t-body t-mudo">
              <p>
                <em>Oikos</em> é a palavra grega para casa, e a raiz de
                &ldquo;economia&rdquo; (<em>oikonomia</em>: a gestão da casa) e de
                &ldquo;ecologia&rdquo; (<em>oikologia</em>: o estudo da casa).
              </p>
              <p>
                É exatamente o que uma planta industrial precisa fazer com o seu sistema de
                vapor: administrar a própria casa. Não é uma obra pontual, é gestão
                continuada, e é por isso que o nome não fala de tecnologia.
              </p>
            </div>
          </div>

          <div className="pilha-4">
            <h2 className="t-h2">Independência de fabricante</h2>
            <div className="prosa t-body t-mudo">
              <p>
                Não vendemos, não trocamos e não representamos nenhum fabricante de
                purgador. Fabricantes fazem auditoria para vender peça; a Oikos é
                remunerada pela gestão da eficiência.
              </p>
              <p>
                A consequência prática é simples: quando o laudo diz que um purgador está
                bom, não há nada a ganhar dizendo o contrário, e quando diz que precisa
                trocar, quem executa é a sua equipe ou o fornecedor que você escolher.
              </p>
            </div>
          </div>
        </div>
      </Secao>

      <Secao>
        <div style={{ maxWidth: '62ch' }} className="pilha-4">
          <h2 className="t-h2">Metodologia</h2>
          <div className="prosa t-body t-mudo">
            <p>
              A avaliação combina leitura de ultrassom com medição de temperatura, e a
              condição encontrada é classificada em uma escala fechada, operando, vazando,
              bloqueado, fora de operação ou não avaliado. A escala é a mesma para toda a
              equipe.
            </p>
            <p>
              Isso importa mais do que parece. Um relatório só vale como histórico se a
              inspeção deste ano puder ser comparada com a do ano que vem; se cada técnico
              usa o próprio critério, o histórico vira uma coleção de opiniões. O método
              padronizado, apoiado por leitura assistida, é o que faz o mesmo purgador
              receber a mesma classificação de dois técnicos diferentes.
            </p>
            <p>
              Toda perda publicada em laudo tem a memória de cálculo declarada: diâmetro,
              pressão, condição, horas de operação e o custo de vapor da sua planta.
            </p>
          </div>
        </div>
      </Secao>

      {EQUIPE.length > 0 ? (
        <Secao fundo="alt">
          <TituloSecao titulo="Quem faz" />
          <div className="grade-3" style={{ marginTop: 48 }}>
            {EQUIPE.map((pessoa) => (
              <div key={pessoa.nome} className="pilha-2">
                {pessoa.foto ? (
                  <Image
                    src={pessoa.foto}
                    alt={`${pessoa.nome}, ${pessoa.cargo} da Oikos`}
                    width={400}
                    height={400}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 'var(--raio-card)',
                      border: '1px solid var(--border)',
                    }}
                  />
                ) : null}
                <h3 className="t-h3">{pessoa.nome}</h3>
                <p className="t-small" style={{ fontWeight: 600 }}>
                  {pessoa.cargo}
                </p>
                <p className="t-small t-mudo">{pessoa.formacao}</p>
                {pessoa.linkedin ? (
                  <a
                    href={pessoa.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-azul t-small"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </Secao>
      ) : null}

      <Secao fundo="escura">
        <TituloSecao titulo="Dados institucionais" />
        <div className="grade-3" style={{ marginTop: 40 }}>
          <div className="pilha-2">
            <p className="t-small t-mudo">Razão social</p>
            <p className="t-body">{SITE.razaoSocial}</p>
          </div>
          <div className="pilha-2">
            <p className="t-small t-mudo">CNPJ</p>
            <p className="t-body num">{SITE.cnpj}</p>
          </div>
          <div className="pilha-2">
            <p className="t-small t-mudo">Endereço</p>
            <p className="t-body">{ENDERECO_LINHA}</p>
          </div>
          <div className="pilha-2">
            <p className="t-small t-mudo">Região de atendimento</p>
            <p className="t-body">{SITE.regiaoAtendimentoTexto}</p>
          </div>
          {preenchido(SITE.telefone) ? (
            <div className="pilha-2">
              <p className="t-small t-mudo">Telefone</p>
              <p className="t-body num">{SITE.telefone}</p>
            </div>
          ) : null}
          {preenchido(SITE.email) ? (
            <div className="pilha-2">
              <p className="t-small t-mudo">E-mail</p>
              <p className="t-body">{SITE.email}</p>
            </div>
          ) : null}
        </div>
        <div className="linha-botoes" style={{ marginTop: 48 }}>
          <Botao href="/contato" variante="secundario">
            Falar com um especialista
          </Botao>
        </div>
      </Secao>
    </>
  );
}
