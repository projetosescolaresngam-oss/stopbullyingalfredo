import React, { useState, useMemo } from 'react';
import { useApp } from './AppContext';
import { AchievementBadgeFrame } from './AchievementBadgeFrame';
import { AchievementInspectionModal } from './AchievementInspectionModal';
import { ItemInspectionModal } from './ItemInspectionModal';
import { COSMETICS_CATALOG } from './cosmeticsRewards';
import { LEVEL_PROGRESSION_TABLE } from './levelProgression';
import { playBreathTone } from './services/audioSynthesizer';
import { Achievement, AchievementCategory, CosmeticItem, ViewMode } from './types';
import { 
  Trophy, 
  Sparkles, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  Search, 
  Lightbulb, 
  RotateCw, 
  ShieldCheck, 
  Info, 
  ExternalLink,
  BookOpen,
  Brain,
  HeartHandshake,
  Wind,
  Shield,
  Layers,
  Award,
  ArrowRight,
  Eye
} from 'lucide-react';

interface ConquistasViewProps {
  onBack?: () => void;
  onNavigate?: (view: ViewMode) => void;
  onOpenProfile?: () => void;
}

const STOP_TIPS = [
  {
    tag: 'Bom Senso #01',
    quote: 'Se a piada só faz uma pessoa rir e a outra chorar, a piada foi péssima e quem contou precisa de aulas urgentes de comédia.'
  },
  {
    tag: 'Acolhimento #02',
    quote: 'Empatia não é concordar com tudo, é entender que a dor do colega nunca é frescura nem exagero.'
  },
  {
    tag: 'Convivência #03',
    quote: 'Zueira pesada que machuca não é entretenimento, é covardia disfarçada de riso coletivo.'
  },
  {
    tag: 'Defesa Ativa #04',
    quote: 'Quem presencia uma agressão e não apoia a vítima vira cúmplice involuntário. O silêncio alimenta o agressor.'
  },
  {
    tag: 'Segurança Digital #05',
    quote: 'No ambiente virtual, print não esquece, mas uma atitude justa e empática pode evitar um estrago irreparável.'
  },
  {
    tag: 'Cidadania Escolar #06',
    quote: 'Acionar a coordenação ou o canal anônimo não é "dedo-duro", é salvar vidas e construir uma escola segura para todos.'
  },
  {
    tag: 'Modo Zen #07',
    quote: 'Respirar fundo 4 segundos antes de reagir na internet economiza 99% das dores de cabeça e dos conflitos escolares.'
  }
];

