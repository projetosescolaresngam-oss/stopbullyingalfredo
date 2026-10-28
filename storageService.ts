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

  // Fallback seguro se ainda não tiver nome de escola
  if (!escolaNome) {
    try {
      const ativa = getEscolaAtiva();
      escolaNome = ativa.nome;
      escolaId = ativa.id;
    } catch {
      escolaNome = 'E.E.M.T.I. Alfredo Machado';
      escolaId = 'escola-eemti-alfredo-machado';
    }
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

// Nota de Segurança: Sincronização geral de denúncias NÃO ocorre automaticamente
// na inicialização do site para visitantes públicos (preservação do sigilo dos relatos).
// A listagem completa ocorre apenas sob demanda autenticada no Painel de Gestão Escolar.

export async function syncFromSupabase(managementSessionToken?: string): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    let dbDenuncias: any[] | null = null;
    const sessionToken = managementSessionToken || getGestaoSessionToken();

    // 1. Tentar via RPC autenticada da gestão se o token de sessão for fornecido
    if (sessionToken) {
      const { data: rpcRes, error: rpcErr } = await supabase.rpc('gestao_autenticar_e_listar_denuncias', {
        p_session_token: sessionToken
      });
      if (!rpcErr && rpcRes && rpcRes.success && Array.isArray(rpcRes.denuncias)) {
        dbDenuncias = rpcRes.denuncias;
      }
    }

    // 2. Fallback direto se a RPC ainda não estiver criada no banco
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

    if (Array.isArray(dbDenuncias)) {
      const active = filterActiveDenuncias(dbDenuncias);
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
      localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify(dbSOS));
      notifyStorageUpdated();
    }

    const { data: dbMsgs, error: msgsError } = await supabase
      .from('protocolo_mensagens')
      .select('*')
      .order('created_at', { ascending: true });

    if (!msgsError && Array.isArray(dbMsgs)) {
      const raw = localStorage.getItem(STORAGE_KEY_PROTOCOL_CHATS);
      const chats: Record<string, ProtocolChatMessage[]> = raw ? JSON.parse(raw) : {};

      dbMsgs.forEach((m: any) => {
        const clean = cleanProtocolKey(m.protocolo);
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

    // 4. Sincronização dos Perfis de Escolas Cadastradas
    await syncEscolasFromSupabase().catch(() => {});
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

  // Sincronização com Supabase (Resiliente e adaptativa)
  const supabase = getSupabase();
  if (supabase) {
    const fullPayload: any = {
      id: nova.id,
      protocolo: nova.protocolo,
      tipo_violencia: nova.tipo_violencia,
      tipos_selecionados: nova.tipos_selecionados || [],
      local_escola: nova.local_escola,
      turno: nova.turno || 'Manhã',
      frequencia: nova.frequencia || 'Poucas vezes',
      papel_denunciante: nova.papel_denunciante || 'Sou a Vítima',
      turma_envolvida: nova.turma_envolvida || null,
      agressor_grupo: nova.agressor_grupo || null,
      descricao: nova.descricao,
      link_cyberbullying: nova.link_cyberbullying || null,
      midia_anexa: nova.midia_anexa || null,
      midia_tipo: nova.midia_tipo || null,
      midia_duracao: nova.midia_duracao || 0,
      provas_anexas: nova.provas_anexas || [],
      nivel_gravidade: nova.nivel_gravidade || 'Pendente',
      nivel_escalada: nova.nivel_escalada || 'Média',
      is_sos: Boolean(nova.is_sos),
      status: nova.status,
      etapa_mediacao: nova.etapa_mediacao || 'escuta_inicial',
      impactos_identificados: nova.impactos_identificados || [],
      medidas_protecao: nova.medidas_protecao || [],
      escola_id: nova.escola_id || null,
      escola_nome: nova.escola_nome || null,
      escola_ocorrencia_id: nova.escola_ocorrencia_id || null,
      escola_ocorrencia_nome: nova.escola_ocorrencia_nome || null,
      serie_ocorrencia: nova.serie_ocorrencia || null,
      turma_ocorrencia: nova.turma_ocorrencia || null,
      turno_ocorrencia: nova.turno_ocorrencia || null,
      escola_acusado_id: nova.escola_acusado_id || null,
      escola_acusado_nome: nova.escola_acusado_nome || null,
      serie_acusado: nova.serie_acusado || null,
      turma_acusado: nova.turma_acusado || null,
      turno_acusado: nova.turno_acusado || null,
      data_envio: nova.data_envio
    };

    (async () => {
      try {
        const { error } = await supabase.from('denuncias').insert(fullPayload);
        if (error) {
          console.warn('[Supabase Insert Inicial Warning]', error.message);
          // Se a coluna escola_id ainda não foi criada no banco remoto Supabase
          if (error.code === 'PGRST204' || error.message?.includes('column')) {
            const embeddedDesc = `[Instituição de Ensino: ${nova.escola_nome || 'E.E.M.T.I. Alfredo Machado'} (ID: ${nova.escola_id || 'escola-eemti-alfredo-machado'})]\n\n${nova.descricao}`;
            const safePayload = {
              id: nova.id,
              protocolo: nova.protocolo,
              tipo_violencia: nova.tipo_violencia,
              local_escola: nova.local_escola,
              descricao: embeddedDesc,
              status: nova.status || 'Em Análise',
              turno: nova.turno || 'Manhã',
              frequencia: nova.frequencia || 'Poucas vezes',
              papel_denunciante: nova.papel_denunciante || 'Sou a Vítima',
              turma_envolvida: nova.turma_envolvida || null,
              nivel_gravidade: nova.nivel_gravidade || 'Pendente',
              nivel_escalada: nova.nivel_escalada || 'Média',
              is_sos: Boolean(nova.is_sos),
              tipos_selecionados: nova.tipos_selecionados || [],
              data_envio: nova.data_envio
            };
            const retryRes = await supabase.from('denuncias').insert(safePayload);
            if (!retryRes.error) {
              console.log('[Supabase Safe Fallback Inserido]', nova.protocolo);
            } else {
              console.warn('[Supabase Safe Fallback Error]', retryRes.error.message);
            }
          }
        }
      } catch (err) {
        console.warn('[Supabase Insert Exception]', err);
      }
    })();
  }

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
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    // 1. Tentar RPC segura com rate limiting no servidor
    const { data: rpcData, error: rpcErr } = await supabase.rpc('consultar_denuncia_protocolo', {
      p_protocolo: clean
    });

    if (!rpcErr && rpcData && rpcData.found && rpcData.denuncia) {
      const item = normalizeDenunciaSchool(rpcData.denuncia as Denuncia);
      const currentList = getDenuncias();
      const exists = currentList.some(d => cleanProtocolKey(d.protocolo) === clean);
      if (!exists) {
        currentList.unshift(item);
        try {
          localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(currentList));
          notifyStorageUpdated();
        } catch {}
      }
      return item;
    }

    // 2. Fallback direto se a RPC ainda não estiver criada no banco
    const { data, error } = await supabase
      .from('denuncias')
      .select('*')
      .or(`protocolo.eq.${clean},protocolo.eq.#${clean}`)
      .limit(1);

    if (!error && Array.isArray(data) && data.length > 0) {
      const item = normalizeDenunciaSchool(data[0] as Denuncia);
      const currentList = getDenuncias();
      const exists = currentList.some(d => cleanProtocolKey(d.protocolo) === clean);
      if (!exists) {
        currentList.unshift(item);
        try {
          localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(currentList));
          notifyStorageUpdated();
        } catch {}
      }
      return item;
    }
  } catch (err) {
    console.warn('[Fetch Denuncia Protocolo Error]', err);
  }

  return null;
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
    }));
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
        safeSupabaseExec(() => supabase.from('denuncias').update({ status: newStatus }).eq('id', id));
      }
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

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('sos_alertas').insert({
      id: novo.id,
      latitude: novo.latitude,
      longitude: novo.longitude,
      precisao_metros: novo.precisao_metros,
      dispositivo_info: novo.dispositivo_info,
      local_aproximado: novo.local_aproximado,
      status: novo.status,
      escola_id: novo.escola_id || null,
      escola_nome: novo.escola_nome || null,
      data_disparo: novo.data_disparo
    }));
  }

  return novo;
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
    id: 'med-' + Math.random().toString(36).substring(2, 9),
    autor,
    acao: acao.trim(),
    dataHora: new Date().toISOString(),
    categoria
  };

  const updated = list.map(d => {
    if (d.id === denunciaId) {
      const acoes = d.acoes_mediacao || [];
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
  } catch {}
  addLog('MED_ACAO_REGISTRADA', `Denúncia ID ${denunciaId}: ${categoria} - ${acao.slice(0, 40)}`);

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('mediacoes_acoes').insert({
      denuncia_id: denunciaId,
      autor,
      categoria,
      acao: acao.trim()
    }));
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
  } catch {}
  addLog('DENUNCIA_SOS_TOGGLE', `Denúncia ID ${denunciaId}`);

  const supabase = getSupabase();
  if (supabase) {
    const item = updated.find(d => d.id === denunciaId);
    if (item) {
      safeSupabaseExec(() => supabase.from('denuncias').update({ is_sos: item.is_sos }).eq('id', denunciaId));
    }
  }

  return updated;
};

