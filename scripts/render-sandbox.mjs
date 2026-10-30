/**
 * رندر داخل بيئات معزولة (لا تنزيل متصفح من Google):
 * يستخرج Chromium المضمّن في @sparticuz/chromium (+ مكتبات NSS من
 * al2023.tar.br) ثم يستدعي Remotion CLI مع --browser-executable.
 * الاستخدام: npm run render:sandbox  (أو: node scripts/render-sandbox.mjs [extra remotion args])
 * على جهازك الشخصي لست بحاجة لهذا: npm run render يكفي.
 */
import { spawn } from 'node:child_process';
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const LIB_DIR = '/tmp/al2023/lib';

async function ensureBrowser() {
  const chromium = (await import('@sparticuz/chromium')).default;
  chromium.setGraphicsMode = false;
  const exe = await chromium.executablePath();
  if (!existsSync(path.join(LIB_DIR, 'libnss3.so'))) {
    const br = path.join(root, 'node_modules/@sparticuz/chromium/bin/al2023.tar.br');
    await pipeline(createReadStream(br), createBrotliDecompress(), createWriteStream('/tmp/al2023.tar'));
    mkdirSync('/tmp/al2023', { recursive: true });
    execSync('tar -xf /tmp/al2023.tar -C /tmp/al2023');
  }
  return exe;
}

const exe = await ensureBrowser();
console.log('Chromium:', exe);

const extra = process.argv.slice(2);
const args = extra.length
  ? extra
  : ['render', 'src/index.ts', 'ArenaAgentVideo', 'out/arena-agent.mp4'];

const child = spawn('npx', ['remotion', ...args], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    REMOTION_BROWSER: exe,
    LD_LIBRARY_PATH: `${LIB_DIR}:/tmp:${process.env.LD_LIBRARY_PATH ?? ''}`,
  },
});
child.on('exit', (code) => process.exit(code ?? 1));
