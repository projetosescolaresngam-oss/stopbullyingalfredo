import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Sparkles, 
  Star, 
  Lock, 
  Layers, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  Info,
  Trophy,
  Flame,
  Award,
  Shield,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { Achievement, AchievementCategory, AchievementTier } from '../../types';
import { AchievementBadgeFrame } from '../../AchievementBadgeFrame';
import { playBreathTone } from '../../services/audioSynthesizer';
import { MuseumPieceModal } from './MuseumPieceModal';

export type MuseumPieceType = 
  | 'trofeu' 
  | 'medalha' 
  | 'certificado' 
  | 'insignia' 
  | 'artefato' 
  | 'reliquia' 
  | 'secreto';

export interface MuseumGalleryRoom {
  id: AchievementCategory | 'all' | 'secretas' | 'favoritas';
  name: string;
  shortName: string;
  icon: string;
  description: string;
  accentColor: string;
  bgGradient: string;
}

export const MUSEUM_GALLERY_ROOMS: MuseumGalleryRoom[] = [
  {
    id: 'all',
    name: 'Salão Geral das Coleções',
    shortName: 'Todas as Peças',
    icon: '🏛️',
    description: 'A visão panorâmica de todo o acervo histórico de honra e cidadania.',
    accentColor: 'from-purple-600 to-indigo-600',
    bgGradient: 'bg-purple-900/20'
  },
  {
    id: 'sabedoria',
    name: 'Galeria do Saber & Leis',
    shortName: 'Ala Sabedoria',
    icon: '📜',
    description: 'Estudos éticos, legislação 13.185 e domínio dos princípios democráticos.',
    accentColor: 'from-amber-500 to-yellow-600',
    bgGradient: 'bg-amber-900/20'
  },
  {
    id: 'detetive',
    name: 'Galeria da Perícia & Tipologias',
    shortName: 'Ala Perícia',
    icon: '🔍',
    description: 'Investigação das tipologias de agressão, triagens e olhar vigilante.',
    accentColor: 'from-cyan-500 to-blue-600',
    bgGradient: 'bg-cyan-900/20'
  },
  {
    id: 'empatia',
    name: 'Galeria da Convivência & Acolhimento',
    shortName: 'Ala Empatia',
    icon: '🤝',
    description: 'Atitudes ativas de acolhimento, escuta atenta e fraternidade nos corredores.',
    accentColor: 'from-pink-500 to-rose-600',
    bgGradient: 'bg-pink-900/20'
  },
  {
    id: 'zen',
    name: 'Galeria da Serenidade & Autocuidado',
    shortName: 'Ala Serenidade',
    icon: '🌊',
    description: 'Autorregulação emocional, técnicas respiratórias 4-7-8 e paz interior.',
    accentColor: 'from-teal-400 to-emerald-600',
    bgGradient: 'bg-teal-900/20'
  },
  {
    id: 'escudo',
    name: 'Galeria da Proteção & Escola Segura',
    shortName: 'Ala Proteção',
    icon: '🛡️',
    description: 'Canais sigilosos, defesa digital contra o cyberbullying e segurança coletiva.',
    accentColor: 'from-indigo-500 to-violet-600',
    bgGradient: 'bg-indigo-900/20'
  },
  {
    id: 'secretas',
    name: 'Câmara dos Mistérios Escolares',
    shortName: 'Salão Secreto',
    icon: '🔐',
    description: 'Peças raras, relíquias ocultas e feitos extraordinários desvendados.',
    accentColor: 'from-purple-700 to-fuchsia-700',
    bgGradient: 'bg-purple-950/40'
  }
];

export interface MuseumPieceDetails {
  pieceNumber: string;
  pieceNumberInt: number;
  pieceType: MuseumPieceType;
  pieceTypeLabel: string;
  pieceTypeIcon: string;
  galleryName: string;
  materials: string;
  isCertificate: boolean;
  pedestalStyle: {
    baseBorder: string;
    glowColor: string;
    ambientBg: string;
    tagClass: string;
  };
}

/**
 * Determina o tipo de peça museológica e sua estética física com base nos dados reais da conquista.
 */
