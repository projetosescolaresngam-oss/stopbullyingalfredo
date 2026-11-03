import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type FontSizeLevel = 'normal' | 'large' | 'extralarge' | 'huge';
export type LetterSpacingLevel = 'normal' | 'wide';

export interface AccessibilityPreferences {
  fontSize: FontSizeLevel;
  highContrast: boolean;
  dyslexiaFont: boolean;
  readingRuler: boolean;
  readingMask: boolean;
  reducedMotion: boolean;
  vlibrasActive: boolean;
  letterSpacing: LetterSpacingLevel;
  soundVisualClues: boolean;
  speechRate: number; // 0.8 a 1.2
}

export const DEFAULT_ACCESSIBILITY_PREFERENCES: AccessibilityPreferences = {
  fontSize: 'normal',
  highContrast: false,
  dyslexiaFont: false,
  readingRuler: false,
  readingMask: false,
  reducedMotion: false,
  vlibrasActive: false,
  letterSpacing: 'normal',
  soundVisualClues: true,
  speechRate: 1.0
};

const STORAGE_KEY = 'stopbullying_acessibilidade_prefs_v2';

export const loadAccessibilityPreferences = (): AccessibilityPreferences => {
  if (typeof window === 'undefined') return DEFAULT_ACCESSIBILITY_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_ACCESSIBILITY_PREFERENCES;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_ACCESSIBILITY_PREFERENCES, ...parsed };
  } catch (err) {
    console.warn('[Acessibilidade] Erro ao carregar preferências:', err);
    return DEFAULT_ACCESSIBILITY_PREFERENCES;
  }
};

export const saveAccessibilityPreferences = (prefs: AccessibilityPreferences): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.warn('[Acessibilidade] Erro ao salvar preferências:', err);
  }
};

export const applyAccessibilityDOM = (prefs: AccessibilityPreferences): void => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // Tamanho de Fonte
  root.setAttribute('data-font-size', prefs.fontSize);

  // Alto Contraste
  if (prefs.highContrast) {
    root.setAttribute('data-high-contrast', 'true');
    root.classList.add('high-contrast-mode');
  } else {
    root.removeAttribute('data-high-contrast');
    root.classList.remove('high-contrast-mode');
  }

  // Fonte Amigável para Dislexia
  if (prefs.dyslexiaFont) {
    root.setAttribute('data-dyslexia', 'true');
    root.classList.add('dyslexia-font-mode');
  } else {
    root.removeAttribute('data-dyslexia');
    root.classList.remove('dyslexia-font-mode');
  }

  // Redução de Movimento / Animações
  if (prefs.reducedMotion) {
    root.setAttribute('data-reduced-motion', 'true');
    root.classList.add('reduced-motion-mode');
  } else {
    root.removeAttribute('data-reduced-motion');
    root.classList.remove('reduced-motion-mode');
  }

  // Espaçamento de Letras
  root.setAttribute('data-letter-spacing', prefs.letterSpacing);
  if (prefs.letterSpacing === 'wide') {
    root.classList.add('wide-letter-spacing');
  } else {
    root.classList.remove('wide-letter-spacing');
  }
};

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakContent = (
  text: string, 
  rate: number = 1.0, 
  onStart?: () => void, 
  onEnd?: () => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    window.speechSynthesis.cancel();
    if (!text || text.trim().length === 0) return false;

    const cleanText = text
      .replace(/[*#_~`>]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = Math.max(0.6, Math.min(1.4, rate));

    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt-BR') || v.lang.startsWith('pt'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('[Acessibilidade Fala] Evento de erro ou cancelamento:', e);
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('[Acessibilidade Fala] Falha na síntese de voz:', err);
    return false;
  }
};

export const stopSpeech = (): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  } catch (err) {
    console.warn('[Acessibilidade Fala] Erro ao parar fala:', err);
  }
};

export const isSpeaking = (): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
};

