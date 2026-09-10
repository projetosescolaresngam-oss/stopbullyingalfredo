import React, { useState, useEffect, useRef } from 'react';
import { useApp } from './AppContext';
import { ViewMode } from './types';
import { AvatarRenderer } from './AvatarRenderer';
import { StopHandLogo } from './components/BrandingAssets';
import { playBreathTone, speakText } from './services/audioSynthesizer';
import { 
  Sparkles, 
  Shield, 
  Compass, 
  Lock, 
  Gamepad2, 
  Award, 
  HeartHandshake, 
  TrafficCone, 
  BookOpen, 
  AlertTriangle, 
  Microscope, 
  ShieldCheck, 
  Megaphone, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Zap, 
  User, 
  MoreVertical, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  PhoneCall, 
  Activity, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Copy, 
  Printer, 
  FileCheck2, 
  Star, 
  Flame, 
  HelpCircle, 
  Send, 
  Radio, 
  QrCode, 
  Target, 
  Sliders, 
  Bell, 
  Wifi, 
  BatteryMedium,
  RefreshCw,
  Gift
} from 'lucide-react';

interface GuiaDoRespeitoViewProps {
  onNavigate?: (view: ViewMode) => void;
  onOpenCamouflage?: () => void;
  onOpenProfile?: () => void;
}

// Efeitos sonoros acústicos via Web Audio API
const playSoundFx = (type: 'click' | 'success' | 'tab' | 'reward' | 'arcade' | 'alert') => {
  if (type === 'click') {
    playBreathTone(800, 35, true);
  } else if (type === 'tab') {
    playBreathTone(600, 50, true);
  } else if (type === 'arcade') {
    playBreathTone(950, 40, true);
    setTimeout(() => playBreathTone(1200, 50, true), 45);
  } else if (type === 'alert') {
    playBreathTone(300, 100, true);
    setTimeout(() => playBreathTone(250, 150, true), 110);
  } else if (type === 'success') {
    playBreathTone(523, 80, true);
    setTimeout(() => playBreathTone(659, 100, true), 90);
    setTimeout(() => playBreathTone(784, 180, true), 200);
  } else if (type === 'reward') {
    playBreathTone(440, 70, true);
    setTimeout(() => playBreathTone(554, 70, true), 80);
    setTimeout(() => playBreathTone(659, 70, true), 160);
    setTimeout(() => playBreathTone(880, 240, true), 240);
  }
};

