import React, { useState, useEffect, useRef } from 'react';
import { Volume2, X } from 'lucide-react';
import { useAccessibility } from '../../AccessibilityContext';

export const SelectionSpeechReader: React.FC = () => {
  const { speakText } = useAccessibility();
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        // Se a seleção foi desfeita, oculta após pequeno delay
        return;
      }

      const text = selection.toString().trim();
      if (text.length >= 3) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            setSelectedText(text);
            setPosition({
              x: Math.min(window.innerWidth - 170, Math.max(10, rect.left + rect.width / 2 - 75)),
              y: Math.max(10, rect.top - 46 + window.scrollY)
            });
          }
        } catch {
          // fallback
        }
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      // Se clicou fora do botão de leitura, limpa a seleção
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setTimeout(() => {
          const sel = window.getSelection();
          if (!sel || sel.isCollapsed) {
            setPosition(null);
            setSelectedText('');
          }
        }, 150);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, []);

  if (!position || !selectedText) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 99999
      }}
      className="animate-fadeIn"
    >
      <div className="flex items-center gap-1.5 bg-indigo-950/95 text-white px-3 py-1.5 rounded-full shadow-2xl border border-indigo-400/50 backdrop-blur-md text-xs font-bold ring-2 ring-indigo-500/20">
        <button
          type="button"
          onClick={() => {
            speakText(selectedText);
            setPosition(null);
            setSelectedText('');
          }}
          className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
          title="Ouvir o trecho de texto selecionado em voz alta"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Ouvir trecho</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setPosition(null);
            setSelectedText('');
          }}
          className="text-slate-400 hover:text-white p-0.5 ml-1 transition-colors cursor-pointer"
          title="Fechar"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
