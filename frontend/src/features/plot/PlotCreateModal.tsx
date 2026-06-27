import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import ModalOverlay from '../../components/ModalOverlay';
import { PlotTemplateKey, PLOT_TEMPLATE_INFO } from '../../types/plot';

interface PlotCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlotCreateModal({ isOpen, onClose }: PlotCreateModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<PlotTemplateKey>('blank');

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      {/* モーダルヘッダー */}
      <div className="p-6 border-b border-border flex justify-between items-center bg-bg-secondary shrink-0">
        <h3 className="text-xl font-bold text-text-primary">新規プロットボードの作成</h3>
        <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors"><X size={20}/></button>
      </div>
      
      {/* モーダルコンテンツ (スクロール可能) */}
      <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        
        {/* ボード名入力 */}
        <div>
          <label className="block text-sm font-bold text-text-secondary mb-2">ボード名</label>
          <input type="text" placeholder="例: 第3章、キャラクター過去編など" className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent text-text-primary font-bold" />
        </div>

        {/* テンプレート選択 (グリッド) */}
        <div>
          <label className="block text-sm font-bold text-text-secondary mb-3">構成テンプレートの選択</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PLOT_TEMPLATE_INFO.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.key;
              return (
                <div
                  key={tmpl.key}
                  onClick={() => setSelectedTemplate(tmpl.key)}
                  className={`p-4 rounded-xl border-2 cursor-pointer relative transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50 bg-bg-primary'
                  } ${tmpl.key === 'saveTheCat' ? 'md:col-span-2' : ''}`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 text-accent"><CheckCircle2 size={18} /></div>
                  )}
                  <h4 className={`font-bold mb-1 text-sm ${isSelected ? 'text-text-primary' : 'text-text-primary group-hover:text-accent'}`}>{tmpl.name}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{tmpl.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* モーダルフッター */}
      <div className="p-4 bg-bg-secondary border-t border-border flex justify-end gap-3 shrink-0">
        <button onClick={onClose} className="px-4 py-2 rounded-lg font-bold text-sm text-text-secondary hover:bg-border transition-colors">キャンセル</button>
        <button onClick={onClose} className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">作成する</button>
      </div>
    </ModalOverlay>
  );
}
