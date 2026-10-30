import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONT} from '../lib/film';
import {brandPaths} from '../lib/brand-icons';
import {MaskedSlideReveal} from '../primitives/masked-slide-reveal';

export const Arabic = ({children, style, lang = 'ar'}: {children: ReactNode; style?: CSSProperties; lang?: string}) => (
  <div dir="rtl" lang={lang} style={{fontFamily: FONT.ar, letterSpacing: 0, textTransform: 'none', ...style}}>{children}</div>
);

export const Reveal = ({lines, delay = 0, size = 104, color = COLORS.paper, align = 'right', duration = 22, style}: {
  lines: string[]; delay?: number; size?: number; color?: string; align?: 'right' | 'left' | 'center'; duration?: number; style?: CSSProperties;
}) => (
  <MaskedSlideReveal lines={lines} delayInFrames={delay} fontSize={size} fontWeight={600} fontFamily={FONT.ar} color={color} textAlign={align} durationInFrames={duration} lineGap={0.03} style={{direction: 'rtl', letterSpacing: 0, ...style}} />
);

export const Eyebrow = ({children, color = COLORS.muted, style}: {children: ReactNode; color?: string; style?: CSSProperties}) => (
  <div style={{fontFamily: FONT.mono, fontSize: 23, fontWeight: 500, letterSpacing: 3, color, textTransform: 'uppercase', ...style}}>{children}</div>
);

export const BrandIcon = ({name, size = 52, color = COLORS.paper}: {name: string; size?: number; color?: string}) => {
  const slug = name === 'nodejs' ? 'nodedotjs' : name;
  return <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={name} style={{flexShrink: 0}}><path d={brandPaths[slug]} fill={color}/></svg>;
};

export const ArenaMark = ({size = 70, color = COLORS.orange}: {size?: number; color?: string}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-label="Arena film spark">
    <path d="M50 3L59 34L83 17L66 41L97 50L66 59L83 83L59 66L50 97L41 66L17 83L34 59L3 50L34 41L17 17L41 34Z" fill={color}/>
    <circle cx="50" cy="50" r="9" fill={COLORS.ink}/>
  </svg>
);

export const Wordmark = ({color = COLORS.paper, size = 38}: {color?: string; size?: number}) => (
  <div lang="en" dir="ltr" style={{display: 'flex', alignItems: 'center', gap: 14, color, fontFamily: FONT.display, fontSize: size, fontWeight: 600, letterSpacing: -1.5}}>
    <ArenaMark size={size * 1.05} color={color === COLORS.ink ? COLORS.ink : COLORS.orange}/>
    <span>arena<span style={{opacity: 0.5}}>.ai</span></span>
  </div>
);

export const SceneShell = ({children, index, background = COLORS.ink, foreground = COLORS.paper, style}: {
  children: ReactNode; index: string; background?: string; foreground?: string; style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{background, color: foreground, overflow: 'hidden', ...style}}>
      <div style={{position: 'absolute', inset: 0, opacity: background === COLORS.paper ? 0.07 : 0.055, backgroundImage: `url(${staticFile('textures/grain.png')})`, backgroundRepeat: 'repeat', pointerEvents: 'none'}}/>
      <div style={{position: 'absolute', left: 100, right: 100, top: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Wordmark color={foreground} size={31}/>
        <Eyebrow color={foreground} style={{opacity: 0.6, fontSize: 20}}>{index} / AGENT MODE</Eyebrow>
      </div>
      {children}
      <div style={{position: 'absolute', left: 100, right: 100, bottom: 49, display: 'flex', alignItems: 'center', gap: 24}}>
        <Eyebrow color={foreground} style={{fontSize: 16, opacity: 0.55, letterSpacing: 2}}>IDEAS INTO REALITY</Eyebrow>
        <div style={{height: 2, flex: 1, background: foreground, opacity: 0.15}}/>
        <div style={{width: 100, height: 3, background: foreground, opacity: 0.2, overflow: 'hidden'}}>
          <div style={{height: '100%', width: `${interpolate(frame, [0, durationInFrames], [0, 100])}%`, background: foreground}}/>
        </div>
        <Eyebrow color={foreground} style={{fontSize: 16, opacity: 0.55}}>{index} / 06</Eyebrow>
      </div>
    </AbsoluteFill>
  );
};

export const Cross = ({x, y, color = COLORS.muted, size = 14}: {x: number; y: number; color?: string; size?: number}) => (
  <svg width={size} height={size} viewBox="0 0 20 20" style={{position: 'absolute', left: x, top: y, opacity: 0.5}}><path d="M10 0V20M0 10H20" stroke={color} strokeWidth={1.5}/></svg>
);

export const Check = ({size = 24, color = COLORS.ink}: {size?: number; color?: string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 12L10 17L20 6" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round"/></svg>
);
