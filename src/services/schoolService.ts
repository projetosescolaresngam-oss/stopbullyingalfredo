/**
 * schoolService.ts
 * Gestão de Perfis de Escolas para utilização multi-institucional
 * da plataforma StopBullying.
 * 
 * Permite que diferentes unidades de ensino (estaduais, municipais, privadas e federais)
 * criem seus perfis próprios, configurem equipe gestora, conselho tutelar de referência,
 * turmas e gerem relatórios e ofícios oficiais com sua própria identidade institucional.
 */

import { PerfilEscola, CombinacaoTurma } from '../types';
import { getSupabase, isSupabaseConfigured } from './supabaseClient';
import { getGestaoSessionToken, ensureGestaoServerSession } from './adminAuthService';

const STORAGE_KEY_ESCOLAS = 'stopbullying_perfis_escolas_v1';
const STORAGE_KEY_ATIVA_ID = 'stopbullying_escola_ativa_id_v1';

export const gerarEstruturaPadrao = (tipo: 'medio' | 'fundamental' | 'completo' = 'medio'): CombinacaoTurma[] => {
  const anos = tipo === 'fundamental' 
    ? ['6º Ano', '7º Ano', '8º Ano', '9º Ano']
    : tipo === 'completo'
    ? ['6º Ano', '7º Ano', '8º Ano', '9º Ano', '1º Ano', '2º Ano', '3º Ano']
    : ['1º Ano', '2º Ano', '3º Ano'];

  const turmas = ['A', 'B', 'C', 'D'];
  const res: CombinacaoTurma[] = [];

  anos.forEach((ano) => {
    turmas.forEach((turma) => {
      res.push({
        id: `comb-${ano.replace(/\s+/g, '')}-${turma}-${Math.random().toString(36).substring(2, 6)}`,
        ano_serie: ano,
        turma,
        turno: 'Integral'
      });
    });
  });

  return res;
};

export const ESCOLA_PADRAO_ALFREDO_MACHADO: PerfilEscola = {
  id: 'escola-eemti-alfredo-machado',
  nome: 'E.E.M.T.I. Alfredo Machado',
  sigla: 'EEMTI-AM',
  codigo_inep: '23078491',
  cidade: 'Madalena',
  estado: 'CE',
  rede: 'Estadual',
  orgao_regional: 'SEDUC • CREDE 12 • MADALENA – CE',
  conselho_tutelar_local: 'Conselho Tutelar de Madalena – CE',
  endereco: 'Rua Antônio Domingos Pereira, s/n - Centro, Madalena - CE',
  telefone: '(88) 3442-1234',
  email_institucional: 'eemti.alfredomachado@escola.ce.gov.br',
  email_conselho_tutelar: 'conselhotutelar.madalena@ceara.gov.br',
  diretor: 'Profª. Maria Aparecida Ribeiro',
  coordenador_pedagogico: 'Prof. Francisco Antônio de Sousa',
  comissao_mediacao_nome: 'Comissão de Mediação Escolar & Cultura de Paz',
  ativa: true,
  criada_em: '2026-01-01T00:00:00.000Z',
  turmas_cadastradas: [
    '1º Ano A', '1º Ano B', '1º Ano C', '1º Ano D',
    '2º Ano A', '2º Ano B', '2º Ano C', '2º Ano D',
    '3º Ano A', '3º Ano B', '3º Ano C', '3º Ano D'
  ],
  estrutura_escolar: gerarEstruturaPadrao('medio'),
  anos_series_atendidos: ['1º Ano', '2º Ano', '3º Ano'],
  turnos_atendidos: ['Integral', 'Manhã', 'Tarde'],
  logo_tipo: 'estadual',
  descricao: 'Escola de Ensino Médio em Tempo Integral referência em projetos de mediação e cultura de paz.'
};

export const MODELOS_ESCOLAS_EXEMPLO: Array<Omit<PerfilEscola, 'id' | 'ativa' | 'criada_em'>> = [];

export const FICTITIOUS_SCHOOL_IDS = new Set<string>([
  'escola-eef-maria-do-carmo',
  'escola-santos-dumont-quixada',
  'escola-ifce-caninde',
  'escola-colegio-agora-fortaleza',
  'escola-colegio-contemporaneo'
]);

