import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {CHAPTERS, CHAPTER_TIMING, FILM_DURATION, FPS, TRANSITION_FRAMES} from '../src/remotion/lib/film';

test('the six chapters export exactly 42 seconds at 30 fps', () => {
  assert.equal(CHAPTERS.length, 6);
  assert.equal(FILM_DURATION, 1260);
  assert.equal(FILM_DURATION / FPS, 42);
});

test('transition overlaps are counted once and every scene fits the canvas', () => {
  const sum = CHAPTERS.reduce((n, c) => n + c.duration, 0);
  assert.equal(sum - TRANSITION_FRAMES * (CHAPTERS.length - 1), FILM_DURATION);
  assert.equal(CHAPTER_TIMING[0].start, 0);
  for (let i = 1; i < CHAPTER_TIMING.length; i++) {
    assert.equal(CHAPTER_TIMING[i].start, CHAPTER_TIMING[i - 1].start + CHAPTERS[i - 1].duration - TRANSITION_FRAMES);
    assert.ok(CHAPTERS[i].duration > TRANSITION_FRAMES * 2);
  }
  assert.equal(CHAPTER_TIMING.at(-1)!.start + CHAPTERS.at(-1)!.duration, FILM_DURATION);
});

test('all brand SVGs and locally hosted font files exist', () => {
  const manifest = JSON.parse(readFileSync('public/icons/manifest.json', 'utf8')) as {slug: string}[];
  for (const {slug} of manifest) assert.ok(existsSync(`public/icons/${slug}.svg`), slug);
  for (const weight of [400, 500, 600, 700]) {
    for (const subset of ['arabic', 'latin']) assert.ok(existsSync(`public/fonts/ibm-plex-sans-arabic/ibm-plex-sans-arabic-${subset}-${weight}-normal.woff2`));
  }
  assert.ok(existsSync('public/fonts/space-grotesk/space-grotesk-latin-wght-normal.woff2'));
  assert.ok(existsSync('public/fonts/jetbrains-mono/jetbrains-mono-latin-wght-normal.woff2'));
});

test('Arabic reveals animate complete lines, never isolated letters', () => {
  const source = readFileSync('src/remotion/components/Design.tsx', 'utf8');
  assert.ok(source.includes('dir="rtl"'));
  assert.ok(source.includes('letterSpacing: 0'));
  assert.ok(source.includes('lines={lines}'));
  assert.ok(!source.includes("split('')"));
});

test('original soundtrack has the exact film duration and a valid PCM header', () => {
  const audio = readFileSync('public/audio/arena-score.wav');
  assert.equal(audio.toString('ascii', 0, 4), 'RIFF');
  assert.equal(audio.toString('ascii', 8, 12), 'WAVE');
  assert.equal(audio.readUInt16LE(22), 2);
  assert.equal(audio.readUInt32LE(24), 48000);
  const samples = audio.readUInt32LE(40) / 4;
  assert.equal(samples / 48000, FILM_DURATION / FPS);
});
