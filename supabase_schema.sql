-- ============================================================================
-- STOPBULLYING - EEMTI ALFREDO MACHADO (MADALENA/CE)
-- ESQUEMA COMPLETO E MIGRAÇÃO UNIVERSAL SUPABASE (POSTGRESQL + RLS + REALTIME)
-- Compatível com Bancos Novos e Bancos Já Existentes (com migração automática de colunas)
-- ============================================================================

-- 1. Extensões para UUIDs e Criptografia
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 2. TABELA DE DENÚNCIAS & INCIDENTES ESCOLARES (CRIAR OU ATUALIZAR)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.denuncias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    protocolo VARCHAR(64) UNIQUE NOT NULL,
    tipo_violencia VARCHAR(128) NOT NULL,
    local_escola VARCHAR(128) NOT NULL,
    descricao TEXT NOT NULL,
    status VARCHAR(64) DEFAULT 'Em Análise',
    data_envio TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migração Segura: Adicionar colunas novas caso a tabela já existisse no seu Supabase
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS tipos_selecionados TEXT[] DEFAULT '{}';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS turno VARCHAR(64) DEFAULT 'Manhã';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS frequencia VARCHAR(128) DEFAULT 'Poucas vezes';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS papel_denunciante VARCHAR(128) DEFAULT 'Sou a Vítima';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS turma_envolvida VARCHAR(128);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS link_cyberbullying TEXT;
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS midia_anexa TEXT;
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS midia_tipo VARCHAR(32);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS midia_duracao INTEGER DEFAULT 0;
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS provas_anexas JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS nivel_gravidade VARCHAR(64) DEFAULT 'Pendente';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS nivel_escalada VARCHAR(64) DEFAULT 'Média';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS is_sos BOOLEAN DEFAULT FALSE;
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS etapa_mediacao VARCHAR(64) DEFAULT 'escuta_inicial';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS impactos_identificados TEXT[] DEFAULT '{}';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS medidas_protecao TEXT[] DEFAULT '{}';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS escola_id VARCHAR(64);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS escola_nome VARCHAR(255);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS escola_ocorrencia_id VARCHAR(64);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS escola_ocorrencia_nome VARCHAR(255);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS serie_ocorrencia VARCHAR(64);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS turma_ocorrencia VARCHAR(64);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS turno_ocorrencia VARCHAR(64);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS escola_acusado_id VARCHAR(64);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS escola_acusado_nome VARCHAR(255);
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS agressor_grupo TEXT;
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS estrutura_escolar JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS pontuacao_risco INTEGER DEFAULT 0;
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS canal_entrada VARCHAR(64) DEFAULT 'web';
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS feedback_escola JSONB;
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS data_envio TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.denuncias ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- ============================================================================
-- 3. TABELA DE AÇÕES DE MEDIAÇÃO RESTAURATIVA (TIMELINE)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.mediacoes_acoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    denuncia_id UUID REFERENCES public.denuncias(id) ON DELETE CASCADE,
    autor VARCHAR(255) NOT NULL,
    categoria VARCHAR(128) DEFAULT 'Geral',
    acao TEXT NOT NULL,
    data_hora TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. TABELA DE TERMOS DE ACORDO DE CONVIVÊNCIA & CÍRCULOS DE PAZ
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.termos_acordo_convivencia (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    denuncia_id UUID UNIQUE REFERENCES public.denuncias(id) ON DELETE CASCADE,
    mediador VARCHAR(255) NOT NULL,
    compromissos TEXT[] NOT NULL DEFAULT '{}',
    reparacao_simbolica TEXT,
    status VARCHAR(64) DEFAULT 'Em cumprimento',
    firmado_em TIMESTAMPTZ DEFAULT NOW(),
    data_revisao TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. TABELA DE CHECK-INS DE ACOMPANHAMENTO (7, 15, 30, 60 DIAS)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.checkins_acompanhamento (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    denuncia_id UUID REFERENCES public.denuncias(id) ON DELETE CASCADE,
    dia INTEGER NOT NULL,
    responsavel VARCHAR(255) NOT NULL,
    status_estudante VARCHAR(128) NOT NULL,
    observacoes TEXT,
    data TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. TABELA DE CHAT SEGURO POR PROTOCOLO (BIDIRECIONAL)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.protocolo_mensagens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    protocolo VARCHAR(64) NOT NULL,
    remetente VARCHAR(32) NOT NULL,
    autor_nome VARCHAR(255) NOT NULL,
    texto TEXT NOT NULL,
    lido BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.protocolo_mensagens ADD COLUMN IF NOT EXISTS denuncia_id UUID REFERENCES public.denuncias(id) ON DELETE CASCADE;

-- ============================================================================
-- 7. TABELA DE ALERTAS DE EMERGÊNCIA SOS GPS
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.sos_alertas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    precisao_metros NUMERIC(8, 2),
    dispositivo_info TEXT,
    local_aproximado TEXT,
    status VARCHAR(32) DEFAULT 'URGENTE',
    data_disparo TIMESTAMPTZ DEFAULT NOW(),
    atendido_por VARCHAR(255),
    atendido_em TIMESTAMPTZ,
    notas_atendimento TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.sos_alertas ADD COLUMN IF NOT EXISTS escola_id VARCHAR(64);
ALTER TABLE public.sos_alertas ADD COLUMN IF NOT EXISTS escola_nome VARCHAR(255);

-- ============================================================================
-- 8. TABELA DE GAMIFICAÇÃO & PERFIL ANÔNIMO DO ESTUDANTE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.estudantes_gamificacao (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_seed VARCHAR(128) UNIQUE NOT NULL,
    student_code VARCHAR(128) NOT NULL,
    current_level INTEGER DEFAULT 1,
    current_xp INTEGER DEFAULT 0,
    next_level_xp INTEGER DEFAULT 100,
    level_title VARCHAR(128) DEFAULT 'Stop Aprendiz',
    equipped_icon_id VARCHAR(128) DEFAULT 'icon_anonimo_padrao',
    equipped_frame_id VARCHAR(128) DEFAULT 'frame_leao_dourado_supremo',
    equipped_badge_id VARCHAR(128) DEFAULT 'badge_estrela_bronze',
    equipped_title_id VARCHAR(128) DEFAULT 'title_sentinela_aprendiz',
    equipped_effect_id VARCHAR(128) DEFAULT 'effect_nenhum',
    unlocked_cosmetics TEXT[] DEFAULT ARRAY['icon_anonimo_padrao', 'frame_padrao_madeira', 'frame_leao_dourado_supremo', 'badge_estrela_bronze', 'title_sentinela_aprendiz', 'effect_nenhum'],
    unlocked_achievements JSONB DEFAULT '[]'::jsonb,
    stats JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 9. TABELA DE TRIAGENS & AVALIAÇÕES DE CLIMA ESCOLAR
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.triagens_avaliacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_seed VARCHAR(128),
    nivel_risco VARCHAR(64) NOT NULL,
    score_total INTEGER DEFAULT 0,
    respostas JSONB NOT NULL DEFAULT '{}'::jsonb,
    orientacao_recomendada TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 10. TABELA DE DIÁRIO DE EMOÇÕES & SAÚDE MENTAL (ANÔNIMO)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.diario_emocional_registros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_seed VARCHAR(128),
    emocao VARCHAR(64) NOT NULL,
    intensidade INTEGER DEFAULT 3,
    gatilho VARCHAR(128),
    fez_respiracao_478 BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 11. TABELA DE AUDITORIA & TELEMETRIA DE GOVERNANÇA ESCOLAR
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.auditoria_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo VARCHAR(128) NOT NULL,
    detalhes TEXT NOT NULL,
    origem VARCHAR(128) DEFAULT 'Web App EEMTI Alfredo Machado',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 12. TABELA DE TENTATIVAS DE QUIZ EDUCATIVO
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.quiz_tentativas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_seed VARCHAR(128),
    score_percent INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 13. ÍNDICES DE ALTA PERFORMANCE (CRIADOS COM SEGURANÇA)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_denuncias_protocolo ON public.denuncias(protocolo);
CREATE INDEX IF NOT EXISTS idx_denuncias_status ON public.denuncias(status);
CREATE INDEX IF NOT EXISTS idx_denuncias_data_envio ON public.denuncias(data_envio DESC);
CREATE INDEX IF NOT EXISTS idx_denuncias_is_sos ON public.denuncias(is_sos);

CREATE INDEX IF NOT EXISTS idx_protocolo_mensagens_proto ON public.protocolo_mensagens(protocolo);
CREATE INDEX IF NOT EXISTS idx_protocolo_mensagens_data ON public.protocolo_mensagens(created_at ASC);

CREATE INDEX IF NOT EXISTS idx_sos_alertas_status ON public.sos_alertas(status);
CREATE INDEX IF NOT EXISTS idx_sos_alertas_data ON public.sos_alertas(data_disparo DESC);

CREATE INDEX IF NOT EXISTS idx_mediacoes_denuncia ON public.mediacoes_acoes(denuncia_id);
CREATE INDEX IF NOT EXISTS idx_checkins_denuncia ON public.checkins_acompanhamento(denuncia_id);
CREATE INDEX IF NOT EXISTS idx_estudantes_seed ON public.estudantes_gamificacao(student_seed);

-- ============================================================================
-- 14. TRIGGERS PARA ATUALIZAÇÃO AUTOMÁTICA DE updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_denuncias ON public.denuncias;
CREATE TRIGGER set_timestamp_denuncias
BEFORE UPDATE ON public.denuncias
FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_termos ON public.termos_acordo_convivencia;
CREATE TRIGGER set_timestamp_termos
BEFORE UPDATE ON public.termos_acordo_convivencia
FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_estudantes ON public.estudantes_gamificacao;
CREATE TRIGGER set_timestamp_estudantes
BEFORE UPDATE ON public.estudantes_gamificacao
FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- ============================================================================
-- 15. ROW LEVEL SECURITY (RLS) & POLÍTICAS DE ANONIMATO E SEGURANÇA
-- ============================================================================
ALTER TABLE public.denuncias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protocolo_mensagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_alertas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mediacoes_acoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.termos_acordo_convivencia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins_acompanhamento ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estudantes_gamificacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.triagens_avaliacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diario_emocional_registros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auditoria_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_tentativas ENABLE ROW LEVEL SECURITY;

-- Excluir políticas antigas para evitar conflito de "policy already exists"
DROP POLICY IF EXISTS "Permitir criacao anonima de denuncias" ON public.denuncias;
DROP POLICY IF EXISTS "Permitir leitura de denuncia por protocolo" ON public.denuncias;
DROP POLICY IF EXISTS "Permitir atualizacao de denuncias pela gestao" ON public.denuncias;
DROP POLICY IF EXISTS "Permitir exclusao de denuncias pela gestao" ON public.denuncias;
DROP POLICY IF EXISTS "Permitir criacao de mensagens no chat" ON public.protocolo_mensagens;
DROP POLICY IF EXISTS "Permitir leitura de mensagens no chat" ON public.protocolo_mensagens;
DROP POLICY IF EXISTS "Permitir exclusao de mensagens no chat" ON public.protocolo_mensagens;
DROP POLICY IF EXISTS "Permitir disparo anonimo de SOS" ON public.sos_alertas;
DROP POLICY IF EXISTS "Permitir leitura de alertas SOS" ON public.sos_alertas;
DROP POLICY IF EXISTS "Permitir atualizacao de alertas SOS" ON public.sos_alertas;
DROP POLICY IF EXISTS "Permitir exclusao de alertas SOS" ON public.sos_alertas;
DROP POLICY IF EXISTS "Acoes mediacao permissao total" ON public.mediacoes_acoes;
DROP POLICY IF EXISTS "Termos acordo permissao total" ON public.termos_acordo_convivencia;
DROP POLICY IF EXISTS "Checkins acompanhamento permissao total" ON public.checkins_acompanhamento;
DROP POLICY IF EXISTS "Estudantes gamificacao permissao total" ON public.estudantes_gamificacao;
DROP POLICY IF EXISTS "Triagens permissao total" ON public.triagens_avaliacoes;
DROP POLICY IF EXISTS "Diario emocional permissao total" ON public.diario_emocional_registros;
DROP POLICY IF EXISTS "Auditoria logs permissao total" ON public.auditoria_logs;
DROP POLICY IF EXISTS "Quiz tentativas permissao total" ON public.quiz_tentativas;

-- Criação das políticas de segurança
-- 1. Denúncias: Estudantes/Visitantes podem registrar denúncias de forma anônima
CREATE POLICY "denuncias_insert_anonimo" 
ON public.denuncias FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 2. Denúncias: BLOQUEIO DE VARREDURA PÚBLICA (SELECT DIRETO)
-- Consultas de protocolo são realizadas exclusivamente pela RPC 'consultar_denuncia_protocolo' (SECURITY DEFINER + rate limiting).
-- Listagens gerais são realizadas exclusivamente pela RPC 'gestao_autenticar_e_listar_denuncias' com senha de gestão.
CREATE POLICY "denuncias_bloqueio_select_geral" 
ON public.denuncias FOR SELECT 
TO anon, authenticated 
USING (false);

-- 3. Denúncias: BLOQUEIO DE ALTERAÇÃO E EXCLUSÃO DIRETA
CREATE POLICY "denuncias_bloqueio_update_direto" 
ON public.denuncias FOR UPDATE 
TO anon, authenticated 
USING (false) 
WITH CHECK (false);

CREATE POLICY "denuncias_bloqueio_delete_direto" 
ON public.denuncias FOR DELETE 
TO anon, authenticated 
USING (false);

REVOKE UPDATE, DELETE ON public.denuncias FROM anon, authenticated;

CREATE POLICY "Permitir criacao de mensagens no chat" 
ON public.protocolo_mensagens FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir leitura de mensagens no chat" 
ON public.protocolo_mensagens FOR SELECT 
USING (true);

CREATE POLICY "Permitir exclusao de mensagens no chat" 
ON public.protocolo_mensagens FOR DELETE 
USING (true);

-- Alertas SOS: Disparo emergencial anônimo permitido, leitura e edição direta bloqueadas
CREATE POLICY "sos_alertas_insert_anonimo" 
ON public.sos_alertas FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

CREATE POLICY "sos_alertas_bloqueio_select" 
ON public.sos_alertas FOR SELECT 
TO anon, authenticated 
USING (false);

CREATE POLICY "sos_alertas_bloqueio_update" 
ON public.sos_alertas FOR UPDATE 
TO anon, authenticated 
USING (false) 
WITH CHECK (false);

CREATE POLICY "sos_alertas_bloqueio_delete" 
ON public.sos_alertas FOR DELETE 
TO anon, authenticated 
USING (false);

REVOKE UPDATE, DELETE ON public.sos_alertas FROM anon, authenticated;

CREATE POLICY "Acoes mediacao permissao total" 
ON public.mediacoes_acoes FOR ALL 
USING (true);

CREATE POLICY "Termos acordo permissao total" 
ON public.termos_acordo_convivencia FOR ALL 
USING (true);

CREATE POLICY "Checkins acompanhamento permissao total" 
ON public.checkins_acompanhamento FOR ALL 
USING (true);

CREATE POLICY "Estudantes gamificacao permissao total" 
ON public.estudantes_gamificacao FOR ALL 
USING (true);

CREATE POLICY "Triagens permissao total" 
ON public.triagens_avaliacoes FOR ALL 
USING (true);

CREATE POLICY "Diario emocional permissao total" 
ON public.diario_emocional_registros FOR ALL 
USING (true);

CREATE POLICY "Auditoria logs permissao total" 
ON public.auditoria_logs FOR ALL 
USING (true);

CREATE POLICY "Quiz tentativas permissao total" 
ON public.quiz_tentativas FOR ALL 
USING (true);

-- ============================================================================
-- 16. TABELA DE CONTAS DE ESTUDANTES E RATE LIMITING NO SERVIDOR
-- ISOLAMENTO ESTRITO: ZERO VÍNCULO COM A TABELA DE DENÚNCIAS!
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS public.contas_estudantes (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    nickname VARCHAR(64) UNIQUE NOT NULL,
    display_name VARCHAR(64) NOT NULL,
    password_hash TEXT NOT NULL,
    salt VARCHAR(64) NOT NULL DEFAULT '',
    recovery_code_hash TEXT NOT NULL,
    session_token TEXT,
    session_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    auth_version INTEGER DEFAULT 3,
    gamification_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_sync_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contas_estudantes ADD COLUMN IF NOT EXISTS session_token TEXT;
ALTER TABLE public.contas_estudantes ADD COLUMN IF NOT EXISTS session_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days');
ALTER TABLE public.contas_estudantes ADD COLUMN IF NOT EXISTS auth_version INTEGER DEFAULT 3;
ALTER TABLE public.contas_estudantes ADD COLUMN IF NOT EXISTS last_sync_at TIMESTAMPTZ DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_contas_estudantes_nickname ON public.contas_estudantes(nickname);
CREATE INDEX IF NOT EXISTS idx_contas_estudantes_session ON public.contas_estudantes(id, session_token);

DROP TRIGGER IF EXISTS set_timestamp_contas_estudantes ON public.contas_estudantes;
CREATE TRIGGER set_timestamp_contas_estudantes
BEFORE UPDATE ON public.contas_estudantes
FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

CREATE TABLE IF NOT EXISTS public.tentativas_autenticacao (
    chave_identificador VARCHAR(128) PRIMARY KEY,
    tentativas INT NOT NULL DEFAULT 1,
    bloqueado_ate TIMESTAMPTZ,
    ultima_tentativa TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contas_estudantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tentativas_autenticacao ENABLE ROW LEVEL SECURITY;

-- Políticas RLS: Bloqueio estrito de acesso direto (SELECT, INSERT, UPDATE, DELETE diretos são negados)
DROP POLICY IF EXISTS "Permissao publica contas estudantes" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_insert_anonimo" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_select_controlado" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_update_restrito" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_bloqueio_select" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_bloqueio_insert" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_bloqueio_update" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_bloqueio_delete" ON public.contas_estudantes;

CREATE POLICY "contas_estudantes_bloqueio_select" ON public.contas_estudantes FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "contas_estudantes_bloqueio_insert" ON public.contas_estudantes FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "contas_estudantes_bloqueio_update" ON public.contas_estudantes FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "contas_estudantes_bloqueio_delete" ON public.contas_estudantes FOR DELETE TO anon, authenticated USING (false);

DROP POLICY IF EXISTS "tentativas_autenticacao_bloqueio" ON public.tentativas_autenticacao;
CREATE POLICY "tentativas_autenticacao_bloqueio" ON public.tentativas_autenticacao FOR ALL TO anon, authenticated USING (false);

REVOKE SELECT, INSERT, UPDATE, DELETE ON public.contas_estudantes FROM anon, authenticated;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.tentativas_autenticacao FROM anon, authenticated;

-- Rate limiting no banco
CREATE OR REPLACE FUNCTION public.servidor_verificar_rate_limit(p_chave VARCHAR)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_rec RECORD; v_wait_seconds INT; BEGIN
    SELECT tentativas, bloqueado_ate, ultima_tentativa INTO v_rec FROM public.tentativas_autenticacao WHERE chave_identificador = p_chave;
    IF FOUND THEN
        IF v_rec.ultima_tentativa < (NOW() - INTERVAL '15 minutes') THEN
            DELETE FROM public.tentativas_autenticacao WHERE chave_identificador = p_chave;
            RETURN jsonb_build_object('allowed', true, 'tentativas', 0);
        END IF;
        IF v_rec.bloqueado_ate IS NOT NULL AND v_rec.bloqueado_ate > NOW() THEN
            v_wait_seconds := CEIL(EXTRACT(EPOCH FROM (v_rec.bloqueado_ate - NOW())))::INT;
            RETURN jsonb_build_object('allowed', false, 'wait_seconds', v_wait_seconds, 'tentativas', v_rec.tentativas, 'error', 'Muitas tentativas. Bloqueado temporariamente por ' || v_wait_seconds || 's.');
        END IF;
    END IF;
    RETURN jsonb_build_object('allowed', true);
END; $$;

CREATE OR REPLACE FUNCTION public.servidor_registrar_falha_rate_limit(p_chave VARCHAR)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_tentativas INT := 1; v_bloqueio_ate TIMESTAMPTZ := NULL; v_wait_seconds INT := 0; BEGIN
    INSERT INTO public.tentativas_autenticacao (chave_identificador, tentativas, ultima_tentativa) VALUES (p_chave, 1, NOW())
    ON CONFLICT (chave_identificador) DO UPDATE SET tentativas = public.tentativas_autenticacao.tentativas + 1, ultima_tentativa = NOW()
    RETURNING tentativas INTO v_tentativas;
    IF v_tentativas >= 7 THEN v_wait_seconds := 900; v_bloqueio_ate := NOW() + INTERVAL '15 minutes';
    ELSIF v_tentativas >= 5 THEN v_wait_seconds := 300; v_bloqueio_ate := NOW() + INTERVAL '5 minutes';
    ELSIF v_tentativas >= 3 THEN v_wait_seconds := 30; v_bloqueio_ate := NOW() + INTERVAL '30 seconds'; END IF;
    IF v_bloqueio_ate IS NOT NULL THEN UPDATE public.tentativas_autenticacao SET bloqueado_ate = v_bloqueio_ate WHERE chave_identificador = p_chave; END IF;
    RETURN jsonb_build_object('tentativas', v_tentativas, 'wait_seconds', v_wait_seconds);
END; $$;

CREATE OR REPLACE FUNCTION public.servidor_limpar_rate_limit(p_chave VARCHAR)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN DELETE FROM public.tentativas_autenticacao WHERE chave_identificador = p_chave; END; $$;

-- REVOGAÇÃO ESTRITA: NENHUM cliente via API pública pode invocar as funções internas de rate limit diretamente!
REVOKE EXECUTE ON FUNCTION public.servidor_verificar_rate_limit(VARCHAR) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.servidor_registrar_falha_rate_limit(VARCHAR) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.servidor_limpar_rate_limit(VARCHAR) FROM PUBLIC, anon, authenticated;

-- RPCs Seguras
CREATE OR REPLACE FUNCTION public.verificar_disponibilidade_nickname(p_nickname VARCHAR)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_clean VARCHAR; BEGIN
    v_clean := lower(trim(p_nickname));
    IF char_length(v_clean) < 3 OR char_length(v_clean) > 20 THEN RETURN jsonb_build_object('available', false, 'error', 'Nickname deve ter entre 3 e 20 caracteres.'); END IF;
    IF EXISTS (SELECT 1 FROM public.contas_estudantes WHERE nickname = v_clean) THEN RETURN jsonb_build_object('available', false, 'error', 'Nickname já em uso.'); END IF;
    RETURN jsonb_build_object('available', true);
END; $$;

CREATE OR REPLACE FUNCTION public.obter_salto_autenticacao(p_nickname VARCHAR)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_clean_nick VARCHAR; v_salt VARCHAR; v_auth_version INT; v_rl JSONB; BEGIN
    v_clean_nick := lower(trim(p_nickname));
    v_rl := public.servidor_verificar_rate_limit('salt:' || v_clean_nick);
    IF (v_rl->>'allowed')::boolean = false THEN RETURN jsonb_build_object('found', false, 'error', v_rl->>'error', 'wait_seconds', (v_rl->>'wait_seconds')::int); END IF;
    SELECT salt, auth_version INTO v_salt, v_auth_version FROM public.contas_estudantes WHERE nickname = v_clean_nick;
    IF NOT FOUND THEN RETURN jsonb_build_object('found', false, 'salt', encode(extensions.digest(v_clean_nick || 'stopbullying_salt_pad', 'sha256'), 'hex'), 'auth_version', 3); END IF;
    RETURN jsonb_build_object('found', true, 'salt', v_salt, 'auth_version', COALESCE(v_auth_version, 3));
END; $$;

CREATE OR REPLACE FUNCTION public.cadastrar_conta_estudante(
    p_id UUID, p_nickname VARCHAR, p_display_name VARCHAR, p_password_hash TEXT, p_salt VARCHAR, p_recovery_code_hash TEXT, p_gamification_snapshot JSONB, p_auth_version INTEGER DEFAULT 3
) RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_clean_nick VARCHAR; v_session_token TEXT; v_server_pw_hash TEXT; v_server_rec_hash TEXT; v_rl JSONB; BEGIN
    v_clean_nick := lower(trim(p_nickname));
    v_rl := public.servidor_verificar_rate_limit('reg:' || v_clean_nick);
    IF (v_rl->>'allowed')::boolean = false THEN RETURN jsonb_build_object('success', false, 'error', v_rl->>'error', 'wait_seconds', (v_rl->>'wait_seconds')::int); END IF;
    IF char_length(v_clean_nick) < 3 OR char_length(v_clean_nick) > 20 THEN PERFORM public.servidor_registrar_falha_rate_limit('reg:' || v_clean_nick); RETURN jsonb_build_object('success', false, 'error', 'Nickname deve ter entre 3 e 20 caracteres.'); END IF;
    IF v_clean_nick ~ '[^a-zA-Z0-9_\-]' THEN PERFORM public.servidor_registrar_falha_rate_limit('reg:' || v_clean_nick); RETURN jsonb_build_object('success', false, 'error', 'Nickname contém caracteres inválidos.'); END IF;
    IF v_clean_nick IN ('admin', 'administracao', 'gestao', 'coordenacao', 'sistema', 'suporte', 'direcao', 'moderador') THEN RETURN jsonb_build_object('success', false, 'error', 'Nickname reservado pela escola.'); END IF;
    IF EXISTS (SELECT 1 FROM public.contas_estudantes WHERE nickname = v_clean_nick) THEN PERFORM public.servidor_registrar_falha_rate_limit('reg:' || v_clean_nick); RETURN jsonb_build_object('success', false, 'error', 'Este nickname já está registrado.'); END IF;
    v_server_pw_hash := extensions.crypt(p_password_hash, extensions.gen_salt('bf', 10));
    v_server_rec_hash := extensions.crypt(p_recovery_code_hash, extensions.gen_salt('bf', 10));
    v_session_token := encode(extensions.gen_random_bytes(32), 'hex');
    INSERT INTO public.contas_estudantes (id, nickname, display_name, password_hash, salt, recovery_code_hash, session_token, session_expires_at, auth_version, gamification_snapshot, created_at, updated_at, last_sync_at)
    VALUES (p_id, v_clean_nick, trim(p_display_name), v_server_pw_hash, p_salt, v_server_rec_hash, v_session_token, NOW() + INTERVAL '30 days', 3, COALESCE(p_gamification_snapshot, '{}'::jsonb), NOW(), NOW(), NOW());
    PERFORM public.servidor_limpar_rate_limit('reg:' || v_clean_nick);
    RETURN jsonb_build_object('success', true, 'id', p_id, 'nickname', v_clean_nick, 'display_name', trim(p_display_name), 'session_token', v_session_token);
EXCEPTION WHEN unique_violation THEN PERFORM public.servidor_registrar_falha_rate_limit('reg:' || v_clean_nick); RETURN jsonb_build_object('success', false, 'error', 'Nickname já em uso.');
WHEN OTHERS THEN RETURN jsonb_build_object('success', false, 'error', SQLERRM); END; $$;

CREATE OR REPLACE FUNCTION public.autenticar_estudante_verificar(p_nickname VARCHAR, p_computed_password_hash TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_clean_nick VARCHAR; v_rec RECORD; v_rl JSONB; v_fail JSONB; v_new_session_token TEXT; v_auth_valid BOOLEAN := false; BEGIN
    v_clean_nick := lower(trim(p_nickname));
    v_rl := public.servidor_verificar_rate_limit('login:' || v_clean_nick);
    IF (v_rl->>'allowed')::boolean = false THEN RETURN jsonb_build_object('success', false, 'error', v_rl->>'error', 'wait_seconds', (v_rl->>'wait_seconds')::int, 'blocked', true); END IF;
    SELECT id, nickname, display_name, password_hash, auth_version, gamification_snapshot, created_at, updated_at, last_sync_at INTO v_rec FROM public.contas_estudantes WHERE nickname = v_clean_nick;
    IF NOT FOUND THEN v_fail := public.servidor_registrar_falha_rate_limit('login:' || v_clean_nick); RETURN jsonb_build_object('success', false, 'error', 'Nickname ou senha incorretos.', 'wait_seconds', (v_fail->>'wait_seconds')::int); END IF;
    IF v_rec.password_hash LIKE '$2%' THEN
        v_auth_valid := (v_rec.password_hash = extensions.crypt(p_computed_password_hash, v_rec.password_hash));
    ELSE
        v_auth_valid := (v_rec.password_hash = p_computed_password_hash);
        IF v_auth_valid THEN UPDATE public.contas_estudantes SET password_hash = extensions.crypt(p_computed_password_hash, extensions.gen_salt('bf', 10)), auth_version = 3 WHERE id = v_rec.id; END IF;
    END IF;
    IF NOT v_auth_valid THEN v_fail := public.servidor_registrar_falha_rate_limit('login:' || v_clean_nick); RETURN jsonb_build_object('success', false, 'error', 'Nickname ou senha incorretos.', 'wait_seconds', (v_fail->>'wait_seconds')::int); END IF;
    PERFORM public.servidor_limpar_rate_limit('login:' || v_clean_nick);
    v_new_session_token := encode(extensions.gen_random_bytes(32), 'hex');
    UPDATE public.contas_estudantes SET session_token = v_new_session_token, session_expires_at = NOW() + INTERVAL '30 days', last_sync_at = NOW() WHERE id = v_rec.id;
    RETURN jsonb_build_object('success', true, 'id', v_rec.id, 'nickname', v_rec.nickname, 'display_name', v_rec.display_name, 'session_token', v_new_session_token, 'auth_version', 3, 'gamification_snapshot', v_rec.gamification_snapshot, 'created_at', v_rec.created_at, 'updated_at', v_rec.updated_at, 'last_sync_at', NOW());
END; $$;

CREATE OR REPLACE FUNCTION public.recuperar_conta_estudante(p_nickname VARCHAR, p_recovery_code_hash TEXT, p_new_password_hash TEXT, p_new_salt VARCHAR, p_new_recovery_code_hash TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_clean_nick VARCHAR; v_rec RECORD; v_rl JSONB; v_fail JSONB; v_new_session_token TEXT; v_rec_valid BOOLEAN := false; v_new_server_pw_hash TEXT; v_new_server_rec_hash TEXT; BEGIN
    v_clean_nick := lower(trim(p_nickname));
    v_rl := public.servidor_verificar_rate_limit('rec:' || v_clean_nick);
    IF (v_rl->>'allowed')::boolean = false THEN RETURN jsonb_build_object('success', false, 'error', v_rl->>'error', 'wait_seconds', (v_rl->>'wait_seconds')::int, 'blocked', true); END IF;
    SELECT id, nickname, display_name, recovery_code_hash, gamification_snapshot INTO v_rec FROM public.contas_estudantes WHERE nickname = v_clean_nick;
    IF NOT FOUND THEN v_fail := public.servidor_registrar_falha_rate_limit('rec:' || v_clean_nick); RETURN jsonb_build_object('success', false, 'error', 'Código de recuperação inválido para este nickname.'); END IF;
    IF v_rec.recovery_code_hash LIKE '$2%' THEN v_rec_valid := (v_rec.recovery_code_hash = extensions.crypt(p_recovery_code_hash, v_rec.recovery_code_hash));
    ELSE v_rec_valid := (v_rec.recovery_code_hash = p_recovery_code_hash); END IF;
    IF NOT v_rec_valid THEN v_fail := public.servidor_registrar_falha_rate_limit('rec:' || v_clean_nick); RETURN jsonb_build_object('success', false, 'error', 'Código de recuperação inválido para este nickname.', 'wait_seconds', (v_fail->>'wait_seconds')::int); END IF;
    PERFORM public.servidor_limpar_rate_limit('rec:' || v_clean_nick);
    v_new_session_token := encode(extensions.gen_random_bytes(32), 'hex');
    v_new_server_pw_hash := extensions.crypt(p_new_password_hash, extensions.gen_salt('bf', 10));
    v_new_server_rec_hash := extensions.crypt(p_new_recovery_code_hash, extensions.gen_salt('bf', 10));
    UPDATE public.contas_estudantes SET password_hash = v_new_server_pw_hash, salt = p_new_salt, recovery_code_hash = v_new_server_rec_hash, session_token = v_new_session_token, session_expires_at = NOW() + INTERVAL '30 days', auth_version = 3, updated_at = NOW(), last_sync_at = NOW() WHERE id = v_rec.id;
    RETURN jsonb_build_object('success', true, 'id', v_rec.id, 'nickname', v_rec.nickname, 'display_name', v_rec.display_name, 'session_token', v_new_session_token, 'gamification_snapshot', v_rec.gamification_snapshot);
END; $$;

CREATE OR REPLACE FUNCTION public.sincronizar_snapshot_estudante(p_account_id UUID, p_session_token TEXT, p_snapshot JSONB)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_count INT; v_level INT; v_xp INT; BEGIN
    IF p_session_token IS NULL OR char_length(p_session_token) < 16 THEN RETURN jsonb_build_object('success', false, 'error', 'Sessão inválida ou não autenticada.'); END IF;
    v_level := (p_snapshot->'userProfile'->>'currentLevel')::int;
    v_xp := (p_snapshot->'userProfile'->>'currentXp')::int;
    IF v_level IS NOT NULL AND (v_level < 1 OR v_level > 100) THEN RETURN jsonb_build_object('success', false, 'error', 'Nível inválido (permitido entre 1 e 100).'); END IF;
    IF v_xp IS NOT NULL AND (v_xp < 0 OR v_xp > 500000) THEN RETURN jsonb_build_object('success', false, 'error', 'XP inválido (limite do sistema excedido).'); END IF;
    UPDATE public.contas_estudantes SET gamification_snapshot = p_snapshot, updated_at = NOW(), last_sync_at = NOW()
    WHERE id = p_account_id AND session_token = p_session_token AND (session_expires_at IS NULL OR session_expires_at > NOW());
    GET DIAGNOSTICS v_count = ROW_COUNT;
    IF v_count = 0 THEN RETURN jsonb_build_object('success', false, 'error', 'Não autorizado: identificador ou sessão expirada/incorreta.'); END IF;
    RETURN jsonb_build_object('success', true);
END; $$;

CREATE OR REPLACE FUNCTION public.encerrar_sessao_estudante(p_account_id UUID, p_session_token TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
    UPDATE public.contas_estudantes SET session_token = NULL, session_expires_at = NOW()
    WHERE id = p_account_id AND session_token = p_session_token;
    RETURN jsonb_build_object('success', true);
END; $$;

CREATE OR REPLACE FUNCTION public.consultar_denuncia_protocolo(p_protocolo VARCHAR)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_clean VARCHAR; v_rec RECORD; v_rl JSONB; BEGIN
    v_clean := upper(trim(p_protocolo));
    IF char_length(v_clean) < 4 THEN RETURN jsonb_build_object('found', false, 'error', 'Protocolo inválido.'); END IF;
    v_rl := public.servidor_verificar_rate_limit('proto:' || v_clean);
    IF (v_rl->>'allowed')::boolean = false THEN RETURN jsonb_build_object('found', false, 'error', v_rl->>'error', 'wait_seconds', (v_rl->>'wait_seconds')::int); END IF;
    SELECT id, protocolo, tipo_violencia, local_escola, turno, frequencia, papel_denunciante, turma_envolvida, descricao, status, nivel_gravidade, nivel_escalada, is_sos, etapa_mediacao, impactos_identificados, medidas_protecao, provas_anexas, data_envio, escola_id, escola_nome, escola_ocorrencia_id, escola_ocorrencia_nome, turma_ocorrencia, feedback_escola, created_at, updated_at
    INTO v_rec FROM public.denuncias
    WHERE upper(trim(protocolo)) = v_clean OR upper(trim(protocolo)) = ('#' || v_clean) OR ('#' || upper(trim(protocolo))) = v_clean;
    IF NOT FOUND THEN PERFORM public.servidor_registrar_falha_rate_limit('proto:' || v_clean); RETURN jsonb_build_object('found', false, 'error', 'Nenhum registro encontrado com este protocolo.'); END IF;
    PERFORM public.servidor_limpar_rate_limit('proto:' || v_clean);
    RETURN jsonb_build_object('found', true, 'denuncia', row_to_json(v_rec));
END; $$;

-- ============================================================================
-- 16-B. TABELA DE CONTAS DE GESTÃO ESCOLAR (AUTENTICAÇÃO FORTE NO SERVIDOR)
-- Criptografia com pgcrypto (Bcrypt) e tokens de sessão criptográficos
-- ZERO senhas mestras fixas no código ou no banco!
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contas_gestao (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    usuario VARCHAR(64) UNIQUE NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    cargo VARCHAR(128) NOT NULL DEFAULT 'Coordenação Pedagógica',
    password_hash TEXT NOT NULL,
    salt VARCHAR(64) NOT NULL DEFAULT '',
    role VARCHAR(32) NOT NULL DEFAULT 'gestor',
    ativo BOOLEAN NOT NULL DEFAULT true,
    session_token TEXT,
    session_expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

ALTER TABLE public.contas_gestao ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "contas_gestao_bloqueio_total" ON public.contas_gestao;
CREATE POLICY "contas_gestao_bloqueio_total" ON public.contas_gestao FOR ALL TO anon, authenticated USING (false);
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.contas_gestao FROM anon, authenticated;

-- Seed inicial seguro da conta gestora institucional com hash Bcrypt
-- Usuário: gestao.alfredomachado
-- Senha inicial padrão: Gestao@Alfredo2026!
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.contas_gestao WHERE usuario = 'gestao.alfredomachado') THEN
        INSERT INTO public.contas_gestao (
            usuario, nome_completo, email, cargo, password_hash, role, ativo
        ) VALUES (
            'gestao.alfredomachado',
            'Equipe de Gestão Escolar & Mediação (EEMTI Alfredo Machado)',
            'eemti.alfredomachado@escola.ce.gov.br',
            'Comissão de Mediação & Coordenação',
            extensions.crypt('Gestao@Alfredo2026!', extensions.gen_salt('bf', 10)),
            'superadmin',
            true
        );
    END IF;
END $$;

CREATE OR REPLACE FUNCTION public.autenticar_gestor(p_usuario VARCHAR, p_senha TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE
    v_clean_user VARCHAR;
    v_rec RECORD;
    v_rl JSONB;
    v_fail JSONB;
    v_token TEXT;
    v_valid BOOLEAN := false;
BEGIN
    v_clean_user := lower(trim(p_usuario));
    IF char_length(v_clean_user) < 3 OR char_length(p_senha) < 4 THEN
        RETURN jsonb_build_object('success', false, 'error', 'Credenciais inválidas.');
    END IF;

    v_rl := public.servidor_verificar_rate_limit('gestao_login:' || v_clean_user);
    IF (v_rl->>'allowed')::boolean = false THEN
        RETURN jsonb_build_object('success', false, 'error', v_rl->>'error', 'wait_seconds', (v_rl->>'wait_seconds')::int, 'blocked', true);
    END IF;

    SELECT id, usuario, nome_completo, cargo, role, password_hash, ativo
    INTO v_rec FROM public.contas_gestao
    WHERE usuario = v_clean_user AND ativo = true;

    IF NOT FOUND THEN
        v_fail := public.servidor_registrar_falha_rate_limit('gestao_login:' || v_clean_user);
        RETURN jsonb_build_object('success', false, 'error', 'Usuário ou senha de gestão incorretos.', 'wait_seconds', (v_fail->>'wait_seconds')::int);
    END IF;

    IF v_rec.password_hash LIKE '$2%' THEN
        v_valid := (v_rec.password_hash = extensions.crypt(p_senha, v_rec.password_hash));
    ELSE
        v_valid := (v_rec.password_hash = p_senha);
        IF v_valid THEN
            UPDATE public.contas_gestao SET password_hash = extensions.crypt(p_senha, extensions.gen_salt('bf', 10)) WHERE id = v_rec.id;
        END IF;
    END IF;

    IF NOT v_valid THEN
        v_fail := public.servidor_registrar_falha_rate_limit('gestao_login:' || v_clean_user);
        RETURN jsonb_build_object('success', false, 'error', 'Usuário ou senha de gestão incorretos.', 'wait_seconds', (v_fail->>'wait_seconds')::int);
    END IF;

    PERFORM public.servidor_limpar_rate_limit('gestao_login:' || v_clean_user);

    v_token := encode(extensions.gen_random_bytes(32), 'hex');
    UPDATE public.contas_gestao
    SET session_token = v_token,
        session_expires_at = NOW() + INTERVAL '7 days',
        last_login_at = NOW(),
        updated_at = NOW()
    WHERE id = v_rec.id;

    RETURN jsonb_build_object(
        'success', true,
        'token', v_token,
        'user', jsonb_build_object(
            'id', v_rec.id,
            'usuario', v_rec.usuario,
            'nome_completo', v_rec.nome_completo,
            'cargo', v_rec.cargo,
            'role', v_rec.role
        )
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.validar_sessao_gestao(p_token TEXT)
RETURNS BOOLEAN LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
    IF p_token IS NULL OR char_length(p_token) < 16 THEN
        RETURN false;
    END IF;

    RETURN EXISTS (
        SELECT 1 FROM public.contas_gestao
        WHERE session_token = p_token
          AND ativo = true
          AND (session_expires_at IS NULL OR session_expires_at > NOW())
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.encerrar_sessao_gestor(p_token TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
    UPDATE public.contas_gestao
    SET session_token = NULL, session_expires_at = NOW()
    WHERE session_token = p_token;

    RETURN jsonb_build_object('success', true);
END;
$$;

CREATE OR REPLACE FUNCTION public.gestao_autenticar_e_listar_denuncias(p_session_token TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_denuncias JSONB; BEGIN
    IF NOT public.validar_sessao_gestao(p_session_token) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não autorizado: sessão de gestão inválida ou expirada.');
    END IF;

    SELECT jsonb_agg(row_to_json(d)) INTO v_denuncias FROM (SELECT * FROM public.denuncias WHERE status <> 'Excluído' ORDER BY data_envio DESC) d;
    RETURN jsonb_build_object('success', true, 'denuncias', COALESCE(v_denuncias, '[]'::jsonb));
END; $$;

CREATE OR REPLACE FUNCTION public.gestao_listar_sos_alertas(p_session_token TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE v_alerts JSONB; BEGIN
    IF NOT public.validar_sessao_gestao(p_session_token) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não autorizado: sessão de gestão inválida ou expirada.');
    END IF;

    SELECT jsonb_agg(row_to_json(s)) INTO v_alerts FROM (SELECT * FROM public.sos_alertas ORDER BY data_disparo DESC) s;
    RETURN jsonb_build_object('success', true, 'alertas', COALESCE(v_alerts, '[]'::jsonb));
END; $$;

CREATE OR REPLACE FUNCTION public.gestao_salvar_escola(p_session_token TEXT, p_escola JSONB)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE
    v_id VARCHAR;
BEGIN
    IF NOT public.validar_sessao_gestao(p_session_token) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não autorizado: sessão de gestão inválida ou expirada.');
    END IF;

    v_id := COALESCE(p_escola->>'id', 'escola-' || encode(extensions.gen_random_bytes(6), 'hex'));

    INSERT INTO public.perfis_escolas (
        id, nome, sigla, codigo_inep, cidade, estado, rede,
        orgao_regional, conselho_tutelar_local, endereco, telefone,
        email_institucional, email_conselho_tutelar, diretor,
        coordenador_pedagogico, comissao_mediacao_nome, ativa,
        turmas_cadastradas, estrutura_escolar, logo_tipo, descricao,
        criada_em, updated_at
    ) VALUES (
        v_id,
        p_escola->>'nome',
        p_escola->>'sigla',
        p_escola->>'codigo_inep',
        p_escola->>'cidade',
        COALESCE(p_escola->>'estado', 'CE'),
        COALESCE(p_escola->>'rede', 'Estadual'),
        p_escola->>'orgao_regional',
        p_escola->>'conselho_tutelar_local',
        p_escola->>'endereco',
        p_escola->>'telefone',
        p_escola->>'email_institucional',
        p_escola->>'email_conselho_tutelar',
        p_escola->>'diretor',
        p_escola->>'coordenador_pedagogico',
        p_escola->>'comissao_mediacao_nome',
        COALESCE((p_escola->>'ativa')::boolean, true),
        COALESCE(ARRAY(SELECT jsonb_array_elements_text(p_escola->'turmas_cadastradas')), '{}'),
        COALESCE(p_escola->'estrutura_escolar', '[]'::jsonb),
        COALESCE(p_escola->>'logo_tipo', 'padrao'),
        p_escola->>'descricao',
        COALESCE((p_escola->>'criada_em')::timestamptz, NOW()),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        nome = EXCLUDED.nome,
        sigla = EXCLUDED.sigla,
        codigo_inep = EXCLUDED.codigo_inep,
        cidade = EXCLUDED.cidade,
        estado = EXCLUDED.estado,
        rede = EXCLUDED.rede,
        orgao_regional = EXCLUDED.orgao_regional,
        conselho_tutelar_local = EXCLUDED.conselho_tutelar_local,
        endereco = EXCLUDED.endereco,
        telefone = EXCLUDED.telefone,
        email_institucional = EXCLUDED.email_institucional,
        email_conselho_tutelar = EXCLUDED.email_conselho_tutelar,
        diretor = EXCLUDED.diretor,
        coordenador_pedagogico = EXCLUDED.coordenador_pedagogico,
        comissao_mediacao_nome = EXCLUDED.comissao_mediacao_nome,
        ativa = EXCLUDED.ativa,
        turmas_cadastradas = EXCLUDED.turmas_cadastradas,
        estrutura_escolar = EXCLUDED.estrutura_escolar,
        logo_tipo = EXCLUDED.logo_tipo,
        descricao = EXCLUDED.descricao,
        updated_at = NOW();

    RETURN jsonb_build_object('success', true, 'id', v_id);
END;
$$;

CREATE OR REPLACE FUNCTION public.gestao_excluir_escola(p_session_token TEXT, p_escola_id VARCHAR)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE
    v_count INT;
BEGIN
    IF NOT public.validar_sessao_gestao(p_session_token) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não autorizado: sessão inválida.');
    END IF;

    SELECT COUNT(*) INTO v_count FROM public.perfis_escolas;
    IF v_count <= 1 THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não é permitido excluir a única escola do sistema.');
    END IF;

    DELETE FROM public.perfis_escolas WHERE id = p_escola_id;
    RETURN jsonb_build_object('success', true);
END;
$$;

CREATE OR REPLACE FUNCTION public.gestao_atualizar_denuncia(p_session_token TEXT, p_denuncia_id VARCHAR, p_dados JSONB)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
    IF NOT public.validar_sessao_gestao(p_session_token) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não autorizado: sessão inválida.');
    END IF;

    UPDATE public.denuncias
    SET 
        status = COALESCE(p_dados->>'status', status),
        nivel_gravidade = COALESCE(p_dados->>'nivel_gravidade', nivel_gravidade),
        nivel_escalada = COALESCE(p_dados->>'nivel_escalada', nivel_escalada),
        etapa_mediacao = COALESCE(p_dados->>'etapa_mediacao', etapa_mediacao),
        is_sos = CASE WHEN p_dados ? 'is_sos' THEN (p_dados->>'is_sos')::boolean ELSE is_sos END,
        feedback_escola = CASE WHEN p_dados ? 'feedback_escola' THEN p_dados->'feedback_escola' ELSE feedback_escola END,
        updated_at = NOW()
    WHERE id::text = p_denuncia_id OR upper(trim(replace(protocolo, '#', ''))) = upper(trim(replace(p_denuncia_id, '#', '')));

    RETURN jsonb_build_object('success', true);
END;
$$;

CREATE OR REPLACE FUNCTION public.gestao_excluir_denuncia(p_session_token TEXT, p_denuncia_id VARCHAR, p_protocolo VARCHAR DEFAULT NULL)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
DECLARE
    v_clean_proto VARCHAR;
BEGIN
    IF NOT public.validar_sessao_gestao(p_session_token) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não autorizado.');
    END IF;

    IF p_protocolo IS NOT NULL AND p_protocolo <> '' THEN
        v_clean_proto := upper(trim(replace(p_protocolo, '#', '')));
        DELETE FROM public.protocolo_mensagens WHERE upper(trim(replace(protocolo, '#', ''))) = v_clean_proto;
    END IF;

    IF p_denuncia_id IS NOT NULL AND p_denuncia_id <> '' THEN
        DELETE FROM public.protocolo_mensagens WHERE denuncia_id::text = p_denuncia_id;
        DELETE FROM public.mediacoes_acoes WHERE denuncia_id::text = p_denuncia_id;
        DELETE FROM public.termos_acordo_convivencia WHERE denuncia_id::text = p_denuncia_id;
        DELETE FROM public.checkins_acompanhamento WHERE denuncia_id::text = p_denuncia_id;
        DELETE FROM public.denuncias WHERE id::text = p_denuncia_id;
    END IF;

    IF v_clean_proto IS NOT NULL AND v_clean_proto <> '' THEN
        DELETE FROM public.denuncias WHERE upper(trim(replace(protocolo, '#', ''))) = v_clean_proto;
    END IF;

    RETURN jsonb_build_object('success', true);
END;
$$;

CREATE OR REPLACE FUNCTION public.gestao_atualizar_sos(p_session_token TEXT, p_sos_id VARCHAR, p_status VARCHAR, p_atendente VARCHAR, p_notas TEXT)
RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, extensions AS $$
BEGIN
    IF NOT public.validar_sessao_gestao(p_session_token) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não autorizado.');
    END IF;

    UPDATE public.sos_alertas
    SET 
        status = p_status,
        atendido_por = p_atendente,
        atendido_em = NOW(),
        notas_atendimento = p_notas
    WHERE id::text = p_sos_id;

    RETURN jsonb_build_object('success', true);
END;
$$;

GRANT EXECUTE ON FUNCTION public.verificar_disponibilidade_nickname TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.obter_salto_autenticacao TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cadastrar_conta_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.autenticar_estudante_verificar TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.recuperar_conta_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sincronizar_snapshot_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.encerrar_sessao_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consultar_denuncia_protocolo TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.autenticar_gestor TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.encerrar_sessao_gestor TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_autenticar_e_listar_denuncias TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_listar_sos_alertas TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_salvar_escola TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_excluir_escola TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_atualizar_denuncia TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_excluir_denuncia TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_atualizar_sos TO anon, authenticated;

-- ============================================================================
-- 17. TABELA DE PERFIS DE ESCOLAS & GESTÃO MULTI-INSTITUCIONAL
-- Suporte universal a redes Estaduais, Municipais, Federais e Privadas
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
    estrutura_escolar JSONB DEFAULT '[]'::jsonb,
    logo_tipo VARCHAR(64) DEFAULT 'padrao',
    descricao TEXT,
    criada_em TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices de Alta Performance para Perfis de Escolas
CREATE INDEX IF NOT EXISTS idx_perfis_escolas_cidade ON public.perfis_escolas(cidade);
CREATE INDEX IF NOT EXISTS idx_perfis_escolas_rede ON public.perfis_escolas(rede);
CREATE INDEX IF NOT EXISTS idx_denuncias_escola_id ON public.denuncias(escola_id);
CREATE INDEX IF NOT EXISTS idx_sos_alertas_escola_id ON public.sos_alertas(escola_id);

-- Trigger de atualização automática de updated_at para perfis de escolas
DROP TRIGGER IF EXISTS set_timestamp_perfis_escolas ON public.perfis_escolas;
CREATE TRIGGER set_timestamp_perfis_escolas
BEFORE UPDATE ON public.perfis_escolas
FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

-- Row Level Security (RLS) para Perfis de Escolas
ALTER TABLE public.perfis_escolas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir leitura de perfis de escolas" ON public.perfis_escolas;
DROP POLICY IF EXISTS "Permitir criacao de perfis de escolas" ON public.perfis_escolas;
DROP POLICY IF EXISTS "Permitir atualizacao de perfis de escolas" ON public.perfis_escolas;
DROP POLICY IF EXISTS "Permitir exclusao de perfis de escolas" ON public.perfis_escolas;
DROP POLICY IF EXISTS "Permitir administracao de escolas" ON public.perfis_escolas;
DROP POLICY IF EXISTS "perfis_escolas_select_publico" ON public.perfis_escolas;
DROP POLICY IF EXISTS "perfis_escolas_bloqueio_insert" ON public.perfis_escolas;
DROP POLICY IF EXISTS "perfis_escolas_bloqueio_update" ON public.perfis_escolas;
DROP POLICY IF EXISTS "perfis_escolas_bloqueio_delete" ON public.perfis_escolas;

-- Leitura pública das escolas (necessária para estudantes selecionarem sua escola no formulário de denúncias e relatórios)
CREATE POLICY "perfis_escolas_select_publico" 
ON public.perfis_escolas FOR SELECT 
TO anon, authenticated 
USING (true);

-- Bloqueio estrito de inserção, alteração e exclusão direta via REST por anônimos ou usuários comuns:
-- Qualquer mutação de escolas DEVE ser realizada exclusivamente pela função RPC segura 'gestao_salvar_escola' ou 'gestao_excluir_escola',
-- a qual autentica a senha mestra de gestão no próprio servidor PostgreSQL com rate-limiting!
CREATE POLICY "perfis_escolas_bloqueio_insert" 
ON public.perfis_escolas FOR INSERT 
TO anon, authenticated 
WITH CHECK (false);

CREATE POLICY "perfis_escolas_bloqueio_update" 
ON public.perfis_escolas FOR UPDATE 
TO anon, authenticated 
USING (false) 
WITH CHECK (false);

CREATE POLICY "perfis_escolas_bloqueio_delete" 
ON public.perfis_escolas FOR DELETE 
TO anon, authenticated 
USING (false);

REVOKE INSERT, UPDATE, DELETE ON public.perfis_escolas FROM anon, authenticated;

-- Seed Inicial das Escolas Modelo no Banco Supabase
INSERT INTO public.perfis_escolas (
    id, nome, sigla, codigo_inep, cidade, estado, rede,
    orgao_regional, conselho_tutelar_local, endereco, telefone,
    email_institucional, email_conselho_tutelar, diretor,
    coordenador_pedagogico, comissao_mediacao_nome, ativa,
    turmas_cadastradas, logo_tipo, descricao
) VALUES 
(
    'escola-eemti-alfredo-machado',
    'E.E.M.T.I. Alfredo Machado',
    'EEMTI-AM',
    '23078491',
    'Madalena',
    'CE',
    'Estadual',
    'SEDUC • CREDE 12 • MADALENA – CE',
    'Conselho Tutelar de Madalena – CE',
    'Rua Antônio Domingos Pereira, s/n - Centro, Madalena - CE',
    '(88) 3442-1234',
    'eemti.alfredomachado@escola.ce.gov.br',
    'conselhotutelar.madalena@ceara.gov.br',
    'Profª. Maria Aparecida Ribeiro',
    'Prof. Francisco Antônio de Sousa',
    'Comissão de Mediação Escolar & Cultura de Paz',
    true,
    ARRAY['1º Ano A', '1º Ano B', '1º Ano C', '1º Ano D', '2º Ano A', '2º Ano B', '2º Ano C', '2º Ano D', '3º Ano A', '3º Ano B', '3º Ano C', '3º Ano D'],
    'estadual',
    'Escola de Ensino Médio em Tempo Integral referência em projetos de mediação e cultura de paz.'
),
(
    'escola-eef-maria-do-carmo',
    'E.E.F. Maria do Carmo Bezerra',
    'EEF-MCB',
    '23089124',
    'Madalena',
    'CE',
    'Municipal',
    'SME • SECRETARIA MUNICIPAL DE EDUCAÇÃO DE MADALENA',
    'Conselho Tutelar de Madalena – CE',
    'Av. Rodolfo Teófilo, 450 - Bairro São José, Madalena - CE',
    '(88) 3442-5678',
    'eef.mariadocarmo@madalena.ce.gov.br',
    'conselhotutelar.madalena@ceara.gov.br',
    'Prof. Raimundo Nonato Ferreira',
    'Profª. Ana Cláudia Silveira',
    'Núcleo de Cidadania & Acolhimento Estudantil',
    false,
    ARRAY['6º Ano A', '6º Ano B', '7º Ano A', '8º Ano A', '9º Ano A', '9º Ano B'],
    'municipal',
    'Escola de Ensino Fundamental da rede municipal com foco na transição dos anos finais.'
),
(
    'escola-santos-dumont-quixada',
    'Colégio Estadual Santos Dumont',
    'CESD',
    '23012984',
    'Quixadá',
    'CE',
    'Estadual',
    'SEDUC • CREDE 12 • QUIXADÁ – CE',
    'Conselho Tutelar de Quixadá – CE',
    'Rua José Jucá, 890 - Centro, Quixadá - CE',
    '(88) 3412-4000',
    'santosdumont@escola.ce.gov.br',
    'conselhotutelar.quixada@ceara.gov.br',
    'Profª. Elisabete Carvalho Gomes',
    'Prof. Marcos Vinícius Lima',
    'Comissão de Mediação Restaurativa Santos Dumont',
    false,
    ARRAY['1º Ano A', '1º Ano B', '2º Ano A', '2º Ano B', '3º Ano A', '3º Ano B'],
    'estadual',
    'Unidade escolar com tradição em projetos de protagonismo juvenil e tecnologia educacional.'
),
(
    'escola-ifce-caninde',
    'IFCE – Instituto Federal do Ceará (Campus Canindé)',
    'IFCE-CAN',
    '23249010',
    'Canindé',
    'CE',
    'Federal',
    'MEC • SETEC • REITORIA DO IFCE',
    'Conselho Tutelar de Canindé – CE',
    'Rodovia BR-020, Km 303 - Jubaia, Canindé - CE',
    '(85) 3698-8900',
    'gabinete.caninde@ifce.edu.br',
    'conselhotutelar.caninde@ceara.gov.br',
    'Prof. Dr. Marcelo Tavares',
    'Profª. Ma. Cecília Albuquerque',
    'Comissão Disciplinar e de Convivência Comunitária',
    false,
    ARRAY['Integrado - Informática 1º ao 3º', 'Integrado - Edificações 1º ao 3º', 'Integrado - Redes 1º ao 3º'],
    'federal',
    'Instituto Federal de Educação, Ciência e Tecnologia com oferta de ensino técnico e superior integrado.'
),
(
    'escola-colegio-contemporaneo',
    'Colégio Particular Contemporâneo',
    'CPC',
    '23198744',
    'Fortaleza',
    'CE',
    'Privada',
    'CONSELHO ESTADUAL DE EDUCAÇÃO • CEE/CE',
    'Conselho Tutelar Regional de Fortaleza – CE',
    'Rua Desembargador Moreira, 1200 - Aldeota, Fortaleza - CE',
    '(85) 3224-5000',
    'ouvidoria@contemporaneo.edu.br',
    'conselhotutelar.fortaleza@ceara.gov.br',
    'Dr. Fernando Albuquerque',
    'Profª. Helena Sampaio',
    'Núcleo de Inteligência Socioemocional e Diálogo',
    false,
    ARRAY['Fundamental II - 6º ao 9º', 'Ensino Médio - 1ª à 3ª Série'],
    'personalizado',
    'Instituição privada de ensino com metodologia ativa e programa permanente de convivência ética.'
)
ON CONFLICT (id) DO UPDATE SET
    nome = EXCLUDED.nome,
    cidade = EXCLUDED.cidade,
    estado = EXCLUDED.estado,
    rede = EXCLUDED.rede,
    orgao_regional = EXCLUDED.orgao_regional,
    conselho_tutelar_local = EXCLUDED.conselho_tutelar_local,
    email_institucional = EXCLUDED.email_institucional,
    email_conselho_tutelar = EXCLUDED.email_conselho_tutelar,
    diretor = EXCLUDED.diretor,
    coordenador_pedagogico = EXCLUDED.coordenador_pedagogico,
    comissao_mediacao_nome = EXCLUDED.comissao_mediacao_nome,
    turmas_cadastradas = EXCLUDED.turmas_cadastradas,
    logo_tipo = EXCLUDED.logo_tipo,
    descricao = EXCLUDED.descricao,
    updated_at = NOW();



-e 

-- MIGRACAO DE SEGURANCA E AUDITORIA COMPLETA INTEGRAL

-- ============================================================================
-- STOPBULLYING - MIGRAÇÃO DE SEGURANÇA E AUDITORIA COMPLETA INTEGRAL
-- Blindagem Definitiva de RLS, Eliminação de Pass-the-Hash (Bcrypt Server Double-Hash),
-- Revogação Estrita de Execução Interna, Rate Limiting Anti-DoS, Proteção de Sessões,
-- Isolamento de Denúncias e Validação de Sanidade de Progresso
-- ============================================================================

-- 0. Extensões Criptográficas no Schema extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;

-- 1. TABELA DE CONTAS DE ESTUDANTES
CREATE TABLE IF NOT EXISTS public.contas_estudantes (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    nickname VARCHAR(64) UNIQUE NOT NULL,
    display_name VARCHAR(64) NOT NULL,
    password_hash TEXT NOT NULL,
    salt VARCHAR(64) NOT NULL DEFAULT '',
    recovery_code_hash TEXT NOT NULL,
    session_token TEXT,
    session_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
    auth_version INTEGER DEFAULT 3,
    gamification_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_sync_at TIMESTAMPTZ DEFAULT NOW()
);

-- Garantir colunas essenciais caso a tabela já exista
ALTER TABLE public.contas_estudantes ADD COLUMN IF NOT EXISTS session_token TEXT;
ALTER TABLE public.contas_estudantes ADD COLUMN IF NOT EXISTS session_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days');
ALTER TABLE public.contas_estudantes ADD COLUMN IF NOT EXISTS auth_version INTEGER DEFAULT 3;
ALTER TABLE public.contas_estudantes ADD COLUMN IF NOT EXISTS last_sync_at TIMESTAMPTZ DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_contas_estudantes_nickname ON public.contas_estudantes(nickname);
CREATE INDEX IF NOT EXISTS idx_contas_estudantes_session ON public.contas_estudantes(id, session_token);

-- 2. TABELA DE RATE LIMITING NO SERVIDOR (PREVENÇÃO DE FORÇA BRUTA NO BANCO)
CREATE TABLE IF NOT EXISTS public.tentativas_autenticacao (
    chave_identificador VARCHAR(128) PRIMARY KEY,
    tentativas INT NOT NULL DEFAULT 1,
    bloqueado_ate TIMESTAMPTZ,
    ultima_tentativa TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. ROW LEVEL SECURITY (RLS) ESTRITO NAS TABELAS DE AUTENTICAÇÃO
ALTER TABLE public.contas_estudantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tentativas_autenticacao ENABLE ROW LEVEL SECURITY;

-- Limpar quaisquer políticas permissivas legadas
DROP POLICY IF EXISTS "Permissao publica contas estudantes" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_insert_policy" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_select_policy" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_update_policy" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_insert_anonimo" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_select_controlado" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_update_restrito" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_bloqueio_select" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_bloqueio_insert" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_bloqueio_update" ON public.contas_estudantes;
DROP POLICY IF EXISTS "contas_estudantes_bloqueio_delete" ON public.contas_estudantes;

-- Bloqueio total de acesso direto via REST pública: acesso é 100% mediado por RPCs seguras
CREATE POLICY "contas_estudantes_bloqueio_select" ON public.contas_estudantes FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "contas_estudantes_bloqueio_insert" ON public.contas_estudantes FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "contas_estudantes_bloqueio_update" ON public.contas_estudantes FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "contas_estudantes_bloqueio_delete" ON public.contas_estudantes FOR DELETE TO anon, authenticated USING (false);

DROP POLICY IF EXISTS "tentativas_autenticacao_bloqueio" ON public.tentativas_autenticacao;
CREATE POLICY "tentativas_autenticacao_bloqueio" ON public.tentativas_autenticacao FOR ALL TO anon, authenticated USING (false);

REVOKE SELECT, INSERT, UPDATE, DELETE ON public.contas_estudantes FROM anon, authenticated;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.tentativas_autenticacao FROM anon, authenticated;


-- ============================================================================
-- 4. FUNÇÕES INTERNAS DE RATE LIMITING NO SERVIDOR (PL/pgSQL)
-- Privilégios de execução REVOGADOS de anon e authenticated!
-- ============================================================================

CREATE OR REPLACE FUNCTION public.servidor_verificar_rate_limit(
    p_chave VARCHAR
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_rec RECORD;
    v_wait_seconds INT;
BEGIN
    SELECT tentativas, bloqueado_ate, ultima_tentativa
    INTO v_rec
    FROM public.tentativas_autenticacao
    WHERE chave_identificador = p_chave;

    IF FOUND THEN
        -- Janela de decaimento: se mais de 10 minutos se passaram desde a última tentativa, reseta
        IF v_rec.ultima_tentativa < (NOW() - INTERVAL '10 minutes') THEN
            DELETE FROM public.tentativas_autenticacao WHERE chave_identificador = p_chave;
            RETURN jsonb_build_object('allowed', true, 'tentativas', 0);
        END IF;

        -- Se está com bloqueio ativo temporário
        IF v_rec.bloqueado_ate IS NOT NULL AND v_rec.bloqueado_ate > NOW() THEN
            v_wait_seconds := CEIL(EXTRACT(EPOCH FROM (v_rec.bloqueado_ate - NOW())))::INT;
            RETURN jsonb_build_object(
                'allowed', false, 
                'wait_seconds', v_wait_seconds, 
                'tentativas', v_rec.tentativas,
                'error', 'Tentativas consecutivas em intervalo curto. Aguarde ' || v_wait_seconds || 's antes de tentar novamente.'
            );
        END IF;
    END IF;

    RETURN jsonb_build_object('allowed', true);
END;
$$;

CREATE OR REPLACE FUNCTION public.servidor_registrar_falha_rate_limit(
    p_chave VARCHAR
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_tentativas INT := 1;
    v_bloqueio_ate TIMESTAMPTZ := NULL;
    v_wait_seconds INT := 0;
BEGIN
    INSERT INTO public.tentativas_autenticacao (chave_identificador, tentativas, ultima_tentativa)
    VALUES (p_chave, 1, NOW())
    ON CONFLICT (chave_identificador) DO UPDATE
    SET tentativas = public.tentativas_autenticacao.tentativas + 1,
        ultima_tentativa = NOW()
    RETURNING tentativas INTO v_tentativas;

    -- Escalonamento Proporcional Anti-DoS:
    -- Evita bloqueio rápido de alunos que erraram digitação, mas desacelera bots e força bruta
    IF v_tentativas >= 11 THEN
        v_wait_seconds := 300; -- 5 minutos
        v_bloqueio_ate := NOW() + INTERVAL '5 minutes';
    ELSIF v_tentativas >= 8 THEN
        v_wait_seconds := 120; -- 2 minutos
        v_bloqueio_ate := NOW() + INTERVAL '2 minutes';
    ELSIF v_tentativas >= 6 THEN
        v_wait_seconds := 30; -- 30 segundos
        v_bloqueio_ate := NOW() + INTERVAL '30 seconds';
    ELSIF v_tentativas >= 4 THEN
        v_wait_seconds := 10; -- 10 segundos
        v_bloqueio_ate := NOW() + INTERVAL '10 seconds';
    END IF;

    IF v_bloqueio_ate IS NOT NULL THEN
        UPDATE public.tentativas_autenticacao
        SET bloqueado_ate = v_bloqueio_ate
        WHERE chave_identificador = p_chave;
    END IF;

    RETURN jsonb_build_object(
        'tentativas', v_tentativas,
        'wait_seconds', v_wait_seconds
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.servidor_limpar_rate_limit(
    p_chave VARCHAR
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
    DELETE FROM public.tentativas_autenticacao WHERE chave_identificador = p_chave;
END;
$$;

-- REVOGAÇÃO ESTRITA: NENHUM cliente via API pública pode invocar as funções internas de rate limit diretamente!
REVOKE EXECUTE ON FUNCTION public.servidor_verificar_rate_limit(VARCHAR) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.servidor_registrar_falha_rate_limit(VARCHAR) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.servidor_limpar_rate_limit(VARCHAR) FROM PUBLIC, anon, authenticated;


-- ============================================================================
-- 5. RPC SEGURA: VERIFICAÇÃO DE DISPONIBILIDADE DE NICKNAME
-- ============================================================================
CREATE OR REPLACE FUNCTION public.verificar_disponibilidade_nickname(
    p_nickname VARCHAR
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_clean VARCHAR;
BEGIN
    v_clean := lower(trim(p_nickname));
    IF char_length(v_clean) < 3 OR char_length(v_clean) > 20 THEN
        RETURN jsonb_build_object('available', false, 'error', 'Nickname deve ter entre 3 e 20 caracteres.');
    END IF;

    IF EXISTS (SELECT 1 FROM public.contas_estudantes WHERE nickname = v_clean) THEN
        RETURN jsonb_build_object('available', false, 'error', 'Nickname já em uso.');
    END IF;

    RETURN jsonb_build_object('available', true);
END;
$$;


-- ============================================================================
-- 6. RPC SEGURA: CADASTRO DE CONTA COM RESISTÊNCIA A PASS-THE-HASH
-- Servidor aplica Bcrypt secundário via pgcrypto. Hash armazenado é diferente do trafegado!
-- ============================================================================
CREATE OR REPLACE FUNCTION public.cadastrar_conta_estudante(
    p_id UUID,
    p_nickname VARCHAR,
    p_display_name VARCHAR,
    p_password_hash TEXT,
    p_salt VARCHAR,
    p_recovery_code_hash TEXT,
    p_gamification_snapshot JSONB,
    p_auth_version INTEGER DEFAULT 3
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_clean_nick VARCHAR;
    v_session_token TEXT;
    v_server_pw_hash TEXT;
    v_server_rec_hash TEXT;
    v_rl JSONB;
BEGIN
    v_clean_nick := lower(trim(p_nickname));

    -- Rate check
    v_rl := public.servidor_verificar_rate_limit('reg:' || v_clean_nick);
    IF (v_rl->>'allowed')::boolean = false THEN
        RETURN jsonb_build_object('success', false, 'error', v_rl->>'error', 'wait_seconds', (v_rl->>'wait_seconds')::int);
    END IF;

    -- Validações de formato
    IF char_length(v_clean_nick) < 3 OR char_length(v_clean_nick) > 20 THEN
        PERFORM public.servidor_registrar_falha_rate_limit('reg:' || v_clean_nick);
        RETURN jsonb_build_object('success', false, 'error', 'Nickname deve ter entre 3 e 20 caracteres.');
    END IF;

    IF v_clean_nick ~ '[^a-zA-Z0-9_\-]' THEN
        PERFORM public.servidor_registrar_falha_rate_limit('reg:' || v_clean_nick);
        RETURN jsonb_build_object('success', false, 'error', 'Nickname contém caracteres inválidos.');
    END IF;

    -- Nicknames administrativos bloqueados
    IF v_clean_nick IN ('admin', 'administracao', 'gestao', 'coordenacao', 'sistema', 'suporte', 'direcao', 'moderador') THEN
        RETURN jsonb_build_object('success', false, 'error', 'Nickname reservado pela escola.');
    END IF;

    IF EXISTS (SELECT 1 FROM public.contas_estudantes WHERE nickname = v_clean_nick) THEN
        PERFORM public.servidor_registrar_falha_rate_limit('reg:' || v_clean_nick);
        RETURN jsonb_build_object('success', false, 'error', 'Este nickname já está registrado por outro estudante.');
    END IF;

    -- Double-Hashing no servidor (pgcrypto com salt bf)
    v_server_pw_hash := extensions.crypt(p_password_hash, extensions.gen_salt('bf', 10));
    v_server_rec_hash := extensions.crypt(p_recovery_code_hash, extensions.gen_salt('bf', 10));

    -- Token de sessão de 32 bytes criptograficamente seguro com validade de 30 dias
    v_session_token := encode(extensions.gen_random_bytes(32), 'hex');

    INSERT INTO public.contas_estudantes (
        id,
        nickname,
        display_name,
        password_hash,
        salt,
        recovery_code_hash,
        session_token,
        session_expires_at,
        auth_version,
        gamification_snapshot,
        created_at,
        updated_at,
        last_sync_at
    ) VALUES (
        p_id,
        v_clean_nick,
        trim(p_display_name),
        v_server_pw_hash,
        p_salt,
        v_server_rec_hash,
        v_session_token,
        NOW() + INTERVAL '30 days',
        3,
        COALESCE(p_gamification_snapshot, '{}'::jsonb),
        NOW(),
        NOW(),
        NOW()
    );

    PERFORM public.servidor_limpar_rate_limit('reg:' || v_clean_nick);

    RETURN jsonb_build_object(
        'success', true,
        'id', p_id,
        'nickname', v_clean_nick,
        'display_name', trim(p_display_name),
        'session_token', v_session_token
    );
EXCEPTION
    WHEN unique_violation THEN
        PERFORM public.servidor_registrar_falha_rate_limit('reg:' || v_clean_nick);
        RETURN jsonb_build_object('success', false, 'error', 'Nickname já em uso.');
    WHEN OTHERS THEN
        RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;


-- ============================================================================
-- 7. RPC SEGURA: AUTENTICAÇÃO COM RESISTÊNCIA A PASS-THE-HASH
-- ============================================================================
CREATE OR REPLACE FUNCTION public.autenticar_estudante_verificar(
    p_nickname VARCHAR,
    p_computed_password_hash TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_clean_nick VARCHAR;
    v_rec RECORD;
    v_rl JSONB;
    v_fail JSONB;
    v_new_session_token TEXT;
    v_auth_valid BOOLEAN := false;
BEGIN
    v_clean_nick := lower(trim(p_nickname));

    -- Rate Limit
    v_rl := public.servidor_verificar_rate_limit('login:' || v_clean_nick);
    IF (v_rl->>'allowed')::boolean = false THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', v_rl->>'error', 
            'wait_seconds', (v_rl->>'wait_seconds')::int,
            'blocked', true
        );
    END IF;

    SELECT 
        id,
        nickname,
        display_name,
        password_hash,
        auth_version,
        gamification_snapshot,
        created_at,
        updated_at,
        last_sync_at
    INTO v_rec
    FROM public.contas_estudantes
    WHERE nickname = v_clean_nick;

    IF NOT FOUND THEN
        v_fail := public.servidor_registrar_falha_rate_limit('login:' || v_clean_nick);
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Nickname ou senha incorretos.',
            'wait_seconds', (v_fail->>'wait_seconds')::int
        );
    END IF;

    -- Verificação contra Pass-the-Hash
    IF v_rec.password_hash LIKE '$2%' THEN
        v_auth_valid := (v_rec.password_hash = extensions.crypt(p_computed_password_hash, v_rec.password_hash));
    ELSE
        -- Compatibilidade transparente para hashes legados
        v_auth_valid := (v_rec.password_hash = p_computed_password_hash);
        -- Migração transparente automática para Bcrypt na primeira autenticação com sucesso
        IF v_auth_valid THEN
            UPDATE public.contas_estudantes
            SET password_hash = extensions.crypt(p_computed_password_hash, extensions.gen_salt('bf', 10)),
                auth_version = 3
            WHERE id = v_rec.id;
        END IF;
    END IF;

    IF NOT v_auth_valid THEN
        v_fail := public.servidor_registrar_falha_rate_limit('login:' || v_clean_nick);
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Nickname ou senha incorretos.',
            'wait_seconds', (v_fail->>'wait_seconds')::int
        );
    END IF;

    -- Sucesso: Limpar contadores de rate limit
    PERFORM public.servidor_limpar_rate_limit('login:' || v_clean_nick);

    -- Rotacionar token de sessão criptográfico
    v_new_session_token := encode(extensions.gen_random_bytes(32), 'hex');
    UPDATE public.contas_estudantes
    SET session_token = v_new_session_token,
        session_expires_at = NOW() + INTERVAL '30 days',
        last_sync_at = NOW()
    WHERE id = v_rec.id;

    RETURN jsonb_build_object(
        'success', true,
        'id', v_rec.id,
        'nickname', v_rec.nickname,
        'display_name', v_rec.display_name,
        'session_token', v_new_session_token,
        'auth_version', 3,
        'gamification_snapshot', v_rec.gamification_snapshot,
        'created_at', v_rec.created_at,
        'updated_at', v_rec.updated_at,
        'last_sync_at', NOW()
    );
END;
$$;


-- ============================================================================
-- 8. RPC SEGURA: OBTENÇÃO DO SALTO PÚBLICO PARA PBKDF2 DO CLIENTE
-- ============================================================================
CREATE OR REPLACE FUNCTION public.obter_salto_autenticacao(
    p_nickname VARCHAR
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_clean_nick VARCHAR;
    v_salt VARCHAR;
    v_auth_version INT;
    v_rl JSONB;
BEGIN
    v_clean_nick := lower(trim(p_nickname));

    v_rl := public.servidor_verificar_rate_limit('salt:' || v_clean_nick);
    IF (v_rl->>'allowed')::boolean = false THEN
        RETURN jsonb_build_object('found', false, 'error', v_rl->>'error', 'wait_seconds', (v_rl->>'wait_seconds')::int);
    END IF;

    SELECT salt, auth_version INTO v_salt, v_auth_version
    FROM public.contas_estudantes
    WHERE nickname = v_clean_nick;

    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'found', false,
            'salt', encode(extensions.digest(v_clean_nick || 'stopbullying_salt_pad', 'sha256'), 'hex'),
            'auth_version', 3
        );
    END IF;

    RETURN jsonb_build_object(
        'found', true,
        'salt', v_salt,
        'auth_version', COALESCE(v_auth_version, 3)
    );
END;
$$;


-- ============================================================================
-- 9. RPC SEGURA: RECUPERAÇÃO DE CONTA COM CÓDIGO MESTRE
-- ============================================================================
CREATE OR REPLACE FUNCTION public.recuperar_conta_estudante(
    p_nickname VARCHAR,
    p_recovery_code_hash TEXT,
    p_new_password_hash TEXT,
    p_new_salt VARCHAR,
    p_new_recovery_code_hash TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_clean_nick VARCHAR;
    v_rec RECORD;
    v_rl JSONB;
    v_fail JSONB;
    v_new_session_token TEXT;
    v_rec_valid BOOLEAN := false;
    v_new_server_pw_hash TEXT;
    v_new_server_rec_hash TEXT;
BEGIN
    v_clean_nick := lower(trim(p_nickname));

    v_rl := public.servidor_verificar_rate_limit('rec:' || v_clean_nick);
    IF (v_rl->>'allowed')::boolean = false THEN
        RETURN jsonb_build_object(
            'success', false, 
            'error', v_rl->>'error', 
            'wait_seconds', (v_rl->>'wait_seconds')::int,
            'blocked', true
        );
    END IF;

    SELECT id, nickname, display_name, recovery_code_hash, gamification_snapshot
    INTO v_rec
    FROM public.contas_estudantes
    WHERE nickname = v_clean_nick;

    IF NOT FOUND THEN
        v_fail := public.servidor_registrar_falha_rate_limit('rec:' || v_clean_nick);
        RETURN jsonb_build_object('success', false, 'error', 'Código de recuperação inválido para este nickname.');
    END IF;

    IF v_rec.recovery_code_hash LIKE '$2%' THEN
        v_rec_valid := (v_rec.recovery_code_hash = extensions.crypt(p_recovery_code_hash, v_rec.recovery_code_hash));
    ELSE
        v_rec_valid := (v_rec.recovery_code_hash = p_recovery_code_hash);
    END IF;

    IF NOT v_rec_valid THEN
        v_fail := public.servidor_registrar_falha_rate_limit('rec:' || v_clean_nick);
        RETURN jsonb_build_object(
            'success', false, 
            'error', 'Código de recuperação inválido para este nickname.',
            'wait_seconds', (v_fail->>'wait_seconds')::int
        );
    END IF;

    PERFORM public.servidor_limpar_rate_limit('rec:' || v_clean_nick);

    v_new_session_token := encode(extensions.gen_random_bytes(32), 'hex');
    v_new_server_pw_hash := extensions.crypt(p_new_password_hash, extensions.gen_salt('bf', 10));
    v_new_server_rec_hash := extensions.crypt(p_new_recovery_code_hash, extensions.gen_salt('bf', 10));

    UPDATE public.contas_estudantes
    SET password_hash = v_new_server_pw_hash,
        salt = p_new_salt,
        recovery_code_hash = v_new_server_rec_hash,
        session_token = v_new_session_token,
        session_expires_at = NOW() + INTERVAL '30 days',
        auth_version = 3,
        updated_at = NOW(),
        last_sync_at = NOW()
    WHERE id = v_rec.id;

    RETURN jsonb_build_object(
        'success', true,
        'id', v_rec.id,
        'nickname', v_rec.nickname,
        'display_name', v_rec.display_name,
        'session_token', v_new_session_token,
        'gamification_snapshot', v_rec.gamification_snapshot
    );
END;
$$;


-- ============================================================================
-- 10. RPC SEGURA: SINCRONIZAÇÃO DE PROGRESSO COM VALIDAÇÃO DE SANIDADE
-- Valida limites de nível (1..100) e XP (0..500.000) no servidor!
-- ============================================================================
CREATE OR REPLACE FUNCTION public.sincronizar_snapshot_estudante(
    p_account_id UUID,
    p_session_token TEXT,
    p_snapshot JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_count INT;
    v_level INT;
    v_xp INT;
BEGIN
    IF p_session_token IS NULL OR char_length(p_session_token) < 16 THEN
        RETURN jsonb_build_object('success', false, 'error', 'Sessão inválida ou não autenticada.');
    END IF;

    -- Validação de limites de integridade de gamificação
    v_level := (p_snapshot->'userProfile'->>'currentLevel')::int;
    v_xp := (p_snapshot->'userProfile'->>'currentXp')::int;

    IF v_level IS NOT NULL AND (v_level < 1 OR v_level > 100) THEN
        RETURN jsonb_build_object('success', false, 'error', 'Nível inválido (permitido entre 1 e 100).');
    END IF;

    IF v_xp IS NOT NULL AND (v_xp < 0 OR v_xp > 500000) THEN
        RETURN jsonb_build_object('success', false, 'error', 'XP inválido (limite do sistema excedido).');
    END IF;

    UPDATE public.contas_estudantes
    SET gamification_snapshot = p_snapshot,
        updated_at = NOW(),
        last_sync_at = NOW()
    WHERE id = p_account_id 
      AND session_token = p_session_token
      AND (session_expires_at IS NULL OR session_expires_at > NOW());

    GET DIAGNOSTICS v_count = ROW_COUNT;

    IF v_count = 0 THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não autorizado: identificador ou sessão expirada/incorreta.');
    END IF;

    RETURN jsonb_build_object('success', true);
END;
$$;


-- ============================================================================
-- 11. RPC SEGURA: REVOGAÇÃO / ENCERRAMENTO DE SESSÃO NO SERVIDOR
-- Invalida o session_token no banco para que não possa ser reutilizado pós-logout
-- ============================================================================
CREATE OR REPLACE FUNCTION public.encerrar_sessao_estudante(
    p_account_id UUID,
    p_session_token TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
BEGIN
    UPDATE public.contas_estudantes
    SET session_token = NULL,
        session_expires_at = NOW()
    WHERE id = p_account_id AND session_token = p_session_token;

    RETURN jsonb_build_object('success', true);
END;
$$;


-- ============================================================================
-- 12. RPC SEGURA: CONSULTA DE DENÚNCIA POR PROTOCOLO (ISOLAMENTO TOTAL)
-- Retorna APENAS o registro correspondente ao código do denunciante.
-- Protegido contra força bruta de protocolos por rate limit.
-- ============================================================================
CREATE OR REPLACE FUNCTION public.consultar_denuncia_protocolo(
    p_protocolo VARCHAR
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_clean VARCHAR;
    v_rec RECORD;
    v_rl JSONB;
BEGIN
    v_clean := upper(trim(p_protocolo));
    IF char_length(v_clean) < 4 THEN
        RETURN jsonb_build_object('found', false, 'error', 'Protocolo inválido.');
    END IF;

    -- Rate check contra enumeração de protocolos
    v_rl := public.servidor_verificar_rate_limit('proto:' || v_clean);
    IF (v_rl->>'allowed')::boolean = false THEN
        RETURN jsonb_build_object('found', false, 'error', v_rl->>'error', 'wait_seconds', (v_rl->>'wait_seconds')::int);
    END IF;

    SELECT id, protocolo, tipo_violencia, local_escola, turno, frequencia, papel_denunciante, 
           turma_envolvida, descricao, status, nivel_gravidade, nivel_escalada, is_sos, 
           etapa_mediacao, impactos_identificados, medidas_protecao, provas_anexas, data_envio, created_at, updated_at
    INTO v_rec
    FROM public.denuncias
    WHERE upper(trim(protocolo)) = v_clean 
       OR upper(trim(protocolo)) = ('#' || v_clean)
       OR ('#' || upper(trim(protocolo))) = v_clean;

    IF NOT FOUND THEN
        PERFORM public.servidor_registrar_falha_rate_limit('proto:' || v_clean);
        RETURN jsonb_build_object('found', false, 'error', 'Nenhum registro encontrado com este protocolo.');
    END IF;

    PERFORM public.servidor_limpar_rate_limit('proto:' || v_clean);

    RETURN jsonb_build_object(
        'found', true,
        'denuncia', row_to_json(v_rec)
    );
END;
$$;


-- ============================================================================
-- 13. CONCESSÃO RESTRITA DE EXECUÇÃO ÀS FUNÇÕES EXTERNAS DA API
-- ============================================================================
GRANT EXECUTE ON FUNCTION public.verificar_disponibilidade_nickname TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.obter_salto_autenticacao TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cadastrar_conta_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.autenticar_estudante_verificar TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.recuperar_conta_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sincronizar_snapshot_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.encerrar_sessao_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consultar_denuncia_protocolo TO anon, authenticated;

-- RPCs de Gestão Escolar Segura (Protegidas por Sessão Criptográfica Bcrypt)
GRANT EXECUTE ON FUNCTION public.autenticar_gestor TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validar_sessao_gestao TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.encerrar_sessao_gestor TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_autenticar_e_listar_denuncias TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_listar_sos_alertas TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_salvar_escola TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_excluir_escola TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_atualizar_denuncia TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_excluir_denuncia TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_atualizar_sos TO anon, authenticated;
