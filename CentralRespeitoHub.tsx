import React, { useState, useEffect, useMemo } from 'react';
import { 
  CENTRAL_DESAFIOS, 
  QuizChallenge, 
  ChallengeCategory,
  ChallengeDifficulty 
} from '../../data/centralRespeitoData';
import { 
  ALL_QUIZZES, 
  QuizItem, 
  DifficultyLevel, 
  QUIZ_DIFFICULTY_LABELS,
  QUIZ_DIFFICULTY_XP
} from '../../data/questionBank';
import { 
  getSavedChallengeProgress, 
  saveChallengeResult, 
  getCompetencyRegistry, 
  recordCompetencyAnswers,
  checkIsChallengeUnlocked,
  unlockEasterEgg,
  isEasterEggUnlocked,
  ChallengeUserProgress
} from '../../utils/centralRespeitoStorage';
import { 
  getCompletedQuizIds, 
  getNextRecommendedQuiz, 
  getQuizProgressionStats 
} from '../../services/quizProgressionService';
import { 
  recordBatchEvidences, 
  recordSingleEvidence, 
  getFullCompetenciesDiagnostic,
  getLongitudinalSummary,
  getIntelligentRecommendations
} from '../../services/competencies';
import { 
  NARRATIVE_STORIES, 
  NarrativeStory 
} from '../../data/narrativeStoriesData';
import { useApp } from '../../AppContext';
import { QuizPlayer } from './QuizPlayer';
import { InteractiveStoryPlayer } from './InteractiveStoryPlayer';
import { QuizResultsView } from './QuizResultsView';
import { AnswerRecord } from './QuizReviewModal';
import { PerformanceRadarView } from './PerformanceRadarView';
import { MapaDeDesafios } from './MapaDeDesafios';
import { SingleQuizPlayerModal } from './SingleQuizPlayerModal';
import { NarrativeHubView } from './narrative/NarrativeHubView';
import { NarrativePlayerModal } from './narrative/NarrativePlayerModal';
import { useAutoScrollIntoView } from '../../hooks/useAutoScrollIntoView';
import { 
  BookOpen, 
  Sparkles, 
  Award, 
  Flame, 
  ShieldCheck, 
  Trophy, 
  Lock, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Search, 
  ArrowLeft, 
  GraduationCap, 
  Layers, 
  HelpCircle, 
  Eye, 
  Key, 
  Compass,
  Zap,
  Filter,
  Check,
  ArrowRight
} from 'lucide-react';

interface CentralRespeitoHubProps {
  onBack: () => void;
}

type ActiveView = 'hub' | 'playing_quiz' | 'playing_story' | 'results';

