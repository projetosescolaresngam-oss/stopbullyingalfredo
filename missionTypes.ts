// Tipos oficiais do Sistema de Missões Secretas do STOPBULLYING

export type MissionDifficulty = 
  | 'facil' 
  | 'moderada' 
  | 'dificil' 
  | 'muito_dificil' 
  | 'secreta' 
  | 'especial';

export type MissionCategory = 
  | 'exploracao' 
  | 'conhecimento' 
  | 'decisao' 
  | 'cadeia' 
  | 'investigacao' 
  | 'secreta' 
  | 'diaria' 
  | 'especial';

export type MissionStatus = 
  | 'bloqueada' 
  | 'desconhecida' 
  | 'disponivel' 
  | 'em_andamento' 
  | 'concluida' 
  | 'resgatada' 
  | 'expirada';

export interface MissionHint {
  level: 1 | 2 | 3;
  title: string;
  hintText: string;
  penaltyPercent: number; // Ex: 0%, 15%, 35%, 55%
  isUnlocked?: boolean;
}

export interface DecisionOption {
  id: string;
  text: string;
  isOptimal: boolean;
  feedbackTitle: string;
  feedbackExplanation: string;
  impactAnalysis: string;
  ethicalPrinciple: string;
}

export interface DecisionScenario {
  context: string;
  question: string;
  options: DecisionOption[];
}

export interface InvestigationStep {
  stepNumber: number;
  title: string;
  instruction: string;
  triggerType: string;
  target?: string;
  isCompleted: boolean;
  clueRevealed?: string;
}

export interface MissionReward {
  baseXp: number;
  achievementId?: string;
  cosmeticId?: string;
  cosmeticName?: string;
  cosmeticType?: 'icon' | 'frame' | 'badge' | 'title' | 'effect';
  titleBadge?: string;
  specialNote?: string;
}

export type MissionTriggerType = 
  | 'visit_area' 
  | 'complete_quiz' 
  | 'answer_correctly' 
  | 'complete_sequence' 
  | 'discover_secret' 
  | 'use_feature' 
  | 'finish_chain' 
  | 'reach_level' 
  | 'solve_decision' 
  | 'enter_code' 
  | 'explore_all_types' 
  | 'perfect_quiz' 
  | 'find_easter_egg' 
  | 'breathing_session'
  | 'custom_action';

export interface MissionTrigger {
  type: MissionTriggerType;
  target?: string;
  count?: number;
}

export interface MissionDefinition {
  id: string;
  code: string; // Ex: MIS-001, DEC-002, SEC-003, OP-RESPEITO
  title: string;
  subtitle: string;
  description: string;
  loreQuote?: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  isSecret: boolean;
  isDaily?: boolean;
  dailyDate?: string;
  chainId?: string;
  chainOrder?: number;
  chainName?: string;
  requiresMissionId?: string;
  trigger: MissionTrigger;
  hints: MissionHint[];
  reward: MissionReward;
  decision?: DecisionScenario;
  steps?: InvestigationStep[];
  secretCode?: string;
  secretClueLocation?: string;
  icon?: string;
}

export interface UserMissionProgress {
  missionId: string;
  status: MissionStatus;
  discovered: boolean;
  discoveredAt?: string;
  unlockedHintsCount: number;
  currentStepIndex: number;
  completedSteps: number[];
  currentProgress: number;
  maxProgress: number;
  selectedDecisionOptionId?: string;
  completedAt?: string;
  claimedReward: boolean;
  xpClaimed?: number;
}

export interface MissionsStats {
  totalDiscovered: number;
  totalCompleted: number;
  totalSecretsFound: number;
  totalInvestigationsCompleted: number;
  totalXpEarned: number;
  currentStreak: number;
}
