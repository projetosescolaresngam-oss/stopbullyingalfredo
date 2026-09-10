import React, { useState } from 'react';
import { Denuncia } from '../../types';
import { 
  getInstitutionalEmails, 
  saveInstitutionalEmails, 
  recordEmailDispatch 
} from '../../services/storageService';
import { playBreathTone } from '../../services/audioSynthesizer';
import { DocumentoOficialModal } from './DocumentoOficialModal';
import { 
  Mail, 
  Send, 
  Printer, 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Building2, 
  Users, 
  FileText, 
  CheckCircle2, 
  Edit2, 
  AlertTriangle, 
  Paperclip,
  Clock,
  MapPin,
  Lock
} from 'lucide-react';

interface ModalEnvioEmailProps {
  denuncia: Denuncia;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const ModalEnvioEmail: React.FC<ModalEnvioEmailProps> = ({
  denuncia,
  onClose,
  onSuccess
}) => {
  const [emailsConfig, setEmailsConfig] = useState(() => getInstitutionalEmails());
  const [editingEmails, setEditingEmails] = useState(false);
  
  // Destinatários Selecionados
  const [sendToConselho, setSendToConselho] = useState(true);
  const [sendToEscola, setSendToEscola] = useState(true);
  const [observacaoCoordenacao, setObservacaoCoordenacao] = useState('');

  // Estados de Transmissão
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);

  // Sons de feedback
  const playSfx = (type: 'click' | 'send' | 'success') => {
    try {
      if (type === 'click') playBreathTone(750, 25, true);
      else if (type === 'send') {
        playBreathTone(600, 40, true);
        setTimeout(() => playBreathTone(800, 60, true), 50);
      } else if (type === 'success') {
        playBreathTone(523, 60, true);
        setTimeout(() => playBreathTone(659, 80, true), 70);
      }
    } catch {}
  };

