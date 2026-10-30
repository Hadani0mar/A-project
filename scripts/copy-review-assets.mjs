import {mkdirSync, copyFileSync, existsSync} from 'node:fs';
import {resolve} from 'node:path';
mkdirSync('build-review/deliverables', {recursive: true});
for (const file of ['arena-agent-film.mp4', 'poster.jpg']) {
  const source = resolve('deliverables', file);
  if (!existsSync(source)) throw new Error(`Render/copy the deliverable first: ${source}`);
  copyFileSync(source, resolve('build-review/deliverables', file));
}
copyFileSync('deliverables/poster.jpg', 'build-review/poster.jpg');
console.log('Review build includes the final MP4 and poster.');
