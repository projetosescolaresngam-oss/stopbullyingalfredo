import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Scale, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  Trophy, 
  Award, 
  RotateCcw, 
  Flame, 
  ShieldCheck, 
  Home, 
  Share2, 
  Check, 
  Volume2, 
  HelpCircle, 
  Brain, 
  Zap, 
  Play, 
  Lock 
} from 'lucide-react';
import { QuizQuestion, QuizChallenge, ChallengeDifficulty } from '../../data/centralRespeitoData';
import { QuizItem, QUIZ_DIFFICULTY_LABELS } from '../../data/questionBank';
import { recordQuizCompletion, isQuizCompleted, getNextRecommendedQuiz } from '../../services/quizProgressionService';
import { recordSingleEvidence } from '../../services/competencies';
import { useApp } from '../../AppContext';
import { playBreathTone, speakText } from '../../services/audioSynthesizer';
import { useAutoScrollIntoView } from '../../hooks/useAutoScrollIntoView';
import { ChallengeUserProgress, checkIsChallengeUnlocked } from '../../utils';







export interface AnswerRecord {
  question: QuizQuestion;
  selectedOption: number;
  isCorrect: boolean;
}

interface QuizReviewModalProps {
  records: AnswerRecord[];
  onClose: () => void;
  initialFilterErrorsOnly?: boolean;
}

