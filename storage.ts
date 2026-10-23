/**
 * STOPBULLYING — EEMTI ALFREDO MACHADO
 * Sistema de Persistência Segura e Histórico de Evidências das Competências
 * Isolamento total de denúncias anônimas e integridade local
 */

import { 
  CompetencyKey, 
  CompetencyEvidence, 
  CompetencyDiagnosticScore, 
  EducationalRecommendation, 
  LongitudinalSummary, 
  StageLevel 
} from './types';
import { COMPETENCY_METADATA, COMPETENCY_STAGES } from './definitions';
import { buildSingleCompetencyScore } from './engine';
import { ALL_QUIZZES } from '../../data/questionBank';
import { CENTRAL_DESAFIOS } from '../../data/centralRespeitoData';

const STORAGE_KEY_EVIDENCES_PREFIX = 'sentinela_competency_evidences_v4_';
const STORAGE_KEY_HISTORY_PREFIX = 'sentinela_competency_history_v4_';

// Fallback de memória para ambientes de teste e SSR
const memoryStorage: Record<string, string> = {};

const safeGetItem = (key: string): string | null => {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch {}
  return memoryStorage[key] || null;
};

const safeSetItem = (key: string, value: string): void => {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
      return;
    }
  } catch {}
  memoryStorage[key] = value;
};

const normalizeStudentKey = (key: string): string => {
  return (key || 'anonimo_padrao').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
};

/**
 * Recupera todas as evidências registradas para o estudante
 */
export const getStoredEvidences = (studentKey: string): CompetencyEvidence[] => {
  const k = `${STORAGE_KEY_EVIDENCES_PREFIX}${normalizeStudentKey(studentKey)}`;
  try {
    const raw = safeGetItem(k);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erro ao ler evidências de competências:', err);
    return [];
  }
};

/**
 * Salva a lista de evidências garantindo integridade
 */
const saveEvidences = (studentKey: string, evidences: CompetencyEvidence[]): void => {
  const k = `${STORAGE_KEY_EVIDENCES_PREFIX}${normalizeStudentKey(studentKey)}`;
  try {
    safeSetItem(k, JSON.stringify(evidences));
  } catch (err) {
    console.error('Erro ao salvar evidências de competências:', err);
  }
};

/**
 * Recupera histórico de evolução de estágios por competência
 */
export const getEvolutionHistory = (
  studentKey: string
): Record<CompetencyKey, Array<{ date: string; stageLevel: StageLevel; masteryScore: number; reason: string }>> => {
  const k = `${STORAGE_KEY_HISTORY_PREFIX}${normalizeStudentKey(studentKey)}`;
  const defaultHist: Record<CompetencyKey, any[]> = {
    respeito: [],
    convivencia: [],
    bullying: [],
    cyber: [],
    direitos: []
  };

  try {
    const raw = safeGetItem(k);
    if (!raw) return defaultHist;
    return { ...defaultHist, ...JSON.parse(raw) };
  } catch {
    return defaultHist;
  }
};

const saveEvolutionHistory = (
  studentKey: string,
  history: Record<CompetencyKey, Array<{ date: string; stageLevel: StageLevel; masteryScore: number; reason: string }>>
): void => {
  const k = `${STORAGE_KEY_HISTORY_PREFIX}${normalizeStudentKey(studentKey)}`;
  try {
    safeSetItem(k, JSON.stringify(history));
  } catch (err) {
    console.error('Erro ao salvar histórico de evolução:', err);
  }
};

/**
 * Registra uma evidência única com proteção contra duplicação artificial
 * Preserva prática pedagógica sem inflar a pontuação injustamente
 */
export const recordSingleEvidence = (
  studentKey: string,
  evidence: Omit<CompetencyEvidence, 'evidenceId' | 'timestamp'>
): { wasAddedAsNew: boolean; evidence: CompetencyEvidence } => {
  const existing = getStoredEvidences(studentKey);
  const now = new Date().toISOString();

  // Verifica se já existe evidência idêntica recente para a mesma atividade e competência
  // Uma conclusão repetida da mesma atividade atualiza a nota/status para refletir aprendizado sem duplicar o volume
  const existingIdx = existing.findIndex(
    e => e.activityId === evidence.activityId && e.competency === evidence.competency
  );

  let updatedEvidence: CompetencyEvidence;
  let wasAddedAsNew = false;

  if (existingIdx >= 0) {
    // Atualiza a evidência existente se o estudante acertou ou melhorou
    const prev = existing[existingIdx];
    const isImproved = evidence.scoreRatio >= prev.scoreRatio;

    updatedEvidence = {
      ...prev,
      isCorrect: isImproved ? evidence.isCorrect : prev.isCorrect,
      scoreRatio: Math.max(prev.scoreRatio, evidence.scoreRatio),
      timestamp: now,
      difficulty: evidence.difficulty,
      weight: evidence.weight,
      category: evidence.category,
      activityTitle: evidence.activityTitle
    };

    existing[existingIdx] = updatedEvidence;
  } else {
    // Nova evidência legítima
    updatedEvidence = {
      ...evidence,
      evidenceId: `ev_${evidence.activityId}_${Date.now()}`,
      timestamp: now
    };
    existing.push(updatedEvidence);
    wasAddedAsNew = true;
  }

  saveEvidences(studentKey, existing);

  // Checa se desbloqueou novo estágio
  checkAndRecordStageMilestone(studentKey, evidence.competency);

  return { wasAddedAsNew, evidence: updatedEvidence };
};

