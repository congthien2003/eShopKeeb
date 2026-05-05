import { useAuth } from '@/providers/authProvider/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

type RoleRouteProps = {
  roles: string[];
};

function RoleRoute({ roles }: RoleRouteProps) {
  const { hasRole } = useAuth();

  if (!hasRole(roles)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
