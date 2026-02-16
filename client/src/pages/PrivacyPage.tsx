import { Link } from 'wouter';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';

export default function PrivacyPage() {
  const { t } = useI18n();

  const processingItems = (t('privacy.processingItems') as string).split('|');
  const processingAutoItems = (t('privacy.processingItemsAutoList') as string).split('|');

  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold mb-12" data-testid="text-privacy-title">
            {t('privacy.title')}
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <p>{t('privacy.introductionText')}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('privacy.ipAddresses')}
              </h2>
              <p>{t('privacy.ipAddressesText')}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('privacy.security')}
              </h2>
              <p>{t('privacy.securityText')}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('privacy.advertising')}
              </h2>
              <p>{t('privacy.advertisingText')}</p>
            </section>

            <section>
              <p>{t('privacy.contactFormReference')}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('privacy.contactFormTitle')}
              </h2>
              <p>{t('privacy.contactFormText')}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('privacy.processingScope')}
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                {processingItems.map((item, i) => (
                  <li key={i}>{item.trim()}</li>
                ))}
              </ul>
              <p className="mt-4">{t('privacy.processingItemsAuto')}</p>
              <ul className="list-disc pl-6 space-y-1">
                {processingAutoItems.map((item, i) => (
                  <li key={i}>{item.trim()}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('privacy.legalBasis')}
              </h2>
              <p>{t('privacy.legalBasisText')}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('privacy.purpose')}
              </h2>
              <p>{t('privacy.purposeText')}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('privacy.contactDetails')}
              </h2>
              <p>
                {t('privacy.contactDetailsText')}{' '}
                <Link
                  href="/imprint"
                  className="text-primary hover:underline"
                  data-testid="link-privacy-imprint"
                >
                  {t('privacy.contactDetailsLink')}
                </Link>
                ).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {t('privacy.yourRights')}
              </h2>
              <p>{t('privacy.yourRightsText')}</p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
