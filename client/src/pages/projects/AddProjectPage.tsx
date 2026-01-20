import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useProjects } from '@/context/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/i18n';
import { ArrowLeft, Plus, X, Sparkles, CheckCircle, Clock, Users, Layers, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RequiredSkill {
  skill: string;
  level: string;
}

interface JobTitle {
  number_of_employees: number;
  required_skills: RequiredSkill[];
}

interface RequiredStage {
  stage_name: string;
  total_stage_hours: number;
}

interface AnalysisResult {
  total_project_hours: number;
  required_job_titles: {
    required_skills: JobTitle[];
  };
  stages: {
    summary: string;
    required_stages: RequiredStage[];
  };
}

const ANALYSIS_CACHE_KEY = 'use_case_analysis_cache';

export default function AddProjectPage() {
  const { t } = useI18n();
  const { addProject } = useProjects();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState<string[]>(['']);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Load cached analysis on mount
  useEffect(() => {
    const cached = localStorage.getItem(ANALYSIS_CACHE_KEY);
    if (cached) {
      try {
        setAnalysisResult(JSON.parse(cached));
      } catch (e) {
        localStorage.removeItem(ANALYSIS_CACHE_KEY);
      }
    }
  }, []);

  const addObjective = () => {
    setObjectives([...objectives, '']);
  };

  const removeObjective = (index: number) => {
    if (objectives.length > 1) {
      setObjectives(objectives.filter((_, i) => i !== index));
    }
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const validateForm = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const filteredObjectives = objectives
      .map(obj => obj.trim())
      .filter(obj => obj.length > 0);

    if (!trimmedTitle || !trimmedDescription) {
      toast({
        title: t('common.error'),
        description: t('useCases.allFieldsRequired'),
        variant: 'destructive',
      });
      return null;
    }

    if (filteredObjectives.length === 0) {
      toast({
        title: t('common.error'),
        description: t('useCases.atLeastOneObjective'),
        variant: 'destructive',
      });
      return null;
    }

    return {
      title: trimmedTitle,
      description: trimmedDescription,
      objectives: filteredObjectives,
    };
  };

  // Step 1: Analyze Use Case
  const handleAnalyze = async () => {
    const formData = validateForm();
    if (!formData) return;

    setIsAnalyzing(true);

    try {
      const token = localStorage.getItem('sinopia_token');
      const response = await fetch('/api/use-case/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: 'include',
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          objectives: formData.objectives,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || t('useCases.analysisError'));
      }

      const analysisData = await response.json();
      
      // Cache the analysis result
      localStorage.setItem(ANALYSIS_CACHE_KEY, JSON.stringify(analysisData));
      setAnalysisResult(analysisData);

      toast({
        title: t('useCases.analysisComplete'),
        description: t('useCases.analysisCompleteDesc'),
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : t('useCases.analysisError'),
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Step 2: Create Full Use Case
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = validateForm();
    if (!formData) return;

    // Check if analysis was performed
    const cachedAnalysis = localStorage.getItem(ANALYSIS_CACHE_KEY);
    if (!cachedAnalysis) {
      toast({
        title: t('common.error'),
        description: t('useCases.analyzeFirst'),
        variant: 'destructive',
      });
      return;
    }

    let parsedAnalysis: AnalysisResult;
    try {
      parsedAnalysis = JSON.parse(cachedAnalysis);
    } catch (e) {
      toast({
        title: t('common.error'),
        description: t('useCases.analysisDataInvalid'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const token = localStorage.getItem('sinopia_token');
      
      // Merge form data with cached analysis data
      const payload = {
        title: formData.title,
        description: formData.description,
        objectives: formData.objectives,
        total_project_hours: parsedAnalysis.total_project_hours,
        required_job_titles: parsedAnalysis.required_job_titles,
        stages: parsedAnalysis.stages,
      };

      console.log('Creating use case with payload:', JSON.stringify(payload, null, 2));

      const response = await fetch('/api/use-case', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || t('useCases.createError'));
      }

      // Clear the cache on success
      localStorage.removeItem(ANALYSIS_CACHE_KEY);
      setAnalysisResult(null);

      // Also update local project context
      addProject({
        title: formData.title,
        description: `${formData.description}\n\n${t('useCases.objective')}: ${formData.objectives.join(', ')}`,
        status: 'open',
        budget: 0,
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        skills: [],
        stages: [],
        ownerId: '2',
      });

      toast({
        title: t('useCases.created'),
        description: t('useCases.createdDesc'),
      });

      setLocation('/dashboard');
    } catch (error) {
      console.error('Create use case error:', error);
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : t('useCases.createError'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearAnalysis = () => {
    localStorage.removeItem(ANALYSIS_CACHE_KEY);
    setAnalysisResult(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold">{t('useCases.postTitle')}</h1>
            <p className="text-muted-foreground">{t('useCases.postSubtitle')}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('useCases.details')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t('useCases.titleLabel')}</Label>
                <Input
                  id="title"
                  placeholder={t('useCases.titlePlaceholder')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  data-testid="input-usecase-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t('useCases.descriptionLabel')}</Label>
                <Textarea
                  id="description"
                  placeholder={t('useCases.descriptionPlaceholder')}
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  data-testid="input-usecase-description"
                />
              </div>

              <div className="space-y-3">
                <Label>{t('useCases.objectiveLabel')}</Label>
                <div className="space-y-3">
                  {objectives.map((objective, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={t('useCases.objectivePlaceholder')}
                        value={objective}
                        onChange={(e) => updateObjective(index, e.target.value)}
                        className="flex-1"
                        data-testid={`input-usecase-objective-${index}`}
                      />
                      {objectives.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeObjective(index)}
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          data-testid={`button-remove-objective-${index}`}
                        >
                          <X className="w-4 h-4" />
                          <span className="sr-only">{t('useCases.removeObjective')}</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addObjective}
                  className="mt-2"
                  data-testid="button-add-objective"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('useCases.addObjective')}
                </Button>
              </div>

              {/* AI Analysis Results Preview */}
              {analysisResult && (
                <Card className="bg-muted/50 border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <CardTitle className="text-lg">{t('useCases.analysisResults')}</CardTitle>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearAnalysis}
                        className="text-muted-foreground hover:text-destructive"
                        data-testid="button-clear-analysis"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Section 1: Project Overview */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold">{t('useCases.projectOverview')}</h4>
                      </div>
                      <div className="p-4 bg-background rounded-lg space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{t('useCases.totalHours')}</p>
                            <p className="text-xl font-bold">{analysisResult.total_project_hours} {t('useCases.hours')}</p>
                          </div>
                        </div>
                        {analysisResult.stages?.summary && (
                          <div className="pt-3 border-t">
                            <p className="text-sm text-muted-foreground mb-1">{t('useCases.projectSummary')}</p>
                            <p className="text-sm leading-relaxed">{analysisResult.stages.summary}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section 2: Required Roles */}
                    {analysisResult.required_job_titles?.required_skills && analysisResult.required_job_titles.required_skills.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold">{t('useCases.requiredRolesDetailed')}</h4>
                        </div>
                        <div className="space-y-3">
                          {analysisResult.required_job_titles.required_skills.map((role, index) => (
                            <div key={index} className="p-4 bg-background rounded-lg">
                              <div className="flex items-center gap-2 mb-3">
                                <Briefcase className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {role.number_of_employees} {role.number_of_employees === 1 ? t('useCases.employee') : t('useCases.employees')}
                                </span>
                              </div>
                              {role.required_skills && role.required_skills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {role.required_skills.map((skill, skillIndex) => (
                                    <Badge 
                                      key={skillIndex} 
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {skill.skill} ({skill.level})
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Section 3: Implementation Stages */}
                    {analysisResult.stages?.required_stages && analysisResult.stages.required_stages.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold">{t('useCases.implementationStages')}</h4>
                        </div>
                        <div className="relative">
                          {/* Timeline line */}
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                          <div className="space-y-3">
                            {analysisResult.stages.required_stages.map((stage, index) => (
                              <div key={index} className="relative pl-10">
                                {/* Timeline dot */}
                                <div className="absolute left-2.5 top-4 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                                <div className="p-4 bg-background rounded-lg">
                                  <div className="flex items-center justify-between flex-wrap gap-2">
                                    <p className="font-medium">{stage.stage_name}</p>
                                    <Badge variant="outline" className="text-xs">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {stage.total_stage_hours} {t('useCases.hours')}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/dashboard">
                  <Button type="button" variant="outline" data-testid="button-cancel">
                    {t('common.cancel')}
                  </Button>
                </Link>
                
                {/* Step 1: Analyze Button */}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || isLoading}
                  data-testid="button-analyze-usecase"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                      {t('useCases.analyzing')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t('useCases.analyzeButton')}
                    </>
                  )}
                </Button>

                {/* Step 2: Create Button */}
                <Button
                  type="submit"
                  disabled={isLoading || isAnalyzing || !analysisResult}
                  data-testid="button-create-usecase"
                >
                  {isLoading ? t('common.loading') : t('useCases.createButton')}
                </Button>
              </div>

              {!analysisResult && (
                <p className="text-sm text-muted-foreground">
                  {t('useCases.analyzeHint')}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
