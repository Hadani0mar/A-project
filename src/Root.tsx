import React from 'react';
import { Composition } from 'remotion';
import { ArenaAgentVideo } from './Video';
import { FPS, TOTAL_FRAMES } from './lib/timing';
import './lib/fonts'; // تحميل الخطوط المحلية (يمنع الرندر حتى تجهز)

export const RemotionRoot: React.FC = () => (
  <Composition
    id="ArenaAgentVideo"
    component={ArenaAgentVideo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
