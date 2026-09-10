import React from 'react';

/**
 * 1. MOLDURA CLÁSSICA CARVALHO & LATÃO DE GUILDA (Comum - Nível Padrão)
 * Moldura de alta precisão artesanal: carvalho nobre chanfrado, arabescos de latão
 * polido nos 4 cantos, brasão de guilda no topo e placa de artífice na base.
 */
export const renderWoodFrameBackdrop = () => (
  <g id="frame_padrao_madeira_back">
    <circle cx="32" cy="32" r="23" fill="url(#bgDiscWood)" />
    {/* Anel sutil de profundidade */}
    <circle cx="32" cy="32" r="23" fill="none" stroke="#78350f" strokeWidth="0.8" opacity="0.6" />
    <circle cx="32" cy="32" r="20" fill="none" stroke="#290f02" strokeWidth="1" opacity="0.4" />
  </g>
);

export const renderWoodFrameForeground = () => (
  <g id="frame_padrao_madeira_front">
    {/* Anel Chanfrado Interno de Latão */}
    <circle cx="32" cy="32" r="22.2" fill="none" stroke="#451a03" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="23" fill="none" stroke="url(#gradBrass)" strokeWidth="0.9" />

    {/* Aro Principal de Madeira de Carvalho Maciço com chanfro duplo */}
    <circle cx="32" cy="32" r="26" fill="none" stroke="url(#gradWoodRing)" strokeWidth="4.6" />
    
    {/* Fio de Ouro / Latão trançado interno */}
    <circle cx="32" cy="32" r="27.8" fill="none" stroke="url(#gradBrass)" strokeWidth="0.8" />
    <circle cx="32" cy="32" r="28.6" fill="none" stroke="#290f02" strokeWidth="0.6" />

    {/* Arabescos Esculpidos de Latão Polido nos 4 Cantos (Filigrana Artesanal) */}
    {/* Canto Superior-Esquerdo */}
    <g transform="translate(6, 6)" filter="url(#frameShadow)">
      <path 
        d="M2 14 C2 6 6 2 14 2 C10 4 6 7 5 11 C8 9 11 10 11 13 C11 15 9 17 7 17 C4 17 2 15 2 14 Z" 
        fill="url(#gradBrass)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <circle cx="6" cy="6" r="2.2" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.6" />
      <circle cx="6" cy="6" r="0.9" fill="#290f02" />
      <circle cx="5.3" cy="5.3" r="0.5" fill="#ffffff" />
    </g>

    {/* Canto Superior-Direito */}
    <g transform="translate(58, 6) scale(-1, 1)" filter="url(#frameShadow)">
      <path 
        d="M2 14 C2 6 6 2 14 2 C10 4 6 7 5 11 C8 9 11 10 11 13 C11 15 9 17 7 17 C4 17 2 15 2 14 Z" 
        fill="url(#gradBrass)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <circle cx="6" cy="6" r="2.2" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.6" />
      <circle cx="6" cy="6" r="0.9" fill="#290f02" />
      <circle cx="5.3" cy="5.3" r="0.5" fill="#ffffff" />
    </g>

    {/* Canto Inferior-Esquerdo */}
    <g transform="translate(6, 58) scale(1, -1)" filter="url(#frameShadow)">
      <path 
        d="M2 14 C2 6 6 2 14 2 C10 4 6 7 5 11 C8 9 11 10 11 13 C11 15 9 17 7 17 C4 17 2 15 2 14 Z" 
        fill="url(#gradBrass)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <circle cx="6" cy="6" r="2.2" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.6" />
      <circle cx="6" cy="6" r="0.9" fill="#290f02" />
      <circle cx="5.3" cy="5.3" r="0.5" fill="#ffffff" />
    </g>

    {/* Canto Inferior-Direito */}
    <g transform="translate(58, 58) scale(-1, -1)" filter="url(#frameShadow)">
      <path 
        d="M2 14 C2 6 6 2 14 2 C10 4 6 7 5 11 C8 9 11 10 11 13 C11 15 9 17 7 17 C4 17 2 15 2 14 Z" 
        fill="url(#gradBrass)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <circle cx="6" cy="6" r="2.2" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.6" />
      <circle cx="6" cy="6" r="0.9" fill="#290f02" />
      <circle cx="5.3" cy="5.3" r="0.5" fill="#ffffff" />
    </g>

    {/* Dobradiças Laterais de Latão Escovado com Rebites (9h e 3h) */}
    <g transform="translate(1, 28)" filter="url(#frameShadow)">
      <rect x="0" y="0" width="5" height="8" rx="1.5" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.6" />
      <circle cx="2.5" cy="2.5" r="0.8" fill="#290f02" />
      <circle cx="2.5" cy="5.5" r="0.8" fill="#290f02" />
      <circle cx="2" cy="2" r="0.4" fill="#ffffff" />
    </g>
    <g transform="translate(58, 28)" filter="url(#frameShadow)">
      <rect x="0" y="0" width="5" height="8" rx="1.5" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.6" />
      <circle cx="2.5" cy="2.5" r="0.8" fill="#290f02" />
      <circle cx="2.5" cy="5.5" r="0.8" fill="#290f02" />
      <circle cx="2" cy="2" r="0.4" fill="#ffffff" />
    </g>

    {/* Brasão Superior: Emblema de Guilda com Louros e Compasso de Artífice */}
    <g filter="url(#frameShadow)">
      {/* Louros Laterais */}
      <path d="M23 7 C26 4 28 3 32 3 C36 3 38 4 41 7" fill="none" stroke="url(#gradBrass)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="25" cy="5.5" r="1.2" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.4" />
      <circle cx="39" cy="5.5" r="1.2" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.4" />
      
      {/* Escudo Central com Compasso de Guilda */}
      <polygon points="32,0 37.5,4.5 35.5,10 32,12 28.5,10 26.5,4.5" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.8" />
      <polygon points="32,2 35.5,5 34,8.5 32,10 30,8.5 28.5,5" fill="#78350f" />
      {/* Símbolo de Compasso Gravado */}
      <path d="M32 3 L30 8 M32 3 L34 8 M30 6.5 L34 6.5" stroke="#fef08a" strokeWidth="0.7" strokeLinecap="round" />
      <circle cx="32" cy="3" r="0.8" fill="#ffffff" />
    </g>

    {/* Placa de Artífice / Cartouche Inferior de Latão com Parafusos */}
    <g filter="url(#frameShadow)">
      <path d="M24 57 L40 57 C41.5 57 42.5 58.5 41.5 60 L39.5 63 C39 63.8 38 64 37 64 L27 64 C26 64 25 63.8 24.5 63 L22.5 60 C21.5 58.5 22.5 57 24 57 Z" fill="url(#gradBrass)" stroke="#290f02" strokeWidth="0.8" />
      {/* Detalhe interno entalhado */}
      <line x1="26" y1="60.5" x2="38" y2="60.5" stroke="#451a03" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="24.5" cy="60.5" r="0.7" fill="#451a03" />
      <circle cx="39.5" cy="60.5" r="0.7" fill="#451a03" />
      <circle cx="32" cy="60.5" r="1" fill="#fef08a" stroke="#290f02" strokeWidth="0.4" />
    </g>

    {/* Reflexo Especular de Luz (Brilho Estelar no Top-Left) */}
    <path d="M16 12 L18 12 M17 11 L17 13" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />
  </g>
);

