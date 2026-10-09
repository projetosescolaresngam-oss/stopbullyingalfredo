import React, { useState } from 'react';
import { QuizQuestion } from '../../data/centralRespeitoData';
import { useAutoScrollIntoView } from '../../hooks/useAutoScrollIntoView';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Scale, 
  Filter, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface AnswerRecord {
  question: QuizQuestion;
  selectedOption: number;
  isCorrect: boolean;
}

interface QuizReviewModalProps {
  records: AnswerRecord[];
  onClose: () => void;
  initialFilterErrorsOnly?: boolean;
}

export const QuizReviewModal: React.FC<QuizReviewModalProps> = ({
  records,
  onClose,
  initialFilterErrorsOnly = false
}) => {
  const modalRef = useAutoScrollIntoView();
  const [filterErrors, setFilterErrors] = useState(initialFilterErrorsOnly);

  const displayedRecords = filterErrors
    ? records.filter((r) => !r.isCorrect)
    : records;

  const totalErrors = records.filter((r) => !r.isCorrect).length;
  const totalCorrect = records.filter((r) => r.isCorrect).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div 
        ref={modalRef}
        className="w-full max-w-3xl rounded-3xl bg-[#0f1422] border-2 border-purple-500/40 shadow-2xl text-white overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Topo do Modal */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-4 bg-gradient-to-r from-purple-950/60 to-indigo-950/60 flex-shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                <BookOpen className="w-4 h-4" />
              </span>
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                Revisão Pedagógica do Desafio
              </h3>
            </div>
            <p className="text-xs text-gray-300">
              Analise suas respostas, compreenda os fundamentos legais e aprenda com cada detalhe.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
            title="Fechar revisão"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filtros: Todas vs Apenas Erros */}
        <div className="px-5 py-3 bg-black/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterErrors(false)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                !filterErrors
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>Todas as Questões ({records.length})</span>
            </button>

            <button
              onClick={() => setFilterErrors(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterErrors
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Apenas Erros ({totalErrors})</span>
            </button>
          </div>

          <div className="text-xs text-gray-400 flex items-center gap-3">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {totalCorrect} acertos
            </span>
            <span className="text-rose-400 font-bold flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> {totalErrors} erros
            </span>
          </div>
        </div>

        {/* Lista de Questões com Scroll */}
        <div 
          className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-white/10"
          data-auto-scroll-container="true"
          data-dense-container="true"
        >
          {displayedRecords.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-base text-white">Nenhum erro para revisar!</h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                Parabéns! Você gabaritou todas as questões ou todas as respostas selecionadas foram corretas.
              </p>
            </div>
          ) : (
            displayedRecords.map((rec, idx) => {
              const q = rec.question;
              const letters = ['A', 'B', 'C', 'D'];

              return (
                <div key={q.id} className={`pt-5 first:pt-0 space-y-3`}>
                  
                  {/* Cabeçalho da Questão */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                        rec.isCorrect 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}>
                        {rec.isCorrect ? 'Correta' : 'Incorreta'}
                      </span>
                      <span className="text-xs font-mono text-gray-400">
                        Questão {idx + 1}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-500/30">
                      {q.competencia.toUpperCase()}
                    </span>
                  </div>

                  {/* Enunciado */}
                  <h4 className="text-sm font-bold text-gray-100 leading-snug">
                    {q.pergunta}
                  </h4>

                  {/* As 4 Alternativas com Destaque */}
                  <div className="space-y-2 pt-1">
                    {q.opcoes.map((opt, optIdx) => {
                      const isUserChoice = rec.selectedOption === optIdx;
                      const isCorrectAnswer = q.correta === optIdx;

                      let cardStyle = "bg-white/5 border-white/10 text-gray-300";
                      let letterStyle = "bg-white/10 text-gray-400";

                      if (isCorrectAnswer) {
                        cardStyle = "bg-emerald-950/40 border-emerald-500/80 text-emerald-100 ring-1 ring-emerald-500/40 font-semibold";
                        letterStyle = "bg-emerald-500 text-black font-black";
                      } else if (isUserChoice && !rec.isCorrect) {
                        cardStyle = "bg-rose-950/40 border-rose-500/80 text-rose-100 ring-1 ring-rose-500/40";
                        letterStyle = "bg-rose-500 text-white font-black";
                      }

                      return (
                        <div 
                          key={optIdx} 
                          className={`p-3 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 transition-colors ${cardStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5 ${letterStyle}`}>
                            {letters[optIdx]}
                          </span>
                          <span className="flex-1">{opt}</span>

                          {isCorrectAnswer && (
                            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 flex-shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Gabarito Correto
                            </span>
                          )}
                          {isUserChoice && !rec.isCorrect && (
                            <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1 flex-shrink-0">
                              <XCircle className="w-3.5 h-3.5" /> Sua Escolha
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Justificativa e Fundamentação */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-black/40 to-indigo-950/40 border border-purple-500/30 text-xs space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-1.5 text-purple-300 font-bold text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Explicação Pedagógica &amp; Raciocínio:</span>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed pl-5">
                      {q.explicacao}
                    </p>
                    <div className="text-[10px] text-gray-400 pl-5 flex items-center gap-1 pt-0.5">
                      <Scale className="w-3 h-3 text-purple-400" />
                      <span><strong>Referência:</strong> {q.referencia}</span>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-gray-400">
            Conhecimento e reflexão transformam o ambiente escolar.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
          >
            Concluir Revisão
          </button>
        </div>
      </div>
    </div>
  );
};
