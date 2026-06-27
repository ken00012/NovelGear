import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import equipmentsData from '../../mocks/equipments.json';
import FormField from '../../components/FormField';
import MasterDetailLayout from '../../components/Layout/MasterDetailLayout';
import type { Equipment, Modifier } from '../../types/library';

export default function EquipmentTab() {
  const [items, setItems] = useState<Equipment[]>(equipmentsData as Equipment[]);
  const [activeId, setActiveId] = useState<number | null>(items.length > 0 ? items[0].id : null);

  return (
    <MasterDetailLayout<Equipment>
      items={items}
      onSort={(newItems) => setItems(newItems)}
      activeId={activeId}
      onSelectItem={(id) => setActiveId(id as number)}
      detailTitle="装備品の編集"
      emptyMessage="左のリストから装備品を選択してください"
      renderListItem={(item) => (
        <>
          <div className="flex items-center justify-between">
            <span className="font-bold text-text-primary">{item.name}</span>
            {item.rarity && <span className="text-[10px] border border-accent text-accent px-1.5 py-0.5 rounded">{item.rarity}</span>}
          </div>
          <span className="text-xs text-text-secondary line-clamp-1">{item.description}</span>
        </>
      )}
      renderDetail={(item) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <FormField label="装備名">
                <input 
                  type="text" 
                  defaultValue={item.name}
                  key={`name-${item.id}`}
                  className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </FormField>
            </div>
            <div className="md:col-span-1">
              <FormField label="レアリティ">
                <select 
                  defaultValue={item.rarity || 'Common'}
                  key={`rarity-${item.id}`}
                  className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none cursor-pointer"
                >
                  <option value="Common">Common</option>
                  <option value="Uncommon">Uncommon</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
              </FormField>
            </div>
          </div>
          
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
