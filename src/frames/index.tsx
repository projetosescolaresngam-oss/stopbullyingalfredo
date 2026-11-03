import React from 'react';


/**
 * Definições compartilhadas de gradientes, filtros e materiais ópticos
 * para o sistema de molduras de alta fidelidade e estética premium moderna.
 */
export const FrameDefs: React.FC = () => {
  return (
    <defs>
      {/* =================================================================== */}
      {/* 0. RECORTE DO NICHO DO AVATAR                                       */}
      {/* Confinamento do avatar central para que nunca ultrapasse a moldura  */}
      {/* =================================================================== */}
      <clipPath id="avatarInnerApertureClip">
        <circle cx="32" cy="32" r="17.0" />
      </clipPath>

      {/* =================================================================== */}
      {/* 1. FILTROS ÓPTICOS DE PROFUNDIDADE E BRILHO                          */}
      {/* =================================================================== */}
      <filter id="frameShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.75" />
      </filter>

      <filter id="subtleGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <filter id="neonGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feFlood floodColor="#facc15" floodOpacity="0.5" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
        <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
      </filter>

      <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feFlood floodColor="#06b6d4" floodOpacity="0.5" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
        <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
      </filter>

      <filter id="purpleGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feFlood floodColor="#c084fc" floodOpacity="0.5" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
        <feComposite in="SourceGraphic" in2="coloredBlur" operator="over" />
      </filter>

      {/* =================================================================== */}
      {/* 2. GRADIENTES DE FUNDO SUAVE (AMBIENT DISC BACKDROPS)                */}
      {/* =================================================================== */}
      {/* Fundo Real Leão Dourado */}
      <radialGradient id="bgDiscLion" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#083344" />
        <stop offset="60%" stopColor="#0a192f" />
        <stop offset="100%" stopColor="#030712" />
      </radialGradient>

      {/* Fundo Madeira & Latão */}
      <radialGradient id="bgDiscWood" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#2e1507" />
        <stop offset="70%" stopColor="#1a0c04" />
        <stop offset="100%" stopColor="#0c0502" />
      </radialGradient>

      {/* Fundo Bronze Forjado */}
      <radialGradient id="bgDiscBronze" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#3d1e06" />
        <stop offset="70%" stopColor="#241002" />
        <stop offset="100%" stopColor="#0f0601" />
      </radialGradient>

      {/* Fundo Prata Lunar */}
      <radialGradient id="bgDiscSilver" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="70%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </radialGradient>

      {/* Fundo Ouro Imperial */}
      <radialGradient id="bgDiscGold" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#3d2805" />
        <stop offset="70%" stopColor="#241602" />
        <stop offset="100%" stopColor="#0d0700" />
      </radialGradient>

      {/* Fundo Esmeralda Selva */}
      <radialGradient id="bgDiscEmerald" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#063e27" />
        <stop offset="70%" stopColor="#032215" />
        <stop offset="100%" stopColor="#010f09" />
      </radialGradient>

      {/* Fundo Safira Oceano */}
      <radialGradient id="bgDiscSapphire" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#0a2a4a" />
        <stop offset="70%" stopColor="#05172b" />
        <stop offset="100%" stopColor="#020914" />
      </radialGradient>

      {/* Fundo Ametista Cósmica */}
      <radialGradient id="bgDiscAmethyst" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#2b0a47" />
        <stop offset="70%" stopColor="#180429" />
        <stop offset="100%" stopColor="#090112" />
      </radialGradient>

      {/* Fundo Rubi Fogo */}
      <radialGradient id="bgDiscRuby" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#450808" />
        <stop offset="70%" stopColor="#260303" />
        <stop offset="100%" stopColor="#120000" />
      </radialGradient>

      {/* Fundo Prisma Paz */}
      <radialGradient id="bgDiscRainbow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#1e1338" />
        <stop offset="70%" stopColor="#0e071f" />
        <stop offset="100%" stopColor="#05020d" />
      </radialGradient>

      {/* Fundo Guardião Cósmico */}
      <radialGradient id="bgDiscCosmic" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#191747" />
        <stop offset="60%" stopColor="#0c0926" />
        <stop offset="100%" stopColor="#03020d" />
      </radialGradient>

      {/* Fundo Cyber Neon */}
      <radialGradient id="bgDiscCyber" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#06192a" />
        <stop offset="70%" stopColor="#020b14" />
        <stop offset="100%" stopColor="#000308" />
      </radialGradient>

      {/* Fundo Matriz Código */}
      <radialGradient id="bgDiscMatrix" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#032616" />
        <stop offset="70%" stopColor="#01140b" />
        <stop offset="100%" stopColor="#000804" />
      </radialGradient>

      {/* Fundo Rosa Empatia */}
      <radialGradient id="bgDiscEmpathy" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#3d0818" />
        <stop offset="70%" stopColor="#24030d" />
        <stop offset="100%" stopColor="#120005" />
      </radialGradient>

      {/* =================================================================== */}
      {/* 3. METAIS NOBRES E CHANFROS METÁLICOS                               */}
      {/* =================================================================== */}
      {/* Madeira Nobre */}
      <linearGradient id="gradWoodRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="35%" stopColor="#78350f" />
        <stop offset="70%" stopColor="#451a03" />
        <stop offset="100%" stopColor="#290f02" />
      </linearGradient>

      {/* Latão Polido */}
      <linearGradient id="gradBrass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="30%" stopColor="#eab308" />
        <stop offset="70%" stopColor="#a16207" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>

      {/* Bronze Forjado Antigo */}
      <linearGradient id="gradBronzeRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="25%" stopColor="#f59e0b" />
        <stop offset="55%" stopColor="#b45309" />
        <stop offset="85%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>

      {/* Prata Lunar & Platina Espelhada */}
      <linearGradient id="gradSilverRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#f1f5f9" />
        <stop offset="50%" stopColor="#cbd5e1" />
        <stop offset="75%" stopColor="#94a3b8" />
        <stop offset="90%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>

      {/* Ouro Imperial 24K */}
      <linearGradient id="gradGoldImperial" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="15%" stopColor="#fef08a" />
        <stop offset="40%" stopColor="#facc15" />
        <stop offset="70%" stopColor="#ca8a04" />
        <stop offset="90%" stopColor="#854d0e" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>

      {/* Esmeralda / Jade Florestal */}
      <linearGradient id="gradEmeraldRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a7f3d0" />
        <stop offset="25%" stopColor="#34d399" />
        <stop offset="55%" stopColor="#059669" />
        <stop offset="80%" stopColor="#065f46" />
        <stop offset="100%" stopColor="#022c22" />
      </linearGradient>

      {/* Safira Glacial */}
      <linearGradient id="gradSapphireRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#e0f2fe" />
        <stop offset="25%" stopColor="#38bdf8" />
        <stop offset="55%" stopColor="#0284c7" />
        <stop offset="80%" stopColor="#075985" />
        <stop offset="100%" stopColor="#082f49" />
      </linearGradient>

      {/* Ametista Arcana */}
      <linearGradient id="gradAmethystRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f3e8ff" />
        <stop offset="25%" stopColor="#c084fc" />
        <stop offset="55%" stopColor="#9333ea" />
        <stop offset="80%" stopColor="#6b21a8" />
        <stop offset="100%" stopColor="#2e0854" />
      </linearGradient>

      {/* Fogo Rubi / Magma */}
      <linearGradient id="gradRubyRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="20%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="80%" stopColor="#b91c1c" />
        <stop offset="100%" stopColor="#450a0a" />
      </linearGradient>

      {/* Arco-Íris Prisma Espectral (Horizontal) */}
      <linearGradient id="gradRainbowH" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="20%" stopColor="#fb923c" />
        <stop offset="40%" stopColor="#facc15" />
        <stop offset="60%" stopColor="#10b981" />
        <stop offset="80%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>

      {/* Guardião Cósmico Dourado & Celestial */}
      <linearGradient id="gradCosmicGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="20%" stopColor="#fde047" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="80%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>

      <linearGradient id="gradCosmicBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="45%" stopColor="#4338ca" />
        <stop offset="100%" stopColor="#1e1b4b" />
      </linearGradient>

      {/* Cyber Neon Ciano */}
      <linearGradient id="gradCyberCyan" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a5f3fc" />
        <stop offset="40%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#083344" />
      </linearGradient>

      {/* Cyber Neon Magenta */}
      <linearGradient id="gradCyberPink" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fbcfe8" />
        <stop offset="40%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>

      {/* Matriz Hacker Verde Fósforo */}
      <linearGradient id="gradMatrixGreen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6ee7b7" />
        <stop offset="35%" stopColor="#10b981" />
        <stop offset="75%" stopColor="#047857" />
        <stop offset="100%" stopColor="#022c22" />
      </linearGradient>

      {/* Ouro Rosa Acolhedor Empatia */}
      <linearGradient id="gradRoseGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff1f2" />
        <stop offset="25%" stopColor="#fda4af" />
        <stop offset="55%" stopColor="#fb7185" />
        <stop offset="80%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#4c0519" />
      </linearGradient>

      {/* =================================================================== */}
      {/* 4. GEMAS FACETADAS LUMINOSAS                                        */}
      {/* =================================================================== */}
      {/* Gema Rubi Vermelho */}
      <linearGradient id="gemRuby" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#f87171" />
        <stop offset="60%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>

      {/* Gema Safira Azul */}
      <linearGradient id="gemSapphire" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#38bdf8" />
        <stop offset="70%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#075985" />
      </linearGradient>

      {/* Gema Esmeralda Verde */}
      <linearGradient id="gemEmerald" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#34d399" />
        <stop offset="70%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064e3b" />
      </linearGradient>

      {/* Gema Ametista Roxa */}
      <linearGradient id="gemAmethyst" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#c084fc" />
        <stop offset="70%" stopColor="#9333ea" />
        <stop offset="100%" stopColor="#581c87" />
      </linearGradient>

      {/* Gema Âmbar / Topázio */}
      <linearGradient id="gemAmber" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#fde047" />
        <stop offset="70%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>

      {/* Gema Diamante Rosa Quartzo */}
      <linearGradient id="gemRoseQuartz" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#fecdd3" />
        <stop offset="70%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#9f1239" />
      </linearGradient>
    </defs>
  );
};


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


