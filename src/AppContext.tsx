import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserGamificationProfile, 
  Achievement, 
  CosmeticItem, 
  AnonymousStudentIdentity 
} from './types';
import { COSMETICS_CATALOG } from './cosmeticsRewards';
import { INITIAL_ACHIEVEMENTS } from './achievementsData';
import { calculateLevelFromXp, LEVEL_PROGRESSION_TABLE } from './levelProgression';

interface UserProgressStats {
  viewedLaws: boolean;
  completedRespectModule: boolean;
  exploredBullyingTypes: string[];
  quizzesCompletedCount: number;
  perfectQuizzesCount: number;
  totalQuestionsAnswered: number;
  breathingSessionsCount: number;
  triagensExploredCount: number;
  empathyChoicesCount: number;
  securityChoicesCount: number;
  interactedWithCamouflage: boolean;
  interactedWithChat: boolean;
  areasVisited: string[];
}

interface AppContextType {
  userProfile: UserGamificationProfile;
  studentIdentity: AnonymousStudentIdentity;
  achievements: Achievement[];
  userStats: UserProgressStats;
  latestUnlockedAchievement: Achievement | null;
  latestUnlockedReward: CosmeticItem | null;
  awardXp: (amount: number, reason?: string) => void;
  equipCosmetic: (category: 'icon' | 'frame' | 'badge' | 'title' | 'effect', itemId: string) => void;
  recordQuizCompleted: (scorePercent: number, totalQuestions: number) => void;
  recordBreathingCompleted: () => void;
  recordTypeExplored: (typeId: string) => void;
  recordLawsViewed: () => void;
  recordRespectCompleted: () => void;
  recordTriagemExplored: (level: number) => void;
  recordEmpathyChoice: () => void;
  recordSecurityChoice: () => void;
  recordCamouflageUsed: () => void;
  recordAreaVisited: (areaKey: string) => void;
  closeAchievementModal: () => void;
  closeRewardModal: () => void;
  resetAllGamification: () => void;
}

const STORAGE_KEY_PROFILE = 'sentinela_cosmetics_profile_v2';
const STORAGE_KEY_ACHIEVEMENTS = 'sentinela_achievements_v3';
const STORAGE_KEY_STATS = 'sentinela_user_stats_v2';
const STORAGE_KEY_IDENTITY = 'sentinela_student_identity_v2';

const DEFAULT_PROFILE: UserGamificationProfile = {
  currentLevel: 1,
  currentXp: 0,
  nextLevelXp: 100,
  levelTitle: 'Sentinela Aprendiz',
  equippedIconId: 'icon_anonimo_padrao',
  equippedFrameId: 'frame_padrao_madeira',
  equippedBadgeId: 'badge_estrela_bronze',
  equippedTitleId: 'title_sentinela_aprendiz',
  equippedEffectId: 'effect_nenhum',
  unlockedCosmetics: [
    'icon_anonimo_padrao',
    'frame_padrao_madeira',
    'badge_estrela_bronze',
    'title_sentinela_aprendiz',
    'effect_nenhum',
    'icon_fatia_pizza'
  ]
};

const DEFAULT_STATS: UserProgressStats = {
  viewedLaws: false,
  completedRespectModule: false,
  exploredBullyingTypes: [],
  quizzesCompletedCount: 0,
  perfectQuizzesCount: 0,
  totalQuestionsAnswered: 0,
  breathingSessionsCount: 0,
  triagensExploredCount: 0,
  empathyChoicesCount: 0,
  securityChoicesCount: 0,
  interactedWithCamouflage: false,
  interactedWithChat: false,
  areasVisited: []
};

