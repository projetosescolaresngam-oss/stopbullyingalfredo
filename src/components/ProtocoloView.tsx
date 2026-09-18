import React, { useState, useEffect, useRef } from 'react';
import { Denuncia, ProtocolChatMessage } from '../types';
import { 
  getDenuncias, 
  getDenunciaByProtocolo, 
  getLastCreatedProtocol, 
  getProtocolMessages, 
  sendProtocolMessage,
  deleteDenuncia 
} from '../services/storageService';
import { playBreathTone } from '../services/audioSynthesizer';
import { ModalFotoCompleta } from './gestao/ModalFotoCompleta';
import { 
  ShieldCheck, 
  Search, 
  MessageSquare, 
  Send, 
  Copy, 
  Check, 
  FileText, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Sparkles, 
  ArrowLeft, 
  Printer, 
  Paperclip, 
  Lock, 
  CheckCircle2, 
  Calendar, 
  GraduationCap, 
  Info,
  ExternalLink,
  Bot,
  ZoomIn,
  Trash2
} from 'lucide-react';

interface ProtocoloViewProps {
  initialProtocol?: string;
  onBack: () => void;
  onNavigateToDenuncia: () => void;
}

export const ProtocoloView: React.FC<ProtocoloViewProps> = ({ 
  initialProtocol, 
  onBack, 
  onNavigateToDenuncia 
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialProtocol || '');
  const [activeProtocol, setActiveProtocol] = useState<string>(initialProtocol || '');
  const [denuncia, setDenuncia] = useState<Denuncia | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [selectedFotoModal, setSelectedFotoModal] = useState<{ url: string; nome?: string; tipo?: string; tamanho?: string } | null>(null);

  // Chat State
  const [messages, setMessages] = useState<ProtocolChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Exclusão / Cancelamento pelo próprio denunciante
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedSuccess, setDeletedSuccess] = useState(false);

  // Efeitos sonoros
  const playSfx = (type: 'click' | 'send' | 'receive') => {
    if (type === 'click') {
      playBreathTone(750, 30, true);
    } else if (type === 'send') {
      playBreathTone(600, 40, true);
      setTimeout(() => playBreathTone(800, 60, true), 50);
    } else if (type === 'receive') {
      playBreathTone(523, 60, true);
      setTimeout(() => playBreathTone(659, 80, true), 70);
    }
  };

  // Carregar denúncia e mensagens quando activeProtocol mudar + atualizar em tempo real
  useEffect(() => {
    if (!activeProtocol) {
      // Tenta buscar o último protocolo salvo neste dispositivo se não houver inicial
      const last = getLastCreatedProtocol();
      if (last && !initialProtocol) {
        setSearchInput(last);
        consultarProtocolo(last);
      }
      return;
    }
    consultarProtocolo(activeProtocol);

    // Atualiza mensagens em tempo real para receber respostas humanas da gestão
    const updateMsgs = () => {
      if (activeProtocol) {
        const msgs = getProtocolMessages(activeProtocol);
        setMessages(msgs);
      }
    };

    const intervalId = setInterval(updateMsgs, 1500);

    const handleChatUpdate = () => {
      updateMsgs();
    };

    window.addEventListener('protocol_chat_updated', handleChatUpdate);
    window.addEventListener('storage', handleChatUpdate);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('protocol_chat_updated', handleChatUpdate);
      window.removeEventListener('storage', handleChatUpdate);
    };
  }, [activeProtocol]);

  const consultarProtocolo = (proto: string) => {
    const found = getDenunciaByProtocolo(proto);
    if (found) {
      setDenuncia(found);
      setErrorMsg('');
      setActiveProtocol(found.protocolo);
      setSearchInput(found.protocolo);
      const msgs = getProtocolMessages(found.protocolo);
      setMessages(msgs);
    } else {
      setDenuncia(null);
      setErrorMsg(`Nenhum registro encontrado com o protocolo "${proto}". Verifique se o código foi digitado corretamente.`);
      setMessages([]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    playSfx('click');
    consultarProtocolo(searchInput.trim());
  };

  // Excluir / Cancelar o próprio relato
  const handleDeleteProtocolo = () => {
    if (!denuncia) return;
    setIsDeleting(true);
    try {
      deleteDenuncia(denuncia.id);
      playSfx('click');
      setDenuncia(null);
      setMessages([]);
      setShowConfirmDelete(false);
      setDeletedSuccess(true);
    } catch {
      setErrorMsg('Não foi possível cancelar a denúncia no momento.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Enviar mensagem no chat (canal direto e humano)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !denuncia) return;

    playSfx('send');
    setIsSending(true);

    const texto = inputText.trim();
    setInputText('');

    // Salva mensagem do denunciante
    sendProtocolMessage(
      denuncia.protocolo,
      'denunciante',
      texto,
      'Denunciante (Você - Anônimo)'
    );

    setMessages(getProtocolMessages(denuncia.protocolo));
    setIsSending(false);

    // Rolar apenas o container interno do chat sem puxar a página
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  // Copiar código do protocolo
  const handleCopy = () => {
    if (!denuncia) return;
    playSfx('click');
    navigator.clipboard?.writeText(denuncia.protocolo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Lista de protocolos recentes para facilitar a consulta
  const allDenuncias = getDenuncias();
  const recentProtocols = allDenuncias.slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* 1. CABEÇALHO DA ABA PROTOCOLO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-200/70 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            Canal de Acompanhamento Sigiloso
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-[#241e33] tracking-tight flex items-center gap-2">
            Acompanhar Protocolo
          </h1>
          <p className="text-xs sm:text-sm text-[#5c546d] max-w-xl">
            Consulte os dados completos da sua manifestação, veja as providências da comissão escolar e converse em tempo real com quem está cuidando do seu caso.
          </p>
        </div>

        <button
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#241e33] border border-purple-200/80 shadow-sm text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Início
        </button>
      </div>

      {/* 2. BARRA DE BUSCA DO PROTOCOLO */}
      <div className="rounded-3xl bg-white/95 border border-purple-200/80 p-5 sm:p-6 shadow-[0_8px_30px_rgba(124,58,237,0.08)] backdrop-blur-md space-y-4">
        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <label className="text-xs font-black uppercase text-purple-800 tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4 text-purple-600" />
            Digite ou Cole o Código do Seu Protocolo:
          </label>
          
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Exemplo: #SB-9842 ou STP-94A1F"
                className="w-full pl-4 pr-10 py-3 rounded-2xl bg-purple-50/50 border border-purple-200 text-[#241e33] text-sm font-mono placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-all uppercase"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#241e33] text-xs cursor-pointer p-1"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" /> Consultar
            </button>
          </div>
        </form>

        {/* Chips de Acesso Rápido */}
        {recentProtocols.length > 0 && (
          <div className="pt-3 border-t border-purple-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#5c546d] text-[11px] font-semibold">Protocolos no sistema:</span>
            {recentProtocols.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  playSfx('click');
                  setSearchInput(p.protocolo);
                  consultarProtocolo(p.protocolo);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                  denuncia?.protocolo === p.protocolo
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-purple-50/70 text-purple-900 border-purple-200 hover:bg-purple-100'
                }`}
              >
                {p.protocolo}
              </button>
            ))}
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-shake">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {deletedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-emerald-950">Denúncia cancelada e excluída com sucesso!</p>
                <p className="text-[11px] text-emerald-800">O protocolo foi removido permanentemente e todas as mensagens e evidências associadas foram apagadas com segurança.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDeletedSuccess(false)}
              className="text-emerald-700 hover:text-emerald-950 p-1 text-sm font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* 3. EXIBIÇÃO CASO NENHUM PROTOCOLO ESTEJA CONSULTADO */}
      {!denuncia && !errorMsg && (
        <div className="rounded-3xl bg-white/95 border border-purple-200/80 p-8 text-center space-y-5 shadow-[0_8px_30px_rgba(124,58,237,0.06)] backdrop-blur-md">
          <div className="w-16 h-16 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center mx-auto text-purple-600 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-display font-black text-xl text-[#241e33]">
              Como funciona o Acompanhamento?
            </h3>
            <p className="text-xs sm:text-sm text-[#5c546d] leading-relaxed">
              Toda vez que você envia um relato pelo Stop, um código exclusivo de protocolo é gerado. Com ele, você pode checar os encaminhamentos da escola e conversar sigilosamente com a equipe sem expor seu nome.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2 text-left">
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/70 space-y-1">
              <span className="text-purple-700 font-black text-xs">1. Copie o Código</span>
              <p className="text-[11px] text-[#5c546d]">
                Guarde o código gerado após o envio da denúncia.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/70 space-y-1">
              <span className="text-purple-700 font-black text-xs">2. Cole na Barra</span>
              <p className="text-[11px] text-[#5c546d]">
                Insira o código no campo de busca acima e clique em Consultar.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/70 space-y-1">
              <span className="text-purple-700 font-black text-xs">3. Acompanhe &amp; Fale</span>
              <p className="text-[11px] text-[#5c546d]">
                Veja o status e use o chat confidencial com a coordenação.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onNavigateToDenuncia}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" /> Registrar uma Nova Denúncia
            </button>
          </div>
        </div>
      )}

      {/* 4. DADOS COMPLETOS DA DENÚNCIA CONSULTADA */}
      {denuncia && (
        <div className="space-y-6">
          
          {/* Card Principal: Protocolo & Status */}
          <div className="rounded-3xl bg-white/95 border border-purple-200/90 p-6 sm:p-7 shadow-[0_8px_30px_rgba(124,58,237,0.08)] backdrop-blur-md space-y-6">
            
            {/* Cabeçalho do Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-200/70 pb-5">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#5c546d] uppercase tracking-wider block">
                  Protocolo Oficial Registrado:
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-purple-700">
                    {denuncia.protocolo}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 border border-purple-200 text-purple-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    title="Copiar código do protocolo"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
              </div>

              {/* Badge de Status */}
              <div className="flex flex-col sm:items-end gap-1">
                <span className="text-[10px] font-bold text-[#5c546d] uppercase tracking-wider">
                  Status Atual da Tramitação:
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm ${
                  denuncia.status === 'Resolvido'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : denuncia.status === 'Acolhido'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                  {denuncia.status || 'Em Análise'}
                </span>
              </div>
            </div>

            {/* Timeline Visual de Andamento */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-[#241e33] block">Etapas do Processo de Acolhimento:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                
                {/* Etapa 1 */}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <div className="flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[#241e33] text-[11px] block">1. Registrado</span>
                  <span className="text-[10px] text-[#5c546d]">Recebido em sigilo</span>
                </div>

                {/* Etapa 2 */}
                <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1">
                  <div className="flex items-center justify-center text-purple-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[#241e33] text-[11px] block">2. Triagem</span>
                  <span className="text-[10px] text-[#5c546d]">Análise pedagógica</span>
                </div>

                {/* Etapa 3 */}
                <div className={`p-2.5 rounded-xl border space-y-1 ${
                  denuncia.status === 'Acolhido' || denuncia.status === 'Resolvido'
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}>
                  <div className="flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[#241e33] text-[11px] block">3. Mediação</span>
                  <span className="text-[10px] text-[#5c546d]">Acolhimento ativo</span>
                </div>

                {/* Etapa 4 */}
                <div className={`p-2.5 rounded-xl border space-y-1 ${
                  denuncia.status === 'Resolvido'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}>
                  <div className="flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-[#241e33] text-[11px] block">4. Resolvido</span>
                  <span className="text-[10px] text-[#5c546d]">Medidas aplicadas</span>
                </div>

              </div>
            </div>

            {/* Grid com Todos os Dados Inteiros da Denúncia */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              
              {/* Formas de Violência */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold uppercase tracking-wide">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Formas de Agressão:</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {denuncia.tipos_selecionados && denuncia.tipos_selecionados.length > 0 ? (
                    denuncia.tipos_selecionados.map(tipo => (
                      <span key={tipo} className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200 text-[11px] font-bold">
                        {tipo}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-semibold text-[#241e33]">
                      {denuncia.tipo_violencia || 'Geral'}
                    </span>
                  )}
                </div>
              </div>

              {/* Frequência & Recorrência */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold uppercase tracking-wide">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Frequência:</span>
                </div>
                <p className="text-xs font-semibold text-[#241e33]">
                  {denuncia.frequencia || 'Não informada'}
                </p>
              </div>

              {/* Local & Turno */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold uppercase tracking-wide">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Local &amp; Turno:</span>
                </div>
                <p className="text-xs font-semibold text-[#241e33]">
                  {denuncia.local_escola} {denuncia.turno ? `(${denuncia.turno})` : ''}
                </p>
              </div>

              {/* Papel do Denunciante */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold uppercase tracking-wide">
                  <Users className="w-3.5 h-3.5" />
                  <span>Papel do Relator:</span>
                </div>
                <p className="text-xs font-semibold text-[#241e33]">
                  {denuncia.papel_denunciante || 'Vítima / Não especificado'}
                </p>
              </div>

              {/* Gravidade / Urgência */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold uppercase tracking-wide">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Nível de Gravidade:</span>
                </div>
                <p className="text-xs font-semibold text-[#241e33]">
                  {denuncia.nivel_gravidade || 'Pendente'}
                </p>
              </div>

              {/* Turma Envolvida */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold uppercase tracking-wide">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Turma / Ano Escolar:</span>
                </div>
                <p className="text-xs font-semibold text-[#241e33]">
                  {denuncia.turma_envolvida || 'Não especificada'}
                </p>
              </div>

              {/* Agressor ou Grupo Envolvido */}
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/70 space-y-1.5">
                <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold uppercase tracking-wide">
                  <Users className="w-3.5 h-3.5" />
                  <span>Agressor / Grupo Envolvido:</span>
                </div>
                <p className="text-xs font-semibold text-[#241e33]">
                  {denuncia.agressor_grupo || 'Informado no relato'}
                </p>
              </div>

            </div>

            {/* Data e Hora de Envio */}
            <div className="flex items-center gap-2 text-xs text-[#5c546d] px-1">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>
                Data e hora do envio: <strong className="text-[#241e33]">{new Date(denuncia.data_envio).toLocaleString('pt-BR')}</strong>
              </span>
            </div>

            {/* Relato / Descrição Textual Inteira */}
            <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase text-purple-800 tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Relato do Estudante / Ocorrência Registrada:
                </h4>
                <span className="text-[10px] bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-full font-bold">Sigilo Absoluto</span>
              </div>
              <p className="text-xs sm:text-sm text-[#241e33] leading-relaxed whitespace-pre-wrap">
                {denuncia.descricao || 'Nenhum detalhe textual adicional fornecido.'}
              </p>
            </div>

            {/* Provas Anexadas (se houver) */}
            {denuncia.provas_anexas && denuncia.provas_anexas.length > 0 && (
              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-3">
                <h4 className="text-xs font-black uppercase text-purple-800 tracking-wider flex items-center gap-1.5">
                  <Paperclip className="w-4 h-4 text-purple-600" />
                  Provas e Evidências Anexadas ({denuncia.provas_anexas.length}):
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {denuncia.provas_anexas.map((anexo, idx) => {
                    const isImage = anexo.url && (anexo.tipo === 'foto' || anexo.tipo === 'print' || anexo.tipo === 'imagem' || anexo.url.startsWith('data:image'));
                    return (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-purple-200/80 flex items-center gap-3 shadow-sm relative group">
                        {isImage ? (
                          <div 
                            className="relative w-14 h-14 rounded-lg overflow-hidden border border-purple-200 cursor-pointer group/img flex-shrink-0"
                            onClick={() => setSelectedFotoModal({
                              url: anexo.url!,
                              nome: anexo.nome,
                              tipo: anexo.tipo,
                              tamanho: anexo.tamanho
                            })}
                            title="Clique para ver em tamanho completo"
                          >
                            <img 
                              src={anexo.url} 
                              alt={anexo.nome} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-purple-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <ZoomIn className="w-4 h-4" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#241e33] truncate">{anexo.nome}</p>
                          <p className="text-[10px] text-[#5c546d] uppercase">
                            {anexo.tipo || 'Evidência'} • {anexo.tamanho || 'Anexado'}
                          </p>
                          {isImage && (
                            <button
                              type="button"
                              onClick={() => setSelectedFotoModal({
                                url: anexo.url!,
                                nome: anexo.nome,
                                tipo: anexo.tipo,
                                tamanho: anexo.tamanho
                              })}
                              className="text-[10px] text-purple-700 hover:text-purple-900 underline font-bold flex items-center gap-1 mt-0.5 cursor-pointer"
                            >
                              <ZoomIn className="w-3 h-3" /> Ver Foto Completa
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Botão de Impressão do Comprovante e Cancelamento */}
            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  playSfx('click');
                  setShowConfirmDelete(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-rose-700 border border-rose-200/90 shadow-sm text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                title="Cancelar e excluir esta denúncia permanentemente"
              >
                <Trash2 className="w-4 h-4 text-rose-500" /> Cancelar / Excluir Este Relato
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#241e33] border border-purple-200/80 shadow-sm text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-purple-600" /> Imprimir Comprovante
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 5. CHAT COM A EQUIPE QUE ESTÁ ANALISANDO O CASO                            */}
          {/* ========================================================================= */}
          <div className="rounded-3xl bg-white/95 border border-purple-200/90 p-5 sm:p-6 shadow-[0_8px_30px_rgba(124,58,237,0.08)] backdrop-blur-md space-y-4">
            
            {/* Cabeçalho do Chat */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-200/70 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 flex-shrink-0 shadow-sm">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base sm:text-lg text-[#241e33] flex items-center gap-2">
                    Chat com a Comissão de Análise Escolar
                  </h3>
                  <p className="text-[11px] text-[#5c546d]">
                    Converse diretamente com os responsáveis pela mediação da EEMTI Alfredo Machado.
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold self-start sm:self-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Seu anonimato é 100% protegido
              </div>
            </div>

            {/* Mensagem Informativa de Sigilo */}
            <div className="p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 text-xs text-purple-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed text-[#3c344a]">
                Você não precisa se identificar neste chat. A comissão recebe suas mensagens vinculadas exclusivamente ao código <strong>{denuncia.protocolo}</strong>. Pergunte, relate novos fatos ou peça auxílio sempre que sentir necessidade.
              </p>
            </div>

            {/* Caixa de Mensagens do Chat */}
            <div ref={chatContainerRef} className="h-80 sm:h-96 overflow-y-auto p-4 rounded-2xl bg-purple-50/40 border border-purple-200/80 space-y-3 scrollbar-thin scrollbar-thumb-purple-300">
              {messages.map((msg, idx) => {
                const isUser = msg.remetente === 'denunciante';
                return (
                  <div
                    key={`${msg.id || 'msg'}-${idx}`}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-[#5c546d] mb-1 px-1 font-semibold">
                      {!isUser && <GraduationCap className="w-3 h-3 text-purple-600" />}
                      <span className="font-bold text-[#241e33]">{msg.autorNome}</span>
                      <span>•</span>
                      <span>{new Date(msg.dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none font-medium'
                          : 'bg-white text-[#241e33] border border-purple-200/80 rounded-tl-none shadow-xs'
                      }`}
                    >
                      {msg.texto}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Formulário de Envio de Mensagem */}
            <form onSubmit={handleSendMessage} className="space-y-2 pt-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escreva sua mensagem para a comissão escolar (seu nome não será revelado)..."
                  className="flex-1 px-4 py-3 rounded-2xl bg-white border border-purple-200 text-[#241e33] text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-all shadow-sm"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isSending}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Enviar</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#5c546d] px-1 font-medium">
                <span>Pressione Enter para enviar</span>
                <span className="flex items-center gap-1 text-purple-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Canal de atendimento humano e pedagógico
                </span>
              </div>
            </form>

          </div>

        </div>
      )}

      {/* Modal de Foto Completa Ampliada */}
      {selectedFotoModal && (
        <ModalFotoCompleta 
          fotoUrl={selectedFotoModal.url}
          nomeArquivo={selectedFotoModal.nome}
          protocolo={denuncia?.protocolo}
          tipoArquivo={selectedFotoModal.tipo}
          tamanhoArquivo={selectedFotoModal.tamanho}
          onClose={() => setSelectedFotoModal(null)}
        />
      )}

      {/* Modal de Confirmação de Cancelamento/Exclusão */}
      {showConfirmDelete && denuncia && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-white border border-rose-200 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-rose-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#241e33] text-base">Cancelar e Excluir Relato?</h3>
                <span className="text-xs text-rose-600 font-mono font-bold">Protocolo: {denuncia.protocolo}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1.5 text-xs text-rose-900">
              <p className="font-bold text-rose-950 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                Atenção: Os dados serão apagados permanentemente
              </p>
              <p className="text-[11px] leading-relaxed text-rose-800">
                Ao confirmar, este relato será cancelado e excluído do sistema. Ninguém mais terá acesso a este protocolo ou ao histórico de mensagens do chat seguro.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#241e33] font-bold text-xs transition-all cursor-pointer"
              >
                Manter Relato
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteProtocolo}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center gap-2 shadow-md shadow-rose-600/20 transition-all cursor-pointer"
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
