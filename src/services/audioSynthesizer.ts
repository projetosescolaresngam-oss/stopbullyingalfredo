let audioCtx: AudioContext | null = null;

export const playBreathTone = (frequency: number, durationMs: number, enabled: boolean = true) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (durationMs / 1000));

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + (durationMs / 1000));
  } catch (err) {
    console.warn('[Web Audio] Tone playback error:', err);
  }
};

export const speakText = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.warn('[Web Speech] Error:', e);
    return false;
  }
};
