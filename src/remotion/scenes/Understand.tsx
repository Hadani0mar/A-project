import {useCurrentFrame, interpolate} from 'remotion';
import {Arabic, BrandIcon, Check, Cross, Eyebrow, Reveal, SceneShell} from '../components/Design';
import {clamp, easeOut, useProgress} from '../components/Motion';
import {COLORS, FONT} from '../lib/film';
import {SpringIn} from '../primitives/spring-in';
import {Typewriter} from '../primitives/typewriter';
import {PathDraw} from '../primitives/path-draw';

const SourceRow = ({icon, title, detail, delay}: {icon: string; title: string; detail: string; delay: number}) => {
  const frame = useCurrentFrame();
  return <SpringIn delayInFrames={delay} durationInFrames={22} config="snappy" from={0.94} travel={32} block>
    <div style={{display: 'flex', alignItems: 'center', gap: 21, padding: '19px 25px', borderBottom: '1px solid #D4D5CC'}}>
      <div style={{width: 49, height: 49, display: 'grid', placeItems: 'center', color: COLORS.ink}}><BrandIcon name={icon} size={37} color={COLORS.ink}/></div>
      <div style={{flex: 1}}><div style={{fontFamily: FONT.display, fontWeight: 600, fontSize: 28}}>{title}</div><div style={{fontFamily: FONT.mono, fontSize: 16, color: '#6E756C', marginTop: 4}}>{detail}</div></div>
      <div style={{width: 32, height: 32, borderRadius: '50%', background: COLORS.lime, display: 'grid', placeItems: 'center', opacity: interpolate(frame, [delay + 24, delay + 32], [0, 1], clamp)}}><Check size={21}/></div>
    </div>
  </SpringIn>;
};

export const Understand = () => {
  const frame = useCurrentFrame();
  const p = useProgress(8, 38);
  return <SceneShell index="02" background={COLORS.paper} foreground={COLORS.ink}>
    <Cross x={92} y={154} color={COLORS.ink}/><Cross x={1812} y={908} color={COLORS.ink}/>
    <div style={{position: 'absolute', left: 114, top: 194, width: 830, transform: `translateY(${(1 - p) * 70}px)`, opacity: p}}>
      <div style={{border: '2px solid #1D241E', borderRadius: 22, background: '#F9F8F2', boxShadow: '12px 14px 0 #D8D9CF', overflow: 'hidden', rotate: `${interpolate(frame, [0, 70, 210], [-2, 0, 0], clamp)}deg`}}>
        <div style={{padding: '20px 27px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: COLORS.ink, color: COLORS.paper}}>
          <Eyebrow style={{fontSize: 18, color: COLORS.paper}}>01 / LISTEN</Eyebrow><div style={{display: 'flex', gap: 7}}>{[0, 1, 2].map(i => <i key={i} style={{width: 8, height: 8, borderRadius: 8, background: i === 0 ? COLORS.orange : '#596057'}}/>)}</div>
        </div>
        <div style={{padding: '25px 31px 29px', minHeight: 133}}>
          <Arabic style={{fontSize: 38, fontWeight: 500, lineHeight: 1.65}}>
            <Typewriter text="اصنع فيديو يعرّف عنك… بطريقة مختلفة." charFrames={1.1} delayInFrames={12} fontFamily={FONT.ar} fontSize={38} color={COLORS.ink} cursorColor={COLORS.orange} cursorStyle="bar" reserveSpace/>
          </Arabic>
        </div>
      </div>
      <div style={{height: 64, width: 830, position: 'relative'}}>
        <PathDraw d="M415 4V58M405 47L415 58L425 47" width={830} height={64} viewBox="0 0 830 64" stroke={COLORS.ink} strokeWidth={2} delayInFrames={50} durationInFrames={16} head={false} glow={false}/>
      </div>
      <div style={{border: '1px solid #BFC5B9', borderRadius: 20, background: '#E7E9DF', overflow: 'hidden'}}>
        <div style={{padding: '18px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #C9CEC1'}}><Eyebrow color={COLORS.ink} style={{fontSize: 18}}>02 / RESEARCH</Eyebrow><Arabic style={{fontSize: 23, color: '#67705F'}}>مصادر، مش تخمين</Arabic></div>
        <SourceRow icon="github" title="GitHub + Remotion" detail="PATTERNS / COMPONENTS / SKILLS" delay={63}/>
        <SourceRow icon="x" title="X / motion design" detail="RHYTHM / HIERARCHY / TIMING" delay={75}/>
        <SourceRow icon="googlefonts" title="Google Fonts + SVG" detail="TYPE / VECTOR / IDENTITY" delay={87}/>
      </div>
    </div>
    <div style={{position: 'absolute', right: 116, top: 220, width: 730}}>
      <Eyebrow color="#6D7667" style={{textAlign: 'right', marginBottom: 28}}>FIRST, UNDERSTAND.</Eyebrow>
      <Reveal lines={['نفهم طلبك.', 'نبحث بفضول.', 'نرتّب الفكرة.']} size={91} color={COLORS.ink} delay={14} duration={24}/>
      <div style={{marginTop: 37, opacity: useProgress(66, 22)}}><Arabic style={{fontSize: 35, color: '#697162', lineHeight: 1.8}}>كل مشروع يبدأ بسؤال.<br/>وكل إجابة تبدأ بفهم.</Arabic></div>
      <div style={{marginTop: 38, opacity: useProgress(118, 20), translate: `0 ${(1 - useProgress(118, 20)) * 30}px`}}>
        <div style={{display: 'inline-flex', alignItems: 'center', gap: 18, background: COLORS.ink, color: COLORS.paper, padding: '18px 27px', borderRadius: 13}}>
          <Check color={COLORS.lime} size={29}/><Arabic style={{fontSize: 30}}>خطة واضحة للخطوة الجاية</Arabic>
        </div>
      </div>
    </div>
  </SceneShell>;
};
