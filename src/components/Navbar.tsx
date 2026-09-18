import React, { useState, useRef, useEffect } from 'react';
import { ViewMode } from '../types';
import { StopHandLogo } from './BrandingAssets';
import { UserProfileHeader } from '../UserProfileHeader';
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
  Search
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenProfile: () => void;
  onOpenLoadingScreen?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenProfile, onOpenLoadingScreen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Fecha o menu de 3 pontinhos ao clicar fora ou pressionar ESC
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
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Lista de páginas colocadas dentro dos 3 pontinhos (conforme solicitado pelo usuário)
  const menuSections: {
    category: string;
    items: {
      id: ViewMode;
      label: string;
      description?: string;
      icon: React.ReactNode;
      isSOS?: boolean;
      isHighlight?: boolean;
    }[];
  }[] = [
    {
      category: 'Navegação Principal',
      items: [
        { id: 'home', label: 'Início', description: 'Painel e feed de conscientização', icon: <Home className="w-4 h-4 text-blue-400" /> },
        { id: 'protocolo', label: 'Acompanhar Protocolo', description: 'Consulte seu relato e use o chat sigiloso', icon: <Search className="w-4 h-4 text-purple-400" />, isHighlight: true },
        { id: 'colecao', label: 'Minha Coleção', description: 'Cosméticos, molduras e avatares', icon: <Layers className="w-4 h-4 text-amber-400" /> },
        { id: 'conquistas', label: 'Conquistas', description: 'Insígnias e metas de cidadania', icon: <Award className="w-4 h-4 text-purple-400" /> },
      ]
    },
    {
      category: 'Conteúdo & Aprendizado',
      items: [
        { id: 'educativo', label: 'Matriz AntiBullying', description: 'Metodologia e tipos de bullying', icon: <GraduationCap className="w-4 h-4 text-emerald-400" /> },
        { id: 'guia', label: 'Guia do Site & Tutorial', description: 'Tour interativo de todos os recursos', icon: <Compass className="w-4 h-4 text-cyan-400" />, isHighlight: true },
        { id: 'quiz', label: 'Quiz do Respeito', description: 'Teste de empatia e ganhe XP', icon: <BookOpen className="w-4 h-4 text-cyan-400" /> },
        { id: 'ceara', label: 'Ceará Científico', description: 'Pesquisa e projeto escolar', icon: <Microscope className="w-4 h-4 text-indigo-400" /> },
      ]
    },
    {
      category: 'Suporte & Ação',
      items: [
        { id: 'apoio', label: 'Apoio Emocional', description: 'Canal de escuta e acolhimento', icon: <HeartHandshake className="w-4 h-4 text-rose-400" /> },
        { id: 'triagem', label: 'Triagem de Incidentes', description: 'Classificação pedagógica', icon: <TrafficCone className="w-4 h-4 text-orange-400" /> },
        { id: 'galeria', label: 'Fotos do Projeto', description: 'Ações e registros na EEMTI', icon: <Images className="w-4 h-4 text-teal-400" /> },
        { id: 'gestao', label: 'Painel de Gestão', description: 'Mediação de casos, alertas SOS e dados (Acesso por Senha)', icon: <ShieldCheck className="w-4 h-4 text-indigo-400" />, isHighlight: true },
        { id: 'sos', label: 'SOS GPS Emergencial', description: 'Alerta urgente e localização imediata', icon: <AlertTriangle className="w-4 h-4 text-red-400" />, isSOS: true },
      ]
    }
  ];

  const handleSelectMenuItem = (id: ViewMode) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  // Verifica se a view atual é uma das que estão guardadas exclusivamente dentro dos três pontinhos
  const isInternalViewActive = !['home', 'denuncia', 'protocolo', 'guia', 'quiz', 'conquistas', 'gestao'].includes(currentView);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-purple-200/70 px-2 sm:px-4 md:px-6 py-2 transition-all shadow-[0_4px_20px_-4px_rgba(124,58,237,0.08)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-2.5 w-full min-w-0">
        
        {/* GRUPO PRINCIPAL DA ABA DE CIMA */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 min-w-0 overflow-x-auto no-scrollbar py-0.5">
          
          {/* 1. PERFIL DO USUÁRIO */}
          <div className="flex-shrink-0">
            <UserProfileHeader onOpenProfile={onOpenProfile} />
          </div>

          {/* 2. LOGO DO STOP */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 sm:gap-2 text-left group focus:outline-none flex-shrink-0 cursor-pointer"
            title="Voltar ao início"
          >
            <StopHandLogo size={34} className="transition-transform group-hover:scale-105 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-display font-black text-sm sm:text-base md:text-lg tracking-tight text-[#241e33] flex items-center leading-none">
                Stop<span className="text-rose-600">Bullying</span>
              </span>
              <span className="text-[8.5px] sm:text-[10px] text-purple-700 font-bold tracking-wide hidden lg:flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                EEMTI Alfredo Machado
              </span>
            </div>
          </button>

          {/* 3. DENÚNCIA */}
          <button
            onClick={() => onNavigate('denuncia')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 ${
              currentView === 'denuncia'
                ? 'bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white shadow-rose-500/30 ring-2 ring-rose-400'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 hover:text-rose-800 hover:border-rose-300'
            }`}
            title="Fazer denúncia sigilosa ou anônima"
          >
            <Megaphone className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 flex-shrink-0 ${currentView === 'denuncia' ? 'animate-bounce text-white' : ''}`} />
            <span className="tracking-wide">Denúncia</span>
          </button>

          {/* 4. PROTOCOLO */}
          <button
            onClick={() => onNavigate('protocolo')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 ${
              currentView === 'protocolo'
                ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-purple-500/30 ring-2 ring-purple-400'
                : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 hover:text-purple-900 hover:border-purple-300'
            }`}
            title="Acompanhar protocolo e conversar com a equipe escolar"
          >
            <Search className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0 ${currentView === 'protocolo' ? 'animate-pulse text-white' : ''}`} />
            <span className="tracking-wide">Protocolo</span>
          </button>

          {/* 5. GUIA DO SITE */}
          <button
            onClick={() => onNavigate('guia')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 ${
              currentView === 'guia'
                ? 'bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white shadow-cyan-500/30 ring-2 ring-cyan-400'
                : 'bg-cyan-50 text-cyan-800 border border-cyan-200 hover:bg-cyan-100 hover:text-cyan-900 hover:border-cyan-300'
            }`}
            title="Guia do Site & Tour Interativo"
          >
            <Compass className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-600 flex-shrink-0 ${currentView === 'guia' ? 'text-white' : ''}`} />
            <span className="tracking-wide">Guia do Site</span>
          </button>

          {/* 6. QUIZ DE RESPEITO */}
          <button
            onClick={() => onNavigate('quiz')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 ${
              currentView === 'quiz'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-emerald-500/30 ring-2 ring-emerald-400'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 hover:text-emerald-900 hover:border-emerald-300'
            }`}
            title="Quiz de Respeito e Desafios Educativos"
          >
            <BookOpen className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 flex-shrink-0 ${currentView === 'quiz' ? 'text-white' : ''}`} />
            <span className="tracking-wide">Quiz de Respeito</span>
          </button>

          {/* 7. CONQUISTAS */}
          <button
            onClick={() => onNavigate('conquistas')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 ${
              currentView === 'conquistas'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-amber-500/30 ring-2 ring-amber-400'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 hover:text-amber-900 hover:border-amber-300'
            }`}
            title="Conquistas, Insígnias e XP"
          >
            <Award className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0 ${currentView === 'conquistas' ? 'text-white' : ''}`} />
            <span className="tracking-wide">Conquistas</span>
          </button>

          {/* 8. PAINEL DE GESTÃO */}
          <button
            onClick={() => onNavigate('gestao')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer flex-shrink-0 ${
              currentView === 'gestao'
                ? 'bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-700 text-white shadow-indigo-500/30 ring-2 ring-indigo-400'
                : 'bg-indigo-50 text-indigo-900 border border-indigo-200 hover:bg-indigo-100 hover:text-indigo-950 hover:border-indigo-300'
            }`}
            title="Painel de Gestão e Mediação Escolar (Requer Senha)"
          >
            <ShieldCheck className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600 flex-shrink-0 ${currentView === 'gestao' ? 'text-white' : ''}`} />
            <span className="tracking-wide">Painel de Gestão</span>
          </button>

        </div>

        {/* LÁ DO OUTRO LADO: 5. OS TRÊS PONTINHOS (SEMPRE VISÍVEIS) */}
        <div className="flex items-center flex-shrink-0 ml-1">
          <div className="relative" ref={menuContainerRef}>
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-expanded={isMenuOpen}
              aria-label="Mais opções de navegação"
              title="Mais páginas e recursos"
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full transition-all border cursor-pointer flex-shrink-0 ${
                isMenuOpen
                  ? 'bg-purple-600 text-white border-purple-400 shadow-[0_0_14px_rgba(147,51,234,0.4)] ring-2 ring-purple-300'
                  : isInternalViewActive
                  ? 'bg-purple-100 text-purple-900 border-purple-300 shadow-sm hover:bg-purple-200'
                  : 'bg-white text-[#5c546d] border-purple-200 hover:bg-purple-50 hover:text-purple-900 hover:border-purple-300 shadow-sm'
              }`}
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Menu Suspenso (Dropdown dos Três Pontinhos) */}
            {isMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-[calc(100vw-20px)] max-w-[320px] sm:max-w-xs md:w-84 max-h-[82vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border border-purple-200 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin scrollbar-thumb-purple-200 text-[#241e33]"
                style={{ boxShadow: '0 20px 40px rgba(124,58,237,0.15), 0 0 20px rgba(124,58,237,0.1)' }}
              >
                {/* Header do Menu */}
                <div className="px-3 py-2 border-b border-purple-100 mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-900">
                    Menu & Recursos
                  </span>
                  <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 font-semibold">
                    EEMTI Alfredo Machado
                  </span>
                </div>

                {/* Seções com os itens navegáveis */}
                <div className="space-y-3">
                  {menuSections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="px-3 py-0.5 text-[10px] font-bold text-purple-600 uppercase tracking-wider">
                        {section.category}
                      </div>

                      <div className="space-y-0.5">
                        {section.items.map((item) => {
                          const isActive = currentView === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => handleSelectMenuItem(item.id)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all group cursor-pointer ${
                                isActive
                                  ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-950 font-bold border border-purple-300 shadow-sm'
                                  : item.isSOS
                                  ? 'text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200'
                                  : item.isHighlight
                                  ? 'text-amber-800 hover:bg-amber-50 border border-transparent hover:border-amber-200'
                                  : 'text-[#473e57] hover:bg-purple-50 hover:text-purple-950 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                                  isActive
                                    ? 'bg-purple-600 text-white'
                                    : item.isSOS
                                    ? 'bg-rose-100 text-rose-600'
                                    : item.isHighlight
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-purple-50 text-purple-700 group-hover:bg-purple-100'
                                }`}>
                                  {item.icon}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                                    <span>{item.label}</span>
                                    {item.isHighlight && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-300 font-bold uppercase">
                                        Novo
                                      </span>
                                    )}
                                    {item.isSOS && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-600 text-white font-black animate-pulse">
                                        SOS
                                      </span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <div className="text-[10px] text-[#786e8a] truncate">
                                      {item.description}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                                isActive ? 'text-purple-700 translate-x-0.5' : 'text-purple-300 group-hover:text-purple-600 group-hover:translate-x-0.5'
                              }`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão Especial: Animação de Boas-Vindas Anime Chibi (Lia & Tom) */}
                {onOpenLoadingScreen && (
                  <div className="pt-2 mt-2 border-t border-purple-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenLoadingScreen();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 text-purple-950 border border-purple-200 shadow-sm transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-1.5 rounded-lg bg-purple-200/80 text-purple-700 group-hover:scale-110 transition-transform">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-xs font-bold text-purple-950 flex items-center gap-1.5 truncate">
                            <span>Animação Lia &amp; Tom</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-pink-200 text-pink-800 border border-pink-300 font-bold uppercase">
                              Anime 2D
                            </span>
                          </div>
                          <div className="text-[10px] text-[#786e8a] truncate">
                            Rever história dos 5 atos de empatia
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

