import { addLog } from './storageService';
import { getSupabase } from './supabaseClient';

export interface SiteAnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  todayPageViews: number;
  todayVisitors: number;
  lastAccessTime: string;
  viewsByArea: Record<string, number>;
  dailyHistory: { date: string; views: number; visitors: number }[];
}

const STORAGE_KEY_VISITOR_ID = 'stopbullying_visitor_id_v2';
const STORAGE_KEY_ANALYTICS = 'stopbullying_analytics_v2';
const STORAGE_KEY_SESSION = 'stopbullying_current_session_v2';

interface StoredAnalytics {
  totalPageViews: number;
  uniqueVisitorIds: string[];
  viewsByArea: Record<string, number>;
  dailyMap: Record<string, { views: number; visitors: string[] }>;
  lastAccessTime: string;
}

// Obter ou criar ID anônimo e seguro para o visitante
export function getOrCreateVisitorId(): string {
  try {
    let visitorId = localStorage.getItem(STORAGE_KEY_VISITOR_ID);
    if (!visitorId) {
      const randomSeed = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'vis-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now().toString(36);
      visitorId = randomSeed;
      localStorage.setItem(STORAGE_KEY_VISITOR_ID, visitorId);
    }
    return visitorId;
  } catch {
    return 'vis-temp-' + Math.random().toString(36).substring(2, 7);
  }
}

// Obter dados brutos de analytics
function getStoredAnalytics(): StoredAnalytics {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ANALYTICS);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        totalPageViews: parsed.totalPageViews || 0,
        uniqueVisitorIds: Array.isArray(parsed.uniqueVisitorIds) ? parsed.uniqueVisitorIds : [],
        viewsByArea: parsed.viewsByArea || {},
        dailyMap: parsed.dailyMap || {},
        lastAccessTime: parsed.lastAccessTime || new Date().toISOString()
      };
    }
  } catch {
    // fallback
  }

  // Dados iniciais com base nos registros do histórico
  return {
    totalPageViews: 1,
    uniqueVisitorIds: [getOrCreateVisitorId()],
    viewsByArea: {
      home: 1
    },
    dailyMap: {
      [new Date().toISOString().split('T')[0]]: {
        views: 1,
        visitors: [getOrCreateVisitorId()]
      }
    },
    lastAccessTime: new Date().toISOString()
  };
}

// Registrar um acesso ou visualização de área
export function recordSiteAccess(area: string = 'home'): SiteAnalyticsSummary {
  const visitorId = getOrCreateVisitorId();
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();

  const data = getStoredAnalytics();

  // Incrementa contagem global
  data.totalPageViews = (data.totalPageViews || 0) + 1;
  data.lastAccessTime = now;

  // Garante que o visitante atual está no conjunto
  if (!data.uniqueVisitorIds.includes(visitorId)) {
    data.uniqueVisitorIds.push(visitorId);
  }

  // Incrementa contagem por área
  data.viewsByArea[area] = (data.viewsByArea[area] || 0) + 1;

  // Atualiza mapa diário
  if (!data.dailyMap[today]) {
    data.dailyMap[today] = { views: 0, visitors: [] };
  }
  data.dailyMap[today].views += 1;
  if (!data.dailyMap[today].visitors.includes(visitorId)) {
    data.dailyMap[today].visitors.push(visitorId);
  }

  // Persiste no LocalStorage
  try {
    localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(data));
  } catch {
    // silent fail
  }

  // Envia log para auditoria e Supabase
  try {
    addLog('PAGE_VIEW', `Acesso à área: ${area} (Visitante ${visitorId.substring(0, 8)})`);
    
    // Tenta registrar telemetria assíncrona no Supabase caso tabela de auditoria esteja ativa
    const supabase = getSupabase();
    if (supabase) {
      try {
        Promise.resolve(
          supabase.from('auditoria_logs').insert({
            tipo: 'PAGE_VIEW',
            detalhes: `Acesso à seção: ${area} | Visitante: ${visitorId.substring(0, 8)}`,
            origem: 'Web App EEMTI Alfredo Machado'
          })
        ).catch(() => {});
      } catch {
        // silent
      }
    }
  } catch {
    // silent fail
  }

  return getSiteAnalyticsSummary();
}

// Obter sumário consolidado para exibição nas telas de gestão
export function getSiteAnalyticsSummary(): SiteAnalyticsSummary {
  const data = getStoredAnalytics();
  const today = new Date().toISOString().split('T')[0];
  const todayData = data.dailyMap[today] || { views: 0, visitors: [] };

  // Organiza últimos 7 dias em ordem cronológica
  const daysList: { date: string; views: number; visitors: number }[] = [];
  const now = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().split('T')[0];
    const item = data.dailyMap[dateKey];
    daysList.push({
      date: dateKey,
      views: item ? item.views : 0,
      visitors: item ? item.visitors.length : 0
    });
  }

  return {
    totalPageViews: Math.max(data.totalPageViews, data.uniqueVisitorIds.length),
    uniqueVisitors: Math.max(data.uniqueVisitorIds.length, 1),
    todayPageViews: todayData.views,
    todayVisitors: todayData.visitors.length,
    lastAccessTime: data.lastAccessTime,
    viewsByArea: data.viewsByArea,
    dailyHistory: daysList
  };
}
