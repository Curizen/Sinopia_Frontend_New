import { useI18n } from '@/i18n';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import underDevelopmentEn from '@assets/generated_images/english_under_development_banner.png';
import underDevelopmentDe from '@assets/generated_images/german_under_development_banner.png';

interface UnderDevelopmentProps {
  showBackButton?: boolean;
  className?: string;
}

export function UnderDevelopment({ showBackButton = false, className = '' }: UnderDevelopmentProps) {
  const { t, language } = useI18n();

  const bannerImage = language === 'de' ? underDevelopmentDe : underDevelopmentEn;

  return (
    <div className={`flex flex-col items-center ${className}`} data-testid="container-under-development">
      <div className="w-full max-w-7xl mx-auto">
        <img
          src={bannerImage}
          alt={t('underDevelopment.title')}
          className="w-full h-auto rounded-xl shadow-sm object-cover min-h-[200px]"
          data-testid="img-under-development-banner"
        />
      </div>

      {showBackButton && (
        <div className="mt-8">
          <Link href="/">
            <Button size="lg" data-testid="button-back-to-home">
              <Home className="w-4 h-4 mr-2" />
              {t('underDevelopment.backToHome')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
