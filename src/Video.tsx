/**
 * التركيبة الرئيسية — TransitionSeries بستّة انتقالات مختلفة
 * (من مكتبة @remotion/transitions الرسمية)، تعليق صوتي عربي لكل مشهد،
 * ترجمة سفلية متزامنة، موسيقى مولّدة برمجياً، ومؤثر Whoosh عند كل قطع.
 */
import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { clockWipe } from '@remotion/transitions/clock-wipe';
import { flip } from '@remotion/transitions/flip';
import { iris } from '@remotion/transitions/iris';
import { HookScene } from './scenes/HookScene';
import { KineticScene } from './scenes/KineticScene';
import { CapabilitiesScene } from './scenes/CapabilitiesScene';
import { CodeScene } from './scenes/CodeScene';
import { BrandsScene } from './scenes/BrandsScene';
import { WorkflowScene } from './scenes/WorkflowScene';
import { OutroScene } from './scenes/OutroScene';
import { CaptionBar } from './ui/primitives';
import {
  AUDIO_FILES, CAPTIONS, CUT_FRAMES, SCENE_FRAMES, TOTAL_FRAMES,
  TRANSITION_FRAMES, VOICE_DELAY, VOICE_DELAY_FIRST,
} from './lib/timing';

const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

export const ArenaAgentVideo: React.FC = () => {
  const { width, height } = useVideoConfig();
  const scenes: React.ReactNode[] = [
    <HookScene />,
    <KineticScene />,
    <CapabilitiesScene />,
    <CodeScene />,
    <BrandsScene />,
    <WorkflowScene />,
    <OutroScene />,
  ];
  const transitions = [
    fade(),
    slide({ direction: 'from-right' }),
    wipe({ direction: 'from-left' }),
    clockWipe({ width, height }),
    flip({ direction: 'from-right' }),
    iris({ width, height }),
  ];

  // بناء أطفال TransitionSeries مباشرة (بدون Fragments — شرط من المكتبة)
  const children: React.ReactNode[] = [];
  scenes.forEach((scene, i) => {
    const delay = i === 0 ? VOICE_DELAY_FIRST : VOICE_DELAY;
    children.push(
      <TransitionSeries.Sequence
        key={`seq-${i}`}
        name={`Scene ${i + 1}`}
        durationInFrames={SCENE_FRAMES[i]}
      >
        {scene}
        <Sequence from={delay} name={`Voiceover ${i + 1}`}>
          <Audio src={staticFile(AUDIO_FILES[i])} volume={1} />
        </Sequence>
        <CaptionBar text={CAPTIONS[i]} delay={delay} sceneDuration={SCENE_FRAMES[i]} />
      </TransitionSeries.Sequence>,
    );
    if (i < transitions.length) {
      children.push(
        <TransitionSeries.Transition
          key={`tr-${i}`}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- انتقالات غير متجانسة الأنواع
          presentation={transitions[i] as any}
          timing={timing}
        />,
      );
    }
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#070B16' }}>
      {/* موسيقى خلفية (مولّدة بـ scripts/make-audio.py) تحت التعليق */}
      <Audio
        src={staticFile('audio/music.mp3')}
        volume={(f) => {
          const fadeIn = Math.min(1, f / 40);
          const fadeOut = Math.min(1, Math.max(0, (TOTAL_FRAMES - f) / 80));
          return 0.16 * fadeIn * fadeOut;
        }}
      />
      {/* مؤثر انتقال عند كل قطع */}
      {CUT_FRAMES.map((cut, i) => (
        <Sequence key={i} from={Math.max(0, cut - 9)} durationInFrames={22} name={`whoosh-${i + 1}`}>
          <Audio src={staticFile('audio/whoosh.wav')} volume={0.4} />
        </Sequence>
      ))}
      <TransitionSeries>{children}</TransitionSeries>
    </AbsoluteFill>
  );
};
