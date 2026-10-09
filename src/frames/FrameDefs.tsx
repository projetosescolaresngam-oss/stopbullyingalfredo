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
