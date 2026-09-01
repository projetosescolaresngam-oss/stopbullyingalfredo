import React from 'react';
import { CosmeticItem } from './types';
import { AvatarRenderer } from './AvatarRenderer';
import { Sparkles, Trophy, ArrowRight } from 'lucide-react';

interface RewardUnlockModalProps {
  reward: CosmeticItem;
  onEquipAndClose: () => void;
  onClose: () => void;
}

export const RewardUnlockModal: React.FC<RewardUnlockModalProps> = ({
  reward,
  onEquipAndClose,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0f1424] border-2 border-amber-400/60 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-center my-8">
        
        {/* Glow Particles */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-amber-500/10 via-purple-500/10 to-transparent rounded-3xl blur-xl pointer-events-none" />

        {/* Celebration Header */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-black uppercase tracking-wider animate-pulse">
            <Trophy className="w-3.5 h-3.5" />
            Nova Recompensa Cosmética!
          </span>
          <h3 className="font-display font-black text-2xl text-white">
            {reward.name}
          </h3>
          <p className="text-xs text-gray-400">
            Você desbloqueou um novo item para a sua coleção!
          </p>
        </div>

        {/* Avatar Display Preview */}
        <div className="flex justify-center py-2">
          <div className="p-5 rounded-3xl bg-[#151c30] border border-amber-400/40 shadow-inner relative">
            {reward.category === 'icon' && (
              <AvatarRenderer iconId={reward.id} size="2xl" />
            )}
            {reward.category === 'frame' && (
              <AvatarRenderer frameId={reward.id} size="2xl" />
            )}
            {reward.category === 'badge' && (
              <AvatarRenderer badgeId={reward.id} size="2xl" />
            )}
            {reward.category === 'effect' && (
              <AvatarRenderer effectId={reward.id} size="2xl" />
            )}
            {reward.category === 'title' && (
              <div className="p-8 text-center">
                <span className="text-2xl font-display font-black text-amber-400">
                  {reward.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Lore Quote */}
        {reward.loreQuote && (
          <p className="text-xs text-amber-200/90 italic bg-amber-950/30 p-3 rounded-2xl border border-amber-500/20">
            {reward.loreQuote}
          </p>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={onEquipAndClose}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Equipar Agora no Avatar
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            Guardar na Coleção
          </button>
        </div>

      </div>
    </div>
  );
};
