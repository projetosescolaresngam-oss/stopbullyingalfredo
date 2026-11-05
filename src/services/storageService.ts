import { 
  Denuncia, 
  SOSAlert, 
  ComplaintStatus, 
  ProtocolChatMessage, 
  MediacaoAction, 
  TermoAcordoConvivencia, 
  CheckinAcompanhamento,
  EtapaMediacao,
  FeedbackEscola 
} from '../types';
import { INITIAL_DENUNCIAS } from '../data/initialData';
import { getSupabase, isSupabaseConfigured } from './supabaseClient';
import { getEscolaAtiva, getEscolas, syncEscolasFromSupabase } from './schoolService';
import { getGestaoSessionToken } from './adminAuthService';

const STORAGE_KEY_DENUNCIAS = 'stopbullying_denuncias_v2';
const STORAGE_KEY_SOS = 'stopbullying_sos_v2';
const STORAGE_KEY_LOGS = 'stopbullying_logs_v2';
const STORAGE_KEY_PROTOCOL_CHATS = 'stopbullying_protocol_chats_v2';
const STORAGE_KEY_LAST_PROTOCOL = 'stopbullying_last_protocol_v2';
const STORAGE_KEY_DELETED_DENUNCIAS = 'stopbullying_deleted_denuncias_v2';

const INITIAL_SOS_ALERTS: SOSAlert[] = [];

// Helper para normalizar e limpar protocolo
export const cleanProtocolKey = (proto: string): string => {
  if (!proto) return '';
  return proto.trim().toUpperCase().replace(/^#/, '');
};

interface DeletedEntry {
  id?: string;
  protocolo?: string;
  timestamp: string;
}

// Registro persistente de denúncias excluídas para prevenir ressuscitação em recarregamentos (F5 / "relógio")
export const getDeletedDenunciasRegistry = (): { ids: Set<string>; protocolos: Set<string> } => {
  const ids = new Set<string>();
  const protocolos = new Set<string>();
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_DELETED_DENUNCIAS) : null;
    if (raw) {
      const parsed: DeletedEntry[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach(entry => {
          if (entry.id) ids.add(entry.id);
          if (entry.protocolo) protocolos.add(cleanProtocolKey(entry.protocolo));
        });
      }
    }
  } catch {}
  return { ids, protocolos };
};

export const recordDenunciaAsDeleted = (id?: string, protocolo?: string): void => {
  try {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(STORAGE_KEY_DELETED_DENUNCIAS);
    const list: DeletedEntry[] = raw ? JSON.parse(raw) : [];
    const cleanProto = protocolo ? cleanProtocolKey(protocolo) : undefined;

    const alreadyExists = list.some(e =>
      (id && e.id === id) ||
      (cleanProto && e.protocolo && cleanProtocolKey(e.protocolo) === cleanProto)
    );

    if (!alreadyExists && (id || cleanProto)) {
      list.push({
        id,
        protocolo: cleanProto,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEY_DELETED_DENUNCIAS, JSON.stringify(list));
    }
  } catch {}
};

export const isDenunciaDeleted = (id?: string, protocolo?: string): boolean => {
  const { ids, protocolos } = getDeletedDenunciasRegistry();
  if (id && ids.has(id)) return true;
  if (protocolo && protocolos.has(cleanProtocolKey(protocolo))) return true;
  return false;
};

export function normalizeDenunciaSchool(d: any): Denuncia {
  if (!d) return d;
  let escolaNome = d.escola_ocorrencia_nome || d.escola_nome;
  let escolaId = d.escola_ocorrencia_id || d.escola_id;

  // Se a escola não estiver definida ou for vazia, verifica se está embutida na descrição
  if ((!escolaNome || escolaNome === 'Não informada / Desconhecida') && d.descricao) {
    const match = d.descricao.match(/\[(?:Instituição de Ensino|Escola):\s*(.+?)\s*(?:\(ID:\s*([^\)]+)\))?\]/i);
    if (match) {
      escolaNome = match[1].trim();
      if (match[2]) {
        escolaId = match[2].trim();
      }
    }
  }

  // Fallback seguro se ainda não tiver nome de escola (ancorado na escola polo original)
  if (!escolaNome) {
    escolaNome = 'E.E.M.T.I. Alfredo Machado';
    escolaId = 'escola-eemti-alfredo-machado';
  }

  return {
    ...d,
    escola_id: escolaId,
    escola_nome: escolaNome,
    escola_ocorrencia_id: escolaId,
    escola_ocorrencia_nome: escolaNome,
  };
}

export const filterActiveDenuncias = (denuncias: Denuncia[]): Denuncia[] => {
  if (!Array.isArray(denuncias)) return [];
  const { ids, protocolos } = getDeletedDenunciasRegistry();
  const mockProtocols = ['STP-94A1F', 'STP-88C2B', 'STP-71E9D', 'STP-63F4A', 'STP-SOS991'];
  const mockIds = ['1', '2', '3', '4', '5'];

  return denuncias
    .filter(d => {
      if (!d) return false;
      if (d.status === 'Excluído' || (d.status as string) === 'Excluída' || d.is_deleted) return false;
      if (d.id && (ids.has(d.id) || mockIds.includes(d.id))) return false;
      if (d.protocolo) {
        const clean = cleanProtocolKey(d.protocolo);
        if (protocolos.has(clean) || mockProtocols.includes(d.protocolo)) return false;
      }
      return true;
    })
    .map(normalizeDenunciaSchool);
};

// Purga completa e sincronizada na nuvem (Supabase)
export async function purgeDenunciaFromCloud(targetId?: string, targetProtocol?: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  const cleanProto = targetProtocol ? cleanProtocolKey(targetProtocol) : undefined;

  try {
    // 1. Tentar RPC autenticada no servidor com token de sessão
    const sessionToken = getGestaoSessionToken();
    if (sessionToken) {
      const { error: rpcErr } = await supabase.rpc('gestao_excluir_denuncia', {
        p_session_token: sessionToken,
        p_denuncia_id: targetId || '',
        p_protocolo: targetProtocol || ''
      });

      if (!rpcErr) {
        return;
      }
    }
  } catch {}

  try {
    // 2. Fallback de compatibilidade caso a RPC ainda não esteja no schema cache
    if (cleanProto) {
      await safeSupabaseExec(() => supabase.from('protocolo_mensagens').delete().eq('protocolo', cleanProto));
      await safeSupabaseExec(() => supabase.from('protocolo_mensagens').delete().eq('protocolo', `#${cleanProto}`));
    }
    if (targetId) {
      await safeSupabaseExec(() => supabase.from('protocolo_mensagens').delete().eq('denuncia_id', targetId));
      await safeSupabaseExec(() => supabase.from('mediacoes_acoes').delete().eq('denuncia_id', targetId));
      await safeSupabaseExec(() => supabase.from('termos_acordo_convivencia').delete().eq('denuncia_id', targetId));
      await safeSupabaseExec(() => supabase.from('checkins_acompanhamento').delete().eq('denuncia_id', targetId));
    }

    if (targetId) {
      await safeSupabaseExec(() => supabase.from('denuncias').update({ status: 'Excluído' }).eq('id', targetId));
      await safeSupabaseExec(() => supabase.from('denuncias').delete().eq('id', targetId));
    }
    if (targetProtocol) {
      await safeSupabaseExec(() => supabase.from('denuncias').update({ status: 'Excluído' }).eq('protocolo', targetProtocol));
      await safeSupabaseExec(() => supabase.from('denuncias').delete().eq('protocolo', targetProtocol));
    }
    if (cleanProto && cleanProto !== targetProtocol) {
      await safeSupabaseExec(() => supabase.from('denuncias').update({ status: 'Excluído' }).eq('protocolo', `#${cleanProto}`));
      await safeSupabaseExec(() => supabase.from('denuncias').delete().eq('protocolo', `#${cleanProto}`));
    }
  } catch (err) {
    console.warn('[Supabase Purge Denuncia Error]', err);
  }
}

// Helper para gerar UUID v4 válido compatível com PostgreSQL/Supabase
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    try {
      return crypto.randomUUID();
    } catch {}
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Helper para executar chamadas assíncronas do Supabase com tratamento de exceções
async function safeSupabaseExec<T>(fn: () => PromiseLike<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    console.warn('[Supabase Silent Error]', err);
    return null;
  }
}

function notifyStorageUpdated(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('storage_denuncias_updated'));
  }
}

const STORAGE_KEY_GESTAO_METADATA = 'stopbullying_gestao_metadata_v1';
const SYSTEM_GESTAO_METADATA_SEED = '__system_gestao_metadata_v1__';

const VALID_DENUNCIA_DB_COLUMNS = new Set([
  'id',
  'protocolo',
  'tipo_violencia',
  'local_escola',
  'descricao',
  'link_cyberbullying',
  'midia_anexa',
  'midia_tipo',
  'midia_duracao',
  'nivel_gravidade',
  'status',
  'data_envio',
  'tipos_selecionados',
  'turno',
  'frequencia',
  'papel_denunciante',
  'turma_envolvida',
  'provas_anexas',
  'nivel_escalada',
  'is_sos',
  'etapa_mediacao',
  'impactos_identificados',
  'medidas_protecao',
  'updated_at'
]);

export interface DenunciaExtraCloudMetadata {
  feedback_escola?: FeedbackEscola;
  historico_feedbacks?: FeedbackEscola[];
  historico_acoes?: { data_hora: string; acao: string; responsavel: string }[];
  escola_id?: string;
  escola_nome?: string;
  escola_ocorrencia_id?: string;
  escola_ocorrencia_nome?: string;
  serie_ocorrencia?: string;
  turma_ocorrencia?: string;
  turno_ocorrencia?: string;
  escola_acusado_id?: string;
  escola_acusado_nome?: string;
  serie_acusado?: string;
  turma_acusado?: string;
  turno_acusado?: string;
  agressor_grupo?: string;
}

export interface GestaoCloudMetadata {
  denunciaExtras: Record<string, DenunciaExtraCloudMetadata>;
  sosExtras: Record<string, { escola_id?: string; escola_nome?: string }>;
  emailsConfig?: {
    emailConselhoTutelar: string;
    emailEscola: string;
    telefoneConselhoTutelar: string;
    responsavelEnvio: string;
    ultimoRelatorioMensalEnviado?: string;
    agendamentoAtivo: boolean;
  };
  deletedIds?: string[];
  deletedProtocolos?: string[];
  updatedAt: string;
}

function getLocalGestaoMetadata(): GestaoCloudMetadata {
  const empty: GestaoCloudMetadata = {
    denunciaExtras: {},
    sosExtras: {},
    updatedAt: new Date().toISOString()
  };
  try {
    if (typeof window === 'undefined') return empty;
    const raw = localStorage.getItem(STORAGE_KEY_GESTAO_METADATA);
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    return {
      denunciaExtras: parsed?.denunciaExtras || {},
      sosExtras: parsed?.sosExtras || {},
      emailsConfig: parsed?.emailsConfig,
      deletedIds: Array.isArray(parsed?.deletedIds) ? parsed.deletedIds : [],
      deletedProtocolos: Array.isArray(parsed?.deletedProtocolos) ? parsed.deletedProtocolos : [],
      updatedAt: parsed?.updatedAt || new Date().toISOString()
    };
  } catch {
    return empty;
  }
}

function saveLocalGestaoMetadata(meta: GestaoCloudMetadata): void {
  try {
    if (typeof window === 'undefined') return;
    meta.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY_GESTAO_METADATA, JSON.stringify(meta));
  } catch {}
}

