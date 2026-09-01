import React from 'react';

interface AvatarRendererProps {
  iconId?: string;
  frameId?: string;
  badgeId?: string;
  effectId?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  showBadge?: boolean;
  showEffect?: boolean;
  animate?: boolean;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  iconId = 'icon_anonimo_padrao',
  frameId = 'frame_padrao_madeira',
  badgeId = 'badge_estrela_bronze',
  effectId = 'effect_nenhum',
  size = 'md',
  showBadge = true,
  showEffect = true,
  animate = true
}) => {
  const getSizePx = (): number => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm': return 40;
      case 'md': return 56;
      case 'lg': return 80;
      case 'xl': return 110;
      case '2xl': return 140;
      default: return 56;
    }
  };

  const px = getSizePx();

  // Helper para renderizar o ícone central (Avatar / Insígnia do Aluno)
  const renderIconSvg = () => {
    switch (iconId) {
      case 'icon_anonimo_padrao':
        return (
          <g transform="translate(18, 18)">
            {/* Capuz / Silhueta do Anônimo */}
            <path d="M14 4 C7 4 4 9 4 15 C4 21 8 25 14 25 C20 25 24 21 24 15 C24 9 21 4 14 4 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
            <path d="M8 14 Q14 11 20 14" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Olhos cibernéticos brilhantes */}
            <circle cx="10.5" cy="15.5" r="2" fill="#38bdf8" />
            <circle cx="17.5" cy="15.5" r="2" fill="#38bdf8" />
            <circle cx="10.5" cy="15.5" r="0.8" fill="#ffffff" />
            <circle cx="17.5" cy="15.5" r="0.8" fill="#ffffff" />
          </g>
        );
      case 'icon_coracao_empatia':
        return (
          <g transform="translate(18, 18)">
            {/* Coração Multifacetado com Brilho (Estilo Relíquia Colecionável) */}
            <path d="M14 25 C14 25 4 17 4 10 C4 6 7 3 11 3 C13 3 13.8 4 14 5 C14.2 4 15 3 17 3 C21 3 24 6 24 10 C24 17 14 25 14 25 Z" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.5" />
            {/* Facetas de Cristal */}
            <path d="M14 5 L17 10 L14 24 L11 10 Z" fill="#9333ea" />
            <path d="M4 10 L11 10 L14 24 L4 10 Z" fill="#6b21a8" />
            <path d="M24 10 L17 10 L14 24 L24 10 Z" fill="#a855f7" />
            <path d="M11 3 L11 10 L14 5 Z" fill="#c084fc" />
            <path d="M17 3 L17 10 L14 5 Z" fill="#e9d5ff" />
            {/* Brilho reluzente */}
            <circle cx="9" cy="7" r="1.5" fill="#ffffff" />
            <circle cx="19" cy="18" r="0.8" fill="#ffffff" />
          </g>
        );
      case 'icon_livro_sabedoria':
        return (
          <g transform="translate(18, 18)">
            <polygon points="14,6 24,3 24,20 14,23 4,20 4,3" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
            <polygon points="14,6 23,3.5 23,19 14,21.5" fill="#4338ca" />
            <polygon points="14,6 5,3.5 5,19 14,21.5" fill="#3730a3" />
            <line x1="14" y1="6" x2="14" y2="23" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="13" r="2.5" fill="#fbbf24" />
          </g>
        );
      case 'icon_coroa_sabedoria':
      case 'icon_guardiao_supremo':
        return (
          <g transform="translate(18, 18)">
            <polygon points="4,22 4,10 9,15 14,5 19,15 24,10 24,22" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
            <rect x="4" y="21" width="20" height="4" rx="1" fill="#ca8a04" stroke="#fde047" strokeWidth="0.8" />
            <circle cx="14" cy="6" r="2" fill="#ef4444" stroke="#ffffff" strokeWidth="0.6" />
            <circle cx="4" cy="11" r="1.5" fill="#3b82f6" />
            <circle cx="24" cy="11" r="1.5" fill="#10b981" />
            <circle cx="14" cy="23" r="1.2" fill="#ffffff" />
          </g>
        );
      case 'icon_diamante_resiliencia':
        return (
          <g transform="translate(18, 18)">
            <polygon points="14,3 24,10 14,26 4,10" fill="#06b6d4" stroke="#e0f2fe" strokeWidth="1.5" />
            <polygon points="14,3 19,10 14,26 9,10" fill="#67e8f9" />
            <line x1="4" y1="10" x2="24" y2="10" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="11" cy="7" r="1" fill="#ffffff" />
          </g>
        );
      case 'icon_zen_lotus':
        return (
          <g transform="translate(18, 18)">
            <path d="M14 4 C10 10 8 16 14 24 C20 16 18 10 14 4 Z" fill="#ec4899" stroke="#fbcfe8" strokeWidth="1.5" />
            <path d="M14 12 C8 14 5 20 14 24 C23 20 20 14 14 12 Z" fill="#f472b6" opacity="0.9" />
            <circle cx="14" cy="18" r="2.5" fill="#fef08a" />
          </g>
        );
      case 'icon_dragao_mistico':
        return (
          <g transform="translate(18, 18)">
            <polygon points="14,3 22,9 24,17 18,25 10,25 4,17 6,9" fill="#991b1b" stroke="#f87171" strokeWidth="1.5" />
            <polygon points="14,9 19,15 14,21 9,15" fill="#f59e0b" />
            <polygon points="8,5 12,8 8,11" fill="#ef4444" />
            <polygon points="20,5 16,8 20,11" fill="#ef4444" />
            <circle cx="11" cy="13" r="1" fill="#ffffff" />
            <circle cx="17" cy="13" r="1" fill="#ffffff" />
          </g>
        );
      case 'icon_escudo_aprendiz':
      default:
        return (
          <g transform="translate(18, 18)">
            <polygon points="14,3 24,7 24,17 14,26 4,17 4,7" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
            <polygon points="14,7 20,10 20,16 14,22 8,16 8,10" fill="#2563eb" />
            <circle cx="14" cy="14" r="3" fill="#fbbf24" stroke="#fef08a" strokeWidth="0.8" />
          </g>
        );
    }
  };

  // =========================================================================
  // RENDERIZAÇÃO DAS 13 MOLDURAS COMO RELÍQUIAS / CONQUISTAS VIVAS DE JOGO (TERRARIA AESTHETIC)
  // Cada moldura possui silhueta única, materiais volumosos, ornamentos salientes e profundidade chanfrada
  // =========================================================================
  const renderFrameSvg = () => {
    let normalizedId = frameId;
    if (frameId.startsWith('frame_custom_')) {
      normalizedId = 'frame_ouro_radiante';
    }

    switch (normalizedId) {
      
      // ---------------------------------------------------------------------
      // 1. MOLDURA CLÁSSICA DE MADEIRA & FERRO FORJADO (Terraria Dungeon Wood / Plaque)
      // Vigas de carvalho rústico com juntas de encaixe nos cantos, cintas de ferro forjado e broto de folha verde
      // ---------------------------------------------------------------------
      case 'frame_padrao_madeira':
        return (
          <g>
            <defs>
              <linearGradient id="tWoodDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#854d0e" />
                <stop offset="30%" stopColor="#713f12" />
                <stop offset="70%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#1c0a00" />
              </linearGradient>
              <linearGradient id="tWoodBevel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a16207" />
                <stop offset="100%" stopColor="#290f02" />
              </linearGradient>
              <linearGradient id="tIronStrap" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Sombra de Objeto Pesado de Madeira */}
            <rect x="2" y="3" width="60" height="60" rx="4" fill="#000000" opacity="0.85" />

            {/* Encaixes de Madeira que sobressaem nos cantos (Lap-Joint Timber Plaque) */}
            <rect x="1" y="6" width="62" height="12" rx="2" fill="#58290a" stroke="#120501" strokeWidth="2" />
            <rect x="1" y="46" width="62" height="12" rx="2" fill="#58290a" stroke="#120501" strokeWidth="2" />
            <rect x="6" y="1" width="12" height="62" rx="2" fill="#713f12" stroke="#120501" strokeWidth="2" />
            <rect x="46" y="1" width="12" height="62" rx="2" fill="#713f12" stroke="#120501" strokeWidth="2" />

            {/* Corpo Central da Placa de Madeira com Textura de Tábua */}
            <rect x="5" y="5" width="54" height="54" rx="3" fill="url(#tWoodDark)" stroke="#1a0901" strokeWidth="2" />
            
            {/* Veios Rústicos Chanfrados da Madeira */}
            <line x1="8" y1="18" x2="56" y2="18" stroke="#290f02" strokeWidth="1.5" />
            <line x1="8" y1="32" x2="56" y2="32" stroke="#290f02" strokeWidth="2" />
            <line x1="8" y1="46" x2="56" y2="46" stroke="#290f02" strokeWidth="1.5" />
            <line x1="8" y1="33.5" x2="56" y2="33.5" stroke="#a16207" strokeWidth="0.8" opacity="0.7" />

            {/* Nicho Interno Rebaixado para o Retrato */}
            <rect x="13" y="13" width="38" height="38" rx="2" fill="#0f0702" stroke="#290f02" strokeWidth="2" />
            <rect x="14.5" y="14.5" width="35" height="35" rx="1" fill="#140a03" />

            {/* 4 Cintas Pesadas de Ferro Forjado em L com Parafusos Sextavados */}
            <path d="M3 3 H17 V9 H9 V17 H3 Z" fill="url(#tIronStrap)" stroke="#090d16" strokeWidth="1.5" />
            <path d="M61 3 H47 V9 H55 V17 H61 Z" fill="url(#tIronStrap)" stroke="#090d16" strokeWidth="1.5" />
            <path d="M3 61 H17 V55 H9 V47 H3 Z" fill="url(#tIronStrap)" stroke="#090d16" strokeWidth="1.5" />
            <path d="M61 61 H47 V55 H55 V47 H61 Z" fill="url(#tIronStrap)" stroke="#090d16" strokeWidth="1.5" />

            {/* Rebites Sextavados de Aço Forjado nos 4 Cantos */}
            <polygon points="7,4 10,4 12,7 10,10 7,10 5,7" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="54,4 57,4 59,7 57,10 54,10 52,7" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="7,54 10,54 12,57 10,60 7,60 5,57" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="54,54 57,54 59,57 57,60 54,60 52,57" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.8" />
            
            <circle cx="8.5" cy="6.5" r="1" fill="#ffffff" />
            <circle cx="55.5" cy="6.5" r="1" fill="#ffffff" />
            <circle cx="8.5" cy="56.5" r="1" fill="#ffffff" />
            <circle cx="55.5" cy="56.5" r="1" fill="#ffffff" />

            {/* Broto de Folha Verde Quebrando a Silhueta no Canto Superior Direito (Terraria Style) */}
            <path d="M58 8 C64 2 66 10 59 13 Z" fill="#22c55e" stroke="#14532d" strokeWidth="1" />
            <path d="M60 5 Q57 9 53 10" stroke="#86efac" strokeWidth="0.8" fill="none" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 2. MOLDURA BRONZE FORJADO DO APRENDIZ (Terraria Dwarven Forge / Gears)
      // Dentes de engrenagem forjados, cantos em pirâmide e 4 gemas de âmbar lapidadas
      // ---------------------------------------------------------------------
      case 'frame_bronze_aprendiz':
        return (
          <g>
            <defs>
              <linearGradient id="tBronzeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="30%" stopColor="#d97706" />
                <stop offset="70%" stopColor="#92400e" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="tAmberGem" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>

            {/* Sombra da Silhueta Martelada com Dentes de Engrenagem */}
            <path d="M2,14 L8,8 L14,2 L50,2 L56,8 L62,14 L62,50 L56,56 L50,62 L14,62 L8,56 L2,50 Z" fill="#000000" opacity="0.85" />

            {/* Dentes Salientes de Engrenagem / Suportes nas Bordas */}
            <polygon points="28,0 36,0 38,5 26,5" fill="#b45309" stroke="#290f02" strokeWidth="1.5" />
            <polygon points="28,64 36,64 38,59 26,59" fill="#b45309" stroke="#290f02" strokeWidth="1.5" />
            <polygon points="0,28 0,36 5,38 5,26" fill="#b45309" stroke="#290f02" strokeWidth="1.5" />
            <polygon points="64,28 64,36 59,38 59,26" fill="#b45309" stroke="#290f02" strokeWidth="1.5" />

            {/* Placa Octagonal Forjada de Bronze */}
            <polygon points="3,15 15,3 49,3 61,15 61,49 49,61 15,61 3,49" fill="url(#tBronzeGrad)" stroke="#1f0a02" strokeWidth="2.5" />

            {/* Camada Intermediária Martelada com Chanfro de Luz */}
            <polygon points="7,17 17,7 47,7 57,17 57,47 47,57 17,57 7,47" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />

            {/* Nicho Interno Escuro */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="2" fill="#120601" stroke="#451a03" strokeWidth="2" />

            {/* 4 Engastes Angulares com Gemas Âmbar Lapidadas em Diamante */}
            <polygon points="4,4 16,4 16,8 8,16 4,16" fill="#ca8a04" stroke="#1f0a02" strokeWidth="1.2" />
            <polygon points="60,4 48,4 48,8 56,16 60,16" fill="#ca8a04" stroke="#1f0a02" strokeWidth="1.2" />
            <polygon points="4,60 16,60 16,56 8,48 4,48" fill="#ca8a04" stroke="#1f0a02" strokeWidth="1.2" />
            <polygon points="60,60 48,60 48,56 56,48 60,48" fill="#ca8a04" stroke="#1f0a02" strokeWidth="1.2" />

            {/* Gemas Âmbar Facetadas */}
            <polygon points="8,4 13,9 8,14 3,9" fill="url(#tAmberGem)" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="56,4 61,9 56,14 51,9" fill="url(#tAmberGem)" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="8,50 13,55 8,60 3,55" fill="url(#tAmberGem)" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="56,50 61,55 56,60 51,55" fill="url(#tAmberGem)" stroke="#ffffff" strokeWidth="0.8" />

            <circle cx="7" cy="7" r="1.2" fill="#ffffff" />
            <circle cx="57" cy="7" r="1.2" fill="#ffffff" />
            <circle cx="7" cy="57" r="1.2" fill="#ffffff" />
            <circle cx="57" cy="57" r="1.2" fill="#ffffff" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 3. MOLDURA PRATA VIGILANTE (Terraria Hallowed Knight / Platinum Blades)
      // Asas metálicas afiadas de cavaleiro projetadas nas laterais, crista gótica e safiras lapidadas
      // ---------------------------------------------------------------------
      case 'frame_prata_vigilante':
        return (
          <g>
            <defs>
              <linearGradient id="tSilverGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#e2e8f0" />
                <stop offset="60%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
              <linearGradient id="tSapphireJewel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="35%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>

            {/* Sombra de Asas de Aço e Lâminas de Cavaleiro */}
            <path d="M-2,20 L6,10 L16,4 L48,4 L58,10 L66,20 L66,44 L58,54 L48,60 L16,60 L6,54 L-2,44 Z" fill="#000000" opacity="0.85" />

            {/* Lâminas de Asas Metálicas Projetando-se nas Laterais (Silhueta Exclusiva de Cavaleiro) */}
            <polygon points="-1,18 7,12 8,52 -1,46" fill="url(#tSilverGrad)" stroke="#090d16" strokeWidth="1.5" />
            <polygon points="65,18 57,12 56,52 65,46" fill="url(#tSilverGrad)" stroke="#090d16" strokeWidth="1.5" />
            
            <polygon points="1,22 6,18 6,46 1,42" fill="#ffffff" />
            <polygon points="63,22 58,18 58,46 63,42" fill="#ffffff" />

            {/* Chassi de Platina Esculpida */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="3" fill="url(#tSilverGrad)" stroke="#090d16" strokeWidth="2.5" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="2" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
            <rect x="11" y="11" width="42" height="42" rx="1.5" fill="#cbd5e1" />

            {/* Nicho Interno Azul-Noite Escuro */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="1.5" fill="#050b14" stroke="#1e293b" strokeWidth="2" />

            {/* Elmo / Crista Superior e Inferior */}
            <polygon points="24,6 32,0.5 40,6 36,9 28,9" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
            <polygon points="24,58 32,63.5 40,58 36,55 28,55" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />

            {/* 4 Engastes com Safiras Reais em Corte Diamante */}
            <polygon points="9,5 14,9 9,13 4,9" fill="url(#tSapphireJewel)" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="55,5 60,9 55,13 50,9" fill="url(#tSapphireJewel)" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="9,51 14,55 9,59 4,55" fill="url(#tSapphireJewel)" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="55,51 60,55 55,59 50,55" fill="url(#tSapphireJewel)" stroke="#ffffff" strokeWidth="0.8" />

            <circle cx="8" cy="8" r="1.2" fill="#ffffff" />
            <circle cx="56" cy="8" r="1.2" fill="#ffffff" />
            <circle cx="8" cy="56" r="1.2" fill="#ffffff" />
            <circle cx="56" cy="56" r="1.2" fill="#ffffff" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 4. MOLDURA OURO IMPERIAL DO DEFENSOR (Terraria Signature Golden Achievement Box)
      // Placa maciça de ouro 24k, coroa de 3 pontas, 4 blocos de rubis escarlates e rebites piramidais
      // ---------------------------------------------------------------------
      case 'frame_ouro_radiante':
        return (
          <g>
            <defs>
              <linearGradient id="tGoldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="20%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#eab308" />
                <stop offset="85%" stopColor="#a16207" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="tDragonRuby" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fecaca" />
                <stop offset="30%" stopColor="#ef4444" />
                <stop offset="70%" stopColor="#b91c1c" />
                <stop offset="100%" stopColor="#450a0a" />
              </linearGradient>
            </defs>

            {/* Sombra da Placa Imperial e Coroa Superior */}
            <path d="M2,12 L8,4 L24,4 L27,0 L37,0 L40,4 L56,4 L62,12 L62,52 L56,60 L40,60 L37,64 L27,64 L24,60 L8,60 L2,52 Z" fill="#000000" opacity="0.9" />

            {/* Placa Nobre de Ouro Maciço Chanfrada */}
            <rect x="4.5" y="4.5" width="55" height="55" rx="3" fill="url(#tGoldGrad)" stroke="#1a0901" strokeWidth="2.5" />
            
            {/* Chanfros Relevados com Brilho Real */}
            <rect x="7.5" y="7.5" width="49" height="49" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
            <rect x="10" y="10" width="44" height="44" rx="1.5" fill="url(#tGoldGrad)" stroke="#fef08a" strokeWidth="1" />

            {/* Nicho Interno Veludo Imperial Escuro */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="1" fill="#120601" stroke="#381a05" strokeWidth="2.5" />

            {/* Coroa Imperial de 3 Pontas no Topo */}
            <polygon points="25,5 32,0 39,5 35,8 29,8" fill="#fef08a" stroke="#451a03" strokeWidth="1" />
            <circle cx="32" cy="3.5" r="1.5" fill="#dc2626" stroke="#ffffff" strokeWidth="0.5" />

            {/* 4 Blocos de Canto Ornamentados com Rubis de Sangue de Dragão (Assinatura Terraria) */}
            {/* Top Left */}
            <rect x="3.5" y="3.5" width="13" height="13" fill="#1f0202" stroke="#000000" strokeWidth="1.5" />
            <rect x="5" y="5" width="10" height="10" fill="url(#tDragonRuby)" stroke="#450a0a" strokeWidth="0.8" />
            <rect x="6" y="6" width="3.5" height="3.5" fill="#ffffff" />
            
            {/* Top Right */}
            <rect x="47.5" y="3.5" width="13" height="13" fill="#1f0202" stroke="#000000" strokeWidth="1.5" />
            <rect x="49" y="5" width="10" height="10" fill="url(#tDragonRuby)" stroke="#450a0a" strokeWidth="0.8" />
            <rect x="50" y="6" width="3.5" height="3.5" fill="#ffffff" />

            {/* Bottom Left */}
            <rect x="3.5" y="47.5" width="13" height="13" fill="#1f0202" stroke="#000000" strokeWidth="1.5" />
            <rect x="5" y="49" width="10" height="10" fill="url(#tDragonRuby)" stroke="#450a0a" strokeWidth="0.8" />
            <rect x="6" y="50" width="3.5" height="3.5" fill="#ffffff" />

            {/* Bottom Right */}
            <rect x="47.5" y="47.5" width="13" height="13" fill="#1f0202" stroke="#000000" strokeWidth="1.5" />
            <rect x="49" y="49" width="10" height="10" fill="url(#tDragonRuby)" stroke="#450a0a" strokeWidth="0.8" />
            <rect x="50" y="50" width="3.5" height="3.5" fill="#ffffff" />

            {/* 4 Tachas Douradas nas Bordas */}
            <rect x="30" y="5" width="4" height="4" fill="#fef08a" stroke="#713f12" strokeWidth="0.8" />
            <rect x="30" y="55" width="4" height="4" fill="#fef08a" stroke="#713f12" strokeWidth="0.8" />
            <rect x="5" y="30" width="4" height="4" fill="#fef08a" stroke="#713f12" strokeWidth="0.8" />
            <rect x="55" y="30" width="4" height="4" fill="#fef08a" stroke="#713f12" strokeWidth="0.8" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 5. MOLDURA ESMERALDA DA CONVIVÊNCIA (Terraria Underground Jungle / Life Fruit)
      // Tronco vivo ancestral com raízes retorcidas, folhas da selva saindo da borda e geodos de esmeralda luminosa
      // ---------------------------------------------------------------------
      case 'frame_esmeralda_natureza':
        return (
          <g>
            <defs>
              <linearGradient id="tJungleBark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#166534" />
                <stop offset="40%" stopColor="#14532d" />
                <stop offset="100%" stopColor="#052e16" />
              </linearGradient>
              <linearGradient id="tEmeraldJewel" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="35%" stopColor="#10b981" />
                <stop offset="80%" stopColor="#047857" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
            </defs>

            {/* Sombra de Folhas e Raízes da Selva */}
            <rect x="2" y="2" width="60" height="60" rx="8" fill="#000000" opacity="0.85" />

            {/* Folhas Vivas e Ramos Exóticos Projetando-se para Fora nos 4 Cantos (Terraria Jungle Aesthetic) */}
            <path d="M0 16 C-4 6 8 0 16 3 C9 9 9 9 0 16 Z" fill="#22c55e" stroke="#052e16" strokeWidth="1.2" />
            <path d="M64 16 C68 6 56 0 48 3 C55 9 55 9 64 16 Z" fill="#22c55e" stroke="#052e16" strokeWidth="1.2" />
            <path d="M0 48 C-4 58 8 64 16 61 C9 55 9 55 0 48 Z" fill="#22c55e" stroke="#052e16" strokeWidth="1.2" />
            <path d="M64 48 C68 58 56 64 48 61 C55 55 55 55 64 48 Z" fill="#22c55e" stroke="#052e16" strokeWidth="1.2" />

            {/* Chassi de Madeira Viva Enraizada */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="4" fill="url(#tJungleBark)" stroke="#022c22" strokeWidth="2.5" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="3" fill="#059669" stroke="#065f46" strokeWidth="1.5" />
            
            {/* Nicho Interno Selva Noturna */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="2" fill="#021c12" stroke="#34d399" strokeWidth="1.8" />

            {/* 4 Geodos de Esmeralda Radiante nos Cantos */}
            <polygon points="10,4 16,10 10,16 4,10" fill="url(#tEmeraldJewel)" stroke="#ffffff" strokeWidth="1" />
            <polygon points="54,4 60,10 54,16 48,10" fill="url(#tEmeraldJewel)" stroke="#ffffff" strokeWidth="1" />
            <polygon points="10,48 16,54 10,60 4,54" fill="url(#tEmeraldJewel)" stroke="#ffffff" strokeWidth="1" />
            <polygon points="54,48 60,54 54,60 48,54" fill="url(#tEmeraldJewel)" stroke="#ffffff" strokeWidth="1" />

            {/* Ponto de Luz de Cristal */}
            <circle cx="8" cy="8" r="1.3" fill="#ffffff" />
            <circle cx="56" cy="8" r="1.3" fill="#ffffff" />
            <circle cx="8" cy="56" r="1.3" fill="#ffffff" />
            <circle cx="56" cy="56" r="1.3" fill="#ffffff" />

            {/* Flores de Pólen / Fruto da Vida Dourado no Topo e Base */}
            <circle cx="32" cy="7.5" r="2.8" fill="#facc15" stroke="#14532d" strokeWidth="1" />
            <circle cx="32" cy="56.5" r="2.8" fill="#facc15" stroke="#14532d" strokeWidth="1" />
            <circle cx="7.5" cy="32" r="2.8" fill="#facc15" stroke="#14532d" strokeWidth="1" />
            <circle cx="56.5" cy="32" r="2.8" fill="#facc15" stroke="#14532d" strokeWidth="1" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 6. MOLDURA SAFIRA DO OCEANO & GELO ÁRTICO (Terraria Snow / Truffle Mushroom)
      // Espículas afiadas de gelo glacial nos cantos, crista de onda marinha e safiras congeladas
      // ---------------------------------------------------------------------
      case 'frame_safira_oceano':
        return (
          <g>
            <defs>
              <linearGradient id="tGlacialGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="35%" stopColor="#0284c7" />
                <stop offset="75%" stopColor="#075985" />
                <stop offset="100%" stopColor="#082f49" />
              </linearGradient>
            </defs>

            {/* Sombra de Espículas de Gelo */}
            <rect x="2" y="2" width="60" height="60" rx="5" fill="#000000" opacity="0.85" />

            {/* Espículas de Gelo e Cristais Glaciais Pontiagudos nos 4 Cantos (Silhueta Ártica Marcante) */}
            <polygon points="1,1 15,3 17,9 9,17 3,15" fill="#7dd3fc" stroke="#0c4a6e" strokeWidth="1.5" />
            <polygon points="63,1 49,3 47,9 55,17 61,15" fill="#7dd3fc" stroke="#0c4a6e" strokeWidth="1.5" />
            <polygon points="1,63 15,61 17,55 9,47 3,49" fill="#7dd3fc" stroke="#0c4a6e" strokeWidth="1.5" />
            <polygon points="63,63 49,61 47,55 55,47 61,49" fill="#7dd3fc" stroke="#0c4a6e" strokeWidth="1.5" />

            {/* Chassi de Titânio Glacial */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="4" fill="url(#tGlacialGrad)" stroke="#031d30" strokeWidth="2.5" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="3" fill="#0369a1" stroke="#0284c7" strokeWidth="1.5" />

            {/* Nicho Interno Abissal */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="1.5" fill="#021320" stroke="#38bdf8" strokeWidth="2" />

            {/* Prismas de Safira Glacial nos Cantos */}
            <polygon points="5,5 11,5 13,9 9,13 5,11" fill="#e0f2fe" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="59,5 53,5 51,9 55,13 59,11" fill="#e0f2fe" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="5,59 11,59 13,55 9,51 5,53" fill="#e0f2fe" stroke="#ffffff" strokeWidth="0.8" />
            <polygon points="59,59 53,59 51,55 55,51 59,53" fill="#e0f2fe" stroke="#ffffff" strokeWidth="0.8" />

            {/* Crista de Ondas Glaciais no Topo e Base */}
            <path d="M22 7 Q32 1 42 7" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M22 57 Q32 63 42 57" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="32" cy="6.5" r="1.8" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
            <circle cx="32" cy="57.5" r="1.8" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 7. MOLDURA AMETISTA DA SABEDORIA (Terraria Corruption / Cosmic Void)
      // Obsidiana cósmica, obeliscos rúnicos flutuantes e cachos de cristais de ametista bruta
      // ---------------------------------------------------------------------
      case 'frame_ametista_mistica':
        return (
          <g>
            <defs>
              <linearGradient id="tAmethystGeode" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="30%" stopColor="#c084fc" />
                <stop offset="70%" stopColor="#7e22ce" />
                <stop offset="100%" stopColor="#2e0854" />
              </linearGradient>
            </defs>

            {/* Sombra de Obeliscos e Cristais Rúnicos */}
            <path d="M-1,32 L6,20 L6,6 L20,6 L32,0 L44,6 L58,6 L58,20 L65,32 L58,44 L58,58 L44,58 L32,64 L20,58 L6,58 L6,44 Z" fill="#000000" opacity="0.9" />

            {/* Obeliscos Rúnicos Flutuantes nas Laterais (Silhueta Arcana Mágica) */}
            <polygon points="-1,32 6,22 6,42" fill="#c084fc" stroke="#150226" strokeWidth="1.5" />
            <polygon points="65,32 58,22 58,42" fill="#c084fc" stroke="#150226" strokeWidth="1.5" />
            <polygon points="1,32 5,25 5,39" fill="#f3e8ff" />
            <polygon points="63,32 59,25 59,39" fill="#f3e8ff" />

            {/* Estrutura de Obsidiana Cósmica */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="4" fill="#2e0854" stroke="#120120" strokeWidth="2.5" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="3" fill="#6b21a8" stroke="#a855f7" strokeWidth="1.5" />

            {/* Nicho Interno Vácuo Cósmico */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="1.5" fill="#0c0116" stroke="#c084fc" strokeWidth="2" />

            {/* 4 Grandes Gemas Octagonais de Ametista Bruta nos Cantos */}
            <polygon points="7,3 13,3 16,8 16,14 11,17 5,15 4,9" fill="url(#tAmethystGeode)" stroke="#ffffff" strokeWidth="1" />
            <polygon points="57,3 51,3 48,8 48,14 53,17 59,15 60,9" fill="url(#tAmethystGeode)" stroke="#ffffff" strokeWidth="1" />
            <polygon points="7,61 13,61 16,56 16,50 11,47 5,49 4,55" fill="url(#tAmethystGeode)" stroke="#ffffff" strokeWidth="1" />
            <polygon points="57,61 51,61 48,56 48,50 53,47 59,49 60,55" fill="url(#tAmethystGeode)" stroke="#ffffff" strokeWidth="1" />

            <circle cx="10" cy="9" r="1.8" fill="#ffffff" />
            <circle cx="54" cy="9" r="1.8" fill="#ffffff" />
            <circle cx="10" cy="55" r="1.8" fill="#ffffff" />
            <circle cx="54" cy="55" r="1.8" fill="#ffffff" />

            {/* Coroa Mágica Cósmica Superior e Inferior */}
            <polygon points="32,1 37,7 27,7" fill="#facc15" stroke="#3b0764" strokeWidth="1" />
            <polygon points="32,63 37,57 27,57" fill="#facc15" stroke="#3b0764" strokeWidth="1" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 8. MOLDURA RUBI FLAMEJANTE & MAGMA (Terraria Underworld "Rock Bottom" Style)
      // Basalto vulcânico escuro, línguas de fogo incandescentes no topo e chifres pontiagudos de dragão
      // ---------------------------------------------------------------------
      case 'frame_rubi_coragem':
        return (
          <g>
            <defs>
              <linearGradient id="tMagmaFlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="25%" stopColor="#f97316" />
                <stop offset="60%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#450a0a" />
              </linearGradient>
            </defs>

            {/* Sombra Agressiva de Chifres de Dragão e Línguas de Fogo */}
            <path d="M-1,-1 L17,4 L24,0 L40,0 L47,4 L65,-1 L60,17 L65,24 L65,40 L60,47 L65,65 L47,60 L40,64 L24,64 L17,60 L-1,65 L4,47 L-1,40 L-1,24 L4,17 Z" fill="#000000" opacity="0.9" />

            {/* 4 Chifres Pontiagudos de Rocha Vulcânica e Fogo nos Cantos (Silhueta Agressiva Terraria) */}
            <polygon points="0,0 16,5 11,11 5,16" fill="#ef4444" stroke="#450a0a" strokeWidth="1.5" />
            <polygon points="64,0 48,5 53,11 59,16" fill="#ef4444" stroke="#450a0a" strokeWidth="1.5" />
            <polygon points="0,64 16,59 11,53 5,48" fill="#ef4444" stroke="#450a0a" strokeWidth="1.5" />
            <polygon points="64,64 48,59 53,53 59,48" fill="#ef4444" stroke="#450a0a" strokeWidth="1.5" />

            {/* Chassi de Basalto Vulcânico Vulcanizado */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="3" fill="#3b0a0a" stroke="#1f0202" strokeWidth="2.5" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="2" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1.5" />
            <rect x="11" y="11" width="42" height="42" rx="1.5" fill="url(#tMagmaFlow)" />

            {/* Nicho Interno Caldeira Ardente */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="1" fill="#140202" stroke="#f97316" strokeWidth="2.2" />

            {/* 4 Núcleos de Rubi Escaldante nos Cantos */}
            <rect x="6.5" y="6.5" width="8" height="8" rx="1" fill="#f87171" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="49.5" y="6.5" width="8" height="8" rx="1" fill="#f87171" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="6.5" y="49.5" width="8" height="8" rx="1" fill="#f87171" stroke="#ffffff" strokeWidth="0.8" />
            <rect x="49.5" y="49.5" width="8" height="8" rx="1" fill="#f87171" stroke="#ffffff" strokeWidth="0.8" />
            
            <circle cx="8.5" cy="8.5" r="1.5" fill="#ffffff" />
            <circle cx="53.5" cy="8.5" r="1.5" fill="#ffffff" />
            <circle cx="8.5" cy="53.5" r="1.5" fill="#ffffff" />
            <circle cx="53.5" cy="53.5" r="1.5" fill="#ffffff" />

            {/* Labareda Central Superior de Fogo Vulcânico */}
            <polygon points="32,0 38,7 26,7" fill="#fef08a" stroke="#dc2626" strokeWidth="1" />
            <polygon points="32,64 38,57 26,57" fill="#fef08a" stroke="#dc2626" strokeWidth="1" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 9. MOLDURA PRISMA CELESTIAL DA DIVERSIDADE (Terraria Empress of Light / Prism)
      // Faixas de arco-íris cósmico, 4 estrelas de diamante multifacetado e luz radiante
      // ---------------------------------------------------------------------
      case 'frame_arco_iris_paz':
        return (
          <g>
            <defs>
              <linearGradient id="tRainbowTop" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="35%" stopColor="#a855f7" />
                <stop offset="70%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="tRainbowBot" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="40%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Sombra Prisma */}
            <rect x="2" y="2" width="60" height="60" rx="6" fill="#000000" opacity="0.85" />

            {/* 4 Estrelas de Diamante Prismático Salientes nos Cantos */}
            <polygon points="9,0 14,8 9,16 4,8" fill="#ffffff" stroke="#ec4899" strokeWidth="1.5" />
            <polygon points="55,0 60,8 55,16 50,8" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
            <polygon points="9,48 14,56 9,64 4,56" fill="#ffffff" stroke="#f59e0b" strokeWidth="1.5" />
            <polygon points="55,48 60,56 55,64 50,56" fill="#ffffff" stroke="#06b6d4" strokeWidth="1.5" />

            {/* Chassi Cromado Astral */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="4" fill="#0f172a" stroke="#000000" strokeWidth="2.5" />
            
            {/* Barras Espectrais de Arco-Íris Reluzente */}
            <rect x="8" y="7" width="48" height="5.5" rx="2" fill="url(#tRainbowTop)" />
            <rect x="8" y="51.5" width="48" height="5.5" rx="2" fill="url(#tRainbowBot)" />
            <rect x="7" y="8" width="5.5" height="48" rx="2" fill="#ec4899" />
            <rect x="51.5" y="8" width="5.5" height="48" rx="2" fill="#06b6d4" />

            {/* Nicho Interno Céu Noturno Prismático */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="1.5" fill="#080414" stroke="#ffffff" strokeWidth="1.8" />

            {/* Estrelas Brilhantes Centrais */}
            <circle cx="32" cy="9.5" r="2.2" fill="#ffffff" />
            <circle cx="32" cy="54.5" r="2.2" fill="#ffffff" />
            <circle cx="9.5" cy="32" r="2.2" fill="#ffffff" />
            <circle cx="54.5" cy="32" r="2.2" fill="#ffffff" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 10. MOLDURA GUARDIÃO CÓSMICO IMORTAL (Terraria Zenith / Moon Lord / Mítico Máximo)
      // Asas divinas de Serafim desdobradas, coroa de fogo solar, estrelas solares de 8 pontas e câmara cósmica
      // ---------------------------------------------------------------------
      case 'frame_guardiao_cosmico':
        return (
          <g>
            <defs>
              <linearGradient id="tCosmicSolar" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="20%" stopColor="#fef08a" />
                <stop offset="55%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
            </defs>

            {/* Sombra Majestosa das Grandes Asas Divinas */}
            <path d="M-3,10 C-5,2 8,-2 18,3 L26,3 L32,-2 L38,3 L46,3 C56,-2 69,2 67,10 C62,18 56,24 60,36 L60,54 L50,64 L14,64 L4,54 L4,36 C8,24 2,18 -3,10 Z" fill="#000000" opacity="0.92" />

            {/* Grandes Asas Divinas de Serafim Flanqueando o Topo (Silhueta Mítica Imbatível) */}
            <path d="M-2 10 C-4 2 8 0 18 4 C10 8 7 15 3 17 C0 16 -1 13 -2 10 Z" fill="url(#tCosmicSolar)" stroke="#713f12" strokeWidth="1.5" />
            <path d="M66 10 C68 2 56 0 46 4 C54 8 57 15 61 17 C64 16 65 13 66 10 Z" fill="url(#tCosmicSolar)" stroke="#713f12" strokeWidth="1.5" />
            
            {/* Pluma Secundária das Asas */}
            <path d="M2 18 C-1 22 1 29 5 31 C4 26 4 22 2 18 Z" fill="#fde047" stroke="#713f12" strokeWidth="1" />
            <path d="M62 18 C65 22 63 29 59 31 C60 26 60 22 62 18 Z" fill="#fde047" stroke="#713f12" strokeWidth="1" />

            {/* Armadura Galáctica Dourada */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="4" fill="#1e1b4b" stroke="#ca8a04" strokeWidth="3" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="3" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
            <rect x="11" y="11" width="42" height="42" rx="2" fill="url(#tCosmicSolar)" />

            {/* Nicho Interno Vácuo Celestial */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="1.5" fill="#060210" stroke="#fef08a" strokeWidth="2.5" />

            {/* Coroa Solar Divina com Rubi Celestial no Topo */}
            <polygon points="24,5 32,-1.5 40,5 36,8 28,8" fill="url(#tCosmicSolar)" stroke="#713f12" strokeWidth="1.2" />
            <circle cx="32" cy="2" r="2" fill="#ef4444" stroke="#ffffff" strokeWidth="0.8" />

            {/* 4 Estrelas Solares de 8 Pontas nos Cantos */}
            <polygon points="10,3 12,8 17,9 12,11 10,16 8,11 3,9 8,8" fill="#ffffff" stroke="#ca8a04" strokeWidth="1" />
            <polygon points="54,3 56,8 61,9 56,11 54,16 52,11 47,9 52,8" fill="#ffffff" stroke="#ca8a04" strokeWidth="1" />
            <polygon points="10,48 12,53 17,55 12,57 10,62 8,57 3,55 8,53" fill="#ffffff" stroke="#ca8a04" strokeWidth="1" />
            <polygon points="54,48 56,53 61,55 56,57 54,62 52,57 47,55 52,53" fill="#ffffff" stroke="#ca8a04" strokeWidth="1" />

            {/* Gemas Roxas de Galáxia nos Pontos Cardeais */}
            <circle cx="32" cy="56.5" r="3" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="7.5" cy="32" r="3" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="56.5" cy="32" r="3" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 11. MOLDURA CYBERPUNK NEON (Terraria Martian Saucer / Sci-Fi Mecha)
      // Exoesquema de fibra de carbono, canais condutores de neon laser ciano e magenta
      // ---------------------------------------------------------------------
      case 'frame_cyber_neon':
        return (
          <g>
            <defs>
              <linearGradient id="tCyberLaser" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>

            {/* Sombra Mecha */}
            <rect x="3" y="3" width="58" height="58" rx="4" fill="#000000" opacity="0.9" />

            {/* Chassi de Fibra de Carbono Escura */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="2" fill="#090d16" stroke="#000000" strokeWidth="2.5" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="1" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />

            {/* Nicho Interno Ciber */}
            <rect x="13.5" y="13.5" width="37" height="37" fill="#020617" stroke="#f43f5e" strokeWidth="2" />

            {/* Tubos de Laser Neon Ciano e Rosa */}
            <line x1="16" y1="7" x2="48" y2="7" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
            <line x1="16" y1="57" x2="48" y2="57" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
            <line x1="7" y1="16" x2="7" y2="48" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />
            <line x1="57" y1="16" x2="57" y2="48" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />

            {/* 4 Módulos de Ventilação Holográfica nos Cantos */}
            <rect x="3" y="3" width="12" height="12" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="49" y="3" width="12" height="12" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="3" y="49" width="12" height="12" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="49" y="49" width="12" height="12" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />

            <circle cx="9" cy="9" r="2" fill="#ffffff" />
            <circle cx="55" cy="9" r="2" fill="#ffffff" />
            <circle cx="9" cy="55" r="2" fill="#ffffff" />
            <circle cx="55" cy="55" r="2" fill="#ffffff" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 12. MOLDURA MATRIZ CIBERNÉTICA (Terminal Militar Secreto Hacker)
      // Terminal militar verde fósforo, traços de placa-mãe e nós quânticos
      // ---------------------------------------------------------------------
      case 'frame_codigo_secreto':
        return (
          <g>
            <defs>
              <linearGradient id="tMatrixGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
            </defs>

            <rect x="3" y="3" width="58" height="58" rx="4" fill="#000000" opacity="0.9" />

            {/* Chassi Militar Blindado */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="2" fill="#022c22" stroke="#052e16" strokeWidth="2.5" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="1" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />

            {/* Nicho Interno Terminal */}
            <rect x="13.5" y="13.5" width="37" height="37" fill="#01140e" stroke="#34d399" strokeWidth="2" />

            {/* 4 Nodos de Criptografia Matrix nos Cantos */}
            <rect x="3" y="3" width="12" height="12" fill="url(#tMatrixGrad)" stroke="#052e16" strokeWidth="1.5" />
            <rect x="49" y="3" width="12" height="12" fill="url(#tMatrixGrad)" stroke="#052e16" strokeWidth="1.5" />
            <rect x="3" y="49" width="12" height="12" fill="url(#tMatrixGrad)" stroke="#052e16" strokeWidth="1.5" />
            <rect x="49" y="49" width="12" height="12" fill="url(#tMatrixGrad)" stroke="#052e16" strokeWidth="1.5" />

            {/* Nodos de Luz Quântica */}
            <circle cx="9" cy="9" r="2.5" fill="#6ee7b7" stroke="#ffffff" strokeWidth="1" />
            <circle cx="55" cy="9" r="2.5" fill="#6ee7b7" stroke="#ffffff" strokeWidth="1" />
            <circle cx="9" cy="55" r="2.5" fill="#6ee7b7" stroke="#ffffff" strokeWidth="1" />
            <circle cx="55" cy="55" r="2.5" fill="#6ee7b7" stroke="#ffffff" strokeWidth="1" />

            {/* Barras de Dados Fósforo Verde */}
            <rect x="18" y="6.5" width="28" height="3" fill="#6ee7b7" rx="1" />
            <rect x="18" y="54.5" width="28" height="3" fill="#6ee7b7" rx="1" />
          </g>
        );

      // ---------------------------------------------------------------------
      // 13. MOLDURA AURA RADIANTE DE EMPATIA (Relicário de Acolhimento Angelical)
      // Ouro rosa aveludado, asas de anjo suaves no topo, 4 corações de cristal lapidados e pérolas
      // ---------------------------------------------------------------------
      case 'frame_aura_empatia_secreta':
        return (
          <g>
            <defs>
              <linearGradient id="tEmpathyGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fecdd3" />
                <stop offset="50%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            <rect x="3" y="3" width="58" height="58" rx="6" fill="#000000" opacity="0.85" />

            {/* Asas Angélicas Suaves no Topo */}
            <path d="M5 12 C0 4 12 1 18 5 C13 8 11 11 5 12 Z" fill="#fda4af" stroke="#9f1239" strokeWidth="1" />
            <path d="M59 12 C64 4 52 1 46 5 C51 8 53 11 59 12 Z" fill="#fda4af" stroke="#9f1239" strokeWidth="1" />

            {/* Chassi de Ouro Rosa Aveludado */}
            <rect x="5.5" y="5.5" width="53" height="53" rx="4" fill="#881337" stroke="#4c0519" strokeWidth="2.5" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="3" fill="#be123c" stroke="#fb7185" strokeWidth="1.5" />
            <rect x="11" y="11" width="42" height="42" rx="2" fill="url(#tEmpathyGrad)" />

            {/* Nicho Interno Rosa Acolhedor */}
            <rect x="13.5" y="13.5" width="37" height="37" rx="2" fill="#24040d" stroke="#f43f5e" strokeWidth="2" />

            {/* 4 Corações de Cristal Lapidados nos Cantos */}
            <path d="M10 14 C10 14 5 10 5 7 C5 5 7 4 9 5 C11 4 13 5 13 7 C13 10 10 14 10 14 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
            <path d="M54 14 C54 14 49 10 49 7 C49 5 51 4 53 5 C55 4 57 5 57 7 C57 10 54 14 54 14 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
            <path d="M10 58 C10 58 5 54 5 51 C5 49 7 48 9 49 C11 48 13 49 13 51 C13 54 10 58 10 58 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />
            <path d="M54 58 C54 58 49 54 49 51 C49 49 51 48 53 49 C55 48 57 49 57 51 C57 54 54 58 54 58 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" />

            {/* Pérolas Radiantes nos Pontos Centrais */}
            <circle cx="32" cy="7.5" r="2.5" fill="#ffffff" stroke="#be123c" strokeWidth="0.8" />
            <circle cx="32" cy="56.5" r="2.5" fill="#ffffff" stroke="#be123c" strokeWidth="0.8" />
            <circle cx="7.5" cy="32" r="2.5" fill="#ffffff" stroke="#be123c" strokeWidth="0.8" />
            <circle cx="56.5" cy="32" r="2.5" fill="#ffffff" stroke="#be123c" strokeWidth="0.8" />
          </g>
        );

      default:
        return (
          <g>
            <rect x="5" y="5" width="54" height="54" rx="4" fill="#3f1d0b" stroke="#1c1917" strokeWidth="2.5" />
            <rect x="8.5" y="8.5" width="47" height="47" rx="3" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
            <rect x="13.5" y="13.5" width="37" height="37" rx="2" fill="#1e1308" stroke="#fde047" strokeWidth="1.5" />
            <circle cx="10" cy="10" r="2.5" fill="#ef4444" />
            <circle cx="54" cy="10" r="2.5" fill="#ef4444" />
            <circle cx="10" cy="54" r="2.5" fill="#ef4444" />
            <circle cx="54" cy="54" r="2.5" fill="#ef4444" />
          </g>
        );
    }
  };

  return (
    <div 
      className="relative inline-flex items-center justify-center select-none"
      style={{ width: px, height: px }}
    >
      {/* Camada 1: Aura / Efeito de Fundo */}
      {showEffect && effectId !== 'effect_nenhum' && (
        <div className={`absolute inset-0 -m-2 rounded-2xl pointer-events-none ${
          effectId === 'effect_brilho_dourado' ? 'bg-amber-400/25 blur-md animate-pulse' :
          effectId === 'effect_ondas_zen' ? 'bg-cyan-400/25 blur-lg animate-ping' :
          effectId === 'effect_aurora_boreal' ? 'bg-gradient-to-tr from-emerald-500/30 to-purple-500/30 blur-md animate-pulse' :
          effectId === 'effect_chama_protetora' ? 'bg-red-500/30 blur-md animate-pulse' :
          effectId === 'effect_mente_atenta_aurora' ? 'bg-indigo-500/30 blur-lg animate-pulse' : ''
        }`} />
      )}

      {/* Camada 2: SVG de Alta Definição da Moldura + Ícone Central */}
      <svg 
        viewBox="0 0 64 64" 
        className="w-full h-full drop-shadow-2xl overflow-visible"
      >
        {/* Render da Moldura Externa (Base, Bevels, Materiais, Gemas de Canto) */}
        {renderFrameSvg()}

        {/* Render do Ícone/Avatar no Centro */}
        {renderIconSvg()}
      </svg>

      {/* Camada 3: Distintivo Flutuante (Top-Right) */}
      {showBadge && badgeId && (
        <div 
          className="absolute -top-1.5 -right-1.5 flex items-center justify-center rounded-full bg-[#090d16] border-2 border-purple-400/80 shadow-lg z-10"
          style={{ width: Math.max(18, px * 0.34), height: Math.max(18, px * 0.34) }}
        >
          <span style={{ fontSize: Math.max(10, px * 0.2) }}>
            {badgeId === 'badge_estrela_bronze' ? '⭐' :
             badgeId === 'badge_escudo_prata' ? '🛡️' :
             badgeId === 'badge_medalha_ouro' ? '🎖️' :
             badgeId === 'badge_coroa_louros' ? '👑' :
             badgeId === 'badge_asa_celestial' ? '🪽' :
             badgeId === 'badge_detetive_sentinela' ? '🔍' :
             badgeId === 'badge_precisao_absoluta' ? '🎯' : '🎖️'}
          </span>
        </div>
      )}
    </div>
  );
};
