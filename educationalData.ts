import { BullyingTypeDetail, LawArticle, RespectGuideTopic } from './types';

export const BULLYING_TYPES_DATA: BullyingTypeDetail[] = [
  {
    id: 'verbal',
    name: 'Bullying Verbal',
    shortDescription: 'Insultos, apelidos pejorativos, xingamentos, piadas ofensivas e zombarias frequentes.',
    fullDescription: 'Uso sistemático e repetitivo da linguagem oral para rebaixar, humilhar, rotular ou desestabilizar emocionalmente o colega, atacando características físicas, intelectuais, sotaques ou identidade.',
    icon: 'MessageSquareWarning',
    severityLevel: 'grave',
    colorTheme: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
      badgeBg: 'bg-amber-500/20',
      glow: 'shadow-amber-500/20'
    },
    examples: [
      'Colocar apelidos cruéis que causam constrangimento contínuo em sala de aula.',
      'Fazer piadas repetidas sobre o corpo, roupas ou condição financeira do aluno.',
      'Provocações verbais constantes nos corredores, banheiros e no refeitório.'
    ],
    warningSigns: [
      'O estudante fica excessivamente calado e evita participar de discussões.',
      'Demonstra ansiedade extrema antes do intervalo ou aula com apresentações.',
      'Pede repetidamente para mudar de carteira ou faltar às aulas.'
    ],
    howToActStudent: [
      'Mantenha a postura calma e não responda com insultos para evitar a escalada da agressão.',
      'Procure um amigo de confiança ou professor no mesmo instante.',
      'Use o canal seguro e anônimo do StopBullying para relatar o ocorrido.'
    ],
    howToActWitness: [
      'Não ria nem comemore as piadas do agressor (o silêncio do público enfraquece o ataque).',
      'Acolha o colega e convide-o para ficar junto com o seu grupo.',
      'Avise discretamente a coordenação pedagógica da EEMTI Alfredo Machado.'
    ],
    legalFramework: 'Art. 1º, § 1º da Lei nº 13.185/2015 e Art. 146-A do Código Penal.'
  },
  {
    id: 'fisico',
    name: 'Bullying Físico',
    shortDescription: 'Empurrões, socos, chutes, tropeções intencionais, beliscões e agressões corporais.',
    fullDescription: 'Qualquer ato deliberado de força corporal contra outro estudante com intenção de machucar, intimidar pelo medo físico ou demonstrar domínio forçado e humilhação.',
    icon: 'ShieldAlert',
    severityLevel: 'critico',
    colorTheme: {
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/40',
      text: 'text-rose-400',
      badgeBg: 'bg-rose-500/20',
      glow: 'shadow-rose-500/20'
    },
    examples: [
      'Empurrões disfarçados de esbarrões no fluxo dos corredores ou escadas.',
      'Bloquear a passagem física ou encurralar alguém no banheiro ou quadra esportiva.',
      'Agressões diretas com socos, rasteiras, puxões de cabelo ou tapas.'
    ],
    warningSigns: [
      'Hematomas, arranhões inexplicáveis ou roupas e cadernos rasgados.',
      'Recusa repentina em frequentar aulas práticas ou de Educação Física.',
      'Medo evidente de transitar por áreas com pouca supervisão de inspetores.'
    ],
    howToActStudent: [
      'Busque refúgio imediato em áreas movimentadas e próximas a professores.',
      'Nunca hesite em pedir socorro ou acionar o botão de SOS do aplicativo.',
      'Relate com precisão o local e o horário da agressão à equipe gestora.'
    ],
    howToActWitness: [
      'Avise um inspetor, professor ou coordenador com urgência.',
      'Nunca tente responder com violência física para não gerar tumulto generalizado.',
      'Ofereça primeiros socorros e acompanhamento seguro à vítima.'
    ],
    legalFramework: 'Estatuto da Criança e do Adolescente (ECA) e Art. 146-A do Código Penal.'
  },
  {
    id: 'relacional',
    name: 'Bullying Social & Relacional',
    shortDescription: 'Exclusão proposital de grupos, espalhar boatos, ignorar a presença e isolamento forçado.',
    fullDescription: 'Agressão psicológica sutil que ataca as conexões sociais da vítima, isolando-a da turma e destruindo sua rede de apoio, autoestima e pertencimento escolar.',
    icon: 'UserMinus',
    severityLevel: 'grave',
    colorTheme: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/40',
      text: 'text-purple-400',
      badgeBg: 'bg-purple-500/20',
      glow: 'shadow-purple-500/20'
    },
    examples: [
      'Combinar para que ninguém faça trabalho em grupo com determinado aluno.',
      'Espalhar fofocas e mentiras para destruir as amizades do colega.',
      'Levantar-se quando o aluno senta na mesa do refeitório para deixá-lo sozinho.'
    ],
    warningSigns: [
      'Isolamento voluntário frequente durante os intervalos e refeições.',
      'Tristeza profunda, choro contido e desmotivação com atividades coletivas.',
      'Queda acentuada no rendimento escolar por falta de parceiros de estudo.'
    ],
    howToActStudent: [
      'Lembre-se de que a exclusão é fruto da imaturidade dos agressores, não da sua dignidade.',
      'Procure estudantes de outras turmas e participe de projetos extracurriculares.',
      'Converse com o professor orientador sobre a dinâmica dos grupos.'
    ],
    howToActWitness: [
      'Pratique a inclusão ativa: chame o colega para sua equipe de trabalho.',
      'Sente-se ao lado dele no refeitório e inicie conversas acolhedoras.',
      'Desminta boatos falsos sempre que ouvi-los nos corredores.'
    ],
    legalFramework: 'Art. 2º da Lei Federal nº 13.185/2015.'
  },
  {
    id: 'cyberbullying',
    name: 'Cyberbullying & Assédio Digital',
    shortDescription: 'Ataques virtuais, memes difamatórios, grupos de exclusão em redes e vazamento de fotos.',
    fullDescription: 'Perseguição, humilhação e violência moral realizadas por meio de smartphones, redes sociais, aplicativos de mensagens (WhatsApp, Discord, Instagram) e jogos online.',
    icon: 'Smartphone',
    severityLevel: 'critico',
    colorTheme: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/40',
      text: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/20',
      glow: 'shadow-cyan-500/20'
    },
    examples: [
      'Criar figurinhas ou memes com fotos de colegas tiradas sem consentimento.',
      'Criar perfis falsos ou páginas de "exposed" para caluniar alunos e professores.',
      'Enviar mensagens com ameaças e ofensas em grupos ou chats privados.'
    ],
    warningSigns: [
      'Angústia visível ao receber notificações no celular ou olhar para a tela.',
      'Desativação repentina de redes sociais e isolamento da comunicação virtual.',
      'Insônia e alteração brusca de humor após usar o smartphone à noite.'
    ],
    howToActStudent: [
      'Guarde todas as provas (capturas de tela com data, hora, número ou URL).',
      'Bloqueie os agressores e não responda no calor do momento.',
      'Anexe as evidências diretamente no formulário seguro do StopBullying.'
    ],
    howToActWitness: [
      'Não repasse figurinhas, memes ou prints que ridicularizem ninguém.',
      'Denuncie a publicação na própria plataforma digital e alerte a escola.',
      'Mande uma mensagem privada de solidariedade para o colega atacado.'
    ],
    legalFramework: 'Lei nº 14.811/2024 (Reclusão de 2 a 4 anos para crimes virtuais).'
  },
  {
    id: 'psicologico',
    name: 'Bullying Psicológico',
    shortDescription: 'Chantagens, ameaças veladas, olhares intimidadores, perseguição e terror emocional.',
    fullDescription: 'Ações que visam causar sofrimento psíquico, medo constante, perda de autoestima e sentimento de desamparo na vítima sem necessidade de contato físico explícito.',
    icon: 'BrainCircuit',
    severityLevel: 'grave',
    colorTheme: {
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/40',
      text: 'text-pink-400',
      badgeBg: 'bg-pink-500/20',
      glow: 'shadow-pink-500/20'
    },
    examples: [
      'Ameaçar "pegar lá fora" após o horário de saída da escola.',
      'Chantagens exigindo dinheiro, lanches ou tarefas escolares prontas.',
      'Rir debochadamente em grupo sempre que o estudante entra na sala.'
    ],
    warningSigns: [
      'Crises de ansiedade, dor de barriga frequente antes de ir para a escola.',
      'Pesadelos recorrentes, medo de andar sozinho e perda de apetite.',
      'Queda brusca na autoconfiança e verbalização de frases autodepreciativas.'
    ],
    howToActStudent: [
      'Procure o serviço de orientação educacional ou apoio psicológico escolar.',
      'O medo é o combustível do agressor e perde a força quando compartilhado.',
      'Utilize os exercícios de respiração 4-7-8 no aplicativo para manter o foco.'
    ],
    howToActWitness: [
      'Acompanhe o colega durante o intervalo e na hora da saída.',
      'Relate as atitudes intimidadoras aos professores com riqueza de detalhes.',
      'Demonstre que o colega não está sozinho nos corredores.'
    ],
    legalFramework: 'Art. 2º, Inciso III da Lei nº 13.185/2015.'
  },
  {
    id: 'material',
    name: 'Bullying Material & Patrimonial',
    shortDescription: 'Danificar mochilas, estragar cadernos, esconder materiais, quebrar óculos ou furtar pertences.',
    fullDescription: 'Violação proposital e contínua dos pertences escolares ou pessoais de outro aluno para gerar prejuízo financeiro, humilhação e desestabilização.',
    icon: 'PackageX',
    severityLevel: 'moderado',
    colorTheme: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20',
      glow: 'shadow-emerald-500/20'
    },
    examples: [
      'Jogar a mochila do colega na lixeira ou pela janela da sala.',
      'Rasgar páginas de trabalhos escolares prontos e rabiscar livros didáticos.',
      'Esconder o estojo, óculos ou casaco para fazê-lo procurar em desespero.'
    ],
    warningSigns: [
      'Materiais frequentemente perdidos ou destruídos sem justificativa plausível.',
      'Pedido constante de dinheiro aos pais para repor itens sumidos.',
      'Receio exagerado de deixar a carteira desacompanhada durante o recreio.'
    ],
    howToActStudent: [
      'Registre o fato com o professor no momento exato em que constatar o dano.',
      'Evite levar objetos de alto valor financeiro para a sala de aula.',
      'Formalize o registro no aplicativo com fotos do dano patrimonial.'
    ],
    howToActWitness: [
      'Se souber quem escondeu ou danificou o material, informe discretamente a direção.',
      'Ajude o colega a recolher os pertences e ofereça material emprestado se necessário.'
    ],
    legalFramework: 'Art. 2º da Lei nº 13.185/2015 e Código Civil (Responsabilidade Civil).'
  },
  {
    id: 'moral',
    name: 'Bullying Moral & Calúnia',
    shortDescription: 'Difamação, calúnia, espalhar falsos testemunhos e manchar o caráter perante a comunidade.',
    fullDescription: 'Atos que atacam a honra, integridade e valores morais do aluno ou de sua família, atribuindo-lhe comportamentos vergonhosos ou crimes inexistentes.',
    icon: 'Scale',
    severityLevel: 'grave',
    colorTheme: {
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/40',
      text: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/20',
      glow: 'shadow-indigo-500/20'
    },
    examples: [
      'Acusar falsamente um colega de furto de celular na sala de aula.',
      'Inventar boatos sobre a vida íntima de alguém e espalhar para os pais da turma.',
      'Fazer acusações infundadas para colocá-lo contra os professores.'
    ],
    warningSigns: [
      'Sentimento profundo de injustiça, revolta e desamparo moral.',
      'Tentativa constante de se justificar perante todos os colegas.',
      'Isolamento súbito motivado por vergonha de boatos inverídicos.'
    ],
    howToActStudent: [
      'Exija a apuração formal dos fatos junto à direção com auxílio de seus responsáveis.',
      'Mantenha a calma e apresente os fatos com clareza.',
      'Relate o assédio moral no canal seguro da escola.'
    ],
    howToActWitness: [
      'Não repasse boatos sem comprovação factual.',
      'Defenda a verdade publicamente e dê testemunho do bom caráter do colega.'
    ],
    legalFramework: 'Art. 138, 139 e 140 do Código Penal (Calúnia, Difamação e Injúria).'
  },
  {
    id: 'sexual',
    name: 'Bullying Sexual & Assédio',
    shortDescription: 'Comentários de cunho sexual indesejados, toques sem consentimento e piadas invasivas.',
    fullDescription: 'Qualquer conduta de natureza sexual não solicitada que constranja, viole a intimidade ou agrida a dignidade corporal e psicológica do estudante.',
    icon: 'AlertTriangle',
    severityLevel: 'critico',
    colorTheme: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/40',
      text: 'text-red-400',
      badgeBg: 'bg-red-500/20',
      glow: 'shadow-red-500/20'
    },
    examples: [
      'Puxar roupas íntimas ou tentar levantar saias e uniformes.',
      'Comentários desrespeitosos sobre o corpo ou sexualidade de colegas.',
      'Pressionar por fotos íntimas ou envio de mensagens com teor erótico não consentido.'
    ],
    warningSigns: [
      'Recusa veemente de proximidade física e medo de certas companhias.',
      'Crises de choro incontroláveis e sentimento de culpa desproporcional.',
      'Mudança brusca no estilo de vestimenta para se ocultar.'
    ],
    howToActStudent: [
      'Esta conduta é gravíssima e ilegal. Comunique imediatamente a coordenação e a seus pais.',
      'Dispare o alerta de SOS caso se sinta ameaçado(a) fisicamente.',
      'Ligue para o Disque 100 ou procure a sala de acolhimento escolar.'
    ],
    howToActWitness: [
      'Intervenha imediatamente chamando um professor ou adulto de autoridade.',
      'Nunca tolere nem encubra o assédio ou a importunação sexual.',
      'Dê apoio emocional incondicional à vítima.'
    ],
    legalFramework: 'ECA (Lei nº 8.069/1990) e Art. 215-A do Código Penal (Importunação Sexual).'
  }
];

