import { CosmeticItem } from './types';

export const COSMETICS_CATALOG: CosmeticItem[] = [
  // =========================================================================
  // 1. ÍCONES DE AVATAR (category: 'icon') - 20 Itens Únicos e Distintos
  // =========================================================================
  {
    id: 'icon_anonimo_padrao',
    category: 'icon',
    name: 'Satoru Gojo (Stop Supremo)',
    description: 'Avatar 3D de Satoru Gojo com cabelos brancos, venda nos olhos e uniforme Jujutsu High sobre fundo carmesim.',
    rarity: 'comum',
    unlockCondition: { type: 'default', description: 'Item inicial padrão de todo usuário Stop.' },
    previewColor: '#991b1b',
    loreQuote: '"Não se preocupe, afinal de contas, eu sou o mais forte."'
  },
  {
    id: 'icon_escudo_aprendiz',
    category: 'icon',
    name: 'Luffy Gear 5 (Deus do Sol Nika)',
    description: 'Ilustração de Monkey D. Luffy em sua forma Gear 5 com cabelos brancos em nuvem, sorriso alegre e raios azuis.',
    rarity: 'comum',
    unlockCondition: { type: 'level', requiredLevel: 1, description: 'Desbloqueado no Nível 1.' },
    previewColor: '#3b82f6',
    loreQuote: '"Esse é o ápice do que eu posso fazer! Gear 5!"'
  },
  {
    id: 'icon_compass_explorador',
    category: 'icon',
    name: 'Bússola da Empatia',
    description: 'Guia seguro para caminhos de diálogo, escuta ativa e mediação.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 2, description: 'Desbloqueado no Nível 2.' },
    previewColor: '#0ea5e9',
    loreQuote: '"Quando você escuta com o coração, a paz sempre aponta o norte."'
  },
  {
    id: 'icon_estrela_guia',
    category: 'icon',
    name: 'Estrela Polar da Paz',
    description: 'Farol reluzente para momentos de conflito e dúvida ética.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 3, description: 'Desbloqueado no Nível 3.' },
    previewColor: '#facc15',
    loreQuote: '"Mesmo diante de provocações, uma atitude justa ilumina todo o ambiente."'
  },
  {
    id: 'icon_livro_sabedoria',
    category: 'icon',
    name: 'Livro Aberto da Lei',
    description: 'Conhecimento dos direitos escolares e da Lei Anti-Bullying nº 13.185.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 4, description: 'Desbloqueado no Nível 4.' },
    previewColor: '#6366f1',
    loreQuote: '"O saber liberta, protege e constrói cidadãos conscientes."'
  },
  {
    id: 'icon_coracao_empatia',
    category: 'icon',
    name: 'Coração de Ouro Acolhedor',
    description: 'Acolhimento genuíno e afeto ao colega que precisa de apoio.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 5, description: 'Desbloqueado no Nível 5.' },
    previewColor: '#f59e0b',
    loreQuote: '"Empatia é enxergar com os olhos do outro e acolher sem julgar."'
  },
  {
    id: 'icon_trofeu_campeao',
    category: 'icon',
    name: 'Cálice da Convivência',
    description: 'Celebração da harmonia, respeito e união em sala de aula.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 6, description: 'Desbloqueado no Nível 6.' },
    previewColor: '#eab308',
    loreQuote: '"A verdadeira vitória é uma escola onde todos se sentem seguros."'
  },
  {
    id: 'icon_raio_acao',
    category: 'icon',
    name: 'Raio da Atitude Rápida',
    description: 'Agir com firmeza e segurança diante de injustiças nos corredores.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 7, description: 'Desbloqueado no Nível 7.' },
    previewColor: '#38bdf8',
    loreQuote: '"Quem se levanta pela paz quebra o ciclo do silêncio."'
  },
  {
    id: 'icon_chama_coragem',
    category: 'icon',
    name: 'Kakashi Hatake (Sharingan)',
    description: 'Ilustração chibi de Kakashi Hatake com bandana de Konoha, olho Sharingan carmesim desperto, máscara ninja e colete Jonin.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 8, description: 'Desbloqueado no Nível 8.' },
    previewColor: '#10b981',
    loreQuote: '"No mundo ninja, aqueles que quebram as regras são escória, mas aqueles que abandonam seus amigos são piores que escória."'
  },
  {
    id: 'icon_cerebro_sabio',
    category: 'icon',
    name: 'Mente Estrategista',
    description: 'Decisões lúcidas, prudentes e acolhedoras em dilemas éticos.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 9, description: 'Desbloqueado no Nível 9.' },
    previewColor: '#a855f7',
    loreQuote: '"Inteligência emocional é a maior força contra a violência."'
  },
  {
    id: 'icon_diamante_resiliencia',
    category: 'icon',
    name: 'Diamante Inabalável',
    description: 'Resiliência, integridade moral e brilho próprio.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 10, description: 'Desbloqueado no Nível 10.' },
    previewColor: '#06b6d4',
    loreQuote: '"Sob pressão, o caráter ético se torna um diamante."'
  },
  {
    id: 'icon_dragao_mistico',
    category: 'icon',
    name: 'Dragão Guardião da Sabedoria',
    description: 'Força ancestral e proteção aos vulneráveis.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 11, description: 'Desbloqueado no Nível 11.' },
    previewColor: '#dc2626',
    loreQuote: '"Usar a força para proteger, nunca para intimidar."'
  },
  {
    id: 'icon_coroa_sabedoria',
    category: 'icon',
    name: 'Coroa Imperial da Paz',
    description: 'Grande liderança positiva entre os colegas de turma.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 12, description: 'Desbloqueado no Nível 12.' },
    previewColor: '#fbbf24',
    loreQuote: '"Liderar é servir ao bem-estar e à segurança de todos."'
  },
  {
    id: 'icon_lobo_guardiao',
    category: 'icon',
    name: 'Lobo Guardião da Matilha',
    description: 'Proteção coletiva e cuidado fraterno com a turma.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 13, description: 'Desbloqueado no Nível 13.' },
    previewColor: '#64748b',
    loreQuote: '"Nenhum integrante da turma fica desprotegido para trás."'
  },
  {
    id: 'icon_portal_dimensional',
    category: 'icon',
    name: 'Portal da Paz Cósmica',
    description: 'Travessia para uma escola segura, alegre e livre de medo.',
    rarity: 'mitico',
    unlockCondition: { type: 'level', requiredLevel: 14, description: 'Desbloqueado no Nível 14.' },
    previewColor: '#818cf8',
    loreQuote: '"O futuro da educação começa no respeito mútuo diário."'
  },
  {
    id: 'icon_lenda_suprema',
    category: 'icon',
    name: 'Orbe Cósmico Supremo',
    description: 'Patente mítica da cultura de paz e cidadania plena.',
    rarity: 'mitico',
    unlockCondition: { type: 'level', requiredLevel: 15, description: 'Desbloqueado no Nível 15.' },
    previewColor: '#c084fc',
    loreQuote: '"A harmonia coletiva ecoa além dos muros da escola."'
  },
  {
    id: 'icon_fenix_imortal',
    category: 'icon',
    name: 'Fênix da Renovação',
    description: 'Superação de momentos difíceis e renovação da esperança.',
    rarity: 'mitico',
    unlockCondition: { type: 'level', requiredLevel: 16, description: 'Desbloqueado no Nível 16.' },
    previewColor: '#f97316',
    loreQuote: '"Das cinzas do conflito renasce uma cultura de acolhimento."'
  },
  {
    id: 'icon_pomba_paz',
    category: 'icon',
    name: 'Pomba da Fraternidade',
    description: 'Símbolo universal de mediação e apaziguamento de conflitos.',
    rarity: 'epico',
    unlockCondition: { type: 'quiz', quizScorePercent: 100, description: 'Gabaritar 100% no Quiz Educativo.' },
    previewColor: '#e0e7ff',
    loreQuote: '"A paz se constrói com atos diários de gentileza."'
  },
  {
    id: 'icon_zen_lotus',
    category: 'icon',
    name: 'Flor de Lótus Serena',
    description: 'Equilíbrio interior, respiração consciente e autorregulação.',
    rarity: 'epico',
    unlockCondition: { type: 'breathing', description: 'Completar sessões no Espaço Zen (4-7-8).' },
    previewColor: '#ec4899',
    loreQuote: '"Mesmo em águas turbulentas, o lótus floresce com serenidade."'
  },
  {
    id: 'icon_robo_eco',
    category: 'icon',
    name: 'Guardião Mecatrônico Stop',
    description: 'Mascote cibernético que une tecnologia e prevenção ativa.',
    rarity: 'epico',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_combo_conhecimento', description: 'Conquista Secreta: Combo do Conhecimento' },
    previewColor: '#38bdf8',
    loreQuote: '"Algoritmos de empatia programados para proteger os estudantes."'
  },

  // =========================================================================
  // 2. MOLDURAS DE AVATAR (category: 'frame') - Molduras de Alta Definição
  // =========================================================================
  {
    id: 'frame_leao_dourado_supremo',
    category: 'frame',
    name: 'Moldura Imperial Guardiões Celestes',
    description: 'Moldura imperial soberana com duplo aro de neon ciano brilhante, coroa imperial prateada com raios de luz, asas celestiais luminescentes, dois leões guardiões e brasão em fita.',
    rarity: 'mitico',
    unlockCondition: { type: 'default', description: 'Moldura Imperial Soberana Especial.' },
    previewColor: '#00f0ff',
    loreQuote: '"Sob as asas celestiais e a força dos guardiões, a coragem e o respeito reinam na escola."'
  },
  {
    id: 'frame_padrao_madeira',
    category: 'frame',
    name: 'Moldura Clássica de Madeira',
    description: 'Borda neutra e acolhedora com acabamento em carvalho rústico.',
    rarity: 'comum',
    unlockCondition: { type: 'default', description: 'Moldura padrão inicial.' },
    previewColor: '#78350f'
  },
  {
    id: 'frame_bronze_aprendiz',
    category: 'frame',
    name: 'Moldura Hexagonal de Bronze',
    description: 'Chanfro metálico de aprendiz da cultura de paz.',
    rarity: 'comum',
    unlockCondition: { type: 'level', requiredLevel: 1, description: 'Desbloqueada no Nível 1.' },
    previewColor: '#b45309'
  },
  {
    id: 'frame_prata_vigilante',
    category: 'frame',
    name: 'Moldura Prata Espelhada',
    description: 'Brilho prateado polido de guardião Stop vigilante e atento.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 3, description: 'Desbloqueada no Nível 3.' },
    previewColor: '#94a3b8'
  },
  {
    id: 'frame_ouro_radiante',
    category: 'frame',
    name: 'Moldura Ouro Imperial',
    description: 'Acabamento dourado radiante com runas de nobreza e honra.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 5, description: 'Desbloqueada no Nível 5.' },
    previewColor: '#fbbf24'
  },
  {
    id: 'frame_esmeralda_natureza',
    category: 'frame',
    name: 'Moldura Ninjas do Fogo & Trovão',
    description: 'Naruto e Sasuke em confronto lendário: Rasengan com labaredas de Kurama, Chidori com trovões azuis elétricos, espada katana e medalhão oriental carmesim e dourado.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 7, description: 'Desbloqueada no Nível 7.' },
    previewColor: '#ea580c',
    loreQuote: '"O laço inabalável entre o fogo e o trovão forja a verdadeira força, respeito mútuo e a paz."'
  },
  {
    id: 'frame_safira_oceano',
    category: 'frame',
    name: 'Moldura Nuvem Voadora & Aro Místico',
    description: 'Jovem guerreiro montado na lendária Nuvem Voadora com seu Bastão Mágico, emoldurado por aro sagrado em bronze, ouro e laços de laca vermelha.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 9, description: 'Desbloqueada no Nível 9.' },
    previewColor: '#f59e0b',
    loreQuote: '"Com um coração puro e determinação inabalável, qualquer tempestade se transforma em horizonte livre."'
  },
  {
    id: 'frame_ametista_mistica',
    category: 'frame',
    name: 'Moldura Dragão de Gelo & Safiras Ancestrais',
    description: 'Magnífico dragão colossal de gelo em escamas azuis cristalinas, asas com plumas de geada, aro gótico de prata cinzelada e duas safiras reluzentes com flocos de neve mágicos.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 11, description: 'Desbloqueada no Nível 11.' },
    previewColor: '#38bdf8',
    loreQuote: '"O sopro do dragão do norte congela a discórdia e forja a paz eterna com a serenidade do gelo primordial."'
  },
  {
    id: 'frame_rubi_coragem',
    category: 'frame',
    name: 'Moldura Asas de Ouro & Ametista Celestial',
    description: 'Moldura SVGA com asas celestes douradas, brasão com joia ametista, órbitas de neon ciano e anéis cósmicos violeta com estrelas reluzentes.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 13, description: 'Desbloqueada no Nível 13.' },
    previewColor: '#a855f7',
    loreQuote: '"Quem voa sob a égide da amizade e da justiça ilumina os céus mais escuros com seu brilho."'
  },
  {
    id: 'frame_arco_iris_paz',
    category: 'frame',
    name: 'Moldura Prisma da Diversidade',
    description: 'Gradiente multicolorido celebrando a inclusão e o respeito.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 15, description: 'Desbloqueada no Nível 15.' },
    previewColor: '#ec4899'
  },
  {
    id: 'frame_guardiao_cosmico',
    category: 'frame',
    name: 'Moldura Guardião Cósmico Imortal',
    description: 'Estrelas pulsantes e energia dourada da mais alta patente.',
    rarity: 'mitico',
    unlockCondition: { type: 'level', requiredLevel: 20, description: 'Desbloqueada no Nível 20.' },
    previewColor: '#f59e0b'
  },
  {
    id: 'frame_cyber_neon',
    category: 'frame',
    name: 'Moldura Real Leão Dourado',
    description: 'Moldura imperial lendária com cabeça de leão 3D esculpida em ouro maciço, filigranas reais, asas de acanto e gemas ciano celestiais.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 12, description: 'Desbloqueada no Nível 12.' },
    previewColor: '#f59e0b',
    loreQuote: '"A nobreza do verdadeiro líder se revela na firmeza para proteger e na sabedoria para unir."'
  },
  {
    id: 'frame_codigo_secreto',
    category: 'frame',
    name: 'Moldura Guardiões Shinobi das Chamas',
    description: 'Dois ninjas guardiões de olhos azuis brilhantes com coroa de fogo sagrado, lanças douradas, anel rúnico e brasão heráldico com rubi.',
    rarity: 'epico',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_codigo_secreto', description: 'Conquista Secreta: Código Secreto' },
    previewColor: '#ef4444',
    loreQuote: '"Nas sombras vigiamos, no fogo do respeito forjamos a verdadeira união escolar."'
  },
  {
    id: 'frame_aura_empatia_secreta',
    category: 'frame',
    name: 'Moldura Aura Radiante',
    description: 'Tiara real rococó em ouro e filigrana com gema de opala, babados de renda branca, laços de fita pastel, lua crescente perolada, pluma etérea e borboletas cristalinas com pingentes suspensos de pérolas e lágrimas de cristal.',
    rarity: 'epico',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_sentinela_empatia', description: 'Conquista Secreta: Sentinela da Empatia' },
    previewColor: '#fbcfe8',
    loreQuote: '"A delicadeza, a ternura e o acolhimento são a força mais nobre e brilhante que qualquer coração pode irradiar."'
  },

  // =========================================================================
  // 3. DISTINTIVOS FLUTUANTES / EMBLEMAS (category: 'badge') - 7 Emblemas Únicos
  // =========================================================================
  {
    id: 'badge_estrela_bronze',
    category: 'badge',
    name: 'Emblema Estrela de Bronze',
    description: 'Primeira insígnia de reconhecimento ao esforço e respeito.',
    rarity: 'comum',
    unlockCondition: { type: 'level', requiredLevel: 1, description: 'Desbloqueado no Nível 1.' },
    previewColor: '#b45309'
  },
  {
    id: 'badge_escudo_prata',
    category: 'badge',
    name: 'Emblema Escudo de Prata',
    description: 'Reconhecimento à vigilância atenta e postura protetiva.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 3, description: 'Desbloqueado no Nível 3.' },
    previewColor: '#94a3b8'
  },
  {
    id: 'badge_medalha_ouro',
    category: 'badge',
    name: 'Emblema Medalha de Ouro',
    description: 'Honraria escolar por engajamento e excelência cidadã.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 5, description: 'Desbloqueado no Nível 5.' },
    previewColor: '#eab308'
  },
  {
    id: 'badge_coroa_louros',
    category: 'badge',
    name: 'Emblema Coroa de Louros da Paz',
    description: 'Símbolo clássico da vitória da convivência democrática.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 10, description: 'Desbloqueado no Nível 10.' },
    previewColor: '#facc15'
  },
  {
    id: 'badge_asa_celestial',
    category: 'badge',
    name: 'Emblema Asas da Justiça',
    description: 'Alçar voos éticos na defesa dos direitos humanos escolares.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 14, description: 'Desbloqueado no Nível 14.' },
    previewColor: '#38bdf8'
  },
  {
    id: 'badge_detetive_sentinela',
    category: 'badge',
    name: 'Emblema Lupa Dourada do Detetive',
    description: 'Concedido ao investigar a fundo as leis e tipologias.',
    rarity: 'raro',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_detetive_sentinela', description: 'Conquista Secreta: Detetive do Sentinela' },
    previewColor: '#f59e0b'
  },
  {
    id: 'badge_precisao_absoluta',
    category: 'badge',
    name: 'Emblema Alvo Radiante de Precisão',
    description: 'Honraria concedida pela precisão absoluta em quizzes e decisões.',
    rarity: 'lendario',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_precisao_absoluta', description: 'Conquista Secreta: Precisão Absoluta' },
    previewColor: '#ef4444'
  },

  // =========================================================================
  // 4. TÍTULOS HONORÁRIOS (category: 'title') - 8 Títulos Distintos
  // =========================================================================
  {
    id: 'title_sentinela_aprendiz',
    category: 'title',
    name: 'Stop Aprendiz',
    description: 'Título honorário do primeiro passo na jornada de paz.',
    rarity: 'comum',
    unlockCondition: { type: 'level', requiredLevel: 1, description: 'Desbloqueado no Nível 1.' },
    previewColor: '#64748b'
  },
  {
    id: 'title_observador_atento',
    category: 'title',
    name: 'Observador Atento',
    description: 'Título de quem percebe as necessidades dos colegas.',
    rarity: 'comum',
    unlockCondition: { type: 'level', requiredLevel: 2, description: 'Desbloqueado no Nível 2.' },
    previewColor: '#0ea5e9'
  },
  {
    id: 'title_defensor_empatia',
    category: 'title',
    name: 'Defensor da Empatia',
    description: 'Título concedido a quem pratica a escuta acolhedora.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 3, description: 'Desbloqueado no Nível 3.' },
    previewColor: '#10b981'
  },
  {
    id: 'title_mediador_conflitos',
    category: 'title',
    name: 'Mediador de Conflitos',
    description: 'Título para quem constrói pontes onde havia muros.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 5, description: 'Desbloqueado no Nível 5.' },
    previewColor: '#6366f1'
  },
  {
    id: 'title_farol_da_paz',
    category: 'title',
    name: '✦ Farol da Paz ✦',
    description: 'Título luminoso para quem guia a turma em momentos tensos.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 8, description: 'Desbloqueado no Nível 8.' },
    previewColor: '#eab308'
  },
  {
    id: 'title_mente_serena',
    category: 'title',
    name: '✦ Mente Serena ✦',
    description: 'Título de autorregulação e tranquilidade interior.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 12, description: 'Desbloqueado no Nível 12.' },
    previewColor: '#a855f7'
  },
  {
    id: 'title_lorde_guardiao',
    category: 'title',
    name: '⚜ Lorde Guardião ⚜',
    description: 'Título nobre de dedicação exemplar à comunidade escolar.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 16, description: 'Desbloqueado no Nível 16.' },
    previewColor: '#f59e0b'
  },
  {
    id: 'title_guardiao_supremo',
    category: 'title',
    name: '👑 Guardião Supremo Imortal 👑',
    description: 'Título máximo de maestria, coragem e compromisso ético.',
    rarity: 'mitico',
    unlockCondition: { type: 'level', requiredLevel: 20, description: 'Desbloqueado no Nível 20.' },
    previewColor: '#fbbf24'
  },

  // =========================================================================
  // 5. AURA & EFEITOS VISUAIS (category: 'effect') - 6 Efeitos Únicos
  // =========================================================================
  {
    id: 'effect_nenhum',
    category: 'effect',
    name: 'Sem Efeito Visual',
    description: 'Avatar limpo sem auras ou partículas.',
    rarity: 'comum',
    unlockCondition: { type: 'default', description: 'Efeito padrão.' },
    previewColor: '#475569'
  },
  {
    id: 'effect_brilho_dourado',
    category: 'effect',
    name: 'Aura de Centelhas Douradas',
    description: 'Partículas douradas cintilantes orbitando o avatar.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 4, description: 'Desbloqueado no Nível 4.' },
    previewColor: '#facc15'
  },
  {
    id: 'effect_ondas_zen',
    category: 'effect',
    name: 'Ondas de Calma Aquática',
    description: 'Pulso azul circular relaxante em harmonia e serenidade.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 8, description: 'Desbloqueado no Nível 8.' },
    previewColor: '#38bdf8'
  },
  {
    id: 'effect_aurora_boreal',
    category: 'effect',
    name: 'Aurora Boreal Etérea',
    description: 'Névoa mágica fluida em tons verde-esmeralda e violeta.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 14, description: 'Desbloqueado no Nível 14.' },
    previewColor: '#10b981'
  },
  {
    id: 'effect_chama_protetora',
    category: 'effect',
    name: 'Chama Protetora Astral',
    description: 'Labaredas cósmicas azuis e douradas de energia viva.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 18, description: 'Desbloqueado no Nível 18.' },
    previewColor: '#ef4444'
  },
  {
    id: 'effect_mente_atenta_aurora',
    category: 'effect',
    name: 'Efeito Foco Total Aurora',
    description: 'Resplendor concedido pela mente atenta e perspicaz.',
    rarity: 'epico',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_mente_atenta', description: 'Conquista Secreta: Mente Atenta' },
    previewColor: '#8b5cf6'
  }
];
