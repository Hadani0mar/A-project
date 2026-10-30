/**
 * المشهد 4 (V2) — محرّر كود داكن (لوحة التباين الوحيدة) + معاينة حيّة
 * فاتحة تتجمع أمامه، مؤشر RemotionUI يضغط زر النشر + قصاصات.
 */
import React from 'react';
import {
  AbsoluteFill, Sequence, interpolate, useCurrentFrame,
} from 'remotion';
import { SimulatedCursor } from '../remotionui/primitives/simulated-cursor';
import { ConfettiBurst } from '../remotionui/primitives/confetti-burst';
import {
  RichBackdrop, SectionTitle, BrowserFrame, PopIn, RiseIn,
  WhiteCard, CheckBadge, AnimatedCounter, ProgressBar, CornerMark,
} from '../ui/primitives';
import { COLORS, PANELS, GRADIENT_MAIN, clampCfg } from '../lib/theme';
import { FONT_BODY, FONT_DISPLAY, FONT_MONO } from '../lib/fonts';

type Token = { t: string; c: string };
const K = '#C99BE8', S = '#FFD580', F = '#7DD3FC', P = '#E6E9F5', CM = '#69779B', GN = '#34D399';
const LINES: Token[][] = [
  [{ t: '// your idea -> real product', c: CM }],
  [{ t: 'import ', c: K }, { t: '{ Agent } ', c: P }, { t: 'from ', c: K }, { t: '"arena"', c: S }, { t: ';', c: P }],
  [],
  [{ t: 'const ', c: K }, { t: 'agent ', c: P }, { t: '= ', c: K }, { t: 'new ', c: K }, { t: 'Agent', c: F }, { t: '({ mode: ', c: P }, { t: '"build"', c: S }, { t: ' });', c: P }],
  [],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'plan', c: F }, { t: '(', c: P }, { t: '"e-commerce store"', c: S }, { t: ');', c: P }],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'code', c: F }, { t: '();   ', c: P }, { t: '// React + TypeScript', c: CM }],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'design', c: F }, { t: '(); ', c: P }, { t: '// UI + Motion', c: CM }],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'test', c: F }, { t: '();   ', c: P }, { t: '// 0 errors', c: GN }],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'ship', c: F }, { t: '(', c: P }, { t: '"github"', c: S }, { t: '); ', c: P }, { t: '// PR opened', c: GN }],
];
const LINE_CHARS = LINES.map((l) => l.reduce((a, t) => a + t.t.length, 0));
const TOTAL = LINE_CHARS.reduce((a, b) => a + b, 0);

const TREE = [
  { n: 'src', c: '#FFC53D', d: 0 }, { n: 'app', c: '#FB4D6D', d: 1 },
  { n: 'page.tsx', c: '#7DD3FC', d: 2 }, { n: 'components', c: '#A78BFA', d: 1 },
  { n: 'Navbar.tsx', c: '#7DD3FC', d: 2 }, { n: 'lib', c: '#34D399', d: 1 },
  { n: 'utils.ts', c: '#7DD3FC', d: 2 }, { n: 'styles', c: '#F9A8C9', d: 1 },
  { n: 'package.json', c: '#FB923C', d: 0 },
];

