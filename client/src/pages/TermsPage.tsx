import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';

export default function TermsPage() {
  const { t } = useI18n();

  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h1 className="font-display text-4xl font-bold mb-2">
            {t('terms.title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">{t('terms.companyName')}</p>
          <p className="text-sm text-muted-foreground mb-8">{t('terms.lastUpdated')}</p>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section1Title')}</h2>
              <p className="mb-4">{t('terms.section1Text1')}</p>
              <p className="mb-4">{t('terms.section1Text2')}</p>
              <p>{t('terms.section1Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section2Title')}</h2>
              <p className="mb-4">{t('terms.section2Text1')}</p>
              <p className="mb-4">{t('terms.section2Text2')}</p>
              <p>{t('terms.section2Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section3Title')}</h2>
              <p className="mb-4">{t('terms.section3Text1')}</p>
              <p className="mb-4">{t('terms.section3Text2')}</p>
              <p>{t('terms.section3Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section4Title')}</h2>
              <p className="mb-4">{t('terms.section4Text1')}</p>
              <p className="mb-4">{t('terms.section4Text2')}</p>
              <p>{t('terms.section4Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section5Title')}</h2>
              <p className="mb-4">{t('terms.section5Text1')}</p>
              <p className="mb-4">{t('terms.section5Text2')}</p>
              <p className="mb-4">{t('terms.section5Text3')}</p>
              <p>{t('terms.section5Text4')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section6Title')}</h2>
              <p className="mb-4">{t('terms.section6Text1')}</p>
              <p className="mb-4">{t('terms.section6Text2')}</p>
              <p>{t('terms.section6Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section7Title')}</h2>
              <p className="mb-4">{t('terms.section7Text1')}</p>
              <p className="mb-4">{t('terms.section7Text2')}</p>
              <p>{t('terms.section7Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section8Title')}</h2>
              <p className="mb-4">{t('terms.section8Text1')}</p>
              <p className="mb-4">{t('terms.section8Text2')}</p>
              <p>{t('terms.section8Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section9Title')}</h2>
              <p className="mb-4">{t('terms.section9Text1')}</p>
              <p className="mb-4">{t('terms.section9Text2')}</p>
              <p>{t('terms.section9Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section10Title')}</h2>
              <p className="mb-4">{t('terms.section10Text1')}</p>
              <p className="mb-4">{t('terms.section10Text2')}</p>
              <p>{t('terms.section10Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section11Title')}</h2>
              <p className="mb-4">{t('terms.section11Text1')}</p>
              <p className="mb-4">{t('terms.section11Text2')}</p>
              <p>{t('terms.section11Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section12Title')}</h2>
              <p className="mb-4">{t('terms.section12Text1')}</p>
              <p className="mb-4">{t('terms.section12Text2')}</p>
              <p>{t('terms.section12Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section13Title')}</h2>
              <p className="mb-4">{t('terms.section13Text1')}</p>
              <p className="mb-4">{t('terms.section13Text2')}</p>
              <p>{t('terms.section13Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section14Title')}</h2>
              <p className="mb-4">{t('terms.section14Text1')}</p>
              <p className="mb-4">{t('terms.section14Text2')}</p>
              <p>{t('terms.section14Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section15Title')}</h2>
              <p className="mb-4">{t('terms.section15Text1')}</p>
              <p className="mb-4">{t('terms.section15Text2')}</p>
              <p>{t('terms.section15Text3')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">{t('terms.section16Title')}</h2>
              <p className="mb-4">{t('terms.section16Text1')}</p>
              <p className="mb-4">{t('terms.section16Text2')}</p>
              <p className="mb-4">{t('terms.section16Text3')}</p>
              <p>{t('terms.section16Text4')}</p>
            </section>

          </div>
          
        </div>
      </div>
    </PublicLayout>
  );
}
