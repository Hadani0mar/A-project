import {useCurrentFrame, interpolate} from 'remotion';
import {ArenaMark, Arabic, BrandIcon, Check, Eyebrow, Reveal, SceneShell} from '../components/Design';
import {clamp, useProgress} from '../components/Motion';
import {COLORS, FONT} from '../lib/film';
import {SpringIn} from '../primitives/spring-in';

const OutputCard = ({delay, top, left, rotate, icon, label, file, color}: {delay: number; top: number; left: number; rotate: number; icon: string; label: string; file: string; color: string}) => {
  return <div style={{position: 'absolute', top, left}}><SpringIn delayInFrames={delay} durationInFrames={27} config="snappy" from={0.9} travel={70}>
    <div style={{width: 655, background: '#FAF9F3', border: '1px solid #C5CBBD', borderRadius: 17, padding: '23px 26px', display: 'flex', alignItems: 'center', gap: 21, boxShadow: '8px 10px 0 #D5D9CC', rotate: `${rotate}deg`}}>
      <div style={{width: 68, height: 68, background: color, borderRadius: 15, display: 'grid', placeItems: 'center', color: color === COLORS.ink ? COLORS.paper : COLORS.ink}}><BrandIcon name={icon} size={35} color={color === COLORS.ink ? COLORS.paper : COLORS.ink}/></div>
      <div style={{flex: 1}}><div style={{fontFamily: FONT.display, fontSize: 31, fontWeight: 600}}>{label}</div><div style={{fontFamily: FONT.mono, fontSize: 16, color: '#74816A', marginTop: 6}}>{file}</div></div>
      <div style={{width: 37, height: 37, borderRadius: '50%', background: COLORS.lime, display: 'grid', placeItems: 'center'}}><Check size={25}/></div>
    </div>
  </SpringIn></div>;
};

export const Deliver = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [76, 157], [0, 100], clamp);
  return <SceneShell index="05" background={COLORS.paper} foreground={COLORS.ink}>
    <div style={{position: 'absolute', left: 116, top: 180, width: 900, height: 737}}>
      <div style={{width: 835, height: 341, background: COLORS.ink, borderRadius: 21, border: '1px solid #35412E', position: 'relative', overflow: 'hidden', opacity: useProgress(5, 24), boxShadow: '12px 13px 0 #D0D6C6'}}>
        <div style={{position: 'absolute', left: 30, top: 27}}><Eyebrow color={COLORS.muted} style={{fontSize: 16}}>FINAL OUTPUT / 16:9</Eyebrow></div>
        <div style={{position: 'absolute', left: 44, top: 86, fontFamily: FONT.display, fontSize: 69, fontWeight: 600, color: COLORS.paper, letterSpacing: -3, lineHeight: 1.03}}>Ideas.<br/><span style={{color: COLORS.orange}}>In motion.</span></div>
        <div style={{position: 'absolute', right: 81, top: 74, rotate: `${frame * 0.3}deg`}}><ArenaMark size={177}/></div>
        <div style={{position: 'absolute', left: 31, right: 31, bottom: 29, display: 'flex', alignItems: 'center', gap: 15}}>
          <div style={{width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: `12px solid ${COLORS.paper}`}}/>
          <div style={{height: 4, background: '#46513E', flex: 1}}><div style={{height: '100%', width: `${progress}%`, background: COLORS.orange}}/></div>
          <span style={{fontFamily: FONT.mono, fontSize: 14, color: COLORS.paper}}>00:42</span>
        </div>
      </div>
      <OutputCard delay={44} top={372} left={12} rotate={-1} icon="github" label="Source code" file="src/remotion/ + README.md" color={COLORS.paper}/>
      <OutputCard delay={67} top={510} left={67} rotate={1.5} icon="react" label="Interactive preview" file="npm run dev / Remotion Studio" color={COLORS.orange}/>
      <div style={{position: 'absolute', left: 753, top: 88, opacity: useProgress(134, 22), rotate: '9deg', background: COLORS.lime, border: `2px solid ${COLORS.ink}`, padding: '20px 22px', borderRadius: 8, boxShadow: '5px 6px 0 #151917'}}>
        <Eyebrow color={COLORS.ink} style={{fontSize: 18, letterSpacing: 1}}>1080p</Eyebrow><Eyebrow color={COLORS.ink} style={{fontSize: 14, letterSpacing: 0, marginTop: 8}}>30 FPS</Eyebrow>
      </div>
    </div>
    <div style={{position: 'absolute', right: 112, top: 205, width: 735}}>
      <Eyebrow color="#6A775F" style={{textAlign: 'right', marginBottom: 28}}>NOT JUST A PRETTY PREVIEW.</Eyebrow>
      <Reveal lines={['نراجع.', 'نحسّن.', 'نسلّم.']} size={104} color={COLORS.ink} delay={14}/>
      <div style={{marginTop: 31, opacity: useProgress(64, 23)}}><Arabic style={{fontSize: 36, color: '#65735B', lineHeight: 1.85 }}>فيديو جاهز للمشاركة.<br/>وسورس كود جاهز للإبداع.</Arabic></div>
      <div style={{marginTop: 38, opacity: useProgress(125, 22), display: 'flex', justifyContent: 'flex-end'}}><div style={{background: COLORS.ink, color: COLORS.paper, borderRadius: 13, padding: '19px 26px', display: 'flex', alignItems: 'center', gap: 19}}><Check color={COLORS.lime} size={28}/><span style={{fontFamily: FONT.mono, fontSize: 21}}>MP4 + SOURCE + PREVIEW</span></div></div>
    </div>
  </SceneShell>;
};
