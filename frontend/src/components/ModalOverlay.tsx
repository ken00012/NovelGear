import React, { ReactNode } from 'react';

interface ModalOverlayProps {
  /** モーダルの表示状態 */
  isOpen: boolean;
  /** オーバーレイクリックまたは閉じる操作時のコールバック */
  onClose: () => void;
  /** モーダル内部のコンテンツ */
  children: ReactNode;
  /** モーダルの最大幅（Tailwindのmax-wクラス名）。デフォルト: 'max-w-2xl' */
  maxWidth?: string;
}

/**
 * モーダル共通オーバーレイ
 * 背景暗転・blur・中央配置・オーバーレイクリック閉じを統一的に提供する
 */
export default function ModalOverlay({ isOpen, onClose, children, maxWidth = 'max-w-2xl' }: ModalOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* オーバーレイ背景（クリックで閉じる） */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      {/* モーダルコンテンツ（クリック伝搬を止める） */}
      <div
        className={`relative z-10 bg-bg-primary w-full ${maxWidth} rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
