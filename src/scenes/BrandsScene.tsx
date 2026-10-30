/**
 * المشهد 5 (V2) — صفحة «التكاملات»: صفوف أدوات بمفاتيح تبديل تُفعَّل
 * تباعاً + عداد اتصالات حي + شريط علامات منساب.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import {
  RichBackdrop, SectionTitle, BrowserFrame, PanelCard, WhiteCard,
  PopIn, ToggleSwitch, StatusPill, CornerMark,
} from '../ui/primitives';
import { BrandIcon, ORBIT_BRANDS, MARQUEE_BRANDS } from '../lib/brands';
import { COLORS, PANELS } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY, FONT_LATIN } from '../lib/fonts';

const DESCS: Record<string, string> = {
  React: 'واجهات تفاعلية سريعة',
  Python: 'سكربتات وتحليل بيانات',
  TypeScript: 'كود آمن الأنواع',
  GitHub: 'مستودعات وطلبات دمج',
  'Node.js': 'خوادم وأدوات بناء',
  'Next.js': 'مواقع متكاملة جاهزة',
  Tailwind: 'تصميم سريع ومرن',
  Docker: 'حاويات ونشر موثوق',
};
const BASE = 46, STEP = 15;

export const BrandsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const connected = ORBIT_BRANDS.filter((_, i) => frame >= BASE + i * STEP + 6).length;
  const pitch = 232;
  const rowW = pitch * MARQUEE_BRANDS.length;
  const offset = -((frame * 2.3) % rowW);
  return (
    <AbsoluteFill>
      <RichBackdrop seed={21} />
      <CornerMark />
      <AbsoluteFill style={{ alignItems: 'center', paddingTop: 50 }}>
        <SectionTitle kicker="التكاملات" panel={PANELS[4]} title="أشتغل بأدواتك المفضّلة" delay={4} titleSize={60} />
        <PopIn delay={16} from={0.95} style={{ marginTop: 28 }}>
          <BrowserFrame url="arena.app/integrations" style={{ width: 1520, height: 596 }}>
            <div dir="rtl" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontSize: 27, fontWeight: 800, color: COLORS.ink }}>ربط الأدوات</div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 999, padding: '6px 16px',
                  background: PANELS[3].tint, color: PANELS[3].deep, fontFamily: FONT_BODY, fontSize: 19, fontWeight: 700,
                }}>
                  <span dir="ltr" style={{ fontFamily: FONT_LATIN, fontWeight: 700 }}>{connected}/8</span>
                  متصلة الآن
                </span>
                <div style={{
                  marginInlineStart: 'auto', width: 340, height: 40, borderRadius: 999, background: '#EDF2FC',
                  display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px',
                  fontFamily: FONT_BODY, fontSize: 18, color: COLORS.ink3,
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', border: `2.5px solid ${COLORS.ink3}` }} />
                  ابحث عن أي أداة…
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 18 }}>
                {ORBIT_BRANDS.map((b, i) => {
                  const panel = PANELS[i % PANELS.length];
                  const delay = BASE + i * STEP;
                  return (
                    <PopIn key={b.label} delay={24 + i * 7} from={0.88}>
                      <WhiteCard radius={19} style={{
                        padding: '13px 18px', display: 'flex', alignItems: 'center', gap: 15,
                      }}>
                        <PanelCard panel={panel} radius={16} style={{
                          width: 57, height: 57, flexShrink: 0, boxShadow: 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <BrandIcon icon={b.icon} size={30} />
                        </PanelCard>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div dir="ltr" style={{ textAlign: 'right', fontFamily: FONT_LATIN, fontSize: 24, fontWeight: 700, color: COLORS.ink }}>
                            {b.label}
                          </div>
                          <div style={{ fontFamily: FONT_BODY, fontSize: 18.5, color: COLORS.ink2 }}>{DESCS[b.label]}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
                          <ToggleSwitch delay={delay} color={panel.accent} />
                          <StatusPill delay={delay} offText="بانتظار الربط" onText="متصل" color={panel.accent} />
                        </div>
                      </WhiteCard>
                    </PopIn>
                  );
                })}
              </div>
            </div>
          </BrowserFrame>
        </PopIn>
      </AbsoluteFill>

      {/* شريط علامات منساب */}
      <div dir="ltr" style={{ position: 'absolute', left: 0, right: 0, bottom: 130, height: 82, overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: rowW * 2, transform: `translateX(${offset}px)` }}>
          {[...MARQUEE_BRANDS, ...MARQUEE_BRANDS].map((b, i) => (
            <div key={i} style={{
              width: 212, marginRight: 20, height: 82, borderRadius: 19, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: '#FFFFFF', border: `1px solid ${COLORS.line}`,
              boxShadow: '0 12px 28px rgba(23,38,84,0.09)',
            }}>
              <BrandIcon icon={b.icon} size={33} />
              <span style={{ fontFamily: FONT_LATIN, fontSize: 22, fontWeight: 700, color: COLORS.ink }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
