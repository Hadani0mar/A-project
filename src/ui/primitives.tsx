/**
 * مكتبة UI حركية خاصة بالمشروع — على نمط فلسفة RemotionUI / remotion-ui
 * (مكوّنات "انسخها واملكها" بأسلوب shadcn): بدائيات حركة + مكوّنات مركّبة
 * جاهزة لإعادة الاستخدام في أي فيديو ريموشن.
 * المراجع: github.com/rrh1441/remotion-ui · github.com/AMFahim/remotion-ui
 *
 * القواعد: كل الحركة من useCurrentFrame + interpolate/spring فقط
 * (لا CSS animation)، والنص العربي يُحرَّك كلماتٍ لا حروفاً مع dir="rtl".
 */
import React from 'react';
import {
  AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig,
} from 'remotion';
import { COLORS, GRADIENT_MAIN, mulberry32, clampCfg } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY, FONT_LATIN } from '../lib/fonts';

/* ------------------------------ خلفيات ------------------------------ */

/** خلفية أورورا: كتل تدرّج متوهّجة تتحرك ببطء (Parallax) + شبكة + حبيبات */
export const AuroraBackground: React.FC<{ hueShift?: number }> = ({ hueShift = 0 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const s = Math.sin(frame / 90) * 60;
  const c = Math.cos(frame / 110) * 50;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
      {/* توهجات ملونة */}
      <div style={{
        position: 'absolute', width: width * 0.75, height: width * 0.75, borderRadius: '50%',
        left: -width * 0.18 + s, top: -height * 0.42 + c, filter: 'blur(110px)',
        background: `radial-gradient(circle, ${COLORS.violet}55 0%, transparent 65%)`,
        transform: `rotate(${hueShift}deg)`,
      }} />
      <div style={{
        position: 'absolute', width: width * 0.65, height: width * 0.65, borderRadius: '50%',
        right: -width * 0.2 - c, bottom: -height * 0.5 + s, filter: 'blur(120px)',
        background: `radial-gradient(circle, ${COLORS.cyan}44 0%, transparent 65%)`,
      }} />
      <div style={{
        position: 'absolute', width: width * 0.4, height: width * 0.4, borderRadius: '50%',
        left: width * 0.42 + c * 0.6, top: height * 0.55 + s * 0.5, filter: 'blur(100px)',
        background: `radial-gradient(circle, ${COLORS.pink}30 0%, transparent 65%)`,
      }} />
      {/* شبكة منظور خفيفة */}
      <svg width={width} height={height} style={{ position: 'absolute', opacity: 0.16 }}>
        <defs>
          <pattern id="dbg-grid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path d="M72 0H0V72" fill="none" stroke="rgba(160,180,255,0.5)" strokeWidth="1" />
          </pattern>
          <radialGradient id="dbg-fade" cx="50%" cy="45%" r="75%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="70%" stopColor="#888" />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
          <mask id="dbg-mask"><rect width={width} height={height} fill="url(#dbg-fade)" /></mask>
        </defs>
        <rect width={width} height={height} fill="url(#dbg-grid)" mask="url(#dbg-mask)" />
      </svg>
      {/* غشاوة سينمائية */}
      <AbsoluteFill style={{
        background: 'radial-gradient(ellipse at center, transparent 52%, rgba(2,4,12,0.55) 100%)',
      }} />
    </AbsoluteFill>
  );
};

