import { useSelector } from 'react-redux';

import { selectLoading } from '@/stores/loading/loadingSlice';

function GlobalLoading() {
  const { isLoading, message } = useSelector(selectLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-background px-6 py-4 shadow-lg border">
        <span className="inline-flex size-10 items-center justify-center rounded-full border-2 border-primary/40 border-t-primary/90 animate-spin" />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Đang tải...</p>
          {message && (
            <p className="mt-1 text-xs text-muted-foreground max-w-xs">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalLoading;
