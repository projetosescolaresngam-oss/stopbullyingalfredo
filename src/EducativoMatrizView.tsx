import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { BULLYING_TYPES_DATA, LAW_ARTICLES_DATA } from './educationalData';
import { BullyingTypeDetail } from './types';
import { 
  GraduationCap, 
  ShieldAlert, 
  Scale, 
  AlertOctagon, 
  Search, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const EducativoMatrizView: React.FC = () => {
  const { userStats, recordTypeExplored, recordLawsViewed } = useApp();
  const [selectedType, setSelectedType] = useState<BullyingTypeDetail>(BULLYING_TYPES_DATA[0]);
  const [activeTab, setActiveTab] = useState<'matriz' | 'legislacao'>('matriz');

  useEffect(() => {
    recordTypeExplored(selectedType.id);
  }, [selectedType.id]);

  const handleSelectType = (type: BullyingTypeDetail) => {
    setSelectedType(type);
    recordTypeExplored(type.id);
  };

  const handleViewLaws = () => {
    setActiveTab('legislacao');
    recordLawsViewed();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-6xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#111827] to-indigo-950/50 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Formação Cidadã AntiBullying
            </span>
            <span className="text-xs font-bold text-amber-400">
              {userStats.exploredBullyingTypes.length} / 8 Tipos Explorados (+15 XP cada)
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Matriz Completa de Tipos de Bullying & Legislação
          </h2>
          <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
            Compreenda a fundo todas as manifestações de violência escolar, como agir ao presenciar ou vivenciar cada caso, e o respaldo da Lei Federal nº 13.185/2015 e Lei nº 14.811/2024.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 flex-shrink-0">
          <button
            onClick={() => setActiveTab('matriz')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'matriz'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> 8 Tipos de Bullying
          </button>
          <button
            onClick={handleViewLaws}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'legislacao'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" /> Leis & Sanções (Art. 146-A)
          </button>
        </div>
      </div>

      {activeTab === 'matriz' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: 8 Cards Grid (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 px-1">
              Selecione uma Categoria para Analisar:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {BULLYING_TYPES_DATA.map(t => {
                const isSelected = selectedType.id === t.id;
                const isExplored = userStats.exploredBullyingTypes.includes(t.id);

                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectType(t)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer w-full ${
                      isSelected
                        ? `${t.colorTheme.bg} ${t.colorTheme.border} shadow-lg ring-1 ring-white/20`
                        : 'bg-[#0f1424] border-white/10 hover:border-white/20 hover:bg-[#141b30]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${t.colorTheme.badgeBg} ${t.colorTheme.text} font-bold text-sm`}>
                        🛡️
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-white">{t.name}</h4>
                          {isExplored && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          )}
                        </div>
                        <span className={`text-[10px] font-bold uppercase ${
                          t.severityLevel === 'critico' ? 'text-red-400' :
                          t.severityLevel === 'grave' ? 'text-amber-400' : 'text-blue-400'
                        }`}>
                          Gravidade: {t.severityLevel}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-white translate-x-1' : 'text-gray-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Analysis (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`p-6 sm:p-8 rounded-3xl bg-[#0f1424] border-2 ${selectedType.colorTheme.border} shadow-2xl space-y-6 animate-fadeIn`}>
              
              {/* Type Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div className="space-y-1">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${selectedType.colorTheme.badgeBg} ${selectedType.colorTheme.text}`}>
                    Gravidade: {selectedType.severityLevel.toUpperCase()}
                  </span>
                  <h3 className="font-display font-black text-2xl text-white">
                    {selectedType.name}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed pt-1">
                    {selectedType.fullDescription}
                  </p>
                </div>
              </div>

              {/* Examples in Real Life */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4" /> Exemplos Frequentes na Escola
                </h4>
                <div className="space-y-2">
                  {selectedType.examples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-gray-300 flex items-start gap-2.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Signs */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-rose-400 flex items-center gap-1.5">
                  <Search className="w-4 h-4" /> Sinais de Alerta (Vítima)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedType.warningSigns.map((sign, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-[11px] text-gray-300">
                      {sign}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Plan Bento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="p-4 rounded-2xl bg-[#141b30] border border-blue-500/30 space-y-2">
                  <h5 className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    🎓 Se Você For a Vítima:
                  </h5>
                  <ul className="text-[11px] text-gray-300 space-y-1.5 list-disc list-inside">
                    {selectedType.howToActStudent.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#141b30] border border-purple-500/30 space-y-2">
                  <h5 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    🦸 Se Você For Testemunha (Upstander):
                  </h5>
                  <ul className="text-[11px] text-gray-300 space-y-1.5 list-disc list-inside">
                    {selectedType.howToActWitness.map((wt, i) => (
                      <li key={i}>{wt}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Legal Framework Tag */}
              <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">Enquadramento Legal:</span>
                <span className="font-bold text-amber-300 font-mono">{selectedType.legalFramework}</span>
              </div>

            </div>
          </div>

        </div>
      ) : (
        /* Legal Framework View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LAW_ARTICLES_DATA.map((art, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0f1424] border border-purple-500/30 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono">
                      {art.number}
                    </span>
                    <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5" /> Legislação Federal
                    </span>
                  </div>
                  <h4 className="font-display font-black text-lg text-white">
                    {art.title}
                  </h4>
                  <blockquote className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-gray-300 italic leading-relaxed">
                    "{art.content}"
                  </blockquote>
                </div>

                <div className="p-3 rounded-2xl bg-[#151c32] border border-emerald-500/30 text-xs text-emerald-300">
                  <strong className="block text-[10px] uppercase font-black text-emerald-400 mb-0.5">
                    Aplicação Prática no Cotidiano:
                  </strong>
                  {art.practicalApplication}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-[#141824] to-purple-950/40 border border-red-500/40 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-red-500/20 text-red-400 text-2xl flex-shrink-0">
              ⚖️
            </div>
            <div className="space-y-1 text-xs text-gray-300">
              <h5 className="font-bold text-sm text-white">
                Atenção à Lei nº 14.811/2024: Cyberbullying é Crime Gravíssimo
              </h5>
              <p>
                A legislação brasileira não tolera intimidação virtual, exposição vexatória e perseguição digital. A escola e os órgãos de proteção (Conselho Tutelar e Ministério Público) atuam de forma coordenada para garantir a segurança integral de todos os estudantes.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
