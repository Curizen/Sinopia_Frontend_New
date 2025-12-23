import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { usePendingRegistration } from '@/context/PendingRegistrationContext';
import { useI18n } from '@/i18n';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Shield } from 'lucide-react';
import { USER_ROLES } from '@/lib/utils/constants';

export default function VerifyOtpPage() {
  const { register } = useAuth();
  const { pendingData, clearPendingData, resendOtp, setOtpVerifiedAndStage } = usePendingRegistration();
  const { toast } = useToast();
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (!pendingData) {
      setLocation('/sign-up');
      return;
    }
    
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    if (pendingData.timestamp < fiveMinutesAgo) {
      clearPendingData();
      toast({
        title: t('auth.otp.sessionExpired'),
        description: t('auth.otp.pleaseSignUpAgain'),
        variant: 'destructive',
      });
      setLocation('/sign-up');
    }
  }, [pendingData, setLocation, toast, clearPendingData, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || !pendingData) return;

    // DEV ONLY: Mock OTP = 123456 (no backend/email)
    if (otp !== '123456') {
      toast({
        title: t('auth.otp.invalidCode'),
        description: t('auth.otp.invalidCodeDesc'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (pendingData.role === USER_ROLES.SKILL_GIVER) {
        setOtpVerifiedAndStage('cv_upload_required');
        toast({
          title: t('auth.otp.emailVerified'),
          description: t('auth.otp.nowUploadCv'),
        });
        setTimeout(() => setLocation('/sign-up/cv'), 50);
      } else {
        await register(pendingData.email, pendingData.password, pendingData.role);
        clearPendingData();
        toast({
          title: t('auth.otp.accountCreated'),
          description: t('auth.otp.accountCreatedDesc'),
        });
        setLocation('/under-development');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: t('auth.otp.registrationFailed'),
        description: t('auth.otp.somethingWentWrong'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // DEV ONLY: Mock OTP = 123456 (no backend/email)
  const handleResend = () => {
    resendOtp();
    console.log('DEV ONLY: Mock OTP is always 123456');
    toast({
      title: t('auth.otp.codeResent'),
      description: t('auth.otp.codeResentDesc'),
    });
  };

  if (!pendingData) {
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
              {t('auth.otp.description')} <span className="font-medium text-foreground">{pendingData.email}</span>
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
                {isLoading ? t('auth.otp.verifying') : (pendingData?.role === USER_ROLES.SKILL_GIVER ? t('auth.otp.verifyEmail') : t('auth.otp.verifyAndCreate'))}
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
