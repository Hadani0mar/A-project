#!/usr/bin/env python3
"""Original, deterministic 42-second score. No samples or third-party music.

Run with Python 3 + numpy. The arrangement follows the film's six chapters:
0, 5.5, 12, 19.5, 27, 33.5 seconds. 120 BPM; D minor / F major color.
"""
from pathlib import Path
import json
import math
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
SR = 48000
DURATION = 42.0
N = int(SR * DURATION)
rng = np.random.default_rng(817)
mix = np.zeros((N, 2), dtype=np.float64)
TAU = 2 * np.pi
cuts = [0.0, 5.5, 12.0, 19.5, 27.0, 33.5]


def add(signal, start, gain=1.0, pan=0.0):
    i = int(round(start * SR))
    if i < 0:
        signal = signal[-i:]
        i = 0
    count = min(len(signal), N - i)
    if count <= 0:
        return
    angle = (pan + 1) * np.pi / 4
    mix[i:i + count, 0] += signal[:count] * gain * np.cos(angle)
    mix[i:i + count, 1] += signal[:count] * gain * np.sin(angle)


def time(length):
    return np.arange(int(length * SR)) / SR


def note(midi):
    return 440 * 2 ** ((midi - 69) / 12)


def envelope(t, attack, length, release):
    return np.minimum(t / max(attack, 0.001), 1) * np.minimum(np.maximum(length - t, 0) / release, 1)


def pluck(midi, length=1.2, bright=1.0):
    t = time(length)
    f = note(midi)
    sound = np.sin(TAU * f * t) + 0.30 * bright * np.sin(TAU * f * 2.002 * t) + 0.11 * bright * np.sin(TAU * f * 3.001 * t)
    sound *= np.exp(-t * 5.4) * np.minimum(t / 0.006, 1)
    sound *= np.minimum((length - t) / 0.08, 1)
    return sound


def pad(midis, length):
    t = time(length)
    env = envelope(t, 0.7, length, 1.2)
    left = np.zeros_like(t)
    right = np.zeros_like(t)
    for midi in midis:
        f = note(midi)
        left += np.sin(TAU * f * 0.9985 * t) + 0.15 * np.sin(TAU * f * 2 * t)
        right += np.sin(TAU * f * 1.0015 * t + 0.18) + 0.15 * np.sin(TAU * f * 2.001 * t)
    breath = 0.88 + 0.12 * np.sin(TAU * 0.23 * t)
    return np.stack([left * env * breath, right * env * breath], axis=1)


def kick():
    t = time(0.38)
    phase = TAU * (46 * t + 85 * 0.027 * (1 - np.exp(-t / 0.027)))
    body = np.sin(phase) * np.exp(-t * 13)
    click = rng.normal(0, 1, len(t)) * np.exp(-t * 180) * 0.065
    return (body + click) * np.minimum(t / 0.002, 1)


def hat(open_hat=False):
    length = 0.18 if open_hat else 0.065
    t = time(length)
    noise = rng.normal(0, 1, len(t))
    high = noise - np.convolve(noise, np.ones(9) / 9, mode='same')
    return high * np.exp(-t * (24 if open_hat else 75)) * np.minimum(t / 0.001, 1)


def snare():
    t = time(0.22)
    noise = rng.normal(0, 1, len(t))
    low = np.convolve(noise, np.ones(5) / 5, mode='same')
    return (low * 0.7 + np.sin(TAU * 185 * t) * 0.25) * np.exp(-t * 24) * np.minimum(t / 0.002, 1)


def bass(midi, length=0.42):
    t = time(length)
    f = note(midi)
    sound = np.sin(TAU * f * t) + 0.18 * np.sin(TAU * f * 2 * t)
    return sound * envelope(t, 0.014, length, 0.12) * np.exp(-t * 2.2)


def whoosh(length=0.6):
    t = time(length)
    noise = rng.normal(0, 1, len(t))
    smooth = np.convolve(noise, np.ones(31) / 31, mode='same')
    env = np.sin(np.pi * t / length) ** 2
    return smooth * env


# Evolving harmony: Dm9 → Bbmaj7 → Fadd9 → Csus2.
chords = [[50, 57, 60, 64, 69], [46, 53, 57, 60, 65], [41, 53, 57, 60, 67], [48, 55, 60, 62, 67]]
for i, start in enumerate(np.arange(0, 40, 4.0)):
    chord = chords[i % len(chords)]
    stereo_pad = pad([n + 12 for n in chord], 5.2)
    level = 0.018 if start < 12 else 0.023
    if start >= 32:
        level = 0.026
    add(stereo_pad[:, 0], start, level, -0.55)
    add(stereo_pad[:, 1], start, level, 0.55)

