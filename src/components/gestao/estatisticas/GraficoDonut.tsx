import React, { useState } from 'react';

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
