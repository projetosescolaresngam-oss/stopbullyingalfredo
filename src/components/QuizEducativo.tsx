import React, { useState } from 'react';
import { QUIZ_QUESTOES } from '../data/initialData';
import { speakText } from '../services/audioSynthesizer';
import { useApp } from '../AppContext';
import { 
  BookOpen, 
  ArrowLeft, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface QuizEducativoProps {
  onBack: () => void;
}

export const QuizEducativo: React.FC<QuizEducativoProps> = ({ onBack }) => {
  const { recordQuizCompleted } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTOES[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Prevent double clicking
    setSelectedOption(idx);

    const isCorrect = idx === currentQ.correta;
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    setTimeout(() => {
      if (currentIndex + 1 < QUIZ_QUESTOES.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setIsCompleted(true);
        const percent = Math.round((newScore / QUIZ_QUESTOES.length) * 100);
        recordQuizCompleted(percent, QUIZ_QUESTOES.length);
      }
    }, 2800);
  };

  const handleSpeakQuestion = () => {
    const text = `${currentQ.pergunta} As opções são: ${currentQ.opcoes.join(', ')}`;
    speakText(text);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-200/70">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#241e33] border border-purple-200/80 shadow-sm transition-all cursor-pointer"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-[#241e33] flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
              Quiz &amp; Estatísticas Escolares
            </h2>
            <p className="text-xs sm:text-sm text-[#5c546d]">
              Conscientização sobre a Lei 13.185/2015, Lei 14.811/2024 e Convivência Democrática
            </p>
          </div>
        </div>

        {!isCompleted && (
          <span className="text-xs font-mono font-bold bg-purple-100 text-purple-800 border border-purple-200 px-3.5 py-1.5 rounded-full shadow-sm">
            Questão {currentIndex + 1} de {QUIZ_QUESTOES.length}
          </span>
        )}
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-purple-200/80 shadow-[0_8px_30px_rgba(124,58,237,0.08)] backdrop-blur-md space-y-6">
          
          {/* Question Title & TTS */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-base sm:text-lg font-bold text-[#241e33] leading-snug">
              {currentQ.pergunta}
            </h3>
            <button
              onClick={handleSpeakQuestion}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
              title="Ouvir questão por voz sintetizada"
            >
              <Volume2 className="w-4 h-4 text-purple-600" />
              Ouvir
            </button>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.opcoes.map((opt, idx) => {
              let btnClass = "bg-white/80 border-purple-200/80 text-[#241e33] hover:border-purple-400 hover:bg-purple-50/70 shadow-sm";
              
              if (selectedOption !== null) {
                if (idx === currentQ.correta) {
                  btnClass = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400 font-bold shadow-md";
                } else if (idx === selectedOption) {
                  btnClass = "bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-400 font-bold shadow-md";
                } else {
                  btnClass = "bg-gray-50/60 border-gray-200 text-gray-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm cursor-pointer flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <span className="leading-relaxed">{opt}</span>
                  {selectedOption !== null && idx === currentQ.correta && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  )}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQ.correta && (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {selectedOption !== null && (
            <div className={`p-4 rounded-2xl border animate-fadeIn text-xs sm:text-sm shadow-sm ${
              selectedOption === currentQ.correta 
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950' 
                : 'bg-rose-50/90 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {selectedOption === currentQ.correta ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-800">Correto!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span className="text-rose-800">Resposta Incorreta</span>
                  </>
                )}
              </div>
              <p className="text-[#3c344a] leading-relaxed">{currentQ.explicacao}</p>
              <span className="block mt-2 text-[11px] font-bold text-purple-700">
                Fundamento: {currentQ.referencia}
              </span>
            </div>
          )}

          {/* Progress Bar */}
          <div className="pt-2">
            <div className="flex justify-between text-[11px] text-[#5c546d] mb-1 font-semibold">
              <span>Progresso</span>
              <span>{Math.round(((currentIndex + 1) / QUIZ_QUESTOES.length) * 100)}%</span>
            </div>
            <div className="w-full bg-purple-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTOES.length) * 100}%` }}
              />
            </div>
          </div>

        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white/95 border border-purple-200/80 shadow-[0_8px_30px_rgba(124,58,237,0.1)] text-center space-y-6 animate-fadeIn backdrop-blur-md">
          <div className="w-20 h-20 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto text-amber-600 shadow-md">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-2xl font-black text-[#241e33]">
              🎉 Parabéns! Quiz Concluído!
            </h3>
            <p className="text-sm text-[#5c546d] max-w-md mx-auto">
              Você acertou <strong className="text-purple-700 text-lg font-bold">{score} de {QUIZ_QUESTOES.length}</strong> questões da pesquisa!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 max-w-md mx-auto text-xs text-[#241e33] leading-relaxed">
            Seu conhecimento fortalece a <strong>Convivência Democrática</strong> e a <strong>Prevenção ao Bullying</strong> na <strong>EEMTI Alfredo Machado</strong>.
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer Quiz
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#241e33] font-bold text-xs border border-purple-200/80 shadow-sm transition-all cursor-pointer"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}

      {/* Diagnostics Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50/80 via-white/90 to-indigo-50/80 border border-purple-200/80 shadow-sm flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-[#5c546d] leading-relaxed">
          <strong className="text-[#241e33] font-bold">Base Legal &amp; Censo Escolar:</strong> Conforme a Lei nº 14.811/2024 e o Art. 146-A do Código Penal, o bullying e o cyberbullying são crimes passíveis de medidas socioeducativas e sanções penais.
        </div>
      </div>

    </div>
  );
};
