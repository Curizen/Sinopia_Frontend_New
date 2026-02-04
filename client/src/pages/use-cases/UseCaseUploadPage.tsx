import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/i18n';
import { ArrowLeft, Upload, FileText, X, Check, AlertCircle, Loader2, Download } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface UploadedFile {
  file: File;
  id: string;
}

interface TemplateFile {
  file_name: string;
  file_url: string;
}

const ANALYSIS_CACHE_KEY = 'use_case_analysis_cache';

// Helper function to get company context from user profile
const getCompanyContext = (): string | null => {
  try {
    const profileCache = localStorage.getItem('user_profile_cache');
    if (profileCache) {
      const profile = JSON.parse(profileCache);
      const companySize = profile.company_size || profile.companySize;
      const industry = profile.industry;
      
      if (companySize && industry) {
        return `The company's size for implementing the project is ${companySize}, and it is a ${industry} company`;
      }
    }
  } catch (e) {
    console.error('Error getting company context:', e);
  }
  return null;
};

// Helper function to inject company context into objectives array
const injectCompanyContext = (objectives: string[] | undefined): string[] => {
  const baseObjectives = Array.isArray(objectives) && objectives.length > 0 
    ? objectives 
    : [];
  
  const companyContext = getCompanyContext();
  if (companyContext) {
    // Check if context already exists to avoid duplicates
    const alreadyHasContext = baseObjectives.some(obj => 
      obj.includes("The company's size for implementing the project")
    );
    if (!alreadyHasContext) {
      return [...baseObjectives, companyContext];
    }
  }
  return baseObjectives;
};

