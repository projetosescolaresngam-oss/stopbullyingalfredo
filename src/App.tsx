import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { useApp } from './AppContext';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { DenunciaForm } from './components/DenunciaForm';
import { ProtocoloView } from './components/ProtocoloView';
import { TriagemModule } from './components/TriagemModule';
import { ApoioEmocional } from './components/ApoioEmocional';
import { CentralRespeitoHub } from './components/centralRespeito/CentralRespeitoHub';
import { SOSModule } from './components/SOSModule';
import { CearaCientificoBanner } from './components/CearaCientificoBanner';
import { GaleriaProjeto } from './components/GaleriaProjeto';
import { PainelGestao } from './components/PainelGestao';
import { PacmanCamouflage } from './components/PacmanCamouflage';
import { ConquistasView } from './ConquistasView';
import { CosmeticsCustomizer } from './CosmeticsCustomizer';
import { EducativoMatrizView } from './EducativoMatrizView';
import { GuiaDoRespeitoView } from './GuiaDoRespeitoView';
import { UserProfileModal } from './UserProfileModal';
import { AchievementUnlockModal, RewardUnlockModal } from './GamificationModals';
import { LoadingScreen } from './LoadingScreen';
import { GlobalScrollEnhancer } from './components/GlobalScrollEnhancer';
import { AuthModal } from './components/account/AuthModal';
import { 
  AccessibilityToolbar, 
  ReadingRulerGuide, 
  SelectionSpeechReader, 
  VLibrasWidget 
} from './components/accessibility/AccessibilityToolbar';
import { addLog } from './services/storageService';
import { recordSiteAccess } from './services/analyticsService';

