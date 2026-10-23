import React, { useState, useEffect } from 'react';
import { 
  NarrativeStory, 
  NarrativeAct, 
  NarrativeChoice,
  CharacterProfile 
} from '../../../data/narrativeStoriesData';
import { 
  MessageSquare, 
  ChevronRight, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Pause, 
  Play,
  Compass,
  CheckCircle2,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface VisualNovelDialogueBoxProps {
  story: NarrativeStory;
  act: NarrativeAct;
  character: CharacterProfile;
  selectedChoiceIdx: number | null;
  isSpeakingAudio: boolean;
  isPausedAudio: boolean;
  onToggleAudio: () => void;
  onSelectChoice: (choiceIdx: number) => void;
}

export const VisualNovelDialogueBox: React.FC<VisualNovelDialogueBoxProps> = ({
  story,
  act,
  character,
  selectedChoiceIdx,
  isSpeakingAudio,
  isPausedAudio,
  onToggleAudio,
  onSelectChoice
}) => {
  // Controle de modo interno da caixa de diálogo:
  // 'narrativa' -> texto de contextualização do cenário
  // 'dialogo' -> fala dos personagens em cena
  // 'decisao' -> apresentação do dilema e escolhas
  const hasDialogues = act.dialogues && act.dialogues.length > 0;
  const [dialogueStep, setDialogueStep] = useState<'narrativa' | 'dialogo' | 'decisao'>('narrativa');
  const [currentDialogueIdx, setCurrentDialogueIdx] = useState(0);

  // Reinicia estados quando o ato mudar
  useEffect(() => {
    setDialogueStep('narrativa');
    setCurrentDialogueIdx(0);
  }, [act.actNumber]);

  // Se o usuário selecionou uma escolha, fixar em 'decisao' para exibir o estado
  useEffect(() => {
    if (selectedChoiceIdx !== null) {
      setDialogueStep('decisao');
    }
  }, [selectedChoiceIdx]);

  const activeDialogue = hasDialogues ? act.dialogues![currentDialogueIdx] : null;

  const handleNextStep = () => {
    if (dialogueStep === 'narrativa') {
      if (hasDialogues) {
        setDialogueStep('dialogo');
        setCurrentDialogueIdx(0);
      } else {
        setDialogueStep('decisao');
      }
    } else if (dialogueStep === 'dialogo') {
      if (currentDialogueIdx + 1 < (act.dialogues?.length || 0)) {
        setCurrentDialogueIdx(prev => prev + 1);
      } else {
        setDialogueStep('decisao');
      }
    }
  };

  const handleSkipToDecision = () => {
    setDialogueStep('decisao');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 pb-3">
      {/* Container principal da Caixa de Diálogo Visual Novel com Estilo Cyber/Escolar */}
      <div className="relative rounded-3xl bg-slate-950/90 backdrop-blur-xl border-2 border-purple-500/60 shadow-2xl shadow-purple-950/80 overflow-hidden text-white transition-all">
        
        {/* Barra Superior da Caixa de Diálogo (Nameplate & HUD Controls) */}
        <div className="px-5 py-3 bg-gradient-to-r from-purple-950/90 via-[#18112e] to-slate-950 border-b border-purple-500/30 flex items-center justify-between gap-3">
          
          {/* Nome do Personagem / Falante com Badge Estilizado */}
          <div className="flex items-center gap-2.5">
            <span 
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: character.accentColor || '#a855f7' }}
            />
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm sm:text-base text-white tracking-wide">
                {dialogueStep === 'dialogo' && activeDialogue
                  ? activeDialogue.speaker
                  : dialogueStep === 'narrativa'
                  ? 'Narrador • Contexto da Cena'
                  : 'Momento de Decisão Ética'}
              </span>

              {dialogueStep === 'dialogo' && activeDialogue?.tone && (
                <span className="text-[11px] font-mono text-purple-300 bg-purple-900/50 border border-purple-500/30 px-2 py-0.5 rounded-md">
                  {activeDialogue.tone}
                </span>
              )}

              {dialogueStep === 'narrativa' && (
                <span className="text-[11px] font-mono text-fuchsia-300 bg-fuchsia-950/60 border border-fuchsia-500/40 px-2 py-0.5 rounded-md">
                  Ato {act.actNumber} de 5
                </span>
              )}
            </div>
          </div>

          {/* Controles de Navegação da Caixa (Voz, Pular para Decisão, Abas) */}
          <div className="flex items-center gap-2">
            
            {/* Atalhos para alternar entre momentos */}
            <div className="hidden sm:flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setDialogueStep('narrativa')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  dialogueStep === 'narrativa' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cena
              </button>
              {hasDialogues && (
                <button
                  onClick={() => { setDialogueStep('dialogo'); setCurrentDialogueIdx(0); }}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    dialogueStep === 'dialogo' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Diálogo ({currentDialogueIdx + 1}/{act.dialogues?.length})
                </button>
              )}
              <button
                onClick={() => setDialogueStep('decisao')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  dialogueStep === 'decisao' ? 'bg-fuchsia-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Decisão
              </button>
            </div>

            {/* Controle de Áudio Sintetizado TTS */}
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                isSpeakingAudio && !isPausedAudio
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
              title="Leitura em voz alta"
            >
              {isSpeakingAudio && !isPausedAudio ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
              <span className="text-xs font-mono hidden md:inline">
                {isSpeakingAudio ? (isPausedAudio ? 'Retomar' : 'Pausar') : 'Voz'}
              </span>
            </button>
          </div>

        </div>

        {/* Corpo da Caixa de Diálogo: Conteúdo baseado no estado */}
        <div className="p-5 sm:p-6 min-h-[170px] flex flex-col justify-between">
          
          {/* =================================================================== */}
          {/* ESTADO 1: TEXTO NARRATIVO DA CENA                                  */}
          {/* =================================================================== */}
          {dialogueStep === 'narrativa' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-10 bg-fuchsia-500 rounded-full flex-shrink-0 mt-1" />
                <p className="text-sm sm:text-base md:text-lg text-slate-100 leading-relaxed font-sans font-normal">
                  {act.narrativa || act.narrativeText}
                </p>
              </div>

              {/* Barra inferior de avanço */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                <span className="text-purple-300 font-mono">
                  {act.sceneSetting.location} • {act.sceneSetting.timeOfDay}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSkipToDecision}
                    className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer font-mono text-[11px]"
                  >
                    Ir direto para Escolha &gt;&gt;
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-900/40"
                  >
                    <span>{hasDialogues ? 'Ouvir Diálogo' : 'Ver Decisão'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* ESTADO 2: DIÁLOGO EM CENA (VISUAL NOVEL SPEECH)                     */}
          {/* =================================================================== */}
          {dialogueStep === 'dialogo' && activeDialogue && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-purple-950/40 border-l-4 border-l-fuchsia-500 border-y border-r border-purple-500/20 shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display font-black text-sm text-fuchsia-300">
                    {activeDialogue.speaker}
                  </span>
                  {activeDialogue.tone && (
                    <span className="text-[11px] text-purple-300 font-mono">
                      (Tom: {activeDialogue.tone})
                    </span>
                  )}
                </div>
                <p className="text-base sm:text-lg md:text-xl text-white font-serif italic leading-relaxed">
                  "{activeDialogue.text}"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                <span className="text-purple-300 font-mono">
                  Fala {currentDialogueIdx + 1} de {act.dialogues?.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSkipToDecision}
                    className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer font-mono text-[11px]"
                  >
                    Pular para Decisão &gt;&gt;
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-fuchsia-900/40"
                  >
                    <span>
                      {currentDialogueIdx + 1 < (act.dialogues?.length || 0)
                        ? 'Próxima Fala'
                        : 'Tomar Decisão'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* ESTADO 3: DILEMA ÉTICO & 4 ESCOLHAS INTERATIVAS                     */}
          {/* =================================================================== */}
          {dialogueStep === 'decisao' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Dilema em Destaque */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-fuchsia-950/60 via-purple-950/50 to-indigo-950/60 border border-fuchsia-500/40 shadow-inner flex items-start gap-3">
                <div className="p-2 rounded-xl bg-fuchsia-600 text-white flex-shrink-0 mt-0.5">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-fuchsia-300 block">
                    Situação Crítica • Como você decide agir?
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white leading-snug mt-1">
                    {act.currentDilemma}
                  </p>
                </div>
              </div>

              {/* 4 Escolhas em Formato de Card de Jogo Interativo */}
              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {act.choices.map((choice, idx) => {
                  const isSelected = selectedChoiceIdx === idx;
                  const isDisabled = selectedChoiceIdx !== null;

                  return (
                    <button
                      key={idx}
                      onClick={() => onSelectChoice(idx)}
                      disabled={isDisabled}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl text-left transition-all border-2 flex items-start gap-3 cursor-pointer group ${
                        isSelected
                          ? 'border-fuchsia-400 bg-gradient-to-r from-fuchsia-950/90 to-purple-950/90 shadow-lg shadow-fuchsia-950/80 ring-2 ring-fuchsia-400/50'
                          : isDisabled
                          ? 'border-white/5 bg-black/20 text-slate-500 opacity-60 cursor-not-allowed'
                          : 'border-purple-500/30 bg-purple-950/30 hover:bg-purple-900/40 hover:border-fuchsia-400 hover:shadow-md text-slate-200 hover:text-white'
                      }`}
                    >
                      {/* Badge da Letra da Opção */}
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5 border transition-all ${
                        isSelected
                          ? 'bg-fuchsia-600 text-white border-fuchsia-300 shadow-md'
                          : 'bg-black/40 text-purple-300 border-purple-500/40 group-hover:bg-purple-600 group-hover:text-white'
                      }`}>
                        {choice.letter}
                      </div>

                      {/* Texto da Opção com Tipografia Clara */}
                      <div className="flex-1">
                        <span className="leading-relaxed text-xs sm:text-sm font-medium block">
                          {choice.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
