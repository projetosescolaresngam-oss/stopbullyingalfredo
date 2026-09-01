export type ViewMode = 
  | 'home'
  | 'denuncia'
  | 'apoio'
  | 'triagem'
  | 'quiz'
  | 'sos'
  | 'ceara'
  | 'galeria'
  | 'gestao'
  | 'conquistas'
  | 'colecao'
  | 'guia'
  | 'educativo';

export type ViolenceType = 
  | 'Verbal'
  | 'Física'
  | 'Psicológica'
  | 'Cyberbullying'
  | 'Social';

export type SchoolLocation = 
  | 'Sala de Aula'
  | 'Pátio/Recreio'
  | 'Corredor/Escada'
  | 'Banheiro'
  | 'Transporte Escolar'
  | 'Entorno da Escola'
  | 'Redes Sociais';

export type ComplaintStatus = 'Em Análise' | 'Acolhido' | 'Resolvido';

export type MediaType = 'foto' | 'video' | 'audio';

export interface Denuncia {
  id: string;
  protocolo: string;
  tipo_violencia: ViolenceType | string;
  local_escola: SchoolLocation | string;
  descricao: string;
  link_cyberbullying?: string;
  midia_anexa?: string | null;
  midia_tipo?: MediaType | null;
  midia_duracao?: number;
  data_envio: string;
  status: ComplaintStatus;
  nivel_gravidade?: 'Leve' | 'Recorrente' | 'Grave' | 'Pendente';
}

export interface QuizQuestion {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
  referencia: string;
}

export interface MaterialApoio {
  id: string;
  titulo: string;
  categoria: 'Saúde Mental' | 'Emergência' | 'Legislação' | 'Prevenção';
  conteudo: string;
  link_externo?: string;
  icone: string;
}

export interface SOSAlert {
  id: string;
  latitude?: number;
  longitude?: number;
  precisao_metros?: number;
  dispositivo_info: string;
  data_disparo: string;
  status: 'URGENTE' | 'ATENDIDO';
}

// Gamificação & Cosméticos
export type CosmeticCategory = 'icon' | 'frame' | 'badge' | 'title' | 'effect';
export type CosmeticRarity = 'comum' | 'raro' | 'epico' | 'lendario' | 'mitico';

export interface CosmeticUnlockCondition {
  type: 'level' | 'achievement' | 'quiz' | 'simulation' | 'breathing' | 'special_secret' | 'default';
  requiredLevel?: number;
  achievementId?: string;
  quizScorePercent?: number;
  description: string;
}

export interface CosmeticItem {
  id: string;
  category: CosmeticCategory;
  name: string;
  description: string;
  rarity: CosmeticRarity;
  unlockCondition: CosmeticUnlockCondition;
  isSecret?: boolean;
  previewColor?: string;
  svgData?: string;
  loreQuote?: string;
}

export interface UserGamificationProfile {
  currentLevel: number;
  currentXp: number;
  nextLevelXp: number;
  levelTitle: string;
  equippedIconId: string;
  equippedFrameId: string;
  equippedBadgeId: string;
  equippedTitleId: string;
  equippedEffectId: string;
  unlockedCosmetics: string[];
}

export interface AnonymousStudentIdentity {
  code: string;
  creationTimestamp: number;
  studentSeed: string;
}

// Conquistas
export type AchievementTier = 'bronze' | 'prata' | 'ouro' | 'lendario';
export type AchievementCategory = 'sabedoria' | 'detetive' | 'empatia' | 'zen' | 'escudo';

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  unlockedDescription?: string;
  funnyQuote?: string;
  funnySticker: string;
  category: AchievementCategory;
  tier: AchievementTier;
  iconType: string;
  isUnlocked: boolean;
  isSecret?: boolean;
  xpReward?: number;
  secretRewardCosmeticId?: string;
  currentProgress: number;
  maxProgress: number;
  progressUnit?: string;
  requirementHint: string;
}

// Níveis
export interface LevelInfo {
  level: number;
  title: string;
  xpRequired: number;
  icon: string;
  rewardDescription: string;
  cosmeticId?: string;
}

// Educativo & Matriz de Bullying
export interface BullyingTypeDetail {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    glow: string;
  };
  examples: string[];
  warningSigns: string[];
  howToActStudent: string[];
  howToActWitness: string[];
  legalFramework?: string;
  severityLevel: 'moderado' | 'grave' | 'critico';
}

export interface LawArticle {
  number: string;
  title: string;
  content: string;
  practicalApplication: string;
}

export interface RespectGuideTopic {
  id: string;
  title: string;
  icon: string;
  description: string;
  actionPoints: string[];
  reflectionQuote: string;
}

