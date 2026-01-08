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
import { ArrowLeft, Plus, X } from 'lucide-react';

export default function AddProjectPage() {
  const { t } = useI18n();
  const { addProject } = useProjects();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState<string[]>(['']);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      return;
    }

    if (filteredObjectives.length === 0) {
      toast({
        title: t('common.error'),
        description: t('useCases.atLeastOneObjective'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);

    const payload = {
      use_case: {
        title: trimmedTitle,
        description: trimmedDescription,
        objectives: filteredObjectives,
      }
    };

    console.log('Submitting payload:', JSON.stringify(payload, null, 2));

    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 500));

    addProject({
      title: trimmedTitle,
      description: `${trimmedDescription}\n\n${t('useCases.objective')}: ${filteredObjectives.join(', ')}`,
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
