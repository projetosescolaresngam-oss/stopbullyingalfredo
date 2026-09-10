import React from 'react';
import {
  renderWoodFrameBackdrop,
  renderWoodFrameForeground,
  renderBronzeFrameBackdrop,
  renderBronzeFrameForeground,
  renderSilverFrameBackdrop,
  renderSilverFrameForeground
} from './CommonFrames';
import {
  renderGoldFrameBackdrop,
  renderGoldFrameForeground,
  renderEmeraldFrameBackdrop,
  renderEmeraldFrameForeground,
  renderSapphireFrameBackdrop,
  renderSapphireFrameForeground,
  renderMatrixFrameBackdrop,
  renderMatrixFrameForeground,
  renderEmpathyFrameBackdrop,
  renderEmpathyFrameForeground
} from './EpicFrames';
import {
  renderAmethystFrameBackdrop,
  renderAmethystFrameForeground,
  renderRubyFrameBackdrop,
  renderRubyFrameForeground,
  renderRainbowFrameBackdrop,
  renderRainbowFrameForeground,
  renderCyberFrameBackdrop,
  renderCyberFrameForeground
} from './LegendaryFrames';
import {
  renderCosmicFrameBackdrop,
  renderCosmicFrameForeground
} from './MythicFrames';
import {
  renderLionFrameBackdrop,
  renderLionFrameForeground,
  renderCelestialLionsFrameBackdrop,
  renderCelestialLionsFrameForeground,
  renderGoldenLionFrameBackdrop,
  renderGoldenLionFrameForeground
} from './LionFrame';

export { FrameDefs } from './FrameDefs';
export {
  renderLionFrameBackdrop,
  renderLionFrameForeground,
  renderCelestialLionsFrameBackdrop,
  renderCelestialLionsFrameForeground,
  renderGoldenLionFrameBackdrop,
  renderGoldenLionFrameForeground
} from './LionFrame';

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
