export type ViewMode = 
  | 'home'
  | 'denuncia'
  | 'protocolo'
  | 'apoio'
  | 'triagem'
  | 'quiz'
  | 'sos'
  | 'ceara'
  | 'galeria'
  | 'gestao'
  | 'conquistas'
  | 'colecao'
  | 'guia'
  | 'educativo'
  | 'missoes';

export type ViolenceType = 
  | 'Verbal'
  | 'Física'
  | 'Psicológica'
  | 'Cyberbullying'
  | 'Social';

export type SchoolLocation = 
  | 'Sala de Aula'
  | 'Pátio/Recreio'
  | 'Corredor/Escada'
  | 'Banheiro'
  | 'Transporte Escolar'
  | 'Entorno da Escola'
  | 'Redes Sociais';

export type ComplaintStatus = 'Em Análise' | 'Acolhido' | 'Resolvido' | 'Excluído';

export type MediaType = 'foto' | 'video' | 'audio';

export interface Denuncia {
  id: string;
  protocolo: string;
  tipo_violencia: ViolenceType | string;
  local_escola: SchoolLocation | string;
  descricao: string;
  escola_id?: string;
  escola_nome?: string;
  link_cyberbullying?: string;
  midia_anexa?: string | null;
  midia_tipo?: MediaType | null;
  midia_duracao?: number;
  data_envio: string;
  status: ComplaintStatus;
  is_deleted?: boolean;
  nivel_gravidade?: 'Leve' | 'Recorrente' | 'Grave' | 'Pendente';
  frequencia?: string;
  turno?: string;
  papel_denunciante?: string;
  turma_envolvida?: string;
  agressor_grupo?: string;
  tipos_selecionados?: string[];
  provas_anexas?: Array<{ nome: string; url?: string; tipo?: string; tamanho?: string }>;
  is_sos?: boolean;
  acoes_mediacao?: MediacaoAction[];
  etapa_mediacao?: EtapaMediacao;
  nivel_escalada?: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  impactos_identificados?: string[];
  medidas_protecao?: string[];
  termo_acordo?: TermoAcordoConvivencia;
  checkins_acompanhamento?: CheckinAcompanhamento[];
  historico_acoes?: Array<{ data_hora: string; acao: string; responsavel: string }>;
  feedback_escola?: FeedbackEscola;
  historico_feedbacks?: FeedbackEscola[];
}

export type FeedbackStatusResolucao = 
  | 'acolhido_em_analise' 
  | 'medidas_adotadas' 
  | 'pacificado' 
  | 'encaminhado_rede';

export interface FeedbackEscola {
  id: string;
  data_hora: string;
  autor: string;
  cargo_autor?: string;
  titulo: string;
  mensagem: string;
  status_resolucao: FeedbackStatusResolucao;
  status_rotulo?: string;
  medidas_tomadas?: string[];
  orientacao_ao_estudante?: string;
  notificado_ao_conselho_tutelar?: boolean;
  notificado_ao_conselho_escolar?: boolean;
}

export type EtapaMediacao = 
  | 'escuta_inicial' 
  | 'pre_mediacao' 
  | 'sessao_dialogo' 
  | 'acordo_firmado' 
  | 'monitoramento' 
  | 'pacificado';

export interface TermoAcordoConvivencia {
  firmado_em: string;
  mediador: string;
  compromissos: string[];
  reparacao_simbolica?: string;
  status: 'Em cumprimento' | 'Cumprido com sucesso' | 'Necessita revisão';
  data_revisao?: string;
}

export interface CheckinAcompanhamento {
  id: string;
  dia: number;
  data: string;
  responsavel: string;
  status_estudante: 'Seguro e Acolhido' | 'Ainda apreensivo' | 'Incidente recorrente';
  observacoes: string;
}

export interface PerfilEscola {
  id: string;
  nome: string;
  sigla?: string;
  codigo_inep?: string;
  cidade: string;
  estado: string;
  rede: 'Estadual' | 'Municipal' | 'Federal' | 'Privada';
  orgao_regional: string;
  conselho_tutelar_local: string;
  endereco?: string;
  telefone?: string;
  email_institucional?: string;
  email_conselho_tutelar?: string;
  diretor?: string;
  coordenador_pedagogico?: string;
  comissao_mediacao_nome?: string;
  ativa: boolean;
  criada_em: string;
  turmas_cadastradas?: string[];
  logo_tipo?: 'padrao' | 'estadual' | 'municipal' | 'personalizado';
  descricao?: string;
}