/**
 * 4. MOLDURA OURO IMPERIAL 24K (Épico - Nível 5)
 * Regalia Imperial: ouro nobre maciço trabalhado em filigrana barroca,
 * coroa imperial de 5 pontas no topo com rubi real, 4 rubis em corte almofada
 * nos cantos e flor-de-lis com garras leoninas na base.
 */
export const renderGoldFrameBackdrop = () => (
  <g id="frame_ouro_radiante_back">
    <circle cx="32" cy="32" r="23" fill="url(#bgDiscGold)" />
    {/* Resplendor Imperial de Ouro */}
    <circle cx="32" cy="32" r="29" fill="none" stroke="#facc15" strokeWidth="1.2" opacity="0.45" filter="url(#goldGlow)" />
  </g>
);

export const renderGoldFrameForeground = () => (
  <g id="frame_ouro_radiante_front">
    {/* Anel Chanfrado Interno Ouro Escovado */}
    <circle cx="32" cy="32" r="22.2" fill="none" stroke="#451a03" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="23" fill="none" stroke="#fef08a" strokeWidth="1" />

    {/* Aro Principal em Ouro 24K Maciço com Ranhuras Gravadas */}
    <circle cx="32" cy="32" r="26.4" fill="none" stroke="url(#gradGoldImperial)" strokeWidth="5" />
    <circle cx="32" cy="32" r="26.4" fill="none" stroke="#854d0e" strokeWidth="0.8" strokeDasharray="4 2" />

    {/* Borda Externa Chanfrada com Friso de Folhas de Louro */}
    <circle cx="32" cy="32" r="29" fill="none" stroke="#ca8a04" strokeWidth="0.9" />

    {/* Filigrana Barroca de Folhas de Acanto nos 4 Cantos (45°) com Rubis Reais */}
    {/* Canto Superior-Esquerdo */}
    <g transform="translate(10, 10)" filter="url(#frameShadow)">
      {/* Voluta de Folha de Acanto */}
      <path 
        d="M-3 -3 C-5 4 0 6 3 3 C5 1 5 -4 0 -4 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      {/* Rubi Cushion-Cut Facetado */}
      <rect x="-3" y="-3" width="6" height="6" rx="1.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" transform="rotate(45)" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
      {/* 4 Garras de Ouro Imperial */}
      <circle cx="-3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="-3.2" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="3.2" r="0.5" fill="#fef08a" />
    </g>

    {/* Canto Superior-Direito */}
    <g transform="translate(54, 10)" filter="url(#frameShadow)">
      <path 
        d="M3 -3 C5 4 0 6 -3 3 C-5 1 -5 -4 0 -4 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <rect x="-3" y="-3" width="6" height="6" rx="1.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" transform="rotate(45)" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
      <circle cx="-3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="-3.2" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="3.2" r="0.5" fill="#fef08a" />
    </g>

    {/* Canto Inferior-Esquerdo */}
    <g transform="translate(10, 54)" filter="url(#frameShadow)">
      <path 
        d="M-3 3 C-5 -4 0 -6 3 -3 C5 -1 5 4 0 4 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <rect x="-3" y="-3" width="6" height="6" rx="1.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" transform="rotate(45)" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
      <circle cx="-3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="-3.2" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="3.2" r="0.5" fill="#fef08a" />
    </g>

    {/* Canto Inferior-Direito */}
    <g transform="translate(54, 54)" filter="url(#frameShadow)">
      <path 
        d="M3 3 C5 -4 0 -6 -3 -3 C-5 -1 -5 4 0 4 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <rect x="-3" y="-3" width="6" height="6" rx="1.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" transform="rotate(45)" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
      <circle cx="-3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="-3.2" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="3.2" r="0.5" fill="#fef08a" />
    </g>

    {/* Coroa Imperial de 5 Pontas no Topo com Orbe e Rubi Cabochão */}
    <g filter="url(#frameShadow)">
      {/* Faixa Base da Coroa com Pérolas */}
      <rect x="23" y="8" width="18" height="3" rx="1" fill="url(#gradGoldImperial)" stroke="#451a03" strokeWidth="0.7" />
      <circle cx="26" cy="9.5" r="0.7" fill="#ffffff" />
      <circle cx="29" cy="9.5" r="0.7" fill="#ffffff" />
      <circle cx="32" cy="9.5" r="0.7" fill="#ffffff" />
      <circle cx="35" cy="9.5" r="0.7" fill="#ffffff" />
      <circle cx="38" cy="9.5" r="0.7" fill="#ffffff" />

      {/* 5 Pontas com Esferas de Ouro */}
      <polygon 
        points="23,8 24,2.5 27,6.5 32,-1.5 37,6.5 40,2.5 41,8" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.8" 
      />
      {/* Esferas Douradas nas pontas */}
      <circle cx="24" cy="2" r="1.1" fill="#fef08a" stroke="#713f12" strokeWidth="0.4" />
      <circle cx="32" cy="-2" r="1.5" fill="#fef08a" stroke="#713f12" strokeWidth="0.5" />
      <circle cx="40" cy="2" r="1.1" fill="#fef08a" stroke="#713f12" strokeWidth="0.4" />

      {/* Grande Rubi Central na Coroa */}
      <ellipse cx="32" cy="4" rx="2.5" ry="3.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" />
      <circle cx="31.2" cy="3" r="0.8" fill="#ffffff" />
    </g>

    {/* Flor-de-Lis Imperial com Brasão Real Inferior */}
    <g filter="url(#frameShadow)">
      <path 
        d="M32 64 C30 62 26 59 28 56 C29 55 31 56 32 58 C33 56 35 55 36 56 C38 59 34 62 32 64 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.8" 
      />
      <polygon points="32,54 34,57 32,59 30,57" fill="url(#gemRuby)" stroke="#ffffff" strokeWidth="0.4" />
      <circle cx="31.5" cy="56.5" r="0.5" fill="#ffffff" />
    </g>

    {/* Cintilação Real (Estrelas de Ouro no Top-Left e Bottom-Right) */}
    <g transform="translate(19, 8)">
      <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
    </g>
    <g transform="translate(45, 8)">
      <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
    </g>
  </g>
);

