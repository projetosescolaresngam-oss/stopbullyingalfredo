import React, { useState, useEffect } from 'react';
import { 
  CENTRAL_DESAFIOS, 
  QuizChallenge, 
  ChallengeCategory,
  ChallengeDifficulty 
} from '../../data/centralRespeitoData';
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
import { useApp } from '../../AppContext';
import { QuizPlayer } from './QuizPlayer';
import { InteractiveStoryPlayer } from './InteractiveStoryPlayer';
import { QuizResultsView } from './QuizResultsView';
import { AnswerRecord } from './QuizReviewModal';
import { PerformanceRadarView } from './PerformanceRadarView';
import { MapaDeDesafios } from './MapaDeDesafios';
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
  Compass
} from 'lucide-react';

interface CentralRespeitoHubProps {
  onBack: () => void;
}

type ActiveView = 'hub' | 'playing_quiz' | 'playing_story' | 'results';

export const CentralRespeitoHub: React.FC<CentralRespeitoHubProps> = ({ onBack }) => {
  const { userProfile, recordQuizCompleted, awardXp } = useApp();

  const [activeView, setActiveView] = useState<ActiveView>('hub');
  const [selectedChallenge, setSelectedChallenge] = useState<QuizChallenge | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [hubTab, setHubTab] = useState<'mapa' | 'trilha' | 'competencias' | 'historias'>('mapa');

  // Progresso do Usuário
  const [progressMap, setProgressMap] = useState<Record<string, ChallengeUserProgress>>({});
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const [secretUnlockedToast, setSecretUnlockedToast] = useState(false);

  // Estados do Resultado
  const [lastRecords, setLastRecords] = useState<AnswerRecord[]>([]);
  const [lastScore, setLastScore] = useState(0);
  const [lastTotalQuestions, setLastTotalQuestions] = useState(0);
  const [lastMaxStreak, setLastMaxStreak] = useState(0);
  const [lastXpEarned, setLastXpEarned] = useState(0);

  // Auto-scroll suave ao alternar entre as abas da Central de Respeito
  const hubContentRef = useAutoScrollIntoView({ trigger: hubTab, delay: 60, block: 'nearest' });

  useEffect(() => {
    setProgressMap(getSavedChallengeProgress());
  }, [activeView]);

  const competencyRegistry = getCompetencyRegistry();
  const totalCompletedChallenges = Object.values(progressMap).filter(p => p.completed).length;
  const maxStreakRecord = Object.values(progressMap).reduce((max, p) => Math.max(max, p.highestStreak || 0), 0);
  const totalAnswered = Object.values(competencyRegistry).reduce((sum, c) => sum + c.total, 0);

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

  // Iniciar Desafio
  const handleStartChallenge = (challenge: QuizChallenge) => {
    setSelectedChallenge(challenge);
    if (challenge.tipo === 'historia_interativa') {
      setActiveView('playing_story');
    } else {
      setActiveView('playing_quiz');
    }
  };

  // Finalização de Quiz de Múltipla Escolha
  const handleFinishQuiz = (
    records: AnswerRecord[], 
    score: number, 
    maxStreak: number, 
    bonusXp: number
  ) => {
    if (!selectedChallenge) return;

    const totalQuestions = records.length;
    const percent = Math.round((score / totalQuestions) * 100);

    // Salva progresso no storage local
    saveChallengeResult(selectedChallenge.id, score, totalQuestions, maxStreak);

    // Atualiza competências
    recordCompetencyAnswers(
      records.map(r => ({
        competencia: r.question.competencia,
        isCorrect: r.isCorrect
      }))
    );

    // Concede XP e registra estatísticas globais
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

  // Finalização de História Interativa
  const handleFinishStory = (score: number, totalPoints: number, maxStreak: number) => {
    if (!selectedChallenge) return;

    const percent = Math.min(100, Math.round((score / totalPoints) * 100));
    saveChallengeResult(selectedChallenge.id, score, totalPoints, maxStreak);

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

  // Filtro de Desafios
  const filteredChallenges = CENTRAL_DESAFIOS.filter((c) => {
    if (hubTab === 'historias' && c.tipo !== 'historia_interativa') return false;
    if (selectedCategory !== 'todos' && c.categoria !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.titulo.toLowerCase().includes(q) ||
        c.subtitulo.toLowerCase().includes(q) ||
        c.descricao.toLowerCase().includes(q)
      );
    }
    return true;
  });

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

  // =========================================================================
  // RENDERIZAÇÃO CONDICIONAL DE TELAS
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
    return (
      <InteractiveStoryPlayer
        challenge={selectedChallenge}
        onBack={() => setActiveView('hub')}
        onFinish={handleFinishStory}
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

  // =========================================================================
  // HUB PRINCIPAL
  // =========================================================================
  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn pb-16">
      
      {/* Toast de Easter Egg Desbloqueado */}
      {secretUnlockedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-black text-xs sm:text-sm shadow-2xl border-2 border-purple-300 animate-bounce flex items-center gap-3">
          <Key className="w-5 h-5 text-amber-300" />
          <span>🕵️ Segredo Revelado! Desafio Oculto desbloqueado na Trilha!</span>
        </div>
      )}

      {/* Topo / Hero da Central de Desafios: Cores Nítidas e Alto Contraste */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white shadow-xl border-2 border-purple-400 relative overflow-hidden">
        
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
              
              <span className="px-3 py-1 rounded-full bg-purple-700 text-amber-300 border border-purple-400 text-xs font-black tracking-wide flex items-center gap-1.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Sentinela Escolar • Arena de Sabedoria
              </span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Central de Desafios &amp; Quizzes do Respeito
            </h1>
            
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-normal">
              Explore dilemas reais, análise de casos, legislação educacional e histórias interativas. Supere questões rigorosas que exigem raciocínio crítico e empatia ativa.
            </p>
          </div>

          {/* Cartão de Progresso Rápido do Usuário */}
          <div className="flex items-center gap-3 bg-purple-950/80 p-3.5 sm:p-4 rounded-2xl border-2 border-purple-400/50 self-stretch md:self-auto justify-between md:justify-start shadow-md">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-200 block">
                Nível {userProfile.currentLevel} • {userProfile.levelTitle}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  {totalCompletedChallenges}
                </span>
                <span className="text-xs text-purple-200 font-semibold">desafios superados</span>
              </div>
            </div>

            <div 
              onClick={handleEasterEggClick}
              className="p-3 rounded-xl bg-purple-700 border border-purple-400 text-amber-300 shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              title="Selo da Sentinela (Clique para interagir)"
            >
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Abas Superiores: Mapa Visual vs Grade de Desafios vs Casos vs Diagnóstico */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-purple-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHubTab('mapa')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              hubTab === 'mapa'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-white hover:bg-purple-50 text-purple-900 border-2 border-purple-200'
            }`}
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>Mapa de Desafios (Trilha)</span>
          </button>

          <button
            onClick={() => setHubTab('trilha')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              hubTab === 'trilha'
                ? 'bg-purple-700 text-white shadow-md'
                : 'bg-white hover:bg-purple-50 text-purple-900 border-2 border-purple-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Grade de Cards ({CENTRAL_DESAFIOS.length})</span>
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
            <span>Casos Interativos</span>
          </button>

          <button
            onClick={() => setHubTab('competencias')}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              hubTab === 'competencias'
                ? 'bg-indigo-700 text-white shadow-md'
                : 'bg-white hover:bg-purple-50 text-purple-900 border-2 border-purple-200'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Diagnóstico de Competências</span>
          </button>
        </div>

        {/* Campo de Busca Rápida */}
        {['trilha', 'historias'].includes(hubTab) && (
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-purple-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar desafio ou tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-medium rounded-xl bg-white border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-[#1e172e]"
            />
          </div>
        )}
      </div>

      {/* RENDERIZAÇÃO DINÂMICA DE CONTEÚDO DAS ABAS */}
      <div ref={hubContentRef} className="space-y-6">
        {hubTab === 'mapa' && (
          <MapaDeDesafios
            progressMap={progressMap}
            onSelectChallenge={handleStartChallenge}
          />
        )}

        {/* RENDERIZAÇÃO DA ABA DE DIAGNÓSTICO */}
        {hubTab === 'competencias' && (
          <PerformanceRadarView
            registry={competencyRegistry}
            totalAnswered={totalAnswered}
            maxStreakRecord={maxStreakRecord}
            totalCompletedChallenges={totalCompletedChallenges}
          />
        )}

        {/* RENDERIZAÇÃO DA TRILHA DE DESAFIOS E CASOS */}
        {(hubTab === 'trilha' || hubTab === 'historias') && (
          <div className="space-y-6">
          
          {/* Categorias / Filtros Pills */}
          {hubTab === 'trilha' && (
            <div 
              className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs"
              data-auto-scroll-container="true"
              data-dense-container="true"
            >
              {[
                { id: 'todos', label: 'Todos' },
                { id: 'fundamentos', label: '🧠 Fundamentos' },
                { id: 'cotidiano', label: '🎭 Situações Reais' },
                { id: 'cyber', label: '📱 Vida Online' },
                { id: 'legislacao', label: '⚖️ Direitos & Leis' },
                { id: 'decisao', label: '🤝 Decisão Ética' },
                { id: 'historia', label: '📖 Histórias' },
                { id: 'secreto', label: '🕵️ Secretos' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as ChallengeCategory)}
                  data-active={selectedCategory === cat.id ? 'true' : undefined}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-purple-900 text-white shadow-xs'
                      : 'bg-white hover:bg-purple-50 text-slate-700 border-2 border-purple-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Grid de Desafios: Cores Nítidas, Sem Opacidade Borrada */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredChallenges.map((challenge) => {
              const diffBadge = getDifficultyBadge(challenge.dificuldade);
              const progress = progressMap[challenge.id];
              const unlockStatus = checkIsChallengeUnlocked(challenge, progressMap);
              const isLocked = !unlockStatus.isUnlocked;

              return (
                <div
                  key={challenge.id}
                  className={`rounded-3xl border-2 transition-all p-5 flex flex-col justify-between relative shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    isLocked
                      ? 'bg-slate-100 border-slate-300 text-slate-800'
                      : progress?.completed
                      ? 'bg-white border-emerald-400'
                      : 'bg-white border-purple-200 hover:border-purple-500'
                  }`}
                >
                  {/* Topo do Card */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full ${diffBadge.color}`}>
                        {diffBadge.label}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-bold text-purple-900 bg-purple-100 border border-purple-300 px-2 py-0.5 rounded-md">
                          +{challenge.xpRecompensa} XP
                        </span>
                        {isLocked && <Lock className="w-4 h-4 text-slate-600" />}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <span className="text-3xl p-2 rounded-2xl bg-purple-50 border border-purple-200 flex-shrink-0">
                        {challenge.icone}
                      </span>
                      <div>
                        <h3 className="font-display font-black text-base text-[#1e172e] leading-snug">
                          {challenge.titulo}
                        </h3>
                        <p className="text-xs text-purple-900 font-semibold line-clamp-1 mt-0.5">
                          {challenge.subtitulo}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 font-normal leading-relaxed line-clamp-3">
                      {challenge.descricao}
                    </p>
                  </div>

                  {/* Detalhes & Rodapé do Card */}
                  <div className="space-y-4 pt-4 mt-3 border-t border-purple-100">
                    <div className="flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                      <span>{challenge.questoesCount} {challenge.tipo === 'historia_interativa' ? 'atos narrativos' : 'questões'}</span>
                      <span>~{challenge.tempoMedioMinutos} min</span>
                      {progress?.completed && (
                        <span className="font-bold text-emerald-800 flex items-center gap-1 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          {progress.bestPercent}%
                        </span>
                      )}
                    </div>

                    {isLocked ? (
                      <div className="p-3 rounded-2xl bg-slate-200/80 border border-slate-300 text-[11px] text-slate-700 font-medium leading-tight">
                        <strong className="text-slate-900">🔒 Bloqueado:</strong> {unlockStatus.reason}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartChallenge(challenge)}
                        className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                          progress?.completed
                            ? 'bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300'
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md'
                        }`}
                      >
                        {progress?.completed ? (
                          <>
                            <RotateCcw className="w-4 h-4" />
                            <span>Jogar Novamente</span>
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
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
