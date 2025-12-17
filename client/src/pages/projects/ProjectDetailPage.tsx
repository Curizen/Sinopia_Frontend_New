import { useRoute, Link } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useProjects } from '@/context/ProjectContext';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import {
  ArrowLeft,
  Clock,
  DollarSign,
  User,
  CheckCircle2,
  Circle,
  PlayCircle,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const [, params] = useRoute('/projects/:id');
  const { projects, updateProject } = useProjects();
  const { user } = useAuth();
  const { t } = useI18n();

  const project = projects.find(p => p.id === params?.id);

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

  if (!project) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">{t('projectDetail.notFound')}</h2>
          <Link href="/projects">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('projectDetail.backToProjects')}
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const overallProgress = project.stages.length > 0
    ? Math.round(project.stages.reduce((sum, s) => sum + s.progress, 0) / project.stages.length)
    : 0;

  const isSkillGiver = user?.role === 'skill_giver';

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

  const getTaskIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <PlayCircle className="w-4 h-4 text-primary" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const handleTaskToggle = (stageId: string, taskId: string) => {
    const updatedStages = project.stages.map(stage => {
      if (stage.id === stageId) {
        const updatedTasks = stage.tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              status: task.status === 'completed' ? 'todo' as const : 'completed' as const,
            };
          }
          return task;
        });
        const completedTasks = updatedTasks.filter(t => t.status === 'completed').length;
        const progress = Math.round((completedTasks / updatedTasks.length) * 100);
        return { ...stage, tasks: updatedTasks, progress };
      }
      return stage;
    });
    updateProject(project.id, { stages: updatedStages });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-display font-bold">{project.title}</h1>
              <Badge variant={getStatusBadgeVariant(project.status)}>
                {getTranslatedStatus(project.status)}
              </Badge>
            </div>
          </div>
          {!isSkillGiver && (
            <Button variant="outline" data-testid="button-edit-project">{t('projectDetail.editProject')}</Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('projects.description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('projects.skills')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {project.stages.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{t('projectDetail.projectStages')}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {t('projectDetail.overall')}: {overallProgress}%
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {project.stages.map((stage) => (
                    <div key={stage.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{stage.name}</h4>
                        <span className="text-sm text-muted-foreground">{stage.progress}%</span>
                      </div>
                      <Progress value={stage.progress} className="h-2" />
                      <div className="space-y-2 pl-4 border-l-2 border-border">
                        {stage.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50"
                          >
                            <Checkbox
                              checked={task.status === 'completed'}
                              onCheckedChange={() => handleTaskToggle(stage.id, task.id)}
                              data-testid={`checkbox-task-${task.id}`}
                            />
                            <span className={task.status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                              {task.title}
                            </span>
                            {getTaskIcon(task.status)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('projectDetail.projectDetails')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('projects.budget')}</p>
                    <p className="font-semibold">{formatCurrency(project.budget)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('projects.deadline')}</p>
                    <p className="font-semibold">{formatDate(project.deadline)}</p>
                  </div>
                </div>
                {project.assigneeId && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('projectDetail.assignedTo')}</p>
                      <p className="font-semibold">John Smith</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.progress')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('projectDetail.overallCompletion')}</span>
                    <span className="font-bold text-lg">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {isSkillGiver && project.status === 'open' && (
              <Button className="w-full" data-testid="button-apply-project">
                {t('projects.applyNow')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