/**
 * 5. MOLDURA NINJAS DO FOGO & TROVÃO (Substitui Moldura Esmeralda da Convivência - Épico Nível 7)
 * Réplica exata 1:1 solicitada pelo usuário:
 * - Naruto Uzumaki no quadrante esquerdo com cabelos loiros espetados, bandana da Folha,
 *   conjurando a esfera de Rasengan luminosa azul ciano envolta em vórtices de chamas da Kurama
 * - Sasuke Uchiha no quadrante direito com olhos Sharingan vermelhos, desembainhando a espada katana
 *   e disparando relâmpagos elétricos azul-celeste de alta voltagem do Chidori
 * - Arco circular superior em laca carmesim com filigrana dourada e arabescos esculpidos
 * - Placa e medalhão heráldico ornamental carmesim com detalhes em ouro na base
 * - Recorte circular 1:1 transparente central para encaixe perfeito do avatar
 * - Sobreposição frontal 100% sólida sobre o ícone do avatar
 */
export const renderEmeraldFrameBackdrop = () => (
  <g id="frame_esmeralda_natureza_back">
    {/* Nicho Escuro Shinobi para o Avatar Central */}
    <circle cx="32" cy="32" r="17.5" fill="#09050d" />
    
    {/* Resplendor e Brilho das Chamas da Raposa (Esquerda) e Trovão Elétrico (Direita) */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#ea580c" strokeWidth="2.0" opacity="0.55" filter="url(#goldGlow)" />
    <circle cx="32" cy="32" r="17.8" fill="none" stroke="#0284c7" strokeWidth="1.2" opacity="0.75" filter="url(#cyanGlow)" />
    
    {/* Halo Quente da Kurama (Esquerda) */}
    <ellipse cx="23" cy="32" rx="9" ry="15" fill="#f97316" opacity="0.22" filter="url(#goldGlow)" />
    
    {/* Halo Eletrostático do Chidori (Direita) */}
    <ellipse cx="41" cy="32" rx="9" ry="15" fill="#38bdf8" opacity="0.22" filter="url(#cyanGlow)" />
  </g>
);

export const renderEmeraldFrameForeground = () => (
  <g id="frame_esmeralda_natureza_front">
    {/* 1. Imagem de Alta Definição da Moldura Exata com Corte Preciso 1:1 (Sobrepõe 100% o Ícone) */}
    <image 
      href="/frame_esmeralda_natureza.png" 
      x="-7" 
      y="-7" 
      width="78" 
      height="78" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Anel Interno Chanfrado de Laca Carmesim e Ouro */}
    <circle cx="32" cy="32" r="17.1" fill="none" stroke="#7f1d1d" strokeWidth="0.8" opacity="0.85" />
    <circle cx="32" cy="32" r="17.4" fill="none" stroke="#eab308" strokeWidth="0.5" opacity="0.9" />
    <circle cx="32" cy="32" r="17.6" fill="none" stroke="#fef08a" strokeWidth="0.25" opacity="0.95" />

    {/* 3. Centelhas Dinâmicas de Energia Ki & Trovão */}
    <g opacity="0.95">
      {/* Centelha de Energia no Rasengan de Naruto (Quadrante Esquerdo) */}
      <g transform="translate(18, 38)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#cyanGlow)" />
        <circle cx="0" cy="0" r="0.45" fill="#38bdf8" />
      </g>

      {/* Centelha de Eletricidade no Chidori de Sasuke (Quadrante Direito) */}
      <g transform="translate(46, 38)">
        <polygon points="0,-2.2 0.5,-0.5 2.2,0 0.5,0.5 0,2.2 -0.5,0.5 -2.2,0 -0.5,-0.5" fill="#ffffff" filter="url(#cyanGlow)" />
        <circle cx="0" cy="0" r="0.45" fill="#e0f2fe" />
      </g>

      {/* Cintilação Dourada no Arco Superior em Laca */}
      <g transform="translate(32, 7)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#fef08a" />
      </g>

      {/* Cintilação no Medalhão Carmesim da Base */}
      <g transform="translate(32, 57)">
        <polygon points="0,-1.6 0.4,-0.4 1.6,0 0.4,0.4 0,1.6 -0.4,0.4 -1.6,0 -0.4,-0.4" fill="#ffffff" filter="url(#goldGlow)" />
        <circle cx="0" cy="0" r="0.3" fill="#fca5a5" />
      </g>
    </g>
  </g>
);

