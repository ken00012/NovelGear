import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

type SaveIndicatorProps = {
  status: SaveStatus;
  errorMessage?: string;
};

export default function SaveIndicator({ status, errorMessage }: SaveIndicatorProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status !== 'idle') {
      setVisible(true);
    }
    
    // 保存成功時は3秒後に表示を消す
    let timer: NodeJS.Timeout;
    if (status === 'saved') {
      timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
    
    return () => clearTimeout(timer);
  }, [status]);

  if (!visible || status === 'idle') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-bg-secondary border border-border shadow-md animate-fade-in-up">
      {status === 'saving' && (
        <>
          <Loader2 size={18} className="text-accent animate-spin" />
          <span className="text-sm font-medium text-text-primary">保存中...</span>
        </>
      )}
      {status === 'saved' && (
        <>
          <CheckCircle2 size={18} className="text-success" />
          <span className="text-sm font-medium text-text-primary">保存しました</span>
        </>
      )}
      {status === 'error' && (
        <>
          <AlertCircle size={18} className="text-danger" />
          <span className="text-sm font-medium text-danger">{errorMessage || '保存に失敗しました'}</span>
        </>
      )}
    </div>
  );
}
