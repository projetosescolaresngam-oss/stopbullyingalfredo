import React, { useState } from 'react';
import { QuizChallenge, InteractiveStage } from '../../data/centralRespeitoData';
import { speakText } from '../../services/audioSynthesizer';
import { useAutoScrollIntoView } from '../../hooks/useAutoScrollIntoView';
import { 
  ArrowLeft, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen
} from 'lucide-react';

interface InteractiveStoryPlayerProps {
  challenge: QuizChallenge;
  onBack: () => void;
  onFinish: (score: number, totalPoints: number, maxStreak: number) => void;
}

interface ChoiceRecord {
  stage: InteractiveStage;
  chosenIndex: number;
  option: InteractiveStage['opcoes'][number];
}

export const InteractiveStoryPlayer: React.FC<InteractiveStoryPlayerProps> = ({
  challenge,
  onBack,
  onFinish
}) => {
  const stages = challenge.historiaStages || [];
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [choicesHistory, setChoicesHistory] = useState<ChoiceRecord[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const storyCardRef = React.useRef<HTMLDivElement>(null);
  const feedbackRef = useAutoScrollIntoView({ active: showFeedback || isFinished, delay: 60, block: 'nearest' });

  // Auto-scroll suave que centraliza o card da história na tela no início e a cada ato
  React.useEffect(() => {
    const performSmoothCenter = () => {
      const card = storyCardRef.current;
      if (card) {
        const rect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const cardHeight = rect.height;
        
        if (cardHeight < viewportHeight - 60) {
          const extraSpace = (viewportHeight - cardHeight) / 2;
          const targetY = Math.max(0, window.scrollY + rect.top - extraSpace);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        } else {
          const targetY = Math.max(0, window.scrollY + rect.top - 16);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const rafId = requestAnimationFrame(performSmoothCenter);
    const t1 = setTimeout(performSmoothCenter, 30);
    const t2 = setTimeout(performSmoothCenter, 100);
    const t3 = setTimeout(performSmoothCenter, 250);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentStageIdx, isFinished]);

  const currentStage = stages[currentStageIdx];
  const maxPossibleScore = stages.length * 25; // 25 max por etapa = 125 ou 100

  const handleSelectOption = (idx: number) => {
    if (selectedOptionIdx !== null) return;
    setSelectedOptionIdx(idx);
    setShowFeedback(true);

    const chosen = currentStage.opcoes[idx];
    setChoicesHistory((prev) => [
      ...prev,
      {
        stage: currentStage,
        chosenIndex: idx,
        option: chosen
      }
    ]);
  };

  const handleNextStage = () => {
    setSelectedOptionIdx(null);
    setShowFeedback(false);

    if (currentStageIdx + 1 < stages.length) {
      setCurrentStageIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
      const totalPoints = choicesHistory.reduce((sum, c) => sum + c.option.pontos, 0);
      onFinish(totalPoints, maxPossibleScore, 3);
    }
  };

  const handleRestart = () => {
    setCurrentStageIdx(0);
    setSelectedOptionIdx(null);
    setShowFeedback(false);
    setChoicesHistory([]);
    setIsFinished(false);
  };

  const handleSpeak = () => {
    if (!currentStage) return;
    const text = `${currentStage.titulo}. ${currentStage.narrativa}. ${currentStage.situacaoAtual}`;
    speakText(text);
  };

  if (!currentStage && !isFinished) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">História não encontrada.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl">
          Voltar
        </button>
      </div>
    );
  }

  // TELA FINAL DE RESULTADO DA HISTÓRIA
  if (isFinished) {
    const totalPoints = choicesHistory.reduce((sum, c) => sum + c.option.pontos, 0);
    const percent = Math.min(100, Math.round((totalPoints / maxPossibleScore) * 100));
    const isExemplary = percent >= 80;

    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#101628] via-[#0c101d] to-[#080a14] border-2 border-fuchsia-500/40 shadow-2xl text-center space-y-6 text-white">
          <div className="inline-block p-4 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-purple-800 border border-fuchsia-300 shadow-lg mx-auto">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-fuchsia-300">
              Desfecho do Caso Interativo
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white">
              {isExemplary ? 'Intervenção Restaurativa Notável!' : 'Caso Concluído: Lições Aprendidas'}
            </h2>
            <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
              {isExemplary
                ? 'Suas escolhas priorizaram a segurança da vítima, a preservação técnica das provas e a mediação institucional ética, evitando a escalada da violência.'
                : 'Suas decisões mostram que lidar com situações de bullying exige ponderar entre impulsos e medidas eficazes de proteção. Veja abaixo o desdobramento de cada escolha.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400 block font-medium">Pontuação Ética</span>
              <span className="text-2xl font-black text-fuchsia-400 font-mono">
                {totalPoints} / {maxPossibleScore}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400 block font-medium">Aproveitamento</span>
              <span className="text-2xl font-black text-white font-mono">{percent}%</span>
            </div>
          </div>

          {/* Histórico das Etapas */}
          <div className="space-y-4 text-left pt-4 border-t border-white/10">
            <h3 className="font-bold text-sm text-fuchsia-300 uppercase tracking-wider">
              Trajetória das Suas Decisões:
            </h3>

            {choicesHistory.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-gray-300">
                    Etapa {idx + 1}: {item.stage.titulo}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    item.option.impacto === 'positivo'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : item.option.impacto === 'neutro'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {item.option.impacto === 'positivo' ? '+25 pts (Excelente)' : item.option.impacto === 'neutro' ? '+10 pts (Omisso)' : '0 pts (Prejudicial)'}
                  </span>
                </div>

                <p className="text-xs text-gray-200 font-medium">
                  {item.option.texto}
                </p>

                <div className="p-2.5 rounded-xl bg-black/40 text-[11px] text-gray-300 space-y-1">
                  <p><strong className="text-fuchsia-300">Desdobramento:</strong> {item.option.consequencia}</p>
                  <p><strong className="text-purple-300">Análise Ética:</strong> {item.option.feedback}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Botões Finais */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Experimentar Outras Escolhas</span>
            </button>

            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Concluir e Voltar à Central</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // TELA DE ETAPA DA HISTÓRIA
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Topo / Progresso */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-200/70">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#241e33] border border-purple-200/80 shadow-xs transition-all cursor-pointer"
            title="Voltar à Central"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-bold text-fuchsia-600 uppercase tracking-wider block">
              Caso Interativo • História em 5 Atos
            </span>
            <h2 className="font-display text-lg sm:text-xl font-black text-[#241e33]">
              {challenge.titulo}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="p-2.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 shadow-xs transition-colors cursor-pointer"
            title="Ouvir narrativa"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-200 px-3 py-1.5 rounded-full shadow-xs">
            Etapa {currentStageIdx + 1} de {stages.length}
          </span>
        </div>
      </div>

      {/* Cartão da Narrativa */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-purple-200/80 shadow-lg space-y-5">
        <div className="flex items-center gap-2.5 pb-2 border-b border-purple-100">
          <span className="p-1.5 rounded-xl bg-fuchsia-100 text-fuchsia-700 font-mono text-xs font-black">
            ATO {currentStage.etapaNumero}
          </span>
          <h3 className="font-display font-black text-lg sm:text-xl text-[#241e33]">
            {currentStage.titulo}
          </h3>
        </div>

        {/* Texto da Narrativa */}
        <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 text-sm sm:text-base text-[#241e33] leading-relaxed font-serif">
          {currentStage.narrativa}
        </div>

        {/* Pergunta / Dilema Atual */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-fuchsia-500/10 to-purple-500/10 border border-fuchsia-200 text-xs sm:text-sm font-bold text-purple-900 flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-fuchsia-600 flex-shrink-0" />
          <span>{currentStage.situacaoAtual}</span>
        </div>

        {/* Lista de Alternativas de Decisão */}
        <div className="space-y-3 pt-2">
          {currentStage.opcoes.map((opcao, idx) => {
            const isSelected = selectedOptionIdx === idx;
            const disabled = selectedOptionIdx !== null;

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={disabled}
                className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm transition-all border-2 flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-fuchsia-600 bg-fuchsia-50 shadow-md ring-2 ring-fuchsia-300'
                    : disabled
                    ? 'border-slate-200 bg-slate-50 text-slate-600 font-normal'
                    : 'border-purple-200 bg-white hover:border-fuchsia-500 hover:bg-purple-50/40 text-[#1e172e]'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 border ${
                  isSelected
                    ? 'bg-fuchsia-600 text-white border-fuchsia-600'
                    : 'bg-purple-100 text-purple-800 border-purple-200'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="leading-snug flex-1 font-medium">{opcao.texto}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Imediato da Decisão: Nítido e com Alto Contraste */}
        {showFeedback && selectedOptionIdx !== null && (
          <div className="p-5 rounded-2xl bg-[#121226] text-white border-2 border-fuchsia-400 shadow-xl space-y-3 animate-fadeIn mt-4">
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5 ${
                currentStage.opcoes[selectedOptionIdx].impacto === 'positivo'
                  ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400'
                  : currentStage.opcoes[selectedOptionIdx].impacto === 'neutro'
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400'
                  : 'bg-rose-500/30 text-rose-200 border border-rose-400'
              }`}>
                {currentStage.opcoes[selectedOptionIdx].impacto === 'positivo' ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Decisão Ética Exemplar (+25 pts)
                  </>
                ) : currentStage.opcoes[selectedOptionIdx].impacto === 'neutro' ? (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Decisão Passiva / Omissão (+10 pts)
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Ação Prejudicial (0 pts)
                  </>
                )}
              </span>

              <span className="text-[11px] text-purple-200 font-mono font-bold">
                {currentStageIdx + 1} de {stages.length} etapas
              </span>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
              <p>
                <strong className="text-amber-300 font-bold">Desdobramento Imediato:</strong>{' '}
                {currentStage.opcoes[selectedOptionIdx].consequencia}
              </p>
              <p className="text-slate-200">
                <strong className="text-fuchsia-300 font-bold">Fundamento:</strong>{' '}
                {currentStage.opcoes[selectedOptionIdx].feedback}
              </p>
            </div>

            <button
              onClick={handleNextStage}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentStageIdx + 1 < stages.length ? 'Avançar para o Próximo Ato' : 'Ver Resultado Final do Caso'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
