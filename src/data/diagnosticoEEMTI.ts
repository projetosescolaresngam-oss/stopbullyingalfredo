import { Denuncia } from '../types';

/**
 * Dados tabulados da Pesquisa Diagnóstica de Clima Escolar e Bullying
 * Realizada na E.E.M.T.I. Alfredo Machado (Madalena - CE, CREDE 12)
 * Amostra: n = 38 estudantes do Ensino Médio em Tempo Integral
 */

export interface MetadadosDiagnostico {
  escola: string;
  municipio: string;
  crede: string;
  amostraTotal: number;
  taxaVitimizacaoHistorica: number; // 60.5%
  taxaSilencioHistorico: number; // 73% não denunciavam antes do app
  anoReferencia: number;
  projeto: string;
}

export const METADADOS_PESQUISA_EEMTI: MetadadosDiagnostico = {
  escola: 'E.E.M.T.I. Alfredo Machado',
  municipio: 'Madalena / CE',
  crede: 'CREDE 12 - Quixadá',
  amostraTotal: 38,
  taxaVitimizacaoHistorica: 60.5,
  taxaSilencioHistorico: 73.0,
  anoReferencia: 2026,
  projeto: 'StopBullying: Tecnologia, Sociologia Escolar e Mediação Restaurativa'
};

