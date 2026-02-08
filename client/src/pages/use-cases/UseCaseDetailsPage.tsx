import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  Target, 
  Briefcase,
  GraduationCap,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Rocket,
  X
} from 'lucide-react';

interface Skill {
  skill_name: string;
  required_level: string;
}

interface JobTitle {
  job_title: string;
  level_job_title: string;
  total_hours: number;
  required_employees: number;
  description: string;
  hourly_rate: number;
  skills: Skill[];
}

interface Stage {
  stage_name: string;
  description: string;
  total_hours: number;
}

interface UseCaseDetails {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  status: string;
  skill_giver_status: string;
  total_cost: number;
  total_project_hours: number;
  job_titles: JobTitle[];
  stages: Stage[];
}

export default function UseCaseDetailsPage() {
  const [, params] = useRoute('/use-case/:id');
  const { t } = useI18n();
  const { toast } = useToast();
  const [useCase, setUseCase] = useState<UseCaseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const id = params?.id;

  useEffect(() => {
    const fetchUseCaseDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('sinopia_token');
        const response = await fetch(`/api/use-case/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('notFound');
          } else {
            setError('fetchError');
          }
          return;
        }

        const data = await response.json();
        console.log('[DEBUG] Fetched use case details:', data);
        setUseCase(data);
      } catch (err) {
        console.error('Error fetching use case details:', err);
        setError('fetchError');
        toast({
          title: t('common.error'),
          description: t('useCaseDetails.fetchError'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUseCaseDetails();
  }, [id, toast, t]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'active':
      case 'in_progress':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTranslatedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'projects.statusPending',
      active: 'projects.statusActive',
      in_progress: 'projects.statusInProgress',
      completed: 'projects.statusCompleted',
      cancelled: 'projects.statusCancelled',
    };
    return t(statusMap[status] || status);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatHours = (hours: number) => {
    return new Intl.NumberFormat('de-DE').format(hours);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !useCase) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Link href="/projects">
            <Button variant="ghost" className="gap-2" data-testid="button-back-projects">
              <ArrowLeft className="w-4 h-4" />
              {t('useCaseDetails.backToProjects')}
            </Button>
          </Link>
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">
                {error === 'notFound' ? t('useCaseDetails.notFound') : t('useCaseDetails.fetchError')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {error === 'notFound' 
                  ? t('useCaseDetails.notFoundDescription')
                  : t('useCaseDetails.fetchErrorDescription')}
              </p>
              <Link href="/projects">
                <Button>{t('useCaseDetails.backToProjects')}</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Link href="/projects">
          <Button variant="ghost" className="gap-2" data-testid="button-back-projects">
            <ArrowLeft className="w-4 h-4" />
            {t('useCaseDetails.backToProjects')}
          </Button>
        </Link>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-2xl">{useCase.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(useCase.status)}`}>
                    {getTranslatedStatus(useCase.status)}
                  </span>
                  <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(useCase.skill_giver_status)}`}>
                    {t('projects.expertStatus')}: {getTranslatedStatus(useCase.skill_giver_status)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{t('projects.totalCost')}</p>
                    <p className="font-semibold text-lg">{formatCurrency(useCase.total_cost)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-2">
                  <div>
                    <p className="text-xs text-muted-foreground">{t('projects.totalWithVat')}</p>
                    <p className="font-semibold text-lg" data-testid="text-total-with-vat">{formatCurrency(useCase.total_cost * 1.19)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              {t('useCaseDetails.overview')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('useCases.descriptionLabel')}</h4>
              <p className="text-foreground">{useCase.description}</p>
            </div>
            {useCase.objectives && useCase.objectives.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">{t('useCases.objective')}</h4>
                <div className="flex flex-wrap gap-2">
                  {useCase.objectives.map((objective, index) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {objective}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {useCase.job_titles && useCase.job_titles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                {t('useCaseDetails.requiredExperts')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {useCase.job_titles.map((job, index) => (
                  <Card key={index} className="border">
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h4 className="font-semibold">{job.job_title}</h4>
                          <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${getLevelColor(job.level_job_title)}`}>
                            {job.level_job_title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                          <Users className="w-4 h-4" />
                          <span className="font-semibold">{job.required_employees}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
                      {job.skills && job.skills.length > 0 && (
                        <div className="pt-2 border-t">
                          <h5 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5" />
                            {t('useCaseDetails.requiredSkills')}
                          </h5>
                          <div className="flex flex-wrap gap-1.5">
                            {job.skills.map((skill, skillIndex) => (
                              <Badge 
                                key={skillIndex} 
                                variant="outline" 
                                className="text-xs font-normal"
                              >
                                {skill.skill_name}
                                <span className="ml-1 text-muted-foreground">({skill.required_level})</span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {useCase.stages && useCase.stages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {t('useCaseDetails.implementationStages')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                <div className="space-y-6">
                  {useCase.stages.map((stage, index) => (
                    <div key={index} className="relative pl-10">
                      <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                      <Card className="border">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                            <h4 className="font-semibold">{stage.stage_name}</h4>
                            <Badge variant="secondary" className="font-normal">
                              {((stage.total_hours / (useCase.total_project_hours || 1)) * 100).toFixed(1)}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{stage.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="sticky bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-4 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-end gap-3">
          <Button
            variant="outline"
            className="border-destructive text-destructive"
            onClick={() => setShowComingSoon(true)}
            data-testid="button-reject-usecase"
          >
            <X className="w-4 h-4 mr-2" />
            {t('useCaseDetails.reject')}
          </Button>
          <Button
            onClick={() => setShowComingSoon(true)}
            data-testid="button-accept-usecase"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {t('useCaseDetails.acceptUseCase')}
          </Button>
        </div>
      </div>

      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center gap-3 pt-2">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Rocket className="w-7 h-7 text-primary" />
              </div>
              <DialogTitle className="text-xl">
                {t('useCaseDetails.comingSoonTitle')}
              </DialogTitle>
            </div>
          </DialogHeader>
          <p className="text-center text-muted-foreground py-2">
            {t('useCaseDetails.comingSoonBody')}{' '}
            <span className="font-semibold text-foreground">{t('useCaseDetails.comingSoonDate')}</span>.
          </p>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowComingSoon(false)}
              data-testid="button-close-coming-soon"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
