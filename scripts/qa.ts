import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition, openBrowser} from '@remotion/renderer';
import {prepareChromium} from './chromium-runtime.mjs';
import {mkdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {CHAPTER_TIMING, FILM_DURATION} from '../src/remotion/lib/film';

const {executablePath, env} = await prepareChromium();
process.env.LD_LIBRARY_PATH = env.LD_LIBRARY_PATH;
const serveUrl = await bundle({entryPoint: path.resolve('src/remotion/index.ts'), publicDir: path.resolve('public'), webpackOverride: (config) => ({...config, resolve: {...config.resolve, alias: {...config.resolve?.alias, '@/remotion': path.resolve('src/remotion')}}})});
const browser = await openBrowser('chrome', {browserExecutable: executablePath, chromiumOptions: {gl: 'swiftshader', enableMultiProcessOnLinux: true}});
mkdirSync('qa', {recursive: true});
const frames = [0, 40, 125, 172, 285, 367, 500, 592, 730, 817, 950, 1012, 1155, 1259];
const errors: string[] = [];
try {
  const composition = await selectComposition({serveUrl, id: 'ArenaFilm', puppeteerInstance: browser, inputProps: {}});
  if (composition.durationInFrames !== FILM_DURATION) throw new Error('Wrong composition duration');
  for (const frame of frames) {
    const output = path.resolve(`qa/frame-${String(frame).padStart(4, '0')}.png`);
    await renderStill({serveUrl, composition, puppeteerInstance: browser, frame, output, imageFormat: 'png', timeoutInMilliseconds: 120000, logLevel: 'warn'});
    console.log(`QA still ${frame}: ${output}`);
  }
  writeFileSync('qa/report.json', JSON.stringify({duration: composition.durationInFrames, width: composition.width, height: composition.height, fps: composition.fps, frames, chapters: CHAPTER_TIMING, errors}, null, 2));
} finally {
  await browser.close({silent: true});
}
