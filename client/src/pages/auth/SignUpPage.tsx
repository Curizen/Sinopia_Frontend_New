import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { useI18n } from '@/i18n';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import sinopiaLogo from '@assets/sinopia_logo.png';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, UserPlus, Briefcase, User, FileText } from 'lucide-react';
import { authService } from '@/services/authService';
import type { UserRole } from '@/lib/utils/constants';
import { PasswordRequirements, isPasswordValid } from '@/components/auth/PasswordRequirements';
import { TermsModal } from '@/components/auth/TermsModal';

export default function SignUpPage() {
  const { toast } = useToast();
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const searchString = useSearch();

  // Parse returnUrl from query params for redirect after signup
  const returnUrl = useMemo(() => {
    const params = new URLSearchParams(searchString);
    const url = params.get('returnUrl');
    if (url) {
      try {
        return decodeURIComponent(url);
      } catch {
        return null;
      }
    }
    return null;
  }, [searchString]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'skill_giver' as UserRole,
  });

  useEffect(() => {
    const accepted = localStorage.getItem('sinopia_terms_accepted');
    if (accepted === 'true') {
      setHasScrolledToBottom(true);
      setTermsAccepted(true);
    }
  }, []);

  const handleTermsAcceptedChange = (checked: boolean) => {
    setTermsAccepted(checked);
    if (checked) {
      localStorage.setItem('sinopia_terms_accepted', 'true');
      localStorage.setItem('sinopia_terms_accepted_at', new Date().toISOString());
    } else {
      localStorage.removeItem('sinopia_terms_accepted');
      localStorage.removeItem('sinopia_terms_accepted_at');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast({
        title: t('common.error'),
        description: t('terms.acceptError'),
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t('common.error'),
        description: t('auth.passwordsDoNotMatch'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.registerUser({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        account_type: formData.role,
      });

      const isOtpSent = response.message?.toLowerCase().includes('otp') || 
                        response.message?.toLowerCase().includes('sending') ||
                        response.status === 'success';

      if (isOtpSent) {
        // Store signup data in sessionStorage for OTP resend (cleared when tab closes)
        sessionStorage.setItem('pending_signup', JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          account_type: formData.role,
        }));
        
        toast({
          title: t('auth.verificationRequired'),
          description: t('auth.verificationCodeSent'),
        });
        // Propagate returnUrl to OTP verification page
        const returnParam = returnUrl ? `&returnUrl=${encodeURIComponent(returnUrl)}` : '';
        setLocation('/verify-otp?email=' + encodeURIComponent(formData.email) + '&role=' + formData.role + returnParam);
      } else {
        toast({
          title: t('common.error'),
          description: response.message || t('common.error'),
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

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mx-auto mb-4">
              <Link href="/" className="flex items-center gap-2">
                <img 
                  src={sinopiaLogo} 
                  alt="Sinopia Logo" 
                  className="w-16 h-auto rounded-md object-cover"
                />
              </Link>
            </div>
            <CardTitle className="font-display text-2xl">
              {t('auth.signUpTitle')}
            </CardTitle>
            <CardDescription>
              {t('auth.signUpSubtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <Label>{t('auth.selectRole')}</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, role: value as UserRole }))
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="skill_giver"
                    className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.role === 'skill_giver'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <RadioGroupItem
                      value="skill_giver"
                      id="skill_giver"
                      className="sr-only"
                    />
                    <User
                      className={`w-6 h-6 ${
                        formData.role === 'skill_giver'
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        formData.role === 'skill_giver' ? 'text-primary' : ''
                      }`}
                    >
                      {t('auth.skillGiver')}
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      {t('auth.skillGiverDesc')}
                    </span>
                  </Label>

                  <Label
                    htmlFor="skill_searcher"
                    className={`flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.role === 'skill_searcher'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <RadioGroupItem
                      value="skill_searcher"
                      id="skill_searcher"
                      className="sr-only"
                    />
                    <Briefcase
                      className={`w-6 h-6 ${
                        formData.role === 'skill_searcher'
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        formData.role === 'skill_searcher' ? 'text-primary' : ''
                      }`}
                    >
                      {t('auth.skillSearcher')}
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      {t('auth.skillSearcherDesc')}
                    </span>
                  </Label>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  data-testid="input-signup-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.passwordPlaceholder')}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, password: e.target.value }))
                    }
                    required
                    data-testid="input-signup-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.password && <PasswordRequirements password={formData.password} />}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                    required
                    data-testid="input-signup-confirm-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 border rounded-lg p-4 bg-muted/30">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms-checkbox"
                    checked={termsAccepted}
                    onCheckedChange={handleTermsAcceptedChange}
                    disabled={!hasScrolledToBottom}
                    data-testid="checkbox-terms-accept"
                  />
                  <div className="flex-1 space-y-1">
                    <Label
                      htmlFor="terms-checkbox"
                      className={`text-sm leading-relaxed cursor-pointer ${!hasScrolledToBottom ? 'text-muted-foreground' : ''}`}
                    >
                      {t('terms.agreeLabel')}
                    </Label>
                    {!hasScrolledToBottom && (
                      <p className="text-xs text-muted-foreground">
                        {t('terms.scrollToAccept')}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setTermsModalOpen(true)}
                  className="w-full"
                  data-testid="button-view-terms"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t('terms.viewTerms')}
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !isPasswordValid(formData.password) || formData.password !== formData.confirmPassword || !termsAccepted}
                data-testid="button-signup-submit"
              >
                {isLoading ? t('common.loading') : t('auth.signUpButton')}
                <UserPlus className="ml-2 w-4 h-4" />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                <Link href="/terms" className="hover:underline hover:text-primary transition-colors" data-testid="link-terms-signup">
                  {t('footer.terms')}
                </Link>
                {' & '}
                <Link href="/privacy" className="hover:underline hover:text-primary transition-colors" data-testid="link-privacy-signup">
                  {t('privacy.title')}
                </Link>
              </p>
            </form>

            <TermsModal
              open={termsModalOpen}
              onOpenChange={setTermsModalOpen}
              onScrolledToBottom={() => setHasScrolledToBottom(true)}
              hasScrolledToBottom={hasScrolledToBottom}
            />

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">{t('auth.hasAccount')} </span>
              <Link href="/sign-in" className="text-primary hover:underline font-medium">
                {t('nav.signIn')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
