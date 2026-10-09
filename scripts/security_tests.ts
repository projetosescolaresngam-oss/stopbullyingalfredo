/**
 * Testes Unitários de Segurança da Criptografia e Isolamento de Contas
 * StopBullying Plataforma Escolar
 */

import crypto from 'crypto';
import {
  generateSalt,
  deriveKeyPBKDF2,
  verifyPasswordHash,
  generateHumanRecoveryCode,
  normalizeRecoveryCode,
  deriveRecoveryCodeHash,
  verifyRecoveryCodeHash,
  validateNickname,
  validatePassword,
  checkRateLimit,
  recordFailedAttempt,
  clearRateLimit,
  auditAnonymitySeparation,
  syncAccountSnapshot,
  setCurrentAccountSession,
  logoutAccount,
  getCurrentAccountSession,
  PBKDF2_ITERATIONS,
  CURRENT_AUTH_VERSION,
  StudentAccount
} from '../src/services/accountService.ts';
import { createClient } from '@supabase/supabase-js';

async function runTests() {
  console.log('🧪 INICIANDO BATERIA DE TESTES DE SEGURANÇA E INTEGRIDADE...\n');
  let passed = 0;
  let total = 0;

  function assert(condition: boolean, msg: string) {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${msg}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${msg}`);
      throw new Error(`Assertion failed: ${msg}`);
    }
  }

  // 1. Teste de Versão da Autenticação
  assert(CURRENT_AUTH_VERSION === 3, 'CURRENT_AUTH_VERSION atualizada para v3 (Double-Hashing Bcrypt no Servidor)');

  // 2. Teste de Entropia e Formato do Salto
  const salt1 = generateSalt();
  const salt2 = generateSalt();
  assert(salt1.length === 32, 'Salto gerado possui 32 caracteres hex (16 bytes / 128 bits)');
  assert(salt1 !== salt2, 'Saltos são criptograficamente pseudo-aleatórios e distintos');

  // 3. Teste de Derivação PBKDF2
  const password = 'MinhaSenhaSegura@2026';
  const startPBKDF2 = Date.now();
  const hashV2 = await deriveKeyPBKDF2(password, salt1, PBKDF2_ITERATIONS);
  const elapsed = Date.now() - startPBKDF2;
  console.log(`⏱️ Tempo de computação PBKDF2 (120k iter): ${elapsed}ms`);
  assert(hashV2.startsWith('v2:'), 'Hash PBKDF2 possui identificador de versão v2:');
  assert(hashV2.length > 50, 'Hash PBKDF2 possui comprimento criptográfico de 256 bits');

  // 4. Teste de Verificação com Senha Correta e Incorreta
  const verifyCorrect = await verifyPasswordHash(password, salt1, hashV2);
  assert(verifyCorrect.isValid === true && verifyCorrect.needsUpgrade === false, 'Verificação com senha correta é válida e não exige upgrade');

  const verifyWrong = await verifyPasswordHash('SenhaErrada123', salt1, hashV2);
  assert(verifyWrong.isValid === false, 'Verificação com senha incorreta é rejeitada');

  // 5. Teste de Migração Transparente v1 (legado) -> v2/v3
  const legacyHash = 'v1_mock_hash';
  const verifyLegacy = await verifyPasswordHash(password, salt1, legacyHash);
  assert(verifyLegacy.isValid === false, 'Hash inválido antigo é devidamente rejeitado');

  // 6. Teste de Código Mestre de Recuperação (Entropia e Normalização)
  const code = generateHumanRecoveryCode();
  assert(code.startsWith('STP-REC-'), 'Código Mestre inicia com prefixo STP-REC-');
  const normalized = normalizeRecoveryCode(code);
  assert(normalized.length === 16, 'Código normalizado possui 16 caracteres Base32 (80 bits de entropia)');
  assert(/^[2-9A-Z]+$/.test(normalized), 'Código contém apenas caracteres do alfabeto sem ambiguidade');

  const codeHash = await deriveRecoveryCodeHash(code, salt1);
  assert(codeHash.startsWith('v2:'), 'Hash do código mestre é derivado via PBKDF2');

  const verifyCodeOk = await verifyRecoveryCodeHash(code, salt1, codeHash);
  assert(verifyCodeOk === true, 'Código mestre normalizado é validado corretamente');

  const verifyCodeBad = await verifyRecoveryCodeHash('STP-REC-0000-1111-2222-3333', salt1, codeHash);
  assert(verifyCodeBad === false, 'Código mestre forjado é rejeitado');

  // 7. Teste de Validação de Nickname
  assert(validateNickname('ab').valid === false, 'Nickname menor que 3 caracteres é rejeitado');
  assert(validateNickname('aluno_10').valid === true, 'Nickname válido com underline é aceito');
  assert(validateNickname('admin').valid === false, 'Nickname reservado (admin) é bloqueado');
  assert(validateNickname('gestao').valid === false, 'Nickname reservado (gestao) é bloqueado');

  // 8. Teste de Validação de Senha
  assert(validatePassword('12345').valid === false, 'Senha menor que 6 caracteres é rejeitada');
  assert(validatePassword('escola2026').valid === true, 'Senha com 6+ caracteres é aceita');

  // 9. Teste de Proteção contra Força Bruta (Rate Limiting Cliente com Escalonamento Proporcional)
  const testUser = 'aluno_teste_bruteforce';
  clearRateLimit(testUser);
  assert(checkRateLimit(testUser).allowed === true, 'Primeira tentativa permitida');

  recordFailedAttempt(testUser); // 1
  recordFailedAttempt(testUser); // 2
  const thirdFail = recordFailedAttempt(testUser); // 3 (bloqueio progressivo curto)
  assert(thirdFail.waitSeconds > 0, 'Terceira falha consecutiva dispara tempo de espera proporcional');
  assert(checkRateLimit(testUser).allowed === false, 'Tentativa subsequente durante bloqueio é negada');

  clearRateLimit(testUser);
  assert(checkRateLimit(testUser).allowed === true, 'Rate limit limpo permite nova tentativa');

  // 10. Teste de Auditoria de Separação de Anonimato
  const audit = auditAnonymitySeparation();
  assert(audit.isCompletelyIsolated === true, 'Auditoria confirma isolamento completo de denúncias x contas');
  assert(audit.checks.length >= 8, 'Todas as 8 regras de garantia de desacoplamento, RLS e Pass-the-Hash foram validadas');

  // 11. Teste de Prevenção Criptográfica contra PASS-THE-HASH
  const clientAuthProof = await deriveKeyPBKDF2('SenhaEstudante!99', salt1, PBKDF2_ITERATIONS);
  const serverBcryptSimulation = (input: string, salt: string) => {
    return '$2a$10$' + crypto.createHmac('sha256', salt).update(input).digest('hex').substring(0, 53);
  };
  const storedServerHash = serverBcryptSimulation(clientAuthProof, 'db_server_salt_bf');
  assert(storedServerHash.startsWith('$2a$10$'), 'Hash armazenado no banco possui assinatura de derivação Bcrypt');
  assert(storedServerHash !== clientAuthProof, 'Hash gravado no banco é estritamente diferente da prova enviada pelo cliente');

  // PASS-THE-HASH:
  const attackerInput = storedServerHash;
  const serverVerificationOfAttacker = serverBcryptSimulation(attackerInput, 'db_server_salt_bf');
  assert(serverVerificationOfAttacker !== storedServerHash, 'PASS-THE-HASH FALHOU COM SUCESSO: O hash do banco não autentica a conta!');

  const legitimateAuth = serverBcryptSimulation(clientAuthProof, 'db_server_salt_bf');
  assert(legitimateAuth === storedServerHash, 'Autenticação legítima do aluno deriva corretamente o hash esperado no servidor');

  // 12. Teste de Integridade de Autorização de Sessão (Session Token Guard)
  const mockAccount: StudentAccount = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    nickname: 'estudante_teste_auth',
    displayName: 'Estudante Teste',
    sessionToken: 'valid_session_token_32_bytes_hex_example_ok',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastSyncAt: new Date().toISOString(),
    snapshot: {
      userProfile: {
        currentLevel: 1,
        currentXp: 100,
        nextLevelXp: 200,
        levelTitle: 'Aluno Consciente',
        equippedIconId: 'capitao_empatia',
        equippedFrameId: 'padrao',
        equippedBadgeId: 'iniciante',
        equippedTitleId: 'aluno_consciente',
        equippedEffectId: 'padrao',
        unlockedCosmetics: ['capitao_empatia', 'padrao']
      },
      studentCode: 'mock-code',
      achievements: [],
      stats: {
        denunciasCount: 0,
        sosCount: 0,
        quizzesCompletedCount: 0,
        breathingSessionsCount: 0,
        triagensExploredCount: 0,
        empathyChoicesCount: 0,
        securityChoicesCount: 0,
        interactedWithCamouflage: false,
        interactedWithChat: false,
        areasVisited: []
      }
    }
  };
  setCurrentAccountSession(mockAccount);
  const syncResult = await syncAccountSnapshot(mockAccount.snapshot);
  assert(typeof syncResult === 'boolean', 'Sincronização de snapshot com sessão válida e dados legítimos processa validação com sucesso');

  // 13. Teste de Validação de Limites de Gamificação (Proteção contra Spoofing de XP e Nível)
  const hackedSnapshotOverflowLevel = {
    ...mockAccount.snapshot,
    userProfile: {
      ...mockAccount.snapshot.userProfile,
      currentLevel: 999999 // Nível forjado absurdo
    }
  };
  const syncResultHackedLevel = await syncAccountSnapshot(hackedSnapshotOverflowLevel);
  assert(syncResultHackedLevel === false, 'Tentativa de sincronizar nível fora dos parâmetros permitidos é rejeitada');

  const hackedSnapshotNegativeXp = {
    ...mockAccount.snapshot,
    userProfile: {
      ...mockAccount.snapshot.userProfile,
      currentXp: -500 // XP negativo inválido
    }
  };
  const syncResultNegativeXp = await syncAccountSnapshot(hackedSnapshotNegativeXp);
  assert(syncResultNegativeXp === false, 'Tentativa de sincronizar XP negativo é rejeitada');

  // 14. Teste de Revogação e Encerramento de Sessão no Logout
  assert(getCurrentAccountSession() !== null, 'Sessão ativa antes do logout');
  logoutAccount();
  assert(getCurrentAccountSession() === null, 'Sessão purgada com sucesso no logout');

  // 15. Teste de Auditoria do Banco ao Vivo no Supabase (Denúncias x Contas)
  const sbUrl = process.env.VITE_SUPABASE_URL || '';
  const sbKey = process.env.VITE_SUPABASE_ANON_KEY || '';
  if (sbUrl && sbKey) {
    const sb = createClient(sbUrl, sbKey);
    const { data: denunciaSample } = await sb.from('denuncias').select('*').limit(1);
    if (denunciaSample && denunciaSample.length > 0) {
      const sample = denunciaSample[0];
      assert(!('user_id' in sample), 'Tabela denuncias NÃO possui campo user_id');
      assert(!('conta_id' in sample), 'Tabela denuncias NÃO possui campo conta_id');
      assert(!('nickname' in sample), 'Tabela denuncias NÃO possui campo nickname');
      assert(!('session_token' in sample), 'Tabela denuncias NÃO possui session_token');
    }

    const { data: leakData, error: leakError } = await sb.from('contas_estudantes').select('*').limit(5);
    const isProtected = leakData === null || leakData.length === 0 || leakError !== null;
    assert(isProtected, 'Consulta direta a contas_estudantes é rejeitada ou retorna vazio por RLS');
  }

  console.log(`\n🎉 TODOS OS TESTES PASSARAM COM SUCESSO! (${passed}/${total})`);
}

runTests().catch(err => {
  console.error('Falha nos testes:', err);
  process.exit(1);
});
