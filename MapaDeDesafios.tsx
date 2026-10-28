import React, { useState } from 'react';
import { CENTRAL_DESAFIOS, QuizChallenge, ChallengeDifficulty } from '../../data/centralRespeitoData';
import { 
  ChallengeUserProgress, 
  checkIsChallengeUnlocked 
} from '../../utils';
import { ChallengeModal } from './QuizModals';
import { 
  Trophy, 
  Lock, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  X, 
  Award, 
  Flame, 
  Compass,
  Star
} from 'lucide-react';

interface MapaDeDesafiosProps {
  progressMap: Record<string, ChallengeUserProgress>;
  onSelectChallenge: (challenge: QuizChallenge) => void;
}

// Fases temáticas com cores nítidas, sólidas e de alto contraste
const TRAIL_PHASES = [
  {
    phaseNumber: 1,
    title: 'Fase I • Entrada & Convivência Ética',
    subtitle: 'O despertar da alteridade e o acolhimento diário nos corredores',
    challengeIds: ['conhecimentos_respeito', 'situacao_real'],
    themeBg: 'bg-gradient-to-r from-emerald-50 via-white to-teal-50',
    themeBorder: 'border-2 border-emerald-300',
    headerBadge: 'bg-emerald-700 text-white font-black',
    accentText: 'text-emerald-900'
  },
  {
    phaseNumber: 2,
    title: 'Fase II • O Escudo da Não-Violência',
    subtitle: 'Detecção de intimidações sistemáticas e cidadania em redes sociais',
    challengeIds: ['bullying_pratica', 'vida_online'],
    themeBg: 'bg-gradient-to-r from-amber-50 via-white to-orange-50',
    themeBorder: 'border-2 border-amber-300',
    headerBadge: 'bg-amber-700 text-white font-black',
    accentText: 'text-amber-950'
  },
  {
    phaseNumber: 3,
    title: 'Fase III • O Mural da Lei & Percepção Crítica',
    subtitle: 'Domínio da Lei 13.185/15, Lei 14.811/24 e detecção de sinais sutis',
    challengeIds: ['direitos_responsabilidades', 'voce_percebeu'],
    themeBg: 'bg-gradient-to-r from-cyan-50 via-white to-blue-50',
    themeBorder: 'border-2 border-cyan-300',
    headerBadge: 'bg-cyan-800 text-white font-black',
    accentText: 'text-cyan-950'
  },
  {
    phaseNumber: 4,
    title: 'Fase IV • Mediação & Decisões Encadeadas',
    subtitle: 'Tomada de decisão sob pressão e simulação de caso restaurativo',
    challengeIds: ['o_que_faria', 'historia_interativa'],
    themeBg: 'bg-gradient-to-r from-fuchsia-50 via-white to-purple-50',
    themeBorder: 'border-2 border-fuchsia-300',
    headerBadge: 'bg-fuchsia-800 text-white font-black',
    accentText: 'text-fuchsia-950'
  },
  {
    phaseNumber: 5,
    title: 'Fase V • O Pináculo do Guardião',
    subtitle: 'Os desafios supremos e a câmara dos segredos da EEMTI',
    challengeIds: ['desafio_supremo', 'desafio_secreto'],
    themeBg: 'bg-gradient-to-r from-purple-100/70 via-white to-indigo-100/70',
    themeBorder: 'border-2 border-purple-400',
    headerBadge: 'bg-purple-900 text-white font-black',
    accentText: 'text-purple-950'
  }
];

