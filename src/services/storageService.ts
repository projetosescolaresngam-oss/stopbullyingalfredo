import { Denuncia, SOSAlert, ComplaintStatus } from '../types';
import { INITIAL_DENUNCIAS } from '../data/initialData';

const STORAGE_KEY_DENUNCIAS = 'stopbullying_denuncias_v2';
const STORAGE_KEY_SOS = 'stopbullying_sos_v2';
const STORAGE_KEY_LOGS = 'stopbullying_logs_v2';

export const getDenuncias = (): Denuncia[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DENUNCIAS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(INITIAL_DENUNCIAS));
      return INITIAL_DENUNCIAS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DENUNCIAS;
  }
};

export const saveDenuncia = (denuncia: Omit<Denuncia, 'id' | 'data_envio' | 'status'> & { id?: string }): Denuncia => {
  const list = getDenuncias();
  const nova: Denuncia = {
    ...denuncia,
    id: denuncia.id || Math.random().toString(36).substring(2, 9),
    data_envio: new Date().toISOString(),
    status: 'Em Análise'
  };
  list.unshift(nova);
  localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(list));
  addLog('DENUNCIA_CRIADA', `Protocolo ${nova.protocolo}`);
  return nova;
};

export const updateDenunciaStatus = (id: string, newStatus: ComplaintStatus): Denuncia[] => {
  const list = getDenuncias();
  const updated = list.map(d => d.id === id ? { ...d, status: newStatus } : d);
  localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(updated));
  addLog('STATUS_ATUALIZADO', `Denúncia ID ${id} -> ${newStatus}`);
  return updated;
};

export const saveSOSAlert = (alertData: Omit<SOSAlert, 'id' | 'data_disparo' | 'status'>): SOSAlert => {
  const raw = localStorage.getItem(STORAGE_KEY_SOS);
  const list: SOSAlert[] = raw ? JSON.parse(raw) : [];
  const novo: SOSAlert = {
    ...alertData,
    id: Math.random().toString(36).substring(2, 9),
    data_disparo: new Date().toISOString(),
    status: 'URGENTE'
  };
  list.unshift(novo);
  localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify(list));
  addLog('SOS_DISPARO', `Lat: ${alertData.latitude}, Lng: ${alertData.longitude}`);
  return novo;
};

export const addLog = (type: string, detail: string) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOGS);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift({ type, detail, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(list.slice(0, 100)));
  } catch {
    // silent fail
  }
};

export const getSOSAlerts = (): SOSAlert[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SOS);
    return raw ? JSON.parse(raw) : [];
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
      name: 'Disponibilidade do Storage',
      passed: true,
      details: 'LocalStorage HTML5 ativo e com permissão total de leitura e escrita.'
    });
  } catch (e) {
    storageAvailable = false;
    checks.push({
      name: 'Disponibilidade do Storage',
      passed: false,
      details: 'Falha no acesso ao LocalStorage (modo restrito ou sem permissão).'
    });
  }

  // Calculate bytes
  const rawDenuncias = localStorage.getItem(STORAGE_KEY_DENUNCIAS) || '';
  const rawSos = localStorage.getItem(STORAGE_KEY_SOS) || '';
  const rawLogs = localStorage.getItem(STORAGE_KEY_LOGS) || '';
  const totalBytes = (rawDenuncias.length + rawSos.length + rawLogs.length) * 2; // UTF-16 bytes approx

  const denuncias = getDenuncias();
  const sosAlerts = getSOSAlerts();
  const logs = getAuditLogs();

  // 2. Denúncias Schema & Uniqueness
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

  // 3. SOS Alerts Check
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

  // 4. Audit Log Check
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
  localStorage.setItem(STORAGE_KEY_DENUNCIAS, JSON.stringify(INITIAL_DENUNCIAS));
  localStorage.setItem(STORAGE_KEY_SOS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify([
    { type: 'BANCO_RESET', detail: 'Restauração para sementes padrão da EEMTI Alfredo Machado', timestamp: new Date().toISOString() }
  ]));
};

export const exportFullDatabaseJSON = (): string => {
  const denuncias = getDenuncias();
  const sos = getSOSAlerts();
  const logs = getAuditLogs();
  const backup = {
    app: 'StopBullying - EEMTI Alfredo Machado',
    export_date: new Date().toISOString(),
    version: '2.0.0',
    data: {
      denuncias,
      sos_alerts: sos,
      audit_logs: logs
    }
  };
  return JSON.stringify(backup, null, 2);
};

export const exportDenunciasCSV = (denuncias: Denuncia[]): string => {
  let csv = 'Protocolo;Tipo_Violencia;Local_Escola;Relato;Link_Evidencia;Midia_Tipo;Midia_Duracao_Seg;Data_Envio;Status\n';
  denuncias.forEach(d => {
    const dataFmt = new Date(d.data_envio).toLocaleString('pt-BR');
    const relatoClean = (d.descricao || '').replace(/;/g, ',').replace(/\n/g, ' ');
    const linkClean = (d.link_cyberbullying || '').replace(/;/g, ',');
    const mTipo = d.midia_tipo || 'Nenhum';
    const mDur = d.midia_duracao || 0;
    csv += `${d.protocolo};${d.tipo_violencia};${d.local_escola};"${relatoClean}";"${linkClean}";${mTipo};${mDur};${dataFmt};${d.status}\n`;
  });
  return csv;
};
