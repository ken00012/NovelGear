import React from 'react';
import { Plus, Trash2, Files, X } from 'lucide-react';
import ModalOverlay from '../../components/ModalOverlay';
import type { Persona } from '../../types/board';

interface PersonaManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** ペルソナ一覧 */
  personas: Persona[];
}

/**
 * 「掲示板の民」管理モーダル
 */
export default function PersonaManagerModal({ isOpen, onClose, personas }: PersonaManagerModalProps) {
  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      {/* ヘッダー (固定) */}
      <div className="p-6 border-b border-border flex justify-between items-center bg-bg-secondary shrink-0">
        <h3 className="text-xl font-bold text-text-primary">掲示板の民の管理</h3>
        <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors"><X size={20}/></button>
      </div>
      
      {/* コンテンツ領域 (スクロール可能) */}
      <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
        
        {/* 掲示板の民リスト */}
        <div className="flex flex-col gap-2">
          {personas.map((persona) => (
            <div key={persona.id} className="flex items-center justify-between p-2 bg-bg-secondary rounded-lg border border-border group transition-colors focus-within:border-accent">
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  persona.isCharacter
                    ? 'bg-accent/20 text-accent'
                    : 'bg-bg-primary border border-border text-text-secondary'
                }`}>
                  {persona.initial}
                </div>
                <input type="text" defaultValue={persona.name} className="flex-1 bg-transparent border-none focus:ring-0 px-1 py-0.5 text-sm font-bold text-text-primary outline-none" />
              </div>
              <button className="text-text-secondary hover:text-danger p-2 rounded transition-colors"><Trash2 size={16}/></button>
            </div>
          ))}
        </div>

        {/* アクション群 */}
        <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-border">
          <button className="w-full flex items-center justify-center gap-2 bg-bg-primary border border-border hover:bg-bg-secondary text-text-primary px-4 py-2.5 rounded-lg font-bold transition-all text-sm shadow-sm">
            <Plus size={16} /> 新しい民を追加
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent px-4 py-2.5 rounded-lg font-bold transition-all text-sm">
            <Files size={16} /> 他の掲示板からインポート
          </button>
        </div>
      </div>
      
      {/* フッター (固定) */}
      <div className="p-4 bg-bg-secondary border-t border-border flex justify-end shrink-0">
        <button onClick={onClose} className="bg-text-primary hover:bg-text-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors">完了</button>
      </div>
    </ModalOverlay>
  );
}
