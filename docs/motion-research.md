# 🎨 بحث الموشن جرافيك — الأساليب والأنماط والمكتبات

مرجع البحث الذي بُني عليه هذا الفيديو، جُمع من **GitHub** و**مجتمع X (تويتر)** و**After Effects** ومصادر موشن متخصصة، ثم تُرجم كل أسلوب إلى كود Remotion حقيقي في `src/`.

---

## 1) مصادر البحث

### GitHub
| المستودع | شنو خذينا منه |
|---|---|
| `remotion-dev/skills` | مهارات Remotion الرسمية (12 مهارة) — مثبّتة في `.agents/skills/` بملف `skills-lock.json` |
| `AMFahim/remotion-ui` (RemotionUI) | مكوّنات فعلية منسوخة إلى `src/remotionui/` بترخيص MIT: AuroraBg · SimulatedCursor · ConfettiBurst · StatCard · KanbanMove (مهيّأة للخطوط المحلية) |
| `rrh1441/remotion-ui` | نظام `@remotion-ui/core` (FadeIn/SlideIn/Stagger…) + مكوّنات مركّبة (TitleCard/LowerThird/StatBlock) |
| `lifeprompt-team/remotion-scenes` | 201 مشهد موشن جاهز في 16 فئة (Text/Shapes/UI/Data/Particles/Cinematic…) |
| `GTKottman/remotion-transitions` | تصنيف (Taxonomy) من 50 انتقالاً في عائلات: Cut · Blend · Wipe · Cover · Motion · Distortion · Morph · Carry · Light |
| `simple-icons/simple-icons` | +3400 أيقونة SVG رسمية للشركات والمنتجات مع ألوان العلامات (hex) |

### X / تويتر (مجتمع المصممين)
- **Kinetic Typography** و**Micro-Interactions** هي الترند الأبرز في نقاشات UI 2025/2026: نصوص تتحرك لتخطف العين وتختصر الرسالة.
- انتشار **Bento Grid** كتخطيط واجهات (بطاقات مجمّعة) — طبّقناه في مشهد القدرات.
- جدل مستمر "3D مبهر أم عملي؟" — اخترنا **Faux-3D/عمق وهمي** (تدرّج حراري + ظلال + Parallax) بدل 3D كامل: أخف وأوضح.

### After Effects (2025–2026)
- **After Effects 26.0** (يناير 2026) صار يحرّك حتى 8 محاور Variable Fonts على طبقة نص واحدة — دليل أن التايبوجرافيك الحركي صار قلب الصناعة. في Remotion نعوّضها بـ spring physics وword-stagger.
- تقنيات AE الكلاسيكية نقلناها للكود: **Trim Paths** (= `evolvePath`)، **Echo/Motion Trails**، **Range Selector stagger** (= تأخير لكل كلمة)، **Wiggle العضوي** (= sin/cos حتمي)، **Track Matte/Wipe** (= انتقالات المكتبة).

---

## 2) أنواع وأساليب الموشن جرافيك — وين استُخدم كل واحد؟

| # | الأسلوب | الوصف | عندنا في |
|---|---|---|---|
| 1 | **Kinetic Typography** | نص عملاق يتحرك ويحمل المعنى | مشهد 2 (أربع كلمات × 4 تقنيات دخول) |
| 2 | **Logo Reveal / Stinger** | كشف شعار برسم الخطوط Stroke Draw-On | مشهد 1 (الافتتاح) + مشهد 7 (ختام سريع) |
| 3 | **Motion Trails / Echo** | نسخ شبحية متراجعة وراء العنصر | كلمة "وأُبدع" + حلقات الصدى حول الشعار |
| 4 | **Rich Color Panels + Bento UI** | لوحات/بطاقات باستيل مشبعة على خلفية فاتحة | كل المشاهد، وخصوصاً مشهدي 2 و3 |
| 5 | **Data-Driven Motion** | عدّادات وأشرطة تقدّم وبطاقة إحصائية | StatCard ‏100% في مشهد 3 + عدّاد أسطر الكود والتكاملات |
| 6 | **UI/Product Animation** | محاكاة واجهات حقيقية: محادثة، داشبورد، محرّر ومعاينة منتج | مشاهد 1 و3 و4 مع مؤشّر محاكى ونقرات |
| 7 | **Integration Toggles** | مفاتيح تشغيل/إيقاف دقيقة الحركة مع عدّاد حالة | مشهد 5 (تشغيل أدوات التطوير تباعاً) |
| 8 | **Marquee / Logo Wall** | شريط شعارات منساب بلا نهاية | أسفل مشهد 5 (10 علامات) |
| 9 | **Kanban Journey** | بطاقات تُرفع وتنحني بين الأعمدة وتعيد ترتيب اللوحة | مشهد 6 (`KanbanMove` — من الفكرة للنشر باتجاه RTL) |
| 10 | **Parallax Depth** | طبقات خلفية بسرعات/مواضع مختلفة للعمق | دوائر وبقع باستيل ونقاط `RichBackdrop` |
| 11 | **Rich Aurora / Pastel Blobs** | أشرطة وبقع ملوّنة ناعمة فوق قماش فاتح | `AuroraBg` بخلفية شفافة فوق ‎#EEF3FD في `RichBackdrop` |
| 12 | **Simulated Cursor / Confetti** | مؤشّر يتحرك وينقر ثم انفجار احتفالي | زر النشر في مشهد 4 + زر CTA في مشهد 7 |
| 13 | **Lower-Third Captions** | ترجمة سفلية أنيقة متزامنة مع الصوت | كل المشاهد (`CaptionBar`) |
| 14 | **Cinematic Transitions** | Wipe · Clock-Wipe · Flip · Iris · Slide · Fade | بين المشاهد الستة (18 فريم/انتقال) |

