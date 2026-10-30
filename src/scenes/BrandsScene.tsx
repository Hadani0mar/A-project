/**
 * المشهد 5 — مدار الأدوات (Cel-Spin / Orbit + Marquee)
 * أيقونات شركات SVG رسمية (simple-icons) تدور حول الشعار في حلقتين
 * متعاكستين مع تثبيت اتجاه الأيقونة، وشريط شعارات منساب في الأسفل.
 */
import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AuroraBackground, WordStagger, CornerMark } from '../ui/primitives';
import { LogoMark } from '../ui/Logo';
import { BrandIcon, ORBIT_BRANDS, MARQUEE_BRANDS } from '../lib/brands';
import { COLORS, clampCfg } from '../lib/theme';
import { FONT_LATIN } from '../lib/fonts';

const CENTER_Y = 515;
const RADIUS_X = 330;
const RADIUS_Y = 250;

const OrbitItem: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b = ORBIT_BRANDS[i];
  const enter = spring({ frame: frame - 26 - i * 7, fps, config: { damping: 14, stiffness: 110 } });
  const angle = (i / ORBIT_BRANDS.length) * Math.PI * 2 + frame * 0.0062;
  const x = Math.cos(angle) * RADIUS_X * enter;
  const y = Math.sin(angle) * RADIUS_Y * enter;
  const depth = 0.82 + 0.18 * ((Math.sin(angle) + 1) / 2); // عمق وهمي
  return (
    <div style={{
      position: 'absolute', left: '50%', top: CENTER_Y, opacity: enter,
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${depth * enter})`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9,
    }}>
      <div style={{
        width: 112, height: 112, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(13,20,40,0.82)', border: `1.5px solid ${COLORS.panelBorder}`,
        boxShadow: '0 18px 44px rgba(0,0,0,0.45)',
      }}>
        <BrandIcon icon={b.icon} size={54} />
      </div>
      <span dir="ltr" style={{ fontFamily: FONT_LATIN, fontSize: 21, fontWeight: 700, color: COLORS.muted }}>{b.label}</span>
    </div>
  );
};

export const BrandsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  // الشريط المنساب: عرض ثابت لكل شريحة = 232px لضمان حلقة سلسة
  const pitch = 232;
  const rowW = pitch * MARQUEE_BRANDS.length;
  const offset = -((frame * 2.4) % rowW);
  const ringGlow = interpolate(frame, [20, 60], [0, 1], clampCfg);
  return (
    <AbsoluteFill>
      <AuroraBackground hueShift={210} />
      <CornerMark />
      <div style={{ position: 'absolute', top: 76, left: 0, right: 0 }}>
        <WordStagger text="أشتغل بأدواتك المفضّلة" delay={8} stagger={5} fontSize={66} fontWeight={900} />
      </div>
      {/* حلقات المدار */}
      <svg width={width} height={1080} style={{ position: 'absolute', opacity: ringGlow * 0.55 }}>
        <ellipse cx={width / 2} cy={CENTER_Y} rx={RADIUS_X} ry={RADIUS_Y} fill="none"
          stroke="rgba(150,170,255,0.35)" strokeWidth="1.5" strokeDasharray="4 10" />
        <ellipse cx={width / 2} cy={CENTER_Y} rx={455} ry={330} fill="none"
          stroke="rgba(150,170,255,0.14)" strokeWidth="1.5" />
      </svg>
      {/* المركز */}
      <div style={{ position: 'absolute', left: '50%', top: CENTER_Y, transform: 'translate(-50%,-50%)' }}>
        <LogoMark size={168} drawProgress={1} />
      </div>
      {ORBIT_BRANDS.map((_, i) => <OrbitItem key={i} i={i} />)}
      {/* شريط منساب */}
      <div dir="ltr" style={{ position: 'absolute', left: 0, right: 0, bottom: 124, height: 88, overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: rowW * 2, transform: `translateX(${offset}px)` }}>
          {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((b, i) => (
            <div key={i} style={{
              width: 212, marginRight: 20, height: 88, borderRadius: 20, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 13,
              background: COLORS.panel, border: `1px solid ${COLORS.panelBorder}`,
            }}>
              <BrandIcon icon={b.icon} size={36} />
              <span style={{ fontFamily: FONT_LATIN, fontSize: 23, fontWeight: 700, color: COLORS.text }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
