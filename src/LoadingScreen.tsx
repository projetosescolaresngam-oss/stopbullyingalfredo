import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  Play, 
  Pause, 
  FastForward,
  Info
} from 'lucide-react';

// ============================================================================
// 1. PALETA DE CORES ANIME (ANIME_PALETTE)
// ============================================================================
export const ANIME_PALETTE = {
  skyTop: '#fcf8ff',
  skyMid: '#f4e8fd',
  skyBot: '#e9d6fb',
  sunAura: 'rgba(254, 215, 226, 0.45)',

  hillFar: '#e5d1f8',
  hillNear: '#d8bcf5',
  pathGround: '#c7a7ed',
  pathBorder: '#af86e2',

  // Lia (Garota Chibi - Tema Violeta)
  liaSkin: '#fff0e5',
  liaSkinShadow: '#fad1be',
  liaBlush: 'rgba(244, 63, 94, 0.65)',
  liaHair: '#4c1d95',
  liaHairShine: '#a78bfa',
  liaHairBand: '#f43f5e',
  liaShirt: '#7c3aed',
  liaShirtShine: '#c4b5fd',
  liaShirtStripe: '#ede9fe',
  liaPants: '#4338ca',
  liaPantsShadow: '#312e81',
  liaShoes: '#581c87',
  liaShoeSole: '#ffffff',
  liaEye: '#4c1d95',

  // Tom (Garoto Chibi - Tema Laranja / Macacão Jeans)
  tomSkin: '#fff2e8',
  tomSkinShadow: '#fcd3b6',
  tomBlush: 'rgba(249, 115, 22, 0.65)',
  tomHair: '#b45309',
  tomHairShine: '#fde047',
  tomShirt: '#ea580c',
  tomOveralls: '#0284c7',
  tomOverallsShadow: '#0369a1',
  tomOverallsBuckle: '#fde047',
  tomShoes: '#075985',
  tomShoeSole: '#ffffff',
  tomEye: '#78350f',

  // Efeitos & Partículas
  heartPink: '#f43f5e',
  heartRose: '#ec4899',
  heartPurple: '#a855f7',
  gold: '#fbbf24',
  sparkleWhite: '#ffffff',
};

// ============================================================================
// 2. FÓRMULAS MATEMÁTICAS DE ANIMAÇÃO E KINEMATICS
// ============================================================================
function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function easeInCubic(x: number): number {
  return x * x * x;
}

function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

// ============================================================================
// 3. MODELO DE PARTÍCULAS (FXParticle)
// ============================================================================
interface FXParticle {
  type: 'heart' | 'star' | 'dust' | 'note' | 'petal';
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
  rotation: number;
  vRot: number;
}

// Atos da Narrativa
export interface ActInfo {
  id: number;
  name: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
}

const ACTS: ActInfo[] = [
  {
    id: 1,
    name: 'Ato 1: Caminhada Alegre',
    badge: 'Fase 1 de 5',
    badgeColor: 'bg-emerald-500/15 text-emerald-700 border-emerald-300',
    title: 'Caminhando Lado a Lado',
    subtitle: 'No convívio escolar diário, cada amizade faz a diferença.'
  },
  {
    id: 2,
    name: 'Ato 2: O Tropeço e o Susto',
    badge: 'Fase 2 de 5',
    badgeColor: 'bg-amber-500/15 text-amber-700 border-amber-300',
    title: 'Um Tropeço Inesperado...',
    subtitle: 'Momentos difíceis acontecem. O importante é nunca estar sozinho.'
  },
  {
    id: 3,
    name: 'Ato 3: A Mão Estendida',
    badge: 'Fase 3 de 5',
    badgeColor: 'bg-blue-500/15 text-blue-700 border-blue-300',
    title: 'Uma Mão Amiga Estendida',
    subtitle: 'Perceber o colega e oferecer apoio imediato transforma realidades.'
  },
  {
    id: 4,
    name: 'Ato 4: Superação e Alegria',
    badge: 'Fase 4 de 5',
    badgeColor: 'bg-indigo-500/15 text-indigo-700 border-indigo-300',
    title: 'Levantando com Apoio e Força',
    subtitle: 'Juntos encontramos a segurança e a coragem para seguir em frente.'
  },
  {
    id: 5,
    name: 'Ato 5: Coração e Empatia',
    badge: 'Fase 5 de 5',
    badgeColor: 'bg-rose-500/15 text-rose-700 border-rose-300',
    title: 'Unidos pelo Acolhimento e Empatia ❤️',
    subtitle: 'StopBullying • Proteção mútua, respeito e solidariedade ativa.'
  }
];

export interface LoadingScreenProps {
  onComplete?: () => void;
  autoDismiss?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onComplete, 
  autoDismiss = true 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Estados de controle
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Referências mutáveis para loop de renderização a 60 FPS
  const animTimeRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(true);
  const playbackRateRef = useRef<number>(1.0);
  const particlesRef = useRef<FXParticle[]>([]);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number>(0);

  // Blinking timers orgânicos
  const liaNextBlinkRef = useRef<number>(2.5);
  const tomNextBlinkRef = useRef<number>(3.0);
  const liaBlinkTimerRef = useRef<number>(0);
  const tomBlinkTimerRef = useRef<number>(0);