export const RESPECT_GUIDE_TOPICS: RespectGuideTopic[] = [
  {
    id: 'escuta_ativa',
    title: 'O Poder da Escuta Ativa',
    icon: '👂',
    description: 'Aprender a ouvir o colega sem julgamento prévio, validando seus sentimentos e compreendendo sua dor.',
    actionPoints: [
      'Ouça com atenção antes de responder ou emitir opiniões precipitadas.',
      'Evite diminuir o sofrimento do outro com frases como "isso é besteira".',
      'Valide as emoções: "Eu entendo como isso deve ter sido difícil para você."'
    ],
    reflectionQuote: '"A escuta atenta é a maior demonstração de respeito que podemos oferecer."'
  },
  {
    id: 'upstander',
    title: 'A Postura da Testemunha Ativa (Upstander)',
    icon: '🦸‍♂️',
    description: 'A diferença crucial entre ser mero espectador (que valida a agressão com o silêncio) e ser um aliado da paz.',
    actionPoints: [
      'Não seja cúmplice: rir de uma piada humilhante alimenta o agressor.',
      'Acolha a vítima imediatamente após o ocorrido.',
      'Utilize o método dos 4 D\'s: Direto, Distrair, Delegar e Dar Apoio.'
    ],
    reflectionQuote: '"O silêncio diante da injustiça fortalece quem agride."'
  },
  {
    id: 'cnv',
    title: 'Comunicação Não-Violenta (CNV)',
    icon: '💬',
    description: 'Como expressar sentimentos, necessidades e discordâncias sem recorrer ao sarcasmo ou à agressividade.',
    actionPoints: [
      'Observe os fatos sem julgamentos morais carregados.',
      'Identifique o sentimento: "Quando isso acontece, eu me sinto chateado(a)..."',
      'Faça pedidos claros e práticos em vez de exigências ríspidas.'
    ],
    reflectionQuote: '"Palavras bem escolhidas constroem pontes no lugar de muralhas."'
  },
  {
    id: 'diversidade',
    title: 'Diversidade, Equidade & Inclusão',
    icon: '🌈',
    description: 'O valor inestimável das diferenças culturais, étnicas, físicas, neurológicas e de personalidade na escola.',
    actionPoints: [
      'Reconheça que cada colega possui uma história e vivência única.',
      'Celebre a diversidade como riqueza que fortalece o coletivo.',
      'Repudie qualquer tipo de preconceito, racismo, capacitismo ou homofobia.'
    ],
    reflectionQuote: '"A beleza da convivência humana reside nas nossas diferenças."'
  }
];

