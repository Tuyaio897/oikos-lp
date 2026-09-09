/**
 * Gráfico técnico do site.
 *
 * Aqui fica só o que é de fato um gráfico, com eixo e dado. Os desenhos
 * esquemáticos que existiam antes (purgador em corte e o ciclo do contrato)
 * foram removidos: fotografia real e tipografia resolvem melhor, e desenho
 * vetorial improvisado envelhece mal.
 */

const VERDE = 'var(--verde-500)';
const LARANJA = 'var(--laranja)';

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
      <text x="378" y="52" textAnchor="end" fontSize="12" fontWeight="700" fill="var(--laranja-700)">
        energia do vazamento
      </text>
      <line x1="276" y1="62" x2="330" y2="50" stroke={LARANJA} strokeWidth="1.5" opacity=".55" />

      {/* rótulo do eixo */}
      <text x="12" y="118" fontSize="11" fill="var(--grafite-500)" transform="rotate(-90 12 118)" textAnchor="middle">
        intensidade
      </text>
    </svg>
  );
}

