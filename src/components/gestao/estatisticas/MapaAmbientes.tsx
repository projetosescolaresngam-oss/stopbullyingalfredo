import React, { useState } from 'react';
import { Denuncia } from '../../../types';
import { 
  MapPin, 
  ShieldAlert, 
  Eye, 
  Clock, 
  Users, 
  AlertTriangle,
  Compass,
  CheckCircle2
} from 'lucide-react';

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
