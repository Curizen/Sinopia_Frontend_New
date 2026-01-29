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
import { ArrowLeft, Plus, X, Sparkles, CheckCircle, Clock, Users, Layers, Euro, Brain, Upload, Download, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { TermsContent } from '@/components/TermsContent';
import jsPDF from 'jspdf';

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
  total_project_cost: number;
  required_job_titles: {
    job_titles: JobTitle[];
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
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<{ title: string; description: string; objectives: string[] } | null>(null);

  const getUserName = () => {
    try {
      const profileCache = localStorage.getItem('user_profile_cache');
      if (profileCache) {
        const profile = JSON.parse(profileCache);
        if (profile.full_name) return profile.full_name;
        if (profile.first_name || profile.last_name) {
          return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
        }
      }
      const sinopiaUser = localStorage.getItem('sinopia_user');
      if (sinopiaUser) {
        const user = JSON.parse(sinopiaUser);
        return user.name || user.email || t('offers.user');
      }
    } catch (e) {
      console.error('Error getting user name:', e);
    }
    return t('offers.user');
  };

  const userName = getUserName();
  const currentDate = new Date().toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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

  // Check if we have a file-based analysis (uploaded file)
  const hasFileAnalysis = analysisResult !== null;

  const validateForm = (requireFields: boolean = true) => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const filteredObjectives = objectives
      .map(obj => obj.trim())
      .filter(obj => obj.length > 0);

    // If file was uploaded (analysis exists), fields are optional
    if (!requireFields || hasFileAnalysis) {
      return {
        title: trimmedTitle || t('useCases.uploadedUseCase'),
        description: trimmedDescription || t('useCases.uploadedUseCaseDesc'),
        objectives: filteredObjectives.length > 0 ? filteredObjectives : [t('useCases.uploadedUseCaseObjective')],
      };
    }

    // Manual entry path: all fields required
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

  // Step 1: Analyze Use Case (manual entry - requires fields)
  const handleAnalyze = async () => {
    const formData = validateForm(true);
    if (!formData) return;

    setIsAnalyzing(true);

    try {
      const token = localStorage.getItem('sinopia_token');
      
      // Construct formatted string for use_case_file
      const formattedString = `title: ${formData.title}
Description: ${formData.description}
Objectives:
${formData.objectives.map(obj => `- ${obj}`).join('\n')}`;

      const response = await fetch('/api/use-case/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        credentials: 'include',
        body: JSON.stringify({
          use_case_file: formattedString,
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

  // Step 2: Open Terms Modal (intercept submission)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    // File upload path: fields are optional; Manual path: fields required
    const formData = validateForm(!hasFileAnalysis);
    if (!formData) return;

    // Store form data and open terms modal
    setPendingFormData(formData);
    setShowTermsModal(true);
  };

  // Step 3: Create Use Case after Terms acceptance
  const handleConfirmCreate = async () => {
    if (!pendingFormData) return;

    const cachedAnalysis = localStorage.getItem(ANALYSIS_CACHE_KEY);
    if (!cachedAnalysis) {
      toast({
        title: t('common.error'),
        description: t('useCases.analysisDataInvalid'),
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
    setShowTermsModal(false);

    try {
      const token = localStorage.getItem('sinopia_token');
      
      // Merge form data with cached analysis data
      const payload = {
        title: pendingFormData.title,
        description: pendingFormData.description,
        objectives: pendingFormData.objectives,
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
      setPendingFormData(null);

      // Also update local project context
      addProject({
        title: pendingFormData.title,
        description: `${pendingFormData.description}\n\n${t('useCases.objective')}: ${pendingFormData.objectives.join(', ')}`,
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

  // PDF Download for Use Case Contract
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let yPosition = margin;

    const addNewPageIfNeeded = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
    };

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(t('useCases.contractTitle'), pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    // Date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(currentDate, pageWidth / 2, yPosition, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    yPosition += 15;

    // Use Case Details Box
    if (pendingFormData) {
      addNewPageIfNeeded(60);
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(250, 250, 250);
      
      const detailsBoxHeight = 50;
      doc.roundedRect(margin, yPosition, maxWidth, detailsBoxHeight, 3, 3, 'FD');
      
      yPosition += 10;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(t('useCases.useCaseDetails'), margin + 10, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`${t('useCases.titleLabel')}:`, margin + 10, yPosition);
      doc.setFont('helvetica', 'normal');
      const titleLines = doc.splitTextToSize(pendingFormData.title, maxWidth - 60);
      doc.text(titleLines[0] || '', margin + 50, yPosition);
      yPosition += 8;

      doc.setFont('helvetica', 'bold');
      doc.text(`${t('useCases.descriptionLabel')}:`, margin + 10, yPosition);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(pendingFormData.description, maxWidth - 60);
      doc.text(descLines[0] || '', margin + 50, yPosition);
      if (descLines.length > 1) {
        yPosition += 6;
        doc.text(descLines[1] || '', margin + 50, yPosition);
      }
      yPosition += 15;
    }

    // Analysis Results Box
    if (analysisResult) {
      const analysisBoxHeight = 40;
      addNewPageIfNeeded(analysisBoxHeight + 10);
      
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(margin, yPosition, maxWidth, analysisBoxHeight, 3, 3, 'FD');
      
      yPosition += 10;
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(t('useCases.projectOverview'), margin + 10, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(`${t('useCases.totalHours')}:`, margin + 10, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(`${analysisResult.total_project_hours} ${t('useCases.hours')}`, margin + 60, yPosition);

      doc.setFont('helvetica', 'bold');
      doc.text(`${t('useCases.totalCost')}:`, margin + 100, yPosition);
      doc.setFont('helvetica', 'normal');
      const costFormatted = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(analysisResult.total_project_cost || 0);
      doc.text(costFormatted, margin + 130, yPosition);
      yPosition += 15;
    }

    // Separator
    addNewPageIfNeeded(20);
    yPosition += 5;
    doc.setDrawColor(180, 180, 180);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Terms & Conditions
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(t('terms.title'), margin, yPosition);
    yPosition += 8;
    
    const termsText = t('terms.content');
    const cleanText = termsText
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\n\n/g, '\n');
    
    const lines = cleanText.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        yPosition += 4;
        continue;
      }

      const isBoldLine = /^\d+\./.test(trimmedLine) || 
                         trimmedLine.startsWith('Allgemeine') ||
                         trimmedLine.startsWith('General') ||
                         trimmedLine.includes('AGB') ||
                         trimmedLine.includes('Terms');

      if (isBoldLine) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
      }

      const splitLines = doc.splitTextToSize(trimmedLine, maxWidth);
      const lineHeight = isBoldLine ? 6 : 5;
      
      for (const splitLine of splitLines) {
        addNewPageIfNeeded(lineHeight);
        doc.text(splitLine, margin, yPosition);
        yPosition += lineHeight;
      }
      
      yPosition += 2;
    }

    // Digital Signature Box
    addNewPageIfNeeded(70);
    yPosition += 10;

    doc.setDrawColor(100, 100, 100);
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(margin, yPosition, maxWidth, 55, 3, 3, 'FD');

    yPosition += 12;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(t('offers.digitalSignature'), margin + 10, yPosition);
    
    yPosition += 14;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(t('offers.digitallySignedBy'), margin + 10, yPosition);
    
    doc.setFont('helvetica', 'bolditalic');
    doc.setFontSize(14);
    doc.text(userName, margin + 10 + doc.getTextWidth(t('offers.digitallySignedBy')) + 5, yPosition);

    yPosition += 12;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${t('offers.signatureDate')} ${currentDate}`, margin + 10, yPosition);

    // Save PDF
    doc.save('Sinopia_UseCase_Contract.pdf');
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

        {/* File Upload CTA */}
        <div className="mb-6 p-6 bg-primary/5 border-2 border-dashed border-primary/20 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{t('useCases.uploadCta.headline')}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t('useCases.uploadCta.subtext')}
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setLocation('/use-cases/upload')}
              className="shrink-0"
              data-testid="button-upload-usecase-file"
            >
              <Upload className="w-4 h-4 mr-2" />
              {t('useCases.uploadCta.button')}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('useCases.details')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">
                  {t('useCases.titleLabel')}
                  {hasFileAnalysis && <span className="text-muted-foreground text-xs ml-2">({t('common.optional')})</span>}
                </Label>
                <Input
                  id="title"
                  placeholder={hasFileAnalysis ? t('useCases.titlePlaceholderOptional') : t('useCases.titlePlaceholder')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required={!hasFileAnalysis}
                  data-testid="input-usecase-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  {t('useCases.descriptionLabel')}
                  {hasFileAnalysis && <span className="text-muted-foreground text-xs ml-2">({t('common.optional')})</span>}
                </Label>
                <Textarea
                  id="description"
                  placeholder={hasFileAnalysis ? t('useCases.descriptionPlaceholderOptional') : t('useCases.descriptionPlaceholder')}
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required={!hasFileAnalysis}
                  data-testid="input-usecase-description"
                />
              </div>

              <div className="space-y-3">
                <Label>
                  {t('useCases.objectiveLabel')}
                  {hasFileAnalysis && <span className="text-muted-foreground text-xs ml-2">({t('common.optional')})</span>}
                </Label>
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

              {/* AI Analyzing Animation */}
              {isAnalyzing && (
                <Card className="border-primary/30 bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20">
                  <CardContent className="py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      {/* Glow effect container */}
                      <div className="relative">
                        {/* Outer glow rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full bg-orange-200/40 dark:bg-orange-500/20 animate-ping" style={{ animationDuration: '2s' }} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-orange-300/30 dark:bg-orange-400/20 animate-pulse" />
                        </div>
                        {/* Icon container with glow background */}
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-900/40">
                          <Brain className="w-12 h-12 text-orange-600 dark:text-orange-400 animate-pulse" />
                        </div>
                      </div>
                      {/* Text */}
                      <p className="mt-6 text-lg font-medium text-gray-700 dark:text-gray-300">
                        {t('useCases.analyzing')}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t('useCases.analyzingDescription')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* AI Analysis Results Preview */}
              {analysisResult && !isAnalyzing && (
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                              <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t('useCases.totalHours')}</p>
                              <p className="text-xl font-bold" data-testid="text-total-hours">{analysisResult.total_project_hours} {t('useCases.hours')}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10">
                              <Euro className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t('useCases.totalCost')}</p>
                              <p className="text-xl font-bold text-green-600" data-testid="text-total-cost">
                                {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(analysisResult.total_project_cost || 0)}
                              </p>
                            </div>
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
                    {analysisResult.required_job_titles?.job_titles && analysisResult.required_job_titles.job_titles.length > 0 && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold">{t('useCases.requiredRolesDetailed')}</h4>
                        </div>
                        <div className="space-y-3">
                          {analysisResult.required_job_titles.job_titles.map((role, index) => (
                            <div key={index} className="p-4 bg-background rounded-lg border">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                  <Users className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-lg font-semibold">
                                  {role.number_of_employees} {role.number_of_employees === 1 ? t('useCases.employee') : t('useCases.employees')}
                                </span>
                              </div>
                              {role.required_skills && role.required_skills.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {role.required_skills.map((skill, skillIndex) => (
                                    <span 
                                      key={skillIndex} 
                                      className="px-2.5 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md"
                                    >
                                      {skill.skill} ({skill.level})
                                    </span>
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

      {/* Terms & Conditions Modal */}
      <Dialog open={showTermsModal} onOpenChange={setShowTermsModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t('useCases.termsTitle')}
            </DialogTitle>
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
              data-testid="button-download-contract-pdf"
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
                onClick={handleConfirmCreate}
                disabled={isLoading}
                className="flex-1 sm:flex-none"
                data-testid="button-agree-create"
              >
                {isLoading ? t('common.loading') : t('useCases.agreeAndCreate')}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
