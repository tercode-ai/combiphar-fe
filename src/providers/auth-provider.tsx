import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!Cookies.get('cm')
  );

  const login = (token: string) => {
    Cookies.set('cm', token, { expires: 7 });
    Cookies.set('session_id', uuid());
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('cm');
    Cookies.remove('session_id');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get('cm'));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
