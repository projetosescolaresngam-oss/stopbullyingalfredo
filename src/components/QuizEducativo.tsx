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
              <BookOpen className="w-6 h-6 text-blue-400" />
              Quiz &amp; Estatísticas Escolares
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Conscientização sobre a Lei 13.185/2015, Lei 14.811/2024 e Convivência Democrática
            </p>
          </div>
        </div>

        {!isCompleted && (
          <span className="text-xs font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-800 px-3 py-1 rounded-full">
            Questão {currentIndex + 1} de {QUIZ_QUESTOES.length}
          </span>
        )}
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121724] border border-white/10 shadow-2xl space-y-6">
          
          {/* Question Title & TTS */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
              {currentQ.pergunta}
            </h3>
            <button
              onClick={handleSpeakQuestion}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 text-xs font-bold transition-all cursor-pointer"
              title="Ouvir questão por voz sintetizada"
            >
              <Volume2 className="w-4 h-4" />
              Ouvir
            </button>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.opcoes.map((opt, idx) => {
              let btnClass = "bg-black/40 border-white/15 text-gray-200 hover:border-blue-500 hover:bg-blue-950/20";
              
              if (selectedOption !== null) {
                if (idx === currentQ.correta) {
                  btnClass = "bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500 font-bold";
                } else if (idx === selectedOption) {
                  btnClass = "bg-red-950/80 border-red-500 text-red-200 ring-2 ring-red-500 font-bold";
                } else {
                  btnClass = "bg-black/30 border-white/5 text-gray-500 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm cursor-pointer flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <span>{opt}</span>
                  {selectedOption !== null && idx === currentQ.correta && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  )}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQ.correta && (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {selectedOption !== null && (
            <div className={`p-4 rounded-2xl border animate-fadeIn text-xs sm:text-sm ${
              selectedOption === currentQ.correta 
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                : 'bg-red-950/40 border-red-500/50 text-red-200'
            }`}>
              <div className="flex items-center gap-2 font-bold mb-1">
                {selectedOption === currentQ.correta ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correto!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span>Resposta Incorreta</span>
                  </>
                )}
              </div>
              <p className="text-gray-300">{currentQ.explicacao}</p>
              <span className="block mt-2 text-[11px] font-bold text-gray-400">
                Fundamento: {currentQ.referencia}
              </span>
            </div>
          )}

          {/* Progress Bar */}
          <div className="pt-2">
            <div className="flex justify-between text-[11px] text-gray-400 mb-1">
              <span>Progresso</span>
              <span>{Math.round(((currentIndex + 1) / QUIZ_QUESTOES.length) * 100)}%</span>
            </div>
            <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / QUIZ_QUESTOES.length) * 100}%` }}
              />
            </div>
          </div>

        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-[#121724] border border-emerald-500/40 shadow-2xl text-center space-y-6 animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-2xl font-black text-white">
              🎉 Parabéns! Quiz Concluído!
            </h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Você acertou <strong className="text-amber-400 text-lg font-bold">{score} de {QUIZ_QUESTOES.length}</strong> questões da pesquisa!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 max-w-md mx-auto text-xs text-gray-300 leading-relaxed">
            Seu conhecimento fortalece a <strong>Convivência Democrática</strong> e a <strong>Prevenção ao Bullying</strong> na <strong>EEMTI Alfredo Machado</strong>.
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer Quiz
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-xs border border-white/10 transition-all cursor-pointer"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      )}

      {/* Diagnostics Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/30 to-black border border-red-500/30 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-gray-300 leading-relaxed">
          <strong className="text-red-300">Base Legal &amp; Censo Escolar:</strong> Conforme a Lei nº 14.811/2024 e o Art. 146-A do Código Penal, o bullying e o cyberbullying são crimes passíveis de medidas socioeducativas e sanções penais.
        </div>
      </div>

    </div>
  );
};
