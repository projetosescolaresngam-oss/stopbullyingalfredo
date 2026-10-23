import { Achievement, AchievementCategory, AchievementTier } from '../../types';

export type MuseumPieceType = 
  | 'trofeu' 
  | 'medalha' 
  | 'certificado' 
  | 'insignia' 
  | 'artefato' 
  | 'reliquia' 
  | 'secreto';

export interface MuseumGalleryRoom {
  id: AchievementCategory | 'all' | 'secretas' | 'favoritas';
  name: string;
  shortName: string;
  icon: string;
  description: string;
  accentColor: string;
  bgGradient: string;
}

export const MUSEUM_GALLERY_ROOMS: MuseumGalleryRoom[] = [
  {
    id: 'all',
    name: 'Salão Geral das Coleções',
    shortName: 'Todas as Peças',
    icon: '🏛️',
    description: 'A visão panorâmica de todo o acervo histórico de honra e cidadania.',
    accentColor: 'from-purple-600 to-indigo-600',
    bgGradient: 'bg-purple-900/20'
  },
  {
    id: 'sabedoria',
    name: 'Galeria do Saber & Leis',
    shortName: 'Ala Sabedoria',
    icon: '📜',
    description: 'Estudos éticos, legislação 13.185 e domínio dos princípios democráticos.',
    accentColor: 'from-amber-500 to-yellow-600',
    bgGradient: 'bg-amber-900/20'
  },
  {
    id: 'detetive',
    name: 'Galeria da Perícia & Tipologias',
    shortName: 'Ala Perícia',
    icon: '🔍',
    description: 'Investigação das tipologias de agressão, triagens e olhar vigilante.',
    accentColor: 'from-cyan-500 to-blue-600',
    bgGradient: 'bg-cyan-900/20'
  },
  {
    id: 'empatia',
    name: 'Galeria da Convivência & Acolhimento',
    shortName: 'Ala Empatia',
    icon: '🤝',
    description: 'Atitudes ativas de acolhimento, escuta atenta e fraternidade nos corredores.',
    accentColor: 'from-pink-500 to-rose-600',
    bgGradient: 'bg-pink-900/20'
  },
  {
    id: 'zen',
    name: 'Galeria da Serenidade & Autocuidado',
    shortName: 'Ala Serenidade',
    icon: '🌊',
    description: 'Autorregulação emocional, técnicas respiratórias 4-7-8 e paz interior.',
    accentColor: 'from-teal-400 to-emerald-600',
    bgGradient: 'bg-teal-900/20'
  },
  {
    id: 'escudo',
    name: 'Galeria da Proteção & Escola Segura',
    shortName: 'Ala Proteção',
    icon: '🛡️',
    description: 'Canais sigilosos, defesa digital contra o cyberbullying e segurança coletiva.',
    accentColor: 'from-indigo-500 to-violet-600',
    bgGradient: 'bg-indigo-900/20'
  },
  {
    id: 'secretas',
    name: 'Câmara dos Mistérios Escolares',
    shortName: 'Salão Secreto',
    icon: '🔐',
    description: 'Peças raras, relíquias ocultas e feitos extraordinários desvendados.',
    accentColor: 'from-purple-700 to-fuchsia-700',
    bgGradient: 'bg-purple-950/40'
  }
];

export interface MuseumPieceDetails {
  pieceNumber: string;
  pieceNumberInt: number;
  pieceType: MuseumPieceType;
  pieceTypeLabel: string;
  pieceTypeIcon: string;
  galleryName: string;
  materials: string;
  isCertificate: boolean;
  pedestalStyle: {
    baseBorder: string;
    glowColor: string;
    ambientBg: string;
    tagClass: string;
  };
}

/**
 * Determina o tipo de peça museológica e sua estética física com base nos dados reais da conquista.
 */
