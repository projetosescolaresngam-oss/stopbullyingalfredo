import React from 'react';

/**
 * 4. MOLDURA OURO IMPERIAL 24K (Épico - Nível 5)
 * Regalia Imperial: ouro nobre maciço trabalhado em filigrana barroca,
 * coroa imperial de 5 pontas no topo com rubi real, 4 rubis em corte almofada
 * nos cantos e flor-de-lis com garras leoninas na base.
 */
export const renderGoldFrameBackdrop = () => (
  <g id="frame_ouro_radiante_back">
    <circle cx="32" cy="32" r="23" fill="url(#bgDiscGold)" />
    {/* Resplendor Imperial de Ouro */}
    <circle cx="32" cy="32" r="29" fill="none" stroke="#facc15" strokeWidth="1.2" opacity="0.45" filter="url(#goldGlow)" />
  </g>
);

export const renderGoldFrameForeground = () => (
  <g id="frame_ouro_radiante_front">
    {/* Anel Chanfrado Interno Ouro Escovado */}
    <circle cx="32" cy="32" r="22.2" fill="none" stroke="#451a03" strokeWidth="1.2" />
    <circle cx="32" cy="32" r="23" fill="none" stroke="#fef08a" strokeWidth="1" />

    {/* Aro Principal em Ouro 24K Maciço com Ranhuras Gravadas */}
    <circle cx="32" cy="32" r="26.4" fill="none" stroke="url(#gradGoldImperial)" strokeWidth="5" />
    <circle cx="32" cy="32" r="26.4" fill="none" stroke="#854d0e" strokeWidth="0.8" strokeDasharray="4 2" />

    {/* Borda Externa Chanfrada com Friso de Folhas de Louro */}
    <circle cx="32" cy="32" r="29" fill="none" stroke="#ca8a04" strokeWidth="0.9" />

    {/* Filigrana Barroca de Folhas de Acanto nos 4 Cantos (45°) com Rubis Reais */}
    {/* Canto Superior-Esquerdo */}
    <g transform="translate(10, 10)" filter="url(#frameShadow)">
      {/* Voluta de Folha de Acanto */}
      <path 
        d="M-3 -3 C-5 4 0 6 3 3 C5 1 5 -4 0 -4 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      {/* Rubi Cushion-Cut Facetado */}
      <rect x="-3" y="-3" width="6" height="6" rx="1.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" transform="rotate(45)" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
      {/* 4 Garras de Ouro Imperial */}
      <circle cx="-3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="-3.2" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="3.2" r="0.5" fill="#fef08a" />
    </g>

    {/* Canto Superior-Direito */}
    <g transform="translate(54, 10)" filter="url(#frameShadow)">
      <path 
        d="M3 -3 C5 4 0 6 -3 3 C-5 1 -5 -4 0 -4 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <rect x="-3" y="-3" width="6" height="6" rx="1.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" transform="rotate(45)" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
      <circle cx="-3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="-3.2" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="3.2" r="0.5" fill="#fef08a" />
    </g>

    {/* Canto Inferior-Esquerdo */}
    <g transform="translate(10, 54)" filter="url(#frameShadow)">
      <path 
        d="M-3 3 C-5 -4 0 -6 3 -3 C5 -1 5 4 0 4 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <rect x="-3" y="-3" width="6" height="6" rx="1.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" transform="rotate(45)" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
      <circle cx="-3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="-3.2" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="3.2" r="0.5" fill="#fef08a" />
    </g>

    {/* Canto Inferior-Direito */}
    <g transform="translate(54, 54)" filter="url(#frameShadow)">
      <path 
        d="M3 3 C5 -4 0 -6 -3 -3 C-5 -1 -5 4 0 4 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.6" 
      />
      <rect x="-3" y="-3" width="6" height="6" rx="1.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" transform="rotate(45)" />
      <circle cx="-0.8" cy="-0.8" r="0.6" fill="#ffffff" />
      <circle cx="-3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="3.2" cy="0" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="-3.2" r="0.5" fill="#fef08a" />
      <circle cx="0" cy="3.2" r="0.5" fill="#fef08a" />
    </g>

    {/* Coroa Imperial de 5 Pontas no Topo com Orbe e Rubi Cabochão */}
    <g filter="url(#frameShadow)">
      {/* Faixa Base da Coroa com Pérolas */}
      <rect x="23" y="8" width="18" height="3" rx="1" fill="url(#gradGoldImperial)" stroke="#451a03" strokeWidth="0.7" />
      <circle cx="26" cy="9.5" r="0.7" fill="#ffffff" />
      <circle cx="29" cy="9.5" r="0.7" fill="#ffffff" />
      <circle cx="32" cy="9.5" r="0.7" fill="#ffffff" />
      <circle cx="35" cy="9.5" r="0.7" fill="#ffffff" />
      <circle cx="38" cy="9.5" r="0.7" fill="#ffffff" />

      {/* 5 Pontas com Esferas de Ouro */}
      <polygon 
        points="23,8 24,2.5 27,6.5 32,-1.5 37,6.5 40,2.5 41,8" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.8" 
      />
      {/* Esferas Douradas nas pontas */}
      <circle cx="24" cy="2" r="1.1" fill="#fef08a" stroke="#713f12" strokeWidth="0.4" />
      <circle cx="32" cy="-2" r="1.5" fill="#fef08a" stroke="#713f12" strokeWidth="0.5" />
      <circle cx="40" cy="2" r="1.1" fill="#fef08a" stroke="#713f12" strokeWidth="0.4" />

      {/* Grande Rubi Central na Coroa */}
      <ellipse cx="32" cy="4" rx="2.5" ry="3.2" fill="url(#gemRuby)" stroke="#fef08a" strokeWidth="0.6" />
      <circle cx="31.2" cy="3" r="0.8" fill="#ffffff" />
    </g>

    {/* Flor-de-Lis Imperial com Brasão Real Inferior */}
    <g filter="url(#frameShadow)">
      <path 
        d="M32 64 C30 62 26 59 28 56 C29 55 31 56 32 58 C33 56 35 55 36 56 C38 59 34 62 32 64 Z" 
        fill="url(#gradGoldImperial)" 
        stroke="#451a03" 
        strokeWidth="0.8" 
      />
      <polygon points="32,54 34,57 32,59 30,57" fill="url(#gemRuby)" stroke="#ffffff" strokeWidth="0.4" />
      <circle cx="31.5" cy="56.5" r="0.5" fill="#ffffff" />
    </g>

    {/* Cintilação Real (Estrelas de Ouro no Top-Left e Bottom-Right) */}
    <g transform="translate(19, 8)">
      <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
    </g>
    <g transform="translate(45, 8)">
      <line x1="0" y1="-2.5" x2="0" y2="2.5" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="-2.5" y1="0" x2="2.5" y2="0" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" />
    </g>
  </g>
);

