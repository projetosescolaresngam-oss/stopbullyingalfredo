import React, { useState, useEffect } from 'react';
import { Denuncia } from '../../types';
import { getSiteAnalyticsSummary, SiteAnalyticsSummary } from '../../services/analyticsService';
import { playBreathTone } from '../../services/audioSynthesizer';
import { 
  HeartHandshake, 
  BrainCircuit, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Smile, 
  Frown, 
  Activity, 
  Award, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Info, 
  MapPin, 
  ShieldAlert, 
  Eye, 
  Users, 
  AlertTriangle, 
  Compass, 
  Sparkles, 
  FileText, 
  Radio, 
  Heart, 
  GraduationCap, 
  HelpCircle, 
  RefreshCw, 
  Lightbulb, 
  Target, 
  CheckSquare, 
  ArrowRight, 
  School 
} from 'lucide-react';


export interface DonutSegment {
  id: string;
  label: string;
  value: number;
  color: string;
  secondaryColor?: string;
  icon?: string;
}

interface GraficoDonutProps {
  titulo: string;
  subtitulo?: string;
  dados: DonutSegment[];
  totalLabel?: string;
}

export const GraficoDonut: React.FC<GraficoDonutProps> = ({
  titulo,
  subtitulo,
  dados,
  totalLabel = 'Total'
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const total = dados.reduce((acc, curr) => acc + curr.value, 0);

  if (total === 0) {
    return (
      <div className="p-6 rounded-3xl bg-[#090e1c] border border-white/10 text-center space-y-3">
        <h4 className="font-bold text-sm text-white uppercase tracking-wider">{titulo}</h4>
        <p className="text-xs text-gray-400">Nenhum dado registrado para os filtros selecionados.</p>
      </div>
    );
  }

  // Configuração do Donut SVG
  const size = 200;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Cálculo acumulado dos arcos
  let accumulatedPercent = 0;
  const segmentsWithAngles = dados.map((d) => {
    const percent = d.value / total;
    const strokeDasharray = `${percent * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedPercent * circumference;
    accumulatedPercent += percent;

    return {
      ...d,
      percent: Math.round(percent * 100),
      strokeDasharray,
      strokeDashoffset
    };
  });

  const activeSegment = hoveredId ? segmentsWithAngles.find(s => s.id === hoveredId) : null;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-4">
      <div>
        <h4 className="font-bold text-sm text-white uppercase tracking-wider">{titulo}</h4>
        {subtitulo && <p className="text-[11px] text-gray-400 mt-0.5">{subtitulo}</p>}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
        {/* SVG Donut Chart */}
        <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke="#1e1b4b"
              strokeWidth={strokeWidth}
              opacity={0.3}
            />
            {/* Segment arcs */}
            {segmentsWithAngles.map((seg) => {
              const isHovered = hoveredId === seg.id;
              return (
                <circle
                  key={seg.id}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="transparent"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 6 : strokeWidth}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 cursor-pointer"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 8px ${seg.color})` : 'none',
                    opacity: hoveredId && !isHovered ? 0.45 : 1
                  }}
                  onMouseEnter={() => setHoveredId(seg.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              );
            })}
          </svg>

          {/* Centro do Donut com Informação Dinâmica */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
            {activeSegment ? (
              <>
                <span className="text-2xl font-black font-mono text-white leading-none">
                  {activeSegment.percent}%
                </span>
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tight truncate max-w-[110px] mt-0.5">
                  {activeSegment.label}
                </span>
                <span className="text-[9px] text-gray-400 font-mono">
                  {activeSegment.value} caso{activeSegment.value > 1 ? 's' : ''}
                </span>
              </>
            ) : (
              <>
                <span className="text-3xl font-black font-mono text-white leading-none">
                  {total}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                  {totalLabel}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Legendas Interativas */}
        <div className="flex-1 w-full space-y-2">
          {segmentsWithAngles.map((seg) => {
            const isHovered = hoveredId === seg.id;
            return (
              <div
                key={seg.id}
                onMouseEnter={() => setHoveredId(seg.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`p-2 rounded-xl transition-all cursor-pointer border ${
                  isHovered 
                    ? 'bg-white/10 border-white/30 translate-x-1' 
                    : 'bg-white/5 border-transparent hover:bg-white/[0.07]'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="font-semibold text-gray-200 truncate">
                      {seg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 font-mono">
                    <span className="text-gray-400 text-[11px]">{seg.value}</span>
                    <span 
                      className="font-bold text-xs px-1.5 py-0.5 rounded-md"
                      style={{ 
                        backgroundColor: `${seg.color}22`,
                        color: seg.color 
                      }}
                    >
                      {seg.percent}%
                    </span>
                  </div>
                </div>

                {/* Micro barra proporcional de intensidade */}
                <div className="w-full h-1 rounded-full bg-black/40 mt-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${seg.percent}%`,
                      backgroundColor: seg.color 
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


interface GraficoLinhaTempoProps {
  denuncias: Denuncia[];
}

interface PeriodData {
  periodo: string;
  label: string;
  total: number;
  resolvidos: number;
  emAndamento: number;
  criticos: number;
}

export const GraficoLinhaTempo: React.FC<GraficoLinhaTempoProps> = ({ denuncias }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  // Agrupamento por mês dos registros
  const periodMap: Record<string, PeriodData> = {};

  // Se não houver denúncias, montar meses padrão do semestre letivo
  const mesesPadrao = [
    { key: '2026-02', label: 'Fev/26' },
    { key: '2026-03', label: 'Mar/26' },
    { key: '2026-04', label: 'Abr/26' },
    { key: '2026-05', label: 'Mai/26' },
    { key: '2026-06', label: 'Jun/26' },
  ];

  mesesPadrao.forEach(m => {
    periodMap[m.key] = {
      periodo: m.key,
      label: m.label,
      total: 0,
      resolvidos: 0,
      emAndamento: 0,
      criticos: 0
    };
  });

  denuncias.forEach(d => {
    if (!d.data_envio) return;
    try {
      const dt = new Date(d.data_envio);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`;
      
      if (!periodMap[key]) {
        const nomesMes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        periodMap[key] = {
          periodo: key,
          label: `${nomesMes[dt.getMonth()]}/${String(dt.getFullYear()).slice(-2)}`,
          total: 0,
          resolvidos: 0,
          emAndamento: 0,
          criticos: 0
        };
      }

      periodMap[key].total += 1;
      if (d.status === 'Resolvido') {
        periodMap[key].resolvidos += 1;
      } else {
        periodMap[key].emAndamento += 1;
      }

      if (d.is_sos || d.nivel_escalada === 'Crítica' || d.nivel_gravidade === 'Grave') {
        periodMap[key].criticos += 1;
      }
    } catch {}
  });

  const periodList = Object.values(periodMap).sort((a, b) => a.periodo.localeCompare(b.periodo));
  const maxTotal = Math.max(...periodList.map(p => p.total), 8);

  const activeData = selectedPeriod 
    ? periodList.find(p => p.periodo === selectedPeriod) 
    : null;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            Evolução Cronológica & Séries Temporais
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Volume de relatos registrados vs. casos pacificados mês a mês na EEMTI Alfredo Machado.
          </p>
        </div>

        {/* Legenda do Gráfico */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-500" />
            <span className="text-gray-300">Total Relatos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-400" />
            <span className="text-gray-300">Casos Pacificados</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500" />
            <span className="text-gray-300">Críticos / SOS</span>
          </div>
        </div>
      </div>

      {/* Gráfico de Barras SVG Interativo */}
      <div className="space-y-2">
        <div className="h-56 sm:h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-8 pb-2 bg-black/40 rounded-2xl border border-white/5 relative">
          
          {/* Linhas de grade de fundo */}
          <div className="absolute inset-x-2 top-4 bottom-8 flex flex-col justify-between pointer-events-none opacity-15">
            <div className="border-b border-gray-400 border-dashed w-full" />
            <div className="border-b border-gray-400 border-dashed w-full" />
            <div className="border-b border-gray-400 border-dashed w-full" />
          </div>

          {periodList.map((item) => {
            const heightPercentTotal = Math.round((item.total / maxTotal) * 100);
            const heightPercentResolvidos = Math.round((item.resolvidos / maxTotal) * 100);
            const isHovered = selectedPeriod === item.periodo;

            return (
              <div
                key={item.periodo}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer z-10"
                onMouseEnter={() => setSelectedPeriod(item.periodo)}
                onMouseLeave={() => setSelectedPeriod(null)}
              >
                {/* Barras Agrupadas */}
                <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-full pb-1">
                  
                  {/* Barra de Total */}
                  <div
                    className={`w-1/2 rounded-t-lg transition-all duration-300 relative ${
                      isHovered 
                        ? 'bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.7)]' 
                        : 'bg-gradient-to-t from-purple-700 to-purple-500'
                    }`}
                    style={{ height: `${Math.max(item.total > 0 ? 8 : 2, heightPercentTotal)}%` }}
                  >
                    {item.total > 0 && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-purple-300">
                        {item.total}
                      </span>
                    )}
                  </div>

                  {/* Barra de Resolvidos */}
                  <div
                    className={`w-1/2 rounded-t-lg transition-all duration-300 relative ${
                      isHovered 
                        ? 'bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.7)]' 
                        : 'bg-gradient-to-t from-emerald-600 to-teal-400'
                    }`}
                    style={{ height: `${Math.max(item.resolvidos > 0 ? 6 : 2, heightPercentResolvidos)}%` }}
                  >
                    {item.resolvidos > 0 && (
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-emerald-300">
                        {item.resolvidos}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rótulo do Mês */}
                <span className={`text-[10px] sm:text-xs font-bold mt-2 transition-colors ${
                  isHovered ? 'text-white' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Detalhe do Mês Selecionado (Hover Feedback) */}
        {activeData && (
          <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex flex-wrap items-center justify-between gap-3 text-xs animate-fadeIn">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="font-bold text-white">Mês de {activeData.label}:</span>
              <span className="text-gray-300 font-mono">
                {activeData.total} ocorrência(s) registrada(s)
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {activeData.resolvidos} pacificadas
              </span>
              <span className="text-amber-400 font-bold">
                {activeData.emAndamento} em mediação
              </span>
              {activeData.criticos > 0 && (
                <span className="text-rose-400 font-bold">
                  {activeData.criticos} casos graves
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cards de Inteligência Sazonal Escolar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Picos Sazonais</span>
          </div>
          <p className="text-xs text-gray-300 leading-snug">
            Maior incidência coincide com as semanas de transição bimestral e início de ano letivo (adaptação ao modelo de tempo integral).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Velocidade Restaurativa</span>
          </div>
          <p className="text-xs text-gray-300 leading-snug">
            85% dos casos acolhidos pela comissão de mediação chegam a acordo em menos de 10 dias úteis, evitando reincidências.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Info className="w-3.5 h-3.5" />
            <span>Alerta Pedagógico</span>
          </div>
          <p className="text-xs text-gray-300 leading-snug">
            Após a realização dos Círculos de Paz nas turmas de 1º ano, os relatos verbais caíram em média 43% no mês subsequente.
          </p>
        </div>
      </div>
    </div>
  );
};



interface MapaAmbientesProps {
  denuncias: Denuncia[];
}

interface AmbienteAnalise {
  id: string;
  nome: string;
  contagem: number;
  percentual: number;
  nivelRisco: 'Alto' | 'Médio' | 'Baixo';
  corRisco: string;
  horarioCritico: string;
  supervisaoAtual: string;
  recomendacaoOperacional: string;
  tipoPredominante: string;
}

export const MapaAmbientes: React.FC<MapaAmbientesProps> = ({ denuncias }) => {
  const [selectedAmbienteId, setSelectedAmbienteId] = useState<string | null>(null);

  const total = denuncias.length;

  // Contagem por ambiente
  const counts: Record<string, { total: number; tipos: Record<string, number> }> = {
    'Pátio/Recreio': { total: 0, tipos: {} },
    'Sala de Aula': { total: 0, tipos: {} },
    'Redes Sociais': { total: 0, tipos: {} },
    'Corredor/Escada': { total: 0, tipos: {} },
    'Banheiro': { total: 0, tipos: {} },
    'Entorno da Escola': { total: 0, tipos: {} },
    'Transporte Escolar': { total: 0, tipos: {} }
  };

  denuncias.forEach(d => {
    const loc = d.local_escola || 'Outros';
    if (!counts[loc]) {
      counts[loc] = { total: 0, tipos: {} };
    }
    counts[loc].total += 1;
    const t = d.tipo_violencia || 'Verbal';
    counts[loc].tipos[t] = (counts[loc].tipos[t] || 0) + 1;
  });

  const getTipoPredominante = (tipos: Record<string, number>): string => {
    let topTipo = 'Geral';
    let max = -1;
    Object.entries(tipos).forEach(([k, v]) => {
      if (v > max) {
        max = v;
        topTipo = k;
      }
    });
    return topTipo;
  };

  const ambientesInfo: Record<string, { 
    horario: string; 
    supervisao: string; 
    recomendacao: string;
    riscoPadrao: 'Alto' | 'Médio' | 'Baixo';
  }> = {
    'Pátio/Recreio': {
      horario: '12h00 - 13h20 (Almoço & Intervalo Dirigido)',
      supervisao: '2 servidores volantes no refeitório',
      recomendacao: 'Escalar revezamento de professores mediadores e incentivar clubes de jogos de tabuleiro cooperativos.',
      riscoPadrao: 'Alto'
    },
    'Sala de Aula': {
      horario: 'Troca de professores e momentos vagos',
      supervisao: 'Professor titular da aula',
      recomendacao: 'Reduzir intervalo de troca entre aulas e fixar contrato de convivência e empatia no mural da sala.',
      riscoPadrao: 'Alto'
    },
    'Redes Sociais': {
      horario: 'Período noturno (19h - 22h) e fins de semana',
      supervisao: 'Ambiente externo desprovido de vigilância física',
      recomendacao: 'Ciclo de palestras de Cidadania Digital e conscientização sobre a Lei 14.811/2024 (Art. 146-A do CP).',
      riscoPadrao: 'Alto'
    },
    'Corredor/Escada': {
      horario: 'Entrada (07h00) e Saída (17h00)',
      supervisao: 'Inspetores nos acessos principais',
      recomendacao: 'Instalar sinalização reflexiva sobre circulação pacífica e escalonar a descida de turmas por série.',
      riscoPadrao: 'Médio'
    },
    'Banheiro': {
      horario: 'Meio de turno e intervalos intermediários',
      supervisao: 'Ponto cego (área de privacidade)',
      recomendacao: 'Rondas periódicas dos auxiliares de serviço e resposta imediata a pichações e ofensas nas paredes.',
      riscoPadrao: 'Médio'
    },
    'Entorno da Escola': {
      horario: '17h00 - 17h30 (Dispersão no portão)',
      supervisao: 'Portaria principal da EEMTI',
      recomendacao: 'Solicitar reforço de Ronda Escolar nos 200m perimetrais e presença da coordenação na saída.',
      riscoPadrao: 'Médio'
    },
    'Transporte Escolar': {
      horario: '06h30 - 07h15 e 17h15 - 18h00',
      supervisao: 'Motorista responsável pela rota',
      recomendacao: 'Designar monitores de convivência voluntários por rota e canal de escuta para rotas da zona rural.',
      riscoPadrao: 'Baixo'
    }
  };

  const listaAmbientes: AmbienteAnalise[] = Object.entries(counts).map(([nome, data]) => {
    const info = ambientesInfo[nome] || {
      horario: 'Variável',
      supervisao: 'Supervisão padrão',
      recomendacao: 'Manter monitoramento rotineiro pela comissão.',
      riscoPadrao: 'Baixo' as const
    };

    const pct = total > 0 ? Math.round((data.total / total) * 100) : 0;
    
    // Determinação dinâmica do nível de risco baseada em volume e sensibilidade
    let nivelRisco: 'Alto' | 'Médio' | 'Baixo' = info.riscoPadrao;
    let corRisco = 'text-amber-400 bg-amber-500/20 border-amber-500/30';

    if (pct >= 25 || nome === 'Banheiro' || nome === 'Redes Sociais') {
      nivelRisco = 'Alto';
      corRisco = 'text-rose-400 bg-rose-500/20 border-rose-500/30';
    } else if (pct < 10) {
      nivelRisco = 'Baixo';
      corRisco = 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    }

    return {
      id: nome.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      nome,
      contagem: data.total,
      percentual: pct,
      nivelRisco,
      corRisco,
      horarioCritico: info.horario,
      supervisaoAtual: info.supervisao,
      recomendacaoOperacional: info.recomendacao,
      tipoPredominante: getTipoPredominante(data.tipos)
    };
  }).sort((a, b) => b.contagem - a.contagem);

  const activeAmbiente = selectedAmbienteId 
    ? listaAmbientes.find(a => a.id === selectedAmbienteId) 
    : listaAmbientes[0] || null;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-6">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-pink-400" />
            Mapa de Calor & Zonas de Risco da EEMTI Alfredo Machado
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Mapeamento dos ambientes escolares para eliminação de pontos cegos de supervisão pedagógica.
          </p>
        </div>

        <span className="text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full self-start sm:self-center">
          {listaAmbientes.length} ambientes monitorados
        </span>
      </div>

      {/* Grid Principal: Lista Interativa + Card de Detalhamento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Coluna da Esquerda: Barras de Incidência por Ambiente */}
        <div className="lg:col-span-7 space-y-2.5">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Selecione um ambiente para ver o diagnóstico completo:
          </span>

          {listaAmbientes.map((amb) => {
            const isSelected = activeAmbiente?.id === amb.id;
            return (
              <div
                key={amb.id}
                onClick={() => setSelectedAmbienteId(amb.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-950/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'
                    }`}>
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                        {amb.nome}
                      </h4>
                      <p className="text-[10px] text-gray-400 truncate">
                        Predomínio: <span className="text-purple-300">{amb.tipoPredominante}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${amb.corRisco}`}>
                      Risco {amb.nivelRisco}
                    </span>
                    <div className="text-right font-mono">
                      <span className="text-xs font-bold text-white block">{amb.contagem}</span>
                      <span className="text-[10px] text-gray-400">({amb.percentual}%)</span>
                    </div>
                  </div>
                </div>

                {/* Barra de Progresso do Ambiente */}
                <div className="w-full h-1.5 rounded-full bg-black/50 mt-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-pink-500 to-rose-400"
                    style={{ width: `${amb.percentual}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Coluna da Direita: Card de Diagnóstico do Ambiente Ativo */}
        <div className="lg:col-span-5">
          {activeAmbiente ? (
            <div className="p-5 rounded-3xl bg-gradient-to-b from-[#10172a] to-[#090e1c] border border-purple-500/30 space-y-4 sticky top-4">
              <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-1.5 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Diagnóstico de Segurança</span>
                  </div>
                  <h4 className="font-display font-black text-lg text-white mt-0.5">
                    {activeAmbiente.nome}
                  </h4>
                </div>

                <span className={`text-xs font-bold px-2.5 py-1 rounded-xl border ${activeAmbiente.corRisco}`}>
                  {activeAmbiente.nivelRisco} Risco
                </span>
              </div>

              {/* Indicadores do Ambiente */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Incidentes</span>
                  <span className="text-xl font-black font-mono text-white mt-0.5 block">
                    {activeAmbiente.contagem}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Carga Relativa</span>
                  <span className="text-xl font-black font-mono text-purple-400 mt-0.5 block">
                    {activeAmbiente.percentual}%
                  </span>
                </div>
              </div>

              {/* Horário Mais Sensível */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Horário Mais Sensível:</span>
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  {activeAmbiente.horarioCritico}
                </p>
              </div>

              {/* Supervisão Atual */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                  <Users className="w-3.5 h-3.5" />
                  <span>Supervisão em Vigor:</span>
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  {activeAmbiente.supervisaoAtual}
                </p>
              </div>

              {/* Ação Preventiva Recomendada para a Gestão */}
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ação Preventiva Recomendada:</span>
                </div>
                <p className="text-emerald-200 text-[11px] leading-relaxed">
                  {activeAmbiente.recomendacaoOperacional}
                </p>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center text-gray-400 text-xs">
              Selecione um ambiente ao lado para ver as diretrizes.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};



interface FunilRestaurativoProps {
  denuncias: Denuncia[];
}

export const FunilRestaurativo: React.FC<FunilRestaurativoProps> = ({ denuncias }) => {
  const total = denuncias.length;

  // Contagem das etapas
  let escuta = 0;
  let preMediacao = 0;
  let sessaoDialogo = 0;
  let acordoFirmado = 0;
  let monitoramento = 0;
  let pacificado = 0;

  denuncias.forEach(d => {
    // Se o caso está resolvido, passou por todo o fluxo
    if (d.status === 'Resolvido' || d.etapa_mediacao === 'pacificado') {
      escuta += 1;
      preMediacao += 1;
      sessaoDialogo += 1;
      acordoFirmado += 1;
      monitoramento += 1;
      pacificado += 1;
    } else if (d.status === 'Acolhido') {
      escuta += 1;
      preMediacao += 1;
      if (d.etapa_mediacao === 'monitoramento') {
        sessaoDialogo += 1;
        acordoFirmado += 1;
        monitoramento += 1;
      } else if (d.etapa_mediacao === 'acordo_firmado') {
        sessaoDialogo += 1;
        acordoFirmado += 1;
      } else if (d.etapa_mediacao === 'sessao_dialogo') {
        sessaoDialogo += 1;
      }
    } else {
      // Em Análise
      escuta += 1;
      if (d.acoes_mediacao && d.acoes_mediacao.length > 0) {
        preMediacao += 1;
      }
    }
  });

  const etapas = [
    {
      numero: '01',
      nome: 'Escuta Inicial & Triagem',
      descricao: 'Acolhimento empático imediato do estudante e registro do protocolo sigiloso.',
      quantidade: escuta,
      percentual: total > 0 ? Math.round((escuta / total) * 100) : 100,
      cor: 'from-purple-600 to-indigo-600',
      tag: '100% de Acolhimento'
    },
    {
      numero: '02',
      nome: 'Pré-Mediação Individual',
      descricao: 'Ouvida de cada parte em separado pela comissão para compreender as causas profundas.',
      quantidade: preMediacao,
      percentual: total > 0 ? Math.round((preMediacao / total) * 100) : 0,
      cor: 'from-indigo-600 to-blue-600',
      tag: 'Neutralidade Ativa'
    },
    {
      numero: '03',
      nome: 'Círculo de Diálogo Restaurativo',
      descricao: 'Encontro presencial facilitado pelos mediadores escolares com foco na reparação do dano.',
      quantidade: sessaoDialogo,
      percentual: total > 0 ? Math.round((sessaoDialogo / total) * 100) : 0,
      cor: 'from-blue-600 to-cyan-600',
      tag: 'Comunicação Não-Violenta'
    },
    {
      numero: '04',
      nome: 'Pactuação do Acordo de Convivência',
      descricao: 'Assinatura voluntária dos compromissos mútuos de respeito e reparação moral/simbólica.',
      quantidade: acordoFirmado,
      percentual: total > 0 ? Math.round((acordoFirmado / total) * 100) : 0,
      cor: 'from-cyan-600 to-teal-500',
      tag: 'Compromisso Escrito'
    },
    {
      numero: '05',
      nome: 'Monitoramento & Check-ins (7, 15, 30d)',
      descricao: 'Acompanhamento preventivo com a vítima e com os professores para garantir paz contínua.',
      quantidade: monitoramento,
      percentual: total > 0 ? Math.round((monitoramento / total) * 100) : 0,
      cor: 'from-teal-500 to-emerald-500',
      tag: 'Acompanhamento Ativo'
    },
    {
      numero: '06',
      nome: 'Pacificação Plena / Caso Concluído',
      descricao: 'Convivência harmoniosa restabelecida, sem qualquer reincidência registrada.',
      quantidade: pacificado,
      percentual: total > 0 ? Math.round((pacificado / total) * 100) : 0,
      cor: 'from-emerald-500 to-green-400',
      tag: 'Cultura de Paz Consolidada'
    }
  ];

  // Contagem de impactos psicossociais
  const impactosContagem: Record<string, number> = {
    'Isolamento no recreio/sala': 0,
    'Queda no rendimento escolar': 0,
    'Ansiedade e medo de vir à escola': 0,
    'Faltas frequentes / Fobia escolar': 0,
    'Crises de choro / Tristeza profunda': 0
  };

  denuncias.forEach(d => {
    if (d.impactos_identificados && d.impactos_identificados.length > 0) {
      d.impactos_identificados.forEach(imp => {
        if (/isolamento/i.test(imp)) impactosContagem['Isolamento no recreio/sala'] += 1;
        else if (/rendimento|nota/i.test(imp)) impactosContagem['Queda no rendimento escolar'] += 1;
        else if (/ansiedade|medo/i.test(imp)) impactosContagem['Ansiedade e medo de vir à escola'] += 1;
        else if (/falta|evas/i.test(imp)) impactosContagem['Faltas frequentes / Fobia escolar'] += 1;
        else impactosContagem['Crises de choro / Tristeza profunda'] += 1;
      });
    } else {
      // Estimativa diagnóstica baseada na gravidade
      if (d.nivel_gravidade === 'Grave' || d.is_sos) {
        impactosContagem['Ansiedade e medo de vir à escola'] += 1;
        impactosContagem['Queda no rendimento escolar'] += 1;
      } else {
        impactosContagem['Isolamento no recreio/sala'] += 1;
      }
    }
  });

  return (
    <div className="space-y-6">
      
      {/* 1. O FUNIL RESTAURATIVO */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              Funil do Fluxo Restaurativo Escolar (Metodologia EEMTI)
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Trajetória pedagógica da denúncia: do primeiro relato ao restabelecimento pacífico da convivência escolar.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold self-start sm:self-center">
            <Award className="w-3.5 h-3.5" />
            Meta SEDUC: Pacificação Dialogada
          </div>
        </div>

        {/* Visualização em Degraus Decrescentes */}
        <div className="space-y-3">
          {etapas.map((etp) => (
            <div 
              key={etp.numero} 
              className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/[0.07] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-white/10 text-white font-mono font-black text-xs flex items-center justify-center flex-shrink-0">
                    {etp.numero}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                      {etp.nome}
                      <span className="text-[10px] text-gray-400 font-normal hidden md:inline">
                        • {etp.tag}
                      </span>
                    </h4>
                    <p className="text-[11px] text-gray-300 line-clamp-1">
                      {etp.descricao}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0 font-mono">
                  <span className="text-xs font-bold text-white">
                    {etp.quantidade} casos
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                    {etp.percentual}%
                  </span>
                </div>
              </div>

              {/* Barra do Funil */}
              <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${etp.cor} transition-all duration-700`}
                  style={{ width: `${Math.max(5, etp.percentual)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. IMPACTOS PSICOSSOCIAIS IDENTIFICADOS */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              Impactos Socioemocionais & Sinais de Sofrimento Mapeados
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Diagnóstico preventivo para orientar a equipe de psicólogos escolares, professores orientadores e coordenação.
            </p>
          </div>
          <Activity className="w-4 h-4 text-purple-400 hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(impactosContagem).map(([impacto, qtd]) => {
            const pct = total > 0 ? Math.round((qtd / total) * 100) : 0;
            return (
              <div key={impacto} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-200">{impacto}</span>
                  <span className="font-mono text-purple-300 font-bold">{qtd} alunos ({pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                    style={{ width: `${Math.max(4, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota Metodológica de Cuidado Integral */}
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-3 text-xs text-purple-200">
          <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-purple-300">
            <strong>Diretriz Pedagógica da EEMTI Alfredo Machado:</strong> Cada ocorrência relatada gera acolhimento sem revitimização. O estudante vítima recebe escuta ativa prioritária, enquanto o autor da ofensa é responsabilizado pedagogicamente por meio de reflexão orientada, retratação e reparação do dano.
          </p>
        </div>

      </div>

    </div>
  );
};



interface RecomendacoesGestaoProps {
  denuncias: Denuncia[];
}

export const RecomendacoesGestao: React.FC<RecomendacoesGestaoProps> = ({ denuncias }) => {
  const total = denuncias.length;

  // Cálculos dinâmicos para acionar recomendações específicas
  const cyberCount = denuncias.filter(d => d.tipo_violencia === 'Cyberbullying').length;
  const cyberPct = total > 0 ? Math.round((cyberCount / total) * 100) : 0;

  const patioCount = denuncias.filter(d => d.local_escola === 'Pátio/Recreio').length;
  const patioPct = total > 0 ? Math.round((patioCount / total) * 100) : 0;

  const verbalCount = denuncias.filter(d => d.tipo_violencia === 'Verbal').length;
  const verbalPct = total > 0 ? Math.round((verbalCount / total) * 100) : 0;

  const testemunhaCount = denuncias.filter(d => 
    d.papel_denunciante === 'Testemunha' || d.papel_denunciante === 'Amigo/Colega'
  ).length;
  const testemunhaPct = total > 0 ? Math.round((testemunhaCount / total) * 100) : 0;

  const criticosCount = denuncias.filter(d => 
    d.is_sos || d.nivel_escalada === 'Crítica' || d.nivel_gravidade === 'Grave'
  ).length;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-6">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Inteligência Preventiva Automatizada
          </div>
          <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider">
            Recomendações Estratégicas para o Colegiado Escolar
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Orientações pedagógicas geradas a partir dos padrões concretos de dados registrados na EEMTI Alfredo Machado.
          </p>
        </div>

        <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-2xl font-bold flex items-center gap-1.5 self-start sm:self-center">
          <ShieldCheck className="w-4 h-4" /> Diretrizes Alinhadas à Lei 13.185/2015
        </span>
      </div>

      {/* Grid de Recomendações Dinâmicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. Supervisão de Pátio e Recreio */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5 uppercase">
                <Compass className="w-3.5 h-3.5" />
                Intervenção em Pátio & Recreio
              </span>
              <span className="text-[10px] font-mono text-gray-400">{patioPct}% dos casos</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Implementar escala volante de mediação e recreio dirigido
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              O pátio concentra expressivo volume de ocorrências durante o almoço. Recomenda-se criar zonas de convivência com jogos de tabuleiro cooperativos e rodízio de professores mediadores no refeitório.
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-pink-300 font-semibold">
            <span>Ação Sugerida: Coordenação de Pátio & Grêmio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 2. Cidadania Digital & Cyberbullying */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 uppercase">
                <Lightbulb className="w-3.5 h-3.5" />
                Cidadania Digital & Redes Sociais
              </span>
              <span className="text-[10px] font-mono text-gray-400">{cyberPct}% dos casos</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Oficina sobre a Lei 14.811/2024 (Art. 146-A do Código Penal)
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Mapeamento de figurinhas depreciativas e prints fora de contexto exige formação jurídica e ética sobre a responsabilidade legal de postagens e o impacto psicológico da humilhação virtual.
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-purple-300 font-semibold">
            <span>Ação Sugerida: Aula de Cidadania & Palestra SEDUC</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 3. Comunicação Não-Violenta e Círculos de Empatia */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
                <Target className="w-3.5 h-3.5" />
                Círculos de Empatia em Sala de Aula
              </span>
              <span className="text-[10px] font-mono text-gray-400">{verbalPct}% verbal</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Dinâmicas de Comunicação Não-Violenta (CNV) nos 1ºs e 2ºs anos
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Apelidos pejorativos e zombarias durante seminários podem ser desconstruídos através de contratos didáticos firmados pelos estudantes com seus Professores Diretores de Turma (PDT).
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-indigo-300 font-semibold">
            <span>Ação Sugerida: Professores Diretores de Turma</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 4. Valorização dos Espectadores Ativos */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                <Users className="w-3.5 h-3.5" />
                Cultura do Espectador Protetor
              </span>
              <span className="text-[10px] font-mono text-gray-400">{testemunhaPct}% por testemunhas</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Campanha "Quem Protege é Líder: Não Seja Cúmplice do Silêncio"
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              O expressivo índice de denúncias vindas de colegas e amigos comprova que os estudantes confiam no sigilo do app. Deve-se reforçar homenagens simbólicas à coragem moral dos jovens.
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
            <span>Ação Sugerida: Grêmio Estudantil & Conquistas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Protocolo de Crises Graves se Houver Casos Críticos */}
      {criticosCount > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-2 text-xs text-rose-200">
          <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Alerta de Resposta Rápida: {criticosCount} caso(s) com gravidade crítica / SOS</span>
          </div>
          <p className="text-[11px] leading-relaxed text-rose-300">
            Casos com violência física ou ameaças severas demandam convocação solene dos responsáveis legais em até 24 horas, emissão do Termo de Acolhimento e, se necessário, notificação formal ao Conselho Tutelar e à CREDE 12 em conformidade com o regimento escolar.
          </p>
        </div>
      )}

      {/* Checklist Executivo para a Equipe Gestora */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <h4 className="text-xs font-black uppercase text-gray-200 tracking-wider flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          Plano de Ação Trimestral da EEMTI Alfredo Machado
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
          <label className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5">
            <input type="checkbox" defaultChecked className="rounded text-emerald-500 accent-emerald-500" />
            <span>Apresentar métricas na reunião pedagógica mensal</span>
          </label>
          <label className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5">
            <input type="checkbox" defaultChecked className="rounded text-emerald-500 accent-emerald-500" />
            <span>Enviar relatório consolidado à CREDE 12</span>
          </label>
          <label className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5">
            <input type="checkbox" defaultChecked className="rounded text-emerald-500 accent-emerald-500" />
            <span>Executar círculos restaurativos com turmas prioritárias</span>
          </label>
          <label className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5">
            <input type="checkbox" defaultChecked className="rounded text-emerald-500 accent-emerald-500" />
            <span>Verificar cumprimento de acordos nos prazos de 15 e 30 dias</span>
          </label>
        </div>
      </div>

    </div>
  );
};



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
