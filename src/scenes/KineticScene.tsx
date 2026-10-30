/**
 * المشهد 2 — التايبوجرافيك الحركي (Kinetic Typography)
 * أربع كلمات عملاقة، كل واحدة بتقنية دخول/خروج مختلفة:
 * Spring Overshoot · Slide+Deblur · Word Reveal · Motion Trails/Echo
 * وخلفها نص شبحي ضخم يتحرك بـ Parallax بطيء.
 */
import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AuroraBackground, WordStagger } from '../ui/primitives';
import { COLORS, clampCfg } from '../lib/theme';
import { FONT_DISPLAY, FONT_LATIN } from '../lib/fonts';

const BigWord: React.FC<{
  word: string; from: number; to: number; color: string; variant: number;
}> = ({ word, from, to, color, variant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < from - 2 || frame > to + 14) return null;
  const p = spring({ frame: frame - from, fps, config: { damping: variant === 0 ? 11 : 16, stiffness: 130 } });
  const exit = interpolate(frame, [to - 10, to + 8], [0, 1], clampCfg);
  const base: React.CSSProperties = {
    fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: 205, lineHeight: 1.2, color,
    opacity: p * (1 - exit),
    textShadow: `0 0 70px ${color}55`,
  };
  let transform = '';
  let filter: string | undefined;
  if (variant === 0) transform = `scale(${interpolate(p, [0, 1], [0.55, 1]) + exit * 0.25})`;
  if (variant === 1) {
    transform = `translateX(${(1 - p) * 260 - exit * 200}px)`;
    filter = `blur(${(1 - p) * 14 + exit * 10}px)`;
  }
  if (variant === 2) transform = `translateY(${(1 - p) * 90 + exit * -70}px) rotate(${(1 - p) * -2.5}deg)`;
  if (variant === 3) transform = `scale(${interpolate(p, [0, 1], [1.35, 1]) - exit * 0.1})`;

  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* ذيول الحركة (Echo) للكلمة الأخيرة */}
      {variant === 3 && [3, 2, 1].map((k) => (
        <div key={k} dir="rtl" style={{
          ...base, position: 'absolute', color: 'transparent',
          WebkitTextStroke: `2px ${color}`, opacity: p * (1 - exit) * (0.34 - k * 0.09),
          transform: `translate(${-k * 14 * Math.sin(frame / 7)}px, ${k * 9}px) scale(${interpolate(p, [0, 1], [1.35, 1]) + k * 0.02})`,
          textShadow: 'none',
        }}>
          {word}
        </div>
      ))}
      <div dir="rtl" style={{ ...base, transform, filter }}>{word}</div>
    </AbsoluteFill>
  );
};

export const KineticScene: React.FC = () => {
  const frame = useCurrentFrame();
  const ghostX = interpolate(frame, [0, 282], [60, -160], clampCfg);
  const underline = interpolate(frame, [238, 264], [0, 560], { ...clampCfg, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill>
      <AuroraBackground hueShift={40} />
      {/* نص شبحي خلفي */}
      <div dir="ltr" style={{
        position: 'absolute', top: '50%', left: 0, whiteSpace: 'nowrap',
        transform: `translate(${ghostX}px, -54%)`,
        fontFamily: FONT_LATIN, fontWeight: 700, fontSize: 430, letterSpacing: 8,
        color: 'transparent', WebkitTextStroke: '2px rgba(150,170,255,0.13)',
      }}>
        THINK · BUILD · SHIP ·
      </div>
      <BigWord word="أُفكِّر" from={10} to={74} color={COLORS.violet} variant={0} />
      <BigWord word="أَبْحَث" from={70} to={134} color={COLORS.cyan} variant={1} />
      <BigWord word="أكتب الكود" from={130} to={194} color={COLORS.amber} variant={2} />
      <BigWord word="وأُبدِع" from={190} to={248} color={COLORS.pink} variant={3} />
      {/* سطر الختام */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 170 }}>
        <WordStagger text="كلُّ ذلك… من محادثةٍ واحدة" delay={226} stagger={4} fontSize={56} fontWeight={800} />
        <div style={{
          width: underline, height: 7, borderRadius: 99, marginTop: 18,
          background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.violet}, ${COLORS.pink})`,
          boxShadow: `0 0 24px ${COLORS.violet}88`,
        }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
