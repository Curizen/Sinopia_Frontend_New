import { AuthProvider } from '@/context/AuthContext';
import SignUpPage from '@/pages/auth/SignUpPage';

export default function SignUpPageExample() {
  return (
    <AuthProvider>
      <SignUpPage />
    </AuthProvider>
  );
}
