import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Briefcase, Star } from 'lucide-react';
import { useI18n } from '@/i18n';
import heroImage from '@assets/generated_images/team_collaboration_coworking_hero.png';

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
          <Badge className="mb-6 bg-primary/20 text-white border-primary/30 backdrop-blur-sm">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {t('home.trustedBy')}
          </Badge>
          
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('home.heroTitle')}
            <span className="text-primary"> {t('home.heroTitleHighlight')}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl">
            {t('home.heroSubtitle')}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
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

          <div className="flex flex-wrap gap-6 sm:gap-10">
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-2xl">50K+</p>
                <p className="text-sm text-gray-300">{t('home.activeUsers')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-2xl">10K+</p>
                <p className="text-sm text-gray-300">{t('home.projectsCompleted')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-2xl">4.9</p>
                <p className="text-sm text-gray-300">{t('home.averageRating')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
