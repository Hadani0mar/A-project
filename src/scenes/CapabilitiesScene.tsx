/**
 * المشهد 3 (V2) — لوحة تحكم حقيقية: شريط علوي + شبكة وحدات ملوّنة
 * بعروض مصغّرة حية، ثم بطاقة إحصائية RemotionUI (StatCard) تملأ الشاشة.
 */
import React from 'react';
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { siGithub } from 'simple-icons';
import { StatCard } from '../remotionui/scenes/stat-card';
import {
  RichBackdrop, SectionTitle, BrowserFrame, PanelCard, PopIn, CornerMark,
} from '../ui/primitives';
import { BrandIcon } from '../lib/brands';
import { COLORS, PANELS, GRADIENT_MAIN, type PanelColor } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY, FONT_LATIN, FONT_MONO } from '../lib/fonts';

const LineIcon: React.FC<{ d: string; color: string }> = ({ d, color }) => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const MicroDemo: React.FC<{ kind: number; panel: PanelColor; delay: number }> = ({ kind, panel, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (kind === 0) { // أسطر كود مصغّرة
    return (
      <div dir="ltr" style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {[150, 205, 120].map((w, i) => {
          const p = spring({ frame: frame - delay - i * 7, fps, config: { damping: 18, stiffness: 140 } });
          return (
            <div key={i} style={{ height: 11, borderRadius: 6, width: w * p, background: '#FFFFFF', display: 'flex', overflow: 'hidden' }}>
              <span style={{ width: '38%', background: panel.accent }} />
            </div>
          );
        })}
      </div>
    );
  }
  if (kind === 1) { // عينات ألوان
    return (
      <div style={{ display: 'flex', gap: 9 }}>
        {PANELS.map((p, i) => {
          const s = spring({ frame: frame - delay - i * 5, fps, config: { damping: 12, stiffness: 190 } });
          return <span key={p.name} style={{
            width: 30, height: 30, borderRadius: 10, background: p.accent,
            transform: `scale(${s}) rotate(${i * 6 - 12}deg)`, border: '2.5px solid #fff',
            boxShadow: '0 5px 12px rgba(23,38,84,.18)',
          }} />;
        })}
      </div>
    );
  }
  if (kind === 2) { // معادل صوت/فيديو
    return (
      <div dir="ltr" style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 44 }}>
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} style={{
            width: 9, borderRadius: 5, background: panel.accent,
            height: 9 + Math.abs(Math.sin(frame / 5.5 - i * 0.75)) * 34,
          }} />
        ))}
      </div>
    );
  }
  if (kind === 3) { // أعمدة بيانات
    return (
      <div dir="ltr" style={{ display: 'flex', alignItems: 'flex-end', gap: 9, height: 46 }}>
        {[0.45, 0.7, 0.55, 0.9, 1].map((h, i) => {
          const p = spring({ frame: frame - delay - i * 6, fps, config: { damping: 16, stiffness: 150 } });
          return <span key={i} style={{
            width: 22, borderRadius: '7px 7px 3px 3px', height: 44 * h * p,
            background: i === 4 ? panel.accent : '#FFFFFF',
            border: i === 4 ? 'none' : `1.5px solid ${panel.accent}55`,
          }} />;
        })}
      </div>
    );
  }
  if (kind === 4) { // أسطر مستند بعلامات
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {[180, 150, 190].map((w, i) => {
          const p = spring({ frame: frame - delay - i * 7, fps, config: { damping: 13, stiffness: 180 } });
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 15, height: 15, borderRadius: '50%', background: panel.accent,
                transform: `scale(${p})`, color: '#fff', fontSize: 10.5, fontWeight: 800,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT_LATIN,
              }}>✓</span>
              <span style={{ height: 9, borderRadius: 5, width: w * Math.min(1, p), background: '#FFFFFF' }} />
            </div>
          );
        })}
      </div>
    );
  }
  // فرع Git نابض
  const pulse = 1 + Math.sin(frame / 7) * 0.18;
  return (
    <div dir="ltr" style={{
      display: 'inline-flex', alignItems: 'center', gap: 9, background: '#fff', borderRadius: 999,
      padding: '8px 16px', fontFamily: FONT_MONO, fontSize: 18, color: COLORS.ink2,
      boxShadow: '0 6px 16px rgba(23,38,84,.10)',
    }}>
      <span style={{ width: 11, height: 11, borderRadius: '50%', background: COLORS.green, transform: `scale(${pulse})` }} />
      arena/a-project · PR #1
    </div>
  );
};

