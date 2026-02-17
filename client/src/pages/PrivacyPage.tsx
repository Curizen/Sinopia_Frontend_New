import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';

export default function PrivacyPage() {
  const { t } = useI18n();

  const content = t('privacy.content') as string;
  const paragraphs = content.split('\n\n');

  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold mb-12" data-testid="text-privacy-title">
            {t('privacy.title')}
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            {paragraphs.map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              const isNumberedHeading = /^\d+\.\s/.test(trimmed);
              const isLetterHeading = /^[a-z]\)\s/.test(trimmed);

              if (isNumberedHeading) {
                return (
                  <h2 key={index} className="text-xl font-bold text-foreground mt-8 mb-3">
                    {trimmed}
                  </h2>
                );
              }

              if (isLetterHeading) {
                return (
                  <h3 key={index} className="text-lg font-semibold text-foreground mt-6 mb-2">
                    {trimmed}
                  </h3>
                );
              }

              if (trimmed === 'Privacy Policy') {
                return null;
              }

              return (
                <p key={index} className="leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