/**
 * 6. MOLDURA GOKU NUVEM VOADORA & ARO MÍSTICO ORIENTAL (Substitui Moldura Safira da Tranquilidade - Nível 9)
 * Réplica idêntica e fiel 1:1 da moldura enviada pelo usuário:
 * - Jovem Goku sorridente montado na Nuvem Voadora Dourada (Kinto'un) empunhando o Bastão Mágico (Nyoibo) no quadrante inferior esquerdo
 * - Aro circular metálico em ouro e bronze com arabescos curvados no topo
 * - Placas de pedra cinzelada esculpidas e entrelaçadas com fitas de laca vermelha reluzente na lateral direita
 * - Nuvens esculpidas em prata com ornamentos de laca carmesim na base
 * - Resplendor e halo dourado/âmbar ao longo do bordo interno do nicho
 * - Recorte circular 1:1 transparente para encaixe perfeito do avatar
 */
export const renderSapphireFrameBackdrop = () => (
  <g id="frame_safira_oceano_back">
    {/* Nicho Escuro Fundo para o Avatar Central */}
    <circle cx="32" cy="32" r="14.5" fill="#0b0914" />
  </g>
);

export const renderSapphireFrameForeground = () => (
  <g id="frame_safira_oceano_front">
    {/* 1. Imagem de Alta Definição da Moldura Exata com Corte Preciso 1:1 (Goku e Moldura 100% Sólidos e Sobrepostos ao Ícone) */}
    <image 
      href="/frame_goku_nimbus.png" 
      x="-7" 
      y="-7" 
      width="78" 
      height="78" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Centelhas Douradas e Cintilações de Energia Ki */}
    <g opacity="0.95">
      {/* Centelha Estelar no Aro Superior Dourado */}
      <g transform="translate(32, 7.5)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#fef08a" />
      </g>

      {/* Centelha Estelar na Nuvem Voadora (Kinto'un) */}
      <g transform="translate(14, 52)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#goldGlow)" />
        <circle cx="0" cy="0" r="0.4" fill="#fde047" />
      </g>

      {/* Centelha no Lacre Vermelho da Base */}
      <g transform="translate(32, 57)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#fca5a5" />
      </g>

      {/* Brilho reluzente na ponta do Bastão Mágico */}
      <circle cx="21" cy="24" r="0.6" fill="#ffffff" filter="url(#subtleGlow)" />
    </g>
  </g>
);