export const CentralRespeitoHub: React.FC<CentralRespeitoHubProps> = ({ onBack }) => {
  const { userProfile, studentIdentity, recordQuizCompleted, awardXp } = useApp();
  const studentKey = studentIdentity?.studentSeed || studentIdentity?.code || 'anonimo_padrao';

  const [activeView, setActiveView] = useState<ActiveView>('hub');
  const [selectedChallenge, setSelectedChallenge] = useState<QuizChallenge | null>(null);
  const [selectedQuizItem, setSelectedQuizItem] = useState<QuizItem | null>(null);
  const [selectedStory, setSelectedStory] = useState<NarrativeStory | null>(null);
  
  // Abas do Hub: 'quizzes' (banco massivo de 100 quizzes nos 4 níveis) | 'mapa' | 'historias' | 'competencias'
  const [hubTab, setHubTab] = useState<'quizzes' | 'mapa' | 'historias' | 'competencias'>('quizzes');
  
  // Filtros da Arena de Quizzes (100)
  const [quizDiffFilter, setQuizDiffFilter] = useState<DifficultyLevel | 'todos'>('todos');
  const [quizCategoryFilter, setQuizCategoryFilter] = useState<string>('todos');
  const [quizSearch, setQuizSearch] = useState('');

  // Progresso do Usuário
  const [progressMap, setProgressMap] = useState<Record<string, ChallengeUserProgress>>({});
  const [completedQuizIds, setCompletedQuizIds] = useState<string[]>([]);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [secretUnlockedToast, setSecretUnlockedToast] = useState(false);

  // Estados do Resultado de Desafios Tradicionais
  const [lastRecords, setLastRecords] = useState<AnswerRecord[]>([]);
  const [lastScore, setLastScore] = useState(0);
  const [lastTotalQuestions, setLastTotalQuestions] = useState(0);
  const [lastMaxStreak, setLastMaxStreak] = useState(0);
  const [lastXpEarned, setLastXpEarned] = useState(0);

  // Auto-scroll suave
  useAutoScrollIntoView({ trigger: hubTab, delay: 60, block: 'nearest' });

  // Atualiza progresso ao voltar para o hub
  useEffect(() => {
    setProgressMap(getSavedChallengeProgress());
    setCompletedQuizIds(getCompletedQuizIds(studentKey));
  }, [activeView, studentKey, selectedQuizItem]);

  const quizStats = useMemo(() => {
    return getQuizProgressionStats(studentKey);
  }, [studentKey, completedQuizIds, selectedQuizItem]);

  const competencyRegistry = getCompetencyRegistry();
  const totalCompletedChallenges = Object.values(progressMap).filter(p => p.completed).length + completedQuizIds.length;
  const maxStreakRecord = Object.values(progressMap).reduce((max, p) => Math.max(max, p.highestStreak || 0), 0);
  const totalAnswered = Object.values(competencyRegistry).reduce((sum, c) => sum + c.total, 0) + completedQuizIds.length;

  // Diagnóstico Formativo Avançado por Competência (Novo Motor Ponderado)
  const fullDiagnostics = useMemo(() => {
    return getFullCompetenciesDiagnostic(studentKey);
  }, [studentKey, completedQuizIds, activeView, selectedQuizItem]);

  const longitudinalSummary = useMemo(() => {
    return getLongitudinalSummary(studentKey);
  }, [studentKey, fullDiagnostics]);

  const intelligentRecommendations = useMemo(() => {
    return getIntelligentRecommendations(studentKey);
  }, [studentKey, fullDiagnostics]);

  // Próximo Desafio Rápido Recomendado (Item 5)
  const nextRecommended = useMemo(() => {
    return getNextRecommendedQuiz(studentKey, {
      preferredDifficulty: quizDiffFilter !== 'todos' ? quizDiffFilter : undefined
    });
  }, [studentKey, completedQuizIds, quizDiffFilter]);

  // Easter Egg para desbloquear o Desafio Secreto
  const handleEasterEggClick = () => {
    const next = easterEggClicks + 1;
    setEasterEggClicks(next);
    if (next >= 4 && !isEasterEggUnlocked()) {
      unlockEasterEgg();
      setSecretUnlockedToast(true);
      setProgressMap(getSavedChallengeProgress());
      setTimeout(() => setSecretUnlockedToast(false), 4500);
    }
  };

  // Iniciar Desafio Tradicional ou História Interativa
  const handleStartChallenge = (challenge: QuizChallenge) => {
    setSelectedChallenge(challenge);
    if (challenge.tipo === 'historia_interativa') {
      const match = NARRATIVE_STORIES.find(s => s.id === challenge.id) || NARRATIVE_STORIES[0];
      setSelectedStory(match);
      setHubTab('historias');
      setActiveView('hub');
    } else {
      setActiveView('playing_quiz');
    }
  };

  // Finalização de Desafio
  const handleFinishQuiz = (
    records: AnswerRecord[], 
    score: number, 
    maxStreak: number, 
    bonusXp: number
  ) => {
    if (!selectedChallenge) return;

    const totalQuestions = records.length;
    const percent = Math.round((score / totalQuestions) * 100);

    saveChallengeResult(selectedChallenge.id, score, totalQuestions, maxStreak);

    // Sistema de Compatibilidade Legada
    recordCompetencyAnswers(
      records.map(r => ({
        competencia: r.question.competencia,
        isCorrect: r.isCorrect
      }))
    );

    // Novo Motor Pedagógico Ponderado de Competências
    const challengeDiffWeight = selectedChallenge.dificuldade === 'supremo' ? 3.5 : 2.2;
    recordBatchEvidences(
      studentKey,
      records.map(r => ({
        activityId: `${selectedChallenge.id}_${r.question.id}`,
        activityTitle: `${selectedChallenge.titulo}: ${r.question.pergunta.slice(0, 40)}...`,
        origin: 'desafio_central',
        competency: r.question.competencia,
        difficulty: selectedChallenge.dificuldade === 'supremo' ? 'supremo' : 'dificil',
        weight: challengeDiffWeight,
        isCorrect: r.isCorrect,
        scoreRatio: r.isCorrect ? 1.0 : 0.0,
        category: selectedChallenge.categoria
      }))
    );

    const baseReward = selectedChallenge.xpRecompensa;
    const finalXp = baseReward + bonusXp;
    awardXp(finalXp, `Desafio concluído: ${selectedChallenge.titulo}`);
    recordQuizCompleted(percent, totalQuestions);

    setLastRecords(records);
    setLastScore(score);
    setLastTotalQuestions(totalQuestions);
    setLastMaxStreak(maxStreak);
    setLastXpEarned(finalXp);

    setActiveView('results');
  };

  const handleFinishStory = (score: number, totalPoints: number, maxStreak: number) => {
    if (!selectedChallenge) return;

    const percent = Math.min(100, Math.round((score / totalPoints) * 100));
    saveChallengeResult(selectedChallenge.id, score, totalPoints, maxStreak);

    // Alimenta competências de convivência, cyber e respeito a partir do estudo de caso interativo
    const ratio = Math.max(0, Math.min(1, score / totalPoints));
    recordSingleEvidence(studentKey, {
      activityId: selectedChallenge.id,
      activityTitle: selectedChallenge.titulo,
      origin: 'historia_interativa',
      competency: 'cyber',
      difficulty: 'dificil',
      weight: 2.5,
      isCorrect: ratio >= 0.7,
      scoreRatio: ratio,
      category: 'historia'
    });
    recordSingleEvidence(studentKey, {
      activityId: `${selectedChallenge.id}_convivencia`,
      activityTitle: `${selectedChallenge.titulo} (Mediação)`,
      origin: 'historia_interativa',
      competency: 'convivencia',
      difficulty: 'dificil',
      weight: 2.5,
      isCorrect: ratio >= 0.7,
      scoreRatio: ratio,
      category: 'historia'
    });

    const xpEarned = selectedChallenge.xpRecompensa;
    awardXp(xpEarned, `História Interativa: ${selectedChallenge.titulo}`);
    recordQuizCompleted(percent, 5);

    setLastRecords([]);
    setLastScore(score);
    setLastTotalQuestions(totalPoints);
    setLastMaxStreak(maxStreak);
    setLastXpEarned(xpEarned);

    setActiveView('hub');
  };

  // Filtragem dos 100 Quizzes
  const filteredQuizzes = useMemo(() => {
    return ALL_QUIZZES.filter(q => {
      if (quizDiffFilter !== 'todos' && q.dificuldade !== quizDiffFilter) return false;
      if (quizCategoryFilter !== 'todos' && q.categoria !== quizCategoryFilter) return false;
      if (quizSearch.trim()) {
        const query = quizSearch.toLowerCase();
        return (
          q.titulo.toLowerCase().includes(query) ||
          q.enunciado.toLowerCase().includes(query) ||
          (q.contexto && q.contexto.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [quizDiffFilter, quizCategoryFilter, quizSearch]);

  // Lista de Categorias Únicas para o Filtro
  const availableCategories = useMemo(() => {
    const cats = new Set(ALL_QUIZZES.map(q => q.categoria));
    return Array.from(cats);
  }, []);

  // =========================================================================
  // TELAS ATIVAS
  // =========================================================================

  if (activeView === 'playing_quiz' && selectedChallenge) {
    return (
      <QuizPlayer
        challenge={selectedChallenge}
        onBack={() => setActiveView('hub')}
        onFinish={handleFinishQuiz}
      />
    );
  }

  if (activeView === 'playing_story' && selectedChallenge) {
    const story = NARRATIVE_STORIES.find(s => s.id === selectedChallenge.id) || NARRATIVE_STORIES[0];
    return (
      <NarrativePlayerModal
        story={story}
        studentKey={studentKey}
        onBack={() => {
          setActiveView('hub');
          setSelectedStory(null);
        }}
      />
    );
  }

  if (activeView === 'results' && selectedChallenge) {
    return (
      <QuizResultsView
        challenge={selectedChallenge}
        records={lastRecords}
        score={lastScore}
        totalQuestions={lastTotalQuestions}
        maxStreak={lastMaxStreak}
        totalXpEarned={lastXpEarned}
        onRetry={() => {
          if (selectedChallenge.tipo === 'historia_interativa') {
            setActiveView('playing_story');
          } else {
            setActiveView('playing_quiz');
          }
        }}
        onBackToHub={() => setActiveView('hub')}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      
      {/* Modal para Jogar Quiz Individual (Banco de 100) */}
      {selectedQuizItem && (
        <SingleQuizPlayerModal
          quiz={selectedQuizItem}
          onClose={() => setSelectedQuizItem(null)}
          onSelectNextQuiz={(next) => setSelectedQuizItem(next)}
        />
      )}

      {/* Toast de Easter Egg Desbloqueado */}
      {secretUnlockedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-black text-xs sm:text-sm shadow-2xl border-2 border-purple-300 animate-bounce flex items-center gap-3">
          <Key className="w-5 h-5 text-amber-300" />
          <span>🕵️ Segredo Revelado! Desafio Oculto desbloqueado na Trilha!</span>
        </div>
      )}

      {/* Hero da Central de Respeito */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-purple-900 text-white shadow-xl border-2 border-purple-400 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-colors cursor-pointer mr-1"
                title="Voltar ao Início"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <span className="px-3 py-1 rounded-full bg-purple-800 text-amber-300 border border-purple-400 text-xs font-black tracking-wide flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Sentinela Escolar • Arena de Sabedoria (100 Desafios)
              </span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Central de Quizzes &amp; Desafios de Respeito
            </h1>
            
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-normal">
              100 quizzes rigorosos distribuídos em quatro níveis reais de complexidade: Fácil, Médio, Difícil e o Desafio Impossível no padrão ENEM. Aprenda com explicações completas e ganhe XP sem repetições.
            </p>
          </div>

          {/* Cartão de Progresso Rápido do Estudante */}
          <div className="flex items-center gap-3 bg-black/40 p-3.5 sm:p-4 rounded-2xl border-2 border-purple-400/50 self-stretch md:self-auto justify-between md:justify-start shadow-md">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-200 block">
                Nível {userProfile.currentLevel} • {userProfile.levelTitle}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
                  {quizStats.totalCompleted} / {quizStats.totalAll}
                </span>
                <span className="text-xs text-purple-200 font-semibold">quizzes superados</span>
              </div>
            </div>

            <div 
              onClick={handleEasterEggClick}
              className="p-3 rounded-xl bg-purple-700 border border-purple-400 text-amber-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="Selo da Sentinela"
            >
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Abas Superiores de Navegação */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-purple-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={() => setHubTab('quizzes')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              hubTab === 'quizzes'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-white hover:bg-purple-50 text-purple-900 border-2 border-purple-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Banco de Quizzes ({ALL_QUIZZES.length})</span>
            <span className="px-1.5 py-0.2 rounded-full bg-purple-900 text-white text-[10px] font-mono">
              {quizStats.totalCompleted}/{quizStats.totalAll}
            </span>
          </button>

          <button
            onClick={() => setHubTab('mapa')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              hubTab === 'mapa'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-white hover:bg-purple-50 text-purple-900 border-2 border-purple-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Mapa da Trilha</span>
          </button>

          <button
            onClick={() => setHubTab('historias')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              hubTab === 'historias'
                ? 'bg-fuchsia-700 text-white shadow-md'
                : 'bg-white hover:bg-purple-50 text-purple-900 border-2 border-purple-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Casos Narrativos</span>
          </button>

          <button
            onClick={() => setHubTab('competencias')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              hubTab === 'competencias'
                ? 'bg-indigo-700 text-white shadow-md'
                : 'bg-white hover:bg-purple-50 text-purple-900 border-2 border-purple-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Radar de Competências</span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: BANCO DE QUIZZES (100) — OS 4 NÍVEIS DE DIFICULDADE (Item 1, 2, 9)  */}
      {/* ========================================================================= */}
      {hubTab === 'quizzes' && (
        <div className="space-y-6">
          
          {/* Banner de Ação Rápida: Próximo Desafio Inédito Recomendado */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#210747] via-[#2f0b60] to-[#1d053d] border-2 border-purple-400/60 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-white">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-[#1a0800] text-[10px] font-black uppercase tracking-wider">
                  ⚡ Rotação Inteligente de Desafios
                </span>
                {nextRecommended && (
                  <span className="text-xs font-mono font-bold text-amber-300">
                    +{nextRecommended.xpRecompensa} XP
                  </span>
                )}
              </div>
              
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                {nextRecommended ? nextRecommended.titulo : 'Todos os 100 Quizzes Concluídos!'}
              </h3>
              
              <p className="text-xs text-purple-200 leading-relaxed">
                {nextRecommended 
                  ? `${nextRecommended.enunciado.substring(0, 110)}...`
                  : 'Parabéns! Você alcançou a sabedoria máxima da Sentinela superando todos os desafios disponíveis!'}
              </p>
            </div>

            {nextRecommended ? (
              <button
                onClick={() => setSelectedQuizItem(nextRecommended)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#1a0800] font-black text-xs sm:text-sm shadow-lg shadow-amber-500/30 flex items-center gap-2 cursor-pointer transition-all flex-shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Iniciar Desafio Inédito</span>
              </button>
            ) : (
              <button
                onClick={() => setSelectedQuizItem(ALL_QUIZZES[0])}
                className="px-5 py-3 rounded-2xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Revisar Quizzes</span>
              </button>
            )}
          </div>

          {/* Seletor dos 4 Níveis de Dificuldade com Contadores */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            
            <button
              onClick={() => setQuizDiffFilter('todos')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                quizDiffFilter === 'todos'
                  ? 'bg-purple-900 text-white border-purple-400 shadow-md ring-2 ring-purple-300/40'
                  : 'bg-white hover:bg-purple-50 text-slate-800 border-purple-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider opacity-80">TODOS</span>
                <span className="font-mono text-xs font-bold">{quizStats.totalCompleted}/{quizStats.totalAll}</span>
              </div>
              <h4 className="font-display font-black text-sm">Visão Geral</h4>
              <p className="text-[11px] opacity-75">100 quizzes totais</p>
            </button>

            {/* Nível 1: Fácil */}
            <button
              onClick={() => setQuizDiffFilter('facil')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                quizDiffFilter === 'facil'
                  ? 'bg-emerald-800 text-white border-emerald-300 shadow-md ring-2 ring-emerald-300/40'
                  : 'bg-emerald-50/70 hover:bg-emerald-100/60 text-emerald-950 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider">NÍVEL 1</span>
                <span className="font-mono text-xs font-black text-emerald-600 bg-emerald-100 px-1.5 py-0.2 rounded">
                  +10 XP
                </span>
              </div>
              <h4 className="font-display font-black text-sm">Fácil</h4>
              <p className="text-[11px] font-medium opacity-85">
                {quizStats.byDifficulty.facil.completed}/{quizStats.byDifficulty.facil.total} superados
              </p>
            </button>

            {/* Nível 2: Médio */}
            <button
              onClick={() => setQuizDiffFilter('medio')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                quizDiffFilter === 'medio'
                  ? 'bg-blue-800 text-white border-blue-300 shadow-md ring-2 ring-blue-300/40'
                  : 'bg-blue-50/70 hover:bg-blue-100/60 text-blue-950 border-blue-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider">NÍVEL 2</span>
                <span className="font-mono text-xs font-black text-blue-600 bg-blue-100 px-1.5 py-0.2 rounded">
                  +20 XP
                </span>
              </div>
              <h4 className="font-display font-black text-sm">Médio</h4>
              <p className="text-[11px] font-medium opacity-85">
                {quizStats.byDifficulty.medio.completed}/{quizStats.byDifficulty.medio.total} superados
              </p>
            </button>

            {/* Nível 3: Difícil */}
            <button
              onClick={() => setQuizDiffFilter('dificil')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                quizDiffFilter === 'dificil'
                  ? 'bg-amber-800 text-white border-amber-300 shadow-md ring-2 ring-amber-300/40'
                  : 'bg-amber-50/70 hover:bg-amber-100/60 text-amber-950 border-amber-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider">NÍVEL 3</span>
                <span className="font-mono text-xs font-black text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                  +35 XP
                </span>
              </div>
              <h4 className="font-display font-black text-sm">Difícil</h4>
              <p className="text-[11px] font-medium opacity-85">
                {quizStats.byDifficulty.dificil.completed}/{quizStats.byDifficulty.dificil.total} superados
              </p>
            </button>

            {/* Nível 4: Impossível (ENEM) */}
            <button
              onClick={() => setQuizDiffFilter('impossivel')}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                quizDiffFilter === 'impossivel'
                  ? 'bg-rose-900 text-white border-rose-400 shadow-md ring-2 ring-rose-400/40'
                  : 'bg-rose-50/70 hover:bg-rose-100/60 text-rose-950 border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider">NÍVEL 4</span>
                <span className="font-mono text-xs font-black text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">
                  +50 XP
                </span>
              </div>
              <h4 className="font-display font-black text-sm">Impossível (ENEM)</h4>
              <p className="text-[11px] font-medium opacity-85">
                {quizStats.byDifficulty.impossivel.completed}/{quizStats.byDifficulty.impossivel.total} superados
              </p>
            </button>

          </div>

          {/* Filtros e Barra de Pesquisa */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border-2 border-purple-200">
            
            {/* Barra de Busca */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                placeholder="Buscar quiz por título ou tema..."
                value={quizSearch}
                onChange={(e) => setQuizSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-purple-50/50 border border-purple-200 text-xs text-[#241e33] placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Filtro por Categoria */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <select
                value={quizCategoryFilter}
                onChange={(e) => setQuizCategoryFilter(e.target.value)}
                className="py-2 px-3 rounded-xl bg-purple-50/60 border border-purple-200 text-xs font-bold text-purple-900 focus:outline-none focus:border-purple-500 cursor-pointer w-full sm:w-auto"
              >
                <option value="todos">Todas as Categorias</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase().replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Grid dos Quizzes Disponíveis */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuizzes.map((quizItem) => {
              const isCompleted = completedQuizIds.includes(quizItem.id);
              const diffBadge = QUIZ_DIFFICULTY_LABELS[quizItem.dificuldade];

              return (
                <div
                  key={quizItem.id}
                  className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                    isCompleted
                      ? 'bg-white border-emerald-400/80'
                      : 'bg-white border-purple-200 hover:border-purple-400'
                  }`}
                >
                  <div className="space-y-2.5">
                    
                    {/* Topo do Card: Nível e XP */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${diffBadge.bg} ${diffBadge.color} ${diffBadge.border}`}>
                        {diffBadge.badge}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-bold text-purple-900 bg-purple-100 border border-purple-300 px-2 py-0.5 rounded-md">
                          +{quizItem.xpRecompensa} XP
                        </span>

                        {isCompleted && (
                          <span className="flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                            <Check className="w-3 h-3 text-emerald-700" />
                            Feito
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Categoria e Título */}
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-600 tracking-wider">
                        {quizItem.categoria.replace('_', ' ')}
                      </span>
                      <h4 className="font-display font-black text-base text-[#1e172e] leading-snug line-clamp-1 mt-0.5">
                        {quizItem.titulo}
                      </h4>
                    </div>

                    {/* Enunciado Prévio */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {quizItem.enunciado}
                    </p>

                  </div>

                  {/* Ação Inferior */}
                  <div className="pt-4 mt-3 border-t border-purple-100">
                    <button
                      onClick={() => setSelectedQuizItem(quizItem)}
                      className={`w-full py-2.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                        isCompleted
                          ? 'bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300'
                          : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Revisar Gabarito</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Resolver Desafio (+{quizItem.xpRecompensa} XP)</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {filteredQuizzes.length === 0 && (
            <div className="p-8 text-center bg-white rounded-3xl border-2 border-purple-200 space-y-2">
              <p className="text-sm font-bold text-purple-900">Nenhum quiz encontrado para os filtros selecionados.</p>
              <button
                onClick={() => {
                  setQuizDiffFilter('todos');
                  setQuizCategoryFilter('todos');
                  setQuizSearch('');
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold cursor-pointer"
              >
                Limpar Filtros
              </button>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: MAPA DA TRILHA DE DESAFIOS                                         */}
      {/* ========================================================================= */}
      {hubTab === 'mapa' && (
        <MapaDeDesafios
          progressMap={progressMap}
          onSelectChallenge={handleStartChallenge}
        />
      )}

      {/* ========================================================================= */}
      {/* ABA 3: CASOS NARRATIVOS INTERATIVOS                                       */}
      {/* ========================================================================= */}
      {hubTab === 'historias' && (
        selectedStory ? (
          <NarrativePlayerModal
            story={selectedStory}
            studentKey={studentKey}
            onBack={() => setSelectedStory(null)}
          />
        ) : (
          <NarrativeHubView
            onSelectStory={(story) => setSelectedStory(story)}
          />
        )
      )}

      {/* ========================================================================= */}
      {/* ABA 4: DIAGNÓSTICO FORMATIVO AVANÇADO POR COMPETÊNCIA                     */}
      {/* ========================================================================= */}
      {hubTab === 'competencias' && (
        <PerformanceRadarView
          studentKey={studentKey}
          diagnostics={fullDiagnostics}
          summary={longitudinalSummary}
          recommendations={intelligentRecommendations}
          onOpenActivity={(targetId, targetType) => {
            if (targetType === 'quiz') {
              const q = ALL_QUIZZES.find(item => item.id === targetId);
              if (q) setSelectedQuizItem(q);
            } else if (targetType === 'historia') {
              const story = NARRATIVE_STORIES.find(s => s.id === targetId) || NARRATIVE_STORIES[0];
              setSelectedStory(story);
              setHubTab('historias');
              setActiveView('hub');
            } else {
              const c = CENTRAL_DESAFIOS.find(item => item.id === targetId);
              if (c) handleStartChallenge(c);
            }
          }}
        />
      )}

    </div>
  );
};
