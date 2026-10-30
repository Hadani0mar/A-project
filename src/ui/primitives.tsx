/**
 * مكتبة واجهة V2 — ستايل فاتح غني بالألوان (مرجع المستخدم).
 * مكوّنات UI حقيقية الإحساس: نافذة متصفح، مفاتيح تبديل، شارات،
 * بطاقات ملوّنة، عناوين أقسام… فوق خلفية Aurora من RemotionUI.
 * القواعد: حركة من useCurrentFrame فقط · عربي = كلمات كاملة + dir=rtl.
 */
import React from 'react';
import {
  AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig,
} from 'remotion';
import { evolvePath } from '@remotion/paths';
import { AuroraBg } from '../remotionui/primitives/aurora-bg';
import { COLORS, GRADIENT_MAIN, SHADOW_CARD, SHADOW_POP, clampCfg, type PanelColor } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY, FONT_LATIN, FONT_MONO } from '../lib/fonts';

/* ------------------------------ الخلفية ------------------------------ */

/** خلفية فاتحة غنية: شرائط Aurora باستيل مشبعة + بقع ملوّنة + شبكة نقاط */
export const RichBackdrop: React.FC<{ seed?: number; ribbons?: boolean }> = ({
  seed = 3, ribbons = true,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const sx = Math.sin(frame / 95 + seed) * 46;
  const cx = Math.cos(frame / 115 + seed * 2) * 38;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
      {ribbons && (
        <AuroraBg
          backgroundColor="transparent"
          colors={['#F9A8C9', '#FFD166', '#A78BFA', '#6EE7B7', '#7DD3FC']}
          ribbonCount={5} amplitude={11} thickness={15} centerY={42} spread={40}
          speed={0.7} blur={17} intensity={0.95} horizonGlow={0.25} striation={0.2} seed={seed}
        />
      )}
      {/* بقع لونية ناعمة تنساب */}
      <div style={{
        position: 'absolute', width: 760, height: 760, borderRadius: '50%', filter: 'blur(90px)',
        left: -180 + sx, top: -300 + cx, background: 'radial-gradient(circle, rgba(255,183,213,.85), transparent 66%)',
      }} />
      <div style={{
        position: 'absolute', width: 820, height: 820, borderRadius: '50%', filter: 'blur(95px)',
        right: -240 - cx, bottom: -340 + sx, background: 'radial-gradient(circle, rgba(147,197,253,.85), transparent 66%)',
      }} />
      <div style={{
        position: 'absolute', width: 560, height: 560, borderRadius: '50%', filter: 'blur(85px)',
        left: width * 0.44 + cx, top: height * 0.62 + sx * 0.6, background: 'radial-gradient(circle, rgba(253,224,171,.8), transparent 66%)',
      }} />
      {/* شبكة نقاط خفيفة */}
      <svg width={width} height={height} style={{ position: 'absolute', opacity: 0.5 }}>
        <defs>
          <pattern id="rich-dots" width="46" height="46" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2.4" fill="rgba(70,95,150,0.16)" />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#rich-dots)" />
      </svg>
    </AbsoluteFill>
  );
};

/* --------------------------- بدائيات حركة --------------------------- */

export const RiseIn: React.FC<{
  delay?: number; y?: number; children: React.ReactNode; style?: React.CSSProperties;
}> = ({ delay = 0, y = 42, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 17, stiffness: 125, mass: 0.9 } });
  return (
    <div style={{ ...style, opacity: p, transform: `translateY(${(1 - p) * y}px)` }}>
      {children}
    </div>
  );
};

export const PopIn: React.FC<{
  delay?: number; from?: number; children: React.ReactNode; style?: React.CSSProperties;
}> = ({ delay = 0, from = 0.72, children, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 160, mass: 0.85 } });
  return (
    <div style={{
      ...style, opacity: Math.min(1, p * 1.6),
      transform: `scale(${from + (1 - from) * p})`,
    }}>
      {children}
    </div>
  );
};