/**
 * 7. MOLDURA GUARDIÕES SHINOBI DAS CHAMAS (Substitui Moldura Matriz Cibernética)
 * Réplica idêntica e fiel da moldura enviada:
 * - Dois ninjas guardiões encapuzados com olhos azuis reluzentes e braços cruzados
 * - Coroa imperial dourada cravejada com rubis e labaredas de fogo flamejante carmesim no topo
 * - Lanças douradas pontiagudas e raios elétricos de alta voltagem
 * - Aro circular dourado com runas antigas esculpidas em alto relevo
 * - Brasão heráldico curvado em fita negra na base com joia de rubi central e fumaça de fogo
 */
export const renderNinjaFlameFrameBackdrop = () => (
  <g id="frame_codigo_secreto_back">
    {/* Nicho de Fundo Escuro Meia-Noite */}
    <circle cx="32" cy="32" r="18.2" fill="#040204" />
    
    {/* Resplendor e Brilho das Chamas Carmesim */}
    <circle cx="32" cy="32" r="18.8" fill="none" stroke="#dc2626" strokeWidth="2.2" opacity="0.6" filter="url(#goldGlow)" />
    <circle cx="32" cy="32" r="18.4" fill="none" stroke="#f97316" strokeWidth="1.2" opacity="0.8" />
    
    {/* Halo de Fogo Superior */}
    <ellipse cx="32" cy="11" rx="14" ry="7" fill="#ef4444" opacity="0.25" filter="url(#subtleGlow)" />
    
    {/* Halo das Brasas Inferior */}
    <ellipse cx="32" cy="53" rx="16" ry="6" fill="#f97316" opacity="0.25" filter="url(#subtleGlow)" />
  </g>
);

