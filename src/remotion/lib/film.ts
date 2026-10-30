export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TRANSITION_FRAMES = 15;

export const CHAPTERS = [
  {id: 'spark', title: 'الشرارة', english: 'THE SPARK', duration: 180, color: '#151917'},
  {id: 'understand', title: 'نفهم الفكرَة', english: 'UNDERSTAND', duration: 210, color: '#EFEDE5'},
  {id: 'build', title: 'نبني بالكود', english: 'BUILD', duration: 240, color: '#151917'},
  {id: 'craft', title: 'نصنع الحركة', english: 'CRAFT', duration: 240, color: '#FF5A36'},
  {id: 'deliver', title: 'نراجع ونسلّم', english: 'DELIVER', duration: 210, color: '#EFEDE5'},
  {id: 'together', title: 'فكرتك القادمة', english: 'WHAT’S NEXT?', duration: 255, color: '#151917'},
] as const;

let cursor = 0;
export const CHAPTER_TIMING = CHAPTERS.map((chapter, index) => {
  const start = cursor;
  cursor += chapter.duration - (index < CHAPTERS.length - 1 ? TRANSITION_FRAMES : 0);
  return {...chapter, start, seconds: start / FPS};
});

export const FILM_DURATION = cursor;
export const FILM_SECONDS = FILM_DURATION / FPS;

export const COLORS = {
  ink: '#151917',
  paper: '#EFEDE5',
  orange: '#FF5A36',
  muted: '#A5ADA5',
  line: '#343B35',
  lime: '#D5EF86',
} as const;

export const FONT = {
  ar: 'IBM Plex Sans Arabic',
  display: 'Space Grotesk',
  mono: 'JetBrains Mono',
} as const;