export function getMuseumPieceDetails(achievement: Achievement, index: number): MuseumPieceDetails {
  const num = index + 1;
  const pieceNumber = `PEÇA Nº ${String(num).padStart(3, '0')}`;

  let pieceType: MuseumPieceType = 'insignia';
  let pieceTypeLabel = 'Insígnia de Honra';
  let pieceTypeIcon = '🛡️';
  let isCertificate = false;

  if (achievement.isSecret && !achievement.isUnlocked) {
    pieceType = 'secreto';
    pieceTypeLabel = 'Peça Secreta Enigmática';
    pieceTypeIcon = '🔐';
  } else if (achievement.tier === 'lendario') {
    pieceType = 'reliquia';
    pieceTypeLabel = 'Relíquia Cósmica Exclusiva';
    pieceTypeIcon = '👑';
  } else if (
    achievement.category === 'sabedoria' && 
    (achievement.id.includes('gabarito') || achievement.id.includes('doutor') || achievement.id.includes('oraculo'))
  ) {
    pieceType = 'trofeu';
    pieceTypeLabel = 'Troféu de Sabedoria';
    pieceTypeIcon = '🏆';
  } else if (
    achievement.id.includes('direitos') || 
    achievement.id.includes('lei') || 
    achievement.id.includes('respeito_em_acao') ||
    achievement.id.includes('mestre') ||
    achievement.id.includes('guardiao_supremo')
  ) {
    pieceType = 'certificado';
    pieceTypeLabel = 'Certificado Cívico';
    pieceTypeIcon = '📜';
    isCertificate = true;
  } else if (achievement.category === 'zen' || achievement.tier === 'ouro') {
    pieceType = 'artefato';
    pieceTypeLabel = 'Artefato Especial';
    pieceTypeIcon = '💎';
  } else if (achievement.category === 'empatia') {
    pieceType = 'medalha';
    pieceTypeLabel = 'Medalha de Empatia';
    pieceTypeIcon = '🎖️';
  } else {
    pieceType = 'insignia';
    pieceTypeLabel = 'Insígnia Protetora';
    pieceTypeIcon = '🛡️';
  }

  // Galeria
  const room = MUSEUM_GALLERY_ROOMS.find(r => r.id === achievement.category);
  const galleryName = achievement.isSecret ? 'Câmara dos Mistérios' : (room?.name || 'Salão Geral');

  // Materiais e acabamento de acordo com o Tier
  let materials = 'Bronze Forjado, Carvalho Escovado e Pátina Antiga';
  let pedestalStyle = {
    baseBorder: 'border-amber-700/50',
    glowColor: 'rgba(217, 119, 6, 0.15)',
    ambientBg: 'bg-amber-950/20',
    tagClass: 'bg-amber-900/30 text-amber-300 border-amber-700/50'
  };

  switch (achievement.tier) {
    case 'lendario':
      materials = 'Ametista Estelar, Ouro Astral 24k, Cristal Lapidado & Névoa Cósmica';
      pedestalStyle = {
        baseBorder: 'border-purple-500/70',
        glowColor: 'rgba(168, 85, 247, 0.35)',
        ambientBg: 'bg-purple-950/30',
        tagClass: 'bg-purple-900/50 text-fuchsia-200 border-purple-400/60 shadow-lg shadow-purple-900/30'
      };
      break;
    case 'ouro':
      materials = 'Ouro Imperial Maciço 24k, Filigranas Nobres & Cabochão de Rubi';
      pedestalStyle = {
        baseBorder: 'border-amber-400/70',
        glowColor: 'rgba(245, 158, 11, 0.3)',
        ambientBg: 'bg-amber-950/30',
        tagClass: 'bg-amber-900/40 text-amber-200 border-amber-400/60 shadow-md shadow-amber-900/20'
      };
      break;
    case 'prata':
      materials = 'Prata Esterlina 925 Polida, Aço Azul Escovado & Safiras Lapidadas';
      pedestalStyle = {
        baseBorder: 'border-blue-300/60',
        glowColor: 'rgba(59, 130, 246, 0.2)',
        ambientBg: 'bg-blue-950/20',
        tagClass: 'bg-slate-800/60 text-blue-200 border-blue-400/40'
      };
      break;
    default:
      materials = 'Bronze Forjado a Fogo, Carvalho Nobre & Rebites Metálicos';
      pedestalStyle = {
        baseBorder: 'border-amber-700/50',
        glowColor: 'rgba(180, 83, 9, 0.15)',
        ambientBg: 'bg-amber-950/20',
        tagClass: 'bg-amber-950/40 text-amber-300 border-amber-700/40'
      };
      break;
  }

  return {
    pieceNumber,
    pieceNumberInt: num,
    pieceType,
    pieceTypeLabel,
    pieceTypeIcon,
    galleryName,
    materials,
    isCertificate,
    pedestalStyle
  };
}
