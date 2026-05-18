import { useState } from 'react';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { UserCheck, FileSearch, Lightbulb, ClipboardCheck, Shield, Cog } from 'lucide-react';
import heroImage from '@assets/generated_images/team_collaboration_coworking_hero.png';

const skills = [
  { icon: UserCheck, nameKey: 'about.skill1Name', descKey: 'about.skill1Desc' },
  { icon: FileSearch, nameKey: 'about.skill2Name', descKey: 'about.skill2Desc' },
  { icon: Lightbulb, nameKey: 'about.skill3Name', descKey: 'about.skill3Desc' },
  { icon: ClipboardCheck, nameKey: 'about.skill4Name', descKey: 'about.skill4Desc' },
  { icon: Shield, nameKey: 'about.skill5Name', descKey: 'about.skill5Desc' },
  { icon: Cog, nameKey: 'about.skill6Name', descKey: 'about.skill6Desc' },
];

const sinopiaKeys = ['s', 'i1', 'n', 'o', 'p', 'i2', 'a'] as const;
type SinopiaKey = typeof sinopiaKeys[number];

export default function AboutPage() {
  const { t } = useI18n();
  const [activeLetter, setActiveLetter] = useState<SinopiaKey>('s');

  return (
    <PublicLayout>
      <div
        className="relative h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t('about.title')}</h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto px-4">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-display text-3xl font-bold mb-6">{t('about.storyTitle')}</h2>
            <div className="text-muted-foreground space-y-4">
              <p>{t('about.storyText1')}</p>
              <p>{t('about.storyText2')}</p>
              <p>{t('about.storyText3')}</p>
              <p>{t('about.storyText4')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-10">{t('about.valuesTitle')}</h2>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {sinopiaKeys.map((key) => {
              const isActive = activeLetter === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveLetter(key)}
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center 
                    text-xl sm:text-2xl font-bold transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    ${isActive 
                      ? 'bg-primary text-primary-foreground scale-110 shadow-lg' 
                      : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary'
                    }
                  `}
                  data-testid={`button-sinopia-${key}`}
                  aria-pressed={isActive}
                >
                  {t(`about.sinopia.${key}.letter`)}
                </button>
              );
            })}
          </div>

          <Card className="max-w-2xl mx-auto" data-testid="card-sinopia-content">
            <CardContent className="pt-6 pb-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {t(`about.sinopia.${activeLetter}.letter`)}
                  </span>
                </div>
                <h3 className="font-semibold text-xl mb-3" data-testid="text-sinopia-title">
                  {t(`about.sinopia.${activeLetter}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-sinopia-description">
                  {t(`about.sinopia.${activeLetter}.description`)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-12">{t('about.skillsTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="hover-elevate">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <skill.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t(skill.nameKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(skill.descKey)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
