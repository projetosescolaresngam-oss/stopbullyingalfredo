import { QuizItem } from './types';

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
