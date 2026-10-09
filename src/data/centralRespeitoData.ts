export type ChallengeDifficulty = 'dificil' | 'muito_dificil' | 'desafio' | 'supremo';

export type ChallengeCategory = 
  | 'todos'
  | 'fundamentos'
  | 'cotidiano'
  | 'cyber'
  | 'legislacao'
  | 'decisao'
  | 'historia'
  | 'secreto';

export interface QuizQuestion {
  id: string;
  pergunta: string;
  contexto?: string;
  opcoes: [string, string, string, string];
  correta: 0 | 1 | 2 | 3;
  explicacao: string;
  competencia: 'respeito' | 'convivencia' | 'bullying' | 'cyber' | 'direitos';
  referencia: string;
}

export interface InteractiveStage {
  id: string;
  etapaNumero: number;
  titulo: string;
  narrativa: string;
  situacaoAtual: string;
  opcoes: {
    texto: string;
    impacto: 'positivo' | 'neutro' | 'negativo';
    feedback: string;
    consequencia: string;
    pontos: number;
  }[];
}

export interface QuizChallenge {
  id: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  categoria: ChallengeCategory;
  dificuldade: ChallengeDifficulty;
  icone: string;
  cor: string;
  questoesCount: number;
  tempoMedioMinutos: number;
  xpRecompensa: number;
  isSecret?: boolean;
  unlockCondition?: string;
  tipo: 'multipla_escolha' | 'historia_interativa';
  questoes?: QuizQuestion[];
  historiaStages?: InteractiveStage[];
}

// =========================================================================
// BANCO DE DESAFIOS E QUESTÕES DA CENTRAL DE RESPEITO (ALTA COMPLEXIDADE)
// =========================================================================

