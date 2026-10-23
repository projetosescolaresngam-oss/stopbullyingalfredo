import { QuizItem } from './types';

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
