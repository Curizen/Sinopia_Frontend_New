import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n';

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="py-20 bg-gradient-to-br from-primary/90 via-primary to-primary/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoLTZ2LTZoNnYtNmg2djZoNnY2aC02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-up">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-lg px-8 bg-white text-primary hover:bg-white/90"
              data-testid="button-cta-signup"
            >
              {t('cta.createAccount')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 border-white/30 text-white hover:bg-white/10"
              data-testid="button-cta-contact"
            >
              {t('cta.contactSales')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