export const CENTRAL_DESAFIOS: QuizChallenge[] = [
  // -----------------------------------------------------------------------
  // 1. CONHECIMENTOS DO RESPEITO (8 Questões)
  // -----------------------------------------------------------------------
  {
    id: 'conhecimentos_respeito',
    titulo: 'Conhecimentos do Respeito',
    subtitulo: 'Fundamentos da convivência ética e limites da liberdade de expressão',
    descricao: 'Questões analíticas sobre a fronteira entre liberdade de manifestação, dignidade humana, alteridade e comunicação não-violenta no espaço escolar.',
    categoria: 'fundamentos',
    dificuldade: 'dificil',
    icone: '🧠',
    cor: 'from-emerald-500 to-teal-700',
    questoesCount: 8,
    tempoMedioMinutos: 7,
    xpRecompensa: 55,
    tipo: 'multipla_escolha',
    questoes: [
      {
        id: 'cr_1',
        pergunta: 'Em uma roda de conversa, um estudante sustenta que sua "liberdade de expressão" é irrestrita e permite tecer comentários irônicos sobre a crença religiosa de um colega. Sob a ótica constitucional e dos direitos humanos, qual o fundamento que delimita essa manifestação?',
        contexto: 'Debate em sala sobre diversidade cultural e convivência plural.',
        opcoes: [
          'A liberdade de manifestação do pensamento é direito fundamental, porém encontra barreira inultrapassável na dignidade da pessoa humana e na inviolabilidade da honra e da crença alheia.',
          'A livre manifestação só pode ser restringida se houver previsão explícita de veto no Regimento Disciplinar Interno da própria escola estadual.',
          'Qualquer crítica a crenças é legítima no ambiente acadêmico, desde que não seja acompanhada de ameaça física direta ou interrupção de aulas.',
          'A liberdade de expressão só cessa quando o ofendido formaliza representação criminal perante a autoridade policial de plantão.'
        ],
        correta: 0,
        explicacao: 'Conforme o Art. 5º da CF/88 e a jurisprudência consolidada do STF, nenhum direito fundamental é absoluto. A liberdade de expressão não agasalha o discurso de ódio, a discriminação ou a violação da dignidade humana.',
        competencia: 'respeito',
        referencia: 'Constituição Federal de 1988 (Art. 1º, III e Art. 5º, IV e X)'
      },
      {
        id: 'cr_2',
        pergunta: 'Dois estudantes entram em atrito durante a divisão de tarefas de um projeto científico. Um mediador escolar busca aplicar a técnica da "Escuta Ativa". Qual procedimento traduz com exatidão essa abordagem metodológica?',
        opcoes: [
          'Permitir que cada parte relate os fatos enquanto o mediador prepara de antemão a sentença disciplinar que será aplicada a ambos.',
          'Suspender temporariamente juízos de valor, parafrasear os sentimentos e necessidades expressos por cada interlocutor e validar as perspectivas emocionais antes de propor acordos.',
          'Obrigar os dois alunos a se abraçarem imediatamente e prometerem esquecer o ocorrido para restabelecer a harmonia da turma sem delongas.',
          'Conceder a palavra prioritária ao estudante com maior média acadêmica, considerando que sua narrativa tende a ser mais racional e fidedigna.'
        ],
        correta: 1,
        explicacao: 'A escuta ativa exige suspensão de julgamentos prematuros, reformulação das falas para demonstrar compreensão profunda e identificação das necessidades subjacentes antes de qualquer pactuação.',
        competencia: 'convivencia',
        referencia: 'Metodologias de Comunicação Não-Violenta (Marshall Rosenberg) e Mediação de Conflitos'
      },
      {
        id: 'cr_3',
        pergunta: 'Na teoria moral da convivência democrática, diferencia-se "tolerância passiva" de "reconhecimento ativo da alteridade". Por que a tolerância passiva é considerada insuficiente para prevenir violências veladas?',
        opcoes: [
          'Porque a tolerância passiva apenas suporta a existência do outro sem atribuir-lhe igualdade de valor e direitos, mantendo hierarquias silenciosas que alimentam a exclusão.',
          'Porque a tolerância passiva exige a instauração de processos disciplinares para todas as infrações, sobrecarregando a coordenação pedagógica da unidade escolar.',
          'Porque tolerar o outro significa concordar compulsoriamente com todas as suas opiniões, anulando a individualidade de quem tolera.',
          'Porque a tolerância passiva é um conceito exclusivamente jurídico sem nenhuma aplicabilidade nas práticas pedagógicas de ensino médio.'
        ],
        correta: 0,
        explicacao: 'A tolerância passiva é mera condescendência que conserva preconceitos latentes; o respeito ativo e a alteridade reconhecem o valor intrínseco e a legitimidade da pluralidade como elemento enriquecedor da comunidade.',
        competencia: 'respeito',
        referencia: 'Filosofia da Alteridade (Emmanuel Lévinas) e Diretrizes Curriculares Nacionais'
      },
      {
        id: 'cr_4',
        pergunta: 'Durante um debate de sociologia, argumentos apresentados por uma aluna introvertida são recebidos com risinhos desqualificadores por colegas do grêmio. O docente deseja intervir de modo formativo e não meramente punitivo. Qual intervenção atinge esse objetivo?',
        opcoes: [
          'Aconselhar a aluna a falar menos em debates públicos até desenvolver maior firmeza oratória perante a turma.',
          'Pausar o debate, pontuar com serenidade que o diálogo democrático incide sobre teses e argumentos, repudiando desqualificações pessoais e convidando o grupo a contra-argumentar com fundamentos.',
          'Aplicar suspensão automática de dois dias a todos que riram sem possibilitar que compreendam o impacto ético da atitude de deboche.',
          'Ignorar o incidente no momento para não constranger os alunos que riram e tratar do tema apenas na reunião de pais bimestral.'
        ],
        correta: 1,
        explicacao: 'A intervenção pedagógica eficaz demarca limites éticos com firmeza no calor do momento, protege a segurança psicológica de quem expõe ideias e ensina a turma a debater argumentos sem atacar a dignidade do indivíduo.',
        competencia: 'convivencia',
        referencia: 'Práticas Restaurativas e Clima Escolar Inclusivo (UNESCO)'
      },
      {
        id: 'cr_5',
        pergunta: 'A chamada "Regra de Platina" propõe: "Trate os outros como eles gostariam de ser tratados", em superação à "Regra de Ouro" tradicional ("Trate os outros como você gostaria de ser tratado"). Qual a justificativa ética para essa distinção?',
        opcoes: [
          'A Regra de Ouro pode projetar os próprios gostos e limites sobre o outro, ignorando que cada pessoa possui histórico, sensibilidades e vivências culturais singulares.',
          'A Regra de Platina foi elaborada para diminuir o tempo de mediação de conflitos escolares ao padronizar o comportamento de todos os matriculados.',
          'A Regra de Ouro é aplicável apenas a relações de consumo, enquanto a Regra de Platina é um dispositivo exclusivo do Direito Civil brasileiro.',
          'A Regra de Platina estabelece que o estudante ofendido tem o direito de escolher a punição disciplinar que será aplicada ao seu ofensor.'
        ],
        correta: 0,
        explicacao: 'Projetar nossas próprias preferências no outro pode desrespeitar suas particularidades; a verdadeira empatia descentra o sujeito e busca entender as necessidades e limites a partir do referencial da outra pessoa.',
        competencia: 'respeito',
        referencia: 'Ética do Cuidado e Psicologia do Desenvolvimento Moral (Carol Gilligan)'
      },
      {
        id: 'cr_6',
        pergunta: 'Em escolas de tempo integral, a criação de "Segurança Psicológica" no ambiente de sala de aula impacta diretamente a redução de violências interpessoais porque:',
        opcoes: [
          'Garante que nenhum estudante discorde de qualquer instrução fornecida pelos docentes durante o ano letivo.',
          'Cria um espaço de confiança mútua onde os estudantes sentem-se acolhidos para tirar dúvidas, admitir vulnerabilidades e pedir ajuda sem receio de humilhação ou retaliação social.',
          'Substitui a necessidade de professores orientadores por comitês de monitoramento por câmeras com reconhecimento biométrico.',
          'Impede que alunos conversem sobre temas da vida pessoal dentro do perímetro físico do colégio estadual.'
        ],
        correta: 1,
        explicacao: 'Ambientes com segurança psicológica desarmam o medo do ridículo e da exclusão, permitindo que tensões sejam comunicadas e trabalhadas antes de escalarem para agressões veladas ou intimidação sistemática.',
        competencia: 'convivencia',
        referencia: 'Conceito de Segurança Psicológica de Amy Edmondson aplicada à Educação'
      },
      {
        id: 'cr_7',
        pergunta: 'Um aluno reitera comentários depreciativos sobre a caligrafia de um colega e alega: "Eu não tive intenção de magoar, foi só uma observação espontânea". Como a responsabilidade ética analisa essa escusa?',
        opcoes: [
          'A ausência alegada de dolo direto isenta completamente o agente de qualquer dever ético de reparação ou mudança de atitude perante a vítima.',
          'A responsabilidade interpessoal não se esgota na intenção subjetiva de quem fala, mas abrange o dever de cuidado com o impacto concreto gerado na dignidade e na convivência do outro.',
          'O estudante receptor da observação deve ser advertido por demonstrar hipersensibilidade diante de comentários rotineiros de sala.',
          'A intenção alegada só pode ser refutada caso haja testemunhas registradas formalmente em ata com reconhecimento de firma em cartório.'
        ],
        correta: 1,
        explicacao: 'Na ética da responsabilidade, o emissor tem o dever de prever e responder pelo impacto previsível de suas falas sobre a dignidade do próximo. Alegar ausência de intenção não desconstitui o dano nem a obrigação reparadora.',
        competencia: 'respeito',
        referencia: 'Ética da Responsabilidade (Hans Jonas) e Práticas Restaurativas no Ensino'
      },
      {
        id: 'cr_8',
        pergunta: 'Qual o papel fundamental da equidade distributiva na construção de uma cultura escolar antirracista e inclusiva segundo as Diretrizes Nacionais?',
        opcoes: [
          'Distribuir exatamente as mesmas sanções punitivas a qualquer estudante, ignorando desigualdades estruturais históricas ou contextos de vulnerabilidade.',
          'Reconhecer que tratar identicamente sujeitos em situações desiguais perpetua injustiças, exigindo políticas ativas de valorização, acolhimento e garantia de oportunidades proporcionais às necessidades de cada grupo.',
          'Isolar alunos que sofrem preconceito em salas especiais de apoio psicológico para evitar que entrem em contato com alunos preconceituosos.',
          'Determinar que apenas temas de ciências exatas sejam objeto de avaliação formal para evitar controvérsias de ordem ética ou social.'
        ],
        correta: 1,
        explicacao: 'A equidade não é padronização cega: é dar a cada um o suporte diferenciado de que necessita para alcançar igual dignidade e participação cidadã plena na comunidade.',
        competencia: 'convivencia',
        referencia: 'Lei Federal nº 10.639/2003 e Diretrizes Curriculares Nacionais para a Educação das Relações Étnico-Raciais'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 2. SITUAÇÕES REAIS NA ESCOLA (8 Questões)
  // -----------------------------------------------------------------------
  {
    id: 'situacao_real',
    titulo: 'Situações Reais da Escola',
    subtitulo: 'Diferenciação crítica entre conflito pontual, microagressões e bullying',
    descricao: 'Estudo de casos verossímeis do cotidiano escolar da EEMTI Alfredo Machado para diagnosticar dinâmicas de poder e determinar a resposta institucional adequada.',
    categoria: 'cotidiano',
    dificuldade: 'muito_dificil',
    icone: '🎭',
    cor: 'from-amber-500 to-orange-700',
    questoesCount: 8,
    tempoMedioMinutos: 9,
    xpRecompensa: 70,
    tipo: 'multipla_escolha',
    questoes: [
      {
        id: 'sr_1',
        pergunta: 'Em uma atividade de laboratório em quarteto, três integrantes decidem deliberadamente ocultar as reuniões e a divisão de tarefas do quarto colega. Depois, comunicam ao professor que ele "não quis ajudar", exigindo que o nome dele seja retirado do relatório. Como analisar tecnicamente a conduta?',
        contexto: 'Trabalho de campo de Biologia do 2º Ano da EEMTI Alfredo Machado.',
        opcoes: [
          'Trata-se de uma dinâmica de liderança estudantil legítima para garantir que somente quem produziu receba pontuação acadêmica no bimestre.',
          'Configura violência relacional mediante boicote orquestrado e manipulação com assimetria de forças (3 contra 1), enquadrando-se como intimidação sistemática de isolamento social.',
          'É um atrito de comunicação corriqueiro sem relevância pedagógica, cabendo ao aluno prejudicado aceitar a decisão soberana da maioria do grupo.',
          'Constitui apenas uma falha de agenda dos estudantes que deve ser resolvida com o reagendamento imediato da entrega sem intervenção docente.'
        ],
        correta: 1,
        explicacao: 'O isolamento premeditado, a sabotagem da participação e a falsa imputação perante o professor configuram violência psicológica e relacional (Lei 13.185/2015, Art. 2º, Inciso IV), exigindo apuração e intervenção restaurativa imediata.',
        competencia: 'bullying',
        referencia: 'Lei nº 13.185/2015 (Art. 2º, IV) e Protocolos de Gestão de Conflitos em Grupo'
      },
      {
        id: 'sr_2',
        pergunta: 'Dois estudantes disputam acirradamente a vaga de orador da turma. Um deles, frustrado com a votação, começa a postar insinuações anônimas em um grupo escolar sobre a conduta moral do colega vencedor. Ao ser advertido, alega que "foi só um desabafo de quem perdeu injustamente". Qual a avaliação correta?',
        opcoes: [
          'O ato ultrapassa a esfera da rivalidade pessoal legítima e configura difamação premeditada com dano moral à vítima, passível de responsabilidade civil e disciplinar.',
          'O fato de decorrer de uma eleição estudantil concede imunidade retórica e protege o perdedor de sofrer sanções pedagógicas institucionais.',
          'A conduta só adquire relevância se as postagens anônimas utilizarem termos formalmente listados no glossário de infrações graves da Secretaria de Educação.',
          'A melhor conduta é o docente anular o pleito e nomear um terceiro estudante para cessar a divergência de forma pragmática.'
        ],
        correta: 0,
        explicacao: 'Disseminar boatos lesivos à reputação sob a capa de desabafo configura ataque à honra (Art. 139 do CP) e cyberbullying difamatório. O ambiente democrático não legitima retaliações caluniosas.',
        competencia: 'direitos',
        referencia: 'Código Penal Brasileiro (Art. 139 e Art. 146-A) e Estatuto da Criança e do Adolescente'
      },
      {
        id: 'sr_3',
        pergunta: 'No recreio, um estudante esbarra sem intenção na mesa e derruba a água sobre o material de outro. O prejudicado reage com irritação inicial, mas o primeiro pede desculpas sinceras, seca a carteira e ajuda a recuperar as anotações. Essa situação é categorizada como:',
        opcoes: [
          'Intimidação sistemática material em grau leve, demandando registro compulsório de denúncia nos órgãos de fiscalização externa.',
          'Conflito/incidente pontual cotidiano com paridade de forças, onde houve demonstração imediata de empatia, ausência de reiteração e responsabilização espontânea de reparação.',
          'Ato infracional análogo a dano culposo que exige aplicação de advertência formal no histórico escolar do estudante.',
          'Indício de bullying relacional velado que deve ser mantido sob vigilância ostensiva contínua por parte da coordenação.'
        ],
        correta: 1,
        explicacao: 'O incidente é desprovido de intencionalidade hostil e de reiteração sistemática. A presença de desculpas sinceras e reparação material voluntária caracteriza a resolução madura de um atrito pontual.',
        competencia: 'convivencia',
        referencia: 'Diferenciação Pedagógica: Conflito vs Intimidação Sistemática (MEC)'
      },
      {
        id: 'sr_4',
        pergunta: 'Um trio de alunos passa a imitar sistematicamente o sotaque sertanejo e as expressões regionais de um novato com risinhos toda vez que ele responde a perguntas do professor. O aluno passou a faltar aos dias de seminário. Como a equipe gestora deve atuar?',
        opcoes: [
          'Recomendar ao novato que consulte uma fonoaudióloga para neutralizar seu sotaque e facilitar sua integração com a maioria da turma.',
          'Reconhecer que se trata de bullying linguístico/cultural com impacto lesivo comprovado no direito à educação e no bem-estar, intervindo com ações pedagógicas de combate à xenofobia interna e acolhendo a vítima.',
          'Suspender sumariamente o estudante novato das apresentações orais para que sua ansiedade não prejudique o rendimento das avaliações.',
          'Considerar que a imitação é apenas uma forma de acolhimento bem-humorado da juventude e não demanda atenção especial da orientação.'
        ],
        correta: 1,
        explicacao: 'A ridicularização contínua de marcadores identitários linguísticos configura discriminação e intimidação sistemática. O absenteísmo escolar é sintoma grave de sofrimento que exige intervenção institucional firme.',
        competencia: 'bullying',
        referencia: 'Lei nº 13.185/2015 e Diretrizes de Direitos Humanos na Educação'
      },
      {
        id: 'sr_5',
        pergunta: 'Em aulas práticas de Educação Física, determinado aluno é invariavelmente o último a ser escolhido nas divisões de times, acompanhado de suspiros ostensivos dos capitães e comentários como: "Ah não, ele de novo vai afundar o time". Qual a diretriz pedagógica correta?',
        opcoes: [
          'Manter a dinâmica tradicional de escolha por capitães para que o estudante se sinta desafiado a treinar esportes no contraturno.',
          'Modificar o modelo de seleção para dinâmicas cooperativas, mistas e inclusivas mediadas pelo docente, rompendo o ciclo de humilhação pública e valorizando a participação de todos.',
          'Dispensar o aluno das aulas de Educação Física e atribuir-lhe trabalhos teóricos individuais na biblioteca para resguardá-lo do contato social.',
          'Permitir que os times joguem com um integrante a menos para não penalizar a pontuação dos estudantes mais atléticos.'
        ],
        correta: 1,
        explicacao: 'A escolha por capitães com exclusão sistemática reproduz hierarquias opressoras e estigmas corporais. Cabe à mediação docente adotar metodologias pedagógicas inclusivas que previnam a exposição vexatória.',
        competencia: 'convivencia',
        referencia: 'Parâmetros Curriculares Nacionais e Práticas Inclusivas na Educação Física'
      },
      {
        id: 'sr_6',
        pergunta: 'Ao notar que um colega usa calçados remendados, dois alunos tiram fotos dos pés dele disfarçadamente e criam uma montagem comparando a foto a um personagem de desenho animado, publicando-a em uma rede social aberta. Juridicamente, essa conduta:',
        opcoes: [
          'Não possui repercussão jurídica porque a fotografia capturou apenas o calçado e não o rosto da pessoa retratada.',
          'Viola o direito à imagem, a honra e a dignidade protegidos pelo ECA e pelo Código Civil, configurando ato análogo a cyberbullying e discriminação socioeconômica.',
          'É considerada exercício regular de crítica artística estudantil tutelada pela Lei de Direitos Autorais.',
          'Transfere a responsabilidade para a fabricante do calçado por não produzir produtos com durabilidade suficiente para o ambiente escolar.'
        ],
        correta: 1,
        explicacao: 'O direito à integridade moral e à imagem é amplamente protegido (ECA Art. 17; Código Civil Art. 20). A exposição vexatória com foco na vulnerabilidade socioeconômica configura violência psicológica reprovável e indenizável.',
        competencia: 'direitos',
        referencia: 'Estatuto da Criança e do Adolescente (Art. 17 e 18) e Código Civil (Art. 20)'
      },
      {
        id: 'sr_7',
        pergunta: 'Um aluno flagra colegas quebrando torneiras do sanitário escolar e, munido de senso de cuidado público, comunica a equipe diretiva. Ao descobrirem a autoria do relato, os infratores passam a chamá-lo de "traidor" e convocam a turma a não sentar perto dele. Como a escola deve conduzir a situação?',
        opcoes: [
          'Proteger o sigilo do estudante informante, repreender com rigor a retaliação coletiva e dialogar com a turma sobre a importância cívica de preservar o patrimônio que pertence a toda a comunidade.',
          'Sugerir que o aluno informante peça desculpas aos vândalos para pacificar o clima de hostilidade entre os grupos da sala.',
          'Transferir imediatamente o estudante que denunciou para outra unidade escolar para evitar maiores tensões nos corredores.',
          'Declarar que o vandalismo em sanitários é responsabilidade exclusiva dos serventes de limpeza e encerrar o caso sem providências.'
        ],
        correta: 0,
        explicacao: 'A cidadania ativa que zela pelo bem coletivo deve ser respaldada e protegida pela gestão escolar. Permitir a intimidação retaliatória ensina a conivência criminosa com o vandalismo.',
        competencia: 'direitos',
        referencia: 'Lei nº 14.811/2024 e Princípios de Gestão Democrática Escolar'
      },
      {
        id: 'sr_8',
        pergunta: 'Uma estudante passa a receber bilhetes anônimos na carteira contendo ofensas pessoais diárias. Ela procura a orientação com medo, sem saber a autoria. Diante do anonimato da agressão, qual a postura institucional correta?',
        opcoes: [
          'Orientar a aluna a rasgar os bilhetes e fingir indiferença, argumentando que sem saber quem é o autor é impossível adotar providências pedagógicas.',
          'Coletar os bilhetes como evidências materiais, acolher a aluna com suporte socioemocional, intensificar a mediação preventiva na sala e realizar apuração técnica e discreta sem revitimizá-la.',
          'Reunir toda a sala e ameaçar cancelar a formatura de final de ano caso o autor anônimo não se entregue nos próximos cinco minutos.',
          'Divulgar o conteúdo dos bilhetes nos murais informativos da escola para que os pais reconheçam a letra dos próprios filhos.'
        ],
        correta: 1,
        explicacao: 'A ausência imediata de autoria não exime a escola do dever de custódia e proteção. Exige preservação dos registros, apoio psicológico à vítima e investigação pedagógica estratégica sem gerar pânico coletivo.',
        competencia: 'bullying',
        referencia: 'Protocolos de Enfrentamento ao Bullying Oculto (Ministério Público da Educação)'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 3. BULLYING NA PRÁTICA (10 Questões)
  // -----------------------------------------------------------------------
  {
    id: 'bullying_pratica',
    titulo: 'Bullying na Prática',
    subtitulo: 'Intimidação sistemática, repetição temporal e desequilíbrio real de forças',
    descricao: 'Domínio dos critérios dogmáticos, classificações legais da Lei nº 13.185/2015 e tipificação penal da Lei nº 14.811/2024.',
    categoria: 'fundamentos',
    dificuldade: 'muito_dificil',
    icone: '🛡️',
    cor: 'from-blue-600 to-indigo-800',
    questoesCount: 10,
    tempoMedioMinutos: 10,
    xpRecompensa: 85,
    tipo: 'multipla_escolha',
    questoes: [
      {
        id: 'bp_1',
        pergunta: 'Para que um ato de violência interpessoal seja tecnicamente qualificado como Intimidação Sistemática (Bullying) nos termos da Lei Federal nº 13.185/2015, exige-se a conjugação cumulativa de quais requisitos?',
        opcoes: [
          'Dano físico mensurável por exame de corpo de delito, envolvimento de armas e idade superior a 16 anos completos.',
          'Intencionalidade da ação, reiteração continuada dos atos no tempo e assimetria/desequilíbrio explícito de forças entre os sujeitos.',
          'Ocorrência compulsória dentro de sala de aula e presença de testemunha docente no momento exato da infração.',
          'Ausência prévia de laços de amizade e homologação de queixa-crime perante o Juizado Especial da Infância e Juventude.'
        ],
        correta: 1,
        explicacao: 'A definição legal repousa no tripé: intencionalidade de causar sofrimento, reiteração (repetição ao longo do tempo) e relação de poder desigual que impede a defesa em paridade de condições.',
        competencia: 'bullying',
        referencia: 'Lei Federal nº 13.185/2015 (Art. 1º, § 1º)'
      },
      {
        id: 'bp_2',
        pergunta: 'Por que a intervenção mediadora em casos confirmados de bullying sistemático grave não deve adotar como primeira etapa uma "sessão de conciliação direta face a face" entre agressor e vítima?',
        opcoes: [
          'Porque a legislação brasileira proíbe qualquer tipo de diálogo entre menores de idade desacompanhados de advogados constituídos.',
          'Porque a acentuada assimetria de poder e o medo consolidado da vítima geram risco iminente de revitimização e silenciamento forçado durante a sessão conjunta.',
          'Porque os agressores sempre se recusam a falar na presença de docentes orientadores da rede pública estadual.',
          'Porque a Justiça Restaurativa só é autorizada para crimes contra o patrimônio físico e nunca para danos de ordem psicológica.'
        ],
        correta: 1,
        explicacao: 'Em quadros de subjugação profunda, colocar a vítima diante do agressor sem preparo prévio individual desconsidera o terror psicológico, perpetuando o desequilíbrio e provocando revitimização traumática.',
        competencia: 'bullying',
        referencia: 'Manual de Práticas Restaurativas e Proteção à Vítima (CNJ e MEC)'
      },
      {
        id: 'bp_3',
        pergunta: 'A Lei nº 13.185/2015 categoriza as ações de intimidação em modalidades específicas. O que distingue com precisão o bullying na modalidade "material" da modalidade "psicológica"?',
        opcoes: [
          'O material atinge bens tangíveis e pertences do indivíduo (destruir cadernos, subtrair itens, rasgar roupas), enquanto o psicológico manipula o medo, isolamento e coerção moral.',
          'O material ocorre exclusivamente no percurso do transporte escolar, ao passo que o psicológico é restrito às atividades de recreio no colégio.',
          'O material é praticado exclusivamente por indivíduos do sexo masculino, enquanto o psicológico ocorre apenas no ambiente virtual feminino.',
          'O material envolve agressão corporal com marcas físicas visíveis, enquanto o psicológico não deixa nenhum tipo de consequência comportamental.'
        ],
        correta: 0,
        explicacao: 'O bullying material afeta o patrimônio do estudante (destruição, furto, estrago intencional de objetos), enquanto o psicológico abala a estrutura subjetiva através de chantagens, ameaças dissimuladas e terror mental.',
        competencia: 'bullying',
        referencia: 'Lei Federal nº 13.185/2015 (Art. 2º, Incisos III e V)'
      },
      {
        id: 'bp_4',
        pergunta: 'Um grupo alega que a imposição de determinado apelido pejorativo a um colega é apenas um "hábito cultural de brincadeira inofensiva da turma". Qual o teste de discernimento ético que desmorona essa argumentação?',
        opcoes: [
          'A quantidade de consoantes presentes no apelido em comparação com o nome de batismo do aluno.',
          'A verificação da reciprocidade e do consentimento genuíno: quando a pessoa apelidada manifesta desconforto, dor ou constrangimento e o comportamento insiste, cessa a brincadeira e instala-se o assédio moral.',
          'A consulta ao número de curtidas que uma foto com o apelido recebe nas páginas sociais dos membros da turma.',
          'A constatação de que o agressor possui notas superiores a 8,0 na disciplina de Língua Portuguesa.'
        ],
        correta: 1,
        explicacao: 'Brincadeira legítima pressupõe riso compartilhado e bilateralidade. Quando o riso de um é pago com o sofrimento e a humilhação do outro que pediu a cessação, trata-se de violência interpessoal inegável.',
        competencia: 'respeito',
        referencia: 'Critérios de Avaliação de Convivência e Dignidade Moral (Conselho Federal de Psicologia)'
      },
      {
        id: 'bp_5',
        pergunta: 'Na sociologia das violências escolares, o "Espectador Reforçador" difere do "Espectador Passivo" por qual dinâmica comportamental?',
        opcoes: [
          'O reforçador não desfere o ataque inicial, mas alimenta o poder do agressor por meio de risos, aplausos, compartilhamentos ou formação de plateia estimuladora.',
          'O reforçador é o profissional de segurança contratado pela escola para intervir nos intervalos entre os turnos de aula.',
          'O reforçador procura a coordenação imediatamente para registrar a queixa através do aplicativo seguro da instituição.',
          'O reforçador é o estudante que se oferece voluntariamente para assumir a culpa no lugar do verdadeiro infrator disciplinar.'
        ],
        correta: 0,
        explicacao: 'O agressor comumente atua para obter status social. O espectador reforçador valida e premeia a crueldade com aplausos e risadas, sendo engrenagem decisiva na manutenção do ecossistema do bullying.',
        competencia: 'convivencia',
        referencia: 'Estudos de Dan Olweus e Christina Salmivalli sobre os Papéis Sociais no Bullying'
      },
      {
        id: 'bp_6',
        pergunta: 'Estudos longitudinais de neuropsiquiatria infantil apontam que a exposição crônica ao bullying durante a adolescência afeta o desenvolvimento biológico em razão de:',
        opcoes: [
          'Aumento repentino da capacidade cardiovascular e fortalecimento espontâneo do sistema imunológico da vítima.',
          'Hiperativação contínua do eixo hipotálamo-hipófise-adrenal com secreção tóxica de cortisol, gerando danos na memória, ansiedade generalizada e depressão crônica.',
          'Diminuição dos níveis de glicose no sangue provocada exclusivamente por alterações na grade horária das aulas de matemática.',
          'Neutralização total de qualquer predisposição genética a transtornos de humor ou fobia social na vida adulta.'
        ],
        correta: 1,
        explicacao: 'O estresse tóxico crônico decorrente de perseguição sistemática desregula a resposta neuroendócrina, causando alterações estruturais no hipocampo e na amígdala com reflexos duradouros na saúde mental.',
        competencia: 'bullying',
        referencia: 'Pesquisas da Sociedade Brasileira de Pediatria e Fundação Oswaldo Cruz (Fiocruz)'
      },
      {
        id: 'bp_7',
        pergunta: 'Em relação ao agressor reincidente no ambiente escolar, qual a diretriz prioritária da Justiça Restaurativa para romper a reincidência?',
        opcoes: [
          'A imposição isolada de punições vingativas públicas, pois a vergonha perante a escola é o único fator que intimida o infrator.',
          'O confronto pedagógico com o dano real produzido na vítima, associado à assunção ativa de responsabilidade moral e cumprimento de plano de reparação com suporte orientador.',
          'A transferência compulsória imediata para o período noturno sem notificação prévia aos responsáveis legais ou Conselho Tutelar.',
          'A concessão de cargos de representação de turma para estimular a liderança do agressor através do exercício do poder sobre os colegas.'
        ],
        correta: 1,
        explicacao: 'A punição meramente retributiva (suspensão passiva em casa) não desenvolve empatia nem corrige o padrão agressivo. A abordagem restaurativa demanda compreensão do impacto e reparação concreta dos vínculos.',
        competencia: 'convivencia',
        referencia: 'Diretrizes do CNJ para Práticas Restaurativas no Sistema Educacional'
      },
      {
        id: 'bp_8',
        pergunta: 'Quando a intimidação sistemática atinge estudantes com deficiência (física, auditiva, visual ou neurodivergentes como TEA), qual a qualificação jurídica aplicável?',
        opcoes: [
          'O fato deixa de ser considerado bullying e passa a ser tratado como desentendimento corriqueiro por envolver laudos médicos.',
          'Qualifica-se como circunstância agravante grave pela extrema vulnerabilidade da vítima, incorrendo também em violação expressa ao Estatuto da Pessoa com Deficiência (Lei nº 13.146/2015).',
          'Isenta a escola de qualquer providência, cabendo unicamente à família da criança com deficiência providenciar ensino domiciliar.',
          'Gera apenas a obrigação de a escola comprar novos aparelhos de som para as salas de aula do ensino fundamental.'
        ],
        correta: 1,
        explicacao: 'Praticar atos discriminatórios ou humilhantes contra pessoas com deficiência atrai agravamento severo de penalidades, violando a Lei 13.146/2015 (Art. 88) e o Art. 146-A do Código Penal.',
        competencia: 'direitos',
        referencia: 'Estatuto da Pessoa com Deficiência (Lei Federal nº 13.146/2015)'
      },
      {
        id: 'bp_9',
        pergunta: 'Um coordenador pedagógico é procurado por um aluno que relata estar sofrendo extorsão continuada no pátio por um grupo que exige seu dinheiro de lanche. O que o coordenador DEVE fazer conforme o protocolo técnico?',
        opcoes: [
          'Dizer ao aluno para não trazer mais dinheiro para a escola e aguardar o próximo bimestre para avaliar se as ameaças persistem.',
          'Acolher com sigilo, registrar formalmente a narrativa, garantir a integridade imediata da vítima, acionar os responsáveis de ambos os lados e notificar a rede protetiva caso haja risco grave.',
          'Organizar uma roda pública no pátio para que todos os alunos da escola votem em quem está falando a verdade no caso.',
          'Orientar a vítima a revidar a agressão fisicamente no portão da escola com o apoio de familiares armados.'
        ],
        correta: 1,
        explicacao: 'O relato de extorsão e ameaça exige acolhimento seguro, cessação imediata da situação de risco, registro formal com preservação da identidade do estudante e comunicação aos responsáveis sob mediação técnica.',
        competencia: 'direitos',
        referencia: 'Protocolo de Resposta a Emergências e Proteção Infantojuvenil (ECA e Lei 14.811/2024)'
      },
      {
        id: 'bp_10',
        pergunta: 'Por que o bullying de exclusão social e boicote relacional ("ignorar como se não existisse") é frequentemente apontado por psicólogos como tão ou mais prejudicial do que o bullying verbal explícito?',
        opcoes: [
          'Porque a exclusão silenciosa mina a necessidade humana fundamental de pertencimento, gerando dor psíquica profunda com difícil detecção externa por parte dos docentes.',
          'Porque o boicote relacional é a única modalidade que possui previsão de pena de prisão perpétua no Código Penal brasileiro.',
          'Porque os alunos que excluem colegas sempre pertencem a redes internacionais organizadas de cibercrime profissional.',
          'Porque a exclusão impede os estudantes de realizarem matrículas escolares em vestibulares públicos e cursos superiores.'
        ],
        correta: 0,
        explicacao: 'O ostracismo afeta áreas neurais correlatas à dor física real (córtex cingulado anterior). Sua natureza velada dificulta a obtenção de provas explícitas, gerando sentimento crônico de invisibilidade e impotência.',
        competencia: 'bullying',
        referencia: 'Estudos de Ostracismo Social (Kipling Williams) e Psicologia da Vitimização'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 4. VIDA ONLINE E CYBERBULLYING (8 Questões)
  // -----------------------------------------------------------------------
  {
    id: 'vida_online',
    titulo: 'Vida Online e Cyberbullying',
    subtitulo: 'Art. 146-A do Código Penal, pegada digital, deepfakes e custódia de evidências',
    descricao: 'Análise de crimes cibernéticos, compartilhamento indevido, cadeia de preservação de provas no Marco Civil da Internet e responsabilidade civil e penal.',
    categoria: 'cyber',
    dificuldade: 'muito_dificil',
    icone: '💻',
    cor: 'from-purple-600 to-indigo-900',
    questoesCount: 8,
    tempoMedioMinutos: 9,
    xpRecompensa: 75,
    tipo: 'multipla_escolha',
    questoes: [
      {
        id: 'vo_1',
        pergunta: 'Com a inovação legislativa introduzida pela Lei Federal nº 14.811/2024 no Código Penal (Art. 146-A, Parágrafo Único), qual a sanção expressamente cominada para a conduta de Intimidação Sistemática Virtual (Cyberbullying)?',
        opcoes: [
          'Pena exclusiva de prestação pecuniária aos fundos municipais de assistência social sem qualquer registro na folha penal.',
          'Reclusão de 2 (dois) a 4 (quatro) anos, além de multa, se a conduta não constituir crime mais grave.',
          'Advertência por escrito e cancelamento temporário da linha telefônica perante a Agência Nacional de Telecomunicações.',
          'Perda compulsória da guarda familiar e internação automática em estabelecimento prisional militar de segurança máxima.'
        ],
        correta: 1,
        explicacao: 'O Art. 146-A do Código Penal previu a modalidade qualificada de cyberbullying: se a intimidação for cometida mediante redes sociais, aplicativos de mensagens, jogos online ou transmissões em tempo real, a pena é de reclusão de 2 a 4 anos e multa.',
        competencia: 'direitos',
        referencia: 'Art. 146-A, Parágrafo Único do Código Penal (redação dada pela Lei 14.811/2024)'
      },
      {
        id: 'vo_2',
        pergunta: 'Um print contendo conversa íntima e confidencial de uma estudante é repassado em grupos de WhatsApp. O estudante que recebe o material decide encaminhá-lo para outras três salas. Sob a ótica da responsabilidade civil e digital:',
        opcoes: [
          'O encaminhador é isento de culpa por não ter sido o criador original do print e não ter redigido o texto vazado.',
          'O ato de reencaminhar viola a privacidade e amplia a lesão moral, ensejando responsabilidade solidária por danos morais perante a vítima.',
          'O reencaminhamento de mensagens é considerado exercício regular de direito de informação jornalística estudantil.',
          'Apenas os administradores dos servidores do aplicativo de mensagens sediados nos Estados Unidos respondem pela infração.'
        ],
        correta: 1,
        explicacao: 'O STJ consolidou que o compartilhamento e a viralização de dados privados e conteúdos difamatórios geram responsabilidade civil solidária (Art. 942 do CC), pois quem propaga o dano coopera diretamente para o ilícito.',
        competencia: 'cyber',
        referencia: 'Superior Tribunal de Justiça (STJ) - REsp 1.777.712 e Marco Civil da Internet'
      },
      {
        id: 'vo_3',
        pergunta: 'Por que a crença de que criar perfis falsos ("fakes") em redes sociais ou utilizar conexões de terceiros garante anonimato inexpugnável é juridicamente e tecnicamente falsa no Brasil?',
        opcoes: [
          'Porque a Constituição veda o anonimato (Art. 5º, IV) e o Marco Civil da Internet (Lei 12.965/14) impõe aos provedores a guarda compulsória de registros de conexão e de aplicação, permitindo identificação judicial do IP e do assinante.',
          'Porque os diretores de escolas possuem autorização expressa para grampear celulares de qualquer estudante sem autorização da Justiça.',
          'Porque as redes sociais cancelam automaticamente contas que não possuem fotos de perfil comprovadas por exame grafotécnico.',
          'Porque os provedores de internet compartilham livremente as senhas dos usuários com os grêmios estudantis municipais.'
        ],
        correta: 0,
        explicacao: 'O Marco Civil da Internet (Arts. 10 e 15) obriga a guarda de logs por até 1 ano. Em ação de quebra de sigilo por ordem judicial, a operadora identifica o IP, a porta lógica, a data, a hora e a titularidade da conexão usada.',
        competencia: 'direitos',
        referencia: 'Constituição Federal (Art. 5º, IV) e Lei Federal nº 12.965/2014 (Marco Civil da Internet)'
      },
      {
        id: 'vo_4',
        pergunta: 'Ao se deparar com postagens difamatórias ou ameaças direcionadas a um colega em redes sociais, qual o procedimento técnico correto para preservar o valor probatório das evidências antes de registrar a denúncia?',
        opcoes: [
          'Apagar o aplicativo imediatamente para impedir que o agressor envie novas mensagens de provocação no aparelho.',
          'Capturar telas com contexto amplo (incluindo URL completa, perfil do emissor, número de telefone, carimbo de data e hora) e, se cabível, registrar ata notarial em cartório ou preservação via blockchain/plataformas certificadas.',
          'Digitar novamente as ofensas no Word e enviar o arquivo de texto simples como prova definitiva para a Promotoria de Justiça.',
          'Pedir que outros cem alunos curtam a publicação para comprovar que o conteúdo possuía grande audiência no município.'
        ],
        correta: 1,
        explicacao: 'A preservação probatória exige integridade da cadeia de custódia: capturas com URLs visíveis, identificação precisa de perfis e horários, e autenticação que impeça alegações futuras de manipulação fotográfica.',
        competencia: 'cyber',
        referencia: 'Código de Processo Civil (Art. 384 e Art. 411) e Guia Prático de Perícia Digital da SaferNet'
      },
      {
        id: 'vo_5',
        pergunta: 'A utilização de ferramentas de Inteligência Artificial para gerar montagens manipuladas de rostos de colegas e professoras (deepfakes) em corpos despidos ou situações vexatórias configura qual enquadramento legal?',
        opcoes: [
          'Trata-se de mero experimento lúdico com novas tecnologias que dispensa averiguação legal por ausência de contato físico real.',
          'Constitui conduta gravíssima enquadrada em crime contra a dignidade sexual/honra e cyberbullying hediondo, além de infração grave disciplinar e responsabilidade civil indenizatória dos responsáveis legais.',
          'É considerada atividade artística de domínio público permitida desde que a foto original estivesse publicada em rede social aberta.',
          'Configura apenas infração de trânsito digital punível com desconto de pontuação em plataformas de jogos multiplayer.'
        ],
        correta: 1,
        explicacao: 'A criação e compartilhamento de deepfakes eróticos ou difamatórios fere frontalmente o Art. 216-B e 218-C do Código Penal e a Lei 14.811/2024, sujeitando autores maiores a prisão e menores a medidas socioeducativas severas.',
        competencia: 'direitos',
        referencia: 'Código Penal Brasileiro (Art. 216-B, Art. 218-C) e Lei Federal nº 14.811/2024'
      },
      {
        id: 'vo_6',
        pergunta: 'Em servidores e grupos de jogos da turma de ensino médio, um estudante é repetidamente mutado pelos administradores, expulso de partidas e recebe apelidos de baixo calão nas salas de voz. O que essa conduta evidencia?',
        opcoes: [
          'Um exercício padrão e salutar das regras de moderação privada que deve ser incentivado em todas as plataformas de entretenimento.',
          'Uma prática de cyberbullying de exclusão, cerceamento e humilhação em ambientes digitais de lazer de pares, com impacto negativo no senso de pertencimento e autoestima do jovem.',
          'Um sinal evidente de que a placa de vídeo do computador do estudante precisa ser substituída por componentes de última geração.',
          'Uma diretriz obrigatória de segurança que os servidores mundiais de jogos aplicam a todos os novos jogadores matriculados em escolas estaduais.'
        ],
        correta: 1,
        explicacao: 'O silenciamento deliberado e a ridicularização em espaços de sociabilidade digital juvenil constituem violência relacional virtual. O lazer escolarizado exige ambientes seguros e não tóxicos.',
        competencia: 'cyber',
        referencia: 'Diretrizes de Comunidade e Convivência Digital Segura da SaferNet Brasil'
      },
      {
        id: 'vo_7',
        pergunta: 'O fenômeno conhecido como "Doxxing" (exposição pública e desautorizada de dados pessoais como endereço residencial, telefone dos pais e rotinas diárias da vítima na web) é considerado de alta periculosidade porque:',
        opcoes: [
          'Facilita que outros alunos enviem cartões de aniversário físicos pelos Correios sem precisar pedir autorização prévia.',
          'Derruba as barreiras de proteção do ambiente digital e expõe a vítima e sua família a perseguições reais, assédio em massa presencial, furtos e violência física no mundo concreto.',
          'Obriga a companhia de energia elétrica da cidade a cortar o fornecimento de luz do bairro onde o aluno reside.',
          'Reduz a velocidade de download de arquivos pesados em redes Wi-Fi públicas instaladas em praças da cidade.'
        ],
        correta: 1,
        explicacao: 'Doxxing transporta a violência virtual para o mundo físico. Ao divulgar endereços e itinerários, o agressor fomenta o "assédio em enxame" (swarming) e coloca em risco direto a incolumidade física da vítima e familiares.',
        competencia: 'cyber',
        referencia: 'Cartilha de Segurança para a Internet (CERT.br / CGI.br)'
      },
      {
        id: 'vo_8',
        pergunta: 'Ao receber mensagem anônima contendo chantagem que exige fotos íntimas sob a ameaça de vazar segredos escolares da vítima (sextorsão), qual a conduta imediata orientada pelos especialistas em segurança digital?',
        opcoes: [
          'Ceder imediatamente à exigência para ganhar tempo e tentar descobrir sozinho quem está por trás do número desconhecido.',
          'Não ceder à extorsão (pois a chantagem nunca cessa), não apagar as mensagens, salvar os registros de tela/links e acionar com urgência um adulto de confiança, a coordenação da escola ou a Delegacia Especializada/Disque 100.',
          'Mandar fotos de outras pessoas da turma para desviar a atenção do chantagista e proteger a própria privacidade individual.',
          'Aguardar trinta dias em silêncio para conferir se o chantagista desiste da proposta por falta de resposta rápida.'
        ],
        correta: 1,
        explicacao: 'Ceder à chantagem só alimenta novas exigências predatórias. A orientação técnica é romper o isolamento, preservar o rastro probatório sem deletar os chats e acionar prontamente as redes de acolhimento e investigação competente.',
        competencia: 'direitos',
        referencia: 'Protocolo de Resposta a Sextorsão Infantojuvenil (SaferNet Brasil e Polícia Civil)'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 5. DIREITOS E RESPONSABILIDADES (8 Questões)
  // -----------------------------------------------------------------------
  {
    id: 'direitos_responsabilidades',
    titulo: 'Direitos e Responsabilidades',
    subtitulo: 'Marco legal brasileiro: ECA, Código Penal, Lei 14.811/24 e responsabilidade civil',
    descricao: 'Conhecimento técnico sobre o dever de garante de educadores, medidas socioeducativas para adolescentes, reparação cível por pais e a doutrina da proteção integral.',
    categoria: 'legislacao',
    dificuldade: 'desafio',
    icone: '⚖️',
    cor: 'from-cyan-600 to-blue-800',
    questoesCount: 8,
    tempoMedioMinutos: 9,
    xpRecompensa: 90,
    tipo: 'multipla_escolha',
    questoes: [
      {
        id: 'dr_1',
        pergunta: 'Conforme a Lei Federal nº 14.811/2024, qual a responsabilidade atribuída a estabelecimentos de ensino, clubes e agremiações recreativas quanto à prevenção de violências contra crianças e adolescentes?',
        opcoes: [
          'Limitar-se a acionar a autoridade policial após a ocorrência de agressões físicas com lesões consumadas no interior das dependências.',
          'Manter planos e protocolos atualizados de prevenção e combate à violência, capacitar continuamente seu corpo docente e funcionários e estabelecer medidas de proteção e acolhimento.',
          'Transferir a responsabilidade total de vigilância e convivência ética aos próprios estudantes através de conselhos disciplinares sem adultos.',
          'Proibir a entrada de pais e responsáveis nas dependências do colégio para resguardar a autonomia dos docentes.'
        ],
        correta: 1,
        explicacao: 'A Lei 14.811/2024 impôs obrigações proativas a todas as instituições escolares: manter medidas preventivas permanentes, qualificar os profissionais em mediação e instituir canais protetivos e de atendimento ágil.',
        competencia: 'direitos',
        referencia: 'Lei nº 14.811/2024 (Art. 2º e seguintes)'
      },
      {
        id: 'dr_2',
        pergunta: 'Muitos adolescentes sustentam que, por terem menos de 18 anos, "não respondem por nada perante a lei" quando cometem agressões ou difamações sistemáticas. Qual a realidade jurídica estabelecida pelo Estatuto da Criança e do Adolescente (ECA)?',
        opcoes: [
          'Adolescentes de 12 a 18 anos são imputáveis penalmente sob a forma de ato infracional, sujeitos a medidas socioeducativas que variam de advertência a internação em estabelecimento educacional privativo de liberdade.',
          'A legislação brasileira realmente não prevê nenhuma consequência jurídica para menores de idade que praticam bullying ou agressões graves.',
          'Menores de idade só respondem perante a Justiça caso seus responsáveis legais concordem expressamente com a aplicação das penas.',
          'O ECA determina que qualquer infração cometida por estudante prescreve automaticamente em 24 horas caso ele peça desculpas na escola.'
        ],
        correta: 0,
        explicacao: 'Adolescentes respondem por atos infracionais (Arts. 103 e 112 do ECA). Podem cumprir obrigação de reparar o dano, prestação de serviços à comunidade, liberdade assistida e, em casos graves com violência, internação.',
        competencia: 'direitos',
        referencia: 'Estatuto da Criança e do Adolescente (Art. 103, 104 e 112 da Lei nº 8.069/1990)'
      },
      {
        id: 'dr_3',
        pergunta: 'Em relação aos danos morais e materiais decorrentes de bullying e perseguições virtuais praticadas por estudantes menores de idade, como o Código Civil Brasileiro disciplina a responsabilidade dos pais ou responsáveis legais?',
        opcoes: [
          'Os pais respondem civil e objetivamente pela reparação das indenizações devidas pelos atos ilícitos cometidos pelos filhos menores sob sua autoridade e guarda.',
          'Os pais ficam isentos de indenizar caso comprovem que matricularam os filhos em escolas públicas de tempo integral.',
          'A responsabilidade recai exclusivamente sobre a operadora de telefonia celular utilizada para o envio das mensagens ofensivas.',
          'A lei brasileira não admite indenização por dano moral em conflitos ocorridos entre estudantes da rede básica de ensino.'
        ],
        correta: 0,
        explicacao: 'O Art. 932, I e Art. 933 do Código Civil consagram a responsabilidade civil objetiva dos pais por atos dos filhos menores. Famílias de agressores vêm sendo reiteradamente condenadas a pagar indenizações vultosas por danos morais.',
        competencia: 'direitos',
        referencia: 'Código Civil Brasileiro (Art. 932, Inciso I e Art. 933)'
      },
      {
        id: 'dr_4',
        pergunta: 'O Art. 245 do ECA pune criminal e administrativamente o médico, professor ou responsável por estabelecimento de atenção à saúde e de ensino fundamental, pré-escola ou creche que:',
        opcoes: [
          'Deixar de comunicar à autoridade competente (Conselho Tutelar ou Ministério Público) os casos de que tenha conhecimento envolvendo suspeita ou confirmação de maus-tratos contra criança ou adolescente.',
          'Recusar-se a aplicar provas escritas em dias com temperaturas climáticas superiores a trinta e cinco graus Celsius.',
          'Permitir que os alunos utilizem computadores para realizar pesquisas escolares durante as aulas de contraturno da unidade de ensino.',
          'Deixar de comparecer a solenidades cívicas organizadas pela Câmara Municipal de Vereadores de Madalena.'
        ],
        correta: 0,
        explicacao: 'Educadores possuem dever legal de agir (posição de garante). A omissão na notificação de situações de violência, assédio crônico ou maus-tratos enseja infração administrativa prevista no Art. 245 do ECA.',
        competencia: 'direitos',
        referencia: 'Estatuto da Criança e do Adolescente (Art. 245)'
      },
      {
        id: 'dr_5',
        pergunta: 'Qual a competência legal precípua do Conselho Tutelar quando acionado pela escola para intervir em um caso crônico de intimidação sistemática e vulnerabilidade sociofamiliar?',
        opcoes: [
          'Julgar penalmente os estudantes envolvidos e aplicar sentenças de prisão imediata em celas de delegacia civil.',
          'Zelar pelo cumprimento dos direitos da criança e do adolescente, aplicando medidas protetivas de acompanhamento familiar, requisição de serviços públicos e inclusão em programas comunitários.',
          'Substituir a equipe diretiva do colégio na administração patrimonial e na contratação de professores para a rede de ensino.',
          'Exigir que a vítima mude de residência para outro município como pré-requisito para o início do atendimento protetivo.'
        ],
        correta: 1,
        explicacao: 'O Conselho Tutelar é órgão autônomo, não jurisdicional, encarregado pela sociedade de zelar pela garantia de direitos (ECA Art. 131 e 136), aplicando medidas de proteção e requisitando serviços de saúde e assistência.',
        competencia: 'direitos',
        referencia: 'ECA (Art. 131 e Art. 136 da Lei nº 8.069/1990)'
      },
      {
        id: 'dr_6',
        pergunta: 'A Lei nº 14.811/2024 introduziu alterações significativas na Lei dos Crimes Hediondos (Lei nº 8.072/1990). Qual conduta passou a integrar o rol de crimes hediondos ou equiparados quando cometida contra crianças e adolescentes?',
        opcoes: [
          'Atrasar a devolução de livros didáticos emprestados pelo acervo da biblioteca municipal de Madalena.',
          'O induzimento, instigação ou auxílio ao suicídio ou à automutilação por meio da rede de computadores ou transmissões em tempo real, além de sequestro e cárcere privado de menores.',
          'A discordância pacífica de alunos em relação aos critérios de avaliação aplicados na gincana esportiva escolar.',
          'O uso de calçados que não estejam em conformidade estrita com o padrão de cores da bandeira do estado do Ceará.'
        ],
        correta: 1,
        explicacao: 'A Lei 14.811/2024 incluiu crimes graves contra vulneráveis no rol de hediondos, como o incentivo à automutilação ou suicídio online e o sequestro, demonstrando tolerância zero com violências que atentam contra a vida jovem.',
        competencia: 'direitos',
        referencia: 'Lei nº 8.072/1990 (com redação dada pela Lei nº 14.811/2024)'
      },
      {
        id: 'dr_7',
        pergunta: 'O Art. 17 do ECA consagra o "Direito ao Respeito". Segundo a doutrina jurídica, esse direito abrange expressamente:',
        opcoes: [
          'A inviolabilidade da integridade física, psíquica e moral da criança e do adolescente, abrangendo a preservação da imagem, da identidade, da autonomia, dos valores, das ideias e dos pertences.',
          'A garantia de que alunos com histórico indisciplinar nunca poderão receber advertências formais da coordenação pedagógica.',
          'A obrigatoriedade de todas as salas de aula contarem com sistema de ar-condicionado individual importado da Alemanha.',
          'O direito de faltar a até cinquenta por cento das aulas sem necessidade de justificativa formal por parte dos pais.'
        ],
        correta: 0,
        explicacao: 'O direito ao respeito é cláusula pétrea de salvaguarda da dignidade ontológica da infância: veda qualquer constrangimento, humilhação, violação da imagem ou tratamento degradante.',
        competencia: 'direitos',
        referencia: 'Estatuto da Criança e do Adolescente (Art. 17 e Art. 18)'
      },
      {
        id: 'dr_8',
        pergunta: 'Qual a consequência jurídica e ética quando um funcionário da escola observa um aluno ser violentamente agredido no corredor e decide afastar-se sem chamar ajuda ou intervir, dizendo que "não é da sua conta"?',
        opcoes: [
          'Sua conduta é louvável por evitar que o funcionário se envolva em polêmicas que possam prejudicar suas férias anuais.',
          'Comete omissão culposa ou dolosa e descumpre o dever legal de garante imposto aos agentes escolares, sujeitando-se a apuração de infração disciplinar/administrativa e eventual responsabilização penal.',
          'Fica totalmente isento, pois o dever de cuidado nas escolas públicas cabe única e exclusivamente aos policiais fardados em serviço.',
          'A responsabilidade é transferida para o fabricante do portão de ferro que não impediu o aluno de acessar o corredor da unidade.'
        ],
        correta: 1,
        explicacao: 'Todo servidor em ambiente escolar possui dever de proteção decorrente de lei (CP Art. 13, § 2º). A omissão diante de agressão iminente configura descumprimento funcional grave com repercussão administrativa e penal.',
        competencia: 'direitos',
        referencia: 'Código Penal (Art. 13, § 2º) e Estatuto dos Servidores Públicos'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 6. VOCÊ PERCEBEU? - SINAIS SUTIS (6 Questões)
  // -----------------------------------------------------------------------
  {
    id: 'voce_percebeu',
    titulo: 'Você Percebeu?',
    subtitulo: 'Microagressões, sinais de somatização e leitura de dor disfarçada',
    descricao: 'Diagnóstico precoce de sinais não-verbais, sintomas somáticos, isolamento programado e manifestações disfarçadas de agressão interpessoal.',
    categoria: 'cotidiano',
    dificuldade: 'desafio',
    icone: '👀',
    cor: 'from-rose-600 to-red-800',
    questoesCount: 6,
    tempoMedioMinutos: 8,
    xpRecompensa: 85,
    tipo: 'multipla_escolha',
    questoes: [
      {
        id: 'vp_1',
        pergunta: 'Durante uma apresentação de seminário, um trio de alunos na primeira fileira combina de tossir de forma sincronizada toda vez que determinada estudante inicia uma frase, trocando olhares irônicos. A oradora começa a gaguejar, tremer e interrompe a fala. Tecnicamente, esse comportamento configura:',
        opcoes: [
          'Uma coincidência física alérgica comum em salas de aula climatizadas que não traduz intencionalidade hostil.',
          'Uma microagressão orquestrada e dissimulada de sabotagem psicológica, desenhada para desestabilizar a vítima e produzir humilhação sem gerar flagrante ostensivo evidente.',
          'Uma manifestação espontânea e saudável da plateia jovem que estimula a resiliência comunicativa da colega em situações sob pressão.',
          'Um indício formal de que o tempo regulamentar da apresentação oral havia se esgotado perante a comissão julgadora.'
        ],
        correta: 1,
        explicacao: 'Microagressões planejadas utilizam ruídos cotidianos para agredir sem deixar rastros escandalosos. O impacto psicológico na vítima é imediato e demanda interrupção e posicionamento claro do docente mediador.',
        competencia: 'bullying',
        referencia: 'Sociologia do Clima Escolar e Teoria das Microagressões (Derald Wing Sue)'
      },
      {
        id: 'vp_2',
        pergunta: 'Um estudante habitualmente participativo passa a usar blusas de manga comprida mesmo em dias com temperatura acima de 34ºC em Madalena, evita trocar de roupa para a Educação Física e senta-se no canto mais escuro do pátio. Qual hipótese diagnóstica preventiva deve ser considerada com prioridade pela orientação?',
        opcoes: [
          'Adoção temporária de estilo musical gótico sem nenhuma implicação na saúde mental do adolescente.',
          'Sinais clássicos de alerta para sofrimento psíquico agudo, ocultação de marcas de violência física sofrida ou prática de autolesão não-suicida (cutting), demandando acolhimento sensível e especializado.',
          'Desenvolvimento precoce de intolerância térmica que deve ser solucionada com a instalação de ventiladores portáteis na mesa.',
          'Tentativa de atrair atenção superficial para conseguir votos na próxima eleição de líderes de classe do grêmio.'
        ],
        correta: 1,
        explicacao: 'O uso atípico de roupas longas em clima quente associado ao isolamento e mudança drástica de comportamento é sinal preponderante de sofrimento psíquico, autolesão ou hematomas ocultados por vergonha e medo.',
        competencia: 'respeito',
        referencia: 'Protocolo de Prevenção ao Sofrimento Psíquico e Autolesão na Escola (Ministério da Saúde / Fiocruz)'
      },
      {
        id: 'vp_3',
        pergunta: 'Um colega elogia um trabalho escolar do colega de origem humilde dizendo: "Caramba, até que ficou organizado, nem parece que foi feito por alguém da sua comunidade". O que essa fala encerra sob a perspectiva das relações interpessoais?',
        opcoes: [
          'Um reconhecimento generoso e meritocrático que deveria ser comemorado com entusiasmo pelo estudante elogiado.',
          'Um preconceito estrutural velado disfarçado de elogio (elogio condescendente/microagressão), que naturaliza o estereótipo estigmatizante de que indivíduos daquela comunidade carecem de competência intelectual.',
          'Uma homenagem formal prestada à comunidade que fortalece a identidade cultural de todos os seus moradores.',
          'Uma observação de rigor metodológico que auxilia a banca de professores a atribuir notas justas.'
        ],
        correta: 1,
        explicacao: 'Elogios que contêm embutida a surpresa com a competência de minorias ou grupos vulnerabilizados revelam viés preconceituoso. A microagressão diminui a autoestima e demarca fronteiras sociais excludentes.',
        competencia: 'respeito',
        referencia: 'Psicologia Social das Microagressões e Relações Étnico-Raciais'
      },
      {
        id: 'vp_4',
        pergunta: 'Toda vez que a turma se organiza em grupos de livre escolha, ninguém convida o mesmo aluno e todos desviam o olhar quando ele se aproxima, fazendo com que ele permaneça de pé sozinho no meio da sala por semanas consecutivas. Essa situação retrata:',
        opcoes: [
          'Um processo espontâneo e livre de afinidade pessoal que deve ser respeitado sem qualquer interferência da gestão pedagógica.',
          'Uma violência relacional de exclusão invisível crônica (ostracismo passivo), que gera sentimentos devastadores de inadequação e exige rodízio planejado e mediação ativa do professor.',
          'Uma oportunidade extraordinária para que o estudante desenvolva habilidades de liderança solitária e autossuficiência acadêmica.',
          'Um sinal de que o estudante deve ser orientado a frequentar a escola em regime de dependência no contraturno letivo.'
        ],
        correta: 1,
        explicacao: 'A exclusão sistemática na formação de equipes é uma das maiores fontes de sofrimento silencioso. A intervenção docente através de metodologias ativas de grupos cooperativos é essencial para garantir inclusão de fato.',
        competencia: 'convivencia',
        referencia: 'Dinâmicas de Grupos e Aprendizagem Cooperativa (David & Roger Johnson)'
      },
      {
        id: 'vp_5',
        pergunta: 'Uma estudante apresenta queixas diárias de dores de barriga e cefaleia cerca de 30 minutos antes do horário de embarque no ônibus escolar, mas os exames clínicos não revelam nenhuma patologia física. Essa somatização indica com alta probabilidade:',
        opcoes: [
          'Simulação consciente da estudante para evitar o cumprimento do calendário letivo de avaliações sem justificativa plausível.',
          'Manifestação somática de fobia escolar decorrente de estresse agudo e pânico gerado por episódios reiterados de perseguição, ameaças ou humilhação vivenciados no trajeto do transporte.',
          'Reação adversa provocada por componentes alimentares consumidos no café da manhã que independe de fatores emocionais.',
          'Necessidade de transferir a aluna para cursos técnicos a distância para extinguir o vínculo com os colegas do município.'
        ],
        correta: 1,
        explicacao: 'O corpo fala quando a voz é silenciada pelo medo. A somatização gastrointestinal pré-embarque é marcador clássico de pânico associado à antecipação da violência sofrida no trajeto escolar desprovido de vigilância.',
        competencia: 'bullying',
        referencia: 'Sinais Clínicos de Vitimização Infantojuvenil (Sociedade Brasileira de Pediatria)'
      },
      {
        id: 'vp_6',
        pergunta: 'Durante uma piada pejorativa dita por um aluno popular na sala, a maioria cai na risada, mas um estudante abaixa a cabeça, cerra os punhos e fixa os olhos no caderno em silêncio absoluto. Como decodificar essa linguagem corporal?',
        opcoes: [
          'Indica concordância plena e cumplicidade com o conteúdo verbal emitido pelo agressor popular.',
          'Expressa desconforto ético agudo, impotência e dissidência silenciosa motivada pelo medo de represálias, indicando um potencial aliado para intervenções de quebra do consenso de bullying.',
          'Representa desatenção crônica que exige encaminhamento médico imediato para investigação de déficit de atenção.',
          'Demonstra que o estudante está concentrado memorizando fórmulas matemáticas para a aula seguinte.'
        ],
        correta: 1,
        explicacao: 'A linguagem corporal de tensão e recolhimento revela o sofrimento moral do espectador que não valida a agressão, mas teme virar alvo. Identificar esses aliados silenciosos é o coração da mobilização Upstander.',
        competencia: 'convivencia',
        referencia: 'Comunicação Não-Verbal e Formação de Redes de Apoio entre Pares'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 7. O QUE VOCÊ FARIA? - TOMADA DE DECISÃO ÉTICA (8 Questões)
  // -----------------------------------------------------------------------
  {
    id: 'o_que_faria',
    titulo: 'O Que Você Faria?',
    subtitulo: 'Metodologia dos 4 D’s de ação ética: Direto, Distrair, Delegar e Dar Apoio',
    descricao: 'Dilemas éticos complexos onde atitudes impulsivas geram riscos e a sabedoria tática transforma a posição de espectador conivente em guardião ativo.',
    categoria: 'decisao',
    dificuldade: 'desafio',
    icone: '🤝',
    cor: 'from-teal-600 to-emerald-800',
    questoesCount: 8,
    tempoMedioMinutos: 9,
    xpRecompensa: 90,
    tipo: 'multipla_escolha',
    questoes: [
      {
        id: 'oq_1',
        pergunta: 'No final do recreio, você percebe que três estudantes corpulentos do 3º ano cercaram um aluno menor do 6º ano no vão escuro atrás dos vestiários, exigindo que ele entregue seu fone de ouvido sob ameaça física explícita. Você está sozinho. Segundo a técnica dos 4 D\'s, qual a conduta prioritária e mais segura?',
        opcoes: [
          'Partir imediatamente para o confronto corporal direto desarmado contra os três agressores para demonstrar bravura incondicional perante a escola.',
          'Aplicar com celeridade o método "DELEGAR": buscar no mesmo instante um inspetor, professor ou coordenador para realizar a abordagem com autoridade institucional e respaldo físico de segurança.',
          'Sacar o telefone e iniciar uma live pública em rede social zombando do ocorrido para constranger os agressores pela internet.',
          'Fingir indiferença e descer para a quadra, considerando que a resolução do impasse diz respeito exclusivamente aos envolvidos.'
        ],
        correta: 1,
        explicacao: 'Quando há manifesto risco à integridade física e assimetria numérica/de força, o método recomendado é DELEGAR: mobilizar imediatamente agentes com autoridade e capacidade de cessar o risco sem gerar novas vítimas.',
        competencia: 'direitos',
        referencia: 'Protocolo de Intervenção Ativa dos 4 D\'s (Delegar em Situações de Risco Físico)'
      },
      {
        id: 'oq_2',
        pergunta: 'Em uma roda de conversa amigável na biblioteca, um amigo próximo inicia uma série de piadas preconceituosas sobre o gênero e a orientação sexual de um colega ausente. Todos começam a achar graça. Você se incomoda. Qual atitude aplica com rigor ético o método "DIRETO"?',
        opcoes: [
          'Rir junto na hora para não ser rotulado de chato e, depois da aula, mandar mensagem anônima com xingamentos para o amigo.',
          'Posicionar-se com serenidade e clareza, rompendo o consenso do grupo: "Essa piada fere a dignidade dele, é preconceituosa e não combina com o respeito que temos aqui".',
          'Atirar livros no amigo na frente do bibliotecário para impor o silêncio por meio de intimidação física.',
          'Levantar-se sem dizer nenhuma palavra e pedir transferência de escola no mesmo dia por incompatibilidade ideológica.'
        ],
        correta: 1,
        explicacao: 'O método DIRETO consiste em confrontar a conduta com firmeza, clareza e respeito, sem recorrer à violência, desmontando a falsa sensação de que "todo mundo concorda com o preconceito".',
        competencia: 'respeito',
        referencia: 'Metodologia dos 4 D\'s da Intervenção Ativa (Método Direto)'
      },
      {
        id: 'oq_3',
        pergunta: 'Um colega da sua turma tropeça na fila da merenda, derruba a bandeja de comida e alguns alunos começam a filmar com o celular, apontando e debochando em coro. O colega está paralisado de constrangimento. Como aplicar de forma brilhante o método "DISTRAIR"?',
        opcoes: [
          'Gritar o nome dos agressores na fila exigindo que a polícia militar seja chamada imediatamente para prender os celulares.',
          'Aproximar-se rapidamente com um guardanapo, ignorar a plateia de deboche e dizer com naturalidade ao colega: "Eita, isso acontece com qualquer um! Vamos pegar outra bandeja juntos comigo ali na frente?", quebrando o foco da zombaria.',
          'Derrubar a própria bandeja intencionalmente para que os alunos passem a filmar você no lugar do outro.',
          'Chamar os alunos que estão filmando para uma disputa de braço de ferro para decidir quem apaga os vídeos.'
        ],
        correta: 1,
        explicacao: 'O método DISTRAIR desvia a atenção da cena constrangedora, cria uma ponte de acolhimento espontânea e retira a vítima do centro da humilhação sem gerar confronto agressivo.',
        competencia: 'convivencia',
        referencia: 'Metodologia dos 4 D\'s da Intervenção Ativa (Método Distrair)'
      },
      {
        id: 'oq_4',
        pergunta: 'Após presenciar um episódio doloroso em que uma aluna foi isolada e humilhada por um grupo no intervalo, o que constitui a aplicação legítima e ética do quarto D ("DAR APOIO")?',
        opcoes: [
          'Procurar a aluna em momento oportuno e em particular, escutar seus sentimentos sem julgamentos, validar sua dor, afirmar que o que aconteceu foi injusto e colocar-se à disposição para acompanhá-la ao canal seguro de relato.',
          'Fazer um post público com a foto da aluna chorando para expor a covardia dos agressores perante toda a cidade.',
          'Dizer à aluna que ela não deve ligar para nada e que chorar por causa de comentários alheios é demonstração de fraqueza moral.',
          'Cobrar da aluna que ela confronte os agressores no dia seguinte para provar que tem coragem de se defender sozinha.'
        ],
        correta: 0,
        explicacao: 'DAR APOIO exige delicadeza, sigilo e escuta empática. Não expõe a vítima, não minimiza o sofrimento e oferece suporte concreto para que ela acesse canais protetivos sem medo.',
        competencia: 'respeito',
        referencia: 'Metodologia dos 4 D\'s da Intervenção Ativa (Dar Apoio / First Aid Socioemocional)'
      },
      {
        id: 'oq_5',
        pergunta: 'Você é adicionado a um grupo de WhatsApp criado para "compartilhar podres e fofocas anônimas" da escola. Uma postagem acusa falsamente um colega tímido de ter cometido furto de celular. Diante dessa situação, qual a decisão ética correta?',
        opcoes: [
          'Compartilhar o link do grupo em seu status para que mais pessoas votem se a acusação contra o colega é verdadeira.',
          'Capturar evidências com cabeçalho e números de telefone, repudiar o conteúdo ilegal no grupo (se seguro), sair do espaço e encaminhar as provas para o Canal de Denúncia Anônima da EEMTI Alfredo Machado para resguardar o colega inocente.',
          'Manter-se no grupo em silêncio lendo as fofocas, acreditando que quem não posta não possui nenhuma responsabilidade ética no ecossistema.',
          'Inventar uma acusação contra o administrador do grupo para empatar as discussões e equilibrar a situação entre os estudantes.'
        ],
        correta: 1,
        explicacao: 'Preservar provas, não pactuar com a difamação e acionar os canais institucionais seguros resguarda a honra da vítima e impede a amplificação do linchamento virtual.',
        competencia: 'cyber',
        referencia: 'Cidadania Ativa e Prevenção à Calúnia Digital (Lei nº 14.811/2024)'
      },
      {
        id: 'oq_6',
        pergunta: 'Seu melhor amigo de infância passa a praticar bullying sistemático contra um estudante novato e afirma: "Ou você me apoia nessas brincadeiras, ou nossa amizade acaba aqui". Como solucionar esse dilema sob a perspectiva do desenvolvimento moral autônomo?',
        opcoes: [
          'Ceder à chantagem e participar das agressões, pois a lealdade a laços de amizade antigos sobrepõe-se a qualquer valor ético universal.',
          'Sustentar a autonomia ética com firmeza: recusar a cumplicidade com a violência, esclarecer que a amizade verdadeira não exige desumanizar terceiros e continuar defendendo o respeito na turma.',
          'Romper a amizade agredindo fisicamente o amigo na saída da escola para provar sua independência perante os novos colegas.',
          'Dizer ao novato que ele merece sofrer as zombarias por não pertencer ao mesmo círculo social histórico dos estudantes veteranos.'
        ],
        correta: 1,
        explicacao: 'O desenvolvimento moral pós-convencional (Kohlberg) ensina que princípios universais de justiça e respeito à dignidade humana prevalecem sobre pressões de lealdade grupal cega.',
        competencia: 'respeito',
        referencia: 'Teoria do Desenvolvimento Moral de Lawrence Kohlberg'
      },
      {
        id: 'oq_7',
        pergunta: 'Em sala de aula sem a presença do professor, uma aluna que cometeu um equívoco na organização da festa junina passa a ser alvo de linchamento verbal agressivo por mais de quinze colegas ao mesmo tempo. Qual a intervenção mediadora recomendada?',
        opcoes: [
          'Gritar ofensas mais pesadas para assumir o controle do grupo e direcionar a revolta coletiva para a coordenação pedagógica.',
          'Romper o efeito de manada convocando serenamente a turma à razão: "Gente, calma! Erros de organização se corrigem com diálogo e cooperação. Ninguém aqui tem o direito de humilhar a colega em grupo", chamando em seguida a orientação.',
          'Gravar os gritos com o celular e postar no TikTok para conseguir seguidores às custas da confusão instalada na sala de aula.',
          'Sair correndo da sala e trancar a porta por fora com chave para deixar os alunos confinados até o término do horário de aula.'
        ],
        correta: 1,
        explicacao: 'O efeito manada requer uma voz lúcida que questione a histeria coletiva, lembre os valores comuns de dignidade e reoriente a energia para a resolução madura do problema prático.',
        competencia: 'convivencia',
        referencia: 'Psicologia das Multidões e Dinâmica de Desescalada de Conflitos Coletivos'
      },
      {
        id: 'oq_8',
        pergunta: 'Um estudante confidencia a você em prantos que está sofrendo chantagem pesada e ameaça de morte no trajeto para a escola, mas implora: "Pelo amor de Deus, não conte para ninguém da escola, se eles souberem vão me matar". Como agir eticamente diante dessa confidência de extremo risco?',
        opcoes: [
          'Guardar o segredo absoluto e não tomar nenhuma atitude, acreditando que a quebra de uma promessa pessoal é o pior erro ético que existe.',
          'Compreender que o dever de preservação da vida e da integridade física sobrepõe-se à promessa de sigilo; tranquilizar o colega e procurar com urgência a direção escolar ou acionar o botão SOS/Rede Protetiva para salvaguardar a vida dele com segurança profissional.',
          'Tentar marcar um encontro sozinho com os chantagistas perigosos em um terreno baldio para resolver a questão no diálogo pessoal.',
          'Divulgar o relato com o nome da vítima em grupos abertos de jogos para pedir socorro a pessoas desconhecidas da internet.'
        ],
        correta: 1,
        explicacao: 'Segredos que envolvem ameaça real à integridade física ou à vida NÃO podem ser guardados. A ética do cuidado exige acionar imediatamente os canais institucionais competentes de proteção à vida.',
        competencia: 'direitos',
        referencia: 'Protocolos de Proteção à Vida Infantojuvenil e Gestão de Riscos Extremos'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 8. HISTÓRIA INTERATIVA: O CASO DO GRUPO SECRETO (Narrativa em Etapas)
  // -----------------------------------------------------------------------
  {
    id: 'historia_interativa',
    titulo: 'O Caso do Grupo Secreto',
    subtitulo: 'Simulação imersiva de tomada de decisão em 5 atos decisivos',
    descricao: 'Você vivenciará um caso complexo de cyberbullying e assédio velado na escola. Cada escolha terá repercussões diretas no clima escolar, na segurança jurídica e no bem-estar dos colegas.',
    categoria: 'historia',
    dificuldade: 'supremo',
    icone: '📖',
    cor: 'from-violet-600 via-purple-700 to-indigo-900',
    questoesCount: 5,
    tempoMedioMinutos: 12,
    xpRecompensa: 120,
    tipo: 'historia_interativa',
    historiaStages: [
      {
        id: 'stg_1',
        etapaNumero: 1,
        titulo: 'A Revelação Acidental',
        narrativa: 'É terça-feira à tarde. Durante o estudo na biblioteca da EEMTI Alfredo Machado, seu colega de mesa vai ao bebedouro e deixa o notebook aberto. Na tela, você vê uma notificação chamativa de um grupo intitulado "Detonação 1º Ano". Ao bater o olho, você lê mensagens contínuas com apelidos humilhantes, montagens preconceituosas e ameaças de exclusão contra Lucas, um aluno bolsista e tímido da sua turma.',
        situacaoAtual: 'Você descobriu a existência do grupo por acaso. Os membros não sabem que você viu. Como agir com discernimento tático e ético?',
        opcoes: [
          {
            texto: 'A) Preservar com discrição as evidências (capturar telas legíveis contendo contexto, remetentes e horários) para viabilizar apuração técnica antes que os dados sejam apagados.',
            impacto: 'positivo',
            feedback: 'Excelente discernimento! Em crimes cibernéticos (Lei 14.811/2024), a preservação idônea da prova digital é indispensável para responsabilizar infratores e proteger a vítima.',
            consequencia: 'Você possui evidências sólidas e pode agir com segurança jurídica sem se basear apenas em boatos.',
            pontos: 25
          },
          {
            texto: 'B) Confrontar imediatamente aos berros o dono do notebook no meio da biblioteca exigindo que ele apague o grupo na hora.',
            impacto: 'negativo',
            feedback: 'A atitude precipitada gerou alarme imediato. O dono do notebook apagou o grupo, os participantes migraram para outro app criptografado e todas as provas foram destruídas.',
            consequencia: 'As agressões continuaram nas sombras de forma mais violenta e não há mais provas materiais para proteger Lucas.',
            pontos: 5
          },
          {
            texto: 'C) Encaminhar o link do grupo para todos os seus amigos do WhatsApp para "alertar todo mundo" sobre o que está acontecendo.',
            impacto: 'negativo',
            feedback: 'Encaminhar conteúdos vexatórios amplifica o dano e a humilhação pública da vítima, tornando você co-responsável pela difamação viral.',
            consequencia: 'O material vazou pela escola inteira, gerando um escândalo desordenado que traumatizou Lucas profundamente.',
            pontos: 0
          },
          {
            texto: 'D) Fechar a tampa do notebook e fingir que nada aconteceu para não se envolver em confusões que não são suas.',
            impacto: 'neutro',
            feedback: 'A omissão preserva seu conforto pessoal passageiro, mas abandona um colega indefeso à crueldade sistemática.',
            consequencia: 'Sem barreira de contenção, o grupo intensificou as agressões nas semanas seguintes.',
            pontos: 10
          }
        ]
      },
      {
        id: 'stg_2',
        etapaNumero: 2,
        titulo: 'A Escalada do Assédio em Sala',
        narrativa: 'No dia seguinte, Lucas entra na sala de aula cabisbaixo e evita qualquer contato visual. Durante a aula de Biologia, toda vez que Lucas levanta a mão para responder, dois alunos do grupo secreto começam a soltar risinhos e digitar no celular olhando para ele. Lucas recolhe o braço, vermelho de constrangimento.',
        situacaoAtual: 'O cyberbullying transbordou para o espaço físico de sala. Qual a sua atitude mediadora imediata?',
        opcoes: [
          {
            texto: 'A) Aproveitar a transição de aula para sentar ao lado de Lucas com naturalidade, engajá-lo em uma conversa amigável e demonstrar presença solidária (Método Distrair / Dar Apoio).',
            impacto: 'positivo',
            feedback: 'Conduta exemplar! A solidariedade visível quebra o isolamento, neutraliza o poder da zombaria e restaura a segurança psicológica da vítima.',
            consequencia: 'Lucas sentiu-se amparado, recuperou o fôlego e percebeu que a turma não é unanimemente hostil a ele.',
            pontos: 25
          },
          {
            texto: 'B) Interromper o professor gritando do fundo da sala: "Professor, esses dois são criminosos cibernéticos e deveriam ser presos agora!".',
            impacto: 'negativo',
            feedback: 'A reação desmedida causou tumulto, constrangeu Lucas em público perante toda a turma e rendeu uma advertência disciplinar a você por desrespeito à aula.',
            consequencia: 'A aula foi paralisada e Lucas sentiu-se ainda mais exposto e vulnerável no centro das atenções.',
            pontos: 5
          },
          {
            texto: 'C) Começar a rir discretamente com os outros para que os agressores não desconfiem de que você está do lado de Lucas.',
            impacto: 'negativo',
            feedback: 'Conivência ativa por busca de aceitação é uma falha ética grave que fortalece a impunidade do agressor.',
            consequencia: 'Lucas viu você rindo e perdeu a última ponta de esperança de encontrar amigos solidários na sala.',
            pontos: 0
          },
          {
            texto: 'D) Esperar pacientemente o fim do bimestre letivo para ver se a turma amadurece por conta própria sem intervenções.',
            impacto: 'neutro',
            feedback: 'A passividade prolongada permite que o assédio se consolide e deteriore a saúde mental do estudante.',
            consequencia: 'Lucas passou a faltar reiteradamente às aulas de Biologia nas semanas seguintes.',
            pontos: 10
          }
        ]
      },
      {
        id: 'stg_3',
        etapaNumero: 3,
        titulo: 'A Barreira do Medo e a Denúncia',
        narrativa: 'No intervalo, você conversa reservadamente com Lucas. Em prantos, ele confessa que pensa em abandonar o colégio porque "não aguenta mais o inferno diário". Ele teme relatar à coordenação porque foi ameaçado de levar uma surra caso "abra o bico".',
        situacaoAtual: 'Lucas necessita de proteção urgente, mas o pânico da retaliação o paralisa. O que você propõe?',
        opcoes: [
          {
            texto: 'A) Apresentar o Canal de Denúncia Anônima do StopBullying da EEMTI, demonstrando que o sistema criptografa dados, não grava IP e gera protocolo hash exclusivo, oferecendo-se para registrar o relato com ele.',
            impacto: 'positivo',
            feedback: 'Solução perfeita! A ferramenta de denúncia sigilosa foi concebida exatamente para vencer a barreira do medo sem expor a integridade da vítima.',
            consequencia: 'Lucas sentiu-se seguro com a garantia técnica de anonimato e autorizou o envio das evidências preservadas.',
            pontos: 25
          },
          {
            texto: 'B) Prometer que você e mais dois amigos vão confrontar os agressores na saída da escola com socos para garantir a segurança dele.',
            impacto: 'negativo',
            feedback: 'Estimular violência física agrava perigosamente o risco à integridade de todos e desvirtua a finalidade pedagógica da escola.',
            consequencia: 'A tensão escalou para um princípio de briga generalizada no portão com risco de sanções penais graves.',
            pontos: 0
          },
          {
            texto: 'C) Dizer para Lucas engolir o choro e ignorar, afirmando que a escola não tem responsabilidade sobre grupos virtuais de mensagens.',
            impacto: 'negativo',
            feedback: 'Afirmação tecnicamente falsa e desumana: a Lei 14.811/2024 responsabiliza as escolas pelo combate ativo ao cyberbullying que repercute no ambiente escolar.',
            consequencia: 'Desesperado, Lucas teve uma crise de ansiedade aguda e foi levado ao posto de saúde.',
            pontos: 5
          },
          {
            texto: 'D) Publicar a denúncia em sua rede social pessoal marcando os perfis dos agressores para fazer um cancelamento público na cidade.',
            impacto: 'negativo',
            feedback: 'Linchamento virtual gera traumas em todas as partes, expõe a intimidade de Lucas ainda mais e desrespeita os preceitos do ECA.',
            consequencia: 'A situação viralizou na cidade, atraiu ameaças externas e atrapalhou qualquer mediação responsável.',
            pontos: 5
          }
        ]
      },
      {
        id: 'stg_4',
        etapaNumero: 4,
        titulo: 'A Gestão Restaurativa e a Pressão do Grupo',
        narrativa: 'O protocolo anônimo foi enviado com êxito. A equipe pedagógica e de mediação acolheu o caso em sigilo estrito. Convocou individualmente os estudantes envolvidos no grupo, sem expor quem efetuou a denúncia, iniciando círculos restaurativos e notificando os responsáveis com base na Lei 14.811/2024. No corredor, o líder do grupo se aproxima de você desconfiado e pergunta: "Você sabe qual foi o dedo-duro que dedurou a gente pra direção?".',
        situacaoAtual: 'O agressor tenta descobrir a autoria do relato para retaliar. Como você responde?',
        opcoes: [
          {
            texto: 'A) Manter a calma, assegurar o sigilo incondicional e responder com serenidade: "O importante não é quem denunciou, mas o fato de que ofensas e ameaças em grupo ferem as pessoas e não cabem mais na nossa escola".',
            impacto: 'positivo',
            feedback: 'Postura madura, firme e corajosa! Você blindou a identidade da vítima, resguardou a segurança e reposicionou o debate no eixo da responsabilidade moral.',
            consequencia: 'O colega desarmou a atitude agressiva, refletiu sobre a gravidade da situação e não encontrou alvos para vingança.',
            pontos: 25
          },
          {
            texto: 'B) Entrar em pânico e confessar: "Foi o Lucas que pediu para denunciar, eu só ajudei porque fiquei com pena dele!".',
            impacto: 'negativo',
            feedback: 'Quebra trágica de confiança que expõe a vítima diretamente à vingança e ao perigo físico iminente.',
            consequencia: 'Lucas foi encurralado na saída e a mediação escolar foi profundamente sabotada pela traição.',
            pontos: 0
          },
          {
            texto: 'C) Debochar na cara do líder dizendo: "Bem feito! Vocês agora vão todos responder processo criminal e serem expulsos da rede estadual!".',
            impacto: 'negativo',
            feedback: 'Provocações arrogantes escalam a hostilidade e dificultam a reconstrução da cultura de convivência pacífica.',
            consequencia: 'O líder reagiu com fúria verbal e a tensão entre as turmas atingiu níveis alarmantes no pátio.',
            pontos: 5
          },
          {
            texto: 'D) Dizer que foi um professor que viu as mensagens por acaso no projetor da sala para desviar as suspeitas dos alunos.',
            impacto: 'negativo',
            feedback: 'Imputar falsamente a autoria a terceiros polui a apuração e compromete a confiança no corpo docente.',
            consequencia: 'A mentira gerou animosidade injusta contra professores e atrapalhou as reuniões de conciliação.',
            pontos: 5
          }
        ]
      },
      {
        id: 'stg_5',
        etapaNumero: 5,
        titulo: 'A Reparação e a Cultura de Paz',
        narrativa: 'Semanas após a intervenção restaurativa, o grupo tóxico foi dissolvido. Os agressores compreenderam o impacto devastador de seus atos, assinaram termo de compromisso pedagógico e cumpriram atividades de reparação comunitária na escola. Lucas retomou a confiança, voltou a frequentar a biblioteca e passou a ser acolhido por novos grupos.',
        situacaoAtual: 'Para consolidar um legado duradouro de respeito na sua turma, qual a ação estruturante a ser adotada?',
        opcoes: [
          {
            texto: 'A) Propor a criação de um Pacto de Convivência e Cidadania Digital na turma, integrando novos colegas, incentivando o uso do aplicativo StopBullying e atuando como guardião empático permanente.',
            impacto: 'positivo',
            feedback: 'Brilhante conclusão! A verdadeira justiça restaurativa não termina no cessar da agressão: floresce na transformação cultural perene da comunidade escolar.',
            consequencia: 'A turma tornou-se referência estadual de convivência democrática, com redução a zero de ocorrências graves no ano letivo.',
            pontos: 25
          },
          {
            texto: 'B) Exigir que os ex-agressores sejam banidos para sempre de qualquer evento social, gincana ou recreio da escola até a formatura.',
            impacto: 'negativo',
            feedback: 'Ostracismo perpétuo nega a essência da restauração pedagógica e estimula a formação de novos ressentimentos.',
            consequencia: 'A exclusão contínua gerou novo foco de revolta e rancor nos estudantes que buscavam redenção.',
            pontos: 5
          },
          {
            texto: 'C) Deletar todos os canais de comunicação da turma e proibir que os alunos conversem sobre temas que não sejam notas de provas.',
            impacto: 'negativo',
            feedback: 'Medidas autoritárias de silenciamento suprimem o aprendizado sociopolítico da convivência plural.',
            consequencia: 'A turma tornou-se apática, fria e sem laços de cooperação acadêmica.',
            pontos: 5
          },
          {
            texto: 'D) Considerar a missão cumprida e nunca mais prestar atenção nas interações entre colegas nos intervalos da escola.',
            impacto: 'neutro',
            feedback: 'A cultura de respeito exige vigilância empática continuada para que antigas práticas abusivas não ressurjam disfarçadas.',
            consequencia: 'Pequenos focos de exclusão voltaram a surgir meses depois por falta de engajamento ativo.',
            pontos: 10
          }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 9. DESAFIO SUPREMO (12 Questões) - Desbloqueável
  // -----------------------------------------------------------------------
  {
    id: 'desafio_supremo',
    titulo: 'Desafio Supremo do Respeito',
    subtitulo: 'Análise de jurisprudência, doutrina restaurativa e governança escolar',
    descricao: 'Desafio de nível superior para guardiões experientes. Testa interpretações complexas de casos reais, responsabilidade estatal e psicologia das multidões.',
    categoria: 'todos',
    dificuldade: 'supremo',
    icone: '👑',
    cor: 'from-amber-600 via-rose-600 to-purple-900',
    questoesCount: 12,
    tempoMedioMinutos: 15,
    xpRecompensa: 150,
    unlockCondition: 'Conclua pelo menos 3 desafios com aproveitamento superior a 70%.',
    tipo: 'multipla_escolha',
    questoes: [
      {
        id: 'ds_1',
        pergunta: 'Em relação à responsabilidade civil do Estado por danos decorrentes de bullying grave praticado em escolas da rede pública estadual, qual o entendimento consolidado pelo Supremo Tribunal Federal (STF - Tema 592)?',
        opcoes: [
          'O Estado responde de forma objetiva pelos danos causados à integridade física e moral dos estudantes sob sua custódia, havendo dever de indenizar caso comprovada a falha no dever de vigilância e guarda.',
          'O Estado só responde se a agressão for praticada exclusivamente por um professor concursado no exercício formal de sala de aula.',
          'A responsabilidade é puramente subjetiva e exige que a vítima comprove dolo específico da Secretaria de Educação em consentir com o dano.',
          'O Poder Público é imune a qualquer cobrança indenizatória por conflitos que ocorram entre alunos menores de idade nas escolas estaduais.'
        ],
        correta: 0,
        explicacao: 'O STF pacificou no Tema 592 que o Estado tem responsabilidade civil objetiva pela integridade física e psíquica de alunos sob sua guarda em escolas públicas (Art. 37, § 6º da CF/88), existindo dever de vigilância eficaz.',
        competencia: 'direitos',
        referencia: 'STF (Tema 592 de Repercussão Geral / RE 842.844) e Art. 37, § 6º da CF/88'
      },
      {
        id: 'ds_2',
        pergunta: 'Na psicologia social, o experimento clássico de Darley e Latané sobre o "Efeito do Espectador" (Bystander Effect) identificou que a probabilidade de uma pessoa intervir para cessar uma injustiça:',
        opcoes: [
          'Aumenta linearmente com o número de pessoas presentes, pois mais testemunhas geram maior pressão de coragem coletiva.',
          'Diminui à medida que o número de testemunhas aumenta, em virtude da "difusão de responsabilidade" psicológica e da conformidade com a inércia social.',
          'Permanece idêntica em qualquer situação, dependendo unicamente do signo astrológico de quem presencia a ocorrência.',
          'É nula na infância e só se manifesta em adultos que possuem formação superior em direito ou segurança pública.'
        ],
        correta: 1,
        explicacao: 'Quanto maior a multidão que assiste, mais cada um presume que "outro intervirá", anestesiando a ação individual. Romper essa difusão com a formação Upstander é a chave para a cultura de paz.',
        competencia: 'convivencia',
        referencia: 'Experimentos de John Darley e Bibb Latané sobre Inércia e Difusão de Responsabilidade'
      },
      {
        id: 'ds_3',
        pergunta: 'No âmbito do Direito da Criança e do Adolescente, como a doutrina diferencia o "Princípio do Melhor Interesse da Criança" de uma postura meramente paternalista da direção escolar?',
        opcoes: [
          'O melhor interesse reconhece a criança/adolescente como sujeito de direitos com voz ativa e dignidade prioritária em todas as decisões, enquanto o paternalismo a trata como objeto tutelado e passivo sem escuta qualificada.',
          'O melhor interesse determina que a direção nunca aplique qualquer limite disciplinar a estudantes que praticam violências.',
          'O paternalismo é a única doutrina reconhecida formalmente pelo Conselho Tutelar e pelo Ministério Público brasileiro.',
          'Ambos os conceitos são sinônimos absolutos no Código Civil e dispensam qualquer tipo de análise crítica de gestão.'
        ],
        correta: 0,
        explicacao: 'O Princípio da Proteção Integral e do Melhor Interesse (Art. 3º da Convenção da ONU e Art. 4º do ECA) garante voz, dignidade e desenvolvimento pleno, distanciando-se do autoritarismo ou do paternalismo cego.',
        competencia: 'direitos',
        referencia: 'Convenção Internacional sobre os Direitos da Criança (ONU, 1989) e ECA'
      },
      {
        id: 'ds_4',
        pergunta: 'Uma página anônima no Instagram lança uma campanha com hashtag incentivando que os estudantes "ignorem totalmente e deixem falando sozinha" uma aluna transferida. Sob a ótica do Art. 146-A do Código Penal:',
        opcoes: [
          'Trata-se de mero exercício legítimo da liberdade individual de escolher amizades virtuais sem qualquer repercussão ilícita.',
          'Configura crime de intimidação sistemática virtual (cyberbullying) na modalidade de isolamento/boicote orquestrado, agravado pelo uso de rede social aberta (reclusão de 2 a 4 anos e multa).',
          'É considerada contravenção penal menor que só acarreta advertência verbal caso a aluna comprove perda de notas.',
          'A conduta é imune a processo legal caso a hashtag não mencione o Cadastro de Pessoa Física (CPF) da vítima.'
        ],
        correta: 1,
        explicacao: 'O Art. 146-A, Parágrafo Único do Código Penal tipifica expressamente a intimidação sistemática em rede social. Promover o ostracismo e isolamento orquestrado atenta violentamente contra a dignidade da jovem.',
        competencia: 'cyber',
        referencia: 'Art. 146-A, Parágrafo Único do Código Penal Brasileiro'
      },
      {
        id: 'ds_5',
        pergunta: 'Qual o papel fundamental da "Vergonha Reintegrativa" formulada por John Braithwaite no sucesso das intervenções restaurativas em conflitos juvenis escolares?',
        opcoes: [
          'Fazer o ofensor sentir-se um monstro irrecuperável e expô-lo publicamente com cartazes nos corredores da escola.',
          'Condenar e desaprovar com firmeza o ato violento cometido, ao mesmo tempo em que se reafirma o respeito e o valor intrínseco da pessoa do ofensor, oferecendo-lhe um caminho ético de reintegração à comunidade.',
          'Exigir que a família do ofensor pague valores em dinheiro a todos os estudantes da sala para compensar a vergonha do ato.',
          'Obrigar o agressor a permanecer de joelhos durante o hino nacional nas solenidades comemorativas da cidade.'
        ],
        correta: 1,
        explicacao: 'Braithwaite distingue a vergonha estigmatizante (que rotula e empurra para a delinquência) da vergonha reintegrativa: repudia-se o ato danoso, mas acolhe-se a pessoa, permitindo reparação e reconciliação com o grupo.',
        competencia: 'convivencia',
        referencia: 'Teoria da Vergonha Reintegrativa de John Braithwaite (Crime, Shame and Reintegration)'
      },
      {
        id: 'ds_6',
        pergunta: 'Um estudante posta um meme difamatório contra uma professora. Outro aluno apenas "curte" e um terceiro "comenta rindo com emojis". Qual a orientação consolidada pelos tribunais brasileiros sobre o tema?',
        opcoes: [
          'Apenas quem criou o meme responde civilmente, ficando os interagentes isentos de qualquer obrigação indenizatória.',
          'Quem curte, comenta ou amplifica publicações ilícitas coopera na difusão da ofensa e pode ser condenado solidariamente por danos morais à honra do ofendido.',
          'Interações em redes sociais são protegidas por imunidade parlamentar automática estendida a todos os brasileiros natos.',
          'A responsabilidade é restrita aos provedores de internet sediados em território internacional.'
        ],
        correta: 1,
        explicacao: 'Tribunais Estaduais e o STJ têm firmado entendimento de que o engajamento e a curtição de conteúdo nitidamente difamatório ampliam o alcance do dano moral, podendo gerar condenação cível solidária (Art. 942 do CC).',
        competencia: 'direitos',
        referencia: 'Jurisprudência Cível do TJSP/TJRS e Código Civil Brasileiro (Art. 186 e Art. 942)'
      },
      {
        id: 'ds_7',
        pergunta: 'Qual o conceito de "Violência Simbólica" cunhado por Pierre Bourdieu e como ele se manifesta na naturalização de apelidos depreciativos e preconceitos na escola?',
        opcoes: [
          'Refere-se exclusivamente ao uso de armas brancas de brinquedo em peças teatrais autorizadas pela coordenação.',
          'É a violência invisível exercida com o consentimento tácito e inconsciente dos próprios dominados, que assimilam hierarquias e humilhações como "ordem natural das coisas".',
          'Constitui um tipo de exercício de caligrafia formal obrigatório nos cadernos de redação do ensino médio regular.',
          'É a aplicação de sanções disciplinares previstas formalmente no Código Penal para maiores de dezoito anos.'
        ],
        correta: 1,
        explicacao: 'A violência simbólica é sutil e eficaz porque opera nas estruturas mentais dos agentes: quando a vítima ri do apelido que a machuca para não ser excluída, ela expressa a submissão inconsciente à violência do dominador.',
        competencia: 'respeito',
        referencia: 'Sociologia da Educação e Teoria da Violência Simbólica (Pierre Bourdieu)'
      },
      {
        id: 'ds_8',
        pergunta: 'Em situações de cyberbullying que envolvam extorsão e ameaça de vazamento de mídias íntimas de adolescentes (sextorsão), qual medida acautelatória prioritária deve ser adotada pela instituição escolar?',
        opcoes: [
          'Orientar a família a pagar o resgate exigido e mandar o aluno apagar o histórico de conversas do smartphone.',
          'Acolhimento socioemocional emergencial da vítima, orientação para preservação de provas digitais, notificação imediata ao Conselho Tutelar e encaminhamento do caso à Delegacia de Repressão a Crimes Cibernéticos com suporte pedagógico.',
          'Exigir que a vítima transfira de colégio para não manchar o nome da instituição nas estatísticas anuais do censo.',
          'Aguardar o término das férias escolares para verificar se os criminosos continuam enviando mensagens intimidadoras.'
        ],
        correta: 1,
        explicacao: 'A sextorsão atenta contra a liberdade e a dignidade sexual da juventude. Demanda acolhimento protetivo sem julgamentos moralistas, preservação forense dos registros e acionamento da polícia especializada.',
        competencia: 'direitos',
        referencia: 'ECA (Art. 241-D) e Protocolo Nacional de Proteção a Vítimas de Crimes Digitais'
      },
      {
        id: 'ds_9',
        pergunta: 'A promoção de "Comissões de Prevenção e Mediação de Conflitos" formadas por estudantes e professores nas escolas encontra amparo na gestão democrática porque:',
        opcoes: [
          'Permite que a escola substitua o currículo de ciências e história por reuniões contínuas de debates disciplinares.',
          'Empodera a comunidade como protagonista da cultura de paz, descentraliza a autoridade autoritária e desenvolve competências socioemocionais de cidadania ativa entre os jovens.',
          'Isenta os diretores de prestarem contas dos recursos financeiros recebidos do Programa Dinheiro Direto na Escola (PDDE).',
          'Elimina a necessidade de os professores corrigirem provas avaliativas ao longo do ano letivo estadual.'
        ],
        correta: 1,
        explicacao: 'A gestão democrática (LDB Art. 14) pressupõe participação efetiva da comunidade. Alunos mediadores identificam conflitos precocemente e constroem consensos que regras impostas de cima para baixo não alcançam.',
        competencia: 'convivencia',
        referencia: 'Lei de Diretrizes e Bases da Educação Nacional (Lei Federal nº 9.394/1996, Art. 14)'
      },
      {
        id: 'ds_10',
        pergunta: 'Qual a fundamentação que diferencia a "Mediação Escolar" de uma "Arbitragem" em litígios interpessoais entre estudantes?',
        opcoes: [
          'Na Mediação, o terceiro facilitador não decide nem impõe sanção, mas empodera as partes para que elas próprias construam a solução consensual do conflito; na Arbitragem, um terceiro profere sentença impositiva vinculante.',
          'Na Mediação, os alunos contratam juízes togados de carreira com honorários pagos pelas associações de moradores de Madalena.',
          'A Mediação é exclusiva de disputas esportivas em jogos de futsal, ao passo que a Arbitragem é aplicada a todas as disciplinas teóricas.',
          'Ambos os termos são juridicamente idênticos e produzem as mesmas consequências no regulamento disciplinar do MEC.'
        ],
        correta: 0,
        explicacao: 'O mediador é um facilitador do diálogo, não um juiz. O protagonismo na mediação é dos estudantes envolvidos, que ressignificam a relação e constroem acordos sustentáveis para o futuro comum.',
        competencia: 'convivencia',
        referencia: 'Lei de Mediação (Lei Federal nº 13.140/2015) e Resolução nº 125/2010 do CNJ'
      },
      {
        id: 'ds_11',
        pergunta: 'A Lei Federal nº 14.811/2024 estabeleceu que municípios, estados e o DF devem implementar medidas de proteção integral nos ambientes escolares. Qual instrumento técnico é expressamente previsto para diagnosticar o clima e orientar políticas públicas?',
        opcoes: [
          'A realização de censos anuais e mapeamento contínuo das violências e da intimidação sistemática no ambiente escolar para alimentar planos locais de prevenção e atuação intersetorial.',
          'A realização de testes toxicológicos compulsórios quinzenais em todos os estudantes matriculados a partir do 6º ano.',
          'A proibição do ensino de sociologia e filosofia para evitar questionamentos sobre desigualdades estruturais históricas.',
          'A contratação de empresas internacionais de mercenários para realizar a ronda interna dos corredores escolares.'
        ],
        correta: 0,
        explicacao: 'A formulação de políticas sérias exige diagnósticos baseados em dados reais (como as pesquisas do projeto StopBullying na EEMTI Alfredo Machado), permitindo intervenções preventivas cientificamente embasadas.',
        competencia: 'direitos',
        referencia: 'Lei Federal nº 14.811 de 12 de janeiro de 2024 (Política Nacional de Prevenção)'
      },
      {
        id: 'ds_12',
        pergunta: 'Em síntese moral, por que a erradicação do bullying e da intimidação sistemática nas escolas é condição sine qua non para o fortalecimento da democracia brasileira?',
        opcoes: [
          'Porque a escola que tolera a humilhação do vulnerável e o domínio do forte pela violência educa para o autoritarismo e para a barbárie; a escola que educa no respeito constrói cidadãos conscientes de sua igualdade e dignidade.',
          'Porque o Banco Mundial suspende empréstimos financeiros para estados que possuem mais de duas advertências disciplinares por bimestre.',
          'Porque a diminuição de conflitos verbais em sala garante automaticamente notas máximas a todos os alunos no Enem.',
          'Porque o Ministério da Justiça premia com recursos financeiros adicionais as secretarias que extinguem o direito de defesa de estudantes.'
        ],
        correta: 0,
        explicacao: 'A convivência escolar democrática é o alicerce republicano. Proteger o fraco contra a tirania do mais forte é o princípio basilar do Estado Democrático de Direito preconizado na Constituição de 1988.',
        competencia: 'respeito',
        referencia: 'Educação como Prática da Liberdade (Paulo Freire) e Constituição Federal de 1988'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 10. OPERAÇÃO SENTINELA OCULTO (Desafio Secreto) - Desbloqueável
  // -----------------------------------------------------------------------
  {
    id: 'desafio_secreto',
    titulo: 'Operação Sentinela Oculto',
    subtitulo: 'Investigação aprofundada de assédios velados, pegada forense e engenharia social',
    descricao: 'Desafio secreto reservado a mentes analíticas. Mergulha nas raízes criminológicas da desindividuação digital, no doxxing e no gaslighting relacional.',
    categoria: 'secreto',
    dificuldade: 'supremo',
    icone: '🕵️',
    cor: 'from-slate-900 via-indigo-950 to-purple-950',
    questoesCount: 6,
    tempoMedioMinutos: 9,
    xpRecompensa: 130,
    isSecret: true,
    unlockCondition: 'Conquiste uma sequência (combo) de 5 acertos seguidos ou complete 4 desafios regulares.',
    tipo: 'multipla_escolha',
    questoes: [
      {
        id: 'dsec_1',
        pergunta: 'No âmbito da segurança da informação e perícia digital, em que consiste tecnicamente o ataque por "Doxxing" e quais os impactos imediatos sobre a integridade da vítima?',
        opcoes: [
          'Consiste na recuperação de senhas esquecidas de contas institucionais através de perguntas secretas fornecidas pelo professor de robótica.',
          'Consiste na busca e divulgação não autorizada e maliciosa de dados de identificação pessoal (PII) — endereço residencial, telefone dos pais, rotinas diárias e documentos — com o intuito de instigar assédio em massa e perseguições reais.',
          'Consiste na exclusão definitiva de mensagens antigas de e-mail corporativo após o decurso de prazos regimentais da instituição.',
          'Consiste na realização de testes de velocidade de conexão em modems de fibra óptica instalados em laboratórios escolares.'
        ],
        correta: 1,
        explicacao: 'Doxxing é o vazamento intencional de dados privados para intimidar e expor a vítima a linchamentos online e presenciais, configurando grave ilícito civil e criminal (Lei 14.811/24 e LGPD Art. 52).',
        competencia: 'cyber',
        referencia: 'Engenharia Social e Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)'
      },
      {
        id: 'dsec_2',
        pergunta: 'A tática psicológica manipuladora conhecida internacionalmente como "Gaslighting", quando empregada em relações de convivência escolar e círculos de amizade tóxicos, caracteriza-se por:',
        opcoes: [
          'A substituição de lâmpadas incandescentes por modelos de LED ecológicos para economizar energia nas salas de aula.',
          'A distorção sistemática de fatos e narrativas que leva a vítima a duvidar de sua própria memória, percepção da realidade e saúde mental, desautorizando suas queixas e isolando-a do apoio de terceiros.',
          'O treinamento físico intensivo com cordas e pesos realizado por equipes desportivas de atletismo no contraturno escolar.',
          'A leitura obrigatória de textos teatrais clássicos ingleses durante as aulas regulares de Literatura Brasileira.'
        ],
        correta: 1,
        explicacao: 'Gaslighting é violência psicológica dissimulada: o agressor manipula as situações ("você é louco(a)", "isso é invenção da sua cabeça", "você não aguenta nada"), minando a autoconfiança e a clareza da vítima.',
        competencia: 'bullying',
        referencia: 'Psicologia das Dinâmicas Abusivas e Assédio Moral Oculto'
      },
      {
        id: 'dsec_3',
        pergunta: 'No ordenamento penal brasileiro, qual a distinção técnica precisa entre os crimes contra a honra de Calúnia (Art. 138), Difamação (Art. 139) e Injúria (Art. 140)?',
        opcoes: [
          'A Calúnia consiste em imputar falsamente um fato tipificado como crime; a Difamação consiste em imputar fato desonroso determinado (não criminoso) que macula a reputação social; a Injúria consiste em ofender a dignidade ou decoro subjetivo íntimo.',
          'Os três conceitos são absolutamente equivalentes no Código Penal e possuem exatamente as mesmas sanções pecuniárias e privativas de liberdade.',
          'A Calúnia refere-se unicamente a ofensas materiais contra objetos da escola; a Difamação incide sobre professores; a Injúria protege apenas alunos novatos.',
          'Apenas a Injúria é tipificada pela legislação penal, sendo Calúnia e Difamação terminologias superadas no direito comparado.'
        ],
        correta: 0,
        explicacao: 'A diferenciação é dogmática: Calúnia tutela a honra objetiva imputando crime falso; Difamação atinge a reputação perante a sociedade com fato ofensivo determinado; Injúria atinge a autoestima e dignidade íntima.',
        competencia: 'direitos',
        referencia: 'Código Penal Brasileiro (Art. 138, 139 e 140)'
      },
      {
        id: 'dsec_4',
        pergunta: 'Em ataques virtuais coordenados (raids e linchamentos digitais), qual fenômeno sociopsicológico explica por que jovens com condutas pacíficas no convívio presencial participam de humilhações cruéis coletivas na internet?',
        opcoes: [
          'A desindividuação no ambiente digital, caracterizada pela ilusão de anonimato, enfraquecimento das restrições morais individuais e conformidade cega ao comportamento agressivo da massa.',
          'A deficiência biológica comprovada de dopamina cerebral que atinge compulsoriamente adolescentes matriculados no ensino médio regular.',
          'A obrigação curricular compulsória imposta pela Base Nacional Comum Curricular (BNCC) de engajar em todas as páginas das redes sociais.',
          'A perda temporária da audição provocada pelo uso rotineiro de fones de ouvido durante a realização de tarefas escolares.'
        ],
        correta: 0,
        explicacao: 'A desindividuação (Gustave Le Bon / Philip Zimbardo) dissipa a sensação de responsabilidade pessoal quando imerso na manada virtual. A sensação de anonimato liberta impulsos predatórios que o convívio presencial inibe.',
        competencia: 'cyber',
        referencia: 'Psicologia Social das Relações Virtuais e Efeito Desinibição Online (John Suler)'
      },
      {
        id: 'dsec_5',
        pergunta: 'A Lei Federal nº 14.811/2024 exige das instituições de ensino a elaboração de Protocolos de Proteção e Resposta Rápida. Qual requisito técnico confere legitimidade e eficácia a esses instrumentos institucionais?',
        opcoes: [
          'A construção participativa com a comunidade escolar, contendo fluxos claros e sigilosos de denúncia, capacitação continuada dos educadores, acolhimento especializado à vítima e articulação formal com o Conselho Tutelar e a rede de saúde mental.',
          'A terceirização do monitoramento disciplinar da escola para algoritmos automatizados de inteligência artificial sem supervisão humana.',
          'O cancelamento das férias de fim de ano para todos os estudantes que apresentarem notas inferiores a seis na média bimestral.',
          'A proibição do ingresso de livros de literatura estrangeira no acervo didático da biblioteca da unidade escolar.'
        ],
        correta: 0,
        explicacao: 'Protocolos eficazes demandam rigor técnico, escuta qualificada, fluxos sigilosos estruturados e integração com a rede intersetorial de proteção (ECA, Art. 88 e Lei 14.811/2024).',
        competencia: 'direitos',
        referencia: 'Lei nº 14.811/2024 (Art. 2º e seguintes)'
      },
      {
        id: 'dsec_6',
        pergunta: 'Qual a missão formativa e o compromisso ético dos estudantes da EEMTI Alfredo Machado certificados como "Guardiões do Respeito" pelo projeto StopBullying?',
        opcoes: [
          'Exercer vigilância policial ostensiva armada contra os demais estudantes e aplicar sanções disciplinares sumárias sem direito de defesa.',
          'Atuar como multiplicadores da cultura de paz, discernimento ético e solidariedade ativa (Upstanders), acolhendo quem sofre, repudiando microagressões veladas e fortalecendo um ambiente onde ninguém precise ter medo de ser quem é.',
          'Ignorar as leis estaduais e federais para construir um sistema judiciário paralelo no interior das salas de aula da rede pública.',
          'Restringir o acesso dos estudantes menos favorecidos aos computadores do laboratório de informática da unidade de ensino.'
        ],
        correta: 1,
        explicacao: 'O Guardião do Respeito personifica a cidadania ativa: transforma o conhecimento legal e ético em prática cotidiana, rompendo a conivência silenciosa e assegurando que a escola seja um santuário de dignidade, acolhimento e aprendizado para todos.',
        competencia: 'respeito',
        referencia: 'Projeto Sentinela do Respeito • EEMTI Alfredo Machado • Ceará Científico 2026'
      }
    ]
  }
];
