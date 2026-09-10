import React from 'react';

// Official Circular School Crest of EEMTI Alfredo Machado
export const SchoolCrestBadge: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 56 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer green circle with golden border */}
        <circle cx="60" cy="60" r="56" fill="#0D4B26" stroke="#D4AF37" strokeWidth="4" />
        <circle cx="60" cy="60" r="48" fill="#135E32" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Circular text path simulation */}
        <path id="crestTopArc" d="M 22 60 A 38 38 0 0 1 98 60" fill="none" />
        <path id="crestBottomArc" d="M 98 60 A 38 38 0 0 1 22 60" fill="none" />

        <text fill="#FFFFFF" fontSize="8.5" fontWeight="900" letterSpacing="0.8" textAnchor="middle">
          <textPath href="#crestTopArc" startOffset="50%">
            E.E.M.T.I ALFREDO MACHADO
          </textPath>
        </text>

        <text fill="#FFD700" fontSize="8" fontWeight="800" letterSpacing="0.8" textAnchor="middle">
          <textPath href="#crestBottomArc" startOffset="50%">
            • MADALENA - CEARÁ •
          </textPath>
        </text>

        {/* Inner Shield / Coat of Arms */}
        <circle cx="60" cy="60" r="26" fill="#092B16" stroke="#D4AF37" strokeWidth="2" />
        <path d="M44 48 C44 44 76 44 76 48 V64 C76 72 60 78 60 78 C60 78 44 72 44 64 Z" fill="#D4AF37" opacity="0.9" />
        <path d="M46 49 C46 46 74 46 74 49 V63 C74 70 60 75 60 75 C60 75 46 70 46 63 Z" fill="#0B3C1F" />
        
        {/* Educational Torch / Book symbol in shield */}
        <path d="M54 62 L60 52 L66 62 Z" fill="#FFD700" />
        <circle cx="60" cy="50" r="3" fill="#EF4444" />
        <path d="M52 64 C56 63 64 63 68 64" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Official Grunge Handprint Logo / Icon (Exatamente como a imagem anexada logostop.png)
export const StopHandLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      <img
        src="/logostop.png"
        alt="Stop Bullying Logo"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain drop-shadow-sm select-none"
      />
    </div>
  );
};

