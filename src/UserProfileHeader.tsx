import React from 'react';
import { useApp } from './AppContext';
import { AvatarRenderer } from './AvatarRenderer';
import { COSMETICS_CATALOG } from './cosmeticsRewards';
import { Sparkles, Zap } from 'lucide-react';

interface UserProfileHeaderProps {
  onOpenProfile: () => void;
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ onOpenProfile }) => {
  const { userProfile } = useApp();

  const xpPercent = Math.min(100, Math.round((userProfile.currentXp / userProfile.nextLevelXp) * 100));
  const equippedTitleObj = COSMETICS_CATALOG.find(c => c.id === userProfile.equippedTitleId);
  const titleName = equippedTitleObj?.name || userProfile.levelTitle || 'Pacificador Escolar';
  const equippedBadgeObj = COSMETICS_CATALOG.find(c => c.id === userProfile.equippedBadgeId);

  return (
    <button
      onClick={onOpenProfile}
      className="group relative flex items-center gap-2 px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-100 via-indigo-50 to-pink-100 hover:from-purple-200 hover:to-pink-200 border border-purple-300 hover:border-purple-400 shadow-sm transition-all text-left cursor-pointer focus:outline-none"
      title={`Perfil: ${titleName} (Nível ${userProfile.currentLevel}) - Clique para ver coleções e conquistas`}
    >
      {/* Avatar Container with Level Badge */}
      <div className="relative flex-shrink-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center relative">
          <AvatarRenderer
            iconId={userProfile.equippedIconId}
            frameId={userProfile.equippedFrameId}
            badgeId={userProfile.equippedBadgeId}
            effectId={userProfile.equippedEffectId}
            size="sm"
            showBadge={false}
          />
        </div>
        <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#1a0800] text-[8px] font-black border border-amber-200 shadow-sm flex items-center justify-center leading-none">
          {userProfile.currentLevel}
        </div>
      </div>

      {/* Info Column - Only Highlighted Title & XP Progress */}
      <div className="flex flex-col pr-1 min-w-0">
        {/* Highlighted Title Row (No username) */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-[13px] font-black tracking-wide text-purple-950 group-hover:text-purple-900 transition-colors flex items-center gap-1 truncate max-w-[120px] sm:max-w-[170px]">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-600 flex-shrink-0 animate-pulse" />
            <span className="truncate">{titleName}</span>
          </span>

          {equippedBadgeObj && (
            <span className="hidden xs:inline-flex items-center justify-center text-[10px]" title={equippedBadgeObj.name}>
              🛡️
            </span>
          )}
        </div>

        {/* Level & XP Progress Row */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[9px] font-black text-purple-700 flex items-center gap-0.5 flex-shrink-0">
            <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
            Nv. {userProfile.currentLevel}
          </span>

          <div className="w-12 sm:w-20 bg-purple-200/70 h-1.5 rounded-full overflow-hidden border border-purple-300 p-[0.5px] flex-shrink-0">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <span className="text-[8.5px] font-mono text-purple-700 font-bold hidden sm:inline-block">
            {userProfile.currentXp}/{userProfile.nextLevelXp} XP
          </span>
        </div>
      </div>
    </button>
  );
};

