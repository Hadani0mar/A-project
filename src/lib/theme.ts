/** نظام التصميم — داكن فاخر بتوهّج نيوني (Glassmorphism + Gradient Glow) */
export const COLORS = {
  bg: '#070B16',
  bg2: '#0B1120',
  panel: 'rgba(255,255,255,0.06)',
  panelBorder: 'rgba(255,255,255,0.14)',
  text: '#F2F5FF',
  muted: 'rgba(226,232,255,0.68)',
  faint: 'rgba(226,232,255,0.42)',
  violet: '#7C5CFF',
  cyan: '#22D3EE',
  pink: '#F471B5',
  amber: '#FBBF24',
  green: '#34D399',
  blue: '#60A5FA',
} as const;

export const GRADIENT_MAIN = `linear-gradient(100deg, ${COLORS.cyan} 0%, ${COLORS.violet} 55%, ${COLORS.pink} 110%)`;
export const GRADIENT_WARM = `linear-gradient(100deg, ${COLORS.amber} 0%, ${COLORS.pink} 100%)`;

/** مولّد عشوائي حتمي (seeded) — إلزامي في ريموشن بدل Math.random */
export const mulberry32 = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const clampCfg = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;
