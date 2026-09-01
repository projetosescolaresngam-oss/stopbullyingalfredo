import { Denuncia, QuizQuestion, MaterialApoio } from '../types';

export const INITIAL_DENUNCIAS: Denuncia[] = [
  {
    id: '1',
    protocolo: 'STP-94A1F',
    tipo_violencia: 'Cyberbullying',
    local_escola: 'Redes Sociais',
    descricao: 'Estão criando perfis falsos e montagens no Instagram com fotos tiradas durante o intervalo sem consentimento, ridicularizando colegas de classe.',
    link_cyberbullying: 'https://instagram.com/post_exemplo_denuncia',
    data_envio: '2026-08-22T10:30:00Z',
    status: 'Em Análise',
    nivel_gravidade: 'Recorrente'
  },
  {
    id: '2',
    protocolo: 'STP-88C2B',
    tipo_violencia: 'Verbal',
    local_escola: 'Sala de Aula',
    descricao: 'Ofensas verbais e apelidos pejorativos diários durante as aulas quando o estudante é chamado pelo professor para apresentar dúvidas.',
    data_envio: '2026-08-20T14:15:00Z',
    status: 'Acolhido',
    nivel_gravidade: 'Leve'
  },
  {
    id: '3',
    protocolo: 'STP-71E9D',
    tipo_violencia: 'Física',
    local_escola: 'Pátio/Recreio',
    descricao: 'Empurrões repetidos na fila do refeitório com rasgo de caderno e ameaças caso a coordenação fosse avisada.',
    data_envio: '2026-08-18T11:00:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave'
  },
  {
    id: '4',
    protocolo: 'STP-63F4A',
    tipo_violencia: 'Psicológica',
    local_escola: 'Corredor/Escada',
    descricao: 'Chantagem emocional e exclusão deliberada em trabalhos em grupo com ameaças veladas de isolamento social.',
    data_envio: '2026-08-15T09:45:00Z',
    status: 'Em Análise',
    nivel_gravidade: 'Recorrente'
  }
];

export const FRASES_MOTIVACIONAIS = [
  "Você é forte e merece respeito. Pedir ajuda é um ato de coragem, nunca de fraqueza.",
  "O bullying diminui o agressor, nunca você. Conte com a equipe da EEMTI Alfredo Machado!",
  "Sua voz importa. Não guarde a dor sozinho(a), estamos juntos por você.",
  "A escola é um lugar sagrado de paz, acolhimento e aprendizado para todos.",
  "Denunciar o bullying é proteger você e todos os seus colegas de classe.",
  "Respeitar as diferenças é o primeiro passo para uma convivência verdadeiramente democrática."
];

