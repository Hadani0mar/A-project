import {useCurrentFrame, interpolate} from 'remotion';
import {getPointAtLength, getLength} from '@remotion/paths';
import {Arabic, Eyebrow, Reveal, SceneShell} from '../components/Design';
import {clamp, easeOut, useProgress} from '../components/Motion';
import {COLORS, FONT} from '../lib/film';
import {PathDraw} from '../primitives/path-draw';
import {SpringIn} from '../primitives/spring-in';

const curve = 'M30 200C68 200 76 30 290 30';
const curveLength = getLength(curve);

const CraftBoard = () => {
  const frame = useCurrentFrame();
  const p = useProgress(6, 32);
  const cycle = (frame % 105) / 105;
  const point = getPointAtLength(curve, curveLength * cycle) ?? {x: 30, y: 200};
  return <div style={{position: 'absolute', left: 112, top: 185, width: 875, height: 714, opacity: p, translate: `0 ${(1 - p) * 60}px`}}>
    <div style={{position: 'absolute', inset: 0, background: COLORS.ink, borderRadius: 23, boxShadow: '13px 15px 0 #B83D24', overflow: 'hidden'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', padding: '24px 29px', borderBottom: '1px solid #3A4236'}}><Eyebrow style={{fontSize: 17, color: COLORS.paper}}>THE MOTION LAB</Eyebrow><Eyebrow style={{fontSize: 17, color: COLORS.orange}}>30 FPS / FRAME PERFECT</Eyebrow></div>
      <div style={{position: 'absolute', left: 30, top: 96, width: 475, height: 326, borderRight: '1px solid #3A4236'}}>
        <div style={{fontFamily: FONT.display, fontSize: 172, fontWeight: 600, letterSpacing: -12, lineHeight: 1.05, color: COLORS.paper, overflow: 'hidden', height: 186}}>
          <div style={{translate: `0 ${(1 - useProgress(15, 25)) * 180}px`}}>Aa<span style={{color: COLORS.orange}}>.</span></div>
        </div>
        <div style={{fontFamily: FONT.ar, fontSize: 105, fontWeight: 600, color: COLORS.orange, direction: 'rtl', width: 410, lineHeight: 1.2, overflow: 'hidden'}}>
          <div style={{translate: `0 ${(1 - useProgress(30, 25)) * 140}px`}}>أبجد</div>
        </div>
        <Eyebrow style={{fontSize: 16, marginTop: 10, color: '#A3AF99'}}>KINETIC TYPOGRAPHY</Eyebrow>
      </div>
      <div style={{position: 'absolute', left: 542, top: 113, width: 270, height: 270, perspective: 900}}>
        {[0, 1, 2, 3].map(i => <div key={i} style={{position: 'absolute', left: 44, top: 44 + i * 13, width: 172, height: 172, border: `3px solid ${i === 3 ? COLORS.orange : '#77876B'}`, background: i === 3 ? COLORS.orange : 'transparent', borderRadius: interpolate(frame, [42, 95, 150, 205], [4, 85, 4, 85], clamp), transform: `rotateX(56deg) rotateZ(${frame * 0.45 + i * 10}deg)`, transformStyle: 'preserve-3d', opacity: 0.45 + i * 0.18}}/>)}
      </div>
      <div style={{position: 'absolute', left: 31, top: 452, width: 375, height: 232}}>
        <svg width={345} height={230} viewBox="0 0 345 230">
          <path d="M30 30V200H305M30 115H305M167 30V200" stroke="#3B4734" strokeWidth={1} strokeDasharray="4 6"/>
          <path d={curve} fill="none" stroke="#526047" strokeWidth={4}/>
          <circle cx={point.x} cy={point.y} r={9} fill={COLORS.orange}/>
          <circle cx="30" cy="200" r="5" fill={COLORS.paper}/><circle cx="290" cy="30" r="5" fill={COLORS.paper}/>
        </svg>
        <div style={{position: 'absolute', inset: 0, opacity: useProgress(58, 30)}}><PathDraw d={curve} width={345} height={230} viewBox="0 0 345 230" stroke={COLORS.lime} strokeWidth={4} durationInFrames={40} delayInFrames={58} head={false} glow={false}/></div>
        <Eyebrow style={{fontSize: 14, position: 'absolute', left: 29, bottom: 0, color: '#A3AF99'}}>EASE WITH INTENT</Eyebrow>
      </div>
      <div style={{position: 'absolute', left: 459, top: 465, width: 350}}>
        {[
          ['01', 'MASK + REVEAL'],
          ['02', 'SPRING + FOLLOW'],
          ['03', 'PATH + MORPH'],
        ].map(([n, label], i) => <div key={n} style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 23, opacity: useProgress(75 + i * 12, 18)}}><span style={{fontFamily: FONT.mono, fontSize: 17, color: COLORS.orange}}>{n}</span><span style={{fontFamily: FONT.mono, fontSize: 18, color: COLORS.paper}}>{label}</span></div>)}
      </div>
    </div>
  </div>;
};

export const Craft = () => {
  return <SceneShell index="04" background={COLORS.orange} foreground={COLORS.ink}>
    <CraftBoard/>
    <div style={{position: 'absolute', right: 112, top: 222, width: 760}}>
      <Eyebrow color={COLORS.ink} style={{textAlign: 'right', marginBottom: 31, opacity: 0.7}}>DETAILS MAKE THE DIFFERENCE.</Eyebrow>
      <Reveal lines={['الحركة،', 'ليها معنى.']} size={129} color={COLORS.ink} delay={13}/>
      <div style={{marginTop: 40, opacity: useProgress(58, 24)}}><Arabic style={{fontSize: 37, fontWeight: 500, lineHeight: 1.85}}>نصوص تتحرّك. أشكال تنبض.<br/>وتفاصيل تخلي الفكرة توصل.</Arabic></div>
      <div style={{marginTop: 37, display: 'flex', justifyContent: 'flex-end', gap: 11}}>
        {['After Effects thinking', 'Remotion precision'].map((label, i) => <SpringIn key={label} delayInFrames={98 + i * 10} durationInFrames={23} from={0.94} travel={20}><div style={{border: '1.5px solid #71311F', padding: '14px 18px', borderRadius: 9, fontFamily: FONT.mono, fontSize: 16}}>{label}</div></SpringIn>)}
      </div>
      <div style={{marginTop: 35, opacity: useProgress(139, 22)}}><Arabic style={{fontSize: 28, color: '#71311F'}}>إيقاع مدروس. تباين واضح. قراءة مريحة.</Arabic></div>
    </div>
  </SceneShell>;
};
