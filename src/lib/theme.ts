/**
 * نظام ألوان V2 — فاتح وغني (مستوحى من مرجع المستخدم: بطاقات ملوّنة
 * مشبعة على خلفية بيضاء مزرقّة، عناوين كحلية عريضة، وشارات بيضاء).
 * كل لوحة (Panel) لها: tint خلفية غنية + accent مشبع + deep للنصوص.
 */
export const COLORS = {
  bg: '#EEF3FD',
  bgSoft: '#E3EBFB',
  paper: '#FFFFFF',
  ink: '#0E1B33',
  ink2: '#44557A',
  ink3: '#7A89AC',
  line: 'rgba(14,27,51,0.10)',
  navyPanel: '#0C1428', // اللوحة الداكنة الوحيدة — محرّر الكود (تباين مقصود)
  coral: '#FB4D6D',
  pink: '#F2598C',
  violet: '#7C5CFF',
  purpleDeep: '#5B3DF0',
  blue: '#2F7CF6',
  cyan: '#0FA8D8',
  green: '#0DBE86',
  mint: '#12C48B',
  amber: '#FFAE1A',
  yellow: '#FFC53D',
  orange: '#FB7C3C',
} as const;

export interface PanelColor {
  name: string;
  tint: string;
  accent: string;
  deep: string;
}

/** ستّ لوحات ملوّنة مثل صورة المرجع بالترتيب */
export const PANELS: PanelColor[] = [
  { name: 'pink', tint: '#FFDFE8', accent: '#F43F5E', deep: '#9F1239' },
  { name: 'yellow', tint: '#FFF0BC', accent: '#F59E0B', deep: '#92400E' },
  { name: 'purple', tint: '#E3DEFE', accent: '#7C5CFF', deep: '#4C2FD9' },
  { name: 'mint', tint: '#D3F7E3', accent: '#0DBE86', deep: '#047857' },
  { name: 'sky', tint: '#D8EAFF', accent: '#2F7CF6', deep: '#1E40AF' },
  { name: 'peach', tint: '#FFE7D1', accent: '#F97316', deep: '#9A3412' },
];

export const GRADIENT_MAIN =
  'linear-gradient(100deg, #2F7CF6 0%, #7C5CFF 52%, #FB4D6D 105%)';
export const GRADIENT_SUNSET =
  'linear-gradient(120deg, #FFB25E 0%, #FB4D6D 38%, #7C5CFF 72%, #2F7CF6 110%)';
export const GRADIENT_FRESH =
  'linear-gradient(100deg, #12C48B 0%, #0FA8D8 55%, #2F7CF6 105%)';

export const SHADOW_CARD =
  '0 18px 44px rgba(23,38,84,0.13), 0 3px 10px rgba(23,38,84,0.07)';
export const SHADOW_POP = (color: string) =>
  `0 22px 48px ${color}38, 0 4px 12px rgba(23,38,84,0.10)`;

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
