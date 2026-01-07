import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n';
import heroImage from '@assets/sinopia_herosection_1767790544247.jpeg';

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[90vh] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('home.heroTitle')}
            <span className="text-primary"> {t('home.heroTitleHighlight')}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl">
            {t('home.heroSubtitle')}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2" data-testid="button-hero-cta">
                {t('nav.getStarted')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                data-testid="button-hero-learn"
              >
                {t('home.learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
