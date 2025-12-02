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

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole, cvFile?: File | null) => Promise<void>;
  logout: () => void;
  setMockUser: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// todo: remove mock functionality (still used for login / setMockUser)
const mockUsers: Record<UserRole, User> = {
  skill_giver: {
    id: '1',
    email: 'john@example.com',
    role: 'skill_giver',
    avatar: undefined,
  },
  skill_searcher: {
    id: '2',
    email: 'sarah@techcorp.com',
    role: 'skill_searcher',
    avatar: undefined,
  },
};

// you can configure this in your .env as VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

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

  const login = useCallback(async (email: string, _password: string) => {
    // todo: replace with real backend login
    const mockToken = 'mock_token_' + Date.now();
    const mockUser = email.includes('searcher') ? mockUsers.skill_searcher : mockUsers.skill_giver;

    setToken(mockToken);
    setUser(mockUser);
    localStorage.setItem('sinopia_token', mockToken);
    localStorage.setItem('sinopia_user', JSON.stringify(mockUser));
  }, []);

  const register = useCallback(
    async (email: string, password: string, role: UserRole, cvFile?: File | null) => {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);

      if (cvFile) {
        formData.append('cv', cvFile); 
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Registration failed');
        throw new Error(errorText);
      }

      const data = (await response.json()) as { token: string; user: User };

      const newToken = data.token;
      const newUser = data.user;

      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('sinopia_token', newToken);
      localStorage.setItem('sinopia_user', JSON.stringify(newUser));
    },
    [],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sinopia_token');
    localStorage.removeItem('sinopia_user');
  }, []);

  // todo: remove mock functionality
  const setMockUser = useCallback((role: UserRole) => {
    const mockToken = 'mock_token_' + Date.now();
    const mockUser = mockUsers[role];
    setToken(mockToken);
    setUser(mockUser);
    localStorage.setItem('sinopia_token', mockToken);
    localStorage.setItem('sinopia_user', JSON.stringify(mockUser));
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
        setMockUser,
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
