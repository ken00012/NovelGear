import React from 'react';
import { Edit2, Trash2, Copy, Settings } from 'lucide-react';
import type { Thread, Post } from '../../types/board';

interface ChatPanelProps {
  /** 表示中のスレッド（null の場合は未選択） */
  thread: Thread | null;
  /** スレッドに紐づく投稿一覧 */
  posts: Post[];
  /** ペルソナ管理モーダルを開くコールバック */
  onOpenPersonaModal: () => void;
}

/**
 * 掲示板の右カラム：会話シミュレーター
 * ヘッダー + 書き込み履歴 + 入力エリア
 */
export default function ChatPanel({ thread, posts, onOpenPersonaModal }: ChatPanelProps) {
  if (!thread) {
    return (
      <div className="w-3/4 flex items-center justify-center bg-bg-secondary rounded-xl border border-border shadow-sm text-text-secondary">
        左のリストからスレッドを選択してください
      </div>
    );
  }

  return (
    <div className="w-3/4 flex flex-col bg-bg-secondary rounded-xl border border-border shadow-sm overflow-hidden">
      
      {/* スレッドヘッダー */}
      <div className="p-4 border-b border-border bg-bg-primary flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="font-bold text-lg text-text-primary">{thread.title}</h3>
          <button className="text-text-secondary hover:text-accent transition-colors"><Edit2 size={16}/></button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-text-secondary hover:bg-bg-secondary hover:text-danger px-3 py-1.5 rounded-lg transition-colors text-sm font-bold">
            <Trash2 size={16} /> 削除
          </button>
          <button className="flex items-center gap-1.5 text-accent hover:bg-accent/10 px-3 py-1.5 rounded-lg transition-colors text-sm font-bold">
            <Copy size={16} /> 内容をコピー
          </button>
        </div>
      </div>

      {/* 書き込み履歴（BBSスタイル） */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-bg-secondary">
        {posts.map((post) => (
          <div key={post.id} className="group flex flex-col gap-1 hover:bg-bg-primary/50 p-2 -mx-2 rounded-lg transition-colors">
            <div className="flex items-center justify-between text-xs font-mono text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="text-accent hover:underline cursor-pointer">{post.number}</span>
                <span className="font-bold text-[#228b22]">{post.name}</span>
              </div>
              {/* ホバー時のみ表示されるアクションボタン */}
              <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                 <button className="text-text-secondary hover:text-accent p-1"><Edit2 size={14}/></button>
                 <button className="text-text-secondary hover:text-danger p-1"><Trash2 size={14}/></button>
              </div>
            </div>
            <div className="text-sm text-text-primary leading-relaxed pl-4">
              {post.content}
            </div>
          </div>
        ))}
      </div>

      {/* 入力エリア */}
      <div className="p-4 border-t border-border bg-bg-primary">
        {/* キャラスイッチャー */}
        <div className="flex items-center gap-3 mb-3 pb-2 border-b border-border/50">
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-text-secondary">発言者:</label>
            <select className="bg-bg-secondary border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-accent font-bold text-text-primary">
              <option>名無しさん</option>
            </select>
            <button 
              onClick={onOpenPersonaModal}
              className="p-1.5 text-text-secondary hover:text-accent hover:bg-bg-secondary rounded-md transition-colors"
              title="ペルソナ管理"
            >
              <Settings size={18} />
            </button>
          </div>
          <div className="h-4 w-px bg-border"></div> {/* 区切り線 */}
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" className="rounded border-border text-accent focus:ring-accent" />
            <span className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">名無し（匿名）で書き込む</span>
          </label>
        </div>
        <div className="flex gap-2">
          <textarea className="flex-1 bg-bg-secondary border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-accent resize-y h-20" placeholder="書き込む内容を入力..."></textarea>
          <button className="bg-accent hover:bg-accent-hover text-white px-6 rounded-lg font-bold transition-all shadow-sm">
            書込
          </button>
        </div>
      </div>

    </div>
  );
}
