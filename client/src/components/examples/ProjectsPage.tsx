import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { ProjectProvider } from '@/context/ProjectContext';
import ProjectsPage from '@/pages/projects/ProjectsPage';

export default function ProjectsPageExample() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ProjectProvider>
          <ProjectsPage />
        </ProjectProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