export function updateLocalDenunciaExtraMetadata(
  id?: string,
  protocolo?: string,
  patch?: Partial<DenunciaExtraCloudMetadata>
): void {
  if (!patch) return;
  const meta = getLocalGestaoMetadata();
  const keys: string[] = [];
  if (id) keys.push(id);
  if (protocolo) keys.push(cleanProtocolKey(protocolo));

  keys.forEach(k => {
    if (!k) return;
    meta.denunciaExtras[k] = {
      ...(meta.denunciaExtras[k] || {}),
      ...patch
    };
  });

  saveLocalGestaoMetadata(meta);
  pushGestaoMetadataToSupabase(meta).catch(() => {});
}

export async function pushGestaoMetadataToSupabase(customMeta?: GestaoCloudMetadata): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    const localMeta = customMeta || getLocalGestaoMetadata();
    const { ids, protocolos } = getDeletedDenunciasRegistry();
    const mergedDeletedIds = Array.from(new Set([...(localMeta.deletedIds || []), ...Array.from(ids)]));
    const mergedDeletedProtos = Array.from(new Set([...(localMeta.deletedProtocolos || []), ...Array.from(protocolos)]));

    // Buscar snapshot existente na nuvem para mesclar sem sobrescrever dados de outros dispositivos
    const { data: existingRow } = await supabase
      .from('estudantes_gamificacao')
      .select('stats')
      .eq('student_seed', SYSTEM_GESTAO_METADATA_SEED)
      .maybeSingle();

    const cloudStats = (existingRow?.stats || {}) as Partial<GestaoCloudMetadata>;
    const mergedDenunciaExtras: Record<string, DenunciaExtraCloudMetadata> = {
      ...(cloudStats.denunciaExtras || {})
    };

    Object.entries(localMeta.denunciaExtras || {}).forEach(([k, val]) => {
      mergedDenunciaExtras[k] = {
        ...(mergedDenunciaExtras[k] || {}),
        ...val
      };
    });

    const mergedSosExtras: Record<string, { escola_id?: string; escola_nome?: string }> = {
      ...(cloudStats.sosExtras || {}),
      ...(localMeta.sosExtras || {})
    };

    const finalPayload: GestaoCloudMetadata = {
      denunciaExtras: mergedDenunciaExtras,
      sosExtras: mergedSosExtras,
      emailsConfig: localMeta.emailsConfig || cloudStats.emailsConfig,
      deletedIds: Array.from(new Set([...(cloudStats.deletedIds || []), ...mergedDeletedIds])),
      deletedProtocolos: Array.from(new Set([...(cloudStats.deletedProtocolos || []), ...mergedDeletedProtos])),
      updatedAt: new Date().toISOString()
    };

    saveLocalGestaoMetadata(finalPayload);

    await supabase.from('estudantes_gamificacao').upsert({
      student_seed: SYSTEM_GESTAO_METADATA_SEED,
      student_code: 'SYS-GESTAO-META',
      current_level: 1,
      current_xp: 0,
      next_level_xp: 100,
      level_title: 'System Gestao Metadata Store',
      stats: finalPayload,
      updated_at: new Date().toISOString()
    }, { onConflict: 'student_seed' });

    broadcastCloudChange('gestao_metadata');
  } catch (err) {
    console.warn('[Supabase Push Gestao Metadata Warn]', err);
  }
}

async function fetchGestaoMetadataFromSupabase(): Promise<GestaoCloudMetadata> {
  const supabase = getSupabase();
  const localMeta = getLocalGestaoMetadata();
  if (!supabase) return localMeta;

  try {
    const { data, error } = await supabase
      .from('estudantes_gamificacao')
      .select('stats')
      .eq('student_seed', SYSTEM_GESTAO_METADATA_SEED)
      .maybeSingle();

    if (!error && data && data.stats && typeof data.stats === 'object') {
      const cloudStats = data.stats as Partial<GestaoCloudMetadata>;
      const mergedDenunciaExtras: Record<string, DenunciaExtraCloudMetadata> = {
        ...(localMeta.denunciaExtras || {})
      };
      Object.entries(cloudStats.denunciaExtras || {}).forEach(([k, val]) => {
        mergedDenunciaExtras[k] = {
          ...(mergedDenunciaExtras[k] || {}),
          ...val
        };
      });

      const merged: GestaoCloudMetadata = {
        denunciaExtras: mergedDenunciaExtras,
        sosExtras: {
          ...(localMeta.sosExtras || {}),
          ...(cloudStats.sosExtras || {})
        },
        emailsConfig: cloudStats.emailsConfig || localMeta.emailsConfig,
        deletedIds: Array.from(new Set([...(localMeta.deletedIds || []), ...(cloudStats.deletedIds || [])])),
        deletedProtocolos: Array.from(new Set([...(localMeta.deletedProtocolos || []), ...(cloudStats.deletedProtocolos || [])])),
        updatedAt: cloudStats.updatedAt || new Date().toISOString()
      };

      // Atualiza tombstones locais se vieram da nuvem
      merged.deletedIds?.forEach(id => recordDenunciaAsDeleted(id, undefined));
      merged.deletedProtocolos?.forEach(proto => recordDenunciaAsDeleted(undefined, proto));

      if (merged.emailsConfig && typeof window !== 'undefined') {
        try {
          localStorage.setItem('stopbullying_emails_config_v1', JSON.stringify(merged.emailsConfig));
        } catch {}
      }

      saveLocalGestaoMetadata(merged);
      return merged;
    }
  } catch (err) {
    console.warn('[Supabase Fetch Gestao Metadata Warn]', err);
  }
  return localMeta;
}

function hydrateDenunciaRecord(
  rawDenuncia: any,
  mediacoesRows: any[],
  termoRow: any | undefined,
  checkinsRows: any[],
  meta: GestaoCloudMetadata,
  localFallback?: Denuncia
): Denuncia {
  const cleanProto = cleanProtocolKey(rawDenuncia.protocolo || '');
  const extraById = rawDenuncia.id ? meta.denunciaExtras[rawDenuncia.id] : undefined;
  const extraByProto = cleanProto ? meta.denunciaExtras[cleanProto] : undefined;
  const extra: DenunciaExtraCloudMetadata = {
    ...(extraByProto || {}),
    ...(extraById || {})
  };

  // 1. Ações de Mediação (mescla banco + local sem duplicar)
  const dbAcoes: MediacaoAction[] = (mediacoesRows || []).map((m: any) => ({
    id: m.id,
    autor: m.autor || 'Coordenação / Mediação',
    acao: m.acao || '',
    dataHora: m.data_hora || m.created_at || new Date().toISOString(),
    categoria: (m.categoria as MediacaoAction['categoria']) || 'Geral'
  }));
  const localAcoes = localFallback?.acoes_mediacao || [];
  const mergedAcoesMap = new Map<string, MediacaoAction>();
  dbAcoes.forEach(a => mergedAcoesMap.set(`${(a.acao || '').trim()}_${a.autor}`, a));
  localAcoes.forEach(a => {
    const key = `${(a.acao || '').trim()}_${a.autor}`;
    if (!mergedAcoesMap.has(key)) {
      mergedAcoesMap.set(key, a);
    }
  });
  const acoes_mediacao = Array.from(mergedAcoesMap.values());

  // 2. Termo de Acordo de Convivência
  let termo_acordo: TermoAcordoConvivencia | undefined = localFallback?.termo_acordo;
  if (termoRow) {
    termo_acordo = {
      mediador: termoRow.mediador || 'Coordenação Pedagógica',
      compromissos: Array.isArray(termoRow.compromissos) ? termoRow.compromissos : [],
      reparacao_simbolica: termoRow.reparacao_simbolica || '',
      status: termoRow.status || 'Em cumprimento',
      firmado_em: termoRow.firmado_em || termoRow.created_at || new Date().toISOString(),
      data_revisao: termoRow.data_revisao || undefined
    };
  }

  // 3. Check-ins de acompanhamento (7, 15, 30, 60 dias)
  const dbCheckins: CheckinAcompanhamento[] = (checkinsRows || []).map((c: any) => ({
    id: c.id,
    dia: (Number(c.dia) as 7 | 15 | 30 | 60) || 7,
    responsavel: c.responsavel || 'Comissão de Mediação',
    status_estudante: c.status_estudante || 'Seguro e Integrado',
    observacoes: c.observacoes || '',
    data: c.data || c.created_at || new Date().toISOString()
  }));
  const localCheckins = localFallback?.checkins_acompanhamento || [];
  const mergedCheckinsMap = new Map<string, CheckinAcompanhamento>();
  dbCheckins.forEach(c => mergedCheckinsMap.set(`${c.dia}_${c.observacoes.trim()}`, c));
  localCheckins.forEach(c => {
    const key = `${c.dia}_${c.observacoes.trim()}`;
    if (!mergedCheckinsMap.has(key)) {
      mergedCheckinsMap.set(key, c);
    }
  });
  const checkins_acompanhamento = Array.from(mergedCheckinsMap.values());

  // 4. Feedback / Devolutiva Oficial da Escola
  const feedback_escola = extra.feedback_escola || rawDenuncia.feedback_escola || localFallback?.feedback_escola;
  const historico_feedbacks = extra.historico_feedbacks || rawDenuncia.historico_feedbacks || localFallback?.historico_feedbacks || (feedback_escola ? [feedback_escola] : undefined);
  const historico_acoes = extra.historico_acoes || rawDenuncia.historico_acoes || localFallback?.historico_acoes;

  // 5. Campos de Escola e Turma
  const mergedRaw = {
    ...localFallback,
    ...rawDenuncia,
    escola_id: rawDenuncia.escola_id || extra.escola_id || localFallback?.escola_id,
    escola_nome: rawDenuncia.escola_nome || extra.escola_nome || localFallback?.escola_nome,
    escola_ocorrencia_id: rawDenuncia.escola_ocorrencia_id || extra.escola_ocorrencia_id || localFallback?.escola_ocorrencia_id,
    escola_ocorrencia_nome: rawDenuncia.escola_ocorrencia_nome || extra.escola_ocorrencia_nome || localFallback?.escola_ocorrencia_nome,
    serie_ocorrencia: rawDenuncia.serie_ocorrencia || extra.serie_ocorrencia || localFallback?.serie_ocorrencia,
    turma_ocorrencia: rawDenuncia.turma_ocorrencia || extra.turma_ocorrencia || localFallback?.turma_ocorrencia,
    turno_ocorrencia: rawDenuncia.turno_ocorrencia || extra.turno_ocorrencia || localFallback?.turno_ocorrencia,
    escola_acusado_id: rawDenuncia.escola_acusado_id || extra.escola_acusado_id || localFallback?.escola_acusado_id,
    escola_acusado_nome: rawDenuncia.escola_acusado_nome || extra.escola_acusado_nome || localFallback?.escola_acusado_nome,
    serie_acusado: rawDenuncia.serie_acusado || extra.serie_acusado || localFallback?.serie_acusado,
    turma_acusado: rawDenuncia.turma_acusado || extra.turma_acusado || localFallback?.turma_acusado,
    turno_acusado: rawDenuncia.turno_acusado || extra.turno_acusado || localFallback?.turno_acusado,
    agressor_grupo: rawDenuncia.agressor_grupo || extra.agressor_grupo || localFallback?.agressor_grupo,
    acoes_mediacao,
    termo_acordo,
    checkins_acompanhamento,
    feedback_escola,
    historico_feedbacks,
    historico_acoes
  };

  return normalizeDenunciaSchool(mergedRaw);
}

