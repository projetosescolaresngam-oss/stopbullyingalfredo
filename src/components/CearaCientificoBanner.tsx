import React, { useState } from 'react';
import { 
  Microscope, 
  ArrowLeft, 
  Download, 
  Printer, 
  QrCode, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Images
} from 'lucide-react';
import { SchoolCrestBadge } from './BrandingAssets';

interface CearaCientificoBannerProps {
  onBack: () => void;
}

export const CearaCientificoBanner: React.FC<CearaCientificoBannerProps> = ({ onBack }) => {
  const [viewMode, setViewMode] = useState<'banner' | 'resumo'>('banner');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <SchoolCrestBadge size={48} className="hidden sm:inline-flex" />
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Microscope className="w-6 h-6 text-purple-400" />
                Central Ceará Científico 2026
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                EEMTI Alfredo Machado (Madalena/CE) • Área: Robótica, Automação e TIC
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setViewMode('banner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'banner' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Banner 90x120cm
            </button>
            <button
              onClick={() => setViewMode('resumo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'resumo' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Resumo &amp; Metodologia
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 text-xs font-bold transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>
      </div>

      {viewMode === 'banner' ? (
        /* ================= 90x120cm Scientific Banner Layout ================= */
        <div className="rounded-3xl border-4 border-blue-900/80 bg-[#090d16] shadow-[0_0_50px_rgba(59,130,246,0.25)] overflow-hidden text-white">
          
          {/* Banner Header */}
          <div className="bg-gradient-to-b from-[#0D2B45] to-[#090d16] p-6 sm:p-8 border-b-4 border-blue-500 space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white text-[#0D2B45] font-display font-black text-xs px-3 py-1 rounded">
                  CEARÁ CIENTÍFICO 2026
                </span>
                <span className="bg-emerald-500 text-[#090d16] font-display font-black text-xs px-3 py-1 rounded">
                  SEDUC-CE
                </span>
                <span className="bg-blue-600 text-white font-display font-black text-xs px-3 py-1 rounded">
                  EEMTI ALFREDO MACHADO
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-300 bg-blue-900/40 px-3 py-1 rounded-full border border-blue-500/30">
                  Área: Robótica, Automação e TIC
                </span>

                {/* QR Code Banca Box */}
                <div className="flex items-center gap-2.5 bg-white p-2 rounded-xl border-2 border-blue-500 shadow-md">
                  <div className="w-10 h-10 bg-slate-900 rounded p-1 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-[10px] font-black text-[#0D2B45] leading-tight">
                    BANCA EXAMINADORA<br />
                    <span className="text-blue-600 font-semibold">PWA Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner Main Title */}
            <div className="text-center py-2 space-y-2">
              <h1 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                STOP<span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">BULLYING</span>
              </h1>
              <p className="text-sm sm:text-base text-blue-200 font-medium max-w-3xl mx-auto">
                Tecnologia e empatia unidas na prevenção ao bullying na EEMTI Alfredo Machado
              </p>
              <div className="text-xs sm:text-sm text-gray-300 font-semibold pt-1">
                Estudantes: <strong className="text-amber-400">Enzo Gabriel da Silva Braga</strong> &amp; <strong className="text-amber-400">Josué Gomes Pereira</strong> • Orientador: <strong className="text-blue-300">Prof. Antonio Victor Batista da Silva</strong> • Madalena/CE
              </div>
            </div>

          </div>

          {/* Banner Body (2 Equal Columns Grid) */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Column 1: Problem & Method */}
            <div className="space-y-6">
              
              {/* Introduction */}
              <div className="p-5 rounded-2xl bg-[#131b2e]/80 border border-white/10 space-y-2.5">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-blue-400 border-b border-blue-500/30 pb-1.5 flex items-center gap-2">
                  📌 Introdução e Problematização
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed">
                  O bullying afeta <strong>40% dos estudantes brasileiros de 13 a 17 anos</strong> (IBGE/PeNSE, 2024). O medo de represálias gera forte subnotificação — no Ceará, foram apenas 15 denúncias em 2025. Na EEMTI Alfredo Machado, a pesquisa de campo (<strong className="text-white">n=38</strong>) identificou <strong>60,5% de vitimizados</strong>. O StopBullying oferece acolhimento anônimo e cidadania digital.
                </p>
              </div>

              {/* Objectives */}
              <div className="p-5 rounded-2xl bg-[#131b2e]/80 border border-white/10 space-y-2.5">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-blue-400 border-b border-blue-500/30 pb-1.5 flex items-center gap-2">
                  🎯 Objetivos da Pesquisa
                </h3>
                <ul className="text-xs text-gray-200 space-y-1.5 list-disc pl-4 leading-relaxed">
                  <li>Mapear a prevalência e locais do bullying na EEMTI Alfredo Machado;</li>
                  <li>Desenvolver PWA com denúncia encriptada e protocolo hash;</li>
                  <li>Implementar triagem por gravidade (Semáforo Verde, Amarelo e Vermelho);</li>
                  <li>Integrar apoio emocional 4-7-8 com Web Audio e camuflagem discreta;</li>
                  <li>Fortalecer a convivência democrática e proteção dos direitos escolares.</li>
                </ul>
              </div>

              {/* Methodology in 4 Stages */}
              <div className="p-5 rounded-2xl bg-[#131b2e]/80 border border-white/10 space-y-2.5">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-blue-400 border-b border-blue-500/30 pb-1.5 flex items-center gap-2">
                  ⚙️ Metodologia Científica (4 Fases)
                </h3>
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-950 px-2 py-0.5 rounded">
                      Fase 1
                    </span>
                    <h5 className="text-xs font-bold text-white">Diagnóstico Local</h5>
                    <p className="text-[11px] text-gray-400">Formulário com a comunidade escolar (n=38).</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-950 px-2 py-0.5 rounded">
                      Fase 2
                    </span>
                    <h5 className="text-xs font-bold text-white">Desenvolvimento PWA</h5>
                    <p className="text-[11px] text-gray-400">Criação da plataforma SPA e armazenamento seguro.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-950 px-2 py-0.5 rounded">
                      Fase 3
                    </span>
                    <h5 className="text-xs font-bold text-white">Sensibilização</h5>
                    <p className="text-[11px] text-gray-400">Palestras sobre Lei 13.185/2015 e Lei 14.811/2024.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-950 px-2 py-0.5 rounded">
                      Fase 4
                    </span>
                    <h5 className="text-xs font-bold text-white">Avaliação de Impacto</h5>
                    <p className="text-[11px] text-gray-400">Acompanhamento e métricas da gestão.</p>
                  </div>
                </div>
              </div>

              {/* Bibliography */}
              <div className="p-5 rounded-2xl bg-[#131b2e]/80 border border-white/10 space-y-2">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-blue-400 border-b border-blue-500/30 pb-1.5 flex items-center gap-2">
                  📚 Referências Principais
                </h3>
                <div className="text-[11px] text-gray-400 space-y-1 leading-relaxed">
                  <p>• BRASIL. Lei nº 13.185/2015 — Programa de Combate à Intimidação Sistemática.</p>
                  <p>• BRASIL. Lei nº 14.811/2024 — Tipifica o bullying no Código Penal (Art. 146-A).</p>
                  <p>• FREIRE, Paulo. Pedagogia do Oprimido. Rio de Janeiro: Paz e Terra, 2011.</p>
                  <p>• IBGE. Pesquisa Nacional de Saúde do Escolar (PeNSE 2024). Rio de Janeiro: IBGE.</p>
                </div>
              </div>

            </div>

            {/* Column 2: System Architecture & Results */}
            <div className="space-y-6">
              
              {/* Architecture & Modules */}
              <div className="p-5 rounded-2xl bg-[#131b2e]/80 border border-white/10 space-y-3">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-blue-400 border-b border-blue-500/30 pb-1.5 flex items-center gap-2">
                  📱 Módulos do Sistema StopBullying
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded">
                      🔒 Anônimo
                    </span>
                    <h5 className="text-xs font-bold text-white">Denúncia Anônima</h5>
                    <p className="text-[11px] text-gray-400">Emissão de hash STP e upload multimídia ≤60s.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded">
                      🚦 Semáforo
                    </span>
                    <h5 className="text-xs font-bold text-white">Triagem de Risco</h5>
                    <p className="text-[11px] text-gray-400">Classificação Verde, Amarelo e Vermelho.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                      💚 4-7-8
                    </span>
                    <h5 className="text-xs font-bold text-white">Apoio Emocional</h5>
                    <p className="text-[11px] text-gray-400">Web Audio API + Síntese de Voz + CVV 188.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded">
                      📍 GPS + 👾 Arcade
                    </span>
                    <h5 className="text-xs font-bold text-white">SOS &amp; Pac-Man</h5>
                    <p className="text-[11px] text-gray-400">Alerta de geolocalização e disfarce discreto.</p>
                  </div>
                </div>
              </div>

              {/* Expected Results */}
              <div className="p-5 rounded-2xl bg-[#131b2e]/80 border border-white/10 space-y-3">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-blue-400 border-b border-blue-500/30 pb-1.5 flex items-center gap-2">
                  📊 Resultados Esperados &amp; Impacto
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30">
                    <h5 className="text-xs font-bold text-blue-300">Mapeamento Preciso</h5>
                    <p className="text-[11px] text-gray-300 mt-0.5">Identificação precisa dos locais de maior incidência na escola.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30">
                    <h5 className="text-xs font-bold text-emerald-300">Queda na Subnotificação</h5>
                    <p className="text-[11px] text-gray-300 mt-0.5">Anonimato absoluto estimula os jovens a quebrar o silêncio.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
                    <h5 className="text-xs font-bold text-amber-300">Acolhimento Rápido</h5>
                    <p className="text-[11px] text-gray-300 mt-0.5">Encaminhamento assertivo à coordenação e psicologia.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30">
                    <h5 className="text-xs font-bold text-purple-300">Convivência Democrática</h5>
                    <p className="text-[11px] text-gray-300 mt-0.5">Fortalecimento do protagonismo juvenil e cultura de paz.</p>
                  </div>
                </div>
              </div>

              {/* Final Remarks */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#131b2e] to-[#1e1b4b] border border-white/10 space-y-2">
                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-blue-400 border-b border-blue-500/30 pb-1.5 flex items-center gap-2">
                  💡 Considerações Finais
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed">
                  O <strong>StopBullying</strong> comprova a força da tecnologia a serviço dos direitos humanos e da convivência democrática nas escolas públicas estaduais, integrando ciência, cidadania e proteção coletiva no Ceará.
                </p>
              </div>

            </div>

          </div>

          {/* Banner Footer */}
          <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0D2B45] p-4 sm:p-5 border-t-2 border-blue-500 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-200">
            <div>EEMTI Alfredo Machado • Madalena/CE</div>
            <div className="italic text-amber-300 font-bold">
              "Ciência, Cidadania e Convivência Democrática: o conhecimento a serviço da vida coletiva"
            </div>
            <div>Ceará Científico 2026 • Banner 90 × 120 cm</div>
          </div>

        </div>
      ) : (
        /* ================= Resumo e Metodologia Tab ================= */
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121724] border border-white/10 shadow-2xl space-y-6 text-gray-200 text-sm leading-relaxed">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Documento Científico da Pesquisa
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              StopBullying: Tecnologia e empatia unidas na prevenção ao bullying na EEMTI Alfredo Machado
            </h3>
            <p className="text-xs text-gray-400">
              Autores: Enzo Gabriel da Silva Braga, Josué Gomes Pereira • Orientador: Prof. Antonio Victor Batista da Silva
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-white">1. Resumo Executivo</h4>
            <p>
              O presente projeto investiga e desenvolve uma solução inovadora para enfrentar o fenômeno do bullying e cyberbullying no contexto escolar da EEMTI Alfredo Machado, em Madalena/CE. Através de uma abordagem metodológica em quatro fases — diagnóstico quantitativo-qualitativo (n=38), desenvolvimento de um Progressive Web App (PWA), intervenções pedagógicas e avaliação contínua —, o aplicativo propõe um ecossistema com denúncia anônima criptografada, triagem semafórica de risco, apoio emocional com técnica 4-7-8 e socorro emergencial com GPS.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-display text-base font-bold text-white">2. Alinhamento com a Legislação Vigente</h4>
            <p>
              O projeto fundamenta-se estritamente na <strong>Lei Federal nº 13.185/2015</strong> (Programa de Combate à Intimidação Sistemática), na <strong>Lei nº 14.811/2024</strong> (Escola Mais Segura e criminalização do bullying/cyberbullying no Código Penal) e no <strong>ECA (Lei nº 8.069/1990)</strong>, transformando obrigações legais em ferramentas práticas de cidadania escolar.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
