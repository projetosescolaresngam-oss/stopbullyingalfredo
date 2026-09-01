import React from 'react';
import { Achievement } from './types';
import { AchievementBadgeFrame } from './AchievementBadgeFrame';
import { playBreathTone } from './services/audioSynthesizer';
import { X, Sparkles, Lock, CheckCircle2, Trophy, Shield, BookOpen, Brain, HeartHandshake, Wind, Award } from 'lucide-react';

interface AchievementInspectionModalProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementInspectionModal: React.FC<AchievementInspectionModalProps> = ({
  achievement,
  onClose
}) => {
  const isSecretLocked = achievement.isSecret && !achievement.isUnlocked;

  const getTierInfo = () => {
    switch (achievement.tier) {
      case 'lendario':
        return {
          title: 'ASTRAL LENDÁRIO',
          badgeClass: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-900/50',
          borderClass: 'border-purple-500/60',
          glowClass: 'bg-purple-600/20',
          materials: 'Ametista Mística, Ouro Astral, Luz Celestial & Nebulosa Cósmica'
        };
      case 'ouro':
        return {
          title: 'OURO IMPERIAL 24K',
          badgeClass: 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-900/50',
          borderClass: 'border-amber-500/60',
          glowClass: 'bg-amber-600/20',
          materials: 'Ouro Maciço Polido, Cabochões de Rubi & Filigranas Barrocas'
        };
      case 'prata':
        return {
          title: 'PRATA ESTERLINA',
          badgeClass: 'bg-gradient-to-r from-slate-400 to-blue-500 text-white shadow-lg shadow-blue-900/50',
          borderClass: 'border-blue-500/60',
          glowClass: 'bg-blue-600/20',
          materials: 'Prata Polida, Aço Azul, Safiras Lapidadas & Chanfros Metálicos'
        };
      default:
        return {
          title: 'BRONZE FORJADO',
          badgeClass: 'bg-gradient-to-r from-amber-700 to-orange-800 text-amber-100 shadow-lg shadow-amber-950/50',
          borderClass: 'border-amber-700/60',
          glowClass: 'bg-amber-800/20',
          materials: 'Cobre Escovado, Carvalho Nobre, Rebites de Ferro & Fogo Sagrado'
        };
    }
  };

  const getCategoryIcon = () => {
    switch (achievement.category) {
      case 'sabedoria':
        return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'detetive':
        return <Brain className="w-4 h-4 text-cyan-400" />;
      case 'empatia':
        return <HeartHandshake className="w-4 h-4 text-pink-400" />;
      case 'zen':
        return <Wind className="w-4 h-4 text-teal-400" />;
      default:
        return <Shield className="w-4 h-4 text-amber-400" />;
    }
  };

  const tierInfo = getTierInfo();

  const handleCelebrate = () => {
    if (achievement.isUnlocked) {
      playBreathTone(659.25, 250);
      setTimeout(() => playBreathTone(880.0, 300), 150);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className={`bg-[#0c101d] border-2 ${tierInfo.borderClass} rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 overflow-hidden`}>
        
        {/* Ambient Glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 ${tierInfo.glowClass} rounded-full blur-3xl pointer-events-none`} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase flex items-center gap-1.5 ${tierInfo.badgeClass}`}>
              <Trophy className="w-3.5 h-3.5" />
              {tierInfo.title}
            </span>

            {achievement.isSecret && (
              <span className="px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/50 text-[10px] font-black uppercase flex items-center gap-1">
                <Lock className="w-3 h-3" /> SECRETA
              </span>
            )}
          </div>

          <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            +{achievement.xpReward || 50} XP
          </span>
        </div>

        {/* Grand High-Resolution Badge Artwork Display (140px) */}
        <div className="flex flex-col items-center text-center space-y-4 relative z-10">
          <div 
            onClick={handleCelebrate}
            className="relative p-6 rounded-3xl bg-[#121829]/90 border border-white/10 shadow-2xl transition-transform hover:scale-105 cursor-pointer group"
          >
            <AchievementBadgeFrame
              achievementId={achievement.id}
              category={achievement.category}
              tier={achievement.tier}
              iconType={achievement.iconType}
              funnySticker={achievement.funnySticker}
              isUnlocked={achievement.isUnlocked}
              isSecret={achievement.isSecret}
              size={136}
              showGlow={achievement.isUnlocked}
            />

            {achievement.isUnlocked && (
              <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-display font-black text-white">
              {isSecretLocked ? '🔒 Conquista Secreta Enigmática' : achievement.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold italic text-purple-300/90">
              "{isSecretLocked ? 'Mistério guardado a sete chaves...' : (achievement.subtitle || achievement.title)}"
            </p>
          </div>
        </div>

        {/* Description & Concept Lore */}
        <div className="space-y-3 relative z-10">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
            <h4 className="text-[11px] font-black uppercase text-gray-400 flex items-center gap-1.5">
              {getCategoryIcon()}
              Sobre esta Insígnia:
            </h4>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {isSecretLocked
                ? 'Esta conquista é protegida por um selo ancestral de mistério. Continue realizando ações empáticas, simulando dilemas e completando quizzes para revelá-la.'
                : (achievement.isUnlocked && achievement.unlockedDescription ? achievement.unlockedDescription : achievement.description)}
            </p>
          </div>

          {/* Lore Quote */}
          {!isSecretLocked && achievement.funnyQuote && (
            <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-800/40 text-xs italic text-purple-200">
              ‘{achievement.funnyQuote.replace(/["'‘]/g, '')}’
            </div>
          )}

          {/* Materials & Concept Specs */}
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1 text-[11px]">
            <span className="font-bold text-gray-400 uppercase tracking-wider block">
              Materiais & Acabamento:
            </span>
            <span className="text-gray-300 font-medium">
              {tierInfo.materials}
            </span>
          </div>

          {/* Unlock Requirements */}
          {!achievement.isUnlocked && !isSecretLocked && achievement.requirementHint && (
            <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs space-y-1">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Requisito para desbloqueio:
              </span>
              <p className="text-amber-200/90 leading-relaxed">
                {achievement.requirementHint}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2 relative z-10">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            Fechar Inspeção
          </button>
        </div>

      </div>
    </div>
  );
};
