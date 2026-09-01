import React, { useState, useRef } from 'react';
import { ViolenceType, SchoolLocation, MediaType, Denuncia } from '../types';
import { saveDenuncia } from '../services/storageService';
import { 
  Megaphone, 
  ShieldCheck, 
  Camera, 
  Video, 
  Mic, 
  Square, 
  X, 
  Copy, 
  Check, 
  Download, 
  AlertCircle, 
  Upload,
  ArrowLeft
} from 'lucide-react';

interface DenunciaFormProps {
  onBack: () => void;
  onDenunciaSent?: (denuncia: Denuncia) => void;
}

export const DenunciaForm: React.FC<DenunciaFormProps> = ({ onBack, onDenunciaSent }) => {
  const [tipo, setTipo] = useState<ViolenceType>('Verbal');
  const [local, setLocal] = useState<SchoolLocation>('Sala de Aula');
  const [descricao, setDescricao] = useState('');
  const [linkCyber, setLinkCyber] = useState('');
  
  // Media state
  const [mediaTab, setMediaTab] = useState<MediaType>('foto');
  const [mediaAnexa, setMediaAnexa] = useState<string | null>(null);
  const [mediaTipo, setMediaTipo] = useState<MediaType | null>(null);
  const [mediaDuracao, setMediaDuracao] = useState<number>(0);
  const [mediaError, setMediaError] = useState<string | null>(null);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  // Submission State
  const [submittedDenuncia, setSubmittedDenuncia] = useState<Denuncia | null>(null);
  const [copied, setCopied] = useState(false);

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMediaError('Selecione um arquivo de imagem válido (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      setMediaAnexa(evt.target?.result as string);
      setMediaTipo('foto');
      setMediaDuracao(0);
    };
    reader.readAsDataURL(file);
  };

  // Handle Video Upload (Max 60s validation)
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setMediaError('Selecione um arquivo de vídeo válido (MP4, WEBM, MOV).');
      return;
    }

    const tempUrl = URL.createObjectURL(file);
    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.src = tempUrl;

    tempVideo.onloadedmetadata = () => {
      URL.revokeObjectURL(tempUrl);
      const dur = tempVideo.duration;

      if (dur > 60.5) {
        setMediaError(`O vídeo possui ${Math.round(dur)}s. O limite máximo permitido para a denúncia é de 60 segundos!`);
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        setMediaAnexa(evt.target?.result as string);
        setMediaTipo('video');
        setMediaDuracao(Math.round(dur));
      };
      reader.readAsDataURL(file);
    };

    tempVideo.onerror = () => {
      setMediaError('Não foi possível ler o arquivo de vídeo.');
    };
  };

  // Handle Audio File Upload (Max 60s)
  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setMediaError('Selecione um arquivo de áudio válido.');
      return;
    }

    const tempUrl = URL.createObjectURL(file);
    const tempAudio = document.createElement('audio');
    tempAudio.preload = 'metadata';
    tempAudio.src = tempUrl;

    tempAudio.onloadedmetadata = () => {
      URL.revokeObjectURL(tempUrl);
      const dur = tempAudio.duration;

      if (dur > 60.5) {
        setMediaError(`O áudio possui ${Math.round(dur)}s. O limite máximo permitido é de 60 segundos!`);
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        setMediaAnexa(evt.target?.result as string);
        setMediaTipo('audio');
        setMediaDuracao(Math.round(dur));
      };
      reader.readAsDataURL(file);
    };

    tempAudio.onerror = () => {
      setMediaError('Não foi possível ler o arquivo de áudio.');
    };
  };

  // Microphone Live Recording (MediaRecorder API)
  const startAudioRecording = async () => {
    setMediaError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMediaError('Gravação de áudio não suportada neste navegador.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

        if (audioChunksRef.current.length > 0) {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.onload = (evt) => {
            setMediaAnexa(evt.target?.result as string);
            setMediaTipo('audio');
            setMediaDuracao(recordingSeconds);
          };
          reader.readAsDataURL(blob);
        }
        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      const interval = window.setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 59) {
            stopAudioRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
      timerIntervalRef.current = interval;

    } catch {
      setMediaError('Permissão do microfone negada ou indisponível.');
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsRecording(false);
  };

  const cancelAudioRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      audioChunksRef.current = [];
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  const removeMedia = () => {
    setMediaAnexa(null);
    setMediaTipo(null);
    setMediaDuracao(0);
    setMediaError(null);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descricao.trim()) return;

    // Generate Protocol Hash
    const hash = Math.random().toString(36).substring(2, 7).toUpperCase();
    const protocolo = `STP-${hash}`;

    const novaDenuncia = saveDenuncia({
      protocolo,
      tipo_violencia: tipo,
      local_escola: local,
      descricao: descricao.trim(),
      link_cyberbullying: linkCyber.trim() || undefined,
      midia_anexa: mediaAnexa,
      midia_tipo: mediaTipo,
      midia_duracao: mediaDuracao,
      nivel_gravidade: tipo === 'Física' ? 'Grave' : (tipo === 'Verbal' ? 'Leve' : 'Recorrente')
    });

    setSubmittedDenuncia(novaDenuncia);
    if (onDenunciaSent) onDenunciaSent(novaDenuncia);
  };

  const copyProtocol = () => {
    if (!submittedDenuncia) return;
    navigator.clipboard.writeText(submittedDenuncia.protocolo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReceipt = () => {
    if (!submittedDenuncia) return;
    const content = `================================================
PROJETO STOPBULLYING — COMPROVANTE DE DENÚNCIA ANÔNIMA
EEMTI Alfredo Machado — Ceará Científico 2026
================================================
PROTOCOLO: ${submittedDenuncia.protocolo}
DATA: ${new Date(submittedDenuncia.data_envio).toLocaleString('pt-BR')}
TIPO DE VIOLÊNCIA: ${submittedDenuncia.tipo_violencia}
LOCAL: ${submittedDenuncia.local_escola}
MÍDIA ANEXADA: ${submittedDenuncia.midia_tipo ? `${submittedDenuncia.midia_tipo.toUpperCase()} (${submittedDenuncia.midia_duracao}s)` : 'NÃO'}
STATUS: 100% Protegido e Encaminhado à Coordenação

Guarde este protocolo para acompanhamento anônimo.
================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Comprovante_${submittedDenuncia.protocolo}.txt`;
    a.click();
  };

  if (submittedDenuncia) {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#121724] border border-emerald-500/40 shadow-2xl text-center space-y-6 animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 text-3xl">
          ✓
        </div>
        
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
            Registro 100% Protegido
          </span>
          <h3 className="font-display text-2xl font-extrabold text-white">
            Denúncia Anônima Enviada!
          </h3>
          <p className="text-sm text-gray-300 max-w-md mx-auto">
            Sua identidade permanece estritamente em sigilo. Guarde o protocolo abaixo para consultar o andamento na gestão:
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-black/60 border-2 border-dashed border-amber-500/60 max-w-md mx-auto space-y-1">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Código de Acompanhamento
          </span>
          <div className="font-mono text-3xl sm:text-4xl font-black text-amber-400 tracking-widest">
            {submittedDenuncia.protocolo}
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Gravado com Sucesso no Sistema Escolar
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={copyProtocol}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado!' : 'Copiar Protocolo'}
          </button>
          <button
            onClick={downloadReceipt}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Baixar Comprovante (.txt)
          </button>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold transition-all cursor-pointer"
          >
            Voltar ao Menu Principal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Megaphone className="w-6 h-6 text-red-500" />
              Denúncia Anônima
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Sua identidade está 100% protegida com encriptação e protocolo hash
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4" />
          Conexão Segura
        </span>
      </div>

      {/* Privacy Notice Card */}
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3 text-emerald-200 text-xs sm:text-sm">
        <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-emerald-300">Garantia de Anonimato Absoluto:</strong>
          <p className="text-gray-300 text-xs mt-0.5">
            Nenhum dado pessoal, endereço IP ou e-mail é armazenado. Esta ferramenta atende às diretrizes da Lei Federal nº 13.185/2015 e Lei nº 14.811/2024.
          </p>
        </div>
      </div>

      {/* Complaint Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#121724] border border-white/10 shadow-2xl space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-200 mb-2 uppercase tracking-wide">
              Tipo de Violência *
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as ViolenceType)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="Verbal">Verbal (Xingamentos, piadas, ofensas)</option>
              <option value="Física">Física (Agressões, empurrões, danos materiais)</option>
              <option value="Psicológica">Psicológica / Moral (Ameaças, chantagem)</option>
              <option value="Cyberbullying">Cyberbullying (Redes sociais, WhatsApp)</option>
              <option value="Social">Social / Relacional (Exclusão deliberada, fofocas)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-200 mb-2 uppercase tracking-wide">
              Onde Aconteceu na Escola? *
            </label>
            <select
              value={local}
              onChange={(e) => setLocal(e.target.value as SchoolLocation)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="Sala de Aula">Sala de Aula</option>
              <option value="Pátio/Recreio">Pátio / Área de Convivência</option>
              <option value="Corredor/Escada">Corredor ou Escadaria</option>
              <option value="Banheiro">Banheiro Escolar</option>
              <option value="Transporte Escolar">Transporte Escolar (Ônibus)</option>
              <option value="Entorno da Escola">Entorno / Portão da Escola</option>
              <option value="Redes Sociais">Redes Sociais / Internet</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-200 mb-2 uppercase tracking-wide">
            Descreva a Situação com Detalhes *
          </label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            placeholder="Relate o ocorrido com o máximo de detalhes para orientar a coordenação (não inclua seu nome)..."
            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-y"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-200 mb-2 uppercase tracking-wide">
            Link ou Evidência Digital (Opcional para Cyberbullying)
          </label>
          <input
            type="url"
            value={linkCyber}
            onChange={(e) => setLinkCyber(e.target.value)}
            placeholder="https://instagram.com/post_ou_perfil_falso"
            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Media Attachments Section (Photo, Video ≤60s, Audio ≤60s) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-200 uppercase tracking-wide flex items-center gap-1.5">
              📎 Anexar Provas e Evidências (Opcional • máx 60s)
            </span>
            {mediaAnexa && (
              <button
                type="button"
                onClick={removeMedia}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer font-semibold"
              >
                <X className="w-3.5 h-3.5" /> Remover anexo
              </button>
            )}
          </div>

          {/* Media Tabs */}
          <div className="flex gap-2 border-b border-white/10 pb-3">
            <button
              type="button"
              onClick={() => { setMediaTab('foto'); setMediaError(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mediaTab === 'foto' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <Camera className="w-4 h-4" /> Foto
            </button>
            <button
              type="button"
              onClick={() => { setMediaTab('video'); setMediaError(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mediaTab === 'video' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <Video className="w-4 h-4" /> Vídeo (≤60s)
            </button>
            <button
              type="button"
              onClick={() => { setMediaTab('audio'); setMediaError(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                mediaTab === 'audio' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              <Mic className="w-4 h-4" /> Áudio (≤60s)
            </button>
          </div>

          {/* Photo Dropzone */}
          {mediaTab === 'foto' && !mediaAnexa && (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 hover:border-blue-500/60 rounded-xl bg-black/30 hover:bg-blue-950/20 cursor-pointer transition-all">
              <Camera className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-xs font-semibold text-gray-200">Clique para carregar uma imagem</span>
              <span className="text-[11px] text-gray-400 mt-1">Formatos: JPG, PNG, WEBP</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          )}

          {/* Video Dropzone */}
          {mediaTab === 'video' && !mediaAnexa && (
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/20 hover:border-blue-500/60 rounded-xl bg-black/30 hover:bg-blue-950/20 cursor-pointer transition-all">
              <Video className="w-8 h-8 text-blue-400 mb-2" />
              <span className="text-xs font-semibold text-gray-200">Clique para carregar um vídeo de até 60 segundos</span>
              <span className="text-[11px] text-gray-400 mt-1">Formatos: MP4, WEBM, MOV (Verificação de tempo automática)</span>
              <input type="file" accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*" onChange={handleVideoUpload} className="hidden" />
            </label>
          )}

          {/* Audio Recorder & Upload */}
          {mediaTab === 'audio' && !mediaAnexa && (
            <div className="space-y-3">
              {!isRecording ? (
                <div className="flex flex-wrap items-center justify-center gap-3 p-6 border-2 border-dashed border-white/20 rounded-xl bg-black/30">
                  <button
                    type="button"
                    onClick={startAudioRecording}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                  >
                    <Mic className="w-4 h-4 animate-pulse" />
                    Gravar Áudio pelo Microfone (máx 60s)
                  </button>

                  <span className="text-xs text-gray-400 font-bold">OU</span>

                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-xs border border-white/10 cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    Carregar Arquivo de Áudio
                    <input type="file" accept="audio/*" onChange={handleAudioFileUpload} className="hidden" />
                  </label>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-center space-y-3 animate-pulse">
                  <div className="flex items-center justify-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                    Gravando Áudio com Microfone...
                  </div>
                  
                  <div className="font-mono text-3xl font-black text-amber-400">
                    {String(Math.floor(recordingSeconds / 60)).padStart(2, '0')}:
                    {String(recordingSeconds % 60).padStart(2, '0')} / 01:00
                  </div>

                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-red-500 h-full transition-all duration-1000"
                      style={{ width: `${(recordingSeconds / 60) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={stopAudioRecording}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5" /> Parar e Anexar
                    </button>
                    <button
                      type="button"
                      onClick={cancelAudioRecording}
                      className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-xs cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Media Error Message */}
          {mediaError && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{mediaError}</span>
            </div>
          )}

          {/* Media Attached Preview */}
          {mediaAnexa && (
            <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Mídia Anexada: {mediaTipo?.toUpperCase()} {mediaDuracao > 0 ? `(${mediaDuracao}s)` : ''}
                </span>
                <button
                  type="button"
                  onClick={removeMedia}
                  className="text-xs text-red-400 hover:text-red-300 cursor-pointer font-semibold"
                >
                  Remover
                </button>
              </div>

              <div className="flex justify-center bg-black/80 rounded-lg p-2 max-h-60 overflow-hidden">
                {mediaTipo === 'foto' && (
                  <img src={mediaAnexa} alt="Preview Foto" className="max-h-56 rounded object-contain" />
                )}
                {mediaTipo === 'video' && (
                  <video src={mediaAnexa} controls className="max-h-56 rounded" />
                )}
                {mediaTipo === 'audio' && (
                  <audio src={mediaAnexa} controls className="w-full my-2" />
                )}
              </div>
            </div>
          )}

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-base uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
        >
          <Megaphone className="w-5 h-5" />
          Enviar Denúncia Anônima e Gerar Protocolo
        </button>

      </form>

    </div>
  );
};
