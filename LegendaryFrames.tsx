import React from 'react';

/**
 * 9. MOLDURA DRAGÃO DO GELO & SAFIRAS ANCESTRAIS (Substitui Moldura Ametista da Sabedoria - Nível 11)
 * Réplica idêntica e fiel 1:1 da moldura enviada pelo usuário:
 * - Dragão de gelo colossal e majestoso com escamas cerúleas, chifres de cristal e olhos glaciais luminosos
 * - Corpo serpentino arqueado no topo e lateral direita com grandes asas de penas de cristal de gelo translúcidas
 * - Cauda escamosa espiralando com elegância pelo quadrante inferior esquerdo
 * - Aro gótico/céltico em prata e estanho esculpido com relevo de nós entrelaçados
 * - Duas safiras azuis brilhantes em lapidação cabochão nas posições 9 horas (esquerda) e 6 horas (base inferior)
 * - Flocos de neve, névoa congelante e centelhas diamantinas cintilantes
 */
export const renderAmethystFrameBackdrop = () => (
  <g id="frame_ametista_mistica_back">
    {/* Nicho Glacial Noturno para o Avatar */}
    <circle cx="32" cy="32" r="18.2" fill="#030714" />

    {/* Resplendor e Halo de Luz Azul Ártico e Safira */}
    <circle cx="32" cy="32" r="19.2" fill="none" stroke="#38bdf8" strokeWidth="2.2" opacity="0.6" filter="url(#cyanGlow)" />
    <circle cx="32" cy="32" r="18.5" fill="none" stroke="#60a5fa" strokeWidth="1.2" opacity="0.75" />

    {/* Halo Superior da Cabeça do Dragão */}
    <ellipse cx="16" cy="11" rx="10" ry="6" fill="#38bdf8" opacity="0.25" filter="url(#cyanGlow)" />

    {/* Halo da Safira na Base */}
    <ellipse cx="32" cy="60" rx="12" ry="5" fill="#2563eb" opacity="0.3" filter="url(#subtleGlow)" />
  </g>
);

export const renderAmethystFrameForeground = () => (
  <g id="frame_ametista_mistica_front">
    {/* 1. Imagem de Alta Definição da Moldura Exata com Corte Preciso 1:1 */}
    <image 
      href="/frame_dragao_gelo.png" 
      x="-8.33" 
      y="-8.53" 
      width="80.82" 
      height="80.82" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Bezel Interno Fino em Prata Glacial e Azul Celeste */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#cbd5e1" strokeWidth="0.7" opacity="0.85" />
    <circle cx="32" cy="32" r="18.5" fill="none" stroke="#38bdf8" strokeWidth="0.35" opacity="0.9" />

    {/* 3. Centelhas Glaciais e Brilhos Estelares de 4 Pontas */}
    <g opacity="0.95">
      {/* Brilho reluzente no Olho Glacial do Dragão */}
      <circle cx="15.3" cy="10.4" r="0.7" fill="#ffffff" filter="url(#cyanGlow)" />
      <circle cx="15.3" cy="10.4" r="0.3" fill="#e0f2fe" />

      {/* Centelha Estelar na Safira da Esquerda (9h) */}
      <g transform="translate(-0.8, 31.9)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#cyanGlow)" />
        <circle cx="0" cy="0" r="0.4" fill="#bae6fd" />
      </g>

      {/* Centelha Estelar na Safira da Base (6h) */}
      <g transform="translate(32, 60.5)">
        <polygon points="0,-2.2 0.5,-0.5 2.2,0 0.5,0.5 0,2.2 -0.5,0.5 -2.2,0 -0.5,-0.5" fill="#ffffff" filter="url(#cyanGlow)" />
        <circle cx="0" cy="0" r="0.45" fill="#93c5fd" />
      </g>

      {/* Cristal de Gelo Cintilante na Asa Direita */}
      <g transform="translate(54, 28)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#e0f2fe" />
      </g>
    </g>
  </g>
);