export const renderNinjaFlameFrameForeground = () => (
  <g id="frame_codigo_secreto_front">
    {/* Imagem de Alta Resolução 1:1 Exata */}
    <image 
      href="/frame_ninjas_fogo.png" 
      x="-28.39" 
      y="-28.75" 
      width="121.02" 
      height="121.02" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* Anel Bevelado de Encaixe Dourado no Perímetro Interno do Avatar */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#eab308" strokeWidth="1.0" opacity="0.9" />
    <circle cx="32" cy="32" r="18.4" fill="none" stroke="#fef08a" strokeWidth="0.3" opacity="0.95" />

    {/* Glints nos Olhos Azuis dos Ninjas */}
    <g opacity="0.95">
      <circle cx="21.5" cy="27" r="0.65" fill="#38bdf8" filter="url(#cyanGlow)" />
      <circle cx="42.5" cy="27" r="0.65" fill="#38bdf8" filter="url(#cyanGlow)" />
    </g>
  </g>
);

export const renderMatrixFrameBackdrop = renderNinjaFlameFrameBackdrop;
export const renderMatrixFrameForeground = renderNinjaFlameFrameForeground;

/**
 * 8. MOLDURA AURA RADIANTE & TIARA CELESTIAL COM BORBOLETAS (Épico Secreto - Sentinela da Empatia)
 * Réplica idêntica e fiel 1:1 da imagem enviada pelo usuário:
 * - Coroa / tiara barroca em ouro e filigrana no topo com grande gema de opala cintilante e pingente
 * - Babados de renda bordada branca, laços de fita de cetim rosa/lavanda e guirlandas de pérolas
 * - Lua crescente perolada com estrelas e borboleta cristalina iluminada no quadrante superior direito
 * - Pluma iridescente de penas brancas radiantes aninhada entre flores de madrepérola no quadrante inferior direito
 * - Cartela real barroca na base segurando diamante cintilante com pingentes suspensos de lágrimas de cristal e pérolas
 * - Borboleta translúcida mágica adejava na borda interna com partículas prismáticas e centelhas estelares
 */
