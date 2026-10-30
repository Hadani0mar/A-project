# البحث والاتجاه الفني — Ideas into Reality

تاريخ المراجعة: 30 أكتوبر 2026. الهدف: فيلم أصلي عن مساعد Arena، وليس تجميع قوالب جاهزة. الروابط التالية مصادر مراجعة؛ لم ننسخ فيديو أو موسيقى أو تصميماً من منشور.

## 1. ما راجعناه، وماذا طبّقنا

| المصدر | الفكرة المستخلصة | التطبيق في الفيلم |
|---|---|---|
| [Remotion Agent Skills](https://github.com/remotion-dev/skills) | حركة محسوبة من الإطار؛ مكونات مستقلة؛ تسلسل مشاهد؛ جهوزية الخطوط قبل التصدير | `useCurrentFrame`، `spring`، `interpolate`، `TransitionSeries`، وخطوط محلية مع `@remotion/fonts` |
| [Arabic text — official skill](https://github.com/remotion-dev/skills/blob/main/skills/remotion-markup/arabic-text.md) | لا تقسّم العربية إلى حروف مستقلة؛ حافظ على اتجاه الأساس | العناوين تتحرك كسطور كاملة، `dir="rtl"`، بدون letter-spacing عربي |
| [RemotionUI](https://github.com/riaz37/remotion-ui) | مكونات مصدرية قابلة للتعديل، وليست حزمة تشغيل سوداء | تثبيت فعلي عبر CLI من registry مبني محلياً: `MaskedSlideReveal`، `Typewriter`، `PathDraw`، `SpringIn` |
| [After Effects — animation basics](https://helpx.adobe.com/after-effects/using/animation-basics.html) | Keyframes وGraph Editor لتنظيم القيم والسرعة | منحنيات مخصصة للدخول والخروج، وتسريع الخروج بدل عكس الدخول حرفياً |
| [After Effects — speed control](https://helpx.adobe.com/after-effects/using/speed.html) | التسارع والتباطؤ يصنعان الإحساس بالوزن | `Easing.bezier(0.16,1,0.3,1)` وspring damping مدروس، مع مسافات حركة مختلفة |
| [Nick Babich على X](https://x.com/101babich/status/1753044188826861737) | دليل Motion Design Principles: easing، timing، surface، dimension | حركة الواجهة تشرح انتقال الطلب إلى بحث ثم كود، مع طبقات وعمق محدود |
| [UX Links على X — Micah Bowers](https://x.com/uxlinks/status/1649341940641439745) | Offset/delay، parallax، dimensionality | دخول متتابع للمصادر والبطاقات، وسرعات مختلفة للمدار والطبقات |
| [Adham Dannaway على X](https://x.com/AdhamDannaway/status/1643636379782377472) | timing، anticipation، follow-through، secondary action | الشرارة تسبق ظهور الأدوات؛ البطاقات تتبع الحركة الأساسية بتأخير بسيط |
| [Kinetic typography في After Effects](https://trydemotion.com/blog/kinetic-typography-4) | reveals على مستوى المعنى، وليس تحريك كل شيء دفعة واحدة | كلمات كاملة تحت أقنعة، تسلسل أسطر، ووقت قراءة بعد الاستقرار |
| [Best motion graphics techniques](https://www.miracamp.com/learn/motion-graphics/best-techniques-mg) | easing، masks، morphing، parallax، procedural animation | أقنعة نصية، رسم SVG، تحول مربع/دائرة، مدارات، ومخطط سرعة متحرك |
| [7 trending motion styles](https://trydemotion.com/blog/trending-motion-graphic-styles) | الأنماط قابلة للمزج: kinetic type، cel-spin/echo، parallax، fluid transitions | مزج تايبوغرافي سويسري مع مدار هندسي وطبقات مسطحة؛ بدون neon أو glassmorphism |
| [Google Fonts repository](https://github.com/google/fonts) | خطوط مفتوحة مع ترخيص واضح وتعدد أوزان | IBM Plex Sans Arabic + Space Grotesk + JetBrains Mono، مستضافة محلياً عبر Fontsource |
| [Simple Icons](https://github.com/simple-icons/simple-icons) | أيقونات شركات SVG أصلية وموحدة القياس | GitHub، React، TypeScript، Node.js، Figma، Google Fonts، X؛ ملفات محلية قابلة للتلوين |

هذه مراجعات إرشادية وليست ادعاء أن كل مؤثر في الفيلم هو تقنية After Effects حرفية. لم يُستخدم After Effects في التصدير؛ الفيلم كله React/Remotion. منشورات X مصادر مبادئ، وليست قوالب منسوخة.

## 2. خريطة الأنماط إلى المشاهد

1. **The Spark — هندسي / مداري / هوية:** شرارة أصلية، مدار أدوات، تايبوغرافي عربي كبير. ليست شعار Arena الرسمي؛ علامة فنية مصنوعة للفيلم.
2. **Understand — editorial UI explainer:** طلب مكتوب، مصادر متتابعة، وأسهم SVG؛ حركة تشرح التسلسل.
3. **Build — code-driven storytelling:** محرر كود حقيقي البنية، terminal، وأدوات التطوير. لا ادعاءات أداء أو أرقام مختلقة.
4. **Craft — Swiss kinetic typography:** مختبر حركة يجمع type masks، shape morph، layered rotation، ومنحنى easing.
5. **Deliver — product reveal:** شاشة إخراج، بطاقات ملفات، وتأكيد التسليم. مواصفات الفيلم حقيقية.
6. **What’s Next — خاتمة هادئة:** حركة تستقر، مساحة سالبة، ودعوة واضحة لبدء فكرة جديدة.

## 3. قرارات مضادة للمؤثرات العشوائية

- لوحة محدودة: فحمي `#151917`، ورقي `#EFEDE5`، برتقالي `#FF5A36`، ولمسة ليمونية `#D5EF86`.
- لا توهج نيون، لا كرات gradient عشوائية، لا glass cards، ولا glitch مستمر.
- العربية هي الراوي البصري الأساسي. الإنجليزية للتصنيف والإيقاع، وليست ترجمة حرفية مكررة لكل سطر.
- عنصر بؤري واحد في كل لقطة؛ الحركة الثانوية أخف وأبطأ.
- الانتقالات 15 إطاراً (نصف ثانية)؛ خصمنا التداخل من المدة الكلية.
- لا `Math.random()` داخل الرسم. العشوائية الوحيدة بذورها ثابتة في الصوت والنسيج.
- لا CSS animations أو مؤقتات للتحريك؛ كل قيمة مرتبطة بالإطار.

## 4. المهارات المثبتة

المصدر الرسمي عند commit `30d4553ecd46fbc5212fd0ff006ae43af522158b`:

- `remotion-best-practices`
- `remotion-create`
- `remotion-markup`
- `remotion-render`
- `remotion-studio`

المسار: `.agents/skills/`. أُضيفت كذلك مكونات RemotionUI عند commit `0aecaca2b61a167992e1205d10e4da16d8a71331`، CLI `0.9.1`. لم نثبت كل مهارة غير مرتبطة بالمهمة مثل الخرائط.

## 5. الصوت

لحن أصلي مولّد من `scripts/generate_audio.py`، بمقام D minor مع تحول نهائي إلى D major. لا عينات صوتية خارجية ولا موسيقى من تويتر أو مكتبات تجارية. 120 BPM، 48 kHz stereo، 42 ثانية. طبقات pad وpluck وbass وkick وhats، ثم whoosh وimpact على حدود الفصول. تم تطبيع الذروة إلى 0.78 مع fade نهائي.
