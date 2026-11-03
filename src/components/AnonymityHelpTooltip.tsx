import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, EyeOff, X, CheckCircle2, Shield } from 'lucide-react';
import { playBreathTone } from '../services/audioSynthesizer';

export interface AnonymityHelpTooltipProps {
  /** Título contextual da ajuda de anonimato */
  title: string;
  /** Explicação detalhada em texto ou parágrafo */
  content: string;
  /** Dicas práticas em tópicos para manter o sigilo absoluto */
  tips?: string[];
  /** Alinhamento do popup ('left' | 'right' | 'center') */
  align?: 'left' | 'right' | 'center';
  /** Etiqueta do topo (padrão: '100% Anônimo & Seguro') */
  badge?: string;
  /** Tamanho do botão de interrogação ('sm' | 'md') */
  size?: 'sm' | 'md';
  /** Classes extras para o contêiner */
  className?: string;
}

export const AnonymityHelpTooltip: React.FC<AnonymityHelpTooltipProps> = ({
  title,
  content,
  tips = [],
  align = 'left',
  badge = '100% Anônimo & Seguro',
  size = 'sm',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Alternar abertura/fechamento ao clicar no ícone de interrogação
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isOpen) {
      try {
        playBreathTone(580, 60, true);
      } catch {
        // silencioso se Web Audio não disponível
      }
    }
    setIsOpen(prev => !prev);
  };

  // Fechar ao clicar fora do componente
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Alinhamento da caixinha suspensa
  const alignmentClass = 
    align === 'right' 
      ? 'right-0 origin-top-right' 
      : align === 'center' 
      ? 'left-1/2 -translate-x-1/2 origin-top' 
      : 'left-0 sm:left-auto sm:right-auto origin-top-left';

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      {/* Botão com Ícone de Interrogação clicável */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={`Dica de anonimato: ${title}`}
        title="Clique para ver como seu anonimato é protegido nesta etapa"
        className={`inline-flex items-center justify-center rounded-full transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 select-none ${
          size === 'sm' 
            ? 'w-5 h-5 text-purple-600 hover:text-purple-800 bg-purple-100 hover:bg-purple-200 border border-purple-300' 
            : 'w-6 h-6 text-purple-700 hover:text-purple-900 bg-purple-100 hover:bg-purple-200 border border-purple-300 shadow-xs'
        } ${isOpen ? 'ring-2 ring-purple-500 bg-purple-200 text-purple-900 shadow-sm' : ''}`}
      >
        <HelpCircle className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      </button>

      {/* Caixa de Ajuda Contextual (Tooltip / Popover) que surge ao clicar */}
      {isOpen && (
        <div 
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-full mt-2.5 z-40 w-72 sm:w-84 max-w-[90vw] p-4 rounded-2xl bg-[#0e1224] text-white border-2 border-purple-500/80 shadow-2xl shadow-purple-950/60 animate-fadeIn backdrop-blur-xl ${alignmentClass}`}
        >
          {/* Triângulo indicador no topo */}
          <div 
            className={`absolute -top-2 w-3.5 h-3.5 bg-[#0e1224] border-t-2 border-l-2 border-purple-500/80 rotate-45 ${
              align === 'right' ? 'right-3' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-3'
            }`}
          />

          {/* Cabeçalho do Popover */}
          <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2.5 mb-2.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex-shrink-0">
                <EyeOff className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block truncate">
                  {badge}
                </span>
                <h5 className="text-xs font-bold text-gray-100 leading-tight">
                  {title}
                </h5>
              </div>
            </div>

            {/* Botão de Fechar Rápido */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
              title="Fechar ajuda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Corpo Contextual: Explicação com foco em Anonimato */}
          <p className="text-[11px] text-gray-300 leading-relaxed">
            {content}
          </p>

          {/* Dicas pontuais se existirem */}
          {tips.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1">
                <Shield className="w-3 h-3 text-purple-400" /> Como se proteger:
              </span>
              <ul className="space-y-1">
                {tips.map((tip, idx) => (
                  <li key={idx} className="text-[10px] text-gray-300 flex items-start gap-1.5 leading-snug">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rodapé de Ação / Confirmação */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[9px] text-gray-400">
              🔒 Criptografia ativa
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-2.5 py-1 rounded-lg bg-purple-600/60 hover:bg-purple-600 text-white text-[10px] font-bold transition-colors cursor-pointer border border-purple-400/40"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
