import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import jobsData from '../../mocks/jobs.json';
import FormField from '../../components/FormField';
import SortableList from '../../components/SortableList';

export default function JobTab() {
  const [items, setItems] = useState<any[]>(jobsData);
  const [activeJobId, setActiveJobId] = useState<number | null>(items.length > 0 ? items[0].id : null);
  
  const activeJob = items.find(j => j.id === activeJobId);

  const handleSort = (newItems: any[]) => {
    setItems(newItems);
  };

  return (
    <div className="flex gap-8 flex-1 min-h-0">
      
      {/* 左側: アイテム一覧リスト (幅1/3) */}
      <div className="w-1/3 flex flex-col gap-4 border-r border-border pr-6 overflow-y-auto custom-scrollbar">
        <button className="w-full flex items-center justify-center gap-2 bg-bg-secondary hover:bg-border text-text-primary px-4 py-3 rounded-lg font-medium transition-colors border border-border border-dashed">
          <Plus size={18} /> 新規作成
        </button>
        
        {/* SortableList を使用してアイテムを展開 */}
        <SortableList
          items={items}
          onSort={handleSort}
          renderItem={(job) => (
            <div 
              onClick={() => setActiveJobId(job.id)}
              className={`p-4 rounded-lg shadow-sm cursor-pointer flex flex-col gap-1 transition-all border bg-bg-primary ${
                activeJobId === job.id 
                  ? 'border-accent' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              <span className="font-bold text-text-primary">{job.name}</span>
              <span className="text-xs text-text-secondary line-clamp-1">{job.description}</span>
            </div>
          )}
        />
      </div>

      {/* 右側: 編集フォーム (幅2/3) */}
      <div className="w-2/3 overflow-y-auto pb-8">
        {activeJob ? (
          <div className="bg-bg-secondary rounded-xl border border-border p-5 shadow-sm flex flex-col gap-3">
            
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="text-xl font-bold text-text-primary">ジョブの編集</h3>
              <button className="text-danger hover:bg-danger/10 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium flex items-center gap-1">
                <Trash2 size={16} /> 削除
              </button>
            </div>

            {/* フォーム入力群 */}
            <div className="flex flex-col gap-3">
              <FormField label="ジョブ名">
                <input 
                  type="text" 
                  defaultValue={activeJob.name}
                  key={`name-${activeJob.id}`}
                  className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </FormField>
              
              <FormField label="説明">
                <textarea 
                  defaultValue={activeJob.description}
                  key={`desc-${activeJob.id}`}
                  rows={2}
                  className="w-full min-h-[64px] bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-y"
                />
              </FormField>

              {/* 追加の基礎値フォーム例（ガワだけ） */}
              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-bold text-text-primary mb-3">基本ステータス補正（モック）</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <FormField label="HP補正">
                    <input type="number" defaultValue="100" className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-3 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                  </FormField>
                  <FormField label="MP補正">
                    <input type="number" defaultValue="50" className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-3 py-2 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
                  </FormField>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary bg-bg-secondary rounded-xl border border-border p-6 shadow-sm">
            左のリストからジョブを選択してください
          </div>
        )}
      </div>

    </div>
  );
}
