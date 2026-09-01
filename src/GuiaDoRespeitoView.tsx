import React from 'react';
import { useApp } from './AppContext';
import { RESPECT_GUIDE_TOPICS } from './educationalData';
import { Sparkles, Heart, CheckCircle2, MessageSquare, Compass, Shield } from 'lucide-react';

export const GuiaDoRespeitoView: React.FC = () => {
  const { userStats, recordRespectCompleted } = useApp();

  const handleCompleteGuide = () => {
    recordRespectCompleted();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Hero Header */}
      <div className="text-center space-y-3 py-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-xs font-black uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-pink-400" />
          Pilares de Convivência Harmônica
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
          Guia do Respeito & Empatia Ativa
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Pequenas atitudes diárias transformam os corredores e salas da EEMTI Alfredo Machado em um território seguro, acolhedor e inspirador para todos.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESPECT_GUIDE_TOPICS.map(topic => (
          <div
            key={topic.id}
            className="p-6 rounded-3xl bg-[#0f1424] border border-purple-500/30 shadow-xl space-y-5 flex flex-col justify-between hover:border-purple-400/60 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-2xl shadow-inner">
                  {topic.icon}
                </div>
                <h3 className="font-display font-black text-lg text-white">
                  {topic.title}
                </h3>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {topic.description}
              </p>

              {/* Action checklist */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 block">
                  Como Praticar no Dia a Dia:
                </span>
                {topic.actionPoints.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300 bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reflection quote */}
            <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs italic text-purple-200 text-center">
              {topic.reflectionQuote}
            </div>
          </div>
        ))}
      </div>

      {/* Upstander 4D Interactive Protocol */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#131a30] to-purple-950/40 border border-blue-500/40 shadow-2xl space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs uppercase font-bold text-blue-400">Técnica Internacional de Intervenção</span>
          <h3 className="font-display font-black text-2xl text-white">
            O Método dos 4 D's da Testemunha Ativa
          </h3>
          <p className="text-xs text-gray-300 max-w-xl mx-auto">
            Quando você presencia alguém sofrendo bullying, pode intervir com segurança usando uma dessas 4 abordagens:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#0e1322] border border-white/10 space-y-2">
            <span className="text-sm font-black text-amber-400">1. DIRETO</span>
            <p className="text-xs text-gray-300">
              Se for seguro, diga com firmeza: "Isso não é engraçado, pare com isso."
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1322] border border-white/10 space-y-2">
            <span className="text-sm font-black text-cyan-400">2. DISTRAIR</span>
            <p className="text-xs text-gray-300">
              Mude o foco: "Ei, fulano, vamos logo que o professor de Matemática chamou a gente!"
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1322] border border-white/10 space-y-2">
            <span className="text-sm font-black text-purple-400">3. DELEGAR</span>
            <p className="text-xs text-gray-300">
              Busque um inspetor, coordenador ou professor imediatamente nos corredores.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0e1322] border border-white/10 space-y-2">
            <span className="text-sm font-black text-pink-400">4. DAR APOIO</span>
            <p className="text-xs text-gray-300">
              Após o ataque, fique ao lado da vítima e garanta que ela não está sozinha.
            </p>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={handleCompleteGuide}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            {userStats.completedRespectModule ? 'Módulo do Respeito Concluído (+30 XP Concedidos)' : 'Confirmar Leitura e Conquistar Insígnia do Respeito (+30 XP)'}
          </button>
        </div>
      </div>

    </div>
  );
};
