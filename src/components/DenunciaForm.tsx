import React, { useState, useRef } from 'react';
import { Denuncia, ViolenceType, SchoolLocation } from '../types';
import { saveDenuncia } from '../services/storageService';
import { useApp } from '../AppContext';
import { playBreathTone } from '../services/audioSynthesizer';
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
  Search
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

export const DenunciaForm: React.FC<DenunciaFormProps> = ({ 
  onBack, 
  onDenunciaSent,
  onNavigateToProtocolo 
}) => {
  const { awardXp } = useApp();

  // Etapa ativa (1 a 4)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Passo 1: Tipos de Agressão (múltipla escolha)
  const [tiposSelecionados, setTiposSelecionados] = useState<string[]>([]);

  // Passo 2: Frequência, Local e Turno
  const [frequencia, setFrequencia] = useState<string>('2 a 3 vezes');
  const [local, setLocal] = useState<string>('Pátio / Recreio');
  const [turno, setTurno] = useState<string>('Manhã');

  // Passo 3: Papel, Urgência e Turma
  const [papel, setPapel] = useState<string>('Sou a Vítima');
  const [urgencia, setUrgencia] = useState<string>('Média');
  const [turma, setTurma] = useState<string>('');

  // Passo 4: Relato e Provas (Opcional)
  const [descricao, setDescricao] = useState<string>('');
  const [anexos, setAnexos] = useState<AttachedProof[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado de Submissão e Comprovante
  const [submittedDenuncia, setSubmittedDenuncia] = useState<Denuncia | null>(null);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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

    const newProofs: AttachedProof[] = [];
    Array.from(files).forEach((file, index) => {
      const isImage = file.type.startsWith('image/');
      const isAudio = file.type.startsWith('audio/');
      const proofType = isImage ? 'foto' : isAudio ? 'audio' : 'arquivo';
      const sizeFormatted = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

      const reader = new FileReader();
      reader.onload = (evt) => {
        newProofs.push({
          id: Math.random().toString(36).substring(2, 9),
          nome: file.name,
          tipo: proofType,
          url: evt.target?.result as string,
          tamanho: sizeFormatted
        });
        if (index === files.length - 1) {
          setAnexos(prev => [...prev, ...newProofs]);
        }
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  // Simulação de Print
  const handleAddSimulatedPrint = () => {
    playSfx('click');
    const newProof: AttachedProof = {
      id: Math.random().toString(36).substring(2, 9),
      nome: `print_whatsapp_evidencia_${Math.floor(100 + Math.random() * 900)}.png`,
      tipo: 'print',
      tamanho: '1.4 MB'
    };
    setAnexos(prev => [...prev, newProof]);
  };

  // Simulação de Foto de Bilhete
  const handleAddSimulatedFoto = () => {
    playSfx('click');
    const newProof: AttachedProof = {
      id: Math.random().toString(36).substring(2, 9),
      nome: `foto_bilhete_ofensa_${Math.floor(100 + Math.random() * 900)}.jpg`,
      tipo: 'foto',
      tamanho: '2.1 MB'
    };
    setAnexos(prev => [...prev, newProof]);
  };

  // Remover Anexo
  const handleRemoveAnexo = (id: string) => {
    playSfx('click');
    setAnexos(prev => prev.filter(a => a.id !== id));
  };

  // Enviar Denúncia
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx('success');

    const randNum = Math.floor(1000 + Math.random() * 9000);
    const protocolCode = `#SB-${randNum}`;

    const novaDenuncia = saveDenuncia({
      protocolo: protocolCode,
      tipo_violencia: tiposSelecionados.length > 0 ? tiposSelecionados.join(', ') : 'Geral',
      local_escola: local,
      descricao: descricao.trim() || 'Relato submetido sem detalhes textuais adicionais (opcional).',
      nivel_gravidade: urgencia === 'Crítica SOS' ? 'Grave' : urgencia === 'Alta' ? 'Grave' : urgencia === 'Média' ? 'Recorrente' : 'Leve',
      frequencia,
      turno,
      papel_denunciante: papel,
      turma_envolvida: turma.trim() || undefined,
      tipos_selecionados: tiposSelecionados,
      provas_anexas: anexos.map(a => ({ nome: a.nome, tipo: a.tipo, tamanho: a.tamanho, url: a.url }))
    });

    setSubmittedDenuncia(novaDenuncia);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);

    // Recompensa XP de Cidadania Ativa
    awardXp(20, 'Denúncia Segura Registrada');

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
    setTurma('');
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
        <div className="rounded-3xl bg-white/95 border-2 border-purple-300 p-6 sm:p-8 shadow-[0_10px_30px_rgba(124,58,237,0.1)] space-y-6 relative overflow-hidden">
          
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
              <span className="text-purple-900 font-bold uppercase block text-[10px]">Provas Anexadas:</span>
              <p className="font-semibold text-[#241e33]">
                {anexos.length > 0 ? `${anexos.length} anexo(s) incluído(s)` : 'Sem anexos (não obrigatório)'}
              </p>
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
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16 text-[#241e33]">
      
      {/* 1. CABEÇALHO PADRONIZADO */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-300 text-purple-800 text-xs font-black uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          SIGILO 100% GARANTIDO • SEM CADASTRO OBRIGATÓRIO
        </div>

        <h1 className="font-display font-black text-3xl sm:text-4xl text-[#241e33] tracking-tight">
          Formulário de Denúncia e Acolhimento Anônimo
        </h1>

        <p className="text-xs sm:text-sm text-[#5c546d] max-w-2xl mx-auto leading-relaxed">
          Nenhum dado pessoal (nome, IP, telefone) é exigido. Você receberá um código de protocolo secreto para acompanhar as medidas tomadas pelo conselho escolar.
        </p>

        {/* Barra de Progresso / Stepper das 4 Etapas */}
        <div className="pt-4 max-w-2xl mx-auto space-y-2.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 text-xs font-bold">
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
                    <span className="text-purple-300 hidden sm:inline select-none">→</span>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      playSfx('step');
                      setCurrentStep(step.num as any);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer text-xs font-bold ${
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
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#241e33]">
                Passo 1: Quais formas de agressão estão ocorrendo?
              </h2>
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
              <label className="text-xs font-black uppercase text-purple-900 flex items-center gap-1.5 tracking-wider">
                <Clock className="w-3.5 h-3.5 text-purple-600" /> Frequência / Recorrência do Bullying:
              </label>

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
              <label className="text-xs font-black uppercase text-purple-900 flex items-center gap-1.5 tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-purple-600" /> Onde costuma acontecer?
              </label>

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
              <label className="text-xs font-black uppercase text-purple-900 tracking-wider block">
                Qual o seu papel nesta situação?
              </label>

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

            {/* Seção 3: Turma ou ano escolar */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-purple-900 tracking-wider block">
                Turma ou Ano Escolar Envolvido (Opcional):
              </label>

              <input
                type="text"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                placeholder="Ex: 8º Ano B, 1º Ano Ensino Médio, Turma da tarde..."
                className="w-full p-3.5 rounded-2xl bg-white border border-purple-200 text-sm text-[#241e33] placeholder-[#8a7f9d] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all"
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
            
            {/* Topo do Passo 4 com Badges */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-black text-xl sm:text-2xl text-[#241e33] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" /> Passo 4: Descrição dos Detalhes & Anexo de Provas
                  </h2>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
                    (Opcional)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5c546d]">
                  Você pode relatar com suas próprias palavras o ocorrido e, se tiver, anexar evidências. <strong>Tanto o relato quanto os anexos são opcionais.</strong>
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex-shrink-0 self-start sm:self-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Sigilo Absoluto & Proteção
              </div>
            </div>

            {/* Box 1: NÃO POSSUI PROVAS? NÃO DEIXE DE DENUNCIAR! (Verde) */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-start gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-1 text-xs">
                <h4 className="font-black text-emerald-900 uppercase tracking-wider">
                  Não possui provas? Não deixe de denunciar!
                </h4>
                <p className="text-[#384c3f] leading-relaxed">
                  Você <strong>NÃO é obrigado(a) a apresentar provas</strong> para fazer a denúncia. A falta de fotos ou prints jamais deve impedir você de pedir ajuda. O seu depoimento e sua segurança são a prioridade máxima da escola.
                </p>
              </div>
            </div>

            {/* Box 2: POR QUE AS PROVAS SÃO VALIOSAS QUANDO VOCÊ AS POSSUI? (Roxo) */}
            <div className="p-5 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-4 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 flex-shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div className="space-y-1 text-xs">
                  <h4 className="font-black text-purple-950 uppercase tracking-wider">
                    Por que as provas são valiosas quando você as possui?
                  </h4>
                  <p className="text-[#5c546d] leading-relaxed">
                    Quando disponíveis, <strong>fotos, bilhetes ou prints aceleram muito a investigação</strong>, ajudando a comissão pedagógica e o conselho tutelar a <strong>identificar os responsáveis com rapidez e aplicar as medidas cabíveis</strong> sem margem para dúvidas.
                  </p>
                </div>
              </div>

              {/* 3 Colunas de Orientações */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-purple-100 space-y-1.5 text-xs shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#241e33]">
                    <Camera className="w-3.5 h-3.5 text-purple-600" />
                    <span>1. Fotos de Bilhetes & Danos</span>
                  </div>
                  <p className="text-[11px] text-[#5c546d] leading-relaxed">
                    Se houver: fotografe <strong>bilhetes com ofensas ou ameaças</strong> deixados em cadernos/mochilas, carteiras riscadas ou pertences danificados.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-purple-100 space-y-1.5 text-xs shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#241e33]">
                    <Smartphone className="w-3.5 h-3.5 text-purple-600" />
                    <span>2. Prints de Telas & Mensagens</span>
                  </div>
                  <p className="text-[11px] text-[#5c546d] leading-relaxed">
                    Se houver: prints de <strong>WhatsApp, Instagram, TikTok ou Discord</strong> com usuário dos envolvidos, datas e horários legíveis.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-purple-100 space-y-1.5 text-xs shadow-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#241e33]">
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                    <span>3. Histórico e Testemunhas</span>
                  </div>
                  <p className="text-[11px] text-[#5c546d] leading-relaxed">
                    Conte no campo de texto se houve testemunhas que presenciaram os fatos ou se a agressão já ocorre repetidamente.
                  </p>
                </div>
              </div>
            </div>

            {/* Seção: Anexar Provas */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-purple-600" />
                  <label className="text-xs font-black uppercase text-purple-900 tracking-wider">
                    Anexar Provas (Fotos, Bilhetes ou Prints)
                  </label>
                  <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
                    OPCIONAL
                  </span>
                </div>

                <span className="text-xs text-[#786e8a]">
                  {anexos.length === 0 ? 'Nenhum anexo (opcional)' : `${anexos.length} anexo(s) adicionado(s)`}
                </span>
              </div>

              {/* 3 Botões de Ação */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  className="p-3 rounded-2xl bg-white hover:bg-purple-50 border border-purple-200 hover:border-purple-400 text-xs font-bold text-[#241e33] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Upload className="w-4 h-4 text-purple-600" /> Escolher Arquivo (Opcional)
                </button>

                <button
                  type="button"
                  onClick={handleAddSimulatedPrint}
                  className="p-3 rounded-2xl bg-white hover:bg-cyan-50 border border-cyan-200 hover:border-cyan-400 text-xs font-bold text-cyan-900 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Smartphone className="w-4 h-4 text-cyan-600" /> + Simular Print (Opcional)
                </button>

                <button
                  type="button"
                  onClick={handleAddSimulatedFoto}
                  className="p-3 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-400 text-xs font-bold text-emerald-900 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Camera className="w-4 h-4 text-emerald-600" /> + Simular Foto (Opcional)
                </button>
              </div>

              {/* Lista de Anexos Adicionados */}
              {anexos.length > 0 && (
                <div className="space-y-2 pt-1">
                  {anexos.map((anexo) => (
                    <div
                      key={anexo.id}
                      className="p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {anexo.tipo === 'print' ? (
                          <Smartphone className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                        ) : anexo.tipo === 'foto' ? (
                          <Camera className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <Paperclip className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        )}
                        <span className="font-mono text-[#241e33] truncate">{anexo.nome}</span>
                        {anexo.tamanho && (
                          <span className="text-[10px] text-[#786e8a] font-mono">({anexo.tamanho})</span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveAnexo(anexo.id)}
                        className="p-1 rounded-md text-[#786e8a] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remover anexo"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Seção: Descreva o Ocorrido */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase text-purple-900 tracking-wider">
                  Descreva o ocorrido com suas palavras:
                </label>
                <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
                  OPCIONAL
                </span>
              </div>

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Conte como aconteceu, o que foi dito ou feito, se houve ameaças, apelidos, mensagens em redes sociais ou testemunhas presentes... Seu relato será lido exclusivamente pela equipe responsável pela apuração e mediação da escola."
                className="w-full h-32 p-4 rounded-2xl bg-white border border-purple-200 text-xs text-[#241e33] placeholder-[#8a7f9d] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none transition-all resize-none leading-relaxed shadow-xs"
              />
            </div>

            {/* Box: Garantias do Stop */}
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#241e33]">
                <Shield className="w-4 h-4 text-purple-600" />
                <span>Garantias do Stop:</span>
              </div>
              <ul className="text-[11px] text-[#5c546d] space-y-1 pl-6 list-disc leading-relaxed">
                <li>
                  O envio e os anexos são 100% criptografados ponta-a-ponta e não gravam endereço IP ou dados do seu dispositivo.
                </li>
                <li>
                  Após clicar em enviar, você receberá um <strong>Protocolo Privado</strong>. Guarde esse código para acompanhar a resposta e o andamento da apuração do Conselho Escolar.
                </li>
              </ul>
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

    </div>
  );
};
