import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../AccessibilityContext';

export const ReadingRulerGuide: React.FC = () => {
  const { preferences } = useAccessibility();
  const [mouseY, setMouseY] = useState<number>(200);

  useEffect(() => {
    if (!preferences.readingRuler && !preferences.readingMask) return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientY = e.touches[0].clientY;
      } else if ('clientY' in e) {
        clientY = (e as MouseEvent).clientY;
      }
      setMouseY(clientY);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [preferences.readingRuler, preferences.readingMask]);

  if (!preferences.readingRuler && !preferences.readingMask) {
    return null;
  }

  // Máscara de foco para TDAH / Leitura concentrada: escurece acima e abaixo
  if (preferences.readingMask) {
    const bandHeight = 70; // altura da fita de foco
    const topHeight = Math.max(0, mouseY - bandHeight / 2);

    return (
      <div className="reading-mask-container pointer-events-none" aria-hidden="true">
        <div 
          className="accessibility-reading-mask-top" 
          style={{ height: `${topHeight}px` }} 
        />
        <div 
          className="accessibility-reading-mask-bottom" 
          style={{ top: `${topHeight + bandHeight}px`, bottom: 0 }} 
        />
      </div>
    );
  }

  // Régua de leitura simples: linha guia horizontal que segue a leitura
  return (
    <div 
      className="accessibility-reading-ruler"
      style={{ top: `${Math.max(0, mouseY - 16)}px` }}
      aria-hidden="true"
    />
  );
};
