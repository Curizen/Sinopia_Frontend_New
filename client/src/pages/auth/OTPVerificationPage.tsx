import { useState } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Shield } from 'lucide-react';

export default function OTPVerificationPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
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

    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Code verified!',
      description: type === 'reset' ? 'You can now reset your password.' : 'Your email has been verified.',
    });
    
    if (type === 'reset') {
      setLocation(`/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      setLocation('/dashboard');
    }
    setIsLoading(false);
  };

  const handleResend = async () => {
    // todo: remove mock functionality
    toast({
      title: 'Code resent',
      description: 'A new verification code has been sent to your email.',
    });
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">Enter Verification Code</CardTitle>
            <CardDescription>
              We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
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
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Didn't receive the code? </span>
              <button
                type="button"
                onClick={handleResend}
                className="text-primary hover:underline font-medium"
                data-testid="button-resend-otp"
              >
                Resend
              </button>
            </div>

            <div className="mt-4">
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
