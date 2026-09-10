import { Denuncia } from '../types';

export interface SemaforoInfo {
  nivel: 'vermelho' | 'amarelo' | 'verde';
  label: string;
  tag: string;
  corTexto: string;
  corBg: string;
  corBorda: string;
  corDot: string;
  badgeClasses: string;
  emoji: string;
  descricao: string;
}

/**
 * Classifica a denúncia segundo a metodologia de Semáforo da EEMTI Alfredo Machado:
 * - Vermelho (Crítico / Alto Risco): Agressão física, ameaças severas, ideação, disparos de SOS.
 * - Amarelo (Moderado / Recorrente): Cyberbullying, ofensas frequentes, exclusão sistemática.
 * - Verde (Baixo / Conflito Pontual): Conflitos pontuais, atritos cotidianos sem violência física ou reincidência reiterada.
 */
export const getSemaforoInfo = (caso: Denuncia): SemaforoInfo => {
  const isRed = 
    caso.is_sos || 
    caso.nivel_escalada === 'Crítica' || 
    caso.nivel_escalada === 'Alta' || 
    caso.nivel_gravidade === 'Grave' || 
    caso.tipo_violencia === 'Física' ||
    caso.tipo_violencia === 'Fisica';

  if (isRed) {
    return {
      nivel: 'vermelho',
      label: 'Crítico / Alta Urgência',
      tag: 'Vermelho',
      corTexto: 'text-red-400',
      corBg: 'bg-red-500/20',
      corBorda: 'border-red-500/40',
      corDot: 'bg-red-500 shadow-[0_0_8px_#EF4444]',
      badgeClasses: 'bg-red-950/70 text-red-300 border-red-500/50',
      emoji: '🔴',
      descricao: 'Violência física, ameaça severa ou alerta SOS'
    };
  }

  const isYellow = 
    caso.nivel_escalada === 'Média' || 
    caso.nivel_gravidade === 'Recorrente' || 
    caso.tipo_violencia === 'Cyberbullying' || 
    caso.tipo_violencia === 'Virtual' ||
    (caso.frequencia && /recorrente|semanal|frequente|diariamente/i.test(caso.frequencia));

  if (isYellow) {
    return {
      nivel: 'amarelo',
      label: 'Moderado / Recorrente',
      tag: 'Amarelo',
      corTexto: 'text-amber-400',
      corBg: 'bg-amber-500/20',
      corBorda: 'border-amber-500/40',
      corDot: 'bg-amber-500 shadow-[0_0_8px_#F59E0B]',
      badgeClasses: 'bg-amber-950/70 text-amber-300 border-amber-500/50',
      emoji: '🟡',
      descricao: 'Ataques virtuais, exclusão reiterada ou ofensas frequentes'
    };
  }

  return {
    nivel: 'verde',
    label: 'Leve / Conflito Pontual',
    tag: 'Verde',
    corTexto: 'text-emerald-400',
    corBg: 'bg-emerald-500/20',
    corBorda: 'border-emerald-500/40',
    corDot: 'bg-emerald-500 shadow-[0_0_8px_#10B981]',
    badgeClasses: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/50',
    emoji: '🟢',
    descricao: 'Conflito pontual sem violência física reiterada'
  };
};
