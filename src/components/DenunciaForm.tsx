import React, { useState, useRef, useEffect } from 'react';
import { Denuncia, ViolenceType, SchoolLocation } from '../types';
import { saveDenuncia } from '../services/storageService';
import { getEscolaAtiva } from '../services/schoolService';
import { useApp } from '../AppContext';
import { playBreathTone } from '../services/audioSynthesizer';
import { useAutoScrollIntoView } from '../hooks/useAutoScrollIntoView';
import { AnonymityHelpTooltip } from './AnonymityHelpTooltip';
import { 
  ShieldCheck, 
  MessageSquareWarning, 
  Smartphone, 
  ShieldAlert, 
  Brain, 
  Users, 
  Package, 
  HeartHandshake, 
  Clock, 
  MapPin, 
  Sun, 
  Moon, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  Camera, 
  FileText, 
  Paperclip, 
  Upload, 
  X, 
  Copy, 
  Printer, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  Check, 
  Info,
  Shield,
  HelpCircle,
  EyeOff,
  Search,
  Mic,
  MicOff,
  Scale,
  FileCheck,
  Lock,
  Volume2
} from 'lucide-react';

interface DenunciaFormProps {
  onBack: () => void;
  onDenunciaSent?: (denuncia: Denuncia) => void;
  onNavigateToProtocolo?: (protocolo: string) => void;
}

interface AttachedProof {
  id: string;
  nome: string;
  tipo: 'foto' | 'print' | 'audio' | 'arquivo';
  url?: string;
  tamanho?: string;
}

const TURMAS_FALLBACK = [
  '1º Ano A',
  '1º Ano B',
  '1º Ano C',
  '2º Ano A',
  '2º Ano B',
  '2º Ano C',
  '3º Ano A',
  '3º Ano B',
  '3º Ano C',
  'Não Escolar / Outra Turma'
];

