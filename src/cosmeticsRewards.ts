import { CosmeticItem } from './types';

export const COSMETICS_CATALOG: CosmeticItem[] = [
  // 3.1. ÍCONES DE AVATAR (category: 'icon')
  {
    id: 'icon_anonimo_padrao',
    category: 'icon',
    name: 'Sentinela Guardião Anônimo',
    description: 'O capuz clássico de proteção sigilosa da EEMTI Alfredo Machado.',
    rarity: 'comum',
    unlockCondition: { type: 'default', description: 'Item inicial padrão de todo sentinela.' },
    previewColor: '#3b82f6',
    loreQuote: '"No sigilo encontramos a coragem para transformar nossa escola."'
  },
  {
    id: 'icon_escudo_aprendiz',
    category: 'icon',
    name: 'Escudo de Carvalho',
    description: 'Símbolo de proteção inicial e compromisso com o respeito.',
    rarity: 'comum',
    unlockCondition: { type: 'level', requiredLevel: 1, description: 'Desbloqueado no Nível 1.' },
    previewColor: '#92400e',
    loreQuote: '"As raízes do respeito sustentam toda a comunidade."'
  },
  {
    id: 'icon_compass_explorador',
    category: 'icon',
    name: 'Bússola da Empatia',
    description: 'Guia seguro para caminhos de diálogo e escuta ativa.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 2, description: 'Desbloqueado no Nível 2.' },
    previewColor: '#0ea5e9',
    loreQuote: '"Quando você escuta com o coração, a paz aponta o norte."'
  },
  {
    id: 'icon_estrela_guia',
    category: 'icon',
    name: 'Estrela Polar da Paz',
    description: 'Farol para momentos de conflito e dúvida ética.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 3, description: 'Desbloqueado no Nível 3.' },
    previewColor: '#facc15',
    loreQuote: '"Mesmo na escuridão do preconceito, uma atitude justa ilumina a sala."'
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
    name: 'Coração de Ouro',
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
    description: 'Agir com firmeza e segurança diante de injustiças.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 7, description: 'Desbloqueado no Nível 7.' },
    previewColor: '#38bdf8',
    loreQuote: '"Quem se levanta pela paz quebra o ciclo do silêncio."'
  },
  {
    id: 'icon_chama_coragem',
    category: 'icon',
    name: 'Chama da Proteção',
    description: 'Coragem inabalável para não se calar nem tolerar agressões.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 8, description: 'Desbloqueado no Nível 8.' },
    previewColor: '#ef4444',
    loreQuote: '"A chama da coragem dissipa as sombras do medo."'
  },
  {
    id: 'icon_cerebro_sabio',
    category: 'icon',
    name: 'Mente Estrategista',
    description: 'Decisões lúcidas, prudentes e acolhedoras em dilemas éticos.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 9, description: 'Desbloqueado no Nível 9.' },
    previewColor: '#a855f7',
    loreQuote: '"Inteligência emocional é a maior arma contra a violência."'
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
    id: 'icon_coroa_sabedoria',
    category: 'icon',
    name: 'Coroa Imperial da Paz',
    description: 'Grande liderança positiva entre os colegas de turma.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 12, description: 'Desbloqueado no Nível 12.' },
    previewColor: '#fbbf24',
    loreQuote: '"Liderar é servir ao bem-estar de todos ao seu redor."'
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
    loreQuote: '"Mesmo em águas turbulentas, o lótus floresce puro."'
  },
  {
    id: 'icon_robo_eco',
    category: 'icon',
    name: 'Sentinela Mecatrônico',
    description: 'Mascote robô em pixel art, unindo tecnologia e prevenção.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 3, description: 'Desbloqueado no Nível 3.' },
    previewColor: '#38bdf8',
    loreQuote: '"Algoritmos de empatia programados para proteger."'
  },
  {
    id: 'icon_frango_comico',
    category: 'icon',
    name: 'Frango Protetor da Paz',
    description: 'Mascote cômico de alívio e bom humor nos corredores.',
    rarity: 'comum',
    unlockCondition: { type: 'quiz', description: 'Concluir seu primeiro Quiz educativo.' },
    previewColor: '#f97316',
    loreQuote: '"O riso compartilhado aproxima; a zombaria afasta."'
  },
  {
    id: 'icon_controle_gamer',
    category: 'icon',
    name: 'Gamepad do Pacificador',
    description: 'Para entusiastas de jogos éticos e cooperação online.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 4, description: 'Desbloqueado no Nível 4.' },
    previewColor: '#8b5cf6',
    loreQuote: '"No jogo da vida escolar, todo mundo joga no mesmo time."'
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
    id: 'icon_mago_arcano',
    category: 'icon',
    name: 'Mago da Mediação',
    description: 'Feitiços de apaziguamento, bom senso e diálogo.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 8, description: 'Desbloqueado no Nível 8.' },
    previewColor: '#9333ea',
    loreQuote: '"As palavras certas têm o poder de curar qualquer ferida."'
  },
  {
    id: 'icon_ninja_sentinela',
    category: 'icon',
    name: 'Ninja da Discrição Segura',
    description: 'Ação silenciosa, anônima e protetiva.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 5, description: 'Desbloqueado no Nível 5.' },
    previewColor: '#475569',
    loreQuote: '"Agir nos bastidores para que a justiça prevaleça."'
  },
  {
    id: 'icon_coruja_guerreira',
    category: 'icon',
    name: 'Coruja Sentinela da Verdade',
    description: 'Sabedoria atenta e observação cuidadosa nos corredores.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 7, description: 'Desbloqueado no Nível 7.' },
    previewColor: '#d97706',
    loreQuote: '"Olhos atentos que não se calam diante da injustiça."'
  },
  {
    id: 'icon_oculos_radical',
    category: 'icon',
    name: 'Óculos da Atitude',
    description: 'Estilo pixelado de respeito e postura firme.',
    rarity: 'raro',
    unlockCondition: { type: 'quiz', description: 'Alcançar alta pontuação em quizzes.' },
    previewColor: '#10b981',
    loreQuote: '"Enxergar o mundo com as lentes da inclusão."'
  },
  {
    id: 'icon_sentinela_radical',
    category: 'icon',
    name: 'Sentinela Radical da Atitude',
    description: 'Encarar desafios de convivência com confiança e respeito.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 6, description: 'Desbloqueado no Nível 6.' },
    previewColor: '#f43f5e',
    loreQuote: '"Radical é ser gentil quando o mundo pede pressa."'
  },
  {
    id: 'icon_ciborgue_visor',
    category: 'icon',
    name: 'Visor Cibernético de Justiça',
    description: 'Detecção precoce e sensibilidade contra agressões virtuais.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 10, description: 'Desbloqueado no Nível 10.' },
    previewColor: '#0284c7',
    loreQuote: '"Tecnologia usada como escudo, não como arma."'
  },
  {
    id: 'icon_gato_gamer',
    category: 'icon',
    name: 'Gato Gamer Sentinela',
    description: 'Companheiro felino de estudos, empatia e tranquilidade.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 2, description: 'Desbloqueado no Nível 2.' },
    previewColor: '#f59e0b',
    loreQuote: '"Passos suaves e coração vigilante."'
  },
  {
    id: 'icon_fatia_pizza',
    category: 'icon',
    name: 'Fatia da Fraternidade',
    description: 'Confraternização, partilha e união em grupo.',
    rarity: 'comum',
    unlockCondition: { type: 'default', description: 'Recompensa de integração escolar.' },
    previewColor: '#ea580c',
    loreQuote: '"Dividir bons momentos multiplica a harmonia."'
  },
  {
    id: 'icon_alien_amigavel',
    category: 'icon',
    name: 'Alienígena Diplomata',
    description: 'Respeito irrestrito a todas as diferenças e origens.',
    rarity: 'raro',
    unlockCondition: { type: 'level', requiredLevel: 4, description: 'Desbloqueado no Nível 4.' },
    previewColor: '#22c55e',
    loreQuote: '"Diferenças não nos separam; elas enriquecem nossa escola."'
  },
  {
    id: 'icon_elmo_espartano',
    category: 'icon',
    name: 'Elmo da Coragem Moral',
    description: 'Defesa incondicional dos colegas mais vulneráveis.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 9, description: 'Desbloqueado no Nível 9.' },
    previewColor: '#b91c1c',
    loreQuote: '"A maior bravura é defender quem não pode se defender."'
  },
  {
    id: 'icon_portal_dimensional',
    category: 'icon',
    name: 'Portal da Paz Cósmica',
    description: 'Travessia para uma escola segura, alegre e livre de medo.',
    rarity: 'mitico',
    unlockCondition: { type: 'level', requiredLevel: 14, description: 'Desbloqueado no Nível 14.' },
    previewColor: '#818cf8',
    loreQuote: '"O futuro da educação começa no respeito mútuo."'
  },
  {
    id: 'icon_lobo_guardiao',
    category: 'icon',
    name: 'Lobo Guardião da Matilha',
    description: 'Proteção coletiva e cuidado fraterno com a turma.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 13, description: 'Desbloqueado no Nível 13.' },
    previewColor: '#64748b',
    loreQuote: '"Nenhum integrante da turma fica para trás."'
  },
  {
    id: 'icon_aguia_soberana',
    category: 'icon',
    name: 'Águia Soberana dos Ares',
    description: 'Visão ampla, discernimento e liderança pacífica.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 10, description: 'Desbloqueado no Nível 10.' },
    previewColor: '#eab308',
    loreQuote: '"Voar alto para enxergar soluções onde outros veem atrito."'
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
    id: 'icon_raio_sabedoria',
    category: 'icon',
    name: 'Raio Cósmico da Sabedoria',
    description: 'Insígnia secreta desvendada pelo Combo do Conhecimento.',
    rarity: 'epico',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_combo_conhecimento', description: 'Conquista Secreta: Combo do Conhecimento' },
    previewColor: '#38bdf8',
    loreQuote: '"Conhecer as leis e agir com empatia é a chave da sabedoria."'
  },
  {
    id: 'icon_bussola_astral',
    category: 'icon',
    name: 'Bússola Astral do Explorador',
    description: 'Concedida aos sentinelas que exploram todas as áreas da plataforma.',
    rarity: 'raro',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_explorador_noturno_areas', description: 'Conquista Secreta: Explorador Oculto' },
    previewColor: '#a78bfa',
    loreQuote: '"Quem explora todos os recantos do saber nunca se perde."'
  },

  // 3.2. MOLDURAS DE AVATAR (category: 'frame')
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
    description: 'Brilho prateado polido de sentinela vigilante e atento.',
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
    name: 'Moldura Esmeralda da Convivência',
    description: 'Cristais verdes luminosos simbolizando renovação e acolhimento.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 7, description: 'Desbloqueada no Nível 7.' },
    previewColor: '#10b981'
  },
  {
    id: 'frame_safira_oceano',
    category: 'frame',
    name: 'Moldura Safira da Tranquilidade',
    description: 'Cristais azuis profundos emanando serenidade e foco.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 9, description: 'Desbloqueada no Nível 9.' },
    previewColor: '#2563eb'
  },
  {
    id: 'frame_ametista_mistica',
    category: 'frame',
    name: 'Moldura Ametista da Sabedoria',
    description: 'Joias púrpuras lapidadas com pulso suave de energia.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 11, description: 'Desbloqueada no Nível 11.' },
    previewColor: '#9333ea'
  },
  {
    id: 'frame_rubi_coragem',
    category: 'frame',
    name: 'Moldura Rubi Flamejante',
    description: 'Contornos escarlates simbolizando a coragem inabalável.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 13, description: 'Desbloqueada no Nível 13.' },
    previewColor: '#e11d48'
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
    name: 'Moldura Cyberpunk Neon',
    description: 'Linhas de circuito futuristas em ciano e magenta brilhante.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 12, description: 'Desbloqueada no Nível 12.' },
    previewColor: '#06b6d4'
  },
  {
    id: 'frame_codigo_secreto',
    category: 'frame',
    name: 'Moldura Matriz Cibernética',
    description: 'Moldura misteriosa obtida após decodificar o Código Secreto.',
    rarity: 'epico',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_codigo_secreto', description: 'Conquista Secreta: Código Secreto' },
    previewColor: '#10b981'
  },
  {
    id: 'frame_aura_empatia_secreta',
    category: 'frame',
    name: 'Moldura Aura Radiante de Empatia',
    description: 'Borda suave rosa-violeta que envolve o avatar com calor humano.',
    rarity: 'epico',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_sentinela_empatia', description: 'Conquista Secreta: Sentinela da Empatia' },
    previewColor: '#f43f5e'
  },

  // 3.3. DISTINTIVOS FLUTUANTES / EMBLEMAS (category: 'badge')
  {
    id: 'badge_estrela_bronze',
    category: 'badge',
    name: 'Emblema Estrela de Bronze',
    description: 'Primeira insígnia de reconhecimento ao esforço.',
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
    description: 'Alçar voos éticos na defesa dos direitos humanos.',
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

  // 3.4. TÍTULOS HONORÁRIOS (category: 'title')
  {
    id: 'title_sentinela_aprendiz',
    category: 'title',
    name: 'Sentinela Aprendiz',
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
    unlockCondition: { type: 'level', requiredLevel: 4, description: 'Desbloqueado no Nível 4.' },
    previewColor: '#6366f1'
  },
  {
    id: 'title_farol_da_paz',
    category: 'title',
    name: '✦ Farol da Paz ✦',
    description: 'Título luminoso para quem guia a turma em momentos tensos.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 7, description: 'Desbloqueado no Nível 7.' },
    previewColor: '#eab308'
  },
  {
    id: 'title_mente_serena',
    category: 'title',
    name: '✦ Mente Serena ✦',
    description: 'Título de autorregulação e tranquilidade interior.',
    rarity: 'epico',
    unlockCondition: { type: 'level', requiredLevel: 11, description: 'Desbloqueado no Nível 11.' },
    previewColor: '#a855f7'
  },
  {
    id: 'title_lorde_guardiao',
    category: 'title',
    name: '⚜ Lorde Guardião ⚜',
    description: 'Título nobre de dedicação exemplar à comunidade escolar.',
    rarity: 'lendario',
    unlockCondition: { type: 'level', requiredLevel: 15, description: 'Desbloqueado no Nível 15.' },
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
  {
    id: 'title_lenda_oculta',
    category: 'title',
    name: '✦ Lenda Oculta dos Corredores ✦',
    description: 'Título mítico obtido ao desvendar a Lenda Oculta.',
    rarity: 'mitico',
    isSecret: true,
    unlockCondition: { type: 'achievement', achievementId: 'secret_lenda_oculta', description: 'Conquista Secreta: Lenda Oculta' },
    previewColor: '#ec4899'
  },

  // 3.5. AURA & EFEITOS VISUAIS (category: 'effect')
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
    unlockCondition: { type: 'level', requiredLevel: 6, description: 'Desbloqueado no Nível 6.' },
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
    unlockCondition: { type: 'level', requiredLevel: 17, description: 'Desbloqueado no Nível 17.' },
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
