import { useState, useEffect } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Shield } from 'lucide-react';
import { authService } from '@/services/authService';
import { USER_ROLES } from '@/lib/utils/constants';
import type { UserRole } from '@/lib/utils/constants';

export default function VerifyOtpPage() {
  const { completeRegistration } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const email = params.get('email') || '';
  const role = (params.get('role') || 'skill_giver') as UserRole;
  
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (!email) {
      setLocation('/sign-up');
    }
  }, [email, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || !email) return;

    setIsLoading(true);

    try {
      const response = await authService.verifyRegisterOtp({ email, otp });
      
      const isSuccess = response.status === 'success' || 
                        response.message?.toLowerCase().includes('successful') ||
                        response.message?.toLowerCase().includes('verified');
      
      if (isSuccess) {
        if (role === USER_ROLES.SKILL_GIVER) {
          toast({
            title: t('auth.otp.emailVerified'),
            description: t('auth.otp.nowUploadCv'),
          });
          setLocation('/sign-up/cv?email=' + encodeURIComponent(email));
          window.scrollTo(0, 0);
        } else {
          completeRegistration(email, role, false, response.token);
          toast({
            title: t('auth.otp.accountCreated'),
            description: t('auth.otp.accountCreatedDesc'),
          });
          setLocation('/onboarding/company');
          window.scrollTo(0, 0);
        }
      } else {
        toast({
          title: t('auth.otp.invalidCode'),
          description: response.message || t('auth.otp.invalidCodeDesc'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('auth.otp.somethingWentWrong');
      toast({
        title: t('auth.otp.invalidCode'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authService.registerUser({
        email,
        password: '',
        confirmPassword: '',
        account_type: role,
      });
      toast({
        title: t('auth.otp.codeResent'),
        description: t('auth.otp.codeResentDesc'),
      });
    } catch {
      toast({
        title: t('auth.otp.codeResent'),
        description: t('auth.otp.codeResentDesc'),
      });
    }
  };

  if (!email) {
    return (
      <PublicLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">{t('auth.otp.title')}</CardTitle>
            <CardDescription>
              {t('auth.otp.description')} <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  data-testid="input-verify-otp"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || otp.length !== 6}
                data-testid="button-verify-otp-submit"
              >
                {isLoading ? t('auth.otp.verifying') : (role === USER_ROLES.SKILL_GIVER ? t('auth.otp.verifyEmail') : t('auth.otp.verifyAndCreate'))}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t('auth.otp.didntReceive')} </span>
              <button
                type="button"
                onClick={handleResend}
                className="text-primary hover:underline font-medium"
                data-testid="button-resend-verify-otp"
              >
                {t('auth.otp.resend')}
              </button>
            </div>

            <div className="mt-4">
              <Link
                href="/sign-up"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('auth.otp.backToSignUp')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
