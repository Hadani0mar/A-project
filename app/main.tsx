import React, {useRef, useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, type PlayerRef} from '@remotion/player';
import {ArenaFilm} from '../src/remotion/ArenaFilm';
import {CHAPTER_TIMING, FILM_DURATION, FPS, WIDTH, HEIGHT} from '../src/remotion/lib/film';
import {ArenaMark} from '../src/remotion/components/Design';

import './styles.css';

const repo = 'https://github.com/Hadani0mar/A-project';
const branch = 'arena/8eaa0339-a-project';
const filmUrl = '/deliverables/arena-agent-film.mp4';

function App() {
  const player = useRef<PlayerRef>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [interactive, setInteractive] = useState(false);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [peaks, setPeaks] = useState<number[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/audio/peaks.json', {signal: controller.signal})
      .then(response => response.json())
      .then(setPeaks)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const p = player.current;
    if (!p) return;
    const update = () => {
      const frame = p.getCurrentFrame();
      setProgress(frame / FILM_DURATION);
      const chapter = CHAPTER_TIMING.findLastIndex(c => frame >= c.start);
      setActive(Math.max(0, chapter));
    };
    const play = () => setPlaying(true);
    const pause = () => setPlaying(false);
    p.addEventListener('frameupdate', update);
    p.addEventListener('play', play);
    p.addEventListener('pause', pause);
    p.addEventListener('ended', pause);
    return () => {
      p.removeEventListener('frameupdate', update);
      p.removeEventListener('play', play);
      p.removeEventListener('pause', pause);
      p.removeEventListener('ended', pause);
    };
  }, [interactive]);

  const seek = (index: number) => {
    setActive(index);
    const frame = CHAPTER_TIMING[index].start + 1;
    if (interactive) player.current?.seekTo(frame);
    else if (video.current) video.current.currentTime = frame / FPS;
  };

  return <div className="site-shell">
    <header className="site-header">
      <a className="brand" href="#" aria-label="Arena film home"><ArenaMark size={36}/><span>arena<span className="muted">.ai</span></span></a>
      <div className="header-center"><span className="status-dot"/> AGENT MODE <span className="header-divider">/</span> MOTION STUDY 001</div>
      <a className="repo-link" dir="ltr" href={`${repo}/tree/${branch}`} target="_blank" rel="noreferrer">Source code <span>↗</span></a>
    </header>

    <main>
      <section className="intro">
        <div><div className="eyebrow orange">فيلم تعريفي · صُنع بالكود</div><h1>الأفكار، <span>تصير واقع.</span></h1></div>
        <p>تعرّف على مساعد Arena.<br/>من أول سؤال، إلى آخر لقطة.</p>
      </section>

      <section className="screening-room" aria-label="مشاهدة الفيلم">
        <div className="screen-toolbar">
          <div className="screen-label"><span className="status-dot"/> THE SCREENING ROOM</div>
          <div className="mode-switch" aria-label="طريقة العرض">
            <button className={!interactive ? 'selected' : ''} onClick={() => {setInteractive(false); setPlaying(false);}}>الفيلم النهائي</button>
            <button className={interactive ? 'selected' : ''} onClick={() => {setInteractive(true); setPlaying(false);}}>معاينة Remotion</button>
          </div>
        </div>
        <div className="film-stage" dir="ltr">
          {interactive ? <Player ref={player} component={ArenaFilm} initialFrame={45} durationInFrames={FILM_DURATION} fps={FPS} compositionWidth={WIDTH} compositionHeight={HEIGHT} controls loop style={{width: '100%', aspectRatio: '16 / 9'}} acknowledgeRemotionLicense autoPlay={false}/> : <video ref={video} controls playsInline preload="metadata" poster="/poster.jpg" src={filmUrl} onTimeUpdate={() => {const v = video.current; if (!v) return; setProgress(v.currentTime / 42); setActive(Math.max(0, CHAPTER_TIMING.findLastIndex(c => v.currentTime >= c.seconds)));}} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="فيلم عن مساعد Arena، 42 ثانية بالعربية"/>}
        </div>
        <div className="waveform" aria-hidden="true">{peaks.map((peak, i) => <i key={i} className={i / peaks.length <= progress ? 'passed' : ''} style={{height: `${5 + peak * 23}px`}}/>)}</div>
        <div className="film-meta"><span><strong>06</strong> فصول</span><span><strong>42</strong> ثانية</span><span><strong>1080p</strong> دقة كاملة</span><span><strong>30</strong> إطار / ثانية</span><span className="music-note">موسيقى أصلية <span className={playing ? 'music-light on' : 'music-light'}/> 120 BPM</span></div>
      </section>

      <section className="chapters-section" aria-label="فصول الفيلم">
        <div className="section-heading"><h2>كل فكرة، لها لقطة.</h2><span className="eyebrow">EXPLORE THE FILM</span></div>
        <div className="chapters">{CHAPTER_TIMING.map((chapter, i) => <button key={chapter.id} onClick={() => seek(i)} className={`chapter ${active === i ? 'active' : ''}`} aria-current={active === i ? 'step' : undefined}>
          <div className="chapter-top"><span className="chapter-number">0{i + 1}</span><span className="chapter-time" dir="ltr">{String(Math.floor(chapter.seconds / 60)).padStart(2, '0')}:{String(Math.floor(chapter.seconds % 60)).padStart(2, '0')}</span></div>
          <div className="chapter-swatch" style={{background: chapter.color}}><span style={{color: i === 1 || i === 4 ? '#151917' : i === 3 ? '#151917' : '#FF5A36'}}>{['✳', '↳', '</>', 'Aa', '↗', '✳'][i]}</span><i/></div>
          <h3>{chapter.title}</h3><span className="chapter-en">{chapter.english}</span>
        </button>)}</div>
      </section>

      <section className="behind-section">
        <div className="behind-title"><div className="eyebrow orange">BEHIND THE FRAMES</div><h2>موش مجرد فيديو.<br/>مشروع كامل، بين إيديك.</h2><p>كل لقطة مبنية بمكونات React. كل حركة محسوبة بالإطار. عدّل النص، الألوان، والتوقيت وصدّر نسختك.</p><a className="primary-button" href={filmUrl} download="arena-agent-film.mp4">نزّل الفيلم <span>↓</span></a></div>
        <div className="build-details">
          <div><span className="detail-index">01</span><div><h3>Remotion + RemotionUI</h3><p>تركيب مشاهد، انتقالات، أقنعة نصية، حركة فيزيائية، ورسم مسارات SVG.</p></div></div>
          <div><span className="detail-index">02</span><div><h3>عربي أولًا، بتفاصيل مدروسة</h3><p>IBM Plex Arabic مع Space Grotesk. حروف متصلة، اتجاه صحيح، وقراءة مريحة.</p></div></div>
          <div><span className="detail-index">03</span><div><h3>الصوت من الكود بعد</h3><p>لحن إلكتروني أصلي، إيقاع متدرّج، ومؤثرات متزامنة مع الانتقالات.</p></div></div>
          <a className="source-link" href={`${repo}/tree/${branch}/src/remotion`} target="_blank" rel="noreferrer">استكشف السورس كود <span>↗</span></a>
        </div>
      </section>
    </main>
    <footer><span>صُنع بالفضول. وبـ Remotion.</span><span dir="ltr">ARENA ASSISTANT / IDEAS INTO REALITY</span><a href={`${repo}/blob/${branch}/docs/RESEARCH.md`} target="_blank" rel="noreferrer">مصادر التصميم ↗</a></footer>
  </div>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