# A restrained, memorable five-note motif, varied by chapter.
motif = [74, 77, 81, 79, 77, 72, 74, 69]
for beat in range(84):
    start = beat * 0.5
    chapter = sum(start >= c for c in cuts) - 1
    if beat % 2 == 0 or chapter in (2, 3):
        midi = motif[(beat // 2) % len(motif)]
        if 12 <= start < 16:
            midi -= 12
        gain = 0.055 if chapter in (0, 4) else 0.071
        if chapter == 5:
            gain = 0.05
        pan = -0.35 if beat % 4 == 0 else 0.35
        sound = pluck(midi, bright=0.65)
        add(sound, start, gain, pan)
        add(sound, start + 0.375, gain * 0.23, -pan)
        add(sound, start + 0.75, gain * 0.09, pan)

# Groove enters gradually, leaves space for the question and the final hold.
kick_sound = kick()
snare_sound = snare()
for beat in range(80):
    start = beat * 0.5
    if start < 5.5:
        if beat % 4 == 0:
            add(kick_sound, start, 0.19)
    elif start < 12:
        if beat % 4 == 0:
            add(kick_sound, start, 0.14)
    elif start < 33.5:
        add(kick_sound, start, 0.27 if beat % 2 == 0 else 0.18)
        if beat % 2 == 1:
            add(snare_sound, start, 0.105, 0.08)
    elif start < 38:
        if beat % 4 == 0:
            add(kick_sound, start, 0.19)
    if 5.5 <= start < 33.5:
        add(hat(), start + 0.25, 0.035, -0.35 if beat % 2 else 0.35)
        if 19.5 <= start < 27:
            add(hat(beat % 4 == 3), start, 0.024, 0.3)

roots = [38, 34, 41, 36]
for beat in range(24, 67):
    start = beat * 0.5
    if beat % 2 == 0:
        root = roots[int(start // 4) % 4]
        add(bass(root), start + 0.01, 0.14)

# Soft reverse-air transitions and a tuned impact at every editorial cut.
for i, cut in enumerate(cuts):
    if cut > 0:
        add(whoosh(0.65), cut - 0.48, 0.17, -0.25 if i % 2 else 0.25)
        add(pluck(62 if i % 2 else 50, 1.7, 0.4), cut, 0.12)
    else:
        add(pluck(74, 2.0, 0.4), 0.08, 0.095, -0.2)

# Small UI ticks are original synthesized transients, not recorded samples.
for tick in np.arange(12.65, 15.3, 0.095):
    t = time(0.022)
    sound = np.sin(TAU * (1300 + 140 * np.sin(tick * 9)) * t) * np.exp(-t * 210)
    add(sound, float(tick), 0.018, 0.15)

# Final D-major picardy lift: a warm, intentional resolution under the CTA.
final = pad([62, 69, 74, 78, 81], 6.0)
add(final[:, 0], 36.0, 0.021, -0.5)
add(final[:, 1], 36.0, 0.021, 0.5)
for i, midi in enumerate([74, 78, 81]):
    add(pluck(midi, 2.7, 0.4), 36.1 + i * 0.16, 0.07, -0.3 + i * 0.3)

# High-pass DC, gentle saturation, and bounded peak normalization.
mix -= np.mean(mix, axis=0, keepdims=True)
mix = np.tanh(mix * 1.35)
mix *= 0.78 / max(np.max(np.abs(mix)), 0.001)
fade_in = np.minimum(np.arange(N) / (SR * 0.08), 1)
fade_out = np.minimum((N - 1 - np.arange(N)) / (SR * 1.7), 1)
mix *= (fade_in * fade_out)[:, None]
pcm = np.round(np.clip(mix, -1, 1) * 32767).astype('<i2')
out = ROOT / 'public/audio/arena-score.wav'
out.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(out), 'wb') as f:
    f.setnchannels(2)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes(pcm.tobytes())

# Deterministic display peaks for the review interface, not fake audio analysis.
peaks = []
for block in np.array_split(np.max(np.abs(mix), axis=1), 96):
    peaks.append(round(float(np.max(block)), 4))
(ROOT / 'public/audio/peaks.json').write_text(json.dumps(peaks))
print(f'Original score: {out} | {DURATION:.1f}s | {SR} Hz stereo | peak {np.max(np.abs(mix)):.3f}')