/**
 * 5. MOLDURA NINJAS DO FOGO & TROVÃO (Substitui Moldura Esmeralda da Convivência - Épico Nível 7)
 * Réplica exata 1:1 solicitada pelo usuário:
 * - Naruto Uzumaki no quadrante esquerdo com cabelos loiros espetados, bandana da Folha,
 *   conjurando a esfera de Rasengan luminosa azul ciano envolta em vórtices de chamas da Kurama
 * - Sasuke Uchiha no quadrante direito com olhos Sharingan vermelhos, desembainhando a espada katana
 *   e disparando relâmpagos elétricos azul-celeste de alta voltagem do Chidori
 * - Arco circular superior em laca carmesim com filigrana dourada e arabescos esculpidos
 * - Placa e medalhão heráldico ornamental carmesim com detalhes em ouro na base
 * - Recorte circular 1:1 transparente central para encaixe perfeito do avatar
 * - Sobreposição frontal 100% sólida sobre o ícone do avatar
 */
export const renderEmeraldFrameBackdrop = () => (
  <g id="frame_esmeralda_natureza_back">
    {/* Nicho Escuro Shinobi para o Avatar Central */}
    <circle cx="32" cy="32" r="17.5" fill="#09050d" />
    
    {/* Resplendor e Brilho das Chamas da Raposa (Esquerda) e Trovão Elétrico (Direita) */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#ea580c" strokeWidth="2.0" opacity="0.55" filter="url(#goldGlow)" />
    <circle cx="32" cy="32" r="17.8" fill="none" stroke="#0284c7" strokeWidth="1.2" opacity="0.75" filter="url(#cyanGlow)" />
    
    {/* Halo Quente da Kurama (Esquerda) */}
    <ellipse cx="23" cy="32" rx="9" ry="15" fill="#f97316" opacity="0.22" filter="url(#goldGlow)" />
    
    {/* Halo Eletrostático do Chidori (Direita) */}
    <ellipse cx="41" cy="32" rx="9" ry="15" fill="#38bdf8" opacity="0.22" filter="url(#cyanGlow)" />
  </g>
);

export const renderEmeraldFrameForeground = () => (
  <g id="frame_esmeralda_natureza_front">
    {/* 1. Imagem de Alta Definição da Moldura Exata com Corte Preciso 1:1 (Sobrepõe 100% o Ícone) */}
    <image 
      href="/frame_esmeralda_natureza.png" 
      x="-7" 
      y="-7" 
      width="78" 
      height="78" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Anel Interno Chanfrado de Laca Carmesim e Ouro */}
    <circle cx="32" cy="32" r="17.1" fill="none" stroke="#7f1d1d" strokeWidth="0.8" opacity="0.85" />
    <circle cx="32" cy="32" r="17.4" fill="none" stroke="#eab308" strokeWidth="0.5" opacity="0.9" />
    <circle cx="32" cy="32" r="17.6" fill="none" stroke="#fef08a" strokeWidth="0.25" opacity="0.95" />

    {/* 3. Centelhas Dinâmicas de Energia Ki & Trovão */}
    <g opacity="0.95">
      {/* Centelha de Energia no Rasengan de Naruto (Quadrante Esquerdo) */}
      <g transform="translate(18, 38)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#cyanGlow)" />
        <circle cx="0" cy="0" r="0.45" fill="#38bdf8" />
      </g>

      {/* Centelha de Eletricidade no Chidori de Sasuke (Quadrante Direito) */}
      <g transform="translate(46, 38)">
        <polygon points="0,-2.2 0.5,-0.5 2.2,0 0.5,0.5 0,2.2 -0.5,0.5 -2.2,0 -0.5,-0.5" fill="#ffffff" filter="url(#cyanGlow)" />
        <circle cx="0" cy="0" r="0.45" fill="#e0f2fe" />
      </g>

      {/* Cintilação Dourada no Arco Superior em Laca */}
      <g transform="translate(32, 7)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#fef08a" />
      </g>

      {/* Cintilação no Medalhão Carmesim da Base */}
      <g transform="translate(32, 57)">
        <polygon points="0,-1.6 0.4,-0.4 1.6,0 0.4,0.4 0,1.6 -0.4,0.4 -1.6,0 -0.4,-0.4" fill="#ffffff" filter="url(#goldGlow)" />
        <circle cx="0" cy="0" r="0.3" fill="#fca5a5" />
      </g>
    </g>
  </g>
);

