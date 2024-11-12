import { useAuth } from '@/providers/auth-provider';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return children;
};

export default PublicRoute;
