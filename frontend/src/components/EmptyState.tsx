import React, { ReactNode } from 'react';

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center border-2 border-dashed border-border rounded-lg bg-bg-primary w-full">
      {icon && <div className="text-text-secondary mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-text-primary mb-2">{title}</h3>
      {description && <p className="text-sm text-text-secondary mb-6 max-w-md">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
