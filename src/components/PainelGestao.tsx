import React, { useState, useEffect } from 'react';
import { 
  Denuncia, 
  ComplaintStatus, 
  SOSAlert 
} from '../types';
import { 
  getDenuncias, 
  getSOSAlerts, 
  updateSOSAlertStatus, 
  exportDenunciasCSV,
  syncFromSupabase,
  clearAllFictitiousData
} from '../services/storageService';
import { playBreathTone } from '../services/audioSynthesizer';
import { ModalMediacao } from './gestao/ModalMediacao';
import { ModalEnvioEmail } from './gestao/ModalEnvioEmail';
import { ModalRelatorioMensal } from './gestao/ModalRelatorioMensal';
import { DocumentoOficialModal } from './gestao/DocumentoOficialModal';
import { EstatisticasGestao } from './gestao/EstatisticasGestao';
import { 
  ShieldCheck, 
  Printer, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Bell, 
  AlertTriangle, 
  Radio, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText, 
  HeartHandshake, 
  RefreshCw, 
  MapPin, 
  GraduationCap, 
  Check, 
  Paperclip, 
  Sparkles, 
  Activity, 
  BarChart2, 
  ShieldAlert, 
  Flame, 
  CheckCheck, 
  Layers, 
  UserCheck, 
  CheckSquare, 
  FileSpreadsheet,
  Compass,
  Copy,
  ChevronRight,
  Filter,
  X,
  Calendar,
  ExternalLink,
  TrafficCone,
  ArrowUpDown,
  Mail
} from 'lucide-react';
import { getSemaforoInfo } from '../utils/semaforoUtils';

interface PainelGestaoProps {
  onBack: () => void;
}

const SENHA_GESTAO_MESTRA = '22112009';

