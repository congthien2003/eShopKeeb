import { createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from '@/pages/error/ErrorPage';
import AdminLayout from '@/components/layout/AdminLayout';
import UserPage from '@/pages/users';
import DemoPage from '@/pages/demo';
import RolePage from '@/pages/roles';
import PackagesPage from '@/pages/packages';
import LoginPage from '@/pages/auth/LoginPage';
import ForbiddenPage from '@/pages/error/ForbiddenPage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import ProtectedRoute from './guards/ProtectedRoute';
import PublicRoute from './guards/PublicRoute';

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/forgot-password', element: <LoginPage /> },
      { path: 'demo', element: <DemoPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: 'dashboard', element: <div>Dashboard</div> },
          { path: 'users', element: <UserPage /> },
          { path: 'roles', element: <RolePage /> },
          { path: 'packages', element: <PackagesPage /> },
          { path: 'settings', element: <div>Settings</div> },
        ],
      },
    ],
  },
  { path: '/403', element: <ForbiddenPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

export default router;
