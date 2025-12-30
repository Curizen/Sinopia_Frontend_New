import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Heart, Users, Globe, Lightbulb, FileSearch, ClipboardCheck, Shield, UserCheck, Cog, Sparkles, Handshake, Award } from 'lucide-react';
import heroImage from '@assets/generated_images/team_collaboration_coworking_hero.png';

const skills = [
  { icon: UserCheck, nameKey: 'about.skill1Name', descKey: 'about.skill1Desc' },
  { icon: FileSearch, nameKey: 'about.skill2Name', descKey: 'about.skill2Desc' },
  { icon: Lightbulb, nameKey: 'about.skill3Name', descKey: 'about.skill3Desc' },
  { icon: ClipboardCheck, nameKey: 'about.skill4Name', descKey: 'about.skill4Desc' },
  { icon: Shield, nameKey: 'about.skill5Name', descKey: 'about.skill5Desc' },
  { icon: Cog, nameKey: 'about.skill6Name', descKey: 'about.skill6Desc' },
];

export default function AboutPage() {
  const { t } = useI18n();

  const values = [
    { icon: Target, titleKey: 'about.value1Title', descKey: 'about.value1Desc' },
    { icon: Lightbulb, titleKey: 'about.value2Title', descKey: 'about.value2Desc' },
    { icon: Sparkles, titleKey: 'about.value3Title', descKey: 'about.value3Desc' },
    { icon: Cog, titleKey: 'about.value4Title', descKey: 'about.value4Desc' },
    { icon: Handshake, titleKey: 'about.value5Title', descKey: 'about.value5Desc' },
    { icon: Shield, titleKey: 'about.value6Title', descKey: 'about.value6Desc' },
    { icon: Award, titleKey: 'about.value7Title', descKey: 'about.value7Desc' },
  ];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-12">{t('about.valuesTitle')}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {values.map((value, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                <value.icon className="w-5 h-5 text-primary" />
                <span className="font-medium">{t(value.titleKey)}</span>
              </div>
            ))}
          </div>
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
