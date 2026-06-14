import React from 'react';
import { Plus, GripVertical, Trash2 } from 'lucide-react';
import EmptyState from '../../components/EmptyState';

interface CustomAttribute {
  key: string;
  value: string;
}

interface CustomAttributesProps {
  customAttributes: CustomAttribute[];
}

export default function CustomAttributes({ customAttributes }: CustomAttributesProps) {
  return (
    <div className="bg-bg-primary border border-border rounded-lg p-6 shadow-sm flex flex-col h-full min-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-text-primary">カスタム属性</h2>
        <button 
          className="text-accent hover:bg-accent/10 p-1.5 rounded-md transition-colors"
          title="カスタム属性を追加"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="flex-1">
        {customAttributes.length === 0 ? (
          <EmptyState 
            title="属性がありません" 
            description="キャラクター固有の属性（口調や詳細な生い立ちなど）を追加できます。"
          />
        ) : (
          <div className="flex flex-col gap-4">
            {customAttributes.map((attr, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-bg-secondary p-3 rounded-md border border-border group">
                <div className="text-text-secondary mt-2 cursor-grab touch-none opacity-50 group-hover:opacity-100 transition-opacity">
                  <GripVertical size={18} />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <input 
                    type="text" 
                    defaultValue={attr.key} 
                    placeholder="属性名（例: 一人称）" 
                    className="w-full bg-bg-primary border border-border text-text-primary rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-accent transition-colors" 
                  />
                  <textarea 
                    defaultValue={attr.value} 
                    placeholder="値" 
                    rows={2} 
                    className="w-full bg-bg-primary border border-border text-text-primary rounded px-2.5 py-1.5 text-sm focus:outline-none focus:border-accent resize-none transition-colors" 
                  />
                </div>
                <button 
                  className="text-danger opacity-50 hover:opacity-100 p-1.5 rounded-md hover:bg-danger/10 transition-all mt-1"
                  title="削除"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
