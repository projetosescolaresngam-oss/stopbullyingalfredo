import React from 'react';
import { ViewMode } from '../types';
import { StopHandLogo } from './BrandingAssets';
import { UserProfileHeader } from '../UserProfileHeader';
import { 
  Home, 
  Megaphone, 
  HeartHandshake, 
  TrafficCone, 
  BookOpen, 
  AlertTriangle, 
  Microscope, 
  ShieldCheck,
  Images,
  Sparkles,
  Award,
  Layers,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenProfile }) => {
  const navItems: { id: ViewMode; label: string; icon: React.ReactNode; isSOS?: boolean; isHighlight?: boolean }[] = [
    { id: 'home', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'colecao', label: 'Minha Coleção', icon: <Layers className="w-4 h-4 text-amber-400" />, isHighlight: true },
    { id: 'conquistas', label: 'Conquistas', icon: <Award className="w-4 h-4 text-purple-400" /> },
    { id: 'educativo', label: 'Matriz AntiBullying', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'guia', label: 'Guia do Respeito', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'denuncia', label: 'Denúncia', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'apoio', label: 'Apoio Emocional', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'triagem', label: 'Triagem', icon: <TrafficCone className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'galeria', label: 'Fotos do Projeto', icon: <Images className="w-4 h-4" /> },
    { id: 'sos', label: 'SOS GPS', icon: <AlertTriangle className="w-4 h-4" />, isSOS: true },
    { id: 'ceara', label: 'Ceará Científico', icon: <Microscope className="w-4 h-4" /> },
    { id: 'gestao', label: 'Gestão Escolar', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 py-3 transition-all shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Badge */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group focus:outline-none flex-shrink-0"
        >
          <StopHandLogo size={42} className="transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tight text-white flex items-center gap-0.5">
              Stop<span className="text-red-500">Bullying</span>
            </span>
            <span className="text-[11px] text-blue-400 font-semibold tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              EEMTI Alfredo Machado • 2026
            </span>
          </div>
        </button>

        {/* Navigation Bar Pills */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 scrollbar-none max-w-full">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            
            if (item.isSOS) {
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-md ${
                    isActive 
                      ? 'bg-red-600 text-white shadow-red-500/50 ring-2 ring-red-400 animate-pulse' 
                      : 'bg-red-950/80 text-red-300 border border-red-800/80 hover:bg-red-900 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-blue-500/60 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                    : item.isHighlight
                    ? 'text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/5 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Header Component */}
        <div className="flex-shrink-0">
          <UserProfileHeader onOpenProfile={onOpenProfile} />
        </div>

      </div>
    </header>
  );
};
