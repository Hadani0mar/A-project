import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

// Fontsource packages distribute the original Google Fonts under the SIL OFL.
// Self-hosting the exact WOFF2 files makes both preview and render network-free.
const arabicRange = 'U+0600-06FF,U+0750-077F,U+0870-089F,U+FB50-FDFF,U+FE70-FEFF,U+200C-200F';
for (const weight of [400, 500, 600, 700]) {
  for (const subset of ['arabic', 'latin']) {
    void loadFont({
      family: 'IBM Plex Sans Arabic',
      url: staticFile(`fonts/ibm-plex-sans-arabic/ibm-plex-sans-arabic-${subset}-${weight}-normal.woff2`),
      weight: String(weight),
      unicodeRange: subset === 'arabic' ? arabicRange : 'U+0000-00FF,U+2000-206F,U+2190-21FF',
      display: 'block',
    });
  }
}
void loadFont({family: 'Space Grotesk', url: staticFile('fonts/space-grotesk/space-grotesk-latin-wght-normal.woff2'), weight: '300 700', display: 'block'});
void loadFont({family: 'JetBrains Mono', url: staticFile('fonts/jetbrains-mono/jetbrains-mono-latin-wght-normal.woff2'), weight: '100 800', display: 'block'});
