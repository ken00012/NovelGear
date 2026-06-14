import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import skillsData from '../../mocks/skills.json';
import FormField from '../../components/FormField';

export default function SkillTab() {
  const [activeId, setActiveId] = useState<number | null>(skillsData.length > 0 ? skillsData[0].id : null);
  const activeItem = skillsData.find(j => j.id === activeId);

  return (
    <div className="flex gap-8 flex-1 min-h-0">
      {/* 左側: アイテム一覧リスト (幅1/3) */}
      <div className="w-1/3 flex flex-col gap-4 border-r border-border pr-6 overflow-y-auto custom-scrollbar">
        <button className="w-full flex items-center justify-center gap-2 bg-bg-secondary hover:bg-border text-text-primary px-4 py-3 rounded-lg font-medium transition-colors border border-border border-dashed">
          <Plus size={18} /> 新規作成
        </button>
        
        {skillsData.map(item => (
          <div 
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`p-4 rounded-lg shadow-sm cursor-pointer flex flex-col gap-1 transition-all border ${
              activeId === item.id 
                ? 'bg-bg-primary border-accent' 
                : 'bg-bg-secondary border-border hover:border-accent/50'
            }`}
          >
            <span className="font-bold text-text-primary">{item.name}</span>
            <span className="text-xs text-text-secondary line-clamp-1">{item.description}</span>
          </div>
        ))}
      </div>

      {/* 右側: 編集フォーム (幅2/3) */}
      <div className="w-2/3 overflow-y-auto pb-8">
        {activeItem ? (
          <div className="bg-bg-secondary rounded-xl border border-border p-5 shadow-sm flex flex-col gap-3">
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-xl font-bold text-text-primary">スキルの編集</h3>
              <button className="text-danger hover:bg-danger/10 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium flex items-center gap-1">
                <Trash2 size={16} /> 削除
              </button>
            </div>

            {/* フォーム入力群 */}
            <div className="flex flex-col gap-3">
              <FormField label="スキル名">
                <input 
                  type="text" 
                  defaultValue={activeItem.name}
                  key={`name-${activeItem.id}`}
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

              {/* Modifier（ステータス補正）編集エリア */}
              <div className="mt-2 border-t border-border pt-3">
                <h4 className="text-sm font-bold text-text-secondary mb-2">ステータス補正 (Modifiers)</h4>
                
                {/* 既存Modifierのリスト（3列グリッド化） */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
                  {activeItem.modifiers && activeItem.modifiers.map((mod: any, idx: number) => (
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

                {/* 新規Modifier追加フォーム (上のラベルを廃止して1行に圧縮) */}
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

            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary bg-bg-secondary rounded-xl border border-border p-6 shadow-sm">
            左のリストからスキルを選択してください
          </div>
        )}
      </div>
    </div>
  );
}
