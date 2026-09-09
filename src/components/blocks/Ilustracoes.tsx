/**
 * Ilustrações técnicas desenhadas para o site.
 *
 * Não são ícones de biblioteca — ícone genérico em seção de conteúdo é o que
 * faz um site parecer template. São desenhos do assunto: purgador em corte,
 * detecção por ultrassom e o ciclo do contrato.
 *
 * Também cobrem a falta de banco de imagens: enquanto não houver fotografia
 * real de campo, ilustração técnica é honesta — não finge ser foto.
 */

const AZUL = 'var(--azul-500)';
const AZUL_ESC = 'var(--azul-900)';
const VERDE = 'var(--verde-500)';
const LARANJA = 'var(--laranja)';

/** Purgador em corte, com vapor escapando pela sede desgastada. */
export function IlustracaoPurgador({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 260"
      role="img"
      aria-label="Purgador termodinâmico em corte: o disco assenta sobre a sede; com a sede desgastada, o vapor escapa continuamente"
      className={className}
      style={{ width: '100%', height: 'auto' }}
    >
      {/* tubulação de entrada */}
      <rect x="0" y="112" width="96" height="36" rx="4" fill="var(--azul-100)" stroke={AZUL_ESC} strokeWidth="2" />
      {/* corpo do purgador */}
      <path
        d="M96 88 h128 a16 16 0 0 1 16 16 v52 a16 16 0 0 1 -16 16 h-128 z"
        fill="var(--azul-50)"
        stroke={AZUL_ESC}
        strokeWidth="2.5"
      />
      {/* tampa */}
      <path d="M112 88 h96 v-22 a10 10 0 0 0 -10 -10 h-76 a10 10 0 0 0 -10 10 z" fill="var(--azul-100)" stroke={AZUL_ESC} strokeWidth="2.5" />
      {/* disco */}
      <ellipse cx="160" cy="118" rx="34" ry="7" fill={AZUL} stroke={AZUL_ESC} strokeWidth="2" />
      <text x="160" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill={AZUL_ESC}>
        disco
      </text>
      {/* sede desgastada — o ponto da falha */}
      <path d="M132 140 h56" stroke={LARANJA} strokeWidth="4" strokeLinecap="round" strokeDasharray="7 5" />
      <text x="160" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--laranja-700)">
        sede desgastada
      </text>
      {/* tubulação de saída */}
      <rect x="240" y="112" width="160" height="36" rx="4" fill="var(--azul-100)" stroke={AZUL_ESC} strokeWidth="2" />
      {/* vapor escapando */}
      <g stroke={LARANJA} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".85">
        <path d="M258 130 q14 -12 28 0 q14 12 28 0" />
        <path d="M262 116 q14 -12 28 0 q14 12 28 0" opacity=".65" />
        <path d="M266 144 q14 -12 28 0 q14 12 28 0" opacity=".5" />
      </g>
      <text x="330" y="94" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--laranja-700)">
        vapor vivo
      </text>
      {/* legenda de fluxo */}
      <text x="48" y="106" textAnchor="middle" fontSize="11" fill="var(--grafite-500)">
        condensado
      </text>
      <path d="M20 168 h60" stroke={VERDE} strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#seta-verde)" />
      <defs>
        <marker id="seta-verde" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill={VERDE} />
        </marker>
      </defs>
    </svg>
  );
}

/** Detecção por ultrassom: a faixa onde o escoamento se manifesta. */
export function IlustracaoUltrassom({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      role="img"
      aria-label="A energia acústica do vazamento se concentra acima de 20 kHz, fora da faixa audível pelo ouvido humano"
      className={className}
      style={{ width: '100%', height: 'auto' }}
    >
      {/* eixo */}
      <line x1="40" y1="190" x2="380" y2="190" stroke="var(--border-forte)" strokeWidth="2" />
      <line x1="40" y1="40" x2="40" y2="190" stroke="var(--border-forte)" strokeWidth="2" />

      {/* faixa audível */}
      <rect x="40" y="40" width="120" height="150" fill="var(--aco-100)" />
      <text x="100" y="212" textAnchor="middle" fontSize="12" fill="var(--grafite-500)">
        faixa audível
      </text>

      {/* faixa do ultrassom */}
      <rect x="160" y="40" width="220" height="150" fill="var(--verde-50)" />
      <text x="270" y="212" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--verde)">
        ultrassom · acima de 20 kHz
      </text>

      {/* divisor */}
      <line x1="160" y1="40" x2="160" y2="190" stroke={VERDE} strokeWidth="2" strokeDasharray="5 4" />
      <text x="160" y="32" textAnchor="middle" fontSize="11" fontWeight="600" fill={VERDE}>
        20 kHz
      </text>

      {/* curva de energia do vazamento */}
      <path
        d="M40 182 C 90 178, 130 172, 165 150 C 205 124, 235 78, 270 66 C 310 54, 345 84, 380 108"
        fill="none"
        stroke={LARANJA}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="270" cy="66" r="6" fill={LARANJA} stroke="#fff" strokeWidth="2.5" />
      <text x="286" y="60" fontSize="12" fontWeight="700" fill="var(--laranja-700)">
        energia do vazamento
      </text>

      {/* rótulo do eixo */}
      <text x="12" y="118" fontSize="11" fill="var(--grafite-500)" transform="rotate(-90 12 118)" textAnchor="middle">
        intensidade
      </text>
    </svg>
  );
}

/** Ciclo do contrato: medir, traduzir, manter. */
export function IlustracaoCiclo({ className = '' }: { className?: string }) {
  const passos = [
    { rotulo: 'Medir', cor: AZUL },
    { rotulo: 'Traduzir', cor: 'var(--azul-700)' },
    { rotulo: 'Manter', cor: VERDE },
  ];
  return (
    <svg
      viewBox="0 0 400 200"
      role="img"
      aria-label="Ciclo contínuo: medir com ultrassom, traduzir a perda em reais e manter o parque sob controle"
      className={className}
      style={{ width: '100%', height: 'auto' }}
    >
      {passos.map((passo, i) => {
        const cx = 70 + i * 130;
        return (
          <g key={passo.rotulo}>
            <circle cx={cx} cy="86" r="40" fill="none" stroke={passo.cor} strokeWidth="3" />
            <circle cx={cx} cy="86" r="30" fill={passo.cor} opacity=".10" />
            <text x={cx} y="92" textAnchor="middle" fontSize="15" fontWeight="700" fill={passo.cor}>
              {passo.rotulo}
            </text>
            <text x={cx} y="150" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--grafite-500)">
              {String(i + 1).padStart(2, '0')}
            </text>
            {i < passos.length - 1 ? (
              <path
                d={`M${cx + 46} 86 h38`}
                stroke="var(--border-forte)"
                strokeWidth="2.5"
                markerEnd="url(#seta-cinza)"
              />
            ) : null}
          </g>
        );
      })}
      {/* volta do ciclo */}
      <path
        d="M330 130 q0 42 -130 42 q-130 0 -130 -42"
        fill="none"
        stroke={VERDE}
        strokeWidth="2.5"
        strokeDasharray="6 6"
        markerEnd="url(#seta-verde-2)"
      />
      <defs>
        <marker id="seta-cinza" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--border-forte)" />
        </marker>
        <marker id="seta-verde-2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill={VERDE} />
        </marker>
      </defs>
    </svg>
  );
}
