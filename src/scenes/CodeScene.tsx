/**
 * المشهد 4 — الكود يُكتب حيّاً (UI Animation / Typewriter)
 * نافذة محرّر زجاجية، كتابة حرفاً بحرف بحتمية الفريمات، تلوين نحوي،
 * مؤشّر وامض، وطرفية تُظهر نجاح البناء والنشر.
 */
import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { AuroraBackground, GlassCard, ProgressBar, AnimatedCounter, CornerMark, Chip } from '../ui/primitives';
import { COLORS, clampCfg } from '../lib/theme';
import { FONT_BODY, FONT_MONO } from '../lib/fonts';

type Token = { t: string; c: string };
const K = '#C792EA', S = '#FFD580', F = '#82AAFF', P = '#E6E9F5', CM = '#69779B', GN = '#34D399';

const LINES: Token[][] = [
  [{ t: '// your idea → real, working code', c: CM }],
  [{ t: 'import ', c: K }, { t: '{ Agent } ', c: P }, { t: 'from ', c: K }, { t: '"arena"', c: S }, { t: ';', c: P }],
  [],
  [{ t: 'const ', c: K }, { t: 'agent ', c: P }, { t: '= ', c: K }, { t: 'new ', c: K }, { t: 'Agent', c: F }, { t: '({ mode: ', c: P }, { t: '"build"', c: S }, { t: ' });', c: P }],
  [],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'plan', c: F }, { t: '(', c: P }, { t: '"e-commerce store"', c: S }, { t: ');', c: P }],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'code', c: F }, { t: '();   ', c: P }, { t: '// React + TypeScript', c: CM }],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'design', c: F }, { t: '(); ', c: P }, { t: '// UI + Motion', c: CM }],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'test', c: F }, { t: '();   ', c: P }, { t: '// all passing', c: GN }],
  [{ t: 'await ', c: K }, { t: 'agent.', c: P }, { t: 'ship', c: F }, { t: '(', c: P }, { t: '"github"', c: S }, { t: '); ', c: P }, { t: '// PR opened', c: GN }],
];
const LINE_CHARS = LINES.map((l) => l.reduce((a, tok) => a + tok.t.length, 0));
const TOTAL_CHARS = LINE_CHARS.reduce((a, b) => a + b, 0);

const renderLine = (lineIdx: number, charsLeft: number) => {
  let left = charsLeft;
  return LINES[lineIdx].map((tok, i) => {
    if (left <= 0) return null;
    const piece = tok.t.slice(0, left);
    left -= tok.t.length;
    return <span key={i} style={{ color: tok.c }}>{piece}</span>;
  });
};

export const CodeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const winP = spring({ frame: frame - 6, fps, config: { damping: 17, stiffness: 110 } });
  const chars = Math.floor(interpolate(frame, [30, 222], [0, TOTAL_CHARS], {
    ...clampCfg, easing: Easing.inOut(Easing.quad),
  }));
  // أي سطر نكتب فيه الآن؟
  let acc = 0, currentLine = LINES.length - 1;
  for (let i = 0; i < LINES.length; i++) {
    if (chars <= acc + LINE_CHARS[i]) { currentLine = i; break; }
    acc += LINE_CHARS[i];
  }
  const termLines = [
    { at: 168, text: '$ npm run build', color: P },
    { at: 196, text: '✓ built successfully in 2.3s', color: GN },
    { at: 224, text: '✓ pushed → arena/…-a-project · PR #1 opened', color: GN },
  ];
  const doneP = spring({ frame: frame - 232, fps, config: { damping: 13, stiffness: 130 } });
  const cursorOn = frame % 18 < 10;
  return (
    <AbsoluteFill>
      <AuroraBackground hueShift={150} />
      <CornerMark />
      <AbsoluteFill style={{ alignItems: 'center', paddingTop: 92 }}>
        <div style={{ opacity: winP, transform: `translateY(${(1 - winP) * 80}px) scale(${0.95 + winP * 0.05})`, width: 1280 }}>
          <GlassCard style={{ padding: 0, overflow: 'hidden', borderRadius: 24 }}>
            {/* شريط عنوان النافذة */}
            <div dir="ltr" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '18px 26px',
              background: 'rgba(255,255,255,0.05)', borderBottom: `1px solid ${COLORS.panelBorder}`,
            }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
                <span key={c} style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: c }} />
              ))}
              <span style={{ fontFamily: FONT_MONO, fontSize: 23, color: COLORS.muted, marginLeft: 16 }}>arena-agent — build.ts</span>
              <span style={{ marginLeft: 'auto' }}>
                <AnimatedCounter to={1284} delay={34} duration={188} fontSize={25} color={COLORS.cyan} />
                <span dir="rtl" style={{ fontFamily: FONT_BODY, fontSize: 23, color: COLORS.muted }}> سطر كود</span>
              </span>
            </div>
            {/* جسم المحرّر */}
            <div dir="ltr" style={{ padding: '28px 34px 10px', fontFamily: FONT_MONO, fontSize: 30, lineHeight: 1.62, minHeight: 470 }}>
              {LINES.map((_, li) => {
                let before = 0;
                for (let j = 0; j < li; j++) before += LINE_CHARS[j];
                const inLine = Math.max(0, Math.min(LINE_CHARS[li], chars - before));
                return (
                  <div key={li} style={{
                    display: 'flex', whiteSpace: 'pre', borderRadius: 8,
                    background: li === currentLine && chars < TOTAL_CHARS ? 'rgba(124,92,255,0.10)' : 'transparent',
                  }}>
                    <span style={{ width: 52, color: 'rgba(150,160,200,0.4)', userSelect: 'none' }}>{li + 1}</span>
                    <span>
                      {renderLine(li, inLine)}
                      {li === currentLine && (
                        <span style={{
                          display: 'inline-block', width: 15, height: 32, marginLeft: 2, verticalAlign: '-5px',
                          backgroundColor: cursorOn ? COLORS.cyan : 'transparent',
                          boxShadow: cursorOn ? `0 0 14px ${COLORS.cyan}` : 'none',
                        }} />
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* الطرفية */}
            <div dir="ltr" style={{
              borderTop: `1px solid ${COLORS.panelBorder}`, background: 'rgba(2,6,14,0.55)',
              padding: '20px 34px 26px', fontFamily: FONT_MONO, fontSize: 25, lineHeight: 1.6, minHeight: 150,
            }}>
              {termLines.map((l, i) => {
                const op = interpolate(frame, [l.at, l.at + 8], [0, 1], clampCfg);
                return <div key={i} style={{ color: l.color, opacity: op }}>{l.text}</div>;
              })}
            </div>
          </GlassCard>
        </div>
        {/* شريط حالة أسفل النافذة */}
        <div style={{ width: 1280, marginTop: 34, opacity: doneP, transform: `translateY(${(1 - doneP) * 26}px)` }}>
          <div dir="rtl" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip text="اكتمل المشروع ونُشر بنجاح" color={COLORS.green} fontSize={27} />
            <ProgressBar progress={interpolate(frame, [205, 245], [0.68, 1], clampCfg)} width={520} height={14} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
