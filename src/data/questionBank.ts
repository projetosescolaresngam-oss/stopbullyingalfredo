export type DifficultyLevel = 'facil' | 'medio' | 'dificil' | 'impossivel';

export type QuestionCategory = 
  | 'fundamentos'
  | 'cotidiano'
  | 'cyber'
  | 'legislacao'
  | 'decisao'
  | 'dilemas'
  | 'enem_avancado'
  | 'consequencias'
  | 'prevencao'
  | 'direitos'
  | 'convivencia'
  | 'empatia'
  | 'espectador'
  | 'mediacao';

export type CompetencyArea = 'respeito' | 'convivencia' | 'bullying' | 'cyber' | 'direitos';

export interface BankQuestion {
  id: string;
  pergunta: string;
  contexto?: string;
  opcoes: [string, string, string, string];
  correta: 0 | 1 | 2 | 3;
  explicacao: string;
  dificuldade: DifficultyLevel;
  categoria: QuestionCategory;
  competencia: CompetencyArea;
  referencia: string;
}

export interface QuizItem {
  id: string;
  titulo: string;
  dificuldade: DifficultyLevel;
  categoria: QuestionCategory;
  competencia: CompetencyArea;
  enunciado: string;
  contexto?: string;
  opcoes: [string, string, string, string];
  correta: 0 | 1 | 2 | 3;
  explicacao: string;
  justificativaIncorretas: [string, string, string];
  referencia: string;
  xpRecompensa: number; // 10 (fácil), 20 (médio), 35 (difícil), 50 (impossível)
  missoesAssociadas?: string[];
  conquistasAssociadas?: string[];
}




export const FACIL_QUESTIONS: BankQuestion[] = [
  {
    id: 'facil_001',
    pergunta: 'Qual característica diferencia fundamentalmente uma brincadeira entre amigos de uma prática de bullying?',
    contexto: 'Dois colegas se desentendem no recreio sobre um apelido atribuído durante a aula de Educação Física.',
    opcoes: [
      'A brincadeira gera diversão mútua e cessa quando alguém se sente mal; o bullying é repetitivo e causa sofrimento intencional.',
      'A brincadeira só ocorre fora da escola, enquanto o bullying ocorre obrigatoriamente dentro da sala de aula.',
      'Não há diferença técnica, pois todo desentendimento verbal entre estudantes é legalmente considerado bullying.',
      'A brincadeira envolve apenas alunos da mesma turma, enquanto o bullying envolve exclusivamente alunos de séries diferentes.'
    ],
    correta: 0,
    explicacao: 'A reciprocidade e o consentimento definem a brincadeira sadia. Quando há desequilíbrio de poder, intencionalidade de ferir e repetição, configura-se intimidação sistemática.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    referencia: 'Lei nº 13.185/2015, Art. 1º, § 1º'
  },
  {
    id: 'facil_002',
    pergunta: 'Ao presenciar um colega sendo ridicularizado em sala de aula, qual é a atitude mais ética e segura para uma testemunha?',
    contexto: 'Vários estudantes riem de um colega que errou uma resposta dada ao professor.',
    opcoes: [
      'Rir junto para não se tornar o próximo alvo do grupo.',
      'Não participar da zombaria, acolher o colega após a aula e relatar o fato a um profissional da escola.',
      'Filmar a situação com o celular e postar na internet para expor quem estava caçoando.',
      'Revidar agredindo fisicamente os colegas que estavam rindo.'
    ],
    correta: 1,
    explicacao: 'A testemunha deve quebrar o ciclo de validação do agressor (não rindo), prestar solidariedade à vítima e acionar os canais escolares discretamente.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Programa de Combate à Intimidação Sistemática (MEC)'
  },
  {
    id: 'facil_003',
    pergunta: 'Criar uma página ou perfil falso nas redes sociais para ridicularizar a aparência de um estudante configura qual tipo de conduta?',
    contexto: 'Um perfil anônimo posta montagens ofensivas de fotos tiradas escondidas na escola.',
    opcoes: [
      'Exercício normal de anonimato e liberdade de expressão na web.',
      'Cyberbullying, uma forma virtual de intimidação sistemática com potencial de ampla propagação.',
      'Brincadeira de internet sem consequências no mundo real.',
      'Conflito pedagógico comum que não demanda intervenção escolar.'
    ],
    correta: 1,
    explicacao: 'A utilização de ferramentas virtuais para depreciar, humilhar ou caluniar colegas configura cyberbullying, previsto como crime no Código Penal.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Art. 146-A, Parágrafo Único do Código Penal (Lei nº 14.811/2024)'
  },
  {
    id: 'facil_004',
    pergunta: 'O que significa praticar a empatia no cotidiano escolar?',
    contexto: 'Um aluno novato está almoçando sozinho no refeitório no seu primeiro dia de aula.',
    opcoes: [
      'Concordar com tudo o que qualquer pessoa diz, mesmo quando há desrespeito.',
      'Colocar-se mental e emocionalmente no lugar do outro, buscando compreender seus sentimentos e acolhê-lo.',
      'Sentir pena de alguém e comentar publicamente sobre suas dificuldades para a turma.',
      'Ignorar as diferenças individuais para que todos pareçam exatamente iguais.'
    ],
    correta: 1,
    explicacao: 'Empatia é a capacidade de compreender a perspectiva alheia com compaixão e respeito, motivando atitudes proativas de acolhimento e inclusão.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'BNCC - Competência Geral 9 (Empatia e Cooperação)'
  },
  {
    id: 'facil_005',
    pergunta: 'Qual é o papel da comissão de mediação de conflitos dentro de uma escola?',
    contexto: 'Dois estudantes tiveram um desentendimento durante a elaboração de uma maquete.',
    opcoes: [
      'Determinar castigos severos e expulsar imediatamente os estudantes envolvidos.',
      'Facilitar o diálogo construtivo, ouvir as partes com imparcialidade e construir acordos de reparação e convivência.',
      'Publicar o nome dos estudantes infratores no mural da escola como exemplo disciplinar.',
      'Ignorar os desentendimentos para que os próprios alunos resolvam sem auxílio de adultos.'
    ],
    correta: 1,
    explicacao: 'A mediação pedagógica busca restaurar laços, compreender as causas do atrito e incentivar a responsabilidade mútua em vez de apenas aplicar medidas punitivas cegas.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Diretrizes Curriculares Nacionais para a Educação Básica'
  },
  {
    id: 'facil_006',
    pergunta: 'Isolar propositalmente um colega, combinando com a turma para que ninguém converse com ele, é classificado como qual tipo de agressão?',
    contexto: 'Um grupo decide que ninguém mais responderá às mensagens de uma aluna no grupo da sala.',
    opcoes: [
      'Bullying social ou relacional, voltado a quebrar vínculos e causar isolamento.',
      'Bullying físico direto com contato corporal.',
      'Apenas preferência pessoal de amizade sem impacto na saúde mental.',
      'Estratégia pedagógica permitida para incentivar a independência do aluno.'
    ],
    correta: 0,
    explicacao: 'O bullying social ou relacional ocorre quando se orquestra a exclusão, difamação ou ostracismo social de alguém de maneira sistemática.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'bullying',
    referencia: 'Lei nº 13.185/2015, Art. 2º, Inciso VII'
  },
  {
    id: 'facil_007',
    pergunta: 'Qual a importância de um canal de denúncia anônimo em uma instituição de ensino?',
    contexto: 'Um estudante presencia ameaças no banheiro, mas teme retaliações caso seja visto conversando com a direção.',
    opcoes: [
      'Substituir o diálogo entre famílias e professores.',
      'Garantir que testemunhas e vítimas possam relatar fatos com segurança, quebrando a barreira do medo de represálias.',
      'Permitir inventar boatos contra professores sem ser responsabilizado.',
      'Eliminar a necessidade de vigilância presencial nos pátios escolares.'
    ],
    correta: 1,
    explicacao: 'O anonimato técnico protege o denunciante de represálias, viabilizando que a equipe gestora tome ciência precoce de abusos que ocorrem longe dos olhos dos inspetores.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'Guia de Proteção Escolar do Ministério dos Direitos Humanos'
  },
  {
    id: 'facil_008',
    pergunta: 'Se você receber no celular uma foto constrangedora de um colega da escola, qual é a atitude correta a adotar?',
    contexto: 'Uma foto tirada no vestiário começou a circular nos grupos de conversa.',
    opcoes: [
      'Encaminhar para os amigos mais próximos antes que apaguem.',
      'Não repassar, orientar quem enviou a cessar o compartilhamento e avisar um adulto de confiança.',
      'Salvar na nuvem para usar em um momento de discussão futura.',
      'Comentar sobre a foto nos corredores da escola para ver quem mais recebeu.'
    ],
    correta: 1,
    explicacao: 'Repassar imagens íntimas ou vexatórias amplia o dano e pode configurar infração infracional grave. O dever ético é interromper a corrente e notificar os responsáveis.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Estatuto da Criança e do Adolescente (ECA, Art. 17 e Art. 241-A)'
  },
  {
    id: 'facil_009',
    pergunta: 'Por que o uso de apelidos pejorativos frequentes não deve ser considerado inofensivo?',
    contexto: 'Um estudante passa o ano letivo sendo chamado por uma alcunha referente ao seu peso corporal.',
    opcoes: [
      'Porque prejudica o rendimento escolar apenas nas provas de redação.',
      'Porque corrói a autoestima, gera ansiedade social crônica e normaliza a desumanização do outro.',
      'Porque é proibido falar apelidos carinhosos dentro das salas de aula.',
      'Porque apenas os apelidos relacionados a notas escolares são proibidos pela direção.'
    ],
    correta: 1,
    explicacao: 'A reiteração de rótulos pejorativos mina o sentimento de pertencimento e gera sofrimento psíquico, sendo uma das manifestações mais comuns do bullying verbal.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    referencia: 'Lei nº 13.185/2015, Art. 2º, Inciso I'
  },
  {
    id: 'facil_010',
    pergunta: 'Qual dos seguintes ambientes escolares exige maior atenção preventiva contra agressões por ter menor supervisão constante?',
    contexto: 'A comissão escolar está mapeando os pontos de maior incidência de relatos de agressão.',
    opcoes: [
      'A sala dos professores durante o horário de reuniões pedagógicas.',
      'Banheiros, corredores isolados, escadas e o entorno da escola no horário da saída.',
      'A biblioteca municipal durante as férias escolares.',
      'A secretaria escolar em frente ao balcão de atendimento.'
    ],
    correta: 1,
    explicacao: 'Locais com menor circulação de servidores ou com pontos cegos são estatisticamente os mais procurados para intimidações físicas e verbais.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    referencia: 'Diagnóstico Nacional de Segurança Escolar (INEP)'
  },
  {
    id: 'facil_011',
    pergunta: 'O que caracteriza a Comunicação Não-Violenta (CNV) em uma situação de atrito entre estudantes?',
    contexto: 'Um colega não entregou a parte combinada do trabalho escolar a tempo.',
    opcoes: [
      'Expressar sentimentos e necessidades com clareza, sem julgar, ofender ou rotular a pessoa.',
      'Ficar em silêncio absoluto e nunca falar com o colega novamente.',
      'Gritar para impor respeito de forma imediata antes que o outro responda.',
      'Exigir que o colega faça todo o próximo trabalho sozinho como punição moral.'
    ],
    correta: 0,
    explicacao: 'A CNV estrutura o diálogo em quatro passos: observação dos fatos, identificação de sentimentos, reconhecimento de necessidades e formulação de pedidos claros.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Marshall Rosenberg - Comunicação Não-Violenta'
  },
  {
    id: 'facil_012',
    pergunta: 'Quando um aluno é constantemente interrompido e ridicularizado pelo seu sotaque regional, qual tipo de discriminação ocorre?',
    contexto: 'Um aluno transferido de outro estado enfrenta risadas toda vez que lê em voz alta.',
    opcoes: [
      'Preconceito linguístico e regional, que fere o respeito à diversidade cultural brasileira.',
      'Apenas uma curiosidade linguística legítima e desprovida de intenção danosa.',
      'Exercício pedagógico espontâneo para correção gramatical coletiva.',
      'Procedimento rotineiro que auxilia na integração rápida do novo estudante.'
    ],
    correta: 0,
    explicacao: 'A ridicularização do modo de falar fere a dignidade cultural do estudante e constitui bullying verbal de cunho preconceituoso.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Constituição Federal de 1988, Art. 3º, IV'
  },
  {
    id: 'facil_013',
    pergunta: 'Qual é o impacto imediato da "plateia silenciosa" no comportamento do autor de bullying?',
    contexto: 'Vários estudantes assistem passivamente a uma discussão sem intervir nem buscar ajuda.',
    opcoes: [
      'O silêncio faz o agressor se sentir intimidado e desistir imediatamente da conduta.',
      'O silêncio e as risadas atuam como reforço social, encorajando a continuidade da agressão.',
      'A plateia não possui qualquer influência psicológica na dinâmica das agressões.',
      'O silêncio é obrigatório por lei para testemunhas que não sejam maiores de idade.'
    ],
    correta: 1,
    explicacao: 'Pesquisas em psicologia social demonstram que o agressor busca status e aprovação. A ausência de reprovação coletiva valida o comportamento nocivo.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'bullying',
    referencia: 'Pesquisa Nacional de Saúde do Escolar (PeNSE/IBGE)'
  },
  {
    id: 'facil_014',
    pergunta: 'O que deve fazer o estudante que se sente sobrecarregado emocionalmente e com medo de ir à escola?',
    contexto: 'O aluno acorda com dores de estômago e choro antes do horário de ir para o colégio.',
    opcoes: [
      'Guardar tudo para si mesmo, pois demonstrar medo é sinal de fraqueza pessoal.',
      'Conversar com familiares, buscar apoio da coordenação escolar e utilizar o apoio emocional do StopBullying.',
      'Abandonar os estudos permanentemente sem comunicar ninguém.',
      'Comprar objetos perigosos para levar na mochila como proteção.'
    ],
    correta: 1,
    explicacao: 'Sintomas psicossomáticos indicam sofrimento agudo. A rede de apoio familiar, pedagógica e psicológica é fundamental para restaurar a segurança.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'respeito',
    referencia: 'Cadernos de Saúde Mental na Escola (Ministério da Saúde)'
  },
  {
    id: 'facil_015',
    pergunta: 'Qual é o primeiro passo para acolher um colega que acabou de sofrer uma ofensa em sala?',
    contexto: 'Um aluno chora discretamente na sua carteira após uma humilhação coletiva.',
    opcoes: [
      'Dizer a ele que "não foi nada" e pedir para parar de ser dramático.',
      'Aproximar-se com gentileza, oferecer um copo d\'água, validar seus sentimentos e dizer que ele não está sozinho.',
      'Chamar a atenção de toda a sala para mostrar a todos que o colega está chorando.',
      'Tirar uma foto do colega chorando para guardar como prova judicial.'
    ],
    correta: 1,
    explicacao: 'Acolher exige validação emocional. Desqualificar a dor alheia revitimiza quem sofreu a agressão.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Cartilha de Primeiros Cuidados Psicológicos (OMS)'
  },
  {
    id: 'facil_016',
    pergunta: 'No ambiente digital, o que caracteriza a invasão de privacidade de um colega?',
    contexto: 'Um aluno pega o celular desbloqueado do outro sobre a carteira para ler conversas particulares.',
    opcoes: [
      'Acessar fotos, mensagens ou redes sociais alheias sem autorização expressa do titular.',
      'Adicionar o colega em uma rede social pública aberta a qualquer usuário.',
      'Mandar uma mensagem de bom dia em um grupo de trabalhos escolares.',
      'Curtir uma foto que o próprio colega publicou publicamente no seu perfil.'
    ],
    correta: 0,
    explicacao: 'A inviolabilidade da correspondência e dados privados é direito garantido constitucionalmente e pela Lei Geral de Proteção de Dados.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'LGPD (Lei nº 13.709/2018) e CF/88, Art. 5º, X'
  },
  {
    id: 'facil_017',
    pergunta: 'Por que danificar intencionalmente o material escolar de um estudante é considerado bullying material?',
    contexto: 'Um grupo esconde cadernos, rasga mochilas e quebra réguas de um mesmo estudante repetidamente.',
    opcoes: [
      'Porque atenta contra o patrimônio alheio como forma de intimidação e desestabilização contínua.',
      'Porque materiais escolares só podem ser comprados uma vez na vida.',
      'Porque a lei só protege livros impressos pelo governo federal.',
      'Porque objetos de plástico quebram com facilidade no transporte escolar.'
    ],
    correta: 0,
    explicacao: 'A destruição sistemática de pertences pessoais é uma faceta do bullying voltada a gerar desamparo material e medo constante.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'bullying',
    referencia: 'Lei nº 13.185/2015, Art. 2º, Inciso V'
  },
  {
    id: 'facil_018',
    pergunta: 'Como uma escola inclusiva deve tratar alunos com necessidades educacionais especiais ou deficiências?',
    contexto: 'Um estudante cadeirante tem dificuldade de acesso à quadra de esportes nos dias de jogo.',
    opcoes: [
      'Garantir acessibilidade física, adaptação pedagógica e promover ativamente a convivência respeitosa sem preconceitos.',
      'Pedir para que o estudante fique em casa nos dias de atividades recreativas.',
      'Exigir que o aluno caminhe normalmente sem usar apoios para não se diferenciar.',
      'Separar todos os alunos com deficiência em salas isoladas sem contato com os demais.'
    ],
    correta: 0,
    explicacao: 'A inclusão plena é um dever legal e ético. O Estatuto da Pessoa com Deficiência assegura sistema educacional inclusivo em todos os níveis.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'Lei Brasileira de Inclusão (Lei nº 13.146/2015)'
  },
  {
    id: 'facil_019',
    pergunta: 'O que significa a expressão "cultura de paz" nas escolas?',
    contexto: 'A escola está organizando uma semana temática de rodas de conversa e cidadania.',
    opcoes: [
      'Um conjunto de valores, atitudes e práticas cotidianas que rejeitam a violência e buscam prevenir conflitos pelo diálogo.',
      'A proibição de conversar sobre temas difíceis para fingir que não existem problemas.',
      'A contratação de policiais armados dentro de cada sala de aula para vigiar os alunos.',
      'A abolição de todas as regras disciplinares da escola.'
    ],
    correta: 0,
    explicacao: 'A cultura de paz, proposta pela UNESCO, baseia-se na cooperação, tolerância, respeito aos direitos humanos e resolução pacífica de disputas.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Manifesto 2000 da UNESCO por uma Cultura de Paz'
  },
  {
    id: 'facil_020',
    pergunta: 'Se dois colegas discordam sobre a preferência por um time de futebol, como a divergência deve ser resolvida?',
    contexto: 'Discussão acalorada durante o intervalo sobre o resultado de um jogo de domingo.',
    opcoes: [
      'Com ofensas pessoais e proibição de o colega torcer para o time dele.',
      'Com debate saudável, respeitando o direito de escolha e a individualidade de cada um.',
      'Com desafios de luta física no portão da escola após a aula.',
      'Denunciando o colega como criminoso na polícia.'
    ],
    correta: 1,
    explicacao: 'Divergências de opinião são naturais e enriquecedoras. A convivência democrática exige tolerância às preferências alheias.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    referencia: 'Guia de Mediação de Conflitos Escolares (MEC)'
  },
  {
    id: 'facil_021',
    pergunta: 'Qual a principal razão pela qual o cyberbullying pode causar impactos ainda mais severos que o bullying tradicional?',
    contexto: 'Um print de conversa privada foi compartilhado em redes sociais e teve milhares de visualizações.',
    opcoes: [
      'Porque a internet não permite o uso de aparelhos celulares de noite.',
      'Porque a ofensa se propaga instantaneamente, atinge público ilimitado e a vítima não encontra refúgio seguro nem em casa.',
      'Porque a internet é fiscalizada por robôs que deletam todas as mensagens antigas.',
      'Porque mensagens virtuais não deixam nenhum registro técnico para investigação.'
    ],
    correta: 1,
    explicacao: 'A permanência do registro, a velocidade de compartilhamento e a quebra da fronteira física tornam o cyberbullying desolador para a vítima.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Centro de Estudos sobre Tecnologias na Educação (Cetic.br)'
  },
  {
    id: 'facil_022',
    pergunta: 'Qual é o papel do grêmio estudantil na promoção da convivência escolar ética?',
    contexto: 'Os representantes dos alunos estão planejando o calendário de ações do semestre.',
    opcoes: [
      'Organizar apenas festas e boicotar as aulas da coordenação.',
      'Representar a voz dos estudantes, liderar campanhas de empatia e apoiar colegas em situação de vulnerabilidade.',
      'Aplicar advertências e suspensões formais aos alunos indisciplinados.',
      'Fiscalizar mochilas dos alunos no início de cada turno.'
    ],
    correta: 1,
    explicacao: 'O protagonismo juvenil promovido pelo grêmio é um dos pilares mais fortes para construir normas de respeito entre os próprios pares.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Lei do Grêmio Livre (Lei Federal nº 7.398/1985)'
  },
  {
    id: 'facil_023',
    pergunta: 'Quando um aluno compartilha um relato anônimo no StopBullying, o que acontece com a sua identidade?',
    contexto: 'Um aluno tem medo de que seu nome apareça para os professores ao enviar uma denúncia.',
    opcoes: [
      'O nome e o telefone são exibidos publicamente no painel de gestão para confirmação.',
      'A identidade permanece 100% protegida; nenhum dado pessoal é exigido ou gravado, preservando o sigilo total.',
      'A denúncia é enviada para as redes sociais com a foto do denunciante.',
      'O sistema só aceita denúncias se houver envio de cópia de documento oficial com foto.'
    ],
    correta: 1,
    explicacao: 'A arquitetura técnica do StopBullying foi desenhada sob o princípio do anonimato estrito por design, gerando apenas protocolo criptográfico.',
    dificuldade: 'facil',
    categoria: 'direitos',
    competencia: 'direitos',
    referencia: 'Marco Civil da Internet e LGPD (Princípio da Minimização)'
  },
  {
    id: 'facil_024',
    pergunta: 'O que deve ser feito ao encontrar um aluno chorando sozinho no corredor da escola?',
    contexto: 'Intervalo das aulas do turno vespertino.',
    opcoes: [
      'Passar reto fingindo que não viu para não se envolver em problemas de terceiros.',
      'Perguntar com delicadeza se ele precisa de algo e oferecer apoio para levá-lo à coordenação ou a um amigo.',
      'Tirar uma foto dele e mandar em grupo de WhatsApp rindo da situação.',
      'Dizer em voz alta que chorar na escola é vergonhoso.'
    ],
    correta: 1,
    explicacao: 'Um gesto simples de solidariedade pode interromper crises de ansiedade e salvar o dia de quem está passando por sofrimento intenso.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Manual de Acolhimento Socioemocional nas Escolas'
  },
  {
    id: 'facil_025',
    pergunta: 'Qual a atitude correta ao participar de um grupo de WhatsApp da turma escolar?',
    contexto: 'Criação do grupo de estudos oficial da sala de aula.',
    opcoes: [
      'Utilizar o espaço com respeito, focando em recados acadêmicos e jamais tolerando difamações ou exclusão de colegas.',
      'Aproveitar o grupo para mandar figurinhas humilhando alunos ausentes.',
      'Remover colegas que tiram notas mais baixas das discussões.',
      'Exigir senhas pessoais dos membros do grupo como condição de entrada.'
    ],
    correta: 0,
    explicacao: 'Grupos de turma são extensões do convívio escolar e devem pautar-se pela ética, urbanidade e respeito recíproco.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Cartilha de Cidadania Digital da SaferNet Brasil'
  },
  {
    id: 'facil_026',
    pergunta: 'Por que a prática de espalhar fofocas ou segredos confiados por um amigo é prejudicial?',
    contexto: 'Um estudante contou um segredo pessoal a um colega, que depois espalhou para toda a classe.',
    opcoes: [
      'Quebra a confiança, fragiliza a integridade moral da pessoa e pode deflagrar situações graves de humilhação pública.',
      'Apenas porque perde pontos na nota bimestral de Português.',
      'Não há prejuízo, pois informações pessoais são de interesse de toda a comunidade escolar.',
      'Porque a lei só permite segredos se forem registrados em cartório.'
    ],
    correta: 0,
    explicacao: 'A lealdade e o sigilo das intimidades alheias são alicerces de amizades verdadeiras e da segurança psicológica no ambiente coletivo.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Código de Convivência Ética Escolar'
  },
  {
    id: 'facil_027',
    pergunta: 'O que representa o exercício da "cidadania digital" pelos jovens?',
    contexto: 'Aula sobre tecnologia e mídias sociais no laboratório de informática.',
    opcoes: [
      'Usar a internet de modo crítico, ético, responsável e respeitoso aos direitos de todos os usuários.',
      'Possuir mais de mil seguidores em contas públicas na internet.',
      'Fazer compras virtuais todos os dias usando cartões de crédito.',
      'Passar mais de 10 horas diárias jogando online sem intervalo para descanso.'
    ],
    correta: 0,
    explicacao: 'A cidadania digital abrange a compreensão de que as leis, direitos humanos e a ética aplicam-se com a mesma força no universo online.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Marco Civil da Internet (Lei nº 12.965/2014)'
  },
  {
    id: 'facil_028',
    pergunta: 'Qual é o efeito do perdão e da reparação de danos quando alguém comete um erro com um colega?',
    contexto: 'Um aluno esbarrou propositalmente na mochila do outro, mas depois se arrependeu e quis pedir desculpas.',
    opcoes: [
      'Permite reconhecer a falha com humildade, reconstruir laços e evitar que pequenos atritos virem ódios duradouros.',
      'Não serve para nada, pois todo erro deve ser punido exclusivamente com agressão recíproca.',
      'Mostra fraqueza, devendo o aluno sempre negar que cometeu o ato.',
      'É proibido pedir desculpas na escola por regras regimentais.'
    ],
    correta: 0,
    explicacao: 'A justiça restaurativa ensina que a responsabilização ativa e o pedido sincero de desculpas têm poder transformador no ambiente comunitário.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Práticas Restaurativas na Escola (UNESCO / CNJ)'
  },
  {
    id: 'facil_029',
    pergunta: 'Por que o riso coletivo diante da queda ou constrangimento de alguém pode ser tão doloroso?',
    contexto: 'Uma estudante tropeça e derruba sua bandeja no refeitório, gerando gargalhadas uníssonas.',
    opcoes: [
      'Porque transforma a vulnerabilidade ou o acidente de uma pessoa em entretenimento cruel para a coletividade.',
      'Porque quebra o silêncio obrigatório das refeições escolares.',
      'Porque faz a comida cair no chão e atrasa o horário de aula.',
      'Porque só é permitido rir quando o professor autoriza por escrito.'
    ],
    correta: 0,
    explicacao: 'O riso cúmplice isola a pessoa em sua humilhação. A postura de empatia é levantar-se rapidamente para ajudar a recolher os itens caídos.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Psicologia do Desenvolvimento e Empatia Escolar'
  },
  {
    id: 'facil_030',
    pergunta: 'O que define uma atitude de liderança positiva na escola?',
    contexto: 'Eleição de representantes de sala no início do ano letivo.',
    opcoes: [
      'Aquele que usa a influência para proteger os colegas, incluir os mais tímidos e mediar desentendimentos com justiça.',
      'Aquele que manda nos outros e decide quem pode ou não brincar no grupo.',
      'Aquele que desafia os professores e incentiva a bagunça generalizada.',
      'Aquele que escolhe apenas os amigos mais populares para os melhores trabalhos.'
    ],
    correta: 0,
    explicacao: 'A verdadeira liderança é servidora: inspira pelo exemplo, constrói pontes e combate ativamente a exclusão.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Desenvolvimento de Habilidades Socioemocionais (Instituto Ayrton Senna)'
  },
  {
    id: 'facil_031',
    pergunta: 'O que um estudante deve fazer caso seja alvo de ameaças frequentes por mensagens privadas?',
    contexto: 'Um perfil envia mensagens dizendo para o aluno não aparecer no colégio na sexta-feira.',
    opcoes: [
      'Apagar imediatamente as conversas sem mostrar para ninguém.',
      'Guardar capturas de tela (prints com data e hora), não responder às provocações e avisar os pais e a direção escolar.',
      'Marcar um encontro sozinho com quem está ameaçando para resolver em briga.',
      'Mudar de cidade sem dar explicações aos familiares.'
    ],
    correta: 1,
    explicacao: 'Preservar as evidências digitais é crucial para a apuração dos fatos pelos órgãos de proteção escolar e pelas autoridades competentes.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'Cartilha de Segurança Cibernética para Jovens (CERT.br)'
  },
  {
    id: 'facil_032',
    pergunta: 'Como a prática de esportes na escola pode ajudar a diminuir o bullying?',
    contexto: 'Aulas de Educação Física integrando alunos de diferentes turmas.',
    opcoes: [
      'Estimulando o trabalho em equipe, o respeito às regras, a cooperação mútua e a valorização das habilidades de cada um.',
      'Servindo para definir quem são os estudantes mais fortes que devem mandar nos mais fracos.',
      'Eliminando quem erra uma jogada para que nunca mais possa praticar exercícios.',
      'Substituindo todas as matérias escolares tradicionais.'
    ],
    correta: 0,
    explicacao: 'O esporte educativo ensina a lidar com vitórias e derrotas, respeitar adversários e acolher colegas de diferentes níveis de habilidade.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Orientações Curriculares de Educação Física Escolar'
  },
  {
    id: 'facil_033',
    pergunta: 'Qual a importância de aprender a ouvir o colega até o fim antes de responder a uma crítica?',
    contexto: 'Reunião de grupo para ajustar as pendências de uma apresentação de biologia.',
    opcoes: [
      'Evita mal-entendidos precipitados e permite compreender as reais preocupações do outro antes de contra-argumentar.',
      'Serve apenas para ganhar tempo e pensar em uma ofensa mais pesada.',
      'É uma perda de tempo, pois a primeira pessoa a gritar sempre tem razão.',
      'Não tem utilidade quando o trabalho já está impresso.'
    ],
    correta: 0,
    explicacao: 'A escuta paciente desativa respostas reativas impulsivas e abre caminho para soluções colaborativas.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Princípios da Escuta Empática'
  },
  {
    id: 'facil_034',
    pergunta: 'O que caracteriza a discriminação por condição socioeconômica na escola?',
    contexto: 'Comentários depreciativos sobre quem usa uniforme doado ou tênis de marcas populares.',
    opcoes: [
      'Menosprezar ou excluir colegas devido ao poder aquisitivo, moradia ou vestuário de sua família.',
      'Cobrar taxa escolar obrigatória em instituições públicas estaduais.',
      'Incentivar que todos os estudantes utilizem a biblioteca gratuita.',
      'Servir a merenda escolar igualmente para todos os matriculados.'
    ],
    correta: 0,
    explicacao: 'Julgar o valor humano pelo poder de compra é forma cruel de preconceito e fere o princípio da igualdade de dignidade.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'CF/88, Art. 5º e ECA, Art. 53'
  },
  {
    id: 'facil_035',
    pergunta: 'Se um colega de classe possui dificuldades de aprendizagem e tira notas baixas, qual atitude demonstra companheirismo?',
    contexto: 'Entrega dos boletins escolares bimestrais.',
    opcoes: [
      'Fazer apelidos chamando o colega de lento ou incapaz perante a turma.',
      'Oferecer-se para estudar junto, compartilhar anotações e incentivar seu esforço diário.',
      'Pedir para o professor transferi-lo de sala para não atrapalhar o ritmo.',
      'Espalhar as notas do colega para outras salas de aula.'
    ],
    correta: 1,
    explicacao: 'A monitoria solidária entre colegas desenvolve a generosidade e eleva a confiança de quem enfrenta dificuldades pontuais.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'respeito',
    referencia: 'Pedagogia da Cooperação'
  },
  {
    id: 'facil_036',
    pergunta: 'Por que o recreio escolar deve ser um espaço de acolhimento para todos?',
    contexto: 'Planejamento de convivência comunitária no pátio da escola.',
    opcoes: [
      'Porque é o momento de descanso e socialização onde todos os estudantes têm o direito de desfrutar de paz e diversão.',
      'Porque o recreio é o único momento em que a direção permite agressões entre alunos.',
      'Porque a lei só obriga o respeito dentro das quatro paredes da sala de aula.',
      'Porque ninguém pode sentar nos bancos sem autorização prévia da coordenação.'
    ],
    correta: 0,
    explicacao: 'O intervalo faz parte do tempo formativo e seu ambiente deve ser seguro, livre de intimidações e acessível a todos.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    referencia: 'Diretrizes Operacionais de Convivência Escolar'
  },
  {
    id: 'facil_037',
    pergunta: 'O que fazer ao perceber que um colega está sendo induzido a fazer algo perigoso para "provar que é corajoso"?',
    contexto: 'Um grupo desafia um aluno novato a subir no telhado ou quebrar uma lâmpada da escola.',
    opcoes: [
      'Alertá-lo sobre o risco, não incentivar a ação e comunicar imediatamente um servidor da escola.',
      'Aplaudir e gritar para que ele faça logo antes que um professor chegue.',
      'Apostar dinheiro com os colegas sobre se ele vai se machucar ou não.',
      'Filmar tudo para postar nas redes sociais em caso de acidente.'
    ],
    correta: 0,
    explicacao: 'A pressão de grupo pode levar a desfechos trágicos. A amizade autêntica protege o colega de exposições e riscos desnecessários.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    referencia: 'Prevenção de Comportamentos de Risco na Adolescência'
  },
  {
    id: 'facil_038',
    pergunta: 'Qual frase expressa uma atitude alinhada ao respeito à diversidade religiosa no ambiente escolar público?',
    contexto: 'Alunos de diferentes religiões e crenças compartilhando a mesma sala de aula.',
    opcoes: [
      '"Cada pessoa tem o direito fundamental de professar sua fé ou não professar nenhuma, devendo ser respeitada em sua dignidade."',
      '"Apenas a minha religião está correta e quem discorda não deve ter amigos na escola."',
      '"A escola pública deve obrigar todos os estudantes a rezarem a mesma oração todos os dias."',
      '"Quem tem crença diferente não pode participar das aulas de história e ciências."'
    ],
    correta: 0,
    explicacao: 'O Estado brasileiro é laico e a Constituição assegura a liberdade de consciência e de crença, sendo inviolável o livre exercício de cultos.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'direitos',
    referencia: 'Constituição Federal de 1988, Art. 5º, VI'
  },
  {
    id: 'facil_039',
    pergunta: 'O que significa dizer que "o bullying não é um rito de passagem natural da infância"?',
    contexto: 'Discussão sobre mitos de que "apanhar na escola prepara para o mundo adulto".',
    opcoes: [
      'Significa que a violência sistemática deixa marcas traumáticas e não pode ser justificada como aprendizado positivo.',
      'Significa que apenas adultos podem sofrer agressões físicas.',
      'Significa que o bullying é obrigatório apenas para alunos do ensino fundamental.',
      'Significa que as leis não se aplicam a adolescentes menores de 16 anos.'
    ],
    correta: 0,
    explicacao: 'Estudos contemporâneos comprovam que o bullying causa danos neurológicos, emocionais e sociais, refutando a ideia de que seja algo inofensivo.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    referencia: 'Sociedade Brasileira de Pediatria (SBP)'
  },
  {
    id: 'facil_040',
    pergunta: 'Se você notar que um amigo seu está começando a caçoar repetidamente de outro aluno, como ajudá-lo a parar?',
    contexto: 'Seu amigo faz piadas diárias sobre a altura de um colega.',
    opcoes: [
      'Chamar o amigo em particular e dizer com firmeza que aquela atitude não é legal e está machucando o colega.',
      'Rir alto de todas as piadas dele para demonstrar fidelidade cega à amizade.',
      'Começar a bater no seu próprio amigo na frente de todo mundo.',
      'Fingir que não ouviu e deixar o colega sofrer sozinho.'
    ],
    correta: 0,
    explicacao: 'Amigos de verdade também dão toques construtivos. A repreensão fraterna de um par é uma das ferramentas mais eficazes para frear o agressor.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Intervenção Positiva de Pares (Programa Olweus)'
  },
  {
    id: 'facil_041',
    pergunta: 'Qual é o papel da família na prevenção do bullying escolar?',
    contexto: 'Reunião de pais e mestres sobre convivência comunitária.',
    opcoes: [
      'Conversar com os filhos sobre empatia, dialogar com a escola e não incentivar condutas agressivas como resposta.',
      'Ensinar os filhos a revidarem com violência qualquer palavra dita por colegas.',
      'Nunca comparecer à escola quando chamada pela coordenação pedagógica.',
      'Exigir que a escola expulse todos os colegas com quem o filho teve atrito.'
    ],
    correta: 0,
    explicacao: 'A parceria família-escola fortalece os limites éticos e reforça a mensagem de que a dignidade humana não é negociável.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Estatuto da Criança e do Adolescente, Art. 19'
  },
  {
    id: 'facil_042',
    pergunta: 'Por que tirar fotos ou gravar vídeos de brigas escolares para postar na internet é reprovável?',
    contexto: 'Dois estudantes iniciam uma discussão no pátio e uma roda de alunos saca celulares para gravar.',
    opcoes: [
      'Porque amplia a exposição da violência, humilha os envolvidos e fomenta o espetáculo do sofrimento humano.',
      'Porque gasta a bateria do celular dos estudantes durante as aulas.',
      'Porque celulares só funcionam com permissão do Ministério das Comunicações.',
      'Porque a imagem fica com qualidade ruim em filmagens feitas à distância.'
    ],
    correta: 0,
    explicacao: 'A espetacularização da violência estimula mais agressões. A postura ética diante de brigas é chamar imediatamente a equipe escolar.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'ECA, Art. 17 (Direito ao Respeito e à Imagem)'
  },
  {
    id: 'facil_043',
    pergunta: 'Qual o significado do princípio da igualdade perante as regras escolares?',
    contexto: 'Aplicação das diretrizes disciplinares na instituição de ensino.',
    opcoes: [
      'Todos os estudantes, sem distinção de raça, gênero, condição social ou popularidade, devem obedecer às mesmas regras e receber a mesma proteção.',
      'Alunos mais populares têm o privilégio legal de desobedecer normas sem advertência.',
      'Alunos novos na escola não têm nenhum direito nos primeiros seis meses.',
      'Apenas os alunos com melhores notas merecem ser respeitados pelos colegas.'
    ],
    correta: 0,
    explicacao: 'A isonomia é o fundamento da justiça: direitos e deveres aplicam-se com equidade a toda a comunidade escolar.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'direitos',
    referencia: 'Constituição Federal de 1988, Art. 5º, Caput'
  },
  {
    id: 'facil_044',
    pergunta: 'O que é a "autorregulação emocional" que aprendemos nas sessões de respiração do Apoio Emocional?',
    contexto: 'Um aluno sente raiva após um esbarrão involuntário no corredor.',
    opcoes: [
      'A capacidade de reconhecer o impulso de raiva, respirar fundo e escolher uma resposta pacífica em vez de explodir com agressão.',
      'A obrigação de nunca sentir raiva em hipótese alguma durante a vida.',
      'Uma técnica para fingir que não ouviu o professor na sala de aula.',
      'Um exercício que substitui as refeições diárias na escola.'
    ],
    correta: 0,
    explicacao: 'Sentir emoções é humano; escolher como agir diante delas é uma habilidade socioemocional que pode ser treinada para evitar brigas.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Competências Socioemocionais (CASEL / MEC)'
  },
  {
    id: 'facil_045',
    pergunta: 'Como o professor pode agir como facilitador da paz em sala de aula?',
    contexto: 'Divisão de grupos de trabalho com relatos de alunos excluídos.',
    opcoes: [
      'Promovendo dinâmicas cooperativas, estando atento a sinais sutis de segregação e garantindo que todos os alunos participem integrados.',
      'Deixando que os grupos mais fortes decidam quem deve ser banido das tarefas.',
      'Fingindo que não vê os comentários ofensivos que ocorrem nas fileiras do fundo.',
      'Dizendo aos estudantes que conflitos em sala são naturais e que ninguém deve reclamar.'
    ],
    correta: 0,
    explicacao: 'A intervenção docente ativa é determinante para desestimular panelinhas excludentes e construir pertencimento coletivo.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Diretrizes Curriculares Nacionais de Educação em Direitos Humanos'
  },
  {
    id: 'facil_046',
    pergunta: 'O que fazer caso alguém envie uma mensagem pedindo para você excluir determinado colega de um trabalho em grupo?',
    contexto: 'Mensagem privada no WhatsApp antes da entrega da lista de participantes.',
    opcoes: [
      'Recusar o pedido discriminatório, reforçar que o trabalho é aberto e dialogar com o grupo para manter a inclusão.',
      'Aceitar imediatamente para agradar quem mandou a mensagem.',
      'Tirar o nome do colega sem avisá-lo para que ele descubra na hora da nota.',
      'Excluir todos os membros do grupo e fazer o trabalho sozinho.'
    ],
    correta: 0,
    explicacao: 'Não ser cúmplice da exclusão fortalece os valores democráticos e demonstra maturidade cidadã perante o grupo.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Ética nas Relações Escolares'
  },
  {
    id: 'facil_047',
    pergunta: 'Qual a diferença entre um conflito pontual e o bullying continuado?',
    contexto: 'Dois amigos brigaram pela posse de uma bola no recreio na segunda-feira e fizeram as pazes na terça-feira.',
    opcoes: [
      'O conflito pontual é ocasional e de forças equivalentes; o bullying é sistemático, repetitivo e com desequilíbrio de poder evidente.',
      'O conflito só ocorre entre meninas e o bullying só entre meninos.',
      'Não há nenhuma diferença, devendo ambos serem punidos com expulsão.',
      'O conflito pontual é crime inafiançável e o bullying é um desentendimento simples.'
    ],
    correta: 0,
    explicacao: 'Conflitos fazem parte das relações humanas e podem ser resolvidos rapidamente. O bullying caracteriza-se pela perseguição persistente e opressão contínua.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    referencia: 'Lei nº 13.185/2015, Art. 1º'
  },
  {
    id: 'facil_048',
    pergunta: 'Por que o consentimento é indispensável antes de tirar e publicar fotos de outras pessoas?',
    contexto: 'Estudante filmando colegas na aula de artes.',
    opcoes: [
      'Porque a imagem de cada indivíduo é protegida por lei e ninguém pode ser exposto sem sua livre autorização.',
      'Porque a memória das câmeras digitais é restrita a fotos de paisagens.',
      'Porque fotos tiradas em sala perdem a cor se publicadas sem filtro.',
      'Apenas porque os professores querem aparecer primeiro em todas as fotos.'
    ],
    correta: 0,
    explicacao: 'O direito à imagem é garantia individual inegociável. Fotografar ou filmar alguém sem permissão viola sua privacidade.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'Código Civil Brasileiro, Art. 20 e CF/88, Art. 5º, X'
  },
  {
    id: 'facil_049',
    pergunta: 'O que significa dizer que "o respeito não depende de simpatizar ou ser amigo da pessoa"?',
    contexto: 'Dois estudantes que não têm afinidades pessoais precisam sentar lado a lado no laboratório.',
    opcoes: [
      'Significa que o respeito é um dever universal devido a qualquer ser humano, independentemente de laços de amizade.',
      'Significa que só devemos respeitar quem nós amamos intensamente.',
      'Significa que colegas com quem não conversamos podem ser ofendidos livremente.',
      'Significa que a escola só deve aceitar alunos que sejam amigos de infância.'
    ],
    correta: 0,
    explicacao: 'Você não é obrigado a ser amigo íntimo de todos, mas é categoricamente obrigado a respeitar a dignidade de cada indivíduo.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Declaração Universal dos Direitos Humanos, Art. 1º'
  },
  {
    id: 'facil_050',
    pergunta: 'Qual das seguintes condutas representa uso ético do laboratório de informática escolar?',
    contexto: 'Aula de pesquisa na biblioteca digital da escola.',
    opcoes: [
      'Focar na pesquisa orientada pelo professor, cuidar dos equipamentos e não instalar programas nocivos nem invadir perfis alheios.',
      'Trocar os teclados e mouses de lugar para pregar peças na próxima turma.',
      'Acessar as contas de e-mail de quem esqueceu a senha salva para ler mensagens.',
      'Deixar lixo e copos de refrigerante derramados em cima dos computadores.'
    ],
    correta: 0,
    explicacao: 'O patrimônio público pertence a toda a comunidade escolar e deve ser zelado com responsabilidade e respeito às regras de uso.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'convivencia',
    referencia: 'Regimento Escolar Comum das Escolas Estaduais'
  },
  {
    id: 'facil_051',
    pergunta: 'O que um estudante deve fazer ao ouvir um boato maldoso sobre um professor ou funcionário da escola?',
    contexto: 'Conversa no horário do intervalo sobre a vida pessoal de uma merendeira.',
    opcoes: [
      'Não espalhar a fofoca, lembrar os colegas de que boatos destroem reputações e focar nas atividades escolares.',
      'Postar em página anônima de fofocas da escola para ver as curtidas aumentarem.',
      'Aumentar a história para deixá-la mais emocionante nos grupos de bate-papo.',
      'Pressionar o funcionário nos corredores para confessar o que disseram dele.'
    ],
    correta: 0,
    explicacao: 'A difamação de servidores e colegas é conduta antiética grave. Interromper boatos preserva a dignidade do trabalhador da educação.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Código de Ética dos Servidores e Comunidade Escolar'
  },
  {
    id: 'facil_052',
    pergunta: 'Por que o Estatuto da Criança e do Adolescente (ECA) garante o direito à educação de qualidade e ao respeito por parte dos educadores e colegas?',
    contexto: 'Debate no componente curricular de Cidadania e Direitos Humanos.',
    opcoes: [
      'Porque a escola é o espaço de desenvolvimento integral da pessoa, preparo para o exercício da cidadania e qualificação para o trabalho.',
      'Porque o ECA foi criado apenas para proibir deveres de casa nos finais de semana.',
      'Porque as leis brasileiras consideram que crianças não precisam seguir horários.',
      'Porque a educação só tem valor se não houver provas e avaliações diagnósticas.'
    ],
    correta: 0,
    explicacao: 'O Artigo 53 do ECA consagra a educação como direito humano fundamental para o florescimento de todas as potencialidades do jovem.',
    dificuldade: 'facil',
    categoria: 'direitos',
    competencia: 'direitos',
    referencia: 'Estatuto da Criança e do Adolescente (Lei nº 8.069/1990), Art. 53'
  },
  {
    id: 'facil_053',
    pergunta: 'Se um colega estiver com dificuldades de se expressar por gagueira ou timidez, qual postura é recomendada?',
    contexto: 'Apresentação de seminário de Geografia em frente ao quadro.',
    opcoes: [
      'Aguardar em silêncio respeitoso, sem rir, sem completar as palavras por ele com impaciência e prestando atenção ao conteúdo apresentado.',
      'Rir e imitar o jeito de falar do colega para descontrair a sala.',
      'Mandar bilhetes dizendo para ele desistir e sentar logo na carteira.',
      'Começar a conversar alto com o colega do lado para ignorar a fala.'
    ],
    correta: 0,
    explicacao: 'A paciência e o acolhimento oferecem segurança psicológica para que o colega supere bloqueios e conclua sua fala com dignidade.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Diretrizes de Acessibilidade Comunicacional'
  },
  {
    id: 'facil_054',
    pergunta: 'O que significa agir com "gentileza ativa" no início do dia escolar?',
    contexto: 'Entrada dos alunos no portão principal às 7h da manhã.',
    opcoes: [
      'Cumprimentar colegas, porteiros e professores com um "bom dia" sincero e um sorriso cordial.',
      'Empurrar quem está na fila para entrar primeiro na sala de aula.',
      'Ignorar todo mundo e entrar com fone de ouvido no volume máximo sem olhar para ninguém.',
      'Gritar apelidos nos corredores para acordar a escola.'
    ],
    correta: 0,
    explicacao: 'A gentileza inicial contagia o ambiente e estabelece um clima escolar sereno e acolhedor logo nas primeiras horas do dia.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    referencia: 'Clima Escolar e Aprendizagem (UNESCO)'
  },
  {
    id: 'facil_055',
    pergunta: 'Por que o preconceito contra a aparência de alguém é considerado irracional e injusto?',
    contexto: 'Zombarias sobre o formato do nariz ou o tipo de cabelo de um estudante.',
    opcoes: [
      'Porque a beleza e os traços físicos são diversos, e o valor de um ser humano reside no seu caráter, atitudes e dignidade moral.',
      'Porque cabelos cacheados são proibidos em fotos de documentos oficiais.',
      'Porque a lei só permite fazer piadas sobre a cor dos olhos das pessoas.',
      'Porque todo mundo vai ficar exatamente igual quando chegar à fase adulta.'
    ],
    correta: 0,
    explicacao: 'Padrões estéticos opressores geram exclusão desumana. A valorização da pluralidade física e étnica é pilar da cidadania.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Estatuto da Igualdade Racial (Lei nº 12.288/2010)'
  },
  {
    id: 'facil_056',
    pergunta: 'Qual o dever do estudante ao usar as redes sociais oficiais ou grupos de estudo da escola?',
    contexto: 'Comentários em uma postagem do Instagram da escola sobre a Feira de Ciências.',
    opcoes: [
      'Escrever mensagens construtivas, elogiar o empenho dos colegas e não fazer comentários depreciativos ou difamatórios.',
      'Aproveitar o espaço para postar ofensas contra o time de futebol rival.',
      'Cobrar dinheiro dos seguidores para curtir as fotos da feira.',
      'Bloquear todos os professores para que não vejam as publicações da escola.'
    ],
    correta: 0,
    explicacao: 'Espaços institucionais exigem postura compatível com a comunidade educativa, promovendo o protagonismo e o orgulho das conquistas coletivas.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Termos de Uso e Convivência em Redes Educativas'
  },
  {
    id: 'facil_057',
    pergunta: 'Quando um aluno empresta um lápis ou livro e o devolve quebrado sem pedir desculpas, qual valor é desrespeitado?',
    contexto: 'Fim da aula de geometria.',
    opcoes: [
      'O cuidado com a confiança alheia e a responsabilidade com o bem que lhe foi cedido generosamente.',
      'Apenas o tempo de validade dos materiais plásticos.',
      'O direito de propriedade dos comerciantes da papelaria da cidade.',
      'Nenhum valor, pois materiais escolares são descartáveis por definição.'
    ],
    correta: 0,
    explicacao: 'Zelar pelo bem emprestado demonstra gratidão e reciprocidade, fortalecendo a amizade e a confiança entre os colegas.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    referencia: 'Valores Morais na Educação Infantil e Fundamental'
  },
  {
    id: 'facil_058',
    pergunta: 'O que caracteriza a prática do "body shaming" (humilhação corporal) no ambiente escolar?',
    contexto: 'Comentários ofensivos na aula de natação ou ginástica.',
    opcoes: [
      'Julgar, constranger ou fazer piadas cruéis sobre o corpo, peso, altura ou formato físico de outra pessoa.',
      'Incentivar a prática de exercícios físicos regulares orientados por profissionais.',
      'Comer alimentos saudáveis durante o intervalo do almoço escolar.',
      'Usar roupas adequadas para a prática esportiva na quadra da escola.'
    ],
    correta: 0,
    explicacao: 'O escárnio sobre o corpo alheio é uma das principais raízes de transtornos alimentares e ansiedade na juventude.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'bullying',
    referencia: 'Campanha Nacional de Autoestima e Prevenção ao Bullying'
  },
  {
    id: 'facil_059',
    pergunta: 'Por que o respeito mútuo entre estudantes de diferentes gêneros é essencial para a escola?',
    contexto: 'Divisão de brinquedos e espaços na quadra de esportes no intervalo.',
    opcoes: [
      'Garante que meninos e meninas convivam em pé de igualdade, sem preconceitos, violências verbais ou submissões forçadas.',
      'Porque a lei determina que meninos e meninas não podem frequentar a mesma calçada.',
      'Porque as meninas só podem praticar esportes teóricos dentro da biblioteca.',
      'Porque os meninos não podem conversar com alunas durante o período de provas.'
    ],
    correta: 0,
    explicacao: 'A igualdade de gênero nas relações escolares educa para o respeito, a não-violência e a convivência paritária no futuro.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'direitos',
    referencia: 'Constituição Federal de 1988, Art. 5º, I'
  },
  {
    id: 'facil_060',
    pergunta: 'Se você perceber que um colega novo tem vergonha de falar porque não conhece ninguém, como agir?',
    contexto: 'Primeira semana do semestre letivo.',
    opcoes: [
      'Apresentar-se com gentileza, apresentá-lo aos outros amigos da sala e convidá-lo para lanchar junto.',
      'Ignorá-lo até que ele consiga se enturmar sozinho após alguns meses.',
      'Dizer que a turma já está cheia e que ele deve procurar amigos em outro andar.',
      'Pedir dinheiro para deixar ele sentar perto do seu grupo.'
    ],
    correta: 0,
    explicacao: 'A acolhida calorosa no início do ano transforma a adaptação escolar e previne que o novato se torne alvo de isolamento.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Guia do Acolhimento Estudantil EEMTI'
  },
  {
    id: 'facil_061',
    pergunta: 'O que é a "cultura do cancelamento" entre colegas de turma nas redes sociais?',
    contexto: 'Um aluno comete um erro bobo e todos decidem bloquear suas contas e atacá-lo em massa.',
    opcoes: [
      'O linchamento virtual coletivo que busca humilhar e banir alguém sem lhe dar chance de diálogo, reflexão ou reparação.',
      'Um recurso técnico do aplicativo para economizar armazenamento de fotos.',
      'Uma brincadeira saudável aprovada pelo conselho escolar.',
      'A exclusão automática de perfis que não publicam vídeos novos.'
    ],
    correta: 0,
    explicacao: 'O cancelamento impede a aprendizagem restaurativa e transforma pequenos equívocos em condenações desproporcionais e cruéis.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'SaferNet Brasil - Guia Contra o Ódio e Assédio Virtual'
  },
  {
    id: 'facil_062',
    pergunta: 'Por que o silêncio diante de uma agressão covarde pode ser interpretado como cumplicidade?',
    contexto: 'Um estudante derruba o lanche de outro na frente de dez colegas que fingem não ver.',
    opcoes: [
      'Porque não se posicionar contra a injustiça acaba permitindo que ela continue ocorrendo impunemente.',
      'Porque o silêncio faz os inspetores darem nota zero para toda a sala.',
      'Porque todo estudante é obrigado a ser policial dos colegas o tempo todo.',
      'Porque a lei proíbe ficar quieto por mais de cinco minutos no recreio.'
    ],
    correta: 0,
    explicacao: 'Como dizia Martin Luther King: "O que me preocupa não é o grito dos maus, mas o silêncio dos bons." A neutralidade protege o opressor.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Ética e Cidadania em Tempos de Intolerância'
  },
  {
    id: 'facil_063',
    pergunta: 'O que fazer ao ver um colega tendo uma crise de ansiedade com respiração ofegante na hora da prova?',
    contexto: 'Início da avaliação diagnóstica bimestral.',
    opcoes: [
      'Avisar discretamente o professor com gentileza, oferecer água e encorajá-lo a respirar devagar sem julgamentos.',
      'Rir e dizer que ele está inventando desculpas porque não estudou a matéria.',
      'Gritar para que toda a escola venha ver o que está acontecendo.',
      'Ficar bravo porque o barulho da respiração está atrapalhando a sua concentração.'
    ],
    correta: 0,
    explicacao: 'Crises de ansiedade exigem empatia, suporte calmo e apoio do educador para acolhimento imediato do aluno.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Protocolo de Acolhimento em Crises Emocionais nas Escolas'
  },
  {
    id: 'facil_064',
    pergunta: 'Qual é o verdadeiro significado de "ganhar com humildade e perder com dignidade" nos jogos escolares?',
    contexto: 'Final do campeonato interclasses de futsal da escola.',
    opcoes: [
      'Celebrar a vitória sem tripudiar nem humilhar o adversário, e reconhecer o esforço do oponente na derrota.',
      'Zombar do time derrotado nas redes sociais por semanas seguidas.',
      'Iniciar uma briga generalizada na quadra sempre que seu time perder.',
      'Exigir que o time adversário peça desculpas por ter feito gols.'
    ],
    correta: 0,
    explicacao: 'O espírito esportivo (fair play) honra a convivência: o adversário é parceiro de jogo, não um inimigo a ser aniquilado moralmente.',
    dificuldade: 'facil',
    categoria: 'convivencia',
    competencia: 'convivencia',
    referencia: 'Carta do Fair Play e Educação Esportiva'
  },
  {
    id: 'facil_065',
    pergunta: 'Por que o respeito aos profissionais da limpeza, merenda e portaria é essencial para a escola?',
    contexto: 'Fim do recreio e o pátio está cheio de papéis e copos no chão.',
    opcoes: [
      'Porque todos os trabalhadores são fundamentais para o funcionamento da escola e merecem reconhecimento, gratidão e consideração.',
      'Apenas para não levar advertência no boletim no final do ano.',
      'Porque eles são responsáveis por colocar as notas finais no sistema escolar.',
      'Porque a lei só obriga a respeitar quem trabalha com jaleco branco.'
    ],
    correta: 0,
    explicacao: 'A dignidade do trabalho não tem hierarquia. Cuidar do lixo e ser cortês com a equipe de apoio demonstra nobreza de caráter.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Estatuto dos Servidores Públicos da Educação'
  },
  {
    id: 'facil_066',
    pergunta: 'O que é a "pegada digital" que deixamos na internet quando comentamos algo ofensivo?',
    contexto: 'Debate sobre permanência de dados e segurança na rede.',
    opcoes: [
      'O rastro permanente de dados e históricos que permanecem gravados nos servidores, mesmo após a exclusão aparente da postagem.',
      'O desenho do dedo indicador que usamos para rolar a tela do celular.',
      'A marca de gordura que fica na película do aparelho telefônico.',
      'O número de jogos instalados na memória interna do aparelho.'
    ],
    correta: 0,
    explicacao: 'Tudo o que se posta deixa registros técnicos que podem ser recuperados judicialmente, desmistificando a ilusão de impunidade na internet.',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Cidadania na Rede (Cartilha SaferNet Brasil)'
  },
  {
    id: 'facil_067',
    pergunta: 'Se um colega esquecer a mochila aberta e os pertences caírem no chão, como demonstrar presteza?',
    contexto: 'Saída tumultuada do turno matutino no portão.',
    opcoes: [
      'Abaixar-se imediatamente para ajudá-lo a recolher os lápis e cadernos com cuidado e devolver com simpatia.',
      'Chutar os cadernos para longe e rir da distração do colega.',
      'Pegar o dinheiro do lanche dele que caiu e guardar no bolso sem falar nada.',
      'Fotografar a bagunça para mandar no grupo de memes da escola.'
    ],
    correta: 0,
    explicacao: 'Pequenos gestos de auxílio espontâneo constroem a confiança e o sentimento comunitário que blindam a escola contra o individualismo.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Educação para a Cidadania e Solidariedade'
  },
  {
    id: 'facil_068',
    pergunta: 'O que significa respeitar o "espaço pessoal" e os limites corporais do outro na escola?',
    contexto: 'Brincadeiras de empurrão ou toques não consentidos na fila da cantina.',
    opcoes: [
      'Compreender que o corpo de cada pessoa é sagrado e ninguém deve ser tocado, empurrado ou invadido sem autorização expressa.',
      'Proibir que qualquer aluno ande a menos de dez metros de distância de outro.',
      'Exigir que todos fiquem sentados sem se mexer durante o horário de recreio.',
      'Permitir toques indesejados desde que a pessoa esteja rindo na hora.'
    ],
    correta: 0,
    explicacao: 'O consentimento corporal é inegociável. Toques indesejados violam a integridade física e podem configurar importunação.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Prevenção ao Assédio e Importunação (ECA, Art. 17)'
  },
  {
    id: 'facil_069',
    pergunta: 'Por que a diversidade de opiniões e ideias torna a sala de aula mais rica e inteligente?',
    contexto: 'Debate de História sobre diferentes perspectivas de um acontecimento do passado.',
    opcoes: [
      'Porque diferentes vivências trazem novos pontos de vista, estimulam o pensamento crítico e ampliam a compreensão do mundo.',
      'Porque se todos pensarem igual, as provas não precisam ter gabarito oficial.',
      'Porque apenas as opiniões de quem fala mais alto devem ser registradas no caderno.',
      'Porque quem discorda da maioria deve ser reprovado sumariamente pelo conselho.'
    ],
    correta: 0,
    explicacao: 'A pluralidade de ideias é o motor do conhecimento científico e da democracia. Pensar diferente não é ser inimigo.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Paulo Freire - Pedagogia da Autonomia'
  },
  {
    id: 'facil_070',
    pergunta: 'Quando você comete um equívoco e magoa alguém sem querer, qual é a atitude mais madura?',
    contexto: 'Você fez uma brincadeira inocente sobre um chapéu, mas o colega usava para cobrir um machucado.',
    opcoes: [
      'Procurar o colega imediatamente, pedir desculpas com sinceridade e explicar que não sabia do motivo do uso.',
      'Dizer que ele é mimado e que não tem senso de humor nenhum.',
      'Contar a história para todo mundo para fazer piada do machucado dele.',
      'Ficar de mal dele porque ele ficou chateado com o seu comentário.'
    ],
    correta: 0,
    explicacao: 'Reconhecer que machucou o outro, mesmo sem intenção maldosa, demonstra responsabilidade afetiva e sensibilidade moral.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Maturidade Socioemocional na Adolescência'
  },
  {
    id: 'facil_071',
    pergunta: 'O que define o compromisso individual com um ambiente escolar livre de bullying?',
    contexto: 'Pacto de convivência pacífica assinado pelos estudantes no início do ano.',
    opcoes: [
      'Decidir conscientemente não agredir, não ser cúmplice do riso opressor, acolher os excluídos e apoiar canais de mediação.',
      'Apenas prometer que não vai bater em ninguém quando o diretor estiver olhando.',
      'Ficar responsável por vigiar a vida íntima de todos os colegas nas redes sociais.',
      'Achar que o bullying é problema exclusivo do governo e cruzar os braços.'
    ],
    correta: 0,
    explicacao: 'A paz não é um decreto externo; ela é construída nas micro-decisões diárias de cada membro da comunidade escolar.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'respeito',
    referencia: 'Pacto Nacional pela Convivência Ética (MEC)'
  },
  {
    id: 'facil_072',
    pergunta: 'Se um colega esquecer o dinheiro do lanche e estiver com fome no recreio, como um amigo pode agir?',
    contexto: 'Fila da cantina no intervalo matutino.',
    opcoes: [
      'Dividir o próprio lanche com generosidade ou avisar um educador da escola para verificar o acesso à merenda comunitária.',
      'Comer o lanche na frente dele fazendo zombarias sobre a fome dele.',
      'Exigir que ele faça seus deveres de casa em troca de uma mordida no sanduíche.',
      'Dizer que quem não tem dinheiro não deve frequentar o recreio.'
    ],
    correta: 0,
    explicacao: 'A solidariedade na partilha do alimento é uma das demonstrações mais antigas e nobres de humanidade e fraternidade.',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Solidariedade Comunitária Escolar'
  },
  {
    id: 'facil_073',
    pergunta: 'Por que o diálogo paciente é mais eficaz para resolver desentendimentos do que a agressão física?',
    contexto: 'Empurrão involuntário na saída da sala de aula.',
    opcoes: [
      'Porque a violência só gera mais rancor, suspensões e revanches, enquanto a conversa esclarece os fatos e sela a paz.',
      'Porque quem conversa primeiro ganha pontos adicionais na prova de ciências.',
      'Porque a lei proíbe falar em voz alta em qualquer lugar do estado.',
      'Porque agredir fisicamente só é permitido se for no horário da saída fora do portão.'
    ],
    correta: 0,
    explicacao: 'A violência é uma falsa solução que multiplica os conflitos. O diálogo civilizado desfaz mal-entendidos na raiz.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Resolução Pacífica de Disputas (UNESCO)'
  },
  {
    id: 'facil_074',
    pergunta: 'O que o recurso do "Botão SOS" do StopBullying proporciona para um estudante em situação de desespero?',
    contexto: 'Um aluno sofre ameaça física iminente no banheiro da escola.',
    opcoes: [
      'Acesso imediato e emergencial a contatos de proteção, acolhimento e canais urgentes de segurança pública e escolar.',
      'A gravação de vídeos divertidos para o TikTok do estudante.',
      'O cancelamento automático de todas as provas do mês daquele aluno.',
      'A transferência imediata do aluno para outra escola particular.'
    ],
    correta: 0,
    explicacao: 'O Botão SOS conecta rapidamente a vítima com redes de acolhimento (Disque 100, Conselho Tutelar, Equipe Escolar) em momentos críticos.',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'Rede de Proteção à Criança e ao Adolescente'
  },
  {
    id: 'facil_075',
    pergunta: 'Qual mensagem resume a missão fundamental do projeto StopBullying?',
    contexto: 'Encerramento da jornada formativa na Central de Respeito.',
    opcoes: [
      'Garantir que cada estudante possa aprender, conviver e expressar sua identidade em um ambiente seguro, acolhedor e com sigilo protegido.',
      'Transformar todos os estudantes em policiais que vigiam os colegas 24 horas por dia.',
      'Proibir qualquer conversa ou risada nos corredores da escola.',
      'Substituir os professores por inteligências artificiais com câmeras de vigilância.'
    ],
    correta: 0,
    explicacao: 'O StopBullying é um escudo coletivo: protege a dignidade de cada aluno, oferece canais seguros de acolhimento e promove a cultura de paz duradoura.',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Projeto Pedagógico Sentinela / StopBullying - EEMTI Alfredo Machado'
  }
];




export const FACIL_QUIZZES: QuizItem[] = [
  {
    id: 'quiz_facil_01',
    titulo: 'O Limite da Brincadeira Sadia',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    enunciado: 'Qual critério fundamental distingue uma brincadeira divertida entre colegas de uma conduta caracterizada como bullying?',
    contexto: 'Durante o recreio no pátio da escola, surgem divergências sobre apelidos atribuídos a um colega.',
    opcoes: [
      'A brincadeira gera alegria compartilhada e para imediatamente se alguém se sentir mal; o bullying é repetitivo, unilateral e intencionalmente humilhante.',
      'A brincadeira só acontece fora dos muros escolares, enquanto o bullying ocorre estritamente dentro da sala de aula.',
      'Não existe distinção prática, pois todo desentendimento verbal entre estudantes configura bullying legalmente.',
      'A brincadeira só envolve estudantes de uma mesma sala de aula, enquanto o bullying sempre envolve turmas distintas.'
    ],
    correta: 0,
    explicacao: 'O elemento essencial da convivência saudável é a reciprocidade e o consentimento. Se a ação causa sofrimento a uma das partes, não há brincadeira, mas sim agressão.',
    justificativaIncorretas: [
      'A localização física não define o ato; brincadeiras e bullying podem ocorrer em qualquer espaço físico ou virtual.',
      'Conflitos pontuais e discordâncias naturais do desenvolvimento não são automaticamente bullying; é preciso haver reiteração e assimetria de poder.',
      'O vínculo de turma não determina a prática; agressões podem ocorrer entre colegas da mesma sala ou de séries diferentes.'
    ],
    referencia: 'Lei Federal nº 13.185/2015, Art. 1º, § 1º',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['primeiro_passo_sabedoria']
  },
  {
    id: 'quiz_facil_02',
    titulo: 'A Atitude Ética da Testemunha',
    dificuldade: 'facil',
    categoria: 'espectador',
    competencia: 'respeito',
    enunciado: 'Ao presenciar um colega sendo ridicularizado na sala de aula enquanto outros riem, qual é a atitude mais segura e construtiva a ser adotada?',
    contexto: 'Um estudante derruba seus materiais no chão e um pequeno grupo começa a zombar dele.',
    opcoes: [
      'Não participar dos risos, ajudar o colega a recolher os pertences e avisar a coordenação ou um professor de forma discreta.',
      'Rir junto com o grupo para evitar se tornar o próximo alvo de piadas.',
      'Filmar a situação com a câmera do celular para publicar nas redes sociais com críticas.',
      'Enfrentar os agressores fisicamente no mesmo instante para provar lealdade.'
    ],
    correta: 0,
    explicacao: 'A testemunha empática quebra o ciclo de validação do agressor ao não rir, acolhe a vítima com um gesto solidário e recorre aos canais de apoio sem se colocar em risco físico.',
    justificativaIncorretas: [
      'Rir com o agressor reforça o comportamento hostil e faz com que a testemunha atue como espectadora reforçadora da violência.',
      'Filmar e publicar nas redes amplifica a humilhação da vítima e dissemina o dano digitalmente.',
      'Reagir com violência física agrava o conflito e viola os princípios de pacificação e convivência escolar.'
    ],
    referencia: 'Programa de Combate à Intimidação Sistemática (MEC)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_facil_03',
    titulo: 'Cyberbullying e Rastro Digital',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    enunciado: 'Criar uma página falsa ou grupo de mensagens para ridicularizar a imagem ou o comportamento de um colega é considerado:',
    contexto: 'Circulação de memes e fotos constrangedoras em aplicativo de mensagens entre alunos.',
    opcoes: [
      'Cyberbullying, uma forma grave de intimidação sistemática praticada em ambiente digital com efeitos psicológicos reais.',
      'Exercício legítimo de anonimato garantido pela Constituição Federal.',
      'Humor inofensivo de internet que não gera qualquer responsabilidade aos criadores.',
      'Mero desentendimento privado que não diz respeito à escola ou à família.'
    ],
    correta: 0,
    explicacao: 'O cyberbullying utiliza redes e aplicativos para perseguir e humilhar. A Lei nº 14.811/2024 incluiu essa conduta no Código Penal com penas severas, reforçando que o mundo virtual gera danos reais.',
    justificativaIncorretas: [
      'A Constituição proíbe expressamente o anonimato na manifestação do pensamento (Art. 5º, IV).',
      'Difamar e humilhar pessoas na internet não é humor; constitui ato ilícito e viola a dignidade humana.',
      'A escola e os responsáveis têm dever compartilhado de orientar e agir contra a violência digital que impacta os estudantes.'
    ],
    referencia: 'Código Penal Brasileiro, Art. 146-A, Parágrafo Único',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_facil_04',
    titulo: 'Empatia na Convivência Escolar',
    dificuldade: 'facil',
    categoria: 'empatia',
    competencia: 'respeito',
    enunciado: 'O que significa demonstrar empatia ativa em relação a um colega recém-chegado à escola?',
    contexto: 'Um novo estudante chega no meio do semestre e parece tímido e isolado durante o almoço.',
    opcoes: [
      'Colocar-se no lugar do colega, compreender suas possíveis inseguranças e convidá-lo a sentar-se junto e conhecer o espaço.',
      'Ignorar o colega até que ele tome a iniciativa de falar com todas as pessoas da turma.',
      'Fazer perguntas constrangedoras diante de todos para testar se ele tem senso de humor.',
      'Exigir que ele passe por trotes para ser aceito no grupo dos veteranos.'
    ],
    correta: 0,
    explicacao: 'Empatia ativa é a capacidade de reconhecer o sentimento alheio e agir para acolher, reduzindo barreiras de isolamento e promovendo pertencimento.',
    justificativaIncorretas: [
      'A indiferença aumenta o sentimento de desamparo de quem está em um ambiente novo e desconhecido.',
      'Constranger alguém publicamente gera ansiedade e constrói um clima de desconfiança.',
      'Trotes e testes humilhantes configuram intimidação e são incompatíveis com o ambiente pedagógico.'
    ],
    referencia: 'Diretrizes Curriculares Nacionais para a Educação em Direitos Humanos',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_facil_05',
    titulo: 'O Que Não Fazer no Cyberbullying',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    enunciado: 'Ao receber uma foto ou vídeo constrangedor de um colega da escola em um grupo de WhatsApp, qual é a atitude correta?',
    contexto: 'Uma imagem capturada sem autorização começa a circular em grupos de conversa.',
    opcoes: [
      'Não repassar a mensagem adiante, avisar que a conduta é errada e apoiar a pessoa ofendida a procurar ajuda.',
      'Encaminhar para outros grupos apenas para avisar que a imagem está rodando na internet.',
      'Salvar a foto na galeria para usar em discussões futuras com o colega.',
      'Fazer comentários irônicos na postagem para ganhar curtidas e popularidade.'
    ],
    correta: 0,
    explicacao: 'Interromper a corrente de compartilhamento é o ato mais eficaz para conter o cyberbullying. Quem compartilha é corresponsável pela propagação da agressão.',
    justificativaIncorretas: [
      'Reencaminhar para alertar produz o mesmo efeito danoso de aumentar o alcance do material vexatório.',
      'Armazenar conteúdo ofensivo para chantagear ou pressionar viola normas legais e éticas.',
      'Interagir com piadas valida a violência e estimula mais comentários depreciativos.'
    ],
    referencia: 'Marco Civil da Internet (Lei nº 12.965/2014)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_facil_06',
    titulo: 'Bullying Material e Patrimonial',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    enunciado: 'Qual das seguintes situações caracteriza a tipologia de bullying material ou patrimonial?',
    contexto: 'Ações reiteradas contra os pertences de um mesmo estudante.',
    opcoes: [
      'Esconder repetidamente a mochila, rasgar cadernos ou quebrar intencionalmente materiais escolares de um colega.',
      'Pedir um lápis emprestado durante a aula de redação e esquecer de devolver no mesmo dia.',
      'Trocar de lugar na sala de aula após autorização expressa do professor.',
      'Vender rifas para arrecadação de fundos da formatura do 3º Ano.'
    ],
    correta: 0,
    explicacao: 'O bullying material envolve a deterioração deliberada, furto velado ou destruição reiterada de bens da vítima como forma de intimidação e controle.',
    justificativaIncorretas: [
      'Um esquecimento pontual de material emprestado é um descuido comum, desprovido de intencionalidade hostil ou repetição agressiva.',
      'A troca de carteiras com consentimento docente é uma dinâmica normal de organização da sala.',
      'Atividades cooperativas para formatura não têm qualquer relação com hostilidade patrimonial.'
    ],
    referencia: 'Lei nº 13.185/2015, Art. 2º, Inciso IV (Bullying Material)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_facil_07',
    titulo: 'O Papel dos Canais Anônimos',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'direitos',
    enunciado: 'Por que canais de denúncia anônima como o StopBullying são essenciais no ambiente escolar?',
    contexto: 'Muitos estudantes temem represálias caso seus nomes sejam revelados ao relatar agressões.',
    opcoes: [
      'Permitem que vítimas e testemunhas peçam ajuda sem medo de perseguição ou retaliação, viabilizando a intervenção pedagógica.',
      'Servem para acusar professores sem apresentar qualquer elemento factual ou coerente.',
      'Substituem as reuniões de pais e conselhos tutelares em decisões financeiras da escola.',
      'Permitem a divulgação pública dos nomes dos envolvidos em murais escolares.'
    ],
    correta: 0,
    explicacao: 'O sigilo encoraja relatos precoces de situações que costumam ocorrer longe dos olhos dos adultos, quebrando o pacto de silêncio que protege agressores.',
    justificativaIncorretas: [
      'Canais éticos exigem responsabilidade e não servem como veículo de difamação indiscriminada.',
      'A ferramenta visa mediação e acolhimento escolar, não matérias financeiras ou administrativas da gestão.',
      'O sistema preserva sigilo absoluto e nunca publica dados em murais abertos.'
    ],
    referencia: 'Plano Nacional de Educação em Direitos Humanos',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['escudo_inabalavel']
  },
  {
    id: 'quiz_facil_08',
    titulo: 'Bullying Verbal e Apelidos Pejorativos',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'bullying',
    enunciado: 'Quando um apelido colocado por colegas passa a ser configurado como intimidação verbal prejudicial?',
    contexto: 'Discussão sobre apelidos que causam constrangimento durante as aulas.',
    opcoes: [
      'Quando o apelido ridiculariza características físicas ou pessoais, a pessoa pede para parar e a insistência continua gerando sofrimento.',
      'Apenas se o apelido for pronunciado em voz alta diante do diretor da escola.',
      'Somente quando o apelido for escrito no quadro-negro com caneta permanente.',
      'Apenas se o apelido tiver mais de cinco sílabas de acordo com a gramática.'
    ],
    correta: 0,
    explicacao: 'O critério determinante é o sofrimento da pessoa e a ausência de consentimento. Se o apelido humilha e é mantido contra a vontade da vítima, configura agressão verbal.',
    justificativaIncorretas: [
      'A presença de autoridades escolares não é requisito para configurar a agressão.',
      'O meio de transmissão (falado, escrito ou virtual) não atenua a gravidade do insulto.',
      'A extensão vocabular ou métrica da palavra é irrelevante para a análise do impacto emocional.'
    ],
    referencia: 'Lei nº 13.185/2015, Art. 2º, Inciso I (Bullying Verbal)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_facil_09',
    titulo: 'Exclusão Social como Forma de Agressão',
    dificuldade: 'facil',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    enunciado: 'Combinar com toda a turma para ninguém falar com determinado aluno ou não sentar perto dele é chamado de:',
    contexto: 'Um estudante chega à sala e percebe que todos os grupos o ignoram deliberadamente.',
    opcoes: [
      'Bullying social ou relacional, uma forma de isolamento intencional que busca anular a convivência do indivíduo.',
      'Organização democrática espontânea da turma com a qual a escola não pode interferir.',
      'Direito irrestrito de cada estudante escolher seus amigos sem nenhuma consideração comunitária.',
      'Prática pedagógica incentivada para desenvolver independência no estudante isolado.'
    ],
    correta: 0,
    explicacao: 'O isolamento orquestrado e a ostracização são táticas de violência psicológica e social tão devastadoras quanto a agressão física, pois atacam a necessidade básica de pertencimento.',
    justificativaIncorretas: [
      'Ação combinada para boicotar alguém não é democracia; é violência coletiva contra a dignidade.',
      'Ter afinidades é natural, mas articular a rejeição organizada de um colega é intimidação sistemática.',
      'A escola deve cultivar cooperação e fraternidade, nunca o abandono de estudantes.'
    ],
    referencia: 'Lei nº 13.185/2015, Art. 2º, Inciso III (Bullying Social)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_facil_10',
    titulo: 'O Que Fazer se For Vítima',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'respeito',
    enunciado: 'Se você estiver sofrendo intimidações repetidas na escola, qual é a recomendação mais importante?',
    contexto: 'Um aluno sofre humilhações diárias no caminho para o refeitório.',
    opcoes: [
      'Não se calar: procurar pessoas de confiança (professores, coordenação, responsáveis) e registrar o ocorrido em canais seguros.',
      'Guardar o sofrimento em silêncio absoluto para não parecer fraco perante os outros.',
      'Acreditar que você é o culpado pelas agressões recebidas e aceitar a situação.',
      'Abandonar imediatamente a escola sem contar os motivos a nenhum adulto.'
    ],
    correta: 0,
    explicacao: 'A culpa pela violência NUNCA é da vítima. Romper o silêncio e pedir apoio é o primeiro passo para cessar as agressões e acionar a rede de acolhimento.',
    justificativaIncorretas: [
      'O silêncio prolongado perpetua a impunidade do agressor e agrava os danos à saúde emocional da vítima.',
      'A vítima jamais é culpada pela conduta abusiva alheia; a responsabilidade é de quem agride.',
      'Evasão escolar prejudica o futuro do jovem e não soluciona a raiz do comportamento agressivo.'
    ],
    referencia: 'Estatuto da Criança e do Adolescente (Lei nº 8.069/1990), Art. 18',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['escudo_inabalavel']
  },
  {
    id: 'quiz_facil_11',
    titulo: 'Respeito à Diversidade e Convivência',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    enunciado: 'Zombar de um estudante por causa de seu sotaque, sua origem regional ou sua cultura familiar viola qual princípio fundamental?',
    contexto: 'Um aluno vindo de outro estado é imitado de forma pejorativa durante as aulas.',
    opcoes: [
      'O princípio da dignidade da pessoa humana e o respeito à pluralidade cultural presentes na Constituição Brasileira.',
      'Apenas o regulamento da biblioteca municipal da cidade.',
      'Regras internacionais de comércio exterior.',
      'Nenhum princípio, já que imitações são expressões artísticas sempre permitidas.'
    ],
    correta: 0,
    explicacao: 'O Brasil é um país plural. O Art. 3º, IV da Constituição estabelece como objetivo fundamental promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade ou quaisquer outras formas de discriminação.',
    justificativaIncorretas: [
      'A proteção à dignidade decorre da Carta Magna federal, não apenas de regulamentos locais de bibliotecas.',
      'Matérias de comércio internacional não tratam de convivência e direitos fundamentais nas escolas.',
      'A liberdade de expressão não autoriza discursos depreciativos e discriminatórios.'
    ],
    referencia: 'Constituição Federal de 1988, Art. 3º, IV e Art. 5º',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_facil_12',
    titulo: 'Diferença Entre Conflito e Bullying',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    enunciado: 'Dois amigos que nunca haviam brigado discutem acaloradamente sobre o resultado de um jogo esportivo e depois se reconciliam. Isso é:',
    contexto: 'Fim de partida no campeonato interclasses da escola.',
    opcoes: [
      'Um conflito pontual comum nas relações humanas, diferente do bullying, pois não há repetição deliberada nem desequilíbrio de forças crônico.',
      'Bullying gravíssimo que exige suspensão imediata de ambos por um ano letivo.',
      'Crime de responsabilidade contra a segurança nacional.',
      'Indício conclusivo de que nenhum dos dois pode mais praticar esportes.'
    ],
    correta: 0,
    explicacao: 'Conflitos fazem parte da vida e podem ser resolvidos pelo diálogo. O bullying, por outro lado, envolve sistematicidade, intencionalidade de causar dano e relação assimétrica de poder.',
    justificativaIncorretas: [
      'Discutir uma jogada esportiva pontual não configura intimidação sistemática reiterada.',
      'Enquadrar desentendimentos esportivos comuns como crimes de segurança nacional é um erro conceitual grave.',
      'Práticas esportivas ensinam cooperação e resiliência, e o conflito pontual deve ser mediado educativamente.'
    ],
    referencia: 'Cartilha Bullying Não é Brincadeira (Conselho Nacional de Justiça - CNJ)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['primeiro_passo_sabedoria']
  },
  {
    id: 'quiz_facil_13',
    titulo: 'A Função da Mediação de Conflitos',
    dificuldade: 'facil',
    categoria: 'mediacao',
    competencia: 'convivencia',
    enunciado: 'Qual é o objetivo principal de uma comissão de mediação escolar ao intervir em um atrito entre alunos?',
    contexto: 'Dois estudantes são convidados a conversar com a equipe pedagógica sobre um mal-entendido.',
    opcoes: [
      'Ouvir ambas as partes com respeito, identificar as causas da divergência e construir acordos consensuais de convivência pacífica.',
      'Humilhar publicamente os estudantes diante do pátio para que sirvam de exemplo.',
      'Decidir qual aluno deve pagar uma multa em dinheiro para a escola.',
      'Excluir sumariamente os estudantes sem dar a eles o direito de explicar o que aconteceu.'
    ],
    correta: 0,
    explicacao: 'A mediação pedagógica busca a restauração dos laços sociais e a reflexão ética, ensinando os jovens a resolver divergências pelo diálogo construtivo.',
    justificativaIncorretas: [
      'Exposição pública humilhante viola os direitos da criança e do adolescente e gera mais rancor.',
      'A escola pública não aplica multas financeiras a estudantes por desentendimentos de convivência.',
      'O direito à ampla defesa e ao contraditório é garantia fundamental prevista no ECA e na CF/88.'
    ],
    referencia: 'Programa de Mediação Escolar e Justiça Restaurativa (SEDUC/CE)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_facil_14',
    titulo: 'Vazamento de Imagens Íntimas',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'direitos',
    enunciado: 'Divulgar ou repassar fotos íntimas de um colega sem sua autorização expressa constitui:',
    contexto: 'Imagens pessoais de um estudante são enviadas em grupos escolares sem seu consentimento.',
    opcoes: [
      'Crime grave com previsão expressa no Estatuto da Criança e do Adolescente e no Código Penal, passível de punição legal aos envolvidos.',
      'Uma brincadeira de internet sem relevância penal para estudantes menores de 18 anos.',
      'Direito garantido aos administradores de grupos de redes sociais.',
      'Fato sem importância se a imagem for apagada da conversa cinco minutos depois.'
    ],
    correta: 0,
    explicacao: 'O compartilhamento não autorizado de registros íntimos viola o direito à privacidade e à dignidade sexual. Para menores, constitui ato infracional grave tipificado no ECA (Art. 241-A).',
    justificativaIncorretas: [
      'Adolescentes respondem por atos infracionais e podem cumprir medidas socioeducativas.',
      'Nenhum administrador de grupo tem direito de cometer ou permitir crimes digitais em suas páginas.',
      'Apagar a mensagem não anula a ilicitude do ato nem elimina o dano já causado à vítima.'
    ],
    referencia: 'Estatuto da Criança e do Adolescente, Art. 241-A e Código Penal, Art. 218-C',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_facil_15',
    titulo: 'Impactos Psicológicos do Bullying',
    dificuldade: 'facil',
    categoria: 'consequencias',
    competencia: 'bullying',
    enunciado: 'Quais são as consequências mais comuns sofridas por quem passa por bullying sistemático?',
    contexto: 'Acompanhamento do rendimento e bem-estar de estudantes que sofrem intimidações reiteradas.',
    opcoes: [
      'Queda no rendimento escolar, isolamento social, ansiedade, medo de ir à escola e perda da autoestima.',
      'Aumento imediato da popularidade e melhora nas notas de todas as matérias.',
      'Maior facilidade para fazer novos amigos e liderar equipes de esportes.',
      'Nenhum efeito, pois ofensas verbais nunca afetam a saúde psicológica de ninguém.'
    ],
    correta: 0,
    explicacao: 'A intimidação sistemática corrói o bem-estar mental do estudante, provocando sintomas físicos (como dores de cabeça e estômago) e sofrimento emocional duradouro.',
    justificativaIncorretas: [
      'O estresse contínuo prejudica a concentração e resulta comumente em declínio no desempenho acadêmico.',
      'O medo de novas agressões retrai a pessoa e dificulta sua sociabilidade espontânea.',
      'Palavras e atitudes humilhantes causam traumas reais documentados pela psicologia e neurociência.'
    ],
    referencia: 'Organização Mundial da Saúde (OMS) - Relatório sobre Violência e Saúde',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_facil_16',
    titulo: 'O Papel do Professor e da Equipe',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'respeito',
    enunciado: 'Como um educador deve agir ao perceber sinais de que um aluno está sendo intimidado ou excluído em sala?',
    contexto: 'Durante o trabalho em grupo, um estudante sempre sobra e recebe risadas irônicas ao tentar participar.',
    opcoes: [
      'Intervir prontamente, reorientar a dinâmica de forma inclusiva e acolher o estudante individualmente com discrição.',
      'Dizer em voz alta na frente de todos que o aluno excluído "precisa aprender a se defender sozinho".',
      'Fingir que não viu para não constranger os alunos que estão excluindo o colega.',
      'Mandar o aluno excluído para fora da sala para evitar problemas na aula.'
    ],
    correta: 0,
    explicacao: 'O professor tem o dever legal e pedagógico de garantir um ambiente seguro e acolhedor para todos, mediando as relações e não tolerando a exclusão.',
    justificativaIncorretas: [
      'Dizer que a vítima deve "se virar sozinha" desresponsabiliza o agressor e legitima a covardia do grupo.',
      'A omissão docente transmite a mensagem de que a violência é aceitável ou invisível.',
      'Punir quem já está sendo excluído com expulsão da aula agrava injustamente a vitimização.'
    ],
    referencia: 'Lei nº 13.185/2015, Art. 5º (Dever Institucional de Prevenção)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['escudo_inabalavel']
  },
  {
    id: 'quiz_facil_17',
    titulo: 'Uso Ético das Redes Sociais',
    dificuldade: 'facil',
    categoria: 'cyber',
    competencia: 'cyber',
    enunciado: 'Qual é a regra de ouro da cidadania digital antes de publicar um comentário sobre outra pessoa na internet?',
    contexto: 'Debate sobre etiqueta e respeito nas redes sociais e fóruns de estudantes.',
    opcoes: [
      'Refletir se aquilo fere a dignidade de alguém e se você teria a coragem e o respeito de dizer pessoalmente com empatia.',
      'Publicar o comentário o mais rápido possível para ser a primeira pessoa a engajar na discussão.',
      'Usar um perfil falso para que ninguém saiba quem foi o autor da mensagem ofensiva.',
      'Marcar o maior número de pessoas desconhecidas para viralizar o assunto a qualquer custo.'
    ],
    correta: 0,
    explicacao: 'A cidadania digital exige responsabilidade e reflexão antes do clique. Se a mensagem humilha ou degrada, ela não deve ser publicada.',
    justificativaIncorretas: [
      'A pressa por curtidas frequentemente induz a comportamentos precipitados e cruéis.',
      'Criar perfis falsos para ofender é covardia e ilícito penal rastreável pelas autoridades judiciais.',
      'Disseminar mensagens danosas para viralizar amplia o sofrimento da pessoa atingida.'
    ],
    referencia: 'Guia de Cidadania Digital da SaferNet Brasil',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_facil_18',
    titulo: 'Acolhimento Sem Julgamento',
    dificuldade: 'facil',
    categoria: 'empatia',
    competencia: 'respeito',
    enunciado: 'Quando um colega procura você para desabafar sobre agressões que vem sofrendo, qual é a postura mais solidária?',
    contexto: 'Um colega pede alguns minutos no intervalo para conversar sobre como se sente humilhado.',
    opcoes: [
      'Ouvir com atenção e carinho, validar seus sentimentos, não culpabilizá-lo e incentivá-lo a buscar a mediação da escola.',
      'Interromper a fala dizendo que "isso é frescura" e que "no passado era muito pior".',
      'Contar o segredo dele para toda a sala no intervalo seguinte para virar fofoca.',
      'Aconselhar o colega a comprar armas ou revidar agredindo os familiares dos agressores.'
    ],
    correta: 0,
    explicacao: 'A escuta empática e o acolhimento seguro oferecem um porto seguro para a pessoa agredida, encorajando-a a sair da solidão e buscar soluções institucionais.',
    justificativaIncorretas: [
      'Minimizar a dor do outro como "frescura" fecha o canal de confiança e aprofunda o sofrimento.',
      'Quebrar o sigilo e transformar o desabafo em fofoca constitui traição ética e nova violência.',
      'Estimular vingança violenta gera tragédias irreparáveis e não resolve a questão.'
    ],
    referencia: 'Cartilha de Apoio Emocional e Escuta Ativa (CVV / UNICEF)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_facil_19',
    titulo: 'O Que é a Cultura de Paz?',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    enunciado: 'O que define uma escola comprometida com a verdadeira "Cultura de Paz"?',
    contexto: 'Planejamento das ações pedagógicas integradas da EEMTI Alfredo Machado.',
    opcoes: [
      'Um ambiente onde conflitos são mediados com diálogo, onde a diversidade é respeitada e onde todos se sentem seguros e valorizados.',
      'Uma escola onde nenhum estudante tem autorização para emitir opiniões sobre os projetos.',
      'Um colégio que cerca todas as salas com arame farpado e proíbe o recreio para que não haja contato.',
      'Um local que expulsa imediatamente qualquer estudante que cometer um erro pedagógico.'
    ],
    correta: 0,
    explicacao: 'A cultura de paz não é a ausência de conflitos, mas a presença ativa de justiça, solidariedade, diálogo e direitos humanos nas relações diárias.',
    justificativaIncorretas: [
      'Calar os estudantes gera opressão, o oposto de uma cultura participativa e democrática de paz.',
      'O isolamento físico e a proibição da convivência impedem o desenvolvimento de habilidades sociais saudáveis.',
      'Medidas puramente punitivas sem caráter pedagógico não educam para a convivência harmoniosa.'
    ],
    referencia: 'Declaração e Programa de Ação sobre uma Cultura de Paz (ONU - Resolução 53/243)',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['primeiro_passo_sabedoria']
  },
  {
    id: 'quiz_facil_20',
    titulo: 'Dever de Proteger o Sigilo',
    dificuldade: 'facil',
    categoria: 'direitos',
    competencia: 'direitos',
    enunciado: 'Por que o sistema do StopBullying não exige que o estudante informe nome completo, RG ou telefone para fazer uma denúncia?',
    contexto: 'Um aluno quer enviar um relato mas tem medo de que descubram sua identidade.',
    opcoes: [
      'Para proteger incondicionalmente a segurança de quem relata, eliminando qualquer risco de represália ou exposição pública.',
      'Porque a escola não tem interesse em saber a veracidade das informações apresentadas.',
      'Porque os servidores do site não têm capacidade de armazenar nomes de usuários.',
      'Para que o sistema possa ser usado anonimamente por pessoas que moram em outros países.'
    ],
    correta: 0,
    explicacao: 'O anonimato por design é uma escolha ética e técnica: protege o denunciante contra qualquer retaliação e permite que a escola aja com foco na resolução do problema.',
    justificativaIncorretas: [
      'A escola analisa cuidadosamente cada relato com base em elementos contextuais para averiguar a situação com responsabilidade.',
      'A arquitetura tecnológica armazena dados com segurança; a dispensa de identificação pessoal é diretriz de proteção da privacidade.',
      'O foco é a comunidade escolar atendida, e a proteção atende ao princípio da minimização de dados da LGPD.'
    ],
    referencia: 'Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e Princípio da Proteção Integral',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['escudo_inabalavel']
  },
  {
    id: 'quiz_facil_21',
    titulo: 'Preconceito e Gordofobia Escolar',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    enunciado: 'Comentários ofensivos recorrentes sobre o peso ou o corpo de um estudante configuram qual tipo de violência?',
    contexto: 'Piadas e comentários depreciativos feitos na fila da cantina ou nas aulas de Educação Física.',
    opcoes: [
      'Bullying corporal e estético (gordofobia ou body shaming), uma violação psicológica da dignidade e da integridade física do indivíduo.',
      'Preocupação médica legítima que os colegas têm com a saúde alheia.',
      'Comentários normais de incentivo ao condicionamento atlético.',
      'Liberdade culinária protegida pelas leis sanitárias do município.'
    ],
    correta: 0,
    explicacao: 'Julgar e ridicularizar corpos causa dor intensa e transtornos de imagem e alimentares. Ninguém tem o direito de fazer piadas depreciativas com a aparência alheia.',
    justificativaIncorretas: [
      'Ofender não é cuidado médico; orientação em saúde é atribuição de profissionais e familiares com respeito e afeto.',
      'Zombaria não incentiva prática esportiva saudável; pelo contrário, afasta o estudante das atividades físicas.',
      'Leis sanitárias tratam de higiene alimentar, não de autorização para humilhação interpessoal.'
    ],
    referencia: 'Conselho Federal de Psicologia - Resolução sobre Dignidade e Corporeidade',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_facil_22',
    titulo: 'A Força do Grupo e o Efeito Manada',
    dificuldade: 'facil',
    categoria: 'espectador',
    competencia: 'convivencia',
    enunciado: 'O que leva muitas vezes estudantes a participarem de zombarias mesmo quando individualmente discordam da atitude?',
    contexto: 'Um aluno admite em particular que achou a piada cruel, mas riu junto porque todos estavam rindo.',
    opcoes: [
      'A pressão dos pares e o medo de ser excluído do grupo, levando a pessoa a abrir mão temporariamente de seus próprios valores éticos.',
      'Uma ordem direta dada pelo regimento escolar que obriga todos a concordarem com a maioria.',
      'Um fenômeno genético que impede o cérebro adolescente de ter opinião própria.',
      'A certeza absoluta de que a pessoa ridicularizada não se importa com a brincadeira.'
    ],
    correta: 0,
    explicacao: 'A necessidade de aceitação social é muito forte na juventude. Ter coragem de dizer "não concordo com isso" exige maturidade e quebra o efeito manada.',
    justificativaIncorretas: [
      'Nenhum regimento escolar estimula ou obriga a cumplicidade com agressões.',
      'A psicologia social demonstra que a conformidade decorre de pressões ambientais e culturais, não de determinismo genético.',
      'A suposição de que o outro "não se importa" é um mecanismo de autoengano para anestesiar a própria consciência.'
    ],
    referencia: 'Experimento de Conformidade Social de Solomon Asch',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_facil_23',
    titulo: 'Comunicação Não-Violenta (CNV)',
    dificuldade: 'facil',
    categoria: 'mediacao',
    competencia: 'convivencia',
    enunciado: 'Ao expressar descontentamento com a atitude de um colega de trabalho em equipe, qual frase segue os princípios da Comunicação Não-Violenta?',
    contexto: 'Um colega atrasou a entrega da sua parte do trabalho de Geografia.',
    opcoes: [
      '"Fiquei preocupado quando o prazo passou sem seu envio, pois preciso entregar o trabalho hoje. Como podemos finalizar juntos agora?"',
      '"Você é um preguiçoso inútil que sempre estraga as notas de todo mundo nesta sala!"',
      '"Vou falar mal de você para todos os grupos até você ter vergonha de vir para a escola!"',
      '"Não vou falar nada e vou quebrar a sua mochila na saída para você aprender."'
    ],
    correta: 0,
    explicacao: 'A CNV foca em observação sem julgamento pejorativo, expressão de sentimentos e necessidades claras e pedidos concretos de cooperação.',
    justificativaIncorretas: [
      'Rotular o colega de "preguiçoso inútil" ataca a pessoa em vez de focar no problema e gera defesa agressiva.',
      'Ameaçar com difamação e chantagem configura agressão verbal e retaliação antipedagógica.',
      'Ameaça de destruição patrimonial ou agressão física constitui violência intolerável.'
    ],
    referencia: 'Marshall Rosenberg - Comunicação Não-Violenta: Técnicas para Aprimorar Relacionamentos',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_facil_24',
    titulo: 'O Papel do Grêmio Estudantil',
    dificuldade: 'facil',
    categoria: 'prevencao',
    competencia: 'direitos',
    enunciado: 'Como o Grêmio Estudantil pode atuar de forma protagonista no combate ao bullying na escola?',
    contexto: 'Campanha de acolhimento e conscientização promovida pela representação estudantil.',
    opcoes: [
      'Promovendo rodas de conversa, campanhas de empatia, recepção acolhedora a novatos e canais de diálogo entre alunos e gestão.',
      'Criando uma lista pública dos estudantes mais populares para definir quem pode usar o pátio.',
      'Organizando confrontos físicos contra outras escolas para defender a reputação do colégio.',
      'Cobrando pedágio dos alunos menores para permitir a entrada nas salas de aula.'
    ],
    correta: 0,
    explicacao: 'O protagonismo juvenil é o motor mais potente da cultura de paz: quando os próprios estudantes lideram a defesa do respeito, a mensagem é assimilada naturalmente pelos pares.',
    justificativaIncorretas: [
      'Listas de popularidade hierarquizam os alunos e estimulam dinâmicas de exclusão social.',
      'Incentivar rivalidades violentas e brigas coletivas desvirtua a finalidade cívica do movimento estudantil.',
      'Extorquir outros estudantes é ato ilícito grave que viola a legislação e os direitos fundamentais.'
    ],
    referencia: 'Lei Federal nº 7.398/1985 (Lei dos Grêmios Estudantis) e Estatuto da Juventude',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['primeiro_passo_sabedoria']
  },
  {
    id: 'quiz_facil_25',
    titulo: 'O Compromisso Pessoal com a Paz',
    dificuldade: 'facil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    enunciado: 'Em última análise, qual é a responsabilidade diária de cada membro da comunidade escolar diante da convivência?',
    contexto: 'Reflexão final da trilha inicial de formação do Sentinela / StopBullying.',
    opcoes: [
      'Tratar cada pessoa com dignidade e consideração, recusar a cumplicidade com humilhações e construir um ambiente seguro onde todos possam florescer.',
      'Apenas cuidar dos seus próprios interesses e ignorar tudo o que acontece ao redor.',
      'Procurar defeitos nos outros para se sentir superior perante os colegas.',
      'Esperar que a polícia resolva todos os pequenos conflitos de diálogo do cotidiano.'
    ],
    correta: 0,
    explicacao: 'A paz escolar se constrói nas escolhas diárias: no "bom dia" acolhedor, na palavra que não fere, na mão estendida a quem caiu e na recusa firme a qualquer forma de crueldade.',
    justificativaIncorretas: [
      'O individualismo indiferente permite que injustiças cresçam e afetem a segurança de todos.',
      'Buscar a superioridade rebaixando os outros é a raiz psicológica do comportamento agressivo.',
      'A convivência humana sadia depende de habilidades socioemocionais e diálogo comunitário, não de mera coerção.'
    ],
    referencia: 'Carta da Terra e Princípios de Convivência Escolar Democrática',
    xpRecompensa: 10,
    missoesAssociadas: ['mis_primeiro_passo'],
    conquistasAssociadas: ['primeiro_passo_sabedoria']
  }
];




export const MEDIO_QUESTIONS: BankQuestion[] = [
  {
    id: 'medio_001',
    pergunta: 'Em uma análise comportamental no ambiente escolar, qual critério técnico diferencia o "conflito interpessoal circunstancial" da "intimidação sistemática (bullying)"?',
    contexto: 'Relatório da comissão de convivência analisando uma sucessão de atritos entre alunos no 1º Ano do Ensino Médio.',
    opcoes: [
      'A intimidação sistemática pressupõe assimetria de poder (físico, social ou psicológico), intencionalidade de causar sofrimento e repetição ao longo do tempo.',
      'O conflito circunstancial envolve agressão física grave, enquanto o bullying limita-se exclusivamente a xingamentos e apelidos.',
      'A intimidação sistemática ocorre unicamente quando há mais de cinco agressores atuando contra um único indivíduo isolado.',
      'O conflito circunstancial ocorre apenas entre estudantes de turmas diferentes, enquanto o bullying só existe entre colegas de mesma sala.'
    ],
    correta: 0,
    explicacao: 'A Lei nº 13.185/2015 define como intimidação sistemática todo ato de violência física ou psicológica, intencional e repetitivo, sem motivação evidente, praticado em desequilíbrio de poder.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'bullying',
    referencia: 'Lei Federal nº 13.185/2015, Art. 1º, § 1º'
  },
  {
    id: 'medio_002',
    pergunta: 'Um estudante passa a ser alvo de piadas diárias em sala. Ao reclamar, o autor rebate dizendo: "Você não aguenta brincadeira, é muito sensível!". Essa atitude caracteriza qual fenômeno psicológico?',
    contexto: 'Situação observada com frequência em dinâmicas de bullying verbal velado.',
    opcoes: [
      'Validação emocional preventiva.',
      'Inversão de culpa e desqualificação da dor da vítima (gaslighting/minimização do dano).',
      'Exercício pedagógico de desenvolvimento da resiliência do educando.',
      'Comunicação não-violenta de resolução rápida de atrito.'
    ],
    correta: 1,
    explicacao: 'Transferir a culpa para a vítima, acusando-a de "fragilidade" ou "falta de humor", é mecanismo típico de agressores para mascarar o abuso e desarmar a queixa legítima.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'bullying',
    referencia: 'Psicologia do Assédio Moral nas Relações Escolares'
  },
  {
    id: 'medio_003',
    pergunta: 'A Lei Federal nº 14.811/2024 introduziu inovações cruciais no Código Penal brasileiro no tocante à proteção infanto-juvenil. Qual foi a principal alteração relacionada ao bullying?',
    contexto: 'Reunião de alinhamento com a diretoria sobre o marco penal vigente no Brasil.',
    opcoes: [
      'Extinguiu os conselhos tutelares e delegou aos grêmios escolares o poder de julgar crimes de internet.',
      'Tipificou expressamente o bullying e o cyberbullying no Artigo 146-A do Código Penal, agravando as penas quando cometido em ambientes digitais.',
      'Descriminalizou brigas de rua envolvendo adolescentes em horário de recreio.',
      'Proibiu o uso de computadores por estudantes menores de 18 anos em todo o território nacional.'
    ],
    correta: 1,
    explicacao: 'A Lei nº 14.811/2024 incluiu o Art. 146-A no Código Penal (intimidação sistemática individual ou em grupo) e estabeleceu pena de reclusão de 2 a 4 anos para a modalidade virtual (cyberbullying).',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Código Penal Brasileiro, Art. 146-A (redação dada pela Lei nº 14.811/2024)'
  },
  {
    id: 'medio_004',
    pergunta: 'Ao analisar a postura de um espectador de bullying, qual perfil é classificado pela literatura pedagógica como "espectador reforçador"?',
    contexto: 'Dinâmica de papéis sociais na intimidação escolar.',
    opcoes: [
      'Aquele que não inicia o ataque, mas ri, aplaude, compartilha ou estimula verbalmente o agressor a prosseguir.',
      'Aquele que corre imediatamente para chamar o inspetor de alunos.',
      'Aquele que se coloca fisicamente na frente da vítima para protegê-la do golpe.',
      'Aquele que não se encontra presente no prédio escolar no momento da ocorrência.'
    ],
    correta: 0,
    explicacao: 'O espectador reforçador alimenta o ego e a validação social do agressor. Embora não desferir a ofensa inicial, sua aprovação mantém o ciclo da agressão vivo.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'bullying',
    referencia: 'Dan Olweus - Tipologia de Papéis no Bullying Escolar'
  },
  {
    id: 'medio_005',
    pergunta: 'Em um grupo de estudos online, um aluno é sumariamente removido toda vez que faz perguntas sobre o conteúdo, sendo depois alvo de "memes" depreciativos em outro grupo paralelo. Como essa conduta se enquadra?',
    contexto: 'Investigação pedagógica de exclusão sistemática em canais remotos.',
    opcoes: [
      'Cyberbullying com isolamento social deliberado e dano moral digital continuado.',
      'Estratégia neutra de moderação de grupo sem repercussão jurídica.',
      'Exercício legítimo de liderança de sala para manter o foco na matéria.',
      'Liberdade autoral de produção humorística protegida por direitos autorais.'
    ],
    correta: 0,
    explicacao: 'A remoção orquestrada associada à difamação por memes caracteriza cyberbullying com agravante de humilhação coletiva e ostracismo digital.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Lei nº 13.185/2015, Art. 2º, Incisos II e VII'
  },
  {
    id: 'medio_006',
    pergunta: 'Qual é o fundamento pedagógico para priorizar práticas restaurativas e círculos de construção de paz em vez de meras suspensões punitivas punitivistas?',
    contexto: 'Reunião pedagógica sobre o regimento escolar e cultura de paz.',
    opcoes: [
      'A suspensão isolada afasta o aluno sem gerar reflexão crítica, enquanto a justiça restaurativa foca na conscientização do dano, reparação e reintegração ética.',
      'A suspensão é proibida em todas as escolas públicas do Brasil por tratado internacional.',
      'As práticas restaurativas impedem que os pais tomem ciência do comportamento dos filhos.',
      'A justiça restaurativa visa proteger exclusivamente o agressor, desconsiderando as necessidades da vítima.'
    ],
    correta: 0,
    explicacao: 'A pedagogia restaurativa convida o ofensor a enxergar a humanidade da vítima e assumir a responsabilidade de reparar o dano, quebrando a reincidência.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Conselho Nacional de Justiça (CNJ) - Justiça Restaurativa nas Escolas'
  },
  {
    id: 'medio_007',
    pergunta: 'Um grupo de estudantes cria uma lista secreta ranqueando os colegas da sala com termos humilhantes sobre suas características físicas. Qual é a responsabilidade legal envolvida?',
    contexto: 'Circulação de listas depreciativas em folhas impressas e mensagens de aplicativo.',
    opcoes: [
      'Inexistente, pois listas em sala de aula são consideradas brincadeiras infantis atípicas.',
      'Há violação da honra e imagem, configurando ato infracional análogo a difamação e injúria com dever de reparação cível por danos morais pelos responsáveis legais.',
      'A responsabilidade recai unicamente sobre a gráfica ou fabricante do papel onde a lista foi impressa.',
      'Apenas o representante de turma responde legalmente por qualquer fato ocorrido na sala.'
    ],
    correta: 1,
    explicacao: 'A criação e disseminação de listas vexatórias atenta contra a integridade moral dos estudantes, acarretando responsabilidade infracional (ECA) e civil (Código Civil, Art. 932).',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'ECA (Lei nº 8.069/1990, Art. 103) e Código Civil (Art. 186 e Art. 932, I)'
  },
  {
    id: 'medio_008',
    pergunta: 'Qual é o procedimento técnico recomendado para preservar a validade jurídica de provas de ofensas ocorridas no ambiente virtual (como redes sociais)?',
    contexto: 'Orientação de um estudante vítima de perseguição virtual para formalização de denúncia.',
    opcoes: [
      'Apagar imediatamente a conta e quebrar o aparelho celular.',
      'Capturar telas preservando data, hora, links das postagens, perfis dos autores e, se necessário, lavrar ata notarial em cartório ou preservação via ferramentas digitais auditadas.',
      'Responder com xingamentos mais pesados para provar que houve debate em igualdade de condições.',
      'Alterar o texto das mensagens com programas de edição de imagem para aumentar a gravidade das palavras.'
    ],
    correta: 1,
    explicacao: 'A cadeia de custódia da prova digital exige integridade dos metadados (data, hora, URL, remetente) para comprovar a autoria e a materialidade da ofensa.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'Código de Processo Civil, Art. 384 e Art. 411'
  },
  {
    id: 'medio_009',
    pergunta: 'Durante a realização de um trabalho em equipe, dois alunos divergem de forma ríspida sobre a conclusão do projeto. Qual intervenção pedagógica evita a escalada para o assédio moral?',
    contexto: 'Mediação feita pelo professor orientador no laboratório.',
    opcoes: [
      'Separar os fatos e ideias dos julgamentos sobre as pessoas, estabelecendo que ideias podem ser debatidas com veemência, mas a integridade moral do colega é intocável.',
      'Permitir que o aluno com nota anterior mais alta decida quem deve ser expulso do grupo.',
      'Deixar que os alunos resolvam o atrito fisicamente para que o mais forte imponha a ordem.',
      'Cancelar o projeto de toda a sala de aula como castigo coletivo preventivo.'
    ],
    correta: 0,
    explicacao: 'A separação entre a questão técnica (o problema) e a pessoa (o interlocutor) é a regra de ouro da negociação baseada em princípios (Escola de Harvard).',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Fisher & Ury - Como Chegar ao Sim (Negociação Baseada em Princípios)'
  },
  {
    id: 'medio_010',
    pergunta: 'Qual sinal comportamental silencioso comumente antecede o abandono escolar e pode ser indício direto de vitimização por intimidação sistemática?',
    contexto: 'Análise de dados da busca ativa escolar pela coordenação pedagógica.',
    opcoes: [
      'Aumento repentino de notas em todas as matérias de ciências exatas.',
      'Queda inexplicável de rendimento, queixas frequentes de dores físicas sem causa clínica (somatização), isolamento no recreio e faltas reiteradas em dias específicos.',
      'Candidatura ativa a cargos de liderança no grêmio estudantil.',
      'Participação assídua em eventos esportivos aos finais de semana.'
    ],
    correta: 1,
    explicacao: 'A somatização e a evasão seletiva (evitar a escola em dias de matérias ou horários onde os agressores atuam) são fortes indicativos de sofrimento crônico por bullying.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'bullying',
    referencia: 'Relatório Global da UNESCO sobre Violência e Bullying na Escola'
  },
  {
    id: 'medio_011',
    pergunta: 'O que define a figura do "cyberstalking" e por que ela representa perigo extremo para a integridade da vítima?',
    contexto: 'Situação de monitoramento obsessivo de um estudante por outro na internet.',
    opcoes: [
      'A perseguição reiterada por meios virtuais, com invasão de privacidade, monitoramento de passos e mensagens que ameaçam a liberdade ou perturbam a esfera de paz da pessoa.',
      'Apenas o ato de seguir a conta pública de um influenciador famoso sem mandar mensagens.',
      'A instalação de antivírus gratuito no computador da escola.',
      'O envio de uma solicitação de amizade recusada pelo colega.'
    ],
    correta: 0,
    explicacao: 'O stalking virtual foi tipificado pelo Art. 147-A do Código Penal e caracteriza-se pela obsessão persecutória que restringe a liberdade de locomoção e de autodeterminação da vítima.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'Código Penal Brasileiro, Art. 147-A (Lei nº 14.132/2021)'
  },
  {
    id: 'medio_012',
    pergunta: 'Por que o uso do recurso de "denúncia anônima com código de protocolo" no StopBullying cumpre com os preceitos da Lei Geral de Proteção de Dados (LGPD)?',
    contexto: 'Auditoria de segurança e privacidade do sistema escolar.',
    opcoes: [
      'Porque aplica o princípio da minimização da coleta de dados, dispensando a exigência de dados pessoais sensíveis do denunciante para proteger sua integridade física e psíquica.',
      'Porque a LGPD não se aplica a ambientes escolares públicos.',
      'Porque o código de protocolo é uma senha pública que qualquer pessoa na internet pode acessar.',
      'Porque os dados são automaticamente deletados dos servidores a cada dez minutos.'
    ],
    correta: 0,
    explicacao: 'O Artigo 6º, III da LGPD determina que o tratamento de dados deve se limitar ao mínimo necessário para a finalidade pretendida. Não coletar nome ou IP protege o usuário na origem.',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Lei nº 13.709/2018 (LGPD), Art. 6º, Inciso III'
  },
  {
    id: 'medio_013',
    pergunta: 'Quando um grupo de alunos reproduz ofensas de cunho racial ou homofóbico disfarçadas de "piada de vestiário", qual a qualificação jurídica dessa prática?',
    contexto: 'Relato encaminhado à coordenação sobre ocorrências após a aula de Educação Física.',
    opcoes: [
      'Trata-se de manifestação de intimidação sistemática qualificada por preconceito e discriminação, passível de enquadramento na Lei de Racismo ou injúria racial.',
      'Constitui conduta atípica plenamente amparada pelo direito ao humor e à recreação.',
      'É apenas um desvio de etiqueta sem qualquer relevância jurídica ou pedagógica.',
      'Só se torna infração caso a vítima seja maior de 21 anos.'
    ],
    correta: 0,
    explicacao: 'O Supremo Tribunal Federal e a legislação pátria equiparam a injúria racial ao crime de racismo (imprescritível e inafiançável). A alegação de "humor" não elide a ilicitude do ato.',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Lei nº 7.716/1989 (Lei de Racismo) e Lei nº 14.532/2023 (Tipificação da Injúria Racial)'
  },
  {
    id: 'medio_014',
    pergunta: 'Qual é o papel ético do "defensor ou intercessor" em um contexto de agressão verbal pública na escola?',
    contexto: 'Colega intervindo em uma rodinha de zombaria no pátio.',
    opcoes: [
      'Desviar o foco da humilhação, quebrar o padrão chamando o agredido para sair do local e posicionar-se publicamente com serenidade dizendo que a ofensa não tem graça.',
      'Desferir um soco na mandíbula do agressor para mostrar superioridade moral.',
      'Esperar a agressão acabar para gravar um depoimento da vítima e vender para um jornal.',
      'Estimular outros colegas a também agredirem a família do autor da ofensa.'
    ],
    correta: 0,
    explicacao: 'A intercessão assertiva não violenta protege a vítima fisicamente e priva o agressor do aplauso da audiência, demonstrando coragem cívica sem aumentar a violência.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Estratégias de Intervenção de Bystanders (Universidade de Harvard)'
  },
  {
    id: 'medio_015',
    pergunta: 'O que caracteriza a prática de "doxing" no contexto de cyberbullying escolar?',
    contexto: 'Publicação não autorizada de dados de um estudante na internet.',
    opcoes: [
      'A busca e divulgação pública e maliciosa de dados pessoais privados de alguém (endereço residencial, telefone, CPF, rotinas) com o objetivo de incentivar assédio ou perseguição.',
      'A criação de uma planilha de estudos para o Exame Nacional do Ensino Médio.',
      'O compartilhamento de documentos históricos em trabalhos de sociologia.',
      'O envio de cartões virtuais de aniversário para colegas de classe.'
    ],
    correta: 0,
    explicacao: 'O doxing visa expor a intimidade e a segurança física da vítima ao mundo exterior, sendo conduta ilícita de alta nocividade com graves implicações legais.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Cartilha de Segurança Cibernética do Ministério Público Federal'
  },
  {
    id: 'medio_016',
    pergunta: 'Em conformidade com a Lei de Diretrizes e Bases da Educação Nacional (LDB, Lei nº 9.394/1996), qual é a obrigação explícita dos estabelecimentos de ensino quanto à violência?',
    contexto: 'Auditoria de conformidade dos planos de gestão escolar.',
    opcoes: [
      'Promover medidas de conscientização, de prevenção e de combate a todos os tipos de violência, especialmente a intimidação sistemática (bullying), no âmbito das escolas.',
      'Instalar catracas eletrônicas biométricas financiadas exclusivamente pelas famílias.',
      'Transferir compulsoriamente os alunos vitimizados para escolas de tempo noturno.',
      'Cobrar multas em dinheiro dos estudantes que chegam com uniforme amarrotado.'
    ],
    correta: 0,
    explicacao: 'O Artigo 12, Inciso IX da LDB (acrescentado pela Lei nº 13.663/2018) impõe à escola o dever institucional ativo de promover a cultura da paz e combater o bullying.',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'LDB (Lei nº 9.394/1996), Art. 12, Incisos IX e X'
  },
  {
    id: 'medio_017',
    pergunta: 'Qual a diferença entre a "responsabilidade pedagógica da escola" e a "omissão institucional" diante de um relato de intimidação recorrente?',
    contexto: 'Análise de caso em que uma mãe informou a coordenação sobre ameaças recorrentes por três meses sem qualquer providência tomada.',
    opcoes: [
      'A responsabilidade pedagógica exige agir com medidas de acolhimento, apuração, mediação e proteção; a inércia injustificada diante do conhecimento do risco configura omissão ilícita da instituição.',
      'A escola só tem responsabilidade se o fato ocorrer durante as férias de julho.',
      'A omissão institucional só existe em escolas privadas, nunca em escolas públicas estaduais.',
      'A escola está desobrigada de intervir se a agressão começar dentro de um aplicativo de celular.'
    ],
    correta: 0,
    explicacao: 'A escola detém o dever de custódia e proteção integral sobre os alunos sob sua guarda. A ciência de agressões contínuas sem adoção de medidas enseja responsabilidade civil objetiva do Estado/entidade.',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Código Civil, Art. 932, IV e Jurisprudência do STJ sobre Dever de Custódia Escolar'
  },
  {
    id: 'medio_018',
    pergunta: 'No âmbito da inteligência emocional, o que significa a habilidade de "assertividade" em um diálogo tenso?',
    contexto: 'Estudante sendo pressionado por colegas a participar de uma brincadeira ofensiva.',
    opcoes: [
      'Expressar os próprios limites, valores e recusas de maneira firme, clara e serena, sem submissão passiva e sem apelar para a agressividade.',
      'Concordar com tudo o que o grupo exige para evitar o isolamento social a qualquer custo.',
      'Reagir com gritos e destruição de materiais da sala para demonstrar autoridade.',
      'Fingir que não ouviu nada e chorar escondido no banheiro da escola.'
    ],
    correta: 0,
    explicacao: 'A assertividade é o ponto de equilíbrio entre a passividade (ceder a pressões nocivas) e a agressividade (violentar os outros). É dizer "não" com elegância e firmeza.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Habilidades Sociais e Comunicação Assertiva (Del Prette)'
  },
  {
    id: 'medio_019',
    pergunta: 'Um estudante posta em uma rede social um desabafo dizendo que se sente um fardo para todos e que não vê motivos para continuar vivendo. Qual é a reação ética e urgente de um colega que lê o post?',
    contexto: 'Sinais de sofrimento psíquico grave e ideação suicida na internet.',
    opcoes: [
      'Ignorar o post ou rir nos comentários achando que é apenas drama para ganhar curtidas.',
      'Avisar imediatamente um adulto de confiança, a coordenação da escola ou familiares, orientando o acesso a redes de acolhimento como o CVV (Disque 188).',
      'Compartilhar o post com o comentário "olhem que ridículo esse desespero".',
      'Desafiar o colega publicamente a provar se tem coragem.'
    ],
    correta: 1,
    explicacao: 'Sinais de desespero e desesperança devem ser tratados com seriedade absoluta. A intervenção precoce de suporte salva vidas.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'respeito',
    referencia: 'Cartilha de Prevenção ao Suicídio e Sofrimento Psíquico na Adolescência (ABP / CFM)'
  },
  {
    id: 'medio_020',
    pergunta: 'Qual é o impacto do "preconceito estrutural" (racial, de gênero ou capacitista) na perpetuação do bullying nas escolas?',
    contexto: 'Discussão sociológica sobre por que determinados grupos são estatisticamente mais atacados.',
    opcoes: [
      'Não há relação, pois o bullying é um fenômeno 100% individual que ignora a história e a cultura social.',
      'O bullying muitas vezes reflete e reproduz preconceitos históricos enraizados na sociedade, exigindo ações pedagógicas formativas permanentes sobre igualdade e direitos humanos.',
      'O preconceito estrutural só afeta estudantes com mais de 25 anos matriculados no ensino superior.',
      'As agressões verbais no colégio têm como única causa a herança genética dos alunos agressores.'
    ],
    correta: 1,
    explicacao: 'O bullying não ocorre no vácuo social. Piadas racistas, machistas ou capacitistas ecoam violências históricas e demandam desconstrução crítica em sala de aula.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Silvio Almeida - Racismo Estrutural e Educação'
  },
  {
    id: 'medio_021',
    pergunta: 'Quando um aluno é coagido a pagar lanches ou entregar objetos pessoais a um grupo sob ameaça de surra no portão, qual a qualificação desse ato?',
    contexto: 'Ocorrência registrada no entorno da instituição escolar.',
    opcoes: [
      'Trata-se de ato infracional análogo a extorsão mediante ameaça grave, configurando violência patrimonial e psicológica severa.',
      'É apenas uma troca voluntária de favores comuns da rotina estudantil.',
      'Representa um contrato comercial válido perante as leis civis vigentes.',
      'Conduta permitida se os alunos forem da mesma agremiação esportiva.'
    ],
    correta: 0,
    explicacao: 'Exigir vantagem econômica indevida mediante grave ameaça física é conduta ilícita grave (análoga à extorsão, Art. 158 do Código Penal) e deve ser coibida prontamente.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'bullying',
    referencia: 'Código Penal, Art. 158 e Estatuto da Criança e do Adolescente'
  },
  {
    id: 'medio_022',
    pergunta: 'Qual é a principal falha na estratégia punitivista do "olho por olho" (responder a um xingamento com uma ofensa mais pesada)?',
    contexto: 'Discussão sobre formas de reação a provocações em sala de aula.',
    opcoes: [
      'Alimenta a escalada da agressividade, confunde os limites entre quem foi agredido e quem agrediu e impede que a autoridade escolar apoie a vítima com clareza.',
      'Faz o agressor imediatamente se tornar amigo íntimo da vítima.',
      'Garante que nenhum dos dois alunos precise fazer as provas do bimestre.',
      'É a estratégia recomendada por todos os manuais de direitos humanos do mundo.'
    ],
    correta: 0,
    explicacao: 'O revide agressivo retroalimenta o ciclo da hostilidade e muitas vezes coloca a vítima na mesma posição disciplinar do agressor original perante o regimento.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Resolução Pacífica de Conflitos e Mediação Escolar'
  },
  {
    id: 'medio_023',
    pergunta: 'Por que o compartilhamento de "nudes" ou imagens íntimas de menores de 18 anos sem consentimento é punido com severidade excepcional no Brasil?',
    contexto: 'Alerta sobre compartilhamento de mídia em grupos de bate-papo de adolescentes.',
    opcoes: [
      'Porque viola gravemente o direito fundamental à intimidade e à proteção integral, configurando crime pelo Estatuto da Criança e do Adolescente com pena de reclusão.',
      'Apenas porque gasta dados de conexão de internet das operadoras móveis.',
      'Porque fotos tiradas em quartos de dormir não têm validade para o currículo acadêmico.',
      'A lei brasileira permite o repasse livre de fotos desde que os rostos estejam com óculos escuros.'
    ],
    correta: 0,
    explicacao: 'O Artigo 241-A do ECA tipifica como crime inafiançável a divulgação de cenas de sexo explícito ou pornografia envolvendo criança ou adolescente, com pena de 3 a 6 anos de reclusão.',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'ECA (Lei nº 8.069/1990), Artigo 241-A'
  },
  {
    id: 'medio_024',
    pergunta: 'O que caracteriza o "cyberbullying indireto" realizado através de enquetes de popularidade humilhantes?',
    contexto: 'Criação de enquetes anônimas em aplicativos de perguntas sobre "quem é a pessoa mais feia da turma".',
    opcoes: [
      'Uso de mecanismos de votação pública para institucionalizar a rejeição e o escárnio coletivo de estudantes vulneráveis.',
      'Metodologia científica válida para avaliar a satisfação dos alunos com a escola.',
      'Jogo recreativo aprovado pelos conselhos tutelares de todos os municípios.',
      'Exercício democrático de votação comparável às eleições parlamentares.'
    ],
    correta: 0,
    explicacao: 'Enquetes depreciativas transformam a humilhação em competição digital pública, multiplicando o impacto traumático na autoestima da vítima.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Guia de Proteção contra o Assédio Digital (SaferNet Brasil)'
  },
  {
    id: 'medio_025',
    pergunta: 'Como o Conselho Tutelar atua quando uma escola identifica situação crônica de violência sistemática e desamparo familiar envolvendo menores de idade?',
    contexto: 'Encaminhamento de caso de bullying persistente não resolvido internamente.',
    opcoes: [
      'Aplica medidas protetivas de acompanhamento familiar, requisita serviços públicos de saúde mental e orienta a comunidade para salvaguarda integral do adolescente.',
      'Prende os adolescentes em celas fechadas para adultos sem direito a defesa.',
      'Obriga a escola a fechar as portas e demitir todos os professores.',
      'Cobra indenizações financeiras diretas para o caixa pessoal dos conselheiros.'
    ],
    correta: 0,
    explicacao: 'O Conselho Tutelar é órgão autônomo e permanente encarregado pela sociedade de zelar pelo cumprimento dos direitos da criança e do adolescente (ECA, Art. 131).',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'ECA (Lei nº 8.069/1990), Artigos 131 e 136'
  },
  {
    id: 'medio_026',
    pergunta: 'Em uma situação de mediação escolar, qual é o papel essencial do princípio da "voluntariedade" das partes?',
    contexto: 'Convite feito pela comissão de paz para dois estudantes conversarem sobre um desentendimento.',
    opcoes: [
      'As partes devem aceitar participar do processo de diálogo de livre e espontânea vontade, pois a reconciliação e os acordos não podem ser impostos coercitivamente.',
      'Apenas os alunos com melhores notas podem escolher se participam da conversa.',
      'A participação é decidida por sorteio público no pátio da escola.',
      'O agressor é obrigado a pedir desculpas mesmo que planeje agredir o colega no dia seguinte.'
    ],
    correta: 0,
    explicacao: 'A justiça restaurativa só funciona com adesão genuína. Impor um pedido mecânico de desculpas sem conscientização gera falsidade e não protege a vítima.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Manual de Práticas Restaurativas no Sistema Educativo'
  },
  {
    id: 'medio_027',
    pergunta: 'Qual o efeito do isolamento social prolongado sobre a saúde mental e o desenvolvimento neuropsicológico do adolescente?',
    contexto: 'Estudos sobre as consequências a longo prazo do bullying relacional.',
    opcoes: [
      'Gera hiperativação crônica do eixo de estresse (cortisol elevado), aumenta riscos de depressão, ansiedade social severa e prejudica a plasticidade cerebral ligada à memória.',
      'Aumenta a inteligência lógica e melhora a velocidade de leitura silenciosa.',
      'Não provoca nenhum impacto na saúde mental de pessoas com menos de 20 anos.',
      'Torna a pessoa automaticamente imune a qualquer tipo de doença infecciosa.'
    ],
    correta: 0,
    explicacao: 'O cérebro adolescente é programado para o pertencimento social. A exclusão sistemática ativa circuitos neurais idênticos aos da dor física real.',
    dificuldade: 'medio',
    categoria: 'consequencias',
    competencia: 'respeito',
    referencia: 'Neurociência do Pertencimento e Exclusão Social (Lieberman, Social)'
  },
  {
    id: 'medio_028',
    pergunta: 'O que diferencia um "ambiente de comunicação segura" de um ambiente de vigilância opressiva?',
    contexto: 'Debate sobre os canais éticos do StopBullying em comparação com censura generalizada.',
    opcoes: [
      'O canal seguro acolhe relatos com anonimato para proteger os direitos humanos dos alunos, enquanto a vigilância opressiva pune pensamentos e opiniões legítimas.',
      'O canal seguro permite que qualquer pessoa assista às câmeras dos banheiros em tempo real.',
      'A vigilância opressiva é recomendada pelo Conselho Nacional de Educação para todas as turmas.',
      'Não há nenhuma diferença prática entre proteção ética e vigilância abusiva.'
    ],
    correta: 0,
    explicacao: 'Canais éticos protegem a dignidade e a integridade de quem sofre violência, respeitando a liberdade civil e a privacidade individual de todos os cidadãos.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'direitos',
    referencia: 'Constituição Federal de 1988, Art. 5º, Incisos X e XII'
  },
  {
    id: 'medio_029',
    pergunta: 'Por que o anonimato digital não impede que autoridades identifiquem autores de crimes graves cometidos na internet?',
    contexto: 'Ilusão de impunidade ao criar contas falsas em redes sociais.',
    opcoes: [
      'Porque os provedores de aplicação e de conexão guardam registros de IP, data, hora e portas lógicas, que podem ser requisitados por ordem judicial nos termos do Marco Civil da Internet.',
      'Porque a polícia tem câmeras instaladas dentro de todos os quartos do país.',
      'Porque todas as mensagens de WhatsApp são enviadas automaticamente para o e-mail dos diretores de escola.',
      'Porque ninguém consegue usar a internet sem autorização física de um cartório.'
    ],
    correta: 0,
    explicacao: 'O Marco Civil da Internet (Lei nº 12.965/2014) prevê a guarda de registros de conexão e de acesso a aplicações, permitindo rastrear o autor real sob ordem judicial.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'Marco Civil da Internet (Lei nº 12.965/2014), Artigos 13 e 15'
  },
  {
    id: 'medio_030',
    pergunta: 'Qual é o impacto positivo de uma turma que estabelece coletivamente seu "contrato pedagógico de convivência" no início do ano letivo?',
    contexto: 'Dinâmica de sala de aula orientada pelo professor regente.',
    opcoes: [
      'Os estudantes se sentem corresponsáveis pelas regras pactuadas, aumentando o cumprimento das normas e o sentimento de justiça comunitária.',
      'O contrato serve para anular todas as leis federais dentro daquela sala de aula.',
      'As regras passam a ser decididas exclusivamente pelo aluno mais forte fisicamente.',
      'A escola fica dispensada de ter regimento escolar ou professores presentes.'
    ],
    correta: 0,
    explicacao: 'Regras construídas de forma participativa desenvolvem a autonomia moral piagetiana: os jovens obedecem por convicção ética, não por medo de castigo.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Jean Piaget - O Juízo Moral na Criança'
  },
  {
    id: 'medio_031',
    pergunta: 'O que significa a "vitimização secundária" ou revitimização na rotina escolar?',
    contexto: 'Procedimento incorreto adotado com um estudante agredido.',
    opcoes: [
      'O sofrimento adicional provocado pela própria instituição ou grupo ao fazer a vítima repetir seu relato doloroso inúmeras vezes com ceticismo e julgamento moral.',
      'O ato de sofrer uma segunda agressão exatamente no mesmo local físico da primeira.',
      'O processo de recuperação emocional rápida através de esportes coletivos.',
      'O pagamento de indenização financeira pelo autor da violência à escola.'
    ],
    correta: 0,
    explicacao: 'Revitimizar é submeter quem já sofreu violência a interrogatórios constrangedores ou desconfiança infundada. O acolhimento exige escuta sensível e única.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Lei nº 13.431/2017 (Sistema de Garantia de Direitos e Escuta Protegida)'
  },
  {
    id: 'medio_032',
    pergunta: 'Quando um aluno pratica bullying para tentar ser aceito por uma "panelinha popular", qual dilema ético se manifesta?',
    contexto: 'Pressão de pares induzindo comportamento predatório contra novatos.',
    opcoes: [
      'A renúncia da própria consciência e dos valores morais em troca de uma falsa validação e pertencimento efêmero a um grupo predatório.',
      'Um exemplo legítimo de estratégia de sobrevivência indispensável na adolescência.',
      'A demonstração de que a popularidade escolar é mais valiosa do que a integridade humana.',
      'A obrigação de cumprir ritos esportivos exigidos pelo estatuto estudantil.'
    ],
    correta: 0,
    explicacao: 'Subordinar o respeito à necessidade de aprovação alheia enfraquece a dignidade do indivíduo. Amigos verdadeiros não exigem a opressão de outros como ingresso.',
    dificuldade: 'medio',
    categoria: 'dilemas',
    competencia: 'convivencia',
    referencia: 'Ética e Psicologia do Desenvolvimento da Consciência Moral'
  },
  {
    id: 'medio_033',
    pergunta: 'Qual a conduta esperada da equipe docente ao tomar ciência de agressões ocorridas em redes sociais fora do horário escolar, mas que afetam as aulas?',
    contexto: 'Ameaças e humilhações em grupo de WhatsApp no fim de semana que geram medo em sala na segunda-feira.',
    opcoes: [
      'Acolher a situação, orientar as famílias e tomar providências pedagógicas de proteção, pois os efeitos do cyberbullying transbordam diretamente para o clima escolar.',
      'Dizer que a escola só tem responsabilidade pelo que ocorre das 7h às 12h e ignorar o caso por completo.',
      'Expulsar todos os alunos envolvidos sem direito a esclarecimento dos fatos.',
      'Proibir o uso da internet na cidade onde a escola está localizada.'
    ],
    correta: 0,
    explicacao: 'O ciberespaço e o espaço físico escolar são integrados na vivência juvenil. Conflitos virtuais repercutem na segurança escolar e demandam atenção institucional.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'Parecer CNE/CP nº 02/2018 sobre Clima Escolar e Redes Digitais'
  },
  {
    id: 'medio_034',
    pergunta: 'O que diferencia a "empatia cognitiva" da "empatia afetiva" no combate ao bullying?',
    contexto: 'Capacitação socioemocional de lideranças estudantis na EEMTI Alfredo Machado.',
    opcoes: [
      'A cognitiva compreende racionalmente o ponto de vista alheio; a afetiva conecta-se com a dor emocional do outro, motivando o impulso ativo de ajuda e cuidado.',
      'A empatia cognitiva é exclusiva de professores de matemática e a afetiva de professores de artes.',
      'A empatia afetiva só existe entre familiares consanguíneos de primeiro grau.',
      'A empatia cognitiva é proibida em avaliações escolares do ensino médio.'
    ],
    correta: 0,
    explicacao: 'Ambas são essenciais: compreender a lógica do outro (cognitiva) e sentir compaixão por seu sofrimento (afetiva) formam o alicerce do comportamento pró-social.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Daniel Goleman - O Foco e a Inteligência Emocional'
  },
  {
    id: 'medio_035',
    pergunta: 'Em relação aos alunos com Transtorno do Espectro Autista (TEA) na escola, qual conduta dos colegas combate ativamente o capacitismo?',
    contexto: 'Inclusão de estudante com hipersensibilidade a barulhos e rotinas específicas.',
    opcoes: [
      'Respeitar seus momentos de autorregulação, não fazer barulhos propositais para desestabilizá-lo e convidá-lo com paciência para interações respeitosas.',
      'Fazer sons agudos perto de seus ouvidos para testar suas reações sensoriais.',
      'Excluí-lo de todos os projetos escolares sob a justificativa de que ele não se comunica igual aos outros.',
      'Exigir que ele não use fones de cancelamento de ruído na sala de aula.'
    ],
    correta: 0,
    explicacao: 'A Lei Berenice Piana (Lei nº 12.764/2012) protege a pessoa com autismo, assegurando respeito às suas características sensoriais e inclusão escolar efetiva.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Lei Berenice Piana (Lei nº 12.764/2012) e Estatuto da Pessoa com Deficiência'
  },
  {
    id: 'medio_036',
    pergunta: 'Qual é o papel da "escuta sem julgamento" na recuperação emocional de quem sofreu agressão?',
    contexto: 'Atendimento inicial na sala de mediação e acolhimento escolar.',
    opcoes: [
      'Oferecer um espaço seguro onde a vítima possa desabafar sua dor sem medo de ser rotulada, minimizada ou culpabilizada pelo que aconteceu.',
      'Permitir que o mediador decida imediatamente quem está mentindo sem ouvir os detalhes.',
      'Fazer com que a vítima assine um termo de desistência de qualquer apoio futuro.',
      'Substituir o trabalho dos médicos em casos de emergência hospitalar.'
    ],
    correta: 0,
    explicacao: 'Sentir-se ouvido com legitimidade é o primeiro passo para resgatar a dignidade e a confiança de quem foi humilhado.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'respeito',
    referencia: 'Carl Rogers - A Abordagem Centrada na Pessoa'
  },
  {
    id: 'medio_037',
    pergunta: 'Quando um aluno testemunha uma ameaça de agressão no banheiro e decide relatar no StopBullying em vez de confrontar fisicamente os agressores, por que essa escolha é prudente?',
    contexto: 'Decisão de segurança tomada por uma testemunha no turno da tarde.',
    opcoes: [
      'Porque aciona os profissionais capacitados para intervir sem expor a integridade física da testemunha a retaliações diretas.',
      'Porque demonstra covardia absoluta e medo de lutar com os colegas.',
      'Porque o aplicativo do StopBullying envia viaturas policiais com sirenes ligadas no mesmo minuto.',
      'Porque a lei proíbe qualquer pessoa de conversar com amigos sobre brigas escolares.'
    ],
    correta: 0,
    explicacao: 'A intervenção indireta segura (acionar a autoridade competente mantendo a própria proteção) é a estratégia mais recomendada por especialistas em segurança escolar.',
    dificuldade: 'medio',
    categoria: 'decisao',
    competencia: 'direitos',
    referencia: 'Protocolo de Segurança e Proteção Escolar (Ministério da Educação)'
  },
  {
    id: 'medio_038',
    pergunta: 'Qual a importância de trabalhar a história e a cultura afro-brasileira e indígena para prevenir o bullying étnico-racial na escola?',
    contexto: 'Projetos interdisciplinares desenvolvidos ao longo do ano letivo.',
    opcoes: [
      'Desconstrói narrativas eurocêntricas preconceituosas, valoriza o protagonismo das matrizes culturais formadoras do Brasil e educa para o respeito mútuo.',
      'Serve apenas para preencher horas complementares sem impacto na convivência.',
      'Visa proibir o estudo de outras matérias científicas nas escolas públicas.',
      'É obrigatório apenas em escolas localizadas em áreas rurais isoladas.'
    ],
    correta: 0,
    explicacao: 'As Leis Federais nº 10.639/2003 e 11.645/2008 estabelecem a obrigatoriedade desses conteúdos para combater o racismo na raiz cultural e promover a equidade.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'direitos',
    referencia: 'LDB (Art. 26-A, incluído pelas Leis nº 10.639/03 e 11.645/08)'
  },
  {
    id: 'medio_039',
    pergunta: 'O que caracteriza o fenômeno da "desindividualização" na internet que facilita agressões em massa?',
    contexto: 'Ataques virtuais orquestrados contra perfis de alunos em redes sociais.',
    opcoes: [
      'A sensação psicológica de anonimato e fusão com a multidão que diminui a autocensura e a responsabilidade moral individual do agressor.',
      'O cancelamento da inscrição de um usuário em um canal de vídeos educativos.',
      'A perda da senha de e-mail por esquecimento repetido.',
      'A utilização de computadores públicos em lan houses da periferia.'
    ],
    correta: 0,
    explicacao: 'Na massa digital, o indivíduo sente que "é apenas mais um xingando", diluindo sua culpa pessoal e cometendo atrocidades que jamais faria cara a cara.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Psicologia Social das Redes Digitais (Zimbardo / Festinger)'
  },
  {
    id: 'medio_040',
    pergunta: 'Por que o uso de trotes humilhantes na recepção de calouros ou alunos novatos é incompatível com a educação cidadã?',
    contexto: 'Tradições ultrapassadas de recepção de novos matriculados no início do ano.',
    opcoes: [
      'Porque estabelece uma relação inicial de submissão forçada, humilhação pública e desrespeito à dignidade de quem está chegando à instituição.',
      'Porque gasta tinta e farinha que deveriam ser usadas na merenda escolar.',
      'Porque apenas estudantes universitários têm permissão para fazer amigos na escola.',
      'Porque os alunos novatos não podem ser apresentados aos professores antes do segundo semestre.'
    ],
    correta: 0,
    explicacao: 'A recepção cidadã substitui o trote violento por trotes solidários (doação de sangue, livros, acolhimento com tutoria de veteranos), repudiando a opressão.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    referencia: 'Lei Estadual de Combate ao Trote Humilhante e Violento'
  },
  {
    id: 'medio_041',
    pergunta: 'Qual a diferença entre a "liberdade de manifestação do pensamento" e o "discurso de ódio" no ambiente escolar?',
    contexto: 'Debate em sala após um estudante alegar que pode ofender minorias por ter liberdade de expressão.',
    opcoes: [
      'A liberdade de expressão permite manifestar ideias e críticas dentro dos limites da lei; o discurso de ódio incita discriminação, hostilidade e violência contra grupos com base em preconceito, não sendo protegido pela Constituição.',
      'Não há nenhuma diferença, pois a Constituição brasileira garante a imunidade absoluta para qualquer palavra dita por cidadãos.',
      'O discurso de ódio só existe se for proferido em línguas estrangeiras dentro da escola.',
      'A liberdade de expressão só é permitida para quem tem mais de 18 anos de idade.'
    ],
    correta: 0,
    explicacao: 'O STF pacificou no caso Ellwanger e em jurisprudência consolidada que a liberdade de expressão não agasalha o crime nem protege a incitação ao ódio contra minorias.',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'STF - Habeas Corpus 82.424 (Caso Ellwanger) e CF/88, Art. 5º, IV e XLI'
  },
  {
    id: 'medio_042',
    pergunta: 'Como as técnicas de "respiração diafragmática 4-7-8" atuam fisiologicamente no corpo durante um momento de provocação ou estresse?',
    contexto: 'Exercício guiado de autorregulação no módulo de Apoio Emocional.',
    opcoes: [
      'Estimulam o sistema nervoso parassimpático através do nervo vago, reduzindo os batimentos cardíacos, baixando a pressão e devolvendo o controle consciente do córtex pré-frontal.',
      'Aumentam a produção de adrenalina para preparar o corpo para a luta física imediata.',
      'Eliminam toda a necessidade de oxigênio do cérebro por várias horas seguidas.',
      'Substituem a água potável necessária para a hidratação corporal.'
    ],
    correta: 0,
    explicacao: 'A respiração profunda prolongada ativa o freio biológico do estresse (parassimpático), desativando o sequestro da amígdala e evitando reações agressivas intempestivas.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Neurobiologia das Práticas de Mindfulness e Respiração (Herbert Benson, Harvard)'
  },
  {
    id: 'medio_043',
    pergunta: 'O que deve constar em um relatório de mediação de conflitos para que ele tenha eficácia pedagógica duradoura?',
    contexto: 'Registro sigiloso dos acordos construídos pela comissão escolar de paz.',
    opcoes: [
      'A identificação dos pontos de atrito, as necessidades expressas pelas partes, compromissos concretos e mensuráveis assumidos mutuamente e cronograma de acompanhamento posterior.',
      'A lista de punições físicas e humilhações que o agressor deverá cumprir na frente de toda a escola.',
      'A confissão assinada de que um dos alunos é culpado por todos os problemas do colégio.',
      'A nota bimestral que o professor deve tirar de cada estudante envolvido no caso.'
    ],
    correta: 0,
    explicacao: 'Acordos restaurativos exigem clareza nos compromissos de convivência e monitoramento pedagógico contínuo para verificar a sustentabilidade da paz alcançada.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Metodologia de Resolução de Disputas em Ambientes Educacionais'
  },
  {
    id: 'medio_044',
    pergunta: 'Por que a exclusão proposital de um colega de trabalhos acadêmicos pode comprometer seu direito constitucional à educação?',
    contexto: 'Turma em que um grupo se recusa sistematicamente a permitir a entrada de um aluno em atividades avaliativas.',
    opcoes: [
      'Porque obstaculiza o aprendizado colaborativo, impacta a avaliação pedagógica e cria um ambiente hostil que nega a fruição plena do direito de aprender.',
      'Porque trabalhos em grupo são a única forma de avaliação permitida pelo Ministério da Educação.',
      'Porque a Constituição Federal determina que todos os trabalhos devem ser feitos em duplas exatas.',
      'Não há impacto algum, pois o aluno pode fazer provas sozinho e tirar nota dez facilmente.'
    ],
    correta: 0,
    explicacao: 'A educação integral envolve sociabilidade e cooperação. O isolamento forçado atenta contra o Art. 205 da CF/88 (pleno desenvolvimento da pessoa e preparo para a cidadania).',
    dificuldade: 'medio',
    categoria: 'direitos',
    competencia: 'direitos',
    referencia: 'Constituição Federal de 1988, Artigo 205'
  },
  {
    id: 'medio_045',
    pergunta: 'Qual o papel da comissão de proteção escolar no suporte a um estudante que cometeu atos reiterados de bullying?',
    contexto: 'Abordagem educativa com o estudante agressor após apuração dos fatos.',
    opcoes: [
      'Compreender as raízes do comportamento hostil (muitas vezes fruto de violências domésticas ou traumas), responsabilizá-lo com firmeza ética e oferecer apoio socioemocional para mudança de conduta.',
      'Humilhá-lo na frente de todos os colegas para que ele sinta na pele o que fez com a vítima.',
      'Expulsá-lo sumariamente da escola e proibir sua matrícula em qualquer colégio do país.',
      'Fingir que o fato não aconteceu para evitar desgaste com os responsáveis do estudante.'
    ],
    correta: 0,
    explicacao: 'O combate eficaz ao bullying atua nos dois polos: acolhe e protege a vítima, mas também educa e transforma o agressor, interrompendo a cadeia de reprodução da violência.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Programa Nacional de Prevenção da Violência nas Escolas'
  },
  {
    id: 'medio_046',
    pergunta: 'Em quais circunstâncias a gravação de áudio ou vídeo de uma agressão pode ser admitida como legítima defesa probatória pelo estudante vitimado?',
    contexto: 'Vítima gravando ameaças sofridas no corredor com gravador do celular.',
    opcoes: [
      'Quando o estudante é o interlocutor da conversa e registra a ofensa/ameaça como meio estrito de comprovar a agressão às autoridades escolares ou judiciais, sem divulgação vexatória em redes sociais.',
      'Apenas quando a gravação for feita por emissora de televisão profissional com autorização de juiz.',
      'Nunca é permitida, pois o Código Penal proíbe qualquer gravação feita por telefones celulares no Brasil.',
      'É permitida apenas se o estudante enviar o vídeo para sites de humor na internet primeiro.'
    ],
    correta: 0,
    explicacao: 'A gravação ambiental realizada por um dos interlocutores para defesa de direito próprio e preservação de sua integridade é lícita, segundo jurisprudência consolidada do STF.',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'STF - Repercussão Geral no RE 583.937 (Licitude da Gravação Clandestina para Legítima Defesa)'
  },
  {
    id: 'medio_047',
    pergunta: 'O que é a "cultura do cuidado mútuo" estimulada em escolas de tempo integral como a EEMTI Alfredo Machado?',
    contexto: 'Princípios do protagonismo juvenil e acolhimento estudantil.',
    opcoes: [
      'Uma rede orgânica de solidariedade onde veteranos apoiam novatos, os colegas se preocupam com a ausência do outro e todos atuam ativamente na preservação do bem-estar coletivo.',
      'Um sistema em que cada estudante precisa cuidar das tarefas domésticas da diretoria da escola.',
      'A proibição de que os alunos conversem com estudantes de turnos diferentes.',
      'Uma disciplina optativa que só concede créditos para quem estuda medicina.'
    ],
    correta: 0,
    explicacao: 'O modelo das escolas de tempo integral fundamenta-se no projeto de vida e na empatia comunitária, onde o bem de um é responsabilidade de todos.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Modelo Pedagógico da Escola da Escolha (ICE / SEDUC-CE)'
  },
  {
    id: 'medio_048',
    pergunta: 'Qual atitude individual de um aluno contribui decisivamente para extinguir uma "cultura de riso cúmplice" em sua turma?',
    contexto: 'Um colega conta uma piada ofensiva sobre a condição financeira de um aluno na sala.',
    opcoes: [
      'Manter expressão séria, não esboçar sorriso e dizer calmamente: "Não vi graça nisso, ofensa não é piada".',
      'Rir discretamente cobrindo a boca com o estojo para não parecer cúmplice.',
      'Gritar xingamentos contra a mãe de quem contou a piada.',
      'Sair correndo da sala de aula chorando desesperadamente.'
    ],
    correta: 0,
    explicacao: 'O silêncio desaprovador e a palavra firme de desaprovação retiram a recompensa social do agressor, demonstrando que a turma não tolera aquele tipo de humor predatório.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Psicologia do Humor e Convivência Ética Escolar'
  },
  {
    id: 'medio_049',
    pergunta: 'Por que o uso de apelidos pejorativos que fazem alusão a marcas de nascença, cicatrizes ou problemas de saúde de um colega é considerado crueldade moral?',
    contexto: 'Apelidar um colega com histórico de queimadura na infância.',
    opcoes: [
      'Porque ataca elementos involuntários da história biológica do indivíduo, reabrindo dores e estigmatizando seu corpo perante a comunidade.',
      'Porque a lei só permite apelidos relacionados a personagens de desenhos animados.',
      'Apenas porque dificulta a chamada do professor no início de cada aula.',
      'Porque cicatrizes corporais desaparecem com o uso de hidratantes comuns.'
    ],
    correta: 0,
    explicacao: 'Estigmatizar marcas corporais é uma das facetas mais perversas do bullying físico-verbal, provocando isolamento e sofrimento psíquico profundo.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'respeito',
    referencia: 'Erving Goffman - Estigma: Notas sobre a Manipulação da Identidade Deteriorada'
  },
  {
    id: 'medio_050',
    pergunta: 'Qual a conduta ética ao se deparar com um colega postando declarações ofensivas no perfil de uma rede social aberta da escola?',
    contexto: 'Comentários tóxicos em uma foto da premiação acadêmica no mural digital.',
    opcoes: [
      'Não rebater com ofensas de mesmo nível, reportar o comentário à moderação da página da escola e orientar o autor a deletar a postagem para evitar consequências regimentais.',
      'Chamar dezenas de amigos para atacar em massa a foto do agressor com xingamentos criminosos.',
      'Curtir o comentário para ajudar a engajar a publicação na internet.',
      'Criar um perfil anônimo para ameaçar a família do autor da mensagem.'
    ],
    correta: 0,
    explicacao: 'A moderação responsável e a contenção de danos protegem a comunidade virtual da contaminação do ódio e ensinam limites cívicos nas redes.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Guia do Uso Responsável da Internet para Comunidades Escolares'
  },
  {
    id: 'medio_051',
    pergunta: 'Por que a exclusão de colegas com base na orientação sexual ou identidade de gênero é ilegal e antiética nas escolas brasileiras?',
    contexto: 'Estudante sofrendo piadas e exclusão sistemática por sua expressão de gênero.',
    opcoes: [
      'Porque a Constituição Federal e o Supremo Tribunal Federal asseguram a dignidade humana, a igualdade de todos perante a lei e a criminalização de condutas homofóbicas e transfóbicas.',
      'Porque a lei só protege estudantes maiores de idade em faculdades públicas.',
      'Porque apenas as escolas militares têm permissão para debater questões de gênero.',
      'Porque a escola pública não tem autoridade legal para interferir em apelidos entre alunos.'
    ],
    correta: 0,
    explicacao: 'O STF equiparou a homofobia e a transfobia aos crimes de racismo (ADO 26 e MI 4733). Discriminar estudantes por sua orientação é ilícito inafiançável e inaceitável.',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'STF - ADO 26 e Mandado de Injunção 4733'
  },
  {
    id: 'medio_052',
    pergunta: 'O que significa a "corresponsabilidade pelo clima escolar" entre estudantes, gestores e professores?',
    contexto: 'Elaboração do plano bianual de cultura de paz da unidade de ensino.',
    opcoes: [
      'A consciência de que um ambiente seguro e acolhedor não depende apenas de regras dos adultos, mas das atitudes diárias de todos os que convivem na instituição.',
      'A divisão do salário dos professores entre todos os estudantes matriculados.',
      'A obrigação dos alunos de limpar as salas de aula aos domingos pela manhã.',
      'A substituição de inspetores escolares por alunos sorteados a cada semana.'
    ],
    correta: 0,
    explicacao: 'O clima escolar é cocriado nas relações interpessoais. Quando os jovens assumem a liderança ética, o bullying perde espaço fértil para florescer.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Pesquisas sobre Clima Escolar e Convivência Democrática (GEPEC / Unicamp)'
  },
  {
    id: 'medio_053',
    pergunta: 'Qual a finalidade de se manter registro de evidências e relatos na apuração de denúncias escolares?',
    contexto: 'Gestão de casos na aba de mediação do painel administrativo.',
    opcoes: [
      'Subsidiar intervenções justas, prevenir injustiças baseadas em boatos sem provas e garantir o devido processo pedagógico com direito de manifestação a todos.',
      'Publicar as fotos dos estudantes punidos no jornal da cidade todo mês.',
      'Cobrar taxas financeiras dos pais dos estudantes que aparecem nos relatos.',
      'Criar uma lista pública de estudantes proibidos de participar da merenda.'
    ],
    correta: 0,
    explicacao: 'O devido processo legal e a apuração criteriosa protegem inocentes de falsas acusações e dão solidez às medidas de acolhimento e responsabilização.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'Constituição Federal de 1988, Art. 5º, LIV e LV'
  },
  {
    id: 'medio_054',
    pergunta: 'Como o estresse tóxico causado pelo bullying crônico afeta a memória de trabalho e a aprendizagem escolar?',
    contexto: 'Explicação neurocientífica sobre a queda súbita nas notas de alunos vitimizados.',
    opcoes: [
      'A liberação contínua de cortisol e adrenalina mantém o cérebro em modo de alerta de sobrevivência, sequestrando a capacidade de foco, retenção e raciocínio abstrato.',
      'O estresse faz os neurônios aumentarem de tamanho e melhora o raciocínio matemático rápido.',
      'Não há nenhum impacto cognitivo comprovado pela medicina contemporânea.',
      'O estresse apenas melhora a velocidade de escrita cursiva nas aulas de Português.'
    ],
    correta: 0,
    explicacao: 'A neurociência comprova que ninguém consegue aprender bem quando está sob medo constante. A segurança psicológica é pré-requisito biológico para a aprendizagem.',
    dificuldade: 'medio',
    categoria: 'consequencias',
    competencia: 'respeito',
    referencia: 'Center on the Developing Child - Harvard University (Toxic Stress)'
  },
  {
    id: 'medio_055',
    pergunta: 'Quando um aluno compartilha no StopBullying uma situação de risco de violência iminente no pátio, qual é o protocolo de triagem adotado pela equipe gestora?',
    contexto: 'Recebimento de denúncia com classificação de risco "Crítica SOS".',
    opcoes: [
      'A equipe verifica os detalhes no painel seguro, desloca servidores imediatamente para supervisionar o local indicado e toma medidas preventivas discretas sem expor a fonte.',
      'A direção anuncia no autofalante quem enviou o relato e pede para o agressor se apresentar na sala.',
      'A mensagem é ignorada até o encerramento do semestre letivo para apuração calma.',
      'O protocolo é deletado do sistema para evitar transtornos burocráticos.'
    ],
    correta: 0,
    explicacao: 'A triagem de urgência atua com rapidez e discrição: reforça a presença preventiva nos locais indicados e aborda os envolvidos sem vincular o aviso a ninguém.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'Protocolo Operacional Padrão de Mediação Escolar StopBullying'
  },
  {
    id: 'medio_056',
    pergunta: 'O que diferencia um "pedido sincero de desculpas restaurativo" de uma simples desculpa formal protocolar?',
    contexto: 'Etapa final de um círculo de resolução de atrito entre estudantes.',
    opcoes: [
      'O pedido restaurativo inclui reconhecimento explícito do dano causado, demonstração de empatia pela dor da vítima e uma proposta concreta de reparação e mudança de atitude.',
      'A desculpa restaurativa é obrigatoriamente redigida em latim e assinada por um juiz.',
      'Não há diferença alguma, bastando falar a palavra "desculpa" em voz alta para anular qualquer culpa.',
      'O pedido restaurativo exige que o agressor pague uma quantia em dinheiro para a escola.'
    ],
    correta: 0,
    explicacao: 'A restauração exige reflexão moral profunda. Dizer "desculpa" sem entender o mal provocado e sem mudar de conduta é apenas uma formalidade vazia.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Howard Zehr - Trocando as Lentes: Um Novo Foco sobre a Justiça Restaurativa'
  },
  {
    id: 'medio_057',
    pergunta: 'Por que o uso de celulares em sala de aula sem finalidade pedagógica aumenta as chances de episódios de cyberbullying velado?',
    contexto: 'Discussão sobre regulamentação do uso de aparelhos móveis no ambiente escolar.',
    opcoes: [
      'Porque favorece a distração, facilita gravações e fotos clandestinas sem consentimento de colegas e professores e alimenta fofocas em grupos durante o horário da aula.',
      'Porque as ondas de rádio dos celulares apagam os registros do quadro branco.',
      'Porque os celulares consomem toda a energia elétrica do prédio escolar.',
      'Porque celulares são legalmente proibidos de serem transportados dentro de mochilas.'
    ],
    correta: 0,
    explicacao: 'A proliferação de fotos escondidas e chacotas em tempo real durante as aulas é um dos efeitos colaterais mais nocivos do uso descontrolado de telas na escola.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Relatório GEM UNESCO sobre Tecnologia na Educação (A Tool on Whose Terms?)'
  },
  {
    id: 'medio_058',
    pergunta: 'Qual a importância de se valorizar o estudante que denuncia uma situação grave de bullying, mesmo que ele não seja a vítima direta?',
    contexto: 'Comentários de que "quem denuncia é fofoqueiro ou dedo-duro".',
    opcoes: [
      'Desmistificar o estigma do "dedo-duro" e reconhecer que quem denuncia quebra o pacto da violência e age como cidadão corajoso em defesa da vida e da dignidade humana.',
      'Dar notas dez automáticas para o denunciante em todas as matérias escolares.',
      'Fazer uma homenagem com foto dele no mural da entrada da escola.',
      'Nomear o estudante como diretor substituto da instituição.'
    ],
    correta: 0,
    explicacao: 'Proteger a vida e a integridade de um colega não é fofoca; é coragem moral e cidadania ativa. O silêncio cúmplice é que protege a covardia.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Cidadania Ativa e Ética da Responsabilidade (Hans Jonas)'
  },
  {
    id: 'medio_059',
    pergunta: 'Quando um aluno é alvo de "zoação" por suas notas altas e por gostar de estudar, que tipo de distorção de valores ocorre no grupo?',
    contexto: 'Rotulagem pejorativa de estudantes estudiosos como "nerds chatos".',
    opcoes: [
      'Inversão de valores onde o empenho e o amor ao conhecimento são punidos pelo grupo como forma de nivelar todos por baixo e mascarar as próprias inseguranças.',
      'Uma brincadeira saudável que ajuda o estudante a estudar menos e descansar mais.',
      'A constatação científica de que estudar demais faz mal para a visão dos adolescentes.',
      'Um método aprovado pelo regimento escolar para equilibrar as médias da turma.'
    ],
    correta: 0,
    explicacao: 'A hostilização a quem se dedica aos estudos visa rebaixar o padrão acadêmico e esconder a frustração de quem não se empenha, devendo ser energicamente combatida.',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    referencia: 'Sociologia da Educação e Relações de Pares na Juventude'
  },
  {
    id: 'medio_060',
    pergunta: 'Qual o dever de um administrador ou moderador de um grupo de WhatsApp de turma ao presenciar um membro sendo achincalhado?',
    contexto: 'Administrador de grupo escolar assistindo a linchamento virtual de um colega.',
    opcoes: [
      'Intervir prontamente, apagar as mensagens ofensivas, advertir e, se necessário, remover o agressor e acionar a coordenação escolar.',
      'Apagar o grupo e fingir que nunca administrou nenhuma conversa virtual.',
      'Mudar a foto do grupo para a imagem vexatória da vítima para ganhar curtidas.',
      'Cobrar taxa em dinheiro dos membros para parar com as ofensas.'
    ],
    correta: 0,
    explicacao: 'Quem cria e administra grupos detém dever de moderação e zelo pela civilidade do ambiente virtual, podendo responder civilmente por omissão culposa.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Responsabilidade Civil de Administradores de Grupos em Aplicativos de Mensagens'
  },
  {
    id: 'medio_061',
    pergunta: 'O que define o conceito de "microagressão" na rotina das relações interpessoais escolares?',
    contexto: 'Comentários sutis diários que incomodam colegas sem chegar a ofensas escancaradas.',
    opcoes: [
      'Comentários, gestos ou insinuações breves e cotidianas que transmitem hostilidade, desdém ou mensagens preconceituosas sutis contra indivíduos vulneráveis.',
      'Pequenos choques elétricos provocados por fiação defeituosa de ventiladores.',
      'Agressões físicas que duram menos de cinco segundos na fila da merenda.',
      'Erros ortográficos pequenos em redações de língua portuguesa.'
    ],
    correta: 0,
    explicacao: 'As microagressões operam como "gotas d\'água contínuas" que minam a saúde emocional e sinalizam que a pessoa não é bem-vinda naquele espaço.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Derald Wing Sue - Microaggressions in Everyday Life'
  },
  {
    id: 'medio_062',
    pergunta: 'Como o projeto Ceará Científico e eventos acadêmicos similares incentivam a convivência ética e a cooperação entre estudantes?',
    contexto: 'Participação da EEMTI Alfredo Machado em mostras científicas regionais e estaduais.',
    opcoes: [
      'Promovendo o protagonismo juvenil através da pesquisa colaborativa, da resolução de problemas reais da comunidade e do respeito à diversidade de saberes.',
      'Obrigando as escolas a competirem agressivamente sem permitir diálogo entre os estudantes participantes.',
      'Cancelando todas as aulas teóricas do estado do Ceará durante o mês de outubro.',
      'Substituindo a convivência humana por apresentações virtuais gravadas sem público presente.'
    ],
    correta: 0,
    explicacao: 'A ciência na escola educa para a solidariedade e a escuta rigorosa: os estudantes trabalham juntos para construir soluções pacíficas e humanas para seus territórios.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Diretrizes do Programa Ceará Científico (SEDUC-CE)'
  },
  {
    id: 'medio_063',
    pergunta: 'O que a escola deve fazer ao receber uma denúncia anônima com provas anexadas (como prints e áudios)?',
    contexto: 'Denúncia recebida pelo comitê de mediação da escola.',
    opcoes: [
      'Verificar a consistência técnica das provas, preservar o sigilo das fontes, ouvir as partes envolvidas separadamente e desenhar o plano de acolhimento e reparação.',
      'Imprimir os prints e colocar no mural da entrada da escola com os nomes completos dos envolvidos.',
      'Encaminhar os prints para grupos de WhatsApp de pais para que debatam publicamente.',
      'Descartar a denúncia caso o arquivo anexado tenha sido enviado após as 18 horas.'
    ],
    correta: 0,
    explicacao: 'O tratamento prudente do relato preserva o sigilo e a dignidade de todos, permitindo agir com base em evidências concretas e sem escândalos estéreis.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'Protocolo de Gestão de Casos Sensíveis em Escolas Públicas'
  },
  {
    id: 'medio_064',
    pergunta: 'Por que o uso da ironia sarcástica constante por educadores em sala de aula pode configurar violência psicológica pedagógica?',
    contexto: 'Professor zombando publicamente da caligrafia ou do erro de um aluno no quadro.',
    opcoes: [
      'Porque utiliza o desequilíbrio de autoridade docente para humilhar o estudante perante o grupo, gerando bloqueios pedagógicos e traumas de autoeficácia.',
      'Porque a lei proíbe os professores de usarem figuras de linguagem em sala de aula.',
      'Apenas porque faz a aula atrasar e não dá tempo de terminar a matéria do livro.',
      'Porque professores só podem falar através de bilhetes formais carimbados.'
    ],
    correta: 0,
    explicacao: 'O sarcasmo docente fere a ética pedagógica. O papel do educador é iluminar o erro como oportunidade de aprendizagem, jamais como combustível para o escárnio coletivo.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'ECA, Artigo 53, II (Direito a ser respeitado pelos educadores)'
  },
  {
    id: 'medio_065',
    pergunta: 'Quando dois estudantes que brigaram chegam a um acordo no círculo de mediação e cumprem suas metas de respeito mútuo, qual é o desfecho ético correto?',
    contexto: 'Acompanhamento de 30 dias após a sessão restaurativa na escola.',
    opcoes: [
      'Celebrar o restabelecimento da paz, arquivar o caso com feedback positivo e reconhecer a maturidade de ambos os estudantes sem reabrir estigmas passados.',
      'Lembrar os estudantes todos os dias de que eles já foram brigões no passado.',
      'Contar para toda a escola os detalhes do que foi conversado em sigilo durante a mediação.',
      'Exigir que eles nunca mais frequentem o mesmo horário de recreio.'
    ],
    correta: 0,
    explicacao: 'A eficácia da justiça restaurativa fecha ciclos e permite que os estudantes sigam em frente sem rótulos permanentes que os condenem para sempre.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Princípios da Reintegração Restaurativa Comunitária'
  },
  {
    id: 'medio_066',
    pergunta: 'O que significa o conceito de "autocuidado digital" para adolescentes que usam mídias sociais?',
    contexto: 'Oficina de saúde mental e bem-estar na era dos smartphones.',
    opcoes: [
      'A prática consciente de limitar o tempo de tela, silenciar notificações tóxicas, não se comparar com padrões irreais e preservar a vida privada fora das redes.',
      'Instalar todos os aplicativos que os colegas recomendam no aparelho telefônico.',
      'Nunca desligar o celular durante a noite para responder mensagens imediatamente.',
      'Aceitar qualquer pessoa desconhecida que pedir para ser amiga na internet.'
    ],
    correta: 0,
    explicacao: 'O autocuidado digital protege a saúde mental contra a sobrecarga informacional e o vício em dopamina das redes sociais.',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Manual de Saúde Mental e Tecnologia (Sociedade Brasileira de Pediatria)'
  },
  {
    id: 'medio_067',
    pergunta: 'Qual o valor da "reparação simbólica" quando um aluno cometeu uma ofensa verbal pública contra a turma inteira?',
    contexto: 'Estudante que xingou a sala após perder uma gincana e quis se retratar.',
    opcoes: [
      'Propor uma ação construtiva que beneficie a coletividade (como uma carta de retratação, organização de um lanche compartilhado ou colaboração em um projeto comunitário).',
      'Pagar uma multa financeira para cada um dos trinta colegas de sala.',
      'Ficar em pé na frente do quadro com os braços abertos durante três aulas seguidas.',
      'Ser proibido de falar qualquer palavra até o fim do semestre letivo.'
    ],
    correta: 0,
    explicacao: 'A reparação simbólica restaura a dignidade do coletivo através de um ato concreto de generosidade e reconhecimento da ofensa praticada.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Práticas Circulares e Reparação Simbólica nas Escolas'
  },
  {
    id: 'medio_068',
    pergunta: 'Como a "segurança psicológica" no ambiente de sala de aula impacta o aprendizado dos estudantes mais tímidos?',
    contexto: 'Observação pedagógica de turmas com alta participação em perguntas e dúvidas.',
    opcoes: [
      'Garante que os alunos possam fazer perguntas, errar e expressar dúvidas sem medo de serem ridicularizados por colegas ou professores, acelerando a aprendizagem.',
      'Faz com que todos os estudantes tirem nota dez sem precisar fazer provas escritas.',
      'Elimina a necessidade de fazer exercícios em casa nos finais de semana.',
      'Obriga a escola a ter psicólogos em tempo integral dentro de todas as salas.'
    ],
    correta: 0,
    explicacao: 'Amy Edmondson (Harvard) demonstrou que equipes e turmas com segurança psicológica inovam e aprendem muito mais porque não têm medo do erro natural do processo.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Amy Edmondson - The Fearless Organization (A Organização Sem Medo)'
  },
  {
    id: 'medio_069',
    pergunta: 'Qual a consequência de se tolerar "pequenas piadas humilhantes" no início do ano letivo sem nenhuma repreensão pedagógica?',
    contexto: 'Teoria da janela quebrada aplicada ao clima escolar.',
    opcoes: [
      'Cria-se a percepção de que a violência leve é aceita, normalizando a escalada para agressões mais severas e humilhações sistemáticas ao longo do ano.',
      'A turma se torna automaticamente mais amiga e sem nenhum tipo de briga no futuro.',
      'Os alunos agressores cansam rapidamente de fazer piadas e viram anjos da paz.',
      'A diretoria da escola recebe uma premiação de boas práticas de convivência.'
    ],
    correta: 0,
    explicacao: 'Ambientes que toleram o desrespeito inicial transmitem a mensagem de anomia (ausência de normas), permitindo que a violência cresça sem freios.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'bullying',
    referencia: 'Teoria das Janelas Quebradas Aplicada à Sociologia Escolar'
  },
  {
    id: 'medio_070',
    pergunta: 'O que caracteriza a prática da "escuta ativa reflexiva" quando um colega procura você para desabafar?',
    contexto: 'Conversa no banco do pátio durante o horário do almoço da EEMTI.',
    opcoes: [
      'Ouvir sem interromper para falar de si mesmo, parafrasear o que ouviu ("Entendo que você se sentiu muito triste quando...") e demonstrar presença genuína.',
      'Ficar mexendo no celular e dizendo "aham" a cada cinco minutos sem olhar nos olhos.',
      'Dizer que você tem problemas muito maiores e que a dor do colega é insignificante.',
      'Contar a história do colega para as outras pessoas assim que ele terminar de falar.'
    ],
    correta: 0,
    explicacao: 'A escuta reflexiva é um espelho acolhedor: organiza os sentimentos de quem fala e constrói laços de intimidade ética e alívio psicológico.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Habilidades de Aconselhamento e Escuta Empática'
  },
  {
    id: 'medio_071',
    pergunta: 'Por que o envolvimento dos próprios estudantes como "monitores de paz e mediação" reduz drasticamente as ocorrências de bullying?',
    contexto: 'Programa de tutoria de pares implementado na escola.',
    opcoes: [
      'Porque a linguagem e a proximidade entre pares facilitam o diálogo precoce nos espaços onde os adultos muitas vezes não estão presentes.',
      'Porque os alunos monitores passam a ter o poder de expulsar qualquer colega sem consultar a direção.',
      'Porque os monitores de paz ganham dinheiro da prefeitura para policiar os corredores.',
      'Porque a presença de monitores de paz elimina a necessidade de existir professores.'
    ],
    correta: 0,
    explicacao: 'A mediação por pares empodera os jovens como protagonistas da paz, quebrando a cumplicidade silenciosa e resolvendo conflitos na fase embrionária.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Tutoria de Pares e Mediação Escolar Juvenil (UNESCO)'
  },
  {
    id: 'medio_072',
    pergunta: 'Quando uma vítima de cyberbullying teme que denunciar piore as coisas, qual garantia o sistema do StopBullying oferece?',
    contexto: 'Dúvida frequente de estudantes que hesitam em registrar um relato.',
    opcoes: [
      'Garante que nenhum dado de aparelho, rede ou identidade é capturado, e o encaminhamento é feito de forma sigilosa diretamente aos mediadores da escola indicada.',
      'Garante que a polícia militar entrará armada na sala de aula no mesmo instante.',
      'Garante que o agressor será transferido para outro estado da federação.',
      'Garante que a vítima nunca mais precisará fazer trabalhos em grupo na vida.'
    ],
    correta: 0,
    explicacao: 'O sigilo estrito quebra o ciclo do medo: o estudante pode falar sem temer que o agressor descubra de onde partiu o alerta.',
    dificuldade: 'medio',
    categoria: 'direitos',
    competencia: 'direitos',
    referencia: 'Arquitetura de Segurança de Denúncias Seguras StopBullying'
  },
  {
    id: 'medio_073',
    pergunta: 'Qual o papel da gratidão e do elogio sincero na construção de um clima escolar positivo?',
    contexto: 'Iniciativa de "mural de recados positivos e elogios" no corredor principal.',
    opcoes: [
      'Reconhece o esforço e as qualidades dos colegas, eleva a autoestima coletiva e substitui a cultura da crítica corrosiva pela valorização mútua.',
      'Serve apenas para enfeitar as paredes da escola para visitas de autoridades governamentais.',
      'Obriga todos os estudantes a ganharem notas extras no final de cada bimestre letivo.',
      'Faz com que os alunos fiquem vaidosos e parem de estudar as matérias difíceis.'
    ],
    correta: 0,
    explicacao: 'A psicologia positiva demonstra que elogios autênticos ativam circuitos de recompensa e pertencimento, gerando um ambiente de generosidade recíproca.',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Martin Seligman - Florescer e a Psicologia Positiva'
  },
  {
    id: 'medio_074',
    pergunta: 'Se um colega de turma cometer um ato indisciplinado isolado, por que não se deve rotulá-lo permanentemente de "o delinquente da sala"?',
    contexto: 'Discussão sobre o perigo dos rótulos sociais (labeling theory).',
    opcoes: [
      'Porque os rótulos aprisionam a pessoa em uma identidade negativa, estimulando-a a continuar agindo mal para corresponder à expectativa que o grupo criou sobre ela.',
      'Porque a lei brasileira proíbe qualquer tipo de comentário sobre notas escolares.',
      'Porque todo estudante que comete um erro deve ser premiado com medalhas de ouro.',
      'Porque ninguém comete erros na adolescência por definição da psicologia.'
    ],
    correta: 0,
    explicacao: 'A teoria do etiquetamento (labeling) demonstra que o rótulo negativo funciona como profecia autorrealizável. Deve-se condenar o ato, mas acolher e acreditar no potencial da pessoa.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Howard Becker - Outsiders: Estudos de Sociologia do Desvio'
  },
  {
    id: 'medio_075',
    pergunta: 'Em última análise, por que o respeito e a cultura de paz nas escolas são as maiores ferramentas de transformação social de uma nação?',
    contexto: 'Conclusão da trilha de desenvolvimento intermediário da Central de Respeito.',
    opcoes: [
      'Porque jovens que aprendem a conviver com alteridade, dialogar na divergência e rejeitar a violência tornam-se cidadãos éticos que constroem uma sociedade justa, democrática e fraterna.',
      'Porque escolas com cultura de paz gastam menos giz e economizam eletricidade no final do ano.',
      'Porque os estudantes que não brigam recebem carros novos do governo federal.',
      'Porque elimina a necessidade de existirem leis e tribunais de justiça no futuro.'
    ],
    correta: 0,
    explicacao: 'A escola é o microcosmo da sociedade. Quando formamos mentes pacíficas e empáticas na juventude, curamos a violência da sociedade no futuro.',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Manifesto 2000 por uma Cultura de Paz e Não-Violência (UNESCO)'
  }
];




export const MEDIO_QUIZZES: QuizItem[] = [
  {
    id: 'quiz_medio_01',
    titulo: 'Assimetria de Poder e Silenciamento',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'bullying',
    enunciado: 'Em uma análise comportamental no ambiente escolar, qual critério técnico diferencia o "conflito interpessoal circunstancial" da "intimidação sistemática (bullying)"?',
    contexto: 'Relatório da comissão de convivência analisando uma sucessão de atritos entre alunos no Ensino Médio.',
    opcoes: [
      'A intimidação sistemática pressupõe assimetria de poder (físico, social ou psicológico), intencionalidade de causar sofrimento e repetição ao longo do tempo.',
      'O conflito circunstancial envolve agressão física grave, enquanto o bullying limita-se exclusivamente a xingamentos e apelidos.',
      'A intimidação sistemática ocorre unicamente quando há mais de cinco agressores atuando contra um único indivíduo isolado.',
      'O conflito circunstancial ocorre apenas entre estudantes de turmas diferentes, enquanto o bullying só existe entre colegas de mesma sala.'
    ],
    correta: 0,
    explicacao: 'A Lei nº 13.185/2015 define como intimidação sistemática todo ato de violência física ou psicológica, intencional e repetitivo, praticado sem motivação evidente em desequilíbrio de poder entre as partes.',
    justificativaIncorretas: [
      'O bullying pode englobar violência física grave, não se restringindo a agressões verbais.',
      'O número de agressores não é fixado em cinco; o ato pode ser cometido individualmente ou em grupo.',
      'A distribuição por turmas não define a tipologia; intimidações ocorrem tanto intra quanto interclasses.'
    ],
    referencia: 'Lei Federal nº 13.185/2015, Art. 1º, § 1º',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_medio_02',
    titulo: 'Inversão de Culpa e Minimização',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'bullying',
    enunciado: 'Um estudante passa a ser alvo de piadas diárias em sala. Ao reclamar, o autor rebate dizendo: "Você não aguenta brincadeira, é muito sensível!". Essa atitude caracteriza qual mecanismo psicológico?',
    contexto: 'Situação observada com frequência em dinâmicas de bullying verbal velado.',
    opcoes: [
      'Inversão de culpa e desqualificação da dor da vítima (gaslighting/minimização do dano).',
      'Validação emocional preventiva e acolhimento reflexivo.',
      'Exercício pedagógico legítimo de desenvolvimento da resiliência do educando.',
      'Comunicação não-violenta voltada à resolução rápida de atrito.'
    ],
    correta: 0,
    explicacao: 'Transferir a culpa para a vítima, acusando-a de "fragilidade" ou "falta de humor", é mecanismo típico de agressores para mascarar o abuso e desarmar a queixa legítima.',
    justificativaIncorretas: [
      'Validação emocional é o ato oposto: reconhecer e respeitar o sentimento do outro.',
      'Submeter alguém a humilhações não desenvolve resiliência sadia; gera estresse tóxico e traumas.',
      'A CNV busca empatia e responsabilização, jamais a desqualificação sarcástica do outro.'
    ],
    referencia: 'Psicologia do Assédio Moral nas Relações Escolares',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_medio_03',
    titulo: 'Inovações Penais da Lei nº 14.811/2024',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'A Lei Federal nº 14.811/2024 introduziu inovações cruciais no ordenamento jurídico brasileiro no tocante à proteção infanto-juvenil. Qual foi a principal alteração relacionada ao bullying?',
    contexto: 'Reunião de alinhamento com a diretoria sobre o marco penal vigente no Brasil.',
    opcoes: [
      'Tipificou expressamente o bullying e o cyberbullying no Artigo 146-A do Código Penal, agravando as penas quando cometido em ambientes digitais.',
      'Extinguiu os conselhos tutelares e delegou aos grêmios escolares o poder de julgar crimes de internet.',
      'Descriminalizou brigas de rua envolvendo adolescentes em horário de recreio.',
      'Proibiu o uso de computadores por estudantes menores de 18 anos em todo o território nacional.'
    ],
    correta: 0,
    explicacao: 'A Lei nº 14.811/2024 incluiu o Art. 146-A no Código Penal (intimidação sistemática individual ou em grupo) e estabeleceu pena de reclusão de 2 a 4 anos para a modalidade virtual (cyberbullying).',
    justificativaIncorretas: [
      'Os Conselhos Tutelares permanecem plenamente vigentes e com atribuições fortalecidas pelo ECA.',
      'A legislação penal não descriminalizou agressões físicas entre jovens.',
      'O acesso digital é direito previsto no Marco Civil; a lei penal coíbe os abusos e crimes digitais.'
    ],
    referencia: 'Código Penal Brasileiro, Art. 146-A (redação dada pela Lei nº 14.811/2024)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_medio_04',
    titulo: 'O Papel do Espectador Reforçador',
    dificuldade: 'medio',
    categoria: 'espectador',
    competencia: 'convivencia',
    enunciado: 'Ao analisar a postura de um espectador de bullying, qual perfil é classificado pela literatura pedagógica como "espectador reforçador"?',
    contexto: 'Dinâmica de papéis sociais na intimidação escolar.',
    opcoes: [
      'Aquele que não inicia o ataque, mas ri, aplaude, compartilha ou estimula verbalmente o agressor a prosseguir.',
      'Aquele que se coloca entre o agressor e a vítima para encerrar imediatamente a contenda.',
      'Aquele que busca ajuda de um coordenador de forma silenciosa e protegida.',
      'Aquele que acolhe a vítima no intervalo oferecendo escuta empática.'
    ],
    correta: 0,
    explicacao: 'O espectador reforçador é a plateia que alimenta o ego do agressor. Sem o riso e a aprovação desse grupo, a maioria dos agressores perde o incentivo para continuar a intimidação.',
    justificativaIncorretas: [
      'Quem intervém diretamente para defender a vítima atua como defensor ativo.',
      'Quem aciona a equipe pedagógica atua como aliado protetor.',
      'Quem oferece escuta e apoio emocional atua como suporte solidário.'
    ],
    referencia: 'Estudos de Dan Olweus sobre Dinâmicas de Grupo no Bullying Escolar',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_medio_05',
    titulo: 'Vazamento de Dados e LGPD Escolar',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'direitos',
    enunciado: 'Estudantes criam uma lista online contendo notas baixas, históricos médicos e endereços de colegas da turma. Sob a ótica da Lei Geral de Proteção de Dados (LGPD), essa conduta constitui:',
    contexto: 'Divulgação indevida de dados pessoais sensíveis em fórum escolar.',
    opcoes: [
      'Tratamento e vazamento ilícito de dados pessoais sensíveis de crianças e adolescentes, violando o princípio da proteção integral e a privacidade.',
      'Exercício normal de transparência acadêmica permitido aos representantes de classe.',
      'Prática lícita desde que os dados tenham sido obtidos em conversas de corredor.',
      'Infração tributária contra o Ministério da Fazenda.'
    ],
    correta: 0,
    explicacao: 'O Art. 14 da LGPD exige que o tratamento de dados de menores ocorra com consentimento e no melhor interesse da criança/adolescente. Divulgar dados íntimos é ilícito gravíssimo.',
    justificativaIncorretas: [
      'Representantes de turma não possuem autoridade para divulgar dados privados de colegas.',
      'A obtenção informal em corredores não legaliza a divulgação pública desautorizada.',
      'A violação é de direito de privacidade e proteção de dados, não de legislação tributária.'
    ],
    referencia: 'Lei Geral de Proteção de Dados (Lei nº 13.709/2018), Art. 14',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_medio_06',
    titulo: 'A Rotação de Papéis na Convivência',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'bullying',
    enunciado: 'Pesquisas em psicologia educacional identificam o perfil da "vítima-agressora" (ou agressor-vitimizado). O que define esse estudante?',
    contexto: 'Estudo pedagógico sobre a complexidade dos laços relacionais na escola.',
    opcoes: [
      'O estudante que sofre bullying em determinado ambiente (como em casa ou com turmas mais velhas) e desconta a frustração agredindo colegas menores ou mais vulneráveis.',
      'Aquele que nunca participou de nenhuma interação social e desconhece qualquer conflito.',
      'O estudante que atua como mediador oficial da comissão de ética escolar.',
      'Aquele que possui imunidade diplomática internacional outorgada pela UNESCO.'
    ],
    correta: 0,
    explicacao: 'Vítimas-agressoras representam um dos grupos de maior vulnerabilidade psicológica: reproduzem a violência sofrida como mecanismo distorcido de recuperação de controle e poder.',
    justificativaIncorretas: [
      'A ausência total de interações caracteriza isolamento, não a dinâmica de vítima-agressora.',
      'Mediadores exercem papel pacificador consciente, oposto à reprodução reativa de agressões.',
      'Conceitos de imunidade diplomática não se aplicam a dinâmicas comportamentais entre estudantes.'
    ],
    referencia: 'Pesquisas sobre Perfis do Bullying (Fante, C. - Fenômeno Bullying)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_medio_07',
    titulo: 'Justiça Restaurativa vs Punitivismo',
    dificuldade: 'medio',
    categoria: 'mediacao',
    competencia: 'convivencia',
    enunciado: 'Qual é o pressuposto central da Justiça Restaurativa aplicada ao ambiente escolar em comparação com a punição disciplinar tradicional?',
    contexto: 'Implementação de círculos de construção de paz na escola.',
    opcoes: [
      'Focar na reparação do dano, na responsabilização consciente e na restauração das relações, em vez de apenas aplicar sanções punitivas que isolam o infrator.',
      'Eliminar completamente todas as regras escolares e deixar que os alunos façam o que quiserem.',
      'Substituir os professores por juízes togados em todas as decisões de sala de aula.',
      'Impor castigos físicos aos estudantes para assegurar disciplina militar.'
    ],
    correta: 0,
    explicacao: 'A Justiça Restaurativa entende que a transgressão fere pessoas e laços comunitários. O processo busca entender necessidades, reparar o dano e reinserir todos na convivência ética.',
    justificativaIncorretas: [
      'A metodologia não abole normas; pelo contrário, fortalece o senso de responsabilidade mútua.',
      'A mediação é pedagógica e comunitária, sem necessidade de judicialização formal do ambiente de aula.',
      'Castigos físicos são proibidos por lei no Brasil (Lei Menino Bernardo nº 13.010/2014) e violam direitos humanos.'
    ],
    referencia: 'Resolução CNJ nº 225/2016 (Política Nacional de Justiça Restaurativa)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_medio_08',
    titulo: 'Doxxing e Linchamento Virtual',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    enunciado: 'Descobrir e publicar em redes sociais o telefone residencial, endereço e rotina da família de um colega para estimular ataques coletivos é uma prática conhecida como:',
    contexto: 'Ataque digital coordenado contra um estudante após discussão em jogo eletrônico.',
    opcoes: [
      'Doxxing, uma tática perigosa de assédio virtual que coloca a segurança física e psicológica da pessoa em risco iminente.',
      'Jornalismo investigativo comunitário protegido pela Lei de Acesso à Informação.',
      'Brincadeira inofensiva de detetive digital que não causa danos no mundo real.',
      'Procedimento padrão de triagem de segurança exigido pelos provedores de internet.'
    ],
    correta: 0,
    explicacao: 'O doxxing quebra a barreira entre o mundo digital e a segurança física, expondo a vítima a perseguições, ameaças e linchamentos por terceiros.',
    justificativaIncorretas: [
      'A Lei de Acesso à Informação aplica-se a órgãos públicos, não autorizando invasão de privacidade de cidadãos.',
      'Expor dados residenciais para mobilizar hostilidade coletiva é crime e gera pânico real.',
      'Provedores de internet não realizam nem autorizam vazamento de informações privadas de usuários.'
    ],
    referencia: 'Código Penal, Art. 147-A (Crime de Perseguição / Stalking) e Lei nº 14.811/2024',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_medio_09',
    titulo: 'Estatuto da Criança e o Princípio da Proteção Integral',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'O Artigo 18 do Estatuto da Criança e do Adolescente (ECA) estabelece que é dever de todos velar pela dignidade da criança e do adolescente. Como isso se aplica ao bullying?',
    contexto: 'Debate jurídico-pedagógico sobre a corresponsabilidade social na proteção infanto-juvenil.',
    opcoes: [
      'Pondo-os a salvo de qualquer tratamento desumano, violento, aterrorizante, vexatório ou constrangedor no ambiente escolar e comunitário.',
      'Garantindo que apenas os pais biológicos possam interferir quando houver agressões físicas.',
      'Isentando a escola de qualquer dever de custódia fora do horário estrito de provas escritas.',
      'Proibindo os estudantes de denunciarem colegas que pertençam a famílias influentes na cidade.'
    ],
    correta: 0,
    explicacao: 'O ECA coloca crianças e adolescentes como sujeitos prioritários de direitos. Qualquer situação que cause vexame ou humilhação sistemática viola frontalmente o Art. 18.',
    justificativaIncorretas: [
      'O dever de proteção é compartilhado por toda a sociedade, Estado e comunidade escolar, não apenas pelos pais.',
      'O dever de custódia da escola abrange todo o período em que o estudante estiver sob sua guarda institucional.',
      'A lei é impessoal e universal; ninguém tem imunidade ou privilégio para cometer abusos.'
    ],
    referencia: 'Estatuto da Criança e do Adolescente (Lei nº 8.069/1990), Artigo 18',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_medio_10',
    titulo: 'Gossip Pages e Fofocas Escolares',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    enunciado: 'A proliferação de perfis anônimos de "confissões" ou "fofocas escolares" no Instagram e TikTok frequentemente descamba para crimes contra a honra. Quais crimes são esses?',
    contexto: 'Investigação pedagógica sobre postagens que atacam a reputação de alunos e servidores.',
    opcoes: [
      'Calúnia (imputar falsamente crime), Difamação (imputar fato desonroso) e Injúria (ofender a dignidade ou o decoro).',
      'Pirataria marítima, contrabando de café e evasão de divisas internacionais.',
      'Infração administrativa de trânsito em rodovias federais pedagiadas.',
      'Não existem crimes contra a honra quando as postagens são feitas em redes sociais estrangeiras.'
    ],
    correta: 0,
    explicacao: 'Os crimes contra a honra (Arts. 138, 139 e 140 do CP) aplicam-se plenamente ao meio digital, com causas de aumento de pena quando cometidos por meio de ampla divulgação na internet.',
    justificativaIncorretas: [
      'Pirataria marítima e contrabando são crimes aduaneiros e de navegação sem correlação com difamação.',
      'Normas de trânsito regulam circulação viária, não relações interpessoais virtuais.',
      'A lei penal brasileira aplica-se a crimes cometidos em território nacional ou que nele produzam efeitos.'
    ],
    referencia: 'Código Penal Brasileiro, Arts. 138 a 141 (Crimes Contra a Honra)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_medio_11',
    titulo: 'Bullying Homofóbico e Transfóbico',
    dificuldade: 'medio',
    categoria: 'direitos',
    competencia: 'direitos',
    enunciado: 'A perseguição e exclusão sistemática motivadas por orientação sexual ou identidade de gênero no espaço escolar configuram, além de bullying:',
    contexto: 'Caso de estudante que sofre ataques diários por sua expressão de gênero.',
    opcoes: [
      'Conduta equiparada ao crime de racismo conforme jurisprudência vinculante do Supremo Tribunal Federal (STF - ADO 26).',
      'Mera divergência religiosa que deve ser tolerada pela escola sem qualquer intervenção.',
      'Direito de preferência esportiva resguardado pelo Comitê Olímpico Brasileiro.',
      'Comportamento incentivado para fortalecimento de tradições comunitárias.'
    ],
    correta: 0,
    explicacao: 'O STF equiparou a homotransfobia ao crime de racismo (Lei nº 7.716/1989), sendo conduta inafiançável e imprescritível que atenta contra a igualdade e dignidade fundamentais.',
    justificativaIncorretas: [
      'A liberdade de crença não autoriza a prática de discriminação, discursos de ódio ou perseguição a indivíduos.',
      'Regulamentos esportivos não se sobrepõem às garantias constitucionais e aos direitos humanos.',
      'Tradições que violam a dignidade humana não são justificativas legítimas para perpetuar violências.'
    ],
    referencia: 'STF - Ação Direta de Inconstitucionalidade por Omissão (ADO 26) e Lei nº 7.716/1989',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_medio_12',
    titulo: 'A Importância do Relato Seguro',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'direitos',
    enunciado: 'Qual é a diferença ética entre o "relato protetivo de denúncia" e a atitude depreciada popularmente como "fofoca"?',
    contexto: 'Debate em sala sobre o medo de testemunhas serem chamadas pejorativamente de "dedo-duro".',
    opcoes: [
      'O relato protetivo visa cessar o sofrimento de alguém e restaurar a segurança; a fofoca visa expor, humilhar e obter entretenimento à custa alheia.',
      'Não há nenhuma diferença, pois ambos têm como única intenção prejudicar os colegas envolvidos.',
      'O relato protetivo só tem valor se for publicado no mural aberto de avisos da escola.',
      'A fofoca é um dever cívico do estudante, enquanto a denúncia de proteção é proibida.'
    ],
    correta: 0,
    explicacao: 'Romper o silêncio para proteger a vida e a integridade de alguém é ato de coragem e solidariedade cidadã. A fofoca, ao contrário, degrada e amplia o mal-estar social.',
    justificativaIncorretas: [
      'A intenção e o impacto social são radicalmente opostos: um protege, a outra destrói relações.',
      'A denúncia responsável preza pelo sigilo ético e acolhimento pedagógico, não pela exposição em murais.',
      'A fofoca é deseducativa e danosa, enquanto a comunicação com a equipe de proteção é direito de todos.'
    ],
    referencia: 'Ética e Cidadania no Ambiente Escolar (MEC)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['escudo_inabalavel']
  },
  {
    id: 'quiz_medio_13',
    titulo: 'Responsabilidade Civil Indireta dos Pais',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'De acordo com o Código Civil brasileiro (Art. 932, Inciso I), qual é a responsabilidade dos pais pelos atos ilícitos cometidos por seus filhos menores?',
    contexto: 'Ação judicial movida por danos morais e despesas psicológicas decorrentes de bullying praticado por aluno.',
    opcoes: [
      'Os pais respondem civilmente pela reparação dos danos materiais e morais causados por seus filhos menores que estiverem sob sua autoridade.',
      'Os pais são legalmente isentos de qualquer responsabilidade patrimonial se comprovarem que colocaram o filho na escola.',
      'A responsabilidade é transferida exclusivamente para o professor que lecionava a primeira aula do dia.',
      'Ninguém responde pelos atos, pois menores de 18 anos são civilmente invisíveis para a legislação patrimonial.'
    ],
    correta: 0,
    explicacao: 'O Código Civil prevê a responsabilidade civil objetiva dos pais pelos danos causados pelos filhos menores. Ofensas, agressões e cyberbullying geram dever de indenizar a família da vítima.',
    justificativaIncorretas: [
      'Matricular o filho na escola não exonera o pátrio poder nem o dever de vigilância e educação dos genitores.',
      'Professores não respondem civilmente por atos de terceiros fora do nexo de sua responsabilidade funcional.',
      'Menores respondem no campo infracional pelo ECA, e seus responsáveis respondem no campo civil indenizatório.'
    ],
    referencia: 'Código Civil Brasileiro (Lei nº 10.406/2002), Arts. 932, I e 933',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_medio_14',
    titulo: 'Bullying Psicológico e Gaslighting',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'bullying',
    enunciado: 'Um grupo convence repetidamente um aluno de que ele "está louco", de que "ninguém gosta dele" e de que "tudo o que ele fala é ridículo". Esse padrão é caracterizado como:',
    contexto: 'Relato de sofrimento psicológico grave em comissão de mediação.',
    opcoes: [
      'Bullying psicológico reiterado, caracterizado por manipulação e tortura emocional sistemática para desestabilizar a saúde mental da vítima.',
      'Método moderno de debate dialético baseado na filosofia grega antiga.',
      'Brincadeira normal de convivência que desenvolve o autoconhecimento do estudante.',
      'Dinâmica recomendada para avaliar a resistência psicológica de atletas escolares.'
    ],
    correta: 0,
    explicacao: 'O bullying psicológico mina as defesas cognitivas e a autoestima da vítima, provocando crises de ansiedade, depressão e sentimento de desamparo aprendido.',
    justificativaIncorretas: [
      'A dialética socrática busca a verdade pelo respeito e perguntas construtivas, não pela humilhação da pessoa.',
      'Tortura emocional sistemática não gera autoconhecimento; gera trauma e sofrimento psicológico severo.',
      'O esporte escolar deve promover saúde, cooperação e respeito aos limites humanos.'
    ],
    referencia: 'Lei nº 13.185/2015, Art. 2º, Inciso II (Bullying Psicológico)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_medio_15',
    titulo: 'A Importância do Protocolo de Sigilo',
    dificuldade: 'medio',
    categoria: 'prevencao',
    competencia: 'direitos',
    enunciado: 'Em uma denúncia anônima gerada no StopBullying, o estudante recebe um código alfanumérico exclusivo (ex: PROT-7X9K2). Para que serve essa chave?',
    contexto: 'Acompanhamento do desdobramento de um relato enviado ao sistema.',
    opcoes: [
      'Permitir que o denunciante acompanhe a resposta pedagógica da escola sem revelar seu nome em nenhuma etapa.',
      'Permitir que a diretoria localize o endereço IP e a residência do estudante no mapa da cidade.',
      'Funcionar como cupom de desconto em lanchonetes parceiras da escola.',
      'Autorizar o estudante a faltar às aulas sem justificativa médica.'
    ],
    correta: 0,
    explicacao: 'A chave de protocolo permite o diálogo bidirecional seguro: o estudante consulta o andamento da apuração mantendo seu anonimato estrito preservado por criptografia.',
    justificativaIncorretas: [
      'O protocolo é desvinculado de endereços IP para manter o sigilo absoluto do usuário.',
      'A plataforma é um canal educativo de segurança pública escolar, sem finalidades comerciais.',
      'O protocolo acompanha a denúncia e não tem relação com controle de assiduidade escolar.'
    ],
    referencia: 'Arquitetura de Sigilo e Privacidade por Design do StopBullying',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['escudo_inabalavel']
  },
  {
    id: 'quiz_medio_16',
    titulo: 'Pressão Estética e Redes Sociais',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    enunciado: 'A disseminação de desafios e enquetes comparativas do tipo "quem é a pessoa mais feia da turma" em stories do Instagram configura:',
    contexto: 'Ação virtual que mobiliza dezenas de comentários cruéis entre estudantes do 9º Ano.',
    opcoes: [
      'Cyberbullying coletivo com violação da honra, imagem e dignidade dos estudantes expostos.',
      'Competição saudável de engajamento permitida pelos termos de uso das redes.',
      'Pesquisa estatística de opinião pública amparada pelo IBGE.',
      'Exercício de avaliação democrática da popularidade escolar.'
    ],
    correta: 0,
    explicacao: 'Enquetes vexatórias expõem estudantes ao escrutínio cruel dos pares, gerando humilhação coletiva tipificada como cyberbullying no Art. 146-A do Código Penal.',
    justificativaIncorretas: [
      'Os termos de uso das principais plataformas proíbem expressamente assédio e bullying em suas redes.',
      'Pesquisas científicas e censitárias seguem rigorosos comitês de ética e anonimização de dados.',
      'Humilhar pessoas publicamente não é democracia; é violência contra a honra.'
    ],
    referencia: 'Código Penal, Art. 146-A, Parágrafo Único e Diretrizes da SaferNet Brasil',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_medio_17',
    titulo: 'Sinais Silenciosos de Vitimização',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'bullying',
    enunciado: 'Muitas vítimas não contam verbalmente o que passam. Quais sinais comportamentais podem indicar que um colega está sofrendo intimidações?',
    contexto: 'Observação atenta da convivência pelos colegas de mesa e lideranças de turma.',
    opcoes: [
      'Isolamento repentino, recusa em participar de atividades em grupo, tristeza frequente, medo no horário do intervalo e queda nas notas.',
      'Aumento exagerado no apetite e disposição repentina para liderar grêmios escolares.',
      'Sorrisos constantes durante todas as explicações dos professores.',
      'Crescimento acelerado na altura do estudante de acordo com as tabelas de pediatria.'
    ],
    correta: 0,
    explicacao: 'A dor emocional se expressa na mudança de padrão comportamental: o jovem se retrai, evita espaços comuns e demonstra ansiedade perceptível.',
    justificativaIncorretas: [
      'O trauma geralmente causa perda de apetite e retração social, não expansão de liderança.',
      'Sorrisos constantes sem conexão contextual não são o indicador clássico de vitimização.',
      'Crescimento biológico e estatura são fatores genéticos sem nexo com violência escolar.'
    ],
    referencia: 'Manual de Identificação de Sinais de Bullying (Unicef / MEC)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_medio_18',
    titulo: 'A Corresponsabilidade da Escola',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'Se a escola toma conhecimento de práticas reiteradas de intimidação entre alunos e se omite deliberadamente sem adotar providências, qual princípio jurídico é quebrado?',
    contexto: 'Caso de negligência institucional diante de queixas frequentes de familiares.',
    opcoes: [
      'O dever de custódia e proteção integral garantido pela legislação educacional e civil, podendo ensejar responsabilidade civil objetiva por omissão.',
      'O princípio da neutralidade pedagógica que exige que a escola nunca intervenha em questões humanas.',
      'A regra de sigilo bancário entre estudantes e coordenação.',
      'O direito constitucional de greve dos estudantes do turno matutino.'
    ],
    correta: 0,
    explicacao: 'A instituição de ensino tem o dever legal de zelar pela integridade física e moral dos alunos. A inércia injustificada diante de bullying configura omissão ilícita indenizável.',
    justificativaIncorretas: [
      'Não existe "neutralidade" perante a violência; a escola tem dever ativo de educar para a paz e proteger.',
      'Sigilo bancário trata de operações financeiras e não tem correlação com proteção infanto-juvenil.',
      'O direito de greve é norma trabalhista e social desvinculada do dever de combate ao bullying.'
    ],
    referencia: 'Código de Defesa do Consumidor, Art. 14 e Código Civil, Art. 932, IV',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_medio_19',
    titulo: 'Inteligência Emocional e Convivência',
    dificuldade: 'medio',
    categoria: 'empatia',
    competencia: 'respeito',
    enunciado: 'Qual habilidade socioemocional permite que um estudante reconheça seus próprios impulsos de raiva e escolha dialogar em vez de agredir fisicamente um colega?',
    contexto: 'Situação de provocação esportiva na aula de Educação Física.',
    opcoes: [
      'Autorregulação emocional e autocontrole, pilares da inteligência socioemocional.',
      'Amnésia seletiva involuntária induzida por estresse agudo.',
      'Submissão passiva sem qualquer capacidade de reflexão crítica.',
      'Desconhecimento completo das regras do jogo esportivo.'
    ],
    correta: 0,
    explicacao: 'A autorregulação permite sentir a emoção (como raiva ou frustração) sem se deixar governar por ela, canalizando a energia para a resolução madura do conflito.',
    justificativaIncorretas: [
      'Autorregulação é um ato consciente de maturidade, não um quadro de amnésia patológica.',
      'Autocontrole não é passividade submissa; é a força interior de defender seus direitos sem violar os do outro.',
      'Conhecer as regras ajuda, mas o domínio das próprias reações emocionais é o fator decisivo.'
    ],
    referencia: 'Daniel Goleman - Inteligência Emocional e Competências Socioemocionais na BNCC',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_medio_20',
    titulo: 'A Teoria do Etiquetamento Social (Labeling)',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    enunciado: 'Por que rotular reiteradamente um aluno como "o burro da turma" ou "o problemático da sala" é prejudicial para o seu desenvolvimento?',
    contexto: 'Discussão sociológica sobre os efeitos dos estigmas na trajetória escolar.',
    opcoes: [
      'Porque os rótulos aprisionam a pessoa em uma identidade negativa, estimulando-a a reproduzir o comportamento esperado pelo grupo (profecia autorrealizável).',
      'Porque a lei brasileira proíbe qualquer tipo de comentário verbal sobre notas escolares.',
      'Porque todo estudante que comete um erro deve ser premiado com medalhas de ouro.',
      'Porque ninguém comete erros na adolescência por definição da psicologia.'
    ],
    correta: 0,
    explicacao: 'A teoria do etiquetamento (labeling) demonstra que o estigma negativo condiciona o indivíduo a aceitar a imagem depreciada como verdade, reforçando o desvio.',
    justificativaIncorretas: [
      'Comentários pedagógicos construtivos sobre desempenho são legítimos; o que se veda é a rotulação pejorativa.',
      'A pedagogia não premia erros de forma indiscriminada; ela acolhe o erro como oportunidade de aprendizagem.',
      'O erro faz parte do amadurecimento humano e deve ser trabalhado com responsabilidade pedagógica.'
    ],
    referencia: 'Howard Becker - Outsiders: Estudos de Sociologia do Desvio',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_medio_21',
    titulo: 'Prevenção de Danos no Cyberbullying',
    dificuldade: 'medio',
    categoria: 'cyber',
    competencia: 'cyber',
    enunciado: 'Se você notar que um print de conversa privada foi tirado de contexto para difamar um colega em um grupo, qual é o procedimento mais ético?',
    contexto: 'Montagem de mensagens falsificadas para queimar a imagem de uma aluna.',
    opcoes: [
      'Alertar o grupo de que o conteúdo foi descontextualizado ou forjado, acolher a pessoa exposta e orientá-la a guardar provas (prints com data/hora) para auxílio da escola.',
      'Compartilhar o print com o maior número de contatos para ver se alguém descobre a verdade.',
      'Aconselhar a vítima a fingir que não existe e nunca mais usar o celular.',
      'Criar prints falsos contra os autores para promover uma guerra de desinformação.'
    ],
    correta: 0,
    explicacao: 'A preservação de evidências digitais fidedignas (com links, horários e números de telefone) é fundamental para comprovar a autoria e cessar o ataque de difamação.',
    justificativaIncorretas: [
      'Compartilhar amplia a disseminação do conteúdo nocivo e agrava a lesão moral.',
      'Isolar a vítima do mundo digital pune a pessoa inocente em vez de responsabilizar os agressores.',
      'Guerra de desinformação amplia a ilegalidade e compromete a idoneidade de todos os envolvidos.'
    ],
    referencia: 'Preservação de Provas Digitais na Internet (CGI.br / SaferNet)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_medio_22',
    titulo: 'O Papel do Conselho Tutelar',
    dificuldade: 'medio',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'Em situações de violência escolar extrema ou reiterada onde as medidas internas da escola se esgotaram sem sucesso, qual órgão de proteção deve ser formalmente acionado?',
    contexto: 'Encaminhamento institucional de caso grave de violação de direitos.',
    opcoes: [
      'O Conselho Tutelar do município, órgão autônomo encarregado pela sociedade de zelar pelo cumprimento dos direitos da criança e do adolescente.',
      'A Receita Federal do Brasil para auditoria das contas dos pais.',
      'O Ministério das Relações Exteriores em Brasília.',
      'Uma empresa privada de cobrança de títulos bancários.'
    ],
    correta: 0,
    explicacao: 'O Conselho Tutelar (Arts. 131 e 136 do ECA) tem atribuição legal de intervir, aplicar medidas protetivas e encaminhar famílias e jovens para serviços de saúde e assistência social.',
    justificativaIncorretas: [
      'A Receita Federal fiscaliza tributos e não atua na proteção dos direitos infanto-juvenis.',
      'O Ministério das Relações Exteriores lida com diplomacia e relações internacionais de Estado.',
      'Empresas de cobrança atuam em dívidas financeiras de mercado, sem papel na rede de proteção.'
    ],
    referencia: 'Estatuto da Criança e do Adolescente, Arts. 131 e 136',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_medio_23',
    titulo: 'A Prática do Cancelamento Escolar',
    dificuldade: 'medio',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    enunciado: 'A chamada "cultura do cancelamento", quando transportada para a sala de aula contra um aluno que cometeu um deslize de opinião, produz qual efeito?',
    contexto: 'Um estudante pede desculpas por um comentário infeliz, mas continua sendo hostilizado e isolado por semanas.',
    opcoes: [
      'Bloqueia a oportunidade de aprendizado pedagógico e restauração, substituindo a educação ética por punição social vingativa e desproporcional.',
      'Transforma o estudante instantaneamente no aluno mais sábio e ético da instituição.',
      'Garante que nunca mais ocorra nenhum erro ou discordância na turma.',
      'Cumpre rigorosamente as normas de avaliação do Ministério da Educação.'
    ],
    correta: 0,
    explicacao: 'O cancelamento perpétuo nega o princípio pedagógico fundamental da capacidade humana de aprender com os erros, gerando desesperança e ressentimento em vez de reparação.',
    justificativaIncorretas: [
      'A hostilização contínua gera ansiedade e isolamento, não sabedoria ética espontânea.',
      'Nenhum ato de exclusão social elimina desentendimentos humanos futuros.',
      'O MEC preconiza princípios restaurativos e dialógicos, condenando o linchamento moral.'
    ],
    referencia: 'Educação Dialógica e Convivência Ética (Paulo Freire / UNESCO)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_medio_24',
    titulo: 'Ações Coletivas da Comissão de Mediação',
    dificuldade: 'medio',
    categoria: 'mediacao',
    competencia: 'convivencia',
    enunciado: 'Por que a comissão de mediação escolar, ao receber uma denúncia anônima sobre uma turma, prefere realizar intervenções coletivas em vez de apenas punir um indivíduo isolado?',
    contexto: 'Trabalho pedagógico de convivência em uma sala onde o bullying se tornou culturalmente tolerado.',
    opcoes: [
      'Porque o bullying é um fenômeno social de grupo sustentado pelo silêncio ou cumplicidade de muitos; mudar a cultura da turma elimina a raiz da violência.',
      'Porque a coordenação tem preguiça de conversar individualmente com as pessoas envolvidas.',
      'Porque as leis do país proíbem conversas individuais entre professores e estudantes.',
      'Para que todos os alunos recebam nota zero na disciplina de Sociologia.'
    ],
    correta: 0,
    explicacao: 'A intimidação só prospera onde o ambiente permite. Trabalhar com toda a turma reconfigura as normas sociais do grupo, transformando espectadores passivos em guardiões ativos do respeito.',
    justificativaIncorretas: [
      'A abordagem coletiva é fruto de fundamentação sociológica e pedagógica madura, não de negligência.',
      'O diálogo individual com acolhimento é plenamente permitido e realizado em consonância com a ação coletiva.',
      'Ações de convivência não visam punir o rendimento acadêmico disciplinar da matéria.'
    ],
    referencia: 'Metodologia de Círculos Restaurativos e Mudança de Clima Escolar',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_medio_25',
    titulo: 'O Legado Cidadão do Respeito',
    dificuldade: 'medio',
    categoria: 'fundamentos',
    competencia: 'respeito',
    enunciado: 'Por que o aprendizado do respeito e da cultura de paz na juventude é considerado a maior ferramenta de transformação social de uma nação?',
    contexto: 'Conclusão da trilha de desenvolvimento intermediário da Central de Respeito.',
    opcoes: [
      'Porque jovens que aprendem a conviver com a alteridade, dialogar na divergência e rejeitar a violência tornam-se cidadãos éticos que constroem uma sociedade justa e fraterna.',
      'Porque escolas com cultura de paz gastam menos recursos financeiros com tintas para quadro.',
      'Porque os estudantes que não brigam recebem veículos novos do governo federal.',
      'Porque elimina a necessidade de existirem códigos de leis e tribunais de justiça no futuro.'
    ],
    correta: 0,
    explicacao: 'A escola é o microcosmo da sociedade. Quando formamos mentes pacíficas e empáticas na juventude, curamos as raízes da violência que atingem a vida adulta.',
    justificativaIncorretas: [
      'Economia de material de escritório é benefício insignificante diante da dignidade humana.',
      'Não há programas de doação de veículos vinculados a comportamento de convivência.',
      'A sociedade continuará precisando de leis para organizar a vida coletiva em harmonia.'
    ],
    referencia: 'Manifesto 2000 por uma Cultura de Paz e Não-Violência (UNESCO)',
    xpRecompensa: 20,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['primeiro_passo_sabedoria']
  }
];




export const DIFICIL_QUESTIONS: BankQuestion[] = [
  {
    id: 'dificil_001',
    pergunta: 'Em conformidade com o Artigo 146-A do Código Penal (introduzido pela Lei nº 14.811/2024), qual elemento jurídico diferencia a conduta de "Intimidação Sistemática (Bullying)" de sua forma qualificada, o "Cyberbullying"?',
    contexto: 'Análise de processo pedagógico e legal envolvendo conduta praticada por alunos dentro e fora do perímetro escolar.',
    opcoes: [
      'O cyberbullying é tipificado quando a conduta é cometida por meio da rede de computadores, de rede social, de aplicativos, de jogos on-line ou por qualquer outro meio ou ambiente digital, com pena cominada de reclusão de 2 a 4 anos e multa.',
      'O cyberbullying exige que a vítima seja maior de 18 anos e resida em comarca judiciária distinta da dos agressores.',
      'A modalidade presencial tem pena de reclusão inafiançável, enquanto o cyberbullying é punido apenas com advertência administrativa sem registro.',
      'O cyberbullying prescinde de dolo ou intenção, bastando o compartilhamento acidental de imagens em grupos restritos de conversa.'
    ],
    correta: 0,
    explicacao: 'O Parágrafo Único do Art. 146-A do Código Penal qualifica expressamente a intimidação sistemática praticada em ambientes digitais, fixando pena de reclusão de 2 a 4 anos e multa, refletindo a gravidade e o alcance lesivo da violência virtual.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Código Penal Brasileiro, Art. 146-A, Parágrafo Único (Lei nº 14.811/2024)'
  },
  {
    id: 'dificil_002',
    pergunta: 'Um colégio particular tomou conhecimento de que um estudante sofria intimidações físicas e psicológicas diárias em seus corredores. A instituição limitou-se a sugerir à família que "trocasse o aluno de escola para evitar atritos". Sob a ótica da responsabilidade civil no Direito brasileiro, qual é a consequência jurídica dessa omissão institucional?',
    contexto: 'Ação indenizatória cível promovida pela família do aluno agredido por danos morais e materiais decorrentes de estresse pós-traumático.',
    opcoes: [
      'A instituição responde civilmente de forma objetiva pelo dever de custódia e incolumidade física e psíquica dos educandos, configurando negligência inescusável o ato de transferir o ônus da agressão para a vítima.',
      'A escola está isenta de responsabilidade, uma vez que o bullying é conduta exclusiva entre terceiros desprovida de nexo com o contrato educacional.',
      'A responsabilidade é puramente subjetiva e só se configura se houver confissão espontânea assinada pelo professor da matéria em que ocorreu o fato.',
      'O ordenamento jurídico brasileiro veda a indenização por danos morais quando os envolvidos no ato infracional são estudantes menores de 16 anos.'
    ],
    correta: 0,
    explicacao: 'Conforme consolidada jurisprudência do Superior Tribunal de Justiça (STJ) e os arts. 14 do CDC e 932, IV do Código Civil, a escola assume o dever de vigilância e proteção integral. A inércia institucional diante de intimidação reiterada enseja dever de indenizar.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'STJ - REsp 1.344.044/RJ e Código de Defesa do Consumidor, Art. 14'
  },
  {
    id: 'dificil_003',
    pergunta: 'Estudantes utilizaram ferramentas de Inteligência Artificial generativa para criar montagens hiper-realistas (deepfakes) do rosto de uma colega de classe em corpos nus e disseminaram o conteúdo em servidores de mensagens. Sob o prisma do Estatuto da Criança e do Adolescente (ECA) e do Código Penal, como se capitula essa conduta?',
    contexto: 'Investigação policial sobre assédio virtual e violência de gênero digital em ambiente escolar.',
    opcoes: [
      'Configura ato infracional análogo ao crime do Artigo 241-C do ECA (produção/criação de cena de sexo explícito ou pornográfica simulada envolvendo criança ou adolescente), com concurso de difamação e cyberbullying.',
      'Trata-se de mero exercício de liberdade criativa tecnológica protegido pela Lei de Direitos Autorais e pelo Marco Civil da Internet.',
      'A conduta é penalmente atípica no Brasil, pois a Inteligência Artificial é considerada ente sem personalidade jurídica responsável.',
      'A infração restringe-se ao delito de perturbação da tranquilidade, sendo resolvida exclusivamente com pedido de desculpas verbal.'
    ],
    correta: 0,
    explicacao: 'O Art. 241-C do ECA criminaliza a simulação e a montagem de imagens com conotação sexual ou pornográfica envolvendo crianças e adolescentes. A utilização de IA para constranger e violar a dignidade sexual de menores atrai sanção penal severa.',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'ECA (Lei nº 8.069/1990), Art. 241-C e Lei nº 14.811/2024'
  },
  {
    id: 'dificil_004',
    pergunta: 'No âmbito da Psicologia Moral (conforme Lawrence Kohlberg), um estudante que se recusa a denunciar o bullying por medo de ser rejeitado pelos colegas de turma ("medo de ser chamado de dedo-duro") encontra-se em qual estágio de desenvolvimento moral?',
    contexto: 'Análise de pesquisa pedagógica sobre os entraves psicossociais à denúncia de abusos entre pares.',
    opcoes: [
      'Nível Convencional, Estágio 3 (Orientação da Boa Criança / Concordância Interpessoal), onde a moralidade é pautada pela necessidade de aprovação social dos pares imediatos.',
      'Nível Pré-Convencional, Estágio 1 (Orientação para Punição e Obediência cega a autoridades com armas).',
      'Nível Pós-Convencional, Estágio 6 (Princípios Éticos Universais de Justiça e Dignidade Humana).',
      'Nível Anômico Primitivo, onde inexiste qualquer capacidade de discernimento sobre normas ou regras de convívio.'
    ],
    correta: 0,
    explicacao: 'No Estágio 3 de Kohlberg, a aprovação do grupo de pertença é o referencial central de certo e errado. O indivíduo submete seu julgamento moral à lealdade ao grupo imediato para evitar a rejeição social.',
    dificuldade: 'dificil',
    categoria: 'dilemas',
    competencia: 'respeito',
    referencia: 'Lawrence Kohlberg - The Philosophy of Moral Development'
  },
  {
    id: 'dificil_005',
    pergunta: 'O Artigo 227 da Constituição Federal de 1988 estabelece o "Princípio da Prioridade Absoluta" dos direitos de crianças e adolescentes. Na ocorrência de um conflito de interesses na escola entre a preservação da imagem institucional e a denúncia transparente de violência grave sofrida por um estudante, qual conduta é juridicamente mandatória?',
    contexto: 'Dilema administrativo da diretoria sobre notificar ou não o Ministério Público e o Conselho Tutelar.',
    opcoes: [
      'A salvaguarda integral, a saúde mental e a proteção da criança/adolescente sobrepõem-se com prioridade absoluta a qualquer interesse de reputação, imagem ou conveniência da instituição escolar.',
      'A escola deve primeiro consultar a associação de pais para verificar se a denúncia causará desvalorização dos imóveis no entorno.',
      'A diretoria pode celebrar acordo secreto com os pais para abafar o caso, caso o agressor seja o melhor aluno da turma.',
      'A imagem pública da escola goza de presunção constitucional de soberania perante denúncias de violências privadas.'
    ],
    correta: 0,
    explicacao: 'O Art. 227 da CF/88 e o Art. 4º do ECA impõem a primazia de proteção à criança e ao adolescente perante a família, a sociedade e o Estado, sendo ilícita qualquer tentativa de subordinar a proteção da vítima à reputação institucional.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Constituição Federal de 1988, Art. 227 e ECA, Art. 4º'
  },
  {
    id: 'dificil_006',
    pergunta: 'Em uma situação de justiça restaurativa, quando o mediador identifica que há risco concreto de "desequilíbrio traumático de poder" e reiteração de humilhações durante o círculo de diálogo, qual providência deve ser adotada antes de qualquer encontro presencial?',
    contexto: 'Preparação de círculos restaurativos em caso de bullying crônico de longa duração.',
    opcoes: [
      'Realizar pré-círculos individuais prévios com cada parte, avaliando a prontidão emocional da vítima, a genuína responsabilização do ofensor e a conveniência ou não do encontro direto.',
      'Forçar o encontro imediatamente na presença de toda a sala de aula para testar a coragem da vítima.',
      'Substituir o mediador por um juiz togado que aplique penas de detenção durante a aula.',
      'Exigir que a vítima peça perdão por ter se deixado agredir para equilibrar o peso moral.'
    ],
    correta: 0,
    explicacao: 'A prática restaurativa ética nunca expõe a vítima a riscos de revitimização. Os pré-círculos são etapas obrigatórias de acolhimento e triagem para garantir segurança e voluntariedade absoluta.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Resolução CNJ nº 225/2016 (Política Nacional de Justiça Restaurativa)'
  },
  {
    id: 'dificil_007',
    pergunta: 'Um adolescente de 15 anos comete atos continuados de intimidação física e extorsão contra colegas no pátio da escola. De acordo com o Estatuto da Criança e do Adolescente (ECA), qual é a consequência jurídica e a natureza das medidas aplicáveis?',
    contexto: 'Procedimento de apuração de ato infracional junto à Vara da Infância e Juventude.',
    opcoes: [
      'A conduta é formalmente caracterizada como ato infracional análogo a crime, sujeitando o adolescente a medidas socioeducativas (advertência, reparação do dano, prestação de serviços à comunidade, liberdade assistida ou internação em casos graves).',
      'O adolescente é considerado inimputável absoluto e, portanto, nenhuma medida estatal, protetiva ou socioeducativa pode ser aplicada.',
      'O estudante deve ser encaminhado imediatamente a presídios de segurança máxima juntamente com criminosos adultos reincidentes.',
      'Apenas o diretor da escola responde criminalmente com prisão fechada, ficando o adolescente dispensado de qualquer comparecimento judicial.'
    ],
    correta: 0,
    explicacao: 'Adolescentes (12 a 18 anos) respondem por atos infracionais sob regime socioeducativo previsto no ECA (Arts. 103 e 112), com finalidade primordialmente pedagógica e de responsabilização cidadã.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'ECA (Lei nº 8.069/1990), Artigos 103, 104 e 112'
  },
  {
    id: 'dificil_008',
    pergunta: 'O "efeito espectador" (bystander effect), teorizado por Latané e Darley em psicologia social, descreve a paralisia da ajuda em situações públicas de violência. Qual processo cognitivo-social explica por que, em um pátio cheio de alunos, a probabilidade de uma testemunha intervir individualmente diminui drasticamente?',
    contexto: 'Análise de ocorrência em que 50 estudantes assistiram passivamente a uma agressão sem intervir.',
    opcoes: [
      'A "difusão de responsabilidade" (a crença íntima de que alguém mais qualificado intervirá) associada à "ignorância pluralística" (olhar ao redor e presumir que, se ninguém reage, a situação não é urgente).',
      'A certeza matemática de que todo agressor escolar possui treinamento em artes marciais avançadas.',
      'A aplicação da teoria dos jogos que prova que o silêncio sempre maximiza o ganho de notas acadêmicas.',
      'O efeito hipnótico provocado pelo reflexo do sol sobre as telhas metálicas do pátio.'
    ],
    correta: 0,
    explicacao: 'Latané e Darley demonstraram que a presença de muitas testemunhas fragmenta o senso de dever individual (difusão de responsabilidade). Superar esse viés exige conscientização ativa sobre cidadania.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    referencia: 'Bibb Latané & John Darley - The Unresponsive Bystander: Why Doesn\'t He Help?'
  },
  {
    id: 'dificil_009',
    pergunta: 'Conforme a Lei nº 13.185/2015 (Programa de Combate à Intimidação Sistemática), qual é a diretriz prioritária de intervenção que deve nortear as ações governamentais e escolares?',
    contexto: 'Elaboração das políticas públicas integradas no âmbito das secretarias estaduais e municipais de educação.',
    opcoes: [
      'Implementação de ações preventivas, de capacitação docente continuada, de acolhimento psicossocial e de conscientização comunitária, evitando a mera punição desprovida de caráter educativo.',
      'A criminalização e encarceramento em massa de qualquer criança que conte uma piada em sala de aula.',
      'A terceirização de todo o corpo pedagógico das escolas públicas para empresas privadas de segurança armada.',
      'O silenciamento obrigatório de todas as discussões sobre direitos humanos nas salas de aula.'
    ],
    correta: 0,
    explicacao: 'O Artigo 4º da Lei 13.185/2015 estabelece que as ações devem focar na capacitação de docentes e equipes pedagógicas para diagnosticar precocemente, prevenir e promover a cidadania e a empatia.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Lei Federal nº 13.185/2015, Artigo 4º'
  },
  {
    id: 'dificil_010',
    pergunta: 'Em uma turma do 2º Ano, um grupo majoritário utiliza micropressões sociais para forçar que ninguém vote em um estudante com deficiência auditiva para o cargo de líder de sala. Sob a ótica da Lei Brasileira de Inclusão (Estatuto da Pessoa com Deficiência, Lei nº 13.146/2015), essa prática constitui qual violação?',
    contexto: 'Eleições estudantis internas na escola.',
    opcoes: [
      'Discriminação por motivo de deficiência, que compreende toda forma de distinção, restrição ou exclusão que tenha o propósito ou o efeito de prejudicar o exercício de direitos políticos e de liderança.',
      'Exercício legítimo do princípio majoritário da democracia representativa de sala de aula.',
      'Conduta permitida se a ata eleitoral for assinada por pelo menos dois professores efetivos.',
      'Mero conflito estudantil de grêmio sem conexão com direitos humanos protegidos por lei.'
    ],
    correta: 0,
    explicacao: 'O Artigo 4º da Lei nº 13.146/2015 veda expressamente qualquer discriminação por motivo de deficiência que embarace a participação social, política e de liderança do indivíduo.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Lei Brasileira de Inclusão (Lei nº 13.146/2015), Artigo 4º e Artigo 88'
  },
  {
    id: 'dificil_011',
    pergunta: 'A técnica de "gaslighting" no bullying psicológico escolar envolve a manipulação das percepções da vítima. Qual é o impacto neurológico e cognitivo dessa violência na formação da identidade juvenil?',
    contexto: 'Estudante que duvida da própria sanidade mental após agressões sutis sistemáticas negadas pelo grupo.',
    opcoes: [
      'Destruição da autoeficácia, confusão na leitura de pistas sociais, hipervigilância crônica e sensação paralisante de desamparo aprendido (learned helplessness).',
      'Aumento na capacidade de raciocínio lógico abstrato em problemas de física quântica.',
      'Desenvolvimento de imunidade total a qualquer tipo de cansaço ou fadiga física.',
      'Inversão no fluxo sanguíneo do sistema cardiovascular sem impacto psicológico.'
    ],
    correta: 0,
    explicacao: 'O desamparo aprendido (Seligman) ocorre quando o indivíduo é repetidamente submetido a estressores psicológicos que ele é convencido de que não pode controlar, paralisando sua capacidade de reação.',
    dificuldade: 'dificil',
    categoria: 'consequencias',
    competencia: 'bullying',
    referencia: 'Martin Seligman - Helplessness: On Depression, Development, and Death'
  },
  {
    id: 'dificil_012',
    pergunta: 'Um administrador de um canal de Telegram de estudantes publica um vídeo de intimidação violenta com a legenda: "Eu só compartilhei, não fui eu que bati, não tenho culpa de nada". Sob a perspectiva da jurisprudência do Superior Tribunal de Justiça (STJ) e da legislação civil e penal, qual é a responsabilidade desse ato?',
    contexto: 'Ação judicial sobre difusão e viralização de agressão contra menor de idade.',
    opcoes: [
      'Quem compartilha, replica e dá visibilidade a conteúdo ilícito e vexatório é coautor do dano moral à imagem e pode responder penal e civilmente pelos prejuízos causados pela ampliação da ofensa.',
      'A responsabilidade é nula, pois a internet brasileira protege a retransmissão de vídeos sem autoria própria.',
      'Apenas o fabricante do telefone celular que gravou a cena original pode ser processado.',
      'O compartilhamento só é ilícito se o vídeo for monetizado em moeda estrangeira.'
    ],
    correta: 0,
    explicacao: 'O STJ consolidou entendimento de que a replicação de mensagens difamatórias em redes sociais configura ato ilícito autônomo causador de dano moral (REsp 1.832.482), respondendo o difusor solidariamente.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'STJ - REsp 1.832.482/SP e Código Civil, Artigos 186 e 927'
  },
  {
    id: 'dificil_013',
    pergunta: 'Qual é o paradoxo da "tolerância" formulado pelo filósofo Karl Popper e como ele se aplica diretamente à moderação de discursos de ódio no ambiente escolar?',
    contexto: 'Debate no conselho escolar sobre tolerar ou banir manifestações discriminatórias nos murais e redes da escola.',
    opcoes: [
      'A tolerância ilimitada leva ao desaparecimento da própria tolerância; logo, uma sociedade democrática e uma escola acolhedora devem recusar a tolerância para com os intolerantes que buscam aniquilar o outro.',
      'A tolerância exige aceitar toda e qualquer forma de violência física como manifestação artística válida.',
      'Toda regra escolar deve ser tolerada pelos alunos apenas até o horário do recreio.',
      'O paradoxo de Popper defende que a violência é o único caminho para a paz universal.'
    ],
    correta: 0,
    explicacao: 'Karl Popper (A Sociedade Aberta e Seus Inimigos) ensina que tolerar a intolerância destrói o tecido de convivência. A escola não pode ser "tolerante" com o racismo ou o bullying sob a falsa bandeira da neutralidade.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    referencia: 'Karl Popper - A Sociedade Aberta e Seus Inimigos (O Paradoxo da Tolerância)'
  },
  {
    id: 'dificil_014',
    pergunta: 'Ao estruturar uma intervenção em um caso de "Bullying Triangulado" (onde o agressor manipula um terceiro ingênuo para desferir a ofensa), qual técnica investigativa a comissão mediadora deve utilizar?',
    contexto: 'Apuração pedagógica de conflito complexo com múltiplos atores.',
    opcoes: [
      'Mapeamento sociométrico de redes de influência, escuta individual contextualizada e análise dos incentivos ocultos para desmascarar a autoria intelectual por trás do ato material.',
      'Suspender sumariamente o primeiro aluno que for visto falando alto no corredor sem investigar nada.',
      'Colocar os alunos em uma sala trancada e exigir que confessem quem é o culpado em cinco minutos.',
      'Ignorar a apuração e esperar que os próprios pais descubram através de investigadores particulares.'
    ],
    correta: 0,
    explicacao: 'No assédio moral orquestrado, o mandante esconde-se atrás de testas-de-ferro. A comissão técnica deve identificar a autoria intelectual sem punir apenas o executor involuntário manipulado.',
    dificuldade: 'dificil',
    categoria: 'decisao',
    competencia: 'convivencia',
    referencia: 'Sociometria e Dinâmica de Grupos Escolares (Jacob Moreno)'
  },
  {
    id: 'dificil_015',
    pergunta: 'Em relação aos pais do agressor contumaz, qual é a extensão da responsabilidade civil regulamentada pelo Código Civil Brasileiro (Artigo 932, Inciso I)?',
    contexto: 'Ação judicial decorrente de lesões corporais e destruição sistemática de pertences no ambiente escolar.',
    opcoes: [
      'Os pais respondem objetivamente pela reparação civil dos danos causados pelos filhos menores que estiverem sob sua autoridade e em sua companhia, independentemente de culpa pessoal dos genitores.',
      'Os pais não têm nenhuma obrigação jurídica por atos praticados pelos filhos fora do domicílio residencial.',
      'A responsabilidade civil dos pais extingue-se a partir do momento em que o filho completa 10 anos de idade.',
      'Os pais só respondem se tiverem assinado um contrato de fiança no momento da matrícula escolar.'
    ],
    correta: 0,
    explicacao: 'O Código Civil (Arts. 932, I e 933) estabelece responsabilidade objetiva dos pais pelos danos causados pelos filhos menores, assegurando indenização integral à vítima pelos prejuízos sofridos.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Código Civil Brasileiro, Artigos 932, I e 933'
  },
  {
    id: 'dificil_016',
    pergunta: 'Qual o papel da "Epistemologia da Escuta" na mediação de conflitos escolares, em contraposição à "Escuta Inquisitorial"?',
    contexto: 'Formação continuada da equipe de mediação da EEMTI Alfredo Machado.',
    opcoes: [
      'A epistemologia da escuta acolhe a narrativa do sujeito como construção de sentido legítima para entender suas necessidades, enquanto a escuta inquisitorial busca apenas produzir provas para punir.',
      'A escuta inquisitorial é o modelo padrão recomendado pela UNICEF para escolas de tempo integral.',
      'A epistemologia da escuta proíbe que os estudantes falem sobre seus sentimentos em sala de aula.',
      'A escuta inquisitorial é aplicada exclusivamente com o uso de detectores de mentiras digitais.'
    ],
    correta: 0,
    explicacao: 'A mediação emancipatória não busca culpados para justificar castigos; busca significados e sentimentos para transformar padrões relacionais tóxicos em convivência ética.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Boaventura de Sousa Santos - Epistemologias do Sul e Ecologia de Saberes'
  },
  {
    id: 'dificil_017',
    pergunta: 'Em situações de cyberbullying com vazamento de dados de saúde ou diagnósticos médicos de estudantes (como laudos de TDAH, depressão ou autismo), qual princípio da LGPD é violado de forma mais flagrante?',
    contexto: 'Divulgação maliciosa de atestados médicos de um aluno em fórum da turma.',
    opcoes: [
      'A tutela rigorosa dos "dados pessoais sensíveis" (Art. 11 da LGPD), cuja violação ilícita atenta contra a intimidade e a honra com presunção de dano moral grave in re ipsa.',
      'O princípio do livre mercado de provedores de telecomunicações.',
      'A soberania nacional sobre os cabos submarinos de fibra óptica.',
      'O direito de livre trânsito nas rodovias estaduais em fins de semana.'
    ],
    correta: 0,
    explicacao: 'Dados de saúde são classificados como dados pessoais sensíveis pelo Art. 5º, II da LGPD, demandando proteção máxima. Seu vazamento com intuito depreciativo atrai responsabilização cível e administrativa rigorosa.',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'Lei nº 13.709/2018 (LGPD), Artigos 5º, II e 11'
  },
  {
    id: 'dificil_018',
    pergunta: 'Ao analisar a teoria da "Violência Simbólica" de Pierre Bourdieu, como o bullying social sutil opera para manter hierarquias de poder invisíveis na cultura escolar?',
    contexto: 'Seminário de Sociologia sobre dominação implícita nos grupos adolescentes.',
    opcoes: [
      'Opera mediante a imposição tácita de gostos, marcas, estéticas e gírias pelo grupo hegemônico, fazendo com que os excluídos introjetem a crença de que são naturalmente inferiores.',
      'Opera através de combates armados diretos entre tribos urbanas nos fins de semana.',
      'Opera exclusivamente pela censura oficial de livros didáticos pelo governo do estado.',
      'Opera pela cobrança de impostos municipais sobre materiais escolares.'
    ],
    correta: 0,
    explicacao: 'Pierre Bourdieu define violência simbólica como a dominação que se exerce com a cumplicidade involuntária do dominado, que incorpora os padrões do dominador como se fossem naturais.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'bullying',
    referencia: 'Pierre Bourdieu - A Reprodução e O Poder Simbólico'
  },
  {
    id: 'dificil_019',
    pergunta: 'O que o conceito de "Resiliência Comunitária Escolar" propõe para blindar uma escola contra surtos de violência e hostilidade generalizada?',
    contexto: 'Plano de Ação Integrada de Proteção e Clima Escolar.',
    opcoes: [
      'Fortalecer a densidade das redes de apoio mútuo, a comunicação transparente e a corresponsabilidade coletiva, de modo que a própria comunidade neutralize atritos antes de sua escalada.',
      'Transformar a escola em um presídio fortificado com grades em todas as janelas.',
      'Transferir todos os alunos novatos para aulas remotas em vídeo gravado.',
      'Contratar empresas de inteligência militar para espionar os celulares dos estudantes.'
    ],
    correta: 0,
    explicacao: 'A resiliência de uma comunidade não reside na dureza de suas paredes, mas na força de seus laços de cuidado, confiança e cooperação interna.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Boris Cyrulnik - Resiliência e Construção de Redes Afetivas'
  },
  {
    id: 'dificil_020',
    pergunta: 'Qual a conduta que um professor orientador deve adotar quando percebe que a dinâmica de uma sala está contaminada por um "bode expiatório" (aluno culpado por todas as falhas da turma)?',
    contexto: 'Dinâmica disfuncional de turma analisada em conselho de classe.',
    opcoes: [
      'Intervir de forma sistêmica na estrutura do grupo, explicitando a dinâmica do bode expiatório, desarmando o mecanismo de projeção coletiva e redistribuindo as responsabilidades da sala.',
      'Concordar com a turma e transferir o aluno para outra sala para satisfazer a maioria.',
      'Aplicar notas zero em todas as matérias para o aluno rotulado para confirmar a suspeita.',
      'Deixar a dinâmica continuar, pois o bode expiatório é inevitável em qualquer grupo social.'
    ],
    correta: 0,
    explicacao: 'René Girard teorizou o mecanismo do bode expiatório: grupos em crise sacrificam um indivíduo frágil para restaurar uma ilusão de harmonia interna. A pedagogia deve desmascarar esse mecanismo.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    referencia: 'René Girard - O Bode Expiatório (Mecanismo Vitimário e Violência Coletiva)'
  },
  {
    id: 'dificil_021',
    pergunta: 'Sob o enfoque da Teoria Crítica (Escola de Frankfurt, Theodor Adorno), qual é o objetivo supremo da educação emancipatória em relação ao preconceito e à barbárie?',
    contexto: 'Fundamentação filosófica da Educação em Direitos Humanos.',
    opcoes: [
      '"A exigência de que Auschwitz não se repita é a primeira de todas para a educação", o que significa educar contra a desumanização, o conformismo cego e a frieza burguesa que alimentam o ódio.',
      'Garantir que todos os estudantes decorem tabelas matemáticas para trabalhar em indústrias bélicas.',
      'Submeter todos os estudantes à disciplina militar rígida sem espaço para reflexão crítica.',
      'Proibir o ensino de filosofia e sociologia nas escolas secundárias de todo o continente.'
    ],
    correta: 0,
    explicacao: 'Adorno (Educação após Auschwitz) postula que a educação tem como dever primeiro a autorreflexão crítica, combatendo a incapacidade de identificação com o sofrimento do outro.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    referencia: 'Theodor W. Adorno - Educação e Emancipação (Educação após Auschwitz)'
  },
  {
    id: 'dificil_022',
    pergunta: 'Quando uma instituição de ensino adota um sistema de pontuação gamificado de cidadania, qual cuidado ético deve ser tomado para não transformar a solidariedade em mero "cálculo utilitário de recompensas"?',
    contexto: 'Arquitetura pedagógica dos sistemas de XP e recompensas no StopBullying.',
    opcoes: [
      'Garantir que o ato de denunciar não conceda XP (evitando incentivos perversos de denúncias fraudulentas), mantendo a recompensa restrita ao estudo formativo e à reflexão ética.',
      'Permitir que os alunos comprem notas bimestrais oficiais trocando por moedas virtuais do aplicativo.',
      'Obrigar os estudantes a competirem ferozmente pelo primeiro lugar para receber a merenda escolar.',
      'Publicar o ranking dos alunos com menor XP nos murais da cidade para incentivar a vergonha pública.'
    ],
    correta: 0,
    explicacao: 'A gamificação ética atua na motivação intrínseca: o XP premia a aprendizagem e o autodesenvolvimento, mas JAMAIS pode mercantilizar denúncias ou gerar distorções de vigilância mútua predatória.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Michael Sandel - O que o Dinheiro não Compra: Os Limites Morais do Mercado'
  },
  {
    id: 'dificil_023',
    pergunta: 'No âmbito do Direito Processual e da Informática Jurídica, qual o papel do "código HASH" na preservação de provas digitais de cyberbullying?',
    contexto: 'Perícia técnica em mensagens ofensivas gravadas para instrução probatória.',
    opcoes: [
      'Garantir a integridade imutável do documento eletrônico: qualquer alteração mínima posterior no arquivo gerará um hash diferente, comprovando a autenticidade original em juízo.',
      'Acelerar a velocidade de download de arquivos pesados em redes 3G.',
      'Traduzir o texto de mensagens para línguas estrangeiras automaticamente.',
      'Substituir a necessidade de existir juízes em tribunais de justiça cíveis.'
    ],
    correta: 0,
    explicacao: 'A função hash criptográfica funciona como uma "impressão digital matemática" do arquivo digital. Ela comprova que o print ou áudio apresentado não foi adulterado nem forjado.',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'Norma ISO/IEC 27037 (Diretrizes para Identificação, Coleta e Preservação de Evidências Digitais)'
  },
  {
    id: 'dificil_024',
    pergunta: 'Como a "Comunicação Não-Violenta" (CNV) aborda a expressão da raiva legítima diante de uma agressão injusta?',
    contexto: 'Treinamento de regulação emocional e mediação pacífica.',
    opcoes: [
      'A CNV não reprime a raiva nem incentiva a passividade: ela orienta a dissociar a raiva da violência, usando sua energia para identificar claramente as necessidades fundamentais violadas e agir com firmeza assertiva.',
      'A CNV prega que a raiva é pecado mortal e que o indivíduo agredido deve fingir que está alegre.',
      'A CNV recomenda que a raiva seja guardada em segredo até que se possa planejar uma vingança física.',
      'A CNV estabelece que só os professores têm o direito de sentir raiva na escola.'
    ],
    correta: 0,
    explicacao: 'Marshall Rosenberg ensina que a raiva é um sinalizador vital de que necessidades profundas foram negligenciadas. O caminho não é engolir o sentimento, mas transformá-lo em ação ética sem machucar o outro.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Marshall Rosenberg - Vivendo a Comunicação Não-Violenta'
  },
  {
    id: 'dificil_025',
    pergunta: 'Qual a distinção conceitual e prática entre a "justiça retributiva" e a "justiça restaurativa" no contexto de transgressões disciplinares na escola?',
    contexto: 'Revisão do regimento disciplinar de uma escola de ensino médio integral.',
    opcoes: [
      'A justiça retributiva pergunta "quem violou a regra e qual punição ele merece?"; a justiça restaurativa pergunta "quem sofreu o dano, quais são suas necessidades e de quem é a responsabilidade de reparar e restabelecer a convivência?".',
      'A justiça retributiva é aplicada exclusivamente por advogados e a restaurativa por médicos legistas.',
      'A justiça restaurativa defende a anarquia total e a ausência completa de qualquer norma de conduta escolar.',
      'A justiça retributiva é gratuita e a justiça restaurativa cobra mensalidades dos pais dos alunos.'
    ],
    correta: 0,
    explicacao: 'A retribuição foca no castigo da infração abstrata. A restauração foca no dano humano concreto, na cicatrização das relações e no compromisso de não-repetição da ofensa.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Howard Zehr - O Pequeno Livro da Justiça Restaurativa'
  },
  {
    id: 'dificil_026',
    pergunta: 'De acordo com as diretrizes do Ministério da Educação (MEC) para a construção de Clima Escolar Democrático, qual elemento estruturante diferencia uma escola com "baixo índice de intimidação sistemática"?',
    contexto: 'Avaliação institucional de redes públicas de ensino.',
    opcoes: [
      'A presença de canais confiáveis de escuta e participação juvenil, relações interpessoais pautadas no acolhimento, regras claras e justas construídas com a comunidade e supervisão ativa e empática nos espaços comuns.',
      'A proibição do recreio escolar e a substituição das refeições coletivas por lanches rápidos individuais em carteiras trancadas.',
      'O cancelamento de todas as aulas de artes, filosofia e educação física para focar exclusivamente em memorização mecânica.',
      'A instalação de cercas eletrificadas em torno de todas as salas de aula.'
    ],
    correta: 0,
    explicacao: 'Pesquisas longitudinais comprovam que a segurança escolar autêntica decorre da qualidade das relações de confiança e do pertencimento, não do policiamento punitivista ostensivo.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'MEC - Indicadores de Qualidade na Educação: Clima Escolar e Convivência'
  },
  {
    id: 'dificil_027',
    pergunta: 'No julgamento do Recurso Especial nº 1.344.044/RJ pelo Superior Tribunal de Justiça (STJ), qual precedente vinculante foi fixado sobre a responsabilidade dos estabelecimentos educacionais em casos de bullying continuado?',
    contexto: 'Estudo de caso jurisprudencial aplicado à gestão escolar.',
    opcoes: [
      'Fixou-se que o dever de vigilância e guarda da instituição de ensino é inafastável, respondendo a escola pela omissão na contenção de agressões sistemáticas que desencadeiem sofrimento moral comprovado ao estudante.',
      'Estabeleceu-se que escolas não têm dever de cuidado sobre o comportamento moral dos alunos matriculados.',
      'Determinou-se que a responsabilidade por violências na escola recai exclusivamente sobre os próprios alunos vitimizados.',
      'Decidiu-se que denúncias de bullying não podem ser apreciadas pelo Poder Judiciário brasileiro.'
    ],
    correta: 0,
    explicacao: 'A decisão paradigmática do STJ consolidou que o bullying nas dependências escolares não é "fatalidade inevitável", mas falha grave na prestação do serviço educacional que gera responsabilidade indenizatória.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'STJ - 3ª Turma, REsp 1.344.044/RJ, Relatora Ministra Nancy Andrighi'
  },
  {
    id: 'dificil_028',
    pergunta: 'Em casos de cyberbullying praticado por meio de contas apócrifas ("perfis fakes"), qual dispositivo do Marco Civil da Internet (Lei nº 12.965/2014) assegura o mecanismo processual para identificação do agressor?',
    contexto: 'Instrução probatória em medidas judiciais de exibição de dados e quebra de sigilo telemático.',
    opcoes: [
      'O Artigo 22, que autoriza a parte interessada a requerer judicialmente o fornecimento de registros de conexão ou de acesso a aplicações de internet para fins de responsabilização cível ou criminal.',
      'O Artigo 1º, que proíbe o uso de internet por cidadãos menores de vinte anos no território nacional.',
      'O Artigo 50, que determina a exclusão compulsória de todas as contas anônimas do país sem ordem de juiz.',
      'O Artigo 90, que concede poder policial investigativo aos diretores de escolas estaduais.'
    ],
    correta: 0,
    explicacao: 'O Art. 22 do Marco Civil da Internet garante que a vítima pode pleitear a revelação judicial dos IPs e dados cadastrais atrelados ao perfil falso para processar os responsáveis cível e criminalmente.',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'Marco Civil da Internet (Lei nº 12.965/2014), Artigo 22'
  },
  {
    id: 'dificil_029',
    pergunta: 'Qual o papel da "Intersecionalidade" (conceito cunhado por Kimberlé Crenshaw) na compreensão da vulnerabilidade agravada de determinados estudantes em dinâmicas de bullying?',
    contexto: 'Análise de dados estatísticos de vitimização na rede de ensino.',
    opcoes: [
      'Demonstra que múltiplas opressões e marcadores sociais (como raça, gênero, classe socioeconômica e deficiência) cruzam-se e sobrepõem-se, tornando certos indivíduos exponencialmente mais vulneráveis à violência.',
      'Afirma que a violência escolar ocorre com exata igualdade matemática entre todos os grupos sociais da sociedade.',
      'Prega que cada estudante deve ser avaliado unicamente por seu signo astrológico em testes escolares.',
      'Defende a separação total dos alunos em salas isoladas de acordo com sua renda familiar.'
    ],
    correta: 0,
    explicacao: 'A intersecionalidade revela que uma aluna negra e com deficiência, por exemplo, não enfrenta apenas o bullying isolado, mas a sobreposição de racismo, machismo e capacitismo simultâneos.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    referencia: 'Kimberlé Crenshaw - Demarginalizing the Intersection of Race and Sex'
  },
  {
    id: 'dificil_030',
    pergunta: 'Quando uma escola implementa um sistema de "tutoria ética entre pares" (veteranos acolhendo e acompanhando novatos), qual impacto atestado pela psicologia do desenvolvimento é observado?',
    contexto: 'Avaliação de impacto do protagonismo juvenil na cultura de paz.',
    opcoes: [
      'Redução da assimetria de poder hostil entre séries diferentes, desarmamento de trotes opressores e fortalecimento do senso de responsabilidade protetiva dos veteranos sobre os mais jovens.',
      'Aumento na quantidade de brigas coletivas entre alunos veteranos e novatos nos pátios.',
      'A desobrigação total dos professores de comparecerem às aulas curriculares.',
      'A cobrança de taxas de pedágio estudantil nos portões de acesso da escola.'
    ],
    correta: 0,
    explicacao: 'A tutoria de pares converte a tradicional hierarquia opressora entre anos escolares em uma aliança de acolhimento e proteção mútua, neutralizando a cultura de trotes na raiz.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Desenvolvimento Moral e Relações de Tutoria entre Pares (UNESCO)'
  },
  {
    id: 'dificil_031',
    pergunta: 'O que caracteriza a falácia da "defesa por equivalência moral" frequentemente usada por espectadores omissos ("os dois brigaram, então os dois são igualmente culpados") em casos de bullying crônico?',
    contexto: 'Equívoco comum de julgamento ao avaliar situações de agressão sistemática.',
    opcoes: [
      'Ignora o histórico prévio de assédio continuado, o desequilíbrio de poder e o desespero da vítima, tratando a reação explosiva de quem apanhou durante meses como idêntica à conduta do agressor originário.',
      'É a regra padrão de julgamento estipulada pelo Código de Processo Penal brasileiro.',
      'Demonstra a máxima imparcialidade e sabedoria que qualquer educador pode alcançar em sala.',
      'Garante que nenhuma das partes precise frequentar a escola até a conclusão do processo.'
    ],
    correta: 0,
    explicacao: 'Equiparar a reação desesperada da vítima (reação reativa) à agressão sistemática do algoz (agressão proativa instrumental) é uma injustiça que revitimiza quem já estava sofrendo.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    referencia: 'Psicopatologia do Bullying e Análise Sistêmica de Conflitos Escolares'
  },
  {
    id: 'dificil_032',
    pergunta: 'Sob a perspectiva da neurociência afetiva (Jaak Panksepp), qual sistema emocional primário é ativado de forma crônica na vítima de bullying e quais as consequências no desenvolvimento do cérebro?',
    contexto: 'Impactos neurobiológicos do trauma escolar continuado.',
    opcoes: [
      'O sistema do MEDO e do PÂNICO/TRISTEZA é hiperativado, inibindo o sistema de BUSCA/EXPLORAÇÃO e o jogo social lúdico (PLAY), atrofiando conexões do hipocampo e gerando anedonia.',
      'O cérebro da vítima desenvolve imediatamente telepatia e memória fotográfica sobrehumanas.',
      'O sistema digestivo passa a digerir plásticos e metais sem nenhum problema clínico.',
      'Não ocorre nenhuma alteração hormonal ou neural comprovável pela ciência médica.'
    ],
    correta: 0,
    explicacao: 'Panksepp demonstrou que o medo constante desliga a motivação exploratória e o aprendizado lúdico. Sem segurança, o cérebro opera em modo de sobrevivência pura.',
    dificuldade: 'dificil',
    categoria: 'consequencias',
    competencia: 'respeito',
    referencia: 'Jaak Panksepp - Affective Neuroscience: The Foundations of Human and Animal Emotions'
  },
  {
    id: 'dificil_033',
    pergunta: 'Qual o dever legal do diretor de escola ou coordenador pedagógico ao presenciar ou tomar conhecimento de fato que configure crime ou ato infracional violento no ambiente escolar?',
    contexto: 'Artigo 13 do Estatuto da Criança e do Adolescente e Artigo 66 da Lei de Contravenções Penais.',
    opcoes: [
      'Comunicar imediatamente o fato ao Conselho Tutelar e às autoridades competentes (Polícia Civil / Ministério Público), sem prejuízo de adotar as medidas pedagógicas e de acolhimento emergenciais cabíveis.',
      'Guardar segredo absoluto e queimar todos os papéis e registros que citem o ocorrido.',
      'Publicar o vídeo da briga nas redes sociais para ganhar notoriedade jornalística.',
      'Esperar um prazo mínimo de seis meses para decidir se a agressão foi real ou imaginária.'
    ],
    correta: 0,
    explicacao: 'O Artigo 13 do ECA e o dever funcional dos servidores impõem a comunicação obrigatória de suspeita ou confirmação de maus-tratos e infrações graves aos órgãos de proteção da infância.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'ECA (Lei nº 8.069/1990), Artigo 13 e Artigo 245'
  },
  {
    id: 'dificil_034',
    pergunta: 'Em conformidade com a Convenção sobre os Direitos da Criança da ONU (ratificada pelo Brasil pelo Decreto nº 99.710/1990), o que estabelece o Artigo 12 em relação ao direito de participação do jovem em processos que lhe digam respeito?',
    contexto: 'Procedimentos de mediação e conselho tutelar envolvendo decisões sobre o destino escolar do estudante.',
    opcoes: [
      'Garante o direito da criança e do adolescente de exprimir livremente sua opinião sobre todos os assuntos que lhe digam respeito, devendo suas opiniões ser levadas em devida consideração segundo sua idade e maturidade.',
      'Determina que jovens menores de dezoito anos não podem falar perante adultos em nenhuma circunstância.',
      'Exige que apenas os advogados contratados possam se manifestar em reuniões pedagógicas.',
      'Proíbe que a escola ouça a versão da vítima antes de expulsar o autor da violência.'
    ],
    correta: 0,
    explicacao: 'O Artigo 12 da Convenção da ONU consagra a doutrina da proteção integral: o jovem não é mero objeto de tutela dos adultos, mas sujeito de direitos com voz ativa e vinculante.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Convenção Internacional sobre os Direitos da Criança da ONU, Artigo 12'
  },
  {
    id: 'dificil_035',
    pergunta: 'Ao lidar com uma situação de "cyberbullying com dispersão algorítmica" (onde algoritmos de redes sociais amplificam postagens de humilhação por gerarem alto engajamento/retenção), qual reflexão crítica deve ser feita pelos estudantes?',
    contexto: 'Oficina de letramento midiático e sociologia digital.',
    opcoes: [
      'Compreender que as plataformas digitais monetizam a polarização e a controvérsia, e que curtir, comentar ou compartilhar postagens humilhantes alimenta a engrenagem econômica que lucra com o sofrimento alheio.',
      'Acreditar que os algoritmos de redes sociais são seres divinos infalíveis que premiam a verdade absoluta.',
      'Imaginar que postagens de ódio são apagadas automaticamente após dez segundos por satélites espaciais.',
      'Achar que o engajamento virtual é o único critério válido de relevância moral de um ser humano.'
    ],
    correta: 0,
    explicacao: 'A economia da atenção (Shoshana Zuboff - Capitalismo de Vigilância) capitaliza a indignação e o linchamento. Entender a lógica do algoritmo é essencial para não ser massa de manobra.',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Shoshana Zuboff - A Era do Capitalismo de Vigilância'
  },
  {
    id: 'dificil_036',
    pergunta: 'O que o conceito de "Círculo Hermenêutico da Empatia" (Gadamer) ensina sobre a superação de preconceitos enraizados entre diferentes grupos culturais na escola?',
    contexto: 'Diálogo entre estudantes de diferentes origens sociais e identidades na sala de aula.',
    opcoes: [
      'O encontro com a alteridade exige reconhecer os próprios pré-conceitos e abrir-se a uma "fusão de horizontes", onde a perspectiva do outro expande e transforma a nossa própria visão de mundo.',
      'Exige que todos os estudantes esqueçam completamente sua história familiar de origem.',
      'Determina que apenas as opiniões dos alunos mais velhos devem ser levadas a sério.',
      'Prega que é impossível haver qualquer tipo de diálogo entre pessoas que nasceram em bairros diferentes.'
    ],
    correta: 0,
    explicacao: 'Hans-Georg Gadamer ensina que o diálogo genuíno não é vencer um debate, mas permitir que a experiência do outro toque e transforme os nossos próprios horizontes morais.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    referencia: 'Hans-Georg Gadamer - Verdade e Método (Fusão de Horizontes)'
  },
  {
    id: 'dificil_037',
    pergunta: 'Em uma denúncia de agressão ocorrida no banheiro sem testemunhas oculares diretas, quais elementos circunstanciais técnicos e comportamentais a equipe pedagógica deve correlacionar para evitar a impunidade ou acusações falsas?',
    contexto: 'Investigação pedagógica e protocolar de caso complexo.',
    opcoes: [
      'Horários de entrada e saída registrados nas câmeras dos corredores externos, relatos de mudança repentina de estado emocional pós-ocorrência, lesões físicas atestadas por serviço de saúde e histórico prévio de atritos entre os envolvidos.',
      'Sorteio aleatório para decidir quem está falando a verdade através de cara ou coroa.',
      'Interrogar todos os alunos da escola inteira ao mesmo tempo na quadra de esportes.',
      'Descartar a apuração imediatamente por ausência de gravação de vídeo dentro do sanitário.'
    ],
    correta: 0,
    explicacao: 'A prova indiciária e circunstancial robusta (Art. 239 do CPP) permite concluir com segurança sobre a veracidade dos fatos quando há harmonia entre vestígios, horários e relatos consistentes.',
    dificuldade: 'dificil',
    categoria: 'decisao',
    competencia: 'direitos',
    referencia: 'Código de Processo Penal, Art. 239 (Valor Probatório dos Indícios Conexos)'
  },
  {
    id: 'dificil_038',
    pergunta: 'Qual é o impacto da "exclusão dos laços de pertencimento" na predisposição à radicalização e ao ódio ideológico na juventude contemporânea?',
    contexto: 'Estudos sobre extremismo violento e saúde mental de jovens isolados na internet.',
    opcoes: [
      'Jovens que sofrem rejeição escolar crônica tornam-se presas fáceis para comunidades virtuais tóxicas e extremistas que oferecem falso pertencimento, validando ressentimentos e canalizando o ódio contra bodes expiatórios.',
      'O isolamento escolar transforma automaticamente os jovens em sábios pacifistas sem contato com a internet.',
      'Não há qualquer correlação entre solidão escolar e adesão a grupos extremistas na rede.',
      'A radicalização juvenil ocorre exclusivamente através de programas de televisão abertos.'
    ],
    correta: 0,
    explicacao: 'Relatórios do Ministério dos Direitos Humanos alertam que o bullying e o desamparo social são fatores de risco graves explorados por aliciadores em fóruns da deep web para recrutar jovens fragilizados.',
    dificuldade: 'dificil',
    categoria: 'consequencias',
    competencia: 'direitos',
    referencia: 'Relatório do Grupo de Trabalho sobre Prevenção ao Extremismo Violento (MDHC / MEC)'
  },
  {
    id: 'dificil_039',
    pergunta: 'Sob a ótica da Ética do Cuidado (Carol Gilligan), como as práticas escolares tradicionais punitivistas muitas vezes falham em compreender as necessidades humanas dos envolvidos?',
    contexto: 'Crítica à moral abstrata imposta sem consideração dos vínculos afetivos.',
    opcoes: [
      'Porque privilegiam regras jurídicas abstratas e punições descoladas da realidade concreta das relações, negligenciando a escuta das necessidades de afeto, escuta e reparação de laços rompidos.',
      'Porque a ética do cuidado defende a abolição de qualquer punição para crimes contra a vida.',
      'Porque Gilligan afirma que apenas os homens possuem capacidade de discernimento moral lógico.',
      'Porque as relações humanas nas escolas devem ser tratadas como contratos bancários frios.'
    ],
    correta: 0,
    explicacao: 'Carol Gilligan (In a Different Voice) propôs a Ética do Cuidado: a moralidade se constrói na responsabilidade de não causar dano ao outro e na manutenção dos vínculos afetivos da comunidade.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    referencia: 'Carol Gilligan - In a Different Voice: Psychological Theory and Women\'s Development'
  },
  {
    id: 'dificil_040',
    pergunta: 'Por que o uso de "linguagem estigmatizante" em prontuários, atas e relatórios escolares sobre alunos com histórico de indisciplina viola o direito à proteção integral?',
    contexto: 'Auditoria de registros pedagógicos confidenciais na secretaria da escola.',
    opcoes: [
      'Porque cristaliza uma identidade negativa que contamina o olhar dos educadores subsequentes, perpetuando o preconceito e violando o dever de confidencialidade e respeito à dignidade em desenvolvimento do jovem.',
      'Porque gasta tinta de impressora com palavras difíceis desnecessárias.',
      'Porque as atas escolares devem ser obrigatoriamente preenchidas com elogios poéticos fictícios.',
      'A lei não se importa com a linguagem utilizada em documentos administrativos sigilosos.'
    ],
    correta: 0,
    explicacao: 'O ECA assegura a proteção contra qualquer tratamento desumano, vexatório ou estigmatizante (Art. 18-A). Relatórios devem ser descritivos e técnicos, jamais rotuladores ou ofensivos.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'ECA (Lei nº 8.069/1990), Artigo 18-A'
  },
  {
    id: 'dificil_041',
    pergunta: 'Em uma situação onde o agressor de bullying é ele próprio vítima de graves abusos e negligência física e emocional no âmbito doméstico, qual deve ser a abordagem da comissão de proteção da escola?',
    contexto: 'Caso complexo de violência cruzada atendido na EEMTI Alfredo Machado.',
    opcoes: [
      'Separar os planos de intervenção: garantir a segurança e a reparação da vítima agredida na escola e, simultaneamente, acionar a rede intersetorial (Conselho Tutelar / CREAS) para proteger e acolher o agressor contra os abusos domésticos que sofre.',
      'Ignorar as agressões sofridas pela vítima na escola, justificando que o agressor tem motivos para ser violento.',
      'Prender o estudante agressor e esquecer de investigar o ambiente familiar.',
      'Expulsar o aluno agressor da escola para que ele fique em tempo integral na casa violenta.'
    ],
    correta: 0,
    explicacao: 'O princípio da proteção integral exige olhar sistêmico. O agressor não pode continuar vitimizando outros, mas a raiz da sua violência (abuso doméstico) deve ser tratada pelas autoridades de assistência social.',
    dificuldade: 'dificil',
    categoria: 'decisao',
    competencia: 'direitos',
    referencia: 'Sistema de Garantia de Direitos da Criança e do Adolescente (Resolução Conanda nº 113)'
  },
  {
    id: 'dificil_042',
    pergunta: 'Qual o papel da "metacognição moral" (pensar sobre o próprio modo de pensar e sentir moralmente) no treinamento de líderes juvenis de convivência ética?',
    contexto: 'Jornada formativa de monitores de paz estudantis.',
    opcoes: [
      'Capacitar o estudante a identificar seus próprios preconceitos automáticos, analisar as razões de suas reações impulsivas e ajustar voluntariamente seus comportamentos com base em princípios éticos superiores.',
      'Fazer o aluno memorizar as páginas do Código Penal sem compreender seu sentido humano.',
      'Ensinar o estudante a fingir bondade para obter vantagens políticas no grêmio escolar.',
      'Substituir o sono noturno dos líderes por meditações obrigatórias de oito horas.'
    ],
    correta: 0,
    explicacao: 'A metacognição moral eleva a consciência ética da reação automática para a reflexão deliberada: o indivíduo passa a vigiar seus próprios vieses e age por convicção emancipatória.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Metacognição e Desenvolvimento do Julgamento Ético (Flavell / Rest)'
  },
  {
    id: 'dificil_043',
    pergunta: 'No contexto de vazamentos de fotos íntimas ou cyberbullying em escolas, o que estabelece a Lei nº 12.737/2012 (Lei Carolina Dieckmann) quanto à invasão de dispositivos informáticos alheios?',
    contexto: 'Aluno que instalou programa espião no computador de uma colega para capturar senhas e fotos.',
    opcoes: [
      'Tipifica no Artigo 154-A do Código Penal a invasão de dispositivo informático alheio para obter, adulterar ou destruir dados ou instalar vulnerabilidades, com aumento de pena se houver divulgação de dados privados.',
      'Incentiva a invasão de telefones celulares como exercício de aprendizado de programação nas escolas.',
      'Proíbe que computadores portáteis tenham senhas alfanuméricas com mais de quatro dígitos.',
      'Desobriga os provedores de internet de prestarem informações em processos judiciais de estelionato.'
    ],
    correta: 0,
    explicacao: 'A Lei nº 12.737/2012 inseriu o Art. 154-A no Código Penal, punindo com rigor quem invade aparelhos para devassar a intimidade alheia, com agravantes para obtenção de comunicações privadas.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Código Penal Brasileiro, Artigo 154-A (Lei nº 12.737/2012)'
  },
  {
    id: 'dificil_044',
    pergunta: 'Por que a exclusão de estudantes com base na neurodivergência (como TDAH, Dislexia ou Síndrome de Tourette) fere os compromissos internacionais do Brasil perante a Convenção da ONU sobre os Direitos das Pessoas com Deficiência?',
    contexto: 'Tratado internacional com equivalência de emenda constitucional no ordenamento jurídico pátrio.',
    opcoes: [
      'Porque a Convenção da ONU (aprovada com status constitucional pelo Decreto nº 6.949/2009) consagra o modelo social da deficiência, no qual a barreira reside na atitude excludente da sociedade e não no indivíduo, proibindo discriminação.',
      'Porque a ONU determina que todos os alunos com dislexia devem ser educados fora das escolas regulares.',
      'Porque tratados internacionais de direitos humanos não têm nenhuma validade jurídica dentro dos estados brasileiros.',
      'Porque alunos com TDAH não têm direito de expressar opiniões em ambientes públicos.'
    ],
    correta: 0,
    explicacao: 'A Convenção da ONU sobre os Direitos das Pessoas com Deficiência foi promulgada com status de Emenda Constitucional (Art. 5º, § 3º da CF/88), impondo adaptação razoável e combate irrestrito à discriminação.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Decreto Legislativo nº 186/2008 e Decreto Federal nº 6.949/2009 (CDPD da ONU)'
  },
  {
    id: 'dificil_045',
    pergunta: 'Qual é o papel da "Dissonância Cognitiva" (Festinger) na transformação de atitudes de estudantes que anteriormente apoiavam ou praticavam bullying na escola?',
    contexto: 'Dinâmica formativa de desestabilização de crenças preconceituosas.',
    opcoes: [
      'Provocar um conflito interno entre a autoimagem positiva que o jovem tem de si mesmo ("sou uma pessoa boa e justa") e a realidade cruel dos impactos de suas atitudes de exclusão, motivando a mudança de comportamento para restaurar a coerência ética.',
      'Fazer o aluno esquecer todo o vocabulário da língua portuguesa por várias semanas.',
      'Obrigar o estudante a tomar remédios que alterem sua capacidade de raciocínio lógico.',
      'Incentivar o agressor a sentir orgulho eterno do mal que causou aos colegas vulneráveis.'
    ],
    correta: 0,
    explicacao: 'A dissonância cognitiva ocorre quando a pessoa é confrontada com a incoerência entre seus valores declarados e seus atos reais. Para reduzir a tensão psicológica, o indivíduo é compelido a mudar de conduta.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Leon Festinger - A Theory of Cognitive Dissonance'
  },
  {
    id: 'dificil_046',
    pergunta: 'O que o conceito de "Zoneamento de Risco e Microclima de Convivência" ensina aos gestores escolares sobre a arquitetura dos espaços físicos de ensino?',
    contexto: 'Mapeamento de segurança ambiental na EEMTI Alfredo Machado.',
    opcoes: [
      'A iluminação adequada, a transparência visual, a circulação intencional de servidores e o cuidado estético com os ambientes eliminam "zonas de sombra" que historicamente facilitam a violência e o desrespeito.',
      'A necessidade de fechar todas as janelas com tijolos escuros para evitar que os alunos olhem para fora.',
      'A instalação de cercas com arame farpado separando a sala de aula do refeitório comunitário.',
      'A obrigação de todos os alunos ficarem de mãos dadas durante todo o horário do recreio.'
    ],
    correta: 0,
    explicacao: 'A teoria CPTED (Prevenção do Crime através do Design Ambiental) demonstra que espaços limpos, bem iluminados e com vigilância natural reduzem drasticamente ocorrências de violência e vandalismo.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'CPTED (Crime Prevention Through Environmental Design) nas Escolas'
  },
  {
    id: 'dificil_047',
    pergunta: 'Qual a consequência ética de uma comunidade escolar que elege "a denúncia de bullying" como tabu vergonhoso sob o pretexto de "não sujar o nome do colégio"?',
    contexto: 'Análise de cultura organizacional tóxica e encobrimento de violências.',
    opcoes: [
      'Cria uma conivência sistêmica que perpetua o sofrimento silencioso das vítimas, empodera os agressores e desmoraliza a autoridade moral da instituição perante os alunos.',
      'Garante que todos os estudantes sejam aprovados com louvor em universidades internacionais.',
      'Elimina todo e qualquer tipo de conflito humano dentro do colégio por dez anos.',
      'Torna a escola imune a inspeções sanitárias e auditorias do Ministério Público.'
    ],
    correta: 0,
    explicacao: 'Encobrir a violência para proteger a imagem corporativa é a mais grave traição da missão pedagógica. A transparência e o acolhimento sincero são as únicas bases sólidas de prestígio social.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'direitos',
    referencia: 'Ética das Instituições Educativas e Transparência Pública'
  },
  {
    id: 'dificil_048',
    pergunta: 'De acordo com o Artigo 17 do Estatuto da Criança e do Adolescente (ECA), o que abrange o "direito ao respeito" garantido a todo educando?',
    contexto: 'Fundamentação jurídica do direito à dignidade pessoal do estudante.',
    opcoes: [
      'A inviolabilidade da integridade física, psíquica e moral da criança e do adolescente, abrangendo a preservação da imagem, da identidade, da autonomia, dos valores, das ideias e crenças e dos espaços e objetos pessoais.',
      'Apenas o direito de não ser interrompido quando estiver cantando em apresentações culturais.',
      'O privilégio de escolher quais matérias obrigatórias do currículo nacional ele deseja estudar.',
      'A imunidade total para cometer atos de vandalismo no patrimônio público municipal.'
    ],
    correta: 0,
    explicacao: 'O Artigo 17 do ECA é a matriz legal do respeito na infância e juventude: protege o corpo, a mente, a honra, a imagem e os pertences contra qualquer agressão arbitrária.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Estatuto da Criança e do Adolescente (Lei nº 8.069/1990), Artigo 17'
  },
  {
    id: 'dificil_049',
    pergunta: 'Qual o valor da "análise de sentimentos e necessidades ocultas" (segundo a CNV) ao mediar um agressor que usa apelidos pejorativos para se destacar?',
    contexto: 'Sessão formativa com aluno reincidente em agressões verbais.',
    opcoes: [
      'Revelar que, por trás da agressão, muitas vezes há necessidades não atendidas de reconhecimento, medo de vulnerabilidade ou busca desesperada por pertencimento, abrindo caminho para suprir essas necessidades de forma construtiva.',
      'Fazer com que o agressor passe a assinar confissões de culpa em público todas as segundas-feiras.',
      'Substituir o ensino de português por aulas de silêncio absoluto obrigatório.',
      'Isolar o estudante em uma sala sem luz para que ele pense no que fez sozinho.'
    ],
    correta: 0,
    explicacao: 'Violência é expressão trágica de necessidades não atendidas. Quando o mediador ensina o jovem a buscar valor e reconhecimento pelo talento e pela liderança ética, o bullying perde sua função psicológica.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Marshall Rosenberg - Comunicação Não-Violenta: Técnicas Avançadas de Mediação'
  },
  {
    id: 'dificil_050',
    pergunta: 'Como o anonimato preservado pela plataforma StopBullying se harmoniza com o princípio constitucional do "vedado o anonimato" previsto no Artigo 5º, Inciso IV da CF/88?',
    contexto: 'Questionamento jurídico sobre a legalidade de canais de denúncia sigilosos na administração pública.',
    opcoes: [
      'A vedação constitucional ao anonimato veda acusações apócrifas como prova única de condenação sumária; canais de relato sigiloso como o StopBullying atuam como "notitia criminis/dever de alerta", disparando apuração preliminar com contraditório e devido processo legal, sem expor a testemunha a risco.',
      'O StopBullying não cumpre a Constituição Federal e opera em desacordo com as leis brasileiras.',
      'A Constituição proíbe qualquer tipo de formulário digital que não exija reconhecimento de firma em cartório.',
      'O anonimato é permitido apenas para quem tem mais de trinta anos e possui imóvel próprio registrado.'
    ],
    correta: 0,
    explicacao: 'O STF pacificou (Inquérito 1.957 e Súmula Vinculante) que notícias anônimas de infrações podem e devem desencadear investigação preliminar da autoridade pública, protegendo a fonte enquanto apura os fatos de modo legal.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'STF - Inq 1.957/PR e HC 99.490/DF (Validade da Notitia Criminis Anônima para Apuração Prévia)'
  },
  {
    id: 'dificil_051',
    pergunta: 'Em relação às lesões corporais decorrentes de brigas escolares, qual a relevância da diferenciação técnica entre "lesão corporal leve" e "lesão corporal grave/gravíssima" para a tipificação de atos infracionais?',
    contexto: 'Apuração pericial após agressão física com fratura óssea no pátio.',
    opcoes: [
      'A gravidade das lesões (incapacidade por mais de 30 dias, debilidade permanente de membro, perigo de vida) orienta a intensidade da medida socioeducativa aplicável pelo juiz da infância, podendo fundamentar internação em estabelecimento socioeducativo.',
      'A lesão corporal leve anula qualquer processo administrativo escolar automaticamente.',
      'A lesão corporal só existe perante o direito brasileiro se houver ferimento com corte aparente de sangue.',
      'Não há diferença legal alguma, devendo todos os atos físicos receberem a mesma repreensão verbal simples.'
    ],
    correta: 0,
    explicacao: 'O Artigo 129 do Código Penal e o Art. 122 do ECA autorizam a aplicação de medida de internação (privação de liberdade) a adolescentes quando o ato infracional é praticado mediante violência grave ou grave ameaça à pessoa.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Código Penal, Artigo 129 e ECA, Artigo 122, Inciso I'
  },
  {
    id: 'dificil_052',
    pergunta: 'Qual o papel da "empatia institucional" por parte da direção escolar quando a família de um estudante agredido procura a unidade para relatar o desespero do filho?',
    contexto: 'Atendimento na sala de gestão a uma mãe em prantos.',
    opcoes: [
      'Ouvir a família com acolhimento genuíno, registrar com precisão as informações, apresentar o plano imediato de proteção ao aluno e manter diálogo permanente e transparente sem posturas defensivas ou burocráticas frias.',
      'Dizer à família que a escola tem coisas mais importantes para resolver e pedir para voltarem no mês seguinte.',
      'Ameaçar expulsar o estudante agredido caso a família procure a polícia ou o conselho tutelar.',
      'Exigir que a família pague os honorários do advogado da escola para poder ser ouvida.'
    ],
    correta: 0,
    explicacao: 'A postura institucional acolhedora desarma a angústia da família e constrói a aliança necessária para proteger o estudante. Posturas burocráticas frias inflamam litígios e agravam o sofrimento.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Gestão Escolar Democrática e Relações com a Família (Paro)'
  },
  {
    id: 'dificil_053',
    pergunta: 'O que o conceito de "Moralidade Autônoma" de Jean Piaget revela sobre o cumprimento voluntário de acordos de não-agressão pelos estudantes do Ensino Médio?',
    contexto: 'Observação do cumprimento de normas de convivência na rotina escolar.',
    opcoes: [
      'Na moralidade autônoma, as regras são compreendidas como contratos sociais baseados na reciprocidade e no respeito mútuo, sendo cumpridas por convicção ética interna e não por medo de castigos externos.',
      'A moralidade autônoma defende que cada estudante deve inventar suas próprias leis individuais sem respeitar ninguém.',
      'Na moralidade autônoma, os alunos obedecem apenas quando estão sob a mira de armas de fogo.',
      'A moralidade autônoma só pode ser desenvolvida por crianças com menos de cinco anos de idade.'
    ],
    correta: 0,
    explicacao: 'Piaget demonstrou que a heteronomia (obedecer por medo de punição) é imatura. O jovem maduro atinge a autonomia: respeita o colega porque compreende o valor intrínseco da justiça e da cooperação.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    referencia: 'Jean Piaget - O Juízo Moral na Criança (Heteronomia e Autonomia Moral)'
  },
  {
    id: 'dificil_054',
    pergunta: 'Em casos de perseguição virtual sistemática onde o autor cria múltiplos perfis para burlar bloqueios da vítima ("ban evasion"), qual agravamento psicológico é experimentado pela pessoa vitimizada?',
    contexto: 'Relato de estudante que bloqueou dez contas falsas do mesmo agressor em uma semana.',
    opcoes: [
      'Sensação de cerco inevitável e invasão onipresente, desespero pela perda do controle de suas fronteiras íntimas e exaustão psicológica extrema.',
      'Aumento da tranquilidade mental por saber que é uma pessoa popular na internet.',
      'Melhora na qualidade do sono e na capacidade de foco em livros teóricos.',
      'Nenhum impacto perceptível, bastando desligar a luz do quarto para cessar o problema.'
    ],
    correta: 0,
    explicacao: 'A evasão de bloqueios destrói a sensação de segurança: a vítima percebe que não há como se fechar ao ataque, o que gera hipervigilância patológica e estresse pós-traumático.',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'cyber',
    referencia: 'Psicopatologia do Cyberstalking e Impactos Clínicos (Sheridan & Grant)'
  },
  {
    id: 'dificil_055',
    pergunta: 'Qual a importância de se realizar auditorias periódicas e revisões dos dados de denúncias sem que nenhum dado identifique o denunciante no sistema StopBullying?',
    contexto: 'Rotinas de governança de dados e integridade de software.',
    opcoes: [
      'Permite mapear manchas de calor (locais e turnos de maior incidência de atritos) para orientar a vigilância preventiva da equipe, preservando inviolável o anonimato de quem alertou a escola.',
      'Serve para vender os dados de comportamento dos estudantes para agências de publicidade internacional.',
      'Permite descobrir quem são os alunos mais fracos para colocá-los em turmas especiais de castigo.',
      'Garante que os professores possam deduzir notas fiscais no imposto de renda anual.'
    ],
    correta: 0,
    explicacao: 'Dados agregados e anonimizados geram inteligência preventiva: a gestão descobre ONDE e QUANDO agir (ex: reforçar inspetores no pátio às 10h15) sem violar o sigilo de ninguém.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'Governança de Dados em Segurança Escolar Baseada em Evidências'
  },
  {
    id: 'dificil_056',
    pergunta: 'Como o princípio da "Não-Vingança Institucional" se aplica à aplicação de medidas disciplinares pelo conselho escolar?',
    contexto: 'Reunião extraordinária para deliberar sobre conduta grave de agressão física.',
    opcoes: [
      'A escola age como instituição educadora do Estado, pautada na legalidade, proporcionalidade e finalidade pedagógica; suas medidas não podem visar humilhar, revidar ou vingar-se do estudante.',
      'A escola deve devolver a mesma agressão física cometida pelo estudante como demonstração de autoridade.',
      'O conselho escolar deve incentivar que os pais da vítima agridam o agressor dentro da secretaria.',
      'As medidas disciplinares devem ser decididas por votação popular em redes sociais abertas da internet.'
    ],
    correta: 0,
    explicacao: 'O poder disciplinar pedagógico não se confunde com vindita privada. Ele busca responsabilizar, restaurar a segurança e ensinar limites de cidadania, sem degradar a dignidade humana do transgressor.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'Princípios do Direito Administrativo Disciplinar Educacional'
  },
  {
    id: 'dificil_057',
    pergunta: 'O que a jurisprudência brasileira contemporânea define sobre o dever de indenizar danos morais decorrentes do "cyberbullying em ambiente de jogos on-line" (games competitivos)?',
    contexto: 'Ofensas racistas e ameaças de morte proferidas em partidas de jogos eletrônicos entre estudantes da mesma escola.',
    opcoes: [
      'O ambiente virtual de jogos não é terra sem lei: ofensas graves que ultrapassam o mero espírito de jogo ensejam responsabilidade civil por dano moral dos autores ou de seus pais, caso menores.',
      'Jogos eletrônicos gozam de imunidade jurídica absoluta contra processos de direitos humanos no Brasil.',
      'Apenas os desenvolvedores do jogo em países estrangeiros podem ser responsabilizados no exterior.',
      'A responsabilidade é inexistente se os jogadores estiverem utilizando fones de ouvido com microfone.'
    ],
    correta: 0,
    explicacao: 'O STJ e tribunais estaduais reiteram que a utilização de plataformas de jogos não isenta o usuário da responsabilidade civil e criminal por crimes contra a honra, racismo e ameaças graves.',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'direitos',
    referencia: 'TJSP - Apelação Cível 1002345-67.2021.8.26.0100 (Dano Moral em Jogos Virtuais)'
  },
  {
    id: 'dificil_058',
    pergunta: 'Qual é o papel da "reserva mental" em um estudante agressor que pede desculpas formalmente mas mantém condutas hostis nas entrelinhas?',
    contexto: 'Avaliação de eficácia de um acordo disciplinar após uma semana da audiência com os pais.',
    opcoes: [
      'Trata-se de desonestidade comunicativa: o agressor cede formalmente para evitar a punição imediata, mas não adere internamente aos valores éticos pactuados, demandando monitoramento contínuo da equipe escolar.',
      'É a capacidade mental de memorizar fórmulas de trigonometria durante momentos de tensão.',
      'Constitui prova de que o agressor foi curado e nunca mais terá desvios de conduta na vida.',
      'É um procedimento obrigatório para quem deseja se matricular em cursos de formação militar.'
    ],
    correta: 0,
    explicacao: 'O acordo formal sem conversão moral autêntica é frágil. A equipe pedagógica não pode dar o caso por encerrado apenas porque houve uma assinatura em papel; o acompanhamento real é indispensável.',
    dificuldade: 'dificil',
    categoria: 'cotidiano',
    competencia: 'convivencia',
    referencia: 'Psicologia do Julgamento Moral e Monitoramento Pedagógico'
  },
  {
    id: 'dificil_059',
    pergunta: 'De acordo com o Artigo 5º da Constituição Federal de 1988, o que assegura o direito à "indenização pelo dano material, moral ou à imagem" decorrente de agressões e difamações?',
    contexto: 'Fundamentação das garantias individuais fundamentais no Brasil.',
    opcoes: [
      'O Artigo 5º, Inciso V e Inciso X, que consagram a inviolabilidade da intimidade, da vida privada, da honra e da imagem das pessoas, assegurando o direito a indenização proporcional ao agravo.',
      'O Artigo 5º, Inciso I, que trata unicamente da alíquota de impostos de importação sobre produtos têxteis.',
      'O Artigo 5º, Inciso LX, que autoriza a tortura em casos de desobediência a professores de história.',
      'A Constituição não possui nenhum artigo sobre danos morais ou honra pessoal de cidadãos.'
    ],
    correta: 0,
    explicacao: 'O Art. 5º, X da CF/88 é a cláusula pétrea que protege a honra e a imagem de todo ser humano, servindo de base para a responsabilização por danos morais em qualquer esfera social.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Constituição Federal de 1988, Artigo 5º, Incisos V e X'
  },
  {
    id: 'dificil_060',
    pergunta: 'Em uma situação de conflito entre duas turmas por causa do uso do campo de futebol da escola, qual método de negociação integrativa previne que a disputa descambe para o bullying coletivo?',
    contexto: 'Mediação institucional entre representantes das turmas do 1º e 3º Ano.',
    opcoes: [
      'Mapear os interesses reais de ambos os grupos (horários de treino, dias de campeonato), criar opções de ganho mútuo (revezamento compartilhado, jogos amistosos) e estabelecer critérios objetivos de justiça.',
      'Declarar que a turma mais velha tem a posse perpétua do campo e proibir os mais jovens de entrar.',
      'Incentivar uma disputa de socos entre os líderes das turmas para decidir quem fica com o campo.',
      'Queimar o gramado do campo para que nenhuma das duas turmas possa usufruir do espaço.'
    ],
    correta: 0,
    explicacao: 'A negociação baseada em interesses (modelo de Harvard) transforma disputas posicionais ("o campo é meu") em soluções criativas de ganho compartilhado ("como podemos usufruir melhor juntos").',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'Roger Fisher & William Ury - Getting to Yes (Negociação Integrativa de Conflitos)'
  },
  {
    id: 'dificil_061',
    pergunta: 'Qual é o impacto da "exclusão relacional velada" (não convidar propositalmente para grupos de mensagens onde são discutidas tarefas avaliativas) sobre a equidade de oportunidades educacionais?',
    contexto: 'Queixa de estudante isolada cujos colegas omitiram o tema da prova prática de ciências.',
    opcoes: [
      'Compromete a igualdade formal e material de acesso aos conteúdos, configurando assédio moral escolar e prejudicando diretamente o desempenho avaliativo e o direito de aprender.',
      'Serve como estímulo pedagógico louvável para que a aluna aprenda a adivinhar as tarefas sozinha.',
      'Não provoca nenhum prejuízo, pois informações acadêmicas são privadas de cada grupo que as descobre.',
      'A escola considera que a omissão de dados entre colegas é uma estratégia de mercado aceitável.'
    ],
    correta: 0,
    explicacao: 'Ocultar deliberadamente informações acadêmicas de um colega para prejudicar sua nota é uma forma de sabotagem e assédio moral que fere a isonomia estudantil e o dever de lealdade acadêmica.',
    dificuldade: 'dificil',
    categoria: 'cotidiano',
    competencia: 'bullying',
    referencia: 'Assédio Moral nas Relações Escolares e Universitárias (Guedes)'
  },
  {
    id: 'dificil_062',
    pergunta: 'Sob a perspectiva da sociologia de Émile Durkheim, o que a anomia (enfraquecimento das normas e dos laços morais coletivos) provoca na incidência de violência escolar?',
    contexto: 'Estudos clássicos sobre coesão social aplicados ao ambiente educacional.',
    opcoes: [
      'Quando as regras comuns perdem sua força de coesão e legitimidade, os limites éticos esfarelam-se, gerando desordem, proliferação de agressões e sensação generalizada de desamparo.',
      'A ausência de normas torna todos os indivíduos automaticamente generosos e desprovidos de conflitos.',
      'A anomia é o estado perfeito de harmonia social preconizado por todos os sociólogos do século XIX.',
      'As normas sociais só têm utilidade em comunidades religiosas isoladas da civilização moderna.'
    ],
    correta: 0,
    explicacao: 'Durkheim (O Suicídio e Da Divisão do Trabalho Social) formulou o conceito de anomia: sem normas morais claras internalizadas e respeitadas pela coletividade, impera a lei do mais forte e o sofrimento psíquico.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'convivencia',
    referencia: 'Émile Durkheim - Da Divisão do Trabalho Social e O Suicídio'
  },
  {
    id: 'dificil_063',
    pergunta: 'Qual a responsabilidade penal dos provedores de redes sociais e aplicações de internet caso não removam conteúdos graves de exploração sexual ou violência extrema envolvendo menores após notificação judicial?',
    contexto: 'Artigo 19 do Marco Civil da Internet e disposições do ECA.',
    opcoes: [
      'Os provedores respondem civilmente de forma solidária pelos danos causados e seus dirigentes podem ser responsabilizados penalmente por desobediência a ordem judicial e conivência com ilícitos graves.',
      'As empresas de tecnologia têm imunidade perpétua e não precisam obedecer a nenhuma decisão de juízes brasileiros.',
      'Os provedores só respondem se a sede da empresa for no mesmo município da escola onde o fato ocorreu.',
      'A responsabilidade recai exclusivamente sobre as empresas de fornecimento de energia elétrica da cidade.'
    ],
    correta: 0,
    explicacao: 'O Marco Civil da Internet (Art. 19 e 21) e o ECA impõem aos provedores dever rigoroso de remoção célere de conteúdos ilícitos notificados, sob pena de responsabilização civil e criminal cabível.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Marco Civil da Internet (Lei nº 12.965/2014), Artigos 19 e 21'
  },
  {
    id: 'dificil_064',
    pergunta: 'O que o conceito de "Escuta Protegida" instituído pela Lei Federal nº 13.431/2017 prevê para evitar a revitimização de crianças e adolescentes vítimas ou testemunhas de violência?',
    contexto: 'Procedimentos de depoimento especial em ambiente escolar e judiciário.',
    opcoes: [
      'A criação de procedimentos especializados de escuta especializada e depoimento especial, em ambiente acolhedor, conduzidos por profissionais capacitados, evitando perguntas sugestivas e repetições desnecessárias da narrativa da dor.',
      'A obrigação de o adolescente ser interrogado em audiência aberta transmitida pela televisão.',
      'A proibição de que o adolescente fale com qualquer psicólogo ou assistente social após a violência.',
      'A aplicação de testes com choques elétricos para confirmar a veracidade das respostas do jovem.'
    ],
    correta: 0,
    explicacao: 'A Lei nº 13.431/2017 estabeleceu o sistema de garantia de direitos da criança e do adolescente vítima ou testemunha de violência, criando protocolos científicos de escuta para impedir o trauma do interrogatório comum.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Lei Federal nº 13.431/2017 (Sistema de Garantia de Direitos e Escuta Especializada)'
  },
  {
    id: 'dificil_065',
    pergunta: 'Como a "Pedagogia da Convivência Democrática" articula a relação entre a autoridade pedagógica e a autonomia discente na superação do autoritarismo e da violência?',
    contexto: 'Projeto Político Pedagógico voltado para escolas públicas de excelência humana.',
    opcoes: [
      'A autoridade docente não se confunde com autoritarismo opressor: ela é uma referência ética que guia e protege, construindo espaços onde os educandos exercitam sua autonomia com responsabilidade e respeito aos direitos do outro.',
      'A autoridade pedagógica deve ser eliminada para que os alunos façam o que quiserem sem nenhuma regra.',
      'O autoritarismo rígido é a única forma de garantir que nenhum aluno cometa erros disciplinares na vida.',
      'Os professores não têm autoridade legal para interferir em agressões que ocorram fora da sala de aula.'
    ],
    correta: 0,
    explicacao: 'Hannah Arendt (A Crise na Educação) esclarece que a autoridade legítima cuida e introduz o jovem no mundo comum, enquanto o autoritarismo cego gera rebelião ou passividade covarde.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'convivencia',
    referencia: 'Hannah Arendt - Entre o Passado e o Futuro (A Crise na Educação)'
  },
  {
    id: 'dificil_066',
    pergunta: 'Quando um aluno pratica atos reiterados de bullying sob o argumento de que "está apenas imitando o que vê influenciadores famosos fazerem na internet", qual fenômeno sociológico se evidencia?',
    contexto: 'Discussão sobre a mediação da cultura digital e a modelagem do comportamento juvenil.',
    opcoes: [
      'A teoria da aprendizagem social (Bandura): o comportamento agressivo é modelado pela observação e imitação de figuras de prestígio que recebem recompensas sociais (curtidas, fama) por atitudes predatórias.',
      'A demonstração biológica de que seres humanos não possuem vontade própria nem livre-arbítrio.',
      'A comprovação de que influenciadores digitais detêm poder soberano sobre as leis de trânsito estaduais.',
      'Um fenômeno meteorológico que afeta apenas adolescentes em anos bissextos.'
    ],
    correta: 0,
    explicacao: 'Albert Bandura demonstrou no experimento do João Bobo que a agressão é aprendida por modelagem social. Quando criadores de conteúdo lucram com a humilhação alheia, jovens imitam esse padrão.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    referencia: 'Albert Bandura - Social Learning Theory (Teoria da Aprendizagem Social)'
  },
  {
    id: 'dificil_067',
    pergunta: 'O que a jurisprudência consolidada do Superior Tribunal de Justiça (STJ) entende sobre a caracterização do "dano moral in re ipsa" em casos de violação grave à honra e imagem de estudantes menores de idade?',
    contexto: 'Julgamento de ação indenizatória por exposição indevida e humilhação vexatória.',
    opcoes: [
      'O dano moral é considerado in re ipsa (presumido pela própria força do fato): a violação manifesta da honra e imagem de uma criança/adolescente prescinde de prova pericial de sofrimento íntimo, sendo o dano evidente pela gravidade do ato ilícito em si.',
      'A vítima deve provar com atestados médicos assinados por cinco psiquiatras que chorou por mais de dez dias consecutivos.',
      'Não existe dano moral para quem tem menos de dezoito anos de idade no ordenamento jurídico pátrio.',
      'O dano só pode ser reconhecido se a vítima tiver sido agredida com instrumentos de metal cortante.'
    ],
    correta: 0,
    explicacao: 'O STJ consolidou que o vilipêndio à honra subjetiva e à imagem de menores gera dano moral in re ipsa: a própria gravidade da exposição humilhante já basta para o dever legal de indenizar.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'STJ - AgInt no AREsp 1.724.892/SP e REsp 1.832.482/SP'
  },
  {
    id: 'dificil_068',
    pergunta: 'Qual o papel da "tutela inibitória" no âmbito do Direito Civil e Processual Civil diante de ameaças continuadas de cyberbullying contra um estudante?',
    contexto: 'Medida judicial de urgência para impedir a divulgação iminente de fotos íntimas ou ofensivas.',
    opcoes: [
      'Uma ordem judicial que impõe obrigação de não fazer sob pena de multa diária (astreintes), com o objetivo de impedir a prática, a continuação ou a repetição do ato ilícito antes que o dano irreparável se consuma.',
      'A condenação criminal do réu a trabalhos forçados em minas de carvão vegetal.',
      'O cancelamento da linha telefônica de todos os moradores do bairro da vítima.',
      'A obrigatoriedade de a vítima fazer exames de sangue semanais durante cinco anos.'
    ],
    correta: 0,
    explicacao: 'A tutela inibitória (Art. 497 do CPC) foca na prevenção: atua antes do dano para evitar que a ofensa seja publicada ou reiterada, salvaguardando a honra da vítima com eficácia imediata.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Código de Processo Civil, Artigo 497 (Tutela Inibitória e Remoção do Ilícito)'
  },
  {
    id: 'dificil_069',
    pergunta: 'Como a teoria do "Desenvolvimento Psicossocial" de Erik Erikson explica a crise de "Identidade versus Confusão de Papéis" na vulnerabilidade dos adolescentes ao bullying?',
    contexto: 'Compreensão da psicologia do desenvolvimento nas turmas de Ensino Médio.',
    opcoes: [
      'Na adolescência, o indivíduo está construindo quem ele é no mundo; ser atacado, rotulado e rejeitado sistematicamente nessa fase crítica fragmenta a consolidação da autoimagem e gera confusão profunda de identidade.',
      'Na adolescência, os seres humanos já têm a identidade completamente fechada e inalterável desde o nascimento.',
      'Erikson provou que os conflitos escolares só afetam pessoas que não gostam de esportes ao ar livre.',
      'A crise de identidade só ocorre em adolescentes que vivem em países do hemisfério norte.'
    ],
    correta: 0,
    explicacao: 'Erikson identificou o quinto estágio psicossocial como a busca por identidade e fidelidade a valores. O bullying destrói a segurança básica de que o jovem necessita para se autodefinir com dignidade.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    referencia: 'Erik Erikson - Infância e Sociedade (Os Oito Estágios do Homem)'
  },
  {
    id: 'dificil_070',
    pergunta: 'Qual a importância de se auditar a "isenção de viés ideológico ou pessoal" por parte dos membros de uma comissão escolar de mediação restaurativa?',
    contexto: 'Diretrizes éticas para a nomeação de facilitadores da paz nas escolas estaduais.',
    opcoes: [
      'Garantir que os mediadores atuem com estrita imparcialidade equidistante, ouvindo as partes sem preconceitos de raça, credo, condição social ou preferências familiares, assegurando a legitimidade das decisões.',
      'Exigir que todos os membros da comissão tenham a mesma opinião política e religiosa obrigatoriamente.',
      'Permitir que os mediadores favoreçam os alunos de cujas famílias eles são amigos pessoais íntimos.',
      'Fazer com que a comissão só atenda ocorrências que envolvam alunos do turno da manhã.'
    ],
    correta: 0,
    explicacao: 'A imparcialidade do mediador é pressuposto ético e processual da mediação (Lei nº 13.140/2015, Art. 2º). Se as partes desconfiam da neutralidade do facilitador, o processo restaurativo perde sua eficácia.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'direitos',
    referencia: 'Lei da Mediação (Lei nº 13.140/2015), Artigo 2º'
  },
  {
    id: 'dificil_071',
    pergunta: 'O que o conceito de "Hiperindividualismo Narcísico" da sociedade contemporânea provoca nas relações escolares de empatia e solidariedade?',
    contexto: 'Diagnóstico sociológico sobre a frieza relacional e o deboche nas mídias sociais.',
    opcoes: [
      'Estimula o culto à autopromoção e à visibilidade individual a qualquer custo, transformando o sofrimento do outro em entretenimento cínico e enfraquecendo a capacidade de compaixão e cuidado mútuo.',
      'Faz com que todos os estudantes queiram doar seus materiais escolares para bibliotecas públicas.',
      'Garante que nenhuma pessoa sinta tristeza ou cansaço durante a vida escolar.',
      'Elimina qualquer tipo de rivalidade esportiva em competições estaduais de atletismo.'
    ],
    correta: 0,
    explicacao: 'Christopher Lasch (A Cultura do Narcisismo) e Gilles Lipovetsky diagnosticaram o recuo do compromisso público em prol do exibicionismo individual, terreno fértil para o cyberbullying e a crueldade cínica.',
    dificuldade: 'dificil',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    referencia: 'Christopher Lasch - A Cultura do Narcisismo e Gilles Lipovetsky - A Era do Vazio'
  },
  {
    id: 'dificil_072',
    pergunta: 'Por que a prática da "intimação sistemática em matilha" (mobbing escolar), onde um grupo numeroso ataca conjuntamente um único indivíduo, é considerada de periculosidade psicológica máxima?',
    contexto: 'Análise de ocorrência de linchamento social em sala de aula.',
    opcoes: [
      'Porque a força desproporcional do coletivo anula qualquer chance de defesa da vítima, destrói seu apoio de pares e intensifica o sentimento de desamparo absoluto perante o mundo.',
      'Porque a lei brasileira considera que ataques em grupo são infrações leves sem direito a queixa.',
      'Apenas porque faz barulho excessivo e desconcentra os professores durante o planejamento de aulas.',
      'Porque grupos com mais de três pessoas só podem se reunir na escola com permissão de cartório.'
    ],
    correta: 0,
    explicacao: 'O mobbing (Heinz Leymann) ataca a sanidade da vítima por sufocamento coletivo. A sensação de ter o mundo inteiro contra si é uma das principais causas de ideação suicida na adolescência.',
    dificuldade: 'dificil',
    categoria: 'consequencias',
    competencia: 'bullying',
    referencia: 'Heinz Leymann - The Content and Development of Mobbing at Work and School'
  },
  {
    id: 'dificil_073',
    pergunta: 'Qual o papel da "autocrítica pedagógica" por parte do corpo docente quando uma sala apresenta índices alarmantes e persistentes de segregação e hostilidade?',
    contexto: 'Reunião de avaliação de gestão pedagógica na EEMTI Alfredo Machado.',
    opcoes: [
      'Reconhecer que o ambiente de sala de aula e a metodologia pedagógica influenciam o clima relacional, revendo dinâmicas de ensino competitivas e adotando estratégias cooperativas e dialógicas.',
      'Concluir que aquela turma específica nasceu com defeitos genéticos irreparáveis e desistir de ensinar.',
      'Culpar exclusivamente as famílias e eximir a escola de qualquer responsabilidade formativa.',
      'Cancelar as aulas daquela sala de aula e transferir os alunos para trabalhos manuais fora do colégio.'
    ],
    correta: 0,
    explicacao: 'A sala de aula não é um recipiente passivo. Métodos ultra-competitivos que premiam apenas o vencedor e humilham os demais incentivam o clima predatório. A pedagogia cooperativa desfaz esse padrão.',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    referencia: 'David Johnson & Roger Johnson - Cooperative Learning in the Classroom'
  },
  {
    id: 'dificil_074',
    pergunta: 'Sob o prisma do Direito Constitucional e da Teoria dos Direitos Fundamentais, qual a fundamentação que sustenta que "a dignidade da pessoa humana" é o valor supremo que baliza todos os regulamentos escolares?',
    contexto: 'Artigo 1º, Inciso III da Constituição da República Federativa do Brasil.',
    opcoes: [
      'A dignidade da pessoa humana é o princípio fundamental fundante da República, funcionando como limite inultrapassável a qualquer regra disciplinar, autoridade docente ou convenção comunitária.',
      'A dignidade da pessoa humana é uma recomendação facultativa que as escolas podem aplicar apenas nos feriados.',
      'O regulamento disciplinar da escola tem poder jurídico superior à Constituição Federal do Brasil.',
      'A dignidade humana é um conceito que só se aplica a cidadãos que tenham concluído o ensino superior.'
    ],
    correta: 0,
    explicacao: 'A dignidade da pessoa humana (Art. 1º, III da CF/88) é o vetor hermenêutico de todo o ordenamento jurídico. Nenhuma norma regimental de escola pode humilhar, degradar ou violar o ser humano.',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    referencia: 'Constituição Federal de 1988, Artigo 1º, Inciso III'
  },
  {
    id: 'dificil_075',
    pergunta: 'Em última síntese, qual é a postura ética esperada de um estudante que conclui a trilha de formação da Central de Respeito do StopBullying?',
    contexto: 'Jornada final de certificação e compromisso ético cidadão na EEMTI Alfredo Machado.',
    opcoes: [
      'Tornar-se um cidadão consciente, ativo e corajoso: alguém que não se cala diante da injustiça, protege a dignidade dos vulneráveis, pratica a escuta empática e constrói ativamente a paz em sua comunidade escolar.',
      'Apenas decorar as respostas para tirar notas altas e continuar zombando de colegas longe dos professores.',
      'Achar que o sofrimento alheio não lhe diz respeito desde que ele próprio esteja seguro.',
      'Usar seus conhecimentos de leis para ameaçar colegas de turma em disputas de jogos virtuais.'
    ],
    correta: 0,
    explicacao: 'A educação autêntica transforma o coração e a mente: a sabedoria adquirida só tem sentido quando se traduz em coragem cívica, generosidade diária e defesa incondicional da vida e da dignidade de todos.',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'respeito',
    referencia: 'Projeto Sentinela / StopBullying - Cultura da Paz e Direitos Humanos na Educação'
  }
];




export const DIFICIL_QUIZZES: QuizItem[] = [
  {
    id: 'quiz_dificil_01',
    titulo: 'Qualificadora do Cyberbullying no Código Penal',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'Em conformidade com o Artigo 146-A do Código Penal brasileiro (introduzido pela Lei nº 14.811/2024), qual elemento jurídico diferencia a conduta de "Intimidação Sistemática" de sua forma qualificada, o "Cyberbullying"?',
    contexto: 'Análise de processo pedagógico e legal envolvendo conduta praticada por alunos dentro e fora do perímetro escolar.',
    opcoes: [
      'O cyberbullying é tipificado quando a conduta é cometida por meio da rede de computadores, de rede social, de aplicativos, de jogos on-line ou por qualquer outro meio digital, fixando pena de reclusão de 2 a 4 anos e multa.',
      'O cyberbullying exige que a vítima seja maior de 18 anos e resida em comarca judiciária distinta da dos agressores.',
      'A modalidade presencial tem pena de reclusão inafiançável, enquanto o cyberbullying é punido apenas com advertência administrativa sem registro.',
      'O cyberbullying prescinde de dolo ou intenção, bastando o compartilhamento acidental de imagens em grupos restritos de conversa.'
    ],
    correta: 0,
    explicacao: 'O Parágrafo Único do Art. 146-A do Código Penal qualifica expressamente a intimidação sistemática praticada em ambientes digitais, fixando pena de reclusão de 2 a 4 anos e multa, refletindo o elevado alcance lesivo e a permanência temporal da violência virtual.',
    justificativaIncorretas: [
      'A lei protege prioritariamente crianças e adolescentes, não exigindo maioridade da vítima nem distinção de comarca.',
      'A modalidade presencial é apenada com multa (se o fato não constitui crime mais grave), ao passo que a forma digital é que possui a pena de reclusão.',
      'O tipo penal exige dolo específico de intimidar sistematicamente; condutas meramente culposas e acidentais não preenchem a tipicidade.'
    ],
    referencia: 'Código Penal Brasileiro, Art. 146-A, Parágrafo Único (Lei nº 14.811/2024)',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_dificil_02',
    titulo: 'Responsabilidade Civil Objetiva Institucional',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'Um colégio tomou conhecimento de que um estudante sofria intimidações físicas e psicológicas diárias em seus corredores. A instituição limitou-se a sugerir à família que "trocasse o aluno de escola para evitar atritos". Sob a ótica da responsabilidade civil no Direito brasileiro, qual é a consequência jurídica dessa inércia?',
    contexto: 'Ação indenizatória cível promovida pela família do aluno agredido por danos morais e materiais decorrentes de estresse pós-traumático.',
    opcoes: [
      'A instituição responde civilmente de forma objetiva pelo dever de custódia e incolumidade física e psíquica dos educandos, configurando negligência inescusável o ato de transferir o ônus da agressão para a vítima.',
      'A escola está isenta de responsabilidade, uma vez que o bullying é conduta exclusiva entre terceiros desprovida de nexo com o contrato educacional.',
      'A responsabilidade é puramente subjetiva e só se configura se houver confissão espontânea assinada pelo professor da matéria em que ocorreu o fato.',
      'O ordenamento jurídico brasileiro veda a indenização por danos morais quando os envolvidos no ato infracional são estudantes menores de 16 anos.'
    ],
    correta: 0,
    explicacao: 'Conforme consolidada jurisprudência do Superior Tribunal de Justiça (STJ) e os arts. 14 do CDC e 932, IV do Código Civil, a escola assume o dever de vigilância e proteção integral. A inércia institucional diante de intimidação reiterada enseja o dever de indenizar danos morais e materiais.',
    justificativaIncorretas: [
      'A relação educacional gera dever de segurança integral; o bullying entre alunos durante o horário escolar insere-se no risco da atividade institucional.',
      'A responsabilidade dos estabelecimentos educacionais é objetiva, prescindindo de prova de dolo direto ou confissão de professor.',
      'A menoridade dos praticantes não impede a fixação de indenização civil suportada pela escola ou pelos responsáveis legais.'
    ],
    referencia: 'STJ - REsp 1.344.044/RJ e Código de Defesa do Consumidor, Art. 14',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_dificil_03',
    titulo: 'Deepfakes Pornográficas e o Art. 241-C do ECA',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'direitos',
    enunciado: 'Estudantes utilizaram ferramentas de Inteligência Artificial generativa para criar montagens hiper-realistas (deepfakes) do rosto de uma colega de classe em corpos despidos e disseminaram o conteúdo em servidores de mensagens. Sob o prisma do Estatuto da Criança e do Adolescente (ECA) e do Código Penal, como se capitula essa conduta?',
    contexto: 'Investigação policial sobre assédio virtual e violência de gênero digital em ambiente escolar.',
    opcoes: [
      'Configura ato infracional análogo ao crime do Artigo 241-C do ECA (produção/criação de cena de sexo explícito ou pornográfica simulada envolvendo criança ou adolescente), com concurso de difamação e cyberbullying.',
      'Trata-se de mero exercício de liberdade criativa tecnológica protegido pela Lei de Direitos Autorais e pelo Marco Civil da Internet.',
      'A conduta é penalmente atípica no Brasil, pois a Inteligência Artificial é considerada ente sem personalidade jurídica responsável.',
      'A infração restringe-se ao delito de perturbação da tranquilidade, sendo resolvida exclusivamente com pedido de desculpas verbal.'
    ],
    correta: 0,
    explicacao: 'O Art. 241-C do ECA criminaliza expressamente a simulação, adulteração ou montagem de imagens com conotação sexual ou pornográfica envolvendo crianças e adolescentes. A utilização de IA para constranger e violar a dignidade sexual atrai sanção severa do sistema de justiça juvenil.',
    justificativaIncorretas: [
      'A liberdade de criação intelectual encontra limite absoluto nos direitos fundamentais da personalidade e na dignidade sexual infanto-juvenil.',
      'A responsabilidade penal recai sobre as pessoas físicas que operaram a tecnologia para criar e disseminar o conteúdo ilícito.',
      'A gravidade do delito contra a dignidade sexual de menor afasta qualquer equiparação a mera perturbação da tranquilidade.'
    ],
    referencia: 'ECA (Lei nº 8.069/1990), Art. 241-C e Lei nº 14.811/2024',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_dificil_04',
    titulo: 'Desenvolvimento Moral de Kohlberg e o Espectador',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    enunciado: 'No âmbito da Psicologia Moral (conforme Lawrence Kohlberg), um estudante que se recusa a denunciar o bullying por medo de ser rejeitado pelos colegas de turma ("medo de ser chamado de dedo-duro") encontra-se em qual estágio de desenvolvimento moral?',
    contexto: 'Análise de pesquisa pedagógica sobre os entraves psicossociais à denúncia de abusos entre pares.',
    opcoes: [
      'Nível Convencional, Estágio 3 (Orientação da Boa Criança / Concordância Interpessoal), onde a moralidade é pautada primariamente pela necessidade de aprovação social e conformidade com os pares imediatos.',
      'Nível Pré-Convencional, Estágio 1 (Orientação para Punição e Obediência Cega a Autoridades Divinas).',
      'Nível Pós-Convencional, Estágio 6 (Princípios Éticos Universais de Justiça e Dignidade Incondicional).',
      'Estágio de Anomia Absoluta, caracterizado pela ausência biológica de conexões neurológicas no córtex pré-frontal.'
    ],
    correta: 0,
    explicacao: 'No Estágio 3 de Kohlberg, o julgamento moral é dependente da expectativa do grupo de pares ("o que vão pensar de mim?"). A superação dessa barreira exige avançar para a moralidade autônoma pautada no dever ético universal de proteção à vida humana.',
    justificativaIncorretas: [
      'O Estágio 1 guia-se exclusivamente pela fuga do castigo físico imposto por autoridade superior, não pelo desejo de pertencimento social.',
      'O Estágio 6 orienta-se por princípios de justiça universal, agindo para proteger o vulnerável mesmo contrariando as regras do grupo.',
      'A anomia não decorre de defeito neurológico biológico, sendo um conceito de sociologia das normas.'
    ],
    referencia: 'Lawrence Kohlberg - A Psicologia do Desenvolvimento Moral',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_dificil_05',
    titulo: 'Estatuto da Criança e Atos Infracionais Escolares',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'Um adolescente de 15 anos agride fisicamente um colega e publica o vídeo nas redes sociais vangloriando-se do ato. Sob o prisma do Estatuto da Criança e do Adolescente (ECA), qual é o enquadramento jurídico e as medidas aplicáveis ao autor?',
    contexto: 'Procedimento instaurado na Vara da Infância e Juventude para apuração de conduta violenta escolar.',
    opcoes: [
      'A conduta tipifica-se como ato infracional análogo às infrações de lesão corporal e cyberbullying, sendo o adolescente submetido a medidas socioeducativas (como prestação de serviços à comunidade, liberdade assistida ou internação).',
      'O adolescente é considerado inimputável absoluto e, portanto, imune a qualquer processo, medida estatal ou acompanhamento judicial.',
      'O adolescente deve ser transferido imediatamente para penitenciária estadual de segurança máxima para adultos.',
      'A punição restringe-se exclusivamente à reprovação escolar automática no ano letivo em curso.'
    ],
    correta: 0,
    explicacao: 'Pelo ECA (Art. 103), a conduta descrita como crime na lei penal praticada por adolescente é ato infracional. O jovem responde perante a Justiça da Infância, estando sujeito às medidas socioeducativas do Art. 112 do ECA.',
    justificativaIncorretas: [
      'Adolescentes entre 12 e 18 anos são imputáveis na esfera socioeducativa do ECA, não gozando de impunidade absoluta.',
      'A Constituição veda expressamente o encarceramento de adolescentes em estabelecimentos prisionais destinados a adultos.',
      'Medidas socioeducativas são jurisdicionais do Poder Judiciário, distintas de sanções pedagógicas acadêmicas.'
    ],
    referencia: 'Estatuto da Criança e do Adolescente (Lei nº 8.069/1990), Arts. 103 e 112',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_dificil_06',
    titulo: 'Desengajamento Moral de Albert Bandura',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    enunciado: 'O psicólogo Albert Bandura formulou a teoria dos "Mecanismos de Desengajamento Moral" para explicar como indivíduos éticos conseguem praticar atrocidades e violências sem sentir culpa. Qual mecanismo é exemplificado pela frase: "Todo mundo nesta escola já zombou dele alguma vez, por que só eu sou culpado?"',
    contexto: 'Entrevista psicológica com agressores escolares que tentam justificar atos reiterados.',
    opcoes: [
      'Difusão da responsabilidade social e comparação vantajosa paliativa.',
      'Desumanização categórica por via biológica essencialista.',
      'Distorção psicótica das percepções sensoriais espaciais.',
      'Regressão reflexiva ao estágio sensório-motor piagetiano.'
    ],
    correta: 0,
    explicacao: 'A difusão de responsabilidade dilui a culpa pessoal no coletivo ("se todos fazem, a culpa não é minha"), enquanto a comparação vantajosa atenua o peso do ato agressivo perante a consciência do autor.',
    justificativaIncorretas: [
      'A desumanização envolve retirar a humanidade da vítima (ex: chamá-la de objeto ou animal), o que não é o foco do argumento citado.',
      'O desengajamento moral é um processo psicossocial e cognitivo consciente, não um quadro psicótico com alucinações sensoriais.',
      'O estágio sensório-motor é fase do desenvolvimento infantil precoce (0 a 2 anos), irrelevante para a dinâmica moral adolescente.'
    ],
    referencia: 'Albert Bandura - Moral Disengagement: How People Do Harm and Live with Themselves',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_dificil_07',
    titulo: 'Marco Civil da Internet e Responsabilidade de Plataformas',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'direitos',
    enunciado: 'De acordo com o Artigo 19 do Marco Civil da Internet (Lei nº 12.965/2014) e as exceções da Lei nº 14.811/2024, quando uma plataforma de rede social pode ser civilmente responsabilizada por conteúdos de cyberbullying e crimes contra crianças e adolescentes gerados por seus usuários?',
    contexto: 'Ação judicial contra rede social que manteve no ar página de assédio sistemático escolar.',
    opcoes: [
      'Quando, após ordem judicial específica (ou notificação nos casos de violação de intimidade e pornografia de vingança), não tomar providências para indisponibilizar o conteúdo no âmbito e nos limites técnicos do seu serviço.',
      'A plataforma responde solidariamente de forma instantânea no segundo exato em que a mensagem é publicada, independente de qualquer aviso.',
      'As plataformas possuem imunidade absoluta internacional e jamais podem ser responsabilizadas no território brasileiro.',
      'Apenas se a sede mundial da empresa estiver localizada na mesma rua da escola da vítima.'
    ],
    correta: 0,
    explicacao: 'O Art. 19 do Marco Civil estabelece o regime de notificação judicial (notice and takedown), com exceções imediatas para conteúdos sexuais de menores (Art. 21). O descumprimento gera responsabilidade civil da empresa pelos danos gerados.',
    justificativaIncorretas: [
      'O regime geral do Marco Civil não adota responsabilidade civil instantânea sem prévia notificação judicial para todo e qualquer conteúdo.',
      'Empresas estrangeiras que ofertam serviços no Brasil submetem-se à jurisdição e soberania jurídica brasileira (Art. 11 da Lei 12.965/2014).',
      'A competência jurisdicional vincula-se ao território nacional, sendo irrelevante a localização física do bairro ou rua da sede.'
    ],
    referencia: 'Marco Civil da Internet (Lei nº 12.965/2014), Arts. 11, 19 e 21',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_dificil_08',
    titulo: 'O Efeito Espectador e a Diluição de Ajuda',
    dificuldade: 'dificil',
    categoria: 'espectador',
    competencia: 'convivencia',
    enunciado: 'Os psicólogos sociais John Darley e Bibb Latané descreveram o célebre "Efeito Espectador" (Bystander Effect). No contexto de uma agressão violenta no pátio da escola presenciada por centenas de alunos, qual é o paradoxo psicossocial observado?',
    contexto: 'Uma briga coletiva se desenrola por 10 minutos sem que nenhum aluno busque ajuda ou intervenha.',
    opcoes: [
      'Quanto maior o número de testemunhas presentes, menor é a probabilidade individual de que alguém tome a iniciativa de ajudar ou buscar auxílio, devido à diluição psicológica da responsabilidade pessoal.',
      'Quanto maior o número de testemunhas, mais rápida e unânime é a reação protetiva de acolhimento à vítima.',
      'A presença de testemunhas sempre estimula a vítima a derrotar fisicamente todos os seus agressores.',
      'O efeito espectador só se manifesta em dias de chuva ou em locais totalmente fechados.'
    ],
    correta: 0,
    explicacao: 'Na presença de uma multidão silenciosa, cada indivíduo supõe que outro já agiu ou que a inércia dos demais sinaliza que a situação não é urgente. Essa diluição paralisa o socorro moral.',
    justificativaIncorretas: [
      'Estudos empíricos comprovam o contrário: multidões reduzem a probabilidade de socorro rápido individual se não houver liderança consciente.',
      'A presença de testemunhas passivas frequentemente acentua a humilhação e a sensação de impotência da vítima.',
      'O fenômeno decorre da dinâmica social de grupo, ocorrendo em qualquer condição climática ou espacial.'
    ],
    referencia: 'Darley, J. M., & Latané, B. (1968) - Bystander Intervention in Emergencies',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_dificil_09',
    titulo: 'Racismo Recreativo no Ambiente Escolar',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'direitos',
    enunciado: 'O jurista Adilson Moreira conceituou o "Racismo Recreativo". Como essa matriz sociológica e jurídica se manifesta quando apelidos e comentários de cunho racial são mascarados como "brincadeiras de escola"?',
    contexto: 'Análise de conflito escolar onde alunos brancos usam termos pejorativos contra um colega negro e alegam "falta de senso de humor" da vítima.',
    opcoes: [
      'Utiliza o humor e a ludicidade como artifícios estratégicos para naturalizar a inferiorização racial, protegendo o agressor sob a imunidade aparente da piada enquanto perpetua opressão estrutural e crime inafiançável.',
      'Constitui exercício pedagógico de liberdade de cátedra garantido pela Lei de Diretrizes e Bases da Educação.',
      'É conduta atípica no Brasil, pois piadas e anedotas não possuem poder de violar o princípio da dignidade humana.',
      'Trata-se de uma prática tradicional brasileira formalmente incentivada pelo Conselho Nacional de Educação.'
    ],
    correta: 0,
    explicacao: 'O racismo recreativo instrumentaliza o riso para legitimar estereótipos depreciativos. A Lei nº 14.532/2023 equiparou a injúria racial ao crime de racismo, imprescritível e inafiançável, repelindo a escusa do humor.',
    justificativaIncorretas: [
      'A liberdade docente e pedagógica tem o dever de combater o racismo, não de acobertar práticas discriminatórias.',
      'O STF e os tribunais pacificaram que a ofensa motivada por raça através de piadas é racismo criminoso, desprovido de qualquer amparo lúdico.',
      'O CNE determina a obrigatoriedade da educação para as relações étnico-raciais e combate a todo preconceito (Lei nº 10.639/2003).'
    ],
    referencia: 'Adilson Moreira - O que é Racismo Recreativo? e Lei Federal nº 14.532/2023',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_dificil_10',
    titulo: 'Princípio do Melhor Interesse da Criança',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'O princípio do "Melhor Interesse da Criança" (Best Interests of the Child), consagrado na Convenção da ONU sobre os Direitos da Criança e no Art. 227 da CF/88, estabelece qual diretriz hermenêutica para a escola ao intervir em um caso complexo de bullying?',
    contexto: 'Decisão pedagógica entre punir com expulsão sumária ou aplicar abordagem socioeducativa integrativa.',
    opcoes: [
      'Os direitos fundamentais e o desenvolvimento biopsicossocial do educando devem ser a consideração primordial e preponderante em todas as decisões administrativas, pedagógicas e disciplinares adotadas pela instituição.',
      'A escola deve priorizar os interesses financeiros de sua mantenedora e a preservação de sua imagem pública antes do bem-estar dos alunos.',
      'Os alunos agressores devem ser sumariamente excluídos do sistema de ensino para que nunca mais tenham acesso a qualquer escola.',
      'As normas regimentais internas de uma escola privada têm primazia hierárquica sobre os tratados internacionais de direitos humanos ratificados pelo Brasil.'
    ],
    correta: 0,
    explicacao: 'O Art. 227 da CF/88 coloca a infância e juventude como prioridade absoluta. Todas as medidas socioeducativas e pedagógicas devem buscar o pleno desenvolvimento, a proteção da integridade e a recuperação do laço social.',
    justificativaIncorretas: [
      'A dignidade dos estudantes prevalece incondicionalmente sobre interesses mercadológicos ou de imagem da mantenedora.',
      'O direito à educação é universal; medidas disciplinares não podem violar o direito constitucional ao acesso à educação.',
      'Tratados internacionais de direitos humanos possuem estatura supralegal/constitucional no ordenamento brasileiro (Art. 5º, §§ 2º e 3º da CF/88).'
    ],
    referencia: 'Constituição Federal de 1988, Art. 227 e Convenção sobre os Direitos da Criança (ONU, 1989)',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_dificil_11',
    titulo: 'Clima Escolar e Teoria da Anomia',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    enunciado: 'Em sociologia da educação (conforme Émile Durkheim e Robert Merton), quando uma instituição de ensino possui regras escritas no regimento, mas não as aplica de forma consistente, tolerando abusos silenciosos, instala-se o estado de:',
    contexto: 'Diagnóstico institucional de escola com altos índices de evasão e violência velada.',
    opcoes: [
      'Anomia escolar, caracterizada pela perda de eficácia reguladora das normas sociais, gerando desorientação ética, sensação de impunidade e proliferação de condutas predatórias.',
      'Hipernomia perfeita, onde a obediência absoluta às leis é alcançada sem qualquer necessidade de diálogo.',
      'Sociedade estamental imutável onde os estudantes são divididos em castas de nobreza e servidão.',
      'Equilíbrio homeostático perfeito garantido pelas leis da termodinâmica social.'
    ],
    correta: 0,
    explicacao: 'A anomia ocorre quando há um hiato entre a regra declarada e a realidade prática. Quando a escola não age perante a violência, os estudantes concluem que a lei não funciona, prevalecendo a "lei do mais forte".',
    justificativaIncorretas: [
      'Hipernomia pressupõe excesso de rigidez e controle coercitivo asfixiante, o inverso da ausência de eficácia normativa.',
      'Castas estamentais feudais são categorias históricas pré-modernas sem aderência conceitual ao diagnóstico sociológico da anomia escolar.',
      'A analogia termodinâmica não anula a necessidade de responsabilização ética e coerência regulatória institucional.'
    ],
    referencia: 'Émile Durkheim - Da Divisão do Trabalho Social e Teoria da Anomia',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['primeiro_passo_sabedoria']
  },
  {
    id: 'quiz_dificil_12',
    titulo: 'Vulnerabilidade Interseccional no Bullying',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'direitos',
    enunciado: 'A teórica Kimberlé Crenshaw desenvolveu o conceito de "Interseccionalidade". Como essa ferramenta analítica aprimora o diagnóstico do bullying escolar?',
    contexto: 'Caso de uma estudante negra, com deficiência motora e de baixa renda, que sofre intimidações multifacetadas.',
    opcoes: [
      'Permite compreender como diferentes marcadores sociais de desigualdade (gênero, raça, classe, deficiência, sexualidade) se cruzam e potencializam a vulnerabilidade e a intensidade da opressão sofrida pelo indivíduo.',
      'Defende que apenas uma única característica individual pode ser analisada por vez pelos comitês pedagógicos.',
      'Proíbe a análise de fatores socioeconômicos em casos de indisciplina estudantil.',
      'Determina que o bullying é um problema exclusivamente genético sem nenhuma relação com estruturas sociais.'
    ],
    correta: 0,
    explicacao: 'A abordagem interseccional revela que as violências não operam em silos isolados: a sobreposição de vulnerabilidades intensifica a exclusão, exigindo medidas integradas de acolhimento e proteção afirmativa.',
    justificativaIncorretas: [
      'A análise unidimensional fragmenta a compreensão e invisibiliza o impacto cumulativo das discriminações.',
      'Fatores socioeconômicos e culturais são cruciais para a compreensão ampla do clima escolar.',
      'Reduzir o bullying a determinismo genético ignora a vasta evidência sociológica, cultural e pedagógica.'
    ],
    referencia: 'Kimberlé Crenshaw - Documento para o Encontro de Especialistas em Aspectos da Discriminação Racial',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_dificil_13',
    titulo: 'Limites Constitucionais da Liberdade de Manifestação',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'Em um debate em sala de aula, um estudante sustenta que chamar um colega de "aberração" em uma rede social é exercício de sua liberdade de expressão garantida pelo Art. 5º, IV da CF/88. Sob a jurisprudência consolidada do STF, qual princípio afasta essa tese?',
    contexto: 'Procedimento de mediação escolar envolvendo discurso depreciativo virtual.',
    opcoes: [
      'O princípio da relatividade dos direitos fundamentais: a liberdade de manifestação não confere salvo-conduto para ofensas à dignidade humana, honra e inviolabilidade da vida privada (Art. 5º, X da CF/88).',
      'A liberdade de expressão é absoluta e irrestrita, sobrepondo-se a qualquer outro preceito constitucional.',
      'Apenas membros do Poder Judiciário possuem dignidade protegida pela Constituição da República.',
      'A Constituição veda qualquer manifestação sobre convivência escolar fora das aulas de Filosofia.'
    ],
    correta: 0,
    explicacao: 'No ordenamento jurídico brasileiro inexistem direitos fundamentais de caráter absoluto. O STF reafirma reiteradamente que a liberdade de expressão não agasalha o discurso de ódio, a ofensa criminosa ou o ultraje à honra.',
    justificativaIncorretas: [
      'Nenhum direito fundamental é absoluto; todos devem harmonizar-se no sistema constitucional de freios e contrapesos.',
      'A dignidade da pessoa humana (Art. 1º, III da CF) é predicado inerente a todo ser humano sem distinção.',
      'A manifestação do pensamento é livre no debate cívico amplo, vedados o anonimato e o insulto lesivo.'
    ],
    referencia: 'STF - HC 82.424/RS (Caso Ellwanger) e ADI 4.451/DF',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_dificil_14',
    titulo: 'Círculos Restaurativos e Equilíbrio de Poder',
    dificuldade: 'dificil',
    categoria: 'mediacao',
    competencia: 'convivencia',
    enunciado: 'Ao conduzir um Círculo Restaurativo de Conflito Escolar, qual cuidado metodológico preliminar o facilitador deve ter antes de reunir vítima e agressor face a face?',
    contexto: 'Preparação pedagógica para mediação em caso com histórico prolongado de intimidação.',
    opcoes: [
      'Verificar o consentimento livre e voluntário da vítima, avaliar se há equilíbrio emocional e certificar-se de que a reunião não provocará revitimização ou coação velada.',
      'Obrigar a vítima a participar sob pena de reprovação escolar imediata.',
      'Exigir que o agressor pague uma indenização em dinheiro diretamente ao facilitador do círculo.',
      'Convidar a imprensa local para filmar a reunião e garantir transparência comunitária.'
    ],
    correta: 0,
    explicacao: 'A Justiça Restaurativa é essencialmente voluntária e protetiva. Se houver desequilíbrio de forças que intimide a vítima, o encontro presencial prematuro pode gerar trauma secundário (revitimização).',
    justificativaIncorretas: [
      'A imposição coercitiva desvirtua a essência da justiça restaurativa e viola a dignidade da vítima.',
      'A mediação escolar é processo pedagógico e humanitário, vedadas transações pecuniárias entre as partes.',
      'A publicidade midiática de conflitos envolvendo menores é expressamente vedada pelo ECA (Art. 143).'
    ],
    referencia: 'Manual de Práticas Restaurativas na Escola (Howard Zehr / Kay Pranis)',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_dificil_15',
    titulo: 'Cyberstalking e Perseguição Reiterada',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'direitos',
    enunciado: 'A Lei nº 14.132/2021 inseriu o Artigo 147-A no Código Penal tipificando o crime de "Perseguição" (Stalking). Quando esse delito se configura no contexto da convivência de adolescentes em redes sociais?',
    contexto: 'Um estudante envia dezenas de mensagens diárias indesejadas, cria novos perfis para seguir a vítima e monitora seus passos.',
    opcoes: [
      'Quando o agente persegue alguém reiteradamente por qualquer meio, ameaçando-lhe a integridade física ou psicológica, restringindo-lhe a liberdade de locomoção ou invadindo/perturbando sua esfera de liberdade ou privacidade.',
      'Apenas se a perseguição for presencial em vias públicas durante a madrugada.',
      'Somente quando o perseguidor exigir pagamento em criptomoedas para cessar as mensagens.',
      'O tipo penal só existe para perseguição contra diplomatas e chefes de Estado estrangeiros.'
    ],
    correta: 0,
    explicacao: 'O Art. 147-A pune a invasão obsessiva e reiterada da privacidade ("por qualquer meio", inclusive virtual). O § 1º prevê causa de aumento de pena quando o crime é praticado contra criança, adolescente ou contra mulher por razões de gênero.',
    justificativaIncorretas: [
      'A redação expressa da lei inclui o meio virtual e digital, não exigindo contato físico de rua.',
      'Exigência de dinheiro caracterizaria o crime de extorsão (Art. 158 do CP), e não o stalking comum.',
      'A proteção da lei é universal e voltada a qualquer cidadão que tenha sua paz perturbada reiteradamente.'
    ],
    referencia: 'Código Penal Brasileiro, Art. 147-A (incluído pela Lei nº 14.132/2021)',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_dificil_16',
    titulo: 'Vulnerabilidade do Estudante com Transtorno do Espectro Autista',
    dificuldade: 'dificil',
    categoria: 'direitos',
    competencia: 'direitos',
    enunciado: 'A Lei Berenice Piana (Lei nº 12.764/2012) instituiu a Política Nacional de Proteção dos Direitos da Pessoa com Transtorno do Espectro Autista (TEA). Quais são as implicações legais quando um estudante autista é alvo sistemático de chacotas devido às suas características sensoriais na escola?',
    contexto: 'Colegas imitam e gravam os movimentos de autorregulação (stimming) de um estudante com TEA.',
    opcoes: [
      'Configura discriminação contra pessoa com deficiência (Art. 88 da Lei nº 13.146/2015 - Estatuto da Pessoa com Deficiência) e bullying qualificado, sujeitando os infratores às sanções da legislação protetiva especial.',
      'Trata-se de conduta normal aceita como parte da integração biológica do educando.',
      'A legislação brasileira considera que estudantes autistas não possuem sensibilidade moral a zombarias.',
      'A escola está autorizada a cobrar taxa extra da família do estudante para fornecer proteção individual.'
    ],
    correta: 0,
    explicacao: 'A pessoa com TEA é legalmente considerada pessoa com deficiência. Discriminar, humilhar ou constranger em razão da deficiência constitui crime com pena de reclusão de 1 a 3 anos e multa (Art. 88 da LBI).',
    justificativaIncorretas: [
      'Zombar de características neurodivergentes é discriminação capacitista ilícita, nunca "integração sadia".',
      'Pessoas no espectro autista vivenciam sofrimento emocional agudo diante de agressões e rejeição social.',
      'Cobrar taxa adicional de alunos com deficiência é crime previsto no Art. 8º da Lei nº 7.853/1989 e no Art. 88 da LBI.'
    ],
    referencia: 'Lei Berenice Piana (Lei nº 12.764/2012) e Estatuto da Pessoa com Deficiência (Lei nº 13.146/2015), Art. 88',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_dificil_17',
    titulo: 'A Espiral do Silêncio de Elisabeth Noelle-Neumann',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    enunciado: 'A teoria da "Espiral do Silêncio", formulada pela cientista política Elisabeth Noelle-Neumann, ajuda a compreender por que testemunhas de bullying calam-se diante de agressores populares. Qual é o mecanismo central desse fenômeno?',
    contexto: 'Análise da dinâmica de uma turma em que agressores carismáticos impõem o silêncio aos demais.',
    opcoes: [
      'O medo do isolamento social faz com que indivíduos monitorem constantemente a opinião dominante do ambiente; ao perceberem que defender a vítima contraria a maioria ruidosa, calam-se para evitar o ostracismo.',
      'Um defeito na laringe dos estudantes que bloqueia a fala diante de figuras de autoridade.',
      'A existência de um contrato comercial sigiloso assinado no início do ano letivo.',
      'A comprovação de que o silêncio é a única forma juridicamente válida de protesto pacifista.'
    ],
    correta: 0,
    explicacao: 'A espiral do silêncio se retroalimenta: quanto mais as testemunhas se calam com medo do isolamento, mais a atitude agressiva parece ser o consenso aceito pela turma, intimidando novas dissidências.',
    justificativaIncorretas: [
      'O fenômeno é estritamente sociopsicocognitivo, não uma anomalia biológica de cordas vocais.',
      'Relações de convivência escolar não se estruturam em contratos mercantis de mordaça.',
      'O silêncio diante de abusos não é protesto; é mecanismo de sobrevivência social que perpetua a vitimização.'
    ],
    referencia: 'Elisabeth Noelle-Neumann - The Spiral of Silence: Public Opinion – Our Social Skin',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['mediador_da_paz']
  },
  {
    id: 'quiz_dificil_18',
    titulo: 'Vazamento Não Consentido e a Lei Carolina Dieckmann',
    dificuldade: 'dificil',
    categoria: 'cyber',
    competencia: 'direitos',
    enunciado: 'Um estudante invade o e-mail institucional e o armazenamento em nuvem do celular de uma colega, obtendo fotos pessoais e divulgando-as em grupos de WhatsApp. Sob o Artigo 154-A do Código Penal (Lei Carolina Dieckmann nº 12.737/2012), qual crime restou configurado?',
    contexto: 'Investigação de invasão cibernética em dispositivos pessoais no ambiente escolar.',
    opcoes: [
      'Invasão de dispositivo informático alheio, mediante violação indevida de mecanismo de segurança e com o fim de obter dados ou informações sem autorização expressa do titular.',
      'Exercício normal de curiosidade técnica amparado pela Lei de Inovação Científica.',
      'Contravenção de jogo de azar eletrônico não regulamentado.',
      'Infração fiscal de comércio exterior por uso de servidores estrangeiros.'
    ],
    correta: 0,
    explicacao: 'O Art. 154-A do CP tipifica a invasão de dispositivo com pena de reclusão de 1 a 4 anos e multa, com causas de aumento de pena se houver obtenção de conteúdo de comunicações eletrônicas privadas ou divulgação a terceiros.',
    justificativaIncorretas: [
      'A inovação científica e a liberdade acadêmica não concedem autorização para violar a privacidade e invadir aparelhos alheios.',
      'Invasão hacker não é jogo de azar; é crime informático tipificado no Código Penal.',
      'A natureza do ilícito é penal-informática e de violação de sigilo, desprovida de nexo com normas tributárias.'
    ],
    referencia: 'Código Penal Brasileiro, Art. 154-A (incluído pela Lei nº 12.737/2012)',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_dificil_19',
    titulo: 'Liderança Autoritária vs Democrática no Clima Escolar',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'convivencia',
    enunciado: 'Nos estudos clássicos de Kurt Lewin sobre dinâmica de grupos e estilos de liderança (autoritária, democrática e laissez-faire), qual clima de grupo apresentou as maiores taxas de agressividade reprimida, bodes expiatórios e bullying velado entre os membros?',
    contexto: 'Pesquisa pedagógica sobre a influência da gestão de sala de aula na incidência de violência.',
    opcoes: [
      'O clima sob liderança autoritária rígida, onde a frustração gerada pela opressão das regras inflexíveis é canalizada horizontalmente pelos membros na perseguição a colegas mais vulneráveis (bodes expiatórios).',
      'O clima democrático participativo, onde decisões são construídas pelo debate ético.',
      'O clima de assembleia comunitária permanente com círculos restaurativos diários.',
      'Nenhum dos estilos, pois Lewin demonstrou que a liderança não tem impacto nas relações interpessoais.'
    ],
    correta: 0,
    explicacao: 'Lewin demonstrou que ambientes autocráticos geram alta tensão interna: como os liderados não podem contestar a autoridade central, canalizam a agressividade acumulada contra membros mais frágeis do próprio grupo.',
    justificativaIncorretas: [
      'Grupos democráticos apresentaram maiores índices de cooperação, empatia e satisfação mútua.',
      'Assembleias e círculos constroem corresponsabilidade e reduzem atritos de hostilidade reprimida.',
      'A teoria de campos de Lewin comprovou que o estilo de liderança é decisivo para o comportamento social.'
    ],
    referencia: 'Kurt Lewin, Ronald Lippitt & Ralph K. White (1939) - Patterns of Aggressive Behavior in Experimentally Created "Social Climates"',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['primeiro_passo_sabedoria']
  },
  {
    id: 'quiz_dificil_20',
    titulo: 'Responsabilidade por Indução ao Suicídio e Automutilação',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'Em casos extremos onde agressões e humilhações sistemáticas levam o estudante a cometer automutilação ou tentar contra a própria vida, qual tipo penal do Artigo 122 do Código Penal (com redação da Lei nº 13.968/2019) pode incidir sobre os agressores?',
    contexto: 'Caso trágico decorrente de cyberbullying massivo e perseguição continuada.',
    opcoes: [
      'Induzir, instigar ou prestar auxílio a alguém para suicídio ou automutilação, com penas severamente aumentadas se o crime for cometido pela internet ou se a vítima for menor de idade.',
      'Dano simples contra o patrimônio imaterial escolar.',
      'Falso testemunho em processo de inventário civil.',
      'O ato é penalmente atípico se os agressores não tiverem tocado fisicamente no corpo da vítima.'
    ],
    correta: 0,
    explicacao: 'O Art. 122 do Código Penal pune severamente o induzimento ou instigação moral. O crime tem pena agravada (duplicada) se praticado por meio de rede social ou se a vítima for menor, e triplicada se praticado em grupo.',
    justificativaIncorretas: [
      'Atentar contra a integridade psíquica e a vida humana é crime contra a vida, não mero dano material.',
      'Falso testemunho decorre de depoimento mentiroso perante juiz ou autoridade judiciária.',
      'O crime do Art. 122 é essencialmente de natureza psicológica e moral, prescindindo de contato físico direto.'
    ],
    referencia: 'Código Penal Brasileiro, Art. 122 (redação dada pela Lei nº 13.968/2019)',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_dificil_21',
    titulo: 'Notificação Compulsória de Violência em Educação',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'De acordo com o Artigo 13 do Estatuto da Criança e do Adolescente (ECA) e a Lei nº 13.010/2014, qual é o dever funcional dos professores, diretores e coordenadores ao constatarem suspeita ou confirmação de maus-tratos ou violência grave contra educandos?',
    contexto: 'Encaminhamento institucional obrigatório diante de agressões reiteradas.',
    opcoes: [
      'Comunicar obrigatoriamente o fato ao Conselho Tutelar da respectiva localidade, sem prejuízo de outras medidas legais cabíveis, sob pena de infração administrativa (Art. 245 do ECA).',
      'Manter sigilo absoluto para não prejudicar as estatísticas da Secretaria de Educação.',
      'Aguardar o encerramento do semestre letivo para decidir se a notificação é conveniente.',
      'Exigir que a família do agressor autorize formalmente o envio da denúncia.'
    ],
    correta: 0,
    explicacao: 'A notificação compulsória é dever inafastável. O Art. 245 do ECA pune com multa administrativa a omissão de profissionais da educação que deixarem de comunicar suspeitas ou confirmações de violência ao Conselho Tutelar.',
    justificativaIncorretas: [
      'A proteção à vida e integridade de crianças prevalece sobre índices e metas burocráticas.',
      'Situações de risco exigem intervenção imediata, sendo ilícita a protelação para o fim do semestre.',
      'A comunicação ao Conselho Tutelar é dever público incondicionado, que não depende de anuência de agressores.'
    ],
    referencia: 'Estatuto da Criança e do Adolescente, Arts. 13 e 245',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['escudo_inabalavel']
  },
  {
    id: 'quiz_dificil_22',
    titulo: 'Deslocamento da Agressividade e Frustração',
    dificuldade: 'dificil',
    categoria: 'fundamentos',
    competencia: 'bullying',
    enunciado: 'Na teoria psicanalítica formulada por Sigmund Freud e desenvolvida por Anna Freud, qual mecanismo de defesa do ego explica o comportamento de um estudante que sofre abusos severos de parentes adultos em casa e desconta a agressividade humilhando colegas menores na escola?',
    contexto: 'Estudo de caso clínico-pedagógico sobre a genealogia do comportamento hostil.',
    opcoes: [
      'Deslocamento do afeto/agressão e identificação com o agressor.',
      'Sublimação artística autêntica voltada à produção de poesias.',
      'Racionalização filosófica pós-estruturalista de matriz francesa.',
      'Regressão biológica ao sistema imunológico inato.'
    ],
    correta: 0,
    explicacao: 'No deslocamento, a pulsão agressiva é desviada do alvo original ameaçador (o adulto) para um substituto mais frágil e vulnerável (o colega de turma), enquanto a identificação com o agressor confere uma ilusão de poder.',
    justificativaIncorretas: [
      'Sublimação canaliza impulsos para fins socialmente produtivos e criativos, o inverso da violência destrutiva.',
      'Racionalização busca inventar desculpas lógicas para comportamentos; a conduta em análise é ação reativa.',
      'Mecanismos de defesa do ego são processos psicológicos mentais, não reações imunológicas celulares.'
    ],
    referencia: 'Anna Freud - O Ego e os Mecanismos de Defesa',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['farol_da_empatia']
  },
  {
    id: 'quiz_dificil_23',
    titulo: 'A Intencionalidade do Dolo Eventual na Violência Virtual',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'Um grupo de estudantes cria uma votação virtual cruel zombando da saúde mental de uma aluna que já havia tentado automutilação. Alertados pelos moderadores de que a brincadeira poderia induzi-la a novo ato fatal, responderam: "Não ligamos para o que acontecer". No Direito Penal, essa atitude configura:',
    contexto: 'Apuração de responsabilidade por cyberbullying com assunção consciente de risco.',
    opcoes: [
      'Dolo eventual, situação em que o agente não quer diretamente o resultado lesivo, mas prevê o perigo concreto e assume conscientemente o risco de sua produção com indiferença.',
      'Culpa inconsciente por mera distração momentânea sem relevância jurídica.',
      'Exercício regular de direito expressamente garantido pelo Código de Trânsito Brasileiro.',
      'Caso fortuito decorrente de força maior da natureza imprevisível.'
    ],
    correta: 0,
    explicacao: 'O dolo eventual (Art. 18, I do CP) caracteriza-se pela assunção consciente do risco ("tanto faz, não me importo se o dano ocorrer"). Quem age com indiferença perante a vida alheia responde a título doloso.',
    justificativaIncorretas: [
      'A prévia advertência sobre o risco gravíssimo afasta a mera distração ou negligência inconsciente.',
      'O Código de Trânsito Brasileiro não tutela relações de assédio psicológico em ambientes digitais.',
      'Casos fortuitos são eventos naturais externos (como raios ou terremotos), não atos deliberados de crueldade humana.'
    ],
    referencia: 'Código Penal Brasileiro, Art. 18, Inciso I (Dolo Direto e Eventual)',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_dificil_24',
    titulo: 'O Papel do Clima de Confiança Escolar',
    dificuldade: 'dificil',
    categoria: 'prevencao',
    competencia: 'convivencia',
    enunciado: 'Estudos longitudinais sobre eficácia escolar demonstram que o fator isolado mais determinante para a redução drástica das taxas de bullying sistemático não é o aumento de câmeras ou guardas armados, mas sim:',
    contexto: 'Elaboração do Plano Diretor de Convivência Escolar da EEMTI Alfredo Machado.',
    opcoes: [
      'O fortalecimento do clima de confiança e justiça relacional: quando os estudantes sentem que a escola acolhe, ouve sem pré-julgamentos e resolve conflitos com consistência ética.',
      'A contratação de empresas privadas de segurança com cães farejadores em todas as portas.',
      'A eliminação de todas as matérias de ciências humanas para evitar debates políticos.',
      'A proibição permanente de que estudantes conversem uns com os outros durante os intervalos.'
    ],
    correta: 0,
    explicacao: 'A literatura internacional em segurança escolar comprova que a confiança relacional (relational trust) rompe o silêncio e promove o senso de pertencimento, desarticulando a violência na raiz.',
    justificativaIncorretas: [
      'A hipervigilância militarizada gera clima de desconfiança e tensão, sem reduzir os índices de assédio oculto.',
      'As humanidades desenvolvem a empatia, o pensamento crítico e a cidadania, ferramentas essenciais da paz.',
      'Proibir a sociabilidade sadia prejudica a maturação socioemocional e agrava problemas de saúde mental.'
    ],
    referencia: 'Bryk & Schneider - Trust in Schools: A Core Resource for Improvement',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['escudo_inabalavel']
  },
  {
    id: 'quiz_dificil_25',
    titulo: 'A Hermenêutica Constitucional da Dignidade Humana',
    dificuldade: 'dificil',
    categoria: 'legislacao',
    competencia: 'direitos',
    enunciado: 'Em conformidade com a hermenêutica constitucional contemporânea (conforme Luís Roberto Barroso e Ingo Sarlet), qual é o papel da "Dignidade da Pessoa Humana" (Art. 1º, III da CF/88) na ponderação de conflitos no espaço escolar?',
    contexto: 'Fundamentação jurídica do projeto Sentinela / StopBullying.',
    opcoes: [
      'A dignidade da pessoa humana é o princípio matriz e vetor hermenêutico supremo da República, funcionando como limite inultrapassável a qualquer regra disciplinar, autoridade docente ou convenção comunitária.',
      'A dignidade humana é uma recomendação meramente facultativa que as escolas podem escolher aplicar apenas nos dias de festividades.',
      'O regulamento disciplinar interno da escola possui poder jurídico superior à Constituição Federal do Brasil.',
      'A dignidade humana é um conceito estritamente econômico que se aplica apenas a estudantes que pagam mensalidades caras.'
    ],
    correta: 0,
    explicacao: 'A dignidade humana é o valor fonte de todo o sistema normativo. Nenhuma prática de convivência, trote, tradição ou autoridade pode violar o valor intrínseco de cada educando como fim em si mesmo.',
    justificativaIncorretas: [
      'Normas de direitos fundamentais são imperativas e cogentes, vinculando imediatamente todas as instituições públicas e privadas.',
      'Pelo princípio da supremacia constitucional (Kelsen), nenhuma norma infralegal pode contrariar a Constituição.',
      'A dignidade humana é inalienável e universal, independente de condição patrimonial ou classe social.'
    ],
    referencia: 'Constituição Federal de 1988, Artigo 1º, Inciso III e Ingo Wolfgang Sarlet - A Eficácia dos Direitos Fundamentais',
    xpRecompensa: 35,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['primeiro_passo_sabedoria']
  }
];




export const IMPOSSIVEL_QUIZZES: QuizItem[] = [
  {
    id: 'quiz_impossivel_01',
    titulo: 'Ponderação Constitucional e Tensão de Direitos no Ciberespaço Escolar',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    enunciado: 'Considere o seguinte caso de hermenêutica constitucional:\n\nUm coletivo de estudantes cria uma página em rede social para tecer críticas contundentes à gestão pedagógica e aos grêmios da escola. Inicialmente, as postagens tratam de temas curriculares legítimos; contudo, a página passa a publicar "dossiês" anônimos esmiuçando a vida íntima de estudantes contrários à sua linha ideológica, associando apelidos depreciativos e imputando desvios morais sem comprovação, sob a justificativa de estarem exercendo a liberdade de manifestação política e crítica cultural.\n\nA comissão disciplinar da escola, respaldada pelo Regimento Interno, pretende punir todos os criadores da página com cancelamento de matrícula e apreensão administrativa sumária de seus aparelhos celulares pessoais nas dependências da escola.\n\nÀ luz da jurisprudência consolidada do Supremo Tribunal Federal (STF) e dos princípios constitucionais da proporcionalidade e da proteção integral (Art. 227 da CF/88), qual é o diagnóstico jurídico-pedagógico mais consistente e adequado para a situação?',
    contexto: 'Caso interdisciplinar de Filosofia do Direito, Sociologia e Direito Constitucional aplicado à gestão educacional pública.',
    opcoes: [
      'A crítica à gestão institucional e o debate político são plenamente protegidos pela liberdade de manifestação, porém o ataque anônimo à honra e à intimidade individual extrapola a salvaguarda constitucional, configurando ilícito; contudo, a sanção escolar não pode violar a legalidade estrita nem a inviolabilidade da intimidade com apreensão sumária de celulares sem ordem judicial, devendo a escola assegurar o contraditório, o devido processo legal e acionar a rede protetiva formal.',
      'A liberdade de expressão política dos estudantes é absoluta no regime democrático brasileiro, tornando qualquer intervenção da escola ou do Poder Judiciário um ato nulo de censura prévia vedado pelo Artigo 220 da Constituição Federal.',
      'A escola possui poder de polícia pleno e irrestrito sobre qualquer objeto pessoal de estudantes em seu território, estando legitimada a apreender e periciar administrativamente aparelhos privados e expulsar sumariamente qualquer participante sem necessidade de procedimento prévio.',
      'As ofensas à vida íntima e os apelidos depreciativos deixam de ser ilícitos quando cometidos no contexto de discussões de natureza política ou ideológica estudantil, por incidência da imunidade parlamentar análoga atribuída aos grêmios escolares.'
    ],
    correta: 0,
    explicacao: 'A ponderação de Robert Alexy e a jurisprudência do STF demonstram que nenhum direito é ilimitado: a liberdade de expressão não autoriza ofensas à honra e intimidade (Art. 5º, X da CF). Paralelamente, o Estado-educador está vinculado ao devido processo legal (Art. 5º, LIV e LV) e à inviolabilidade de comunicações (Art. 5º, XII), não podendo cometer abusos como apreensão invasiva sem respaldo judicial.',
    justificativaIncorretas: [
      'A liberdade de expressão não é absoluta e encontra barreiras inultrapassáveis nos direitos da personalidade, na honra de terceiros e na vedação do anonimato.',
      'O poder disciplinar da escola é limitado pelas garantias constitucionais e pelo ECA; a apreensão e perícia de comunicações privadas dependem de reserva de jurisdição judicial.',
      'Imunidade parlamentar é prerrogativa exclusiva e estrita de mandatários eleitos do Poder Legislativo (Art. 53 da CF), inaplicável a representações estudantis para acobertar crimes contra a honra.'
    ],
    referencia: 'STF - ADPF 130/DF, RE 1.010.606/RJ (Direito ao Esquecimento) e CF/88, Art. 5º, IV, X, LIV e Art. 227',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_02',
    titulo: 'O Dilema da Obediência Cega e a Banalidade do Mal',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    enunciado: 'Leia o excerto a seguir:\n\n"O triste da verdade é que a maior parte do mal deste mundo não é feita por pessoas que escolheram deliberadamente serem más. É feita por pessoas que nunca tomaram uma decisão sobre serem boas ou más; pessoas que nunca pensaram sobre isso, que simplesmente acompanharam o fluxo das normas vigentes e obedeceram às convenções aceitas por seu meio sem qualquer reflexão crítica." (Hannah Arendt, adaptado de *Eichmann em Jerusalém: Um relato sobre a banalidade do mal*).\n\nTranspondo a tese arendtiana da "Banalidade do Mal" para a sociologia das interações escolares contemporâneas, qual dos seguintes fenômenos melhor ilustra a manifestação desse conceito em um episódio massivo de exclusão social e cyberbullying?',
    contexto: 'Questão de interpretação crítica e filosofia política no estilo das questões mais refinadas do ENEM.',
    opcoes: [
      'A atitude de estudantes comuns que, sem ódio pessoal ou sadismo prévio contra a vítima, compartilham postagens depreciativas e riem nos corredores simplesmente porque "todo mundo na escola está fazendo isso", renunciando à capacidade reflexiva do julgamento moral autônomo.',
      'A ação meticulosamente planejada por um líder psicopata que atua isoladamente à noite, invadindo os sistemas computacionais da escola para alterar as notas dos colegas com requintes de vingança pessoal premeditada.',
      'O confronto físico corporal espontâneo entre dois estudantes no campo de futebol desencadeado por uma disputa esportiva com calor de emoção momentânea.',
      'A recusa corajosa de uma testemunha em participar de um trote escolar, enfrentando a reprovação imediata dos veteranos para proteger a dignidade de um colega novato.'
    ],
    correta: 0,
    explicacao: 'Arendt cunhou a expressão para descrever como indivíduos ordinários se tornam engrenagens da crueldade não por monstrosidade inata, mas pela "incapacidade de pensar" a partir do ponto de vista do outro, abdicando do discernimento moral em favor da conveniência e da conformidade burocrática ou social.',
    justificativaIncorretas: [
      'O psicopata que planeja com sadismo deliberado encarna o mal demoníaco tradicional, e não a banalidade do mal que decorre da ausência irreflexiva de julgamento.',
      'A disputa esportiva física calorosa é um conflito impulsivo de afeto reativo, distinto da conivência sistemática normalizada.',
      'A recusa corajosa da testemunha representa precisamente a resistência moral e a capacidade de pensar contra a corrente, o oposto da alienação acrítica.'
    ],
    referencia: 'Hannah Arendt - Eichmann em Jerusalém: Um relato sobre a banalidade do mal (1963)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_03',
    titulo: 'Ética Deontológica vs Consequencialismo na Proteção Escolar',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    enunciado: 'Considere o clássico dilema ético aplicado ao ambiente escolar:\n\nUm grupo de estudantes descobre que um agressor influente e popular planeja um ataque violento e humilhante contra um colega vulnerável na saída da escola. Para desarticular o ataque, os estudantes cogitam divulgar publicamente segredos familiares íntimos e vergonhosos do agressor nas redes sociais, com o intuito de chantageá-lo e fazê-lo recuar de sua agressão física.\n\nSe analisarmos essa decisão sob a ótica do Imperativo Categórico de Immanuel Kant (Ética Deontológica), qual é o julgamento filosófico correto sobre a conduta proposta?',
    contexto: 'Debate de Ética e Filosofia Moral sobre meios e fins na resolução de disputas interpessoais.',
    opcoes: [
      'A conduta é moralmente inaceitável, pois para Kant nenhuma ação pode usar um ser humano meramente como meio para alcançar um fim, por mais nobre que seja o objetivo protetivo; além disso, a máxima de "chantagear e violar a intimidade alheia" não pode ser universalizada como lei moral sem gerar a autodestruição da própria ética.',
      'A conduta é plenamente ética e recomendável para Kant, pois qualquer método que salve uma vítima inocente de agressão corporal torna-se automaticamente um dever moral universal obrigatório.',
      'Kant defenderia que a moralidade de um ato é mensurada exclusivamente pela quantidade líquida de prazer ou alívio gerada no maior número de estudantes da turma após o acontecimento.',
      'Para a ética kantiana, atos praticados por menores de idade no ambiente escolar não possuem relevância moral, sendo classificados como impulsos puramente biológicos fora do reino dos fins.'
    ],
    correta: 0,
    explicacao: 'Na Fundamentação da Metafísica dos Costumes, Kant enuncia o imperativo: "Age de tal modo que trates a humanidade, tanto na tua pessoa como na do outro, sempre como um fim e nunca meramente como um meio". Universalizar a chantagem destruiria a moralidade; o bem da vítima deve ser alcançado por meios eticamente retos (como a mediação e a autoridade pedagógica).',
    justificativaIncorretas: [
      'Kant recusa categoricamente o utilitarismo de que "os fins justificam os meios"; o dever moral exige que o meio utilizado seja intrinsecamente justo.',
      'A quantificação do prazer e da dor agregada é o critério do Utilitarismo consequencialista de Jeremy Bentham e John Stuart Mill, e não da deontologia kantiana.',
      'Kant afirma que a razão prática e a capacidade moral pertencem à natureza de todo ser racional em formação, não desconsiderando a ética nas relações juvenis.'
    ],
    referencia: 'Immanuel Kant - Fundamentação da Metafísica dos Costumes (1785)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_04',
    titulo: 'A Teoria do Panóptico e a Hipervigilância nas Relações Digitais',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'cyber',
    enunciado: 'Leia o texto abaixo:\n\n"O Panóptico é uma máquina de dissociar o par ver-ser visto: no anel periférico se é totalmente visto, sem nunca ver; na torre central, vê-se tudo, sem nunca ser visto. É um arranjo que induz no detento um estado consciente e permanente de visibilidade que assegura o funcionamento automático do poder." (Michel Foucault, *Vigiar e Punir*).\n\nAnalisando as dinâmicas de cyberbullying escolar à luz da teoria foucaultiana da sociedade disciplinar e do panoptismo digital, como a vigilância peer-to-peer (entre os próprios pares) nas redes sociais remodela o comportamento e o sofrimento das vítimas contemporâneas?',
    contexto: 'Questão avançada de Sociologia e Teoria Social Contemporânea.',
    opcoes: [
      'A visibilidade permanente nas redes estende o controle social e o julgamento dos pares para além dos limites físicos e temporais da escola, fazendo com que a vítima internalize a vigilância hostil 24 horas por dia, operando como seu próprio censor e vivenciando sofrimento crônico mesmo em seu refúgio doméstico.',
      'A vigilância digital liberta o estudante de qualquer norma comunitária, garantindo autonomia plena e imunidade psicológica irrestrita a qualquer tipo de comentário alheio.',
      'O modelo panóptico não tem aplicabilidade contemporânea porque os estudantes utilizam aparelhos celulares que possuem travas biométricas impermeáveis à pressão social dos pares.',
      'A constante visibilidade virtual estimula a cooperação pacífica universal, extinguindo qualquer possibilidade de intimidação sistemática nas escolas conectadas à internet.'
    ],
    correta: 0,
    explicacao: 'Foucault demonstra que o poder disciplinar mais eficaz é aquele que o sujeito internaliza. No cyberbullying, a onipresença das redes transforma os próprios colegas em vigilantes contínuos da imagem do indivíduo, eliminando o espaço privado de descanso e segurança psíquica.',
    justificativaIncorretas: [
      'A hipervigilância virtual gera aprisionamento na expectativa alheia e angústia existencial, não libertação.',
      'O panoptismo foucaultiano é amplamente reconhecido pela sociologia como matriz teórica fundamental para explicar o controle e a vigilância no capitalismo de dados e nas redes sociais.',
      'A história empírica das redes comprova que a visibilidade permanente intensifica dinâmicas de cancelamento e assédio se não houver cultura de respeito consolidada.'
    ],
    referencia: 'Michel Foucault - Vigiar e Punir: Nascimento da Prisão (1975) e Byung-Chul Han - Psicopolítica',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_impossivel_05',
    titulo: 'Nexo Causal, Concausa e Responsabilidade Civil por Suicídio',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    enunciado: 'Em um caso emblemático de responsabilidade civil extracontratual, a família de uma estudante que tirou a própria vida após meses de bullying e cyberbullying sistemáticos e omissão reiterada da direção da escola ajuizou ação de indenização por danos morais e materiais.\n\nA instituição de ensino alegou em sua contestação a excludente de "fato exclusivo da vítima" (Art. 14, § 3º, II do CDC e Art. 936 do Código Civil), argumentando que o ato de autoextermínio foi uma decisão pessoal e voluntária da jovem, rompendo o nexo de causalidade entre a inação escolar e o resultado morte.\n\nSob a moderna teoria da imputação objetiva e a jurisprudência dominante dos tribunais superiores brasileiros, qual é a tese jurídica correta a ser adotada pelo juízo?',
    contexto: 'Caso de alta complexidade em Direito Civil, Direito do Consumidor e Bioética jurídica.',
    opcoes: [
      'A tese da escola deve ser rejeitada, pois a omissão contínua e negligente da instituição diante do bullying constitui concausa determinante do quadro de desespero e vulnerabilidade da educanda; o dever de custódia e proteção integral abrange a prevenção da degradação psíquica que conduz a atos extremos, não se admitindo a alegação de fato exclusivo da vítima para desonerar a escola de sua falha no dever de segurança.',
      'A tese da escola deve ser integralmente acolhida, pois o Direito brasileiro veda a responsabilização de estabelecimentos de ensino por qualquer evento danoso que não tenha sido executado diretamente com as mãos de funcionários da própria instituição.',
      'A ação deve ser extinta sem resolução de mérito, uma vez que a morte da vítima extingue automaticamente todo e qualquer direito subjetivo dos genitores à reparação por dano moral reflexo (em ricochete).',
      'A responsabilidade da escola restringe-se exclusivamente ao ressarcimento do valor das mensalidades pagas pela família no mês em que ocorreu o falecimento.'
    ],
    correta: 0,
    explicacao: 'A teoria da causalidade adequada e das concausas estabelece que quem contribui decisivamente para o estado de vulnerabilidade psíquica extrema responde pelo desfecho. A escola tem dever de garantia e custódia; a omissão grave diante da intimidação crônica insere-se no nexo etiológico do dano.',
    justificativaIncorretas: [
      'A responsabilidade objetiva educacional abrange os riscos inerentes à convivência no ambiente sob sua guarda, não se limitando a agressões praticadas por funcionários.',
      'O dano moral por ricochete (reflexo) é direito autônomo dos familiares diretos atingidos pela dor da perda de um ente querido, amplamente pacificado na jurisprudência do STJ (Súmula 387 e correlatas).',
      'A reparação do dano extrapatrimonial em casos de perda da vida de filhos é substancial e proporcional à gravidade da perda, sendo absurda a limitação a mensalidades.'
    ],
    referencia: 'STJ - REsp 1.344.044/RJ e Sérgio Cavalieri Filho - Programa de Responsabilidade Civil',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['detetive_bullying']
  },
  {
    id: 'quiz_impossivel_06',
    titulo: 'A Teoria do Reconhecimento de Axel Honneth e a Invisibilidade Social',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'convivencia',
    enunciado: 'O filósofo alemão Axel Honneth, expoente da Teoria Crítica contemporânea, formulou a "Teoria do Reconhecimento", estabelecendo três esferas interdependentes fundamentais para a integridade moral do sujeito: o amor/afeto (autoconfiança), o direito (autorrespeito) e a solidariedade/estima social (autoestima).\n\nCom base no arcabouço honnethiano, qual dimensão de desrespeito ou rebaixamento moral é infligida a um estudante quando seus pares promovem um pacto sistemático de invisibilização, desdém de suas capacidades intelectuais e humilhação perante a comunidade escolar?',
    contexto: 'Questão analítica de Filosofia Política e Sociologia do Reconhecimento.',
    opcoes: [
      'A negação da estima social e da solidariedade comunitária, que ataca o sentimento de valor social do indivíduo, impedindo-o de vivenciar a si mesmo como alguém cujas capacidades e realizações possuem significado e valor positivo para a coletividade.',
      'A privação de direitos civis eleitorais de voto soberano garantidos pelo Tribunal Superior Eleitoral.',
      'A anulação do direito natural de posse territorial feudal sobre as terras comunais da escola.',
      'Um fenômeno meramente biológico relacionado ao déficit de dopamina sináptica sem qualquer correlação com o ambiente moral intersubjetivo.'
    ],
    correta: 0,
    explicacao: 'Para Honneth, a humilhação social e a desvalorização das capacidades atacam a terceira esfera do reconhecimento: a estima social. Quando a comunidade escolar zomba e rebaixa um jovem, destrói sua autoestima e sua capacidade de se reconhecer como membro digno e valoroso do grupo.',
    justificativaIncorretas: [
      'A esfera jurídica do autorrespeito trata do reconhecimento como sujeito de direitos e igualdade legal perante as normas, não da estima social comunitária.',
      'Conceitos agrários de posse feudal não dialogam com a teoria intersubjetiva do reconhecimento ético moderno.',
      'O sofrimento da humilhação moral é constituído intersubjetivamente na relação social, não sendo redutível a mero determinismo neuroquímico descontextualizado.'
    ],
    referencia: 'Axel Honneth - Luta por Reconhecimento: A gramática moral dos conflitos sociais (1992)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_07',
    titulo: 'Ação Afirmativa, Inclusão de PcD e o Princípio da Isonomia Material',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    enunciado: 'Um estudante com paralisia cerebral moderada utiliza tecnologia assistiva de comunicação alternativa por tablet para se expressar e realizar avaliações em sala. Parte da turma alega que o uso do dispositivo é um "privilégio injusto" e passa a ridicularizar o aparelho, escondê-lo e chamá-lo de "trapaceiro", gerando isolamento severo.\n\nA coordenação pedagógica, para "evitar ciúmes e manter a igualdade estrita", decide proibir o tablet e exigir que o estudante realize as provas no mesmo tempo e com o mesmo papel de caneta que os demais.\n\nAnalisando a conduta da coordenação sob o prisma do conceito aristotélico e constitucional de "Isonomia Material" (tratar os iguais com igualdade e os desiguais na medida de suas desigualdades) e do Estatuto da Pessoa com Deficiência (Lei nº 13.146/2015), qual é a conclusão correta?',
    contexto: 'Interseção de Filosofia do Direito, Acessibilidade e Direitos Humanos fundamentais.',
    opcoes: [
      'A decisão da coordenação é ilícita e inconstitucional, pois confunde igualdade formal cega com isonomia material; a tecnologia assistiva não é privilégio, mas instrumento indispensável para neutralizar barreiras e garantir equidade; ao retirar o recurso, a escola pratica discriminação por motivo de deficiência (Art. 4º da LBI) e legitima o capacitismo dos agressores.',
      'A decisão da coordenação é juridicamente perfeita e exemplar, pois a Constituição brasileira exige que todos os seres humanos sem exceção sejam avaliados exatamente pelas mesmas ferramentas sem qualquer adaptação razoável.',
      'A conduta dos colegas em esconder o tablet configura mero exercício de crítica metodológica acadêmica protegido pelas diretrizes do ENEM.',
      'O uso de tablets e tecnologias em sala de aula é vedado pelo Ministério da Saúde em qualquer hipótese educacional.'
    ],
    correta: 0,
    explicacao: 'A isonomia material exige adaptações razoáveis e ações afirmativas para viabilizar oportunidades reais. Retirar recursos de acessibilidade sob o pretexto de "igualdade" é a essência da discriminação indireta e do capacitismo institucional, contrariando frontalmente a Convenção da ONU sobre os Direitos das Pessoas com Deficiência.',
    justificativaIncorretas: [
      'A igualdade puramente formal que desconsidera as barreiras físicas ou sensoriais aprofunda a exclusão e é rechaçada pela ordem constitucional contemporânea.',
      'Esconder pertences e zombar de tecnologia assistiva é ato ilícito de intimidação capacitista e dano patrimonial/moral.',
      'Tecnologias assistivas são expressamente estimuladas e asseguradas por lei para promoção da autonomia e inclusão educacional.'
    ],
    referencia: 'Constituição Federal de 1988, Art. 5º, caput e Lei nº 13.146/2015 (Estatuto da Pessoa com Deficiência), Arts. 3º, 4º e 28',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_08',
    titulo: 'Vingança Privada vs Monopólio Estatal da Coerção Legítima',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'convivencia',
    enunciado: 'Leia o trecho de Thomas Hobbes em *Leviatã*:\n\n"Durante o tempo em que os homens vivem sem um poder comum que os mantenha a todos em respeito, eles se encontram naquela condição que se chama guerra; e uma tal guerra é de todos os homens contra todos os homens [...] e a vida do homem é solitária, pobre, sórdida, embrutecida e curta."\n\nEm uma escola onde os estudantes não confiam na eficácia ou na imparcialidade da equipe pedagógica para cessar intimidações sistemáticas, surge um grupo secreto de alunos que decide "fazer justiça com as próprias mãos", espancando agressores fora dos portões e ameaçando quem tentar denunciá-los.\n\nQual é a análise sociopolítica e jurídica hobbesiana e moderna mais acurada sobre esse cenário?',
    contexto: 'Questão de Teoria Política, Sociologia do Estado e Cidadania Democrática.',
    opcoes: [
      'A ausência de uma autoridade institucional confiável e eficaz faz com que a comunidade regrida ao "estado de natureza" pré-social hobbesiano, onde prevalece a autotutela violenta, a vingança privada arbitrária e a insegurança coletiva generalizada, comprovando que a restauração da paz depende do restabelecimento do pacto ético e da justiça institucional mediada.',
      'A formação de grupos de linchamento secreto é o modelo mais avançado de democracia direta e restauração comunitária preconizado pela Carta das Nações Unidas.',
      'Hobbes defenderia que os estudantes agredidos devem permanecer completamente desarmados de voz e aceitar a morte com serenidade estoica sem qualquer apelo à autoridade.',
      'A vingança privada executada por estudantes é ato lícito expressamente agasalhado pelo Artigo 25 do Código Penal brasileiro sob a rubrica da soberania popular.'
    ],
    correta: 0,
    explicacao: 'O surgimento da autotutela violenta é o sintoma clássico do colapso do pacto social ("estado de natureza"). A paz só se sustenta quando a instituição exerce seu papel protetor e justo com legitimidade, tornando a violência privada ilegítima e desnecessária.',
    justificativaIncorretas: [
      'Linchamento e justiçamento privado violam os direitos humanos fundamentais e destroem o Estado Democrático de Direito.',
      'Hobbes fundamenta o contrato social exatamente para superar o medo da morte violenta e instituir a proteção pública efetiva da vida.',
      'A legítima defesa exige agressão injusta atual ou iminente e uso moderado dos meios necessários; espancamentos vingativos premeditados configuram crime de lesão/exercício arbitrário das próprias razões (Art. 345 do CP).'
    ],
    referencia: 'Thomas Hobbes - Leviatã (1651) e Max Weber - A Política como Vocação (Monopólio da Coerção Legítima)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_09',
    titulo: 'Algoritmos de Engajamento, Polarização e Economia da Atenção',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'cyber',
    enunciado: 'Estudos contemporâneos em sociologia da tecnologia e neurociência demonstram que as arquiteturas de recomendação das principais redes sociais operam com base na "Economia da Atenção" e na maximização do tempo de tela. Qual é a correlação estrutural entre o modelo de negócios dessas plataformas e a virulência do cyberbullying entre adolescentes?',
    contexto: 'Questão interdisciplinar de Sociologia Contemporânea, Tecnologia da Informação e Psicologia Cognitiva.',
    opcoes: [
      'Os algoritmos privilegiam e impulsionam organicamente conteúdos com alta carga de polarização afetiva negativa, indignação moral e conflito interpessoal, pois essas reações geram métricas superiores de retenção e cliques, criando incentivos matemáticos à amplificação de linchamentos e vexames virtuais.',
      'Os sistemas algorítmicos foram programados para suprimir automaticamente qualquer mensagem que gere debate acalorado, garantindo que o ciberespaço seja um ambiente de serenidade reflexiva.',
      'O cyberbullying decorre exclusivamente de falhas de hardware nos chips semicondutores dos aparelhos smartphones mais baratos.',
      'As plataformas de redes sociais distribuem recompensas financeiras diretas em dinheiro aos adolescentes que tiverem mais denúncias de assédio registradas.'
    ],
    correta: 0,
    explicacao: 'Shoshana Zuboff (Capitalismo de Vigilância) e Tristan Harris demonstram que o engajamento baseado em ódio e humilhação retém a atenção humana com maior intensidade. Esse design algorítmico atua como acelerador estrutural das dinâmicas de cancelamento e violência digital entre pares.',
    justificativaIncorretas: [
      'Pesquisas e relatórios internos comprovam que postagens controversas e de choque recebem maior alcance algorítmico devido ao volume de engajamento reativo gerado.',
      'A violência virtual decorre de dinâmicas sociotécnicas e humanas mediadas por software e design de interação, e não de defeitos mecânicos em processadores.',
      'As plataformas não remuneram contas por volume de denúncias de assédio.'
    ],
    referencia: 'Shoshana Zuboff - A Era do Capitalismo de Vigilância (2019) e Relatório UNESCO - Behind the Numbers: ending school violence and bullying',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_impossivel_10',
    titulo: 'Violência Simbólica e Reprodução das Desigualdades',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    enunciado: 'Para o sociólogo Pierre Bourdieu, a "Violência Simbólica" é aquela que se exerce sobre um agente com sua própria cumplicidade tácita, uma vez que o dominado apreende as relações de dominação através de categorias mentais construídas pelo próprio dominador.\n\nEm qual das seguintes situações de preconceito escolar velado observa-se a operação típica da Violência Simbólica bourdieusiana?',
    contexto: 'Questão aprofundada de Sociologia da Educação e Teoria Cultural.',
    opcoes: [
      'Quando estudantes de origem periférica ou sotaque regional sentem vergonha espontânea de falar em público e consideram natural serem excluídos das apresentações solenes da escola, acreditando intimamente que "sua fala é feia e sem cultura" em comparação com os colegas da elite.',
      'Quando um aluno é assaltado com uso de faca na saída do portão da escola por criminosos armados.',
      'Quando a equipe de manutenção realiza a pintura das carteiras escolares durante o recesso de julho.',
      'Quando um estudante alcança a nota máxima na olimpíada de matemática após meses de estudo dedicado.'
    ],
    correta: 0,
    explicacao: 'A violência simbólica não utiliza armas físicas: ela opera na inculcação de valores dominantes que levam a própria vítima a internalizar a inferioridade como algo "natural", silenciando-se sem necessidade de agressão corpórea evidente.',
    justificativaIncorretas: [
      'Assalto à mão armada é violência física e patrimonial explícita e direta, desprovida da sutileza simbólica cultural.',
      'Manutenção predial é ato de gestão infraestrutural sem nexo com dinâmicas de dominação simbólica interpessoal.',
      'O sucesso acadêmico ético representa conquista do educando, não opressão internalizada.'
    ],
    referencia: 'Pierre Bourdieu & Jean-Claude Passeron - A Reprodução: Elementos para uma teoria do sistema de ensino (1970)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_11',
    titulo: 'A Teoria do Labelling Approach e o Desvio Primário vs Secundário',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'bullying',
    enunciado: 'O criminologista Edwin Lemert formulou a distinção seminal entre "Desvio Primário" e "Desvio Secundário" no seio da sociologia do desvio (Labelling Approach). Em um ambiente escolar, como a intervenção pedagógica equivocada pode precipitar a passagem de um estudante do desvio primário para o desvio secundário?',
    contexto: 'Análise de caso de reincidência infracional escolar à luz da sociologia criminal.',
    opcoes: [
      'Ao rotular estigmatizantemente o aluno como "caso perdido", isolá-lo em salas separadas e expor seu erro publicamente, a escola reconfigura o autoconceito do jovem e sua rede de relações; o estudante passa a organizar sua identidade pessoal e social em torno do papel de "rebelde/agressor", perpetuando a carreira do desvio (desvio secundário).',
      'Ao aplicar práticas restaurativas e acolher o estudante em rodas de escuta, a escola elimina instantaneamente todas as lembranças do cérebro do jovem.',
      'O desvio secundário só ocorre se o estudante tiver nascido em dia bissexto de ano ímpar.',
      'Lemert comprovou que nenhuma intervenção externa tem capacidade de influenciar a percepção que o indivíduo constrói sobre si mesmo.'
    ],
    correta: 0,
    explicacao: 'O desvio primário é o ato transgressor inicial pontual. O desvio secundário ocorre quando a reação social severa e estigmatizante (o rótulo institucional) força o indivíduo a incorporar o papel de desviante em sua identidade crônica.',
    justificativaIncorretas: [
      'Práticas restaurativas buscam acolher a pessoa e responsabilizar o ato, evitando precisamente a estigmatização do desvio secundário.',
      'Condicionantes astrológicas ou de calendário civil não possuem fundamentação científica em sociologia e criminologia.',
      'O interacionismo simbólico de Lemert e Becker demonstra que a identidade é co-construída nas interações sociais e nas respostas institucionais.'
    ],
    referencia: 'Edwin Lemert - Social Pathology (1951) e Howard Becker - Outsiders (1963)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_12',
    titulo: 'Pacto de Não-Agressão Escolar e a Filosofia de Rousseau',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'convivencia',
    enunciado: 'Leia o excerto de Jean-Jacques Rousseau em *O Contrato Social*:\n\n"O que o homem perde pelo contrato social é a sua liberdade natural e um direito ilimitado a tudo quanto tenta e pode alcançar; o que ganha é a liberdade civil e a propriedade de tudo o que possui. Para que não haja engano a respeito dessas compensações, cumpre distinguir bem a liberdade natural, que não tem limites senão as forças do indivíduo, da liberdade civil, que é limitada pela vontade geral."\n\nAo transpor o pensamento de Rousseau para a elaboração de um Acordo Coletivo de Convivência Escolar formulado democraticamente pelos próprios estudantes com a mediação da escola, qual é a transformação política da liberdade alcançada pela turma?',
    contexto: 'Questão interdisciplinar de Teoria Democrática, Filosofia Política e Gestão Democrática da Educação.',
    opcoes: [
      'Os estudantes renunciam à "liberdade natural" de intimidar ou agir impulsivamente segundo seus caprichos individuais mais fortes em troca da "liberdade civil", na qual a submissão consentida às regras justas e compartilhadas da convivência protege a todos da arbitrariedade do mais forte, gerando autonomia cidadã autêntica.',
      'A turma renuncia a qualquer direito de pensar ou manifestar sentimentos, tornando-se escrava submissa da diretoria escolar.',
      'Rousseau condena qualquer tipo de contrato social, afirmando que os estudantes devem viver em isolamento silvestre completo sem nenhuma escola.',
      'O contrato social escolar só tem validade jurídica se for redigido em latim arcaico e assinado com sangue pelos participantes.'
    ],
    correta: 0,
    explicacao: 'Para Rousseau, a liberdade civil é superior à liberdade natural predatória: obedecer à lei que nós mesmos prescrevemos pelo debate democrático e pela vontade geral é a definição suprema da liberdade e da cidadania ética.',
    justificativaIncorretas: [
      'O contrato rousseauísta não aliena a soberania do cidadão para um tirano; ele institui a igualdade sob a lei comum que protege o bem de todos.',
      'Em *O Contrato Social*, Rousseau propõe a ordem republicana legítima fundada na soberania popular e na razão civilizada.',
      'Requisitos dramáticos medievais de latim arcaico e sangue são fantasias desprovidas de valor na filosofia do direito moderno.'
    ],
    referencia: 'Jean-Jacques Rousseau - Do Contrato Social (1762)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_13',
    titulo: 'Capacitismo Estrutural e a Convenção Internacional sobre Direitos de PcD',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    enunciado: 'A Convenção sobre os Direitos das Pessoas com Deficiência da ONU (promulgada no Brasil pelo Decreto nº 6.949/2009 com equivalência de Emenda Constitucional, Art. 5º, § 3º da CF) operou uma revolução paradigmática ao consagrar o "Modelo Social da Deficiência" em substituição ao antigo "Modelo Médico/Biomédico".\n\nComo essa virada conceitual altera o diagnóstico de situações em que um estudante cadeirante sofre bullying e isolamento por "atrasar a turma" nas escadas de acesso ao laboratório de ciências?',
    contexto: 'Questão profunda sobre o Bloco de Constitucionalidade e Direitos Humanos fundamentais no Brasil.',
    opcoes: [
      'A deficiência deixa de ser compreendida como um defeito ou patologia intrínseca do corpo do indivíduo e passa a ser reconhecida como o resultado da interação entre os impedimentos corporais e as barreiras atitudinais e arquitetônicas impostas pela sociedade; a lentidão e o sofrimento decorrem da omissão da escola em prover acessibilidade e acolhimento, e não do corpo do estudante.',
      'O modelo social determina que o estudante cadeirante deve ser dispensado de frequentar todas as aulas para não constranger a turma.',
      'A Convenção da ONU considera que apenas deficiências visuais severas possuem proteção constitucional no Brasil.',
      'A culpa pelo atraso é exclusivamente do estudante, cabendo à sua família arcar com a construção de um elevador particular no prédio público.'
    ],
    correta: 0,
    explicacao: 'O Art. 1º da Convenção define: "Pessoas com deficiência são aquelas que têm impedimentos de longo prazo, os quais, em interação com diversas barreiras, podem obstruir sua participação plena e efetiva na sociedade em igualdade de condições". As barreiras da escola e as atitudes hostis dos pares é que criam a deficiência opressora.',
    justificativaIncorretas: [
      'O direito à educação inclusiva veda terminantemente a segregação ou exclusão de estudantes com deficiência do convívio acadêmico comum.',
      'O Bloco de Constitucionalidade abrange todas as formas de impedimentos físicos, mentais, intelectuais e sensoriais.',
      'O dever de acessibilidade física e pedagógica é atribuição do Estado e dos estabelecimentos de ensino, não podendo ser repassado financeiramente à família.'
    ],
    referencia: 'Convenção da ONU sobre os Direitos das Pessoas com Deficiência (Decreto nº 6.949/2009) e CF/88, Art. 5º, § 3º',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_14',
    titulo: 'A Ética do Cuidado de Carol Gilligan e a Crítica à Moral Abstrata',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    enunciado: 'Em sua obra seminal *In a Different Voice* (1982), a psicóloga Carol Gilligan criticou a escala de desenvolvimento moral de Lawrence Kohlberg por adotar uma concepção exclusivamente androcêntrica, universalista e abstrata de justiça formal. Gilligan propôs a "Ética do Cuidado" (Ethics of Care).\n\nAo aplicar a Ética do Cuidado em um conflito escolar grave entre estudantes, qual abordagem pedagógica reflete com exatidão a proposta de Gilligan?',
    contexto: 'Questão de Epistemologia Moral Feminista e Mediação de Conflitos Educacionais.',
    opcoes: [
      'Focar na teia de relacionamentos concretos, nas necessidades emocionais particulares e na responsabilidade recíproca de não causar dano ao outro no contexto singular da situação, em vez de apenas deduzir sentenças frias a partir de códigos formais de regras abstratas desvinculadas das vidas reais.',
      'Aplicar multas financeiras automáticas a todos os estudantes envolvidos com base em planilhas matemáticas de custo.',
      'Ignorar qualquer sentimento de dor e exigir que os alunos resolvam seus conflitos por meio de debates de oratória formal com regras parlamentares.',
      'Determinar que todas as decisões da escola sejam tomadas exclusivamente por sorteio lotérico.'
    ],
    correta: 0,
    explicacao: 'A Ética do Cuidado prioriza a interdependência humana, a escuta atenta, a compaixão e o compromisso ético de preservar vínculos e mitigar a dor em contextos situados, complementando e humanizando o formalismo abstrato da justiça tradicional.',
    justificativaIncorretas: [
      'A monetização punitiva é típica de modelos coercitivos de mercado, o oposto do acolhimento intersubjetivo do cuidado.',
      'O debate formal descontextualizado reproduz a lógica abstrata questionada por Gilligan, negligenciando a dor e a vulnerabilidade dos envolvidos.',
      'Sorteios lotéricos aleatórios fogem da deliberação ética consciente e da responsabilidade pelo cuidado interpessoal.'
    ],
    referencia: 'Carol Gilligan - In a Different Voice: Psychological Theory and Women\'s Development (1982)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_15',
    titulo: 'Vulnerabilidade do Hipossuficiente e Relações de Consumo Escolar',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    enunciado: 'Em uma ação civil pública proposta pelo Ministério Público contra uma rede privada de colégios que negligenciou sistematicamente denúncias de bullying e cyberbullying em suas dependências, o parquet sustentou a aplicação concomitante do Código de Defesa do Consumidor (CDC) e do ECA.\n\nA escola alegou que o CDC não se aplica à atividade educacional porque a educação é um serviço de relevância pública com cunho social especial, não constituindo mercadoria.\n\nQual é a posição pacífica do Superior Tribunal de Justiça (STJ) a respeito da incidência do CDC nos contratos de prestação de serviços educacionais privados?',
    contexto: 'Caso avançado de Direito do Consumidor, Direito Educacional e Processo Coletivo.',
    opcoes: [
      'O STJ consolidou que as instituições privadas de ensino sujeitam-se integralmente às normas do Código de Defesa do Consumidor, respondendo pelo defeito do serviço educacional (Art. 14 do CDC) e pelo descumprimento do dever de segurança e integridade física e psíquica garantido ao consumidor educando.',
      'O STJ acolheu a tese da escola, fixando que contratos educacionais privados são regidos unicamente pelas normas consuetudinárias do Direito Canônico medieval.',
      'O CDC só se aplica às escolas privadas se a matrícula for paga com cheques de bancos estatais.',
      'As escolas particulares gozam de imunidade jurídica absoluta contra qualquer intervenção do Ministério Público ou do Poder Judiciário.'
    ],
    correta: 0,
    explicacao: 'A prestação de serviços educacionais remunerados é relação de consumo típica (Arts. 2º e 3º do CDC). A falha no dever de segurança contra bullying constitui fato do serviço, gerando responsabilidade objetiva da instituição perante o consumidor hipossuficiente.',
    justificativaIncorretas: [
      'O Direito Canônico rege questões eclesiásticas internas, sendo totalmente inaplicável à ordem jurídica civil das relações de consumo brasileiras.',
      'O meio de pagamento não altera a natureza jurídica da relação de consumo estabelecida entre a instituição privada e o estudante/família.',
      'O Ministério Público possui legitimidade constitucional expressa para a defesa de interesses difusos e coletivos da infância e da juventude (Art. 129 da CF e Art. 201 do ECA).'
    ],
    referencia: 'STJ - Súmula 297/302 correlatas, REsp 1.155.992/PB e CDC, Arts. 2º, 3º e 14',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_16',
    titulo: 'A Teoria dos Dois Corpos do Rei e a Despersonalização do Agressor',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'bullying',
    enunciado: 'O historiador Ernst Kantorowicz desenvolveu o conceito de "Os Dois Corpos do Rei" na teologia política medieval. Guardadas as devidas proporções analíticas, a psicologia institucional observa um fenômeno análogo na figura do "líder agressor" de turmas escolares: ele possui um corpo biológico singular e um "corpo simbólico" sustentado pela projeção do grupo.\n\nPor que transferir simplesmente o aluno apontado como líder do bullying para outra escola frequentemente não resolve o problema de convivência da turma que permaneceu?',
    contexto: 'Questão de Sociologia Institucional e Psicanálise dos Grupos.',
    opcoes: [
      'Porque o papel do agressor é uma função ecológica da própria estrutura doentia do grupo: se a dinâmica cultural de cumplicidade, silêncio e busca por bodes expiatórios não for desconstruída coletivamente, a turma rapidamente elegerá outro indivíduo para encarnar o mesmo papel de opressor simbólico.',
      'Porque os alunos transferidos possuem poderes telecinéticos para continuar comandando a turma à distância.',
      'Porque a lei brasileira exige que todas as turmas de Ensino Médio tenham obrigatoriamente um agressor cadastrado no censo escolar.',
      'Porque a transferência de estudantes é proibida pela Constituição Federal em qualquer circunstância acadêmica.'
    ],
    correta: 0,
    explicacao: 'O bullying é um sintoma sistêmico de grupo. A psicologia social demonstra que os papéis sociais (agressor, vítima, espectador) são produtos do clima relacional da comunidade; mudar o ator sem mudar a cultura apenas perpetua a engrenagem com novos protagonistas.',
    justificativaIncorretas: [
      'Fenômenos paranormais e telecinéticos são fantasias sem fundamento na ciência e na psicologia educacional.',
      'Nenhuma norma educacional exige ou tolera a existência de agressores em turmas escolares.',
      'A transferência escolar é procedimento administrativo legítimo e previsto na LDB (Lei nº 9.394/1996), embora isoladamente não saneie a raiz cultural do grupo.'
    ],
    referencia: 'Ernst Kantorowicz - Os Dois Corpos do Rei (1957) e Enrique Pichon-Rivière - O Processo Grupal',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_17',
    titulo: 'Dolo de Dano vs Dolo de Perigo na Violência Psicológica Escolar',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    enunciado: 'No Direito Penal dogmático, os crimes classificam-se quanto ao resultado em "crimes de dano" (que exigem a efetiva lesão ao bem jurídico tutelado) e "crimes de perigo" (que se consumam com a mera exposição do bem jurídico a uma situação de probabilidade de dano).\n\nAo tipificar a Intimidação Sistemática (Art. 146-A do Código Penal) e a Perseguição (Art. 147-A), como o legislador estruturou a proteção da paz de espírito e da incolumidade psíquica infanto-juvenil?',
    contexto: 'Análise técnica de Teoria Geral do Delito e Direito Penal da Proteção.',
    opcoes: [
      'Tipificou crimes formais e de perigo concreto/reiterado, cuja consumação prescinde da ocorrência de um laudo psiquiátrico de trauma incurável ou lesão física definitiva na vítima, bastando a comprovação da conduta reiterada idônea a ameaçar a integridade, restringir a liberdade ou perturbar a esfera de tranquilidade do indivíduo.',
      'Exigiu que todo ato de bullying apresente certidão de óbito ou internação hospitalar de emergência para que a autoridade policial possa registrar o boletim de ocorrência.',
      'Estabeleceu que a intimidação sistemática só é crime se o agressor assinar uma confissão prévia com duas testemunhas antes do início das aulas.',
      'Definiu que apenas pessoas com mais de 60 anos de idade podem ser vítimas de crimes de perigo no Brasil.'
    ],
    correta: 0,
    explicacao: 'A tutela penal da tranquilidade psíquica visa à antecipação da proteção: esperar que o trauma se torne dano psiquiátrico crônico irreversível anularia a finalidade preventiva da norma. A conduta reiterada lesiva à paz do educando já consuma o tipo penal.',
    justificativaIncorretas: [
      'A lei não exige desfecho letal ou lesão irreversível; a intimidação sistemática tutela a liberdade e a higidez moral contra a degradação continuada.',
      'Tipos penais não exigem confissões contratuais dos próprios criminosos para a configuração da tipicidade fática.',
      'A proteção penal é extensiva a todas as faixas etárias, havendo causa expressa de aumento de pena quando a vítima é criança ou adolescente.'
    ],
    referencia: 'Código Penal Brasileiro, Arts. 146-A, 147-A e Nelson Hungria - Comentários ao Código Penal',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_18',
    titulo: 'A Razão Comunicativa de Habermas e a Esfera Pública Escolar',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'convivencia',
    enunciado: 'O filósofo Jürgen Habermas formulou a "Teoria do Agir Comunicativo", distinguindo o "Agir Estratégico" (onde os sujeitos buscam impor seus interesses instrumentalizando os outros por meio da força, sedução ou coerção) do "Agir Comunicativo" (onde os sujeitos coordenam suas ações orientados para o entendimento mútuo racional livre de coações).\n\nComo essa distinção ilumina o fracasso de assembleias escolares onde grupos dominantes usam intimidação velada para aprovar regras que favorecem seus privilégios?',
    contexto: 'Questão de Filosofia Contemporânea e Sociologia da Deliberação Democrática.',
    opcoes: [
      'Demonstra que a aparente deliberação democrática foi distorcida pelo agir estratégico colonizador: sem a garantia de que todas as vozes (especialmente as minoritárias e tímidas) possam argumentar sem medo de retaliação e coação velada, não há verdadeira razão comunicativa, mas apenas a imposição disfarçada da força do grupo dominante.',
      'Comprova que Habermas defendia a extinção da linguagem humana nas escolas em favor de sinais luminosos coloridos.',
      'Indica que o agir estratégico é o único método cientificamente aceito para ensinar cidadania a jovens menores de 18 anos.',
      'Mostra que assembleias democráticas só funcionam quando os participantes são obrigados a votar de olhos vendados.'
    ],
    correta: 0,
    explicacao: 'Habermas estabelece a "situação ideal de fala": a validade de uma norma só existe se ela puder ser aceita por todos os afetados em um diálogo livre de assimetrias e ameaças. Se há medo do bullying, a comunicação é corrompida pela coerção estratégica.',
    justificativaIncorretas: [
      'Habermas coloca a linguagem dialógica e a argumentação racional como o próprio fundamento da emancipação humana.',
      'O agir estratégico instrumentaliza o outro como objeto, sendo a raiz da opressão que a educação emancipatória busca superar.',
      'A ética discursiva exige transparência, publicidade e troca recíproca de argumentos, não votações cegas descontextualizadas.'
    ],
    referencia: 'Jürgen Habermas - Teoria do Agir Comunicativo (1981) e Consciência Moral e Agir Comunicativo',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_19',
    titulo: 'Vulnerabilidade do Hipersensível e o Princípio da Alteridade em Levinas',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    enunciado: 'Para o filósofo Emmanuel Levinas, a ética não nasce de normas contratuais abstratas, mas do "Rosto do Outro" (o Infinito que interpela): a vulnerabilidade e a nudez do outro me convocam a uma responsabilidade incondicional, que precede qualquer cálculo ou reciprocidade.\n\nDiante do argumento frequentemente utilizado por agressores de que "a culpa é da vítima porque ela é sensível demais e não sabe lidar com a vida", qual é a refutação ética levinasiana mais radical e verdadeira?',
    contexto: 'Questão profunda de Metaética, Alteridade e Filosofia da Responsabilidade.',
    opcoes: [
      'A sensibilidade e a vulnerabilidade do Outro são precisamente o que funda a minha responsabilidade ética infinita de não assassiná-lo física ou moralmente; exigir que o outro endureça para tolerar a minha violência é uma tentativa narcísica de destruir a alteridade e reduzi-lo ao meu próprio egoísmo autoritário.',
      'Levinas concordaria com os agressores, pois afirmava que todos os indivíduos frágeis devem ser eliminados da convivência social.',
      'A alteridade levinasiana defende que apenas seres humanos com mais de dois metros de altura possuem rostos com relevância ética.',
      'A responsabilidade ética para Levinas só surge após a celebração de um contrato comercial assinado em cartório com firma reconhecida.'
    ],
    correta: 0,
    explicacao: 'Em *Totalidade e Infinito*, Levinas ensina que o Rosto da vítima interpela o agressor com o mandamento ontológico: "Não matarás". Culpar a vítima por sua sensibilidade é o ápice da violência totalitária que tenta domesticar ou culpar a vítima pelo sofrimento imposto pelo opressor.',
    justificativaIncorretas: [
      'Levinas constrói sua filosofia precisamente como denúncia radical do Holocausto e de todas as formas de aniquilação do vulnerável.',
      'O "Rosto" em Levinas é uma categoria ético-filosófica universal da humanidade sofredora, sem correlação com medidas biométricas corporais.',
      'A responsabilidade em Levinas é originária e anterior a qualquer contrato: somos responsáveis pelo Outro antes mesmo de escolhermos sê-lo.'
    ],
    referencia: 'Emmanuel Levinas - Totalidade e Infinito: Ensaio sobre a exterioridade (1961)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_20',
    titulo: 'A Dinâmica da Culpa Coletiva e o Julgamento de Karl Jaspers',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    enunciado: 'Em sua clássica obra *A Questão da Culpa* (Die Schuldfrage, 1946), o filósofo e psiquiatra Karl Jaspers distinguiu quatro modalidades de culpa diante de atrocidades e violências históricas: culpa criminal, culpa política, culpa moral e culpa metafísica.\n\nComo a categoria da "Culpa Metafísica" de Jaspers se aplica aos estudantes que testemunham um colega ser diariamente humilhado e isolado até o limiar do desespero e que, embora não tenham praticado nenhuma ofensa direta, permanecem inertes?',
    contexto: 'Questão refinada de Filosofia da Culpa, Existencialismo e Ética da Solidariedade Universal.',
    opcoes: [
      'Consiste na coparticipação na condição humana compartilhada: a consciência de que existe uma solidariedade incondicional entre todos os seres humanos que nos torna corresponsáveis por cada mal e injustiça cometidos diante dos nossos olhos sem que tenhamos feito tudo o que podíamos para impedi-los, ainda que não sejamos penalmente criminosos.',
      'A culpa metafísica é a obrigação legal de pagar o funeral da vítima imposta pelo Código Penal brasileiro aos vizinhos de rua.',
      'Trata-se de uma dívida de impostos territoriais devida ao Ministério da Fazenda por não haver denúncias em dia.',
      'Jaspers afirmava que testemunhas de violência nunca experimentam nenhuma forma de conflito de consciência ou responsabilidade ética.'
    ],
    correta: 0,
    explicacao: 'A culpa metafísica decorre da solidariedade primordial da existência humana: "Se eu não fiz tudo o que pude para impedir o mal, eu sou culpado no íntimo da minha consciência existencial". É a voz moral que interpela as testemunhas silenciosas a romperem a passividade.',
    justificativaIncorretas: [
      'A culpa criminal ou civil é de índole jurídica estatal, distinta da dimensão filosófico-metafísica da consciência universal.',
      'Tributos e normas financeiras operam na esfera fiscal do Estado, sem nexo com a ontologia existencial jaspersiana.',
      'O cerne da tese de Jaspers é a superação da indiferença e a tomada de consciência da responsabilidade individual de cada cidadão.'
    ],
    referencia: 'Karl Jaspers - A Questão da Culpa (1946)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_21',
    titulo: 'Vulnerabilidade Epistêmica e Injustiça Testemunhal de Miranda Fricker',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    enunciado: 'A filósofa Miranda Fricker conceituou a "Injustiça Epistêmica", desdobrando-a em "Injustiça Testemunhal" (quando um preconceito do ouvinte atribui um déficit injusto de credibilidade à fala de quem relata) e "Injustiça Hermenêutica" (quando a vítima não dispõe de conceitos compartilhados para dar sentido à sua própria opressão).\n\nEm qual situação escolar a Injustiça Testemunhal de Fricker se manifesta com maior nitidez?',
    contexto: 'Questão profunda de Epistemologia Social e Ética Contemporânea.',
    opcoes: [
      'Quando um estudante tímido, negro ou de periferia relata à direção que vem sofrendo intimidações e chantagens graves, mas a coordenação desdenha do relato dizendo que "ele deve estar exagerando ou inventando historinhas", ao mesmo tempo em que acredita cegamente na palavra dos estudantes populares acusados devido ao status social e familiar destes.',
      'Quando todos os computadores da escola perdem conexão com a internet durante uma tempestade de raios.',
      'Quando a biblioteca da escola recebe caixas de livros novos de literatura clássica do MEC.',
      'Quando dois professores discordam sobre o gabarito de uma questão de física quântica no conselho de classe.'
    ],
    correta: 0,
    explicacao: 'A injustiça testemunhal ocorre quando preconceitos de classe, raça ou status diminuem o crédito da palavra da pessoa, privando-a de sua dignidade enquanto sujeito de conhecimento e portadora de verdade, desarmando sua capacidade de obter proteção.',
    justificativaIncorretas: [
      'Queda de conexão por fatores climáticos é contingência infraestrutural técnica, sem dimensão de injustiça epistêmica interpessoal.',
      'Recebimento de acervo literário é enriquecimento pedagógico cultural institucional.',
      'Divergência técnica entre docentes sobre ciências duras é debate acadêmico legítimo, desprovido de estigma testemunhal de preconceito.'
    ],
    referencia: 'Miranda Fricker - Epistemic Injustice: Power and the Ethics of Knowing (2007)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_22',
    titulo: 'A Teoria do Chivo Expiatório de René Girard e a Mimese Desejante',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'bullying',
    enunciado: 'O antropólogo e filósofo René Girard formulou a "Teoria Mimética" e o mecanismo do "Bode Expiatório" (Scapegoat Mechanism). Segundo Girard, os seres humanos imitam os desejos uns dos outros, o que gera rivalidade mimetizada e crise de violência generalizada no grupo.\n\nComo o mecanismo girardiano do bode expiatório explica por que turmas escolares em crise de indisciplina e ansiedade frequentemente elegem um único colega excêntrico para concentrar todo o ódio e as agressões coletivas?',
    contexto: 'Questão interdisciplinar de Antropologia Filosófica, Psicanálise e Teoria Literária.',
    opcoes: [
      'O grupo descarrega suas tensões e frustrações acumuladas sobre uma vítima arbitrária e vulnerável (o bode expiatório); a canalização unânime da violência contra ela reconcilia temporariamente os agressores entre si, criando uma falsa sensação de coesão e alívio social à custa do sacrifício cruel do inocente.',
      'Porque a vítima foi formalmente sorteada pelo grêmio estudantil em cerimônia cívica legalmente autorizada.',
      'Girard comprovou que o sacrifício de estudantes bodes expiatórios melhora o índice de aprovação da escola no IDEB.',
      'O mecanismo mimético de Girard aplica-se apenas a sociedades tribais da Polinésia neolítica sem qualquer relevância para escolas modernas.'
    ],
    correta: 0,
    explicacao: 'Em *A Violência e o Sagrado*, Girard demonstra que a violência unânime contra o bode expiatório pacifica temporariamente a crise do grupo: ao se unirem no ódio comum contra o excluído, os demais suspendem suas brigas internas, operando uma falsa ordem fundada na perseguição injusta.',
    justificativaIncorretas: [
      'A eleição da vítima decorre de dinâmicas inconscientes de exclusão social e vulnerabilidade, não de sorteios burocráticos.',
      'O IDEB mede desempenho educacional e aprendizagem; violências sacrificiais corroem o rendimento e geram evasão escolar.',
      'A teoria mimética de Girard é uma das ferramentas analíticas mais citadas pela sociologia e psicologia social contemporânea para compreender o linchamento de pares nas redes e escolas.'
    ],
    referencia: 'René Girard - A Violência e o Sagrado (1972) e O Bode Expiatório (1982)',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_23',
    titulo: 'Vulnerabilidade do Estudante Indígena e Preconceito Etnorracial',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'direitos',
    enunciado: 'Um estudante de etnia indígena ingressa em uma escola pública urbana e passa a ser hostilizado com chacotas sobre sua linguagem, seus traços físicos e seus costumes tradicionais, sendo chamado pejorativamente de "selvagem" e tendo seus adereços sagrados arrancados à força no recreio.\n\nAlém de configurar bullying sistemático qualificado, sob a Convenção 169 da Organização Internacional do Trabalho (OIT - Decreto nº 10.088/2019) e o Artigo 20 da Lei nº 7.716/1989 (com alterações da Lei nº 14.532/2023), qual é a tipificação jurídica e a gravidade dessa violência?',
    contexto: 'Questão aprofundada de Direito Indigenista, Direito Internacional dos Direitos Humanos e Legislação Antirracista.',
    opcoes: [
      'Configura crime de racismo etnorracial e violação de direitos humanos fundamentais protegidos por tratados internacionais supralegais, tratando-se de conduta inafiançável, imprescritível e que atenta contra o direito à autoidentificação étnica, à dignidade cultural e à integridade espiritual garantidos aos povos originários.',
      'Trata-se de desentendimento cultural comum sem tipificação penal no Brasil, pois o Estatuto do Índio de 1973 desautoriza a punição de atos cometidos em escolas.',
      'A conduta é permitida desde que a escola tenha mais de 500 anos de fundação histórica.',
      'A agressão é considerada ilícito exclusivamente desportivo que deve ser julgado pelo Superior Tribunal de Justiça Desportiva (STJD).'
    ],
    correta: 0,
    explicacao: 'A Lei nº 14.532/2023 e a Lei nº 7.716/1989 criminalizam expressamente a discriminação ou preconceito de raça, cor, etnia, religião ou procedência nacional. Chamar de "selvagem" e profanar símbolos culturais configura racismo de natureza inafiançável e imprescritível (Art. 5º, XLII da CF/88).',
    justificativaIncorretas: [
      'O crime de racismo etnorracial é plenamente aplicável no ambiente escolar, sendo superada qualquer tese de atipicidade.',
      'A longevidade temporal do prédio escolar não autoriza violações da dignidade e crimes constitucionais inafiançáveis.',
      'O STJD atua na disciplina de competições esportivas desportivas profissionais, não possuindo competência penal penal sobre crimes de racismo em escolas.'
    ],
    referencia: 'Constituição Federal de 1988, Art. 5º, XLII e Art. 231; Convenção 169 da OIT e Lei nº 7.716/1989',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['doutor_da_etica']
  },
  {
    id: 'quiz_impossivel_24',
    titulo: 'A Tensão Entre Criptografia Ponta a Ponta e Responsabilidade Penal',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'cyber',
    enunciado: 'Em um caso gravíssimo de vazamento de imagens íntimas com ameaças de morte e extorsão entre estudantes que operam em canais criptografados de mensagens (como Telegram e Signal), o juízo da infância determina a quebra de sigilo e fornecimento dos registros de conexão e metadados pelas empresas operadoras.\n\nAs empresas alegam a inviabilidade técnica de decodificar o conteúdo das mensagens devido à arquitetura de criptografia de ponta a ponta (end-to-end encryption), invocando a tutela da privacidade geral dos usuários.\n\nÀ luz da hermenêutica do Marco Civil da Internet (Arts. 10 e 15) e da jurisprudência recente dos tribunais brasileiros, como se equaciona a tensão entre a proteção técnica da privacidade e o dever de cooperação judicial na apuração de atos infracionais graves contra crianças e adolescentes?',
    contexto: 'Questão de ponta de Direito Digital, Segurança da Informação e Processo Penal Constitucional.',
    opcoes: [
      'Embora a quebra do algoritmo de criptografia ponta a ponta possa ser tecnicamente inviável sem vulnerar a segurança de toda a base de usuários, os provedores são legalmente obrigados a preservar e fornecer todos os metadados auxiliares (IPs de conexão, portas lógicas, datas, horários e números associados) que permitam a identificação dos autores materiais do ilícito, sob pena de sanções administrativas e responsabilização por desobediência e obstrução.',
      'A existência de criptografia ponta a ponta anula a eficácia de todas as leis brasileiras e extingue imediatamente a autoridade do Poder Judiciário no ciberespaço.',
      'O juiz deve ordenar a prisão perpétua imediata de todos os usuários que tiverem o aplicativo instalado no país.',
      'O Marco Civil da Internet proíbe o fornecimento de qualquer registro de conexão, mesmo diante de ordem judicial fundamentada que apure crimes contra menores.'
    ],
    correta: 0,
    explicacao: 'O STF (no julgamento das ADIs 5527 e 5953 sobre bloqueio de aplicativos) e o Marco Civil estabelecem que, se o conteúdo criptografado não pode ser quebrado sem fragilizar a segurança sistêmica, a guarda e entrega dos registros de acesso (metadados, IPs, timestamps) é cogente para viabilizar a persecução penal de crimes hediondos e proteção da infância.',
    justificativaIncorretas: [
      'A soberania jurisdicional e a aplicabilidade das leis mantêm-se íntegras no espaço virtual brasileiro (Art. 11 da Lei 12.965/2014).',
      'A Constituição proíbe penas perpétuas (Art. 5º, XLVII, "b") e o ordenamento exige individualização rigorosa da conduta.',
      'O Art. 10, § 1º do Marco Civil autoriza e exige expressamente a disponibilização dos registros de conexão mediante ordem judicial.'
    ],
    referencia: 'STF - ADI 5527 e ADI 5953; Marco Civil da Internet (Lei nº 12.965/2014), Arts. 10, 11 e 15',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['guardiao_digital']
  },
  {
    id: 'quiz_impossivel_25',
    titulo: 'A Coragem Cívica e o Sentido Ontológico da Educação Emancipatória',
    dificuldade: 'impossivel',
    categoria: 'enem_avancado',
    competencia: 'respeito',
    enunciado: 'Leia o célebre pensamento do educador Paulo Freire em *Pedagogia da Autonomia*:\n\n"Educação não transforma o mundo. Educação muda as pessoas. Pessoas transformam o mundo [...] Não posso ser professor se não percebo cada vez melhor que a minha prática, não podendo ser neutra, exige de mim uma definição. Uma tomada de posição. Uma decisão. Uma ruptura."\n\nConcluindo a jornada mais exigente da Central de Respeito do StopBullying na EEMTI Alfredo Machado, qual síntese expressa com fidelidade inabalável a postura ética esperada de um estudante que alcança a maturidade de julgamento na convivência escolar e social?',
    contexto: 'Questão culminante da Trilha Suprema de Sabedoria Ética e Filosofia da Práxis.',
    opcoes: [
      'Reconhecer que a verdadeira sabedoria não é mero acúmulo de notas ou saberes abstratos, mas a práxis ética da coragem cívica: recusar a neutralidade conivente perante a opressão, acolher a vulnerabilidade de cada ser humano como dever inviolável e intervir ativamente para construir um ambiente escolar e social fundado na justiça, no afeto e na dignidade inegociável de todos.',
      'Decorar respostas para gabaritar exames vestibulares enquanto reproduz piadas de opressão nos intervalos com a certeza de que a dor alheia não lhe diz respeito.',
      'Acreditar que a convivência pacífica só é necessária durante o horário de funcionamento das câmeras de vigilância escolar.',
      'Concluir que as injustiças humanas são leis imutáveis da natureza e que a melhor estratégia existencial é se aliar aos mais fortes e oprimir os mais fracos para garantir vantagens particulares.'
    ],
    correta: 0,
    explicacao: 'A educação autêntica é libertadora e emancipatória (Freire). A sabedoria adquirida culmina na coragem moral: não ser cúmplice do silêncio, defender os direitos do vulnerável e ser agente vivo de transformação ética e paz em sua comunidade.',
    justificativaIncorretas: [
      'O mero academicismo desprovido de ética produz saberes vazios que toleram e reproduzem a violência.',
      'A ética não se restringe à vigilância de câmeras exteriores; ela é a lei moral interior da consciência autônoma.',
      'O conformismo predatório é a negação da cidadania, dos direitos humanos e do sentido da civilização democrática.'
    ],
    referencia: 'Paulo Freire - Pedagogia da Autonomia: Saberes necessários à prática educativa (1996) e Projeto Sentinela EEMTI Alfredo Machado',
    xpRecompensa: 50,
    missoesAssociadas: ['mis_sabedoria_juridica'],
    conquistasAssociadas: ['mestre_absoluto_sentinela', 'doutor_da_etica']
  }
];














export const ALL_QUIZZES: QuizItem[] = [
  ...FACIL_QUIZZES,
  ...MEDIO_QUIZZES,
  ...DIFICIL_QUIZZES,
  ...IMPOSSIVEL_QUIZZES
];

export const QUIZ_DIFFICULTY_XP: Record<DifficultyLevel, number> = {
  facil: 10,
  medio: 20,
  dificil: 35,
  impossivel: 50
};

export const QUIZ_DIFFICULTY_LABELS: Record<DifficultyLevel, { name: string; badge: string; color: string; border: string; bg: string }> = {
  facil: {
    name: 'Fácil',
    badge: 'Nível 1 • Fácil',
    color: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-300 dark:border-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40'
  },
  medio: {
    name: 'Médio',
    badge: 'Nível 2 • Médio',
    color: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-950/40'
  },
  dificil: {
    name: 'Difícil',
    badge: 'Nível 3 • Difícil',
    color: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-950/40'
  },
  impossivel: {
    name: 'Impossível',
    badge: 'Nível 4 • Impossível (ENEM)',
    color: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-300 dark:border-rose-600',
    bg: 'bg-rose-50 dark:bg-rose-950/40'
  }
};

export const getQuizById = (id: string): QuizItem | undefined => {
  return ALL_QUIZZES.find(q => q.id === id);
};

export const getQuizzesByDifficulty = (diff: DifficultyLevel): QuizItem[] => {
  return ALL_QUIZZES.filter(q => q.dificuldade === diff);
};

export const getQuizzesByCategory = (cat: QuestionCategory): QuizItem[] => {
  return ALL_QUIZZES.filter(q => q.categoria === cat);
};