/** تدرّج كلمات عربي آمن (كلمات كاملة، dir=rtl) */
export const WordStagger: React.FC<{
  text: string; delay?: number; stagger?: number; fontSize: number;
  fontWeight?: number; color?: string; gradient?: boolean; align?: 'center' | 'right';
  lineHeight?: number;
}> = ({
  text, delay = 0, stagger = 4, fontSize, fontWeight = 900,
  color = COLORS.ink, gradient = false, align = 'center', lineHeight = 1.3,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div dir="rtl" style={{
      fontFamily: FONT_DISPLAY, fontSize, fontWeight, lineHeight, textAlign: align,
      color: gradient ? undefined : color,
    }}>
      {text.split(' ').map((w, i) => {
        const p = spring({ frame: frame - delay - i * stagger, fps, config: { damping: 14, stiffness: 150 } });
        return (
          <span key={i} style={{
            display: 'inline-block', opacity: Math.min(1, p * 1.5),
            marginInline: fontSize * 0.13,
            transform: `translateY(${(1 - p) * 30}px) scale(${0.85 + p * 0.15}) rotate(${(1 - p) * -2.5}deg)`,
            ...(gradient ? {
              backgroundImage: GRADIENT_MAIN, WebkitBackgroundClip: 'text',
              backgroundClip: 'text', color: 'transparent',
            } : null),
          }}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** حروف لاتينية متدرّجة (للكلمات الإنجليزية فقط) */
export const LatinStagger: React.FC<{
  text: string; delay?: number; fontSize?: number; color?: string; letterSpacing?: number;
}> = ({ text, delay = 0, fontSize = 26, color = COLORS.ink2, letterSpacing = 5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div dir="ltr" style={{ fontFamily: FONT_LATIN, fontSize, fontWeight: 700, color, letterSpacing }}>
      {text.split('').map((ch, i) => {
        const p = spring({ frame: frame - delay - i * 2, fps, config: { damping: 15, stiffness: 170 } });
        return (
          <span key={i} style={{
            display: 'inline-block', opacity: Math.min(1, p * 1.6),
            transform: `translateY(${(1 - p) * 14}px)`,
          }}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        );
      })}
    </div>
  );
};

export const GradientText: React.FC<{
  text: string; fontSize: number; fontWeight?: number;
}> = ({ text, fontSize, fontWeight = 900 }) => (
  <span dir="rtl" style={{
    fontFamily: FONT_DISPLAY, fontSize, fontWeight, lineHeight: 1.3,
    backgroundImage: GRADIENT_MAIN, WebkitBackgroundClip: 'text',
    backgroundClip: 'text', color: 'transparent',
  }}>
    {text}
  </span>
);

/* --------------------------- مكوّنات واجهة --------------------------- */

/** شارة ملوّنة (خلفية tint + نص deep + نقطة accent) */
export const Chip: React.FC<{
  text: string; panel: PanelColor; fontSize?: number; latin?: boolean;
}> = ({ text, panel, fontSize = 24, latin = false }) => (
  <div dir={latin ? 'ltr' : 'rtl'} style={{
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: panel.tint, color: panel.deep, border: `1.5px solid ${panel.accent}55`,
    borderRadius: 999, padding: '8px 20px',
    fontFamily: latin ? FONT_LATIN : FONT_BODY, fontSize, fontWeight: 700,
    letterSpacing: latin ? 2 : undefined, boxShadow: SHADOW_POP(panel.accent),
  }}>
    <span style={{ width: 10, height: 10, borderRadius: 3.5, background: panel.accent, transform: 'rotate(45deg)' }} />
    {text}
  </div>
);

/** بطاقة لوحة ملوّنة (ستايل صورة المرجع) */
export const PanelCard: React.FC<{
  panel: PanelColor; children: React.ReactNode; style?: React.CSSProperties; radius?: number;
}> = ({ panel, children, style, radius = 28 }) => (
  <div style={{
    background: panel.tint, border: `1px solid ${panel.accent}40`,
    borderRadius: radius, boxShadow: SHADOW_POP(panel.accent), ...style,
  }}>
    {children}
  </div>
);

export const WhiteCard: React.FC<{
  children: React.ReactNode; style?: React.CSSProperties; radius?: number; accent?: string;
}> = ({ children, style, radius = 26, accent }) => (
  <div style={{
    background: COLORS.paper, border: `1px solid ${COLORS.line}`,
    borderRadius: radius, boxShadow: accent ? SHADOW_POP(accent) : SHADOW_CARD, ...style,
  }}>
    {children}
  </div>
);

/** نافذة متصفح بيضاء: أزرار ملونة + شريط عنوان */
export const BrowserFrame: React.FC<{
  url: string; children: React.ReactNode; style?: React.CSSProperties;
}> = ({ url, children, style }) => (
  <div style={{
    background: COLORS.paper, borderRadius: 24, overflow: 'hidden',
    border: `1px solid ${COLORS.line}`, boxShadow: '0 34px 80px rgba(23,38,84,0.20), 0 6px 18px rgba(23,38,84,0.08)',
    display: 'flex', flexDirection: 'column', ...style,
  }}>
    <div dir="ltr" style={{
      height: 54, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 9,
      padding: '0 20px', background: '#F6F8FE', borderBottom: `1px solid ${COLORS.line}`,
    }}>
      {['#FB4D6D', '#FFB020', '#0DBE86'].map((c) => (
        <span key={c} style={{ width: 15, height: 15, borderRadius: '50%', background: c }} />
      ))}
      <div style={{
        marginLeft: 18, flex: 1, maxWidth: 460, height: 34, borderRadius: 99,
        background: '#E9EFFB', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: FONT_MONO, fontSize: 17, color: COLORS.ink2,
      }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: COLORS.green }} />
        {url}
      </div>
    </div>
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>{children}</div>
  </div>
);

/** مفتاح تبديل يُفعَّل ذاتياً بعد delay */
export const ToggleSwitch: React.FC<{ delay: number; color: string; scale?: number }> = ({
  delay, color, scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 210, mass: 0.6 } });
  const w = 66 * scale, h = 38 * scale, knob = 30 * scale;
  return (
    <div dir="ltr" style={{
      width: w, height: h, borderRadius: 99, position: 'relative', flexShrink: 0,
      background: `linear-gradient(90deg, ${color} ${p * 100}%, #D6DEEE ${p * 100}%)`,
      boxShadow: p > 0.5 ? `0 6px 18px ${color}55` : 'inset 0 1px 4px rgba(23,38,84,.12)',
    }}>
      <div style={{
        position: 'absolute', top: (h - knob) / 2, left: 4 * scale + p * (w - knob - 8 * scale),
        width: knob, height: knob, borderRadius: '50%', background: '#fff',
        boxShadow: '0 3px 8px rgba(23,38,84,.25)',
      }} />
    </div>
  );
};

/** شارة حالة تتبدل نصاً ولوناً مع التفعيل */
export const StatusPill: React.FC<{ delay: number; offText: string; onText: string; color: string }> = ({
  delay, offText, onText, color,
}) => {
  const frame = useCurrentFrame();
  const on = frame >= delay + 6;
  return (
    <div dir="rtl" style={{
      display: 'inline-flex', alignItems: 'center', gap: 7, borderRadius: 999, padding: '5px 14px',
      background: on ? `${color}1F` : '#EDF1FA', color: on ? color : COLORS.ink3,
      fontFamily: FONT_BODY, fontSize: 19, fontWeight: 700,
    }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: on ? color : '#B9C4DA' }} />
      {on ? onText : offText}
    </div>
  );
};

export const ProgressBar: React.FC<{ progress: number; color?: string; height?: number }> = ({
  progress, color = COLORS.green, height = 13,
}) => (
  <div dir="ltr" style={{
    width: '100%', height, borderRadius: 99, background: '#E4EAF7', overflow: 'hidden',
  }}>
    <div style={{
      width: `${Math.max(0, Math.min(1, progress)) * 100}%`, height: '100%', borderRadius: 99,
      background: `linear-gradient(90deg, ${color}, ${COLORS.blue})`,
    }} />
  </div>
);

export const AnimatedCounter: React.FC<{
  to: number; delay?: number; duration?: number; suffix?: string; fontSize?: number; color?: string;
}> = ({ to, delay = 0, duration = 42, suffix = '', fontSize = 60, color = COLORS.ink }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [delay, delay + duration], [0, 1], clampCfg);
  const eased = 1 - Math.pow(1 - t, 3);
  return (
    <span dir="ltr" style={{ fontFamily: FONT_LATIN, fontSize, fontWeight: 700, color }}>
      {Math.round(to * eased).toLocaleString('en-US')}{suffix}
    </span>
  );
};

/** دائرة صح تُرسم بعد delay */
export const CheckBadge: React.FC<{ delay: number; color: string; size?: number }> = ({
  delay, color, size = 34,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 200, mass: 0.6 } });
  const tick = evolvePath(
    interpolate(frame, [delay + 5, delay + 15], [0, 1], clampCfg),
    'M -8 0.5 L -2.5 6 L 9 -6',
  );
  if (frame < delay - 2) return <div style={{ width: size, height: size }} />;
  return (
    <svg width={size} height={size} viewBox="-17 -17 34 34" style={{ transform: `scale(${p})`, overflow: 'visible', flexShrink: 0 }}>
      <circle r="15.5" fill={color} />
      <path d="M -8 0.5 L -2.5 6 L 9 -6" fill="none" stroke="#fff" strokeWidth="4"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={tick.strokeDasharray} strokeDashoffset={tick.strokeDashoffset} />
    </svg>
  );
};

