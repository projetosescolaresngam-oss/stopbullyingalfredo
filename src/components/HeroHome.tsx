import React from 'react';
import { ViewMode } from '../types';
import { BannerIllustration, StopBullyingOfficialLogo } from './BrandingAssets';
import { 
  Megaphone, 
  HeartHandshake, 
  TrafficCone, 
  BookOpen, 
  AlertTriangle, 
  Microscope,
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Lock,
  Radio,
  Gamepad2,
  Images,
  Compass,
  Search,
  Send,
  Heart
} from 'lucide-react';

interface HeroHomeProps {
  onNavigate: (view: ViewMode) => void;
  onOpenCamouflage: () => void;
  onOpenLoadingScreen?: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ onNavigate, onOpenCamouflage, onOpenLoadingScreen }) => {
  const modules = [
    {
      id: 'denuncia' as ViewMode,
      title: 'Fazer Denúncia Anônima',
      desc: 'Relate violência verbal, física ou cyberbullying com proteção criptografada e protocolo hash.',
      icon: <Megaphone className="w-6 h-6 text-rose-500" />,
      badge: '100% Anônimo',
      colorClass: 'border-rose-200/80 hover:border-rose-400 bg-white/90 hover:bg-rose-50/60 shadow-sm hover:shadow-md shadow-rose-900/5',
      tagColor: 'bg-rose-100 text-rose-800 border-rose-200 font-bold',
      iconBg: 'bg-rose-100/70'
    },
    {
      id: 'protocolo' as ViewMode,
      title: 'Acompanhar Protocolo & Chat Sigiloso',
      desc: 'Consulte os dados completos da sua denúncia pelo código gerado e converse diretamente com a equipe de mediação da escola.',
      icon: <Search className="w-6 h-6 text-purple-600" />,
      badge: 'Chat Direto & Sigilo',
      colorClass: 'border-purple-200/80 hover:border-purple-400 bg-gradient-to-br from-white via-purple-50/40 to-indigo-50/30 hover:bg-purple-50/70 shadow-sm hover:shadow-md shadow-purple-900/5',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-200 font-bold',
      iconBg: 'bg-purple-100/80'
    },
    {
      id: 'apoio' as ViewMode,
      title: 'Apoio Emocional & Saúde Mental',
      desc: 'Exercício guiado de respiração 4-7-8 com sintetizador de áudio, frases motivacionais e canais 24h (CVV 188).',
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
      badge: 'Técnica 4-7-8',
      colorClass: 'border-emerald-200/80 hover:border-emerald-400 bg-white/90 hover:bg-emerald-50/60 shadow-sm hover:shadow-md shadow-emerald-900/5',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold',
      iconBg: 'bg-emerald-100/70'
    },
    {
      id: 'triagem' as ViewMode,
      title: 'Triagem de Risco (Semáforo)',
      desc: 'Avalie a gravidade do caso nos níveis Verde (Leve), Amarelo (Recorrente) ou Vermelho (Grave/Urgente).',
      icon: <TrafficCone className="w-6 h-6 text-amber-600" />,
      badge: 'Protocolo de Risco',
      colorClass: 'border-amber-200/80 hover:border-amber-400 bg-white/90 hover:bg-amber-50/60 shadow-sm hover:shadow-md shadow-amber-900/5',
      tagColor: 'bg-amber-100 text-amber-800 border-amber-200 font-bold',
      iconBg: 'bg-amber-100/70'
    },
    {
      id: 'quiz' as ViewMode,
      title: 'Quiz & Estatísticas INEP / PeNSE',
      desc: 'Aprenda os direitos da Lei Federal nº 13.185/2015 e Lei nº 14.811/2024 com dados reais da pesquisa.',
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      badge: 'Educativo & Leis',
      colorClass: 'border-blue-200/80 hover:border-blue-400 bg-white/90 hover:bg-blue-50/60 shadow-sm hover:shadow-md shadow-blue-900/5',
      tagColor: 'bg-blue-100 text-blue-800 border-blue-200 font-bold',
      iconBg: 'bg-blue-100/70'
    },
    {
      id: 'galeria' as ViewMode,
      title: 'Fotos & Identidade Visual do Projeto',
      desc: 'Pôster oficial de campanha, banners em estilo grunge rasgado e o brasão institucional da EEMTI Alfredo Machado.',
      icon: <Images className="w-6 h-6 text-pink-600" />,
      badge: 'Pôster Oficial',
      colorClass: 'border-pink-200/80 hover:border-pink-400 bg-white/90 hover:bg-pink-50/60 shadow-sm hover:shadow-md shadow-pink-900/5',
      tagColor: 'bg-pink-100 text-pink-800 border-pink-200 font-bold',
      iconBg: 'bg-pink-100/70'
    },
    {
      id: 'sos' as ViewMode,
      title: 'Socorro Emergencial (SOS GPS)',
      desc: 'Transmissão imediata de coordenadas GPS em situação de risco com recurso de camuflagem Pac-Man.',
      icon: <AlertTriangle className="w-6 h-6 text-rose-600 animate-pulse" />,
      badge: 'Pânico GPS',
      colorClass: 'border-rose-300 hover:border-rose-500 bg-gradient-to-br from-rose-50 to-white shadow-sm hover:shadow-md shadow-rose-900/10',
      tagColor: 'bg-rose-600 text-white border-rose-400 font-black',
      iconBg: 'bg-rose-100'
    },
    {
      id: 'ceara' as ViewMode,
      title: 'Central Ceará Científico 2026',
      desc: 'Banner científico oficial de 90x120cm, diagnóstico da EEMTI Alfredo Machado, metodologia e autores.',
      icon: <Microscope className="w-6 h-6 text-purple-600" />,
      badge: 'Banner 90x120cm',
      colorClass: 'border-purple-200/80 hover:border-purple-400 bg-white/90 hover:bg-purple-50/60 shadow-sm hover:shadow-md shadow-purple-900/5',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-200 font-bold',
      iconBg: 'bg-purple-100/70'
    },
    {
      id: 'gestao' as ViewMode,
      title: 'Painel de Gestão & Mediação',
      desc: 'Área da coordenação escolar para acolher e mediar denúncias, gerenciar alertas SOS com prioridade e acompanhar métricas.',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      badge: 'Gestão Escolar',
      colorClass: 'border-indigo-200/80 hover:border-indigo-400 bg-white/90 hover:bg-indigo-50/60 shadow-sm hover:shadow-md shadow-indigo-900/5',
      tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200 font-bold',
      iconBg: 'bg-indigo-100/70'
    },
    {
      id: 'guia' as ViewMode,
      title: 'Manual Interativo & Guia do Site',
      desc: 'Aprenda tudo sobre anonimato, camuflagem, níveis de XP, avatares e leis escolares com simuladores ao vivo.',
      icon: <Compass className="w-6 h-6 text-cyan-600" />,
      badge: 'Tour Interativo',
      colorClass: 'border-cyan-200/80 hover:border-cyan-400 bg-white/90 hover:bg-cyan-50/60 shadow-sm hover:shadow-md shadow-cyan-900/5',
      tagColor: 'bg-cyan-100 text-cyan-800 border-cyan-200 font-bold',
      iconBg: 'bg-cyan-100/70'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-[#241e33]">
      
      {/* Hero Welcome Header & Presentation (Logo no lado esquerdo + Conteúdo à direita) */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 py-4 sm:py-6 max-w-6xl mx-auto">
        
        {/* Lado Esquerdo: Logo Oficial StopBullying */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto p-2 transform hover:scale-105 transition-transform duration-300">
            <StopBullyingOfficialLogo size={280} className="w-full h-auto" />
          </div>
        </div>

        {/* Lado Direito: Badges, Tipografia, Descrição e Botões de Ação */}
        <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-5">
          
          {/* Top Badges / Pills */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 text-purple-900 border border-purple-300/80 text-xs font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>PLATAFORMA OFICIAL DE ACOLHIMENTO E PREVENÇÃO ESCOLAR</span>
            </div>

            <button
              onClick={() => onNavigate('guia')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-xs"
            >
              <Compass className="w-4 h-4 text-purple-700" />
              <span>Guia do Site &amp; Conquistas</span>
            </button>

            {onOpenLoadingScreen && (
              <button
                onClick={onOpenLoadingScreen}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-xs"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Ver Animação da Solidariedade</span>
              </button>
            )}
          </div>

          {/* Large Typography Headlines */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#18181b] tracking-tight leading-tight">
              Sua voz protegida.
            </h1>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#6d28d9] tracking-tight leading-tight">
              Um ambiente escolar seguro para todos.
            </h2>
          </div>

          {/* Descriptive Subtitle */}
          <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Identifique diferentes tipos de agressão, denuncie com <strong className="text-[#18181b] font-bold">sigilo absoluto e sem cadastro</strong>, receba acolhimento emocional em tempo real e acompanhe as respostas da coordenação escolar.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
            <button
              onClick={() => onNavigate('denuncia')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#581c87] hover:bg-[#4a1570] text-white font-bold text-sm sm:text-base shadow-md shadow-purple-950/20 hover:scale-105 transition-all cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Fazer Denúncia Anônima</span>
            </button>

            <button
              onClick={() => onNavigate('guia')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-purple-100/70 hover:bg-purple-200/80 text-purple-950 border border-purple-300 font-bold text-sm sm:text-base hover:scale-105 transition-all cursor-pointer"
            >
              <Compass className="w-5 h-5 text-purple-800" />
              <span>Guia &amp; Como Usar</span>
            </button>

            <button
              onClick={() => onNavigate('apoio')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-purple-50 text-slate-900 border border-purple-200/90 font-bold text-sm sm:text-base shadow-xs hover:scale-105 transition-all cursor-pointer"
            >
              <HeartHandshake className="w-5 h-5 text-purple-600" />
              <span>Apoio Emocional</span>
            </button>
          </div>

        </div>

      </div>

      {/* Quick Action Buttons & Highlights */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white/85 border border-purple-200/80 shadow-[0_4px_20px_rgba(124,58,237,0.06)] backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 flex-shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#241e33] flex items-center gap-2 flex-wrap">
              Privacidade e Anonimato Garantidos
              <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-bold">
                Sem coleta de IP / E-mail
              </span>
            </h4>
            <p className="text-xs text-[#5c546d]">
              Protocolo hash seguro para acompanhamento anônimo pela coordenação escolar.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('guia')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 font-bold text-xs border border-cyan-300 transition-all hover:scale-105 cursor-pointer shadow-sm"
            title="Aprenda a usar todos os recursos do site de forma interativa"
          >
            <Compass className="w-4 h-4 text-cyan-600" />
            Guia do Site
          </button>
          <button
            onClick={() => onNavigate('denuncia')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 hover:from-rose-600 hover:to-red-600 text-white font-bold text-xs shadow-md shadow-rose-500/25 transition-all hover:scale-105 cursor-pointer"
          >
            <Megaphone className="w-4 h-4" />
            Fazer Denúncia
          </button>
          <button
            onClick={() => onNavigate('protocolo')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-purple-500/25 transition-all hover:scale-105 cursor-pointer"
            title="Acompanhar protocolo existente e chat sigiloso"
          >
            <Search className="w-4 h-4" />
            Acompanhar Protocolo
          </button>
          <button
            onClick={() => onNavigate('gestao')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold text-xs border border-indigo-200 transition-all cursor-pointer shadow-sm"
            title="Painel restrito de gestão e mediação escolar"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Painel de Gestão
          </button>
          <button
            onClick={onOpenCamouflage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#473e57] font-semibold text-xs border border-purple-200 transition-all cursor-pointer shadow-sm"
            title="Disfarçar app com jogo do Pac-Man retrô"
          >
            <Gamepad2 className="w-4 h-4 text-amber-600" />
            Camuflagem
          </button>
          {onOpenLoadingScreen && (
            <button
              onClick={onOpenLoadingScreen}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 hover:from-purple-200 hover:to-pink-200 text-purple-900 font-bold text-xs border border-purple-300 transition-all hover:scale-105 cursor-pointer shadow-sm"
              title="Rever animação 2D Anime Chibi de Lia e Tom (Empatia e Acolhimento)"
            >
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Animação Lia &amp; Tom</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid of Interactive Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg sm:text-xl font-black text-[#241e33] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Módulos &amp; Ferramentas da Plataforma:
          </h3>
          <span className="text-xs text-[#6e6480] font-medium">EEMTI Alfredo Machado • Madalena/CE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => (
            <div
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className={`group p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-md hover:-translate-y-1 ${m.colorClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-xl border border-purple-100 ${m.iconBg || 'bg-purple-50'} group-hover:scale-110 transition-transform`}>
                    {m.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${m.tagColor}`}>
                    {m.badge}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-[#241e33] mb-2 group-hover:text-purple-700 transition-colors">
                  {m.title}
                </h4>
                <p className="text-xs text-[#5c546d] leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-100 flex items-center justify-between text-xs font-bold text-[#786e8a] group-hover:text-purple-700 transition-colors">
                <span>Acessar Módulo</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Visual Banner (Posicionado acima do diagnóstico de pesquisa) */}
      <BannerIllustration />

      {/* Diagnostic Research Highlight Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white border border-purple-400/40 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-purple-500/30 border border-purple-300/40 text-purple-200 flex-shrink-0">
            <Radio className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-display text-base font-bold text-purple-100">
              📊 Diagnóstico Local da EEMTI Alfredo Machado &amp; IBGE/PeNSE 2024
            </h4>
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
              Pesquisa realizada com estudantes da escola (<strong className="text-white">n=38</strong>) identificou que <strong className="text-amber-300 font-bold">60,5%</strong> já vivenciaram situações de bullying escolar, enquanto o Ceará registrou apenas 15 queixas oficiais em 2025 devido ao medo de represálias. A plataforma StopBullying responde diretamente a esse desafio, onde <strong className="text-emerald-300 font-bold">76,3%</strong> dos alunos afirmaram que o canal anônimo confere segurança total para romper o silêncio.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-purple-200">
              <span className="flex items-center gap-1.5 text-blue-200 bg-blue-500/20 px-2.5 py-1 rounded-full border border-blue-400/30">
                <ShieldCheck className="w-4 h-4 text-blue-300" />
                Lei nº 13.185/2015
              </span>
              <span className="flex items-center gap-1.5 text-rose-200 bg-rose-500/20 px-2.5 py-1 rounded-full border border-rose-400/30">
                <ShieldCheck className="w-4 h-4 text-rose-300" />
                Lei nº 14.811/2024 (Art. 146-A CP)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-200 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Ceará Científico 2026
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
