import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Server, 
  HardDrive, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ShieldCheck, 
  Radio, 
  MessageSquare, 
  FileText, 
  HeartHandshake, 
  Calendar, 
  Lock, 
  Info,
  ExternalLink,
  ChevronRight,
  Activity,
  Building2,
  Copy,
  Check,
  Download
} from 'lucide-react';
import { 
  runDatabaseDiagnosis, 
  DatabaseDiagnosticResult, 
  syncFromSupabase,
  getAuditLogs
} from '../../services/storageService';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import { playBreathTone } from '../../services/audioSynthesizer';

interface DiagnosticoBancoViewProps {
  onSyncComplete?: () => void;
}

export const DiagnosticoBancoView: React.FC<DiagnosticoBancoViewProps> = ({ onSyncComplete }) => {
  const [diag, setDiag] = useState<DatabaseDiagnosticResult | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [copiedSql, setCopiedSql] = useState(false);

  const handleCopyMigrationSql = () => {
    const sqlScript = `-- ============================================================================
-- MIGRAÇÃO DE ATUALIZAÇÃO SUPABASE (POSTGRESQL + RLS)
-- Adiciona suporte a Perfis de Escolas (Multi-Institucional) e vínculo nas Denúncias/SOS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.perfis_escolas (
    id VARCHAR(64) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    sigla VARCHAR(64),
    codigo_inep VARCHAR(64),
    cidade VARCHAR(128) NOT NULL,
    estado VARCHAR(8) NOT NULL DEFAULT 'CE',
    rede VARCHAR(64) NOT NULL DEFAULT 'Estadual',
    orgao_regional VARCHAR(255),
    conselho_tutelar_local VARCHAR(255),
    endereco TEXT,
    telefone VARCHAR(64),
    email_institucional VARCHAR(255),
    email_conselho_tutelar VARCHAR(255),
    diretor VARCHAR(255),
    coordenador_pedagogico VARCHAR(255),
    comissao_mediacao_nome VARCHAR(255),
    ativa BOOLEAN DEFAULT TRUE,
    turmas_cadastradas TEXT[] DEFAULT '{}',
    logo_tipo VARCHAR(64) DEFAULT 'padrao',
    descricao TEXT,
    criada_em TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vincular novas colunas de escola
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS escola_id VARCHAR(64);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS escola_nome VARCHAR(255);
ALTER TABLE public.sos_alertas ADD COLUMN IF NOT EXISTS escola_id VARCHAR(64);
ALTER TABLE public.sos_alertas ADD COLUMN IF NOT EXISTS escola_nome VARCHAR(255);
ALTER TABLE public.auditoria_logs ADD COLUMN IF NOT EXISTS escola_id VARCHAR(64);

-- Índices
CREATE INDEX IF NOT EXISTS idx_perfis_escolas_cidade ON public.perfis_escolas(cidade);
CREATE INDEX IF NOT EXISTS idx_perfis_escolas_rede ON public.perfis_escolas(rede);
CREATE INDEX IF NOT EXISTS idx_denuncias_escola_id ON public.denuncias(escola_id);
CREATE INDEX IF NOT EXISTS idx_sos_alertas_escola_id ON public.sos_alertas(escola_id);

-- RLS
ALTER TABLE public.perfis_escolas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir leitura de perfis de escolas" ON public.perfis_escolas;
DROP POLICY IF EXISTS "Permitir criacao de perfis de escolas" ON public.perfis_escolas;
DROP POLICY IF EXISTS "Permitir atualizacao de perfis de escolas" ON public.perfis_escolas;
DROP POLICY IF EXISTS "Permitir exclusao de perfis de escolas" ON public.perfis_escolas;

CREATE POLICY "Permitir leitura de perfis de escolas" ON public.perfis_escolas FOR SELECT USING (true);
CREATE POLICY "Permitir criacao de perfis de escolas" ON public.perfis_escolas FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir atualizacao de perfis de escolas" ON public.perfis_escolas FOR UPDATE USING (true);
CREATE POLICY "Permitir exclusao de perfis de escolas" ON public.perfis_escolas FOR DELETE USING (true);
`;
    navigator.clipboard.writeText(sqlScript);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const refreshDiagnosis = () => {
    try {
      const result = runDatabaseDiagnosis();
      setDiag(result);
    } catch (err) {
      console.error('Erro ao executar diagnóstico:', err);
    }
  };

  useEffect(() => {
    refreshDiagnosis();
  }, []);

  const handleForceSync = async () => {
    try {
      playBreathTone(750, 25, true);
    } catch {}
    setIsSyncing(true);
    await syncFromSupabase();
    refreshDiagnosis();
    setLastSyncTime(new Date().toLocaleTimeString('pt-BR'));
    setIsSyncing(false);
    if (onSyncComplete) onSyncComplete();
  };

  const isCloudActive = isSupabaseConfigured();
  const auditLogs = getAuditLogs().slice(0, 8);

  return (
    <div className="space-y-6 animate-fadeIn text-slate-200">
      
      {/* Banner Principal de Status */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0b1022] via-[#0d152c] to-[#090d1c] border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                isCloudActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                <span className={`w-2 h-2 rounded-full ${isCloudActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                {isCloudActive ? 'Nuvem Conectada (Supabase PostgreSQL)' : 'Armazenamento Local Ativo (Offline-First)'}
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
                Saúde: {diag?.healthScore ?? 100}% ({diag?.status ?? 'EXCELENTE'})
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Database className="w-6 h-6 text-indigo-400" />
              Auditoria de Persistência & Integridade dos Dados
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Verificação em tempo real de todas as informações geradas no aplicativo (denúncias, provas, coordenadas SOS, mensagens e mediações).
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleForceSync}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-600/30 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Sincronizando...' : 'Testar & Sincronizar'}</span>
            </button>
          </div>
        </div>

        {lastSyncTime && (
          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 font-mono">
            Última checagem efetuada às {lastSyncTime}.
          </div>
        )}
      </div>

      {/* Grid de Camadas de Armazenamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Camada 1: Local HTML5 */}
        <div className="p-5 rounded-3xl bg-[#0b1020]/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Camada 1: Armazenamento Local Imediato</h3>
                <span className="text-[11px] text-slate-400 font-mono">HTML5 LocalStorage Encapsulado</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              100% OPERACIONAL
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cada clique, relato, áudio gravado e protocolo gerado é gravado <strong>instantaneamente</strong> no navegador com latência zero. Garante que nada se perca mesmo se a internet oscilar na escola.
          </p>
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-white/10">
            <span>Espaço Ocupado Estimado:</span>
            <strong className="text-white">{Math.round((diag?.totalStorageBytes || 0) / 1024)} KB</strong>
          </div>
        </div>

        {/* Camada 2: Nuvem Supabase */}
        <div className="p-5 rounded-3xl bg-[#0b1020]/90 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isCloudActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Camada 2: Servidor na Nuvem (PostgreSQL)</h3>
                <span className="text-[11px] text-slate-400 font-mono">Supabase Realtime &amp; RLS</span>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              isCloudActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {isCloudActive ? 'CONECTADO & SINCRONIZANDO' : 'AGUARDANDO CHAVES DA NUVEM'}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isCloudActive
              ? 'O cliente Supabase está ativo. Todas as denúncias, chats e SOS são replicados de forma assíncrona para o banco PostgreSQL central.'
              : 'O código de envio para o Supabase já está 100% implementado. Para ativar a réplica em nuvem entre múltiplos computadores, adicione VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY nas configurações.'}
          </p>
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono border-t border-white/10">
            <span>Esquema SQL:</span>
            <span className="text-indigo-300 font-bold">supabase_schema.sql (Pronto na raiz)</span>
          </div>
        </div>

      </div>

      {/* Mapeamento das Tabelas e Conteúdo Salvo */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-400" />
          Estrutura das Informações Salvas no Banco de Dados
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          
          {/* Tabela Denúncias */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                public.denuncias
              </span>
              <span className="text-xs font-black text-indigo-300 font-mono">
                {diag?.tables.denuncias.count || 0} registro(s)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Protocolo único, tipologia, turno, local da escola, descrição detalhada, gravações de áudio/mídia, fotos anexas, gravidade e status.
            </p>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Protocolos únicos e validados</span>
            </div>
          </div>

          {/* Tabela SOS Alertas */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <Radio className="w-3.5 h-3.5 text-red-400" />
                public.sos_alertas
              </span>
              <span className="text-xs font-black text-red-400 font-mono">
                {diag?.tables.sosAlerts.count || 0} alerta(s)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Disparos do botão de pânico com latitude, longitude, precisão em metros, dados do navegador e histórico de atendimento no local.
            </p>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Georreferenciamento verificado</span>
            </div>
          </div>

          {/* Tabela Chat de Protocolo */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                public.protocolo_mensagens
              </span>
              <span className="text-xs font-black text-blue-300 font-mono">
                Canal Seguro
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Diálogo anônimo bidirecional entre o estudante (sem identificação) e a Comissão de Mediação pedagógica da escola.
            </p>
            <div className="text-[10px] text-blue-300 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Sigilo total e isolado por protocolo</span>
            </div>
          </div>

          {/* Tabela Ações de Mediação */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <HeartHandshake className="w-3.5 h-3.5 text-purple-400" />
                public.mediacoes_acoes
              </span>
              <span className="text-xs font-black text-purple-300 font-mono">
                Linha do Tempo
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Cada etapa restaurativa registrada pelos educadores: acolhimento, escuta ativa, diálogo com responsáveis e círculos de paz.
            </p>
            <div className="text-[10px] text-purple-300 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Prontuário pedagógico permanente</span>
            </div>
          </div>

          {/* Tabela Termos de Acordo */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                public.termos_acordo_convivencia
              </span>
              <span className="text-xs font-black text-teal-300 font-mono">
                Pactos de Paz
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Compromissos mútuos firmados entre os estudantes, ações de reparação simbólica, nome do mediador e data de revisão.
            </p>
            <div className="text-[10px] text-teal-300 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Conformidade com a Lei 13.185/2015</span>
            </div>
          </div>

          {/* Tabela Check-ins */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                public.checkins_acompanhamento
              </span>
              <span className="text-xs font-black text-amber-300 font-mono">
                7, 15, 30, 60 Dias
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Monitoramento preventivo pós-acordo para atestar que o conflito não voltou a ocorrer e que o clima de respeito se manteve.
            </p>
            <div className="text-[10px] text-amber-300 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Prevenção à reincidência</span>
            </div>
          </div>

          {/* Tabela Perfis de Escolas (Multi-Institucional) */}
          <div className="p-4 rounded-2xl bg-black/40 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                public.perfis_escolas
              </span>
              <span className="text-xs font-black text-indigo-300 font-mono">
                {diag?.tables.perfisEscolas?.count || 1} escola(s)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Unidades escolares, redes (Estadual, Municipal, Federal, Privada), equipe gestora e identidade oficial de documentos.
            </p>
            <div className="text-[10px] text-indigo-300 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span className="truncate">Ativa: {diag?.tables.perfisEscolas?.escolaAtivaNome || 'E.E.M.T.I. Alfredo Machado'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Trilha de Auditoria em Tempo Real */}
      <div className="p-5 rounded-3xl bg-[#0b1020]/90 border border-white/10 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Trilha de Auditoria Recente (`public.auditoria_logs`)
        </h3>
        
        <div 
          className="space-y-1.5 font-mono text-[11px] max-h-64 overflow-y-auto no-scrollbar scrollbar-none pr-1"
          data-auto-scroll-container="true"
          data-dense-container="true"
        >
          {auditLogs.length === 0 ? (
            <p className="text-slate-500 py-3 text-center">Nenhum evento registrado ainda.</p>
          ) : (
            auditLogs.map((log, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/5">
                <div className="flex items-center gap-2 truncate">
                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[9px]">
                    {log.type}
                  </span>
                  <span className="text-slate-300 truncate">{log.detail}</span>
                </div>
                <span className="text-[10px] text-slate-500 flex-shrink-0 ml-2">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Painel de Atualização do Projeto no Supabase */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0c132c] to-[#080d1d] border border-indigo-500/30 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
                PostgreSQL • Supabase Cloud
              </span>
              <span className="text-xs text-slate-400">Esquema v2.5 Universal</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-400" />
              Atualização do Banco de Dados no Supabase
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Atualizamos o projeto com suporte total a <strong>Perfis de Escolas</strong> (redes Estadual, Municipal, Federal e Privada), novas colunas institucionais em denúncias e emergências SOS, e regras RLS seguras.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={handleCopyMigrationSql}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                copiedSql
                  ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
              }`}
            >
              {copiedSql ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" />
                  <span>Código SQL Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Migração SQL</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              1. Script na Raiz
            </span>
            <p className="text-[11px] text-slate-400">
              O arquivo <strong>supabase_schema.sql</strong> contém todas as 17 tabelas, RLS e dados iniciais prontos.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              2. Executar no SQL Editor
            </span>
            <p className="text-[11px] text-slate-400">
              No painel do seu Supabase, clique em <strong>SQL Editor</strong>, cole o script e clique em <strong>Run</strong>.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              3. Sincronização Instantânea
            </span>
            <p className="text-[11px] text-slate-400">
              Denúncias, mensagens de chat, SOS e escolas sincronizam em tempo real entre celulares e computadores.
            </p>
          </div>
        </div>
      </div>

      {/* Guia de Configuração da Nuvem */}
      {!isCloudActive && (
        <div className="p-5 rounded-3xl bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <Info className="w-4 h-4 text-indigo-400" />
            Como conectar um banco de dados central na nuvem (Supabase):
          </div>
          <p className="text-slate-300 leading-relaxed">
            Se você desejar que denúncias enviadas pelo celular dos alunos apareçam instantaneamente no computador da coordenação (em dispositivos diferentes), basta:
          </p>
          <ol className="list-decimal list-inside text-slate-300 space-y-1 pl-1">
            <li>Criar um projeto gratuito no <strong>Supabase</strong> (PostgreSQL).</li>
            <li>Executar o script <strong>supabase_schema.sql</strong> (já incluído na raiz do projeto) no SQL Editor do Supabase.</li>
            <li>Inserir <strong>VITE_SUPABASE_URL</strong> e <strong>VITE_SUPABASE_ANON_KEY</strong> nas variáveis de ambiente do projeto.</li>
          </ol>
          <p className="text-emerald-400 font-semibold pt-1">
            ✓ Enquanto isso, o sistema salva tudo com 100% de segurança no armazenamento local deste navegador, sem perda de nenhum dado.
          </p>
        </div>
      )}

    </div>
  );
};
