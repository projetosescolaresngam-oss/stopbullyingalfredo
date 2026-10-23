import React, { useState, useEffect, useRef } from 'react';
import { 
  NarrativeStory, 
  NarrativeAct, 
  NarrativeChoice,
  NarrativeOutcome
} from '../../../data/narrativeStoriesData';
import { 
  recordStoryCompletion, 
  SaveStoryCompletionResult,
  getNarrativeProgress
} from '../../../services/narrativeService';
import { 
  speakText, 
  pauseSpeech, 
  resumeSpeech, 
  stopSpeech 
} from '../../../services/audioSynthesizer';
import { InvestigationBoardModal } from './InvestigationBoardModal';
import { ChoiceFeedbackPanel } from './ChoiceFeedbackPanel';
import { NarrativeOutcomeScreen } from './NarrativeOutcomeScreen';
import { NarrativeEnvironmentStage, SceneTheme } from './NarrativeEnvironmentStage';
import { VisualNovelCharacterStage } from './VisualNovelCharacterStage';
import { VisualNovelDialogueBox } from './VisualNovelDialogueBox';
import { useApp } from '../../../AppContext';
import { 
  ArrowLeft, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

interface NarrativePlayerModalProps {
  story: NarrativeStory;
  studentKey: string;
  onBack: () => void;
  onStoryFinished?: (result: SaveStoryCompletionResult) => void;
}

export const NarrativePlayerModal: React.FC<NarrativePlayerModalProps> = ({
  story,
  studentKey,
  onBack,
  onStoryFinished
}) => {
  const { awardXp } = useApp();
  const [currentActIdx, setCurrentActIdx] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);
  const [choicesHistory, setChoicesHistory] = useState<Array<{ actNumber: number; choice: NarrativeChoice }>>([]);
  const [isInvestigationOpen, setIsInvestigationOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finalResult, setFinalResult] = useState<SaveStoryCompletionResult | null>(null);

  // Áudio TTS
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const feedbackAnchorRef = useRef<HTMLDivElement>(null);

  const acts = story.acts;
  const currentAct = acts[currentActIdx];
  const actNumber = (currentActIdx + 1) as 1 | 2 | 3 | 4 | 5;

  // Interrompe áudio ao desmontar
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Rolagem suave quando a escolha for feita
  useEffect(() => {
    if (selectedChoiceIdx !== null && feedbackAnchorRef.current) {
      setTimeout(() => {
        feedbackAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  }, [selectedChoiceIdx]);

  // Manipulador de áudio TTS
  const handleToggleSpeak = () => {
    if (isSpeaking) {
      if (isPaused) {
        resumeSpeech();
        setIsPaused(false);
      } else {
        pauseSpeech();
        setIsPaused(true);
      }
      return;
    }

    const narrativeSpeechText = `${currentAct.actTitle}. ${currentAct.narrativa || currentAct.narrativeText || ''}. ${
      currentAct.dialogues ? currentAct.dialogues.map(d => `${d.speaker} disse: ${d.text}`).join('. ') : ''
    }. Situação de decisão: ${currentAct.currentDilemma}`;

    setIsSpeaking(true);
    setIsPaused(false);

    speakText(
      narrativeSpeechText,
      () => {
        setIsSpeaking(false);
        setIsPaused(false);
      },
      () => {
        setIsSpeaking(true);
        setIsPaused(false);
      }
    );
  };

  const handleStopSpeak = () => {
    stopSpeech();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // Seleção de alternativa
  const handleSelectChoice = (choiceIdx: number) => {
    if (selectedChoiceIdx !== null) return;
    setSelectedChoiceIdx(choiceIdx);
    const chosen = currentAct.choices[choiceIdx];
    setChoicesHistory(prev => [...prev, { actNumber, choice: chosen }]);
  };

  // Avançar para próximo ato ou tela de desfecho
  const handleAdvance = () => {
    handleStopSpeak();

    if (currentActIdx + 1 < acts.length) {
      setCurrentActIdx(prev => prev + 1);
      setSelectedChoiceIdx(null);
    } else {
      // Cálculo do desfecho final
      const allChoices = choicesHistory;
      const totalScore = allChoices.reduce((acc, curr) => acc + curr.choice.points, 0);

      // Determinar desfecho com base na assertividade
      const scoreRatio = totalScore / story.maxScore;
      let outcomeIndex = 0;
      if (scoreRatio >= 0.75) {
        outcomeIndex = 0; // sucesso_exemplar
      } else if (scoreRatio >= 0.45) {
        outcomeIndex = Math.min(1, story.outcomes.length - 1); // apoio_parcial
      } else {
        outcomeIndex = Math.max(0, story.outcomes.length - 1); // aprendizagem_necessaria
      }

      const outcomeData = story.outcomes[outcomeIndex] || story.outcomes[0];

      // Gravação com persistência e prevenção de duplicidade de XP
      const saveResult = recordStoryCompletion(
        story,
        studentKey,
        totalScore,
        allChoices,
        outcomeData.id
      );

      // Se for a primeira conclusão, concede XP real na aplicação
      if (saveResult.isFirstCompletion && saveResult.xpAwarded > 0) {
        awardXp(saveResult.xpAwarded);
      }

      setFinalResult(saveResult);
      setIsFinished(true);

      if (onStoryFinished) {
        onStoryFinished(saveResult);
      }
    }
  };

  // Reiniciar caso
  const handleRestart = () => {
    handleStopSpeak();
    setCurrentActIdx(0);
    setSelectedChoiceIdx(null);
    setChoicesHistory([]);
    setIsFinished(false);
    setFinalResult(null);
  };

  // Pistas desbloqueadas
  const unlockedCluesCount = story.investigationItems.filter(i => i.unlockAtAct <= actNumber).length;

  // Personagem do ato atual
  const currentCharacter = currentAct.character || 
    story.characters.find(c => c.id === currentAct.sceneSetting.characterPresentId) || 
    story.characters[0] || {
      id: 'sofia',
      name: 'Sofia',
      role: 'Colega de Turma',
      avatarType: 'aluna_oculos',
      description: 'Estudante dedicada',
      personality: 'Empática',
      accentColor: '#a855f7'
    };

  // Tema do cenário do ato atual
  const sceneTheme = (currentAct.sceneSetting.sceneTheme || 'biblioteca') as SceneTheme;

  // =========================================================================
  // RENDERIZAÇÃO DA TELA DE DESFECHO (SE FINALIZADO)
  // =========================================================================
  if (isFinished && finalResult) {
    const outcomeData = story.outcomes.find(o => o.id === finalResult.progress.lastOutcomeId) || story.outcomes[0];

    return (
      <div ref={containerRef} className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-16">
        <NarrativeOutcomeScreen
          story={story}
          outcome={outcomeData}
          choicesHistory={choicesHistory}
          totalScore={finalResult.progress.bestScore}
          xpEarned={finalResult.xpAwarded}
          isFirstCompletion={finalResult.isFirstCompletion}
          onRestart={handleRestart}
          onBackToHub={onBack}
        />
      </div>
    );
  }

  // =========================================================================
  // RENDERIZAÇÃO DO MODO DE NARRATIVA: JOGO INTERATIVO VISUAL NOVEL
  // =========================================================================
  return (
    <div ref={containerRef} className="max-w-5xl mx-auto space-y-4 animate-fadeIn pb-16">
      
      {/* 1. HUD SUPERIOR DO JOGO (GAME BAR MODERNA) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-3xl bg-slate-950/85 backdrop-blur-md border border-purple-500/40 shadow-xl text-white">
        
        {/* Esquerda: Botão Voltar + Título do Caso */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-purple-600/30 text-slate-300 hover:text-white border border-white/10 hover:border-purple-400 transition-all cursor-pointer"
            title="Voltar à Central de Histórias"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
              <span className="font-bold text-fuchsia-400">{story.categoryLabel}</span>
              <span className="text-purple-600">·</span>
              <span className="text-slate-400">{story.difficultyLabel}</span>
              <span className="text-purple-600">·</span>
              <span className="text-amber-300 font-bold">+{story.baseRewardXp || story.xpReward || 100} XP</span>
            </div>
            <h2 className="font-display font-black text-sm sm:text-lg text-white leading-tight">
              {story.title}
            </h2>
          </div>
        </div>

        {/* Direita: Mural de Investigação + Marcador de Atos */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Botão de Dossiê / Pistas */}
          <button
            onClick={() => setIsInvestigationOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-500/40 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md shadow-purple-950/60"
            title="Abrir Dossiê de Investigação e Provas"
          >
            <Search className="w-4 h-4 text-fuchsia-400" />
            <span className="hidden xs:inline">Dossiê de Pistas</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-fuchsia-600 text-white font-black rounded-full">
              {unlockedCluesCount}
            </span>
          </button>

          {/* Indicador de Ato Atual */}
          <div className="px-3 py-1.5 rounded-2xl bg-fuchsia-600/30 border border-fuchsia-400/50 text-fuchsia-200 font-mono font-bold text-xs">
            Ato {actNumber}/5
          </div>
        </div>

      </div>

      {/* 2. BARRA DE PROGRESSO EM 5 ATOS (PROGRESSÃO VISUAL) */}
      <div className="grid grid-cols-5 gap-2 px-1">
        {acts.map((_, idx) => {
          const isPast = idx < currentActIdx;
          const isCurrent = idx === currentActIdx;
          return (
            <div key={idx} className="space-y-1">
              <div
                className={`h-2 rounded-full transition-all ${
                  isPast
                    ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50'
                    : isCurrent
                    ? 'bg-fuchsia-500 ring-2 ring-fuchsia-400/50 ring-offset-2 ring-offset-slate-950 animate-pulse'
                    : 'bg-slate-800'
                }`}
              />
              <span className={`text-[10px] font-mono block text-center truncate ${
                isCurrent ? 'font-bold text-fuchsia-400' : isPast ? 'text-emerald-400' : 'text-slate-600'
              }`}>
                Ato {idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. O PALCO PRINCIPAL (STAGE): CENÁRIO IMERSIVO + PERSONAGEM INTEGRADO + CAIXA DE DIÁLOGO */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-2xl bg-slate-950">
        
        {/* O Cenário Escolar Completo em Primeiro Plano Visual */}
        <NarrativeEnvironmentStage
          theme={sceneTheme}
          locationName={currentAct.sceneSetting.location}
          timeOfDay={currentAct.sceneSetting.timeOfDay}
          atmosphere={currentAct.sceneSetting.atmosphere}
          className="min-h-[580px] sm:min-h-[640px] md:min-h-[700px] flex flex-col justify-end"
        >
          {/* Personagem Integrado à Cena (Proporção Visual Novel) */}
          <div className="w-full flex justify-center pb-2">
            <VisualNovelCharacterStage
              character={currentCharacter}
              speakerName={currentAct.dialogues?.[0]?.speaker}
              isSpeaking={isSpeaking}
            />
          </div>

          {/* Caixa de Diálogo & Decisão Interativa Posicionada na Base */}
          <div className="relative z-30 w-full">
            <VisualNovelDialogueBox
              story={story}
              act={currentAct}
              character={currentCharacter}
              selectedChoiceIdx={selectedChoiceIdx}
              isSpeakingAudio={isSpeaking}
              isPausedAudio={isPaused}
              onToggleAudio={handleToggleSpeak}
              onSelectChoice={handleSelectChoice}
            />
          </div>
        </NarrativeEnvironmentStage>

      </div>

      {/* 4. PAINEL DE FEEDBACK PEDAGÓGICO & RAMIFICAÇÃO (APARECE APÓS A ESCOLHA) */}
      <div ref={feedbackAnchorRef}>
        {selectedChoiceIdx !== null && (
          <ChoiceFeedbackPanel
            choice={currentAct.choices[selectedChoiceIdx]}
            currentActNumber={actNumber}
            totalActs={acts.length}
            onAdvance={handleAdvance}
          />
        )}
      </div>

      {/* 5. MODAL DO MURAL DE INVESTIGAÇÃO & DOSSIÊ */}
      <InvestigationBoardModal
        story={story}
        currentActNumber={actNumber}
        isOpen={isInvestigationOpen}
        onClose={() => setIsInvestigationOpen(false)}
      />

    </div>
  );
};
