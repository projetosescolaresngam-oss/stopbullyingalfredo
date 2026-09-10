import React, { useState } from 'react';
import { Denuncia } from '../../types';
import { playBreathTone } from '../../services/audioSynthesizer';
import { 
  Printer, 
  X, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Download, 
  Check, 
  Copy,
  Scale,
  Award,
  Users
} from 'lucide-react';

interface DocumentoOficialModalProps {
  denuncia: Denuncia;
  onClose: () => void;
  tipoInicial?: 'conselho_tutelar' | 'conselho_escolar';
}

export const DocumentoOficialModal: React.FC<DocumentoOficialModalProps> = ({
  denuncia,
  onClose,
  tipoInicial = 'conselho_tutelar'
}) => {
  const [docType, setDocType] = useState<'conselho_tutelar' | 'conselho_escolar'>(tipoInicial);
  const [copied, setCopied] = useState(false);

  // Formatação de Datas
  const dateObj = denuncia.data_envio ? new Date(denuncia.data_envio) : new Date();
  const formattedDate = isNaN(dateObj.getTime()) 
    ? new Date().toLocaleDateString('pt-BR') + ' – ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    : dateObj.toLocaleDateString('pt-BR') + ' – ' + dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
  const currentDateFullStr = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const playSfx = () => {
    try { playBreathTone(750, 25, true); } catch {}
  };

  const handlePrint = () => {
    playSfx();
    window.print();
  };

  const handleCopyText = () => {
    playSfx();
    const element = document.getElementById('printable-official-doc');
    if (element) {
      navigator.clipboard?.writeText(element.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const acoesList = denuncia.historico_acoes || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      
      {/* Container Principal */}
      <div className="w-full max-w-4xl rounded-3xl bg-[#0f1424] border border-purple-500/40 shadow-2xl flex flex-col max-h-[96vh] overflow-hidden text-gray-100">
        
        {/* BARRA SUPERIOR DE CONTROLE (NÃO IMPRESSA) */}
        <div className="p-4 sm:p-5 bg-[#141a2e] border-b border-white/10 flex flex-wrap items-center justify-between gap-3 print:hidden">
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/30 border border-purple-400 text-purple-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-base sm:text-lg text-white">
                Documento Oficial de Encaminhamento &amp; Mediação
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                Protocolo: {denuncia.protocolo}
              </p>
            </div>
          </div>

          {/* SELETOR DE MODELO DE DOCUMENTO */}
          <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => { playSfx(); setDocType('conselho_tutelar'); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                docType === 'conselho_tutelar'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Conselho Tutelar</span>
            </button>

            <button
              type="button"
              onClick={() => { playSfx(); setDocType('conselho_escolar'); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                docType === 'conselho_escolar'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Conselho Escolar / SEDUC</span>
            </button>
          </div>

          {/* AÇÕES DE IMPRESSÃO / COPIAR / FECHAR */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer transition-all hover:scale-105"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* ÁREA DO DOCUMENTO IMPRESSO (FOLHA DE PAPEL OFICIAL A4) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-slate-900 print:p-0 print:bg-white print:overflow-visible">
          
          <div 
            id="printable-official-doc"
            className="w-full max-w-[800px] mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl border border-slate-300 space-y-5 print:shadow-none print:border-none print:p-0 print:rounded-none print:text-black font-sans text-xs leading-relaxed"
          >

            {/* MODELO 1: CONSELHO TUTELAR (OFÍCIO & RELATÓRIO DE ENCAMINHAMENTO - AZUL) */}
            {docType === 'conselho_tutelar' && (
              <div className="space-y-4">
                
                {/* CABEÇALHO DA INSTITUIÇÃO */}
                <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
                  <div className="flex items-center justify-between px-2">
                    <div className="w-12 h-12 rounded-full bg-blue-900 text-white font-black flex items-center justify-center text-[10px] text-center p-1 border border-blue-950">
                      CONSELHO TUTELAR
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="font-bold text-[10px] uppercase tracking-wider text-slate-700">
                        ESTADO DO CEARÁ • MUNICÍPIO DE MADALENA – CE
                      </p>
                      <p className="font-extrabold text-[11px] text-slate-900 uppercase">
                        SISTEMA DE GARANTIA DE DIREITOS DA CRIANÇA E DO ADOLESCENTE
                      </p>
                      <h1 className="font-black text-sm sm:text-base text-blue-950 uppercase tracking-tight">
                        CONSELHO TUTELAR
                      </h1>
                      <h2 className="font-extrabold text-xs text-blue-900 uppercase">
                        OFÍCIO E RELATÓRIO DE ENCAMINHAMENTO INSTITUCIONAL
                      </h2>
                      <p className="text-[10px] font-bold text-slate-600">
                        PROTEÇÃO INTEGRAL • LEI FEDERAL Nº 8.069/90 (ECA)
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-blue-900 font-bold flex items-center justify-center text-[10px] text-center p-1 border border-slate-300">
                      CEARÁ
                    </div>
                  </div>

                  {/* FAIXA COM DADOS DE PROTOCOLO E STATUS */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-100 p-2 rounded-lg border border-slate-300 text-[10px] text-left mt-2">
                    <div>
                      <span className="font-bold text-slate-700 block">📋 OFÍCIO / EXPEDIENTE:</span>
                      <strong className="font-mono text-blue-950 text-xs">OF-CT-2026/DSEC-{denuncia.protocolo}</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">📅 DATA EXPEDIÇÃO:</span>
                      <span className="font-mono text-slate-900">{formattedDate}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">ENCAMINHAMENTO:</span>
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-900 text-white font-bold text-[9px] uppercase">
                        [ OFICIALIZADO ] (REDE DE PROTEÇÃO ATIVA)
                      </span>
                    </div>
                  </div>
                </div>

                {/* BLOCO 01: IDENTIFICAÇÃO DO ENCAMINHAMENTO */}
                <div className="space-y-1">
                  <div className="bg-blue-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider flex items-center justify-between">
                    <span>01 IDENTIFICAÇÃO DO ENCAMINHAMENTO</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-b border border-slate-300 text-[11px]">
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">👥 Natureza dos Fatos</span>
                      <strong className="text-slate-900">{denuncia.tipo_violencia || 'Cyberbullying'}</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">📍 Local dos Fatos</span>
                      <span className="text-slate-900">{denuncia.local_escola}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">🕒 Turno Escolar</span>
                      <span className="text-slate-900">{denuncia.turno || 'Manhã'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">📅 Data Ocorrência</span>
                      <span className="text-slate-900 font-mono">{formattedDate.split('–')[0]}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">📈 Reincidência</span>
                      <span className="text-slate-900">{denuncia.frequencia || 'Poucas vezes'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">⚠️ Grau de Urgência</span>
                      <strong className="text-rose-700">{denuncia.nivel_gravidade || 'Média'} (Prioritária)</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">📄 Assunto</span>
                      <span className="text-slate-900">Notificação Formal de Violação de Direitos (ECA)</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">🎓 Ano / Exercício</span>
                      <span className="text-slate-900">2º Semestre / 2026</span>
                    </div>
                  </div>
                </div>

                {/* BLOCO 02: QUALIFICAÇÃO E SIGILO */}
                <div className="space-y-1">
                  <div className="bg-blue-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    02 QUALIFICAÇÃO E SIGILO
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-b border border-slate-300 space-y-1 text-[11px]">
                    <p>
                      <strong>👤 ESTUDANTE / NOTICIANTE:</strong> Identidade protegida sob sigilo legal conforme ECA Art. 100 (Condição: {denuncia.papel_denunciante || 'Vítima Direta'})
                    </p>
                    <p>
                      <strong>👤 INSTITUIÇÃO REMETENTE:</strong> E.E.M.T.I. Alfredo Machado (Comissão de Mediação &amp; Acolhimento Escolar)
                    </p>
                    <p>
                      <strong>👤 ENVOLVIDOS / TESTEMUNHAS:</strong> Turma informada: {denuncia.turma_envolvida || 'Não informada (Sigilo Preservado)'}
                    </p>
                  </div>
                </div>

                {/* BLOCO 03: DESCRIÇÃO DOS FATOS APURADOS */}
                <div className="space-y-1">
                  <div className="bg-blue-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    03 DESCRIÇÃO DOS FATOS APURADOS
                  </div>
                  <div className="bg-slate-50 p-3 rounded-b border border-slate-300 text-[11px] text-slate-900 leading-relaxed italic">
                    "{denuncia.descricao || 'Notificação formal encaminhada ao Conselho Tutelar contendo relatório dos fatos apurados em ambiente escolar, demandando acompanhamento da rede de proteção integral conforme Lei nº 8.069/90 (ECA).'}"
                  </div>
                </div>

                {/* BLOCO 04: MEDIDAS E AÇÕES ESCOLARES */}
                <div className="space-y-1">
                  <div className="bg-blue-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    04 MEDIDAS E AÇÕES ESCOLARES
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-b border border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] text-slate-800">
                    <p>✓ Triagem de urgência institucional e registro formal</p>
                    <p>✓ Classificação de prioridade: {denuncia.nivel_gravidade || 'Média'} (Prioritária)</p>
                    <p>✓ Acolhimento pedagógico e escuta orientada preliminar</p>
                    <p>✓ Procedimentos preventivos no âmbito da Lei nº 13.185/15</p>
                    <p>✓ Encaminhamento à Rede de Garantia de Direitos (ECA)</p>
                    <p>✓ Registro confidencial no Sistema Stop Bullying</p>
                    <p>✓ Acompanhamento conjunto Escola-Conselho</p>
                    <p>✓ Provas anexadas: {denuncia.provas_anexas?.length || 0} evidencia(s) preservada(s)</p>
                  </div>
                </div>

                {/* BLOCO 05: HISTÓRICO DE ATENDIMENTO E INTERVENÇÃO */}
                <div className="space-y-1">
                  <div className="bg-blue-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    05 HISTÓRICO DE ATENDIMENTO E INTERVENÇÃO
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-b border border-slate-300 space-y-1 text-[10px] font-mono text-slate-800">
                    {acoesList.length > 0 ? (
                      acoesList.map((a, i) => (
                        <p key={i}>
                          • <strong className="text-blue-950">{a.data_hora}:</strong> {a.acao} ({a.responsavel})
                        </p>
                      ))
                    ) : (
                      <>
                        <p>• <strong>{formattedDate}:</strong> Recepção da comunicação e avaliação de riscos protetivos.</p>
                        <p>• <strong>{formattedDate}:</strong> Acolhimento da vítima e escuta pedagógica orientada.</p>
                        <p>• <strong>{formattedDate}:</strong> Avaliação da comissão escolar e medidas preventivas.</p>
                        <p>• <strong>{formattedDate}:</strong> Formalização do relatório técnico de encaminhamento.</p>
                        <p>• <strong>{formattedDate}:</strong> Notificação ao Conselho Tutelar do Município.</p>
                      </>
                    )}
                  </div>
                </div>

                {/* BLOCO 06: REQUISIÇÃO DE PROVIDÊNCIAS E PARECER */}
                <div className="space-y-1">
                  <div className="bg-blue-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    06 REQUISIÇÃO DE PROVIDÊNCIAS E PARECER
                  </div>
                  <div className="bg-slate-50 p-3 rounded-b border border-slate-300 text-[10px] text-slate-900 space-y-1.5">
                    <p>
                      Encaminhamento formalizado com amparo nos artigos 18, 56 e 136 da Lei Federal nº 8.069/90 (ECA) e Lei nº 13.185/15. Solicita-se a atuação do Conselho Tutelar para aplicação das medidas protetivas cabíveis no âmbito comunitário e familiar.
                    </p>
                    <p className="font-bold border-t border-slate-200 pt-1 text-blue-950">
                      FUNDAMENTAÇÃO LEGAL &amp; PARECER INSTITUCIONAL: Protocolo sob intervenção e acompanhamento institucional conjunto. Parecer: Recomenda-se orientação familiar e acompanhamento conjunto com a rede de assistência social do município.
                    </p>
                  </div>
                </div>

                {/* ASSINATURAS */}
                <div className="pt-6 grid grid-cols-2 gap-8 text-center text-[10px]">
                  <div className="border-t border-slate-800 pt-1">
                    <strong className="block text-slate-900 uppercase">Comissão de Mediação Escolar</strong>
                    <span className="text-slate-600 block">E.E.M.T.I. Alfredo Machado – Remetente</span>
                  </div>
                  <div className="border-t border-slate-800 pt-1">
                    <strong className="block text-slate-900 uppercase">Conselho Tutelar Responsável</strong>
                    <span className="text-slate-600 block">Conselheiro(a) Tutelar de Madalena – CE</span>
                  </div>
                </div>

                {/* RODAPÉ DO DOCUMENTO */}
                <div className="border-t border-slate-300 pt-2 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                  <span>🛡️ Documento gerado pelo Sistema Stop Bullying</span>
                  <span>Madalena – CE, {currentDateFullStr}</span>
                  <span>Protocolo protegido – uso institucional</span>
                </div>

              </div>
            )}

            {/* MODELO 2: CONSELHO ESCOLAR / SEDUC (RELATÓRIO DE PROTOCOLO - VERDE) */}
            {docType === 'conselho_escolar' && (
              <div className="space-y-4">
                
                {/* CABEÇALHO DA INSTITUIÇÃO */}
                <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
                  <div className="flex items-center justify-between px-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-900 text-white font-black flex items-center justify-center text-[10px] text-center p-1 border border-emerald-950">
                      SEDUC CE
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="font-bold text-[10px] uppercase tracking-wider text-slate-700">
                        GOVERNO DO ESTADO DO CEARÁ
                      </p>
                      <p className="font-extrabold text-[11px] text-slate-900 uppercase">
                        SEDUC • CREDE 12 • MADALENA – CE
                      </p>
                      <h1 className="font-black text-sm sm:text-base text-emerald-950 uppercase tracking-tight">
                        E.E.M.T.I. ALFREDO MACHADO
                      </h1>
                      <h2 className="font-extrabold text-xs text-emerald-900 uppercase">
                        RELATÓRIO DE PROTOCOLO – MEDIAÇÃO ESCOLAR
                      </h2>
                      <p className="text-[10px] font-bold text-slate-600">
                        PROTOCOLO DE MEDIAÇÃO E COMUNICAÇÃO INTERNA
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-emerald-900 font-bold flex items-center justify-center text-[10px] text-center p-1 border border-slate-300">
                      ESCOLA
                    </div>
                  </div>

                  {/* FAIXA COM DADOS DE PROTOCOLO E STATUS */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-100 p-2 rounded-lg border border-slate-300 text-[10px] text-left mt-2">
                    <div>
                      <span className="font-bold text-slate-700 block">📋 PROTOCOLO:</span>
                      <strong className="font-mono text-emerald-950 text-xs">SEC-2026-{denuncia.protocolo}</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">📅 DATA:</span>
                      <span className="font-mono text-slate-900">{formattedDate}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block">STATUS:</span>
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-900 text-white font-bold text-[9px] uppercase">
                        [{denuncia.status.toUpperCase()}]
                      </span>
                    </div>
                  </div>
                </div>

                {/* BLOCO 01: IDENTIFICAÇÃO DA OCORRÊNCIA */}
                <div className="space-y-1">
                  <div className="bg-emerald-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    01 IDENTIFICAÇÃO DA OCORRÊNCIA
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-2.5 rounded-b border border-slate-300 text-[11px]">
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">👥 Tipo / Tipologia</span>
                      <strong className="text-slate-900">{denuncia.tipo_violencia || 'Cyberbullying'}</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">📍 Local</span>
                      <span className="text-slate-900">{denuncia.local_escola}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">🕒 Turno</span>
                      <span className="text-slate-900">{denuncia.turno || 'Manhã'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">📅 Data Ocorrência</span>
                      <span className="text-slate-900 font-mono">{formattedDate.split('–')[0]}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">📈 Frequência</span>
                      <span className="text-slate-900">{denuncia.frequencia || 'Poucas vezes'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">⚠️ Nível de Urgência</span>
                      <strong className="text-emerald-900">{denuncia.nivel_gravidade || 'Média'} (Prioritária)</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">📄 Assunto</span>
                      <span className="text-slate-900">Conflito entre estudantes em ambiente escolar</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[9px] uppercase">🎓 Semestre / Ano</span>
                      <span className="text-slate-900">2º Semestre / 2026</span>
                    </div>
                  </div>
                </div>

                {/* BLOCO 02: ENVOLVIDOS */}
                <div className="space-y-1">
                  <div className="bg-emerald-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    02 ENVOLVIDOS
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-b border border-slate-300 space-y-1 text-[11px]">
                    <p>
                      <strong>👤 DENUNCIANTE / RELATOR:</strong> Identidade protegida sob sigilo escolar ({denuncia.papel_denunciante || 'Vítima Direta'})
                    </p>
                    <p>
                      <strong>👤 MEDIADOR / RESPONSÁVEL:</strong> Comissão de Mediação e Acolhimento Pedagógico da E.E.M.T.I. Alfredo Machado
                    </p>
                    <p>
                      <strong>👤 TESTEMUNHAS / ENVOLVIDOS ADICIONAIS:</strong> Turma informada: {denuncia.turma_envolvida || 'Não informada'}
                    </p>
                  </div>
                </div>

                {/* BLOCO 03: DESCRIÇÃO DO CASO */}
                <div className="space-y-1">
                  <div className="bg-emerald-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    03 DESCRIÇÃO DO CASO
                  </div>
                  <div className="bg-slate-50 p-3 rounded-b border border-slate-300 text-[11px] text-slate-900 leading-relaxed italic">
                    "{denuncia.descricao || 'Relato registrado confidencialmente no canal seguro do Stop Bullying. O estudante denunciante relatou situação de conflito em ambiente escolar que demanda intervenção pedagógica preventiva e acolhimento.'}"
                  </div>
                </div>

                {/* BLOCO 04: MEDIDAS E AÇÕES REALIZADAS */}
                <div className="space-y-1">
                  <div className="bg-emerald-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    04 MEDIDAS E AÇÕES REALIZADAS
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-b border border-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] text-slate-800">
                    <p>✓ Registro da denúncia no sistema Stop Bullying</p>
                    <p>✓ Triagem de urgência {denuncia.nivel_gravidade || 'Média'} (Prioritária)</p>
                    <p>✓ Acolhimento pedagógico imediato</p>
                    <p>✓ Escuta orientada pela Cultura de Paz e Lei nº 13.185/15</p>
                    <p>✓ Procedimento de mediação escolar confidencial</p>
                    <p>✓ Pactuação de acordos de convivência</p>
                    <p>✓ Acompanhamento pedagógico contínuo</p>
                    <p>✓ Provas anexadas: {denuncia.provas_anexas?.length || 0} evidencia(s) armazenada(s)</p>
                  </div>
                </div>

                {/* BLOCO 05: HISTÓRICO DA MEDIAÇÃO E COMUNICAÇÃO */}
                <div className="space-y-1">
                  <div className="bg-emerald-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    05 HISTÓRICO DA MEDIAÇÃO E COMUNICAÇÃO
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-b border border-slate-300 space-y-1 text-[10px] font-mono text-slate-800">
                    {acoesList.length > 0 ? (
                      acoesList.map((a, i) => (
                        <p key={i}>
                          • <strong className="text-emerald-950">{a.data_hora}:</strong> {a.acao} ({a.responsavel})
                        </p>
                      ))
                    ) : (
                      <>
                        <p>• <strong>{formattedDate}:</strong> Registro da denúncia e classificação de urgência.</p>
                        <p>• <strong>{formattedDate}:</strong> Acolhimento pedagógico e escuta inicial do estudante.</p>
                        <p>• <strong>{formattedDate}:</strong> Escuta orientada dos estudantes envolvidos.</p>
                        <p>• <strong>{formattedDate}:</strong> Procedimento de mediação restaurativa e diálogo.</p>
                        <p>• <strong>{formattedDate}:</strong> Pactuação formal de acordos de convivência pacífica.</p>
                      </>
                    )}
                  </div>
                </div>

                {/* BLOCO 06: CONCLUSÃO DA MEDIAÇÃO */}
                <div className="space-y-1">
                  <div className="bg-emerald-950 text-white px-3 py-1 font-black text-[11px] uppercase rounded-t tracking-wider">
                    06 CONCLUSÃO DA MEDIAÇÃO
                  </div>
                  <div className="bg-slate-50 p-3 rounded-b border border-slate-300 text-[10px] text-slate-900 space-y-1.5">
                    <p>
                      Procedimento de mediação em andamento pela equipe pedagógica. Foram realizadas escutas preliminares e pactuados compromissos iniciais de preservação do bem-estar e da Cultura de Paz.
                    </p>
                    <p className="font-bold border-t border-slate-200 pt-1 text-emerald-950">
                      PARECER / OBSERVAÇÕES: Protocolo ativo sob acompanhamento sistemático da equipe de mediação da E.E.M.T.I. Alfredo Machado. Parecer: Caso conduzido em conformidade com as diretrizes da Cultura de Paz e Mediação Escolar.
                    </p>
                  </div>
                </div>

                {/* ASSINATURAS */}
                <div className="pt-6 grid grid-cols-2 gap-8 text-center text-[10px]">
                  <div className="border-t border-slate-800 pt-1">
                    <strong className="block text-slate-900 uppercase">Comissão de Mediação Escolar</strong>
                    <span className="text-slate-600 block">E.E.M.T.I. Alfredo Machado</span>
                  </div>
                  <div className="border-t border-slate-800 pt-1">
                    <strong className="block text-slate-900 uppercase">Direção / Coordenação Pedagógica</strong>
                    <span className="text-slate-600 block">CREDE 12 – SEDUC / CE</span>
                  </div>
                </div>

                {/* RODAPÉ DO DOCUMENTO */}
                <div className="border-t border-slate-300 pt-2 flex items-center justify-between text-[9px] text-slate-500 font-mono">
                  <span>🛡️ Documento gerado pelo Sistema Stop Bullying</span>
                  <span>Madalena – CE, {currentDateFullStr}</span>
                  <span>Protocolo protegido – uso institucional</span>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* RODAPÉ DO MODAL */}
        <div className="p-4 bg-[#141a2e] border-t border-white/10 flex items-center justify-between text-xs text-gray-400 print:hidden">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" /> Layout pronto para impressão A4 / PDF Oficial
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer transition-all"
          >
            Fechar
          </button>
        </div>

      </div>

    </div>
  );
};