/**
 * 6. MOLDURA GOKU NUVEM VOADORA & ARO MÍSTICO ORIENTAL (Substitui Moldura Safira da Tranquilidade - Nível 9)
 * Réplica idêntica e fiel 1:1 da moldura enviada pelo usuário:
 * - Jovem Goku sorridente montado na Nuvem Voadora Dourada (Kinto'un) empunhando o Bastão Mágico (Nyoibo) no quadrante inferior esquerdo
 * - Aro circular metálico em ouro e bronze com arabescos curvados no topo
 * - Placas de pedra cinzelada esculpidas e entrelaçadas com fitas de laca vermelha reluzente na lateral direita
 * - Nuvens esculpidas em prata com ornamentos de laca carmesim na base
 * - Resplendor e halo dourado/âmbar ao longo do bordo interno do nicho
 * - Recorte circular 1:1 transparente para encaixe perfeito do avatar
 */
export const renderSapphireFrameBackdrop = () => (
  <g id="frame_safira_oceano_back">
    {/* Nicho Escuro Fundo para o Avatar Central */}
    <circle cx="32" cy="32" r="14.5" fill="#0b0914" />
  </g>
);

export const renderSapphireFrameForeground = () => (
  <g id="frame_safira_oceano_front">
    {/* 1. Imagem de Alta Definição da Moldura Exata com Corte Preciso 1:1 (Goku e Moldura 100% Sólidos e Sobrepostos ao Ícone) */}
    <image 
      href="/frame_goku_nimbus.png" 
      x="-7" 
      y="-7" 
      width="78" 
      height="78" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Centelhas Douradas e Cintilações de Energia Ki */}
    <g opacity="0.95">
      {/* Centelha Estelar no Aro Superior Dourado */}
      <g transform="translate(32, 7.5)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#fef08a" />
      </g>

      {/* Centelha Estelar na Nuvem Voadora (Kinto'un) */}
      <g transform="translate(14, 52)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#goldGlow)" />
        <circle cx="0" cy="0" r="0.4" fill="#fde047" />
      </g>

      {/* Centelha no Lacre Vermelho da Base */}
      <g transform="translate(32, 57)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#fca5a5" />
      </g>

      {/* Brilho reluzente na ponta do Bastão Mágico */}
      <circle cx="21" cy="24" r="0.6" fill="#ffffff" filter="url(#subtleGlow)" />
    </g>
  </g>
);

