import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { useApp } from './AppContext';
import { Navbar } from './components/Navbar';
import { HeroHome } from './components/HeroHome';
import { DenunciaForm } from './components/DenunciaForm';
import { TriagemModule } from './components/TriagemModule';
import { ApoioEmocional } from './components/ApoioEmocional';
import { QuizEducativo } from './components/QuizEducativo';
import { SOSModule } from './components/SOSModule';
import { CearaCientificoBanner } from './components/CearaCientificoBanner';
import { GaleriaProjeto } from './components/GaleriaProjeto';
import { GestaoEscolar } from './components/GestaoEscolar';
import { PacmanCamouflage } from './components/PacmanCamouflage';
import { ConquistasView } from './ConquistasView';
import { CosmeticsCustomizer } from './CosmeticsCustomizer';
import { EducativoMatrizView } from './EducativoMatrizView';
import { GuiaDoRespeitoView } from './GuiaDoRespeitoView';
import { UserProfileModal } from './UserProfileModal';
import { AchievementUnlockModal } from './AchievementUnlockModal';
import { RewardUnlockModal } from './RewardUnlockModal';
import { addLog } from './services/storageService';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isCamouflageOpen, setIsCamouflageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { 
    latestUnlockedAchievement, 
    latestUnlockedReward, 
    closeAchievementModal, 
    closeRewardModal,
    recordAreaVisited 
  } = useApp();

  const validViews: ViewMode[] = [
    'home', 
    'denuncia', 
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
        recordAreaVisited(hash);
      } else if (hash === 'gestaoequipestop' as any) {
        setCurrentView('gestao');
        recordAreaVisited('gestao');
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
  };

  return (
    <div className="min-h-screen bg-[#080a10] text-[#F9FAFB] flex flex-col relative overflow-x-hidden font-sans">
      
      {/* Background Animated Gradient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation Header */}
      <Navbar 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 z-10">
        {currentView === 'home' && (
          <HeroHome 
            onNavigate={handleNavigate} 
            onOpenCamouflage={() => setIsCamouflageOpen(true)} 
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
          <EducativoMatrizView />
        )}

        {currentView === 'guia' && (
          <GuiaDoRespeitoView />
        )}

        {currentView === 'denuncia' && (
          <DenunciaForm 
            onBack={() => handleNavigate('home')} 
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

        {currentView === 'quiz' && (
          <QuizEducativo 
            onBack={() => handleNavigate('home')} 
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
          <GestaoEscolar 
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

      {/* Footer */}
      <footer className="z-10 border-t border-white/10 bg-[#090d16]/80 backdrop-blur-md py-6 px-4 sm:px-6 text-center text-xs text-gray-400 space-y-2">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
          <strong className="text-white">StopBullying</strong>
          <span>•</span>
          <span>EEMTI Alfredo Machado (Madalena/CE)</span>
          <span>•</span>
          <span className="text-blue-400 font-semibold">Ceará Científico 2026</span>
        </div>
        <p className="text-[11px] text-gray-500 max-w-xl mx-auto">
          "Ciência, Cidadania e Convivência Democrática: o conhecimento a serviço da vida coletiva"
        </p>
      </footer>

    </div>
  );
}