/**
 * 2. MOLDURA BRONZE FORJADO DO SENTINELA (Comum - Nível 1)
 * Inspiração nórdica/espartana: anel de placas facetadas de bronze pesado,
 * runas antigas gravadas, cantoneiras de bigorna e 4 gemas de âmbar em garras.
 */
export const renderBronzeFrameBackdrop = () => (
  <g id="frame_bronze_aprendiz_back">
    <circle cx="32" cy="32" r="23" fill="url(#bgDiscBronze)" />
    <circle cx="32" cy="32" r="23" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.4" />
  </g>
);

export const renderBronzeFrameForeground = () => (
  <g id="frame_bronze_aprendiz_front">
    {/* Anel Chanfrado Interno Escuro */}
    <circle cx="32" cy="32" r="22.2" fill="none" stroke="#241002" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="23" fill="none" stroke="#f59e0b" strokeWidth="0.8" />

    {/* Anel Octogonal/Facetado de Bronze Pesado Forjado */}
    <circle cx="32" cy="32" r="26.2" fill="none" stroke="url(#gradBronzeRing)" strokeWidth="4.8" />

    {/* Linhas Segmentadas de Placas de Blindagem com Rebites */}
    <circle cx="32" cy="32" r="28.4" fill="none" stroke="#451a03" strokeWidth="0.8" />
    <circle cx="32" cy="32" r="24.2" fill="none" stroke="#78350f" strokeWidth="0.6" strokeDasharray="3 3" />

    {/* 4 Braçadeiras Angulares Forjadas nos 4 Cantos com Garras & Âmbar Lapidado */}
    {/* Canto Top-Left (45°) */}
    <g transform="translate(10, 10)" filter="url(#frameShadow)">
      {/* Placa de Reforço em Ângulo */}
      <polygon points="-3,-3 6,-5 5,5 -5,6" fill="url(#gradBronzeRing)" stroke="#241002" strokeWidth="0.8" />
      {/* Gema Lapidada de Âmbar Octogonal */}
      <polygon points="0,-3.5 2.5,-2.5 3.5,0 2.5,2.5 0,3.5 -2.5,2.5 -3.5,0 -2.5,-2.5" fill="url(#gemAmber)" stroke="#451a03" strokeWidth="0.6" />
      {/* 4 Garras Metálicas de Fixação */}
      <circle cx="-3" cy="0" r="0.6" fill="#fde68a" />
      <circle cx="3" cy="0" r="0.6" fill="#fde68a" />
      <circle cx="0" cy="-3" r="0.6" fill="#fde68a" />
      <circle cx="0" cy="3" r="0.6" fill="#fde68a" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
    </g>

    {/* Canto Top-Right */}
    <g transform="translate(54, 10)" filter="url(#frameShadow)">
      <polygon points="3,-3 5,6 -5,5 -6,-5" fill="url(#gradBronzeRing)" stroke="#241002" strokeWidth="0.8" />
      <polygon points="0,-3.5 2.5,-2.5 3.5,0 2.5,2.5 0,3.5 -2.5,2.5 -3.5,0 -2.5,-2.5" fill="url(#gemAmber)" stroke="#451a03" strokeWidth="0.6" />
      <circle cx="-3" cy="0" r="0.6" fill="#fde68a" />
      <circle cx="3" cy="0" r="0.6" fill="#fde68a" />
      <circle cx="0" cy="-3" r="0.6" fill="#fde68a" />
      <circle cx="0" cy="3" r="0.6" fill="#fde68a" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
    </g>

    {/* Canto Bottom-Left */}
    <g transform="translate(10, 54)" filter="url(#frameShadow)">
      <polygon points="-3,3 -5,-6 5,-5 6,5" fill="url(#gradBronzeRing)" stroke="#241002" strokeWidth="0.8" />
      <polygon points="0,-3.5 2.5,-2.5 3.5,0 2.5,2.5 0,3.5 -2.5,2.5 -3.5,0 -2.5,-2.5" fill="url(#gemAmber)" stroke="#451a03" strokeWidth="0.6" />
      <circle cx="-3" cy="0" r="0.6" fill="#fde68a" />
      <circle cx="3" cy="0" r="0.6" fill="#fde68a" />
      <circle cx="0" cy="-3" r="0.6" fill="#fde68a" />
      <circle cx="0" cy="3" r="0.6" fill="#fde68a" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
    </g>

    {/* Canto Bottom-Right */}
    <g transform="translate(54, 54)" filter="url(#frameShadow)">
      <polygon points="3,3 -6,5 -5,-5 5,-6" fill="url(#gradBronzeRing)" stroke="#241002" strokeWidth="0.8" />
      <polygon points="0,-3.5 2.5,-2.5 3.5,0 2.5,2.5 0,3.5 -2.5,2.5 -3.5,0 -2.5,-2.5" fill="url(#gemAmber)" stroke="#451a03" strokeWidth="0.6" />
      <circle cx="-3" cy="0" r="0.6" fill="#fde68a" />
      <circle cx="3" cy="0" r="0.6" fill="#fde68a" />
      <circle cx="0" cy="-3" r="0.6" fill="#fde68a" />
      <circle cx="0" cy="3" r="0.6" fill="#fde68a" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
    </g>

    {/* Flanges Laterais de Escudo de Batalha (9h e 3h) com Espinhos de Bronze */}
    <g transform="translate(0, 27)" filter="url(#frameShadow)">
      <polygon points="5,0 0,5 5,10" fill="url(#gradBronzeRing)" stroke="#241002" strokeWidth="0.7" />
      <circle cx="3" cy="5" r="0.9" fill="#fde68a" />
    </g>
    <g transform="translate(59, 27)" filter="url(#frameShadow)">
      <polygon points="0,0 5,5 0,10" fill="url(#gradBronzeRing)" stroke="#241002" strokeWidth="0.7" />
      <circle cx="2" cy="5" r="0.9" fill="#fde68a" />
    </g>

    {/* Elmo / Crista de Guerra Espartana Superior com Ponta de Lança e Âmbar */}
    <g filter="url(#frameShadow)">
      <polygon 
        points="32,-1 38,4 37,8.5 33,11 31,11 27,8.5 26,4" 
        fill="url(#gradBronzeRing)" 
        stroke="#241002" 
        strokeWidth="0.8" 
      />
      {/* Crista Central e Gema Losangular */}
      <polygon points="32,1.5 35,4.5 32,8 29,4.5" fill="url(#gemAmber)" stroke="#ffffff" strokeWidth="0.4" />
      <line x1="32" y1="-1" x2="32" y2="1.5" stroke="#fde68a" strokeWidth="1" strokeLinecap="round" />
      <circle cx="31.3" cy="4" r="0.6" fill="#ffffff" />
      {/* Rebites laterais na crista */}
      <circle cx="28" cy="7" r="0.6" fill="#241002" />
      <circle cx="36" cy="7" r="0.6" fill="#241002" />
    </g>

    {/* Fivela Inferior de Bigorna Nórdica com Runa de Força */}
    <g filter="url(#frameShadow)">
      <polygon points="26,56.5 38,56.5 36,63 32,64.5 28,63" fill="url(#gradBronzeRing)" stroke="#241002" strokeWidth="0.8" />
      <rect x="29" y="58" width="6" height="3" rx="0.5" fill="#241002" />
      {/* Runa Týr gravada em dourado */}
      <path d="M32 58.5 L32 60.5 M30.5 59.2 L32 58.5 L33.5 59.2" stroke="#fde68a" strokeWidth="0.6" strokeLinecap="round" fill="none" />
    </g>
  </g>
);

