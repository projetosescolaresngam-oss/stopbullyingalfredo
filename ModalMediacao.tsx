import React, { useState, useEffect, useRef } from 'react';
import { 
  Denuncia, 
  ComplaintStatus, 
  MediacaoAction, 
  ProtocolChatMessage,
  EtapaMediacao,
  TermoAcordoConvivencia,
  CheckinAcompanhamento,
  FeedbackEscola,
  FeedbackStatusResolucao
} from '../../types';
import { 
  updateDenunciaStatus, 
  toggleDenunciaSOS, 
  addMediacaoAction, 
  updateDenunciaMediacao, 
  salvarTermoAcordo, 
  addCheckinAcompanhamento,
  salvarFeedbackEscola,
  getProtocolMessages, 
  sendProtocolMessage,
  fetchProtocolMessagesFromCloud,
  deleteDenuncia,
  deleteDenunciaAsync 
} from '../../services/storageService';
import { playBreathTone } from '../../services/audioSynthesizer';
import { printElementById } from '../../services/printService';
import { getEscolaAtiva } from '../../services/schoolService';

import { DocumentoOficialModal } from './DocumentoOficialModal';
import { ModalEnvioEmail, ModalFotoCompleta } from './GestaoModals';
import { useAutoScrollIntoView } from '../../hooks/useAutoScrollIntoView';
import { 
  HeartHandshake, 
  X, 
  Printer, 
  Check, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Activity, 
  FileText, 
  MessageSquare, 
  ShieldCheck, 
  Send, 
  Paperclip, 
  Award, 
  AlertTriangle, 
  BookOpen, 
  Users, 
  Scale, 
  Sparkles, 
  CheckSquare, 
  HelpCircle, 
  Calendar, 
  ArrowRight,
  UserCheck,
  Shield,
  FileCheck,
  Compass,
  Copy,
  ChevronRight,
  ShieldAlert,
  GraduationCap,
  ZoomIn,
  Image as ImageIcon,
  Mail,
  Trash2,
  Megaphone,
  CheckCheck,
  MessageCircle,
  Building2
} from 'lucide-react';

interface ModalMediacaoProps {
  caso: Denuncia;
  onClose: () => void;
  onUpdate: () => void;
  showToast: (msg: string) => void;
  onDelete?: (denuncia: Denuncia) => void;
}

// 6 Etapas do Fluxo de Mediação Escolar Restaurativa (SEDUC/CE & Lei 13.185/15)
const ETAPAS_MEDICAO: Array<{
  key: EtapaMediacao;
  label: string;
  sub: string;
  fase: number;
}> = [
  { key: 'escuta_inicial', label: '1. Acolhimento & Escuta', sub: 'Espaço seguro individual', fase: 1 },
  { key: 'pre_mediacao', label: '2. Pré-Mediação', sub: 'Ouvir partes em separado', fase: 2 },
  { key: 'sessao_dialogo', label: '3. Círculo de Diálogo', sub: 'Comunicação Não-Violenta', fase: 3 },
  { key: 'acordo_firmado', label: '4. Acordo de Convivência', sub: 'Pactuação formal mútua', fase: 4 },
  { key: 'monitoramento', label: '5. Monitoramento', sub: 'Check-ins 7, 15 e 30 dias', fase: 5 },
  { key: 'pacificado', label: '6. Caso Pacificado', sub: 'Relações restauradas', fase: 6 }
];

// Perguntas Restaurativas Guiadas para a Coordenação/Mediador
const PERGUNTAS_RESTAURATIVAS = {
  vitima: [
    { p: 'O que aconteceu e como você se sentiu naquele momento?', dica: 'Deixe o estudante desabafar sem interrupções ou julgamentos.' },
    { p: 'Qual tem sido a parte mais difícil para você conviver com essa situação?', dica: 'Identifique se há medo de transitar no pátio, fobia escolar ou isolamento.' },
    { p: 'O que você precisa para se sentir seguro(a) e acolhido(a) na escola novamente?', dica: 'Foco na restauração da segurança e da dignidade.' }
  ],
  ofensor: [
    { p: 'O que você estava pensando ou sentindo quando isso aconteceu?', dica: 'Acolha o ser humano sem validar a agressão ou atitude prejudicial.' },
    { p: 'Quem você acha que foi impactado pelo que aconteceu e de que forma?', dica: 'Estimule a reflexão empática e a consciência das consequências.' },
    { p: 'O que você pode fazer de concreto hoje para consertar o dano causado?', dica: 'Foco em reparação ativa e voluntária, não em castigo punitivo.' }
  ],
  coletivo: [
    { p: 'Que regras de respeito nós podemos pactuar nesta turma para que ninguém mais sofra isso?', dica: 'Construção coletiva de combinados de não-agressão.' }
  ]
};

// Cláusulas pré-formatadas para o Termo de Convivência
const CLAUSULAS_PADRAO = [
  'Compromisso irrevogável de cessar imediatamente qualquer ato de deboche, apelido vexatório ou intimidação.',
  'Respeito mútuo à integridade física, psicológica e à reputação de todos os estudantes no ambiente escolar.',
  'Compromisso de não publicar, não curtir e remover qualquer conteúdo depreciativo em grupos de WhatsApp ou redes sociais.',
  'Em caso de divergência ou mal-entendido, procurar imediatamente a coordenação ou a mediação antes de qualquer reação impulsiva.',
  'Cumprimento do plano de convivência pacífica estabelecido pela comissão da EEMTI Alfredo Machado.'
];

// Medidas de Proteção Escolar Imediata
const OPCOES_PROTECAO = [
  'Mudança discricionária e sutil de assento/fileira na sala de aula',
  'Acompanhamento especial da equipe de inspetores no pátio e intervalos',
  'Orientação sigilosa aos professores da turma para monitoramento preventivo',
  'Atendimento e acolhimento pelo serviço de psicologia / assistência social (Lei 13.935/19)',
  'Contato formativo e alinhamento presencial com os pais/responsáveis',
  'Encaminhamento confidencial para a rede socioassistencial (CRAS / CREAS / Tutelar)'
];

// Modelos rápidos de texto para o histórico
const MODELOS_RAPIDOS_MEDICAO = [
  {
    titulo: 'Escuta Ativa Individual',
    categoria: 'Escuta Ativa' as MediacaoAction['categoria'],
    texto: 'Realizado atendimento e escuta ativa individual com o(a) estudante na sala de acolhimento pedagógico, assegurando sigilo absoluto e suporte emocional.'
  },
  {
    titulo: 'Diálogo com os Pais',
    categoria: 'Conversa com Responsáveis' as MediacaoAction['categoria'],
    texto: 'Contato e alinhamento presencial com os pais/responsáveis para pactuação de parceria preventiva e acompanhamento familiar do estudante.'
  },
  {
    titulo: 'Acordo de Convivência',
    categoria: 'Acordo de Convivência' as MediacaoAction['categoria'],
    texto: 'Formalizado termo de mediação de conflitos e acordo mútuo de respeito e não-agressão com as partes envolvidas, acompanhado pela comissão escolar.'
  },
  {
    titulo: 'Intervenção em Turma',
    categoria: 'Orientação em Sala' as MediacaoAction['categoria'],
    texto: 'Desenvolvida roda de conversa temática na turma sobre empatia, comunicação não-violenta e combate ao bullying escolar (Lei Federal nº 13.185/15).'
  },
  {
    titulo: 'Rede de Proteção (CRAS)',
    categoria: 'Encaminhamento Externo' as MediacaoAction['categoria'],
    texto: 'Encaminhado relatório confidencial para a rede de proteção socioassistencial (CRAS / Conselho Tutelar) para acompanhamento complementar.'
  }
];

