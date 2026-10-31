import type { DiagramKey } from "@/data/treatmentMedia";

/**
 * Diagramas educativos desenhados para o site (sem imagens de terceiros).
 * Traço e cores da paleta Dentarium; os números marcam as partes descritas na
 * legenda em HTML ao lado, que é o texto acessível de verdade.
 */

type Marker = { n: number; x: number; y: number; tx: number; ty: number };

const descriptions: Record<DiagramKey, string> = {
  camadas: "Corte de um dente mostrando o esmalte, camada externa, e a dentina logo abaixo.",
  canal: "Corte de um dente com a polpa e o canal da raiz destacados.",
  gengiva: "Corte de um dente com a gengiva, o osso de suporte e a raiz.",
  siso: "Três molares lado a lado; o último, o siso, inclinado e parcialmente dentro do osso.",
};

const markers: Record<DiagramKey, Marker[]> = {
  camadas: [
    { n: 1, x: 44, y: 60, tx: 102, ty: 84 },
    { n: 2, x: 276, y: 120, tx: 198, ty: 120 },
  ],
  canal: [
    { n: 1, x: 276, y: 110, tx: 172, ty: 118 },
    { n: 2, x: 276, y: 236, tx: 164, ty: 236 },
  ],
  gengiva: [
    { n: 1, x: 40, y: 118, tx: 78, ty: 168 },
    { n: 2, x: 40, y: 318, tx: 76, ty: 270 },
    { n: 3, x: 282, y: 262, tx: 194, ty: 236 },
  ],
  siso: [
    { n: 1, x: 404, y: 40, tx: 344, ty: 176 },
    { n: 2, x: 270, y: 30, tx: 228, ty: 72 },
  ],
};

const TOOTH =
  "M95 70 C95 42 125 30 160 30 C195 30 225 42 225 70 C225 110 220 140 210 170 C206 225 188 292 166 324 C162 329 158 329 154 324 C132 292 114 225 110 170 C100 140 95 110 95 70 Z";
const DENTIN =
  "M110 76 C110 54 134 46 160 46 C186 46 210 54 210 76 C210 110 206 138 198 170 C194 222 180 284 163 310 C161 313 159 313 157 310 C140 284 126 222 122 170 C114 138 110 110 110 76 Z";
const PULP =
  "M136 104 C136 86 184 86 184 104 C184 130 180 150 176 172 C172 222 166 268 161 302 L159 302 C154 268 148 222 144 172 C140 150 136 130 136 104 Z";
const MOLAR =
  "M0 40 C0 10 20 0 40 4 C55 0 70 0 85 4 C105 0 120 10 120 40 L114 95 C112 130 104 170 92 185 C86 188 80 182 78 170 L70 120 C66 112 54 112 50 120 L42 170 C40 182 34 188 28 185 C16 170 8 130 6 95 Z";

export function ToothDiagram({ variant, className = "" }: { variant: DiagramKey; className?: string }) {
  const isMolars = variant === "siso";
  const id = `diagram-${variant}`;
  return (
    <svg
      viewBox={isMolars ? "0 0 440 320" : "0 0 320 360"}
      role="img"
      aria-labelledby={`${id}-title`}
      className={`block h-auto w-full ${className}`}
    >
      <title id={`${id}-title`}>{descriptions[variant]}</title>
      <defs>
        <pattern id={`${id}-bone`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="var(--taupe-line)" opacity="0.45" />
          <circle cx="7" cy="7" r="0.9" fill="var(--taupe-line)" opacity="0.35" />
        </pattern>
      </defs>

      {isMolars ? (
        <g>
          <rect x="0" y="96" width="440" height="224" rx="18" fill="var(--taupe-soft)" opacity="0.45" />
          <rect x="0" y="96" width="440" height="224" rx="18" fill={`url(#${id}-bone)`} />
          <path d="M0 78 C60 64 120 92 180 80 C240 68 300 92 440 82 L440 112 L0 112 Z" fill="var(--rose)" opacity="0.55" />
          <g transform="translate(14 40) scale(0.9)">
            <path d={MOLAR} fill="#fff" stroke="var(--taupe-line)" strokeWidth="2" />
          </g>
          <g transform="translate(132 40) scale(0.9)">
            <path d={MOLAR} fill="#fff" stroke="var(--taupe-line)" strokeWidth="2" />
          </g>
          <g transform="translate(286 118) scale(0.9) rotate(-50 60 94)">
            <path d={MOLAR} fill="#fff" stroke="var(--clay)" strokeWidth="2.5" />
          </g>
        </g>
      ) : (
        <g>
          <rect x="30" y="184" width="260" height="176" rx="16" fill="var(--taupe-soft)" opacity="0.45" />
          <rect x="30" y="184" width="260" height="176" rx="16" fill={`url(#${id}-bone)`} />
          <path d="M30 152 C64 140 92 146 108 160 L114 214 L30 214 Z" fill="var(--rose)" opacity="0.6" />
          <path d="M290 152 C256 140 228 146 212 160 L206 214 L290 214 Z" fill="var(--rose)" opacity="0.6" />
          <path d={TOOTH} fill="#fff" stroke="var(--taupe-line)" strokeWidth="2" />
          <path
            d={DENTIN}
            fill={variant === "camadas" ? "#efe4d6" : "var(--taupe-tint)"}
            stroke="var(--taupe-soft)"
            strokeWidth="1.5"
          />
          <path
            d={PULP}
            fill={variant === "canal" ? "var(--clay)" : "var(--rose)"}
            opacity={variant === "canal" ? 0.85 : 0.55}
          />
        </g>
      )}

      {markers[variant].map((m) => (
        <g key={m.n} aria-hidden>
          <line x1={m.x} y1={m.y} x2={m.tx} y2={m.ty} stroke="var(--clay)" strokeWidth="1.25" />
          <circle cx={m.tx} cy={m.ty} r="3.5" fill="var(--clay)" />
          <circle cx={m.x} cy={m.y} r="14" fill="var(--clay)" />
          <text
            x={m.x}
            y={m.y}
            dy="0.35em"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#fff"
            fontFamily="var(--font-manrope), system-ui, sans-serif"
          >
            {m.n}
          </text>
        </g>
      ))}
    </svg>
  );
}
