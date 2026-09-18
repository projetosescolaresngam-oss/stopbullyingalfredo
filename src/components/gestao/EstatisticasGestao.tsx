import React, { useState, useMemo } from 'react';
import { Denuncia } from '../../types';
import { 
  BarChart2, 
  PieChart, 
  Printer, 
  TrendingUp, 
  CheckSquare, 
  Clock, 
  MapPin, 
  Sparkles, 
  Filter, 
  Calendar, 
  Users, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  HeartHandshake, 
  BrainCircuit, 
  School, 
  RefreshCw, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Info,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { playBreathTone } from '../../services/audioSynthesizer';
import { printElementById } from '../../services/printService';
import { CASOS_DIAGNOSTICO_EEMTI, METADADOS_PESQUISA_EEMTI } from '../../data/diagnosticoEEMTI';
import { GraficoDonut, DonutSegment } from './estatisticas/GraficoDonut';
import { GraficoLinhaTempo } from './estatisticas/GraficoLinhaTempo';
import { MapaAmbientes } from './estatisticas/MapaAmbientes';
import { FunilRestaurativo } from './estatisticas/FunilRestaurativo';
import { RecomendacoesGestao } from './estatisticas/RecomendacoesGestao';
import { getSemaforoInfo } from '../../utils/semaforoUtils';

interface EstatisticasGestaoProps {
  denuncias: Denuncia[];
}

export type SubTabEstatisticas = 
  | 'panorama' 
  | 'ambientes' 
  | 'temporal' 
  | 'envolvidos' 
  | 'restaurativo' 
  | 'recomendacoes';

export const EstatisticasGestao: React.FC<EstatisticasGestaoProps> = ({ denuncias: denunciasProp }) => {
  // Se não houver denúncias reais no sistema ainda, inicializa com o diagnóstico científico para não ficar vazio
  const [fonteDados, setFonteDados] = useState<'real' | 'diagnostico' | 'consolidado'>(
    denunciasProp.length > 0 ? 'real' : 'diagnostico'
  );

  // Sub-abas analíticas
  const [activeSubTab, setActiveSubTab] = useState<SubTabEstatisticas>('panorama');

  // Filtros dinâmicos
  const [filtroPeriodo, setFiltroPeriodo] = useState<'todos' | '30d' | '90d' | 'ano'>('todos');
  const [filtroGravidade, setFiltroGravidade] = useState<'todos' | 'critico' | 'moderado' | 'leve'>('todos');
  const [filtroTurno, setFiltroTurno] = useState<string>('todos');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  const playSfx = () => {
    try {
      playBreathTone(750, 25, true);
    } catch {}
  };

  // Base bruta de acordo com o seletor de fonte
  const baseBruta = useMemo(() => {
    if (fonteDados === 'real') {
      return denunciasProp;
    }
    if (fonteDados === 'diagnostico') {
      return CASOS_DIAGNOSTICO_EEMTI;
    }
    // Consolidado: une reais com os de diagnóstico (sem duplicar IDs)
    const setIds = new Set(denunciasProp.map(d => d.id));
    const unicosDiagnostico = CASOS_DIAGNOSTICO_EEMTI.filter(d => !setIds.has(d.id));
    return [...denunciasProp, ...unicosDiagnostico];
  }, [fonteDados, denunciasProp]);

  // Aplicação dos filtros dinâmicos
  const dadosFiltrados = useMemo(() => {
    const agora = new Date();

    return baseBruta.filter(d => {
      // Filtro de Período
      if (filtroPeriodo !== 'todos' && d.data_envio) {
        try {
          const dataCaso = new Date(d.data_envio);
          const diffDias = (agora.getTime() - dataCaso.getTime()) / (1000 * 3600 * 24);
          if (filtroPeriodo === '30d' && diffDias > 30) return false;
          if (filtroPeriodo === '90d' && diffDias > 90) return false;
          if (filtroPeriodo === 'ano' && dataCaso.getFullYear() !== agora.getFullYear()) return false;
        } catch {}
      }

      // Filtro de Gravidade / Semáforo
      if (filtroGravidade !== 'todos') {
        const semaforo = getSemaforoInfo(d);
        if (filtroGravidade === 'critico' && semaforo.nivel !== 'vermelho') return false;
        if (filtroGravidade === 'moderado' && semaforo.nivel !== 'amarelo') return false;
        if (filtroGravidade === 'leve' && semaforo.nivel !== 'verde') return false;
      }

      // Filtro de Turno
      if (filtroTurno !== 'todos' && d.turno) {
        if (!d.turno.toLowerCase().includes(filtroTurno.toLowerCase())) return false;
      }

      // Filtro de Status
      if (filtroStatus !== 'todos') {
        if (d.status !== filtroStatus) return false;
      }

      return true;
    });
  }, [baseBruta, filtroPeriodo, filtroGravidade, filtroTurno, filtroStatus]);

  // Cálculos consolidados dos KPIs
  const totalCasos = dadosFiltrados.length;
  const casosResolvidos = dadosFiltrados.filter(d => d.status === 'Resolvido').length;
  const percentResolvidos = totalCasos > 0 ? Math.round((casosResolvidos / totalCasos) * 100) : 0;

  const totalMediacoes = dadosFiltrados.reduce((acc, curr) => acc + (curr.acoes_mediacao?.length || 0), 0);

  // Rompimento da cultura do silêncio (denúncias por testemunhas, amigos, professores, famílias)
  const denunciasTestemunhas = dadosFiltrados.filter(d => 
    d.papel_denunciante && d.papel_denunciante !== 'Vítima'
  ).length;
  const percentTestemunhas = totalCasos > 0 ? Math.round((denunciasTestemunhas / totalCasos) * 100) : 0;

  // Casos de risco crítico / SOS
  const casosCriticos = dadosFiltrados.filter(d => 
    d.is_sos || d.nivel_escalada === 'Crítica' || d.nivel_gravidade === 'Grave'
  ).length;
  const percentCriticos = totalCasos > 0 ? Math.round((casosCriticos / totalCasos) * 100) : 0;

  // Contagem por Tipo de Violência
  const tiposContagem: Record<string, number> = {};
  dadosFiltrados.forEach(d => {
    const t = d.tipo_violencia || 'Outros';
    tiposContagem[t] = (tiposContagem[t] || 0) + 1;
  });

  // Dados para o Donut de Tipologias
  const donutTipos: DonutSegment[] = [
    { id: 'verbal', label: 'Verbal', value: tiposContagem['Verbal'] || 0, color: '#A855F7' },
    { id: 'psicologica', label: 'Psicológica', value: tiposContagem['Psicológica'] || 0, color: '#6366F1' },
    { id: 'cyber', label: 'Cyberbullying', value: tiposContagem['Cyberbullying'] || 0, color: '#EC4899' },
    { id: 'fisica', label: 'Física', value: tiposContagem['Física'] || 0, color: '#EF4444' },
    { id: 'social', label: 'Social', value: tiposContagem['Social'] || 0, color: '#14B8A6' }
  ].filter(s => s.value > 0);

  // Contagem por Origem do Relato
  const papelContagem: Record<string, number> = {};
  dadosFiltrados.forEach(d => {
    const p = d.papel_denunciante || 'Vítima';
    papelContagem[p] = (papelContagem[p] || 0) + 1;
  });

  const donutOrigem: DonutSegment[] = [
    { id: 'vitima', label: 'Vítima Direta', value: papelContagem['Vítima'] || 0, color: '#8B5CF6' },
    { id: 'amigo', label: 'Amigo/Colega', value: papelContagem['Amigo/Colega'] || 0, color: '#3B82F6' },
    { id: 'testemunha', label: 'Testemunha Ativa', value: papelContagem['Testemunha'] || 0, color: '#10B981' },
    { id: 'professor', label: 'Educador/Funcionário', value: papelContagem['Professor/Funcionário'] || 0, color: '#F59E0B' },
    { id: 'familia', label: 'Família/Responsável', value: papelContagem['Família'] || 0, color: '#F43F5E' }
  ].filter(s => s.value > 0);

  // Contagem por Matriz Semáforo
  let redCount = 0;
  let yellowCount = 0;
  let greenCount = 0;
  dadosFiltrados.forEach(d => {
    const sem = getSemaforoInfo(d);
    if (sem.nivel === 'vermelho') redCount++;
    else if (sem.nivel === 'amarelo') yellowCount++;
    else greenCount++;
  });

  const donutSemaforo: DonutSegment[] = [
    { id: 'vermelho', label: 'Crítico (Vermelho)', value: redCount, color: '#EF4444' },
    { id: 'amarelo', label: 'Moderado (Amarelo)', value: yellowCount, color: '#F59E0B' },
    { id: 'verde', label: 'Monitoramento (Verde)', value: greenCount, color: '#10B981' }
  ].filter(s => s.value > 0);

  // Contagem por Turma / Série
  const turmasContagem: Record<string, number> = {};
  dadosFiltrados.forEach(d => {
    const tur = d.turma_envolvida || 'Não especificada';
    turmasContagem[tur] = (turmasContagem[tur] || 0) + 1;
  });

  // Contagem por Espaço / Ambiente Escolar
  const locaisContagem: Record<string, number> = {};
  dadosFiltrados.forEach(d => {
    const loc = d.local_escola || 'Outros';
    locaisContagem[loc] = (locaisContagem[loc] || 0) + 1;
  });

  const origemLabel = 
    fonteDados === 'real'
      ? 'Base Ativa (Tempo Real)'
      : fonteDados === 'diagnostico'
      ? 'Diagnóstico Científico EEMTI'
      : 'Consolidado Integrado';

  const handlePrint = () => {
    playSfx();
    printElementById('printable-relatorio-estatisticas', 'Relatorio_Executivo_Estatistico_EEMTI_Alfredo_Machado');
  };

  const handleResetFilters = () => {
    playSfx();
    setFiltroPeriodo('todos');
    setFiltroGravidade('todos');
    setFiltroTurno('todos');
    setFiltroStatus('todos');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* ========================================================================= */}
      {/* 1. CABEÇALHO OFICIAL DO DIAGNÓSTICO ESCOLAR                               */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#0b1021] to-indigo-950/60 border border-purple-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider border border-purple-500/30">
              <BarChart2 className="w-3.5 h-3.5" />
              Observatório de Convivência & Clima Escolar
            </span>
            <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
              CREDE 12 • SEDUC-CE
            </span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
            Métricas e Indicadores da EEMTI Alfredo Machado
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Painel diagnóstico para governança escolar, fundamentação de círculos de diálogo e subsidiação de relatórios institucionais para o Conselho Tutelar e a CREDE.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center flex-shrink-0">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border border-white/15 shadow-sm"
            title="Imprimir relatório analítico em formato A4"
          >
            <Printer className="w-4 h-4 text-emerald-400" />
            <span>Imprimir Relatório Executivo</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. BARRA DE SELEÇÃO DA BASE DE DADOS & FILTROS MULTIDIMENSIONAIS          */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#090e1c] border border-white/10 space-y-4">
        
        {/* Linha Superior: Seletor de Base de Dados */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              Origem dos Dados Analisados:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/10 text-xs">
            <button
              onClick={() => {
                playSfx();
                setFonteDados('real');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                fonteDados === 'real'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Base Ativa ({denunciasProp.length} em tempo real)
            </button>

            <button
              onClick={() => {
                playSfx();
                setFonteDados('diagnostico');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                fonteDados === 'diagnostico'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pesquisa EEMTI (n={METADADOS_PESQUISA_EEMTI.amostraTotal} científica)
            </button>

            <button
              onClick={() => {
                playSfx();
                setFonteDados('consolidado');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                fonteDados === 'consolidado'
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Base Consolidada Total
            </button>
          </div>
        </div>

        {/* Linha Inferior: Controles de Filtros */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
              Filtrar por:
            </span>

            {/* Período */}
            <select
              value={filtroPeriodo}
              onChange={(e) => {
                playSfx();
                setFiltroPeriodo(e.target.value as any);
              }}
              className="bg-black/50 border border-white/15 text-gray-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="todos">Todo o Período</option>
              <option value="30d">Últimos 30 Dias</option>
              <option value="90d">Último Trimestre</option>
              <option value="ano">Ano Letivo 2026</option>
            </select>

            {/* Gravidade */}
            <select
              value={filtroGravidade}
              onChange={(e) => {
                playSfx();
                setFiltroGravidade(e.target.value as any);
              }}
              className="bg-black/50 border border-white/15 text-gray-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="todos">Todas as Gravidades</option>
              <option value="critico">🔴 Crítico / SOS</option>
              <option value="moderado">🟡 Moderado / Recorrente</option>
              <option value="leve">🟢 Monitoramento / Leve</option>
            </select>

            {/* Status */}
            <select
              value={filtroStatus}
              onChange={(e) => {
                playSfx();
                setFiltroStatus(e.target.value);
              }}
              className="bg-black/50 border border-white/15 text-gray-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="todos">Todos os Status</option>
              <option value="Resolvido">Pacificados / Resolvidos</option>
              <option value="Acolhido">Em Mediação / Acolhidos</option>
              <option value="Em Análise">Em Triagem Inicial</option>
            </select>

            {/* Turno */}
            <select
              value={filtroTurno}
              onChange={(e) => {
                playSfx();
                setFiltroTurno(e.target.value);
              }}
              className="bg-black/50 border border-white/15 text-gray-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="todos">Todos os Turnos</option>
              <option value="Integral">Tempo Integral</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
            </select>
          </div>

          {/* Resetar Filtros */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 font-mono">
              {totalCasos} caso{totalCasos !== 1 ? 's' : ''} filtrado{totalCasos !== 1 ? 's' : ''}
            </span>
            {(filtroPeriodo !== 'todos' || filtroGravidade !== 'todos' || filtroStatus !== 'todos' || filtroTurno !== 'todos') && (
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-purple-400 hover:text-purple-300 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Limpar Filtros
              </button>
            )}
          </div>
        </div>

        {/* Banner Informativo se estiver na Pesquisa Diagnóstica */}
        {fonteDados === 'diagnostico' && (
          <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              Exibindo dados consolidados da <strong>Pesquisa Diagnóstica de Clima Escolar e Bullying da EEMTI Alfredo Machado</strong> (n={METADADOS_PESQUISA_EEMTI.amostraTotal}, Madalena/CE). Esse estudo fundamenta as ações pedagógicas e a participação do projeto na Feira Ceará Científico 2026. Conforme novas denúncias forem acolhidas, você pode alternar livremente para a <em>Base Ativa</em>.
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. GRID DE KPIS ESTRATÉGICOS COM BARRAS DE PROVIMENTOS                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Taxa de Pacificação */}
        <div className="p-5 rounded-3xl bg-[#090e1c] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Taxa de Pacificação
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
              {percentResolvidos}%
            </span>
            <span className="text-xs text-gray-400 font-mono">({casosResolvidos}/{totalCasos})</span>
          </div>

          <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
              style={{ width: `${percentResolvidos}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Ocorrências conduzidas a acordo pacífico sem reincidência posterior.
          </p>
        </div>

        {/* KPI 2: Quebra do Silêncio (Protetores Ativos) */}
        <div className="p-5 rounded-3xl bg-[#090e1c] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Quebra do Silêncio
            </span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-indigo-400 font-mono">
              {percentTestemunhas}%
            </span>
            <span className="text-xs text-gray-400 font-mono">testemunhas ativas</span>
          </div>

          <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transition-all duration-700"
              style={{ width: `${percentTestemunhas}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Relatos feitos por colegas e terceiros, rompendo a cumplicidade do silêncio.
          </p>
        </div>

        {/* KPI 3: Providências Restaurativas */}
        <div className="p-5 rounded-3xl bg-[#090e1c] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Ações Restaurativas
            </span>
            <CheckSquare className="w-4 h-4 text-purple-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">
              {totalMediacoes}
            </span>
            <span className="text-xs text-gray-400 font-mono">intervenções</span>
          </div>

          <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, totalMediacoes * 5)}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Círculos de diálogo, escutas acolhedoras e mediações com responsáveis.
          </p>
        </div>

        {/* KPI 4: SLA de Acolhimento & Resposta */}
        <div className="p-5 rounded-3xl bg-[#090e1c] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Primeiro Acolhimento
            </span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono">
              &lt; 24h
            </span>
            <span className="text-xs text-gray-400 font-mono">meta institucional</span>
          </div>

          <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
              style={{ width: '92%' }}
            />
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Tempo médio para o estudante receber o primeiro retorno confidencial no chat.
          </p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. BARRA DE NAVEGAÇÃO DE SUB-ABAS ANALÍTICAS                               */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/60 border border-white/10 overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            playSfx();
            setActiveSubTab('panorama');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'panorama'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>Tipologias & Semáforo</span>
        </button>

        <button
          onClick={() => {
            playSfx();
            setActiveSubTab('ambientes');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'ambientes'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Zonas & Ambientes Críticos</span>
        </button>

        <button
          onClick={() => {
            playSfx();
            setActiveSubTab('temporal');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'temporal'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Evolução Temporal & Picos</span>
        </button>

        <button
          onClick={() => {
            playSfx();
            setActiveSubTab('envolvidos');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'envolvidos'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Origem do Relato & Séries</span>
        </button>

        <button
          onClick={() => {
            playSfx();
            setActiveSubTab('restaurativo');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'restaurativo'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Funil Restaurativo & Impactos</span>
        </button>

        <button
          onClick={() => {
            playSfx();
            setActiveSubTab('recomendacoes');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'recomendacoes'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Recomendações Gestoras</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 5. CONTEÚDO DINÂMICO DAS SUB-ABAS                                         */}
      {/* ========================================================================= */}

      {/* SUB-ABA 1: TIPOLOGIAS & SEMÁFORO */}
      {activeSubTab === 'panorama' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GraficoDonut
              titulo="Distribuição por Natureza da Violência"
              subtitulo="Classificação das ocorrências segundo a Lei Federal nº 13.185/2015."
              dados={donutTipos}
              totalLabel="Relatos"
            />

            <GraficoDonut
              titulo="Matriz Semáforo de Risco da EEMTI"
              subtitulo="Classificação de gravidade e nível de escalada para priorização de acolhimento."
              dados={donutSemaforo}
              totalLabel="Casos"
            />
          </div>

          {/* Gráfico Detalhado de Barras de Tipologias com Subtipos */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-4">
            <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-400" />
              Detalhamento de Incidência por Tipologia e Subtipos
            </h3>

            <div className="space-y-3.5">
              {Object.entries(tiposContagem).sort((a, b) => b[1] - a[1]).map(([tipo, qtd]) => {
                const pct = totalCasos > 0 ? Math.round((qtd / totalCasos) * 100) : 0;
                
                let gradiente = 'from-purple-500 to-indigo-500';
                let subtipos = 'Apelidos pejorativos, ofensas e xingamentos reiterados.';
                if (tipo === 'Cyberbullying') {
                  gradiente = 'from-pink-500 to-rose-500';
                  subtipos = 'Figurinhas ofensivas, difamação em redes sociais e vazamento de prints.';
                } else if (tipo === 'Física') {
                  gradiente = 'from-red-600 to-rose-500';
                  subtipos = 'Empurrões, rasteiras, agressões corporais e danos intencionais a materiais.';
                } else if (tipo === 'Psicológica') {
                  gradiente = 'from-indigo-500 to-blue-500';
                  subtipos = 'Ameaças veladas, chantagens, intimidação silenciosa e perseguição.';
                } else if (tipo === 'Social') {
                  gradiente = 'from-teal-500 to-emerald-500';
                  subtipos = 'Isolamento deliberado, boicote a mesas de almoço e exclusão de trabalhos.';
                }

                return (
                  <div key={tipo} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">{tipo}</span>
                        <p className="text-[10px] text-gray-400">{subtipos}</p>
                      </div>
                      <div className="text-right font-mono">
                        <span className="font-bold text-white text-xs">{qtd} caso{qtd !== 1 ? 's' : ''}</span>
                        <span className="text-gray-400 text-[10px] block">({pct}%)</span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${gradiente} rounded-full transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-ABA 2: AMBIENTES & PONTOS CEGOS */}
      {activeSubTab === 'ambientes' && (
        <MapaAmbientes denuncias={dadosFiltrados} />
      )}

      {/* SUB-ABA 3: LINHA DO TEMPO & EVOLUÇÃO */}
      {activeSubTab === 'temporal' && (
        <GraficoLinhaTempo denuncias={dadosFiltrados} />
      )}

      {/* SUB-ABA 4: ENVOLVIDOS & SÉRIES */}
      {activeSubTab === 'envolvidos' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GraficoDonut
              titulo="Quem Registrou o Relato? (Perfil de Origem)"
              subtitulo="Mapeamento da coragem moral e rompimento da cultura do silêncio no campus."
              dados={donutOrigem}
              totalLabel="Relatos"
            />

            {/* Distribuição por Turmas / Séries */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-4">
              <div>
                <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <School className="w-4 h-4 text-indigo-400" />
                  Concentração por Série & Turma
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Identificação das turmas prioritárias para círculos de diálogo socioemocionais.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {Object.entries(turmasContagem).sort((a, b) => b[1] - a[1]).map(([turma, qtd]) => {
                  const pct = totalCasos > 0 ? Math.round((qtd / totalCasos) * 100) : 0;
                  return (
                    <div key={turma} className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-gray-200">{turma}</span>
                        <span className="font-mono text-gray-300 font-bold">{qtd} relato(s) ({pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-black/50 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-ABA 5: FLUXO RESTAURATIVO & IMPACTOS */}
      {activeSubTab === 'restaurativo' && (
        <FunilRestaurativo denuncias={dadosFiltrados} />
      )}

      {/* SUB-ABA 6: RECOMENDAÇÕES PEDAGÓGICAS */}
      {activeSubTab === 'recomendacoes' && (
        <RecomendacoesGestao denuncias={dadosFiltrados} />
      )}

      {/* ========================================================================= */}
      {/* 6. DOCUMENTO OFICIAL PARA IMPRESSÃO A4 (VISÍVEL APENAS NA IMPRESSORA)     */}
      {/* ========================================================================= */}
      <div 
        id="printable-relatorio-estatisticas" 
        className="hidden print:block text-black p-4 space-y-3 bg-white print-a4-target"
      >
        <div className="text-center border-b-2 border-black pb-2 space-y-0.5">
          <p className="text-[9px] uppercase font-bold tracking-wider text-gray-700">
            Governo do Estado do Ceará • Secretaria da Educação (SEDUC-CE)
          </p>
          <h1 className="text-sm font-black uppercase tracking-tight text-black">
            CREDE 12 • E.E.M.T.I. ALFREDO MACHADO – MADALENA / CE
          </h1>
          <h2 className="text-xs font-bold uppercase text-gray-800">
            Relatório Executivo de Diagnóstico &amp; Convivência Escolar
          </h2>
          <p className="text-[9px] text-gray-600 font-mono">
            Base Analisada: {origemLabel} • Emissão: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
          </p>
        </div>

        {/* Quadro Resumo de Indicadores Chave */}
        <div className="grid grid-cols-4 gap-2 text-xs border border-black p-2 bg-gray-50 rounded">
          <div>
            <span className="text-[9px] uppercase text-gray-600 block">Total Ocorrências</span>
            <strong className="text-sm font-black">{totalCasos}</strong>
          </div>
          <div>
            <span className="text-[9px] uppercase text-gray-600 block">Índice Pacificação</span>
            <strong className="text-sm font-black text-emerald-800">{percentResolvidos}% ({casosResolvidos})</strong>
          </div>
          <div>
            <span className="text-[9px] uppercase text-gray-600 block">Quebra do Silêncio</span>
            <strong className="text-sm font-black text-blue-800">{percentTestemunhas}% por terceiros</strong>
          </div>
          <div>
            <span className="text-[9px] uppercase text-gray-600 block">Ações Restaurativas</span>
            <strong className="text-sm font-black text-purple-800">{totalMediacoes} registros</strong>
          </div>
        </div>

        {/* Tabela de Tipologia */}
        <div className="space-y-1 text-xs">
          <h3 className="font-bold text-[10px] uppercase border-b border-gray-400 pb-0.5">
            1. Distribuição por Tipologia de Violência / Conflito:
          </h3>
          <table className="w-full border-collapse border border-gray-400 text-left text-[9px]">
            <thead>
              <tr className="bg-gray-100 font-bold">
                <th className="border border-gray-400 p-1">Tipologia</th>
                <th className="border border-gray-400 p-1 text-center">Casos Registrados</th>
                <th className="border border-gray-400 p-1 text-center">Proporção Relativa</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(tiposContagem).map(([tp, q]) => (
                <tr key={tp}>
                  <td className="border border-gray-400 p-1 font-semibold">{tp}</td>
                  <td className="border border-gray-400 p-1 text-center font-mono">{q}</td>
                  <td className="border border-gray-400 p-1 text-center font-mono font-bold">
                    {totalCasos > 0 ? Math.round((q / totalCasos) * 100) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabela de Ambientes Críticos */}
        <div className="space-y-1 text-xs">
          <h3 className="font-bold text-[10px] uppercase border-b border-gray-400 pb-0.5">
            2. Espaços Escolares com Maior Incidência (Mapa de Risco):
          </h3>
          <div className="grid grid-cols-3 gap-1.5 text-[9px]">
            {Object.entries(locaisContagem)
              .sort(([, a], [, b]) => Number(b) - Number(a))
              .slice(0, 6)
              .map(([local, count], idx) => {
                const countNum = Number(count);
                return (
                  <div key={idx} className="border border-gray-300 p-1 bg-gray-50 rounded">
                    <span className="font-bold block text-gray-800 truncate">{local}</span>
                    <span className="text-gray-600 font-mono">
                      {countNum} caso(s) ({totalCasos > 0 ? Math.round((countNum / totalCasos) * 100) : 0}%)
                    </span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Recomendações e Parecer */}
        <div className="border border-gray-400 p-2 text-[9px] bg-slate-50 space-y-1 rounded">
          <strong className="block text-[9.5px] uppercase text-gray-900">
            3. Diretrizes de Intervenção Pedagógica &amp; Encaminhamentos Institucionais:
          </strong>
          <p className="text-gray-700 leading-snug">
            • Reforçar monitoramento nos locais identificados como prioritários durante intervalos e transições de turno.
          </p>
          <p className="text-gray-700 leading-snug">
            • Intensificar oficinas de empatia e círculos restaurativos com as turmas de maior reincidência.
          </p>
          <p className="text-gray-700 leading-snug">
            • Manter estreita articulação com o Conselho Tutelar de Madalena nos casos classificados como de alta gravidade.
          </p>
        </div>

        {/* Assinaturas Institucionais */}
        <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
          <div className="border-t border-black pt-1">
            <p className="font-bold text-[10px] uppercase text-black">Comissão de Mediação Escolar</p>
            <p className="text-[9px] text-gray-600">E.E.M.T.I. Alfredo Machado</p>
          </div>
          <div className="border-t border-black pt-1">
            <p className="font-bold text-[10px] uppercase text-black">Núcleo Gestor / Direção</p>
            <p className="text-[9px] text-gray-600">CREDE 12 • SEDUC-CE</p>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-1 flex items-center justify-between text-[7.5px] text-gray-500 font-mono">
          <span>🛡️ Observatório de Clima Escolar • EEMTI Alfredo Machado</span>
          <span>Madalena – CE</span>
          <span>Documento com valor diagnóstico e pedagógico</span>
        </div>
      </div>

    </div>
  );
};
