import React from 'react';
import { Sparkles, Trophy, Lock, Eye, Star, Flame, Award, Shield, BookOpen } from 'lucide-react';
import { Achievement } from '../../types';

interface MuseumStatsHeaderProps {
  achievements: Achievement[];
  favoriteAchId: string | null;
  onOpenFeatured?: () => void;
  ambientLightEnabled: boolean;
  onToggleAmbientLight: () => void;
  onOpenRanksTable?: () => void;
}

export const MuseumStatsHeader: React.FC<MuseumStatsHeaderProps> = ({
  achievements,
  favoriteAchId,
  onOpenFeatured,
  ambientLightEnabled,
  onToggleAmbientLight,
  onOpenRanksTable
}) => {
  const totalCount = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const unlockedCount = unlockedAchievements.length;
  const lockedCount = totalCount - unlockedCount;
  const secretTotal = achievements.filter(a => a.isSecret).length;
  const secretUnlocked = achievements.filter(a => a.isSecret && a.isUnlocked).length;
  
  const completionPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  
  // Total XP proveniente de conquistas desbloqueadas
  const totalXpEarned = unlockedAchievements.reduce((acc, curr) => acc + (curr.xpReward || 50), 0);

  const favoriteAch = achievements.find(a => a.id === favoriteAchId);

  return (
    <div className="relative rounded-3xl bg-[#0d1222] border-2 border-purple-500/30 p-6 sm:p-8 text-white shadow-2xl overflow-hidden space-y-6 backdrop-blur-xl">
      {/* Luzes arquitetônicas de fundo do Museu */}
      {ambientLightEnabled && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Top Meta Tag & Controles Ambientais */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-white/10 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/50 text-purple-300 text-[11px] font-black tracking-widest uppercase shadow-inner">
            🏛️ GALERIA OFICIAL DE HONRA & MEMÓRIA
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            EEMTI Alfredo Machado • Ceará Científico
          </span>
        </div>

        {/* Ambient Lights Toggle & Ranks Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAmbientLight}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              ambientLightEnabled 
                ? 'bg-purple-900/60 border-purple-400 text-purple-200 shadow-md shadow-purple-900/40' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
            title="Alternar iluminação dramática do museu"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{ambientLightEnabled ? 'Luzes de Exposição: Ligadas' : 'Luz Suave'}</span>
          </button>

          {onOpenRanksTable && (
            <button
              onClick={onOpenRanksTable}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Níveis</span>
            </button>
          )}
        </div>
      </div>

      {/* Título Principal & Filosofia da Coleção */}
      <div className="space-y-2 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white flex items-center gap-3">
            <span>🏛️</span>
            <span>MUSEU DAS CONQUISTAS</span>
          </h2>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-purple-400 bg-purple-950/50 px-2.5 py-0.5 rounded-md border border-purple-700/50 w-fit">
            Acervo Permanente
          </span>
        </div>
        <p className="text-sm sm:text-base italic text-purple-200/90 font-serif max-w-3xl leading-relaxed">
          “Cada conquista conta uma parte da sua jornada. Você não está apenas ganhando pontos; está construindo seu próprio museu de cidadania, acolhimento e respeito.”
        </p>
      </div>

      {/* Barra de Progresso do Museu */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-gray-300 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Completude do Acervo do Museu:
          </span>
          <div className="flex items-center gap-2 font-mono font-bold text-amber-300 text-sm">
            <span>{unlockedCount} / {totalCount} Peças Tombadas</span>
            <span className="text-purple-400">({completionPercent}%)</span>
          </div>
        </div>

        {/* Progress Bar com efeito vitrine */}
        <div className="w-full h-3.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden p-0.5 relative shadow-inner">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-amber-400 transition-all duration-700 shadow-lg relative"
            style={{ width: `${Math.max(completionPercent, 4)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
          </div>
        </div>

        <div className="flex justify-between items-center text-[11px] text-gray-400">
          <span>Início da Coleção</span>
          <span>{totalCount - unlockedCount} peças aguardando descoberta</span>
          <span>Acervo Completo (100%)</span>
        </div>
      </div>

      {/* Grid de Métricas do Acervo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
        
        {/* Métrica 1: Peças Descobertas */}
        <div className="p-4 rounded-2xl bg-[#141b2e]/90 border border-purple-500/30 flex items-center gap-3.5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-xl flex-shrink-0">
            🏆
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider block">
              Peças Descobertas
            </span>
            <span className="text-lg sm:text-xl font-mono font-black text-white">
              {unlockedCount}
            </span>
            <span className="text-[10px] text-gray-400 block">
              em exibição nas salas
            </span>
          </div>
        </div>

        {/* Métrica 2: Peças Secretas Desvendadas */}
        <div className="p-4 rounded-2xl bg-[#141b2e]/90 border border-purple-500/30 flex items-center gap-3.5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-xl flex-shrink-0">
            🔐
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-fuchsia-300 tracking-wider block">
              Segredos Ocultos
            </span>
            <span className="text-lg sm:text-xl font-mono font-black text-white">
              {secretUnlocked} / {secretTotal}
            </span>
            <span className="text-[10px] text-gray-400 block">
              relíquias reveladas
            </span>
          </div>
        </div>

        {/* Métrica 3: XP de Honra Acumulado */}
        <div className="p-4 rounded-2xl bg-[#141b2e]/90 border border-purple-500/30 flex items-center gap-3.5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl flex-shrink-0">
            ✨
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
              Honra em XP
            </span>
            <span className="text-lg sm:text-xl font-mono font-black text-amber-400">
              +{totalXpEarned} XP
            </span>
            <span className="text-[10px] text-gray-400 block">
              concedidos por mérito
            </span>
          </div>
        </div>

        {/* Métrica 4: Peça Favorita do Estudante */}
        <div 
          onClick={favoriteAch && onOpenFeatured ? onOpenFeatured : undefined}
          className={`p-4 rounded-2xl bg-[#141b2e]/90 border border-purple-500/30 flex items-center gap-3.5 shadow-sm transition-all ${
            favoriteAch ? 'cursor-pointer hover:border-amber-400/60 hover:bg-[#1a233d]' : ''
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl flex-shrink-0">
            ⭐
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block truncate">
              Peça Favorita
            </span>
            <span className="text-xs sm:text-sm font-black text-white truncate block">
              {favoriteAch ? favoriteAch.title : 'Nenhuma eleita'}
            </span>
            <span className="text-[10px] text-gray-400 block truncate">
              {favoriteAch ? 'Em pedestal de honra' : 'Clique na estrela de uma peça'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
