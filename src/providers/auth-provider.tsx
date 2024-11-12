import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from 'react';
import Cookies from 'js-cookie';

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
    () => !!Cookies.get('authToken')
  );

  const login = (token: string) => {
    Cookies.set('authToken', token, { expires: 1 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('authToken');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get('authToken'));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