export default function UseCaseUploadPage() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [templateFiles, setTemplateFiles] = useState<TemplateFile[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  useEffect(() => {
    const fetchTemplateFiles = async () => {
      try {
        const token = localStorage.getItem('sinopia_token');
        const response = await fetch('/api/use-case/files', {
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setTemplateFiles(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to fetch template files:', err);
      } finally {
        setIsLoadingTemplates(false);
      }
    };

    fetchTemplateFiles();
  }, []);

  const handleTemplateSelect = async (fileName: string) => {
    const template = templateFiles.find(t => t.file_name === fileName);
    if (!template) return;

    setSelectedTemplate(fileName);
    setIsDownloadingTemplate(true);
    setError(null);

    try {
      const response = await fetch(template.file_url);
      if (!response.ok) {
        throw new Error('Failed to download template file');
      }

      const blob = await response.blob();
      const file = new File([blob], fileName + '.pdf', { type: 'application/pdf' });

      const uploadedFile: UploadedFile = {
        file,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };

      setUploadedFiles([uploadedFile]);

      toast({
        title: t('useCases.templateSelected'),
        description: t('useCases.templateSelectedDesc'),
      });
    } catch (err) {
      console.error('Template download error:', err);
      setError(err instanceof Error ? err.message : 'Failed to download template');
      setSelectedTemplate('');
    } finally {
      setIsDownloadingTemplate(false);
    }
  };

  const validateFile = (file: File): string | null => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(extension)) {
      return t('useCases.uploadError.invalidType');
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return t('useCases.uploadError.tooLarge');
    }
    
    return null;
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    
    setError(null);
    
    for (const file of Array.from(files)) {
      const validationError = validateFile(file);
      
      if (validationError) {
        setError(validationError);
        return;
      }
      
      const uploadedFile: UploadedFile = {
        file,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      
      setUploadedFiles(prev => [...prev, uploadedFile]);
      
      toast({
        title: t('useCases.uploadSuccess'),
        description: file.name,
      });
    }
  }, [t, toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  }, [handleFiles]);

  const removeFile = useCallback((id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return;

    // Step 1: Retrieve token explicitly
    const token = localStorage.getItem('sinopia_token');
    
    // Step 2: Validate token - redirect to login if missing
    if (!token) {
      toast({
        title: t('common.error'),
        description: t('auth.otp.pleaseLoginAgain'),
        variant: 'destructive',
      });
      setLocation('/login');
      return;
    }

    const selectedFile = uploadedFiles[0].file;
    setIsAnalyzing(true);
    setError(null);

    try {
      // Step 3: Construct FormData - DO NOT set Content-Type manually
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Step 4: Make request through backend proxy with explicit Authorization header
      const response = await fetch('/api/use-case/analysis-file', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: t('common.error'),
            description: t('auth.otp.pleaseLoginAgain'),
            variant: 'destructive',
          });
          setLocation('/login');
          return;
        }
        if (response.status === 404) {
          throw new Error(t('useCases.endpointNotFound'));
        }
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', response.status, errorData);
        throw new Error(errorData.message || errorData.detail || `${t('useCases.analysisError')} (${response.status})`);
      }

      const analysisData = await response.json();
      
      // Inject company context into objectives before caching
      if (analysisData.objectives) {
        analysisData.objectives = injectCompanyContext(analysisData.objectives);
      } else {
        analysisData.objectives = injectCompanyContext([]);
      }
      
      // Cache the analysis result for the create page
      localStorage.setItem(ANALYSIS_CACHE_KEY, JSON.stringify(analysisData));

      toast({
        title: t('useCases.analysisComplete'),
        description: t('useCases.analysisCompleteDesc'),
      });

      // Navigate to the create page
      setLocation('/projects/new');
    } catch (err) {
      console.error('File analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : t('useCases.analysisError');
      setError(errorMessage);
      toast({
        title: t('common.error'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
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
            <h1 className="text-2xl font-display font-bold">{t('useCases.uploadTitle')}</h1>
            <p className="text-muted-foreground">{t('useCases.uploadSubtitle')}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('useCases.selectFile')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Template File Selector */}
            <div className="space-y-2">
              <Label htmlFor="template-select">{t('useCases.selectTemplateLabel')}</Label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateSelect}
                disabled={isLoadingTemplates || isDownloadingTemplate}
              >
                <SelectTrigger id="template-select" data-testid="select-template">
                  {isDownloadingTemplate ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('useCases.downloadingTemplate')}
                    </span>
                  ) : isLoadingTemplates ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('useCases.loadingTemplates')}
                    </span>
                  ) : (
                    <SelectValue placeholder={t('useCases.selectTemplatePlaceholder')} />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {templateFiles.length === 0 ? (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      {t('useCases.noTemplatesAvailable')}
                    </div>
                  ) : (
                    templateFiles.map((template) => (
                      <SelectItem
                        key={template.file_name}
                        value={template.file_name}
                        data-testid={`template-option-${template.file_name}`}
                      >
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          {template.file_name}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t('useCases.orBrowse')}</span>
              </div>
            </div>

            {/* Drag and Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">{t('useCases.dragDropText')}</p>
              <p className="text-sm text-muted-foreground mb-4">{t('useCases.orBrowse')}</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileSelect}
                multiple
                data-testid="input-file-upload"
              />
              <label htmlFor="file-upload">
                <Button type="button" variant="outline" asChild>
                  <span data-testid="button-browse-files">{t('useCases.browseFiles')}</span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-4">
                {t('useCases.acceptedFormats')}
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium">{t('useCases.uploadedFiles')}</h3>
                {uploadedFiles.map((uploadedFile) => (
                  <div
                    key={uploadedFile.id}
                    className="flex items-center gap-3 p-3 border rounded-lg"
                    data-testid={`file-item-${uploadedFile.id}`}
                  >
                    <FileText className="w-8 h-8 text-primary shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{uploadedFile.file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(uploadedFile.file.size)}
                      </p>
                    </div>
                    <Check className="w-5 h-5 text-green-600 shrink-0" />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(uploadedFile.id)}
                      data-testid={`button-remove-file-${uploadedFile.id}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Link href="/dashboard">
                <Button type="button" variant="outline" data-testid="button-cancel">
                  {t('common.cancel')}
                </Button>
              </Link>
              <Button
                disabled={uploadedFiles.length === 0 || isAnalyzing}
                onClick={handleUpload}
                data-testid="button-submit-upload"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('useCases.analyzingFile')}
                  </>
                ) : (
                  t('useCases.submitUpload')
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
