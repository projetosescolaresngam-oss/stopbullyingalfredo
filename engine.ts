/**
 * STOPBULLYING — EEMTI ALFREDO MACHADO
 * Motor de Avaliação Pedagógica Ponderada e Cálculo de Confiança
 */

import { 
  CompetencyKey, 
  CompetencyEvidence, 
  CompetencyDiagnosticScore, 
  ConfidenceGrade, 
  StageDefinition, 
  StageLevel, 
  DifficultyWeight, 
  LongitudinalSummary 
} from './types';
import { COMPETENCY_STAGES, COMPETENCY_METADATA } from './definitions';

// =========================================================================
// 1. PESOS PONDERADOS POR NÍVEL DE DIFICULDADE PEDAGÓGICA
// =========================================================================
export const DIFFICULTY_WEIGHTS: Record<DifficultyWeight, number> = {
  facil: 1.0,        // Fundamentos e reconhecimento
  medio: 1.5,        // Interpretação e aplicação cotidiana
  dificil: 2.2,      // Análise crítica, contradições e dilemas complexos
  impossivel: 3.0,   // Complexidade avançada estilo ENEM / jurisprudência
  supremo: 3.5       // Desafios mestres de governança e doutrina restaurativa
};

/**
 * Calcula a nota de confiança e o grau com base em volume, diversidade e complexidade das evidências
 */
export const calculateConfidence = (
  evidences: CompetencyEvidence[]
): { grade: ConfidenceGrade; score: number; reason: string } => {
  if (evidences.length === 0) {
    return {
      grade: 'insuficiente',
      score: 0,
      reason: 'Nenhuma evidência registrada para esta competência até o momento.'
    };
  }

  if (evidences.length < 3) {
    return {
      grade: 'insuficiente',
      score: Math.round((evidences.length / 3) * 35),
      reason: `Amostra inicial com apenas ${evidences.length} questão(ões). É necessário concluir mais desafios para fundamentar o diagnóstico.`
    };
  }

  // Fatores de confiança:
  // 1. Volume de evidências (até 40 pontos para 10+ evidências)
  const volumePoints = Math.min(40, (evidences.length / 10) * 40);

  // 2. Diversidade de categorias/origens (até 30 pontos para 3+ fontes)
  const distinctCategories = new Set(evidences.map(e => e.category)).size;
  const distinctOrigins = new Set(evidences.map(e => e.origin)).size;
  const diversityPoints = Math.min(30, ((distinctCategories + distinctOrigins) / 4) * 30);

  // 3. Diversidade de níveis de dificuldade (até 30 pontos se tiver médio/difícil/impossível)
  const hasMedium = evidences.some(e => e.difficulty === 'medio');
  const hasHard = evidences.some(e => e.difficulty === 'dificil' || e.difficulty === 'impossivel' || e.difficulty === 'supremo');
  let difficultyPoints = 10;
  if (hasMedium) difficultyPoints += 10;
  if (hasHard) difficultyPoints += 10;

  const totalScore = Math.min(100, Math.round(volumePoints + diversityPoints + difficultyPoints));

  if (totalScore < 40) {
    return {
      grade: 'insuficiente',
      score: totalScore,
      reason: 'Evidências preliminares: responda a perguntas de maior complexidade para consolidar a precisão.'
    };
  }

  if (totalScore < 65) {
    return {
      grade: 'baixa',
      score: totalScore,
      reason: 'Confiança básica: dados suficientes para estimativa preliminar, com boa diversidade inicial.'
    };
  }

  if (totalScore < 85) {
    return {
      grade: 'moderada',
      score: totalScore,
      reason: 'Confiança sólida: conjunto diversificado de evidências abrangendo múltiplos contextos e dificuldades.'
    };
  }

  return {
    grade: 'alta',
    score: totalScore,
    reason: 'Confiança elevada: amplo acervo de evidências em cenários variados com presença de questões avançadas.'
  };
};

/**
 * Calcula a pontuação ponderada de domínio (Mastery Score de 0 a 100)
 */
export const calculateMasteryScore = (evidences: CompetencyEvidence[]): number => {
  if (evidences.length === 0) return 0;

  let totalWeight = 0;
  let earnedWeight = 0;

  evidences.forEach(ev => {
    const w = DIFFICULTY_WEIGHTS[ev.difficulty] || 1.0;
    totalWeight += w;
    earnedWeight += w * ev.scoreRatio;
  });

  if (totalWeight === 0) return 0;
  return Math.round((earnedWeight / totalWeight) * 100);
};

/**
 * Determina o estágio legítimo com base em requisitos objetivos e não infláveis
 */
