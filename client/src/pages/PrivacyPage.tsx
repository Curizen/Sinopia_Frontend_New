import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';

export default function PrivacyPage() {
  const { t } = useI18n();

  const processingItems = t('privacy.processingItems').split('|');

  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold mb-4" data-testid="text-privacy-title">
            {t('privacy.title')}
          </h1>
          <p className="text-sm text-muted-foreground mb-12" data-testid="text-privacy-updated">
            {t('privacy.lastUpdated')}
          </p>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                1. {t('privacy.introduction')}
              </h2>
              <p>{t('privacy.introductionText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                2. {t('privacy.dataCollection')}
              </h2>
              <p>{t('privacy.dataCollectionText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                3. {t('privacy.ipAddresses')}
              </h2>
              <p>{t('privacy.ipAddressesText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                4. {t('privacy.security')}
              </h2>
              <p>{t('privacy.securityText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                5. {t('privacy.advertising')}
              </h2>
              <p>{t('privacy.advertisingText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                6. {t('privacy.contactForm')}
              </h2>
              <p>{t('privacy.contactFormText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                7. {t('privacy.processingScope')}
              </h2>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                {processingItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                8. {t('privacy.legalBasis')}
              </h2>
              <p>{t('privacy.legalBasisText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                9. {t('privacy.purpose')}
              </h2>
              <p>{t('privacy.purposeText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                10. {t('privacy.storageDuration')}
              </h2>
              <p>{t('privacy.storageDurationText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                11. {t('privacy.contactDetails')}
              </h2>
              <p>{t('privacy.contactDetailsText')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                12. {t('privacy.yourRights')}
              </h2>
              <p>{t('privacy.yourRightsText')}</p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
