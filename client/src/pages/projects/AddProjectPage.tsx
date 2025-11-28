import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useProjects } from '@/context/ProjectContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, X } from 'lucide-react';

export default function AddProjectPage() {
  const { addProject } = useProjects();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    skills: [] as string[],
  });

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 500));

    addProject({
      title: formData.title,
      description: formData.description,
      status: 'open',
      budget: parseFloat(formData.budget),
      deadline: formData.deadline,
      skills: formData.skills,
      stages: [],
      ownerId: '2',
    });

    toast({
      title: 'Project created!',
      description: 'Your project has been posted successfully.',
    });

    setLocation('/projects');
    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold">Create New Project</h1>
            <p className="text-muted-foreground">Post a new project to find talent</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., E-commerce Website Redesign"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  data-testid="input-project-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project requirements, goals, and expectations..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  data-testid="input-project-description"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (USD)</Label>
                  <Input
                    id="budget"
                    type="number"
                    min="0"
                    step="100"
                    placeholder="5000"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    required
                    data-testid="input-project-budget"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    required
                    data-testid="input-project-deadline"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    id="skills"
                    placeholder="Add a skill (e.g., React, Node.js)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    data-testid="input-project-skill"
                  />
                  <Button type="button" variant="outline" onClick={handleAddSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Link href="/projects">
                  <Button type="button" variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isLoading} data-testid="button-create-project">
                  {isLoading ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
