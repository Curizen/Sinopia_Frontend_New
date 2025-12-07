import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Project } from '@/types';

interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  selectProject: (id: string) => void;
  clearSelectedProject: () => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// todo: remove mock functionality
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    description: 'Complete redesign of our e-commerce platform with modern UI/UX and improved checkout flow.',
    status: 'in_progress',
    budget: 15000,
    deadline: '2025-02-15',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    ownerId: '2',
    assigneeId: '1',
    stages: [
      {
        id: 's1',
        name: 'Design Phase',
        order: 1,
        progress: 100,
        tasks: [
          { id: 't1', title: 'Wireframes', status: 'completed' },
          { id: 't2', title: 'UI Mockups', status: 'completed' },
        ],
      },
      {
        id: 's2',
        name: 'Development',
        order: 2,
        progress: 60,
        tasks: [
          { id: 't3', title: 'Frontend Setup', status: 'completed' },
          { id: 't4', title: 'Component Library', status: 'in_progress' },
          { id: 't5', title: 'API Integration', status: 'todo' },
        ],
      },
      {
        id: 's3',
        name: 'Testing & Launch',
        order: 3,
        progress: 0,
        tasks: [
          { id: 't6', title: 'QA Testing', status: 'todo' },
          { id: 't7', title: 'Deployment', status: 'todo' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms with real-time features.',
    status: 'open',
    budget: 25000,
    deadline: '2025-03-30',
    skills: ['React Native', 'TypeScript', 'Firebase', 'GraphQL'],
    ownerId: '2',
    stages: [],
  },
  {
    id: '3',
    title: 'Data Analytics Dashboard',
    description: 'Interactive dashboard for visualizing business metrics and KPIs.',
    status: 'completed',
    budget: 8000,
    deadline: '2024-12-01',
    skills: ['Python', 'D3.js', 'PostgreSQL', 'Docker'],
    ownerId: '2',
    assigneeId: '1',
    stages: [
      {
        id: 's4',
        name: 'Complete',
        order: 1,
        progress: 100,
        tasks: [
          { id: 't8', title: 'All tasks completed', status: 'completed' },
        ],
      },
    ],
  },
];

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading] = useState(false);

  const selectProject = useCallback((id: string) => {
    const project = projects.find(p => p.id === id) || null;
    setSelectedProject(project);
  }, [projects]);

  const clearSelectedProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects(prev => [...prev, newProject]);
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    if (selectedProject?.id === id) {
      setSelectedProject(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedProject]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        isLoading,
        selectProject,
        clearSelectedProject,
        addProject,
        updateProject,
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
