import { useI18n } from '@/i18n';
import { UnderDevelopment } from '@/components/common/UnderDevelopment';

export function TestimonialsSection() {
  const { t } = useI18n();
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {t('home.testimonials.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('home.testimonials.subtitle')}
          </p>
        </div>

        <UnderDevelopment />
      </div>
    </section>
  );
}
