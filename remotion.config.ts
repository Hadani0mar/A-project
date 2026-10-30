import {Config} from '@remotion/cli/config';
import path from 'node:path';

Config.overrideWebpackConfig((config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {...config.resolve?.alias, '@/remotion': path.resolve(process.cwd(), 'src/remotion')},
  },
}));

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('swiftshader');
Config.setChromiumMultiProcessOnLinux(true);
Config.setConcurrency(2);
Config.setDelayRenderTimeoutInMilliseconds(120000);
Config.setCodec('h264');
Config.setCrf(18);

Config.setPixelFormat('yuv420p');
Config.setColorSpace('bt709');
Config.setPublicDir('public');
