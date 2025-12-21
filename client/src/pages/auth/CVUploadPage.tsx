import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { usePendingRegistration } from '@/context/PendingRegistrationContext';
import { useI18n } from '@/i18n';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, FileText, X } from 'lucide-react';
import { USER_ROLES } from '@/lib/utils/constants';

export default function CVUploadPage() {
  const { register } = useAuth();
  const { pendingData, clearPendingData, setCvFile } = usePendingRegistration();
  const { toast } = useToast();
  const { t } = useI18n();
  const [, setLocation] = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!pendingData) {
      setLocation('/sign-up');
      return;
    }
    
    if (pendingData.role !== USER_ROLES.SKILL_GIVER) {
      setLocation('/sign-up');
      return;
    }
    
    if (!pendingData.otpVerified) {
      setLocation('/verify-otp');
      return;
    }
  }, [pendingData, setLocation]);

  const handleFileSelect = (file: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: t('auth.cvUpload.invalidFileType'),
        description: t('auth.cvUpload.invalidFileTypeDesc'),
        variant: 'destructive',
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t('auth.cvUpload.fileTooLarge'),
        description: t('auth.cvUpload.fileTooLargeDesc'),
        variant: 'destructive',
      });
      return;
    }
    
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !pendingData) return;

    setIsLoading(true);

    try {
      setCvFile(selectedFile);
      await register(pendingData.email, pendingData.password, pendingData.role, selectedFile);
      
      clearPendingData();
      
      toast({
        title: t('auth.otp.accountCreated'),
        description: t('auth.otp.accountCreatedDesc'),
      });
      
      setLocation('/dashboard');
    } catch (error) {
      console.error(error);
      toast({
        title: t('auth.otp.registrationFailed'),
        description: t('auth.otp.somethingWentWrong'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!pendingData || pendingData.role !== USER_ROLES.SKILL_GIVER || !pendingData.otpVerified) {
    return (
      <PublicLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="font-display text-2xl">{t('auth.cvUpload.title')}</CardTitle>
            <CardDescription>
              {t('auth.cvUpload.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging 
                    ? 'border-primary bg-primary/5' 
                    : selectedFile 
                      ? 'border-green-500 bg-green-500/5' 
                      : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleInputChange}
                  className="hidden"
                  id="cv-upload"
                  data-testid="input-cv-file"
                />
                
                {selectedFile ? (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground" data-testid="text-cv-filename">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveFile}
                      data-testid="button-remove-cv"
                    >
                      <X className="w-4 h-4 mr-2" />
                      {t('auth.cvUpload.remove')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t('auth.cvUpload.dropHere')}</p>
                      <p className="text-sm text-muted-foreground">{t('auth.cvUpload.orClickBrowse')}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      data-testid="button-browse-cv"
                    >
                      {t('auth.cvUpload.browseFiles')}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t('auth.cvUpload.fileFormat')}
                    </p>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !selectedFile}
                data-testid="button-cv-upload-submit"
              >
                {isLoading ? t('auth.cvUpload.creatingAccount') : t('auth.cvUpload.completeRegistration')}
              </Button>
            </form>

            <div className="mt-4">
              <Link
                href="/verify-otp"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('auth.cvUpload.back')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PublicLayout>
  );
}
