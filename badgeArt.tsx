import React from 'react';
import { AchievementTier } from './types';


/**
 * Shared SVG Shader Definitions:
 * Provides rich multi-stop gradients, volumetric lighting, specular shines,
 * ambient shadows, and material textures (Gold, Silver, Bronze, Astral, Crystals, Elements).
 */
export const BadgeDefs: React.FC = () => {
  return (
    <defs>
      {/* 1. CLIP PATHS */}
      <clipPath id="badgeInnerClip">
        <rect x="7" y="7" width="50" height="50" rx="6" />
      </clipPath>
      
      <clipPath id="badgeStrictClip">
        <rect x="8" y="8" width="48" height="48" rx="5" />
      </clipPath>

      {/* 2. GLOW & SHADOW FILTERS */}
      <filter id="badgeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      <filter id="badgeSoftShadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.7" />
      </filter>

      <filter id="badgeIntenseGlow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="3.5" result="blur1" />
        <feGaussianBlur stdDeviation="1.5" result="blur2" />
        <feMerge>
          <feMergeNode in="blur1" />
          <feMergeNode in="blur2" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* 3. MATERIAL GRADIENTS */}
      {/* Bronze & Copper */}
      <linearGradient id="bronzeMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="30%" stopColor="#92400e" />
        <stop offset="70%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>

      <linearGradient id="bronzeBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="40%" stopColor="#b45309" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>

      <radialGradient id="bronzeBackdrop" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#3d1e08" />
        <stop offset="60%" stopColor="#1c0e04" />
        <stop offset="100%" stopColor="#0c0502" />
      </radialGradient>

      {/* Silver & Mithril */}
      <linearGradient id="silverMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="25%" stopColor="#cbd5e1" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="75%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#334155" />
      </linearGradient>

      <linearGradient id="silverBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>

      <radialGradient id="silverBackdrop" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="60%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#020617" />
      </radialGradient>

      {/* Gold & Imperial Luster */}
      <linearGradient id="goldMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="30%" stopColor="#facc15" />
        <stop offset="60%" stopColor="#ca8a04" />
        <stop offset="85%" stopColor="#854d0e" />
        <stop offset="100%" stopColor="#422006" />
      </linearGradient>

      <linearGradient id="goldBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fef9c3" />
        <stop offset="40%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#713f12" />
      </linearGradient>

      <radialGradient id="goldBackdrop" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#3d2806" />
        <stop offset="60%" stopColor="#1a1102" />
        <stop offset="100%" stopColor="#080501" />
      </radialGradient>

      {/* Legendary Astral / Nebula */}
      <linearGradient id="legendaryMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fdf4ff" />
        <stop offset="25%" stopColor="#f0abfc" />
        <stop offset="50%" stopColor="#c026d3" />
        <stop offset="75%" stopColor="#7e22ce" />
        <stop offset="100%" stopColor="#3b0764" />
      </linearGradient>

      <linearGradient id="legendaryBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fae8ff" />
        <stop offset="40%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#4c1d95" />
      </linearGradient>

      <radialGradient id="legendaryBackdrop" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#4c1d95" />
        <stop offset="40%" stopColor="#2e1065" />
        <stop offset="80%" stopColor="#140628" />
        <stop offset="100%" stopColor="#05010a" />
      </radialGradient>

      {/* 4. GEMSTONES & ELEMENTALS */}
      {/* Ruby */}
      <radialGradient id="rubyGemGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#fecdd3" />
        <stop offset="25%" stopColor="#f43f5e" />
        <stop offset="60%" stopColor="#be123c" />
        <stop offset="100%" stopColor="#4c0519" />
      </radialGradient>

      {/* Emerald */}
      <radialGradient id="emeraldGemGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#a7f3d0" />
        <stop offset="30%" stopColor="#10b981" />
        <stop offset="70%" stopColor="#047857" />
        <stop offset="100%" stopColor="#064e3b" />
      </radialGradient>

      {/* Sapphire */}
      <radialGradient id="sapphireGemGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#bae6fd" />
        <stop offset="30%" stopColor="#0284c7" />
        <stop offset="70%" stopColor="#0369a1" />
        <stop offset="100%" stopColor="#082f49" />
      </radialGradient>

      {/* Amethyst */}
      <radialGradient id="amethystGemGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#f5d0fe" />
        <stop offset="30%" stopColor="#c084fc" />
        <stop offset="70%" stopColor="#7e22ce" />
        <stop offset="100%" stopColor="#3b0764" />
      </radialGradient>

      {/* Solar Fire */}
      <linearGradient id="solarFireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="30%" stopColor="#f97316" />
        <stop offset="70%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>

      {/* Celestial Cyan */}
      <linearGradient id="celestialCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e0f2fe" />
        <stop offset="40%" stopColor="#38bdf8" />
        <stop offset="75%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0c4a6e" />
      </linearGradient>

      {/* Rainbow Spectrum */}
      <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="20%" stopColor="#fb923c" />
        <stop offset="40%" stopColor="#facc15" />
        <stop offset="60%" stopColor="#4ade80" />
        <stop offset="80%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#c084fc" />
      </linearGradient>

      {/* Dark Void / Mystery */}
      <radialGradient id="mysteryBackdrop" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stopColor="#2e1065" />
        <stop offset="50%" stopColor="#0f0728" />
        <stop offset="100%" stopColor="#020008" />
      </radialGradient>

      {/* Specular Highlight Streak */}
      <linearGradient id="specularGlint" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
};


/**
 * Handcrafted Vector Illustrations for Achievements 1 to 18
 * Rich organic shapes, lighting, materials, specular highlights and atmospheric depth.
 */
