import React, { useState } from 'react';
import { ViewMode } from '../types';
import { BannerIllustration, StopBullyingOfficialLogo } from './BrandingAssets';
import { useAutoScrollIntoView } from '../hooks/useAutoScrollIntoView';
import { 
  Megaphone, 
  ShieldCheck, 
  Search, 
  Compass, 
  EyeOff, 
  Sparkles, 
  HeartHandshake, 
  ArrowRight, 
  Lock, 
  Smile, 
  Frown, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface HeroHomeProps {
  onNavigate: (view: ViewMode) => void;
  onOpenCamouflage?: () => void;
  onOpenLoadingScreen?: () => void;
  onTrackProtocol?: (protocol: string) => void;
}

type MoodType = 'bem' | 'ansioso' | 'bullying' | 'duvidas' | null;

export const HeroHome: React.FC<HeroHomeProps> = ({ 
  onNavigate, 
  onOpenCamouflage,
  onTrackProtocol 
}) => {
  const [protocolInput, setProtocolInput] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType>(null);
  const moodCardRef = useAutoScrollIntoView({ active: !!selectedMood, delay: 100 });

  const handleTrackSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = protocolInput.trim();
    if (!clean) {
      onNavigate('protocolo');
      return;
    }
    if (onTrackProtocol) {
      onTrackProtocol(clean);
    } else {
      onNavigate('protocolo');
    }
  };

  const moodResponses: Record<NonNullable<MoodType>, {
    title: string;
    message: string;
    actionLabel: string;
    actionView: ViewMode;
    color: string;
  }> = {
    bem: {
      title: 'Que bom que você está bem!',
      message: 'Você pode ajudar seus colegas sendo um aliado contra o bullying e espalhando empatia na escola.',
      actionLabel: 'Ver Conquistas & Desafios',
      actionView: 'conquistas',
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-950'
    },
    ansioso: {
      title: 'Respire fundo, você não está só.',
      message: 'Momentos difíceis passam. Que tal experimentar o exercício de respiração 4-7-8 no nosso espaço de apoio?',
      actionLabel: 'Abrir Apoio Emocional',
      actionView: 'apoio',
      color: 'from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-950'
    },
    bullying: {
      title: 'Sua segurança é nossa prioridade absoluta.',
      message: 'Ninguém tem o direito de te machucar ou te diminuir. Nosso canal é 100% anônimo e a escola vai agir para te proteger.',
      actionLabel: 'Fazer Denúncia Silenciosa Agora',
      actionView: 'denuncia',
      color: 'from-rose-500/10 to-pink-500/10 border-rose-200 text-rose-950'
    },
    duvidas: {
      title: 'Tire suas dúvidas e conheça seus direitos.',
      message: 'Veja como funciona a Lei Federal 13.185/15 e como a nossa escola acolhe cada relato.',
      actionLabel: 'Explorar Central do Respeito',
      actionView: 'quiz',
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 text-blue-950'
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn text-[#241e33]">
      
      {/* 1. HERO (Totalmente Aberto, Integrado e Sem Nenhuma Caixa/Listra Demarcatória) */}
      <div className="relative py-2 sm:py-5 max-w-5xl mx-auto">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
          
          {/* Logo Oficial com Efeito Suave - Perfeitamente Centralizado */}
          <div className="w-full lg:w-auto flex-shrink-0 flex items-center justify-center text-center">
            <div className="relative w-44 sm:w-52 md:w-60 lg:w-64 max-w-full aspect-square flex items-center justify-center p-1 mx-auto transform hover:scale-102 transition-transform duration-300">
              <StopBullyingOfficialLogo className="w-full h-full drop-shadow-sm flex items-center justify-center mx-auto" />
            </div>
          </div>

          {/* Lado Direito: Tipografia de Destaque + Centro de Ações Inteligente */}
          <div className="flex-1 text-center lg:text-left space-y-4 w-full">
            
            {/* Live Status Pill & Instituição (Oculto no mobile, visível no desktop) */}
            <div className="hidden lg:inline-flex flex-wrap items-center justify-start gap-2 text-xs font-semibold">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-purple-200 text-purple-900 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                <span>EEMTI Alfredo Machado</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Canal Anônimo Ativo</span>
              </div>
            </div>

            {/* Título Principal em Alto Destaque */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-[2.75rem] text-[#181126] tracking-tight leading-[1.12]">
                Sua voz protegida.
              </h1>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-[2.75rem] text-[#6d28d9] tracking-tight leading-[1.12]">
                Ambiente escolar seguro.
              </h2>
            </div>

            {/* Subtítulo Conciso e Acolhedor (Oculto no mobile, mantido no computador) */}
            <p className="hidden lg:block text-xs sm:text-sm text-[#475569] max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Espaço oficial de acolhimento seguro, escuta ativa e denúncias protegidas por sigilo absoluto na nossa escola.
            </p>

            {/* HUB DE AÇÕES PRINCIPAIS */}
            <div className="space-y-3 pt-2">
              
              {/* Linha 1: Botão Primário de Denúncia */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onNavigate('denuncia')}
                  className="group relative flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#6b21a8] via-[#581c87] to-[#4c1d95] text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-950/25 hover:shadow-xl hover:shadow-purple-900/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  <span className="p-1.5 rounded-xl bg-white/15 border border-white/20 group-hover:scale-110 group-hover:bg-white/25 transition-all duration-200 flex-shrink-0">
                    <Megaphone className="w-4 h-4 text-purple-100" />
                  </span>
                  <div className="text-left leading-tight">
                    <div className="tracking-tight">Fazer Denúncia Anônima</div>
                    <div className="text-[11px] font-normal text-purple-200">100% sigiloso • Sem necessidade de login</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-200 ml-auto group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Linha 2: Busca Rápida de Protocolo Integrada (Inovação Prática!) */}
              <form 
                onSubmit={handleTrackSubmit}
                className="relative flex items-center bg-white rounded-2xl border border-purple-200/90 p-1.5 shadow-sm focus-within:border-purple-600 focus-within:ring-3 focus-within:ring-purple-100 transition-all duration-200"
              >
                <div className="pl-3 pr-2 text-purple-600 flex-shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Já tem um protocolo? Digite aqui (Ex: SB-8492)..."
                  value={protocolInput}
                  onChange={(e) => setProtocolInput(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#181126] placeholder:text-[#94a3b8] outline-none font-medium py-1.5"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#4c1d95] font-bold text-xs sm:text-sm border border-purple-200/80 hover:border-purple-300 transition-all cursor-pointer flex-shrink-0"
                >
                  <span>Acompanhar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Linha 3: Ações de Apoio & Discrição */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
                <button
                  onClick={() => onNavigate('guia')}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 hover:bg-white text-purple-900 border border-purple-200/80 font-semibold shadow-2xs hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-purple-700" />
                  <span>Guia do Site</span>
                </button>

                {onOpenCamouflage && (
                  <button
                    onClick={onOpenCamouflage}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50/80 hover:bg-amber-100/90 text-amber-900 border border-amber-200 font-semibold shadow-2xs hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer"
                    title="Disfarça instantaneamente a tela com um jogo clássico de Pac-Man caso alguém se aproxime"
                  >
                    <EyeOff className="w-3.5 h-3.5 text-amber-700" />
                    <span>Modo Discreto (Camuflagem)</span>
                  </button>
                )}

                <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-[#64748b] ml-auto">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Criptografia de ponta a ponta</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 2. ESPAÇO INTERATIVO: TERMÔMETRO DE BEM-ESTAR DO ALUNO (Inovação Acolhedora) */}
      <div className="max-w-5xl mx-auto rounded-3xl bg-white/90 border border-purple-100 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-purple-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-[#181126]">
                Como você está se sentindo hoje na escola?
              </h3>
              <p className="text-xs text-[#64748b]">
                Clique para receber orientações acolhedoras e dicas imediatas de apoio.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 self-start md:self-auto">
            Acolhimento Instantâneo
          </span>
        </div>

        {/* Botões de Humor / Emoção */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3.5">
          <button
            onClick={() => setSelectedMood(selectedMood === 'bem' ? null : 'bem')}
            className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
              selectedMood === 'bem'
                ? 'bg-emerald-50 border-emerald-300 shadow-sm ring-2 ring-emerald-200'
                : 'bg-slate-50/70 hover:bg-emerald-50/50 border-slate-200/80 hover:border-emerald-200'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
              <Smile className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-slate-800">Bem e Seguro</div>
              <div className="text-[10px] text-slate-500">Tudo tranquilo</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedMood(selectedMood === 'ansioso' ? null : 'ansioso')}
            className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
              selectedMood === 'ansioso'
                ? 'bg-amber-50 border-amber-300 shadow-sm ring-2 ring-amber-200'
                : 'bg-slate-50/70 hover:bg-amber-50/50 border-slate-200/80 hover:border-amber-200'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-slate-800">Preocupado(a)</div>
              <div className="text-[10px] text-slate-500">Com receio ou medo</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedMood(selectedMood === 'bullying' ? null : 'bullying')}
            className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
              selectedMood === 'bullying'
                ? 'bg-rose-50 border-rose-300 shadow-sm ring-2 ring-rose-200'
                : 'bg-slate-50/70 hover:bg-rose-50/50 border-slate-200/80 hover:border-rose-200'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
              <Frown className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-slate-800">Sofrendo Bullying</div>
              <div className="text-[10px] text-slate-500">Preciso de ajuda urgente</div>
            </div>
          </button>

          <button
            onClick={() => setSelectedMood(selectedMood === 'duvidas' ? null : 'duvidas')}
            className={`p-3 rounded-2xl border transition-all text-left flex items-center gap-2.5 cursor-pointer ${
              selectedMood === 'duvidas'
                ? 'bg-indigo-50 border-indigo-300 shadow-sm ring-2 ring-indigo-200'
                : 'bg-slate-50/70 hover:bg-indigo-50/50 border-slate-200/80 hover:border-indigo-200'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs sm:text-sm text-slate-800">Tenho Dúvidas</div>
              <div className="text-[10px] text-slate-500">Conhecer meus direitos</div>
            </div>
          </button>
        </div>

        {/* Resposta Acolhedora Dinâmica */}
        {selectedMood && (
          <div ref={moodCardRef} className={`mt-3.5 p-4 rounded-2xl border bg-gradient-to-r ${moodResponses[selectedMood].color} animate-fadeIn`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <h4 className="font-bold text-sm">
                  {moodResponses[selectedMood].title}
                </h4>
                <p className="text-xs leading-relaxed opacity-90 max-w-2xl">
                  {moodResponses[selectedMood].message}
                </p>
              </div>
              <button
                onClick={() => onNavigate(moodResponses[selectedMood].actionView)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 font-bold text-xs text-slate-900 border border-slate-200/80 shadow-xs hover:scale-102 transition-all cursor-pointer flex-shrink-0"
              >
                <span>{moodResponses[selectedMood].actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. BANNER OFICIAL DA PLATAFORMA */}
      <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-purple-100 shadow-sm">
        <BannerIllustration />
      </div>

      {/* 4. SHOWCASE DE DIAGNÓSTICO CIENTÍFICO (Ceará Científico 2026) */}
      <div className="max-w-5xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#24103c] via-[#1a0c2d] to-[#0f071a] text-white border border-purple-500/20 shadow-xl shadow-purple-950/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2 lg:max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-[11px] font-semibold text-purple-200">
              <HeartHandshake className="w-3.5 h-3.5 text-purple-300" />
              <span>Ceará Científico 2026 • Pesquisa Aplicada</span>
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-white">
              Diagnóstico Real da EEMTI Alfredo Machado
            </h3>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              Desenvolvido com dados reais coletados na comunidade escolar para transformar a convivência e erradicar o bullying através de tecnologia segura.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-semibold text-blue-200 bg-blue-500/20 px-2.5 py-1 rounded-full border border-blue-400/30">
                Lei nº 13.185/2015 (Antibullying)
              </span>
              <span className="text-[10px] font-semibold text-rose-200 bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-400/30">
                Lei nº 14.811/2024 (Proteção Escolar)
              </span>
            </div>
          </div>

          {/* Cards de Métricas em Destaque */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="font-display font-black text-2xl sm:text-3xl text-amber-300">
                60,5%
              </div>
              <div className="text-[11px] text-purple-200/90 font-medium mt-1 leading-snug">
                Já vivenciaram ou presenciaram bullying
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400">
                76,3%
              </div>
              <div className="text-[11px] text-purple-200/90 font-medium mt-1 leading-snug">
                Afirmam total confiança no canal anônimo
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="font-display font-black text-2xl sm:text-3xl text-purple-300">
                100%
              </div>
              <div className="text-[11px] text-purple-200/90 font-medium mt-1 leading-snug">
                Sigilo criptográfico e sem registro de IP
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