export const renderEmpathyFrameBackdrop = () => (
  <g id="frame_aura_empatia_secreta_back">
    {/* Nicho Noturno Mágico para o Avatar */}
    <circle cx="32" cy="32" r="18.2" fill="#070a1c" />
    
    {/* Resplendor e Brilho Etéreo Rosa, Ouro & Lavanda */}
    <circle cx="32" cy="32" r="19" fill="none" stroke="#f472b6" strokeWidth="1.8" opacity="0.65" filter="url(#subtleGlow)" />
    <circle cx="32" cy="32" r="18.4" fill="none" stroke="#fde047" strokeWidth="1" opacity="0.7" />
    
    {/* Halo Superior da Tiara e Gema de Opala */}
    <ellipse cx="32" cy="11" rx="15" ry="6" fill="#fbcfe8" opacity="0.3" filter="url(#subtleGlow)" />
    
    {/* Halo Inferior do Medalhão e Pingentes de Cristal */}
    <ellipse cx="32" cy="54" rx="16" ry="6" fill="#fef08a" opacity="0.25" filter="url(#subtleGlow)" />
  </g>
);

export const renderEmpathyFrameForeground = () => (
  <g id="frame_aura_empatia_secreta_front">
    {/* 1. Imagem de Alta Definição da Moldura Exata com Corte Preciso 1:1 */}
    <image 
      href="/frame_aura_tiara.png" 
      x="-6.83" 
      y="-6.83" 
      width="77.66" 
      height="77.66" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Anel Interno Fino de Encaixe Perolado e Ouro */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#fef08a" strokeWidth="0.7" opacity="0.85" />
    <circle cx="32" cy="32" r="18.5" fill="none" stroke="#f472b6" strokeWidth="0.35" opacity="0.9" />

    {/* 3. Centelhas e Estrelas Cintilantes de 4 Pontas (Fidelidade ao Design Original) */}
    <g opacity="0.95">
      {/* Estrela Cintilante no Canto Superior Esquerdo (próximo ao laço) */}
      <g transform="translate(18, 14)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.4" fill="#fbcfe8" />
      </g>
      
      {/* Estrela Cintilante próxima à Lua Crescente Superior Direita */}
      <g transform="translate(48, 14)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.4" fill="#fef08a" />
      </g>

      {/* Estrela Cintilante no Pingente Inferior Esquerdo */}
      <g transform="translate(14, 45)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#ffffff" />
      </g>

      {/* Estrela no Pêndulo e Pluma Inferior Direita */}
      <g transform="translate(45, 30)">
        <polygon points="0,-2.2 0.5,-0.5 2.2,0 0.5,0.5 0,2.2 -0.5,0.5 -2.2,0 -0.5,-0.5" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.45" fill="#e0e7ff" />
      </g>

      {/* Brilho reluzente no centro do Diamante e Opala da Tiara */}
      <circle cx="32" cy="11.5" r="0.75" fill="#ffffff" filter="url(#subtleGlow)" opacity="0.9" />
      <circle cx="32" cy="51" r="0.7" fill="#ffffff" filter="url(#subtleGlow)" opacity="0.9" />
    </g>
  </g>
);


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


/**
 * Renderizador da Camada Traseira (Backdrop, Silhuetas Externas, Asas, Chifres, Nicho de Fundo)
 */
