/**
 * توقيتات الفيديو — مصدر الحقيقة الوحيد.
 * مدد المشاهد محسوبة من أطوال التعليق الصوتي الحقيقية (قِيست بـ mutagen):
 * scene1: 8.78s · scene2: 8.39s · scene3: 7.08s · scene4: 8.10s
 * scene5: 8.78s · scene6: 13.56s · scene7: 6.95s  (المجموع ≈ 61.6s)
 * كل مشهد = صوت + حشوة دخول/خروج. الانتقالات (18 فريم) تتداخل فتُقصّر المجموع.
 */
export const FPS = 30;

/** مدد المشاهد بالفريمات (قبل طرح تداخل الانتقالات) */
export const SCENE_FRAMES = [
  294, // 1 الهوك + الشعار        9.8s
  282, // 2 التايبوجرافيك الحركي  9.4s
  246, // 3 شبكة القدرات         8.2s
  276, // 4 الكود يُكتب حيّاً     9.2s
  294, // 5 أيقونات الأدوات      9.8s
  444, // 6 رحلة العمل           14.8s
  258, // 7 الختام + CTA          8.6s
] as const;

/** مدة كل انتقال بين مشهدين */
export const TRANSITION_FRAMES = 18;

/** تأخير بدء التعليق الصوتي داخل كل مشهد (بعد اكتمال الانتقال تقريباً) */
export const VOICE_DELAY = 20;
/** المشهد الأول يبدأ أبكر قليلاً (لا انتقال قبله) */
export const VOICE_DELAY_FIRST = 14;

/** الإجمالي الحقيقي بعد تداخل الانتقالات */
export const TOTAL_FRAMES =
  SCENE_FRAMES.reduce((a, b) => a + b, 0) -
  TRANSITION_FRAMES * (SCENE_FRAMES.length - 1);

/** مواضع القطع (منتصف كل انتقال) — لمواضع مؤثر الـ whoosh */
export const CUT_FRAMES: number[] = (() => {
  const cuts: number[] = [];
  let acc = 0;
  for (let i = 0; i < SCENE_FRAMES.length - 1; i++) {
    acc += SCENE_FRAMES[i];
    cuts.push(acc - TRANSITION_FRAMES / 2 - TRANSITION_FRAMES * i);
    acc -= TRANSITION_FRAMES;
  }
  return cuts;
})();

/** نصوص التعليق (تُعرض أيضاً كترجمة سفلية Lower-Third) */
export const CAPTIONS = [
  'مرحباً! أنا وكيلك الذكي في أرينا، أعمل معك داخل مستودعك الحقيقي، خطوةً بخطوة.',
  'أُفكِّر… أبحث… أكتب الكود… وأُبدِع. كل ذلك من محادثة واحدة فقط.',
  'أبني المواقع والتطبيقات، أُولِّد الصور والفيديو، وأُحلِّل البيانات والمستندات بدقّة.',
  'شاهدني أحوِّل الكلمات إلى كود حقيقي… سطراً بعد سطر، حتى يكتمل المشروع.',
  'وأتعامل بسلاسة مع أدواتك المفضّلة: رياكت، بايثون، تايب سكريبت، غيت‌هَب، وغيرها الكثير.',
  'من الفكرة الأولى… إلى الكود، ثم التصميم، فالاختبار، وحتى النشر. رحلة كاملة في فرع خاص بك.',
  'عندك فكرة؟ قُلها فقط… وخلِّ الباقي عليّ. جرِّبني الآن!',
] as const;

export const AUDIO_FILES = [
  'audio/scene1.mp3',
  'audio/scene2.mp3',
  'audio/scene3.mp3',
  'audio/scene4.mp3',
  'audio/scene5.mp3',
  'audio/scene6.mp3',
  'audio/scene7.mp3',
] as const;