export const ESCOLAS_SEMENTE_SISTEMA: PerfilEscola[] = [
  ESCOLA_PADRAO_ALFREDO_MACHADO
];

export const getEscolas = (): PerfilEscola[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ESCOLAS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify([ESCOLA_PADRAO_ALFREDO_MACHADO]));
      localStorage.setItem(STORAGE_KEY_ATIVA_ID, ESCOLA_PADRAO_ALFREDO_MACHADO.id);
      return [ESCOLA_PADRAO_ALFREDO_MACHADO];
    }
    const list: PerfilEscola[] = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) {
      localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify([ESCOLA_PADRAO_ALFREDO_MACHADO]));
      localStorage.setItem(STORAGE_KEY_ATIVA_ID, ESCOLA_PADRAO_ALFREDO_MACHADO.id);
      return [ESCOLA_PADRAO_ALFREDO_MACHADO];
    }

    // Remove estritamente todas as escolas fictícias remanescentes no navegador
    const cleaned = list.filter(e => e && e.id && !FICTITIOUS_SCHOOL_IDS.has(e.id));
    
    // Garante que a escola polo EEMTI Alfredo Machado esteja sempre presente
    if (!cleaned.some(e => e.id === ESCOLA_PADRAO_ALFREDO_MACHADO.id)) {
      cleaned.unshift(ESCOLA_PADRAO_ALFREDO_MACHADO);
    }

    if (cleaned.length !== list.length) {
      localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(cleaned));
      const currentAtiva = localStorage.getItem(STORAGE_KEY_ATIVA_ID);
      if (!currentAtiva || FICTITIOUS_SCHOOL_IDS.has(currentAtiva)) {
        localStorage.setItem(STORAGE_KEY_ATIVA_ID, ESCOLA_PADRAO_ALFREDO_MACHADO.id);
      }
    }
    return cleaned;
  } catch (err) {
    console.error('Erro ao carregar lista de escolas:', err);
    return [ESCOLA_PADRAO_ALFREDO_MACHADO];
  }
};

export const getEscolaAtiva = (): PerfilEscola => {
  const escolas = getEscolas();
  let ativaId = localStorage.getItem(STORAGE_KEY_ATIVA_ID);
  
  if (!ativaId) {
    const foundAtiva = escolas.find(e => e.ativa);
    ativaId = foundAtiva ? foundAtiva.id : escolas[0].id;
    localStorage.setItem(STORAGE_KEY_ATIVA_ID, ativaId);
  }

  const escola = escolas.find(e => e.id === ativaId);
  if (escola) {
    return escola;
  }

  // Fallback para primeira escola ou padrão
  return escolas[0] || ESCOLA_PADRAO_ALFREDO_MACHADO;
};

const SYSTEM_SCHOOLS_SEED = '__system_perfis_escolas_v1__';
const STORAGE_KEY_DELETED_ESCOLAS = 'stopbullying_deleted_escolas_v1';
const STORAGE_KEY_ESCOLAS_DIRTY = 'stopbullying_escolas_dirty_v1';

function getDeletedSchoolIds(): Set<string> {
  const set = new Set<string>(FICTITIOUS_SCHOOL_IDS);
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DELETED_ESCOLAS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        parsed.forEach((id: string) => {
          if (id && id !== ESCOLA_PADRAO_ALFREDO_MACHADO.id) set.add(id);
        });
      }
    }
  } catch {}
  return set;
}

function addDeletedSchoolId(id: string): void {
  if (!id || id === ESCOLA_PADRAO_ALFREDO_MACHADO.id) return;
  try {
    const current = getDeletedSchoolIds();
    current.add(id);
    localStorage.setItem(STORAGE_KEY_DELETED_ESCOLAS, JSON.stringify(Array.from(current)));
  } catch {}
}

function saveDeletedSchoolIds(ids: Iterable<string>): void {
  try {
    const clean = Array.from(new Set(ids)).filter(id => id && id !== ESCOLA_PADRAO_ALFREDO_MACHADO.id);
    localStorage.setItem(STORAGE_KEY_DELETED_ESCOLAS, JSON.stringify(clean));
  } catch {}
}

