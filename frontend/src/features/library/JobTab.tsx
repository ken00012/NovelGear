import React, { useState } from 'react';
import jobsData from '../../mocks/jobs.json';
import FormField from '../../components/FormField';
import MasterDetailLayout from '../../components/Layout/MasterDetailLayout';
import type { Job } from '../../types/library';

export default function JobTab() {
  const [items, setItems] = useState<Job[]>(jobsData as Job[]);
  const [activeJobId, setActiveJobId] = useState<number | null>(items.length > 0 ? items[0].id : null);

  return (
    <MasterDetailLayout<Job>
      items={items}
      onSort={(newItems) => setItems(newItems)}
      activeId={activeJobId}
      onSelectItem={(id) => setActiveJobId(id as number)}
      detailTitle="ジョブの編集"
      emptyMessage="左のリストからジョブを選択してください"
      renderListItem={(job) => (
        <>
          <span className="font-bold text-text-primary">{job.name}</span>
          <span className="text-xs text-text-secondary line-clamp-1">{job.description}</span>
        </>
      )}
      renderDetail={(job) => (
        <>
          <FormField label="ジョブ名">
            <input 
              type="text" 
              defaultValue={job.name}
              key={`name-${job.id}`}
              className="w-full bg-bg-primary border border-border text-text-primary rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
          </FormField>
          
          <FormField label="説明">
            <textarea 
              defaultValue={job.description}
              key={`desc-${job.id}`}
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
        </>
      )}
    />
  );
}
