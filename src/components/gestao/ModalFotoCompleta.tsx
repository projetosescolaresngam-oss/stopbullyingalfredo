import React, { useEffect } from 'react';
import { X, Download, ExternalLink, Image as ImageIcon, ZoomIn, ShieldCheck } from 'lucide-react';

interface ModalFotoCompletaProps {
  fotoUrl: string;
  nomeArquivo?: string;
  protocolo?: string;
  tipoArquivo?: string;
  tamanhoArquivo?: string;
  onClose: () => void;
}

export const ModalFotoCompleta: React.FC<ModalFotoCompletaProps> = ({
  fotoUrl,
  nomeArquivo = 'evidencia_foto.png',
  protocolo,
  tipoArquivo = 'Foto / Evidência',
  tamanhoArquivo,
  onClose
}) => {
  // Fechar com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const link = document.createElement('a');
      link.href = fotoUrl;
      link.download = nomeArquivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.open(fotoUrl, '_blank');
    }
  };

  const handleOpenNewTab = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(fotoUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 overflow-hidden animate-fadeIn"
      onClick={onClose}
    >
      {/* BARRA SUPERIOR DE AÇÕES */}
      <div 
        className="w-full max-w-5xl flex items-center justify-between gap-3 bg-white/10 p-3 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-purple-600/40 border border-purple-400/40 flex items-center justify-center text-purple-300 flex-shrink-0">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm sm:text-base text-white truncate flex items-center gap-2">
              {nomeArquivo}
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-gray-300 font-mono">
              {protocolo && <span className="text-purple-300 font-bold">Protocolo: {protocolo}</span>}
              <span>•</span>
              <span className="uppercase text-emerald-400 font-semibold">{tipoArquivo}</span>
              {tamanhoArquivo && (
                <>
                  <span>•</span>
                  <span>{tamanhoArquivo}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-purple-600/30"
            title="Baixar Foto"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Baixar Foto</span>
          </button>

          <button
            type="button"
            onClick={handleOpenNewTab}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Abrir em Nova Aba"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Aba</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white transition-all cursor-pointer"
            title="Fechar Visualizador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ÁREA CENTRAL - EXIBIÇÃO DA FOTO COMPLETA */}
      <div 
        className="flex-1 w-full max-w-5xl flex items-center justify-center p-2 sm:p-4 my-2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-h-full max-w-full flex items-center justify-center group">
          <img 
            src={fotoUrl} 
            alt={nomeArquivo}
            className="max-h-[78vh] max-w-full object-contain rounded-2xl border border-white/20 shadow-2xl select-none"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* RODAPÉ DO VISUALIZADOR */}
      <div 
        className="w-full max-w-5xl flex items-center justify-between text-xs text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
          <ShieldCheck className="w-4 h-4" /> Evidência criptografada e preservada em alta resolução
        </span>
        <span className="text-[11px] text-gray-400">
          Clique fora da imagem ou pressione ESC para fechar
        </span>
      </div>
    </div>
  );
};