/** جسيمات نجمية صاعدة — حتمية بالبذرة */
export const Particles: React.FC<{ count?: number; seed?: number }> = ({ count = 46, seed = 7 }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const dots = React.useMemo(() => {
    const rnd = mulberry32(seed);
    return Array.from({ length: count }, (_, i) => ({
      x: rnd(), y: rnd(), size: 1.5 + rnd() * 3.5, speed: 0.25 + rnd() * 0.9,
      drift: (rnd() - 0.5) * 40, tw: rnd() * Math.PI * 2,
      color: [COLORS.cyan, COLORS.violet, COLORS.pink, '#FFFFFF'][i % 4],
    }));
  }, [count, seed]);
  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {dots.map((d, i) => {
        const progress = (d.y + (frame * d.speed) / durationInFrames) % 1;
        const twinkle = 0.25 + 0.75 * Math.abs(Math.sin(d.tw + frame / 18));
        return (
          <div key={i} style={{
            position: 'absolute', borderRadius: '50%', backgroundColor: d.color,
            width: d.size, height: d.size, opacity: 0.55 * twinkle,
            left: d.x * width + Math.sin(frame / 40 + i) * d.drift * 0.3,
            top: height - progress * height,
            boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

/* --------------------------- بدائيات حركة --------------------------- */

/** دخول زنبركي: صعود + تلاشي + تكبير خفيف */
export const RiseIn: React.FC<{
  delay?: number; y?: number; children: React.ReactNode; style?: React.CSSProperties;
}> = ({ delay = 0, y = 46, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 110, mass: 0.9 } });
  return (
    <div style={{
      ...style, opacity: p,
      transform: `translateY(${(1 - p) * y}px) scale(${0.94 + p * 0.06})`,
    }}>
      {children}
    </div>
  );
};

/** نص متدرّج اللون */
export const GradientText: React.FC<{
  text: string; fontSize: number; fontWeight?: number; gradient?: string; fontFamily?: string;
}> = ({ text, fontSize, fontWeight = 900, gradient = GRADIENT_MAIN, fontFamily = FONT_DISPLAY }) => (
  <span dir="rtl" style={{
    fontFamily, fontSize, fontWeight, lineHeight: 1.25,
    backgroundImage: gradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
  }}>
    {text}
  </span>
);

/**
 * تدرّج كلمات عربي آمن: كل كلمة كتلة مستقلة داخل dir="rtl"
 * (لا نفكّك الحروف أبداً حتى لا تنقطع وصلاتها).
 */
export const WordStagger: React.FC<{
  text: string; delay?: number; stagger?: number; fontSize: number;
  fontWeight?: number; color?: string; fontFamily?: string; lineHeight?: number;
}> = ({ text, delay = 0, stagger = 5, fontSize, fontWeight = 800, color = COLORS.text, fontFamily = FONT_DISPLAY, lineHeight = 1.35 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(' ');
  return (
    <div dir="rtl" style={{ fontFamily, fontSize, fontWeight, color, lineHeight, textAlign: 'center' }}>
      {words.map((w, i) => {
        const p = spring({ frame: frame - delay - i * stagger, fps, config: { damping: 14, stiffness: 140 } });
        const blur = interpolate(p, [0, 1], [10, 0], clampCfg);
        return (
          <span key={i} style={{
            display: 'inline-block', opacity: p, marginInline: fontSize * 0.14,
            transform: `translateY(${(1 - p) * 34}px) rotate(${(1 - p) * -3}deg)`,
            filter: `blur(${blur}px)`,
          }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/* --------------------------- مكوّنات مركّبة --------------------------- */

/** بطاقة زجاجية */
export const GlassCard: React.FC<{
  children: React.ReactNode; style?: React.CSSProperties; accent?: string;
}> = ({ children, style, accent }) => (
  <div style={{
    background: COLORS.panel, border: `1px solid ${COLORS.panelBorder}`,
    borderRadius: 26, backdropFilter: 'blur(14px)',
    boxShadow: `0 24px 60px rgba(0,0,0,0.38)${accent ? `, 0 0 44px ${accent}26` : ''}`,
    padding: '30px 32px', ...style,
  }}>
    {children}
  </div>
);

/** شارة صغيرة (Chip) */
export const Chip: React.FC<{ text: string; color?: string; fontSize?: number; latin?: boolean }> = (
  { text, color = COLORS.cyan, fontSize = 25, latin = false },
) => (
  <div dir={latin ? 'ltr' : 'rtl'} style={{
    display: 'inline-flex', alignItems: 'center', gap: 10,
    border: `1.5px solid ${color}66`, background: `${color}14`, color,
    borderRadius: 999, padding: '9px 22px',
    fontFamily: latin ? FONT_LATIN : FONT_BODY, fontSize, fontWeight: 700,
    letterSpacing: latin ? 2.5 : undefined,
  }}>
    <span style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: color, boxShadow: `0 0 12px ${color}` }} />
    {text}
  </div>
);

/** عدّاد أرقام متحرك (Data-Driven Motion) */
export const AnimatedCounter: React.FC<{
  to: number; delay?: number; duration?: number; suffix?: string; fontSize?: number; color?: string;
}> = ({ to, delay = 0, duration = 40, suffix = '', fontSize = 64, color = COLORS.text }) => {
  const frame = useCurrentFrame();
  const v = Math.round(interpolate(frame, [delay, delay + duration], [0, to], {
    ...clampCfg, easing: Easing.out(Easing.cubic),
  }));
  return (
    <span dir="ltr" style={{ fontFamily: FONT_LATIN, fontSize, fontWeight: 700, color }}>
      {v.toLocaleString('en-US')}{suffix}
    </span>
  );
};

/** شريط تقدّم */
export const ProgressBar: React.FC<{
  progress: number; width: number; color?: string; height?: number;
}> = ({ progress, width, color = COLORS.green, height = 12 }) => (
  <div dir="ltr" style={{
    width, height, borderRadius: 99, background: 'rgba(255,255,255,0.10)', overflow: 'hidden',
  }}>
    <div style={{
      width: width * Math.max(0, Math.min(1, progress)), height: '100%', borderRadius: 99,
      background: `linear-gradient(90deg, ${color}, ${COLORS.cyan})`,
      boxShadow: `0 0 18px ${color}88`,
    }} />
  </div>
);

/** شريط ترجمة سفلي (Lower Third) متزامن مع التعليق الصوتي */
export const CaptionBar: React.FC<{ text: string; delay: number; sceneDuration: number }> = ({ text, delay, sceneDuration }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const durationInFrames = sceneDuration;
  const inP = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 120 } });
  const out = interpolate(frame, [durationInFrames - 14, durationInFrames - 2], [1, 0], clampCfg);
  const narrow = width < 1400;
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: narrow ? 120 : 52,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
      opacity: inP * out, transform: `translateY(${(1 - inP) * 26}px)`,
    }}>
      <div dir="rtl" style={{
        maxWidth: width * (narrow ? 0.88 : 0.72), textAlign: 'center',
        background: 'rgba(4,8,18,0.62)', border: `1px solid ${COLORS.panelBorder}`,
        borderRadius: 18, padding: narrow ? '18px 26px' : '14px 30px', backdropFilter: 'blur(10px)',
        fontFamily: FONT_BODY, fontSize: narrow ? 34 : 31, fontWeight: 500,
        color: COLORS.text, lineHeight: 1.55,
      }}>
        {text}
      </div>
    </div>
  );
};

/** علامة زاوية ثابتة (Watermark) */
export const CornerMark: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 45], [0, 0.9], clampCfg);
  return (
    <div dir="ltr" style={{
      position: 'absolute', top: 34, left: 40, opacity, display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: FONT_LATIN, fontSize: 21, fontWeight: 700, letterSpacing: 3, color: COLORS.muted,
    }}>
      <span style={{
        width: 12, height: 12, borderRadius: 3, background: GRADIENT_MAIN,
        transform: 'rotate(45deg)', display: 'inline-block',
      }} />
      ARENA · AGENT MODE
    </div>
  );
};
