import { BankQuestion } from './types';

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
