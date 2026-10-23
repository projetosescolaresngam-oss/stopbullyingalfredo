import { BankQuestion } from './types';

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
