import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-12 text-center" data-testid="text-vision-title">
            {t('vision.title')}
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-base leading-relaxed" data-testid="text-vision-content">
                  {t('vision.content')}
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <img
                src="/vision-image.jpg"
                alt={t('vision.teamPhotoAlt')}
                className="rounded-xl shadow-lg max-w-full h-auto object-cover"
                style={{ maxHeight: '400px' }}
                data-testid="img-vision-team"
              />
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="font-display text-2xl font-bold text-center mb-10" data-testid="text-founding-team-title">
              {t('vision.foundingTeam')}
            </h2>
            <div className="flex flex-wrap justify-center gap-12">
              {founders.map((founder, index) => (
                <div
                  key={index}
                  className="text-center"
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
