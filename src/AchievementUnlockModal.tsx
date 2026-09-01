import React from 'react';
import { Achievement } from './types';
import { AchievementBadgeFrame } from './AchievementBadgeFrame';
import { Sparkles, Trophy, Gift, ArrowRight } from 'lucide-react';

interface AchievementUnlockModalProps {
  achievement: Achievement;
  onEquipCosmetic?: () => void;
  onClose: () => void;
}

export const AchievementUnlockModal: React.FC<AchievementUnlockModalProps> = ({
  achievement,
  onEquipCosmetic,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0e1322] border-2 border-purple-500/50 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-center my-8">
        
        {/* Glow Particles */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-600/20 via-amber-500/10 to-transparent rounded-3xl blur-xl pointer-events-none" />

        {/* Header Pill */}
        <div className="space-y-2">
          {achievement.isSecret ? (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-purple-600/40 animate-pulse">
              🔒✨ Conquista Secreta Descoberta!
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/30">
              🎉 Nova Conquista Desbloqueada!
            </span>
          )}

          <h3 className="font-display font-black text-2xl text-white pt-1">
            {achievement.title}
          </h3>
          <p className="text-xs text-purple-300 font-semibold">
            {achievement.subtitle}
          </p>
        </div>

        {/* Badge Illustration Display */}
        <div className="flex justify-center py-2">
          <div className="p-6 rounded-3xl bg-[#141b2e] border border-purple-500/40 shadow-inner">
            <AchievementBadgeFrame
              achievementId={achievement.id}
              category={achievement.category}
              tier={achievement.tier}
              isUnlocked={true}
              isSecret={false}
              size={100}
            />
          </div>
        </div>

        {/* XP Bonus & Description */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-black text-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            + {achievement.xpReward || 50} XP Concedidos
          </div>

          <p className="text-xs text-gray-300 leading-relaxed bg-black/40 p-3.5 rounded-2xl border border-white/10">
            {achievement.unlockedDescription || achievement.description}
          </p>

          {achievement.funnyQuote && (
            <p className="text-[11px] text-purple-300 italic">
              {achievement.funnyQuote}
            </p>
          )}
        </div>

        {/* Reward Cosmetic Card if applicable */}
        {achievement.secretRewardCosmeticId && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-purple-950/40 border border-amber-500/40 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-400">Recompensa Exclusiva</span>
                <p className="text-xs font-black text-white">Novo Item Desbloqueado</p>
              </div>
            </div>
            {onEquipCosmetic && (
              <button
                onClick={() => {
                  onEquipCosmetic();
                  onClose();
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Equipar
              </button>
            )}
          </div>
        )}

        {/* Main Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            Comemorar e Continuar
          </button>
        </div>

      </div>
    </div>
  );
};
