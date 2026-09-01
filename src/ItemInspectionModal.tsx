import React from 'react';
import { CosmeticItem } from './types';
import { AvatarRenderer } from './AvatarRenderer';
import { X, Sparkles, Lock, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ItemInspectionModalProps {
  item: CosmeticItem;
  isUnlocked: boolean;
  isEquipped: boolean;
  onEquip: () => void;
  onClose: () => void;
}

export const ItemInspectionModal: React.FC<ItemInspectionModalProps> = ({
  item,
  isUnlocked,
  isEquipped,
  onEquip,
  onClose
}) => {
  const getRarityBadge = () => {
    switch (item.rarity) {
      case 'mitico':
        return <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[11px] font-black tracking-wider uppercase shadow-md">MÍTICO</span>;
      case 'lendario':
        return <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black tracking-wider uppercase shadow-md">LENDÁRIO</span>;
      case 'epico':
        return <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[11px] font-bold uppercase">ÉPICO</span>;
      case 'raro':
        return <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[11px] font-bold uppercase">RARO</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-slate-500/20 text-slate-300 border border-slate-500/40 text-[11px] font-bold uppercase">COMUM</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0e1322] border-2 border-purple-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Preview */}
        <div className="flex flex-col items-center text-center space-y-4 pt-2">
          <div className="relative p-4 rounded-3xl bg-[#141b2e] border border-white/10 shadow-inner">
            {item.category === 'icon' && (
              <AvatarRenderer iconId={item.id} size="xl" />
            )}
            {item.category === 'frame' && (
              <AvatarRenderer frameId={item.id} size="xl" />
            )}
            {item.category === 'badge' && (
              <AvatarRenderer badgeId={item.id} size="xl" />
            )}
            {item.category === 'effect' && (
              <AvatarRenderer effectId={item.id} size="xl" />
            )}
            {item.category === 'title' && (
              <div className="p-6 text-center">
                <span className="text-xl font-display font-black text-amber-400">
                  {item.name}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              {getRarityBadge()}
              <span className="text-xs uppercase font-bold text-gray-400">
                {item.category === 'icon' ? 'Ícone de Avatar' :
                 item.category === 'frame' ? 'Moldura de Proteção' :
                 item.category === 'badge' ? 'Emblema Flutuante' :
                 item.category === 'title' ? 'Título Honorário' : 'Efeito Visual'}
              </span>
            </div>
            <h3 className="font-display font-black text-xl text-white">
              {item.isSecret && !isUnlocked ? '🔒 Item Secreto' : item.name}
            </h3>
          </div>
        </div>

        {/* Description & Lore */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3 text-xs leading-relaxed text-gray-300">
          <p>
            {item.isSecret && !isUnlocked ? 'Este item possui uma condição de obtenção misteriosa. Continue explorando a plataforma para desvendar sua conquista secreta associada.' : item.description}
          </p>
          
          {item.loreQuote && (
            <blockquote className="border-l-2 border-purple-500 pl-3 italic text-purple-300 text-[11px]">
              {item.loreQuote}
            </blockquote>
          )}
        </div>

        {/* Requisite Card */}
        <div className="p-4 rounded-2xl bg-[#121828] border border-purple-500/30 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-gray-400">Requisito de Desbloqueio</span>
            <p className="font-semibold text-white">
              {item.unlockCondition.description}
            </p>
          </div>
          {isUnlocked ? (
            <span className="flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5" /> Desbloqueado
            </span>
          ) : (
            <span className="flex items-center gap-1 text-gray-400 font-bold bg-gray-900 px-2.5 py-1 rounded-full border border-gray-700">
              <Lock className="w-3.5 h-3.5" /> Bloqueado
            </span>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {isUnlocked ? (
            isEquipped ? (
              <button
                disabled
                className="w-full py-3 rounded-2xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-sm flex items-center justify-center gap-2 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4" /> Item Atualmente Equipado
              </button>
            ) : (
              <button
                onClick={() => {
                  onEquip();
                  onClose();
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Equipar Item Agora
              </button>
            )
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-gray-300 font-bold text-sm transition-all cursor-pointer"
            >
              Fechar
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
