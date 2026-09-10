import React, { useState, useMemo } from 'react';
import { useApp } from './AppContext';
import { COSMETICS_CATALOG } from './cosmeticsRewards';
import { CosmeticCategory, CosmeticItem } from './types';
import { AvatarRenderer } from './AvatarRenderer';
import { 
  Sparkles, 
  Lock, 
  Shield, 
  Smile, 
  Crown, 
  Layers, 
  Flame,
  ArrowLeft,
  Search,
  Check,
  Zap,
  Gem,
  Orbit,
  BookOpen,
  Award
} from 'lucide-react';

interface CosmeticsCustomizerProps {
  onBack?: () => void;
}

export const CosmeticsCustomizer: React.FC<CosmeticsCustomizerProps> = ({ onBack }) => {
  const { userProfile, studentIdentity, equipCosmetic } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<CosmeticCategory>('frame');
  const [customFilter, setCustomFilter] = useState<'todos' | 'desbloqueados' | 'bloqueados' | 'raros'>('todos');
  const [customSearch, setCustomSearch] = useState('');

  // Selected item being inspected
  const [selectedItem, setSelectedItem] = useState<CosmeticItem>(() => {
    return COSMETICS_CATALOG.find(c => c.id === userProfile.equippedFrameId) || COSMETICS_CATALOG[0];
  });

  const xpPercent = Math.min(100, Math.round((userProfile.currentXp / userProfile.nextLevelXp) * 100));
  const totalCollected = COSMETICS_CATALOG.filter(c => userProfile.unlockedCosmetics.includes(c.id)).length;
  const totalItems = COSMETICS_CATALOG.length;
  const percentCollected = Math.round((totalCollected / totalItems) * 100);

  const equippedTitleObj = COSMETICS_CATALOG.find(c => c.id === userProfile.equippedTitleId);
  const equippedBadgeObj = COSMETICS_CATALOG.find(c => c.id === userProfile.equippedBadgeId);
  const titleName = equippedTitleObj?.name || userProfile.levelTitle || 'Pacificador Escolar';
  const badgeName = equippedBadgeObj?.name || 'Emblema Lupa Dourada do Detetive';

  // Filtered items
  const categoryCosmetics = useMemo(() => {
    return COSMETICS_CATALOG.filter(item => {
      if (item.category !== selectedCategory) return false;
      const isUnlocked = userProfile.unlockedCosmetics.includes(item.id);

      if (customFilter === 'desbloqueados' && !isUnlocked) return false;
      if (customFilter === 'bloqueados' && isUnlocked) return false;
      if (customFilter === 'raros' && !['epico', 'lendario', 'mitico'].includes(item.rarity)) return false;

      if (customSearch.trim()) {
        const query = customSearch.toLowerCase();
        return item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query);
      }

      return true;
    });
  }, [selectedCategory, customFilter, customSearch, userProfile.unlockedCosmetics]);

  const isEquipped = (item: CosmeticItem) => {
    if (item.category === 'icon') return userProfile.equippedIconId === item.id;
    if (item.category === 'frame') return userProfile.equippedFrameId === item.id;
    if (item.category === 'badge') return userProfile.equippedBadgeId === item.id;
    if (item.category === 'title') return userProfile.equippedTitleId === item.id;
    if (item.category === 'effect') return userProfile.equippedEffectId === item.id;
    return false;
  };

  const previewIconId = selectedItem.category === 'icon' ? selectedItem.id : userProfile.equippedIconId;
  const previewFrameId = selectedItem.category === 'frame' ? selectedItem.id : userProfile.equippedFrameId;
  const previewBadgeId = selectedItem.category === 'badge' ? selectedItem.id : userProfile.equippedBadgeId;
  const previewEffectId = selectedItem.category === 'effect' ? selectedItem.id : userProfile.equippedEffectId;
  const previewTitleName = selectedItem.category === 'title' ? selectedItem.name : titleName;

  const handleEquipDirect = (item: CosmeticItem) => {
    equipCosmetic(item.category, item.id);
    setSelectedItem(item);
  };

  // Detailed lore cards generator
  const getLoreDetails = (item: CosmeticItem) => {
    if (item.category === 'frame') {
      return [
        {
          icon: <Gem className="w-4 h-4 text-purple-400" />,
          title: 'Cristal Estelar Superior',
          desc: item.loreQuote?.replace(/^"|"$/g, '') || 'Lapidado em ametista viva com facetas radiantes que canalizam sabedoria, foco e discernimento ético.'
        },
        {
          icon: <Shield className="w-4 h-4 text-amber-400" />,
          title: 'Emblema Guardião Sagrado',
          desc: 'Escudo inferior forjado em ouro cósmico e ladeado por asas, honrando a proteção e união da comunidade escolar.'
        },
        {
          icon: <Orbit className="w-4 h-4 text-cyan-400" />,
          title: 'Órbitas & Energia Cósmica',
          desc: 'Planetas astrais e órbitas celestes luminosas que giram em torno do avatar em perfeita harmonia.'
        }
      ];
    } else if (item.category === 'badge') {
      return [
        {
          icon: <Award className="w-4 h-4 text-amber-400" />,
          title: 'Insígnia de Reconhecimento',
          desc: item.loreQuote?.replace(/^"|"$/g, '') || 'Selo forjado em bronze, prata ou ouro honorário celebrando a atuação pacífica no ambiente escolar.'
        },
        {
          icon: <Shield className="w-4 h-4 text-purple-400" />,
          title: 'Símbolo da Ação Justa',
          desc: item.description || 'Representa a postura firme contra apelidos pejorativos e intimidações veladas.'
        },
        {
          icon: <Sparkles className="w-4 h-4 text-yellow-400" />,
          title: 'Bônus de Presença Comunitária',
          desc: 'Exibido orgulhosamente no cabeçalho do aluno e nas listas públicas de respeito.'
        }
      ];
    } else if (item.category === 'title') {
      return [
        {
          icon: <Crown className="w-4 h-4 text-amber-400" />,
          title: 'Patente de Liderança Positiva',
          desc: item.loreQuote?.replace(/^"|"$/g, '') || 'Título honorário que expressa a reputação ética do estudante perante os colegas.'
        },
        {
          icon: <BookOpen className="w-4 h-4 text-blue-400" />,
          title: 'Fundamento Pedagógico',
          desc: item.description || 'Baseado em princípios da Lei 13.185/2015 e nos pilares de convivência democrática do Ceará Científico.'
        },
        {
          icon: <Zap className="w-4 h-4 text-emerald-400" />,
          title: 'Efeito Social',
          desc: 'Inspira colegas a adotarem atitudes acolhedoras e a rejeitarem o riso cúmplice nas piadas ofensivas.'
        }
      ];
    } else if (item.category === 'effect') {
      return [
        {
          icon: <Flame className="w-4 h-4 text-rose-400" />,
          title: 'Aura Cinética Radiante',
          desc: item.loreQuote?.replace(/^"|"$/g, '') || 'Campos de partículas energéticas que emanam do núcleo do avatar.'
        },
        {
          icon: <Sparkles className="w-4 h-4 text-purple-400" />,
          title: 'Ressonância Emocional',
          desc: item.description || 'Reflete o estado de equilíbrio alcançado através dos exercícios de autorregulação e paz.'
        },
        {
          icon: <Orbit className="w-4 h-4 text-cyan-400" />,
          title: 'Partículas de Sigilo Seguro',
          desc: 'Glow dinâmico em 60fps renderizado com aceleração gráfica no navegador.'
        }
      ];
    } else {
      return [
        {
          icon: <Smile className="w-4 h-4 text-cyan-400" />,
          title: 'Ícone de Identidade Segura',
          desc: item.loreQuote?.replace(/^"|"$/g, '') || 'Ilustração vetorial única que preserva 100% o anonimato e a individualidade do aluno.'
        },
        {
          icon: <Shield className="w-4 h-4 text-indigo-400" />,
          title: 'Significado Escolar',
          desc: item.description || 'Símbolo colecionável de protagonismo juvenil e defesa ativa dos direitos humanos na escola.'
        },
        {
          icon: <Crown className="w-4 h-4 text-amber-400" />,
          title: 'Exclusividade StopBullying',
          desc: 'Item permanente no vestiário para combinar com diferentes molduras e títulos.'
        }
      ];
    }
  };

  const selectedLore = getLoreDetails(selectedItem);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto pb-12">
      
      {/* ========================================================================= */}
      {/* TOP PROFILE BANNER: EXACT MATCH TO REFERENCE IMAGES */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-gradient-to-r from-[#1c063b] via-[#2a0852] to-[#451070] border-2 border-purple-500/40 p-5 sm:p-7 shadow-[0_0_35px_rgba(147,51,234,0.3)] relative overflow-hidden text-white">
        
        {/* Sparkle details */}
        <div className="absolute top-3 left-8 text-amber-300/40 text-xs pointer-events-none">✨</div>
        <div className="absolute bottom-3 right-12 text-purple-200/30 text-sm pointer-events-none">✦</div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer flex-shrink-0"
                title="Voltar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            {/* Avatar Circle with Nv.4 Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#12072b] p-1 border-2 border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center justify-center overflow-hidden">
                <AvatarRenderer
                  iconId={userProfile.equippedIconId}
                  frameId={userProfile.equippedFrameId}
                  badgeId={userProfile.equippedBadgeId}
                  effectId={userProfile.equippedEffectId}
                  size="xl"
                  showBadge={false}
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#1a0800] text-xs font-black border-2 border-amber-200 shadow-md flex items-center gap-1 whitespace-nowrap">
                <Shield className="w-3 h-3 fill-[#1a0800]" />
                Nv.{userProfile.currentLevel}
              </div>
            </div>

            {/* Name, Emblem & Info */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-1.5">
                  {studentIdentity.code || 'Anônimo 001'}
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </h2>

                <span className="px-3 py-0.5 rounded-full bg-purple-900/70 border border-purple-400/40 text-purple-200 text-xs font-bold">
                  100% Anônimo
                </span>

                <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-950/80 to-purple-950/80 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-1.5 truncate max-w-[240px]">
                  🛡️ {badgeName}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-xs font-bold text-gray-300">
                <span className="text-amber-400 flex items-center gap-1">
                  💛 {titleName}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-200">
                  Total: <strong className="text-white font-mono">{userProfile.currentXp} XP</strong>
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-amber-400 font-black">
                  #1 no Ranking
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 pt-1 max-w-md">
                <div className="flex items-center justify-between text-[11px] font-bold text-purple-200">
                  <span>Progresso Nível {userProfile.currentLevel}</span>
                  <span className="font-mono text-amber-300">{userProfile.currentXp} / {userProfile.nextLevelXp} XP</span>
                </div>
                <div className="h-3 bg-[#0d041c] rounded-full overflow-hidden border border-purple-400/40 p-[1.5px] shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(251,191,36,0.7)]"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Collection Stat Badge */}
          <div className="px-4 py-3 rounded-2xl bg-black/30 border border-purple-400/30 text-center sm:text-right flex-shrink-0">
            <span className="text-[10px] uppercase font-bold text-purple-300">Coleção Coletada</span>
            <div className="text-lg font-black text-amber-300 font-display">
              {totalCollected} / {totalItems} <span className="text-xs text-gray-300 font-normal">({percentCollected}%)</span>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* SHOWCASE BENTO: HIGH-DEFINITION STAGE (LEFT) + MINI PROFILE & DETAILS (RIGHT) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: LARGE HIGH-DEFINITION STAGE (lg:col-span-7) */}
        <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#12072c] via-[#0c041d] to-[#070212] border-2 border-purple-500/40 p-6 sm:p-8 flex flex-col items-center justify-center relative shadow-[0_0_35px_rgba(147,51,234,0.25)] min-h-[380px] overflow-hidden group">
          
          {/* Background Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-4 left-6 text-amber-300/40 text-xs pointer-events-none">✦</div>
          <div className="absolute top-6 right-8 text-purple-300/30 text-sm pointer-events-none">✨</div>
          <div className="absolute bottom-6 left-8 text-cyan-300/30 text-xs pointer-events-none">✦</div>

          {/* Cosmic Orbital Rings Animation */}
          <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-purple-400/20 absolute flex items-center justify-center animate-spin-slow pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] -top-1.5 absolute" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] -bottom-1 absolute" />
          </div>

          {/* Central Avatar Render */}
          <div className="relative my-4 z-10">
            <div className="p-4 sm:p-5 rounded-full bg-[#170938]/80 border-2 border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              <AvatarRenderer
                iconId={previewIconId}
                frameId={previewFrameId}
                badgeId={previewBadgeId}
                effectId={previewEffectId}
                size="2xl"
                showBadge={false}
                showEffect={true}
              />
            </div>

            {/* Level Badge Pill */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#1a0800] text-xs font-black border-2 border-amber-200 shadow-lg flex items-center gap-1">
              <Shield className="w-3 h-3 fill-[#1a0800]" />
              Nv.{userProfile.currentLevel}
            </div>
          </div>

          {/* High Definition Ribbon / Tier Banner */}
          <div className="mt-5 z-10">
            <div className="px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-600/30 to-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black tracking-wider uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              <span>✦</span>
              <span>VISUALIZAÇÃO DE ALTA DEFINIÇÃO</span>
              <span>✦</span>
            </div>
          </div>

          {/* Item Lore Quote */}
          {selectedItem.loreQuote && (
            <p className="text-[11px] text-purple-200/80 text-center italic mt-3 max-w-md z-10 px-4">
              {selectedItem.loreQuote}
            </p>
          )}

        </div>

        {/* RIGHT: MINI PROFILE CARD & COLLECTIBLE DETAILS (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* 1. PRÉVIA NO PERFIL (Mini Player Card) */}
          <div className="rounded-3xl bg-[#12072c] border-2 border-purple-500/40 p-4 sm:p-5 shadow-xl space-y-3 relative overflow-hidden">
            
            <div className="flex items-center justify-between text-[11px] font-black text-amber-400 tracking-wider uppercase">
              <span className="flex items-center gap-1.5">
                ✦ PRÉVIA NO PERFIL
              </span>
              <span className="text-purple-300 font-normal">
                ✦ {studentIdentity.code || 'Anônimo 001'}
              </span>
            </div>

            {/* Mini Profile Card Display */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#20054d] via-[#2f0962] to-[#45108a] border border-purple-400/40 flex items-center gap-3.5 shadow-inner">
              
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center">
                  <AvatarRenderer
                    iconId={previewIconId}
                    frameId={previewFrameId}
                    badgeId={previewBadgeId}
                    effectId={previewEffectId}
                    size="md"
                    showBadge={false}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white truncate">
                    {studentIdentity.code || 'Anônimo 001'}
                  </h4>
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black">
                    Nv. {userProfile.currentLevel}
                  </span>
                </div>

                <p className="text-[11px] font-bold text-amber-300 truncate">
                  💛 {previewTitleName}
                </p>

                <div className="text-[10px] text-purple-200/90 font-mono">
                  {userProfile.currentXp} XP • 100% Anônimo
                </div>
              </div>

            </div>

            {/* Quick Equip / Status Button */}
            <div className="pt-1">
              {isEquipped(selectedItem) ? (
                <div className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" /> Item Atualmente Equipado
                </div>
              ) : userProfile.unlockedCosmetics.includes(selectedItem.id) ? (
                <button
                  onClick={() => handleEquipDirect(selectedItem)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black text-center shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Check className="w-4 h-4" /> Equipar Este Item Agora
                </button>
              ) : (
                <div className="w-full py-2 px-3 rounded-xl bg-black/40 border border-white/10 text-gray-400 text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Requisito: {selectedItem.unlockCondition.description}
                </div>
              )}
            </div>

          </div>

          {/* 2. DETALHES DO COLECIONÁVEL (3 Rich Lore Cards) */}
          <div className="rounded-3xl bg-[#12072c] border-2 border-purple-500/40 p-4 sm:p-5 shadow-xl space-y-3">
            
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              DETALHES DO COLECIONÁVEL
            </h4>

            <div className="space-y-2.5">
              {selectedLore.map((detail, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-[#0a0319] border border-purple-500/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {detail.icon}
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h5 className="font-bold text-xs text-white">
                      {detail.title}
                    </h5>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {detail.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* BOTTOM CATALOG SECTION: CATEGORY SELECTOR & COLLECTIBLE ITEMS GRID */}
      {/* ========================================================================= */}
      <div className="rounded-3xl bg-[#0f0624] border-2 border-purple-500/40 p-5 sm:p-6 shadow-xl space-y-5">
        
        {/* Category Selector Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-purple-500/20">
          
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'frame' as CosmeticCategory, label: 'Molduras', icon: <Layers className="w-4 h-4" /> },
              { id: 'icon' as CosmeticCategory, label: 'Ícones', icon: <Smile className="w-4 h-4" /> },
              { id: 'title' as CosmeticCategory, label: 'Títulos', icon: <Crown className="w-4 h-4" /> },
              { id: 'effect' as CosmeticCategory, label: 'Auras & Efeitos', icon: <Flame className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedCategory(tab.id);
                  const firstInCat = COSMETICS_CATALOG.find(c => c.category === tab.id);
                  if (firstInCat) setSelectedItem(firstInCat);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/40 border border-purple-300'
                    : 'bg-[#180c38] text-gray-300 hover:text-white hover:bg-purple-900/40 border border-purple-500/20'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar item..."
                value={customSearch}
                onChange={(e) => setCustomSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-black/40 border border-purple-500/30 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
              />
            </div>

            <select
              value={customFilter}
              onChange={(e) => setCustomFilter(e.target.value as any)}
              className="py-1.5 px-3 rounded-xl bg-[#180c38] border border-purple-500/30 text-xs text-purple-200 focus:outline-none focus:border-purple-400 font-bold cursor-pointer"
            >
              <option value="todos">Todos</option>
              <option value="desbloqueados">Desbloqueados</option>
              <option value="bloqueados">Bloqueados</option>
              <option value="raros">Raros & Lendários</option>
            </select>
          </div>

        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {categoryCosmetics.map(item => {
            const isUnlocked = userProfile.unlockedCosmetics.includes(item.id);
            const equipped = isEquipped(item);
            const isSelected = selectedItem.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-[#220d4f] border-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.35)] scale-[1.02]'
                    : equipped
                    ? 'bg-[#190a3b] border-purple-500/60'
                    : isUnlocked
                    ? 'bg-[#12072c] border-purple-500/20 hover:border-purple-400/50 hover:bg-[#1a0b40]'
                    : 'bg-black/40 border-white/5 opacity-60 hover:opacity-80'
                }`}
              >
                {/* Rarity & Status Badge */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                    item.rarity === 'mitico' ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40' :
                    item.rarity === 'lendario' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' :
                    item.rarity === 'epico' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    item.rarity === 'raro' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                    'bg-slate-500/20 text-slate-300 border border-slate-500/40'
                  }`}>
                    {item.rarity}
                  </span>

                  {equipped ? (
                    <span className="flex items-center gap-0.5 text-[9px] font-black text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                      <Check className="w-2.5 h-2.5" /> Equipado
                    </span>
                  ) : !isUnlocked ? (
                    <span className="text-[10px] text-gray-500">
                      <Lock className="w-3 h-3 text-amber-400/80" />
                    </span>
                  ) : null}
                </div>

                {/* Thumbnail Viewport */}
                <div className="py-2 flex items-center justify-center">
                  <div className="w-14 h-14 flex items-center justify-center">
                    {item.category === 'frame' ? (
                      <AvatarRenderer
                        iconId="icon_anonimo_padrao"
                        frameId={item.id}
                        size="sm"
                        showBadge={false}
                      />
                    ) : item.category === 'icon' ? (
                      <AvatarRenderer
                        iconId={item.id}
                        frameId="frame_padrao_madeira"
                        size="sm"
                        showBadge={false}
                      />
                    ) : item.category === 'badge' ? (
                      <AvatarRenderer
                        iconId="icon_anonimo_padrao"
                        badgeId={item.id}
                        size="sm"
                        showBadge={true}
                      />
                    ) : (
                      <div className="text-xl">
                        {item.category === 'title' ? '👑' : '✨'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Item Name */}
                <div className="text-center pt-2 space-y-1">
                  <h5 className="font-bold text-xs text-white truncate" title={item.name}>
                    {item.name}
                  </h5>

                  {isUnlocked ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEquipDirect(item);
                      }}
                      className={`w-full py-1 rounded-xl text-[10px] font-black transition-all cursor-pointer ${
                        equipped
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                      }`}
                    >
                      {equipped ? 'Equipado' : 'Equipar'}
                    </button>
                  ) : (
                    <div className="text-[9px] text-gray-400 truncate" title={item.unlockCondition.description}>
                      {item.unlockCondition.description}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
