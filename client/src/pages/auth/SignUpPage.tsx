import { useState, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/i18n';
import { Eye, EyeOff, UserPlus, Briefcase, User, FileText } from 'lucide-react';
import type { UserRole } from '@/lib/utils/constants';

export default function SignUpPage() {
  const { register } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [, setLocation] = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'skill_giver' as UserRole,
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isSkillGiver = formData.role === 'skill_giver';

  const handleFileSelect = (file: File | undefined | null) => {
    if (!file) return;
    setCvFile(file);
    toast({
      title: t('common.success'),
      description: `${file.name}`,
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!isSkillGiver) {
        setIsLoading(true);
        try {
          await register(formData.email, formData.password, formData.role);
          toast({
            title: t('common.success'),
            description: t('auth.signUpSubtitle'),
          });
          setLocation('/dashboard');
        } catch (error) {
          console.error(error);
          toast({
            title: t('common.error'),
            description: t('common.error'),
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
        return;
      }

      setStep(2);
      return;
    }

    if (step === 2) {
      if (!cvFile) {
        toast({
          title: t('common.error'),
          description: 'CV required',
          variant: 'destructive',
        });
        return;
      }

      setIsLoading(true);
      try {
        await register(formData.email, formData.password, formData.role, cvFile);

        toast({
          title: t('common.success'),
          description: `${cvFile.name}`,
        });

        setLocation('/dashboard');
      } catch (error) {
        console.error(error);
        toast({
          title: t('common.error'),
          description: t('common.error'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
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
                  src="https://curizen.com/products/sinopia2025/images/logo_sinopia.png" 
                  alt="Sinopia Logo" 
                  className="w-16 h-auto rounded-md object-cover"
                />
              </Link>
            </div>
            <CardTitle className="font-display text-2xl">
              {step === 1 ? t('auth.signUpTitle') : 'Upload Your CV'}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? t('auth.signUpSubtitle')
                : 'Please provide your CV so we can better match you with opportunities.'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
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
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label>Upload your CV</Label>
                    <p className="text-xs text-muted-foreground">
                      Please provide your CV (PDF, DOC, or DOCX) so we can better match you with
                      suitable opportunities.
                    </p>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                      }}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`mt-2 flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-4 py-8 text-center cursor-pointer transition-colors ${
                        isDragging
                          ? 'border-primary bg-primary/5'
                          : 'border-muted-foreground/40 hover:border-primary/60'
                      }`}
                    >
                      <FileText className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">
                        Drag &amp; drop your CV here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Accepted formats: PDF, DOC, DOCX
                      </p>
                      {cvFile && (
                        <p className="mt-3 text-xs text-primary">
                          Selected file: <span className="font-medium">{cvFile.name}</span>
                        </p>
                      )}
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e.target.files?.[0])}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => setStep(1)}
                  >
                    {t('common.back')}
                  </Button>
                </>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="button-signup-submit"
              >
                {isLoading
                  ? t('common.loading')
                  : step === 1
                    ? isSkillGiver
                      ? t('common.next')
                      : t('auth.signUpButton')
                    : t('auth.signUpButton')}
                <UserPlus className="ml-2 w-4 h-4" />
              </Button>

              {step === 1 && (
                <p className="text-xs text-center text-muted-foreground">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    {t('footer.terms')}
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    {t('footer.privacy')}
                  </Link>
                </p>
              )}
            </form>

            {step === 1 && (
              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">{t('auth.hasAccount')} </span>
                <Link href="/sign-in" className="text-primary hover:underline font-medium">
                  {t('nav.signIn')}
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
