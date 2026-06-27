import React, { useState } from 'react';
import statusAttributesData from '../../mocks/statusAttributes.json';
import FormField from '../../components/FormField';
import MasterDetailLayout from '../../components/Layout/MasterDetailLayout';
import type { StatusAttribute } from '../../types/library';

export default function StatusAttributeTab() {
  const [items, setItems] = useState<StatusAttribute[]>(statusAttributesData as StatusAttribute[]);
  const [activeId, setActiveId] = useState<string | number | null>(items.length > 0 ? items[0].id : null);

  return (
    <MasterDetailLayout<StatusAttribute>
      items={items}
      onSort={(newItems) => setItems(newItems)}
      activeId={activeId}
      onSelectItem={(id) => setActiveId(id)}
      createButtonLabel="新規属性を作成"
      detailTitle="属性の編集"
      emptyMessage="左のリストから属性を選択してください"
      renderListItem={(attr) => (
        <div className="font-bold text-text-primary">{attr.name}</div>
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

          <FormField label="説明">
            <textarea 
              defaultValue={item.description || ''}
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
