import { Link } from 'wouter';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';

export default function ImprintPage() {
  const { t } = useI18n();

  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold mb-4" data-testid="text-imprint-title">
            {t('imprint.title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-12" data-testid="text-imprint-subtitle">
            {t('imprint.subtitle')}
          </p>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('imprint.companyName')}
              </h2>
              <p className="whitespace-pre-line">
                {t('imprint.companyAddress')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('imprint.representedByTitle')}
              </h2>
              <p>{t('imprint.representedByNames')}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('imprint.contactTitle')}
              </h2>
              <p>
                <Link
                  href="/contact"
                  className="text-primary hover:underline"
                  data-testid="link-imprint-contact-email"
                >
                  {t('imprint.contactDetails')}
                </Link>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('imprint.vatIdTitle')}
              </h2>
              <p>{t('imprint.vatIdNumber')}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('imprint.privacyTitle')}
              </h2>
              <p>
                {t('imprint.privacyText')}{' '}
                <Link 
                  href="/privacy" 
                  className="text-primary hover:underline"
                  data-testid="link-imprint-privacy"
                >
                  {t('privacy.title')}
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
