import React, { useState } from 'react';
import { Plus, Copy, Edit2, Trash2, Settings, X, Files } from 'lucide-react';

export default function BoardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-8 flex flex-col h-[calc(100vh-2rem)]">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-text-primary tracking-tight">掲示板エディタ</h2>
      </div>

      <div className="flex gap-8 flex-1 min-h-0">
        {/* 左側: スレッド一覧 */}
        <div className="w-1/4 flex flex-col gap-3 border-r border-border pr-6 overflow-y-auto">
          <button className="w-full flex items-center justify-center gap-2 bg-bg-secondary hover:bg-border text-text-primary px-4 py-2.5 rounded-lg font-medium transition-colors border border-border border-dashed mb-2">
            <Plus size={18} /> 新規スレッド
          </button>
          {/* threads.map で展開。選択中のスレッドはアクセントカラーで強調 */}
          <div className="group p-3 bg-bg-primary border border-accent rounded-lg shadow-sm cursor-pointer flex flex-col gap-1">
            <div className="flex justify-between items-start">
              <div className="font-bold text-sm text-text-primary line-clamp-1">【急募】魔王の倒し方</div>
              {/* ホバー時のみ表示されるアクション */}
              <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity shrink-0">
                <button className="text-text-secondary hover:text-accent p-0.5"><Edit2 size={14}/></button>
                <button className="text-text-secondary hover:text-danger p-0.5"><Trash2 size={14}/></button>
              </div>
            </div>
            <div className="text-xs text-text-secondary">レス: 12</div>
          </div>
        </div>

        {/* 右側: 会話シミュレーター */}
        <div className="w-3/4 flex flex-col bg-bg-secondary rounded-xl border border-border shadow-sm overflow-hidden">
          
          {/* スレッドヘッダー */}
          <div className="p-4 border-b border-border bg-bg-primary flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-lg text-text-primary">【急募】魔王の倒し方</h3>
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
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-[#f9f9f9]">
            {/* メッセージの例 */}
            <div className="group flex flex-col gap-1 hover:bg-bg-primary/50 p-2 -mx-2 rounded-lg transition-colors">
              <div className="flex items-center justify-between text-xs font-mono text-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="text-accent hover:underline cursor-pointer">1</span>
                  <span className="font-bold text-[#228b22]">勇者アレン</span>
                  {/* 日時は表示しない */}
                </div>
                {/* ホバー時のみ表示されるアクションボタン */}
                <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition-opacity">
                   <button className="text-text-secondary hover:text-accent p-1"><Edit2 size={14}/></button>
                   <button className="text-text-secondary hover:text-danger p-1"><Trash2 size={14}/></button>
                </div>
              </div>
              <div className="text-sm text-text-primary leading-relaxed pl-4">
                ぶっちゃけ、聖剣なしで勝てる気がしないんだけど。
              </div>
            </div>
          </div>

          {/* 入力エリア */}
          <div className="p-4 border-t border-border bg-bg-primary">
            {/* キャラスイッチャー（堅牢版） */}
            <div className="flex items-center gap-3 mb-3 pb-2 border-b border-border/50">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-text-secondary">発言者:</label>
                <select className="bg-bg-secondary border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-accent font-bold text-text-primary">
                  <option>勇者アレン</option>
                  <option>魔法使いリナ</option>
                  <option>戦士ゴードン</option>
                </select>
                <button 
                  onClick={() => setIsModalOpen(true)}
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
      </div>

      {/* 「掲示板の民」管理モーダルの内部構造 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-bg-primary w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[80vh]">
            
            {/* ヘッダー (固定) */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-bg-secondary shrink-0">
              <h3 className="text-xl font-bold text-text-primary">掲示板の民の管理</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-text-primary transition-colors"><X size={20}/></button>
            </div>
            
            {/* コンテンツ領域 (スクロール可能) */}
            <div className="p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
              
              {/* 掲示板の民リスト */}
              <div className="flex flex-col gap-2">
                {/* アイテム1: インライン編集可能な入力フォーム */}
                <div className="flex items-center justify-between p-2 bg-bg-secondary rounded-lg border border-border group transition-colors focus-within:border-accent">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs shrink-0">ア</div>
                    <input type="text" defaultValue="勇者アレン" className="flex-1 bg-transparent border-none focus:ring-0 px-1 py-0.5 text-sm font-bold text-text-primary outline-none" />
                  </div>
                  <button className="text-text-secondary hover:text-danger p-2 rounded transition-colors"><Trash2 size={16}/></button>
                </div>

                {/* アイテム2: NPCの例 */}
                <div className="flex items-center justify-between p-2 bg-bg-secondary rounded-lg border border-border group transition-colors focus-within:border-accent">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-full bg-bg-primary border border-border flex items-center justify-center text-text-secondary font-bold text-xs shrink-0">衛</div>
                    <input type="text" defaultValue="名無しの衛兵" className="flex-1 bg-transparent border-none focus:ring-0 px-1 py-0.5 text-sm font-bold text-text-primary outline-none" />
                  </div>
                  <button className="text-text-secondary hover:text-danger p-2 rounded transition-colors"><Trash2 size={16}/></button>
                </div>
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
              <button onClick={() => setIsModalOpen(false)} className="bg-text-primary hover:bg-text-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors">完了</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
