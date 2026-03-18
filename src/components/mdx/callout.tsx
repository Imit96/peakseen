import { cn } from '@/lib/utils';

interface CalloutProps {
  type?: 'tip' | 'warning' | 'info';
  children: React.ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div
      className={cn(
        'my-6 rounded-lg border p-4',
        type === 'tip' && 'border-green-200 bg-green-50',
        type === 'warning' && 'border-amber-200 bg-amber-50',
        type === 'info' && 'border-blue-200 bg-blue-50'
      )}
    >
      {children}
    </div>
  );
}
