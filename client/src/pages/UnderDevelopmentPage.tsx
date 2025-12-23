import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';
import { useI18n } from '@/i18n';

export default function UnderDevelopmentPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Construction className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-3" data-testid="text-under-development-title">
          {t('underDevelopment.title')}
        </h1>
        
        <p className="text-muted-foreground mb-8" data-testid="text-under-development-subtitle">
          {t('underDevelopment.subtitle')}
        </p>
        
        <Link href="/">
          <Button size="lg" data-testid="button-back-to-home">
            {t('underDevelopment.backToHome')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
