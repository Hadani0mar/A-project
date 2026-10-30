/**
 * المشهد 1 — الهوك وكشف الشعار
 * الستايلات: Logo Reveal بـ Stroke Draw + Motion Echo (حلقات نابضة)
 * + Kinetic Typography (كلمات متدرّجة) + جسيمات.
 */
import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import { AuroraBackground, Particles, RiseIn, WordStagger, Chip, CornerMark } from '../ui/primitives';
import { LogoMark } from '../ui/Logo';
import { COLORS, clampCfg } from '../lib/theme';
import { FONT_BODY } from '../lib/fonts';

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [8, 72], [0, 1], { ...clampCfg, easing: Easing.inOut(Easing.cubic) });
  const logoScale = interpolate(frame, [0, 30], [0.82, 1], { ...clampCfg, easing: Easing.out(Easing.back(1.4)) });
  return (
    <AbsoluteFill>
      <AuroraBackground />
      <Particles count={52} seed={11} />
      <CornerMark />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* حلقات الصدى النابضة حول الشعار */}
        <div style={{ position: 'relative', transform: `scale(${logoScale})` }}>
          {[0, 1, 2].map((i) => {
            const t = ((frame + i * 30) % 90) / 90;
            return (
              <div key={i} style={{
                position: 'absolute', inset: -10, borderRadius: '50%',
                border: `2px solid ${COLORS.violet}`, opacity: (1 - t) * 0.4 * interpolate(frame, [60, 80], [0, 1], clampCfg),
                transform: `scale(${1 + t * 0.85})`,
              }} />
            );
          })}
          <LogoMark size={252} drawProgress={draw} />
        </div>

        <div style={{ height: 44 }} />
        <WordStagger text="أهلاً! أنا وكيلك الذكي" delay={58} stagger={6} fontSize={96} fontWeight={900} />

        <RiseIn delay={104} style={{ marginTop: 20 }}>
          <div dir="rtl" style={{ fontFamily: FONT_BODY, fontSize: 40, color: COLORS.muted, textAlign: 'center' }}>
            أعمل معك داخل مستودعك الحقيقي — <span style={{ color: COLORS.cyan, fontWeight: 700 }}>خطوةً بخطوة</span>
          </div>
        </RiseIn>

        <div style={{ display: 'flex', gap: 16, marginTop: 44 }} dir="rtl">
          {[
            { t: 'أكوّد', c: COLORS.violet },
            { t: 'أصمّم', c: COLORS.pink },
            { t: 'أبني', c: COLORS.cyan },
            { t: 'أنشر', c: COLORS.green },
          ].map((chip, i) => (
            <RiseIn key={chip.t} delay={132 + i * 10} y={26}>
              <Chip text={chip.t} color={chip.c} fontSize={26} />
            </RiseIn>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
