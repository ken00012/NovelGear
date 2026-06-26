import React from 'react';
import { X, Trash2, AlignLeft, Tags, Plus } from 'lucide-react';

interface PlotCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlotCardModal({ isOpen, onClose }: PlotCardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-bg-primary w-full max-w-3xl rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh]">
        
        <div className="p-4 border-b border-border flex justify-between items-center bg-bg-secondary shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-text-secondary bg-border px-2 py-1 rounded">起 (Introduction)</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-text-secondary hover:text-danger p-1.5 rounded transition-colors"><Trash2 size={18}/></button>
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary p-1.5 rounded transition-colors"><X size={20}/></button>
          </div>
        </div>
        
        <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar flex-1">
          {/* タイトル */}
          <div>
            <input type="text" defaultValue="主人公の日常と旅立ち" className="w-full bg-bg-secondary border border-border rounded-lg px-4 py-2 text-xl font-bold text-text-primary focus:outline-none focus:border-accent transition-all" />
          </div>

          {/* 本文 */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm font-bold text-text-secondary mb-2 flex items-center gap-2"><AlignLeft size={16}/> プロット詳細</label>
            <textarea 
              defaultValue="平和な村で暮らす主人公。しかし、ある日村の近くの森で魔物の異常発生が起こり、巻き込まれてしまう。" 
              className="w-full flex-1 min-h-[150px] bg-bg-secondary border border-border rounded-lg p-4 text-sm text-text-primary focus:outline-none focus:border-accent resize-y leading-relaxed"
            ></textarea>
          </div>

          {/* メタデータ（タグ） */}
          <div className="border-t border-border pt-5">
            <label className="text-sm font-bold text-text-secondary mb-3 flex items-center gap-2"><Tags size={16}/> 関連タグ</label>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-accent/10 text-accent px-2.5 py-1.5 rounded">
                勇者アレン <button className="hover:text-danger"><X size={12}/></button>
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold bg-[#f59e0b]/10 text-[#f59e0b] px-2.5 py-1.5 rounded">
                重要フラグ <button className="hover:text-danger"><X size={12}/></button>
              </span>
              <button className="text-xs font-bold text-text-secondary hover:text-text-primary bg-bg-secondary border border-border border-dashed hover:border-text-secondary px-2.5 py-1.5 rounded transition-colors flex items-center gap-1">
                <Plus size={12}/> タグを追加
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-bg-secondary border-t border-border flex justify-end shrink-0">
          <button onClick={onClose} className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">保存して閉じる</button>
        </div>
      </div>
    </div>
  );
}
