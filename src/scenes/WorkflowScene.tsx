/**
 * المشهد 6 (V2) — لوحة كانبان حقيقية من RemotionUI (KanbanMove):
 * البطاقات تُرفع وتنحني عبر الأعمدة. الأعمدة معكوسة عمداً في المصفوفة
 * ليبدأ السير من اليمين (الفكرة) إلى اليسار (النشر) كما يُقرأ العربي.
 */
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { KanbanMove } from '../remotionui/scenes/kanban-move';
import { RichBackdrop, SectionTitle, PopIn, WhiteCard } from '../ui/primitives';
import { COLORS, PANELS } from '../lib/theme';
import { FONT_BODY, FONT_MONO } from '../lib/fonts';

export const WorkflowScene: React.FC = () => (
  <AbsoluteFill>
    <RichBackdrop seed={27} />
    <KanbanMove
      theme="light"
      backgroundColor="transparent"
      accentColor="#7C5CFF"
      moveSeconds={1.7}
      dealStaggerSeconds={0.11}
      columns={['النشر', 'الاختبار', 'التنفيذ', 'الفكرة']}
      cards={[
        { title: 'متجر إلكتروني', meta: 'ARENA-1 · فكرتك', column: 3, tint: '#F59E0B', moveTo: 2, moveAtSeconds: 2.6 },
        { title: 'أفكار قادمة', meta: 'BACKLOG', column: 3, tint: '#2F7CF6' },
        { title: 'بحث السوق', meta: 'RESEARCH', column: 3, tint: '#0FA8D8' },
        { title: 'بناء الواجهات', meta: 'ARENA-2 · الوكيل', column: 2, tint: '#7C5CFF', moveTo: 1, moveAtSeconds: 6.2 },
        { title: 'الهوية البصرية', meta: 'DESIGN', column: 2, tint: '#F43F5E' },
        { title: 'قاعدة البيانات', meta: 'DATABASE', column: 2, tint: '#F59E0B' },
        { title: 'تشغيل ومراجعة', meta: 'QA · الوكيل', column: 1, tint: '#0FA8D8', moveTo: 0, moveAtSeconds: 9.8 },
        { title: 'صقل التفاصيل', meta: 'POLISH', column: 1, tint: '#0DBE86' },
        { title: 'اختبار الأداء', meta: 'PERF', column: 1, tint: '#7C5CFF' },
        { title: 'النسخة التجريبية', meta: 'v0.9 · LIVE', column: 0, tint: '#12C48B' },
        { title: 'صفحة الهبوط', meta: 'v1.0 · LIVE', column: 0, tint: '#F43F5E' },
      ]}
    />
    {/* عنوان المشهد */}
    <div style={{ position: 'absolute', top: 36, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <SectionTitle kicker="رحلة مشروعك" panel={PANELS[3]} title="من الفكرة الأولى… حتى النشر" delay={4} titleSize={52} />
    </div>
    {/* شارة الفرع في الختام */}
    <div style={{ position: 'absolute', bottom: 132, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <PopIn delay={336}>
        <WhiteCard radius={999} accent={COLORS.green} style={{
          padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 13,
        }}>
          <span style={{
            width: 12, height: 12, borderRadius: '50%', background: COLORS.green,
            boxShadow: `0 0 0 5px ${PANELS[3].tint}`,
          }} />
          <span dir="ltr" style={{ fontFamily: FONT_MONO, fontSize: 21, fontWeight: 700, color: COLORS.ink }}>
            branch: arena/2cbd23d6-a-project
          </span>
          <span dir="rtl" style={{ fontFamily: FONT_BODY, fontSize: 21, fontWeight: 500, color: COLORS.ink2 }}>
            كل تعديل محفوظ — تراه لحظةً بلحظة
          </span>
        </WhiteCard>
      </PopIn>
    </div>
  </AbsoluteFill>
);