/**
 * 7. MOLDURA GUARDIÕES SHINOBI DAS CHAMAS (Substitui Moldura Matriz Cibernética)
 * Réplica idêntica e fiel da moldura enviada:
 * - Dois ninjas guardiões encapuzados com olhos azuis reluzentes e braços cruzados
 * - Coroa imperial dourada cravejada com rubis e labaredas de fogo flamejante carmesim no topo
 * - Lanças douradas pontiagudas e raios elétricos de alta voltagem
 * - Aro circular dourado com runas antigas esculpidas em alto relevo
 * - Brasão heráldico curvado em fita negra na base com joia de rubi central e fumaça de fogo
 */
export const renderNinjaFlameFrameBackdrop = () => (
  <g id="frame_codigo_secreto_back">
    {/* Nicho de Fundo Escuro Meia-Noite */}
    <circle cx="32" cy="32" r="18.2" fill="#040204" />
    
    {/* Resplendor e Brilho das Chamas Carmesim */}
    <circle cx="32" cy="32" r="18.8" fill="none" stroke="#dc2626" strokeWidth="2.2" opacity="0.6" filter="url(#goldGlow)" />
    <circle cx="32" cy="32" r="18.4" fill="none" stroke="#f97316" strokeWidth="1.2" opacity="0.8" />
    
    {/* Halo de Fogo Superior */}
    <ellipse cx="32" cy="11" rx="14" ry="7" fill="#ef4444" opacity="0.25" filter="url(#subtleGlow)" />
    
    {/* Halo das Brasas Inferior */}
    <ellipse cx="32" cy="53" rx="16" ry="6" fill="#f97316" opacity="0.25" filter="url(#subtleGlow)" />
  </g>
);

export const renderNinjaFlameFrameForeground = () => (
  <g id="frame_codigo_secreto_front">
    {/* Imagem de Alta Resolução 1:1 Exata */}
    <image 
      href="/frame_ninjas_fogo.png" 
      x="-28.39" 
      y="-28.75" 
      width="121.02" 
      height="121.02" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* Anel Bevelado de Encaixe Dourado no Perímetro Interno do Avatar */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#eab308" strokeWidth="1.0" opacity="0.9" />
    <circle cx="32" cy="32" r="18.4" fill="none" stroke="#fef08a" strokeWidth="0.3" opacity="0.95" />

    {/* Glints nos Olhos Azuis dos Ninjas */}
    <g opacity="0.95">
      <circle cx="21.5" cy="27" r="0.65" fill="#38bdf8" filter="url(#cyanGlow)" />
      <circle cx="42.5" cy="27" r="0.65" fill="#38bdf8" filter="url(#cyanGlow)" />
    </g>
  </g>
);

export const renderMatrixFrameBackdrop = renderNinjaFlameFrameBackdrop;
export const renderMatrixFrameForeground = renderNinjaFlameFrameForeground;