export const MapaDeDesafios: React.FC<MapaDeDesafiosProps> = ({
  progressMap,
  onSelectChallenge
}) => {
  const [activeModalChallenge, setActiveModalChallenge] = useState<QuizChallenge | null>(null);

  const totalChallenges = CENTRAL_DESAFIOS.length;
  const completedCount = Object.values(progressMap).filter(p => p.completed).length;
  const perfectCount = Object.values(progressMap).filter(p => p.completed && p.bestPercent === 100).length;
  const progressPercent = Math.round((completedCount / totalChallenges) * 100);

  const getDifficultyBadge = (diff: ChallengeDifficulty) => {
    switch (diff) {
      case 'dificil':
        return { label: 'DIFÍCIL', color: 'bg-emerald-100 text-emerald-900 border border-emerald-400 font-bold' };
      case 'muito_dificil':
        return { label: 'MUITO DIFÍCIL', color: 'bg-amber-100 text-amber-950 border border-amber-400 font-bold' };
      case 'desafio':
        return { label: 'DESAFIO', color: 'bg-rose-100 text-rose-950 border border-rose-400 font-bold' };
      case 'supremo':
        return { label: 'SUPREMO', color: 'bg-purple-200 text-purple-950 border border-purple-500 font-black' };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Banner de Estatísticas da Trilha: Cores Sólidas, Nítidas e Vivas */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 border-2 border-purple-400 text-white shadow-xl relative overflow-hidden">
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-700 text-amber-300 border border-purple-400 shadow-xs">
                <Compass className="w-4 h-4" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-200">
                Trilha Gamificada de Progressão
              </span>
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
              Mapa dos Guardiões do Respeito
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 max-w-xl leading-relaxed">
              Percorra os 10 nós de aprendizado através de 5 fases pedagógicas. Cada nó superado consolida competências éticas e abre caminho para os testes supremos da escola.
            </p>
          </div>

          {/* Medidores de Progresso */}
          <div className="flex items-center gap-4 bg-purple-950/70 p-4 rounded-2xl border-2 border-purple-400/40 flex-shrink-0 shadow-md">
            <div className="text-center px-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-200 block">Nós Superados</span>
              <span className="text-2xl sm:text-3xl font-black text-white font-mono">{completedCount} / {totalChallenges}</span>
            </div>

            <div className="w-px h-10 bg-purple-700" />

            <div className="text-center px-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">Gabaritos 100%</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">{perfectCount} ⭐</span>
            </div>

            <div className="w-px h-10 bg-purple-700" />

            <div className="text-center px-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">Completude</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Barra de Progresso Geral da Trilha */}
        <div className="mt-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-purple-200 font-bold">
            <span>Progresso Global do Sentinela</span>
            <span className="font-mono text-white">{progressPercent}% Concluído</span>
          </div>
          <div className="w-full bg-purple-950/80 h-3 rounded-full overflow-hidden border border-purple-500/50 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-400 via-amber-300 to-purple-300 transition-all duration-700 rounded-full shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* RENDERIZAÇÃO DA TRILHA DE FASES & NÓS */}
      <div className="space-y-6 sm:space-y-8 relative">
        
        {TRAIL_PHASES.map((phase, phaseIdx) => {
          const phaseChallenges = phase.challengeIds
            .map(id => CENTRAL_DESAFIOS.find(c => c.id === id))
            .filter((c): c is QuizChallenge => c !== undefined);

          const phaseCompletedCount = phaseChallenges.filter(c => progressMap[c.id]?.completed).length;
          const isPhaseDone = phaseCompletedCount === phaseChallenges.length;

          return (
            <div 
              key={phase.phaseNumber}
              className={`rounded-3xl p-5 sm:p-7 shadow-md space-y-5 ${phase.themeBg} ${phase.themeBorder}`}
            >
              {/* Topo da Fase */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[11px] uppercase tracking-wider shadow-xs ${phase.headerBadge}`}>
                      {phase.title}
                    </span>
                    {isPhaseDone && (
                      <span className="flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        Fase Consolidada
                      </span>
                    )}
                  </div>
                  <p className={`text-xs font-semibold ${phase.accentText}`}>
                    {phase.subtitle}
                  </p>
                </div>

                <span className="text-xs font-mono font-bold text-slate-700 bg-white/80 border border-slate-300 px-3 py-1 rounded-xl shadow-xs self-start sm:self-center">
                  {phaseCompletedCount} de {phaseChallenges.length} nós superados
                </span>
              </div>

              {/* Nós da Fase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
                
                {phaseChallenges.map((challenge, nodeIdx) => {
                  const progress = progressMap[challenge.id];
                  const unlockStatus = checkIsChallengeUnlocked(challenge, progressMap);
                  const isLocked = !unlockStatus.isUnlocked;
                  const isCompleted = progress?.completed;
                  const isPerfect = isCompleted && progress.bestPercent === 100;
                  const diffBadge = getDifficultyBadge(challenge.dificuldade);

                  // Ordem do Nó na Trilha Total
                  const globalNodeNumber = phaseIdx * 2 + nodeIdx + 1;

                  return (
                    <div
                      key={challenge.id}
                      onClick={() => setActiveModalChallenge(challenge)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group shadow-sm hover:shadow-lg hover:-translate-y-0.5 ${
                        isLocked
                          ? 'bg-slate-100 border-slate-300 text-slate-800'
                          : isPerfect
                          ? 'bg-gradient-to-br from-amber-50 via-white to-amber-100/50 border-amber-400 text-[#1e172e]'
                          : isCompleted
                          ? 'bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 border-emerald-400 text-[#1e172e]'
                          : 'bg-white hover:bg-purple-50/40 border-purple-300 hover:border-purple-600 text-[#1e172e]'
                      }`}
                    >
                      {/* Topo do Nó */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          
                          {/* Emblema do Nó */}
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs border ${
                              isLocked
                                ? 'bg-slate-300 border-slate-400 text-slate-700'
                                : isPerfect
                                ? 'bg-amber-400 text-black border-amber-500 shadow-sm'
                                : isCompleted
                                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                                : 'bg-purple-700 text-white border-purple-800 shadow-sm'
                            }`}>
                              {isLocked ? <Lock className="w-3.5 h-3.5" /> : `#${globalNodeNumber}`}
                            </div>

                            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${diffBadge.color}`}>
                              {diffBadge.label}
                            </span>
                          </div>

                          {/* XP e Status */}
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 border border-purple-300 text-purple-900">
                              +{challenge.xpRecompensa} XP
                            </span>
                            {isCompleted && (
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                                isPerfect 
                                  ? 'bg-amber-100 text-amber-950 border-amber-300' 
                                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              }`}>
                                {isPerfect ? '100% ⭐' : `${progress.bestPercent}%`}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Título & Descrição */}
                        <div className="flex items-start gap-3">
                          <span className="text-3xl p-2 rounded-2xl bg-white border border-purple-100 shadow-xs flex-shrink-0 group-hover:scale-110 transition-transform">
                            {challenge.icone}
                          </span>
                          <div>
                            <h3 className="font-display font-black text-base text-[#1e172e] leading-snug group-hover:text-purple-700 transition-colors">
                              {challenge.titulo}
                            </h3>
                            <p className="text-xs text-purple-900 font-semibold line-clamp-1 mt-0.5">
                              {challenge.subtitulo}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-700 font-normal leading-relaxed line-clamp-2">
                          {challenge.descricao}
                        </p>
                      </div>

                      {/* Rodapé do Nó */}
                      <div className="pt-4 mt-3 border-t border-purple-100 flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-slate-600">
                          {challenge.questoesCount} {challenge.tipo === 'historia_interativa' ? 'atos' : 'questões'} • ~{challenge.tempoMedioMinutos} min
                        </span>

                        <div className="flex items-center gap-1 text-purple-700 font-bold group-hover:translate-x-1 transition-transform">
                          <span>{isLocked ? 'Ver Requisito' : isCompleted ? 'Ver Detalhes' : 'Jogar Nó'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL DE INSPEÇÃO & INÍCIO DO NÓ COM OVERLAY E AUTO-SCROLL SUAVE */}
      <ChallengeModal
        challenge={activeModalChallenge}
        progressMap={progressMap}
        onClose={() => setActiveModalChallenge(null)}
        onStart={(challenge) => {
          setActiveModalChallenge(null);
          onSelectChallenge(challenge);
        }}
      />

    </div>
  );
};