export const PainelGestao: React.FC<PainelGestaoProps> = ({ onBack }) => {
  // 1. Estado de Autenticação com Senha
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('painel_gestao_auth_v2') === 'true';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // 2. Dados Operacionais
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [sosAlerts, setSosAlerts] = useState<SOSAlert[]>([]);
  const [activeTab, setActiveTab] = useState<'denuncias' | 'sos' | 'estatisticas'>('denuncias');

  // 3. Filtros e Busca Rápidos
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'Em Análise' | 'Acolhido' | 'Resolvido'>('todos');
  const [tipoFilter, setTipoFilter] = useState<string>('todos');
  const [urgenciaSemaforoFilter, setUrgenciaSemaforoFilter] = useState<'todos' | 'vermelho' | 'amarelo' | 'verde'>('todos');
  const [dataPeriodFilter, setDataPeriodFilter] = useState<'todas' | 'hoje' | '7dias' | '30dias' | 'mes'>('todas');
  const [dataSortOrder, setDataSortOrder] = useState<'recentes' | 'antigas'>('recentes');
  const [onlySOSFilter, setOnlySOSFilter] = useState(false);

  // 4. Modal de Mediação Aprofundada, Impressão & E-mails
  const [selectedCase, setSelectedCase] = useState<Denuncia | null>(null);
  const [caseForEmail, setCaseForEmail] = useState<Denuncia | null>(null);
  const [docForPrint, setDocForPrint] = useState<Denuncia | null>(null);
  const [showMonthlyReportModal, setShowMonthlyReportModal] = useState(false);

  // 5. Central de Notificações
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  // 6. Modal de Atendimento SOS GPS
  const [selectedSOS, setSelectedSOS] = useState<SOSAlert | null>(null);
  const [sosAtendenteNome, setSosAtendenteNome] = useState('Equipe de Plantão Escolar');
  const [sosNotas, setSosNotas] = useState('');

  // 7. Feedback de Cópia / Notificação
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const playSfx = (type: 'success' | 'alert' | 'click' | 'lock' | 'tab') => {
    try {
      if (type === 'success') {
        playBreathTone(523, 50, true);
        setTimeout(() => playBreathTone(659, 80, true), 70);
      } else if (type === 'alert') {
        playBreathTone(440, 90, true);
        setTimeout(() => playBreathTone(440, 90, true), 110);
      } else if (type === 'click') {
        playBreathTone(750, 25, true);
      } else if (type === 'tab') {
        playBreathTone(620, 30, true);
      } else if (type === 'lock') {
        playBreathTone(350, 70, true);
      }
    } catch {}
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const copyToClipboard = (text: string, label: string) => {
    try {
      navigator.clipboard.writeText(text);
      playSfx('click');
      showToast(`${label} copiado com sucesso!`);
    } catch {
      showToast(`Código: ${text}`);
    }
  };

  const loadDashboardData = () => {
    const list = getDenuncias();
    setDenuncias(list);
    const sos = getSOSAlerts();
    setSosAlerts(sos);

    // Se houver caso aberto no modal, sincroniza
    if (selectedCase) {
      const updatedCase = list.find(d => d.id === selectedCase.id);
      if (updatedCase) {
        setSelectedCase(updatedCase);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      syncFromSupabase().then(() => loadDashboardData()).catch(() => loadDashboardData());
      const handleStorageUpdate = () => {
        loadDashboardData();
      };
      window.addEventListener('storage_denuncias_updated', handleStorageUpdate);
      return () => {
        window.removeEventListener('storage_denuncias_updated', handleStorageUpdate);
      };
    }
  }, [isAuthenticated]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError('');

    setTimeout(() => {
      if (passwordInput.trim() === SENHA_GESTAO_MESTRA) {
        playSfx('success');
        setIsAuthenticated(true);
        try {
          sessionStorage.setItem('painel_gestao_auth_v2', 'true');
        } catch {}
      } else {
        playSfx('alert');
        setAuthError('Senha incorreta. Acesso restrito aos educadores e coordenação da EEMTI Alfredo Machado.');
      }
      setIsVerifying(false);
    }, 180);
  };

  const handleLogout = () => {
    playSfx('lock');
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('painel_gestao_auth_v2');
    } catch {}
    setPasswordInput('');
  };

  const handleResolveSOSAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSOS) return;

    playSfx('success');
    const updated = updateSOSAlertStatus(
      selectedSOS.id,
      'ATENDIDO',
      sosAtendenteNome.trim() || 'Coordenação de Plantão',
      sosNotas.trim() || 'Atendimento presencial concluído no local.'
    );
    setSosAlerts(updated);
    setSelectedSOS(null);
    setSosNotas('');
    showToast('Alerta SOS registrado como atendido no prontuário.');
  };

  const handleExportCSV = () => {
    playSfx('click');
    const csvData = exportDenunciasCSV(denuncias);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Relatorio_Gestao_EEMTI_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Planilha CSV gerada e baixada com sucesso!');
  };

  // Cálculos operacionais
  const pendentesSOS = denuncias.filter(d => d.is_sos && d.status !== 'Resolvido');
  const sosAlertasUrgentes = sosAlerts.filter(s => s.status === 'URGENTE');
  const totalCasosUrgentes = pendentesSOS.length + sosAlertasUrgentes.length;

  const totalDenuncias = denuncias.length;
  const casosEmAnalise = denuncias.filter(d => d.status === 'Em Análise').length;
  const casosAcolhidos = denuncias.filter(d => d.status === 'Acolhido').length;
  const casosResolvidos = denuncias.filter(d => d.status === 'Resolvido').length;
  const percentResolvidos = totalDenuncias > 0 ? Math.round((casosResolvidos / totalDenuncias) * 100) : 0;
  const percentAcolhidos = totalDenuncias > 0 ? Math.round((casosAcolhidos / totalDenuncias) * 100) : 0;
  const percentEmAnalise = totalDenuncias > 0 ? Math.round((casosEmAnalise / totalDenuncias) * 100) : 0;

  // Notificações estruturadas
  const notificationsList = [
    ...pendentesSOS.map(d => ({
      id: `notif-sos-${d.id}`,
      tipo: 'SOS',
      titulo: `🚨 Denúncia SOS (${d.protocolo})`,
      descricao: `${d.tipo_violencia} no local: ${d.local_escola}. Ação imediata necessária!`,
      data: d.data_envio,
      casoId: d.id,
      urgente: true
    })),
    ...sosAlertasUrgentes.map(s => ({
      id: `notif-gps-${s.id}`,
      tipo: 'GPS_SOS',
      titulo: `📍 Botão de Pânico Disparado`,
      descricao: `Alerta GPS recebido: ${s.local_aproximado || s.dispositivo_info}.`,
      data: s.data_disparo,
      casoId: undefined as string | undefined,
      urgente: true
    })),
    ...denuncias.filter(d => !d.is_sos && d.status === 'Em Análise').map(d => ({
      id: `notif-ana-${d.id}`,
      tipo: 'ANALISE',
      titulo: `Relato em Análise (${d.protocolo})`,
      descricao: `${d.tipo_violencia} - Aguardando acolhimento ou mediação.`,
      data: d.data_envio,
      casoId: d.id,
      urgente: false
    }))
  ];

  const totalNotificacoes = notificationsList.length;

  // Contadores dinâmicos para pílulas de filtros rápidos
  const countFisico = denuncias.filter(d => {
    const t = (d.tipo_violencia || '').toLowerCase();
    return t.includes('físic') || t.includes('fisic');
  }).length;

  const countCyber = denuncias.filter(d => {
    const t = (d.tipo_violencia || '').toLowerCase();
    return t.includes('cyber') || t.includes('virtual');
  }).length;

  const countVerbal = denuncias.filter(d => {
    const t = (d.tipo_violencia || '').toLowerCase();
    return t.includes('verbal');
  }).length;

  const countPsicologico = denuncias.filter(d => {
    const t = (d.tipo_violencia || '').toLowerCase();
    return t.includes('psicol');
  }).length;

  const countSocial = denuncias.filter(d => {
    const t = (d.tipo_violencia || '').toLowerCase();
    return t.includes('social');
  }).length;

  // Contadores por Semáforo Pedagógico de Urgência
  const countSemaforoVermelho = denuncias.filter(d => getSemaforoInfo(d).nivel === 'vermelho').length;
  const countSemaforoAmarelo = denuncias.filter(d => getSemaforoInfo(d).nivel === 'amarelo').length;
  const countSemaforoVerde = denuncias.filter(d => getSemaforoInfo(d).nivel === 'verde').length;

  // Verificação de período cronológico com suporte a dados recentes e mock
  const isDateInFilter = (dateStr: string, period: 'todas' | 'hoje' | '7dias' | '30dias' | 'mes') => {
    if (period === 'todas') return true;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return true;

    const now = new Date();
    // Encontrar data de referência mais recente para acomodar dados reais ou mock de demonstração
    const timestamps = denuncias.map(d => new Date(d.data_envio).getTime()).filter(t => !isNaN(t));
    const maxDataMs = timestamps.length > 0 ? Math.max(...timestamps) : now.getTime();
    const refTime = Math.max(now.getTime(), maxDataMs);

    const diffMs = refTime - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (period === 'hoje') {
      return diffHours <= 24 || (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear());
    }
    if (period === '7dias') {
      return diffDays <= 7;
    }
    if (period === '30dias') {
      return diffDays <= 30;
    }
    if (period === 'mes') {
      const refDate = new Date(refTime);
      return date.getMonth() === refDate.getMonth() && date.getFullYear() === refDate.getFullYear();
    }
    return true;
  };

  const hasActiveFilters = 
    searchTerm.trim() !== '' ||
    statusFilter !== 'todos' ||
    tipoFilter !== 'todos' ||
    urgenciaSemaforoFilter !== 'todos' ||
    dataPeriodFilter !== 'todas' ||
    dataSortOrder !== 'recentes' ||
    onlySOSFilter;

  const clearAllFilters = () => {
    playSfx('click');
    setSearchTerm('');
    setStatusFilter('todos');
    setTipoFilter('todos');
    setUrgenciaSemaforoFilter('todos');
    setDataPeriodFilter('todas');
    setDataSortOrder('recentes');
    setOnlySOSFilter(false);
    showToast('Todos os filtros foram redefinidos.');
  };

  const filteredDenuncias = denuncias
    .filter(d => {
      // 1. Filtro Prioridade SOS
      if (onlySOSFilter && !d.is_sos) return false;

      // 2. Filtro Status
      if (statusFilter !== 'todos' && d.status !== statusFilter) return false;

      // 3. Filtro por Tipo de Bullying
      if (tipoFilter !== 'todos') {
        const t = (d.tipo_violencia || '').toLowerCase();
        const f = tipoFilter.toLowerCase();
        if (f === 'física' || f === 'fisica') {
          if (!t.includes('físic') && !t.includes('fisic')) return false;
        } else if (f === 'cyberbullying' || f === 'virtual') {
          if (!t.includes('cyber') && !t.includes('virtual')) return false;
        } else if (f === 'verbal') {
          if (!t.includes('verbal')) return false;
        } else if (f === 'psicológica' || f === 'psicologica') {
          if (!t.includes('psicol')) return false;
        } else if (f === 'social') {
          if (!t.includes('social')) return false;
        } else if (t !== f) {
          return false;
        }
      }

      // 4. Filtro por Semáforo de Urgência
      if (urgenciaSemaforoFilter !== 'todos') {
        const semaforo = getSemaforoInfo(d);
        if (semaforo.nivel !== urgenciaSemaforoFilter) return false;
      }

      // 5. Filtro por Data / Período
      if (!isDateInFilter(d.data_envio, dataPeriodFilter)) return false;

      // 6. Busca textual
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const protoMatch = (d.protocolo || '').toLowerCase().includes(q);
        const descMatch = (d.descricao || '').toLowerCase().includes(q);
        const localMatch = (d.local_escola || '').toLowerCase().includes(q);
        const turmaMatch = (d.turma_envolvida || '').toLowerCase().includes(q);
        const tipoMatch = (d.tipo_violencia || '').toLowerCase().includes(q);
        if (!protoMatch && !descMatch && !localMatch && !turmaMatch && !tipoMatch) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(a.data_envio).getTime() || 0;
      const timeB = new Date(b.data_envio).getTime() || 0;
      return dataSortOrder === 'recentes' ? timeB - timeA : timeA - timeB;
    });

  // =========================================================================
  // TELA DE BLOQUEIO POR SENHA (SENHA CONFIDENCIAL PROTEGIDA)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-8 sm:my-16 space-y-6 animate-fadeIn px-3">
        <div className="relative rounded-3xl bg-white/95 border border-purple-200/90 p-6 sm:p-8 shadow-xl shadow-purple-900/5 space-y-6 text-center overflow-hidden backdrop-blur-xl">
          
          {/* Luzes decorativas sutis */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-purple-200/50 blur-xl"></div>
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 border border-purple-300/40 flex items-center justify-center shadow-lg shadow-purple-600/30 text-white">
              <Lock className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[11px] font-black uppercase tracking-wider border border-purple-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
              Gestão Escolar Confidencial
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[#241e33] tracking-tight">
              Painel de Gestão
            </h1>
            <p className="text-xs text-[#5c546d] leading-relaxed max-w-xs mx-auto">
              Ambiente de governança, acolhimento e mediação restaurativa da <strong>EEMTI Alfredo Machado</strong>.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#241e33] flex items-center justify-between">
                <span>Senha de Acesso:</span>
                <span className="text-[10px] text-purple-700 font-semibold">Coordenação &amp; Direção</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError('');
                  }}
                  placeholder="Digite sua senha..."
                  className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-purple-50/50 border border-purple-200 text-[#241e33] text-sm font-mono placeholder-[#786e8a] focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-400/30 transition-all shadow-inner"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#786e8a] hover:text-[#241e33] p-1.5 cursor-pointer transition-colors"
                  title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5 animate-shake">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!passwordInput.trim() || isVerifying}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <Unlock className="w-4 h-4" />
              <span>{isVerifying ? 'Verificando Credencial...' : 'Entrar no Painel de Gestão'}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-purple-100 flex items-center justify-between text-[11px] text-[#786e8a]">
            <span>Lei Federal nº 13.185/2015</span>
            <button
              type="button"
              onClick={onBack}
              className="text-purple-700 hover:underline font-bold cursor-pointer"
            >
              Voltar ao Início
            </button>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // PAINEL DE GESTÃO PRINCIPAL (DESIGN MODERNO, INTUITIVO E POLIDO)
  // =========================================================================
  return (
    <div className="max-w-7xl mx-auto space-y-7 animate-fadeIn pb-24 px-2 sm:px-4">
      
      {/* Toast flutuante de feedback elegante */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-emerald-950/95 border border-emerald-500 text-emerald-100 text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-bounce backdrop-blur-md">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* CABEÇALHO DO PAINEL COM CARD TRANSLÚCIDO E IDENTIDADE ESCOLAR */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#0c1222]/90 via-[#0a0f1d]/90 to-[#0e1628]/90 border border-indigo-500/25 p-5 sm:p-6 shadow-xl backdrop-blur-md overflow-hidden">
        
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-80 h-32 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                SEDUC/CE • EEMTI Alfredo Machado
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Sessão Segura Ativa
              </span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-3">
              Painel de Gestão & Mediação Escolar
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Central estratégica de acolhimento sigiloso, protocolo restaurativo e acompanhamento de planos de convivência pacífica.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Sino de Notificações com gaveta */}
            <div className="relative">
              <button
                onClick={() => {
                  playSfx('click');
                  setShowNotificationDrawer(!showNotificationDrawer);
                }}
                className={`relative p-2.5 sm:px-3.5 sm:py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  totalCasosUrgentes > 0
                    ? 'bg-red-950/80 border-red-500 text-red-100 hover:bg-red-900 shadow-lg shadow-red-950/50'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Bell className={`w-4 h-4 ${totalCasosUrgentes > 0 ? 'text-red-400 animate-bounce' : 'text-slate-300'}`} />
                <span className="hidden sm:inline font-bold">Notificações</span>
                
                {totalNotificacoes > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    totalCasosUrgentes > 0 ? 'bg-red-600 text-white animate-pulse' : 'bg-indigo-600 text-white'
                  }`}>
                    {totalNotificacoes}
                  </span>
                )}
              </button>

              {/* Drawer dropdown de alertas */}
              {showNotificationDrawer && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-[#090e1c] border-2 border-indigo-500/50 shadow-2xl p-4 z-50 space-y-3 animate-fadeIn backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-400" />
                      <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                        Central de Notificações ({totalNotificacoes})
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowNotificationDrawer(false)}
                      className="text-slate-400 hover:text-white p-1 text-xs cursor-pointer rounded-lg hover:bg-white/10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-indigo-600/30">
                    {notificationsList.length === 0 ? (
                      <p className="text-center py-6 text-xs text-slate-400">
                        Tudo em ordem! Nenhuma notificação pendente.
                      </p>
                    ) : (
                      notificationsList.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            setShowNotificationDrawer(false);
                            if (notif.casoId) {
                              const c = denuncias.find(d => d.id === notif.casoId);
                              if (c) setSelectedCase(c);
                            } else {
                              setActiveTab('sos');
                            }
                          }}
                          className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all hover:scale-[1.01] ${
                            notif.urgente
                              ? 'bg-red-950/60 border-red-500/60 text-red-100 shadow-sm'
                              : 'bg-black/50 border-white/10 text-slate-300 hover:border-indigo-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-white text-[11px] flex items-center gap-1.5">
                              {notif.urgente && <Flame className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />}
                              <span className="truncate">{notif.titulo}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 flex-shrink-0 ml-1">
                              {new Date(notif.data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-snug">
                            {notif.descricao}
                          </p>
                          <span className="mt-1.5 text-[10px] text-indigo-400 font-bold block hover:underline">
                            Intervir agora →
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Recarregar dados */}
            <button
              onClick={() => {
                playSfx('click');
                loadDashboardData();
                showToast('Dados atualizados com sucesso!');
              }}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all cursor-pointer"
              title="Atualizar Dados Operacionais"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Exportar Planilha CSV */}
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Baixar planilha compatível com Excel"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>

            {/* Relatório Mensal por E-mail */}
            <button
              onClick={() => {
                playSfx('click');
                setShowMonthlyReportModal(true);
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 hover:text-white border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Gerar e enviar relatório mensal de denúncias para Conselho Tutelar e Escola"
            >
              <Mail className="w-4 h-4 text-indigo-300" />
              <span className="hidden sm:inline">Relatório Mensal</span>
            </button>

            {/* Bloquear Painel */}
            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title="Encerrar sessão confidencial"
            >
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Bloquear</span>
            </button>

            {/* Voltar ao Portal */}
            <button
              onClick={onBack}
              className="px-3.5 py-2.5 rounded-2xl bg-white/90 hover:bg-purple-100 text-[#241e33] border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portal</span>
            </button>

          </div>

        </div>

      </div>

      {/* BANNER SOS URGENTE COM DESTAQUE MÁXIMO SE HOUVER ALERTA PENDENTE */}
      {totalCasosUrgentes > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-950/95 via-red-900/90 to-rose-950/95 border-2 border-red-500 shadow-2xl shadow-red-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-600 border-2 border-white/40 flex items-center justify-center text-white shadow-lg shadow-red-600/50 flex-shrink-0 animate-bounce">
              <Flame className="w-7 h-7" />
            </div>
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/30 border border-red-400/50 text-white text-[10px] font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                Prioridade Máxima da Gestão
              </div>
              <h2 className="font-display font-black text-lg sm:text-xl text-white">
                {totalCasosUrgentes} {totalCasosUrgentes === 1 ? 'Ocorrência Requer Atenção SOS Imediata' : 'Ocorrências Requerem Atenção SOS Imediata'}!
              </h2>
              <p className="text-xs text-red-100 font-medium">
                {pendentesSOS.length > 0 && `${pendentesSOS.length} relato(s) marcados como SOS.`} {sosAlertasUrgentes.length > 0 && `${sosAlertasUrgentes.length} disparo(s) de GPS pendentes.`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playSfx('alert');
              setOnlySOSFilter(true);
              setStatusFilter('todos');
              setActiveTab('denuncias');
              showToast('Filtrando apenas ocorrências com prioridade SOS.');
            }}
            className="px-5 py-3 rounded-2xl bg-white text-red-950 hover:bg-red-50 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:scale-105 cursor-pointer flex-shrink-0 transition-transform"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Ver Casos SOS Agora</span>
          </button>
        </div>
      )}

      {/* CARDS DE MÉTRICAS & TRIAGEM RÁPIDA ESTILIZADOS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-bold uppercase tracking-wider text-[11px] text-indigo-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Triagem Dinâmica & Monitoramento • Clique para filtrar:
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline font-bold cursor-pointer flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Limpar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          
          {/* Card Total */}
          <button
            onClick={() => {
              playSfx('click');
              setStatusFilter('todos');
              setOnlySOSFilter(false);
              setActiveTab('denuncias');
            }}
            className={`p-4 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden group hover:scale-[1.02] ${
              statusFilter === 'todos' && !onlySOSFilter && activeTab === 'denuncias'
                ? 'bg-indigo-950/70 border-indigo-400 ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-950/50'
                : 'bg-[#0b1020]/90 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Geral</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-2">{totalDenuncias}</div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-indigo-300 font-semibold">
              <span>100% sob sigilo</span>
              <ChevronRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Card SOS */}
          <button
            onClick={() => {
              playSfx('alert');
              setOnlySOSFilter(true);
              setStatusFilter('todos');
              setActiveTab('denuncias');
            }}
            className={`p-4 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden group hover:scale-[1.02] ${
              onlySOSFilter
                ? 'bg-red-950/80 border-red-500 ring-2 ring-red-500 shadow-lg shadow-red-950/60'
                : pendentesSOS.length > 0 
                ? 'bg-red-950/30 border-red-500/60 hover:border-red-500' 
                : 'bg-[#0b1020]/90 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-red-400 uppercase tracking-wider">Casos SOS</span>
              <div className={`w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center ${pendentesSOS.length > 0 ? 'animate-bounce' : ''}`}>
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono mt-2">{pendentesSOS.length}</div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-red-300 font-bold">
              <span>{pendentesSOS.length > 0 ? 'Prioridade Ativa' : 'Sem pendências'}</span>
              <ChevronRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Card Em Análise */}
          <button
            onClick={() => {
              playSfx('click');
              setOnlySOSFilter(false);
              setStatusFilter('Em Análise');
              setActiveTab('denuncias');
            }}
            className={`p-4 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden group hover:scale-[1.02] ${
              statusFilter === 'Em Análise'
                ? 'bg-amber-950/70 border-amber-400 ring-2 ring-amber-500 shadow-lg shadow-amber-950/50'
                : 'bg-[#0b1020]/90 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Em Análise</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono mt-2">{casosEmAnalise}</div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
              <span>{percentEmAnalise}% dos relatos</span>
              <ChevronRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Card Em Mediação / Acolhido */}
          <button
            onClick={() => {
              playSfx('click');
              setOnlySOSFilter(false);
              setStatusFilter('Acolhido');
              setActiveTab('denuncias');
            }}
            className={`p-4 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden group hover:scale-[1.02] ${
              statusFilter === 'Acolhido'
                ? 'bg-blue-950/70 border-blue-400 ring-2 ring-blue-500 shadow-lg shadow-blue-950/50'
                : 'bg-[#0b1020]/90 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">Em Diálogo</span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <HeartHandshake className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-300 font-mono mt-2">{casosAcolhidos}</div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
              <span>{percentAcolhidos}% em mediação</span>
              <ChevronRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Card Resolvidos / Pacificados */}
          <button
            onClick={() => {
              playSfx('click');
              setOnlySOSFilter(false);
              setStatusFilter('Resolvido');
              setActiveTab('denuncias');
            }}
            className={`p-4 rounded-3xl border text-left transition-all cursor-pointer relative overflow-hidden group col-span-2 sm:col-span-1 hover:scale-[1.02] ${
              statusFilter === 'Resolvido'
                ? 'bg-emerald-950/70 border-emerald-400 ring-2 ring-emerald-500 shadow-lg shadow-emerald-950/50'
                : 'bg-[#0b1020]/90 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Pacificados</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono mt-2">
              {casosResolvidos} <span className="text-xs font-sans text-slate-400 font-normal">({percentResolvidos}%)</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-emerald-400 font-bold">
              <span>Acordo cumprido</span>
              <ChevronRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

        </div>
      </div>

      {/* SELEÇÃO DE ABAS PRINCIPAIS */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto scrollbar-none">
        
        <button
          onClick={() => {
            playSfx('tab');
            setActiveTab('denuncias');
          }}
          className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
            activeTab === 'denuncias'
              ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-600/35 ring-1 ring-indigo-400/40'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Ocorrências & Mediação</span>
          <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-mono">
            {denuncias.length}
          </span>
        </button>

        <button
          onClick={() => {
            playSfx('tab');
            setActiveTab('sos');
          }}
          className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
            activeTab === 'sos'
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/35 ring-1 ring-red-400/40'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>Alertas GPS SOS</span>
          {sosAlertasUrgentes.length > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] font-mono">
            {sosAlerts.length}
          </span>
        </button>

        <button
          onClick={() => {
            playSfx('tab');
            setActiveTab('estatisticas');
          }}
          className={`px-5 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
            activeTab === 'estatisticas'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/35 ring-1 ring-emerald-400/40'
              : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Diagnóstico & Indicadores Escolares</span>
        </button>

      </div>

      {/* ========================================================================= */}
      {/* ABA 1: OCORRÊNCIAS & MEDIAÇÃO RESTAURATIVA                                 */}
      {/* ========================================================================= */}
      {activeTab === 'denuncias' && (
        <div className="space-y-4">
          
          {/* PAINEL COMPLETO DE FILTROS RÁPIDOS (DATA, TIPO DE BULLYING E SEMÁFORO) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#0b1020]/95 border border-white/10 shadow-xl space-y-4">
            
            {/* Linha Superior: Busca + Ordenação + Limpar Filtros */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por protocolo, turma, local ou conteúdo do relato..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end">
                {/* Botão de Ordenação de Data */}
                <button
                  type="button"
                  onClick={() => {
                    playSfx('click');
                    setDataSortOrder(dataSortOrder === 'recentes' ? 'antigas' : 'recentes');
                  }}
                  className="px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-slate-300 hover:text-white hover:border-indigo-400/50 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  title="Alterar ordenação cronológica das denúncias"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{dataSortOrder === 'recentes' ? 'Mais Recentes ↓' : 'Mais Antigas ↑'}</span>
                </button>

                {/* Botão Limpar Filtros se houver algum ativo */}
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Limpar Filtros</span>
                  </button>
                )}
              </div>

            </div>

            {/* SEÇÃO 1: FILTRO RÁPIDO POR NÍVEL DE URGÊNCIA (SEMÁFORO PEDAGÓGICO) */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <TrafficCone className="w-3.5 h-3.5 text-amber-400" />
                  Nível de Urgência (Semáforo Pedagógico):
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">
                  Triagem conforme Lei Federal nº 13.185/2015
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* Todos */}
                <button
                  type="button"
                  onClick={() => {
                    playSfx('click');
                    setUrgenciaSemaforoFilter('todos');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                    urgenciaSemaforoFilter === 'todos'
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30 ring-1 ring-indigo-300/40'
                      : 'bg-black/40 text-slate-400 border-white/10 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  <span>Todos os Níveis</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-black/40 text-[10px] font-mono">
                    {denuncias.length}
                  </span>
                </button>

                {/* Vermelho (Crítico / SOS) */}
                <button
                  type="button"
                  onClick={() => {
                    playSfx('alert');
                    setUrgenciaSemaforoFilter(urgenciaSemaforoFilter === 'vermelho' ? 'todos' : 'vermelho');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer ${
                    urgenciaSemaforoFilter === 'vermelho'
                      ? 'bg-red-600 text-white border-red-400 shadow-md shadow-red-600/40 ring-1 ring-red-300'
                      : 'bg-red-950/30 text-red-300 border-red-500/30 hover:border-red-500/60 hover:bg-red-950/50'
                  }`}
                  title="Física, ameaças graves, disparos de SOS ou risco iminente"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444] animate-pulse" />
                  <span>🔴 Vermelho: Crítico / Alta</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-black/40 text-[10px] font-mono">
                    {countSemaforoVermelho}
                  </span>
                </button>

                {/* Amarelo (Recorrente / Moderado) */}
                <button
                  type="button"
                  onClick={() => {
                    playSfx('click');
                    setUrgenciaSemaforoFilter(urgenciaSemaforoFilter === 'amarelo' ? 'todos' : 'amarelo');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer ${
                    urgenciaSemaforoFilter === 'amarelo'
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/40 ring-1 ring-amber-300'
                      : 'bg-amber-950/30 text-amber-300 border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-950/50'
                  }`}
                  title="Cyberbullying, humilhações reiteradas ou exclusão sistemática"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                  <span>🟡 Amarelo: Moderado / Recorrente</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-black/40 text-[10px] font-mono">
                    {countSemaforoAmarelo}
                  </span>
                </button>

                {/* Verde (Leve / Conflito Pontual) */}
                <button
                  type="button"
                  onClick={() => {
                    playSfx('click');
                    setUrgenciaSemaforoFilter(urgenciaSemaforoFilter === 'verde' ? 'todos' : 'verde');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer ${
                    urgenciaSemaforoFilter === 'verde'
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/40 ring-1 ring-emerald-300'
                      : 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-950/50'
                  }`}
                  title="Desentendimentos isolados ou atritos pontuais sem agressão física continuada"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                  <span>🟢 Verde: Baixo / Observação</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-black/40 text-[10px] font-mono">
                    {countSemaforoVerde}
                  </span>
                </button>
              </div>
            </div>

            {/* SEÇÃO 2: FILTRO RÁPIDO POR TIPO DE BULLYING */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  Tipo de Bullying / Violência:
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">
                  Físico, Virtual, Verbal, Psicológico e Social
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'todos', label: 'Todos os Tipos', count: denuncias.length, emoji: '🏷️' },
                  { id: 'Física', label: 'Físico', count: countFisico, emoji: '🥊' },
                  { id: 'Cyberbullying', label: 'Virtual / Cyber', count: countCyber, emoji: '💻' },
                  { id: 'Verbal', label: 'Verbal', count: countVerbal, emoji: '🗣️' },
                  { id: 'Psicológica', label: 'Psicológico', count: countPsicologico, emoji: '🧠' },
                  { id: 'Social', label: 'Social / Relacional', count: countSocial, emoji: '👥' },
                ].map((item) => {
                  const isSelected = tipoFilter.toLowerCase() === item.id.toLowerCase() || 
                    (item.id === 'Cyberbullying' && tipoFilter.toLowerCase() === 'virtual') ||
                    (item.id === 'Física' && tipoFilter.toLowerCase() === 'fisica');

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playSfx('click');
                        setTipoFilter(isSelected && item.id !== 'todos' ? 'todos' : item.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30 ring-1 ring-purple-300/40'
                          : 'bg-black/40 text-slate-300 border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                      <span className="px-1.5 py-0.2 rounded-md bg-black/40 text-[10px] font-mono opacity-90">
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SEÇÃO 3: FILTRO RÁPIDO POR DATA & PERÍODO */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  Data do Relato (Intervalo Cronológico):
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">
                  Selecione o período de envio da denúncia
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'todas', label: 'Todas as Datas', icon: '📅' },
                  { id: 'hoje', label: 'Hoje (Últimas 24h)', icon: '⏱️' },
                  { id: '7dias', label: 'Últimos 7 dias', icon: '🗓️' },
                  { id: '30dias', label: 'Últimos 30 dias', icon: '📆' },
                  { id: 'mes', label: 'Este Mês', icon: '🗓️' },
                ].map((item) => {
                  const isSelected = dataPeriodFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playSfx('click');
                        setDataPeriodFilter(item.id as any);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 ring-1 ring-blue-300/40'
                          : 'bg-black/40 text-slate-300 border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SEÇÃO 4: STATUS DO CASO & RESUMO DE FILTROS ATIVOS */}
            <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              
              {/* Seletor rápido de Status */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status:</span>
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'Em Análise', label: 'Em Análise' },
                  { id: 'Acolhido', label: 'Em Diálogo' },
                  { id: 'Resolvido', label: 'Pacificados' }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => {
                      playSfx('click');
                      setStatusFilter(st.id as any);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      statusFilter === st.id
                        ? 'bg-indigo-500/25 text-indigo-200 border-indigo-400'
                        : 'bg-black/30 text-slate-400 border-white/10 hover:text-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}

                {/* Prioridade SOS rápida */}
                <button
                  type="button"
                  onClick={() => {
                    playSfx(onlySOSFilter ? 'click' : 'alert');
                    setOnlySOSFilter(!onlySOSFilter);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                    onlySOSFilter
                      ? 'bg-red-600 text-white border-red-500 shadow-sm'
                      : 'bg-red-950/20 text-red-300 border-red-500/30 hover:border-red-500/60'
                  }`}
                >
                  <Flame className="w-3 h-3 text-red-400" />
                  <span>Apenas SOS</span>
                </button>
              </div>

              {/* Contador de resultados */}
              <div className="text-slate-400 text-xs font-medium flex items-center gap-2 self-end sm:self-center">
                <span>
                  Exibindo <strong className="text-white font-mono">{filteredDenuncias.length}</strong> de <span className="font-mono">{denuncias.length}</span> ocorrências
                </span>
              </div>

            </div>

            {/* Badges de Filtros Ativos (com remoção individual) */}
            {hasActiveFilters && (
              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 flex-wrap text-[11px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  Filtros Ativos:
                </span>

                {urgenciaSemaforoFilter !== 'todos' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/15 text-red-300 border border-red-500/30 font-semibold">
                    Semáforo: {urgenciaSemaforoFilter === 'vermelho' ? '🔴 Vermelho (Crítico)' : urgenciaSemaforoFilter === 'amarelo' ? '🟡 Amarelo (Moderado)' : '🟢 Verde (Baixo)'}
                    <button onClick={() => setUrgenciaSemaforoFilter('todos')} className="hover:text-white cursor-pointer ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {tipoFilter !== 'todos' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold">
                    Tipo: {tipoFilter}
                    <button onClick={() => setTipoFilter('todos')} className="hover:text-white cursor-pointer ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {dataPeriodFilter !== 'todas' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 font-semibold">
                    Data: {dataPeriodFilter === 'hoje' ? 'Hoje (24h)' : dataPeriodFilter === '7dias' ? '7 dias' : dataPeriodFilter === '30dias' ? '30 dias' : 'Este mês'}
                    <button onClick={() => setDataPeriodFilter('todas')} className="hover:text-white cursor-pointer ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {dataSortOrder !== 'recentes' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold">
                    Ordem: Mais Antigas
                    <button onClick={() => setDataSortOrder('recentes')} className="hover:text-white cursor-pointer ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {statusFilter !== 'todos' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold">
                    Status: {statusFilter}
                    <button onClick={() => setStatusFilter('todos')} className="hover:text-white cursor-pointer ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {onlySOSFilter && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/20 text-red-300 border border-red-500/40 font-semibold">
                    Prioridade SOS
                    <button onClick={() => setOnlySOSFilter(false)} className="hover:text-white cursor-pointer ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchTerm.trim() && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/20 font-semibold">
                    Busca: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="hover:text-white cursor-pointer ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline font-bold ml-2 cursor-pointer"
                >
                  Limpar todos
                </button>
              </div>
            )}

          </div>

          {/* Lista de Casos e Relatos */}
          <div className="space-y-3.5">
            {filteredDenuncias.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#0b1020]/90 border border-white/10 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Nenhum relato corresponde aos filtros selecionados</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Tente ajustar ou limpar os filtros de data, tipo de bullying ou semáforo de urgência.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Restaurar Todos os Filtros
                </button>
              </div>
            ) : (
              filteredDenuncias.map((caso) => {
                const isSOS = caso.is_sos;
                const acoesCount = caso.acoes_mediacao?.length || 0;
                const ultimaAcao = acoesCount > 0 ? caso.acoes_mediacao![acoesCount - 1] : null;

                return (
                  <div
                    key={caso.id}
                    className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 relative group ${
                      isSOS
                        ? 'bg-gradient-to-r from-red-950/30 via-[#0e1224] to-[#0a0e1c] border-red-500/70 shadow-xl shadow-red-950/20'
                        : 'bg-gradient-to-r from-[#0c1224]/90 via-[#0a0e1c]/90 to-[#0c1224]/90 border-white/10 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-950/30'
                    }`}
                  >
                    {/* Linha de topo: Protocolo, Status, Badges e Botão de Ação */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        
                        {/* Protocolo com botão de copiar */}
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 border border-white/15">
                          <span className="font-mono text-xs sm:text-sm font-black text-white">
                            {caso.protocolo}
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(caso.protocolo, `Protocolo ${caso.protocolo}`)}
                            className="text-slate-400 hover:text-white p-0.5 cursor-pointer transition-colors"
                            title="Copiar protocolo"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Tag SOS */}
                        {isSOS && (
                          <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 animate-pulse">
                            <Flame className="w-3 h-3" /> SOS Prioritário
                          </span>
                        )}

                        {/* Status do Caso */}
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5 ${
                          caso.status === 'Resolvido'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : caso.status === 'Acolhido'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            caso.status === 'Resolvido' ? 'bg-emerald-400' : caso.status === 'Acolhido' ? 'bg-blue-400' : 'bg-amber-400'
                          }`}></span>
                          {caso.status || 'Em Análise'}
                        </span>

                        {/* Selo Semáforo de Urgência Pedagógica */}
                        {(() => {
                          const semaforo = getSemaforoInfo(caso);
                          const isVermelho = semaforo.nivel === 'vermelho';
                          const isAmarelo = semaforo.nivel === 'amarelo';
                          return (
                            <span 
                              className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border flex items-center gap-1.5 ${
                                isVermelho
                                  ? 'bg-red-500/20 text-red-300 border-red-500/40 shadow-sm shadow-red-500/20'
                                  : isAmarelo
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              }`}
                              title={semaforo.descricao}
                            >
                              <span className={`w-2 h-2 rounded-full ${
                                isVermelho ? 'bg-red-400 shadow-[0_0_6px_#EF4444] animate-pulse' :
                                isAmarelo ? 'bg-amber-400 shadow-[0_0_6px_#F59E0B]' :
                                'bg-emerald-400 shadow-[0_0_6px_#10B981]'
                              }`} />
                              <span>{semaforo.label}</span>
                            </span>
                          );
                        })()}

                        {/* Tipo de Violência */}
                        <span className="px-2.5 py-1 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                          {caso.tipo_violencia}
                        </span>

                        {/* Etapa Restaurativa Atual */}
                        {caso.etapa_mediacao && (
                          <span className="px-2.5 py-1 rounded-xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold flex items-center gap-1">
                            <Compass className="w-3 h-3 text-indigo-400" />
                            {caso.etapa_mediacao.replace('_', ' ')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap self-start sm:self-center">
                        {/* Botão de Imprimir Denúncia (Ofício CT / SEDUC) */}
                        <button
                          type="button"
                          onClick={() => {
                            playSfx('click');
                            setDocForPrint(caso);
                          }}
                          className="px-3 py-2.5 rounded-2xl bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-indigo-500/40 shadow-sm transition-all cursor-pointer"
                          title="Imprimir Ofício para Conselho Tutelar ou Conselho Escolar / SEDUC"
                        >
                          <Printer className="w-4 h-4 text-indigo-300" />
                          <span className="hidden md:inline">Imprimir Denúncia</span>
                        </button>

                        {/* Botão de Envio por E-mail */}
                        <button
                          type="button"
                          onClick={() => {
                            playSfx('click');
                            setCaseForEmail(caso);
                          }}
                          className="px-3 py-2.5 rounded-2xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-purple-500/40 shadow-sm transition-all cursor-pointer"
                          title="Enviar denúncia por e-mail para Conselho Tutelar / Escola"
                        >
                          <Mail className="w-4 h-4 text-purple-300" />
                          <span className="hidden md:inline">Enviar p/ E-mail</span>
                        </button>

                        {/* Botão de Destaque: Mediar Caso */}
                        <button
                          onClick={() => {
                            playSfx('click');
                            setSelectedCase(caso);
                          }}
                          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 cursor-pointer"
                        >
                          <HeartHandshake className="w-4 h-4 text-pink-300" />
                          <span>Abrir Prontuário & Mediação</span>
                          {acoesCount > 0 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-black/40 text-[10px] font-mono">
                              {acoesCount}
                            </span>
                          )}
                        </button>
                      </div>

                    </div>

                    {/* Descrição do relato do estudante */}
                    <div className="bg-black/50 p-4 rounded-2xl border border-white/5 space-y-2.5">
                      <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed">
                        "{caso.descricao}"
                      </p>

                      {ultimaAcao && (
                        <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-indigo-300">
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">
                            <strong>Última ação pedagógica:</strong> {ultimaAcao.categoria} — {ultimaAcao.acao}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Rodapé do Card: Local, Turma, Anexos e Timestamp */}
                    <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 pt-1">
                      
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                          {caso.local_escola} {caso.turno ? `• Turno ${caso.turno}` : ''}
                        </span>

                        {caso.turma_envolvida && (
                          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                            Turma: {caso.turma_envolvida}
                          </span>
                        )}

                        {caso.provas_anexas && caso.provas_anexas.length > 0 && (
                          <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
                            <Paperclip className="w-3.5 h-3.5" />
                            {caso.provas_anexas.length} anexo(s) de prova
                          </span>
                        )}

                        <span className="flex items-center gap-1 text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-slate-500" />
                          {new Date(caso.data_envio).toLocaleDateString('pt-BR')} às {new Date(caso.data_envio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {acoesCount > 0 ? (
                          <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1.5">
                            <CheckSquare className="w-3.5 h-3.5" /> {acoesCount} providência(s) registrada(s)
                          </span>
                        ) : (
                          <span className="text-amber-400 text-[11px] font-semibold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> Aguardando 1º acolhimento
                          </span>
                        )}
                      </div>

                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: ALERTAS GPS SOS (RASTREAMENTO DE EMERGÊNCIA NO CAMPUS)              */}
      {/* ========================================================================= */}
      {activeTab === 'sos' && (
        <div className="space-y-4">
          
          <div className="p-4 rounded-3xl bg-gradient-to-r from-red-950/50 via-[#0b1020] to-rose-950/50 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                Monitoramento de Socorro Imediato por GPS
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Registros emitidos pelos botões de pânico dos estudantes dentro do campus da EEMTI Alfredo Machado.
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-red-300 bg-black/50 px-3 py-1.5 rounded-xl border border-red-500/30 self-start sm:self-center">
              {sosAlertasUrgentes.length} alerta(s) urgente(s)
            </span>
          </div>

          <div className="space-y-3.5">
            {sosAlerts.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#0b1020]/90 border border-white/10 text-center text-xs text-slate-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto opacity-75" />
                <p className="text-white font-bold text-sm">Nenhum alerta de socorro GPS registrado</p>
                <p>O ambiente escolar encontra-se monitorado e em tranquilidade.</p>
              </div>
            ) : (
              sosAlerts.map((sos) => (
                <div
                  key={sos.id}
                  className={`p-5 rounded-3xl border space-y-4 transition-all ${
                    sos.status === 'URGENTE'
                      ? 'bg-gradient-to-r from-red-950/40 via-[#0e1224] to-red-950/30 border-red-500 shadow-xl shadow-red-950/40'
                      : 'bg-[#0b1020]/90 border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                        sos.status === 'URGENTE' 
                          ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-600/40' 
                          : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        <Radio className="w-3 h-3" />
                        {sos.status === 'URGENTE' ? 'SOCORRO EM ANDAMENTO' : 'ATENDIDO'}
                      </span>
                      <span className="font-bold text-white text-xs">
                        Disparado em: {new Date(sos.data_disparo).toLocaleString('pt-BR')}
                      </span>
                    </div>

                    {sos.status === 'URGENTE' ? (
                      <button
                        onClick={() => setSelectedSOS(sos)}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-600/30 hover:scale-105 transition-transform"
                      >
                        <Check className="w-4 h-4" /> Registrar Atendimento SOS
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Ocorrência Atendida
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 bg-black/50 p-4 rounded-2xl border border-white/5">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">Coordenadas GPS:</span>
                      <span className="font-mono text-white font-semibold">
                        {sos.latitude && sos.longitude ? `${sos.latitude.toFixed(5)}, ${sos.longitude.toFixed(5)}` : 'Aproximado / Wi-Fi'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">Raio de Precisão:</span>
                      <span className="text-slate-200">{sos.precisao_metros ? `~${Math.round(sos.precisao_metros)} metros` : 'Não informada'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold mb-0.5">Local / Aparelho:</span>
                      <span className="truncate block text-white font-medium">{sos.local_aproximado || sos.dispositivo_info}</span>
                    </div>
                  </div>

                  {sos.status === 'ATENDIDO' && (
                    <div className="text-xs text-emerald-300 bg-emerald-950/30 p-3.5 rounded-2xl border border-emerald-500/30 space-y-1">
                      <div>
                        <strong>Atendido por:</strong> {sos.atendido_por} em {sos.atendido_em ? new Date(sos.atendido_em).toLocaleString('pt-BR') : ''}
                      </div>
                      {sos.notas_atendimento && (
                        <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
                          {sos.notas_atendimento}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 3: DIAGNÓSTICO & INDICADORES ESCOLARES                                */}
      {/* ========================================================================= */}
      {activeTab === 'estatisticas' && (
        <EstatisticasGestao denuncias={denuncias} />
      )}

      {/* MODAL DE MEDIAÇÃO PROFUNDA */}
      {selectedCase && (
        <ModalMediacao
          caso={selectedCase}
          onClose={() => setSelectedCase(null)}
          onUpdate={() => {
            loadDashboardData();
          }}
          showToast={showToast}
        />
      )}

      {/* MODAL DE ATENDIMENTO SOS GPS */}
      {selectedSOS && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#090e1c] border-2 border-red-500 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                <h3 className="font-bold text-white text-base">Registrar Atendimento SOS</h3>
              </div>
              <button onClick={() => setSelectedSOS(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResolveSOSAlert} className="space-y-3.5 text-xs">
              <p className="text-slate-300">
                Alerta disparado em <strong>{new Date(selectedSOS.data_disparo).toLocaleString('pt-BR')}</strong>.
              </p>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Nome do(a) Educador(a) / Atendente:</label>
                <input
                  type="text"
                  value={sosAtendenteNome}
                  onChange={(e) => setSosAtendenteNome(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">Providência Adotada no Local:</label>
                <textarea
                  value={sosNotas}
                  onChange={(e) => setSosNotas(e.target.value)}
                  placeholder="Ex: Comparecimento imediato da equipe pedagógica ao local, acolhimento do estudante e garantia da integridade física e emocional."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-red-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSOS(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black cursor-pointer shadow-lg"
                >
                  Salvar Atendimento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1: ENVIAR DENÚNCIA INDIVIDUAL POR E-MAIL */}
      {caseForEmail && (
        <ModalEnvioEmail
          denuncia={caseForEmail}
          onClose={() => setCaseForEmail(null)}
          onSuccess={(msg) => {
            showToast(msg);
            loadDashboardData();
          }}
        />
      )}

      {/* MODAL 2: IMPRIMIR DENÚNCIA (OFÍCIO CT / CONSELHO ESCOLAR) */}
      {docForPrint && (
        <DocumentoOficialModal
          denuncia={docForPrint}
          onClose={() => setDocForPrint(null)}
        />
      )}

      {/* MODAL 3: ENVIAR RELATÓRIO MENSAL CONSOLIDADO POR E-MAIL */}
      {showMonthlyReportModal && (
        <ModalRelatorioMensal
          onClose={() => setShowMonthlyReportModal(false)}
          onSuccess={(msg) => {
            showToast(msg);
            loadDashboardData();
          }}
        />
      )}

    </div>
  );
};
