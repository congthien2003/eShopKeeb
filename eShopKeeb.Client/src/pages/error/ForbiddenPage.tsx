import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">403</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Access denied
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You do not have permission to access this page. Please contact an administrator if this looks incorrect.
        </p>
        <div className="mt-6 flex gap-3">
          <Button className="flex-1" onClick={() => navigate('/dashboard')}>
            <Home className="h-4 w-4" />
            Dashboard
          </Button>
          <Button className="flex-1" variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForbiddenPage;
