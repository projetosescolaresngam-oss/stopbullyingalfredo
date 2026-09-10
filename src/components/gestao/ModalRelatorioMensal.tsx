import React, { useState } from 'react';
import { Denuncia } from '../../types';
import { 
  getInstitutionalEmails, 
  saveInstitutionalEmails, 
  recordEmailDispatch,
  getDenuncias 
} from '../../services/storageService';
import { playBreathTone } from '../../services/audioSynthesizer';
import { 
  BarChart2, 
  Send, 
  Printer, 
  X, 
  Check, 
  Calendar, 
  Building2, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Users, 
  Mail, 
  Edit2, 
  Sparkles,
  Flame,
  CheckSquare,
  Copy
} from 'lucide-react';

interface ModalRelatorioMensalProps {
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const ModalRelatorioMensal: React.FC<ModalRelatorioMensalProps> = ({
  onClose,
  onSuccess
}) => {
  const [emailsConfig, setEmailsConfig] = useState(() => getInstitutionalEmails());
  const [editingEmails, setEditingEmails] = useState(false);

  // Mês Selecionado (Padrão: Mês Atual)
  const currentDate = new Date();
  const currentMonthFormatted = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  const [selectedMonth, setSelectedMonth] = useState(currentMonthFormatted);
  const [targetDestinatario, setTargetDestinatario] = useState<'conselho_tutelar' | 'conselho_escolar' | 'ambos'>('ambos');

  // Helper de correspondência flexível de mês (suporta YYYY-MM, DD/MM/YYYY, ISO string)
  const matchMonth = (dateStr: string | undefined, targetYYYYMM: string) => {
    if (!targetYYYYMM || targetYYYYMM === 'todos') return true;
    if (!dateStr) return false;

    // ISO string ex: 2026-09-10
    if (dateStr.startsWith(targetYYYYMM)) return true;

    // Formato brasileiro DD/MM/YYYY
    const brMatch = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (brMatch) {
      const [_, dd, mm, yyyy] = brMatch;
      if (`${yyyy}-${mm}` === targetYYYYMM) return true;
    }

    // Tentar converter para objeto Date
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        if (`${yyyy}-${mm}` === targetYYYYMM) return true;
      }
    } catch {}

