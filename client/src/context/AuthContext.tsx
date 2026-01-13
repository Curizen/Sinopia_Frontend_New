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

interface CompanyInfoData {
  city: string;
  country: string;
  companySize: string;
  companyName: string;
  industry: string;
  contactEmail: string;
  contactPhone: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role: UserRole, cvFile?: File | null) => Promise<void>;
  logout: () => Promise<void>;
  setUserFromToken: (token: string, user: User) => void;
  completeRegistration: (email: string, role: UserRole, cvUploaded?: boolean, serverToken?: string) => void;
  updateCvStatus: (uploaded: boolean, fileName?: string, fileSize?: number) => void;
  updateUserCompanyInfo: (data: CompanyInfoData) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
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
    
    const isSuccess = response.message?.toLowerCase().includes('successful') || 
                      response.message?.toLowerCase().includes('session already active') ||
                      response.status === 'success';
    
    if (isSuccess) {
      const userData = response.data as { id?: string; email?: string; account_type?: string; role?: string } | undefined;
      const newUser: User = {
        id: userData?.id || Date.now().toString(),
        email: userData?.email || email,
        role: (userData?.account_type || userData?.role || 'skill_giver') as UserRole,
        avatar: undefined,
      };
      
      const sessionToken = response.token || 'session_' + Date.now();
      setToken(sessionToken);
      setUser(newUser);
      localStorage.setItem('sinopia_token', sessionToken);
      localStorage.setItem('sinopia_user', JSON.stringify(newUser));
    } else {
      throw new Error(response.message || 'Login failed');
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

  const completeRegistration = useCallback((email: string, role: UserRole, cvUploaded: boolean = false, serverToken?: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      role,
      avatar: undefined,
      cvUploaded,
    };
    
    const tokenToUse = serverToken || 'registered_token_' + Date.now();
    setToken(tokenToUse);
    setUser(newUser);
    localStorage.setItem('sinopia_token', tokenToUse);
    localStorage.setItem('sinopia_user', JSON.stringify(newUser));
  }, []);

  const updateCvStatus = useCallback((uploaded: boolean, fileName?: string, fileSize?: number) => {
    if (!user) return;
    const updatedUser: User = {
      ...user,
      cvUploaded: uploaded,
      cvFileName: fileName,
      cvFileSize: fileSize,
    };
    setUser(updatedUser);
    localStorage.setItem('sinopia_user', JSON.stringify(updatedUser));
  }, [user]);

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

  const updateUserCompanyInfo = useCallback(async (data: CompanyInfoData) => {
    if (!user) throw new Error('No user logged in');
    
    const updatedUser: User = {
      ...user,
      city: data.city,
      country: data.country,
      companySize: data.companySize,
      companyName: data.companyName,
      industry: data.industry,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      bio: data.bio,
      companyOnboardingCompleted: true,
    };
    
    setUser(updatedUser);
    localStorage.setItem('sinopia_user', JSON.stringify(updatedUser));
  }, [user]);

  const updateUserProfile = useCallback(async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    const updatedUser: User = {
      ...user,
      ...data,
    };
    
    setUser(updatedUser);
    localStorage.setItem('sinopia_user', JSON.stringify(updatedUser));
  }, [user]);

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
        updateCvStatus,
        updateUserCompanyInfo,
        updateUserProfile,
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
