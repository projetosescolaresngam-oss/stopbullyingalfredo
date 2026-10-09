import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  QuizChallenge, 
  ChallengeDifficulty 
} from '../../data/centralRespeitoData';
import { 
  ChallengeUserProgress,
  checkIsChallengeUnlocked 
} from '../../utils/centralRespeitoStorage';
import { X, Play, RotateCcw, Lock } from 'lucide-react';

interface ChallengeModalProps {
  challenge: QuizChallenge | null;
  progressMap: Record<string, ChallengeUserProgress>;
  onClose: () => void;
  onStart: (challenge: QuizChallenge) => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  challenge,
  progressMap,
  onClose,
  onStart,
}) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  // Efeito de rolagem automática suave para centralizar o card na área visível da tela assim que ele surge
  useEffect(() => {
    if (!challenge) return;

    const performSmoothCenter = () => {
      const card = modalCardRef.current;
      const overlay = modalOverlayRef.current;

      if (overlay && card) {
        const overlayHeight = overlay.clientHeight;
        const cardHeight = card.offsetHeight;

        if (cardHeight < overlayHeight - 24) {
          // Centralização vertical matemática precisa dentro da área visível do overlay
          const targetScroll = Math.max(0, card.offsetTop - (overlayHeight - cardHeight) / 2);
          overlay.scrollTo({ top: targetScroll, behavior: 'smooth' });
        } else {
          // Em telas menores/celulares onde o card é mais longo, posiciona com margem de respiro no topo para não cortar
          overlay.scrollTo({ top: Math.max(0, card.offsetTop - 16), behavior: 'smooth' });
        }
      }
    };

    // Múltiplos momentos para acomodar abertura, fade-in, renderização de fontes e pintura do DOM
    const rafId = requestAnimationFrame(performSmoothCenter);
    const t1 = setTimeout(performSmoothCenter, 30);
    const t2 = setTimeout(performSmoothCenter, 100);
    const t3 = setTimeout(performSmoothCenter, 250);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [challenge]);

  if (!challenge) return null;

  const progress = progressMap[challenge.id];
  const unlockStatus = checkIsChallengeUnlocked(challenge, progressMap);
  const isLocked = !unlockStatus.isUnlocked;

  const getDifficultyBadge = (diff: ChallengeDifficulty) => {
    switch (diff) {
      case 'dificil':
        return { label: 'DIFÍCIL', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'muito_dificil':
        return { label: 'MUITO DIFÍCIL', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'desafio':
        return { label: 'DESAFIO', color: 'bg-rose-100 text-rose-800 border-rose-300' };
      case 'supremo':
        return { label: 'SUPREMO', color: 'bg-purple-100 text-purple-900 border-purple-400 font-black' };
    }
  };

  const diffBadge = getDifficultyBadge(challenge.dificuldade);

  // Renderizado via portal diretamente em document.body para evitar qualquer interferência de transforms em ancestrais
  return createPortal(
    <div 
      ref={modalOverlayRef}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onClick={(e) => {
        if (e.target === modalOverlayRef.current) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalCardRef}
        className="w-full max-w-lg rounded-3xl bg-[#13182b] border-2 border-purple-400 shadow-[0_0_50px_rgba(168,85,247,0.35)] text-white p-5 sm:p-7 space-y-5 sm:space-y-6 relative overflow-hidden my-auto flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Topo do Modal */}
        <div className="flex items-start gap-4">
          <span className="text-4xl p-3 rounded-2xl bg-white/10 border border-white/20 shadow-md flex-shrink-0">
            {challenge.icone}
          </span>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${diffBadge.color}`}>
                {diffBadge.label}
              </span>
              <span className="text-[11px] font-mono font-bold text-purple-200 bg-purple-700/60 border border-purple-400/50 px-2 py-0.5 rounded-md">
                +{challenge.xpRecompensa} XP
              </span>
            </div>
            <h3 className="font-display font-black text-xl text-white leading-snug">
              {challenge.titulo}
            </h3>
            <p className="text-xs text-purple-200 font-medium">
              {challenge.subtitulo}
            </p>
          </div>
        </div>

        {/* Descrição Detalhada */}
        <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-2 text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
          <span className="font-bold text-amber-300 block">Objetivo Pedagógico do Nó:</span>
          {challenge.descricao}
        </div>

        {/* Estatísticas do Nó */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-xl bg-white/10 border border-white/20">
            <span className="text-[10px] text-purple-200 font-bold block">Formato</span>
            <span className="text-xs font-black text-white">
              {challenge.questoesCount} {challenge.tipo === 'historia_interativa' ? 'Atos' : 'Questões'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/20">
            <span className="text-[10px] text-purple-200 font-bold block">Duração</span>
            <span className="text-xs font-black text-white">~{challenge.tempoMedioMinutos} min</span>
          </div>
          <div className="p-3 rounded-xl bg-white/10 border border-white/20">
            <span className="text-[10px] text-purple-200 font-bold block">Aproveitamento</span>
            <span className="text-xs font-black text-emerald-300 font-mono">
              {progress?.completed ? `${progress.bestPercent}%` : 'Não iniciado'}
            </span>
          </div>
        </div>

        {/* Mensagem de Bloqueio ou CTA */}
        {isLocked ? (
          <div className="p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-400 text-rose-100 text-xs leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-300">
              <Lock className="w-4 h-4" />
              <span>Nó Bloqueado Temporariamente</span>
            </div>
            <p>{unlockStatus.reason}</p>
          </div>
        ) : (
          <button
            onClick={() => {
              onClose();
              onStart(challenge);
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-purple-600/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
          >
            {progress?.completed ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Jogar Novamente este Nó</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Iniciar Desafio</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};
