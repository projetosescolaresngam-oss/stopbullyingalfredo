import { LevelInfo } from './types';

export const LEVEL_PROGRESSION_TABLE: LevelInfo[] = [
  { level: 1, title: 'Sentinela Aprendiz', xpRequired: 0, icon: '🌱', rewardDescription: 'Moldura Clássica de Madeira', cosmeticId: 'frame_padrao_madeira' },
  { level: 2, title: 'Observador Atento', xpRequired: 100, icon: '🦉', rewardDescription: 'Ícone Bússola da Empatia', cosmeticId: 'icon_compass_explorador' },
  { level: 3, title: 'Defensor da Empatia', xpRequired: 200, icon: '🛡️', rewardDescription: 'Moldura Prata Espelhada & Título Defensor da Empatia', cosmeticId: 'frame_prata_vigilante' },
  { level: 4, title: 'Mediador de Conflitos', xpRequired: 300, icon: '⚖️', rewardDescription: 'Ícone Livro Aberto da Lei', cosmeticId: 'icon_livro_sabedoria' },
  { level: 5, title: 'Sentinela Veterano', xpRequired: 400, icon: '🎖️', rewardDescription: 'Moldura Ouro Imperial & Emblema Medalha de Ouro', cosmeticId: 'frame_ouro_radiante' },
  { level: 6, title: 'Guardião da Convivência', xpRequired: 500, icon: '✨', rewardDescription: 'Efeito Aura de Centelhas Douradas', cosmeticId: 'effect_brilho_dourado' },
  { level: 7, title: 'Farol da Paz Escolar', xpRequired: 650, icon: '🕯️', rewardDescription: 'Moldura Esmeralda da Convivência & Título ✦ Farol da Paz ✦', cosmeticId: 'frame_esmeralda_natureza' },
  { level: 8, title: 'Estrategista do Diálogo', xpRequired: 800, icon: '🧠', rewardDescription: 'Efeito Ondas de Calma Aquática', cosmeticId: 'effect_ondas_zen' },
  { level: 9, title: 'Escudo da Coletividade', xpRequired: 1000, icon: '🏰', rewardDescription: 'Moldura Safira da Tranquilidade', cosmeticId: 'frame_safira_oceano' },
  { level: 10, title: 'Comandante da Cultura de Paz', xpRequired: 1200, icon: '🦅', rewardDescription: 'Ícone Águia Soberana & Emblema Coroa de Louros', cosmeticId: 'icon_aguia_soberana' },
  { level: 11, title: 'Mestre da Desescalada', xpRequired: 1400, icon: '🔮', rewardDescription: 'Moldura Ametista da Sabedoria & Título ✦ Mente Serena ✦', cosmeticId: 'frame_ametista_mistica' },
  { level: 12, title: 'Diplomata da Fraternidade', xpRequired: 1600, icon: '🕊️', rewardDescription: 'Moldura Cyberpunk Neon & Ícone Coroa Imperial', cosmeticId: 'frame_cyber_neon' },
  { level: 13, title: 'Sentinela de Elite', xpRequired: 1800, icon: '🐺', rewardDescription: 'Moldura Rubi Flamejante & Ícone Lobo Guardião', cosmeticId: 'frame_rubi_coragem' },
  { level: 14, title: 'Guardião dos Direitos', xpRequired: 2000, icon: '🌌', rewardDescription: 'Efeito Aurora Boreal Etérea & Emblema Asas da Justiça', cosmeticId: 'effect_aurora_boreal' },
  { level: 15, title: 'Lorde Sentinela Honorário', xpRequired: 2250, icon: '⚜️', rewardDescription: 'Moldura Prisma da Diversidade & Título ⚜ Lorde Guardião ⚜', cosmeticId: 'frame_arco_iris_paz' },
  { level: 16, title: 'Baluarte da Segurança', xpRequired: 2500, icon: '🔥', rewardDescription: 'Ícone Fênix da Renovação', cosmeticId: 'icon_fenix_imortal' },
  { level: 17, title: 'Mestre da Sabedoria Escolar', xpRequired: 2750, icon: '🌟', rewardDescription: 'Efeito Chama Protetora Astral', cosmeticId: 'effect_chama_protetora' },
  { level: 18, title: 'Lenda da Proteção Democrática', xpRequired: 3000, icon: '⚡', rewardDescription: 'Insígnia Mestre Suprema', cosmeticId: 'title_lorde_guardiao' },
  { level: 19, title: 'Grão-Mestre da Paz Universal', xpRequired: 3500, icon: '🐉', rewardDescription: 'Ícone Dragão Guardião da Sabedoria', cosmeticId: 'icon_dragao_mistico' },
  { level: 20, title: 'Guardião Supremo Imortal', xpRequired: 4000, icon: '👑', rewardDescription: 'Moldura Guardião Cósmico Imortal & Título 👑 Guardião Supremo Imortal 👑', cosmeticId: 'frame_guardiao_cosmico' }
];

export const calculateLevelFromXp = (xp: number): { currentLevel: number; nextLevelXp: number; levelTitle: string; levelIcon: string; prevLevelXp: number } => {
  let currentLevel = 1;
  let levelTitle = LEVEL_PROGRESSION_TABLE[0].title;
  let levelIcon = LEVEL_PROGRESSION_TABLE[0].icon;
  let prevLevelXp = 0;
  let nextLevelXp = LEVEL_PROGRESSION_TABLE[1].xpRequired;

  for (let i = LEVEL_PROGRESSION_TABLE.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_PROGRESSION_TABLE[i].xpRequired) {
      currentLevel = LEVEL_PROGRESSION_TABLE[i].level;
      levelTitle = LEVEL_PROGRESSION_TABLE[i].title;
      levelIcon = LEVEL_PROGRESSION_TABLE[i].icon;
      prevLevelXp = LEVEL_PROGRESSION_TABLE[i].xpRequired;
      nextLevelXp = LEVEL_PROGRESSION_TABLE[i + 1] ? LEVEL_PROGRESSION_TABLE[i + 1].xpRequired : LEVEL_PROGRESSION_TABLE[i].xpRequired + 1000;
      break;
    }
  }

  return { currentLevel, nextLevelXp, levelTitle, levelIcon, prevLevelXp };
};