export function getMuseumPieceDetails(achievement: Achievement, index: number): MuseumPieceDetails {
  const num = index + 1;
  const pieceNumber = `PEÇA Nº ${String(num).padStart(3, '0')}`;

  let pieceType: MuseumPieceType = 'insignia';
  let pieceTypeLabel = 'Insígnia de Honra';
  let pieceTypeIcon = '🛡️';
  let isCertificate = false;

  if (achievement.isSecret && !achievement.isUnlocked) {
    pieceType = 'secreto';
    pieceTypeLabel = 'Peça Secreta Enigmática';
    pieceTypeIcon = '🔐';
  } else if (achievement.tier === 'lendario') {
    pieceType = 'reliquia';
    pieceTypeLabel = 'Relíquia Cósmica Exclusiva';
    pieceTypeIcon = '👑';
  } else if (
    achievement.category === 'sabedoria' && 
    (achievement.id.includes('gabarito') || achievement.id.includes('doutor') || achievement.id.includes('oraculo'))
  ) {
    pieceType = 'trofeu';
    pieceTypeLabel = 'Troféu de Sabedoria';
    pieceTypeIcon = '🏆';
  } else if (
    achievement.id.includes('direitos') || 
    achievement.id.includes('lei') || 
    achievement.id.includes('respeito_em_acao') ||
    achievement.id.includes('mestre') ||
    achievement.id.includes('guardiao_supremo')
  ) {
    pieceType = 'certificado';
    pieceTypeLabel = 'Certificado Cívico';
    pieceTypeIcon = '📜';
    isCertificate = true;
  } else if (achievement.category === 'zen' || achievement.tier === 'ouro') {
    pieceType = 'artefato';
    pieceTypeLabel = 'Artefato Especial';
    pieceTypeIcon = '💎';
  } else if (achievement.category === 'empatia') {
    pieceType = 'medalha';
    pieceTypeLabel = 'Medalha de Empatia';
    pieceTypeIcon = '🎖️';
  } else {
    pieceType = 'insignia';
    pieceTypeLabel = 'Insígnia Protetora';
    pieceTypeIcon = '🛡️';
  }

  // Galeria
  const room = MUSEUM_GALLERY_ROOMS.find(r => r.id === achievement.category);
  const galleryName = achievement.isSecret ? 'Câmara dos Mistérios' : (room?.name || 'Salão Geral');

  // Materiais e acabamento de acordo com o Tier
  let materials = 'Bronze Forjado, Carvalho Escovado e Pátina Antiga';
  let pedestalStyle = {
    baseBorder: 'border-amber-700/50',
    glowColor: 'rgba(217, 119, 6, 0.15)',
    ambientBg: 'bg-amber-950/20',
    tagClass: 'bg-amber-900/30 text-amber-300 border-amber-700/50'
  };

  switch (achievement.tier) {
    case 'lendario':
      materials = 'Ametista Estelar, Ouro Astral 24k, Cristal Lapidado & Névoa Cósmica';
      pedestalStyle = {
        baseBorder: 'border-purple-500/70',
        glowColor: 'rgba(168, 85, 247, 0.35)',
        ambientBg: 'bg-purple-950/30',
        tagClass: 'bg-purple-900/50 text-fuchsia-200 border-purple-400/60 shadow-lg shadow-purple-900/30'
      };
      break;
    case 'ouro':
      materials = 'Ouro Imperial Maciço 24k, Filigranas Nobres & Cabochão de Rubi';
      pedestalStyle = {
        baseBorder: 'border-amber-400/70',
        glowColor: 'rgba(245, 158, 11, 0.3)',
        ambientBg: 'bg-amber-950/30',
        tagClass: 'bg-amber-900/40 text-amber-200 border-amber-400/60 shadow-md shadow-amber-900/20'
      };
      break;
    case 'prata':
      materials = 'Prata Esterlina 925 Polida, Aço Azul Escovado & Safiras Lapidadas';
      pedestalStyle = {
        baseBorder: 'border-blue-300/60',
        glowColor: 'rgba(59, 130, 246, 0.2)',
        ambientBg: 'bg-blue-950/20',
        tagClass: 'bg-slate-800/60 text-blue-200 border-blue-400/40'
      };
      break;
    default:
      materials = 'Bronze Forjado a Fogo, Carvalho Nobre & Rebites Metálicos';
      pedestalStyle = {
        baseBorder: 'border-amber-700/50',
        glowColor: 'rgba(180, 83, 9, 0.15)',
        ambientBg: 'bg-amber-950/20',
        tagClass: 'bg-amber-950/40 text-amber-300 border-amber-700/40'
      };
      break;
  }

  return {
    pieceNumber,
    pieceNumberInt: num,
    pieceType,
    pieceTypeLabel,
    pieceTypeIcon,
    galleryName,
    materials,
    isCertificate,
    pedestalStyle
  };
}

