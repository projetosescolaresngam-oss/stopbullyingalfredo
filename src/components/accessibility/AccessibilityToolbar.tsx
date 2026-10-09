import React, { useState } from 'react';
import {
  Sparkles,
  Type,
  Eye,
  Volume2,
  VolumeX,
  Play,
  Square,
  Minus,
  Plus,
  RotateCcw,
  X,
  Check,
  ZapOff,
  Sliders,
  Keyboard,
  Info,
  Maximize2
} from 'lucide-react';
import { useAccessibility, FontSizeLevel } from '../../AccessibilityContext';

export const AccessibilityToolbar: React.FC = () => {
  const {
    preferences,
    isSpeaking,
    isToolbarOpen,
    openToolbar,
    closeToolbar,
    toggleToolbar,
    setFontSize,
    toggleHighContrast,
    toggleDyslexiaFont,
    toggleReadingRuler,
    toggleReadingMask,
    toggleReducedMotion,
    toggleVLibras,
    toggleLetterSpacing,
    setSpeechRate,
    speakCurrentPage,
    stopReading,
    resetPreferences
  } = useAccessibility();

  const [activeTab, setActiveTab] = useState<'visual' | 'leitura' | 'audio' | 'libras' | 'atalhos'>('visual');

  // Conta quantos recursos de acessibilidade estão ativados no momento
  const activeFeaturesCount = [
    preferences.fontSize !== 'normal',
    preferences.highContrast,
    preferences.dyslexiaFont,
    preferences.readingRuler,
    preferences.readingMask,
    preferences.reducedMotion,
    preferences.vlibrasActive,
    preferences.letterSpacing === 'wide'
  ].filter(Boolean).length;

  return (
    <>
      {/* BOTÃO FLUTUANTE DISCRETO (CANTO INFERIOR DIREITO) */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden accessibility-toolbar">
        <button
          type="button"
          onClick={toggleToolbar}
          aria-label="Abrir painel de acessibilidade múltipla (Atalho: Alt + A)"
          title="Acessibilidade Múltipla (Alt + A)"
          className={`relative p-3.5 rounded-full shadow-2xl transition-all cursor-pointer flex items-center justify-center border group ${
            activeFeaturesCount > 0
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-amber-300 ring-4 ring-amber-400/30 shadow-amber-500/40 hover:scale-105'
              : 'bg-[#181126] text-purple-200 border-purple-400/30 hover:border-purple-400/70 hover:bg-[#251a3a] shadow-purple-950/50 hover:scale-105'
          }`}
        >
          {/* Ícone Universal de Acessibilidade */}
          <div className="relative">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="4.5" r="2.2" />
              <path d="M4 8.5h16" />
              <path d="M12 8.5v6" />
              <path d="m8 20.5 4-6 4 6" />
            </svg>

            {isSpeaking && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            )}
          </div>

          {/* Badge com contagem de recursos ativos */}
          {activeFeaturesCount > 0 && (
            <span className="absolute -top-1.5 -left-1.5 px-1.5 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black border border-amber-400 font-mono shadow-md">
              {activeFeaturesCount}
            </span>
          )}

          {/* Tooltip flutuante no hover */}
          <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-950/95 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-xl hidden sm:block">
            Acessibilidade (Alt + A)
          </span>
        </button>
      </div>

      {/* MODAL / GAVETA COMPLETA DE ACESSIBILIDADE */}
      {isToolbarOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fadeIn print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          <div className="w-full max-w-xl rounded-3xl bg-[#0f1426] border-2 border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-100">
            
            {/* CABEÇALHO DO PAINEL */}
            <div className="p-5 border-b border-white/10 bg-gradient-to-r from-[#141b33] to-[#0f1426] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="4.5" r="2.2" />
                    <path d="M4 8.5h16" />
                    <path d="M12 8.5v6" />
                    <path d="m8 20.5 4-6 4 6" />
                  </svg>
                </div>
                <div>
                  <h2 id="accessibility-title" className="font-display font-black text-base sm:text-lg text-white flex items-center gap-2">
                    <span>Central de Acessibilidade do Aluno</span>
                    {activeFeaturesCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/40">
                        {activeFeaturesCount} ativo{activeFeaturesCount > 1 ? 's' : ''}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Recursos universais para leitura, visão, audição e concentração
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeToolbar}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar painel de acessibilidade"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* BARRA DE NAVEGAÇÃO DE ABAS */}
            <div className="flex items-center gap-1 p-2 bg-black/40 border-b border-white/10 overflow-x-auto scrollbar-none text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('visual')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'visual'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Visual & Fonte</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('leitura')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'leitura'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Foco & TDAH</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('audio')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'audio'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Voz & Leitura</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('libras')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'libras'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>LIBRAS & Movimento</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('atalhos')}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeTab === 'atalhos'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span>Atalhos</span>
              </button>
            </div>

            {/* CONTEÚDO DAS ABAS */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs flex-1">
              
              {/* ABA 1: VISUAL & FONTE */}
              {activeTab === 'visual' && (
                <div className="space-y-4">
                  
                  {/* Seletor de Escala de Fonte */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-2">
                        <Type className="w-4 h-4 text-amber-400" />
                        Tamanho do Texto (Fonte)
                      </span>
                      <span className="font-mono text-amber-300 font-bold uppercase text-[11px]">
                        {preferences.fontSize === 'normal' && '100% Padrão'}
                        {preferences.fontSize === 'large' && '115% Grande'}
                        {preferences.fontSize === 'extralarge' && '130% Extra'}
                        {preferences.fontSize === 'huge' && '145% Gigante'}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {(['normal', 'large', 'extralarge', 'huge'] as FontSizeLevel[]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFontSize(level)}
                          className={`py-2 px-1 rounded-xl font-black text-center transition-all cursor-pointer border ${
                            preferences.fontSize === level
                              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20'
                              : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <span className={level === 'huge' ? 'text-base font-black' : level === 'extralarge' ? 'text-sm font-bold' : level === 'large' ? 'text-xs font-bold' : 'text-[11px]'}>
                            {level === 'normal' && 'A (Padrão)'}
                            {level === 'large' && 'A+ (Grande)'}
                            {level === 'extralarge' && 'A++ (Extra)'}
                            {level === 'huge' && 'A+++ (Max)'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle Alto Contraste */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white block text-sm">
                        Modo Alto Contraste (WCAG AAA)
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Fundo preto com textos em amarelo ouro e bordas reforçadas para máxima legibilidade.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={toggleHighContrast}
                      className={`px-4 py-2 rounded-xl font-black transition-all cursor-pointer shrink-0 border ${
                        preferences.highContrast
                          ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md'
                          : 'bg-white/5 text-slate-300 hover:text-white border-white/15'
                      }`}
                    >
                      {preferences.highContrast ? 'ATIVADO' : 'DESATIVADO'}
                    </button>
                  </div>

                  {/* Toggle Fonte Otimizada para Dislexia */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white block text-sm">
                        Fonte Amigável para Dislexia
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Tipografia com peso ampliado na base das letras para evitar confusão entre 'b', 'd', 'p' e 'q'.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={toggleDyslexiaFont}
                      className={`px-4 py-2 rounded-xl font-black transition-all cursor-pointer shrink-0 border ${
                        preferences.dyslexiaFont
                          ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md'
                          : 'bg-white/5 text-slate-300 hover:text-white border-white/15'
                      }`}
                    >
                      {preferences.dyslexiaFont ? 'ATIVADA' : 'DESATIVADA'}
                    </button>
                  </div>

                  {/* Toggle Espaçamento Amplo */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white block text-sm">
                        Espaçamento de Letras Ampliado
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Aumenta o espaçamento horizontal entre caracteres para aliviar o cansaço visual.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={toggleLetterSpacing}
                      className={`px-4 py-2 rounded-xl font-black transition-all cursor-pointer shrink-0 border ${
                        preferences.letterSpacing === 'wide'
                          ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md'
                          : 'bg-white/5 text-slate-300 hover:text-white border-white/15'
                      }`}
                    >
                      {preferences.letterSpacing === 'wide' ? 'AMPLO' : 'PADRÃO'}
                    </button>
                  </div>

                </div>
              )}

              {/* ABA 2: FOCO, LEITURA & TDAH */}
              {activeTab === 'leitura' && (
                <div className="space-y-4">
                  
                  {/* Régua de Leitura Guia */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white block text-sm flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-amber-400" />
                        Régua de Leitura Dinâmica (Reading Guide)
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Uma faixa horizontal destacada que segue o cursor ou toque do aluno para guiar a linha lida.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={toggleReadingRuler}
                      className={`px-4 py-2 rounded-xl font-black transition-all cursor-pointer shrink-0 border ${
                        preferences.readingRuler
                          ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md'
                          : 'bg-white/5 text-slate-300 hover:text-white border-white/15'
                      }`}
                    >
                      {preferences.readingRuler ? 'LIGADA' : 'DESLIGADA'}
                    </button>
                  </div>

                  {/* Máscara de Foco Concentrado */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white block text-sm flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-amber-400" />
                        Máscara de Leitura / Isolamento de Foco
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Escurece o topo e a base da tela, mantendo uma fita de foco no parágrafo atual (ideal para TDAH).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={toggleReadingMask}
                      className={`px-4 py-2 rounded-xl font-black transition-all cursor-pointer shrink-0 border ${
                        preferences.readingMask
                          ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md'
                          : 'bg-white/5 text-slate-300 hover:text-white border-white/15'
                      }`}
                    >
                      {preferences.readingMask ? 'LIGADA' : 'DESLIGADA'}
                    </button>
                  </div>

                  {/* Dica Pedagógica */}
                  <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      A régua de leitura é especialmente eficaz em relatos extensos no canal de denúncia, na consulta do protocolo e na leitura das diretrizes do Estatuto da Criança e do Adolescente.
                    </p>
                  </div>

                </div>
              )}

              {/* ABA 3: VOZ & ÁUDIO */}
              {activeTab === 'audio' && (
                <div className="space-y-4">
                  
                  {/* Ler Tela Inteira em Voz Alta */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/80 to-[#121933] border border-indigo-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block text-sm flex items-center gap-2">
                          <Volume2 className="w-4 h-4 text-emerald-400" />
                          Leitor de Tela em Voz Alta (Português BR)
                        </span>
                        <p className="text-slate-300 text-[11px]">
                          Sintetiza em áudio os textos, títulos e orientações presentes na tela ativa.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={speakCurrentPage}
                        className={`px-4 py-2 rounded-xl font-black flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                          isSpeaking
                            ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <Square className="w-4 h-4" />
                            <span>Parar Leitura</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Ouvir Esta Tela</span>
                          </>
                        )}
                      </button>
                    </div>

                    {isSpeaking && (
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-black/40 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>Reproduzindo conteúdo em áudio... Pressione Alt + S para pausar.</span>
                      </div>
                    )}
                  </div>

                  {/* Velocidade da Fala */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                    <span className="font-bold text-white block">
                      Velocidade da Narração
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: '0.8x (Mais Calma)', rate: 0.8 },
                        { label: '1.0x (Normal)', rate: 1.0 },
                        { label: '1.2x (Ágil)', rate: 1.2 }
                      ].map((item) => (
                        <button
                          key={item.rate}
                          type="button"
                          onClick={() => setSpeechRate(item.rate)}
                          className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition-all cursor-pointer border ${
                            preferences.speechRate === item.rate
                              ? 'bg-amber-500 text-slate-950 border-amber-300 font-black'
                              : 'bg-white/5 text-slate-300 hover:text-white border-white/10'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recurso de Leitura por Seleção */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1 text-slate-300">
                    <span className="font-bold text-amber-300 block text-xs">
                      ★ Leitura Instantânea de Qualquer Trecho:
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Basta selecionar qualquer frase ou palavra na tela com o mouse ou dedo. Um botão flutuante <strong>"🔊 Ouvir trecho"</strong> surgirá imediatamente acima da seleção.
                    </p>
                  </div>

                </div>
              )}

              {/* ABA 4: LIBRAS & MOVIMENTO */}
              {activeTab === 'libras' && (
                <div className="space-y-4">
                  
                  {/* Intérprete VLibras */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white block text-sm flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        Avatar de LIBRAS (VLibras Oficial)
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Traduz conteúdos em texto para a Língua Brasileira de Sinais via avatar 3D (RNP / Governo Federal).
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={toggleVLibras}
                      className={`px-4 py-2 rounded-xl font-black transition-all cursor-pointer shrink-0 border ${
                        preferences.vlibrasActive
                          ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-md'
                          : 'bg-white/5 text-slate-300 hover:text-white border-white/15'
                      }`}
                    >
                      {preferences.vlibrasActive ? 'ATIVADO' : 'DESATIVADO'}
                    </button>
                  </div>

                  {/* Redução de Movimento / Anti-sensorial */}
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-bold text-white block text-sm flex items-center gap-1.5">
                        <ZapOff className="w-4 h-4 text-purple-400" />
                        Redução de Estímulos e Movimento
                      </span>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Desativa animações, transições e efeitos piscantes. Essencial para estudantes com sensibilidade sensorial ou epilepsia fotossensível.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={toggleReducedMotion}
                      className={`px-4 py-2 rounded-xl font-black transition-all cursor-pointer shrink-0 border ${
                        preferences.reducedMotion
                          ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md'
                          : 'bg-white/5 text-slate-300 hover:text-white border-white/15'
                      }`}
                    >
                      {preferences.reducedMotion ? 'ATIVADA' : 'DESATIVADA'}
                    </button>
                  </div>

                </div>
              )}

              {/* ABA 5: ATALHOS DE TECLADO */}
              {activeTab === 'atalhos' && (
                <div className="space-y-3">
                  <span className="font-bold text-white block text-xs uppercase text-slate-400 tracking-wider">
                    Navegação Acelerada por Teclado
                  </span>

                  <div className="space-y-2">
                    {[
                      { key: 'Alt + A', desc: 'Abrir / Fechar esta Central de Acessibilidade' },
                      { key: 'Alt + S', desc: 'Iniciar ou Interromper a Narração em Voz Alta' },
                      { key: 'Alt + C', desc: 'Alternar Modo de Alto Contraste (WCAG AAA)' },
                      { key: 'Alt + R', desc: 'Ligar / Desligar Régua de Leitura Dinâmica' },
                      { key: 'TAB / Shift+TAB', desc: 'Navegar entre botões e campos com anel de foco visível' },
                      { key: 'ESC', desc: 'Fechar qualquer janela ou modal aberto' }
                    ].map((shortcut, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-slate-300 text-xs">{shortcut.desc}</span>
                        <kbd className="px-2.5 py-1 rounded-lg bg-white/10 text-amber-300 font-mono text-[11px] font-bold border border-white/15 shadow-xs">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RODAPÉ DO PAINEL COM RESET E CONFIRMAÇÃO */}
            <div className="p-4 bg-black/50 border-t border-white/10 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={resetPreferences}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrão</span>
              </button>

              <button
                type="button"
                onClick={closeToolbar}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Aplicar &amp; Fechar</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
