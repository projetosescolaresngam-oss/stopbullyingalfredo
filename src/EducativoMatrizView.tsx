import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from './AppContext';
import { BULLYING_TYPES_DATA, LAW_ARTICLES_DATA } from './educationalData';
import { BullyingTypeDetail, ViewMode } from './types';
import { useAutoScrollIntoView } from './hooks/useAutoScrollIntoView';
import { StopHandLogo } from './components/BrandingAssets';
import { 
  GraduationCap, 
  ShieldAlert, 
  Scale, 
  AlertOctagon, 
  Search, 
  ArrowRight,
  BookOpen,
  CheckCircle2, 
  Filter, 
  Activity, 
  Users, 
  Smartphone, 
  HeartHandshake, 
  MessageSquareWarning, 
  UserMinus, 
  PackageX, 
  BrainCircuit, 
  Check, 
  RotateCcw, 
  Compass, 
  ChevronRight, 
  AlertTriangle, 
  Grid, 
  ListFilter, 
  ShieldCheck, 
  X, 
  Copy, 
  CheckCheck, 
  HelpCircle, 
  School,
  Eye,
  Info
} from 'lucide-react';

interface EducativoMatrizViewProps {
  onNavigate?: (view: ViewMode) => void;
}

export type AttentionLevel = 'todos' | 'baixa' | 'atencao' | 'importante' | 'urgente';
export type EnvironmentCategory = 'todos' | 'presencial' | 'digital' | 'relacional';
export type MatrixLayoutMode = 'grade_niveis' | 'matriz_ambientes' | 'cards_tipologia';

