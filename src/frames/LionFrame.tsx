import React from 'react';

/**
 * MOLDURA IMPERIAL GUARDIÕES CELESTES (Soberano Supremo)
 * Réplica idêntica e fiel da moldura imperial enviada:
 * - Anel duplo de neon ciano / turquesa elétrico de alta intensidade (#00f0ff / #22d3ee)
 * - Coroa real imperial de platina e prata no topo com feixes de luz celestiais
 * - Grandes asas aladas abertas com penas prateadas e pontas de neon ciano luminescente
 * - Dois leões guardiões prateados esculpidos rugindo com olhos azuis brilhantes
 * - Faixa / brasão heraldico curvado prateado e arabescos de fumaça ciano na base
 */
export const renderCelestialLionsFrameBackdrop = () => (
  <g id="frame_celeste_leoes_back">
    {/* Nicho de Fundo Escuro Meia-Noite / Espaço Profundo */}
    <circle cx="32" cy="32" r="18.2" fill="#02040a" />
    
    {/* Efeito Glow / Resplendor Neon Ciano do Anel */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#06b6d4" strokeWidth="2.8" opacity="0.65" filter="url(#cyanGlow)" />
    <circle cx="32" cy="32" r="18.8" fill="none" stroke="#22d3ee" strokeWidth="1.4" opacity="0.8" filter="url(#cyanGlow)" />
    <circle cx="32" cy="32" r="17.6" fill="none" stroke="#a5f3fc" strokeWidth="0.8" opacity="0.9" />

    {/* Resplendor e Halo de Luz da Coroa no Topo */}
    <ellipse cx="32" cy="11" rx="15" ry="7" fill="#00f5ff" opacity="0.25" filter="url(#cyanGlow)" />
    
    {/* Resplendor dos Olhos dos Leões e Fumaça Inferior */}
    <ellipse cx="32" cy="53" rx="14" ry="6" fill="#06b6d4" opacity="0.25" filter="url(#cyanGlow)" />
  </g>
);

export const renderCelestialLionsFrameForeground = () => (
  <g id="frame_celeste_leoes_front">
    {/* 1. Camada de Imagem de Alta Definição: Réplica Exata do Design */}
    <image 
      href="/frame_leoes_celeste.png" 
      x="-24.82" 
      y="-24.93" 
      width="113.64" 
      height="113.64" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Anel de Neon Ciano Elétrico no Perímetro Interno do Avatar */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#22d3ee" strokeWidth="1.2" opacity="0.9" filter="url(#cyanGlow)" />
    <circle cx="32" cy="32" r="18.4" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.95" />

    {/* 3. Glints e Centelhas de Brilho Estelar Óptico */}
    <g opacity="0.9">
      {/* Glint na Coroa Imperial Superior */}
      <circle cx="32" cy="8.5" r="0.75" fill="#ffffff" filter="url(#subtleGlow)" />
      
      {/* Glints nos Olhos Azuis Cintilantes dos Dois Leões */}
      <circle cx="21" cy="46.5" r="0.65" fill="#38bdf8" filter="url(#cyanGlow)" />
      <circle cx="43" cy="46.5" r="0.65" fill="#38bdf8" filter="url(#cyanGlow)" />
      
      {/* Realces nas Pontas das Asas Celestes */}
      <circle cx="16" cy="19" r="0.55" fill="#a5f3fc" filter="url(#cyanGlow)" />
      <circle cx="48" cy="19" r="0.55" fill="#a5f3fc" filter="url(#cyanGlow)" />
    </g>
  </g>
);

/**
 * MOLDURA REAL LEÃO DOURADO CLÁSSICA (Antiga)
 * Réplica idêntica e fiel da moldura imperial dourada clássica:
 * - Cabeça de Leão 3D esculpida em ouro no topo com tiara e gema diamante ciano
 * - Envergadura de folhas de acanto e asas douradas em relevo com esmalte azul petróleo / teal
 * - Aros laterais ornamentais majestosos com filigranas
 * - Brasão inferior alado com gema safira/ciano em lapidação escudo
 */
export const renderGoldenLionFrameBackdrop = () => (
  <g id="frame_leao_dourado_antigo_back">
    {/* Nicho de Fundo Azul Meia-Noite / Petróleo Imperial */}
    <circle cx="32" cy="32" r="18.5" fill="url(#bgDiscLion)" />
    
    {/* Resplendor e Brilho Dourado de Fundo */}
    <circle cx="32" cy="32" r="22" fill="none" stroke="#facc15" strokeWidth="1.2" opacity="0.45" filter="url(#goldGlow)" />
    <circle cx="32" cy="32" r="20" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.35" filter="url(#cyanGlow)" />
    
    {/* Halo do Leão no Topo */}
    <ellipse cx="32" cy="14" rx="14" ry="8" fill="#facc15" opacity="0.18" filter="url(#subtleGlow)" />
    
    {/* Halo da Gema Inferior */}
    <ellipse cx="32" cy="52" rx="10" ry="5" fill="#38bdf8" opacity="0.22" filter="url(#subtleGlow)" />
  </g>
);

export const renderGoldenLionFrameForeground = () => (
  <g id="frame_leao_dourado_antigo_front">
    {/* 1. Camada de Imagem de Alta Definição: Réplica Exata do Design Clássico */}
    <image 
      href="/frame_leao_dourado.png" 
      x="-11.1" 
      y="-11.2" 
      width="86.2" 
      height="86.2" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Camada Vetorial Adicional: Joias Cintilantes e Realce Óptico */}
    {/* Anel Bevelado de Encaixe do Avatar */}
    <circle cx="32" cy="32" r="18.1" fill="none" stroke="#fde047" strokeWidth="0.5" opacity="0.45" />

    {/* Gema Diamante Ciano na Tiara do Leão (Topo) */}
    <g transform="translate(32, 11)" filter="url(#cyanGlow)">
      <polygon points="0,-2.5 2,0 0,2.5 -2,0" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.4" />
      <polygon points="0,-1.8 1.2,0 0,1.8 -1.2,0" fill="#a5f3fc" />
      <circle cx="-0.4" cy="-0.6" r="0.45" fill="#ffffff" />
    </g>

    {/* Gema Ciano no Brasão Alado Inferior */}
    <g transform="translate(32, 52.5)" filter="url(#cyanGlow)">
      <polygon points="0,-3.2 2.8,0 0,3.8 -2.8,0" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.5" />
      <polygon points="0,-2.2 1.8,0 0,2.6 -1.8,0" fill="#38bdf8" />
      <polygon points="0,-1.2 1,0 0,1.4 -1,0" fill="#bae6fd" />
      <circle cx="-0.6" cy="-0.8" r="0.55" fill="#ffffff" />
    </g>

    {/* Brilhos / Glints Estelares nos Cantos Superiores */}
    <g opacity="0.8">
      <circle cx="21" cy="18" r="0.6" fill="#ffffff" filter="url(#subtleGlow)" />
      <circle cx="43" cy="18" r="0.6" fill="#ffffff" filter="url(#subtleGlow)" />
      <circle cx="16" cy="32" r="0.5" fill="#ffffff" />
      <circle cx="48" cy="32" r="0.5" fill="#ffffff" />
    </g>
  </g>
);

// Aliases de retrocompatibilidade
export const renderLionFrameBackdrop = renderCelestialLionsFrameBackdrop;
export const renderLionFrameForeground = renderCelestialLionsFrameForeground;

