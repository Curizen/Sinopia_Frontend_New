import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Check your email',
      description: 'We sent a verification code to reset your password.',
    });
    setLocation(`/otp-verification?email=${encodeURIComponent(email)}&type=reset`);
    setIsLoading(false);
  };

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">Forgot Password?</CardTitle>
            <CardDescription>
              No worries! Enter your email and we'll send you a reset code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-forgot-email"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-forgot-submit">
                {isLoading ? 'Sending...' : 'Send Reset Code'}
              </Button>
            </form>

            <div className="mt-6">
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