export const EducativoMatrizView: React.FC<EducativoMatrizViewProps> = ({ onNavigate }) => {
  const { userStats, recordTypeExplored, recordLawsViewed } = useApp();

  // Estados principais
  const [activeTab, setActiveTab] = useState<'matriz' | 'legislacao'>('matriz');
  const [selectedType, setSelectedType] = useState<BullyingTypeDetail>(BULLYING_TYPES_DATA[0]);
  const [matrixLayout, setMatrixLayout] = useState<MatrixLayoutMode>('grade_niveis');
  
  // Filtros
  const [selectedLevel, setSelectedLevel] = useState<AttentionLevel>('todos');
  const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentCategory>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOnlyPending, setFilterOnlyPending] = useState<boolean>(false);

  // Modal de apoio: Conflito vs Bullying
  const [showConflictGuide, setShowConflictGuide] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const detailCardRef = useAutoScrollIntoView({ active: !!selectedType, delay: 100 });
  const conflictGuideRef = useAutoScrollIntoView({ active: showConflictGuide, delay: 60 });
  const tabContentRef = useAutoScrollIntoView({ trigger: activeTab, delay: 80, block: 'nearest' });

  // Registra a exploração do tipo selecionado no progresso formativo
  useEffect(() => {
    if (selectedType?.id) {
      recordTypeExplored(selectedType.id);
    }
  }, [selectedType?.id]);

  const handleSelectType = (type: BullyingTypeDetail) => {
    setSelectedType(type);
    recordTypeExplored(type.id);
  };

  const handleViewLaws = () => {
    setActiveTab('legislacao');
    recordLawsViewed();
  };

  const handleCopySummary = (type: BullyingTypeDetail) => {
    const textToCopy = `[Stop Bullying] ${type.name}\n\nO que é:\n${type.fullDescription}\n\nExemplos no Cotidiano:\n${type.examples.map(e => `• ${e}`).join('\n')}\n\nSinais de Alerta:\n${type.warningSigns.map(s => `• ${s}`).join('\n')}\n\nSe você for a vítima:\n${type.howToActStudent.map(s => `• ${s}`).join('\n')}\n\nSe você for testemunha:\n${type.howToActWitness.map(w => `• ${w}`).join('\n')}\n\nEnquadramento Legal: ${type.legalFramework || 'Lei nº 13.185/2015 e Lei nº 14.811/2024'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(type.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Mapeamento conceitual de tipologias para Nível de Atenção da Matriz
  const getTypeAttentionLevel = (type: BullyingTypeDetail): 'urgente' | 'importante' | 'atencao' | 'baixa' => {
    if (type.id === 'fisico' || type.id === 'cyberbullying' || type.id === 'sexual') {
      return 'urgente';
    }
    if (type.id === 'verbal' || type.id === 'relacional' || type.id === 'psicologico' || type.id === 'moral') {
      return 'importante';
    }
    if (type.id === 'material') {
      return 'atencao';
    }
    return 'baixa';
  };

  // Mapeamento de tipologias para Ambiente predominante
  const getTypeEnvironment = (type: BullyingTypeDetail): 'presencial' | 'digital' | 'relacional' => {
    if (type.id === 'cyberbullying') return 'digital';
    if (type.id === 'relacional' || type.id === 'psicologico' || type.id === 'moral') return 'relacional';
    return 'presencial';
  };

  // Renderizador de Ícones das Tipologias
  const renderTypeIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'MessageSquareWarning': return <MessageSquareWarning className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'UserMinus': return <UserMinus className={className} />;
      case 'Smartphone': return <Smartphone className={className} />;
      case 'BrainCircuit': return <BrainCircuit className={className} />;
      case 'PackageX': return <PackageX className={className} />;
      case 'Scale': return <Scale className={className} />;
      case 'AlertTriangle': return <AlertTriangle className={className} />;
      default: return <AlertOctagon className={className} />;
    }
  };

  // Filtro dinâmico das categorias da matriz
  const filteredTypes = useMemo(() => {
    return BULLYING_TYPES_DATA.filter(t => {
      // Filtro de nível
      if (selectedLevel !== 'todos') {
        const typeLevel = getTypeAttentionLevel(t);
        if (typeLevel !== selectedLevel) return false;
      }

      // Filtro de ambiente
      if (selectedEnvironment !== 'todos') {
        const typeEnv = getTypeEnvironment(t);
        if (typeEnv !== selectedEnvironment) return false;
      }

      // Filtro de pendentes de estudo
      if (filterOnlyPending) {
        if (userStats.exploredBullyingTypes.includes(t.id)) return false;
      }

      // Busca por texto
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = t.name.toLowerCase().includes(q);
        const matchesShort = t.shortDescription.toLowerCase().includes(q);
        const matchesFull = t.fullDescription.toLowerCase().includes(q);
        const matchesExamples = t.examples.some(ex => ex.toLowerCase().includes(q));
        const matchesSigns = t.warningSigns.some(s => s.toLowerCase().includes(q));
        const matchesLaw = (t.legalFramework || '').toLowerCase().includes(q);
        return matchesName || matchesShort || matchesFull || matchesExamples || matchesSigns || matchesLaw;
      }

      return true;
    });
  }, [selectedLevel, selectedEnvironment, filterOnlyPending, searchQuery, userStats.exploredBullyingTypes]);

  // Grupos por nível de atenção para a visualização matricial
  const matrixGroupedByLevel = useMemo(() => {
    const groups: {
      urgente: BullyingTypeDetail[];
      importante: BullyingTypeDetail[];
      atencao: BullyingTypeDetail[];
      baixa: BullyingTypeDetail[];
    } = {
      urgente: [],
      importante: [],
      atencao: [],
      baixa: []
    };

    filteredTypes.forEach(t => {
      const lvl = getTypeAttentionLevel(t);
      groups[lvl].push(t);
    });

    return groups;
  }, [filteredTypes]);

  // Grupos por ambiente operacional (Presencial, Digital, Relacional)
  const matrixGroupedByEnvironment = useMemo(() => {
    const groups: {
      presencial: BullyingTypeDetail[];
      digital: BullyingTypeDetail[];
      relacional: BullyingTypeDetail[];
    } = {
      presencial: [],
      digital: [],
      relacional: []
    };

    filteredTypes.forEach(t => {
      const env = getTypeEnvironment(t);
      groups[env].push(t);
    });

    return groups;
  }, [filteredTypes]);

  const exploredCount = userStats.exploredBullyingTypes.length;
  const totalTypesCount = BULLYING_TYPES_DATA.length;
  const exploredPercent = Math.round((exploredCount / totalTypesCount) * 100);
  const isAnyFilterActive = selectedLevel !== 'todos' || selectedEnvironment !== 'todos' || searchQuery.trim().length > 0 || filterOnlyPending;

  const handleClearFilters = () => {
    setSelectedLevel('todos');
    setSelectedEnvironment('todos');
    setSearchQuery('');
    setFilterOnlyPending(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-6xl mx-auto pb-16 text-[#1e172e]">
      
      {/* ========================================================================= */}
      {/* 1. CABEÇALHO OFICIAL: STOP BULLYING                                      */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#1a1429] text-white shadow-xl border-2 border-purple-500/40 relative overflow-hidden">
        {/* Elemento de iluminação suave de fundo */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-900/90 text-amber-300 border border-purple-400/60 text-xs font-black tracking-wide shadow-xs">
                <StopHandLogo size={18} className="inline-block" />
                <span>STOP BULLYING</span>
              </div>
              <span className="text-[11px] font-bold text-purple-300 tracking-wide uppercase">
                • Matriz de Prevenção e Orientação
              </span>
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight">
              Matriz Anti-Bullying
            </h1>
            
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-normal">
              Conheça detalhadamente as tipologias de bullying, seus sinais de alerta e saiba exatamente como agir se você for vítima ou testemunha de qualquer ato violento.
            </p>
          </div>

          {/* Card de Progresso da Formação Cidadã */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[#241c38] p-4 rounded-2xl border border-purple-400/40 self-stretch md:self-auto shadow-md">
            <div className="space-y-1.5 pr-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-200">
                  Formação Cidadã
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40">
                  +{exploredCount * 15} XP
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-white font-mono">
                  {exploredCount} / {totalTypesCount}
                </span>
                <span className="text-xs text-purple-200 font-semibold">tipos explorados ({exploredPercent}%)</span>
              </div>
              <div className="w-full bg-purple-950 h-2.5 rounded-full overflow-hidden border border-purple-500/40">
                <div 
                  className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${exploredPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setShowConflictGuide(!showConflictGuide)}
              title="Guia Rápido: Conflito vs Bullying"
              className="p-3 rounded-xl bg-purple-800/80 hover:bg-purple-700 border border-purple-400 text-amber-300 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Alternador de Abas Principais: Matriz vs Legislação */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-purple-500/30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('matriz')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'matriz'
                  ? 'bg-white text-purple-950 shadow-md ring-2 ring-purple-300'
                  : 'bg-purple-950/60 hover:bg-purple-900 text-purple-200 border border-purple-500/40'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-purple-700" />
              <span>Matriz de Tipologias (8 Categorias)</span>
            </button>

            <button
              onClick={handleViewLaws}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'legislacao'
                  ? 'bg-white text-purple-950 shadow-md ring-2 ring-purple-300'
                  : 'bg-purple-950/60 hover:bg-purple-900 text-purple-200 border border-purple-500/40'
              }`}
            >
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Marco Legal &amp; Sanções (Leis 13.185 e 14.811)</span>
            </button>
          </div>

          <button
            onClick={() => setShowConflictGuide(prev => !prev)}
            className="text-xs font-bold text-purple-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>{showConflictGuide ? 'Ocultar Guia Diferencial' : 'Diferença: Conflito vs Bullying'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GUIA DE DIFERENCIAÇÃO: CONFLITO COMUM VS BULLYING SISTEMÁTICO            */}
      {/* ========================================================================= */}
      {showConflictGuide && (
        <div ref={conflictGuideRef} className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-indigo-200 shadow-md space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-900 font-bold">
                <Scale className="w-5 h-5 text-indigo-700" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Diferenciação Pedagógica: Conflito Comum vs Bullying Sistemático
                </h3>
                <p className="text-xs text-slate-600">
                  Critérios de avaliação para mediação justa e aplicação de medidas de convivência e proteção.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowConflictGuide(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Conflito Comum */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-black">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <span>CONFLITO COMUM (Atrito Cotidiano)</span>
              </div>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Ocorre de forma <strong>pontual ou esporádica</strong> entre pares com forças equivalentes.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Há <strong>demonstração de remorso</strong> e disposição mútua para resolver a desavença.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>Não visa aniquilar moralmente nem excluir a outra pessoa do convívio coletivo.</span>
                </li>
              </ul>
            </div>

            {/* Bullying Sistemático */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-300 space-y-2">
              <div className="flex items-center gap-2 text-rose-950 font-black">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                <span>BULLYING SISTEMÁTICO (Lei nº 13.185/15)</span>
              </div>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-700 font-bold">•</span>
                  <span>Agressões <strong>repetitivas, intencionais e sem motivação evidente</strong>.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-700 font-bold">•</span>
                  <span>Existe <strong>nítido desequilíbrio de poder</strong> (físico, social, numérico ou psicológico).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-rose-700 font-bold">•</span>
                  <span>Provoca <strong>sofrimento contínuo, medo e isolamento forçado</strong> na vítima.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PANORAMA CONCEITUAL DOS NÍVEIS DE ATENÇÃO (SEM NÚMEROS DE CASOS)      */}
      {/* ========================================================================= */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-700" />
            <h2 className="text-xs font-black uppercase tracking-wider text-[#1e172e]">
              Panorama de Níveis de Atenção Pedagógica
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
            Clique em um nível para filtrar as tipologias
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* URGENTE */}
          <div
            onClick={() => setSelectedLevel(selectedLevel === 'urgente' ? 'todos' : 'urgente')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md ${
              selectedLevel === 'urgente'
                ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300'
                : 'bg-white border-rose-200 hover:border-rose-400'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                  NÍVEL 4 • URGENTE
                </span>
                <ShieldAlert className="w-4 h-4 text-rose-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-rose-950">Intervenção Imediata</h3>
                <p className="text-[11px] text-slate-700 leading-tight">
                  Bullying Físico, Cyberbullying grave e Bullying Sexual. Requer resposta rápida e acolhimento protetivo.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-rose-800 mt-3 flex items-center gap-1">
              {selectedLevel === 'urgente' ? 'Filtro ativado (Clique para desmarcar)' : 'Ver tipologias urgentes ›'}
            </span>
          </div>

          {/* IMPORTANTE */}
          <div
            onClick={() => setSelectedLevel(selectedLevel === 'importante' ? 'todos' : 'importante')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md ${
              selectedLevel === 'importante'
                ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-300'
                : 'bg-white border-orange-200 hover:border-orange-400'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-950 border border-orange-300">
                  NÍVEL 3 • IMPORTANTE
                </span>
                <AlertTriangle className="w-4 h-4 text-orange-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-orange-950">Dano Moral &amp; Psicológico</h3>
                <p className="text-[11px] text-slate-700 leading-tight">
                  Bullying Verbal, Psicológico, Moral e Social. Hostilidade frequente que destrói a autoestima e o convívio.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-orange-800 mt-3 flex items-center gap-1">
              {selectedLevel === 'importante' ? 'Filtro ativado (Clique para desmarcar)' : 'Ver tipologias importantes ›'}
            </span>
          </div>

          {/* ATENÇÃO */}
          <div
            onClick={() => setSelectedLevel(selectedLevel === 'atencao' ? 'todos' : 'atencao')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md ${
              selectedLevel === 'atencao'
                ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300'
                : 'bg-white border-amber-200 hover:border-amber-400'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                  NÍVEL 2 • ATENÇÃO
                </span>
                <Activity className="w-4 h-4 text-amber-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-amber-950">Dano a Pertences &amp; Convivência</h3>
                <p className="text-[11px] text-slate-700 leading-tight">
                  Bullying Material e Patrimonial. Violação ou furto de objetos escolares, estojos e roupas.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-800 mt-3 flex items-center gap-1">
              {selectedLevel === 'atencao' ? 'Filtro ativado (Clique para desmarcar)' : 'Ver tipologias de atenção ›'}
            </span>
          </div>

          {/* BAIXA / CONFLITO COMUM */}
          <div
            onClick={() => setSelectedLevel(selectedLevel === 'baixa' ? 'todos' : 'baixa')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-md ${
              selectedLevel === 'baixa'
                ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                : 'bg-white border-emerald-200 hover:border-emerald-400'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  NÍVEL 1 • BAIXA
                </span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-emerald-950">Atrito Pontual Entre Pares</h3>
                <p className="text-[11px] text-slate-700 leading-tight">
                  Desavença pontual e sem desequilíbrio forçado de forças. Solucionada com escuta ativa e diálogo.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 mt-3 flex items-center gap-1">
              {selectedLevel === 'baixa' ? 'Filtro ativado (Clique para desmarcar)' : 'Ver orientações de nível 1 ›'}
            </span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONTEÚDO PRINCIPAL: MATRIZ vs LEGISLAÇÃO                               */}
      {/* ========================================================================= */}
      {activeTab === 'matriz' ? (
        <div ref={tabContentRef} className="space-y-6">

          {/* Barra de Filtros & Controles da Plataforma */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-purple-200/80 shadow-xs space-y-3">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              
              {/* Campo de Busca Rápida */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-purple-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar por bullying verbal, físico, sexual, cyberbullying, exemplos ou condutas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 text-xs font-medium rounded-xl bg-slate-50 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-[#1e172e]"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Controles de Visualização: Matriz por Níveis vs Por Ambientes vs Catálogo */}
              <div className="flex items-center gap-2 self-end lg:self-center">
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setMatrixLayout('grade_niveis')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                      matrixLayout === 'grade_niveis'
                        ? 'bg-white text-purple-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Exibição em Matriz por Níveis de Gravidade"
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Por Níveis</span>
                  </button>

                  <button
                    onClick={() => setMatrixLayout('matriz_ambientes')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                      matrixLayout === 'matriz_ambientes'
                        ? 'bg-white text-purple-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Exibição por Ambientes (Presencial, Digital, Relacional)"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Por Ambientes</span>
                  </button>

                  <button
                    onClick={() => setMatrixLayout('cards_tipologia')}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                      matrixLayout === 'cards_tipologia'
                        ? 'bg-white text-purple-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title="Exibição em Catálogo Completo"
                  >
                    <ListFilter className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Catálogo</span>
                  </button>
                </div>

                {isAnyFilterActive && (
                  <button
                    onClick={handleClearFilters}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Limpar</span>
                  </button>
                )}
              </div>

            </div>

            {/* Filtros Secundários */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              
              {/* Filtro por Nível */}
              <div 
                className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full scrollbar-none no-scrollbar"
                data-auto-scroll-container="true"
                data-dense-container="true"
              >
                <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Nível:
                </span>
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'urgente', label: '🔴 Urgente' },
                  { id: 'importante', label: '🟠 Importante' },
                  { id: 'atencao', label: '🟡 Atenção' }
                ].map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id as AttentionLevel)}
                    data-active={selectedLevel === lvl.id ? 'true' : undefined}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedLevel === lvl.id
                        ? 'bg-purple-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>

              {/* Filtro por Ambiente */}
              <div 
                className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full scrollbar-none no-scrollbar"
                data-auto-scroll-container="true"
                data-dense-container="true"
              >
                <span className="text-[11px] font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Compass className="w-3 h-3" /> Ambiente:
                </span>
                {[
                  { id: 'todos', label: 'Todos' },
                  { id: 'presencial', label: '🏫 Presencial' },
                  { id: 'digital', label: '📱 Digital' },
                  { id: 'relacional', label: '👥 Relacional' }
                ].map(env => (
                  <button
                    key={env.id}
                    onClick={() => setSelectedEnvironment(env.id as EnvironmentCategory)}
                    data-active={selectedEnvironment === env.id ? 'true' : undefined}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedEnvironment === env.id
                        ? 'bg-indigo-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {env.label}
                  </button>
                ))}

                {/* Filtro Pendentes de Estudo */}
                <button
                  onClick={() => setFilterOnlyPending(!filterOnlyPending)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ml-1 ${
                    filterOnlyPending
                      ? 'bg-amber-500 text-black'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200'
                  }`}
                >
                  ⚡ Pendentes ({totalTypesCount - exploredCount})
                </button>
              </div>

            </div>
          </div>

          {/* Feedback de Estado Vazio */}
          {filteredTypes.length === 0 ? (
            <div className="p-8 sm:p-12 text-center rounded-3xl bg-white border-2 border-purple-200 space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto border border-purple-200">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-black text-lg text-[#1e172e]">
                Nenhuma tipologia encontrada para estes filtros
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Tente ajustar os filtros de nível, ambiente ou termos de busca para visualizar as categorias da matriz.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-2 px-4 py-2 bg-purple-700 text-white font-bold text-xs rounded-xl hover:bg-purple-800 transition-colors cursor-pointer"
              >
                Restaurar Todas as 8 Tipologias
              </button>
            </div>
          ) : (

            /* Grid Principal: A Lista/Matriz à Esquerda e o Painel Detalhado à Direita */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* =================================================================== */}
              {/* LADO ESQUERDO: LISTA / MATRIZ DE TIPOLOGIAS (lg:col-span-5)         */}
              {/* =================================================================== */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-black uppercase tracking-wider text-[#1e172e]">
                    Tipologias de Bullying ({filteredTypes.length})
                  </span>
                  <span className="text-[11px] text-purple-700 font-bold">
                    Selecione para abrir as diretrizes ao lado 👉
                  </span>
                </div>

                {/* 1. VISÃO EM GRADE MATRICIAL POR NÍVEIS DE ATENÇÃO */}
                {matrixLayout === 'grade_niveis' && (
                  <div className="space-y-4">
                    
                    {/* Quadrante Urgente */}
                    {matrixGroupedByLevel.urgente.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-rose-50/70 border-2 border-rose-300 space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-black text-rose-900 border-b border-rose-200 pb-1.5">
                          <span className="flex items-center gap-1.5">
                            <ShieldAlert className="w-4 h-4 text-rose-600" />
                            Nível 4 • Urgente / Crítico
                          </span>
                          <span className="text-[10px] font-mono text-rose-700">
                            {matrixGroupedByLevel.urgente.length} tipo(s)
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {matrixGroupedByLevel.urgente.map(t => {
                            const isSelected = selectedType.id === t.id;
                            const isExplored = userStats.exploredBullyingTypes.includes(t.id);

                            return (
                              <button
                                key={t.id}
                                onClick={() => handleSelectType(t)}
                                className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-300 scale-[1.01]'
                                    : 'bg-white hover:bg-rose-50/50 border-rose-200 hover:border-rose-400'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-rose-100 text-rose-800 flex-shrink-0">
                                    {renderTypeIcon(t.icon)}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-bold text-xs text-[#1e172e]">{t.name}</h4>
                                      {isExplored && (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                      )}
                                    </div>
                                    <span className="text-[10px] text-slate-600 font-medium block line-clamp-1">
                                      {t.shortDescription}
                                    </span>
                                  </div>
                                </div>

                                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-rose-600 translate-x-1' : 'text-slate-400'}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Quadrante Importante */}
                    {matrixGroupedByLevel.importante.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-orange-50/70 border-2 border-orange-300 space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-black text-orange-950 border-b border-orange-200 pb-1.5">
                          <span className="flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            Nível 3 • Importante / Grave
                          </span>
                          <span className="text-[10px] font-mono text-orange-800">
                            {matrixGroupedByLevel.importante.length} tipo(s)
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {matrixGroupedByLevel.importante.map(t => {
                            const isSelected = selectedType.id === t.id;
                            const isExplored = userStats.exploredBullyingTypes.includes(t.id);

                            return (
                              <button
                                key={t.id}
                                onClick={() => handleSelectType(t)}
                                className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-300 scale-[1.01]'
                                    : 'bg-white hover:bg-orange-50/50 border-orange-200 hover:border-orange-400'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-orange-100 text-orange-900 flex-shrink-0">
                                    {renderTypeIcon(t.icon)}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-bold text-xs text-[#1e172e]">{t.name}</h4>
                                      {isExplored && (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                      )}
                                    </div>
                                    <span className="text-[10px] text-slate-600 font-medium block line-clamp-1">
                                      {t.shortDescription}
                                    </span>
                                  </div>
                                </div>

                                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-orange-600 translate-x-1' : 'text-slate-400'}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Quadrante Atenção */}
                    {matrixGroupedByLevel.atencao.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-amber-50/70 border-2 border-amber-300 space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-black text-amber-950 border-b border-amber-200 pb-1.5">
                          <span className="flex items-center gap-1.5">
                            <Activity className="w-4 h-4 text-amber-600" />
                            Nível 2 • Atenção / Moderado
                          </span>
                          <span className="text-[10px] font-mono text-amber-800">
                            {matrixGroupedByLevel.atencao.length} tipo(s)
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2">
                          {matrixGroupedByLevel.atencao.map(t => {
                            const isSelected = selectedType.id === t.id;
                            const isExplored = userStats.exploredBullyingTypes.includes(t.id);

                            return (
                              <button
                                key={t.id}
                                onClick={() => handleSelectType(t)}
                                className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected
                                    ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-300 scale-[1.01]'
                                    : 'bg-white hover:bg-amber-50/50 border-amber-200 hover:border-amber-400'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-lg bg-amber-100 text-amber-900 flex-shrink-0">
                                    {renderTypeIcon(t.icon)}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-bold text-xs text-[#1e172e]">{t.name}</h4>
                                      {isExplored && (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                      )}
                                    </div>
                                    <span className="text-[10px] text-slate-600 font-medium block line-clamp-1">
                                      {t.shortDescription}
                                    </span>
                                  </div>
                                </div>

                                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-600 translate-x-1' : 'text-slate-400'}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* 2. VISÃO POR AMBIENTES (Presencial, Digital, Relacional) */}
                {matrixLayout === 'matriz_ambientes' && (
                  <div className="space-y-4">
                    {/* Presencial */}
                    <div className="p-3.5 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black text-indigo-950 border-b border-indigo-200 pb-1.5">
                        <span className="flex items-center gap-1.5">
                          <School className="w-4 h-4 text-indigo-700" />
                          Ambiente Físico &amp; Sala de Aula
                        </span>
                        <span className="text-[10px] font-mono text-indigo-700">
                          {matrixGroupedByEnvironment.presencial.length} tipo(s)
                        </span>
                      </div>
                      <div className="space-y-2">
                        {matrixGroupedByEnvironment.presencial.map(t => {
                          const isSelected = selectedType.id === t.id;
                          const isExplored = userStats.exploredBullyingTypes.includes(t.id);
                          return (
                            <button
                              key={t.id}
                              onClick={() => handleSelectType(t)}
                              className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-300 font-bold'
                                  : 'bg-white hover:bg-indigo-50/50 border-indigo-100'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
                                  {renderTypeIcon(t.icon, "w-4 h-4")}
                                </div>
                                <span className="text-xs text-slate-900 font-bold">{t.name}</span>
                              </div>
                              {isExplored && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Digital */}
                    <div className="p-3.5 rounded-2xl bg-cyan-50/70 border-2 border-cyan-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black text-cyan-950 border-b border-cyan-200 pb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4 text-cyan-700" />
                          Ambiente Virtual &amp; Redes Sociais
                        </span>
                        <span className="text-[10px] font-mono text-cyan-700">
                          {matrixGroupedByEnvironment.digital.length} tipo(s)
                        </span>
                      </div>
                      <div className="space-y-2">
                        {matrixGroupedByEnvironment.digital.map(t => {
                          const isSelected = selectedType.id === t.id;
                          const isExplored = userStats.exploredBullyingTypes.includes(t.id);
                          return (
                            <button
                              key={t.id}
                              onClick={() => handleSelectType(t)}
                              className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-white border-cyan-600 shadow-md ring-2 ring-cyan-300 font-bold'
                                  : 'bg-white hover:bg-cyan-50/50 border-cyan-100'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-cyan-100 text-cyan-800">
                                  {renderTypeIcon(t.icon, "w-4 h-4")}
                                </div>
                                <span className="text-xs text-slate-900 font-bold">{t.name}</span>
                              </div>
                              {isExplored && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Relacional */}
                    <div className="p-3.5 rounded-2xl bg-purple-50/70 border-2 border-purple-200 space-y-2">
                      <div className="flex items-center justify-between text-xs font-black text-purple-950 border-b border-purple-200 pb-1.5">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-purple-700" />
                          Ambiente Social &amp; Relacional
                        </span>
                        <span className="text-[10px] font-mono text-purple-700">
                          {matrixGroupedByEnvironment.relacional.length} tipo(s)
                        </span>
                      </div>
                      <div className="space-y-2">
                        {matrixGroupedByEnvironment.relacional.map(t => {
                          const isSelected = selectedType.id === t.id;
                          const isExplored = userStats.exploredBullyingTypes.includes(t.id);
                          return (
                            <button
                              key={t.id}
                              onClick={() => handleSelectType(t)}
                              className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-white border-purple-600 shadow-md ring-2 ring-purple-300 font-bold'
                                  : 'bg-white hover:bg-purple-50/50 border-purple-100'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-purple-100 text-purple-800">
                                  {renderTypeIcon(t.icon, "w-4 h-4")}
                                </div>
                                <span className="text-xs text-slate-900 font-bold">{t.name}</span>
                              </div>
                              {isExplored && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. VISÃO EM LISTA COMPLETA (CATÁLOGO) */}
                {matrixLayout === 'cards_tipologia' && (
                  <div className="grid grid-cols-1 gap-2.5">
                    {filteredTypes.map(t => {
                      const isSelected = selectedType.id === t.id;
                      const isExplored = userStats.exploredBullyingTypes.includes(t.id);
                      const level = getTypeAttentionLevel(t);

                      return (
                        <button
                          key={t.id}
                          onClick={() => handleSelectType(t)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-purple-50 border-purple-600 shadow-md ring-2 ring-purple-300 scale-[1.01]'
                              : 'bg-white hover:bg-slate-50 border-purple-200 hover:border-purple-400'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900 font-bold flex-shrink-0">
                              {renderTypeIcon(t.icon)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-xs text-[#1e172e]">{t.name}</h4>
                                {isExplored && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                )}
                              </div>
                              <span className={`text-[10px] font-black uppercase ${
                                level === 'urgente' ? 'text-rose-700' :
                                level === 'importante' ? 'text-orange-700' : 'text-amber-700'
                              }`}>
                                Atenção: {level.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-purple-700 translate-x-1' : 'text-slate-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* =================================================================== */}
              {/* LADO DIREITO: PAINEL DETALHADO "BEM BONITINHO" (lg:col-span-7)     */}
              {/* =================================================================== */}
              <div className="lg:col-span-7 space-y-6">
                <div 
                  ref={detailCardRef} 
                  className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-purple-200/90 shadow-xl space-y-6 animate-fadeIn"
                >
                  
                  {/* Topo do Painel Detalhado */}
                  <div className="flex items-start justify-between gap-4 border-b-2 border-purple-100 pb-5">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                          selectedType.severityLevel === 'critico' ? 'bg-rose-100 text-rose-950 border-rose-300' :
                          selectedType.severityLevel === 'grave' ? 'bg-orange-100 text-orange-950 border-orange-300' :
                          'bg-amber-100 text-amber-950 border-amber-300'
                        }`}>
                          Nível: {selectedType.severityLevel.toUpperCase()}
                        </span>

                        <span className="text-[10px] font-bold text-purple-900 bg-purple-100 border border-purple-300 px-2 py-0.5 rounded-full">
                          Ambiente: {getTypeEnvironment(selectedType).toUpperCase()}
                        </span>

                        {userStats.exploredBullyingTypes.includes(selectedType.id) ? (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-700" /> Tipologia Estudada (+15 XP)
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                            Estudando agora
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 pt-1">
                        <div className="p-3 rounded-2xl bg-purple-100 text-purple-900 shadow-xs flex-shrink-0">
                          {renderTypeIcon(selectedType.icon, "w-6 h-6")}
                        </div>
                        <div>
                          <h3 className="font-display font-black text-xl sm:text-2xl text-[#1e172e]">
                            {selectedType.name}
                          </h3>
                          <p className="text-xs text-purple-700 font-semibold">
                            {selectedType.shortDescription}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopySummary(selectedType)}
                      title="Copiar resumo pedagógico"
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors flex-shrink-0 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                    >
                      {copiedId === selectedType.id ? (
                        <>
                          <CheckCheck className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 hidden sm:inline">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="hidden sm:inline">Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 1. O QUE É ESSA VIOLÊNCIA */}
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1.5">
                    <h4 className="text-xs font-black uppercase text-purple-950 flex items-center gap-2 tracking-wide">
                      <BookOpen className="w-4 h-4 text-purple-700" /> 
                      <span>O que é {selectedType.name}?</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                      {selectedType.fullDescription}
                    </p>
                  </div>

                  {/* 2. EXEMPLOS FREQUENTES NO COTIDIANO ESCOLAR */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-black uppercase text-amber-900 flex items-center gap-2 tracking-wide">
                      <AlertOctagon className="w-4 h-4 text-amber-600" /> 
                      <span>Exemplos Frequentes no Cotidiano</span>
                    </h4>
                    <div className="space-y-2">
                      {selectedType.examples.map((ex, i) => (
                        <div key={i} className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-[#1e172e] flex items-start gap-2.5 shadow-2xs">
                          <span className="text-amber-600 font-black text-sm leading-none">•</span>
                          <span className="font-medium leading-relaxed">{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. SINAIS DE ALERTA PARA PROFESSORES, COLEGAS E VÍTIMA */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-black uppercase text-rose-900 flex items-center gap-2 tracking-wide">
                      <Eye className="w-4 h-4 text-rose-600" /> 
                      <span>Sinais de Alerta para Professores, Colegas e Vítima</span>
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Como identificar precocemente que um estudante está passando por esta situação:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {selectedType.warningSigns.map((sign, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-xs text-[#1e172e] font-medium leading-snug flex items-start gap-2">
                          <span className="text-rose-500 font-bold text-xs">⚠️</span>
                          <span>{sign}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. PLANO DE CONDUTA: SE FOR VÍTIMA vs SE FOR TESTEMUNHA */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    
                    {/* Se você for uma vítima */}
                    <div className="p-4 rounded-2xl bg-blue-50/90 border-2 border-blue-200 space-y-2.5 shadow-2xs">
                      <h5 className="text-xs font-black text-blue-950 flex items-center gap-2 uppercase tracking-wide">
                        <span>🛡️</span>
                        <span>Se Você For uma Vítima: Como Agir</span>
                      </h5>
                      <ul className="text-xs text-slate-800 space-y-2">
                        {selectedType.howToActStudent.map((st, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-600 font-bold">•</span>
                            <span className="leading-relaxed">{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Se você for testemunha */}
                    <div className="p-4 rounded-2xl bg-purple-50/90 border-2 border-purple-200 space-y-2.5 shadow-2xs">
                      <h5 className="text-xs font-black text-purple-950 flex items-center gap-2 uppercase tracking-wide">
                        <span>🦸</span>
                        <span>Se Você For Testemunha: Como Reagir</span>
                      </h5>
                      <ul className="text-xs text-slate-800 space-y-2">
                        {selectedType.howToActWitness.map((wt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold">•</span>
                            <span className="leading-relaxed">{wt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Enquadramento Jurídico */}
                  <div className="p-4 rounded-2xl bg-slate-50 border-2 border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="text-slate-600 font-bold flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-purple-700" />
                      <span>Enquadramento Jurídico Institucional:</span>
                    </span>
                    <span className="font-bold text-purple-900 font-mono">
                      {selectedType.legalFramework || 'Lei Federal nº 13.185/2015 e Lei nº 14.811/2024'}
                    </span>
                  </div>

                  {/* Botão de Relato Sigiloso */}
                  {onNavigate && (
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate('denuncia')}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShieldAlert className="w-4 h-4 text-amber-300" />
                        <span>Fazer Relato Sigiloso Desta Conduta no Stop Bullying</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. RESUMO COMPACTO DE DIRETRIZES & FORMAÇÃO CIDADÃ                        */}
          {/* ========================================================================= */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-purple-200/80 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              
              <div className="space-y-1 sm:pr-4">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block">
                  Matriz Formativa
                </span>
                <span className="text-lg font-black text-[#1e172e]">
                  8 de 8 Tipologias
                </span>
                <p className="text-[11px] text-slate-600">
                  Estruturadas conforme as Leis Federais nº 13.185/15 e 14.811/24.
                </p>
              </div>

              <div className="space-y-1 sm:px-4 pt-3 sm:pt-0">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block">
                  Sua Formação Cidadã
                </span>
                <span className="text-lg font-black text-purple-900">
                  {exploredCount} Concluídos ({exploredPercent}%)
                </span>
                <p className="text-[11px] text-slate-600">
                  +{exploredCount * 15} XP acumulados no seu perfil de estudante.
                </p>
              </div>

              <div className="space-y-1 sm:pl-4 pt-3 sm:pt-0">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 block">
                  Compromisso Coletivo
                </span>
                <span className="text-lg font-black text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Cultura de Paz &amp; Respeito
                </span>
                <p className="text-[11px] text-slate-600">
                  Espaço de diálogo, escuta atenta e tolerância zero a qualquer violência.
                </p>
              </div>

            </div>
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* 5. ABA DE LEGISLAÇÃO & SANÇÕES                                            */
        /* ========================================================================= */
        <div className="space-y-6 animate-fadeIn">
          
          {/* Banner de Destaque da Lei 14.811/2024 */}
          <div className="p-6 rounded-3xl bg-rose-50 border-2 border-rose-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
            <div className="p-3.5 rounded-2xl bg-rose-100 text-rose-800 text-3xl flex-shrink-0">
              ⚖️
            </div>
            <div className="space-y-1 text-xs text-rose-950">
              <h4 className="font-display font-black text-base text-rose-950">
                Atenção à Lei Federal nº 14.811/2024: Intimidação Sistemática é Crime
              </h4>
              <p className="text-rose-900 leading-relaxed font-medium">
                A legislação tipificou a intimidação sistemática no Art. 146-A do Código Penal. Crimes cometidos em redes sociais, jogos online ou aplicativos de mensagens (cyberbullying) preveem <strong>pena de reclusão de 2 a 4 anos e multa</strong>. Toda a comunidade escolar atua integrada na proteção dos direitos fundamentais.
              </p>
            </div>
          </div>

          {/* Cards dos Artigos de Lei */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LAW_ARTICLES_DATA.map((art, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border-2 border-purple-200/90 space-y-4 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-mono font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
                      {art.number}
                    </span>
                    <span className="text-xs text-amber-900 font-bold flex items-center gap-1 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-md">
                      <Scale className="w-3.5 h-3.5 text-amber-700" /> Legislação Federal
                    </span>
                  </div>

                  <h4 className="font-display font-black text-base sm:text-lg text-[#1e172e]">
                    {art.title}
                  </h4>

                  <blockquote className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-slate-800 italic leading-relaxed">
                    "{art.content}"
                  </blockquote>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-xs text-emerald-950 space-y-1">
                  <strong className="block text-[10px] uppercase font-black text-emerald-900">
                    Aplicação Prática no Cotidiano Escolar:
                  </strong>
                  <p className="font-medium leading-relaxed">
                    {art.practicalApplication}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
