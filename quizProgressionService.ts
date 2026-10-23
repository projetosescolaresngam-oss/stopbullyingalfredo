import { ALL_QUIZZES, QuizItem, DifficultyLevel, QuestionCategory, getQuizById } from '../data/questionBank';

export interface QuizCompletionRecord {
  quizId: string;
  completedAt: string;
  xpAwarded: number;
  score: number; // e.g., 100
  answers: number[];
  difficulty: DifficultyLevel;
  category: QuestionCategory;
}

export interface StudentQuizProgress {
  studentKey: string;
  completedQuizzes: Record<string, QuizCompletionRecord>;
  lastCompletedQuizId?: string;
  totalXpEarned: number;
  lastUpdatedAt: string;
}

export interface DailyMissionDefinition {
  id: string;
  title: string;
  description: string;
  category: 'quiz' | 'zen' | 'exploracao' | 'avancado';
  xpReward: number;
  icon: string;
  requiredCount: number;
  evaluate: (progress: StudentQuizProgress, dayCompletedIds: string[]) => { current: number; completed: boolean };
}

export interface DailyMissionState {
  missionId: string;
  title: string;
  description: string;
  xpReward: number;
  icon: string;
  current: number;
  required: number;
  completed: boolean;
  claimed: boolean;
}

const STORAGE_PREFIX = 'sentinela_quiz_progress_v3_';
const DAILY_MISSIONS_STORAGE_PREFIX = 'sentinela_daily_missions_v3_';

// Locks em memória para evitar cliques duplos simultâneos
const submissionLocks = new Set<string>();

/**
 * Normaliza a chave do estudante para garantir persistência estável
 */
const cleanKey = (studentKey: string): string => {
  return (studentKey || 'anonimo_padrao').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
};

/**
 * Retorna a data de hoje no formato YYYY-MM-DD
 */
export const getTodayDateKey = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Obtém o progresso de quizzes do estudante
 */
