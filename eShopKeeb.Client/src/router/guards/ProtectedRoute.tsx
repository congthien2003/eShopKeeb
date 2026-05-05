import GlobalLoading from '@/components/ui/loading/GlobalLoading';
import { useAuth } from '@/providers/authProvider/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) {
    return <GlobalLoading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
