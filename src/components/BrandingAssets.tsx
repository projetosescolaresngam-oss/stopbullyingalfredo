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

// Official Grunge Handprint Logo / Icon
export const StopHandLogo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 48 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(229,57,53,0.6)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Dark container */}
        <circle cx="50" cy="50" r="46" fill="#121724" stroke="#E53935" strokeWidth="2.5" />
        
        {/* Palm and Fingers with grunge texture lines */}
        <path
          d="M32 42V26C32 23.8 33.8 22 36 22C38.2 22 40 23.8 40 26V40M40 38V19C40 16.8 41.8 15 44 15C46.2 15 48 16.8 48 19V38M48 38V22C48 19.8 49.8 18 52 18C54.2 18 56 19.8 56 22V39M56 40V27C56 24.8 57.8 23 60 23C62.2 23 64 24.8 64 27V48C64 61.2 53.3 72 40 72C29.5 72 20.8 65.2 18 55.7L22.5 48.5C24.2 45.7 27.8 44.8 30.6 46.5L32 47.4V42Z"
          fill="#E53935"
        />
        <path d="M34 50 C38 52 44 54 48 50 M32 58 C38 62 46 62 52 56" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

        {/* Red Strike-Through Slash */}
        <path d="M12 78L88 22" stroke="#E53935" strokeWidth="6" strokeLinecap="round" />
        <path d="M15 76L85 24" stroke="#FFA726" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        
        {/* Small Red Blood/Paint Splatter Dots */}
        <circle cx="20" cy="25" r="2.5" fill="#E53935" />
        <circle cx="80" cy="70" r="3" fill="#E53935" />
        <circle cx="75" cy="80" r="2" fill="#E53935" />
      </svg>
    </div>
  );
};

// Official Banner Graphic (Matching Stop Bullying.jpeg and Stop Bullying 2.jpeg)
export const OfficialStopBullyingArtwork: React.FC<{ className?: string; interactive?: boolean }> = ({ className = '', interactive = false }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#EBE7DF] text-[#111827] select-none shadow-2xl ${className}`}>
      
      {/* Torn Paper Grunge Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Red paint splatters in corners */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/30 rounded-full blur-2xl pointer-events-none" />

      {/* Main Banner Content */}
      <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Distressed Red Handprint & Action Lines */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          {/* Action lines left */}
          <div className="absolute -top-3 -left-3 text-gray-800 font-mono font-black text-xl select-none rotate-[-15deg]">
            \ | /
          </div>

          <svg viewBox="0 0 140 140" className="w-32 sm:w-40 h-32 sm:h-40 drop-shadow-md">
            {/* Realistic Textured Red Handprint */}
            <g fill="#D32F2F">
              {/* Palm */}
              <ellipse cx="68" cy="88" rx="26" ry="24" transform="rotate(-6 68 88)" />
              <path d="M42 85 C38 72 48 64 56 64 C64 64 74 65 82 66 C90 68 96 76 94 88 C92 98 84 108 70 110 C56 112 46 102 42 85 Z" />
              
              {/* Thumb */}
              <ellipse cx="34" cy="74" rx="9" ry="16" transform="rotate(-40 34 74)" />
              
              {/* Index Finger */}
              <ellipse cx="48" cy="42" rx="7" ry="20" transform="rotate(-12 48 42)" />
              <circle cx="46" cy="24" r="7" />
              
              {/* Middle Finger */}
              <ellipse cx="66" cy="36" rx="7.5" ry="24" transform="rotate(-2 66 36)" />
              <circle cx="66" cy="14" r="7.5" />
              
              {/* Ring Finger */}
              <ellipse cx="84" cy="40" rx="7.5" ry="22" transform="rotate(8 84 40)" />
              <circle cx="87" cy="20" r="7" />
              
              {/* Pinky Finger */}
              <ellipse cx="100" cy="52" rx="6.5" ry="17" transform="rotate(18 100 52)" />
              <circle cx="105" cy="38" r="6" />
            </g>

            {/* Hand Cracks / Distress Highlights */}
            <path d="M50 78 C58 84 66 82 76 80 M54 94 C64 98 72 96 82 92 M64 45 L68 55 M80 48 L86 58" stroke="#EBE7DF" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
          </svg>
        </div>

        {/* Right Side: Torn Paper "STOP" and Grungy "BULLYING" */}
        <div className="flex-1 text-center md:text-left space-y-3">
          
          {/* Torn Paper Blocks for S - T - O - P */}
          <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
            
            {/* S Block (Black card) */}
            <div className="w-11 sm:w-14 h-14 sm:h-18 bg-[#18181B] text-white flex items-center justify-center font-display font-black text-2xl sm:text-4xl shadow-md transform -rotate-3 border border-black/40 rounded-sm">
              S
            </div>

            {/* T Block (White card) */}
            <div className="w-11 sm:w-14 h-14 sm:h-18 bg-white text-[#18181B] flex items-center justify-center font-display font-black text-2xl sm:text-4xl shadow-md transform rotate-2 border border-gray-300 rounded-sm">
              T
            </div>

            {/* O Block (White card with bold RED 'O') */}
            <div className="w-11 sm:w-14 h-14 sm:h-18 bg-white text-[#DC2626] flex items-center justify-center font-display font-black text-2xl sm:text-4xl shadow-md transform -rotate-2 border border-gray-300 rounded-sm">
              O
            </div>

            {/* P Block (White card) */}
            <div className="w-11 sm:w-14 h-14 sm:h-18 bg-white text-[#18181B] flex items-center justify-center font-display font-black text-2xl sm:text-4xl shadow-md transform rotate-3 border border-gray-300 rounded-sm">
              P
            </div>

          </div>

          {/* BULLYING text with Red Paint Slash */}
          <div className="relative inline-block mt-2">
            <span className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-widest text-[#090D16] uppercase block transform skew-x-[-2deg]">
              BULLYING
            </span>
            
            {/* The Horizontal Red Brush Stroke Strike-through */}
            <div className="absolute top-1/2 -left-3 -right-3 h-2 sm:h-3.5 bg-gradient-to-r from-red-700 via-red-600 to-red-500 rounded-full transform -translate-y-1/2 -rotate-1 shadow-md opacity-95" />
            
            {/* Action lines right */}
            <div className="absolute -bottom-5 -right-6 text-gray-800 font-mono font-black text-sm select-none rotate-[20deg]">
              / | \
            </div>
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
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0C1527] to-[#160D1E] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* School Shield + Info */}
          <div className="flex items-center gap-4">
            <SchoolCrestBadge size={64} className="flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-500/40">
                  EEMTI ALFREDO MACHADO
                </span>
                <span className="text-[11px] text-emerald-400 font-bold">Madalena/CE</span>
              </div>
              <h4 className="font-display font-bold text-sm text-white mt-1">
                StopBullying: Tecnologia e empatia unidas na prevenção ao bullying na EEMTI Alfredo Machado
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Ceará Científico 2026 • Área de Robótica, Automação e TIC
              </p>
            </div>
          </div>

          {/* Interactive Feature Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 font-bold flex items-center gap-1.5">
              📢 Denúncia Anônima
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5">
              💚 Apoio 4-7-8
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1.5">
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
