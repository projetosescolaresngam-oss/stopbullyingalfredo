import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Clock, 
  Compass, 
  Calendar, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Radio, 
  Heart, 
  GraduationCap, 
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { getSiteAnalyticsSummary, SiteAnalyticsSummary } from '../../../services/analyticsService';
import { playBreathTone } from '../../../services/audioSynthesizer';

const AREA_LABELS: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  home: { label: 'Início / Portal Principal', icon: <Compass className="w-3.5 h-3.5" />, color: 'bg-purple-500' },
  denuncia: { label: 'Canal de Denúncia Anônima', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-red-500' },
  protocolo: { label: 'Consulta & Chat de Protocolo', icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'bg-indigo-500' },
  sos: { label: 'Botão de Emergência SOS GPS', icon: <Radio className="w-3.5 h-3.5" />, color: 'bg-rose-600' },
  apoio: { label: 'Apoio Emocional & Respiração 4-7-8', icon: <Heart className="w-3.5 h-3.5" />, color: 'bg-pink-500' },
  triagem: { label: 'Triagem de Risco & Clima Escolar', icon: <Activity className="w-3.5 h-3.5" />, color: 'bg-amber-500' },
  quiz: { label: 'Quiz Educativo Interativo', icon: <HelpCircle className="w-3.5 h-3.5" />, color: 'bg-teal-500' },
  guia: { label: 'Guia do Respeito & Empatia', icon: <GraduationCap className="w-3.5 h-3.5" />, color: 'bg-emerald-500' },
  gestao: { label: 'Painel de Gestão Escolar', icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'bg-blue-600' },
  conquistas: { label: 'Conquistas & Gamificação', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'bg-yellow-500' },
  galeria: { label: 'Galeria do Projeto & Ceará Científico', icon: <Compass className="w-3.5 h-3.5" />, color: 'bg-cyan-500' },
  ceara: { label: 'Ceará Científico 2026', icon: <Compass className="w-3.5 h-3.5" />, color: 'bg-orange-500' },
  educativo: { label: 'Matriz Pedagógica & Leis', icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-blue-400' }
};

export const MetricasAcessosSite: React.FC = () => {
  const [summary, setSummary] = useState<SiteAnalyticsSummary>(() => getSiteAnalyticsSummary());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    try {
      playBreathTone(700, 20, true);
    } catch {}
    setIsRefreshing(true);
    setTimeout(() => {
      setSummary(getSiteAnalyticsSummary());
      setIsRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    setSummary(getSiteAnalyticsSummary());
  }, []);

  const totalViews = Math.max(summary.totalPageViews, 1);
  const areasSorted = Object.entries(summary.viewsByArea).sort((a, b) => b[1] - a[1]);
  const maxDailyViews = Math.max(...summary.dailyHistory.map(d => d.views), 1);

  return (
    <div className="space-y-6">
      
      {/* Banner de Destaque com Métricas de Audiência */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0d1326] via-[#101b38] to-[#0d1326] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[10px] font-black uppercase tracking-wider mb-2">
              <Users className="w-3 h-3 text-cyan-400" />
              Telemetria & Audiência da Plataforma
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              Quantas Pessoas Acessaram o Site
            </h3>
            <p className="text-xs text-slate-300 max-w-xl mt-1 leading-relaxed">
              Métricas consolidadas de visitantes únicos, engajamento e visualizações de tela em tempo real no StopBullying – EEMTI Alfredo Machado.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            className="self-start sm:self-center px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-2 border border-white/15 transition-all cursor-pointer shadow-sm"
            title="Atualizar estatísticas de acesso agora"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Atualizar Dados</span>
          </button>
        </div>

        {/* 4 Cards de Números Chave */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          
          {/* Card 1: Visitantes Únicos */}
          <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20 shadow-inner space-y-1">
            <div className="flex items-center justify-between text-cyan-300 text-xs font-bold">
              <span className="uppercase tracking-wider text-[10px]">Pessoas / Visitantes</span>
              <div className="w-7 h-7 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-cyan-300" />
              </div>
            </div>
            <div className="text-3xl font-black text-white font-mono">
              {summary.uniqueVisitors.toLocaleString('pt-BR')}
            </div>
            <div className="text-[10px] text-cyan-300/80 font-medium">
              Dispositivos / Usuários únicos
            </div>
          </div>

          {/* Card 2: Total de Visualizações */}
          <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 shadow-inner space-y-1">
            <div className="flex items-center justify-between text-purple-300 text-xs font-bold">
              <span className="uppercase tracking-wider text-[10px]">Acessos / Telas Vistas</span>
              <div className="w-7 h-7 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Eye className="w-4 h-4 text-purple-300" />
              </div>
            </div>
            <div className="text-3xl font-black text-white font-mono">
              {summary.totalPageViews.toLocaleString('pt-BR')}
            </div>
            <div className="text-[10px] text-purple-300/80 font-medium">
              Pageviews acumulados
            </div>
          </div>

          {/* Card 3: Acessos Hoje */}
          <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 shadow-inner space-y-1">
            <div className="flex items-center justify-between text-emerald-300 text-xs font-bold">
              <span className="uppercase tracking-wider text-[10px]">Acessos Hoje</span>
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-300" />
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-300 font-mono">
              {summary.todayPageViews.toLocaleString('pt-BR')}
            </div>
            <div className="text-[10px] text-emerald-400/80 font-medium">
              {summary.todayVisitors} visitante(s) hoje
            </div>
          </div>

          {/* Card 4: Último Acesso */}
          <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 shadow-inner space-y-1">
            <div className="flex items-center justify-between text-amber-300 text-xs font-bold">
              <span className="uppercase tracking-wider text-[10px]">Última Atividade</span>
              <div className="w-7 h-7 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-300" />
              </div>
            </div>
            <div className="text-lg font-black text-white font-mono truncate">
              {new Date(summary.lastAccessTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-[10px] text-amber-300/80 font-medium">
              {new Date(summary.lastAccessTime).toLocaleDateString('pt-BR')}
            </div>
          </div>

        </div>
      </div>

      {/* 2 Colunas: Histórico Diário (Últimos 7 dias) e Seções Mais Acessadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Histórico dos Últimos 7 Dias */}
        <div className="p-5 rounded-3xl bg-[#090e1c] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">Evolução dos Últimos 7 Dias</h4>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Visualizações / Dia</span>
          </div>

          <div className="space-y-3 pt-2">
            {summary.dailyHistory.map((item, idx) => {
              const dateObj = new Date(item.date + 'T12:00:00');
              const dayLabel = dateObj.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
              const percent = Math.min(100, Math.round((item.views / maxDailyViews) * 100));

              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-mono capitalize">{dayLabel}</span>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-cyan-400 font-bold">{item.views} visualizações</span>
                      <span className="text-slate-500">({item.visitors} pessoas)</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percent, item.views > 0 ? 8 : 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Distribuição por Seção / Área do App */}
        <div className="p-5 rounded-3xl bg-[#090e1c] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-bold text-white">Áreas Mais Visitadas do App</h4>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Participação %</span>
          </div>

          <div className="space-y-3 pt-2">
            {areasSorted.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">Nenhum acesso registrado ainda.</p>
            ) : (
              areasSorted.slice(0, 7).map(([areaKey, count]) => {
                const info = AREA_LABELS[areaKey] || { label: areaKey, icon: <Compass className="w-3.5 h-3.5" />, color: 'bg-indigo-500' };
                const percent = Math.round((count / totalViews) * 100);

                return (
                  <div key={areaKey} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-slate-400">{info.icon}</span>
                        <span className="text-slate-200 font-medium truncate">{info.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] flex-shrink-0 ml-2">
                        <strong className="text-white">{count}</strong>
                        <span className="text-slate-400">({percent}%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${info.color} rounded-full transition-all duration-500`}
                        style={{ width: `${Math.max(percent, 4)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* Nota de Auditoria e Privacidade */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-white">Privacidade e Sigilo Garantidos (LGPD Escolar):</p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            A contagem de visitantes é realizada por identificadores anônimos de sessão e navegador, sem coletar nomes, telefones ou dados pessoais não autorizados. Os acessos ao canal de denúncia e SOS permanecem sob sigilo absoluto.
          </p>
        </div>
      </div>

    </div>
  );
};
