import React from 'react';
import { FrameDefs, renderFrameBackdrop, renderFrameForeground } from './frames';

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
  showBadge = false,
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
      case 'icon_gojo_satoru':
        return (
          <image 
            href="/icone_gojo_satoru.png" 
            x="15" 
            y="15" 
            width="34" 
            height="34" 
            preserveAspectRatio="xMidYMid meet" 
          />
        );
      case 'icon_compass_explorador':
        return (
          <g transform="translate(18, 18)">
            {/* Bússola Náutica Dourada */}
            <circle cx="14" cy="14" r="11" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="14" cy="14" r="9" fill="#1e293b" stroke="#38bdf8" strokeWidth="0.8" />
            <polygon points="14,5 17,14 14,12 11,14" fill="#38bdf8" />
            <polygon points="14,23 17,14 14,16 11,14" fill="#ef4444" />
            <polygon points="5,14 14,17 12,14 14,11" fill="#facc15" />
            <polygon points="23,14 14,17 16,14 14,11" fill="#facc15" />
            <circle cx="14" cy="14" r="2" fill="#ffffff" stroke="#0f172a" strokeWidth="0.8" />
          </g>
        );
      case 'icon_estrela_guia':
        return (
          <g transform="translate(18, 18)">
            {/* Estrela Polar da Paz */}
            <circle cx="14" cy="14" r="10" fill="none" stroke="#fde047" strokeWidth="0.8" strokeDasharray="2,2" />
            <polygon points="14,2 17,11 26,14 17,17 14,26 11,17 2,14 11,11" fill="#facc15" stroke="#ffffff" strokeWidth="1.2" />
            <polygon points="14,7 16,12 21,14 16,16 14,21 12,16 7,14 12,12" fill="#ffffff" />
            <circle cx="14" cy="14" r="2" fill="#f59e0b" />
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
      case 'icon_trofeu_campeao':
        return (
          <g transform="translate(18, 18)">
            {/* Cálice da Convivência */}
            <path d="M7 5 L21 5 L19 15 C19 18 16 20 14 20 C12 20 9 18 9 15 Z" fill="#eab308" stroke="#fef08a" strokeWidth="1.2" />
            <path d="M7 8 C4 8 4 12 7 13" stroke="#ca8a04" strokeWidth="1.5" fill="none" />
            <path d="M21 8 C24 8 24 12 21 13" stroke="#ca8a04" strokeWidth="1.5" fill="none" />
            <rect x="12" y="20" width="4" height="4" fill="#ca8a04" />
            <rect x="8" y="24" width="12" height="3" rx="1" fill="#a16207" stroke="#fde047" strokeWidth="0.8" />
            <circle cx="14" cy="11" r="2" fill="#10b981" stroke="#ffffff" strokeWidth="0.6" />
          </g>
        );
      case 'icon_raio_acao':
        return (
          <g transform="translate(18, 18)">
            {/* Raio da Atitude Rápida */}
            <polygon points="16,2 6,14 13,14 11,26 22,12 15,12" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="15,5 9,13 13,13 12,21 18,13 15,13" fill="#ffffff" />
          </g>
        );
      case 'icon_chama_coragem':
      case 'icon_kakashi_chibi':
      case 'icon_kakashi_hatake':
        return (
          <image 
            href="/icone_kakashi_hatake.png" 
            x="15" 
            y="15" 
            width="34" 
            height="34" 
            preserveAspectRatio="xMidYMid meet" 
          />
        );
      case 'icon_cerebro_sabio':
        return (
          <g transform="translate(18, 18)">
            {/* Mente Estrategista */}
            <path d="M8 8 C5 8 5 12 6 15 C4 17 5 21 8 22 C10 22 12 21 13 19 L13 7 C11 7 9 7 8 8 Z" fill="#9333ea" stroke="#c084fc" strokeWidth="1" />
            <path d="M20 8 C23 8 23 12 22 15 C24 17 23 21 20 22 C18 22 16 21 15 19 L15 7 C17 7 19 7 20 8 Z" fill="#7e22ce" stroke="#c084fc" strokeWidth="1" />
            <circle cx="9.5" cy="11.5" r="1" fill="#38bdf8" />
            <circle cx="18.5" cy="11.5" r="1" fill="#38bdf8" />
            <circle cx="10" cy="17" r="1" fill="#facc15" />
            <circle cx="18" cy="17" r="1" fill="#facc15" />
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
      case 'icon_coroa_sabedoria':
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
      case 'icon_lobo_guardiao':
        return (
          <g transform="translate(18, 18)">
            {/* Lobo Guardião da Matilha */}
            <polygon points="14,5 21,9 23,17 19,25 14,24 9,25 5,17 7,9" fill="#334155" stroke="#94a3b8" strokeWidth="1.2" />
            <polygon points="7,9 9,4 12,8" fill="#64748b" />
            <polygon points="21,9 19,4 16,8" fill="#64748b" />
            <polygon points="14,12 17,19 14,23 11,19" fill="#1e293b" />
            <circle cx="10.5" cy="13.5" r="1.2" fill="#38bdf8" />
            <circle cx="17.5" cy="13.5" r="1.2" fill="#38bdf8" />
          </g>
        );
      case 'icon_portal_dimensional':
        return (
          <g transform="translate(18, 18)">
            {/* Portal Cósmico */}
            <circle cx="14" cy="14" r="10" fill="#090514" stroke="#818cf8" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="7" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="4,2" />
            <circle cx="14" cy="14" r="4" fill="#38bdf8" />
            <circle cx="14" cy="14" r="1.5" fill="#ffffff" />
          </g>
        );
      case 'icon_lenda_suprema':
        return (
          <g transform="translate(18, 18)">
            {/* Orbe Cósmico Supremo */}
            <circle cx="14" cy="14" r="7" fill="#7e22ce" stroke="#e9d5ff" strokeWidth="1.5" />
            <ellipse cx="14" cy="14" rx="11" ry="4" fill="none" stroke="#facc15" strokeWidth="1.5" transform="rotate(-25 14 14)" />
            <ellipse cx="14" cy="14" rx="11" ry="4" fill="none" stroke="#38bdf8" strokeWidth="1" transform="rotate(35 14 14)" />
            <circle cx="14" cy="14" r="3" fill="#ffffff" />
          </g>
        );
      case 'icon_fenix_imortal':
        return (
          <g transform="translate(18, 18)">
            {/* Fênix da Renovação */}
            <path d="M14 6 C11 11 8 13 4 11 C7 16 11 18 14 24 C17 18 21 16 24 11 C20 13 17 11 14 6 Z" fill="#ea580c" stroke="#fed7aa" strokeWidth="1" />
            <polygon points="14,4 16,9 14,8 12,9" fill="#facc15" />
            <circle cx="14" cy="10" r="1.5" fill="#ffffff" />
            <path d="M10 14 Q14 17 18 14" stroke="#fef08a" strokeWidth="1.5" fill="none" />
          </g>
        );
      case 'icon_pomba_paz':
        return (
          <g transform="translate(18, 18)">
            {/* Pomba da Fraternidade */}
            <path d="M7 16 C5 11 9 7 14 9 C18 6 22 8 23 11 C20 11 18 13 18 16 C18 19 14 21 10 20 C8 20 6 18 7 16 Z" fill="#e0e7ff" stroke="#ffffff" strokeWidth="1.2" />
            <path d="M18 11 Q23 7 24 6" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="19" cy="10" r="0.8" fill="#1e1b4b" />
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
      case 'icon_robo_eco':
        return (
          <g transform="translate(18, 18)">
            {/* Sentinela Mecatrônico */}
            <line x1="14" y1="2" x2="14" y2="7" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="14" cy="2" r="1.5" fill="#facc15" />
            <rect x="6" y="7" width="16" height="13" rx="3" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.2" />
            <rect x="8" y="10" width="12" height="7" rx="1.5" fill="#082f49" />
            <circle cx="11" cy="13.5" r="1.5" fill="#38bdf8" />
            <circle cx="17" cy="13.5" r="1.5" fill="#38bdf8" />
            <rect x="11" y="21" width="6" height="3" rx="1" fill="#0369a1" />
          </g>
        );
      case 'icon_escudo_aprendiz':
      case 'icon_luffy_gear5':
        return (
          <image 
            href="/icone_luffy_gear5.png" 
            x="15" 
            y="15" 
            width="34" 
            height="34" 
            preserveAspectRatio="xMidYMid meet" 
          />
        );
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

      {/* Camada 2: SVG de Alta Definição da Moldura Colecionável (Brawl Stars & Clash Royale Style) */}
      <svg 
        viewBox="0 0 64 64" 
        className="w-full h-full drop-shadow-2xl overflow-visible"
      >
        {/* Definições Compartilhadas de Gradientes e Materiais */}
        <FrameDefs />

        {/* Camada A: Fundo, Silhuetas Sobressalentes, Asas, Chifres e Nicho */}
        {renderFrameBackdrop(frameId)}

        {/* Camada B: Ícone / Avatar Central (Confinado estritamente ao nicho do avatar para que a moldura o sobreponha) */}
        <g id="avatar_central_icon_layer" clipPath="url(#avatarInnerApertureClip)">
          {renderIconSvg()}
        </g>

        {/* Camada C: Moldura Frontal Bevelada 3D, Cantoneiras, Brasões, Coroas e Gemas (Wrap 3D - Sobrepõe o Avatar) */}
        {renderFrameForeground(frameId)}
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
