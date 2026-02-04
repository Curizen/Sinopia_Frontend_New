import type { UserRole, ProjectStatus, OfferStatus, ContractStatus, InvoiceStatus, TaskStatus } from '@/lib/utils/constants';



export interface User {
  id: string;
  userId?: number;
  email: string;
  role: UserRole;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  cvUrl?: string;
  cvUploaded?: boolean;
  cvFileName?: string;
  cvFileSize?: number;
  city?: string;
  country?: string;
  companySize?: string;
  companyName?: string;
  industry?: string;
  contactEmail?: string;
  contactPhone?: string;
  bio?: string;
  companyOnboardingCompleted?: boolean;
}


export interface SkillGiverProfile {
  id: string;
  userId: string;
  bio: string;
  title: string;
  hourlyRate: number;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  portfolio: PortfolioProject[];
  location: string;
  availability: string;
}

export interface SkillSearcherProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  website: string;
  bio: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  city?: string;
  country?: string;
  companySize?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  budget: number;
  deadline: string;
  skills: string[];
  stages: Stage[];
  ownerId: string;
  assigneeId?: string;
}

export interface Stage {
  id: string;
  name: string;
  order: number;
  tasks: Task[];
  progress: number;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate?: string;
}

export interface Offer {
  id: string;
  projectId: string;
  projectTitle: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  status: OfferStatus;
  amount: number;
  message: string;
  createdAt: string;
}

export interface Contract {
  id: string;
  projectId: string;
  projectTitle: string;
  clientId: string;
  clientName: string;
  freelancerId: string;
  freelancerName: string;
  status: ContractStatus;
  amount: number;
  startDate: string;
  endDate: string;
}

export interface Invoice {
  id: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  paidDate?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  projectTitle: string;
  amount: number;
  date: string;
  method: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}
