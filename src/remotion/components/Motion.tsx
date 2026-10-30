import {Easing, interpolate, useCurrentFrame, useVideoConfig, AbsoluteFill} from 'remotion';
import type {TransitionPresentation} from '@remotion/transitions';
import {COLORS} from '../lib/film';

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.76, 0, 0.24, 1);
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// A directional editorial wipe. The entering scene stays crisp; only the
// outgoing scene yields. An orange leading edge makes the cut feel physical.
const WipeComponent = ({children, presentationDirection, presentationProgress, passedProps}: {
  children: React.ReactNode;
  presentationDirection: 'entering' | 'exiting';
  presentationProgress: number;
  passedProps: {reverse?: boolean; accent?: string};
}) => {
  const p = interpolate(presentationProgress, [0, 1], [0, 1], {easing: easeInOut});
  const reverse = passedProps.reverse ?? false;
  const position = (reverse ? 1 - p : p) * 100;
  const clip = reverse ? `inset(0 0 0 ${100 - position}%)` : `inset(0 ${100 - position}% 0 0)`;
  return <AbsoluteFill style={{clipPath: presentationDirection === 'entering' && p < 0.999 ? clip : undefined, transform: presentationDirection === 'exiting' ? `translateX(${(reverse ? 1 : -1) * p * 90}px)` : undefined}}>
    {children}
    {presentationDirection === 'entering' && p > 0 && p < 1 ? <div style={{position: 'absolute', top: 0, bottom: 0, left: `${reverse ? 100 - position : position}%`, width: 14, background: passedProps.accent ?? COLORS.orange}}/> : null}
  </AbsoluteFill>;
};

export const editorialWipe = (props: {reverse?: boolean; accent?: string} = {}): TransitionPresentation<{reverse?: boolean; accent?: string}> => ({component: WipeComponent, props});

export const useProgress = (start: number, duration: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, start + duration], [0, 1], {...clamp, easing: easeOut});
};

export const useSceneCamera = (strength = 0.035) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [0, durationInFrames], [1, 1 + strength]);
};
