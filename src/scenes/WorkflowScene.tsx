/**
 * المشهد 6 — رحلة العمل (Line-Led Path / Timeline)
 * خط يُرسم عبر الشاشة بـ evolvePath ويقود العين من عقدة لأخرى:
 * الفكرة ← التخطيط ← الكود ← التصميم ← الاختبار ← النشر.
 */
import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { evolvePath, getLength, getPointAtLength } from '@remotion/paths';
import { AuroraBackground, GlassCard, WordStagger, CornerMark, RiseIn } from '../ui/primitives';
import { COLORS, clampCfg } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../lib/fonts';

const Y = 535;
const X0 = 210, X1 = 1710;
// اتجاه عربي: الرحلة تبدأ من اليمين (الفكرة) وتنتهي يساراً (النشر)
const PATH = `M ${X1} ${Y} L ${X0} ${Y}`;
const PATH_LEN = getLength(PATH);
const CHECK = 'M -13 1 L -4 10 L 14 -9';

const STEPS = [
  { title: 'الفكرة', desc: 'قُلها بكلماتك… وبأي لهجة', color: COLORS.amber },
  { title: 'التخطيط', desc: 'خطة واضحة ومهام مرتبة', color: COLORS.blue },
  { title: 'الكود', desc: 'تنفيذ نظيف داخل مستودعك', color: COLORS.violet },
  { title: 'التصميم', desc: 'واجهة تليق بفكرتك', color: COLORS.pink },
  { title: 'الاختبار', desc: 'تشغيل فعلي ومراجعة حيّة', color: COLORS.cyan },
  { title: 'النشر', desc: 'فرعك الخاص على GitHub', color: COLORS.green },
];
const START = 34, GAP = 60;

const Node: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = STEPS[i];
  const at = START + i * GAP;
  const x = X1 - (i / (STEPS.length - 1)) * (X1 - X0);
  const above = i % 2 === 0;
  const p = spring({ frame: frame - at, fps, config: { damping: 12, stiffness: 150 } });
  const check = evolvePath(interpolate(frame, [at + 9, at + 22], [0, 1], clampCfg), CHECK);
  const stem = interpolate(frame, [at + 4, at + 16], [0, 64], clampCfg);
  if (frame < at - 2) return null;
  return (
    <>
      {/* موصّل عمودي */}
      <div style={{
        position: 'absolute', left: x - 1.5, width: 3, height: stem,
        top: above ? Y - 30 - stem : Y + 30, background: `${s.color}88`, borderRadius: 3,
      }} />
      {/* البطاقة */}
      <div style={{
        position: 'absolute', left: x, opacity: p,
        top: above ? Y - 330 : Y + 98,
        transform: `translateX(-50%) translateY(${(1 - p) * (above ? 30 : -30)}px) scale(${0.9 + p * 0.1})`,
      }}>
        <GlassCard accent={s.color} style={{ width: 262, padding: '22px 24px', textAlign: 'center' }}>
          <div dir="ltr" style={{
            fontFamily: FONT_MONO, fontSize: 20, fontWeight: 700, color: s.color, letterSpacing: 2,
          }}>
            {String(i + 1).padStart(2, '0')}
          </div>
          <div dir="rtl" style={{ fontFamily: FONT_DISPLAY, fontSize: 38, fontWeight: 800, color: COLORS.text, marginTop: 2 }}>{s.title}</div>
          <div dir="rtl" style={{ fontFamily: FONT_BODY, fontSize: 23, color: COLORS.muted, lineHeight: 1.5, marginTop: 4 }}>{s.desc}</div>
        </GlassCard>
      </div>
      {/* دائرة العقدة + علامة صح */}
      <svg width="76" height="76" viewBox="-38 -38 76 76" style={{
        position: 'absolute', left: x - 38, top: Y - 38,
        transform: `scale(${p})`, overflow: 'visible',
      }}>
        <circle r="31" fill="#0B1330" stroke={s.color} strokeWidth="4"
          style={{ filter: `drop-shadow(0 0 14px ${s.color}99)` }} />
        <path d={CHECK} fill="none" stroke={s.color} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={check.strokeDasharray} strokeDashoffset={check.strokeDashoffset} />
      </svg>
    </>
  );
};

export const WorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const progress = interpolate(frame, [START - 8, START + GAP * 5 + 30], [0, 1], {
    ...clampCfg, easing: Easing.inOut(Easing.quad),
  });
  const drawn = evolvePath(progress, PATH);
  const tip = getPointAtLength(PATH, progress * PATH_LEN);
  return (
    <AbsoluteFill>
      <AuroraBackground hueShift={280} />
      <CornerMark />
      <div style={{ position: 'absolute', top: 72, left: 0, right: 0 }}>
        <WordStagger text="من الفكرة الأولى… حتى النشر" delay={8} stagger={5} fontSize={66} fontWeight={900} />
      </div>
      {/* الخط الأساسي + الخط المرسوم */}
      <svg width={width} height={1080} style={{ position: 'absolute' }}>
        <path d={PATH} stroke="rgba(150,170,255,0.22)" strokeWidth="4" strokeLinecap="round" fill="none" />
        <defs>
          <linearGradient id="wf-grad" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={COLORS.amber} />
            <stop offset="45%" stopColor={COLORS.violet} />
            <stop offset="100%" stopColor={COLORS.green} />
          </linearGradient>
        </defs>
        <path d={PATH} stroke="url(#wf-grad)" strokeWidth="5" strokeLinecap="round" fill="none"
          strokeDasharray={drawn.strokeDasharray} strokeDashoffset={drawn.strokeDashoffset}
          style={{ filter: 'drop-shadow(0 0 10px rgba(124,92,255,0.65))' }} />
        {progress > 0 && progress < 1 && tip && (
          <circle cx={tip.x} cy={tip.y} r="10" fill="#fff"
            style={{ filter: `drop-shadow(0 0 16px ${COLORS.cyan})` }} />
        )}
      </svg>
      {STEPS.map((_, i) => <Node key={i} i={i} />)}
      {/* شارة الفرع في الختام */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 128, display: 'flex', justifyContent: 'center' }}>
        <RiseIn delay={START + GAP * 5 + 44}>
          <div dir="ltr" style={{
            display: 'flex', alignItems: 'center', gap: 14,
            background: 'rgba(52,211,153,0.10)', border: `1.5px solid ${COLORS.green}66`,
            borderRadius: 999, padding: '13px 30px',
            fontFamily: FONT_MONO, fontSize: 26, color: COLORS.green, fontWeight: 700,
          }}>
            <span style={{
              width: 12, height: 12, borderRadius: '50%', backgroundColor: COLORS.green,
              boxShadow: `0 0 14px ${COLORS.green}`, display: 'inline-block',
            }} />
            branch: arena/2cbd23d6-a-project
            <span dir="rtl" style={{ fontFamily: FONT_BODY, fontWeight: 500 }}>— كل تعديل محفوظ وتراه لحظةً بلحظة</span>
          </div>
        </RiseIn>
      </div>
    </AbsoluteFill>
  );
};
