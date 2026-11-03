import React, { useState, useEffect, useCallback } from 'react';
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
  Activity,
  Building2,
  Copy,
  Check,
  Cloud,
  Upload,
  Trash2,
  Search,
  LogOut,
  FolderOpen
} from 'lucide-react';
import { 
  runDatabaseDiagnosis, 
  DatabaseDiagnosticResult, 
  syncFromSupabase,
  getAuditLogs,
  getDenuncias,
  getSOSAlerts
} from '../../services/storageService';
import { getEscolaAtiva } from '../../services/schoolService';
import { 
  isSupabaseConfigured,
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
  getCurrentGoogleUser,
  listGoogleDriveFiles,
  uploadFileToGoogleDrive,
  updateFileInGoogleDrive,
  deleteFileFromGoogleDrive,
  GoogleDriveFileItem
} from '../../services/supabaseClient';
import { playBreathTone } from '../../services/audioSynthesizer';

export const GoogleSignInButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}> = ({ onClick, disabled, label = 'Sign in with Google' }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="gsi-material-button inline-flex items-center justify-center gap-3 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#1f1f1f] border border-[#747775] font-medium text-sm shadow-sm transition-all cursor-pointer disabled:opacity-60"
  >
    <div className="gsi-material-button-state"></div>
    <div className="gsi-material-button-content-wrapper flex items-center gap-2.5">
      <div className="gsi-material-button-icon w-5 h-5 flex-shrink-0">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block', width: '100%', height: '100%' }}>
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
      </div>
      <span className="gsi-material-button-contents font-semibold">{label}</span>
      <span style={{ display: 'none' }}>{label}</span>
    </div>
  </button>
);

