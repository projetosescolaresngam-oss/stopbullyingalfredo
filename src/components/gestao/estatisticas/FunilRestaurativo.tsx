import React from 'react';
import { Denuncia } from '../../../types';
import { 
  HeartHandshake, 
  BrainCircuit, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Smile, 
  Frown,
  Activity,
  Award
} from 'lucide-react';

interface FunilRestaurativoProps {
  denuncias: Denuncia[];
}

export const FunilRestaurativo: React.FC<FunilRestaurativoProps> = ({ denuncias }) => {
  const total = denuncias.length;

  // Contagem das etapas
  let escuta = 0;
  let preMediacao = 0;
  let sessaoDialogo = 0;
  let acordoFirmado = 0;
  let monitoramento = 0;
  let pacificado = 0;

  denuncias.forEach(d => {
    // Se o caso está resolvido, passou por todo o fluxo
    if (d.status === 'Resolvido' || d.etapa_mediacao === 'pacificado') {
      escuta += 1;
      preMediacao += 1;
      sessaoDialogo += 1;
      acordoFirmado += 1;
      monitoramento += 1;
      pacificado += 1;
    } else if (d.status === 'Acolhido') {
      escuta += 1;
      preMediacao += 1;
      if (d.etapa_mediacao === 'monitoramento') {
        sessaoDialogo += 1;
        acordoFirmado += 1;
        monitoramento += 1;
      } else if (d.etapa_mediacao === 'acordo_firmado') {
        sessaoDialogo += 1;
        acordoFirmado += 1;
      } else if (d.etapa_mediacao === 'sessao_dialogo') {
        sessaoDialogo += 1;
      }
    } else {
      // Em Análise
      escuta += 1;
      if (d.acoes_mediacao && d.acoes_mediacao.length > 0) {
        preMediacao += 1;
      }
    }
  });

  const etapas = [
    {
      numero: '01',
      nome: 'Escuta Inicial & Triagem',
      descricao: 'Acolhimento empático imediato do estudante e registro do protocolo sigiloso.',
      quantidade: escuta,
      percentual: total > 0 ? Math.round((escuta / total) * 100) : 100,
      cor: 'from-purple-600 to-indigo-600',
      tag: '100% de Acolhimento'
    },
    {
      numero: '02',
      nome: 'Pré-Mediação Individual',
      descricao: 'Ouvida de cada parte em separado pela comissão para compreender as causas profundas.',
      quantidade: preMediacao,
      percentual: total > 0 ? Math.round((preMediacao / total) * 100) : 0,
      cor: 'from-indigo-600 to-blue-600',
      tag: 'Neutralidade Ativa'
    },
    {
      numero: '03',
      nome: 'Círculo de Diálogo Restaurativo',
      descricao: 'Encontro presencial facilitado pelos mediadores escolares com foco na reparação do dano.',
      quantidade: sessaoDialogo,
      percentual: total > 0 ? Math.round((sessaoDialogo / total) * 100) : 0,
      cor: 'from-blue-600 to-cyan-600',
      tag: 'Comunicação Não-Violenta'
    },
    {
      numero: '04',
      nome: 'Pactuação do Acordo de Convivência',
      descricao: 'Assinatura voluntária dos compromissos mútuos de respeito e reparação moral/simbólica.',
      quantidade: acordoFirmado,
      percentual: total > 0 ? Math.round((acordoFirmado / total) * 100) : 0,
      cor: 'from-cyan-600 to-teal-500',
      tag: 'Compromisso Escrito'
    },
    {
      numero: '05',
      nome: 'Monitoramento & Check-ins (7, 15, 30d)',
      descricao: 'Acompanhamento preventivo com a vítima e com os professores para garantir paz contínua.',
      quantidade: monitoramento,
      percentual: total > 0 ? Math.round((monitoramento / total) * 100) : 0,
      cor: 'from-teal-500 to-emerald-500',
      tag: 'Acompanhamento Ativo'
    },
    {
      numero: '06',
      nome: 'Pacificação Plena / Caso Concluído',
      descricao: 'Convivência harmoniosa restabelecida, sem qualquer reincidência registrada.',
      quantidade: pacificado,
      percentual: total > 0 ? Math.round((pacificado / total) * 100) : 0,
      cor: 'from-emerald-500 to-green-400',
      tag: 'Cultura de Paz Consolidada'
    }
  ];

  // Contagem de impactos psicossociais
  const impactosContagem: Record<string, number> = {
    'Isolamento no recreio/sala': 0,
    'Queda no rendimento escolar': 0,
    'Ansiedade e medo de vir à escola': 0,
    'Faltas frequentes / Fobia escolar': 0,
    'Crises de choro / Tristeza profunda': 0
  };

  denuncias.forEach(d => {
    if (d.impactos_identificados && d.impactos_identificados.length > 0) {
      d.impactos_identificados.forEach(imp => {
        if (/isolamento/i.test(imp)) impactosContagem['Isolamento no recreio/sala'] += 1;
        else if (/rendimento|nota/i.test(imp)) impactosContagem['Queda no rendimento escolar'] += 1;
        else if (/ansiedade|medo/i.test(imp)) impactosContagem['Ansiedade e medo de vir à escola'] += 1;
        else if (/falta|evas/i.test(imp)) impactosContagem['Faltas frequentes / Fobia escolar'] += 1;
        else impactosContagem['Crises de choro / Tristeza profunda'] += 1;
      });
    } else {
      // Estimativa diagnóstica baseada na gravidade
      if (d.nivel_gravidade === 'Grave' || d.is_sos) {
        impactosContagem['Ansiedade e medo de vir à escola'] += 1;
        impactosContagem['Queda no rendimento escolar'] += 1;
      } else {
        impactosContagem['Isolamento no recreio/sala'] += 1;
      }
    }
  });

  return (
    <div className="space-y-6">
      
      {/* 1. O FUNIL RESTAURATIVO */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              Funil do Fluxo Restaurativo Escolar (Metodologia EEMTI)
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Trajetória pedagógica da denúncia: do primeiro relato ao restabelecimento pacífico da convivência escolar.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold self-start sm:self-center">
            <Award className="w-3.5 h-3.5" />
            Meta SEDUC: Pacificação Dialogada
          </div>
        </div>

        {/* Visualização em Degraus Decrescentes */}
        <div className="space-y-3">
          {etapas.map((etp) => (
            <div 
              key={etp.numero} 
              className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/[0.07] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-white/10 text-white font-mono font-black text-xs flex items-center justify-center flex-shrink-0">
                    {etp.numero}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white flex items-center gap-2">
                      {etp.nome}
                      <span className="text-[10px] text-gray-400 font-normal hidden md:inline">
                        • {etp.tag}
                      </span>
                    </h4>
                    <p className="text-[11px] text-gray-300 line-clamp-1">
                      {etp.descricao}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0 font-mono">
                  <span className="text-xs font-bold text-white">
                    {etp.quantidade} casos
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                    {etp.percentual}%
                  </span>
                </div>
              </div>

              {/* Barra do Funil */}
              <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${etp.cor} transition-all duration-700`}
                  style={{ width: `${Math.max(5, etp.percentual)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. IMPACTOS PSICOSSOCIAIS IDENTIFICADOS */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#090e1c] border border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              Impactos Socioemocionais & Sinais de Sofrimento Mapeados
            </h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Diagnóstico preventivo para orientar a equipe de psicólogos escolares, professores orientadores e coordenação.
            </p>
          </div>
          <Activity className="w-4 h-4 text-purple-400 hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(impactosContagem).map(([impacto, qtd]) => {
            const pct = total > 0 ? Math.round((qtd / total) * 100) : 0;
            return (
              <div key={impacto} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-200">{impacto}</span>
                  <span className="font-mono text-purple-300 font-bold">{qtd} alunos ({pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/50 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                    style={{ width: `${Math.max(4, pct)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota Metodológica de Cuidado Integral */}
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-start gap-3 text-xs text-purple-200">
          <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-purple-300">
            <strong>Diretriz Pedagógica da EEMTI Alfredo Machado:</strong> Cada ocorrência relatada gera acolhimento sem revitimização. O estudante vítima recebe escuta ativa prioritária, enquanto o autor da ofensa é responsabilizado pedagogicamente por meio de reflexão orientada, retratação e reparação do dano.
          </p>
        </div>

      </div>

    </div>
  );
};
