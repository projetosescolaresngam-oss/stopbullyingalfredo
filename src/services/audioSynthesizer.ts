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

let isSpeakingState = false;
let isPausedState = false;

export const speakText = (
  text: string, 
  onEnd?: () => void,
  onStart?: () => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  try {
    window.speechSynthesis.cancel();
    isSpeakingState = false;
    isPausedState = false;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      isSpeakingState = true;
      isPausedState = false;
      onStart?.();
    };

    utterance.onend = () => {
      isSpeakingState = false;
      isPausedState = false;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('[Web Speech] Error:', e);
      isSpeakingState = false;
      isPausedState = false;
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (e) {
    console.warn('[Web Speech] Error:', e);
    return false;
  }
};

export const pauseSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      isPausedState = true;
    }
  }
};

export const resumeSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      isPausedState = false;
    }
  }
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    isSpeakingState = false;
    isPausedState = false;
  }
};

export const getSpeechStatus = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return { speaking: false, paused: false };
  }
  return {
    speaking: window.speechSynthesis.speaking,
    paused: window.speechSynthesis.paused
  };
};
