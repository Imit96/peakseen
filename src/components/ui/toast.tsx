'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  className?: string;
}

const icons = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
} as const;

const styles = {
  success: 'border-success bg-success-light text-success',
  error: 'border-error bg-error-light text-error',
  info: 'border-accent bg-accent-subtle text-accent',
} as const;

export function Toast({ message, type = 'info', onClose, className }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const Icon = icons[type];

  return (
    <div
      role="alert"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-md',
        styles[type],
        className
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="ml-2 shrink-0 rounded p-0.5 transition-opacity hover:opacity-70"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
