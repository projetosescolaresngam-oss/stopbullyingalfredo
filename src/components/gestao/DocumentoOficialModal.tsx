import React, { useState, useEffect } from 'react';
import { Denuncia } from '../../types';
import { playBreathTone } from '../../services/audioSynthesizer';
import { printElementById } from '../../services/printService';
import { ModalFotoCompleta } from './ModalFotoCompleta';
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
  Users,
  ZoomIn,
  Image as ImageIcon,
  Paperclip
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
  const [selectedFotoModal, setSelectedFotoModal] = useState<{ url: string; nome?: string; tipo?: string; tamanho?: string } | null>(null);

  // Filtrar evidências visuais/fotos anexadas
  const imageProofs = (denuncia.provas_anexas || []).filter(anexo => {
    if (!anexo.url) return false;
    const isImageFileType = anexo.tipo === 'foto' || anexo.tipo === 'print' || anexo.tipo === 'imagem';
    const isDataUrlImage = anexo.url.startsWith('data:image');
    const isImageUrl = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(anexo.url);
    return isImageFileType || isDataUrlImage || isImageUrl;
  });

  if (denuncia.midia_anexa && (denuncia.midia_tipo === 'foto' || denuncia.midia_anexa.startsWith('data:image'))) {
    if (!imageProofs.some(p => p.url === denuncia.midia_anexa)) {
      imageProofs.unshift({
        nome: 'evidencia_foto_relatada.png',
        url: denuncia.midia_anexa,
        tipo: 'foto',
        tamanho: 'Anexo de Mídia'
      });
    }
  }

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

  useEffect(() => {
    document.body.classList.add('documento-oficial-open');
    return () => {
      document.body.classList.remove('documento-oficial-open');
    };
  }, []);

  const playSfx = () => {
    try { playBreathTone(750, 25, true); } catch {}
  };

  const handlePrint = () => {
    playSfx();
    const titulo = docType === 'conselho_tutelar'
      ? `Oficio_Conselho_Tutelar_EEMTI_${denuncia.protocolo}`
      : `Relatorio_Mediacao_Escolar_SEDUC_${denuncia.protocolo}`;
    printElementById('printable-official-doc', titulo);
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
            className="w-full max-w-[800px] mx-auto bg-white text-slate-900 rounded-2xl p-4 sm:p-8 shadow-2xl border border-slate-300 space-y-3.5 print:space-y-1.5 print:shadow-none print:border-none print:p-0 print:m-0 print:rounded-none print:text-black font-sans text-xs print:text-[9pt] print:leading-tight"
          >

            {/* MODELO 1: CONSELHO TUTELAR (OFÍCIO & RELATÓRIO DE ENCAMINHAMENTO - AZUL) */}
            {docType === 'conselho_tutelar' && (
              <div className="official-oficio-page space-y-3 print:space-y-1">
                
                {/* CABEÇALHO DA INSTITUIÇÃO */}
                <div className="official-header text-center border-b-2 border-slate-900 pb-2 print:pb-1 space-y-0.5">
                  <div className="flex items-center justify-between px-2">
                    <div className="official-logo-seal w-10 h-10 print:w-8 print:h-8 rounded-full bg-blue-900 text-white font-black flex items-center justify-center text-[9px] print:text-[7px] text-center p-1 border border-blue-950 shrink-0">
                      CONSELHO TUTELAR
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="font-bold text-[9px] print:text-[8px] uppercase tracking-wider text-slate-700">
                        ESTADO DO CEARÁ • MUNICÍPIO DE MADALENA – CE
                      </p>
                      <p className="font-extrabold text-[10px] print:text-[9px] text-slate-900 uppercase">
                        SISTEMA DE GARANTIA DE DIREITOS DA CRIANÇA E DO ADOLESCENTE
                      </p>
                      <h1 className="font-black text-sm sm:text-base print:text-xs text-blue-950 uppercase tracking-tight">
                        CONSELHO TUTELAR
                      </h1>
                      <h2 className="font-extrabold text-xs print:text-[10px] text-blue-900 uppercase">
                        OFÍCIO E RELATÓRIO DE ENCAMINHAMENTO INSTITUCIONAL
                      </h2>
                      <p className="text-[9px] print:text-[8px] font-bold text-slate-600">
                        PROTEÇÃO INTEGRAL • LEI FEDERAL Nº 8.069/90 (ECA)
                      </p>
                    </div>
                    <div className="official-logo-seal w-10 h-10 print:w-8 print:h-8 rounded-full bg-slate-100 text-blue-900 font-bold flex items-center justify-center text-[9px] print:text-[7px] text-center p-1 border border-slate-300 shrink-0">
                      CEARÁ
                    </div>
                  </div>

                  {/* FAIXA COM DADOS DE PROTOCOLO E STATUS */}
                  <div className="official-metadata-bar grid grid-cols-3 gap-2 bg-slate-100 p-1.5 print:p-1 rounded-lg border border-slate-300 text-[9.5px] print:text-[8pt] text-left mt-1 print:mt-0.5">
                    <div>
                      <span className="font-bold text-slate-700 block text-[8.5px] print:text-[7.5pt]">📋 OFÍCIO / EXPEDIENTE:</span>
                      <strong className="font-mono text-blue-950 text-xs print:text-[9pt]">OF-CT-2026/DSEC-{denuncia.protocolo}</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block text-[8.5px] print:text-[7.5pt]">📅 DATA EXPEDIÇÃO:</span>
                      <span className="font-mono text-slate-900">{formattedDate}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block text-[8.5px] print:text-[7.5pt]">ENCAMINHAMENTO:</span>
                      <span className="badge-status inline-block px-1.5 py-0.5 rounded bg-blue-900 text-white font-bold text-[8.5px] print:text-[7.5pt] uppercase">
                        [ OFICIALIZADO ] (REDE DE PROTEÇÃO ATIVA)
                      </span>
                    </div>
                  </div>
                </div>

                {/* BLOCO 01: IDENTIFICAÇÃO DO ENCAMINHAMENTO */}
                <div className="space-y-0.5">
                  <div className="bg-blue-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider flex items-center justify-between">
                    <span>01 IDENTIFICAÇÃO DO ENCAMINHAMENTO</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 print:grid-cols-4 gap-1.5 print:gap-1 bg-slate-50 p-2 print:p-1 rounded-b border border-slate-300 text-[10px] print:text-[8pt]">
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">👥 Natureza</span>
                      <strong className="text-slate-900">{denuncia.tipo_violencia || 'Cyberbullying'}</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">📍 Local</span>
                      <span className="text-slate-900">{denuncia.local_escola}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">🕒 Turno</span>
                      <span className="text-slate-900">{denuncia.turno || 'Manhã'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">📅 Data Ocorrência</span>
                      <span className="text-slate-900 font-mono">{formattedDate.split('–')[0]}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">📈 Reincidência</span>
                      <span className="text-slate-900">{denuncia.frequencia || 'Poucas vezes'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">⚠️ Urgência</span>
                      <strong className="text-rose-700">{denuncia.nivel_gravidade || 'Média'} (Prioritária)</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">📄 Assunto</span>
                      <span className="text-slate-900">Notificação Formal Violação ECA</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">🎓 Exercício</span>
                      <span className="text-slate-900">2º Semestre / 2026</span>
                    </div>
                  </div>
                </div>

                {/* BLOCO 02: QUALIFICAÇÃO E SIGILO */}
                <div className="space-y-0.5">
                  <div className="bg-blue-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    02 QUALIFICAÇÃO E SIGILO
                  </div>
                  <div className="bg-slate-50 p-2 print:p-1 rounded-b border border-slate-300 space-y-0.5 text-[10px] print:text-[8pt]">
                    <p>
                      <strong>👤 ESTUDANTE / NOTICIANTE:</strong> Identidade protegida sob sigilo legal conforme ECA Art. 100 (Condição: {denuncia.papel_denunciante || 'Vítima Direta'})
                    </p>
                    <p>
                      <strong>👤 REMETENTE:</strong> E.E.M.T.I. Alfredo Machado (Comissão de Mediação &amp; Acolhimento Escolar)
                    </p>
                    <p>
                      <strong>👤 ENVOLVIDOS / AGRESSORES:</strong> Turma: {denuncia.turma_envolvida || 'Não informada'} {denuncia.agressor_grupo ? `| Agressor/Grupo: ${denuncia.agressor_grupo}` : ''}
                    </p>
                  </div>
                </div>

                {/* BLOCO 03: DESCRIÇÃO DOS FATOS APURADOS */}
                <div className="space-y-0.5">
                  <div className="bg-blue-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    03 DESCRIÇÃO DOS FATOS APURADOS
                  </div>
                  <div className="official-relato-box bg-slate-50 p-2 print:p-1.5 rounded-b border border-slate-300 text-[10px] print:text-[8pt] text-slate-900 leading-snug italic">
                    "{denuncia.descricao || 'Notificação formal encaminhada ao Conselho Tutelar contendo relatório dos fatos apurados em ambiente escolar, demandando acompanhamento da rede de proteção integral conforme Lei nº 8.069/90 (ECA).'}"
                  </div>
                </div>

                {/* BLOCO 04: MEDIDAS E AÇÕES ESCOLARES */}
                <div className="space-y-0.5">
                  <div className="bg-blue-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    04 MEDIDAS E AÇÕES ESCOLARES
                  </div>
                  <div className="bg-slate-50 p-2 print:p-1 rounded-b border border-slate-300 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-0.5 text-[9.5px] print:text-[7.5pt] text-slate-800">
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
                <div className="space-y-0.5">
                  <div className="bg-blue-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    05 HISTÓRICO DE ATENDIMENTO E INTERVENÇÃO
                  </div>
                  <div className="bg-slate-50 p-2 print:p-1 rounded-b border border-slate-300 space-y-0.5 text-[9.5px] print:text-[7.5pt] font-mono text-slate-800">
                    {acoesList.length > 0 ? (
                      acoesList.slice(-4).map((a, i) => (
                        <p key={i}>
                          • <strong className="text-blue-950">{a.data_hora}:</strong> {a.acao} ({a.responsavel})
                        </p>
                      ))
                    ) : (
                      <>
                        <p>• <strong>{formattedDate}:</strong> Recepção da comunicação e avaliação de riscos protetivos.</p>
                        <p>• <strong>{formattedDate}:</strong> Acolhimento da vítima e escuta pedagógica orientada.</p>
                        <p>• <strong>{formattedDate}:</strong> Avaliação da comissão escolar e medidas preventivas.</p>
                        <p>• <strong>{formattedDate}:</strong> Formalização do relatório técnico e notificação ao Conselho Tutelar.</p>
                      </>
                    )}
                  </div>
                </div>

                {/* BLOCO 06: REQUISIÇÃO DE PROVIDÊNCIAS E PARECER */}
                <div className="space-y-0.5">
                  <div className="bg-blue-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    06 REQUISIÇÃO DE PROVIDÊNCIAS E PARECER
                  </div>
                  <div className="bg-slate-50 p-2 print:p-1.5 rounded-b border border-slate-300 text-[9.5px] print:text-[7.5pt] text-slate-900 space-y-1">
                    <p>
                      Encaminhamento formalizado com amparo nos artigos 18, 56 e 136 da Lei Federal nº 8.069/90 (ECA) e Lei nº 13.185/15. Solicita-se a atuação do Conselho Tutelar para aplicação das medidas protetivas cabíveis.
                    </p>
                    <p className="font-bold border-t border-slate-200 pt-0.5 text-blue-950">
                      PARECER INSTITUCIONAL: Recomenda-se orientação familiar e acompanhamento conjunto com a rede de assistência social do município.
                    </p>
                  </div>
                </div>

                {/* ASSINATURAS */}
                <div className="official-signatures pt-3 print:pt-2 grid grid-cols-2 gap-6 print:gap-3 text-center text-[9.5px] print:text-[8pt]">
                  <div className="border-t border-slate-800 pt-1 print:pt-0.5">
                    <strong className="block text-slate-900 uppercase">Comissão de Mediação Escolar</strong>
                    <span className="text-slate-600 block text-[8.5px] print:text-[7.5pt]">E.E.M.T.I. Alfredo Machado – Remetente</span>
                  </div>
                  <div className="border-t border-slate-800 pt-1 print:pt-0.5">
                    <strong className="block text-slate-900 uppercase">Conselho Tutelar Responsável</strong>
                    <span className="text-slate-600 block text-[8.5px] print:text-[7.5pt]">Conselheiro(a) Tutelar de Madalena – CE</span>
                  </div>
                </div>

                {/* RODAPÉ DO DOCUMENTO */}
                <div className="official-footer border-t border-slate-300 pt-1 print:pt-0.5 flex items-center justify-between text-[8.5px] print:text-[7pt] text-slate-500 font-mono">
                  <span>🛡️ Documento gerado pelo Sistema Stop Bullying</span>
                  <span>Madalena – CE, {currentDateFullStr}</span>
                  <span>Protocolo protegido – uso institucional</span>
                </div>

              </div>
            )}

            {/* MODELO 2: CONSELHO ESCOLAR / SEDUC (RELATÓRIO DE PROTOCOLO - VERDE) */}
            {docType === 'conselho_escolar' && (
              <div className="official-oficio-page space-y-3 print:space-y-1">
                
                {/* CABEÇALHO DA INSTITUIÇÃO */}
                <div className="official-header text-center border-b-2 border-slate-900 pb-2 print:pb-1 space-y-0.5">
                  <div className="flex items-center justify-between px-2">
                    <div className="official-logo-seal w-10 h-10 print:w-8 print:h-8 rounded-full bg-emerald-900 text-white font-black flex items-center justify-center text-[9px] print:text-[7px] text-center p-1 border border-emerald-950 shrink-0">
                      SEDUC CE
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="font-bold text-[9px] print:text-[8px] uppercase tracking-wider text-slate-700">
                        GOVERNO DO ESTADO DO CEARÁ
                      </p>
                      <p className="font-extrabold text-[10px] print:text-[9px] text-slate-900 uppercase">
                        SEDUC • CREDE 12 • MADALENA – CE
                      </p>
                      <h1 className="font-black text-sm sm:text-base print:text-xs text-emerald-950 uppercase tracking-tight">
                        E.E.M.T.I. ALFREDO MACHADO
                      </h1>
                      <h2 className="font-extrabold text-xs print:text-[10px] text-emerald-900 uppercase">
                        RELATÓRIO DE PROTOCOLO – MEDIAÇÃO ESCOLAR
                      </h2>
                      <p className="text-[9px] print:text-[8px] font-bold text-slate-600">
                        PROTOCOLO DE MEDIAÇÃO E COMUNICAÇÃO INTERNA
                      </p>
                    </div>
                    <div className="official-logo-seal w-10 h-10 print:w-8 print:h-8 rounded-full bg-slate-100 text-emerald-900 font-bold flex items-center justify-center text-[9px] print:text-[7px] text-center p-1 border border-slate-300 shrink-0">
                      ESCOLA
                    </div>
                  </div>

                  {/* FAIXA COM DADOS DE PROTOCOLO E STATUS */}
                  <div className="official-metadata-bar grid grid-cols-3 gap-2 bg-slate-100 p-1.5 print:p-1 rounded-lg border border-slate-300 text-[9.5px] print:text-[8pt] text-left mt-1 print:mt-0.5">
                    <div>
                      <span className="font-bold text-slate-700 block text-[8.5px] print:text-[7.5pt]">📋 PROTOCOLO:</span>
                      <strong className="font-mono text-emerald-950 text-xs print:text-[9pt]">SEC-2026-{denuncia.protocolo}</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block text-[8.5px] print:text-[7.5pt]">📅 DATA:</span>
                      <span className="font-mono text-slate-900">{formattedDate}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 block text-[8.5px] print:text-[7.5pt]">STATUS:</span>
                      <span className="badge-status inline-block px-1.5 py-0.5 rounded bg-emerald-900 text-white font-bold text-[8.5px] print:text-[7.5pt] uppercase">
                        [{denuncia.status.toUpperCase()}]
                      </span>
                    </div>
                  </div>
                </div>

                {/* BLOCO 01: IDENTIFICAÇÃO DA OCORRÊNCIA */}
                <div className="space-y-0.5">
                  <div className="bg-emerald-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    01 IDENTIFICAÇÃO DA OCORRÊNCIA
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 print:grid-cols-4 gap-1.5 print:gap-1 bg-slate-50 p-2 print:p-1 rounded-b border border-slate-300 text-[10px] print:text-[8pt]">
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">👥 Tipologia</span>
                      <strong className="text-slate-900">{denuncia.tipo_violencia || 'Cyberbullying'}</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">📍 Local</span>
                      <span className="text-slate-900">{denuncia.local_escola}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">🕒 Turno</span>
                      <span className="text-slate-900">{denuncia.turno || 'Manhã'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">📅 Data Ocorrência</span>
                      <span className="text-slate-900 font-mono">{formattedDate.split('–')[0]}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">📈 Frequência</span>
                      <span className="text-slate-900">{denuncia.frequencia || 'Poucas vezes'}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">⚠️ Urgência</span>
                      <strong className="text-emerald-900">{denuncia.nivel_gravidade || 'Média'} (Prioritária)</strong>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">📄 Assunto</span>
                      <span className="text-slate-900">Conflito escolar</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-600 block text-[8.5px] print:text-[7pt] uppercase">🎓 Exercício</span>
                      <span className="text-slate-900">2º Semestre / 2026</span>
                    </div>
                  </div>
                </div>

                {/* BLOCO 02: ENVOLVIDOS */}
                <div className="space-y-0.5">
                  <div className="bg-emerald-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    02 ENVOLVIDOS
                  </div>
                  <div className="bg-slate-50 p-2 print:p-1 rounded-b border border-slate-300 space-y-0.5 text-[10px] print:text-[8pt]">
                    <p>
                      <strong>👤 DENUNCIANTE / RELATOR:</strong> Identidade protegida sob sigilo escolar ({denuncia.papel_denunciante || 'Vítima Direta'})
                    </p>
                    <p>
                      <strong>👤 MEDIADOR / RESPONSÁVEL:</strong> Comissão de Mediação e Acolhimento Pedagógico da E.E.M.T.I. Alfredo Machado
                    </p>
                    <p>
                      <strong>👤 ENVOLVIDOS / AGRESSORES:</strong> Turma: {denuncia.turma_envolvida || 'Não informada'} {denuncia.agressor_grupo ? `| Agressor/Grupo: ${denuncia.agressor_grupo}` : ''}
                    </p>
                  </div>
                </div>

                {/* BLOCO 03: DESCRIÇÃO DO CASO */}
                <div className="space-y-0.5">
                  <div className="bg-emerald-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    03 DESCRIÇÃO DO CASO
                  </div>
                  <div className="official-relato-box bg-slate-50 p-2 print:p-1.5 rounded-b border border-slate-300 text-[10px] print:text-[8pt] text-slate-900 leading-snug italic">
                    "{denuncia.descricao || 'Relato registrado confidencialmente no canal seguro do Stop Bullying. O estudante denunciante relatou situação de conflito em ambiente escolar que demanda intervenção pedagógica preventiva e acolhimento.'}"
                  </div>
                </div>

                {/* BLOCO 04: MEDIDAS E AÇÕES REALIZADAS */}
                <div className="space-y-0.5">
                  <div className="bg-emerald-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    04 MEDIDAS E AÇÕES REALIZADAS
                  </div>
                  <div className="bg-slate-50 p-2 print:p-1 rounded-b border border-slate-300 grid grid-cols-1 sm:grid-cols-2 print:grid-cols-2 gap-0.5 text-[9.5px] print:text-[7.5pt] text-slate-800">
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
                <div className="space-y-0.5">
                  <div className="bg-emerald-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    05 HISTÓRICO DA MEDIAÇÃO E COMUNICAÇÃO
                  </div>
                  <div className="bg-slate-50 p-2 print:p-1 rounded-b border border-slate-300 space-y-0.5 text-[9.5px] print:text-[7.5pt] font-mono text-slate-800">
                    {acoesList.length > 0 ? (
                      acoesList.slice(-4).map((a, i) => (
                        <p key={i}>
                          • <strong className="text-emerald-950">{a.data_hora}:</strong> {a.acao} ({a.responsavel})
                        </p>
                      ))
                    ) : (
                      <>
                        <p>• <strong>{formattedDate}:</strong> Registro da denúncia e classificação de urgência.</p>
                        <p>• <strong>{formattedDate}:</strong> Acolhimento pedagógico e escuta inicial do estudante.</p>
                        <p>• <strong>{formattedDate}:</strong> Escuta orientada dos estudantes envolvidos.</p>
                        <p>• <strong>{formattedDate}:</strong> Procedimento de mediação e pactuação formal de acordos.</p>
                      </>
                    )}
                  </div>
                </div>

                {/* BLOCO 06: CONCLUSÃO DA MEDIAÇÃO */}
                <div className="space-y-0.5">
                  <div className="bg-emerald-950 text-white px-2.5 py-0.5 font-black text-[10px] print:text-[8.5pt] uppercase rounded-t tracking-wider">
                    06 CONCLUSÃO DA MEDIAÇÃO
                  </div>
                  <div className="bg-slate-50 p-2 print:p-1.5 rounded-b border border-slate-300 text-[9.5px] print:text-[7.5pt] text-slate-900 space-y-1">
                    <p>
                      Procedimento de mediação em andamento pela equipe pedagógica. Foram realizadas escutas preliminares e pactuados compromissos iniciais de preservação do bem-estar e da Cultura de Paz.
                    </p>
                    <p className="font-bold border-t border-slate-200 pt-0.5 text-emerald-950">
                      PARECER / OBSERVAÇÕES: Caso conduzido em conformidade com as diretrizes da Cultura de Paz e Mediação Escolar.
                    </p>
                  </div>
                </div>

                {/* ASSINATURAS */}
                <div className="official-signatures pt-3 print:pt-2 grid grid-cols-2 gap-6 print:gap-3 text-center text-[9.5px] print:text-[8pt]">
                  <div className="border-t border-slate-800 pt-1 print:pt-0.5">
                    <strong className="block text-slate-900 uppercase">Comissão de Mediação Escolar</strong>
                    <span className="text-slate-600 block text-[8.5px] print:text-[7.5pt]">E.E.M.T.I. Alfredo Machado</span>
                  </div>
                  <div className="border-t border-slate-800 pt-1 print:pt-0.5">
                    <strong className="block text-slate-900 uppercase">Direção / Coordenação Pedagógica</strong>
                    <span className="text-slate-600 block text-[8.5px] print:text-[7.5pt]">CREDE 12 – SEDUC / CE</span>
                  </div>
                </div>

                {/* RODAPÉ DO DOCUMENTO */}
                <div className="official-footer border-t border-slate-300 pt-1 print:pt-0.5 flex items-center justify-between text-[8.5px] print:text-[7pt] text-slate-500 font-mono">
                  <span>🛡️ Documento gerado pelo Sistema Stop Bullying</span>
                  <span>Madalena – CE, {currentDateFullStr}</span>
                  <span>Protocolo protegido – uso institucional</span>
                </div>

              </div>
            )}

            {/* SEGUNDA FOLHA: ANEXO DE EVIDÊNCIAS E PROVAS FOTOGRÁFICAS (SOMENTE SE HOUVER FOTO) */}
            {imageProofs.length > 0 && (
              <div 
                className="official-anexos-page pt-6 mt-6 border-t-2 border-slate-900 print:border-none print:pt-0 print:mt-0 space-y-4"
              >
                {/* CABEÇALHO DA SEGUNDA FOLHA */}
                <div className="official-header text-center border-b-2 border-slate-900 pb-2 space-y-1">
                  <div className="flex items-center justify-between px-2">
                    <div className="official-logo-seal w-10 h-10 print:w-8 print:h-8 rounded-full bg-slate-900 text-white font-black flex items-center justify-center text-[9px] print:text-[7px] text-center p-1 border border-slate-950 shrink-0">
                      PROVAS
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="font-bold text-[9px] print:text-[8px] uppercase tracking-wider text-slate-700">
                        SISTEMA STOP BULLYING • CADEIA DE CUSTÓDIA DE PROVA DADOS
                      </p>
                      <h2 className="font-black text-sm sm:text-base print:text-xs text-slate-900 uppercase tracking-tight">
                        FOLHA ANEXA DE EVIDÊNCIAS FOTOGRÁFICAS / IMPRESSÃO DE PROVA
                      </h2>
                      <p className="text-[9.5px] print:text-[8px] font-bold text-slate-700 font-mono">
                        ANEXO AO EXPEDIENTE: {docType === 'conselho_tutelar' ? `OF-CT-2026/DSEC-${denuncia.protocolo}` : `SEC-2026-${denuncia.protocolo}`}
                      </p>
                    </div>
                    <div className="official-logo-seal w-10 h-10 print:w-8 print:h-8 rounded-full bg-slate-100 text-slate-900 font-bold flex items-center justify-center text-[9px] print:text-[7px] text-center p-1 border border-slate-300 shrink-0">
                      ANEXO
                    </div>
                  </div>

                  <div className="official-metadata-bar bg-slate-100 p-2 rounded-lg border border-slate-300 text-[9.5px] print:text-[8pt] text-left">
                    <p className="font-bold text-slate-800">
                      📄 REGISTRO DE EVIDÊNCIA VISUAL ANEXADA:
                    </p>
                    <p className="text-slate-600 text-[9px] print:text-[7.5pt]">
                      Documento fotográfico confidencial enviado pelo denunciante e anexado ao protocolo <strong>{denuncia.protocolo}</strong> em {formattedDate}. Contém {imageProofs.length} arquivo(s) de imagem preservados para análise das autoridades escolares e de proteção.
                    </p>
                  </div>
                </div>

                {/* QUADRO DE EXIBIÇÃO DAS FOTOS */}
                <div className="space-y-6 print:space-y-4">
                  {imageProofs.map((img, idx) => (
                    <div key={idx} className="border-2 border-slate-900 rounded-xl p-3 bg-slate-50 space-y-2 page-break-inside-avoid">
                      <div className="flex items-center justify-between border-b border-slate-300 pb-1 text-[10px] print:text-[8pt] font-mono">
                        <span className="font-bold text-slate-900 uppercase flex items-center gap-1.5">
                          📷 EVIDÊNCIA FOTOGRÁFICA #{idx + 1}: {img.nome}
                        </span>
                        <span className="text-slate-600">
                          Tipo: {img.tipo || 'Foto'} • {img.tamanho || 'Carregado'}
                        </span>
                      </div>

                      <div className="flex items-center justify-center bg-white p-2 border border-slate-300 rounded-lg max-h-[500px] print:max-h-[420px] overflow-hidden">
                        <img 
                          src={img.url} 
                          alt={img.nome} 
                          className="max-h-[480px] print:max-h-[400px] w-auto max-w-full object-contain rounded cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setSelectedFotoModal({
                            url: img.url!,
                            nome: img.nome,
                            tipo: img.tipo,
                            tamanho: img.tamanho
                          })}
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="text-[8.5px] print:text-[7.5pt] text-slate-600 text-center font-mono italic print:hidden">
                        * Clique na foto acima para abrir o visualizador ampliado em tela cheia.
                      </div>
                    </div>
                  ))}
                </div>

                {/* ASSINATURA DE AUTENTICAÇÃO DO ANEXO */}
                <div className="pt-4 grid grid-cols-2 gap-6 text-center text-[9.5px] print:text-[8pt]">
                  <div className="border-t border-slate-800 pt-1">
                    <strong className="block text-slate-900 uppercase">Conferido por Comissão de Mediação</strong>
                    <span className="text-slate-600 block text-[8.5px] print:text-[7.5pt]">E.E.M.T.I. Alfredo Machado</span>
                  </div>
                  <div className="border-t border-slate-800 pt-1">
                    <strong className="block text-slate-900 uppercase">Recebido por Órgão Oficial</strong>
                    <span className="text-slate-600 block text-[8.5px] print:text-[7.5pt]">Data de Recepção: ____/____/2026</span>
                  </div>
                </div>

                {/* RODAPÉ DO ANEXO */}
                <div className="border-t border-slate-300 pt-1 flex items-center justify-between text-[8.5px] print:text-[7pt] text-slate-500 font-mono">
                  <span>🛡️ Anexo de Prova • Sistema Stop Bullying</span>
                  <span>Madalena – CE</span>
                  <span>Página de Prova Integrante do Expediente</span>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* RODAPÉ DO MODAL */}
        <div className="p-4 bg-[#141a2e] border-t border-white/10 flex items-center justify-between text-xs text-gray-400 print:hidden">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" /> Layout pronto para impressão A4 / PDF Oficial {imageProofs.length > 0 ? `(Com Folha de Provas Anexa)` : `(Sem anexos)`}
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

      {/* MODAL DE FOTO COMPLETA (LIGHTBOX) */}
      {selectedFotoModal && (
        <ModalFotoCompleta 
          fotoUrl={selectedFotoModal.url}
          nomeArquivo={selectedFotoModal.nome}
          protocolo={denuncia.protocolo}
          tipoArquivo={selectedFotoModal.tipo}
          tamanhoArquivo={selectedFotoModal.tamanho}
          onClose={() => setSelectedFotoModal(null)}
        />
      )}

    </div>
  );
};
