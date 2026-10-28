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
import { getGestaoSessionToken } from './adminAuthService';

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

export const MODELOS_ESCOLAS_EXEMPLO: Array<Omit<PerfilEscola, 'id' | 'ativa' | 'criada_em'>> = [
  {
    nome: 'E.E.F. Maria do Carmo Bezerra',
    sigla: 'EEF-MCB',
    codigo_inep: '23089124',
    cidade: 'Madalena',
    estado: 'CE',
    rede: 'Municipal',
    orgao_regional: 'SME • SECRETARIA MUNICIPAL DE EDUCAÇÃO DE MADALENA',
    conselho_tutelar_local: 'Conselho Tutelar de Madalena – CE',
    endereco: 'Av. Rodolfo Teófilo, 450 - Bairro São José, Madalena - CE',
    telefone: '(88) 3442-5678',
    email_institucional: 'eef.mariadocarmo@madalena.ce.gov.br',
    email_conselho_tutelar: 'conselhotutelar.madalena@ceara.gov.br',
    diretor: 'Prof. Raimundo Nonato Ferreira',
    coordenador_pedagogico: 'Profª. Ana Cláudia Silveira',
    comissao_mediacao_nome: 'Núcleo de Cidadania & Acolhimento Estudantil',
    turmas_cadastradas: ['6º Ano A', '6º Ano B', '7º Ano A', '8º Ano A', '9º Ano A', '9º Ano B'],
    logo_tipo: 'municipal',
    descricao: 'Escola de Ensino Fundamental da rede municipal com foco na transição dos anos finais.'
  },
  {
    nome: 'Colégio Estadual Santos Dumont',
    sigla: 'CESD',
    codigo_inep: '23012984',
    cidade: 'Quixadá',
    estado: 'CE',
    rede: 'Estadual',
    orgao_regional: 'SEDUC • CREDE 12 • QUIXADÁ – CE',
    conselho_tutelar_local: 'Conselho Tutelar de Quixadá – CE',
    endereco: 'Rua José Jucá, 890 - Centro, Quixadá - CE',
    telefone: '(88) 3412-4000',
    email_institucional: 'santosdumont@escola.ce.gov.br',
    email_conselho_tutelar: 'conselhotutelar.quixada@ceara.gov.br',
    diretor: 'Profª. Elisabete Carvalho Gomes',
    coordenador_pedagogico: 'Prof. Marcos Vinícius Lima',
    comissao_mediacao_nome: 'Comissão de Mediação Restaurativa Santos Dumont',
    turmas_cadastradas: ['1º Ano A', '1º Ano B', '2º Ano A', '2º Ano B', '3º Ano A', '3º Ano B'],
    logo_tipo: 'estadual',
    descricao: 'Unidade escolar com tradição em projetos de protagonismo juvenil e tecnologia educacional.'
  },
  {
    nome: 'IFCE – Instituto Federal do Ceará (Campus Canindé)',
    sigla: 'IFCE-CAN',
    codigo_inep: '23249010',
    cidade: 'Canindé',
    estado: 'CE',
    rede: 'Federal',
    orgao_regional: 'MEC • SETEC • REITORIA DO IFCE',
    conselho_tutelar_local: 'Conselho Tutelar de Canindé – CE',
    endereco: 'Rodovia BR-020, Km 303 - Jubaia, Canindé - CE',
    telefone: '(85) 3698-8900',
    email_institucional: 'gabinete.caninde@ifce.edu.br',
    email_conselho_tutelar: 'conselhotutelar.caninde@ceara.gov.br',
    diretor: 'Prof. Dr. Marcelo Tavares',
    coordenador_pedagogico: 'Profª. Ma. Cecília Albuquerque',
    comissao_mediacao_nome: 'Comissão Disciplinar e de Convivência Comunitária',
    turmas_cadastradas: ['1º Ano Integrado Info', '2º Ano Integrado Info', '3º Ano Integrado Info', '1º Redes', '2º Redes'],
    logo_tipo: 'padrao',
    descricao: 'Instituição Federal de Educação, Ciência e Tecnologia com cursos técnicos integrados.'
  },
  {
    nome: 'Colégio Ágora da Paz',
    sigla: 'CAPAZ',
    codigo_inep: '23984120',
    cidade: 'Fortaleza',
    estado: 'CE',
    rede: 'Privada',
    orgao_regional: 'SEDUC / SINEPE-CE • FORTALEZA – CE',
    conselho_tutelar_local: 'Conselho Tutelar Regional VI – Fortaleza – CE',
    endereco: 'Rua Desembargador Moreira, 2100 - Aldeota, Fortaleza - CE',
    telefone: '(85) 3261-9000',
    email_institucional: 'contato@colegioagora.com.br',
    email_conselho_tutelar: 'conselhotutelar.reg6@fortaleza.ce.gov.br',
    diretor: 'Dra. Renata Vasconcelos',
    coordenador_pedagogico: 'Prof. Guilherme Peixoto',
    comissao_mediacao_nome: 'Núcleo de Inteligência Socioemocional e Diálogo',
    turmas_cadastradas: ['Fundamental II - 6º ao 9º', 'Ensino Médio - 1ª à 3ª Série'],
    logo_tipo: 'personalizado',
    descricao: 'Instituição privada de ensino com metodologia ativa e programa permanente de convivência ética.'
  }
];