interface MuseumStatsHeaderProps {
  achievements: Achievement[];
  favoriteAchId: string | null;
  onOpenFeatured?: () => void;
  ambientLightEnabled: boolean;
  onToggleAmbientLight: () => void;
  onOpenRanksTable?: () => void;
}

export const MuseumStatsHeader: React.FC<MuseumStatsHeaderProps> = ({
  achievements,
  favoriteAchId,
  onOpenFeatured,
  ambientLightEnabled,
  onToggleAmbientLight,
  onOpenRanksTable
}) => {
  const totalCount = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const unlockedCount = unlockedAchievements.length;
  const lockedCount = totalCount - unlockedCount;
  const secretTotal = achievements.filter(a => a.isSecret).length;
  const secretUnlocked = achievements.filter(a => a.isSecret && a.isUnlocked).length;
  
  const completionPercent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  
  // Total XP proveniente de conquistas desbloqueadas
  const totalXpEarned = unlockedAchievements.reduce((acc, curr) => acc + (curr.xpReward || 50), 0);

  const favoriteAch = achievements.find(a => a.id === favoriteAchId);

  return (
    <div className="relative rounded-3xl bg-[#0d1222] border-2 border-purple-500/30 p-6 sm:p-8 text-white shadow-2xl overflow-hidden space-y-6 backdrop-blur-xl">
      {/* Luzes arquitetônicas de fundo do Museu */}
      {ambientLightEnabled && (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      {/* Top Meta Tag & Controles Ambientais */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-white/10 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/50 text-purple-300 text-[11px] font-black tracking-widest uppercase shadow-inner">
            🏛️ GALERIA OFICIAL DE HONRA & MEMÓRIA
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            EEMTI Alfredo Machado • Ceará Científico
          </span>
        </div>

        {/* Ambient Lights Toggle & Ranks Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAmbientLight}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              ambientLightEnabled 
                ? 'bg-purple-900/60 border-purple-400 text-purple-200 shadow-md shadow-purple-900/40' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
            title="Alternar iluminação dramática do museu"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{ambientLightEnabled ? 'Luzes de Exposição: Ligadas' : 'Luz Suave'}</span>
          </button>

          {onOpenRanksTable && (
            <button
              onClick={onOpenRanksTable}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Níveis</span>
            </button>
          )}
        </div>
      </div>

      {/* Título Principal & Filosofia da Coleção */}
      <div className="space-y-2 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-white flex items-center gap-3">
            <span>🏛️</span>
            <span>MUSEU DAS CONQUISTAS</span>
          </h2>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-purple-400 bg-purple-950/50 px-2.5 py-0.5 rounded-md border border-purple-700/50 w-fit">
            Acervo Permanente
          </span>
        </div>
        <p className="text-sm sm:text-base italic text-purple-200/90 font-serif max-w-3xl leading-relaxed">
          “Cada conquista conta uma parte da sua jornada. Você não está apenas ganhando pontos; está construindo seu próprio museu de cidadania, acolhimento e respeito.”
        </p>
      </div>

      {/* Barra de Progresso do Museu */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-gray-300 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Completude do Acervo do Museu:
          </span>
          <div className="flex items-center gap-2 font-mono font-bold text-amber-300 text-sm">
            <span>{unlockedCount} / {totalCount} Peças Tombadas</span>
            <span className="text-purple-400">({completionPercent}%)</span>
          </div>
        </div>

        {/* Progress Bar com efeito vitrine */}
        <div className="w-full h-3.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden p-0.5 relative shadow-inner">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-amber-400 transition-all duration-700 shadow-lg relative"
            style={{ width: `${Math.max(completionPercent, 4)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse pointer-events-none" />
          </div>
        </div>

        <div className="flex justify-between items-center text-[11px] text-gray-400">
          <span>Início da Coleção</span>
          <span>{totalCount - unlockedCount} peças aguardando descoberta</span>
          <span>Acervo Completo (100%)</span>
        </div>
      </div>

      {/* Grid de Métricas do Acervo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
        
        {/* Métrica 1: Peças Descobertas */}
        <div className="p-4 rounded-2xl bg-[#141b2e]/90 border border-purple-500/30 flex items-center gap-3.5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-xl flex-shrink-0">
            🏆
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-purple-300 tracking-wider block">
              Peças Descobertas
            </span>
            <span className="text-lg sm:text-xl font-mono font-black text-white">
              {unlockedCount}
            </span>
            <span className="text-[10px] text-gray-400 block">
              em exibição nas salas
            </span>
          </div>
        </div>

        {/* Métrica 2: Peças Secretas Desvendadas */}
        <div className="p-4 rounded-2xl bg-[#141b2e]/90 border border-purple-500/30 flex items-center gap-3.5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-xl flex-shrink-0">
            🔐
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-fuchsia-300 tracking-wider block">
              Segredos Ocultos
            </span>
            <span className="text-lg sm:text-xl font-mono font-black text-white">
              {secretUnlocked} / {secretTotal}
            </span>
            <span className="text-[10px] text-gray-400 block">
              relíquias reveladas
            </span>
          </div>
        </div>

        {/* Métrica 3: XP de Honra Acumulado */}
        <div className="p-4 rounded-2xl bg-[#141b2e]/90 border border-purple-500/30 flex items-center gap-3.5 shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl flex-shrink-0">
            ✨
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
              Honra em XP
            </span>
            <span className="text-lg sm:text-xl font-mono font-black text-amber-400">
              +{totalXpEarned} XP
            </span>
            <span className="text-[10px] text-gray-400 block">
              concedidos por mérito
            </span>
          </div>
        </div>

        {/* Métrica 4: Peça Favorita do Estudante */}
        <div 
          onClick={favoriteAch && onOpenFeatured ? onOpenFeatured : undefined}
          className={`p-4 rounded-2xl bg-[#141b2e]/90 border border-purple-500/30 flex items-center gap-3.5 shadow-sm transition-all ${
            favoriteAch ? 'cursor-pointer hover:border-amber-400/60 hover:bg-[#1a233d]' : ''
          }`}
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl flex-shrink-0">
            ⭐
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block truncate">
              Peça Favorita
            </span>
            <span className="text-xs sm:text-sm font-black text-white truncate block">
              {favoriteAch ? favoriteAch.title : 'Nenhuma eleita'}
            </span>
            <span className="text-[10px] text-gray-400 block truncate">
              {favoriteAch ? 'Em pedestal de honra' : 'Clique na estrela de uma peça'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

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

interface MuseumGalleryProps {
  achievements: Achievement[];
  studentCode?: string;
  onOpenRanksTable?: () => void;
  onNavigateToQuiz?: () => void;
  onNavigateToTriagem?: () => void;
}

const STORAGE_KEY_FAVORITE = 'sentinela_museum_favorite_ach';
const STORAGE_KEY_VIEWED = 'sentinela_viewed_museum_pieces';
const STORAGE_KEY_LIGHT = 'sentinela_museum_ambient_light';

export const MuseumGallery: React.FC<MuseumGalleryProps> = ({
  achievements,
  studentCode = 'Anônimo 001',
  onOpenRanksTable,
  onNavigateToQuiz,
  onNavigateToTriagem
}) => {
  // Estado de Peça Favorita
  const [favoriteAchId, setFavoriteAchId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_FAVORITE);
    } catch {
      return null;
    }
  });

  // Estado de Peças Visualizadas (para o marcador ✨ NOVA)
  const [viewedPieceIds, setViewedPieceIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_VIEWED);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Luz ambiente do museu
  const [ambientLightEnabled, setAmbientLightEnabled] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_LIGHT);
      return raw !== null ? JSON.parse(raw) : true;
    } catch {
      return true;
    }
  });

  // Filtros e Navegação entre Salas
  const [selectedRoom, setSelectedRoom] = useState<AchievementCategory | 'all' | 'secretas' | 'favoritas'>('all');
  const [statusFilter, setStatusFilter] = useState<'todas' | 'desbloqueadas' | 'bloqueadas' | 'secretas' | 'favoritas'>('todas');
  const [sortBy, setSortBy] = useState<'numero' | 'recentes' | 'raridade' | 'favoritas'>('numero');
  const [searchTerm, setSearchTerm] = useState('');

  // Inspeção da Peça em Modal
  const [inspectedAchievement, setInspectedAchievement] = useState<Achievement | null>(null);

  // Sincronizar Favorito no LocalStorage
  const handleToggleFavorite = (id: string) => {
    setFavoriteAchId(prev => {
      const next = prev === id ? null : id;
      try {
        if (next) {
          localStorage.setItem(STORAGE_KEY_FAVORITE, next);
        } else {
          localStorage.removeItem(STORAGE_KEY_FAVORITE);
        }
      } catch {}
      return next;
    });
  };

  // Marcar como visualizada ao inspecionar
  const handleInspectPiece = (ach: Achievement) => {
    setInspectedAchievement(ach);
    if (!viewedPieceIds.includes(ach.id)) {
      const updated = [...viewedPieceIds, ach.id];
      setViewedPieceIds(updated);
      try {
        localStorage.setItem(STORAGE_KEY_VIEWED, JSON.stringify(updated));
      } catch {}
    }
  };

  // Alternar luz ambiente
  const handleToggleLight = () => {
    setAmbientLightEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY_LIGHT, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Determinar a Conquista em Destaque no Pedestal de Honra
  const featuredAchievement = useMemo(() => {
    // 1. Se tem favorita, ela é o destaque
    if (favoriteAchId) {
      const found = achievements.find(a => a.id === favoriteAchId);
      if (found) return found;
    }
    // 2. Se tem lendária desbloqueada
    const legendary = achievements.find(a => a.isUnlocked && a.tier === 'lendario');
    if (legendary) return legendary;

    // 3. Primeira desbloqueada de ouro ou regular
    const gold = achievements.find(a => a.isUnlocked && a.tier === 'ouro');
    if (gold) return gold;

    const anyUnlocked = achievements.find(a => a.isUnlocked);
    if (anyUnlocked) return anyUnlocked;

    // 4. Fallback: primeira da lista
    return achievements[0];
  }, [achievements, favoriteAchId]);

  const featuredIndex = useMemo(() => {
    if (!featuredAchievement) return 0;
    return achievements.findIndex(a => a.id === featuredAchievement.id);
  }, [achievements, featuredAchievement]);

  // Filtragem e Ordenação
  const filteredAndSortedPieces = useMemo(() => {
    let list = achievements.map((ach, originalIndex) => ({
      achievement: ach,
      originalIndex
    }));

    // Filtro por Sala / Ala
    if (selectedRoom === 'secretas') {
      list = list.filter(item => item.achievement.isSecret);
    } else if (selectedRoom === 'favoritas') {
      list = list.filter(item => item.achievement.id === favoriteAchId);
    } else if (selectedRoom !== 'all') {
      list = list.filter(item => item.achievement.category === selectedRoom);
    }

    // Filtro por Status
    if (statusFilter === 'desbloqueadas') {
      list = list.filter(item => item.achievement.isUnlocked);
    } else if (statusFilter === 'bloqueadas') {
      list = list.filter(item => !item.achievement.isUnlocked);
    } else if (statusFilter === 'secretas') {
      list = list.filter(item => item.achievement.isSecret);
    } else if (statusFilter === 'favoritas') {
      list = list.filter(item => item.achievement.id === favoriteAchId);
    }

    // Busca textual
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(item => {
        const ach = item.achievement;
        const details = getMuseumPieceDetails(ach, item.originalIndex);
        return (
          ach.title.toLowerCase().includes(q) ||
          (ach.subtitle || '').toLowerCase().includes(q) ||
          ach.description.toLowerCase().includes(q) ||
          details.pieceNumber.toLowerCase().includes(q) ||
          details.pieceTypeLabel.toLowerCase().includes(q) ||
          details.galleryName.toLowerCase().includes(q)
        );
      });
    }

    // Ordenação
    list.sort((a, b) => {
      if (sortBy === 'favoritas') {
        const aFav = a.achievement.id === favoriteAchId ? 1 : 0;
        const bFav = b.achievement.id === favoriteAchId ? 1 : 0;
        if (aFav !== bFav) return bFav - aFav;
      }
      if (sortBy === 'recentes') {
        // Desbloqueadas primeiro
        const aUnl = a.achievement.isUnlocked ? 1 : 0;
        const bUnl = b.achievement.isUnlocked ? 1 : 0;
        if (aUnl !== bUnl) return bUnl - aUnl;
      }
      if (sortBy === 'raridade') {
        const tierRank: Record<string, number> = {
          lendario: 4,
          ouro: 3,
          prata: 2,
          bronze: 1
        };
        const rankA = tierRank[a.achievement.tier] || 0;
        const rankB = tierRank[b.achievement.tier] || 0;
        if (rankA !== rankB) return rankB - rankA;
      }
      // Padrão: número da peça
      return a.originalIndex - b.originalIndex;
    });

    return list;
  }, [achievements, selectedRoom, statusFilter, searchTerm, sortBy, favoriteAchId]);

  return (
    <div className="space-y-8 animate-fadeIn text-white">

      {/* 1. CABEÇALHO DO MUSEU & ESTATÍSTICAS DA COLEÇÃO */}
      <MuseumStatsHeader
        achievements={achievements}
        favoriteAchId={favoriteAchId}
        onOpenFeatured={() => {
          if (featuredAchievement) {
            handleInspectPiece(featuredAchievement);
          }
        }}
        ambientLightEnabled={ambientLightEnabled}
        onToggleAmbientLight={handleToggleLight}
        onOpenRanksTable={onOpenRanksTable}
      />

      {/* 2. PEDESTAL CENTRAL DE HONRA (PEÇA EM DESTAQUE) */}
      {featuredAchievement && (
        <MuseumFeaturedPiece
          achievement={featuredAchievement}
          index={featuredIndex}
          isFavorite={featuredAchievement.id === favoriteAchId}
          onToggleFavorite={handleToggleFavorite}
          onInspect={handleInspectPiece}
        />
      )}

      {/* 3. NAVEGAÇÃO ENTRE ALAS & GALERIAS DO MUSEU (TABS) */}
      <div className="p-4 sm:p-6 rounded-3xl bg-[#0d1222] border-2 border-purple-500/25 space-y-4 shadow-xl">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="font-display font-black text-lg sm:text-xl text-white flex items-center gap-2">
              <span>🏛️</span>
              <span>Alas & Galerias do Museu</span>
            </h3>
            <p className="text-xs text-purple-300 font-serif">
              Percorra os salões temáticos da escola e explore cada departamento de honra.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-mono">
              Exibindo: <strong className="text-amber-300">{filteredAndSortedPieces.length}</strong> de {achievements.length} peças
            </span>
          </div>
        </div>

        {/* Seletor de Salas / Galerias em Pílulas Sofisticadas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MUSEUM_GALLERY_ROOMS.map((room) => {
            const isSelected = selectedRoom === room.id;
            let roomCount = 0;
            if (room.id === 'all') {
              roomCount = achievements.length;
            } else if (room.id === 'secretas') {
              roomCount = achievements.filter(a => a.isSecret).length;
            } else {
              roomCount = achievements.filter(a => a.category === room.id).length;
            }

            return (
              <button
                key={room.id}
                onClick={() => {
                  playBreathTone(520, 80);
                  setSelectedRoom(room.id);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border flex-shrink-0 ${
                  isSelected
                    ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#141b2e] hover:bg-[#1a233b] border-white/10 text-gray-300 hover:text-white'
                }`}
              >
                <span>{room.icon}</span>
                <span>{room.shortName}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-purple-800 text-purple-200' : 'bg-black/40 text-gray-400'
                }`}>
                  {roomCount}
                </span>
              </button>
            );
          })}

          {/* Tab Especial: Minhas Favoritas */}
          <button
            onClick={() => {
              playBreathTone(520, 80);
              setSelectedRoom('favoritas');
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border flex-shrink-0 ${
              selectedRoom === 'favoritas'
                ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/30 font-black'
                : 'bg-[#141b2e] hover:bg-[#1a233b] border-amber-500/20 text-amber-300 hover:text-amber-200'
            }`}
          >
            <span>⭐</span>
            <span>Minhas Favoritas</span>
            {favoriteAchId && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* 4. BARRA DE FILTROS, BUSCA & ORDENAÇÃO */}
        <div className="pt-2 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Busca por Texto */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por peça, número, troféu, matéria ou palavra-chave..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtro por Status */}
          <div className="md:col-span-3 flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-200 focus:outline-none focus:border-purple-400 cursor-pointer"
            >
              <option value="todas">Status: Todas as Peças</option>
              <option value="desbloqueadas">Desbloqueadas em Exposição</option>
              <option value="bloqueadas">Bloqueadas (A Desvendar)</option>
              <option value="secretas">Apenas Ocultas / Secretas</option>
              <option value="favoritas">Apenas Favoritas</option>
            </select>
          </div>

          {/* Ordenação */}
          <div className="md:col-span-3 flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-200 focus:outline-none focus:border-purple-400 cursor-pointer"
            >
              <option value="numero">Ordenar: Número da Peça (001...)</option>
              <option value="recentes">Desbloqueadas Primeiro</option>
              <option value="raridade">Raridade & Acabamento</option>
              <option value="favoritas">Favoritas no Topo</option>
            </select>
          </div>

        </div>

      </div>

      {/* 5. A SALA DE EXPOSIÇÃO — GRID DE PEÇAS MUSEOLÓGICAS */}
      <div className="space-y-4">
        
        {filteredAndSortedPieces.length === 0 ? (
          /* Nicho Vazio / Espaço Reservado com Propósito */
          <div className="p-12 rounded-3xl bg-[#0c101d] border-2 border-dashed border-purple-500/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-3xl mx-auto">
              🔒
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="font-display font-black text-lg text-white">
                Espaço Reservado do Museu
              </h4>
              <p className="text-xs text-gray-400 font-serif">
                “Nenhuma peça encontrada para os filtros atuais. Continue sua jornada de aprendizado, simulações e respeito para ocupar este pedestal na galeria.”
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedRoom('all');
                setStatusFilter('todas');
                setSearchTerm('');
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all cursor-pointer"
            >
              Redefinir Filtros da Galeria
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredAndSortedPieces.map(({ achievement, originalIndex }) => {
              const isNew = achievement.isUnlocked && !viewedPieceIds.includes(achievement.id);
              const isFavorite = achievement.id === favoriteAchId;

              return (
                <MuseumPieceCard
                  key={achievement.id}
                  achievement={achievement}
                  index={originalIndex}
                  isFavorite={isFavorite}
                  isNew={isNew}
                  onToggleFavorite={handleToggleFavorite}
                  onInspect={handleInspectPiece}
                />
              );
            })}
          </div>
        )}

      </div>

      {/* 6. MODAL DA FICHA TÉCNICA MUSEOLÓGICA */}
      {inspectedAchievement && (
        <MuseumPieceModal
          achievement={inspectedAchievement}
          index={achievements.findIndex(a => a.id === inspectedAchievement.id)}
          isFavorite={inspectedAchievement.id === favoriteAchId}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setInspectedAchievement(null)}
          studentCode={studentCode}
        />
      )}

    </div>
  );
};
