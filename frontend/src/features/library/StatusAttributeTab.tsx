import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import SortableList from '../../components/SortableList';
import statusAttributesData from '../../mocks/statusAttributes.json';
import FormField from '../../components/FormField';

export default function StatusAttributeTab() {
  const [items, setItems] = useState<any[]>(statusAttributesData);
  const [activeId, setActiveId] = useState<string | number | null>(items.length > 0 ? items[0].id : null);
  
  const activeItem = items.find(j => j.id === activeId);

  const handleDragEnd = (newItems: any[]) => {
    setItems(newItems);
  };

  return (
    <div className="flex gap-8 flex-1 min-h-0">
      {/* 左側: アイテム一覧リスト (幅1/3) */}
      <div className="w-1/3 flex flex-col gap-4 border-r border-border pr-6 overflow-y-auto custom-scrollbar">
        <button className="w-full flex items-center justify-center gap-2 bg-bg-secondary hover:bg-border text-text-primary px-4 py-3 rounded-lg font-medium transition-colors border border-border border-dashed">
          <Plus size={18} /> 新規属性を作成
        </button>

        {/* SortableList を使用してアイテムを展開 */}
        <SortableList
          items={items}
          onSort={handleDragEnd}
          renderItem={(attr) => (
            <div 
              onClick={() => setActiveId(attr.id)}
              className={`p-4 bg-bg-primary border rounded-lg shadow-sm cursor-grab active:cursor-grabbing flex justify-between items-center transition-all ${activeId === attr.id ? 'border-accent' : 'border-border hover:border-accent/50'}`}
            >
              <div>
                <div className="font-bold text-text-primary">{attr.name}</div>
              </div>
            </div>
          )}
        />
      </div>

      {/* 右側: 編集フォーム (幅2/3) */}
      <div className="w-2/3 overflow-y-auto pb-8">
        {activeItem ? (
          <div className="bg-bg-secondary rounded-xl border border-border p-5 shadow-sm flex flex-col gap-3">
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-xl font-bold text-text-primary">属性の編集</h3>
              <button className="text-danger hover:bg-danger/10 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium flex items-center gap-1">
                <Trash2 size={16} /> 削除
              </button>
            </div>

            {/* フォーム入力群 */}
            <div className="flex flex-col gap-3">
              <FormField label="表示名">
                <input 
                  type="text" 
                  defaultValue={activeItem.name}
                  key={`name-${activeItem.id}`}
                  className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </FormField>

              <FormField label="説明">
                <textarea 
                  defaultValue={activeItem.description || ''}
                  key={`desc-${activeItem.id}`}
                  rows={2}
                  className="w-full min-h-[64px] bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-y"
                />
              </FormField>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary bg-bg-secondary rounded-xl border border-border p-6 shadow-sm">
            左のリストから属性を選択してください
          </div>
        )}
      </div>
    </div>
  );
}
