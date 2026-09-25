import { useMemo } from 'react';

const MODULES = 25;

/** Deterministic module layout — xorshift PRNG seeded once per call. */
function buildQrPattern(modules: number): Array<[number, number]> {
  let seed = 0x9e3779b9;
  const rand = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };

  const inFinder = (r: number, c: number) => {
    const zones = [
      [0, 0],
      [0, modules - 7],
      [modules - 7, 0],
    ];
    return zones.some(([zr, zc]) => r >= zr && r < zr + 7 && c >= zc && c < zc + 7);
  };

  const on: Array<[number, number]> = [];
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (inFinder(r, c)) continue;
      if (rand() > 0.52) on.push([r, c]);
    }
  }
  return on;
}

/**
 * Deterministic decorative QR pattern — same visual language as the QR on the
 * app's Receive screen (dark modules on white, three finder squares).
 */
export function QrPattern({ size = 118, className }: { size?: number; className?: string }) {
  const cells = useMemo(() => buildQrPattern(MODULES), []);

  const s = size / MODULES;
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x * s} y={y * s} width={7 * s} height={7 * s} rx={s * 0.8} fill="#0a1240" />
      <rect x={(x + 1) * s} y={(y + 1) * s} width={5 * s} height={5 * s} rx={s * 0.5} fill="white" />
      <rect x={(x + 2) * s} y={(y + 2) * s} width={3 * s} height={3 * s} rx={s * 0.3} fill="#0a1240" />
    </g>
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className={className}>
      <rect width={size} height={size} fill="white" />
      {cells.map(([r, c]) => (
        <rect
          key={`${r}-${c}`}
          x={c * s + s * 0.08}
          y={r * s + s * 0.08}
          width={s * 0.84}
          height={s * 0.84}
          rx={s * 0.22}
          fill="#0a1240"
        />
      ))}
      {finder(0, 0)}
      {finder(MODULES - 7, 0)}
      {finder(0, MODULES - 7)}
    </svg>
  );
}
