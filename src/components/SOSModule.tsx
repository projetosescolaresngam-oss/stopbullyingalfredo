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
      <div className="flex items-center justify-between pb-4 border-b border-white/10 text-left">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-500 animate-pulse" />
              Socorro Emergencial (SOS GPS)
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Transmissão rápida de localização e alerta para a gestão escolar
            </p>
          </div>
        </div>
      </div>

      {/* Main Panic Button */}
      <div className="py-8 flex flex-col items-center justify-center space-y-4">
        <button
          onClick={handleTriggerSOS}
          disabled={loadingGPS}
          className="relative group w-44 h-44 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-red-900 border-4 border-white shadow-[0_0_50px_rgba(239,68,68,0.7)] flex flex-col items-center justify-center text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-75"
        >
          <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-60 pointer-events-none" />
          <Radio className="w-12 h-12 mb-1 animate-pulse" />
          <span className="font-display font-black text-xl tracking-wider">
            {loadingGPS ? 'LOCALIZANDO...' : 'ACIOAR SOS'}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-200">
            EMERGÊNCIA
          </span>
        </button>

        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
          Toque no botão vermelho acima em situação de perigo ou agressão para transmitir suas coordenadas de GPS em tempo real para a equipe da escola.
        </p>
      </div>

      {/* Confirmation & Coordinates Box */}
      {sosSent && (
        <div className="p-6 rounded-3xl bg-red-950/60 border-2 border-red-500 shadow-2xl text-left space-y-4 animate-fadeIn">
          <div className="flex items-center gap-3 text-red-400 font-display text-lg font-black">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            🚨 ALERTA SOS TRANSMITIDO COM SUCESSO!
          </div>

          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            Seu chamado foi registrado na Central de Gestão da EEMTI Alfredo Machado.
          </p>

          {gpsData && (
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span className="font-semibold text-gray-400">Coordenadas GPS:</span>
                <span className="text-emerald-400 font-mono font-bold">Precisão: ±{gpsData.accuracy.toFixed(0)}m</span>
              </div>
              <div className="font-mono text-sm font-bold text-white bg-white/5 p-2 rounded-lg">
                Lat: {gpsData.latitude.toFixed(5)}, Lng: {gpsData.longitude.toFixed(5)}
              </div>
              
              <a
                href={`https://maps.google.com/?q=${gpsData.latitude},${gpsData.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all mt-2"
              >
                <MapPin className="w-4 h-4" />
                Abrir Posição no Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {errorMessage && (
            <div className="text-xs text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-500/30">
              {errorMessage}
            </div>
          )}
        </div>
      )}

      {/* Disguise Camouflage Button */}
      <div className="pt-6 border-t border-white/10 space-y-3">
        <button
          onClick={onOpenCamouflage}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gray-800 hover:bg-gray-700 text-amber-300 border border-amber-500/40 font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
        >
          <Gamepad2 className="w-5 h-5 text-amber-400" />
          🎮 Ativar Tela Discreta (Jogo Pac-Man Camuflado)
        </button>
        <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
          Disfarça a tela do app instantaneamente com um jogo jogável de Pac-Man retrô para garantir sua total discrição.
        </p>
      </div>

    </div>
  );
};