//Sincronização bidirecional completa com o Supabase PostgreSQL:
// Puxa todas as informações postadas pelo Painel de Gestão (denúncias, ações de mediação,
// termos de acordo, check-ins 7/15/30/60d, devolutivas oficiais, alertas SOS, mensagens de chat,
// e-mails institucionais, logs de auditoria e perfis de escolas) e envia eventuais pendências locais.
export async function syncFromSupabase(managementSessionToken?: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    // 0. Sincronizar perfis de escolas e escola ativa primeiro
    await syncEscolasFromSupabase().catch(() => {});

    // 1. Puxar metadados de gestão na nuvem (feedbacks, vínculos de escola, e-mails, exclusões)
    const cloudMeta = await fetchGestaoMetadataFromSupabase();

    // Preservar estado local antes da sincronização para reconciliação sem perda
    const localDenuncias = getDenuncias();
    const localDenunciasById = new Map<string, Denuncia>();
    const localDenunciasByProto = new Map<string, Denuncia>();
    localDenuncias.forEach(d => {
      if (d.id) localDenunciasById.set(d.id, d);
      if (d.protocolo) localDenunciasByProto.set(cleanProtocolKey(d.protocolo), d);
    });

    let dbDenuncias: any[] | null = null;
    const sessionToken = managementSessionToken || getGestaoSessionToken();

    // 2. Tentar via RPC autenticada da gestão se o token de sessão for fornecido
    if (sessionToken) {
      const { data: rpcRes, error: rpcErr } = await supabase.rpc('gestao_autenticar_e_listar_denuncias', {
        p_session_token: sessionToken
      });
      if (!rpcErr && rpcRes && rpcRes.success && Array.isArray(rpcRes.denuncias)) {
        dbDenuncias = rpcRes.denuncias;
      }
    }

    // 3. Fallback direto para a tabela denuncias
    if (!dbDenuncias) {
      const { data: directDenuncias, error } = await supabase
        .from('denuncias')
        .select('*')
        .neq('status', 'Excluído')
        .order('data_envio', { ascending: false });

      if (!error && Array.isArray(directDenuncias)) {
        dbDenuncias = directDenuncias;
      }
    }

    // 4. Buscar todas as tabelas relacionais do Painel de Gestão em paralelo
    const [
      mediacoesRes,
      termosRes,
      checkinsRes,
      msgsRes,
      logsRes
    ] = await Promise.all([
      supabase.from('mediacoes_acoes').select('*').order('data_hora', { ascending: true }),
      supabase.from('termos_acordo_convivencia').select('*'),
      supabase.from('checkins_acompanhamento').select('*').order('data', { ascending: true }),
      supabase.from('protocolo_mensagens').select('*').order('created_at', { ascending: true }),
      supabase.from('auditoria_logs').select('*').order('created_at', { ascending: false }).limit(100)
    ]);

    const dbMediacoes: any[] = (!mediacoesRes.error && Array.isArray(mediacoesRes.data)) ? mediacoesRes.data : [];
    const dbTermos: any[] = (!termosRes.error && Array.isArray(termosRes.data)) ? termosRes.data : [];
    const dbCheckins: any[] = (!checkinsRes.error && Array.isArray(checkinsRes.data)) ? checkinsRes.data : [];
    const dbMsgs: any[] = (!msgsRes.error && Array.isArray(msgsRes.data)) ? msgsRes.data : [];
    const dbLogs: any[] = (!logsRes.error && Array.isArray(logsRes.data)) ? logsRes.data : [];

    // Agrupar tabelas relacionais por denuncia_id
    const mediacoesByDenuncia = new Map<string, any[]>();
    dbMediacoes.forEach(m => {
      if (!m.denuncia_id) return;
      const arr = mediacoesByDenuncia.get(m.denuncia_id) || [];
      arr.push(m);
      mediacoesByDenuncia.set(m.denuncia_id, arr);
    });

    const termoByDenuncia = new Map<string, any>();
    dbTermos.forEach(t => {
      if (t.denuncia_id) termoByDenuncia.set(t.denuncia_id, t);
    });

    const checkinsByDenuncia = new Map<string, any[]>();
    dbCheckins.forEach(c => {
      if (!c.denuncia_id) return;
      const arr = checkinsByDenuncia.get(c.denuncia_id) || [];
      arr.push(c);
      checkinsByDenuncia.set(c.denuncia_id, arr);
    });

    if (Array.isArray(dbDenuncias)) {
      const hydratedList: Denuncia[] = dbDenuncias.map(raw => {
        const cleanProto = cleanProtocolKey(raw.protocolo || '');
        const localMatch = localDenunciasById.get(raw.id) || localDenunciasByProto.get(cleanProto);
        return hydrateDenunciaRecord(
          raw,
          mediacoesByDenuncia.get(raw.id) || [],
          termoByDenuncia.get(raw.id),
          checkinsByDenuncia.get(raw.id) || [],
          cloudMeta,
          localMatch
        );
      });

      // Verificar se há denúncias locais recém-criadas que ainda não subiram para a nuvem
      const cloudIds = new Set(dbDenuncias.map(d => d.id));
      const cloudProtos = new Set(dbDenuncias.map(d => cleanProtocolKey(d.protocolo || '')));
      let needsMetadataPush = false;

      for (const localD of localDenuncias) {
        const cleanP = cleanProtocolKey(localD.protocolo);
        if (!isDenunciaDeleted(localD.id, localD.protocolo)) {
          if (!cloudIds.has(localD.id) && !cloudProtos.has(cleanP)) {
            hydratedList.unshift(localD);
            // Enviar para o Supabase em background
            pushSingleDenunciaToSupabase(localD).catch(() => {});
          }

          // Reconciliar dados locais do Painel de Gestão que ainda não estavam na nuvem
          if (localD.feedback_escola || localD.escola_ocorrencia_id) {
            const existingExtra = cloudMeta.denunciaExtras[localD.id] || {};
            if (
              (localD.feedback_escola && !existingExtra.feedback_escola) ||
              (localD.escola_ocorrencia_id && !existingExtra.escola_ocorrencia_id)
            ) {
              cloudMeta.denunciaExtras[localD.id] = {
                ...existingExtra,
                feedback_escola: localD.feedback_escola || existingExtra.feedback_escola,
                historico_feedbacks: localD.historico_feedbacks || existingExtra.historico_feedbacks,
                historico_acoes: localD.historico_acoes || existingExtra.historico_acoes,
                escola_id: localD.escola_id || existingExtra.escola_id,
                escola_nome: localD.escola_nome || existingExtra.escola_nome,
                escola_ocorrencia_id: localD.escola_ocorrencia_id || existingExtra.escola_ocorrencia_id,
                escola_ocorrencia_nome: localD.escola_ocorrencia_nome || existingExtra.escola_ocorrencia_nome
              };
              cloudMeta.denunciaExtras[cleanP] = cloudMeta.denunciaExtras[localD.id];
              needsMetadataPush = true;
            }
          }

          // Reconciliar ações de mediação locais não presentes no banco
          if (localD.acoes_mediacao && localD.acoes_mediacao.length > 0) {
            const cloudAcoes = mediacoesByDenuncia.get(localD.id) || [];
            if (cloudAcoes.length === 0) {
              localD.acoes_mediacao.forEach(a => {
                safeSupabaseExec(() => supabase.from('mediacoes_acoes').insert({
                  id: (a.id && a.id.length >= 20) ? a.id : generateUUID(),
                  denuncia_id: localD.id,
                  autor: a.autor || 'Coordenação / Mediação',
                  categoria: a.categoria || 'Geral',
                  acao: a.acao || '',
                  data_hora: a.dataHora || a.data_hora || new Date().toISOString()
                }));
              });
            }
          }

          // Reconciliar termo de acordo local não presente no banco
          if (localD.termo_acordo && !termoByDenuncia.has(localD.id)) {
            const t = localD.termo_acordo;
            safeSupabaseExec(() => supabase.from('termos_acordo_convivencia').upsert({
              denuncia_id: localD.id,
              mediador: t.mediador,
              compromissos: t.compromissos,
              reparacao_simbolica: t.reparacao_simbolica || '',
              status: t.status,
              firmado_em: t.firmado_em || new Date().toISOString(),
              data_revisao: t.data_revisao || null
            }, { onConflict: 'denuncia_id' }));
          }

          // Reconciliar check-ins locais não presentes no banco
          if (localD.checkins_acompanhamento && localD.checkins_acompanhamento.length > 0) {
            const cloudChks = checkinsByDenuncia.get(localD.id) || [];
            if (cloudChks.length === 0) {
              localD.checkins_acompanhamento.forEach(c => {
                safeSupabaseExec(() => supabase.from('checkins_acompanhamento').insert({
                  id: (c.id && c.id.length >= 20) ? c.id : generateUUID(),
                  denuncia_id: localD.id,
                  dia: c.dia,
                  responsavel: c.responsavel,
                  status_estudante: c.status_estudante,
                  observacoes: c.observacoes,
                  data: c.data || new Date().toISOString()
                }));
              });
            }
          }
        }
      }

      if (needsMetadataPush) {
        pushGestaoMetadataToSupabase(cloudMeta).catch(() => {});
      }

      const active = filterActiveDenuncias(hydratedList);
      localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(active));
      notifyStorageUpdated();

      // Limpeza em segundo plano de possíveis itens marcados como excluídos localmente
      const { ids, protocolos } = getDeletedDenunciasRegistry();
      const zombieItems = dbDenuncias.filter(d => 
        (d.id && ids.has(d.id)) || 
        (d.protocolo && protocolos.has(cleanProtocolKey(d.protocolo)))
      );
      if (zombieItems.length > 0) {
        zombieItems.forEach(zombie => {
          purgeDenunciaFromCloud(zombie.id, zombie.protocolo).catch(() => {});
        });
      }
    }

    // 5. Sincronizar Alertas SOS
    let dbSOS: any[] | null = null;
    if (sessionToken) {
      const { data: rpcSos, error: rpcSosErr } = await supabase.rpc('gestao_listar_sos_alertas', {
        p_session_token: sessionToken
      });
      if (!rpcSosErr && rpcSos && rpcSos.success && Array.isArray(rpcSos.alertas)) {
        dbSOS = rpcSos.alertas;
      }
    }

    if (!dbSOS) {
      const { data: directSOS, error: sosError } = await supabase
        .from('sos_alertas')
        .select('*')
        .order('data_disparo', { ascending: false });

      if (!sosError && Array.isArray(directSOS)) {
        dbSOS = directSOS;
      }
    }

    if (Array.isArray(dbSOS)) {
      const escolaAtiva = getEscolaAtiva();
      const hydratedSOS: SOSAlert[] = dbSOS.map((s: any) => {
        const extraSos = cloudMeta.sosExtras[s.id];
        return {
          ...s,
          escola_id: s.escola_id || extraSos?.escola_id || escolaAtiva.id,
          escola_nome: s.escola_nome || extraSos?.escola_nome || escolaAtiva.nome
        };
      });
      localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify(hydratedSOS));
      notifyStorageUpdated();
    }

    // 6. Sincronizar Mensagens do Chat de Protocolos
    if (dbMsgs.length > 0) {
      const raw = localStorage.getItem(STORAGE_KEY_PROTOCOL_CHATS);
      const chats: Record<string, ProtocolChatMessage[]> = raw ? JSON.parse(raw) : {};

      dbMsgs.forEach((m: any) => {
        const clean = cleanProtocolKey(m.protocolo);
        if (!clean) return;
        if (!chats[clean]) chats[clean] = [];
        const exists = chats[clean].some(existing => existing.id === m.id);
        if (!exists) {
          chats[clean].push({
            id: m.id,
            protocolo: clean,
            remetente: m.remetente,
            autorNome: m.autor_nome || m.autorNome || (m.remetente === 'denunciante' ? 'Denunciante Anônimo(a)' : 'Comissão de Mediação & Acolhimento'),
            texto: m.texto,
            dataHora: m.created_at || m.dataHora || new Date().toISOString()
          });
        }
      });
      localStorage.setItem(STORAGE_KEY_PROTOCOL_CHATS, JSON.stringify(chats));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('protocol_chat_updated'));
      }
    }

    // 7. Sincronizar Logs de Auditoria da Gestão
    if (dbLogs.length > 0) {
      const formattedLogs = dbLogs.map((l: any) => ({
        type: l.tipo || 'SISTEMA',
        detail: l.detalhes || '',
        timestamp: l.created_at || new Date().toISOString()
      }));
      localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(formattedLogs));
    }
  } catch (err) {
    console.warn('[Supabase Sync]', err);
  }
}

