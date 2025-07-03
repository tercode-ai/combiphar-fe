import { SessionToken } from '@/lib/cookies';
// import { useAuth } from '@/providers/auth-provider';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // const { isAuthenticated } = useAuth();

  const token = SessionToken.get();
  if (!token) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
