import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Star, 
  Award, 
  FileText, 
  Calendar, 
  Layers, 
  BookOpen, 
  Shield, 
  HeartHandshake, 
  Wind, 
  Brain,
  Volume2
} from 'lucide-react';
import { Achievement } from '../../types';
import { AchievementBadgeFrame } from '../../AchievementBadgeFrame';
import { getMuseumPieceDetails } from './museumTypes';
import { playBreathTone } from '../../services/audioSynthesizer';

interface MuseumPieceModalProps {
  achievement: Achievement;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  studentCode?: string;
}

export const MuseumPieceModal: React.FC<MuseumPieceModalProps> = ({
  achievement,
  index,
  isFavorite,
  onToggleFavorite,
  onClose,
  studentCode = 'Anônimo 001'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [showCertificateView, setShowCertificateView] = useState(false);
  const details = getMuseumPieceDetails(achievement, index);
  const isUnlocked = achievement.isUnlocked;
  const isSecretLocked = achievement.isSecret && !isUnlocked;

  // Scroll suave inicial UMA ÚNICA VEZ e cancelado em qualquer interação do usuário
  useEffect(() => {
    let userInteracted = false;
    let hasScrolled = false;

    const onUserInteraction = () => {
      userInteracted = true;
    };

    window.addEventListener('wheel', onUserInteraction, { passive: true, capture: true });
    window.addEventListener('touchmove', onUserInteraction, { passive: true, capture: true });
    window.addEventListener('pointerdown', onUserInteraction, { passive: true, capture: true });
    window.addEventListener('keydown', onUserInteraction, { passive: true, capture: true });

    const timeoutId = window.setTimeout(() => {
      if (!userInteracted && !hasScrolled && cardRef.current) {
        try {
          cardRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
          hasScrolled = true;
        } catch {
          cardRef.current.scrollIntoView();
          hasScrolled = true;
        }
      }
    }, 60);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('wheel', onUserInteraction, { capture: true });
      window.removeEventListener('touchmove', onUserInteraction, { capture: true });
      window.removeEventListener('pointerdown', onUserInteraction, { capture: true });
      window.removeEventListener('keydown', onUserInteraction, { capture: true });
    };
  }, []);

  const handleFavoriteClick = () => {
    playBreathTone(isFavorite ? 440 : 880, 150);
    onToggleFavorite(achievement.id);
  };

  const handleCelebrate = () => {
    if (isUnlocked) {
      playBreathTone(523.25, 200);
      setTimeout(() => playBreathTone(659.25, 250), 120);
      setTimeout(() => playBreathTone(783.99, 300), 240);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div
        ref={cardRef}
        className="bg-[#0b0f1d] border-2 border-purple-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-6 max-h-[88vh] overflow-y-auto text-white"
      >
        {/* Luz ambiente sob o modal */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer z-20"
          title="Fechar ficha técnica"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header: Ficha Técnica Museológica */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/50 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-purple-300 flex items-center gap-1.5 shadow-inner">
              🏛️ FICHA TÉCNICA MUSEOLÓGICA
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-950/50 border border-amber-500/40 text-[10px] font-mono font-bold text-amber-300">
              {details.pieceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={handleFavoriteClick}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isFavorite
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-amber-300 border-amber-500/40'
                }`}
                title={isFavorite ? 'Remover dos favoritos' : 'Marcar como favorita'}
              >
                <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? 'Favorita' : 'Favoritar'}</span>
              </button>
            )}

            <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1 bg-amber-950/30 px-2.5 py-1 rounded-lg border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              +{achievement.xpReward || 50} XP
            </span>
          </div>
        </div>

        {/* Alternador de Modo: Ficha Museológica vs Certificado Formal */}
        {(isUnlocked || details.isCertificate) && (
          <div className="flex rounded-xl bg-black/40 border border-white/10 p-1 relative z-10">
            <button
              onClick={() => setShowCertificateView(false)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                !showCertificateView 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Exposição & Curadoria</span>
            </button>
            <button
              onClick={() => setShowCertificateView(true)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                showCertificateView 
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Certificado de Honra 📜</span>
            </button>
          </div>
        )}

        {/* VISTA 1: FICHA TÉCNICA E VITRINE MUSEOLÓGICA */}
        {!showCertificateView ? (
          <div className="space-y-6 relative z-10">
            
            {/* Vitrine Central da Peça (136px) */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div
                onClick={handleCelebrate}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#141b2f]/95 border-2 border-white/15 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-amber-400/50 cursor-pointer"
                title={isUnlocked ? 'Clique para comemorar e ouvir a harmonia da peça' : undefined}
              >
                {/* Reflexo de vidro museológico */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />

                <AchievementBadgeFrame
                  achievementId={achievement.id}
                  category={achievement.category}
                  tier={achievement.tier}
                  iconType={achievement.iconType}
                  funnySticker={achievement.funnySticker}
                  isUnlocked={isUnlocked}
                  isSecret={achievement.isSecret}
                  size={136}
                  showGlow={isUnlocked}
                />

                {isUnlocked && (
                  <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Título & Subtítulo */}
              <div className="space-y-1 max-w-lg">
                <h3 className="text-xl sm:text-2xl font-display font-black text-white">
                  {isSecretLocked ? '🔒 Peça Secreta Enigmática' : achievement.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold italic text-purple-300/90 font-serif">
                  "{isSecretLocked ? 'Mistério guardado na plataforma...' : (achievement.subtitle || achievement.title)}"
                </p>
              </div>
            </div>

            {/* Placa de Identificação Formal do Museu */}
            <div className="p-5 rounded-2xl bg-[#070b16] border border-amber-600/40 space-y-4 shadow-inner">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">
                    Classificação:
                  </span>
                  <span className="font-semibold text-amber-200 flex items-center gap-1">
                    <span>{details.pieceTypeIcon}</span>
                    <span>{details.pieceTypeLabel}</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">
                    Ala do Museu:
                  </span>
                  <span className="font-semibold text-purple-200">
                    {details.galleryName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">
                    Tombamento:
                  </span>
                  <span className="font-semibold text-emerald-300">
                    {isUnlocked ? '29/09/2026' : 'Em processo'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">
                    Status:
                  </span>
                  <span className={`font-semibold ${isUnlocked ? 'text-emerald-300' : 'text-amber-400'}`}>
                    {isUnlocked ? 'Desbloqueada' : 'Aguardando'}
                  </span>
                </div>
              </div>

              {/* Curadoria & "Sobre esta conquista" */}
              <div className="space-y-1.5 text-xs sm:text-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block font-mono">
                  Sobre esta Conquista:
                </span>
                <p className="text-gray-200 leading-relaxed">
                  {isSecretLocked
                    ? 'Esta peça está oculta sob sigilo e só poderá ser revelada ao completar ações específicas de convivência, estudo e proteção escolar.'
                    : (isUnlocked && achievement.unlockedDescription ? achievement.unlockedDescription : achievement.description)}
                </p>
              </div>

              {/* Requisitos / Como foi obtida */}
              <div className="space-y-1.5 text-xs sm:text-sm border-t border-white/10 pt-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block font-mono">
                  {isUnlocked ? 'Como Foi Obtida:' : 'Requisito para Desbloquear:'}
                </span>
                <p className="text-purple-200/90 leading-relaxed font-sans">
                  {isSecretLocked
                    ? 'Investigue as áreas da escola, participe de testes éticos e pratique atitudes fraternas.'
                    : achievement.requirementHint}
                </p>
              </div>

              {/* Materiais e Especificações Artísticas */}
              <div className="space-y-1 text-[11px] border-t border-white/10 pt-3">
                <span className="text-[10px] font-bold uppercase text-gray-400 block font-mono">
                  Materiais e Acabamento:
                </span>
                <p className="text-gray-300 font-sans">
                  {details.materials}
                </p>
              </div>

              {/* Citação Filosófica / Bom Humor */}
              {!isSecretLocked && achievement.funnyQuote && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs italic text-purple-200 font-serif">
                  ‘{achievement.funnyQuote.replace(/["'‘]/g, '')}’
                </div>
              )}
            </div>

          </div>
        ) : (
          /* VISTA 2: CERTIFICADO FORMAL DE CONQUISTA ESCOLAR (Requirement 29) */
          <div className="space-y-6 relative z-10 animate-fadeIn">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#fdfbf7] to-[#f4eee1] text-[#241e33] border-4 border-amber-600/70 shadow-2xl relative space-y-6 font-serif">
              
              {/* Moldura dupla clássica e selo de cera dourado */}
              <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-800/20 rounded-2xl pointer-events-none" />

              <div className="text-center space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-800 font-bold block">
                  GOVERNO DO ESTADO DO CEARÁ • SEDUC
                </span>
                <span className="text-xs uppercase tracking-widest font-black text-purple-900 block">
                  EEMTI ALFREDO MACHADO • CEARÁ CIENTÍFICO 2026
                </span>
                <h4 className="text-2xl sm:text-3xl font-display font-black text-amber-950 pt-2">
                  CERTIFICADO DE CONQUISTA & HONRA
                </h4>
                <div className="w-24 h-0.5 bg-amber-600 mx-auto" />
              </div>

              <div className="text-center space-y-3 py-2">
                <p className="text-xs sm:text-sm text-gray-700 font-sans">
                  Certificamos para os devidos fins de cidadania e convivência escolar que o estudante portador do código seguro:
                </p>
                <div className="inline-block px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 font-mono font-black text-purple-900 text-sm sm:text-base">
                  {studentCode}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-sans leading-relaxed max-w-lg mx-auto">
                  concluiu com êxito os requisitos cívicos, pedagógicos e empáticos correspondentes à honraria:
                </p>
                <h5 className="text-lg sm:text-xl font-display font-black text-amber-900">
                  “{achievement.title}”
                </h5>
                <p className="text-xs italic text-gray-600 max-w-md mx-auto">
                  {achievement.unlockedDescription || achievement.description}
                </p>
              </div>

              {/* Selos e Assinaturas */}
              <div className="pt-4 border-t border-amber-300 grid grid-cols-2 gap-4 items-center text-center font-sans text-[11px] text-gray-600">
                <div className="space-y-1">
                  <div className="font-mono font-bold text-amber-900">
                    29 de Setembro de 2026
                  </div>
                  <div className="text-[10px] text-gray-500">Data de Outorga</div>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-purple-900">
                    StopBullying • Madalena/CE
                  </div>
                  <div className="text-[10px] text-gray-500">Comissão de Paz & Mediação</div>
                </div>
              </div>

            </div>

            <div className="text-center">
              <button
                onClick={() => setShowCertificateView(false)}
                className="text-xs font-bold text-purple-300 hover:text-white underline cursor-pointer"
              >
                ← Voltar à Ficha Técnica da Peça
              </button>
            </div>
          </div>
        )}

        {/* Rodapé de Ações */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="text-xs text-gray-400">
            {isUnlocked ? 'Peça catalogada no acervo permanente' : 'Peça em busca de descoberta'}
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={handleCelebrate}
                className="px-3 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-purple-500/40"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Ouvir Harmonia</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              Fechar Ficha
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
