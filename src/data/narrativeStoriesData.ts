/**
 * STOPBULLYING — EEMTI ALFREDO MACHADO
 * Banco de Dados de Casos Narrativos Interativos e Investigação Pedagógica
 * 
 * 4 Casos imersivos com 5 Atos, escolhas ramificadas, investigação com pistas/diálogos/evidências/cronologia,
 * fundamentação legal (Lei 13.185/2015, Lei 14.811/2024, ECA) e desfechos pedagógicos.
 */

export type StoryCategory = 
  | 'cyberbullying' 
  | 'exclusao' 
  | 'conflitos' 
  | 'pressao_colegas' 
  | 'discriminacao';

export type StoryDifficulty = 'facil' | 'medio' | 'dificil' | 'impossivel';

export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  avatarType: 'aluna_oculos' | 'aluno_timido' | 'coordenadora' | 'aluno_lider' | 'colega_apoio' | 'inspetor';
  description: string;
  personality: string;
  accentColor: string;
}

export interface InvestigationItem {
  id: string;
  category: 'pista' | 'dialogo' | 'evidencia' | 'cronologia';
  title: string;
  subtitle: string;
  description: string;
  contentDetails: {
    text: string;
    sender?: string;
    timestamp?: string;
    messages?: Array<{ sender: string; text: string; time: string; isSelf?: boolean }>;
    legalNote?: string;
    meta?: Record<string, string>;
  };
  iconName: string;
  importance: 'critica' | 'moderada' | 'contexto';
  unlockAtAct: number; // 1 a 5
}

export interface NarrativeChoice {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  impact: 'positivo' | 'neutro' | 'negativo';
  points: number; // 25, 10, 5, 0
  whatHappened: string; // O que aconteceu no enredo
  ethicalAnalysis: string; // Valores e análise ética
  practicalLearning: string; // Aprendizagem prática para a convivência
  legalBasis?: {
    law: string;
    article?: string;
    summary: string;
  };
  consequenceState?: {
    confidenceModifier?: number;
    victimSafetyModifier?: number;
    flag?: string;
  };
}

export interface NarrativeAct {
  actNumber: 1 | 2 | 3 | 4 | 5;
  actTitle: string;
  sceneSetting: {
    location: string;
    timeOfDay: string;
    atmosphere: string;
    characterPresentId: string;
    sceneTheme: 'biblioteca' | 'sala_aula' | 'patio' | 'coordenacao' | 'celular_noite' | 'corredor';
  };
  character?: CharacterProfile;
  narrativeText?: string;
  narrativa?: string;
  dialogues?: Array<{
    speaker: string;
    text: string;
    tone?: 'preocupado' | 'firme' | 'agressivo' | 'acolhedor' | 'neutro';
  }>;
  currentDilemma: string;
  choices: NarrativeChoice[];
  unlockedClueIds?: string[];
}

export interface NarrativeOutcome {
  id: string;
  title: string;
  subtitle: string;
  badgeTitle: string;
  description: string;
  minScore: number;
  maxScore: number;
  summaryKeyTakeaways: string[];
  legalRecommendations: string[];
  competencyStrengths: string[];
  growthOpportunities: string[];
}

export interface NarrativeStory {
  id: string;
  title: string;
  subtitle: string;
  synopsis: string;
  category: StoryCategory;
  categoryLabel: string;
  difficulty: StoryDifficulty;
  difficultyLabel: string;
  estimatedDurationMinutes: number;
  baseRewardXp: number;
  xpReward?: number;
  maxScore: number; // Geralmente 125 (5 atos x 25 pts)
  coverTheme: {
    gradient: string;
    border: string;
    icon: string;
    tagBg: string;
    tagText: string;
  };
  competenciesWorked: Array<'bullying' | 'convivencia' | 'direitos' | 'respeito' | 'emocional' | 'cyber'>;
  characters: CharacterProfile[];
  investigationItems: InvestigationItem[];
  acts: NarrativeAct[];
  outcomes: NarrativeOutcome[];
}

// ============================================================================
// CASOS COMPLETOS NARRATIVOS DO STOPBULLYING
// ============================================================================

