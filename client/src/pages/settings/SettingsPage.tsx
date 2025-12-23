import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UnderDevelopment } from '@/components/common/UnderDevelopment';
import { Globe, Palette, User } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { t, language, setLanguage } = useI18n();

  const isSkillGiver = user?.role === 'skill_giver';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">{t('settings.title')}</h1>
          <p className="text-muted-foreground">
            {t('settings.languageDesc')}
          </p>
        </div>

        <div className="grid gap-6">
          <Card data-testid="card-settings-language">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('settings.language')}</CardTitle>
                  <CardDescription>{t('settings.languageDesc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('settings.currentLanguage')}</p>
                  <p className="font-medium" data-testid="text-current-language">{language === 'en' ? 'English' : 'Deutsch'}</p>
                </div>
                <Button variant="outline" onClick={toggleLanguage} data-testid="button-toggle-language">
                  {language === 'en' ? 'Deutsch' : 'English'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-settings-appearance">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('settings.appearance')}</CardTitle>
                  <CardDescription>{t('settings.appearanceDesc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <UnderDevelopment showSubtitle={false} />
            </CardContent>
          </Card>

          <Card data-testid="card-settings-account">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('settings.account')}</CardTitle>
                  <CardDescription>{t('settings.accountDesc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('settings.email')}</p>
                    <p className="font-medium" data-testid="text-account-email">{user?.email || t('emptyState.notSet')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('settings.role')}</p>
                    <p className="font-medium" data-testid="text-account-role">
                      {isSkillGiver ? t('auth.skillGiver') : t('auth.skillSearcher')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
