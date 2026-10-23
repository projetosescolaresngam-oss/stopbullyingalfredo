import React, { useState } from 'react';
import { 
  InvestigationItem, 
  NarrativeStory 
} from '../../../data/narrativeStoriesData';
import { 
  X, 
  Search, 
  MessageSquare, 
  FileText, 
  Users, 
  ShieldCheck, 
  Clock, 
  Lock, 
  CheckCircle2, 
  AlertTriangle,
  Smartphone,
  Eye,
  Info
} from 'lucide-react';

interface InvestigationBoardModalProps {
  story: NarrativeStory;
  currentActNumber: number;
  isOpen: boolean;
  onClose: () => void;
}

export const InvestigationBoardModal: React.FC<InvestigationBoardModalProps> = ({
  story,
  currentActNumber,
  isOpen,
  onClose
}) => {
  const [activeCategory, setActiveCategory] = useState<'todas' | 'pista' | 'dialogo' | 'evidencia' | 'cronologia'>('todas');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const items = story.investigationItems;

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'todas' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedItem = items.find(item => item.id === selectedItemId) || filteredItems[0] || null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-gradient-to-b from-[#18122B] via-[#120D24] to-[#0A0716] border-2 border-purple-500/40 shadow-2xl overflow-hidden text-white"
        role="dialog"
        aria-modal="true"
        aria-labelledby="investigation-board-title"
      >
        {/* CABEÇALHO DO PAINEL DE INVESTIGAÇÃO */}
        <div className="p-4 sm:p-6 border-b border-purple-500/30 flex items-center justify-between bg-purple-950/40">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-purple-800 border border-fuchsia-400/50 shadow-md">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-fuchsia-300 bg-fuchsia-950/60 border border-fuchsia-500/40 px-2 py-0.5 rounded-full">
                  Mural de Investigação Ética
                </span>
                <span className="text-[10px] text-purple-300 font-mono">
                  Ato Atual: {currentActNumber} de 5
                </span>
              </div>
              <h2 id="investigation-board-title" className="font-display font-black text-lg sm:text-2xl text-white mt-0.5">
                Dossiê: {story.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 cursor-pointer"
            aria-label="Fechar painel de investigação"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BARRA DE FILTROS E BUSCA */}
        <div className="p-3 sm:p-4 bg-purple-950/20 border-b border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Abas de Categorias */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'todas', label: 'Tudo', icon: Search, count: items.length },
              { id: 'pista', label: 'Pistas', icon: FileText, count: items.filter(i => i.category === 'pista').length },
              { id: 'dialogo', label: 'Diálogos', icon: Users, count: items.filter(i => i.category === 'dialogo').length },
              { id: 'evidencia', label: 'Evidências', icon: ShieldCheck, count: items.filter(i => i.category === 'evidencia').length },
              { id: 'cronologia', label: 'Cronologia', icon: Clock, count: items.filter(i => i.category === 'cronologia').length }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-md shadow-fuchsia-900/30 border border-fuchsia-400/50'
                      : 'bg-white/5 hover:bg-white/10 text-purple-200 border border-purple-500/20'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/30' : 'bg-white/10'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Campo de Busca Rápida */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Buscar pistas ou relatos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-white placeholder-purple-400/60 focus:outline-none focus:border-fuchsia-400"
            />
          </div>
        </div>

        {/* CORPO DO MURAL: GRID DE PISTAS + DETALHES DA PISTA SELECIONADA */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* COLUNA ESQUERDA: LISTA DE ITENS */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-purple-300 font-bold px-1">
              <span>Evidências Identificadas</span>
              <span>{filteredItems.length} itens</span>
            </div>

            <div className="space-y-2.5">
              {filteredItems.map((item) => {
                const isUnlocked = item.unlockAtAct <= currentActNumber;
                const isSelected = selectedItem?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => isUnlocked && setSelectedItemId(item.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                      !isUnlocked
                        ? 'bg-purple-950/20 border-purple-900/40 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-gradient-to-r from-purple-900/60 to-fuchsia-950/60 border-fuchsia-400 shadow-lg ring-1 ring-fuchsia-400/40'
                        : 'bg-white/5 hover:bg-white/10 border-purple-500/20 hover:border-purple-400/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg text-xs ${
                          item.category === 'pista' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          item.category === 'dialogo' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                          item.category === 'evidencia' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}>
                          {item.category === 'pista' && <FileText className="w-3.5 h-3.5" />}
                          {item.category === 'dialogo' && <Users className="w-3.5 h-3.5" />}
                          {item.category === 'evidencia' && <ShieldCheck className="w-3.5 h-3.5" />}
                          {item.category === 'cronologia' && <Clock className="w-3.5 h-3.5" />}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-purple-300 block line-clamp-1">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>

                      {isUnlocked ? (
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Ato {item.unlockAtAct}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-950/60 border border-purple-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          Ato {item.unlockAtAct}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-gray-300 line-clamp-2 mt-2 leading-relaxed">
                      {isUnlocked ? item.description : 'Esta evidência será revelada no desenrolar da narrativa conforme novas decisões forem tomadas.'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUNA DIREITA: VISUALIZADOR DETALHADO DO ITEM SELECIONADO */}
          <div className="lg:col-span-7">
            {selectedItem ? (
              <div className="h-full rounded-2xl bg-gradient-to-b from-[#1c1533] to-[#140e26] border border-purple-500/30 p-5 space-y-5 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  {/* Topo do Dossiê */}
                  <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-fuchsia-300">
                        {selectedItem.category.toUpperCase()} • ATO {selectedItem.unlockAtAct}
                      </span>
                      <h3 className="font-display font-black text-lg sm:text-xl text-white">
                        {selectedItem.title}
                      </h3>
                      <p className="text-xs text-purple-200">
                        {selectedItem.subtitle}
                      </p>
                    </div>

                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      selectedItem.importance === 'critica'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    }`}>
                      {selectedItem.importance === 'critica' ? 'Relevância Crítica' : 'Evidência de Contexto'}
                    </span>
                  </div>

                  {/* VISUALIZAÇÃO ESPECIALIZADA POR TIPO */}
                  {selectedItem.contentDetails.messages ? (
                    /* SIMULADOR DE TELA DE CELULAR / CHAT FICTÍCIO */
                    <div className="rounded-2xl bg-[#090b14] border-2 border-purple-500/40 p-4 space-y-3 shadow-inner">
                      {/* Barra de Status do Smartphone */}
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono pb-2 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-fuchsia-400" />
                          <span>StopChat Seguro (Fictício)</span>
                        </div>
                        <span>14:28 • 100% 🔋</span>
                      </div>

                      {/* Header do Grupo */}
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-purple-900/30 border border-purple-500/20">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-xs text-white">
                          #
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">
                            {selectedItem.contentDetails.sender}
                          </span>
                          <span className="text-[10px] text-purple-300">
                            18 membros da turma • Mensagens preservadas
                          </span>
                        </div>
                      </div>

                      {/* Balões de Mensagem */}
                      <div className="space-y-2 py-2">
                        {selectedItem.contentDetails.messages.map((msg, idx) => (
                          <div 
                            key={idx}
                            className={`p-3 rounded-2xl max-w-[85%] text-xs space-y-1 shadow-sm ${
                              msg.isSelf 
                                ? 'ml-auto bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-tr-xs' 
                                : 'bg-[#181a29] text-gray-200 border border-white/10 rounded-tl-xs'
                            }`}
                          >
                            <span className="text-[10px] font-bold text-fuchsia-300 block">
                              {msg.sender}
                            </span>
                            <p className="text-xs leading-relaxed">{msg.text}</p>
                            <span className="text-[9px] text-gray-400 block text-right">
                              {msg.time}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-[10px] text-purple-200 flex items-center gap-2">
                        <Info className="w-3.5 h-3.5 text-fuchsia-400 flex-shrink-0" />
                        <span>Preservação probatória com data e hora conforme marco legal. Conteúdo fictício para fins educativos.</span>
                      </div>
                    </div>
                  ) : (
                    /* VISUALIZAÇÃO PADRÃO DE DOCUMENTO / DEPOIMENTO */
                    <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-fuchsia-300">
                        <FileText className="w-4 h-4" />
                        <span>Transcrição dos Fatos & Registros</span>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed font-serif italic p-3 rounded-xl bg-purple-950/30 border-l-4 border-fuchsia-500">
                        "{selectedItem.contentDetails.text}"
                      </p>
                      {selectedItem.contentDetails.timestamp && (
                        <span className="text-[11px] text-purple-300 font-mono block">
                          ⏱️ Registro temporal: {selectedItem.contentDetails.timestamp}
                        </span>
                      )}
                    </div>
                  )}

                  {/* NOTA JURÍDICA E PEDAGÓGICA */}
                  {selectedItem.contentDetails.legalNote && (
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-950/40 to-purple-950/40 border border-fuchsia-500/30 text-xs space-y-1.5">
                      <div className="flex items-center gap-2 text-fuchsia-300 font-bold">
                        <ShieldCheck className="w-4 h-4 text-fuchsia-400" />
                        <span>Fundamentação e Enquadramento Legal:</span>
                      </div>
                      <p className="text-purple-100 text-[11px] leading-relaxed">
                        {selectedItem.contentDetails.legalNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* Rodapé do Visualizador */}
                <div className="pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs text-purple-300">
                  <span>🔒 Preservação sigilosa sem exposição da vítima</span>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-xs hover:from-fuchsia-500 hover:to-purple-500 transition-all cursor-pointer shadow-md"
                  >
                    Voltar à Narrativa
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-center text-purple-300">
                <p>Selecione uma pista na lista ao lado para inspecionar os detalhes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
