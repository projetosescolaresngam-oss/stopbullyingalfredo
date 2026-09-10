import React, { useState } from 'react';
import { saveSOSAlert } from '../services/storageService';
import { 
  AlertTriangle, 
  ArrowLeft, 
  MapPin, 
  Gamepad2, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2,
  Radio
} from 'lucide-react';

interface SOSModuleProps {
  onBack: () => void;
  onOpenCamouflage: () => void;
}

export const SOSModule: React.FC<SOSModuleProps> = ({ onBack, onOpenCamouflage }) => {
  const [loadingGPS, setLoadingGPS] = useState(false);
  const [gpsData, setGpsData] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
  } | null>(null);
  const [sosSent, setSosSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTriggerSOS = () => {
    setLoadingGPS(true);
    setErrorMessage(null);

    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Web Client';

    if (!navigator.geolocation) {
      setErrorMessage('GPS não suportado neste navegador. Alerta emergencial básico registrado.');
      saveSOSAlert({
        dispositivo_info: userAgent
      });
      setSosSent(true);
      setLoadingGPS(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy;

        setGpsData({
          latitude: lat,
          longitude: lng,
          accuracy: acc
        });

        saveSOSAlert({
          latitude: lat,
          longitude: lng,
          precisao_metros: acc,
          dispositivo_info: userAgent
        });

        setSosSent(true);
        setLoadingGPS(false);
      },
      (err) => {
        setErrorMessage(`Não foi possível obter coordenadas exatas: ${err.message}. Alerta transmitido com registro geral.`);
        saveSOSAlert({
          dispositivo_info: userAgent
        });
        setSosSent(true);
        setLoadingGPS(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn text-center">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-200/70 text-left">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#241e33] border border-purple-200/80 shadow-sm transition-all cursor-pointer"
            title="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-[#241e33] flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-rose-500 animate-pulse" />
              Socorro Emergencial (SOS GPS)
            </h2>
            <p className="text-xs sm:text-sm text-[#5c546d]">
              Transmissão rápida de localização e alerta para a gestão escolar da EEMTI Alfredo Machado
            </p>
          </div>
        </div>
      </div>

      {/* Main Panic Button Card */}
      <div className="p-8 rounded-3xl bg-white/90 border border-purple-200/80 shadow-[0_8px_30px_rgba(124,58,237,0.08)] backdrop-blur-md flex flex-col items-center justify-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-rose-800 text-xs font-bold">
          <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          Canal de Emergência Imediata
        </div>

        <button
          onClick={handleTriggerSOS}
          disabled={loadingGPS}
          className="relative group w-44 h-44 rounded-full bg-gradient-to-br from-rose-500 via-rose-600 to-red-600 border-4 border-white shadow-[0_10px_35px_rgba(244,63,94,0.4)] flex flex-col items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-75"
        >
          <div className="absolute inset-0 rounded-full border-4 border-rose-400 animate-ping opacity-60 pointer-events-none" />
          <Radio className="w-12 h-12 mb-1 animate-pulse" />
          <span className="font-display font-black text-xl tracking-wider">
            {loadingGPS ? 'LOCALIZANDO...' : 'ACIONAR SOS'}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-100">
            EMERGÊNCIA
          </span>
        </button>

        <p className="text-xs sm:text-sm text-[#5c546d] max-w-md mx-auto leading-relaxed">
          Toque no botão vermelho acima em situação de perigo ou agressão para transmitir suas coordenadas de GPS em tempo real para a equipe da escola.
        </p>
      </div>

      {/* Confirmation & Coordinates Box */}
      {sosSent && (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-50/90 to-white border-2 border-rose-400 shadow-xl text-left space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 text-rose-700 font-display text-lg font-black">
            <ShieldAlert className="w-6 h-6 animate-pulse text-rose-600" />
            🚨 ALERTA SOS TRANSMITIDO COM SUCESSO!
          </div>

          <p className="text-xs sm:text-sm text-[#241e33] leading-relaxed">
            Seu chamado foi registrado na Central de Gestão da EEMTI Alfredo Machado com máxima prioridade.
          </p>

          {gpsData && (
            <div className="p-4 rounded-2xl bg-white/95 border border-purple-200/80 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#5c546d]">
                <span className="font-bold text-[#241e33]">Coordenadas GPS:</span>
                <span className="text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono font-bold">
                  Precisão: ±{gpsData.accuracy.toFixed(0)}m
                </span>
              </div>
              <div className="font-mono text-sm font-bold text-[#241e33] bg-purple-50/70 border border-purple-200/60 p-2.5 rounded-xl">
                Lat: {gpsData.latitude.toFixed(5)}, Lng: {gpsData.longitude.toFixed(5)}
              </div>
              
              <a
                href={`https://maps.google.com/?q=${gpsData.latitude},${gpsData.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all mt-2"
              >
                <MapPin className="w-4 h-4" />
                Abrir Posição no Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {errorMessage && (
            <div className="text-xs text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-300">
              {errorMessage}
            </div>
          )}
        </div>
      )}

      {/* Disguise Camouflage Button */}
      <div className="pt-4 border-t border-purple-200/70 space-y-3">
        <button
          onClick={onOpenCamouflage}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 hover:from-purple-950 hover:to-indigo-950 text-amber-300 border border-purple-700/60 font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-105 cursor-pointer"
        >
          <Gamepad2 className="w-5 h-5 text-amber-400" />
          🎮 Ativar Tela Discreta (Jogo Pac-Man Camuflado)
        </button>
        <p className="text-[11px] text-[#5c546d] max-w-sm mx-auto">
          Disfarça a tela do app instantaneamente com um jogo jogável de Pac-Man retrô para garantir sua total discrição.
        </p>
      </div>

    </div>
  );
};