/**
 * Registra um lote de evidências (ex: após concluir um Desafio com várias questões)
 */
export const recordBatchEvidences = (
  studentKey: string,
  evidencesList: Array<Omit<CompetencyEvidence, 'evidenceId' | 'timestamp'>>
): void => {
  evidencesList.forEach(item => {
    recordSingleEvidence(studentKey, item);
  });
};

/**
 * Checa se o estudante desbloqueou um novo estágio e grava no histórico se for inédito
 */
export const checkAndRecordStageMilestone = (
  studentKey: string,
  compKey: CompetencyKey
): { newMilestoneUnlocked: boolean; stageTitle?: string } => {
  const allEvidences = getStoredEvidences(studentKey);
  const compEvidences = allEvidences.filter(e => e.competency === compKey);
  const allHistory = getEvolutionHistory(studentKey);
  const currentCompHist = allHistory[compKey] || [];

  const scoreData = buildSingleCompetencyScore(compKey, compEvidences, currentCompHist);
  const currentStageLevel = scoreData.currentStage.level;

  const alreadyRecorded = currentCompHist.some(h => h.stageLevel === currentStageLevel);

  if (!alreadyRecorded && currentStageLevel > 1) {
    const newEntry = {
      date: new Date().toISOString(),
      stageLevel: currentStageLevel,
      masteryScore: scoreData.masteryScore,
      reason: `Desbloqueado com ${scoreData.totalEvidences} evidências válidas e ${scoreData.masteryScore}% de domínio ponderado.`
    };
    currentCompHist.push(newEntry);
    allHistory[compKey] = currentCompHist;
    saveEvolutionHistory(studentKey, allHistory);
    return { newMilestoneUnlocked: true, stageTitle: scoreData.currentStage.title };
  }

  return { newMilestoneUnlocked: false };
};

/**
 * Gera o diagnóstico completo para todas as 5 competências
 */
export const getFullCompetenciesDiagnostic = (
  studentKey: string
): Record<CompetencyKey, CompetencyDiagnosticScore> => {
  const allEvidences = getStoredEvidences(studentKey);
  const allHistory = getEvolutionHistory(studentKey);

  const keys: CompetencyKey[] = ['respeito', 'convivencia', 'bullying', 'cyber', 'direitos'];
  const result: Partial<Record<CompetencyKey, CompetencyDiagnosticScore>> = {};

  keys.forEach(k => {
    const compEvs = allEvidences.filter(e => e.competency === k);
    result[k] = buildSingleCompetencyScore(k, compEvs, allHistory[k] || []);
  });

  return result as Record<CompetencyKey, CompetencyDiagnosticScore>;
};

/**
 * Gera recomendações educacionais inteligentes e direcionadas para as lacunas observadas
 */