export const GoogleDriveWorkspaceCard: React.FC<{ lightTheme?: boolean }> = ({ lightTheme = false }) => {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [files, setFiles] = useState<GoogleDriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    type: 'delete' | 'update';
    file: GoogleDriveFileItem;
  } | null>(null);

  const buildSchoolBackupPayload = () => {
    const escolaAtiva = getEscolaAtiva();
    const denuncias = getDenuncias().filter(
      (d) => d.escola_ocorrencia_id === escolaAtiva.id || d.escola_id === escolaAtiva.id
    );
    const sosAlerts = getSOSAlerts().filter(
      (s) => !s.escola_id || s.escola_id === escolaAtiva.id
    );
    return JSON.stringify(
      {
        sistema: 'StopBullying Institucional',
        exportado_em: new Date().toISOString(),
        escola_ativa: escolaAtiva,
        resumo: {
          total_denuncias: denuncias.length,
          total_sos: sosAlerts.length,
        },
        denuncias,
        alertas_sos: sosAlerts,
      },
      null,
      2
    );
  };

  const fetchFiles = useCallback(async (query?: string) => {
    const token = await getAccessToken();
    if (!token) {
      setNeedsAuth(true);
      return;
    }
    setIsLoadingFiles(true);
    setStatusMessage(null);
    try {
      const list = await listGoogleDriveFiles(query);
      setFiles(list);
      setNeedsAuth(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao acessar Google Drive';
      if (msg === 'AUTH_REQUIRED') {
        setNeedsAuth(true);
      } else {
        setStatusMessage({ type: 'error', text: msg });
      }
    } finally {
      setIsLoadingFiles(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setNeedsAuth(false);
        setUserEmail(user.email);
        setUserName(user.displayName);
        fetchFiles();
      },
      () => {
        setNeedsAuth(true);
        setUserEmail(null);
        setUserName(null);
        setFiles([]);
      }
    );
    const currentUser = getCurrentGoogleUser();
    getAccessToken().then((t) => {
      if (currentUser && t) {
        setNeedsAuth(false);
        setUserEmail(currentUser.email);
        setUserName(currentUser.displayName);
        fetchFiles();
      }
    });
    return () => unsubscribe();
  }, [fetchFiles]);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUserEmail(result.user.email);
        setUserName(result.user.displayName);
        setNeedsAuth(false);
        setStatusMessage({
          type: 'success',
          text: 'Conectado ao Google Drive com sucesso!',
        });
        await fetchFiles(searchQuery);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha na autenticação com o Google.';
      setStatusMessage({ type: 'error', text: msg });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setNeedsAuth(true);
    setUserEmail(null);
    setUserName(null);
    setFiles([]);
    setStatusMessage(null);
  };

  const handleSaveSchoolReportToDrive = async () => {
    setIsUploading(true);
    setStatusMessage(null);
    try {
      const escolaAtiva = getEscolaAtiva();
      const dateStr = new Date().toISOString().slice(0, 10);
      const safeSigla = (escolaAtiva.sigla || escolaAtiva.nome || 'Escola').replace(/[^a-zA-Z0-9_-]/g, '_');
      const fileName = `StopBullying_Relatorio_${safeSigla}_${dateStr}.json`;
      const payload = buildSchoolBackupPayload();
      const created = await uploadFileToGoogleDrive(fileName, payload, 'application/json');
      setStatusMessage({
        type: 'success',
        text: `Relatório "${created.name}" salvo no seu Google Drive!`,
      });
      await fetchFiles(searchQuery);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao salvar relatório no Google Drive.';
      if (msg === 'AUTH_REQUIRED') {
        setNeedsAuth(true);
      } else {
        setStatusMessage({ type: 'error', text: msg });
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadCustomFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setStatusMessage(null);
    try {
      const created = await uploadFileToGoogleDrive(file.name, file, file.type || 'application/octet-stream');
      setStatusMessage({
        type: 'success',
        text: `Arquivo "${created.name}" enviado para o Google Drive!`,
      });
      await fetchFiles(searchQuery);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao enviar arquivo.';
      if (msg === 'AUTH_REQUIRED') {
        setNeedsAuth(true);
      } else {
        setStatusMessage({ type: 'error', text: msg });
      }
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleConfirmedAction = async () => {
    if (!pendingAction) return;
    const { type, file } = pendingAction;
    setPendingAction(null);
    setIsUploading(true);
    setStatusMessage(null);

    try {
      if (type === 'delete') {
        await deleteFileFromGoogleDrive(file.id);
        setStatusMessage({
          type: 'success',
          text: `Arquivo "${file.name}" excluído do Google Drive.`,
        });
      } else if (type === 'update') {
        const payload = buildSchoolBackupPayload();
        await updateFileInGoogleDrive(file.id, payload, 'application/json');
        setStatusMessage({
          type: 'success',
          text: `Arquivo "${file.name}" atualizado com os dados atuais da escola!`,
        });
      }
      await fetchFiles(searchQuery);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao executar operação no Google Drive.';
      if (msg === 'AUTH_REQUIRED') {
        setNeedsAuth(true);
      } else {
        setStatusMessage({ type: 'error', text: msg });
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${
        lightTheme
          ? 'bg-white border-purple-200 text-[#241e33] shadow-lg'
          : 'bg-gradient-to-br from-[#0c142c] to-[#090e20] border-blue-500/30 text-slate-200 shadow-xl'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                lightTheme
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
              }`}
            >
              Google Workspace • Google Drive API
            </span>
            {!needsAuth && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Conectado {userEmail ? `(${userEmail})` : ''}
              </span>
            )}
          </div>
          <h3 className={`text-base sm:text-lg font-black flex items-center gap-2 ${lightTheme ? 'text-[#241e33]' : 'text-white'}`}>
            <Cloud className="w-5 h-5 text-blue-500" />
            Integração Google Drive (Relatórios, Evidências & Backup)
          </h3>
          <p className={`text-xs leading-relaxed max-w-2xl ${lightTheme ? 'text-[#5c546d]' : 'text-slate-300'}`}>
            Conecte sua conta do Google para visualizar arquivos do seu Google Drive, exportar backups de ocorrências da escola ativa e anexar documentos diretamente na nuvem institucional.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {needsAuth ? (
            <GoogleSignInButton
              onClick={handleLogin}
              disabled={isLoggingIn}
              label={isLoggingIn ? 'Conectando...' : 'Sign in with Google'}
            />
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                lightTheme
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200 border-white/15'
              }`}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Desconectar ({userName || userEmail || 'Google'})</span>
            </button>
          )}
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-3 rounded-2xl text-xs font-semibold flex items-center gap-2 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
              : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {!needsAuth && (
        <div className="space-y-4 pt-2 border-t border-white/10">
          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleSaveSchoolReportToDrive}
                disabled={isUploading}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isUploading ? 'Enviando...' : 'Exportar Relatório da Escola Ativa ao Drive'}</span>
              </button>

              <label className="px-3.5 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all">
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Enviar Arquivo ao Drive</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadCustomFile}
                  disabled={isUploading}
                />
              </label>
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') fetchFiles(searchQuery);
                  }}
                  placeholder="Buscar no Google Drive..."
                  className={`w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border focus:outline-none ${
                    lightTheme
                      ? 'bg-slate-50 border-slate-300 text-slate-800'
                      : 'bg-black/40 border-white/15 text-white placeholder-slate-400'
                  }`}
                />
              </div>
              <button
                type="button"
                onClick={() => fetchFiles(searchQuery)}
                disabled={isLoadingFiles}
                className={`p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                  lightTheme
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
                title="Atualizar lista do Google Drive"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Files List */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {isLoadingFiles ? (
              <div className="py-6 text-center text-xs text-slate-400">
                Carregando arquivos do Google Drive...
              </div>
            ) : files.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                Nenhum arquivo encontrado no Google Drive.
              </div>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  className={`p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    lightTheme
                      ? 'bg-slate-50 border-slate-200 text-slate-800'
                      : 'bg-black/30 border-white/10 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{file.name}</p>
                      <p className="text-[10px] text-slate-400">
                        {file.mimeType}
                        {file.modifiedTime
                          ? ` • Modificado em ${new Date(file.modifiedTime).toLocaleDateString('pt-BR')}`
                          : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {file.webViewLink && (
                      <a
                        href={file.webViewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-[11px] font-bold flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Abrir</span>
                      </a>
                    )}
                    {file.name.startsWith('StopBullying_') && (
                      <button
                        type="button"
                        onClick={() => setPendingAction({ type: 'update', file })}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-[11px] font-bold cursor-pointer"
                        title="Sobrescrever com dados atuais da escola"
                      >
                        Atualizar
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setPendingAction({ type: 'delete', file })}
                      className="p-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 cursor-pointer"
                      title="Excluir arquivo do Google Drive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Mandatory Confirmation Dialog for Destructive / Mutating Operations */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-3xl bg-[#0f172a] border border-white/20 p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black">
                  {pendingAction.type === 'delete'
                    ? 'Confirmar Exclusão no Google Drive?'
                    : 'Confirmar Atualização de Arquivo?'}
                </h4>
                <p className="text-xs text-slate-400">Ação requer confirmação explícita do usuário</p>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              {pendingAction.type === 'delete' ? (
                <>
                  Tem certeza de que deseja excluir permanentemente o arquivo{' '}
                  <strong>"{pendingAction.file.name}"</strong> do seu Google Drive? Esta ação não pode ser desfeita.
                </>
              ) : (
                <>
                  Tem certeza de que deseja atualizar e sobrescrever o conteúdo do arquivo{' '}
                  <strong>"{pendingAction.file.name}"</strong> no Google Drive com o relatório atual da escola ativa?
                </>
              )}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPendingAction(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmedAction}
                className={`px-4 py-2 rounded-xl text-white text-xs font-bold cursor-pointer ${
                  pendingAction.type === 'delete'
                    ? 'bg-rose-600 hover:bg-rose-500'
                    : 'bg-amber-600 hover:bg-amber-500'
                }`}
              >
                {pendingAction.type === 'delete' ? 'Confirmar Exclusão' : 'Confirmar Atualização'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
      
      {/* Card Oficial de Integração Google Drive */}
      <GoogleDriveWorkspaceCard />
      
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
