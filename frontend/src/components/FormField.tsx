import React, { ReactNode } from 'react';

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
};

export default function FormField({ label, error, children, required }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 mb-4 w-full">
      <label className="text-sm font-medium text-text-primary flex items-center gap-1">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      {/* 
        children には input, textarea, select 等が入ることを想定。
        これらの入力要素にも bg-bg-secondary や border-border などのテーマ変数を
        適用したクラスを付与することが期待されます。
      */}
      {children}
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