export const getDenuncias = (): Denuncia[] => {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_DENUNCIAS) : null;
    if (!raw) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify([]));
      }
      return [];
    }
    const parsed: Denuncia[] = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const active = filterActiveDenuncias(parsed);
      if (active.length !== parsed.length && typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(active));
      }
      return active;
    }
    return [];
  } catch {
    return [];
  }
};

function buildSafeDenunciaDbPayload(nova: Denuncia): Record<string, any> {
  const hasSchoolHeader = (nova.descricao || '').includes('[Instituição de Ensino:');
  const embeddedDesc = hasSchoolHeader
    ? nova.descricao
    : `[Instituição de Ensino: ${nova.escola_nome || 'E.E.M.T.I. Alfredo Machado'} (ID: ${nova.escola_id || 'escola-eemti-alfredo-machado'})]\n\n${nova.descricao}`;

  return {
    id: nova.id,
    protocolo: nova.protocolo,
    tipo_violencia: nova.tipo_violencia,
    tipos_selecionados: nova.tipos_selecionados || [],
    local_escola: nova.local_escola,
    turno: nova.turno || 'Manhã',
    frequencia: nova.frequencia || 'Poucas vezes',
    papel_denunciante: nova.papel_denunciante || 'Sou a Vítima',
    turma_envolvida: nova.turma_envolvida || null,
    descricao: embeddedDesc,
    link_cyberbullying: nova.link_cyberbullying || null,
    midia_anexa: nova.midia_anexa || null,
    midia_tipo: nova.midia_tipo || null,
    midia_duracao: nova.midia_duracao || 0,
    provas_anexas: nova.provas_anexas || [],
    nivel_gravidade: nova.nivel_gravidade || 'Pendente',
    nivel_escalada: nova.nivel_escalada || 'Média',
    is_sos: Boolean(nova.is_sos),
    status: nova.status || 'Em Análise',
    etapa_mediacao: nova.etapa_mediacao || 'escuta_inicial',
    impactos_identificados: nova.impactos_identificados || [],
    medidas_protecao: nova.medidas_protecao || [],
    data_envio: nova.data_envio
  };
}

async function pushSingleDenunciaToSupabase(nova: Denuncia): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    const safePayload = buildSafeDenunciaDbPayload(nova);
    const { error } = await supabase.from('denuncias').upsert(safePayload, { onConflict: 'id' });
    if (error) {
      await supabase.from('denuncias').insert(safePayload);
    }
    broadcastCloudChange('denuncia_saved', nova.protocolo);
  } catch (err) {
    console.warn('[Supabase pushSingleDenunciaToSupabase Warn]', err);
  }
}

export const saveDenuncia = (denuncia: Omit<Denuncia, 'id' | 'data_envio' | 'status'> & { id?: string }): Denuncia => {
  const list = getDenuncias();
  const escolaAtiva = getEscolaAtiva();

  const escOcorrenciaId = denuncia.escola_ocorrencia_id || denuncia.escola_id || escolaAtiva.id;
  const escOcorrenciaNome = denuncia.escola_ocorrencia_nome || denuncia.escola_nome || escolaAtiva.nome;
  const escAcusadoId = denuncia.escola_acusado_id || null;
  const escAcusadoNome = denuncia.escola_acusado_nome || 'Não informada / Desconhecida';

  const nova: Denuncia = {
    ...denuncia,
    id: (denuncia.id && denuncia.id.length >= 20) ? denuncia.id : generateUUID(),
    escola_id: escOcorrenciaId,
    escola_nome: escOcorrenciaNome,
    escola_ocorrencia_id: escOcorrenciaId,
    escola_ocorrencia_nome: escOcorrenciaNome,
    escola_acusado_id: escAcusadoId || undefined,
    escola_acusado_nome: escAcusadoNome,
    data_envio: new Date().toISOString(),
    status: 'Em Análise'
  };
  list.unshift(nova);
  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(list));
    notifyStorageUpdated();
  } catch {}
  addLog('DENUNCIA_CRIADA', `Protocolo ${nova.protocolo} • ${nova.escola_nome}`);
  setLastCreatedProtocol(nova.protocolo);

  // Salva metadados complementares da escola e turma na nuvem
  updateLocalDenunciaExtraMetadata(nova.id, nova.protocolo, {
    escola_id: nova.escola_id,
    escola_nome: nova.escola_nome,
    escola_ocorrencia_id: nova.escola_ocorrencia_id,
    escola_ocorrencia_nome: nova.escola_ocorrencia_nome,
    serie_ocorrencia: nova.serie_ocorrencia,
    turma_ocorrencia: nova.turma_ocorrencia,
    turno_ocorrencia: nova.turno_ocorrencia,
    escola_acusado_id: nova.escola_acusado_id,
    escola_acusado_nome: nova.escola_acusado_nome,
    serie_acusado: nova.serie_acusado,
    turma_acusado: nova.turma_acusado,
    turno_acusado: nova.turno_acusado,
    agressor_grupo: nova.agressor_grupo
  });

  // Sincronização direta com a tabela denuncias no Supabase
  pushSingleDenunciaToSupabase(nova).catch(() => {});

  return nova;
};

export const saveDenunciaAsync = async (
  denuncia: Omit<Denuncia, 'id' | 'data_envio' | 'status'> & { id?: string }
): Promise<Denuncia> => {
  const nova = saveDenuncia(denuncia);
  await pushSingleDenunciaToSupabase(nova);
  return nova;
};

export const setLastCreatedProtocol = (protocolo: string) => {
  try {
    localStorage.setItem(STORAGE_KEY_LAST_PROTOCOL, protocolo.trim());
  } catch {}
};

export const getLastCreatedProtocol = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY_LAST_PROTOCOL);
  } catch {
    return null;
  }
};

export const getDenunciaByProtocolo = (protocolo: string): Denuncia | undefined => {
  if (!protocolo) return undefined;
  if (isDenunciaDeleted(undefined, protocolo)) return undefined;
  const list = getDenuncias();
  const cleanInput = cleanProtocolKey(protocolo);
  return list.find(d => {
    const cleanProto = cleanProtocolKey(d.protocolo);
    return cleanProto === cleanInput;
  });
};

export async function fetchDenunciaByProtocoloFromCloud(protocolo: string): Promise<Denuncia | null> {
  const clean = cleanProtocolKey(protocolo);
  if (!clean) return null;
  if (isDenunciaDeleted(undefined, clean)) return null;
  const supabase = getSupabase();
  if (!supabase) return getDenunciaByProtocolo(clean) || null;

  try {
    let rawDenuncia: any = null;

    // 1. Tentar RPC segura se disponível
    const { data: rpcData, error: rpcErr } = await supabase.rpc('consultar_denuncia_protocolo', {
      p_protocolo: clean
    });

    if (!rpcErr && rpcData && rpcData.found && rpcData.denuncia) {
      rawDenuncia = rpcData.denuncia;
    }

    // 2. Fallback direto na tabela denuncias
    if (!rawDenuncia) {
      const { data, error } = await supabase
        .from('denuncias')
        .select('*')
        .or(`protocolo.eq.${clean},protocolo.eq.#${clean}`)
        .limit(1);

      if (!error && Array.isArray(data) && data.length > 0) {
        rawDenuncia = data[0];
      }
    }

    if (rawDenuncia && rawDenuncia.status !== 'Excluído') {
      // Buscar todas as informações postadas pelo Painel de Gestão para este protocolo
      const [cloudMeta, medRes, termoRes, chkRes] = await Promise.all([
        fetchGestaoMetadataFromSupabase(),
        supabase.from('mediacoes_acoes').select('*').eq('denuncia_id', rawDenuncia.id).order('data_hora', { ascending: true }),
        supabase.from('termos_acordo_convivencia').select('*').eq('denuncia_id', rawDenuncia.id).maybeSingle(),
        supabase.from('checkins_acompanhamento').select('*').eq('denuncia_id', rawDenuncia.id).order('data', { ascending: true })
      ]);

      const currentList = getDenuncias();
      const existingLocal = currentList.find(d => cleanProtocolKey(d.protocolo) === clean || d.id === rawDenuncia.id);

      const hydratedItem = hydrateDenunciaRecord(
        rawDenuncia,
        (!medRes.error && Array.isArray(medRes.data)) ? medRes.data : [],
        !termoRes.error ? termoRes.data : undefined,
        (!chkRes.error && Array.isArray(chkRes.data)) ? chkRes.data : [],
        cloudMeta,
        existingLocal
      );

      const updatedList = existingLocal
        ? currentList.map(d => (d.id === hydratedItem.id || cleanProtocolKey(d.protocolo) === clean) ? hydratedItem : d)
        : [hydratedItem, ...currentList];

      try {
        localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updatedList));
        notifyStorageUpdated();
      } catch {}

      return hydratedItem;
    }
  } catch (err) {
    console.warn('[Fetch Denuncia Protocolo Error]', err);
  }

  return getDenunciaByProtocolo(clean) || null;
}

export const getProtocolMessages = (protocolo: string): ProtocolChatMessage[] => {
  if (!protocolo) return [];
  const clean = cleanProtocolKey(protocolo);
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROTOCOL_CHATS);
    const chats: Record<string, ProtocolChatMessage[]> = raw ? JSON.parse(raw) : {};
    if (chats[clean] && chats[clean].length > 0) {
      // Deduplicar mensagens por id para evitar erros de chave duplicada no React
      const seen = new Set<string>();
      const deduped: ProtocolChatMessage[] = [];
      chats[clean].forEach(msg => {
        if (msg && msg.id && !seen.has(msg.id)) {
          seen.add(msg.id);
          deduped.push(msg);
        }
      });
      if (deduped.length !== chats[clean].length) {
        chats[clean] = deduped;
        localStorage.setItem(STORAGE_KEY_PROTOCOL_CHATS, JSON.stringify(chats));
      }
      return deduped;
    }
    // Mensagem inicial padrão de acolhimento caso ainda não haja mensagens
    const defaultWelcome: ProtocolChatMessage = {
      id: 'msg-welcome-' + clean,
      protocolo: clean,
      remetente: 'coordenacao',
      autorNome: 'Comissão de Mediação & Acolhimento (EEMTI Alfredo Machado)',
      texto: 'Olá! Recebemos o seu protocolo com segurança e total sigilo. O seu relato está sendo avaliado com prioridade pela equipe pedagógica. Se desejar acrescentar detalhes ou tirar dúvidas, pode responder por este chat seguro.',
      dataHora: new Date().toISOString()
    };
    chats[clean] = [defaultWelcome];
    localStorage.setItem(STORAGE_KEY_PROTOCOL_CHATS, JSON.stringify(chats));
    return [defaultWelcome];
  } catch {
    return [];
  }
};