export const renderIllustrationPart1 = (id: string): React.ReactNode => {
  switch (id) {
    // 1. CONHECEDOR DOS DIREITOS (Livro da Lei & Balança Dourada)
    case 'conhecedor_direitos':
      return (
        <g id="ach-conhecedor-direitos">
          {/* Fundo de Biblioteca / Veludo Escuro */}
          <rect x="8" y="8" width="48" height="48" fill="#1c0f07" />
          <circle cx="32" cy="30" r="22" fill="#b45309" opacity="0.18" filter="url(#badgeGlow)" />
          
          {/* Pergaminho Aberto de Fundo */}
          <path d="M14 44 C18 42, 26 43, 32 46 C38 43, 46 42, 50 44 L49 20 C45 18, 38 19, 32 22 C26 19, 19 18, 15 20 Z" fill="#fef3c7" stroke="#78350f" strokeWidth="0.8" />
          <path d="M17 25 L28 24 M17 29 L27 28 M17 33 L29 32 M35 25 L46 26 M35 29 L45 30 M35 33 L46 34" stroke="#b45309" strokeWidth="0.7" strokeLinecap="round" opacity="0.6" />
          
          {/* Balança da Justiça em Ouro Polido */}
          <path d="M32 15 L32 43" stroke="url(#goldMetalGrad)" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="32" cy="14" r="2.5" fill="#fef08a" stroke="#854d0e" strokeWidth="0.8" />
          {/* Barra Horizontal com Pivô */}
          <path d="M19 21 C24 19, 40 19, 45 21" stroke="url(#goldMetalGrad)" strokeWidth="1.8" strokeLinecap="round" />
          {/* Prato Esquerdo */}
          <path d="M19 21 L16 31 M19 21 L22 31" stroke="#ca8a04" strokeWidth="0.7" />
          <path d="M15 31 Q19 35 23 31 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.6" />
          {/* Prato Direito */}
          <path d="M45 21 L42 31 M45 21 L48 31" stroke="#ca8a04" strokeWidth="0.7" />
          <path d="M41 31 Q45 35 49 31 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.6" />
          {/* Base e Selo de Cera Vermelho */}
          <path d="M26 44 Q32 41 38 44" stroke="url(#goldMetalGrad)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="46" r="3.5" fill="url(#rubyGemGrad)" stroke="#881337" strokeWidth="0.8" />
          {/* Brilho */}
          <circle cx="33" cy="13.5" r="0.8" fill="#ffffff" />
        </g>
      );

    // 2. ALIADO DA ESCOLA SEGURA (Escudo de Cobalto & Asas de Prata)
    case 'aliado_escola_segura':
      return (
        <g id="ach-aliado-escola-segura">
          <rect x="8" y="8" width="48" height="48" fill="#031024" />
          <circle cx="32" cy="32" r="20" fill="#0284c7" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Asas Protetoras de Prata em Segundo Plano */}
          <path d="M14 26 C12 20, 16 14, 26 20 C22 24, 20 28, 22 34 Z" fill="url(#silverMetalGrad)" opacity="0.8" />
          <path d="M50 26 C52 20, 48 14, 38 20 C42 24, 44 28, 42 34 Z" fill="url(#silverMetalGrad)" opacity="0.8" />

          {/* Corpo do Escudo de Cobalto Curvado */}
          <path d="M32 14 C42 14, 48 18, 47 30 C46 40, 37 48, 32 51 C27 48, 18 40, 17 30 C16 18, 22 14, 32 14 Z" 
                fill="url(#celestialCyanGrad)" stroke="#0c4a6e" strokeWidth="1.5" filter="url(#badgeSoftShadow)" />
          
          {/* Borda chanfrada de Prata */}
          <path d="M32 17 C39 17, 44 20, 43 30 C42 38, 35 44, 32 47 C29 44, 22 38, 21 30 C20 20, 25 17, 32 17 Z" 
                fill="#0369a1" stroke="url(#silverBevelGrad)" strokeWidth="1" />

          {/* Cruz de Luz Central com Safira */}
          <path d="M32 21 L32 41 M25 28 L39 28" stroke="#f0f9ff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="28" r="3.5" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
          
          {/* Rebites de Aço nos Cantos */}
          <circle cx="21" cy="20" r="1" fill="#e2e8f0" />
          <circle cx="43" cy="20" r="1" fill="#e2e8f0" />
          <circle cx="32" cy="46" r="1" fill="#e2e8f0" />
          {/* Brilho da Joia */}
          <circle cx="31" cy="27" r="1" fill="#ffffff" />
        </g>
      );

    // 3. ESPECIALISTA EM RESPEITO (Mente Cósmica & Sinapses Douradas)
    case 'especialista_em_respeito':
      return (
        <g id="ach-especialista-respeito">
          <rect x="8" y="8" width="48" height="48" fill="#170326" />
          <circle cx="32" cy="32" r="22" fill="#c026d3" opacity="0.25" filter="url(#badgeIntenseGlow)" />

          {/* Constelação de Fundo / Estrelas */}
          <circle cx="16" cy="18" r="0.8" fill="#fbcfe8" />
          <circle cx="48" cy="16" r="1" fill="#fbcfe8" />
          <circle cx="44" cy="46" r="0.8" fill="#fbcfe8" />
          <circle cx="18" cy="44" r="1" fill="#fbcfe8" />

          {/* Cérebro Holográfico / Cósmico em Camadas */}
          {/* Hemisfério Esquerdo */}
          <path d="M30 17 C22 16, 16 23, 17 31 C17 38, 23 44, 29 45 C30 42, 30 38, 29 34 C28 29, 29 23, 30 17 Z" 
                fill="url(#legendaryMetalGrad)" stroke="#e879f9" strokeWidth="1.2" />
          {/* Hemisfério Direito */}
          <path d="M34 17 C42 16, 48 23, 47 31 C47 38, 41 44, 35 45 C34 42, 34 38, 35 34 C36 29, 35 23, 34 17 Z" 
                fill="url(#legendaryMetalGrad)" stroke="#e879f9" strokeWidth="1.2" />

          {/* Circulação / Conexões Sinápticas em Ouro */}
          <path d="M22 26 Q27 24 30 30 T25 38" fill="none" stroke="url(#goldMetalGrad)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M42 26 Q37 24 34 30 T39 38" fill="none" stroke="url(#goldMetalGrad)" strokeWidth="1.2" strokeLinecap="round" />
          
          {/* Nódulos de Consciência Iluminados */}
          <circle cx="30" cy="30" r="2" fill="#fef08a" filter="url(#badgeGlow)" />
          <circle cx="34" cy="30" r="2" fill="#fef08a" filter="url(#badgeGlow)" />
          <circle cx="22" cy="26" r="1.5" fill="#fbcfe8" />
          <circle cx="42" cy="26" r="1.5" fill="#fbcfe8" />
          <circle cx="32" cy="21" r="2.5" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.6" />
        </g>
      );

    // 4. PRIMEIRO PASSO DA SABEDORIA (Broto da Árvore da Vida & Sol Nascente)
    case 'primeiro_passo_sabedoria':
      return (
        <g id="ach-primeiro-passo-sabedoria">
          {/* Céu de Aurora */}
          <rect x="8" y="8" width="48" height="48" fill="#1c1917" />
          {/* Sol Dourado com Raios */}
          <circle cx="32" cy="24" r="12" fill="url(#goldBevelGrad)" opacity="0.85" filter="url(#badgeGlow)" />
          <path d="M32 8 L32 12 M20 16 L23 19 M44 16 L41 19 M16 28 L20 27 M48 28 L44 27" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

          {/* Montanha e Solo Fértil */}
          <path d="M10 50 Q20 40 32 43 Q44 46 54 48 L54 56 L10 56 Z" fill="#291804" />
          <path d="M12 51 Q32 45 52 50" stroke="#78350f" strokeWidth="1" fill="none" />

          {/* Broto da Árvore da Vida com Folhas Reluzentes */}
          <path d="M32 46 C32 38, 30 32, 32 26" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
          {/* Folha Esquerda */}
          <path d="M31 32 C23 30, 21 24, 25 21 C29 24, 31 28, 31 32 Z" fill="url(#emeraldGemGrad)" stroke="#166534" strokeWidth="0.8" />
          {/* Folha Direita */}
          <path d="M33 29 C41 27, 43 21, 39 18 C35 21, 33 25, 33 29 Z" fill="url(#emeraldGemGrad)" stroke="#166534" strokeWidth="0.8" />
          {/* Folha Central Topo */}
          <path d="M32 26 C30 20, 32 16, 34 16 C36 18, 34 22, 32 26 Z" fill="#86efac" stroke="#15803d" strokeWidth="0.6" />
          
          {/* Gotícula de Orvalho Brilhante */}
          <circle cx="26" cy="22" r="1" fill="#ffffff" opacity="0.9" />
          <circle cx="38" cy="20" r="0.8" fill="#ffffff" opacity="0.9" />
        </g>
      );

    // 5. DETETIVE DO BULLYING (Lupa Arcanista de Latão & Tocha de Caverna)
    case 'detetive_bullying':
      return (
        <g id="ach-detetive-bullying">
          <rect x="8" y="8" width="48" height="48" fill="#0f172a" />
          
          {/* Fundo com Pegadas Misteriosas / Rastros */}
          <ellipse cx="26" cy="24" rx="3" ry="4" fill="#334155" opacity="0.4" />
          <circle cx="24" cy="18" r="1" fill="#334155" opacity="0.4" />
          <circle cx="27" cy="18" r="0.9" fill="#334155" opacity="0.4" />

          {/* Brilho da Tocha de Canto */}
          <circle cx="48" cy="16" r="10" fill="url(#solarFireGrad)" opacity="0.3" filter="url(#badgeGlow)" />
          <path d="M48 22 L45 28 L49 28 Z" fill="#78350f" />
          <path d="M48 20 Q52 14 47 11 Q44 15 48 20 Z" fill="#f97316" />
          
          {/* Lupa Vitoriana de Latão / Cristal */}
          {/* Cabo Ornamentado */}
          <path d="M35 35 L47 47" stroke="url(#goldMetalGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M35 35 L47 47" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="47" cy="47" r="2.5" fill="url(#rubyGemGrad)" />

          {/* Aro da Lente Dourado */}
          <circle cx="27" cy="27" r="14" fill="#0284c7" fillOpacity="0.25" stroke="url(#goldMetalGrad)" strokeWidth="2.8" />
          <circle cx="27" cy="27" r="12" fill="none" stroke="#bae6fd" strokeWidth="0.8" opacity="0.6" />
          
          {/* Olho Revelado dentro da Lente com Luster */}
          <path d="M20 27 Q27 20 34 27 Q27 34 20 27 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="27" cy="27" r="4.5" fill="url(#celestialCyanGrad)" />
          <circle cx="27" cy="27" r="2" fill="#020617" />
          <circle cx="28.5" cy="25.5" r="1" fill="#ffffff" />
          {/* Reflexo de Vidro Curvo */}
          <path d="M18 20 A 11 11 0 0 1 34 18" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
        </g>
      );

    // 6. RESPEITO EM AÇÃO (Coração de Cristal Lapidado Rosa & Ouro)
    case 'respeito_em_acao':
      return (
        <g id="ach-respeito-em-acao">
          <rect x="8" y="8" width="48" height="48" fill="#1f0714" />
          <circle cx="32" cy="32" r="20" fill="#f43f5e" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Filigranas Douradas Atrás do Coração */}
          <path d="M18 36 C14 30, 16 20, 26 22" fill="none" stroke="url(#goldMetalGrad)" strokeWidth="1.2" />
          <path d="M46 36 C50 30, 48 20, 38 22" fill="none" stroke="url(#goldMetalGrad)" strokeWidth="1.2" />

          {/* Coração de Cristal Lapidado em Facetas 3D */}
          <g filter="url(#badgeSoftShadow)">
            {/* Base do Coração */}
            <path d="M32 48 L16 28 C11 21, 20 14, 27 18 L32 23 L37 18 C44 14, 53 21, 48 28 Z" 
                  fill="url(#rubyGemGrad)" stroke="#881337" strokeWidth="1.2" />
            {/* Faceta Superior Esquerda */}
            <polygon points="27,18 32,23 23,26 16,28" fill="#fb7185" opacity="0.85" />
            {/* Faceta Superior Direita */}
            <polygon points="37,18 32,23 41,26 48,28" fill="#fda4af" opacity="0.7" />
            {/* Faceta Central Inferior */}
            <polygon points="32,23 23,26 32,48" fill="#e11d48" />
            <polygon points="32,23 41,26 32,48" fill="#be123c" />
            {/* Mesa Central Triangular */}
            <polygon points="32,23 28,29 36,29" fill="#ffe4e6" opacity="0.9" />
          </g>

          {/* Asas Douradas Inferiores Segurando */}
          <path d="M22 45 Q32 52 42 45" stroke="url(#goldMetalGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Brilho Estelar */}
          <path d="M24 20 L26 16 L28 20 L32 22 L28 24 L26 28 L24 24 L20 22 Z" fill="#ffffff" opacity="0.9" />
        </g>
      );

    // 7. GUARDIÃO DIGITAL (Olho Biomecânico Retinazer com Laser)
    case 'guardiao_digital':
      return (
        <g id="ach-guardiao-digital">
          <rect x="8" y="8" width="48" height="48" fill="#050814" />
          {/* Grade Cibernética Neon */}
          <line x1="8" y1="20" x2="56" y2="20" stroke="#0284c7" strokeWidth="0.4" opacity="0.3" />
          <line x1="8" y1="32" x2="56" y2="32" stroke="#0284c7" strokeWidth="0.4" opacity="0.3" />
          <line x1="8" y1="44" x2="56" y2="44" stroke="#0284c7" strokeWidth="0.4" opacity="0.3" />
          <line x1="20" y1="8" x2="20" y2="56" stroke="#0284c7" strokeWidth="0.4" opacity="0.3" />
          <line x1="32" y1="8" x2="32" y2="56" stroke="#0284c7" strokeWidth="0.4" opacity="0.3" />
          <line x1="44" y1="8" x2="44" y2="56" stroke="#0284c7" strokeWidth="0.4" opacity="0.3" />

          {/* Carcaça Mecânica de Titânio do Retinazer */}
          <circle cx="32" cy="32" r="18" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1.5" />
          {/* Placas Segmentadas */}
          <path d="M16 32 C16 23, 23 16, 32 16 L32 20 C25 20, 20 25, 20 32 Z" fill="#94a3b8" />
          <path d="M48 32 C48 41, 41 48, 32 48 L32 44 C39 44, 44 39, 44 32 Z" fill="#64748b" />
          
          {/* Rebites e Conectores */}
          <circle cx="20" cy="20" r="1" fill="#38bdf8" />
          <circle cx="44" cy="44" r="1" fill="#38bdf8" />
          <circle cx="44" cy="20" r="1" fill="#38bdf8" />
          <circle cx="20" cy="44" r="1" fill="#38bdf8" />

          {/* Núcleo Óptico Carmesim / Canhão Laser */}
          <circle cx="32" cy="32" r="10" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="7" fill="url(#rubyGemGrad)" filter="url(#badgeGlow)" />
          <circle cx="32" cy="32" r="3" fill="#ffffff" />
          
          {/* Feixe Laser Cruzando o Visor */}
          <line x1="12" y1="32" x2="52" y2="32" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 1.5" />
        </g>
      );

    // 8. MENTE TRANQUILA (Vela Eterna & Flor de Lótus Sagrada)
    case 'mente_tranquila':
      return (
        <g id="ach-mente-tranquila">
          {/* Lago Noturno */}
          <rect x="8" y="8" width="48" height="48" fill="#04121e" />
          <circle cx="32" cy="30" r="20" fill="#38bdf8" opacity="0.2" filter="url(#badgeGlow)" />
          
          {/* Ondas Serenas no Lago */}
          <path d="M12 48 Q22 46 32 48 Q42 50 52 48" stroke="#0284c7" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M16 52 Q26 50 36 52 Q46 54 50 52" stroke="#0369a1" strokeWidth="0.6" fill="none" opacity="0.4" />

          {/* Flor de Lótus de Pétalas Suaves */}
          {/* Pétalas Traseiras */}
          <path d="M22 44 C20 36, 26 32, 32 38 C38 32, 44 36, 42 44 Z" fill="#38bdf8" opacity="0.7" />
          {/* Pétalas Laterais */}
          <path d="M18 44 C14 40, 18 34, 25 38 Z" fill="#7dd3fc" />
          <path d="M46 44 C50 40, 46 34, 39 38 Z" fill="#7dd3fc" />
          {/* Pétalas Centrais */}
          <path d="M26 45 C24 38, 30 34, 32 36 C34 34, 40 38, 38 45 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="0.6" />

          {/* Castiçal / Vela da Paz com Chama Azul Eterna */}
          <rect x="30" y="27" width="4" height="10" rx="1" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />
          {/* Pavio e Chama */}
          <line x1="32" y1="27" x2="32" y2="25" stroke="#334155" strokeWidth="0.8" />
          <path d="M32 25 C30 20, 30 15, 32 12 C34 15, 34 20, 32 25 Z" fill="url(#celestialCyanGrad)" filter="url(#badgeGlow)" />
          <circle cx="32" cy="18" r="1.5" fill="#ffffff" />
          
          {/* Gotas de Luz Flutuando */}
          <circle cx="23" cy="20" r="0.8" fill="#bae6fd" opacity="0.8" />
          <circle cx="41" cy="22" r="0.8" fill="#bae6fd" opacity="0.8" />
        </g>
      );

    // 9. GABARITO DE MESTRE (Alvo Perfurado por Flecha Incandescente)
    case 'gabarito_de_mestre':
      return (
        <g id="ach-gabarito-mestre">
          <rect x="8" y="8" width="48" height="48" fill="#1c0a00" />
          
          {/* Alvo Redondo de Latão e Madeira Nobre */}
          <circle cx="30" cy="32" r="19" fill="#78350f" stroke="url(#goldMetalGrad)" strokeWidth="2" filter="url(#badgeSoftShadow)" />
          <circle cx="30" cy="32" r="15" fill="#fef3c7" stroke="#92400e" strokeWidth="1" />
          <circle cx="30" cy="32" r="10" fill="#dc2626" stroke="#7f1d1d" strokeWidth="0.8" />
          <circle cx="30" cy="32" r="5" fill="#fef3c7" stroke="#b45309" strokeWidth="0.8" />
          <circle cx="30" cy="32" r="2.5" fill="url(#rubyGemGrad)" />

          {/* Flecha Certeira Cravada no Centro com Faíscas */}
          {/* Haste de Madeira Reforçada */}
          <line x1="48" y1="14" x2="30" y2="32" stroke="#facc15" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="48" y1="14" x2="30" y2="32" stroke="#713f12" strokeWidth="0.8" strokeLinecap="round" />
          
          {/* Penas da Flecha em Ouro */}
          <path d="M48 14 L53 11 L50 16 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.6" />
          <path d="M48 14 L45 9 L49 13 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.6" />

          {/* Impacto de Fogo e Faíscas */}
          <circle cx="30" cy="32" r="6" fill="url(#solarFireGrad)" opacity="0.6" filter="url(#badgeGlow)" />
          <circle cx="24" cy="28" r="0.8" fill="#fef08a" />
          <circle cx="34" cy="38" r="0.9" fill="#fef08a" />
          <circle cx="25" cy="36" r="0.7" fill="#f97316" />
          <circle cx="36" cy="26" r="0.7" fill="#f97316" />
        </g>
      );

    // 10. EXPLORADOR DE ROTAS (Bússola Náutica Dourada & Rosa dos Ventos)
    case 'explorador_de_rotas':
      return (
        <g id="ach-explorador-rotas">
          <rect x="8" y="8" width="48" height="48" fill="#081426" />
          
          {/* Mapa Náutico de Fundo com Linhas de Rumo */}
          <circle cx="32" cy="32" r="22" stroke="#0284c7" strokeWidth="0.5" fill="none" opacity="0.3" />
          <line x1="12" y1="12" x2="52" y2="52" stroke="#0284c7" strokeWidth="0.4" opacity="0.3" />
          <line x1="12" y1="52" x2="52" y2="12" stroke="#0284c7" strokeWidth="0.4" opacity="0.3" />

          {/* Caixa da Bússola em Bronze/Ouro Antigo */}
          <circle cx="32" cy="32" r="18" fill="#0f172a" stroke="url(#goldMetalGrad)" strokeWidth="2.5" filter="url(#badgeSoftShadow)" />
          <circle cx="32" cy="32" r="15" fill="#fefce8" stroke="#ca8a04" strokeWidth="0.8" />
          
          {/* Marcadores dos Pontos Cardeais */}
          <text x="32" y="21" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#dc2626">N</text>
          <text x="32" y="46" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#1e293b">S</text>
          <text x="43" y="33.5" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#1e293b">L</text>
          <text x="21" y="33.5" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#1e293b">O</text>

          {/* Rosa dos Ventos Facetada */}
          <polygon points="32,32 32,23 35,32" fill="#ef4444" />
          <polygon points="32,32 32,23 29,32" fill="#b91c1c" />
          <polygon points="32,32 32,41 35,32" fill="#475569" />
          <polygon points="32,32 32,41 29,32" fill="#1e293b" />
          <polygon points="32,32 41,32 32,29" fill="#64748b" />
          <polygon points="32,32 41,32 32,35" fill="#334155" />
          <polygon points="32,32 23,32 32,29" fill="#94a3b8" />
          <polygon points="32,32 23,32 32,35" fill="#475569" />

          {/* Pivô Central com Safira */}
          <circle cx="32" cy="32" r="3" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
          {/* Vidro com Reflexo */}
          <path d="M22 20 A 14 14 0 0 1 42 20" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6" />
        </g>
      );

    // 11. MEDIADOR DA PAZ (Pomba da Paz & Ramo de Oliveira Dourado)
    case 'mediador_da_paz':
      return (
        <g id="ach-mediador-da-paz">
          <rect x="8" y="8" width="48" height="48" fill="#082f49" />
          {/* Aurora Boreal / Raios Divinos */}
          <circle cx="32" cy="20" r="22" fill="#38bdf8" opacity="0.3" filter="url(#badgeGlow)" />
          
          {/* Pomba da Paz em Voo Majestoso */}
          <g filter="url(#badgeSoftShadow)">
            {/* Asa Esquerda Superior */}
            <path d="M30 30 C24 20, 14 16, 12 22 C14 28, 22 30, 26 32 Z" fill="url(#silverMetalGrad)" stroke="#cbd5e1" strokeWidth="0.8" />
            <path d="M16 22 C18 25, 22 27, 26 28" stroke="#94a3b8" strokeWidth="0.6" />
            
            {/* Asa Direita Traseira */}
            <path d="M34 28 C38 18, 48 14, 49 19 C48 24, 42 27, 36 29 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />

            {/* Corpo e Cauda */}
            <path d="M26 32 C28 36, 32 44, 34 46 C35 44, 38 41, 37 36 C38 32, 34 29, 30 30 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
            {/* Cabeça e Bico */}
            <circle cx="28" cy="27" r="3.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.6" />
            <path d="M25 27 L22 28 L25 29 Z" fill="#f59e0b" />
            <circle cx="27" cy="26" r="0.7" fill="#0f172a" />
          </g>

          {/* Ramo de Oliveira com Folhas Esmeralda no Bico */}
          <path d="M22 28 Q18 34 16 38" stroke="#15803d" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <ellipse cx="18" cy="31" rx="2" ry="1" fill="url(#emeraldGemGrad)" transform="rotate(-30 18 31)" />
          <ellipse cx="20" cy="35" rx="2" ry="1" fill="url(#emeraldGemGrad)" transform="rotate(30 20 35)" />
          <ellipse cx="16" cy="38" rx="2" ry="1" fill="url(#emeraldGemGrad)" transform="rotate(-15 16 38)" />
          
          {/* Partículas de Luz */}
          <circle cx="38" cy="22" r="1" fill="#fef08a" />
          <circle cx="44" cy="34" r="0.8" fill="#fef08a" />
        </g>
      );

    // 12. ESCUDO INABALÁVEL (Grande Escudo Ankh de Ouro e Lapis Lazúli)
    case 'escudo_inabalavel':
      return (
        <g id="ach-escudo-inabalavel">
          <rect x="8" y="8" width="48" height="48" fill="#1a1102" />
          <circle cx="32" cy="32" r="22" fill="#ca8a04" opacity="0.3" filter="url(#badgeGlow)" />

          {/* Brasão Egípcio / Ankh Shield de Ouro Maciço */}
          <path d="M32 12 C44 12, 50 18, 48 34 C46 44, 38 52, 32 54 C26 52, 18 44, 16 34 C14 18, 20 12, 32 12 Z" 
                fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="1.8" filter="url(#badgeSoftShadow)" />
          
          {/* Borda Interna de Lápis-Lazúli */}
          <path d="M32 15 C41 15, 45 20, 44 33 C42 41, 36 47, 32 49 C28 47, 22 41, 20 33 C19 20, 23 15, 32 15 Z" 
                fill="#1e3a8a" stroke="#ca8a04" strokeWidth="1" />

          {/* Símbolo Sagrado da Cruz Ankh em Alto Relevo */}
          {/* Laço Superior da Cruz Ankh */}
          <circle cx="32" cy="25" r="5" fill="none" stroke="url(#goldBevelGrad)" strokeWidth="2.2" />
          <circle cx="32" cy="25" r="2.8" fill="url(#rubyGemGrad)" />
          
          {/* Braços Laterais e Haste */}
          <line x1="24" y1="31" x2="40" y2="31" stroke="url(#goldBevelGrad)" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="32" y1="31" x2="32" y2="44" stroke="url(#goldBevelGrad)" strokeWidth="2.4" strokeLinecap="round" />
          
          {/* Gemas de Esmeralda nos Quatro Cantos */}
          <circle cx="21" cy="20" r="1.5" fill="url(#emeraldGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
          <circle cx="43" cy="20" r="1.5" fill="url(#emeraldGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
          <circle cx="32" cy="48" r="1.5" fill="url(#emeraldGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
        </g>
      );

    // 13. MESTRE ZEN (Bonsai Sagrado em Pedras de Meditação)
    case 'mestre_zen':
      return (
        <g id="ach-mestre-zen">
          <rect x="8" y="8" width="48" height="48" fill="#0f172a" />
          
          {/* Solstício / Enso Lunar em Branco & Ouro */}
          <circle cx="32" cy="26" r="16" stroke="url(#goldMetalGrad)" strokeWidth="1.2" strokeDasharray="80 15" fill="none" opacity="0.7" />
          
          {/* Pedras Zen Empilhadas com Textura Lisa */}
          <ellipse cx="32" cy="51" rx="14" ry="4" fill="#334155" stroke="#1e293b" strokeWidth="0.8" />
          <ellipse cx="32" cy="47" rx="10" ry="3.2" fill="#475569" stroke="#1e293b" strokeWidth="0.8" />
          <ellipse cx="32" cy="43" rx="7" ry="2.5" fill="#64748b" stroke="#334155" strokeWidth="0.8" />

          {/* Tronco Retorcido do Bonsai */}
          <path d="M32 43 C30 38, 35 34, 31 28 C28 24, 25 22, 23 20" stroke="#78350f" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          <path d="M31 32 C35 30, 39 28, 41 24" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Copas de Folhas em Esmeralda Esculpida */}
          {/* Copa Esquerda */}
          <ellipse cx="22" cy="19" rx="6" ry="4" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="0.8" />
          <ellipse cx="21" cy="17.5" rx="3.5" ry="2" fill="#86efac" opacity="0.6" />
          {/* Copa Direita */}
          <ellipse cx="41" cy="23" rx="5" ry="3.5" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="0.8" />
          <ellipse cx="40" cy="21.5" rx="3" ry="1.8" fill="#86efac" opacity="0.6" />
          {/* Copa Central Topo */}
          <ellipse cx="30" cy="15" rx="7" ry="4.5" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="0.8" />
          <ellipse cx="29" cy="13.5" rx="4" ry="2.2" fill="#86efac" opacity="0.6" />

          {/* Fumaça de Incenso Sagrado Subindo */}
          <path d="M32 41 Q28 35 32 30 T28 22" stroke="#bae6fd" strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.6" />
        </g>
      );

    // 14. ORÁCULO DO SABER (Orbe de Cristal Ametista & Pedestal de Dragão)
    case 'oraculo_do_saber':
      return (
        <g id="ach-oraculo-saber">
          <rect x="8" y="8" width="48" height="48" fill="#0f051d" />
          <circle cx="32" cy="27" r="20" fill="#a855f7" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Pedestal de Garras Douradas */}
          <path d="M22 47 Q32 43 42 47 L44 54 L20 54 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="1" />
          {/* Garras Segurando a Orbe */}
          <path d="M22 47 Q24 38 27 34" stroke="url(#goldMetalGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M42 47 Q40 38 37 34" stroke="url(#goldMetalGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M32 45 L32 36" stroke="url(#goldMetalGrad)" strokeWidth="2" strokeLinecap="round" />

          {/* Orbe de Cristal Místico com Galáxia */}
          <circle cx="32" cy="26" r="13" fill="url(#amethystGemGrad)" stroke="#f0abfc" strokeWidth="1.2" filter="url(#badgeSoftShadow)" />
          
          {/* Espiral Galáctica no Interior da Orbe */}
          <path d="M26 28 C26 23, 35 21, 36 26 C36 30, 30 31, 30 27" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.8" />
          <circle cx="32" cy="26" r="1.5" fill="#ffffff" filter="url(#badgeGlow)" />
          
          {/* Anéis de Energia Orbitando */}
          <ellipse cx="32" cy="26" rx="16" ry="6" stroke="#e879f9" strokeWidth="0.8" fill="none" opacity="0.7" transform="rotate(-20 32 26)" />
          {/* Estrelas Cintilantes */}
          <circle cx="25" cy="22" r="0.8" fill="#ffffff" />
          <circle cx="38" cy="29" r="0.8" fill="#ffffff" />
        </g>
      );

    // 15. ESTRATEGISTA ESCOLAR (Rei do Xadrez de Mármore & Louros de Ouro)
    case 'estrategista_escolar':
      return (
        <g id="ach-estrategista-escolar">
          <rect x="8" y="8" width="48" height="48" fill="#0b1329" />
          
          {/* Tabuleiro Tático de Fundo em Perspectiva */}
          <polygon points="12,50 52,50 46,38 18,38" fill="#1e293b" stroke="#334155" strokeWidth="0.6" />
          <line x1="26" y1="38" x2="22" y2="50" stroke="#475569" strokeWidth="0.6" />
          <line x1="38" y1="38" x2="42" y2="50" stroke="#475569" strokeWidth="0.6" />

          {/* Louros de Ouro da Vitória */}
          <path d="M18 36 C16 28, 20 20, 26 16" stroke="url(#goldMetalGrad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M46 36 C48 28, 44 20, 38 16" stroke="url(#goldMetalGrad)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <circle cx="21" cy="26" r="1.5" fill="#fef08a" />
          <circle cx="43" cy="26" r="1.5" fill="#fef08a" />

          {/* Peça do Rei em Mármore Esculpido e Ouro */}
          {/* Base */}
          <path d="M24 48 Q32 45 40 48 L41 52 L23 52 Z" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1" />
          {/* Corpo */}
          <path d="M26 48 C28 38, 27 30, 30 25 L34 25 C37 30, 36 38, 38 48 Z" fill="url(#silverMetalGrad)" stroke="#334155" strokeWidth="1" />
          {/* Cabeça do Rei */}
          <circle cx="32" cy="22" r="5.5" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="0.8" />
          {/* Coroa Real de Ouro */}
          <path d="M28 20 L29 16 L32 18 L35 16 L36 20 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />
          {/* Cruz Real do Rei no Topo */}
          <line x1="32" y1="13" x2="32" y2="17" stroke="url(#goldBevelGrad)" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="30" y1="14.5" x2="34" y2="14.5" stroke="url(#goldBevelGrad)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="32" cy="14.5" r="0.8" fill="#ffffff" />
        </g>
      );

    // 16. FAROL DA EMPATIA (Fruta Dourada da Vida & Aura da Selva)
    case 'farol_da_empatia':
      return (
        <g id="ach-farol-empatia">
          <rect x="8" y="8" width="48" height="48" fill="#042010" />
          <circle cx="32" cy="32" r="22" fill="#eab308" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Folhas da Selva Exótica de Fundo */}
          <path d="M12 40 C14 26, 26 22, 32 30" stroke="#15803d" strokeWidth="1.8" fill="none" />
          <path d="M52 40 C50 26, 38 22, 32 30" stroke="#15803d" strokeWidth="1.8" fill="none" />

          {/* Fruta da Vida (Life Fruit) de Ouro Radiante em Formato de Coração */}
          <g filter="url(#badgeSoftShadow)">
            <path d="M32 46 L20 32 C15 24, 24 16, 32 22 C40 16, 49 24, 44 32 Z" 
                  fill="url(#goldMetalGrad)" stroke="#854d0e" strokeWidth="1.5" />
            {/* Gomos e Textura Dourada da Fruta */}
            <path d="M32 23 C28 28, 26 36, 32 45" stroke="#fef08a" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M26 28 Q32 32 38 28" stroke="#ca8a04" strokeWidth="1" fill="none" />
            <path d="M24 35 Q32 39 40 35" stroke="#ca8a04" strokeWidth="1" fill="none" />
          </g>

          {/* Coroa de Folhas de Esmeralda no Topo */}
          <path d="M32 21 C28 15, 22 15, 24 19 Z" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="0.6" />
          <path d="M32 21 C36 15, 42 15, 40 19 Z" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="0.6" />
          <path d="M32 21 L32 14" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />

          {/* Esporos de Vida Dourados Flutuantes */}
          <circle cx="20" cy="22" r="1.2" fill="#fef08a" filter="url(#badgeGlow)" />
          <circle cx="44" cy="24" r="1.2" fill="#fef08a" filter="url(#badgeGlow)" />
          <circle cx="32" cy="50" r="1" fill="#fef08a" filter="url(#badgeGlow)" />
        </g>
      );

    // 17. BASTIÃO DA SEGURANÇA (Fortaleza Medieval & Estandarte Real)
    case 'bastiao_da_seguranca':
      return (
        <g id="ach-bastiao-seguranca">
          <rect x="8" y="8" width="48" height="48" fill="#0a0e1a" />
          
          {/* Lua Cheia e Céu Noturno */}
          <circle cx="44" cy="18" r="7" fill="#f8fafc" opacity="0.85" filter="url(#badgeGlow)" />
          
          {/* Castelo / Bastião de Pedra com Ameias */}
          <g filter="url(#badgeSoftShadow)">
            {/* Torre Esquerda */}
            <path d="M14 50 L14 26 L17 26 L17 29 L20 29 L20 26 L23 26 L23 50 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            {/* Torre Direita */}
            <path d="M41 50 L41 26 L44 26 L44 29 L47 29 L47 26 L50 26 L50 50 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            {/* Muralha Central */}
            <path d="M23 50 L23 32 L26 32 L26 34 L29 34 L29 32 L35 32 L35 34 L38 34 L38 32 L41 32 L41 50 Z" fill="#475569" stroke="#1e293b" strokeWidth="1" />
            {/* Portão Levadiço de Ferro Forjado */}
            <path d="M28 50 L28 40 Q32 37 36 40 L36 50 Z" fill="#1e293b" stroke="url(#goldMetalGrad)" strokeWidth="1.2" />
            <line x1="30" y1="40" x2="30" y2="50" stroke="#ca8a04" strokeWidth="0.6" />
            <line x1="34" y1="40" x2="34" y2="50" stroke="#ca8a04" strokeWidth="0.6" />
          </g>

          {/* Estandarte Imperial Roxo com Brasão de Leão Dourado */}
          <path d="M30 20 L34 20 L34 32 L32 30 L30 32 Z" fill="#7e22ce" stroke="#fef08a" strokeWidth="0.6" />
          <circle cx="32" cy="24" r="1.2" fill="#fef08a" />

          {/* Janelas com Luz Quente */}
          <rect x="17" y="34" width="3" height="5" rx="1.5" fill="#fef08a" filter="url(#badgeGlow)" />
          <rect x="44" y="34" width="3" height="5" rx="1.5" fill="#fef08a" filter="url(#badgeGlow)" />
        </g>
      );

    // 18. MONGE DA HARMONIA (Flor de Mana Safira & Borboleta Ethereal)
    case 'monge_da_harmonia':
      return (
        <g id="ach-monge-harmonia">
          <rect x="8" y="8" width="48" height="48" fill="#040d1a" />
          <circle cx="32" cy="34" r="22" fill="#0284c7" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Flor de Mana com Pétalas Azuis Translúcidas */}
          <g filter="url(#badgeSoftShadow)">
            {/* Pétalas Traseiras */}
            <circle cx="24" cy="30" r="7" fill="url(#celestialCyanGrad)" opacity="0.8" />
            <circle cx="40" cy="30" r="7" fill="url(#celestialCyanGrad)" opacity="0.8" />
            <circle cx="32" cy="24" r="7" fill="url(#celestialCyanGrad)" opacity="0.8" />
            {/* Pétalas Frontais */}
            <circle cx="28" cy="38" r="7" fill="#38bdf8" />
            <circle cx="36" cy="38" r="7" fill="#38bdf8" />
            {/* Núcleo de Safira Brilhante */}
            <circle cx="32" cy="34" r="4.5" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="1" />
          </g>

          {/* Borboleta Etérea Pousando */}
          <g transform="translate(32, 16)">
            {/* Asa Esquerda */}
            <path d="M0 0 C-6 -8, -12 -2, -6 4 C-2 3, 0 1, 0 0 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.6" opacity="0.85" />
            {/* Asa Direita */}
            <path d="M0 0 C6 -8, 12 -2, 6 4 C2 3, 0 1, 0 0 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.6" opacity="0.85" />
            {/* Corpo */}
            <line x1="0" y1="-3" x2="0" y2="4" stroke="#0284c7" strokeWidth="1" />
          </g>

          {/* Partículas de Mana Flutuando */}
          <circle cx="20" cy="20" r="1" fill="#bae6fd" filter="url(#badgeGlow)" />
          <circle cx="44" cy="22" r="1" fill="#bae6fd" filter="url(#badgeGlow)" />
          <circle cx="32" cy="48" r="0.8" fill="#bae6fd" />
        </g>
      );

    default:
      return null;
  }
};