export const LAW_ARTICLES_DATA: LawArticle[] = [
  {
    number: 'Art. 1º',
    title: 'Programa de Combate à Intimidação Sistemática',
    content: 'Fica instituído o Programa de Combate à Intimidação Sistemática (Bullying) em todo o território nacional, com o objetivo de promover a cidadania e a empatia.',
    practicalApplication: 'Determina que todas as escolas brasileiras devem ter programas contínuos de conscientização e combate ao bullying.'
  },
  {
    number: 'Art. 2º',
    title: 'Definição Legal do Bullying',
    content: 'Caracteriza-se a intimidação sistemática (bullying) quando há violência física ou psicológica em atos de intimidação, humilhação ou discriminação, de forma intencional e repetitiva.',
    practicalApplication: 'Diferencia um desentendimento casual de uma perseguição contínua e intencional.'
  },
  {
    number: 'Art. 4º',
    title: 'Objetivos e Medidas Educativas',
    content: 'Constituem objetivos do Programa: capacitar docentes e equipes pedagógicas, implementar campanhas educativas e priorizar medidas socioeducativas e restaurativas sobre punições isoladas.',
    practicalApplication: 'A escola deve focar na restauração da convivência e no acolhimento de todos os envolvidos.'
  },
  {
    number: 'Lei nº 14.811/2024',
    title: 'Tipificação no Código Penal (Art. 146-A)',
    content: 'Criminalizou expressamente o bullying e cyberbullying no Código Penal brasileiro, prevendo multa para atos presenciais e reclusão de 2 a 4 anos e multa para crimes cometidos em ambientes digitais.',
    practicalApplication: 'Garante respaldo penal rigoroso contra ameaças virtuais, exposed e perseguições digitais.'
  }
];