export const sendProtocolMessage = (
  protocolo: string, 
  remetente: 'denunciante' | 'coordenacao', 
  texto: string,
  autorNome?: string
): ProtocolChatMessage => {
  const clean = cleanProtocolKey(protocolo);
  const novaMsg: ProtocolChatMessage = {
    id: generateUUID(),
    protocolo: clean,
    remetente,
    autorNome: autorNome || (remetente === 'denunciante' ? 'Denunciante Anônimo(a)' : 'Comissão de Mediação & Acolhimento'),
    texto: texto.trim(),
    dataHora: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROTOCOL_CHATS);
    const chats: Record<string, ProtocolChatMessage[]> = raw ? JSON.parse(raw) : {};
    const list = chats[clean] || [];
    list.push(novaMsg);
    chats[clean] = list;
    localStorage.setItem(STORAGE_KEY_PROTOCOL_CHATS, JSON.stringify(chats));
  } catch {}

  addLog('CHAT_PROTOCOLO_MSG', `Msg no protocolo ${clean} por ${remetente}`);

  // Dispara evento customizado para atualizar componentes em tempo real no mesmo navegador/janela
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('protocol_chat_updated', { detail: { protocolo: clean } }));
  }

  // Sincronização com Supabase (PostgreSQL)
  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('protocolo_mensagens').insert({
      id: novaMsg.id,
      protocolo: novaMsg.protocolo,
      remetente: novaMsg.remetente,
      autor_nome: novaMsg.autorNome,
      texto: novaMsg.texto
    })).then(() => {
      broadcastCloudChange('protocol_msg', novaMsg.protocolo);
    });
  }

  return novaMsg;
};

// Sincronização pontual das mensagens de um protocolo específico direto da nuvem
export async function fetchProtocolMessagesFromCloud(protocolo: string): Promise<ProtocolChatMessage[]> {
  const clean = cleanProtocolKey(protocolo);
  const supabase = getSupabase();
  if (!supabase || !clean) {
    return getProtocolMessages(clean);
  }

  try {
    const { data: dbMsgs, error } = await supabase
      .from('protocolo_mensagens')
      .select('*')
      .eq('protocolo', clean)
      .order('created_at', { ascending: true });

    if (!error && Array.isArray(dbMsgs) && dbMsgs.length > 0) {
      const raw = localStorage.getItem(STORAGE_KEY_PROTOCOL_CHATS);
      const chats: Record<string, ProtocolChatMessage[]> = raw ? JSON.parse(raw) : {};
      const currentList = chats[clean] || [];

      dbMsgs.forEach((m: any) => {
        const exists = currentList.some(existing => existing.id === m.id);
        if (!exists) {
          currentList.push({
            id: m.id,
            protocolo: clean,
            remetente: m.remetente,
            autorNome: m.autor_nome || m.autorNome || (m.remetente === 'denunciante' ? 'Denunciante Anônimo(a)' : 'Comissão de Mediação & Acolhimento'),
            texto: m.texto,
            dataHora: m.created_at || m.dataHora || new Date().toISOString()
          });
        }
      });

      chats[clean] = currentList;
      localStorage.setItem(STORAGE_KEY_PROTOCOL_CHATS, JSON.stringify(chats));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('protocol_chat_updated', { detail: { protocolo: clean } }));
      }
      return currentList;
    }
  } catch (err) {
    console.warn('[Fetch Cloud Messages Error]', err);
  }

  return getProtocolMessages(clean);
}

export const updateDenunciaStatus = (id: string, newStatus: ComplaintStatus): Denuncia[] => {
  const list = getDenuncias();
  const updated = list.map(d => d.id === id ? { ...d, status: newStatus } : d);
  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
  } catch {}
  addLog('STATUS_ATUALIZADO', `Denúncia ID ${id} -> ${newStatus}`);

  const supabase = getSupabase();
  if (supabase) {
    const targetProto = updated.find(d => d.id === id)?.protocolo;
    (async () => {
      try {
        const sessionToken = getGestaoSessionToken();
        const { error } = await supabase.rpc('gestao_atualizar_denuncia', {
          p_session_token: sessionToken,
          p_denuncia_id: id,
          p_dados: { status: newStatus }
        });
        if (error) {
          await safeSupabaseExec(() => supabase.from('denuncias').update({ status: newStatus }).eq('id', id));
        }
      } catch {
        await safeSupabaseExec(() => supabase.from('denuncias').update({ status: newStatus }).eq('id', id));
      }
      broadcastCloudChange('status_updated', targetProto);
    })();
  }

  return updated;
};

export const saveSOSAlert = (alertData: Omit<SOSAlert, 'id' | 'data_disparo' | 'status'>): SOSAlert => {
  let list: SOSAlert[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SOS);
    list = raw ? JSON.parse(raw) : [];
  } catch {}
  const escolaAtiva = getEscolaAtiva();
  const novo: SOSAlert = {
    ...alertData,
    id: generateUUID(),
    escola_id: alertData.escola_id || escolaAtiva.id,
    escola_nome: alertData.escola_nome || escolaAtiva.nome,
    data_disparo: new Date().toISOString(),
    status: 'URGENTE'
  };
  list.unshift(novo);
  try {
    localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify(list));
    notifyStorageUpdated();
  } catch {}
  addLog('SOS_DISPARO', `Lat: ${alertData.latitude}, Lng: ${alertData.longitude} • ${novo.escola_nome}`);

  // Persistir vínculo da escola do alerta SOS nos metadados da nuvem
  const meta = getLocalGestaoMetadata();
  meta.sosExtras[novo.id] = {
    escola_id: novo.escola_id,
    escola_nome: novo.escola_nome
  };
  saveLocalGestaoMetadata(meta);
  pushGestaoMetadataToSupabase(meta).catch(() => {});

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('sos_alertas').upsert({
      id: novo.id,
      latitude: novo.latitude,
      longitude: novo.longitude,
      precisao_metros: novo.precisao_metros,
      dispositivo_info: novo.dispositivo_info,
      local_aproximado: novo.local_aproximado,
      status: novo.status,
      data_disparo: novo.data_disparo
    }, { onConflict: 'id' }));
  }

  return novo;
};

export const saveSOSAlertAsync = async (
  alertData: Omit<SOSAlert, 'id' | 'data_disparo' | 'status'>
): Promise<SOSAlert> => {
  const novo = saveSOSAlert(alertData);
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('sos_alertas').upsert({
        id: novo.id,
        latitude: novo.latitude,
        longitude: novo.longitude,
        precisao_metros: novo.precisao_metros,
        dispositivo_info: novo.dispositivo_info,
        local_aproximado: novo.local_aproximado,
        status: novo.status,
        data_disparo: novo.data_disparo
      }, { onConflict: 'id' });
    } catch (err) {
      console.warn('[Supabase saveSOSAlertAsync Warn]', err);
    }
  }
  return novo;
};

export interface TriagemData {
  student_seed?: string;
  nivel_risco: string;
  score_total?: number;
  respostas?: Record<string, any>;
  orientacao_recomendada?: string;
}

export const saveTriagemAsync = async (data: TriagemData): Promise<void> => {
  addLog('TRIAGEM_CONCLUIDA', `Nível: ${data.nivel_risco} • Score: ${data.score_total || 0}`);
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('triagens_avaliacoes').insert({
        id: generateUUID(),
        student_seed: data.student_seed || null,
        nivel_risco: data.nivel_risco,
        score_total: data.score_total || 0,
        respostas: data.respostas || {},
        orientacao_recomendada: data.orientacao_recomendada || null
      });
    } catch (err) {
      console.warn('[Supabase saveTriagemAsync Warn]', err);
    }
  }
};

export interface DiarioEmocionalData {
  student_seed?: string;
  emocao: string;
  intensidade?: number;
  gatilho?: string;
  fez_respiracao_478?: boolean;
}

export const saveDiarioEmocionalAsync = async (data: DiarioEmocionalData): Promise<void> => {
  addLog('DIARIO_EMOCIONAL', `Emoção: ${data.emocao} • Respiração 4-7-8: ${data.fez_respiracao_478 ? 'Sim' : 'Não'}`);
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('diario_emocional_registros').insert({
        id: generateUUID(),
        student_seed: data.student_seed || null,
        emocao: data.emocao,
        intensidade: data.intensidade || 3,
        gatilho: data.gatilho || null,
        fez_respiracao_478: Boolean(data.fez_respiracao_478)
      });
    } catch (err) {
      console.warn('[Supabase saveDiarioEmocionalAsync Warn]', err);
    }
  }
};

export interface QuizTentativaData {
  student_seed?: string;
  score_percent: number;
  total_questions: number;
  correct_answers: number;
}

export const saveQuizTentativaAsync = async (data: QuizTentativaData): Promise<void> => {
  addLog('QUIZ_CONCLUIDO', `Score: ${data.score_percent}% (${data.correct_answers}/${data.total_questions})`);
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('quiz_tentativas').insert({
        id: generateUUID(),
        student_seed: data.student_seed || null,
        score_percent: data.score_percent,
        total_questions: data.total_questions,
        correct_answers: data.correct_answers
      });
    } catch (err) {
      console.warn('[Supabase saveQuizTentativaAsync Warn]', err);
    }
  }
};

export const syncStudentGamificationAsync = async (profile: any): Promise<void> => {
  if (!profile || !profile.studentSeed) return;
  const supabase = getSupabase();
  if (supabase) {
    try {
      await supabase.from('estudantes_gamificacao').upsert({
        student_seed: profile.studentSeed,
        student_code: profile.studentCode || '',
        current_level: profile.currentLevel || 1,
        current_xp: profile.currentXp || 0,
        next_level_xp: profile.nextLevelXp || 100,
        level_title: profile.levelTitle || 'Stop Aprendiz',
        equipped_icon_id: profile.equippedIconId || 'icon_anonimo_padrao',
        equipped_frame_id: profile.equippedFrameId || 'frame_leao_dourado_supremo',
        equipped_badge_id: profile.equippedBadgeId || 'badge_estrela_bronze',
        equipped_title_id: profile.equippedTitleId || 'title_sentinela_aprendiz',
        equipped_effect_id: profile.equippedEffectId || 'effect_nenhum',
        unlocked_cosmetics: profile.unlockedCosmetics || [],
        unlocked_achievements: profile.unlockedAchievements || [],
        stats: profile.stats || {},
        updated_at: new Date().toISOString()
      }, { onConflict: 'student_seed' });
    } catch (err) {
      console.warn('[Supabase syncStudentGamificationAsync Warn]', err);
    }
  }
};

export const addLog = (type: string, detail: string) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    const list = raw ? JSON.parse(raw) : [];
    const logItem = { type, detail, timestamp: new Date().toISOString() };
    list.unshift(logItem);
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(list.slice(0, 100)));

    const supabase = getSupabase();
    if (supabase) {
      safeSupabaseExec(() => supabase.from('auditoria_logs').insert({
        tipo: type,
        detalhes: detail
      }));
    }
  } catch {
    // silent fail
  }
};

