import {Composition} from 'remotion';
import {ArenaFilm} from './ArenaFilm';
import {FILM_DURATION, FPS, WIDTH, HEIGHT, CHAPTER_TIMING} from './lib/film';
import {Spark} from './scenes/Spark';
import {Understand} from './scenes/Understand';
import {Build} from './scenes/Build';
import {Craft} from './scenes/Craft';
import {Deliver} from './scenes/Deliver';
import {Together} from './scenes/Together';

const scenes = [Spark, Understand, Build, Craft, Deliver, Together];

export const RemotionRoot = () => {
  return <>
    <Composition id="ArenaFilm" component={ArenaFilm} durationInFrames={FILM_DURATION} fps={FPS} width={WIDTH} height={HEIGHT}/>
    {CHAPTER_TIMING.map((chapter, i) => <Composition key={chapter.id} id={`Chapter-${String(i + 1).padStart(2, '0')}-${chapter.id}`} component={scenes[i]} durationInFrames={chapter.duration} fps={FPS} width={WIDTH} height={HEIGHT}/>)}
  </>;
};
