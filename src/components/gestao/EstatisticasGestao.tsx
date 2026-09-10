import React from 'react';
import { Denuncia } from '../../types';
import { 
  BarChart2, 
  Printer, 
  TrendingUp, 
  CheckSquare, 
  Clock, 
  PieChart, 
  MapPin 
} from 'lucide-react';
import { playBreathTone } from '../../services/audioSynthesizer';

interface EstatisticasGestaoProps {
  denuncias: Denuncia[];
}

export const EstatisticasGestao: React.FC<EstatisticasGestaoProps> = ({ denuncias }) => {
  const totalDenuncias = denuncias.length;
  const casosResolvidos = denuncias.filter(d => d.status === 'Resolvido').length;
  const percentResolvidos = totalDenuncias > 0 ? Math.round((casosResolvidos / totalDenuncias) * 100) : 0;

  // Total de ações de mediação
  const totalMediacoes = denuncias.reduce((acc, curr) => acc + (curr.acoes_mediacao?.length || 0), 0);

  // Contagem por tipo
  const tiposContagem: Record<string, number> = {};
  denuncias.forEach(d => {
    const t = d.tipo_violencia || 'Outros';
    tiposContagem[t] = (tiposContagem[t] || 0) + 1;
  });

  // Contagem por local
  const locaisContagem: Record<string, number> = {};
  denuncias.forEach(d => {
    const loc = d.local_escola || 'Não informado';
    locaisContagem[loc] = (locaisContagem[loc] || 0) + 1;
  });

  const handlePrint = () => {
    try {
      playBreathTone(750, 25, true);
    } catch {}
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Cabeçalho do Diagnóstico */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-[#090e1c] to-teal-950/40 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
            <BarChart2 className="w-3.5 h-3.5" />
            Diagnóstico & Inteligência Preventiva
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-white">
            Métricas e Indicadores da EEMTI Alfredo Machado
          </h2>
          <p className="text-xs text-gray-400 max-w-xl">
            Dados consolidados para subsidiar decisões da gestão escolar, intervenções preventivas com turmas e reuniões com a CREDE.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer self-start md:self-center"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Imprimir Relatório Escolar</span>
        </button>
      </div>

      {/* Grid de Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Taxa de Eficácia da Mediação */}
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
            <span className="text-xs text-gray-400">resolvidos com diálogo</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
              style={{ width: `${percentResolvidos}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Proporção de ocorrências que chegaram a um acordo pedagógico pacífico entre os estudantes.
          </p>
        </div>

        {/* Total de Encaminhamentos Registrados */}
        <div className="p-5 rounded-3xl bg-[#090e1c] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Providências Restaurativas
            </span>
            <CheckSquare className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-indigo-400 font-mono">
              {totalMediacoes}
            </span>
            <span className="text-xs text-gray-400">ações pedagógicas</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full"
              style={{ width: `${Math.min(100, totalMediacoes * 8)}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Escutas ativas, conversas com famílias, acordos e intervenções em sala realizadas pela comissão.
          </p>
        </div>

        {/* Tempo de Resposta */}
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
            <span className="text-xs text-gray-400">meta da escola</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
              style={{ width: '92%' }}
            />
          </div>

          <p className="text-[11px] text-gray-400 leading-snug">
            Tempo médio em que um estudante que fez o relato recebe o primeiro contato e acolhimento.
          </p>
        </div>

      </div>

      {/* Gráficos em Barras por Tipo e por Local */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Distribuição por Tipo de Violência */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <PieChart className="w-4 h-4 text-purple-400" />
            Incidência por Tipo de Violência
          </h3>

          <div className="space-y-3">
            {Object.entries(tiposContagem).map(([tipo, qtd]) => {
              const pct = totalDenuncias > 0 ? Math.round((qtd / totalDenuncias) * 100) : 0;
              return (
                <div key={tipo} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-200">{tipo}</span>
                    <span className="text-gray-400 font-mono">{qtd} caso(s) ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mapeamento de Zonas Críticas */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4 text-pink-400" />
            Zonas Críticas Mapeadas na Escola
          </h3>

          <div className="space-y-3">
            {Object.entries(locaisContagem).map(([local, qtd]) => {
              const pct = totalDenuncias > 0 ? Math.round((qtd / totalDenuncias) * 100) : 0;
              return (
                <div key={local} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-200">{local}</span>
                    <span className="text-gray-400 font-mono">{qtd} relato(s) ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
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
  );
};
