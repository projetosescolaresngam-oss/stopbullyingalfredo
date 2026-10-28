import { ALL_QUIZZES } from '../../data/questionBank';
import { CENTRAL_DESAFIOS } from '../../data/centralRespeitoData';

/**
 * STOPBULLYING — EEMTI ALFREDO MACHADO
 * Sistema Avançado de Diagnóstico Formativo por Competências
 * Arquitetura de Domínio Pedagógico, Tipagem e Modelagem de Dados
 */

export type CompetencyKey = 'respeito' | 'convivencia' | 'bullying' | 'cyber' | 'direitos';

export type ActivityOrigin = 'quiz_banco' | 'desafio_central' | 'historia_interativa' | 'mapa_desafio';

export type DifficultyWeight = 'facil' | 'medio' | 'dificil' | 'impossivel' | 'supremo';

export type StageLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type ConfidenceGrade = 'insuficiente' | 'baixa' | 'moderada' | 'alta';

export interface StageDefinition {
  level: StageLevel;
  title: string;
  badge: string;
  minMasteryScore: number; // Percentual mínimo ponderado (ex: 70%)
  minValidEvidences: number; // Quantidade mínima de itens independentes
  minAdvancedEvidences: number; // Quantidade mínima de itens Difícil/Impossível/Supremo
  minDiversitySources: number; // Quantidade de categorias ou origens distintas
  description: string;
  pedagogicalMilestone: string;
}

export interface CompetencyMetadata {
  key: CompetencyKey;
  label: string;
  shortName: string;
  iconName: string;
  summary: string;
  learningObjectives: string[];
  evaluatedAbilities: string[];
  improvementFocus: string[];
  legalFramework: string;
  primaryColor: string; // Tailwind color token
  accentGradient: string;
}

export interface CompetencyEvidence {
  evidenceId: string; // Ex: ev_quiz_facil_1_timestamp
  activityId: string; // Id da questão ou desafio
  activityTitle: string;
  origin: ActivityOrigin;
  competency: CompetencyKey;
  difficulty: DifficultyWeight;
  weight: number; // Peso ponderado (1 a 4)
  isCorrect: boolean;
  scoreRatio: number; // 0.0 a 1.0 (para histórias pontuação parcial)
  timestamp: string;
  category: string;
}

export interface CompetencyDiagnosticScore {
  key: CompetencyKey;
  masteryScore: number; // 0 a 100 ponderado
  confidence: ConfidenceGrade;
  confidenceScore: number; // 0 a 100
  confidenceReason: string;
  totalEvidences: number;
  correctEvidences: number;
  advancedEvidences: number;
  diversityCount: number; // Número de categorias distintas avaliadas
  currentStage: StageDefinition;
  nextStage: StageDefinition | null;
  stageProgressPercent: number; // 0 a 100 em direção ao próximo estágio
  strengths: string[];
  growthAreas: string[];
  evolutionHistory: Array<{
    date: string;
    stageLevel: StageLevel;
    masteryScore: number;
    reason: string;
  }>;
}

export interface EducationalRecommendation {
  id: string;
  competency: CompetencyKey;
  title: string;
  description: string;
  targetId: string; // ID da questão ou do desafio existente
  targetType: 'quiz' | 'desafio' | 'historia';
  difficultyLabel: string;
  pedagogicalReason: string;
}

export interface LongitudinalSummary {
  studentKey: string;
  overallMastery: number;
  totalValidEvidences: number;
  unlockedStagesCount: number;
  recentEvolutions: Array<{
    competency: CompetencyKey;
    stageTitle: string;
    date: string;
    milestone: string;
  }>;
  priorityCompetencyToImprove: CompetencyKey | null;
  topCompetency: CompetencyKey | null;
  lastCalculatedAt: string;
}

/**
 * STOPBULLYING — EEMTI ALFREDO MACHADO
 * Definições Pedagógicas Oficiais dos Estágios de Desenvolvimento
 * e Metadados das 5 Competências Formativas
 */


