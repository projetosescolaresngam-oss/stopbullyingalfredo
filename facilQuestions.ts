import { BankQuestion } from './types';

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
