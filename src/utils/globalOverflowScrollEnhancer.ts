/**
 * Utilitário Global de Detecção de Overflow e Rolagem Suave Automática
 * 
 * Funcionalidades Universais (Todo o Site sem Exceção):
 * 1. Detecção automática e contínua de qualquer container com transbordamento horizontal ou vertical no DOM.
 * 2. Auto-scroll suave automático para centralizar elementos ativos (abas, chips, filtros, etapas, cards selecionados).
 * 3. Centralização suave instantânea em qualquer elemento clicado ou focado dentro de containers com rolagem.
 * 4. Efeito "Peek / Nudge" suave no mobile em áreas densas de informação (tabelas, matrizes, carrosséis, abas).
 * 5. Indicadores visuais dinâmicos de continuidade (fade/sombras nas bordas quando há conteúdo cortado).
 * 6. Suporte a arrasto suave com mouse (drag-to-scroll) no desktop e inércia tátil no mobile.
 * 7. Monitoramento 100% contínuo via MutationObserver, ResizeObserver e IntersectionObserver.
 */

export interface OverflowDetectionResult {
  hasHorizontalOverflow: boolean;
  hasVerticalOverflow: boolean;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  canScrollUp: boolean;
  canScrollDown: boolean;
  scrollWidth: number;
  clientWidth: number;
  scrollHeight: number;
  clientHeight: number;
}

export interface EnhanceOptions {
  /** Permitir arrastar com mouse para rolar no desktop/touch híbrido */
  enableMouseDrag?: boolean;
  /** Executar micro-nudge (espiar suave) no mobile para indicar que a área tem scroll */
  enableMobileNudge?: boolean;
  /** Auto-centralizar filhos clicados, focados ou marcados como ativos */
  enableAutoCenterActive?: boolean;
  /** Adicionar controles táteis flutuantes em tabelas densas */
  enableDenseControls?: boolean;
}

class GlobalOverflowScrollEnhancer {
  private isInitialized = false;
  private mutationObserver: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private observedElements = new WeakSet<HTMLElement>();
  private activeDragElement: HTMLElement | null = null;
  private dragStartX = 0;
  private dragScrollLeft = 0;
  private isDragging = false;
  private dragDistance = 0;
  private scanDebounceTimer: number | null = null;
  private periodicScanTimer: number | null = null;

  private defaultOptions: EnhanceOptions = {
    enableMouseDrag: true,
    enableMobileNudge: true,
    enableAutoCenterActive: true,
    enableDenseControls: false,
  };

