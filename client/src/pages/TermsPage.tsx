import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';

export default function TermsPage() {
  const { t } = useI18n();

  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold mb-8">{t('terms.title')}</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-sm text-muted-foreground mb-8">
              {t('terms.lastUpdated')}: November 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section1Title')}</h2>
              <p>{t('terms.section1Text')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section2Title')}</h2>
              <p>{t('terms.section2Text')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section3Title')}</h2>
              <p>{t('terms.section3Text')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section4Title')}</h2>
              <p>{t('terms.section4Text')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section5Title')}</h2>
              <p>{t('terms.section5Text')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section6Title')}</h2>
              <p>{t('terms.section6Text')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section7Title')}</h2>
              <p>{t('terms.section7Text')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section8Title')}</h2>
              <p>{t('terms.section8Text')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section9Title')}</h2>
              <p>{t('terms.section9Text')}</p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
