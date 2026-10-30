# 🎨 بحث الموشن جرافيك — الأساليب والأنماط والمكتبات

مرجع البحث الذي بُني عليه هذا الفيديو، جُمع من **GitHub** و**مجتمع X (تويتر)** و**After Effects** ومصادر موشن متخصصة، ثم تُرجم كل أسلوب إلى كود Remotion حقيقي في `src/`.

---

## 1) مصادر البحث

### GitHub
| المستودع | شنو خذينا منه |
|---|---|
| `remotion-dev/skills` | مهارات Remotion الرسمية (12 مهارة) — مثبّتة في `.agents/skills/` بملف `skills-lock.json` |
| `AMFahim/remotion-ui` (RemotionUI) | فلسفة "مكوّنات انسخها واملكها" بأسلوب shadcn — ~206 مكوّناً (Scenes/Primitives/Data/Transitions) |
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
| 4 | **Glassmorphism + Bento UI** | بطاقات زجاجية ضبابية في شبكة | مشهد 3 (6 بطاقات قدرات) |
| 5 | **Data-Driven Motion** | عدّادات وأشرطة تقدّم متحركة | إحصائيات مشهد 3 + عدّاد أسطر الكود |
| 6 | **UI/Product Animation** | محاكاة واجهة حقيقية (محرّر كود + طرفية) | مشهد 4 (كتابة حية Typewriter) |
| 7 | **Cel-Spin / Orbit** | عناصر تدور في مدار مع تثبيت الاتجاه | مشهد 5 (8 أيقونات أدوات حول الشعار) |
| 8 | **Marquee / Logo Wall** | شريط شعارات منساب بلا نهاية | أسفل مشهد 5 (10 علامات) |
| 9 | **Line-Led Timeline** | خط يقود العين ويفعّل العقد تباعاً | مشهد 6 (من الفكرة للنشر — اتجاه RTL) |
| 10 | **Parallax Depth** | طبقات خلفية بسرعات مختلفة للعمق | النص الشبحي مشهد 2 + توهجات Aurora |
| 11 | **Gradient Glow / Aurora** | توهجات ملوّنة ضبابية ناعمة | خلفية كل المشاهد (`AuroraBackground`) |
| 12 | **Particle Field / Confetti** | جسيمات جوّية + انفجار احتفالي | خلفيات 1/7 + لحظة زر CTA |
| 13 | **Lower-Third Captions** | ترجمة سفلية أنيقة متزامنة مع الصوت | كل المشاهد (`CaptionBar`) |
| 14 | **Cinematic Transitions** | Wipe · Clock-Wipe · Flip · Iris · Slide · Fade | بين المشاهد الستة (18 فريم/انتقال) |

---

## 3) مكتبات Remotion UI المستعملة/المرجعية

**رسمية (مثبّتة فعلياً، كلها 4.0.539):**
- `@remotion/transitions` — fade/slide/wipe/clockWipe/flip/iris عبر `<TransitionSeries>`
- `@remotion/paths` — `evolvePath`/`getPointAtLength` لرسم الشعار والخط الزمني
- `@remotion/shapes` · `@remotion/layout-utils` — أشكال وقياسات تخطيط
- `@remotion/fonts` + `@remotion/google-fonts` — تحميل الخطوط وحظر الرندر حتى تجهز

**مجتمعية (نمط التصميم):** بنينا مكتبتنا الخاصة في [`src/ui/primitives.tsx`](../src/ui/primitives.tsx) بنفس فلسفة RemotionUI (مكوّنات تملك سورسها): `RiseIn` · `WordStagger` · `GlassCard` · `Chip` · `AnimatedCounter` · `ProgressBar` · `CaptionBar` · `AuroraBackground` · `Particles` · `CornerMark`.

---

## 4) الخطوط (Google Fonts — محلياً)

| الخط | الاستخدام | المصدر |
|---|---|---|
| **Cairo** (700/800/900) | العناوين العربية الضخمة | `@fontsource/cairo` → `public/fonts/` |
| **Tajawal** (400/500/700) | النصوص والترجمة العربية | `@fontsource/tajawal` |
| **Space Grotesk** (500/700) | الأرقام والتسميات اللاتينية | `@fontsource/space-grotesk` |
| **JetBrains Mono** (400/700) | محرّر الكود والطرفية | `@fontsource/jetbrains-mono` |

> لماذا محلياً؟ الرندر يصير حتمياً وبدون إنترنت (رابط Google Fonts المباشر عبر `@remotion/google-fonts` مثبّت أيضاً كبديل أونلاين). تُحمَّل بـ `@remotion/fonts` + `staticFile` فتتوقف الفريمات حتى تجهز الخطوط.

**قواعد العربي (من مهارة `remotion-markup/arabic-text.md` الرسمية):**
- حرّك **الكلمات** لا الحروف — الحرف العربي في صندوق مستقل ينفصل عن وصلاته ويتشوّه.
- `dir="rtl"` على الحاوية دائماً مع أي عناصر `inline-block`.
- ممنوع `letter-spacing` و`text-transform` على العربي.
- التدرّج الآمن عملياً: ~40ms بين كل عنصر كحد أعلى لبقاء النص مقروءاً.

---

## 5) مبادئ الحركة المطبّقة

- **Spring physics بدل المنحنيات الجاهزة** للدخولات (`damping 11–17`) يعطي Overshoot عضوي (Follow-Through).
- **`interpolate` + `Easing.bezier`** للمزامنات الدقيقة مع الصوت (Timing) — مدد المشاهد محسوبة من أطوال MP3 الحقيقية.
- **Arcs**: أيقونات الأدوات تتحرك في قوس إهليجي، وقصاصات الاحتفال بقوس جاذبية.
- **Secondary Action**: جسيمات، نقطة مدارية، مؤشّر وامض — تفاصيل تثري دون تشتيت (Staging: عين المشاهد دائماً لعنصر واحد).
- **Exaggeration**: عناوين 205px وأرقام عملاقة. **Determinism**: `Math.random` ممنوع — بذرة `mulberry32` لكل العشوائي.

### روابط المصادر
- https://github.com/remotion-dev/skills · https://github.com/AMFahim/remotion-ui · https://github.com/rrh1441/remotion-ui
- https://github.com/lifeprompt-team/remotion-scenes · https://github.com/GTKottman/remotion-transitions · https://github.com/simple-icons/simple-icons
- https://trydemotion.com/blog/trending-motion-graphic-styles (ستايلات 2026) · https://artofstyleframe.com/blog/motion-graphics-trends-2026-sources/ (AE 26 + Variable Fonts)