export const renderFrameBackdrop = (frameId: string): React.ReactNode => {
  let normalizedId = frameId;
  if (frameId.startsWith('frame_custom_')) {
    normalizedId = 'frame_ouro_radiante';
  }

  switch (normalizedId) {
    // Moldura Imperial Guardiões Celestes (Enviada pelo usuário: Asas Celestes, Coroa Prateada, Anel Neon, Leões Rugindo)
    case 'frame_leao_dourado_supremo':
    case 'frame_guardioes_celeste':
    case 'frame_asas_leoes_celeste':
      return renderCelestialLionsFrameBackdrop();

    // Moldura Real Leão Dourado Antiga (No lugar da moldura cyberpunk)
    case 'frame_cyber_neon':
    case 'frame_leao_real':
    case 'frame_leao_dourado':
    case 'frame_leao_dourado_antigo':
      return renderGoldenLionFrameBackdrop();

    case 'frame_padrao_madeira':
      return renderWoodFrameBackdrop();
    case 'frame_bronze_aprendiz':
      return renderBronzeFrameBackdrop();
    case 'frame_prata_vigilante':
      return renderSilverFrameBackdrop();
    case 'frame_ouro_radiante':
      return renderGoldFrameBackdrop();
    case 'frame_esmeralda_natureza':
    case 'frame_naruto_sasuke':
    case 'frame_ninjas_fogo_trovao':
      return renderEmeraldFrameBackdrop();
    case 'frame_safira_oceano':
    case 'frame_goku_nuvem':
    case 'frame_goku_nimbus':
      return renderSapphireFrameBackdrop();
    case 'frame_ametista_mistica':
    case 'frame_dragao_gelo':
    case 'frame_dragao_glaciar':
      return renderAmethystFrameBackdrop();
    case 'frame_rubi_coragem':
    case 'frame_asas_ametista':
    case 'frame_ametista_ouro':
      return renderRubyFrameBackdrop();
    case 'frame_arco_iris_paz':
      return renderRainbowFrameBackdrop();
    case 'frame_guardiao_cosmico':
      return renderCosmicFrameBackdrop();
    case 'frame_codigo_secreto':
    case 'frame_ninjas_fogo':
    case 'frame_guardioes_fogo':
      return renderMatrixFrameBackdrop();
    case 'frame_aura_empatia_secreta':
    case 'frame_aura_radiante':
    case 'frame_aura_tiara':
    case 'frame_tiara_rococo':
      return renderEmpathyFrameBackdrop();
    default:
      return renderWoodFrameBackdrop();
  }
};

/**
 * Renderizador da Camada Frontal (Chassi Bevelado 3D, Bezel Interno, Cantoneiras, Brasões, Coroas e Gemas)
 */
export const renderFrameForeground = (frameId: string): React.ReactNode => {
  let normalizedId = frameId;
  if (frameId.startsWith('frame_custom_')) {
    normalizedId = 'frame_ouro_radiante';
  }

  switch (normalizedId) {
    // Moldura Imperial Guardiões Celestes (Enviada pelo usuário: Asas Celestes, Coroa Prateada, Anel Neon, Leões Rugindo)
    case 'frame_leao_dourado_supremo':
    case 'frame_guardioes_celeste':
    case 'frame_asas_leoes_celeste':
      return renderCelestialLionsFrameForeground();

    // Moldura Real Leão Dourado Antiga (No lugar da moldura cyberpunk)
    case 'frame_cyber_neon':
    case 'frame_leao_real':
    case 'frame_leao_dourado':
    case 'frame_leao_dourado_antigo':
      return renderGoldenLionFrameForeground();

    case 'frame_padrao_madeira':
      return renderWoodFrameForeground();
    case 'frame_bronze_aprendiz':
      return renderBronzeFrameForeground();
    case 'frame_prata_vigilante':
      return renderSilverFrameForeground();
    case 'frame_ouro_radiante':
      return renderGoldFrameForeground();
    case 'frame_esmeralda_natureza':
    case 'frame_naruto_sasuke':
    case 'frame_ninjas_fogo_trovao':
      return renderEmeraldFrameForeground();
    case 'frame_safira_oceano':
    case 'frame_goku_nuvem':
    case 'frame_goku_nimbus':
      return renderSapphireFrameForeground();
    case 'frame_ametista_mistica':
    case 'frame_dragao_gelo':
    case 'frame_dragao_glaciar':
      return renderAmethystFrameForeground();
    case 'frame_rubi_coragem':
    case 'frame_asas_ametista':
    case 'frame_ametista_ouro':
      return renderRubyFrameForeground();
    case 'frame_arco_iris_paz':
      return renderRainbowFrameForeground();
    case 'frame_guardiao_cosmico':
      return renderCosmicFrameForeground();
    case 'frame_codigo_secreto':
    case 'frame_ninjas_fogo':
    case 'frame_guardioes_fogo':
      return renderMatrixFrameForeground();
    case 'frame_aura_empatia_secreta':
    case 'frame_aura_radiante':
    case 'frame_aura_tiara':
    case 'frame_tiara_rococo':
      return renderEmpathyFrameForeground();
    default:
      return renderWoodFrameForeground();
  }
};
