import React, { useState } from 'react';
import { ViewMode } from '../types';
import { 
  TrafficCone, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight,
  HeartHandshake,
  Megaphone,
  Radio
} from 'lucide-react';

interface TriagemModuleProps {
  onBack: () => void;
  onNavigate: (view: ViewMode) => void;
}

export const TriagemModule: React.FC<TriagemModuleProps> = ({ onBack, onNavigate }) => {
  const [selectedLevel, setSelectedLevel] = useState<'verde' | 'amarelo' | 'vermelho' | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <TrafficCone className="w-6 h-6 text-amber-400" />
              Triagem de Caso (Semáforo)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Classificação por nível de gravidade e recomendação de conduta imediata
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-300">
        Selecione o cartão que melhor reflete a situação para visualizar o protocolo recomendado pela coordenação pedagógica da EEMTI Alfredo Machado:
      </p>

      {/* Traffic Light Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Green */}
        <div
          onClick={() => setSelectedLevel('verde')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            selectedLevel === 'verde'
              ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500'
              : 'bg-[#121724] border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-950/30'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-400">Nível 1</span>
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
            </div>
            <h3 className="font-display text-lg font-extrabold text-white">
              🟢 Caso Leve / Conflito Pontual
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Desentendimento isolado ou atrito pontual sem violência física nem intimidação sistemática reiterada.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 mt-4 flex items-center gap-1">
            Ver conduta ›
          </span>
        </div>

        {/* Yellow */}
        <div
          onClick={() => setSelectedLevel('amarelo')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            selectedLevel === 'amarelo'
              ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-500/20 ring-2 ring-amber-500'
              : 'bg-[#121724] border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-950/30'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-400">Nível 2</span>
              <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_#F59E0B]" />
            </div>
            <h3 className="font-display text-lg font-extrabold text-white">
              🟡 Caso Recorrente / Sistemático
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Humilhações frequentes, exclusão sistemática em grupos ou episódios contínuos de cyberbullying.
            </p>
          </div>
          <span className="text-[11px] font-bold text-amber-400 mt-4 flex items-center gap-1">
            Ver conduta ›
          </span>
        </div>

        {/* Red */}
        <div
          onClick={() => setSelectedLevel('vermelho')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
            selectedLevel === 'vermelho'
              ? 'bg-red-950/60 border-red-500 shadow-lg shadow-red-500/20 ring-2 ring-red-500'
              : 'bg-[#121724] border-red-500/30 hover:border-red-500/60 hover:bg-red-950/30'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-red-400">Nível 3</span>
              <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_#EF4444]" />
            </div>
            <h3 className="font-display text-lg font-extrabold text-white">
              🔴 Caso Grave / Risco Físico
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Agressão física, chantagem, extorsão ou ameaça com risco imediato à integridade do estudante.
            </p>
          </div>
          <span className="text-[11px] font-bold text-red-400 mt-4 flex items-center gap-1">
            Ver conduta ›
          </span>
        </div>

      </div>

      {/* Result Protocol Card */}
      {selectedLevel && (
        <div className="p-6 rounded-3xl bg-[#121724] border border-white/10 shadow-2xl space-y-4 animate-fadeIn">
          
          {selectedLevel === 'verde' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
                <h4 className="font-display text-lg font-bold text-white">
                  Protocolo para Caso Leve / Conflito Pontual (🟢)
                </h4>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Situação pontual sem agressão física nem intimidação sistemática continuada. O caminho ideal é a mediação dialógica através de um professor de confiança, da comissão de convivência democrática ou do apoio emocional.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('apoio')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4" />
                  Acessar Apoio Emocional (4-7-8)
                </button>
                <button
                  onClick={() => onNavigate('denuncia')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-xs border border-white/10 transition-all cursor-pointer"
                >
                  Registrar Registro Preventivo
                </button>
              </div>
            </div>
          )}

          {selectedLevel === 'amarelo' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle className="w-6 h-6" />
                <h4 className="font-display text-lg font-bold text-white">
                  Protocolo para Caso Recorrente / Perseguição (🟡)
                </h4>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Intimidação sistemática caracterizada conforme a <strong className="text-white">Lei Federal nº 13.185/2015</strong>. Recomendamos registrar imediatamente a denúncia anônima para que a coordenação pedagógica adote medidas restaurativas e acolhimento com a família.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('denuncia')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Megaphone className="w-4 h-4" />
                  Fazer Denúncia Anônima com Protocolo
                </button>
                <button
                  onClick={() => onNavigate('apoio')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-xs border border-white/10 transition-all cursor-pointer"
                >
                  Exercício de Respiração Anti-ansiedade
                </button>
              </div>
            </div>
          )}

          {selectedLevel === 'vermelho' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-red-500">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
                <h4 className="font-display text-lg font-bold text-white">
                  Protocolo para Caso Grave / Ameaça Física Iminente (🔴)
                </h4>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Agressão física ou risco iminente de violência grave. Tipificado pelo <strong className="text-white">Art. 146-A do Código Penal (Lei 14.811/2024)</strong>. Acione imediatamente o botão SOS com GPS ou procure a direção escolar / Conselho Tutelar.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('sos')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/40 animate-pulse transition-all cursor-pointer"
                >
                  <Radio className="w-4 h-4" />
                  🚨 Acionar SOS com GPS Agora
                </button>
                <button
                  onClick={() => onNavigate('denuncia')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-xs border border-white/10 transition-all cursor-pointer"
                >
                  Registrar Denúncia Anônima com Evidências
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