function notifyAllDevicesSchoolChange(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('supabase_broadcast_change', {
      detail: { kind: 'schools', timestamp: Date.now() }
    }));
  }
}

export async function pushEscolasSnapshotToSupabase(
  escolasList?: PerfilEscola[],
  ativaIdOverride?: string,
  options?: { deletedSchoolId?: string; isFullReset?: boolean }
): Promise<void> {
  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) return;

  try {
    if (options?.deletedSchoolId) {
      addDeletedSchoolId(options.deletedSchoolId);
    }

    const localDeleted = getDeletedSchoolIds();
    const localList = (escolasList || getEscolas()).filter(
      (e) => e && e.id && !localDeleted.has(e.id)
    );

    // Buscar estado atual na nuvem para mesclar sem perder escolas criadas em outro dispositivo
    const { data: existingRow } = await supabase
      .from('estudantes_gamificacao')
      .select('stats')
      .eq('student_seed', SYSTEM_SCHOOLS_SEED)
      .maybeSingle();

    const cloudStats = (existingRow?.stats || {}) as {
      escolas?: PerfilEscola[];
      ativaId?: string;
      deletedIds?: string[];
    };

    const mergedDeletedSet = new Set<string>([
      ...Array.from(localDeleted),
      ...(Array.isArray(cloudStats.deletedIds) ? cloudStats.deletedIds : [])
    ]);
    if (options?.deletedSchoolId) {
      mergedDeletedSet.add(options.deletedSchoolId);
    }
    // Se uma escola acabou de ser criada/editada localmente, garante que não esteja na lista de excluídas
    localList.forEach(e => {
      if (e.id !== options?.deletedSchoolId && !FICTITIOUS_SCHOOL_IDS.has(e.id)) {
        mergedDeletedSet.delete(e.id);
      }
    });

    const mergedMap = new Map<string, PerfilEscola>();

    if (!options?.isFullReset && Array.isArray(cloudStats.escolas)) {
      cloudStats.escolas.forEach(rem => {
        if (rem && rem.id && !mergedDeletedSet.has(rem.id) && !FICTITIOUS_SCHOOL_IDS.has(rem.id)) {
          mergedMap.set(rem.id, rem);
        }
      });
    }

    // Alterações locais prevalecem sobre o snapshot anterior
    localList.forEach(loc => {
      if (loc && loc.id && !mergedDeletedSet.has(loc.id) && !FICTITIOUS_SCHOOL_IDS.has(loc.id)) {
        mergedMap.set(loc.id, loc);
      }
    });

    if (!mergedMap.has(ESCOLA_PADRAO_ALFREDO_MACHADO.id)) {
      mergedMap.set(ESCOLA_PADRAO_ALFREDO_MACHADO.id, ESCOLA_PADRAO_ALFREDO_MACHADO);
    }

    let finalAtivaId =
      ativaIdOverride ||
      localStorage.getItem(STORAGE_KEY_ATIVA_ID) ||
      cloudStats.ativaId ||
      localList.find((e) => e.ativa)?.id ||
      ESCOLA_PADRAO_ALFREDO_MACHADO.id;

    if (!mergedMap.has(finalAtivaId)) {
      finalAtivaId = ESCOLA_PADRAO_ALFREDO_MACHADO.id;
    }

    const finalList = Array.from(mergedMap.values()).map(esc => ({
      ...esc,
      ativa: esc.id === finalAtivaId
    }));

    saveDeletedSchoolIds(mergedDeletedSet);
    localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(finalList));
    localStorage.setItem(STORAGE_KEY_ATIVA_ID, finalAtivaId);

    const { error } = await supabase.from('estudantes_gamificacao').upsert(
      {
        student_seed: SYSTEM_SCHOOLS_SEED,
        student_code: 'SYSTEM_PERFIS_ESCOLAS',
        current_level: 1,
        current_xp: finalList.length,
        next_level_xp: 100,
        level_title: 'Gestão Multi-Escolas',
        stats: {
          escolas: finalList,
          ativaId: finalAtivaId,
          deletedIds: Array.from(mergedDeletedSet),
          updatedAt: new Date().toISOString(),
        },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'student_seed' }
    );

    if (!error) {
      localStorage.removeItem(STORAGE_KEY_ESCOLAS_DIRTY);
      notifyAllDevicesSchoolChange();
    }
  } catch (err) {
    console.warn('[Supabase Schools Snapshot Sync Warn]', err);
  }
}