/** عنوان قسم: شارة + عنوان كبير */
export const SectionTitle: React.FC<{
  kicker: string; panel: PanelColor; title: string; delay?: number; titleSize?: number;
  subtitle?: string;
}> = ({ kicker, panel, title, delay = 6, titleSize = 64, subtitle }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
    <PopIn delay={delay}><Chip text={kicker} panel={panel} /></PopIn>
    <WordStagger text={title} delay={delay + 8} fontSize={titleSize} />
    {subtitle && (
      <RiseIn delay={delay + 24} y={20}>
        <div dir="rtl" style={{ fontFamily: FONT_BODY, fontSize: 28, color: COLORS.ink2 }}>{subtitle}</div>
      </RiseIn>
    )}
  </div>
);

/**
 * مسرح مصغّر: يعرض مكوّن RemotionUI مصمماً لـ1920×1080 داخل بلاطة
 * (تحجيم CSS) — هكذا تُستعمل مشاهد المكتبة كاملةً كعناصر واجهة.
 */
export const ScaledStage: React.FC<{
  scale: number; children: React.ReactNode; style?: React.CSSProperties;
}> = ({ scale, children, style }) => (
  <div style={{
    width: 1920 * scale, height: 1080 * scale, position: 'relative',
    overflow: 'hidden', borderRadius: 26, flexShrink: 0, ...style,
  }}>
    <div style={{
      width: 1920, height: 1080, position: 'absolute', left: 0, top: 0,
      transform: `scale(${scale})`, transformOrigin: 'top left',
    }}>
      {children}
    </div>
  </div>
);

