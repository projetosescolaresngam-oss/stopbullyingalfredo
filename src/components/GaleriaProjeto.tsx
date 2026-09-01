import React, { useState } from 'react';
import { 
  Images, 
  ArrowLeft, 
  Download, 
  Printer, 
  Maximize2, 
  Sparkles, 
  ShieldCheck, 
  QrCode, 
  FileText, 
  Share2,
  Layers,
  Award,
  CheckCircle2
} from 'lucide-react';
import { 
  OfficialPosterDisplay, 
  OfficialStopBullyingArtwork, 
  SchoolCrestBadge, 
  StopHandLogo 
} from './BrandingAssets';

interface GaleriaProjetoProps {
  onBack: () => void;
}

export const GaleriaProjeto: React.FC<GaleriaProjetoProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'poster' | 'banner' | 'mockup' | 'brasao'>('poster');
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-0.5 rounded-full">
                📸 Fotos &amp; Material Gráfico Oficial
              </span>
              <span className="text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2.5 py-0.5 rounded-full">
                Ceará Científico 2026
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Images className="w-6 h-6 text-purple-400" />
              Galeria Visual do Projeto StopBullying
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              EEMTI Alfredo Machado (Madalena/CE) • Pôster Oficial de Campanha, Banners &amp; Identidade Gráfica
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-bold transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            {copied ? 'Link Copiado!' : 'Compartilhar'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 text-xs font-bold transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimir Material
          </button>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#121724] border border-white/10 rounded-2xl">
        <button
          onClick={() => setActiveTab('poster')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'poster'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers className="w-4 h-4" />
          Pôster de Campanha (Stop Bullying 3)
        </button>

        <button
          onClick={() => setActiveTab('banner')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'banner'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Images className="w-4 h-4" />
          Banner Grunge (Stop Bullying 1 &amp; 2)
        </button>

        <button
          onClick={() => setActiveTab('mockup')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'mockup'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Award className="w-4 h-4" />
          Mockup Mobile PWA
        </button>

        <button
          onClick={() => setActiveTab('brasao')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'brasao'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Brasão EEMTI Alfredo Machado
        </button>
      </div>

      {/* Dynamic Tab Content */}
      <div className="space-y-6">
        
        {/* TAB 1: PÔSTER OFICIAL */}
        {activeTab === 'poster' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-red-500/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  📌 Pôster Oficial de Conscientização da EEMTI Alfredo Machado
                </h4>
                <p className="text-xs text-gray-300">
                  Apresenta as manchetes reais da imprensa (*CIDADES, O GLOBO, ES HOJE*), posturas proibidas e o aplicativo na palma da mão.
                </p>
              </div>
              <span className="text-[11px] font-bold bg-red-500/20 text-red-300 border border-red-500/40 px-3 py-1 rounded-full">
                Formato Vertical 90x120cm
              </span>
            </div>

            <OfficialPosterDisplay />
          </div>
        )}

        {/* TAB 2: BANNER GRUNGE */}
        {activeTab === 'banner' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  🎨 Banner Horizontal Grunge: Marca &amp; Slogan
                </h4>
                <p className="text-xs text-gray-300">
                  Papel rasgado com a mão carimbada em vermelho e tipografia stencil com o corte horizontal da cultura de paz.
                </p>
              </div>
              <span className="text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full">
                Banner 16:9 &amp; 3:1
              </span>
            </div>

            <OfficialStopBullyingArtwork />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#121724] border border-white/10 space-y-2">
                <h5 className="font-display font-bold text-xs uppercase tracking-wider text-amber-400">
                  🖐️ A Mão Vermelha em Destaque
                </h5>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Representa a atitude proativa do estudante ao erguer a mão para interromper a violência física e verbal antes que ela se agrave.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#121724] border border-white/10 space-y-2">
                <h5 className="font-display font-bold text-xs uppercase tracking-wider text-red-400">
                  ✂️ Letras em Bloco Rasgado (S-T-O-P)
                </h5>
                <p className="text-xs text-gray-300 leading-relaxed">
                  O "O" em vermelho no centro destaca o ponto de alerta e urgência no rompimento do ciclo de intimidação sistemática.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MOCKUP MOBILE PWA */}
        {activeTab === 'mockup' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-blue-500/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  📱 Aplicativo PWA no Smartphone dos Alunos
                </h4>
                <p className="text-xs text-gray-300">
                  Interface mobile responsiva que permite aos estudantes efetuarem denúncias anônimas em menos de 1 minuto em qualquer lugar da escola.
                </p>
              </div>
              <span className="text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 px-3 py-1 rounded-full">
                Progressive Web App
              </span>
            </div>

            {/* Simulated Phone Mockup */}
            <div className="flex justify-center p-6 bg-gradient-to-b from-[#090D16] to-[#040609] rounded-3xl border border-white/10">
              <div className="w-full max-w-sm rounded-[40px] border-4 border-gray-700 bg-[#090D16] p-4 shadow-2xl space-y-4">
                
                {/* Phone Notch / Header */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 px-2 font-mono">
                  <span>21:30</span>
                  <div className="w-16 h-3.5 bg-black rounded-full" />
                  <span>100% 🔋</span>
                </div>

                {/* App Brand Bar */}
                <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-black/60 border border-white/10">
                  <StopHandLogo size={32} />
                  <div>
                    <div className="font-display font-black text-xs text-white">StopBullying</div>
                    <div className="text-[10px] text-gray-400">EEMTI Alfredo Machado, Madalena/CE</div>
                  </div>
                </div>

                {/* Simulated Red Banner Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/80 to-black border border-red-600/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-red-400">
                    <span className="text-lg">🚨</span>
                    <span>Denúncia recebida</span>
                  </div>
                  <p className="text-[11px] text-gray-300">Bullying não é brincadeira. Exerça sua cidadania.</p>
                  <button className="w-full py-2 rounded-xl bg-red-600 text-white font-bold text-xs uppercase shadow-md">
                    Denunciar Agora
                  </button>
                </div>

                {/* Menu list */}
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>📢</span>
                      <div>
                        <div className="font-bold">Fazer Denúncia Anônima</div>
                        <div className="text-[10px] text-gray-400">Sua identidade protegida</div>
                      </div>
                    </div>
                    <span>›</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>💚</span>
                      <div>
                        <div className="font-bold">Apoio Emocional 4-7-8</div>
                        <div className="text-[10px] text-gray-400">Exercícios guiados para você</div>
                      </div>
                    </div>
                    <span>›</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-gray-200">
                    <div className="flex items-center gap-2">
                      <span>🚦</span>
                      <div>
                        <div className="font-bold">Triagem de Caso (Semáforo)</div>
                        <div className="text-[10px] text-gray-400">Avalie a gravidade e receba orientação</div>
                      </div>
                    </div>
                    <span>›</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BRASÃO INSTITUCIONAL */}
        {activeTab === 'brasao' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  🏫 Identidade Institucional: EEMTI Alfredo Machado
                </h4>
                <p className="text-xs text-gray-300">
                  Escola de Ensino Médio em Tempo Integral localizada no município de Madalena/CE, polo de protagonismo estudantil.
                </p>
              </div>
              <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full">
                Selo Oficial
              </span>
            </div>

            <div className="p-8 rounded-3xl bg-[#121724] border border-white/10 flex flex-col items-center justify-center space-y-6 text-center">
              <SchoolCrestBadge size={160} />

              <div className="max-w-md space-y-2">
                <h3 className="font-display text-lg font-black text-white uppercase tracking-wider">
                  E.E.M.T.I ALFREDO MACHADO
                </h3>
                <p className="text-xs text-emerald-400 font-bold">
                  Secretaria da Educação do Estado do Ceará (SEDUC-CE) • Madalena/CE
                </p>
                <p className="text-xs text-gray-300 leading-relaxed pt-2">
                  "StopBullying: Tecnologia e empatia unidas na prevenção ao bullying na EEMTI Alfredo Machado"
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
