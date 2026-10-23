import { QuizItem } from './types';

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
