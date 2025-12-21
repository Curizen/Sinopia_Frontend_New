import { Link } from 'wouter';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from '@/i18n';
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold">{t('errors.pageNotFound')}</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {t('errors.pageNotFoundDesc')}
          </p>

          <div className="mt-6">
            <Link href="/">
              <Button className="w-full" data-testid="button-go-home">
                <Home className="w-4 h-4 mr-2" />
                {t('errors.goHome')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