/**
 * 10. MOLDURA ASAS DE OURO & AMETISTA CELESTIAL (Substitui Moldura Rubi Flamejante - Nível 13)
 * Réplica idêntica e fiel da moldura SVGA enviada:
 * - Asas celestes de ouro maciço abertas no topo com brasão em V segurando grande gema de ametista multifacetada
 * - Órbitas de neon ciano elétrico e violeta reluzente circundando o perímetro
 * - Manoplas de armadura dourada e plumas de cristal púrpura nas laterais esquerda e direita
 * - Anéis concêntricos na base em ouro, magenta e púrpura com arcos de laser e estrelas cintilantes de 4 pontas
 */
export const renderRubyFrameBackdrop = () => (
  <g id="frame_rubi_coragem_back">
    {/* Nicho de Fundo Escuro Meia-Noite */}
    <circle cx="32" cy="32" r="18.2" fill="#04020a" />
    
    {/* Resplendor e Halo de Neon Ciano & Violeta Cósmico */}
    <circle cx="32" cy="32" r="19.2" fill="none" stroke="#06b6d4" strokeWidth="2.4" opacity="0.65" filter="url(#cyanGlow)" />
    <circle cx="32" cy="32" r="18.6" fill="none" stroke="#a855f7" strokeWidth="1.6" opacity="0.8" filter="url(#purpleGlow)" />
    
    {/* Halo Superior da Gema de Ametista */}
    <ellipse cx="32" cy="11" rx="14" ry="7" fill="#c084fc" opacity="0.25" filter="url(#subtleGlow)" />
    
    {/* Halo Inferior dos Arcos de Neon */}
    <ellipse cx="32" cy="54" rx="16" ry="6" fill="#06b6d4" opacity="0.25" filter="url(#cyanGlow)" />
  </g>
);

export const renderRubyFrameForeground = () => (
  <g id="frame_rubi_coragem_front">
    {/* 1. Camada de Imagem de Alta Resolução 1:1 Exata */}
    <image 
      href="/frame_rubi_celeste.png" 
      x="-5.85" 
      y="-5.70" 
      width="75.78" 
      height="75.78" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Anel Interno Bevelado em Ouro e Púrpura */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#eab308" strokeWidth="0.8" opacity="0.85" />
    <circle cx="32" cy="32" r="18.5" fill="none" stroke="#a855f7" strokeWidth="0.4" opacity="0.9" />

    {/* 3. Centelhas e Estrelas Cintilantes de 4 Pontas (Fidelidade ao Design Original) */}
    <g opacity="0.95">
      {/* Estrela no Canto Superior Direito (próximo à gema/asa) */}
      <g transform="translate(42, 16)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.4" fill="#a5f3fc" />
      </g>
      
      {/* Estrela no Arco Inferior Esquerdo */}
      <g transform="translate(24, 52)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#cyanGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#ffffff" />
      </g>

      {/* Estrela no Arco Inferior Direito */}
      <g transform="translate(41, 51)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.4" fill="#e9d5ff" />
      </g>

      {/* Brilho reluzente no centro da Ametista Superior */}
      <circle cx="32" cy="12" r="0.75" fill="#ffffff" filter="url(#subtleGlow)" opacity="0.9" />
    </g>
  </g>
);

/**
 * 11. MOLDURA PRISMA DA DIVERSIDADE & BIFROST (Lendário - Nível 15)
 * Inspiração Ponte Bifrost/Espectro Cromático: anel cromado com dispersão
 * holográfica contínua, 4 estrelas de diamante multifacetado com feixes de luz,
 * e aros prismáticos flutuantes.
 */
export const renderRainbowFrameBackdrop = () => (
  <g id="frame_arco_iris_paz_back">
    <circle cx="32" cy="32" r="23" fill="url(#bgDiscRainbow)" />
    {/* Resplendor Espectral Contínuo */}
    <circle cx="32" cy="32" r="29" fill="none" stroke="#ec4899" strokeWidth="1.2" opacity="0.45" filter="url(#subtleGlow)" />
  </g>
);

