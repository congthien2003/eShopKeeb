import GlobalLoading from '@/components/ui/loading/GlobalLoading';
import { useAuth } from '@/providers/authProvider/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return <GlobalLoading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