export const addMediacaoAction = (
  denunciaId: string, 
  acao: string, 
  autor: string = 'Coordenação / Mediação',
  categoria: MediacaoAction['categoria'] = 'Geral'
): Denuncia[] => {
  const list = getDenuncias();
  const novaAcao: MediacaoAction = {
    id: generateUUID(),
    autor,
    acao: acao.trim(),
    dataHora: new Date().toISOString(),
    categoria
  };

  let statusChangedToAcolhido = false;
  const updated = list.map(d => {
    if (d.id === denunciaId) {
      const acoes = d.acoes_mediacao || [];
      if (d.status === 'Em Análise') {
        statusChangedToAcolhido = true;
      }
      return {
        ...d,
        acoes_mediacao: [...acoes, novaAcao],
        status: d.status === 'Em Análise' ? ('Acolhido' as ComplaintStatus) : d.status
      };
    }
    return d;
  });

  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
    notifyStorageUpdated();
  } catch {}
  addLog('MED_ACAO_REGISTRADA', `Denúncia ID ${denunciaId}: ${categoria} - ${acao.slice(0, 40)}`);

  const supabase = getSupabase();
  if (supabase) {
    const targetProto = updated.find(d => d.id === denunciaId)?.protocolo;
    safeSupabaseExec(() => supabase.from('mediacoes_acoes').insert({
      id: novaAcao.id,
      denuncia_id: denunciaId,
      autor,
      categoria,
      acao: acao.trim(),
      data_hora: novaAcao.dataHora
    })).then(() => {
      broadcastCloudChange('mediacao_action', targetProto);
    });
    if (statusChangedToAcolhido) {
      safeSupabaseExec(() => supabase.from('denuncias').update({ status: 'Acolhido' }).eq('id', denunciaId));
    }
  }

  return updated;
};

export const toggleDenunciaSOS = (denunciaId: string, forcedValue?: boolean): Denuncia[] => {
  const list = getDenuncias();
  const updated = list.map(d => {
    if (d.id === denunciaId) {
      const is_sos = forcedValue !== undefined ? forcedValue : !d.is_sos;
      return { ...d, is_sos };
    }
    return d;
  });
  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
    notifyStorageUpdated();
  } catch {}
  addLog('DENUNCIA_SOS_TOGGLE', `Denúncia ID ${denunciaId}`);

  const supabase = getSupabase();
  if (supabase) {
    const item = updated.find(d => d.id === denunciaId);
    if (item) {
      safeSupabaseExec(() => supabase.from('denuncias').update({ is_sos: item.is_sos }).eq('id', denunciaId)).then(() => {
        broadcastCloudChange('sos_toggle', item.protocolo);
      });
    }
  }

  return updated;
};

export const updateDenunciaMediacao = (
  denunciaId: string, 
  partial: Partial<Denuncia>
): Denuncia[] => {
  const list = getDenuncias();
  let targetProtocol: string | undefined;
  const updated = list.map(d => {
    if (d.id === denunciaId) {
      targetProtocol = d.protocolo;
      return { ...d, ...partial };
    }
    return d;
  });
  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
    notifyStorageUpdated();
  } catch {}
  addLog('MED_DADOS_ATUALIZADOS', `Denúncia ID ${denunciaId} atualizada com dados de mediação`);

  // Filtrar colunas válidas da tabela denuncias no Supabase
  const dbPartial: Record<string, any> = {};
  const extraPatch: Partial<DenunciaExtraCloudMetadata> = {};
  let hasExtra = false;

  Object.entries(partial).forEach(([key, value]) => {
    if (VALID_DENUNCIA_DB_COLUMNS.has(key)) {
      dbPartial[key] = value;
    } else if (key !== 'acoes_mediacao' && key !== 'termo_acordo' && key !== 'checkins_acompanhamento') {
      (extraPatch as any)[key] = value;
      hasExtra = true;
    }
  });

  if (hasExtra) {
    updateLocalDenunciaExtraMetadata(denunciaId, targetProtocol, extraPatch);
  }

  const supabase = getSupabase();
  if (supabase && Object.keys(dbPartial).length > 0) {
    safeSupabaseExec(() => supabase.from('denuncias').update(dbPartial).eq('id', denunciaId)).then(() => {
      broadcastCloudChange('mediacao_updated', targetProtocol);
    });
  }

  return updated;
};

export const salvarTermoAcordo = (
  denunciaId: string, 
  termo: TermoAcordoConvivencia
): Denuncia[] => {
  const list = getDenuncias();
  let targetProtocol: string | undefined;
  const updated = list.map(d => {
    if (d.id === denunciaId) {
      targetProtocol = d.protocolo;
      return {
        ...d,
        termo_acordo: termo,
        etapa_mediacao: 'acordo_firmado' as EtapaMediacao,
        status: 'Acolhido' as ComplaintStatus
      };
    }
    return d;
  });
  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
    notifyStorageUpdated();
  } catch {}
  addLog('TERMO_ACORDO_FIRMADO', `Acordo formalizado na denúncia ${denunciaId}`);

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('termos_acordo_convivencia').upsert({
      denuncia_id: denunciaId,
      mediador: termo.mediador,
      compromissos: termo.compromissos,
      reparacao_simbolica: termo.reparacao_simbolica,
      status: termo.status,
      firmado_em: termo.firmado_em || new Date().toISOString(),
      data_revisao: termo.data_revisao || null
    }, { onConflict: 'denuncia_id' })).then(() => {
      broadcastCloudChange('termo_acordo', targetProtocol);
    });

    safeSupabaseExec(() => supabase.from('denuncias').update({
      etapa_mediacao: 'acordo_firmado',
      status: 'Acolhido'
    }).eq('id', denunciaId));
  }

  return updated;
};

export const addCheckinAcompanhamento = (
  denunciaId: string,
  checkin: Omit<CheckinAcompanhamento, 'id' | 'data'>
): Denuncia[] => {
  const list = getDenuncias();
  const novo: CheckinAcompanhamento = {
    ...checkin,
    id: generateUUID(),
    data: new Date().toISOString()
  };

  let targetProtocol: string | undefined;
  const updated = list.map(d => {
    if (d.id === denunciaId) {
      targetProtocol = d.protocolo;
      const anteriores = d.checkins_acompanhamento || [];
      return {
        ...d,
        checkins_acompanhamento: [...anteriores, novo],
        etapa_mediacao: 'monitoramento' as EtapaMediacao
      };
    }
    return d;
  });

  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
    notifyStorageUpdated();
  } catch {}
  addLog('CHECKIN_ACOMPANHAMENTO', `Checkin ${checkin.dia}d registrado na denúncia ${denunciaId}`);

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('checkins_acompanhamento').insert({
      id: novo.id,
      denuncia_id: denunciaId,
      dia: checkin.dia,
      responsavel: checkin.responsavel,
      status_estudante: checkin.status_estudante,
      observacoes: checkin.observacoes,
      data: novo.data
    })).then(() => {
      broadcastCloudChange('checkin', targetProtocol);
    });

    safeSupabaseExec(() => supabase.from('denuncias').update({
      etapa_mediacao: 'monitoramento'
    }).eq('id', denunciaId));
  }

  return updated;
};

export const salvarFeedbackEscola = (
  denunciaId: string,
  feedbackData: Omit<FeedbackEscola, 'id' | 'data_hora'> & { id?: string; data_hora?: string },
  notificarNoChat = true
): Denuncia[] => {
  const list = getDenuncias();
  const agora = new Date().toISOString();
  const feedbackCompleto: FeedbackEscola = {
    ...feedbackData,
    id: feedbackData.id || generateUUID(),
    data_hora: feedbackData.data_hora || agora,
    notificado_ao_conselho_tutelar: feedbackData.notificado_ao_conselho_tutelar ?? true,
    notificado_ao_conselho_escolar: feedbackData.notificado_ao_conselho_escolar ?? true
  };

  let targetId = denunciaId;
  let targetProtocol: string | undefined;
  let nextHistoricoFeedbacks: FeedbackEscola[] = [feedbackCompleto];
  let nextHistoricoAcoes: { data_hora: string; acao: string; responsavel: string }[] = [];

  const updated = list.map(d => {
    if (d.id === denunciaId || d.protocolo === denunciaId || cleanProtocolKey(d.protocolo) === cleanProtocolKey(denunciaId)) {
      targetId = d.id;
      targetProtocol = d.protocolo;
      const anteriores = d.historico_feedbacks || [];
      const acoesAnteriores = d.historico_acoes || [];
      const novaAcao = {
        data_hora: new Date().toLocaleString('pt-BR'),
        acao: `Feedback/Devolutiva oficial registrada e comunicada ao denunciante: "${feedbackCompleto.titulo}"`,
        responsavel: feedbackCompleto.autor
      };

      nextHistoricoFeedbacks = [...anteriores, feedbackCompleto];
      nextHistoricoAcoes = [...acoesAnteriores, novaAcao];

      return {
        ...d,
        feedback_escola: feedbackCompleto,
        historico_feedbacks: nextHistoricoFeedbacks,
        historico_acoes: nextHistoricoAcoes
      };
    }
    return d;
  });

  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
  } catch {}
  addLog('FEEDBACK_ESCOLA_REGISTRADO', `Feedback registrado na denúncia ${targetId} (${feedbackCompleto.titulo})`);

  // Persistir devolutiva oficial nos metadados da nuvem (para puxar em qualquer dispositivo)
  updateLocalDenunciaExtraMetadata(targetId, targetProtocol, {
    feedback_escola: feedbackCompleto,
    historico_feedbacks: nextHistoricoFeedbacks,
    historico_acoes: nextHistoricoAcoes
  });

  // Se solicitado, registra mensagem formal no chat sigiloso do protocolo (ordem correta: protocolo, remetente, texto, autorNome)
  if (notificarNoChat && targetProtocol) {
    try {
      const msgChat = `📢 [DEVOLUTIVA OFICIAL DA ESCOLA]: ${feedbackCompleto.titulo}\n\n${feedbackCompleto.mensagem}${feedbackCompleto.orientacao_ao_estudante ? `\n\n🛡️ Orientações de Segurança: ${feedbackCompleto.orientacao_ao_estudante}` : ''}`;
      sendProtocolMessage(targetProtocol, 'coordenacao', msgChat, feedbackCompleto.autor);
    } catch (err) {
      console.warn('[Feedback Chat Message Error]', err);
    }
  }

  notifyStorageUpdated();

  const supabase = getSupabase();
  if (supabase && targetId) {
    // Registra também na tabela mediacoes_acoes para histórico relacional completo no PostgreSQL
    safeSupabaseExec(() => supabase.from('mediacoes_acoes').insert({
      id: generateUUID(),
      denuncia_id: targetId,
      autor: feedbackCompleto.autor,
      categoria: 'Geral',
      acao: `[DEVOLUTIVA OFICIAL • ${feedbackCompleto.status_resolucao}] ${feedbackCompleto.titulo}: ${feedbackCompleto.mensagem}`,
      data_hora: feedbackCompleto.data_hora
    }));

    if (feedbackCompleto.status_resolucao === 'pacificado') {
      safeSupabaseExec(() => supabase.from('denuncias').update({ status: 'Resolvido' }).eq('id', targetId));
    } else if (feedbackCompleto.status_resolucao === 'acolhido_em_analise' || feedbackCompleto.status_resolucao === 'medidas_adotadas') {
      safeSupabaseExec(() => supabase.from('denuncias').update({ status: 'Acolhido' }).eq('id', targetId));
    }
    broadcastCloudChange('feedback_escola', targetProtocol);
  }

  return updated;
};

