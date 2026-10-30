/**
 * شعار الوكيل: حرف A هندسي داخل حلقة مدارية + شرارة.
 * يُرسم حيّاً بـ evolvePath من @remotion/paths (تقنية Stroke Draw-On
 * الكلاسيكية من After Effects / Trim Paths).
 */
import React from 'react';
import { evolvePath } from '@remotion/paths';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../lib/theme';

const RING = 'M 190 100 A 90 90 0 1 1 10 100 A 90 90 0 1 1 190 100';
const LETTER_A = 'M 58 148 L 100 56 L 142 148 M 76 112 L 124 112';

export const LogoMark: React.FC<{ size?: number; drawProgress: number }> = ({
  size = 240, drawProgress,
}) => {
  const frame = useCurrentFrame();
  const ring = evolvePath(drawProgress, RING);
  const letter = evolvePath(Math.max(0, Math.min(1, (drawProgress - 0.25) / 0.65)), LETTER_A);
  const orbitAngle = frame * 1.4;
  const ox = 100 + Math.cos((orbitAngle * Math.PI) / 180) * 90;
  const oy = 100 + Math.sin((orbitAngle * Math.PI) / 180) * 90;
  const sparkScale = 0.85 + 0.3 * Math.sin(frame / 6);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={COLORS.cyan} />
          <stop offset="55%" stopColor={COLORS.violet} />
          <stop offset="110%" stopColor={COLORS.pink} />
        </linearGradient>
      </defs>
      {/* حلقة خارجية منقّطة دوّارة ببطء */}
      <g style={{ transform: `rotate(${frame * 0.25}deg)`, transformOrigin: '100px 100px', opacity: 0.5 }}>
        <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(70,95,150,0.45)" strokeWidth="1.5" strokeDasharray="3 9" />
      </g>
      {/* الحلقة الرئيسية تُرسم */}
      <path d={RING} fill="none" stroke="url(#logo-grad)" strokeWidth="7" strokeLinecap="round"
        strokeDasharray={ring.strokeDasharray} strokeDashoffset={ring.strokeDashoffset} />
      {/* حرف A يُرسم */}
      <path d={LETTER_A} fill="none" stroke="#0E1B33" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={letter.strokeDasharray} strokeDashoffset={letter.strokeDashoffset} />
      {/* نقطة مدارية */}
      {drawProgress > 0.85 && (
        <circle cx={ox} cy={oy} r={6.5 * sparkScale} fill={COLORS.cyan}
          style={{ filter: `drop-shadow(0 0 8px ${COLORS.cyan})` }} />
      )}
    </svg>
  );
};
