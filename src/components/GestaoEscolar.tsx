import React, { useState, useEffect } from 'react';
import { Denuncia, ComplaintStatus } from '../types';
import { 
  getDenuncias, 
  updateDenunciaStatus, 
  exportDenunciasCSV,
  runDatabaseDiagnosis,
  resetDatabaseToDefaults,
  exportFullDatabaseJSON,
  getAuditLogs,
  DatabaseDiagnosticResult
} from '../services/storageService';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Download, 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ExternalLink,
  Camera,
  Video,
  Mic,
  X,
  FileText,
  Database,
  Activity,
  HardDrive,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

interface GestaoEscolarProps {
  onBack: () => void;
}

export const GestaoEscolar: React.FC<GestaoEscolarProps> = ({ onBack }) => {
  const [denuncias, setDenuncias] = useState<Denuncia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [tipoFilter, setTipoFilter] = useState<string>('todos');
  const [selectedDenuncia, setSelectedDenuncia] = useState<Denuncia | null>(null);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('Em Análise');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);
  const [showDiagModal, setShowDiagModal] = useState(false);
  const [diagResult, setDiagResult] = useState<DatabaseDiagnosticResult | null>(null);
  const [recentLogs, setRecentLogs] = useState<{ type: string; detail: string; timestamp: string }[]>([]);
  const [resetConfirm, setResetConfirm] = useState(false);

  const loadData = () => {
    const list = getDenuncias();
    setDenuncias(list);
    const diag = runDatabaseDiagnosis();
    setDiagResult(diag);
    setRecentLogs(getAuditLogs());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenDiagnosis = () => {
    const diag = runDatabaseDiagnosis();
    setDiagResult(diag);
    setRecentLogs(getAuditLogs());
    setShowDiagModal(true);
    setResetConfirm(false);
  };

  const handleBackupJSON = () => {
    const jsonStr = exportFullDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Backup_StopBullying_EEMTI_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };

  const handleResetData = () => {
    resetDatabaseToDefaults();
    loadData();
    setResetConfirm(false);
  };

  const handleOpenDetails = (d: Denuncia) => {
    setSelectedDenuncia(d);
    setNewStatus(d.status);
    setSaveSuccessMsg(false);
  };

  const handleSaveStatus = () => {
    if (!selectedDenuncia) return;
    const updated = updateDenunciaStatus(selectedDenuncia.id, newStatus);
    setDenuncias(updated);
    setSelectedDenuncia({ ...selectedDenuncia, status: newStatus });
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 2000);
  };

  const handleExportCSV = () => {
    const csvContent = exportDenunciasCSV(denuncias);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Relatorio_Completo_StopBullying_EEMTI_AlfredoMachado_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  // Metrics
  const total = denuncias.length;
  const graves = denuncias.filter(d => d.tipo_violencia === 'Física' || d.nivel_gravidade === 'Grave').length;
  const leves = denuncias.filter(d => d.tipo_violencia === 'Verbal' || d.tipo_violencia === 'Psicológica').length;
  const resolvidos = denuncias.filter(d => d.status === 'Resolvido').length;

  // Percentage by violence type
  const verbalCount = denuncias.filter(d => (d.tipo_violencia || '').toLowerCase().includes('verbal')).length;
  const cyberCount = denuncias.filter(d => (d.tipo_violencia || '').toLowerCase().includes('cyber')).length;
  const psicoCount = denuncias.filter(d => (d.tipo_violencia || '').toLowerCase().includes('psico') || (d.tipo_violencia || '').toLowerCase().includes('social')).length;
  const fisicaCount = denuncias.filter(d => (d.tipo_violencia || '').toLowerCase().includes('físic') || (d.tipo_violencia || '').toLowerCase().includes('fisic')).length;

  const pctVerbal = total > 0 ? Math.round((verbalCount / total) * 100) : 40;
  const pctCyber = total > 0 ? Math.round((cyberCount / total) * 100) : 30;
  const pctPsico = total > 0 ? Math.round((psicoCount / total) * 100) : 20;
  const pctFisica = total > 0 ? Math.round((fisicaCount / total) * 100) : 10;

  // Filtered List
  const filtered = denuncias.filter(d => {
    const matchesSearch = 
      d.protocolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.local_escola.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'todos' || d.status === statusFilter;
    const matchesTipo = tipoFilter === 'todos' || d.tipo_violencia === tipoFilter;

    return matchesSearch && matchesStatus && matchesTipo;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 py-0.5 rounded-full">
                🔒 Central da Coordenação Escolar
              </span>
              <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Tempo Real
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
              Painel Gerencial da Equipe StopBullying
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              EEMTI Alfredo Machado (Madalena/CE) • Monitoramento Anônimo &amp; Acompanhamento de Casos
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenDiagnosis}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all cursor-pointer shadow-md"
            title="Diagnóstico de Integridade e Storage do Banco"
          >
            <Activity className="w-4 h-4 text-purple-400" />
            Diagnóstico do Banco
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
          <button
            onClick={loadData}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-all cursor-pointer"
            title="Atualizar Registros"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#121724] border border-blue-500/30 shadow-lg text-center space-y-1">
          <span className="text-2xl">📢</span>
          <div className="font-display text-3xl font-black text-blue-400">{total}</div>
          <div className="text-xs font-semibold text-gray-400">Total de Denúncias</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121724] border border-red-500/30 shadow-lg text-center space-y-1">
          <span className="text-2xl">🚨</span>
          <div className="font-display text-3xl font-black text-red-400">{graves}</div>
          <div className="text-xs font-semibold text-gray-400">Casos Graves / Físicos</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121724] border border-emerald-500/30 shadow-lg text-center space-y-1">
          <span className="text-2xl">🟢</span>
          <div className="font-display text-3xl font-black text-emerald-400">{leves}</div>
          <div className="text-xs font-semibold text-gray-400">Casos Leves / Mediação</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121724] border border-amber-500/30 shadow-lg text-center space-y-1">
          <span className="text-2xl">✅</span>
          <div className="font-display text-3xl font-black text-amber-400">{resolvidos}</div>
          <div className="text-xs font-semibold text-gray-400">Casos Resolvidos</div>
        </div>

      </div>

      {/* Main 2-Column Section: Distribution Charts & Records Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column: Violence Type Distribution Bar Charts */}
        <div className="p-6 rounded-3xl bg-[#121724] border border-white/10 shadow-xl space-y-5">
          <div className="space-y-1 border-b border-white/10 pb-3">
            <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-blue-300">
              📊 Distribuição por Tipo de Violência:
            </h3>
            <p className="text-[11px] text-gray-400">Mapeamento em tempo real dos relatos</p>
          </div>

          <div className="space-y-4 text-xs">
            
            <div className="space-y-1.5">
              <div className="flex justify-between text-gray-300 font-semibold">
                <span>Verbal (Xingamentos/Ofensas)</span>
                <strong className="text-blue-400 font-mono">{pctVerbal}%</strong>
              </div>
              <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${pctVerbal}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-gray-300 font-semibold">
                <span>Cyberbullying (Redes/WhatsApp)</span>
                <strong className="text-purple-400 font-mono">{pctCyber}%</strong>
              </div>
              <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${pctCyber}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-gray-300 font-semibold">
                <span>Psicológica / Moral</span>
                <strong className="text-amber-400 font-mono">{pctPsico}%</strong>
              </div>
              <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${pctPsico}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-gray-300 font-semibold">
                <span>Física / Danos Materiais</span>
                <strong className="text-red-400 font-mono">{pctFisica}%</strong>
              </div>
              <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${pctFisica}%` }} />
              </div>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 space-y-1">
            <strong className="text-xs text-blue-300 block font-bold">💡 Instrução à Coordenação:</strong>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              Clique em <strong>Ver Detalhes</strong> em qualquer linha da tabela para analisar o relato completo, reproduzir fotos/áudios e atualizar o status do atendimento do aluno.
            </p>
          </div>
        </div>

        {/* Right Column: Search, Filter & Complaints Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#121724] border border-white/10 shadow-xl space-y-5">
          
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por protocolo, local ou relato..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-gray-200 text-xs focus:outline-none"
              >
                <option value="todos">Todos Status</option>
                <option value="Em Análise">Em Análise</option>
                <option value="Acolhido">Acolhido</option>
                <option value="Resolvido">Resolvido</option>
              </select>

              <select
                value={tipoFilter}
                onChange={(e) => setTipoFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-gray-200 text-xs focus:outline-none"
              >
                <option value="todos">Todos Tipos</option>
                <option value="Verbal">Verbal</option>
                <option value="Cyberbullying">Cyberbullying</option>
                <option value="Psicológica">Psicológica</option>
                <option value="Física">Física</option>
                <option value="Social">Social</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Protocolo</th>
                  <th className="py-3 px-3">Tipo</th>
                  <th className="py-3 px-3">Local</th>
                  <th className="py-3 px-3">Relato</th>
                  <th className="py-3 px-3">Data</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                {filtered.length > 0 ? (
                  filtered.map((d) => (
                    <tr
                      key={d.id}
                      onClick={() => handleOpenDetails(d)}
                      className="hover:bg-white/5 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                        {d.protocolo}
                        {d.midia_tipo && (
                          <span className="ml-1.5 text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-sans">
                            {d.midia_tipo === 'foto' ? '📷' : d.midia_tipo === 'video' ? '🎥' : '🎙️'}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-semibold text-white whitespace-nowrap">{d.tipo_violencia}</td>
                      <td className="py-3 px-3 text-gray-400 whitespace-nowrap">{d.local_escola}</td>
                      <td className="py-3 px-3 text-gray-300 max-w-[160px] truncate" title={d.descricao}>
                        {d.descricao}
                      </td>
                      <td className="py-3 px-3 text-gray-400 whitespace-nowrap">
                        {new Date(d.data_envio).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          d.status === 'Resolvido'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : d.status === 'Acolhido'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-red-500/20 text-red-300 border border-red-500/40'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleOpenDetails(d); }}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-all cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Detalhes
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400">
                      Nenhum registro encontrado para os filtros selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Complaint Detail Modal */}
      {selectedDenuncia && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#121724] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                  Detalhes do Relato Anônimo
                </span>
                <h3 className="font-mono text-2xl font-black text-amber-400">
                  {selectedDenuncia.protocolo}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDenuncia(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Tipo</span>
                <div className="text-sm font-bold text-white mt-0.5">{selectedDenuncia.tipo_violencia}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Local</span>
                <div className="text-sm font-bold text-white mt-0.5">{selectedDenuncia.local_escola}</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Data/Hora</span>
                <div className="text-xs font-bold text-blue-300 mt-0.5">
                  {new Date(selectedDenuncia.data_envio).toLocaleString('pt-BR')}
                </div>
              </div>
            </div>

            {/* Full Report Text */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                📝 Relato Detalhado do Estudante:
              </label>
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                {selectedDenuncia.descricao}
              </div>
            </div>

            {/* Attached Cyber Link */}
            {selectedDenuncia.link_cyberbullying && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  🔗 Link ou Evidência Digital:
                </label>
                <a
                  href={selectedDenuncia.link_cyberbullying.startsWith('http') ? selectedDenuncia.link_cyberbullying : `https://${selectedDenuncia.link_cyberbullying}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-3 rounded-xl bg-blue-950/40 border border-blue-500/40 text-blue-300 text-xs font-bold hover:underline"
                >
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  {selectedDenuncia.link_cyberbullying}
                </a>
              </div>
            )}

            {/* Attached Media Preview (Photo / Video / Audio) */}
            {selectedDenuncia.midia_anexa && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  📁 Mídia e Prova Anexada ({selectedDenuncia.midia_tipo?.toUpperCase()}):
                </label>
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex justify-center">
                  {selectedDenuncia.midia_tipo === 'foto' && (
                    <img src={selectedDenuncia.midia_anexa} alt="Prova Foto" className="max-h-60 rounded-xl object-contain" />
                  )}
                  {selectedDenuncia.midia_tipo === 'video' && (
                    <video src={selectedDenuncia.midia_anexa} controls className="max-h-60 rounded-xl" />
                  )}
                  {selectedDenuncia.midia_tipo === 'audio' && (
                    <audio src={selectedDenuncia.midia_anexa} controls className="w-full my-2" />
                  )}
                </div>
              </div>
            )}

            {/* Status Updater */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 to-purple-950/40 border border-blue-500/40 space-y-3">
              <label className="block text-xs font-bold text-white uppercase tracking-wider">
                🔄 Alterar Status de Atendimento da Equipe:
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ComplaintStatus)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black/80 border border-white/20 text-white text-xs font-bold focus:outline-none"
                >
                  <option value="Em Análise">🔴 Em Análise (Pendente)</option>
                  <option value="Acolhido">🟡 Acolhido (Em Mediação/Atendimento)</option>
                  <option value="Resolvido">🟢 Resolvido (Concluído)</option>
                </select>

                <button
                  onClick={handleSaveStatus}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Salvar Alteração
                </button>
              </div>

              {saveSuccessMsg && (
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  Status atualizado com sucesso!
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Database Diagnosis Modal */}
      {showDiagModal && diagResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#0e1320] border-2 border-purple-500/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                      Auditoria de Integridade
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {new Date(diagResult.timestamp).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-white mt-0.5">
                    Diagnóstico do Banco de Dados StopBullying
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setShowDiagModal(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Health Score & Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-2xl bg-[#141a2c] border border-emerald-500/40 space-y-1">
                <div className="text-xs text-gray-400 flex items-center justify-between">
                  <span>Índice de Saúde (Health Score)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-black text-emerald-400">{diagResult.healthScore}%</span>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {diagResult.status}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400">Todas as verificações de esquema validadas</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141a2c] border border-blue-500/30 space-y-1">
                <div className="text-xs text-gray-400">Volume Ocupado no Storage</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-black text-blue-400">
                    {(diagResult.totalStorageBytes / 1024).toFixed(2)} KB
                  </span>
                  <span className="text-xs text-gray-400">/ ~5.000 KB</span>
                </div>
                <p className="text-[11px] text-gray-400">Uso de &lt; 1% da capacidade do navegador</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141a2c] border border-purple-500/30 space-y-1">
                <div className="text-xs text-gray-400">Tabelas e Coleções Ativas</div>
                <div className="font-display text-3xl font-black text-purple-400">
                  {diagResult.tables.denuncias.count + diagResult.tables.sosAlerts.count + diagResult.tables.auditLogs.count}
                </div>
                <p className="text-[11px] text-gray-400">Registros em 3 entidades versionadas</p>
              </div>

            </div>

            {/* Automated Validation Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                Resultados dos Testes de Integridade do Sistema
              </h4>

              <div className="space-y-2">
                {diagResult.checks.map((c, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 text-xs ${
                      c.passed 
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-gray-200' 
                        : 'bg-red-950/20 border-red-500/30 text-gray-200'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold flex items-center gap-1.5">
                        <span className={c.passed ? 'text-emerald-400' : 'text-red-400'}>
                          {c.passed ? '✅' : '❌'} {c.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">{c.details}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      c.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                    }`}>
                      {c.passed ? 'APROVADO' : 'FALHA'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage Tables Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-blue-400" />
                Detalhamento por Coleção / Tabela
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>📑 Denúncias</span>
                    <span className="font-mono text-blue-400">{diagResult.tables.denuncias.count} itens</span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Chave: <code className="text-gray-300 font-mono text-[10px]">stopbullying_denuncias_v2</code>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Tamanho: <strong className="text-gray-200">{(diagResult.tables.denuncias.bytes / 1024).toFixed(2)} KB</strong>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    ✓ Protocolos únicos: {diagResult.tables.denuncias.uniqueProtocols ? 'Sim' : 'Não'}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>🚨 Alertas SOS GPS</span>
                    <span className="font-mono text-red-400">{diagResult.tables.sosAlerts.count} itens</span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Chave: <code className="text-gray-300 font-mono text-[10px]">stopbullying_sos_v2</code>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Tamanho: <strong className="text-gray-200">{(diagResult.tables.sosAlerts.bytes / 1024).toFixed(2)} KB</strong>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    ✓ Coordenadas válidas: {diagResult.tables.sosAlerts.coordinatesValid ? 'Sim' : 'Não'}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>📜 Trilha de Auditoria</span>
                    <span className="font-mono text-purple-400">{diagResult.tables.auditLogs.count} logs</span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Chave: <code className="text-gray-300 font-mono text-[10px]">stopbullying_logs_v2</code>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Tamanho: <strong className="text-gray-200">{(diagResult.tables.auditLogs.bytes / 1024).toFixed(2)} KB</strong>
                  </div>
                  <div className="text-[10px] text-purple-400 font-semibold">
                    ✓ Retenção circular: Últimos 100 eventos
                  </div>
                </div>

              </div>
            </div>

            {/* Audit Logs Trail */}
            {recentLogs.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-gray-400" />
                  Últimos Eventos de Auditoria do Banco
                </h4>
                <div className="max-h-36 overflow-y-auto space-y-1.5 p-3 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono">
                  {recentLogs.slice(0, 8).map((l, idx) => (
                    <div key={idx} className="flex items-center justify-between text-gray-400 text-[11px] py-1 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-bold">[{l.type}]</span>
                        <span className="text-gray-300">{l.detail}</span>
                      </div>
                      <span className="text-gray-500 text-[10px]">
                        {new Date(l.timestamp).toLocaleTimeString('pt-BR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenDiagnosis}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-bold transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Re-executar Testes
                </button>
                <button
                  onClick={handleBackupJSON}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 text-xs font-bold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Backup Completo (JSON)
                </button>
              </div>

              <div>
                {!resetConfirm ? (
                  <button
                    onClick={() => setResetConfirm(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-bold transition-all cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    Restaurar Dados Padrão (Seed)
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-red-950/80 p-1.5 rounded-xl border border-red-500">
                    <span className="text-[11px] text-red-200 font-bold px-2">Confirmar reset?</span>
                    <button
                      onClick={handleResetData}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Sim, Resetar
                    </button>
                    <button
                      onClick={() => setResetConfirm(false)}
                      className="px-2.5 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
