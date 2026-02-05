import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, Clock, FolderKanban, Users, Loader2, Target } from 'lucide-react';

interface UseCase {
  id: number;
  title: string;
  description: string;
  total_cost: number;
  objectives: string[];
  status: string;
  skill_giver_status: string;
  total_project_hours: number;
}

interface ProjectJobTitle {
  id: number;
  job_title: string;
  projects: {
    id: number;
    title: string;
    status: string;
    total_project_hours: number;
  };
}

interface SkillGiverProject {
  id: number;
  project_job_titles: ProjectJobTitle | ProjectJobTitle[];
}

export default function ProjectsPage() {
  const { user } = useAuth();
  const { t } = useI18n();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [projects, setProjects] = useState<UseCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSkillGiver = user?.role === 'skill_giver';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('sinopia_token');
        const headers = {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        };

        if (isSkillGiver) {
          // Fetch skill giver's assigned projects
          const response = await fetch('/api/use-case/skill-giver', {
            method: 'GET',
            headers,
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch projects');
          }

          const data = await response.json();
          console.log('[DEBUG] Fetched skill giver projects:', data);
          
          // Map the nested structure to our UseCase interface with defensive checks
          // Handles both object and array shapes for project_job_titles
          const rawProjects = data.data || [];
          const mappedProjects: UseCase[] = [];
          
          for (const item of rawProjects) {
            if (!item?.project_job_titles) continue;
            
            // Normalize to array if it's an object
            const jobTitles = Array.isArray(item.project_job_titles) 
              ? item.project_job_titles 
              : [item.project_job_titles];
            
            for (const jobTitle of jobTitles) {
              if (!jobTitle?.projects?.id) continue;
              
              mappedProjects.push({
                id: jobTitle.projects.id,
                title: jobTitle.projects.title || t('common.untitled'),
                description: `${t('projects.jobRole')}: ${jobTitle.job_title || t('common.unknown')}`,
                total_cost: 0,
                objectives: [],
                status: jobTitle.projects.status || 'pending',
                skill_giver_status: jobTitle.projects.status || 'pending',
                total_project_hours: jobTitle.projects.total_project_hours || 0,
              });
            }
          }
          
          setProjects(mappedProjects);
        } else {
          // Fetch skill searcher's use cases
          const response = await fetch('/api/use-case/my-usecases', {
            method: 'GET',
            headers,
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Failed to fetch projects');
          }

          const data = await response.json();
          console.log('[DEBUG] Fetched use cases:', data);
          setProjects(data.use_cases || []);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: t('common.error'),
          description: t('projects.fetchError'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [toast, t, isSkillGiver]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'active':
      case 'in_progress':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'pending':
        return 'outline';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">{t('projects.title')}</h1>
            {!isSkillGiver && (
              <p className="text-muted-foreground">
                {t('footer.postProjects')}
              </p>
            )}
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

        {!isSkillGiver && (
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
                <SelectItem value="pending">{t('projects.statusPending')}</SelectItem>
                <SelectItem value="active">{t('projects.statusActive')}</SelectItem>
                <SelectItem value="in_progress">{t('projects.statusInProgress')}</SelectItem>
                <SelectItem value="completed">{t('projects.statusCompleted')}</SelectItem>
                <SelectItem value="cancelled">{t('projects.statusCancelled')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredProjects.length === 0 ? (
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
            {filteredProjects.map((project) => (
              <Link key={project.id} href={isSkillGiver ? `/projects/${project.id}` : `/use-case/${project.id}`}>
              <Card className="hover-elevate cursor-pointer" data-testid={`card-project-${project.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {getTranslatedStatus(project.status)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {project.description}
                  </p>
                  
                  {project.objectives && project.objectives.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Target className="w-3.5 h-3.5" />
                        <span>{t('useCases.objective')}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.objectives.map((objective, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="text-xs font-normal"
                          >
                            {objective}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-3 border-t">
                  <div className="grid grid-cols-3 gap-4 w-full text-sm">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">{t('projects.totalCost')}</span>
                      <span className="font-semibold">
                        {formatCurrency(project.total_cost)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">{t('useCases.totalHours')}</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatHours(project.total_project_hours)} {t('useCases.hours')}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-xs">{t('projects.expertStatus')}</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {getTranslatedStatus(project.skill_giver_status)}
                      </span>
                    </div>
                  </div>
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
