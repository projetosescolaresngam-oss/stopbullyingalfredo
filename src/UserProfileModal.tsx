import React, { useState, useMemo } from 'react';
import { useApp } from './AppContext';
import { AvatarRenderer } from './AvatarRenderer';
import { AchievementBadgeFrame } from './AchievementBadgeFrame';
import { COSMETICS_CATALOG } from './cosmeticsRewards';
import { LEVEL_PROGRESSION_TABLE } from './levelProgression';
import { Achievement, AchievementCategory, CosmeticCategory, CosmeticItem } from './types';
import { 
  X, 
  Sparkles, 
  Trophy, 
  Shield, 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Award,
  ArrowRight,
  TrendingUp,
  Zap,
  Smile,
  Crown,
  Search,
  Check,
  Eye,
  Calendar,
  Gift,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Compass,
  Heart,
  Orbit,
  Gem,
  Palette
} from 'lucide-react';

interface UserProfileModalProps {
  onClose: () => void;
  onNavigateToCollection?: () => void;
  initialTab?: 'visao_geral' | 'personalizar' | 'colecao' | 'missoes' | 'conquistas';
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  onClose,
  onNavigateToCollection,
  initialTab = 'visao_geral'
}) => {
  const { 
    userProfile, 
    studentIdentity, 
    achievements, 
    userStats, 
    equipCosmetic, 
    awardXp 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'visao_geral' | 'personalizar' | 'colecao' | 'missoes' | 'conquistas'>(initialTab);

  // Customizer State
  const [selectedCustomCategory, setSelectedCustomCategory] = useState<CosmeticCategory>('frame');
  const [customFilter, setCustomFilter] = useState<'todos' | 'desbloqueados' | 'bloqueados' | 'raros'>('todos');
  const [customSearch, setCustomSearch] = useState('');
  
  // Selected / Inspected Item in Personalizar Perfil tab
  const [selectedItem, setSelectedItem] = useState<CosmeticItem>(() => {
    return COSMETICS_CATALOG.find(c => c.id === userProfile.equippedFrameId) || COSMETICS_CATALOG[0];
  });

  // Achievement Filter State
  const [selectedAchievementCategory, setSelectedAchievementCategory] = useState<AchievementCategory | 'all'>('all');

  // Stats Calculations
  const xpPercent = Math.min(100, Math.round((userProfile.currentXp / userProfile.nextLevelXp) * 100));
  const unlockedAchievementsCount = achievements.filter(a => a.isUnlocked).length;
  const totalAchievementsCount = achievements.length;
  const totalCosmeticsCount = COSMETICS_CATALOG.length;
  const unlockedCosmeticsCount = COSMETICS_CATALOG.filter(c => userProfile.unlockedCosmetics.includes(c.id)).length;
  
  const equippedTitleObj = COSMETICS_CATALOG.find(c => c.id === userProfile.equippedTitleId);
  const equippedBadgeObj = COSMETICS_CATALOG.find(c => c.id === userProfile.equippedBadgeId);
  const equippedFrameObj = COSMETICS_CATALOG.find(c => c.id === userProfile.equippedFrameId);
  const equippedIconObj = COSMETICS_CATALOG.find(c => c.id === userProfile.equippedIconId);
  const equippedEffectObj = COSMETICS_CATALOG.find(c => c.id === userProfile.equippedEffectId);

  const titleName = equippedTitleObj?.name || userProfile.levelTitle || 'Pacificador Escolar';
  const badgeName = equippedBadgeObj?.name || 'Emblema Lupa Dourada do Detetive';

  // Filtered cosmetic items for the Customizer tab
  const categoryCosmetics = useMemo(() => {
    return COSMETICS_CATALOG.filter(item => {
      if (item.category !== selectedCustomCategory) return false;
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
  }, [selectedCustomCategory, customFilter, customSearch, userProfile.unlockedCosmetics]);

  // Is an item currently equipped
  const isItemEquipped = (item: CosmeticItem) => {
    switch (item.category) {
      case 'icon': return userProfile.equippedIconId === item.id;
      case 'frame': return userProfile.equippedFrameId === item.id;
      case 'badge': return userProfile.equippedBadgeId === item.id;
      case 'title': return userProfile.equippedTitleId === item.id;
      case 'effect': return userProfile.equippedEffectId === item.id;
      default: return false;
    }
  };

  // Preview attributes based on whether selectedItem overrides equipped item
  const previewIconId = selectedItem.category === 'icon' ? selectedItem.id : userProfile.equippedIconId;
  const previewFrameId = selectedItem.category === 'frame' ? selectedItem.id : userProfile.equippedFrameId;
  const previewBadgeId = selectedItem.category === 'badge' ? selectedItem.id : userProfile.equippedBadgeId;
  const previewEffectId = selectedItem.category === 'effect' ? selectedItem.id : userProfile.equippedEffectId;
  const previewTitleName = selectedItem.category === 'title' ? selectedItem.name : titleName;

  // Equip handler
  const handleEquip = (item: CosmeticItem) => {
    equipCosmetic(item.category, item.id);
    setSelectedItem(item);
  };

  // Item inspection details generator for 3 game cards
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

  // Daily Quests Data
  const dailyQuests = [
    {
      id: 'quest_1',
      title: 'Momento de Harmonia Zen',
      desc: 'Realize 1 sessão de respiração consciente (4-7-8) no Apoio Emocional.',
      xp: 40,
      completed: userStats.breathingSessionsCount > 0,
      progress: `${Math.min(1, userStats.breathingSessionsCount)}/1`
    },
    {
      id: 'quest_2',
      title: 'Mente Brilhante no Quiz',
      desc: 'Conclua pelo menos 1 rodada do Quiz Educativo sobre Leis Anti-Bullying.',
      xp: 50,
      completed: userStats.quizzesCompletedCount > 0,
      progress: `${Math.min(1, userStats.quizzesCompletedCount)}/1`
    },
    {
      id: 'quest_3',
      title: 'Explorador da Matriz Escolar',
      desc: 'Conheça e estude os diferentes tipos de bullying na Matriz Educativa.',
      xp: 35,
      completed: userStats.exploredBullyingTypes.length >= 2,
      progress: `${Math.min(2, userStats.exploredBullyingTypes.length)}/2`
    },
    {
      id: 'quest_4',
      title: 'Guardião do Respeito',
      desc: 'Consulte o Guia do Respeito e leia as diretrizes de convivência pacífica.',
      xp: 30,
      completed: userStats.areasVisited?.includes('guia') || false,
      progress: userStats.areasVisited?.includes('guia') ? '1/1' : '0/1'
    }
  ];

  const completedQuestsCount = dailyQuests.filter(q => q.completed).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0b051c] border-2 border-purple-500/50 rounded-[28px] sm:rounded-[36px] max-w-5xl w-full p-0 shadow-[0_0_50px_rgba(147,51,234,0.35)] relative my-4 sm:my-8 text-white max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* ========================================================================= */}
        {/* TOP HEADER: EXACT REFERENCE GRADIENT & COSMIC PROFILE BANNER */}
        {/* ========================================================================= */}
        <div className="relative p-5 sm:p-7 bg-gradient-to-r from-[#1c063b] via-[#2a0852] to-[#451070] border-b border-purple-400/30 overflow-hidden flex-shrink-0">
          
          {/* Subtle Background Stars / Twinkles */}
          <div className="absolute top-2 left-6 text-amber-300/40 text-xs animate-pulse pointer-events-none">✨</div>
          <div className="absolute top-4 right-20 text-purple-200/30 text-sm pointer-events-none">✦</div>
          <div className="absolute bottom-3 left-1/3 text-amber-200/30 text-xs pointer-events-none">✦</div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10 focus:outline-none"
            title="Fechar Janela"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Profile Header Content */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pr-8">
            
            {/* Avatar Viewport with Nv.4 Badge */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <AvatarRenderer
                  iconId={userProfile.equippedIconId}
                  frameId={userProfile.equippedFrameId}
                  badgeId={userProfile.equippedBadgeId}
                  effectId={userProfile.equippedEffectId}
                  size="xl"
                  showBadge={false}
                />
              </div>
              
              {/* Golden Level Pill */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#1a0800] text-xs font-black border-2 border-amber-200 shadow-md flex items-center gap-1 whitespace-nowrap">
                <Shield className="w-3 h-3 fill-[#1a0800]" />
                Nv.{userProfile.currentLevel}
              </div>
            </div>

            {/* Profile Info & Breadcrumbs */}
            <div className="flex-1 text-center sm:text-left space-y-2 w-full min-w-0">
              
              {/* Name + 100% Anônimo + Emblem Pill */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 sm:pt-0">
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

              {/* Title & Stats Breadcrumb */}
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

              {/* Level Progress Bar */}
              <div className="space-y-1 pt-1 max-w-xl">
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
        </div>

        {/* ========================================================================= */}
        {/* NAVIGATION TABS: EXACT REFERENCE WITH COUNTER PILLS & PURPLE UNDERLINE */}
        {/* ========================================================================= */}
        <div className="bg-[#0f0724] border-b border-purple-500/20 px-4 sm:px-6 flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none flex-shrink-0">
          
          <button
            onClick={() => setActiveTab('visao_geral')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeTab === 'visao_geral'
                ? 'text-white border-purple-400 shadow-[0_4px_12px_rgba(168,85,247,0.3)]'
                : 'text-gray-400 hover:text-white border-transparent'
            }`}
          >
            <Shield className="w-4 h-4 text-purple-400" />
            Visão Geral
          </button>

          <button
            onClick={() => setActiveTab('personalizar')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeTab === 'personalizar'
                ? 'text-purple-300 border-purple-400 font-extrabold shadow-[0_4px_12px_rgba(168,85,247,0.3)]'
                : 'text-gray-400 hover:text-white border-transparent'
            }`}
          >
            <Palette className="w-4 h-4 text-purple-400" />
            Personalizar Perfil
          </button>

          <button
            onClick={() => setActiveTab('colecao')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeTab === 'colecao'
                ? 'text-white border-purple-400 shadow-[0_4px_12px_rgba(168,85,247,0.3)]'
                : 'text-gray-400 hover:text-white border-transparent'
            }`}
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            Minha Coleção
            <span className="px-1.5 py-0.5 rounded-full bg-purple-900/60 text-purple-200 text-[10px] font-mono border border-purple-400/30">
              {unlockedCosmeticsCount}/{totalCosmeticsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('missoes')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeTab === 'missoes'
                ? 'text-white border-purple-400 shadow-[0_4px_12px_rgba(168,85,247,0.3)]'
                : 'text-gray-400 hover:text-white border-transparent'
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            Missões Diárias
            <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/40">
              {completedQuestsCount}/4
            </span>
          </button>

          <button
            onClick={() => setActiveTab('conquistas')}
            className={`py-3.5 px-2 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              activeTab === 'conquistas'
                ? 'text-white border-purple-400 shadow-[0_4px_12px_rgba(168,85,247,0.3)]'
                : 'text-gray-400 hover:text-white border-transparent'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            Desafios & Conquistas
            <span className="px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[10px] font-mono border border-orange-500/40">
              {unlockedAchievementsCount}/{totalAchievementsCount}
            </span>
          </button>

        </div>

        {/* ========================================================================= */}
        {/* BODY CONTAINER WITH SCROLL */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#090416]">

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 1: VISÃO GERAL (Reference Screenshot 1) */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'visao_geral' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* 4 Stat Cards in a Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                
                <div className="p-4 rounded-3xl bg-[#12092c] border border-purple-500/30 text-center space-y-1 shadow-lg hover:border-purple-400/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto mb-1">
                    <Palette className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">RECOMPENSAS</span>
                  <p className="text-2xl font-black text-white font-display">
                    {unlockedCosmeticsCount} <span className="text-xs text-gray-400 font-normal">/ {totalCosmeticsCount}</span>
                  </p>
                </div>

                <div className="p-4 rounded-3xl bg-[#12092c] border border-purple-500/30 text-center space-y-1 shadow-lg hover:border-purple-400/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto mb-1">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">CONQUISTAS</span>
                  <p className="text-2xl font-black text-white font-display">
                    {unlockedAchievementsCount} <span className="text-xs text-gray-400 font-normal">/ {totalAchievementsCount}</span>
                  </p>
                </div>

                <div className="p-4 rounded-3xl bg-[#12092c] border border-purple-500/30 text-center space-y-1 shadow-lg hover:border-purple-400/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-amber-600/20 text-amber-400 flex items-center justify-center mx-auto mb-1">
                    <Zap className="w-4 h-4 fill-amber-400" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">XP TOTAL</span>
                  <p className="text-2xl font-black text-amber-400 font-display">
                    {userProfile.currentXp} XP
                  </p>
                </div>

                <div className="p-4 rounded-3xl bg-[#12092c] border border-purple-500/30 text-center space-y-1 shadow-lg hover:border-purple-400/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto mb-1">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">RANKING</span>
                  <p className="text-2xl font-black text-emerald-400 font-display">
                    #1
                  </p>
                </div>

              </div>

              {/* Feature Banner 1: Personalização & Recompensas Virtuais */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#2a0852] via-[#1f063d] to-[#120429] border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                    🎁
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h3 className="font-display font-black text-lg text-white">
                        Personalização & Recompensas Virtuais
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase">
                        100% Cosmético
                      </span>
                    </div>
                    <p className="text-xs text-purple-200/80 max-w-xl">
                      Desbloqueie molduras, ícones, títulos e auras conforme sobe de nível e completa conquistas de convivência escolar.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('personalizar')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer transition-all flex-shrink-0"
                >
                  <Palette className="w-4 h-4" /> Personalizar Perfil
                </button>
              </div>

              {/* Feature Banner 2: Como evoluir mais rápido? */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1b0a38] to-[#110526] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-900/60 border border-purple-400/40 text-purple-300 flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                    ✨
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="font-display font-black text-base text-white">
                      Como evoluir mais rápido?
                    </h3>
                    <p className="text-xs text-gray-400">
                      Complete quizzes (+50 XP), simulações (+40 XP), sessões zen (+30 XP) e missões diárias.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    window.location.hash = 'quiz';
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-[#7e22ce] hover:bg-[#9333ea] text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer transition-all flex-shrink-0"
                >
                  <BookOpen className="w-4 h-4" /> Fazer Quiz (+50 XP)
                </button>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <button
                  onClick={() => setActiveTab('conquistas')}
                  className="p-4 rounded-3xl bg-[#12082b] hover:bg-[#1b0d3d] border border-purple-500/30 hover:border-purple-400/60 flex items-center justify-between transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                        Quadro de Conquistas
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        {unlockedAchievementsCount} de {totalAchievementsCount} medalhas desbloqueadas
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => setActiveTab('colecao')}
                  className="p-4 rounded-3xl bg-[#12082b] hover:bg-[#1b0d3d] border border-purple-500/30 hover:border-purple-400/60 flex items-center justify-between transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                        Ranking Anônimo Escolar
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        Competição saudável, anônima e segura
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                </button>

              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 2: PERSONALIZAR PERFIL (Exact Reference Screenshots 2 & 3) */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'personalizar' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* TOP SHOWCASE BENTO: HIGH-DEFINITION STAGE (LEFT) + MINI PROFILE & DETAILS (RIGHT) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT: LARGE HIGH-DEFINITION STAGE (lg:col-span-7) */}
                <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#12072c] via-[#0c041d] to-[#070212] border-2 border-purple-500/40 p-6 sm:p-8 flex flex-col items-center justify-center relative shadow-[0_0_35px_rgba(147,51,234,0.25)] min-h-[380px] overflow-hidden group">
                  
                  {/* Background Radial Glow & Cosmic Stars */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none" />
                  <div className="absolute top-4 left-6 text-amber-300/40 text-xs pointer-events-none">✦</div>
                  <div className="absolute top-6 right-8 text-purple-300/30 text-sm pointer-events-none">✨</div>
                  <div className="absolute bottom-6 left-8 text-cyan-300/30 text-xs pointer-events-none">✦</div>

                  {/* Cosmic Orbital Rings Animation Behind Avatar */}
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-purple-400/20 absolute flex items-center justify-center animate-spin-slow pointer-events-none">
                    <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b] -top-1.5 absolute" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] -bottom-1 absolute" />
                  </div>

                  {/* Central Avatar Render in 2XL High Definition */}
                  <div className="relative my-4 z-10 flex items-center justify-center">
                    <div className="p-2 sm:p-3 flex items-center justify-center">
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

                    {/* Level Badge Pill under Avatar */}
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
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-[#20054d] via-[#2f0962] to-[#45108a] border border-purple-400/40 flex items-center gap-3.5 shadow-inner">
                      
                      {/* Mini Avatar */}
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

                      {/* Mini Info */}
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
                      {isItemEquipped(selectedItem) ? (
                        <div className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-400" /> Item Atualmente Equipado
                        </div>
                      ) : userProfile.unlockedCosmetics.includes(selectedItem.id) ? (
                        <button
                          onClick={() => handleEquip(selectedItem)}
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

              {/* BOTTOM CATALOG SECTION: CATEGORY SELECTOR & COLLECTIBLE ITEMS GRID */}
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
                          setSelectedCustomCategory(tab.id);
                          const firstInCat = COSMETICS_CATALOG.find(c => c.category === tab.id);
                          if (firstInCat) setSelectedItem(firstInCat);
                        }}
                        className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                          selectedCustomCategory === tab.id
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
                    const equipped = isItemEquipped(item);
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
                                handleEquip(item);
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
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 3: MINHA COLEÇÃO (Full Inventory & Completion) */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'colecao' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Summary Cards */}
              <div className="p-5 rounded-3xl bg-[#12082b] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-black text-lg text-white">
                    Coleção Geral do Stop
                  </h3>
                  <p className="text-xs text-gray-400">
                    Você possui {unlockedCosmeticsCount} de {totalCosmeticsCount} itens virtuais desbloqueados ({Math.round((unlockedCosmeticsCount/totalCosmeticsCount)*100)}%).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('personalizar')}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Palette className="w-4 h-4" /> Ir para Vestiário
                  </button>
                </div>
              </div>

              {/* Categories Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { cat: 'frame' as CosmeticCategory, title: 'Molduras de Avatar', icon: '🖼️' },
                  { cat: 'badge' as CosmeticCategory, title: 'Emblemas de Honra', icon: '🛡️' },
                  { cat: 'icon' as CosmeticCategory, title: 'Ícones Colecionáveis', icon: '🎭' },
                  { cat: 'title' as CosmeticCategory, title: 'Títulos de Cidadania', icon: '🏷️' },
                  { cat: 'effect' as CosmeticCategory, title: 'Auras & Efeitos', icon: '✨' },
                ].map(({ cat, title, icon }) => {
                  const items = COSMETICS_CATALOG.filter(c => c.category === cat);
                  const unlocked = items.filter(c => userProfile.unlockedCosmetics.includes(c.id)).length;
                  const catPercent = Math.round((unlocked / items.length) * 100);

                  return (
                    <div key={cat} className="p-4 rounded-3xl bg-[#110729] border border-purple-500/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{icon}</span>
                        <span className="text-xs font-mono font-bold text-amber-300">
                          {unlocked} / {items.length} ({catPercent}%)
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-white">{title}</h4>
                        <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-white/10 mt-1.5">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${catPercent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCustomCategory(cat);
                          setActiveTab('personalizar');
                        }}
                        className="w-full py-1.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 text-xs font-bold transition-all cursor-pointer"
                      >
                        Ver Itens da Categoria
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 4: MISSÕES DIÁRIAS */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'missoes' && (
            <div className="space-y-4 animate-fadeIn">
              
              <div className="p-4 rounded-3xl bg-[#12082b] border border-purple-500/30 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-black text-base text-white">
                    Missões de Convivência & Cidadania
                  </h3>
                  <p className="text-xs text-gray-400">
                    Realize ações educativas no aplicativo diariamente para acelerar seu ganho de XP e desbloquear molduras raras.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">
                  {completedQuestsCount}/4 Concluídas
                </span>
              </div>

              <div className="space-y-3">
                {dailyQuests.map(quest => (
                  <div 
                    key={quest.id}
                    className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                      quest.completed 
                        ? 'bg-[#140a33] border-emerald-500/40 shadow-sm'
                        : 'bg-[#0f0624] border-purple-500/20'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        quest.completed
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                      }`}>
                        {quest.completed ? <Check className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">
                            {quest.title}
                          </h4>
                          <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.2 rounded bg-amber-500/10 border border-amber-500/30">
                            +{quest.xp} XP
                          </span>
                        </div>
                        <p className="text-xs text-gray-300">
                          {quest.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xs font-mono font-bold text-purple-300">
                        {quest.progress}
                      </span>
                      {quest.completed ? (
                        <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                          Concluída ✓
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            onClose();
                            if (quest.id === 'quest_1') window.location.hash = 'apoio';
                            if (quest.id === 'quest_2') window.location.hash = 'quiz';
                            if (quest.id === 'quest_3') window.location.hash = 'educativo';
                            if (quest.id === 'quest_4') window.location.hash = 'guia';
                          }}
                          className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                        >
                          Ir Cumprir
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 5: DESAFIOS & CONQUISTAS */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'conquistas' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Filter pills */}
              <div className="flex flex-wrap gap-2 pb-1">
                {(['all', 'sabedoria', 'detetive', 'empatia', 'zen', 'escudo'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedAchievementCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedAchievementCategory === cat
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-[#180c38] text-gray-400 hover:text-white border border-purple-500/20'
                    }`}
                  >
                    {cat === 'all' ? 'Todas' :
                     cat === 'sabedoria' ? 'Sabedoria' :
                     cat === 'detetive' ? 'Detetive' :
                     cat === 'empatia' ? 'Empatia' :
                     cat === 'zen' ? 'Zen & Harmonia' : 'Escudo & Proteção'}
                  </button>
                ))}
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {achievements
                  .filter(a => selectedAchievementCategory === 'all' || a.category === selectedAchievementCategory)
                  .map(ach => (
                    <div
                      key={ach.id}
                      className={`p-3.5 rounded-3xl border-2 flex items-start gap-3.5 transition-all ${
                        ach.isUnlocked
                          ? 'bg-[#140a33] border-purple-500/40 shadow-md'
                          : 'bg-black/40 border-white/5 opacity-70'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <AchievementBadgeFrame
                          achievementId={ach.id}
                          category={ach.category}
                          tier={ach.tier}
                          isUnlocked={ach.isUnlocked}
                          isSecret={ach.isSecret}
                          size="md"
                        />
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] uppercase font-black px-2 py-0.2 rounded-full ${
                            ach.tier === 'lendario' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40' :
                            ach.tier === 'ouro' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                            ach.tier === 'prata' ? 'bg-slate-500/20 text-slate-300 border border-slate-500/40' :
                            'bg-amber-800/20 text-amber-400 border border-amber-800/40'
                          }`}>
                            {ach.tier}
                          </span>

                          <span className="text-[10px] text-amber-400 font-bold font-mono">
                            +{ach.xpReward || 50} XP
                          </span>
                        </div>

                        <h5 className="font-bold text-xs text-white truncate">
                          {ach.isSecret && !ach.isUnlocked ? '🔒 Conquista Secreta' : ach.title}
                        </h5>

                        <p className="text-[11px] text-gray-300 leading-snug">
                          {ach.isSecret && !ach.isUnlocked
                            ? 'Descubra os requisitos misteriosos explorando o aplicativo.'
                            : ach.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM FOOTER BAR (Identificador + Fechar Button) */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 bg-[#0b051c] border-t border-purple-500/30 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="text-xs text-gray-400">
            Identificador: <strong className="text-white font-mono">{studentIdentity.code || 'Anônimo 001'}</strong>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
