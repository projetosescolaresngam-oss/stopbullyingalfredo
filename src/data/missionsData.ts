import { MissionDefinition } from '../types';

export const MISSIONS_CATALOG: MissionDefinition[] = [
  // =========================================================================
  // 1. MISSÕES VISÍVEIS DE EXPLORAÇÃO & INTRODUÇÃO
  // =========================================================================
  {
    id: 'mis_primeiro_passo',
    code: 'MIS-001',
    title: 'O Primeiro Passo',
    subtitle: 'Reconhecimento do Território Ético',
    description: 'Navegue e explore 3 áreas educativas e de proteção do STOPBULLYING.',
    loreQuote: '"Toda grande mudança começa quando decidimos não fechar os olhos."',
    category: 'exploracao',
    difficulty: 'facil',
    isSecret: false,
    icon: '🧭',
    trigger: {
      type: 'visit_area',
      count: 3
    },
    hints: [
      {
        level: 1,
        title: 'Pista Conceitual',
        hintText: 'A plataforma possui diversas frentes: leis, quizzes, apoio emocional e denúncias.',
        penaltyPercent: 0
      },
      {
        level: 2,
        title: 'Pista Direcionada',
        hintText: 'Visite a aba "Quiz de Respeito", o "Guia do Site" e a "Matriz Educativa".',
        penaltyPercent: 15
      },
      {
        level: 3,
        title: 'Pista de Localização',
        hintText: 'Use o menu de navegação no topo para acessar 3 páginas diferentes.',
        penaltyPercent: 30
      }
    ],
    reward: {
      baseXp: 50,
      titleBadge: 'Explorador da Convivência'
    }
  },
  {
    id: 'mis_mapa_convivencia',
    code: 'MIS-002',
    title: 'Matriz da Convivência',
    subtitle: 'Compreensão Profunda das Tipologias',
    description: 'Investigue os 5 tipos de bullying catalogados na Matriz Educativa (Verbal, Físico, Psicológico, Cyberbullying e Social).',
    loreQuote: '"Dar o nome correto à agressão é o primeiro passo para cessar a violência."',
    category: 'conhecimento',
    difficulty: 'moderada',
    isSecret: false,
    icon: '📚',
    trigger: {
      type: 'explore_all_types',
      count: 5
    },
    hints: [
      {
        level: 1,
        title: 'Pista Conceitual',
        hintText: 'O bullying se manifesta de formas sutis além do confronto físico.',
        penaltyPercent: 0
      },
      {
        level: 2,
        title: 'Pista Direcionada',
        hintText: 'Abra a seção "Matriz Educativa" e clique em cada um dos cards de tipologia.',
        penaltyPercent: 15
      },
      {
        level: 3,
        title: 'Pista de Localização',
        hintText: 'Na Matriz Educativa, examine os 5 tipos para registrar a análise completa.',
        penaltyPercent: 30
      }
    ],
    reward: {
      baseXp: 75,
      achievementId: 'detetive_todas_tipologias'
    }
  },
  {
    id: 'mis_sabedoria_juridica',
    code: 'MIS-003',
    title: 'O Escudo da Lei',
    subtitle: 'Legislação Federal Anti-Bullying',
    description: 'Consulte os artigos fundamentais da Lei Federal nº 13.185/2015 no Guia do Respeito.',
    loreQuote: '"A lei não existe apenas para punir, mas para proteger o direito sagrado de aprender em paz."',
    category: 'conhecimento',
    difficulty: 'moderada',
    isSecret: false,
    icon: '⚖️',
    trigger: {
      type: 'use_feature',
      target: 'leis'
    },
    hints: [
      {
        level: 1,
        title: 'Pista Conceitual',
        hintText: 'A escola conta com amparo legal específico para prevenção do assédio moral.',
        penaltyPercent: 0
      },
      {
        level: 2,
        title: 'Pista Direcionada',
        hintText: 'No Guia do Respeito, explore a aba dedicada à Lei Federal 13.185.',
        penaltyPercent: 15
      },
      {
        level: 3,
        title: 'Pista de Localização',
        hintText: 'Abra o Guia do Site e clique na seção "Marco Legal & Legislação".',
        penaltyPercent: 30
      }
    ],
    reward: {
      baseXp: 60,
      titleBadge: 'Cidadão Consciente'
    }
  },
  {
    id: 'mis_calma_respiracao',
    code: 'MIS-004',
    title: 'Pausa Tática & Respiração',
    subtitle: 'Equilíbrio Emocional em Momentos Tensos',
    description: 'Pratique um ciclo guiado de respiração consciente 4-4-4 na aba de Apoio Emocional.',
    loreQuote: '"A serenidade desarma qualquer impulso de hostilidade."',
    category: 'exploracao',
    difficulty: 'facil',
    isSecret: false,
    icon: '🧘',
    trigger: {
      type: 'breathing_session',
      count: 1
    },
    hints: [
      {
        level: 1,
        title: 'Pista Conceitual',
        hintText: 'A mente calma toma decisões éticas melhores.',
        penaltyPercent: 0
      },
      {
        level: 2,
        title: 'Pista Direcionada',
        hintText: 'Acesse o "Apoio Emocional" e inicie o guia de respiração diafragmática.',
        penaltyPercent: 10
      },
      {
        level: 3,
        title: 'Pista de Localização',
        hintText: 'No menu central, clique em "Apoio Emocional" e complete 1 ciclo respiratório.',
        penaltyPercent: 25
      }
    ],
    reward: {
      baseXp: 40,
      achievementId: 'zen_primeira_respiracao'
    }
  },

  // =========================================================================
  // 2. MISSÕES DE DECISÃO ÉTICA FORMATIVA
  // =========================================================================
  {
    id: 'dec_isolamento_recreio',
    code: 'DEC-001',
    title: 'Pense Antes de Agir: O Banco do Recreio',
    subtitle: 'Dilema de Exclusão & Solidariedade Ativa',
    description: 'Avalie a situação real de um estudante sistematicamente excluído das conversas e tome uma decisão restaurativa.',
    loreQuote: '"O silêncio de quem assiste fere tanto quanto as palavras do agressor."',
    category: 'decisao',
    difficulty: 'moderada',
    isSecret: false,
    icon: '🧠',
    trigger: {
      type: 'solve_decision',
      target: 'dec_isolamento_recreio'
    },
    hints: [
      {
        level: 1,
        title: 'Princípio Geral',
        hintText: 'Acolher a vítima individualmente é mais eficaz do que gerar confronto em público.',
        penaltyPercent: 0
      },
      {
        level: 2,
        title: 'Foco Restaurativo',
        hintText: 'Evite expor o colega ou criar uma briga generalizada no pátio.',
        penaltyPercent: 15
      },
      {
        level: 3,
        title: 'Ação Recomendada',
        hintText: 'Abordar o colega com naturalidade, convidá-lo para a conversa e sinalizar a coordenação se for sistemático.',
        penaltyPercent: 35
      }
    ],
    decision: {
      context: 'Durante o recreio no pátio da EEMTI Alfredo Machado, você nota que sempre que Marcos tenta se sentar na mesa de um determinado grupo, os outros se levantam silenciosamente e mudam de lugar, rindo de costas.',
      question: 'Diante dessa prática contínua de exclusão social e isolamento deliberado, qual postura você assume?',
      options: [
        {
          id: 'opt_acolher',
          text: 'Aproximar-se de Marcos com simpatia, convidá-lo para lanchar junto e, no momento adequado, avisar discretamente à mediação escolar.',
          isOptimal: true,
          feedbackTitle: 'Solidariedade Proativa & Proteção Sigilosa',
          feedbackExplanation: 'Você rompeu o isolamento imediatamente sem expor Marcos a mais constrangimento público, demonstrando que ele não está sozinho e garantindo suporte da coordenação.',
          impactAnalysis: 'Estudos demonstram que quando pelo menos 1 colega apoia a vítima, a sensação de desesperança cai em mais de 70%.',
          ethicalPrinciple: 'Princípio da Inclusão Solidária e Proteção não-violenta (Art. 4º da Lei 13.185/15).'
        },
        {
          id: 'opt_confrontar',
          text: 'Gritar com o grupo no meio do pátio, acusando-os de covardes na frente de todos.',
          isOptimal: false,
          feedbackTitle: 'Reação Impulsiva com Risco de Escalada',
          feedbackExplanation: 'Embora sua indignação seja justa, o confronto agressivo em público geralmente aumenta a hostilidade contra Marcos no retorno às aulas e cria um clima de vingança.',
          impactAnalysis: 'Confrontos inflamados tendem a transformar desavenças em violência física ou retaliação em redes sociais.',
          ethicalPrinciple: 'Justiça não se faz com hostilidade: deve-se primar pela desescalada e diálogo.'
        },
        {
          id: 'opt_ignorar',
          text: 'Não se intrometer, pois você não tem intimidade com Marcos e teme ser o próximo alvo do grupo.',
          isOptimal: false,
          feedbackTitle: 'Omissão Conivente',
          feedbackExplanation: 'O espectador passivo é a engrenagem que permite que o bullying continue. Ao fingir que não vê, os agressores sentem que o ambiente aprova a atitude deles.',
          impactAnalysis: 'O isolamento prolongado provoca queda no rendimento escolar, crises de ansiedade e fobia ao ambiente escolar.',
          ethicalPrinciple: 'Dever de Fraternidade Escolar: não agir diante de injustiça evidente perpetua a dor alheia.'
        }
      ]
    },
    reward: {
      baseXp: 80,
      titleBadge: 'Mediador Empático'
    }
  },
  {
    id: 'dec_grupo_whatsapp',
    code: 'DEC-002',
    title: 'Pense Antes de Agir: O Meme no Grupo',
    subtitle: 'Cyberbullying, Compartilhamento & Dignidade',
    description: 'Um meme depreciativo com a foto de uma colega da sala é postado no grupo de estudos da turma.',
    loreQuote: '"A internet não é terra sem lei: compartilhar difamação é ser cúmplice do dano."',
    category: 'decisao',
    difficulty: 'dificil',
    isSecret: false,
    icon: '📱',
    trigger: {
      type: 'solve_decision',
      target: 'dec_grupo_whatsapp'
    },
    hints: [
      {
        level: 1,
        title: 'Princípio Digital',
        hintText: 'O rastro digital de mensagens ofensivas constitui prova de ato infracional.',
        penaltyPercent: 0
      },
      {
        level: 2,
        title: 'Não Propagação',
        hintText: 'Nunca encaminhe ou comente emojis de risada em postagens vexatórias.',
        penaltyPercent: 15
      },
      {
        level: 3,
        title: 'Ação Cívica',
        hintText: 'Registrar print com data/hora, repreender com firmeza no grupo e encaminhar ao canal de denúncia.',
        penaltyPercent: 35
      }
    ],
    decision: {
      context: 'Às 21h, um colega envia no grupo de WhatsApp da turma uma foto distorcida de Camila com dizeres ofensivos sobre sua aparência, incitando piadas com figurinhas.',
      question: 'Qual é o procedimento ético e cidadão que estanca o cyberbullying de imediato?',
      options: [
        {
          id: 'opt_interromper_denunciar',
          text: 'Fazer o print da tela com o número do remetente, manifestar no grupo que aquilo é cyberbullying inaceitável e enviar o relato pelo canal de Denúncia do STOPBULLYING.',
          isOptimal: true,
          feedbackTitle: 'Preservação de Prova & Interrupção Imediata',
          feedbackExplanation: 'Você cortou o efeito de plateia dos agressores, protegeu Camila da viralização e gerou elementos para que a escola e as famílias atuem com rigor pedagógico.',
          impactAnalysis: 'Denúncias com prints nítidos agilizam o acolhimento institucional e cessam a difamação em menos de 24 horas.',
          ethicalPrinciple: 'Responsabilidade Digital e Proteção à Honra (Marco Civil da Internet e Lei 13.185/15).'
        },
        {
          id: 'opt_rir_privado',
          text: 'Rir no grupo com figurinhas e depois mandar mensagem no privado de Camila pedindo desculpas.',
          isOptimal: false,
          feedbackTitle: 'Falsidade Ética e Fortalecimento do Agressor',
          feedbackExplanation: 'Rir no grupo valida socialmente o agressor na frente de todos. Uma desculpa no privado não apaga a humilhação pública que você ajudou a consolidar.',
          impactAnalysis: 'A validação pública do deboche amplifica o trauma da vítima e encoraja novas agressões.',
          ethicalPrinciple: 'Coerência Moral: respeito não pode ser seletivo ou medroso.'
        },
        {
          id: 'opt_sair_do_grupo',
          text: 'Apenas sair do grupo silenciosamente para não se envolver em confusão.',
          isOptimal: false,
          feedbackTitle: 'Abandono sem Intervenção',
          feedbackExplanation: 'Sair do grupo protege apenas a sua tranquilidade imediata, mas deixa Camila indefesa diante da ridicularização de dezenas de colegas.',
          impactAnalysis: 'Sem que ninguém se manifeste contra, os autores acreditam que a turma inteira concordou com a ofensa.',
          ethicalPrinciple: 'Solidariedade Ativa: quem tem voz deve usá-la em defesa de quem está sendo silenciado.'
        }
      ]
    },
    reward: {
      baseXp: 90,
      achievementId: 'escudo_anticyber'
    }
  },

  // =========================================================================
  // 3. MISSÕES SECRETAS COM PISTAS PROGRESSIVAS & REVELAÇÃO
  // =========================================================================
  {
    id: 'sec_olhos_atentos',
    code: 'SEC-001',
    title: '????',
    subtitle: 'Há algo oculto nas páginas do conhecimento',
    description: 'Nem tudo o que importa está em primeiro plano. Um símbolo do Sentinela foi gravado discretamente no ecossistema do aplicativo.',
    loreQuote: '"Aquele que observa com atenção descobre a verdade antes que a palavra seja dita."',
    category: 'secreta',
    difficulty: 'secreta',
    isSecret: true,
    icon: '👁️',
    trigger: {
      type: 'discover_secret',
      target: 'olhos_atentos_simbolo'
    },
    hints: [
      {
        level: 1,
        title: 'Pista 1: O Ponto de Partida',
        hintText: 'Procure onde o aprendizado sobre o site e a convivência escolar é apresentado em detalhes.',
        penaltyPercent: 15
      },
      {
        level: 2,
        title: 'Pista 2: O Espaço da Sabedoria',
        hintText: 'A resposta repousa no "Guia do Site & Convivência", em uma área dedicada a combinados ou rodapé.',
        penaltyPercent: 35
      },
      {
        level: 3,
        title: 'Pista 3: O Detalhe Interativo',
        hintText: 'No rodapé do "Guia do Site", procure pelo brasão discreto com a chancela do Sentinela e clique nele.',
        penaltyPercent: 55
      }
    ],
    secretClueLocation: 'Guia do Site -> Rodapé Pedagógico -> Selo Secreto',
    reward: {
      baseXp: 100,
      cosmeticId: 'icon_observador_astuto',
      cosmeticName: 'Ícone: Observador Astuto',
      cosmeticType: 'icon',
      achievementId: 'detetive_olhos_atentos',
      specialNote: 'Descoberto nas sombras do Guia de Convivência.'
    }
  },
  {
    id: 'sec_codigo_fundacao',
    code: 'SEC-002',
    title: '????',
    subtitle: 'A Senha dos Fundamentos Escolares',
    description: 'Uma cifra matemática guarda as chaves da mediação. Identifique o ano do marco legal e decodifique-o na Central.',
    loreQuote: '"As raízes da nossa proteção foram fixadas no tempo por leis e pessoas comprometidas."',
    category: 'secreta',
    difficulty: 'dificil',
    isSecret: true,
    icon: '🔐',
    trigger: {
      type: 'enter_code',
      target: '13185'
    },
    hints: [
      {
        level: 1,
        title: 'Pista 1: O Número Protetor',
        hintText: 'O número chave é a própria numeração da Lei Federal de Combate ao Bullying no Brasil.',
        penaltyPercent: 15
      },
      {
        level: 2,
        title: 'Pista 2: Cinco Dígitos',
        hintText: 'O código é composto por 5 algarismos que identificam a Lei sancionada em 2015.',
        penaltyPercent: 35
      },
      {
        level: 3,
        title: 'Pista 3: A Cifra Exata',
        hintText: 'A Lei Federal é a 13.185. Insira "13185" no decodificador de chaves da Central de Missões.',
        penaltyPercent: 55
      }
    ],
    secretCode: '13185',
    reward: {
      baseXp: 120,
      cosmeticId: 'badge_emblema_protetor',
      cosmeticName: 'Emblema do Protetor',
      cosmeticType: 'badge',
      specialNote: 'Desbloqueado com a chave mestra da Lei Federal 13.185.'
    }
  },
  {
    id: 'sec_camuflagem_fantasma',
    code: 'SEC-003',
    title: '????',
    subtitle: 'Operação Fantasma & Segurança Imediata',
    description: 'Descubra e ative o mecanismo secreto de camuflagem rápida para momentos de constrangimento ou perigo.',
    loreQuote: '"Saber se proteger discretamente é uma habilidade fundamental de sobrevivência."',
    category: 'secreta',
    difficulty: 'moderada',
    isSecret: true,
    icon: '👻',
    trigger: {
      type: 'use_feature',
      target: 'camuflagem_pacman'
    },
    hints: [
      {
        level: 1,
        title: 'Pista 1: A Saída Rápida',
        hintText: 'Existe um recurso para disfarçar o que você está lendo se alguém se aproximar por trás.',
        penaltyPercent: 15
      },
      {
        level: 2,
        title: 'Pista 2: O Jogo do Labirinto',
        hintText: 'Na página inicial ou no Guia, procure o botão de "Camuflagem Rápida" que abre um mini-jogo clássico.',
        penaltyPercent: 35
      },
      {
        level: 3,
        title: 'Pista 3: Ativação Direta',
        hintText: 'No card superior da Home, clique em "Disfarce / Camuflagem" para ativar a tela do Pac-Man.',
        penaltyPercent: 50
      }
    ],
    reward: {
      baseXp: 85,
      achievementId: 'detetive_camuflagem'
    }
  },
  {
    id: 'sec_precisao_absoluta',
    code: 'SEC-004',
    title: '????',
    subtitle: 'Rigor de Julgamento & Precisão',
    description: 'Alcance 100% de aproveitamento em qualquer um dos desafios da Central de Respeito sem errar nenhuma alternativa.',
    loreQuote: '"A clareza moral não deixa margem para a dúvida."',
    category: 'conhecimento',
    difficulty: 'muito_dificil',
    isSecret: true,
    icon: '🎯',
    trigger: {
      type: 'perfect_quiz',
      count: 1
    },
    hints: [
      {
        level: 1,
        title: 'Pista 1: Foco Pedagógico',
        hintText: 'Uma mente focada não se deixa enganar por justificativas fáceis.',
        penaltyPercent: 15
      },
      {
        level: 2,
        title: 'Pista 2: Central de Respeito',
        hintText: 'Escolha qualquer desafio na aba "Quiz de Respeito" e leia com rigor as 4 alternativas.',
        penaltyPercent: 30
      },
      {
        level: 3,
        title: 'Pista 3: Gabarito Limpo',
        hintText: 'Acerte todas as questões de um desafio para obter a pontuação máxima de 100%.',
        penaltyPercent: 50
      }
    ],
    reward: {
      baseXp: 140,
      achievementId: 'sabedoria_gabarito_perfeito',
      titleBadge: 'Precisão Inabalável'
    }
  },

  // =========================================================================
  // 4. MISSÕES EM CADEIA: OS ARQUIVOS DO SENTINELA (SEQUENCIAL)
  // =========================================================================
  {
    id: 'chain_arq_01',
    code: 'CHAIN-01',
    title: 'Arquivo 01 — O Primeiro Sinal',
    subtitle: 'Cadeia: Os Arquivos do Sentinela (1/4)',
    description: 'Inicie a trilha investigativa visitando o Mural de Fotos e Ações Coletivas da EEMTI Alfredo Machado.',
    loreQuote: '"A história da nossa comunidade escolar é tecida por cada gesto de união."',
    category: 'cadeia',
    difficulty: 'facil',
    isSecret: false,
    chainId: 'arquivos_sentinela',
    chainOrder: 1,
    chainName: 'Os Arquivos do Sentinela',
    icon: '📁',
    trigger: {
      type: 'visit_area',
      target: 'galeria'
    },
    hints: [
      {
        level: 1,
        title: 'Pista da Etapa 1',
        hintText: 'Onde as memórias fotográficas dos projetos escolares ficam registradas?',
        penaltyPercent: 10
      },
      {
        level: 2,
        title: 'Localização Direta',
        hintText: 'Abra a aba "Fotos do Projeto" no menu da plataforma.',
        penaltyPercent: 25
      }
    ],
    reward: {
      baseXp: 50
    }
  },
  {
    id: 'chain_arq_02',
    code: 'CHAIN-02',
    title: 'Arquivo 02 — A Pista dos Corredores',
    subtitle: 'Cadeia: Os Arquivos do Sentinela (2/4)',
    description: 'Investigue a ferramenta de Triagem Pedagógica e compreenda os critérios do Semáforo de Risco.',
    loreQuote: '"Identificar a intensidade do conflito é saber a dose exata do remédio da mediação."',
    category: 'cadeia',
    difficulty: 'moderada',
    isSecret: true,
    chainId: 'arquivos_sentinela',
    chainOrder: 2,
    chainName: 'Os Arquivos do Sentinela',
    requiresMissionId: 'chain_arq_01',
    icon: '🚦',
    trigger: {
      type: 'use_feature',
      target: 'triagem'
    },
    hints: [
      {
        level: 1,
        title: 'Pista da Etapa 2',
        hintText: 'A mediação pedagógica utiliza cores verde, amarela e vermelha para priorizar acolhimentos.',
        penaltyPercent: 15
      },
      {
        level: 2,
        title: 'Localização Direta',
        hintText: 'Navegue até a "Triagem Pedagógica" e simule uma avaliação dos níveis.',
        penaltyPercent: 30
      }
    ],
    reward: {
      baseXp: 75
    }
  },
  {
    id: 'chain_arq_03',
    code: 'CHAIN-03',
    title: 'Arquivo 03 — A Decisão Restaurativa',
    subtitle: 'Cadeia: Os Arquivos do Sentinela (3/4)',
    description: 'Solucione com sucesso um desafio na Central de Respeito aplicando escuta ativa e diálogo.',
    loreQuote: '"Não há pacificação duradoura quando um lado se sente humilhado."',
    category: 'cadeia',
    difficulty: 'dificil',
    isSecret: true,
    chainId: 'arquivos_sentinela',
    chainOrder: 3,
    chainName: 'Os Arquivos do Sentinela',
    requiresMissionId: 'chain_arq_02',
    icon: '🤝',
    trigger: {
      type: 'complete_quiz',
      count: 1
    },
    hints: [
      {
        level: 1,
        title: 'Pista da Etapa 3',
        hintText: 'Demonstre seu conhecimento prático em um dos nós do Mapa de Desafios.',
        penaltyPercent: 15
      },
      {
        level: 2,
        title: 'Localização Direta',
        hintText: 'Conclua 1 quiz na Central de Desafios com pelo menos 70% de aproveitamento.',
        penaltyPercent: 30
      }
    ],
    reward: {
      baseXp: 100
    }
  },
  {
    id: 'chain_arq_04',
    code: 'CHAIN-04',
    title: 'Arquivo 04 — O Guardião do Respeito',
    subtitle: 'Cadeia: Os Arquivos do Sentinela (4/4 • Conclusão)',
    description: 'Finalize a cadeia completa dos Arquivos do Sentinela, alcançando a consagração máxima da comunidade.',
    loreQuote: '"Você não é apenas um estudante na escola: você é um guardião do bem-estar dos seus pares."',
    category: 'cadeia',
    difficulty: 'especial',
    isSecret: true,
    chainId: 'arquivos_sentinela',
    chainOrder: 4,
    chainName: 'Os Arquivos do Sentinela',
    requiresMissionId: 'chain_arq_03',
    icon: '👑',
    trigger: {
      type: 'finish_chain',
      target: 'arquivos_sentinela'
    },
    hints: [
      {
        level: 1,
        title: 'Ato Final',
        hintText: 'Complete os 3 arquivos anteriores para reivindicar a honraria final da cadeia.',
        penaltyPercent: 0
      }
    ],
    reward: {
      baseXp: 200,
      cosmeticId: 'frame_guardiao_investigador',
      cosmeticName: 'Moldura: Guardião do Respeito',
      cosmeticType: 'frame',
      titleBadge: 'Sentinela de Honra',
      specialNote: 'Concedido ao decifrar a cadeia completa dos Arquivos do Sentinela.'
    }
  },

  // =========================================================================
  // 5. GRANDE INVESTIGAÇÃO: OPERAÇÃO CÓDIGO DO RESPEITO (5 ETAPAS)
  // =========================================================================
  {
    id: 'op_codigo_respeito',
    code: 'OP-001',
    title: 'Operação: Código do Respeito',
    subtitle: 'Grande Investigação Especial Multietapas',
    description: 'Uma investigação de alto nível dividida em 5 etapas para restabelecer a segurança e o código de honra na EEMTI.',
    loreQuote: '"Quando muitos se unem para proteger a verdade, nenhuma injustiça permanece oculta."',
    category: 'investigacao',
    difficulty: 'especial',
    isSecret: true,
    icon: '🕵️',
    trigger: {
      type: 'enter_code',
      target: 'RESPEITOTOTAL'
    },
    hints: [
      {
        level: 1,
        title: 'Etapa 1: A Palavra de Ordem',
        hintText: 'A investigação requer a inserção da palavra de ordem mestra dos guardiões.',
        penaltyPercent: 15
      },
      {
        level: 2,
        title: 'Etapa 2: A Composição da Senha',
        hintText: 'A palavra é formada pela junção de "RESPEITO" com "TOTAL", tudo em maiúsculas sem espaços.',
        penaltyPercent: 35
      },
      {
        level: 3,
        title: 'Etapa 3: Decodificação',
        hintText: 'Insira "RESPEITOTOTAL" no Decodificador da Central de Missões para concluir a Operação.',
        penaltyPercent: 55
      }
    ],
    secretCode: 'RESPEITOTOTAL',
    steps: [
      {
        stepNumber: 1,
        title: 'Etapa 1: Coletar Pista na Matriz',
        instruction: 'Explore as tipologias de bullying na Matriz Educativa.',
        triggerType: 'explore_all_types',
        isCompleted: false,
        clueRevealed: 'Primeiro Fragmento: "RESPEITO"'
      },
      {
        stepNumber: 2,
        title: 'Etapa 2: Análise Crítica no Quiz',
        instruction: 'Resolva com sucesso qualquer desafio pedagógico da Central.',
        triggerType: 'complete_quiz',
        isCompleted: false,
        clueRevealed: 'Segundo Fragmento: "TOTAL"'
      },
      {
        stepNumber: 3,
        title: 'Etapa 3: A Chave Mestra',
        instruction: 'Junte as duas palavras e insira no decodificador da Central de Missões.',
        triggerType: 'enter_code',
        target: 'RESPEITOTOTAL',
        isCompleted: false,
        clueRevealed: 'Chave Mestra Desbloqueada!'
      }
    ],
    reward: {
      baseXp: 300,
      cosmeticId: 'title_investigador_segredos',
      cosmeticName: 'Título: Mestre dos Segredos',
      cosmeticType: 'title',
      titleBadge: 'Investigador Supremo',
      achievementId: 'detetive_operacao_completa',
      specialNote: 'Honraria máxima da Grande Operação Código do Respeito.'
    }
  },

  // =========================================================================
  // 6. MISSÃO DIÁRIA / ROTATIVA
  // =========================================================================
  {
    id: 'daily_desafio_dia',
    code: 'DAILY-001',
    title: 'Desafio Relâmpago do Dia',
    subtitle: 'Missão Rotativa com Reset Diário',
    description: 'Pratique um ato de reflexão e conhecimento diário no STOPBULLYING para manter sua sequência ativa.',
    loreQuote: '"A paz se constrói todos os dias com pequenos passos consistentes."',
    category: 'diaria',
    difficulty: 'moderada',
    isSecret: false,
    isDaily: true,
    icon: '⚡',
    trigger: {
      type: 'visit_area',
      count: 2
    },
    hints: [
      {
        level: 1,
        title: 'Dica do Dia',
        hintText: 'Basta navegar entre duas áreas diferentes do site hoje para garantir sua pontuação.',
        penaltyPercent: 0
      }
    ],
    reward: {
      baseXp: 45,
      titleBadge: 'Foco Diário'
    }
  }
];
