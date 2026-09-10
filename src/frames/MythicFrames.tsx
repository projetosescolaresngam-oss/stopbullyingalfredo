import React from 'react';

/**
 * 13. MOLDURA GUARDIÃO CÓSMICO SUPREMO (Mítico Supremo - Nível 20)
 * A joia máxima de prestígio do jogo: ouro celestial e platina estelar,
 * 6 grandes asas de serafim cósmico abertas com penas luminescentes,
 * diadema de esfera armilar solar com núcleo de supernova no topo,
 * orbes planetárias orbitais com anéis gravitacionais e estrelas cintilantes.
 */
export const renderCosmicFrameBackdrop = () => (
  <g id="frame_guardiao_cosmico_back">
    <circle cx="32" cy="32" r="23" fill="url(#bgDiscCosmic)" />
    {/* Resplendor Cósmico Divino */}
    <circle cx="32" cy="32" r="30" fill="none" stroke="#facc15" strokeWidth="1.6" opacity="0.6" filter="url(#goldGlow)" />
    <circle cx="32" cy="32" r="28" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.4" filter="url(#purpleGlow)" />
  </g>
);

export const renderCosmicFrameForeground = () => (
  <g id="frame_guardiao_cosmico_front">
    {/* Anel Chanfrado Interno Ouro Solar Puro */}
    <circle cx="32" cy="32" r="22.2" fill="none" stroke="#3b0764" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="23" fill="none" stroke="#fef08a" strokeWidth="1.2" />

    {/* Aro Principal em Platina Estelar & Ouro Cósmico */}
    <circle cx="32" cy="32" r="26.4" fill="none" stroke="url(#gradCosmicGold)" strokeWidth="5.2" />
    <circle cx="32" cy="32" r="26.4" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="3 3" />

    {/* Borda Externa de Platina Estelar */}
    <circle cx="32" cy="32" r="29.4" fill="none" stroke="#ffffff" strokeWidth="1" />

    {/* 6 Grandes Asas Majestosas de Serafim Cósmico (3 de cada lado) */}
    {/* Asas da Esquerda */}
    <g filter="url(#frameShadow)">
      {/* Asa Superior Longa */}
      <path 
        d="M6 14 C0 19 -1 27 5 34 C6 29 5 22 7 17 Z" 
        fill="url(#gradCosmicGold)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <path d="M3 17 C0 22 1 29 5 32" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Asa Média */}
      <path 
        d="M4 25 C-2 31 -2 40 4 46 C5 41 4 34 6 28 Z" 
        fill="url(#gradCosmicGold)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <path d="M1 28 C-1 34 0 40 4 44" stroke="#fef08a" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Asa Inferior */}
      <path 
        d="M7 38 C1 44 2 52 8 56 C8 51 7 45 8 41 Z" 
        fill="url(#gradCosmicGold)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      
      {/* Orbe Cósmico Alado Esquerdo */}
      <circle cx="6" cy="32" r="2.2" fill="url(#gemAmethyst)" stroke="#fef08a" strokeWidth="0.6" />
      <circle cx="5.3" cy="31.3" r="0.6" fill="#ffffff" />
    </g>

    {/* Asas da Direita (Espelhadas) */}
    <g filter="url(#frameShadow)" transform="translate(64, 0) scale(-1, 1)">
      {/* Asa Superior Longa */}
      <path 
        d="M6 14 C0 19 -1 27 5 34 C6 29 5 22 7 17 Z" 
        fill="url(#gradCosmicGold)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <path d="M3 17 C0 22 1 29 5 32" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Asa Média */}
      <path 
        d="M4 25 C-2 31 -2 40 4 46 C5 41 4 34 6 28 Z" 
        fill="url(#gradCosmicGold)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <path d="M1 28 C-1 34 0 40 4 44" stroke="#fef08a" strokeWidth="0.8" fill="none" strokeLinecap="round" />

      {/* Asa Inferior */}
      <path 
        d="M7 38 C1 44 2 52 8 56 C8 51 7 45 8 41 Z" 
        fill="url(#gradCosmicGold)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />

      <circle cx="6" cy="32" r="2.2" fill="url(#gemAmethyst)" stroke="#fef08a" strokeWidth="0.6" />
      <circle cx="5.3" cy="31.3" r="0.6" fill="#ffffff" />
    </g>

    {/* 4 Esferas Planetárias Orbitais nos Cantos a 45° com Anéis de Gravidade */}
    {/* Canto Top-Left */}
    <g transform="translate(10, 10)" filter="url(#frameShadow)">
      {/* Anel Orbital de Saturno Dourado */}
      <ellipse cx="0" cy="0" rx="4.5" ry="1.5" fill="none" stroke="#fef08a" strokeWidth="0.6" transform="rotate(-30)" />
      <circle cx="0" cy="0" r="2.2" fill="url(#gemCosmicCore)" stroke="#ffffff" strokeWidth="0.5" />
      <circle cx="-0.6" cy="-0.6" r="0.6" fill="#ffffff" />
    </g>

    {/* Canto Top-Right */}
    <g transform="translate(54, 10)" filter="url(#frameShadow)">
      <ellipse cx="0" cy="0" rx="4.5" ry="1.5" fill="none" stroke="#fef08a" strokeWidth="0.6" transform="rotate(30)" />
      <circle cx="0" cy="0" r="2.2" fill="url(#gemCosmicCore)" stroke="#ffffff" strokeWidth="0.5" />
      <circle cx="-0.6" cy="-0.6" r="0.6" fill="#ffffff" />
    </g>

    {/* Canto Bottom-Left */}
    <g transform="translate(10, 54)" filter="url(#frameShadow)">
      <ellipse cx="0" cy="0" rx="4.5" ry="1.5" fill="none" stroke="#fef08a" strokeWidth="0.6" transform="rotate(30)" />
      <circle cx="0" cy="0" r="2.2" fill="url(#gemCosmicCore)" stroke="#ffffff" strokeWidth="0.5" />
      <circle cx="-0.6" cy="-0.6" r="0.6" fill="#ffffff" />
    </g>

    {/* Canto Bottom-Right */}
    <g transform="translate(54, 54)" filter="url(#frameShadow)">
      <ellipse cx="0" cy="0" rx="4.5" ry="1.5" fill="none" stroke="#fef08a" strokeWidth="0.6" transform="rotate(-30)" />
      <circle cx="0" cy="0" r="2.2" fill="url(#gemCosmicCore)" stroke="#ffffff" strokeWidth="0.5" />
      <circle cx="-0.6" cy="-0.6" r="0.6" fill="#ffffff" />
    </g>

    {/* Topo Supremo: Esfera Armilar Solar e Supernova Radiante */}
    <g filter="url(#frameShadow)">
      {/* Raios Solares Tridimensionais */}
      <polygon points="32,-5 34,2 32,5 30,2" fill="#ffffff" stroke="#eab308" strokeWidth="0.4" />
      <polygon points="26,-2 29,3 27,5 24,1" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.4" />
      <polygon points="38,-2 40,1 37,5 35,3" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.4" />
      
      {/* Arco Armilar com Anéis de Ouro */}
      <circle cx="32" cy="4" r="5" fill="none" stroke="url(#gradCosmicGold)" strokeWidth="1" />
      <ellipse cx="32" cy="4" rx="5" ry="1.8" fill="none" stroke="#ffffff" strokeWidth="0.7" />
      
      {/* Núcleo de Supernova Cintilante */}
      <circle cx="32" cy="4" r="2.6" fill="url(#gemCosmicCore)" stroke="#ffffff" strokeWidth="0.6" />
      <circle cx="31.2" cy="3.2" r="0.8" fill="#ffffff" />
    </g>

    {/* Base Imperial Soberana com Brasão Cósmico e Diamante Estelar */}
    <g filter="url(#frameShadow)">
      {/* Flor-de-lis Estelar */}
      <polygon points="32,67 38,58 35,58 32,60 29,58 26,58" fill="url(#gradCosmicGold)" stroke="#451a03" strokeWidth="0.8" />
      {/* Diamante Estelar */}
      <polygon points="32,57 35,60 32,63 29,60" fill="#ffffff" stroke="#a855f7" strokeWidth="0.5" />
      <circle cx="32" cy="60" r="1" fill="#fef08a" />
    </g>

    {/* Feixes e Estrelas de Cintilação Supernova */}
    <g transform="translate(19, 6)">
      <line x1="0" y1="-3" x2="0" y2="3" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      <line x1="-3" y1="0" x2="3" y2="0" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    </g>
    <g transform="translate(45, 6)">
      <line x1="0" y1="-3" x2="0" y2="3" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      <line x1="-3" y1="0" x2="3" y2="0" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    </g>
  </g>
);