/**
 * Handcrafted Vector Illustrations for Achievements 19 to 36
 * Rich organic shapes, lighting, materials, specular highlights and atmospheric depth.
 */
export const renderIllustrationPart2 = (id: string): React.ReactNode => {
  switch (id) {
    // 19. DOUTOR DA ÉTICA (Pergaminho Imperial, Pena Dourada & Lacre Real)
    case 'doutor_da_etica':
      return (
        <g id="ach-doutor-etica">
          <rect x="8" y="8" width="48" height="48" fill="#1c0f08" />
          <circle cx="32" cy="30" r="22" fill="#ca8a04" opacity="0.2" filter="url(#badgeGlow)" />

          {/* Pergaminho Imperial Desdobrado */}
          <g filter="url(#badgeSoftShadow)">
            <path d="M16 46 C20 44, 28 45, 34 47 C40 45, 46 44, 48 46 L46 16 C42 14, 34 15, 28 13 C22 15, 16 14, 14 16 Z" 
                  fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
            <path d="M14 16 C12 18, 12 22, 14 24 L46 24 C48 22, 48 18, 46 16" fill="#fde68a" stroke="#78350f" strokeWidth="0.8" />
            <path d="M16 46 C14 48, 14 52, 16 54 L48 54 C50 52, 50 48, 48 46" fill="#fde68a" stroke="#78350f" strokeWidth="0.8" />
          </g>

          {/* Caligrafia Arcana Dourada no Pergaminho */}
          <line x1="18" y1="28" x2="34" y2="28" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="18" y1="32" x2="32" y2="32" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="18" y1="36" x2="35" y2="36" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="18" y1="40" x2="30" y2="40" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" />

          {/* Pena de Fênix Dourada Escrevendo */}
          <path d="M42 22 C44 14, 48 10, 52 8 C50 14, 44 24, 38 34 L36 33 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.7" />
          <line x1="36" y1="33" x2="35" y2="36" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
          
          {/* Selo de Cera Imperial Carmesim com Fitas de Ouro */}
          <path d="M30 46 L27 53 L31 51 L35 53 L32 46" fill="url(#goldMetalGrad)" />
          <circle cx="31" cy="46" r="4.5" fill="url(#rubyGemGrad)" stroke="#881337" strokeWidth="1" filter="url(#badgeSoftShadow)" />
          <circle cx="31" cy="46" r="2.5" fill="none" stroke="#fef08a" strokeWidth="0.8" />
        </g>
      );

    // 20. GUARDIÃO SUPREMO (Lâmina da Terra / Terra Blade de Esmeralda)
    case 'guardiao_supremo':
      return (
        <g id="ach-guardiao-supremo">
          <rect x="8" y="8" width="48" height="48" fill="#031f14" />
          <circle cx="32" cy="32" r="22" fill="#10b981" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Chamas de Energia Verde-Éter Orbitando a Lâmina */}
          <path d="M14 36 Q18 20 32 14 Q46 20 50 36" stroke="url(#emeraldGemGrad)" strokeWidth="2.5" fill="none" opacity="0.6" filter="url(#badgeGlow)" />
          
          {/* Lâmina da Terra (Terra Blade) em Diagonal Heroica */}
          {/* Guarda e Empunhadura de Ouro */}
          <line x1="16" y1="48" x2="22" y2="42" stroke="url(#goldMetalGrad)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="15" cy="49" r="2" fill="url(#rubyGemGrad)" stroke="#713f12" strokeWidth="0.6" />
          {/* Asas da Guarda em Ouro */}
          <path d="M18 40 L26 48 L28 44 L22 38 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />

          {/* Corpo da Lâmina de Cristal de Esmeralda com Chanfro Duplo */}
          <path d="M22 38 L44 16 C46 14, 50 14, 52 16 C50 20, 42 30, 26 44 Z" 
                fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="1.2" filter="url(#badgeSoftShadow)" />
          {/* Fio de Corte Luminescente */}
          <path d="M22 38 L48 12 L52 16" stroke="#a7f3d0" strokeWidth="1" fill="none" />
          {/* Ranhura de Energia Central */}
          <line x1="26" y1="36" x2="44" y2="18" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

          {/* Faíscas e Fragmentos de Energia Verde */}
          <circle cx="48" cy="12" r="1.2" fill="#ffffff" filter="url(#badgeGlow)" />
          <circle cx="38" cy="12" r="0.8" fill="#86efac" />
          <circle cx="52" cy="24" r="0.8" fill="#86efac" />
        </g>
      );

    // 21. COLECIONADOR SUPREMO (Baú do Tesouro Real Transbordando Joias)
    case 'colecionador_supremo':
      return (
        <g id="ach-colecionador-supremo">
          <rect x="8" y="8" width="48" height="48" fill="#180b02" />
          <circle cx="32" cy="30" r="22" fill="#ca8a04" opacity="0.3" filter="url(#badgeGlow)" />

          {/* Baú de Carvalho Escuro e Ouro Aberto */}
          {/* Base do Baú */}
          <path d="M14 36 L16 52 L48 52 L50 36 Z" fill="#78350f" stroke="url(#goldMetalGrad)" strokeWidth="1.5" />
          <line x1="20" y1="36" x2="21" y2="52" stroke="url(#goldMetalGrad)" strokeWidth="1.2" />
          <line x1="44" y1="36" x2="43" y2="52" stroke="url(#goldMetalGrad)" strokeWidth="1.2" />
          {/* Fechadura de Ouro */}
          <circle cx="32" cy="43" r="2.5" fill="url(#goldBevelGrad)" stroke="#713f12" strokeWidth="0.8" />
          <circle cx="32" cy="43" r="1" fill="#000000" />

          {/* Tampa do Baú Aberta Inclinada */}
          <path d="M12 36 C16 22, 48 22, 52 36 L48 33 C44 24, 20 24, 16 33 Z" fill="#92400e" stroke="url(#goldMetalGrad)" strokeWidth="1.5" />

          {/* Montanha de Moedas de Ouro e Joias Lapidadas */}
          {/* Moedas */}
          <ellipse cx="32" cy="35" rx="14" ry="4" fill="url(#goldMetalGrad)" />
          <circle cx="24" cy="34" r="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
          <circle cx="28" cy="33" r="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
          <circle cx="36" cy="34" r="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
          <circle cx="40" cy="33" r="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />

          {/* Gemas Lapidadas em Destaque */}
          {/* Grande Diamante */}
          <polygon points="32,23 28,27 32,32 36,27" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" filter="url(#badgeGlow)" />
          {/* Rubi */}
          <polygon points="23,28 20,31 23,34 26,31" fill="url(#rubyGemGrad)" stroke="#881337" strokeWidth="0.6" />
          {/* Esmeralda */}
          <polygon points="41,28 38,31 41,34 44,31" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="0.6" />

          {/* Brilhos Estelares */}
          <circle cx="32" cy="23" r="1" fill="#ffffff" />
          <circle cx="23" cy="28" r="0.7" fill="#ffffff" />
        </g>
      );

    // 22. EXPLORADOR DOS TIPOS (Roda Octogonal das 8 Gemas Elementais)
    case 'explorador_tipos':
      return (
        <g id="ach-explorador-tipos">
          <rect x="8" y="8" width="48" height="48" fill="#080c1c" />
          
          {/* Linhas Místicas de Conexão Rúnica */}
          <polygon points="32,15 44,20 49,32 44,44 32,49 20,44 15,32 20,20" 
                   fill="none" stroke="url(#goldMetalGrad)" strokeWidth="1.2" opacity="0.8" />
          <polygon points="32,18 42,28 32,46 22,28" fill="none" stroke="#38bdf8" strokeWidth="0.6" opacity="0.5" />

          {/* Núcleo Central de Prata e Ouro */}
          <circle cx="32" cy="32" r="7" fill="url(#silverMetalGrad)" stroke="url(#goldMetalGrad)" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="4.5" fill="url(#celestialCyanGrad)" />
          <circle cx="32" cy="32" r="2" fill="#ffffff" />

          {/* 8 Gemas Elementais Lapidadas em Órbita */}
          {/* Topo: Rubi de Fogo */}
          <circle cx="32" cy="15" r="2.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.6" />
          {/* Nordeste: Topázio Dourado */}
          <circle cx="44" cy="20" r="2.8" fill="url(#goldMetalGrad)" stroke="#ffffff" strokeWidth="0.6" />
          {/* Leste: Âmbar Solar */}
          <circle cx="49" cy="32" r="2.8" fill="url(#solarFireGrad)" stroke="#ffffff" strokeWidth="0.6" />
          {/* Sudeste: Esmeralda da Terra */}
          <circle cx="44" cy="44" r="2.8" fill="url(#emeraldGemGrad)" stroke="#fef08a" strokeWidth="0.6" />
          {/* Sul: Safira d'Água */}
          <circle cx="32" cy="49" r="2.8" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="0.6" />
          {/* Sudoeste: Ametista do Espírito */}
          <circle cx="20" cy="44" r="2.8" fill="url(#amethystGemGrad)" stroke="#fef08a" strokeWidth="0.6" />
          {/* Oeste: Diamante do Vento */}
          <circle cx="15" cy="32" r="2.8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.6" />
          {/* Noroeste: Jade da Harmonia */}
          <circle cx="20" cy="20" r="2.8" fill="#86efac" stroke="#15803d" strokeWidth="0.6" />
        </g>
      );

    // 23. MARATONA DE QUESTÕES (Botas Aladas de Hermes & Vento Veloz)
    case 'maratona_questoes':
      return (
        <g id="ach-maratona-questoes">
          <rect x="8" y="8" width="48" height="48" fill="#082032" />
          <circle cx="30" cy="32" r="22" fill="#38bdf8" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Rastros de Velocidade do Vento */}
          <path d="M12 24 Q24 20 40 26" stroke="#bae6fd" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M10 34 Q22 30 46 38" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M14 44 Q28 40 50 48" stroke="#bae6fd" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />

          {/* Bota de Hermes de Platina e Ouro */}
          <g filter="url(#badgeSoftShadow)">
            {/* Cano da Bota */}
            <path d="M28 20 L35 20 C36 28, 38 32, 44 38 L42 45 C34 46, 26 44, 25 36 L26 26 Z" 
                  fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1.2" />
            {/* Biqueira Curvada e Sola de Ouro */}
            <path d="M25 45 Q36 47 45 44 L46 41 C42 41, 38 38, 36 36 L30 36 C27 40, 25 43, 25 45 Z" 
                  fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />
            
            {/* Asas de Plumas de Prata no Tornozelo */}
            {/* Pena 1 Superior */}
            <path d="M26 24 C20 18, 12 20, 10 26 C16 26, 22 25, 26 24 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
            {/* Pena 2 Média */}
            <path d="M26 28 C18 24, 10 28, 9 34 C16 32, 22 30, 26 28 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
            {/* Pena 3 Inferior */}
            <path d="M26 32 C19 30, 12 36, 12 40 C18 37, 23 35, 26 32 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
          </g>

          {/* Faíscas de Velocidade e Estrelas */}
          <circle cx="46" cy="42" r="1.2" fill="#fef08a" filter="url(#badgeGlow)" />
          <circle cx="50" cy="36" r="0.8" fill="#fef08a" />
          <circle cx="42" cy="48" r="0.8" fill="#ffffff" />
        </g>
      );

    // 24. DESAFIO PERFEITO (Arco Élfico & Flecha de Fogo Solar)
    case 'desafio_perfeito':
      return (
        <g id="ach-desafio-perfeito">
          <rect x="8" y="8" width="48" height="48" fill="#1c0700" />
          <circle cx="32" cy="32" r="20" fill="#ea580c" opacity="0.3" filter="url(#badgeGlow)" />

          {/* Arco Élfico Recurvado de Madeira Nobre e Ouro */}
          <g filter="url(#badgeSoftShadow)">
            <path d="M16 16 C22 22, 22 42, 16 48 C20 44, 20 20, 16 16 Z" 
                  fill="url(#goldMetalGrad)" stroke="#78350f" strokeWidth="1.2" />
            <path d="M16 16 C26 24, 26 40, 16 48" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Extremidades Ornamentadas */}
            <circle cx="16" cy="16" r="2" fill="url(#rubyGemGrad)" />
            <circle cx="16" cy="48" r="2" fill="url(#rubyGemGrad)" />
          </g>

          {/* Corda de Luz do Arco Esticada */}
          <line x1="16" y1="16" x2="38" y2="32" stroke="#fef08a" strokeWidth="1" strokeDasharray="4 1" />
          <line x1="16" y1="48" x2="38" y2="32" stroke="#fef08a" strokeWidth="1" strokeDasharray="4 1" />

          {/* Flecha Solar Nocada com Ponta Incandescente */}
          <line x1="14" y1="32" x2="50" y2="32" stroke="url(#goldMetalGrad)" strokeWidth="2" strokeLinecap="round" />
          {/* Ponta de Flecha em Fogo Solar */}
          <polygon points="50,32 44,28 46,32 44,36" fill="url(#solarFireGrad)" stroke="#fef08a" strokeWidth="0.8" filter="url(#badgeGlow)" />
          
          {/* Penas da Flecha em Ruby */}
          <path d="M16 32 L12 28 L14 32 L12 36 Z" fill="url(#rubyGemGrad)" stroke="#713f12" strokeWidth="0.6" />

          {/* Faíscas Solares e Brilho */}
          <circle cx="50" cy="32" r="3" fill="#fef08a" opacity="0.8" filter="url(#badgeGlow)" />
          <circle cx="46" cy="26" r="0.8" fill="#f97316" />
          <circle cx="46" cy="38" r="0.8" fill="#f97316" />
        </g>
      );

    // 25. SENTINELA ZEN (Fogueira Aconchegante & Lanterna de Coração)
    case 'sentinela_zen':
      return (
        <g id="ach-sentinela-zen">
          {/* Noite Estrelada */}
          <rect x="8" y="8" width="48" height="48" fill="#080c1a" />
          <circle cx="18" cy="18" r="0.8" fill="#ffffff" />
          <circle cx="44" cy="16" r="0.8" fill="#ffffff" />
          <circle cx="36" cy="22" r="0.8" fill="#ffffff" />

          {/* Tronco de Madeira Cruzado e Chamas */}
          {/* Pedras ao Redor do Fogo */}
          <ellipse cx="32" cy="48" rx="14" ry="4" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
          
          {/* Troncos de Lenha */}
          <line x1="22" y1="48" x2="42" y2="44" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="44" x2="42" y2="48" stroke="#58240c" strokeWidth="3" strokeLinecap="round" />

          {/* Fogueira em Chamas Orgânicas Volumétricas */}
          <g filter="url(#badgeSoftShadow)">
            {/* Chama Externa Vermelha */}
            <path d="M32 30 C28 36, 22 42, 26 46 C32 48, 38 46, 38 42 C40 38, 36 34, 32 30 Z" fill="url(#solarFireGrad)" />
            {/* Chama Média Laranja */}
            <path d="M32 33 C29 38, 25 42, 28 45 C32 46, 36 45, 36 42 C37 39, 35 36, 32 33 Z" fill="#f97316" />
            {/* Chama Interna Amarela */}
            <path d="M32 37 C30 41, 28 43, 30 45 C32 46, 34 45, 34 43 C35 41, 34 39, 32 37 Z" fill="#fef08a" filter="url(#badgeGlow)" />
          </g>

          {/* Lanterna de Coração Pendurada */}
          <path d="M42 20 L42 30" stroke="#ca8a04" strokeWidth="0.8" />
          <path d="M42 30 L38 33 C36 31, 38 28, 41 29 L42 30 L43 29 C46 28, 48 31, 46 33 Z" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.6" filter="url(#badgeGlow)" />

          {/* Faíscas Flutuantes Subindo ao Céu */}
          <circle cx="28" cy="26" r="0.8" fill="#fef08a" />
          <circle cx="34" cy="22" r="0.8" fill="#f97316" />
          <circle cx="30" cy="18" r="0.6" fill="#fef08a" />
        </g>
      );

    // 26. MULTIVERSO DAS SIMULAÇÕES (Poção do Buraco de Minhoca / Wormhole)
    case 'multiverso_simulacoes':
      return (
        <g id="ach-multiverso-simulacoes">
          <rect x="8" y="8" width="48" height="48" fill="#080214" />
          <circle cx="32" cy="34" r="22" fill="#c026d3" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Frasco de Alquimia de Vidro / Potion Flutuando */}
          <g filter="url(#badgeSoftShadow)">
            {/* Rolha e Gargalo com Ouro */}
            <rect x="29" y="14" width="6" height="4" rx="1" fill="#78350f" stroke="#ca8a04" strokeWidth="0.8" />
            <path d="M28 18 L36 18 L35 24 L29 24 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
            <line x1="27" y1="20" x2="37" y2="20" stroke="url(#goldMetalGrad)" strokeWidth="1.2" strokeLinecap="round" />

            {/* Bulbo Esférico de Vidro Reforçado */}
            <circle cx="32" cy="36" r="14" fill="#1e1035" stroke="#f0abfc" strokeWidth="1.5" />
            
            {/* Líquido Cósmico com Espiral Dimensional (Wormhole) */}
            <circle cx="32" cy="36" r="12.5" fill="url(#legendaryBackdrop)" />
            <path d="M32 36 C32 30, 24 32, 26 36 C28 40, 38 40, 38 34 C38 28, 28 28, 28 36 C28 42, 36 42, 36 36" 
                  stroke="url(#celestialCyanGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" filter="url(#badgeGlow)" />
            <circle cx="32" cy="36" r="2" fill="#ffffff" filter="url(#badgeGlow)" />
          </g>

          {/* Reflexo no Vidro do Frasco */}
          <path d="M22 30 A 12 12 0 0 1 34 24" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
          {/* Bolhas Mágicas Subindo */}
          <circle cx="27" cy="40" r="1" fill="#e0f2fe" />
          <circle cx="37" cy="38" r="1.2" fill="#e0f2fe" />
          <circle cx="31" cy="44" r="0.8" fill="#e0f2fe" />
        </g>
      );

    // 27. VETERANO DE QUESTÕES (Bigorna Forjadora de Ferro & Martelo de Fogo)
    case 'veterano_questoes':
      return (
        <g id="ach-veterano-questoes">
          <rect x="8" y="8" width="48" height="48" fill="#140602" />
          <circle cx="32" cy="34" r="20" fill="#dc2626" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Bigorna de Ferro Lendária em Perspectiva */}
          <g filter="url(#badgeSoftShadow)">
            {/* Base da Bigorna */}
            <path d="M20 50 L44 50 L42 44 L22 44 Z" fill="#334155" stroke="#0f172a" strokeWidth="1" />
            <rect x="24" y="38" width="16" height="6" fill="#475569" stroke="#1e293b" strokeWidth="0.8" />
            {/* Corpo e Chifre da Bigorna */}
            <path d="M14 34 L18 38 L46 38 L50 34 L44 32 L16 32 Z" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1.2" />
          </g>

          {/* Lingote de Aço em Brasa Rubra sobre a Bigorna */}
          <rect x="25" y="30" width="14" height="4" rx="1" fill="url(#solarFireGrad)" stroke="#fef08a" strokeWidth="0.8" filter="url(#badgeGlow)" />

          {/* Martelo de Forja Descendo em Golpe Certeiro */}
          <g transform="rotate(-30 38 20)">
            <rect x="36" y="8" width="4" height="22" rx="1" fill="#78350f" stroke="#ca8a04" strokeWidth="0.8" />
            <rect x="33" y="10" width="10" height="7" rx="1.5" fill="url(#silverMetalGrad)" stroke="#0f172a" strokeWidth="1" />
            <rect x="33" y="11" width="10" height="2" fill="#fef08a" opacity="0.6" />
          </g>

          {/* Chuva de Faíscas Incandescentes */}
          <circle cx="32" cy="28" r="1.5" fill="#ffffff" filter="url(#badgeGlow)" />
          <circle cx="26" cy="24" r="0.9" fill="#fef08a" />
          <circle cx="38" cy="24" r="0.9" fill="#fef08a" />
          <circle cx="22" cy="28" r="0.8" fill="#f97316" />
          <circle cx="42" cy="28" r="0.8" fill="#f97316" />
        </g>
      );

    // 28. ORÁCULO DAS 5 ESTRELAS (Constelação das 5 Estrelas Cadentes)
    case 'oraculo_cinco_estrelas':
      return (
        <g id="ach-oraculo-cinco-estrelas">
          <rect x="8" y="8" width="48" height="48" fill="#04081c" />
          <circle cx="32" cy="32" r="22" fill="#38bdf8" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Caudas de Poeira Estelar das 5 Estrelas */}
          <path d="M14 46 L32 20" stroke="url(#goldMetalGrad)" strokeWidth="0.8" opacity="0.5" strokeDasharray="3 1" />
          <path d="M50 46 L32 20" stroke="url(#goldMetalGrad)" strokeWidth="0.8" opacity="0.5" strokeDasharray="3 1" />
          <path d="M12 28 L48 38" stroke="#38bdf8" strokeWidth="0.6" opacity="0.4" />

          {/* Pentagrama de Conexão Mística */}
          <polygon points="32,16 45,40 18,25 46,25 19,40" fill="none" stroke="#fef08a" strokeWidth="0.6" opacity="0.4" />

          {/* 5 Estrelas Douradas Facetadas com Brilho Diamante */}
          {/* Estrela 1 (Topo Central / Maior) */}
          <g transform="translate(32, 16)" filter="url(#badgeSoftShadow)">
            <path d="M0 -6 L2 -2 L6 0 L2 2 L0 6 L-2 2 L-6 0 L-2 -2 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Estrela 2 (Superior Esquerda) */}
          <g transform="translate(18, 25)" filter="url(#badgeSoftShadow)">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>

          {/* Estrela 3 (Superior Direita) */}
          <g transform="translate(46, 25)" filter="url(#badgeSoftShadow)">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>

          {/* Estrela 4 (Inferior Esquerda) */}
          <g transform="translate(22, 42)" filter="url(#badgeSoftShadow)">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>

          {/* Estrela 5 (Inferior Direita) */}
          <g transform="translate(42, 42)" filter="url(#badgeSoftShadow)">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>
        </g>
      );

    // 29. EXPLORADOR DA MATRIZ (Grimório com Cubo Holográfico 3D)
    case 'explorador_total_matriz':
      return (
        <g id="ach-explorador-matriz">
          <rect x="8" y="8" width="48" height="48" fill="#040b17" />
          <circle cx="32" cy="26" r="20" fill="#0284c7" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Grimório de Couro e Ouro Aberto na Base */}
          <path d="M14 46 C20 44, 28 45, 32 48 C36 45, 44 44, 50 46 L48 38 C44 36, 36 37, 32 40 C28 37, 20 36, 16 38 Z" 
                fill="#78350f" stroke="url(#goldMetalGrad)" strokeWidth="1" />
          <path d="M16 44 C22 42, 28 43, 32 46 C36 43, 42 42, 48 44 L47 39 C43 37, 36 38, 32 41 C28 38, 21 37, 17 39 Z" 
                fill="#fef3c7" />

          {/* Cubo Holográfico da Matriz Flutuando */}
          <g filter="url(#badgeSoftShadow)">
            {/* Face Superior do Cubo */}
            <polygon points="32,15 42,20 32,25 22,20" fill="#38bdf8" fillOpacity="0.4" stroke="#bae6fd" strokeWidth="1" />
            {/* Face Esquerda */}
            <polygon points="22,20 32,25 32,35 22,30" fill="#0284c7" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="1" />
            {/* Face Direita */}
            <polygon points="32,25 42,20 42,30 32,35" fill="#0369a1" fillOpacity="0.6" stroke="#38bdf8" strokeWidth="1" />
            {/* Núcleo Central de Luz */}
            <circle cx="32" cy="25" r="2.5" fill="#ffffff" filter="url(#badgeGlow)" />
          </g>

          {/* Feixes de Projeção da Matriz */}
          <line x1="22" y1="42" x2="22" y2="30" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="2 1" />
          <line x1="42" y1="42" x2="42" y2="30" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="2 1" />
          <line x1="32" y1="44" x2="32" y2="35" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="2 1" />
        </g>
      );

    // 30. COMBO INICIANTE (Bancada do Artífice com Frascos & Engrenagens)
    case 'combo_iniciante_sentinela':
      return (
        <g id="ach-combo-iniciante">
          <rect x="8" y="8" width="48" height="48" fill="#140f06" />
          <circle cx="32" cy="30" r="20" fill="#ca8a04" opacity="0.2" filter="url(#badgeGlow)" />

          {/* Bancada de Madeira Rústica */}
          <rect x="12" y="44" width="40" height="8" rx="1.5" fill="#78350f" stroke="#451a03" strokeWidth="1" />
          <line x1="12" y1="46" x2="52" y2="46" stroke="#92400e" strokeWidth="0.8" />

          {/* Engrenagem de Latão Dourado de Fundo */}
          <g transform="translate(32, 28)">
            <circle cx="0" cy="0" r="10" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="1" />
            <circle cx="0" cy="0" r="5" fill="#140f06" stroke="#ca8a04" strokeWidth="0.8" />
            {/* Dentes da Engrenagem */}
            <rect x="-2" y="-12" width="4" height="3" fill="#ca8a04" />
            <rect x="-2" y="9" width="4" height="3" fill="#ca8a04" />
            <rect x="-12" y="-2" width="3" height="4" fill="#ca8a04" />
            <rect x="9" y="-2" width="3" height="4" fill="#ca8a04" />
          </g>

          {/* Frasco Vermelho de Poção e Pergaminho com Pena */}
          {/* Frasco Esquerdo */}
          <path d="M20 44 L20 36 C20 34, 22 32, 22 30 L24 30 L24 44 Z" fill="url(#rubyGemGrad)" stroke="#881337" strokeWidth="0.8" />
          <circle cx="22" cy="38" r="3" fill="url(#rubyGemGrad)" />
          {/* Frasco Azul Direito */}
          <path d="M42 44 L42 34 C42 32, 44 30, 44 28 L46 28 L46 44 Z" fill="url(#sapphireGemGrad)" stroke="#082f49" strokeWidth="0.8" />
          
          {/* Faísca Mágica Central */}
          <circle cx="32" cy="28" r="1.5" fill="#ffffff" filter="url(#badgeGlow)" />
        </g>
      );

    // 31. EMPATIA INABALÁVEL (Anjo da Guarda de Mármore & Coração de Rubi)
    case 'empatia_inabalavel':
      return (
        <g id="ach-empatia-inabalavel">
          <rect x="8" y="8" width="48" height="48" fill="#18041c" />
          <circle cx="32" cy="28" r="22" fill="#f43f5e" opacity="0.3" filter="url(#badgeGlow)" />

          {/* Asas Majestosas de Anjo em Mármore Branco */}
          <g filter="url(#badgeSoftShadow)">
            {/* Asa Esquerda */}
            <path d="M30 32 C22 20, 12 16, 10 24 C12 34, 20 40, 28 42 Z" fill="url(#silverMetalGrad)" stroke="#e2e8f0" strokeWidth="0.8" />
            <path d="M14 24 C16 28, 22 32, 28 34" stroke="#94a3b8" strokeWidth="0.6" />
            {/* Asa Direita */}
            <path d="M34 32 C42 20, 52 16, 54 24 C52 34, 44 40, 36 42 Z" fill="url(#silverMetalGrad)" stroke="#e2e8f0" strokeWidth="0.8" />
            <path d="M50 24 C48 28, 42 32, 36 34" stroke="#94a3b8" strokeWidth="0.6" />
          </g>

          {/* Coração de Rubi Sagrado no Centro Acolhedor */}
          <path d="M32 44 L24 34 C20 28, 27 22, 32 27 C37 22, 44 28, 40 34 Z" 
                fill="url(#rubyGemGrad)" stroke="#ffe4e6" strokeWidth="1.2" filter="url(#badgeGlow)" />
          
          {/* Auréola de Ouro no Topo */}
          <ellipse cx="32" cy="17" rx="8" ry="2.5" fill="none" stroke="url(#goldBevelGrad)" strokeWidth="1.5" />
          <circle cx="32" cy="30" r="1.5" fill="#ffffff" />
        </g>
      );

    // 32. MENTE INABALÁVEL (Crânio de Obsidiana com Chamas Azuis Gélidas)
    case 'mente_inabalavel':
      return (
        <g id="ach-mente-inabalavel">
          <rect x="8" y="8" width="48" height="48" fill="#030814" />
          <circle cx="32" cy="32" r="22" fill="#0284c7" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Chamas de Fogo Frio / Gélido Atrás do Crânio */}
          <path d="M22 28 Q18 14 26 12 Q28 20 32 18 Q36 20 38 12 Q46 14 42 28 Z" fill="url(#celestialCyanGrad)" filter="url(#badgeGlow)" opacity="0.8" />

          {/* Crânio de Titânio e Obsidiana */}
          <g filter="url(#badgeSoftShadow)">
            {/* Caixa Craniana */}
            <path d="M20 28 C18 18, 46 18, 44 28 C44 36, 40 44, 32 44 C24 44, 20 36, 20 28 Z" 
                  fill="url(#silverMetalGrad)" stroke="#0f172a" strokeWidth="1.5" />
            {/* Faixa Blindada de Aço na Testa com Rebites */}
            <path d="M20 24 Q32 26 44 24 L44 27 Q32 29 20 27 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="0.8" />
            <circle cx="24" cy="25.5" r="0.8" fill="#38bdf8" />
            <circle cx="32" cy="27" r="0.8" fill="#38bdf8" />
            <circle cx="40" cy="25.5" r="0.8" fill="#38bdf8" />
            
            {/* Cavidades Oculares com Fogo Azul Efervescente */}
            <ellipse cx="26" cy="33" rx="3.5" ry="4" fill="#020617" />
            <circle cx="26" cy="33" r="2" fill="#38bdf8" filter="url(#badgeGlow)" />
            <circle cx="26" cy="33" r="0.8" fill="#ffffff" />

            <ellipse cx="38" cy="33" rx="3.5" ry="4" fill="#020617" />
            <circle cx="38" cy="33" r="2" fill="#38bdf8" filter="url(#badgeGlow)" />
            <circle cx="38" cy="33" r="0.8" fill="#ffffff" />

            {/* Dentes de Metal Blindado */}
            <rect x="28" y="41" width="8" height="4" rx="0.5" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />
            <line x1="30" y1="41" x2="30" y2="45" stroke="#0f172a" strokeWidth="0.6" />
            <line x1="32" y1="41" x2="32" y2="45" stroke="#0f172a" strokeWidth="0.6" />
            <line x1="34" y1="41" x2="34" y2="45" stroke="#0f172a" strokeWidth="0.6" />
          </g>
        </g>
      );

    // 33. ESCUDO DE OURO DA DECISÃO (Escudo Solar em Chamas Douradas)
    case 'escudo_de_ouro_decisao':
      return (
        <g id="ach-escudo-ouro-decisao">
          <rect x="8" y="8" width="48" height="48" fill="#1f1002" />
          <circle cx="32" cy="32" r="22" fill="#f59e0b" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Raios Solares Flamejantes ao Redor */}
          <path d="M32 10 L35 15 L32 13 L29 15 Z" fill="url(#solarFireGrad)" />
          <path d="M32 54 L35 49 L32 51 L29 49 Z" fill="url(#solarFireGrad)" />
          <path d="M10 32 L15 35 L13 32 L15 29 Z" fill="url(#solarFireGrad)" />
          <path d="M54 32 L49 35 L51 32 L49 29 Z" fill="url(#solarFireGrad)" />

          {/* Corpo do Escudo Solar Redondo de Ouro Puro */}
          <circle cx="32" cy="32" r="18" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="2" filter="url(#badgeSoftShadow)" />
          <circle cx="32" cy="32" r="14" fill="#78350f" stroke="url(#goldBevelGrad)" strokeWidth="1.2" />

          {/* Rosto / Brasão do Sol Sagrado em Alto Relevo */}
          <circle cx="32" cy="32" r="8" fill="url(#goldBevelGrad)" stroke="#713f12" strokeWidth="1" />
          {/* Olhos e Sorriso Sereno do Sol */}
          <path d="M28 30 Q30 28 32 30" stroke="#713f12" strokeWidth="1" fill="none" />
          <path d="M32 30 Q34 28 36 30" stroke="#713f12" strokeWidth="1" fill="none" />
          <path d="M29 34 Q32 37 35 34" stroke="#713f12" strokeWidth="1" fill="none" />

          {/* 4 Rubis Imperiais nos Eixos */}
          <circle cx="32" cy="18" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
          <circle cx="32" cy="46" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
          <circle cx="18" cy="32" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
          <circle cx="46" cy="32" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
        </g>
      );

    // 34. NÍVEL 5: GUARDIÃO (Insígnia Heráldica Nível 5 & Espadas Cruzadas)
    case 'nivel_cinco_guardiao':
      return (
        <g id="ach-nivel-cinco-guardiao">
          <rect x="8" y="8" width="48" height="48" fill="#041224" />
          <circle cx="32" cy="32" r="22" fill="#0284c7" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Espadas de Cavaleiro Cruzadas de Fundo */}
          <line x1="16" y1="16" x2="48" y2="48" stroke="url(#silverMetalGrad)" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="16" x2="16" y2="48" stroke="url(#silverMetalGrad)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2" fill="url(#goldMetalGrad)" />
          <circle cx="48" cy="16" r="2" fill="url(#goldMetalGrad)" />

          {/* Brasão Heráldico de Prata e Azul Cobalto */}
          <path d="M32 14 C44 14, 46 22, 45 34 C44 42, 37 48, 32 50 C27 48, 20 42, 19 34 C18 22, 20 14, 32 14 Z" 
                fill="#0f172a" stroke="url(#silverMetalGrad)" strokeWidth="2" filter="url(#badgeSoftShadow)" />
          <path d="M32 17 C41 17, 42 24, 41 33 C40 39, 35 44, 32 46 C29 44, 24 39, 23 33 C22 24, 23 17, 32 17 Z" 
                fill="#1e3a8a" stroke="#38bdf8" strokeWidth="0.8" />

          {/* Numeral Romano V (Nível 5) em Ouro Maciço */}
          <text x="32" y="36" fontSize="18" fontFamily="serif" fontWeight="900" textAnchor="middle" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" filter="url(#badgeGlow)">
            V
          </text>

          {/* Fita de Cavaleiro Inferior */}
          <path d="M20 48 L24 45 L32 47 L40 45 L44 48 L41 51 L32 49 L23 51 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.6" />
        </g>
      );

    // 35. CONHECEDOR TOTAL DE QUIZZES (Canhão Mecânico Megashark)
    case 'conhecedor_total_quizzes':
      return (
        <g id="ach-conhecedor-quizzes">
          <rect x="8" y="8" width="48" height="48" fill="#140608" />
          <circle cx="32" cy="32" r="22" fill="#ef4444" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Canhão Steampunk Megashark */}
          <g filter="url(#badgeSoftShadow)">
            {/* Corpo do Tubarão Mecânico */}
            <path d="M14 34 C18 24, 38 22, 50 30 C48 36, 42 42, 26 42 L16 38 Z" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1.2" />
            {/* Barbatana de Latão Dourado */}
            <path d="M28 24 L36 16 L38 24 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />
            {/* Mandíbula e Dentes de Tubarão Mecânico */}
            <polygon points="46,30 48,32 46,34 44,32" fill="#fef08a" />
            <polygon points="42,30 44,32 42,34 40,32" fill="#fef08a" />

            {/* Canos de Metralhadora Gatling na Boca */}
            <rect x="48" y="29" width="6" height="2" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.5" />
            <rect x="48" y="32" width="6" height="2" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.5" />

            {/* Olho Vermelho Laser Cibernético */}
            <circle cx="42" cy="27" r="2.5" fill="url(#rubyGemGrad)" stroke="#ffffff" strokeWidth="0.6" filter="url(#badgeGlow)" />
            
            {/* Manômetro de Pressão a Vapor */}
            <circle cx="26" cy="32" r="3" fill="#fefce8" stroke="url(#goldMetalGrad)" strokeWidth="0.8" />
            <line x1="26" y1="32" x2="27" y2="30" stroke="#dc2626" strokeWidth="0.7" />
          </g>

          {/* Faíscas de Disparo no Cano */}
          <circle cx="54" cy="31" r="2" fill="#fef08a" filter="url(#badgeGlow)" />
        </g>
      );

    // 36. ARQUITETO DO DESTINO (Mesa de Blueprint com Compasso e Esquadro)
    case 'arquiteto_do_destino':
      return (
        <g id="ach-arquiteto-destino">
          <rect x="8" y="8" width="48" height="48" fill="#021424" />
          
          {/* Blueprint com Linhas de Grade Técnicas */}
          <rect x="12" y="12" width="40" height="40" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
          <line x1="12" y1="22" x2="52" y2="22" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="12" y1="32" x2="52" y2="32" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="12" y1="42" x2="52" y2="42" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="22" y1="12" x2="22" y2="52" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="32" y1="12" x2="32" y2="52" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="42" y1="12" x2="42" y2="52" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />

          {/* Desenho Técnico da Geometria Sagrada */}
          <circle cx="32" cy="32" r="12" stroke="#fef08a" strokeWidth="0.8" fill="none" opacity="0.8" />
          <polygon points="32,20 42,37 22,37" stroke="#fef08a" strokeWidth="0.8" fill="none" opacity="0.8" />

          {/* Compasso Artístico de Latão Dourado */}
          <g filter="url(#badgeSoftShadow)">
            {/* Cabeça do Compasso */}
            <circle cx="32" cy="18" r="3" fill="url(#goldBevelGrad)" stroke="#713f12" strokeWidth="0.8" />
            <circle cx="32" cy="18" r="1.2" fill="#ffffff" />
            {/* Haste Esquerda */}
            <line x1="32" y1="18" x2="20" y2="42" stroke="url(#goldMetalGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="42" x2="19" y2="44" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
            {/* Haste Direita */}
            <line x1="32" y1="18" x2="44" y2="42" stroke="url(#goldMetalGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="44" y1="42" x2="45" y2="44" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
            {/* Arco Graduado */}
            <path d="M26 30 Q32 33 38 30" stroke="url(#goldMetalGrad)" strokeWidth="1.5" fill="none" />
          </g>

          {/* Ponto de Luz de Medição Precisa */}
          <circle cx="19" cy="44" r="1" fill="#ffffff" filter="url(#badgeGlow)" />
          <circle cx="45" cy="44" r="1" fill="#ffffff" filter="url(#badgeGlow)" />
        </g>
      );

    default:
      return null;
  }
};


