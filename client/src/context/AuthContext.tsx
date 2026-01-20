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
  login: (email: string, password: string) => Promise<{ role: UserRole }>;
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

  const login = useCallback(async (email: string, password: string): Promise<{ role: UserRole }> => {
    console.log('[DEBUG] AuthContext login called with email:', email);
    const response = await authService.loginUser({ email, password });
    console.log('[DEBUG] AuthContext received response:', response);
    console.log('[DEBUG] Response.data:', response.data);
    
    const isSuccess = response.message?.toLowerCase().includes('successful') || 
                      response.message?.toLowerCase().includes('session already active') ||
                      response.status === 'success';
    
    console.log('[DEBUG] Login isSuccess:', isSuccess);
    
    if (isSuccess) {
      // API returns userData object with user profile data
      const apiResponse = response as { 
        message?: string; 
        role?: string; 
        userData?: {
          id?: string | null;
          user_id?: string | null;
          full_name?: string | null;
          email?: string | null;
          summary?: string | null;
          phone?: string | null;
          linkedin?: string | null;
          country?: string | null;
          city?: string | null;
          certificates?: unknown[];
          education?: unknown[];
          experience?: unknown[];
          projects?: unknown[];
          skills?: unknown[];
        };
        data?: unknown;
      };
      
      console.log('[DEBUG] Full API response object:', apiResponse);
      console.log('[DEBUG] apiResponse.userData:', apiResponse.userData);
      console.log('[DEBUG] apiResponse.role:', apiResponse.role);
      
      const userData = apiResponse.userData;
      const userRole = (apiResponse.role || 'skill_giver') as UserRole;
      
      const newUser: User = {
        id: userData?.id || userData?.user_id || Date.now().toString(),
        email: userData?.email || email,
        role: userRole,
        firstName: userData?.full_name?.split(' ')[0] || undefined,
        lastName: userData?.full_name?.split(' ').slice(1).join(' ') || undefined,
        avatar: undefined,
      };
      
      const sessionToken = response.token || 'session_' + Date.now();
      setToken(sessionToken);
      setUser(newUser);
      localStorage.setItem('sinopia_token', sessionToken);
      localStorage.setItem('sinopia_user', JSON.stringify(newUser));
      
      // Save full userData to cache for profile page
      if (userData) {
        console.log('Saving userData to user_profile_cache:', userData);
        localStorage.setItem('user_profile_cache', JSON.stringify(userData));
      }
      
      // Return the role for routing purposes
      return { role: userRole };
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
      // Clear React state
      setToken(null);
      setUser(null);
      
      // Clear all localStorage items
      localStorage.removeItem('sinopia_token');
      localStorage.removeItem('sinopia_user');
      localStorage.removeItem('user_profile_cache');
      localStorage.removeItem('company_profile_cache');
      localStorage.removeItem('sinopia_skill_giver_profile');
      localStorage.removeItem('sinopia_skill_searcher_profile');
      
      // Clear all cookies
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      });
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      console.log('[DEBUG] Logout - All storage cleared');
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
    
    const storedToken = localStorage.getItem('sinopia_token');
    
    const apiPayload = {
      company_name: data.companyName,
      industry: data.industry,
      phone: data.contactPhone,
      email: data.contactEmail,
      company_size: data.companySize,
      city: data.city,
      country: data.country,
      bio: data.bio || '',
      website: '',
    };
    
    console.log('[DEBUG] updateUserCompanyInfo - Sending payload:', apiPayload);
    
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(storedToken && { 'Authorization': `Bearer ${storedToken}` }),
      },
      credentials: 'include',
      body: JSON.stringify(apiPayload),
    });
    
    const responseData = await response.json();
    console.log('[DEBUG] updateUserCompanyInfo - Response:', responseData);
    
    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to update company info');
    }
    
    localStorage.setItem('company_profile_cache', JSON.stringify(responseData));
    
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
