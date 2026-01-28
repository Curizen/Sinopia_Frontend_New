import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';

export default function TermsPage() {
  const { t } = useI18n();

  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="font-display text-4xl font-bold mb-8">
            {t('terms.title')}
          </h1>
          
          <div 
            className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line leading-relaxed"
            data-testid="terms-content"
          >
            {t('terms.content')}
          </div>
          
        </div>
      </div>
    </PublicLayout>
  );
}