export const getEscolas = (): PerfilEscola[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ESCOLAS);
    if (!raw) {
      const initial = [ESCOLA_PADRAO_ALFREDO_MACHADO];
      localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(initial));
      localStorage.setItem(STORAGE_KEY_ATIVA_ID, ESCOLA_PADRAO_ALFREDO_MACHADO.id);
      return initial;
    }
    const list: PerfilEscola[] = JSON.parse(raw);
    if (!Array.isArray(list) || list.length === 0) {
      const initial = [ESCOLA_PADRAO_ALFREDO_MACHADO];
      localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(initial));
      localStorage.setItem(STORAGE_KEY_ATIVA_ID, ESCOLA_PADRAO_ALFREDO_MACHADO.id);
      return initial;
    }
    return list;
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
  } catch (err) {
    console.error('Erro ao salvar escola ativa:', err);
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

    const novaLista = escolas.map(e => e.id === dados.id ? escolaAtualizada : e);
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

    const novaLista = [...escolas, escolaAtualizada];
    localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(novaLista));
  }

  window.dispatchEvent(new CustomEvent('escola_ativa_updated', {
    detail: { escolaAtiva: getEscolaAtiva() }
  }));
  window.dispatchEvent(new Event('storage'));

  // Sincronização em nuvem com Supabase (PostgreSQL) com RPC segura autenticada
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
        const sessionToken = getGestaoSessionToken();
        // 1. Prioriza RPC de gestão com validação de sessão segura no PostgreSQL
        const { data: rpcData, error: rpcError } = await supabase.rpc('gestao_salvar_escola', {
          p_session_token: sessionToken,
          p_escola: escolaPayload
        });

        if (rpcError) {
          // 2. Fallback de compatibilidade se a RPC ainda não tiver sido criada no banco
          await supabase.from('perfis_escolas').upsert(escolaPayload);
        }
      } catch (err) {
        console.warn('[Supabase Sync Escola Warn]', err);
      }
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

  const novaLista = escolas.filter(e => e.id !== escolaId);
  localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(novaLista));

  // Sincronização com Supabase (exclusão remota via RPC autenticada)
  const supabase = getSupabase();
  if (supabase && isSupabaseConfigured()) {
    (async () => {
      try {
        const sessionToken = getGestaoSessionToken();
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

  // Se a escola removida era a ativa, ativa a primeira remanescente
  if (escolaParaRemover.ativa) {
    setEscolaAtiva(novaLista[0].id);
  } else {
    window.dispatchEvent(new CustomEvent('escola_ativa_updated', {
      detail: { escolaAtiva: getEscolaAtiva() }
    }));
  }

  return true;
};

export const syncEscolasFromSupabase = async (): Promise<PerfilEscola[]> => {
  const supabase = getSupabase();
  if (!supabase || !isSupabaseConfigured()) return getEscolas();

  try {
    const { data, error } = await supabase
      .from('perfis_escolas')
      .select('*')
      .order('criada_em', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      const localList = getEscolas();
      const map = new Map<string, PerfilEscola>();
      localList.forEach(e => map.set(e.id, e));

      data.forEach((remote: any) => {
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

      const merged = Array.from(map.values());
      localStorage.setItem(STORAGE_KEY_ESCOLAS, JSON.stringify(merged));
      
      window.dispatchEvent(new CustomEvent('escola_ativa_updated', {
        detail: { escolaAtiva: getEscolaAtiva() }
      }));
      window.dispatchEvent(new Event('storage'));
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

  window.dispatchEvent(new CustomEvent('escola_ativa_updated', {
    detail: { escolaAtiva: ESCOLA_PADRAO_ALFREDO_MACHADO }
  }));
  window.dispatchEvent(new Event('storage'));

  return listaInicial;
};
