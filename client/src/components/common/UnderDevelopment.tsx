import { useI18n } from '@/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface UnderDevelopmentProps {
  showSubtitle?: boolean;
  className?: string;
}

export function UnderDevelopment({ showSubtitle = true, className = '' }: UnderDevelopmentProps) {
  const { t } = useI18n();

  return (
    <Card className={`border-dashed ${className}`} data-testid="card-under-development">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="relative mb-6">
          <svg
            viewBox="0 0 200 160"
            className="w-48 h-40 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="30" y="100" width="140" height="40" rx="4" className="fill-muted" />
            <rect x="60" y="80" width="80" height="20" rx="2" className="fill-muted-foreground/20" />
            <rect x="80" y="60" width="40" height="20" rx="2" className="fill-muted-foreground/30" />
            
            <circle cx="100" cy="50" r="30" className="fill-primary/10 stroke-primary stroke-2" />
            <path
              d="M90 50 L100 60 L115 40"
              className="stroke-primary stroke-2 fill-none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4 2"
            />
            
            <rect x="25" y="95" width="12" height="50" rx="2" className="fill-primary/60" />
            <polygon points="31,80 25,95 37,95" className="fill-primary/60" />
            
            <rect x="163" y="95" width="12" height="50" rx="2" className="fill-primary/60" />
            <polygon points="169,80 163,95 175,95" className="fill-primary/60" />
            
            <g className="animate-pulse">
              <circle cx="50" cy="70" r="4" className="fill-primary/40" />
              <circle cx="150" cy="70" r="4" className="fill-primary/40" />
              <circle cx="100" cy="130" r="3" className="fill-primary/30" />
            </g>
            
            <rect x="45" y="110" width="20" height="8" rx="1" className="fill-primary/20" />
            <rect x="70" y="110" width="25" height="8" rx="1" className="fill-primary/30" />
            <rect x="100" y="110" width="15" height="8" rx="1" className="fill-primary/20" />
            <rect x="120" y="110" width="30" height="8" rx="1" className="fill-primary/25" />
          </svg>
          
          <div className="absolute -top-2 -right-2 bg-primary/10 rounded-full p-2">
            <Construction className="w-5 h-5 text-primary" />
          </div>
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
