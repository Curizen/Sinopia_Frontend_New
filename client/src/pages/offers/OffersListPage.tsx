import { Link } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { 
  Loader2, 
  AlertCircle, 
  FileText,
  Briefcase,
  ArrowRight
} from 'lucide-react';

interface SkillRequired {
  skill_name: string;
  required_level: string;
}

interface JobTitle {
  job_title: string;
  level_job_title: string;
  description?: string;
  total_hours?: number;
  required_employees?: number;
  skills_required?: SkillRequired[];
}

interface Project {
  title: string;
  description?: string;
}

interface Offer {
  offer_id: number;
  offer_status: string;
  project: Project;
  job_title: JobTitle;
  created_at: string;
}

interface OffersResponse {
  success: boolean;
  count: number;
  data: Offer[];
}

export default function OffersListPage() {
  const { t } = useI18n();

  const { data: offersData, isLoading, error, refetch } = useQuery<OffersResponse>({
    queryKey: ['/api/offers/my-offers'],
  });

  const offers = offersData?.success && Array.isArray(offersData.data) ? offersData.data : [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'rejected':
      case 'declined':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]" data-testid="loading-offers">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center" data-testid="error-offers">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2" data-testid="text-error-title">{t('offers.errorTitle')}</h2>
          <p className="text-muted-foreground mb-4" data-testid="text-error-message">{t('offers.fetchError')}</p>
          <Button onClick={() => refetch()} data-testid="button-retry-offers">
            {t('common.retry')}
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold" data-testid="text-page-title">{t('offers.pageTitle')}</h1>
          <p className="text-muted-foreground" data-testid="text-page-subtitle">{t('offers.subtitleGiver')}</p>
        </div>

        {offers.length === 0 ? (
          <Card data-testid="card-empty-offers">
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2" data-testid="text-no-offers">{t('offers.noOffersFound')}</h3>
              <p className="text-muted-foreground" data-testid="text-no-offers-desc">{t('offers.noOffersToDisplay')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="grid-offers">
            {offers.map((offer) => (
              <Link key={offer.offer_id} href={`/offers/${offer.offer_id}`} data-testid={`link-offer-${offer.offer_id}`}>
                <Card 
                  className="hover-elevate cursor-pointer h-full flex flex-col"
                  data-testid={`card-offer-${offer.offer_id}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-2" data-testid={`text-project-title-${offer.offer_id}`}>
                        {offer.project?.title || t('offers.untitledProject')}
                      </CardTitle>
                      <Badge className={getStatusColor(offer.offer_status)} data-testid={`badge-status-${offer.offer_id}`}>
                        {offer.offer_status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium" data-testid={`text-job-title-${offer.offer_id}`}>
                          {offer.job_title?.job_title || t('offers.noJobTitle')}
                        </span>
                      </div>
                      {offer.job_title?.level_job_title && (
                        <Badge variant="outline" className="text-xs" data-testid={`badge-level-${offer.offer_id}`}>
                          {offer.job_title.level_job_title}
                        </Badge>
                      )}
                      <p className="text-xs text-muted-foreground" data-testid={`text-date-${offer.offer_id}`}>
                        {t('offers.sent')}: {formatDate(offer.created_at)}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full"
                      data-testid={`button-view-offer-${offer.offer_id}`}
                    >
                      {t('offers.viewDetails')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
