/**
 * المشهد 1 (V2) — بطل منتج SaaS فاتح: عنوان كحلي + نافذة تطبيق حقيقية
 * فيها محادثة حية (رسالة تُكتب، نقاط كتابة، خطة بعلامات صح ملوّنة).
 */
import React from 'react';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from 'remotion';
import {
  RichBackdrop, RiseIn, PopIn, WordStagger, Chip, CheckBadge,
  BrowserFrame, CornerMark, WhiteCard,
} from '../ui/primitives';
import { LogoMark } from '../ui/Logo';
import { COLORS, PANELS, GRADIENT_MAIN, clampCfg } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY, FONT_LATIN } from '../lib/fonts';

const USER_MSG = 'ابنيلي متجر إلكتروني كامل… من الصفر';
const NAV = [
  { t: 'الرئيسية', c: PANELS[4].accent },
  { t: 'المشاريع', c: PANELS[2].accent },
  { t: 'المحادثات', c: PANELS[0].accent },
  { t: 'الملفات', c: PANELS[1].accent },
  { t: 'الإعدادات', c: PANELS[3].accent },
];
const PLAN = [
  { t: 'تحليل الفكرة والتخطيط', c: PANELS[1].accent, at: 196 },
  { t: 'كتابة الكود', c: PANELS[2].accent, at: 214 },
  { t: 'تصميم الواجهة', c: PANELS[0].accent, at: 232 },
  { t: 'الاختبار والنشر على GitHub', c: PANELS[3].accent, at: 250 },
];

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [6, 66], [0, 1], { ...clampCfg, easing: Easing.inOut(Easing.cubic) });
  const typed = Math.floor(interpolate(frame, [98, 152], [0, USER_MSG.length], clampCfg));
  const dotsOpacity =
    interpolate(frame, [158, 166], [0, 1], clampCfg) *
    interpolate(frame, [182, 190], [1, 0], clampCfg);
  return (
    <AbsoluteFill>
      <RichBackdrop seed={3} />
      <CornerMark />
      <AbsoluteFill style={{ flexDirection: 'row', alignItems: 'center', padding: '70px 80px 120px', gap: 54 }} dir="rtl">
        {/* عمود العنوان (يمين) */}
        <div style={{ width: 540, flexShrink: 0 }}>
          <LogoMark size={148} drawProgress={draw} />
          <div style={{ marginTop: 26 }}>
            <WordStagger text="أهلاً! أنا" delay={38} fontSize={94} align="right" lineHeight={1.15} />
            <WordStagger text="وكيلك الذكي" delay={54} fontSize={94} align="right" gradient lineHeight={1.2} />
          </div>
          <RiseIn delay={92}>
            <div style={{ fontFamily: FONT_BODY, fontSize: 29, color: COLORS.ink2, lineHeight: 1.65, marginTop: 16 }}>
              أعمل معك داخل مستودعك الحقيقي — من الفكرة حتى النشر،
              <span style={{ color: COLORS.purpleDeep, fontWeight: 700 }}> خطوةً بخطوة</span>
            </div>
          </RiseIn>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 34 }}>
            {[
              { t: 'أكوّد', p: PANELS[2] }, { t: 'أصمّم', p: PANELS[0] },
              { t: 'أبني', p: PANELS[4] }, { t: 'أنشر', p: PANELS[3] },
            ].map((c, i) => (
              <PopIn key={c.t} delay={118 + i * 10}><Chip text={c.t} panel={c.p} fontSize={25} /></PopIn>
            ))}
          </div>
        </div>

        {/* نافذة التطبيق (يسار) */}
        <div style={{ position: 'relative', flex: 1 }}>
          <PopIn delay={48} from={0.9}>
            <div style={{ transform: 'rotate(-0.5deg)' }}>
              <BrowserFrame url="arena.app/agent" style={{ height: 712 }}>
                <div style={{ display: 'flex', height: '100%' }} dir="rtl">
                  {/* شريط جانبي */}
                  <div style={{
                    width: 232, flexShrink: 0, background: '#F3F7FF',
                    borderInlineEnd: `1px solid ${COLORS.line}`, padding: '22px 16px',
                    display: 'flex', flexDirection: 'column', gap: 8,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingInlineStart: 6 }}>
                      <span style={{ width: 34, height: 34, borderRadius: 10, background: GRADIENT_MAIN }} />
                      <span dir="ltr" style={{ fontFamily: FONT_LATIN, fontSize: 23, fontWeight: 700, color: COLORS.ink }}>Arena</span>
                    </div>
                    {NAV.map((n, i) => (
                      <div key={n.t} style={{
                        display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px', borderRadius: 13,
                        background: i === 1 ? '#FFFFFF' : 'transparent',
                        boxShadow: i === 1 ? '0 8px 20px rgba(23,38,84,0.10)' : 'none',
                        fontFamily: FONT_BODY, fontSize: 20.5, fontWeight: i === 1 ? 700 : 500,
                        color: i === 1 ? COLORS.ink : COLORS.ink2,
                      }}>
                        <span style={{ width: 10, height: 10, borderRadius: 3, background: n.c }} />
                        {n.t}
                      </div>
                    ))}
                    <div style={{
                      marginTop: 'auto', borderRadius: 16, padding: 14, color: '#fff',
                      background: GRADIENT_MAIN, fontFamily: FONT_BODY,
                    }}>
                      <div style={{ fontSize: 19, fontWeight: 700 }}>الوكيل جاهز</div>
                      <div style={{ fontSize: 16.5, opacity: 0.88, marginTop: 3 }}>اطلب أي شيء وسيبدأ فوراً</div>
                    </div>
                  </div>

                  {/* منطقة المحادثة */}
                  <div style={{ flex: 1, position: 'relative', padding: '20px 24px 92px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{
                        width: 46, height: 46, borderRadius: '50%', background: GRADIENT_MAIN,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontFamily: FONT_LATIN, fontWeight: 700, fontSize: 22,
                      }}>A</span>
                      <div>
                        <div style={{ fontFamily: FONT_DISPLAY, fontSize: 23, fontWeight: 800, color: COLORS.ink }}>وكيل Arena</div>
                        <div style={{ fontFamily: FONT_BODY, fontSize: 17, color: COLORS.green, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.green }} />
                          متصل الآن · داخل مستودعك
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 24 }}>
                      {/* رسالة المستخدم */}
                      <PopIn delay={88} style={{ alignSelf: 'flex-end', maxWidth: '78%' }}>
                        <div style={{
                          background: `linear-gradient(120deg, ${COLORS.blue}, ${COLORS.violet})`,
                          color: '#fff', borderRadius: '20px 20px 6px 20px', padding: '14px 20px',
                          fontFamily: FONT_BODY, fontSize: 23, fontWeight: 500,
                          boxShadow: '0 14px 30px rgba(63,94,251,0.30)',
                        }}>
                          {USER_MSG.slice(0, typed)}
                          {frame < 156 && <span style={{ opacity: frame % 16 < 8 ? 1 : 0 }}>▍</span>}
                        </div>
                      </PopIn>

                      {/* نقاط الكتابة */}
                      <div style={{
                        alignSelf: 'flex-start', opacity: dotsOpacity,
                        display: 'flex', gap: 7, background: '#EFF3FD', borderRadius: 999, padding: '13px 18px',
                      }}>
                        {[0, 1, 2].map((i) => (
                          <span key={i} style={{
                            width: 10, height: 10, borderRadius: '50%', background: COLORS.ink3,
                            transform: `translateY(${-Math.abs(Math.sin(frame / 4.5 - i * 0.9)) * 6}px)`,
                          }} />
                        ))}
                      </div>

                      {/* بطاقة خطة الوكيل */}
                      <RiseIn delay={188} style={{ alignSelf: 'flex-start', width: '77%' }}>
                        <WhiteCard radius={20} style={{ padding: '17px 20px' }}>
                          <div style={{ fontFamily: FONT_DISPLAY, fontSize: 23, fontWeight: 800, color: COLORS.ink }}>
                            تمام! خطتي جاهزة… وبنبدأ توّا
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 13 }}>
                            {PLAN.map((p) => (
                              <div key={p.t} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                                <CheckBadge delay={p.at} color={p.c} size={29} />
                                <RiseIn delay={p.at} y={10}>
                                  <span style={{ fontFamily: FONT_BODY, fontSize: 21.5, color: COLORS.ink, fontWeight: 500 }}>{p.t}</span>
                                </RiseIn>
                              </div>
                            ))}
                          </div>
                        </WhiteCard>
                      </RiseIn>
                    </div>

                    {/* شريط الإدخال */}
                    <div style={{
                      position: 'absolute', left: 24, right: 24, bottom: 20, height: 56, borderRadius: 999,
                      background: '#F2F6FF', border: `1px solid ${COLORS.line}`,
                      display: 'flex', alignItems: 'center', padding: '0 8px 0 22px', gap: 12,
                    }}>
                      <span style={{ fontFamily: FONT_BODY, fontSize: 20, color: COLORS.ink3, flex: 1 }}>اكتب فكرتك هنا…</span>
                      <span style={{
                        width: 42, height: 42, borderRadius: '50%', background: GRADIENT_MAIN,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M11 6l-6 6 6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </BrowserFrame>
            </div>
          </PopIn>
          {/* شارة عائمة */}
          <div style={{ position: 'absolute', top: -38, left: -14 }}>
            <PopIn delay={238}>
              <WhiteCard radius={999} accent={COLORS.green} style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckBadge delay={244} color={COLORS.green} size={26} />
                <span dir="ltr" style={{ fontFamily: FONT_LATIN, fontSize: 20, fontWeight: 700, color: COLORS.ink }}>PR #1</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: 20, fontWeight: 700, color: COLORS.ink2 }}>جاهز للدمج</span>
              </WhiteCard>
            </PopIn>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