const TILES = [
  { title: 'برمجة وتطوير', desc: 'مواقع وتطبيقات كاملة شغّالة', icon: 'M8 6 3 12l5 6M16 6l5 6-5 6M13.5 4l-3 16', panel: PANELS[2] },
  { title: 'تصميم وواجهات', desc: 'هوية بصرية وواجهات وموشن', icon: 'M4 20l4-1L20 7l-3-3L5 16l-1 4zM13.5 6.5l3 3', panel: PANELS[0] },
  { title: 'صور وفيديو وصوت', desc: 'توليد وتحرير وسائط باحتراف', icon: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM10 9.2l5 2.8-5 2.8z', panel: PANELS[4] },
  { title: 'بيانات وتقارير', desc: 'جداول ورسوم وتحليل معمّق', icon: 'M3 3v18h18M8.5 16.5v-6M13 16.5V6.5M17.5 16.5v-9', panel: PANELS[3] },
  { title: 'بحث ومستندات', desc: 'مصادر موثّقة وتلخيص دقيق', icon: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.35-4.35', panel: PANELS[1] },
  { title: 'نشر على GitHub', desc: 'فروع خاصة وطلبات دمج تلقائية', icon: '', panel: PANELS[5] },
];

export const CapabilitiesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const statSlide = spring({ frame: frame - 150, fps, config: { damping: 19, stiffness: 105, mass: 1 } });
  return (
    <AbsoluteFill>
      <RichBackdrop seed={11} />
      <CornerMark />
      <AbsoluteFill style={{ alignItems: 'center', paddingTop: 52 }}>
        <SectionTitle kicker="لوحة القدرات" panel={PANELS[2]} title="شنو نقدر نديرلك؟" subtitle="ستّ وحدات قوية… في واجهة واحدة" delay={4} titleSize={60} />
        <PopIn delay={18} from={0.94} style={{ marginTop: 30 }}>
          <BrowserFrame url="arena.app/dashboard" style={{ width: 1708, height: 618 }}>
            {/* شريط التطبيق العلوي */}
            <div dir="rtl" style={{
              height: 62, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px',
              borderBottom: `1px solid ${COLORS.line}`, background: '#FBFCFF',
            }}>
              <div style={{
                flex: 1, maxWidth: 520, height: 40, borderRadius: 999, background: '#EDF2FC',
                display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px',
                fontFamily: FONT_BODY, fontSize: 19, color: COLORS.ink3,
              }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', border: `2.5px solid ${COLORS.ink3}` }} />
                ابحث… أو اطلب أي شيء
              </div>
              <div style={{ marginInlineStart: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div dir="ltr" style={{ display: 'flex' }}>
                  {[COLORS.blue, COLORS.pink, COLORS.amber].map((c, i) => (
                    <span key={c} style={{
                      width: 36, height: 36, borderRadius: '50%', background: c, border: '2.5px solid #fff',
                      marginLeft: i === 0 ? 0 : -11, color: '#fff', fontFamily: FONT_LATIN, fontWeight: 700,
                      fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{['A', 'S', 'M'][i]}</span>
                  ))}
                </div>
                <span style={{
                  background: GRADIENT_MAIN, color: '#fff', borderRadius: 999, padding: '10px 24px',
                  fontFamily: FONT_BODY, fontSize: 20, fontWeight: 700,
                  boxShadow: '0 10px 24px rgba(124,92,255,.35)',
                }}>مشروع جديد +</span>
              </div>
            </div>
            {/* شبكة الوحدات */}
            <div dir="rtl" style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, padding: 20,
            }}>
              {TILES.map((t, i) => (
                <PopIn key={t.title} delay={28 + i * 9} from={0.85}>
                  <PanelCard panel={t.panel} radius={24} style={{ height: 222, padding: '18px 22px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        width: 50, height: 50, borderRadius: 15, background: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 18px rgba(23,38,84,.10)',
                      }}>
                        {t.icon ? <LineIcon d={t.icon} color={t.panel.accent} /> : <BrandIcon icon={siGithub} size={30} />}
                      </span>
                      <span style={{
                        background: '#FFFFFF', color: t.panel.deep, borderRadius: 999, padding: '4px 13px',
                        fontFamily: FONT_BODY, fontSize: 16.5, fontWeight: 700,
                      }}>جاهز</span>
                    </div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontSize: 30, fontWeight: 800, color: COLORS.ink, marginTop: 9 }}>{t.title}</div>
                    <div style={{ fontFamily: FONT_BODY, fontSize: 19, color: COLORS.ink2, marginTop: 2 }}>{t.desc}</div>
                    <div style={{ marginTop: 'auto' }}>
                      <MicroDemo kind={i} panel={t.panel} delay={52 + i * 9} />
                    </div>
                  </PanelCard>
                </PopIn>
              ))}
            </div>
          </BrowserFrame>
        </PopIn>
      </AbsoluteFill>

      {/* بطاقة RemotionUI الإحصائية تنزلق فوق المشهد */}
      <Sequence from={150} name="StatCard (RemotionUI)">
        <AbsoluteFill style={{ transform: `translateY(${(1 - statSlide) * 1080}px)` }}>
          <StatCard
            theme="light"
            backgroundColor="#F7FAFF"
            accentColor="#7C5CFF"
            value={100}
            max={100}
            suffix="%"
            label="من الفكرة… حتى النشر"
            caption="كود · تصميم · بيانات · فيديو — كلها في محادثة واحدة"
            speed={1.35}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
