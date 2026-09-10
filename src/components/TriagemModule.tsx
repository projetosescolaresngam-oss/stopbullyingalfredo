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
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn text-[#241e33]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-200/80">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white hover:bg-purple-50 text-purple-900 border border-purple-200 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-[#241e33] flex items-center gap-2">
              <TrafficCone className="w-6 h-6 text-amber-500" />
              Triagem de Caso (Semáforo)
            </h2>
            <p className="text-xs sm:text-sm text-[#5c546d]">
              Classificação por nível de gravidade e recomendação de conduta imediata
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-[#5c546d]">
        Selecione o cartão que melhor reflete a situação para visualizar o protocolo recomendado pela coordenação pedagógica da EEMTI Alfredo Machado:
      </p>

      {/* Traffic Light Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Green */}
        <div
          onClick={() => setSelectedLevel('verde')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md ${
            selectedLevel === 'verde'
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400 shadow-emerald-900/10'
              : 'bg-white border-emerald-200/80 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-700">Nível 1</span>
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            </div>
            <h3 className="font-display text-base sm:text-lg font-extrabold text-[#241e33]">
              🟢 Caso Leve / Conflito Pontual
            </h3>
            <p className="text-xs text-[#5c546d] leading-relaxed">
              Desentendimento isolado ou atrito pontual sem violência física nem intimidação sistemática reiterada.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 mt-4 flex items-center gap-1">
            Ver conduta ›
          </span>
        </div>

        {/* Yellow */}
        <div
          onClick={() => setSelectedLevel('amarelo')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md ${
            selectedLevel === 'amarelo'
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400 shadow-amber-900/10'
              : 'bg-white border-amber-200/80 hover:border-amber-400 hover:bg-amber-50/50'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-700">Nível 2</span>
              <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_8px_#F59E0B]" />
            </div>
            <h3 className="font-display text-base sm:text-lg font-extrabold text-[#241e33]">
              🟡 Caso Recorrente / Sistemático
            </h3>
            <p className="text-xs text-[#5c546d] leading-relaxed">
              Humilhações frequentes, exclusão sistemática em grupos ou episódios contínuos de cyberbullying.
            </p>
          </div>
          <span className="text-[11px] font-bold text-amber-700 mt-4 flex items-center gap-1">
            Ver conduta ›
          </span>
        </div>

        {/* Red */}
        <div
          onClick={() => setSelectedLevel('vermelho')}
          className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-md ${
            selectedLevel === 'vermelho'
              ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400 shadow-rose-900/10'
              : 'bg-white border-rose-200/80 hover:border-rose-400 hover:bg-rose-50/50'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-rose-700">Nível 3</span>
              <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_8px_#EF4444]" />
            </div>
            <h3 className="font-display text-base sm:text-lg font-extrabold text-[#241e33]">
              🔴 Caso Grave / Risco Físico
            </h3>
            <p className="text-xs text-[#5c546d] leading-relaxed">
              Agressão física, chantagem, extorsão ou ameaça com risco imediato à integridade do estudante.
            </p>
          </div>
          <span className="text-[11px] font-bold text-rose-700 mt-4 flex items-center gap-1">
            Ver conduta ›
          </span>
        </div>

      </div>

      {/* Result Protocol Card */}
      {selectedLevel && (
        <div className="p-6 rounded-3xl bg-white/95 border border-purple-200/80 shadow-[0_4px_20px_rgba(124,58,237,0.08)] space-y-4 animate-fadeIn">
          
          {selectedLevel === 'verde' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-emerald-700">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h4 className="font-display text-lg font-bold text-[#241e33]">
                  Protocolo para Caso Leve / Conflito Pontual (🟢)
                </h4>
              </div>
              <p className="text-sm text-[#5c546d] leading-relaxed">
                Situação pontual sem agressão física nem intimidação sistemática continuada. O caminho ideal é a mediação dialógica através de um professor de confiança, da comissão de convivência democrática ou do apoio emocional.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('apoio')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4" />
                  Acessar Apoio Emocional (4-7-8)
                </button>
                <button
                  onClick={() => onNavigate('denuncia')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold text-xs border border-purple-200 transition-all cursor-pointer"
                >
                  Registrar Registro Preventivo
                </button>
              </div>
            </div>
          )}

          {selectedLevel === 'amarelo' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-amber-700">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                <h4 className="font-display text-lg font-bold text-[#241e33]">
                  Protocolo para Caso Recorrente / Perseguição (🟡)
                </h4>
              </div>
              <p className="text-sm text-[#5c546d] leading-relaxed">
                Intimidação sistemática caracterizada conforme a <strong className="text-[#241e33]">Lei Federal nº 13.185/2015</strong>. Recomendamos registrar imediatamente a denúncia anônima para que a coordenação pedagógica adote medidas restaurativas e acolhimento com a família.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('denuncia')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <Megaphone className="w-4 h-4" />
                  Fazer Denúncia Anônima com Protocolo
                </button>
                <button
                  onClick={() => onNavigate('apoio')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold text-xs border border-purple-200 transition-all cursor-pointer"
                >
                  Exercício de Respiração Anti-ansiedade
                </button>
              </div>
            </div>
          )}

          {selectedLevel === 'vermelho' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
                <h4 className="font-display text-lg font-bold text-[#241e33]">
                  Protocolo para Caso Grave / Ameaça Física Iminente (🔴)
                </h4>
              </div>
              <p className="text-sm text-[#5c546d] leading-relaxed">
                Agressão física ou risco iminente de violência grave. Tipificado pelo <strong className="text-[#241e33]">Art. 146-A do Código Penal (Lei 14.811/2024)</strong>. Acione imediatamente o botão SOS com GPS ou procure a direção escolar / Conselho Tutelar.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('sos')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold text-xs shadow-md shadow-rose-500/30 animate-pulse transition-all cursor-pointer"
                >
                  <Radio className="w-4 h-4" />
                  🚨 Acionar SOS com GPS Agora
                </button>
                <button
                  onClick={() => onNavigate('denuncia')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold text-xs border border-purple-200 transition-all cursor-pointer"
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
