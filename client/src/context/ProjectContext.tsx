import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import type { Project } from '@/types';
import { useAuth } from './AuthContext';

interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  selectProject: (id: string) => void;
  clearSelectedProject: () => void;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  refetchProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchProjects();
    } else {
      setProjects([]);
    }
  }, [isAuthenticated, token, fetchProjects]);

  const selectProject = useCallback((id: string) => {
    const project = projects.find(p => p.id === id) || null;
    setSelectedProject(project);
  }, [projects]);

  const clearSelectedProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const addProject = useCallback(async (project: Omit<Project, 'id'>) => {
    if (!token) return;
    
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to create project' }));
      throw new Error(errorData.error || 'Failed to create project');
    }
    
    const newProject = await response.json();
    setProjects(prev => [...prev, newProject]);
  }, [token]);

  const updateProject = useCallback(async (id: string, updates: Partial<Project>) => {
    if (!token) return;
    
    const response = await fetch(`/api/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to update project' }));
      throw new Error(errorData.error || 'Failed to update project');
    }
    
    const updatedProject = await response.json();
    setProjects(prev =>
      prev.map(p => (p.id === id ? updatedProject : p))
    );
    if (selectedProject?.id === id) {
      setSelectedProject(updatedProject);
    }
  }, [token, selectedProject]);

  const refetchProjects = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        isLoading,
        error,
        selectProject,
        clearSelectedProject,
        addProject,
        updateProject,
        refetchProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
