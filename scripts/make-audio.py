"""توليد موسيقى خلفية + مؤثرات انتقال (whoosh) برمجياً بـ numpy — بدون أي أصول خارجية.
الناتج: public/audio/music.wav + public/audio/whoosh.wav
التشغيل: python3 scripts/make-audio.py
"""
import numpy as np
import wave, struct, os

SR = 44100
DUR = 67.0  # أطول قليلاً من الفيديو (~66s)، يُقتص في ريموشن
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUT_DIR, exist_ok=True)


def save_wav(path: str, stereo: np.ndarray) -> None:
    stereo = np.clip(stereo, -1.0, 1.0)
    pcm = (stereo * 32767).astype(np.int16)
    with wave.open(path, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print("saved", path, f"({len(stereo)/SR:.1f}s)")


def pad_chord(freqs, dur, t0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    y = np.zeros(n)
    for i, f in enumerate(freqs):
        # جزئيات هارمونية متناقصة = صوت دافئ
        y += 0.55 * np.sin(2 * np.pi * f * t + i * 0.7)
        y += 0.22 * np.sin(2 * np.pi * f * 2 * t + i)
        y += 0.08 * np.sin(2 * np.pi * f * 3 * t)
    # هجوم/تحرر بطيء + نبض خفيف
    env = np.minimum(1, np.minimum(t / 1.2, (dur - t) / 1.2))
    env = np.clip(env, 0, 1) ** 1.5
    pulse = 0.85 + 0.15 * np.sin(2 * np.pi * 0.5 * (t + t0))
    return y * env * pulse / max(len(freqs), 1)


def make_music() -> np.ndarray:
    n = int(DUR * SR)
    y = np.zeros(n)
    # تقدّم وتري Am - F - C - G (كل وتر 4 ثوانٍ مع تداخل)
    chords = [
        [110.00, 164.81, 220.00, 261.63],  # Am:  A2 E3 A3 C4
        [87.31, 174.61, 220.00, 261.63],   # F:   F2 F3 A3 C4
        [130.81, 196.00, 261.63, 329.63],  # C:   C3 G3 C4 E4
        [98.00, 196.00, 246.94, 293.66],   # G:   G2 G3 B3 D4
    ]
    step = 4.0
    tcur, ci = 0.0, 0
    while tcur < DUR:
        seg = pad_chord(chords[ci % 4], step + 1.0, tcur)  # ثانية تداخل إضافية
        s = int(tcur * SR)
        e = min(n, s + len(seg))
        y[s:e] += seg[: e - s]
        tcur += step
        ci += 1
    # نبض باس خفيف كل ثانية (طاقة بدون إزعاج التعليق الصوتي)
    for beat in np.arange(0.5, DUR, 1.0):
        s = int(beat * SR)
        blen = int(0.22 * SR)
        t = np.arange(blen) / SR
        kick = np.sin(2 * np.pi * (90 - 40 * t / 0.22) * t) * np.exp(-t * 14) * 0.5
        e = min(n, s + blen)
        y[s:e] += kick[: e - s]
    # ستيريو: إزاحة طور بسيطة لليمين لعرضٍ صوتي أوسع
    yr = np.roll(y, int(0.008 * SR)) * 0.96
    stereo = np.stack([y, yr], axis=1)
    # تطبيع + تلاشي دخول/خروج
    stereo /= np.max(np.abs(stereo)) + 1e-9
    stereo *= 0.5
    t = np.arange(n) / SR
    fade = np.clip(np.minimum(t / 1.0, (DUR - t) / 3.0), 0, 1)
    return stereo * fade[:, None]


def make_whoosh() -> np.ndarray:
    dur = 0.6
    n = int(dur * SR)
    rng = np.random.default_rng(42)
    noise = rng.standard_normal(n)
    # مرشّح تمرير منخفض بقطبية واحدة مع مسح ترددي صاعد ثم هابط
    y = np.zeros(n)
    state = 0.0
    sweep = np.sin(np.pi * np.arange(n) / n) ** 2  # 0 -> 1 -> 0
    for i in range(n):
        alpha = 0.02 + 0.5 * sweep[i]
        state += alpha * (noise[i] - state)
        y[i] = state
    env = np.sin(np.pi * np.arange(n) / n) ** 1.5
    y *= env
    y /= np.max(np.abs(y)) + 1e-9
    # بانوراما: يسار -> يمين
    pan = np.arange(n) / n
    left = y * (1 - pan * 0.7)
    right = y * (0.3 + pan * 0.7)
    return np.stack([left, right], axis=1) * 0.7


def convert_music_to_mp3() -> None:
    """حوّل music.wav إلى music.mp3 (أصغر للمستودع) إن وُجد ffmpeg."""
    import glob, shutil, subprocess
    wav = os.path.join(OUT_DIR, "music.wav")
    mp3 = os.path.join(OUT_DIR, "music.mp3")
    ff = shutil.which("ffmpeg")
    if not ff:  # ffmpeg المرافق لحزمة Remotion compositor
        cands = glob.glob(os.path.join(os.path.dirname(__file__), "..",
                                       "node_modules/@remotion/compositor-*/ffmpeg"))
        ff = cands[0] if cands else None
    if ff:
        subprocess.run([ff, "-y", "-v", "error", "-i", wav,
                        "-codec:a", "libmp3lame", "-b:a", "128k", mp3], check=True)
        os.remove(wav)
        print("converted ->", mp3)
    else:
        print("ffmpeg غير متاح: أبقِ music.wav وحدّث مرجعه في src/Video.tsx")


if __name__ == "__main__":
    save_wav(os.path.join(OUT_DIR, "music.wav"), make_music())
    save_wav(os.path.join(OUT_DIR, "whoosh.wav"), make_whoosh())
    convert_music_to_mp3()
