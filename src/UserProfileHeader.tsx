import React from 'react';
import { useApp } from './AppContext';
import { AvatarRenderer } from './AvatarRenderer';
import { Shield, Sparkles } from 'lucide-react';

interface UserProfileHeaderProps {
  onOpenProfile: () => void;
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ onOpenProfile }) => {
  const { userProfile, studentIdentity } = useApp();

  const xpPercent = Math.min(100, Math.round((userProfile.currentXp / userProfile.nextLevelXp) * 100));

  return (
    <button
      onClick={onOpenProfile}
      className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#121829] hover:bg-[#1a233a] border border-purple-500/40 transition-all text-left shadow-lg cursor-pointer group focus:outline-none"
      title="Abrir Meu Perfil & Minha Coleção"
    >
      <AvatarRenderer
        iconId={userProfile.equippedIconId}
        frameId={userProfile.equippedFrameId}
        badgeId={userProfile.equippedBadgeId}
        effectId={userProfile.equippedEffectId}
        size="sm"
        showBadge={false}
      />

      <div className="flex flex-col pr-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-black text-white group-hover:text-purple-300 transition-colors">
            Nível {userProfile.currentLevel}
          </span>
          <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            {userProfile.currentXp} XP
          </span>
        </div>

        <div className="w-20 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5 border border-white/10">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>
    </button>
  );
};
