import React from 'react';
import { AchievementTier } from './types';
import { BadgeDefs } from './badgeArt/badgeDefs';
import { renderIllustrationPart1 } from './badgeArt/badgeIllustrations1';
import { renderIllustrationPart2 } from './badgeArt/badgeIllustrations2';
import { renderIllustrationPart3 } from './badgeArt/badgeIllustrations3';

interface AchievementBadgeFrameProps {
  achievementId?: string;
  category?: string;
  tier?: AchievementTier;
  iconType?: string;
  funnySticker?: string;
  isUnlocked?: boolean;
  isSecret?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  showGlow?: boolean;
}

export const AchievementBadgeFrame: React.FC<AchievementBadgeFrameProps> = ({
  achievementId = 'primeiro_passo_sabedoria',
  category = 'sabedoria',
  tier = 'bronze',
  iconType = '',
  funnySticker,
  isUnlocked = false,
  isSecret = false,
  size = 'md',
  showGlow = true
}) => {
  const getPx = (): number => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm': return 48;
      case 'md': return 68;
      case 'lg': return 84;
      case 'xl': return 104;
      default: return 68;
    }
  };

  const px = getPx();

  // Render the artwork for the specific achievement ID
  const renderArtwork = () => {
    // If it's a secret achievement that is STILL LOCKED, render the mysterious Occult Void Monolith
    if (isSecret && !isUnlocked) {
      return (
        <g id="ach-secret-locked-monolith">
          {/* Fundo do Vazio Cósmico Misterioso */}
          <rect x="8" y="8" width="48" height="48" fill="url(#mysteryBackdrop)" />
          <circle cx="32" cy="32" r="22" fill="#581c87" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Monólito de Obsidiana Selado */}
          <rect x="18" y="16" width="28" height="32" rx="3" fill="#0f0728" stroke="#7e22ce" strokeWidth="1.2" filter="url(#badgeSoftShadow)" />

          {/* Correntes de Selamento de Aço Escuro Cruzadas */}
          <line x1="16" y1="18" x2="48" y2="46" stroke="#475569" strokeWidth="2" strokeDasharray="3 1.5" />
          <line x1="16" y1="46" x2="48" y2="18" stroke="#475569" strokeWidth="2" strokeDasharray="3 1.5" />

          {/* Grande Cadeado Rúnico com Olho Violeta das Sombras */}
          <circle cx="32" cy="32" r="10" fill="#1e1035" stroke="#a855f7" strokeWidth="1.5" filter="url(#badgeGlow)" />
          <circle cx="32" cy="32" r="6" fill="#3b0764" stroke="#e879f9" strokeWidth="0.8" />
          
          {/* Fenda do Olho das Sombras / Fechadura Proibida */}
          <polygon points="32,28 35,32 32,36 29,32" fill="#f0abfc" filter="url(#badgeGlow)" />
          <circle cx="32" cy="32" r="1" fill="#ffffff" />

          {/* Runas Arcanas Brilhantes */}
          <circle cx="23" cy="22" r="0.8" fill="#c084fc" />
          <circle cx="41" cy="22" r="0.8" fill="#c084fc" />
          <circle cx="23" cy="42" r="0.8" fill="#c084fc" />
          <circle cx="41" cy="42" r="0.8" fill="#c084fc" />
        </g>
      );
    }

    // Try Part 1 (1 to 18)
    const art1 = renderIllustrationPart1(achievementId);
    if (art1) return art1;

    // Try Part 2 (19 to 36)
    const art2 = renderIllustrationPart2(achievementId);
    if (art2) return art2;

    // Try Part 3 (37 to 54)
    const art3 = renderIllustrationPart3(achievementId);
    if (art3) return art3;

    // Fallback: Brasão do Sentinela com Escudo Dourado & Chama Cósmica
    return (
      <g id="ach-fallback">
        <rect x="8" y="8" width="48" height="48" fill="#0f172a" />
        <circle cx="32" cy="32" r="20" fill="#6366f1" opacity="0.3" filter="url(#badgeGlow)" />
        <path d="M32 14 C42 14, 46 18, 45 32 C44 42, 36 48, 32 50 C28 48, 20 42, 19 32 C18 18, 22 14, 32 14 Z" 
              fill="url(#goldMetalGrad)" stroke="#ca8a04" strokeWidth="1.5" />
        <circle cx="32" cy="30" r="6" fill="url(#rubyGemGrad)" />
        <circle cx="32" cy="30" r="2" fill="#ffffff" />
      </g>
    );
  };

  // Render tier-specific sculpted frame borders
  const renderFrameBorder = () => {
    switch (tier) {
      case 'lendario':
        return (
          <g id="frame-lendario" filter="url(#badgeSoftShadow)">
            {/* Moldura Mítica de Ametista e Ouro Astral */}
            <rect x="2" y="2" width="60" height="60" rx="9" fill="none" stroke="url(#legendaryMetalGrad)" strokeWidth="4.5" />
            <rect x="5.5" y="5.5" width="53" height="53" rx="7" fill="none" stroke="#2e1065" strokeWidth="1.5" />
            <rect x="7" y="7" width="50" height="50" rx="6" fill="none" stroke="url(#legendaryBevelGrad)" strokeWidth="1" />

            {/* Cantos Cósmicos com Joias de Ametista Estelar */}
            {/* Top-Left */}
            <circle cx="5" cy="5" r="3.5" fill="url(#amethystGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="5" cy="5" r="1.2" fill="#ffffff" />
            {/* Top-Right */}
            <circle cx="59" cy="5" r="3.5" fill="url(#amethystGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="59" cy="5" r="1.2" fill="#ffffff" />
            {/* Bottom-Left */}
            <circle cx="5" cy="59" r="3.5" fill="url(#amethystGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="5" cy="59" r="1.2" fill="#ffffff" />
            {/* Bottom-Right */}
            <circle cx="59" cy="59" r="3.5" fill="url(#amethystGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="59" cy="59" r="1.2" fill="#ffffff" />

            {/* Brasões Cardinais em Ouro */}
            <polygon points="32,2 34,5 32,7 30,5" fill="#fef08a" />
            <polygon points="32,62 34,59 32,57 30,59" fill="#fef08a" />
            <polygon points="2,32 5,34 7,32 5,30" fill="#fef08a" />
            <polygon points="62,32 59,34 57,32 59,30" fill="#fef08a" />
          </g>
        );

      case 'ouro':
        return (
          <g id="frame-ouro" filter="url(#badgeSoftShadow)">
            {/* Moldura Imperial Barroca de Ouro 24k */}
            <rect x="2" y="2" width="60" height="60" rx="9" fill="none" stroke="url(#goldMetalGrad)" strokeWidth="4.5" />
            <rect x="5.5" y="5.5" width="53" height="53" rx="7" fill="none" stroke="#451a03" strokeWidth="1.5" />
            <rect x="7" y="7" width="50" height="50" rx="6" fill="none" stroke="url(#goldBevelGrad)" strokeWidth="1" />

            {/* Cantos com Cabochões de Rubi Imperial */}
            {/* Top-Left */}
            <circle cx="5" cy="5" r="3.5" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.8" />
            <circle cx="5" cy="5" r="1" fill="#ffffff" />
            {/* Top-Right */}
            <circle cx="59" cy="5" r="3.5" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.8" />
            <circle cx="59" cy="5" r="1" fill="#ffffff" />
            {/* Bottom-Left */}
            <circle cx="5" cy="59" r="3.5" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.8" />
            <circle cx="5" cy="59" r="1" fill="#ffffff" />
            {/* Bottom-Right */}
            <circle cx="59" cy="59" r="3.5" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.8" />
            <circle cx="59" cy="59" r="1" fill="#ffffff" />

            {/* Rebites Dourados Centrais */}
            <circle cx="32" cy="4" r="1.5" fill="#fef08a" stroke="#713f12" strokeWidth="0.6" />
            <circle cx="32" cy="60" r="1.5" fill="#fef08a" stroke="#713f12" strokeWidth="0.6" />
            <circle cx="4" cy="32" r="1.5" fill="#fef08a" stroke="#713f12" strokeWidth="0.6" />
            <circle cx="60" cy="32" r="1.5" fill="#fef08a" stroke="#713f12" strokeWidth="0.6" />
          </g>
        );

      case 'prata':
        return (
          <g id="frame-prata" filter="url(#badgeSoftShadow)">
            {/* Moldura de Prata Esterlina Polida & Aço Azul */}
            <rect x="2" y="2" width="60" height="60" rx="9" fill="none" stroke="url(#silverMetalGrad)" strokeWidth="4.2" />
            <rect x="5.5" y="5.5" width="53" height="53" rx="7" fill="none" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="7" y="7" width="50" height="50" rx="6" fill="none" stroke="url(#silverBevelGrad)" strokeWidth="1" />

            {/* Cantos com Gemas de Safira Azul */}
            {/* Top-Left */}
            <circle cx="5" cy="5" r="3.2" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="5" cy="5" r="1" fill="#ffffff" />
            {/* Top-Right */}
            <circle cx="59" cy="5" r="3.2" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="59" cy="5" r="1" fill="#ffffff" />
            {/* Bottom-Left */}
            <circle cx="5" cy="59" r="3.2" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="5" cy="59" r="1" fill="#ffffff" />
            {/* Bottom-Right */}
            <circle cx="59" cy="59" r="3.2" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="59" cy="59" r="1" fill="#ffffff" />

            {/* Rebites de Prata Polida */}
            <circle cx="32" cy="4" r="1.3" fill="#ffffff" stroke="#1e293b" strokeWidth="0.6" />
            <circle cx="32" cy="60" r="1.3" fill="#ffffff" stroke="#1e293b" strokeWidth="0.6" />
            <circle cx="4" cy="32" r="1.3" fill="#ffffff" stroke="#1e293b" strokeWidth="0.6" />
            <circle cx="60" cy="32" r="1.3" fill="#ffffff" stroke="#1e293b" strokeWidth="0.6" />
          </g>
        );

      default: // bronze
        return (
          <g id="frame-bronze" filter="url(#badgeSoftShadow)">
            {/* Moldura Forjada em Bronze, Cobre e Carvalho Escuro */}
            <rect x="2" y="2" width="60" height="60" rx="9" fill="none" stroke="url(#bronzeMetalGrad)" strokeWidth="4.2" />
            <rect x="5.5" y="5.5" width="53" height="53" rx="7" fill="none" stroke="#291804" strokeWidth="1.5" />
            <rect x="7" y="7" width="50" height="50" rx="6" fill="none" stroke="url(#bronzeBevelGrad)" strokeWidth="1" />

            {/* Cantos com Rebites Forjados em Cobre */}
            {/* Top-Left */}
            <circle cx="5" cy="5" r="3" fill="#b45309" stroke="#451a03" strokeWidth="0.8" />
            <circle cx="5" cy="5" r="1" fill="#fde68a" />
            {/* Top-Right */}
            <circle cx="59" cy="5" r="3" fill="#b45309" stroke="#451a03" strokeWidth="0.8" />
            <circle cx="59" cy="5" r="1" fill="#fde68a" />
            {/* Bottom-Left */}
            <circle cx="5" cy="59" r="3" fill="#b45309" stroke="#451a03" strokeWidth="0.8" />
            <circle cx="5" cy="59" r="1" fill="#fde68a" />
            {/* Bottom-Right */}
            <circle cx="59" cy="59" r="3" fill="#b45309" stroke="#451a03" strokeWidth="0.8" />
            <circle cx="59" cy="59" r="1" fill="#fde68a" />

            {/* Rebites Centrais */}
            <circle cx="32" cy="4" r="1.2" fill="#d97706" stroke="#451a03" strokeWidth="0.6" />
            <circle cx="32" cy="60" r="1.2" fill="#d97706" stroke="#451a03" strokeWidth="0.6" />
            <circle cx="4" cy="32" r="1.2" fill="#d97706" stroke="#451a03" strokeWidth="0.6" />
            <circle cx="60" cy="32" r="1.2" fill="#d97706" stroke="#451a03" strokeWidth="0.6" />
          </g>
        );
    }
  };

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      style={{ width: `${px}px`, height: `${px}px` }}
    >
      <svg
        viewBox="0 0 64 64"
        width={px}
        height={px}
        className="w-full h-full overflow-visible transition-all duration-300 drop-shadow-md"
      >
        {/* Shaders and Definitions */}
        <BadgeDefs />

        {/* 1. ARTWORK INTERNO RECORTE PELO CLIP-PATH */}
        <g clipPath="url(#badgeInnerClip)">
          {renderArtwork()}

          {/* Efeito de Reflexo de Vidro Curvo / Specular Glint */}
          <path
            d="M8 8 L40 8 C20 18, 14 36, 8 46 Z"
            fill="url(#specularGlint)"
            pointerEvents="none"
          />
        </g>

        {/* 2. MOLDURA ESCULPIDA POR TIER */}
        {renderFrameBorder()}

        {/* 3. OVERLAY DE CADEADO QUANDO BLOQUEADO (NÃO SECRETO) */}
        {!isUnlocked && !isSecret && (
          <g>
            {/* Vignette escurecido */}
            <rect x="7" y="7" width="50" height="50" rx="6" fill="#000000" opacity="0.45" />
            
            {/* Cadeado de Aço Forjado Central com Fechadura de Ouro */}
            <g transform="translate(24, 24)" filter="url(#badgeSoftShadow)">
              {/* Arco de Aço */}
              <path d="M4 8 V4 C4 1.8 6 0 8 0 C10 0 12 1.8 12 4 V8" fill="none" stroke="#cbd5e1" strokeWidth="2.2" strokeLinecap="round" />
              {/* Corpo de Ferro Escovado */}
              <rect x="1" y="7" width="14" height="11" rx="2" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
              {/* Fechadura de Ouro */}
              <circle cx="8" cy="11.5" r="1.8" fill="#facc15" />
              <polygon points="7,11.5 9,11.5 8.5,15 7.5,15" fill="#facc15" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
