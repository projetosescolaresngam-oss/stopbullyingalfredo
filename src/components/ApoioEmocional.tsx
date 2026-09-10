import React, { useState, useEffect, useRef } from 'react';
import { FRASES_MOTIVACIONAIS, MATERIAIS_APOIO } from '../data/initialData';
import { playBreathTone, speakText } from '../services/audioSynthesizer';
import { 
  HeartHandshake, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Play, 
  Pause, 
  PhoneCall, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

interface ApoioEmocionalProps {
  onBack: () => void;
}

export const ApoioEmocional: React.FC<ApoioEmocionalProps> = ({ onBack }) => {
  // Breathing state: 0 = Idle, 1 = Inhale (4s), 2 = Hold (7s), 3 = Exhale (8s)
  const [breathPhase, setBreathPhase] = useState<0 | 1 | 2 | 3>(0);
  const [breathSeconds, setBreathSeconds] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathSound, setBreathSound] = useState(true);

  // Motivational Quote State
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Timer Ref for Breathing Cycle
  const breathTimerRef = useRef<number | null>(null);

  const startBreathing = () => {
    setIsBreathingActive(true);
    setBreathPhase(1);
    setBreathSeconds(4);
    playBreathTone(440, 2000, breathSound); // Inhale tone A4
  };

  const stopBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase(0);
    setBreathSeconds(0);
    if (breathTimerRef.current) clearInterval(breathTimerRef.current);
  };

  useEffect(() => {
    if (!isBreathingActive) return;

    breathTimerRef.current = window.setInterval(() => {
      setBreathSeconds((prevSec) => {
        if (prevSec > 1) {
          return prevSec - 1;
        }

        // Transition to next phase
        setBreathPhase((currentPhase) => {
          if (currentPhase === 1) {
            // After Inhale (4s) -> Hold (7s)
            playBreathTone(523.25, 1200, breathSound); // C5
            setBreathSeconds(7);
            return 2;
          } else if (currentPhase === 2) {
            // After Hold (7s) -> Exhale (8s)
            playBreathTone(329.63, 3000, breathSound); // E4
            setBreathSeconds(8);
            return 3;
          } else {
            // After Exhale (8s) -> Inhale (4s)
            playBreathTone(440, 2000, breathSound); // A4
            setBreathSeconds(4);
            return 1;
          }
        });

        return 0;
      });
    }, 1000);

    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [isBreathingActive, breathSound]);

  const handleNextQuote = () => {
    const nextIdx = (quoteIndex + 1) % FRASES_MOTIVACIONAIS.length;
    setQuoteIndex(nextIdx);
  };

  const handleSpeakQuote = () => {
    speakText(FRASES_MOTIVACIONAIS[quoteIndex]);
  };

  const getBreathPhaseDetails = () => {
    switch (breathPhase) {
      case 1:
        return {
          label: 'Inspire suavemente pelo nariz...',
          color: 'text-purple-700',
          circleClass: 'scale-125 shadow-[0_0_40px_rgba(147,51,234,0.45)] bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600',
          duration: '4s'
        };
      case 2:
        return {
          label: 'Segure o ar nos pulmões...',
          color: 'text-amber-700',
          circleClass: 'scale-125 shadow-[0_0_40px_rgba(245,158,11,0.45)] bg-gradient-to-br from-amber-400 to-orange-500',
          duration: '7s'
        };
      case 3:
        return {
          label: 'Solte o ar bem devagar pela boca...',
          color: 'text-emerald-700',
          circleClass: 'scale-90 shadow-[0_0_30px_rgba(16,185,129,0.35)] bg-gradient-to-br from-emerald-400 to-teal-500',
          duration: '8s'
        };
      default:
        return {
          label: 'Pronto para começar o ciclo relaxante 4-7-8',
          color: 'text-[#5c546d]',
          circleClass: 'scale-100 shadow-[0_4px_20px_rgba(147,51,234,0.25)] bg-gradient-to-br from-purple-500 to-indigo-600',
          duration: ''
        };
    }
  };

  const currentDetails = getBreathPhaseDetails();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn text-[#241e33]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-200/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-[#241e33] flex items-center gap-2">
              <HeartHandshake className="w-6 h-6 text-emerald-600" />
              Apoio Emocional &amp; Saúde Mental
            </h2>
            <p className="text-xs sm:text-sm text-[#5c546d]">
              Espaço de acolhimento, respiração antiestresse e apoio com canais 24h
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: 4-7-8 Breathing Engine */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-purple-200/80 shadow-[0_4px_20px_rgba(124,58,237,0.06)] flex flex-col items-center text-center space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black text-purple-700 uppercase tracking-wider">
              Técnica Científica 4-7-8
            </span>
            <h3 className="font-display text-lg font-bold text-[#241e33]">
              Respiração Guiada Anti-ansiedade
            </h3>
            <p className="text-xs text-[#5c546d] max-w-sm">
              Inspirar por 4 segundos, reter o ar por 7 segundos e expirar suavemente por 8 segundos para acalmar o sistema nervoso.
            </p>
          </div>

          {/* Interactive Breathing Sphere */}
          <div className="py-6 flex flex-col items-center justify-center">
            <div
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center text-white font-display font-black text-center transition-all duration-1000 transform ${currentDetails.circleClass}`}
            >
              {isBreathingActive ? (
                <>
                  <span className="text-3xl font-mono">{breathSeconds}s</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-90">
                    {breathPhase === 1 ? 'Inspirar' : breathPhase === 2 ? 'Segurar' : 'Expirar'}
                  </span>
                </>
              ) : (
                <span className="text-base font-extrabold tracking-wide">Respira</span>
              )}
            </div>
            
            <div className={`mt-5 font-bold text-sm sm:text-base ${currentDetails.color} min-h-[1.5rem]`}>
              {currentDetails.label}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-xs">
            {!isBreathingActive ? (
              <button
                onClick={startBreathing}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-500/25 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Iniciar Respiração
              </button>
            ) : (
              <button
                onClick={stopBreathing}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/25 transition-all cursor-pointer"
              >
                <Pause className="w-4 h-4" />
                Pausar Respiração
              </button>
            )}

            <button
              onClick={() => setBreathSound(!breathSound)}
              className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 transition-all cursor-pointer"
              title={breathSound ? 'Desativar sons' : 'Ativar sons sintetizados'}
            >
              {breathSound ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-[#786e8a]" />}
            </button>
          </div>
        </div>

        {/* Right Column: Quotes & 24h Hotlines */}
        <div className="space-y-6">
          
          {/* Motivational Quote Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/70 via-white to-purple-50/50 border border-emerald-200/80 shadow-[0_4px_20px_rgba(16,185,129,0.06)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Mensagem de Acolhimento
              </span>
              <span className="text-[11px] text-[#786e8a] font-mono">
                {quoteIndex + 1}/{FRASES_MOTIVACIONAIS.length}
              </span>
            </div>

            <blockquote className="text-base sm:text-lg italic text-[#241e33] font-medium leading-relaxed">
              "{FRASES_MOTIVACIONAIS[quoteIndex]}"
            </blockquote>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={handleNextQuote}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 text-xs font-bold transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Nova Mensagem
              </button>

              <button
                onClick={handleSpeakQuote}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 text-xs font-bold transition-all cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Ouvir por Voz
              </button>
            </div>
          </div>

          {/* Emergency Helpline Contacts */}
          <div className="p-6 rounded-3xl bg-white/90 border border-purple-200/80 shadow-[0_4px_20px_rgba(124,58,237,0.06)] space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-purple-900">
              Canais Gratuitos e Anônimos 24h:
            </h4>

            <div className="space-y-3">
              {MATERIAIS_APOIO.map((mat) => (
                <div
                  key={mat.id}
                  className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 hover:border-purple-300 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{mat.icone}</span>
                    <div>
                      <h5 className="text-xs font-bold text-[#241e33] flex items-center gap-2">
                        {mat.titulo}
                        <span className="text-[10px] bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-semibold">
                          {mat.categoria}
                        </span>
                      </h5>
                      <p className="text-[11px] text-[#5c546d] mt-0.5 line-clamp-2">
                        {mat.conteudo}
                      </p>
                    </div>
                  </div>

                  {mat.link_externo && (
                    <a
                      href={mat.link_externo}
                      target={mat.link_externo.startsWith('tel:') ? '_self' : '_blank'}
                      rel="noreferrer"
                      className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      {mat.link_externo.startsWith('tel:') ? (
                        <>
                          <PhoneCall className="w-3.5 h-3.5" />
                          Ligar
                        </>
                      ) : (
                        <>
                          <ExternalLink className="w-3.5 h-3.5" />
                          Acessar
                        </>
                      )}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
