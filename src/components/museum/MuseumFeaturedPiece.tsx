import React from 'react';
import { Star, Sparkles, Award, Trophy, ChevronRight, Lock, Eye } from 'lucide-react';
import { Achievement } from '../../types';
import { AchievementBadgeFrame } from '../../AchievementBadgeFrame';
import { getMuseumPieceDetails } from './museumTypes';
import { playBreathTone } from '../../services/audioSynthesizer';

interface MuseumFeaturedPieceProps {
  achievement: Achievement;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onInspect: (achievement: Achievement) => void;
  onSelectAnother?: () => void;
}

export const MuseumFeaturedPiece: React.FC<MuseumFeaturedPieceProps> = ({
  achievement,
  index,
  isFavorite,
  onToggleFavorite,
  onInspect,
  onSelectAnother
}) => {
  const details = getMuseumPieceDetails(achievement, index);

  const handleInspect = () => {
    playBreathTone(587.33, 180);
    onInspect(achievement);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBreathTone(isFavorite ? 440 : 880, 150);
    onToggleFavorite(achievement.id);
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#111728] via-[#0c101d] to-[#090d17] border-2 border-amber-500/40 p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
      
      {/* Luz dramática de refletor focal (Spotlight do Museu) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {/* Faixa superior do pedestal de honra */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 text-[11px] font-black tracking-wider uppercase shadow-md shadow-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-current" />
            PEDESTAL CENTRAL DE HONRA
          </span>
          {isFavorite && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-400 text-amber-300 text-[10px] font-black uppercase">
              ⭐ SUA PEÇA FAVORITA
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleFavoriteClick}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              isFavorite
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-white/5 hover:bg-white/10 text-amber-300 border-amber-500/40'
            }`}
            title={isFavorite ? 'Remover dos favoritos' : 'Eleger como peça favorita'}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? 'Favorita' : 'Favoritar'}</span>
          </button>

          {onSelectAnother && (
            <button
              onClick={onSelectAnother}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/15 text-xs font-bold transition-all cursor-pointer"
            >
              Trocar Destaque
            </button>
          )}
        </div>
      </div>

      {/* Conteúdo Principal do Pedestal */}
      <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Redoma e Expositor da Peça em Destaque */}
        <div className="md:col-span-5 flex flex-col items-center text-center">
          <div 
            onClick={handleInspect}
            className="group relative p-8 rounded-3xl bg-[#151c30]/90 border-2 border-amber-400/40 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-amber-300 cursor-pointer"
          >
            {/* Vidro protetor da vitrine (reflexo visual) */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
            
            <AchievementBadgeFrame
              achievementId={achievement.id}
              category={achievement.category}
              tier={achievement.tier}
              iconType={achievement.iconType}
              funnySticker={achievement.funnySticker}
              isUnlocked={achievement.isUnlocked}
              isSecret={achievement.isSecret}
              size={136}
              showGlow={true}
            />

            {/* Base física do pedestal (Efeito 3D de Mármore Negro com Acrílico Dourado) */}
            <div className="mt-4 pt-3 border-t border-amber-500/30 w-full flex items-center justify-between text-[11px] font-mono text-amber-300 font-bold">
              <span>{details.pieceNumber}</span>
              <span className="flex items-center gap-1">
                <span>{details.pieceTypeIcon}</span>
                <span>{details.pieceTypeLabel}</span>
              </span>
            </div>
          </div>

          <span className="text-[11px] text-gray-400 mt-3 font-mono">
            Clique na peça para abrir a ficha museológica
          </span>
        </div>

        {/* Placa de Identificação de Museu em Bronze Polido */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-[#080b14]/90 border-2 border-amber-600/50 shadow-inner relative space-y-4 font-serif">
            
            {/* Rebites nos cantos da placa de bronze */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-amber-600 border border-amber-400" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-600 border border-amber-400" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-amber-600 border border-amber-400" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-amber-600 border border-amber-400" />

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-amber-400 font-black">
                <span>{details.pieceNumber}</span>
                <span className="text-gray-400">{details.galleryName}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-amber-100 tracking-tight">
                {achievement.title}
              </h3>
              <p className="text-xs sm:text-sm italic text-amber-200/90 font-serif">
                "{achievement.subtitle || achievement.title}"
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans pt-1">
              {achievement.unlockedDescription || achievement.description}
            </p>

            {achievement.funnyQuote && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs italic text-purple-200 font-serif">
                ‘{achievement.funnyQuote.replace(/["'‘]/g, '')}’
              </div>
            )}

            {/* Rodapé da Placa */}
            <div className="pt-3 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-3">
                <span className="font-bold text-amber-400 flex items-center gap-1 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  +{achievement.xpReward || 50} XP
                </span>
                <span className="text-gray-400 text-[11px]">
                  Tombamento: {achievement.isUnlocked ? '29/09/2026' : 'Em processo'}
                </span>
              </div>

              <button
                onClick={handleInspect}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <span>Inspecionar Peça</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