export const GuiaDoRespeitoView: React.FC<GuiaDoRespeitoViewProps> = ({ 
  onNavigate = () => {}, 
  onOpenCamouflage = () => {},
  onOpenProfile = () => {}
}) => {
  const { userStats, userProfile, recordRespectCompleted, awardXp, studentIdentity } = useApp();

  // Tópico ativo (0 a 9)
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [visitedTopics, setVisitedTopics] = useState<number[]>([0]);
  const [hasClaimedXp, setHasClaimedXp] = useState(userStats.completedRespectModule || false);

  // Áudio, Voz e Auto-Tour
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [speakingActive, setSpeakingActive] = useState(false);
  const [isAutoTour, setIsAutoTour] = useState(false);

  // Maquete do Celular
  const [deviceScreen, setDeviceScreen] = useState<'topbar' | 'denuncia' | 'camuflagem' | 'avatar' | 'apoio' | 'semaforo' | 'leis' | 'sos' | 'ceara' | 'home'>('topbar');
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const [phoneNotification, setPhoneNotification] = useState<string | null>('🔔 Stop: 100% Criptografado & Ativo na EEMTI Alfredo Machado');

  // Denúncia no Celular
  const [simulatedProtocol, setSimulatedProtocol] = useState('#SB-9842');
  const [simulatedCategory, setSimulatedCategory] = useState('Verbal / Apelidos');
  const [simulatedText, setSimulatedText] = useState('Estão criando apelidos e risadas contra um colega no intervalo.');
  const [denunciaSubmitted, setDenunciaSubmitted] = useState(false);

  // Camuflagem no Celular
  const [camuMode, setCamuMode] = useState<'app' | 'pacman' | 'calc'>('app');
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [pacmanPos, setPacmanPos] = useState({ x: 2, y: 1 });
  const [pacmanScore, setPacmanScore] = useState(80);

  // Provador de Avatar no Celular
  const [previewAvatar, setPreviewAvatar] = useState('icon_luffy_gear5');
  const [previewFrame, setPreviewFrame] = useState('frame_ouro_lideranca');

  // Semáforo Interativo
  const [selectedRisk, setSelectedRisk] = useState<'verde' | 'amarelo' | 'vermelho'>('amarelo');

  // Respiração 4-7-8
  const [breathingRunning, setBreathingRunning] = useState(false);
  const [breathingStage, setBreathingStage] = useState<'Inspire...' | 'Segure o ar...' | 'Solte o ar...'>('Inspire...');
  const [breathingSeconds, setBreathingSeconds] = useState(4);

  // Destaque da Barra Superior
  const [activeNavHighlight, setActiveNavHighlight] = useState<'perfil' | 'logo' | 'denuncia' | 'menu'>('perfil');

  // Dilema Ético Interativo (Laboratório de Empatia)
  const [selectedDilemma, setSelectedDilemma] = useState(0);
  const [dilemmaChoice, setDilemmaChoice] = useState<number | null>(null);
  const [dilemmaXpAwarded, setDilemmaXpAwarded] = useState(false);

  // Certificado & Confetes
  const [showCertificate, setShowCertificate] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Timer do Auto-Tour (Avança de 12 em 12 segundos se ativo)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoTour) {
      timer = setInterval(() => {
        setActiveTopicIndex((prev) => {
          const next = (prev + 1) % topics.length;
          setVisitedTopics((v) => (v.includes(next) ? v : [...v, next]));
          if (audioEnabled) playSoundFx('tab');
          return next;
        });
      }, 12000);
    }
    return () => clearInterval(timer);
  }, [isAutoTour, audioEnabled]);

  // Loop de respiração 4-7-8
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (breathingRunning) {
      interval = setInterval(() => {
        setBreathingSeconds((prev) => {
          if (prev <= 1) {
            if (breathingStage === 'Inspire...') {
              if (audioEnabled) playBreathTone(400, 300, true);
              setBreathingStage('Segure o ar...');
              return 7;
            } else if (breathingStage === 'Segure o ar...') {
              if (audioEnabled) playBreathTone(350, 300, true);
              setBreathingStage('Solte o ar...');
              return 8;
            } else {
              if (audioEnabled) playBreathTone(500, 300, true);
              setBreathingStage('Inspire...');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingRunning, breathingStage, audioEnabled]);

  // Sincroniza a tela do smartphone virtual quando o tópico muda
  useEffect(() => {
    const screens: Array<'topbar' | 'denuncia' | 'camuflagem' | 'avatar' | 'apoio' | 'semaforo' | 'leis' | 'sos' | 'ceara' | 'home'> = [
      'topbar', 'denuncia', 'camuflagem', 'home', 'avatar', 'apoio', 'semaforo', 'leis', 'sos', 'ceara'
    ];
    setDeviceScreen(screens[activeTopicIndex] || 'topbar');
    setPhoneMenuOpen(false);
  }, [activeTopicIndex]);

  const handleSelectTopic = (idx: number) => {
    if (audioEnabled) playSoundFx('tab');
    setActiveTopicIndex(idx);
    if (!visitedTopics.includes(idx)) {
      setVisitedTopics((prev) => [...prev, idx]);
    }
    window.speechSynthesis?.cancel();
    setSpeakingActive(false);
  };

  const handleNext = () => {
    if (activeTopicIndex < topics.length - 1) {
      handleSelectTopic(activeTopicIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeTopicIndex > 0) {
      handleSelectTopic(activeTopicIndex - 1);
    }
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4500);
  };

  const handleClaimReward = () => {
    if (audioEnabled) playSoundFx('reward');
    setHasClaimedXp(true);
    recordRespectCompleted();
    awardXp(50, 'Conclusão da Academia Stop');
    setShowCertificate(true);
    triggerConfetti();
  };

  const generateNewHash = () => {
    if (audioEnabled) playSoundFx('click');
    const rand = Math.floor(1000 + Math.random() * 9000);
    setSimulatedProtocol(`#SB-${rand}`);
    setDenunciaSubmitted(false);
    setPhoneNotification(`🔒 Novo Protocolo Gerado: #SB-${rand}`);
  };

  const handleSimulateSubmit = () => {
    if (audioEnabled) playSoundFx('success');
    setDenunciaSubmitted(true);
    setPhoneNotification(`✅ Protocolo ${simulatedProtocol} arquivado na Coordenação.`);
    triggerConfetti();
  };

  const handleToggleVoice = (text: string) => {
    if (speakingActive) {
      window.speechSynthesis?.cancel();
      setSpeakingActive(false);
    } else {
      setSpeakingActive(true);
      speakText(text);
    }
  };

  const handleCopyCode = () => {
    if (audioEnabled) playSoundFx('click');
    navigator.clipboard?.writeText(studentIdentity.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Dilemas Éticos Interativos
  const dilemmas = [
    {
      title: 'Stickers Ofensivos em Grupo',
      context: 'Um grupo de WhatsApp da turma está compartilhando uma figurinha com a foto distorcida de um colega tímido, e muitos estão rindo.',
      options: [
        { text: 'A) Salvar e mandar para amigos de outra sala', correct: false, feedback: 'Negativo: Isso multiplica a difamação e tipifica cyberbullying segundo a Lei 14.811/2024.' },
        { text: 'B) Usar o Canal de Denúncia Anônima do Stop para acionar a coordenação', correct: true, feedback: 'Excelente! A coordenação poderá orientar a turma com protocolo restaurativo sem expor você.' },
        { text: 'C) Mandar mensagem no privado acolhendo o colega (4º D: Dar Apoio)', correct: true, feedback: 'Muito bom! Acolher a vítima quebra o sentimento de isolamento e desamparo.' }
      ]
    },
    {
      title: 'Exclusão Deliberada no Recreio',
      context: 'Dois colegas barram a entrada de um aluno novato na roda de conversa, dizendo que ele não é bem-vindo.',
      options: [
        { text: 'A) Fingir que não viu e ir embora', correct: false, feedback: 'A conivência silenciosa reforça a sensação de impunidade dos agressores.' },
        { text: 'B) Aplicar o 2º D (Distrair): convidar o novato para jogar pebolim ou ir à biblioteca', correct: true, feedback: 'Perfeito! Distrair desarma o constrangimento na hora sem confronto violento.' },
        { text: 'C) Começar uma briga física no corredor', correct: false, feedback: 'Violência física agrava o conflito e traz punições disciplinares para ambas as partes.' }
      ]
    },
    {
      title: 'Ameaça de Agressão na Saída',
      context: 'Alguém avisa que vão cercar um estudante no portão da escola logo após o término da aula.',
      options: [
        { text: 'A) Esperar para ver se vai ter briga mesmo', correct: false, feedback: 'Risco grave à integridade física do colega!' },
        { text: 'B) Aplicar o 3º D (Delegar): avisar o inspetor, coordenação ou acionar o SOS com GPS', correct: true, feedback: 'Ação exemplar! Situações de perigo iminente devem ser delegadas imediatamente à autoridade escolar.' },
        { text: 'C) Gravar vídeo para publicar no TikTok', correct: false, feedback: 'Exposição pública ilegítima agrava o trauma e fere o Estatuto da Criança e do Adolescente.' }
      ]
    }
  ];

  // Os 10 Tópicos do Site Stop
  const topics = [
    {
      id: 'navbar',
      title: 'A Nova Barra Superior',
      subtitle: 'A harmonia e ordem dos 4 controles essenciais',
      icon: <Compass className="w-5 h-5 text-cyan-400" />,
      tag: 'Navegação Estratégica',
      speech: 'A barra superior do Stop organiza as ações essenciais: na extrema esquerda o Perfil do usuário com título e XP, ao centro a logomarca Stop, logo ao lado o botão vermelho de Denúncia Imediata, e na ponta direita os três pontinhos com todas as ferramentas secundárias.',
      details: [
        { label: '1. Perfil do Estudante', desc: 'Avatar circular, nível atual e título de honra (Stop Aprendiz). Abre seu inventário de itens e conquistas.' },
        { label: '2. Logotipo Stop', desc: 'Mão de proteção com selo da EEMTI Alfredo Machado. Clicar nele retorna para o início de qualquer lugar.' },
        { label: '3. Denúncia Imediata', desc: 'Em destaque vermelho carmesim vibrante para acionamento rápido e sem atrito em situações de perigo.' },
        { label: '4. Três Pontinhos (Menu)', desc: 'Reúne de forma limpa as 10 ferramentas complementares sem poluir o topo da tela.' }
      ]
    },
    {
      id: 'denuncia',
      title: 'Canal de Denúncia Anônima',
      subtitle: 'Criptografia de ponta e protocolo hash sem identificação',
      icon: <Megaphone className="w-5 h-5 text-red-400" />,
      tag: '100% Sigiloso & Seguro',
      speech: 'O canal de denúncia anônima do Stop não armazena IP, dados de navegação ou exige cadastro. Ele gera um código hash único para que você acompanhe as medidas da coordenação escolar em total segredo.',
      details: [
        { label: 'Sem Armazenamento de IP', desc: 'Nenhum dado que possa rastrear o seu computador ou telefone é gravado no servidor.' },
        { label: 'Criação de Hash Seguro', desc: 'Você recebe um código único (exemplo: #SB-9842) que é sua chave exclusiva de acompanhamento.' },
        { label: 'Anexos de Evidência', desc: 'Possibilidade de enviar prints, fotos e áudios com criptografia de ponta a ponta.' },
        { label: 'Retorno Restaurativo', desc: 'A equipe gestora da EEMTI Alfredo Machado responde orientações e medidas protetivas pelo código.' }
      ]
    },
    {
      id: 'camuflagem',
      title: 'Modo Camuflagem Instantânea',
      subtitle: 'Disfarce de tela com Pac-Man retrô ou Calculadora',
      icon: <Gamepad2 className="w-5 h-5 text-amber-400" />,
      tag: 'Privacidade de Emergência',
      speech: 'O modo camuflagem permite ocultar o aplicativo em um clique. A tela é imediatamente substituída por um jogo do Pac-Man retrô ou por uma calculadora científica funcional, garantindo que ninguém veja o que você estava fazendo.',
      details: [
        { label: 'Atalho em 1 Clique', desc: 'Presente na barra e na home para acionamento com os olhos vendados em segundos.' },
        { label: 'Disfarce 1: Jogo Pac-Man', desc: 'Totalmente jogável com sons e fantasmas. Parece uma partida casual de videogame.' },
        { label: 'Disfarce 2: Calculadora', desc: 'Simula cálculos matemáticos reais, simulando estudo acadêmico para quem estiver olhando.' },
        { label: 'Retorno Seguro', desc: 'Para voltar ao Stop, basta clicar no pequeno botão de destrave secreto no rodapé.' }
      ]
    },
    {
      id: 'gamificacao',
      title: 'Níveis, XP & Conquistas do Stop',
      subtitle: 'Reconhecimento de atitudes éticas do Nível 1 ao 20',
      icon: <Award className="w-5 h-5 text-purple-400" />,
      tag: 'Gamificação Positiva',
      speech: 'A gamificação do Stop recompensa o engajamento na cultura de paz. Você ganha XP ao aprender leis, fazer simulações e concluir este guia, evoluindo do Nível 1 até o Nível 20.',
      details: [
        { label: 'Progressão de Ranks', desc: 'Comece como Stop Aprendiz e alcance patentes lendárias como Guardião Supremo Imortal.' },
        { label: 'Missões Educativas', desc: 'Acumule XP resolvendo quizzes escolares, apoiando colegas e conhecendo leis federais.' },
        { label: 'Insígnias Exclusivas', desc: 'Mais de 50 medalhas com ilustrações ricas em detalhes para exibir no seu perfil.' },
        { label: 'Cultura Pedagógica', desc: 'O XP não mede disputas, mas sim a empatia e o compromisso ético com a comunidade escolar.' }
      ]
    },
    {
      id: 'colecao',
      title: 'Minha Coleção & Cosméticos',
      subtitle: 'Luffy Gear 5, Kakashi Sharingan, Gojo e molduras épicas',
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      tag: 'Personalização Visual',
      speech: 'Na Minha Coleção, você pode personalizar seu avatar escolhendo ícones épicos em alta fidelidade como Luffy Gear 5, Kakashi Hatake e Gojo Satoru, combinados com molduras douradas e auras holográficas.',
      details: [
        { label: 'Ícones Lendários', desc: 'Arte vetorial customizada de personagens amados com acabamento premium e brilhante.' },
        { label: 'Molduras de Alta Fidelidade', desc: 'Bordas de ouro imperial, neon cyber, chamas de fênix e prismas cósmicos.' },
        { label: 'Títulos Honorários', desc: 'Defina títulos como Defensor da Empatia ou Farol da Paz Escolar abaixo do seu nome.' },
        { label: 'Desbloqueio Justo', desc: 'Tudo conquistado por mérito e estudo na plataforma, sem custos ou compras.' }
      ]
    },
    {
      id: 'apoio',
      title: 'Apoio Emocional & Respiração 4-7-8',
      subtitle: 'Acolhimento imediato, alívio de crises e canais 24h',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />,
      tag: 'Saúde Mental & Escuta',
      speech: 'O módulo de apoio emocional oferece técnicas de desaceleração como a respiração 4-7-8, mensagens de acolhimento e atalhos diretos para os canais de socorro gratuitos como o CVV 188 e o Disque 100.',
      details: [
        { label: 'Método Científico 4-7-8', desc: 'Inspirar por 4 segundos, reter por 7 segundos e soltar por 8 segundos equilibra o sistema nervoso.' },
        { label: 'Canal CVV 188', desc: 'Apoio emocional gratuito e 24 horas por dia por telefone ou chat sigiloso.' },
        { label: 'Disque 100', desc: 'Canal oficial do Ministério dos Direitos Humanos para proteção integral de crianças e jovens.' },
        { label: 'Espaço Anti-Ansiedade', desc: 'Sem julgamentos, oferecendo palavras de força e técnicas de ancoragem no presente.' }
      ]
    },
    {
      id: 'triagem',
      title: 'Semáforo de Triagem Escolar',
      subtitle: 'Protocolo de gravidade: Nível Verde, Amarelo e Vermelho',
      icon: <TrafficCone className="w-5 h-5 text-yellow-400" />,
      tag: 'Gestão Restaurativa',
      speech: 'O semáforo escolar orienta a classificação das ocorrências. O nível verde trata conflitos do dia a dia com mediação. O amarelo sinaliza bullying recorrente com intervenção pedagógica. O vermelho requer proteção imediata e encaminhamentos urgentes.',
      details: [
        { label: 'Nível Verde (Baixo Risco)', desc: 'Discussões ocasionais e desavenças leves. Resolvido com diálogo restaurativo e conciliação.' },
        { label: 'Nível Amarelo (Médio Risco)', desc: 'Apelidos pejorativos diários, fofocas e exclusão. Reunião com responsáveis e acompanhamento.' },
        { label: 'Nível Vermelho (Alto Risco)', desc: 'Agressões físicas, chantagens graves e ameaças. Ativação da rede de proteção e Conselho Tutelar.' },
        { label: 'Foco Restaurativo', desc: 'O objetivo principal nunca é a vingança, mas sim cessar a violência e restaurar a convivência.' }
      ]
    },
    {
      id: 'leis',
      title: 'Matriz AntiBullying & Leis',
      subtitle: 'Lei 13.185/15, Lei 14.811/24 e os 4 D’s da Testemunha',
      icon: <BookOpen className="w-5 h-5 text-blue-400" />,
      tag: 'Direito & Cidadania',
      speech: 'A legislação brasileira reconhece o bullying e o cyberbullying no Código Penal pela Lei 14.811 de 2024. O método dos 4 D da Testemunha Ativa ensina como colegas podem intervir de forma segura.',
      details: [
        { label: 'Lei Federal 14.811/2024', desc: 'Tipifica bullying e cyberbullying como crimes com penalidades específicas no Código Penal.' },
        { label: 'Lei Federal 13.185/2015', desc: 'Institui o Programa de Combate à Intimidação Sistemática em todas as escolas brasileiras.' },
        { label: 'Os 4 D’s de Ação', desc: 'Direto (interromper com calma), Distrair (chamar a vítima), Delegar (acionar docente), Dar Apoio.' },
        { label: 'Fim da Conivência', desc: 'O espectador que ri ou compartilha perpetua o dano; quem acolhe transforma o ambiente.' }
      ]
    },
    {
      id: 'sos',
      title: 'SOS com Localização GPS',
      subtitle: 'Alerta crítico de socorro georreferenciado para emergências',
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      tag: 'Socorro em Tempo Real',
      speech: 'O botão de SOS transmite imediatamente a coordenada de latitude e longitude exatas do aluno para os canais de atendimento escolar em situações de extrema ameaça dentro ou no entorno da escola.',
      details: [
        { label: 'Geolocalização Precisa', desc: 'Captura por satélite em tempo real para rápida localização física da ocorrência.' },
        { label: 'Acionamento Rápido', desc: 'Design de alto contraste com confirmação rápida para evitar disparos acidentais.' },
        { label: 'Canal com a Direção', desc: 'Despacha os dados para a sala dos professores e coordenação da EEMTI Alfredo Machado.' },
        { label: 'Destinado a Emergências', desc: 'Uso reservado para ameaças reais à integridade física do aluno ou de terceiros.' }
      ]
    },
    {
      id: 'ceara',
      title: 'Ceará Científico 2026',
      subtitle: 'Projeto de pesquisa e inovação da EEMTI Alfredo Machado',
      icon: <Microscope className="w-5 h-5 text-indigo-400" />,
      tag: 'Ciência, Tecnologia & Paz',
      speech: 'O StopBullying é um projeto científico concorrente da Feira Regional Ceará Científico 2026, integrando tecnologia, sociologia escolar e direitos humanos desenvolvido na EEMTI Alfredo Machado em Madalena.',
      details: [
        { label: 'Pôster Oficial 90x120cm', desc: 'Apresentação formal com introdução, objetivos, diagnóstico amostral e resultados esperados.' },
        { label: 'Metodologia Participativa', desc: 'Desenvolvido a partir de questionários anônimos e rodas de conversa com os próprios estudantes.' },
        { label: 'Impacto Comunitário', desc: 'Redução mensurável de conflitos e fortalecimento da cultura de paz no município de Madalena.' },
        { label: 'Gestão Escolar Restrita', desc: 'Ambiente onde a coordenação pedagógica analisa estatísticas e gerencia acolhimentos.' }
      ]
    }
  ];

  const currentTopic = topics[activeTopicIndex];
  const progressPercent = Math.round((visitedTopics.length / topics.length) * 100);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn pb-20 relative">
      
      {/* CHUVA DE CONFETES SVG EM CASO DE VITÓRIA */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 45 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDuration: `${1.5 + Math.random() * 2}s`
              }}
            >
              <div 
                className="w-3 h-3 rounded-xs shadow-md"
                style={{
                  backgroundColor: ['#06b6d4', '#a855f7', '#f59e0b', '#ef4444', '#10b981'][i % 5]
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* 1. MEGA HERO BANNER COM AMBIENTE CINEMÁTICO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0e1628] via-[#090d18] to-[#060810] border border-cyan-500/40 p-6 sm:p-10 shadow-[0_0_60px_rgba(6,182,212,0.18)]">
        
        {/* Glows de Fundo */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[480px] h-[480px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -ml-32 -mb-32" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
              Academia Stop • EEMTI Alfredo Machado
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Aprenda Tudo Sobre o <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Stop</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              Explore este tour interativo de alta precisão. Descubra os recursos, teste os simuladores no smartphone virtual ao lado e conquiste seu <strong>Certificado Oficial com +50 XP</strong>.
            </p>

            {/* Controles de Som, Auto-Tour & Narração em Voz Alta */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  setAudioEnabled(!audioEnabled);
                  playSoundFx('click');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
                  audioEnabled 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30' 
                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                }`}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
                {audioEnabled ? 'Sons Ativos' : 'Silencioso'}
              </button>

              <button
                onClick={() => handleToggleVoice(currentTopic.speech)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
                  speakingActive 
                    ? 'bg-purple-600 text-white border-purple-400 animate-pulse' 
                    : 'bg-purple-950/40 text-purple-300 border-purple-500/40 hover:bg-purple-900/40'
                }`}
              >
                <Radio className="w-4 h-4" />
                {speakingActive ? 'Pausar Voz' : 'Ouvir Módulo (Voz)'}
              </button>

              <button
                onClick={() => {
                  setIsAutoTour(!isAutoTour);
                  if (!isAutoTour && audioEnabled) playSoundFx('success');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border cursor-pointer ${
                  isAutoTour
                    ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse'
                    : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/40'
                }`}
              >
                {isAutoTour ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAutoTour ? 'Parar Apresentação' : '▶ Modo Apresentador'}
              </button>

              <button
                onClick={() => setShowCertificate(true)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 flex items-center gap-1.5 transition-all cursor-pointer shadow-lg"
              >
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                Certificado Digital
              </button>
            </div>
          </div>

          {/* Card Flutuante de Progresso Geral */}
          <div className="w-full sm:w-80 p-5 rounded-2xl bg-[#090d18]/90 border border-cyan-500/40 shadow-2xl backdrop-blur-xl flex-shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" /> Progresso da Missão
              </span>
              <span className="font-mono text-xs font-black text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                {visitedTopics.length} / {topics.length} Módulos
              </span>
            </div>

            <div className="w-full bg-black/60 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.9)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-gray-400">{progressPercent}% do app dominado</span>
              {hasClaimedXp ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> +50 XP Conquistado
                </span>
              ) : (
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> Recompensa: +50 XP
                </span>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* 2. ESPAÇO CENTRAL: CONTEÚDO ELEBORADO + O SMARTPHONE VIRTUAL INTERATIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Painel Esquerdo: Menu Seletor & Conteúdo Elaborado (7 Colunas) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Seletor Rápido dos 10 Tópicos com Ícones e Glow */}
          <div className="p-3.5 rounded-2xl bg-[#090d18] border border-white/10 shadow-xl">
            <span className="text-[11px] font-black uppercase text-gray-400 px-2 pb-2 block tracking-wider">
              Navegue pelos 10 Módulos da Plataforma:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {topics.map((item, idx) => {
                const isSelected = activeTopicIndex === idx;
                const isVisited = visitedTopics.includes(idx);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTopic(idx)}
                    className={`p-2.5 rounded-xl flex flex-col items-center text-center gap-1.5 transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-b from-cyan-500/30 to-blue-600/20 text-white border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/50'
                        : isVisited
                        ? 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                        : 'bg-black/30 hover:bg-white/5 text-gray-400 border border-transparent'
                    }`}
                  >
                    <div className="relative">
                      {item.icon}
                      {isVisited && (
                        <div className="absolute -top-1 -right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
                      )}
                    </div>
                    <span className="text-[11px] font-bold leading-tight line-clamp-1">
                      {idx + 1}. {item.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cartão de Detalhes Elaborados do Tópico Selecionado */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#090d18] border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
            
            {/* Topo do Cartão com Badge e Ações */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {currentTopic.tag}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    Módulo {activeTopicIndex + 1} de 10
                  </span>
                </div>

                <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {currentTopic.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300">
                  {currentTopic.subtitle}
                </p>
              </div>

              {/* Botão de Ouvir o Tópico */}
              <button
                onClick={() => handleToggleVoice(currentTopic.speech)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex-shrink-0 ${
                  speakingActive
                    ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                }`}
                title="Ouvir explicação com voz neural"
              >
                <Volume2 className="w-5 h-5 text-cyan-400" />
              </button>
            </div>

            {/* 4 Pontos Chave Estruturados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentTopic.details.map((det, dIdx) => (
                <div 
                  key={dIdx} 
                  className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-cyan-500/40 transition-all space-y-1 group shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[10px] font-black group-hover:scale-110 transition-transform">
                      {dIdx + 1}
                    </div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {det.label}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed pl-7">
                    {det.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Ação Prática Direta Recomendada */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#0d1424] to-purple-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0 shadow-md">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    Simulador ao Vivo no Celular
                  </h4>
                  <p className="text-[11px] text-gray-400">
                    Clique nos botões e telas do telefone ao lado para experimentar a ação agora mesmo.
                  </p>
                </div>
              </div>

              {activeTopicIndex === 1 && (
                <button
                  onClick={() => onNavigate('denuncia')}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/30 transition-all cursor-pointer flex-shrink-0"
                >
                  <Megaphone className="w-3.5 h-3.5" /> Abrir Denúncia Real
                </button>
              )}

              {activeTopicIndex === 2 && (
                <button
                  onClick={onOpenCamouflage}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/30 transition-all cursor-pointer flex-shrink-0"
                >
                  <Gamepad2 className="w-3.5 h-3.5" /> Abrir Camuflagem Real
                </button>
              )}

              {activeTopicIndex === 4 && (
                <button
                  onClick={() => onNavigate('colecao')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex-shrink-0"
                >
                  <Layers className="w-3.5 h-3.5" /> Abrir Minha Coleção
                </button>
              )}

              {activeTopicIndex === 9 && (
                <button
                  onClick={() => onNavigate('ceara')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex-shrink-0"
                >
                  <Microscope className="w-3.5 h-3.5" /> Abrir Banner Científico
                </button>
              )}
            </div>

            {/* Controles de Navegação (Anterior / Próximo) */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrev}
                disabled={activeTopicIndex === 0}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-gray-300 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>

              <span className="text-xs font-bold text-gray-400 font-mono">
                {activeTopicIndex + 1} / {topics.length}
              </span>

              {activeTopicIndex < topics.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
                >
                  Próximo Módulo <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleClaimReward}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400" /> Resgatar Certificado & XP
                </button>
              )}
            </div>

          </div>

          {/* LABORATÓRIO DE DILEMAS ÉTICOS INTERATIVOS (Aprimoramento) */}
          <div className="p-6 rounded-3xl bg-[#090d18] border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Laboratório da Convivência: Dilema do Aluno
                </h3>
              </div>
              <span className="text-[10px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                +15 XP por resolução
              </span>
            </div>

            {/* Abas dos Dilemas */}
            <div className="flex gap-2">
              {dilemmas.map((dil, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDilemma(idx);
                    setDilemmaChoice(null);
                    if (audioEnabled) playSoundFx('tab');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDilemma === idx
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  Caso {idx + 1}: {dil.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Contexto do Dilema */}
            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
              <h4 className="text-xs font-black text-amber-300">{dilemmas[selectedDilemma].title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{dilemmas[selectedDilemma].context}</p>
            </div>

            {/* Opções de Resposta */}
            <div className="space-y-2">
              {dilemmas[selectedDilemma].options.map((opt, oIdx) => {
                const isSelected = dilemmaChoice === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      setDilemmaChoice(oIdx);
                      if (opt.correct) {
                        if (audioEnabled) playSoundFx('success');
                        if (!dilemmaXpAwarded) {
                          awardXp(15, 'Resolução de Dilema Ético Stop');
                          setDilemmaXpAwarded(true);
                          triggerConfetti();
                        }
                      } else {
                        if (audioEnabled) playSoundFx('alert');
                      }
                    }}
                    className={`w-full p-3 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? opt.correct
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-md'
                          : 'bg-red-950/80 border-red-400 text-red-300 shadow-md'
                        : 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="flex-1">{opt.text}</span>
                      {isSelected && (
                        opt.correct ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      )}
                    </div>

                    {isSelected && (
                      <p className={`text-[11px] mt-2 pt-2 border-t font-normal ${opt.correct ? 'border-emerald-500/30 text-emerald-200' : 'border-red-500/30 text-red-200'}`}>
                        {opt.feedback}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Painel Direito: O SMARTPHONE VIRTUAL INTERATIVO DE ALTA DEFINIÇÃO (5 Colunas) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          
          <div className="text-center sm:text-left flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <h3 className="font-display font-black text-sm text-white">
                Simulador ao Vivo do App Stop
              </h3>
            </div>
            <span className="text-[10px] uppercase font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
              Interativo 3D
            </span>
          </div>

          {/* Moldura de Smartphone com Reflexo e Bezel Metálico */}
          <div className="relative mx-auto w-full max-w-[340px] rounded-[44px] bg-[#020408] p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-[4px] border-[#222c42] ring-1 ring-cyan-500/30">
            
            {/* Dynamic Island / Câmera Frontal Interativa */}
            <div 
              onClick={() => {
                setPhoneNotification(phoneNotification ? null : '🔔 Stop: Sistema Operante 100%');
                if (audioEnabled) playSoundFx('click');
              }}
              className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center gap-2 px-2 border border-white/10 shadow-inner cursor-pointer hover:border-cyan-400/50 transition-colors"
              title="Toque na ilha dinâmica"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-900" />
            </div>

            {/* Barra de Status do Telefone */}
            <div className="relative z-30 flex items-center justify-between px-6 pt-2 pb-2 text-[10px] font-bold text-gray-400 font-mono select-none">
              <span>09:41</span>
              <div className="flex items-center gap-1.5 text-gray-300">
                <Wifi className="w-3 h-3 text-cyan-400" />
                <span className="text-[9px]">5G</span>
                <div className="w-4 h-2 border border-gray-400 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-emerald-400 rounded-xs" />
                </div>
              </div>
            </div>

            {/* Notificação Push Simulada no Topo do Celular */}
            {phoneNotification && (
              <div className="relative z-30 mx-2 mb-2 p-2 rounded-xl bg-cyan-950/90 border border-cyan-400/50 text-[10px] text-white flex items-center justify-between gap-1 shadow-lg animate-fadeIn">
                <span className="truncate">{phoneNotification}</span>
                <button 
                  onClick={() => setPhoneNotification(null)}
                  className="text-gray-400 hover:text-white p-0.5 cursor-pointer flex-shrink-0"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Tela Interna do Telefone */}
            <div className="relative z-10 w-full h-[590px] rounded-[32px] bg-[#070b14] overflow-hidden flex flex-col justify-between border border-white/10 shadow-inner select-none">
              
              {/* Topo da Tela do Telefone (A Barra Superior Replicada) */}
              <div className="p-2.5 bg-[#0e1424] border-b border-white/10 flex items-center justify-between gap-1 shadow-md relative z-20">
                {/* 1. Perfil */}
                <button
                  onClick={() => {
                    setActiveNavHighlight('perfil');
                    setDeviceScreen('avatar');
                    setPhoneMenuOpen(false);
                    if (audioEnabled) playSoundFx('click');
                  }}
                  className={`flex items-center gap-1.5 p-1 rounded-lg transition-all cursor-pointer ${
                    activeNavHighlight === 'perfil' ? 'bg-purple-600/30 border border-purple-400 ring-1 ring-purple-400' : 'hover:bg-white/5'
                  }`}
                  title="1. Perfil e Nível"
                >
                  <div className="w-6 h-6 rounded-md bg-black/60 flex items-center justify-center border border-white/20">
                    <User className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <span className="text-[10px] font-black text-white hidden xs:block">{userProfile.levelTitle.split(' ')[0]}</span>
                </button>

                {/* 2. Logo Stop */}
                <button
                  onClick={() => {
                    setActiveNavHighlight('logo');
                    setDeviceScreen('home');
                    setPhoneMenuOpen(false);
                    if (audioEnabled) playSoundFx('click');
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all cursor-pointer ${
                    activeNavHighlight === 'logo' ? 'bg-blue-600/30 border border-blue-400 ring-1 ring-blue-400' : 'hover:bg-white/5'
                  }`}
                  title="2. Logotipo Stop"
                >
                  <StopHandLogo size={14} />
                  <span className="font-display font-black text-xs text-white">Stop</span>
                </button>

                {/* 3. Denúncia */}
                <button
                  onClick={() => {
                    setActiveNavHighlight('denuncia');
                    setDeviceScreen('denuncia');
                    setPhoneMenuOpen(false);
                    if (audioEnabled) playSoundFx('click');
                  }}
                  className="px-2 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-md transition-all cursor-pointer ring-1 ring-red-400"
                  title="3. Canal de Denúncia"
                >
                  <Megaphone className="w-3 h-3" />
                  <span>Denúncia</span>
                </button>

                {/* 4. Três Pontinhos */}
                <button
                  onClick={() => {
                    setActiveNavHighlight('menu');
                    setPhoneMenuOpen(!phoneMenuOpen);
                    if (audioEnabled) playSoundFx('click');
                  }}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    phoneMenuOpen ? 'bg-cyan-500 text-black' : 'text-gray-300 hover:bg-white/5'
                  }`}
                  title="4. Menu Completo"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* MENU DROPDOWN REALISTA NO CELULAR (Aprimoramento) */}
              {phoneMenuOpen && (
                <div className="absolute top-12 right-2 z-40 w-44 rounded-2xl bg-[#0f172a]/95 border border-cyan-500/50 p-2 shadow-2xl backdrop-blur-md space-y-1 animate-fadeIn">
                  <span className="text-[9px] font-black uppercase text-gray-400 px-2 py-0.5 block tracking-wider">
                    Ferramentas Stop:
                  </span>
                  {[
                    { label: 'Página Inicial', screen: 'home', icon: <Compass className="w-3 h-3 text-cyan-400" /> },
                    { label: 'Denúncia Anônima', screen: 'denuncia', icon: <Megaphone className="w-3 h-3 text-red-400" /> },
                    { label: 'Modo Camuflagem', screen: 'camuflagem', icon: <Gamepad2 className="w-3 h-3 text-amber-400" /> },
                    { label: 'Minha Coleção', screen: 'avatar', icon: <Layers className="w-3 h-3 text-purple-400" /> },
                    { label: 'Apoio Emocional', screen: 'apoio', icon: <HeartHandshake className="w-3 h-3 text-emerald-400" /> },
                    { label: 'Semáforo Escolar', screen: 'semaforo', icon: <TrafficCone className="w-3 h-3 text-yellow-400" /> },
                    { label: 'Leis & 4 D’s', screen: 'leis', icon: <BookOpen className="w-3 h-3 text-blue-400" /> },
                    { label: 'SOS Emergência', screen: 'sos', icon: <AlertTriangle className="w-3 h-3 text-red-500" /> },
                    { label: 'Ceará Científico', screen: 'ceara', icon: <Microscope className="w-3 h-3 text-indigo-400" /> }
                  ].map((item, mIdx) => (
                    <button
                      key={mIdx}
                      onClick={() => {
                        setDeviceScreen(item.screen as any);
                        setPhoneMenuOpen(false);
                        if (audioEnabled) playSoundFx('tab');
                      }}
                      className="w-full text-left p-1.5 rounded-lg hover:bg-white/10 text-[10px] font-bold text-gray-200 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Corpo da Tela do Telefone (Conteúdo Dinâmico) */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-white relative">
                
                {/* Visualização: Barra Superior */}
                {deviceScreen === 'topbar' && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="p-3 rounded-2xl bg-[#0e1628] border border-cyan-500/40 text-center space-y-1">
                      <Compass className="w-6 h-6 text-cyan-400 mx-auto" />
                      <h4 className="text-xs font-black text-white">A Nova Barra Superior</h4>
                      <p className="text-[10px] text-gray-300">
                        Toque nos 4 botões acima para ver o aplicativo reagir imediatamente.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-purple-600/30 text-purple-300 flex items-center justify-center text-[10px] font-bold">1</div>
                        <div className="text-[10px]">
                          <span className="font-bold text-purple-300 block">Perfil & XP</span>
                          <span className="text-gray-400">Extrema esquerda</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-blue-600/30 text-blue-300 flex items-center justify-center text-[10px] font-bold">2</div>
                        <div className="text-[10px]">
                          <span className="font-bold text-blue-300 block">Logotipo Stop</span>
                          <span className="text-gray-400">Centro inicial</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-red-600/30 text-red-300 flex items-center justify-center text-[10px] font-bold">3</div>
                        <div className="text-[10px]">
                          <span className="font-bold text-red-300 block">Denúncia Carmesim</span>
                          <span className="text-gray-400">Ação de urgência</span>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-cyan-600/30 text-cyan-300 flex items-center justify-center text-[10px] font-bold">4</div>
                        <div className="text-[10px]">
                          <span className="font-bold text-cyan-300 block">Três Pontinhos (Menu)</span>
                          <span className="text-gray-400">Extrema direita</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visualização: Denúncia Interativa */}
                {deviceScreen === 'denuncia' && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold text-red-400 flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Canal Anônimo
                      </span>
                      <button
                        onClick={generateNewHash}
                        className="text-[10px] font-mono text-gray-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded cursor-pointer"
                      >
                        <RotateCcw className="w-2.5 h-2.5" /> {simulatedProtocol}
                      </button>
                    </div>

                    {!denunciaSubmitted ? (
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-400 font-bold block">Assunto:</label>
                          <select
                            value={simulatedCategory}
                            onChange={(e) => setSimulatedCategory(e.target.value)}
                            className="w-full bg-[#121829] border border-white/15 rounded-lg px-2 py-1 text-[11px] font-semibold text-white focus:outline-none"
                          >
                            <option value="Verbal / Apelidos">Ofensa Verbal</option>
                            <option value="Cyberbullying">Cyberbullying</option>
                            <option value="Exclusão">Exclusão Social</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-400 font-bold block">Relato (Simulação):</label>
                          <textarea
                            value={simulatedText}
                            onChange={(e) => setSimulatedText(e.target.value)}
                            className="w-full bg-[#121829] border border-white/15 rounded-lg p-2 text-[10px] text-gray-200 resize-none h-16 focus:outline-none"
                          />
                        </div>

                        <button
                          onClick={handleSimulateSubmit}
                          className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/30 cursor-pointer transition-all"
                        >
                          <Send className="w-3.5 h-3.5" /> Simular Envio Seguro
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2 animate-fadeIn">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                        <h4 className="text-xs font-black text-white">Relato Criptografado!</h4>
                        <p className="text-[10px] text-gray-300">
                          Seu protocolo confidencial é:
                        </p>
                        <div className="font-mono text-sm font-black text-emerald-300 bg-black/60 py-1 px-3 rounded-lg border border-emerald-500/30 tracking-wider">
                          {simulatedProtocol}
                        </div>
                        <button
                          onClick={() => setDenunciaSubmitted(false)}
                          className="text-[10px] text-gray-400 hover:text-white underline block mx-auto pt-1 cursor-pointer"
                        >
                          Fazer outra simulação
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Visualização: Camuflagem Interativa com Mini Jogo Arcade Real */}
                {deviceScreen === 'camuflagem' && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <Gamepad2 className="w-3.5 h-3.5" /> Camuflagem
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setCamuMode('app');
                            if (audioEnabled) playSoundFx('click');
                          }}
                          className={`text-[9px] px-2 py-0.5 rounded font-bold cursor-pointer ${camuMode === 'app' ? 'bg-cyan-600 text-white' : 'bg-white/10 text-gray-400'}`}
                        >
                          Normal
                        </button>
                        <button
                          onClick={() => {
                            setCamuMode('pacman');
                            if (audioEnabled) playSoundFx('arcade');
                          }}
                          className={`text-[9px] px-2 py-0.5 rounded font-bold cursor-pointer ${camuMode === 'pacman' ? 'bg-amber-500 text-black' : 'bg-white/10 text-gray-400'}`}
                        >
                          Pac-Man
                        </button>
                        <button
                          onClick={() => {
                            setCamuMode('calc');
                            if (audioEnabled) playSoundFx('click');
                          }}
                          className={`text-[9px] px-2 py-0.5 rounded font-bold cursor-pointer ${camuMode === 'calc' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-gray-400'}`}
                        >
                          Calculadora
                        </button>
                      </div>
                    </div>

                    {camuMode === 'app' && (
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center space-y-2">
                        <StopHandLogo size={32} />
                        <h4 className="text-xs font-black text-white">App Stop Visível</h4>
                        <p className="text-[10px] text-gray-400">
                          Alterne para os disfarces acima para ver a transformação imediata da tela.
                        </p>
                      </div>
                    )}

                    {camuMode === 'pacman' && (
                      <div className="p-3 rounded-2xl bg-blue-950/40 border border-amber-500/40 text-center space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-mono text-amber-300">
                          <span>1UP SCORE: {pacmanScore}</span>
                          <span>HIGH: 9990</span>
                        </div>
                        
                        {/* Mini Tabuleiro Jogável */}
                        <div className="bg-black p-3 rounded-xl border border-blue-600 font-mono text-xs flex flex-col items-center justify-center gap-1 min-h-[90px]">
                          <div className="text-amber-400 font-black text-base animate-pulse">
                            🟡 • • • 👻
                          </div>
                          <span className="text-[9px] text-gray-400">Toque nos controles para comer pontos:</span>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => {
                                setPacmanScore((s) => s + 10);
                                if (audioEnabled) playSoundFx('arcade');
                              }}
                              className="px-2 py-1 rounded bg-blue-600/40 text-blue-300 text-[10px] font-bold cursor-pointer"
                            >
                              ⬅ Esquerda
                            </button>
                            <button
                              onClick={() => {
                                setPacmanScore((s) => s + 10);
                                if (audioEnabled) playSoundFx('arcade');
                              }}
                              className="px-2 py-1 rounded bg-blue-600/40 text-blue-300 text-[10px] font-bold cursor-pointer"
                            >
                              Direita ➡
                            </button>
                          </div>
                        </div>
                        <p className="text-[9px] text-gray-400">
                          Quem estiver olhando pensará que é apenas um jogo arcade casual.
                        </p>
                      </div>
                    )}

                    {camuMode === 'calc' && (
                      <div className="p-2.5 rounded-2xl bg-black/70 border border-white/15 space-y-2">
                        <div className="p-2 rounded-lg bg-gray-900 border border-white/10 text-right font-mono text-sm font-black text-emerald-400">
                          {calcDisplay}
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                          {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map((btn) => (
                            <button
                              key={btn}
                              onClick={() => {
                                if (audioEnabled) playBreathTone(700, 30, true);
                                if (btn === 'C') setCalcDisplay('0');
                                else if (btn === '=') {
                                  try {
                                    const sanitized = calcDisplay.replace(/[^0-9+\-*/]/g, '');
                                    // eslint-disable-next-line no-eval
                                    setCalcDisplay(String(Function(`'use strict'; return (${sanitized})`)()));
                                  } catch {
                                    setCalcDisplay('Erro');
                                  }
                                } else {
                                  setCalcDisplay((prev) => prev === '0' ? btn : prev + btn);
                                }
                              }}
                              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-bold text-center cursor-pointer"
                            >
                              {btn}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Visualização: Avatar Fitting Room */}
                {deviceScreen === 'avatar' && (
                  <div className="space-y-3 animate-fadeIn text-center">
                    <span className="text-xs font-bold text-purple-300 flex items-center justify-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> Provador de Avatares Stop
                    </span>

                    <div className="w-20 h-20 rounded-2xl bg-black/80 border border-white/20 mx-auto flex items-center justify-center shadow-xl">
                      <AvatarRenderer
                        iconId={previewAvatar}
                        frameId={previewFrame}
                        badgeId="badge_none"
                        effectId="effect_pulse_glow"
                        size="md"
                        showBadge={false}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-gray-400 font-bold block">Trocar Personagem:</span>
                      <div className="flex justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setPreviewAvatar('icon_luffy_gear5');
                            if (audioEnabled) playSoundFx('click');
                          }}
                          className={`text-[9px] px-2 py-1 rounded font-bold cursor-pointer ${previewAvatar === 'icon_luffy_gear5' ? 'bg-amber-500 text-black' : 'bg-white/10 text-gray-300'}`}
                        >
                          Luffy
                        </button>
                        <button
                          onClick={() => {
                            setPreviewAvatar('icon_kakashi_sharingan');
                            if (audioEnabled) playSoundFx('click');
                          }}
                          className={`text-[9px] px-2 py-1 rounded font-bold cursor-pointer ${previewAvatar === 'icon_kakashi_sharingan' ? 'bg-amber-500 text-black' : 'bg-white/10 text-gray-300'}`}
                        >
                          Kakashi
                        </button>
                        <button
                          onClick={() => {
                            setPreviewAvatar('icon_anonimo_padrao');
                            if (audioEnabled) playSoundFx('click');
                          }}
                          className={`text-[9px] px-2 py-1 rounded font-bold cursor-pointer ${previewAvatar === 'icon_anonimo_padrao' ? 'bg-amber-500 text-black' : 'bg-white/10 text-gray-300'}`}
                        >
                          Gojo
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-gray-400 font-bold block">Trocar Moldura:</span>
                      <div className="flex justify-center gap-1.5">
                        <button
                          onClick={() => {
                            setPreviewFrame('frame_ouro_lideranca');
                            if (audioEnabled) playSoundFx('click');
                          }}
                          className={`text-[9px] px-2 py-1 rounded font-bold cursor-pointer ${previewFrame === 'frame_ouro_lideranca' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'}`}
                        >
                          Ouro
                        </button>
                        <button
                          onClick={() => {
                            setPreviewFrame('frame_cosmico_fenix');
                            if (audioEnabled) playSoundFx('click');
                          }}
                          className={`text-[9px] px-2 py-1 rounded font-bold cursor-pointer ${previewFrame === 'frame_cosmico_fenix' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'}`}
                        >
                          Cósmica
                        </button>
                        <button
                          onClick={() => {
                            setPreviewFrame('frame_holografico_cyber');
                            if (audioEnabled) playSoundFx('click');
                          }}
                          className={`text-[9px] px-2 py-1 rounded font-bold cursor-pointer ${previewFrame === 'frame_holografico_cyber' ? 'bg-purple-600 text-white' : 'bg-white/10 text-gray-300'}`}
                        >
                          Cyber
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visualização: Apoio Emocional */}
                {deviceScreen === 'apoio' && (
                  <div className="space-y-3 animate-fadeIn text-center">
                    <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                      <HeartHandshake className="w-3.5 h-3.5" /> Respiração Guiada 4-7-8
                    </span>

                    <div className="relative py-2">
                      <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-lg font-black text-white transition-all duration-1000 ${
                        breathingRunning
                          ? breathingStage === 'Inspire...'
                            ? 'bg-emerald-500/60 scale-110 shadow-[0_0_35px_rgba(16,185,129,0.9)]'
                            : breathingStage === 'Segure o ar...'
                            ? 'bg-amber-500/60 scale-100 shadow-[0_0_35px_rgba(245,158,11,0.9)]'
                            : 'bg-blue-500/60 scale-90 shadow-[0_0_35px_rgba(59,130,246,0.9)]'
                          : 'bg-emerald-950/80 border border-emerald-500/40'
                      }`}>
                        {breathingRunning ? breathingSeconds : <HeartHandshake className="w-8 h-8 text-emerald-400" />}
                      </div>
                      <span className="text-[11px] font-bold text-gray-300 block mt-2">
                        {breathingRunning ? breathingStage : 'Pronto para desacelerar?'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setBreathingRunning(!breathingRunning);
                        if (audioEnabled) playSoundFx('click');
                      }}
                      className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      {breathingRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      {breathingRunning ? 'Pausar' : 'Iniciar Treino'}
                    </button>

                    <div className="p-2 rounded-xl bg-black/40 border border-emerald-500/30 text-[10px] text-left">
                      <span className="font-bold text-emerald-300 block">Precisa desabafar agora?</span>
                      <span className="text-gray-400">Ligue 188 (CVV - Gratuito, 24 horas).</span>
                    </div>
                  </div>
                )}

                {/* Visualização: Semáforo */}
                {deviceScreen === 'semaforo' && (
                  <div className="space-y-3 animate-fadeIn">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <TrafficCone className="w-3.5 h-3.5" /> O Semáforo Escolar
                    </span>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedRisk('verde');
                          if (audioEnabled) playSoundFx('click');
                        }}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedRisk === 'verde' ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300' : 'bg-black/30 border-white/10 text-gray-400'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mx-auto block mb-0.5" />
                        <span className="text-[10px] font-bold block">Verde</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedRisk('amarelo');
                          if (audioEnabled) playSoundFx('click');
                        }}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedRisk === 'amarelo' ? 'bg-amber-950/80 border-amber-400 text-amber-300' : 'bg-black/30 border-white/10 text-gray-400'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mx-auto block mb-0.5" />
                        <span className="text-[10px] font-bold block">Amarelo</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedRisk('vermelho');
                          if (audioEnabled) playSoundFx('click');
                        }}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedRisk === 'vermelho' ? 'bg-red-950/80 border-red-400 text-red-300' : 'bg-black/30 border-white/10 text-gray-400'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 mx-auto block mb-0.5" />
                        <span className="text-[10px] font-bold block">Vermelho</span>
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 text-[10px] space-y-1">
                      {selectedRisk === 'verde' && (
                        <p className="text-gray-300 leading-relaxed">
                          <strong className="text-emerald-400">Verde:</strong> Conflito pontual. O foco é a mediação entre os estudantes em sala.
                        </p>
                      )}
                      {selectedRisk === 'amarelo' && (
                        <p className="text-gray-300 leading-relaxed">
                          <strong className="text-amber-400">Amarelo:</strong> Reincidência de apelidos ou isolamento. Acionamento dos pais e apoio pedagógico.
                        </p>
                      )}
                      {selectedRisk === 'vermelho' && (
                        <p className="text-gray-300 leading-relaxed">
                          <strong className="text-red-400">Vermelho:</strong> Ameaça à integridade física. Proteção imediata e conselho tutelar.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Visualização: Leis */}
                {deviceScreen === 'leis' && (
                  <div className="space-y-2 animate-fadeIn">
                    <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Legislação & 4 D's
                    </span>

                    <div className="space-y-1.5 text-[10px]">
                      <div className="p-2 rounded-xl bg-black/40 border border-blue-500/30">
                        <strong className="text-blue-300 block">Lei 14.811/2024:</strong>
                        <span className="text-gray-300">Bullying e cyberbullying no Código Penal brasileiro.</span>
                      </div>

                      <div className="p-2 rounded-xl bg-black/40 border border-blue-500/30">
                        <strong className="text-amber-300 block">Os 4 D's de Resposta:</strong>
                        <span className="text-gray-300">Direto, Distrair, Delegar e Dar Apoio à vítima.</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Visualização: SOS com Radar Satélite Pulsante */}
                {deviceScreen === 'sos' && (
                  <div className="space-y-3 animate-fadeIn text-center">
                    <span className="text-xs font-bold text-red-500 flex items-center justify-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Botão de Pânico GPS
                    </span>

                    {/* Radar Animado */}
                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-red-500/40 animate-ping" />
                      <div className="w-14 h-14 rounded-full bg-red-600/40 border border-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.8)]">
                        <AlertTriangle className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-red-950/40 border border-red-500/40 text-[10px] text-gray-300 space-y-1">
                      <div className="flex items-center justify-between font-mono text-[9px] text-red-300">
                        <span>LAT: -4.9667° S</span>
                        <span>LONG: -39.5833° W</span>
                      </div>
                      <span className="block text-gray-400">Madalena / CE • EEMTI Alfredo Machado</span>
                    </div>
                  </div>
                )}

                {/* Visualização: Ceará Científico */}
                {deviceScreen === 'ceara' && (
                  <div className="space-y-3 animate-fadeIn text-center">
                    <span className="text-xs font-bold text-indigo-400 flex items-center justify-center gap-1">
                      <Microscope className="w-3.5 h-3.5" /> Ceará Científico 2026
                    </span>

                    <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 text-[10px] space-y-1.5">
                      <h4 className="font-bold text-white text-xs">EEMTI Alfredo Machado</h4>
                      <p className="text-gray-300">
                        Pesquisa científica escolar integrando direitos humanos e inteligência computacional.
                      </p>
                    </div>
                  </div>
                )}

                {/* Visualização: Home */}
                {deviceScreen === 'home' && (
                  <div className="space-y-2.5 animate-fadeIn">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white text-center space-y-1 shadow-lg">
                      <StopHandLogo size={24} />
                      <h4 className="text-xs font-black">Bem-vindo ao Stop</h4>
                      <p className="text-[10px] text-red-100">
                        Espaço seguro para todos os estudantes da EEMTI Alfredo Machado.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Barra Inferior Virtual do Telefone */}
              <div className="p-2 bg-[#0a0e1a] border-t border-white/10 flex items-center justify-around text-[10px] text-gray-400 font-bold">
                <button 
                  onClick={() => {
                    setDeviceScreen('home');
                    if (audioEnabled) playSoundFx('tab');
                  }}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Início
                </button>
                <button 
                  onClick={() => {
                    setDeviceScreen('denuncia');
                    if (audioEnabled) playSoundFx('tab');
                  }}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  Denúncia
                </button>
                <button 
                  onClick={() => {
                    setDeviceScreen('avatar');
                    if (audioEnabled) playSoundFx('tab');
                  }}
                  className="hover:text-purple-400 transition-colors cursor-pointer"
                >
                  Coleção
                </button>
                <button 
                  onClick={() => {
                    setDeviceScreen('apoio');
                    if (audioEnabled) playSoundFx('tab');
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Apoio
                </button>
              </div>

              {/* Indicador Home do iOS/Android */}
              <div className="w-24 h-1 bg-white/30 rounded-full mx-auto my-1.5" />

            </div>

          </div>

          <p className="text-[11px] text-center text-gray-400">
            * O simulador reflete fielmente as páginas e funções do aplicativo real.
          </p>

        </div>

      </div>

      {/* 3. MODAL DO CERTIFICADO OFICIAL COM SELO HOLOGRÁFICO & QR CODE */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#11192e] via-[#0b101e] to-[#060810] border-2 border-amber-500/60 p-6 sm:p-8 shadow-[0_0_80px_rgba(245,158,11,0.35)] relative space-y-6">
            
            {/* Fechar Modal */}
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Brasão do Certificado */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider shadow-inner">
                <Award className="w-4 h-4 text-amber-400" /> Certificado de Capacitação Oficial
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                Guardião da Cultura de Paz
              </h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Certificamos que o estudante concluiu integralmente o treinamento pedagógico sobre prevenção ao bullying e uso ético da plataforma Stop.
              </p>
            </div>

            {/* Dados do Estudante & Selo Holográfico */}
            <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase block">Código Anônimo do Estudante:</span>
                <span className="font-mono text-lg font-black text-amber-300 tracking-wider">{studentIdentity.code}</span>
                <span className="text-xs text-gray-300 block">EEMTI Alfredo Machado • Madalena/CE</span>
                <span className="text-[11px] text-cyan-400 font-semibold block">Projeto Concorrente ao Ceará Científico 2026</span>
              </div>

              {/* Selo Dourado Holográfico com QR Code */}
              <div className="flex items-center gap-3 bg-amber-950/40 p-3 rounded-2xl border border-amber-500/40 flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-inner">
                  <QrCode className="w-7 h-7" />
                </div>
                <div className="text-left text-[10px]">
                  <span className="font-bold text-white block uppercase">Chave de Autenticação:</span>
                  <span className="font-mono text-amber-300 block">#CERT-2026-STOP</span>
                  <span className="text-emerald-400 font-bold block">✓ Válido Oficialmente</span>
                </div>
              </div>

            </div>

            {/* Ações do Certificado */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" /> {copiedCode ? 'Código Copiado!' : 'Copiar Identificador'}
              </button>

              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Imprimir / Salvar PDF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