---

## 3) مكتبات Remotion UI المستعملة/المرجعية

**رسمية (مثبّتة فعلياً، كلها 4.0.539):**
- `@remotion/transitions` — fade/slide/wipe/clockWipe/flip/iris عبر `<TransitionSeries>`
- `@remotion/paths` — `evolvePath`/`getPointAtLength` لرسم الشعار والخط الزمني
- `@remotion/shapes` · `@remotion/layout-utils` — أشكال وقياسات تخطيط
- `@remotion/fonts` — تحميل ملفات woff2 المحلية وحظر الرندر حتى تجهز (لا توجد طلبات شبكة للخطوط)

**مجتمعية (مستخدمة فعلياً):** مكوّنات RemotionUI منسوخة بنمط shadcn إلى [`src/remotionui/`](../src/remotionui/) بترخيص MIT ومكيّفة للخطوط المحلية: `AuroraBg` · `SimulatedCursor` · `ConfettiBurst` · `StatCard` · `KanbanMove`. وإلى جانبها طقم المشروع الفاتح في [`src/ui/primitives.tsx`](../src/ui/primitives.tsx): `RichBackdrop` · `PanelCard` · `WhiteCard` · `BrowserFrame` · `ToggleSwitch` · `StatusPill` · `ProgressBar` · `AnimatedCounter` · `SectionTitle` · `CaptionBar`.

---

## 4) الخطوط (Google Fonts — محلياً)

| الخط | الاستخدام | المصدر |
|---|---|---|
| **Cairo** (700/800/900) | العناوين العربية الضخمة | `@fontsource/cairo` → `public/fonts/` |
| **Tajawal** (400/500/700) | النصوص والترجمة العربية | `@fontsource/tajawal` |
| **Space Grotesk** (500/700) | الأرقام والتسميات اللاتينية | `@fontsource/space-grotesk` |
| **JetBrains Mono** (400/700) | محرّر الكود والطرفية | `@fontsource/jetbrains-mono` |

> لماذا محلياً؟ أسماء الخطوط من Google Fonts لكن الملفات نفسها محلية، فيصير الرندر حتمياً وبدون أي طلب شبكة. تُحمَّل بـ `@remotion/fonts` + `staticFile` فتتوقف الفريمات حتى تجهز الخطوط.

**قواعد العربي (من مهارة `remotion-markup/arabic-text.md` الرسمية):**
- حرّك **الكلمات** لا الحروف — الحرف العربي في صندوق مستقل ينفصل عن وصلاته ويتشوّه.
- `dir="rtl"` على الحاوية دائماً مع أي عناصر `inline-block`.
- ممنوع `letter-spacing` و`text-transform` على العربي.
- التدرّج الآمن عملياً: ~40ms بين كل عنصر كحد أعلى لبقاء النص مقروءاً.

---

## 5) مبادئ الحركة المطبّقة

- **Spring physics بدل المنحنيات الجاهزة** للدخولات (`damping 11–17`) يعطي Overshoot عضوي (Follow-Through).
- **`interpolate` + `Easing.bezier`** للمزامنات الدقيقة مع الصوت (Timing) — مدد المشاهد محسوبة من أطوال MP3 الحقيقية.
- **Arcs**: بطاقات الكانبان تنحني بين الأعمدة، والمؤشّر يسلك مسارات منحنية، وقصاصات الاحتفال بقوس جاذبية.
- **Secondary Action**: مؤشّر محاكى، مفاتيح تشغيل، شارات حالة ونبضات لونية — تفاصيل تثري دون تشتيت (Staging: عين المشاهد دائماً لعنصر واحد).
- **Exaggeration**: عناوين 205px وأرقام عملاقة. **Determinism**: `Math.random` ممنوع — بذرة `mulberry32` لكل العشوائي.

### روابط المصادر
- https://github.com/remotion-dev/skills · https://github.com/AMFahim/remotion-ui · https://github.com/rrh1441/remotion-ui
- https://github.com/lifeprompt-team/remotion-scenes · https://github.com/GTKottman/remotion-transitions · https://github.com/simple-icons/simple-icons
- https://trydemotion.com/blog/trending-motion-graphic-styles (ستايلات 2026) · https://artofstyleframe.com/blog/motion-graphics-trends-2026-sources/ (AE 26 + Variable Fonts)
