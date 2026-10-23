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
  Info
} from 'lucide-react';
import { Achievement, AchievementCategory } from '../../types';
import { MuseumStatsHeader } from './MuseumStatsHeader';
import { MuseumFeaturedPiece } from './MuseumFeaturedPiece';
import { MuseumPieceCard } from './MuseumPieceCard';
import { MuseumPieceModal } from './MuseumPieceModal';
import { MUSEUM_GALLERY_ROOMS, MuseumGalleryRoom, getMuseumPieceDetails } from './museumTypes';
import { playBreathTone } from '../../services/audioSynthesizer';

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