// Modelos rápidos de Feedback Oficial para o Estudante Denunciante
const TEMPLATES_FEEDBACK_ESCOLA = [
  {
    id: 'acolhimento',
    titulo: 'Acolhimento Institucional e Garantia de Sigilo',
    status: 'acolhido_em_analise' as FeedbackStatusResolucao,
    rotulo: 'Acolhimento Ativo',
    mensagem: 'Olá! A Comissão de Mediação e Acolhimento Pedagógico da EEMTI Alfredo Machado confirma o recebimento do seu relato sob sigilo absoluto. Sua iniciativa é fundamental para mantermos nossa escola segura. Já iniciamos a triagem pedagógica preliminar e reforçamos o olhar atento dos educadores nos ambientes mencionados. Você não está sozinho(a)!',
    medidas: [
      'Escuta atenta e sigilosa da equipe pedagógica',
      'Reforço de supervisão nos intervalos e corredores',
      'Abertura de canal seguro de diálogo'
    ],
    orientacao: 'Fique tranquilo(a). Sua identidade é 100% protegida. Se precisar conversar mais ou relatar qualquer novidade, use o nosso chat confidencial abaixo ou procure a coordenação.'
  },
  {
    id: 'medidas_pedagogicas',
    titulo: 'Intervenção Restaurativa e Medidas Preventivas Aplicadas',
    status: 'medidas_adotadas' as FeedbackStatusResolucao,
    rotulo: 'Medidas Pedagógicas Adotadas',
    mensagem: 'A equipe pedagógica realizou intervenções diretas e rodas de conversa orientadas sobre respeito, empatia e combate ao bullying com as turmas envolvidas. Foram estabelecidos combinados de não-agressão e orientações disciplinares preventivas com os estudantes e docentes.',
    medidas: [
      'Intervenção pedagógica em sala de aula e rodas restaurativas',
      'Pactuação formal de combinados de convivência',
      'Supervisão contínua da equipe docente nos espaços coletivos'
    ],
    orientacao: 'Continue focado(a) nos seus estudos com tranquilidade. Se notar qualquer atitude desconfortável, utilize imediatamente este protocolo ou acione o botão SOS.'
  },
  {
    id: 'pacificado',
    titulo: 'Caso Concluído com Acordo de Convivência e Pacificação',
    status: 'pacificado' as FeedbackStatusResolucao,
    rotulo: 'Caso Pacificado com Sucesso',
    mensagem: 'Temos a satisfação de informar que o processo de mediação escolar foi concluído com sucesso. Foi formalizado um Termo de Acordo de Convivência mútua, com compromissos irrevogáveis de respeito e cessação de qualquer hostilidade. Manteremos check-ins periódicos de acompanhamento.',
    medidas: [
      'Acordo de Convivência formalizado entre as partes',
      'Compromisso de respeito mútuo e não-agressão',
      'Monitoramento de 7, 15 e 30 dias pela coordenação'
    ],
    orientacao: 'Agradecemos sua confiança na escola. A Cultura de Paz se constrói com a participação de todos. Conte sempre com a nossa equipe!'
  },
  {
    id: 'rede_protecao',
    titulo: 'Encaminhamento à Rede de Proteção (Conselho Tutelar e CREAS)',
    status: 'encaminhado_rede' as FeedbackStatusResolucao,
    rotulo: 'Encaminhado ao Conselho Tutelar',
    mensagem: 'Devido à gravidade e recorrência das circunstâncias relatadas, este caso foi formalmente notificado e encaminhado à Rede de Proteção à Criança e ao Adolescente (Conselho Tutelar de Madalena e CREAS/CRAS) para acompanhamento socioassistencial integrado, com amparo no Estatuto da Criança e do Adolescente (ECA).',
    medidas: [
      'Notificação formal encaminhada ao Conselho Tutelar de Madalena',
      'Articulação institucional com a rede de apoio sociofamiliar',
      'Adoção de medidas protetivas escolares prioritárias'
    ],
    orientacao: 'Sua segurança e dignidade são prioridade absoluta da EEMTI Alfredo Machado. Seu anonimato foi rigorosamente resguardado perante todas as instâncias.'
  }
];

