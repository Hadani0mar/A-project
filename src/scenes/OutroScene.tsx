/**
 * المشهد 7 (V2) — ختام مشمس: تدرّج غني فاتح + بطاقة بيضاء كبيرة،
 * مؤشر RemotionUI يضغط زر الدعوة فتنفجر القصاصات. نهاية إلى الأبيض.
 */
import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { AuroraBg } from '../remotionui/primitives/aurora-bg';
import { SimulatedCursor } from '../remotionui/primitives/simulated-cursor';
import { ConfettiBurst } from '../remotionui/primitives/confetti-burst';
import { WordStagger, PopIn, RiseIn, WhiteCard } from '../ui/primitives';
import { LogoMark } from '../ui/Logo';
import { COLORS, GRADIENT_MAIN, GRADIENT_SUNSET, clampCfg } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY, FONT_LATIN } from '../lib/fonts';
import { SCENE_FRAMES } from '../lib/timing';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [6, 44], [0, 1], clampCfg);
  const pulseT = frame > 124 ? ((frame - 124) % 44) / 44 : 0;
  const fadeWhite = interpolate(frame, [SCENE_FRAMES[6] - 16, SCENE_FRAMES[6] - 1], [0, 1], clampCfg);
  return (
    <AbsoluteFill style={{ backgroundImage: GRADIENT_SUNSET }}>
      <AuroraBg
        backgroundColor="transparent"
        colors={['#FFFFFF', '#FFD9E8', '#CFE6FF', '#FFE9B8']}
        ribbonCount={4} amplitude={10} thickness={16} centerY={40} spread={42}
        speed={0.6} blur={18} intensity={0.8} horizonGlow={0.2} striation={0.15} seed={5}
      />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 60 }}>
        <PopIn delay={0} from={0.93}>
          <WhiteCard radius={44} style={{
            width: 1180, padding: '46px 64px 40px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            boxShadow: '0 44px 110px rgba(80,30,90,0.35)',
          }}>
            <LogoMark size={164} drawProgress={draw} />
            <div style={{ marginTop: 16 }}>
              <WordStagger text="عندك فكرة؟" delay={34} stagger={7} fontSize={98} />
            </div>
            <WordStagger text="قُلها… وخلِّ الباقي عليّا" delay={58} stagger={5} fontSize={70} gradient />
            <div style={{ position: 'relative', marginTop: 42 }}>
              {frame > 124 && frame < 170 && (
                <div style={{
                  position: 'absolute', inset: -7, borderRadius: 999,
                  border: `3.5px solid ${COLORS.violet}`, opacity: (1 - pulseT) * 0.8,
                  transform: `scale(${1 + pulseT * 0.14})`,
                }} />
              )}
              <PopIn delay={102}>
                <div dir="rtl" style={{
                  display: 'flex', alignItems: 'center', gap: 17,
                  background: GRADIENT_MAIN, borderRadius: 999, padding: '25px 68px',
                  fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 800, color: '#FFFFFF',
                  boxShadow: '0 24px 56px rgba(124,92,255,0.48)',
                }}>
                  جرِّبني توّا
                  <svg width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                </div>
              </PopIn>
            </div>
            <RiseIn delay={114} style={{ textAlign: 'center', marginTop: 40 }}>
              <div dir="ltr" style={{ fontFamily: FONT_LATIN, fontSize: 27, fontWeight: 700, letterSpacing: 4, color: COLORS.ink }}>
                ARENA.AI · AGENT MODE
              </div>
              <div dir="rtl" style={{ fontFamily: FONT_BODY, fontSize: 23.5, color: COLORS.ink2, marginTop: 9 }}>
                وحتى هذا الفيديو… صمّمته وكتبته ورندرته بالكامل بالكود
                <span dir="ltr" style={{ fontFamily: FONT_LATIN, fontWeight: 700, color: COLORS.purpleDeep }}> (Remotion + RemotionUI)</span>
              </div>
            </RiseIn>
          </WhiteCard>
        </PopIn>
      </AbsoluteFill>

      {/* المؤشر يضغط الزر */}
      <Sequence from={118} durationInFrames={58} name="Cursor (RemotionUI)">
        <SimulatedCursor
          color="#0E1B33" accent="#FB4D6D"
          points={[
            { x: 28, y: 34, frame: 2 },
            { x: 50, y: 65, frame: 34, target: 120 },
          ]}
          clickFrames={[38]}
        />
      </Sequence>
      <Sequence from={156} name="Confetti (RemotionUI)">
        <ConfettiBurst count={140} originX={50} originY={65}
          colors={['#FB4D6D', '#FFC53D', '#7C5CFF', '#0DBE86', '#2F7CF6', '#FB7C3C']} />
      </Sequence>

      {/* نهاية إلى الأبيض */}
      <AbsoluteFill style={{ backgroundColor: '#FFFFFF', opacity: fadeWhite }} />
    </AbsoluteFill>
  );
};
