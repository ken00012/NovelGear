import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import type { Thread } from '../../types/board';

interface ThreadListProps {
  /** スレッド一覧 */
  threads: Thread[];
  /** 選択中のスレッドID */
  activeThreadId: number | null;
  /** スレッド選択時のコールバック */
  onSelectThread: (id: number) => void;
}

/**
 * 掲示板の左カラム：スレッド一覧
 */
export default function ThreadList({ threads, activeThreadId, onSelectThread }: ThreadListProps) {
  return (
    <div className="w-1/4 flex flex-col gap-3 border-r border-border pr-6 overflow-y-auto">
      <button className="w-full flex items-center justify-center gap-2 bg-bg-secondary hover:bg-border text-text-primary px-4 py-2.5 rounded-lg font-medium transition-colors border border-border border-dashed mb-2">
        <Plus size={18} /> 新規スレッド
      </button>

      {threads.map((thread) => (
        <div
          key={thread.id}
          onClick={() => onSelectThread(thread.id)}
          className={`group p-3 bg-bg-primary border rounded-lg shadow-sm cursor-pointer flex flex-col gap-1 ${
            activeThreadId === thread.id ? 'border-accent' : 'border-border hover:border-accent/50'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="font-bold text-sm text-text-primary line-clamp-1">{thread.title}</div>
            {/* ホバー時のみ表示されるアクション */}
            <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity shrink-0">
              <button className="text-text-secondary hover:text-accent p-0.5"><Edit2 size={14}/></button>
              <button className="text-text-secondary hover:text-danger p-0.5"><Trash2 size={14}/></button>
            </div>
          </div>
          <div className="text-xs text-text-secondary">レス: {thread.post_count}</div>
        </div>
      ))}
    </div>
  );
}
