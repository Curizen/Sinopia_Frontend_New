import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { User } from '@/types';
import type { UserRole } from '@/lib/utils/constants';
import { authService } from '@/services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole, cvFile?: File | null) => Promise<void>;
  logout: () => Promise<void>;
  setUserFromToken: (token: string, user: User) => void;
  completeRegistration: (email: string, role: UserRole, token?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('sinopia_token');
    const storedUser = localStorage.getItem('sinopia_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.loginUser({ email, password });
    
    if (response.token) {
      const userData = response.data as { id?: string; email?: string; account_type?: string; role?: string } | undefined;
      const newUser: User = {
        id: userData?.id || Date.now().toString(),
        email: userData?.email || email,
        role: (userData?.account_type || userData?.role || 'skill_giver') as UserRole,
        avatar: undefined,
      };
      
      setToken(response.token);
      setUser(newUser);
      localStorage.setItem('sinopia_token', response.token);
      localStorage.setItem('sinopia_user', JSON.stringify(newUser));
    } else {
      throw new Error(response.message || 'No token received from server');
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, role: UserRole, _cvFile?: File | null) => {
      const response = await authService.registerUser({
        email,
        password,
        confirmPassword: password,
        account_type: role,
      });
      
      if (response.status === 'error') {
        throw new Error(response.message || 'Registration failed');
      }
      
      return;
    },
    [],
  );

  const completeRegistration = useCallback((email: string, role: UserRole, receivedToken?: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      avatar: undefined,
    };
    
    const tokenToUse = receivedToken || 'registered_token_' + Date.now();
    setToken(tokenToUse);
    setUser(newUser);
    localStorage.setItem('sinopia_token', tokenToUse);
    localStorage.setItem('sinopia_user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logoutUser();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem('sinopia_token');
      localStorage.removeItem('sinopia_user');
    }
  }, []);

  const setUserFromToken = useCallback((newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('sinopia_token', newToken);
    localStorage.setItem('sinopia_user', JSON.stringify(newUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        setUserFromToken,
        completeRegistration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
