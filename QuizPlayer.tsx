import React, { useState, useEffect, useMemo, useRef } from 'react';
import { QuizChallenge, QuizQuestion, ChallengeDifficulty } from '../../data/centralRespeitoData';
import { speakText, playBreathTone } from '../../services/audioSynthesizer';
import { useAutoScrollIntoView } from '../../hooks/useAutoScrollIntoView';
import { AnswerRecord } from './QuizReviewModal';
import { 
  ArrowLeft, 
  Volume2, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  HelpCircle,
  Scale,
  Award,
  Zap,
  Clock,
  ShieldAlert,
  Brain,
  AlertTriangle
} from 'lucide-react';

interface QuizPlayerProps {
  challenge: QuizChallenge;
  onBack: () => void;
  onFinish: (records: AnswerRecord[], score: number, maxStreak: number, bonusXp: number) => void;
}

interface ShuffledQuestion {
  original: QuizQuestion;
  shuffledOpcoes: string[];
  correctIndexInShuffled: number;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  challenge,
  onBack,
  onFinish
}) => {
  const rawQuestions = challenge.questoes || [];

  // Embaralha as perguntas e as alternativas a cada nova tentativa para evitar memorização mecânica
  const shuffledQuestions: ShuffledQuestion[] = useMemo(() => {
    // Clona e embaralha as perguntas
    const qs = [...rawQuestions].sort(() => Math.random() - 0.5);

    return qs.map((q) => {
      const correctText = q.opcoes[q.correta];
      // Clona e embaralha as 4 alternativas
      const shuffled = [...q.opcoes].sort(() => Math.random() - 0.5);
      const newCorrectIdx = shuffled.indexOf(correctText);

      return {
        original: q,
        shuffledOpcoes: shuffled,
        correctIndexInShuffled: newCorrectIdx
      };
    });
  }, [challenge]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [records, setRecords] = useState<AnswerRecord[]>([]);

  // Sistema de Sequência (Streak / Combos)
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [bonusXpAccumulated, setBonusXpAccumulated] = useState(0);
  const [streakNotification, setStreakNotification] = useState<string | null>(null);

  // Modo Temporizador Tático (Pressão de Tempo)
  const [isTimerEnabled, setIsTimerEnabled] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(45);

  const cardRef = useRef<HTMLDivElement>(null);
  const explanationRef = useAutoScrollIntoView({ active: showExplanation, delay: 60, block: 'nearest' });
  const currentItem = shuffledQuestions[currentIndex];

  // Auto-scroll suave que centraliza o card do quiz perfeitamente na tela no carregamento e a cada questão
  useEffect(() => {
    const performSmoothCenter = () => {
      const card = cardRef.current;
      if (card) {
        const rect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardHeight = rect.height;
        
        // Se o card couber na viewport com margem de segurança, centraliza verticalmente com precisão matemática
        if (cardHeight < viewportHeight - 60) {
          const extraSpace = (viewportHeight - cardHeight) / 2;
          const targetY = Math.max(0, window.scrollY + rect.top - extraSpace);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        } else {
          // Em celulares e telas menores onde o card é mais longo, alinha o topo com margem de respiro de 16px para não cortar
          const targetY = Math.max(0, window.scrollY + rect.top - 16);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

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
  }, [currentIndex]);

  // Efeito do Temporizador Tático
  useEffect(() => {
    if (!isTimerEnabled || showExplanation || selectedOption !== null) return;

    if (secondsRemaining <= 0) {
      // Tempo esgotado!
      handleSelectOption(-1);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerEnabled, secondsRemaining, showExplanation, selectedOption]);

  // Reseta o temporizador para 45s a cada nova questão
  useEffect(() => {
    setSecondsRemaining(45);
  }, [currentIndex, isTimerEnabled]);

  // Atalhos de teclado (A, B, C, D ou 1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showExplanation) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNext();
        }
        return;
      }

      if (selectedOption !== null) return;

      const key = e.key.toUpperCase();
      let selectedIdx: number | null = null;
      if (key === 'A' || key === '1') selectedIdx = 0;
      else if (key === 'B' || key === '2') selectedIdx = 1;
      else if (key === 'C' || key === '3') selectedIdx = 2;
      else if (key === 'D' || key === '4') selectedIdx = 3;

      if (selectedIdx !== null && selectedIdx < (currentItem?.shuffledOpcoes.length || 0)) {
        handleSelectOption(selectedIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, selectedOption, showExplanation, currentItem]);

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null || !currentItem) return;

    setSelectedOption(idx);
    setShowExplanation(true);

    const isCorrect = idx === currentItem.correctIndexInShuffled;

    // Atualiza Streak e Bônus
    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setMaxStreak((prev) => Math.max(prev, newStreak));

      try {
        playBreathTone(659, 120, true);
      } catch {
        // áudio silencioso se indisponível
      }

      // Notificação de Combo / Bônus
      if (newStreak === 3) {
        setBonusXpAccumulated((b) => b + 10);
        setStreakNotification('🔥 Sequência Iniciada! (3 seguidas • +10 XP)');
        setTimeout(() => setStreakNotification(null), 3000);
      } else if (newStreak === 5) {
        setBonusXpAccumulated((b) => b + 20);
        setStreakNotification('⚡ Em Chamas! (5 seguidas • +20 XP Bônus)');
        setTimeout(() => setStreakNotification(null), 3000);
      } else if (newStreak >= 8 && newStreak % 2 === 0) {
        setBonusXpAccumulated((b) => b + 30);
        setStreakNotification(`👑 Maestria Inabalável! (${newStreak} seguidas • +30 XP Super Bônus)`);
        setTimeout(() => setStreakNotification(null), 3000);
      }
    } else {
      setCurrentStreak(0);
      try {
        playBreathTone(330, 160, false);
      } catch {
        // silencioso
      }
    }

    // Registra a resposta para revisão pedagógica posterior
    const record: AnswerRecord = {
      question: currentItem.original,
      selectedOption: idx,
      isCorrect
    };

    setRecords((prev) => [...prev, record]);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);

    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Final do desafio! Se completou com modo tático ativo, concede bônus de +20 XP
      const timerBonus = isTimerEnabled ? 20 : 0;
      const finalBonus = bonusXpAccumulated + timerBonus;
      const correctCount = records.filter((r) => r.isCorrect).length + (selectedOption === currentItem.correctIndexInShuffled ? 0 : 0);
      onFinish(records, correctCount, maxStreak, finalBonus);
    }
  };

  const handleSpeak = () => {
    if (!currentItem) return;
    const opcoesText = currentItem.shuffledOpcoes
      .map((op, i) => `Opção ${String.fromCharCode(65 + i)}: ${op}`)
      .join('. ');
    const text = `${currentItem.original.pergunta}. ${opcoesText}`;
    speakText(text);
  };

  if (!currentItem) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhuma questão encontrada para este desafio.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl">
          Voltar à Central
        </button>
      </div>
    );
  }

  const isCurrentCorrect = selectedOption === currentItem.correctIndexInShuffled;
  const isTimeout = selectedOption === -1;
  const progressPercent = Math.round(((currentIndex + 1) / shuffledQuestions.length) * 100);

  const getDifficultyBadge = (diff: ChallengeDifficulty) => {
    switch (diff) {
      case 'dificil': 
        return { label: 'Nível Difícil • Análise Crítica', color: 'bg-amber-100 text-amber-950 border-amber-300' };
      case 'muito_dificil': 
        return { label: 'Nível Muito Difícil • Casos Reais', color: 'bg-orange-100 text-orange-950 border-orange-300' };
      case 'desafio': 
        return { label: 'Nível Desafio • Rigor Ético & Jurídico', color: 'bg-rose-100 text-rose-950 border-rose-300' };
      case 'supremo': 
        return { label: 'Nível Supremo • Alta Complexidade', color: 'bg-purple-100 text-purple-950 border-purple-400' };
      default: 
        return { label: 'Nível Avançado', color: 'bg-purple-100 text-purple-900 border-purple-200' };
    }
  };

  const diffBadge = getDifficultyBadge(challenge.dificuldade);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Notificação Flutuante de Combo */}
      {streakNotification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white font-black text-xs sm:text-sm shadow-2xl border border-white/60 animate-bounce flex items-center gap-2">
          <Flame className="w-4 h-4 fill-white" />
          <span>{streakNotification}</span>
        </div>
      )}

      {/* Topo do Quiz */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-200/70">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#241e33] border border-purple-200/80 shadow-xs transition-all cursor-pointer flex-shrink-0"
            title="Sair do Desafio"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded-md">
                {challenge.titulo}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider border px-2 py-0.5 rounded-md ${diffBadge.color}`}>
                {diffBadge.label}
              </span>
            </div>
            <h2 className="font-display text-base sm:text-lg font-black text-[#241e33]">
              Desafio de Alta Complexidade &amp; Discernimento
            </h2>
          </div>
        </div>

        {/* Indicadores de Streak, Temporizador Tático e Leitor de Voz */}
        <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
          {/* Alternador de Modo Tático */}
          <button
            onClick={() => {
              setIsTimerEnabled(!isTimerEnabled);
              setSecondsRemaining(45);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
              isTimerEnabled
                ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                : 'bg-white hover:bg-purple-50 text-purple-900 border-purple-200'
            }`}
            title={isTimerEnabled ? 'Desativar Temporizador Tático' : 'Ativar Temporizador Tático (45s por questão • Bônus +20 XP)'}
          >
            <Clock className={`w-3.5 h-3.5 ${isTimerEnabled ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Modo Tático:</span>
            <span className="font-mono">{isTimerEnabled ? `${secondsRemaining}s` : 'Off'}</span>
          </button>

          {currentStreak >= 2 && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs shadow-xs animate-pulse">
              <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
              <span>{currentStreak} seguidas!</span>
            </div>
          )}

          <button
            onClick={handleSpeak}
            className="p-2.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 shadow-xs transition-colors cursor-pointer"
            title="Ouvir questão e opções em voz alta"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold bg-purple-100 text-purple-900 border border-purple-200 px-3.5 py-1.5 rounded-full shadow-xs">
            {currentIndex + 1} / {shuffledQuestions.length}
          </span>
        </div>
      </div>

      {/* Barra de Tempo Tático (se ativado) */}
      {isTimerEnabled && !showExplanation && (
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold">
            <span className="flex items-center gap-1 text-rose-800">
              <Clock className="w-3.5 h-3.5 text-rose-600" />
              Tempo Restante: {secondsRemaining}s
            </span>
            <span className="text-slate-500">
              {secondsRemaining <= 10 ? '⚠️ Pouco tempo!' : 'Leia com atenção aos detalhes'}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                secondsRemaining <= 10 ? 'bg-rose-600 animate-pulse' : 'bg-amber-500'
              }`}
              style={{ width: `${Math.max(0, (secondsRemaining / 45) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Barra de Progresso do Desafio */}
      <div className="w-full bg-purple-200/50 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Card da Questão */}
      <div ref={cardRef} className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-purple-200/80 shadow-lg space-y-6">
        
        {/* Contexto do Caso (se houver) */}
        {currentItem.original.contexto && (
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs sm:text-sm text-[#2e263d] leading-relaxed italic">
            <span className="font-bold not-italic text-purple-900 flex items-center gap-1.5 mb-1">
              <Brain className="w-4 h-4 text-purple-700 not-italic" />
              Contexto do Caso Real / Situação Escolar:
            </span>
            {currentItem.original.contexto}
          </div>
        )}

        {/* Pergunta Principal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold text-[#5c546d] uppercase tracking-wider block">
              Questão #{currentIndex + 1} de {shuffledQuestions.length} • Competência: {currentItem.original.competencia.toUpperCase()}
            </span>
            <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold border border-purple-200">
              Análise Criteriosa
            </span>
          </div>
          <h3 className="font-display font-black text-base sm:text-lg lg:text-xl text-[#241e33] leading-snug">
            {currentItem.original.pergunta}
          </h3>
          <p className="text-[11px] text-slate-500 italic">
            Dica: Atente-se às nuances jurídicas e comportamentais. Distratores refletem armadilhas comuns do cotidiano escolar.
          </p>
        </div>

        {/* Grid de Alternativas: Com altura e estrutura equilibradas */}
        <div className="space-y-3 pt-1">
          {currentItem.shuffledOpcoes.map((opcao, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === currentItem.correctIndexInShuffled;
            const letter = String.fromCharCode(65 + idx);

            let styleClass = 'border-purple-200/80 bg-white hover:border-purple-400 hover:bg-purple-50/40 text-[#241e33]';

            if (showExplanation) {
              if (isCorrectOption) {
                styleClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
              } else if (isSelected && !isCorrectOption) {
                styleClass = 'border-rose-400 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-200';
              } else {
                styleClass = 'border-slate-200 bg-slate-50 text-slate-600 font-normal';
              }
            } else if (isSelected) {
              styleClass = 'border-purple-600 bg-purple-50 ring-2 ring-purple-300 text-purple-950 font-bold';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm transition-all border-2 flex items-start gap-3.5 cursor-pointer min-h-[58px] ${styleClass}`}
              >
                {/* Badge da Letra (A, B, C, D) */}
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border ${
                  showExplanation && isCorrectOption
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : showExplanation && isSelected && !isCorrectOption
                    ? 'bg-rose-600 text-white border-rose-600'
                    : isSelected
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-purple-100 text-purple-800 border-purple-200'
                }`}>
                  {letter}
                </div>

                <span className="leading-relaxed flex-1">{opcao}</span>

                {/* Ícone de Certo / Errado quando revelado */}
                {showExplanation && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                )}
                {showExplanation && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* FEEDBACK EDUCATIVO IMEDIATO: Alto Contraste e Fundamentação */}
        {showExplanation && selectedOption !== null && (
          <div ref={explanationRef} className={`p-5 rounded-2xl text-white shadow-xl space-y-3 animate-fadeIn mt-4 border-2 ${
            isCurrentCorrect 
              ? 'bg-[#0b1d16] border-emerald-400' 
              : 'bg-[#220d18] border-rose-400'
          }`}>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                {isCurrentCorrect ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400 text-xs font-black flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Discernimento Preciso!
                  </span>
                ) : isTimeout ? (
                  <span className="px-3 py-1 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400 text-xs font-black flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Tempo Esgotado no Modo Tático!
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 border border-rose-400 text-xs font-black flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Atenção à Armadilha / Detalhe Ético!
                  </span>
                )}
              </div>

              <span className="text-[11px] text-purple-200 font-mono font-semibold">
                Pressione Enter ↵ para avançar
              </span>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
              <p>
                <strong className={isCurrentCorrect ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
                  Fundamentação Pedagógica &amp; Análise:
                </strong>{' '}
                {currentItem.original.explicacao}
              </p>
              
              {currentItem.original.referencia && (
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/20 flex items-center gap-2 text-[11px] text-slate-200 mt-2 font-medium">
                  <Scale className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                  <span><strong>Base Jurídica / Doutrinária:</strong> {currentItem.original.referencia}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className={`w-full mt-2 py-3 rounded-xl text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isCurrentCorrect
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
              }`}
            >
              <span>{currentIndex + 1 < shuffledQuestions.length ? 'Próxima Questão Analítica' : 'Ver Meu Desempenho Completo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