// =========================================================================
// 1. ESTÁGIOS ORIGINAIS DE DESENVOLVIMENTO POR COMPETÊNCIA
// =========================================================================
export const COMPETENCY_STAGES: Record<StageLevel, StageDefinition> = {
  1: {
    level: 1,
    title: 'Semente do Conhecimento',
    badge: 'Estágio 1 • Semente',
    minMasteryScore: 0,
    minValidEvidences: 1,
    minAdvancedEvidences: 0,
    minDiversitySources: 1,
    description: 'Primeiro contato com os princípios de convivência e identificação de situações fundamentais.',
    pedagogicalMilestone: 'Iniciou a exploração da competência registrando as primeiras evidências válidas.'
  },
  2: {
    level: 2,
    title: 'Aprendiz em Formação',
    badge: 'Estágio 2 • Aprendiz',
    minMasteryScore: 50,
    minValidEvidences: 3,
    minAdvancedEvidences: 0,
    minDiversitySources: 2,
    description: 'Demonstra compreensão preliminar dos temas e diferencia situações abusivas de conflitos comuns.',
    pedagogicalMilestone: 'Consolidou o reconhecimento conceitual básico em cenários variados do cotidiano escolar.'
  },
  3: {
    level: 3,
    title: 'Defensor em Desenvolvimento',
    badge: 'Estágio 3 • Defensor',
    minMasteryScore: 65,
    minValidEvidences: 6,
    minAdvancedEvidences: 1,
    minDiversitySources: 2,
    description: 'Aplica discernimento crítico com regularidade e identifica a importância da mediação pacífica.',
    pedagogicalMilestone: 'Superou questões de média e alta complexidade, demonstrando solidez na tomada de decisões.'
  },
  4: {
    level: 4,
    title: 'Guardião do Respeito',
    badge: 'Estágio 4 • Guardião',
    minMasteryScore: 75,
    minValidEvidences: 10,
    minAdvancedEvidences: 3,
    minDiversitySources: 3,
    description: 'Capacidade analítica aprofundada, com firme discernimento ético, empatia ativa e repúdio à omissão.',
    pedagogicalMilestone: 'Alcançou domínio consistente em desafios difíceis, com alta taxa de precisão pedagógica.'
  },
  5: {
    level: 5,
    title: 'Mestre da Convivência',
    badge: 'Estágio 5 • Mestre',
    minMasteryScore: 85,
    minValidEvidences: 15,
    minAdvancedEvidences: 5,
    minDiversitySources: 3,
    description: 'Articula fundamentos legais, princípios restaurativos e acolhimento humano em situações de alta complexidade.',
    pedagogicalMilestone: 'Respondeu com excelência a questões desafiadoras e dilemas de fronteira moral.'
  },
  6: {
    level: 6,
    title: 'Referência de Cidadania',
    badge: 'Estágio 6 • Referência',
    minMasteryScore: 92,
    minValidEvidences: 20,
    minAdvancedEvidences: 8,
    minDiversitySources: 4,
    description: 'Excelência em análise crítica, responsabilidade cidadã e capacidade de atuar como upstander na EEMTI.',
    pedagogicalMilestone: 'Atingiu maturidade pedagógica excepcional, com repertório amplo e diversificado em situações de alta exigência.'
  }
};

