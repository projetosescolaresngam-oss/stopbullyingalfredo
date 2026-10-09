import React, { useEffect, useState } from 'react';
import { useAccessibility } from '../../AccessibilityContext';

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => void;
    };
  }
}

export const VLibrasWidget: React.FC = () => {
  const { preferences } = useAccessibility();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!preferences.vlibrasActive) return;

    // Se o script já estiver no DOM
    if (document.getElementById('vlibras-script')) {
      if (window.VLibras && !scriptLoaded) {
        try {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
          setScriptLoaded(true);
        } catch (e) {
          console.warn('[VLibras] Erro ao instanciar widget:', e);
        }
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'vlibras-script';
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;

    script.onload = () => {
      if (window.VLibras) {
        try {
          new window.VLibras.Widget('https://vlibras.gov.br/app');
          setScriptLoaded(true);
        } catch (e) {
          console.warn('[VLibras] Erro ao instanciar widget:', e);
        }
      }
    };

    document.body.appendChild(script);
  }, [preferences.vlibrasActive, scriptLoaded]);

  if (!preferences.vlibrasActive) return null;

  return (
    <div 
      className="vlibras-container" 
      aria-hidden="true"
      style={{ zIndex: 99990, position: 'relative' }}
    >
      <div 
        {...{ 'vw': 'true' }} 
        className="enabled"
      >
        <div 
          {...{ 'vw-access-button': 'true' }} 
          className="active"
        />
        <div 
          {...{ 'vw-plugin-wrapper': 'true' }}
        >
          <div className="vw-plugin-top-wrapper" />
        </div>
      </div>
    </div>
  );
};
