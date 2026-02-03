import { useState, useEffect } from 'react';
import { useRoute, Link, Redirect } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Clock,
  Target,
  Layers,
  Wrench,
  Loader2,
  FileText,
} from 'lucide-react';

interface Stage {
  stage_name: string;
  description: string;
}

interface RequiredSkill {
  skill_name: string;
  required_level: string;
}

interface ProjectDetails {
  id: number;
  title: string;
  description: string;
  objectives: string[];
  status: string;
  stages: Stage[];
  required_skills: RequiredSkill[];
  total_project_hours?: number;
}

export default function ProjectDetailPage() {
  const [, params] = useRoute('/projects/:id');
  const { user } = useAuth();
  const { t } = useI18n();
  const { toast } = useToast();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isSkillGiver = user?.role === 'skill_giver';

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!params?.id) return;
      
      // Only fetch for skill givers - skill searchers use UseCaseDetailsPage
      if (!isSkillGiver) {
        setIsLoading(false);
        return;
      }
      
      try {
        const token = localStorage.getItem('sinopia_token');
        const response = await fetch(`/api/use-case/skill-giver/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }

        const data = await response.json();
        console.log('[DEBUG] Fetched project details:', data);
        
        // Handle successful response with defensive checks
        // Support both flat structure (data.data) and nested structure (data.data.project_job_titles.projects)
        if (data.success && data.data) {
          let projectData = data.data;
          
          // Check if data is nested under project_job_titles.projects (like list endpoint)
          if (projectData.project_job_titles?.projects) {
            projectData = {
              ...projectData.project_job_titles.projects,
              // Preserve any additional fields from parent
              objectives: projectData.objectives || projectData.project_job_titles.projects.objectives,
              stages: projectData.stages || projectData.project_job_titles.projects.stages,
              required_skills: projectData.required_skills || projectData.project_job_titles.projects.required_skills,
            };
          }
          
          setProject({
            id: projectData.id,
            title: projectData.title || t('common.untitled'),
            description: projectData.description || '',
            objectives: Array.isArray(projectData.objectives) ? projectData.objectives : [],
            status: projectData.status || 'pending',
            stages: Array.isArray(projectData.stages) ? projectData.stages : [],
            required_skills: Array.isArray(projectData.required_skills) ? projectData.required_skills : [],
            total_project_hours: projectData.total_project_hours,
          });
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
        toast({
          title: t('common.error'),
          description: t('projects.fetchError'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectDetails();
  }, [params?.id, toast, t, isSkillGiver]);

  const getTranslatedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      draft: 'projects.statusDraft',
      open: 'projects.statusOpen',
      pending: 'projects.statusPending',
      active: 'projects.statusActive',
      in_progress: 'projects.statusInProgress',
      completed: 'projects.statusCompleted',
      cancelled: 'projects.statusCancelled',
    };
    return t(statusMap[status] || status);
  };

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

  const getLevelBadgeVariant = (level: string): "default" | "secondary" | "outline" => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'default';
      case 'advanced':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const formatHours = (hours: number) => {
    return new Intl.NumberFormat('de-DE').format(hours);
  };

  // Redirect non-skill-givers to the use case details page
  if (!isSkillGiver && params?.id) {
    return <Redirect to={`/use-case/${params.id}`} />;
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-display font-bold">{project.title}</h1>
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                {getTranslatedStatus(project.status)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {t('projects.description')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
              </CardContent>
            </Card>

            {project.objectives && project.objectives.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {t('useCases.objective')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-medium">{index + 1}.</span>
                        <span className="text-muted-foreground">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {project.stages && project.stages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    {t('useCases.stages')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border" />
                    <div className="space-y-6">
                      {project.stages.map((stage, index) => (
                        <div key={index} className="relative pl-8">
                          <div className="absolute left-0 w-6 h-6 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">{index + 1}</span>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-semibold">{stage.stage_name}</h4>
                            <p className="text-sm text-muted-foreground">{stage.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {project.total_project_hours && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {t('useCases.totalHours')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    {formatHours(project.total_project_hours)} {t('useCases.hours')}
                  </p>
                </CardContent>
              </Card>
            )}

            {project.required_skills && project.required_skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5" />
                    {t('projects.skills')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {project.required_skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between gap-2 p-2 rounded-md bg-muted/50">
                        <span className="font-medium text-sm">{skill.skill_name}</span>
                        <Badge variant={getLevelBadgeVariant(skill.required_level)}>
                          {skill.required_level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
