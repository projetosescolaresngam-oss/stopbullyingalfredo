import React from 'react';

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
