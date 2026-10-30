/**
 * المشهد 7 — الختام والدعوة (Logo Stinger + CTA + Confetti)
 * إعادة رسم سريعة للشعار، سطر ختامي متدرّج، زر نابض، وانفجار قصاصات
 * احتفالي حتمي البذرة. ينتهي بتلاشٍ إلى الأسود.
 */
import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AuroraBackground, Particles, WordStagger, GradientText, RiseIn } from '../ui/primitives';
import { LogoMark } from '../ui/Logo';
import { COLORS, GRADIENT_MAIN, mulberry32, clampCfg } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY, FONT_LATIN } from '../lib/fonts';
import { SCENE_FRAMES } from '../lib/timing';

const BURST_AT = 128;

const Confetti: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const pieces = React.useMemo(() => {
    const rnd = mulberry32(99);
    return Array.from({ length: 70 }, (_, i) => ({
      angle: rnd() * Math.PI * 2,
      speed: 5 + rnd() * 13,
      size: 8 + rnd() * 10,
      rot: rnd() * 360,
      rotSpeed: (rnd() - 0.5) * 14,
      circle: rnd() > 0.5,
      color: [COLORS.cyan, COLORS.violet, COLORS.pink, COLORS.amber, COLORS.green][i % 5],
    }));
  }, []);
  const t = frame - BURST_AT;
  if (t < 0) return null;
  const fade = interpolate(t, [70, 105], [1, 0], clampCfg);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {pieces.map((p, i) => {
        const x = Math.cos(p.angle) * p.speed * t;
        const y = Math.sin(p.angle) * p.speed * t + 0.22 * t * t - 4 * t;
        return (
          <div key={i} style={{
            position: 'absolute', left: width / 2, top: 700, width: p.size, height: p.size * (p.circle ? 1 : 0.45),
            borderRadius: p.circle ? '50%' : 3, backgroundColor: p.color, opacity: fade,
            transform: `translate(${x}px, ${y}px) rotate(${p.rot + p.rotSpeed * t}deg)`,
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [4, 42], [0, 1], { ...clampCfg, easing: Easing.inOut(Easing.cubic) });
  const btnP = spring({ frame: frame - 118, fps, config: { damping: 11, stiffness: 150 } });
  const pulse = ((frame - 130) % 46 + 46) % 46 / 46;
  const fadeOut = interpolate(frame, [SCENE_FRAMES[6] - 16, SCENE_FRAMES[6] - 1], [0, 1], clampCfg);
  return (
    <AbsoluteFill>
      <AuroraBackground hueShift={330} />
      <Particles count={72} seed={23} />
      <Confetti />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <LogoMark size={196} drawProgress={draw} />
        <div style={{ height: 30 }} />
        <WordStagger text="عندك فكرة؟" delay={40} stagger={7} fontSize={112} fontWeight={900} />
        <RiseIn delay={78} style={{ marginTop: 8, textAlign: 'center' }}>
          <GradientText text="قُلها… وخلِّ الباقي عليّا" fontSize={80} />
        </RiseIn>
        {/* زر الدعوة */}
        <div style={{ position: 'relative', marginTop: 58, transform: `scale(${btnP})`, opacity: btnP }}>
          {frame > 130 && (
            <div style={{
              position: 'absolute', inset: -6, borderRadius: 999,
              border: `3px solid ${COLORS.cyan}`, opacity: (1 - pulse) * 0.75,
              transform: `scale(${1 + pulse * 0.16})`,
            }} />
          )}
          <div dir="rtl" style={{
            display: 'flex', alignItems: 'center', gap: 16,
            backgroundImage: GRADIENT_MAIN, borderRadius: 999, padding: '24px 62px',
            fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 800, color: '#FFFFFF',
            boxShadow: `0 22px 60px ${COLORS.violet}66`,
          }}>
            جرِّبني توّا
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
          </div>
        </div>
        <RiseIn delay={152} style={{ marginTop: 56, textAlign: 'center' }}>
          <div dir="ltr" style={{ fontFamily: FONT_LATIN, fontSize: 30, fontWeight: 700, letterSpacing: 4, color: COLORS.text }}>
            ARENA.AI · AGENT MODE
          </div>
          <div dir="rtl" style={{ fontFamily: FONT_BODY, fontSize: 26, color: COLORS.faint, marginTop: 10 }}>
            وحتى هذا الفيديو… صمّمته وكتبته ورندرته بالكامل بالكود (Remotion)
          </div>
        </RiseIn>
      </AbsoluteFill>
      {/* تلاشٍ إلى الأسود */}
      <AbsoluteFill style={{ backgroundColor: '#000', opacity: fadeOut }} />
    </AbsoluteFill>
  );
};
