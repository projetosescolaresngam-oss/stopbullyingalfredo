import React, { useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Trophy, 
  Award, 
  Gift, 
  ArrowRight,
  Check
} from 'lucide-react';
import { Achievement, CosmeticItem } from './types';
import { AchievementBadgeFrame } from './AchievementBadgeFrame';
import { AvatarRenderer } from './AvatarRenderer';
import { playBreathTone } from './services/audioSynthesizer';
import { useAutoScrollIntoView } from './hooks/useAutoScrollIntoView';

// =========================================================================
// 1. MODAL DE INSPEÇÃO DE ITEM COSMÉTICO
// =========================================================================
export interface ItemInspectionModalProps {
  item: CosmeticItem;
  isUnlocked?: boolean;
  isEquipped?: boolean;
  onEquip?: () => void;
  onClose: () => void;
}

export const ItemInspectionModal: React.FC<ItemInspectionModalProps> = ({
  item,
  isUnlocked = false,
  isEquipped = false,
  onEquip,
  onClose
}) => {
  const modalRef = useAutoScrollIntoView<HTMLDivElement>();

  useEffect(() => {
    try {
      playBreathTone(523.25, 120);
    } catch {
      // Audio optional
    }
  }, []);

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'mythic':
        return { label: 'Mítico / Imortal', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
      case 'legendary':
        return { label: 'Lendário', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'epic':
        return { label: 'Épico', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' };
      case 'rare':
        return { label: 'Raro', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      default:
        return { label: 'Comum', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };
    }
  };

  const rarityInfo = getRarityBadge(item.rarity);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        ref={modalRef}
        className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Pré-visualização do Item */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative p-4 rounded-3xl bg-slate-950/80 border border-indigo-500/30 shadow-inner flex items-center justify-center">
            {item.category === 'frame' ? (
              <AvatarRenderer 
                frameId={item.id}
                size="lg"
              />
            ) : item.category === 'badge' ? (
              <AvatarRenderer 
                badgeId={item.id}
                showBadge={true}
                size="lg"
              />
            ) : item.category === 'effect' ? (
              <AvatarRenderer 
                effectId={item.id}
                showEffect={true}
                size="lg"
              />
            ) : (
              <AvatarRenderer 
                iconId={item.id}
                size="lg"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-full border ${rarityInfo.color}`}>
              {rarityInfo.label}
            </span>
            <span className="px-2.5 py-1 text-xs font-bold uppercase rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {item.category}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-amber-300">
            {item.name}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Citação / Lore do Item */}
        {item.loreQuote && (
          <div className="bg-indigo-950/50 border border-indigo-500/20 rounded-2xl p-3.5 text-xs text-indigo-200 italic text-center">
            "{item.loreQuote}"
          </div>
        )}

        {/* Condição de desbloqueio */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-slate-400">
            {isUnlocked ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Item Desbloqueado</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400">Requisito para Desbloqueio:</span>
              </>
            )}
          </div>
          <p className="text-slate-300 font-medium">
            {item.unlockCondition.description || 'Disponível em desafios de convivência da EEMTI Alfredo Machado.'}
          </p>
        </div>

        {/* Botão de Ação */}
        <div className="flex gap-3 pt-2">
          {isUnlocked ? (
            isEquipped ? (
              <div className="w-full py-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold text-center flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Atualmente em Uso</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onEquip?.();
                  onClose();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Equipar Cosmético</span>
              </button>
            )
          ) : (
            <button
              type="button"
              disabled
              className="w-full py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-400 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
            >
              <Lock className="w-4 h-4" />
              <span>Item Bloqueado</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. MODAL DE DESBLOQUEIO DE CONQUISTA (POPUP DE CELEBRAÇÃO)
// =========================================================================
export interface AchievementUnlockModalProps {
  achievement: Achievement;
  onClose: () => void;
  onEquipCosmetic?: () => void;
}

export const AchievementUnlockModal: React.FC<AchievementUnlockModalProps> = ({
  achievement,
  onClose,
  onEquipCosmetic
}) => {
  const modalRef = useAutoScrollIntoView<HTMLDivElement>();

  useEffect(() => {
    try {
      playBreathTone(587.33, 200);
      setTimeout(() => playBreathTone(880, 250), 160);
    } catch {
      // Audio optional
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        ref={modalRef}
        className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border-2 border-amber-400/60 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Efeito de confete e badge */}
        <div className="pt-2 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black text-xs uppercase tracking-widest mb-4 animate-bounce">
            <Trophy className="w-3.5 h-3.5" />
            <span>Nova Conquista Desbloqueada!</span>
          </div>

          <div className="my-2 transform hover:scale-105 transition-transform">
            <AchievementBadgeFrame
              achievementId={achievement.id}
              category={achievement.category}
              tier={achievement.tier}
              iconType={achievement.iconType}
              funnySticker={achievement.funnySticker}
              isUnlocked={true}
              size="lg"
            />
          </div>

          <h2 className="text-2xl font-black text-amber-300 mt-3">
            {achievement.title}
          </h2>
          <p className="text-sm font-semibold text-purple-200 mt-1">
            {achievement.subtitle}
          </p>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed px-2">
            {achievement.unlockedDescription || achievement.description}
          </p>

          {achievement.funnyQuote && (
            <div className="mt-4 bg-slate-950/70 border border-indigo-500/30 rounded-2xl p-3 text-xs text-amber-200/90 italic">
              {achievement.funnyQuote}
            </div>
          )}

          {/* XP Ganho */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-black text-sm">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>+{achievement.xpReward || 50} Pontos de Experiência (XP)</span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {onEquipCosmetic && (
            <button
              type="button"
              onClick={onEquipCosmetic}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Ver no Perfil</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Continuar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 3. MODAL DE DESBLOQUEIO DE RECOMPENSA COSMÉTICA
// =========================================================================
export interface RewardUnlockModalProps {
  reward: CosmeticItem;
  onClose: () => void;
  onEquipAndClose?: () => void;
}

export const RewardUnlockModal: React.FC<RewardUnlockModalProps> = ({
  reward,
  onClose,
  onEquipAndClose
}) => {
  const modalRef = useAutoScrollIntoView<HTMLDivElement>();

  useEffect(() => {
    try {
      playBreathTone(659.25, 200);
      setTimeout(() => playBreathTone(987.77, 300), 160);
    } catch {
      // Audio optional
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        ref={modalRef}
        className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 border-2 border-purple-400/60 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pt-2 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 font-black text-xs uppercase tracking-widest mb-4 animate-bounce">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>Novo Cosmético Desbloqueado!</span>
          </div>

          <div className="my-2 p-4 rounded-3xl bg-slate-950/80 border border-purple-500/40 shadow-inner">
            {reward.category === 'frame' ? (
              <AvatarRenderer frameId={reward.id} size="lg" />
            ) : reward.category === 'badge' ? (
              <AvatarRenderer badgeId={reward.id} showBadge={true} size="lg" />
            ) : reward.category === 'effect' ? (
              <AvatarRenderer effectId={reward.id} showEffect={true} size="lg" />
            ) : (
              <AvatarRenderer iconId={reward.id} size="lg" />
            )}
          </div>

          <h2 className="text-2xl font-black text-amber-300 mt-2">
            {reward.name}
          </h2>

          <div className="flex items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 text-xs font-black uppercase tracking-wider rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              {reward.rarity}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {reward.category}
            </span>
          </div>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed px-2">
            {reward.description}
          </p>

          {reward.loreQuote && (
            <div className="mt-4 bg-slate-950/70 border border-purple-500/30 rounded-2xl p-3 text-xs text-purple-200 italic">
              "{reward.loreQuote}"
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {onEquipAndClose && (
            <button
              type="button"
              onClick={onEquipAndClose}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs transition-all shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Equipar no Avatar</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Guardar na Coleção</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. MODAL DE INSPEÇÃO DE CONQUISTA
// =========================================================================
export interface AchievementInspectionModalProps {
  achievement: Achievement;
  onClose: () => void;
  onEquipCosmetic?: () => void;
}

export const AchievementInspectionModal: React.FC<AchievementInspectionModalProps> = ({
  achievement,
  onClose,
  onEquipCosmetic
}) => {
  const modalRef = useAutoScrollIntoView<HTMLDivElement>();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div 
        ref={modalRef}
        className="bg-slate-900 border border-indigo-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-white"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <AchievementBadgeFrame
            achievementId={achievement.id}
            category={achievement.category}
            tier={achievement.tier}
            iconType={achievement.iconType}
            funnySticker={achievement.funnySticker}
            isUnlocked={achievement.isUnlocked}
            isSecret={achievement.isSecret}
            size="lg"
          />

          <h3 className="text-xl sm:text-2xl font-black text-amber-300">
            {achievement.title}
          </h3>
          <p className="text-xs font-bold text-indigo-300">
            {achievement.subtitle}
          </p>

          <p className="text-xs text-slate-300 leading-relaxed">
            {achievement.isUnlocked
              ? (achievement.unlockedDescription || achievement.description)
              : achievement.description}
          </p>

          {achievement.funnyQuote && (
            <div className="bg-slate-950/70 border border-indigo-500/20 rounded-2xl p-3 text-xs text-amber-200/90 italic">
              {achievement.funnyQuote}
            </div>
          )}

          <div className="w-full bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 text-xs text-left space-y-1">
            <span className="text-slate-400 font-bold block">Critério:</span>
            <p className="text-slate-300">
              {achievement.requirementHint || 'Conclua as atividades correspondentes na plataforma.'}
            </p>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          {achievement.isUnlocked && onEquipCosmetic && (
            <button
              type="button"
              onClick={onEquipCosmetic}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/20 cursor-pointer"
            >
              Ver Recompensas
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
