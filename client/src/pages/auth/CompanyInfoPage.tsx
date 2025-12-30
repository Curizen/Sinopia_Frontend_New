import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Building2, CheckCircle2 } from 'lucide-react';

export default function CompanyInfoPage() {
  const { user, updateUserCompanyInfo } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    city: '',
    country: '',
    companySize: '',
  });

  const companySizeOptions = [
    { value: '1-10', labelKey: 'onboarding.companySize1to10' },
    { value: '11-50', labelKey: 'onboarding.companySize11to50' },
    { value: '51-200', labelKey: 'onboarding.companySize51to200' },
    { value: '201-500', labelKey: 'onboarding.companySize201to500' },
    { value: '501-1000', labelKey: 'onboarding.companySize501to1000' },
    { value: '1000+', labelKey: 'onboarding.companySize1000plus' },
  ];

  const isFormValid = formData.city.trim() && formData.country.trim() && formData.companySize;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);

    try {
      await updateUserCompanyInfo({
        city: formData.city.trim(),
        country: formData.country.trim(),
        companySize: formData.companySize,
      });

      toast({
        title: t('onboarding.companyInfoSaved'),
        description: t('onboarding.companyInfoSavedDesc'),
      });

      setLocation('/dashboard');
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
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{t('onboarding.step1')}</span>
              </div>
              <div className="h-0.5 w-8 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">2</span>
                </div>
                <span className="text-sm font-medium">{t('onboarding.step2')}</span>
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