export const setEscolaAtiva = (escolaId: string): PerfilEscola => {
  const escolas = getEscolas();
  const target = escolas.find(e => e.id === escolaId);
  if (!target) {
    throw new Error(`Escola com ID "${escolaId}" não encontrada.`);
  }

  const updatedList = escolas.map(e => ({
    ...e,
    ativa: e.id === escolaId
  }));

  try {
    localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(updatedList));
    localStorage.setItem(STORAGE_KEY_ATIVA_ID, escolaId);
    localStorage.setItem(STORAGE_KEY_ESCOLAS_DIRTY, 'true');
  } catch (err) {
    console.error('Erro ao salvar escola ativa:', err);
  }

  // Sincroniza imediatamente a escola ativa com o banco de dados Supabase e notifica todos os dispositivos
  pushEscolasSnapshotToSupabase(updatedList, escolaId).catch(() => {});

  const supabase = getSupabase();
  if (supabase && isSupabaseConfigured()) {
    (async () => {
      try {
        await supabase.from('perfis_escolas').update({ ativa: false }).neq('id', escolaId);
        await supabase.from('perfis_escolas').update({ ativa: true }).eq('id', escolaId);
      } catch {}
    })();
  }

  // Notifica o sistema inteiro sobre a alteração
  window.dispatchEvent(new CustomEvent('escola_ativa_updated', {
    detail: { escolaAtiva: { ...target, ativa: true } }
  }));
  window.dispatchEvent(new Event('storage'));

  return { ...target, ativa: true };
};

export const getEstruturaEscola = (escola?: PerfilEscola | null): CombinacaoTurma[] => {
  if (!escola) return gerarEstruturaPadrao('medio');
  if (escola.estrutura_escolar && escola.estrutura_escolar.length > 0) {
    return escola.estrutura_escolar;
  }
  if (escola.turmas_cadastradas && escola.turmas_cadastradas.length > 0) {
    return escola.turmas_cadastradas.map((t, idx) => {
      const parts = t.trim().split(' ');
      let anoSerie = '1º Ano';
      let turma = t;
      if (parts.length >= 3) {
        anoSerie = `${parts[0]} ${parts[1]}`;
        turma = parts.slice(2).join(' ');
      } else if (parts.length === 2) {
        anoSerie = parts[0];
        turma = parts[1];
      }
      return {
        id: `auto-${escola.id}-${idx}`,
        ano_serie: anoSerie,
        turma,
        turno: 'Integral'
      };
    });
  }
  return gerarEstruturaPadrao('medio');
};

export const getAnosSeriesDaEscola = (escola?: PerfilEscola | null): string[] => {
  const est = getEstruturaEscola(escola);
  const anos = Array.from(new Set(est.map(e => e.ano_serie.trim()))).filter(Boolean);
  return anos.length > 0 ? anos : ['1º Ano', '2º Ano', '3º Ano'];
};

export const getTurmasDoAnoDaEscola = (escola?: PerfilEscola | null, anoSerie?: string): string[] => {
  const est = getEstruturaEscola(escola);
  const turmas = Array.from(
    new Set(
      est
        .filter(e => !anoSerie || e.ano_serie.toLowerCase().trim() === anoSerie.toLowerCase().trim())
        .map(e => e.turma.trim())
    )
  ).filter(Boolean);
  return turmas.length > 0 ? turmas : ['A', 'B', 'C', 'D'];
};

