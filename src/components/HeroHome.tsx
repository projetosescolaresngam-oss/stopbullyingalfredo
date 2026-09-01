import React from 'react';
import { ViewMode } from '../types';
import { BannerIllustration } from './BrandingAssets';
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
  Images
} from 'lucide-react';

interface HeroHomeProps {
  onNavigate: (view: ViewMode) => void;
  onOpenCamouflage: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ onNavigate, onOpenCamouflage }) => {
  const modules = [
    {
      id: 'denuncia' as ViewMode,
      title: 'Fazer Denúncia Anônima',
      desc: 'Relate violência verbal, física ou cyberbullying com proteção criptografada e protocolo hash.',
      icon: <Megaphone className="w-6 h-6 text-red-400" />,
      badge: '100% Anônimo',
      colorClass: 'border-red-500/30 hover:border-red-500/60 bg-red-950/20 hover:bg-red-950/40',
      tagColor: 'bg-red-500/20 text-red-300 border-red-500/30'
    },
    {
      id: 'apoio' as ViewMode,
      title: 'Apoio Emocional & Saúde Mental',
      desc: 'Exercício guiado de respiração 4-7-8 com sintetizador de áudio, frases motivacionais e canais 24h (CVV 188).',
      icon: <HeartHandshake className="w-6 h-6 text-emerald-400" />,
      badge: 'Técnica 4-7-8',
      colorClass: 'border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-950/20 hover:bg-emerald-950/40',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'triagem' as ViewMode,
      title: 'Triagem de Risco (Semáforo)',
      desc: 'Avalie a gravidade do caso nos níveis Verde (Leve), Amarelo (Recorrente) ou Vermelho (Grave/Urgente).',
      icon: <TrafficCone className="w-6 h-6 text-amber-400" />,
      badge: 'Protocolo de Risco',
      colorClass: 'border-amber-500/30 hover:border-amber-500/60 bg-amber-950/20 hover:bg-amber-950/40',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'quiz' as ViewMode,
      title: 'Quiz & Estatísticas INEP / PeNSE',
      desc: 'Aprenda os direitos da Lei Federal nº 13.185/2015 e Lei nº 14.811/2024 com dados reais da pesquisa.',
      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
      badge: 'Educativo & Leis',
      colorClass: 'border-blue-500/30 hover:border-blue-500/60 bg-blue-950/20 hover:bg-blue-950/40',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    },
    {
      id: 'galeria' as ViewMode,
      title: 'Fotos & Identidade Visual do Projeto',
      desc: 'Pôster oficial de campanha, banners em estilo grunge rasgado e o brasão institucional da EEMTI Alfredo Machado.',
      icon: <Images className="w-6 h-6 text-pink-400" />,
      badge: 'Pôster Oficial',
      colorClass: 'border-pink-500/30 hover:border-pink-500/60 bg-pink-950/20 hover:bg-pink-950/40',
      tagColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
    },
    {
      id: 'sos' as ViewMode,
      title: 'Socorro Emergencial (SOS GPS)',
      desc: 'Transmissão imediata de coordenadas GPS em situação de risco com recurso de camuflagem Pac-Man.',
      icon: <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />,
      badge: 'Pânico GPS',
      colorClass: 'border-red-600/50 hover:border-red-500 bg-gradient-to-br from-red-950/40 to-black',
      tagColor: 'bg-red-600 text-white border-red-400 font-bold'
    },
    {
      id: 'ceara' as ViewMode,
      title: 'Central Ceará Científico 2026',
      desc: 'Banner científico oficial de 90x120cm, diagnóstico da EEMTI Alfredo Machado, metodologia e autores.',
      icon: <Microscope className="w-6 h-6 text-purple-400" />,
      badge: 'Banner 90x120cm',
      colorClass: 'border-purple-500/30 hover:border-purple-500/60 bg-purple-950/20 hover:bg-purple-950/40',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Visual Banner */}
      <BannerIllustration />

      {/* Quick Action Buttons & Highlights */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#121724]/90 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              Privacidade e Anonimato Garantidos
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                Sem coleta de IP / E-mail
              </span>
            </h4>
            <p className="text-xs text-gray-400">
              Protocolo hash seguro para acompanhamento anônimo pela coordenação escolar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('denuncia')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all hover:scale-105 cursor-pointer"
          >
            <Megaphone className="w-4 h-4" />
            Fazer Denúncia
          </button>
          <button
            onClick={onOpenCamouflage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 font-semibold text-xs border border-white/10 transition-all cursor-pointer"
            title="Disfarçar app com jogo do Pac-Man retrô"
          >
            <Gamepad2 className="w-4 h-4 text-amber-400" />
            Camuflagem
          </button>
        </div>
      </div>

      {/* Main Grid of Interactive Modules */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Módulos &amp; Ferramentas da Plataforma:
          </h3>
          <span className="text-xs text-gray-400">EEMTI Alfredo Machado • Madalena/CE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => (
            <div
              key={m.id}
              onClick={() => onNavigate(m.id)}
              className={`group p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer backdrop-blur-md shadow-lg hover:-translate-y-1 ${m.colorClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 group-hover:scale-110 transition-transform">
                    {m.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${m.tagColor}`}>
                    {m.badge}
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {m.title}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-white transition-colors">
                <span>Acessar Módulo</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Research Highlight Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#111827] to-[#1e1b4b] border border-blue-500/30 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400">
            <Radio className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-display text-base font-bold text-blue-200">
              📊 Diagnóstico Local da EEMTI Alfredo Machado &amp; IBGE/PeNSE 2024
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Pesquisa realizada com estudantes da escola (<strong className="text-white">n=38</strong>) identificou que <strong className="text-amber-400 font-bold">60,5%</strong> já vivenciaram situações de bullying escolar, enquanto o Ceará registrou apenas 15 queixas oficiais em 2025 devido ao medo de represálias. A plataforma StopBullying responde diretamente a esse desafio, onde <strong className="text-emerald-400 font-bold">76,3%</strong> dos alunos afirmaram que o canal anônimo confere segurança total para romper o silêncio.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-gray-400">
              <span className="flex items-center gap-1.5 text-blue-300">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                Lei nº 13.185/2015
              </span>
              <span className="flex items-center gap-1.5 text-red-300">
                <ShieldCheck className="w-4 h-4 text-red-400" />
                Lei nº 14.811/2024 (Art. 146-A CP)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Ceará Científico 2026
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
