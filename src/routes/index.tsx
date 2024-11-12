import NotFound from '@/pages/not-found';
import { lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import PublicRoute from './public-route';
import ProtectedRoute from './protected-route';

const SignInPage = lazy(() => import('@/pages/auth/signin'));

const MainLayout = lazy(() => import('@/components/layout/main-layout'));

const ChatPage = lazy(() => import('@/pages/chat'));
const UploadFilePage = lazy(() => import('@/pages/upload-file'));
// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />
        },
        {
          path: '/chat',
          element: <ChatPage />
        },
        {
          path: '/files',
          element: <UploadFilePage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: (
        <PublicRoute>
          <SignInPage />
        </PublicRoute>
      ),
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
