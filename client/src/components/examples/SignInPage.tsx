import { AuthProvider } from '@/context/AuthContext';
import SignInPage from '@/pages/auth/SignInPage';

export default function SignInPageExample() {
  return (
    <AuthProvider>
      <SignInPage />
    </AuthProvider>
  );
}
