import { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Building2, CheckCircle2 } from 'lucide-react';

interface CompanyProfileData {
  id?: number | null;
  user_id?: number | null;
  company_name?: string | null;
  company_size?: string | null;
  industry?: string | null;
  website?: string | null;
  phone?: string | null;
  email?: string | null;
  country?: string | null;
  city?: string | null;
  bio?: string | null;
}

export default function CompanyInfoPage() {
  const { user, updateUserCompanyInfo, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contactEmail: user?.email || '',
    contactPhone: '',
    companySize: '',
    city: '',
    country: '',
    bio: '',
    website: '',
  });

  const [websiteError, setWebsiteError] = useState<string | null>(null);

  const populateFormFromApiData = (data: CompanyProfileData) => {
    setFormData({
      companyName: data.company_name || '',
      industry: data.industry || '',
      contactEmail: data.email || user?.email || '',
      contactPhone: data.phone || '',
      companySize: data.company_size || '',
      city: data.city || '',
      country: data.country || '',
      bio: data.bio || '',
      website: data.website || '',
    });
  };

  useEffect(() => {
    const loadProfileData = async () => {
      const cachedData = localStorage.getItem('company_profile_cache');
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData) as CompanyProfileData;
          console.log('[DEBUG] Loading company profile from cache:', parsed);
          populateFormFromApiData(parsed);
        } catch (e) {
          console.error('Error parsing cached company profile:', e);
        }
      }

      try {
        const token = localStorage.getItem('sinopia_token');
        const response = await fetch('/api/profile/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('[DEBUG] Fetched company profile from API:', data);
          if (data && (data.company_name || data.email || data.industry)) {
            localStorage.setItem('company_profile_cache', JSON.stringify(data));
            populateFormFromApiData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching company profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (isAuthenticated) {
      loadProfileData();
    } else {
      setIsLoadingProfile(false);
    }
  }, [isAuthenticated, user?.email]);

  const companySizeOptions = [
    { value: '1-10', labelKey: 'onboarding.companySize1to10' },
    { value: '11-50', labelKey: 'onboarding.companySize11to50' },
    { value: '51-200', labelKey: 'onboarding.companySize51to200' },
    { value: '201-500', labelKey: 'onboarding.companySize201to500' },
    { value: '501-1000', labelKey: 'onboarding.companySize501to1000' },
    { value: '1000+', labelKey: 'onboarding.companySize1000plus' },
  ];

  if (authLoading || isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/sign-in" />;
  }

  if (user?.role !== 'skill_searcher') {
    return <Redirect to="/profile" />;
  }

  if (user?.companyOnboardingCompleted) {
    return <Redirect to="/profile" />;
  }

  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isWebsiteValid = (website: string) => {
    if (!website.trim()) return true; // Optional field
    return website.trim().startsWith('https://');
  };

  const validateWebsite = (value: string) => {
    if (value.trim() && !value.trim().startsWith('https://')) {
      setWebsiteError(t('onboarding.websiteMustStartWithHttps'));
      return false;
    }
    setWebsiteError(null);
    return true;
  };

  const handleWebsiteBlur = () => {
    validateWebsite(formData.website);
  };

  const isFormValid = 
    formData.companyName.trim() && 
    formData.industry.trim() && 
    formData.contactEmail.trim() && 
    isEmailValid(formData.contactEmail) &&
    formData.contactPhone.trim() && 
    formData.companySize && 
    formData.city.trim() && 
    formData.country.trim() &&
    isWebsiteValid(formData.website);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast({
        title: t('common.error'),
        description: t('onboarding.fillAllRequired'),
        variant: 'destructive',
      });
      return;
    }

    if (!isEmailValid(formData.contactEmail)) {
      toast({
        title: t('common.error'),
        description: t('onboarding.invalidEmail'),
        variant: 'destructive',
      });
      return;
    }

    // Validate website on submit
    if (!validateWebsite(formData.website)) {
      return;
    }

    setIsLoading(true);

    try {
      await updateUserCompanyInfo({
        companyName: formData.companyName.trim(),
        industry: formData.industry.trim(),
        contactEmail: formData.contactEmail.trim(),
        contactPhone: formData.contactPhone.trim(),
        companySize: formData.companySize,
        city: formData.city.trim(),
        country: formData.country.trim(),
        bio: formData.bio.trim() || undefined,
        website: formData.website.trim() || undefined,
      });

      toast({
        title: t('onboarding.companyInfoSaved'),
        description: t('onboarding.companyInfoSavedDesc'),
      });

      // Check for saved returnUrl from signup flow (validate it starts with '/')
      const savedReturnUrl = sessionStorage.getItem('post_onboarding_return_url');
      sessionStorage.removeItem('post_onboarding_return_url');
      if (savedReturnUrl && savedReturnUrl.startsWith('/')) {
        setLocation(savedReturnUrl);
      } else {
        setLocation('/dashboard');
      }
      window.scrollTo(0, 0);
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
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{t('onboarding.step1')}</span>
              </div>
              <div className="h-0.5 w-8 bg-primary" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">2</span>
                </div>
                <span className="text-sm font-medium">{t('onboarding.step2of2')}</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">{t('onboarding.companyInfoTitle')}</CardTitle>
            <CardDescription>{t('onboarding.companyInfoSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">{t('onboarding.companyName')} *</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder={t('onboarding.companyNamePlaceholder')}
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    required
                    data-testid="input-company-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">{t('onboarding.industry')} *</Label>
                  <Input
                    id="industry"
                    type="text"
                    placeholder={t('onboarding.industryPlaceholder')}
                    value={formData.industry}
                    onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    required
                    data-testid="input-industry"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">{t('onboarding.contactEmail')} *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder={t('onboarding.contactEmailPlaceholder')}
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    required
                    data-testid="input-contact-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">{t('onboarding.contactPhone')} *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder={t('onboarding.contactPhonePlaceholder')}
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    required
                    data-testid="input-contact-phone"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companySize">{t('onboarding.companySize')} *</Label>
                <Select
                  value={formData.companySize}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}
                >
                  <SelectTrigger id="companySize" data-testid="select-company-size">
                    <SelectValue placeholder={t('onboarding.companySizePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {t(option.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">{t('onboarding.city')} *</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder={t('onboarding.cityPlaceholder')}
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    required
                    data-testid="input-company-city"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">{t('onboarding.country')} *</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder={t('onboarding.countryPlaceholder')}
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    required
                    data-testid="input-company-country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">{t('onboarding.website')} ({t('common.optional')})</Label>
                <Input
                  id="website"
                  type="text"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, website: e.target.value }));
                    // Clear error when user starts typing correctly
                    if (e.target.value.trim().startsWith('https://') || !e.target.value.trim()) {
                      setWebsiteError(null);
                    }
                  }}
                  onBlur={handleWebsiteBlur}
                  className={websiteError ? 'border-destructive' : ''}
                  data-testid="input-company-website"
                />
                <p className="text-xs text-muted-foreground">{t('onboarding.websiteHelperText')}</p>
                {websiteError && (
                  <p className="text-xs text-destructive">{websiteError}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">{t('onboarding.bio')} ({t('common.optional')})</Label>
                <Textarea
                  id="bio"
                  placeholder={t('onboarding.bioPlaceholder')}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  data-testid="input-company-bio"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !isFormValid}
                data-testid="button-submit-company-info"
              >
                {isLoading ? t('common.loading') : t('onboarding.continueButton')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
