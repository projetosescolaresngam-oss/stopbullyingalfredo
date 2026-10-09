import React from 'react';

/**
 * Handcrafted Vector Illustrations for Achievements 19 to 36
 * Rich organic shapes, lighting, materials, specular highlights and atmospheric depth.
 */
export const renderIllustrationPart2 = (id: string): React.ReactNode => {
  switch (id) {
    // 19. DOUTOR DA ÉTICA (Pergaminho Imperial, Pena Dourada & Lacre Real)
    case 'doutor_da_etica':
      return (
        <g id="ach-doutor-etica">
          <rect x="8" y="8" width="48" height="48" fill="#1c0f08" />
          <circle cx="32" cy="30" r="22" fill="#ca8a04" opacity="0.2" filter="url(#badgeGlow)" />

          {/* Pergaminho Imperial Desdobrado */}
          <g filter="url(#badgeSoftShadow)">
            <path d="M16 46 C20 44, 28 45, 34 47 C40 45, 46 44, 48 46 L46 16 C42 14, 34 15, 28 13 C22 15, 16 14, 14 16 Z" 
                  fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
            <path d="M14 16 C12 18, 12 22, 14 24 L46 24 C48 22, 48 18, 46 16" fill="#fde68a" stroke="#78350f" strokeWidth="0.8" />
            <path d="M16 46 C14 48, 14 52, 16 54 L48 54 C50 52, 50 48, 48 46" fill="#fde68a" stroke="#78350f" strokeWidth="0.8" />
          </g>

          {/* Caligrafia Arcana Dourada no Pergaminho */}
          <line x1="18" y1="28" x2="34" y2="28" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="18" y1="32" x2="32" y2="32" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="18" y1="36" x2="35" y2="36" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="18" y1="40" x2="30" y2="40" stroke="#92400e" strokeWidth="0.8" strokeLinecap="round" />

          {/* Pena de Fênix Dourada Escrevendo */}
          <path d="M42 22 C44 14, 48 10, 52 8 C50 14, 44 24, 38 34 L36 33 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.7" />
          <line x1="36" y1="33" x2="35" y2="36" stroke="#000000" strokeWidth="1" strokeLinecap="round" />
          
          {/* Selo de Cera Imperial Carmesim com Fitas de Ouro */}
          <path d="M30 46 L27 53 L31 51 L35 53 L32 46" fill="url(#goldMetalGrad)" />
          <circle cx="31" cy="46" r="4.5" fill="url(#rubyGemGrad)" stroke="#881337" strokeWidth="1" filter="url(#badgeSoftShadow)" />
          <circle cx="31" cy="46" r="2.5" fill="none" stroke="#fef08a" strokeWidth="0.8" />
        </g>
      );

    // 20. GUARDIÃO SUPREMO (Lâmina da Terra / Terra Blade de Esmeralda)
    case 'guardiao_supremo':
      return (
        <g id="ach-guardiao-supremo">
          <rect x="8" y="8" width="48" height="48" fill="#031f14" />
          <circle cx="32" cy="32" r="22" fill="#10b981" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Chamas de Energia Verde-Éter Orbitando a Lâmina */}
          <path d="M14 36 Q18 20 32 14 Q46 20 50 36" stroke="url(#emeraldGemGrad)" strokeWidth="2.5" fill="none" opacity="0.6" filter="url(#badgeGlow)" />
          
          {/* Lâmina da Terra (Terra Blade) em Diagonal Heroica */}
          {/* Guarda e Empunhadura de Ouro */}
          <line x1="16" y1="48" x2="22" y2="42" stroke="url(#goldMetalGrad)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="15" cy="49" r="2" fill="url(#rubyGemGrad)" stroke="#713f12" strokeWidth="0.6" />
          {/* Asas da Guarda em Ouro */}
          <path d="M18 40 L26 48 L28 44 L22 38 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />

          {/* Corpo da Lâmina de Cristal de Esmeralda com Chanfro Duplo */}
          <path d="M22 38 L44 16 C46 14, 50 14, 52 16 C50 20, 42 30, 26 44 Z" 
                fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="1.2" filter="url(#badgeSoftShadow)" />
          {/* Fio de Corte Luminescente */}
          <path d="M22 38 L48 12 L52 16" stroke="#a7f3d0" strokeWidth="1" fill="none" />
          {/* Ranhura de Energia Central */}
          <line x1="26" y1="36" x2="44" y2="18" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />

          {/* Faíscas e Fragmentos de Energia Verde */}
          <circle cx="48" cy="12" r="1.2" fill="#ffffff" filter="url(#badgeGlow)" />
          <circle cx="38" cy="12" r="0.8" fill="#86efac" />
          <circle cx="52" cy="24" r="0.8" fill="#86efac" />
        </g>
      );

    // 21. COLECIONADOR SUPREMO (Baú do Tesouro Real Transbordando Joias)
    case 'colecionador_supremo':
      return (
        <g id="ach-colecionador-supremo">
          <rect x="8" y="8" width="48" height="48" fill="#180b02" />
          <circle cx="32" cy="30" r="22" fill="#ca8a04" opacity="0.3" filter="url(#badgeGlow)" />

          {/* Baú de Carvalho Escuro e Ouro Aberto */}
          {/* Base do Baú */}
          <path d="M14 36 L16 52 L48 52 L50 36 Z" fill="#78350f" stroke="url(#goldMetalGrad)" strokeWidth="1.5" />
          <line x1="20" y1="36" x2="21" y2="52" stroke="url(#goldMetalGrad)" strokeWidth="1.2" />
          <line x1="44" y1="36" x2="43" y2="52" stroke="url(#goldMetalGrad)" strokeWidth="1.2" />
          {/* Fechadura de Ouro */}
          <circle cx="32" cy="43" r="2.5" fill="url(#goldBevelGrad)" stroke="#713f12" strokeWidth="0.8" />
          <circle cx="32" cy="43" r="1" fill="#000000" />

          {/* Tampa do Baú Aberta Inclinada */}
          <path d="M12 36 C16 22, 48 22, 52 36 L48 33 C44 24, 20 24, 16 33 Z" fill="#92400e" stroke="url(#goldMetalGrad)" strokeWidth="1.5" />

          {/* Montanha de Moedas de Ouro e Joias Lapidadas */}
          {/* Moedas */}
          <ellipse cx="32" cy="35" rx="14" ry="4" fill="url(#goldMetalGrad)" />
          <circle cx="24" cy="34" r="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
          <circle cx="28" cy="33" r="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
          <circle cx="36" cy="34" r="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />
          <circle cx="40" cy="33" r="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.5" />

          {/* Gemas Lapidadas em Destaque */}
          {/* Grande Diamante */}
          <polygon points="32,23 28,27 32,32 36,27" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" filter="url(#badgeGlow)" />
          {/* Rubi */}
          <polygon points="23,28 20,31 23,34 26,31" fill="url(#rubyGemGrad)" stroke="#881337" strokeWidth="0.6" />
          {/* Esmeralda */}
          <polygon points="41,28 38,31 41,34 44,31" fill="url(#emeraldGemGrad)" stroke="#064e3b" strokeWidth="0.6" />

          {/* Brilhos Estelares */}
          <circle cx="32" cy="23" r="1" fill="#ffffff" />
          <circle cx="23" cy="28" r="0.7" fill="#ffffff" />
        </g>
      );

    // 22. EXPLORADOR DOS TIPOS (Roda Octogonal das 8 Gemas Elementais)
    case 'explorador_tipos':
      return (
        <g id="ach-explorador-tipos">
          <rect x="8" y="8" width="48" height="48" fill="#080c1c" />
          
          {/* Linhas Místicas de Conexão Rúnica */}
          <polygon points="32,15 44,20 49,32 44,44 32,49 20,44 15,32 20,20" 
                   fill="none" stroke="url(#goldMetalGrad)" strokeWidth="1.2" opacity="0.8" />
          <polygon points="32,18 42,28 32,46 22,28" fill="none" stroke="#38bdf8" strokeWidth="0.6" opacity="0.5" />

          {/* Núcleo Central de Prata e Ouro */}
          <circle cx="32" cy="32" r="7" fill="url(#silverMetalGrad)" stroke="url(#goldMetalGrad)" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="4.5" fill="url(#celestialCyanGrad)" />
          <circle cx="32" cy="32" r="2" fill="#ffffff" />

          {/* 8 Gemas Elementais Lapidadas em Órbita */}
          {/* Topo: Rubi de Fogo */}
          <circle cx="32" cy="15" r="2.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.6" />
          {/* Nordeste: Topázio Dourado */}
          <circle cx="44" cy="20" r="2.8" fill="url(#goldMetalGrad)" stroke="#ffffff" strokeWidth="0.6" />
          {/* Leste: Âmbar Solar */}
          <circle cx="49" cy="32" r="2.8" fill="url(#solarFireGrad)" stroke="#ffffff" strokeWidth="0.6" />
          {/* Sudeste: Esmeralda da Terra */}
          <circle cx="44" cy="44" r="2.8" fill="url(#emeraldGemGrad)" stroke="#fef08a" strokeWidth="0.6" />
          {/* Sul: Safira d'Água */}
          <circle cx="32" cy="49" r="2.8" fill="url(#sapphireGemGrad)" stroke="#ffffff" strokeWidth="0.6" />
          {/* Sudoeste: Ametista do Espírito */}
          <circle cx="20" cy="44" r="2.8" fill="url(#amethystGemGrad)" stroke="#fef08a" strokeWidth="0.6" />
          {/* Oeste: Diamante do Vento */}
          <circle cx="15" cy="32" r="2.8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.6" />
          {/* Noroeste: Jade da Harmonia */}
          <circle cx="20" cy="20" r="2.8" fill="#86efac" stroke="#15803d" strokeWidth="0.6" />
        </g>
      );

    // 23. MARATONA DE QUESTÕES (Botas Aladas de Hermes & Vento Veloz)
    case 'maratona_questoes':
      return (
        <g id="ach-maratona-questoes">
          <rect x="8" y="8" width="48" height="48" fill="#082032" />
          <circle cx="30" cy="32" r="22" fill="#38bdf8" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Rastros de Velocidade do Vento */}
          <path d="M12 24 Q24 20 40 26" stroke="#bae6fd" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
          <path d="M10 34 Q22 30 46 38" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M14 44 Q28 40 50 48" stroke="#bae6fd" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />

          {/* Bota de Hermes de Platina e Ouro */}
          <g filter="url(#badgeSoftShadow)">
            {/* Cano da Bota */}
            <path d="M28 20 L35 20 C36 28, 38 32, 44 38 L42 45 C34 46, 26 44, 25 36 L26 26 Z" 
                  fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1.2" />
            {/* Biqueira Curvada e Sola de Ouro */}
            <path d="M25 45 Q36 47 45 44 L46 41 C42 41, 38 38, 36 36 L30 36 C27 40, 25 43, 25 45 Z" 
                  fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />
            
            {/* Asas de Plumas de Prata no Tornozelo */}
            {/* Pena 1 Superior */}
            <path d="M26 24 C20 18, 12 20, 10 26 C16 26, 22 25, 26 24 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
            {/* Pena 2 Média */}
            <path d="M26 28 C18 24, 10 28, 9 34 C16 32, 22 30, 26 28 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />
            {/* Pena 3 Inferior */}
            <path d="M26 32 C19 30, 12 36, 12 40 C18 37, 23 35, 26 32 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.8" />
          </g>

          {/* Faíscas de Velocidade e Estrelas */}
          <circle cx="46" cy="42" r="1.2" fill="#fef08a" filter="url(#badgeGlow)" />
          <circle cx="50" cy="36" r="0.8" fill="#fef08a" />
          <circle cx="42" cy="48" r="0.8" fill="#ffffff" />
        </g>
      );

    // 24. DESAFIO PERFEITO (Arco Élfico & Flecha de Fogo Solar)
    case 'desafio_perfeito':
      return (
        <g id="ach-desafio-perfeito">
          <rect x="8" y="8" width="48" height="48" fill="#1c0700" />
          <circle cx="32" cy="32" r="20" fill="#ea580c" opacity="0.3" filter="url(#badgeGlow)" />

          {/* Arco Élfico Recurvado de Madeira Nobre e Ouro */}
          <g filter="url(#badgeSoftShadow)">
            <path d="M16 16 C22 22, 22 42, 16 48 C20 44, 20 20, 16 16 Z" 
                  fill="url(#goldMetalGrad)" stroke="#78350f" strokeWidth="1.2" />
            <path d="M16 16 C26 24, 26 40, 16 48" stroke="#ca8a04" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Extremidades Ornamentadas */}
            <circle cx="16" cy="16" r="2" fill="url(#rubyGemGrad)" />
            <circle cx="16" cy="48" r="2" fill="url(#rubyGemGrad)" />
          </g>

          {/* Corda de Luz do Arco Esticada */}
          <line x1="16" y1="16" x2="38" y2="32" stroke="#fef08a" strokeWidth="1" strokeDasharray="4 1" />
          <line x1="16" y1="48" x2="38" y2="32" stroke="#fef08a" strokeWidth="1" strokeDasharray="4 1" />

          {/* Flecha Solar Nocada com Ponta Incandescente */}
          <line x1="14" y1="32" x2="50" y2="32" stroke="url(#goldMetalGrad)" strokeWidth="2" strokeLinecap="round" />
          {/* Ponta de Flecha em Fogo Solar */}
          <polygon points="50,32 44,28 46,32 44,36" fill="url(#solarFireGrad)" stroke="#fef08a" strokeWidth="0.8" filter="url(#badgeGlow)" />
          
          {/* Penas da Flecha em Ruby */}
          <path d="M16 32 L12 28 L14 32 L12 36 Z" fill="url(#rubyGemGrad)" stroke="#713f12" strokeWidth="0.6" />

          {/* Faíscas Solares e Brilho */}
          <circle cx="50" cy="32" r="3" fill="#fef08a" opacity="0.8" filter="url(#badgeGlow)" />
          <circle cx="46" cy="26" r="0.8" fill="#f97316" />
          <circle cx="46" cy="38" r="0.8" fill="#f97316" />
        </g>
      );

    // 25. SENTINELA ZEN (Fogueira Aconchegante & Lanterna de Coração)
    case 'sentinela_zen':
      return (
        <g id="ach-sentinela-zen">
          {/* Noite Estrelada */}
          <rect x="8" y="8" width="48" height="48" fill="#080c1a" />
          <circle cx="18" cy="18" r="0.8" fill="#ffffff" />
          <circle cx="44" cy="16" r="0.8" fill="#ffffff" />
          <circle cx="36" cy="22" r="0.8" fill="#ffffff" />

          {/* Tronco de Madeira Cruzado e Chamas */}
          {/* Pedras ao Redor do Fogo */}
          <ellipse cx="32" cy="48" rx="14" ry="4" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
          
          {/* Troncos de Lenha */}
          <line x1="22" y1="48" x2="42" y2="44" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="44" x2="42" y2="48" stroke="#58240c" strokeWidth="3" strokeLinecap="round" />

          {/* Fogueira em Chamas Orgânicas Volumétricas */}
          <g filter="url(#badgeSoftShadow)">
            {/* Chama Externa Vermelha */}
            <path d="M32 30 C28 36, 22 42, 26 46 C32 48, 38 46, 38 42 C40 38, 36 34, 32 30 Z" fill="url(#solarFireGrad)" />
            {/* Chama Média Laranja */}
            <path d="M32 33 C29 38, 25 42, 28 45 C32 46, 36 45, 36 42 C37 39, 35 36, 32 33 Z" fill="#f97316" />
            {/* Chama Interna Amarela */}
            <path d="M32 37 C30 41, 28 43, 30 45 C32 46, 34 45, 34 43 C35 41, 34 39, 32 37 Z" fill="#fef08a" filter="url(#badgeGlow)" />
          </g>

          {/* Lanterna de Coração Pendurada */}
          <path d="M42 20 L42 30" stroke="#ca8a04" strokeWidth="0.8" />
          <path d="M42 30 L38 33 C36 31, 38 28, 41 29 L42 30 L43 29 C46 28, 48 31, 46 33 Z" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.6" filter="url(#badgeGlow)" />

          {/* Faíscas Flutuantes Subindo ao Céu */}
          <circle cx="28" cy="26" r="0.8" fill="#fef08a" />
          <circle cx="34" cy="22" r="0.8" fill="#f97316" />
          <circle cx="30" cy="18" r="0.6" fill="#fef08a" />
        </g>
      );

    // 26. MULTIVERSO DAS SIMULAÇÕES (Poção do Buraco de Minhoca / Wormhole)
    case 'multiverso_simulacoes':
      return (
        <g id="ach-multiverso-simulacoes">
          <rect x="8" y="8" width="48" height="48" fill="#080214" />
          <circle cx="32" cy="34" r="22" fill="#c026d3" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Frasco de Alquimia de Vidro / Potion Flutuando */}
          <g filter="url(#badgeSoftShadow)">
            {/* Rolha e Gargalo com Ouro */}
            <rect x="29" y="14" width="6" height="4" rx="1" fill="#78350f" stroke="#ca8a04" strokeWidth="0.8" />
            <path d="M28 18 L36 18 L35 24 L29 24 Z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="0.8" opacity="0.8" />
            <line x1="27" y1="20" x2="37" y2="20" stroke="url(#goldMetalGrad)" strokeWidth="1.2" strokeLinecap="round" />

            {/* Bulbo Esférico de Vidro Reforçado */}
            <circle cx="32" cy="36" r="14" fill="#1e1035" stroke="#f0abfc" strokeWidth="1.5" />
            
            {/* Líquido Cósmico com Espiral Dimensional (Wormhole) */}
            <circle cx="32" cy="36" r="12.5" fill="url(#legendaryBackdrop)" />
            <path d="M32 36 C32 30, 24 32, 26 36 C28 40, 38 40, 38 34 C38 28, 28 28, 28 36 C28 42, 36 42, 36 36" 
                  stroke="url(#celestialCyanGrad)" strokeWidth="1.2" fill="none" strokeLinecap="round" filter="url(#badgeGlow)" />
            <circle cx="32" cy="36" r="2" fill="#ffffff" filter="url(#badgeGlow)" />
          </g>

          {/* Reflexo no Vidro do Frasco */}
          <path d="M22 30 A 12 12 0 0 1 34 24" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
          {/* Bolhas Mágicas Subindo */}
          <circle cx="27" cy="40" r="1" fill="#e0f2fe" />
          <circle cx="37" cy="38" r="1.2" fill="#e0f2fe" />
          <circle cx="31" cy="44" r="0.8" fill="#e0f2fe" />
        </g>
      );

    // 27. VETERANO DE QUESTÕES (Bigorna Forjadora de Ferro & Martelo de Fogo)
    case 'veterano_questoes':
      return (
        <g id="ach-veterano-questoes">
          <rect x="8" y="8" width="48" height="48" fill="#140602" />
          <circle cx="32" cy="34" r="20" fill="#dc2626" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Bigorna de Ferro Lendária em Perspectiva */}
          <g filter="url(#badgeSoftShadow)">
            {/* Base da Bigorna */}
            <path d="M20 50 L44 50 L42 44 L22 44 Z" fill="#334155" stroke="#0f172a" strokeWidth="1" />
            <rect x="24" y="38" width="16" height="6" fill="#475569" stroke="#1e293b" strokeWidth="0.8" />
            {/* Corpo e Chifre da Bigorna */}
            <path d="M14 34 L18 38 L46 38 L50 34 L44 32 L16 32 Z" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1.2" />
          </g>

          {/* Lingote de Aço em Brasa Rubra sobre a Bigorna */}
          <rect x="25" y="30" width="14" height="4" rx="1" fill="url(#solarFireGrad)" stroke="#fef08a" strokeWidth="0.8" filter="url(#badgeGlow)" />

          {/* Martelo de Forja Descendo em Golpe Certeiro */}
          <g transform="rotate(-30 38 20)">
            <rect x="36" y="8" width="4" height="22" rx="1" fill="#78350f" stroke="#ca8a04" strokeWidth="0.8" />
            <rect x="33" y="10" width="10" height="7" rx="1.5" fill="url(#silverMetalGrad)" stroke="#0f172a" strokeWidth="1" />
            <rect x="33" y="11" width="10" height="2" fill="#fef08a" opacity="0.6" />
          </g>

          {/* Chuva de Faíscas Incandescentes */}
          <circle cx="32" cy="28" r="1.5" fill="#ffffff" filter="url(#badgeGlow)" />
          <circle cx="26" cy="24" r="0.9" fill="#fef08a" />
          <circle cx="38" cy="24" r="0.9" fill="#fef08a" />
          <circle cx="22" cy="28" r="0.8" fill="#f97316" />
          <circle cx="42" cy="28" r="0.8" fill="#f97316" />
        </g>
      );

    // 28. ORÁCULO DAS 5 ESTRELAS (Constelação das 5 Estrelas Cadentes)
    case 'oraculo_cinco_estrelas':
      return (
        <g id="ach-oraculo-cinco-estrelas">
          <rect x="8" y="8" width="48" height="48" fill="#04081c" />
          <circle cx="32" cy="32" r="22" fill="#38bdf8" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Caudas de Poeira Estelar das 5 Estrelas */}
          <path d="M14 46 L32 20" stroke="url(#goldMetalGrad)" strokeWidth="0.8" opacity="0.5" strokeDasharray="3 1" />
          <path d="M50 46 L32 20" stroke="url(#goldMetalGrad)" strokeWidth="0.8" opacity="0.5" strokeDasharray="3 1" />
          <path d="M12 28 L48 38" stroke="#38bdf8" strokeWidth="0.6" opacity="0.4" />

          {/* Pentagrama de Conexão Mística */}
          <polygon points="32,16 45,40 18,25 46,25 19,40" fill="none" stroke="#fef08a" strokeWidth="0.6" opacity="0.4" />

          {/* 5 Estrelas Douradas Facetadas com Brilho Diamante */}
          {/* Estrela 1 (Topo Central / Maior) */}
          <g transform="translate(32, 16)" filter="url(#badgeSoftShadow)">
            <path d="M0 -6 L2 -2 L6 0 L2 2 L0 6 L-2 2 L-6 0 L-2 -2 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          </g>

          {/* Estrela 2 (Superior Esquerda) */}
          <g transform="translate(18, 25)" filter="url(#badgeSoftShadow)">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>

          {/* Estrela 3 (Superior Direita) */}
          <g transform="translate(46, 25)" filter="url(#badgeSoftShadow)">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>

          {/* Estrela 4 (Inferior Esquerda) */}
          <g transform="translate(22, 42)" filter="url(#badgeSoftShadow)">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>

          {/* Estrela 5 (Inferior Direita) */}
          <g transform="translate(42, 42)" filter="url(#badgeSoftShadow)">
            <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5 Z" fill="url(#goldBevelGrad)" stroke="#ffffff" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
          </g>
        </g>
      );

    // 29. EXPLORADOR DA MATRIZ (Grimório com Cubo Holográfico 3D)
    case 'explorador_total_matriz':
      return (
        <g id="ach-explorador-matriz">
          <rect x="8" y="8" width="48" height="48" fill="#040b17" />
          <circle cx="32" cy="26" r="20" fill="#0284c7" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Grimório de Couro e Ouro Aberto na Base */}
          <path d="M14 46 C20 44, 28 45, 32 48 C36 45, 44 44, 50 46 L48 38 C44 36, 36 37, 32 40 C28 37, 20 36, 16 38 Z" 
                fill="#78350f" stroke="url(#goldMetalGrad)" strokeWidth="1" />
          <path d="M16 44 C22 42, 28 43, 32 46 C36 43, 42 42, 48 44 L47 39 C43 37, 36 38, 32 41 C28 38, 21 37, 17 39 Z" 
                fill="#fef3c7" />

          {/* Cubo Holográfico da Matriz Flutuando */}
          <g filter="url(#badgeSoftShadow)">
            {/* Face Superior do Cubo */}
            <polygon points="32,15 42,20 32,25 22,20" fill="#38bdf8" fillOpacity="0.4" stroke="#bae6fd" strokeWidth="1" />
            {/* Face Esquerda */}
            <polygon points="22,20 32,25 32,35 22,30" fill="#0284c7" fillOpacity="0.5" stroke="#38bdf8" strokeWidth="1" />
            {/* Face Direita */}
            <polygon points="32,25 42,20 42,30 32,35" fill="#0369a1" fillOpacity="0.6" stroke="#38bdf8" strokeWidth="1" />
            {/* Núcleo Central de Luz */}
            <circle cx="32" cy="25" r="2.5" fill="#ffffff" filter="url(#badgeGlow)" />
          </g>

          {/* Feixes de Projeção da Matriz */}
          <line x1="22" y1="42" x2="22" y2="30" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="2 1" />
          <line x1="42" y1="42" x2="42" y2="30" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="2 1" />
          <line x1="32" y1="44" x2="32" y2="35" stroke="#38bdf8" strokeWidth="0.6" strokeDasharray="2 1" />
        </g>
      );

    // 30. COMBO INICIANTE (Bancada do Artífice com Frascos & Engrenagens)
    case 'combo_iniciante_sentinela':
      return (
        <g id="ach-combo-iniciante">
          <rect x="8" y="8" width="48" height="48" fill="#140f06" />
          <circle cx="32" cy="30" r="20" fill="#ca8a04" opacity="0.2" filter="url(#badgeGlow)" />

          {/* Bancada de Madeira Rústica */}
          <rect x="12" y="44" width="40" height="8" rx="1.5" fill="#78350f" stroke="#451a03" strokeWidth="1" />
          <line x1="12" y1="46" x2="52" y2="46" stroke="#92400e" strokeWidth="0.8" />

          {/* Engrenagem de Latão Dourado de Fundo */}
          <g transform="translate(32, 28)">
            <circle cx="0" cy="0" r="10" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="1" />
            <circle cx="0" cy="0" r="5" fill="#140f06" stroke="#ca8a04" strokeWidth="0.8" />
            {/* Dentes da Engrenagem */}
            <rect x="-2" y="-12" width="4" height="3" fill="#ca8a04" />
            <rect x="-2" y="9" width="4" height="3" fill="#ca8a04" />
            <rect x="-12" y="-2" width="3" height="4" fill="#ca8a04" />
            <rect x="9" y="-2" width="3" height="4" fill="#ca8a04" />
          </g>

          {/* Frasco Vermelho de Poção e Pergaminho com Pena */}
          {/* Frasco Esquerdo */}
          <path d="M20 44 L20 36 C20 34, 22 32, 22 30 L24 30 L24 44 Z" fill="url(#rubyGemGrad)" stroke="#881337" strokeWidth="0.8" />
          <circle cx="22" cy="38" r="3" fill="url(#rubyGemGrad)" />
          {/* Frasco Azul Direito */}
          <path d="M42 44 L42 34 C42 32, 44 30, 44 28 L46 28 L46 44 Z" fill="url(#sapphireGemGrad)" stroke="#082f49" strokeWidth="0.8" />
          
          {/* Faísca Mágica Central */}
          <circle cx="32" cy="28" r="1.5" fill="#ffffff" filter="url(#badgeGlow)" />
        </g>
      );

    // 31. EMPATIA INABALÁVEL (Anjo da Guarda de Mármore & Coração de Rubi)
    case 'empatia_inabalavel':
      return (
        <g id="ach-empatia-inabalavel">
          <rect x="8" y="8" width="48" height="48" fill="#18041c" />
          <circle cx="32" cy="28" r="22" fill="#f43f5e" opacity="0.3" filter="url(#badgeGlow)" />

          {/* Asas Majestosas de Anjo em Mármore Branco */}
          <g filter="url(#badgeSoftShadow)">
            {/* Asa Esquerda */}
            <path d="M30 32 C22 20, 12 16, 10 24 C12 34, 20 40, 28 42 Z" fill="url(#silverMetalGrad)" stroke="#e2e8f0" strokeWidth="0.8" />
            <path d="M14 24 C16 28, 22 32, 28 34" stroke="#94a3b8" strokeWidth="0.6" />
            {/* Asa Direita */}
            <path d="M34 32 C42 20, 52 16, 54 24 C52 34, 44 40, 36 42 Z" fill="url(#silverMetalGrad)" stroke="#e2e8f0" strokeWidth="0.8" />
            <path d="M50 24 C48 28, 42 32, 36 34" stroke="#94a3b8" strokeWidth="0.6" />
          </g>

          {/* Coração de Rubi Sagrado no Centro Acolhedor */}
          <path d="M32 44 L24 34 C20 28, 27 22, 32 27 C37 22, 44 28, 40 34 Z" 
                fill="url(#rubyGemGrad)" stroke="#ffe4e6" strokeWidth="1.2" filter="url(#badgeGlow)" />
          
          {/* Auréola de Ouro no Topo */}
          <ellipse cx="32" cy="17" rx="8" ry="2.5" fill="none" stroke="url(#goldBevelGrad)" strokeWidth="1.5" />
          <circle cx="32" cy="30" r="1.5" fill="#ffffff" />
        </g>
      );

    // 32. MENTE INABALÁVEL (Crânio de Obsidiana com Chamas Azuis Gélidas)
    case 'mente_inabalavel':
      return (
        <g id="ach-mente-inabalavel">
          <rect x="8" y="8" width="48" height="48" fill="#030814" />
          <circle cx="32" cy="32" r="22" fill="#0284c7" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Chamas de Fogo Frio / Gélido Atrás do Crânio */}
          <path d="M22 28 Q18 14 26 12 Q28 20 32 18 Q36 20 38 12 Q46 14 42 28 Z" fill="url(#celestialCyanGrad)" filter="url(#badgeGlow)" opacity="0.8" />

          {/* Crânio de Titânio e Obsidiana */}
          <g filter="url(#badgeSoftShadow)">
            {/* Caixa Craniana */}
            <path d="M20 28 C18 18, 46 18, 44 28 C44 36, 40 44, 32 44 C24 44, 20 36, 20 28 Z" 
                  fill="url(#silverMetalGrad)" stroke="#0f172a" strokeWidth="1.5" />
            {/* Faixa Blindada de Aço na Testa com Rebites */}
            <path d="M20 24 Q32 26 44 24 L44 27 Q32 29 20 27 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="0.8" />
            <circle cx="24" cy="25.5" r="0.8" fill="#38bdf8" />
            <circle cx="32" cy="27" r="0.8" fill="#38bdf8" />
            <circle cx="40" cy="25.5" r="0.8" fill="#38bdf8" />
            
            {/* Cavidades Oculares com Fogo Azul Efervescente */}
            <ellipse cx="26" cy="33" rx="3.5" ry="4" fill="#020617" />
            <circle cx="26" cy="33" r="2" fill="#38bdf8" filter="url(#badgeGlow)" />
            <circle cx="26" cy="33" r="0.8" fill="#ffffff" />

            <ellipse cx="38" cy="33" rx="3.5" ry="4" fill="#020617" />
            <circle cx="38" cy="33" r="2" fill="#38bdf8" filter="url(#badgeGlow)" />
            <circle cx="38" cy="33" r="0.8" fill="#ffffff" />

            {/* Dentes de Metal Blindado */}
            <rect x="28" y="41" width="8" height="4" rx="0.5" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />
            <line x1="30" y1="41" x2="30" y2="45" stroke="#0f172a" strokeWidth="0.6" />
            <line x1="32" y1="41" x2="32" y2="45" stroke="#0f172a" strokeWidth="0.6" />
            <line x1="34" y1="41" x2="34" y2="45" stroke="#0f172a" strokeWidth="0.6" />
          </g>
        </g>
      );

    // 33. ESCUDO DE OURO DA DECISÃO (Escudo Solar em Chamas Douradas)
    case 'escudo_de_ouro_decisao':
      return (
        <g id="ach-escudo-ouro-decisao">
          <rect x="8" y="8" width="48" height="48" fill="#1f1002" />
          <circle cx="32" cy="32" r="22" fill="#f59e0b" opacity="0.3" filter="url(#badgeIntenseGlow)" />

          {/* Raios Solares Flamejantes ao Redor */}
          <path d="M32 10 L35 15 L32 13 L29 15 Z" fill="url(#solarFireGrad)" />
          <path d="M32 54 L35 49 L32 51 L29 49 Z" fill="url(#solarFireGrad)" />
          <path d="M10 32 L15 35 L13 32 L15 29 Z" fill="url(#solarFireGrad)" />
          <path d="M54 32 L49 35 L51 32 L49 29 Z" fill="url(#solarFireGrad)" />

          {/* Corpo do Escudo Solar Redondo de Ouro Puro */}
          <circle cx="32" cy="32" r="18" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="2" filter="url(#badgeSoftShadow)" />
          <circle cx="32" cy="32" r="14" fill="#78350f" stroke="url(#goldBevelGrad)" strokeWidth="1.2" />

          {/* Rosto / Brasão do Sol Sagrado em Alto Relevo */}
          <circle cx="32" cy="32" r="8" fill="url(#goldBevelGrad)" stroke="#713f12" strokeWidth="1" />
          {/* Olhos e Sorriso Sereno do Sol */}
          <path d="M28 30 Q30 28 32 30" stroke="#713f12" strokeWidth="1" fill="none" />
          <path d="M32 30 Q34 28 36 30" stroke="#713f12" strokeWidth="1" fill="none" />
          <path d="M29 34 Q32 37 35 34" stroke="#713f12" strokeWidth="1" fill="none" />

          {/* 4 Rubis Imperiais nos Eixos */}
          <circle cx="32" cy="18" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
          <circle cx="32" cy="46" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
          <circle cx="18" cy="32" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
          <circle cx="46" cy="32" r="1.8" fill="url(#rubyGemGrad)" stroke="#fef08a" strokeWidth="0.5" />
        </g>
      );

    // 34. NÍVEL 5: GUARDIÃO (Insígnia Heráldica Nível 5 & Espadas Cruzadas)
    case 'nivel_cinco_guardiao':
      return (
        <g id="ach-nivel-cinco-guardiao">
          <rect x="8" y="8" width="48" height="48" fill="#041224" />
          <circle cx="32" cy="32" r="22" fill="#0284c7" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Espadas de Cavaleiro Cruzadas de Fundo */}
          <line x1="16" y1="16" x2="48" y2="48" stroke="url(#silverMetalGrad)" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="16" x2="16" y2="48" stroke="url(#silverMetalGrad)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="16" r="2" fill="url(#goldMetalGrad)" />
          <circle cx="48" cy="16" r="2" fill="url(#goldMetalGrad)" />

          {/* Brasão Heráldico de Prata e Azul Cobalto */}
          <path d="M32 14 C44 14, 46 22, 45 34 C44 42, 37 48, 32 50 C27 48, 20 42, 19 34 C18 22, 20 14, 32 14 Z" 
                fill="#0f172a" stroke="url(#silverMetalGrad)" strokeWidth="2" filter="url(#badgeSoftShadow)" />
          <path d="M32 17 C41 17, 42 24, 41 33 C40 39, 35 44, 32 46 C29 44, 24 39, 23 33 C22 24, 23 17, 32 17 Z" 
                fill="#1e3a8a" stroke="#38bdf8" strokeWidth="0.8" />

          {/* Numeral Romano V (Nível 5) em Ouro Maciço */}
          <text x="32" y="36" fontSize="18" fontFamily="serif" fontWeight="900" textAnchor="middle" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" filter="url(#badgeGlow)">
            V
          </text>

          {/* Fita de Cavaleiro Inferior */}
          <path d="M20 48 L24 45 L32 47 L40 45 L44 48 L41 51 L32 49 L23 51 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.6" />
        </g>
      );

    // 35. CONHECEDOR TOTAL DE QUIZZES (Canhão Mecânico Megashark)
    case 'conhecedor_total_quizzes':
      return (
        <g id="ach-conhecedor-quizzes">
          <rect x="8" y="8" width="48" height="48" fill="#140608" />
          <circle cx="32" cy="32" r="22" fill="#ef4444" opacity="0.25" filter="url(#badgeGlow)" />

          {/* Canhão Steampunk Megashark */}
          <g filter="url(#badgeSoftShadow)">
            {/* Corpo do Tubarão Mecânico */}
            <path d="M14 34 C18 24, 38 22, 50 30 C48 36, 42 42, 26 42 L16 38 Z" fill="url(#silverMetalGrad)" stroke="#1e293b" strokeWidth="1.2" />
            {/* Barbatana de Latão Dourado */}
            <path d="M28 24 L36 16 L38 24 Z" fill="url(#goldMetalGrad)" stroke="#713f12" strokeWidth="0.8" />
            {/* Mandíbula e Dentes de Tubarão Mecânico */}
            <polygon points="46,30 48,32 46,34 44,32" fill="#fef08a" />
            <polygon points="42,30 44,32 42,34 40,32" fill="#fef08a" />

            {/* Canos de Metralhadora Gatling na Boca */}
            <rect x="48" y="29" width="6" height="2" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.5" />
            <rect x="48" y="32" width="6" height="2" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.5" />

            {/* Olho Vermelho Laser Cibernético */}
            <circle cx="42" cy="27" r="2.5" fill="url(#rubyGemGrad)" stroke="#ffffff" strokeWidth="0.6" filter="url(#badgeGlow)" />
            
            {/* Manômetro de Pressão a Vapor */}
            <circle cx="26" cy="32" r="3" fill="#fefce8" stroke="url(#goldMetalGrad)" strokeWidth="0.8" />
            <line x1="26" y1="32" x2="27" y2="30" stroke="#dc2626" strokeWidth="0.7" />
          </g>

          {/* Faíscas de Disparo no Cano */}
          <circle cx="54" cy="31" r="2" fill="#fef08a" filter="url(#badgeGlow)" />
        </g>
      );

    // 36. ARQUITETO DO DESTINO (Mesa de Blueprint com Compasso e Esquadro)
    case 'arquiteto_do_destino':
      return (
        <g id="ach-arquiteto-destino">
          <rect x="8" y="8" width="48" height="48" fill="#021424" />
          
          {/* Blueprint com Linhas de Grade Técnicas */}
          <rect x="12" y="12" width="40" height="40" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
          <line x1="12" y1="22" x2="52" y2="22" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="12" y1="32" x2="52" y2="32" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="12" y1="42" x2="52" y2="42" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="22" y1="12" x2="22" y2="52" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="32" y1="12" x2="32" y2="52" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />
          <line x1="42" y1="12" x2="42" y2="52" stroke="#bae6fd" strokeWidth="0.4" opacity="0.5" />

          {/* Desenho Técnico da Geometria Sagrada */}
          <circle cx="32" cy="32" r="12" stroke="#fef08a" strokeWidth="0.8" fill="none" opacity="0.8" />
          <polygon points="32,20 42,37 22,37" stroke="#fef08a" strokeWidth="0.8" fill="none" opacity="0.8" />

          {/* Compasso Artístico de Latão Dourado */}
          <g filter="url(#badgeSoftShadow)">
            {/* Cabeça do Compasso */}
            <circle cx="32" cy="18" r="3" fill="url(#goldBevelGrad)" stroke="#713f12" strokeWidth="0.8" />
            <circle cx="32" cy="18" r="1.2" fill="#ffffff" />
            {/* Haste Esquerda */}
            <line x1="32" y1="18" x2="20" y2="42" stroke="url(#goldMetalGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="20" y1="42" x2="19" y2="44" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
            {/* Haste Direita */}
            <line x1="32" y1="18" x2="44" y2="42" stroke="url(#goldMetalGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="44" y1="42" x2="45" y2="44" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
            {/* Arco Graduado */}
            <path d="M26 30 Q32 33 38 30" stroke="url(#goldMetalGrad)" strokeWidth="1.5" fill="none" />
          </g>

          {/* Ponto de Luz de Medição Precisa */}
          <circle cx="19" cy="44" r="1" fill="#ffffff" filter="url(#badgeGlow)" />
          <circle cx="45" cy="44" r="1" fill="#ffffff" filter="url(#badgeGlow)" />
        </g>
      );

    default:
      return null;
  }
};