  // Sincroniza refs com estados
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    playbackRateRef.current = playbackRate;
  }, [playbackRate]);

  // Constantes de resolução virtual
  const BASE_WIDTH = 880;
  const BASE_HEIGHT = 530;
  const TOTAL_DURATION = 14.5;

  // Encontra o ato atual baseado no tempo
  const getCurrentAct = (t: number): ActInfo => {
    if (t < 3.2) return ACTS[0];
    if (t < 5.8) return ACTS[1];
    if (t < 8.6) return ACTS[2];
    if (t < 11.2) return ACTS[3];
    return ACTS[4];
  };

  const currentAct = getCurrentAct(currentTime);

  // Função para fechar/entrar no site com fade-out
  const handleExit = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
  }, [onComplete]);

  // Adiciona novas partículas
  const spawnParticle = (
    type: FXParticle['type'], 
    x: number, 
    y: number, 
    color: string, 
    size: number, 
    vx: number, 
    vy: number, 
    life = 1.0
  ) => {
    particlesRef.current.push({
      type,
      x,
      y,
      vx,
      vy,
      size,
      color,
      alpha: 1.0,
      maxLife: life,
      life,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 4
    });
  };

  // Helper para desenhar estrela de 4 pontas brilhante (drawSparkle)
  const drawSparkle = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string, alpha = 1) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.quadraticCurveTo(cx, cy, cx + r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy + r);
    ctx.quadraticCurveTo(cx, cy, cx - r, cy);
    ctx.quadraticCurveTo(cx, cy, cx, cy - r);
    ctx.fill();

    // Centro luminoso
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Helper para desenhar coração procedural
  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha = 1) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.translate(x, y);
    ctx.beginPath();
    const d = size;
    ctx.moveTo(0, d * 0.3);
    ctx.bezierCurveTo(-d * 0.5, -d * 0.5, -d, d * 0.2, 0, d);
    ctx.bezierCurveTo(d, d * 0.2, d * 0.5, -d * 0.5, 0, d * 0.3);
    ctx.fill();
    ctx.restore();
  };

  // Helper para desenhar nuvem de poeira (drawDustCloud)
  const drawDustCloud = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x - 12 * scale, y, 9 * scale, 0, Math.PI * 2);
    ctx.arc(x, y - 6 * scale, 12 * scale, 0, Math.PI * 2);
    ctx.arc(x + 14 * scale, y, 8 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Desenho de membro cartoon com highlight tridimensional (drawCartoonLimb)
  const drawCartoonLimb = (
    ctx: CanvasRenderingContext2D,
    x1: number, y1: number,
    cx: number, cy: number,
    x2: number, y2: number,
    color: string,
    width: number,
    highlightColor?: string
  ) => {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(cx, cy, x2, y2);
    ctx.stroke();

    // Linha de brilho especular / highlight suave
    if (highlightColor) {
      ctx.strokeStyle = highlightColor;
      ctx.lineWidth = Math.max(2, width * 0.28);
      ctx.beginPath();
      // Leve deslocamento superior para o brilho
      ctx.moveTo(x1 - 1, y1 - 1.5);
      ctx.quadraticCurveTo(cx - 1, cy - 2, x2 - 1, y2 - 1.5);
      ctx.stroke();
    }
    ctx.restore();
  };

  // Desenho de olho de anime com íris brilhante e reflexos duplos
  const drawAnimeEye = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    irisColor: string,
    isBlinking: boolean,
    isStarEye: boolean,
    isWinking: boolean,
    lookOffset = 0
  ) => {
    ctx.save();
    if (isWinking || isBlinking) {
      // Olho fechado em arco alegre tipo kawaii (^ . ^)
      ctx.strokeStyle = irisColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(x, y + 2, w * 0.75, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      // Pequeno cílio lateral
      ctx.beginPath();
      ctx.moveTo(x + w * 0.6, y + 1);
      ctx.lineTo(x + w * 0.85, y - 1);
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (isStarEye) {
      // Olho cintilante estrela dourada de anime quando se emociona
      drawSparkle(ctx, x, y, w * 1.1, ANIME_PALETTE.gold, 1);
      drawSparkle(ctx, x, y, w * 0.5, '#ffffff', 1);
      ctx.restore();
      return;
    }

    // Fundo esclera branca
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
    ctx.fill();

    // Borda superior do olho (linha de cílios marcante do anime)
    ctx.strokeStyle = irisColor;
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(x, y + 1, w * 0.95, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();

    // Íris grande oval com gradiente
    const irisGrad = ctx.createLinearGradient(x, y - h * 0.7, x, y + h * 0.8);
    irisGrad.addColorStop(0, irisColor);
    irisGrad.addColorStop(0.65, irisColor);
    irisGrad.addColorStop(1, '#ffffff');

    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    ctx.ellipse(x + lookOffset, y, w * 0.72, h * 0.85, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupila escura
    ctx.fillStyle = '#1e1b4b';
    ctx.beginPath();
    ctx.arc(x + lookOffset, y + 1, w * 0.32, 0, Math.PI * 2);
    ctx.fill();

    // Reflexo de luz principal (grande)
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + lookOffset - w * 0.25, y - h * 0.32, w * 0.28, 0, Math.PI * 2);
    ctx.fill();

    // Reflexo secundário (menor)
    ctx.beginPath();
    ctx.arc(x + lookOffset + w * 0.22, y + h * 0.25, w * 0.16, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Desenho de boca expressiva de anime
  const drawAnimeMouth = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    type: 'happy_open' | 'smile' | 'gasp_o' | 'joy_cat' | 'reassured' | 'wink',
    scale = 1
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    if (type === 'happy_open') {
      // Boquinha aberta com dente e língua rosada
      ctx.fillStyle = '#991b1b';
      ctx.beginPath();
      ctx.arc(0, 0, 7.5, 0, Math.PI);
      ctx.closePath();
      ctx.fill();

      // Dente branquinho no topo
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.rect(-3.5, 0, 7, 2.5);
      ctx.fill();

      // Língua rosa fofa
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(0, 4.5, 4.2, Math.PI * 1.1, Math.PI * 1.9, true);
      ctx.fill();

      // Contorno suave
      ctx.strokeStyle = '#450a0a';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, 7.5, 0, Math.PI);
      ctx.closePath();
      ctx.stroke();
    } else if (type === 'gasp_o') {
      // Boca aberta em "O" espantada
      ctx.fillStyle = '#450a0a';
      ctx.beginPath();
      ctx.ellipse(0, 0, 5, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#292524';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (type === 'joy_cat') {
      // Boquinha de gatinho anime :3
      ctx.strokeStyle = '#4c1d95';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(-3.5, 0, 3.5, 0, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(3.5, 0, 3.5, 0, Math.PI);
      ctx.stroke();
    } else if (type === 'reassured' || type === 'smile' || type === 'wink') {
      // Sorriso meigo em curva
      ctx.strokeStyle = '#701a75';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, -2, 6.5, Math.PI * 0.2, Math.PI * 0.8);
      ctx.stroke();
    }

    ctx.restore();
  };

  // ============================================================================
  // 4. RENDERIZAÇÃO COMPLETA DO FRAME (CANVAS 60 FPS)
  // ============================================================================
  const renderFrame = (ctx: CanvasRenderingContext2D, t: number) => {
    ctx.clearRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

    // --- A. CENÁRIO PASTEL ANIME (CÉU, COLINAS E CAMINHO) ---
    // Céu com gradiente suave
    const skyGrad = ctx.createLinearGradient(0, 0, 0, BASE_HEIGHT);
    skyGrad.addColorStop(0, ANIME_PALETTE.skyTop);
    skyGrad.addColorStop(0.5, ANIME_PALETTE.skyMid);
    skyGrad.addColorStop(1, ANIME_PALETTE.skyBot);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

    // Aura solar suave / Sol matinal de anime
    const sunAura = ctx.createRadialGradient(
      BASE_WIDTH * 0.72, 110, 10,
      BASE_WIDTH * 0.72, 110, 190
    );
    sunAura.addColorStop(0, ANIME_PALETTE.sunAura);
    sunAura.addColorStop(0.7, 'rgba(254, 215, 226, 0.15)');
    sunAura.addColorStop(1, 'rgba(254, 215, 226, 0)');
    ctx.fillStyle = sunAura;
    ctx.beginPath();
    ctx.arc(BASE_WIDTH * 0.72, 110, 190, 0, Math.PI * 2);
    ctx.fill();

    // Colina distante (lavanda pastel)
    ctx.fillStyle = ANIME_PALETTE.hillFar;
    ctx.beginPath();
    ctx.moveTo(0, 310);
    ctx.bezierCurveTo(200, 260, 420, 295, BASE_WIDTH, 270);
    ctx.lineTo(BASE_WIDTH, BASE_HEIGHT);
    ctx.lineTo(0, BASE_HEIGHT);
    ctx.fill();

    // Colina média (com curva suave)
    ctx.fillStyle = ANIME_PALETTE.hillNear;
    ctx.beginPath();
    ctx.moveTo(0, 350);
    ctx.bezierCurveTo(280, 320, 560, 370, BASE_WIDTH, 335);
    ctx.lineTo(BASE_WIDTH, BASE_HEIGHT);
    ctx.lineTo(0, BASE_HEIGHT);
    ctx.fill();

    // Gramado e caminho suave de terra/pedrinhas
    ctx.fillStyle = ANIME_PALETTE.pathGround;
    ctx.beginPath();
    ctx.moveTo(0, 400);
    ctx.bezierCurveTo(240, 385, 600, 410, BASE_WIDTH, 395);
    ctx.lineTo(BASE_WIDTH, BASE_HEIGHT);
    ctx.lineTo(0, BASE_HEIGHT);
    ctx.fill();

    // Linha de borda do gramado
    ctx.strokeStyle = ANIME_PALETTE.pathBorder;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(0, 400);
    ctx.bezierCurveTo(240, 385, 600, 410, BASE_WIDTH, 395);
    ctx.stroke();

    // Tufo de grama / florzinhas estilizadas no chão
    for (let i = 0; i < 9; i++) {
      const gx = 65 + i * 95;
      const gy = 415 + (i % 3) * 12;
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.arc(gx, gy, 2.5, 0, Math.PI * 2);
      ctx.arc(gx + 3, gy - 2, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // --- B. KINEMATICS & POSES DOS PERSONAGENS NOS 5 ATOS ---
    const groundY = 415;

    // Variáveis de estado calculadas a partir de t
    let liaX = 350;
    let liaY = groundY;
    let liaRot = 0;
    let liaStarEyes = false;
    let liaWink = false;
    let liaMouth: 'happy_open' | 'smile' | 'gasp_o' | 'joy_cat' | 'reassured' | 'wink' = 'smile';
    let liaArmLeftAngle = 0.2;
    let liaArmRightAngle = -0.2;
    let liaLegOffset = 0;

    let tomX = 270;
    let tomY = groundY;
    let tomRot = 0;
    let tomHasSweat = false;
    let tomMouth: 'happy_open' | 'smile' | 'gasp_o' | 'joy_cat' | 'reassured' | 'wink' = 'smile';
    let tomArmLeftAngle = -0.2;
    let tomArmRightAngle = 0.2;
    let tomLegOffset = 0;
    let tomHandGlow = false;

    let showQuestionExclamation = false;
    let dustPuff = false;

    // -------------------------------------------------------------
    // ATO 1: Caminhada Alegre e Saltitante (0.0s até 3.2s)
    // -------------------------------------------------------------
    if (t < 3.2) {
      const p = t / 3.2;
      // Caminham juntos da esquerda até o centro
      liaX = lerp(110, 380, p);
      tomX = lerp(40, 300, p);

      const walkCycle = t * 6.8;
      liaLegOffset = Math.sin(walkCycle) * 11;
      tomLegOffset = Math.cos(walkCycle) * 11;

      // Pulinho rítmico do corpo na caminhada
      liaY = groundY - Math.abs(Math.sin(walkCycle)) * 6.5;
      tomY = groundY - Math.abs(Math.cos(walkCycle)) * 6.5;

      // Lia acena alegremente com a mão esquerda
      liaArmLeftAngle = Math.sin(t * 5) * 0.45 - 0.7;
      liaArmRightAngle = 0.25;
      liaMouth = 'happy_open';

      // Tom olha e sorri para ela
      tomArmLeftAngle = -0.3;
      tomArmRightAngle = Math.sin(walkCycle) * 0.35;
      tomMouth = 'smile';

      // Pequenas notas musicais ou pétalas no ar
      if (Math.random() < 0.08) {
        spawnParticle('petal', liaX + (Math.random() - 0.5) * 60, liaY - 60, '#e9d5ff', 4, 0.4, -0.4, 1.8);
      }
    }
    // -------------------------------------------------------------
    // ATO 2: O Tropeço Inesperado e o Susto (3.2s até 5.8s)
    // -------------------------------------------------------------
    else if (t < 5.8) {
      const p = (t - 3.2) / 2.6; // 0 até 1

      if (p < 0.35) {
        // Fase 2A: Lia tropeça, inclina-se para frente em choque
        const tripP = p / 0.35;
        liaX = 380 + tripP * 35;
        liaRot = tripP * 0.45; // inclina para a frente
        liaArmLeftAngle = -1.1; // braços abertos em pânico
        liaArmRightAngle = 1.1;
        liaMouth = 'gasp_o';
        showQuestionExclamation = true;

        // Tom derrapa/freia bruscamente assustado
        tomX = lerp(300, 335, easeOutCubic(tripP));
        tomY = groundY;
        tomMouth = 'gasp_o';
        tomHasSweat = true;
      } else {
        // Fase 2B: Lia cai suavemente sentada na grama
        const fallP = (p - 0.35) / 0.65;
        liaX = 415;
        // Posição sentada no chão (abaixa ~18px)
        liaY = groundY + easeOutBack(fallP) * 16;
        liaRot = easeOutCubic(1 - fallP) * 0.12;
        liaArmLeftAngle = -0.35;
        liaArmRightAngle = 0.45;
        liaMouth = 'gasp_o';

        dustPuff = true;

        // Tom em choque total com as mãos nas bochechas
        tomX = 335;
        tomY = groundY;
        tomArmLeftAngle = -1.35; // mãos nas bochechas
        tomArmRightAngle = 1.35;
        tomMouth = 'gasp_o';
        tomHasSweat = true;
      }
    }
    // -------------------------------------------------------------
    // ATO 3: A Mão Amiga Estendida (5.8s até 8.6s)
    // -------------------------------------------------------------
    else if (t < 8.6) {
      const p = (t - 5.8) / 2.8;
      liaX = 420;
      liaY = groundY + 16; // Lia ainda sentada
      liaRot = 0;

      // Tom corre até mais perto e agacha com postura protetora
      tomX = lerp(335, 385, easeOutCubic(Math.min(1, p * 1.5)));
      // Agacha um pouco (y aumenta levemente)
      tomY = groundY + Math.sin(Math.min(1, p * 1.5) * Math.PI * 0.5) * 12;

      // Tom estende o braço direito em direção a Lia com brilho dourado
      tomArmRightAngle = -0.65;
      tomArmLeftAngle = 0.2;
      tomMouth = 'reassured';
      tomHandGlow = true;

      // Lia ergue o rosto, estende a mão para segurar a dele
      liaArmLeftAngle = -0.65;
      liaArmRightAngle = 0.25;

      if (p > 0.35) {
        // Olhos estrelados de emoção e alívio
        liaStarEyes = true;
        liaMouth = 'smile';
      }

      // Brilhos dourados emanando do encontro das mãos
      if (Math.random() < 0.25) {
        spawnParticle('star', 398 + (Math.random() - 0.5) * 18, groundY + 8, ANIME_PALETTE.gold, 5, (Math.random() - 0.5) * 0.8, -0.6, 1.2);
      }
    }
    // -------------------------------------------------------------
    // ATO 4: Levantando com Apoio e Celebração (8.6s até 11.2s)
    // -------------------------------------------------------------
    else if (t < 11.2) {
      const p = (t - 8.6) / 2.6;

      if (p < 0.4) {
        // Subida: Tom puxa suavemente Lia para cima
        const standP = p / 0.4;
        liaX = lerp(420, 415, standP);
        liaY = lerp(groundY + 16, groundY, easeOutCubic(standP));
        tomX = lerp(385, 375, standP);
        tomY = lerp(groundY + 12, groundY, easeOutCubic(standP));

        liaArmLeftAngle = -0.4;
        tomArmRightAngle = 0.4;
        liaMouth = 'smile';
        tomMouth = 'smile';
      } else {
        // Pulo sincronizado de vitória no ar!
        const jumpP = (p - 0.4) / 0.6; // 0 até 1
        const jumpArc = Math.sin(jumpP * Math.PI);

        liaX = 415;
        tomX = 365;
        liaY = groundY - jumpArc * 54;
        tomY = groundY - jumpArc * 54;

        // Perninhas recolhidas no ar
        liaLegOffset = -jumpArc * 8;
        tomLegOffset = -jumpArc * 8;

        // Braços erguidos comemorando
        liaArmLeftAngle = -1.25;
        liaArmRightAngle = 1.25;
        tomArmLeftAngle = -1.25;
        tomArmRightAngle = 1.25;

        // Boquinha de gatinho anime :3
        liaMouth = 'joy_cat';
        tomMouth = 'joy_cat';

        // Faíscas de vitória explodindo
        if (Math.random() < 0.3) {
          spawnParticle('star', 390 + (Math.random() - 0.5) * 80, groundY - 30, ANIME_PALETTE.gold, 6, (Math.random() - 0.5) * 1.5, -1.2, 1.0);
          spawnParticle('heart', 390 + (Math.random() - 0.5) * 80, groundY - 40, ANIME_PALETTE.heartPink, 8, (Math.random() - 0.5) * 1.2, -1.0, 1.2);
        }
      }
    }
    // -------------------------------------------------------------
    // ATO 5: O Clímax do Coração e Piscadela Kawaii (11.2s até 14.5s)
    // -------------------------------------------------------------
    else {
      const p = (t - 11.2) / 3.3;
      // Posicionam-se lado a lado no centro perfeito
      liaX = 412;
      tomX = 468;

      // Respiração suave sincronizada
      const breath = Math.sin(t * 3.5) * 2.5;
      liaY = groundY + breath;
      tomY = groundY + breath;

      // Braços externos sobem em arco formando um coração sobre as cabeças
      // Braços internos abraçam carinhosamente a cintura do colega
      liaArmLeftAngle = -1.75; // braço esquerdo sobe no arco do coração
      liaArmRightAngle = 0.35;  // abraça cintura do Tom
      tomArmRightAngle = 1.75;  // braço direito sobe no arco do coração
      tomArmLeftAngle = -0.35;  // abraça cintura da Lia

      liaWink = true; // Lia dá uma piscadela kawaii
      liaMouth = 'wink';
      tomMouth = 'smile';

      // Erupção contínua e mágica de corações e estrelas do centro do coração superior
      const heartCenterX = 440;
      const heartCenterY = groundY - 145;

      if (Math.random() < 0.45) {
        const pType = Math.random() < 0.65 ? 'heart' : 'star';
        const pColor = pType === 'heart'
          ? (Math.random() < 0.5 ? ANIME_PALETTE.heartPink : ANIME_PALETTE.heartRose)
          : ANIME_PALETTE.gold;
        const angle = (Math.random() - 0.5) * Math.PI * 0.9 - Math.PI / 2;
        const speed = 1.2 + Math.random() * 2.2;

        spawnParticle(
          pType, 
          heartCenterX + (Math.random() - 0.5) * 24, 
          heartCenterY + (Math.random() - 0.5) * 18, 
          pColor, 
          8 + Math.random() * 8, 
          Math.cos(angle) * speed, 
          Math.sin(angle) * speed, 
          1.8
        );
      }

      // Desenha o grande coração translúcido luminoso unindo as mãos no topo
      const pulseHeartSize = 34 + Math.sin(t * 4) * 4;
      drawHeart(ctx, heartCenterX, heartCenterY, pulseHeartSize, 'rgba(244, 63, 94, 0.45)', 0.7);
      drawSparkle(ctx, heartCenterX, heartCenterY - 6, 12, '#ffffff', 0.9);
    }

    // --- C. DESENHO DAS NUVENS DE POEIRA DO TROPEÇO ---
    if (dustPuff) {
      drawDustCloud(ctx, liaX - 18, groundY + 12, 1.1, 0.75);
      drawDustCloud(ctx, liaX + 22, groundY + 12, 0.9, 0.65);
    }

    // --- D. DESENHO DOS PERSONAGENS CHIBI ---

    // 1. DESENHO DE LIA (Garota Chibi - Violeta)
    ctx.save();
    ctx.translate(liaX, liaY);
    ctx.rotate(liaRot);

    // Sombra suave no chão
    ctx.fillStyle = 'rgba(76, 29, 149, 0.22)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Perninhas & Sapatinhos
    // Perna esquerda
    drawCartoonLimb(
      ctx,
      -7, -24,
      -9, -12,
      -9 + liaLegOffset, 0,
      ANIME_PALETTE.liaPants,
      10,
      ANIME_PALETTE.liaPantsShadow
    );
    // Sapato esquerdo
    ctx.fillStyle = ANIME_PALETTE.liaShoes;
    ctx.beginPath();
    ctx.ellipse(-9 + liaLegOffset, -1, 7, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ANIME_PALETTE.liaShoeSole;
    ctx.fillRect(-15 + liaLegOffset, 0, 13, 2);

    // Perna direita
    drawCartoonLimb(
      ctx,
      7, -24,
      9, -12,
      9 - liaLegOffset, 0,
      ANIME_PALETTE.liaPants,
      10,
      ANIME_PALETTE.liaPantsShadow
    );
    // Sapato direito
    ctx.fillStyle = ANIME_PALETTE.liaShoes;
    ctx.beginPath();
    ctx.ellipse(9 - liaLegOffset, -1, 7, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ANIME_PALETTE.liaShoeSole;
    ctx.fillRect(3 - liaLegOffset, 0, 13, 2);

    // Tronco / Camiseta lilás
    ctx.fillStyle = ANIME_PALETTE.liaShirt;
    ctx.beginPath();
    ctx.roundRect(-14, -58, 28, 36, 10);
    ctx.fill();

    // Listra estilosa na camiseta
    ctx.fillStyle = ANIME_PALETTE.liaShirtStripe;
    ctx.fillRect(-14, -44, 28, 4);

    // Braço esquerdo de Lia
    const liaElbowLX = -18 + Math.sin(liaArmLeftAngle) * 14;
    const liaElbowLY = -48 - Math.cos(liaArmLeftAngle) * 12;
    const liaHandLX = -22 + Math.sin(liaArmLeftAngle) * 26;
    const liaHandLY = -48 - Math.cos(liaArmLeftAngle) * 26;
    drawCartoonLimb(
      ctx,
      -12, -52,
      liaElbowLX, liaElbowLY,
      liaHandLX, liaHandLY,
      ANIME_PALETTE.liaShirt,
      8,
      ANIME_PALETTE.liaShirtShine
    );
    // Mãozinha
    ctx.fillStyle = ANIME_PALETTE.liaSkin;
    ctx.beginPath();
    ctx.arc(liaHandLX, liaHandLY, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Braço direito de Lia
    const liaElbowRX = 18 + Math.sin(liaArmRightAngle) * 14;
    const liaElbowRY = -48 - Math.cos(liaArmRightAngle) * 12;
    const liaHandRX = 22 + Math.sin(liaArmRightAngle) * 26;
    const liaHandRY = -48 - Math.cos(liaArmRightAngle) * 26;
    drawCartoonLimb(
      ctx,
      12, -52,
      liaElbowRX, liaElbowRY,
      liaHandRX, liaHandRY,
      ANIME_PALETTE.liaShirt,
      8,
      ANIME_PALETTE.liaShirtShine
    );
    // Mãozinha
    ctx.fillStyle = ANIME_PALETTE.liaSkin;
    ctx.beginPath();
    ctx.arc(liaHandRX, liaHandRY, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo traseiro (marias-chiquinhas / coques)
    ctx.fillStyle = ANIME_PALETTE.liaHair;
    // Pigtail esquerda
    ctx.beginPath();
    ctx.ellipse(-28, -78, 12, 18, -0.4, 0, Math.PI * 2);
    ctx.fill();
    // Laço rosa esquerdo
    ctx.fillStyle = ANIME_PALETTE.liaHairBand;
    ctx.beginPath();
    ctx.arc(-24, -84, 5, 0, Math.PI * 2);
    ctx.fill();

    // Pigtail direita
    ctx.fillStyle = ANIME_PALETTE.liaHair;
    ctx.beginPath();
    ctx.ellipse(28, -78, 12, 18, 0.4, 0, Math.PI * 2);
    ctx.fill();
    // Laço rosa direito
    ctx.fillStyle = ANIME_PALETTE.liaHairBand;
    ctx.beginPath();
    ctx.arc(24, -84, 5, 0, Math.PI * 2);
    ctx.fill();

    // Cabeça Chibi Redonda e Fofa
    ctx.fillStyle = ANIME_PALETTE.liaSkin;
    ctx.beginPath();
    ctx.ellipse(0, -82, 28, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Blush nas bochechas
    ctx.fillStyle = ANIME_PALETTE.liaBlush;
    ctx.beginPath();
    ctx.ellipse(-14, -75, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(14, -75, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Franja de cabelo frontal estilizada anime
    ctx.fillStyle = ANIME_PALETTE.liaHair;
    ctx.beginPath();
    ctx.moveTo(-28, -88);
    ctx.quadraticCurveTo(-14, -108, 0, -96);
    ctx.quadraticCurveTo(14, -108, 28, -88);
    ctx.quadraticCurveTo(24, -76, 26, -68);
    ctx.quadraticCurveTo(12, -78, 4, -86);
    ctx.quadraticCurveTo(-6, -78, -26, -68);
    ctx.closePath();
    ctx.fill();

    // Brilho no cabelo
    ctx.strokeStyle = ANIME_PALETTE.liaHairShine;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, -97, 16, Math.PI * 1.25, Math.PI * 1.75);
    ctx.stroke();

    // Olhos de Lia
    const isLiaBlink = liaBlinkTimerRef.current > 0;
    // Olho esquerdo
    drawAnimeEye(ctx, -11, -80, 6.5, 8.5, ANIME_PALETTE.liaEye, isLiaBlink, liaStarEyes, false);
    // Olho direito (com suporte a piscadela kawaii)
    drawAnimeEye(ctx, 11, -80, 6.5, 8.5, ANIME_PALETTE.liaEye, isLiaBlink, liaStarEyes, liaWink);

    // Boca de Lia
    drawAnimeMouth(ctx, 0, -68, liaMouth);

    // Emote !? de anime no tropeço
    if (showQuestionExclamation) {
      ctx.save();
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('!?', 18, -108);
      ctx.restore();
    }

    ctx.restore(); // fim Lia

    // 2. DESENHO DE TOM (Garoto Chibi - Laranja / Macacão Jeans)
    ctx.save();
    ctx.translate(tomX, tomY);
    ctx.rotate(tomRot);

    // Sombra no chão
    ctx.fillStyle = 'rgba(2, 132, 199, 0.22)';
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Perninhas com macacão jeans
    // Perna esquerda
    drawCartoonLimb(
      ctx,
      -7, -24,
      -9, -12,
      -9 + tomLegOffset, 0,
      ANIME_PALETTE.tomOveralls,
      11,
      ANIME_PALETTE.tomOverallsShadow
    );
    // Sapato esquerdo
    ctx.fillStyle = ANIME_PALETTE.tomShoes;
    ctx.beginPath();
    ctx.ellipse(-9 + tomLegOffset, -1, 7.5, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ANIME_PALETTE.tomShoeSole;
    ctx.fillRect(-15 + tomLegOffset, 0, 14, 2);

    // Perna direita
    drawCartoonLimb(
      ctx,
      7, -24,
      9, -12,
      9 - tomLegOffset, 0,
      ANIME_PALETTE.tomOveralls,
      11,
      ANIME_PALETTE.tomOverallsShadow
    );
    // Sapato direito
    ctx.fillStyle = ANIME_PALETTE.tomShoes;
    ctx.beginPath();
    ctx.ellipse(9 - tomLegOffset, -1, 7.5, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = ANIME_PALETTE.tomShoeSole;
    ctx.fillRect(3 - tomLegOffset, 0, 14, 2);

    // Tronco: Camiseta laranja por baixo
    ctx.fillStyle = ANIME_PALETTE.tomShirt;
    ctx.beginPath();
    ctx.roundRect(-15, -58, 30, 36, 10);
    ctx.fill();

    // Macacão jeans azul por cima
    ctx.fillStyle = ANIME_PALETTE.tomOveralls;
    ctx.beginPath();
    ctx.roundRect(-13, -48, 26, 26, 6);
    ctx.fill();

    // Alças do macacão com fivelas douradas
    ctx.strokeStyle = ANIME_PALETTE.tomOveralls;
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-8, -58);
    ctx.lineTo(-8, -48);
    ctx.moveTo(8, -58);
    ctx.lineTo(8, -48);
    ctx.stroke();

    // Fivelas douradas
    ctx.fillStyle = ANIME_PALETTE.tomOverallsBuckle;
    ctx.fillRect(-10, -49, 4, 4);
    ctx.fillRect(6, -49, 4, 4);

    // Bolso central do macacão
    ctx.strokeStyle = ANIME_PALETTE.tomOverallsShadow;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-6, -39, 12, 10);

    // Braço esquerdo de Tom
    const tomElbowLX = -18 + Math.sin(tomArmLeftAngle) * 14;
    const tomElbowLY = -48 - Math.cos(tomArmLeftAngle) * 12;
    const tomHandLX = -22 + Math.sin(tomArmLeftAngle) * 26;
    const tomHandLY = -48 - Math.cos(tomArmLeftAngle) * 26;
    drawCartoonLimb(
      ctx,
      -12, -52,
      tomElbowLX, tomElbowLY,
      tomHandLX, tomHandLY,
      ANIME_PALETTE.tomShirt,
      8.5,
      '#fdba74'
    );
    // Mãozinha
    ctx.fillStyle = ANIME_PALETTE.tomSkin;
    ctx.beginPath();
    ctx.arc(tomHandLX, tomHandLY, 4.8, 0, Math.PI * 2);
    ctx.fill();

    // Braço direito de Tom
    const tomElbowRX = 18 + Math.sin(tomArmRightAngle) * 14;
    const tomElbowRY = -48 - Math.cos(tomArmRightAngle) * 12;
    const tomHandRX = 22 + Math.sin(tomArmRightAngle) * 26;
    const tomHandRY = -48 - Math.cos(tomArmRightAngle) * 26;
    drawCartoonLimb(
      ctx,
      12, -52,
      tomElbowRX, tomElbowRY,
      tomHandRX, tomHandRY,
      ANIME_PALETTE.tomShirt,
      8.5,
      '#fdba74'
    );
    // Mãozinha
    ctx.fillStyle = ANIME_PALETTE.tomSkin;
    ctx.beginPath();
    ctx.arc(tomHandRX, tomHandRY, 4.8, 0, Math.PI * 2);
    ctx.fill();

    // Brilho dourado na mão estendida de Tom (Ato 3)
    if (tomHandGlow) {
      drawSparkle(ctx, tomHandRX, tomHandRY, 14, ANIME_PALETTE.gold, 0.85);
      drawSparkle(ctx, tomHandRX, tomHandRY, 7, '#ffffff', 1.0);
    }

    // Cabeça Chibi Redonda do Tom
    ctx.fillStyle = ANIME_PALETTE.tomSkin;
    ctx.beginPath();
    ctx.ellipse(0, -82, 28, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    // Blush suave
    ctx.fillStyle = ANIME_PALETTE.tomBlush;
    ctx.beginPath();
    ctx.ellipse(-14, -75, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.ellipse(14, -75, 6, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cabelo castanho fofo com topete anime
    ctx.fillStyle = ANIME_PALETTE.tomHair;
    ctx.beginPath();
    ctx.moveTo(-28, -82);
    ctx.quadraticCurveTo(-30, -106, -10, -106);
    ctx.quadraticCurveTo(0, -112, 14, -104);
    ctx.quadraticCurveTo(30, -104, 28, -82);
    ctx.quadraticCurveTo(24, -74, 22, -82);
    ctx.quadraticCurveTo(12, -94, 2, -88);
    ctx.quadraticCurveTo(-8, -94, -24, -80);
    ctx.closePath();
    ctx.fill();

    // Brilho no cabelo do Tom
    ctx.strokeStyle = ANIME_PALETTE.tomHairShine;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(4, -98, 14, Math.PI * 1.2, Math.PI * 1.7);
    ctx.stroke();

    // Olhos do Tom
    const isTomBlink = tomBlinkTimerRef.current > 0;
    drawAnimeEye(ctx, -11, -80, 6.5, 8.5, ANIME_PALETTE.tomEye, isTomBlink, false, false, 1.5);
    drawAnimeEye(ctx, 11, -80, 6.5, 8.5, ANIME_PALETTE.tomEye, isTomBlink, false, false, 1.5);

    // Boca do Tom
    drawAnimeMouth(ctx, 0, -68, tomMouth);

    // Gota de suor clássica de anime no susto (Ato 2)
    if (tomHasSweat) {
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.ellipse(-26, -92, 4, 7, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-27, -93, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore(); // fim Tom

    // --- E. ATUALIZAÇÃO E DESENHO DE PARTÍCULAS ---
    const dt = 1 / 60;
    particlesRef.current = particlesRef.current.filter((p) => {
      p.life -= dt;
      if (p.life <= 0) return false;

      // Movimento e física
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot * dt;

      // Gravidade leve ou desaceleração
      if (p.type === 'heart' || p.type === 'star') {
        p.vy -= 0.04; // flutua para cima
        p.vx *= 0.98;
      } else if (p.type === 'dust') {
        p.vx *= 0.95;
        p.vy *= 0.95;
      }

      const progress = p.life / p.maxLife;
      const alpha = clamp(progress, 0, 1);

      if (p.type === 'heart') {
        drawHeart(ctx, p.x, p.y, p.size * (0.6 + progress * 0.4), p.color, alpha);
      } else if (p.type === 'star') {
        drawSparkle(ctx, p.x, p.y, p.size * (0.6 + progress * 0.4), p.color, alpha);
      } else if (p.type === 'petal') {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      return true;
    });
  };

  // ============================================================================
  // 5. LOOP DO REQUEST ANIMATION FRAME (60 FPS) & RESIZE
  // ============================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajusta resolução do canvas com base no devicePixelRatio (capped em 2x)
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = BASE_WIDTH * dpr;
      canvas.height = BASE_HEIGHT * dpr;

      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Loop de animação
    const tick = (now: number) => {
      const deltaSec = (now - lastFrameTimeRef.current) / 1000;
      lastFrameTimeRef.current = now;

      if (isPlayingRef.current) {
        animTimeRef.current += deltaSec * playbackRateRef.current;

        // Auto-dismiss ou loop no fim de 14.5s
        if (animTimeRef.current >= TOTAL_DURATION) {
          if (autoDismiss) {
            handleExit();
            return;
          } else {
            animTimeRef.current = TOTAL_DURATION;
            setIsPlaying(false);
          }
        }

        // Blinking orgânico
        liaNextBlinkRef.current -= deltaSec;
        if (liaNextBlinkRef.current <= 0) {
          liaBlinkTimerRef.current = 0.15;
          liaNextBlinkRef.current = 2.0 + Math.random() * 2.5;
        } else if (liaBlinkTimerRef.current > 0) {
          liaBlinkTimerRef.current -= deltaSec;
        }

        tomNextBlinkRef.current -= deltaSec;
        if (tomNextBlinkRef.current <= 0) {
          tomBlinkTimerRef.current = 0.15;
          tomNextBlinkRef.current = 2.5 + Math.random() * 2.5;
        } else if (tomBlinkTimerRef.current > 0) {
          tomBlinkTimerRef.current -= deltaSec;
        }

        setCurrentTime(animTimeRef.current);
      }

      renderFrame(ctx, animTimeRef.current);
      rafIdRef.current = requestAnimationFrame(tick);
    };

    lastFrameTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [autoDismiss, handleExit]);

  // Controles de interação
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleRestart = () => {
    animTimeRef.current = 0;
    particlesRef.current = [];
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const cycleSpeed = () => {
    const speeds = [1.0, 1.5, 2.0, 0.5];
    const next = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    setPlaybackRate(next);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    animTimeRef.current = val;
    setCurrentTime(val);
  };

  const progressPercent = Math.min(100, Math.round((currentTime / TOTAL_DURATION) * 100));

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-gradient-to-b from-[#fdfbfd] via-[#f7f0fc] to-[#eee4f8] text-slate-800 transition-opacity duration-500 select-none overflow-y-auto ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. CABEÇALHO SUPERIOR */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 flex items-center justify-between gap-3">
        
        {/* Badge StopBullying + Anime 2D */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/25 ring-2 ring-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-purple-950">
                StopBullying
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                Anime Chibi 2D
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Animação Pedagógica Narrativa • Empatia e Acolhimento
            </p>
          </div>
        </div>

        {/* Botão Entrar no Site / Pular */}
        <button
          type="button"
          onClick={handleExit}
          className="group px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-500/30 hover:shadow-lg hover:shadow-purple-500/40 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Entrar no Site</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

      </header>

      {/* 2. PALCO CENTRAL: CANVAS E CAIXA DE LEGENDAS */}
      <main className="w-full max-w-4xl mx-auto px-3 sm:px-6 my-auto py-2 flex flex-col items-center">
        
        {/* Moldura do Canvas com Efeito de Card Macio */}
        <div 
          ref={containerRef}
          onClick={togglePlayPause}
          className="relative w-full aspect-[880/530] max-h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white cursor-pointer group"
          title="Clique para pausar ou continuar a animação"
        >
          <canvas 
            ref={canvasRef} 
            className="w-full h-full block" 
          />

          {/* Overlay flutuante de pausa se pausado */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px] flex items-center justify-center transition-all">
              <div className="px-5 py-3 rounded-2xl bg-white/90 text-purple-950 font-extrabold text-sm shadow-xl flex items-center gap-2.5 transform scale-100 transition-transform">
                <Play className="w-5 h-5 text-purple-600 fill-purple-600" />
                <span>Pausado • Clique para continuar</span>
              </div>
            </div>
          )}

          {/* Indicador sutil de toque */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-white/70 backdrop-blur-sm text-[10px] font-semibold text-purple-900 border border-purple-200/50 opacity-0 group-hover:opacity-100 transition-opacity">
            {isPlaying ? 'Clique para Pausar' : 'Clique para Reproduzir'}
          </div>
        </div>

        {/* Caixa de Legenda Narrativa Dinâmica */}
        <div className="w-full mt-3 p-3.5 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-200/60 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${currentAct.badgeColor}`}>
                {currentAct.badge}
              </span>
              <h3 className="font-extrabold text-sm sm:text-base text-purple-950">
                {currentAct.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              {currentAct.subtitle}
            </p>
          </div>

          <div className="text-right self-end sm:self-center shrink-0">
            <span className="text-xs font-mono font-bold text-purple-700">
              {currentTime.toFixed(1)}s / {TOTAL_DURATION}s
            </span>
            <div className="text-[10px] text-slate-400 font-semibold">
              {progressPercent}% Concluído
            </div>
          </div>
        </div>

      </main>

      {/* 3. BARRA DE CONTROLE INFERIOR: TIMELINE, SCRUBBER & BOTÕES */}
      <footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6 space-y-3">
        
        {/* Scrubber / Slider de Linha do Tempo */}
        <div className="space-y-1">
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max={TOTAL_DURATION}
              step="0.05"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2.5 bg-purple-200/70 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Marcadores discretos dos 5 atos */}
          <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
            <span>0.0s (Início)</span>
            <span>3.2s (Tropeço)</span>
            <span>5.8s (Apoio)</span>
            <span>8.6s (Superação)</span>
            <span>11.2s (Empatia)</span>
            <span>14.5s (Fim)</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          
          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <button
              type="button"
              onClick={togglePlayPause}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Continuar</span>
                </>
              )}
            </button>

            {/* Reiniciar */}
            <button
              type="button"
              onClick={handleRestart}
              className="px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Voltar a animação para o início"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
              <span>Reiniciar</span>
            </button>

            {/* Alternar Velocidade */}
            <button
              type="button"
              onClick={cycleSpeed}
              className="px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Alterar velocidade de reprodução"
            >
              <FastForward className="w-3.5 h-3.5 text-purple-600" />
              <span>{playbackRate}x</span>
            </button>
          </div>

          {/* Dica pedagógica rápida */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-purple-900/70 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Lia & Tom • Convivência Segura e Solidária</span>
          </div>

        </div>

      </footer>

    </div>
  );
};
