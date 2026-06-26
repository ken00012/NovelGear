import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface PlotCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlotCreateModal({ isOpen, onClose }: PlotCreateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-bg-primary w-full max-w-2xl rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh]">
        
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
              
              {/* 空白のボード (デフォルト選択状態のスタイリング) */}
              <div className="p-4 rounded-xl border-2 border-accent bg-accent/5 cursor-pointer relative transition-all">
                <div className="absolute top-3 right-3 text-accent"><CheckCircle2 size={18} /></div>
                <h4 className="font-bold text-text-primary mb-1 text-sm">空白のボード (デフォルト)</h4>
                <p className="text-xs text-text-secondary leading-relaxed">カラムが存在しない、完全に自由な状態からスタートします。自分だけの構成を作りたい場合に。</p>
              </div>

              {/* 起承転結 */}
              <div className="p-4 rounded-xl border-2 border-border hover:border-accent/50 bg-bg-primary cursor-pointer transition-all group">
                <h4 className="font-bold text-text-primary mb-1 text-sm group-hover:text-accent">起承転結</h4>
                <p className="text-xs text-text-secondary leading-relaxed">導入から結末までの4段階。日本の伝統的な物語構成であり、短いエピソードに最適です。</p>
              </div>

              {/* 三幕構成 */}
              <div className="p-4 rounded-xl border-2 border-border hover:border-accent/50 bg-bg-primary cursor-pointer transition-all group">
                <h4 className="font-bold text-text-primary mb-1 text-sm group-hover:text-accent">三幕構成</h4>
                <p className="text-xs text-text-secondary leading-relaxed">設定・対立・解決の3幕。映画脚本などで最も標準的で安定した王道の構成です。</p>
              </div>

              {/* ヒーローズ・ジャーニー */}
              <div className="p-4 rounded-xl border-2 border-border hover:border-accent/50 bg-bg-primary cursor-pointer transition-all group">
                <h4 className="font-bold text-text-primary mb-1 text-sm group-hover:text-accent">ヒーローズ・ジャーニー</h4>
                <p className="text-xs text-text-secondary leading-relaxed">神話の法則に基づく12のステージ。主人公の成長を描く冒険ファンタジーに最適です。</p>
              </div>

              {/* ハリウッド方式 */}
              <div className="p-4 rounded-xl border-2 border-border hover:border-accent/50 bg-bg-primary cursor-pointer transition-all group md:col-span-2">
                <h4 className="font-bold text-text-primary mb-1 text-sm group-hover:text-accent">ハリウッド方式 (Save the Cat)</h4>
                <p className="text-xs text-text-secondary leading-relaxed">15の細かいビートで構成される、読者を決して飽きさせないエンターテインメント特化の構成です。</p>
              </div>

            </div>
          </div>
        </div>

        {/* モーダルフッター */}
        <div className="p-4 bg-bg-secondary border-t border-border flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-4 py-2 rounded-lg font-bold text-sm text-text-secondary hover:bg-border transition-colors">キャンセル</button>
          <button onClick={onClose} className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-sm">作成する</button>
        </div>

      </div>
    </div>
  );
}
