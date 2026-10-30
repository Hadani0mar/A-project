<div dir="rtl">

# 🤖 أنا وكيلك الذكي — فيديو موشن جرافيك بـ Remotion

فيديو تعريفي احترافي (66 ثانية · 1080p · تعليق صوتي عربي) عن وكيل Arena الذكي،
**مصنوع بالكامل بالكود**: كل فريم مرسوم بمكوّنات React عبر [Remotion](https://www.remotion.dev) — بدون أي برنامج مونتاج.
هوية V2 فاتحة وغنية بالألوان: لوحات باستيل مشبعة (وردي/أصفر/بنفسجي/نعناعي/سماوي/خوخي) على قماش أزرق فاتح، مع مكوّنات واجهة حقيقية من RemotionUI.

</div>

![Poster](out/poster.jpg)

<div dir="rtl">

## ▶️ الفيديو

**[📽️ out/arena-agent.mp4](out/arena-agent.mp4)** — H.264 · ‏1920×1080 · ‏30fps · ‏66.2s · صوت AAC ستيريو (تعليق عربي + موسيقى مولّدة برمجياً + مؤثرات انتقال)

## 🎬 المشاهد

| # | المشهد | الأسلوب | الصورة |
|---|---|---|---|
| 1 | الهوك + واجهة الوكيل | واجهة محادثة فاتحة + خطة تنفيذ بعلامات صح + شارة PR | ![1](docs/assets/scene1.jpg) |
| 2 | أفكّر·أبحث·أكتب·أُبدع | Kinetic Typography داخل Flash Panels ملوّنة + مؤشّر تقدّم | ![2](docs/assets/scene2.jpg) |
| 3 | شنو نقدر نديرلك؟ | Dashboard/Bento من 6 بطاقات حيّة + StatCard من RemotionUI | ![3](docs/assets/scene3.jpg) |
| 4 | الكود يُكتب حيّاً | محرّر داكن للتباين + معاينة متجر فاتحة + مؤشّر نقر وقصاصات | ![4](docs/assets/scene4.jpg) |
| 5 | أشتغل بأدواتك المفضّلة | مفاتيح تكاملات Toggles + عدّاد + Marquee أيقونات SVG | ![5](docs/assets/scene5.jpg) |
| 6 | من الفكرة الأولى… حتى النشر | KanbanMove من RemotionUI — رحلة بطاقات RTL عبر 4 أعمدة | ![6](docs/assets/scene6.jpg) |
| 7 | عندك فكرة؟ جرّبني توّا | بطاقة ختام بيضاء فوق غروب ملوّن + CTA + مؤشّر وقصاصات | ![7](docs/assets/scene7.jpg) |

التفاصيل الكاملة للبحث (أساليب AE وGitHub وX + مكتبات Remotion UI): **[docs/motion-research.md](docs/motion-research.md)**

## 🚀 التشغيل

</div>

```bash
npm install
npm run studio        # معاينة تفاعلية (Remotion Studio) على http://localhost:3000
npm run render        # رندر MP4 إلى out/arena-agent.mp4 (ينزّل Chromium تلقائياً)
npm run render:sandbox # رندر بدون إنترنت: Chromium مضمّن من @sparticuz/chromium
npm run still         # صورة ثابتة (بوستر) من فريم 265
npm run serve:video   # مشغّل متصفح على http://localhost:8080 (HTTP Range)
npm run typecheck
```

<div dir="rtl">

## 🧰 التقنيات والمهارات المثبّتة

- **Remotion 4.0.539** + مهاراته الرسمية (`npx skills add remotion-dev/skills` → `.agents/skills/` × 12 مهارة + `skills-lock.json`)
- **انتقالات رسمية** `@remotion/transitions`: ‏fade · slide · wipe · clockWipe · flip · iris
- **RemotionUI حقيقية** منسوخة إلى `src/remotionui/` (AuroraBg · SimulatedCursor · ConfettiBurst · StatCard · KanbanMove — ترخيص MIT) ومهيّأة للخطوط المحلية والعمل دون إنترنت
- **طقم UI فاتح خاص** في `src/ui/primitives.tsx`: RichBackdrop · PanelCard · BrowserFrame · ToggleSwitch · StatusPill · ProgressBar · SectionTitle · CaptionBar
- **خطوط Google Fonts محلياً**: Cairo · Tajawal · Space Grotesk · JetBrains Mono (من `@fontsource/*` إلى `public/fonts/`)
- **أيقونات شركات SVG**: ‏`simple-icons` (GitHub, React, Python, TypeScript, Docker… بألوانها الرسمية)
- **الصوت**: تعليق عربي مولّد (`public/audio/scene1-7.mp3`) متزامن فريم-بفريم + موسيقى وووش مولّدة بـ `scripts/make-audio.py` (numpy)

## 📁 البنية

</div>

```
src/
  Video.tsx            # TransitionSeries + الصوت + الترجمة
  Root.tsx · index.ts  # تسجيل التركيبة ArenaAgentVideo
  scenes/              # المشاهد السبعة
  remotionui/          # مكوّنات RemotionUI (MIT) مهيّأة محلياً
  ui/                  # primitives.tsx (طقم UI فاتح) + Logo.tsx
  lib/                 # timing.ts (مدد محسوبة من الصوت) · fonts.ts · theme.ts · brands.tsx
public/
  fonts/               # woff2 محلية (عربي/لاتيني)
  audio/               # تعليق 7 مقاطع + music.mp3 + whoosh.wav
scripts/
  make-audio.py        # توليد الموسيقى والمؤثرات (numpy)
  render-sandbox.mjs   # رندر في بيئات بلا تنزيل متصفح
  serve-video.mjs      # مشغّل متصفح بسيط (منفذ 8080)
out/arena-agent.mp4    # 🎬 الفيديو النهائي
out/poster.jpg         # بوستر 1080p
docs/motion-research.md # 📚 بحث الأساليب والمكتبات والمصادر
.agents/skills/        # مهارات Remotion الرسمية المثبّتة
```

<div dir="rtl">

## 📝 ملاحظات

- مدد المشاهد في `src/lib/timing.ts` محسوبة من أطوال التعليق الحقيقية (61.6s)؛ الإجمالي بعد تداخل الانتقالات = **1986 فريم = 66.2s**.
- النص العربي يُحرَّك كلماتٍ مع `dir="rtl"` (أبداً حروفاً مفككة) وفق إرشادات مهارات Remotion الرسمية.
- الشعارات في مشهد الأدوات علامات تجارية لأصحابها؛ أيقوناتها من مشروع simple-icons.
- مكوّنات RemotionUI المستخدمة من مشروع AMFahim/remotion-ui بترخيص MIT (محفوظ في `src/remotionui/REMOTIONUI-LICENSE.txt`) مع تكييفها للخطوط المحلية حتى يعمل الرندر دون شبكة.

</div>
