import React from 'react';
import ModalOverlay from '../../components/ModalOverlay';

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
  return (
    <ModalOverlay isOpen={isOpen} onClose={onCancel} maxWidth="max-w-md">
      <div className="p-6">
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
            // プライマリーアクションはアクセントカラーかデンジャーカラーを使用
            className={`px-4 py-2 rounded-md text-white transition-opacity hover:opacity-80 ${
              isDanger ? 'bg-danger' : 'bg-accent'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
