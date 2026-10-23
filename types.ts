export type DifficultyLevel = 'facil' | 'medio' | 'dificil' | 'impossivel';

export type QuestionCategory = 
  | 'fundamentos'
  | 'cotidiano'
  | 'cyber'
  | 'legislacao'
  | 'decisao'
  | 'dilemas'
  | 'enem_avancado'
  | 'consequencias'
  | 'prevencao'
  | 'direitos'
  | 'convivencia'
  | 'empatia'
  | 'espectador'
  | 'mediacao';

export type CompetencyArea = 'respeito' | 'convivencia' | 'bullying' | 'cyber' | 'direitos';

export interface BankQuestion {
  id: string;
  pergunta: string;
  contexto?: string;
  opcoes: [string, string, string, string];
  correta: 0 | 1 | 2 | 3;
  explicacao: string;
  dificuldade: DifficultyLevel;
  categoria: QuestionCategory;
  competencia: CompetencyArea;
  referencia: string;
}

export interface QuizItem {
  id: string;
  titulo: string;
  dificuldade: DifficultyLevel;
  categoria: QuestionCategory;
  competencia: CompetencyArea;
  enunciado: string;
  contexto?: string;
  opcoes: [string, string, string, string];
  correta: 0 | 1 | 2 | 3;
  explicacao: string;
  justificativaIncorretas: [string, string, string];
  referencia: string;
  xpRecompensa: number; // 10 (fácil), 20 (médio), 35 (difícil), 50 (impossível)
  missoesAssociadas?: string[];
  conquistasAssociadas?: string[];
}
