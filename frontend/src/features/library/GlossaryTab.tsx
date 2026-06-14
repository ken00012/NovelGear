import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import glossaryData from '../../mocks/glossary.json';
import FormField from '../../components/FormField';

export default function GlossaryTab() {
  const [activeId, setActiveId] = useState<number | null>(glossaryData.length > 0 ? glossaryData[0].id : null);
  const activeItem = glossaryData.find(j => j.id === activeId);

  return (
    <div className="flex gap-8 flex-1 min-h-0">
      {/* 左側: アイテム一覧リスト (幅1/3) */}
      <div className="w-1/3 flex flex-col gap-4 border-r border-border pr-6 overflow-y-auto custom-scrollbar">
        <button className="w-full flex items-center justify-center gap-2 bg-bg-secondary hover:bg-border text-text-primary px-4 py-3 rounded-lg font-medium transition-colors border border-border border-dashed">
          <Plus size={18} /> 新規作成
        </button>
        
        {glossaryData.map(item => (
          <div 
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`p-4 rounded-lg shadow-sm cursor-pointer flex flex-col gap-1 transition-all border ${
              activeId === item.id 
                ? 'bg-bg-primary border-accent' 
                : 'bg-bg-secondary border-border hover:border-accent/50'
            }`}
          >
            <span className="font-bold text-text-primary">{item.term}</span>
            <span className="text-xs text-text-secondary line-clamp-1">{item.description}</span>
          </div>
        ))}
      </div>

      {/* 右側: 編集フォーム (幅2/3) */}
      <div className="w-2/3 overflow-y-auto pb-8">
        {activeItem ? (
          <div className="bg-bg-secondary rounded-xl border border-border p-5 shadow-sm flex flex-col gap-3">
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-xl font-bold text-text-primary">用語の編集</h3>
              <button className="text-danger hover:bg-danger/10 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium flex items-center gap-1">
                <Trash2 size={16} /> 削除
              </button>
            </div>

            {/* フォーム入力群 */}
            <div className="flex flex-col gap-3">
              <FormField label="用語名">
                <input 
                  type="text" 
                  defaultValue={activeItem.term}
                  key={`term-${activeItem.id}`}
                  className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </FormField>
              
              <FormField label="説明">
                <textarea 
                  defaultValue={activeItem.description}
                  key={`desc-${activeItem.id}`}
                  rows={2}
                  className="w-full min-h-[64px] bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-y"
                />
              </FormField>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary bg-bg-secondary rounded-xl border border-border p-6 shadow-sm">
            左のリストから用語を選択してください
          </div>
        )}
      </div>
    </div>
  );
}
