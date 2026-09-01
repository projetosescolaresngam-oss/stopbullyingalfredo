import React, { useState } from 'react';
import { useApp } from './AppContext';
import { AvatarRenderer } from './AvatarRenderer';
import { AchievementBadgeFrame } from './AchievementBadgeFrame';
import { LEVEL_PROGRESSION_TABLE } from './levelProgression';
import { Achievement, AchievementCategory } from './types';
import { 
  X, 
  Sparkles, 
  Trophy, 
  Shield, 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Award,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface UserProfileModalProps {
  onClose: () => void;
  onNavigateToCollection: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  onClose,
  onNavigateToCollection
}) => {
  const { userProfile, studentIdentity, achievements, userStats } = useApp();
  const [activeTab, setActiveTab] = useState<'perfil' | 'progresso' | 'conquistas'>('perfil');
  const [selectedAchievementCategory, setSelectedAchievementCategory] = useState<AchievementCategory | 'all'>('all');

  const currentLevelInfo = LEVEL_PROGRESSION_TABLE.find(l => l.level === userProfile.currentLevel) || LEVEL_PROGRESSION_TABLE[0];
  const nextLevelInfo = LEVEL_PROGRESSION_TABLE.find(l => l.level === userProfile.currentLevel + 1);

  const xpPercent = Math.min(100, Math.round((userProfile.currentXp / userProfile.nextLevelXp) * 100));
  const unlockedAchievementsCount = achievements.filter(a => a.isUnlocked).length;
  const totalAchievementsCount = achievements.length;
  const achievementsPercent = Math.round((unlockedAchievementsCount / totalAchievementsCount) * 100);

  const filteredAchievements = achievements.filter(a => {
    if (selectedAchievementCategory === 'all') return true;
    return a.category === selectedAchievementCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b0f1d] border-2 border-purple-500/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#131a30] to-indigo-950/40 border border-purple-500/30 flex flex-col sm:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
          
          <div className="flex-shrink-0 relative">
            <div className="p-3 rounded-3xl bg-[#161f38] border-2 border-purple-400/40 shadow-inner">
              <AvatarRenderer
                iconId={userProfile.equippedIconId}
                frameId={userProfile.equippedFrameId}
                badgeId={userProfile.equippedBadgeId}
                effectId={userProfile.equippedEffectId}
                size="xl"
              />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2 w-full">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider">
                Nível {userProfile.currentLevel} • {userProfile.levelTitle}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {studentIdentity.code}
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              Perfil do Guardião Escolar
            </h2>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-gray-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Progresso para o Nível {userProfile.currentLevel + 1}
                </span>
                <span className="text-amber-400 font-mono">
                  {userProfile.currentXp} / {userProfile.nextLevelXp} XP ({xpPercent}%)
                </span>
              </div>
              <div className="h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => {
                onClose();
                onNavigateToCollection();
              }}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Layers className="w-4 h-4" /> Minha Coleção & Vestiário
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 gap-4">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`pb-3 text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'perfil'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" /> Estatísticas & Desempenho
          </button>

          <button
            onClick={() => setActiveTab('progresso')}
            className={`pb-3 text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'progresso'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Tabela de Níveis (1-20)
          </button>

          <button
            onClick={() => setActiveTab('conquistas')}
            className={`pb-3 text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'conquistas'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" /> Conquistas ({unlockedAchievementsCount}/{totalAchievementsCount})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'perfil' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Quick Stats Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-2xl bg-[#121828] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Total de Conquistas</span>
                <p className="text-2xl font-black text-white font-display">
                  {unlockedAchievementsCount} <span className="text-xs text-gray-400 font-normal">/ {totalAchievementsCount}</span>
                </p>
                <div className="text-[10px] text-purple-400 font-semibold">{achievementsPercent}% Concluído</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#121828] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Quizzes Perfeitos (100%)</span>
                <p className="text-2xl font-black text-amber-400 font-display">
                  {userStats.perfectQuizzesCount}
                </p>
                <div className="text-[10px] text-gray-400 font-semibold">{userStats.quizzesCompletedCount} Quizzes Totais</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#121828] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Sessões Zen Realizadas</span>
                <p className="text-2xl font-black text-emerald-400 font-display">
                  {userStats.breathingSessionsCount}
                </p>
                <div className="text-[10px] text-emerald-300 font-semibold">Mente em Harmonia</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#121828] border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Tipos de Bullying Estudados</span>
                <p className="text-2xl font-black text-cyan-400 font-display">
                  {userStats.exploredBullyingTypes.length} <span className="text-xs text-gray-400 font-normal">/ 8</span>
                </p>
                <div className="text-[10px] text-cyan-300 font-semibold">Matriz Completa</div>
              </div>

            </div>

            {/* School Culture Badge */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/30 to-slate-900/40 border border-purple-500/30 flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-white">
                  Compromisso com a Cultura de Paz da EEMTI Alfredo Machado
                </h4>
                <p className="text-xs text-gray-300 max-w-xl">
                  Ao explorar conteúdos educativos e interagir com empatia, você contribui ativamente para um ambiente escolar livre de intimidações sistemáticas e acolhedor para todos.
                </p>
              </div>
              <div className="text-3xl">🕊️</div>
            </div>

          </div>
        )}

        {activeTab === 'progresso' && (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            <p className="text-xs text-gray-400">
              Avance de nível acumulando XP em quizzes, leituras de leis, treinamentos de respiração e simulações educativas.
            </p>

            <div className="space-y-2">
              {LEVEL_PROGRESSION_TABLE.map(lvl => {
                const isCurrent = lvl.level === userProfile.currentLevel;
                const isUnlocked = userProfile.currentLevel >= lvl.level;

                return (
                  <div
                    key={lvl.level}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-purple-950/40 border-amber-400 shadow-md shadow-purple-500/10'
                        : isUnlocked
                        ? 'bg-[#121828] border-purple-500/20'
                        : 'bg-black/30 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : isUnlocked
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-800 text-gray-400'
                      }`}>
                        {lvl.level}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-white">{lvl.title}</h5>
                          {isCurrent && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                              NÍVEL ATUAL
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400">{lvl.rewardDescription}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-amber-400">{lvl.xpRequired} XP</span>
                      <div className="text-[10px] text-gray-400">
                        {isUnlocked ? 'Alcançado' : 'Bloqueado'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'conquistas' && (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 pb-2">
              {(['all', 'sabedoria', 'detetive', 'empatia', 'zen', 'escudo'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedAchievementCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedAchievementCategory === cat
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'Todas' :
                   cat === 'sabedoria' ? 'Sabedoria' :
                   cat === 'detetive' ? 'Detetive' :
                   cat === 'empatia' ? 'Empatia' :
                   cat === 'zen' ? 'Zen & Harmonia' : 'Escudo & Proteção'}
                </button>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredAchievements.map(ach => {
                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                      ach.isUnlocked
                        ? 'bg-[#121828] border-purple-500/40 shadow-sm'
                        : 'bg-black/30 border-white/5 opacity-70'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <AchievementBadgeFrame
                        achievementId={ach.id}
                        category={ach.category}
                        tier={ach.tier}
                        isUnlocked={ach.isUnlocked}
                        isSecret={ach.isSecret}
                        size="md"
                      />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                          ach.tier === 'lendario' ? 'bg-pink-500/20 text-pink-300' :
                          ach.tier === 'ouro' ? 'bg-amber-500/20 text-amber-300' :
                          ach.tier === 'prata' ? 'bg-slate-500/20 text-slate-300' :
                          'bg-amber-800/20 text-amber-400'
                        }`}>
                          {ach.tier}
                        </span>

                        <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                          +{ach.xpReward || 50} XP
                        </span>
                      </div>

                      <h5 className="font-bold text-xs text-white">
                        {ach.isSecret && !ach.isUnlocked ? '🔒 Conquista Secreta' : ach.title}
                      </h5>

                      <p className="text-[11px] text-gray-400 leading-tight">
                        {ach.isSecret && !ach.isUnlocked
                          ? 'Descubra os requisitos misteriosos explorando o aplicativo.'
                          : ach.description}
                      </p>
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
