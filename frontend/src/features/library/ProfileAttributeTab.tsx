import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import SortableList from '../../components/SortableList';
import profileAttributesData from '../../mocks/profileAttributes.json';
import FormField from '../../components/FormField';

export default function ProfileAttributeTab() {
  const [items, setItems] = useState<any[]>(profileAttributesData);
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
              {/* ProfileAttribute の場合は type バッジを表示 */}
              {attr.type === 'tag' && <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded font-bold">Tag</span>}
              {attr.type === 'text' && <span className="text-xs bg-bg-secondary text-text-secondary px-2 py-1 rounded font-bold">Text</span>}
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

              <div className="grid grid-cols-1 gap-3">
                <FormField label="タイプ">
                  <select 
                    defaultValue={activeItem.type}
                    key={`type-${activeItem.id}`}
                    className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer"
                  >
                    <option value="text">フリーテキスト (Text)</option>
                    <option value="tag">タグ選択 (Tag)</option>
                  </select>
                </FormField>
              </div>

              {/* 右カラム内の基本フォームの下に配置: タグ管理UI */}
              {activeItem.type === 'tag' && (
                <div className="mt-4 border-t border-border pt-4">
                  <h4 className="text-sm font-bold text-text-primary mb-3">タグ管理</h4>

                  {/* 既存タグリスト（バッジ形式） */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {/* tags を map で展開 */}
                    {(activeItem.tags || []).map((tag: any, idx: number) => (
                      <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border border-border bg-bg-primary shadow-sm">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color || '#3b82f6' }}></span>
                        {tag.name}
                        <button className="text-text-secondary hover:text-danger ml-1 p-0.5 rounded-full hover:bg-danger/10 transition-colors"><X size={14} /></button>
                      </span>
                    ))}
                  </div>

                  {/* 新規タグ追加フォーム */}
                  <div className="flex items-center gap-2 bg-bg-secondary p-2.5 rounded-lg border border-border border-dashed">
                    <input type="text" placeholder="タグ名" className="flex-1 bg-bg-primary border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent" />
                    <input type="color" defaultValue="#3b82f6" className="w-10 h-10 p-1 bg-bg-primary border border-border rounded-md cursor-pointer" title="タグの色" />
                    <button className="bg-bg-primary border border-border hover:border-accent hover:text-accent text-text-primary px-3 py-1.5 rounded-md text-sm font-bold transition-colors flex items-center gap-1 shadow-sm whitespace-nowrap">
                      <Plus size={16} /> 追加
                    </button>
                  </div>
                </div>
              )}
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