export const updateDenunciaMediacao = (
  denunciaId: string, 
  partial: Partial<Denuncia>
): Denuncia[] => {
  const list = getDenuncias();
  const updated = list.map(d => {
    if (d.id === denunciaId) {
      return { ...d, ...partial };
    }
    return d;
  });
  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
  } catch {}
  addLog('MED_DADOS_ATUALIZADOS', `Denúncia ID ${denunciaId} atualizada com dados de mediação`);

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('denuncias').update(partial).eq('id', denunciaId));
  }

  return updated;
};

export const salvarTermoAcordo = (
  denunciaId: string, 
  termo: TermoAcordoConvivencia
): Denuncia[] => {
  const list = getDenuncias();
  const updated = list.map(d => {
    if (d.id === denunciaId) {
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
      data_revisao: termo.data_revisao
    }));
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
    id: 'chk-' + Math.random().toString(36).substring(2, 9),
    data: new Date().toISOString()
  };

  const updated = list.map(d => {
    if (d.id === denunciaId) {
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
  } catch {}
  addLog('CHECKIN_ACOMPANHAMENTO', `Checkin ${checkin.dia}d registrado na denúncia ${denunciaId}`);

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('checkins_acompanhamento').insert({
      denuncia_id: denunciaId,
      dia: checkin.dia,
      responsavel: checkin.responsavel,
      status_estudante: checkin.status_estudante,
      observacoes: checkin.observacoes
    }));
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
    id: feedbackData.id || ('fb-' + Math.random().toString(36).substring(2, 9)),
    data_hora: feedbackData.data_hora || agora,
    notificado_ao_conselho_tutelar: feedbackData.notificado_ao_conselho_tutelar ?? true,
    notificado_ao_conselho_escolar: feedbackData.notificado_ao_conselho_escolar ?? true
  };

  let targetProtocol: string | undefined;

  const updated = list.map(d => {
    if (d.id === denunciaId || d.protocolo === denunciaId || cleanProtocolKey(d.protocolo) === cleanProtocolKey(denunciaId)) {
      targetProtocol = d.protocolo;
      const anteriores = d.historico_feedbacks || [];
      const acoesAnteriores = d.historico_acoes || [];
      const novaAcao = {
        data_hora: new Date().toLocaleString('pt-BR'),
        acao: `Feedback/Devolutiva oficial registrada e comunicada ao denunciante: "${feedbackCompleto.titulo}"`,
        responsavel: feedbackCompleto.autor
      };

      return {
        ...d,
        feedback_escola: feedbackCompleto,
        historico_feedbacks: [...anteriores, feedbackCompleto],
        historico_acoes: [...acoesAnteriores, novaAcao]
      };
    }
    return d;
  });

  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
  } catch {}
  addLog('FEEDBACK_ESCOLA_REGISTRADO', `Feedback registrado na denúncia ${denunciaId} (${feedbackCompleto.titulo})`);

  // Se solicitado, registra mensagem formal no chat sigiloso do protocolo
  if (notificarNoChat && targetProtocol) {
    try {
      const msgChat = `📢 [DEVOLUTIVA OFICIAL DA ESCOLA]: ${feedbackCompleto.titulo}\n\n${feedbackCompleto.mensagem}${feedbackCompleto.orientacao_ao_estudante ? `\n\n🛡️ Orientações de Segurança: ${feedbackCompleto.orientacao_ao_estudante}` : ''}`;
      sendProtocolMessage(targetProtocol, 'coordenacao', feedbackCompleto.autor, msgChat);
    } catch (err) {
      console.warn('[Feedback Chat Message Error]', err);
    }
  }

  notifyStorageUpdated();

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('denuncias').update({
      feedback_escola: feedbackCompleto
    }).eq('id', denunciaId));
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

  // 1. Registra imediatamente no registro permanente de exclusões (tombstones)
  recordDenunciaAsDeleted(targetId, targetProtocol);

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
  purgeDenunciaFromCloud(targetId, targetProtocol).catch(err => {
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
  addLog('DADOS_FICTICIOS_EXCLUIDOS', 'Remoção de todos os dados de simulação e inicialização limpa.');
  notifyStorageUpdated();

  const supabase = getSupabase();
  if (supabase) {
    const mockProtocols = ['STP-94A1F', 'STP-88C2B', 'STP-71E9D', 'STP-63F4A', 'STP-SOS991'];
    for (const proto of mockProtocols) {
      await safeSupabaseExec(() => supabase.from('denuncias').delete().eq('protocolo', proto));
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
