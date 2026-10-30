import {useCurrentFrame, useVideoConfig, spring, interpolate} from 'remotion';
import {ArenaMark, Arabic, Eyebrow, Reveal, SceneShell} from '../components/Design';
import {clamp, easeOut, useProgress} from '../components/Motion';
import {COLORS, FONT} from '../lib/film';

export const Together = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const mark = spring({frame, fps, delay: 9, config: {damping: 19, stiffness: 75, mass: 1.2}});
  const ring = useProgress(12, 65);
  const settle = interpolate(frame, [0, 85], [32, 0], {easing: easeOut, ...clamp});
  return <SceneShell index="06">
    <div style={{position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#758367 1px, transparent 1px)', backgroundSize: '44px 44px', opacity: 0.12, maskImage: 'radial-gradient(ellipse at 27% 50%, black, transparent 64%)'}}/>
    <div style={{position: 'absolute', left: 104, top: 188, width: 765, height: 705}}>
      {[0, 1, 2].map(i => <div key={i} style={{position: 'absolute', left: 99 - i * 37, top: 77 - i * 37, width: 540 + i * 74, height: 540 + i * 74, border: `1px solid ${i === 0 ? '#667258' : COLORS.line}`, borderRadius: '50%', opacity: ring * (0.8 - i * 0.18), scale: 0.85 + ring * 0.15}}/>)}
      <div style={{position: 'absolute', left: 194, top: 172, scale: Math.max(0.001, mark), rotate: `${settle + Math.sin(frame / 60) * 3}deg`}}><ArenaMark size={350}/></div>
      <div style={{position: 'absolute', top: 650, width: '100%', textAlign: 'center', opacity: useProgress(63, 24)}}><Eyebrow color={COLORS.muted} style={{fontSize: 19, letterSpacing: 4}}>HUMAN CURIOSITY × AGENT CAPABILITY</Eyebrow></div>
    </div>
    <div style={{position: 'absolute', right: 115, top: 234, width: 915}}>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 32, opacity: useProgress(12, 18)}}><Eyebrow color={COLORS.orange}>YOUR NEXT IDEA STARTS HERE.</Eyebrow></div>
      <Reveal lines={['فكرتك الجاية،', 'نبدأوها مع بعض.']} size={104} delay={22} duration={27}/>
      <div style={{marginTop: 38, opacity: useProgress(65, 24)}}><Arabic style={{fontSize: 36, color: '#B5C0AB', lineHeight: 1.8}}>مساعد Arena. من السؤال إلى الإنجاز.</Arabic></div>
      <div style={{marginTop: 43, display: 'flex', justifyContent: 'flex-end', opacity: useProgress(93, 24), translate: `0 ${(1 - useProgress(93, 24)) * 25}px`}}>
        <div style={{background: COLORS.orange, color: COLORS.ink, borderRadius: 12, padding: '19px 34px', display: 'flex', alignItems: 'center', gap: 35, boxShadow: '7px 8px 0 #71321F'}}><Arabic style={{fontSize: 34, fontWeight: 600}}>شن بتبني اليوم؟</Arabic><span style={{fontFamily: FONT.display, fontSize: 43, lineHeight: 1}}>↗</span></div>
      </div>
      <div style={{marginTop: 42, display: 'flex', justifyContent: 'flex-end', opacity: useProgress(117, 24)}}><span lang="en" dir="ltr" style={{fontFamily: FONT.display, fontWeight: 500, fontSize: 35, letterSpacing: -1, color: COLORS.paper}}>arena.ai <span style={{color: '#66765B', margin: '0 17px'}}>/</span> <span style={{color: COLORS.orange}}>Agent Mode</span></span></div>
    </div>
  </SceneShell>;
};