// Full High-Resolution Official StopBullying Emblem Component (Exatamente como o arquivo logostop.png)
export const StopBullyingOfficialLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none overflow-hidden ${className}`} 
      style={size ? { width: size, height: size } : undefined}
    >
      <img
        src="/logostop.png"
        alt="Logo Oficial Stop Bullying - EEMTI Alfredo Machado"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain drop-shadow-md select-none"
      />
    </div>
  );
};


// Official Banner Graphic (Matching Official Logo Art)
export const OfficialStopBullyingArtwork: React.FC<{ className?: string; interactive?: boolean }> = ({ className = '', interactive = false }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121620] via-[#1a0b12] to-[#0a0d14] text-white select-none shadow-2xl border-2 border-red-500/30 ${className}`}>
      
      {/* Red ambient lighting and background mist */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Banner Content */}
      <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8 z-10">
        
        {/* Left Side: StopBullying Official Logo */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="w-56 sm:w-64 md:w-72 h-auto">
            <StopBullyingOfficialLogo size={260} className="w-full h-auto" />
          </div>
        </div>

        {/* Right Side: Manifesto & Anti-Bullying Statement */}
        <div className="flex-1 text-center md:text-left space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-black uppercase tracking-wider">
            <span>Movimento Escolar Permanente</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-snug">
            Tolerância Zero ao Bullying e Cyberbullying
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
            Na EEMTI Alfredo Machado, cada estudante tem o direito fundamental de estudar com respeito, dignidade e acolhimento. Rompa o silêncio: proteja a si mesmo e aos seus colegas com sigilo absoluto.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1">
            <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-white/10 text-gray-200 border border-white/10">
              ✋ Acolher é Proteger
            </span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-red-950/80 text-red-200 border border-red-800/60">
              🚫 Não se cale
            </span>
            <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-purple-950/80 text-purple-200 border border-purple-800/60">
              💜 Empatia &amp; Respeito
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

// Full Official Campaign Poster (Matching Stop Bullying 3.jpeg)
export const OfficialPosterDisplay: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#090C12] text-white border-4 border-red-900/60 shadow-[0_0_60px_rgba(220,38,38,0.3)] ${className}`}>
      
      {/* Background Ambience & Red/Dark Mist */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C0505] via-[#090C12] to-[#040609] opacity-95 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10 space-y-8">
        
        {/* Top Section: Newspaper Headlines & Anti-Bullying Warning Stamps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Column 1: Behavior Cross-Outs */}
          <div className="space-y-3 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-sm">
            <span className="text-[10px] uppercase font-black tracking-wider text-red-400 block border-b border-red-900/50 pb-1">
              Práticas Inaceitáveis
            </span>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-gray-300">🙇 IGNORAR</span>
                <span className="text-red-500 font-black text-sm">❌</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-gray-300">😆 HUMILHAR</span>
                <span className="text-red-500 font-black text-sm">❌</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-gray-300">☹️ ZOAR</span>
                <span className="text-red-500 font-black text-sm">❌</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                <span className="text-gray-300">💔 EXCLUIR</span>
                <span className="text-red-500 font-black text-sm">❌</span>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Real Newspaper Headlines */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Clipping 1: CIDADES */}
            <div className="p-3.5 rounded-xl bg-[#EBE7DF] text-[#1E293B] shadow-md transform -rotate-1 border-2 border-dashed border-gray-400 flex flex-col justify-between">
              <span className="text-[9px] font-black uppercase tracking-wider bg-red-700 text-white px-2 py-0.5 rounded w-max">
                CIDADES
              </span>
              <h5 className="font-serif font-black text-xs sm:text-sm mt-1 leading-snug">
                "Crescem casos de bullying em escolas da rede estadual"
              </h5>
              <p className="text-[10px] text-gray-700 mt-1 font-serif">
                Agressões físicas e psicológicas entre estudantes preocupam educadores e famílias.
              </p>
            </div>

            {/* Clipping 2: O GLOBO */}
            <div className="p-3.5 rounded-xl bg-[#EBE7DF] text-[#1E293B] shadow-md transform rotate-1 border-2 border-dashed border-gray-400 flex flex-col justify-between">
              <span className="text-[9px] font-black uppercase tracking-wider bg-[#1E293B] text-white px-2 py-0.5 rounded w-max">
                O GLOBO
              </span>
              <h5 className="font-serif font-black text-xs sm:text-sm mt-1 leading-snug text-red-900">
                "Vítima de bullying mata colegas e fere na escola"
              </h5>
              <p className="text-[10px] text-gray-700 mt-1 font-serif">
                Tragédia reacende debate sobre violência, exclusão e saúde mental.
              </p>
            </div>

            {/* Clipping 3: ES HOJE */}
            <div className="sm:col-span-2 p-3.5 rounded-xl bg-[#EBE7DF] text-[#1E293B] shadow-md border-2 border-dashed border-gray-400">
              <span className="text-[9px] font-black uppercase tracking-wider bg-red-800 text-white px-2 py-0.5 rounded">
                ES HOJE
              </span>
              <h5 className="font-serif font-black text-xs sm:text-sm mt-1 leading-snug">
                "Bullying cresce e escancara um cenário doloroso infantil"
              </h5>
              <p className="text-[10px] text-gray-700 mt-1 font-serif">
                Casos de humilhação, ameaças e agressões se multiplicam dentro e fora das salas de aula.
              </p>
            </div>

          </div>

        </div>

        {/* Center: The Official Grunge Artwork Banner */}
        <OfficialStopBullyingArtwork />

        {/* Bottom Section: School Badge, Slogan & App Live Mockup */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white border border-purple-400/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* School Shield + Info */}
          <div className="flex items-center gap-4">
            <SchoolCrestBadge size={64} className="flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40">
                  EEMTI ALFREDO MACHADO
                </span>
                <span className="text-[11px] text-emerald-300 font-bold">Madalena/CE</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white mt-1">
                StopBullying: Tecnologia e empatia unidas na prevenção ao bullying na EEMTI Alfredo Machado
              </h4>
              <p className="text-xs text-purple-200/90 mt-0.5">
                Ceará Científico 2026 • Área de Robótica, Automação e TIC
              </p>
            </div>
          </div>

          {/* Interactive Feature Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-rose-500/25 text-rose-100 border border-rose-400/40 font-bold flex items-center gap-1.5">
              📢 Denúncia Anônima
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/25 text-emerald-100 border border-emerald-400/40 font-bold flex items-center gap-1.5">
              💚 Apoio 4-7-8
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/25 text-amber-100 border border-amber-400/40 font-bold flex items-center gap-1.5">
              🚦 Semáforo
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export const BannerIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Official Banner artwork */}
      <OfficialStopBullyingArtwork />
    </div>
  );
};