/**
 * Handcrafted Vector Illustrations for Achievements 37 to 54 (Including All 8 Secret Badges)
 * Rich organic shapes, lighting, materials, specular highlights and atmospheric depth.
 */
export const renderIllustrationPart3 = (id: string): React.ReactNode => {
  switch (id) {
    // 37. EXPLORADOR DE SEGREDOS (Masmorra Oculta & Alavanca Dourada)
    case 'explorador_segredos_sim':
      return (
        <g id="ach-explorador-segredos">
          <rect x="8" y="8" width="48" height="48" fill="#08040a" />
          
          {/* Parede de Pedra Secreta Aberta em Perspectiva */}
          <path d="M12 12 L24 18 L24 46 L12 52 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          <path d="M52 12 L40 18 L40 46 L52 52 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          
          {/* Portal Secreto Revelando Luz Dourada */}
          <rect x="24" y="18" width="16" height="28" fill="url(#goldBackdrop)" stroke="url(#goldMetalGrad)" strokeWidth="1.2" />
          <circle cx="32" cy="32" r="10" fill="url(#goldBevelGrad)" opacity="0.4" filter="url(#badgeIntenseGlow)" />

          {/* Alavanca Rúnica de Ouro com Tocha de Fogo Mágico */}
          <g filter="url(#badgeSoftShadow)">
            <rect x="29" y="34" width="6" height="6" rx="1" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
            <circle cx="32" cy="37" r="1.5" fill="url(#rubyGemGrad)" />
            <line x1="32" y1="37" x2="26" y2="26" stroke="url(#goldMetalGrad)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="26" cy="26" r="2.5" fill="url(#goldBevelGrad)" stroke="#713f12" strokeWidth="0.6" />
          </g>

          {/* Tocha Rúnica na Parede Esquerda */}
          <path d="M16 26 Q14 20 18 16 Q20 22 16 26 Z" fill="url(#solarFireGrad)" filter="url(#badgeGlow)" />
          {/* Feixes de Luz Saindo da Passagem */}
          <line x1="26" y1="20" x2="38" y2="44" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
          <circle cx="32" cy="28" r="1.2" fill="#ffffff" filter="url(#badgeGlow)" />
        </g>
      );

    // 38. MISSÃO CUMPRIDA: MARATONISTA (Troféu Real de Ouro 24k com Louros)
    case 'missao_cumprida_maratonista':
      return (
        <g id="ach-missao-maratonista">
          <rect x="8" y="8" width="48" height="48" fill="#1c0f02" />
          <circle cx="32" cy="28" r="22" fill="#ca8a04" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Louros de Ouro da Vitória Gloriosa */}
          <path d="M16 36 C12 26, 16 16, 24 12" stroke="url(#goldMetalGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M48 36 C52 26, 48 16, 40 12" stroke="url(#goldMetalGrad)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <circle cx="18" cy="24" r="1.8" fill="#fef08a" />
          <circle cx="46" cy="24" r="1.8" fill="#fef08a" />

          {/* Troféu de Ouro Real em Taça */}
          <g filter="url(#badgeSoftShadow)">
            {/* Base de Mármore Negro e Placa de Ouro */}
            <path d="M22 48 L42 48 L44 54 L20 54 Z" fill="#0f172a" stroke="url(#goldMetalGrad)" strokeWidth="1" />
            <rect x="25" y="49" width="14" height="4" fill="url(#goldMetalGrad)" />
            {/* Haste do Troféu */}
            <path d="M28 44 C29 46, 35 46, 36 44 L34 38 L30 38 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />
            {/* Taça do Cálice Dourado */}
            <path d="M20 20 C20 32, 26 38, 32 38 C38 38, 44 32, 44 20 Z" 
                  fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="1.5" />
            {/* Alças Ornamentadas do Cálice */}
            <path d="M20 22 C14 22, 14 30, 22 32" stroke="url(#goldMetalGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M44 22 C50 22, 50 30, 42 32" stroke="url(#goldMetalGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Estrela de Diamante no Corpo do Cálice */}
            <polygon points="32,24 33.5,27.5 37,28 34,30.5 35,34 32,32 29,34 30,30.5 27,28 30.5,27.5" fill="#ffffff" filter="url(#badgeGlow)" />
          </g>

          {/* Brilho Estelar */}
          <circle cx="32" cy="18" r="1.5" fill="#ffffff" filter="url(#badgeGlow)" />
        </g>
      );

    // 39. HARMONIA PLENA (Borboleta Prismática do Arco-Íris)
    case 'harmonia_plena':
      return (
        <g id="ach-harmonia-plena">
          <rect x="8" y="8" width="48" height="48" fill="#0c0418" />
          <circle cx="32" cy="32" r="22" fill="#d946ef" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Borboleta Prismática com Asas de Arco-Íris (Empress Butterfly) */}
          <g filter="url(#badgeSoftShadow)">
            {/* Asas Superiores Esquerda e Direita */}
            <path d="M32 30 C24 16, 10 14, 12 28 C14 34, 26 34, 32 32 Z" fill="url(#rainbowGrad)" stroke="#ffffff" strokeWidth="0.8" />
            <path d="M32 30 C40 16, 54 14, 52 28 C50 34, 38 34, 32 32 Z" fill="url(#rainbowGrad)" stroke="#ffffff" strokeWidth="0.8" />
            
            {/* Asas Inferiores Esquerda e Direita com Caudas de Fada */}
            <path d="M32 32 C26 36, 14 42, 16 48 C20 50, 28 44, 32 38 Z" fill="url(#celestialCyanGrad)" stroke="#bae6fd" strokeWidth="0.8" />
            <path d="M32 32 C38 36, 50 42, 48 48 C44 50, 36 44, 32 38 Z" fill="url(#celestialCyanGrad)" stroke="#bae6fd" strokeWidth="0.8" />

            {/* Corpo Prismático Luminoso e Antenas */}
            <line x1="32" y1="22" x2="32" y2="40" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="22" r="2" fill="#ffffff" filter="url(#badgeGlow)" />
            {/* Antenas */}
            <path d="M32 20 Q28 14 26 12" stroke="#fbcfe8" strokeWidth="0.8" fill="none" />
            <path d="M32 20 Q36 14 38 12" stroke="#fbcfe8" strokeWidth="0.8" fill="none" />
            <circle cx="26" cy="12" r="0.8" fill="#fef08a" />
            <circle cx="38" cy="12" r="0.8" fill="#fef08a" />
          </g>

          {/* Poeira de Estrelas Colorida */}
          <circle cx="20" cy="20" r="1" fill="#fef08a" />
          <circle cx="44" cy="20" r="1" fill="#f43f5e" />
          <circle cx="20" cy="42" r="0.8" fill="#38bdf8" />
          <circle cx="44" cy="42" r="0.8" fill="#4ade80" />
        </g>
      );

    // 40. NÍVEL 10: COMANDANTE (Cabeça do Dragão de Poeira Estelar & X)
    case 'nivel_dez_comandante':
      return (
        <g id="ach-nivel-dez-comandante">
          <rect x="8" y="8" width="48" height="48" fill="#031129" />
          <circle cx="32" cy="32" r="22" fill="#38bdf8" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Dragão Celestial de Poeira Estelar (Stardust Dragon) */}
          <g filter="url(#badgeSoftShadow)">
            {/* Corpo Serpentino com Escamas Estelares */}
            <path d="M12 42 C16 26, 44 22, 50 36 C42 46, 26 48, 16 52 Z" fill="url(#celestialCyanGrad)" stroke="#38bdf8" strokeWidth="1.2" />
            
            {/* Cabeça do Dragão Oriental */}
            <path d="M34 22 C38 16, 46 16, 50 20 C46 26, 42 28, 34 26 Z" fill="url(#silverMetalGrad)" stroke="#bae6fd" strokeWidth="1" />
            {/* Chifres de Ouro Puro */}
            <path d="M40 18 Q46 10 52 8" stroke="url(#goldMetalGrad)" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M42 20 Q48 14 54 13" stroke="url(#goldMetalGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Olho Dourado Brilhante */}
            <circle cx="42" cy="22" r="1.8" fill="#fef08a" stroke="#713f12" strokeWidth="0.5" filter="url(#badgeGlow)" />
            {/* Bigodes Místicos Fluindo */}
            <path d="M46 24 Q48 34 54 36" stroke="#38bdf8" strokeWidth="0.8" fill="none" />
          </g>

          {/* Numeral Romano X (Nível 10) Central em Ouro Nobre */}
          <text x="26" y="42" fontSize="18" fontFamily="serif" fontWeight="900" textAnchor="middle" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" filter="url(#badgeGlow)">
            X
          </text>

          {/* Estrelas Cintilantes */}
          <circle cx="18" cy="20" r="1.2" fill="#ffffff" filter="url(#badgeGlow)" />
          <circle cx="28" cy="14" r="0.8" fill="#ffffff" />
        </g>
      );

    // 41. DIPLOMATA DA PAZ (Aperto de Mãos Dourado & Louros de Concórdia)
    case 'diplomata_da_paz':
      return (
        <g id="ach-diplomata-paz">
          <rect x="8" y="8" width="48" height="48" fill="#14081c" />
          <circle cx="32" cy="32" r="22" fill="#c084fc" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Coroa Circular de Ramos de Oliveira */}
          <circle cx="32" cy="32" r="19" stroke="url(#goldMetalGrad)" strokeWidth="1.5" fill="none" strokeDasharray="6 2" />
          
          {/* Aperto de Mãos Esculpido em Ouro Maciço e Mármore */}
          <g filter="url(#badgeSoftShadow)" transform="translate(32, 32)">
            {/* Punho Esquerdo */}
            <path d="M-18 6 L-10 2 L-6 4 L-12 10 Z" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="0.8" />
            {/* Punho Direito */}
            <path d="M18 -6 L10 -2 L6 -4 L12 -10 Z" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="0.8" />

            {/* Mão Esquerda Segurando */}
            <path d="M-10 2 C-6 0, -2 0, 2 4 C0 8, -6 8, -10 6 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />
            {/* Mão Direita Segurando Cruzada */}
            <path d="M10 -2 C6 0, 2 0, -2 -4 C0 -8, 6 -8, 10 -6 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />
            {/* Dedos Entrelaçados */}
            <line x1="-3" y1="-2" x2="3" y2="2" stroke="#713f12" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* Fita de Seda Real Vermelha com Laço */}
          <path d="M22 46 Q32 50 42 46 L44 51 L32 48 L20 51 Z" fill="url(#rubyGemGrad)" stroke="#881337" strokeWidth="0.6" />
          {/* Brilho da Aliança */}
          <circle cx="32" cy="32" r="2" fill="#ffffff" filter="url(#badgeGlow)" />
        </g>
      );

    // 42. GUARDIÃO BLINDADO (Armadura de Besouro / Beetle Shell de Titânio)
    case 'guardiao_blindado_escola':
      return (
        <g id="ach-guardiao-blindado">
          <rect x="8" y="8" width="48" height="48" fill="#041412" />
          <circle cx="32" cy="32" r="22" fill="#059669" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Carapaça de Besouro Quitinosa (Beetle Armor) */}
          <g filter="url(#badgeSoftShadow)">
            {/* Placas Superiores do Ombro com Espinhos de Ouro */}
            <path d="M14 24 L22 18 L26 26 L18 30 Z" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="1" />
            <path d="M50 24 L42 18 L38 26 L46 30 Z" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="1" />
            <polygon points="14,24 10,18 18,22" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.6" />
            <polygon points="50,24 54,18 46,22" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.6" />

            {/* Peitoral Central Segmentado de Quitina Reforçada */}
            <path d="M24 18 C28 16, 36 16, 40 18 L42 34 C36 44, 28 44, 22 34 Z" 
                  fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="1.5" />
            
            {/* Nervura Central e Núcleo de Esmeralda */}
            <line x1="32" y1="18" x2="32" y2="40" stroke="url(#goldMetalGrad)" strokeWidth="2" strokeLinecap="round" />
            <polygon points="32,24 36,28 32,32 28,28" fill="#a7f3d0" stroke="#047857" strokeWidth="0.8" filter="url(#badgeGlow)" />
            <circle cx="32" cy="28" r="1.5" fill="#ffffff" />
          </g>

          {/* Aura de Escudo Protetor em Hexágonos */}
          <polygon points="32,10 48,18 48,46 32,54 16,46 16,18" fill="none" stroke="#34d399" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.6" />
        </g>
      );

    // 43. GRANDE COLECIONADOR (Diamante de 100 Quilates em Vitrine Real)
    case 'grande_colecionador':
      return (
        <g id="ach-grande-colecionador">
          <rect x="8" y="8" width="48" height="48" fill="#040e1e" />
          <circle cx="32" cy="28" r="22" fill="#38bdf8" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Pedestal de Veludo Nobre e Ouro */}
          <path d="M20 46 L44 46 L48 54 L16 54 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="1" />
          <ellipse cx="32" cy="46" rx="12" ry="3" fill="#be123c" stroke="#881337" strokeWidth="0.8" />

          {/* Colossal Diamante Brilhante Lapidado com Refrações */}
          <g filter="url(#badgeSoftShadow)">
            {/* Mesa Superior do Diamante */}
            <polygon points="24,20 40,20 46,27 32,44 18,27" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.2" />
            {/* Facetas Superiores */}
            <polygon points="24,20 40,20 36,27 28,27" fill="#ffffff" opacity="0.9" />
            <polygon points="24,20 28,27 18,27" fill="#bae6fd" />
            <polygon points="40,20 36,27 46,27" fill="#93c5fd" />
            {/* Facetas Inferiores (Pavilhão) */}
            <polygon points="18,27 28,27 32,44" fill="#60a5fa" />
            <polygon points="28,27 36,27 32,44" fill="#38bdf8" />
            <polygon points="36,27 46,27 32,44" fill="#2563eb" />
          </g>

          {/* Feixes de Brilho Cegante / Reflexo em Cruz */}
          <line x1="32" y1="12" x2="32" y2="48" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
          <line x1="14" y1="27" x2="50" y2="27" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />
          <circle cx="32" cy="27" r="2" fill="#ffffff" filter="url(#badgeGlow)" />
        </g>
      );

    // 44. NÍVEL 15: LORDE (Manto Real Púrpura, Coroa de Ametista & XV)
    case 'nivel_quinze_lorde':
      return (
        <g id="ach-nivel-quinze-lorde">
          <rect x="8" y="8" width="48" height="48" fill="#180424" />
          <circle cx="32" cy="32" r="22" fill="#c026d3" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Manto de Veludo Real Púrpura */}
          <path d="M16 50 C12 36, 18 24, 32 20 C46 24, 52 36, 48 50 Z" fill="#581c87" stroke="url(#goldMetalGrad)" strokeWidth="1.5" />
          {/* Gola de Arminho Branco com Pontos Negros */}
          <path d="M22 28 C26 25, 38 25, 42 28 L40 34 C36 31, 28 31, 24 34 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
          <circle cx="28" cy="31" r="0.6" fill="#000000" />
          <circle cx="32" cy="30" r="0.6" fill="#000000" />
          <circle cx="36" cy="31" r="0.6" fill="#000000" />

          {/* Coroa Imperial com Pontas de Ouro e Ametistas */}
          <path d="M22 22 L24 14 L28 18 L32 12 L36 18 L40 14 L42 22 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="1" />
          <circle cx="32" cy="12" r="1.8" fill="url(#amethystGemGrad)" stroke="#ffffff" strokeWidth="0.5" />
          <circle cx="24" cy="14" r="1.2" fill="url(#amethystGemGrad)" />
          <circle cx="40" cy="14" r="1.2" fill="url(#amethystGemGrad)" />

          {/* Numeral Romano XV (Nível 15) em Ouro Imperial */}
          <text x="32" y="45" fontSize="15" fontFamily="serif" fontWeight="900" textAnchor="middle" fill="url(#goldBevelGrad)" stroke="#713f12" strokeWidth="0.8" filter="url(#badgeGlow)">
            XV
          </text>
        </g>
      );

    // 45. MESTRE ABSOLUTO: ZENITH (Espada Zenith Cósmica & Lâminas Orbitais)
    case 'mestre_absoluto_sentinela':
      return (
        <g id="ach-mestre-zenith">
          <rect x="8" y="8" width="48" height="48" fill="#070212" />
          <circle cx="32" cy="32" r="22" fill="#d946ef" opacity="0.35" filter="url(#badgeIntenseGlow)" />

          {/* Arco Órbita Prisma da Zenith com Rastro Colorido */}
          <ellipse cx="32" cy="32" rx="20" ry="12" stroke="url(#rainbowGrad)" strokeWidth="2" fill="none" opacity="0.8" transform="rotate(-30 32 32)" filter="url(#badgeGlow)" />

          {/* Lâminas Fantasmas Orbitando */}
          <polygon points="16,20 18,16 22,22 18,24" fill="#38bdf8" opacity="0.8" />
          <polygon points="46,40 48,36 52,42 48,44" fill="#f43f5e" opacity="0.8" />
          <polygon points="44,18 48,20 46,26 42,22" fill="#4ade80" opacity="0.8" />
          <polygon points="18,44 22,46 20,52 16,48" fill="#facc15" opacity="0.8" />

          {/* A Lâmina Zenith Central Suprema */}
          <g filter="url(#badgeSoftShadow)">
            {/* Guarda e Punho Cósmico */}
            <line x1="16" y1="48" x2="24" y2="40" stroke="url(#goldMetalGrad)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="15" cy="49" r="2.5" fill="url(#amethystGemGrad)" stroke="#f0abfc" strokeWidth="0.8" />
            {/* Lâmina Prisma da Zenith */}
            <path d="M24 40 L46 18 C48 16, 52 16, 54 18 C52 22, 44 32, 28 46 Z" fill="url(#rainbowGrad)" stroke="#ffffff" strokeWidth="1.5" />
            {/* Núcleo Estelar Luminescente */}
            <line x1="28" y1="36" x2="48" y2="18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Ponto Estelar Supremo na Ponta da Zenith */}
          <circle cx="50" cy="16" r="2.5" fill="#ffffff" filter="url(#badgeIntenseGlow)" />
        </g>
      );

    // 46. LENDA VIVA SENTINELA (Coroa Suprema dos Deuses & Chamas Eternas)
    case 'lenda_viva_sentinela':
      return (
        <g id="ach-lenda-viva">
          <rect x="8" y="8" width="48" height="48" fill="#0d031c" />
          <circle cx="32" cy="28" r="22" fill="#facc15" opacity="0.35" filter="url(#badgeIntenseGlow)" />

          {/* Chamas Sagradas Eternas de Fundo */}
          <path d="M14 36 Q18 16 32 10 Q46 16 50 36 Z" fill="url(#solarFireGrad)" opacity="0.7" filter="url(#badgeGlow)" />

          {/* A Coroa Suprema de 5 Pontas dos Deuses */}
          <g filter="url(#badgeSoftShadow)">
            {/* Base da Coroa com Joias */}
            <path d="M16 36 L48 36 L46 44 L18 44 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="1.2" />
            <circle cx="22" cy="40" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
            <circle cx="27" cy="40" r="1.8" fill="url(#emeraldGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
            <circle cx="32" cy="40" r="2.2" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="0.6" />
            <circle cx="37" cy="40" r="1.8" fill="url(#emeraldGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
            <circle cx="42" cy="40" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />

            {/* 5 Pontas Majestosas da Coroa */}
            <path d="M16 36 L18 24 L24 30 L32 16 L40 30 L46 24 L48 36 Z" 
                  fill="url(#goldBevelGrad)" stroke="#713f12" strokeWidth="1.2" />
            
            {/* Grande Joia Cósmica Flutuando no Ápice */}
            <polygon points="32,10 35,14 32,18 29,14" fill="#ffffff" stroke="#e879f9" strokeWidth="0.8" filter="url(#badgeIntenseGlow)" />
          </g>

          {/* Raios de Luz Divina Radiante */}
          <line x1="32" y1="6" x2="32" y2="10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="8" x2="26" y2="12" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
          <line x1="40" y1="8" x2="38" y2="12" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
        </g>
      );

    // ==========================================
    // 47 A 54: AS 8 CONQUISTAS SECRETAS ESPECIAIS
    // ==========================================

    // 47. SECRETA 1: DETETIVE SUPREMO (Chave Esquelética Antiga & Olho Roxo)
    case 'secret_detetive_sentinela':
      return (
        <g id="ach-secret-detetive">
          <rect x="8" y="8" width="48" height="48" fill="#080210" />
          <circle cx="32" cy="32" r="22" fill="#7e22ce" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Névoa Espectral Rúnea */}
          <path d="M14 44 Q24 38 32 46 Q40 38 50 44" stroke="#a855f7" strokeWidth="1.5" fill="none" opacity="0.6" filter="url(#badgeGlow)" />

          {/* Chave Esquelética Antiga de Obsidiana e Prata */}
          <g filter="url(#badgeSoftShadow)">
            {/* Arco da Chave em Formato de Crânio Guardião */}
            <circle cx="32" cy="20" r="9" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1.2" />
            {/* Cavidades e Olho Arcano Violeta */}
            <circle cx="32" cy="20" r="5" fill="#3b0764" stroke="#c084fc" strokeWidth="1" />
            <circle cx="32" cy="20" r="2.5" fill="#f0abfc" filter="url(#badgeGlow)" />
            <circle cx="32" cy="20" r="1" fill="#ffffff" />

            {/* Haste de Prata Escura e Dentes Rúnicos */}
            <rect x="30" y="29" width="4" height="22" rx="1" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1" />
            <rect x="34" y="42" width="6" height="3" rx="0.5" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="0.8" />
            <rect x="34" y="47" width="4" height="3" rx="0.5" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="0.8" />
          </g>

          {/* Brasas Púrpuras Flutuantes */}
          <circle cx="20" cy="28" r="1" fill="#e879f9" />
          <circle cx="44" cy="34" r="0.8" fill="#e879f9" />
        </g>
      );

    // 48. SECRETA 2: COMBO DO CONHECIMENTO (Selo Rúnico do Cultista & Raios Violeta)
    case 'secret_combo_conhecimento':
      return (
        <g id="ach-secret-cultista">
          <rect x="8" y="8" width="48" height="48" fill="#0a0114" />
          <circle cx="32" cy="32" r="22" fill="#9333ea" opacity="0.35" filter="url(#badgeIntenseGlow)" />

          {/* Círculo de Evocação Arcana do Cultista */}
          <circle cx="32" cy="32" r="20" stroke="#a855f7" strokeWidth="1.2" fill="none" strokeDasharray="10 3" />
          <circle cx="32" cy="32" r="16" stroke="#c084fc" strokeWidth="0.8" fill="none" />

          {/* Triângulo Místico do Selo */}
          <polygon points="32,15 47,41 17,41" fill="#2e1065" stroke="url(#goldMetalGrad)" strokeWidth="1.8" filter="url(#badgeSoftShadow)" />
          <polygon points="32,21 42,38 22,38" fill="#4c1d95" stroke="#f0abfc" strokeWidth="0.8" />

          {/* Olho Onisciente do Cultista no Centro */}
          <circle cx="32" cy="31" r="4.5" fill="#fef08a" stroke="#713f12" strokeWidth="0.8" filter="url(#badgeGlow)" />
          <ellipse cx="32" cy="31" rx="1.5" ry="3.5" fill="#000000" />
          <circle cx="33" cy="29.5" r="0.8" fill="#ffffff" />

          {/* Raios de Eletricidade Arcana Violeta */}
          <path d="M20 18 L24 24 L22 28 L28 32" stroke="#f0abfc" strokeWidth="1" fill="none" />
          <path d="M44 18 L40 24 L42 28 L36 32" stroke="#f0abfc" strokeWidth="1" fill="none" />
        </g>
      );

    // 49. SECRETA 3: MENTE ATENTA (Terceiro Olho Cósmico & Anéis Planetários)
    case 'secret_mente_atenta':
      return (
        <g id="ach-secret-mente-atenta">
          <rect x="8" y="8" width="48" height="48" fill="#02000a" />
          <circle cx="32" cy="32" r="22" fill="#7c3aed" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Anéis Planetários Dourados em Órbita */}
          <ellipse cx="32" cy="32" rx="22" ry="8" stroke="url(#goldMetalGrad)" strokeWidth="1.5" fill="none" transform="rotate(-25 32 32)" filter="url(#badgeGlow)" />
          
          {/* O Terceiro Olho Cósmico Desperto */}
          <g filter="url(#badgeSoftShadow)">
            {/* Contorno em Pétala de Lótus Cósmica */}
            <path d="M14 32 C22 20, 42 20, 50 32 C42 44, 22 44, 14 32 Z" 
                  fill="#1e1035" stroke="url(#goldMetalGrad)" strokeWidth="1.8" />
            {/* Íris Galáctica */}
            <circle cx="32" cy="32" r="8.5" fill="url(#legendaryBackdrop)" stroke="#c084fc" strokeWidth="1" />
            <circle cx="32" cy="32" r="5" fill="#38bdf8" filter="url(#badgeGlow)" />
            {/* Pupila de Fenda Cósmica */}
            <ellipse cx="32" cy="32" rx="1.8" ry="4.5" fill="#ffffff" />
          </g>

          {/* Estrelas Cintilantes no Espaço */}
          <circle cx="20" cy="18" r="1" fill="#ffffff" />
          <circle cx="44" cy="18" r="1" fill="#ffffff" />
          <circle cx="26" cy="46" r="0.8" fill="#fef08a" />
          <circle cx="42" cy="44" r="0.8" fill="#fef08a" />
        </g>
      );

    // 50. SECRETA 4: CÓDIGO SECRETO (Chave Criptografada & Cristal Matrix)
    case 'secret_codigo_secreto':
      return (
        <g id="ach-secret-codigo">
          <rect x="8" y="8" width="48" height="48" fill="#02120e" />
          <circle cx="32" cy="32" r="22" fill="#10b981" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Chuva de Códigos Matrix em Fundo */}
          <text x="14" y="16" fontSize="5" fontFamily="monospace" fill="#34d399" opacity="0.5">01</text>
          <text x="44" y="18" fontSize="5" fontFamily="monospace" fill="#34d399" opacity="0.5">10</text>
          <text x="12" y="48" fontSize="5" fontFamily="monospace" fill="#34d399" opacity="0.5">11</text>
          <text x="46" y="50" fontSize="5" fontFamily="monospace" fill="#34d399" opacity="0.5">00</text>

          {/* Cartão de Acesso / Chave Holográfica com Cristal */}
          <g filter="url(#badgeSoftShadow)">
            <rect x="18" y="18" width="28" height="28" rx="4" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
            <rect x="21" y="21" width="22" height="22" rx="2" fill="#022c22" stroke="#10b981" strokeWidth="0.8" />
            
            {/* Microchip Dourado no Centro */}
            <rect x="27" y="27" width="10" height="10" rx="1.5" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />
            <circle cx="32" cy="32" r="2.5" fill="url(#emeraldGemGrad)" filter="url(#badgeGlow)" />
            <circle cx="32" cy="32" r="1" fill="#ffffff" />
            
            {/* Trilhas de Circuito Eletrônico */}
            <line x1="24" y1="27" x2="27" y2="27" stroke="#34d399" strokeWidth="0.8" />
            <line x1="37" y1="27" x2="40" y2="27" stroke="#34d399" strokeWidth="0.8" />
            <line x1="24" y1="37" x2="27" y2="37" stroke="#34d399" strokeWidth="0.8" />
            <line x1="37" y1="37" x2="40" y2="37" stroke="#34d399" strokeWidth="0.8" />
          </g>

          {/* Brilho Holográfico */}
          <line x1="16" y1="24" x2="48" y2="24" stroke="#a7f3d0" strokeWidth="0.8" strokeDasharray="4 2" opacity="0.8" />
        </g>
      );

    // 51. SECRETA 5: SENTINELA DA EMPATIA (Coração do Oceano & Pérola Sagrada)
    case 'secret_sentinela_empatia':
      return (
        <g id="ach-secret-empatia-oceano">
          <rect x="8" y="8" width="48" height="48" fill="#02141f" />
          <circle cx="32" cy="32" r="22" fill="#06b6d4" opacity="0.35" filter="url(#badgeIntenseGlow)" />

          {/* Ondas do Oceano Profundo */}
          <path d="M12 44 Q22 36 32 44 Q42 52 52 44" stroke="#0284c7" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M10 50 Q22 42 34 50 Q46 58 54 50" stroke="#0369a1" strokeWidth="1" fill="none" opacity="0.4" />

          {/* Concha de Madrepérola Dourada */}
          <g filter="url(#badgeSoftShadow)">
            <path d="M18 42 C16 26, 48 26, 46 42 L42 46 C36 44, 28 44, 22 46 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="1.2" />
            
            {/* Pérola Sagrada do Coração do Oceano (Heart of the Sea) */}
            <circle cx="32" cy="30" r="11" fill="url(#sapphireGemGrad)" stroke="#a5f3fc" strokeWidth="1.5" />
            <circle cx="32" cy="30" r="7" fill="#38bdf8" filter="url(#badgeGlow)" />
            <circle cx="32" cy="30" r="3" fill="#ffffff" />
          </g>

          {/* Gotas de Água e Bolhas de Luz */}
          <circle cx="20" cy="22" r="1.2" fill="#cffafe" />
          <circle cx="44" cy="22" r="1.2" fill="#cffafe" />
          <circle cx="28" cy="16" r="0.8" fill="#ffffff" />
        </g>
      );

    // 52. SECRETA 6: PRECISÃO ABSOLUTA (Mira Laser Holográfica & Retículo Neon)
    case 'secret_precisao_absoluta':
      return (
        <g id="ach-secret-precisao">
          <rect x="8" y="8" width="48" height="48" fill="#0a0204" />
          <circle cx="32" cy="32" r="22" fill="#dc2626" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Retículo HUD de Alta Tecnologia Militar */}
          <circle cx="32" cy="32" r="20" stroke="#ef4444" strokeWidth="1.5" fill="none" strokeDasharray="14 4" filter="url(#badgeGlow)" />
          <circle cx="32" cy="32" r="14" stroke="#f87171" strokeWidth="0.8" fill="none" />
          <circle cx="32" cy="32" r="7" stroke="#fca5a5" strokeWidth="0.8" fill="none" />

          {/* Eixos da Cruz de Mira */}
          <line x1="8" y1="32" x2="22" y2="32" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="42" y1="32" x2="56" y2="32" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="32" y1="8" x2="32" y2="22" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="32" y1="42" x2="32" y2="56" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

          {/* Ponto Central Vermelho Laser Lock-On */}
          <circle cx="32" cy="32" r="2.5" fill="#ffffff" stroke="#dc2626" strokeWidth="1" filter="url(#badgeIntenseGlow)" />
          
          {/* Marcadores de Distância Holográficos */}
          <text x="44" y="24" fontSize="4.5" fontFamily="monospace" fill="#ef4444" fontWeight="bold">LOCK</text>
          <text x="14" y="42" fontSize="4" fontFamily="monospace" fill="#ef4444">100%</text>
        </g>
      );

    // 53. SECRETA 7: EXPLORADOR NOTURNO (Ilha Flutuante Celestial & Templo Lunar)
    case 'secret_explorador_noturno_areas':
      return (
        <g id="ach-secret-ilha-flutuante">
          {/* Céu Cósmico Noturno */}
          <rect x="8" y="8" width="48" height="48" fill="#04081c" />
          
          {/* Grande Lua Cheia Prateada */}
          <circle cx="32" cy="18" r="10" fill="#f8fafc" opacity="0.9" filter="url(#badgeGlow)" />
          
          {/* Templo Clássico na Ilha Flutuante */}
          {/* Colunas do Templo */}
          <line x1="26" y1="24" x2="26" y2="32" stroke="#e2e8f0" strokeWidth="1.2" />
          <line x1="32" y1="24" x2="32" y2="32" stroke="#e2e8f0" strokeWidth="1.2" />
          <line x1="38" y1="24" x2="38" y2="32" stroke="#e2e8f0" strokeWidth="1.2" />
          {/* Telhado Triangular do Templo */}
          <polygon points="32,20 42,24 22,24" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.6" />

          {/* Ilha Flutuante de Terra e Grama Mística */}
          <g filter="url(#badgeSoftShadow)">
            {/* Grama e Superfície */}
            <path d="M16 32 Q32 30 48 32 L46 36 Q32 38 18 36 Z" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="0.8" />
            {/* Raízes e Rocha Suspensa no Ar */}
            <polygon points="18,36 46,36 32,50" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            {/* Cachoeira Mística Caindo das Nuvens */}
            <path d="M30 34 L30 52 M34 34 L34 50" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />
          </g>

          {/* Nuvens Fofas Flutuando Embaixo */}
          <ellipse cx="22" cy="48" rx="8" ry="4" fill="#1e293b" opacity="0.7" />
          <ellipse cx="42" cy="48" rx="8" ry="4" fill="#1e293b" opacity="0.7" />
        </g>
      );

    // 54. SECRETA 8: LENDA OCULTA (Olho Supremo do Lorde Lunar Cósmico)
    case 'secret_lenda_oculta':
      return (
        <g id="ach-secret-lorde-lunar">
          <rect x="8" y="8" width="48" height="48" fill="#01060e" />
          <circle cx="32" cy="32" r="22" fill="#0284c7" opacity="0.4" filter="url(#badgeIntenseGlow)" />

          {/* Tentáculos de Energia Astral do Lorde Lunar */}
          <path d="M12 24 Q18 32 10 40" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" filter="url(#badgeGlow)" />
          <path d="M52 24 Q46 32 54 40" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" filter="url(#badgeGlow)" />
          <path d="M24 10 Q32 18 40 10" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.7" filter="url(#badgeGlow)" />

          {/* Olho Supremo Astral (True Eye of Cthulhu / Moon Lord Eye) */}
          <g filter="url(#badgeSoftShadow)">
            {/* Esclera Biomecânica Celeste */}
            <circle cx="32" cy="32" r="16" fill="url(#silverMetalGrad)" stroke="#0c4a6e" strokeWidth="1.8" />
            
            {/* Íris Turquesa Resplandecente */}
            <circle cx="32" cy="32" r="11" fill="url(#celestialCyanGrad)" stroke="#38bdf8" strokeWidth="1.2" />
            
            {/* Núcleo de Singularidade Cósmica */}
            <circle cx="32" cy="32" r="6" fill="#0369a1" filter="url(#badgeGlow)" />
            <circle cx="32" cy="32" r="3.5" fill="#ffffff" filter="url(#badgeIntenseGlow)" />
          </g>

          {/* Anéis de Energia Planetária Orbitando o Olho */}
          <ellipse cx="32" cy="32" rx="19" ry="7" stroke="#e0f2fe" strokeWidth="1" fill="none" transform="rotate(-35 32 32)" opacity="0.9" />
          
          {/* Centelhas de Poeira Estelar */}
          <circle cx="22" cy="20" r="1.2" fill="#ffffff" filter="url(#badgeGlow)" />
          <circle cx="42" cy="44" r="1.2" fill="#ffffff" filter="url(#badgeGlow)" />
        </g>
      );

    default:
      return null;
  }
};
