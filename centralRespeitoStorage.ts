import { ChallengeDifficulty, QuizChallenge } from '../data/centralRespeitoData';

export interface ChallengeUserProgress {
  challengeId: string;
  completed: boolean;
  bestScore: number;
  totalQuestions: number;
  bestPercent: number;
  attemptsCount: number;
  highestStreak: number;
  lastCompletedAt?: string;
}

export interface CompetencyScore {
  correct: number;
  total: number;
}

export interface UserCompetencyRegistry {
  respeito: CompetencyScore;
  convivencia: CompetencyScore;
  bullying: CompetencyScore;
  cyber: CompetencyScore;
  direitos: CompetencyScore;
}

const STORAGE_KEY_PROGRESS = 'sentinela_central_respeito_progress_v2';
const STORAGE_KEY_COMPETENCIES = 'sentinela_central_respeito_competencies_v2';
const STORAGE_KEY_EASTER_EGG = 'sentinela_central_respeito_secret_unlocked';

export const getSavedChallengeProgress = (): Record<string, ChallengeUserProgress> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export const saveChallengeResult = (
  challengeId: string,
  score: number,
  totalQuestions: number,
  maxStreak: number
): ChallengeUserProgress => {
  const current = getSavedChallengeProgress();
  const existing = current[challengeId];
  const percent = Math.round((score / totalQuestions) * 100);

  const updated: ChallengeUserProgress = {
    challengeId,
    completed: true,
    bestScore: existing ? Math.max(existing.bestScore, score) : score,
    totalQuestions,
    bestPercent: existing ? Math.max(existing.bestPercent, percent) : percent,
    attemptsCount: (existing?.attemptsCount || 0) + 1,
    highestStreak: existing ? Math.max(existing.highestStreak, maxStreak) : maxStreak,
    lastCompletedAt: new Date().toISOString()
  };

  current[challengeId] = updated;

  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(current));
  } catch (err) {
    console.error('Erro ao salvar progresso do desafio', err);
  }

  return updated;
};

export const getCompetencyRegistry = (): UserCompetencyRegistry => {
  const defaultRegistry: UserCompetencyRegistry = {
    respeito: { correct: 0, total: 0 },
    convivencia: { correct: 0, total: 0 },
    bullying: { correct: 0, total: 0 },
    cyber: { correct: 0, total: 0 },
    direitos: { correct: 0, total: 0 }
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPETENCIES);
    if (!raw) return defaultRegistry;
    return { ...defaultRegistry, ...JSON.parse(raw) };
  } catch {
    return defaultRegistry;
  }
};

export const recordCompetencyAnswers = (
  answers: Array<{ competencia: 'respeito' | 'convivencia' | 'bullying' | 'cyber' | 'direitos'; isCorrect: boolean }>
): UserCompetencyRegistry => {
  const current = getCompetencyRegistry();

  answers.forEach(({ competencia, isCorrect }) => {
    if (!current[competencia]) {
      current[competencia] = { correct: 0, total: 0 };
    }
    current[competencia].total += 1;
    if (isCorrect) {
      current[competencia].correct += 1;
    }
  });

  try {
    localStorage.setItem(STORAGE_KEY_COMPETENCIES, JSON.stringify(current));
  } catch (err) {
    console.error('Erro ao salvar competências', err);
  }

  return current;
};

export const isEasterEggUnlocked = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY_EASTER_EGG) === 'true';
  } catch {
    return false;
  }
};

export const unlockEasterEgg = (): void => {
  try {
    localStorage.setItem(STORAGE_KEY_EASTER_EGG, 'true');
  } catch (err) {
    console.error('Erro ao salvar easter egg', err);
  }
};

/**
 * Avalia se o desafio está desbloqueado para o usuário
 */
export const checkIsChallengeUnlocked = (
  challenge: QuizChallenge,
  progress: Record<string, ChallengeUserProgress>
): { isUnlocked: boolean; reason?: string } => {
  // Desafios regulares sempre desbloqueados
  if (!challenge.isSecret && challenge.id !== 'desafio_supremo') {
    return { isUnlocked: true };
  }

  const completedList = Object.values(progress).filter(p => p.completed && p.bestPercent >= 60);

  // Desafio Supremo: Requer pelo menos 3 desafios concluídos com >= 60%
  if (challenge.id === 'desafio_supremo') {
    const required = 3;
    if (completedList.length >= required) {
      return { isUnlocked: true };
    }
    return {
      isUnlocked: false,
      reason: `Complete pelo menos 3 desafios regulares com 60%+ de acertos para desbloquear (${completedList.length}/${required}).`
    };
  }

  // Desafio Secreto: Requer easter egg OU streak >= 5 OU 5 desafios concluídos
  if (challenge.id === 'desafio_secreto') {
    const hasEasterEgg = isEasterEggUnlocked();
    const hasHighStreak = Object.values(progress).some(p => p.highestStreak >= 5);
    const has5Completed = completedList.length >= 5;

    if (hasEasterEgg || hasHighStreak || has5Completed) {
      return { isUnlocked: true };
    }

    return {
      isUnlocked: false,
      reason: 'Encontre o segredo na Central ou alcance uma sequência de 5 acertos seguidos em qualquer desafio.'
    };
  }

  return { isUnlocked: true };
};
