import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/i18n';
import { 
  UserCheck, 
  Search, 
  FileCheck, 
  CreditCard, 
  Shield, 
  Zap,
  Target,
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  Award
} from 'lucide-react';

export function FeaturesSection() {
  const { t } = useI18n();

  const skillGiverFeatures = [
    { icon: Target, titleKey: 'features.sg1Title', descKey: 'features.sg1Desc' },
    { icon: TrendingUp, titleKey: 'features.sg2Title', descKey: 'features.sg2Desc' },
    { icon: CreditCard, titleKey: 'features.sg3Title', descKey: 'features.sg3Desc' },
  ];

  const skillSearcherFeatures = [
    { icon: Users, titleKey: 'features.ss1Title', descKey: 'features.ss1Desc' },
    { icon: Briefcase, titleKey: 'features.ss2Title', descKey: 'features.ss2Desc' },
    { icon: Shield, titleKey: 'features.ss3Title', descKey: 'features.ss3Desc' },
  ];

  const howItWorks = [
    { step: 1, icon: UserCheck, titleKey: 'features.step1Title', descKey: 'features.step1Desc' },
    { step: 2, icon: Search, titleKey: 'features.step2Title', descKey: 'features.step2Desc' },
    { step: 3, icon: FileCheck, titleKey: 'features.step3Title', descKey: 'features.step3Desc' },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold">{t('features.forSkillGivers')}</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              {t('features.skillGiversDesc')}
            </p>
            <div className="space-y-4">
              {skillGiverFeatures.map((feature) => (
                <div key={feature.titleKey} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t(feature.titleKey)}</h4>
                    <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold">{t('features.forSkillSearchers')}</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              {t('features.skillSearchersDesc')}
            </p>
            <div className="space-y-4">
              {skillSearcherFeatures.map((feature) => (
                <div key={feature.titleKey} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t(feature.titleKey)}</h4>
                    <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{t('features.howItWorks')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('features.howItWorksDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((item, index) => (
            <div key={item.step} className="relative">
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
              )}
              <Card className="relative hover-elevate">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                    <item.icon className="w-7 h-7 text-primary" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>{t('features.fastMatching')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>{t('features.securePayments')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>{t('features.support247')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
