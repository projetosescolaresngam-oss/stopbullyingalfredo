import React from 'react';

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
