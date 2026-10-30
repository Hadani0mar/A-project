import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
// في بيئات بدون تنزيل متصفح (مثل صندوقنا) مرّر:
// REMOTION_BROWSER=/path/to/chromium npm run render
if (process.env.REMOTION_BROWSER) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
}
Config.setChromiumOpenGlRenderer('swiftshader');
