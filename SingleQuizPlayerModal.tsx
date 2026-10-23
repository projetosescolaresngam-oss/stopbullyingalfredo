import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { QuizItem, QUIZ_DIFFICULTY_LABELS } from '../../data/questionBank';
import { 
  recordQuizCompletion, 
  isQuizCompleted, 
  getNextRecommendedQuiz 
} from '../../services/quizProgressionService';
import { recordSingleEvidence } from '../../services/competencies';
import { useApp } from '../../AppContext';
import { speakText } from '../../services/audioSynthesizer';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Volume2, 
  RotateCcw, 
  HelpCircle, 
  Award, 
  BookOpen,
  Scale,
  Brain,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface SingleQuizPlayerModalProps {
  quiz: QuizItem;
  onClose: () => void;
  onSelectNextQuiz?: (nextQuiz: QuizItem) => void;
}

export const SingleQuizPlayerModal: React.FC<SingleQuizPlayerModalProps> = ({
  quiz: initialQuiz,
  onClose,
  onSelectNextQuiz
}) => {
  const { studentIdentity, awardXp, recordQuizCompleted } = useApp();
  const studentKey = studentIdentity?.studentSeed || studentIdentity?.code || 'anonimo_padrao';

  const [currentQuiz, setCurrentQuiz] = useState<QuizItem>(initialQuiz);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [wasAlreadyCompleted, setWasAlreadyCompleted] = useState<boolean>(() => {
    return isQuizCompleted(initialQuiz.id, studentKey);
  });
  const [xpAwardedThisTurn, setXpAwardedThisTurn] = useState<number>(0);

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll suave que centraliza o card do quiz perfeitamente na área visível da tela assim que ele abre
  useEffect(() => {
    const performSmoothCenter = () => {
      const card = modalCardRef.current;
      const overlay = modalOverlayRef.current;

      if (!card) return;

      // 1. Centralização vertical dentro do próprio container com scroll (o overlay do modal)
      if (overlay) {
        const overlayHeight = overlay.clientHeight;
        const cardHeight = card.offsetHeight;

        if (cardHeight < overlayHeight - 32) {
          // Card cabe confortavelmente na tela: centraliza perfeitamente no centro vertical
          const targetScroll = Math.max(0, card.offsetTop - (overlayHeight - cardHeight) / 2);
          overlay.scrollTo({ top: targetScroll, behavior: 'smooth' });
        } else {
          // Em celulares e telas menores onde o card é mais longo:
          // alinha no topo com margem de segurança de 16px para não cortar o topo nem os botões
          overlay.scrollTo({ top: Math.max(0, card.offsetTop - 16), behavior: 'smooth' });
        }
      }

      // 2. Garante que se houver qualquer deslocamento na página ou viewport principal,
      // a tela execute o scroll suave centralizado até o card sem movimento brusco
      try {
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      } catch {
        try {
          card.scrollIntoView(true);
        } catch {
          // Fallback seguro
        }
      }
    };

    // Dispara em múltiplos momentos para acomodar montagem, fade-in, renderização de fontes e dimensões do DOM
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
  }, [currentQuiz]);

  // Embaralha opções ou mantém originais
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setWasAlreadyCompleted(isQuizCompleted(currentQuiz.id, studentKey));
    setXpAwardedThisTurn(0);
  }, [currentQuiz, studentKey]);

  const diffInfo = QUIZ_DIFFICULTY_LABELS[currentQuiz.dificuldade];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);

    const isCorrect = index === currentQuiz.correta;

    // Registra a conclusão e concede XP se for a primeira vez
    const result = recordQuizCompletion(currentQuiz.id, studentKey, isCorrect ? 100 : 0, [index]);

    // Alimenta o Diagnóstico Formativo Avançado por Competência
    recordSingleEvidence(studentKey, {
      activityId: currentQuiz.id,
      activityTitle: currentQuiz.titulo,
      origin: 'quiz_banco',
      competency: currentQuiz.competencia,
      difficulty: currentQuiz.dificuldade,
      weight: currentQuiz.dificuldade === 'facil' ? 1.0 : currentQuiz.dificuldade === 'medio' ? 1.5 : currentQuiz.dificuldade === 'dificil' ? 2.2 : 3.0,
      isCorrect,
      scoreRatio: isCorrect ? 1.0 : 0.0,
      category: currentQuiz.categoria
    });

    if (result.isFirstCompletion && isCorrect) {
      setXpAwardedThisTurn(result.xpEarned);
      awardXp(result.xpEarned, `Quiz superado: ${currentQuiz.titulo}`);
      recordQuizCompleted(100, 1);
    } else {
      setXpAwardedThisTurn(0);
      if (isCorrect) {
        recordQuizCompleted(100, 1);
      }
    }
  };

  const handleAdvanceToNext = () => {
    const nextQuiz = getNextRecommendedQuiz(studentKey, { preferredDifficulty: currentQuiz.dificuldade });
    if (nextQuiz) {
      if (onSelectNextQuiz) {
        onSelectNextQuiz(nextQuiz);
      }
      setCurrentQuiz(nextQuiz);
    } else {
      onClose();
    }
  };

  const handleSpeak = (text: string) => {
    speakText(text);
  };

  // Mapeia justificativas incorretas
  // Opções incorretas na ordem em que aparecem
  const incorrectIndices = [0, 1, 2, 3].filter(idx => idx !== currentQuiz.correta);

  const modalContent = (
    <div 
      ref={modalOverlayRef}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onClick={(e) => {
        if (e.target === modalOverlayRef.current) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalCardRef}
        className="bg-[#0e0722] border-2 border-purple-500/50 rounded-[28px] sm:rounded-[36px] max-w-3xl w-full p-0 shadow-[0_0_50px_rgba(147,51,234,0.35)] relative my-auto sm:my-4 text-white max-h-[92vh] flex flex-col overflow-hidden"
      >
        
        {/* Topo do Modal */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#1c063b] via-[#2a0852] to-[#451070] border-b border-purple-400/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-xs ${diffInfo.bg} ${diffInfo.color} ${diffInfo.border}`}>
              {diffInfo.badge}
            </span>

            <span className="px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/40 text-purple-200 text-xs font-mono font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              +{currentQuiz.xpRecompensa} XP
            </span>

            {wasAlreadyCompleted && (
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold">
                ✓ Concluído Anteriormente
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSpeak(`${currentQuiz.titulo}. ${currentQuiz.enunciado}`)}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Ouvir em Voz Alta"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo com Scroll Suave */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#090416]">
          
          {/* Título e Categoria */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentQuiz.categoria.replace('_', ' ')} • {currentQuiz.competencia}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display leading-snug">
              {currentQuiz.titulo}
            </h2>
          </div>

          {/* Contexto Narrativo (quando aplicável) */}
          {currentQuiz.contexto && (
            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs sm:text-sm italic leading-relaxed">
              <strong className="text-amber-300 font-bold not-italic">Contexto: </strong>
              {currentQuiz.contexto}
            </div>
          )}

          {/* Enunciado Principal */}
          <div className="p-4 rounded-2xl bg-[#140833] border border-purple-500/20 text-white text-sm sm:text-base font-medium leading-relaxed shadow-inner">
            {currentQuiz.enunciado}
          </div>

          {/* 4 Alternativas */}
          <div className="space-y-3 pt-1">
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider block">
              Selecione a resposta correta:
            </span>

            {currentQuiz.opcoes.map((opcao, index) => {
              const letter = String.fromCharCode(65 + index); // A, B, C, D
              const isSelected = selectedOption === index;
              const isCorrect = index === currentQuiz.correta;

              let btnStyle = 'bg-[#150a30] border-purple-500/30 hover:bg-[#200e47] hover:border-purple-400/60 text-white';
              
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-2 ring-emerald-500/50';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.3)]';
                } else {
                  btnStyle = 'bg-[#0f0622] border-white/10 text-gray-400 opacity-60';
                }
              }

              return (
                <button
                  key={index}
                  disabled={isAnswerSubmitted}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-black text-xs flex-shrink-0 mt-0.5 ${
                    isAnswerSubmitted && isCorrect
                      ? 'bg-emerald-500 text-black'
                      : isAnswerSubmitted && isSelected && !isCorrect
                      ? 'bg-rose-500 text-white'
                      : 'bg-purple-900/60 text-purple-200 border border-purple-400/40'
                  }`}>
                    {letter}
                  </span>

                  <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                    {opcao}
                  </span>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  )}

                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Seção de Feedback Detalhado após Envio */}
          {isAnswerSubmitted && (
            <div className="space-y-4 pt-2 animate-fadeIn">
              
              {/* Banner de XP Conquistado ou Revisão */}
              {xpAwardedThisTurn > 0 ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-600/30 via-purple-600/30 to-amber-600/30 border-2 border-amber-400 text-center space-y-1 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                  <div className="flex items-center justify-center gap-2 text-amber-300 font-display font-black text-lg sm:text-xl">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>+{xpAwardedThisTurn} XP Conquistado com Sucesso!</span>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>
                  <p className="text-xs text-amber-200">
                    Primeira conclusão deste desafio registrada em seu perfil seguro.
                  </p>
                </div>
              ) : selectedOption === currentQuiz.correta ? (
                <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Resposta Correta! (Revisão Educativa: o XP principal deste quiz já foi computado anteriormente).</span>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <span>Não foi desta vez, mas o erro faz parte do aprendizado! Veja a explicação completa abaixo.</span>
                </div>
              )}

              {/* Explicação da Resposta Correta */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#13072b] border border-purple-400/40 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Explicação Educativa do Gabarito:</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {currentQuiz.explicacao}
                </p>
                <div className="pt-2 text-[11px] text-purple-300 font-mono flex items-center gap-1.5 border-t border-purple-500/20">
                  <Scale className="w-3.5 h-3.5 text-purple-400" />
                  <span>Fundamentação: {currentQuiz.referencia}</span>
                </div>
              </div>

              {/* Por que as outras alternativas não são as melhores? (Item 2) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#110526] border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-300 text-xs font-black uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>Por que as outras alternativas não são as melhores?</span>
                </div>

                <div className="space-y-2.5">
                  {incorrectIndices.map((incIdx, i) => {
                    const letter = String.fromCharCode(65 + incIdx);
                    const justText = currentQuiz.justificativaIncorretas[i] || 'Alternativa conceitualmente incorreta ou insuficiente perante os fatos.';

                    return (
                      <div key={incIdx} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                        <span className="text-[11px] font-black text-rose-400 flex items-center gap-1">
                          Alternativa ({letter}):
                        </span>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {justText}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Rodapé com Ações */}
        <div className="p-4 sm:p-5 bg-[#0a0418] border-t border-purple-500/20 flex items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white font-bold text-xs cursor-pointer transition-all"
          >
            Fechar Janela
          </button>

          {isAnswerSubmitted && (
            <button
              onClick={handleAdvanceToNext}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer transition-all"
            >
              <span>Próximo Desafio Inédito</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};
