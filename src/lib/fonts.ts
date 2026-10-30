/**
 * خطوط Google Fonts محمّلة محلياً (Cairo + Tajawal للعربية، Space Grotesk
 * للأرقام/اللاتيني، JetBrains Mono للكود) — عبر @remotion/fonts + staticFile
 * حتى يشتغل الرندر بدون إنترنت وبنتيجة حتمية 100%.
 * ملفات woff2 مصدرها حزم @fontsource/* على npm، ومنسوخة في public/fonts/.
 * بديل أونلاين مكافئ: @remotion/google-fonts/Cairo إلخ (مثبّت أيضاً).
 *
 * حيلة المجموعتين (Arabic/Latin): Fontsource يقسّم الخط لملفات subsets،
 * فنعرّف عائلة لكل مجموعة ونستخدمهما كسلسلة font-family — المتصفح يختار
 * الغليف المناسب لكل حرف تلقائياً.
 */
import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

const load = (family: string, file: string, weight: string) =>
  loadFont({ family, url: staticFile(`fonts/${file}`), weight });

export const fontsReady = Promise.all([
  // Cairo — العناوين العربية الضخمة
  load('Cairo', 'cairo-arabic-700.woff2', '700'),
  load('Cairo', 'cairo-arabic-800.woff2', '800'),
  load('Cairo', 'cairo-arabic-900.woff2', '900'),
  load('CairoLatin', 'cairo-latin-700.woff2', '700'),
  load('CairoLatin', 'cairo-latin-800.woff2', '800'),
  load('CairoLatin', 'cairo-latin-900.woff2', '900'),
  // Tajawal — النصوص العربية
  load('Tajawal', 'tajawal-arabic-400.woff2', '400'),
  load('Tajawal', 'tajawal-arabic-500.woff2', '500'),
  load('Tajawal', 'tajawal-arabic-700.woff2', '700'),
  load('TajawalLatin', 'tajawal-latin-400.woff2', '400'),
  load('TajawalLatin', 'tajawal-latin-500.woff2', '500'),
  load('TajawalLatin', 'tajawal-latin-700.woff2', '700'),
  // Space Grotesk — أرقام وعناوين لاتينية
  load('SpaceGrotesk', 'space-grotesk-500.woff2', '500'),
  load('SpaceGrotesk', 'space-grotesk-700.woff2', '700'),
  // JetBrains Mono — محرّر الكود والطرفية
  load('JetBrainsMono', 'jetbrains-mono-400.woff2', '400'),
  load('JetBrainsMono', 'jetbrains-mono-700.woff2', '700'),
]);

/** سلاسل font-family جاهزة للاستخدام */
export const FONT_DISPLAY = `'Cairo','CairoLatin','Tajawal',sans-serif`;
export const FONT_BODY = `'Tajawal','TajawalLatin',sans-serif`;
export const FONT_LATIN = `'SpaceGrotesk','CairoLatin',sans-serif`;
export const FONT_MONO = `'JetBrainsMono',monospace`;