export const ConquistasView: React.FC<ConquistasViewProps> = ({ 
  onBack, 
  onNavigate,
  onOpenProfile 
}) => {
  const { achievements, userProfile, studentIdentity, equipCosmetic } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all' | 'secretas'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'todas' | 'conquistadas' | 'em_progresso' | 'bloqueadas' | 'secretas'>('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [tipIndex, setTipIndex] = useState(0);
  const [inspectedCosmetic, setInspectedCosmetic] = useState<CosmeticItem | null>(null);
  const [inspectedAchievement, setInspectedAchievement] = useState<Achievement | null>(null);
  const [showRanksModal, setShowRanksModal] = useState(false);
  const [celebratingAchId, setCelebratingAchId] = useState<string | null>(null);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const inProgressCount = achievements.filter(a => !a.isUnlocked && a.currentProgress > 0).length;
  const lockedCount = achievements.filter(a => !a.isUnlocked && a.currentProgress === 0).length;
  const secretCount = achievements.filter(a => a.isSecret).length;
  const percent = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  const remainingCount = totalCount - unlockedCount;

  // Category counts
  const sabedoriaCount = achievements.filter(a => a.category === 'sabedoria').length;
  const detetiveCount = achievements.filter(a => a.category === 'detetive').length;
  const empatiaCount = achievements.filter(a => a.category === 'empatia').length;
  const zenCount = achievements.filter(a => a.category === 'zen').length;
  const escudoCount = achievements.filter(a => a.category === 'escudo').length;

  const currentTip = STOP_TIPS[tipIndex % STOP_TIPS.length];

  const handleNextTip = () => {
    setTipIndex(prev => (prev + 1) % STOP_TIPS.length);
    playBreathTone(520, 100);
  };

  // Filter achievements
  const filteredAchievements = useMemo(() => {
    return achievements.filter(ach => {
      // Category filter
      if (selectedCategory === 'secretas') {
        if (!ach.isSecret) return false;
      } else if (selectedCategory !== 'all') {
        if (ach.category !== selectedCategory) return false;
      }

      // Status filter
      if (selectedStatusFilter === 'conquistadas' && !ach.isUnlocked) return false;
      if (selectedStatusFilter === 'em_progresso' && (ach.isUnlocked || ach.currentProgress === 0)) return false;
      if (selectedStatusFilter === 'bloqueadas' && (ach.isUnlocked || ach.currentProgress > 0)) return false;
      if (selectedStatusFilter === 'secretas' && !ach.isSecret) return false;

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = ach.title.toLowerCase().includes(query);
        const matchesDesc = ach.description.toLowerCase().includes(query);
        const matchesSubtitle = (ach.subtitle || '').toLowerCase().includes(query);
        const matchesHint = (ach.requirementHint || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesSubtitle && !matchesHint) {
          return false;
        }
      }

      return true;
    });
  }, [achievements, selectedCategory, selectedStatusFilter, searchTerm]);

  const handleInspectAchievementFrame = (ach: Achievement) => {
    playBreathTone(440, 150);
    setInspectedAchievement(ach);
  };

  const handleCardClick = (ach: Achievement) => {
    if (ach.isUnlocked) {
      playBreathTone(587.33, 200);
      setCelebratingAchId(ach.id);
      setTimeout(() => setCelebratingAchId(null), 1200);
    }
    setInspectedAchievement(ach);
  };

  const handleMissionClick = (ach: Achievement, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onNavigate) return;

    if (ach.category === 'sabedoria' || ach.id.includes('quiz') || ach.requirementHint.toLowerCase().includes('quiz')) {
      onNavigate('quiz');
    } else if (ach.category === 'detetive' || ach.id.includes('lei') || ach.requirementHint.toLowerCase().includes('triagem') || ach.requirementHint.toLowerCase().includes('semáforo')) {
      onNavigate('triagem');
    } else if (ach.category === 'zen' || ach.requirementHint.toLowerCase().includes('respiração') || ach.requirementHint.toLowerCase().includes('emocional')) {
      onNavigate('apoio');
    } else if (ach.category === 'empatia' || ach.requirementHint.toLowerCase().includes('respeito') || ach.requirementHint.toLowerCase().includes('guia')) {
      onNavigate('guia');
    } else if (ach.category === 'escudo' || ach.requirementHint.toLowerCase().includes('denúncia') || ach.requirementHint.toLowerCase().includes('cyber')) {
      onNavigate('educativo');
    } else {
      onNavigate('educativo');
    }
  };

  const getTierColorInfo = (tier: string) => {
    switch (tier) {
      case 'lendario':
        return {
          badgeClass: 'bg-pink-100 text-pink-800 border-pink-300',
          label: 'LENDÁRIO',
          icon: '👑'
        };
      case 'ouro':
        return {
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
          label: 'OURO',
          icon: '🥇'
        };
      case 'prata':
        return {
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-300',
          label: 'PRATA',
          icon: '🥈'
        };
      default: // bronze
        return {
          badgeClass: 'bg-amber-50 text-amber-900 border-amber-200',
          label: 'BRONZE',
          icon: '🥉'
        };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-7xl mx-auto text-[#241e33] pb-16">

      {/* 1. CABEÇALHO PRINCIPAL COM IDENTIDADE E NÍVEL */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-purple-200/80 shadow-[0_8px_30px_rgba(124,58,237,0.08)] backdrop-blur-md relative overflow-hidden space-y-6">
        
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#241e33] border border-purple-200 transition-all cursor-pointer mr-1 shadow-sm"
              title="Voltar ao Início"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-purple-600" />
            DISTINTIVOS &amp; CONQUISTAS DE HONRA ESCOLAR
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {unlockedCount}/{totalCount} Conquistas ({percent}%)
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            {studentIdentity.code || 'Anônimo 001'}: 1º no Ranking Geral
          </span>
        </div>

        {/* Título Principal e Descrição */}
        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-[#241e33] leading-tight">
            Minhas Conquistas Escolares: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600">
              Distintivos de Honra, Empatia e Conhecimento
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5c546d] max-w-4xl leading-relaxed">
            Aprenda a combater a zueira pesada, pratique a empatia, vivencie simulações e domine seus direitos protegidos por lei. Cada conquista é salva com 100% de sigilo no seu dispositivo.
          </p>
        </div>

        {/* Linha com Card de Nível + Atalhos de Ação */}
        <div className="pt-2 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center relative z-10">
          
          {/* Card do Nível */}
          <div className="lg:col-span-6 p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 flex items-center justify-center text-2xl shadow-sm">
                💎
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                    NÍVEL {userProfile.currentLevel} DE 20
                  </span>
                  <button
                    onClick={() => setShowRanksModal(true)}
                    className="text-[10px] font-bold text-purple-600 hover:text-purple-800 underline cursor-pointer"
                  >
                    Ver Todos os Ranks
                  </button>
                </div>
                <h3 className="font-display font-black text-sm sm:text-base text-[#241e33]">
                  {userProfile.levelTitle}
                </h3>
                <p className="text-[11px] text-[#5c546d] leading-tight">
                  Referência absoluta de empatia, sigilo e segurança no cotidiano escolar.
                </p>
              </div>
            </div>
          </div>

          {/* Botões de Ação Rápida */}
          <div className="lg:col-span-6 flex flex-wrap gap-2 items-center justify-start lg:justify-end">
            {onNavigate && (
              <button
                onClick={() => onNavigate('colecao')}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                🎁 Recompensas Cosméticas
              </button>
            )}

            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                🏆 Ranking 🥇
              </button>
            )}

            {onNavigate && (
              <>
                <button
                  onClick={() => onNavigate('triagem')}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-800 border border-purple-200 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  🎭 Simulações
                </button>

                <button
                  onClick={() => onNavigate('quiz')}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-800 border border-purple-200 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  🎯 Testar Quizzes
                </button>

                <button
                  onClick={() => onNavigate('denuncia')}
                  className="px-3.5 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 border border-purple-300 text-purple-900 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  🛡️ Denúncia Anônima
                </button>
              </>
            )}
          </div>

        </div>

      </div>

      {/* 2. LINHA DE RESUMO: PROGRESSO TOTAL + DICA RÁPIDA STOPBULLYING */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Card 1: Progresso Total */}
        <div className="md:col-span-5 p-5 rounded-3xl bg-white/95 border border-purple-200/80 shadow-[0_8px_30px_rgba(124,58,237,0.06)] space-y-3.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-600" />
                <h4 className="font-display font-black text-sm text-[#241e33]">Progresso Total:</h4>
              </div>
              <span className="text-sm font-black font-mono text-purple-700">
                {unlockedCount} / {totalCount}
              </span>
            </div>

            {/* Barra de Progresso com Gradiente */}
            <div className="w-full h-3 rounded-full bg-purple-100 border border-purple-200 overflow-hidden p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 transition-all duration-700 shadow-sm"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-[#5c546d]">
              <span className="text-purple-700">{percent}% completado</span>
              <span>{remainingCount} restantes</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-amber-800 flex items-center gap-1.5 border-t border-purple-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>Clique nos cartões para comemorar ou inspecionar!</span>
          </div>
        </div>

        {/* Card 2: Dica Rápida do Sentinela */}
        <div className="md:col-span-7 p-5 rounded-3xl bg-white/95 border border-amber-200 shadow-[0_8px_30px_rgba(245,158,11,0.06)] space-y-3 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="font-display font-black text-xs sm:text-sm text-[#241e33]">
                  DICA RÁPIDA DO STOP
                </h4>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  {currentTip.tag}
                </span>
              </div>
            </div>

            <blockquote className="text-xs sm:text-sm text-[#3c344a] italic font-medium leading-relaxed border-l-2 border-amber-400 pl-3 py-0.5">
              "{currentTip.quote}"
            </blockquote>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleNextTip}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <RotateCw className="w-3.5 h-3.5" /> Outra Dica
            </button>
          </div>
        </div>

      </div>

      {/* 3. BARRA DE CATEGORIAS EM PILLS */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white/95 border border-purple-200/80 space-y-3 shadow-[0_8px_30px_rgba(124,58,237,0.06)]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#5c546d] uppercase tracking-wider px-1">
          <Layers className="w-4 h-4 text-purple-600" />
          <span>CATEGORIAS:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Todas */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20'
                : 'bg-purple-50/70 text-[#241e33] hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <span>✨ Todas ({totalCount})</span>
          </button>

          {/* Sabedoria */}
          <button
            onClick={() => setSelectedCategory('sabedoria')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'sabedoria'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-purple-50/70 text-[#241e33] hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <span>🧠 Sabedoria &amp; Quizzes ({sabedoriaCount})</span>
          </button>

          {/* Detetive */}
          <button
            onClick={() => setSelectedCategory('detetive')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'detetive'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-purple-50/70 text-[#241e33] hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <span>🕵️ Detetive &amp; Leis ({detetiveCount})</span>
          </button>

          {/* Empatia */}
          <button
            onClick={() => setSelectedCategory('empatia')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'empatia'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/20'
                : 'bg-purple-50/70 text-[#241e33] hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <span>❤️ Empatia &amp; Acolhimento ({empatiaCount})</span>
          </button>

          {/* Zen */}
          <button
            onClick={() => setSelectedCategory('zen')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'zen'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-purple-50/70 text-[#241e33] hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <span>🧘 Modo Zen &amp; Calma ({zenCount})</span>
          </button>

          {/* Escudo */}
          <button
            onClick={() => setSelectedCategory('escudo')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'escudo'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-purple-50/70 text-[#241e33] hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <span>🛡️ Escudo &amp; Segurança ({escudoCount})</span>
          </button>

          {/* Secretas */}
          <button
            onClick={() => setSelectedCategory('secretas')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'secretas'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/20'
                : 'bg-purple-50/70 text-[#241e33] hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <span>🔒 Secretas ({secretCount})</span>
          </button>
        </div>

        {/* 4. BARRA DE PESQUISA E FILTROS DE STATUS */}
        <div className="pt-3 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Input de Busca */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar conquista, lei ou requisito..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-50/50 border border-purple-200 text-xs text-[#241e33] placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#241e33] text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros de Status */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {(['todas', 'conquistadas', 'em_progresso', 'bloqueadas', 'secretas'] as const).map(st => (
              <button
                key={st}
                onClick={() => setSelectedStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                  selectedStatusFilter === st
                    ? 'bg-purple-100 text-purple-900 border border-purple-300 shadow-sm'
                    : 'bg-white text-[#5c546d] hover:bg-purple-50 border border-purple-200/70'
                }`}
              >
                {st === 'todas' ? 'Todas' :
                 st === 'conquistadas' ? `🟢 Desbloqueadas (${unlockedCount})` :
                 st === 'em_progresso' ? `⏳ Em andamento (${inProgressCount})` :
                 st === 'bloqueadas' ? `🔒 Bloqueadas (${lockedCount})` :
                 `✨ Secretas (${secretCount})`}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 5. AVISO DE ESPAÇO SEGURO E CONFIDENCIAL */}
      <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 flex items-start gap-3 text-xs text-purple-900 shadow-sm">
        <Info className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-purple-800">Espaço seguro e confidencial:</strong> Todos os distintivos e pontuações ficam salvos somente na memória local do seu navegador para incentivar seu aprendizado. Não há rankings públicos, notas expostas ou comparações entre alunos.
        </p>
      </div>

      {/* 6. GRADE DE CARDS DAS CONQUISTAS (3 COLUNAS) */}
      {filteredAchievements.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-3xl bg-white/95 border border-purple-200/80 shadow-sm space-y-3">
          <Trophy className="w-12 h-12 text-purple-300 mx-auto" />
          <h3 className="text-base font-bold text-[#241e33]">Nenhuma conquista encontrada</h3>
          <p className="text-xs text-[#5c546d] max-w-md mx-auto">
            Nenhum resultado corresponde aos filtros selecionados. Tente limpar a busca ou mudar a categoria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedStatusFilter('todas');
              setSearchTerm('');
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            Limpar Todos os Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAchievements.map((ach) => {
            const tierInfo = getTierColorInfo(ach.tier);
            const isCelebrating = celebratingAchId === ach.id;
            const progressPercent = ach.maxProgress > 0 
              ? Math.min(100, Math.round((ach.currentProgress / ach.maxProgress) * 100))
              : 0;

            const isSecretLocked = ach.isSecret && !ach.isUnlocked;

            return (
              <div
                key={ach.id}
                onClick={() => handleCardClick(ach)}
                className={`group p-5 rounded-3xl border transition-all duration-300 flex flex-col justify-between gap-4 relative overflow-hidden cursor-pointer shadow-sm hover:shadow-md ${
                  isCelebrating ? 'scale-[1.03] ring-4 ring-purple-400 shadow-xl z-20' : ''
                } ${
                  ach.isUnlocked
                    ? 'bg-white/95 border-purple-300 hover:border-purple-400'
                    : ach.currentProgress > 0
                    ? 'bg-purple-50/50 border-amber-300 hover:border-amber-400'
                    : 'bg-white/80 border-purple-200/70 hover:border-purple-300 opacity-90'
                }`}
              >
                {/* Glow decorativo */}
                {ach.isUnlocked && (
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-200/50 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-300/50 transition-all" />
                )}

                {/* PARTE SUPERIOR DO CARD: EMBLEMA TERRARIA + TIER + STATUS */}
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-3.5">
                    
                    {/* Emblema Terraria em Destaque Ampliado */}
                    <div className="flex-shrink-0 relative transition-transform duration-200 group-hover:scale-105">
                      <AchievementBadgeFrame
                        achievementId={ach.id}
                        category={ach.category}
                        tier={ach.tier}
                        iconType={ach.iconType}
                        funnySticker={ach.funnySticker}
                        isUnlocked={ach.isUnlocked}
                        isSecret={ach.isSecret}
                        size={76}
                        showGlow={ach.isUnlocked}
                      />
                    </div>

                    {/* Tags e Ações na Direita */}
                    <div className="flex flex-col items-end gap-1.5 flex-1 min-w-0">
                      
                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        {/* Secreta Tag */}
                        {ach.isSecret && (
                          <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200 text-[9px] font-black uppercase flex items-center gap-0.5 shadow-xs">
                            <Lock className="w-2.5 h-2.5" /> SECRETA
                          </span>
                        )}

                        {/* Tier Pill */}
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase border shadow-xs ${tierInfo.badgeClass}`}>
                          {tierInfo.icon} {tierInfo.label}
                        </span>
                      </div>

                      {/* Status de Conquistada / Em Andamento / Bloqueada */}
                      {ach.isUnlocked ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold flex items-center gap-1 shadow-xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Conquistada (+{ach.xpReward || 50} XP)
                        </span>
                      ) : ach.currentProgress > 0 ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold flex items-center gap-1 shadow-xs">
                          ⏳ Em andamento
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 text-[10px] font-semibold flex items-center gap-1 shadow-xs">
                          <Lock className="w-3 h-3 text-gray-400" />
                          Bloqueada (+{ach.xpReward || 50} XP)
                        </span>
                      )}

                      {/* Link Ver Moldura */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspectAchievementFrame(ach);
                        }}
                        className="text-[10px] font-bold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-0.5 cursor-pointer pt-0.5"
                      >
                        <span>Ver moldura ✨</span>
                      </button>

                    </div>
                  </div>

                  {/* TÍTULO E SUBTÍTULO */}
                  <div className="space-y-1">
                    <h4 className="font-display font-black text-sm sm:text-base text-[#241e33] group-hover:text-purple-800 transition-colors leading-snug">
                      {isSecretLocked ? '🔒 Conquista Secreta' : ach.title}
                    </h4>
                    
                    <p className="text-[11px] font-semibold italic text-purple-700">
                      "{isSecretLocked ? '???' : (ach.subtitle || ach.title)}"
                    </p>
                  </div>

                  {/* DESCRIÇÃO DA CONQUISTA */}
                  <p className="text-xs text-[#5c546d] leading-relaxed min-h-[36px]">
                    {isSecretLocked
                      ? 'Requisito misterioso. Continue explorando a plataforma para desvendar esta conquista secreta.'
                      : (ach.isUnlocked && ach.unlockedDescription ? ach.unlockedDescription : ach.description)}
                  </p>

                  {/* BOX DE FRASE CÔMICA / LORE */}
                  <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 text-[11px] text-[#3c344a] italic leading-relaxed">
                    {isSecretLocked ? '‘???’' : `‘${(ach.funnyQuote || 'O respeito mútuo fortalece nossa escola.').replace(/["'‘]/g, '')}’`}
                  </div>

                  {/* REQUISITO / DICA QUANDO BLOQUEADA OU EM PROGRESSO */}
                  {!ach.isUnlocked && !isSecretLocked && ach.requirementHint && (
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1 text-[11px]">
                      <div className="flex items-center gap-1 font-bold text-amber-800">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Como desbloquear:</span>
                      </div>
                      <p className="text-[#3c344a] leading-tight">
                        {ach.requirementHint}
                      </p>
                    </div>
                  )}

                  {/* BARRA DE PROGRESSO DINÂMICA */}
                  {ach.maxProgress > 1 && (
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#5c546d]">
                        <span>Progresso:</span>
                        <span className="text-purple-700 font-mono font-bold">
                          {ach.currentProgress} / {ach.maxProgress} {ach.progressUnit || ''}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-purple-100 border border-purple-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            ach.isUnlocked
                              ? 'bg-emerald-500'
                              : progressPercent > 0
                              ? 'bg-purple-600'
                              : 'bg-gray-300'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* RODAPÉ DO CARD */}
                <div className="pt-2.5 border-t border-purple-100 flex items-center justify-between gap-2">
                  
                  {/* Status no Rodapé */}
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    {ach.isUnlocked ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Desbloqueada
                      </span>
                    ) : ach.currentProgress > 0 ? (
                      <span className="text-amber-700 flex items-center gap-1">
                        ⏳ Em andamento
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-gray-400" /> Bloqueada
                      </span>
                    )}
                  </div>

                  {/* Botão de Missão Rápida ou Data */}
                  {!ach.isUnlocked && !isSecretLocked ? (
                    <button
                      onClick={(e) => handleMissionClick(ach, e)}
                      className="px-3 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 border border-purple-300 text-purple-800 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                    >
                      <span>Fazer Missão</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-[#5c546d] font-mono">
                      24/08/2026
                    </span>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* MODAL: INSPEÇÃO DE MOLDURA / COSMÉTICO */}
      {inspectedCosmetic && (
        <ItemInspectionModal
          item={inspectedCosmetic}
          isUnlocked={userProfile.unlockedCosmetics.includes(inspectedCosmetic.id)}
          isEquipped={
            userProfile.equippedFrameId === inspectedCosmetic.id ||
            userProfile.equippedBadgeId === inspectedCosmetic.id ||
            userProfile.equippedIconId === inspectedCosmetic.id ||
            userProfile.equippedTitleId === inspectedCosmetic.id ||
            userProfile.equippedEffectId === inspectedCosmetic.id
          }
          onEquip={() => {
            equipCosmetic(inspectedCosmetic.category, inspectedCosmetic.id);
            setInspectedCosmetic(null);
          }}
          onClose={() => setInspectedCosmetic(null)}
        />
      )}

      {/* MODAL: TABELA COMPLETA DE RANKS & NÍVEIS */}
      {showRanksModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white border border-purple-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setShowRanksModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-purple-50 hover:bg-purple-100 text-gray-500 hover:text-[#241e33] transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                PROGRESSÃO DE CARREIRA ESCOLAR
              </span>
              <h3 className="font-display font-black text-2xl text-[#241e33]">
                Tabela de Ranks &amp; Níveis Stop
              </h3>
              <p className="text-xs text-[#5c546d]">
                Avance na sua jornada ética realizando quizzes, simulações e mantendo a cultura de paz na EEMTI Alfredo Machado.
              </p>
            </div>

            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {LEVEL_PROGRESSION_TABLE.map((lvl) => {
                const isCurrent = lvl.level === userProfile.currentLevel;
                const isUnlocked = userProfile.currentXp >= lvl.xpRequired;

                return (
                  <div
                    key={lvl.level}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                      isCurrent
                        ? 'bg-purple-100/70 border-purple-400 shadow-sm ring-2 ring-purple-300'
                        : isUnlocked
                        ? 'bg-purple-50/50 border-emerald-200 text-[#241e33]'
                        : 'bg-gray-50/80 border-gray-200 text-gray-500 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-purple-200 flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                        {lvl.icon}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-xs text-[#241e33]">
                            Nível {lvl.level}: {lvl.title}
                          </span>
                          {isCurrent && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-purple-600 text-white">
                              Atual
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#5c546d]">
                          Recompensa: {lvl.rewardDescription}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-mono font-bold text-amber-700">
                        {lvl.xpRequired} XP
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowRanksModal(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-purple-600/20"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DE INSPEÇÃO DETALHADA DA CONQUISTA (MOLDURA AMPLIADA 136px) */}
      {inspectedAchievement && (
        <AchievementInspectionModal
          achievement={inspectedAchievement}
          onClose={() => setInspectedAchievement(null)}
        />
      )}

      {/* MODAL DE INSPEÇÃO DE COSMÉTICO */}
      {inspectedCosmetic && (
        <ItemInspectionModal
          item={inspectedCosmetic}
          onClose={() => setInspectedCosmetic(null)}
          onEquip={() => {
            equipCosmetic(inspectedCosmetic.category, inspectedCosmetic.id);
            setInspectedCosmetic(null);
          }}
          isEquipped={false}
          isUnlocked={true}
        />
      )}

    </div>
  );
};
