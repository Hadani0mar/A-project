import {prepareChromium} from './chromium-runtime.mjs';
import {spawnSync} from 'node:child_process';

const {executablePath, env} = await prepareChromium();
const args = [
  'remotion', 'render', 'src/remotion/index.ts', 'ArenaFilm',
  'deliverables/arena-agent-film.mp4',
  '--browser-executable', executablePath,
  '--codec=h264', '--crf=18', '--pixel-format=yuv420p', '--color-space=bt709',
  '--concurrency=2', '--gl=swiftshader', '--timeout=120000',
  '--enforce-audio-track', '--audio-bitrate=192k',
  ...process.argv.slice(2),
];
const result = spawnSync('npx', args, {stdio: 'inherit', env});
process.exit(result.status ?? 1);
