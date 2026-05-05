import { Button } from '@/components/ui/button';
import { Input, InputPassword } from '@/components/ui/input';
import { useAuth } from '@/providers/authProvider/useAuth';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastHelper } from '@/lib/toast';

type LocationState = {
  from?: {
    pathname?: string;
  };
};

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectPath = state?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch {
      ToastHelper.error('Unable to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border bg-background p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Access your CRM/CMS admin workspace.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              autoComplete="email"
              placeholder="admin@example.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <InputPassword
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <Button className="w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link className="text-primary underline-offset-4 hover:underline" to="/forgot-password">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