export const evaluateCurrentStage = (
  masteryScore: number,
  evidences: CompetencyEvidence[],
  confidence: ConfidenceGrade
): { currentStage: StageDefinition; nextStage: StageDefinition | null; progressPercent: number } => {
  if (evidences.length === 0 || confidence === 'insuficiente') {
    // Semente inicial
    const stage1 = COMPETENCY_STAGES[1];
    const stage2 = COMPETENCY_STAGES[2];
    return {
      currentStage: stage1,
      nextStage: stage2,
      progressPercent: Math.min(100, Math.round((evidences.length / stage2.minValidEvidences) * 50))
    };
  }

  const validCount = evidences.length;
  const advancedCount = evidences.filter(
    e => (e.difficulty === 'dificil' || e.difficulty === 'impossivel' || e.difficulty === 'supremo') && e.isCorrect
  ).length;
  const distinctSources = new Set(evidences.map(e => e.category)).size;

  let achievedLevel: StageLevel = 1;

  for (let lvl = 6; lvl >= 1; lvl--) {
    const stageDef = COMPETENCY_STAGES[lvl as StageLevel];
    const meetsMastery = masteryScore >= stageDef.minMasteryScore;
    const meetsVolume = validCount >= stageDef.minValidEvidences;
    const meetsAdvanced = advancedCount >= stageDef.minAdvancedEvidences;
    const meetsDiversity = distinctSources >= stageDef.minDiversitySources;

    // Estágios avançados (4, 5, 6) requerem pelo menos confiança moderada para serem legítimos
    const meetsConfidence = lvl <= 3 || confidence === 'moderada' || confidence === 'alta';

    if (meetsMastery && meetsVolume && meetsAdvanced && meetsDiversity && meetsConfidence) {
      achievedLevel = lvl as StageLevel;
      break;
    }
  }

  const currentStage = COMPETENCY_STAGES[achievedLevel];
  const nextLevel = (achievedLevel < 6 ? (achievedLevel + 1) : null) as StageLevel | null;
  const nextStage = nextLevel ? COMPETENCY_STAGES[nextLevel] : null;

  let progressPercent = 100;
  if (nextStage) {
    const volumeProg = Math.min(1, validCount / nextStage.minValidEvidences);
    const scoreProg = Math.min(1, masteryScore / nextStage.minMasteryScore);
    const advProg = nextStage.minAdvancedEvidences > 0
      ? Math.min(1, advancedCount / nextStage.minAdvancedEvidences)
      : 1;
    
    progressPercent = Math.round(((volumeProg + scoreProg + advProg) / 3) * 100);
  }

  return { currentStage, nextStage, progressPercent: Math.min(99, Math.max(0, progressPercent)) };
};

/**
 * Identifica pontos fortes e áreas de crescimento específicos para o estudante
 */
export const extractStrengthsAndGrowthAreas = (
  compKey: CompetencyKey,
  evidences: CompetencyEvidence[],
  masteryScore: number
): { strengths: string[]; growthAreas: string[] } => {
  const meta = COMPETENCY_METADATA[compKey];
  const strengths: string[] = [];
  const growthAreas: string[] = [];

  if (evidences.length === 0) {
    return {
      strengths: ['Pronto para iniciar a jornada de desafios nesta competência.'],
      growthAreas: ['Participe de quizzes e desafios práticos para gerar seu diagnóstico detalhado.']
    };
  }

  const correctEvidences = evidences.filter(e => e.isCorrect);
  const incorrectEvidences = evidences.filter(e => !e.isCorrect);

  // Analisa categorias onde o estudante acertou
  const successCategories = Array.from(new Set(correctEvidences.map(e => e.category)));
  const failedCategories = Array.from(new Set(incorrectEvidences.map(e => e.category)));

  if (successCategories.length > 0) {
    strengths.push(`Acerto consistente em questões de ${successCategories.slice(0, 2).join(' e ')}.`);
  }

  const hardCorrect = correctEvidences.filter(e => e.difficulty === 'dificil' || e.difficulty === 'impossivel');
  if (hardCorrect.length > 0) {
    strengths.push(`Capacidade demonstrada em resolver ${hardCorrect.length} desafio(s) de alta complexidade analítica.`);
  } else if (masteryScore >= 70) {
    strengths.push('Regularidade no acerto de questões introdutórias e médias de convivência.');
  }

  if (strengths.length === 0) {
    strengths.push('Engajamento ativo na reflexão de situações de convivência escolar.');
  }

  if (failedCategories.length > 0) {
    growthAreas.push(`Aprofundar interpretação de situações envolvendo ${failedCategories.slice(0, 2).join(' e ')}.`);
  }

  if (masteryScore < 60) {
    growthAreas.push('Revisar a fundamentação pedagógica nas explicações pós-desafio.');
  } else if (hardCorrect.length === 0) {
    growthAreas.push('Experimentar desafios dos níveis Difícil e Impossível para consolidar estágios superiores.');
  }

  if (growthAreas.length === 0) {
    growthAreas.push('Manter a consistência em novos casos e desafios com estudos de caso reais.');
  }

  return { strengths, growthAreas };
};

/**
 * Monta o diagnóstico formativo completo de uma competência específica
 */
export const buildSingleCompetencyScore = (
  compKey: CompetencyKey,
  evidences: CompetencyEvidence[],
  evolutionHistory: Array<{ date: string; stageLevel: StageLevel; masteryScore: number; reason: string }>
): CompetencyDiagnosticScore => {
  const confidence = calculateConfidence(evidences);
  const masteryScore = calculateMasteryScore(evidences);
  const { currentStage, nextStage, progressPercent } = evaluateCurrentStage(masteryScore, evidences, confidence.grade);
  const { strengths, growthAreas } = extractStrengthsAndGrowthAreas(compKey, evidences, masteryScore);

  const advancedEvidences = evidences.filter(
    e => (e.difficulty === 'dificil' || e.difficulty === 'impossivel' || e.difficulty === 'supremo') && e.isCorrect
  ).length;

  const distinctCategories = new Set(evidences.map(e => e.category)).size;

  return {
    key: compKey,
    masteryScore,
    confidence: confidence.grade,
    confidenceScore: confidence.score,
    confidenceReason: confidence.reason,
    totalEvidences: evidences.length,
    correctEvidences: evidences.filter(e => e.isCorrect).length,
    advancedEvidences,
    diversityCount: distinctCategories,
    currentStage,
    nextStage,
    stageProgressPercent: progressPercent,
    strengths,
    growthAreas,
    evolutionHistory
  };
};
