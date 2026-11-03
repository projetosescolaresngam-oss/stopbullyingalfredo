import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ViewMode } from '../types';
import { StopHandLogo } from './BrandingAssets';
import { UserProfileHeader } from '../UserProfileHeader';
import { useApp } from '../AppContext';
import { useAccessibility } from '../AccessibilityContext';
import { 
  Home, 
  Megaphone, 
  HeartHandshake, 
  TrafficCone, 
  BookOpen, 
  AlertTriangle, 
  Microscope, 
  ShieldCheck,
  Images,
  Sparkles,
  Award,
  Layers,
  GraduationCap,
  MoreVertical,
  X,
  ChevronRight,
  Compass,
  Search,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Menu,
  Cloud
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenProfile: () => void;
  onOpenLoadingScreen?: () => void;
}

type MenuCategoryFilter = 'todos' | 'protecao' | 'aprendizado' | 'comunidade';

interface MenuItemDef {
  id: ViewMode;
  label: string;
  description: string;
  category: 'protecao' | 'aprendizado' | 'comunidade';
  icon: React.ReactNode;
  badge?: string;
  isSOS?: boolean;
  isHighlight?: boolean;
  colorScheme: {
    iconBg: string;
    iconColor: string;
    borderHover: string;
    glow: string;
  };
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenProfile, onOpenLoadingScreen }) => {
  const { currentAccount, openAuthModal } = useApp();
  const { toggleToolbar } = useAccessibility();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryFilter>('todos');
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fecha o menu ao clicar fora ou pressionar ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
      // Atalho '/' para focar na busca se o menu estiver aberto
      if (isMenuOpen && event.key === '/' && document.activeElement !== searchInputRef.current) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      // Foca automaticamente no input de busca ao abrir
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Lista rica e categorizada de recursos com design bento
  const menuItems: MenuItemDef[] = useMemo(() => [
    // PROTEÇÃO & AÇÃO
    {
      id: 'sos',
      label: 'SOS GPS Emergencial',
      description: 'Alerta urgente e localização imediata',
      category: 'protecao',
      isSOS: true,
      badge: 'URGENTE',
      icon: <AlertTriangle className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-rose-600 text-white',
        iconColor: 'text-white',
        borderHover: 'hover:border-rose-300 hover:bg-rose-50/70',
        glow: 'shadow-rose-500/20'
      }
    },
    {
      id: 'denuncia',
      label: 'Relato Sigiloso',
      description: 'Canal anônimo e seguro com protocolo',
      category: 'protecao',
      badge: 'SEGURO',
      icon: <Megaphone className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-rose-100 text-rose-700',
        iconColor: 'text-rose-700',
        borderHover: 'hover:border-rose-300 hover:bg-rose-50/60',
        glow: 'shadow-rose-500/10'
      }
    },
    {
      id: 'protocolo',
      label: 'Acompanhar Protocolo',
      description: 'Consulte seu relato e converse pelo chat',
      category: 'protecao',
      isHighlight: true,
      badge: 'CHAT',
      icon: <Search className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-purple-100 text-purple-700',
        iconColor: 'text-purple-700',
        borderHover: 'hover:border-purple-300 hover:bg-purple-50/60',
        glow: 'shadow-purple-500/10'
      }
    },
    {
      id: 'gestao',
      label: 'Painel de Gestão',
      description: 'Mediação pedagógica, alertas e dados (Senha)',
      category: 'protecao',
      isHighlight: true,
      badge: 'RESTRITO',
      icon: <ShieldCheck className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-indigo-100 text-indigo-800',
        iconColor: 'text-indigo-800',
        borderHover: 'hover:border-indigo-300 hover:bg-indigo-50/60',
        glow: 'shadow-indigo-500/10'
      }
    },

    // APRENDIZADO & FORMAÇÃO
    {
      id: 'educativo',
      label: 'Matriz Anti-Bullying',
      description: '8 tipologias, sinais de alerta e condutas',
      category: 'aprendizado',
      badge: 'NOVA',
      icon: <GraduationCap className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-emerald-100 text-emerald-800',
        iconColor: 'text-emerald-800',
        borderHover: 'hover:border-emerald-300 hover:bg-emerald-50/60',
        glow: 'shadow-emerald-500/10'
      }
    },
    {
      id: 'quiz',
      label: 'Central do Respeito',
      description: 'Arena de desafios, simulações e casos reais',
      category: 'aprendizado',
      badge: '+XP',
      icon: <BookOpen className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-teal-100 text-teal-800',
        iconColor: 'text-teal-800',
        borderHover: 'hover:border-teal-300 hover:bg-teal-50/60',
        glow: 'shadow-teal-500/10'
      }
    },
    {
      id: 'guia',
      label: 'Guia do Site & Tour',
      description: 'Explore maquete interativa e tutoriais',
      category: 'aprendizado',
      badge: 'INTERATIVO',
      icon: <Compass className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-cyan-100 text-cyan-800',
        iconColor: 'text-cyan-800',
        borderHover: 'hover:border-cyan-300 hover:bg-cyan-50/60',
        glow: 'shadow-cyan-500/10'
      }
    },
    {
      id: 'ceara',
      label: 'Ceará Científico',
      description: 'Pesquisa científica e inovação na EEMTI',
      category: 'aprendizado',
      badge: '2026',
      icon: <Microscope className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-violet-100 text-violet-800',
        iconColor: 'text-violet-800',
        borderHover: 'hover:border-violet-300 hover:bg-violet-50/60',
        glow: 'shadow-violet-500/10'
      }
    },

    // COMUNIDADE & PROGRESSO
    {
      id: 'apoio',
      label: 'Apoio Emocional',
      description: 'Escuta acolhedora, respiração e suporte',
      category: 'comunidade',
      badge: 'CUIDADO',
      icon: <HeartHandshake className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-pink-100 text-pink-700',
        iconColor: 'text-pink-700',
        borderHover: 'hover:border-pink-300 hover:bg-pink-50/60',
        glow: 'shadow-pink-500/10'
      }
    },
    {
      id: 'conquistas',
      label: 'Conquistas & Insígnias',
      description: 'Metas de cidadania, patentes e medalhas',
      category: 'comunidade',
      badge: 'TROFÉUS',
      icon: <Award className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-amber-100 text-amber-800',
        iconColor: 'text-amber-800',
        borderHover: 'hover:border-amber-300 hover:bg-amber-50/60',
        glow: 'shadow-amber-500/10'
      }
    },
    {
      id: 'colecao',
      label: 'Minha Coleção',
      description: 'Personalize avatar, molduras e cosméticos',
      category: 'comunidade',
      badge: 'VISUAL',
      icon: <Layers className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-orange-100 text-orange-800',
        iconColor: 'text-orange-800',
        borderHover: 'hover:border-orange-300 hover:bg-orange-50/60',
        glow: 'shadow-orange-500/10'
      }
    },
    {
      id: 'triagem',
      label: 'Triagem Pedagógica',
      description: 'Critérios e semáforo de mediação',
      category: 'comunidade',
      icon: <TrafficCone className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-amber-100 text-amber-900',
        iconColor: 'text-amber-900',
        borderHover: 'hover:border-amber-300 hover:bg-amber-50/60',
        glow: 'shadow-amber-500/10'
      }
    },
    {
      id: 'galeria',
      label: 'Fotos do Projeto',
      description: 'Mural de ações coletivas na EEMTI',
      category: 'comunidade',
      icon: <Images className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-emerald-100 text-emerald-900',
        iconColor: 'text-emerald-900',
        borderHover: 'hover:border-emerald-300 hover:bg-emerald-50/60',
        glow: 'shadow-emerald-500/10'
      }
    },
    {
      id: 'home',
      label: 'Início & Feed',
      description: 'Painel principal com pílulas do dia',
      category: 'comunidade',
      icon: <Home className="w-4 h-4" />,
      colorScheme: {
        iconBg: 'bg-blue-100 text-blue-800',
        iconColor: 'text-blue-800',
        borderHover: 'hover:border-blue-300 hover:bg-blue-50/60',
        glow: 'shadow-blue-500/10'
      }
    }
  ], []);

  // Itens filtrados por busca e categoria
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Filtro de categoria
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      // Filtro de texto
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchLabel = item.label.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchBadge = (item.badge || '').toLowerCase().includes(q);
        return matchLabel || matchDesc || matchBadge;
      }
      return true;
    });
  }, [menuItems, selectedCategory, searchQuery]);

  const handleSelectMenuItem = (id: ViewMode) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  // Verifica se a view atual é uma das páginas internas
  const isInternalViewActive = !['home', 'denuncia', 'protocolo', 'guia', 'quiz', 'conquistas', 'gestao'].includes(currentView);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-purple-200/70 px-2 sm:px-3 md:px-4 py-1.5 transition-all shadow-[0_4px_20px_-4px_rgba(124,58,237,0.08)]">
      <div className="max-w-7xl mx-auto flex items-center justify-start gap-1 w-full min-w-0 relative">
        
        {/* GRUPO PRINCIPAL DA ABA SUPERIOR */}
        <div 
          className="flex items-center gap-1 min-w-0 flex-shrink overflow-x-auto no-scrollbar scrollbar-none py-0.5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          data-auto-scroll-container="true"
        >
          
          {/* 1. PERFIL DO USUÁRIO */}
          <div className="flex-shrink-0">
            <UserProfileHeader onOpenProfile={onOpenProfile} />
          </div>

          {/* 2. LOGO DO STOP */}
          <button 
            onClick={() => onNavigate('home')}
            data-active={currentView === 'home' ? 'true' : undefined}
            className="flex items-center gap-1.5 text-left group focus:outline-none flex-shrink-0 cursor-pointer whitespace-nowrap select-none"
            title="Voltar ao início"
          >
            <StopHandLogo size={32} className="transition-transform group-hover:scale-105 flex-shrink-0" />
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-display font-black text-sm sm:text-base tracking-tight text-[#241e33] flex items-center leading-none whitespace-nowrap">
                Stop<span className="text-rose-600">Bullying</span>
              </span>
              <span className="text-[8px] sm:text-[9px] text-purple-700 font-bold tracking-wide hidden 2xl:flex items-center gap-1 mt-0.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                <span>EEMTI Alfredo Machado</span>
              </span>
            </div>
          </button>

          {/* 3. DENÚNCIA */}
          <button
            onClick={() => onNavigate('denuncia')}
            data-active={currentView === 'denuncia' ? 'true' : undefined}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 whitespace-nowrap select-none ${
              currentView === 'denuncia'
                ? 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white shadow-rose-500/30 ring-2 ring-rose-400'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 hover:text-rose-800 hover:border-rose-300'
            }`}
            title="Fazer denúncia sigilosa ou anônima"
          >
            <Megaphone className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 flex-shrink-0 ${currentView === 'denuncia' ? 'animate-bounce text-white' : ''}`} />
            <span className="tracking-wide whitespace-nowrap">Denúncia</span>
          </button>

          {/* 4. PROTOCOLO */}
          <button
            onClick={() => onNavigate('protocolo')}
            data-active={currentView === 'protocolo' ? 'true' : undefined}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 whitespace-nowrap select-none ${
              currentView === 'protocolo'
                ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-purple-500/30 ring-2 ring-purple-400'
                : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 hover:text-purple-900 hover:border-purple-300'
            }`}
            title="Acompanhar protocolo e conversar com a equipe escolar"
          >
            <Search className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0 ${currentView === 'protocolo' ? 'animate-pulse text-white' : ''}`} />
            <span className="tracking-wide whitespace-nowrap">Protocolo</span>
          </button>

          {/* 5. GUIA DO SITE */}
          <button
            onClick={() => onNavigate('guia')}
            data-active={currentView === 'guia' ? 'true' : undefined}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 whitespace-nowrap select-none ${
              currentView === 'guia'
                ? 'bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white shadow-cyan-500/30 ring-2 ring-cyan-400'
                : 'bg-cyan-50 text-cyan-800 border border-cyan-200 hover:bg-cyan-100 hover:text-cyan-900 hover:border-cyan-300'
            }`}
            title="Guia do Site & Tour Interativo"
          >
            <Compass className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 flex-shrink-0 ${currentView === 'guia' ? 'text-white' : ''}`} />
            <span className="tracking-wide whitespace-nowrap">Guia<span className="hidden xl:inline"> do Site</span></span>
          </button>

          {/* 6. QUIZ DE RESPEITO */}
          <button
            onClick={() => onNavigate('quiz')}
            data-active={currentView === 'quiz' ? 'true' : undefined}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 whitespace-nowrap select-none ${
              currentView === 'quiz'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-emerald-500/30 ring-2 ring-emerald-400'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-900 hover:border-emerald-300'
            }`}
            title="Quiz de Respeito e Desafios Educativos"
          >
            <BookOpen className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0 ${currentView === 'quiz' ? 'text-white' : ''}`} />
            <span className="tracking-wide whitespace-nowrap">Quiz<span className="hidden xl:inline"> de Respeito</span></span>
          </button>

          {/* 7. CONQUISTAS */}
          <button
            onClick={() => onNavigate('conquistas')}
            data-active={currentView === 'conquistas' ? 'true' : undefined}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 whitespace-nowrap select-none ${
              currentView === 'conquistas'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-amber-500/30 ring-2 ring-amber-400'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 hover:text-amber-900 hover:border-amber-300'
            }`}
            title="Conquistas, Insígnias e XP"
          >
            <Award className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0 ${currentView === 'conquistas' ? 'text-white' : ''}`} />
            <span className="tracking-wide whitespace-nowrap">Conquistas</span>
          </button>

          {/* 8. PAINEL DE GESTÃO */}
          <button
            onClick={() => onNavigate('gestao')}
            data-active={currentView === 'gestao' ? 'true' : undefined}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 whitespace-nowrap select-none ${
              currentView === 'gestao'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-700 text-white shadow-indigo-500/30 ring-2 ring-indigo-400'
                : 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100 hover:text-indigo-950 hover:border-indigo-300'
            }`}
            title="Painel de Gestão e Mediação Escolar (Requer Senha)"
          >
            <ShieldCheck className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 flex-shrink-0 ${currentView === 'gestao' ? 'text-white' : ''}`} />
            <span className="tracking-wide whitespace-nowrap">Painel de Gestão</span>
          </button>

        </div>

        {/* LADO DIREITO: GAVETA / BENTO MENU DE NAVEGAÇÃO */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="relative" ref={menuContainerRef}>
            
            {/* Botão de Disparo Estilizado no mesmo formato compacto das pílulas */}
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-expanded={isMenuOpen}
              aria-label="Central de Navegação e Recursos"
              title="Abrir Central de Recursos e Todas as Páginas"
              className={`group flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all border cursor-pointer select-none flex-shrink-0 whitespace-nowrap shadow-xs ${
                isMenuOpen
                  ? 'bg-[#1a1429] text-white border-purple-400 shadow-[0_0_18px_rgba(147,51,234,0.35)] ring-2 ring-purple-300'
                  : isInternalViewActive
                  ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-950 border-purple-300 hover:border-purple-400 hover:shadow-md'
                  : 'bg-white hover:bg-purple-50 text-[#3b334a] border-purple-200/90 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="relative flex items-center justify-center flex-shrink-0">
                {isMenuOpen ? (
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-200 transition-transform rotate-90" />
                ) : (
                  <MoreVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-700 group-hover:scale-110 transition-transform" />
                )}
                {isInternalViewActive && !isMenuOpen && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>
              <span className="tracking-wide hidden sm:inline-block whitespace-nowrap">
                Menu
              </span>
            </button>

            {/* Menu Suspenso (Bento Island) */}
            {isMenuOpen && (
              <div 
                className="fixed inset-x-3 top-14 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-3 w-auto sm:w-[500px] md:w-[540px] max-w-[calc(100vw-24px)] max-h-[85vh] overflow-hidden bg-white/95 backdrop-blur-3xl border-2 border-purple-200/90 rounded-3xl shadow-[0_25px_60px_-15px_rgba(76,29,149,0.25)] z-50 animate-in fade-in zoom-in-95 duration-150 flex flex-col text-[#1e172e]"
              >
                
                {/* 1. TOPO DA CENTRAL: BRANDING & ATALHOS */}
                <div className="p-4 sm:p-5 border-b border-purple-100/90 bg-gradient-to-r from-purple-50/80 via-white to-indigo-50/80">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-xl bg-purple-900 text-amber-300 shadow-xs">
                        <StopHandLogo size={20} />
                      </div>
                      <div>
                        <h3 className="font-display font-black text-sm text-[#1e172e] flex items-center gap-1.5 leading-none">
                          Central de Recursos
                        </h3>
                        <p className="text-[10.5px] text-purple-700 font-semibold tracking-wide">
                          EEMTI Alfredo Machado • Plataforma Stop Bullying
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        ESC para fechar
                      </span>
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Fechar menu"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Cartão de Acesso Rápido à Conta & Nuvem */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (currentAccount) {
                        onOpenProfile();
                      } else {
                        openAuthModal('login');
                      }
                    }}
                    className="w-full mb-3 p-2.5 rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-950 to-[#1a132e] text-white border border-purple-400/40 text-left flex items-center justify-between gap-2.5 hover:border-amber-400/60 shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <Cloud className="w-4 h-4 text-amber-300" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                          <span>{currentAccount ? `@${currentAccount.displayName}` : 'Salvar Progresso na Nuvem'}</span>
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                            currentAccount 
                              ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-400/30' 
                              : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                          }`}>
                            {currentAccount ? 'Conectado' : 'Nickname + Senha'}
                          </span>
                        </div>
                        <p className="text-[10px] text-purple-200/80 truncate">
                          {currentAccount ? 'Seu XP e conquistas estão sincronizados' : 'Sem e-mail: proteja seu XP em qualquer aparelho'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </button>

                  {/* Campo de Busca Rápida com Atalho */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-purple-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Pesquisar página, quiz, denúncia, sos, matriz..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2 text-xs font-semibold rounded-xl bg-white/90 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-[#1e172e] shadow-2xs placeholder:text-slate-400"
                    />
                    {searchQuery ? (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-purple-400 hidden sm:inline-block bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                        /
                      </span>
                    )}
                  </div>

                  {/* Segmented Controls / Categorias */}
                  <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pt-0.5">
                    {[
                      { id: 'todos', label: 'Todos' },
                      { id: 'protecao', label: '🛡️ Proteção' },
                      { id: 'aprendizado', label: '🎓 Aprendizado' },
                      { id: 'comunidade', label: '👥 Comunidade' },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id as MenuCategoryFilter)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                          selectedCategory === cat.id
                            ? 'bg-purple-900 text-white shadow-xs'
                            : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-purple-200/60'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                </div>

                {/* 2. ÁREA DOS BENTO CARDS COM SCROLL SUAVE */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3.5 max-h-[58vh] scrollbar-thin scrollbar-thumb-purple-200">
                  
                  {filteredItems.length === 0 ? (
                    <div className="p-8 text-center space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border border-purple-200">
                        <Search className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold text-slate-700">
                        Nenhum recurso encontrado para "{searchQuery}"
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('todos');
                        }}
                        className="text-xs font-bold text-purple-700 hover:underline cursor-pointer"
                      >
                        Limpar busca
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {filteredItems.map((item) => {
                        const isActive = currentView === item.id;

                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelectMenuItem(item.id)}
                            className={`p-3 rounded-2xl border-2 text-left transition-all group cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                              isActive
                                ? 'bg-gradient-to-br from-purple-50 to-indigo-50/80 border-purple-600 shadow-md ring-2 ring-purple-300 scale-[1.01]'
                                : item.isSOS
                                ? 'bg-rose-50/40 hover:bg-rose-50 border-rose-200 hover:border-rose-400'
                                : `bg-white/80 hover:bg-purple-50/40 border-purple-100 hover:border-purple-300 shadow-2xs hover:shadow-xs ${item.colorScheme.borderHover}`
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 w-full min-w-0">
                              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                <div className={`p-2 rounded-xl flex-shrink-0 transition-transform group-hover:scale-110 shadow-2xs ${
                                  isActive
                                    ? 'bg-purple-900 text-white'
                                    : item.colorScheme.iconBg
                                }`}>
                                  {item.icon}
                                </div>
                                
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-black text-[#1e172e] truncate block group-hover:text-purple-950">
                                      {item.label}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-500 font-medium block truncate leading-tight mt-0.5">
                                    {item.description}
                                  </span>
                                </div>
                              </div>

                              {/* Badges de destaque / Status */}
                              {isActive ? (
                                <span className="flex-shrink-0 whitespace-nowrap text-[9px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded-full flex items-center gap-1 leading-none">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                                  <span>Ativo</span>
                                </span>
                              ) : item.badge ? (
                                <span className={`flex-shrink-0 whitespace-nowrap text-[8.5px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider leading-none ${
                                  item.isSOS
                                    ? 'bg-rose-600 text-white animate-pulse'
                                    : item.isHighlight
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-purple-100 text-purple-900 border border-purple-200'
                                }`}>
                                  {item.badge}
                                </span>
                              ) : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 3. CARD DESTAQUE: ANIMAÇÃO LIA & TOM (ANIME CHIBI 2D) */}
                  {onOpenLoadingScreen && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          onOpenLoadingScreen();
                        }}
                        className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-950 to-[#1a1429] text-white border-2 border-purple-400/50 shadow-md transition-all hover:scale-[1.01] cursor-pointer group flex items-center justify-between gap-3 text-left relative overflow-hidden"
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-purple-500/20 to-transparent pointer-events-none" />

                        <div className="flex items-center gap-3 relative z-10 min-w-0">
                          <div className="p-2.5 rounded-xl bg-purple-800/80 text-amber-300 border border-purple-400/50 flex-shrink-0 group-hover:rotate-6 transition-transform">
                            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                          </div>
                          
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-display font-black text-xs sm:text-sm text-white truncate">
                                História 2D: Lia &amp; Tom Chibi
                              </span>
                              <span className="text-[8.5px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-pink-500/90 text-white">
                                Anime 2D
                              </span>
                            </div>
                            <p className="text-[10.5px] text-purple-200 font-medium line-clamp-1">
                              Rever narrativa dos 5 atos de empatia e acolhimento escolar
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-300 text-xs font-bold flex-shrink-0 relative z-10">
                          <span className="hidden sm:inline">Assistir</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </div>
                  )}

                </div>

                {/* 4. RODAPÉ INSTITUCIONAL */}
                <div className="px-4 py-2.5 border-t border-purple-100 bg-slate-50/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-medium">
                    Atalho: <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[10px] text-slate-700 shadow-2xs font-bold">Alt+A</kbd> Acessibilidade
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        toggleToolbar();
                      }}
                      className="text-amber-800 hover:text-amber-950 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>♿ Ajustes</span>
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onNavigate('guia');
                      }}
                      className="text-purple-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Ajuda</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </header>
  );
};
