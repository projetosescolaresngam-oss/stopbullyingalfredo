/**
 * STOPBULLYING — EEMTI ALFREDO MACHADO
 * Definições Pedagógicas Oficiais dos Estágios de Desenvolvimento
 * e Metadados das 5 Competências Formativas
 */

import { CompetencyKey, CompetencyMetadata, StageDefinition, StageLevel } from './types';

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
