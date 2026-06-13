import React from 'react';

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
};

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = '確認',
  cancelText = 'キャンセル',
  onConfirm,
  onCancel,
  isDanger = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景をぼかすオーバーレイ。テーマの背景色にopacityを適用して利用 */}
      <div 
        className="absolute inset-0 bg-bg-primary opacity-50 backdrop-blur-sm transition-opacity" 
        onClick={onCancel}
        aria-hidden="true"
      />
      
      {/* モーダルコンテンツ */}
      <div className="relative z-10 bg-bg-primary border border-border rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in-up">
        <h2 className="text-xl font-bold text-text-primary mb-2">{title}</h2>
        <p className="text-text-secondary mb-6">{message}</p>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-text-primary bg-bg-secondary border border-border hover:opacity-80 transition-opacity"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            // プライマリーアクションはアクセントカラーかデンジャーカラーを使用。文字色は視認性確保のため白(またはテーマ依存)にするが、ここでは汎用的に明度を確保。
            className={`px-4 py-2 rounded-md text-white transition-opacity hover:opacity-80 ${
              isDanger ? 'bg-danger' : 'bg-accent'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