// =========================================================================
// 2. METADADOS E OBJETIVOS DE APRENDIZAGEM DAS 5 COMPETÊNCIAS
// =========================================================================
export const COMPETENCY_METADATA: Record<CompetencyKey, CompetencyMetadata> = {
  respeito: {
    key: 'respeito',
    label: 'Respeito & Empatia Ativa',
    shortName: 'Respeito',
    iconName: 'HeartHandshake',
    summary: 'Compreensão da dignidade humana, alteridade, escuta sensível e acolhimento incondicional das diferenças.',
    learningObjectives: [
      'Reconhecer a dignidade da pessoa humana como limite intransponível das liberdades individuais.',
      'Identificar situações sutis de preconceito, estigmatização e microagressões no ambiente escolar.',
      'Exercer a empatia ativa em apoio a colegas em sofrimento psíquico ou exclusão social.',
      'Adotar práticas de comunicação não-violenta (CNV) em situações de divergência.'
    ],
    evaluatedAbilities: [
      'Identificação de estereótipos velados e discriminação',
      'Acolhimento da diversidade cultural, racial, religiosa e identitária',
      'Discernimento ético entre brincadeira consensual e humilhação',
      'Postura solidária diante de colegas vulnerabilizados'
    ],
    improvementFocus: [
      'Aprofundar a diferenciação entre liberdade de expressão e violação da dignidade alheia.',
      'Exercitar respostas ativas que desfaçam apelidos pejorativos naturalizados.'
    ],
    legalFramework: 'Constituição Federal de 1988 (Art. 1º, III - Dignidade da Pessoa Humana; Art. 5º - Igualdade e Inviolabilidade da Intimidade) e Declaração Universal dos Direitos Humanos.',
    primaryColor: 'rose',
    accentGradient: 'from-rose-500 via-pink-600 to-rose-700'
  },
  convivencia: {
    key: 'convivencia',
    label: 'Convivência Democrática & Mediação',
    shortName: 'Convivência',
    iconName: 'Users',
    summary: 'Habilidades de diálogo construtivo, gestão pacífica de tensões, escuta ativa e justiça restaurativa.',
    learningObjectives: [
      'Compreender que o conflito é inerente à vida em sociedade e pode ser resolvido pelo diálogo pacífico.',
      'Aplicar práticas circulares e princípios restaurativos na reconstrução de laços comunitários.',
      'Neutralizar a pressão de manada que instiga hostilidades coletivas em sala de aula.',
      'Fortalecer a cooperação pedagógica e o sentimento de pertencimento escolar.'
    ],
    evaluatedAbilities: [
      'Mediação de divergências sem recorrer a punições retaliatórias ou violência',
      'Promoção de acordos de convivência e pactos de turma compartilhados',
      'Compreensão do efeito do espectador (bystander effect) e coragem cívica',
      'Desescalada verbal de provocações no ambiente escolar'
    ],
    improvementFocus: [
      'Praticar técnicas de mediação e desescalada em conflitos acalorados.',
      'Evitar reações punitivistas extremas que apenas aprofundem o ressentimento entre grupos.'
    ],
    legalFramework: 'Diretrizes Curriculares Nacionais para a Educação Básica e Marcos de Cultura de Paz da UNESCO.',
    primaryColor: 'indigo',
    accentGradient: 'from-indigo-500 via-violet-600 to-indigo-700'
  },
  bullying: {
    key: 'bullying',
    label: 'Prevenção ao Bullying & Intimidação',
    shortName: 'Prevenção ao Bullying',
    iconName: 'ShieldAlert',
    summary: 'Identificação técnica da intimidação sistemática, assimetria de forças, reiteração e quebra do pacto de silêncio.',
    learningObjectives: [
      'Diferenciar conceitualmente conflito episódico da intimidação sistemática reiterada (bullying).',
      'Reconhecer as múltiplas formas de vitimização: física, moral, verbal, psicológica e social.',
      'Compreender a dinâmica triangular: autor, vítima e testemunhas coniventes.',
      'Romper o pacto do silêncio por meio de denúncias seguras e acolhimento pedagógico.'
    ],
    evaluatedAbilities: [
      'Identificação dos 3 requisitos legais da Lei 13.185/2015: intencionalidade, assimetria de poder e repetição',
      'Análise crítica dos papéis de testemunhas coniventes e fortalecedoras da agressão',
      'Identificação de exclusão sistemática em atividades em grupo e intervalos',
      'Utilização de canais institucionais seguros e anônimos para quebra do ciclo abusivo'
    ],
    improvementFocus: [
      'Aprofundar a detecção de bullying social/relacional (isolamento intencional e difamação silenciosa).',
      'Fortalecer a ação enquanto Upstander (defensor ativo que não se omite).'
    ],
    legalFramework: 'Lei Federal nº 13.185/2015 (Programa de Combate à Intimidação Sistemática) e Lei Federal nº 14.811/2024 (Medidas de Proteção e Prevenção).',
    primaryColor: 'amber',
    accentGradient: 'from-amber-500 via-orange-600 to-amber-700'
  },
  cyber: {
    key: 'cyber',
    label: 'Cidadania Digital & Proteção Cibernética',
    shortName: 'Cidadania Digital',
    iconName: 'Smartphone',
    summary: 'Comportamento ético na internet, prevenção ao cyberbullying, preservação idônea de evidências e repúdio à difamação virtual.',
    learningObjectives: [
      'Reconhecer que o ambiente virtual não é terra sem leis e que atos online geram consequências jurídicas reais.',
      'Identificar os riscos da desindividuação e do efeito desinibição em grupos de mensagens.',
      'Compreender a responsabilidade ética e jurídica no compartilhamento e viralização de conteúdos ofensivos.',
      'Adotar práticas de preservação idônea de evidências probatórias digitais para amparo da vítima.'
    ],
    evaluatedAbilities: [
      'Identificação de cyberbullying, doxxing, exclusão de grupos e memes depreciativos',
      'Não propagação de materiais vexatórios ou gravações não autorizadas',
      'Preservação técnica de telas com remetente, contexto e data para apuração',
      'Defesa de um ambiente online fraterno e protetivo'
    ],
    improvementFocus: [
      'Entender a responsabilidade de quem curte ou repassa figurinhas ofensivas (coautoria moral).',
      'Conhecer medidas técnicas de bloqueio, denúncia na plataforma e preservação de metadados.'
    ],
    legalFramework: 'Marco Civil da Internet (Lei 12.965/2014), Lei 14.811/2024 (Art. 146-A do Código Penal - Cyberbullying tipificado) e LGPD (Lei 13.709/2018).',
    primaryColor: 'cyan',
    accentGradient: 'from-cyan-500 via-blue-600 to-cyan-700'
  },
  direitos: {
    key: 'direitos',
    label: 'Direitos, Legislação & Cidadania',
    shortName: 'Direitos & Leis',
    iconName: 'Scale',
    summary: 'Domínio da legislação protetiva da infância e juventude, protocolos institucionais, responsabilidade civil e garantias fundamentais.',
    learningObjectives: [
      'Conhecer os marcos normativos fundamentais: ECA, Lei 13.185/2015, Lei 14.811/2024 e Código Penal.',
      'Compreender o dever de proteção integral e prioridade absoluta da criança e do adolescente.',
      'Entender a responsabilidade civil objetiva das instituições de ensino (Tema 592/STF).',
      'Articular o papel da escola, Conselho Tutelar, comissão de mediação e rede intersetorial.'
    ],
    evaluatedAbilities: [
      'Interpretação e aplicação correta da Lei 14.811/2024 e tipificação penal de condutas',
      'Compreensão do papel institucional dos Protocolos de Prevenção e Resposta Rápida',
      'Conhecimento das garantias de devido processo legal e contraditório pedagógico',
      'Entendimento das medidas socioeducativas do ECA e limites da sanção escolar'
    ],
    improvementFocus: [
      'Consolidar a diferença técnica entre sanção socioeducativa (ECA) e medidas disciplinares internas da escola.',
      'Compreender os deveres do Poder Público e da comunidade escolar na garantia da segurança física e psíquica.'
    ],
    legalFramework: 'Estatuto da Criança e do Adolescente (Lei 8.069/1990), Lei Federal nº 14.811/2024, Lei nº 13.185/2015 e Tema 592/STF (RE 842.844).',
    primaryColor: 'emerald',
    accentGradient: 'from-emerald-500 via-teal-600 to-emerald-700'
  }
};

/**
 * STOPBULLYING — EEMTI ALFREDO MACHADO
 * Motor de Avaliação Pedagógica Ponderada e Cálculo de Confiança
 */



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

/**
 * STOPBULLYING — EEMTI ALFREDO MACHADO
 * Sistema de Persistência Segura e Histórico de Evidências das Competências
 * Isolamento total de denúncias anônimas e integridade local
 */



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
