/**
 * STOPBULLYING — EEMTI ALFREDO MACHADO
 * Serviço de Persistência e Progressão dos Casos Narrativos Interativos
 * 
 * - Gerenciamento seguro de estado e histórico de decisões
 * - Prevenção estrita de duplicidade de XP
 * - Alimentação do Radar de Competências com evidências pedagógicas
 * - Isolamento total e incondicional das denúncias anônimas (zero dados pessoais)
 */

import { NarrativeStory, NarrativeChoice } from '../data/narrativeStoriesData';
import { recordSingleEvidence, recordBatchEvidences } from './competencies';

export interface SavedNarrativeProgress {
  storyId: string;
  completed: boolean;
  bestScore: number;
  maxScore: number;
  bestPercent: number;
  xpEarnedTotal: number;
  attemptsCount: number;
  unlockedClueIds: string[];
  choicesHistory: Array<{
    actNumber: number;
    letter: string;
    points: number;
    impact: 'positivo' | 'neutro' | 'negativo';
    timestamp: string;
  }>;
  lastOutcomeId?: string;
  lastCompletedAt?: string;
}

const STORAGE_KEY_NARRATIVES = 'sentinela_narrative_progress_v3';

// Fallback de memória para ambientes seguros/SSR
const memoryNarratives: Record<string, string> = {};

const safeGetItem = (key: string): string | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return memoryNarratives[key] || null;
  } catch {
    return memoryNarratives[key] || null;
  }
};

const safeSetItem = (key: string, value: string): void => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
    memoryNarratives[key] = value;
  } catch {
    memoryNarratives[key] = value;
  }
};

export const getAllNarrativeProgress = (): Record<string, SavedNarrativeProgress> => {
  try {
    const raw = safeGetItem(STORAGE_KEY_NARRATIVES);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export const getNarrativeProgress = (storyId: string): SavedNarrativeProgress | null => {
  const all = getAllNarrativeProgress();
  return all[storyId] || null;
};

export interface SaveStoryCompletionResult {
  isFirstCompletion: boolean;
  xpAwarded: number;
  newBestScore: boolean;
  progress: SavedNarrativeProgress;
}

export const recordStoryCompletion = (
  story: NarrativeStory,
  studentKey: string,
  totalScore: number,
  choices: Array<{ actNumber: number; choice: NarrativeChoice }>,
  outcomeId: string
): SaveStoryCompletionResult => {
  const all = getAllNarrativeProgress();
  const existing = all[story.id];
  const isFirstCompletion = !existing || !existing.completed;
  const percent = Math.min(100, Math.round((totalScore / story.maxScore) * 100));

  let xpAwarded = 0;
  if (isFirstCompletion) {
    // XP concedido na primeira conclusão integral
    xpAwarded = story.baseRewardXp;
  } else if (totalScore > existing.bestScore) {
    // Bônus proporcional caso o estudante supere sua melhor marca anterior
    const scoreDiff = totalScore - existing.bestScore;
    const bonusXp = Math.min(30, Math.round((scoreDiff / story.maxScore) * 50));
    xpAwarded = Math.max(5, bonusXp);
  }

  const updatedChoicesHistory = choices.map(c => ({
    actNumber: c.actNumber,
    letter: c.choice.letter,
    points: c.choice.points,
    impact: c.choice.impact,
    timestamp: new Date().toISOString()
  }));

  const updatedProgress: SavedNarrativeProgress = {
    storyId: story.id,
    completed: true,
    bestScore: existing ? Math.max(existing.bestScore, totalScore) : totalScore,
    maxScore: story.maxScore,
    bestPercent: existing ? Math.max(existing.bestPercent, percent) : percent,
    xpEarnedTotal: (existing?.xpEarnedTotal || 0) + xpAwarded,
    attemptsCount: (existing?.attemptsCount || 0) + 1,
    unlockedClueIds: Array.from(new Set([
      ...(existing?.unlockedClueIds || []),
      ...story.investigationItems.map(item => item.id)
    ])),
    choicesHistory: updatedChoicesHistory,
    lastOutcomeId: outcomeId,
    lastCompletedAt: new Date().toISOString()
  };

  all[story.id] = updatedProgress;
  safeSetItem(STORAGE_KEY_NARRATIVES, JSON.stringify(all));

  // =========================================================================
  // ALIMENTAÇÃO DO RADAR DE COMPETÊNCIAS PEDAGÓGICAS
  // =========================================================================
  const ratio = Math.max(0, Math.min(1, totalScore / story.maxScore));
  
  // Registra evidências para as competências trabalhadas na narrativa
  const competencyEvidences = story.competenciesWorked.map(comp => {
    const validComp = (comp === 'emocional' ? 'convivencia' : comp) as any;
    return {
      activityId: `${story.id}_${validComp}_ato5`,
      activityTitle: `Caso: ${story.title} (${validComp.toUpperCase()})`,
      origin: 'historia_interativa' as const,
      competency: validComp,
      difficulty: story.difficulty === 'impossivel' 
        ? ('supremo' as const) 
        : story.difficulty === 'dificil' 
        ? ('dificil' as const) 
        : ('medio' as const),
      weight: story.difficulty === 'impossivel' ? 3.0 : 2.5,
      isCorrect: ratio >= 0.7,
      scoreRatio: ratio,
      category: 'historia'
    };
  });

  recordBatchEvidences(studentKey, competencyEvidences);

  return {
    isFirstCompletion,
    xpAwarded,
    newBestScore: !existing || totalScore > existing.bestScore,
    progress: updatedProgress
  };
};

export interface NarrativeSummaryStats {
  totalStories: number;
  completedCount: number;
  totalXpFromNarratives: number;
  averageAssertiveness: number;
  unlockedCluesCount: number;
}

export const getNarrativeSummaryStats = (stories: NarrativeStory[]): NarrativeSummaryStats => {
  const all = getAllNarrativeProgress();
  const completedList = Object.values(all).filter(p => p.completed);

  const completedCount = completedList.length;
  const totalXp = completedList.reduce((acc, p) => acc + (p.xpEarnedTotal || 0), 0);
  const avgAssertiveness = completedCount > 0
    ? Math.round(completedList.reduce((acc, p) => acc + p.bestPercent, 0) / completedCount)
    : 0;

  const allClues = new Set<string>();
  completedList.forEach(p => {
    p.unlockedClueIds.forEach(id => allClues.add(id));
  });

  return {
    totalStories: stories.length,
    completedCount,
    totalXpFromNarratives: totalXp,
    averageAssertiveness: avgAssertiveness,
    unlockedCluesCount: allClues.size
  };
};
