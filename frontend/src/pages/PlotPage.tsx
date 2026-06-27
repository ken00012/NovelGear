import React, { useState } from 'react';
import { Plus, Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import mockPlots from '../mocks/plots.json';
import PlotCreateModal from '../features/plot/PlotCreateModal';
import PlotCardModal from '../features/plot/PlotCardModal';
import { PLOT_TEMPLATES, PLOT_BOARD_OPTIONS } from '../types/plot';
import type { PlotTemplateKey, PlotCard } from '../types/plot';

export default function PlotPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<PlotTemplateKey>('kishotenketsu');
  const [selectedCard, setSelectedCard] = useState<PlotCard | null>(null);

  const plots = mockPlots as PlotCard[];

  return (
    <div className="w-full h-[calc(100vh-2rem)] flex flex-col p-6 md:p-8">
      {/* ヘッダーエリア */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">プロットボード</h2>
          
          {/* ボードセレクター ＆ CRUDボタン */}
          <div className="flex items-center gap-1 ml-2">
            <div className="flex items-center gap-2 bg-bg-secondary border border-border rounded-lg px-3 py-1.5 shadow-sm">
              <select 
                className="bg-transparent text-sm font-bold text-text-primary focus:outline-none cursor-pointer pr-4"
                value={currentTemplate}
                onChange={(e) => setCurrentTemplate(e.target.value as PlotTemplateKey)}
              >
                {PLOT_BOARD_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-1 ml-1">
              <button className="p-2 text-text-secondary hover:text-accent hover:bg-bg-secondary rounded-lg transition-colors" title="ボード名を編集"><Edit2 size={16} /></button>
              <button className="p-2 text-text-secondary hover:text-danger hover:bg-bg-secondary rounded-lg transition-colors" title="ボードを削除"><Trash2 size={16} /></button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-bg-primary border border-border hover:bg-bg-secondary text-text-primary px-4 py-2 rounded-lg font-bold transition-all shadow-sm text-sm"
          >
            <Plus size={16} /> 新規ボード作成
          </button>
          <button className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg font-bold transition-all shadow-sm text-sm">
            <Plus size={16} /> カードを追加
          </button>
        </div>
      </div>

      {/* ボードエリア (横スクロール) */}
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1 items-start custom-scrollbar">
        
        {PLOT_TEMPLATES[currentTemplate].map((colName, idx) => {
          const colCards = plots.filter((p) => p.columnName === colName);
          
          return (
            <div key={idx} className="w-80 shrink-0 bg-bg-secondary rounded-xl p-3 flex flex-col max-h-full border border-border">
              <div className="flex justify-between items-center mb-3 px-1 group cursor-pointer">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-text-primary">{colName}</h3>
                  <span className="text-xs font-bold text-text-secondary bg-border px-2 py-0.5 rounded-full">{colCards.length}</span>
                </div>
                <button className="text-text-secondary hover:text-text-primary p-1 rounded hover:bg-border transition-colors"><MoreHorizontal size={16}/></button>
              </div>
              
              <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-1">
                {colCards.length > 0 ? (
                  colCards.map((card) => (
                    <div key={card.id} onClick={() => setSelectedCard(card)} className="bg-bg-primary p-3.5 rounded-lg border border-border shadow-sm cursor-grab active:cursor-grabbing hover:border-accent transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-text-primary line-clamp-2">{card.title}</h4>
                        <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity shrink-0">
                          <button className="text-text-secondary hover:text-accent p-0.5 rounded transition-colors"><Edit2 size={14}/></button>
                          <button className="text-text-secondary hover:text-danger p-0.5 rounded transition-colors"><Trash2 size={14}/></button>
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary line-clamp-3 mb-3">
                        {card.description}
                      </p>
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex gap-1.5 flex-wrap mt-auto">
                          {card.tags.map((tag, i) => (
                            <span key={i} className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              tag.type === 'character' ? 'bg-accent/10 text-accent' : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                            }`}>
                              {tag.text}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4 text-xs text-text-secondary font-medium border-2 border-dashed border-border rounded-lg">
                    カードがありません
                  </div>
                )}
              </div>
              
              <button className="mt-3 flex items-center justify-center gap-1.5 text-text-secondary hover:text-text-primary hover:bg-border/50 py-2 rounded-lg transition-colors text-xs font-bold w-full border border-transparent border-dashed hover:border-border">
                <Plus size={14} /> 追加
              </button>
            </div>
          );
        })}

        {/* 新規カラム追加パネル (横スクロールの末尾) */}
        <div className="w-80 shrink-0 bg-transparent hover:bg-border/50 rounded-xl p-3 flex flex-col max-h-full border-2 border-border border-dashed hover:border-text-secondary transition-all cursor-pointer justify-center items-center h-24 group">
          <div className="flex items-center gap-2 text-text-secondary group-hover:text-text-primary font-bold text-sm transition-colors">
            <Plus size={16} /> 新しい列を追加
          </div>
        </div>

      </div>

      <PlotCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <PlotCardModal isOpen={selectedCard !== null} onClose={() => setSelectedCard(null)} card={selectedCard} />
    </div>
  );
}