/**
 * 8. MOLDURA AURA RADIANTE & TIARA CELESTIAL COM BORBOLETAS (Épico Secreto - Sentinela da Empatia)
 * Réplica idêntica e fiel 1:1 da imagem enviada pelo usuário:
 * - Coroa / tiara barroca em ouro e filigrana no topo com grande gema de opala cintilante e pingente
 * - Babados de renda bordada branca, laços de fita de cetim rosa/lavanda e guirlandas de pérolas
 * - Lua crescente perolada com estrelas e borboleta cristalina iluminada no quadrante superior direito
 * - Pluma iridescente de penas brancas radiantes aninhada entre flores de madrepérola no quadrante inferior direito
 * - Cartela real barroca na base segurando diamante cintilante com pingentes suspensos de lágrimas de cristal e pérolas
 * - Borboleta translúcida mágica adejava na borda interna com partículas prismáticas e centelhas estelares
 */
export const renderEmpathyFrameBackdrop = () => (
  <g id="frame_aura_empatia_secreta_back">
    {/* Nicho Noturno Mágico para o Avatar */}
    <circle cx="32" cy="32" r="18.2" fill="#070a1c" />
    
    {/* Resplendor e Brilho Etéreo Rosa, Ouro & Lavanda */}
    <circle cx="32" cy="32" r="19" fill="none" stroke="#f472b6" strokeWidth="1.8" opacity="0.65" filter="url(#subtleGlow)" />
    <circle cx="32" cy="32" r="18.4" fill="none" stroke="#fde047" strokeWidth="1" opacity="0.7" />
    
    {/* Halo Superior da Tiara e Gema de Opala */}
    <ellipse cx="32" cy="11" rx="15" ry="6" fill="#fbcfe8" opacity="0.3" filter="url(#subtleGlow)" />
    
    {/* Halo Inferior do Medalhão e Pingentes de Cristal */}
    <ellipse cx="32" cy="54" rx="16" ry="6" fill="#fef08a" opacity="0.25" filter="url(#subtleGlow)" />
  </g>
);

export const renderEmpathyFrameForeground = () => (
  <g id="frame_aura_empatia_secreta_front">
    {/* 1. Imagem de Alta Definição da Moldura Exata com Corte Preciso 1:1 */}
    <image 
      href="/frame_aura_tiara.png" 
      x="-6.83" 
      y="-6.83" 
      width="77.66" 
      height="77.66" 
      preserveAspectRatio="xMidYMid meet" 
      filter="url(#frameShadow)"
    />

    {/* 2. Anel Interno Fino de Encaixe Perolado e Ouro */}
    <circle cx="32" cy="32" r="18.2" fill="none" stroke="#fef08a" strokeWidth="0.7" opacity="0.85" />
    <circle cx="32" cy="32" r="18.5" fill="none" stroke="#f472b6" strokeWidth="0.35" opacity="0.9" />

    {/* 3. Centelhas e Estrelas Cintilantes de 4 Pontas (Fidelidade ao Design Original) */}
    <g opacity="0.95">
      {/* Estrela Cintilante no Canto Superior Esquerdo (próximo ao laço) */}
      <g transform="translate(18, 14)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.4" fill="#fbcfe8" />
      </g>
      
      {/* Estrela Cintilante próxima à Lua Crescente Superior Direita */}
      <g transform="translate(48, 14)">
        <polygon points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.4" fill="#fef08a" />
      </g>

      {/* Estrela Cintilante no Pingente Inferior Esquerdo */}
      <g transform="translate(14, 45)">
        <polygon points="0,-1.8 0.4,-0.4 1.8,0 0.4,0.4 0,1.8 -0.4,0.4 -1.8,0 -0.4,-0.4" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.35" fill="#ffffff" />
      </g>

      {/* Estrela no Pêndulo e Pluma Inferior Direita */}
      <g transform="translate(45, 30)">
        <polygon points="0,-2.2 0.5,-0.5 2.2,0 0.5,0.5 0,2.2 -0.5,0.5 -2.2,0 -0.5,-0.5" fill="#ffffff" filter="url(#subtleGlow)" />
        <circle cx="0" cy="0" r="0.45" fill="#e0e7ff" />
      </g>

      {/* Brilho reluzente no centro do Diamante e Opala da Tiara */}
      <circle cx="32" cy="11.5" r="0.75" fill="#ffffff" filter="url(#subtleGlow)" opacity="0.9" />
      <circle cx="32" cy="51" r="0.7" fill="#ffffff" filter="url(#subtleGlow)" opacity="0.9" />
    </g>
  </g>
);