export const deleteDenuncia = (denunciaId: string): Denuncia[] => {
  const list = getDenuncias();
  const denunciaToDelete = list.find(d => 
    d.id === denunciaId || 
    d.protocolo === denunciaId || 
    cleanProtocolKey(d.protocolo) === cleanProtocolKey(denunciaId)
  );
  const targetId = denunciaToDelete ? denunciaToDelete.id : denunciaId;
  const targetProtocol = denunciaToDelete ? denunciaToDelete.protocolo : (denunciaId.startsWith('#') || denunciaId.startsWith('STP-') ? denunciaId : undefined);

  // 1. Registra imediatamente no registro permanente de exclusões (tombstones) locais e na nuvem
  recordDenunciaAsDeleted(targetId, targetProtocol);
  const meta = getLocalGestaoMetadata();
  if (targetId) delete meta.denunciaExtras[targetId];
  if (targetProtocol) delete meta.denunciaExtras[cleanProtocolKey(targetProtocol)];
  saveLocalGestaoMetadata(meta);
  pushGestaoMetadataToSupabase(meta).catch(() => {});

  // 2. Filtra a lista local imediatamente para resposta instantânea da interface
  const updated = list.filter(d => 
    d.id !== targetId && 
    (!targetProtocol || cleanProtocolKey(d.protocolo) !== cleanProtocolKey(targetProtocol))
  );

  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
  } catch {}

  addLog('DENUNCIA_EXCLUIDA', `Denúncia ID ${targetId}${targetProtocol ? ` (Protocolo ${targetProtocol})` : ''}`);

  // 3. Limpar histórico de mensagens do protocolo excluído
  if (targetProtocol) {
    try {
      const clean = cleanProtocolKey(targetProtocol);
      const rawChats = localStorage.getItem(STORAGE_KEY_PROTOCOL_CHATS);
      if (rawChats) {
        const chats = JSON.parse(rawChats);
        if (chats[clean]) {
          delete chats[clean];
          localStorage.setItem(STORAGE_KEY_PROTOCOL_CHATS, JSON.stringify(chats));
        }
      }
    } catch {}

    try {
      const lastProto = localStorage.getItem(STORAGE_KEY_LAST_PROTOCOL);
      if (lastProto && cleanProtocolKey(lastProto) === cleanProtocolKey(targetProtocol)) {
        localStorage.removeItem(STORAGE_KEY_LAST_PROTOCOL);
      }
    } catch {}
  }

  notifyStorageUpdated();

  // 4. Executa a purga assíncrona na nuvem (Supabase)
  purgeDenunciaFromCloud(targetId, targetProtocol).then(() => {
    broadcastCloudChange('denuncia_deleted', targetProtocol);
  }).catch(err => {
    console.warn('[Supabase Cloud Purge Warn]', err);
  });

  return updated;
};

export const deleteDenunciaAsync = async (denunciaId: string): Promise<Denuncia[]> => {
  const list = getDenuncias();
  const denunciaToDelete = list.find(d => 
    d.id === denunciaId || 
    d.protocolo === denunciaId || 
    cleanProtocolKey(d.protocolo) === cleanProtocolKey(denunciaId)
  );
  const targetId = denunciaToDelete ? denunciaToDelete.id : denunciaId;
  const targetProtocol = denunciaToDelete ? denunciaToDelete.protocolo : (denunciaId.startsWith('#') || denunciaId.startsWith('STP-') ? denunciaId : undefined);

  const updated = deleteDenuncia(denunciaId);
  await purgeDenunciaFromCloud(targetId, targetProtocol);
  return updated;
};

export const deleteMultipleDenunciasAsync = async (denunciaIds: string[]): Promise<Denuncia[]> => {
  if (!Array.isArray(denunciaIds) || denunciaIds.length === 0) {
    return getDenuncias();
  }
  let currentList = getDenuncias();
  for (const id of denunciaIds) {
    currentList = deleteDenuncia(id);
  }
  // Aguarda a purga de todos os IDs selecionados
  await Promise.all(
    denunciaIds.map(id => {
      const found = getDenuncias().find(d => d.id === id || d.protocolo === id);
      return purgeDenunciaFromCloud(found ? found.id : id, found ? found.protocolo : undefined);
    })
  );
  return getDenuncias();
};

export const updateSOSAlertStatus = (
  id: string, 
  status: 'URGENTE' | 'ATENDIDO',
  atendidoPor?: string,
  notas?: string
): SOSAlert[] => {
  const list = getSOSAlerts();
  const updated = list.map(a => {
    if (a.id === id) {
      return {
        ...a,
        status,
        atendido_por: atendidoPor || a.atendido_por || 'Coordenação de Plantão',
        atendido_em: new Date().toISOString(),
        notas_atendimento: notas || a.notas_atendimento
      };
    }
    return a;
  });

  try {
    localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify(updated));
  } catch {}
  addLog('SOS_STATUS_ATUALIZADO', `SOS ${id} -> ${status}`);

  const supabase = getSupabase();
  if (supabase) {
    (async () => {
      try {
        const sessionToken = getGestaoSessionToken();
        const { error } = await supabase.rpc('gestao_atualizar_sos', {
          p_session_token: sessionToken,
          p_sos_id: id,
          p_status: status,
          p_atendente: atendidoPor || 'Coordenação de Plantão',
          p_notas: notas || ''
        });
        if (error) {
          await safeSupabaseExec(() => supabase.from('sos_alertas').update({
            status,
            atendido_por: atendidoPor || 'Coordenação de Plantão',
            atendido_em: new Date().toISOString(),
            notas_atendimento: notas
          }).eq('id', id));
        }
      } catch {
        safeSupabaseExec(() => supabase.from('sos_alertas').update({
          status,
          atendido_por: atendidoPor || 'Coordenação de Plantão',
          atendido_em: new Date().toISOString(),
          notas_atendimento: notas
        }).eq('id', id));
      }
    })();
  }

  return updated;
};

export const getSOSAlerts = (): SOSAlert[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SOS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify([]));
      return [];
    }
    const parsed: SOSAlert[] = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const mockSOS = ['sos-seed-1', 'sos-seed-2'];
      const cleaned = parsed.filter(s => !mockSOS.includes(s.id));
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify(cleaned));
        return cleaned;
      }
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

export const getAuditLogs = (): { type: string; detail: string; timestamp: string }[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export interface DatabaseDiagnosticResult {
  timestamp: string;
  storageAvailable: boolean;
  supabaseConnected: boolean;
  totalStorageBytes: number;
  tables: {
    denuncias: {
      count: number;
      bytes: number;
      uniqueProtocols: boolean;
      allFieldsValid: boolean;
      statusDistribution: Record<string, number>;
      violenceDistribution: Record<string, number>;
    };
    sosAlerts: {
      count: number;
      bytes: number;
      coordinatesValid: boolean;
    };
    auditLogs: {
      count: number;
      bytes: number;
    };
    perfisEscolas: {
      count: number;
      escolaAtivaNome: string;
      escolaAtivaRede: string;
    };
  };
  healthScore: number; // 0 to 100
  status: 'EXCELENTE' | 'BOM' | 'ATENÇÃO' | 'CRÍTICO';
  checks: {
    name: string;
    passed: boolean;
    details: string;
  }[];
}

export const runDatabaseDiagnosis = (): DatabaseDiagnosticResult => {
  const checks: { name: string; passed: boolean; details: string }[] = [];
  let storageAvailable = false;
  let testKey = '__test_db_check__';

  // 1. Storage Read/Write Check
  try {
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    storageAvailable = true;
    checks.push({
      name: 'Disponibilidade do Storage Local',
      passed: true,
      details: 'LocalStorage HTML5 ativo com cache de contingência e alta performance.'
    });
  } catch (e) {
    storageAvailable = false;
    checks.push({
      name: 'Disponibilidade do Storage Local',
      passed: false,
      details: 'Falha no acesso ao LocalStorage (modo restrito ou sem permissão).'
    });
  }

  // 2. Supabase Integration Check
  const supabaseActive = isSupabaseConfigured();
  checks.push({
    name: 'Conexão Supabase PostgreSQL',
    passed: supabaseActive,
    details: supabaseActive 
      ? 'Cliente Supabase configurado e sincronizado com o banco na nuvem.'
      : 'Supabase em modo de contingência local (defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para nuvem).'
  });

  // Calculate bytes
  const rawDenuncias = localStorage.getItem(STORAGE_KEY_DENUNCIAS) || '';
  const rawSos = localStorage.getItem(STORAGE_KEY_SOS) || '';
  const rawLogs = localStorage.getItem(STORAGE_KEY_LOGS) || '';
  const totalBytes = (rawDenuncias.length + rawSos.length + rawLogs.length) * 2;

  const denuncias = getDenuncias();
  const sosAlerts = getSOSAlerts();
  const logs = getAuditLogs();

  // 3. Denúncias Schema & Uniqueness
  const protocols = denuncias.map(d => d.protocolo).filter(Boolean);
  const uniqueProtocols = new Set(protocols).size === protocols.length;
  checks.push({
    name: 'Unicidade dos Protocolos',
    passed: uniqueProtocols,
    details: uniqueProtocols 
      ? `Todos os ${protocols.length} protocolos registrados são únicos e não há colisões.`
      : 'Aviso: Detectado protocolo duplicado na base de dados.'
  });

  const allFieldsValid = denuncias.every(d => 
    d.id && d.protocolo && d.tipo_violencia && d.local_escola && d.status
  );
  checks.push({
    name: 'Validação de Esquema (Denúncias)',
    passed: allFieldsValid,
    details: allFieldsValid 
      ? 'Todos os registros possuem as chaves obrigatórias preenchidas corretamente.'
      : 'Existem denúncias com campos obrigatórios ausentes ou nulos.'
  });

  // Distributions
  const statusDist: Record<string, number> = {};
  const violenceDist: Record<string, number> = {};
  denuncias.forEach(d => {
    statusDist[d.status] = (statusDist[d.status] || 0) + 1;
    violenceDist[d.tipo_violencia] = (violenceDist[d.tipo_violencia] || 0) + 1;
  });

  // 4. SOS Alerts Check
  const coordinatesValid = sosAlerts.every(s => 
    typeof s.latitude === 'number' && 
    typeof s.longitude === 'number' &&
    s.latitude >= -90 && s.latitude <= 90 &&
    s.longitude >= -180 && s.longitude <= 180
  );
  checks.push({
    name: 'Integridade de Coordenadas SOS',
    passed: coordinatesValid,
    details: coordinatesValid
      ? `Base de alertas SOS íntegra com ${sosAlerts.length} registro(s) georreferenciados válidos.`
      : 'Detectadas coordenadas com valores fora dos limites do globo terrestre.'
  });

  // 5. Audit Log Check
  const logsOk = Array.isArray(logs);
  checks.push({
    name: 'Trilha de Auditoria e Logs',
    passed: logsOk,
    details: `${logs.length} eventos de auditoria e telemetria registrados cronologicamente.`
  });

  // 6. Perfis de Escolas & Multi-Institucional
  const escolas = getEscolas();
  const escolaAtiva = getEscolaAtiva();
  checks.push({
    name: 'Módulo Multi-Escolas & Identidade Institucional',
    passed: escolas.length > 0,
    details: `${escolas.length} escola(s) cadastrada(s) para sincronização em nuvem. Ativa: ${escolaAtiva.nome} (${escolaAtiva.rede}).`
  });

  // Health Score Calculation
  const passedCount = checks.filter(c => c.passed).length;
  const healthScore = Math.round((passedCount / checks.length) * 100);
  
  let status: 'EXCELENTE' | 'BOM' | 'ATENÇÃO' | 'CRÍTICO' = 'EXCELENTE';
  if (healthScore >= 90) status = 'EXCELENTE';
  else if (healthScore >= 70) status = 'BOM';
  else if (healthScore >= 50) status = 'ATENÇÃO';
  else status = 'CRÍTICO';

  return {
    timestamp: new Date().toISOString(),
    storageAvailable,
    supabaseConnected: supabaseActive,
    totalStorageBytes: totalBytes,
    tables: {
      denuncias: {
        count: denuncias.length,
        bytes: rawDenuncias.length * 2,
        uniqueProtocols,
        allFieldsValid,
        statusDistribution: statusDist,
        violenceDistribution: violenceDist
      },
      sosAlerts: {
        count: sosAlerts.length,
        bytes: rawSos.length * 2,
        coordinatesValid
      },
      auditLogs: {
        count: logs.length,
        bytes: rawLogs.length * 2
      },
      perfisEscolas: {
        count: escolas.length,
        escolaAtivaNome: escolaAtiva.nome,
        escolaAtivaRede: escolaAtiva.rede
      }
    },
    healthScore,
    status,
    checks
  };
};

export const resetDatabaseToDefaults = (): void => {
  localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([
    { type: 'BANCO_RESET', detail: 'Limpeza da base de dados local para início de testes reais', timestamp: new Date().toISOString() }
  ]));
  notifyStorageUpdated();
};