const generateAnonymousIdentity = (): AnonymousStudentIdentity => {
  const birds = ['Águia', 'Falcão', 'Coruja', 'Condor', 'Gavião', 'Fênix', 'Guardião'];
  const colors = ['Dourado', 'Prateado', 'Azul', 'Escarlate', 'Esmeralda', 'Astral'];
  const randBird = birds[Math.floor(Math.random() * birds.length)];
  const randColor = colors[Math.floor(Math.random() * colors.length)];
  const randCode = Math.floor(1000 + Math.random() * 9000);

  return {
    code: `Sentinela ${randBird} ${randColor} #${randCode}`,
    creationTimestamp: Date.now(),
    studentSeed: 'seed_' + Math.random().toString(36).substring(2, 9)
  };
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserGamificationProfile>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PROFILE);
      return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [studentIdentity] = useState<AnonymousStudentIdentity>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_IDENTITY);
      if (raw) return JSON.parse(raw);
      const generated = generateAnonymousIdentity();
      localStorage.setItem(STORAGE_KEY_IDENTITY, JSON.stringify(generated));
      return generated;
    } catch {
      return generateAnonymousIdentity();
    }
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
      if (raw) {
        const stored = JSON.parse(raw) as Achievement[];
        return INITIAL_ACHIEVEMENTS.map(initial => {
          const found = stored.find(s => s.id === initial.id);
          return found ? { ...initial, ...found } : initial;
        });
      }
      return INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  const [userStats, setUserStats] = useState<UserProgressStats>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_STATS);
      return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  const [latestUnlockedAchievement, setLatestUnlockedAchievement] = useState<Achievement | null>(null);
  const [latestUnlockedReward, setLatestUnlockedReward] = useState<CosmeticItem | null>(null);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  // Sync stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(userStats));
    } catch {}
  }, [userStats]);

  // Sync achievements to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
    } catch {}
  }, [achievements]);

  // Reavalia cosméticos e conquistas
  const checkAndAwardCosmetics = (currentLevel: number, currentAchievements: Achievement[], showRewardModal = true) => {
    const alreadyUnlocked = new Set(userProfile.unlockedCosmetics);
    const newlyUnlocked: CosmeticItem[] = [];

    COSMETICS_CATALOG.forEach(item => {
      if (alreadyUnlocked.has(item.id)) return;

      let shouldUnlock = false;

      if (item.unlockCondition.type === 'default') {
        shouldUnlock = true;
      } else if (item.unlockCondition.type === 'level' && item.unlockCondition.requiredLevel) {
        if (currentLevel >= item.unlockCondition.requiredLevel) {
          shouldUnlock = true;
        }
      } else if (item.unlockCondition.type === 'achievement' && item.unlockCondition.achievementId) {
        const ach = currentAchievements.find(a => a.id === item.unlockCondition.achievementId);
        if (ach && ach.isUnlocked) {
          shouldUnlock = true;
        }
      } else if (item.unlockCondition.type === 'quiz' && item.unlockCondition.quizScorePercent === 100) {
        if (userStats.perfectQuizzesCount >= 1) {
          shouldUnlock = true;
        }
      } else if (item.unlockCondition.type === 'breathing') {
        if (userStats.breathingSessionsCount >= 3) {
          shouldUnlock = true;
        }
      }

      if (shouldUnlock) {
        alreadyUnlocked.add(item.id);
        newlyUnlocked.push(item);
      }
    });

    if (newlyUnlocked.length > 0) {
      setUserProfile(prev => ({
        ...prev,
        unlockedCosmetics: Array.from(alreadyUnlocked)
      }));

      if (showRewardModal) {
        setLatestUnlockedReward(newlyUnlocked[0]);
      }
    }
  };

  const evaluateAchievements = (updatedStats: UserProgressStats, profileXp: number, currentLvl: number) => {
    setAchievements(prevAchievements => {
      let newlyUnlockedAch: Achievement | null = null;
      let hasAnyNewUnlock = false;

      const updated = prevAchievements.map(ach => {
        let isUnlocked = ach.isUnlocked;
        let currentProgress = ach.currentProgress;

        switch (ach.id) {
          case 'primeiro_passo_sabedoria':
            currentProgress = updatedStats.quizzesCompletedCount;
            if (currentProgress >= 1) isUnlocked = true;
            break;
          case 'detetive_bullying':
            currentProgress = updatedStats.viewedLaws ? 1 : 0;
            if (updatedStats.viewedLaws) isUnlocked = true;
            break;
          case 'respeito_em_acao':
            currentProgress = updatedStats.completedRespectModule ? 1 : 0;
            if (updatedStats.completedRespectModule) isUnlocked = true;
            break;
          case 'guardiao_digital':
            currentProgress = updatedStats.exploredBullyingTypes.includes('cyberbullying') ? 1 : 0;
            if (currentProgress >= 1) isUnlocked = true;
            break;
          case 'mente_tranquila':
            currentProgress = updatedStats.breathingSessionsCount;
            if (currentProgress >= 1) isUnlocked = true;
            break;
          case 'gabarito_de_mestre':
            currentProgress = updatedStats.perfectQuizzesCount;
            if (currentProgress >= 1) isUnlocked = true;
            break;
          case 'explorador_de_rotas':
            currentProgress = updatedStats.triagensExploredCount;
            if (currentProgress >= 2) isUnlocked = true;
            break;
          case 'mediador_da_paz':
            currentProgress = updatedStats.empathyChoicesCount;
            if (currentProgress >= 3) isUnlocked = true;
            break;
          case 'escudo_inabalavel':
            currentProgress = updatedStats.securityChoicesCount;
            if (currentProgress >= 3) isUnlocked = true;
            break;
          case 'mestre_zen':
            currentProgress = updatedStats.breathingSessionsCount;
            if (currentProgress >= 3) isUnlocked = true;
            break;
          case 'oraculo_do_saber':
            currentProgress = updatedStats.quizzesCompletedCount;
            if (currentProgress >= 3) isUnlocked = true;
            break;
          case 'estrategista_escolar':
            currentProgress = updatedStats.triagensExploredCount;
            if (currentProgress >= 3) isUnlocked = true;
            break;
          case 'farol_da_empatia':
            currentProgress = updatedStats.completedRespectModule ? updatedStats.empathyChoicesCount : 0;
            if (updatedStats.completedRespectModule && updatedStats.empathyChoicesCount >= 5) isUnlocked = true;
            break;
          case 'bastiao_da_seguranca':
            currentProgress = updatedStats.viewedLaws ? updatedStats.securityChoicesCount : 0;
            if (updatedStats.viewedLaws && updatedStats.securityChoicesCount >= 5) isUnlocked = true;
            break;
          case 'monge_da_harmonia':
            currentProgress = updatedStats.breathingSessionsCount;
            if (updatedStats.breathingSessionsCount >= 5) isUnlocked = true;
            break;
          case 'doutor_da_etica':
            currentProgress = updatedStats.perfectQuizzesCount;
            if (currentProgress >= 1 && updatedStats.quizzesCompletedCount >= 5) isUnlocked = true;
            break;
          case 'guardiao_supremo':
            const pilares = (updatedStats.viewedLaws ? 1 : 0) + 
                            (updatedStats.completedRespectModule ? 1 : 0) + 
                            (updatedStats.quizzesCompletedCount >= 1 ? 1 : 0) + 
                            (updatedStats.breathingSessionsCount >= 1 ? 1 : 0);
            currentProgress = pilares;
            if (pilares >= 4) isUnlocked = true;
            break;
          case 'explorador_tipos':
          case 'explorador_total_matriz':
            currentProgress = updatedStats.exploredBullyingTypes.length;
            if (currentProgress >= 8) isUnlocked = true;
            break;
          case 'maratona_questoes':
            currentProgress = updatedStats.totalQuestionsAnswered;
            if (currentProgress >= 20) isUnlocked = true;
            break;
          case 'desafio_perfeito':
            currentProgress = updatedStats.perfectQuizzesCount;
            if (currentProgress >= 2) isUnlocked = true;
            break;
          case 'sentinela_zen':
            currentProgress = updatedStats.breathingSessionsCount;
            if (currentProgress >= 8) isUnlocked = true;
            break;
          case 'multiverso_simulacoes':
          case 'arquiteto_do_destino':
            currentProgress = updatedStats.triagensExploredCount;
            if (currentProgress >= 3) isUnlocked = true;
            break;
          case 'veterano_questoes':
            currentProgress = updatedStats.totalQuestionsAnswered;
            if (currentProgress >= 40) isUnlocked = true;
            break;
          case 'oraculo_cinco_estrelas':
            currentProgress = updatedStats.perfectQuizzesCount;
            if (currentProgress >= 3) isUnlocked = true;
            break;
          case 'combo_iniciante_sentinela':
            const comboCount = (updatedStats.viewedLaws ? 1 : 0) +
                               (updatedStats.completedRespectModule ? 1 : 0) +
                               (updatedStats.quizzesCompletedCount >= 2 ? 1 : 0) +
                               (updatedStats.triagensExploredCount >= 2 ? 1 : 0);
            currentProgress = comboCount;
            if (comboCount >= 4) isUnlocked = true;
            break;
          case 'empatia_inabalavel':
            currentProgress = updatedStats.empathyChoicesCount;
            if (currentProgress >= 8) isUnlocked = true;
            break;
          case 'mente_inabalavel':
            currentProgress = updatedStats.breathingSessionsCount;
            if (currentProgress >= 6) isUnlocked = true;
            break;
          case 'escudo_de_ouro_decisao':
            currentProgress = updatedStats.securityChoicesCount;
            if (currentProgress >= 8) isUnlocked = true;
            break;
          case 'nivel_cinco_guardiao':
            currentProgress = currentLvl;
            if (currentLvl >= 5) isUnlocked = true;
            break;
          case 'conhecedor_total_quizzes':
            currentProgress = updatedStats.perfectQuizzesCount;
            if (currentProgress >= 5) isUnlocked = true;
            break;
          case 'explorador_segredos_sim':
            currentProgress = updatedStats.interactedWithCamouflage ? 1 : 0;
            if (updatedStats.interactedWithCamouflage) isUnlocked = true;
            break;
          case 'missao_cumprida_maratonista':
            currentProgress = updatedStats.totalQuestionsAnswered;
            if (currentProgress >= 60) isUnlocked = true;
            break;
          case 'harmonia_plena':
            currentProgress = updatedStats.breathingSessionsCount;
            if (currentProgress >= 10) isUnlocked = true;
            break;
          case 'nivel_dez_comandante':
            currentProgress = currentLvl;
            if (currentLvl >= 10) isUnlocked = true;
            break;
          case 'diplomata_da_paz':
            currentProgress = updatedStats.empathyChoicesCount;
            if (currentProgress >= 15) isUnlocked = true;
            break;
          case 'guardiao_blindado_escola':
            currentProgress = updatedStats.securityChoicesCount;
            if (currentProgress >= 15) isUnlocked = true;
            break;
          case 'nivel_quinze_lorde':
            currentProgress = currentLvl;
            if (currentLvl >= 15) isUnlocked = true;
            break;
          case 'mestre_absoluto_sentinela':
            const mestreOk = currentLvl >= 12 && 
                             updatedStats.perfectQuizzesCount >= 2 && 
                             updatedStats.viewedLaws && 
                             updatedStats.completedRespectModule;
            currentProgress = (currentLvl >= 12 ? 1 : 0) + (updatedStats.perfectQuizzesCount >= 1 ? 1 : 0) + (updatedStats.viewedLaws ? 1 : 0);
            if (mestreOk) isUnlocked = true;
            break;
          case 'lenda_viva_sentinela':
            currentProgress = currentLvl;
            if (currentLvl >= 18 && profileXp >= 2500) isUnlocked = true;
            break;

          // SECRETAS (44 a 51)
          case 'secret_detetive_sentinela':
            const detetiveScore = (updatedStats.viewedLaws ? 1 : 0) + 
                                  (updatedStats.exploredBullyingTypes.length >= 4 ? 1 : 0) + 
                                  (updatedStats.quizzesCompletedCount >= 1 ? 1 : 0) +
                                  (updatedStats.triagensExploredCount >= 1 ? 1 : 0);
            currentProgress = detetiveScore;
            if (detetiveScore >= 4) isUnlocked = true;
            break;
          case 'secret_combo_conhecimento':
            const comboScore = (updatedStats.quizzesCompletedCount >= 3 ? 1 : 0) + 
                               (updatedStats.completedRespectModule ? 1 : 0) + 
                               (updatedStats.triagensExploredCount >= 2 ? 1 : 0);
            currentProgress = comboScore;
            if (comboScore >= 3) isUnlocked = true;
            break;
          case 'secret_mente_atenta':
            currentProgress = updatedStats.totalQuestionsAnswered;
            if (currentProgress >= 25) isUnlocked = true;
            break;
          case 'secret_codigo_secreto':
            const codScore = (updatedStats.exploredBullyingTypes.length >= 6 ? 1 : 0) + 
                             (updatedStats.breathingSessionsCount >= 2 ? 1 : 0) + 
                             (updatedStats.empathyChoicesCount >= 1 ? 1 : 0);
            currentProgress = codScore;
            if (codScore >= 3) isUnlocked = true;
            break;
          case 'secret_sentinela_empatia':
            const empScore = (updatedStats.completedRespectModule ? 1 : 0) + 
                             (updatedStats.empathyChoicesCount >= 6 ? 1 : 0);
            currentProgress = empScore;
            if (empScore >= 2) isUnlocked = true;
            break;
          case 'secret_precisao_absoluta':
            const precScore = (updatedStats.perfectQuizzesCount >= 2 ? 1 : 0) + 
                              (updatedStats.triagensExploredCount >= 3 ? 1 : 0);
            currentProgress = precScore;
            if (precScore >= 2) isUnlocked = true;
            break;
          case 'secret_explorador_noturno_areas':
            currentProgress = updatedStats.areasVisited.length;
            if (currentProgress >= 6) isUnlocked = true;
            break;
          case 'secret_lenda_oculta':
            const lendaScore = (currentLvl >= 8 ? 1 : 0) + 
                               (updatedStats.quizzesCompletedCount >= 3 ? 1 : 0) + 
                               (updatedStats.triagensExploredCount >= 3 ? 1 : 0);
            currentProgress = lendaScore;
            if (lendaScore >= 3) isUnlocked = true;
            break;
          default:
            break;
        }

        if (!ach.isUnlocked && isUnlocked) {
          hasAnyNewUnlock = true;
          newlyUnlockedAch = { ...ach, isUnlocked: true, currentProgress };
          return newlyUnlockedAch;
        }

        return { ...ach, isUnlocked, currentProgress };
      });

      if (hasAnyNewUnlock && newlyUnlockedAch) {
        setLatestUnlockedAchievement(newlyUnlockedAch);
        const xp = (newlyUnlockedAch as Achievement).xpReward || 50;
        
        // Concede XP e avalia cosméticos
        setUserProfile(p => {
          const newXp = p.currentXp + xp;
          const { currentLevel, nextLevelXp, levelTitle } = calculateLevelFromXp(newXp);
          const updatedProf = { ...p, currentXp: newXp, currentLevel, nextLevelXp, levelTitle };
          checkAndAwardCosmetics(currentLevel, updated, false);
          return updatedProf;
        });
      }

      return updated;
    });
  };

  const awardXp = (amount: number, reason?: string) => {
    setUserProfile(prev => {
      const newXp = prev.currentXp + amount;
      const { currentLevel, nextLevelXp, levelTitle } = calculateLevelFromXp(newXp);
      const updated = {
        ...prev,
        currentXp: newXp,
        currentLevel,
        nextLevelXp,
        levelTitle
      };
      checkAndAwardCosmetics(currentLevel, achievements, true);
      return updated;
    });
  };

  const equipCosmetic = (category: 'icon' | 'frame' | 'badge' | 'title' | 'effect', itemId: string) => {
    setUserProfile(prev => {
      const keyMap: Record<string, string> = {
        icon: 'equippedIconId',
        frame: 'equippedFrameId',
        badge: 'equippedBadgeId',
        title: 'equippedTitleId',
        effect: 'equippedEffectId'
      };
      const field = keyMap[category] as keyof UserGamificationProfile;
      return {
        ...prev,
        [field]: itemId
      };
    });
  };

  const recordQuizCompleted = (scorePercent: number, totalQuestions: number) => {
    setUserStats(prev => {
      const isPerfect = scorePercent === 100;
      const updated: UserProgressStats = {
        ...prev,
        quizzesCompletedCount: prev.quizzesCompletedCount + 1,
        perfectQuizzesCount: isPerfect ? prev.perfectQuizzesCount + 1 : prev.perfectQuizzesCount,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + totalQuestions
      };
      
      const xpGained = isPerfect ? 60 : 35;
      awardXp(xpGained);
      evaluateAchievements(updated, userProfile.currentXp + xpGained, userProfile.currentLevel);
      return updated;
    });
  };

  const recordBreathingCompleted = () => {
    setUserStats(prev => {
      const updated = {
        ...prev,
        breathingSessionsCount: prev.breathingSessionsCount + 1
      };
      awardXp(20);
      evaluateAchievements(updated, userProfile.currentXp + 20, userProfile.currentLevel);
      return updated;
    });
  };

  const recordTypeExplored = (typeId: string) => {
    setUserStats(prev => {
      if (prev.exploredBullyingTypes.includes(typeId)) return prev;
      const updated = {
        ...prev,
        exploredBullyingTypes: [...prev.exploredBullyingTypes, typeId]
      };
      awardXp(15);
      evaluateAchievements(updated, userProfile.currentXp + 15, userProfile.currentLevel);
      return updated;
    });
  };

  const recordLawsViewed = () => {
    setUserStats(prev => {
      if (prev.viewedLaws) return prev;
      const updated = { ...prev, viewedLaws: true };
      awardXp(25);
      evaluateAchievements(updated, userProfile.currentXp + 25, userProfile.currentLevel);
      return updated;
    });
  };

  const recordRespectCompleted = () => {
    setUserStats(prev => {
      if (prev.completedRespectModule) return prev;
      const updated = { ...prev, completedRespectModule: true };
      awardXp(30);
      evaluateAchievements(updated, userProfile.currentXp + 30, userProfile.currentLevel);
      return updated;
    });
  };

  const recordTriagemExplored = (level: number) => {
    setUserStats(prev => {
      const updated = {
        ...prev,
        triagensExploredCount: Math.max(prev.triagensExploredCount, level)
      };
      awardXp(20);
      evaluateAchievements(updated, userProfile.currentXp + 20, userProfile.currentLevel);
      return updated;
    });
  };

  const recordEmpathyChoice = () => {
    setUserStats(prev => {
      const updated = {
        ...prev,
        empathyChoicesCount: prev.empathyChoicesCount + 1
      };
      awardXp(10);
      evaluateAchievements(updated, userProfile.currentXp + 10, userProfile.currentLevel);
      return updated;
    });
  };

  const recordSecurityChoice = () => {
    setUserStats(prev => {
      const updated = {
        ...prev,
        securityChoicesCount: prev.securityChoicesCount + 1
      };
      awardXp(10);
      evaluateAchievements(updated, userProfile.currentXp + 10, userProfile.currentLevel);
      return updated;
    });
  };

  const recordCamouflageUsed = () => {
    setUserStats(prev => {
      const updated = { ...prev, interactedWithCamouflage: true };
      awardXp(25);
      evaluateAchievements(updated, userProfile.currentXp + 25, userProfile.currentLevel);
      return updated;
    });
  };

  const recordAreaVisited = (areaKey: string) => {
    setUserStats(prev => {
      if (prev.areasVisited.includes(areaKey)) return prev;
      const updated = { ...prev, areasVisited: [...prev.areasVisited, areaKey] };
      evaluateAchievements(updated, userProfile.currentXp, userProfile.currentLevel);
      return updated;
    });
  };

  const closeAchievementModal = () => setLatestUnlockedAchievement(null);
  const closeRewardModal = () => setLatestUnlockedReward(null);

  const resetAllGamification = () => {
    localStorage.removeItem(STORAGE_KEY_PROFILE);
    localStorage.removeItem(STORAGE_KEY_ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEY_STATS);
    localStorage.removeItem(STORAGE_KEY_IDENTITY);
    setUserProfile(DEFAULT_PROFILE);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setUserStats(DEFAULT_STATS);
  };

  return (
    <AppContext.Provider value={{
      userProfile,
      studentIdentity,
      achievements,
      userStats,
      latestUnlockedAchievement,
      latestUnlockedReward,
      awardXp,
      equipCosmetic,
      recordQuizCompleted,
      recordBreathingCompleted,
      recordTypeExplored,
      recordLawsViewed,
      recordRespectCompleted,
      recordTriagemExplored,
      recordEmpathyChoice,
      recordSecurityChoice,
      recordCamouflageUsed,
      recordAreaVisited,
      closeAchievementModal,
      closeRewardModal,
      resetAllGamification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