export const getStudentQuizProgress = (studentKey: string): StudentQuizProgress => {
  const key = `${STORAGE_PREFIX}${cleanKey(studentKey)}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return {
        studentKey,
        completedQuizzes: {},
        totalXpEarned: 0,
        lastUpdatedAt: new Date().toISOString()
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      studentKey,
      completedQuizzes: {},
      totalXpEarned: 0,
      lastUpdatedAt: new Date().toISOString()
    };
  }
};

/**
 * Salva o progresso do estudante de forma segura
 */
const saveStudentQuizProgress = (progress: StudentQuizProgress): void => {
  const key = `${STORAGE_PREFIX}${cleanKey(progress.studentKey)}`;
  try {
    progress.lastUpdatedAt = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (err) {
    console.error('Falha ao persistir progresso de quizzes:', err);
  }
};

/**
 * Verifica se um quiz já foi concluído pelo estudante
 */
export const isQuizCompleted = (quizId: string, studentKey: string): boolean => {
  const progress = getStudentQuizProgress(studentKey);
  return Boolean(progress.completedQuizzes[quizId]);
};

/**
 * Retorna a lista de IDs de quizzes concluídos pelo estudante
 */
export const getCompletedQuizIds = (studentKey: string): string[] => {
  const progress = getStudentQuizProgress(studentKey);
  return Object.keys(progress.completedQuizzes);
};

/**
 * Registra a conclusão de um quiz.
 * Retorna isFirstCompletion = true se o estudante nunca concluiu esse quiz antes (concedendo XP).
 * Se já tiver concluído, isFirstCompletion = false e xpEarned = 0 (modo de revisão educativa).
 */
export const recordQuizCompletion = (
  quizId: string,
  studentKey: string,
  score: number = 100,
  answers: number[] = []
): { isFirstCompletion: boolean; xpEarned: number; quiz: QuizItem | undefined } => {
  const lockKey = `${studentKey}_${quizId}`;
  if (submissionLocks.has(lockKey)) {
    const quiz = getQuizById(quizId);
    return { isFirstCompletion: false, xpEarned: 0, quiz };
  }

  submissionLocks.add(lockKey);
  try {
    const quiz = getQuizById(quizId);
    if (!quiz) {
      return { isFirstCompletion: false, xpEarned: 0, quiz: undefined };
    }

    const progress = getStudentQuizProgress(studentKey);
    const existing = progress.completedQuizzes[quizId];

    if (existing) {
      // Já foi concluído anteriormente! Não concede novo XP.
      return {
        isFirstCompletion: false,
        xpEarned: 0,
        quiz
      };
    }

    // Primeira conclusão! Concede o XP da dificuldade do quiz
    const xpEarned = quiz.xpRecompensa;
    const record: QuizCompletionRecord = {
      quizId,
      completedAt: new Date().toISOString(),
      xpAwarded: xpEarned,
      score,
      answers,
      difficulty: quiz.dificuldade,
      category: quiz.categoria
    };

    progress.completedQuizzes[quizId] = record;
    progress.lastCompletedQuizId = quizId;
    progress.totalXpEarned += xpEarned;

    saveStudentQuizProgress(progress);

    return {
      isFirstCompletion: true,
      xpEarned,
      quiz
    };
  } finally {
    setTimeout(() => {
      submissionLocks.delete(lockKey);
    }, 400);
  }
};

/**
 * Selecionador inteligente do PRÓXIMO QUIZ RECOMENDADO.
 * Exclui quizzes já concluídos pelo estudante.
 * Alterna categorias e prioriza a dificuldade solicitada ou recomendada.
 */
export const getNextRecommendedQuiz = (
  studentKey: string,
  options?: {
    preferredDifficulty?: DifficultyLevel;
    preferredCategory?: QuestionCategory;
  }
): QuizItem | null => {
  const progress = getStudentQuizProgress(studentKey);
  const completedIds = new Set(Object.keys(progress.completedQuizzes));

  // Todos os quizzes elegíveis não concluídos
  const uncompleted = ALL_QUIZZES.filter(q => !completedIds.has(q.id));

  if (uncompleted.length === 0) {
    return null; // Todos os 100 quizzes foram concluídos!
  }

  // 1. Tenta filtrar pela dificuldade preferida
  if (options?.preferredDifficulty) {
    const byDiff = uncompleted.filter(q => q.dificuldade === options.preferredDifficulty);
    if (byDiff.length > 0) {
      // Tenta variar categoria da última feita
      const lastRecord = progress.lastCompletedQuizId ? progress.completedQuizzes[progress.lastCompletedQuizId] : null;
      if (lastRecord) {
        const differentCat = byDiff.filter(q => q.categoria !== lastRecord.category);
        if (differentCat.length > 0) return differentCat[0];
      }
      return byDiff[0];
    }
  }

  // 2. Tenta filtrar pela categoria preferida
  if (options?.preferredCategory) {
    const byCat = uncompleted.filter(q => q.categoria === options.preferredCategory);
    if (byCat.length > 0) return byCat[0];
  }

  // 3. Rotação balanceada automática:
  // Descobre qual dificuldade tem mais quizzes pendentes
  const diffOrder: DifficultyLevel[] = ['facil', 'medio', 'dificil', 'impossivel'];
  const lastRecord = progress.lastCompletedQuizId ? progress.completedQuizzes[progress.lastCompletedQuizId] : null;
  const lastDiff = lastRecord?.difficulty || 'impossivel';
  
  // Próxima dificuldade no ciclo (ex: fez facil -> sugere medio -> dificil -> impossivel -> facil)
  const nextDiffIndex = (diffOrder.indexOf(lastDiff) + 1) % diffOrder.length;
  const prioritizedDiff = diffOrder[nextDiffIndex];

  const inPrioritized = uncompleted.filter(q => q.dificuldade === prioritizedDiff);
  if (inPrioritized.length > 0) {
    return inPrioritized[0];
  }

  // Fallback: pega o primeiro não concluído
  return uncompleted[0];
};

/**
 * Estatísticas completas de quizzes para exibição na interface
 */
export const getQuizProgressionStats = (studentKey: string) => {
  const progress = getStudentQuizProgress(studentKey);
  const completedIds = new Set(Object.keys(progress.completedQuizzes));

  const totalAll = ALL_QUIZZES.length;
  const totalCompleted = completedIds.size;
  const totalAvailable = Math.max(0, totalAll - totalCompleted);

  const byDifficulty: Record<DifficultyLevel, { total: number; completed: number; available: number }> = {
    facil: { total: 0, completed: 0, available: 0 },
    medio: { total: 0, completed: 0, available: 0 },
    dificil: { total: 0, completed: 0, available: 0 },
    impossivel: { total: 0, completed: 0, available: 0 }
  };

  ALL_QUIZZES.forEach(q => {
    byDifficulty[q.dificuldade].total += 1;
    if (completedIds.has(q.id)) {
      byDifficulty[q.dificuldade].completed += 1;
    } else {
      byDifficulty[q.dificuldade].available += 1;
    }
  });

  return {
    totalAll,
    totalCompleted,
    totalAvailable,
    percentComplete: Math.round((totalCompleted / totalAll) * 100),
    totalXpEarned: progress.totalXpEarned,
    byDifficulty
  };
};

// =========================================================================
// SISTEMA DETERMINÍSTICO DE MISSÕES DIÁRIAS (Item 6)
// =========================================================================

const DAILY_MISSION_POOL: DailyMissionDefinition[] = [
  {
    id: 'mis_dia_intro',
    title: 'Desafio Inicial do Dia',
    description: 'Conclua pelo menos 1 quiz de nível Fácil ou Médio hoje.',
    category: 'quiz',
    xpReward: 25,
    icon: '🌱',
    requiredCount: 1,
    evaluate: (progress, dayCompletedIds) => {
      const dayQuizzes = dayCompletedIds
        .map(id => progress.completedQuizzes[id])
        .filter(r => r && (r.difficulty === 'facil' || r.difficulty === 'medio'));
      return { current: Math.min(1, dayQuizzes.length), completed: dayQuizzes.length >= 1 };
    }
  },
  {
    id: 'mis_dia_leis',
    title: 'Guardião Jurídico',
    description: 'Resolva 1 desafio de Legislação ou Direitos no Quiz de Respeito.',
    category: 'quiz',
    xpReward: 35,
    icon: '⚖️',
    requiredCount: 1,
    evaluate: (progress, dayCompletedIds) => {
      const dayQuizzes = dayCompletedIds
        .map(id => progress.completedQuizzes[id])
        .filter(r => r && (r.category === 'legislacao' || r.category === 'direitos'));
      return { current: Math.min(1, dayQuizzes.length), completed: dayQuizzes.length >= 1 };
    }
  },
  {
    id: 'mis_dia_avancado',
    title: 'Provação Máxima',
    description: 'Supere 1 quiz desafiador de nível Difícil ou Impossível.',
    category: 'avancado',
    xpReward: 50,
    icon: '🔥',
    requiredCount: 1,
    evaluate: (progress, dayCompletedIds) => {
      const dayQuizzes = dayCompletedIds
        .map(id => progress.completedQuizzes[id])
        .filter(r => r && (r.difficulty === 'dificil' || r.difficulty === 'impossivel'));
      return { current: Math.min(1, dayQuizzes.length), completed: dayQuizzes.length >= 1 };
    }
  },
  {
    id: 'mis_dia_dupla',
    title: 'Sequência do Saber',
    description: 'Complete 2 quizzes inéditos no mesmo dia.',
    category: 'quiz',
    xpReward: 40,
    icon: '⚡',
    requiredCount: 2,
    evaluate: (progress, dayCompletedIds) => {
      return { current: Math.min(2, dayCompletedIds.length), completed: dayCompletedIds.length >= 2 };
    }
  },
  {
    id: 'mis_dia_cyber',
    title: 'Sentinela Digital',
    description: 'Resolva 1 quiz da categoria Vida Online / Cyberbullying.',
    category: 'quiz',
    xpReward: 30,
    icon: '📱',
    requiredCount: 1,
    evaluate: (progress, dayCompletedIds) => {
      const dayQuizzes = dayCompletedIds
        .map(id => progress.completedQuizzes[id])
        .filter(r => r && r.category === 'cyber');
      return { current: Math.min(1, dayQuizzes.length), completed: dayQuizzes.length >= 1 };
    }
  },
  {
    id: 'mis_dia_empatia',
    title: 'Coração Empático',
    description: 'Conclua 1 desafio de Empatia ou Convivência Pacífica.',
    category: 'quiz',
    xpReward: 30,
    icon: '💛',
    requiredCount: 1,
    evaluate: (progress, dayCompletedIds) => {
      const dayQuizzes = dayCompletedIds
        .map(id => progress.completedQuizzes[id])
        .filter(r => r && (r.category === 'empatia' || r.category === 'convivencia'));
      return { current: Math.min(1, dayQuizzes.length), completed: dayQuizzes.length >= 1 };
    }
  }
];

/**
 * Retorna as missões ativas para o dia atual de forma determinística
 */
export const getDailyMissions = (studentKey: string): DailyMissionState[] => {
  const today = getTodayDateKey();
  const progress = getStudentQuizProgress(studentKey);

  // Filtra quizzes concluídos HOJE pelo estudante
  const dayCompletedIds = Object.values(progress.completedQuizzes)
    .filter(record => record.completedAt.startsWith(today))
    .map(r => r.quizId);

  // Registro de missões diárias já resgatadas hoje
  const claimedKey = `${DAILY_MISSIONS_STORAGE_PREFIX}${cleanKey(studentKey)}_${today}`;
  let claimedSet: Set<string>;
  try {
    const raw = localStorage.getItem(claimedKey);
    claimedSet = new Set(raw ? JSON.parse(raw) : []);
  } catch {
    claimedSet = new Set();
  }

  // Gera semente determinística pelo dia (dia do ano)
  const [y, m, d] = today.split('-').map(Number);
  const dayOfYear = Math.floor((new Date(y, m - 1, d).getTime() - new Date(y, 0, 0).getTime()) / 86400000);

  // Seleciona 4 missões do pool usando o dia como rotação
  const selectedIndices = [
    dayOfYear % DAILY_MISSION_POOL.length,
    (dayOfYear + 1) % DAILY_MISSION_POOL.length,
    (dayOfYear + 2) % DAILY_MISSION_POOL.length,
    (dayOfYear + 3) % DAILY_MISSION_POOL.length
  ];

  const uniqueSelected = Array.from(new Set(selectedIndices)).map(idx => DAILY_MISSION_POOL[idx]);

  return uniqueSelected.map(mission => {
    const evalResult = mission.evaluate(progress, dayCompletedIds);
    return {
      missionId: mission.id,
      title: mission.title,
      description: mission.description,
      xpReward: mission.xpReward,
      icon: mission.icon,
      current: evalResult.current,
      required: mission.requiredCount,
      completed: evalResult.completed,
      claimed: claimedSet.has(mission.id)
    };
  });
};

/**
 * Reivindica a recompensa de uma missão diária concluída (concede XP uma única vez por dia)
 */
export const claimDailyMissionReward = (
  missionId: string,
  studentKey: string
): { claimed: boolean; xpAwarded: number } => {
  const today = getTodayDateKey();
  const missions = getDailyMissions(studentKey);
  const target = missions.find(m => m.missionId === missionId);

  if (!target || !target.completed || target.claimed) {
    return { claimed: false, xpAwarded: 0 };
  }

  const claimedKey = `${DAILY_MISSIONS_STORAGE_PREFIX}${cleanKey(studentKey)}_${today}`;
  try {
    const raw = localStorage.getItem(claimedKey);
    const set = new Set(raw ? JSON.parse(raw) : []);
    set.add(missionId);
    localStorage.setItem(claimedKey, JSON.stringify(Array.from(set)));
    return { claimed: true, xpAwarded: target.xpReward };
  } catch (err) {
    console.error('Erro ao registrar resgate de missão diária:', err);
    return { claimed: false, xpAwarded: 0 };
  }
};
