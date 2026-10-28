import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  Filter, 
  Compass, 
  ArrowRight, 
  ArrowLeft,
  Flame, 
  Award, 
  Layers, 
  Gamepad2,
  Trophy,
  Scale,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  X,
  MessageSquare,
  FileText,
  Users,
  Lock,
  AlertTriangle,
  Smartphone,
  Eye,
  Info,
  Maximize2,
  Volume2,
  VolumeX,
  Pause,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { 
  NARRATIVE_STORIES, 
  NarrativeStory, 
  NarrativeAct, 
  NarrativeChoice, 
  NarrativeOutcome, 
  CharacterProfile, 
  InvestigationItem, 
  StoryCategory, 
  StoryDifficulty 
} from '../../data/narrativeStoriesData';
import { 
  getAllNarrativeProgress, 
  getNarrativeSummaryStats, 
  recordStoryCompletion, 
  SaveStoryCompletionResult, 
  getNarrativeProgress 
} from '../../services/narrativeService';
import { speakText, pauseSpeech, resumeSpeech, stopSpeech } from '../../services/audioSynthesizer';
import { useApp } from '../../AppContext';




interface CharacterAvatarProps {
  type: CharacterProfile['avatarType'];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  type,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32 sm:w-40 sm:h-40'
  }[size];

  // Renderização de avatares com ilustrações SVG vetoriais detalhadas no estilo anime/visual novel escolar
  return (
    <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden shadow-md flex-shrink-0 ${sizeClasses} ${className}`}>
      {type === 'aluna_oculos' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-purple-200 via-fuchsia-100 to-indigo-200">
          {/* Cabelo de fundo */}
          <path d="M25 45 C20 80, 25 110, 35 120 L85 120 C95 110, 100 80, 95 45 Z" fill="#2d2238" />
          {/* Ombros / Uniforme escolar da EEMTI */}
          <path d="M20 120 C25 95, 45 90, 60 90 C75 90, 95 95, 100 120 Z" fill="#f8fafc" />
          {/* Gola roxa e laço */}
          <path d="M45 90 L60 102 L75 90 L68 115 L52 115 Z" fill="#7e22ce" />
          <path d="M56 102 L64 102 L60 110 Z" fill="#c084fc" />
          {/* Pescoço */}
          <rect x="52" y="75" width="16" height="18" fill="#fed7aa" rx="4" />
          {/* Rosto */}
          <ellipse cx="60" cy="56" rx="26" ry="28" fill="#ffedd5" />
          {/* Cabelo frente / Franja */}
          <path d="M34 50 C38 30, 82 30, 86 50 C78 38, 68 40, 60 48 C52 40, 42 38, 34 50 Z" fill="#3b2d4a" />
          <path d="M30 45 C35 70, 38 85, 40 92 C36 80, 32 65, 30 45 Z" fill="#3b2d4a" />
          <path d="M90 45 C85 70, 82 85, 80 92 C84 80, 88 65, 90 45 Z" fill="#3b2d4a" />
          {/* Olhos expressivos */}
          <ellipse cx="48" cy="58" rx="5" ry="6" fill="#4c1d95" />
          <ellipse cx="72" cy="58" rx="5" ry="6" fill="#4c1d95" />
          <circle cx="49.5" cy="56" r="2" fill="#ffffff" />
          <circle cx="73.5" cy="56" r="2" fill="#ffffff" />
          {/* Sobrancelhas */}
          <path d="M43 50 Q48 48 53 51" stroke="#3b2d4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M67 51 Q72 48 77 50" stroke="#3b2d4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Óculos elegantes roxos */}
          <rect x="40" y="52" width="16" height="13" rx="4" fill="none" stroke="#6b21a8" strokeWidth="2.2" />
          <rect x="64" y="52" width="16" height="13" rx="4" fill="none" stroke="#6b21a8" strokeWidth="2.2" />
          <path d="M56 57 L64 57" stroke="#6b21a8" strokeWidth="2" />
          {/* Nariz e Boca gentil */}
          <circle cx="60" cy="67" r="1" fill="#f97316" />
          <path d="M56 73 Q60 76 64 73" stroke="#e11d48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Blush suave nas bochechas */}
          <ellipse cx="42" cy="65" rx="4" ry="2" fill="#fda4af" opacity="0.6" />
          <ellipse cx="78" cy="65" rx="4" ry="2" fill="#fda4af" opacity="0.6" />
        </svg>
      )}

      {type === 'aluno_timido' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200">
          {/* Cabelo castanho suave */}
          <path d="M30 48 C25 25, 95 25, 90 48 C94 65, 88 80, 85 85 L35 85 C32 80, 26 65, 30 48 Z" fill="#451a03" />
          {/* Uniforme escolar da EEMTI */}
          <path d="M22 120 C28 95, 45 90, 60 90 C75 90, 92 95, 98 120 Z" fill="#0284c7" />
          <path d="M48 90 L60 102 L72 90 Z" fill="#ffffff" />
          {/* Pescoço */}
          <rect x="52" y="75" width="16" height="18" fill="#ffedd5" rx="4" />
          {/* Rosto */}
          <ellipse cx="60" cy="58" rx="25" ry="27" fill="#ffedd5" />
          {/* Franja que cobre parte da testa */}
          <path d="M35 48 C42 35, 78 35, 85 48 C76 42, 65 48, 58 45 C50 48, 42 42, 35 48 Z" fill="#78350f" />
          {/* Olhos tímidos e sensíveis */}
          <ellipse cx="49" cy="58" rx="4.5" ry="5.5" fill="#0f172a" />
          <ellipse cx="71" cy="58" rx="4.5" ry="5.5" fill="#0f172a" />
          <circle cx="50" cy="56.5" r="1.6" fill="#ffffff" />
          <circle cx="72" cy="56.5" r="1.6" fill="#ffffff" />
          {/* Sobrancelhas preocupadas */}
          <path d="M44 51 Q48 53 53 50" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M67 50 Q72 53 76 51" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Boca tímida */}
          <path d="M57 73 Q60 72 63 73" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {type === 'coordenadora' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-purple-300 via-violet-100 to-fuchsia-200">
          {/* Cabelo escuro preso elegante */}
          <circle cx="60" cy="38" r="32" fill="#1e1b4b" />
          <circle cx="60" cy="22" r="12" fill="#312e81" />
          {/* Blazer profissional roxo */}
          <path d="M18 120 C24 92, 45 88, 60 88 C75 88, 96 92, 102 120 Z" fill="#581c87" />
          <path d="M46 88 L60 108 L74 88 Z" fill="#f3e8ff" />
          {/* Colar com pingente ético */}
          <circle cx="60" cy="98" r="3" fill="#eab308" />
          {/* Pescoço */}
          <rect x="52" y="74" width="16" height="18" fill="#fed7aa" rx="4" />
          {/* Rosto sereno e maduro */}
          <ellipse cx="60" cy="56" rx="25" ry="27" fill="#fed7aa" />
          {/* Penteado elegante */}
          <path d="M36 45 C45 32, 75 32, 84 45 C78 38, 60 40, 36 45 Z" fill="#312e81" />
          {/* Olhos acolhedores e firmes */}
          <ellipse cx="48" cy="56" rx="4.5" ry="5.5" fill="#3b0764" />
          <ellipse cx="72" cy="56" rx="4.5" ry="5.5" fill="#3b0764" />
          <circle cx="49" cy="54.5" r="1.5" fill="#ffffff" />
          <circle cx="73" cy="54.5" r="1.5" fill="#ffffff" />
          {/* Sorriso acolhedor de mediadora */}
          <path d="M54 72 Q60 76 66 72" stroke="#9d174d" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Brincos de pérola */}
          <circle cx="34" cy="62" r="2.5" fill="#fef08a" />
          <circle cx="86" cy="62" r="2.5" fill="#fef08a" />
        </svg>
      )}

      {type === 'aluno_lider' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-amber-200 via-rose-100 to-orange-200">
          {/* Cabelo moderno arrepiado */}
          <path d="M32 45 C35 20, 85 20, 88 45 C92 35, 82 22, 60 22 C38 22, 28 35, 32 45 Z" fill="#0f172a" />
          {/* Moletom / Jaqueta esportiva */}
          <path d="M20 120 C26 92, 45 88, 60 88 C75 88, 94 92, 100 120 Z" fill="#dc2626" />
          <path d="M54 88 L60 120 L66 88 Z" fill="#1e293b" />
          {/* Pescoço */}
          <rect x="52" y="74" width="16" height="18" fill="#ffedd5" rx="4" />
          {/* Rosto com expressão confiante/desafiadora */}
          <ellipse cx="60" cy="56" rx="25" ry="27" fill="#ffedd5" />
          {/* Olhos afiados */}
          <ellipse cx="48" cy="56" rx="5" ry="5" fill="#1e293b" />
          <ellipse cx="72" cy="56" rx="5" ry="5" fill="#1e293b" />
          <circle cx="49.5" cy="54.5" r="1.5" fill="#ffffff" />
          <circle cx="73.5" cy="54.5" r="1.5" fill="#ffffff" />
          {/* Sobrancelhas franzidas/confiantes */}
          <path d="M43 49 L53 52" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <path d="M67 52 L77 49" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          {/* Sorriso lateral desafiador */}
          <path d="M55 72 Q62 74 67 70" stroke="#991b1b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {type === 'inspetor' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-emerald-200 via-teal-100 to-cyan-200">
          {/* Boné / Cabelo grisalho curto */}
          <circle cx="60" cy="38" r="28" fill="#334155" />
          <path d="M35 44 C45 32, 75 32, 85 44 Z" fill="#1e293b" />
          {/* Uniforme de apoio escolar */}
          <path d="M20 120 C26 92, 45 88, 60 88 C75 88, 94 92, 100 120 Z" fill="#047857" />
          <path d="M50 88 L60 102 L70 88 Z" fill="#f8fafc" />
          {/* Crachá */}
          <rect x="72" y="96" width="10" height="14" rx="2" fill="#fef08a" stroke="#065f46" strokeWidth="1" />
          {/* Pescoço */}
          <rect x="52" y="74" width="16" height="18" fill="#fed7aa" rx="4" />
          {/* Rosto protetor */}
          <ellipse cx="60" cy="58" rx="25" ry="27" fill="#fed7aa" />
          {/* Olhos atentos */}
          <ellipse cx="48" cy="57" rx="4" ry="4" fill="#0f172a" />
          <ellipse cx="72" cy="57" rx="4" ry="4" fill="#0f172a" />
          {/* Bigode respeitável e sorriso sereno */}
          <path d="M48 68 Q60 74 72 68" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M55 74 Q60 76 65 74" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {type === 'colega_apoio' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-pink-200 via-fuchsia-100 to-rose-200">
          <circle cx="60" cy="40" r="30" fill="#701a75" />
          <path d="M22 120 C28 95, 45 90, 60 90 C75 90, 92 95, 98 120 Z" fill="#a21caf" />
          <rect x="52" y="75" width="16" height="18" fill="#ffedd5" rx="4" />
          <ellipse cx="60" cy="58" rx="25" ry="27" fill="#ffedd5" />
          <ellipse cx="49" cy="58" rx="4.5" ry="5.5" fill="#4a044e" />
          <ellipse cx="71" cy="58" rx="4.5" ry="5.5" fill="#4a044e" />
          <path d="M55 72 Q60 76 65 72" stroke="#be185d" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};





interface VisualNovelCharacterStageProps {
  character: CharacterProfile;
  speakerName?: string;
  isSpeaking?: boolean;
  expression?: 'normal' | 'preocupado' | 'firme' | 'reflexivo';
  className?: string;
}

export const VisualNovelCharacterStage: React.FC<VisualNovelCharacterStageProps> = ({
  character,
  speakerName,
  isSpeaking = false,
  expression = 'normal',
  className = ''
}) => {
  const type = character.avatarType;

  return (
    <div className={`relative flex items-end justify-center select-none pointer-events-none ${className}`}>
      {/* Sombra de projeção no chão do cenário */}
      <div className="absolute -bottom-2 w-48 h-8 rounded-full bg-black/60 blur-md" />

      {/* Brilho de silhueta suave que integra o personagem à iluminação da cena */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ backgroundColor: character.accentColor || '#a855f7' }}
      />

      {/* Renderização do Modelo do Personagem em Vetor Visual Novel de Corpo Superior (Half-body) */}
      <div className="relative w-64 sm:w-80 md:w-96 h-80 sm:h-96 md:h-[420px] transition-transform duration-300 transform hover:scale-[1.01]">
        
        {/* ===================================================================== */}
        {/* MODELO 1: SOFIA (aluna_oculos) - ESTILO ANIME ESCOLAR BRASILEIRO      */}
        {/* ===================================================================== */}
        {type === 'aluna_oculos' && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="sofiaHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#251630" />
                <stop offset="60%" stopColor="#3d2152" />
                <stop offset="100%" stopColor="#1a0f23" />
              </linearGradient>
              <linearGradient id="sofiaShirt" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ede9fe" />
              </linearGradient>
              <linearGradient id="sofiaVest" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7e22ce" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="100%" stopColor="#fed7aa" />
              </linearGradient>
            </defs>

            {/* Cabelo Longo Traseiro com Volume e Caimento Natural */}
            <path d="M60 120 C40 220, 50 340, 75 390 L205 390 C230 340, 240 220, 220 120 Z" fill="url(#sofiaHair)" />
            <path d="M50 160 C35 240, 45 320, 60 380 C70 320, 65 240, 58 160 Z" fill="#1a0f23" />
            <path d="M230 160 C245 240, 235 320, 220 380 C210 320, 215 240, 222 160 Z" fill="#1a0f23" />

            {/* Tronco & Uniforme Escolar da EEMTI Alfredo Machado */}
            {/* Blusa Branca Interna com Gola */}
            <path d="M50 400 L85 240 C100 225, 180 225, 195 240 L230 400 Z" fill="url(#sofiaShirt)" />
            
            {/* Colete Escolar Roxo Oficial da EEMTI */}
            <path d="M75 400 L95 250 C110 240, 170 240, 185 250 L205 400 L165 400 L140 310 L115 400 Z" fill="url(#sofiaVest)" stroke="#3b0764" strokeWidth="2" />
            
            {/* Gola da Camisa e Gravata Borboleta / Laço Escolar */}
            <polygon points="115,225 140,255 165,225 150,225 140,240 130,225" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="125,245 140,265 155,245 145,280 135,280" fill="#a855f7" stroke="#6b21a8" strokeWidth="1.5" />
            <circle cx="140" cy="252" r="4" fill="#fbbf24" />

            {/* Pescoço Suave */}
            <rect x="122" y="195" width="36" height="40" fill="url(#skinGrad)" rx="6" />
            {/* Sombra no pescoço sob o queixo */}
            <ellipse cx="140" cy="205" rx="20" ry="8" fill="#fbcfe8" opacity="0.6" />

            {/* Rosto Delicado */}
            <ellipse cx="140" cy="155" rx="58" ry="62" fill="url(#skinGrad)" />
            <path d="M85 150 Q140 225 195 150" fill="url(#skinGrad)" />

            {/* Cabelo Frontal com Franja Dividida Estilo Anime */}
            <path d="M75 140 C80 90, 200 90, 205 140 C190 110, 160 115, 140 135 C120 115, 90 110, 75 140 Z" fill="url(#sofiaHair)" />
            <path d="M70 130 C80 190, 88 230, 95 250 C86 220, 76 180, 70 130 Z" fill="url(#sofiaHair)" />
            <path d="M210 130 C200 190, 192 230, 185 250 C194 220, 204 180, 210 130 Z" fill="url(#sofiaHair)" />
            {/* Mechas soltas finas */}
            <path d="M125 110 Q130 145 135 150 Q130 130 132 110" fill="url(#sofiaHair)" />

            {/* Olhos Grandes e Expressivos (Roxos com Brilho Estelar) */}
            <g transform="translate(0, 0)">
              {/* Olho Esquerdo */}
              <ellipse cx="112" cy="156" rx="13" ry="16" fill="#3b0764" />
              <ellipse cx="112" cy="158" rx="10" ry="13" fill="#6b21a8" />
              <circle cx="108" cy="152" r="5" fill="#ffffff" />
              <circle cx="116" cy="162" r="2.5" fill="#ffffff" />
              
              {/* Olho Direito */}
              <ellipse cx="168" cy="156" rx="13" ry="16" fill="#3b0764" />
              <ellipse cx="168" cy="158" rx="10" ry="13" fill="#6b21a8" />
              <circle cx="164" cy="152" r="5" fill="#ffffff" />
              <circle cx="172" cy="162" r="2.5" fill="#ffffff" />

              {/* Pálpebras e Cílios Suaves */}
              <path d="M96 147 Q112 140 128 147" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M152 147 Q168 140 184 147" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />

              {/* Sobrancelhas Empáticas */}
              <path d="M100 138 Q112 132 124 136" stroke="#312e81" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M156 136 Q168 132 180 138" stroke="#312e81" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>

            {/* Armação de Óculos Estilizada Roxa (Marca de Sofia) */}
            <rect x="94" y="142" width="36" height="28" rx="8" fill="none" stroke="#6b21a8" strokeWidth="3" />
            <rect x="150" y="142" width="36" height="28" rx="8" fill="none" stroke="#6b21a8" strokeWidth="3" />
            <path d="M130 152 L150 152" stroke="#6b21a8" strokeWidth="3" />
            {/* Brilho no Vidro dos Óculos */}
            <line x1="98" y1="146" x2="114" y2="162" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            <line x1="154" y1="146" x2="170" y2="162" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

            {/* Nariz Pequeno e Blush nas Bochechas */}
            <circle cx="140" cy="172" r="2" fill="#fb923c" />
            <ellipse cx="98" cy="170" rx="10" ry="5" fill="#f472b6" opacity="0.5" />
            <ellipse cx="182" cy="170" rx="10" ry="5" fill="#f472b6" opacity="0.5" />

            {/* Boca Expressiva (Gentil / Falando) */}
            {isSpeaking ? (
              <path d="M132 185 Q140 196 148 185 Z" fill="#e11d48" stroke="#be123c" strokeWidth="1.5" />
            ) : (
              <path d="M132 185 Q140 190 148 185" stroke="#e11d48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}
          </svg>
        )}

        {/* ===================================================================== */}
        {/* MODELO 2: LUCAS (aluno_timido) - CABELO CASTANHO, EXPRESSÃO SENSÍVEL  */}
        {/* ===================================================================== */}
        {type === 'aluno_timido' && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="lucasHair" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#290f02" />
              </linearGradient>
              <linearGradient id="lucasHoodie" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>
            </defs>

            {/* Cabelo de Trás */}
            <ellipse cx="140" cy="140" rx="70" ry="75" fill="url(#lucasHair)" />

            {/* Corpo / Casaco Moletom Escolar Azul */}
            <path d="M40 400 L80 240 C100 230, 180 230, 200 240 L240 400 Z" fill="url(#lucasHoodie)" />
            {/* Cordões do capuz */}
            <line x1="120" y1="260" x2="115" y2="340" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
            <line x1="160" y1="260" x2="165" y2="340" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
            <circle cx="115" cy="342" r="3.5" fill="#cbd5e1" />
            <circle cx="165" cy="342" r="3.5" fill="#cbd5e1" />

            {/* Pescoço com camiseta branca aparecendo */}
            <rect x="122" y="200" width="36" height="40" fill="#fed7aa" rx="6" />
            <polygon points="122,230 140,250 158,230" fill="#ffffff" />

            {/* Rosto do Lucas */}
            <ellipse cx="140" cy="155" rx="56" ry="60" fill="#fed7aa" />

            {/* Franja Longa que Cobre Parte dos Olhos */}
            <path d="M80 135 C95 90, 185 90, 200 135 C175 110, 150 145, 135 125 C120 145, 100 110, 80 135 Z" fill="url(#lucasHair)" />
            <path d="M75 130 C85 180, 95 210, 100 225 C90 190, 80 160, 75 130 Z" fill="url(#lucasHair)" />
            <path d="M205 130 C195 180, 185 210, 180 225 C190 190, 200 160, 205 130 Z" fill="url(#lucasHair)" />

            {/* Olhos Tímidos e Preocupados */}
            <g transform="translate(0, 0)">
              <ellipse cx="114" cy="156" rx="10" ry="12" fill="#0f172a" />
              <ellipse cx="166" cy="156" rx="10" ry="12" fill="#0f172a" />
              <circle cx="111" cy="153" r="3.5" fill="#ffffff" />
              <circle cx="163" cy="153" r="3.5" fill="#ffffff" />

              {/* Sobrancelhas Franzidas e Inseguras */}
              <path d="M102 142 Q114 146 126 140" stroke="#451a03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M154 140 Q166 146 178 142" stroke="#451a03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>

            <circle cx="140" cy="172" r="2" fill="#ea580c" />
            {/* Boca Tímida / Insegura */}
            {isSpeaking ? (
              <path d="M134 186 Q140 194 146 186 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1" />
            ) : (
              <path d="M134 187 Q140 185 146 187" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
          </svg>
        )}

        {/* ===================================================================== */}
        {/* MODELO 3: COORDENADORA HELENA - PROFISSIONAL, FIRME E ACOLHEDORA      */}
        {/* ===================================================================== */}
        {type === 'coordenadora' && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="helenaSuit" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#581c87" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
              <linearGradient id="helenaHair" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Penteado Elegante Preso em Coque */}
            <circle cx="140" cy="100" r="32" fill="url(#helenaHair)" />
            <circle cx="140" cy="140" rx="70" ry="75" fill="url(#helenaHair)" />

            {/* Blazer de Gestora Educacional Roxo Escuro */}
            <path d="M40 400 L80 235 C100 225, 180 225, 200 235 L240 400 Z" fill="url(#helenaSuit)" />
            {/* Lapela do Blazer e Blusa de Cetim Lilás */}
            <polygon points="110,225 140,280 170,225" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1" />
            <polygon points="80,235 125,320 140,320 140,400 65,400" fill="#3b0764" />
            <polygon points="200,235 155,320 140,320 140,400 215,400" fill="#3b0764" />
            
            {/* Pingente Dourado da Justiça Restaurativa */}
            <circle cx="140" cy="270" r="5" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />

            {/* Pescoço Maduro e Elegante */}
            <rect x="122" y="195" width="36" height="40" fill="#fed7aa" rx="6" />

            {/* Rosto Maduro e Sereno */}
            <ellipse cx="140" cy="155" rx="58" ry="62" fill="#fed7aa" />

            {/* Cabelo Frontal com Ondulação Sofisticada */}
            <path d="M80 135 C95 85, 185 85, 200 135 C175 105, 150 115, 140 120 C120 115, 95 105, 80 135 Z" fill="url(#helenaHair)" />

            {/* Olhos Firmes e Compassivos */}
            <g transform="translate(0, 0)">
              <ellipse cx="114" cy="154" rx="11" ry="13" fill="#3b0764" />
              <ellipse cx="166" cy="154" rx="11" ry="13" fill="#3b0764" />
              <circle cx="111" cy="150" r="4" fill="#ffffff" />
              <circle cx="163" cy="150" r="4" fill="#ffffff" />

              {/* Linhas de Expressão de Experiência e Sabedoria */}
              <path d="M100 138 Q114 132 128 136" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M152 136 Q166 132 180 138" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            {/* Brincos de Pérola */}
            <circle cx="80" cy="170" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="200" cy="170" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

            {/* Boca Acolhedora de Mediadora */}
            {isSpeaking ? (
              <path d="M130 186 Q140 198 150 186 Z" fill="#9f1239" stroke="#881337" strokeWidth="1.5" />
            ) : (
              <path d="M130 186 Q140 192 150 186" stroke="#9f1239" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
          </svg>
        )}

        {/* ===================================================================== */}
        {/* MODELO 4: BERNARDO (aluno_lider) - CONFIANTE / DESAFIADOR             */}
        {/* ===================================================================== */}
        {type === 'aluno_lider' && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="bernardoJacket" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>

            {/* Cabelo Arrepiado Moderno Preto */}
            <path d="M80 140 C65 70, 215 70, 200 140 C210 110, 195 80, 140 80 C85 80, 70 110, 80 140 Z" fill="#0f172a" />

            {/* Jaqueta Esportiva Vermelha com Detalhes Escuros */}
            <path d="M40 400 L80 235 C100 225, 180 225, 200 235 L240 400 Z" fill="url(#bernardoJacket)" />
            {/* Camiseta Preta por Baixo com Gola V */}
            <polygon points="115,225 140,270 165,225" fill="#0f172a" />
            {/* Faixas da Jaqueta Esportiva */}
            <line x1="75" y1="260" x2="60" y2="400" stroke="#ffffff" strokeWidth="6" />
            <line x1="205" y1="260" x2="220" y2="400" stroke="#ffffff" strokeWidth="6" />

            {/* Pescoço Forte */}
            <rect x="120" y="195" width="40" height="40" fill="#fed7aa" rx="6" />

            {/* Rosto Confiante */}
            <ellipse cx="140" cy="155" rx="58" ry="62" fill="#fed7aa" />

            {/* Cabelo Frontal Espetado */}
            <path d="M85 130 C100 95, 180 95, 195 130 C180 115, 155 105, 140 100 C125 105, 100 115, 85 130 Z" fill="#0f172a" />

            {/* Olhos Desafiadores e Intensos */}
            <g transform="translate(0, 0)">
              <ellipse cx="114" cy="154" rx="11" ry="12" fill="#0f172a" />
              <ellipse cx="166" cy="154" rx="11" ry="12" fill="#0f172a" />
              <circle cx="111" cy="150" r="3" fill="#ffffff" />
              <circle cx="163" cy="150" r="3" fill="#ffffff" />

              {/* Sobrancelhas Inclinadas (Desafiadoras) */}
              <path d="M100 140 L126 148" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M180 140 L154 148" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
            </g>

            {/* Sorriso Lateral Irônico */}
            {isSpeaking ? (
              <path d="M130 184 Q140 196 152 182 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1.5" />
            ) : (
              <path d="M130 186 Q142 192 152 182" stroke="#991b1b" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
          </svg>
        )}

        {/* ===================================================================== */}
        {/* MODELO 5: INSPETOR / MEDIADOR ESCOLAR (inspetor)                     */}
        {/* ===================================================================== */}
        {(type === 'inspetor' || type === 'colega_apoio') && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <ellipse cx="140" cy="140" rx="70" ry="75" fill="#334155" />
            <path d="M40 400 L80 235 C100 225, 180 225, 200 235 L240 400 Z" fill="#047857" />
            <polygon points="115,225 140,265 165,225" fill="#ffffff" />
            <rect x="122" y="195" width="36" height="40" fill="#fed7aa" rx="6" />
            <ellipse cx="140" cy="155" rx="58" ry="62" fill="#fed7aa" />
            <ellipse cx="114" cy="154" rx="10" ry="11" fill="#0f172a" />
            <ellipse cx="166" cy="154" rx="10" ry="11" fill="#0f172a" />
            <circle cx="111" cy="150" r="3" fill="#ffffff" />
            <circle cx="163" cy="150" r="3" fill="#ffffff" />
            <path d="M120 182 Q140 190 160 182" stroke="#334155" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M132 190 Q140 194 148 190" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        )}

      </div>

      {/* Cartão de Identificação do Personagem Embutido na Base (Estilo Visual Novel HUD) */}
      <div className="absolute bottom-2 z-10 px-4 py-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-purple-500/50 shadow-xl flex items-center gap-2">
        <span 
          className="w-2.5 h-2.5 rounded-full" 
          style={{ backgroundColor: character.accentColor || '#a855f7' }} 
        />
        <span className="font-display font-black text-xs text-white tracking-wide">
          {speakerName || character.name}
        </span>
        <span className="text-[10px] font-mono text-purple-300">
          • {character.role}
        </span>
      </div>
    </div>
  );
};




export type SceneTheme = 
  | 'biblioteca' 
  | 'sala_aula' 
  | 'corredor' 
  | 'patio' 
  | 'sala_mediacao' 
  | 'auditorio' 
  | 'laboratorio';

export type TimeOfDay = 
  | 'manha' 
  | 'tarde' 
  | 'recreio' 
  | 'saida' 
  | 'crepusculo';

interface NarrativeEnvironmentStageProps {
  theme: SceneTheme;
  timeOfDay?: string;
  atmosphere?: string;
  locationName: string;
  className?: string;
  children?: React.ReactNode;
}

export const NarrativeEnvironmentStage: React.FC<NarrativeEnvironmentStageProps> = ({
  theme,
  timeOfDay,
  atmosphere,
  locationName,
  className = '',
  children
}) => {
  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* ===================================================================== */}
      {/* 1. CAMADA DE FUNDO COM CENÁRIO ESCOLAR VETORIAL RENDERIZADO           */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        
        {/* ======================= CENÁRIO 1: BIBLIOTECA ESCOLAR ======================= */}
        {theme === 'biblioteca' && (
          <svg 
            viewBox="0 0 1200 700" 
            preserveAspectRatio="xMidYMid slice" 
            className="w-full h-full object-cover"
          >
            <defs>
              <linearGradient id="biblioWall" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2c1a4d" />
                <stop offset="60%" stopColor="#432874" />
                <stop offset="100%" stopColor="#241442" />
              </linearGradient>
              <linearGradient id="biblioFloor" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3d2314" />
                <stop offset="40%" stopColor="#5c3820" />
                <stop offset="100%" stopColor="#2b170b" />
              </linearGradient>
              <linearGradient id="windowLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.55" />
                <stop offset="60%" stopColor="#fef08a" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="sunBeam" x1="0%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fed7aa" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="deskWood" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="50%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <linearGradient id="lampShade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#052e16" />
              </linearGradient>
            </defs>

            {/* Parede de Fundo da Biblioteca */}
            <rect width="1200" height="700" fill="url(#biblioWall)" />

            {/* Janela Arquitetônica Clássica com Luz do Sol da Tarde */}
            <g opacity="0.95">
              <rect x="80" y="50" width="220" height="340" rx="110" fill="#fef3c7" opacity="0.3" />
              <rect x="90" y="60" width="200" height="320" rx="100" fill="#bae6fd" opacity="0.4" />
              {/* Moldura da Janela */}
              <path d="M90 160 L290 160 M90 260 L290 260 M190 60 L190 380" stroke="#fef08a" strokeWidth="4" opacity="0.8" />
              <rect x="80" y="50" width="220" height="340" rx="110" fill="none" stroke="#fde047" strokeWidth="6" opacity="0.7" />
              {/* Feixe de Luz volumétrico caindo na sala */}
              <polygon points="90,120 750,700 400,700 150,220" fill="url(#sunBeam)" />
            </g>

            {/* Estantes de Livros no Fundo (Perspectiva Central/Esquerda) */}
            <g opacity="0.85">
              {/* Estante Lateral Esquerda */}
              <rect x="0" y="100" width="70" height="480" fill="#1e102d" />
              <rect x="65" y="100" width="10" height="480" fill="#3b2057" />
              {/* Prateleiras */}
              {[150, 210, 270, 330, 390, 450, 510].map((y, i) => (
                <rect key={`shelf-l-${i}`} x="0" y={y} width="70" height="8" fill="#581c87" />
              ))}
            </g>

            {/* Grande Estante Central da Biblioteca com centenas de livros coloridos */}
            <g transform="translate(330, 80)">
              {/* Moldura da Estante em Madeira Escura */}
              <rect x="0" y="0" width="540" height="420" rx="6" fill="#1b1129" stroke="#7e22ce" strokeWidth="3" opacity="0.9" />
              
              {/* 5 Prateleiras */}
              {[80, 160, 240, 320, 400].map((shelfY, sIdx) => (
                <g key={`shelf-c-${sIdx}`}>
                  <rect x="0" y={shelfY} width="540" height="10" fill="#4c1d95" />
                  <rect x="0" y={shelfY + 10} width="540" height="4" fill="#1e1136" />
                  
                  {/* Livros na prateleira */}
                  {Array.from({ length: 28 }).map((_, bIdx) => {
                    const bookWidth = 14 + ((bIdx * 7) % 8);
                    const bookHeight = 45 + ((bIdx * 13) % 22);
                    const bookX = 12 + bIdx * 18.5;
                    const colors = ['#dc2626', '#2563eb', '#16a34a', '#ca8a04', '#9333ea', '#db2777', '#0891b2', '#475569', '#ea580c'];
                    const bColor = colors[(bIdx + sIdx * 3) % colors.length];
                    const isTilted = bIdx === 7 || bIdx === 21;
                    
                    return (
                      <rect 
                        key={`book-${sIdx}-${bIdx}`}
                        x={bookX} 
                        y={shelfY - bookHeight} 
                        width={bookWidth} 
                        height={bookHeight} 
                        rx="2"
                        fill={bColor}
                        transform={isTilted ? `rotate(-12, ${bookX}, ${shelfY})` : undefined}
                        opacity="0.85"
                      />
                    );
                  })}
                </g>
              ))}

              {/* Placa da Seção na Estante */}
              <rect x="190" y="15" width="160" height="26" rx="4" fill="#a855f7" opacity="0.9" />
              <text x="270" y="32" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                CIÊNCIAS HUMANAS
              </text>
            </g>

            {/* Estante Lateral Direita */}
            <g opacity="0.85" transform="translate(900, 100)">
              <rect x="0" y="0" width="300" height="480" fill="#1c0f2b" stroke="#6b21a8" strokeWidth="2" />
              {[60, 130, 200, 270, 340, 410].map((sy, i) => (
                <rect key={`shelf-r-${i}`} x="0" y={sy} width="300" height="8" fill="#4c1d95" />
              ))}
            </g>

            {/* Piso de Madeira Nobre com Perspectiva Isométrica */}
            <polygon points="0,520 1200,520 1200,700 0,700" fill="url(#biblioFloor)" />
            {/* Tábuas do Piso */}
            {[0, 150, 300, 450, 600, 750, 900, 1050, 1200].map((x, i) => (
              <line key={`floor-line-${i}`} x1={x} y1="520" x2={x + (x - 600) * 0.4} y2="700" stroke="#1f0f07" strokeWidth="2" opacity="0.6" />
            ))}
            <line x1="0" y1="580" x2="1200" y2="580" stroke="#78350f" strokeWidth="1" opacity="0.4" />
            <line x1="0" y1="640" x2="1200" y2="640" stroke="#78350f" strokeWidth="1" opacity="0.4" />

            {/* Mesa de Estudo da Biblioteca (Primeiro Plano Central) */}
            <g transform="translate(180, 470)">
              {/* Tampo da Mesa */}
              <polygon points="40,20 800,20 840,90 0,90" fill="url(#deskWood)" stroke="#92400e" strokeWidth="2" />
              <rect x="0" y="90" width="840" height="15" fill="#291205" />
              {/* Pernas da Mesa */}
              <rect x="25" y="105" width="22" height="125" fill="#1c0b03" />
              <rect x="795" y="105" width="22" height="125" fill="#1c0b03" />
              <rect x="180" y="105" width="16" height="125" fill="#2d1305" opacity="0.6" />
              <rect x="640" y="105" width="16" height="125" fill="#2d1305" opacity="0.6" />

              {/* Luminária Tradicional de Biblioteca (Estilo Banker's Lamp Verde Esmeralda) */}
              <g transform="translate(400, -35)">
                <ellipse cx="20" cy="55" rx="18" ry="6" fill="#ca8a04" />
                <path d="M20 50 L20 18" stroke="#eab308" strokeWidth="4" />
                <path d="M5 14 Q20 4 35 14 L32 24 Q20 16 8 24 Z" fill="url(#lampShade)" stroke="#22c55e" strokeWidth="1" />
                {/* Brilho da Lâmpada */}
                <ellipse cx="20" cy="22" rx="28" ry="12" fill="#86efac" opacity="0.35" />
              </g>

              {/* Notebook Aberto sobre a Mesa (Pivô do Caso do Cyberbullying) */}
              <g transform="translate(140, 2)">
                {/* Base do Teclado */}
                <polygon points="10,45 110,45 125,72 -5,72" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                <polygon points="18,48 102,48 114,68 6,68" fill="#1e293b" />
                {/* Tela do Notebook Aberta inclinada */}
                <polygon points="10,45 110,45 118,-25 2,-25" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                {/* Tela iluminada (notificação do app com brilho fuchsia) */}
                <polygon points="14,41 106,41 113,-20 7,-20" fill="#38bdf8" opacity="0.85" />
                <rect x="18" y="-12" width="84" height="24" rx="3" fill="#701a75" opacity="0.9" />
                <rect x="22" y="-8" width="50" height="4" rx="2" fill="#ffffff" />
                <rect x="22" y="-1" width="70" height="3" rx="1.5" fill="#fbcfe8" />
                <circle cx="95" cy="-6" r="3" fill="#ec4899" />
              </g>

              {/* Pilha de Livros e Cadernos de Estudo */}
              <g transform="translate(620, 28)">
                <rect x="0" y="24" width="90" height="16" rx="2" fill="#2563eb" />
                <rect x="5" y="12" width="82" height="14" rx="2" fill="#dc2626" />
                <rect x="8" y="2" width="74" height="12" rx="2" fill="#ca8a04" />
                {/* Caneta esferográfica */}
                <line x1="-15" y1="36" x2="35" y2="40" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>

            {/* Gradiente de Vinheta e Luz da Atmosfera */}
            <rect width="1200" height="700" fill="url(#windowLight)" pointerEvents="none" />
            <rect width="1200" height="700" fill="url(#biblioWall)" opacity="0.15" pointerEvents="none" />
          </svg>
        )}

        {/* ======================= CENÁRIO 2: SALA DE AULA ======================= */}
        {theme === 'sala_aula' && (
          <svg 
            viewBox="0 0 1200 700" 
            preserveAspectRatio="xMidYMid slice" 
            className="w-full h-full object-cover"
          >
            <defs>
              <linearGradient id="classWall" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="70%" stopColor="#312e81" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </linearGradient>
              <linearGradient id="boardGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#064e3b" />
                <stop offset="100%" stopColor="#022c22" />
              </linearGradient>
              <linearGradient id="classFloor" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Parede da Sala */}
            <rect width="1200" height="700" fill="url(#classWall)" />

            {/* Janelas Altas com Luz Natural */}
            <g transform="translate(50, 40)" opacity="0.85">
              <rect x="0" y="0" width="180" height="260" rx="8" fill="#bae6fd" opacity="0.35" stroke="#fcd34d" strokeWidth="4" />
              <line x1="90" y1="0" x2="90" y2="260" stroke="#fcd34d" strokeWidth="3" />
              <line x1="0" y1="130" x2="180" y2="130" stroke="#fcd34d" strokeWidth="3" />
            </g>

            {/* Grande Quadro Escolar da EEMTI Alfredo Machado */}
            <g transform="translate(280, 50)">
              {/* Moldura de Alumínio */}
              <rect x="0" y="0" width="640" height="280" rx="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="4" />
              {/* Superfície Verde Escolar */}
              <rect x="12" y="12" width="616" height="256" rx="4" fill="url(#boardGreen)" />
              {/* Calha de Giz */}
              <rect x="6" y="274" width="628" height="12" rx="2" fill="#64748b" />
              
              {/* Conteúdo escrito com giz no quadro */}
              <text x="320" y="55" fill="#f8fafc" fontSize="16" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle" opacity="0.9" letterSpacing="1">
                EEMTI ALFREDO MACHADO • PROJETO DE CONVIVÊNCIA ÉTICA
              </text>
              <line x1="140" y1="68" x2="500" y2="68" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />

              <text x="50" y="110" fill="#fef08a" fontSize="13" fontFamily="monospace" fontWeight="bold">
                TEMA: Respeito às Diferenças & Prevenção ao Bullying
              </text>
              <text x="50" y="140" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">
                1. Intimidação Sistemática: Lei nº 13.185/2015 e Lei nº 14.811/2024
              </text>
              <text x="50" y="165" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">
                2. Responsabilidade Coletiva: o papel de quem assiste e de quem acolhe
              </text>
              <text x="50" y="190" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif">
                3. Canais Seguros de Ajuda: Ouvidoria, Coordenação e Plataforma StopBullying
              </text>

              {/* Desenho didático no quadro */}
              <circle cx="540" cy="180" r="45" fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="5 3" />
              <text x="540" y="185" fill="#67e8f9" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                MEDIAÇÃO
              </text>
            </g>

            {/* Relógio de Parede Escolar */}
            <g transform="translate(970, 70)">
              <circle cx="35" cy="35" r="32" fill="#ffffff" stroke="#475569" strokeWidth="4" />
              <circle cx="35" cy="35" r="3" fill="#0f172a" />
              <line x1="35" y1="35" x2="35" y2="15" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <line x1="35" y1="35" x2="50" y2="35" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Piso da Sala de Aula */}
            <polygon points="0,460 1200,460 1200,700 0,700" fill="url(#classFloor)" />
            {/* Linhas de lajota escolar */}
            {[0, 200, 400, 600, 800, 1000, 1200].map((x, i) => (
              <line key={`class-tile-${i}`} x1={x} y1="460" x2={x + (x - 600) * 0.3} y2="700" stroke="#334155" strokeWidth="2" opacity="0.6" />
            ))}

            {/* Carteiras Escolares em Filas (Profundidade Espacial) */}
            {/* Fileira de trás */}
            <g transform="translate(100, 420)" opacity="0.75">
              <rect x="0" y="0" width="160" height="60" rx="4" fill="#3b82f6" />
              <rect x="300" y="0" width="160" height="60" rx="4" fill="#3b82f6" />
              <rect x="600" y="0" width="160" height="60" rx="4" fill="#3b82f6" />
              <rect x="900" y="0" width="160" height="60" rx="4" fill="#3b82f6" />
            </g>

            {/* Carteira do Primeiro Plano (Mesa do Professor/Aluno) */}
            <g transform="translate(200, 480)">
              <polygon points="40,20 760,20 800,80 0,80" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
              <rect x="0" y="80" width="800" height="12" fill="#0c4a6e" />
              <rect x="30" y="92" width="16" height="120" fill="#334155" />
              <rect x="754" y="92" width="16" height="120" fill="#334155" />
              
              {/* Estojo e Livro Escolar */}
              <rect x="120" y="32" width="80" height="35" rx="5" fill="#f43f5e" />
              <rect x="240" y="26" width="120" height="44" rx="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
              <line x1="300" y1="26" x2="300" y2="70" stroke="#cbd5e1" strokeWidth="2" />
            </g>
          </svg>
        )}

        {/* ======================= CENÁRIO 3: CORREDOR ESCOLAR ======================= */}
        {theme === 'corredor' && (
          <svg 
            viewBox="0 0 1200 700" 
            preserveAspectRatio="xMidYMid slice" 
            className="w-full h-full object-cover"
          >
            <defs>
              <linearGradient id="corridorCeiling" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1035" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
              <linearGradient id="corridorFloor" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#312e81" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="lockerViolet" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4c1d95" />
                <stop offset="50%" stopColor="#6d28d9" />
                <stop offset="100%" stopColor="#3b0764" />
              </linearGradient>
            </defs>

            {/* Ponto de Fuga Central no Fim do Corredor */}
            <rect width="1200" height="700" fill="#180d2e" />

            {/* Teto com Luzes Fluorescentes em Perspectiva */}
            <polygon points="0,0 1200,0 720,240 480,240" fill="url(#corridorCeiling)" />
            {/* Lâmpadas no Teto convergindo ao centro */}
            <line x1="500" y1="40" x2="540" y2="230" stroke="#fef08a" strokeWidth="6" opacity="0.8" />
            <line x1="700" y1="40" x2="660" y2="230" stroke="#fef08a" strokeWidth="6" opacity="0.8" />

            {/* Fundo do Corredor (Porta envidraçada que dá para o pátio) */}
            <rect x="520" y="240" width="160" height="180" fill="#38bdf8" opacity="0.4" stroke="#a855f7" strokeWidth="3" />
            <polygon points="520,240 680,240 760,420 440,420" fill="#60a5fa" opacity="0.15" />

            {/* Piso Polido com Reflexos de Luz */}
            <polygon points="0,700 1200,700 680,420 520,420" fill="url(#corridorFloor)" />
            {/* Reflexo das lâmpadas no chão */}
            <polygon points="560,420 640,420 780,700 420,700" fill="#fef08a" opacity="0.1" />

            {/* Paredes Laterais com Armários / Portas das Salas */}
            {/* Parede Esquerda com Armários Escolares Roxos */}
            <polygon points="0,0 480,240 520,420 0,700" fill="url(#lockerViolet)" />
            {/* Divisórias dos armários */}
            {[60, 140, 230, 330, 420].map((x, i) => (
              <line key={`locker-l-${i}`} x1={x} y1={x * 0.4} x2={x + 30} y2={650 - x * 0.4} stroke="#8b5cf6" strokeWidth="3" opacity="0.7" />
            ))}

            {/* Parede Direita com Mural Informativo e Portas de Salas */}
            <polygon points="1200,0 720,240 680,420 1200,700" fill="#2e1065" />
            {/* Mural de Avisos Escolar na Parede Direita */}
            <polygon points="850,260 1120,180 1120,480 850,420" fill="#78350f" stroke="#ca8a04" strokeWidth="3" />
            <polygon points="865,272 1105,195 1105,465 865,410" fill="#fef3c7" opacity="0.85" />
            {/* Papéis afixados no mural */}
            <rect x="900" y="260" width="50" height="60" fill="#f43f5e" rx="2" transform="rotate(5, 900, 260)" />
            <rect x="980" y="240" width="60" height="70" fill="#3b82f6" rx="2" transform="rotate(-3, 980, 240)" />
            <rect x="920" y="340" width="70" height="50" fill="#22c55e" rx="2" />
          </svg>
        )}

        {/* ======================= CENÁRIO 4: PÁTIO / ÁREA EXTERNA ======================= */}
        {theme === 'patio' && (
          <svg 
            viewBox="0 0 1200 700" 
            preserveAspectRatio="xMidYMid slice" 
            className="w-full h-full object-cover"
          >
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="60%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>
              <linearGradient id="yardGround" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#15803d" />
                <stop offset="40%" stopColor="#166534" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
            </defs>

            {/* Céu Aberto de Fortaleza/Ceará */}
            <rect width="1200" height="420" fill="url(#skyGrad)" />
            {/* Sol radiante */}
            <circle cx="1020" cy="120" r="50" fill="#fef08a" opacity="0.85" />
            <circle cx="1020" cy="120" r="85" fill="#fef08a" opacity="0.25" />

            {/* Silhueta do Edifício Principal da EEMTI Alfredo Machado */}
            <polygon points="120,420 120,240 480,240 480,200 760,200 760,420" fill="#312e81" opacity="0.8" />
            <polygon points="480,200 620,130 760,200" fill="#4338ca" />
            <rect x="520" y="240" width="60" height="80" rx="30" fill="#fed7aa" opacity="0.9" />

            {/* Árvores e Vegetação do Pátio */}
            <g opacity="0.9">
              <circle cx="90" cy="380" r="80" fill="#15803d" />
              <circle cx="160" cy="360" r="65" fill="#16a34a" />
              <circle cx="850" cy="380" r="95" fill="#166534" />
              <circle cx="940" cy="360" r="80" fill="#15803d" />
            </g>

            {/* Chão do Pátio Escolar (Gramado e Pavimento) */}
            <rect y="420" width="1200" height="280" fill="url(#yardGround)" />
            {/* Caminho pavimentado diagonal */}
            <polygon points="340,420 480,420 860,700 600,700" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />

            {/* Banco de Madeira do Pátio (Ponto de Encontro dos Alunos) */}
            <g transform="translate(180, 480)">
              <rect x="0" y="40" width="220" height="14" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1" />
              <rect x="0" y="22" width="220" height="12" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1" />
              <rect x="0" y="4" width="220" height="12" rx="3" fill="#78350f" stroke="#451a03" strokeWidth="1" />
              <rect x="25" y="54" width="12" height="70" fill="#1e293b" />
              <rect x="185" y="54" width="12" height="70" fill="#1e293b" />
            </g>
          </svg>
        )}

        {/* ======================= CENÁRIO 5: SALA DE MEDIAÇÃO / GESTÃO ======================= */}
        {(theme === 'sala_mediacao' || theme === 'auditorio' || theme === 'laboratorio') && (
          <svg 
            viewBox="0 0 1200 700" 
            preserveAspectRatio="xMidYMid slice" 
            className="w-full h-full object-cover"
          >
            <defs>
              <linearGradient id="cozyWall" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b0764" />
                <stop offset="70%" stopColor="#581c87" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
              <linearGradient id="warmFloor" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#1c0b03" />
              </linearGradient>
            </defs>

            <rect width="1200" height="700" fill="url(#cozyWall)" />

            {/* Janela com Cortinas Elegantes e Luz Suave */}
            <g transform="translate(140, 50)" opacity="0.85">
              <rect x="0" y="0" width="240" height="320" rx="6" fill="#fef08a" opacity="0.3" stroke="#e9d5ff" strokeWidth="3" />
              <path d="M0 0 Q40 160 10 320 L50 320 Q20 160 30 0 Z" fill="#7c3aed" opacity="0.8" />
              <path d="M240 0 Q200 160 230 320 L190 320 Q220 160 210 0 Z" fill="#7c3aed" opacity="0.8" />
            </g>

            {/* Quadro com Código de Convivência e Lei 14.811 */}
            <g transform="translate(480, 60)">
              <rect x="0" y="0" width="340" height="220" rx="8" fill="#ffffff" stroke="#c084fc" strokeWidth="4" />
              <rect x="15" y="15" width="310" height="190" fill="#faf5ff" />
              <text x="170" y="45" fill="#581c87" fontSize="13" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                NÚCLEO DE MEDIAÇÃO & PAZ
              </text>
              <line x1="40" y1="58" x2="300" y2="58" stroke="#d8b4fe" strokeWidth="2" />
              <text x="35" y="85" fill="#374151" fontSize="10" fontFamily="sans-serif">
                • Escuta ativa e acolhimento confidencial
              </text>
              <text x="35" y="110" fill="#374151" fontSize="10" fontFamily="sans-serif">
                • Restauração das relações escolares
              </text>
              <text x="35" y="135" fill="#374151" fontSize="10" fontFamily="sans-serif">
                • Compromisso mútuo contra o cyberbullying
              </text>
              <text x="35" y="160" fill="#374151" fontSize="10" fontFamily="sans-serif">
                • Garantia de sigilo integral ao estudante
              </text>
            </g>

            {/* Piso Acolhedor de Madeira */}
            <polygon points="0,480 1200,480 1200,700 0,700" fill="url(#warmFloor)" />

            {/* Tapete Circular de Mediação */}
            <ellipse cx="600" cy="590" rx="380" ry="85" fill="#7e22ce" opacity="0.5" stroke="#c084fc" strokeWidth="2" />
            <ellipse cx="600" cy="590" rx="330" ry="70" fill="#581c87" opacity="0.7" />

            {/* Cadeiras de Mediação em Círculo (Simbolizando Diálogo Restaurativo) */}
            <g transform="translate(340, 510)">
              <rect x="0" y="0" width="90" height="85" rx="16" fill="#a855f7" stroke="#7e22ce" strokeWidth="3" />
              <ellipse cx="45" cy="70" rx="35" ry="12" fill="#c084fc" />
            </g>
            <g transform="translate(770, 510)">
              <rect x="0" y="0" width="90" height="85" rx="16" fill="#a855f7" stroke="#7e22ce" strokeWidth="3" />
              <ellipse cx="45" cy="70" rx="35" ry="12" fill="#c084fc" />
            </g>
          </svg>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 2. GRADIENTES DE PROFUNDIDADE E ILUMINAÇÃO CINEMATOGRÁFICA            */}
      {/* ===================================================================== */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70 pointer-events-none" />

      {/* ===================================================================== */}
      {/* 3. TAG FLUTUANTE DE LOCALIZAÇÃO DO JOGO (HUD DISCRETO NO TOPO)         */}
      {/* ===================================================================== */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-purple-500/40 text-purple-200 shadow-lg text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-white tracking-wide">{locationName}</span>
          {timeOfDay && (
            <>
              <span className="text-purple-400">·</span>
              <span className="text-purple-300 font-normal">{timeOfDay}</span>
            </>
          )}
        </div>
        {atmosphere && (
          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 text-slate-300 text-[11px] italic">
            {atmosphere}
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 4. CONTEÚDO EMBUTIDO (PERSONAGENS, DIÁLOGOS, OVERLAYS)               */}
      {/* ===================================================================== */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end">
        {children}
      </div>
    </div>
  );
};






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






interface ChoiceFeedbackPanelProps {
  choice: NarrativeChoice;
  currentActNumber: number;
  totalActs: number;
  onAdvance: () => void;
}

export const ChoiceFeedbackPanel: React.FC<ChoiceFeedbackPanelProps> = ({
  choice,
  currentActNumber,
  totalActs,
  onAdvance
}) => {
  const isPositive = choice.impact === 'positivo';
  const isNeutral = choice.impact === 'neutro';

  // Configurações visuais por impacto (Gamer / Visual Novel HUD)
  const impactConfig = isPositive
    ? {
        label: 'Decisão Ética Exemplar',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
        borderColor: 'border-emerald-500/60',
        bgGradient: 'from-emerald-950/90 via-[#0d2818]/90 to-slate-950',
        icon: CheckCircle2,
        iconColor: 'text-emerald-400',
        scoreBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
      }
    : isNeutral
    ? {
        label: 'Ação com Impacto Parcial / Risco Residual',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/50',
        borderColor: 'border-amber-500/60',
        bgGradient: 'from-amber-950/90 via-[#2e1d05]/90 to-slate-950',
        icon: Sparkles,
        iconColor: 'text-amber-400',
        scoreBadge: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      }
    : {
        label: 'Conduta Inadequada / Exposição ou Prejuízo',
        badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/50',
        borderColor: 'border-rose-500/60',
        bgGradient: 'from-rose-950/90 via-[#2c0911]/90 to-slate-950',
        icon: AlertTriangle,
        iconColor: 'text-rose-400',
        scoreBadge: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      };

  const IconComponent = impactConfig.icon;
  const isFinalAct = currentActNumber >= totalActs;

  return (
    <div className={`mt-4 rounded-3xl border-2 ${impactConfig.borderColor} bg-gradient-to-br ${impactConfig.bgGradient} backdrop-blur-xl shadow-2xl p-5 sm:p-7 text-white space-y-6 animate-fadeIn`}>
      
      {/* 1. TOPO: STATUS DA DECISÃO & PONTUAÇÃO CONQUISTADA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl ${impactConfig.badgeColor} border flex-shrink-0 shadow-md`}>
            <IconComponent className={`w-6 h-6 ${impactConfig.iconColor}`} />
          </div>
          <div>
            <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${impactConfig.badgeColor} inline-block mb-1`}>
              {impactConfig.label}
            </span>
            <h4 className="font-display font-black text-base sm:text-lg text-white">
              Análise das Consequências da sua Escolha
            </h4>
          </div>
        </div>

        {/* Badge de Pontuação da Escolha */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className={`px-3.5 py-1.5 rounded-xl border ${impactConfig.scoreBadge} font-mono font-bold text-xs flex items-center gap-1.5 shadow-sm`}>
            <Award className="w-4 h-4 text-amber-300" />
            <span>+{choice.points} Pontos de Assertividade</span>
          </div>
        </div>
      </div>

      {/* 2. O QUE ACONTECEU NA HISTÓRIA (RAMIFICAÇÃO NARRATIVA) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-fuchsia-400" />
          Desdobramento Imediato no Ambiente Escolar:
        </span>
        <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed">
          {choice.whatHappened}
        </p>
      </div>

      {/* 3. COLUNAS PEDAGÓGICAS: REFLEXÃO ÉTICA & APRENDIZADO PRÁTICO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Análise Ética */}
        <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-300">
            <Scale className="w-4 h-4 text-fuchsia-400" />
            <span>Reflexão Ética & Empática</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {choice.ethicalAnalysis}
          </p>
        </div>

        {/* Aprendizado Prático */}
        <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/20 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Diretriz Prática de Convivência</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            {choice.practicalLearning}
          </p>
        </div>

      </div>

      {/* 4. BASE LEGAL (LEI 14.811/2024 OU ECA) */}
      {choice.legalBasis && (
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-white font-mono">
                {choice.legalBasis.law}
              </span>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded-md">
                {choice.legalBasis.article}
              </span>
            </div>
            <p className="text-xs text-purple-200 leading-relaxed">
              {choice.legalBasis.summary}
            </p>
          </div>
        </div>
      )}

      {/* 5. BOTÃO DE AVANÇO PARA O PRÓXIMO ATO OU DESFECHO */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onAdvance}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black text-sm transition-all shadow-xl shadow-fuchsia-950/80 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
        >
          <span>
            {isFinalAct
              ? 'Ver Desfecho Final do Caso & Radar de Competências'
              : `Avançar para o Ato ${currentActNumber + 1} de ${totalActs}`}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};






interface InvestigationBoardModalProps {
  story: NarrativeStory;
  currentActNumber: number;
  isOpen: boolean;
  onClose: () => void;
}

export const InvestigationBoardModal: React.FC<InvestigationBoardModalProps> = ({
  story,
  currentActNumber,
  isOpen,
  onClose
}) => {
  const [activeCategory, setActiveCategory] = useState<'todas' | 'pista' | 'dialogo' | 'evidencia' | 'cronologia'>('todas');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const items = story.investigationItems;

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'todas' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedItem = items.find(item => item.id === selectedItemId) || filteredItems[0] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-gradient-to-b from-[#18122B] via-[#120D24] to-[#0A0716] border-2 border-purple-500/40 shadow-2xl overflow-hidden text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="investigation-board-title"
      >
        {/* CABEÇALHO DO PAINEL DE INVESTIGAÇÃO */}
        <div className="p-4 sm:p-6 border-b border-purple-500/30 flex items-center justify-between bg-purple-950/40">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-purple-800 border border-fuchsia-400/50 shadow-md">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-fuchsia-300 bg-fuchsia-950/60 border border-fuchsia-500/40 px-2 py-0.5 rounded-full">
                  Mural de Investigação Ética
                </span>
                <span className="text-[10px] text-purple-300 font-mono">
                  Ato Atual: {currentActNumber} de 5
                </span>
              </div>
              <h2 id="investigation-board-title" className="font-display font-black text-lg sm:text-2xl text-white mt-0.5">
                Dossiê: {story.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 cursor-pointer"
            aria-label="Fechar painel de investigação"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BARRA DE FILTROS E BUSCA */}
        <div className="p-3 sm:p-4 bg-purple-950/20 border-b border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Abas de Categorias */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'todas', label: 'Tudo', icon: Search, count: items.length },
              { id: 'pista', label: 'Pistas', icon: FileText, count: items.filter(i => i.category === 'pista').length },
              { id: 'dialogo', label: 'Diálogos', icon: Users, count: items.filter(i => i.category === 'dialogo').length },
              { id: 'evidencia', label: 'Evidências', icon: ShieldCheck, count: items.filter(i => i.category === 'evidencia').length },
              { id: 'cronologia', label: 'Cronologia', icon: Clock, count: items.filter(i => i.category === 'cronologia').length }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md shadow-fuchsia-900/30 border border-fuchsia-400/50'
                      : 'bg-white/5 hover:bg-white/10 text-purple-200 border border-purple-500/20'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/30' : 'bg-white/10'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Campo de Busca Rápida */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Buscar pistas ou relatos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-fuchsia-400"
            />
          </div>
        </div>

        {/* CORPO DO MURAL: GRID DE PISTAS + DETALHES DA PISTA SELECIONADA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* COLUNA ESQUERDA: LISTA DE ITENS */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-purple-300 font-bold px-1">
              <span>Evidências Identificadas</span>
              <span>{filteredItems.length} itens</span>
            </div>

            <div className="space-y-2.5">
              {filteredItems.map((item) => {
                const isUnlocked = item.unlockAtAct <= currentActNumber;
                const isSelected = selectedItem?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => isUnlocked && setSelectedItemId(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                      !isUnlocked
                        ? 'bg-purple-950/20 border-purple-900/40 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-gradient-to-r from-purple-900/60 to-fuchsia-950/60 border-fuchsia-400 shadow-lg ring-1 ring-fuchsia-400/40'
                        : 'bg-white/5 hover:bg-white/10 border-purple-500/20 hover:border-purple-400/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg text-xs ${
                          item.category === 'pista' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          item.category === 'dialogo' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                          item.category === 'evidencia' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {item.category === 'pista' && <FileText className="w-3.5 h-3.5" />}
                          {item.category === 'dialogo' && <Users className="w-3.5 h-3.5" />}
                          {item.category === 'evidencia' && <ShieldCheck className="w-3.5 h-3.5" />}
                          {item.category === 'cronologia' && <Clock className="w-3.5 h-3.5" />}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-purple-300 block line-clamp-1">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      {isUnlocked ? (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Ato {item.unlockAtAct}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-950/60 border border-purple-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Ato {item.unlockAtAct}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                      {isUnlocked ? item.description : 'Esta evidência será revelada no desenrolar da narrativa conforme novas decisões forem tomadas.'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUNA DIREITA: VISUALIZADOR DETALHADO DO ITEM SELECIONADO */}
          <div className="lg:col-span-7">
            {selectedItem ? (
              <div className="h-full rounded-2xl bg-gradient-to-b from-[#1c1533] to-[#140e26] border border-purple-500/30 p-5 space-y-5 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  {/* Topo do Dossiê */}
                  <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-fuchsia-300">
                        {selectedItem.category.toUpperCase()} • ATO {selectedItem.unlockAtAct}
                      </span>
                      <h3 className="font-display font-black text-lg sm:text-xl text-white">
                        {selectedItem.title}
                      </h3>
                      <p className="text-xs text-purple-200">
                        {selectedItem.subtitle}
                      </p>
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      selectedItem.importance === 'critica'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    }`}>
                      {selectedItem.importance === 'critica' ? 'Relevância Crítica' : 'Evidência de Contexto'}
                    </span>
                  </div>

                  {/* VISUALIZAÇÃO ESPECIALIZADA POR TIPO */}
                  {selectedItem.contentDetails.messages ? (
                    /* SIMULADOR DE TELA DE CELULAR / CHAT FICTÍCIO */
                    <div className="rounded-2xl bg-[#090b14] border-2 border-purple-500/40 p-4 space-y-3 shadow-inner">
                      {/* Barra de Status do Smartphone */}
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono pb-2 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-fuchsia-400" />
                          <span>StopChat Seguro (Fictício)</span>
                        </div>
                        <span>14:28 • 100% 🔋</span>
                      </div>

                      {/* Header do Grupo */}
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-purple-900/30 border border-purple-500/20">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xs text-white">
                          #
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            {selectedItem.contentDetails.sender}
                          </span>
                          <span className="text-[10px] text-purple-300">
                            18 membros da turma • Mensagens preservadas
                          </span>
                        </div>
                      </div>

                      {/* Balões de Mensagem */}
                      <div className="space-y-2 py-2">
                        {selectedItem.contentDetails.messages.map((msg, idx) => (
                          <div 
                            key={idx}
                            className={`p-3 rounded-2xl max-w-[85%] text-xs space-y-1 shadow-sm ${
                              msg.isSelf 
                                ? 'ml-auto bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-tr-xs' 
                                : 'bg-[#181a29] text-gray-200 border border-white/10 rounded-tl-xs'
                            }`}
                          >
                            <span className="text-[10px] font-bold text-fuchsia-300 block">
                              {msg.sender}
                            </span>
                            <p className="text-xs leading-relaxed">{msg.text}</p>
                            <span className="text-[9px] text-gray-400 block text-right">
                              {msg.time}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-[10px] text-purple-200 flex items-center gap-2">
                        <Info className="w-3.5 h-3.5 text-fuchsia-400 flex-shrink-0" />
                        <span>Preservação probatória com data e hora conforme marco legal. Conteúdo fictício para fins educativos.</span>
                      </div>
                    </div>
                  ) : (
                    /* VISUALIZAÇÃO PADRÃO DE DOCUMENTO / DEPOIMENTO */
                    <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-300">
                        <FileText className="w-4 h-4" />
                        <span>Transcrição dos Fatos & Registros</span>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed font-serif italic p-3 rounded-xl bg-purple-950/30 border-l-4 border-fuchsia-500">
                        "{selectedItem.contentDetails.text}"
                      </p>
                      {selectedItem.contentDetails.timestamp && (
                        <span className="text-[11px] text-purple-300 font-mono block">
                          ⏱️ Registro temporal: {selectedItem.contentDetails.timestamp}
                        </span>
                      )}
                    </div>
                  )}

                  {/* NOTA JURÍDICA E PEDAGÓGICA */}
                  {selectedItem.contentDetails.legalNote && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-950/40 to-purple-950/40 border border-fuchsia-500/30 text-xs space-y-1.5">
                      <div className="flex items-center gap-2 text-fuchsia-300 font-bold">
                        <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
                        <span>Fundamentação e Enquadramento Legal:</span>
                      </div>
                      <p className="text-purple-100 text-[11px] leading-relaxed">
                        {selectedItem.contentDetails.legalNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* Rodapé do Visualizador */}
                <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-300">
                  <span>🔒 Preservação sigilosa sem exposição da vítima</span>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-xs hover:from-fuchsia-500 hover:to-purple-500 transition-all cursor-pointer shadow-md"
                  >
                    Voltar à Narrativa
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-center text-purple-300">
                <p>Selecione uma pista na lista ao lado para inspecionar os detalhes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};






interface NarrativeOutcomeScreenProps {
  story: NarrativeStory;
  totalScore: number;
  xpEarned: number;
  isFirstCompletion: boolean;
  choicesHistory: Array<{ actNumber: number; choice: NarrativeChoice }>;
  outcome: NarrativeOutcome;
  onRestart: () => void;
  onBackToHub: () => void;
}

export const NarrativeOutcomeScreen: React.FC<NarrativeOutcomeScreenProps> = ({
  story,
  totalScore,
  xpEarned,
  isFirstCompletion,
  choicesHistory,
  outcome,
  onRestart,
  onBackToHub
}) => {
  const [showChoicesTimeline, setShowChoicesTimeline] = useState(false);
  const percent = Math.min(100, Math.round((totalScore / story.maxScore) * 100));

  // Cálculo individual das dimensões de competências para o pentágono
  const positiveChoicesCount = choicesHistory.filter(c => c.choice.impact === 'positivo').length;
  const neutralChoicesCount = choicesHistory.filter(c => c.choice.impact === 'neutro').length;

  const bullyingScore = Math.min(100, Math.round(((positiveChoicesCount * 20) + (neutralChoicesCount * 8))));
  const convivenciaScore = Math.min(100, Math.round(percent * 0.95 + 5));
  const direitosScore = Math.min(100, Math.round(percent * 0.9 + 8));
  const respeitoScore = Math.min(100, Math.round(percent * 0.98));
  const emocionalScore = Math.min(100, Math.round(positiveChoicesCount >= 4 ? 95 : positiveChoicesCount >= 2 ? 75 : 55));

  // Pontos geométricos para o SVG do Radar Pentagonal
  const center = 100;
  const radius = 70;
  const angles = [-90, -18, 54, 126, 198].map(deg => (deg * Math.PI) / 180);

  const getPoint = (score: number, index: number) => {
    const r = (score / 100) * radius;
    const x = center + r * Math.cos(angles[index]);
    const y = center + r * Math.sin(angles[index]);
    return `${x},${y}`;
  };

  const polygonPoints = [
    getPoint(bullyingScore, 0),
    getPoint(convivenciaScore, 1),
    getPoint(direitosScore, 2),
    getPoint(respeitoScore, 3),
    getPoint(emocionalScore, 4)
  ].join(' ');

  const backgroundPoints = (lvl: number) => {
    return angles.map(a => {
      const r = (lvl / 100) * radius;
      return `${center + r * Math.cos(a)},${center + r * Math.sin(a)}`;
    }).join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* CARD PRINCIPAL DO DESFECHO COM DESIGN CLARO E PROFISSIONAL */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-purple-200/90 shadow-xl text-slate-800 space-y-8">
        
        {/* BANNER TRIUNFANTE */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-purple-600 text-white shadow-lg mx-auto">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-3.5 py-1 rounded-full inline-block">
              {outcome.badgeTitle}
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
              {outcome.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              {outcome.description}
            </p>
          </div>
        </div>

        {/* 3 CARDS DE MÉTRICAS CHAVE: PONTUAÇÃO, XP E ASSERTIVIDADE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-center space-y-1">
            <span className="text-xs text-purple-800 font-bold uppercase tracking-wider block">
              Pontuação Ética
            </span>
            <span className="text-3xl sm:text-4xl font-black text-purple-950 font-mono">
              {totalScore} <span className="text-base text-purple-700 font-normal">/ {story.maxScore}</span>
            </span>
            <span className="text-[11px] text-slate-500 block">5 decisões avaliadas</span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center space-y-1">
            <span className="text-xs text-amber-800 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              XP Conquistado
            </span>
            <span className="text-3xl sm:text-4xl font-black text-amber-700 font-mono">
              +{xpEarned} XP
            </span>
            <span className="text-[11px] text-amber-800/80 block">
              {isFirstCompletion ? 'Primeira conclusão integral' : 'Histórico registrado'}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-center space-y-1">
            <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider block">
              Assertividade Ética
            </span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
              {percent}%
            </span>
            <span className="text-[11px] text-emerald-800/80 block">
              {percent >= 80 ? 'Conduta Exemplar' : percent >= 60 ? 'Maturidade Positiva' : 'Em Formação'}
            </span>
          </div>
        </div>

        {/* SEÇÃO DO RADAR PEDAGÓGICO DE COMPETÊNCIAS */}
        <div className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* GRÁFICO PENTAGONAL SVG */}
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <span className="text-xs font-mono font-bold text-purple-900 uppercase tracking-wider mb-2">
              Radar Formativo de Competências
            </span>
            <div className="relative w-48 h-48 sm:w-52 sm:h-52">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm">
                {/* Linhas de base do pentágono */}
                {[25, 50, 75, 100].map(lvl => (
                  <polygon
                    key={lvl}
                    points={backgroundPoints(lvl)}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeOpacity={lvl === 100 ? 0.9 : 0.5}
                    strokeWidth="1"
                  />
                ))}

                {/* Eixos centrais */}
                {angles.map((a, i) => (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={center + radius * Math.cos(a)}
                    y2={center + radius * Math.sin(a)}
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                ))}

                {/* Área preenchida do estudante */}
                <polygon
                  points={polygonPoints}
                  fill="#9333ea"
                  fillOpacity="0.25"
                  stroke="#7e22ce"
                  strokeWidth="2.5"
                />

                {/* Pontos nas pontas */}
                {[bullyingScore, convivenciaScore, direitosScore, respeitoScore, emocionalScore].map((sc, i) => {
                  const pt = getPoint(sc, i).split(',');
                  return (
                    <circle
                      key={i}
                      cx={pt[0]}
                      cy={pt[1]}
                      r="4"
                      fill="#7e22ce"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* BARRAS DE DOMÍNIO COM PORCENTAGENS */}
          <div className="md:col-span-7 space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider pb-1 border-b border-slate-200">
              Desempenho por Dimensão Pedagógica:
            </h4>

            {[
              { label: 'Bullying & Cyberbullying', score: bullyingScore, color: 'bg-purple-600' },
              { label: 'Convivência Escolar', score: convivenciaScore, color: 'bg-indigo-600' },
              { label: 'Direitos & Legislação', score: direitosScore, color: 'bg-emerald-600' },
              { label: 'Respeito & Responsabilidade', score: respeitoScore, color: 'bg-amber-600' },
              { label: 'Apoio Socioemocional', score: emocionalScore, color: 'bg-rose-600' }
            ].map((dim, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">{dim.label}</span>
                  <span className="font-mono font-bold text-slate-900">{dim.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${dim.color} transition-all duration-700`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PONTOS FORTES E RECOMENDAÇÕES PRÁTICAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Pontos Fortes Demonstrados
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {outcome.summaryKeyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-600" />
              Orientações Legais & Convivência
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {outcome.legalRecommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEÇÃO EXPANSÍVEL: REVISÃO DA LINHA DO TEMPO DAS DECISÕES */}
        <div className="border-t border-slate-200 pt-4">
          <button
            onClick={() => setShowChoicesTimeline(prev => !prev)}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center justify-between cursor-pointer border border-slate-200"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              {showChoicesTimeline ? 'Ocultar Linha do Tempo das Decisões' : 'Revisar Linha do Tempo das Decisões (5 Atos)'}
            </span>
            {showChoicesTimeline ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showChoicesTimeline && (
            <div className="space-y-3 pt-3 animate-fadeIn">
              {choicesHistory.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 text-left space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-purple-900">
                      ATO {item.actNumber}: {story.acts[idx]?.actTitle || 'Decisão'}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      item.choice.impact === 'positivo'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : item.choice.impact === 'neutro'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-rose-50 text-rose-800 border-rose-300'
                    }`}>
                      +{item.choice.points} pts ({item.choice.impact.toUpperCase()})
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 font-medium">
                    "{item.choice.text}"
                  </p>

                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 space-y-1">
                    <p><strong className="text-slate-900">Desdobramento:</strong> {item.choice.whatHappened}</p>
                    <p><strong className="text-purple-900">Análise Ética:</strong> {item.choice.ethicalAnalysis}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTÕES DE AÇÃO: JOGAR NOVAMENTE E VOLTAR À CENTRAL */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-200">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Experimentar Outras Escolhas</span>
          </button>

          <button
            onClick={onBackToHub}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm transition-all shadow-md shadow-purple-900/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Concluir e Voltar à Central de Histórias</span>
          </button>
        </div>

      </div>
    </div>
  );
};















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







interface NarrativeHubViewProps {
  onSelectStory: (story: NarrativeStory) => void;
}

export const NarrativeHubView: React.FC<NarrativeHubViewProps> = ({
  onSelectStory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'todas'>('todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState<StoryDifficulty | 'todas'>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const progressMap = getAllNarrativeProgress();
  const summaryStats = getNarrativeSummaryStats(NARRATIVE_STORIES);

  // Filtros de busca
  const filteredStories = NARRATIVE_STORIES.filter(story => {
    const matchesCategory = selectedCategory === 'todas' || story.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'todas' || story.difficulty === selectedDifficulty;
    const matchesSearch = searchQuery === '' || 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.synopsis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const featuredStory = NARRATIVE_STORIES[0]; // O Caso do Grupo Secreto
  const featuredProgress = progressMap[featuredStory.id];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* ===================================================================== */}
      {/* 1. HERO BANNER: CENTRAL DE JOGOS NARRATIVOS (VISUAL GAMER & NOVEL)    */}
      {/* ===================================================================== */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#140b29] via-[#1f103d] to-[#0c081c] border-2 border-fuchsia-500/50 shadow-2xl p-6 sm:p-10 text-white">
        {/* Luzes volumétricas de fundo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            
            {/* Tags e Badges no Topo */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-fuchsia-500/25 text-fuchsia-200 border border-fuchsia-400/50 flex items-center gap-1.5 shadow-xs">
                <Gamepad2 className="w-3.5 h-3.5 text-fuchsia-300" />
                Jogo Narrativo Interativo • Visual Novel
              </span>

              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-purple-900/60 text-purple-200 border border-purple-500/40">
                {featuredStory.categoryLabel}
              </span>

              <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                +{featuredStory.baseRewardXp} XP
              </span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl text-white leading-tight">
              {featuredStory.title}
            </h2>

            <p className="text-sm sm:text-base text-purple-200/90 leading-relaxed max-w-2xl font-sans">
              {featuredStory.synopsis}
            </p>

            {/* Metadados do Caso em Formato Limpo */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <span className="text-purple-300 flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
                ~{featuredStory.estimatedDurationMinutes} min de imersão
              </span>
              <span className="text-purple-500">·</span>
              <span className="text-purple-300 font-mono">
                {featuredStory.difficultyLabel}
              </span>
              <span className="text-purple-500">·</span>
              <span className="text-purple-300 flex items-center gap-1.5 font-mono">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                5 Atos com Cenários Vivos & Dossiê de Pistas
              </span>
            </div>

            {/* Botão de Início do Jogo */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectStory(featuredStory)}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-fuchsia-950/80 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                {featuredProgress?.completed ? (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    <span>Rejogar Caso Destaque</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Jogar Caso Agora (+{featuredStory.baseRewardXp} XP)</span>
                  </>
                )}
                <ArrowRight className="w-4 h-4" />
              </button>

              {featuredProgress?.completed && (
                <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Concluído • {featuredProgress.bestPercent}% de Assertividade</span>
                </div>
              )}
            </div>
          </div>

          {/* Card com Preview Estilizado do Cenário da Biblioteca */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative p-5 rounded-3xl bg-slate-950/70 border-2 border-purple-500/40 text-center space-y-3 shadow-2xl max-w-xs w-full overflow-hidden">
              <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 border border-purple-500/30 flex items-center justify-center relative overflow-hidden">
                <span className="text-5xl z-10">{featuredStory.coverTheme.icon}</span>
                <div className="absolute inset-0 bg-radial from-fuchsia-500/30 to-transparent pointer-events-none" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-fuchsia-300 uppercase tracking-wider block">
                  Simulador de Decisão Escolar
                </span>
                <p className="text-xs text-purple-200 mt-1">
                  Cenários da EEMTI Alfredo Machado, personagens animados, leituras de chat e fundamentação na Lei 14.811/2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. PAINEL DE STATUS DO JOGADOR (ESTILO RPG / CONQUISTAS)              */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg text-white space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold font-mono">
            <span>Casos Concluídos</span>
            <BookOpen className="w-4 h-4 text-fuchsia-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono block">
            {summaryStats.completedCount} <span className="text-sm text-slate-500 font-normal">/ {summaryStats.totalStories}</span>
          </span>
          <span className="text-[11px] text-purple-300 font-medium">Histórias vivenciadas</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg text-white space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold font-mono">
            <span>Assertividade Média</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">
            {summaryStats.averageAssertiveness}%
          </span>
          <span className="text-[11px] text-emerald-300 font-medium">Precisão ética nas escolhas</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg text-white space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold font-mono">
            <span>XP das Histórias</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono block">
            +{summaryStats.totalXpFromNarratives} XP
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Experiência acumulada</span>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg text-white space-y-1">
          <div className="flex items-center justify-between text-xs text-purple-300 font-bold font-mono">
            <span>Evidências no Dossiê</span>
            <Search className="w-4 h-4 text-fuchsia-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-fuchsia-400 font-mono block">
            {summaryStats.unlockedCluesCount}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Pistas e prints analisados</span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. FILTROS E BUSCA DA BIBLIOTECA DE CASOS                             */}
      {/* ===================================================================== */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 border border-purple-500/30 shadow-lg space-y-4 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-fuchsia-400 block">
              Biblioteca de Jogos Narrativos
            </span>
            <h3 className="font-display font-black text-lg text-white">
              Escolha seu Caso & Viva a Experiência
            </h3>
          </div>

          {/* Campo de Busca Rápida */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Buscar por tema ou título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-2xl bg-purple-950/50 border border-purple-500/30 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-fuchsia-400"
            />
          </div>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-purple-900/40">
          <span className="text-xs font-bold text-purple-300 mr-1 flex items-center gap-1 font-mono">
            <Filter className="w-3.5 h-3.5 text-fuchsia-400" />
            Temas:
          </span>

          {[
            { id: 'todas', label: 'Todos os Casos' },
            { id: 'cyberbullying', label: 'Cyberbullying' },
            { id: 'exclusao', label: 'Exclusão Social' },
            { id: 'conflitos', label: 'Conflitos & Mediação' },
            { id: 'pressao_colegas', label: 'Pressão dos Colegas' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono ${
                selectedCategory === cat.id
                  ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-950/50 border border-fuchsia-400'
                  : 'bg-purple-950/40 hover:bg-purple-900/40 text-purple-300 border border-purple-500/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. GRID DE CASOS: CARDS ESTILO JOGO / STEAM / VISUAL NOVEL           */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStories.map((story) => {
          const progress = progressMap[story.id];
          const isDone = progress?.completed;

          return (
            <div
              key={story.id}
              className={`rounded-3xl border-2 transition-all flex flex-col justify-between shadow-xl overflow-hidden bg-slate-950/90 text-white ${
                isDone 
                  ? 'border-emerald-500/60 ring-1 ring-emerald-500/30' 
                  : 'border-purple-500/40 hover:border-fuchsia-400 hover:shadow-2xl'
              }`}
            >
              <div>
                {/* Capa do Caso com Arte do Tema */}
                <div className={`p-6 bg-gradient-to-r ${story.coverTheme.gradient} text-white relative overflow-hidden`}>
                  <div className="flex items-center justify-between gap-2 relative z-10">
                    <span className="text-3xl p-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 inline-block shadow-md">
                      {story.coverTheme.icon}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-black/40 text-white border border-white/20">
                        +{story.baseRewardXp} XP
                      </span>

                      {isDone && (
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Feito ({progress.bestPercent}%)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 relative z-10 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-fuchsia-300 block">
                      {story.categoryLabel}
                    </span>
                    <h4 className="font-display font-black text-xl text-white leading-tight">
                      {story.title}
                    </h4>
                    <p className="text-xs text-purple-200/90 line-clamp-1">
                      {story.subtitle}
                    </p>
                  </div>
                </div>

                {/* Detalhes do Caso */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {story.synopsis}
                  </p>

                  {/* Informações Técnicas da Simulação */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono border-t border-purple-900/40 text-purple-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-fuchsia-400" />
                      ~{story.estimatedDurationMinutes} min
                    </span>
                    <span>·</span>
                    <span>5 Atos Ramificados</span>
                    <span>·</span>
                    <span className="text-fuchsia-300 font-bold">
                      {story.difficultyLabel}
                    </span>
                  </div>

                  {/* Competências Trabalhadas */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {story.competenciesWorked.map((comp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/30"
                      >
                        {comp === 'bullying' ? 'Cyberbullying' :
                         comp === 'convivencia' ? 'Convivência' :
                         comp === 'direitos' ? 'Legislação' :
                         comp === 'respeito' ? 'Respeito' : 'Apoio Emocional'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botão de Ação do Jogo */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectStory(story)}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isDone
                      ? 'bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500/40'
                      : 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white shadow-fuchsia-950/80 hover:scale-[1.01]'
                  }`}
                >
                  {isDone ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Rejogar & Explorar Outros Caminhos</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Iniciar Jogo Narrativo (+{story.baseRewardXp} XP)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