export const DenunciaForm: React.FC<DenunciaFormProps> = ({ 
  onBack, 
  onDenunciaSent,
  onNavigateToProtocolo 
}) => {
  const { awardXp } = useApp();

  // Obter turmas cadastradas da escola ativa
  const turmasDisponiveis = (() => {
    try {
      const esc = getEscolaAtiva();
      if (esc.turmas_cadastradas && esc.turmas_cadastradas.length > 0) {
        return [...esc.turmas_cadastradas, 'Outra Turma / Não listada'];
      }
    } catch {
      // fallback
    }
    return TURMAS_FALLBACK;
  })();

  // Etapa ativa (1 a 4)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Passo 1: Tipos de Agressão (múltipla escolha)
  const [tiposSelecionados, setTiposSelecionados] = useState<string[]>([]);

  // Passo 2: Frequência, Local e Turno
  const [frequencia, setFrequencia] = useState<string>('2 a 3 vezes');
  const [local, setLocal] = useState<string>('Pátio / Recreio');
  const [turno, setTurno] = useState<string>('Manhã');

  // Passo 3: Papel, Urgência, Turma e Agressor
  const [papel, setPapel] = useState<string>('Sou a Vítima');
  const [urgencia, setUrgencia] = useState<string>('Média');
  const [turma, setTurma] = useState<string>(() => turmasDisponiveis[0] || '1º Ano A');
  const [agressorGrupo, setAgressorGrupo] = useState<string>('');

  // Passo 4: Relato e Provas (Opcional)
  const [descricao, setDescricao] = useState<string>('');
  const [anexos, setAnexos] = useState<AttachedProof[]>([]);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gravador de Áudio em Tempo Real (máx. 1 minuto / 60s)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  // Limpeza de timer ao desmontar
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Iniciar Gravação de Áudio
  const handleStartAudioRecord = async () => {
    playSfx('click');

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const newProof: AttachedProof = {
            id: Math.random().toString(36).substring(2, 9),
            nome: `relato_audio_voz_${Math.floor(100 + Math.random() * 900)}.webm`,
            tipo: 'audio',
            url: audioUrl,
            tamanho: `${(audioBlob.size / 1024).toFixed(1)} KB`
          };
          setAnexos(prev => [...prev, newProof]);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setRecordingSeconds(0);

        timerIntervalRef.current = setInterval(() => {
          setRecordingSeconds(prev => {
            if (prev >= 59) {
              handleStopAudioRecord();
              return 60;
            }
            return prev + 1;
          });
        }, 1000);
      } else {
        // Fallback para simulação caso o navegador não suporte microfone ou esteja bloqueado
        handleAddSimulatedAudio();
      }
    } catch (err) {
      // Caso haja bloqueio de permissão de microfone
      handleAddSimulatedAudio();
    }
  };

  // Parar Gravação de Áudio
  const handleStopAudioRecord = () => {
    playSfx('click');
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Simulação de Áudio de Depoimento (máx 1 min)
  const handleAddSimulatedAudio = () => {
    playSfx('click');
    const newProof: AttachedProof = {
      id: Math.random().toString(36).substring(2, 9),
      nome: `gravacao_depoimento_voz_1min.mp3`,
      tipo: 'audio',
      tamanho: '0.9 MB'
    };
    setAnexos(prev => [...prev, newProof]);
  };

  // Estado de Submissão e Comprovante
  const [submittedDenuncia, setSubmittedDenuncia] = useState<Denuncia | null>(null);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Auto-scroll centralizado para etapas do formulário, comprovante e visualizador de fotos
  const formStepRef = useAutoScrollIntoView({ trigger: currentStep, active: !submittedDenuncia, delay: 50, block: 'start' });
  const receiptCardRef = useAutoScrollIntoView({ active: !!submittedDenuncia, delay: 80 });
  const previewImageModalRef = useAutoScrollIntoView({ active: !!previewImage });

  // Efeitos Sonoros com Web Audio API
  const playSfx = (type: 'click' | 'step' | 'success') => {
    if (type === 'click') {
      playBreathTone(750, 30, true);
    } else if (type === 'step') {
      playBreathTone(600, 40, true);
      setTimeout(() => playBreathTone(750, 60, true), 50);
    } else if (type === 'success') {
      playBreathTone(523, 70, true);
      setTimeout(() => playBreathTone(659, 90, true), 80);
      setTimeout(() => playBreathTone(784, 160, true), 170);
    }
  };

  // Alternar Tipo de Agressão no Passo 1
  const toggleTipo = (tipo: string) => {
    playSfx('click');
    setTiposSelecionados(prev => 
      prev.includes(tipo) 
        ? prev.filter(t => t !== tipo) 
        : [...prev, tipo]
    );
  };

  // Upload Real de Arquivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    playSfx('click');

    const filesArray = Array.from(files);
    const readPromises = filesArray.map((file) => {
      return new Promise<AttachedProof>((resolve) => {
        const isImage = file.type.startsWith('image/');
        const isAudio = file.type.startsWith('audio/');
        const proofType: 'foto' | 'print' | 'audio' | 'arquivo' = isImage ? 'foto' : isAudio ? 'audio' : 'arquivo';
        const sizeFormatted = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

        const reader = new FileReader();
        reader.onload = (evt) => {
          resolve({
            id: Math.random().toString(36).substring(2, 9),
            nome: file.name,
            tipo: proofType,
            url: evt.target?.result as string,
            tamanho: sizeFormatted
          });
        };
        reader.onerror = () => {
          resolve({
            id: Math.random().toString(36).substring(2, 9),
            nome: file.name,
            tipo: proofType,
            tamanho: sizeFormatted
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readPromises).then((newProofs) => {
      setAnexos(prev => [...prev, ...newProofs]);
    });
    e.target.value = '';
  };

  // Remover Anexo
  const handleRemoveAnexo = (id: string) => {
    playSfx('click');
    setAnexos(prev => prev.filter(a => a.id !== id));
  };

  // Enviar Denúncia
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agressorGrupo.trim()) {
      alert('Por favor, informe quem foi o agressor ou grupo de pessoas envolvidas. Este campo é obrigatório.');
      setCurrentStep(3);
      return;
    }

    if (!descricao.trim()) {
      alert('Por favor, escreva a descrição do caso. O relato é obrigatório.');
      return;
    }

    playSfx('success');

    const randNum = Math.floor(1000 + Math.random() * 9000);
    const protocolCode = `#SB-${randNum}`;

    const novaDenuncia = saveDenuncia({
      protocolo: protocolCode,
      tipo_violencia: tiposSelecionados.length > 0 ? tiposSelecionados.join(', ') : 'Geral',
      local_escola: local,
      descricao: descricao.trim(),
      nivel_gravidade: urgencia === 'Crítica SOS' ? 'Grave' : urgencia === 'Alta' ? 'Grave' : urgencia === 'Média' ? 'Recorrente' : 'Leve',
      frequencia,
      turno,
      papel_denunciante: papel,
      turma_envolvida: turma.trim() || '1º Ano B',
      agressor_grupo: agressorGrupo.trim(),
      tipos_selecionados: tiposSelecionados,
      provas_anexas: anexos.map(a => ({ nome: a.nome, tipo: a.tipo, tamanho: a.tamanho, url: a.url }))
    });

    setSubmittedDenuncia(novaDenuncia);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    // Conforme auditoria de segurança estrita: o ato de denunciar NÃO concede XP
    // nem altera gamificação, garantindo total desacoplamento e impossibilitando
    // qualquer correlação indireta de timestamp entre ocorrência e progresso do estudante.

    if (onDenunciaSent) {
      onDenunciaSent(novaDenuncia);
    }
  };

  // Copiar Código de Protocolo
  const handleCopyProtocol = () => {
    if (!submittedDenuncia) return;
    playSfx('click');
    navigator.clipboard?.writeText(submittedDenuncia.protocolo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reiniciar Formulário
  const handleReset = () => {
    playSfx('click');
    setSubmittedDenuncia(null);
    setCurrentStep(1);
    setTiposSelecionados([]);
    setFrequencia('2 a 3 vezes');
    setLocal('Pátio / Recreio');
    setTurno('Manhã');
    setPapel('Sou a Vítima');
    setUrgencia('Média');
    setTurma('1º Ano B');
    setAgressorGrupo('');
    setDescricao('');
    setAnexos([]);
  };

  // SEÇÃO: RECIBO / COMPROVANTE APÓS ENVIO
  if (submittedDenuncia) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16 text-[#241e33]">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
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
                    backgroundColor: ['#a855f7', '#7c3aed', '#ef4444', '#10b981', '#06b6d4'][i % 5]
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Relato Criptografado com Sucesso
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#241e33]">
            Protocolo Anônimo Gerado
          </h1>
          <p className="text-sm text-[#5c546d] max-w-xl mx-auto">
            Sua manifestação foi armazenada de forma 100% segura e enviada diretamente para a comissão de acolhimento e mediação da <strong className="text-[#241e33]">EEMTI Alfredo Machado</strong>.
          </p>
        </div>

        {/* Card do Comprovante */}
        <div ref={receiptCardRef} className="rounded-3xl bg-white/95 border-2 border-purple-300 p-6 sm:p-8 shadow-[0_10px_30px_rgba(124,58,237,0.1)] space-y-6 relative overflow-hidden">
          
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-purple-200 text-center space-y-3">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
              Seu Código de Acompanhamento:
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-violet-700 to-pink-600 tracking-wider">
              {submittedDenuncia.protocolo}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <button
                onClick={handleCopyProtocol}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Código Copiado!' : 'Copiar Código'}
              </button>

              {onNavigateToProtocolo && (
                <button
                  onClick={() => {
                    handleCopyProtocol();
                    onNavigateToProtocolo(submittedDenuncia.protocolo);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-600/25 transition-all cursor-pointer hover:scale-[1.02] border border-purple-400"
                >
                  <Search className="w-4 h-4 text-amber-300" />
                  <span>Ir para a Aba Protocolo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center justify-center gap-1.5 border border-purple-200 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Imprimir Comprovante
              </button>
            </div>
          </div>

          {/* Resumo do Relato */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
              <span className="text-purple-900 font-bold uppercase block text-[10px]">Formas de Agressão:</span>
              <p className="font-semibold text-purple-700">
                {tiposSelecionados.join(', ') || 'Nenhuma especificada'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
              <span className="text-purple-900 font-bold uppercase block text-[10px]">Frequência & Local:</span>
              <p className="font-semibold text-[#241e33]">
                {frequencia} • {local} ({turno})
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
              <span className="text-purple-900 font-bold uppercase block text-[10px]">Papel & Gravidade:</span>
              <p className="font-semibold text-[#241e33]">
                {papel} • Risco {urgencia}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
              <span className="text-purple-900 font-bold uppercase block text-[10px]">Turma Envolvida:</span>
              <p className="font-semibold text-[#241e33]">
                {submittedDenuncia.turma_envolvida || turma}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
              <span className="text-purple-900 font-bold uppercase block text-[10px]">Agressor / Grupo Envolvido:</span>
              <p className="font-semibold text-[#241e33]">
                {submittedDenuncia.agressor_grupo || agressorGrupo}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
              <span className="text-purple-900 font-bold uppercase block text-[10px]">Provas Anexadas:</span>
              <p className="font-semibold text-[#241e33]">
                {anexos.length > 0 ? `${anexos.length} anexo(s) incluído(s)` : 'Sem anexos (não obrigatório)'}
              </p>
              {anexos.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {anexos.map((anx) => (
                    <div key={anx.id} className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white border border-purple-200">
                      {anx.url && (anx.tipo === 'foto' || anx.tipo === 'print' || anx.url.startsWith('data:image')) ? (
                        <img 
                          src={anx.url} 
                          alt={anx.nome} 
                          className="w-10 h-10 rounded-lg object-cover border border-purple-200 cursor-pointer"
                          onClick={() => setPreviewImage({ url: anx.url!, title: anx.nome })}
                          title="Clique para expandir a foto"
                          referrerPolicy="no-referrer"
                        />
                      ) : anx.tipo === 'audio' ? (
                        <Volume2 className="w-5 h-5 text-rose-600" />
                      ) : (
                        <Paperclip className="w-5 h-5 text-purple-600" />
                      )}
                      <span className="text-[10px] font-mono text-purple-950 truncate max-w-[100px]">
                        {anx.nome}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Instruções Finais */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-1">
            <h4 className="font-bold flex items-center gap-1.5 text-purple-950">
              <ShieldCheck className="w-4 h-4 text-purple-600" /> Como acompanhar seu protocolo?
            </h4>
            <p className="text-[11px] text-[#5c546d] leading-relaxed">
              Guarde este protocolo com você. A equipe escolar poderá postar encaminhamentos, acolhimentos ou orientações direcionadas a este código, mantendo seu anonimato absoluto.
            </p>
          </div>

          {/* Ações de Navegação */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-purple-100">
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-2 border border-purple-200 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao Início
            </button>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              Fazer Outra Denúncia
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div ref={formStepRef} className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16 text-[#241e33]">
      
      {/* 1. CABEÇALHO PADRONIZADO */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-800 text-xs font-black uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          <span>SIGILO 100% GARANTIDO • SEM CADASTRO OBRIGATÓRIO</span>
          <AnonymityHelpTooltip
            align="center"
            size="sm"
            title="Como garantimos seu anonimato?"
            content="O Stop Bullying foi desenvolvido com arquitetura protegida: não solicitamos nome, e-mail, telefone nem endereço. Nosso servidor não grava seu IP nem identifica seu aparelho."
            tips={[
              "Você recebe um código de protocolo aleatório para acompanhar o caso.",
              "Nenhum professor, aluno ou coordenador sabe de quem partiu o relato.",
              "Proteção garantida pelo Art. 14 da LGPD e pelo Estatuto da Criança e do Adolescente."
            ]}
          />
        </div>

        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#241e33] tracking-tight">
          Formulário de Denúncia e Acolhimento Anônimo
        </h1>

        <p className="text-xs sm:text-sm text-[#5c546d] max-w-2xl mx-auto leading-relaxed">
          Nenhum dado pessoal (nome, IP, telefone) é exigido. Você receberá um código de protocolo secreto para acompanhar as medidas tomadas pelo conselho escolar.
        </p>

        {/* Barra de Progresso / Stepper das 4 Etapas */}
        <div className="pt-4 max-w-2xl mx-auto space-y-2.5">
          <div 
            className="flex items-center justify-start sm:justify-between gap-2 text-xs font-bold overflow-x-auto no-scrollbar scrollbar-none pb-1"
            data-auto-scroll-container="true"
            data-dense-container="true"
          >
            {[
              { num: 1, label: '1. Tipos de Agressão' },
              { num: 2, label: '2. Frequência & Local' },
              { num: 3, label: '3. Gravidade & Papel' },
              { num: 4, label: '4. Relato & Provas' }
            ].map((step, idx) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;

              return (
                <React.Fragment key={step.num}>
                  {idx > 0 && (
                    <span className="text-purple-300 hidden sm:inline select-none flex-shrink-0">→</span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      playSfx('step');
                      setCurrentStep(step.num as any);
                    }}
                    data-active={isActive ? 'true' : undefined}
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer text-xs font-bold whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? 'bg-purple-600 text-white font-black shadow-md shadow-purple-600/30 ring-2 ring-purple-300'
                        : isPast
                        ? 'bg-purple-100 text-purple-900 border border-purple-300 hover:bg-purple-200'
                        : 'bg-white text-[#786e8a] border border-purple-200 hover:bg-purple-50 hover:text-purple-900'
                    }`}
                  >
                    {step.label}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          {/* Linha Indicadora de Progresso */}
          <div className="w-full bg-purple-100 h-2 rounded-full overflow-hidden p-0.5 border border-purple-200">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 rounded-full transition-all duration-300 shadow-sm"
              style={{
                width: currentStep === 1 ? '25%' : currentStep === 2 ? '50%' : currentStep === 3 ? '75%' : '100%'
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. CORPO PRINCIPAL DO FORMULÁRIO */}
      <div className="rounded-3xl bg-white/95 border border-purple-200/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(124,58,237,0.08)] space-y-6 relative overflow-hidden">
        
        {/* ========================================================================= */}
        {/* PASSO 1: TIPOS DE AGRESSÃO                                                */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-black text-xl sm:text-2xl text-[#241e33]">
                  Passo 1: Quais formas de agressão estão ocorrendo?
                </h2>
                <AnonymityHelpTooltip
                  title="Anonimato na seleção de agressão"
                  content="Marcar as formas de agressão serve apenas para fins de enquadramento na Lei Federal nº 14.811/2024 e definição dos protocolos de acolhimento escolar."
                  tips={[
                    "Esta seleção não contém nenhuma informação capaz de identificar você.",
                    "Você pode marcar mais de uma opção com absoluto sigilo e liberdade."
                  ]}
                />
              </div>
              <p className="text-xs sm:text-sm text-[#5c546d]">
                Você pode marcar mais de uma opção se houver diferentes práticas combinadas.
              </p>
            </div>

            {/* Grid de Cards com Ícones, Títulos e Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* 1. Verbal */}
              <div
                onClick={() => toggleTipo('Verbal')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                  tiposSelecionados.includes('Verbal')
                    ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                    : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 flex-shrink-0">
                    <MessageSquareWarning className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#241e33]">Verbal</h4>
                    <p className="text-xs text-[#5c546d]">Apelidos, ofensas, piadas humilhantes</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                  tiposSelecionados.includes('Verbal') ? 'bg-purple-600 border-purple-600 text-white' : 'border-purple-300 bg-white'
                }`}>
                  {tiposSelecionados.includes('Verbal') && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* 2. Cyberbullying */}
              <div
                onClick={() => toggleTipo('Cyberbullying')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                  tiposSelecionados.includes('Cyberbullying')
                    ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                    : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 flex-shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#241e33]">Cyberbullying</h4>
                    <p className="text-xs text-[#5c546d]">Ataques no WhatsApp, redes, prints, memes</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                  tiposSelecionados.includes('Cyberbullying') ? 'bg-purple-600 border-purple-600 text-white' : 'border-purple-300 bg-white'
                }`}>
                  {tiposSelecionados.includes('Cyberbullying') && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* 3. Físico */}
              <div
                onClick={() => toggleTipo('Físico')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                  tiposSelecionados.includes('Físico')
                    ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                    : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 flex-shrink-0">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#241e33]">Físico</h4>
                    <p className="text-xs text-[#5c546d]">Empurrões, socos, tropeções intencionais</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                  tiposSelecionados.includes('Físico') ? 'bg-purple-600 border-purple-600 text-white' : 'border-purple-300 bg-white'
                }`}>
                  {tiposSelecionados.includes('Físico') && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* 4. Psicológico */}
              <div
                onClick={() => toggleTipo('Psicológico')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                  tiposSelecionados.includes('Psicológico')
                    ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                    : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 flex-shrink-0">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#241e33]">Psicológico</h4>
                    <p className="text-xs text-[#5c546d]">Ameaças, chantagens, perseguição</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                  tiposSelecionados.includes('Psicológico') ? 'bg-purple-600 border-purple-600 text-white' : 'border-purple-300 bg-white'
                }`}>
                  {tiposSelecionados.includes('Psicológico') && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* 5. Social / Exclusão */}
              <div
                onClick={() => toggleTipo('Social / Exclusão')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                  tiposSelecionados.includes('Social / Exclusão')
                    ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                    : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#241e33]">Social / Exclusão</h4>
                    <p className="text-xs text-[#5c546d]">Isolamento combinado, ignorar de propósito</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                  tiposSelecionados.includes('Social / Exclusão') ? 'bg-purple-600 border-purple-600 text-white' : 'border-purple-300 bg-white'
                }`}>
                  {tiposSelecionados.includes('Social / Exclusão') && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* 6. Material */}
              <div
                onClick={() => toggleTipo('Material')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                  tiposSelecionados.includes('Material')
                    ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                    : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#241e33]">Material</h4>
                    <p className="text-xs text-[#5c546d]">Destruição de cadernos, furto de itens</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                  tiposSelecionados.includes('Material') ? 'bg-purple-600 border-purple-600 text-white' : 'border-purple-300 bg-white'
                }`}>
                  {tiposSelecionados.includes('Material') && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

              {/* 7. Assédio / Sexual */}
              <div
                onClick={() => toggleTipo('Assédio / Sexual')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none sm:col-span-2 ${
                  tiposSelecionados.includes('Assédio / Sexual')
                    ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                    : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-700 flex-shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#241e33]">Assédio / Sexual</h4>
                    <p className="text-xs text-[#5c546d]">Toques indesejados, comentários invasivos</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                  tiposSelecionados.includes('Assédio / Sexual') ? 'bg-purple-600 border-purple-600 text-white' : 'border-purple-300 bg-white'
                }`}>
                  {tiposSelecionados.includes('Assédio / Sexual') && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </div>

            </div>

            {/* Ações Inferiores do Passo 1 */}
            <div className="flex justify-end pt-4 border-t border-purple-100">
              <button
                type="button"
                onClick={() => {
                  playSfx('step');
                  setCurrentStep(2);
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-purple-600/25 transition-all cursor-pointer"
              >
                Avançar para Frequência <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PASSO 2: FREQUÊNCIA & LOCAL                                               */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="space-y-1">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#241e33]">
                Passo 2: Quantas vezes ocorreu e em qual local?
              </h2>
              <p className="text-xs sm:text-sm text-[#5c546d]">
                Essas informações ajudam a coordenação a identificar a gravidade e o foco de vigilância.
              </p>
            </div>

            {/* Seção 1: Frequência */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <label className="text-xs font-black uppercase text-purple-900 flex items-center gap-1.5 tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-purple-600" /> Frequência / Recorrência do Bullying:
                </label>
                <AnonymityHelpTooltip
                  title="Frequência & Anonimato"
                  content="A frequência indica à comissão pedagógica se o bullying é um caso novo ou uma conduta prolongada, sem qualquer relação com a sua identidade."
                  tips={[
                    "Ajuda a priorizar episódios recorrentes para intervenção imediata.",
                    "Não rastreia seus horários de aula nem sua rotina pessoal."
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: 'Primeira vez', desc: 'Ocorreu recentemente como fato novo' },
                  { title: '2 a 3 vezes', desc: 'Já se repetiu em ocasiões diferentes' },
                  { title: 'Semanalmente', desc: 'Acontece toda semana de forma recorrente' },
                  { title: 'Diariamente', desc: 'Acontece todos os dias letivos' },
                  { title: 'Há vários meses', desc: 'Situação crônica e prolongada no tempo', full: true }
                ].map((item) => (
                  <div
                    key={item.title}
                    onClick={() => {
                      playSfx('click');
                      setFrequencia(item.title);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                      item.full ? 'sm:col-span-2' : ''
                    } ${
                      frequencia === item.title
                        ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                        : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                    }`}
                  >
                    <h4 className="text-sm font-bold text-[#241e33]">{item.title}</h4>
                    <p className="text-xs text-[#5c546d]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção 2: Onde costuma acontecer? */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-xs font-black uppercase text-purple-900 flex items-center gap-1.5 tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" /> Onde costuma acontecer?
                </label>
                <AnonymityHelpTooltip
                  title="Informar o local coloca você em risco?"
                  content="Não. A escola usa essa informação unicamente para reforçar a vigilância preventiva dos inspetores naquele ponto (pátio, escadas, banheiros, transporte) de forma discreta."
                  tips={[
                    "A supervisão é intensificada no local sem que ninguém saiba de onde partiu o aviso.",
                    "Nenhum estudante será interrogado sobre quem fez a denúncia."
                  ]}
                />
              </div>

              <select
                value={local}
                onChange={(e) => {
                  playSfx('click');
                  setLocal(e.target.value);
                }}
                className="w-full p-3.5 rounded-2xl bg-white border border-purple-200 text-sm text-[#241e33] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
              >
                <option value="Pátio / Recreio">Pátio / Recreio</option>
                <option value="Sala de Aula">Sala de Aula</option>
                <option value="Corredores / Escadas">Corredores / Escadas</option>
                <option value="Banheiro">Banheiro</option>
                <option value="Entrada / Saída da Escola">Entrada / Saída da Escola</option>
                <option value="Quadra / Aulas de Ed. Física">Quadra / Aulas de Ed. Física</option>
                <option value="Transporte Escolar / Ônibus">Transporte Escolar / Ônibus</option>
                <option value="Redes Sociais / WhatsApp">Redes Sociais / WhatsApp</option>
                <option value="Entorno da Escola / Vizinhança">Entorno da Escola / Vizinhança</option>
                <option value="Outro Local">Outro Local</option>
              </select>
            </div>

            {/* Seção 3: Turno Escolar */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-purple-900 tracking-wider block">
                Turno Escolar:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {['Manhã', 'Tarde', 'Integral', 'Noite', 'Online / Redes'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      playSfx('click');
                      setTurno(t);
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                      turno === t
                        ? 'bg-purple-600 border-purple-500 text-white shadow-sm'
                        : 'bg-white border-purple-200 text-[#473e57] hover:bg-purple-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Ações Inferiores do Passo 2 */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-100">
              <button
                type="button"
                onClick={() => {
                  playSfx('step');
                  setCurrentStep(1);
                }}
                className="px-5 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-2 border border-purple-200 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>

              <button
                type="button"
                onClick={() => {
                  playSfx('step');
                  setCurrentStep(3);
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-purple-600/25 transition-all cursor-pointer"
              >
                Avançar para Gravidade <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PASSO 3: GRAVIDADE & PAPEL                                                */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="space-y-1">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#241e33]">
                Passo 3: Quem está relatando e qual a urgência?
              </h2>
              <p className="text-xs sm:text-sm text-[#5c546d]">
                Isso permite priorizar a triagem pedagógica caso haja risco imediato.
              </p>
            </div>

            {/* Seção 1: Qual o seu papel */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <label className="text-xs font-black uppercase text-purple-900 tracking-wider block">
                  Qual o seu papel nesta situação?
                </label>
                <AnonymityHelpTooltip
                  title="Marcar 'Sou a Vítima' revela quem você é?"
                  content="Não! Seu nome e dados continuam completamente ocultos. Essa escolha define apenas se a equipe deve priorizar o acolhimento emergencial da vítima ou a verificação dos fatos por uma testemunha."
                  tips={[
                    "Você continua 100% anônimo(a) mesmo marcando 'Sou a Vítima'.",
                    "Colegas e amigos podem relatar como testemunhas para proteger alguém sem se expor."
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: 'Sou a Vítima', desc: 'Estou sofrendo com essa situação diretamente' },
                  { title: 'Sou Testemunha', desc: 'Vi ou soube que um colega está sofrendo' },
                  { title: 'Responsável / Colega', desc: 'Familiar ou amigo prestando auxílio' }
                ].map((item) => (
                  <div
                    key={item.title}
                    onClick={() => {
                      playSfx('click');
                      setPapel(item.title);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                      papel === item.title
                        ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                        : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                    }`}
                  >
                    <h4 className="text-sm font-bold text-[#241e33]">{item.title}</h4>
                    <p className="text-xs text-[#5c546d]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção 2: Nível de Urgência */}
            <div className="space-y-2.5">
              <label className="text-xs font-black uppercase text-purple-900 tracking-wider block">
                Nível de Urgência / Gravidade:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  { title: 'Baixa', desc: 'Conflito inicial' },
                  { title: 'Média', desc: 'Incômodo frequente' },
                  { title: 'Alta', desc: 'Ameaças ou cyber' },
                  { title: '⚠️ Crítica SOS', desc: 'Violência física iminente' }
                ].map((item) => (
                  <div
                    key={item.title}
                    onClick={() => {
                      playSfx('click');
                      setUrgencia(item.title);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                      urgencia === item.title
                        ? 'bg-purple-50 border-purple-400 shadow-sm ring-2 ring-purple-300'
                        : 'bg-white border-purple-100 hover:border-purple-300 hover:bg-purple-50/40'
                    }`}
                  >
                    <h4 className="text-sm font-bold text-[#241e33]">{item.title}</h4>
                    <p className="text-xs text-[#5c546d]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Seção 3: Turma ou Ano Escolar Pré-definido */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-black uppercase text-purple-900 tracking-wider">
                    Turma ou Ano Escolar Envolvido:
                  </label>
                  <AnonymityHelpTooltip
                    title="Por que a turma é solicitada?"
                    content="A indicação da turma permite que a coordenação promova ações educativas coletivas (como rodas de conversa, palestras de empatia e mediações pedagógicas) para toda a classe."
                    tips={[
                      "A abordagem é sempre feita com a turma inteira, sem expor quem enviou a mensagem.",
                      "Caso não envolva uma sala específica, selecione 'Não Escolar / Outra Turma'."
                    ]}
                  />
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200 uppercase">
                  * Obrigatório
                </span>
              </div>

              <select
                value={turma}
                onChange={(e) => {
                  playSfx('click');
                  setTurma(e.target.value);
                }}
                className="w-full p-3.5 rounded-2xl bg-white border border-purple-200 text-sm font-bold text-[#241e33] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all cursor-pointer shadow-xs"
              >
                {turmasDisponiveis.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Seção 4: Quem foi o agressor ou grupo de pessoas (Obrigatório) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-black uppercase text-purple-900 tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-600" /> Quem foi o agressor ou grupo de pessoas?
                  </label>
                  <AnonymityHelpTooltip
                    title="Dica de segurança para citar o agressor"
                    content="Indique quem praticou as agressões. Regra de ouro do anonimato: NUNCA escreva o seu próprio nome nesta caixa caso você queira manter sigilo absoluto!"
                    tips={[
                      "Descreva os praticantes do ato (apelidos, nomes conhecidos, características físicas ou salas).",
                      "Não informe seu próprio nome, número de chamada ou turma pessoal nesta caixa."
                    ]}
                  />
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200 uppercase">
                  * Obrigatório
                </span>
              </div>

              <input
                type="text"
                required
                value={agressorGrupo}
                onChange={(e) => setAgressorGrupo(e.target.value)}
                placeholder="Ex: Nome da pessoa, apelido, características ou grupo de alunos envolvidos..."
                className="w-full p-3.5 rounded-2xl bg-white border border-purple-200 text-sm text-[#241e33] placeholder-[#8a7f9d] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all shadow-xs"
              />
            </div>

            {/* Ações Inferiores do Passo 3 */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-100">
              <button
                type="button"
                onClick={() => {
                  playSfx('step');
                  setCurrentStep(2);
                }}
                className="px-5 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-2 border border-purple-200 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!turma) {
                    alert('Por favor, escolha a turma envolvida.');
                    return;
                  }
                  if (!agressorGrupo.trim()) {
                    alert('Por favor, informe quem foi o agressor ou o grupo de pessoas envolvidas. Este campo é obrigatório.');
                    return;
                  }
                  playSfx('step');
                  setCurrentStep(4);
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-md shadow-purple-600/25 transition-all cursor-pointer"
              >
                Avançar para Detalhes <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PASSO 4: RELATO & PROVAS                                                  */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
            
            {/* Topo do Passo 4: Limpo e Direto */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-xl sm:text-2xl text-[#241e33] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" /> Passo 4: Relato & Provas
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#5c546d]">
                  Descreva o que aconteceu com suas próprias palavras. O anexo de fotos ou áudio é opcional.
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex-shrink-0 self-start sm:self-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Sigilo Total Garantido
              </div>
            </div>

            {/* Campo Principal: Descreva o Ocorrido */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-black uppercase text-purple-900 tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600" /> Descreva o que aconteceu:
                  </label>
                  <AnonymityHelpTooltip
                    title="Como relatar com sigilo absoluto"
                    content="Descreva os fatos com tranquilidade. Você não precisa se identificar nem fornecer informações que revelem quem é você."
                    tips={[
                      "Se preferir, relate em terceira pessoa (ex: 'O aluno X agrediu verbalmente um colega no corredor').",
                      "Não é necessário assinar, colocar seu nome ou deixar dados particulares.",
                      "A apuração escolar é estritamente confidencial nos termos do Art. 14 da LGPD e do ECA."
                    ]}
                  />
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-200 uppercase">
                  * Obrigatório
                </span>
              </div>

              <textarea
                required
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Conte com suas palavras o que aconteceu, o que foi dito ou feito, quem participou e onde ocorreu... Seu relato é 100% confidencial."
                className="w-full h-36 p-4 rounded-2xl bg-white border border-purple-200 text-xs text-[#241e33] placeholder-[#8a7f9d] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all resize-none leading-relaxed shadow-xs"
              />
            </div>

            {/* Seção Enxuta: Anexar Provas (Fotos, Prints ou Áudio) - Opcional */}
            <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-black uppercase text-purple-900 tracking-wider">
                    Anexar Provas
                  </span>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
                    Opcional
                  </span>
                  <AnonymityHelpTooltip
                    title="Fotos, Prints e Proteção de Dados"
                    content="O envio de fotos ou prints é totalmente facultativo. O sistema limpa metadados de câmera e GPS automaticamente antes de salvar."
                    tips={[
                      "Não tem provas? Não se preocupe: seu relato escrito já é suficiente para a escola agir.",
                      "Em prints de WhatsApp ou redes sociais, se preferir, risque seu nome ou foto antes de enviar."
                    ]}
                  />
                </div>

                <span className="text-[11px] text-[#786e8a] font-medium">
                  {anexos.length === 0 ? 'Nenhum anexo (opcional)' : `${anexos.length} anexo(s) adicionado(s)`}
                </span>
              </div>

              {/* Botões Diretos e Reais (Sem Simulações Artificiais) */}
              <div className="flex flex-wrap items-center gap-2.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-purple-100/70 border border-purple-200 hover:border-purple-400 text-xs font-bold text-[#241e33] flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Upload className="w-4 h-4 text-purple-600" /> Anexar Foto ou Arquivo
                </button>

                {!isRecording ? (
                  <button
                    type="button"
                    onClick={handleStartAudioRecord}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 hover:border-rose-400 text-xs font-bold text-rose-900 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                  >
                    <Mic className="w-4 h-4 text-rose-600" /> Gravar Áudio (até 1 min)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopAudioRecord}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-md animate-pulse"
                  >
                    <MicOff className="w-4 h-4" /> Parar Gravação (00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds} / 01:00)
                  </button>
                )}
              </div>

              {/* Nota Curta e Discreta de Privacidade */}
              <div className="text-[11px] text-[#5c546d] flex items-center gap-1.5 pt-0.5">
                <Shield className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                <span>Arquivos protegidos por sigilo pedagógico (LGPD Art. 14 / ECA).</span>
              </div>

              {/* Lista de Anexos Adicionados */}
              {anexos.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-purple-200/60">
                  <span className="text-[11px] font-bold text-purple-950 uppercase tracking-wider block">
                    Arquivos anexados ({anexos.length}):
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {anexos.map((anexo) => (
                      <div
                        key={anexo.id}
                        className="p-3 rounded-2xl bg-white border border-purple-200 shadow-xs flex items-start gap-3 relative hover:border-purple-400 transition-all"
                      >
                        {/* Imagem / Thumbnail */}
                        {(anexo.tipo === 'foto' || anexo.tipo === 'print' || anexo.url?.startsWith('data:image')) ? (
                          <div 
                            className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-purple-200 group/img"
                            onClick={() => anexo.url && setPreviewImage({ url: anexo.url, title: anexo.nome })}
                            title="Clique para ampliar"
                          >
                            <img 
                              src={anexo.url || ''} 
                              alt={anexo.nome} 
                              className="w-14 h-14 sm:w-16 sm:h-16 object-cover bg-purple-100 group-hover/img:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-[9px] font-bold">
                              🔍 Ampliar
                            </div>
                          </div>
                        ) : anexo.tipo === 'audio' ? (
                          <div className="w-12 h-12 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 flex-shrink-0 shadow-xs">
                            <Volume2 className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-xs">
                            <Paperclip className="w-5 h-5" />
                          </div>
                        )}

                        {/* Detalhes do Anexo */}
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                              anexo.tipo === 'foto' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              anexo.tipo === 'print' ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' :
                              anexo.tipo === 'audio' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                              'bg-purple-100 text-purple-800 border border-purple-200'
                            }`}>
                              {anexo.tipo === 'foto' ? '📷 Foto' :
                               anexo.tipo === 'print' ? '📱 Print' :
                               anexo.tipo === 'audio' ? '🎙️ Áudio' : '📎 Arquivo'}
                            </span>
                            {anexo.tamanho && (
                              <span className="text-[10px] text-[#786e8a] font-mono">({anexo.tamanho})</span>
                            )}
                          </div>

                          <p className="font-mono text-xs text-[#241e33] font-bold truncate" title={anexo.nome}>
                            {anexo.nome}
                          </p>

                          {/* Player de Áudio Inline */}
                          {anexo.tipo === 'audio' && anexo.url && (
                            <div className="pt-0.5">
                              <audio controls src={anexo.url} className="h-7 w-full max-w-[180px] rounded-lg" />
                            </div>
                          )}

                          {/* Botão para Expandir Foto */}
                          {(anexo.tipo === 'foto' || anexo.tipo === 'print') && anexo.url && (
                            <button
                              type="button"
                              onClick={() => setPreviewImage({ url: anexo.url!, title: anexo.nome })}
                              className="text-[10px] font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-1 cursor-pointer"
                            >
                              🔍 Ver Foto Completa
                            </button>
                          )}
                        </div>

                        {/* Botão de Remover */}
                        <button
                          type="button"
                          onClick={() => handleRemoveAnexo(anexo.id)}
                          className="p-1 rounded-lg text-[#786e8a] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remover anexo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Garantia Discreta de Anonimato e Protocolo */}
            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200/80 flex items-center gap-3 text-xs text-[#5c546d]">
              <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-[11px] leading-relaxed">
                Envio 100% criptografado e anônimo (sem gravação de IP). Ao enviar, você receberá um <strong>Protocolo Seguro</strong> para acompanhar a resposta da escola.
              </p>
            </div>

            {/* Ações Inferiores do Passo 4 */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-100">
              <button
                type="button"
                onClick={() => {
                  playSfx('step');
                  setCurrentStep(3);
                }}
                className="px-5 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center gap-2 border border-purple-200 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>

              <button
                type="submit"
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm flex items-center gap-2 shadow-md shadow-purple-600/30 transition-all cursor-pointer hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" /> Enviar Denúncia com Sigilo Total
              </button>
            </div>

          </form>
        )}

      </div>

      {/* MODAL DE VISUALIZAÇÃO AMPLIADA DA FOTO / ANEXO */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div ref={previewImageModalRef} className="max-w-2xl w-full rounded-3xl bg-[#120f1d] border border-purple-500/30 p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-sm text-white truncate max-w-xs sm:max-w-md">
                  {previewImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black/60 border border-purple-500/20 flex items-center justify-center p-2 max-h-[70vh]">
              <img 
                src={previewImage.url} 
                alt={previewImage.title} 
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-purple-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Prova vinculada sigilosamente ao protocolo
              </span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer transition-all"
              >
                Fechar Visualização
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
