import { QuizItem } from './types';

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
