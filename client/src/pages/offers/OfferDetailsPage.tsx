import { useEffect, useState, useMemo } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useI18n } from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { TermsContent } from '@/components/TermsContent';
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
  Calendar,
  Download,
  FileText
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

function getUserNameFromStorage(): string {
  try {
    const userCache = localStorage.getItem('user_profile_cache');
    if (userCache) {
      const parsed = JSON.parse(userCache);
      if (parsed.first_name && parsed.last_name) {
        return `${parsed.first_name} ${parsed.last_name}`;
      }
      if (parsed.name) {
        return parsed.name;
      }
    }
    const sinopiaUser = localStorage.getItem('sinopia_user');
    if (sinopiaUser) {
      const parsed = JSON.parse(sinopiaUser);
      if (parsed.first_name && parsed.last_name) {
        return `${parsed.first_name} ${parsed.last_name}`;
      }
      if (parsed.name) {
        return parsed.name;
      }
      if (parsed.email) {
        return parsed.email;
      }
    }
  } catch (e) {
    console.error('Failed to get user name from storage:', e);
  }
  return 'User';
}

export default function OfferDetailsPage() {
  const [, params] = useRoute('/offers/:id');
  const { t } = useI18n();
  const { toast } = useToast();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const id = params?.id;

  const [showTermsModal, setShowTermsModal] = useState(false);
  
  const userName = useMemo(() => getUserNameFromStorage(), []);
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const isSkillSearcher = user?.role === 'skill_searcher';

  useEffect(() => {
    if (isSkillSearcher) {
      setLocation('/dashboard');
    }
  }, [isSkillSearcher, setLocation]);

  if (isSkillSearcher) {
    return null;
  }

  const { data: offerData, isLoading, error, refetch } = useQuery<OfferResponse>({
    queryKey: ['/api/offers', id],
    enabled: !!id && !isSkillSearcher,
  });

  const offer = offerData?.success ? offerData.data : null;

  const updateOfferStatus = (newStatus: string) => {
    queryClient.setQueryData<OfferResponse>(['/api/offers', id], (oldData) => {
      if (!oldData?.data) return oldData;
      return {
        ...oldData,
        data: {
          ...oldData.data,
          offer_status: newStatus,
        },
      };
    });
  };

  const acceptMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', `/api/offers/${id}/accept`);
    },
    onSuccess: () => {
      setShowTermsModal(false);
      updateOfferStatus('accepted');
      toast({
        title: t('offers.offerAccepted'),
        description: t('offers.offerAcceptedDesc'),
      });
      queryClient.invalidateQueries({ queryKey: ['/api/offers/my-offers'] });
    },
    onError: (error: Error) => {
      toast({
        title: t('common.error'),
        description: error.message || t('offers.fetchError'),
        variant: 'destructive',
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', `/api/offers/${id}/reject`);
    },
    onSuccess: () => {
      updateOfferStatus('rejected');
      toast({
        title: t('offers.offerRejected'),
        description: t('offers.offerRejectedDesc'),
      });
      queryClient.invalidateQueries({ queryKey: ['/api/offers/my-offers'] });
    },
    onError: (error: Error) => {
      toast({
        title: t('common.error'),
        description: error.message || t('offers.fetchError'),
        variant: 'destructive',
      });
    },
  });

  const isProcessing = acceptMutation.isPending || rejectMutation.isPending;
  const currentStatus = offer?.offer_status || '';
  const canTakeAction = ['sent', 'pending'].includes(currentStatus.toLowerCase());

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
      case 'sent':
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

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return t('offers.accepted');
      case 'rejected':
      case 'declined':
        return t('offers.rejected');
      case 'pending':
      case 'sent':
        return t('offers.pending');
      default:
        return status;
    }
  };

  const handleAcceptClick = () => {
    setShowTermsModal(true);
  };

  const handleConfirmAccept = () => {
    acceptMutation.mutate();
  };

  const handleDownloadPdf = () => {
    console.log('Download PDF clicked - Terms & Conditions');
  };

  const handleRejectOffer = () => {
    rejectMutation.mutate();
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
              <Badge className={getStatusColor(currentStatus)} data-testid="badge-offer-status">
                {getStatusLabel(currentStatus)}
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
            {canTakeAction ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleAcceptClick}
                  disabled={isProcessing}
                  data-testid="button-accept-offer"
                >
                  {acceptMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  {t('offers.acceptOffer')}
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleRejectOffer}
                  disabled={isProcessing}
                  data-testid="button-reject-offer"
                >
                  {rejectMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  {t('offers.rejectOffer')}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  {currentStatus.toLowerCase() === 'accepted' ? (
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  )}
                  <Badge 
                    className={`text-base px-4 py-1 ${getStatusColor(currentStatus)}`}
                    data-testid="badge-final-status"
                  >
                    {getStatusLabel(currentStatus)}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground" data-testid="text-decision-made">
                  {currentStatus.toLowerCase() === 'accepted' 
                    ? t('offers.offerAcceptedDesc')
                    : t('offers.offerRejectedDesc')
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t('offers.termsAgreementTitle')}
            </DialogTitle>
            <DialogDescription>
              {t('offers.termsAgreementSubtitle')}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 min-h-0 overflow-y-auto max-h-96 bg-muted/30 rounded-md p-4" data-testid="terms-modal-content">
            <TermsContent 
              content={t('terms.content')} 
              className="text-sm leading-relaxed text-muted-foreground"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="bg-muted/50 rounded-md p-4" data-testid="signature-section">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t('offers.digitalSignature')}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{t('offers.digitallySignedBy')}</span>
                  <span 
                    className="text-lg font-semibold italic" 
                    style={{ fontFamily: 'Georgia, serif' }}
                    data-testid="text-signature-name"
                  >
                    {userName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{t('offers.signatureDate')}</span>
                  <span className="text-sm font-medium" data-testid="text-signature-date">
                    {currentDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 pt-4">
            <Button
              variant="outline"
              onClick={handleDownloadPdf}
              className="w-full sm:w-auto"
              data-testid="button-download-pdf"
            >
              <Download className="w-4 h-4 mr-2" />
              {t('offers.downloadPdf')}
            </Button>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="ghost"
                onClick={() => setShowTermsModal(false)}
                className="flex-1 sm:flex-none"
                data-testid="button-cancel-terms"
              >
                {t('common.cancel')}
              </Button>
              <Button
                onClick={handleConfirmAccept}
                disabled={acceptMutation.isPending}
                className="flex-1 sm:flex-none"
                data-testid="button-confirm-accept"
              >
                {acceptMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                {t('offers.agreeAndAccept')}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
