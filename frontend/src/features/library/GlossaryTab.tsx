import React, { useState } from 'react';
import glossaryData from '../../mocks/glossary.json';
import FormField from '../../components/FormField';
import MasterDetailLayout from '../../components/Layout/MasterDetailLayout';
import type { GlossaryTerm } from '../../types/library';

export default function GlossaryTab() {
  const [items, setItems] = useState<GlossaryTerm[]>(glossaryData as GlossaryTerm[]);
  const [activeItemId, setActiveItemId] = useState<number | null>(items.length > 0 ? items[0].id : null);

  return (
    <MasterDetailLayout<GlossaryTerm>
      items={items}
      onSort={(newItems) => setItems(newItems)}
      activeId={activeItemId}
      onSelectItem={(id) => setActiveItemId(id as number)}
      detailTitle="用語の編集"
      emptyMessage="左のリストから用語を選択してください"
      renderListItem={(item) => (
        <>
          <span className="font-bold text-text-primary">{item.term}</span>
          <span className="text-xs text-text-secondary line-clamp-1">{item.description}</span>
        </>
      )}
      renderDetail={(item) => (
        <>
          <FormField label="用語名">
            <input 
              type="text" 
              defaultValue={item.term}
              key={`term-${item.id}`}
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
        </>
      )}
    />
  );
}
