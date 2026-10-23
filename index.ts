import { QuizItem, DifficultyLevel, QuestionCategory } from './types';
import { FACIL_QUIZZES } from './facilQuizzes';
import { MEDIO_QUIZZES } from './medioQuizzes';
import { DIFICIL_QUIZZES } from './dificilQuizzes';
import { IMPOSSIVEL_QUIZZES } from './impossivelQuizzes';

export * from './types';
export { FACIL_QUIZZES } from './facilQuizzes';
export { MEDIO_QUIZZES } from './medioQuizzes';
export { DIFICIL_QUIZZES } from './dificilQuizzes';
export { IMPOSSIVEL_QUIZZES } from './impossivelQuizzes';

export const ALL_QUIZZES: QuizItem[] = [
  ...FACIL_QUIZZES,
  ...MEDIO_QUIZZES,
  ...DIFICIL_QUIZZES,
  ...IMPOSSIVEL_QUIZZES
];

export const QUIZ_DIFFICULTY_XP: Record<DifficultyLevel, number> = {
  facil: 10,
  medio: 20,
  dificil: 35,
  impossivel: 50
};

export const QUIZ_DIFFICULTY_LABELS: Record<DifficultyLevel, { name: string; badge: string; color: string; border: string; bg: string }> = {
  facil: {
    name: 'Fácil',
    badge: 'Nível 1 • Fácil',
    color: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-300 dark:border-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40'
  },
  medio: {
    name: 'Médio',
    badge: 'Nível 2 • Médio',
    color: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/40'
  },
  dificil: {
    name: 'Difícil',
    badge: 'Nível 3 • Difícil',
    color: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/40'
  },
  impossivel: {
    name: 'Impossível',
    badge: 'Nível 4 • Impossível (ENEM)',
    color: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-300 dark:border-rose-600',
    bg: 'bg-rose-50 dark:bg-rose-950/40'
  }
};

export const getQuizById = (id: string): QuizItem | undefined => {
  return ALL_QUIZZES.find(q => q.id === id);
};

export const getQuizzesByDifficulty = (diff: DifficultyLevel): QuizItem[] => {
  return ALL_QUIZZES.filter(q => q.dificuldade === diff);
};

export const getQuizzesByCategory = (cat: QuestionCategory): QuizItem[] => {
  return ALL_QUIZZES.filter(q => q.categoria === cat);
};
