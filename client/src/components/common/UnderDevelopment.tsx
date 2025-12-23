import { useI18n } from '@/i18n';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import bannerBackground from '@assets/generated_images/neutral_banner_background_image.png';

interface UnderDevelopmentProps {
  showBackButton?: boolean;
  className?: string;
}

export function UnderDevelopment({ showBackButton = false, className = '' }: UnderDevelopmentProps) {
  const { t } = useI18n();

  return (
    <div className={`flex flex-col items-center ${className}`} data-testid="container-under-development">
      <div className="w-full max-w-7xl mx-auto relative">
        <div className="relative w-full rounded-xl shadow-sm overflow-hidden">
          <img
            src={bannerBackground}
            alt=""
            className="w-full h-auto object-cover min-h-[200px]"
            data-testid="img-under-development-banner"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
            <h2 
              className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg"
              data-testid="text-under-development-title"
            >
              {t('underDevelopment.title')}
            </h2>
            <p 
              className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl font-light drop-shadow-md"
              data-testid="text-under-development-subtitle"
            >
              {t('underDevelopment.subtitle')}
            </p>
          </div>
        </div>
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
