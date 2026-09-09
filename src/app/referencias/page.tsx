import type { Metadata } from 'next';
import { Secao, TituloSecao } from '@/components/layout/Secao';
import { Botao } from '@/components/ui/Botao';
import { ListaReferencias } from '@/components/blocks/ListaReferencias';
import { IlustracaoUltrassom } from '@/components/blocks/Ilustracoes';
import { OFERTA } from '@/config/oferta';

export const metadata: Metadata = {
  title: 'Referências técnicas e científicas',
  description:
    'Artigos revisados por pares, publicações do Departamento de Energia dos EUA e literatura técnica sobre perda de vapor em purgadores e detecção por ultrassom.',
  alternates: { canonical: '/referencias' },
};

export default function Referencias() {
  return (
    <>
      <Secao>
        <div className="grade-2">
          <div className="pilha-6">
            <TituloSecao
              nivel={1}
              marcador="Base científica"
              titulo={
                <>
                  Não pedimos que você <span className="realce">acredite</span> na gente
                </>
              }
              lead="Todo número que a Oikos publica vem de uma destas fontes ou do cálculo do próprio laudo. Elas estão aqui abertas, para você conferir antes de falar com qualquer vendedor."
            />
          </div>
          <div className="palco-claro">
            <IlustracaoUltrassom />
          </div>
        </div>
      </Secao>

      <Secao fundo="alt">
        <ListaReferencias />
      </Secao>

      <Secao fundo="escura">
        <div className="pilha-6" style={{ maxWidth: '62ch' }}>
          <h2 className="t-h2">Da literatura para a sua planta</h2>
          <p className="t-body-lg t-mudo">
            As faixas de falha destas publicações valem para o parque médio. O número da
            sua planta só aparece depois de medir ponto a ponto — e é isso que o laudo faz.
          </p>
          <div className="linha-botoes">
            <Botao href="/contato" seta>
              {OFERTA.ctaPrimario}
            </Botao>
            <Botao href="/laudo-exemplo" variante="secundario">
              {OFERTA.ctaSecundario}
            </Botao>
          </div>
        </div>
      </Secao>
    </>
  );
}
