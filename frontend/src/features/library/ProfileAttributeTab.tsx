import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import profileAttributesData from '../../mocks/profileAttributes.json';
import FormField from '../../components/FormField';
import MasterDetailLayout from '../../components/Layout/MasterDetailLayout';
import type { ProfileAttribute, ProfileTag } from '../../types/library';

export default function ProfileAttributeTab() {
  const [items, setItems] = useState<ProfileAttribute[]>(profileAttributesData as ProfileAttribute[]);
  const [activeId, setActiveId] = useState<string | number | null>(items.length > 0 ? items[0].id : null);

  return (
    <MasterDetailLayout<ProfileAttribute>
      items={items}
      onSort={(newItems) => setItems(newItems)}
      activeId={activeId}
      onSelectItem={(id) => setActiveId(id)}
      createButtonLabel="新規属性を作成"
      detailTitle="属性の編集"
      emptyMessage="左のリストから属性を選択してください"
      renderListItem={(attr) => (
        <div className="flex justify-between items-center w-full">
          <div className="font-bold text-text-primary">{attr.name}</div>
          <div>
            {/* ProfileAttribute の場合は type バッジを表示 */}
            {attr.type === 'tag' && <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded font-bold">Tag</span>}
            {attr.type === 'text' && <span className="text-xs bg-bg-secondary text-text-secondary px-2 py-1 rounded font-bold">Text</span>}
          </div>
        </div>
      )}
      renderDetail={(item) => (
        <>
          <FormField label="表示名">
            <input 
              type="text" 
              defaultValue={item.name}
              key={`name-${item.id}`}
              className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </FormField>

          <div className="grid grid-cols-1 gap-3">
            <FormField label="タイプ">
              <select 
                defaultValue={item.type}
                key={`type-${item.id}`}
                className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer"
              >
                <option value="text">フリーテキスト (Text)</option>
                <option value="tag">タグ選択 (Tag)</option>
              </select>
            </FormField>
          </div>

          {/* タグ管理UI（タグ型の場合のみ表示） */}
          {item.type === 'tag' && (
            <div className="mt-4 border-t border-border pt-4">
              <h4 className="text-sm font-bold text-text-primary mb-3">タグ管理</h4>

              {/* 既存タグリスト（バッジ形式） */}
              <div className="flex flex-wrap gap-2 mb-3">
                {(item.tags || []).map((tag: ProfileTag, idx: number) => (
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
        </>
      )}
    />
  );
}
