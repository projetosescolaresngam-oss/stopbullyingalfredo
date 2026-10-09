import React, { useEffect, useState } from 'react';
import { QuizChallenge } from '../../data/centralRespeitoData';
import { AnswerRecord, QuizReviewModal } from './QuizReviewModal';
import { useAutoScrollIntoView } from '../../hooks/useAutoScrollIntoView';
import { playBreathTone } from '../../services/audioSynthesizer';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  ShieldCheck, 
  BookOpen, 
  Home, 
  Share2,
  Check
} from 'lucide-react';

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
