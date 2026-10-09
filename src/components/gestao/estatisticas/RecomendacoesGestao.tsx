import React from 'react';
import { Denuncia } from '../../../types';
import { 
  Sparkles, 
  Lightbulb, 
  ShieldCheck, 
  Target, 
  CheckSquare, 
  AlertTriangle,
  ArrowRight,
  School,
  Users,
  Compass
} from 'lucide-react';

interface RecomendacoesGestaoProps {
  denuncias: Denuncia[];
}

export const RecomendacoesGestao: React.FC<RecomendacoesGestaoProps> = ({ denuncias }) => {
  const total = denuncias.length;

  // Cálculos dinâmicos para acionar recomendações específicas
  const cyberCount = denuncias.filter(d => d.tipo_violencia === 'Cyberbullying').length;
  const cyberPct = total > 0 ? Math.round((cyberCount / total) * 100) : 0;

  const patioCount = denuncias.filter(d => d.local_escola === 'Pátio/Recreio').length;
  const patioPct = total > 0 ? Math.round((patioCount / total) * 100) : 0;

  const verbalCount = denuncias.filter(d => d.tipo_violencia === 'Verbal').length;
  const verbalPct = total > 0 ? Math.round((verbalCount / total) * 100) : 0;

  const testemunhaCount = denuncias.filter(d => 
    d.papel_denunciante === 'Testemunha' || d.papel_denunciante === 'Amigo/Colega'
  ).length;
  const testemunhaPct = total > 0 ? Math.round((testemunhaCount / total) * 100) : 0;

  const criticosCount = denuncias.filter(d => 
    d.is_sos || d.nivel_escalada === 'Crítica' || d.nivel_gravidade === 'Grave'
  ).length;

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-6">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-black uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Inteligência Preventiva Automatizada
          </div>
          <h3 className="font-bold text-sm sm:text-base text-white uppercase tracking-wider">
            Recomendações Estratégicas para o Colegiado Escolar
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Orientações pedagógicas geradas a partir dos padrões concretos de dados registrados na EEMTI Alfredo Machado.
          </p>
        </div>

        <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-2xl font-bold flex items-center gap-1.5 self-start sm:self-center">
          <ShieldCheck className="w-4 h-4" /> Diretrizes Alinhadas à Lei 13.185/2015
        </span>
      </div>

      {/* Grid de Recomendações Dinâmicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. Supervisão de Pátio e Recreio */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5 uppercase">
                <Compass className="w-3.5 h-3.5" />
                Intervenção em Pátio & Recreio
              </span>
              <span className="text-[10px] font-mono text-gray-400">{patioPct}% dos casos</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Implementar escala volante de mediação e recreio dirigido
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              O pátio concentra expressivo volume de ocorrências durante o almoço. Recomenda-se criar zonas de convivência com jogos de tabuleiro cooperativos e rodízio de professores mediadores no refeitório.
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-pink-300 font-semibold">
            <span>Ação Sugerida: Coordenação de Pátio & Grêmio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 2. Cidadania Digital & Cyberbullying */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 uppercase">
                <Lightbulb className="w-3.5 h-3.5" />
                Cidadania Digital & Redes Sociais
              </span>
              <span className="text-[10px] font-mono text-gray-400">{cyberPct}% dos casos</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Oficina sobre a Lei 14.811/2024 (Art. 146-A do Código Penal)
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Mapeamento de figurinhas depreciativas e prints fora de contexto exige formação jurídica e ética sobre a responsabilidade legal de postagens e o impacto psicológico da humilhação virtual.
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-purple-300 font-semibold">
            <span>Ação Sugerida: Aula de Cidadania & Palestra SEDUC</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 3. Comunicação Não-Violenta e Círculos de Empatia */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
                <Target className="w-3.5 h-3.5" />
                Círculos de Empatia em Sala de Aula
              </span>
              <span className="text-[10px] font-mono text-gray-400">{verbalPct}% verbal</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Dinâmicas de Comunicação Não-Violenta (CNV) nos 1ºs e 2ºs anos
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Apelidos pejorativos e zombarias durante seminários podem ser desconstruídos através de contratos didáticos firmados pelos estudantes com seus Professores Diretores de Turma (PDT).
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-indigo-300 font-semibold">
            <span>Ação Sugerida: Professores Diretores de Turma</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 4. Valorização dos Espectadores Ativos */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                <Users className="w-3.5 h-3.5" />
                Cultura do Espectador Protetor
              </span>
              <span className="text-[10px] font-mono text-gray-400">{testemunhaPct}% por testemunhas</span>
            </div>
            <h4 className="font-bold text-sm text-white">
              Campanha "Quem Protege é Líder: Não Seja Cúmplice do Silêncio"
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              O expressivo índice de denúncias vindas de colegas e amigos comprova que os estudantes confiam no sigilo do app. Deve-se reforçar homenagens simbólicas à coragem moral dos jovens.
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
            <span>Ação Sugerida: Grêmio Estudantil & Conquistas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Protocolo de Crises Graves se Houver Casos Críticos */}
      {criticosCount > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-2 text-xs text-rose-200">
          <div className="flex items-center gap-2 text-rose-400 font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <span>Alerta de Resposta Rápida: {criticosCount} caso(s) com gravidade crítica / SOS</span>
          </div>
          <p className="text-[11px] leading-relaxed text-rose-300">
            Casos com violência física ou ameaças severas demandam convocação solene dos responsáveis legais em até 24 horas, emissão do Termo de Acolhimento e, se necessário, notificação formal ao Conselho Tutelar e à CREDE 12 em conformidade com o regimento escolar.
          </p>
        </div>
      )}

      {/* Checklist Executivo para a Equipe Gestora */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
        <h4 className="text-xs font-black uppercase text-gray-200 tracking-wider flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          Plano de Ação Trimestral da EEMTI Alfredo Machado
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
          <label className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5">
            <input type="checkbox" defaultChecked className="rounded text-emerald-500 accent-emerald-500" />
            <span>Apresentar métricas na reunião pedagógica mensal</span>
          </label>
          <label className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5">
            <input type="checkbox" defaultChecked className="rounded text-emerald-500 accent-emerald-500" />
            <span>Enviar relatório consolidado à CREDE 12</span>
          </label>
          <label className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5">
            <input type="checkbox" defaultChecked className="rounded text-emerald-500 accent-emerald-500" />
            <span>Executar círculos restaurativos com turmas prioritárias</span>
          </label>
          <label className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/5">
            <input type="checkbox" defaultChecked className="rounded text-emerald-500 accent-emerald-500" />
            <span>Verificar cumprimento de acordos nos prazos de 15 e 30 dias</span>
          </label>
        </div>
      </div>

    </div>
  );
};