export const extractMainContentText = (): string => {
  if (typeof document === 'undefined') return '';

  const mainArea = document.querySelector('main') || document.querySelector('#root');
  if (!mainArea) return '';

  const elements = mainArea.querySelectorAll('h1, h2, h3, h4, p, label, blockquote, [data-speech-readable]');
  const texts: string[] = [];

  elements.forEach((el) => {
    if (el.closest('.accessibility-toolbar') || el.closest('[aria-hidden="true"]')) return;
    const t = (el.textContent || '').trim();
    if (t.length > 2 && !texts.includes(t)) {
      texts.push(t);
    }
  });

  return texts.slice(0, 40).join('. ');
};

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  isSpeaking: boolean;
  isToolbarOpen: boolean;
  openToolbar: () => void;
  closeToolbar: () => void;
  toggleToolbar: () => void;
  setFontSize: (size: FontSizeLevel) => void;
  cycleFontSize: () => void;
  toggleHighContrast: () => void;
  toggleDyslexiaFont: () => void;
  toggleReadingRuler: () => void;
  toggleReadingMask: () => void;
  toggleReducedMotion: () => void;
  toggleVLibras: () => void;
  toggleLetterSpacing: () => void;
  setSpeechRate: (rate: number) => void;
  speakText: (text: string) => void;
  speakCurrentPage: () => void;
  stopReading: () => void;
  resetPreferences: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(loadAccessibilityPreferences);
  const [speakingState, setSpeakingState] = useState<boolean>(false);
  const [isToolbarOpen, setIsToolbarOpen] = useState<boolean>(false);

  useEffect(() => {
    applyAccessibilityDOM(preferences);
    saveAccessibilityPreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    const handleStorage = () => {
      const reloaded = loadAccessibilityPreferences();
      setPreferences(reloaded);
      applyAccessibilityDOM(reloaded);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

      if (e.altKey) {
        if (e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          setIsToolbarOpen(prev => !prev);
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          if (speakingState) {
            stopSpeech();
            setSpeakingState(false);
          } else {
            const pageText = extractMainContentText();
            if (pageText) {
              setSpeakingState(true);
              speakContent(
                pageText, 
                preferences.speechRate, 
                () => setSpeakingState(true), 
                () => setSpeakingState(false)
              );
            }
          }
        } else if (e.key === 'c' || e.key === 'C') {
          e.preventDefault();
          setPreferences(prev => ({ ...prev, highContrast: !prev.highContrast }));
        } else if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          setPreferences(prev => ({ ...prev, readingRuler: !prev.readingRuler }));
        }
      }

      if (e.key === 'Escape' && isToolbarOpen) {
        setIsToolbarOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isToolbarOpen, speakingState, preferences.speechRate]);

  const openToolbar = useCallback(() => setIsToolbarOpen(true), []);
  const closeToolbar = useCallback(() => setIsToolbarOpen(false), []);
  const toggleToolbar = useCallback(() => setIsToolbarOpen(prev => !prev), []);

  const setFontSize = useCallback((size: FontSizeLevel) => {
    setPreferences(prev => ({ ...prev, fontSize: size }));
  }, []);

  const cycleFontSize = useCallback(() => {
    setPreferences(prev => {
      const order: FontSizeLevel[] = ['normal', 'large', 'extralarge', 'huge'];
      const currentIndex = order.indexOf(prev.fontSize);
      const nextIndex = (currentIndex + 1) % order.length;
      return { ...prev, fontSize: order[nextIndex] };
    });
  }, []);

  const toggleHighContrast = useCallback(() => {
    setPreferences(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const toggleDyslexiaFont = useCallback(() => {
    setPreferences(prev => ({ ...prev, dyslexiaFont: !prev.dyslexiaFont }));
  }, []);

  const toggleReadingRuler = useCallback(() => {
    setPreferences(prev => ({ 
      ...prev, 
      readingRuler: !prev.readingRuler,
      readingMask: false
    }));
  }, []);

  const toggleReadingMask = useCallback(() => {
    setPreferences(prev => ({ 
      ...prev, 
      readingMask: !prev.readingMask,
      readingRuler: false
    }));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setPreferences(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  }, []);

  const toggleVLibras = useCallback(() => {
    setPreferences(prev => ({ ...prev, vlibrasActive: !prev.vlibrasActive }));
  }, []);

  const toggleLetterSpacing = useCallback(() => {
    setPreferences(prev => ({
      ...prev,
      letterSpacing: prev.letterSpacing === 'normal' ? 'wide' : 'normal'
    }));
  }, []);

  const setSpeechRate = useCallback((rate: number) => {
    setPreferences(prev => ({ ...prev, speechRate: rate }));
  }, []);

  const speakText = useCallback((text: string) => {
    stopSpeech();
    setSpeakingState(true);
    speakContent(
      text, 
      preferences.speechRate, 
      () => setSpeakingState(true), 
      () => setSpeakingState(false)
    );
  }, [preferences.speechRate]);

  const speakCurrentPage = useCallback(() => {
    if (speakingState) {
      stopSpeech();
      setSpeakingState(false);
      return;
    }
    const text = extractMainContentText();
    if (text) {
      setSpeakingState(true);
      speakContent(
        text, 
        preferences.speechRate, 
        () => setSpeakingState(true), 
        () => setSpeakingState(false)
      );
    }
  }, [speakingState, preferences.speechRate]);

  const stopReading = useCallback(() => {
    stopSpeech();
    setSpeakingState(false);
  }, []);

  const resetPreferences = useCallback(() => {
    stopSpeech();
    setSpeakingState(false);
    setPreferences(DEFAULT_ACCESSIBILITY_PREFERENCES);
    applyAccessibilityDOM(DEFAULT_ACCESSIBILITY_PREFERENCES);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        isSpeaking: speakingState,
        isToolbarOpen,
        openToolbar,
        closeToolbar,
        toggleToolbar,
        setFontSize,
        cycleFontSize,
        toggleHighContrast,
        toggleDyslexiaFont,
        toggleReadingRuler,
        toggleReadingMask,
        toggleReducedMotion,
        toggleVLibras,
        toggleLetterSpacing,
        setSpeechRate,
        speakText,
        speakCurrentPage,
        stopReading,
        resetPreferences
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility deve ser utilizado dentro de um AccessibilityProvider.');
  }
  return context;
};
