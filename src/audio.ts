let ctx: AudioContext | null = null;
let jinglePlayed = false;
let lastSpoken = '';
let lastSpokenAt = 0;

function audio(): AudioContext | null {
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  try {
    if (!ctx) ctx = new Ctx();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function unlockAudio() {
  audio();
}

function tone(
  ac: AudioContext,
  freq: number,
  at: number,
  dur: number,
  type: OscillatorType,
  gain = 0.07,
) {
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  amp.gain.setValueAtTime(gain, at);
  amp.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(amp);
  amp.connect(ac.destination);
  osc.start(at);
  osc.stop(at + dur + 0.02);
}

function running() {
  const ac = audio();
  if (!ac || ac.state !== 'running') return null;
  return ac;
}

export function playJingle() {
  if (jinglePlayed) return true;
  const ac = audio();
  if (!ac || ac.state !== 'running') return false;
  jinglePlayed = true;
  const song = [523, 587, 659, 784, 659, 784, 1046, 784, 1046];
  const start = ac.currentTime + 0.02;
  song.forEach((freq, index) => {
    tone(ac, freq, start + index * 0.24, 0.32, 'triangle', 0.06);
  });
  return true;
}

export function playChime() {
  const ac = running();
  if (!ac) return;
  const start = ac.currentTime;
  tone(ac, 784, start, 0.18, 'sine', 0.07);
  tone(ac, 1046, start + 0.08, 0.28, 'sine', 0.06);
  tone(ac, 1318, start + 0.16, 0.34, 'triangle', 0.04);
}

export function playVictory() {
  const ac = running();
  if (!ac) return;
  const start = ac.currentTime;
  [523, 659, 784, 1046].forEach((freq, index) => {
    tone(ac, freq, start + index * 0.1, 0.28, 'triangle', 0.06);
  });
}

export function playLevelUp() {
  const ac = running();
  if (!ac) return;
  const start = ac.currentTime;
  [523, 659, 784, 1046, 1318].forEach((freq, index) => {
    tone(ac, freq, start + index * 0.12, 0.34, 'triangle', 0.07);
  });
  tone(ac, 1568, start + 0.62, 0.45, 'sine', 0.05);
}

export function playTryAgain() {
  const ac = running();
  if (!ac) return;
  const start = ac.currentTime;
  tone(ac, 494, start, 0.16, 'sine', 0.05);
  tone(ac, 392, start + 0.14, 0.22, 'sine', 0.045);
}

export function playPop() {
  const ac = running();
  if (!ac) return;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(420, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ac.currentTime + 0.12);
  amp.gain.setValueAtTime(0.06, ac.currentTime);
  amp.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.16);
  osc.connect(amp);
  amp.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.18);
}

export function playTick() {
  const ac = running();
  if (!ac) return;
  tone(ac, 660, ac.currentTime, 0.08, 'square', 0.03);
}

export function playWhoosh() {
  const ac = running();
  if (!ac) return;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(620, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, ac.currentTime + 0.35);
  amp.gain.setValueAtTime(0.05, ac.currentTime);
  amp.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.38);
  osc.connect(amp);
  amp.connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.4);
}

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  return (
    voices.find((voice) => voice.lang === 'pt-BR') ||
    voices.find((voice) => voice.lang?.toLowerCase().startsWith('pt')) ||
    null
  );
}

export function hush() {
  window.speechSynthesis?.cancel();
}

export function speak(text: string) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  const now = Date.now();
  if (text === lastSpoken && now - lastSpokenAt < 700) return;
  lastSpoken = text;
  lastSpokenAt = now;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.94;
  utterance.pitch = 1.18;
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  synth.speak(utterance);
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.getVoices();
}
