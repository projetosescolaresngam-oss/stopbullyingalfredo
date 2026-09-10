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
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-100 via-white to-indigo-100 border border-purple-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
              Formação Cidadã AntiBullying
            </span>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {userStats.exploredBullyingTypes.length} / 8 Tipos Explorados (+15 XP cada)
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#241e33]">
            Matriz Completa de Tipos de Bullying &amp; Legislação
          </h2>
          <p className="text-xs text-[#5c546d] max-w-2xl leading-relaxed">
            Compreenda a fundo todas as manifestações de violência escolar, como agir ao presenciar ou vivenciar cada caso, e o respaldo da Lei Federal nº 13.185/2015 e Lei nº 14.811/2024.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex bg-white/90 p-1.5 rounded-2xl border border-purple-200 shadow-sm flex-shrink-0">
          <button
            onClick={() => setActiveTab('matriz')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'matriz'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-[#5c546d] hover:text-[#241e33]'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> 8 Tipos de Bullying
          </button>
          <button
            onClick={handleViewLaws}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'legislacao'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-[#5c546d] hover:text-[#241e33]'
            }`}
          >
            <Scale className="w-4 h-4" /> Leis &amp; Sanções (Art. 146-A)
          </button>
        </div>
      </div>

      {activeTab === 'matriz' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: 8 Cards Grid (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#786e8a] px-1">
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
                        ? 'bg-purple-100/90 border-purple-400 shadow-md ring-2 ring-purple-300'
                        : 'bg-white/95 border-purple-200 hover:border-purple-300 hover:bg-purple-50/70 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-100 text-purple-800 font-bold text-sm">
                        🛡️
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-[#241e33]">{t.name}</h4>
                          {isExplored && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                        <span className={`text-[10px] font-bold uppercase ${
                          t.severityLevel === 'critico' ? 'text-rose-600' :
                          t.severityLevel === 'grave' ? 'text-amber-600' : 'text-blue-600'
                        }`}>
                          Gravidade: {t.severityLevel}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-purple-700 translate-x-1' : 'text-purple-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Analysis (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-purple-200 shadow-xl space-y-6 animate-fadeIn">
              
              {/* Type Header */}
              <div className="flex items-start justify-between gap-4 border-b border-purple-100 pb-5">
                <div className="space-y-1">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    selectedType.severityLevel === 'critico' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                    selectedType.severityLevel === 'grave' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                    'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    Gravidade: {selectedType.severityLevel.toUpperCase()}
                  </span>
                  <h3 className="font-display font-black text-2xl text-[#241e33]">
                    {selectedType.name}
                  </h3>
                  <p className="text-xs text-[#5c546d] leading-relaxed pt-1">
                    {selectedType.fullDescription}
                  </p>
                </div>
              </div>

              {/* Examples in Real Life */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-amber-800 flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 text-amber-600" /> Exemplos Frequentes na Escola
                </h4>
                <div className="space-y-2">
                  {selectedType.examples.map((ex, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-[#241e33] flex items-start gap-2.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning Signs */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase text-rose-800 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-rose-600" /> Sinais de Alerta (Vítima)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedType.warningSigns.map((sign, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 text-[11px] text-[#241e33]">
                      {sign}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Plan Bento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                  <h5 className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    🎓 Se Você For a Vítima:
                  </h5>
                  <ul className="text-[11px] text-[#473e57] space-y-1.5 list-disc list-inside">
                    {selectedType.howToActStudent.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                  <h5 className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                    🦸 Se Você For Testemunha (Upstander):
                  </h5>
                  <ul className="text-[11px] text-[#473e57] space-y-1.5 list-disc list-inside">
                    {selectedType.howToActWitness.map((wt, i) => (
                      <li key={i}>{wt}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Legal Framework Tag */}
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-between text-xs">
                <span className="text-[#5c546d] font-medium">Enquadramento Legal:</span>
                <span className="font-bold text-purple-900 font-mono">{selectedType.legalFramework}</span>
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
                className="p-6 rounded-3xl bg-white/95 border border-purple-200 space-y-4 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-mono">
                      {art.number}
                    </span>
                    <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5" /> Legislação Federal
                    </span>
                  </div>
                  <h4 className="font-display font-black text-lg text-[#241e33]">
                    {art.title}
                  </h4>
                  <blockquote className="p-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-[#5c546d] italic leading-relaxed">
                    "{art.content}"
                  </blockquote>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <strong className="block text-[10px] uppercase font-black text-emerald-800 mb-0.5">
                    Aplicação Prática no Cotidiano:
                  </strong>
                  {art.practicalApplication}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-2xl bg-rose-100 text-rose-700 text-2xl flex-shrink-0">
              ⚖️
            </div>
            <div className="space-y-1 text-xs text-rose-950">
              <h5 className="font-bold text-sm text-rose-900">
                Atenção à Lei nº 14.811/2024: Cyberbullying é Crime Gravíssimo
              </h5>
              <p className="text-rose-900/80">
                A legislação brasileira não tolera intimidação virtual, exposição vexatória e perseguição digital. A escola e os órgãos de proteção (Conselho Tutelar e Ministério Público) atuam de forma coordenada para garantir a segurança integral de todos os estudantes.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