export const getTurnosDaTurmaDaEscola = (
  escola?: PerfilEscola | null, 
  anoSerie?: string, 
  turma?: string
): Array<'Manhã' | 'Tarde' | 'Noite' | 'Integral'> => {
  const est = getEstruturaEscola(escola);
  const turnos = Array.from(
    new Set(
      est
        .filter(e => 
          (!anoSerie || e.ano_serie.toLowerCase().trim() === anoSerie.toLowerCase().trim()) &&
          (!turma || e.turma.toLowerCase().trim() === turma.toLowerCase().trim())
        )
        .map(e => e.turno)
    )
  );
  return turnos.length > 0 ? turnos : ['Integral', 'Manhã', 'Tarde', 'Noite'];
};

export const salvarEscola = (
  dados: Partial<PerfilEscola> & { nome: string; cidade: string; estado: string }
): PerfilEscola => {
  const escolas = getEscolas();
  const isEditing = Boolean(dados.id && escolas.some(e => e.id === dados.id));
  
  let escolaAtualizada: PerfilEscola;

  // Garantir estrutura de turmas/combinações
  const estrutura = dados.estrutura_escolar && dados.estrutura_escolar.length > 0
    ? dados.estrutura_escolar
    : gerarEstruturaPadrao('medio');

  const turmasCalculadas = Array.from(
    new Set(estrutura.map(e => `${e.ano_serie} ${e.turma}`))
  );

  const anosCalculados = Array.from(
    new Set(estrutura.map(e => e.ano_serie))
  );

  const turnosCalculados = Array.from(
    new Set(estrutura.map(e => e.turno))
  );

  let novaLista: PerfilEscola[];

  if (isEditing && dados.id) {
    escolaAtualizada = {
      ...(escolas.find(e => e.id === dados.id)!),
      ...dados,
      id: dados.id,
      nome: dados.nome.trim(),
      cidade: dados.cidade.trim(),
      estado: (dados.estado || 'CE').trim().toUpperCase(),
      orgao_regional: (dados.orgao_regional || `SEDUC / REGIONAL • ${dados.cidade.toUpperCase()} – ${dados.estado.toUpperCase()}`).trim(),
      conselho_tutelar_local: (dados.conselho_tutelar_local || `Conselho Tutelar de ${dados.cidade} – ${dados.estado}`).trim(),
      estrutura_escolar: estrutura,
      turmas_cadastradas: turmasCalculadas,
      anos_series_atendidos: anosCalculados,
      turnos_atendidos: turnosCalculados
    };

    novaLista = escolas.map(e => e.id === dados.id ? escolaAtualizada : e);
    localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(novaLista));
  } else {
    const novoId = `escola-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    escolaAtualizada = {
      id: novoId,
      nome: dados.nome.trim(),
      sigla: dados.sigla?.trim() || dados.nome.substring(0, 8).toUpperCase(),
      codigo_inep: dados.codigo_inep?.trim() || '',
      cidade: dados.cidade.trim(),
      estado: (dados.estado || 'CE').trim().toUpperCase(),
      rede: dados.rede || 'Estadual',
      orgao_regional: (dados.orgao_regional || `SEDUC / REGIONAL • ${dados.cidade.toUpperCase()} – ${dados.estado.toUpperCase()}`).trim(),
      conselho_tutelar_local: (dados.conselho_tutelar_local || `Conselho Tutelar de ${dados.cidade} – ${dados.estado}`).trim(),
      endereco: dados.endereco?.trim() || '',
      telefone: dados.telefone?.trim() || '',
      email_institucional: dados.email_institucional?.trim() || '',
      email_conselho_tutelar: dados.email_conselho_tutelar?.trim() || '',
      diretor: dados.diretor?.trim() || 'Direção Escolar',
      coordenador_pedagogico: dados.coordenador_pedagogico?.trim() || 'Coordenação Pedagógica',
      comissao_mediacao_nome: dados.comissao_mediacao_nome?.trim() || 'Comissão de Mediação Escolar',
      ativa: false,
      criada_em: new Date().toISOString(),
      estrutura_escolar: estrutura,
      turmas_cadastradas: turmasCalculadas,
      anos_series_atendidos: anosCalculados,
      turnos_atendidos: turnosCalculados,
      logo_tipo: dados.logo_tipo || 'padrao',
      descricao: dados.descricao?.trim() || 'Unidade escolar cadastrada no Sistema StopBullying.'
    };

    novaLista = [...escolas, escolaAtualizada];
    localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(novaLista));
  }

  localStorage.setItem(STORAGE_KEY_ESCOLAS_DIRTY, 'true');

  window.dispatchEvent(new CustomEvent('escola_ativa_updated', {
    detail: { escolaAtiva: getEscolaAtiva() }
  }));
  window.dispatchEvent(new Event('storage'));

  // 1. Sincroniza snapshot completo em estudantes_gamificacao e transmite via Broadcast para todos os dispositivos
  pushEscolasSnapshotToSupabase(novaLista).catch(() => {});

  // 2. Sincroniza também na tabela dedicada perfis_escolas / RPC se existir
  const supabase = getSupabase();
  if (supabase && isSupabaseConfigured()) {
    const escolaPayload = {
      id: escolaAtualizada.id,
      nome: escolaAtualizada.nome,
      sigla: escolaAtualizada.sigla || null,
      codigo_inep: escolaAtualizada.codigo_inep || null,
      cidade: escolaAtualizada.cidade,
      estado: escolaAtualizada.estado,
      rede: escolaAtualizada.rede,
      orgao_regional: escolaAtualizada.orgao_regional,
      conselho_tutelar_local: escolaAtualizada.conselho_tutelar_local,
      endereco: escolaAtualizada.endereco || null,
      telefone: escolaAtualizada.telefone || null,
      email_institucional: escolaAtualizada.email_institucional || null,
      email_conselho_tutelar: escolaAtualizada.email_conselho_tutelar || null,
      diretor: escolaAtualizada.diretor || null,
      coordenador_pedagogico: escolaAtualizada.coordenador_pedagogico || null,
      comissao_mediacao_nome: escolaAtualizada.comissao_mediacao_nome || null,
      ativa: escolaAtualizada.ativa,
      turmas_cadastradas: escolaAtualizada.turmas_cadastradas || [],
      estrutura_escolar: escolaAtualizada.estrutura_escolar || [],
      logo_tipo: escolaAtualizada.logo_tipo || 'padrao',
      descricao: escolaAtualizada.descricao || null,
      criada_em: escolaAtualizada.criada_em,
      updated_at: new Date().toISOString()
    };

    (async () => {
      try {
        let sessionToken = getGestaoSessionToken();
        if (!sessionToken) {
          sessionToken = await ensureGestaoServerSession();
        }
        const { error: rpcError } = await supabase.rpc('gestao_salvar_escola', {
          p_session_token: sessionToken,
          p_escola: escolaPayload
        });

        if (rpcError) {
          await supabase.from('perfis_escolas').upsert(escolaPayload);
        }
      } catch {}
    })();
  }

  return escolaAtualizada;
};

export const excluirEscola = (escolaId: string): boolean => {
  const escolas = getEscolas();
  if (escolas.length <= 1) {
    throw new Error('Não é possível excluir a única escola cadastrada no sistema.');
  }

  const escolaParaRemover = escolas.find(e => e.id === escolaId);
  if (!escolaParaRemover) return false;

  addDeletedSchoolId(escolaId);
  const novaLista = escolas.filter(e => e.id !== escolaId);
  localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(novaLista));
  localStorage.setItem(STORAGE_KEY_ESCOLAS_DIRTY, 'true');

  // Se a escola removida era a ativa, ativa a primeira remanescente
  const nextAtivaId = escolaParaRemover.ativa
    ? novaLista[0].id
    : (localStorage.getItem(STORAGE_KEY_ATIVA_ID) || novaLista[0].id);

  const listaComAtiva = novaLista.map(e => ({
    ...e,
    ativa: e.id === nextAtivaId
  }));
  localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(listaComAtiva));
  localStorage.setItem(STORAGE_KEY_ATIVA_ID, nextAtivaId);

  pushEscolasSnapshotToSupabase(listaComAtiva, nextAtivaId, { deletedSchoolId: escolaId }).catch(() => {});

  window.dispatchEvent(new CustomEvent('escola_ativa_updated', {
    detail: { escolaAtiva: getEscolaAtiva() }
  }));
  window.dispatchEvent(new Event('storage'));

  // Sincronização com Supabase (exclusão remota via RPC autenticada / tabela)
  const supabase = getSupabase();
  if (supabase && isSupabaseConfigured()) {
    (async () => {
      try {
        let sessionToken = getGestaoSessionToken();
        if (!sessionToken) {
          sessionToken = await ensureGestaoServerSession();
        }
        const { error: rpcError } = await supabase.rpc('gestao_excluir_escola', {
          p_session_token: sessionToken,
          p_escola_id: escolaId
        });
        if (rpcError) {
          await supabase.from('perfis_escolas').delete().eq('id', escolaId);
        }
      } catch {}
    })();
  }

  return true;
};

export const syncEscolasFromSupabase = async (): Promise<PerfilEscola[]> => {
  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) return getEscolas();

  try {
    const isLocalDirty = localStorage.getItem(STORAGE_KEY_ESCOLAS_DIRTY) === 'true';
    const localList = getEscolas();
    const map = new Map<string, PerfilEscola>();

    // Se houver mudança local ainda não confirmada, preserva os itens locais como base
    if (isLocalDirty) {
      localList.forEach(e => {
        if (e && e.id && !FICTITIOUS_SCHOOL_IDS.has(e.id)) {
          map.set(e.id, e);
        }
      });
    }

    let remoteAtivaId: string | undefined;
    let cloudSnapshotExists = false;
    const deletedSet = getDeletedSchoolIds();

    // 1. Puxar snapshot universal da gestão (estudantes_gamificacao -> __system_perfis_escolas_v1__)
    try {
      const { data: snapRow, error: snapErr } = await supabase
        .from('estudantes_gamificacao')
        .select('stats')
        .eq('student_seed', SYSTEM_SCHOOLS_SEED)
        .maybeSingle();

      if (!snapErr && snapRow && snapRow.stats) {
        const statsObj = snapRow.stats as {
          escolas?: PerfilEscola[];
          ativaId?: string;
          deletedIds?: string[];
        };
        if (Array.isArray(statsObj.deletedIds)) {
          statsObj.deletedIds.forEach(id => {
            if (id && id !== ESCOLA_PADRAO_ALFREDO_MACHADO.id) deletedSet.add(id);
          });
          saveDeletedSchoolIds(deletedSet);
        }
        if (statsObj.ativaId && !deletedSet.has(statsObj.ativaId)) {
          remoteAtivaId = statsObj.ativaId;
        }
        if (Array.isArray(statsObj.escolas) && statsObj.escolas.length > 0) {
          cloudSnapshotExists = true;
          statsObj.escolas.forEach((rem) => {
            if (!rem || !rem.id || deletedSet.has(rem.id)) return;
            map.set(rem.id, {
              ...rem,
              ativa: remoteAtivaId ? rem.id === remoteAtivaId : Boolean(rem.ativa),
            });
          });
        }
      }
    } catch {}

    // 2. Puxar também da tabela dedicada perfis_escolas (se existir no banco)
    try {
      const { data, error } = await supabase
        .from('perfis_escolas')
        .select('*')
        .order('criada_em', { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        cloudSnapshotExists = true;
        data.forEach((remote: any) => {
          if (!remote || !remote.id || deletedSet.has(remote.id)) return;
          if (remote.ativa) {
            remoteAtivaId = remote.id;
          }
          map.set(remote.id, {
            id: remote.id,
            nome: remote.nome,
            sigla: remote.sigla || undefined,
            codigo_inep: remote.codigo_inep || undefined,
            cidade: remote.cidade,
            estado: remote.estado,
            rede: remote.rede,
            orgao_regional: remote.orgao_regional,
            conselho_tutelar_local: remote.conselho_tutelar_local,
            endereco: remote.endereco || undefined,
            telefone: remote.telefone || undefined,
            email_institucional: remote.email_institucional || undefined,
            email_conselho_tutelar: remote.email_conselho_tutelar || undefined,
            diretor: remote.diretor || undefined,
            coordenador_pedagogico: remote.coordenador_pedagogico || undefined,
            comissao_mediacao_nome: remote.comissao_mediacao_nome || undefined,
            ativa: Boolean(remote.ativa),
            criada_em: remote.criada_em || remote.created_at || new Date().toISOString(),
            turmas_cadastradas: remote.turmas_cadastradas || [],
            estrutura_escolar: remote.estrutura_escolar || [],
            logo_tipo: remote.logo_tipo || 'padrao',
            descricao: remote.descricao || undefined
          });
        });
      }
    } catch {}

    // Se a nuvem ainda não tinha snapshot ou se este navegador é do gestor com escolas novas locais
    const hasGestaoToken = Boolean(getGestaoSessionToken());
    if (!cloudSnapshotExists || isLocalDirty || hasGestaoToken) {
      let localHasUnsyncedSchool = false;
      localList.forEach(loc => {
        if (loc && loc.id && !deletedSet.has(loc.id)) {
          if (!map.has(loc.id)) {
            map.set(loc.id, loc);
            localHasUnsyncedSchool = true;
          }
        }
      });

      if (!cloudSnapshotExists || isLocalDirty || localHasUnsyncedSchool) {
        const pushAtiva = remoteAtivaId || localStorage.getItem(STORAGE_KEY_ATIVA_ID) || ESCOLA_PADRAO_ALFREDO_MACHADO.id;
        pushEscolasSnapshotToSupabase(Array.from(map.values()), pushAtiva).catch(() => {});
      }
    }

    if (!map.has(ESCOLA_PADRAO_ALFREDO_MACHADO.id)) {
      map.set(ESCOLA_PADRAO_ALFREDO_MACHADO.id, ESCOLA_PADRAO_ALFREDO_MACHADO);
    }

    let finalAtivaId =
      remoteAtivaId ||
      localStorage.getItem(STORAGE_KEY_ATIVA_ID) ||
      ESCOLA_PADRAO_ALFREDO_MACHADO.id;

    if (!map.has(finalAtivaId)) {
      finalAtivaId = ESCOLA_PADRAO_ALFREDO_MACHADO.id;
    }

    const merged = Array.from(map.values()).map((esc) => ({
      ...esc,
      ativa: esc.id === finalAtivaId,
    }));

    if (merged.length > 0) {
      const prevRaw = localStorage.getItem(STORAGE_KEY_ESCOLAS);
      const prevAtiva = localStorage.getItem(STORAGE_KEY_ATIVA_ID);
      const nextRaw = JSON.stringify(merged);

      localStorage.setItem(STORAGE_KEY_ESCOLAS, nextRaw);
      localStorage.setItem(STORAGE_KEY_ATIVA_ID, finalAtivaId);

      if (prevRaw !== nextRaw || prevAtiva !== finalAtivaId) {
        window.dispatchEvent(new CustomEvent('escola_ativa_updated', {
          detail: { escolaAtiva: getEscolaAtiva() }
        }));
        window.dispatchEvent(new Event('storage'));
      }
      return merged;
    }
  } catch (err) {
    console.warn('[Supabase Sync Escolas Error]', err);
  }

  return getEscolas();
};

export const importarModeloExemplo = (index: number): PerfilEscola => {
  const modelo = MODELOS_ESCOLAS_EXEMPLO[index];
  if (!modelo) {
    throw new Error('Modelo de escola não encontrado.');
  }

  return salvarEscola({
    ...modelo,
    nome: `${modelo.nome} (Nova Unidade)`
  });
};

export const restaurarEscolasPadrao = (): PerfilEscola[] => {
  const listaInicial = [ESCOLA_PADRAO_ALFREDO_MACHADO];
  localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(listaInicial));
  localStorage.setItem(STORAGE_KEY_ATIVA_ID, ESCOLA_PADRAO_ALFREDO_MACHADO.id);
  localStorage.setItem(STORAGE_KEY_ESCOLAS_DIRTY, 'true');
  pushEscolasSnapshotToSupabase(listaInicial, ESCOLA_PADRAO_ALFREDO_MACHADO.id, { isFullReset: true }).catch(() => {});

  window.dispatchEvent(new CustomEvent('escola_ativa_updated', {
    detail: { escolaAtiva: ESCOLA_PADRAO_ALFREDO_MACHADO }
  }));
  window.dispatchEvent(new Event('storage'));

  return listaInicial;
};