/**
 * 3. MOLDURA PRATA VIGILANTE & ASAS LUNARES (Raro - Nível 3)
 * Inspiração Paladino da Lua de Prata: platina espelhada com asas emplumadas
 * tridimensionais nas laterais, coroa de diadema com safira celestial e escudo gótico.
 */
export const renderSilverFrameBackdrop = () => (
  <g id="frame_prata_vigilante_back">
    <circle cx="32" cy="32" r="23" fill="url(#bgDiscSilver)" />
    {/* Resplendor Lunar Prateado */}
    <circle cx="32" cy="32" r="29" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.4" filter="url(#cyanGlow)" />
  </g>
);

export const renderSilverFrameForeground = () => (
  <g id="frame_prata_vigilante_front">
    {/* Anel Bevelado Interno Platina Espelhada */}
    <circle cx="32" cy="32" r="22.2" fill="none" stroke="#0f172a" strokeWidth="1" />
    <circle cx="32" cy="32" r="23" fill="none" stroke="#ffffff" strokeWidth="1" />

    {/* Anel Principal Espelhado em Prata & Platina com ranhura central */}
    <circle cx="32" cy="32" r="26.2" fill="none" stroke="url(#gradSilverRing)" strokeWidth="4.8" />
    <circle cx="32" cy="32" r="26.2" fill="none" stroke="#1e293b" strokeWidth="0.6" strokeDasharray="5 2" />

    {/* Borda Externa de Platina e Aço Polido */}
    <circle cx="32" cy="32" r="28.6" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />

    {/* Asas Emplumadas Majestosas de Falcão Prateado nas Laterais (3 Camadas) */}
    {/* Asa Esquerda */}
    <g filter="url(#frameShadow)">
      {/* Pena Superior Longa */}
      <path 
        d="M6 17 C1 23 1 33 6 42 C7 37 6 29 8 22 C7 19 6 17 6 17 Z" 
        fill="url(#gradSilverRing)" 
        stroke="#0f172a" 
        strokeWidth="0.7" 
      />
      {/* Pena Média Esculpida */}
      <path 
        d="M4 23 C2 28 2 37 7 42 C6 37 5 30 7 25 Z" 
        fill="#cbd5e1" 
        stroke="#0f172a" 
        strokeWidth="0.5" 
      />
      {/* Aresta Brilhante de Luz */}
      <path d="M4 20 C2 26 3 35 6 40" stroke="#ffffff" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      {/* Engaste de Safira Alada */}
      <g transform="translate(6, 32)">
        <polygon points="0,-4 3,0 0,4 -3,0" fill="url(#gemSapphire)" stroke="#ffffff" strokeWidth="0.5" />
        <circle cx="-0.6" cy="-0.6" r="0.5" fill="#ffffff" />
      </g>
    </g>

    {/* Asa Direita (Espelhada) */}
    <g filter="url(#frameShadow)" transform="translate(64, 0) scale(-1, 1)">
      <path 
        d="M6 17 C1 23 1 33 6 42 C7 37 6 29 8 22 C7 19 6 17 6 17 Z" 
        fill="url(#gradSilverRing)" 
        stroke="#0f172a" 
        strokeWidth="0.7" 
      />
      <path 
        d="M4 23 C2 28 2 37 7 42 C6 37 5 30 7 25 Z" 
        fill="#cbd5e1" 
        stroke="#0f172a" 
        strokeWidth="0.5" 
      />
      <path d="M4 20 C2 26 3 35 6 40" stroke="#ffffff" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <g transform="translate(6, 32)">
        <polygon points="0,-4 3,0 0,4 -3,0" fill="url(#gemSapphire)" stroke="#ffffff" strokeWidth="0.5" />
        <circle cx="-0.6" cy="-0.6" r="0.5" fill="#ffffff" />
      </g>
    </g>

    {/* Coroa / Diadema da Lua no Topo com Safira em Gota */}
    <g filter="url(#frameShadow)">
      {/* Agulhas de Platina do Diadema */}
      <polygon points="32,-2 35,3 39,1 37,6 39,9 33,11 31,11 25,9 27,6 25,1 29,3" fill="url(#gradSilverRing)" stroke="#0f172a" strokeWidth="0.8" />
      
      {/* Safira Celestial em Gota */}
      <path 
        d="M32 1 C34.5 4 35 7 32 9.5 C29 7 29.5 4 32 1 Z" 
        fill="url(#gemSapphire)" 
        stroke="#ffffff" 
        strokeWidth="0.5" 
      />
      <circle cx="31.2" cy="4" r="0.7" fill="#ffffff" />
      
      {/* 2 Diamantes Pequenos Flanqueadores */}
      <circle cx="28" cy="6" r="0.9" fill="#ffffff" stroke="#0284c7" strokeWidth="0.4" />
      <circle cx="36" cy="6" r="0.9" fill="#ffffff" stroke="#0284c7" strokeWidth="0.4" />
    </g>

    {/* Escudo Gótico Inferior com Brasão de Cruz Paladina e Safira */}
    <g filter="url(#frameShadow)">
      <polygon 
        points="32,65 38,58 35,58 32,60 29,58 26,58" 
        fill="url(#gradSilverRing)" 
        stroke="#0f172a" 
        strokeWidth="0.8" 
      />
      <polygon points="32,58 34.5,60.5 32,63 29.5,60.5" fill="url(#gemSapphire)" stroke="#ffffff" strokeWidth="0.4" />
      <circle cx="31.3" cy="59.8" r="0.5" fill="#ffffff" />
    </g>

    {/* Estrelas de Brilho Especular Cintilante */}
    <g transform="translate(18, 9)">
      <line x1="0" y1="-2" x2="0" y2="2" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="-2" y1="0" x2="2" y2="0" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
    </g>
    <g transform="translate(46, 9)">
      <line x1="0" y1="-2" x2="0" y2="2" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="-2" y1="0" x2="2" y2="0" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
    </g>
  </g>
);
