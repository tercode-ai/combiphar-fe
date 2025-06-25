import NotFound from '@/pages/not-found';
import { lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import PublicRoute from './public-route';
import ProtectedRoute from './protected-route';

import GeneralFile from '@/pages/files/general';
import DivisionFile from '@/pages/files/division';

const SignInPage = lazy(() => import('@/pages/auth/signin'));

const MainLayout = lazy(() => import('@/components/layout/main-layout'));
const NewMainLayout = lazy(() => import('@/components/layout/new-main-layout'));

const ChatPage = lazy(() => import('@/pages/chat'));
const EnhancePage = lazy(() => import('@/pages/enhance'));

const ThankyouPage = lazy(() => import('@/pages/thankyou'));
// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/old',
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
          element: <Navigate to="/old/chat" replace />
        },
        {
          path: '/old/chat',
          element: <ChatPage />
        },
        {
          path: '/old/files/general',
          element: <GeneralFile />
        },
        {
          path: '/old/files/division',
          element: <DivisionFile />
        },
        {
          path: '/old/enhance',
          element: <EnhancePage />
        }
      ]
    },
    {
      path: '/new',
      element: (
        <ProtectedRoute>
          <NewMainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/new/chat" replace />
        },
        {
          path: '/new/chat',
          element: <ChatPage />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/auth/signin',
      element: (
        <PublicRoute>
          <SignInPage />
        </PublicRoute>
      ),
      index: true
    },
    {
      path: '/thankyou',
      element: <ThankyouPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    }
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />
    // }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
