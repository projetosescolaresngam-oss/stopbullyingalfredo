import React from 'react';
import { CharacterProfile } from '../../../data/narrativeStoriesData';

interface VisualNovelCharacterStageProps {
  character: CharacterProfile;
  speakerName?: string;
  isSpeaking?: boolean;
  expression?: 'normal' | 'preocupado' | 'firme' | 'reflexivo';
  className?: string;
}

export const VisualNovelCharacterStage: React.FC<VisualNovelCharacterStageProps> = ({
  character,
  speakerName,
  isSpeaking = false,
  expression = 'normal',
  className = ''
}) => {
  const type = character.avatarType;

  return (
    <div className={`relative flex items-end justify-center select-none pointer-events-none ${className}`}>
      {/* Sombra de projeção no chão do cenário */}
      <div className="absolute -bottom-2 w-48 h-8 rounded-full bg-black/60 blur-md" />

      {/* Brilho de silhueta suave que integra o personagem à iluminação da cena */}
      <div 
        className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ backgroundColor: character.accentColor || '#a855f7' }}
      />

      {/* Renderização do Modelo do Personagem em Vetor Visual Novel de Corpo Superior (Half-body) */}
      <div className="relative w-64 sm:w-80 md:w-96 h-80 sm:h-96 md:h-[420px] transition-transform duration-300 transform hover:scale-[1.01]">
        
        {/* ===================================================================== */}
        {/* MODELO 1: SOFIA (aluna_oculos) - ESTILO ANIME ESCOLAR BRASILEIRO      */}
        {/* ===================================================================== */}
        {type === 'aluna_oculos' && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="sofiaHair" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#251630" />
                <stop offset="60%" stopColor="#3d2152" />
                <stop offset="100%" stopColor="#1a0f23" />
              </linearGradient>
              <linearGradient id="sofiaShirt" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ede9fe" />
              </linearGradient>
              <linearGradient id="sofiaVest" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7e22ce" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="100%" stopColor="#fed7aa" />
              </linearGradient>
            </defs>

            {/* Cabelo Longo Traseiro com Volume e Caimento Natural */}
            <path d="M60 120 C40 220, 50 340, 75 390 L205 390 C230 340, 240 220, 220 120 Z" fill="url(#sofiaHair)" />
            <path d="M50 160 C35 240, 45 320, 60 380 C70 320, 65 240, 58 160 Z" fill="#1a0f23" />
            <path d="M230 160 C245 240, 235 320, 220 380 C210 320, 215 240, 222 160 Z" fill="#1a0f23" />

            {/* Tronco & Uniforme Escolar da EEMTI Alfredo Machado */}
            {/* Blusa Branca Interna com Gola */}
            <path d="M50 400 L85 240 C100 225, 180 225, 195 240 L230 400 Z" fill="url(#sofiaShirt)" />
            
            {/* Colete Escolar Roxo Oficial da EEMTI */}
            <path d="M75 400 L95 250 C110 240, 170 240, 185 250 L205 400 L165 400 L140 310 L115 400 Z" fill="url(#sofiaVest)" stroke="#3b0764" strokeWidth="2" />
            
            {/* Gola da Camisa e Gravata Borboleta / Laço Escolar */}
            <polygon points="115,225 140,255 165,225 150,225 140,240 130,225" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="125,245 140,265 155,245 145,280 135,280" fill="#a855f7" stroke="#6b21a8" strokeWidth="1.5" />
            <circle cx="140" cy="252" r="4" fill="#fbbf24" />

            {/* Pescoço Suave */}
            <rect x="122" y="195" width="36" height="40" fill="url(#skinGrad)" rx="6" />
            {/* Sombra no pescoço sob o queixo */}
            <ellipse cx="140" cy="205" rx="20" ry="8" fill="#fbcfe8" opacity="0.6" />

            {/* Rosto Delicado */}
            <ellipse cx="140" cy="155" rx="58" ry="62" fill="url(#skinGrad)" />
            <path d="M85 150 Q140 225 195 150" fill="url(#skinGrad)" />

            {/* Cabelo Frontal com Franja Dividida Estilo Anime */}
            <path d="M75 140 C80 90, 200 90, 205 140 C190 110, 160 115, 140 135 C120 115, 90 110, 75 140 Z" fill="url(#sofiaHair)" />
            <path d="M70 130 C80 190, 88 230, 95 250 C86 220, 76 180, 70 130 Z" fill="url(#sofiaHair)" />
            <path d="M210 130 C200 190, 192 230, 185 250 C194 220, 204 180, 210 130 Z" fill="url(#sofiaHair)" />
            {/* Mechas soltas finas */}
            <path d="M125 110 Q130 145 135 150 Q130 130 132 110" fill="url(#sofiaHair)" />

            {/* Olhos Grandes e Expressivos (Roxos com Brilho Estelar) */}
            <g transform="translate(0, 0)">
              {/* Olho Esquerdo */}
              <ellipse cx="112" cy="156" rx="13" ry="16" fill="#3b0764" />
              <ellipse cx="112" cy="158" rx="10" ry="13" fill="#6b21a8" />
              <circle cx="108" cy="152" r="5" fill="#ffffff" />
              <circle cx="116" cy="162" r="2.5" fill="#ffffff" />
              
              {/* Olho Direito */}
              <ellipse cx="168" cy="156" rx="13" ry="16" fill="#3b0764" />
              <ellipse cx="168" cy="158" rx="10" ry="13" fill="#6b21a8" />
              <circle cx="164" cy="152" r="5" fill="#ffffff" />
              <circle cx="172" cy="162" r="2.5" fill="#ffffff" />

              {/* Pálpebras e Cílios Suaves */}
              <path d="M96 147 Q112 140 128 147" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M152 147 Q168 140 184 147" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />

              {/* Sobrancelhas Empáticas */}
              <path d="M100 138 Q112 132 124 136" stroke="#312e81" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M156 136 Q168 132 180 138" stroke="#312e81" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>

            {/* Armação de Óculos Estilizada Roxa (Marca de Sofia) */}
            <rect x="94" y="142" width="36" height="28" rx="8" fill="none" stroke="#6b21a8" strokeWidth="3" />
            <rect x="150" y="142" width="36" height="28" rx="8" fill="none" stroke="#6b21a8" strokeWidth="3" />
            <path d="M130 152 L150 152" stroke="#6b21a8" strokeWidth="3" />
            {/* Brilho no Vidro dos Óculos */}
            <line x1="98" y1="146" x2="114" y2="162" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            <line x1="154" y1="146" x2="170" y2="162" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />

            {/* Nariz Pequeno e Blush nas Bochechas */}
            <circle cx="140" cy="172" r="2" fill="#fb923c" />
            <ellipse cx="98" cy="170" rx="10" ry="5" fill="#f472b6" opacity="0.5" />
            <ellipse cx="182" cy="170" rx="10" ry="5" fill="#f472b6" opacity="0.5" />

            {/* Boca Expressiva (Gentil / Falando) */}
            {isSpeaking ? (
              <path d="M132 185 Q140 196 148 185 Z" fill="#e11d48" stroke="#be123c" strokeWidth="1.5" />
            ) : (
              <path d="M132 185 Q140 190 148 185" stroke="#e11d48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}
          </svg>
        )}

        {/* ===================================================================== */}
        {/* MODELO 2: LUCAS (aluno_timido) - CABELO CASTANHO, EXPRESSÃO SENSÍVEL  */}
        {/* ===================================================================== */}
        {type === 'aluno_timido' && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="lucasHair" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#290f02" />
              </linearGradient>
              <linearGradient id="lucasHoodie" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>
            </defs>

            {/* Cabelo de Trás */}
            <ellipse cx="140" cy="140" rx="70" ry="75" fill="url(#lucasHair)" />

            {/* Corpo / Casaco Moletom Escolar Azul */}
            <path d="M40 400 L80 240 C100 230, 180 230, 200 240 L240 400 Z" fill="url(#lucasHoodie)" />
            {/* Cordões do capuz */}
            <line x1="120" y1="260" x2="115" y2="340" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
            <line x1="160" y1="260" x2="165" y2="340" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
            <circle cx="115" cy="342" r="3.5" fill="#cbd5e1" />
            <circle cx="165" cy="342" r="3.5" fill="#cbd5e1" />

            {/* Pescoço com camiseta branca aparecendo */}
            <rect x="122" y="200" width="36" height="40" fill="#fed7aa" rx="6" />
            <polygon points="122,230 140,250 158,230" fill="#ffffff" />

            {/* Rosto do Lucas */}
            <ellipse cx="140" cy="155" rx="56" ry="60" fill="#fed7aa" />

            {/* Franja Longa que Cobre Parte dos Olhos */}
            <path d="M80 135 C95 90, 185 90, 200 135 C175 110, 150 145, 135 125 C120 145, 100 110, 80 135 Z" fill="url(#lucasHair)" />
            <path d="M75 130 C85 180, 95 210, 100 225 C90 190, 80 160, 75 130 Z" fill="url(#lucasHair)" />
            <path d="M205 130 C195 180, 185 210, 180 225 C190 190, 200 160, 205 130 Z" fill="url(#lucasHair)" />

            {/* Olhos Tímidos e Preocupados */}
            <g transform="translate(0, 0)">
              <ellipse cx="114" cy="156" rx="10" ry="12" fill="#0f172a" />
              <ellipse cx="166" cy="156" rx="10" ry="12" fill="#0f172a" />
              <circle cx="111" cy="153" r="3.5" fill="#ffffff" />
              <circle cx="163" cy="153" r="3.5" fill="#ffffff" />

              {/* Sobrancelhas Franzidas e Inseguras */}
              <path d="M102 142 Q114 146 126 140" stroke="#451a03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M154 140 Q166 146 178 142" stroke="#451a03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>

            <circle cx="140" cy="172" r="2" fill="#ea580c" />
            {/* Boca Tímida / Insegura */}
            {isSpeaking ? (
              <path d="M134 186 Q140 194 146 186 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1" />
            ) : (
              <path d="M134 187 Q140 185 146 187" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
            )}
          </svg>
        )}

        {/* ===================================================================== */}
        {/* MODELO 3: COORDENADORA HELENA - PROFISSIONAL, FIRME E ACOLHEDORA      */}
        {/* ===================================================================== */}
        {type === 'coordenadora' && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="helenaSuit" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#581c87" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
              <linearGradient id="helenaHair" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Penteado Elegante Preso em Coque */}
            <circle cx="140" cy="100" r="32" fill="url(#helenaHair)" />
            <circle cx="140" cy="140" rx="70" ry="75" fill="url(#helenaHair)" />

            {/* Blazer de Gestora Educacional Roxo Escuro */}
            <path d="M40 400 L80 235 C100 225, 180 225, 200 235 L240 400 Z" fill="url(#helenaSuit)" />
            {/* Lapela do Blazer e Blusa de Cetim Lilás */}
            <polygon points="110,225 140,280 170,225" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1" />
            <polygon points="80,235 125,320 140,320 140,400 65,400" fill="#3b0764" />
            <polygon points="200,235 155,320 140,320 140,400 215,400" fill="#3b0764" />
            
            {/* Pingente Dourado da Justiça Restaurativa */}
            <circle cx="140" cy="270" r="5" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />

            {/* Pescoço Maduro e Elegante */}
            <rect x="122" y="195" width="36" height="40" fill="#fed7aa" rx="6" />

            {/* Rosto Maduro e Sereno */}
            <ellipse cx="140" cy="155" rx="58" ry="62" fill="#fed7aa" />

            {/* Cabelo Frontal com Ondulação Sofisticada */}
            <path d="M80 135 C95 85, 185 85, 200 135 C175 105, 150 115, 140 120 C120 115, 95 105, 80 135 Z" fill="url(#helenaHair)" />

            {/* Olhos Firmes e Compassivos */}
            <g transform="translate(0, 0)">
              <ellipse cx="114" cy="154" rx="11" ry="13" fill="#3b0764" />
              <ellipse cx="166" cy="154" rx="11" ry="13" fill="#3b0764" />
              <circle cx="111" cy="150" r="4" fill="#ffffff" />
              <circle cx="163" cy="150" r="4" fill="#ffffff" />

              {/* Linhas de Expressão de Experiência e Sabedoria */}
              <path d="M100 138 Q114 132 128 136" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M152 136 Q166 132 180 138" stroke="#1e1b4b" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>

            {/* Brincos de Pérola */}
            <circle cx="80" cy="170" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <circle cx="200" cy="170" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

            {/* Boca Acolhedora de Mediadora */}
            {isSpeaking ? (
              <path d="M130 186 Q140 198 150 186 Z" fill="#9f1239" stroke="#881337" strokeWidth="1.5" />
            ) : (
              <path d="M130 186 Q140 192 150 186" stroke="#9f1239" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
          </svg>
        )}

        {/* ===================================================================== */}
        {/* MODELO 4: BERNARDO (aluno_lider) - CONFIANTE / DESAFIADOR             */}
        {/* ===================================================================== */}
        {type === 'aluno_lider' && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="bernardoJacket" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>

            {/* Cabelo Arrepiado Moderno Preto */}
            <path d="M80 140 C65 70, 215 70, 200 140 C210 110, 195 80, 140 80 C85 80, 70 110, 80 140 Z" fill="#0f172a" />

            {/* Jaqueta Esportiva Vermelha com Detalhes Escuros */}
            <path d="M40 400 L80 235 C100 225, 180 225, 200 235 L240 400 Z" fill="url(#bernardoJacket)" />
            {/* Camiseta Preta por Baixo com Gola V */}
            <polygon points="115,225 140,270 165,225" fill="#0f172a" />
            {/* Faixas da Jaqueta Esportiva */}
            <line x1="75" y1="260" x2="60" y2="400" stroke="#ffffff" strokeWidth="6" />
            <line x1="205" y1="260" x2="220" y2="400" stroke="#ffffff" strokeWidth="6" />

            {/* Pescoço Forte */}
            <rect x="120" y="195" width="40" height="40" fill="#fed7aa" rx="6" />

            {/* Rosto Confiante */}
            <ellipse cx="140" cy="155" rx="58" ry="62" fill="#fed7aa" />

            {/* Cabelo Frontal Espetado */}
            <path d="M85 130 C100 95, 180 95, 195 130 C180 115, 155 105, 140 100 C125 105, 100 115, 85 130 Z" fill="#0f172a" />

            {/* Olhos Desafiadores e Intensos */}
            <g transform="translate(0, 0)">
              <ellipse cx="114" cy="154" rx="11" ry="12" fill="#0f172a" />
              <ellipse cx="166" cy="154" rx="11" ry="12" fill="#0f172a" />
              <circle cx="111" cy="150" r="3" fill="#ffffff" />
              <circle cx="163" cy="150" r="3" fill="#ffffff" />

              {/* Sobrancelhas Inclinadas (Desafiadoras) */}
              <path d="M100 140 L126 148" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M180 140 L154 148" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
            </g>

            {/* Sorriso Lateral Irônico */}
            {isSpeaking ? (
              <path d="M130 184 Q140 196 152 182 Z" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1.5" />
            ) : (
              <path d="M130 186 Q142 192 152 182" stroke="#991b1b" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}
          </svg>
        )}

        {/* ===================================================================== */}
        {/* MODELO 5: INSPETOR / MEDIADOR ESCOLAR (inspetor)                     */}
        {/* ===================================================================== */}
        {(type === 'inspetor' || type === 'colega_apoio') && (
          <svg viewBox="0 0 280 400" className="w-full h-full drop-shadow-2xl">
            <ellipse cx="140" cy="140" rx="70" ry="75" fill="#334155" />
            <path d="M40 400 L80 235 C100 225, 180 225, 200 235 L240 400 Z" fill="#047857" />
            <polygon points="115,225 140,265 165,225" fill="#ffffff" />
            <rect x="122" y="195" width="36" height="40" fill="#fed7aa" rx="6" />
            <ellipse cx="140" cy="155" rx="58" ry="62" fill="#fed7aa" />
            <ellipse cx="114" cy="154" rx="10" ry="11" fill="#0f172a" />
            <ellipse cx="166" cy="154" rx="10" ry="11" fill="#0f172a" />
            <circle cx="111" cy="150" r="3" fill="#ffffff" />
            <circle cx="163" cy="150" r="3" fill="#ffffff" />
            <path d="M120 182 Q140 190 160 182" stroke="#334155" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M132 190 Q140 194 148 190" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        )}

      </div>

      {/* Cartão de Identificação do Personagem Embutido na Base (Estilo Visual Novel HUD) */}
      <div className="absolute bottom-2 z-10 px-4 py-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-purple-500/50 shadow-xl flex items-center gap-2">
        <span 
          className="w-2.5 h-2.5 rounded-full" 
          style={{ backgroundColor: character.accentColor || '#a855f7' }} 
        />
        <span className="font-display font-black text-xs text-white tracking-wide">
          {speakerName || character.name}
        </span>
        <span className="text-[10px] font-mono text-purple-300">
          • {character.role}
        </span>
      </div>
    </div>
  );
};
