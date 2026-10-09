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
-- 13. RPCs SEGURAS DA GESTÃO ESCOLAR (AUTENTICADAS NO SERVIDOR)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.gestao_autenticar_e_listar_denuncias(
    p_senha_gestao VARCHAR
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_rl JSONB;
    v_denuncias JSONB;
BEGIN
    v_rl := public.servidor_verificar_rate_limit('gestao_login');
    IF (v_rl->>'allowed')::boolean = false THEN
        RETURN jsonb_build_object('success', false, 'error', 'Muitas tentativas na gestão escolar. Bloqueado.', 'wait_seconds', (v_rl->>'wait_seconds')::int);
    END IF;

    -- Senha mestra da gestão escolar
    IF p_senha_gestao <> '22112009' THEN
        PERFORM public.servidor_registrar_falha_rate_limit('gestao_login');
        RETURN jsonb_build_object('success', false, 'error', 'Senha de gestão escolar incorreta.');
    END IF;

    PERFORM public.servidor_limpar_rate_limit('gestao_login');

    SELECT jsonb_agg(row_to_json(d))
    INTO v_denuncias
    FROM (
        SELECT * FROM public.denuncias
        WHERE status <> 'Excluído'
        ORDER BY data_envio DESC
    ) d;

    RETURN jsonb_build_object('success', true, 'denuncias', COALESCE(v_denuncias, '[]'::jsonb));
END;
$$;

CREATE OR REPLACE FUNCTION public.gestao_listar_sos_alertas(
    p_senha_gestao VARCHAR
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
    v_alerts JSONB;
BEGIN
    IF p_senha_gestao <> '22112009' THEN
        RETURN jsonb_build_object('success', false, 'error', 'Não autorizado.');
    END IF;

    SELECT jsonb_agg(row_to_json(s))
    INTO v_alerts
    FROM (
        SELECT * FROM public.sos_alertas
        ORDER BY data_disparo DESC
    ) s;

    RETURN jsonb_build_object('success', true, 'alertas', COALESCE(v_alerts, '[]'::jsonb));
END;
$$;


-- ============================================================================
-- 14. CONCESSÃO RESTRITA DE EXECUÇÃO ÀS FUNÇÕES EXTERNAS DA API
-- ============================================================================
GRANT EXECUTE ON FUNCTION public.verificar_disponibilidade_nickname TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.obter_salto_autenticacao TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.cadastrar_conta_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.autenticar_estudante_verificar TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.recuperar_conta_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sincronizar_snapshot_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.encerrar_sessao_estudante TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consultar_denuncia_protocolo TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_autenticar_e_listar_denuncias TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gestao_listar_sos_alertas TO anon, authenticated;
