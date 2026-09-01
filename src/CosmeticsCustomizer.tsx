import React, { useState } from 'react';
import { useApp } from './AppContext';
import { COSMETICS_CATALOG } from './cosmeticsRewards';
import { CosmeticCategory, CosmeticItem } from './types';
import { AvatarRenderer } from './AvatarRenderer';
import { ItemInspectionModal } from './ItemInspectionModal';
import { 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Eye, 
  Shield, 
  Smile, 
  Crown, 
  Layers, 
  Flame,
  ArrowLeft
} from 'lucide-react';

interface CosmeticsCustomizerProps {
  onBack?: () => void;
}

export const CosmeticsCustomizer: React.FC<CosmeticsCustomizerProps> = ({ onBack }) => {
  const { userProfile, equipCosmetic } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<CosmeticCategory>('icon');
  const [inspectedItem, setInspectedItem] = useState<CosmeticItem | null>(null);

  // Live preview local state antes de salvar se desejar
  const [previewIcon, setPreviewIcon] = useState(userProfile.equippedIconId);
  const [previewFrame, setPreviewFrame] = useState(userProfile.equippedFrameId);
  const [previewBadge, setPreviewBadge] = useState(userProfile.equippedBadgeId);
  const [previewTitle, setPreviewTitle] = useState(userProfile.equippedTitleId);
  const [previewEffect, setPreviewEffect] = useState(userProfile.equippedEffectId);

  const categories: { id: CosmeticCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'icon', label: 'Ícones', icon: <Smile className="w-4 h-4" /> },
    { id: 'frame', label: 'Molduras', icon: <Layers className="w-4 h-4" /> },
    { id: 'badge', label: 'Emblemas', icon: <Shield className="w-4 h-4" /> },
    { id: 'title', label: 'Títulos', icon: <Crown className="w-4 h-4" /> },
    { id: 'effect', label: 'Auras & Efeitos', icon: <Flame className="w-4 h-4" /> },
  ];

  const filteredItems = COSMETICS_CATALOG.filter(c => c.category === selectedCategory);
  const totalCollected = COSMETICS_CATALOG.filter(c => userProfile.unlockedCosmetics.includes(c.id)).length;
  const totalItems = COSMETICS_CATALOG.length;
  const percentCollected = Math.round((totalCollected / totalItems) * 100);

  const isEquipped = (item: CosmeticItem) => {
    if (item.category === 'icon') return userProfile.equippedIconId === item.id;
    if (item.category === 'frame') return userProfile.equippedFrameId === item.id;
    if (item.category === 'badge') return userProfile.equippedBadgeId === item.id;
    if (item.category === 'title') return userProfile.equippedTitleId === item.id;
    if (item.category === 'effect') return userProfile.equippedEffectId === item.id;
    return false;
  };

  const handleEquipDirect = (item: CosmeticItem) => {
    equipCosmetic(item.category, item.id);
    if (item.category === 'icon') setPreviewIcon(item.id);
    if (item.category === 'frame') setPreviewFrame(item.id);
    if (item.category === 'badge') setPreviewBadge(item.id);
    if (item.category === 'title') setPreviewTitle(item.id);
    if (item.category === 'effect') setPreviewEffect(item.id);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-0.5 rounded-full">
                Vestiário do Sentinela
              </span>
              <span className="text-xs font-bold text-amber-400">
                Itens Coletados: {totalCollected} / {totalItems} ({percentCollected}%)
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
              Minha Coleção & Customizador de Avatar
            </h2>
          </div>
        </div>

        {/* Level & XP Pill */}
        <div className="flex items-center gap-3 bg-[#121828] border border-purple-500/30 p-2.5 rounded-2xl shadow-lg">
          <div className="text-right">
            <div className="text-xs font-black text-white">Nível {userProfile.currentLevel}</div>
            <div className="text-[11px] text-amber-400 font-semibold">{userProfile.currentXp} XP</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-lg">
            ⭐
          </div>
        </div>
      </div>

      {/* Main Grid: Live Preview (Left) + Category Catalog (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col: Live Preview Fixed Card (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0f1424] border border-purple-500/40 shadow-xl text-center space-y-5 sticky top-24">
            
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Pré-Visualização ao Vivo
            </span>

            {/* Avatar Centered */}
            <div className="flex justify-center py-4">
              <div className="p-5 rounded-3xl bg-[#151c32] border-2 border-purple-500/30 shadow-inner">
                <AvatarRenderer
                  iconId={previewIcon}
                  frameId={previewFrame}
                  badgeId={previewBadge}
                  effectId={previewEffect}
                  size="2xl"
                />
              </div>
            </div>

            {/* Equipped Title Honorário */}
            <div className="space-y-1 bg-black/40 p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-bold text-gray-400">Título Equipado</span>
              <p className="font-display font-black text-sm text-amber-400">
                {COSMETICS_CATALOG.find(c => c.id === previewTitle)?.name || 'Sentinela Aprendiz'}
              </p>
            </div>

            {/* Status Summary */}
            <div className="text-[11px] text-gray-400 leading-relaxed">
              Equipe novos itens para exibir sua patente no ranking, no cabeçalho e nas certificações de paz.
            </div>

          </div>
        </div>

        {/* Right Col: Tabs & Items Grid (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0d1220] border border-white/10">
            {categories.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 font-mono">
                  {COSMETICS_CATALOG.filter(c => c.category === tab.id && userProfile.unlockedCosmetics.includes(c.id)).length}
                </span>
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredItems.map(item => {
              const unlocked = userProfile.unlockedCosmetics.includes(item.id);
              const equipped = isEquipped(item);

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between space-y-3 ${
                    equipped
                      ? 'bg-emerald-950/20 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                      : unlocked
                      ? 'bg-[#121828] border-purple-500/30 hover:border-purple-400 hover:bg-[#161d30]'
                      : 'bg-black/40 border-white/5 opacity-80'
                  }`}
                >
                  {/* Top Bar: Rarity & Equip Status */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-md ${
                      item.rarity === 'mitico' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                      item.rarity === 'lendario' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      item.rarity === 'epico' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                      item.rarity === 'raro' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      'bg-slate-700/40 text-slate-300'
                    }`}>
                      {item.rarity}
                    </span>

                    {equipped && (
                      <span className="flex items-center gap-1 text-[10px] font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> EQUIPADO
                      </span>
                    )}
                  </div>

                  {/* Thumbnail & Name */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-2xl bg-black/40 border border-white/10 flex-shrink-0">
                      {item.category === 'icon' && <AvatarRenderer iconId={item.id} size="md" showBadge={false} />}
                      {item.category === 'frame' && <AvatarRenderer frameId={item.id} size="md" showBadge={false} />}
                      {item.category === 'badge' && <AvatarRenderer badgeId={item.id} size="md" />}
                      {item.category === 'effect' && <AvatarRenderer effectId={item.id} size="md" showBadge={false} />}
                      {item.category === 'title' && (
                        <div className="w-10 h-10 flex items-center justify-center font-display font-black text-amber-400 text-base">
                          👑
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm text-white leading-tight">
                        {item.isSecret && !unlocked ? '🔒 Item Secreto' : item.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2">
                        {item.isSecret && !unlocked ? 'Descubra a conquista secreta para revelar.' : item.description}
                      </p>
                    </div>
                  </div>

                  {/* Requisite Text if Locked */}
                  {!unlocked && (
                    <div className="p-2 rounded-xl bg-black/60 border border-white/5 text-[10px] text-gray-400 flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span className="truncate">{item.unlockCondition.description}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    {unlocked ? (
                      equipped ? (
                        <button
                          disabled
                          className="flex-1 py-1.5 rounded-xl bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 text-xs font-bold cursor-default"
                        >
                          Equipado
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEquipDirect(item)}
                          className="flex-1 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Equipar
                        </button>
                      )
                    ) : (
                      <button
                        disabled
                        className="flex-1 py-1.5 rounded-xl bg-white/5 text-gray-500 text-xs font-bold flex items-center justify-center gap-1 cursor-not-allowed"
                      >
                        <Lock className="w-3 h-3" /> Bloqueado
                      </button>
                    )}

                    <button
                      onClick={() => setInspectedItem(item)}
                      className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                      title="Inspecionar lore e detalhes"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Item Inspection Modal */}
      {inspectedItem && (
        <ItemInspectionModal
          item={inspectedItem}
          isUnlocked={userProfile.unlockedCosmetics.includes(inspectedItem.id)}
          isEquipped={isEquipped(inspectedItem)}
          onEquip={() => handleEquipDirect(inspectedItem)}
          onClose={() => setInspectedItem(null)}
        />
      )}

    </div>
  );
};
