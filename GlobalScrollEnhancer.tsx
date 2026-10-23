import React, { useEffect, createContext, useContext } from 'react';
import { globalOverflowEnhancer, OverflowDetectionResult } from '../utils/globalOverflowScrollEnhancer';

interface GlobalScrollContextType {
  scanNow: () => void;
  centerActiveItem: (container: HTMLElement) => boolean;
  scrollTo: (target: HTMLElement | string, options?: { left?: number; top?: number; behavior?: ScrollBehavior }) => void;
}

const GlobalScrollContext = createContext<GlobalScrollContextType>({
  scanNow: () => {},
  centerActiveItem: () => false,
  scrollTo: () => {},
});

export const useGlobalScroll = () => useContext(GlobalScrollContext);

interface GlobalScrollEnhancerProps {
  currentView?: string;
  isModalOpen?: boolean;
}

/**
 * Componente Global montado na raiz do aplicativo (App.tsx).
 * Monitora 100% da interface em tempo real, detectando qualquer container com overflow
 * e aplicando comportamento suave e automático no mobile e desktop sem exceções.
 */
export const GlobalScrollEnhancer: React.FC<GlobalScrollEnhancerProps> = ({
  currentView,
  isModalOpen,
}) => {
  useEffect(() => {
    // Inicializa o observador global do DOM
    globalOverflowEnhancer.init({
      enableMouseDrag: true,
      enableMobileNudge: true,
      enableAutoCenterActive: true,
      enableDenseControls: false,
    });

    return () => {
      // Mantemos ativo durante todo o ciclo de vida da aplicação
    };
  }, []);

  // Sempre que a rota mudar ou um modal abrir/fechar, agenda uma varredura instantânea
  useEffect(() => {
    globalOverflowEnhancer.scheduleScan();

    const t1 = setTimeout(() => {
      globalOverflowEnhancer.scheduleScan();
    }, 100);

    const t2 = setTimeout(() => {
      globalOverflowEnhancer.scheduleScan();
    }, 350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentView, isModalOpen]);

  const contextValue: GlobalScrollContextType = {
    scanNow: () => globalOverflowEnhancer.scanAndEnhance(),
    centerActiveItem: (container) => globalOverflowEnhancer.autoCenterActiveChild(container),
    scrollTo: (target, options) => globalOverflowEnhancer.scrollTo(target, options),
  };

  return (
    <GlobalScrollContext.Provider value={contextValue}>
      {/* Estilos dinâmicos de utilidade para affordance de scroll móvel */}
      <style>{`
        /* Indicador de continuidade nas bordas para containers com overflow horizontal */
        [data-overflow-detected="true"][data-has-h-overflow="true"] {
          -webkit-overflow-scrolling: touch;
          position: relative;
        }

        /* Efeito de fade/sombra suave quando há conteúdo a rolar à direita */
        [data-overflow-detected="true"][data-can-scroll-right="true"] {
          box-shadow: inset -14px 0 12px -10px rgba(124, 58, 237, 0.28);
        }

        /* Efeito de fade/sombra suave quando há conteúdo rolado à esquerda */
        [data-overflow-detected="true"][data-can-scroll-left="true"] {
          box-shadow: inset 14px 0 12px -10px rgba(124, 58, 237, 0.28);
        }

        /* Ambos os lados com conteúdo */
        [data-overflow-detected="true"][data-can-scroll-left="true"][data-can-scroll-right="true"] {
          box-shadow: inset 14px 0 12px -10px rgba(124, 58, 237, 0.28), inset -14px 0 12px -10px rgba(124, 58, 237, 0.28);
        }

        /* Cursor de agarrar quando arrastando no desktop */
        [data-drag-active="true"] {
          cursor: grabbing !important;
          user-select: none !important;
        }

        /* Animação suave para scroll automático */
        .smooth-scroll-container {
          scroll-behavior: smooth !important;
        }
      `}</style>
    </GlobalScrollContext.Provider>
  );
};
