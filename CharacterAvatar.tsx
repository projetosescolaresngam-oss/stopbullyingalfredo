import React from 'react';
import { CharacterProfile } from '../../../data/narrativeStoriesData';

interface CharacterAvatarProps {
  type: CharacterProfile['avatarType'];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  type,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32 sm:w-40 sm:h-40'
  }[size];

  // Renderização de avatares com ilustrações SVG vetoriais detalhadas no estilo anime/visual novel escolar
  return (
    <div className={`relative flex items-center justify-center rounded-2xl overflow-hidden shadow-md flex-shrink-0 ${sizeClasses} ${className}`}>
      {type === 'aluna_oculos' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-purple-200 via-fuchsia-100 to-indigo-200">
          {/* Cabelo de fundo */}
          <path d="M25 45 C20 80, 25 110, 35 120 L85 120 C95 110, 100 80, 95 45 Z" fill="#2d2238" />
          {/* Ombros / Uniforme escolar da EEMTI */}
          <path d="M20 120 C25 95, 45 90, 60 90 C75 90, 95 95, 100 120 Z" fill="#f8fafc" />
          {/* Gola roxa e laço */}
          <path d="M45 90 L60 102 L75 90 L68 115 L52 115 Z" fill="#7e22ce" />
          <path d="M56 102 L64 102 L60 110 Z" fill="#c084fc" />
          {/* Pescoço */}
          <rect x="52" y="75" width="16" height="18" fill="#fed7aa" rx="4" />
          {/* Rosto */}
          <ellipse cx="60" cy="56" rx="26" ry="28" fill="#ffedd5" />
          {/* Cabelo frente / Franja */}
          <path d="M34 50 C38 30, 82 30, 86 50 C78 38, 68 40, 60 48 C52 40, 42 38, 34 50 Z" fill="#3b2d4a" />
          <path d="M30 45 C35 70, 38 85, 40 92 C36 80, 32 65, 30 45 Z" fill="#3b2d4a" />
          <path d="M90 45 C85 70, 82 85, 80 92 C84 80, 88 65, 90 45 Z" fill="#3b2d4a" />
          {/* Olhos expressivos */}
          <ellipse cx="48" cy="58" rx="5" ry="6" fill="#4c1d95" />
          <ellipse cx="72" cy="58" rx="5" ry="6" fill="#4c1d95" />
          <circle cx="49.5" cy="56" r="2" fill="#ffffff" />
          <circle cx="73.5" cy="56" r="2" fill="#ffffff" />
          {/* Sobrancelhas */}
          <path d="M43 50 Q48 48 53 51" stroke="#3b2d4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M67 51 Q72 48 77 50" stroke="#3b2d4a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Óculos elegantes roxos */}
          <rect x="40" y="52" width="16" height="13" rx="4" fill="none" stroke="#6b21a8" strokeWidth="2.2" />
          <rect x="64" y="52" width="16" height="13" rx="4" fill="none" stroke="#6b21a8" strokeWidth="2.2" />
          <path d="M56 57 L64 57" stroke="#6b21a8" strokeWidth="2" />
          {/* Nariz e Boca gentil */}
          <circle cx="60" cy="67" r="1" fill="#f97316" />
          <path d="M56 73 Q60 76 64 73" stroke="#e11d48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Blush suave nas bochechas */}
          <ellipse cx="42" cy="65" rx="4" ry="2" fill="#fda4af" opacity="0.6" />
          <ellipse cx="78" cy="65" rx="4" ry="2" fill="#fda4af" opacity="0.6" />
        </svg>
      )}

      {type === 'aluno_timido' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-sky-200 via-blue-100 to-indigo-200">
          {/* Cabelo castanho suave */}
          <path d="M30 48 C25 25, 95 25, 90 48 C94 65, 88 80, 85 85 L35 85 C32 80, 26 65, 30 48 Z" fill="#451a03" />
          {/* Uniforme escolar da EEMTI */}
          <path d="M22 120 C28 95, 45 90, 60 90 C75 90, 92 95, 98 120 Z" fill="#0284c7" />
          <path d="M48 90 L60 102 L72 90 Z" fill="#ffffff" />
          {/* Pescoço */}
          <rect x="52" y="75" width="16" height="18" fill="#ffedd5" rx="4" />
          {/* Rosto */}
          <ellipse cx="60" cy="58" rx="25" ry="27" fill="#ffedd5" />
          {/* Franja que cobre parte da testa */}
          <path d="M35 48 C42 35, 78 35, 85 48 C76 42, 65 48, 58 45 C50 48, 42 42, 35 48 Z" fill="#78350f" />
          {/* Olhos tímidos e sensíveis */}
          <ellipse cx="49" cy="58" rx="4.5" ry="5.5" fill="#0f172a" />
          <ellipse cx="71" cy="58" rx="4.5" ry="5.5" fill="#0f172a" />
          <circle cx="50" cy="56.5" r="1.6" fill="#ffffff" />
          <circle cx="72" cy="56.5" r="1.6" fill="#ffffff" />
          {/* Sobrancelhas preocupadas */}
          <path d="M44 51 Q48 53 53 50" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M67 50 Q72 53 76 51" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Boca tímida */}
          <path d="M57 73 Q60 72 63 73" stroke="#b45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {type === 'coordenadora' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-purple-300 via-violet-100 to-fuchsia-200">
          {/* Cabelo escuro preso elegante */}
          <circle cx="60" cy="38" r="32" fill="#1e1b4b" />
          <circle cx="60" cy="22" r="12" fill="#312e81" />
          {/* Blazer profissional roxo */}
          <path d="M18 120 C24 92, 45 88, 60 88 C75 88, 96 92, 102 120 Z" fill="#581c87" />
          <path d="M46 88 L60 108 L74 88 Z" fill="#f3e8ff" />
          {/* Colar com pingente ético */}
          <circle cx="60" cy="98" r="3" fill="#eab308" />
          {/* Pescoço */}
          <rect x="52" y="74" width="16" height="18" fill="#fed7aa" rx="4" />
          {/* Rosto sereno e maduro */}
          <ellipse cx="60" cy="56" rx="25" ry="27" fill="#fed7aa" />
          {/* Penteado elegante */}
          <path d="M36 45 C45 32, 75 32, 84 45 C78 38, 60 40, 36 45 Z" fill="#312e81" />
          {/* Olhos acolhedores e firmes */}
          <ellipse cx="48" cy="56" rx="4.5" ry="5.5" fill="#3b0764" />
          <ellipse cx="72" cy="56" rx="4.5" ry="5.5" fill="#3b0764" />
          <circle cx="49" cy="54.5" r="1.5" fill="#ffffff" />
          <circle cx="73" cy="54.5" r="1.5" fill="#ffffff" />
          {/* Sorriso acolhedor de mediadora */}
          <path d="M54 72 Q60 76 66 72" stroke="#9d174d" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Brincos de pérola */}
          <circle cx="34" cy="62" r="2.5" fill="#fef08a" />
          <circle cx="86" cy="62" r="2.5" fill="#fef08a" />
        </svg>
      )}

      {type === 'aluno_lider' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-amber-200 via-rose-100 to-orange-200">
          {/* Cabelo moderno arrepiado */}
          <path d="M32 45 C35 20, 85 20, 88 45 C92 35, 82 22, 60 22 C38 22, 28 35, 32 45 Z" fill="#0f172a" />
          {/* Moletom / Jaqueta esportiva */}
          <path d="M20 120 C26 92, 45 88, 60 88 C75 88, 94 92, 100 120 Z" fill="#dc2626" />
          <path d="M54 88 L60 120 L66 88 Z" fill="#1e293b" />
          {/* Pescoço */}
          <rect x="52" y="74" width="16" height="18" fill="#ffedd5" rx="4" />
          {/* Rosto com expressão confiante/desafiadora */}
          <ellipse cx="60" cy="56" rx="25" ry="27" fill="#ffedd5" />
          {/* Olhos afiados */}
          <ellipse cx="48" cy="56" rx="5" ry="5" fill="#1e293b" />
          <ellipse cx="72" cy="56" rx="5" ry="5" fill="#1e293b" />
          <circle cx="49.5" cy="54.5" r="1.5" fill="#ffffff" />
          <circle cx="73.5" cy="54.5" r="1.5" fill="#ffffff" />
          {/* Sobrancelhas franzidas/confiantes */}
          <path d="M43 49 L53 52" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <path d="M67 52 L77 49" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          {/* Sorriso lateral desafiador */}
          <path d="M55 72 Q62 74 67 70" stroke="#991b1b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {type === 'inspetor' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-emerald-200 via-teal-100 to-cyan-200">
          {/* Boné / Cabelo grisalho curto */}
          <circle cx="60" cy="38" r="28" fill="#334155" />
          <path d="M35 44 C45 32, 75 32, 85 44 Z" fill="#1e293b" />
          {/* Uniforme de apoio escolar */}
          <path d="M20 120 C26 92, 45 88, 60 88 C75 88, 94 92, 100 120 Z" fill="#047857" />
          <path d="M50 88 L60 102 L70 88 Z" fill="#f8fafc" />
          {/* Crachá */}
          <rect x="72" y="96" width="10" height="14" rx="2" fill="#fef08a" stroke="#065f46" strokeWidth="1" />
          {/* Pescoço */}
          <rect x="52" y="74" width="16" height="18" fill="#fed7aa" rx="4" />
          {/* Rosto protetor */}
          <ellipse cx="60" cy="58" rx="25" ry="27" fill="#fed7aa" />
          {/* Olhos atentos */}
          <ellipse cx="48" cy="57" rx="4" ry="4" fill="#0f172a" />
          <ellipse cx="72" cy="57" rx="4" ry="4" fill="#0f172a" />
          {/* Bigode respeitável e sorriso sereno */}
          <path d="M48 68 Q60 74 72 68" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M55 74 Q60 76 65 74" stroke="#0f172a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      )}

      {type === 'colega_apoio' && (
        <svg viewBox="0 0 120 120" className="w-full h-full bg-gradient-to-br from-pink-200 via-fuchsia-100 to-rose-200">
          <circle cx="60" cy="40" r="30" fill="#701a75" />
          <path d="M22 120 C28 95, 45 90, 60 90 C75 90, 92 95, 98 120 Z" fill="#a21caf" />
          <rect x="52" y="75" width="16" height="18" fill="#ffedd5" rx="4" />
          <ellipse cx="60" cy="58" rx="25" ry="27" fill="#ffedd5" />
          <ellipse cx="49" cy="58" rx="4.5" ry="5.5" fill="#4a044e" />
          <ellipse cx="71" cy="58" rx="4.5" ry="5.5" fill="#4a044e" />
          <path d="M55 72 Q60 76 65 72" stroke="#be185d" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};
