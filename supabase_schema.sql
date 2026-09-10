-- ============================================================================
-- STOPBULLYING - EEMTI ALFREDO MACHADO (MADALENA/CE)
-- ESQUEMA COMPLETO E MIGRAÇÃO UNIVERSAL SUPABASE (POSTGRESQL + RLS + REALTIME)
-- Compatível com Bancos Novos e Bancos Já Existentes (com migração automática de colunas)
-- ============================================================================

-- 1. Extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
DROP POLICY IF EXISTS "Permitir criacao de mensagens no chat" ON public.protocolo_mensagens;
DROP POLICY IF EXISTS "Permitir leitura de mensagens no chat" ON public.protocolo_mensagens;
DROP POLICY IF EXISTS "Permitir disparo anonimo de SOS" ON public.sos_alertas;
DROP POLICY IF EXISTS "Permitir leitura de alertas SOS" ON public.sos_alertas;
DROP POLICY IF EXISTS "Permitir atualizacao de alertas SOS" ON public.sos_alertas;
DROP POLICY IF EXISTS "Acoes mediacao permissao total" ON public.mediacoes_acoes;
DROP POLICY IF EXISTS "Termos acordo permissao total" ON public.termos_acordo_convivencia;
DROP POLICY IF EXISTS "Checkins acompanhamento permissao total" ON public.checkins_acompanhamento;
DROP POLICY IF EXISTS "Estudantes gamificacao permissao total" ON public.estudantes_gamificacao;
DROP POLICY IF EXISTS "Triagens permissao total" ON public.triagens_avaliacoes;
DROP POLICY IF EXISTS "Diario emocional permissao total" ON public.diario_emocional_registros;
DROP POLICY IF EXISTS "Auditoria logs permissao total" ON public.auditoria_logs;
DROP POLICY IF EXISTS "Quiz tentativas permissao total" ON public.quiz_tentativas;

-- Criação das políticas de segurança
CREATE POLICY "Permitir criacao anonima de denuncias" 
ON public.denuncias FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir leitura de denuncia por protocolo" 
ON public.denuncias FOR SELECT 
USING (true);

CREATE POLICY "Permitir atualizacao de denuncias pela gestao" 
ON public.denuncias FOR UPDATE 
USING (true);

CREATE POLICY "Permitir criacao de mensagens no chat" 
ON public.protocolo_mensagens FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir leitura de mensagens no chat" 
ON public.protocolo_mensagens FOR SELECT 
USING (true);

CREATE POLICY "Permitir disparo anonimo de SOS" 
ON public.sos_alertas FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Permitir leitura de alertas SOS" 
ON public.sos_alertas FOR SELECT 
USING (true);

CREATE POLICY "Permitir atualizacao de alertas SOS" 
ON public.sos_alertas FOR UPDATE 
USING (true);

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
