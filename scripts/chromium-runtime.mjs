// Optional Linux bootstrap for a minimal container. Normal desktop installs can
// use `npm run render:standard` and let Remotion find/download its browser.
// Nothing is extracted into Git; all runtime files live under ~/.cache.
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {homedir} from 'node:os';
import {execFileSync, spawnSync} from 'node:child_process';
import {brotliDecompressSync} from 'node:zlib';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const cache = join(homedir(), '.cache', 'arena-film-browser');
const libDir = join(cache, 'lib');

function extractTar(buffer, destination) {
  mkdirSync(destination, {recursive: true});
  for (let offset = 0; offset + 512 <= buffer.length; offset += 512) {
    const name = buffer.toString('utf8', offset, offset + 100).replace(/\0.*$/, '');
    const size = parseInt(buffer.toString('utf8', offset + 124, offset + 136).replace(/\0.*$/, '').trim(), 8) || 0;
    if (name && !name.endsWith('/') && !name.includes('..')) {
      const target = join(destination, name.replace(/^lib\//, ''));
      mkdirSync(join(target, '..'), {recursive: true});
      writeFileSync(target, buffer.subarray(offset + 512, offset + 512 + size));
    }
    offset += Math.floor((size + 511) / 512) * 512;
  }
}

export async function prepareChromium() {
  if (process.env.REMOTION_BROWSER_EXECUTABLE) {
    return {executablePath: process.env.REMOTION_BROWSER_EXECUTABLE, env: process.env};
  }
  const chromium = (await import('@sparticuz/chromium')).default;
  const executablePath = await chromium.executablePath();
  if (process.platform !== 'linux') return {executablePath, env: process.env};
  mkdirSync(libDir, {recursive: true});
  // NSS is distributed with the Chromium package itself.
  const nssArchive = join(require.resolve('@sparticuz/chromium').replace(/index\.[cm]?js$/, ''), '..', 'bin', 'al2023.tar.br');
  if (existsSync(nssArchive)) extractTar(brotliDecompressSync(readFileSync(nssArchive)), libDir);
  // NSPR is a small system dependency omitted by the Lambda-oriented package.
  // Build the official source locally instead of fetching an untrusted binary.
  if (!existsSync(join(libDir, 'libnspr4.so'))) {
    const source = join(cache, 'nspr-source');
    if (!existsSync(source)) execFileSync('git', ['clone', '--depth', '1', 'https://github.com/mozilla/nspr.git', source], {stdio: 'inherit'});
    execFileSync('sh', ['./configure', `--prefix=${join(cache, 'nspr')}`, '--enable-64bit'], {cwd: source, stdio: 'inherit'});
    execFileSync('make', ['-j2'], {cwd: source, stdio: 'inherit'});
    execFileSync('make', ['install'], {cwd: source, stdio: 'inherit'});
    for (const name of ['libnspr4.so', 'libplds4.so', 'libplc4.so']) {
      writeFileSync(join(libDir, name), readFileSync(join(cache, 'nspr', 'lib', name)));
    }
  }
  const env = {...process.env, LD_LIBRARY_PATH: [libDir, '/tmp', process.env.LD_LIBRARY_PATH].filter(Boolean).join(':')};
  const check = spawnSync(executablePath, ['--version'], {env, encoding: 'utf8'});
  if (check.status !== 0) throw new Error(`Chromium cannot start: ${check.stderr}`);
  console.log(`Browser ready: ${check.stdout.trim()}`);
  return {executablePath, env};
}
