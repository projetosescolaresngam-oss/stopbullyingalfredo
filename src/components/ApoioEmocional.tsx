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
          color: 'text-blue-400',
          circleClass: 'scale-125 shadow-[0_0_50px_rgba(59,130,246,0.8)] bg-gradient-to-br from-blue-500 to-indigo-600',
          duration: '4s'
        };
      case 2:
        return {
          label: 'Segure o ar nos pulmões...',
          color: 'text-amber-400',
          circleClass: 'scale-125 shadow-[0_0_50px_rgba(245,158,11,0.8)] bg-gradient-to-br from-amber-500 to-orange-600',
          duration: '7s'
        };
      case 3:
        return {
          label: 'Solte o ar bem devagar pela boca...',
          color: 'text-emerald-400',
          circleClass: 'scale-90 shadow-[0_0_30px_rgba(16,185,129,0.6)] bg-gradient-to-br from-emerald-500 to-teal-600',
          duration: '8s'
        };
      default:
        return {
          label: 'Pronto para começar o ciclo relaxante 4-7-8',
          color: 'text-gray-300',
          circleClass: 'scale-100 shadow-[0_0_20px_rgba(59,130,246,0.4)] bg-gradient-to-br from-blue-600 to-slate-800',
          duration: ''
        };
    }
  };

  const currentDetails = getBreathPhaseDetails();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <HeartHandshake className="w-6 h-6 text-emerald-400" />
              Apoio Emocional &amp; Saúde Mental
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Espaço de acolhimento, respiração antiestresse e apoio com canais 24h
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: 4-7-8 Breathing Engine */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121724] border border-blue-500/30 shadow-2xl flex flex-col items-center text-center space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
              Técnica Científica 4-7-8
            </span>
            <h3 className="font-display text-lg font-bold text-white">
              Respiração Guiada Anti-ansiedade
            </h3>
            <p className="text-xs text-gray-400 max-w-sm">
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
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                Iniciar Respiração
              </button>
            ) : (
              <button
                onClick={stopBreathing}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 transition-all cursor-pointer"
              >
                <Pause className="w-4 h-4" />
                Pausar Respiração
              </button>
            )}

            <button
              onClick={() => setBreathSound(!breathSound)}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 transition-all cursor-pointer"
              title={breathSound ? 'Desativar sons' : 'Ativar sons sintetizados'}
            >
              {breathSound ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Right Column: Quotes & 24h Hotlines */}
        <div className="space-y-6">
          
          {/* Motivational Quote Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-[#121724] to-black border border-emerald-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Mensagem de Acolhimento
              </span>
              <span className="text-[11px] text-gray-400 font-mono">
                {quoteIndex + 1}/{FRASES_MOTIVACIONAIS.length}
              </span>
            </div>

            <blockquote className="text-base sm:text-lg italic text-emerald-100 font-medium leading-relaxed">
              "{FRASES_MOTIVACIONAIS[quoteIndex]}"
            </blockquote>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={handleNextQuote}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 text-xs font-bold transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Nova Mensagem
              </button>

              <button
                onClick={handleSpeakQuote}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 text-xs font-bold transition-all cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Ouvir por Voz
              </button>
            </div>
          </div>

          {/* Emergency Helpline Contacts */}
          <div className="p-6 rounded-3xl bg-[#121724] border border-white/10 shadow-xl space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">
              Canais Gratuitos e Anônimos 24h:
            </h4>

            <div className="space-y-3">
              {MATERIAIS_APOIO.map((mat) => (
                <div
                  key={mat.id}
                  className="p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{mat.icone}</span>
                    <div>
                      <h5 className="text-xs font-bold text-white flex items-center gap-2">
                        {mat.titulo}
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-normal">
                          {mat.categoria}
                        </span>
                      </h5>
                      <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">
                        {mat.conteudo}
                      </p>
                    </div>
                  </div>

                  {mat.link_externo && (
                    <a
                      href={mat.link_externo}
                      target={mat.link_externo.startsWith('tel:') ? '_self' : '_blank'}
                      rel="noreferrer"
                      className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
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
