import React, { useState } from 'react';
import { 
  CompetencyDiagnosticScore, 
  CompetencyKey, 
  EducationalRecommendation, 
  LongitudinalSummary, 
  StageDefinition, 
  StageLevel 
} from '../../services/competencies/types';
import { 
  COMPETENCY_METADATA, 
  COMPETENCY_STAGES 
} from '../../services/competencies/definitions';
import { 
  HeartHandshake, 
  Users, 
  ShieldAlert, 
  Smartphone, 
  Scale, 
  Award, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  Compass, 
  Play, 
  ArrowRight, 
  Filter, 
  BookOpen, 
  Info,
  Layers,
  Flame,
  Zap
} from 'lucide-react';

interface PerformanceRadarViewProps {
  studentKey: string;
  diagnostics: Record<CompetencyKey, CompetencyDiagnosticScore>;
  summary: LongitudinalSummary;
  recommendations: EducationalRecommendation[];
  onOpenActivity?: (targetId: string, targetType: 'quiz' | 'desafio' | 'historia') => void;
}

export const PerformanceRadarView: React.FC<PerformanceRadarViewProps> = ({
  studentKey,
  diagnostics,
  summary,
  recommendations,
  onOpenActivity
}) => {
  const [expandedKey, setExpandedKey] = useState<CompetencyKey | null>(null);
  const [activeTab, setActiveTab] = useState<'painel' | 'evolucao' | 'metas'>('painel');
  const [selectedHistoryFilter, setSelectedHistoryFilter] = useState<CompetencyKey | 'todas'>('todas');

  const competenciesKeys: CompetencyKey[] = ['respeito', 'convivencia', 'bullying', 'cyber', 'direitos'];

  const getIcon = (key: CompetencyKey, className: string = "w-5 h-5") => {
    switch (key) {
      case 'respeito': return <HeartHandshake className={className} />;
      case 'convivencia': return <Users className={className} />;
      case 'bullying': return <ShieldAlert className={className} />;
      case 'cyber': return <Smartphone className={className} />;
      case 'direitos': return <Scale className={className} />;
    }
  };

  const getConfidenceBadge = (confidence: CompetencyDiagnosticScore['confidence']) => {
    switch (confidence) {
      case 'alta':
        return { text: 'Confiança Alta', bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300' };
      case 'moderada':
        return { text: 'Confiança Sólida', bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300' };
      case 'baixa':
        return { text: 'Confiança Inicial', bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300' };
      default:
        return { text: 'Evidências Insuficientes', bg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300' };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-[#241e33] dark:text-slate-100">
      
      {/* ========================================================================= */}
      {/* 1. CABEÇALHO DO DIAGNÓSTICO COM MÉTRICAS LONGITUDINAIS                      */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-[#1a0b2e] via-[#2d1254] to-[#451b75] text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-400/20 text-purple-200 border border-purple-300/30 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Diagnóstico Formativo Pedagógico
              </span>
              <span className="text-xs text-purple-200/80">
                · EEMTI Alfredo Machado
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
              Evolução e Domínio por Competência
            </h2>

            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              Acompanhamento contínuo da sua aprendizagem ética, cidadania e prevenção ao bullying. 
              Os estágios evoluem com base em evidências reais de respostas em quizzes, cenários analíticos e tomadas de decisão.
            </p>
          </div>

          {/* Cards de Resumo Rápido */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 self-stretch md:self-auto">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-center">
              <span className="text-[11px] text-purple-200 block font-medium">Domínio Global</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-white font-mono">{summary.overallMastery}%</span>
                <span className="text-[10px] text-purple-300">ponderado</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-center">
              <span className="text-[11px] text-purple-200 block font-medium">Evidências Válidas</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-amber-300 font-mono">{summary.totalValidEvidences}</span>
                <span className="text-[10px] text-purple-300">questões</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-center col-span-2 sm:col-span-1">
              <span className="text-[11px] text-purple-200 block font-medium">Estágios Superados</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-emerald-300 font-mono">{summary.unlockedStagesCount}</span>
                <span className="text-[10px] text-purple-300">níveis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Abas de Navegação Interna do Diagnóstico */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-purple-400/20">
          <button
            onClick={() => setActiveTab('painel')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'painel' 
                ? 'bg-white text-purple-950 shadow-md' 
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Painel das 5 Competências</span>
          </button>

          <button
            onClick={() => setActiveTab('evolucao')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'evolucao' 
                ? 'bg-white text-purple-950 shadow-md' 
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Linha do Tempo de Evolução</span>
          </button>

          <button
            onClick={() => setActiveTab('metas')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'metas' 
                ? 'bg-white text-purple-950 shadow-md' 
                : 'bg-white/10 text-purple-200 hover:bg-white/20'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Recomendações & Metas</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ABA 1: PAINEL DAS 5 COMPETÊNCIAS COM ESTÁGIOS E EXPANSÃO                   */}
      {/* ========================================================================= */}
      {activeTab === 'painel' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-lg text-[#241e33] dark:text-slate-100 flex items-center gap-2">
              <span>Trajetórias Formativas Individuais</span>
            </h3>
            <span className="text-xs text-[#5c546d] dark:text-slate-400">
              Clique em uma competência para abrir o diagnóstico pedagógico aprofundado
            </span>
          </div>

          <div className="space-y-3.5">
            {competenciesKeys.map((key) => {
              const diag = diagnostics[key];
              const meta = COMPETENCY_METADATA[key];
              const isExpanded = expandedKey === key;
              const confBadge = getConfidenceBadge(diag.confidence);

              return (
                <div
                  key={key}
                  className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'border-purple-400 shadow-md bg-white dark:bg-slate-900 ring-2 ring-purple-400/20' 
                      : 'border-purple-100 hover:border-purple-300 bg-white dark:bg-slate-900 shadow-xs'
                  }`}
                >
                  {/* Linha Principal Clicável */}
                  <div
                    onClick={() => setExpandedKey(isExpanded ? null : key)}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className={`p-3 rounded-2xl bg-${meta.primaryColor}-50 dark:bg-${meta.primaryColor}-950/40 text-${meta.primaryColor}-600 dark:text-${meta.primaryColor}-400 border border-${meta.primaryColor}-200/60`}>
                        {getIcon(key, "w-6 h-6")}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-display font-black text-base text-[#241e33] dark:text-white">
                            {meta.label}
                          </h4>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${confBadge.bg}`}>
                            {confBadge.text}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#5c546d] dark:text-slate-400">
                          <span className="font-semibold text-purple-700 dark:text-purple-300">
                            {diag.currentStage.badge}
                          </span>
                          <span>·</span>
                          <span>{diag.totalEvidences} evidências ({diag.correctEvidences} acertos)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-5">
                      {/* Percentual e Barra de Domínio */}
                      <div className="text-right min-w-[110px]">
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="font-mono font-black text-xl text-[#241e33] dark:text-white">
                            {diag.confidence === 'insuficiente' ? '—' : `${diag.masteryScore}%`}
                          </span>
                          <span className="text-[10px] text-[#5c546d] dark:text-slate-400">domínio</span>
                        </div>
                        <div className="w-28 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mt-1 ml-auto">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${meta.accentGradient} transition-all duration-700`}
                            style={{ width: `${diag.confidence === 'insuficiente' ? 0 : diag.masteryScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Detalhes Expansíveis Aprofundados */}
                  {isExpanded && (
                    <div className="p-5 sm:p-7 bg-purple-50/30 dark:bg-slate-950/40 border-t border-purple-100 dark:border-purple-900/40 space-y-6">
                      
                      {/* Descrição e Fundamento Legal */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900/40 space-y-2">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">
                            O que esta competência desenvolve
                          </span>
                          <p className="text-xs text-[#5c546d] dark:text-slate-300 leading-relaxed">
                            {meta.summary}
                          </p>
                          <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400">
                            <strong>Marco Legal:</strong> {meta.legalFramework}
                          </div>
                        </div>

                        {/* Estágio Atual e Próximo Objetivo */}
                        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900/40 space-y-2">
                          <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">
                            Estágio Atual de Desenvolvimento
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-[#241e33] dark:text-white">
                              {diag.currentStage.title} (Nível {diag.currentStage.level})
                            </span>
                          </div>
                          <p className="text-xs text-[#5c546d] dark:text-slate-300">
                            {diag.currentStage.description}
                          </p>

                          {diag.nextStage ? (
                            <div className="pt-2 border-t border-purple-100 dark:border-purple-900/40">
                              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                                Próximo Estágio: {diag.nextStage.title} (Progresso: {diag.stageProgressPercent}%)
                              </span>
                              <div className="text-[11px] text-[#5c546d] dark:text-slate-400 space-y-0.5">
                                <div>• Domínio mínimo requerido: {diag.nextStage.minMasteryScore}%</div>
                                <div>• Questões independentes necessárias: {diag.totalEvidences}/{diag.nextStage.minValidEvidences}</div>
                                {diag.nextStage.minAdvancedEvidences > 0 && (
                                  <div>• Questões difíceis/impossíveis superadas: {diag.advancedEvidences}/{diag.nextStage.minAdvancedEvidences}</div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="pt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              ⭐ Estágio máximo de excelência atingido nesta competência!
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Habilidades Demonstradas & Oportunidades de Crescimento */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                          <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Evidências de Pontos Fortes</span>
                          </div>
                          <ul className="text-xs text-emerald-900 dark:text-emerald-200 space-y-1.5 pl-1">
                            {diag.strengths.map((str, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>{str}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-2">
                          <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            <span>Foco de Aprendizagem & Prática</span>
                          </div>
                          <ul className="text-xs text-amber-900 dark:text-amber-200 space-y-1.5 pl-1">
                            {diag.growthAreas.map((gro, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">→</span>
                                <span>{gro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Objetivos Formativos da BNCC / Escola */}
                      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900/40 space-y-2">
                        <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">
                          Objetivos Pedagógicos Trabalhados
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {meta.learningObjectives.map((obj, i) => (
                            <div key={i} className="text-xs text-[#5c546d] dark:text-slate-300 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                              <span>{obj}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Nota de Confiança */}
                      <div className="p-3.5 rounded-xl bg-purple-100/50 dark:bg-purple-950/30 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-2">
                        <Info className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Critério de Confiança:</strong> {diag.confidenceReason}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 2: LINHA DO TEMPO DE EVOLUÇÃO E PROGRESSO LONGITUDINAL                 */}
      {/* ========================================================================= */}
      {activeTab === 'evolucao' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-200/80 dark:border-purple-900/40 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display font-black text-lg text-[#241e33] dark:text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span>Histórico de Marcos Conquistados</span>
                </h3>
                <p className="text-xs text-[#5c546d] dark:text-slate-400 mt-0.5">
                  Registro cronológico das mudanças de estágio legitimamente desbloqueadas pelo estudante.
                </p>
              </div>

              {/* Filtro por Competência */}
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-purple-600" />
                <select
                  value={selectedHistoryFilter}
                  onChange={(e) => setSelectedHistoryFilter(e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-slate-800 border border-purple-200 dark:border-purple-700 text-xs font-bold text-[#241e33] dark:text-slate-200"
                >
                  <option value="todas">Todas as Competências</option>
                  <option value="respeito">Respeito & Empatia</option>
                  <option value="convivencia">Convivência Democrática</option>
                  <option value="bullying">Prevenção ao Bullying</option>
                  <option value="cyber">Cidadania Digital</option>
                  <option value="direitos">Direitos & Legislação</option>
                </select>
              </div>
            </div>

            {summary.recentEvolutions.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-purple-50/50 dark:bg-slate-800/40 border border-dashed border-purple-200">
                <Award className="w-10 h-10 text-purple-300 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-[#241e33] dark:text-slate-200">
                  Nenhum marco avançado registrado ainda
                </h4>
                <p className="text-xs text-[#5c546d] dark:text-slate-400 max-w-md mx-auto mt-1">
                  Ao concluir desafios com índice de acerto compatível e variedade de questões, seus novos estágios serão gravados aqui permanentemente.
                </p>
              </div>
            ) : (
              <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-200 dark:before:bg-purple-800">
                {summary.recentEvolutions
                  .filter(ev => selectedHistoryFilter === 'todas' || ev.competency === selectedHistoryFilter)
                  .map((ev, index) => {
                    const meta = COMPETENCY_METADATA[ev.competency];
                    return (
                      <div key={index} className="relative group">
                        <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-purple-600 flex items-center justify-center text-purple-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>

                        <div className="p-4 rounded-2xl bg-purple-50/40 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-800/50 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-bold text-sm text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                              {getIcon(ev.competency, "w-4 h-4")}
                              <span>{meta.shortName}: {ev.stageTitle}</span>
                            </span>
                            <span className="text-[11px] font-mono text-[#5c546d] dark:text-slate-400">
                              {new Date(ev.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <p className="text-xs text-[#5c546d] dark:text-slate-300">
                            {ev.milestone}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ABA 3: RECOMENDAÇÕES PEDAGÓGICAS INTELIGENTES & PRÓXIMAS METAS             */}
      {/* ========================================================================= */}
      {activeTab === 'metas' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-200/80 dark:border-purple-900/40 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <h3 className="font-display font-black text-lg text-[#241e33] dark:text-white">
                  Plano Personalizado de Aprendizagem
                </h3>
              </div>
              <p className="text-xs text-[#5c546d] dark:text-slate-400 mt-1">
                Atividades recomendadas automaticamente para preencher lacunas de aprendizagem observadas no seu diagnóstico real.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec) => {
                const meta = COMPETENCY_METADATA[rec.competency];
                return (
                  <div
                    key={rec.id}
                    className="p-5 rounded-2xl bg-purple-50/40 dark:bg-slate-800/50 border border-purple-100 dark:border-purple-800/60 flex flex-col justify-between space-y-4 hover:border-purple-300 transition-all shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                          {getIcon(rec.competency, "w-3.5 h-3.5")}
                          <span>{meta.shortName}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white dark:bg-slate-900 border border-purple-200 text-purple-700 dark:text-purple-300">
                          {rec.difficultyLabel}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-[#241e33] dark:text-white line-clamp-1">
                        {rec.title}
                      </h4>

                      <p className="text-xs text-[#5c546d] dark:text-slate-300 line-clamp-2">
                        {rec.description}
                      </p>

                      <div className="p-2.5 rounded-xl bg-purple-100/60 dark:bg-purple-950/40 text-[11px] text-purple-900 dark:text-purple-200">
                        <strong>Por que esta atividade?</strong> {rec.pedagogicalReason}
                      </div>
                    </div>

                    {onOpenActivity && (
                      <button
                        onClick={() => onOpenActivity(rec.targetId, rec.targetType)}
                        className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Abrir Desafio Recomendado</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NOTA DE ÉTICA, PRIVACIDADE E ISOLAMENTO DAS DENÚNCIAS                     */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <span className="font-bold block">
            Princípios Formativos & Blindagem de Privacidade do StopBullying:
          </span>
          <p>
            1. <strong>Finalidade Pedagógica Exclusiva:</strong> Este diagnóstico mede estritamente a interpretação ética em situações escolares hipotéticas. Não constitui perfilamento psicológico, julgamento moral ou rotulação de caráter.
          </p>
          <p>
            2. <strong>Isolamento Absoluto do Canal de Denúncias:</strong> O canal de denúncias anônimas da EEMTI Alfredo Machado permanece 100% blindado e desvinculado dos quizzes. Respostas e estágios de competências jamais cruzam dados com relatos sigilosos.
          </p>
        </div>
      </div>

    </div>
  );
};