export const getIntelligentRecommendations = (
  studentKey: string
): EducationalRecommendation[] => {
  const diagnostic = getFullCompetenciesDiagnostic(studentKey);
  const storedEvidences = getStoredEvidences(studentKey);
  const completedIds = new Set(storedEvidences.map(e => e.activityId));

  const recommendations: EducationalRecommendation[] = [];

  // Ordena competências da menor para a maior pontuação de domínio
  const sortedComps = (Object.keys(diagnostic) as CompetencyKey[]).sort(
    (a, b) => diagnostic[a].masteryScore - diagnostic[b].masteryScore
  );

  sortedComps.forEach(compKey => {
    const data = diagnostic[compKey];
    if (recommendations.length >= 4) return;

    // Se tem evidências insuficientes ou nota < 70, encontra atividade compatível
    if (data.confidence === 'insuficiente' || data.masteryScore < 75) {
      // 1. Procura no banco de quizzes uma questão inédita dessa competência
      const candidateQuiz = ALL_QUIZZES.find(
        q => q.competencia === compKey && !completedIds.has(q.id)
      );

      if (candidateQuiz) {
        recommendations.push({
          id: `rec_${candidateQuiz.id}`,
          competency: compKey,
          title: candidateQuiz.titulo,
          description: candidateQuiz.enunciado.slice(0, 110) + '...',
          targetId: candidateQuiz.id,
          targetType: 'quiz',
          difficultyLabel: candidateQuiz.dificuldade.toUpperCase(),
          pedagogicalReason: data.confidence === 'insuficiente'
            ? `Necessário coletar novas evidências em ${COMPETENCY_METADATA[compKey].shortName}.`
            : `Fortalecer habilidades de ${COMPETENCY_METADATA[compKey].shortName} com base no seu diagnóstico recente.`
        });
        return;
      }

      // 2. Procura nos Desafios da Central
      const candidateChallenge = CENTRAL_DESAFIOS.find(
        c => c.questoes?.some(q => q.competencia === compKey) && !completedIds.has(c.id)
      );

      if (candidateChallenge) {
        recommendations.push({
          id: `rec_${candidateChallenge.id}`,
          competency: compKey,
          title: candidateChallenge.titulo,
          description: candidateChallenge.descricao.slice(0, 110) + '...',
          targetId: candidateChallenge.id,
          targetType: 'desafio',
          difficultyLabel: candidateChallenge.dificuldade.toUpperCase(),
          pedagogicalReason: `Desafio analítico completo para ampliar domínio em ${COMPETENCY_METADATA[compKey].shortName}.`
        });
      }
    }
  });

  // Se o estudante já está avançado em tudo, recomenda o Desafio Supremo ou História Interativa
  if (recommendations.length < 2) {
    const historia = CENTRAL_DESAFIOS.find(c => c.tipo === 'historia_interativa');
    if (historia) {
      recommendations.push({
        id: `rec_${historia.id}`,
        competency: 'convivencia',
        title: historia.titulo,
        description: 'Simulação com tomada de decisão e ramificações sobre cyberbullying e empatia.',
        targetId: historia.id,
        targetType: 'historia',
        difficultyLabel: 'ESTUDO DE CASO',
        pedagogicalReason: 'Excelente para exercitar a tomada de decisão em cenários complexos reais.'
      });
    }

    const supremo = CENTRAL_DESAFIOS.find(c => c.id === 'desafio_supremo');
    if (supremo) {
      recommendations.push({
        id: `rec_${supremo.id}`,
        competency: 'direitos',
        title: supremo.titulo,
        description: 'Análise aprofundada de jurisprudência e doutrina restaurativa para guardiões experientes.',
        targetId: supremo.id,
        targetType: 'desafio',
        difficultyLabel: 'SUPREMO',
        pedagogicalReason: 'Recomendado para testar seus conhecimentos no nível máximo da plataforma.'
      });
    }
  }

  return recommendations;
};

/**
 * Resumo longitudinal do progresso do estudante
 */
export const getLongitudinalSummary = (studentKey: string): LongitudinalSummary => {
  const diagnostic = getFullCompetenciesDiagnostic(studentKey);
  const allEvidences = getStoredEvidences(studentKey);
  const allHistory = getEvolutionHistory(studentKey);

  const comps = Object.values(diagnostic);
  const validEvsCount = allEvidences.length;

  const totalMasterySum = comps.reduce((acc, c) => acc + c.masteryScore, 0);
  const overallMastery = comps.length > 0 ? Math.round(totalMasterySum / comps.length) : 0;

  const unlockedStagesCount = comps.reduce((acc, c) => acc + (c.currentStage.level - 1), 0);

  // Identifica competência prioritária para evolução e ponto forte
  const sortedByMastery = [...comps].sort((a, b) => a.masteryScore - b.masteryScore);
  const priority = sortedByMastery[0]?.key || null;
  const top = sortedByMastery[sortedByMastery.length - 1]?.key || null;

  // Compila evoluções recentes
  const recentEvolutions: LongitudinalSummary['recentEvolutions'] = [];
  (Object.keys(allHistory) as CompetencyKey[]).forEach(k => {
    const list = allHistory[k];
    list.forEach(item => {
      const stageDef = COMPETENCY_STAGES[item.stageLevel];
      recentEvolutions.push({
        competency: k,
        stageTitle: stageDef.title,
        date: item.date,
        milestone: stageDef.pedagogicalMilestone
      });
    });
  });

  recentEvolutions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    studentKey,
    overallMastery,
    totalValidEvidences: validEvsCount,
    unlockedStagesCount,
    recentEvolutions: recentEvolutions.slice(0, 6),
    priorityCompetencyToImprove: priority,
    topCompetency: top,
    lastCalculatedAt: new Date().toISOString()
  };
};
