interface RegisterPayload {
  email: string;
  password: string;
  confirmPassword: string;
  account_type: string;
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
  password: string;
  confirmPassword: string;
}

interface ApiResponse {
  status: 'success' | 'error';
  message?: string;
  token?: string;
  data?: unknown;
}

async function apiRequest(endpoint: string, options: RequestInit = {}): Promise<ApiResponse> {
  const token = localStorage.getItem('sinopia_token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  return response.json();
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

  async loginUser(payload: LoginPayload): Promise<ApiResponse> {
    const response = await apiRequest('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    console.log('[DEBUG] Login API raw response:', JSON.stringify(response, null, 2));
    return response;
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
    const response = await fetch('/api/users/logout', {
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
