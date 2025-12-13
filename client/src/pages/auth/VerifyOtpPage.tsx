import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { usePendingRegistration } from '@/context/PendingRegistrationContext';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Shield } from 'lucide-react';

export default function VerifyOtpPage() {
  const { register } = useAuth();
  const { pendingData, clearPendingData, resendOtp } = usePendingRegistration();
  const { toast } = useToast();
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
        title: 'Session Expired',
        description: 'Please sign up again.',
        variant: 'destructive',
      });
      setLocation('/sign-up');
    }
  }, [pendingData, setLocation, toast, clearPendingData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || !pendingData) return;

    if (otp !== pendingData.otp) {
      toast({
        title: 'Invalid Code',
        description: 'The verification code you entered is incorrect.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      await register(pendingData.email, pendingData.password, pendingData.role, pendingData.cvFile);
      
      clearPendingData();
      
      toast({
        title: 'Success!',
        description: 'Your account has been created successfully.',
      });
      
      setLocation('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Registration Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    const newOtp = resendOtp();
    if (newOtp) {
      console.log('New mock OTP:', newOtp);
      toast({
        title: 'Code Resent',
        description: 'A new verification code has been sent to your email.',
      });
    }
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
            <CardTitle className="font-display text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              We sent a 6-digit code to <span className="font-medium text-foreground">{pendingData.email}</span>
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
                {isLoading ? 'Verifying...' : 'Verify & Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Didn't receive the code? </span>
              <button
                type="button"
                onClick={handleResend}
                className="text-primary hover:underline font-medium"
                data-testid="button-resend-verify-otp"
              >
                Resend
              </button>
            </div>

            <div className="mt-4">
              <Link
                href="/sign-up"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