/** توقيع زاوية فاتح */
export const CornerMark: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [16, 40], [0, 1], clampCfg);
  return (
    <div dir="ltr" style={{
      position: 'absolute', top: 30, left: 36, opacity,
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.78)', border: `1px solid ${COLORS.line}`,
      borderRadius: 999, padding: '8px 18px', backdropFilter: 'blur(8px)',
      fontFamily: FONT_LATIN, fontSize: 19, fontWeight: 700, letterSpacing: 2.5, color: COLORS.ink2,
    }}>
      <span style={{ width: 11, height: 11, borderRadius: 3, background: GRADIENT_MAIN, transform: 'rotate(45deg)' }} />
      ARENA · AGENT MODE
    </div>
  );
};

/** شريط ترجمة سفلي أبيض متزامن مع التعليق */
export const CaptionBar: React.FC<{ text: string; delay: number; sceneDuration: number }> = ({
  text, delay, sceneDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const inP = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 130 } });
  const out = interpolate(frame, [sceneDuration - 14, sceneDuration - 2], [1, 0], clampCfg);
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 46,
      display: 'flex', justifyContent: 'center', pointerEvents: 'none',
      opacity: inP * out, transform: `translateY(${(1 - inP) * 24}px)`,
    }}>
      <div dir="rtl" style={{
        maxWidth: width * 0.72, textAlign: 'center',
        background: 'rgba(255,255,255,0.92)', border: `1px solid ${COLORS.line}`,
        borderRadius: 18, padding: '13px 30px', backdropFilter: 'blur(10px)',
        boxShadow: '0 16px 40px rgba(23,38,84,0.14)',
        fontFamily: FONT_BODY, fontSize: 30, fontWeight: 500, color: COLORS.ink, lineHeight: 1.55,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span style={{
          width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
          background: GRADIENT_MAIN, boxShadow: '0 0 0 5px rgba(124,92,255,0.15)',
        }} />
        {text}
      </div>
    </div>
  );
};
