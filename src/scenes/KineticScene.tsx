/**
 * المشهد 2 (V2) — بطاقات فلاش ملوّنة: كل كلمة على لوحة غنية اللون
 * (ستايل الإنفوجرافيك الفاتح) تدخل من جهة وتخرج من الأخرى.
 */
import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { RichBackdrop, WordStagger, LatinStagger, PopIn, WhiteCard } from '../ui/primitives';
import { COLORS, PANELS, SHADOW_POP, clampCfg, type PanelColor } from '../lib/theme';
import { FONT_DISPLAY, FONT_LATIN } from '../lib/fonts';

interface FlashWord { ar: string; lat: string; panel: PanelColor; from: number; to: number }
const WORDS: FlashWord[] = [
  { ar: 'أُفكِّر', lat: 'THINK', panel: PANELS[2], from: 8, to: 80 },
  { ar: 'أَبْحَث', lat: 'SEARCH', panel: PANELS[4], from: 74, to: 146 },
  { ar: 'أكتب الكود', lat: 'CODE', panel: PANELS[1], from: 140, to: 212 },
  { ar: 'وأُبدِع', lat: 'CREATE', panel: PANELS[0], from: 206, to: 268 },
];

const FlashPanel: React.FC<{ w: FlashWord; i: number }> = ({ w, i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < w.from - 3 || frame > w.to + 16) return null;
  const side = i % 2 === 0 ? 1 : -1;
  const enter = spring({ frame: frame - w.from, fps, config: { damping: 16, stiffness: 125, mass: 0.95 } });
  const exit = interpolate(frame, [w.to - 6, w.to + 12], [0, 1], clampCfg);
  const x = (1 - enter) * 520 * side - exit * 560 * side;
  const underline = interpolate(frame, [w.from + 20, w.from + 38], [0, 340], clampCfg);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 190 }}>
      <div style={{
        width: 1460, height: 580, borderRadius: 46, position: 'relative',
        background: w.panel.tint, border: `1.5px solid ${w.panel.accent}50`,
        boxShadow: SHADOW_POP(w.panel.accent),
        transform: `translateX(${x}px) rotate(${side * 1.1 + (1 - enter) * side * 2.4 - exit * side * 2}deg) scale(${0.92 + enter * 0.08})`,
        opacity: Math.min(1, enter * 1.7) * (1 - exit),
      }}>
        <span style={{ position: 'absolute', width: 210, height: 210, borderRadius: '50%', background: 'rgba(255,255,255,0.45)', right: -60, top: -70 }} />
        <span style={{ position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', left: 60, bottom: -50 }} />
        <div style={{
          position: 'absolute', inset: 26, borderRadius: 34, background: '#FFFFFF',
          boxShadow: 'inset 0 0 0 1px rgba(14,27,51,0.05)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, paddingTop: 26,
        }}>
          <div style={{ position: 'absolute', top: 34, left: 40, display: 'flex', alignItems: 'center', gap: 16 }} dir="ltr">
            <span style={{
              background: w.panel.accent, color: '#fff', borderRadius: 12, padding: '5px 14px',
              fontFamily: FONT_LATIN, fontSize: 25, fontWeight: 700,
            }}>
              0{i + 1}
            </span>
            <LatinStagger text={w.lat} delay={w.from + 10} fontSize={29} color={w.panel.deep} />
          </div>
          <div dir="rtl" style={{
            fontFamily: FONT_DISPLAY, fontWeight: 900, color: COLORS.ink,
            fontSize: w.ar.length > 7 ? 180 : 208, lineHeight: 1.38, paddingTop: 12,
          }}>
            <WordStagger text={w.ar} delay={w.from + 7} stagger={6} fontSize={w.ar.length > 7 ? 180 : 208} />
          </div>
          <div style={{
            width: underline, height: 10, borderRadius: 99, marginTop: 8,
            background: w.panel.accent, boxShadow: `0 8px 22px ${w.panel.accent}66`,
          }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const KineticScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <RichBackdrop seed={7} />
      {WORDS.map((w, i) => <FlashPanel key={w.lat} w={w} i={i} />)}
      {/* مؤشّر التقدّم */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 236,
        display: 'flex', justifyContent: 'center', gap: 10,
      }} dir="ltr">
        {WORDS.map((w, i) => {
          const a = Math.max(0, Math.min(1,
            interpolate(frame, [w.from - 4, w.from + 8], [0, 1], clampCfg) -
            interpolate(frame, [w.to - 2, w.to + 10], [0, 1], clampCfg)));
          return (
            <div key={i} style={{
              width: 14 + a * 34, height: 13, borderRadius: 99,
              background: a > 0.4 ? w.panel.accent : '#C7D4EE',
            }} />
          );
        })}
      </div>
      {/* سطر الختام */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 128 }}>
        <PopIn delay={238}>
          <WhiteCard radius={999} accent={COLORS.violet} style={{ padding: '18px 44px' }}>
            <WordStagger text="كلُّ ذلك… من محادثةٍ واحدة" delay={244} stagger={4} fontSize={52} />
          </WhiteCard>
        </PopIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