export const renderRainbowFrameForeground = () => (
  <g id="frame_arco_iris_paz_front">
    {/* Anel Interno de Diamante Branco Líquido */}
    <circle cx="32" cy="32" r="22.2" fill="none" stroke="#05020d" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="23" fill="none" stroke="#ffffff" strokeWidth="1.2" />

    {/* Anel Principal Prisma Arco-Íris Espectral Contínuo */}
    <circle cx="32" cy="32" r="26.4" fill="none" stroke="url(#gradRainbowH)" strokeWidth="5.2" />
    <circle cx="32" cy="32" r="26.4" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.7" strokeDasharray="6 3" />

    {/* Borda Externa de Platina Líquida Espelhada */}
    <circle cx="32" cy="32" r="29.2" fill="none" stroke="#ffffff" strokeWidth="0.9" />

    {/* 4 Grandes Estrelas de Diamante nos 4 Pontos Cardeais (12h, 6h, 9h, 3h) */}
    {/* Topo (12h): Estrela Guia de Diamante */}
    <g filter="url(#frameShadow)">
      <polygon points="32,-3 33.8,1.5 38,3.5 33.8,5.5 32,10 30.2,5.5 26,3.5 30.2,1.5" fill="#ffffff" stroke="#a855f7" strokeWidth="0.5" />
      <polygon points="32,3.5 34,1.5 32,3.5 34,5.5 32,3.5 30,5.5 32,3.5 30,1.5" stroke="#f43f5e" strokeWidth="0.5" />
      <circle cx="32" cy="3.5" r="1.2" fill="#ffffff" />
    </g>

    {/* Base (6h): Estrela da Paz */}
    <g filter="url(#frameShadow)">
      <polygon points="32,54 33.8,58.5 38,60.5 33.8,62.5 32,67 30.2,62.5 26,60.5 30.2,58.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="0.5" />
      <circle cx="32" cy="60.5" r="1.2" fill="#ffffff" />
    </g>

    {/* Esquerda (9h): Estrela da Harmonia */}
    <g filter="url(#frameShadow)">
      <polygon points="-3,32 1.5,30.2 3.5,26 5.5,30.2 10,32 5.5,33.8 3.5,38 1.5,33.8" fill="#ffffff" stroke="#f43f5e" strokeWidth="0.5" />
      <circle cx="3.5" cy="32" r="1.2" fill="#ffffff" />
    </g>

    {/* Direita (3h): Estrela da União */}
    <g filter="url(#frameShadow)">
      <polygon points="54,32 58.5,30.2 60.5,26 62.5,30.2 67,32 62.5,33.8 60.5,38 58.5,33.8" fill="#ffffff" stroke="#10b981" strokeWidth="0.5" />
      <circle cx="60.5" cy="32" r="1.2" fill="#ffffff" />
    </g>

    {/* 4 Pérolas Prismáticas nos Cantos a 45° com Auréolas Especulares */}
    <g transform="translate(11, 11)" filter="url(#frameShadow)">
      <circle cx="0" cy="0" r="2.2" fill="#ffffff" stroke="#ec4899" strokeWidth="0.6" />
      <circle cx="-0.6" cy="-0.6" r="0.7" fill="#ffffff" />
    </g>
    <g transform="translate(53, 11)" filter="url(#frameShadow)">
      <circle cx="0" cy="0" r="2.2" fill="#ffffff" stroke="#38bdf8" strokeWidth="0.6" />
      <circle cx="-0.6" cy="-0.6" r="0.7" fill="#ffffff" />
    </g>
    <g transform="translate(11, 53)" filter="url(#frameShadow)">
      <circle cx="0" cy="0" r="2.2" fill="#ffffff" stroke="#facc15" strokeWidth="0.6" />
      <circle cx="-0.6" cy="-0.6" r="0.7" fill="#ffffff" />
    </g>
    <g transform="translate(53, 53)" filter="url(#frameShadow)">
      <circle cx="0" cy="0" r="2.2" fill="#ffffff" stroke="#06b6d4" strokeWidth="0.6" />
      <circle cx="-0.6" cy="-0.6" r="0.7" fill="#ffffff" />
    </g>
  </g>
);

/**
 * 12. MOLDURA CYBERPUNK NEON 2077 (Lendário - Nível 12)
 * Tubos duplos de plasma laser neon (Ciano elétrico + Magenta hiper-saturado),
 * armadura angular mecha com faixas de advertência tática (///), retículos HUD e mira.
 */
export const renderCyberFrameBackdrop = () => (
  <g id="frame_cyber_neon_back">
    <circle cx="32" cy="32" r="23" fill="url(#bgDiscCyber)" />
    {/* Feixe Duplo de Brilho Neon */}
    <circle cx="32" cy="32" r="29" fill="none" stroke="#00f2fe" strokeWidth="1.2" opacity="0.4" filter="url(#cyanGlow)" />
  </g>
);