    return false;
  };

  // Filtro de Denúncias do Mês
  const allDenuncias = getDenuncias();
  
  const denunciasDoMes = allDenuncias.filter(d => matchMonth(d.data_envio, selectedMonth));

  // Estatísticas do Período
  const totalNoMes = denunciasDoMes.length;
  const totalResolvidos = denunciasDoMes.filter(d => d.status === 'Resolvido').length;
  const totalAcolhidos = denunciasDoMes.filter(d => d.status === 'Acolhido').length;
  const totalEmAnalise = denunciasDoMes.filter(d => d.status === 'Em Análise').length;
  const totalSOS = denunciasDoMes.filter(d => d.is_sos || d.nivel_gravidade === 'Grave').length;

  // Distribuição por Tipo de Violência
  const tiposMap: Record<string, number> = {};
  denunciasDoMes.forEach(d => {
    const t = d.tipo_violencia || 'Geral';
    tiposMap[t] = (tiposMap[t] || 0) + 1;
  });

  // Transmissão
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

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

  const handleSaveEmails = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx('click');
    saveInstitutionalEmails(emailsConfig);
    setEditingEmails(false);
  };

  const monthYearFormattedLabel = () => {
    if (selectedMonth === 'todos') return 'Todos os Períodos Cadastrados';
    const [year, month] = selectedMonth.split('-');
    if (!year || !month) return 'Período Selecionado';
    const monthsNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const monthName = monthsNames[parseInt(month, 10) - 1] || 'Mês';
    return `${monthName} de ${year}`;
  };

  // Construir Texto do Relatório Mensal Executivo de acordo com o Destinatário Alvo
  const buildMonthlyReportText = () => {
    let headerTitle = "RELATÓRIO MENSAL DE OCORRÊNCIAS & MEDIAÇÃO ESCOLAR";
    if (targetDestinatario === 'conselho_tutelar') {
      headerTitle = "OFÍCIO E RELATÓRIO MENSAL DE ENCAMINHAMENTO INSTITUCIONAL (CONSELHO TUTELAR - ECA)";
    } else if (targetDestinatario === 'conselho_escolar') {
      headerTitle = "RELATÓRIO MENSAL DE PROTOCOLOS - MEDIAÇÃO ESCOLAR (CONSELHO ESCOLAR / SEDUC)";
    }

    let rep = `${headerTitle}\n`;
    rep += `=========================================================\n`;
    rep += `ESCOLA: EEMTI Alfredo Machado - Madalena – CE (CREDE 12)\n`;
    rep += `SISTEMA: Stop Bullying - Plataforma Antibullying & Mediação Restaurativa\n`;
    rep += `PERÍODO REFERÊNCIA: ${monthYearFormattedLabel()}\n`;
    rep += `DATA DE EMISSÃO: ${new Date().toLocaleString('pt-BR')}\n`;
    rep += `=========================================================\n\n`;

    rep += `1. RESUMO EXECUTIVO DO PERÍODO:\n`;
    rep += `- Total de Denúncias/Acolhimentos Registrados: ${totalNoMes}\n`;
    rep += `- Casos Resolvidos com Sucesso / Acordo Pactuado: ${totalResolvidos}\n`;
    rep += `- Casos em Mediação Restaurativa Ativa: ${totalAcolhidos}\n`;
    rep += `- Casos em Triagem Pedagógica Inicial: ${totalEmAnalise}\n`;
    rep += `- Alertas Prioritários (Grave / SOS): ${totalSOS}\n\n`;

    rep += `2. DISTRIBUIÇÃO POR TIPOLOGIA DE VIOLÊNCIA:\n`;
    if (Object.keys(tiposMap).length === 0) {
      rep += `- Nenhuma ocorrência registrada neste período.\n`;
    } else {
      Object.entries(tiposMap).forEach(([tipo, qtd]) => {
        rep += `- ${tipo}: ${qtd} caso(s) (${Math.round((qtd / (totalNoMes || 1)) * 100)}%)\n`;
      });
    }
    rep += `\n`;

    rep += `3. OCORRÊNCIAS & PROTOCOLOS DO PERÍODO:\n`;
    if (denunciasDoMes.length === 0) {
      rep += `- Período sem registros de violação no sistema.\n`;
    } else {
      denunciasDoMes.forEach((d, idx) => {
        rep += `${idx + 1}. PROTOCOLO: ${d.protocolo} | Data: ${d.data_envio ? new Date(d.data_envio).toLocaleDateString('pt-BR') : 'Recente'}\n`;
        rep += `   - Tipologia: ${d.tipo_violencia} | Local: ${d.local_escola} (${d.turno || 'Manhã'})\n`;
        rep += `   - Nível de Urgência: ${d.nivel_gravidade || 'Média'} | Status: ${d.status}\n`;
        rep += `   - Descrição Resumida: "${d.descricao ? d.descricao.slice(0, 100) + '...' : 'Sem resumo'}"\n\n`;
      });
    }

    rep += `4. MEDIDAS PROTETIVAS & LEGALIDADE:\n`;
    rep += `• Procedimentos conduzidos conforme Lei Federal nº 13.185/2015 (Antibullying) e Lei nº 14.811/2024.\n`;
    rep += `• Sigilo do estudante noticiante integralmente preservado nos termos do ECA (Lei nº 8.069/90).\n\n`;

    rep += `Atenciosamente,\n`;
    rep += `Comissão de Mediação Escolar & Acolhimento Pedagógico\n`;
    rep += `E.E.M.T.I. Alfredo Machado – Madalena – CE – SEDUC/CE\n`;
    return rep;
  };

  // Enviar Relatório Mensal por E-mail
  const handleSendMonthlyReport = () => {
    playSfx('send');
    setIsSending(true);
    setProgress(20);

    const dests = [
      `Conselho Tutelar (${emailsConfig.emailConselhoTutelar})`,
      `Diretoria da Escola (${emailsConfig.emailEscola})`
    ];

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            playSfx('success');
            recordEmailDispatch('', dests, 'relatorio_mensal');
            onSuccess(`Relatório Mensal de ${monthYearFormattedLabel()} enviado com sucesso para o Conselho Tutelar e a Escola!`);
            onClose();
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleCopyReportText = () => {
    playSfx('click');
    navigator.clipboard?.writeText(buildMonthlyReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
      
      <div className="w-full max-w-4xl rounded-3xl bg-[#0b101f] border border-indigo-500/40 p-5 sm:p-7 space-y-6 shadow-2xl relative text-white max-h-[95vh] overflow-y-auto">
        
        {/* CABEÇALHO */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-black uppercase tracking-wider">
              <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
              Relatório Periódico Institucional
            </div>
            <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight flex items-center gap-2">
              Relatório Mensal de Denúncias
            </h2>
            <p className="text-xs text-gray-400">
              Envio consolidado de dados do período para o Conselho Tutelar e Diretoria da Escola
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

        {isSending ? (
          <div className="p-8 rounded-2xl bg-black/50 border border-indigo-500/30 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-indigo-600/30 border border-indigo-400 flex items-center justify-center mx-auto text-indigo-300 animate-pulse">
              <Mail className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-black text-lg text-white">Disparando Relatório Mensal...</h3>
              <p className="text-xs text-gray-400">
                Enviando síntese de {monthYearFormattedLabel()} para {emailsConfig.emailConselhoTutelar} e {emailsConfig.emailEscola}.
              </p>
            </div>
            <div className="w-full max-w-md mx-auto bg-gray-800 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-indigo-300">{progress}% Concluído</span>
          </div>
        ) : (
          <div className="space-y-6">

            {/* SELETOR DE MÊS E CONFIGURAÇÃO DE E-MAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Seletor de Mês */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <label className="text-xs font-black uppercase text-indigo-300 tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-400" /> Selecione o Mês de Referência:
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono font-normal">
                    {denunciasDoMes.length} registro(s) encontrado(s)
                  </span>
                </label>
                
                <div className="flex items-center gap-2">
                  <input
                    type="month"
                    value={selectedMonth === 'todos' ? '' : selectedMonth}
                    onChange={(e) => {
                      playSfx('click');
                      setSelectedMonth(e.target.value || currentMonthFormatted);
                    }}
                    className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-indigo-400 cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => { playSfx('click'); setSelectedMonth(currentMonthFormatted); }}
                    className={`px-3 py-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedMonth === currentMonthFormatted
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                    }`}
                  >
                    Mês Atual
                  </button>
                  <button
                    type="button"
                    onClick={() => { playSfx('click'); setSelectedMonth('todos'); }}
                    className={`px-3 py-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedMonth === 'todos'
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'
                    }`}
                  >
                    Todos
                  </button>
                </div>

                <span className="text-[10px] text-gray-400 block">
                  Exibindo estatísticas de: <strong className="text-indigo-200">{monthYearFormattedLabel()}</strong>
                </span>
              </div>

              {/* Endereços de Destino */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-indigo-300 tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-indigo-400" /> E-mails de Destino Cadastrados:
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingEmails(!editingEmails)}
                    className="text-[10px] text-indigo-300 hover:text-white underline cursor-pointer"
                  >
                    {editingEmails ? 'Cancelar' : 'Alterar'}
                  </button>
                </div>

                {editingEmails ? (
                  <form onSubmit={handleSaveEmails} className="space-y-2 text-xs">
                    <input
                      type="email"
                      value={emailsConfig.emailConselhoTutelar}
                      onChange={(e) => setEmailsConfig(prev => ({ ...prev, emailConselhoTutelar: e.target.value }))}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/20 text-white font-mono text-[11px]"
                      placeholder="E-mail Conselho Tutelar"
                    />
                    <input
                      type="email"
                      value={emailsConfig.emailEscola}
                      onChange={(e) => setEmailsConfig(prev => ({ ...prev, emailEscola: e.target.value }))}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/20 text-white font-mono text-[11px]"
                      placeholder="E-mail Escola"
                    />
                    <button type="submit" className="px-3 py-1 bg-indigo-600 rounded text-[10px] font-bold">
                      Salvar
                    </button>
                  </form>
                ) : (
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-gray-300">
                      <span>Conselho Tutelar:</span>
                      <span className="font-mono text-purple-300 font-bold">{emailsConfig.emailConselhoTutelar}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-300">
                      <span>Escola / SEDUC:</span>
                      <span className="font-mono text-indigo-300 font-bold">{emailsConfig.emailEscola}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* PAINEL DE METRICAS DO MÊS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">Total no Mês</span>
                <span className="font-mono font-black text-2xl text-white">{totalNoMes}</span>
                <span className="text-[10px] text-gray-400 block">Ocorrências</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Resolvidos</span>
                <span className="font-mono font-black text-2xl text-emerald-400">{totalResolvidos}</span>
                <span className="text-[10px] text-gray-400 block">Pactuados</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-300 block">Acolhidos</span>
                <span className="font-mono font-black text-2xl text-blue-400">{totalAcolhidos}</span>
                <span className="text-[10px] text-gray-400 block">Em Mediação</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-rose-300 block">Alertas SOS / Grave</span>
                <span className="font-mono font-black text-2xl text-rose-400">{totalSOS}</span>
                <span className="text-[10px] text-gray-400 block">Prioritários</span>
              </div>

            </div>

            {/* DADOS DE ÚLTIMO ENVIO E AUTOMATIZAÇÃO */}
            <div className="p-4 rounded-2xl bg-indigo-900/20 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Envio Periódico Programado:</span>
                </div>
                <p className="text-[#a5b4fc] text-[11px]">
                  {emailsConfig.ultimoRelatorioMensalEnviado ? (
                    <>Último relatório enviado em: <strong>{new Date(emailsConfig.ultimoRelatorioMensalEnviado).toLocaleString('pt-BR')}</strong></>
                  ) : (
                    <>Pronto para realizar o primeiro disparo do mês de {monthYearFormattedLabel()}.</>
                  )}
                </p>
              </div>

              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px] self-start sm:self-auto">
                ✓ Agendamento Automático Ativo (Fim de Mês)
              </span>
            </div>

            {/* PRÉ-VISUALIZAÇÃO DO TEXTO DO RELATÓRIO */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-indigo-300 tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-400" /> Prévia do Relatório do Mês de {monthYearFormattedLabel()}:
                </span>
                <button
                  type="button"
                  onClick={handleCopyReportText}
                  className="text-[11px] text-indigo-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copiado!' : 'Copiar Relatório'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 font-mono text-[11px] text-gray-300 max-h-52 overflow-y-auto whitespace-pre-wrap leading-relaxed scrollbar-thin scrollbar-thumb-indigo-600/40">
                {buildMonthlyReportText()}
              </div>
            </div>

            {/* AÇÕES FINAIS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/10">
              
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/15"
              >
                <Printer className="w-4 h-4 text-indigo-300" />
                <span>Imprimir / Salvar PDF</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold cursor-pointer transition-all"
                >
                  Fechar
                </button>

                <button
                  type="button"
                  onClick={handleSendMonthlyReport}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Relatório do Mês por E-mail</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
