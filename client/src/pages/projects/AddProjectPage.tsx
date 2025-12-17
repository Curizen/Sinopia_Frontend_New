import { useState } from 'react';
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
import { ArrowLeft } from 'lucide-react';

export default function AddProjectPage() {
  const { t } = useI18n();
  const { addProject } = useProjects();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    objective: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.objective.trim()) {
      toast({
        title: t('common.error'),
        description: t('useCases.allFieldsRequired'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);

    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 500));

    addProject({
      title: formData.title,
      description: `${formData.description}\n\n${t('useCases.objective')}: ${formData.objective}`,
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
    setIsLoading(false);
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
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  data-testid="input-usecase-description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">{t('useCases.objectiveLabel')}</Label>
                <Textarea
                  id="objective"
                  placeholder={t('useCases.objectivePlaceholder')}
                  rows={3}
                  value={formData.objective}
                  onChange={(e) => setFormData(prev => ({ ...prev, objective: e.target.value }))}
                  required
                  data-testid="input-usecase-objective"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Link href="/dashboard">
                  <Button type="button" variant="outline" data-testid="button-cancel">
                    {t('common.cancel')}
                  </Button>
                </Link>
                <Button type="submit" disabled={isLoading} data-testid="button-create-usecase">
                  {isLoading ? t('common.loading') : t('useCases.createButton')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