export const ModalMediacao: React.FC<ModalMediacaoProps> = ({ 
  caso, 
  onClose, 
  onUpdate,
  showToast,
  onDelete
}) => {
  // Aba ativa no modal
  const [tab, setTab] = useState<'fluxo' | 'feedback' | 'termo' | 'guia' | 'protecao' | 'chat' | 'relato'>('fluxo');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Estado da etapa restaurativa
  const etapaAtual = caso.etapa_mediacao || (caso.status === 'Resolvido' ? 'pacificado' : caso.status === 'Acolhido' ? 'sessao_dialogo' : 'escuta_inicial');
  const escaladaAtual = caso.nivel_escalada || 'Média';
  const medidasSelecionadas = caso.medidas_protecao || [];

  // Scroll automático suave e centralizado para o prontuário e submodais (executa uma única vez na abertura)
  const mediationCardRef = useAutoScrollIntoView({ active: true, delay: 40, retries: 0 });
  const confirmDeleteCardRef = useAutoScrollIntoView({ active: showConfirmDelete, delay: 40, retries: 0 });

  // Estado do formulário de providência rápida
  const [novaAcaoTexto, setNovaAcaoTexto] = useState('');
  const [novaAcaoCategoria, setNovaAcaoCategoria] = useState<MediacaoAction['categoria']>('Escuta Ativa');
  const [mediadorNome, setMediadorNome] = useState(() => `Coordenação Pedagógica (${getEscolaAtiva().nome})`);

  // Estado do Feedback Oficial ao Denunciante
  const [feedbackTitulo, setFeedbackTitulo] = useState(caso.feedback_escola?.titulo || 'Acolhimento Institucional e Providências Adotadas');
  const [feedbackMensagem, setFeedbackMensagem] = useState(caso.feedback_escola?.mensagem || '');
  const [feedbackAutor, setFeedbackAutor] = useState(
    caso.feedback_escola?.autor || `${getEscolaAtiva().comissao_mediacao_nome || 'Comissão de Mediação Escolar'} – ${getEscolaAtiva().nome}`
  );
  const [feedbackCargo, setFeedbackCargo] = useState(caso.feedback_escola?.cargo_autor || 'Coordenação Pedagógica / Direção');
  const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatusResolucao>(caso.feedback_escola?.status_resolucao || 'acolhido_em_analise');
  const [feedbackMedidas, setFeedbackMedidas] = useState<string[]>(caso.feedback_escola?.medidas_tomadas || [
    'Escuta acolhedora preliminar realizada pela coordenação',
    'Supervisão preventiva ampliada nos espaços comuns'
  ]);
  const [novaMedidaCustom, setNovaMedidaCustom] = useState('');
  const [feedbackOrientacao, setFeedbackOrientacao] = useState(caso.feedback_escola?.orientacao_ao_estudante || 'Sua identidade está integralmente resguardada sob sigilo absoluto. Se notar qualquer atitude suspeita, acione o SOS ou nos envie uma mensagem neste canal.');
  const [notificarChat, setNotificarChat] = useState(true);
  const [notificarConselhoTutelar, setNotificarConselhoTutelar] = useState(caso.feedback_escola?.notificado_ao_conselho_tutelar ?? true);
  const [notificarConselhoEscolar, setNotificarConselhoEscolar] = useState(caso.feedback_escola?.notificado_ao_conselho_escolar ?? true);
  const [isSavingFeedback, setIsSavingFeedback] = useState(false);

  // Estado do Termo de Acordo
  const [clausulasSelecionadas, setClausulasSelecionadas] = useState<string[]>(() => {
    return caso.termo_acordo?.compromissos || CLAUSULAS_PADRAO.slice(0, 3);
  });
  const [novaClausula, setNovaClausula] = useState('');
  const [reparacaoSimbolica, setReparacaoSimbolica] = useState(caso.termo_acordo?.reparacao_simbolica || '');
  const [termoStatus, setTermoStatus] = useState<'Em cumprimento' | 'Cumprido com sucesso' | 'Necessita revisão'>(
    caso.termo_acordo?.status || 'Em cumprimento'
  );

  // Estado de Check-in pós-mediação
  const [checkinDia, setCheckinDia] = useState<number>(7);
  const [checkinNotas, setCheckinNotas] = useState('');
  const [checkinStatusEstudante, setCheckinStatusEstudante] = useState<CheckinAcompanhamento['status_estudante']>('Seguro e Acolhido');

  // Estado do Modal de Foto Ampliada
  const [selectedFotoModal, setSelectedFotoModal] = useState<{ url: string; nome?: string; tipo?: string; tamanho?: string } | null>(null);

  // Estado do Chat
  const [chatMessages, setChatMessages] = useState<ProtocolChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Carregar mensagens do chat do protocolo com atualização em tempo real
  useEffect(() => {
    if (!caso.protocolo) return;

    const reloadMsgs = () => {
      const msgs = getProtocolMessages(caso.protocolo);
      setChatMessages((prev) => {
        if (prev.length === msgs.length) {
          if (msgs.length === 0) return prev;
          if (prev[prev.length - 1]?.id === msgs[msgs.length - 1]?.id && prev[0]?.id === msgs[0]?.id) {
            return prev;
          }
        }
        return msgs;
      });
    };

    reloadMsgs();
    fetchProtocolMessagesFromCloud(caso.protocolo).then((cloudMsgs) => {
      if (cloudMsgs && cloudMsgs.length > 0) {
        setChatMessages((prev) => {
          if (prev.length === cloudMsgs.length && prev[prev.length - 1]?.id === cloudMsgs[cloudMsgs.length - 1]?.id) {
            return prev;
          }
          return cloudMsgs;
        });
      }
    });

    const intervalId = setInterval(reloadMsgs, 2500);

    const handleChatUpdate = () => {
      reloadMsgs();
    };

    window.addEventListener('protocol_chat_updated', handleChatUpdate);
    window.addEventListener('storage', handleChatUpdate);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('protocol_chat_updated', handleChatUpdate);
      window.removeEventListener('storage', handleChatUpdate);
    };
  }, [caso.protocolo]);

  const playSfx = (type: 'success' | 'alert' | 'click') => {
    try {
      if (type === 'success') {
        playBreathTone(523, 50, true);
        setTimeout(() => playBreathTone(659, 80, true), 70);
      } else if (type === 'alert') {
        playBreathTone(440, 90, true);
      } else if (type === 'click') {
        playBreathTone(750, 25, true);
      }
    } catch {}
  };

  // Alterar status
  const handleUpdateStatus = (status: ComplaintStatus) => {
    playSfx('success');
    updateDenunciaStatus(caso.id, status);
    onUpdate();
    showToast(`Status atualizado para "${status}".`);
  };

  // Alternar SOS
  const handleToggleSOS = () => {
    playSfx('alert');
    toggleDenunciaSOS(caso.id);
    onUpdate();
    showToast(caso.is_sos ? 'Prioridade SOS desmarcada.' : '🚨 Marcado como PRIORIDADE MÁXIMA SOS!');
  };

  // Excluir denúncia definitivamente
  const handleExecuteDelete = async () => {
    if (onDelete) {
      onDelete(caso);
      onClose();
      return;
    }
    setIsDeleting(true);
    try {
      await deleteDenunciaAsync(caso.id);
      playSfx('alert');
      showToast(`Denúncia ${caso.protocolo} excluída definitivamente.`);
      onUpdate();
      onClose();
    } catch {
      showToast('Erro ao excluir a denúncia.');
    } finally {
      setIsDeleting(false);
      setShowConfirmDelete(false);
    }
  };

  // Mudar etapa do fluxo restaurativo
  const handleSetEtapa = (novaEtapa: EtapaMediacao) => {
    playSfx('click');
    let novoStatus: ComplaintStatus = caso.status;
    if (novaEtapa === 'pacificado') novoStatus = 'Resolvido';
    else if (novaEtapa !== 'escuta_inicial' && caso.status === 'Em Análise') novoStatus = 'Acolhido';

    updateDenunciaMediacao(caso.id, { 
      etapa_mediacao: novaEtapa,
      status: novoStatus
    });
    onUpdate();
    showToast(`Etapa avançada para "${ETAPAS_MEDICAO.find(e => e.key === novaEtapa)?.label}".`);
  };

  // Mudar nível de escalada
  const handleSetEscalada = (nivel: 'Baixa' | 'Média' | 'Alta' | 'Crítica') => {
    playSfx('click');
    updateDenunciaMediacao(caso.id, { nivel_escalada: nivel });
    onUpdate();
    showToast(`Nível de gravidade/escalada registrado como "${nivel}".`);
  };

  // Alternar medida de proteção no checklist
  const handleToggleMedida = (medida: string) => {
    playSfx('click');
    const atuais = caso.medidas_protecao || [];
    const novas = atuais.includes(medida)
      ? atuais.filter(m => m !== medida)
      : [...atuais, medida];

    updateDenunciaMediacao(caso.id, { medidas_protecao: novas });
    onUpdate();
  };

  // Salvar nova ação no histórico
  const handleAddAcao = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaAcaoTexto.trim()) return;
    playSfx('success');
    addMediacaoAction(
      caso.id,
      novaAcaoTexto.trim(),
      mediadorNome.trim() || 'Comissão de Mediação Escolar',
      novaAcaoCategoria
    );
    setNovaAcaoTexto('');
    onUpdate();
    showToast('Providência de mediação registrada com sucesso!');
  };

  // Salvar Termo de Acordo
  const handleSalvarTermo = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx('success');
    const termo: TermoAcordoConvivencia = {
      firmado_em: new Date().toISOString(),
      mediador: mediadorNome.trim() || 'Coordenação de Mediação Pedagógica',
      compromissos: clausulasSelecionadas,
      reparacao_simbolica: reparacaoSimbolica.trim() || undefined,
      status: termoStatus
    };
    salvarTermoAcordo(caso.id, termo);
    onUpdate();
    showToast('📜 Termo de Acordo & Convivência formalizado no sistema!');
  };

  // Registrar Check-in pós-mediação
  const handleAddCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkinNotas.trim()) return;
    playSfx('success');
    addCheckinAcompanhamento(caso.id, {
      dia: checkinDia,
      responsavel: mediadorNome.trim() || 'Equipe Pedagógica',
      status_estudante: checkinStatusEstudante,
      observacoes: checkinNotas.trim()
    });
    setCheckinNotas('');
    onUpdate();
    showToast(`Check-in de ${checkinDia} dias registrado!`);
  };

  // Aplicar modelo pré-formatado de feedback
  const handleApplyFeedbackTemplate = (tmplId: string) => {
    const tmpl = TEMPLATES_FEEDBACK_ESCOLA.find(t => t.id === tmplId);
    if (!tmpl) return;
    playSfx('click');
    setFeedbackTitulo(tmpl.titulo);
    setFeedbackStatus(tmpl.status);
    setFeedbackMensagem(tmpl.mensagem);
    setFeedbackMedidas([...tmpl.medidas]);
    setFeedbackOrientacao(tmpl.orientacao);
    showToast(`Modelo "${tmpl.rotulo}" aplicado ao formulário.`);
  };

  // Alternar medida na lista do feedback
  const handleToggleMedidaFeedback = (medida: string) => {
    playSfx('click');
    setFeedbackMedidas(prev => 
      prev.includes(medida) ? prev.filter(m => m !== medida) : [...prev, medida]
    );
  };

  // Adicionar medida customizada ao feedback
  const handleAddCustomMedida = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaMedidaCustom.trim()) return;
    playSfx('click');
    if (!feedbackMedidas.includes(novaMedidaCustom.trim())) {
      setFeedbackMedidas(prev => [...prev, novaMedidaCustom.trim()]);
    }
    setNovaMedidaCustom('');
  };

  // Salvar feedback e disponibilizar ao denunciante
  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackTitulo.trim() || !feedbackMensagem.trim()) {
      showToast('Preencha o título e o teor da mensagem de feedback.');
      return;
    }
    setIsSavingFeedback(true);
    playSfx('success');

    const statusRotuloMap: Record<FeedbackStatusResolucao, string> = {
      acolhido_em_analise: 'Acolhimento Ativo',
      medidas_adotadas: 'Medidas Pedagógicas Adotadas',
      pacificado: 'Caso Pacificado com Sucesso',
      encaminhado_rede: 'Encaminhado ao Conselho Tutelar'
    };

    salvarFeedbackEscola(caso.id, {
      titulo: feedbackTitulo.trim(),
      mensagem: feedbackMensagem.trim(),
      autor: feedbackAutor.trim() || 'Comissão de Mediação Escolar – EEMTI Alfredo Machado',
      cargo_autor: feedbackCargo.trim() || 'Coordenação Pedagógica / Direção',
      status_resolucao: feedbackStatus,
      status_rotulo: statusRotuloMap[feedbackStatus],
      medidas_tomadas: feedbackMedidas,
      orientacao_ao_estudante: feedbackOrientacao.trim(),
      notificado_ao_conselho_tutelar: notificarConselhoTutelar,
      notificado_ao_conselho_escolar: notificarConselhoEscolar
    }, notificarChat);

    setIsSavingFeedback(false);
    onUpdate();
    showToast('Feedback registrado e disponibilizado na tela do denunciante!');
  };

  // Enviar mensagem no chat da mediação
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    playSfx('click');
    const texto = chatInput.trim();
    setChatInput('');
    sendProtocolMessage(
      caso.protocolo,
      'coordenacao',
      texto,
      mediadorNome || 'Comissão de Mediação & Acolhimento (EEMTI Alfredo Machado)'
    );
    setChatMessages(getProtocolMessages(caso.protocolo));
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      
      <div ref={mediationCardRef} className="w-full max-w-5xl max-h-[96vh] rounded-3xl bg-[#090e1c] border border-indigo-500/40 shadow-2xl shadow-indigo-950/80 overflow-y-auto p-4 sm:p-7 space-y-6 relative">
        {/* Glow de fundo decorativo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* ========================================================================= */}
        {/* CABEÇALHO DO MODAL: IDENTIFICAÇÃO INSTITUCIONAL E AÇÕES RÁPIDAS           */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/10 text-indigo-300 text-[11px] font-black uppercase tracking-wider border border-indigo-500/30 shadow-sm">
                <Scale className="w-3.5 h-3.5 text-indigo-400" />
                Justiça Restaurativa & Mediação Escolar • EEMTI Alfredo Machado
              </span>
              {caso.is_sos && (
                <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-red-600/40 animate-pulse">
                  <Flame className="w-3.5 h-3.5" /> Prioridade SOS Ativa
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                Prontuário de Mediação
              </h2>

              <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-xl border border-white/15">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Protocolo</span>
                <span className="font-mono font-black text-indigo-300 text-sm">{caso.protocolo}</span>
                <button
                  type="button"
                  onClick={() => {
                    playSfx('click');
                    navigator.clipboard.writeText(caso.protocolo);
                    showToast(`Protocolo ${caso.protocolo} copiado com sucesso!`);
                  }}
                  className="ml-1 p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Copiar protocolo"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                {new Date(caso.data_envio).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => {
                playSfx('click');
                setShowEmailModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-500/40 transition-all cursor-pointer flex items-center gap-2 text-xs font-bold shadow-sm"
              title="Enviar esta denúncia por e-mail para Conselho Tutelar / Escola"
            >
              <Mail className="w-4 h-4 text-purple-300" />
              <span className="hidden sm:inline">Enviar p/ E-mail</span>
            </button>

            <button
              onClick={() => {
                playSfx('click');
                setShowDocModal(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 hover:text-white border border-indigo-500/40 transition-all cursor-pointer flex items-center gap-2 text-xs font-bold shadow-sm"
              title="Imprimir Ofício para Conselho Tutelar ou Conselho Escolar"
            >
              <Printer className="w-4 h-4 text-indigo-300" />
              <span className="hidden sm:inline">Imprimir Ofício / Relatório</span>
            </button>

            <button
              onClick={() => {
                playSfx('alert');
                setShowConfirmDelete(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/80 text-rose-200 hover:text-white border border-rose-500/40 transition-all cursor-pointer flex items-center gap-2 text-xs font-bold shadow-sm"
              title="Excluir denúncia permanentemente"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Excluir</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white transition-all cursor-pointer border border-white/10"
              title="Fechar prontuário"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BARRA DE STATUS RÁPIDO & TOGGLE SOS COM DESIGN ELEGANTE                   */}
        {/* ========================================================================= */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 backdrop-blur-sm">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
              <Activity className="w-3.5 h-3.5 text-indigo-400" /> Status do Acolhimento:
            </span>

            <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10 gap-1">
              <button
                onClick={() => handleUpdateStatus('Em Análise')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  caso.status === 'Em Análise'
                    ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-sm ring-1 ring-amber-500/40'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Em Análise
              </button>

              <button
                onClick={() => handleUpdateStatus('Acolhido')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  caso.status === 'Acolhido'
                    ? 'bg-blue-500/25 text-blue-300 border border-blue-500/50 shadow-sm ring-1 ring-blue-500/40'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 text-blue-400" /> Acolhido / Em Mediação
              </button>

              <button
                onClick={() => handleUpdateStatus('Resolvido')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  caso.status === 'Resolvido'
                    ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/40'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Pacificado / Resolvido
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {caso.feedback_escola ? (
              <button
                type="button"
                onClick={() => { playSfx('click'); setTab('feedback'); }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border border-teal-500/50 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 flex items-center gap-1.5 shadow-sm"
                title="Clique para ver ou atualizar o feedback dado ao denunciante"
              >
                <Megaphone className="w-3.5 h-3.5 text-teal-400" />
                <span>Devolutiva: {caso.feedback_escola.status_rotulo || 'Entregue'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { playSfx('click'); setTab('feedback'); }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border border-amber-500/50 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 flex items-center gap-1.5 animate-pulse"
                title="Este caso ainda não possui feedback registrado para o denunciante. Clique para dar feedback!"
              >
                <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Dar Feedback ao Denunciante</span>
              </button>
            )}

            <button
              onClick={handleToggleSOS}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 ${
                caso.is_sos
                  ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/40 animate-pulse'
                  : 'bg-red-950/20 text-red-300 border-red-500/30 hover:bg-red-900/30'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>{caso.is_sos ? 'SOS Ativo (Prioridade Máxima)' : 'Sinalizar como SOS'}</span>
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RÉGUA INTERATIVA DE ETAPAS RESTAURATIVAS (FLUXO GUIADO DA MEDIAÇÃO)        */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-indigo-950/40 border border-indigo-500/30 space-y-3.5 shadow-inner">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                <Compass className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <span className="text-xs font-black text-indigo-200 uppercase tracking-wider block">
                  Régua de Mediação Restaurativa (SEDUC / Lei 13.185/15)
                </span>
                <span className="text-[11px] text-gray-400">
                  Clique em qualquer etapa para avançar o plano pedagógico do caso:
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[11px] border border-indigo-500/30">
                Fase {ETAPAS_MEDICAO.findIndex(e => e.key === etapaAtual) + 1} de 6
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
            {ETAPAS_MEDICAO.map((etp) => {
              const isCurrent = etp.key === etapaAtual;
              const currentIndex = ETAPAS_MEDICAO.findIndex(e => e.key === etapaAtual);
              const thisIndex = ETAPAS_MEDICAO.findIndex(e => e.key === etp.key);
              const isPast = thisIndex < currentIndex;

              return (
                <button
                  key={etp.key}
                  onClick={() => handleSetEtapa(etp.key)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative group hover:scale-[1.02] ${
                    isCurrent
                      ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-indigo-400 shadow-xl shadow-indigo-600/40 ring-2 ring-indigo-400/80'
                      : isPast
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/60'
                      : 'bg-black/40 text-gray-400 border-white/10 hover:bg-white/5 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black font-mono ${
                      isCurrent
                        ? 'bg-white text-indigo-700'
                        : isPast
                        ? 'bg-emerald-500/30 text-emerald-300'
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {etp.fase}
                    </span>
                    {isPast && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    {isCurrent && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                  </div>
                  <span className={`text-[11px] font-black leading-tight block ${isCurrent ? 'text-white font-bold' : ''}`}>
                    {etp.label}
                  </span>
                  <span className={`text-[9px] mt-1 block truncate ${isCurrent ? 'text-indigo-100' : 'opacity-70'}`}>
                    {etp.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NAVEGAÇÃO DE ABAS INTERNAS DA MEDIAÇÃO                                     */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto scrollbar-none">
          
          <button
            onClick={() => setTab('fluxo')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
              tab === 'fluxo'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-indigo-300" />
            <span>Ações & Histórico</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/40 text-[10px] font-mono">
              {caso.acoes_mediacao?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setTab('feedback')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
              tab === 'feedback'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 border border-teal-400/40'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Megaphone className="w-4 h-4 text-teal-300" />
            <span>Feedback ao Denunciante</span>
            {caso.feedback_escola ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Feedback registrado" />
            ) : (
              <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">Pendente</span>
            )}
          </button>

          <button
            onClick={() => setTab('termo')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
              tab === 'termo'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/40'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>Termo de Convivência & Acordo</span>
            {caso.termo_acordo && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" title="Termo formalizado" />
            )}
          </button>

          <button
            onClick={() => setTab('guia')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
              tab === 'guia'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-300" />
            <span>Guia de Perguntas CNV</span>
          </button>

          <button
            onClick={() => setTab('protecao')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
              tab === 'protecao'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 border border-amber-400/40'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-300" />
            <span>Salvaguardas & Check-ins</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/40 text-[10px] font-mono">
              {caso.checkins_acompanhamento?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setTab('chat')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
              tab === 'chat'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-300" />
            <span>Chat Sigiloso</span>
            <span className="px-1.5 py-0.5 rounded-md bg-black/40 text-[10px] font-mono">
              {chatMessages.length}
            </span>
          </button>

          <button
            onClick={() => setTab('relato')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
              tab === 'relato'
                ? 'bg-slate-700 text-white shadow-lg border border-slate-500/40'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4 text-gray-300" />
            <span>Depoimento Original</span>
          </button>

        </div>

        {/* ========================================================================= */}
        {/* CONTEÚDO DA ABA 1: AÇÕES & HISTÓRICO DA MEDIAÇÃO                          */}
        {/* ========================================================================= */}
        {tab === 'fluxo' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Matriz de Escalada e Gravidade */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Avaliação de Risco & Escalada do Conflito:
                  </span>
                  <p className="text-[11px] text-gray-400">
                    Classifique a gravidade para calibrar os recursos e salvaguardas pedagógicas necessárias:
                  </p>
                </div>
                <span className="text-xs font-bold text-indigo-300">
                  Nível Atual: <strong className="text-white">{escaladaAtual}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { lvl: 'Baixa' as const, label: 'Nível 1 • Baixa', desc: 'Atrito verbal leve / pontual', color: 'emerald' },
                  { lvl: 'Média' as const, label: 'Nível 2 • Média', desc: 'Provocações repetitivas', color: 'blue' },
                  { lvl: 'Alta' as const, label: 'Nível 3 • Alta', desc: 'Intimidação / Assédio moral', color: 'amber' },
                  { lvl: 'Crítica' as const, label: 'Nível 4 • Crítica', desc: 'Risco físico iminente (SOS)', color: 'red' },
                ].map((item) => {
                  const isSelected = escaladaAtual === item.lvl;
                  return (
                    <button
                      key={item.lvl}
                      type="button"
                      onClick={() => handleSetEscalada(item.lvl)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? item.color === 'red'
                            ? 'bg-red-600/30 text-white border-red-500 shadow-lg shadow-red-600/30 ring-2 ring-red-500/80'
                            : item.color === 'amber'
                            ? 'bg-amber-600/30 text-white border-amber-500 shadow-lg shadow-amber-600/30 ring-2 ring-amber-500/80'
                            : item.color === 'blue'
                            ? 'bg-blue-600/30 text-white border-blue-500 shadow-lg shadow-blue-600/30 ring-2 ring-blue-500/80'
                            : 'bg-emerald-600/30 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-500/80'
                          : 'bg-black/50 text-gray-400 border-white/10 hover:bg-white/5 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                          {item.label}
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-[10px] opacity-75 leading-tight">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modelos Rápidos de Providência Pedagógica */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Modelos Rápidos de Providência (Clique para preencher o formulário):
              </span>
              <div className="flex flex-wrap gap-2">
                {MODELOS_RAPIDOS_MEDICAO.map((mod, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      playSfx('click');
                      setNovaAcaoCategoria(mod.categoria);
                      setNovaAcaoTexto(mod.texto);
                      showToast(`Modelo "${mod.titulo}" inserido no formulário.`);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-indigo-950/30 hover:bg-indigo-900/40 text-indigo-300 border border-indigo-500/30 hover:border-indigo-400/60 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span>+ {mod.titulo}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Formulário de Registro de Nova Ação */}
            <form onSubmit={handleAddAcao} className="p-4 sm:p-6 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Registrar Nova Intervenção no Prontuário Escolar
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  {caso.protocolo}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] text-gray-300 block mb-1.5 font-bold">
                    Categoria da Medida Pedagógica:
                  </label>
                  <select
                    value={novaAcaoCategoria}
                    onChange={(e) => setNovaAcaoCategoria(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Escuta Ativa">Escuta Ativa Individual</option>
                    <option value="Conversa com Responsáveis">Conversa com os Responsáveis</option>
                    <option value="Orientação em Sala">Orientação / Roda de Conversa em Sala</option>
                    <option value="Acordo de Convivência">Termo / Acordo de Convivência</option>
                    <option value="Encaminhamento Externo">Encaminhamento Externo (CRAS / Tutelar)</option>
                    <option value="Geral">Outra Providência Geral</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-gray-300 block mb-1.5 font-bold">
                    Educador / Mediador Responsável:
                  </label>
                  <input
                    type="text"
                    value={mediadorNome}
                    onChange={(e) => setMediadorNome(e.target.value)}
                    placeholder="Ex: Coord. Silvana Rocha / Profa. Helena"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-gray-300 block mb-1.5 font-bold">
                  Descrição Circunstanciada da Ação Tomada:
                </label>
                <textarea
                  value={novaAcaoTexto}
                  onChange={(e) => setNovaAcaoTexto(e.target.value)}
                  placeholder="Descreva o atendimento, impressões pedagógicas, orientações pactuadas ou encaminhamentos formalizados com os estudantes..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-gray-400 hidden sm:inline">
                  🔒 Registrado com carimbo de data, hora e assinatura eletrônica.
                </span>

                <button
                  type="submit"
                  disabled={!novaAcaoTexto.trim()}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <Check className="w-4 h-4" /> Salvar Providência no Prontuário
                </button>
              </div>
            </form>

            {/* Linha do Tempo de Ações Já Tomadas */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  Histórico Cronológico de Intervenções ({caso.acoes_mediacao?.length || 0}):
                </h3>
                <span className="text-[11px] text-gray-400">
                  Ordem cronológica das ações registradas
                </span>
              </div>

              {(!caso.acoes_mediacao || caso.acoes_mediacao.length === 0) ? (
                <div className="p-8 rounded-2xl bg-black/30 border border-white/5 text-center text-xs text-gray-400 italic">
                  Nenhum encaminhamento registrado até o momento. Utilize o formulário acima para registrar o primeiro acolhimento.
                </div>
              ) : (
                <div className="space-y-3">
                  {caso.acoes_mediacao.map((acao, index) => (
                    <div key={acao.id} className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2 relative pl-6 transition-all hover:border-indigo-500/30">
                      <div className="absolute left-2.5 top-5 bottom-5 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                      
                      <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-black flex items-center justify-center border border-indigo-500/30">
                            {acao.autor ? acao.autor.charAt(0).toUpperCase() : 'M'}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-[11px] border border-indigo-500/30">
                            {acao.categoria || 'Geral'}
                          </span>
                        </div>

                        <span className="text-gray-400 text-[11px]">
                          {new Date(acao.dataHora).toLocaleString('pt-BR')} • <strong className="text-gray-200">{acao.autor}</strong>
                        </span>
                      </div>

                      <p className="text-xs text-gray-200 leading-relaxed pt-1 whitespace-pre-wrap">
                        {acao.acao}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTEÚDO DA ABA: FEEDBACK E DEVOLUTIVA AO DENUNCIANTE                     */}
        {/* ========================================================================= */}
        {tab === 'feedback' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Banner Institucional & Status da Devolutiva */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-teal-950/40 via-black to-indigo-950/40 border border-teal-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-base text-white">
                      Devolutiva Institucional da Escola ao Denunciante
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Garantia de acolhimento protetivo e resposta ao noticiante (Lei nº 13.185/15 e ECA Art. 100)
                    </p>
                  </div>
                </div>

                <div>
                  {caso.feedback_escola ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Feedback Ativo ({caso.feedback_escola.status_rotulo || 'Entregue'})
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Aguardando 1ª Devolutiva
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-gray-300 leading-relaxed">
                <p>
                  💡 <strong>Finalidade Pedagógica:</strong> Ao registrar este feedback, o estudante que realizou a denúncia com o protocolo <strong className="text-white font-mono">{caso.protocolo}</strong> visualizará imediatamente a resposta acolhedora da escola em sua tela de acompanhamento, com as providências adotadas e orientações de segurança. Este feedback é automaticamente gravado e certificado nos relatórios oficiais para o <strong>Conselho Tutelar</strong> e <strong>Conselho Escolar</strong>.
                </p>
              </div>
            </div>

            {/* Modelos Rápidos Pré-Formatados (Templates) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Modelos Rápidos Pré-Formatados (Clique para preencher):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {TEMPLATES_FEEDBACK_ESCOLA.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleApplyFeedbackTemplate(tmpl.id)}
                    className="p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-teal-500/40 hover:bg-teal-950/20 text-left transition-all cursor-pointer group flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-teal-400 block uppercase">
                        {tmpl.rotulo}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-teal-200 mt-0.5">
                        {tmpl.titulo}
                      </h4>
                    </div>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <span>Aplicar modelo</span>
                      <ChevronRight className="w-3 h-3 text-teal-400 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Formulário Principal de Feedback */}
            <form onSubmit={handleSaveFeedback} className="p-5 rounded-3xl bg-black/40 border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-teal-400" />
                  <h4 className="text-xs font-black uppercase text-white tracking-wider">
                    Redigir Parecer / Devolutiva ao Denunciante
                  </h4>
                </div>
                <span className="text-[11px] text-teal-300 font-mono">
                  Protocolo: {caso.protocolo}
                </span>
              </div>

              {/* Título & Responsável */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-gray-300 block">
                    Título da Devolutiva:
                  </label>
                  <input
                    type="text"
                    value={feedbackTitulo}
                    onChange={(e) => setFeedbackTitulo(e.target.value)}
                    placeholder="Ex: Acolhimento Institucional e Providências Adotadas"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-all font-semibold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-300 block">
                    Responsável / Autor:
                  </label>
                  <input
                    type="text"
                    value={feedbackAutor}
                    onChange={(e) => setFeedbackAutor(e.target.value)}
                    placeholder="Ex: Comissão de Mediação Escolar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Status da Resposta / Fase do Caso */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-300 block">
                  Status da Resolução Comunicada ao Aluno:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { key: 'acolhido_em_analise' as const, label: 'Acolhimento Ativo', desc: 'Em apuração e escuta', color: 'blue' },
                    { key: 'medidas_adotadas' as const, label: 'Medidas Adotadas', desc: 'Ações pedagógicas ativas', color: 'indigo' },
                    { key: 'pacificado' as const, label: 'Caso Pacificado', desc: 'Acordo firmado e cumprido', color: 'emerald' },
                    { key: 'encaminhado_rede' as const, label: 'Conselho Tutelar', desc: 'Notificado à rede ECA', color: 'purple' }
                  ].map((st) => (
                    <button
                      key={st.key}
                      type="button"
                      onClick={() => setFeedbackStatus(st.key)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        feedbackStatus === st.key
                          ? st.key === 'pacificado'
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-1 ring-emerald-400'
                            : st.key === 'medidas_adotadas'
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-md ring-1 ring-indigo-400'
                            : st.key === 'encaminhado_rede'
                            ? 'bg-purple-600 text-white border-purple-400 shadow-md ring-1 ring-purple-400'
                            : 'bg-blue-600 text-white border-blue-400 shadow-md ring-1 ring-blue-400'
                          : 'bg-black/50 text-gray-400 border-white/10 hover:bg-white/5'
                      }`}
                    >
                      <span className="font-bold text-xs block">{st.label}</span>
                      <span className="text-[10px] opacity-80">{st.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mensagem da Devolutiva */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-gray-300 block">
                    Mensagem de Devolutiva ao Estudante:
                  </label>
                  <span className="text-[10px] text-gray-400">
                    Linguagem acessível, compassiva e segura
                  </span>
                </div>
                <textarea
                  value={feedbackMensagem}
                  onChange={(e) => setFeedbackMensagem(e.target.value)}
                  placeholder="Escreva a resposta oficial para o estudante que relatou o fato..."
                  rows={4}
                  className="w-full px-3.5 py-3 rounded-2xl bg-black/60 border border-white/15 text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-all leading-relaxed"
                  required
                />
              </div>

              {/* Medidas Concretas Adotadas */}
              <div className="space-y-2 pt-1">
                <label className="text-[11px] font-bold text-gray-300 block">
                  Providências e Medidas Adotadas Comunicadas:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Escuta atenta e sigilosa da equipe pedagógica',
                    'Supervisão preventiva ampliada nos espaços comuns',
                    'Intervenção pedagógica em sala de aula e rodas restaurativas',
                    'Pactuação formal de combinados de convivência e não-agressão',
                    'Contato e alinhamento com famílias dos envolvidos',
                    'Encaminhamento formal à rede de proteção (Conselho Tutelar)'
                  ].map((medida) => (
                    <label
                      key={medida}
                      className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all text-xs ${
                        feedbackMedidas.includes(medida)
                          ? 'bg-teal-950/40 border-teal-500/50 text-teal-200'
                          : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={feedbackMedidas.includes(medida)}
                        onChange={() => handleToggleMedidaFeedback(medida)}
                        className="w-4 h-4 rounded text-teal-500 accent-teal-600 bg-black border-white/30 cursor-pointer"
                      />
                      <span>{medida}</span>
                    </label>
                  ))}
                </div>

                {/* Adicionar Medida Personalizada */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={novaMedidaCustom}
                    onChange={(e) => setNovaMedidaCustom(e.target.value)}
                    placeholder="Adicionar outra medida específica adotada..."
                    className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-teal-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomMedida}
                    disabled={!novaMedidaCustom.trim()}
                    className="px-3.5 py-2 rounded-xl bg-teal-600/40 hover:bg-teal-600 text-teal-200 hover:text-white disabled:opacity-40 text-xs font-bold transition-all cursor-pointer"
                  >
                    + Adicionar
                  </button>
                </div>
              </div>

              {/* Orientações de Proteção ao Denunciante */}
              <div className="space-y-1 pt-1">
                <label className="text-[11px] font-bold text-gray-300 block">
                  Orientações de Segurança & Suporte ao Estudante:
                </label>
                <textarea
                  value={feedbackOrientacao}
                  onChange={(e) => setFeedbackOrientacao(e.target.value)}
                  placeholder="Instruções para o estudante se sentir amparado(a)..."
                  rows={2}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-all leading-relaxed"
                />
              </div>

              {/* Opções de Registros Oficiais e Transmissão */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                <span className="text-[11px] font-bold text-gray-300 block uppercase tracking-wider">
                  Certificações Institucionais & Transmissão:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 cursor-pointer hover:bg-white/10">
                    <input
                      type="checkbox"
                      checked={notificarConselhoTutelar}
                      onChange={(e) => setNotificarConselhoTutelar(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-500 accent-blue-600 cursor-pointer"
                    />
                    <span>Registrar no Relatório do Conselho Tutelar</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 cursor-pointer hover:bg-white/10">
                    <input
                      type="checkbox"
                      checked={notificarConselhoEscolar}
                      onChange={(e) => setNotificarConselhoEscolar(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 accent-emerald-600 cursor-pointer"
                    />
                    <span>Registrar no Relatório do Conselho Escolar</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 cursor-pointer hover:bg-white/10">
                    <input
                      type="checkbox"
                      checked={notificarChat}
                      onChange={(e) => setNotificarChat(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-500 accent-indigo-600 cursor-pointer"
                    />
                    <span>Transmitir no Chat Seguro do Protocolo</span>
                  </label>
                </div>
              </div>

              {/* Botões de Ação do Formulário */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Atualização instantânea disponível no código do protocolo</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      playSfx('click');
                      setShowDocModal(true);
                    }}
                    className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Visualizar relatório oficial com folha 2 exclusiva para feedback"
                  >
                    <Printer className="w-4 h-4 text-purple-300" />
                    <span>Ver Relatório Oficial (Folha 1 + Folha 2 A4)</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSavingFeedback || !feedbackTitulo.trim() || !feedbackMensagem.trim()}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-600 via-indigo-600 to-teal-700 hover:from-teal-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-teal-600/30 transition-all cursor-pointer hover:scale-105"
                  >
                    <Megaphone className="w-4 h-4" />
                    <span>Salvar e Enviar Feedback ao Denunciante</span>
                  </button>
                </div>
              </div>

            </form>

            {/* Pré-Visualização em Tempo Real (Como o Estudante Verá) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1.5">
                <CheckCheck className="w-4 h-4 text-teal-400" />
                Pré-Visualização ao Vivo (Como o Denunciante Verá na Consulta):
              </span>

              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-teal-50/95 via-indigo-50/80 to-purple-50/95 border-2 border-teal-400 shadow-lg space-y-4 text-[#241e33]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-200 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30 flex-shrink-0">
                      <Megaphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-teal-600 text-white px-2.5 py-0.5 rounded-full">
                          Devolutiva Oficial da Escola
                        </span>
                        <span className="text-[10px] font-bold text-teal-800 bg-teal-100 border border-teal-300 px-2.5 py-0.5 rounded-full uppercase">
                          {feedbackStatus === 'pacificado' ? 'Caso Pacificado' : feedbackStatus === 'medidas_adotadas' ? 'Medidas Adotadas' : feedbackStatus === 'encaminhado_rede' ? 'Conselho Tutelar' : 'Acolhimento Ativo'}
                        </span>
                      </div>
                      <h4 className="font-display font-black text-base text-[#241e33] mt-0.5">
                        {feedbackTitulo || 'Título da Devolutiva'}
                      </h4>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-[11px] text-[#5c546d]">
                    <span className="block font-semibold text-[#241e33]">{feedbackAutor}</span>
                    <span>Hoje às {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-teal-200 text-xs sm:text-sm text-[#241e33] leading-relaxed shadow-xs whitespace-pre-wrap">
                  {feedbackMensagem || 'A mensagem oficial da escola aparecerá aqui para o estudante...'}
                </div>

                {feedbackMedidas.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 space-y-1.5">
                    <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-teal-600" />
                      Providências e medidas adotadas pela comissão escolar:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {feedbackMedidas.map((med, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-teal-950 font-medium bg-white px-2.5 py-1.5 rounded-xl border border-teal-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                          <span>{med}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {feedbackOrientacao && (
                  <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-2.5 text-xs text-purple-950">
                    <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-purple-900 font-bold">Orientações para a sua segurança e acolhimento:</strong>
                      <p className="leading-relaxed text-[#3c344a]">{feedbackOrientacao}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Histórico de Devolutivas Anteriores Registradas */}
            {caso.historico_feedbacks && caso.historico_feedbacks.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Histórico de Devolutivas Enviadas ({caso.historico_feedbacks.length}):
                </span>
                <div className="space-y-2">
                  {caso.historico_feedbacks.map((fb, idx) => (
                    <div key={fb.id || idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Megaphone className="w-3.5 h-3.5 text-teal-400" />
                          {fb.titulo}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(fb.data_hora).toLocaleString('pt-BR')} • {fb.autor}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        "{fb.mensagem}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
        {/* ========================================================================= */}
        {tab === 'termo' && (
          <div className="space-y-5 animate-fadeIn">
            
            <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-black to-teal-950/40 border border-emerald-500/30 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                <FileCheck className="w-3.5 h-3.5" />
                Instrumento Formal Pedagógico
              </div>
              <h3 className="font-display font-black text-lg text-white">
                Termo de Convivência, Não-Agressão e Compromisso Mútuo
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Documento restaurativo pactuado entre as partes, com base no regimento escolar da EEMTI Alfredo Machado e no Programa de Combate à Intimidação Sistemática.
              </p>
            </div>

            <form onSubmit={handleSalvarTermo} className="space-y-4">
              
              {/* Seleção de Cláusulas Padrão */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                  Cláusulas e Compromissos Pactuados:
                </label>

                <div className="space-y-2">
                  {CLAUSULAS_PADRAO.map((clausula, idx) => {
                    const isChecked = clausulasSelecionadas.includes(clausula);
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          playSfx('click');
                          setClausulasSelecionadas(prev => 
                            isChecked ? prev.filter(c => c !== clausula) : [...prev, clausula]
                          );
                        }}
                        className={`p-3 rounded-2xl border text-xs cursor-pointer flex items-start gap-2.5 transition-all ${
                          isChecked
                            ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                            : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isChecked ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-white/30'
                        }`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="leading-snug">{clausula}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Adicionar Cláusula Personalizada */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={novaClausula}
                  onChange={(e) => setNovaClausula(e.target.value)}
                  placeholder="Adicionar cláusula específica pactuada com os estudantes..."
                  className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (novaClausula.trim()) {
                      playSfx('click');
                      setClausulasSelecionadas(prev => [...prev, novaClausula.trim()]);
                      setNovaClausula('');
                    }
                  }}
                  disabled={!novaClausula.trim()}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-40 text-white font-bold text-xs cursor-pointer"
                >
                  + Inserir
                </button>
              </div>

              {/* Reparação Simbólica / Ação Formativa */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                  Reparação Simbólica / Ação Formativa (Opcional):
                </label>
                <p className="text-[11px] text-gray-400">
                  Ex: Pedido formal de desculpas em espaço reservado, colaboração em trabalho pedagógico sobre empatia ou retratação amigável.
                </p>
                <textarea
                  value={reparacaoSimbolica}
                  onChange={(e) => setReparacaoSimbolica(e.target.value)}
                  placeholder="Ex: Aluno(a) comprometeu-se a retirar publicações do grupo e participar ativamente da dinâmica de acolhimento."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Status do Cumprimento do Termo */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10 flex-wrap gap-2">
                <span className="text-xs font-bold text-gray-300 uppercase">
                  Status Atual do Cumprimento:
                </span>
                <div className="flex items-center gap-2">
                  {(['Em cumprimento', 'Cumprido com sucesso', 'Necessita revisão'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setTermoStatus(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        termoStatus === st
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : 'bg-black/50 text-gray-400 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    playSfx('click');
                    printElementById('termo-acordo-timbrado', `Termo_Acordo_Restaurativo_${caso.protocolo}`);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span>Imprimir Termo para Assinaturas</span>
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Salvar Termo de Acordo
                </button>
              </div>

            </form>

            {/* Pré-visualização do Documento Timbrado */}
            <div 
              id="termo-acordo-timbrado"
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#fbfbfa] to-[#f4f4ee] text-[#1c1d22] border-4 border-double border-emerald-800/30 shadow-2xl space-y-5 text-xs font-serif leading-relaxed relative overflow-hidden"
            >
              
              {/* Marca d'água de Autenticidade */}
              <div className="absolute right-4 top-4 opacity-10 pointer-events-none select-none">
                <ShieldCheck className="w-36 h-36 text-emerald-950" />
              </div>

              {/* Cabeçalho Oficial SEDUC */}
              <div className="text-center border-b-2 border-emerald-800/20 pb-4 space-y-1 relative">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-800/10 border border-emerald-800/30 text-emerald-800 mb-1">
                  <Scale className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-widest text-emerald-950">
                  {getEscolaAtiva().orgao_regional.toUpperCase()}
                </h4>
                <p className="text-xs text-gray-700 font-sans font-medium">
                  {getEscolaAtiva().nome} • {getEscolaAtiva().comissao_mediacao_nome || 'Comissão de Mediação Escolar'}
                </p>
                <div className="flex items-center justify-center gap-3 pt-1 text-[11px] text-gray-600 font-mono">
                  <span>PROTOCOLO: <strong>{caso.protocolo}</strong></span>
                  <span>•</span>
                  <span>DATA DA SESSÃO: <strong>{new Date().toLocaleDateString('pt-BR')}</strong></span>
                  <span>•</span>
                  <span className="text-emerald-800 font-bold uppercase">Via Autêntica</span>
                </div>
              </div>

              {/* Título do Documento */}
              <div className="text-center space-y-1">
                <h3 className="font-bold text-base sm:text-lg uppercase tracking-wide text-emerald-950 underline decoration-emerald-600/40 underline-offset-4">
                  Termo Pedagógico de Convivência & Compromisso Mútuo
                </h3>
                <p className="text-[11px] text-gray-600 italic font-sans">
                  Fundamentado na Lei Federal nº 13.185/2015 (Combate ao Bullying) e no Regimento Escolar de {getEscolaAtiva().nome}
                </p>
              </div>

              {/* Preâmbulo Legal */}
              <p className="text-justify indent-6 text-xs sm:text-sm text-gray-800 leading-relaxed">
                Pelo presente instrumento de intervenção formativa e práticas restaurativas, as partes formalmente ouvidas e acolhidas no âmbito do protocolo <strong>{caso.protocolo}</strong>, orientadas pela equipe de mediação pedagógica, comprometem-se de livre e espontânea vontade a cumprir as seguintes cláusulas de não-agressão, respeito mútuo e preservação do clima escolar saudável:
              </p>

              {/* Cláusulas Numéricas */}
              <div className="space-y-2 py-1">
                {clausulasSelecionadas.map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-800">
                    <span className="font-bold text-emerald-800 font-mono text-[11px] mt-0.5">
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    <span className="leading-relaxed font-sans">{c}</span>
                  </div>
                ))}
              </div>

              {/* Medida Formativa Complementar */}
              {reparacaoSimbolica && (
                <div className="bg-emerald-900/5 p-3.5 rounded-2xl border border-emerald-800/20 font-sans text-xs space-y-1">
                  <span className="font-bold text-emerald-900 uppercase text-[10px] tracking-wider block">
                    ★ Ação Formativa / Medida Restaurativa Acordada:
                  </span>
                  <p className="text-gray-800 italic leading-relaxed">
                    "{reparacaoSimbolica}"
                  </p>
                </div>
              )}

              {/* Parágrafo de Fechamento */}
              <p className="text-justify text-[11px] text-gray-700 italic font-sans">
                O descumprimento injustificado das medidas acima ensejará a reavaliação disciplinar imediata e a convocação urgente dos responsáveis legais perante o Núcleo Gestor e Conselho Escolar.
              </p>

              {/* Bloco de Três Assinaturas */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-[10px] font-sans border-t border-emerald-800/20 mt-4">
                <div>
                  <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
                  <span className="font-bold block text-gray-800">Mediador(a) / Gestão</span>
                  <span className="text-gray-600 text-[9px]">{getEscolaAtiva().nome}</span>
                </div>
                <div>
                  <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
                  <span className="font-bold block text-gray-800">Estudante Acolhido(a)</span>
                  <span className="text-gray-600 text-[9px]">ou Responsável Legal</span>
                </div>
                <div>
                  <div className="border-t border-gray-400 w-4/5 mx-auto mb-1"></div>
                  <span className="font-bold block text-gray-800">Estudante Notificado(a)</span>
                  <span className="text-gray-600 text-[9px]">ou Responsável Legal</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTEÚDO DA ABA 3: GUIA DO MEDIADOR (PERGUNTAS RESTAURATIVAS AO VIVO)     */}
        {/* ========================================================================= */}
        {tab === 'guia' && (
          <div className="space-y-5 animate-fadeIn">
            
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                Guia Rápido de Comunicação Não-Violenta (CNV)
              </div>
              <h3 className="font-display font-black text-base text-white">
                Roteiro de Diálogo Restaurativo para a Sessão
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Utilize estas perguntas durante o acolhimento para desarmar hostilidades, despertar empatia e construir responsabilidade mútua.
              </p>
            </div>

            {/* Colunas: Perguntas para a Vítima vs Perguntas para o Ofensor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Bloco 1: Com o Estudante Atingido */}
              <div className="p-4 sm:p-5 rounded-3xl bg-[#0c1222] border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2 text-blue-300 font-black text-xs uppercase tracking-wider border-b border-white/10 pb-2">
                  <HeartHandshake className="w-4 h-4 text-blue-400" />
                  <span>Para a Escuta de Quem Foi Atingido:</span>
                </div>

                <div className="space-y-3">
                  {PERGUNTAS_RESTAURATIVAS.vitima.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-black/50 border border-white/5 space-y-1">
                      <p className="text-xs text-white font-bold">"{item.p}"</p>
                      <p className="text-[10px] text-blue-300/80 italic">💡 {item.dica}</p>
                      <button
                        type="button"
                        onClick={() => {
                          playSfx('click');
                          setNovaAcaoTexto(`[Escuta do Estudante] Pergunta norteadora: "${item.p}" - `);
                          setNovaAcaoCategoria('Escuta Ativa');
                          setTab('fluxo');
                          showToast('Pergunta copiada para o registro de ação!');
                        }}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-bold mt-1 inline-block cursor-pointer"
                      >
                        Registrar resposta no prontuário →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bloco 2: Com o Estudante que Causou o Dano */}
              <div className="p-4 sm:p-5 rounded-3xl bg-[#0c1222] border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider border-b border-white/10 pb-2">
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Para a Escuta de Quem Praticou o Dano:</span>
                </div>

                <div className="space-y-3">
                  {PERGUNTAS_RESTAURATIVAS.ofensor.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-black/50 border border-white/5 space-y-1">
                      <p className="text-xs text-white font-bold">"{item.p}"</p>
                      <p className="text-[10px] text-amber-300/80 italic">💡 {item.dica}</p>
                      <button
                        type="button"
                        onClick={() => {
                          playSfx('click');
                          setNovaAcaoTexto(`[Diálogo Restaurativo com Ofensor] Pergunta norteadora: "${item.p}" - `);
                          setNovaAcaoCategoria('Acordo de Convivência');
                          setTab('fluxo');
                          showToast('Pergunta copiada para o registro de ação!');
                        }}
                        className="text-[10px] text-amber-400 hover:text-amber-300 underline font-bold mt-1 inline-block cursor-pointer"
                      >
                        Registrar resposta no prontuário →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTEÚDO DA ABA 4: SALVAGUARDAS & CHECK-INS PÓS-MEDIAÇÃO (7, 15, 30 DIAS) */}
        {/* ========================================================================= */}
        {tab === 'protecao' && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* Checklist de Salvaguardas Imediatas */}
            <div className="p-5 rounded-3xl bg-black/40 border border-white/10 space-y-3">
              <div className="space-y-1">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-amber-400" />
                  Checklist de Medidas Protetivas Imediatas:
                </span>
                <p className="text-[11px] text-gray-400">
                  Marque as medidas preventivas adotadas pela coordenação para cessar a vulnerabilidade:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OPCOES_PROTECAO.map((opc, idx) => {
                  const isChecked = medidasSelecionadas.includes(opc);
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleMedida(opc)}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer flex items-start gap-2.5 transition-all ${
                        isChecked
                          ? 'bg-amber-950/30 border-amber-500/60 text-amber-200 shadow-sm'
                          : 'bg-black/50 border-white/10 text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isChecked ? 'bg-amber-600 border-amber-500 text-white' : 'border-white/30'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="leading-snug">{opc}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Painel de Follow-up: Check-ins 7, 15 e 30 dias */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  Plano de Acompanhamento Pós-Mediação:
                </span>
                <span className="text-[11px] text-emerald-400">
                  Monitoramento contínuo para evitar reincidência
                </span>
              </div>

              {/* Formulário de Novo Check-in */}
              <form onSubmit={handleAddCheckin} className="p-4 sm:p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                  Registrar Check-in de Acompanhamento:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-400 block mb-1">Período de Monitoramento:</label>
                    <select
                      value={checkinDia}
                      onChange={(e) => setCheckinDia(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value={7}>Check-in de 7 Dias (1ª Semana)</option>
                      <option value={15}>Check-in de 15 Dias (2ª Semana)</option>
                      <option value={30}>Check-in de 30 Dias (Fechamento)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-gray-400 block mb-1">Situação do(a) Estudante no Intervalo/Sala:</label>
                    <div className="flex items-center gap-2">
                      {(['Seguro e Acolhido', 'Ainda apreensivo', 'Incidente recorrente'] as const).map((sit) => (
                        <button
                          key={sit}
                          type="button"
                          onClick={() => setCheckinStatusEstudante(sit)}
                          className={`px-3 py-2 rounded-xl text-[11px] font-bold transition-all border flex-1 cursor-pointer truncate ${
                            checkinStatusEstudante === sit
                              ? sit === 'Seguro e Acolhido'
                                ? 'bg-emerald-600 text-white border-emerald-500'
                                : sit === 'Ainda apreensivo'
                                ? 'bg-amber-600 text-white border-amber-500'
                                : 'bg-red-600 text-white border-red-500'
                              : 'bg-black/50 text-gray-400 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {sit}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-gray-400 block mb-1">Anotações do Check-in:</label>
                  <textarea
                    value={checkinNotas}
                    onChange={(e) => setCheckinNotas(e.target.value)}
                    placeholder="Ex: Conversei com o estudante no intervalo do lanche. Relatou que os colegas cumpriram o combinado e não houve novos episódios."
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!checkinNotas.trim()}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Check className="w-4 h-4" /> Salvar Check-in
                  </button>
                </div>
              </form>

              {/* Lista dos Check-ins Registrados */}
              <div className="space-y-2">
                {(!caso.checkins_acompanhamento || caso.checkins_acompanhamento.length === 0) ? (
                  <p className="text-xs text-gray-400 italic bg-black/30 p-3 rounded-xl border border-white/5 text-center">
                    Nenhum check-in pós-mediação registrado até agora.
                  </p>
                ) : (
                  caso.checkins_acompanhamento.map((chk) => (
                    <div key={chk.id} className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Check-in de {chk.dia} Dias • {chk.responsavel}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          chk.status_estudante === 'Seguro e Acolhido'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : chk.status_estudante === 'Ainda apreensivo'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {chk.status_estudante}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300 pt-1">
                        {chk.observacoes}
                      </p>
                      <span className="text-[10px] text-gray-500 block">
                        Registrado em {new Date(chk.data).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTEÚDO DA ABA 5: CHAT SIGILOSO COM O ESTUDANTE                          */}
        {/* ========================================================================= */}
        {tab === 'chat' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3.5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                  Canal Direto & Sigiloso com o Denunciante
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">
                Sincronizado em tempo real com a aba Protocolo
              </span>
            </div>

            {/* Mensagens do Chat */}
            <div ref={chatContainerRef} className="max-h-72 overflow-y-auto space-y-2.5 p-3 rounded-2xl bg-black/40 border border-white/5 scrollbar-thin scrollbar-thumb-indigo-600/30">
              {chatMessages.length === 0 ? (
                <p className="text-center py-8 text-xs text-gray-400">
                  Nenhuma mensagem trocada ainda neste protocolo. Envie uma resposta de acolhimento abaixo.
                </p>
              ) : (
                chatMessages.map((msg, idx) => {
                  const isCoord = msg.remetente === 'coordenacao';
                  return (
                    <div
                      key={`${msg.id || 'msg'}-${idx}`}
                      className={`flex flex-col ${isCoord ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[10px] text-gray-400 px-1 mb-0.5">
                        {msg.autorNome} • {new Date(msg.dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isCoord
                            ? 'bg-indigo-600 text-white rounded-tr-none shadow-md'
                            : 'bg-gray-800 text-gray-200 rounded-tl-none border border-white/10'
                        }`}
                      >
                        {msg.texto}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Respostas Rápidas Recomendadas */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                Respostas Rápidas de Acolhimento:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Olá! Recebemos seu relato e já estamos acompanhando com total sigilo e cuidado.',
                  'Gostaria de passar na sala de acolhimento pedagógico no intervalo para conversarmos com calma?',
                  'Sua segurança física e emocional é prioridade para a escola. Você não está sozinho(a).',
                  'O caso foi acolhido e pactuado em mediação pedagógica. Manteremos acompanhamento nos próximos dias.',
                ].map((txt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setChatInput(txt)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/40 transition-all cursor-pointer truncate max-w-full text-left"
                  >
                    💬 {txt.length > 55 ? txt.substring(0, 52) + '...' : txt}
                  </button>
                ))}
              </div>
            </div>

            {/* Envio de Mensagem */}
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Escreva uma resposta segura e acolhedora para o estudante..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Enviar</span>
              </button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CONTEÚDO DA ABA 6: FICHA COMPLETA DO RELATO & PROVAS                      */}
        {/* ========================================================================= */}
        {tab === 'relato' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Depoimento do Estudante
                </span>
                <span>Enviado em: {new Date(caso.data_envio).toLocaleString('pt-BR')}</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap bg-black/40 p-4 rounded-xl border border-white/5">
                {caso.descricao}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 border-t border-white/5 text-xs text-gray-400">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    Escola da Ocorrência (Fato):
                  </span>
                  <span className="font-bold text-purple-300">
                    {caso.escola_ocorrencia_nome || caso.escola_nome || 'E.E.M.T.I. Alfredo Machado'}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    Série & Turma do Fato:
                  </span>
                  <span className="font-bold text-amber-300">
                    {caso.serie_ocorrencia ? `${caso.serie_ocorrencia} • ` : ''}{caso.turma_ocorrencia ? `Turma ${caso.turma_ocorrencia}` : caso.turma_envolvida || 'Não informada'}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Turno do Fato:</span>
                  <span className="font-semibold text-white">{caso.turno_ocorrencia || caso.turno || 'Geral'}</span>
                </div>

                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Agressor / Grupo Envolvido:</span>
                  <span className="font-semibold text-white">{caso.agressor_grupo || 'Não especificado'}</span>
                </div>

                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Tipo & Formas:</span>
                  <span className="font-semibold text-white">{caso.tipo_violencia}</span>
                </div>

                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Local da Ocorrência:</span>
                  <span className="font-semibold text-white">{caso.local_escola}</span>
                </div>

                {caso.escola_acusado_nome && (
                  <div className="sm:col-span-2">
                    <span className="text-gray-500 block text-[10px] uppercase font-bold text-amber-400">Escola e Turma do Acusado:</span>
                    <span className="font-semibold text-amber-200">
                      {caso.escola_acusado_nome} {caso.serie_acusado ? `(${caso.serie_acusado} Turma ${caso.turma_acusado || ''} - ${caso.turno_acusado || ''})` : ''}
                    </span>
                  </div>
                )}
              </div>

              {caso.provas_anexas && caso.provas_anexas.length > 0 && (
                <div className="pt-3 border-t border-white/5 space-y-2">
                  <span className="text-xs font-bold text-gray-300 uppercase block">
                    Evidências e Arquivos Anexados ({caso.provas_anexas.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {caso.provas_anexas.map((anexo, i) => {
                      const isImage = anexo.url && (anexo.tipo === 'foto' || anexo.tipo === 'print' || anexo.tipo === 'imagem' || anexo.url.startsWith('data:image'));
                      return (
                        <div key={i} className="p-3 rounded-2xl bg-black/60 border border-white/10 text-xs text-gray-200 flex items-start gap-3 relative group">
                          {isImage ? (
                            <div 
                              className="relative w-16 h-16 rounded-xl overflow-hidden border border-indigo-500/40 cursor-pointer group/img flex-shrink-0"
                              onClick={() => setSelectedFotoModal({
                                url: anexo.url!,
                                nome: anexo.nome,
                                tipo: anexo.tipo,
                                tamanho: anexo.tamanho
                              })}
                              title="Clique para ver foto completa"
                            >
                              <img 
                                src={anexo.url} 
                                alt={anexo.nome} 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <ZoomIn className="w-5 h-5 text-indigo-300" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                              <Paperclip className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1 space-y-1">
                            <p className="font-bold text-white text-xs truncate">{anexo.nome}</p>
                            <span className="text-[10px] uppercase font-mono text-indigo-300 block">
                              {anexo.tipo || 'Anexo'} • {anexo.tamanho || 'Carregado'}
                            </span>
                            {isImage && (
                              <button
                                type="button"
                                onClick={() => setSelectedFotoModal({
                                  url: anexo.url!,
                                  nome: anexo.nome,
                                  tipo: anexo.tipo,
                                  tamanho: anexo.tamanho
                                })}
                                className="text-[10px] text-indigo-300 hover:text-indigo-100 underline font-bold flex items-center gap-1 mt-0.5 cursor-pointer"
                              >
                                <ZoomIn className="w-3 h-3" /> Ver Foto Completa
                              </button>
                            )}
                            {anexo.tipo === 'audio' && anexo.url && (
                              <audio controls src={anexo.url} className="h-8 w-full max-w-[200px] mt-1" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* RODAPÉ DO MODAL                                                           */}
        {/* ========================================================================= */}
        <div className="flex justify-end pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            Concluir & Fechar Prontuário
          </button>
        </div>

      </div>

      {/* Modal de Notificação por E-mail */}
      {showEmailModal && (
        <ModalEnvioEmail
          denuncia={caso}
          onClose={() => setShowEmailModal(false)}
          onSuccess={(msg) => showToast(msg)}
        />
      )}

      {/* Modal de Impressão Oficial de Documentos */}
      {showDocModal && (
        <DocumentoOficialModal
          denuncia={caso}
          onClose={() => setShowDocModal(false)}
        />
      )}

      {/* Modal de Foto Ampliada (Lightbox) */}
      {selectedFotoModal && (
        <ModalFotoCompleta
          fotoUrl={selectedFotoModal.url}
          nomeArquivo={selectedFotoModal.nome}
          protocolo={caso.protocolo}
          tipoArquivo={selectedFotoModal.tipo}
          tamanhoArquivo={selectedFotoModal.tamanho}
          onClose={() => setSelectedFotoModal(null)}
        />
      )}

      {/* Modal de Confirmação de Exclusão de Denúncia */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div ref={confirmDeleteCardRef} className="w-full max-w-md rounded-3xl bg-[#0e1224] border-2 border-rose-500/80 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Excluir Esta Denúncia?</h3>
                <span className="text-xs text-rose-300 font-mono font-bold">Protocolo: {caso.protocolo}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2 text-xs text-rose-200">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                Atenção: Esta ação é definitiva e irreversível!
              </p>
              <p className="text-[11px] leading-relaxed text-slate-300">
                O registro será removido permanentemente da base de dados e do histórico escolar. Todas as evidências anexas e o histórico de mensagens do chat seguro deste protocolo serão apagados.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white font-bold text-xs transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleExecuteDelete}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-rose-600/40 transition-all cursor-pointer"
              >
                {isDeleting ? (
                  <span>Excluindo...</span>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Sim, Excluir Definitivamente</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
