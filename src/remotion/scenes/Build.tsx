import {useCurrentFrame, interpolate} from 'remotion';
import {Arabic, BrandIcon, Check, Eyebrow, Reveal, SceneShell} from '../components/Design';
import {clamp, easeOut, useProgress} from '../components/Motion';
import {COLORS, FONT} from '../lib/film';
import {SpringIn} from '../primitives/spring-in';

const codeLines = [
  [{t: 'const ', c: '#D5EF86'}, {t: 'frame = ', c: '#EFEDE5'}, {t: 'useCurrentFrame', c: '#FF9B79'}, {t: '();', c: '#EFEDE5'}],
  [{t: '', c: ''}],
  [{t: 'const ', c: '#D5EF86'}, {t: 'progress = ', c: '#EFEDE5'}, {t: 'interpolate', c: '#FF9B79'}, {t: '(', c: '#EFEDE5'}],
  [{t: '  frame, [', c: '#EFEDE5'}, {t: '0', c: '#D5EF86'}, {t: ', ', c: '#EFEDE5'}, {t: '30', c: '#D5EF86'}, {t: '],', c: '#EFEDE5'}],
  [{t: '  [', c: '#EFEDE5'}, {t: '0', c: '#D5EF86'}, {t: ', ', c: '#EFEDE5'}, {t: '1', c: '#D5EF86'}, {t: '], {', c: '#EFEDE5'}],
  [{t: '    easing: Easing.', c: '#EFEDE5'}, {t: 'bezier', c: '#FF9B79'}, {t: '(', c: '#EFEDE5'}],
  [{t: '      ', c: '#EFEDE5'}, {t: '0.16, 1, 0.3, 1', c: '#D5EF86'}],
  [{t: '    )', c: '#EFEDE5'}],
  [{t: '  }', c: '#EFEDE5'}],
  [{t: ');', c: '#EFEDE5'}],
];

export const Build = () => {
  const frame = useCurrentFrame();
  const appear = useProgress(4, 28);
  const typedLines = Math.floor(interpolate(frame, [15, 105], [0, 10], clamp));
  const testP = useProgress(130, 18);
  return <SceneShell index="03">
    <div style={{position: 'absolute', left: 110, top: 185, width: 1000, opacity: appear, translate: `${(1 - appear) * -80}px 0`}}>
      <div style={{background: '#1D231E', border: '1px solid #414A3E', borderRadius: 20, overflow: 'hidden', boxShadow: '14px 16px 0 #0C100D'}}>
        <div style={{height: 68, borderBottom: '1px solid #394235', display: 'flex', alignItems: 'center', padding: '0 26px', gap: 10}}>
          {[COLORS.orange, '#E3BC6A', '#9EB977'].map(c => <i key={c} style={{width: 11, height: 11, borderRadius: 20, background: c}}/>)}
          <div style={{fontFamily: FONT.mono, fontSize: 19, color: '#B4BFAA', marginLeft: 22}}>src / remotion / Film.tsx</div>
          <div style={{marginLeft: 'auto', color: COLORS.lime}}><BrandIcon name="typescript" size={25}/></div>
        </div>
        <div style={{padding: '28px 30px 27px', height: 468, fontFamily: FONT.mono, fontSize: 25, lineHeight: 1.55, direction: 'ltr'}}>
          {codeLines.map((line, i) => <div key={i} style={{display: 'flex', height: 39, opacity: i <= typedLines ? 1 : 0}}>
            <span style={{width: 50, color: '#596452', fontSize: 19, paddingTop: 4}}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{whiteSpace: 'pre'}}>{line.map((token, j) => <span key={j} style={{color: token.c}}>{token.t}</span>)}{i === typedLines && frame < 118 ? <span style={{display: 'inline-block', width: 12, height: 26, background: COLORS.orange, marginLeft: 3, verticalAlign: 'middle', opacity: Math.floor(frame / 8) % 2 ? 0.25 : 1}}/> : null}</span>
          </div>)}
        </div>
        <div style={{borderTop: '1px solid #394235', background: '#121713', padding: '22px 29px', minHeight: 127, fontFamily: FONT.mono, fontSize: 21}}>
          <div style={{opacity: useProgress(105, 10)}}><span style={{color: COLORS.orange}}>❯</span> npm run check <span style={{color: '#819076', marginLeft: 20, opacity: testP}}>✓ TypeScript</span></div>
          <div style={{marginTop: 15, opacity: useProgress(146, 10)}}><span style={{color: COLORS.orange}}>❯</span> npm run render <span style={{color: COLORS.lime, marginLeft: 20, opacity: useProgress(173, 15)}}>1260 frames → film.mp4</span></div>
        </div>
      </div>
      <div style={{display: 'flex', gap: 16, marginTop: 30}}>
        {['react', 'typescript', 'nodejs', 'github'].map((name, i) => <SpringIn key={name} delayInFrames={105 + i * 8} durationInFrames={22} config="snappy" from={0.8} travel={24}>
          <div style={{display: 'flex', gap: 12, alignItems: 'center', border: '1px solid #3B4537', borderRadius: 12, padding: '14px 22px', color: COLORS.paper, background: '#20271E'}}><BrandIcon name={name} size={28}/><span style={{fontFamily: FONT.mono, fontSize: 17}}>{name === 'nodejs' ? 'Node.js' : name === 'github' ? 'GitHub' : name === 'react' ? 'React' : 'TypeScript'}</span></div>
        </SpringIn>)}
      </div>
    </div>
    <div style={{position: 'absolute', right: 112, top: 238, width: 650}}>
      <Eyebrow color={COLORS.orange} style={{textAlign: 'right', marginBottom: 32}}>THEN, MAKE IT REAL.</Eyebrow>
      <Reveal lines={['من فكرة،', 'إلى كود.', 'إلى نتيجة.']} size={105} delay={15}/>
      <div style={{opacity: useProgress(65, 24), marginTop: 36}}><Arabic style={{fontSize: 35, lineHeight: 1.8, color: '#AFB9A7'}}>نكتب. نجرّب. نصلح.<br/>ونخلّوا كل خطوة تنبني على اللي قبلها.</Arabic></div>
      <div style={{marginTop: 41, display: 'flex', justifyContent: 'flex-end', opacity: testP}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 15, color: COLORS.lime}}><Arabic style={{fontSize: 28}}>الكود في المستودع. قابل للتعديل.</Arabic><Check color={COLORS.lime} size={28}/></div>
      </div>
    </div>
  </SceneShell>;
};