export interface MediacaoAction {
  id: string;
  autor: string;
  acao?: string;
  dataHora?: string;
  data_hora?: string;
  tipo?: string;
  descricao?: string;
  categoria?: 'Escuta Ativa' | 'Conversa com Responsáveis' | 'Orientação em Sala' | 'Encaminhamento Externo' | 'Acordo de Convivência' | 'Geral';
}

export interface ProtocolChatMessage {
  id: string;
  protocolo: string;
  remetente: 'denunciante' | 'coordenacao';
  autorNome: string;
  texto: string;
  dataHora: string;
}

export interface QuizQuestion {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
  referencia: string;
}

export interface MaterialApoio {
  id: string;
  titulo: string;
  categoria: 'Saúde Mental' | 'Emergência' | 'Legislação' | 'Prevenção';
  conteudo: string;
  link_externo?: string;
  icone: string;
}

export interface SOSAlert {
  id: string;
  escola_id?: string;
  escola_nome?: string;
  latitude?: number;
  longitude?: number;
  precisao_metros?: number;
  dispositivo_info: string;
  data_disparo: string;
  status: 'URGENTE' | 'ATENDIDO';
  local_aproximado?: string;
  atendido_por?: string;
  atendido_em?: string;
  notas_atendimento?: string;
}

// Gamificação & Cosméticos
export type CosmeticCategory = 'icon' | 'frame' | 'badge' | 'title' | 'effect';
export type CosmeticRarity = 'comum' | 'raro' | 'epico' | 'lendario' | 'mitico';

export interface CosmeticUnlockCondition {
  type: 'level' | 'achievement' | 'quiz' | 'simulation' | 'breathing' | 'special_secret' | 'mission' | 'default';
  requiredLevel?: number;
  achievementId?: string;
  quizScorePercent?: number;
  missionId?: string;
  description: string;
}

export interface CosmeticItem {
  id: string;
  category: CosmeticCategory;
  name: string;
  description: string;
  rarity: CosmeticRarity;
  unlockCondition: CosmeticUnlockCondition;
  isSecret?: boolean;
  previewColor?: string;
  svgData?: string;
  loreQuote?: string;
}

export interface UserGamificationProfile {
  currentLevel: number;
  currentXp: number;
  nextLevelXp: number;
  levelTitle: string;
  equippedIconId: string;
  equippedFrameId: string;
  equippedBadgeId: string;
  equippedTitleId: string;
  equippedEffectId: string;
  unlockedCosmetics: string[];
}

export interface AnonymousStudentIdentity {
  code: string;
  creationTimestamp: number;
  studentSeed: string;
}

// Conquistas
export type AchievementTier = 'bronze' | 'prata' | 'ouro' | 'lendario';
export type AchievementCategory = 'sabedoria' | 'detetive' | 'empatia' | 'zen' | 'escudo';

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  unlockedDescription?: string;
  funnyQuote?: string;
  funnySticker: string;
  category: AchievementCategory;
  tier: AchievementTier;
  iconType: string;
  isUnlocked: boolean;
  isSecret?: boolean;
  xpReward?: number;
  secretRewardCosmeticId?: string;
  currentProgress: number;
  maxProgress: number;
  progressUnit?: string;
  requirementHint: string;
}

// Níveis
export interface LevelInfo {
  level: number;
  title: string;
  xpRequired: number;
  icon: string;
  rewardDescription: string;
  cosmeticId?: string;
}

// Educativo & Matriz de Bullying
export interface BullyingTypeDetail {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
    badgeBg: string;
    glow: string;
  };
  examples: string[];
  warningSigns: string[];
  howToActStudent: string[];
  howToActWitness: string[];
  legalFramework?: string;
  severityLevel: 'moderado' | 'grave' | 'critico';
}

export interface LawArticle {
  number: string;
  title: string;
  content: string;
  practicalApplication: string;
}

export interface RespectGuideTopic {
  id: string;
  title: string;
  icon: string;
  description: string;
  actionPoints: string[];
  reflectionQuote: string;
}

export interface InstitutionalEmailConfig {
  emailConselhoTutelar: string;
  emailEscola: string;
  telefoneConselhoTutelar?: string;
  responsavelEnvio?: string;
  ultimoRelatorioMensalEnviado?: string;
  agendamentoAtivo?: boolean;
}

