import React, { useState } from 'react';
import { 
  NARRATIVE_STORIES, 
  NarrativeStory, 
  StoryCategory, 
  StoryDifficulty 
} from '../../../data/narrativeStoriesData';
import { 
  getAllNarrativeProgress, 
  getNarrativeSummaryStats
} from '../../../services/narrativeService';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Filter, 
  Compass,
  ArrowRight,
  Flame,
  Award,
  Layers,
  Gamepad2
} from 'lucide-react';

interface NarrativeHubViewProps {
  onSelectStory: (story: NarrativeStory) => void;
}

export const NarrativeHubView: React.FC<NarrativeHubViewProps> = ({
  onSelectStory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'todas'>('todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState<StoryDifficulty | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const progressMap = getAllNarrativeProgress();
  const summaryStats = getNarrativeSummaryStats(NARRATIVE_STORIES);

  // Filtros de busca
  const filteredStories = NARRATIVE_STORIES.filter(story => {
    const matchesCategory = selectedCategory === 'todas' || story.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'todas' || story.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const featuredStory = NARRATIVE_STORIES[0]; // O Caso do Grupo Secreto
  const featuredProgress = progressMap[featuredStory.id];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* ===================================================================== */}
      {/* 1. HERO BANNER: CENTRAL DE JOGOS NARRATIVOS (VISUAL GAMER & NOVEL)    */}
      {/* ===================================================================== */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#140b29] via-[#1f103d] to-[#0c081c] border-2 border-fuchsia-500/50 shadow-2xl p-6 sm:p-10 text-white">
        {/* Luzes volumétricas de fundo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            
            {/* Tags e Badges no Topo */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-fuchsia-500/25 text-fuchsia-200 border border-fuchsia-400/50 flex items-center gap-1.5 shadow-xs">
                <Gamepad2 className="w-3.5 h-3.5 text-fuchsia-300" />
                Jogo Narrativo Interativo • Visual Novel
              </span>

              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-purple-900/60 text-purple-200 border border-purple-500/40">
                {featuredStory.categoryLabel}
              </span>

              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                +{featuredStory.baseRewardXp} XP
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight">
              {featuredStory.title}
            </h2>

            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed max-w-2xl font-sans">
              {featuredStory.synopsis}
            </p>

            {/* Metadados do Caso em Formato Limpo */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <span className="text-purple-300 flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
                ~{featuredStory.estimatedDurationMinutes} min de imersão
              </span>
              <span className="text-purple-500">·</span>
              <span className="text-purple-300 font-mono">
                {featuredStory.difficultyLabel}
              </span>
              <span className="text-purple-500">·</span>
              <span className="text-purple-300 flex items-center gap-1.5 font-mono">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                5 Atos com Cenários Vivos & Dossiê de Pistas
              </span>
            </div>

            {/* Botão de Início do Jogo */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectStory(featuredStory)}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-fuchsia-950/80 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                {featuredProgress?.completed ? (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    <span>Rejogar Caso Destaque</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Jogar Caso Agora (+{featuredStory.baseRewardXp} XP)</span>
                  </>
                )}
                <ArrowRight className="w-4 h-4" />
              </button>

              {featuredProgress?.completed && (
                <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Concluído • {featuredProgress.bestPercent}% de Assertividade</span>
                </div>
              )}
            </div>
          </div>

          {/* Card com Preview Estilizado do Cenário da Biblioteca */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative p-5 rounded-3xl bg-slate-950/70 border-2 border-purple-500/40 text-center space-y-3 shadow-2xl max-w-xs w-full overflow-hidden">
              <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 border border-purple-500/30 flex items-center justify-center relative overflow-hidden">
                <span className="text-5xl z-10">{featuredStory.coverTheme.icon}</span>
                <div className="absolute inset-0 bg-radial from-fuchsia-500/30 to-transparent pointer-events-none" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-fuchsia-300 uppercase tracking-wider block">
                  Simulador de Decisão Escolar
                </span>
                <p className="text-xs text-purple-200 mt-1">
                  Cenários da EEMTI Alfredo Machado, personagens animados, leituras de chat e fundamentação na Lei 14.811/2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. PAINEL DE STATUS DO JOGADOR (ESTILO RPG / CONQUISTAS)              */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg text-white space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold font-mono">
            <span>Casos Concluídos</span>
            <BookOpen className="w-4 h-4 text-fuchsia-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
            {summaryStats.completedCount} <span className="text-sm text-slate-500 font-normal">/ {summaryStats.totalStories}</span>
          </span>
          <span className="text-[11px] text-purple-300 font-medium">Histórias vivenciadas</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg text-white space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold font-mono">
            <span>Assertividade Média</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">
            {summaryStats.averageAssertiveness}%
          </span>
          <span className="text-[11px] text-emerald-300 font-medium">Precisão ética nas escolhas</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg text-white space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold font-mono">
            <span>XP das Histórias</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono block">
            +{summaryStats.totalXpFromNarratives} XP
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Experiência acumulada</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg text-white space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold font-mono">
            <span>Evidências no Dossiê</span>
            <Search className="w-4 h-4 text-fuchsia-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-fuchsia-400 font-mono block">
            {summaryStats.unlockedCluesCount}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Pistas e prints analisados</span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. FILTROS E BUSCA DA BIBLIOTECA DE CASOS                             */}
      {/* ===================================================================== */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg space-y-4 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-fuchsia-400 block">
              Biblioteca de Jogos Narrativos
            </span>
            <h3 className="font-display font-black text-lg text-white">
              Escolha seu Caso & Viva a Experiência
            </h3>
          </div>

          {/* Campo de Busca Rápida */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Buscar por tema ou título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-2xl bg-purple-950/50 border border-purple-500/30 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-fuchsia-400"
            />
          </div>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-purple-900/40">
          <span className="text-xs font-bold text-purple-300 mr-1 flex items-center gap-1 font-mono">
            <Filter className="w-3.5 h-3.5 text-fuchsia-400" />
            Temas:
          </span>

          {[
            { id: 'todas', label: 'Todos os Casos' },
            { id: 'cyberbullying', label: 'Cyberbullying' },
            { id: 'exclusao', label: 'Exclusão Social' },
            { id: 'conflitos', label: 'Conflitos & Mediação' },
            { id: 'pressao_colegas', label: 'Pressão dos Colegas' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono ${
                selectedCategory === cat.id
                  ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-950/50 border border-fuchsia-400'
                  : 'bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-500/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. GRID DE CASOS: CARDS ESTILO JOGO / STEAM / VISUAL NOVEL           */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStories.map((story) => {
          const progress = progressMap[story.id];
          const isDone = progress?.completed;

          return (
            <div
              key={story.id}
              className={`rounded-3xl border-2 transition-all flex flex-col justify-between shadow-xl overflow-hidden bg-slate-950/90 text-white ${
                isDone 
                  ? 'border-emerald-500/60 ring-1 ring-emerald-500/30' 
                  : 'border-purple-500/40 hover:border-fuchsia-400 hover:shadow-2xl'
              }`}
            >
              <div>
                {/* Capa do Caso com Arte do Tema */}
                <div className={`p-6 bg-gradient-to-r ${story.coverTheme.gradient} text-white relative overflow-hidden`}>
                  <div className="flex items-center justify-between gap-2 relative z-10">
                    <span className="text-3xl p-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 inline-block shadow-md">
                      {story.coverTheme.icon}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-black/40 text-white border border-white/20">
                        +{story.baseRewardXp} XP
                      </span>

                      {isDone && (
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Feito ({progress.bestPercent}%)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 relative z-10 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-fuchsia-300 block">
                      {story.categoryLabel}
                    </span>
                    <h4 className="font-display font-black text-xl text-white leading-tight">
                      {story.title}
                    </h4>
                    <p className="text-xs text-purple-200/90 line-clamp-1">
                      {story.subtitle}
                    </p>
                  </div>
                </div>

                {/* Detalhes do Caso */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {story.synopsis}
                  </p>

                  {/* Informações Técnicas da Simulação */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono border-t border-purple-900/40 text-purple-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
                      ~{story.estimatedDurationMinutes} min
                    </span>
                    <span>·</span>
                    <span>5 Atos Ramificados</span>
                    <span>·</span>
                    <span className="text-fuchsia-300 font-bold">
                      {story.difficultyLabel}
                    </span>
                  </div>

                  {/* Competências Trabalhadas */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {story.competenciesWorked.map((comp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/30"
                      >
                        {comp === 'bullying' ? 'Cyberbullying' :
                         comp === 'convivencia' ? 'Convivência' :
                         comp === 'direitos' ? 'Legislação' :
                         comp === 'respeito' ? 'Respeito' : 'Apoio Emocional'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botão de Ação do Jogo */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectStory(story)}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isDone
                      ? 'bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40'
                      : 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white shadow-fuchsia-950/80 hover:scale-[1.01]'
                  }`}
                >
                  {isDone ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Rejogar & Explorar Outros Caminhos</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Iniciar Jogo Narrativo (+{story.baseRewardXp} XP)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