export const CASOS_DIAGNOSTICO_EEMTI: Denuncia[] = [
  {
    id: 'diag-001',
    protocolo: 'AM-2026-01',
    tipo_violencia: 'Verbal',
    local_escola: 'Pátio/Recreio',
    descricao: 'Apelidos pejorativos repetidos sobre aparência física durante o almoço no pátio.',
    data_envio: '2026-02-05T12:20:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Quase todos os dias',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '1º Ano A',
    agressor_grupo: 'Dois estudantes do mesmo ano',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Isolamento no recreio', 'Ansiedade ao se alimentar'],
    medidas_protecao: ['Círculo de diálogo restaurativo', 'Supervisão pedagógica no refeitório'],
    acoes_mediacao: [
      { id: 'ac-1', data_hora: '2026-02-06T09:00:00Z', autor: 'Coordenação', tipo: 'escuta_ativa', descricao: 'Acolhimento da vítima em sala reservada.' },
      { id: 'ac-2', data_hora: '2026-02-08T14:30:00Z', autor: 'Comissão de Paz', tipo: 'sessao_mediacao', descricao: 'Círculo restaurativo e pedido formal de desculpas.' }
    ]
  },
  {
    id: 'diag-002',
    protocolo: 'AM-2026-02',
    tipo_violencia: 'Cyberbullying',
    local_escola: 'Redes Sociais',
    descricao: 'Criação de figurinhas zombando de estudante em grupo de mensagens da turma.',
    data_envio: '2026-02-07T19:40:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Alta',
    frequencia: 'Algumas vezes na semana',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '2º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Queda no rendimento escolar', 'Vergonha de participar da aula'],
    medidas_protecao: ['Exclusão das mídias com orientação aos responsáveis', 'Palestra sobre crimes virtuais'],
    acoes_mediacao: [
      { id: 'ac-3', data_hora: '2026-02-09T08:00:00Z', autor: 'Orientador Pedagógico', tipo: 'contato_familia', descricao: 'Reunião formativa com os responsáveis de ambas as partes.' }
    ]
  },
  {
    id: 'diag-003',
    protocolo: 'AM-2026-03',
    tipo_violencia: 'Física',
    local_escola: 'Corredor/Escada',
    descricao: 'Empurrões intencionais na saída da aula de laboratório com queda de material.',
    data_envio: '2026-02-11T16:15:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Crítica',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Amigo/Colega',
    turma_envolvida: '1º Ano B',
    is_sos: true,
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Medo de andar nos corredores', 'Dano a material'],
    medidas_protecao: ['Acompanhamento de inspetores nos intervalos', 'Termo de convivência assinado'],
    acoes_mediacao: [
      { id: 'ac-4', data_hora: '2026-02-12T10:00:00Z', autor: 'Direção', tipo: 'escuta_ativa', descricao: 'Intervenção imediata e garantia de segurança.' }
    ]
  },
  {
    id: 'diag-004',
    protocolo: 'AM-2026-04',
    tipo_violencia: 'Psicológica',
    local_escola: 'Sala de Aula',
    descricao: 'Gritos intimidatórios e exclusão deliberada da formação de grupos de trabalho.',
    data_envio: '2026-02-14T10:30:00Z',
    status: 'Acolhido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Quase todos os dias',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '2º Ano B',
    etapa_mediacao: 'sessao_dialogo',
    impactos_identificados: ['Isolamento no recreio', 'Crises de choro'],
    medidas_protecao: ['Remapeamento dos grupos pedagógicos', 'Apoio psicopedagógico'],
    acoes_mediacao: [
      { id: 'ac-5', data_hora: '2026-02-15T11:00:00Z', autor: 'Coordenação', tipo: 'escuta_ativa', descricao: 'Sessão individual com o estudante.' }
    ]
  },
  {
    id: 'diag-005',
    protocolo: 'AM-2026-05',
    tipo_violencia: 'Social',
    local_escola: 'Pátio/Recreio',
    descricao: 'Campanha silenciosa para que ninguém converse com a colega recém-matriculada.',
    data_envio: '2026-02-18T12:45:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Leve',
    nivel_escalada: 'Baixa',
    frequencia: 'Há semanas',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '1º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Solidão profunda', 'Vontade de mudar de escola'],
    medidas_protecao: ['Dinâmica de integração e acolhimento promovida pelo Grêmio'],
    acoes_mediacao: [
      { id: 'ac-6', data_hora: '2026-02-19T13:30:00Z', autor: 'Grêmio Estudantil', tipo: 'sessao_mediacao', descricao: 'Círculo de boas-vindas e amizade.' }
    ]
  },
  {
    id: 'diag-006',
    protocolo: 'AM-2026-06',
    tipo_violencia: 'Verbal',
    local_escola: 'Sala de Aula',
    descricao: 'Piadas e deboches durante apresentações de seminários de Geografia.',
    data_envio: '2026-02-20T09:10:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Leve',
    nivel_escalada: 'Baixa',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Professor/Funcionário',
    turma_envolvida: '3º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Timidez excessiva', 'Medo de falar em público'],
    medidas_protecao: ['Contrato didático sobre respeito mútuo em sala'],
    acoes_mediacao: [
      { id: 'ac-7', data_hora: '2026-02-21T08:00:00Z', autor: 'Professor Titular', tipo: 'sessao_mediacao', descricao: 'Roda de conversa sobre comunicação não-violenta.' }
    ]
  },
  {
    id: 'diag-007',
    protocolo: 'AM-2026-07',
    tipo_violencia: 'Cyberbullying',
    local_escola: 'Redes Sociais',
    descricao: 'Conta anônima no Instagram publicando fofocas e ataques a estudantes do 1º ano.',
    data_envio: '2026-02-24T21:00:00Z',
    status: 'Acolhido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Crítica',
    frequencia: 'Quase todos os dias',
    turno: 'Integral',
    papel_denunciante: 'Família',
    turma_envolvida: '1º Ano B',
    is_sos: true,
    etapa_mediacao: 'monitoramento',
    impactos_identificados: ['Ansiedade generalizada', 'Evasão temporária'],
    medidas_protecao: ['Denúncia formal à plataforma e apoio da CREDE 12'],
    acoes_mediacao: [
      { id: 'ac-8', data_hora: '2026-02-25T14:00:00Z', autor: 'Gestão Escolar', tipo: 'oficio_orgaos', descricao: 'Ofício de comunicação formal à ouvidoria e órgãos protetivos.' }
    ]
  },
  {
    id: 'diag-008',
    protocolo: 'AM-2026-08',
    tipo_violencia: 'Verbal',
    local_escola: 'Banheiro',
    descricao: 'Comentários preconceituosos de cunho racista no espelho do banheiro masculino.',
    data_envio: '2026-02-26T15:30:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Alta',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '2º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Indignação e abalo emocional'],
    medidas_protecao: ['Campanha institucional de Educação Antirracista na escola'],
    acoes_mediacao: [
      { id: 'ac-9', data_hora: '2026-02-27T10:00:00Z', autor: 'Coordenação Pedagógica', tipo: 'sessao_mediacao', descricao: 'Assembleia com líderes de turma sobre dignidade humana.' }
    ]
  },
  {
    id: 'diag-009',
    protocolo: 'AM-2026-09',
    tipo_violencia: 'Psicológica',
    local_escola: 'Pátio/Recreio',
    descricao: 'Ameaças veladas de que "vai ter troco na saída" após discordância esportiva.',
    data_envio: '2026-03-01T12:50:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '3º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Medo do término do turno escolar'],
    medidas_protecao: ['Mediação esportiva e pacto de fair-play'],
    acoes_mediacao: [
      { id: 'ac-10', data_hora: '2026-03-02T13:00:00Z', autor: 'Prof. de Educação Física', tipo: 'sessao_mediacao', descricao: 'Diálogo entre capitães de time e superação do litígio.' }
    ]
  },
  {
    id: 'diag-010',
    protocolo: 'AM-2026-10',
    tipo_violencia: 'Física',
    local_escola: 'Entorno da Escola',
    descricao: 'Rodeio e intimidação na esquina da escola por estudantes de turmas mais velhas.',
    data_envio: '2026-03-03T17:10:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Alta',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Amigo/Colega',
    turma_envolvida: '1º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Medo no percurso de ida e volta'],
    medidas_protecao: ['Presença de ronda escolar preventiva no portão nos horários de pico'],
    acoes_mediacao: [
      { id: 'ac-11', data_hora: '2026-03-04T08:30:00Z', autor: 'Gestão Escolar', tipo: 'contato_familia', descricao: 'Reunião preventiva com as famílias e lideranças comunitárias.' }
    ]
  },
  {
    id: 'diag-011',
    protocolo: 'AM-2026-11',
    tipo_violencia: 'Verbal',
    local_escola: 'Transporte Escolar',
    descricao: 'Zombarias durante todo o trajeto de ônibus sobre sotaque e origem rural.',
    data_envio: '2026-03-04T07:15:00Z',
    status: 'Acolhido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Quase todos os dias',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '1º Ano B',
    etapa_mediacao: 'sessao_dialogo',
    impactos_identificados: ['Desânimo em frequentar as aulas em tempo integral'],
    medidas_protecao: ['Intervenção com os monitores do transporte escolar'],
    acoes_mediacao: [
      { id: 'ac-12', data_hora: '2026-03-05T09:00:00Z', autor: 'Coordenação de Transporte', tipo: 'escuta_ativa', descricao: 'Diálogo com os alunos da rota rural.' }
    ]
  },
  {
    id: 'diag-012',
    protocolo: 'AM-2026-12',
    tipo_violencia: 'Psicológica',
    local_escola: 'Sala de Aula',
    descricao: 'Esconderam mochila e estojo da vítima repetidas vezes na troca de professores.',
    data_envio: '2026-03-06T11:20:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Há semanas',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '2º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Perda de tempo pedagógico', 'Sensação de impotência'],
    medidas_protecao: ['Círculo restaurativo em sala com devolução e retratação'],
    acoes_mediacao: [
      { id: 'ac-13', data_hora: '2026-03-07T14:00:00Z', autor: 'Professor Diretor de Turma', tipo: 'sessao_mediacao', descricao: 'Acordo pedagógico sobre respeito aos pertences alheios.' }
    ]
  },
  {
    id: 'diag-013',
    protocolo: 'AM-2026-13',
    tipo_violencia: 'Cyberbullying',
    local_escola: 'Redes Sociais',
    descricao: 'Divulgação não consentida de foto tirada no refeitório com legenda maldosa.',
    data_envio: '2026-03-07T13:40:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Alta',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '2º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Vergonha de almoçar no refeitório'],
    medidas_protecao: ['Apagamento imediato da postagem e termo de retratação'],
    acoes_mediacao: [
      { id: 'ac-14', data_hora: '2026-03-08T10:00:00Z', autor: 'Comissão de Mediação', tipo: 'sessao_mediacao', descricao: 'Sessão restaurativa com mediação de pares.' }
    ]
  },
  {
    id: 'diag-014',
    protocolo: 'AM-2026-14',
    tipo_violencia: 'Verbal',
    local_escola: 'Pátio/Recreio',
    descricao: 'Xingamentos reiterados durante partida de futsal no intervalo esportivo.',
    data_envio: '2026-03-09T12:30:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Leve',
    nivel_escalada: 'Baixa',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '3º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Desistência de participar de atividades esportivas'],
    medidas_protecao: ['Acordo de convivência na quadra poliesportiva'],
    acoes_mediacao: [
      { id: 'ac-15', data_hora: '2026-03-10T11:00:00Z', autor: 'Coordenação', tipo: 'sessao_mediacao', descricao: 'Assinatura de compromisso de respeito mútuo.' }
    ]
  },
  {
    id: 'diag-015',
    protocolo: 'AM-2026-15',
    tipo_violencia: 'Social',
    local_escola: 'Sala de Aula',
    descricao: 'Colegas combinam de deixar um estudante sozinho em todos os projetos bimestrais.',
    data_envio: '2026-03-10T14:50:00Z',
    status: 'Acolhido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Há meses',
    turno: 'Integral',
    papel_denunciante: 'Professor/Funcionário',
    turma_envolvida: '1º Ano A',
    etapa_mediacao: 'sessao_dialogo',
    impactos_identificados: ['Isolamento social agudo', 'Baixa autoestima'],
    medidas_protecao: ['Dinâmica de integração guiada pelo professor orientador'],
    acoes_mediacao: [
      { id: 'ac-16', data_hora: '2026-03-11T09:30:00Z', autor: 'Professor Orientador', tipo: 'escuta_ativa', descricao: 'Atendimento socioemocional individual.' }
    ]
  },
  {
    id: 'diag-016',
    protocolo: 'AM-2026-16',
    tipo_violencia: 'Física',
    local_escola: 'Banheiro',
    descricao: 'Puxões de casaco e ameaça de agressão no banheiro durante o horário de troca de turno.',
    data_envio: '2026-03-11T16:40:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Crítica',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '2º Ano A',
    is_sos: true,
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Pânico de utilizar banheiros escolares'],
    medidas_protecao: ['Supervisão reforçada nos sanitários e convocação das famílias'],
    acoes_mediacao: [
      { id: 'ac-17', data_hora: '2026-03-12T08:00:00Z', autor: 'Direção Geral', tipo: 'contato_familia', descricao: 'Pactuação com pais e plano individualizado de conduta.' }
    ]
  },
  {
    id: 'diag-017',
    protocolo: 'AM-2026-17',
    tipo_violencia: 'Cyberbullying',
    local_escola: 'Redes Sociais',
    descricao: 'Criação de meme depreciativo sobre características físicas postado no TikTok.',
    data_envio: '2026-03-12T20:15:00Z',
    status: 'Em Análise',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Alta',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Amigo/Colega',
    turma_envolvida: '1º Ano B',
    etapa_mediacao: 'escuta_inicial',
    impactos_identificados: ['Choro copioso', 'Vergonha social'],
    medidas_protecao: ['Acolhimento da vítima e notificação para retirada do conteúdo'],
    acoes_mediacao: [
      { id: 'ac-18', data_hora: '2026-03-13T09:00:00Z', autor: 'Comissão de Paz', tipo: 'escuta_ativa', descricao: 'Triagem preliminar e coleta de evidências.' }
    ]
  },
  {
    id: 'diag-018',
    protocolo: 'AM-2026-18',
    tipo_violencia: 'Verbal',
    local_escola: 'Corredor/Escada',
    descricao: 'Comentários misóginos e desrespeitosos dirigidos a alunas ao descerem as escadas.',
    data_envio: '2026-03-13T11:45:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Alta',
    frequencia: 'Quase todos os dias',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '3º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Constrangimento e sensação de insegurança'],
    medidas_protecao: ['Oficina sobre respeito de gênero e Lei Maria da Penha na escola'],
    acoes_mediacao: [
      { id: 'ac-19', data_hora: '2026-03-14T10:00:00Z', autor: 'Coordenação Pedagógica', tipo: 'sessao_mediacao', descricao: 'Diálogo formativo com a turma e lideranças.' }
    ]
  },
  {
    id: 'diag-019',
    protocolo: 'AM-2026-19',
    tipo_violencia: 'Psicológica',
    local_escola: 'Sala de Aula',
    descricao: 'Rir apontando para a carteira de aluno autista durante momentos de crise sensorial.',
    data_envio: '2026-03-14T14:10:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Alta',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Professor/Funcionário',
    turma_envolvida: '1º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Desregulação sensorial e sofrimento psíquico'],
    medidas_protecao: ['Projeto de Conscientização sobre Neurodiversidade e Inclusão'],
    acoes_mediacao: [
      { id: 'ac-20', data_hora: '2026-03-15T13:00:00Z', autor: 'Equipe de AEE / Inclusão', tipo: 'sessao_mediacao', descricao: 'Sensibilização da turma sobre respeito à diversidade.' }
    ]
  },
  {
    id: 'diag-020',
    protocolo: 'AM-2026-20',
    tipo_violencia: 'Verbal',
    local_escola: 'Pátio/Recreio',
    descricao: 'Zombaria sobre roupas usadas por estudante bolsista no dia a dia da escola integral.',
    data_envio: '2026-03-15T12:15:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Leve',
    nivel_escalada: 'Baixa',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '2º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Timidez e vergonha econômica'],
    medidas_protecao: ['Acolhimento socioemocional e mediação reflexiva'],
    acoes_mediacao: [
      { id: 'ac-21', data_hora: '2026-03-16T11:00:00Z', autor: 'Orientador Pedagógico', tipo: 'escuta_ativa', descricao: 'Conversa individual com os alunos envolvidos.' }
    ]
  },
  {
    id: 'diag-021',
    protocolo: 'AM-2026-21',
    tipo_violencia: 'Cyberbullying',
    local_escola: 'Redes Sociais',
    descricao: 'Divulgação de montagem falsa em grupo de WhatsApp da turma simulando ofensas.',
    data_envio: '2026-03-16T18:30:00Z',
    status: 'Acolhido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Alta',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '2º Ano A',
    etapa_mediacao: 'pre_mediacao',
    impactos_identificados: ['Angústia e medo de represálias'],
    medidas_protecao: ['Diálogo prévio com as famílias e termo de conduta'],
    acoes_mediacao: [
      { id: 'ac-22', data_hora: '2026-03-17T10:00:00Z', autor: 'Comissão de Paz', tipo: 'escuta_ativa', descricao: 'Acolhimento da vítima e verificação dos prints.' }
    ]
  },
  {
    id: 'diag-022',
    protocolo: 'AM-2026-22',
    tipo_violencia: 'Social',
    local_escola: 'Pátio/Recreio',
    descricao: 'Boicote sistemático à mesa de almoço de estudantes novatos no refeitório.',
    data_envio: '2026-03-17T12:05:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Leve',
    nivel_escalada: 'Baixa',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Amigo/Colega',
    turma_envolvida: '1º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Dificuldade de adaptação ao modelo integral'],
    medidas_protecao: ['Mesas colaborativas rotativas e tutoria de veteranos'],
    acoes_mediacao: [
      { id: 'ac-23', data_hora: '2026-03-18T13:00:00Z', autor: 'Grêmio Estudantil', tipo: 'sessao_mediacao', descricao: 'Círculo de amizade entre veteranos e calouros.' }
    ]
  },
  {
    id: 'diag-023',
    protocolo: 'AM-2026-23',
    tipo_violencia: 'Verbal',
    local_escola: 'Sala de Aula',
    descricao: 'Imitações pejorativas da dicção de colega durante leitura de texto em voz alta.',
    data_envio: '2026-03-18T10:20:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Há semanas',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '1º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Recusa em ler ou participar das aulas'],
    medidas_protecao: ['Contrato de convivência e suporte fonoaudiológico/pedagógico'],
    acoes_mediacao: [
      { id: 'ac-24', data_hora: '2026-03-19T08:30:00Z', autor: 'Prof. de Língua Portuguesa', tipo: 'sessao_mediacao', descricao: 'Roda de empatia e escuta na sala de aula.' }
    ]
  },
  {
    id: 'diag-024',
    protocolo: 'AM-2026-24',
    tipo_violencia: 'Psicológica',
    local_escola: 'Corredor/Escada',
    descricao: 'Perseguição silenciosa mantendo distância fixa para intimidar estudante.',
    data_envio: '2026-03-19T15:10:00Z',
    status: 'Acolhido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Quase todos os dias',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '2º Ano B',
    etapa_mediacao: 'sessao_dialogo',
    impactos_identificados: ['Sensação constante de perigo e vigilância'],
    medidas_protecao: ['Acompanhamento de rotas e intervenção com a turma'],
    acoes_mediacao: [
      { id: 'ac-25', data_hora: '2026-03-20T11:00:00Z', autor: 'Coordenação', tipo: 'escuta_ativa', descricao: 'Oitiva das partes em horários separados.' }
    ]
  },
  {
    id: 'diag-025',
    protocolo: 'AM-2026-25',
    tipo_violencia: 'Física',
    local_escola: 'Entorno da Escola',
    descricao: 'Arremesso intencional de pedras pequenas em direção a estudante no portão.',
    data_envio: '2026-03-20T17:25:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Crítica',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '3º Ano A',
    is_sos: true,
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Risco de lesão física e pânico'],
    medidas_protecao: ['Presença de servidores na saída e chamada dos responsáveis'],
    acoes_mediacao: [
      { id: 'ac-26', data_hora: '2026-03-21T09:00:00Z', autor: 'Direção Geral', tipo: 'contato_familia', descricao: 'Reunião solene com responsáveis e termo de compromisso.' }
    ]
  },
  {
    id: 'diag-026',
    protocolo: 'AM-2026-26',
    tipo_violencia: 'Verbal',
    local_escola: 'Transporte Escolar',
    descricao: 'Chacota contínua com músicas ofensivas adaptadas citando o nome da vítima no ônibus.',
    data_envio: '2026-03-21T07:20:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Quase todos os dias',
    turno: 'Integral',
    papel_denunciante: 'Amigo/Colega',
    turma_envolvida: '2º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Choro durante a viagem e estresse pré-aula'],
    medidas_protecao: ['Acordo firmado com o motorista e fiscalização da rota'],
    acoes_mediacao: [
      { id: 'ac-27', data_hora: '2026-03-22T10:00:00Z', autor: 'Coordenação de Transporte', tipo: 'sessao_mediacao', descricao: 'Mediação de convivência na rota escolar.' }
    ]
  },
  {
    id: 'diag-027',
    protocolo: 'AM-2026-27',
    tipo_violencia: 'Cyberbullying',
    local_escola: 'Redes Sociais',
    descricao: 'Votação em rede social de enquete depreciativa "quem é o(a) mais esquisito(a)".',
    data_envio: '2026-03-22T21:40:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Alta',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '1º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Humilhação pública coletiva'],
    medidas_protecao: ['Encerramento imediato da enquete e retratação pública no app'],
    acoes_mediacao: [
      { id: 'ac-28', data_hora: '2026-03-23T08:00:00Z', autor: 'Gestão Escolar', tipo: 'sessao_mediacao', descricao: 'Intervenção coletiva sobre responsabilidade digital.' }
    ]
  },
  {
    id: 'diag-028',
    protocolo: 'AM-2026-28',
    tipo_violencia: 'Psicológica',
    local_escola: 'Pátio/Recreio',
    descricao: 'Ameaça de espalhar boatos se a vítima não ceder seu lanche da merenda.',
    data_envio: '2026-03-23T12:40:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Alta',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '1º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Privação alimentar no recreio e medo'],
    medidas_protecao: ['Acompanhamento de inspetores na área da cantina'],
    acoes_mediacao: [
      { id: 'ac-29', data_hora: '2026-03-24T14:00:00Z', autor: 'Coordenação', tipo: 'escuta_ativa', descricao: 'Restauração do dano e compromisso firmado.' }
    ]
  },
  {
    id: 'diag-029',
    protocolo: 'AM-2026-29',
    tipo_violencia: 'Verbal',
    local_escola: 'Sala de Aula',
    descricao: 'Xingamentos baixos sempre que a professora vira para o quadro negro.',
    data_envio: '2026-03-24T09:50:00Z',
    status: 'Acolhido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Quase todos os dias',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '2º Ano B',
    etapa_mediacao: 'sessao_dialogo',
    impactos_identificados: ['Dificuldade extrema de concentração nos estudos'],
    medidas_protecao: ['Mudança de assento e pacto de sala com o regente'],
    acoes_mediacao: [
      { id: 'ac-30', data_hora: '2026-03-25T11:00:00Z', autor: 'Prof. Regente', tipo: 'escuta_ativa', descricao: 'Escuta dos dois lados e pacto de respeito.' }
    ]
  },
  {
    id: 'diag-030',
    protocolo: 'AM-2026-30',
    tipo_violencia: 'Social',
    local_escola: 'Sala de Aula',
    descricao: 'Grupo combina de ignorar propositalmente respostas da vítima durante debates em aula.',
    data_envio: '2026-03-25T14:30:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Leve',
    nivel_escalada: 'Baixa',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Professor/Funcionário',
    turma_envolvida: '3º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Sentimento de invisibilidade acadêmica'],
    medidas_protecao: ['Dinâmica de rotação de liderança no debate pedagógico'],
    acoes_mediacao: [
      { id: 'ac-31', data_hora: '2026-03-26T10:00:00Z', autor: 'Professor de Filosofia', tipo: 'sessao_mediacao', descricao: 'Roda de diálogo socrático sobre empatia e respeito.' }
    ]
  },
  {
    id: 'diag-031',
    protocolo: 'AM-2026-31',
    tipo_violencia: 'Física',
    local_escola: 'Pátio/Recreio',
    descricao: 'Rasteira proposital no intervalo provocando queda e torção leve no tornozelo.',
    data_envio: '2026-03-26T12:20:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Crítica',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '1º Ano A',
    is_sos: true,
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Lesão física leve e humilhação perante os colegas'],
    medidas_protecao: ['Atendimento médico imediato e convocação dos pais para círculo'],
    acoes_mediacao: [
      { id: 'ac-32', data_hora: '2026-03-27T08:00:00Z', autor: 'Direção e Saúde Escolar', tipo: 'contato_familia', descricao: 'Atendimento integrado e responsabilização restaurativa.' }
    ]
  },
  {
    id: 'diag-032',
    protocolo: 'AM-2026-32',
    tipo_violencia: 'Cyberbullying',
    local_escola: 'Redes Sociais',
    descricao: 'Chantagem com print descontextualizado de conversa privada exigindo tarefas prontas.',
    data_envio: '2026-03-27T19:10:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Grave',
    nivel_escalada: 'Alta',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '2º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Pânico e noites sem dormir'],
    medidas_protecao: ['Intervenção com os responsáveis e exclusão das mídias'],
    acoes_mediacao: [
      { id: 'ac-33', data_hora: '2026-03-28T09:30:00Z', autor: 'Comissão de Paz', tipo: 'sessao_mediacao', descricao: 'Acordo formal com destruição do material chantagista.' }
    ]
  },
  {
    id: 'diag-033',
    protocolo: 'AM-2026-33',
    tipo_violencia: 'Verbal',
    local_escola: 'Banheiro',
    descricao: 'Ofensas gravadas com caneta permanente no azulejo direcionadas a estudante.',
    data_envio: '2026-03-28T16:00:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '1º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Humilhação no espaço coletivo'],
    medidas_protecao: ['Pintura/limpeza imediata e conversa restaurativa com a turma'],
    acoes_mediacao: [
      { id: 'ac-34', data_hora: '2026-03-29T10:00:00Z', autor: 'Gestão Escolar', tipo: 'sessao_mediacao', descricao: 'Ato de reparação simbólica e limpeza coletiva.' }
    ]
  },
  {
    id: 'diag-034',
    protocolo: 'AM-2026-34',
    tipo_violencia: 'Psicológica',
    local_escola: 'Sala de Aula',
    descricao: 'Ficar encarando fixamente em silêncio com gestos ameaçadores para amedrontar.',
    data_envio: '2026-03-29T11:15:00Z',
    status: 'Em Análise',
    nivel_gravidade: 'Leve',
    nivel_escalada: 'Baixa',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '3º Ano A',
    etapa_mediacao: 'escuta_inicial',
    impactos_identificados: ['Insegurança durante a aula'],
    medidas_protecao: ['Acolhimento da queixa e acompanhamento na sala'],
    acoes_mediacao: [
      { id: 'ac-35', data_hora: '2026-03-30T10:00:00Z', autor: 'Comissão de Mediação', tipo: 'escuta_ativa', descricao: 'Triagem e escuta acolhedora.' }
    ]
  },
  {
    id: 'diag-035',
    protocolo: 'AM-2026-35',
    tipo_violencia: 'Verbal',
    local_escola: 'Pátio/Recreio',
    descricao: 'Gritos provocativos ao término do almoço sobre a opção religiosa da família.',
    data_envio: '2026-03-30T12:50:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Alta',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Testemunha',
    turma_envolvida: '2º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Ofensa à fé e constrangimento'],
    medidas_protecao: ['Ação interdisciplinar sobre Liberdade Religiosa e Diversidade'],
    acoes_mediacao: [
      { id: 'ac-36', data_hora: '2026-03-31T14:00:00Z', autor: 'Prof. de História', tipo: 'sessao_mediacao', descricao: 'Diálogo inter-religioso e pacto de respeito mútuo.' }
    ]
  },
  {
    id: 'diag-036',
    protocolo: 'AM-2026-36',
    tipo_violencia: 'Cyberbullying',
    local_escola: 'Redes Sociais',
    descricao: 'Áudio vazado imitando colega com efeitos cômicos para viralizar entre os alunos.',
    data_envio: '2026-03-31T20:30:00Z',
    status: 'Acolhido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Alta',
    frequencia: 'Primeira vez',
    turno: 'Integral',
    papel_denunciante: 'Amigo/Colega',
    turma_envolvida: '1º Ano A',
    etapa_mediacao: 'sessao_dialogo',
    impactos_identificados: ['Desejo de faltar às aulas da semana'],
    medidas_protecao: ['Orientações sobre uso de mídias e proteção de imagem'],
    acoes_mediacao: [
      { id: 'ac-37', data_hora: '2026-04-01T09:00:00Z', autor: 'Coordenação', tipo: 'escuta_ativa', descricao: 'Reunião com os estudantes criadores do áudio.' }
    ]
  },
  {
    id: 'diag-037',
    protocolo: 'AM-2026-37',
    tipo_violencia: 'Social',
    local_escola: 'Pátio/Recreio',
    descricao: 'Não permitir que o colega participe de nenhuma brincadeira ou jogo de tabuleiro.',
    data_envio: '2026-04-01T12:20:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Leve',
    nivel_escalada: 'Baixa',
    frequencia: 'Algumas vezes',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '2º Ano A',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Isolamento no intervalo'],
    medidas_protecao: ['Criação do Clube de Jogos Cooperativos no pátio'],
    acoes_mediacao: [
      { id: 'ac-38', data_hora: '2026-04-02T13:00:00Z', autor: 'Grêmio Estudantil', tipo: 'sessao_mediacao', descricao: 'Inclusão em atividades de recreio dirigido.' }
    ]
  },
  {
    id: 'diag-038',
    protocolo: 'AM-2026-38',
    tipo_violencia: 'Física',
    local_escola: 'Corredor/Escada',
    descricao: 'Pisar intencionalmente nos calcanhares da vítima ao caminhar pela escada.',
    data_envio: '2026-04-02T16:10:00Z',
    status: 'Resolvido',
    nivel_gravidade: 'Recorrente',
    nivel_escalada: 'Média',
    frequencia: 'Há semanas',
    turno: 'Integral',
    papel_denunciante: 'Vítima',
    turma_envolvida: '1º Ano B',
    etapa_mediacao: 'pacificado',
    impactos_identificados: ['Risco de queda grave na escada'],
    medidas_protecao: ['Campanha de circulação segura e pacto restaurativo'],
    acoes_mediacao: [
      { id: 'ac-39', data_hora: '2026-04-03T11:00:00Z', autor: 'Coordenação de Pátio', tipo: 'sessao_mediacao', descricao: 'Acordo e retratação entre os alunos.' }
    ]
  }
];
