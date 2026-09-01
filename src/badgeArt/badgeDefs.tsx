import React from 'react';

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