export default function App() {
  const [isLoadingScreen, setIsLoadingScreen] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [protocolToTrack, setProtocolToTrack] = useState<string | undefined>(undefined);
  const [isCamouflageOpen, setIsCamouflageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { 
    latestUnlockedAchievement, 
    latestUnlockedReward, 
    closeAchievementModal, 
    closeRewardModal,
    recordAreaVisited,
    isAuthModalOpen,
    closeAuthModal,
    authModalMode
  } = useApp();

  const validViews: ViewMode[] = [
    'home', 
    'denuncia', 
    'protocolo',
    'apoio', 
    'triagem', 
    'quiz', 
    'sos', 
    'ceara', 
    'galeria', 
    'gestao', 
    'conquistas', 
    'colecao', 
    'educativo', 
    'guia'
  ];

  // Read URL hash on load
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as ViewMode;
      if (validViews.includes(hash)) {
        setCurrentView(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        recordAreaVisited(hash);
        recordSiteAccess(hash);
      } else if (hash === 'gestaoequipestop' as any) {
        setCurrentView('gestao');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        recordAreaVisited('gestao');
        recordSiteAccess('gestao');
      } else {
        recordSiteAccess('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    // Secret shortcut listener: Ctrl + Shift + G
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'G' || e.key === 'g')) {
        e.preventDefault();
        setCurrentView('gestao');
        window.location.hash = 'gestao';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        recordAreaVisited('gestao');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [recordAreaVisited]);

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addLog('VIEW_NAVIGATE', view);
    recordAreaVisited(view);
    recordSiteAccess(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf8fd] via-[#f5eefb] to-[#ede3f7] text-[#241e33] flex flex-col relative overflow-x-hidden font-sans selection:bg-purple-500 selection:text-white">
      
      {/* Link de Salto de Acessibilidade para Leitores de Tela e Teclado */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-950 focus:font-black focus:rounded-xl focus:shadow-2xl focus:ring-4 focus:ring-amber-500/40"
      >
        Pular para o conteúdo principal (Alt + 1)
      </a>

      {/* Régua de Leitura Dinâmica & Máscara de Foco */}
      <ReadingRulerGuide />

      {/* Leitor de Seleção em Voz Alta */}
      <SelectionSpeechReader />

      {/* Widget Oficial de Tradução em LIBRAS (Avatar 3D) */}
      <VLibrasWidget />

      {/* Barra Universal e Painel de Acessibilidade Múltipla */}
      <AccessibilityToolbar />

      {/* Utilidade Global de Detecção de Overflow e Rolagem Suave Automática */}
      <GlobalScrollEnhancer currentView={currentView} isModalOpen={isProfileOpen || isCamouflageOpen} />

      {/* Background Welcoming Ambient Gradient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl animate-floatSlow" />
        <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-indigo-200/35 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-[550px] h-[550px] bg-pink-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-3xl" />
      </div>

      {/* Navigation Header */}
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenLoadingScreen={() => setIsLoadingScreen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 z-10 focus:outline-none">
        {currentView === 'home' && (
          <HeroHome 
            onNavigate={handleNavigate} 
            onOpenCamouflage={() => setIsCamouflageOpen(true)} 
            onOpenLoadingScreen={() => setIsLoadingScreen(true)}
            onTrackProtocol={(proto) => {
              setProtocolToTrack(proto);
              handleNavigate('protocolo');
            }}
          />
        )}

        {currentView === 'colecao' && (
          <CosmeticsCustomizer 
            onBack={() => handleNavigate('home')} 
          />
        )}

        {currentView === 'conquistas' && (
          <ConquistasView 
            onBack={() => handleNavigate('home')} 
            onNavigate={handleNavigate}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {currentView === 'educativo' && (
          <EducativoMatrizView onNavigate={handleNavigate} />
        )}

        {currentView === 'guia' && (
          <GuiaDoRespeitoView 
            onNavigate={handleNavigate}
            onOpenCamouflage={() => setIsCamouflageOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
          />
        )}

        {currentView === 'denuncia' && (
          <DenunciaForm 
            onBack={() => handleNavigate('home')} 
            onNavigateToProtocolo={(proto) => {
              setProtocolToTrack(proto);
              handleNavigate('protocolo');
            }}
          />
        )}

        {currentView === 'protocolo' && (
          <ProtocoloView 
            initialProtocol={protocolToTrack}
            onBack={() => handleNavigate('home')}
            onNavigateToDenuncia={() => handleNavigate('denuncia')}
          />
        )}

        {currentView === 'apoio' && (
          <ApoioEmocional 
            onBack={() => handleNavigate('home')} 
          />
        )}

        {currentView === 'triagem' && (
          <TriagemModule 
            onBack={() => handleNavigate('home')} 
            onNavigate={handleNavigate} 
          />
        )}

        {(currentView === 'quiz' || currentView === 'missoes') && (
          <CentralRespeitoHub 
            onBack={() => handleNavigate('home')} 
            initialTab={currentView === 'missoes' ? 'mapa' : 'quizzes'}
          />
        )}

        {currentView === 'sos' && (
          <SOSModule 
            onBack={() => handleNavigate('home')} 
            onOpenCamouflage={() => setIsCamouflageOpen(true)} 
          />
        )}

        {currentView === 'ceara' && (
          <CearaCientificoBanner 
            onBack={() => handleNavigate('home')} 
          />
        )}

        {currentView === 'galeria' && (
          <GaleriaProjeto 
            onBack={() => handleNavigate('home')} 
          />
        )}

        {currentView === 'gestao' && (
          <PainelGestao 
            onBack={() => handleNavigate('home')} 
          />
        )}
      </main>

      {/* Profile Modal */}
      {isProfileOpen && (
        <UserProfileModal 
          onClose={() => setIsProfileOpen(false)} 
          onNavigateToCollection={() => {
            setIsProfileOpen(false);
            handleNavigate('colecao');
          }}
        />
      )}

      {/* Achievement Unlock Modal Popup */}
      {latestUnlockedAchievement && (
        <AchievementUnlockModal
          achievement={latestUnlockedAchievement}
          onClose={closeAchievementModal}
          onEquipCosmetic={() => {
            closeAchievementModal();
            setIsProfileOpen(true);
          }}
        />
      )}

      {/* Cosmetic Reward Unlock Modal Popup */}
      {latestUnlockedReward && (
        <RewardUnlockModal
          reward={latestUnlockedReward}
          onClose={closeRewardModal}
          onEquipAndClose={() => {
            closeRewardModal();
            setIsProfileOpen(true);
          }}
        />
      )}

      {/* Camouflage Pacman Mini-game Modal */}
      {isCamouflageOpen && (
        <PacmanCamouflage onClose={() => setIsCamouflageOpen(false)} />
      )}

      {/* Auth Modal (Login / Cadastro / Recuperação de Conta) */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        initialMode={authModalMode} 
      />

      {/* Tela de Carregamento & Animação Narrativa 2D Anime Chibi (Lia & Tom) */}
      {isLoadingScreen && (
        <LoadingScreen 
          onComplete={() => setIsLoadingScreen(false)} 
          autoDismiss={true} 
        />
      )}

      {/* Footer */}
      <footer className="z-10 border-t border-purple-200/60 bg-white/80 backdrop-blur-md py-6 px-4 sm:px-6 text-center text-xs text-[#5c546d] space-y-2 shadow-sm">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
          <strong className="text-[#241e33] font-black">StopBullying</strong>
          <span className="text-purple-300">•</span>
          <span>EEMTI Alfredo Machado (Madalena/CE)</span>
          <span className="text-purple-300">•</span>
          <span className="text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">Ceará Científico 2026</span>
        </div>
        <p className="text-[11px] text-[#786e8a] max-w-xl mx-auto">
          "Ciência, Cidadania e Convivência Democrática: o conhecimento a serviço da vida coletiva"
        </p>
      </footer>

    </div>
  );
}

