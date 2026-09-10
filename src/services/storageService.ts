import { 
  Denuncia, 
  SOSAlert, 
  ComplaintStatus, 
  ProtocolChatMessage, 
  MediacaoAction, 
  TermoAcordoConvivencia, 
  CheckinAcompanhamento,
  EtapaMediacao 
} from '../types';
import { INITIAL_DENUNCIAS } from '../data/initialData';
import { getSupabase, isSupabaseConfigured } from './supabaseClient';

const STORAGE_KEY_DENUNCIAS = 'stopbullying_denuncias_v2';
const STORAGE_KEY_SOS = 'stopbullying_sos_v2';
const STORAGE_KEY_LOGS = 'stopbullying_logs_v2';
const STORAGE_KEY_PROTOCOL_CHATS = 'stopbullying_protocol_chats_v2';
const STORAGE_KEY_LAST_PROTOCOL = 'stopbullying_last_protocol_v2';

const INITIAL_SOS_ALERTS: SOSAlert[] = [];

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

// Iniciar sincronização em segundo plano se o Supabase estiver configurado
if (typeof window !== 'undefined' && isSupabaseConfigured()) {
  setTimeout(() => {
    syncFromSupabase().catch(() => {});
  }, 1000);
}

export async function syncFromSupabase(): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    const { data: dbDenuncias, error } = await supabase
      .from('denuncias')
      .select('*')
      .order('data_envio', { ascending: false });

    if (!error && Array.isArray(dbDenuncias)) {
      localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(dbDenuncias));
      notifyStorageUpdated();
    }

    const { data: dbSOS, error: sosError } = await supabase
      .from('sos_alertas')
      .select('*')
      .order('data_disparo', { ascending: false });

    if (!sosError && Array.isArray(dbSOS)) {
      localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify(dbSOS));
      notifyStorageUpdated();
    }
  } catch (err) {
    console.warn('[Supabase Sync]', err);
  }
}

export const getDenuncias = (): Denuncia[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DENUNCIAS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify([]));
      return [];
    }
    const parsed: Denuncia[] = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Filtrar dados fictícios antigos para teste real
      const mockProtocols = ['STP-94A1F', 'STP-88C2B', 'STP-71E9D', 'STP-63F4A', 'STP-SOS991'];
      const mockIds = ['1', '2', '3', '4', '5'];
      const cleaned = parsed.filter(d => !mockProtocols.includes(d.protocolo) && !mockIds.includes(d.id));
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(cleaned));
        return cleaned;
      }
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
};

export const saveDenuncia = (denuncia: Omit<Denuncia, 'id' | 'data_envio' | 'status'> & { id?: string }): Denuncia => {
  const list = getDenuncias();
  const nova: Denuncia = {
    ...denuncia,
    id: (denuncia.id && denuncia.id.length >= 20) ? denuncia.id : generateUUID(),
    data_envio: new Date().toISOString(),
    status: 'Em Análise'
  };
  list.unshift(nova);
  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(list));
    notifyStorageUpdated();
  } catch {}
  addLog('DENUNCIA_CRIADA', `Protocolo ${nova.protocolo}`);
  setLastCreatedProtocol(nova.protocolo);

  // Sincronização com Supabase
  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('denuncias').insert({
      id: nova.id,
      protocolo: nova.protocolo,
      tipo_violencia: nova.tipo_violencia,
      tipos_selecionados: nova.tipos_selecionados || [],
      local_escola: nova.local_escola,
      turno: nova.turno || 'Manhã',
      frequencia: nova.frequencia || 'Poucas vezes',
      papel_denunciante: nova.papel_denunciante || 'Sou a Vítima',
      turma_envolvida: nova.turma_envolvida || null,
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
      data_envio: nova.data_envio
    }));
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
  const list = getDenuncias();
  const cleanInput = protocolo.trim().toLowerCase().replace(/^#/, '');
  return list.find(d => {
    const cleanProto = (d.protocolo || '').trim().toLowerCase().replace(/^#/, '');
    return cleanProto === cleanInput;
  });
};

export const getProtocolMessages = (protocolo: string): ProtocolChatMessage[] => {
  if (!protocolo) return [];
  const clean = protocolo.trim().toUpperCase();
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROTOCOL_CHATS);
    const chats: Record<string, ProtocolChatMessage[]> = raw ? JSON.parse(raw) : {};
    if (chats[clean] && chats[clean].length > 0) {
      return chats[clean];
    }
    // Mensagem inicial padrão de acolhimento caso ainda não haja mensagens
    const defaultWelcome: ProtocolChatMessage = {
      id: 'msg-welcome-' + Math.random().toString(36).substring(2, 7),
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
  const clean = protocolo.trim().toUpperCase();
  const novaMsg: ProtocolChatMessage = {
    id: 'msg-' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9)),
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

  // Sincronização com Supabase
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

export const updateDenunciaStatus = (id: string, newStatus: ComplaintStatus): Denuncia[] => {
  const list = getDenuncias();
  const updated = list.map(d => d.id === id ? { ...d, status: newStatus } : d);
  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
  } catch {}
  addLog('STATUS_ATUALIZADO', `Denúncia ID ${id} -> ${newStatus}`);

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('denuncias').update({ status: newStatus }).eq('id', id));
  }

  return updated;
};

export const saveSOSAlert = (alertData: Omit<SOSAlert, 'id' | 'data_disparo' | 'status'>): SOSAlert => {
  let list: SOSAlert[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SOS);
    list = raw ? JSON.parse(raw) : [];
  } catch {}
  const novo: SOSAlert = {
    ...alertData,
    id: generateUUID(),
    data_disparo: new Date().toISOString(),
    status: 'URGENTE'
  };
  list.unshift(novo);
  try {
    localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify(list));
    notifyStorageUpdated();
  } catch {}
  addLog('SOS_DISPARO', `Lat: ${alertData.latitude}, Lng: ${alertData.longitude}`);

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

export const deleteDenuncia = (denunciaId: string): Denuncia[] => {
  const list = getDenuncias();
  const updated = list.filter(d => d.id !== denunciaId);
  try {
    localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
  } catch {}
  addLog('DENUNCIA_EXCLUIDA', `Denúncia ID ${denunciaId}`);

  const supabase = getSupabase();
  if (supabase) {
    safeSupabaseExec(() => supabase.from('denuncias').delete().eq('id', denunciaId));
  }

  return updated;
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
    safeSupabaseExec(() => supabase.from('sos_alertas').update({
      status,
      atendido_por: atendidoPor || 'Coordenação de Plantão',
      atendido_em: new Date().toISOString(),
      notas_atendimento: notas
    }).eq('id', id));
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