export const NARRATIVE_STORIES: NarrativeStory[] = [
  // --------------------------------------------------------------------------
  // HISTÓRIA 1: O CASO DO GRUPO SECRETO (Principal e Destaque)
  // --------------------------------------------------------------------------
  {
    id: 'o_caso_do_grupo_secreto',
    title: 'O Caso do Grupo Secreto',
    subtitle: 'Cyberbullying, exclusão sistemática e preservação legal de evidências digitais',
    synopsis: 'Durante o estudo na biblioteca da EEMTI Alfredo Machado, você descobre a existência de um grupo secreto criado para humilhar e isolar Lucas, um colega tímido da sua turma. Como agir de forma responsável e eficaz para protegê-lo sem gerar mais riscos?',
    category: 'cyberbullying',
    categoryLabel: 'Cyberbullying & Exclusão Social',
    difficulty: 'dificil',
    difficultyLabel: 'Nível 3 • Difícil',
    estimatedDurationMinutes: 15,
    baseRewardXp: 150,
    maxScore: 125,
    coverTheme: {
      gradient: 'from-purple-900 via-indigo-900 to-violet-950',
      border: 'border-fuchsia-400/50',
      icon: '🛡️',
      tagBg: 'bg-fuchsia-500/20',
      tagText: 'text-fuchsia-300'
    },
    competenciesWorked: ['cyber', 'bullying', 'convivencia', 'direitos', 'respeito'],
    characters: [
      {
        id: 'lucas',
        name: 'Lucas Ferreira',
        role: 'Colega de Turma (Vítima de Intimidação)',
        avatarType: 'aluno_timido',
        description: 'Estudante dedicado, calado e tímido. Começou a apresentar isolamento acentuado e queda repentina no rendimento escolar.',
        personality: 'Reservado, sensível e com receio de represálias.',
        accentColor: '#38bdf8'
      },
      {
        id: 'sofia',
        name: 'Sofia Duarte',
        role: 'Colega & Ativista da Paz',
        avatarType: 'aluna_oculos',
        description: 'Estudante observadora da turma de tempo integral, sempre atenta aos sinais de exclusão e defensora dos direitos dos colegas.',
        personality: 'Firme, racional, empática e conhecedora do regimento escolar.',
        accentColor: '#c084fc'
      },
      {
        id: 'bernardo',
        name: 'Bernardo Lima',
        role: 'Administrador do Grupo Tóxico',
        avatarType: 'aluno_lider',
        description: 'Popular na turma, usa o humor sarcástico e grupos paralelos em aplicativos para controlar a aceitação social dos colegas.',
        personality: 'Manipulador, desafiador e temeroso de sanções oficiais.',
        accentColor: '#f43f5e'
      },
      {
        id: 'prof_helena',
        name: 'Coordenadora Helena',
        role: 'Gestora Pedagógica da EEMTI',
        avatarType: 'coordenadora',
        description: 'Pedagoga com pós-graduação em Justiça Restaurativa Escolar e mediação de conflitos comunitários.',
        personality: 'Acolhedora, técnica, defensora rigorosa do sigilo e da Lei 14.811/2024.',
        accentColor: '#a855f7'
      }
    ],
    investigationItems: [
      {
        id: 'clue_print_grupo',
        category: 'pista',
        title: 'Mensagens do Grupo "Detonação 1º Ano"',
        subtitle: 'Captura da tela do notebook na biblioteca',
        description: 'Print mostrando mensagens ofensivas com apelidos humilhantes e memes ridicularizando a apresentação escolar de Lucas.',
        iconName: 'MessageSquare',
        importance: 'critica',
        unlockAtAct: 1,
        contentDetails: {
          text: 'Conversas no aplicativo com 18 participantes zombando do trabalho escolar e das roupas de Lucas.',
          sender: 'Grupo "Detonação 1º Ano"',
          timestamp: 'Terça-feira, 14:28',
          messages: [
            { sender: 'Bernardo', text: 'Vocês viram o gaguejo do Lucas hoje? kkkkkk', time: '14:22' },
            { sender: 'Anônimo 3', text: 'Mandei o meme que fiz dele no recreio. Não deixem ele sentar com a gente.', time: '14:25' },
            { sender: 'Bernardo', text: 'Se ele reclamar com algum professor, ele vai ver o que é bom na saída.', time: '14:27' }
          ],
          legalNote: 'Art. 146-A do Código Penal (Lei 14.811/2024): Intimidação sistemática virtual (Cyberbullying). Pena agravada se praticada em grupo.'
        }
      },
      {
        id: 'clue_bilhete_ameaca',
        category: 'pista',
        title: 'Bilhete Encontrado no Estojo',
        subtitle: 'Papel dobrado deixado sobre a carteira de Lucas',
        description: 'Pequeno bilhete com caligrafia disfarçada contendo aviso intimidador contra qualquer denúncia.',
        iconName: 'FileText',
        importance: 'critica',
        unlockAtAct: 2,
        contentDetails: {
          text: '"Fica na sua. Se abrir o bico pra direção, a sua vida aqui vai virar um inferno."',
          sender: 'Desconhecido',
          timestamp: 'Quarta-feira, 08:15',
          legalNote: 'Coação e intimidação sistemática reiterada (Lei 13.185/2015).'
        }
      },
      {
        id: 'clue_depoimento_lucas',
        category: 'dialogo',
        title: 'Depoimento Reservado de Lucas',
        subtitle: 'Conversa no bebedouro no intervalo',
        description: 'Lucas relata o pânico que sente ao entrar na sala e a vergonha pelas mensagens compartilhadas sem seu consentimento.',
        iconName: 'Users',
        importance: 'critica',
        unlockAtAct: 3,
        contentDetails: {
          text: 'Lucas confidenciou que mal consegue dormir há duas semanas. Teve dores de estômago e medo de que os agressores façam algo contra ele no trajeto para casa.',
          sender: 'Lucas Ferreira',
          timestamp: 'Quarta-feira, 10:15',
          legalNote: 'Dano à integridade psíquica e violação do direito ao respeito (ECA, arts. 17 e 18).'
        }
      },
      {
        id: 'clue_preservacao_digital',
        category: 'evidencia',
        title: 'Preservação Técnica das Provas',
        subtitle: 'Metadados e integridade probatória',
        description: 'Registro de telas contendo cabeçalho com número telefônico, data, horário e contexto completo sem adulterações.',
        iconName: 'ShieldCheck',
        importance: 'critica',
        unlockAtAct: 1,
        contentDetails: {
          text: 'Evidências colhidas de modo estritamente técnico: salvamento de capturas completas com data/hora e preservação de links e identificadores públicos.',
          legalNote: 'A preservação íntegra da cadeia de custódia digital é elemento chave para acionamento responsável das instâncias pedagógicas e legais.'
        }
      },
      {
        id: 'clue_protocolo_anonimo',
        category: 'evidencia',
        title: 'Protocolo Criptografado StopBullying',
        subtitle: 'Canal de Denúncia Sigiloso da EEMTI',
        description: 'Comprovante do envio de relato via protocolo seguro, sem coleta de IP ou dados pessoais do denunciante.',
        iconName: 'Key',
        importance: 'critica',
        unlockAtAct: 4,
        contentDetails: {
          text: 'Protocolo #EEMTI-2024-8841 gerado no sistema StopBullying. Permite à coordenação agir administrativamente e de forma restaurativa garantindo anonimato incondicional.',
          legalNote: 'Conformidade com a Lei Geral de Proteção de Dados (LGPD) e garantia do sigilo à fonte de denúncia escolar.'
        }
      },
      {
        id: 'clue_cronologia_fatos',
        category: 'cronologia',
        title: 'Linha do Tempo dos Acontecimentos',
        subtitle: 'Mapeamento temporal da escalada do cyberbullying',
        description: 'Sequência cronológica demonstrando a transição da zombaria virtual para o isolamento físico no ambiente da escola.',
        iconName: 'Clock',
        importance: 'moderada',
        unlockAtAct: 2,
        contentDetails: {
          text: 'Mapeamento: 1) Criação do grupo secreto há 12 dias; 2) Postagens de montagens zombeteiras há 7 dias; 3) Hostilidades e risinhos em sala de aula há 3 dias; 4) Ameaça por bilhete ontem.',
          legalNote: 'Caracterização inequívoca de "reiteração de atos", núcleo do tipo do bullying conforme o Art. 2º da Lei 13.185/2015.'
        }
      }
    ],
    acts: [
      // ATO 1
      {
        actNumber: 1,
        actTitle: 'O Primeiro Sinal na Biblioteca',
        sceneSetting: {
          location: 'Biblioteca da EEMTI Alfredo Machado',
          timeOfDay: 'Terça-feira, 14:30',
          atmosphere: 'Silenciosa com luz suave nas mesas de estudo',
          characterPresentId: 'sofia',
          sceneTheme: 'biblioteca'
        },
        narrativa: 'Você e alguns colegas estão reunidos para estudar na biblioteca da EEMTI Alfredo Machado. Bernardo, um aluno popular da turma, levanta-se para ir ao bebedouro e deixa o notebook aberto sobre a mesa. De repente, uma notificação pisca no canto da tela: um grupo intitulado "Detonação 1º Ano" com diversas mensagens novas. Ao passar os olhos, você identifica fotos e comentários depreciativos sobre Lucas, um colega tímido e bolsista. As mensagens debocham de suas roupas, da sua fala e articulam um plano para isolá-lo de todos os trabalhos em grupo.',
        dialogues: [
          { speaker: 'Sofia (sussurrando)', text: 'Você viu aquilo na tela? É um grupo criado só para humilhar o Lucas...', tone: 'preocupado' },
          { speaker: 'Notificação do App', text: 'Bernardo: "Não deixem o Lucas falar nada no seminário de amanhã."', tone: 'agressivo' }
        ],
        currentDilemma: 'Você descobriu o grupo por acaso. Os administradores ainda não sabem que alguém viu. Qual é a sua atitude imediata mais ética e responsável?',
        unlockedClueIds: ['clue_print_grupo', 'clue_preservacao_digital'],
        choices: [
          {
            letter: 'A',
            text: 'Preservar com discrição as evidências (registrar foto legível do cabeçalho, contexto e horário) para viabilizar apuração técnica, conversando depois com Sofia sobre como buscar ajuda segura.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'Você obteve provas materiais com data e identificadores sem causar alarde nem expor a vítima antes do tempo.',
            ethicalAnalysis: 'Excelente discernimento! Em ambiente digital, preservar provas concretas é essencial para proteger a vítima com base na verdade dos fatos.',
            practicalLearning: 'Evidências concretas impedem que a agressão seja desqualificada como mero "mal-entendido" ou "brincadeira boba".',
            legalBasis: {
              law: 'Lei nº 14.811/2024 e Marco Civil da Internet (Lei 12.965/2014)',
              article: 'Art. 146-A do Código Penal',
              summary: 'O cyberbullying é infração penal qualificada. A preservação idônea dos registros digitais garante suporte à apuração das autoridades escolares e tutelares.'
            }
          },
          {
            letter: 'B',
            text: 'Levantar da cadeira e gritar no meio da biblioteca para todos os alunos ouvirem que Bernardo é um covarde que comete crimes virtuais.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A gritaria causou confusão na biblioteca, Bernardo correu de volta, apagou o grupo instantaneamente e você levou advertência pela desordem.',
            ethicalAnalysis: 'A reação desmedida destruiu as provas digitais e colocou Lucas no centro de uma fofoca pública sem o consentimento dele.',
            practicalLearning: 'Confrontos impulsivos destroem a segurança da vítima e eliminam as evidências necessárias para resolver o problema.',
            legalBasis: {
              law: 'Regimento Escolar e ECA',
              article: 'Art. 17 do ECA',
              summary: 'A proteção da integridade moral da vítima exige discrição para evitar exposição pública desnecessária e revitimização.'
            }
          },
          {
            letter: 'C',
            text: 'Copiar o link do grupo e encaminhar para os seus amigos nas redes sociais para "cancelar" Bernardo na internet.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'O material viralizou na cidade, mas os prints vazados com as ofensas humilharam Lucas ainda mais, tornando você co-responsável pela difamação.',
            ethicalAnalysis: 'Reencaminhar material difamatório amplia o dano psicológico sofrido pela vítima e viola a sua intimidade.',
            practicalLearning: 'Vazar ofensas nas redes nunca protege a vítima; apenas espalha o veneno e gera linchamento digital.',
            legalBasis: {
              law: 'Código Penal Brasileiro',
              article: 'Arts. 139 e 140',
              summary: 'A divulgação de ofensas e difamações contra terceiros pode configurar infração civil e penal de corresponsabilidade.'
            }
          },
          {
            letter: 'D',
            text: 'Virar o rosto, fechar os olhos e fingir que nada aconteceu, pois "não é problema meu e não quero me envolver em confusão com ninguém".',
            impact: 'neutro',
            points: 10,
            whatHappened: 'A passividade manteve sua zona de conforto temporária, mas Bernardo e os agressores continuaram a intimidar Lucas impunemente.',
            ethicalAnalysis: 'A conivência por omissão é o que sustenta o bullying sistemático. As testemunhas passivas silenciosamente alimentam o agressor.',
            practicalLearning: 'Não tomar partido diante da crueldade significa tomar o partido do agressor.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 4º',
              summary: 'A lei estabelece o dever coletivo da comunidade escolar de capacitar estudantes para a intervenção consciente e solidária.'
            }
          }
        ]
      },

      // ATO 2
      {
        actNumber: 2,
        actTitle: 'A Escalada do Isolamento em Sala',
        sceneSetting: {
          location: 'Sala de Aula do 1º Ano da EEMTI',
          timeOfDay: 'Quarta-feira, 08:30',
          atmosphere: 'Tensa, aula de Biologia com cochichos e risinhos',
          characterPresentId: 'lucas',
          sceneTheme: 'sala_aula'
        },
        narrativa: 'No dia seguinte, durante a aula de Biologia, o professor faz uma pergunta desafiadora para a turma. Lucas, que sempre estudou muito, ergue a mão timidamente para responder. No mesmo instante, três alunos que estavam no grupo começam a rir em voz baixa, soltando tosses forçadas e apontando para a tela do celular. Lucas recolhe o braço devagar, fica completamente vermelho de vergonha e abaixa a cabeça sobre a mesa, desistindo de participar.',
        dialogues: [
          { speaker: 'Professor de Biologia', text: 'Lucas, você gostaria de complementar a resposta?', tone: 'neutro' },
          { speaker: 'Lucas (voz baixa)', text: 'Não, professor... me confundi. Não foi nada.', tone: 'preocupado' },
          { speaker: 'Bernardo (ao fundo)', text: 'Claro que não sabe... novidade nenhuma.', tone: 'agressivo' }
        ],
        currentDilemma: 'O assédio virtual transbordou para o espaço físico de sala de aula. Como intervir no momento para conter a intimidação sem colocar Lucas em risco?',
        unlockedClueIds: ['clue_bilhete_ameaca', 'clue_cronologia_fatos'],
        choices: [
          {
            letter: 'A',
            text: 'Aproveitar a transição de atividade para sentar ao lado de Lucas, engajá-lo em uma conversa amigável com respeito visível e convidá-lo para fazer a atividade da aula em dupla.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A presença solidária e a inclusão imediata romperam o cordão de isolamento social e neutralizaram a zombaria dos agressores na sala.',
            ethicalAnalysis: 'Atitude exemplar de intervenção pró-social (Upstander): apoiar a vítima no momento de vulnerabilidade restaura sua dignidade perante o grupo.',
            practicalLearning: 'Pequenos gestos públicos de acolhimento desarmam a humilhação muito mais do que discussões agressivas.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 2º, § 1º',
              summary: 'O combate ao bullying prioriza a integração social, a empatia ativa e a restauração do vínculo comunitário escolar.'
            }
          },
          {
            letter: 'B',
            text: 'Interromper o professor gritando com Bernardo e seus amigos, mandando-os calarem a boca e ameaçando dar uma surra neles após a aula.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'O tumulto generalizado paralisou a aula, o professor repreendeu todos os envolvidos e Lucas ficou ainda mais abalado e envergonhado.',
            ethicalAnalysis: 'Responder à intimidação com violência física é contraproducente, ineficaz e coloca em risco a segurança física de todos.',
            practicalLearning: 'A raiva impulsiva nunca resolve conflitos escolares e frequentemente transforma quem defende em réu.',
            legalBasis: {
              law: 'Regimento Geral das Escolas Públicas',
              article: 'Normas de Convivência',
              summary: 'Ameaças e agressões verbais violam o regimento escolar e podem ensejar medidas socioeducativas ou disciplinares.'
            }
          },
          {
            letter: 'C',
            text: 'Rir baixinho junto com o grupo de Bernardo para que ninguém perceba que você é amigo de Lucas e você não seja o próximo alvo de piadas.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'Lucas olhou em sua direção, viu você rindo e perdeu qualquer confiança que tinha na turma, sentindo-se traído e abandonado.',
            ethicalAnalysis: 'Rir com os agressores por conformismo social é conivência direta com a violência psicológica.',
            practicalLearning: 'O medo de ser rejeitado não justifica participar da destruição da autoestima de outra pessoa.',
            legalBasis: {
              law: 'Estatuto da Criança e do Adolescente (ECA)',
              article: 'Art. 18',
              summary: 'É dever de todos velar pela dignidade da criança e do adolescente, pondo-os a salvo de qualquer tratamento desumano ou humilhante.'
            }
          },
          {
            letter: 'D',
            text: 'Permanecer em silêncio absoluto e esperar até o fim do bimestre para ver se o clima na sala de aula melhora por conta própria.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'A inércia permitiu que os risinhos continuassem e Lucas passou a faltar reiteradamente às aulas seguintes de Biologia.',
            ethicalAnalysis: 'A inação diante da dor evidente de um colega normaliza o bullying como parte do cotidiano escolar.',
            practicalLearning: 'Situações de intimidação sistemática nunca se resolvem sozinhas; elas se agravam quando ninguém se manifesta.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 1º',
              summary: 'O Programa Nacional de Combate ao Bullying exige medidas proativas e preventivas contínuas nas unidades de ensino.'
            }
          }
        ]
      },

      // ATO 3
      {
        actNumber: 3,
        actTitle: 'O Dilema da Vítima no Intervalo',
        sceneSetting: {
          location: 'Pátio próximo ao Bebedouro da EEMTI',
          timeOfDay: 'Quarta-feira, 10:15',
          atmosphere: 'Intervalo escolar movimentado com alunos em grupos',
          characterPresentId: 'lucas',
          sceneTheme: 'patio'
        },
        narrativa: 'No recreio, você encontra Lucas sozinho em um canto afastado do pátio. Ele está com os olhos marejados e as mãos trêmulas. Ao perceber que você se aproximou com intenção de conversar com sinceridade, ele desabafa: confessa que encontrou um bilhete ameaçador no estojo e que pensa seriamente em largar os estudos na EEMTI. Ele chora e diz: "Se eu for na coordenação, eles vão descobrir que fui eu e vão me bater na saída... eu não tenho para onde fugir".',
        dialogues: [
          { speaker: 'Lucas (em prantos)', text: 'Eles disseram que quem dedurar vai sofrer o dobro. Não conta nada pra ninguém, por favor!', tone: 'preocupado' },
          { speaker: 'Você', text: 'Lucas, você não está sozinho nessa. O que eles estão fazendo é crime e não pode continuar.', tone: 'acolhedor' }
        ],
        currentDilemma: 'Lucas está paralisado pelo medo de retaliação e implora para que nada seja feito. Como agir para resguardar a vida e o bem-estar dele sem trair sua confiança?',
        unlockedClueIds: ['clue_depoimento_lucas'],
        choices: [
          {
            letter: 'A',
            text: 'Apresentar a Lucas o Canal de Denúncia Anônima do StopBullying da EEMTI, explicando que a ferramenta não grava IP, gera protocolo criptografado e permite à coordenação intervir em sigilo absoluto.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'Lucas sentiu-se seguro com a garantia técnica de anonimato e concordou em enviar as evidências sem que seu nome fosse exposto.',
            ethicalAnalysis: 'Solução equilibrada e pedagógica: respeitou o medo da vítima oferecendo uma ponte segura, institucional e protegida.',
            practicalLearning: 'Canais anônimos institucionais existem justamente para romper a barreira do medo sem expor a vítima à vingança.',
            legalBasis: {
              law: 'Lei nº 14.811/2024 e Marco Regulatório de Proteção à Vítima',
              article: 'Medidas de Proteção e Sigilo',
              summary: 'Instituições de ensino devem oferecer canais seguros e acessíveis para recebimento de denúncias de bullying garantindo a proteção à integridade dos alunos.'
            }
          },
          {
            letter: 'B',
            text: 'Dizer a Lucas que você e outros três colegas vão armar uma emboscada atrás do ginásio para intimidar Bernardo antes que ele faça algo.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A proposta apavorou ainda mais Lucas, gerou tensão no ginásio e quase resultou em briga física com envolvimento da polícia.',
            ethicalAnalysis: 'Prometer "justiça com as próprias mãos" intensifica o ciclo de violência e expõe todos a sanções disciplinares e penais.',
            practicalLearning: 'Violência preventiva é violência real: nunca utilize intimidação para combater intimidação.',
            legalBasis: {
              law: 'Código Penal e Estatuto da Criança e do Adolescente',
              article: 'Arts. 129 e 147 do CP',
              summary: 'Ameaças e vias de fato configuram ilícitos graves sujeitos a medidas socioeducativas rigorosas da Vara da Infância e Juventude.'
            }
          },
          {
            letter: 'C',
            text: 'Concordar em guardar segredo absoluto e aconselhar Lucas a "aguentar firme e não ligar", pois as aulas logo vão entrar em recesso.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'Ao sentir que não havia saída, o quadro de depressão de Lucas piorou e ele teve uma crise de ansiedade severa no dia seguinte.',
            ethicalAnalysis: 'Prometer silêncio diante de ameaças graves não é lealdade; é abandonar a vítima ao desamparo.',
            practicalLearning: 'O pacto do silêncio nunca protege a vítima: quando há risco iminente, é dever moral acionar o suporte institucional protegido.',
            legalBasis: {
              law: 'ECA e Lei 13.185/2015',
              article: 'Art. 70 do ECA',
              summary: 'É dever de todos prevenir a ocorrência de ameaça ou violação dos direitos da criança e do adolescente.'
            }
          },
          {
            letter: 'D',
            text: 'Pegar o celular de Lucas na marra e correr até a sala dos professores gritando que tem um aluno sendo perseguido na escola.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'Lucas sentiu-se completamente desrespeitado, chorou de desespero por ter sua privacidade invadida e se trancou no banheiro.',
            ethicalAnalysis: 'Atropelar a vontade da vítima sem diálogo gera sensação de descontrole e trauma adicional (revitimização).',
            practicalLearning: 'Ajudar a vítima significa caminhar COM ela, ouvindo suas dores e respeitando sua dignidade, e não decidir por ela à força.',
            legalBasis: {
              law: 'Lei Geral de Proteção de Dados (LGPD) e ECA',
              article: 'Art. 17 do ECA',
              summary: 'O direito ao respeito compreende a inviolabilidade da integridade física, psíquica e moral, abrangendo a preservação da imagem e da autonomia.'
            }
          }
        ]
      },

      // ATO 4
      {
        actNumber: 4,
        actTitle: 'A Investigação Responsável e o Confronto',
        sceneSetting: {
          location: 'Corredor próximo à Sala da Coordenação',
          timeOfDay: 'Quinta-feira, 11:40',
          atmosphere: 'Alunos saindo para o almoço, Bernardo aborda você',
          characterPresentId: 'bernardo',
          sceneTheme: 'corredor'
        },
        narrativa: 'O protocolo anônimo foi enviado através do StopBullying com os prints e o relato cronológico. A coordenação pedagógica, sob liderança da Profa. Helena, acolheu o caso com discrição exemplar. Convocou Bernardo e os demais participantes do grupo individualmente em horários desencontrados para reuniões pedagógicas restaurativas, com notificação formal aos responsáveis legais com base na Lei 14.811/2024. No corredor da escola, Bernardo se aproxima de você visivelmente irritado, fecha a passagem e pergunta em tom intimidador: "Você sabe qual foi o dedo-duro que foi chorar na coordenação?".',
        dialogues: [
          { speaker: 'Bernardo (olhar cerrado)', text: 'Eu sei que você andou conversando com o Lucas ontem. Foi você ou ele que me entregou?', tone: 'agressivo' },
          { speaker: 'Sofia (se aproximando)', text: 'Bernardo, ninguém tem que te dar satisfação de nada aqui.', tone: 'firme' }
        ],
        currentDilemma: 'O agressor tenta descobrir quem denunciou para retaliar. Como manter a serenidade, desarmar a agressividade e proteger a integridade do processo?',
        unlockedClueIds: ['clue_protocolo_anonimo'],
        choices: [
          {
            letter: 'A',
            text: 'Manter a calma, sustentar contato visual sereno e responder com firmeza: "O importante não é quem denunciou, Bernardo. O importante é que criar grupos para humilhar e ameaçar colegas é errado, fere as pessoas e não tem mais espaço na nossa escola."',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A postura calma e inabalável quebrou a postura ameaçadora de Bernardo, desarmou a hostilidade e blindou o sigilo de Lucas.',
            ethicalAnalysis: 'Excelente maturidade ética e coragem moral! Você protegeu a vítima, não caiu na armadilha da provocação e reposicionou o debate no valor do respeito.',
            practicalLearning: 'Responder à intimidação com clareza ética e tranquilidade desarma o agressor e retira dele a sensação de controle.',
            legalBasis: {
              law: 'Lei nº 14.811/2024 e Doutrina Restaurativa',
              article: 'Princípios da Convivência Democrática',
              summary: 'A mediação pedagógica busca a conscientização do agressor sobre a ilicitude do ato e a responsabilização socioeducativa sem vingança.'
            }
          },
          {
            letter: 'B',
            text: 'Entrar em pânico e confessar: "Foi o Lucas! Ele estava chorando e pediu para usar o canal da escola, eu não tive nada a ver com isso!".',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A quebra catastrófica de sigilo expôs Lucas à fúria de Bernardo e destruiu todo o processo de proteção construído pela coordenação.',
            ethicalAnalysis: 'Traição ética gravíssima: expor uma vítima vulnerável ao agressor para salvar a própria pele é uma falha moral inaceitável.',
            practicalLearning: 'O sigilo da vítima é inegociável em qualquer processo de acolhimento ético.',
            legalBasis: {
              law: 'ECA e Lei nº 14.811/2024',
              article: 'Dever de Proteção Integral',
              summary: 'A violação do sigilo que resulta em perigo à vítima frustra as medidas protetivas e compromete a segurança de toda a comunidade escolar.'
            }
          },
          {
            letter: 'C',
            text: 'Debochar de Bernardo dizendo: "Bem feito! Agora você vai levar suspensão, seus pais vão saber de tudo e você vai responder processo criminal!".',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A provocação arrogante enfureceu Bernardo, gerando um bate-boca violento no corredor que quase descambou para agressão física.',
            ethicalAnalysis: 'A arrogância vingativa desvirtua o sentido educativo da intervenção e estimula novos sentimentos de rancor e revanchismo.',
            practicalLearning: 'A justiça não precisa de deboche: o foco deve ser sempre a reparação do dano e a paz comunitária.',
            legalBasis: {
              law: 'Princípios de Justiça Restaurativa Escolar',
              article: 'Resolução MEC/CNE',
              summary: 'A abordagem restaurativa visa construir responsabilização e empatia, afastando práticas punitivistas de humilhação pública.'
            }
          },
          {
            letter: 'D',
            text: 'Mentir dizendo que ouviu dizer que foi a professora de Biologia que viu as conversas por conta própria.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A mentira criou boatos na turma, gerou desconfiança injusta contra a professora e atrapalhou as reuniões de conciliação da escola.',
            ethicalAnalysis: 'Inventar falsos culpados polui o processo educativo e prejudica relações pedagógicas sadias.',
            practicalLearning: 'Nunca utilize mentiras para escapar de conversas difíceis; a verdade e a firmeza ética são as únicas bases sólidas.',
            legalBasis: {
              law: 'Ética e Cidadania Escolar',
              article: 'Normas Regimentais',
              summary: 'A integridade e a boa-fé são deveres fundamentais no processo disciplinar e na convivência democrática.'
            }
          }
        ]
      },

      // ATO 5
      {
        actNumber: 5,
        actTitle: 'O Desfecho Restaurativo e o Legado de Paz',
        sceneSetting: {
          location: 'Sala de Mediação da EEMTI Alfredo Machado',
          timeOfDay: 'Duas semanas depois',
          atmosphere: 'Círculo restaurativo sereno com mediação da Profa. Helena',
          characterPresentId: 'prof_helena',
          sceneTheme: 'coordenacao'
        },
        narrativa: 'Duas semanas se passaram desde a intervenção. Graças ao protocolo seguro do StopBullying e à atuação técnica da coordenação, as famílias foram acolhidas e os envolvidos participaram de círculos de mediação restaurativa. Bernardo e os demais participantes compreenderam a gravidade penal do cyberbullying pela Lei 14.811/2024 e o dano causado à saúde mental de Lucas. Eles assinaram um termo de compromisso, gravaram pedidos sinceros de desculpas e assumiram atividades comunitárias na biblioteca. Lucas voltou a sorrir, retomou os estudos com entusiasmo e hoje está integrado aos colegas.',
        dialogues: [
          { speaker: 'Coordenadora Helena', text: 'Esse caso demonstrou que a coragem de agir com técnica e ética transforma a escola. Como podemos garantir que isso nunca mais aconteça?', tone: 'acolhedor' },
          { speaker: 'Lucas', text: 'Hoje eu me sinto respeitado. Se não fosse pela ajuda certa no momento certo, eu não estaria mais aqui.', tone: 'firme' }
        ],
        currentDilemma: 'Para consolidar um legado duradouro de respeito e empatia na sua turma, qual deve ser a sua atitude pedagógica contínua?',
        unlockedClueIds: [],
        choices: [
          {
            letter: 'A',
            text: 'Propor na turma a criação de um "Pacto Coletivo de Convivência e Cidadania Digital", promovendo o uso do StopBullying, atuando como guardião empático e garantindo que novos alunos sejam integrados sem distinção.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A turma transformou-se em referência de convivência respeitosa na EEMTI, eliminando focos de cyberbullying com liderança estudantil positiva.',
            ethicalAnalysis: 'Brilhante conclusão! A verdadeira justiça não se limita a conter o dano; ela constrói uma cultura permanente de respeito e prevenção coletiva.',
            practicalLearning: 'A cidadania digital se constrói todos os dias com acordos coletivos claros e acolhimento contínuo de quem chega.',
            legalBasis: {
              law: 'Lei nº 13.185/2015 e Lei nº 14.811/2024',
              article: 'Art. 4º da Lei 13.185',
              summary: 'Implementação de planos de convivência escolar e ações de conscientização contínua com protagonismo juvenil.'
            }
          },
          {
            letter: 'B',
            text: 'Exigir que Bernardo e os agressores sejam excluídos de todas as gincanas, eventos sociais e jogos da escola até o final do ano letivo.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'O ostracismo permanente reacendeu o ressentimento e atrapalhou a reintegração dos estudantes que haviam se arrependido.',
            ethicalAnalysis: 'A vingança permanente nega a essência da restauração pedagógica e impede que pessoas amadureçam e se recuperem.',
            practicalLearning: 'Justiça restaurativa significa reparar o dano e reinserir, e não condenar perpetuamente ao isolamento.',
            legalBasis: {
              law: 'ECA e Diretrizes Nacionais de Direitos Humanos',
              article: 'Finalidade Pedagógica das Medidas',
              summary: 'As medidas escolares e socioeducativas têm natureza formativa e emancipatória, vedada qualquer forma de perseguição estigmatizante.'
            }
          },
          {
            letter: 'C',
            text: 'Proibir todos os alunos de usarem celulares ou computadores na escola para qualquer finalidade.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A medida autoritária bloqueou pesquisas escolares e gerou revolta entre os alunos sem ensinar responsabilidade digital real.',
            ethicalAnalysis: 'Proibir a tecnologia não resolve o problema ético do uso; a solução é educar para o uso consciente.',
            practicalLearning: 'A tecnologia é ferramenta: a solução para o mau comportamento não é a censura, mas a educação ética.',
            legalBasis: {
              law: 'BNCC e Marco da Cidadania Digital',
              article: 'Competência Geral 5',
              summary: 'Compreender, utilizar e criar tecnologias digitais de forma crítica, significativa, reflexiva e ética nas práticas sociais.'
            }
          },
          {
            letter: 'D',
            text: 'Considerar o dever cumprido e nunca mais prestar atenção nas conversas e interações que acontecem nos corredores.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'Com a ausência de vigilância solidária, pequenos focos de piadas preconceituosas voltaram a surgir meses depois em outro grupo.',
            ethicalAnalysis: 'A cultura de respeito exige atenção contínua e compromisso de longo prazo para evitar novos ciclos de violência.',
            practicalLearning: 'A paz escolar não é um estado estático; é uma prática cotidiana de empatia e responsabilidade mútua.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 6º',
              summary: 'As campanhas e práticas de prevenção ao bullying devem ser sistemáticas e perenes, e não pontuais.'
            }
          }
        ]
      }
    ],
    outcomes: [
      {
        id: 'exemplar_restaurativo',
        title: 'Guardião Exemplar da Justiça Restaurativa',
        subtitle: 'Intervenção técnica, sigilosa e transformadora',
        badgeTitle: '🏆 Medalha Guardião de Ouro da EEMTI',
        description: 'Suas decisões foram absolutamente exemplares. Você soube agir com discernimento tático, preservou provas idôneas sem alarde, acolheu a vítima sem expô-la ao perigo, acionou os canais institucionais seguros e desarmou a hostilidade com serenidade ética. Seu legado transformou a convivência da turma!',
        minScore: 100,
        maxScore: 125,
        summaryKeyTakeaways: [
          'Preservação rigorosa de provas digitais com data e contexto.',
          'Uso inteligente do canal anônimo da escola para vencer a barreira do medo.',
          'Acolhimento empático com foco na segurança física e emocional da vítima.',
          'Construção de um pacto coletivo permanente de convivência e cidadania digital.'
        ],
        legalRecommendations: [
          'Fundamentado na Lei nº 14.811/2024 (tipificação do bullying e cyberbullying).',
          'Alinhado ao Art. 18 do ECA (zelo pela dignidade e proteção contra tratamento humilhante).',
          'Atende às diretrizes do Programa Nacional de Combate à Intimidação Sistemática (Lei 13.185/2015).'
        ],
        competencyStrengths: [
          'Domínio profundo de legislação e direitos fundamentais',
          'Altíssima maturidade socioemocional e mediação de conflitos',
          'Excelente discernimento de segurança da informação e privacidade'
        ],
        growthOpportunities: [
          'Multiplicar esse modelo de atuação atuando como jovem mediador na escola.'
        ]
      },
      {
        id: 'apoio_parcial',
        title: 'Intervenção Positiva com Pontos de Aperfeiçoamento',
        subtitle: 'Compromisso com o respeito, mas com oportunidades de aprimoramento tático',
        badgeTitle: '🥈 Distintivo de Convivência Construtiva',
        description: 'Você demonstrou boa intenção e compromisso ético com o colega, mas algumas escolhas demandaram mais cautela na preservação de provas ou no resguardo da integridade de Lucas. Com pequenos ajustes de conduta e conhecimento da legislação, sua atuação será ainda mais protetiva.',
        minScore: 65,
        maxScore: 99,
        summaryKeyTakeaways: [
          'Houve boa vontade em ajudar o colega em vulnerabilidade.',
          'Importante reforçar o uso de canais anônimos seguros para evitar retaliações.',
          'Lembrar que o confronto raivoso nunca substitui a mediação pedagógica técnica.'
        ],
        legalRecommendations: [
          'Aprofundar o estudo da Lei 14.811/2024 sobre procedimentos escolares seguros.',
          'Revisar o conceito de integridade probatória em crimes cibernéticos.'
        ],
        competencyStrengths: [
          'Empatia demonstrada com o sofrimento do próximo',
          'Reconhecimento da injustiça do cyberbullying'
        ],
        growthOpportunities: [
          'Aprender a manter a calma em situações de confronto direto.',
          'Priorizar a proteção incondicional da identidade da vítima.'
        ]
      },
      {
        id: 'aprendizagem_necessaria',
        title: 'Caso Crítico: Necessidade de Reflexão e Capacitação',
        subtitle: 'Decisões que geraram riscos adicionais ou reforçaram a omissão',
        badgeTitle: '⚠️ Alerta de Capacitação Ética',
        description: 'Suas decisões indicam que os impulsos de omissão, provocação ou retaliação acabaram gerando riscos reais à segurança de Lucas e à sua própria integridade escolar. É fundamental revisitar os conceitos da Lei 13.185 e compreender que o combate ao bullying exige técnica, empatia e responsabilidade.',
        minScore: 0,
        maxScore: 64,
        summaryKeyTakeaways: [
          'A omissão e o conformismo social alimentam a impunidade do agressor.',
          'Confrontos violentos e quebra de sigilo aumentam o risco para a vítima.',
          'Revisar a história explorando novas alternativas responsáveis.'
        ],
        legalRecommendations: [
          'Compreender as sanções e responsabilidades civis e socioeducativas previstas no ECA e Código Penal.'
        ],
        competencyStrengths: [
          'Identificação inicial de que havia algo errado na situação.'
        ],
        growthOpportunities: [
          'Vencer a barreira da conivência e do medo do que os outros vão pensar.',
          'Compreender que justiça não é vingança nem linchamento virtual.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // HISTÓRIA 2: A VOZ QUE FOI IGNORADA (Testemunhas Silenciosas & Bullying Físico)
  // --------------------------------------------------------------------------
  {
    id: 'a_voz_que_foi_ignorada',
    title: 'A Voz que Foi Ignorada',
    subtitle: 'O papel decisivo das testemunhas contra o isolamento e as agressões verbais veladas',
    synopsis: 'Mateus, um aluno novato que acabou de ingressar na escola de tempo integral, passa a ser alvo de zombarias diárias sobre seu sotaque e pertences. A turma percebe, mas a maioria se cala por medo de virar o próximo alvo. Como quebrar a barreira do silêncio?',
    category: 'exclusao',
    categoryLabel: 'Exclusão Social & Testemunhas Silenciosas',
    difficulty: 'medio',
    difficultyLabel: 'Nível 2 • Médio',
    estimatedDurationMinutes: 12,
    baseRewardXp: 120,
    maxScore: 125,
    coverTheme: {
      gradient: 'from-blue-900 via-indigo-900 to-purple-950',
      border: 'border-cyan-400/50',
      icon: '📢',
      tagBg: 'bg-cyan-500/20',
      tagText: 'text-cyan-300'
    },
    competenciesWorked: ['convivencia', 'respeito', 'emocional', 'direitos'],
    characters: [
      {
        id: 'mateus',
        name: 'Mateus Santos',
        role: 'Aluno Novato (Alvo de Zombaria)',
        avatarType: 'aluno_timido',
        description: 'Mudou-se recentemente de outra cidade do interior. Tem talento para artes visuais, mas se sente deslocado.',
        personality: 'Gentil, tímido e ansioso para ser aceito.',
        accentColor: '#38bdf8'
      },
      {
        id: 'gabriel',
        name: 'Gabriel Rios',
        role: 'Colega Veterano Intimidador',
        avatarType: 'aluno_lider',
        description: 'Gosta de ditar as regras dos grupos na quadra de esportes e usa apelidos depreciativos.',
        personality: 'Competitivo, irônico e inseguro por trás da fachada de valentão.',
        accentColor: '#f97316'
      },
      {
        id: 'leticia',
        name: 'Letícia Barros',
        role: 'Representante de Turma',
        avatarType: 'aluna_oculos',
        description: 'Aluna dedicada que busca mediar conflitos na sala de aula com justiça.',
        personality: 'Organizada, leal e atenta à inclusão escolar.',
        accentColor: '#ec4899'
      },
      {
        id: 'inspetor_carlos',
        name: 'Inspetor Carlos',
        role: 'Inspetor Escolar da EEMTI',
        avatarType: 'inspetor',
        description: 'Profissional com 15 anos de atuação na escola, conhece a rotina dos corredores e pátios.',
        personality: 'Atento, protetor e aberto a orientar os estudantes.',
        accentColor: '#10b981'
      }
    ],
    investigationItems: [
      {
        id: 'clue_diario_mateus',
        category: 'pista',
        title: 'Caderno de Desenhos Danificado',
        subtitle: 'Encontrado rasgado no chão da quadra',
        description: 'Caderno com ilustrações de Mateus com páginas pisoteadas e rabiscos depreciativos.',
        iconName: 'FileText',
        importance: 'critica',
        unlockAtAct: 1,
        contentDetails: {
          text: 'Páginas de desenho com pegadas de tênis e a inscrição "volta pro interior".',
          timestamp: 'Segunda-feira, 11:20',
          legalNote: 'Dano ao patrimônio individual e intimidação física velada (Art. 2º da Lei 13.185/2015).'
        }
      },
      {
        id: 'clue_relato_quadra',
        category: 'dialogo',
        title: 'Relato da Representante Letícia',
        subtitle: 'Conversa no vestiário',
        description: 'Letícia confirma que Gabriel vem escolhendo Mateus por último em todos os jogos para humilhá-lo.',
        iconName: 'Users',
        importance: 'critica',
        unlockAtAct: 2,
        contentDetails: {
          text: '"Não foi acidente o caderno ter caído. O Gabriel chutou de propósito quando o Mateus foi amarrar o tênis."',
          sender: 'Letícia Barros',
          timestamp: 'Segunda-feira, 13:40',
          legalNote: 'Violência psicológica reiterada e segregação social forçada.'
        }
      },
      {
        id: 'clue_cronologia_novato',
        category: 'cronologia',
        title: 'Histórico de Adaptação de Mateus',
        subtitle: 'Primeiras três semanas na escola',
        description: 'Linha do tempo mostrando que o isolamento começou na primeira semana e se intensificou nas aulas práticas.',
        iconName: 'Clock',
        importance: 'moderada',
        unlockAtAct: 3,
        contentDetails: {
          text: 'Semana 1: Piadas com o sotaque; Semana 2: Exclusão dos times da quadra; Semana 3: Destruição do caderno de arte.',
          legalNote: 'Caracterização de processo progressivo de hostilização e assédio moral escolar.'
        }
      },
      {
        id: 'clue_normas_inclusao',
        category: 'evidencia',
        title: 'Diretrizes de Acolhimento da EEMTI',
        subtitle: 'Regulamento de Convivência e Educação Integral',
        description: 'Documento oficial escolar garantindo que alunos recém-matriculados tenham tutoria fraterna e apoio inclusivo.',
        iconName: 'ShieldCheck',
        importance: 'critica',
        unlockAtAct: 4,
        contentDetails: {
          text: 'A política pedagógica de tempo integral proíbe qualquer trote ou ridicularização de alunos novos.',
          legalNote: 'Princípio da Igualdade e da Fraternidade Democrática (CF/88, Art. 205 e 206).'
        }
      }
    ],
    acts: [
      // ATO 1
      {
        actNumber: 1,
        actTitle: 'O Caderno na Quadra',
        sceneSetting: {
          location: 'Quadra Poliesportiva da EEMTI',
          timeOfDay: 'Segunda-feira, 11:20',
          atmosphere: 'Final da aula de Educação Física, barulho de bolas e risos',
          characterPresentId: 'mateus',
          sceneTheme: 'patio'
        },
        narrativa: 'Na aula de Educação Física, Mateus, que chegou à escola há apenas três semanas, é escolhido por último para a equipe. Durante a saída da quadra, Gabriel passa esbarrando no ombro de Mateus. O caderno de artes cai no chão e Gabriel pisa em cima "sem querer", chutando o objeto para longe com risadas dos colegas que estavam em volta. Mateus se abaixa para recolher as folhas rasgadas sem falar uma palavra, com lágrimas nos olhos.',
        currentDilemma: 'Várias testemunhas viram o acontecimento e fingiram não ver. O que você faz?',
        unlockedClueIds: ['clue_diario_mateus'],
        choices: [
          {
            letter: 'A',
            text: 'Abaixar-se imediatamente ao lado de Mateus, ajudá-lo a recolher as folhas com empatia e dizer em voz audível para a turma: "Esse trabalho de arte é muito bom, Mateus. Vou te ajudar a consertar".',
            impact: 'positivo',
            points: 25,
            whatHappened: 'O apoio público e respeitoso cortou o clima de zombaria na hora e fez Gabriel perder o apoio dos espectadores.',
            ethicalAnalysis: 'Ação afirmativa de testemunha solidária (Upstander) que neutraliza a humilhação no momento em que ela acontece.',
            practicalLearning: 'Apoiar publicamente quem foi atacado desarticula o poder do agressor sobre a audiência.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 2º',
              summary: 'O bullying se alimenta do silêncio da plateia; romper a cumplicidade coletiva é o passo essencial.'
            }
          },
          {
            letter: 'B',
            text: 'Ir atrás de Gabriel no vestiário e dar uma rasteira nele para que ele sinta o mesmo constrangimento.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A briga no vestiário resultou em suspensão para ambos e deixou Mateus ainda mais assustado com a violência na escola.',
            ethicalAnalysis: 'Revanchismo físico rebaixa você ao nível do agressor e multiplica a insegurança no colégio.',
            practicalLearning: 'Violência física só gera mais violência e afasta a solução pedagógica.',
            legalBasis: {
              law: 'ECA e Regimento Disciplinar',
              article: 'Infrações Disciplinares',
              summary: 'Vias de fato e agressão física constituem faltas graves sujeitas a advertência e suspensão.'
            }
          },
          {
            letter: 'C',
            text: 'Fingir que estava amarrando o tênis e esperar todos saírem da quadra para não se queimar com Gabriel.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'Mateus recolheu as folhas sozinho e concluiu que ninguém na escola se importava com ele.',
            ethicalAnalysis: 'O medo do julgamento dos pares perpetua a exclusão do mais vulnerável.',
            practicalLearning: 'O silêncio do espectador é a força do agressor.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 4º',
              summary: 'Necessidade de intervenção cidadã consciente contra a intimidação sistemática.'
            }
          },
          {
            letter: 'D',
            text: 'Dizer para Mateus: "Você também dá mole, devia deixar esse caderno na mochila em vez de trazer pra quadra".',
            impact: 'negativo',
            points: 5,
            whatHappened: 'Culpabilizar a vítima aumentou o sofrimento dela e deu razão injusta à atitude de Gabriel.',
            ethicalAnalysis: 'Culpabilização da vítima é um dos erros éticos mais destrutivos na convivência.',
            practicalLearning: 'A responsabilidade da agressão é sempre de quem agride, nunca de quem sofre a agressão.',
            legalBasis: {
              law: 'ECA',
              article: 'Art. 17',
              summary: 'Garantia do respeito e proteção integral à dignidade da pessoa humana em desenvolvimento.'
            }
          }
        ]
      },

      // ATO 2
      {
        actNumber: 2,
        actTitle: 'O Isolamento no Refeitório',
        sceneSetting: {
          location: 'Refeitório da EEMTI',
          timeOfDay: 'Segunda-feira, 12:45',
          atmosphere: 'Hora do almoço, mesas cheias e barulho de talheres',
          characterPresentId: 'leticia',
          sceneTheme: 'patio'
        },
        narrativa: 'Na hora do almoço da escola de tempo integral, Mateus pega sua bandeja e procura um lugar para sentar. Quando ele se aproxima de uma mesa onde estão Gabriel e outros colegas, Gabriel coloca a mochila no banco vazio e diz com ironia: "Aqui já está ocupado, amigo. Procura outra mesa". Mateus fica paralisado com a bandeja na mão procurando um canto no refeitório.',
        currentDilemma: 'Você está sentado com seus amigos em uma mesa próxima com lugares disponíveis. Como agir?',
        unlockedClueIds: ['clue_relato_quadra'],
        choices: [
          {
            letter: 'A',
            text: 'Chamar Mateus pelo nome com sorriso acolhedor, puxar uma cadeira ao seu lado e convidá-lo com naturalidade: "Mateus, senta aqui com a gente! Estávamos querendo falar de arte com você".',
            impact: 'positivo',
            points: 25,
            whatHappened: 'Mateus sentou-se aliviado, participou da conversa e a barreira social construída por Gabriel foi completamente rompida.',
            ethicalAnalysis: 'Inclusão ativa e empática que transforma a exclusão em acolhimento sem necessidade de agressividade.',
            practicalLearning: 'Convidar quem está isolado para a sua roda é o remédio mais eficaz contra o bullying social.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 2º, § 1º, VII',
              summary: 'A segregação social forçada é classificada como intimidação social. A integração é direito fundamental.'
            }
          },
          {
            letter: 'B',
            text: 'Levantar da mesa e derrubar a bandeja de Gabriel no chão para ensinar uma lição a ele.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A confusão no refeitório gerou desperdício de comida, advertência imediata e não melhorou a aceitação de Mateus.',
            ethicalAnalysis: 'Atitudes destrutivas só transferem o problema para outra forma de violência.',
            practicalLearning: 'Defender alguém não significa promover caos e desrespeito coletivo.',
            legalBasis: {
              law: 'Regimento Escolar',
              article: 'Normas de Convivência no Refeitório',
              summary: 'Perturbação da ordem e agressões em ambientes comunitários ensejam sanções imediatas.'
            }
          },
          {
            letter: 'C',
            text: 'Ficar em silêncio olhando para o prato e torcer para Mateus achar outra mesa antes que alguém repare.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'Mateus acabou almoçando sozinho na escada do pátio, reforçando sua sensação de rejeição.',
            ethicalAnalysis: 'A omissão cordial é confortável para quem assiste, mas dolorosa para quem é excluído.',
            practicalLearning: 'Quem vê a exclusão e não abre espaço é cúmplice do isolamento.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 3º',
              summary: 'Dever de promoção da cidadania ativa e da cultura de paz nas dependências escolares.'
            }
          },
          {
            letter: 'D',
            text: 'Mandar uma mensagem no grupo de WhatsApp da sala dizendo: "Gabriel foi muito vacilão agora no almoço".',
            impact: 'negativo',
            points: 5,
            whatHappened: 'Falar pelas costas não resolveu a situação no momento e gerou picuinhas e discussões virtuais inúteis.',
            ethicalAnalysis: 'Comentários paralelos em redes virtuais não substituem a ação solidária real na vida concreta.',
            practicalLearning: 'Apoie as pessoas no mundo real com atitudes reais em vez de reclamar em chats.',
            legalBasis: {
              law: 'Princípios de Convivência Ética',
              article: 'Resolução CNE',
              summary: 'Foco na mediação presencial e na cultura do diálogo transparente.'
            }
          }
        ]
      },

      // ATO 3
      {
        actNumber: 3,
        actTitle: 'O Desabafo com a Representante',
        sceneSetting: {
          location: 'Sala de Aula no Final do Turno',
          timeOfDay: 'Terça-feira, 16:40',
          atmosphere: 'Sala vazia, apenas você, Letícia e Mateus conversando',
          characterPresentId: 'leticia',
          sceneTheme: 'sala_aula'
        },
        narrativa: 'No final da tarde, Letícia, representante de turma, reúne você e Mateus para conversar sobre as atitudes de Gabriel. Mateus confessa que não quer causar problemas com a direção, mas não aguenta mais ser o alvo preferido de piadas sobre seu sotaque e sua condição de novato. Letícia sugere levar o caso para a coordenação em formato de círculo de diálogo restaurativo.',
        currentDilemma: 'Como apoiar Mateus para que a mediação ocorra de forma segura e sem gerar retaliações?',
        unlockedClueIds: ['clue_cronologia_novato'],
        choices: [
          {
            letter: 'A',
            text: 'Apoiar a sugestão de Letícia, oferecendo-se para acompanhar Mateus na coordenação e ajudá-lo a relatar os fatos com tranquilidade, enfatizando que o objetivo é construir respeito mútuo e não vingança.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'Mateus sentiu-se fortalecido pela companhia da representação estudantil e aceitou participar do processo restaurativo.',
            ethicalAnalysis: 'Excelente articulação do protagonismo juvenil e da liderança estudantil a serviço da dignidade humana.',
            practicalLearning: 'Acompanhar um colega com respeito institucional é o papel mais nobre que um estudante pode exercer.',
            legalBasis: {
              law: 'Lei nº 13.185/2015 e Lei nº 14.811/2024',
              article: 'Mediação Restaurativa Escolar',
              summary: 'Incentivo à escuta ativa e à resolução pacífica de conflitos no âmbito da comunidade escolar.'
            }
          },
          {
            letter: 'B',
            text: 'Dizer a Letícia que mediação é "conversa fiada" e que Mateus só vai ser respeitado se pagar alguém para dar um susto em Gabriel.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A sugestão violenta chocou Letícia e afastou Mateus de qualquer busca sadia por ajuda.',
            ethicalAnalysis: 'Desacreditar as instituições e propor métodos ilegais corrompe o ambiente pedagógico.',
            practicalLearning: 'A mediação e a lei são os únicos caminhos duradouros para a paz na escola.',
            legalBasis: {
              law: 'ECA e Código Penal',
              article: 'Art. 286 do CP',
              summary: 'Incitamento à prática de infrações no meio escolar é conduta ilícita.'
            }
          },
          {
            letter: 'C',
            text: 'Aconselhar Mateus a pedir transferência para outra escola pública para não ter mais dor de cabeça.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'Fazer a vítima fugir da escola premia a impunidade do agressor e causa prejuízo pedagógico severo a Mateus.',
            ethicalAnalysis: 'Quem tem que mudar de conduta é o agressor, nunca a vítima que tem direito inalienável à educação integral.',
            practicalLearning: 'Nunca aconselhe uma vítima a abrir mão do seu direito à educação.',
            legalBasis: {
              law: 'Constituição Federal de 1988',
              article: 'Art. 205',
              summary: 'A educação é direito de todos e dever do Estado, com garantia de permanência e qualidade.'
            }
          },
          {
            letter: 'D',
            text: 'Dizer que esse assunto é responsabilidade exclusiva de Letícia por ser representante e que você não quer se envolver.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'Letícia teve que conduzir tudo com sobrecarga e Mateus sentiu falta de mais colegas ao seu lado.',
            ethicalAnalysis: 'A responsabilidade pelo respeito não é apenas de cargos formais; é dever de todo cidadão na escola.',
            practicalLearning: 'A solidariedade é compromisso de todos, não apenas dos representantes.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 4º',
              summary: 'A mobilização de toda a comunidade escolar no combate à intimidação sistemática.'
            }
          }
        ]
      },

      // ATO 4
      {
        actNumber: 4,
        actTitle: 'O Círculo de Mediação Escolar',
        sceneSetting: {
          location: 'Sala de Mediação com Inspetor Carlos e Coordenação',
          timeOfDay: 'Quinta-feira, 14:00',
          atmosphere: 'Mesa redonda com os envolvidos e mediação empática',
          characterPresentId: 'inspetor_carlos',
          sceneTheme: 'coordenacao'
        },
        narrativa: 'A coordenação pedagógica e o Inspetor Carlos organizaram uma reunião de mediação restaurativa. Gabriel está sentado em frente a Mateus com postura inicialmente defensiva, alegando que "tudo não passou de brincadeira de Educação Física e que o pessoal se ofende por qualquer coisa hoje em dia". O Inspetor Carlos pede para você e Letícia darem seu depoimento como testemunhas presenciais da convivência.',
        currentDilemma: 'Como apresentar a realidade dos fatos sem agressividade, demonstrando o impacto real da zombaria?',
        unlockedClueIds: ['clue_normas_inclusao'],
        choices: [
          {
            letter: 'A',
            text: 'Explicar com calma e respeito que brincadeira de verdade faz todo mundo rir junto, mostrando como o caderno estragado e o isolamento no refeitório machucaram Mateus e afetaram sua vontade de estudar.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A fala serena e precisa desmontou o argumento de "brincadeira" e fez Gabriel finalmente enxergar a dor que causou.',
            ethicalAnalysis: 'Definição clássica e pedagógica: o limite entre brincadeira e bullying é o sofrimento do outro e a falta de reciprocidade.',
            practicalLearning: 'Demonstrar as consequências concretas da agressão desperta a empatia do agressor.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 1º, § 1º',
              summary: 'Conceituação legal de intimidação sistemática caracterizada por atos verbais, morais e materiais depreciativos reiterados.'
            }
          },
          {
            letter: 'B',
            text: 'Gritar que Gabriel é um monstro sem coração e exigir a expulsão imediata dele da escola.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'Gabriel se fechou completamente na defensiva e a mediação perdeu o foco educativo.',
            ethicalAnalysis: 'Ataques pessoais impedem o processo de reflexão e arrependimento que a justiça restaurativa busca alcançar.',
            practicalLearning: 'Aponte o erro da conduta, e não a destruição da pessoa.',
            legalBasis: {
              law: 'Diretrizes de Justiça Restaurativa',
              article: 'Resolução CNJ nº 225/2016',
              summary: 'Foco na responsabilização pelo dano e na restauração das relações interpessoais.'
            }
          },
          {
            letter: 'C',
            text: 'Ficar quieto e dizer que não lembra de nada porque prefere não se comprometer.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'A falta de testemunho firme enfraqueceu o relato e atrasou a resolução do caso.',
            ethicalAnalysis: 'Omitir a verdade quando solicitado por instâncias formais é conivência disfarçada.',
            practicalLearning: 'Dizer a verdade com respeito é ato de coragem cívica essencial.',
            legalBasis: {
              law: 'Regimento Escolar',
              article: 'Dever de Veracidade',
              summary: 'Dever dos membros da comunidade de colaborar com a apuração de fatos disciplinares com fidelidade.'
            }
          },
          {
            letter: 'D',
            text: 'Dizer que a culpa de tudo foi do professor de Educação Física que não olhou a quadra direito.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'Desviar a responsabilidade para terceiros tirou o peso das ações de quem realmente cometeu o ato.',
            ethicalAnalysis: 'Cada indivíduo deve ser responsabilizado por suas próprias escolhas e atitudes.',
            practicalLearning: 'Não tire o foco da responsabilidade de quem praticou a ofensa.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 2º',
              summary: 'Responsabilização pedagógica individual pelo ato de intimidação sistemática praticado.'
            }
          }
        ]
      },

      // ATO 5
      {
        actNumber: 5,
        actTitle: 'A Integração e o Projeto de Arte',
        sceneSetting: {
          location: 'Pátio Central da EEMTI - Mural de Convivência',
          timeOfDay: 'Três semanas depois',
          atmosphere: 'Exposição artística coletiva com desenhos dos estudantes',
          characterPresentId: 'mateus',
          sceneTheme: 'patio'
        },
        narrativa: 'Após o processo restaurativo, Gabriel se desculpou formalmente com Mateus e comprometeu-se a repor o caderno com novas folhas de desenho. Como ação comunitária proposta na mediação, a turma organizou um mural artístico com o tema "Diversidade e Convivência Sem Preconceitos". Mateus foi convidado para coordenar os desenhos principais do mural.',
        currentDilemma: 'Qual iniciativa você propõe para perenizar o acolhimento a novos alunos que chegam à escola ao longo do ano?',
        unlockedClueIds: [],
        choices: [
          {
            letter: 'A',
            text: 'Criar o "Comitê de Boas-Vindas e Tutoria de Pares", no qual estudantes veteranos acolhem cada aluno novato, apresentam a escola e promovem integração imediata nas turmas.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A iniciativa eliminou trotes e preconceitos na EEMTI e tornou a chegada de novos alunos uma experiência feliz e acolhedora.',
            ethicalAnalysis: 'Solução sistêmica e proativa: transforma um problema superado em política permanente de inclusão escolar.',
            practicalLearning: 'O melhor combate ao bullying é a criação de estruturas acolhedoras de pertencimento.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 4º, III',
              summary: 'Instituição de práticas de assistência psicológica, social e pedagógica aos alunos.'
            }
          },
          {
            letter: 'B',
            text: 'Pedir que novatos fiquem em salas separadas nos primeiros meses para que não sofram preconceito dos veteranos.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A segregação institucionalizada gerou discriminação ainda maior e revolta geral.',
            ethicalAnalysis: 'Segregar para "proteger" é uma contradição ética e pedagógica que reforça o preconceito.',
            practicalLearning: 'A inclusão se faz convivendo e aprendendo juntos, nunca separando.',
            legalBasis: {
              law: 'LDB (Lei 9.394/1996) e ECA',
              article: 'Princípios da Educação Inclusiva',
              summary: 'Garantia de convivência igualitária e plural sem qualquer forma de segregação de estudantes.'
            }
          },
          {
            letter: 'C',
            text: 'Não fazer nada adicional, pois Gabriel já pediu desculpas e isso já é suficiente.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'O caso foi resolvido, mas o próximo aluno novato que chegou meses depois enfrentou as mesmas dificuldades.',
            ethicalAnalysis: 'Tratar os sintomas sem tratar a causa estrutural permite que velhos hábitos retornem.',
            practicalLearning: 'Aprender com os erros significa criar melhorias que sirvam para todos os futuros colegas.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 5º',
              summary: 'Dever contínuo de aprimoramento das práticas de acolhimento e convivência escolar.'
            }
          },
          {
            letter: 'D',
            text: 'Exigir que a escola puna com transferência compulsória qualquer um que faça brincadeiras em sala.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'O clima de medo de punição excessiva aumentou a tensão e diminuiu a espontaneidade saudável dos estudantes.',
            ethicalAnalysis: 'Punições desmedidas e generalizadas geram insegurança jurídica e não educam.',
            practicalLearning: 'O equilíbrio pedagógico busca a consciência e o respeito, e não o terror disciplinar.',
            legalBasis: {
              law: 'Regimento Escolar e ECA',
              article: 'Proporcionalidade das Medidas',
              summary: 'As sanções disciplinares devem ser proporcionais e orientadas pela função educativa.'
            }
          }
        ]
      }
    ],
    outcomes: [
      {
        id: 'acolhimento_exemplar',
        title: 'Líder Transformador da Inclusão Escolar',
        subtitle: 'Você quebrou o silêncio da multidão e acolheu quem precisava',
        badgeTitle: '🏆 Medalha Voz Ativa do Respeito',
        description: 'Parabéns! Você demonstrou como uma única testemunha decidida pode mudar o destino de uma turma inteira. Ao apoiar Mateus no momento certo e transformar o sofrimento em uma política permanente de boas-vindas, você provou que o respeito se constrói na prática!',
        minScore: 100,
        maxScore: 125,
        summaryKeyTakeaways: [
          'Intervenção solidária rápida no momento do ataque.',
          'Inclusão concreta no refeitório quebrando a segregação.',
          'Mediação restaurativa que gerou conscientização e pedido sincero de desculpas.',
          'Criação do comitê de acolhimento para novatos.'
        ],
        legalRecommendations: [
          'Baseado na Lei 13.185/2015 (Programa de Combate à Intimidação Sistemática).',
          'Atende ao ECA (art. 17 e 18) na garantia do respeito à dignidade de todo educando.'
        ],
        competencyStrengths: [
          'Empatia ativa e liderança comunitária',
          'Resolução pacífica de conflitos interpessoais',
          'Inclusão e combate à discriminação'
        ],
        growthOpportunities: [
          'Incentivar mais colegas a exercerem a tutoria solidária em suas turmas.'
        ]
      },
      {
        id: 'acolhimento_moderado',
        title: 'Participação Positiva com Aprendizados Práticos',
        subtitle: 'Houve boas escolhas, mas ainda com receio da pressão dos colegas',
        badgeTitle: '🥈 Distintivo de Convivência Solidária',
        description: 'Você apoiou Mateus em momentos importantes, mas hesitou em outros devido à preocupação com a aceitação social. Lembre-se de que o primeiro passo para a liderança ética é defender o que é certo mesmo quando a maioria hesita.',
        minScore: 65,
        maxScore: 99,
        summaryKeyTakeaways: [
          'Bom acolhimento individual ao colega em vulnerabilidade.',
          'Necessidade de maior firmeza diante do silêncio dos espectadores.',
          'Oportunidade de propor ações estruturantes de acolhimento.'
        ],
        legalRecommendations: [
          'Compreender as diretrizes da educação inclusiva e dos direitos humanos.'
        ],
        competencyStrengths: [
          'Sensibilidade para identificar o sofrimento alheio.'
        ],
        growthOpportunities: [
          'Vencer a inibição social e liderar com mais coragem diante do grupo.'
        ]
      },
      {
        id: 'acolhimento_insuficiente',
        title: 'Necessidade de Desenvolvimento Empático',
        subtitle: 'A inércia e a culpabilização da vítima exigem profunda reflexão',
        badgeTitle: '⚠️ Alerta de Sensibilização',
        description: 'Suas decisões tenderam à passividade ou à culpabilização da vítima. No ambiente escolar, novatos necessitam de acolhimento fraterno e suporte comunitário. Revisite o caso e descubra como uma postura solidária faz toda a diferença.',
        minScore: 0,
        maxScore: 64,
        summaryKeyTakeaways: [
          'Nunca culpabilize a vítima pela agressão sofrida.',
          'O silêncio diante da injustiça fortalece a impunidade.',
          'Repetir a história praticando a escuta empática.'
        ],
        legalRecommendations: [
          'Estudo das obrigações da Lei 13.185/2015 de não conivência.'
        ],
        competencyStrengths: [
          'Observação da rotina escolar.'
        ],
        growthOpportunities: [
          'Desenvolver empatia ativa e acolhimento incondicional.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // HISTÓRIA 3: O BANHEIRO DA ESCOLA (Grafite, Difamação Institucional & Diálogo)
  // --------------------------------------------------------------------------
  {
    id: 'o_banheiro_da_escola',
    title: 'O Banheiro da Escola',
    subtitle: 'Difamação por pichação, ataques anônimos a reputações e reparação restaurativa',
    synopsis: 'Uma pichação ofensiva surge na porta do banheiro da escola com o nome de uma aluna e mentiras sobre sua vida íntima. A fofoca se espalha pelos corredores em minutos. Como agir para conter os boatos, preservar a dignidade e identificar a responsabilidade com justiça?',
    category: 'conflitos',
    categoryLabel: 'Difamação Escolar & Gestão de Conflitos',
    difficulty: 'dificil',
    difficultyLabel: 'Nível 3 • Difícil',
    estimatedDurationMinutes: 14,
    baseRewardXp: 140,
    maxScore: 125,
    coverTheme: {
      gradient: 'from-fuchsia-950 via-purple-900 to-indigo-950',
      border: 'border-pink-400/50',
      icon: '🎨',
      tagBg: 'bg-pink-500/20',
      tagText: 'text-pink-300'
    },
    competenciesWorked: ['direitos', 'bullying', 'convivencia', 'respeito'],
    characters: [
      {
        id: 'mariana',
        name: 'Mariana Costa',
        role: 'Aluna Vítima de Difamação',
        avatarType: 'aluna_oculos',
        description: 'Estudante dedicada que concorria à liderança do grêmio estudantil. Foi alvo de pichações difamatórias para desestabilizá-la.',
        personality: 'Inteligente, articulada, profundamente abalada pela humilhação pública.',
        accentColor: '#f43f5e'
      },
      {
        id: 'felipe',
        name: 'Felipe Ramos',
        role: 'Adversário no Grêmio',
        avatarType: 'aluno_lider',
        description: 'Aluno competitivo que disputa a chapa do grêmio com Mariana.',
        personality: 'Estrategista, impetuoso, precisa aprender limites éticos.',
        accentColor: '#eab308'
      },
      {
        id: 'prof_helena',
        name: 'Coordenadora Helena',
        role: 'Coordenadora Pedagógica',
        avatarType: 'coordenadora',
        description: 'Defensora da cultura de paz e mediação institucional na EEMTI.',
        personality: 'Firme, técnica e empática.',
        accentColor: '#a855f7'
      },
      {
        id: 'inspetor_carlos',
        name: 'Inspetor Carlos',
        role: 'Inspetor da EEMTI',
        avatarType: 'inspetor',
        description: 'Responsável pela conservação predial e segurança dos ambientes coletivos.',
        personality: 'Zeloso e protetor dos estudantes.',
        accentColor: '#10b981'
      }
    ],
    investigationItems: [
      {
        id: 'clue_pichacao_porta',
        category: 'pista',
        title: 'Inscrição Ofensiva na Porta',
        subtitle: 'Porta da cabine do banheiro do bloco B',
        description: 'Frases difamatórias escritas com caneta permanente de ponta grossa contra Mariana.',
        iconName: 'FileText',
        importance: 'critica',
        unlockAtAct: 1,
        contentDetails: {
          text: 'Ofensas morais e imputação de condutas vexatórias sem qualquer base na realidade.',
          timestamp: 'Terça-feira, 09:10',
          legalNote: 'Calúnia e difamação (Arts. 138 e 139 do Código Penal), agravadas por ato infracional no ECA.'
        }
      },
      {
        id: 'clue_marcador_azul',
        category: 'evidencia',
        title: 'Marcador Permanente Azul',
        subtitle: 'Encontrado descartado na lixeira do pátio',
        description: 'Caneta com a mesma tinta e espessura utilizada na porta do banheiro.',
        iconName: 'ShieldCheck',
        importance: 'critica',
        unlockAtAct: 2,
        contentDetails: {
          text: 'Objeto de mesma marca e lote vendido na papelaria em frente ao colégio.',
          legalNote: 'Elemento material para apuração técnica sem necessidade de linchamento coletivo.'
        }
      },
      {
        id: 'clue_relato_mariana',
        category: 'dialogo',
        title: 'Depoimento de Mariana',
        subtitle: 'Conversa no intervalo',
        description: 'Mariana chora e relata o choque ao ver as fotos da pichação circulando em grupos de WhatsApp.',
        iconName: 'Users',
        importance: 'critica',
        unlockAtAct: 3,
        contentDetails: {
          text: '"Estão me atacando porque sabem que nossa chapa tem propostas de verdade pro grêmio. Querem que eu desista da eleição."',
          sender: 'Mariana Costa',
          timestamp: 'Terça-feira, 10:20',
          legalNote: 'Violência política de gênero e violação da dignidade individual (Lei 14.192/2021 e ECA).'
        }
      },
      {
        id: 'clue_cronologia_campanha',
        category: 'cronologia',
        title: 'Cronologia das Eleições do Grêmio',
        subtitle: 'Período eleitoral estudantil',
        description: 'Linha do tempo mostrando que os ataques começaram logo após o debate das chapas concorrentes.',
        iconName: 'Clock',
        importance: 'moderada',
        unlockAtAct: 2,
        contentDetails: {
          text: 'Sexta: Debate eleitoral com vitória expressiva da chapa de Mariana; Segunda: Boatos em salas; Terça: Pichação no banheiro.',
          legalNote: 'Motivação eleitoral estudantil evidente exigindo intervenção pedagógica sobre ética política.'
        }
      }
    ],
    acts: [
      // ATO 1
      {
        actNumber: 1,
        actTitle: 'O Boato no Intervalo',
        sceneSetting: {
          location: 'Corredor do Bloco B da EEMTI',
          timeOfDay: 'Terça-feira, 09:30',
          atmosphere: 'Grupos de alunos tirando fotos com celulares na porta do banheiro',
          characterPresentId: 'mariana',
          sceneTheme: 'corredor'
        },
        narrativa: 'Uma movimentação atípica chama atenção perto dos banheiros do Bloco B. Alunos entram, dão risadas e apontam as câmeras dos celulares para dentro. Na porta de uma das cabines, alguém escreveu frases difamatórias gravíssimas contra Mariana, candidata à presidência do Grêmio Estudantil. Vários alunos já tiraram fotos da pichação e começaram a encaminhar nos grupos de turma com comentários maliciosos.',
        currentDilemma: 'As fotos estão começando a se espalhar. Como agir imediatamente para conter a difamação e proteger a dignidade de Mariana?',
        unlockedClueIds: ['clue_pichacao_porta'],
        choices: [
          {
            letter: 'A',
            text: 'Informar imediatamente e em particular o Inspetor Carlos para que a porta seja limpa/isolada na hora, e pedir firmemente aos colegas da roda que apaguem as fotos e parem de compartilhar material difamatório.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'O inspetor isolou o local imediatamente, apagou a pichação com produto específico e a contenção rápida evitou que o boato viralizasse pela escola.',
            ethicalAnalysis: 'Excelente proatividade: cortar o oxigênio da difamação no primeiro momento protege a honra da vítima e impede a multiplicação do dano.',
            practicalLearning: 'Agir rápido para apagar e não compartilhar mensagens vexatórias é o dever mais urgente de cidadania digital.',
            legalBasis: {
              law: 'Código Penal e Lei nº 14.811/2024',
              article: 'Art. 139 do CP',
              summary: 'Difamação é crime; quem compartilha conteúdo sabidamente falso ou injurioso incorre em corresponsabilidade civil e disciplinar.'
            }
          },
          {
            letter: 'B',
            text: 'Tirar uma foto da pichação em alta resolução e postar no status do WhatsApp com a legenda: "Olhem o absurdo que fizeram com a Mariana!".',
            impact: 'negativo',
            points: 5,
            whatHappened: 'Mesmo com a intenção de reclamar, a postagem fez a pichação ser vista por centenas de pessoas que nem sabiam do fato.',
            ethicalAnalysis: 'Compartilhar a ofensa, mesmo criticando, amplifica o dano e humilha a vítima em proporção geométrica.',
            practicalLearning: 'Nunca reposte nem compartilhe o conteúdo da ofensa. A melhor denúncia é levar a prova aos canais certos em sigilo.',
            legalBasis: {
              law: 'ECA e Marco Civil da Internet',
              article: 'Art. 17 do ECA',
              summary: 'O respeito à intimidade veda a circulação indiscriminada de ataques à honra alheia.'
            }
          },
          {
            letter: 'C',
            text: 'Entrar no banheiro e escrever ao lado xingamentos contra a chapa adversária para "fazer justiça com a mesma moeda".',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A porta ficou completamente vandalizada, a eleição virou uma guerra de agressões e você foi flagrado pichando o patrimônio público.',
            ethicalAnalysis: 'Vandalismo e difamação mútua desmoralizam qualquer processo democrático escolar.',
            practicalLearning: 'Responder à falta de ética com mais infração só aprofunda o problema.',
            legalBasis: {
              law: 'Lei de Crimes Ambientais (Lei 9.605/1998)',
              article: 'Art. 65',
              summary: 'Pichação em patrimônio público é crime ambiental, sujeito a medidas socioeducativas rigorosas.'
            }
          },
          {
            letter: 'D',
            text: 'Fingir que não viu nada e seguir para a aula de Matemática.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'As fotos circularam livremente por horas e Mariana entrou em pânico quando viu a difamação no recreio.',
            ethicalAnalysis: 'A omissão diante da violação da dignidade de uma colega permite que a maldade ganhe força.',
            practicalLearning: 'Preservar a escola limpa e respeitosa é obrigação de todos os estudantes.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 4º',
              summary: 'A comunidade escolar deve ser protagonista ativa na contenção de agressões verbais e morais.'
            }
          }
        ]
      },

      // ATO 2
      {
        actNumber: 2,
        actTitle: 'O Rastreador de Pistas',
        sceneSetting: {
          location: 'Pátio próximo às Lixeiras da EEMTI',
          timeOfDay: 'Terça-feira, 10:45',
          atmosphere: 'Inspeção discreta com o Inspetor Carlos',
          characterPresentId: 'inspetor_carlos',
          sceneTheme: 'patio'
        },
        narrativa: 'O Inspetor Carlos limpou a porta do banheiro com solvente e solicitou apoio discreto para compreender o que aconteceu antes de envolver a gestão pedagógica. Próximo à lixeira do pátio do bloco B, você avista um marcador permanente azul de ponta chanfrada descartado recentemente. Pouco antes, você viu um apoiador da chapa de Felipe saindo apressado daquela área com as pontas dos dedos manchadas de azul.',
        currentDilemma: 'Como lidar com essa pista de maneira justa, técnica e sem acusações precipitadas?',
        unlockedClueIds: ['clue_marcador_azul', 'clue_cronologia_campanha'],
        choices: [
          {
            letter: 'A',
            text: 'Recolher o marcador sem danificar vestígios, entregá-lo ao Inspetor Carlos com discrição e relatar o que observou sem inventar nada, recomendando que a coordenação converse com as chapas do grêmio sobre ética na campanha.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A evidência foi guardada com cuidado, permitindo que a coordenação abordasse os estudantes com fatos concretos e sem linchamento público.',
            ethicalAnalysis: 'Atuação ética exemplar: colaboração honesta com as autoridades escolares baseada em fatos e respeito à presunção de inocência.',
            practicalLearning: 'Pistas e fatos devem ser levados a quem tem responsabilidade institucional de mediar com serenidade.',
            legalBasis: {
              law: 'Regimento Escolar e ECA',
              article: 'Procedimentos de Apuração Disciplinar',
              summary: 'A averiguação de fatos disciplinares deve pautar-se pela busca da verdade material e pelo contraditório com escuta qualificada.'
            }
          },
          {
            letter: 'B',
            text: 'Pegar o marcador, subir na mesa do pátio e gritar: "O Felipe é o culpado, achei a caneta dele, vamos expulsar a chapa dele agora!".',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A acusação sem provas cabais gerou briga generalizada entre as torcidas das chapas e quase cancelou a eleição do grêmio.',
            ethicalAnalysis: 'Acusações inflamadas sem apuração técnica configuram calúnia e alimentam a intolerância política.',
            practicalLearning: 'Investigação responsável exige sigilo e ponderação, não discursos justiceiros.',
            legalBasis: {
              law: 'Código Penal',
              article: 'Art. 138',
              summary: 'Calúnia: imputar falsamente a alguém fato definido como crime enseja penalização.'
            }
          },
          {
            letter: 'C',
            text: 'Esconder o marcador no próprio bolso e não falar nada para ninguém para não "ficar mal falado com o pessoal do grêmio".',
            impact: 'neutro',
            points: 10,
            whatHappened: 'A apuração ficou sem pistas materiais e o autor da difamação continuou impune.',
            ethicalAnalysis: 'Reter informações por medo de reprovação social sabota a justiça e a proteção da vítima.',
            practicalLearning: 'A lealdade mal compreendida aos colegas nunca deve estar acima da verdade e do respeito.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 4º',
              summary: 'A conivência passiva enfraquece as medidas institucionais de proteção.'
            }
          },
          {
            letter: 'D',
            text: 'Jogar o marcador longe na rua para que ninguém descubra nada e a eleição continue normalmente.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'Destruir a evidência impediu que a escola fizesse o trabalho restaurativo e deixou Mariana desamparada.',
            ethicalAnalysis: 'Fraudar ou destruir elementos de esclarecimento é falta ética grave de obstrução da verdade.',
            practicalLearning: 'Nunca oculte elementos que ajudem a restaurar a dignidade de quem foi atacado.',
            legalBasis: {
              law: 'Código Penal',
              article: 'Art. 347',
              summary: 'Inovação artificiosa e ocultação de elementos de apuração em procedimentos oficiais.'
            }
          }
        ]
      },

      // ATO 3
      {
        actNumber: 3,
        actTitle: 'O Acolhimento de Mariana',
        sceneSetting: {
          location: 'Sala do Grêmio Estudantil',
          timeOfDay: 'Terça-feira, 11:30',
          atmosphere: 'Mariana chorando ao lado de duas amigas da chapa',
          characterPresentId: 'mariana',
          sceneTheme: 'sala_aula'
        },
        narrativa: 'Mariana está desolada na sala do Grêmio. Ela diz que vai retirar a candidatura da chapa porque sente que sua reputação foi arruinada para sempre na escola. Suas amigas tentam consolá-la, mas a sensação de impotência é enorme. Felipe, líder da chapa concorrente, passa no corredor e parece desconfortável ao ver a cena, mas não diz nada.',
        currentDilemma: 'Como apoiar Mariana a manter sua autoestima e transformar o ataque em um momento de conscientização democrática?',
        unlockedClueIds: ['clue_relato_mariana'],
        choices: [
          {
            letter: 'A',
            text: 'Acolher Mariana com palavras de apoio sincero, lembrando-a de que difamações anônimas são a arma dos covardes e propondo que a coordenação faça uma assembleia com ambas as chapas para debater a ética no processo eleitoral.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'Mariana recuperou a confiança, sentiu o apoio da comunidade e não desistiu de sua participação cidadã na escola.',
            ethicalAnalysis: 'Empatia e fortalecimento da vítima com canalização positiva da dor para a formação democrática.',
            practicalLearning: 'Apoiar quem sofreu ataques políticos estudantis fortalece a representatividade e a justiça.',
            legalBasis: {
              law: 'ECA e Lei nº 14.192/2021',
              article: 'Combate à Violência Política',
              summary: 'Incentivo à participação política de jovens e proteção contra violência moral e de gênero.'
            }
          },
          {
            letter: 'B',
            text: 'Concordar que ela deve desistir mesmo, pois "mulher que entra em disputa eleitoral na escola tem que aguentar esse tipo de coisa".',
            impact: 'negativo',
            points: 0,
            whatHappened: 'O comentário machista e desumano aprofundou o trauma de Mariana e reforçou o preconceito de gênero na escola.',
            ethicalAnalysis: 'Machismo e preconceito explícitos que violam a dignidade e os direitos humanos fundamentais.',
            practicalLearning: 'A violência política de gênero deve ser combatida com rigor absoluto em qualquer idade.',
            legalBasis: {
              law: 'Constituição Federal e Lei nº 14.192/2021',
              article: 'Art. 5º da CF/88',
              summary: 'Homens e mulheres são iguais em direitos e obrigações; vedada qualquer discriminação atentatória aos direitos e liberdades.'
            }
          },
          {
            letter: 'C',
            text: 'Propor que a chapa de Mariana faça uma pichação idêntica contra Felipe no banheiro masculino para empatar o placar.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A sugestão absurda destruiria a autoridade moral da chapa de Mariana e rebaixaria a política estudantil à sarjeta.',
            ethicalAnalysis: 'Olho por olho só deixa a escola inteira cega e sem futuro.',
            practicalLearning: 'Nunca adote os métodos do seu agressor se você quer defender a justiça.',
            legalBasis: {
              law: 'Princípios Éticos e Regimento',
              article: 'Diretrizes Democráticas',
              summary: 'A condução do Grêmio Estudantil deve espelhar a ética cívica e os valores da cidadania.'
            }
          },
          {
            letter: 'D',
            text: 'Dizer que política estudantil é besteira e que o melhor é ninguém votar em grêmio nenhum.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'Mariana sentiu desdém pelo seu esforço comunitário e a apatia política aumentou entre os colegas.',
            ethicalAnalysis: 'O desinteresse cínico corrompe o aprendizado da cidadania participativa na escola de tempo integral.',
            practicalLearning: 'A política escolar é o primeiro laboratório de democracia dos jovens.',
            legalBasis: {
              law: 'Lei do Grêmio Livre (Lei nº 7.398/1985)',
              article: 'Art. 1º',
              summary: 'Assegura a organização de grêmios estudantis como entidades autônomas representativas dos estudantes.'
            }
          }
        ]
      },

      // ATO 4
      {
        actNumber: 4,
        actTitle: 'O Círculo Restaurativo Eleitoral',
        sceneSetting: {
          location: 'Auditório da EEMTI',
          timeOfDay: 'Quarta-feira, 14:00',
          atmosphere: 'Membros de ambas as chapas reunidos com a Coordenadora Helena',
          characterPresentId: 'prof_helena',
          sceneTheme: 'coordenacao'
        },
        narrativa: 'A Coordenadora Helena reúne os membros de ambas as chapas concorrentes no auditório da escola. Graças à apuração discreta com o Inspetor Carlos, um estudante da chapa de Felipe admite, envergonhado, que comprou o marcador e fez a pichação no impulso de prejudicar Mariana após o debate. Felipe, chocado, afirma que não sabia do plano e pede desculpas pelo comportamento de seu colega de chapa. A Coordenadora Helena abre a palavra para sugestões sobre como reparar o dano causado à escola e à Mariana.',
        currentDilemma: 'Qual deve ser a medida de reparação justa, ética e pedagógica para o caso?',
        unlockedClueIds: [],
        choices: [
          {
            letter: 'A',
            text: 'Propor que o autor repinte voluntariamente as portas do banheiro com apoio do inspetor, faça uma retratação pública formal em assembleia das chapas reconhecendo a mentira e que as duas chapas assinem um Termo de Compromisso Ético e Campanha Limpa.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A reparação material e moral foi cumprida integralmente, Mariana teve sua honra restabelecida perante todos e a eleição ocorreu com respeito exemplar.',
            ethicalAnalysis: 'Aplicação perfeita da Justiça Restaurativa: reparação concreta do dano, reconhecimento público do erro e restabelecimento da verdade.',
            practicalLearning: 'Reparar o dano com as próprias mãos ensina responsabilidade real muito mais do que suspensões ociosas em casa.',
            legalBasis: {
              law: 'Lei nº 13.185/2015 e Diretrizes Restaurativas',
              article: 'Art. 4º da Lei 13.185',
              summary: 'Práticas pedagógicas restaurativas priorizam a reparação do dano e a restauração dos laços comunitários.'
            }
          },
          {
            letter: 'B',
            text: 'Exigir que a polícia seja chamada na escola para prender o estudante e que ele seja expulso imediatamente de todas as escolas do Ceará.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A proposta punitivista extrema desconsiderou a finalidade educativa da escola e gerou pânico desnecessário entre os jovens.',
            ethicalAnalysis: 'Sanções draconianas negam a missão educacional e formadora das instituições de ensino público.',
            practicalLearning: 'A escola deve primeiro educar e restaurar antes de recorrer a punições estigmatizantes.',
            legalBasis: {
              law: 'ECA',
              article: 'Art. 100',
              summary: 'Princípio da intervenção mínima e proporcionalidade das medidas em âmbito educacional e protetivo.'
            }
          },
          {
            letter: 'C',
            text: 'Propor que a eleição seja cancelada para sempre e a direção da escola passe a escolher quem manda no grêmio.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'O cancelamento autoritário destruiu a conquista histórica da autonomia estudantil na EEMTI.',
            ethicalAnalysis: 'Punir toda a comunidade pelo erro de um indivíduo é injusto e suprime a democracia jovem.',
            practicalLearning: 'Problemas na democracia se resolvem com mais ética e transparência, nunca com autoritarismo.',
            legalBasis: {
              law: 'Lei do Grêmio Livre (Lei nº 7.398/1985)',
              article: 'Garantia de Autonomia',
              summary: 'Vedada a intervenção indevida da administração escolar no processo eletivo estudantil.'
            }
          },
          {
            letter: 'D',
            text: 'Dizer que basta dar um abraço de mentira na frente da coordenadora e fingir que nada aconteceu.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'A reconciliação superficial não reparou a porta estragada nem desfez a mentira para a turma toda.',
            ethicalAnalysis: 'Superficialidade não é restauração: sem reparação concreta do dano, a lição ética se perde.',
            practicalLearning: 'Desculpas sinceras exigem ações práticas de reparação do que foi quebrado ou ofendido.',
            legalBasis: {
              law: 'Princípios da Justiça Restaurativa',
              article: 'Resolução CNJ 225/2016',
              summary: 'A restauração exige comprometimento ativo e voluntário com a reparação dos danos materiais e morais.'
            }
          }
        ]
      },

      // ATO 5
      {
        actNumber: 5,
        actTitle: 'O Debate Ético e o Legado',
        sceneSetting: {
          location: 'Pátio da EEMTI - Debate Geral do Grêmio',
          timeOfDay: 'Sexta-feira, 15:30',
          atmosphere: 'Auditório lotado, debate respeitoso entre as chapas',
          characterPresentId: 'mariana',
          sceneTheme: 'patio'
        },
        narrativa: 'O debate final do grêmio estudantil acontece no pátio com a presença de toda a escola. Mariana e Felipe apresentam suas propostas com elevado nível de civilidade. Antes de iniciarem os debates de projetos, ambas as chapas leem em conjunto o "Código de Ética e Respeito Estudantil da EEMTI Alfredo Machado", sob aplausos calorosos de professores e estudantes.',
        currentDilemma: 'Como assegurar que a preservação do patrimônio e o respeito à honra dos estudantes permaneçam no DNA da escola?',
        unlockedClueIds: [],
        choices: [
          {
            letter: 'A',
            text: 'Propor a criação do "Mural das Ideias e Arte Urbana", destinando espaços adequados e bonitos para manifestações artísticas e políticas dos alunos, combinando respeito ao patrimônio público e liberdade de expressão.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A escola canalizou a energia dos jovens para arte mural positiva, zerando pichações em banheiros e fortalecendo o orgulho pelo prédio escolar.',
            ethicalAnalysis: 'Brilhante transformação! Em vez de apenas proibir, a comunidade ofereceu canais legítimos, belos e participativos de expressão.',
            practicalLearning: 'Oferecer espaços adequados para a voz dos jovens é a melhor resposta contra o vandalismo destrutivo.',
            legalBasis: {
              law: 'Constituição Federal e BNCC',
              article: 'Art. 215 da CF/88',
              summary: 'Garantia do pleno exercício dos direitos culturais e apoio à valorização das manifestações artísticas na escola.'
            }
          },
          {
            letter: 'B',
            text: 'Instalar câmeras de vigilância dentro das cabines dos banheiros para monitorar tudo.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A proposta absurda violou grosseiramente a privacidade e a intimidade dos alunos, configurando crime gravíssimo.',
            ethicalAnalysis: 'Vigilância sobre a intimidade corporal é ilegal, imoral e viola diretamente o ECA e a Constituição.',
            practicalLearning: 'Segurança nunca pode violar a intimidade e a privacidade corporal das pessoas.',
            legalBasis: {
              law: 'ECA e Constituição Federal',
              article: 'Art. 17 do ECA e Art. 5º, X da CF/88',
              summary: 'Inviolabilidade da intimidade, da vida privada e da dignidade da pessoa humana.'
            }
          },
          {
            letter: 'C',
            text: 'Proibir que os alunos usem canetas dentro da escola a menos que o professor autorize.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A regra absurda atrapalhou os estudos e gerou protestos cômicos da turma toda.',
            ethicalAnalysis: 'Censura a materiais pedagógicos não resolve o problema moral da conduta.',
            practicalLearning: 'Educação para o respeito é o único caminho; proibições tolas só geram descrédito.',
            legalBasis: {
              law: 'LDB (Lei 9.394/1996)',
              article: 'Art. 3º',
              summary: 'Liberdade de aprender, ensinar, pesquisar e divulgar o pensamento, a arte e o saber.'
            }
          },
          {
            letter: 'D',
            text: 'Deixar tudo como está e torcer para o ano que vem não ter outra pichação.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'Sem canais adequados de expressão, novas manifestações desordenadas surgiram no semestre seguinte.',
            ethicalAnalysis: 'Falta de visão preventiva de longo prazo.',
            practicalLearning: 'Bons gestores criam soluções sustentáveis para os problemas da comunidade.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 4º',
              summary: 'Construção contínua de estratégias de prevenção e convivência harmoniosa.'
            }
          }
        ]
      }
    ],
    outcomes: [
      {
        id: 'mediador_cidadao',
        title: 'Mediador Cidadão Exemplar',
        subtitle: 'Você protegeu a honra de uma colega e fortaleceu a democracia escolar',
        badgeTitle: '🏆 Medalha Defensor da Verdade e da Democracia',
        description: 'Excelente desempenho! Você soube combater a difamação anônima na raiz, evitou a viralização de boatos tóxicos, acolheu Mariana e ajudou a escola a construir um desfecho restaurativo inesquecível. Sua maturidade prova que a convivência democrática é o caminho para a paz!',
        minScore: 100,
        maxScore: 125,
        summaryKeyTakeaways: [
          'Ação imediata para apagar e não propagar materiais difamatórios.',
          'Resguardo de evidências com discrição e respeito à verdade.',
          'Acolhimento da vítima e combate à violência política de gênero.',
          'Reparação restaurativa com criação de murais artísticos legítimos.'
        ],
        legalRecommendations: [
          'Conhecimento das tipificações de injúria, calúnia e difamação (CP).',
          'Aplicação dos princípios de integridade pública e cidadania participativa da Lei do Grêmio Livre.'
        ],
        competencyStrengths: [
          'Proteção da honra e dos direitos fundamentais',
          'Gestão democrática e mediação participativa de conflitos',
          'Preservação e valorização do patrimônio comunitário'
        ],
        growthOpportunities: [
          'Participar como jovem ouvidor ou mediador oficial no Grêmio Estudantil.'
        ]
      },
      {
        id: 'mediador_parcial',
        title: 'Participação Consciente com Aprendizados de Ética',
        subtitle: 'Bons propósitos, mas com momentos de hesitação na contenção dos boatos',
        badgeTitle: '🥈 Distintivo de Consciência Cívica',
        description: 'Você compreendeu a injustiça sofrida por Mariana e colaborou para a resolução do caso, mas ainda precisa treinar o combate mais incisivo ao compartilhamento de fofocas e prints ofensivos.',
        minScore: 65,
        maxScore: 99,
        summaryKeyTakeaways: [
          'Apoio à vítima no momento de fragilidade.',
          'Atenção para nunca repostar conteúdos ofensivos em redes.',
          'Valorização da verdade frente aos boatos escolares.'
        ],
        legalRecommendations: [
          'Reforçar o estudo das responsabilidades civis e de imagem (Código Civil e ECA).'
        ],
        competencyStrengths: [
          'Respeito aos procedimentos escolares'
        ],
        growthOpportunities: [
          'Cortar boatos no início da conversa com colegas.'
        ]
      },
      {
        id: 'mediador_insuficiente',
        title: 'Necessidade de Compreensão dos Direitos de Imagem',
        subtitle: 'Repassar boatos e destruir evidências não são atitudes compatíveis com a cidadania',
        badgeTitle: '⚠️ Alerta de Conscientização Moral',
        description: 'Suas escolhas revelaram propensão a amplificar boatos ou a apoiar soluções destrutivas. Difamar alguém ou danificar a escola pública são infrações graves. Convidamos você a refazer o caso focando na preservação da dignidade humana.',
        minScore: 0,
        maxScore: 64,
        summaryKeyTakeaways: [
          'Repassar mentiras e pichações torna você corresponsável pela difamação.',
          'Vandalismo nunca é resposta para desavenças políticas.',
          'Refazer a jornada adotando postura de guardião da verdade.'
        ],
        legalRecommendations: [
          'Revisão urgente das infrações de calúnia e dano ao patrimônio público.'
        ],
        competencyStrengths: [
          'Interesse pelas movimentações do Grêmio'
        ],
        growthOpportunities: [
          'Compreender o dano irreparável que a difamação causa na vida de um estudante.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // HISTÓRIA 4: A PRESSÃO DOS COLEGAS (Pressão de Pares & Desafios Virtuais de Risco)
  // --------------------------------------------------------------------------
  {
    id: 'a_pressao_dos_colegas',
    title: 'A Pressão dos Colegas',
    subtitle: 'Pressão de grupo, desafios perigosos nas redes e a coragem de dizer não',
    synopsis: 'Um desafio viral de internet perigoso começa a circular entre os alunos do ensino médio da EEMTI. Colegas populares pressionam um aluno tímido a participar sob pena de ser ridicularizado e excluído da turma. Como ter a coragem ética de romper a pressão dos pares e proteger vidas?',
    category: 'pressao_colegas',
    categoryLabel: 'Pressão de Pares & Riscos Digitais',
    difficulty: 'impossivel',
    difficultyLabel: 'Nível 4 • Desafio Supremo',
    estimatedDurationMinutes: 16,
    baseRewardXp: 180,
    maxScore: 125,
    coverTheme: {
      gradient: 'from-rose-950 via-purple-950 to-slate-950',
      border: 'border-rose-400/50',
      icon: '🔥',
      tagBg: 'bg-rose-500/20',
      tagText: 'text-rose-300'
    },
    competenciesWorked: ['respeito', 'emocional', 'bullying', 'direitos', 'convivencia'],
    characters: [
      {
        id: 'danilo',
        name: 'Danilo Alves',
        role: 'Aluno Pressionado a Arriscar a Vida',
        avatarType: 'aluno_timido',
        description: 'Estudante que deseja ser aceito pelo grupo de veteranos a qualquer custo.',
        personality: 'Inseguro, com baixa autoestima, vulnerável à manipulação coletiva.',
        accentColor: '#38bdf8'
      },
      {
        id: 'tiago',
        name: 'Tiago Rocha',
        role: 'Influenciador do Desafio Virtual',
        avatarType: 'aluno_lider',
        description: 'Busca curtidas e engajamento em vídeos curtos arriscados.',
        personality: 'Imprudente, carismático, cego aos perigos reais à integridade física.',
        accentColor: '#ef4444'
      },
      {
        id: 'sofia',
        name: 'Sofia Duarte',
        role: 'Defensora da Autonomia Crítica',
        avatarType: 'aluna_oculos',
        description: 'Estudante atenta aos perigos de desafios que atentam contra a integridade física.',
        personality: 'Corajosa, perspicaz e protetora dos amigos.',
        accentColor: '#c084fc'
      },
      {
        id: 'prof_helena',
        name: 'Coordenadora Helena',
        role: 'Gestora de Convivência',
        avatarType: 'coordenadora',
        description: 'Especialista em segurança escolar e saúde mental do adolescente.',
        personality: 'Firme na proteção da vida e acolhedora na escuta.',
        accentColor: '#a855f7'
      }
    ],
    investigationItems: [
      {
        id: 'clue_video_desafio',
        category: 'pista',
        title: 'Vídeo do Desafio nas Redes',
        subtitle: 'Gravação circulando em aplicativos de mensagens',
        description: 'Vídeo mostrando jovens se equilibrando perigosamente na marquise do colégio para ganhar visualizações.',
        iconName: 'FileText',
        importance: 'critica',
        unlockAtAct: 1,
        contentDetails: {
          text: 'Gravação com comentários de incentivo e deboche contra quem tem medo de pular.',
          timestamp: 'Quinta-feira, 15:40',
          legalNote: 'Instigação ao perigo e ao suicídio/automutilação (Art. 122 do CP com agravantes da Lei 14.811/2024).'
        }
      },
      {
        id: 'clue_print_coacao',
        category: 'pista',
        title: 'Mensagens de Coação no Grupo',
        subtitle: 'Conversas no chat fechado da turma',
        description: 'Frases dizendo que se Danilo não cumprir o desafio na sexta-feira, ninguém mais vai falar com ele.',
        iconName: 'MessageSquare',
        importance: 'critica',
        unlockAtAct: 2,
        contentDetails: {
          text: '"Ou você pula e filma, ou você não é homem pra andar com a gente."',
          timestamp: 'Quinta-feira, 18:20',
          legalNote: 'Constrangimento ilegal (Art. 146 do CP) e bullying sistemático coercitivo (Lei 13.185/2015).'
        }
      },
      {
        id: 'clue_alerta_saude',
        category: 'evidencia',
        title: 'Nota Técnica do Ministério da Saúde',
        subtitle: 'Riscos de "Desafios Virais" entre adolescentes',
        description: 'Documento alertando sobre fraturas graves, traumatismos e óbitos decorrentes de modismos perigosos na internet.',
        iconName: 'ShieldCheck',
        importance: 'critica',
        unlockAtAct: 3,
        contentDetails: {
          text: 'Relatório médico demonstrando a gravidade irreversível de quedas de altura e asfixia simulada.',
          legalNote: 'Dever geral de prevenção de riscos à vida (ECA, arts. 4º e 5º).'
        }
      },
      {
        id: 'clue_cronologia_desafio',
        category: 'cronologia',
        title: 'Linha do Tempo da Escalada do Desafio',
        subtitle: 'Como o modismo chegou à escola',
        description: 'Mapeamento desde o primeiro vídeo gravado fora da escola até a escolha de Danilo como alvo na quadra.',
        iconName: 'Clock',
        importance: 'moderada',
        unlockAtAct: 2,
        contentDetails: {
          text: 'Segunda: Vídeo visto no TikTok; Quarta: Primeiro teste no muro da rua; Quinta: Pressão aberta sobre Danilo.',
          legalNote: 'A intervenção antecipada é o único meio eficaz de salvar vidas de acidentes fatais.'
        }
      }
    ],
    acts: [
      // ATO 1
      {
        actNumber: 1,
        actTitle: 'O Desafio Viral no Intervalo',
        sceneSetting: {
          location: 'Atrás da Quadra de Esportes da EEMTI',
          timeOfDay: 'Quinta-feira, 15:30',
          atmosphere: 'Roda de estudantes com celulares gravando, clima de euforia perigosa',
          characterPresentId: 'tiago',
          sceneTheme: 'patio'
        },
        narrativa: 'Nos fundos da quadra poliesportiva, Tiago e mais cinco colegas estão reunidos ao redor de Danilo. Tiago mostra no celular um vídeo viral de um "desafio" em que jovens se penduram na ponta do muro da escola com uma mão só para tirar uma selfie arriscada. Tiago aponta o celular para Danilo e diz: "Chegou sua vez, Danilo! A gente já fez o nosso. Se você não fizer agora, é a prova de que você é um covarde e tá fora do nosso grupo". Danilo está pálido, com as pernas tremendo, olhando para a altura do muro.',
        currentDilemma: 'A integridade física e a vida de Danilo estão em risco iminente por coação de grupo. Como intervir com firmeza ética?',
        unlockedClueIds: ['clue_video_desafio'],
        choices: [
          {
            letter: 'A',
            text: 'Entrar com firmeza no meio da roda, colocar a mão no ombro de Danilo com autoridade fraterna e dizer com clareza: "Danilo, ninguém precisa arriscar a própria vida pra provar nada pra ninguém. Isso não é coragem, é loucura perigosa. Vamos sair daqui agora."',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A intervenção corajosa quebrou o transe coletivo, deu a Danilo o apoio que ele precisava para recuar e impediu uma queda que poderia ser fatal.',
            ethicalAnalysis: 'Verdadeira coragem moral (Upstander de alto risco): enfrentar a pressão de um grupo popular para salvar a vida de uma pessoa em perigo.',
            practicalLearning: 'Dizer NÃO a uma loucura coletiva exige mais bravura do que se curvar à pressão dos outros.',
            legalBasis: {
              law: 'Código Penal Brasileiro e Lei nº 14.811/2024',
              article: 'Art. 122 e 146 do CP',
              summary: 'Instigar ou constranger outrem a praticar ato perigoso à integridade física enseja responsabilização penal qualificada.'
            }
          },
          {
            letter: 'B',
            text: 'Pegar o celular para filmar também e gritar: "Pula logo, Danilo, que eu quero postar no meu canal e ganhar seguidor!".',
            impact: 'negativo',
            points: 0,
            whatHappened: 'Incentivar a atitude perigosa quase resultou em uma queda grave do muro que foi evitada por segundos por um inspetor.',
            ethicalAnalysis: 'Induzir alguém ao risco de morte por vaidade de redes sociais é uma falha ética e criminosa deplorável.',
            practicalLearning: 'Visualizações e curtidas em redes sociais nunca valem a vida ou a saúde de um ser humano.',
            legalBasis: {
              law: 'Código Penal (Lei 14.811/2024)',
              article: 'Art. 122 do CP',
              summary: 'Induzir ou instigar alguém a atos perigosos com risco à vida é crime hediondo tipificado com agravante na internet.'
            }
          },
          {
            letter: 'C',
            text: 'Ficar em silêncio olhando o celular para que ninguém pense que você é contra o grupo de Tiago.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'O silêncio aumentou a pressão sobre Danilo, que quase subiu no muro até a chegada providencial de um professor.',
            ethicalAnalysis: 'A omissão quando vidas estão em jogo é cumplicidade com o perigo iminente.',
            practicalLearning: 'Em situações de perigo físico, a intervenção rápida é dever inegociável de socorro.',
            legalBasis: {
              law: 'Código Penal',
              article: 'Art. 135 do CP',
              summary: 'Omissão de socorro: deixar de prestar assistência ou pedir socorro a quem se encontra em grave e iminente perigo.'
            }
          },
          {
            letter: 'D',
            text: 'Dizer: "Danilo, faz logo isso pra eles pararem de te encher o saco e você ficar livre deles".',
            impact: 'negativo',
            points: 5,
            whatHappened: 'O conselho desastroso empurrou Danilo ainda mais para o risco em vez de protegê-lo.',
            ethicalAnalysis: 'Ceder à chantagem e ao perigo nunca resolve o bullying; apenas aumenta a vulnerabilidade da vítima.',
            practicalLearning: 'Nunca aconselhe alguém a ceder à pressão perigosa para agradar quem não respeita sua vida.',
            legalBasis: {
              law: 'ECA',
              article: 'Art. 18',
              summary: 'Dever de zelar pela dignidade e integridade física de crianças e adolescentes.'
            }
          }
        ]
      },

      // ATO 2
      {
        actNumber: 2,
        actTitle: 'O Confronto com os Influenciadores',
        sceneSetting: {
          location: 'Corredor do 2º Ano da EEMTI',
          timeOfDay: 'Quinta-feira, 16:10',
          atmosphere: 'Danilo se afasta em segurança, mas Tiago aborda você com irritação',
          characterPresentId: 'tiago',
          sceneTheme: 'corredor'
        },
        narrativa: 'Danilo agradeceu e foi para a sala em segurança. No entanto, Tiago e seus colegas cercam você no corredor com ar de deboche: "Qual é a sua, estraga-prazeres? Agora o Danilo tá chorando e você estragou o nosso vídeo que ia bater 50 mil visualizações. Quem você pensa que é pra se meter no nosso grupo?".',
        currentDilemma: 'Como sustentar sua posição ética diante da hostilidade sem recorrer a xingamentos ou recuar da proteção à vida?',
        unlockedClueIds: ['clue_print_coacao', 'clue_cronologia_desafio'],
        choices: [
          {
            letter: 'A',
            text: 'Manter a calma com postura firme e olhar direto: "Tiago, um vídeo de internet com 50 mil visualizações não paga o enterro de um colega ou a cadeira de rodas dele se ele caísse de cabeça daquele muro. Amizade de verdade cuida da vida do outro, não usa o medo de ninguém pra ganhar curtida."',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A resposta lúcida e profunda calou o grupo, fez dois dos colegas de Tiago recuarem envergonhados e colocou a gravidade da situação em perspectiva.',
            ethicalAnalysis: 'Excelente maturidade argumentativa: reposicionar o debate no valor supremo da vida humana e da amizade autêntica.',
            practicalLearning: 'Argumentar com serenidade e foco no valor da vida desmorona a arrogância de quem busca aprovação rasa na internet.',
            legalBasis: {
              law: 'Princípios Éticos Fundamentais e ECA',
              article: 'Art. 4º do ECA',
              summary: 'Prioridade absoluta à vida e à integridade da juventude sobre quaisquer interesses secundários.'
            }
          },
          {
            letter: 'B',
            text: 'Pedir desculpas a Tiago e dizer que se ele quiser, você mesmo sobe no muro para gravar o vídeo no lugar de Danilo.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A covardia moral em busca de aceitação colocou a sua própria vida em perigo absurdo.',
            ethicalAnalysis: 'Submeter-se ao perigo para agradar valentões é o ápice da falta de autoestima e de discernimento.',
            practicalLearning: 'Nunca arrisque sua saúde para ser aceito em grupos que não se importam com você.',
            legalBasis: {
              law: 'Proteção à Vida',
              article: 'Dever de Autocuidado',
              summary: 'A integridade física é bem jurídico indisponível e prioritário em qualquer ordenamento.'
            }
          },
          {
            letter: 'C',
            text: 'Começar a trocar socos com Tiago no corredor para provar quem manda na escola.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A briga física gerou lesões, advertência e deslocou o debate da segurança da vida para uma questão de disciplina escolar.',
            ethicalAnalysis: 'Violência física esvazia a razão ética e transforma você em infrator disciplinar.',
            practicalLearning: 'Quem tem a razão moral e a lei ao seu lado não precisa de socos para se impor.',
            legalBasis: {
              law: 'Código Penal',
              article: 'Art. 129 do CP',
              summary: 'Lesão corporal de qualquer natureza enseja responsabilização penal e socioeducativa.'
            }
          },
          {
            letter: 'D',
            text: 'Sair correndo sem responder nada e se trancar no banheiro tremendo de medo.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'Tiago sentiu que podia continuar intimidando outros alunos porque ninguém sustentava uma oposição serena.',
            ethicalAnalysis: 'Fugir sem dialogar permite que a cultura da coerção continue ativa.',
            practicalLearning: 'A firmeza pacífica é a melhor defesa contra a intimidação de valentões.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 4º',
              summary: 'Desenvolvimento da assertividade e da não-violência ativa na escola.'
            }
          }
        ]
      },

      // ATO 3
      {
        actNumber: 3,
        actTitle: 'O Apoio Emocional a Danilo',
        sceneSetting: {
          location: 'Biblioteca da EEMTI - Sala de Leitura Silenciosa',
          timeOfDay: 'Sexta-feira, 09:00',
          atmosphere: 'Danilo sentado com a cabeça baixa, isolado',
          characterPresentId: 'danilo',
          sceneTheme: 'biblioteca'
        },
        narrativa: 'No dia seguinte, você encontra Danilo na biblioteca. Ele está envergonhado e diz: "Agora o colégio inteiro vai achar que eu sou um frango e ninguém vai querer ser meu amigo. Eu devia ter pulado daquele muro... se eu quebrar um braço pelo menos eles me respeitariam". Ele confessa que sofreu pressão parecida no ensino fundamental e que sempre fez coisas perigosas para tentar se enturmar.',
        currentDilemma: 'Como trabalhar a autoestima e o discernimento crítico de Danilo para que ele entenda o valor de sua própria vida?',
        unlockedClueIds: ['clue_alerta_saude'],
        choices: [
          {
            letter: 'A',
            text: 'Conversar com Danilo com empatia genuína, explicar que quem exige que você se machuque para ser amigo nunca foi amigo de verdade, e convidá-lo para participar do clube de robótica/estudos com um grupo de colegas que valorizam a inteligência e o respeito mútuo.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'Danilo sentiu um alívio profundo, percebeu que existem outras formas saudáveis de pertencimento e recuperou sua dignidade pessoal.',
            ethicalAnalysis: 'Apoio socioemocional exemplar: ressignificar o pertencimento e oferecer redes sadias de acolhimento desmantela a dependência de aprovação tóxica.',
            practicalLearning: 'Amigos de verdade celebram quem você é, e não o perigo a que você se submete.',
            legalBasis: {
              law: 'Lei nº 13.185/2015 e ECA',
              article: 'Art. 4º da Lei 13.185',
              summary: 'Ações de fortalecimento da autoestima e desenvolvimento de competências socioemocionais no ambiente educacional.'
            }
          },
          {
            letter: 'B',
            text: 'Dizer que ele está certo e que ele devia esperar a próxima semana para pular de um muro mais alto ainda para calar a boca de todo mundo.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A resposta irresponsável reforçou o comportamento suicida e de automutilação do colega.',
            ethicalAnalysis: 'Incentivar delírios perigosos de aceitação é crueldade destrutiva e co-autoria moral em acidentes graves.',
            practicalLearning: 'Nunca alimente fantasias perigosas de validação social de quem está fragilizado.',
            legalBasis: {
              law: 'Código Penal (Lei 14.811/2024)',
              article: 'Art. 122',
              summary: 'Incentivo à automutilação com resultado danoso enseja pena de reclusão severa.'
            }
          },
          {
            letter: 'C',
            text: 'Zombar de Danilo dizendo que ele é realmente um covarde e que devia aprender a lutar caratê.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A zombaria destruiu a pouca esperança que Danilo tinha e agravou seu quadro depressivo.',
            ethicalAnalysis: 'Crueldade gratuita que reforça o ciclo da violência verbal e do isolamento.',
            practicalLearning: 'Trate os sentimentos alheios com respeito absoluto.',
            legalBasis: {
              law: 'ECA',
              article: 'Art. 18',
              summary: 'Zelo pela dignidade da pessoa humana livre de qualquer tratamento vexatório.'
            }
          },
          {
            letter: 'D',
            text: 'Falar apenas: "É a vida, cara, cada um com seus problemas" e sair para jogar bola.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'Danilo permaneceu no desamparo emocional sem orientação de valor.',
            ethicalAnalysis: 'A indiferença diante da dor existencial de um colega é frieza social.',
            practicalLearning: 'Dedique tempo para ouvir quem está desorientado.',
            legalBasis: {
              law: 'BNCC',
              article: 'Competência Geral 9',
              summary: 'Exercitar a empatia, o diálogo, a resolução de conflitos e a cooperação.'
            }
          }
        ]
      },

      // ATO 4
      {
        actNumber: 4,
        actTitle: 'A Ação Educativa Institucional',
        sceneSetting: {
          location: 'Sala da Coordenação Pedagógica da EEMTI',
          timeOfDay: 'Sexta-feira, 11:30',
          atmosphere: 'Reunião de prevenção com a Coordenadora Helena e Sofia',
          characterPresentId: 'prof_helena',
          sceneTheme: 'coordenacao'
        },
        narrativa: 'Você e Sofia procuram a Coordenadora Helena para alertar sobre a circulação do vídeo do desafio do muro entre os alunos do ensino médio antes que outros estudantes tentem reproduzir o ato. A Coordenadora Helena acolhe o relato com seriedade imediata, agradece o aviso preventivo e propõe uma estratégia conjunta com a equipe de saúde escolar e o grêmio estudantil.',
        currentDilemma: 'Qual deve ser a abordagem da escola para alertar sobre desafios virtuais sem despertar curiosidade negativa nos alunos?',
        unlockedClueIds: [],
        choices: [
          {
            letter: 'A',
            text: 'Realizar uma roda de conversa temática mediada por profissionais de saúde e psicologia sobre "Pressão de Pares, Algoritmos de Risco e a Coragem de Dizer Não", desmistificando os perigos sem exibir vídeos de incentivo e convidando os próprios estudantes a liderarem campanhas de valorização da vida.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A abordagem científica, madura e participativa conscientizou os alunos sobre a manipulação por curtidas e desarticulou completamente o modismo perigoso na escola.',
            ethicalAnalysis: 'Pedagogia preventiva baseada em evidências: conscientizar sem gerar sensacionalismo e capacitar a juventude com pensamento crítico sobre redes sociais.',
            practicalLearning: 'A melhor prevenção é ensinar a pensar criticamente sobre o que consumimos nas telas.',
            legalBasis: {
              law: 'Lei nº 13.185/2015 e Lei nº 14.811/2024',
              article: 'Art. 4º da Lei 13.185',
              summary: 'Capacitação docente e discente para identificação precoce de comportamentos de risco e uso seguro das redes digitais.'
            }
          },
          {
            letter: 'B',
            text: 'Exibir os vídeos de pessoas se acidentando em telões no pátio para dar um "choque de terror" nos alunos.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A tática do terror causou pânico, morbidez e acabou atiçando a curiosidade de alguns alunos em procurar mais vídeos perigosos.',
            ethicalAnalysis: 'Pedagogia do medo e sensacionalismo gráfico são ineficazes e contraproducentes na educação de adolescentes.',
            practicalLearning: 'A conscientização se faz com reflexão ética, não com exibição de imagens mórbidas.',
            legalBasis: {
              law: 'Diretrizes do Ministério da Saúde e da OMS',
              article: 'Comunicação Segura',
              summary: 'A abordagem preventiva sobre riscos à vida deve evitar o sensacionalismo e focar nos fatores de proteção e suporte.'
            }
          },
          {
            letter: 'C',
            text: 'Suspender Tiago e todos os alunos que viram o vídeo por um mês sem qualquer explicação pedagógica.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'A punição cega gerou revolta e os desafios continuaram a ser praticados na rua fora do colégio.',
            ethicalAnalysis: 'Punição sem educação apenas empurra o problema para fora do portão da escola.',
            practicalLearning: 'A escola deve transformar a mentalidade, e não apenas afastar quem errou.',
            legalBasis: {
              law: 'LDB e ECA',
              article: 'Função Social da Escola',
              summary: 'As medidas institucionais devem ser emancipatórias e visar à reintegração reflexiva do estudante.'
            }
          },
          {
            letter: 'D',
            text: 'Proibir que os alunos conversem sobre internet ou redes sociais dentro do colégio.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A proibição absurda foi ignorada por todos e a escola perdeu a oportunidade de orientar sobre segurança digital.',
            ethicalAnalysis: 'Tentar tapar o sol com a peneira fingindo que a internet não existe é cegueira pedagógica.',
            practicalLearning: 'O mundo digital é parte da vida real; o dever é ensinar a navegar com sabedoria.',
            legalBasis: {
              law: 'Marco Civil da Internet (Lei 12.965/2014)',
              article: 'Art. 26',
              summary: 'O dever constitucional e legal de inclusão digital com formação crítica e ética para a cidadania.'
            }
          }
        ]
      },

      // ATO 5
      {
        actNumber: 5,
        actTitle: 'A Virada: A Cultura da Coragem Autêntica',
        sceneSetting: {
          location: 'Auditório da EEMTI - Semana da Cidadania Digital',
          timeOfDay: 'Três semanas depois',
          atmosphere: 'Auditório lotado, Danilo no palco apresentando um projeto',
          characterPresentId: 'danilo',
          sceneTheme: 'coordenacao'
        },
        narrativa: 'Três semanas após a ação preventiva, a EEMTI realiza a Mostra de Cidadania Digital e Saúde Mental. Tiago compreendeu o perigo que provocou e gravou um vídeo educativo sincero alertando sobre os riscos dos desafios virais. No palco, Danilo apresenta com orgulho o protótipo do sensor desenvolvido no Clube de Robótica. Ele é aplaudido de pé por toda a turma por sua inteligência e criatividade.',
        currentDilemma: 'Qual é o maior aprendizado que sua turma deve carregar sobre a verdadeira coragem na convivência escolar?',
        unlockedClueIds: [],
        choices: [
          {
            letter: 'A',
            text: 'Compreender que coragem de verdade não é arriscar a vida para ganhar curtidas vazias, mas sim ter a bravura de defender a própria integridade, proteger os colegas vulneráveis e dizer NÃO quando a multidão marcha para o abismo.',
            impact: 'positivo',
            points: 25,
            whatHappened: 'A turma consolidou uma cultura sólida de autonomia ética, onde a solidariedade e a inteligência passaram a ser os verdadeiros motivos de orgulho coletivo.',
            ethicalAnalysis: 'Brilhante síntese filosófica e prática: a autonomia da vontade e a responsabilidade mútua são os pilares da civilidade.',
            practicalLearning: 'A verdadeira liderança liberta as pessoas do medo de serem rejeitadas por fazerem o que é certo.',
            legalBasis: {
              law: 'Constituição Federal e Declaração Universal dos Direitos Humanos',
              article: 'Art. 1º e 3º da DUDH',
              summary: 'Todos os seres humanos nascem livres e iguais em dignidade e direitos, dotados de razão e consciência, devendo agir fraternalmente.'
            }
          },
          {
            letter: 'B',
            text: 'Concluir que na dúvida o melhor é nunca ter amigos para não sofrer pressão de ninguém.',
            impact: 'negativo',
            points: 5,
            whatHappened: 'O isolamento total gerou solidão e não desenvolveu habilidades de convivência sadia.',
            ethicalAnalysis: 'O ser humano é um ser social; a solução é escolher boas amizades, não se isolar do mundo.',
            practicalLearning: 'Bons amigos apoiam e constroem; aprenda a reconhecer quem agrega.',
            legalBasis: {
              law: 'ECA',
              article: 'Art. 16',
              summary: 'O direito à liberdade compreende participar da vida familiar e comunitária sem discriminação.'
            }
          },
          {
            letter: 'C',
            text: 'Achar que tudo foi um golpe de sorte e que os jovens vão continuar fazendo qualquer coisa por curtida.',
            impact: 'neutro',
            points: 10,
            whatHappened: 'A visão cínica enfraquece a crença na capacidade transformadora da educação pública.',
            ethicalAnalysis: 'O cinismo é a renúncia da responsabilidade de construir um mundo melhor.',
            practicalLearning: 'Acredite na força do exemplo positivo: a empatia é tão contagiosa quanto o medo.',
            legalBasis: {
              law: 'LDB (Lei 9.394/1996)',
              article: 'Princípios da Educação Nacional',
              summary: 'A educação visa ao pleno desenvolvimento do educando e seu preparo para o exercício da cidadania.'
            }
          },
          {
            letter: 'D',
            text: 'Pensar que se Danilo sofresse um acidente a culpa seria apenas dele por ser fraco.',
            impact: 'negativo',
            points: 0,
            whatHappened: 'A desumanidade do pensamento ignora os mecanismos psicológicos da coerção e do assédio moral de grupo.',
            ethicalAnalysis: 'Ausência total de empatia e ignorância sobre a responsabilidade comunitária.',
            practicalLearning: 'Somos todos responsáveis pelo ambiente moral que criamos na nossa escola.',
            legalBasis: {
              law: 'Lei nº 13.185/2015',
              article: 'Art. 1º',
              summary: 'O combate ao bullying é compromisso ético e legal indelegável de toda a sociedade.'
            }
          }
        ]
      }
    ],
    outcomes: [
      {
        id: 'heroi_da_autonomia',
        title: 'Mestre da Autonomia e Defensor da Vida',
        subtitle: 'Você enfrentou a pressão de grupo no nível mais difícil e salvou uma vida',
        badgeTitle: '👑 Coroa Supremo Guardião da Vida da EEMTI',
        description: 'Excepcional! No desafio mais complexo de toda a plataforma, você demonstrou que a verdadeira bravura não reside em seguir a multidão, mas em ter a coragem inquebrantável de romper o ciclo de perigo, acolher quem estava em desespero e liderar uma transformação pedagógica perene. Você é um exemplo de cidadania para a EEMTI Alfredo Machado!',
        minScore: 100,
        maxScore: 125,
        summaryKeyTakeaways: [
          'Intervenção decisiva de socorro rompendo o transe da pressão de pares.',
          'Sustentação serena e firme dos argumentos éticos perante influenciadores populares.',
          'Ressignificação da autoestima de Danilo através do pertencimento sadio.',
          'Parceria preventiva com a gestão escolar sem recurso a métodos sensacionalistas.'
        ],
        legalRecommendations: [
          'Compreensão avançada das responsabilidades do Art. 122 do CP (instigação ao perigo/automutilação qualificada na Lei 14.811/2024).',
          'Aplicação dos princípios da DUDH e do ECA sobre a primazia inalienável da vida e dignidade humana.'
        ],
        competencyStrengths: [
          'Autonomia moral e inteligência socioemocional superior',
          'Coragem cívica em situações de alta pressão social',
          'Mediação preventiva de riscos graves à saúde física e mental'
        ],
        growthOpportunities: [
          'Atuar como orador jovem nas semanas de cidadania e liderança da EEMTI.'
        ]
      },
      {
        id: 'heroi_em_formacao',
        title: 'Atuação Corajosa com Desafios de Assertividade',
        subtitle: 'Você protegeu o colega, mas ainda sentiu o peso da pressão social',
        badgeTitle: '🥈 Distintivo de Autonomia Cívica',
        description: 'Você tomou atitudes essenciais para salvar Danilo, mas enfrentou momentos de dúvida diante da intimidação de Tiago. Enfrentar a pressão de grupo é uma das habilidades mais difíceis da vida adulta, e você está no caminho certo para dominá-la plenamente!',
        minScore: 65,
        maxScore: 99,
        summaryKeyTakeaways: [
          'Proteção bem-sucedida do colega em situação de risco de queda.',
          'Necessidade de aprofundar a firmeza no diálogo com líderes de grupos tóxicos.',
          'Consolidação do papel de jovem protetor.'
        ],
        legalRecommendations: [
          'Estudo das diretrizes de prevenção ao suicídio e automutilação em ambiente escolar.'
        ],
        competencyStrengths: [
          'Fidelidade ao valor da vida humana'
        ],
        growthOpportunities: [
          'Fortalecer a autoconfiança para não se intimidar com ironias de colegas.'
        ]
      },
      {
        id: 'heroi_em_risco',
        title: 'Alerta Crítico: Vulnerabilidade à Pressão de Grupo',
        subtitle: 'Ceder ao perigo por curtidas ou omissão coloca vidas em risco real',
        badgeTitle: '⚠️ Alerta de Risco à Vida',
        description: 'Suas escolhas colocaram você ou seus colegas em risco iminente de graves acidentes físicos. Curtidas e aprovação em redes virtuais nunca justificam o desrespeito à vida e ao corpo. Refaça esta experiência com máxima atenção e compromisso com o cuidado mútuo.',
        minScore: 0,
        maxScore: 64,
        summaryKeyTakeaways: [
          'A vida humana é o valor supremo e não pode ser negociada por engajamento de internet.',
          'A omissão em situações de perigo físico é ilícito grave de omissão de socorro.',
          'Refazer o caso compreendendo o poder do NÃO responsável.'
        ],
        legalRecommendations: [
          'Revisão urgente do Art. 135 do CP (Omissão de Socorro) e Art. 122 do CP.'
        ],
        competencyStrengths: [
          'Conhecimento das tendências das redes sociais'
        ],
        growthOpportunities: [
          'Aprender a colocar a vida e a segurança antes da opinião dos outros.'
        ]
      }
    ]
  }
];

export const getStoryById = (id: string): NarrativeStory | undefined => {
  return NARRATIVE_STORIES.find(s => s.id === id);
};