export const QuizReviewModal: React.FC<QuizReviewModalProps> = ({
  records,
  onClose,
  initialFilterErrorsOnly = false
}) => {
  const modalRef = useAutoScrollIntoView();
  const [filterErrors, setFilterErrors] = useState(initialFilterErrorsOnly);

  const displayedRecords = filterErrors
    ? records.filter((r) => !r.isCorrect)
    : records;

  const totalErrors = records.filter((r) => !r.isCorrect).length;
  const totalCorrect = records.filter((r) => r.isCorrect).length;

  const modalContent = (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div 
        ref={modalRef}
        className="w-full max-w-3xl rounded-3xl bg-[#0f1422] border-2 border-purple-500/40 shadow-2xl text-white overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Topo do Modal */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-gradient-to-r from-purple-950/60 to-indigo-950/60 flex-shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                <BookOpen className="w-4 h-4" />
              </span>
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                Revisão Pedagógica do Desafio
              </h3>
            </div>
            <p className="text-xs text-gray-300">
              Analise suas respostas, compreenda os fundamentos legais e aprenda com cada detalhe.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
            title="Fechar revisão"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filtros: Todas vs Apenas Erros */}
        <div className="px-5 py-3 bg-black/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterErrors(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                !filterErrors
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Todas as Questões ({records.length})</span>
            </button>

            <button
              onClick={() => setFilterErrors(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterErrors
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Apenas Erros ({totalErrors})</span>
            </button>
          </div>

          <div className="text-xs text-gray-400 flex items-center gap-3">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {totalCorrect} acertos
            </span>
            <span className="text-rose-400 font-bold flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> {totalErrors} erros
            </span>
          </div>
        </div>

        {/* Lista de Questões com Scroll */}
        <div 
          className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-white/10"
          data-auto-scroll-container="true"
          data-dense-container="true"
        >
          {displayedRecords.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-base text-white">Nenhum erro para revisar!</h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Parabéns! Você gabaritou todas as questões ou todas as respostas selecionadas foram corretas.
              </p>
            </div>
          ) : (
            displayedRecords.map((rec, idx) => {
              const q = rec.question;
              const letters = ['A', 'B', 'C', 'D'];

              return (
                <div key={q.id} className={`pt-5 first:pt-0 space-y-3`}>
                  
                  {/* Cabeçalho da Questão */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        rec.isCorrect 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {rec.isCorrect ? 'Correta' : 'Incorreta'}
                      </span>
                      <span className="text-xs font-mono text-gray-400">
                        Questão {idx + 1}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">
                      {q.competencia.toUpperCase()}
                    </span>
                  </div>

                  {/* Enunciado */}
                  <h4 className="text-sm font-bold text-gray-100 leading-snug">
                    {q.pergunta}
                  </h4>

                  {/* As 4 Alternativas com Destaque */}
                  <div className="space-y-2 pt-1">
                    {q.opcoes.map((opt, optIdx) => {
                      const isUserChoice = rec.selectedOption === optIdx;
                      const isCorrectAnswer = q.correta === optIdx;

                      let cardStyle = "bg-white/5 border-white/10 text-gray-300";
                      let letterStyle = "bg-white/10 text-gray-400";

                      if (isCorrectAnswer) {
                        cardStyle = "bg-emerald-950/40 border-emerald-500/80 text-emerald-100 ring-1 ring-emerald-500/40 font-semibold";
                        letterStyle = "bg-emerald-500 text-black font-black";
                      } else if (isUserChoice && !rec.isCorrect) {
                        cardStyle = "bg-rose-950/40 border-rose-500/80 text-rose-100 ring-1 ring-rose-500/40";
                        letterStyle = "bg-rose-500 text-white font-black";
                      }

                      return (
                        <div 
                          key={optIdx} 
                          className={`p-3 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 transition-colors ${cardStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 ${letterStyle}`}>
                            {letters[optIdx]}
                          </span>
                          <span className="flex-1">{opt}</span>

                          {isCorrectAnswer && (
                            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 flex-shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Gabarito Correto
                            </span>
                          )}
                          {isUserChoice && !rec.isCorrect && (
                            <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1 flex-shrink-0">
                              <XCircle className="w-3.5 h-3.5" /> Sua Escolha
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Justificativa e Fundamentação */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-black/40 to-indigo-950/40 border border-purple-500/30 text-xs space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-1.5 text-purple-300 font-bold text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Explicação Pedagógica &amp; Raciocínio:</span>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed pl-5">
                      {q.explicacao}
                    </p>
                    <div className="text-[10px] text-gray-400 pl-5 flex items-center gap-1 pt-0.5">
                      <Scale className="w-3 h-3 text-purple-400" />
                      <span><strong>Referência:</strong> {q.referencia}</span>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-gray-400">
            Conhecimento e reflexão transformam o ambiente escolar.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
          >
            Concluir Revisão
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};









interface QuizResultsViewProps {
  challenge: QuizChallenge;
  records: AnswerRecord[];
  score: number;
  totalQuestions: number;
  maxStreak: number;
  totalXpEarned: number;
  onRetry: () => void;
  onNextChallenge?: () => void;
  onBackToHub: () => void;
}

export const QuizResultsView: React.FC<QuizResultsViewProps> = ({
  challenge,
  records,
  score,
  totalQuestions,
  maxStreak,
  totalXpEarned,
  onRetry,
  onNextChallenge,
  onBackToHub
}) => {
  const containerRef = useAutoScrollIntoView();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewFilterErrors, setReviewFilterErrors] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  const percent = Math.round((score / totalQuestions) * 100);
  const isPerfect = percent === 100;
  const isPassing = percent >= 70;
  const errorCount = records.filter(r => !r.isCorrect).length;

  useEffect(() => {
    if (isPassing) {
      setShowConfetti(true);
      try {
        playBreathTone(523, 80, true);
        setTimeout(() => playBreathTone(659, 100, true), 90);
        setTimeout(() => playBreathTone(784, 180, true), 200);
      } catch {
        // Áudio silenciado se indisponível
      }
    }
  }, [isPassing]);

  // Diagnóstico formativo de desempenho por competência
  const competencyStats = records.reduce((acc, r) => {
    const comp = r.question.competencia;
    if (!acc[comp]) acc[comp] = { correct: 0, total: 0 };
    acc[comp].total += 1;
    if (r.isCorrect) acc[comp].correct += 1;
    return acc;
  }, {} as Record<string, { correct: number; total: number }>);

  const weakCompetency = Object.entries(competencyStats).find(
    ([_, stat]) => (stat.correct / stat.total) < 0.7
  );

  const strongCompetency = Object.entries(competencyStats).find(
    ([_, stat]) => (stat.correct / stat.total) >= 0.8
  );

  const competencyNames: Record<string, string> = {
    respeito: 'Respeito & Empatia',
    convivencia: 'Convivência Democrática',
    bullying: 'Prevenção ao Bullying',
    cyber: 'Cidadania Digital & Cyberbullying',
    direitos: 'Direitos, Deveres & Legislação'
  };

  const handleCopySummary = () => {
    const text = `🏆 Concluí o desafio "${challenge.titulo}" na Central de Respeito do Sentinela Escolar!\nPontuação: ${score}/${totalQuestions} (${percent}%)\nMaior Sequência: ${maxStreak} acertos 🔥\n+${totalXpEarned} XP conquistados!`;
    navigator.clipboard?.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16 relative">
      
      {/* Confetes animados para celebração de 70%+ */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDuration: `${1.2 + Math.random() * 2}s`
              }}
            >
              <div 
                className="w-2.5 h-2.5 rounded-xs shadow-md"
                style={{
                  backgroundColor: ['#a855f7', '#06b6d4', '#f59e0b', '#10b981', '#ec4899'][i % 5]
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Cartão Principal do Resultado: Nítido e Alto Contraste */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#13192f] via-[#0f1426] to-[#0a0d18] border-2 border-purple-400 shadow-2xl text-center space-y-6 relative overflow-hidden">

        {/* Emblema Central de Desempenho */}
        <div className="relative inline-block mx-auto">
          <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center mx-auto shadow-2xl border-2 transition-transform duration-500 hover:scale-105 ${
            isPerfect 
              ? 'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300 text-black shadow-amber-500/30'
              : isPassing
              ? 'bg-gradient-to-br from-emerald-500 to-teal-700 border-emerald-300 text-white shadow-emerald-500/30'
              : 'bg-gradient-to-br from-purple-700 to-indigo-900 border-purple-400 text-white shadow-purple-500/30'
          }`}>
            {isPerfect ? (
              <Trophy className="w-12 h-12 sm:w-14 sm:h-14 animate-pulse" />
            ) : isPassing ? (
              <Award className="w-12 h-12 sm:w-14 sm:h-14" />
            ) : (
              <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 text-purple-200" />
            )}
          </div>

          {/* Badge de Gabarito 100% */}
          {isPerfect && (
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-black font-black text-[10px] uppercase tracking-wider shadow-md whitespace-nowrap border border-white/60">
              Gabarito Perfeito!
            </div>
          )}
        </div>

        {/* Textos de Parabéns e Título do Desafio */}
        <div className="space-y-1.5 max-w-lg mx-auto">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
            {challenge.titulo} • Desafio Concluído
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            {isPerfect 
              ? 'Desempenho Primoroso!' 
              : isPassing 
              ? 'Excelente Aproveitamento!' 
              : 'Desafio Finalizado!'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
            {isPassing 
              ? 'Você demonstrou alto discernimento ético, responsabilidade e domínio dos fundamentos de convivência segura.'
              : 'Um desafio difícil exige prática. Revise as justificativas de cada questão para aprimorar sua visão ética.'}
          </p>
        </div>

        {/* Métricas em Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-2">
          
          <div className="p-3.5 rounded-2xl bg-purple-950/70 border-2 border-purple-400/50 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
              Pontuação
            </span>
            <div className="font-mono text-xl sm:text-2xl font-black text-white">
              {score} <span className="text-xs text-purple-300 font-normal">/ {totalQuestions}</span>
            </div>
            <span className="text-[11px] font-bold text-cyan-300">
              {percent}% de acerto
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-950/70 border-2 border-purple-400/50 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
              Sequência (Combo)
            </span>
            <div className="font-mono text-xl sm:text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
              <Flame className="w-5 h-5 text-amber-400" />
              {maxStreak}
            </div>
            <span className="text-[11px] font-bold text-amber-300">
              Acertos seguidos
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-950/70 border-2 border-purple-400/50 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
              XP Conquistado
            </span>
            <div className="font-mono text-xl sm:text-2xl font-black text-emerald-400 flex items-center justify-center gap-1">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              +{totalXpEarned}
            </div>
            <span className="text-[11px] font-bold text-emerald-300">
              XP na conta
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-950/70 border-2 border-purple-400/50 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
              Diagnóstico
            </span>
            <div className="font-mono text-xl sm:text-2xl font-black text-purple-200">
              {errorCount === 0 ? 'Impecável' : `${errorCount} a revisar`}
            </div>
            <span className="text-[11px] font-bold text-purple-300">
              {errorCount === 0 ? '100% de precisão' : 'Oportunidade'}
            </span>
          </div>

        </div>

        {/* Diagnóstico Formativo Construtivo */}
        <div className="p-4 rounded-2xl bg-purple-950/60 border-2 border-purple-400/40 max-w-xl mx-auto text-left space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-purple-200 text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-purple-300" />
            <span>Diagnóstico Pedagógico do Sentinela:</span>
          </div>
          <p className="text-slate-100 text-xs leading-relaxed font-normal">
            {strongCompetency ? (
              <>Você se destacou na competência de <strong className="text-amber-300">{competencyNames[strongCompetency[0]]}</strong>. </>
            ) : null}
            {weakCompetency ? (
              <>Vale a pena aprofundar e revisar detalhes sobre <strong className="text-cyan-300">{competencyNames[weakCompetency[0]]}</strong> para consolidar seu aprendizado.</>
            ) : (
              <>Você dominou com precisão todas as competências avaliadas neste desafio!</>
            )}
          </p>
        </div>

        {/* Botões de Ação Imediata */}
        <div className="space-y-3 pt-3 max-w-xl mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setReviewFilterErrors(false);
                setReviewOpen(true);
              }}
              className="p-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Revisar Todas as Questões
            </button>

            {errorCount > 0 ? (
              <button
                onClick={() => {
                  setReviewFilterErrors(true);
                  setReviewOpen(true);
                }}
                className="p-3 rounded-2xl bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer border border-rose-500/40"
              >
                <XCircle className="w-4 h-4" />
                Revisar Meus Erros ({errorCount})
              </button>
            ) : (
              <button
                onClick={handleCopySummary}
                className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/20"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-cyan-300" />}
                {copiedSummary ? 'Copiado para a área de transferência!' : 'Compartilhar Desempenho'}
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <button
              onClick={onRetry}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer border border-white/20"
            >
              <RotateCcw className="w-4 h-4 text-purple-300" />
              Tentar Novamente
            </button>

            {onNextChallenge && (
              <button
                onClick={onNextChallenge}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                Próximo Desafio
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onBackToHub}
              className="px-4 py-2.5 rounded-xl bg-black/40 hover:bg-white/10 text-gray-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
            >
              <Home className="w-4 h-4" />
              Central de Desafios
            </button>
          </div>

        </div>

      </div>

      {/* Modal de Revisão Pedagógica (quando aberto) */}
      {reviewOpen && (
        <QuizReviewModal
          records={records}
          initialFilterErrorsOnly={reviewFilterErrors}
          onClose={() => setReviewOpen(false)}
        />
      )}

    </div>
  );
};











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

        try {
          card.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        } catch {
          // Fallback seguro
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
