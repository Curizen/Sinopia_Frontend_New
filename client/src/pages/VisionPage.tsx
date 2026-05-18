import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Users, Lightbulb } from 'lucide-react';

export default function VisionPage() {
  const { t } = useI18n();

  const founders = [
    { name: "Jens Uwe Jung" },
    { name: "Tobias Bahlinger" },
    { name: "Eyad Dawood" },
  ];

  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" data-testid="text-vision-title">
              {t('vision.title')}
            </h1>
          </div>

          <Card className="mb-12">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-primary mt-1" />
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-base leading-relaxed" data-testid="text-vision-content">
                    {t('vision.content')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-3 mb-10">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl font-bold" data-testid="text-founding-team-title">
                {t('vision.foundingTeam')}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {founders.map((founder, index) => (
                <div
                  key={index}
                  className="text-center px-4 py-3 rounded-lg bg-muted/50"
                  data-testid={`text-founder-${index}`}
                >
                  <p className="text-lg font-medium text-foreground" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                    {founder.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
