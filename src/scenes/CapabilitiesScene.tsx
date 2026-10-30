/**
 * المشهد 3 — شبكة القدرات (Bento Grid + Glassmorphism)
 * بطاقات زجاجية متدرّجة الدخول (Stagger) + عدّادات بيانات متحركة
 * (Data-Driven Motion Graphics).
 */
import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AuroraBackground, GlassCard, WordStagger, AnimatedCounter, RiseIn, CornerMark } from '../ui/primitives';
import { BrandIcon } from '../lib/brands';
import { siGithub } from 'simple-icons';
import { COLORS } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY } from '../lib/fonts';

/** أيقونات خطّية مرسومة يدوياً (stroke) */
const LineIcon: React.FC<{ d: string; color: string }> = ({ d, color }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const CARDS: { title: string; desc: string; tag: string; color: string; icon: string }[] = [
  { title: 'برمجة وتطوير', desc: 'مواقع وتطبيقات كاملة، شغّالة من أوّل مرة', tag: 'WEB · APPS', color: COLORS.violet, icon: 'M8 6 3 12l5 6M16 6l5 6-5 6M13.5 4l-3 16' },
  { title: 'تصميم وواجهات', desc: 'هوية بصرية وواجهات وموشن جرافيك', tag: 'UI · MOTION', color: COLORS.pink, icon: 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586' },
  { title: 'صور وفيديو وصوت', desc: 'توليد وتحرير وسائط باحتراف', tag: 'MEDIA · AI', color: COLORS.cyan, icon: 'M23 7l-7 5 7 5V7zM14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z' },
  { title: 'بيانات وتقارير', desc: 'جداول ورسوم بيانية وتحليل معمّق', tag: 'DATA · DOCS', color: COLORS.green, icon: 'M3 3v18h18M8 17V9M13 17V5M18 17v-8' },
  { title: 'بحث ومستندات', desc: 'مصادر موثّقة، تلخيص، وترجمة دقيقة', tag: 'SEARCH · PDF', color: COLORS.amber, icon: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35' },
  { title: 'نشر على GitHub', desc: 'فروع خاصة وطلبات دمج ونشر تلقائي', tag: 'GIT · CI/CD', color: '#E8ECF8', icon: '' },
];

const Card: React.FC<{ i: number }> = ({ i }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const c = CARDS[i];
  const p = spring({ frame: frame - 34 - i * 11, fps, config: { damping: 15, stiffness: 120 } });
  const floatY = Math.sin(frame / 26 + i * 1.3) * 5;
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * 70 + floatY}px) scale(${0.92 + p * 0.08})` }}>
      <GlassCard accent={c.color} style={{ width: 500, height: 218, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${c.color}1C`, border: `1.5px solid ${c.color}55`,
          }}>
            {c.icon ? <LineIcon d={c.icon} color={c.color} /> : <BrandIcon icon={siGithub} size={40} />}
          </div>
          <span dir="ltr" style={{ fontFamily: FONT_BODY, fontSize: 19, fontWeight: 700, letterSpacing: 2, color: c.color }}>{c.tag}</span>
        </div>
        <div dir="rtl" style={{ fontFamily: FONT_DISPLAY, fontSize: 37, fontWeight: 800, color: COLORS.text }}>{c.title}</div>
        <div dir="rtl" style={{ fontFamily: FONT_BODY, fontSize: 25, color: COLORS.muted, lineHeight: 1.45 }}>{c.desc}</div>
      </GlassCard>
    </div>
  );
};

export const CapabilitiesScene: React.FC = () => (
  <AbsoluteFill>
    <AuroraBackground hueShift={90} />
    <CornerMark />
    <AbsoluteFill style={{ alignItems: 'center', paddingTop: 74 }}>
      <WordStagger text="شنو نقدر نديرلك؟" delay={8} stagger={5} fontSize={68} fontWeight={900} />
      <RiseIn delay={30}>
        <div dir="rtl" style={{ fontFamily: FONT_BODY, fontSize: 30, color: COLORS.faint, marginTop: 6 }}>
          ستّ قدرات أساسية… في محادثة واحدة
        </div>
      </RiseIn>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 500px)', gap: 30, marginTop: 52, direction: 'rtl',
      }}>
        {CARDS.map((_, i) => <Card key={i} i={i} />)}
      </div>
      {/* شريط إحصائيات */}
      <div style={{ display: 'flex', gap: 84, marginTop: 58 }} dir="rtl">
        {[
          { to: 24, suffix: '/7', label: 'جاهز دائماً' },
          { to: 100, suffix: '%', label: 'داخل مستودعك' },
          { to: 1, suffix: '', label: 'محادثة واحدة تكفي' },
        ].map((s, i) => (
          <RiseIn key={s.label} delay={128 + i * 12} style={{ textAlign: 'center' }}>
            <AnimatedCounter to={s.to} suffix={s.suffix} delay={132 + i * 12} duration={44} fontSize={58}
              color={[COLORS.cyan, COLORS.violet, COLORS.pink][i]} />
            <div style={{ fontFamily: FONT_BODY, fontSize: 26, color: COLORS.muted, marginTop: 2 }}>{s.label}</div>
          </RiseIn>
        ))}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
