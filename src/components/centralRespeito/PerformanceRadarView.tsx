import React from 'react';
import { UserCompetencyRegistry } from '../../utils/centralRespeitoStorage';
import { 
  HeartHandshake, 
  Users, 
  ShieldAlert, 
  Smartphone, 
  Scale, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  AlertCircle,
  HelpCircle,
  Award
} from 'lucide-react';

interface PerformanceRadarViewProps {
  registry: UserCompetencyRegistry;
  totalAnswered: number;
  maxStreakRecord: number;
  totalCompletedChallenges: number;
}

export const PerformanceRadarView: React.FC<PerformanceRadarViewProps> = ({
  registry,
  totalAnswered,
  maxStreakRecord,
  totalCompletedChallenges
}) => {
  const competencies = [
    {
      key: 'respeito' as const,
      label: 'Respeito & Empatia',
      desc: 'Compreensão da alteridade, dignidade e acolhimento das diferenças.',
      icon: <HeartHandshake className="w-5 h-5 text-rose-500" />,
      color: 'from-rose-500 to-pink-600',
      badgeBg: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      key: 'convivencia' as const,
      label: 'Convivência Democrática',
      desc: 'Habilidades de diálogo, escuta ativa e mediação pacífica de tensões.',
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      color: 'from-indigo-500 to-violet-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      key: 'bullying' as const,
      label: 'Prevenção ao Bullying',
      desc: 'Identificação de intimidação sistemática, assimetria de poder e exclusão.',
      icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
      color: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      key: 'cyber' as const,
      label: 'Cidadania Digital & Cyber',
      desc: 'Comportamento ético na web, proteção de dados e repúdio ao cyberbullying.',
      icon: <Smartphone className="w-5 h-5 text-cyan-500" />,
      color: 'from-cyan-500 to-blue-600',
      badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      key: 'direitos' as const,
      label: 'Direitos & Legislação',
      desc: 'Conhecimento da Lei 13.185/2015, ECA, Lei 14.811/2024 e deveres cidadãos.',
      icon: <Scale className="w-5 h-5 text-emerald-500" />,
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Resumo Geral */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-purple-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-100 text-purple-700">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#5c546d] font-medium block">Desafios Concluídos</span>
            <span className="text-2xl font-black text-[#241e33]">{totalCompletedChallenges}</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-purple-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-100 text-amber-700">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#5c546d] font-medium block">Recorde de Sequência (Streak)</span>
            <span className="text-2xl font-black text-amber-600">{maxStreakRecord} 🔥</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-purple-200/80 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-[#5c546d] font-medium block">Questões Analisadas</span>
            <span className="text-2xl font-black text-[#241e33]">{totalAnswered}</span>
          </div>
        </div>
      </div>

      {/* Título da Seção */}
      <div className="p-6 rounded-3xl bg-white/95 border border-purple-200/80 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-display font-black text-lg sm:text-xl text-[#241e33]">
              Diagnóstico Formativo por Competência
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5c546d] mt-1">
            Este painel mede a precisão das suas análises éticas nos desafios realizados. Use-o para saber onde você brilha e quais tópicos merecem revisão pedagógica.
          </p>
        </div>

        {/* Barras de Desempenho por Competência */}
        <div className="space-y-5">
          {competencies.map((comp) => {
            const data = registry[comp.key] || { correct: 0, total: 0 };
            const percent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            const hasData = data.total > 0;

            let levelLabel = 'Sem dados suficientes';
            let levelColor = 'text-gray-400';
            if (hasData) {
              if (percent >= 85) {
                levelLabel = 'Domínio Avançado ⭐';
                levelColor = 'text-emerald-600 font-bold';
              } else if (percent >= 70) {
                levelLabel = 'Bom Domínio 👍';
                levelColor = 'text-blue-600 font-bold';
              } else if (percent >= 50) {
                levelLabel = 'Em Desenvolvimento 📈';
                levelColor = 'text-amber-600 font-bold';
              } else {
                levelLabel = 'Requer Atenção ⚠️';
                levelColor = 'text-rose-600 font-bold';
              }
            }

            return (
              <div 
                key={comp.key}
                className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 hover:border-purple-200 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white shadow-xs border border-purple-200/60">
                      {comp.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#241e33]">{comp.label}</h4>
                      <p className="text-xs text-[#5c546d] line-clamp-1">{comp.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className={`text-xs ${levelColor}`}>
                      {levelLabel}
                    </span>
                    <span className="font-mono font-black text-sm text-[#241e33] min-w-[45px] text-right">
                      {hasData ? `${percent}%` : '—'}
                    </span>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="w-full h-3 rounded-full bg-purple-200/50 overflow-hidden relative">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${comp.color} transition-all duration-700`}
                    style={{ width: `${hasData ? percent : 0}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#5c546d] mt-1.5 font-medium">
                  <span>{hasData ? `${data.correct} acertos de ${data.total} questões` : 'Responda desafios desta área para gerar diagnóstico'}</span>
                  {hasData && percent < 70 && (
                    <span className="text-rose-600 flex items-center gap-1 font-semibold">
                      <AlertCircle className="w-3 h-3" />
                      Recomendado revisar
                    </span>
                  )}
                  {hasData && percent >= 85 && (
                    <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Ponto Forte
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota Educativa */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold block mb-0.5">Como esse diagnóstico é construído?</span>
            Cada desafio concluído na Central alimenta automaticamente o cálculo de competências. A pontuação é reflexo exclusivamente das questões respondidas e não constitui qualquer avaliação de caráter ou julgamento pessoal do estudante.
          </div>
        </div>
      </div>
    </div>
  );
};
