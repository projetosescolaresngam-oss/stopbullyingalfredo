import React from 'react';
import { Star, Sparkles, Lock, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { Achievement } from '../../types';
import { AchievementBadgeFrame } from '../../AchievementBadgeFrame';
import { getMuseumPieceDetails } from './museumTypes';
import { playBreathTone } from '../../services/audioSynthesizer';

interface MuseumPieceCardProps {
  achievement: Achievement;
  index: number;
  isFavorite: boolean;
  isNew: boolean;
  onToggleFavorite: (id: string) => void;
  onInspect: (achievement: Achievement) => void;
}

export const MuseumPieceCard: React.FC<MuseumPieceCardProps> = ({
  achievement,
  index,
  isFavorite,
  isNew,
  onToggleFavorite,
  onInspect
}) => {
  const details = getMuseumPieceDetails(achievement, index);
  const isUnlocked = achievement.isUnlocked;
  const isSecretLocked = achievement.isSecret && !isUnlocked;

  const handleCardClick = () => {
    if (isUnlocked) {
      playBreathTone(587.33, 150);
    } else {
      playBreathTone(330.0, 100);
    }
    onInspect(achievement);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBreathTone(isFavorite ? 440 : 880, 120);
    onToggleFavorite(achievement.id);
  };

  const progressPercent = achievement.maxProgress > 0 
    ? Math.min(100, Math.round((achievement.currentProgress / achievement.maxProgress) * 100))
    : 0;

  return (
    <div 
      onClick={handleCardClick}
      className={`group relative flex flex-col justify-between rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden p-5 sm:p-6 ${
        isUnlocked
          ? `bg-[#0e1424]/90 ${details.pedestalStyle.baseBorder} hover:scale-[1.02] hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]`
          : isSecretLocked
          ? 'bg-[#090714]/80 border-purple-900/50 opacity-85 hover:border-purple-600/70 hover:opacity-100'
          : 'bg-[#0a0e1c]/80 border-slate-800 opacity-90 hover:border-slate-700 hover:opacity-100'
      }`}
    >
      {/* Luz ambiente sob o pedestal */}
      {isUnlocked && (
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60"
          style={{ backgroundColor: details.pedestalStyle.glowColor }}
        />
      )}

      {/* Top Badges (Marcador Novo, Favorito, Número da Peça) */}
      <div className="flex items-center justify-between gap-2 relative z-10 pb-3 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono font-black tracking-widest text-gray-400 uppercase">
            {details.pieceNumber}
          </span>
          {isNew && isUnlocked && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[9px] uppercase tracking-wider animate-pulse shadow-sm shadow-emerald-500/50">
              ✨ NOVA
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {isUnlocked && (
            <button
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                isFavorite
                  ? 'text-amber-400 bg-amber-400/20 border border-amber-400/40 hover:bg-amber-400/30'
                  : 'text-gray-500 hover:text-amber-300 hover:bg-white/10'
              }`}
              title={isFavorite ? 'Remover dos favoritos' : 'Marcar como peça favorita'}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}

          {isSecretLocked ? (
            <span className="px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold">
              🔐 Oculta
            </span>
          ) : isUnlocked ? (
            <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 text-[10px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Tombada
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-gray-400 border border-slate-800 text-[10px] font-bold flex items-center gap-1">
              <Lock className="w-3 h-3 text-gray-500" />
              Bloqueada
            </span>
          )}
        </div>
      </div>

      {/* Exposição Central da Peça (Pedestal e Arte 3D) */}
      <div className="my-5 flex flex-col items-center justify-center relative z-10">
        <div className={`relative p-5 rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 ${
          isUnlocked 
            ? 'bg-[#151c32]/80 border border-white/10 shadow-xl' 
            : isSecretLocked
            ? 'bg-[#120a22]/60 border border-purple-500/20'
            : 'bg-black/30 border border-white/5'
        }`}>
          {/* Reflexo sutil de redoma de vidro */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

          <AchievementBadgeFrame
            achievementId={achievement.id}
            category={achievement.category}
            tier={achievement.tier}
            iconType={achievement.iconType}
            funnySticker={achievement.funnySticker}
            isUnlocked={isUnlocked}
            isSecret={achievement.isSecret}
            size={88}
            showGlow={isUnlocked}
          />

          {/* Base física do pedestal com iluminação refratária */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-center gap-1 text-[10px] font-mono text-gray-300">
            <span>{details.pieceTypeIcon}</span>
            <span className="font-semibold">{details.pieceTypeLabel}</span>
          </div>
        </div>
      </div>

      {/* Placa de Identificação do Museu (Metálica/Acrílica) */}
      <div className="space-y-2.5 relative z-10 pt-2 border-t border-white/10">
        
        {/* Título e Subtítulo */}
        <div className="space-y-0.5">
          <h4 className={`font-display font-black text-sm sm:text-base leading-snug line-clamp-1 ${
            isUnlocked ? 'text-white group-hover:text-amber-300 transition-colors' : 'text-gray-400'
          }`}>
            {isSecretLocked ? '???? Enigma Escolar' : achievement.title}
          </h4>
          <p className="text-[11px] italic text-purple-300/80 line-clamp-1 font-serif">
            {isSecretLocked 
              ? '“Nem tudo o que importa está visível.”' 
              : `"${achievement.subtitle || achievement.title}"`}
          </p>
        </div>

        {/* Informações da Placa / Progresso */}
        {isUnlocked ? (
          <div className="flex items-center justify-between text-[11px] pt-1 font-mono">
            <span className="text-gray-400">{details.galleryName}</span>
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              +{achievement.xpReward || 50} XP
            </span>
          </div>
        ) : (
          <div className="space-y-1.5 pt-1">
            {achievement.maxProgress > 1 ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                  <span>Progresso da Peça</span>
                  <span>{achievement.currentProgress}/{achievement.maxProgress} ({progressPercent}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-gray-400 leading-tight">
                {isSecretLocked ? 'Mistério guardado na plataforma.' : 'Continue sua jornada para descobrir.'}
              </p>
            )}
          </div>
        )}

        {/* Rodapé com botão de Ficha */}
        <div className="pt-2 flex items-center justify-between text-[11px]">
          <span className="text-[10px] text-gray-500 font-mono">
            {isUnlocked ? '29/09/2026' : 'Em processo'}
          </span>
          <span className="text-purple-300 group-hover:text-amber-300 transition-colors flex items-center gap-1 font-bold text-[11px]">
            <span>Ver Ficha</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

      </div>

    </div>
  );
};
