import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import skillsData from '../../mocks/skills.json';
import FormField from '../../components/FormField';
import MasterDetailLayout from '../../components/Layout/MasterDetailLayout';
import type { Skill, Modifier } from '../../types/library';

export default function SkillTab() {
  const [items, setItems] = useState<Skill[]>(skillsData as Skill[]);
  const [activeItemId, setActiveItemId] = useState<number | null>(items.length > 0 ? items[0].id : null);

  return (
    <MasterDetailLayout<Skill>
      items={items}
      onSort={(newItems) => setItems(newItems)}
      activeId={activeItemId}
      onSelectItem={(id) => setActiveItemId(id as number)}
      detailTitle="スキルの編集"
      emptyMessage="左のリストからスキルを選択してください"
      renderListItem={(item) => (
        <>
          <span className="font-bold text-text-primary">{item.name}</span>
          <span className="text-xs text-text-secondary line-clamp-1">{item.description}</span>
        </>
      )}
      renderDetail={(item) => (
        <>
          <FormField label="スキル名">
            <input 
              type="text" 
              defaultValue={item.name}
              key={`name-${item.id}`}
              className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </FormField>
          
          <FormField label="説明">
            <textarea 
              defaultValue={item.description}
              key={`desc-${item.id}`}
              rows={2}
              className="w-full min-h-[64px] bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-y"
            />
          </FormField>

          {/* Modifier（ステータス補正）編集エリア */}
          <div className="mt-2 border-t border-border pt-3">
            <h4 className="text-sm font-bold text-text-secondary mb-2">ステータス補正 (Modifiers)</h4>
            
            {/* 既存Modifierのリスト（3列グリッド化） */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
              {item.modifiers && item.modifiers.map((mod: Modifier, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-bg-primary border border-border px-2 py-1.5 rounded-md shadow-sm">
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="font-bold text-text-primary">{mod.attribute_name}</span>
                    <span className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-xs font-bold">
                      {mod.value > 0 ? '+' : ''}{mod.value}{mod.type === 'percent' ? '%' : ''}
                    </span>
                  </div>
                  <button className="text-text-secondary hover:text-danger hover:bg-danger/10 p-1 rounded transition-colors">
                    <Trash2 size={14}/>
                  </button>
                </div>
              ))}
            </div>

            {/* 新規Modifier追加フォーム */}
            <div className="flex items-center gap-2 bg-bg-secondary p-2.5 rounded-lg border border-border border-dashed">
              <select className="flex-1 bg-bg-primary border border-border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-accent">
                <option>HP</option>
                <option>筋力</option>
              </select>
              <select className="w-28 bg-bg-primary border border-border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-accent">
                <option value="flat">固定値</option>
                <option value="percent">割合 (%)</option>
              </select>
              <input type="number" placeholder="値" className="w-20 bg-bg-primary border border-border rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-accent" />
              <button className="bg-bg-primary border border-border hover:border-accent hover:text-accent text-text-primary px-3 py-1.5 rounded-md text-sm font-bold transition-colors flex items-center gap-1 shadow-sm whitespace-nowrap">
                <Plus size={16} /> 追加
              </button>
            </div>
          </div>
        </>
      )}
    />
  );
}
