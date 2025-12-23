import { useI18n } from '@/i18n';
import { Card, CardContent } from '@/components/ui/card';
import underDevelopmentImage from '@assets/generated_images/under_development_banner_illustration.png';

interface UnderDevelopmentProps {
  showSubtitle?: boolean;
  className?: string;
}

export function UnderDevelopment({ showSubtitle = true, className = '' }: UnderDevelopmentProps) {
  const { t } = useI18n();

  return (
    <Card className={`border-dashed ${className}`} data-testid="card-under-development">
      <CardContent className="flex flex-col items-center justify-center py-8 px-6 text-center">
        <div className="relative mb-4 w-full max-w-md">
          <img
            src={underDevelopmentImage}
            alt={t('underDevelopment.title')}
            className="w-full h-auto rounded-lg"
            data-testid="img-under-development"
          />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-under-development-title">
          {t('underDevelopment.title')}
        </h3>
        
        {showSubtitle && (
          <p className="text-muted-foreground text-sm max-w-md" data-testid="text-under-development-subtitle">
            {t('underDevelopment.featuresNotAvailable')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
