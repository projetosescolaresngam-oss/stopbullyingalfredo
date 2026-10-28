import { useEffect, useRef, RefObject } from 'react';
import { globalOverflowEnhancer } from '../components/GlobalScrollEnhancer';

export interface UseAutoScrollOptions {
  /** Se a rolagem automática deve ser disparada (padrão: true) */
  active?: boolean;
  /** Valor/dependência dinâmica que, ao mudar, re-dispara a rolagem automática (ex: step, tab, id) */
  trigger?: unknown;
  /** Atraso inicial em ms antes do primeiro scroll (padrão: 60ms) */
  delay?: number;
  /** Alinhamento vertical do scroll (padrão: 'center') */
  block?: ScrollLogicalPosition;
  /** Alinhamento horizontal do scroll (padrão: 'center') */
  inline?: ScrollLogicalPosition;
  /** Comportamento da animação (padrão: 'smooth') */
  behavior?: ScrollBehavior;
  /** Quantidade de verificações sucessivas para acomodar transições/render (padrão: 2) */
  retries?: number;
}

/**
 * Hook reutilizável para detectar a posição de qualquer modal, card detalhado,
 * painel dinâmico ou formulário no DOM e realizar uma rolagem suave e automática
 * para deixá-lo perfeitamente centralizado e visível na tela e em containers pais com overflow.
 */
export function useAutoScrollIntoView<T extends HTMLElement = HTMLDivElement>(
  options: UseAutoScrollOptions = {}
): RefObject<T | null> {
  const elementRef = useRef<T | null>(null);
  const hasScrolledRef = useRef(false);
  const userInteractedRef = useRef(false);
  const prevTriggerRef = useRef(options.trigger);

  const {
    active = true,
    trigger,
    delay = 60,
    block = 'center',
    inline = 'center',
    behavior = 'smooth',
    retries = 2
  } = options;

  // Se o trigger mudar explicitamente, permite uma nova rodada de auto-scroll
  if (prevTriggerRef.current !== trigger) {
    prevTriggerRef.current = trigger;
    hasScrolledRef.current = false;
    userInteractedRef.current = false;
  }

  useEffect(() => {
    if (!active) return;
    // Se já executou o scroll inicial para este elemento/trigger e não houve nova ativação, não repete
    if (hasScrolledRef.current) return;

    const performScroll = () => {
      // Se o usuário já interagiu para rolar manualmente, aborta qualquer reposicionamento automático
      if (userInteractedRef.current) return;

      const el = elementRef.current;
      if (!el) return;

      // Se o elemento estiver contido em um container com overflow horizontal/vertical, centraliza nele também
      let parent = el.parentElement;
      while (parent && parent !== document.body) {
        if (parent.scrollWidth > parent.clientWidth + 4 || parent.scrollHeight > parent.clientHeight + 4) {
          globalOverflowEnhancer.centerChildElement(parent, el, behavior === 'smooth');
          globalOverflowEnhancer.updateContainerOverflowState(parent);
          break;
        }
        parent = parent.parentElement;
      }

      try {
        el.scrollIntoView({
          behavior,
          block,
          inline
        });
      } catch {
        // Fallback para navegadores sem suporte total a opções
        el.scrollIntoView();
      }

      hasScrolledRef.current = true;
    };

    const timers: number[] = [];

    // Listener para detectar qualquer rolagem manual do usuário e interromper imediatamente timers pendentes
    const handleUserInteraction = () => {
      userInteractedRef.current = true;
      cancelAnimationFrame(rafId);
      timers.forEach((t) => clearTimeout(t));
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true, capture: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true, capture: true });
    window.addEventListener('pointerdown', handleUserInteraction, { passive: true, capture: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true, capture: true });

    // Agenda em múltiplos momentos iniciais apenas para aguardar a abertura e montagem do card
    const rafId = requestAnimationFrame(() => {
      performScroll();
    });

    timers.push(window.setTimeout(performScroll, delay));
    if (retries >= 1) {
      timers.push(window.setTimeout(performScroll, delay + 100));
    }
    if (retries >= 2) {
      timers.push(window.setTimeout(performScroll, delay + 220));
    }

    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener('wheel', handleUserInteraction, { capture: true });
      window.removeEventListener('touchmove', handleUserInteraction, { capture: true });
      window.removeEventListener('pointerdown', handleUserInteraction, { capture: true });
      window.removeEventListener('keydown', handleUserInteraction, { capture: true });
    };
  }, [active, trigger, delay, block, inline, behavior, retries]);

  return elementRef;
}

/**
 * Função utilitária direta para rolar suavemente até um elemento ou seletor CSS,
 * com suporte a auto-centralização em containers com overflow.
 */
export function autoScrollToElement(
  target: HTMLElement | string | null | undefined,
  options: {
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
    behavior?: ScrollBehavior;
    delay?: number;
  } = {}
) {
  const {
    block = 'center',
    inline = 'center',
    behavior = 'smooth',
    delay = 50
  } = options;

  const run = () => {
    let el: HTMLElement | null = null;
    if (typeof target === 'string') {
      el = document.querySelector<HTMLElement>(target);
    } else {
      el = target || null;
    }

    if (el) {
      // Centraliza no container pai com overflow se existir
      let parent = el.parentElement;
      while (parent && parent !== document.body) {
        if (parent.scrollWidth > parent.clientWidth + 4 || parent.scrollHeight > parent.clientHeight + 4) {
          globalOverflowEnhancer.centerChildElement(parent, el, behavior === 'smooth');
          break;
        }
        parent = parent.parentElement;
      }

      try {
        el.scrollIntoView({
          behavior,
          block,
          inline
        });
      } catch {
        el.scrollIntoView();
      }
    }
  };

  requestAnimationFrame(run);
  if (delay > 0) {
    setTimeout(run, delay);
    setTimeout(run, delay + 150);
  }
}

