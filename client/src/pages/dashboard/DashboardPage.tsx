import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectContext';
import { useOffers } from '@/context/OfferContext';
import { useContracts } from '@/context/ContractContext';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'wouter';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import {
  FolderKanban,
  FileText,
  Handshake,
  TrendingUp,
  ArrowRight,
  Clock,
  Plus,
  Upload,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { offers } = useOffers();
  const { contracts } = useContracts();
  const { t } = useI18n();

  const isSkillGiver = user?.role === 'skill_giver';

  const getTranslatedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: 'projects.statusDraft',
      open: 'projects.statusOpen',
      in_progress: 'projects.statusInProgress',
      completed: 'projects.statusCompleted',
      cancelled: 'projects.statusCancelled',
    };
    return t(statusMap[status] || status);
  };

  const activeProjects = projects.filter(p => p.status === 'in_progress');
  const pendingOffers = offers.filter(o => o.status === 'pending');
  const signedContracts = contracts.filter(c => c.status === 'signed');
  const totalEarnings = signedContracts.reduce((sum, c) => sum + c.amount, 0);

  const allStats = [
    {
      titleKey: 'dashboard.recentProjects',
      value: activeProjects.length,
      icon: FolderKanban,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      titleKey: 'dashboard.pendingOffers',
      value: pendingOffers.length,
      icon: FileText,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      skillGiverOnly: true,
    },
    {
      titleKey: 'dashboard.activeContracts',
      value: signedContracts.length,
      icon: Handshake,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      titleKey: 'dashboard.totalEarnings',
      value: formatCurrency(totalEarnings),
      icon: TrendingUp,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
  ];

  const stats = allStats.filter(stat => !stat.skillGiverOnly || isSkillGiver);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'open':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">
              {t('nav.dashboard')}
            </h1>
            <p className="text-muted-foreground">
              {t('dashboard.overview')}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {!isSkillGiver && (
              <>
                <Link href="/use-cases/upload">
                  <Button variant="outline" data-testid="button-upload-usecase">
                    <Upload className="w-4 h-4 mr-2" />
                    {t('useCases.uploadUseCase')}
                  </Button>
                </Link>
                <Link href="/projects/new">
                  <Button data-testid="button-dashboard-action">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('useCases.postUseCase')}
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>


        <div 
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 200px), 1fr))`
          }}
        >
          {stats.map((stat) => (
            <Card key={stat.titleKey} className="min-w-0">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground truncate">{t(stat.titleKey)}</p>
                    <p className="text-2xl font-bold mt-2 truncate">{stat.value}</p>
                  </div>
                  <div className={`w-11 h-11 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="text-lg">{t('dashboard.recentProjects')}</CardTitle>
              <Link href="/projects">
                <Button variant="ghost" size="sm">
                  {t('dashboard.viewAll')}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {activeProjects.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">{t('dashboard.noProjects')}</p>
              ) : (
                <div className="space-y-4">
                  {activeProjects.slice(0, 3).map((project) => {
                    const overallProgress = project.stages.length > 0
                      ? Math.round(project.stages.reduce((sum, s) => sum + s.progress, 0) / project.stages.length)
                      : 0;

                    return (
                      <Link key={project.id} href={`/projects/${project.id}`}>
                        <div className="p-4 rounded-lg border border-border hover-elevate cursor-pointer">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{project.title}</h4>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span>
                                  {formatCurrency(project.budget)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatDate(project.deadline)}
                                </span>
                              </div>
                            </div>
                            <Badge variant={getStatusBadgeVariant(project.status)}>
                              {getTranslatedStatus(project.status)}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{t('dashboard.progress')}</span>
                              <span className="font-medium">{overallProgress}%</span>
                            </div>
                            <Progress value={overallProgress} className="h-2" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {isSkillGiver && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="text-lg">{t('dashboard.pendingOffers')}</CardTitle>
                <Link href="/offers">
                  <Button variant="ghost" size="sm">
                    {t('dashboard.viewAll')}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                {pendingOffers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">{t('dashboard.noOffers')}</p>
                ) : (
                  <div className="space-y-4">
                    {pendingOffers.slice(0, 3).map((offer) => (
                      <Link key={offer.id} href={`/offers/${offer.id}`}>
                        <div className="p-4 rounded-lg border border-border hover-elevate cursor-pointer">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{offer.projectTitle}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {offer.fromUserName}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">
                                {formatCurrency(offer.amount)}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(offer.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