export const QUIZ_QUESTOES: QuizQuestion[] = [
  {
    pergunta: "1. O que caracteriza legalmente o bullying segundo a Lei Federal nº 13.185/2015?",
    opcoes: [
      "A) Uma briga isolada ou discordância pontual entre estudantes.",
      "B) Violência física ou psicológica intencional e repetida sem motivação evidente praticada por indivíduo ou grupo.",
      "C) Qualquer desentendimento de regras durante o treino de educação física.",
      "D) Apenas agressões físicas com lesão corporal visível."
    ],
    correta: 1,
    explicacao: "A Lei 13.185/2015 define intimidação sistemática (bullying) como todo ato de violência física ou psicológica, intencional e repetitivo, que ocorre sem motivação evidente.",
    referencia: "Art. 1º, § 1º da Lei nº 13.185/2015"
  },
  {
    pergunta: "2. Qual a porcentagem aproximada de estudantes de 13 a 17 anos no Brasil que já relataram sofrer bullying (IBGE / PeNSE 2024)?",
    opcoes: [
      "A) Menos de 5%",
      "B) Cerca de 12%",
      "C) Aproximadamente 40% (com 60,5% vitimizados no diagnóstico da EEMTI Alfredo Machado)",
      "D) Mais de 95%"
    ],
    correta: 2,
    explicacao: "Dados da Pesquisa Nacional de Saúde do Escolar (PeNSE/IBGE) apontam que cerca de 40% dos estudantes brasileiros relatam vivência com bullying, reforçando a urgência da plataforma StopBullying.",
    referencia: "IBGE / PeNSE 2024 & Diagnóstico Local EEMTI Alfredo Machado (n=38)"
  },
  {
    pergunta: "3. Como o Código Penal brasileiro e a Lei nº 14.811/2024 passaram a tratar o bullying e o cyberbullying?",
    opcoes: [
      "A) Apenas como uma falta disciplinar interna da escola sem relevância jurídica.",
      "B) Tipificou o bullying e cyberbullying no Código Penal (Art. 146-A), prevendo multa e reclusão de 2 a 4 anos para crimes virtuais.",
      "C) Proibiu o uso de qualquer tecnologia dentro dos colégios estaduais.",
      "D) Tornou o bullying permitido em redes sociais privadas."
    ],
    correta: 1,
    explicacao: "A Lei 14.811/2024 instituiu o Programa Escola Mais Segura e inseriu o Art. 146-A no Código Penal, criminalizando expressamente a intimidação sistemática e o cyberbullying.",
    referencia: "Lei nº 14.811/2024 / Código Penal Art. 146-A"
  },
  {
    pergunta: "4. O que é o Cyberbullying?",
    opcoes: [
      "A) Jogar videogame online em equipe com amigos da escola.",
      "B) Intimidação, humilhação, perseguição e difamação sistemática realizadas em ambientes virtuais e redes sociais.",
      "C) Enviar tarefas escolares por e-mail ou WhatsApp do grupo da turma.",
      "D) Ter uma conta privada no Instagram."
    ],
    correta: 1,
    explicacao: "Cyberbullying é a intimidação sistemática realizada por meio da rede mundial de computadores, redes sociais, jogos online ou aplicativos de mensagens.",
    referencia: "Art. 2º da Lei nº 13.185/2015 e Lei nº 14.811/2024"
  },
  {
    pergunta: "5. Qual a postura esperada de um 'Espectador Ativo' e consciente ao presenciar um ato de bullying?",
    opcoes: [
      "A) Rir e incentivar as piadas do agressor para se enturmar.",
      "B) Ficar em silêncio absoluto para evitar se tornar o próximo alvo.",
      "C) Gravar vídeos da vítima para publicar nos grupos da escola.",
      "D) Acolher a vítima, repudiar a violência e registrar uma denúncia anônima e segura no aplicativo StopBullying."
    ],
    correta: 3,
    explicacao: "O espectador ativo não é cúmplice do agressor: ele quebra o ciclo de violência oferecendo solidariedade e acionando os canais protegidos da coordenação.",
    referencia: "Programa de Mediação Escolar e Convivência Democrática"
  }
];

export const MATERIAIS_APOIO: MaterialApoio[] = [
  {
    id: '1',
    titulo: 'Você Não Está Sozinho(a)',
    categoria: 'Saúde Mental',
    conteudo: 'Pedir ajuda é um sinal de coragem, nunca de fraqueza. Procure o professor orientador ou a equipe gestora da EEMTI Alfredo Machado. Estamos com você.',
    icone: '💚'
  },
  {
    id: '2',
    titulo: 'CVV — Centro de Valorização da Vida',
    categoria: 'Emergência',
    conteudo: 'Atendimento emocional gratuito, confidencial e anônimo 24 horas por dia pelo telefone 188.',
    link_externo: 'tel:188',
    icone: '📞'
  },
  {
    id: '3',
    titulo: 'Lei Federal nº 13.185/2015 & Lei nº 14.811/2024',
    categoria: 'Legislação',
    conteudo: 'Institui o Programa de Combate à Intimidação Sistemática e tipifica o bullying e cyberbullying no Código Penal brasileiro.',
    link_externo: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13185.htm',
    icone: '⚖️'
  },
  {
    id: '4',
    titulo: 'Disque 100 — Direitos Humanos',
    categoria: 'Emergência',
    conteudo: 'Canal oficial do Governo Federal para denúncias de violações de direitos de crianças e adolescentes. Gratuito e anônimo.',
    link_externo: 'tel:100',
    icone: '🛡️'
  }
];
