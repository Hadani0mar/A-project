import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {ArenaMark, Arabic, BrandIcon, Cross, Eyebrow, Reveal, SceneShell} from '../components/Design';
import {clamp, easeOut, useProgress} from '../components/Motion';
import {COLORS, FONT} from '../lib/film';
import {PathDraw} from '../primitives/path-draw';

const OrbitToken = ({angle, radius, icon, delay}: {angle: number; radius: number; icon: string; delay: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame, fps, delay, config: {damping: 18, stiffness: 95, mass: 0.9}});
  const a = (angle + frame * 0.075) * Math.PI / 180;
  return <div style={{position: 'absolute', left: 350 + Math.cos(a) * radius - 48, top: 350 + Math.sin(a) * radius * 0.8 - 48, width: 96, height: 96, border: `1px solid ${COLORS.line}`, background: '#202620', borderRadius: 22, display: 'grid', placeItems: 'center', color: COLORS.paper, opacity: Math.min(1, p * 2), scale: Math.max(0, p), boxShadow: '0 15px 0 #0C0F0D'}}>
    <BrandIcon name={icon} size={45}/>
  </div>;
};

export const Spark = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entry = spring({frame, fps, delay: 5, config: {damping: 17, stiffness: 80, mass: 1.1}});
  const orbit = useProgress(8, 55);
  const pulse = 1 + Math.sin(frame / 28) * 0.018;
  return <SceneShell index="01">
    <div style={{position: 'absolute', inset: 130, backgroundImage: 'radial-gradient(#657061 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.16, maskImage: 'linear-gradient(90deg, black, transparent 78%)'}}/>
    <Cross x={92} y={154}/><Cross x={1812} y={908}/>
    <div style={{position: 'absolute', left: 115, top: 205, width: 740, height: 740, opacity: orbit}}>
      <svg width="740" height="740" viewBox="0 0 740 740" style={{position: 'absolute', inset: 0}}>
        <ellipse cx="370" cy="370" rx="321" ry="259" fill="none" stroke={COLORS.line} strokeWidth="1.5"/>
        <ellipse cx="370" cy="370" rx="240" ry="194" fill="none" stroke={COLORS.line} strokeWidth="1.5" strokeDasharray="5 10"/>
        <path d="M370 35V95M370 645V705M35 370H95M645 370H705" stroke={COLORS.muted} opacity="0.4"/>
      </svg>
      <div style={{position: 'absolute', left: 198, top: 198, width: 344, height: 344, display: 'grid', placeItems: 'center', scale: Math.max(0.001, entry) * pulse}}>
        <div style={{position: 'absolute', inset: 10, border: `1px solid ${COLORS.orange}`, borderRadius: 68, rotate: `${-12 + frame * 0.09}deg`, opacity: 0.5}}/>
        <div style={{position: 'absolute', inset: 30, background: COLORS.orange, borderRadius: 54, rotate: `${8 - frame * 0.045}deg`, boxShadow: '14px 18px 0 #722E20'}}/>
        <div style={{position: 'relative', rotate: `${frame * 0.13}deg`}}><ArenaMark size={222} color={COLORS.ink}/></div>
      </div>
      <OrbitToken angle={205} radius={302} icon="github" delay={24}/>
      <OrbitToken angle={320} radius={298} icon="react" delay={31}/>
      <OrbitToken angle={82} radius={285} icon="figma" delay={38}/>
      <div style={{position: 'absolute', left: 240, top: 668, opacity: useProgress(48, 15)}}><Eyebrow color={COLORS.orange} style={{fontSize: 19}}>ONE IDEA. MANY POSSIBILITIES.</Eyebrow></div>
    </div>
    <div style={{position: 'absolute', right: 116, top: 226, width: 860}}>
      <div style={{opacity: useProgress(4, 15), display: 'flex', justifyContent: 'flex-end', marginBottom: 28}}><Eyebrow color={COLORS.orange}>MEET YOUR ARENA ASSISTANT</Eyebrow></div>
      <Reveal lines={['موش مجرد', 'إجابة.']} size={157} delay={10} duration={26}/>
      <div style={{marginTop: 34, opacity: useProgress(36, 20), translate: `0 ${(1 - useProgress(36, 20)) * 25}px`}}>
        <Arabic style={{fontSize: 43, fontWeight: 400, lineHeight: 1.6, color: '#C0C7BE'}}>أنا مساعدك. نحوّل فكرتك لشيء حقيقي.</Arabic>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 37, opacity: useProgress(58, 18)}}>
        {['نفهم', 'نبني', 'نبدع'].map((text, i) => <div key={text} style={{border: `1px solid ${COLORS.line}`, padding: '10px 25px', borderRadius: 100, opacity: interpolate(frame, [58 + i * 5, 72 + i * 5], [0, 1], clamp)}}><Arabic style={{fontSize: 28}}>{text}</Arabic></div>)}
      </div>
    </div>
    <AbsoluteFill style={{pointerEvents: 'none', left: 914, top: 810, width: 440, height: 70, opacity: interpolate(frame, [65, 82, 130, 155], [0, 0.6, 0.6, 0], clamp)}}>
      <PathDraw d="M10 35H400M375 12L400 35L375 58" width={440} height={70} viewBox="0 0 440 70" stroke={COLORS.orange} strokeWidth={3} delayInFrames={65} durationInFrames={25} glow={false} head={false}/>
    </AbsoluteFill>
  </SceneShell>;
};
