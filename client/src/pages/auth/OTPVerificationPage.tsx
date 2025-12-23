import { useState } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/i18n';
import { ArrowLeft, Shield } from 'lucide-react';
import { authService } from '@/services/authService';

export default function OTPVerificationPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const email = params.get('email') || '';
  const type = params.get('type') || 'reset';
  
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsLoading(true);

    try {
      const response = await authService.verifyForgotPasswordOtp({ email, otp });
      
      if (response.status === 'success') {
        toast({
          title: t('auth.otpVerification.codeVerified'),
          description: type === 'reset' ? t('auth.otpVerification.codeVerifiedResetDesc') : t('auth.otpVerification.codeVerifiedEmailDesc'),
        });
        
        if (type === 'reset') {
          setLocation(`/reset-password?email=${encodeURIComponent(email)}`);
        } else {
          setLocation('/dashboard');
        }
      } else {
        toast({
          title: t('common.error'),
          description: response.message || t('auth.otp.invalidCodeDesc'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('common.error');
      toast({
        title: t('common.error'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authService.forgotPassword(email);
      toast({
        title: t('auth.otpVerification.codeResent'),
        description: t('auth.otpVerification.codeResentDesc'),
      });
    } catch {
      toast({
        title: t('auth.otpVerification.codeResent'),
        description: t('auth.otpVerification.codeResentDesc'),
      });
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">{t('auth.otpVerification.title')}</CardTitle>
            <CardDescription>
              {t('auth.otpVerification.description')} <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  data-testid="input-otp"
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
                data-testid="button-otp-submit"
              >
                {isLoading ? t('auth.otpVerification.verifying') : t('auth.otpVerification.verifyButton')}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t('auth.otpVerification.didntReceive')} </span>
              <button
                type="button"
                onClick={handleResend}
                className="text-primary hover:underline font-medium"
                data-testid="button-resend-otp"
              >
                {t('auth.otpVerification.resend')}
              </button>
            </div>

            <div className="mt-4">
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('auth.otpVerification.backToSignIn')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