export const clearAllFictitiousData = async (): Promise<void> => {
  localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify([]));
  localStorage.removeItem(STORAGE_KEY_PROTOCOL_CHATS);
  localStorage.removeItem(STORAGE_KEY_LAST_PROTOCOL);

  // Remoção de qualquer escola fictícia residual do armazenamento
  const FICTITIOUS_SCHOOL_IDS = [
    'escola-eef-maria-do-carmo',
    'escola-santos-dumont-quixada',
    'escola-ifce-caninde',
    'escola-colegio-agora-fortaleza',
    'escola-colegio-contemporaneo'
  ];
  try {
    const rawEsc = localStorage.getItem('stopbullying_perfis_escolas_v1');
    if (rawEsc) {
      const list = JSON.parse(rawEsc);
      if (Array.isArray(list)) {
        const cleaned = list.filter((e: any) => e && e.id && !FICTITIOUS_SCHOOL_IDS.includes(e.id));
        localStorage.setItem('stopbullying_perfis_escolas_v1', JSON.stringify(cleaned));
      }
    }
  } catch (_) {}

  addLog('DADOS_FICTICIOS_EXCLUIDOS', 'Remoção de todos os dados de simulação e inicialização limpa.');
  notifyStorageUpdated();

  const supabase = getSupabase();
  if (supabase) {
    const mockProtocols = ['STP-94A1F', 'STP-88C2B', 'STP-71E9D', 'STP-63F4A', 'STP-SOS991'];
    for (const proto of mockProtocols) {
      await safeSupabaseExec(() => supabase.from('denuncias').delete().eq('protocolo', proto));
    }
    // Remove também escolas fictícias do banco remoto se existirem
    for (const escId of FICTITIOUS_SCHOOL_IDS) {
      await safeSupabaseExec(() => supabase.from('perfis_escolas').delete().eq('id', escId));
    }
  }
};

export const exportFullDatabaseJSON = (): string => {
  const denuncias = getDenuncias();
  const sos = getSOSAlerts();
  const logs = getAuditLogs();
  const backup = {
    app: 'StopBullying - EEMTI Alfredo Machado',
    export_date: new Date().toISOString(),
    version: '2.5.0',
    data: {
      denuncias,
      sos_alerts: sos,
      audit_logs: logs
    }
  };
  return JSON.stringify(backup, null, 2);
};

export const exportDenunciasCSV = (denuncias: Denuncia[]): string => {
  let csv = 'Protocolo;Tipo_Violencia;Local_Escola;Turno;Frequencia;Papel_Denunciante;Turma;Relato;Link_Evidencia;Midia_Tipo;Midia_Duracao_Seg;Data_Envio;Status;Etapa_Mediacao\n';
  denuncias.forEach(d => {
    const dataFmt = new Date(d.data_envio).toLocaleString('pt-BR');
    const relatoClean = (d.descricao || '').replace(/;/g, ',').replace(/\n/g, ' ');
    const linkClean = (d.link_cyberbullying || '').replace(/;/g, ',');
    const mTipo = d.midia_tipo || 'Nenhum';
    const mDur = d.midia_duracao || 0;
    const turno = d.turno || 'Manhã';
    const freq = d.frequencia || 'N/A';
    const papel = d.papel_denunciante || 'Vítima';
    const turma = d.turma_envolvida || 'N/A';
    const etapa = d.etapa_mediacao || 'escuta_inicial';
    csv += `${d.protocolo};${d.tipo_violencia};${d.local_escola};${turno};${freq};${papel};${turma};"${relatoClean}";"${linkClean}";${mTipo};${mDur};${dataFmt};${d.status};${etapa}\n`;
  });
  return csv;
};

const STORAGE_KEY_EMAILS_CONFIG = 'stopbullying_emails_config_v1';

export const getInstitutionalEmails = (): {
  emailConselhoTutelar: string;
  emailEscola: string;
  telefoneConselhoTutelar: string;
  responsavelEnvio: string;
  ultimoRelatorioMensalEnviado?: string;
  agendamentoAtivo: boolean;
} => {
  const defaultConfig = {
    emailConselhoTutelar: 'conselhotutelar.madalena@ceara.gov.br',
    emailEscola: 'eemti.alfredomachado@escola.ce.gov.br',
    telefoneConselhoTutelar: '(88) 3442-1200 / (88) 98800-0000',
    responsavelEnvio: 'Comissão de Mediação Escolar - EEMTI Alfredo Machado',
    agendamentoAtivo: true
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMAILS_CONFIG);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_EMAILS_CONFIG, JSON.stringify(defaultConfig));
      return defaultConfig;
    }
    return { ...defaultConfig, ...JSON.parse(raw) };
  } catch {
    return defaultConfig;
  }
};

export const saveInstitutionalEmails = (config: Partial<ReturnType<typeof getInstitutionalEmails>>): void => {
  try {
    const current = getInstitutionalEmails();
    const updated = { ...current, ...config };
    localStorage.setItem(STORAGE_KEY_EMAILS_CONFIG, JSON.stringify(updated));
    const meta = getLocalGestaoMetadata();
    meta.emailsConfig = updated;
    saveLocalGestaoMetadata(meta);
    pushGestaoMetadataToSupabase(meta).catch(() => {});
    addLog('EMAILS_INSTITUCIONAIS_ATUALIZADOS', `Conselho: ${updated.emailConselhoTutelar} | Escola: ${updated.emailEscola}`);
  } catch (e) {
    console.error('Erro ao salvar e-mails institucionais:', e);
  }
};

export const recordEmailDispatch = (
  denunciaId: string,
  destinatarios: string[],
  tipoEnvio: 'individual' | 'relatorio_mensal' = 'individual',
  observacao?: string
): void => {
  if (tipoEnvio === 'individual' && denunciaId) {
    const acaoTexto = `📧 Encaminhado relatório oficial por e-mail para: ${destinatarios.join(', ')}${observacao ? ` (${observacao})` : ''}`;
    addMediacaoAction(
      denunciaId,
      acaoTexto,
      'Sistema de Notificação por E-mail (EEMTI Alfredo Machado)',
      'Encaminhamento Externo'
    );
  }

  if (tipoEnvio === 'relatorio_mensal') {
    saveInstitutionalEmails({
      ultimoRelatorioMensalEnviado: new Date().toISOString()
    });
  }

  addLog('EMAIL_DISPATCHED', `Tipo: ${tipoEnvio} | Enviado para: ${destinatarios.join(', ')}`);
};

// ============================================================================
// MOTOR DE SINCRONIZAÇÃO EM TEMPO REAL MULTI-DISPOSITIVO (COMPUTADOR, TABLET, SMARTPHONE)
// ============================================================================

let liveSyncChannel: any = null;
let liveSyncInitialized = false;
let isSyncInFlight = false;

export function broadcastCloudChange(kind: string, protocolo?: string): void {
  try {
    if (liveSyncChannel) {
      liveSyncChannel.send({
        type: 'broadcast',
        event: 'cloud_change',
        payload: {
          kind,
          protocolo: protocolo ? cleanProtocolKey(protocolo) : undefined,
          timestamp: Date.now()
        }
      }).catch(() => {});
    }
  } catch {}
}

export function startRealtimeCloudSync(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (liveSyncInitialized) return () => {};
  liveSyncInitialized = true;

  const supabase = getSupabase();

  const triggerFastPull = async (reason?: string, targetProtocol?: string) => {
    if (isSyncInFlight) return;
    isSyncInFlight = true;
    try {
      // 1. Puxar imediatamente perfis de escolas e escola ativa para todos os visitantes
      await syncEscolasFromSupabase();

      // 2. Se o dispositivo estiver autenticado no Painel de Gestão ou na tela de gestão, sincronizar tudo
      const sessionToken = getGestaoSessionToken();
      const isGestaoView = window.location.hash.toLowerCase().includes('gestao');
      if (sessionToken || isGestaoView) {
        await syncFromSupabase(sessionToken || undefined);
      }

      // 3. Notificar componentes abertos (ProtocoloView, DenunciaForm, PainelGestao)
      window.dispatchEvent(new CustomEvent('cloud_realtime_sync', {
        detail: { reason: reason || 'poll', protocolo: targetProtocol, timestamp: Date.now() }
      }));
    } catch {} finally {
      isSyncInFlight = false;
    }
  };

  // Sincronização inicial imediata ao abrir o site em qualquer dispositivo
  triggerFastPull('initial_load');

  // Escutar eventos locais disparados pelo schoolService ou storageService para transmitir via WebSocket
  const handleLocalBroadcastRequest = (e: Event) => {
    const custom = e as CustomEvent;
    broadcastCloudChange(custom.detail?.kind || 'schools', custom.detail?.protocolo);
  };
  window.addEventListener('supabase_broadcast_change', handleLocalBroadcastRequest);

  // Configurar canal Realtime do Supabase (Broadcast + Postgres Changes)
  if (supabase && isSupabaseConfigured()) {
    try {
      liveSyncChannel = supabase
        .channel('stopbullying-live-sync', {
          config: { broadcast: { self: false } }
        })
        .on('broadcast', { event: 'cloud_change' }, (msg: any) => {
          const proto = msg?.payload?.protocolo;
          triggerFastPull('realtime_broadcast', proto);
        })
        .on(
          'postgres_changes',
          { event: '*', schema: 'public' },
          () => {
            triggerFastPull('postgres_changes');
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('[Supabase Realtime Channel Warn]', err);
    }
  }

  // Polling rápido de alta frequência (a cada 3.5 segundos enquanto a aba estiver visível)
  const intervalId = window.setInterval(() => {
    if (document.visibilityState === 'visible') {
      triggerFastPull('interval_3500ms');
    }
  }, 3500);

  // Sincronização instantânea ao focar a janela, desbloquear o celular ou reconectar à internet
  const handleVisibilityOrFocus = () => {
    if (document.visibilityState === 'visible') {
      triggerFastPull('visibility_focus');
    }
  };

  window.addEventListener('focus', handleVisibilityOrFocus);
  document.addEventListener('visibilitychange', handleVisibilityOrFocus);
  window.addEventListener('online', handleVisibilityOrFocus);

  return () => {
    window.clearInterval(intervalId);
    window.removeEventListener('focus', handleVisibilityOrFocus);
    document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
    window.removeEventListener('online', handleVisibilityOrFocus);
    window.removeEventListener('supabase_broadcast_change', handleLocalBroadcastRequest);
  };
}
