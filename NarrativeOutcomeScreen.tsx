import React, { useState } from 'react';
import { 
  NarrativeStory, 
  NarrativeOutcome, 
  NarrativeChoice 
} from '../../../data/narrativeStoriesData';
import { 
  Trophy, 
  Award, 
  RotateCcw, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Scale, 
  ChevronDown, 
  ChevronUp,
  Lightbulb
} from 'lucide-react';

interface NarrativeOutcomeScreenProps {
  story: NarrativeStory;
  totalScore: number;
  xpEarned: number;
  isFirstCompletion: boolean;
  choicesHistory: Array<{ actNumber: number; choice: NarrativeChoice }>;
  outcome: NarrativeOutcome;
  onRestart: () => void;
  onBackToHub: () => void;
}

export const NarrativeOutcomeScreen: React.FC<NarrativeOutcomeScreenProps> = ({
  story,
  totalScore,
  xpEarned,
  isFirstCompletion,
  choicesHistory,
  outcome,
  onRestart,
  onBackToHub
}) => {
  const [showChoicesTimeline, setShowChoicesTimeline] = useState(false);
  const percent = Math.min(100, Math.round((totalScore / story.maxScore) * 100));

  // Cálculo individual das dimensões de competências para o pentágono
  const positiveChoicesCount = choicesHistory.filter(c => c.choice.impact === 'positivo').length;
  const neutralChoicesCount = choicesHistory.filter(c => c.choice.impact === 'neutro').length;

  const bullyingScore = Math.min(100, Math.round(((positiveChoicesCount * 20) + (neutralChoicesCount * 8))));
  const convivenciaScore = Math.min(100, Math.round(percent * 0.95 + 5));
  const direitosScore = Math.min(100, Math.round(percent * 0.9 + 8));
  const respeitoScore = Math.min(100, Math.round(percent * 0.98));
  const emocionalScore = Math.min(100, Math.round(positiveChoicesCount >= 4 ? 95 : positiveChoicesCount >= 2 ? 75 : 55));

  // Pontos geométricos para o SVG do Radar Pentagonal
  const center = 100;
  const radius = 70;
  const angles = [-90, -18, 54, 126, 198].map(deg => (deg * Math.PI) / 180);

  const getPoint = (score: number, index: number) => {
    const r = (score / 100) * radius;
    const x = center + r * Math.cos(angles[index]);
    const y = center + r * Math.sin(angles[index]);
    return `${x},${y}`;
  };

  const polygonPoints = [
    getPoint(bullyingScore, 0),
    getPoint(convivenciaScore, 1),
    getPoint(direitosScore, 2),
    getPoint(respeitoScore, 3),
    getPoint(emocionalScore, 4)
  ].join(' ');

  const backgroundPoints = (lvl: number) => {
    return angles.map(a => {
      const r = (lvl / 100) * radius;
      return `${center + r * Math.cos(a)},${center + r * Math.sin(a)}`;
    }).join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* CARD PRINCIPAL DO DESFECHO COM DESIGN CLARO E PROFISSIONAL */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-purple-200/90 shadow-xl text-slate-800 space-y-8">
        
        {/* BANNER TRIUNFANTE */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-purple-600 text-white shadow-lg mx-auto">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3.5 py-1 rounded-full inline-block">
              {outcome.badgeTitle}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
              {outcome.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              {outcome.description}
            </p>
          </div>
        </div>

        {/* 3 CARDS DE MÉTRICAS CHAVE: PONTUAÇÃO, XP E ASSERTIVIDADE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-center space-y-1">
            <span className="text-xs text-purple-800 font-bold uppercase tracking-wider block">
              Pontuação Ética
            </span>
            <span className="text-3xl sm:text-4xl font-black text-purple-950 font-mono">
              {totalScore} <span className="text-base text-purple-700 font-normal">/ {story.maxScore}</span>
            </span>
            <span className="text-[11px] text-slate-500 block">5 decisões avaliadas</span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center space-y-1">
            <span className="text-xs text-amber-800 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              XP Conquistado
            </span>
            <span className="text-3xl sm:text-4xl font-black text-amber-700 font-mono">
              +{xpEarned} XP
            </span>
            <span className="text-[11px] text-amber-800/80 block">
              {isFirstCompletion ? 'Primeira conclusão integral' : 'Histórico registrado'}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-center space-y-1">
            <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider block">
              Assertividade Ética
            </span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
              {percent}%
            </span>
            <span className="text-[11px] text-emerald-800/80 block">
              {percent >= 80 ? 'Conduta Exemplar' : percent >= 60 ? 'Maturidade Positiva' : 'Em Formação'}
            </span>
          </div>
        </div>

        {/* SEÇÃO DO RADAR PEDAGÓGICO DE COMPETÊNCIAS */}
        <div className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* GRÁFICO PENTAGONAL SVG */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <span className="text-xs font-mono font-bold text-purple-900 uppercase tracking-wider mb-2">
              Radar Formativo de Competências
            </span>
            <div className="relative w-48 h-48 sm:w-52 sm:h-52">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
                {/* Linhas de base do pentágono */}
                {[25, 50, 75, 100].map(lvl => (
                  <polygon
                    key={lvl}
                    points={backgroundPoints(lvl)}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeOpacity={lvl === 100 ? 0.9 : 0.5}
                    strokeWidth="1"
                  />
                ))}

                {/* Eixos centrais */}
                {angles.map((a, i) => (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={center + radius * Math.cos(a)}
                    y2={center + radius * Math.sin(a)}
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                ))}

                {/* Área preenchida do estudante */}
                <polygon
                  points={polygonPoints}
                  fill="#9333ea"
                  fillOpacity="0.25"
                  stroke="#7e22ce"
                  strokeWidth="2.5"
                />

                {/* Pontos nas pontas */}
                {[bullyingScore, convivenciaScore, direitosScore, respeitoScore, emocionalScore].map((sc, i) => {
                  const pt = getPoint(sc, i).split(',');
                  return (
                    <circle
                      key={i}
                      cx={pt[0]}
                      cy={pt[1]}
                      r="4"
                      fill="#7e22ce"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* BARRAS DE DOMÍNIO COM PORCENTAGENS */}
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider pb-1 border-b border-slate-200">
              Desempenho por Dimensão Pedagógica:
            </h4>

            {[
              { label: 'Bullying & Cyberbullying', score: bullyingScore, color: 'bg-purple-600' },
              { label: 'Convivência Escolar', score: convivenciaScore, color: 'bg-indigo-600' },
              { label: 'Direitos & Legislação', score: direitosScore, color: 'bg-emerald-600' },
              { label: 'Respeito & Responsabilidade', score: respeitoScore, color: 'bg-amber-600' },
              { label: 'Apoio Socioemocional', score: emocionalScore, color: 'bg-rose-600' }
            ].map((dim, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">{dim.label}</span>
                  <span className="font-mono font-bold text-slate-900">{dim.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${dim.color} transition-all duration-700`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PONTOS FORTES E RECOMENDAÇÕES PRÁTICAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Pontos Fortes Demonstrados
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {outcome.summaryKeyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" />
              Orientações Legais & Convivência
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {outcome.legalRecommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEÇÃO EXPANSÍVEL: REVISÃO DA LINHA DO TEMPO DAS DECISÕES */}
        <div className="border-t border-slate-200 pt-4">
          <button
            onClick={() => setShowChoicesTimeline(prev => !prev)}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center justify-between cursor-pointer border border-slate-200"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              {showChoicesTimeline ? 'Ocultar Linha do Tempo das Decisões' : 'Revisar Linha do Tempo das Decisões (5 Atos)'}
            </span>
            {showChoicesTimeline ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showChoicesTimeline && (
            <div className="space-y-3 pt-3 animate-fadeIn">
              {choicesHistory.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 text-left space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-purple-900">
                      ATO {item.actNumber}: {story.acts[idx]?.actTitle || 'Decisão'}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      item.choice.impact === 'positivo'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : item.choice.impact === 'neutro'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-rose-50 text-rose-800 border-rose-300'
                    }`}>
                      +{item.choice.points} pts ({item.choice.impact.toUpperCase()})
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 font-medium">
                    "{item.choice.text}"
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 space-y-1">
                    <p><strong className="text-slate-900">Desdobramento:</strong> {item.choice.whatHappened}</p>
                    <p><strong className="text-purple-900">Análise Ética:</strong> {item.choice.ethicalAnalysis}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTÕES DE AÇÃO: JOGAR NOVAMENTE E VOLTAR À CENTRAL */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Experimentar Outras Escolhas</span>
          </button>

          <button
            onClick={onBackToHub}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm transition-all shadow-md shadow-purple-900/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Concluir e Voltar à Central de Histórias</span>
          </button>
        </div>

      </div>
    </div>
  );
};
