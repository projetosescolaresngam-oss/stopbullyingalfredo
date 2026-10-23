import React from 'react';
import { NarrativeChoice } from '../../../data/narrativeStoriesData';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Scale, 
  ArrowRight,
  BookOpen,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  Award
} from 'lucide-react';

interface ChoiceFeedbackPanelProps {
  choice: NarrativeChoice;
  currentActNumber: number;
  totalActs: number;
  onAdvance: () => void;
}

export const ChoiceFeedbackPanel: React.FC<ChoiceFeedbackPanelProps> = ({
  choice,
  currentActNumber,
  totalActs,
  onAdvance
}) => {
  const isPositive = choice.impact === 'positivo';
  const isNeutral = choice.impact === 'neutro';

  // Configurações visuais por impacto (Gamer / Visual Novel HUD)
  const impactConfig = isPositive
    ? {
        label: 'Decisão Ética Exemplar',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
        borderColor: 'border-emerald-500/60',
        bgGradient: 'from-emerald-950/90 via-[#0d2818]/90 to-slate-950',
        icon: CheckCircle2,
        iconColor: 'text-emerald-400',
        scoreBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
      }
    : isNeutral
    ? {
        label: 'Ação com Impacto Parcial / Risco Residual',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/50',
        borderColor: 'border-amber-500/60',
        bgGradient: 'from-amber-950/90 via-[#2e1d05]/90 to-slate-950',
        icon: Sparkles,
        iconColor: 'text-amber-400',
        scoreBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      }
    : {
        label: 'Conduta Inadequada / Exposição ou Prejuízo',
        badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/50',
        borderColor: 'border-rose-500/60',
        bgGradient: 'from-rose-950/90 via-[#2c0911]/90 to-slate-950',
        icon: AlertTriangle,
        iconColor: 'text-rose-400',
        scoreBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      };

  const IconComponent = impactConfig.icon;
  const isFinalAct = currentActNumber >= totalActs;

  return (
    <div className={`mt-4 rounded-3xl border-2 ${impactConfig.borderColor} bg-gradient-to-br ${impactConfig.bgGradient} backdrop-blur-xl shadow-2xl p-5 sm:p-7 text-white space-y-6 animate-fadeIn`}>
      
      {/* 1. TOPO: STATUS DA DECISÃO & PONTUAÇÃO CONQUISTADA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${impactConfig.badgeColor} border flex-shrink-0 shadow-md`}>
            <IconComponent className={`w-6 h-6 ${impactConfig.iconColor}`} />
          </div>
          <div>
            <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${impactConfig.badgeColor} inline-block mb-1`}>
              {impactConfig.label}
            </span>
            <h4 className="font-display font-black text-base sm:text-lg text-white">
              Análise das Consequências da sua Escolha
            </h4>
          </div>
        </div>

        {/* Badge de Pontuação da Escolha */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className={`px-3.5 py-1.5 rounded-xl border ${impactConfig.scoreBadge} font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm`}>
            <Award className="w-4 h-4 text-amber-300" />
            <span>+{choice.points} Pontos de Assertividade</span>
          </div>
        </div>
      </div>

      {/* 2. O QUE ACONTECEU NA HISTÓRIA (RAMIFICAÇÃO NARRATIVA) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-fuchsia-400" />
          Desdobramento Imediato no Ambiente Escolar:
        </span>
        <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed">
          {choice.whatHappened}
        </p>
      </div>

      {/* 3. COLUNAS PEDAGÓGICAS: REFLEXÃO ÉTICA & APRENDIZADO PRÁTICO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Análise Ética */}
        <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-300">
            <Scale className="w-4 h-4 text-fuchsia-400" />
            <span>Reflexão Ética & Empática</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {choice.ethicalAnalysis}
          </p>
        </div>

        {/* Aprendizado Prático */}
        <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Diretriz Prática de Convivência</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {choice.practicalLearning}
          </p>
        </div>

      </div>

      {/* 4. BASE LEGAL (LEI 14.811/2024 OU ECA) */}
      {choice.legalBasis && (
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white font-mono">
                {choice.legalBasis.law}
              </span>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded-md">
                {choice.legalBasis.article}
              </span>
            </div>
            <p className="text-xs text-purple-200 leading-relaxed">
              {choice.legalBasis.summary}
            </p>
          </div>
        </div>
      )}

      {/* 5. BOTÃO DE AVANÇO PARA O PRÓXIMO ATO OU DESFECHO */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onAdvance}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black text-sm transition-all shadow-xl shadow-fuchsia-950/80 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
        >
          <span>
            {isFinalAct
              ? 'Ver Desfecho Final do Caso & Radar de Competências'
              : `Avançar para o Ato ${currentActNumber + 1} de ${totalActs}`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
