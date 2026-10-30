import {AbsoluteFill, staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {TransitionSeries, linearTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import './lib/fonts';
import {CHAPTERS, TRANSITION_FRAMES} from './lib/film';
import {editorialWipe} from './components/Motion';
import {Spark} from './scenes/Spark';
import {Understand} from './scenes/Understand';
import {Build} from './scenes/Build';
import {Craft} from './scenes/Craft';
import {Deliver} from './scenes/Deliver';
import {Together} from './scenes/Together';

const scenes = [Spark, Understand, Build, Craft, Deliver, Together];

export const ArenaFilm = () => {
  return <AbsoluteFill style={{background: '#151917'}}>
    <TransitionSeries>
      {scenes.map((Scene, i) => [
        <TransitionSeries.Sequence key={`${CHAPTERS[i].id}-scene`} name={`${String(i + 1).padStart(2, '0')} · ${CHAPTERS[i].english}`} durationInFrames={CHAPTERS[i].duration}>
          <Scene/>
        </TransitionSeries.Sequence>,
        i < scenes.length - 1 ? (i === 2 ? <TransitionSeries.Transition key={`${CHAPTERS[i].id}-transition`} presentation={slide({direction: 'from-bottom'})} timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}/> : <TransitionSeries.Transition key={`${CHAPTERS[i].id}-transition`} presentation={editorialWipe({reverse: i % 2 === 1})} timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}/>) : null,
      ])}
    </TransitionSeries>
    <Audio name="Original score · Spark / 120 BPM" src={staticFile('audio/arena-score.wav')}/>
  </AbsoluteFill>;
};
