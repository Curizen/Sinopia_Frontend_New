import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
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
  X,
  FileText,
  Building2,
  Phone,
  Mail,
  Globe,
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

interface SkillSearcher {
  company_size?: string;
  industry?: string;
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
  skill_searcher?: SkillSearcher;
}

function ContractSection({
  useCase,
  t,
  formatCurrency,
}: {
  useCase: UseCaseDetails;
  t: (key: string) => string;
  formatCurrency: (amount: number) => string;
}) {
  const today = new Date();
  const expiry = new Date(today);
  expiry.setDate(expiry.getDate() + 7);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const tc = (key: string) => t(`useCaseDetails.contract.${key}`);

  return (
    <div className="mt-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            {tc('sectionTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Document container */}
          <div className="bg-white dark:bg-zinc-950 border rounded-md p-8 max-w-4xl mx-auto space-y-8 text-sm text-foreground">

            {/* Sinopia letterhead */}
            <div className="flex flex-col md:flex-row md:justify-between gap-6 pb-6 border-b">
              <div className="space-y-1">
                <p className="font-bold text-base">Sinopia Deutschland GmbH</p>
                <p className="text-muted-foreground">Deckerstraße 39</p>
                <p className="text-muted-foreground">70372 Stuttgart</p>
              </div>
              <div className="space-y-1 md:text-right">
                <p className="font-semibold">{tc('salesPerson')}</p>
                <p className="text-muted-foreground">Herrn Jens Uwe Jung</p>
                <div className="flex items-center gap-1.5 md:justify-end text-muted-foreground">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>0177 492 8319</span>
                </div>
                <div className="flex items-center gap-1.5 md:justify-end text-muted-foreground">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>procurement@sinopia.eu</span>
                </div>
                <div className="flex items-center gap-1.5 md:justify-end text-muted-foreground">
                  <Globe className="w-3.5 h-3.5 shrink-0" />
                  <span>www.sinopia.eu</span>
                </div>
              </div>
            </div>

            {/* Offer header */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-6">
                <div>
                  <span className="font-semibold">{tc('offerNo')}:</span>{' '}
                  <span className="text-muted-foreground">{useCase.id}</span>
                </div>
                <div>
                  <span className="font-semibold">{tc('offerDate')}:</span>{' '}
                  <span className="text-muted-foreground">{formatDate(today)}</span>
                </div>
              </div>
              <p className="font-medium">{tc('greeting')}</p>
              <p className="text-muted-foreground leading-relaxed">
                {tc('intro')} ({useCase.id}){' '}
                <span className="font-medium text-foreground">{useCase.title}</span>.
              </p>
            </div>

            <Separator />

            {/* 2. Management Summary */}
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2">
                <span className="text-muted-foreground font-normal text-xs">2.</span>
                {tc('managementSummary')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{useCase.description}</p>
            </div>

            <Separator />

            {/* 3. Implementation Phases */}
            {useCase.stages && useCase.stages.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="text-muted-foreground font-normal text-xs">3.</span>
                  {tc('implementationPhases')}
                </h3>
                <div className="space-y-2">
                  {useCase.stages.map((stage, index) => (
                    <div key={index} className="pl-4 border-l-2 border-border space-y-0.5">
                      <p className="font-semibold">{stage.stage_name}</p>
                      <p className="text-muted-foreground">{stage.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* 4. Scope of Services */}
            {useCase.objectives && useCase.objectives.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="text-muted-foreground font-normal text-xs">4.</span>
                  {tc('scopeOfServices')}
                </h3>
                <ul className="space-y-1">
                  {useCase.objectives.map((obj, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* 5. Required Skills & Roles */}
            {useCase.job_titles && useCase.job_titles.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="text-muted-foreground font-normal text-xs">5.</span>
                  {tc('requiredSkillsRoles')}
                </h3>
                <div className="space-y-3">
                  {useCase.job_titles.map((job, index) => (
                    <div key={index} className="pl-4 border-l-2 border-border space-y-1">
                      <p className="font-semibold">{job.job_title}</p>
                      {job.description && (
                        <p className="text-muted-foreground text-xs">{job.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* 6. Prerequisites & Assumptions */}
            <div className="space-y-3">
              <h3 className="font-bold text-base flex items-center gap-2">
                <span className="text-muted-foreground font-normal text-xs">6.</span>
                {tc('prerequisites')}
              </h3>
              {(useCase.skill_searcher?.company_size || useCase.skill_searcher?.industry) && (
                <div className="flex flex-wrap gap-6 mb-2">
                  {useCase.skill_searcher?.company_size && (
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{tc('companySizeLabel')}:</span>
                      <span className="text-muted-foreground">{useCase.skill_searcher.company_size}</span>
                    </div>
                  )}
                  {useCase.skill_searcher?.industry && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{tc('industryLabel')}:</span>
                      <span className="text-muted-foreground">{useCase.skill_searcher.industry}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="space-y-1">
                <p className="font-medium mb-2">{tc('assumptionsTitle')}</p>
                {(['assumption1','assumption2','assumption3','assumption4','assumption5'] as const).map((key) => (
                  <div key={key} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                    <span>{tc(key)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1 mt-2">
                <p className="font-medium mb-2">{tc('scopeLimits')}</p>
                {(['scopeLimit1','scopeLimit2','scopeLimit3'] as const).map((key) => (
                  <div key={key} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
                    <span>{tc(key)}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 7. Service Hours */}
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2">
                <span className="text-muted-foreground font-normal text-xs">7.</span>
                {tc('serviceHours')}
              </h3>
              <p className="text-muted-foreground">{tc('serviceHoursText')}</p>
              <p className="text-muted-foreground">{tc('workingDay')}</p>
            </div>

            <Separator />

            {/* 8. Travel Expenses */}
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2">
                <span className="text-muted-foreground font-normal text-xs">8.</span>
                {tc('travelExpenses')}
              </h3>
              <p className="text-muted-foreground">{tc('travelExpensesText')}</p>
            </div>

            <Separator />

            {/* 9. Payment Plan */}
            {useCase.stages && useCase.stages.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <span className="text-muted-foreground font-normal text-xs">9.</span>
                  {tc('paymentPlan')}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-2 px-3 font-semibold border border-border">{t('useCaseDetails.implementationStages')}</th>
                        <th className="text-right py-2 px-3 font-semibold border border-border">{t('useCaseDetails.requiredSkills')}</th>
                        <th className="text-right py-2 px-3 font-semibold border border-border">%</th>
                        <th className="text-right py-2 px-3 font-semibold border border-border">{t('projects.totalCost')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {useCase.stages.map((stage, index) => {
                        const pct = useCase.total_project_hours > 0
                          ? (stage.total_hours / useCase.total_project_hours) * 100
                          : 0;
                        const stageCost = useCase.total_cost * (pct / 100);
                        return (
                          <tr key={index} className="border-b border-border">
                            <td className="py-2 px-3 border border-border">{stage.stage_name}</td>
                            <td className="py-2 px-3 text-right border border-border text-muted-foreground">{stage.total_hours}h</td>
                            <td className="py-2 px-3 text-right border border-border text-muted-foreground">{pct.toFixed(1)}%</td>
                            <td className="py-2 px-3 text-right border border-border font-medium">{formatCurrency(stageCost)}</td>
                          </tr>
                        );
                      })}
                      <tr className="bg-muted/30 font-semibold">
                        <td className="py-2 px-3 border border-border">Total</td>
                        <td className="py-2 px-3 text-right border border-border">{useCase.total_project_hours}h</td>
                        <td className="py-2 px-3 text-right border border-border">100%</td>
                        <td className="py-2 px-3 text-right border border-border">{formatCurrency(useCase.total_cost)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-muted-foreground text-xs">{tc('invoiceNote')}</p>
              </div>
            )}

            <Separator />

            {/* 10. Acceptance */}
            <div className="space-y-2">
              <h3 className="font-bold text-base flex items-center gap-2">
                <span className="text-muted-foreground font-normal text-xs">10.</span>
                {tc('acceptance')}
              </h3>
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">{tc('offerDate')}:</span>{' '}
                  {formatDate(today)}
                </div>
                <div>
                  <span className="font-medium text-foreground">{tc('offerValidUntil')}:</span>{' '}
                  {formatDate(expiry)}
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
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

        {/* Contract / Offer Section */}
        <ContractSection useCase={useCase} t={t} formatCurrency={formatCurrency} />
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
