import React, { useState, useEffect } from 'react';
import {
  Building2,
  Plus,
  Check,
  CheckCircle2,
  Edit3,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Users,
  Shield,
  ShieldCheck,
  Award,
  Sparkles,
  Search,
  Filter,
  X,
  RefreshCw,
  School,
  FileText,
  AlertTriangle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PerfilEscola } from '../../types';
import {
  getEscolas,
  getEscolaAtiva,
  setEscolaAtiva,
  salvarEscola,
  excluirEscola,
  importarModeloExemplo,
  restaurarEscolasPadrao,
  MODELOS_ESCOLAS_EXEMPLO
} from '../../services/schoolService';

interface PerfisEscolasTabProps {
  onSelectEscola?: (escola: PerfilEscola) => void;
  onNavigateToDocumentos?: () => void;
}

export const PerfisEscolasTab: React.FC<PerfisEscolasTabProps> = ({
  onSelectEscola,
  onNavigateToDocumentos
}) => {
  const [escolas, setEscolas] = useState<PerfilEscola[]>(getEscolas());
  const [escolaAtiva, setEscolaAtivaState] = useState<PerfilEscola>(getEscolaAtiva());
  const [searchTerm, setSearchTerm] = useState('');
  const [redeFiltro, setRedeFiltro] = useState<'Todas' | 'Estadual' | 'Municipal' | 'Federal' | 'Privada'>('Todas');

  // Controle de modal de criação / edição
  const [modalAberto, setModalAberto] = useState(false);
  const [escolaEmEdicao, setEscolaEmEdicao] = useState<PerfilEscola | null>(null);

  // Campos do formulário
  const [formNome, setFormNome] = useState('');
  const [formSigla, setFormSigla] = useState('');
  const [formInep, setFormInep] = useState('');
  const [formRede, setFormRede] = useState<'Estadual' | 'Municipal' | 'Federal' | 'Privada'>('Estadual');
  const [formCidade, setFormCidade] = useState('');
  const [formEstado, setFormEstado] = useState('CE');
  const [formOrgaoRegional, setFormOrgaoRegional] = useState('');
  const [formConselhoTutelar, setFormConselhoTutelar] = useState('');
  const [formEmailConselho, setFormEmailConselho] = useState('');
  const [formEndereco, setFormEndereco] = useState('');
  const [formTelefone, setFormTelefone] = useState('');
  const [formEmailInstitucional, setFormEmailInstitucional] = useState('');
  const [formDiretor, setFormDiretor] = useState('');
  const [formCoordenador, setFormCoordenador] = useState('');
  const [formComissaoMediacao, setFormComissaoMediacao] = useState('');
  const [formDescricao, setFormDescricao] = useState('');
  const [formTurmas, setFormTurmas] = useState<string[]>([]);
  const [novaTurmaInput, setNovaTurmaInput] = useState('');

  // Mensagens e feedback
  const [toastMsg, setToastMsg] = useState<{ tipo: 'sucesso' | 'erro' | 'info'; texto: string } | null>(null);
  const [confirmarExclusaoId, setConfirmarExclusaoId] = useState<string | null>(null);

  const showToast = (texto: string, tipo: 'sucesso' | 'erro' | 'info' = 'sucesso') => {
    setToastMsg({ tipo, texto });
    setTimeout(() => setToastMsg(null), 3800);
  };

  const recarregarEscolas = () => {
    setEscolas(getEscolas());
    setEscolaAtivaState(getEscolaAtiva());
  };

  useEffect(() => {
    const handleUpdate = () => {
      recarregarEscolas();
    };
    window.addEventListener('escola_ativa_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('escola_ativa_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const abrirModalCriacao = () => {
    setEscolaEmEdicao(null);
    setFormNome('');
    setFormSigla('');
    setFormInep('');
    setFormRede('Estadual');
    setFormCidade('Madalena');
    setFormEstado('CE');
    setFormOrgaoRegional('SEDUC • CREDE 12 • REGIONAL – CE');
    setFormConselhoTutelar('Conselho Tutelar Municipal');
    setFormEmailConselho('');
    setFormEndereco('');
    setFormTelefone('');
    setFormEmailInstitucional('');
    setFormDiretor('');
    setFormCoordenador('');
    setFormComissaoMediacao('Comissão de Mediação Escolar & Cultura de Paz');
    setFormDescricao('');
    setFormTurmas(['1º Ano A', '2º Ano A', '3º Ano A']);
    setNovaTurmaInput('');
    setModalAberto(true);
  };

  const abrirModalEdicao = (escola: PerfilEscola) => {
    setEscolaEmEdicao(escola);
    setFormNome(escola.nome);
    setFormSigla(escola.sigla || '');
    setFormInep(escola.codigo_inep || '');
    setFormRede(escola.rede || 'Estadual');
    setFormCidade(escola.cidade);
    setFormEstado(escola.estado);
    setFormOrgaoRegional(escola.orgao_regional || '');
    setFormConselhoTutelar(escola.conselho_tutelar_local || '');
    setFormEmailConselho(escola.email_conselho_tutelar || '');
    setFormEndereco(escola.endereco || '');
    setFormTelefone(escola.telefone || '');
    setFormEmailInstitucional(escola.email_institucional || '');
    setFormDiretor(escola.diretor || '');
    setFormCoordenador(escola.coordenador_pedagogico || '');
    setFormComissaoMediacao(escola.comissao_mediacao_nome || '');
    setFormDescricao(escola.descricao || '');
    setFormTurmas(escola.turmas_cadastradas && escola.turmas_cadastradas.length > 0 
      ? [...escola.turmas_cadastradas] 
      : ['1º Ano', '2º Ano', '3º Ano']);
    setNovaTurmaInput('');
    setModalAberto(true);
  };

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formNome.trim()) {
      showToast('Por favor, informe o nome oficial da escola.', 'erro');
      return;
    }
    if (!formCidade.trim() || !formEstado.trim()) {
      showToast('Informe o município e a UF da escola.', 'erro');
      return;
    }

    try {
      const salva = salvarEscola({
        id: escolaEmEdicao ? escolaEmEdicao.id : undefined,
        nome: formNome.trim(),
        sigla: formSigla.trim() || formNome.substring(0, 10).toUpperCase(),
        codigo_inep: formInep.trim(),
        rede: formRede,
        cidade: formCidade.trim(),
        estado: formEstado.trim().toUpperCase(),
        orgao_regional: formOrgaoRegional.trim() || `SEDUC / REGIONAL • ${formCidade.toUpperCase()} – ${formEstado.toUpperCase()}`,
        conselho_tutelar_local: formConselhoTutelar.trim() || `Conselho Tutelar de ${formCidade} – ${formEstado}`,
        email_conselho_tutelar: formEmailConselho.trim(),
        endereco: formEndereco.trim(),
        telefone: formTelefone.trim(),
        email_institucional: formEmailInstitucional.trim(),
        diretor: formDiretor.trim() || 'Direção Escolar',
        coordenador_pedagogico: formCoordenador.trim() || 'Coordenação Pedagógica',
        comissao_mediacao_nome: formComissaoMediacao.trim() || 'Comissão de Mediação Escolar',
        turmas_cadastradas: formTurmas.length > 0 ? formTurmas : ['1º Ano', '2º Ano', '3º Ano'],
        descricao: formDescricao.trim() || 'Unidade escolar ativa no Sistema StopBullying.',
        logo_tipo: formRede === 'Municipal' ? 'municipal' : formRede === 'Privada' ? 'personalizado' : 'estadual'
      });

      // Se é uma escola nova criada, ativá-la automaticamente
      if (!escolaEmEdicao) {
        setEscolaAtiva(salva.id);
      }

      recarregarEscolas();
      setModalAberto(false);
      showToast(
        escolaEmEdicao 
          ? `Perfil da escola "${salva.nome}" atualizado com sucesso!` 
          : `Nova escola "${salva.nome}" cadastrada e ativada no sistema!`, 
        'sucesso'
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha ao salvar perfil escolar.';
      showToast(msg, 'erro');
    }
  };

  const handleAtivarEscola = (escolaId: string) => {
    try {
      const ativa = setEscolaAtiva(escolaId);
      recarregarEscolas();
      if (onSelectEscola) onSelectEscola(ativa);
      showToast(`Escola ativa alterada para "${ativa.nome}". Relatórios e documentos oficiais agora usarão esta instituição!`, 'sucesso');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao ativar escola.';
      showToast(msg, 'erro');
    }
  };

  const handleExcluir = (escolaId: string) => {
    try {
      excluirEscola(escolaId);
      setConfirmarExclusaoId(null);
      recarregarEscolas();
      showToast('Perfil de escola removido com sucesso.', 'info');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Não foi possível excluir a escola.';
      showToast(msg, 'erro');
    }
  };

  const handleImportarModelo = (idx: number) => {
    try {
      const nova = importarModeloExemplo(idx);
      recarregarEscolas();
      showToast(`Modelo "${nova.nome}" importado com sucesso!`, 'sucesso');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao importar modelo.';
      showToast(msg, 'erro');
    }
  };

  const handleAdicionarTurma = () => {
    if (!novaTurmaInput.trim()) return;
    const t = novaTurmaInput.trim();
    if (!formTurmas.includes(t)) {
      setFormTurmas([...formTurmas, t]);
    }
    setNovaTurmaInput('');
  };

  const handleRemoverTurma = (turmaNome: string) => {
    setFormTurmas(formTurmas.filter(t => t !== turmaNome));
  };

  // Filtragem de escolas
  const escolasFiltradas = escolas.filter(e => {
    const matchBusca = 
      e.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.sigla && e.sigla.toLowerCase().includes(searchTerm.toLowerCase())) ||
      e.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.codigo_inep && e.codigo_inep.includes(searchTerm));
    const matchRede = redeFiltro === 'Todas' || e.rede === redeFiltro;
    return matchBusca && matchRede;
  });

  return (
    <div className="space-y-6">
      
      {/* TOAST FLUTUANTE */}
      {toastMsg && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold border transition-all animate-fadeIn ${
          toastMsg.tipo === 'sucesso' 
            ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100 shadow-emerald-950/50' 
            : toastMsg.tipo === 'erro'
            ? 'bg-rose-950/95 border-rose-500 text-rose-100 shadow-rose-950/50'
            : 'bg-indigo-950/95 border-indigo-500 text-indigo-100 shadow-indigo-950/50'
        }`}>
          {toastMsg.tipo === 'sucesso' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {toastMsg.tipo === 'erro' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
          {toastMsg.tipo === 'info' && <Sparkles className="w-4 h-4 text-indigo-400" />}
          <span>{toastMsg.texto}</span>
        </div>
      )}

      {/* BANNER INSTITUCIONAL: ESCOLA ATIVA ATUALMENTE */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b1224] via-[#09101f] to-[#0d1629] border-2 border-indigo-500/30 p-6 sm:p-7 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                ESCOLA ATIVA NA PLATAFORMA
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                escolaAtiva.rede === 'Municipal' 
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                  : escolaAtiva.rede === 'Federal'
                  ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
                  : escolaAtiva.rede === 'Privada'
                  ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                  : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
              }`}>
                Rede {escolaAtiva.rede}
              </span>
              {escolaAtiva.codigo_inep && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono">
                  INEP: {escolaAtiva.codigo_inep}
                </span>
              )}
            </div>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                  {escolaAtiva.nome}
                </h2>
                <p className="text-xs text-indigo-200/80 font-medium">
                  {escolaAtiva.orgao_regional} • {escolaAtiva.cidade} – {escolaAtiva.estado}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              {escolaAtiva.descricao || 'Unidade escolar com canal permanente de acolhimento e mediação.'}
            </p>

            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <strong>Conselho Tutelar:</strong> {escolaAtiva.conselho_tutelar_local}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <strong>Direção:</strong> {escolaAtiva.diretor || 'Direção'}
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <strong>Comissão:</strong> {escolaAtiva.comissao_mediacao_nome || 'Mediação Escolar'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={abrirModalCriacao}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Cadastrar Nova Escola</span>
            </button>

            <button
              type="button"
              onClick={() => abrirModalEdicao(escolaAtiva)}
              className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/15 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-300" />
              <span>Editar Perfil Atual</span>
            </button>
          </div>
        </div>
      </div>

      {/* BARRA DE PESQUISA, FILTROS E AÇÕES RÁPIDAS */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#0b1020]/95 border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Campo de Busca */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome da escola, cidade, sigla ou INEP..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/40"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filtro por Rede */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {(['Todas', 'Estadual', 'Municipal', 'Federal', 'Privada'] as const).map((rede) => (
              <button
                key={rede}
                type="button"
                onClick={() => setRedeFiltro(rede)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  redeFiltro === rede
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {rede}
              </button>
            ))}
          </div>
        </div>

        {/* Linha com modelos prontos para importação rápida */}
        <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Importar Modelo Rápido:
            </span>
            {MODELOS_ESCOLAS_EXEMPLO.map((mod, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleImportarModelo(idx)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-[11px] font-semibold cursor-pointer transition-colors"
                title={`Importar configuração pré-definida de ${mod.nome}`}
              >
                + {mod.sigla || mod.nome.substring(0, 12)} ({mod.rede})
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">
              Total: <strong>{escolas.length}</strong> {escolas.length === 1 ? 'escola cadastrada' : 'escolas cadastradas'}
            </span>
          </div>
        </div>
      </div>

      {/* GRADE DE CARDS DAS ESCOLAS CADASTRADAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {escolasFiltradas.map((escola) => {
          const isAtiva = escola.id === escolaAtiva.id;

          return (
            <div
              key={escola.id}
              className={`rounded-3xl p-5 border transition-all space-y-4 relative overflow-hidden ${
                isAtiva
                  ? 'bg-gradient-to-br from-[#0e172e] via-[#09101f] to-[#0c1426] border-emerald-500/50 shadow-xl shadow-emerald-950/20 ring-1 ring-emerald-500/30'
                  : 'bg-[#090e1c]/80 hover:bg-[#0c1324] border-white/10 hover:border-white/20'
              }`}
            >
              {/* Badge Ativa no topo */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {isAtiva ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                        <Check className="w-3 h-3 text-emerald-400" />
                        ATIVA NO SISTEMA
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold">
                        Cadastrada
                      </span>
                    )}

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      escola.rede === 'Municipal'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : escola.rede === 'Federal'
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                        : escola.rede === 'Privada'
                        ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                        : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {escola.rede}
                    </span>

                    {escola.sigla && (
                      <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-300 font-mono text-[10px] border border-white/10">
                        {escola.sigla}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-black text-base sm:text-lg text-white leading-tight">
                    {escola.nome}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {escola.cidade} – {escola.estado} • {escola.orgao_regional}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
                  <School className="w-5 h-5 text-indigo-400" />
                </div>
              </div>

              {/* Detalhes da Escola */}
              <div className="space-y-2 text-xs bg-black/40 p-3.5 rounded-2xl border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Conselho Tutelar</span>
                    <p className="text-slate-200 font-medium text-[11px] truncate" title={escola.conselho_tutelar_local}>
                      🛡️ {escola.conselho_tutelar_local}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Equipe de Mediação</span>
                    <p className="text-slate-200 font-medium text-[11px] truncate" title={escola.comissao_mediacao_nome}>
                      👥 {escola.comissao_mediacao_nome || 'Comissão de Mediação'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 pt-1 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Direção / Coordenação</span>
                    <p className="text-slate-200 text-[11px] truncate">
                      🎓 {escola.diretor || 'Direção'} / {escola.coordenador_pedagogico || 'Coordenação'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">Código INEP</span>
                    <p className="text-slate-200 font-mono text-[11px]">
                      📋 {escola.codigo_inep || 'Não informado'}
                    </p>
                  </div>
                </div>

                {escola.endereco && (
                  <div className="pt-1 border-t border-white/5 text-[11px] text-slate-400 flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{escola.endereco}</span>
                  </div>
                )}
              </div>

              {/* Turmas cadastradas em chips */}
              {escola.turmas_cadastradas && escola.turmas_cadastradas.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Turmas Atendidas ({escola.turmas_cadastradas.length}):
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-1">
                    {escola.turmas_cadastradas.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Botões de Ação do Card */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => abrirModalEdicao(escola)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Editar</span>
                  </button>

                  {escolas.length > 1 && (
                    confirmarExclusaoId === escola.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleExcluir(escola.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-black cursor-pointer transition-colors"
                        >
                          Confirmar
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmarExclusaoId(null)}
                          className="px-2 py-1.5 rounded-xl bg-white/10 text-slate-400 hover:text-white text-[11px] cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmarExclusaoId(escola.id)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 text-xs cursor-pointer transition-colors"
                        title="Excluir perfil desta escola"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )
                  )}
                </div>

                {isAtiva ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Em Uso
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAtivarEscola(escola.id)}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 cursor-pointer transition-all"
                  >
                    <span>Ativar Esta Escola</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {escolasFiltradas.length === 0 && (
        <div className="p-8 text-center rounded-3xl bg-black/40 border border-white/10 space-y-3">
          <School className="w-10 h-10 text-slate-500 mx-auto" />
          <h4 className="font-bold text-white text-base">Nenhuma escola encontrada</h4>
          <p className="text-xs text-slate-400">
            Nenhum perfil corresponde aos termos da pesquisa ou filtro selecionado.
          </p>
          <button
            type="button"
            onClick={() => { setSearchTerm(''); setRedeFiltro('Todas'); }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* MODAL DE CRIAÇÃO / EDIÇÃO DE PERFIL DE ESCOLA */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b1020] border-2 border-indigo-500/40 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            
            {/* Cabeçalho do Modal */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-white">
                    {escolaEmEdicao ? 'Editar Perfil Escolar' : 'Cadastrar Nova Escola'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Personalize os dados institucionais para ofícios, mediações e relatórios
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSalvar} className="space-y-4 text-left">
              
              {/* Linha 1: Nome e Sigla */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Nome Oficial da Instituição <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formNome}
                    onChange={(e) => setFormNome(e.target.value)}
                    placeholder="Ex: E.E.F. Maria do Carmo Bezerra"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Sigla Institucional
                  </label>
                  <input
                    type="text"
                    value={formSigla}
                    onChange={(e) => setFormSigla(e.target.value)}
                    placeholder="Ex: EEF-MCB"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 uppercase"
                  />
                </div>
              </div>

              {/* Linha 2: Rede de Ensino, Código INEP, Cidade e UF */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Rede de Ensino
                  </label>
                  <select
                    value={formRede}
                    onChange={(e) => setFormRede(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#141a2e] border border-white/15 text-white text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Estadual">Estadual</option>
                    <option value="Municipal">Municipal</option>
                    <option value="Federal">Federal</option>
                    <option value="Privada">Privada</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Código INEP
                  </label>
                  <input
                    type="text"
                    value={formInep}
                    onChange={(e) => setFormInep(e.target.value)}
                    placeholder="Ex: 23078491"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Município <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formCidade}
                    onChange={(e) => setFormCidade(e.target.value)}
                    placeholder="Ex: Madalena"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Estado (UF) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={formEstado}
                    onChange={(e) => setFormEstado(e.target.value.toUpperCase())}
                    placeholder="CE"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-bold placeholder-slate-500 focus:outline-none focus:border-indigo-500 uppercase text-center"
                  />
                </div>
              </div>

              {/* Linha 3: Órgão Regional e Conselho Tutelar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Órgão Superior / Secretaria / Regional
                  </label>
                  <input
                    type="text"
                    value={formOrgaoRegional}
                    onChange={(e) => setFormOrgaoRegional(e.target.value)}
                    placeholder="Ex: SEDUC • CREDE 12 ou SME Madalena"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Conselho Tutelar de Referência
                  </label>
                  <input
                    type="text"
                    value={formConselhoTutelar}
                    onChange={(e) => setFormConselhoTutelar(e.target.value)}
                    placeholder="Ex: Conselho Tutelar de Madalena – CE"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Linha 4: Equipe Gestora e Comissão */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Diretor(a) Escolar
                  </label>
                  <input
                    type="text"
                    value={formDiretor}
                    onChange={(e) => setFormDiretor(e.target.value)}
                    placeholder="Nome do(a) gestor(a)"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Coordenador(a) Pedagógico(a)
                  </label>
                  <input
                    type="text"
                    value={formCoordenador}
                    onChange={(e) => setFormCoordenador(e.target.value)}
                    placeholder="Nome do(a) coordenador(a)"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Nome da Comissão de Mediação
                  </label>
                  <input
                    type="text"
                    value={formComissaoMediacao}
                    onChange={(e) => setFormComissaoMediacao(e.target.value)}
                    placeholder="Ex: Comissão de Mediação e Paz"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Linha 5: Contatos e Endereço */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    Telefone Institucional
                  </label>
                  <input
                    type="text"
                    value={formTelefone}
                    onChange={(e) => setFormTelefone(e.target.value)}
                    placeholder="(88) 3442-0000"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    E-mail Institucional
                  </label>
                  <input
                    type="email"
                    value={formEmailInstitucional}
                    onChange={(e) => setFormEmailInstitucional(e.target.value)}
                    placeholder="escola@dominio.gov.br"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">
                    E-mail do Conselho Tutelar
                  </label>
                  <input
                    type="email"
                    value={formEmailConselho}
                    onChange={(e) => setFormEmailConselho(e.target.value)}
                    placeholder="conselhotutelar@cidade.ce.gov.br"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Linha 6: Endereço Completo */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  Endereço Completo da Escola
                </label>
                <input
                  type="text"
                  value={formEndereco}
                  onChange={(e) => setFormEndereco(e.target.value)}
                  placeholder="Rua, Número, Bairro, CEP"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Gerenciamento de Turmas */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-xs font-bold text-slate-300 block">
                  Turmas Cadastradas (para formulários e triagem)
                </label>
                
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={novaTurmaInput}
                    onChange={(e) => setNovaTurmaInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAdicionarTurma();
                      }
                    }}
                    placeholder="Ex: 1º Ano A, 9º Ano B, Turma 101..."
                    className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAdicionarTurma}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                  >
                    + Adicionar Turma
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formTurmas.map((turma, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-200 text-xs font-medium"
                    >
                      {turma}
                      <button
                        type="button"
                        onClick={() => handleRemoverTurma(turma)}
                        className="hover:text-rose-400 p-0.5 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Descrição Institucional */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-bold text-slate-300">
                  Breve Apresentação ou Diretriz da Escola
                </label>
                <textarea
                  rows={2}
                  value={formDescricao}
                  onChange={(e) => setFormDescricao(e.target.value)}
                  placeholder="Ex: Unidade escolar de tempo integral com foco em mediação restaurativa e cidadania."
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Botões do Rodapé do Modal */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-xs shadow-lg shadow-indigo-600/30 cursor-pointer transition-all"
                >
                  {escolaEmEdicao ? 'Salvar Alterações' : 'Concluir Cadastro'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