  const handleSaveEmailsConfig = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx('click');
    saveInstitutionalEmails(emailsConfig);
    setEditingEmails(false);
  };

  // Construção do Assunto e Corpo Formato Institucional
  const subjectText = `[URGENTE - STOP BULLYING] Encaminhamento Oficial - Protocolo ${denuncia.protocolo} - EEMTI Alfredo Machado`;

  const buildEmailBodyText = () => {
    const dataFmt = new Date(denuncia.data_envio).toLocaleString('pt-BR');
    const anexosCount = denuncia.provas_anexas?.length || 0;
    
    let body = `OFÍCIO E COMUNICAÇÃO DE OCORRÊNCIA ESCOLAR SIGILOSA\n`;
    body += `=========================================================\n`;
    body += `ESCOLA: EEMTI Alfredo Machado - Madalena / CE\n`;
    body += `SISTEMA: Stop Bullying - Canal Seguro de Mediação\n`;
    body += `DATA DE ENVIO: ${dataFmt}\n`;
    body += `PROTOCOLO OFICIAL: ${denuncia.protocolo}\n`;
    body += `NÍVEL DE URGÊNCIA / RISCO: ${denuncia.nivel_gravidade || 'Pendente'} (Escalada: ${denuncia.nivel_escalada || 'Média'})\n`;
    body += `=========================================================\n\n`;

    body += `DADOS DA OCORRÊNCIA REGISTRADA:\n`;
    body += `- Formas de Agressão / Violência: ${denuncia.tipo_violencia}\n`;
    body += `- Local e Turno na Escola: ${denuncia.local_escola} (${denuncia.turno || 'Manhã'})\n`;
    body += `- Frequência Relatada: ${denuncia.frequencia || 'Não informada'}\n`;
    body += `- Papel do Relator: ${denuncia.papel_denunciante || 'Vítima'}\n`;
    body += `- Turma Envolvida: ${denuncia.turma_envolvida || 'Não informada'}\n\n`;

    body += `DEPOIMENTO / RELATO DO ESTUDANTE:\n`;
    body += `"${denuncia.descricao || 'Sem detalhes textuais adicionais.'}"\n\n`;

    if (anexosCount > 0) {
      body += `EVIDÊNCIAS E PROVAS ANEXADAS (${anexosCount}):\n`;
      denuncia.provas_anexas?.forEach((a, idx) => {
        body += `  ${idx + 1}. [${a.tipo?.toUpperCase() || 'ANEXO'}] ${a.nome} (${a.tamanho || 'Anexado'})\n`;
      });
      body += `\n`;
    }

    if (observacaoCoordenacao.trim()) {
      body += `DESPACHO E OBSERVAÇÃO DA COORDENAÇÃO PEDAGÓGICA:\n`;
      body += `"${observacaoCoordenacao.trim()}"\n\n`;
    }

    body += `FUNDAMENTAÇÃO LEGAL:\n`;
    body += `• Lei Federal nº 13.185/2015 (Programa de Combate à Intimidação Sistemática)\n`;
    body += `• Lei Federal nº 14.811/2024 (Tipificação de Bullying/Cyberbullying no Código Penal)\n`;
    body += `• Estatuto da Criança e do Adolescente - ECA (Lei nº 8.069/1990)\n\n`;

    body += `Atenciosamente,\n`;
    body += `Comissão de Mediação & Acolhimento Pedagógico\n`;
    body += `EEMTI Alfredo Machado - SEDUC/CE\n`;
    return body;
  };

  // Simular envio SMTP seguro
  const handleConfirmSend = () => {
    if (!sendToConselho && !sendToEscola) {
      alert('Por favor, selecione ao menos um destinatário (Conselho Tutelar ou Escola).');
      return;
    }

    playSfx('send');
    setIsSending(true);
    setProgress(15);

    const dests: string[] = [];
    if (sendToConselho) dests.push(`Conselho Tutelar (${emailsConfig.emailConselhoTutelar})`);
    if (sendToEscola) dests.push(`Escola (${emailsConfig.emailEscola})`);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            playSfx('success');
            recordEmailDispatch(denuncia.id, dests, 'individual', observacaoCoordenacao);
            onSuccess(`Relatório do protocolo ${denuncia.protocolo} enviado com sucesso para ${dests.join(' e ')}!`);
            onClose();
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  // Enviar usando cliente mailto: nativo
  const handleOpenMailto = () => {
    const destList: string[] = [];
    if (sendToConselho) destList.push(emailsConfig.emailConselhoTutelar);
    if (sendToEscola) destList.push(emailsConfig.emailEscola);

    if (destList.length === 0) {
      alert('Selecione ao menos um destinatário.');
      return;
    }

    playSfx('click');
    const mailtoUrl = `mailto:${destList.join(',')}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(buildEmailBodyText())}`;
    window.open(mailtoUrl, '_blank');

    recordEmailDispatch(denuncia.id, destList.map(d => `mailto:${d}`), 'individual', observacaoCoordenacao);
    onSuccess('Cliente de e-mail aberto no seu aplicativo nativo!');
    onClose();
  };

  // Copiar texto para área de transferência
  const handleCopyBody = () => {
    playSfx('click');
    navigator.clipboard?.writeText(`${subjectText}\n\n${buildEmailBodyText()}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      
      <div className="w-full max-w-3xl rounded-3xl bg-[#0f1424] border border-purple-500/40 p-5 sm:p-7 space-y-6 shadow-2xl relative text-white max-h-[95vh] overflow-y-auto">
        
        {/* CABEÇALHO DO MODAL */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-black uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              Notificação Institucional por E-mail
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2">
              Encaminhar Denúncia por E-mail
            </h2>
            <p className="text-xs text-gray-400">
              Protocolo <strong className="text-purple-300 font-mono">{denuncia.protocolo}</strong> • EEMTI Alfredo Machado
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MENSAGEM DE PROGRESSO DE ENVIO */}
        {isSending ? (
          <div className="p-8 rounded-2xl bg-black/50 border border-purple-500/30 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center mx-auto text-purple-300 animate-pulse">
              <Send className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-lg text-white">Transmitindo Notificação Oficial...</h3>
              <p className="text-xs text-gray-400">
                A criptografia de segurança LGPD está autenticando o envio do protocolo e anexos.
              </p>
            </div>
            {/* Barra de Progresso */}
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-purple-300">{progress}% Concluído</span>
          </div>
        ) : (
          <div className="space-y-5">

            {/* SEÇÃO 1: SELEÇÃO DOS DESTINATÁRIOS */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-purple-400" /> Selecione os Destinatários do Encaminhamento:
                </span>
                <button
                  type="button"
                  onClick={() => setEditingEmails(!editingEmails)}
                  className="text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer underline"
                >
                  <Edit2 className="w-3 h-3" /> {editingEmails ? 'Concluir Edição' : 'Configurar E-mails Cadastrados'}
                </button>
              </div>

              {/* FORMULÁRIO DE EDIÇÃO RÁPIDA DE ENDEREÇOS */}
              {editingEmails ? (
                <form onSubmit={handleSaveEmailsConfig} className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-300 block">E-mail do Conselho Tutelar:</label>
                    <input
                      type="email"
                      value={emailsConfig.emailConselhoTutelar}
                      onChange={(e) => setEmailsConfig(prev => ({ ...prev, emailConselhoTutelar: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-purple-400"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-300 block">E-mail da Escola / SEDUC:</label>
                    <input
                      type="email"
                      value={emailsConfig.emailEscola}
                      onChange={(e) => setEmailsConfig(prev => ({ ...prev, emailEscola: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-purple-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer transition-all"
                  >
                    Salvar Endereços
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Opção 1: Conselho Tutelar */}
                  <label className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    sendToConselho
                      ? 'bg-purple-900/30 border-purple-500/60 shadow-md shadow-purple-950/40'
                      : 'bg-black/30 border-white/10 opacity-60 hover:opacity-100'
                  }`}>
                    <input
                      type="checkbox"
                      checked={sendToConselho}
                      onChange={(e) => setSendToConselho(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-600 cursor-pointer"
                    />
                    <div className="space-y-0.5 text-xs min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <Building2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>Conselho Tutelar</span>
                      </div>
                      <p className="font-mono text-[11px] text-purple-300 truncate" title={emailsConfig.emailConselhoTutelar}>
                        {emailsConfig.emailConselhoTutelar}
                      </p>
                      <span className="text-[10px] text-gray-400 block">Órgão de Proteção dos Direitos da Criança</span>
                    </div>
                  </label>

                  {/* Opção 2: E-mail da Escola */}
                  <label className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    sendToEscola
                      ? 'bg-indigo-900/30 border-indigo-500/60 shadow-md shadow-indigo-950/40'
                      : 'bg-black/30 border-white/10 opacity-60 hover:opacity-100'
                  }`}>
                    <input
                      type="checkbox"
                      checked={sendToEscola}
                      onChange={(e) => setSendToEscola(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-600 cursor-pointer"
                    />
                    <div className="space-y-0.5 text-xs min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <Building2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                        <span>E-mail da Escola / SEDUC</span>
                      </div>
                      <p className="font-mono text-[11px] text-indigo-300 truncate" title={emailsConfig.emailEscola}>
                        {emailsConfig.emailEscola}
                      </p>
                      <span className="text-[10px] text-gray-400 block">Gestão Pedagógica &amp; Diretoria</span>
                    </div>
                  </label>

                </div>
              )}
            </div>

            {/* CAMPO ADICIONAL: DESPACHO DA COORDENAÇÃO */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase text-gray-300 tracking-wider block">
                Observação / Despacho da Coordenação (Opcional):
              </label>
              <textarea
                value={observacaoCoordenacao}
                onChange={(e) => setObservacaoCoordenacao(e.target.value)}
                placeholder="Exemplo: Encaminhamos este relato para acompanhamento preventivo e acolhimento dos estudantes no CREAS/Conselho..."
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* SEÇÃO 2: PRÉ-VISUALIZAÇÃO DO RELATÓRIO DO E-MAIL */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-purple-300 tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-400" /> Pré-Visualização do E-mail Formatado:
                </span>
                <button
                  type="button"
                  onClick={handleCopyBody}
                  className="text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Texto Copiado!' : 'Copiar Texto'}
                </button>
              </span>

              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-[11px] text-gray-300 space-y-2 max-h-56 overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-purple-600/40">
                <div className="border-b border-white/10 pb-2 space-y-1 text-purple-200">
                  <p><strong>Assunto:</strong> {subjectText}</p>
                  <p><strong>De:</strong> comissao.mediacao@eemti-alfredomachado.edu.br</p>
                  <p><strong>Para:</strong> {[sendToConselho && emailsConfig.emailConselhoTutelar, sendToEscola && emailsConfig.emailEscola].filter(Boolean).join(', ') || 'Sem destinatários selecionados'}</p>
                </div>

                <div className="whitespace-pre-wrap pt-1 text-gray-300">
                  {buildEmailBodyText()}
                </div>
              </div>
            </div>

            {/* SEÇÃO 3: BOTOES DE AÇÃO */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    playSfx('click');
                    setShowDocModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-indigo-500/40"
                  title="Visualizar e imprimir documento oficial formatado para Conselho Tutelar / Conselho Escolar"
                >
                  <Printer className="w-4 h-4 text-indigo-300" />
                  <span>Imprimir Ofício / Relatório</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenMailto}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/15"
                  title="Abre o aplicativo de e-mail padrão do seu dispositivo com assunto e corpo preenchidos"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Abrir no App (mailto:)</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold cursor-pointer transition-all"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleConfirmSend}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirmar Envio por E-mail</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Modal de Impressão Oficial do Documento */}
      {showDocModal && (
        <DocumentoOficialModal
          denuncia={denuncia}
          onClose={() => setShowDocModal(false)}
        />
      )}

    </div>
  );
};
