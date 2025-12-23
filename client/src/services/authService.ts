const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://sinopi.eu';

interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
  account_type: 'skill_searcher' | 'skill_giver';
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ResetPasswordPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ApiResponse<T = unknown> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  token?: string;
}

async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('sinopia_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || `API Error: ${response.status}`);
  }
  
  return data;
}

export const authService = {
  async registerUser(payload: RegisterPayload): Promise<ApiResponse> {
    return apiRequest('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async verifyRegisterOtp(payload: VerifyOtpPayload): Promise<ApiResponse> {
    return apiRequest('/api/users/verify-register-otp', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async loginUser(payload: LoginPayload): Promise<ApiResponse<{ token: string }>> {
    return apiRequest('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async forgotPassword(email: string): Promise<ApiResponse> {
    return apiRequest('/api/users/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  async verifyForgotPasswordOtp(payload: VerifyOtpPayload): Promise<ApiResponse> {
    return apiRequest('/api/users/verify-forgot-password-otp', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<ApiResponse> {
    return apiRequest('/api/users/reset-password', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async logoutUser(): Promise<ApiResponse> {
    const token = localStorage.getItem('sinopia_token');
    const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.json();
  },
};

export type { RegisterPayload, VerifyOtpPayload, LoginPayload, ResetPasswordPayload, ApiResponse };
