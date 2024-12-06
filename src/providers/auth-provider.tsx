import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo
} from 'react';
import Cookies from 'js-cookie';
import { v4 as uuid } from 'uuid';

type roleType = 'admin' | 'user';

interface AuthContextType {
  role?: roleType;
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

  const role = useMemo(() => {
    const cm = Cookies.get('cm');

    switch (String(cm)) {
      case 'YWRtaW4tY29tYmlwaGFyOmNvbWJpcGhhcioyMDI0':
        return 'admin';
      case 'dXNlci1jb21iaXBoYXI6Y29tYmlwaGFyKjIwMjQ=':
        return 'user';
      default:
        return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('cm')]);

  const login = (token: string) => {
    localStorage.setItem('loginState', 'login auth provider');
    localStorage.setItem('loginData', JSON.stringify({ token, ses: uuid() }));
    Cookies.set('cm', token, { expires: 7, sameSite: 'None', secure: true });
    Cookies.set('session_id', uuid(), { sameSite: 'None', secure: true });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('cm');
    Cookies.remove('session_id');
    localStorage.removeItem('combiphar-chats');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get('cm'));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
