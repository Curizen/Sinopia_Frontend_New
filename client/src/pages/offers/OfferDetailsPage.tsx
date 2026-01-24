import { useRoute, Link } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Briefcase,
  GraduationCap,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar
} from 'lucide-react';

interface SkillRequired {
  skill_name: string;
  required_level: string;
}

interface JobTitle {
  job_title: string;
  level_job_title: string;
  description: string;
  total_hours: number;
  required_employees: number;
  skills_required: SkillRequired[];
}

interface Project {
  title: string;
  description?: string;
}

interface OfferDetails {
  offer_id: number;
  offer_status: string;
  project: Project;
  job_title: JobTitle;
  created_at: string;
}

interface OfferResponse {
  success: boolean;
  data: OfferDetails;
}

export default function OfferDetailsPage() {
  const [, params] = useRoute('/offers/:id');
  const { t } = useI18n();
  const { toast } = useToast();
  const id = params?.id;

  const { data: offerData, isLoading, error, refetch } = useQuery<OfferResponse>({
    queryKey: ['/api/offers', id],
    enabled: !!id,
  });

  const offer = offerData?.success ? offerData.data : null;

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

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'junior':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
      case 'mid':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'senior':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'expert':
      case 'lead':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const handleAcceptOffer = () => {
    toast({
      title: t('offers.acceptOffer'),
      description: t('offers.acceptOfferPlaceholder'),
    });
  };

  const handleRejectOffer = () => {
    toast({
      title: t('offers.rejectOffer'),
      description: t('offers.rejectOfferPlaceholder'),
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]" data-testid="loading-offer-details">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !offer) {
    const isNotFound = !offer && !error;
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center" data-testid="error-offer-details">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2" data-testid="text-error-title">
            {isNotFound ? t('offers.notFound') : t('offers.errorTitle')}
          </h2>
          <p className="text-muted-foreground mb-4" data-testid="text-error-message">
            {isNotFound ? t('offers.notFoundDesc') : t('offers.fetchError')}
          </p>
          {isNotFound ? (
            <Link href="/offers">
              <Button data-testid="button-back-to-offers">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('offers.backToOffers')}
              </Button>
            </Link>
          ) : (
            <Button onClick={() => refetch()} data-testid="button-retry-offer">
              {t('common.retry')}
            </Button>
          )}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/offers">
            <Button variant="ghost" size="icon" data-testid="button-back-offers">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-display font-bold" data-testid="text-project-title">
              {offer.project?.title || t('offers.untitledProject')}
            </h1>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <Badge className={getStatusColor(offer.offer_status)} data-testid="badge-offer-status">
                {offer.offer_status}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1" data-testid="text-date-sent">
                <Calendar className="w-4 h-4" />
                {t('offers.sent')}: {formatDate(offer.created_at)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card data-testid="card-job-details">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                {t('offers.jobDetails')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">{t('offers.role')}</p>
                <p className="font-semibold text-lg" data-testid="text-job-role">
                  {offer.job_title?.job_title || '-'}
                  {offer.job_title?.level_job_title && (
                    <Badge className={`ml-2 ${getLevelColor(offer.job_title.level_job_title)}`} data-testid="badge-job-level">
                      {offer.job_title.level_job_title}
                    </Badge>
                  )}
                </p>
              </div>
              
              {offer.job_title?.description && (
                <div>
                  <p className="text-sm text-muted-foreground">{t('offers.description')}</p>
                  <p className="text-sm mt-1" data-testid="text-job-description">{offer.job_title.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t('offers.workload')}</p>
                    <p className="font-medium" data-testid="text-total-hours">{offer.job_title?.total_hours || 0} {t('offers.hours')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t('offers.employeesRequired')}</p>
                    <p className="font-medium" data-testid="text-employees-required">{offer.job_title?.required_employees || 1}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-required-skills">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                {t('offers.requiredSkills')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {offer.job_title?.skills_required && offer.job_title.skills_required.length > 0 ? (
                <div className="flex flex-wrap gap-2" data-testid="list-required-skills">
                  {offer.job_title.skills_required.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="text-sm"
                      data-testid={`badge-skill-${index}`}
                    >
                      {skill.skill_name}
                      <span className="ml-1 opacity-70">({skill.required_level})</span>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm" data-testid="text-no-skills">{t('offers.noSkillsRequired')}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card data-testid="card-actions">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleAcceptOffer}
                data-testid="button-accept-offer"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {t('offers.acceptOffer')}
              </Button>
              <Button 
                size="lg" 
                variant="destructive"
                onClick={handleRejectOffer}
                data-testid="button-reject-offer"
              >
                <XCircle className="w-5 h-5 mr-2" />
                {t('offers.rejectOffer')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