  /**
   * Inicia o monitoramento global em todo o site
   */
  public init(options: EnhanceOptions = {}) {
    if (typeof window === 'undefined') return;
    if (this.isInitialized) {
      this.scanAndEnhance();
      return;
    }

    this.defaultOptions = { ...this.defaultOptions, ...options };
    this.isInitialized = true;

    // 1. Configura ResizeObserver para reavaliar overflow dinamicamente quando o conteúdo ou janela mudar
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target instanceof HTMLElement) {
            this.updateContainerOverflowState(entry.target);
          }
        });
      });
    }

    // 2. Configura IntersectionObserver para disparar nudge no mobile assim que qualquer container denso entra em tela
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              this.handleContainerIntersection(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
    }

    // 3. Configura MutationObserver para detectar nós dinâmicos (modais, filtros, abas, trocas de tela)
    this.mutationObserver = new MutationObserver((mutations) => {
      let shouldScan = false;
      for (const m of mutations) {
        if (m.type === 'childList' && m.addedNodes.length > 0) {
          shouldScan = true;
          break;
        }
        if (m.type === 'attributes') {
          shouldScan = true;
          break;
        }
      }
      if (shouldScan) {
        this.scheduleScan();
      }
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-selected', 'data-active', 'data-selected', 'data-state'],
    });

    // 4. Delegação global de cliques para auto-centralizar itens clicados dentro de qualquer container
    document.addEventListener('click', this.handleGlobalClick, { passive: true, capture: true });

    // 5. Delegação global de foco para inputs/botões em containers roláveis
    document.addEventListener('focusin', this.handleGlobalFocus, { passive: true });

    // 6. Suporte universal a arrasto suave com mouse em containers horizontais (drag-to-scroll)
    if (this.defaultOptions.enableMouseDrag) {
      this.setupGlobalDragToScroll();
    }

    // 7. Listener para redimensionamento da janela
    window.addEventListener('resize', this.scheduleScan, { passive: true });

    // Executa a primeira varredura
    this.scanAndEnhance();
  }

  /**
   * Destrói observadores e limpa recursos
   */
  public destroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
    if (this.periodicScanTimer) {
      clearInterval(this.periodicScanTimer);
      this.periodicScanTimer = null;
    }
    document.removeEventListener('click', this.handleGlobalClick, { capture: true });
    document.removeEventListener('focusin', this.handleGlobalFocus);
    window.removeEventListener('resize', this.scheduleScan);
    this.isInitialized = false;
  }

  /**
   * Agenda varredura com debounce para máxima performance sem travar a interface
   */
  public scheduleScan = () => {
    if (this.scanDebounceTimer) {
      cancelAnimationFrame(this.scanDebounceTimer);
    }
    this.scanDebounceTimer = requestAnimationFrame(() => {
      this.scanAndEnhance();
    });
  };

  /**
   * Varre universalmente containers de conteúdo do site e aprimora os que têm overflow
   */
  public scanAndEnhance() {
    if (typeof document === 'undefined') return;

    // Remove quaisquer controles residuais flutuantes ou botões injetados
    document.querySelectorAll('.dense-scroll-controls, [data-scroll-controls], .scroll-indicator-controls, .scroll-nav-controls').forEach((c) => c.remove());

    // Seletor abrangente que cobre divs, seções, tabelas, abas, formulários e listas em todo o site
    const elementsToInspect = Array.from(
      document.querySelectorAll<HTMLElement>(
        'div, section, article, nav, header, main, ul, ol, form, table, aside, [role="tablist"], [data-auto-scroll-container], [class*="overflow"]'
      )
    );

    elementsToInspect.forEach((el) => {
      this.enhanceElement(el);
    });
  }

  /**
   * Aplica aprimoramento e monitoramento a um elemento específico
   */
  public enhanceElement(el: HTMLElement) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return;

    // Ignora o próprio body/html ou elementos SVG/canvas
    const tagName = el.tagName.toLowerCase();
    if (tagName === 'body' || tagName === 'html' || tagName === 'svg' || tagName === 'canvas' || tagName === 'path') return;

    const style = window.getComputedStyle(el);
    const isHiddenX = style.overflowX === 'hidden';
    const isHiddenY = style.overflowY === 'hidden';

    // Determina se tem overflow real ou potencial
    const hasScrollX = !isHiddenX && (
      el.scrollWidth > el.clientWidth + 2 ||
      style.overflowX === 'auto' ||
      style.overflowX === 'scroll' ||
      el.hasAttribute('data-auto-scroll-container') ||
      el.classList.contains('overflow-x-auto') ||
      el.classList.contains('no-scrollbar') ||
      el.classList.contains('scrollbar-none')
    );

    const hasScrollY = !isHiddenY && (
      el.scrollHeight > el.clientHeight + 2 ||
      style.overflowY === 'auto' ||
      style.overflowY === 'scroll' ||
      el.classList.contains('overflow-y-auto')
    );

    if (!hasScrollX && !hasScrollY) {
      // Registra no ResizeObserver caso venha a ter overflow com renderizações futuras
      if (!this.observedElements.has(el) && (el.hasAttribute('data-auto-scroll-container') || tagName === 'table')) {
        this.resizeObserver?.observe(el);
        this.observedElements.add(el);
      }
      return;
    }

    // Marca o container como detectado para scroll
    el.setAttribute('data-overflow-detected', 'true');
    if (hasScrollX) el.setAttribute('data-overflow-x', 'true');
    if (hasScrollY) el.setAttribute('data-overflow-y', 'true');

    // Assegura estilo suave e aceleração tátil por hardware
    if (style.scrollBehavior !== 'smooth' && !el.dataset.dragActive) {
      el.style.scrollBehavior = 'smooth';
    }

    // Registra observadores se ainda não registrados
    if (!this.observedElements.has(el)) {
      this.observedElements.add(el);
      this.resizeObserver?.observe(el);
      if (hasScrollX) {
        this.intersectionObserver?.observe(el);
      }

      // Adiciona listener de rolagem para atualizar indicadores de borda (canScrollLeft, canScrollRight)
      el.addEventListener('scroll', () => this.updateContainerOverflowState(el), { passive: true });
    }

    // Atualiza imediatamente o estado de bordas e visibilidade
    this.updateContainerOverflowState(el);

    // Auto-centraliza item ativo inicial se houver
    if (this.defaultOptions.enableAutoCenterActive && hasScrollX) {
      this.autoCenterActiveChild(el, false);
    }

    // Garante que nenhum controle denso residual permaneça
    this.ensureDenseTableControls(el);
  }

  /**
   * Atualiza os atributos de estado de rolagem (canScrollLeft, canScrollRight, etc.)
   */
  public updateContainerOverflowState(el: HTMLElement) {
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const scrollTop = el.scrollTop;
    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const maxScrollTop = Math.max(0, el.scrollHeight - el.clientHeight);

    const hasHorizontal = maxScrollLeft > 3;
    const hasVertical = maxScrollTop > 3;

    el.setAttribute('data-has-h-overflow', hasHorizontal ? 'true' : 'false');
    el.setAttribute('data-has-v-overflow', hasVertical ? 'true' : 'false');

    const canScrollLeft = scrollLeft > 4;
    const canScrollRight = scrollLeft < maxScrollLeft - 4;
    const canScrollUp = scrollTop > 4;
    const canScrollDown = scrollTop < maxScrollTop - 4;

    el.setAttribute('data-can-scroll-left', canScrollLeft ? 'true' : 'false');
    el.setAttribute('data-can-scroll-right', canScrollRight ? 'true' : 'false');
    el.setAttribute('data-can-scroll-up', canScrollUp ? 'true' : 'false');
    el.setAttribute('data-can-scroll-down', canScrollDown ? 'true' : 'false');

    // Adiciona classe auxiliar para fade visual caso tenha overflow horizontal
    if (hasHorizontal) {
      el.classList.add('overflow-edge-mask');
    } else {
      el.classList.remove('overflow-edge-mask');
    }
  }

  /**
   * Trata a entrada do elemento na viewport: dispara o auto-nudge gentil no mobile
   */
  private handleContainerIntersection(el: HTMLElement) {
    if (!this.defaultOptions.enableMobileNudge) return;
    if (el.getAttribute('data-nudged') === 'true') return;

    const isMobile = window.innerWidth <= 1024 || 'ontouchstart' in window;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    // Só realiza o nudge se houver overflow horizontal relevante e for no mobile
    if (isMobile && maxScrollLeft > 24 && el.scrollLeft < 8) {
      el.setAttribute('data-nudged', 'true');

      // Pequeno atraso para a interface assentar
      window.setTimeout(() => {
        // Se o usuário já rolou manualmente, não interfere
        if (el.scrollLeft > 10) return;

        const originalBehavior = el.style.scrollBehavior;
        el.style.scrollBehavior = 'smooth';

        // Rolagem gentil de 40px para a direita
        const nudgeDistance = Math.min(42, maxScrollLeft * 0.45);
        el.scrollTo({ left: nudgeDistance, behavior: 'smooth' });

        // Aguarda 400ms e retorna suavemente à posição inicial (ou ao item ativo)
        window.setTimeout(() => {
          this.autoCenterActiveChild(el, true) || el.scrollTo({ left: 0, behavior: 'smooth' });
          window.setTimeout(() => {
            el.style.scrollBehavior = originalBehavior;
          }, 350);
        }, 400);
      }, 250);
    }
  }

  /**
   * Localiza o item filho atualmente ativo e o centraliza suavemente dentro do container
   */
  public autoCenterActiveChild(container: HTMLElement, smooth = true): boolean {
    if (!container) return false;

    // Seletores abrangentes que cobrem itens ativos em abas, botões, chips e cartões de todo o site
    const activeSelectors = [
      '[aria-selected="true"]',
      '[data-active="true"]',
      '[data-selected="true"]',
      '[aria-current="page"]',
      '[aria-current="true"]',
      '.active',
      '.tab-active',
      '[data-state="active"]',
      'button[class*="bg-purple-600"]',
      'button[class*="bg-purple-700"]',
      'button[class*="bg-indigo-600"]',
      'button[class*="bg-cyan-500"]',
      'button[class*="bg-cyan-600"]',
      'button[class*="bg-amber-500"]',
      'button[class*="bg-rose-500"]',
      'button[class*="bg-rose-600"]',
      'button[class*="bg-emerald-600"]',
      'button[class*="border-purple-500"]',
      'button[class*="border-purple-600"]',
      'button[class*="ring-2"]',
      'button[class*="ring-purple-"]',
    ];

    let activeChild: HTMLElement | null = null;
    for (const selector of activeSelectors) {
      const match = container.querySelector<HTMLElement>(selector);
      if (match && match.offsetParent !== null) {
        activeChild = match;
        break;
      }
    }

    if (!activeChild) return false;

    return this.centerChildElement(container, activeChild, smooth);
  }

  /**
   * Centraliza perfeitamente um filho específico no container com rolagem suave
   */
  public centerChildElement(container: HTMLElement, child: HTMLElement, smooth = true, allowVertical = false): boolean {
    if (!container || !child) return false;

    const containerRect = container.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    // Cálculo para scroll horizontal (carrosséis, barras de chips e abas)
    if (container.scrollWidth > container.clientWidth) {
      const currentScrollLeft = container.scrollLeft;
      const childRelativeLeft = childRect.left - containerRect.left + currentScrollLeft;
      const targetScrollLeft = childRelativeLeft - (container.clientWidth / 2) + (childRect.width / 2);

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const clampedLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));

      if (Math.abs(container.scrollLeft - clampedLeft) > 3) {
        container.scrollTo({
          left: clampedLeft,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    }

    // Cálculo para scroll vertical apenas se explicitamente permitido (ex: abertura inicial de modal/card)
    if (allowVertical && container.scrollHeight > container.clientHeight && container !== document.body) {
      const currentScrollTop = container.scrollTop;
      const childRelativeTop = childRect.top - containerRect.top + currentScrollTop;
      const targetScrollTop = childRelativeTop - (container.clientHeight / 2) + (childRect.height / 2);

      const maxScrollTop = container.scrollHeight - container.clientHeight;
      const clampedTop = Math.max(0, Math.min(targetScrollTop, maxScrollTop));

      if (Math.abs(container.scrollTop - clampedTop) > 5) {
        container.scrollTo({
          top: clampedTop,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    }

    return true;
  }

  /**
   * Intercepta cliques para auto-centralizar botões/abas clicadas dentro de carrosséis horizontais
   */
  private handleGlobalClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    // Busca se o clique foi em um botão, link, chip, rádio ou elemento interativo
    const clickable = target.closest('button, [role="tab"], [role="button"], a, input[type="radio"], .clickable-chip, [data-interactive]') as HTMLElement | null;
    if (!clickable) return;

    // Procura o container com overflow horizontal mais próximo (ex: carrossel de chips)
    let parent = clickable.parentElement;
    while (parent && parent !== document.body) {
      const maxScrollX = parent.scrollWidth - parent.clientWidth;

      // Apenas rola horizontalmente em carrosséis/barras de abas; nunca puxa scroll vertical de modais ou cartões
      if (maxScrollX > 10) {
        window.setTimeout(() => {
          this.centerChildElement(parent, clickable, true, false);
          this.updateContainerOverflowState(parent);
        }, 50);
        break;
      }
      parent = parent.parentElement;
    }
  };

  /**
   * Intercepta foco para auto-centralizar inputs/botões em containers horizontais roláveis
   */
  private handleGlobalFocus = (event: FocusEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    let parent = target.parentElement;
    while (parent && parent !== document.body) {
      // Apenas reposiciona horizontalmente se for container de rolagem horizontal
      if (parent.scrollWidth > parent.clientWidth + 10) {
        this.centerChildElement(parent, target, true, false);
        break;
      }
      parent = parent.parentElement;
    }
  };

  /**
   * Configura suporte universal a Drag-to-Scroll suave no desktop para carrosséis e tabelas
   */
  private setupGlobalDragToScroll() {
    window.addEventListener('mousedown', (e: MouseEvent) => {
      // Apenas botão principal (esquerdo) e não em campos de texto
      if (e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const tagName = target.tagName.toLowerCase();
      if (['input', 'textarea', 'select'].includes(tagName)) return;

      // Encontra container com overflow horizontal
      let container = target;
      while (container && container !== document.body) {
        if (container.scrollWidth > container.clientWidth + 10) {
          this.activeDragElement = container;
          this.dragStartX = e.pageX - container.offsetLeft;
          this.dragScrollLeft = container.scrollLeft;
          this.isDragging = false;
          this.dragDistance = 0;
          break;
        }
        container = container.parentElement as HTMLElement;
      }
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
      if (!this.activeDragElement) return;

      const x = e.pageX - this.activeDragElement.offsetLeft;
      const walk = (x - this.dragStartX) * 1.35; // Sensibilidade de arraste natural
      this.dragDistance = Math.abs(walk);

      if (this.dragDistance > 5) {
        this.isDragging = true;
        this.activeDragElement.setAttribute('data-drag-active', 'true');
        this.activeDragElement.style.scrollBehavior = 'auto'; // Instantâneo durante o arraste
        this.activeDragElement.scrollLeft = this.dragScrollLeft - walk;
        this.updateContainerOverflowState(this.activeDragElement);
      }
    });

    const finishDrag = () => {
      if (this.activeDragElement) {
        this.activeDragElement.removeAttribute('data-drag-active');
        this.activeDragElement.style.scrollBehavior = 'smooth';
        this.updateContainerOverflowState(this.activeDragElement);
        this.activeDragElement = null;
      }
      setTimeout(() => {
        this.isDragging = false;
      }, 50);
    };

    window.addEventListener('mouseup', finishDrag);
    window.addEventListener('mouseleave', finishDrag);

    // Previne clique indesejado se tiver arrastado mais de 8px
    window.addEventListener(
      'click',
      (e: MouseEvent) => {
        if (this.isDragging) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );
  }

  /**
   * Remove quaisquer controles densos injetados
   */
  private ensureDenseTableControls(container: HTMLElement) {
    const existing = container.querySelectorAll('.dense-scroll-controls, [data-scroll-controls], .scroll-indicator-controls, .scroll-nav-controls');
    existing.forEach((el) => el.remove());
  }

  /**
   * Rola programaticamente qualquer elemento ou seletor suavemente
   */
  public scrollTo(target: HTMLElement | string, options: { left?: number; top?: number; behavior?: ScrollBehavior } = {}) {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (!el) return;

    el.scrollTo({
      left: options.left,
      top: options.top,
      behavior: options.behavior || 'smooth',
    });
  }
}

// Instância única singleton
export const globalOverflowEnhancer = new GlobalOverflowScrollEnhancer();

if (typeof window !== 'undefined') {
  // Disponibiliza na window para inspeção e extensibilidade
  (window as unknown as { __globalOverflowEnhancer: GlobalOverflowScrollEnhancer }).__globalOverflowEnhancer = globalOverflowEnhancer;
}
