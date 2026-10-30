/**
 * أيقونات شركات/أدوات SVG رسمية الألوان من حزمة simple-icons (3400+ شعار).
 * كل أيقونة = path واحد + لون العلامة (hex). العلامات داكنة اللون أصلاً
 * (GitHub/X/Next...) تُرسم بالأبيض على خلفيتنا الداكنة.
 */
import React from 'react';
import {
  siGithub, siReact, siPython, siTypescript, siNodedotjs, siGoogle,
  siX, siFigma, siDocker, siFirebase, siNextdotjs, siTailwindcss,
  siHtml5, siCss, siJavascript, siGit, siVercel, siYoutube,
  type SimpleIcon,
} from 'simple-icons';

const DARK_HEX = new Set(['181717', '000000', '191919', '111111']);

export const BrandIcon: React.FC<{
  icon: SimpleIcon;
  size: number;
  color?: string;
}> = ({ icon, size, color }) => {
  const fill = color ?? (DARK_HEX.has(icon.hex.toUpperCase()) ? '#E8ECF8' : `#${icon.hex}`);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-label={icon.title}>
      <path d={icon.path} fill={fill} />
    </svg>
  );
};

export interface Brand {
  icon: SimpleIcon;
  label: string;
}

/** أدوات الحلقة المدارية (مشهد الأدوات) */
export const ORBIT_BRANDS: Brand[] = [
  { icon: siReact, label: 'React' },
  { icon: siPython, label: 'Python' },
  { icon: siTypescript, label: 'TypeScript' },
  { icon: siGithub, label: 'GitHub' },
  { icon: siNodedotjs, label: 'Node.js' },
  { icon: siNextdotjs, label: 'Next.js' },
  { icon: siTailwindcss, label: 'Tailwind' },
  { icon: siDocker, label: 'Docker' },
];

/** شريط متحرك سفلي */
export const MARQUEE_BRANDS: Brand[] = [
  { icon: siGoogle, label: 'Google' },
  { icon: siFirebase, label: 'Firebase' },
  { icon: siHtml5, label: 'HTML5' },
  { icon: siCss, label: 'CSS' },
  { icon: siJavascript, label: 'JavaScript' },
  { icon: siGit, label: 'Git' },
  { icon: siFigma, label: 'Figma' },
  { icon: siVercel, label: 'Vercel' },
  { icon: siX, label: 'X' },
  { icon: siYoutube, label: 'YouTube' },
];
