import React from 'react';

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
