import { Denuncia, QuizQuestion, MaterialApoio } from '../types';

export const INITIAL_DENUNCIAS: Denuncia[] = [];

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
    pergunta: "1. O que caracteriza juridicamente a Intimidação Sistemática (Bullying) segundo a Lei Federal nº 13.185/2015?",
    opcoes: [
      "A) Qualquer atrito verbal ou discordância pontual com paridade de forças durante discussões de intervalo.",
      "B) Violência física ou psicológica intencional e reiterada, praticada com assimetria de poder e sem motivação evidente por indivíduo ou grupo.",
      "C) Exclusivamente agressões físicas corporais que resultem em lesão comprovada por exame de corpo de delito.",
      "D) Desentendimentos disciplinares que ocorram obrigatoriamente dentro da sala de aula na presença de docentes."
    ],
    correta: 1,
    explicacao: "A Lei 13.185/2015 define intimidação sistemática através do tripé: intencionalidade de lesar, reiteração no tempo e manifesto desequilíbrio de poder entre as partes.",
    referencia: "Art. 1º, § 1º da Lei nº 13.185/2015"
  },
  {
    pergunta: "2. Qual a porcentagem aproximada de estudantes de 13 a 17 anos no Brasil que relatam vivência com bullying (PeNSE/IBGE) e a realidade diagnosticada na EEMTI Alfredo Machado?",
    opcoes: [
      "A) Menos de 10% em âmbito nacional, sendo considerado um problema residual sem relevância estatística.",
      "B) Cerca de 25% no país, concentrado exclusivamente em escolas particulares de capitais.",
      "C) Aproximadamente 40% na média nacional (IBGE), atingindo 60,5% de estudantes que já relataram sofrer agressões no diagnóstico da EEMTI Alfredo Machado.",
      "D) Mais de 90% em todas as faixas etárias, sem diferenciação entre conflitos pontuais e intimidação reiterada."
    ],
    correta: 2,
    explicacao: "Dados oficiais do IBGE (PeNSE) apontam cerca de 40% de prevalência nacional, confirmando os dados da pesquisa de campo do projeto na EEMTI Alfredo Machado (n=38), onde 60,5% relataram vitimização.",
    referencia: "IBGE / PeNSE 2024 & Diagnóstico Local EEMTI Alfredo Machado (n=38)"
  },
  {
    pergunta: "3. Com a sanção da Lei Federal nº 14.811/2024, como o Código Penal Brasileiro passou a tipificar e punir o Cyberbullying (Art. 146-A, Parágrafo Único)?",
    opcoes: [
      "A) Como mera falta disciplinar interna da escola sujeita apenas a cancelamento de matrícula escolar.",
      "B) Como crime qualificado de intimidação sistemática virtual com pena de reclusão de 2 a 4 anos e multa, se não constituir crime mais grave.",
      "C) Como infração administrativa de trânsito digital com bloqueio compulsório de conexão via provedor.",
      "D) Como contravenção menor sujeita unicamente a retratação pública perante os membros da turma."
    ],
    correta: 1,
    explicacao: "A Lei 14.811/2024 introduziu o Art. 146-A no Código Penal, cominando reclusão de 2 a 4 anos e multa para a intimidação cometida pela internet, redes sociais, jogos online ou transmissões em tempo real.",
    referencia: "Lei nº 14.811/2024 / Código Penal Art. 146-A, Parágrafo Único"
  },
  {
    pergunta: "4. Qual elemento técnico diferencia o Cyberbullying de um mero desentendimento em aplicativos de mensagens?",
    opcoes: [
      "A) O horário em que as mensagens são enviadas, sendo crime apenas após as 22 horas.",
      "B) A perseguição contínua, difamação sistemática, exclusão deliberada ou exposição vexatória amplificada 24 horas por dia com invasão do espaço seguro da vítima.",
      "C) O fato de a mensagem ter sido enviada em formato de áudio em vez de texto digitado.",
      "D) A quantidade de megabytes ocupada pelo aplicativo no aparelho celular do destinatário."
    ],
    correta: 1,
    explicacao: "O cyberbullying extrapola o conflito pontual: perpetua o sofrimento na web sem cessar ao término da aula, amplia a plateia de constrangimento e invade a privacidade da vítima a qualquer momento.",
    referencia: "Art. 2º da Lei nº 13.185/2015 e Marco Civil da Internet"
  },
  {
    pergunta: "5. Qual a conduta orientada pelo protocolo dos 4 D's para um 'Espectador Ativo' (Upstander) ao presenciar agressão ou perseguição velada?",
    opcoes: [
      "A) Rir junto ou curtir os conteúdos para preservar seu status de pertencimento e evitar virar o próximo alvo da turma.",
      "B) Adotar postura de neutralidade silenciosa, acreditando que a omissão isenta o indivíduo de responsabilidade ética.",
      "C) Confrontar o agressor com agressões corporais violentas para impor o respeito pela força física.",
      "D) Quebrar o consenso com calma (Direto), desviar o foco (Distrair), acionar autoridades escolares (Delegar) e acolher a vítima com sigilo (Dar Apoio)."
    ],
    correta: 3,
    explicacao: "O espectador ativo quebra o ciclo de violência aplicando os 4 D's com sabedoria e segurança: não valida o abuso, protege a vítima e mobiliza os canais institucionais de acolhimento e justiça restaurativa.",
    referencia: "Programa de Mediação Escolar e Convivência Democrática (Metodologia dos 4 D's)"
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
