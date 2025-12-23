import { useState } from 'react';
import { Link } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useProjects } from '@/context/ProjectContext';
import { useI18n } from '@/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Search, Plus, Clock, DollarSign, FolderKanban } from 'lucide-react';
import { UnderDevelopment } from '@/components/common/UnderDevelopment';

export default function ProjectsPage() {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const isSkillGiver = user?.role === 'skill_giver';

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'in_progress':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'open':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">{t('projects.title')}</h1>
            <p className="text-muted-foreground">
              {isSkillGiver ? t('footer.findProjects') : t('footer.postProjects')}
            </p>
          </div>
          {!isSkillGiver && (
            <Link href="/projects/new">
              <Button data-testid="button-add-project">
                <Plus className="w-4 h-4 mr-2" />
                {t('projects.addNew')}
              </Button>
            </Link>
          )}
        </div>

        <UnderDevelopment className="mb-6" />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('projects.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-projects"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-status-filter">
              <SelectValue placeholder={t('projects.status')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('common.filter')}</SelectItem>
              <SelectItem value="open">{t('projects.statusOpen')}</SelectItem>
              <SelectItem value="in_progress">{t('projects.statusInProgress')}</SelectItem>
              <SelectItem value="completed">{t('projects.statusCompleted')}</SelectItem>
              <SelectItem value="cancelled">{t('projects.statusCancelled')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FolderKanban className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">{t('common.noResults')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('dashboard.noProjects')}
              </p>
              {!isSkillGiver && !searchQuery && statusFilter === 'all' && (
                <Link href="/projects/new">
                  <Button>{t('projects.addNew')}</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredProjects.map((project) => {
              const overallProgress = project.stages.length > 0
                ? Math.round(project.stages.reduce((sum, s) => sum + s.progress, 0) / project.stages.length)
                : 0;

              return (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="hover-elevate cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <Badge variant={getStatusBadgeVariant(project.status)}>
                              {getTranslatedStatus(project.status)}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.skills.slice(0, 5).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {project.skills.length > 5 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.skills.length - 5}
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {formatCurrency(project.budget)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {t('projects.deadline')}: {formatDate(project.deadline)}
                            </span>
                          </div>
                        </div>
                        {project.stages.length > 0 && (
                          <div className="w-full md:w-48">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-muted-foreground">{t('dashboard.progress')}</span>
                              <span className="font-medium">{overallProgress}%</span>
                            </div>
                            <Progress value={overallProgress} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-2">
                              {project.stages.length} {t('dashboard.stages')}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
