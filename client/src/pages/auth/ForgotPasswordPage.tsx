import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/i18n';
import { ArrowLeft, Mail } from 'lucide-react';
import { authService } from '@/services/authService';

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
      toast({
        title: t('auth.forgotPassword.checkEmail'),
        description: t('auth.forgotPassword.checkEmailDesc'),
      });
      setLocation(`/otp-verification?email=${encodeURIComponent(email)}&type=reset`);
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

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">{t('auth.forgotPassword.title')}</CardTitle>
            <CardDescription>
              {t('auth.forgotPassword.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.forgotPassword.emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.forgotPassword.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  data-testid="input-forgot-email"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-forgot-submit">
                {isLoading ? t('auth.forgotPassword.sending') : t('auth.forgotPassword.sendButton')}
              </Button>
            </form>

            <div className="mt-6">
              <Link
                href="/sign-in"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('auth.forgotPassword.backToSignIn')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