export const renderCyberFrameForeground = () => (
  <g id="frame_cyber_neon_front">
    {/* Trilho de Plasma Laser Superior-Esquerdo (Ciano Neon) */}
    <path 
      d="M9 32 A 26.4 26.4 0 0 1 55 32" 
      fill="none" 
      stroke="#00f2fe" 
      strokeWidth="4" 
      strokeLinecap="round" 
      filter="url(#subtleGlow)"
    />
    <path 
      d="M11 32 A 24.5 24.5 0 0 1 53 32" 
      fill="none" 
      stroke="#ffffff" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
    />

    {/* Trilho de Plasma Laser Inferior-Direito (Magenta Neon) */}
    <path 
      d="M55 32 A 26.4 26.4 0 0 1 9 32" 
      fill="none" 
      stroke="#ff007f" 
      strokeWidth="4" 
      strokeLinecap="round" 
      filter="url(#subtleGlow)"
    />
    <path 
      d="M53 32 A 24.5 24.5 0 0 1 11 32" 
      fill="none" 
      stroke="#ffffff" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
    />

    {/* Anel Interno Fino de Chassi Mecha Gunmetal */}
    <circle cx="32" cy="32" r="22.2" fill="none" stroke="#083344" strokeWidth="1.2" />

    {/* 4 Braçadeiras HUD Táticas Angulares nos 4 Cantos com Marcações Telemetria */}
    {/* Top-Left */}
    <g filter="url(#frameShadow)">
      <path d="M4 18 L4 4 L18 4" fill="none" stroke="#00f2fe" strokeWidth="1.8" strokeLinecap="square" />
      <circle cx="4" cy="4" r="1.4" fill="#ffffff" />
      {/* Faixas de Atenção Chevron /// */}
      <line x1="8" y1="6" x2="6" y2="8" stroke="#00f2fe" strokeWidth="1" />
      <line x1="12" y1="6" x2="10" y2="8" stroke="#00f2fe" strokeWidth="1" />
    </g>

    {/* Top-Right */}
    <g filter="url(#frameShadow)">
      <path d="M60 18 L60 4 L46 4" fill="none" stroke="#00f2fe" strokeWidth="1.8" strokeLinecap="square" />
      <circle cx="60" cy="4" r="1.4" fill="#ffffff" />
      <line x1="56" y1="6" x2="58" y2="8" stroke="#00f2fe" strokeWidth="1" />
      <line x1="52" y1="6" x2="54" y2="8" stroke="#00f2fe" strokeWidth="1" />
    </g>

    {/* Bottom-Left */}
    <g filter="url(#frameShadow)">
      <path d="M4 46 L4 60 L18 60" fill="none" stroke="#ff007f" strokeWidth="1.8" strokeLinecap="square" />
      <circle cx="4" cy="60" r="1.4" fill="#ffffff" />
      <line x1="8" y1="58" x2="6" y2="56" stroke="#ff007f" strokeWidth="1" />
      <line x1="12" y1="58" x2="10" y2="56" stroke="#ff007f" strokeWidth="1" />
    </g>

    {/* Bottom-Right */}
    <g filter="url(#frameShadow)">
      <path d="M60 46 L60 60 L46 60" fill="none" stroke="#ff007f" strokeWidth="1.8" strokeLinecap="square" />
      <circle cx="60" cy="60" r="1.4" fill="#ffffff" />
      <line x1="56" y1="58" x2="58" y2="56" stroke="#ff007f" strokeWidth="1" />
      <line x1="52" y1="58" x2="54" y2="56" stroke="#ff007f" strokeWidth="1" />
    </g>

    {/* Mira de Alvo Laser Superior e Inferior */}
    <line x1="32" y1="-1" x2="32" y2="5" stroke="#00f2fe" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="7" r="1.2" fill="#ffffff" stroke="#00f2fe" strokeWidth="0.6" />

    <line x1="32" y1="59" x2="32" y2="65" stroke="#ff007f" strokeWidth="2" strokeLinecap="round" />
    <circle cx="32" cy="57" r="1.2" fill="#ffffff" stroke="#ff007f" strokeWidth="0.6" />
  </g>
);