export const CodeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const chars = Math.floor(interpolate(frame, [32, 204], [0, TOTAL], clampCfg));
  const pct = Math.round((chars / TOTAL) * 100);
  let acc = 0, currentLine = LINES.length - 1;
  for (let i = 0; i < LINES.length; i++) {
    if (chars <= acc + LINE_CHARS[i]) { currentLine = i; break; }
    acc += LINE_CHARS[i];
  }
  const renderLine = (li: number) => {
    let before = 0;
    for (let j = 0; j < li; j++) before += LINE_CHARS[j];
    let left = Math.max(0, Math.min(LINE_CHARS[li], chars - before));
    return LINES[li].map((tok, i) => {
      if (left <= 0) return null;
      const piece = tok.t.slice(0, left);
      left -= tok.t.length;
      return <span key={i} style={{ color: tok.c }}>{piece}</span>;
    });
  };
  return (
    <AbsoluteFill>
      <RichBackdrop seed={15} />
      <CornerMark />
      <AbsoluteFill style={{ alignItems: 'center', paddingTop: 44 }}>
        <SectionTitle kicker="من كلمات… إلى منتج" panel={PANELS[4]} title="الكود يُكتب — والمنتج يظهر" delay={4} titleSize={54} />
        <div dir="rtl" style={{ display: 'flex', gap: 28, marginTop: 26 }}>
          {/* المحرّر الداكن */}
          <PopIn delay={14} from={0.95}>
            <div dir="ltr" style={{
              width: 1050, height: 648, borderRadius: 24, overflow: 'hidden', position: 'relative',
              background: COLORS.navyPanel, boxShadow: '0 36px 84px rgba(12,20,40,0.42)',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                height: 52, display: 'flex', alignItems: 'center', gap: 9, padding: '0 18px',
                background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                {['#FB4D6D', '#FFB020', '#0DBE86'].map((c) => (
                  <span key={c} style={{ width: 14, height: 14, borderRadius: '50%', background: c }} />
                ))}
                <span style={{
                  marginLeft: 14, background: 'rgba(255,255,255,0.09)', color: '#fff', borderRadius: 9,
                  padding: '6px 16px', fontFamily: FONT_MONO, fontSize: 17,
                }}>store.tsx</span>
                <span style={{ color: '#69779B', fontFamily: FONT_MONO, fontSize: 17, padding: '6px 10px' }}>api.ts</span>
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <AnimatedCounter to={1284} delay={36} duration={166} fontSize={19} color="#7DD3FC" />
                  <span style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#8B98BB' }}>سطر كود</span>
                </span>
              </div>
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                {/* شجرة الملفات الملوّنة */}
                <div style={{
                  width: 228, flexShrink: 0, padding: '18px 12px',
                  background: 'rgba(255,255,255,0.025)', borderRight: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', flexDirection: 'column', gap: 7,
                }}>
                  {TREE.map((f, i) => (
                    <PopIn key={f.n} delay={22 + i * 4} from={0.9}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 9, padding: '6px 9px',
                        paddingLeft: 9 + f.d * 19, borderRadius: 8,
                        background: f.n === 'page.tsx' ? 'rgba(124,92,255,0.20)' : 'transparent',
                        fontFamily: FONT_MONO, fontSize: 16.5,
                        color: f.n === 'page.tsx' ? '#FFFFFF' : '#97A5C6',
                      }}>
                        <span style={{ width: 16, height: 13, borderRadius: 4, background: f.c, flexShrink: 0 }} />
                        {f.n}
                      </div>
                    </PopIn>
                  ))}
                </div>
                {/* الكود */}
                <div style={{ flex: 1, padding: '20px 26px', fontFamily: FONT_MONO, fontSize: 24, lineHeight: 1.66 }}>
                  {LINES.map((_, li) => (
                    <div key={li} style={{
                      display: 'flex', whiteSpace: 'pre', borderRadius: 7,
                      background: li === currentLine && chars < TOTAL ? 'rgba(124,92,255,0.13)' : 'transparent',
                    }}>
                      <span style={{ width: 46, color: 'rgba(150,160,200,0.42)' }}>{li + 1}</span>
                      <span>
                        {renderLine(li)}
                        {li === currentLine && (
                          <span style={{
                            display: 'inline-block', width: 13, height: 27, marginLeft: 2, verticalAlign: '-4px',
                            background: frame % 18 < 10 ? '#22D3EE' : 'transparent',
                          }} />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* زر النشر */}
              <div style={{ position: 'absolute', right: 24, bottom: 58 }}>
                <PopIn delay={198}>
                  <div style={{
                    background: GRADIENT_MAIN, color: '#fff', borderRadius: 999, padding: '17px 42px',
                    fontFamily: FONT_BODY, fontSize: 25, fontWeight: 700, direction: 'rtl',
                    boxShadow: '0 18px 42px rgba(124,92,255,0.55)',
                  }}>
                    انشر المشروع
                  </div>
                </PopIn>
              </div>
              <div style={{
                height: 40, display: 'flex', alignItems: 'center', gap: 18, padding: '0 18px',
                background: 'linear-gradient(90deg, #5B3DF0, #7C5CFF)',
                fontFamily: FONT_MONO, fontSize: 16, color: '#fff',
              }}>
                <span>arena/a-project</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#34D399' }} />0 errors
                </span>
                <span style={{ marginLeft: 'auto' }}>TypeScript · UTF-8</span>
              </div>
            </div>
          </PopIn>

          {/* المعاينة الحية الفاتحة */}
          <PopIn delay={24} from={0.95}>
            <BrowserFrame url="my-store.arena.app" style={{ width: 640, height: 648 }}>
              <div dir="rtl" style={{ padding: '20px 24px', height: '100%', background: '#FBFCFF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: FONT_BODY, fontSize: 18, fontWeight: 700, color: COLORS.ink2 }}>جارٍ البناء</span>
                  <div style={{ flex: 1 }}><ProgressBar progress={pct / 100} color={COLORS.violet} /></div>
                  <span dir="ltr" style={{ fontFamily: FONT_MONO, fontSize: 18, color: COLORS.purpleDeep, fontWeight: 700 }}>{pct}%</span>
                </div>
                <RiseIn delay={92}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
                    <span style={{ width: 34, height: 34, borderRadius: 10, background: GRADIENT_MAIN }} />
                    {['الرئيسية', 'المنتجات', 'العروض'].map((t, i) => (
                      <span key={t} style={{
                        fontFamily: FONT_BODY, fontSize: 18, fontWeight: i === 0 ? 700 : 500,
                        color: i === 0 ? COLORS.ink : COLORS.ink3,
                        background: i === 0 ? PANELS[4].tint : 'transparent', borderRadius: 999, padding: '5px 14px',
                      }}>{t}</span>
                    ))}
                    <span style={{
                      marginInlineStart: 'auto', background: COLORS.ink, color: '#fff', borderRadius: 999,
                      padding: '7px 18px', fontFamily: FONT_BODY, fontSize: 17, fontWeight: 700,
                    }}>السلة · 2</span>
                  </div>
                </RiseIn>
                <RiseIn delay={118}>
                  <div style={{ fontFamily: FONT_DISPLAY, fontSize: 44, fontWeight: 900, color: COLORS.ink, marginTop: 30, lineHeight: 1.35 }}>
                    متجرك صار <span style={{ color: COLORS.coral }}>جاهز</span>
                  </div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 20, color: COLORS.ink2, marginTop: 6 }}>
                    توصيل سريع داخل ليبيا · دفع عند الاستلام
                  </div>
                </RiseIn>
                <PopIn delay={146} style={{ marginTop: 18 }}>
                  <span style={{
                    display: 'inline-block', background: GRADIENT_MAIN, color: '#fff', borderRadius: 999,
                    padding: '12px 34px', fontFamily: FONT_BODY, fontSize: 21, fontWeight: 700,
                  }}>تسوّق الآن</span>
                </PopIn>
                <div style={{ display: 'flex', gap: 14, marginTop: 28 }}>
                  {[
                    { n: 'سماعات لاسلكية', p: '$49', panel: PANELS[0], d: 162 },
                    { n: 'ساعة ذكية', p: '$89', panel: PANELS[4], d: 176 },
                    { n: 'حقيبة جلدية', p: '$65', panel: PANELS[1], d: 190 },
                  ].map((c) => (
                    <PopIn key={c.n} delay={c.d} style={{ flex: 1 }}>
                      <WhiteCard radius={18} style={{ padding: 12 }}>
                        <div style={{
                          height: 92, borderRadius: 13,
                          background: `linear-gradient(130deg, ${c.panel.tint}, ${c.panel.accent})`,
                        }} />
                        <div style={{ fontFamily: FONT_BODY, fontSize: 17.5, fontWeight: 700, color: COLORS.ink, marginTop: 10 }}>{c.n}</div>
                        <span dir="ltr" style={{
                          display: 'inline-block', marginTop: 5, background: c.panel.tint, color: c.panel.deep,
                          borderRadius: 999, padding: '3px 12px', fontFamily: FONT_MONO, fontSize: 16, fontWeight: 700,
                        }}>{c.p}</span>
                      </WhiteCard>
                    </PopIn>
                  ))}
                </div>
              </div>
            </BrowserFrame>
          </PopIn>
        </div>
      </AbsoluteFill>

      {/* مؤشر RemotionUI يضغط زر النشر */}
      <Sequence from={192} durationInFrames={62} name="Cursor (RemotionUI)">
        <SimulatedCursor
          color="#0E1B33" accent="#7C5CFF"
          points={[
            { x: 57, y: 36, frame: 2 },
            { x: 87, y: 71, frame: 32, target: 100 },
          ]}
          clickFrames={[36]}
        />
      </Sequence>
      <Sequence from={228} name="Confetti (RemotionUI)">
        <ConfettiBurst count={90} originX={87} originY={71}
          colors={['#FB4D6D', '#FFC53D', '#7C5CFF', '#0DBE86', '#2F7CF6']} />
      </Sequence>

      {/* إشعار النجاح */}
      <div style={{ position: 'absolute', bottom: 132, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <PopIn delay={234}>
          <WhiteCard radius={999} accent={COLORS.green} style={{ padding: '13px 28px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckBadge delay={240} color={COLORS.green} size={32} />
            <span style={{ fontFamily: FONT_BODY, fontSize: 25, fontWeight: 700, color: COLORS.ink }}>تم النشر بنجاح</span>
            <span dir="ltr" style={{
              background: PANELS[3].tint, color: PANELS[3].deep, borderRadius: 999, padding: '4px 14px',
              fontFamily: FONT_MONO, fontSize: 18, fontWeight: 700,
            }}>PR #1 opened</span>
          </WhiteCard>
        </PopIn>
      </div>
    </AbsoluteFill>
  );
};
