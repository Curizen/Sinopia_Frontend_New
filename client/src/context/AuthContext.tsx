import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User } from '@/types';
import type { UserRole } from '@/lib/utils/constants';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
  setMockUser: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// todo: remove mock functionality
const mockUsers: Record<UserRole, User> = {
  skill_giver: {
    id: '1',
    email: 'john@example.com',
    role: 'skill_giver',
    firstName: 'John',
    lastName: 'Smith',
    avatar: undefined,
  },
  skill_searcher: {
    id: '2',
    email: 'sarah@techcorp.com',
    role: 'skill_searcher',
    firstName: 'Sarah',
    lastName: 'Johnson',
    avatar: undefined,
  },
};

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
    // todo: remove mock functionality
    const mockToken = 'mock_token_' + Date.now();
    const mockUser = email.includes('searcher') ? mockUsers.skill_searcher : mockUsers.skill_giver;
    
    setToken(mockToken);
    setUser(mockUser);
    localStorage.setItem('sinopia_token', mockToken);
    localStorage.setItem('sinopia_user', JSON.stringify(mockUser));
  }, []);

  const register = useCallback(async (email: string, _password: string, role: UserRole, firstName: string, lastName: string) => {
    // todo: remove mock functionality
    const mockToken = 'mock_token_' + Date.now();
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      firstName,
      lastName,
    };
    
    setToken(mockToken);
    setUser(newUser);
    localStorage.setItem('sinopia_token', mockToken);
    localStorage.setItem('sinopia_user', JSON.stringify(newUser));
  }, []);

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
