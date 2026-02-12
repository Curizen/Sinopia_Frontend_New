import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
import { getInitials } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Mail,
  Phone,
  Globe,
  Plus,
  Edit2,
  Save,
  X,
  Building2,
  Linkedin,
  Code,
  FolderKanban,
  Trash2,
  Upload,
  FileText,
  Sparkles,
  CheckCircle,
  Brain,
} from 'lucide-react';

type EditingSection = 'about' | 'skills' | 'experience' | 'education' | 'certifications' | 'company' | 'contact' | 'projects' | null;
type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
type SkillType = 'technical' | 'soft';

interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  skill_type: SkillType;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  details: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
  gpa: string;
}

interface Certification {
  id: string;
  name: string;
  authority: string;
  date: string;
}

interface PersonalProject {
  id: string;
  name: string;
  description: string;
  technologies: string;
  duration: string;
  projectUrl: string;
}

interface Language {
  id: number;
  language: string;
  level: string;
}

interface SkillGiverProfile {
  bio: string;
  jobTitle: string;
  address: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  availability: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  personalProjects: PersonalProject[];
}

interface SkillSearcherProfile {
  companyName: string;
  industry: string;
  website: string;
  bio: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  city: string;
  country: string;
  companySize: string;
  street: string;
  zipCode: string;
  state: string;
}

const STORAGE_KEY = 'sinopia_skill_giver_profile';
const SEARCHER_STORAGE_KEY = 'sinopia_skill_searcher_profile';
const USER_PROFILE_CACHE_KEY = 'user_profile_cache';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);
const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Interface for API userData response
interface ApiUserData {
  id?: string;
  user_id?: number;
  full_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
  linkedin?: string;
  summary?: string;
  bio?: string; // skill_searcher uses 'bio' instead of 'summary'
  company_name?: string;
  industry?: string;
  website?: string;
  company_size?: string;
  skills?: Array<{
    id?: number;
    skill_name?: string;
    level?: string;
    skill_type?: string;
  }>;
  experience?: Array<{
    id?: number;
    title?: string;
    company?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
  }>;
  education?: Array<{
    id?: number;
    degree?: string;
    institution?: string;
    graduation_year?: string;
    field_of_study?: string;
  }>;
  certificates?: Array<{
    id?: number;
    name?: string;
    authority?: string;
    date?: string;
  }>;
  projects?: Array<{
    id?: number;
    project_name?: string;
    technologies?: string;
    project_url?: string;
    description?: string;
  }>;
}

// Interface for cached user profile data used in sidebar
interface CachedUserProfile {
  fullName: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

// Helper to normalize skill_type from backend format (technical_skills/soft_skills) to frontend format (technical/soft)
const normalizeSkillType = (skillType: string | undefined): SkillType => {
  if (skillType === 'soft_skills' || skillType === 'soft') {
    return 'soft';
  }
  return 'technical'; // Default to technical for technical_skills or any other value
};

// Helper to format LinkedIn URL
const formatLinkedInUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  let cleaned = url.trim();
  if (!cleaned) return '';
  if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
    cleaned = 'https://' + cleaned;
  }
  return cleaned;
};

// Helper to get initials from full name
const getInitialsFromFullName = (fullName: string | undefined | null): string => {
  if (!fullName || !fullName.trim()) return '?';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Transform API userData to local SkillGiverProfile format
const transformApiDataToGiverProfile = (apiData: ApiUserData): Partial<SkillGiverProfile> => {
  const profile: Partial<SkillGiverProfile> = {};
  
  // skill_giver uses 'summary', skill_searcher uses 'bio'
  if (apiData.summary || apiData.bio) {
    profile.bio = apiData.summary || apiData.bio;
  }
  
  if (apiData.email) {
    profile.email = apiData.email;
  }
  
  if (apiData.phone) {
    profile.phone = apiData.phone;
  }
  
  if (apiData.city || apiData.country) {
    profile.address = [apiData.city, apiData.country].filter(Boolean).join(', ');
  }
  
  if (Array.isArray(apiData.skills)) {
    profile.skills = apiData.skills.map(s => {
      // Map backend skill_type to frontend format
      // Backend sends "technical_skills" or "soft_skills", frontend expects "technical" or "soft"
      let skillType: SkillType = 'technical';
      if (s.skill_type) {
        const st = s.skill_type.toLowerCase();
        if (st.includes('soft')) {
          skillType = 'soft';
        } else {
          skillType = 'technical';
        }
      }
      
      // Map backend level to frontend format (capitalize first letter)
      // Backend sends "advanced", "intermediate", "beginner", "expert" (lowercase)
      // Frontend expects "Advanced", "Intermediate", "Beginner", "Expert" (capitalized)
      let level: SkillLevel = 'Intermediate';
      if (s.level) {
        const lvl = s.level.toLowerCase();
        if (lvl === 'beginner') level = 'Beginner';
        else if (lvl === 'intermediate') level = 'Intermediate';
        else if (lvl === 'advanced') level = 'Advanced';
        else if (lvl === 'expert') level = 'Expert';
      }
      
      return {
        id: s.id?.toString() || generateId(),
        name: s.skill_name || '',
        level,
        skill_type: skillType,
      };
    }).filter(s => s.name);
  }
  
  if (Array.isArray(apiData.experience)) {
    profile.experience = apiData.experience.map(e => ({
      id: e.id?.toString() || generateId(),
      title: e.title || '',
      company: e.company || '',
      startDate: e.start_date ? e.start_date.substring(0, 7) : '',
      endDate: e.end_date ? e.end_date.substring(0, 7) : '',
      current: !e.end_date,
      details: e.description || '',
    }));
  }
  
  if (Array.isArray(apiData.education)) {
    profile.education = apiData.education.map(e => ({
      id: e.id?.toString() || generateId(),
      degree: e.degree || '',
      institution: e.institution || '',
      graduationYear: e.graduation_year || '',
      gpa: '',
    }));
  }
  
  if (Array.isArray(apiData.certificates)) {
    profile.certifications = apiData.certificates.map(c => ({
      id: c.id?.toString() || generateId(),
      name: c.name || '',
      authority: c.authority || '',
      date: c.date ? c.date.substring(0, 7) : '',
    }));
  }
  
  if (Array.isArray(apiData.projects)) {
    profile.personalProjects = apiData.projects.map((p: { id?: number; project_name?: string; name?: string; technologies?: string; project_url?: string; description?: string; duration?: string }) => ({
      id: p.id?.toString() || generateId(),
      name: p.project_name || p.name || '',
      description: p.description || '',
      technologies: p.technologies || '',
      duration: p.duration || '',
      projectUrl: p.project_url || '',
    }));
  }
  
  return profile;
};

const isValidUrl = (url: string): boolean => {
  if (!url.trim()) return true;
  try {
    const urlToTest = url.startsWith('http') ? url : `https://${url}`;
    new URL(urlToTest);
    return true;
  } catch {
    return false;
  }
};

const normalizeUrl = (url: string): string => {
  if (!url.trim()) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
};

const createEmptySkillGiverProfile = (): SkillGiverProfile => ({
  bio: '',
  jobTitle: '',
  address: '',
  email: '',
  phone: '',
  linkedinUrl: '',
  availability: '',
  skills: [],
  experience: [],
  education: [],
  certifications: [],
  personalProjects: [],
});

const loadGiverProfileFromStorage = (): SkillGiverProfile => {
  const defaults = createEmptySkillGiverProfile();
  
  try {
    // First, check for API user_profile_cache (from login response)
    const apiCache = localStorage.getItem(USER_PROFILE_CACHE_KEY);
    if (apiCache) {
      console.log('[DEBUG] Loading profile from user_profile_cache');
      const apiData: ApiUserData = JSON.parse(apiCache);
      console.log('[DEBUG] Raw API cache data:', JSON.stringify(apiData, null, 2));
      const transformedData = transformApiDataToGiverProfile(apiData);
      console.log('[DEBUG] Transformed profile data:', JSON.stringify(transformedData, null, 2));
      
      // Also check for local profile to merge any additional data
      const stored = localStorage.getItem(STORAGE_KEY);
      const localData = stored ? JSON.parse(stored) : {};
      
      // Merge: API data takes priority, but keep local fields that API doesn't have
      return {
        bio: transformedData.bio ?? localData.bio ?? defaults.bio,
        jobTitle: localData.jobTitle ?? localData.title ?? defaults.jobTitle,
        address: transformedData.address ?? localData.address ?? localData.location ?? defaults.address,
        email: transformedData.email ?? localData.email ?? defaults.email,
        phone: transformedData.phone ?? localData.phone ?? defaults.phone,
        linkedinUrl: localData.linkedinUrl ?? defaults.linkedinUrl,
        availability: localData.availability ?? defaults.availability,
        skills: transformedData.skills && transformedData.skills.length > 0 
          ? transformedData.skills 
          : (Array.isArray(localData.skills) ? localData.skills.map((s: { id?: string; name?: string; level?: SkillLevel; skill_type?: string }) => ({
              id: s.id || generateId(),
              name: s.name || '',
              level: s.level || 'Intermediate',
              skill_type: normalizeSkillType(s.skill_type),
            })).filter((s: Skill) => s.name) : defaults.skills),
        experience: transformedData.experience && transformedData.experience.length > 0 
          ? transformedData.experience 
          : (Array.isArray(localData.experience) ? localData.experience : defaults.experience),
        education: transformedData.education && transformedData.education.length > 0 
          ? transformedData.education 
          : (Array.isArray(localData.education) ? localData.education : defaults.education),
        certifications: transformedData.certifications && transformedData.certifications.length > 0 
          ? transformedData.certifications 
          : (Array.isArray(localData.certifications) ? localData.certifications : defaults.certifications),
        personalProjects: transformedData.personalProjects && transformedData.personalProjects.length > 0 
          ? transformedData.personalProjects 
          : (Array.isArray(localData.personalProjects) ? localData.personalProjects : defaults.personalProjects),
      };
    }
    
    // Fallback: load from local storage only
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      console.log('Loading profile from sinopia_skill_giver_profile');
      const parsed = JSON.parse(stored);
      return {
        bio: parsed.bio ?? defaults.bio,
        jobTitle: parsed.jobTitle ?? parsed.title ?? defaults.jobTitle,
        address: parsed.address ?? parsed.location ?? defaults.address,
        email: parsed.email ?? defaults.email,
        phone: parsed.phone ?? defaults.phone,
        linkedinUrl: parsed.linkedinUrl ?? defaults.linkedinUrl,
        availability: parsed.availability ?? defaults.availability,
        skills: Array.isArray(parsed.skills) ? parsed.skills.map((s: { id?: string; name?: string; level?: SkillLevel; skill_type?: string }) => ({
          id: s.id || generateId(),
          name: s.name || '',
          level: s.level || 'Intermediate',
          skill_type: normalizeSkillType(s.skill_type),
        })).filter((s: Skill) => s.name) : defaults.skills,
        experience: Array.isArray(parsed.experience) ? parsed.experience : defaults.experience,
        education: Array.isArray(parsed.education) ? parsed.education : defaults.education,
        certifications: Array.isArray(parsed.certifications) ? parsed.certifications : defaults.certifications,
        personalProjects: Array.isArray(parsed.personalProjects) ? parsed.personalProjects : defaults.personalProjects,
      };
    }
  } catch (e) {
    console.error('Failed to load profile from localStorage:', e);
  }
  return defaults;
};

export default function ProfilePage() {
  const { user, updateCvStatus } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [editingSection, setEditingSection] = useState<EditingSection>(null);

  const isSkillGiver = user?.role === 'skill_giver';

  const createEmptySearcherProfile = (): SkillSearcherProfile => ({
    companyName: user?.companyName || '',
    industry: user?.industry || '',
    website: '',
    bio: user?.bio || '',
    contactEmail: user?.contactEmail || '',
    contactPhone: user?.contactPhone || '',
    location: '',
    city: user?.city || '',
    country: user?.country || '',
    companySize: user?.companySize || '',
    street: '',
    zipCode: '',
    state: '',
  });

  const loadSearcherProfileFromStorage = (): SkillSearcherProfile => {
    const defaults = createEmptySearcherProfile();
    try {
      // First check API cache (user_profile_cache) which has data from login
      const apiCache = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (apiCache) {
        const apiData = JSON.parse(apiCache);
        console.log('[DEBUG] Loading searcher profile from API cache:', apiData);
        // Map API field names to local profile fields
        return {
          companyName: apiData.company_name ?? defaults.companyName,
          industry: apiData.industry ?? defaults.industry,
          website: apiData.website ?? defaults.website,
          bio: apiData.bio ?? defaults.bio,
          contactEmail: apiData.email ?? defaults.contactEmail,
          contactPhone: apiData.phone ?? defaults.contactPhone,
          location: apiData.city && apiData.country ? `${apiData.city}, ${apiData.country}` : defaults.location,
          city: apiData.city ?? defaults.city,
          country: apiData.country ?? defaults.country,
          companySize: apiData.company_size ?? defaults.companySize,
          street: defaults.street,
          zipCode: defaults.zipCode,
          state: defaults.state,
        };
      }
      
      // Fallback to local storage
      const stored = localStorage.getItem(SEARCHER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          companyName: parsed.companyName ?? defaults.companyName,
          industry: parsed.industry ?? defaults.industry,
          website: parsed.website ?? defaults.website,
          bio: parsed.bio ?? defaults.bio,
          contactEmail: parsed.contactEmail ?? defaults.contactEmail,
          contactPhone: parsed.contactPhone ?? defaults.contactPhone,
          location: parsed.location ?? defaults.location,
          city: parsed.city ?? defaults.city,
          country: parsed.country ?? defaults.country,
          companySize: parsed.companySize ?? defaults.companySize,
          street: parsed.street ?? defaults.street,
          zipCode: parsed.zipCode ?? defaults.zipCode,
          state: parsed.state ?? defaults.state,
        };
      }
    } catch (e) {
      console.error('Failed to load searcher profile from localStorage:', e);
    }
    return defaults;
  };

  const [giverProfile, setGiverProfile] = useState<SkillGiverProfile>(loadGiverProfileFromStorage);
  const [searcherProfile, setSearcherProfile] = useState<SkillSearcherProfile>(() => loadSearcherProfileFromStorage());
  const [editBuffer, setEditBuffer] = useState<SkillGiverProfile | SkillSearcherProfile | null>(null);

  const [skillDialog, setSkillDialog] = useState<{ open: boolean; skill: Skill | null }>({ open: false, skill: null });
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [expDialog, setExpDialog] = useState<{ open: boolean; exp: Experience | null }>({ open: false, exp: null });
  const [eduDialog, setEduDialog] = useState<{ open: boolean; edu: Education | null }>({ open: false, edu: null });
  const [certDialog, setCertDialog] = useState<{ open: boolean; cert: Certification | null }>({ open: false, cert: null });
  const [projDialog, setProjDialog] = useState<{ open: boolean; proj: PersonalProject | null }>({ open: false, proj: null });
  const [langDialog, setLangDialog] = useState<{ open: boolean; lang: Language | null }>({ open: false, lang: null });
  const [languages, setLanguages] = useState<Language[]>([]);
  const [langForm, setLangForm] = useState<{ language: string; level: string }>({ language: '', level: '' });
  const [langSaving, setLangSaving] = useState(false);
  const [contactDialog, setContactDialog] = useState(false);
  const [companySummaryDialog, setCompanySummaryDialog] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(user?.cvUploaded || false);
  const [cvFileName, setCvFileName] = useState<string | null>(user?.cvFileName || null);
  const [cvFileSize, setCvFileSize] = useState<number | null>(user?.cvFileSize || null);
  const [isDragOver, setIsDragOver] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const [contactForm, setContactForm] = useState<{
    full_name: string;
    linkedin: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    summary: string;
  }>({ 
    full_name: '',
    linkedin: '',
    email: '', 
    phone: '',
    country: '',
    city: '',
    summary: '',
  });
  const [contactSaving, setContactSaving] = useState(false);

  const [companySummaryForm, setCompanySummaryForm] = useState({
    companyName: '',
    website: '',
    city: '',
    country: '',
    companySize: '',
    contactEmail: '',
    contactPhone: '',
    industry: '',
    bio: '',
    street: '',
    zipCode: '',
    state: '',
  });

  // State for cached user profile from API (for sidebar and bio)
  const [cachedUserProfile, setCachedUserProfile] = useState<CachedUserProfile>({
    fullName: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: '',
  });

  // Load cached user profile from localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        console.log('[DEBUG] Loading user profile for sidebar from cache:', parsed);
        setCachedUserProfile({
          fullName: parsed.full_name || '',
          city: parsed.city || '',
          country: parsed.country || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          linkedin: parsed.linkedin || '',
          summary: parsed.summary || '',
        });
      }
    } catch (e) {
      console.error('Failed to load cached user profile:', e);
    }
  }, []);

  // Fetch skills from backend API on mount
  useEffect(() => {
    const fetchSkillsFromBackend = async () => {
      try {
        const token = localStorage.getItem('sinopia_token');
        if (!token) {
          console.log('[DEBUG] No token, skipping skills fetch');
          return;
        }

        console.log('[DEBUG] Fetching skills from backend API...');
        const response = await fetch('/api/skills', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('[DEBUG] Skills fetched from backend:', data);

          // Handle both array response and object with skills property
          const skillsArray = Array.isArray(data) ? data : (data.skills || []);

          if (skillsArray.length > 0) {
            const transformedSkills: Skill[] = skillsArray.map((s: any) => {
              // Map backend skill_type to frontend format
              let skillType: SkillType = 'technical';
              if (s.skill_type) {
                const st = s.skill_type.toLowerCase();
                if (st.includes('soft')) {
                  skillType = 'soft';
                }
              }
              
              // Map backend level to frontend format (capitalize first letter)
              let level: SkillLevel = 'Intermediate';
              if (s.level) {
                const lvl = s.level.toLowerCase();
                if (lvl === 'beginner') level = 'Beginner';
                else if (lvl === 'intermediate') level = 'Intermediate';
                else if (lvl === 'advanced') level = 'Advanced';
                else if (lvl === 'expert') level = 'Expert';
              }
              
              return {
                id: s.id?.toString() || generateId(),
                name: s.skill_name || s.name || '',
                level,
                skill_type: skillType,
              };
            }).filter((s: Skill) => s.name);

            console.log('[DEBUG] Transformed skills:', transformedSkills);

            // Update giverProfile with fetched skills
            setGiverProfile(prev => ({
              ...prev,
              skills: transformedSkills,
            }));

            // Also update localStorage cache
            const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
            if (cacheStr) {
              const cache = JSON.parse(cacheStr);
              cache.skills = skillsArray;
              localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
            }
          }
        } else {
          console.log('[DEBUG] Failed to fetch skills, status:', response.status);
        }
      } catch (error) {
        console.error('[DEBUG] Error fetching skills:', error);
      }
    };

    if (isSkillGiver) {
      fetchSkillsFromBackend();
    }
  }, [isSkillGiver]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const token = localStorage.getItem('sinopia_token');
        if (!token) return;
        const response = await fetch('/api/languages/by-user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          const langsArray = data?.data || (Array.isArray(data) ? data : []);
          setLanguages(langsArray);
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    if (isSkillGiver) {
      fetchLanguages();
    }
  }, [isSkillGiver]);

  useEffect(() => {
    if (isSkillGiver) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(giverProfile));
    }
  }, [giverProfile, isSkillGiver]);

  useEffect(() => {
    if (!isSkillGiver) {
      localStorage.setItem(SEARCHER_STORAGE_KEY, JSON.stringify(searcherProfile));
    }
  }, [searcherProfile, isSkillGiver]);

  const profile = isSkillGiver ? giverProfile : searcherProfile;
  const setProfile = isSkillGiver
    ? (p: SkillGiverProfile | SkillSearcherProfile) => setGiverProfile(p as SkillGiverProfile)
    : (p: SkillGiverProfile | SkillSearcherProfile) => setSearcherProfile(p as SkillSearcherProfile);

  const startEditing = (section: EditingSection) => {
    setEditBuffer({ ...profile });
    setEditingSection(section);
  };

  const handleSave = (section: EditingSection) => {
    if (editBuffer) {
      setProfile(editBuffer);
    }
    toast({
      title: t('profile.profileUpdated'),
      description: t('profile.changesSaved'),
    });
    setEditingSection(null);
    setEditBuffer(null);
  };

  const handleCancel = () => {
    setEditingSection(null);
    setEditBuffer(null);
  };

  const SectionEditButton = ({ section }: { section: EditingSection }) => (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => startEditing(section)}
      data-testid={`button-edit-${section}`}
    >
      <Edit2 className="w-4 h-4" />
    </Button>
  );

  const SectionActions = ({ section }: { section: EditingSection }) => (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onClick={handleCancel} data-testid={`button-cancel-${section}`}>
        <X className="w-4 h-4 mr-1" />
        {t('common.cancel')}
      </Button>
      <Button 
        size="sm" 
        onClick={() => section === 'about' ? handleSaveBio() : handleSave(section)} 
        data-testid={`button-save-${section}`}
      >
        <Save className="w-4 h-4 mr-1" />
        {t('common.save')}
      </Button>
    </div>
  );

  const currentData = editBuffer || profile;

  const displayValue = (value: string | undefined) => {
    return value?.trim() ? value : '';
  };

  const getLevelLabel = (level: SkillLevel) => {
    const labels: Record<SkillLevel, string> = {
      Beginner: t('profile.levelBeginner'),
      Intermediate: t('profile.levelIntermediate'),
      Advanced: t('profile.levelAdvanced'),
      Expert: t('profile.levelExpert'),
    };
    return labels[level];
  };

  const getSkillTypeLabel = (skillType: SkillType) => {
    const labels: Record<SkillType, string> = {
      technical: t('profile.skillTypeTechnical'),
      soft: t('profile.skillTypeSoft'),
    };
    return labels[skillType];
  };

  // Skills localStorage cache helpers
  const updateSkillLocalStorageCache = (updatedSkill: Skill, isNew: boolean = false) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        const apiSkill = {
          id: parseInt(updatedSkill.id) || updatedSkill.id,
          user_id: cache.skills?.[0]?.user_id || null,
          skill_name: updatedSkill.name,
          skill_type: updatedSkill.skill_type,
          level: updatedSkill.level,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        if (isNew) {
          cache.skills = [...(cache.skills || []), apiSkill];
        } else {
          cache.skills = (cache.skills || []).map((s: { id: number | string }) => 
            s.id.toString() === updatedSkill.id ? apiSkill : s
          );
        }
        
        localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
        console.log('[DEBUG] Updated user_profile_cache with skill:', apiSkill);
      }
    } catch (error) {
      console.error('Failed to update skill localStorage cache:', error);
    }
  };

  const removeSkillFromLocalStorageCache = (skillId: string) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        if (cache && cache.skills) {
          cache.skills = cache.skills.filter((s: { id: number | string }) => 
            s.id.toString() !== skillId
          );
          localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
          console.log('[DEBUG] Removed skill from user_profile_cache, id:', skillId);
        }
      }
    } catch (error) {
      console.error('Failed to remove skill from localStorage cache:', error);
    }
  };

  const handleSaveSkill = async (skill: Skill) => {
    const token = localStorage.getItem('sinopia_token');
    console.log('[DEBUG] Skill - Sending token:', token);
    console.log('[DEBUG] Skill ID:', skill.id);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
      if (skill.id) {
        // UPDATE - PUT request
        console.log('[DEBUG] PUT Skill Request body:', { 
          skill_name: skill.name, 
          skill_type: skill.skill_type, 
          level: skill.level 
        });
        
        const response = await fetch(`/api/skills/${skill.id}`, {
          method: 'PUT',
          headers,
          credentials: 'include',
          body: JSON.stringify({
            skill_name: skill.name,
            skill_type: skill.skill_type,
            level: skill.level.toLowerCase(),
          }),
        });
        
        const data = await response.json();
        console.log('[DEBUG] PUT Skill Response:', data);
        
        if (response.ok) {
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            skills: prev.skills.map(s => s.id === skill.id ? skill : s),
          }));
          
          // 2. Update localStorage cache
          updateSkillLocalStorageCache(skill, false);
          
          setSkillDialog({ open: false, skill: null });
          toast({ title: t('profile.skillUpdated'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      } else {
        // CREATE - POST request
        console.log('[DEBUG] POST Skill - Sending token:', token);
        console.log('[DEBUG] POST Skill - Request body:', { 
          skill_name: skill.name, 
          skill_type: skill.skill_type, 
          level: skill.level 
        });
        
        const response = await fetch('/api/skills', {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({
            skill_name: skill.name,
            skill_type: skill.skill_type,
            level: skill.level.toLowerCase(),
          }),
        });
        
        const data = await response.json();
        console.log('[DEBUG] POST Skill Response:', data);
        
        if (response.ok) {
          // API returns object directly (NOT wrapped in data property)
          const newSkillId = data.id?.toString() || generateId();
          const newSkill = { ...skill, id: newSkillId };
          
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            skills: [...prev.skills, newSkill],
          }));
          
          // 2. Update localStorage cache
          updateSkillLocalStorageCache(newSkill, true);
          
          setSkillDialog({ open: false, skill: null });
          toast({ title: t('profile.skillAdded'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.error('[DEBUG] Failed to save skill:', error);
      toast({ 
        title: t('common.error'),
        description: t('profile.saveFailed'),
        variant: 'destructive',
      });
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!window.confirm(t('profile.confirmDeleteSkill'))) {
      return;
    }
    
    const token = localStorage.getItem('sinopia_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    try {
      console.log('[DEBUG] DELETE Request for skill id:', id);
      
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });
      
      console.log('[DEBUG] DELETE Skill Response status:', response.status);
      
      if (response.ok || response.status === 204) {
        // 1. Update UI state
        setGiverProfile(prev => ({
          ...prev,
          skills: prev.skills.filter(s => s.id !== id),
        }));
        
        // 2. Update localStorage cache
        removeSkillFromLocalStorageCache(id);
        
        toast({ title: t('profile.skillDeleted'), description: t('profile.changesSaved') });
      } else {
        const data = await response.json();
        toast({ 
          title: t('common.error'), 
          description: data.message || t('profile.deleteFailed'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[DEBUG] Failed to delete skill:', error);
      toast({ 
        title: t('common.error'),
        description: t('profile.deleteFailed'),
        variant: 'destructive',
      });
    }
  };

  const handleBulkDeleteSkills = async () => {
    if (selectedSkillIds.length === 0) return;

    setIsBulkDeleting(true);
    const token = localStorage.getItem('sinopia_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const results = await Promise.all(
        selectedSkillIds.map(id =>
          fetch(`/api/skills/${id}`, {
            method: 'DELETE',
            headers,
            credentials: 'include',
          }).then(res => ({ id, ok: res.ok || res.status === 204 }))
            .catch(() => ({ id, ok: false }))
        )
      );

      const deletedIds = results.filter(r => r.ok).map(r => r.id);
      const failedCount = results.filter(r => !r.ok).length;

      if (deletedIds.length > 0) {
        setGiverProfile(prev => ({
          ...prev,
          skills: prev.skills.filter(s => !deletedIds.includes(s.id)),
        }));

        deletedIds.forEach(id => removeSkillFromLocalStorageCache(id));
      }

      setSelectedSkillIds([]);

      if (failedCount > 0) {
        toast({
          title: t('common.error'),
          description: `${deletedIds.length} ${t('profile.skillsDeletedCount')}, ${failedCount} ${t('profile.skillsDeleteFailed')}`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('profile.skillsDeletedSuccess'),
          description: `${deletedIds.length} ${t('profile.skillsDeletedCount')}`,
        });
      }
    } catch (error) {
      console.error('[DEBUG] Bulk delete failed:', error);
      toast({
        title: t('common.error'),
        description: t('profile.deleteFailed'),
        variant: 'destructive',
      });
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const updateExperienceLocalStorageCache = (updatedExp: Experience, isNew: boolean = false) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        const apiExp = {
          id: parseInt(updatedExp.id) || updatedExp.id,
          user_id: cache.experience?.[0]?.user_id || null,
          title: updatedExp.title,
          company: updatedExp.company,
          start_date: updatedExp.startDate,
          end_date: updatedExp.endDate || null,
          experience_details: updatedExp.details,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        if (isNew) {
          cache.experience = [...(cache.experience || []), apiExp];
        } else {
          cache.experience = (cache.experience || []).map((e: { id: number | string }) => 
            e.id.toString() === updatedExp.id ? apiExp : e
          );
        }
        
        localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
        console.log('[DEBUG] Updated user_profile_cache with experience:', apiExp);
      }
    } catch (error) {
      console.error('Failed to update experience localStorage cache:', error);
    }
  };

  const removeExperienceFromLocalStorageCache = (expId: string) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        if (cache && cache.experience) {
          cache.experience = cache.experience.filter((e: { id: number | string }) => 
            e.id.toString() !== expId
          );
          localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
          console.log('[DEBUG] Removed experience from user_profile_cache, id:', expId);
        }
      }
    } catch (error) {
      console.error('Failed to remove experience from localStorage cache:', error);
    }
  };

  const handleSaveExperience = async (exp: Experience) => {
    const token = localStorage.getItem('sinopia_token');
    console.log('[DEBUG] Experience - Sending token:', token);
    console.log('[DEBUG] Experience ID:', exp.id);
    
    if (exp.id) {
      // Update existing experience via API
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const formatDateForAPI = (date: string) => {
          if (!date) return null;
          return date.length === 7 ? `${date}-01` : date;
        };
        
        const requestBody = {
          title: exp.title,
          company: exp.company,
          start_date: formatDateForAPI(exp.startDate),
          end_date: formatDateForAPI(exp.endDate) || formatDateForAPI(exp.startDate),
          experience_details: exp.details || '',
        };
        
        console.log('[DEBUG] PUT Experience Request body:', requestBody);
        
        const response = await fetch(`/api/experience/${exp.id}`, {
          method: 'PUT',
          headers,
          credentials: 'include',
          body: JSON.stringify(requestBody),
        });
        
        const data = await response.json();
        console.log('[DEBUG] PUT Experience Response:', data);
        
        if (response.ok) {
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            experience: prev.experience.map(e => e.id === exp.id ? exp : e),
          }));
          
          // 2. Update localStorage cache
          updateExperienceLocalStorageCache(exp, false);
          
          setExpDialog({ open: false, exp: null });
          toast({ title: t('profile.experienceUpdated') || t('profile.profileUpdated'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('[DEBUG] Failed to update experience:', error);
        toast({ 
          title: t('common.error'), 
          description: t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    } else {
      // Add new experience via API
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const formatDateForAPI = (date: string) => {
          if (!date) return null;
          return date.length === 7 ? `${date}-01` : date;
        };
        
        const requestBody = {
          title: exp.title,
          company: exp.company,
          start_date: formatDateForAPI(exp.startDate),
          end_date: formatDateForAPI(exp.endDate) || formatDateForAPI(exp.startDate),
          experience_details: exp.details || '',
        };
        
        console.log('[DEBUG] POST Experience Request body:', requestBody);
        
        const response = await fetch('/api/experience', {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify(requestBody),
        });
        
        const data = await response.json();
        console.log('[DEBUG] POST Experience Response:', data);
        
        if (response.ok) {
          // Use the ID from the server response if available
          const newExpId = data.data?.id?.toString() || data.id?.toString() || generateId();
          const newExp = { ...exp, id: newExpId };
          
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            experience: [...prev.experience, newExp],
          }));
          
          // 2. Update localStorage cache
          updateExperienceLocalStorageCache(newExp, true);
          
          setExpDialog({ open: false, exp: null });
          toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('[DEBUG] Failed to add experience:', error);
        toast({ 
          title: t('common.error'), 
          description: t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    }
  };

  const handleDeleteExperience = async (id: string) => {
    const confirmDelete = window.confirm(t('profile.confirmDeleteExperience') || 'Are you sure you want to delete this experience entry?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('sinopia_token');
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      console.log('[DEBUG] DELETE Request for experience id:', id);
      
      const response = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });
      
      console.log('[DEBUG] DELETE Experience Response status:', response.status);
      
      if (response.ok || response.status === 204) {
        // 1. Update UI state
        setGiverProfile(prev => ({
          ...prev,
          experience: prev.experience.filter(e => e.id !== id),
        }));
        
        // 2. Update localStorage cache
        removeExperienceFromLocalStorageCache(id);
        
        toast({ title: t('profile.experienceDeleted') || t('profile.profileUpdated'), description: t('profile.changesSaved') });
      } else {
        const data = await response.json();
        toast({ 
          title: t('common.error'), 
          description: data.message || t('profile.deleteFailed'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[DEBUG] Failed to delete experience:', error);
      toast({ 
        title: t('common.error'), 
        description: t('profile.deleteFailed'),
        variant: 'destructive',
      });
    }
  };

  const updateEducationLocalStorageCache = (updatedEdu: Education, isNew: boolean = false) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        const apiEdu = {
          id: parseInt(updatedEdu.id) || updatedEdu.id,
          user_id: cache.education?.[0]?.user_id || null,
          degree: updatedEdu.degree,
          institution: updatedEdu.institution,
          graduation_year: updatedEdu.graduationYear,
          gpa: updatedEdu.gpa ? parseFloat(updatedEdu.gpa) : null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        if (isNew) {
          cache.education = [...(cache.education || []), apiEdu];
        } else {
          cache.education = (cache.education || []).map((e: { id: number | string }) => 
            e.id.toString() === updatedEdu.id ? apiEdu : e
          );
        }
        
        localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
        console.log('[DEBUG] Updated user_profile_cache with education:', apiEdu);
      }
    } catch (error) {
      console.error('Failed to update education localStorage cache:', error);
    }
  };

  const removeEducationFromLocalStorageCache = (eduId: string) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        if (cache && cache.education) {
          cache.education = cache.education.filter((e: { id: number | string }) => 
            e.id.toString() !== eduId
          );
          localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
          console.log('[DEBUG] Removed education from user_profile_cache, id:', eduId);
        }
      }
    } catch (error) {
      console.error('Failed to remove education from localStorage cache:', error);
    }
  };

  const handleSaveEducation = async (edu: Education) => {
    const token = localStorage.getItem('sinopia_token');
    console.log('[DEBUG] Education - Sending token:', token);
    console.log('[DEBUG] Education ID:', edu.id);
    
    if (edu.id) {
      // Update existing education via API
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const requestBody = {
          degree: edu.degree,
          institution: edu.institution,
          graduation_year: edu.graduationYear ? parseInt(edu.graduationYear, 10) : null,
          gpa: edu.gpa ? parseFloat(edu.gpa) : null,
        };
        
        console.log('[DEBUG] PUT Education Request body:', requestBody);
        
        const response = await fetch(`/api/education/${edu.id}`, {
          method: 'PUT',
          headers,
          credentials: 'include',
          body: JSON.stringify(requestBody),
        });
        
        const data = await response.json();
        console.log('[DEBUG] PUT Education Response:', data);
        
        if (response.ok) {
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            education: prev.education.map(e => e.id === edu.id ? edu : e),
          }));
          
          // 2. Update localStorage cache
          updateEducationLocalStorageCache(edu, false);
          
          setEduDialog({ open: false, edu: null });
          toast({ title: t('profile.educationUpdated') || t('profile.profileUpdated'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('[DEBUG] Failed to update education:', error);
        toast({ 
          title: t('common.error'), 
          description: t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    } else {
      // Add new education via API
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const requestBody = {
          degree: edu.degree,
          institution: edu.institution,
          graduation_year: edu.graduationYear ? parseInt(edu.graduationYear, 10) : null,
          gpa: edu.gpa ? parseFloat(edu.gpa) : null,
        };
        
        console.log('[DEBUG] POST Education Request body:', requestBody);
        
        const response = await fetch('/api/education', {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify(requestBody),
        });
        
        const data = await response.json();
        console.log('[DEBUG] POST Education Response:', data);
        
        if (response.ok) {
          // Use the ID from the server response if available
          const newEduId = data.data?.id?.toString() || data.id?.toString() || generateId();
          const newEdu = { ...edu, id: newEduId };
          
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            education: [...prev.education, newEdu],
          }));
          
          // 2. Update localStorage cache
          updateEducationLocalStorageCache(newEdu, true);
          
          setEduDialog({ open: false, edu: null });
          toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('[DEBUG] Failed to add education:', error);
        toast({ 
          title: t('common.error'), 
          description: t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    }
  };

  const handleDeleteEducation = async (id: string) => {
    const confirmDelete = window.confirm(t('profile.confirmDeleteEducation') || 'Are you sure you want to delete this education entry?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('sinopia_token');
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      console.log('[DEBUG] DELETE Request for education id:', id);
      
      const response = await fetch(`/api/education/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });
      
      console.log('[DEBUG] DELETE Education Response status:', response.status);
      
      if (response.ok || response.status === 204) {
        // 1. Update UI state
        setGiverProfile(prev => ({
          ...prev,
          education: prev.education.filter(e => e.id !== id),
        }));
        
        // 2. Update localStorage cache
        removeEducationFromLocalStorageCache(id);
        
        toast({ title: t('profile.educationDeleted') || t('profile.profileUpdated'), description: t('profile.changesSaved') });
      } else {
        const data = await response.json();
        toast({ 
          title: t('common.error'), 
          description: data.message || t('profile.deleteFailed'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[DEBUG] Failed to delete education:', error);
      toast({ 
        title: t('common.error'), 
        description: t('profile.deleteFailed'),
        variant: 'destructive',
      });
    }
  };

  const updateLocalStorageCache = (updatedCert: { id: string; name: string; authority: string; date: string }, isNew: boolean = false) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        const apiCert = {
          id: parseInt(updatedCert.id) || updatedCert.id,
          user_id: cache.certificates?.[0]?.user_id || null,
          name: updatedCert.name,
          authority: updatedCert.authority,
          date: updatedCert.date.length === 7 ? `${updatedCert.date}-01` : updatedCert.date,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        if (isNew) {
          cache.certificates = [...(cache.certificates || []), apiCert];
        } else {
          cache.certificates = (cache.certificates || []).map((c: { id: number | string }) => 
            c.id.toString() === updatedCert.id ? apiCert : c
          );
        }
        
        localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
        console.log('[DEBUG] Updated user_profile_cache with certificate:', apiCert);
      }
    } catch (error) {
      console.error('Failed to update localStorage cache:', error);
    }
  };

  const handleSaveCertification = async (cert: Certification) => {
    const token = localStorage.getItem('sinopia_token');
    console.log('[DEBUG] Sending token:', token);
    console.log('[DEBUG] Certificate ID:', cert.id);
    
    if (cert.id) {
      // Update existing certification via API
      try {
        const dateForApi = cert.date ? (cert.date.length === 7 ? `${cert.date}-01` : cert.date) : '';
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        console.log('[DEBUG] PUT Request headers:', headers);
        console.log('[DEBUG] PUT Request body:', { name: cert.name, authority: cert.authority, date: dateForApi });
        
        const response = await fetch(`/api/certificates/${cert.id}`, {
          method: 'PUT',
          headers,
          credentials: 'include',
          body: JSON.stringify({
            name: cert.name,
            authority: cert.authority,
            date: dateForApi,
          }),
        });
        
        const data = await response.json();
        console.log('[DEBUG] PUT Response:', data);
        
        if (response.ok) {
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            certifications: prev.certifications.map(c => c.id === cert.id ? cert : c),
          }));
          
          // 2. Update localStorage cache
          updateLocalStorageCache(cert, false);
          
          setCertDialog({ open: false, cert: null });
          toast({ title: t('profile.certificationUpdated'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('[DEBUG] Failed to update certificate:', error);
        toast({ 
          title: t('common.error'), 
          description: t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    } else {
      // Add new certification via API
      try {
        const dateForApi = cert.date ? `${cert.date}-01` : '';
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        console.log('[DEBUG] POST - Sending token:', token);
        console.log('[DEBUG] POST - Request headers:', headers);
        console.log('[DEBUG] POST - Request body:', { name: cert.name, authority: cert.authority, date: dateForApi });
        
        const response = await fetch('/api/certificates', {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify({
            name: cert.name,
            authority: cert.authority,
            date: dateForApi,
          }),
        });
        
        const data = await response.json();
        console.log('[DEBUG] POST Response:', data);
        
        if (response.ok) {
          // Use the ID from the server response if available
          const newCertId = data.data?.id?.toString() || data.id?.toString() || generateId();
          const newCert = { ...cert, id: newCertId };
          
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            certifications: [...prev.certifications, newCert],
          }));
          
          // 2. Update localStorage cache
          updateLocalStorageCache(newCert, true);
          
          setCertDialog({ open: false, cert: null });
          toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('[DEBUG] Failed to add certificate:', error);
        toast({ 
          title: t('common.error'), 
          description: t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    }
  };

  const removeFromLocalStorageCache = (certId: string) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        if (cache && cache.certificates) {
          cache.certificates = cache.certificates.filter((c: { id: number | string }) => 
            c.id.toString() !== certId
          );
          localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
          console.log('[DEBUG] Removed certificate from user_profile_cache, id:', certId);
        }
      }
    } catch (error) {
      console.error('Failed to remove from localStorage cache:', error);
    }
  };

  const handleDeleteCertification = async (id: string) => {
    const confirmDelete = window.confirm(t('profile.confirmDeleteCertificate') || 'Are you sure you want to delete this certificate?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('sinopia_token');
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      console.log('[DEBUG] DELETE Request for certificate id:', id);
      
      const response = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });
      
      console.log('[DEBUG] DELETE Response status:', response.status);
      
      if (response.ok || response.status === 204) {
        // 1. Update UI state
        setGiverProfile(prev => ({
          ...prev,
          certifications: prev.certifications.filter(c => c.id !== id),
        }));
        
        // 2. Update localStorage cache
        removeFromLocalStorageCache(id);
        
        toast({ title: t('profile.certificationDeleted') || t('profile.profileUpdated'), description: t('profile.changesSaved') });
      } else {
        const data = await response.json();
        toast({ 
          title: t('common.error'), 
          description: data.message || t('profile.deleteFailed') || 'Failed to delete certificate',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[DEBUG] Failed to delete certificate:', error);
      toast({ 
        title: t('common.error'), 
        description: t('profile.deleteFailed') || 'Failed to delete certificate',
        variant: 'destructive',
      });
    }
  };

  const updateProjectLocalStorageCache = (updatedProj: PersonalProject, isNew: boolean = false) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        const apiProj = {
          id: parseInt(updatedProj.id) || updatedProj.id,
          user_id: cache.projects?.[0]?.user_id || null,
          name: updatedProj.name,
          description: updatedProj.description,
          technologies: updatedProj.technologies,
          duration: updatedProj.duration,
          project_url: updatedProj.projectUrl || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        if (isNew) {
          cache.projects = [...(cache.projects || []), apiProj];
        } else {
          cache.projects = (cache.projects || []).map((p: { id: number | string }) => 
            p.id.toString() === updatedProj.id ? apiProj : p
          );
        }
        
        localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
        console.log('[DEBUG] Updated user_profile_cache with project:', apiProj);
      }
    } catch (error) {
      console.error('Failed to update project localStorage cache:', error);
    }
  };

  const removeProjectFromLocalStorageCache = (projId: string) => {
    try {
      const cacheStr = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cacheStr) {
        const cache = JSON.parse(cacheStr);
        if (cache && cache.projects) {
          cache.projects = cache.projects.filter((p: { id: number | string }) => 
            p.id.toString() !== projId
          );
          localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(cache));
          console.log('[DEBUG] Removed project from user_profile_cache, id:', projId);
        }
      }
    } catch (error) {
      console.error('Failed to remove project from localStorage cache:', error);
    }
  };

  const openLangDialog = (lang: Language | null) => {
    if (lang) {
      setLangForm({ language: lang.language, level: lang.level });
    } else {
      setLangForm({ language: '', level: '' });
    }
    setLangDialog({ open: true, lang });
  };

  const handleSaveLanguage = async () => {
    if (!langForm.language.trim() || !langForm.level) return;
    setLangSaving(true);
    const token = localStorage.getItem('sinopia_token');
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const isEdit = langDialog.lang !== null;
      const url = isEdit ? `/api/languages/${langDialog.lang!.id}` : '/api/languages';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers,
        credentials: 'include',
        body: JSON.stringify({ language: langForm.language.trim(), level: langForm.level }),
      });

      if (response.ok) {
        const data = await response.json();
        if (isEdit) {
          const updated = data?.data || { ...langDialog.lang, ...langForm };
          setLanguages(prev => prev.map(l => l.id === langDialog.lang!.id ? { ...l, language: langForm.language.trim(), level: langForm.level, ...updated } : l));
        } else {
          const newLang = data?.data || { id: Date.now(), language: langForm.language.trim(), level: langForm.level };
          setLanguages(prev => [...prev, newLang]);
        }
        toast({ title: t('profile.languageSaved') });
        setLangDialog({ open: false, lang: null });
      } else {
        toast({ title: t('profile.languageSaveFailed'), variant: 'destructive' });
      }
    } catch (error) {
      console.error('Save language error:', error);
      toast({ title: t('profile.languageSaveFailed'), variant: 'destructive' });
    } finally {
      setLangSaving(false);
    }
  };

  const handleDeleteLanguage = async (id: number) => {
    const confirmDelete = window.confirm(t('profile.confirmDeleteLanguage'));
    if (!confirmDelete) return;
    const token = localStorage.getItem('sinopia_token');
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`/api/languages/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });

      if (response.ok || response.status === 204) {
        setLanguages(prev => prev.filter(l => l.id !== id));
        toast({ title: t('profile.languageDeleted') });
      } else {
        toast({ title: t('profile.languageDeleteFailed'), variant: 'destructive' });
      }
    } catch (error) {
      console.error('Delete language error:', error);
      toast({ title: t('profile.languageDeleteFailed'), variant: 'destructive' });
    }
  };

  const handleSaveProject = async (proj: PersonalProject) => {
    const token = localStorage.getItem('sinopia_token');
    console.log('[DEBUG] Project - Sending token:', token);
    console.log('[DEBUG] Project ID:', proj.id);
    
    if (proj.id) {
      // Update existing project via API
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const requestBody = {
          name: proj.name,
          description: proj.description,
          technologies: proj.technologies,
          duration: proj.duration,
          project_url: proj.projectUrl || '',
        };
        
        console.log('[DEBUG] PUT Project Request body:', requestBody);
        
        const response = await fetch(`/api/projects/${proj.id}`, {
          method: 'PUT',
          headers,
          credentials: 'include',
          body: JSON.stringify(requestBody),
        });
        
        const data = await response.json();
        console.log('[DEBUG] PUT Project Response:', data);
        
        if (response.ok) {
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            personalProjects: prev.personalProjects.map(p => p.id === proj.id ? proj : p),
          }));
          
          // 2. Update localStorage cache
          updateProjectLocalStorageCache(proj, false);
          
          setProjDialog({ open: false, proj: null });
          toast({ title: t('profile.projectUpdated') || t('profile.profileUpdated'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('[DEBUG] Failed to update project:', error);
        toast({ 
          title: t('common.error'), 
          description: t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    } else {
      // Add new project via API
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        const requestBody = {
          name: proj.name,
          description: proj.description,
          technologies: proj.technologies,
          duration: proj.duration,
          project_url: proj.projectUrl || '',
        };
        
        console.log('[DEBUG] POST Project Request body:', requestBody);
        
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers,
          credentials: 'include',
          body: JSON.stringify(requestBody),
        });
        
        const data = await response.json();
        console.log('[DEBUG] POST Project Response:', data);
        
        if (response.ok) {
          // Use the ID from the server response if available
          const newProjId = data.data?.id?.toString() || data.id?.toString() || generateId();
          const newProj = { ...proj, id: newProjId };
          
          // 1. Update UI state
          setGiverProfile(prev => ({
            ...prev,
            personalProjects: [...prev.personalProjects, newProj],
          }));
          
          // 2. Update localStorage cache
          updateProjectLocalStorageCache(newProj, true);
          
          setProjDialog({ open: false, proj: null });
          toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
        } else {
          toast({ 
            title: t('common.error'), 
            description: data.message || t('profile.saveFailed'),
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('[DEBUG] Failed to add project:', error);
        toast({ 
          title: t('common.error'), 
          description: t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    const confirmDelete = window.confirm(t('profile.confirmDeleteProject') || 'Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('sinopia_token');
    
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      console.log('[DEBUG] DELETE Request for project id:', id);
      
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });
      
      console.log('[DEBUG] DELETE Project Response status:', response.status);
      
      if (response.ok || response.status === 204) {
        // 1. Update UI state
        setGiverProfile(prev => ({
          ...prev,
          personalProjects: prev.personalProjects.filter(p => p.id !== id),
        }));
        
        // 2. Update localStorage cache
        removeProjectFromLocalStorageCache(id);
        
        toast({ title: t('profile.projectDeleted') || t('profile.profileUpdated'), description: t('profile.changesSaved') });
      } else {
        const data = await response.json();
        toast({ 
          title: t('common.error'), 
          description: data.message || t('profile.deleteFailed'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[DEBUG] Failed to delete project:', error);
      toast({ 
        title: t('common.error'), 
        description: t('profile.deleteFailed'),
        variant: 'destructive',
      });
    }
  };

  const normalizeLinkedInUrl = (url: string): string => {
    url = url.trim();
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    if (url.startsWith('linkedin.com') || url.startsWith('www.linkedin.com')) {
      return 'https://' + url;
    }
    if (url.includes('linkedin.com')) {
      return url;
    }
    return 'https://linkedin.com/in/' + url;
  };

  // Update profile cache in localStorage
  const updateProfileCache = (updatedData: Record<string, any>) => {
    try {
      const cached = localStorage.getItem(USER_PROFILE_CACHE_KEY);
      if (cached) {
        const existing = JSON.parse(cached);
        const updated = { ...existing, ...updatedData };
        localStorage.setItem(USER_PROFILE_CACHE_KEY, JSON.stringify(updated));
        console.log('[DEBUG] Updated user_profile_cache with:', updatedData);
      }
    } catch (e) {
      console.error('Failed to update profile cache:', e);
    }
  };

  const handleSaveContact = async () => {
    setContactSaving(true);
    
    try {
      const token = localStorage.getItem('sinopia_token');
      if (!token) {
        toast({ title: t('common.error'), description: 'Not authenticated', variant: 'destructive' });
        setContactSaving(false);
        return;
      }

      const summaryContent = contactForm.summary.trim() || null;
      
      // Build the payload with the 7 required fields
      // API expects: full_name (or name), linkedin, email, phone, country, city, summary
      const payload = {
        full_name: contactForm.full_name.trim() || null,
        linkedin: contactForm.linkedin.trim().replace(/\r?\n/g, '') || null,
        email: contactForm.email.trim() || null,
        phone: contactForm.phone.trim() || null,
        country: contactForm.country.trim() || null,
        city: contactForm.city.trim() || null,
        summary: summaryContent,
      };

      console.log('[DEBUG] Saving contact info (POST):', payload);

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('[DEBUG] Save contact response status:', response.status);
      console.log('[DEBUG] Save contact response:', data);

      // Handle 200 or 201 as success
      if (response.ok || response.status === 201) {
        // Use full_name from response or payload
        const returnedName = data.full_name || payload.full_name;
        
        // 1. Update UI state
        setCachedUserProfile(prev => ({
          ...prev,
          fullName: returnedName || '',
          phone: payload.phone || '',
          email: payload.email || '',
          linkedin: payload.linkedin || '',
          country: payload.country || '',
          city: payload.city || '',
          summary: summaryContent || '',
        }));

        // 2. Update giverProfile bio as well (syncs with Bio section)
        setGiverProfile(prev => ({
          ...prev,
          bio: summaryContent || '',
        }));

        // 3. Update localStorage cache
        updateProfileCache({
          full_name: returnedName,
          phone: payload.phone,
          email: payload.email,
          linkedin: payload.linkedin,
          country: payload.country,
          city: payload.city,
          summary: summaryContent,
        });

        setContactDialog(false);
        toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
      } else {
        toast({ 
          title: t('common.error'), 
          description: data.message || t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[DEBUG] Failed to save contact:', error);
      toast({ 
        title: t('common.error'), 
        description: t('profile.saveFailed'),
        variant: 'destructive',
      });
    } finally {
      setContactSaving(false);
    }
  };

  const openContactDialog = () => {
    setContactForm({ 
      full_name: cachedUserProfile.fullName || '',
      linkedin: cachedUserProfile.linkedin || '',
      email: cachedUserProfile.email || user?.email || '',
      phone: cachedUserProfile.phone || '',
      country: cachedUserProfile.country || '',
      city: cachedUserProfile.city || '',
      summary: cachedUserProfile.summary || giverProfile.bio || '',
    });
    setContactDialog(true);
  };

  // Handle Bio/Summary save via API
  const handleSaveBio = async () => {
    if (!editBuffer || !('bio' in editBuffer)) return;
    
    try {
      const token = localStorage.getItem('sinopia_token');
      if (!token) {
        toast({ title: t('common.error'), description: 'Not authenticated', variant: 'destructive' });
        return;
      }

      const newSummary = (editBuffer.bio || '').trim() || null;

      // Build payload for POST /api/profile/ with correct field mapping
      // API expects: full_name, email, bio, summary, skills array
      const payload = {
        full_name: cachedUserProfile.fullName || null,
        email: cachedUserProfile.email || null,
        bio: newSummary,
        summary: newSummary,
        skills: giverProfile.skills.map(s => s.name),
      };

      console.log('[DEBUG] Saving bio (POST):', payload);

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('[DEBUG] Save bio response status:', response.status);
      console.log('[DEBUG] Save bio response:', data);

      // Handle 200 or 201 as success
      if (response.ok || response.status === 201) {
        // 1. Update UI state
        setCachedUserProfile(prev => ({
          ...prev,
          summary: newSummary || '',
        }));

        // 2. Update giverProfile bio as well
        setGiverProfile(prev => ({
          ...prev,
          bio: newSummary || '',
        }));

        // 3. Update localStorage cache
        updateProfileCache({ summary: newSummary });

        setEditingSection(null);
        setEditBuffer(null);
        toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
      } else {
        toast({ 
          title: t('common.error'), 
          description: data.message || t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[DEBUG] Failed to save bio:', error);
      toast({ 
        title: t('common.error'), 
        description: t('profile.saveFailed'),
        variant: 'destructive',
      });
    }
  };

  const openCompanySummaryDialog = () => {
    setCompanySummaryForm({
      companyName: searcherProfile.companyName,
      website: searcherProfile.website,
      city: searcherProfile.city,
      country: searcherProfile.country,
      companySize: searcherProfile.companySize,
      contactEmail: searcherProfile.contactEmail || user?.email || '',
      contactPhone: searcherProfile.contactPhone,
      industry: searcherProfile.industry,
      bio: searcherProfile.bio,
      street: searcherProfile.street,
      zipCode: searcherProfile.zipCode,
      state: searcherProfile.state,
    });
    setCompanySummaryDialog(true);
  };

  const handleSaveCompanySummary = async () => {
    if (companySummaryForm.website && !isValidUrl(companySummaryForm.website)) {
      toast({ title: t('common.error'), description: t('profile.invalidWebsiteUrl'), variant: 'destructive' });
      return;
    }
    
    const updatedProfile = {
      companyName: companySummaryForm.companyName.trim(),
      website: normalizeUrl(companySummaryForm.website),
      city: companySummaryForm.city.trim(),
      country: companySummaryForm.country.trim(),
      companySize: companySummaryForm.companySize.trim(),
      contactEmail: companySummaryForm.contactEmail.trim(),
      contactPhone: companySummaryForm.contactPhone.trim(),
      industry: companySummaryForm.industry.trim(),
      bio: companySummaryForm.bio.trim(),
      street: companySummaryForm.street.trim(),
      zipCode: companySummaryForm.zipCode.trim(),
      state: companySummaryForm.state.trim(),
    };
    
    setSearcherProfile(prev => ({ ...prev, ...updatedProfile }));
    
    try {
      const storedToken = localStorage.getItem('sinopia_token');
      const apiPayload = {
        company_name: updatedProfile.companyName,
        industry: updatedProfile.industry,
        website: updatedProfile.website,
        phone: updatedProfile.contactPhone,
        email: updatedProfile.contactEmail,
        country: updatedProfile.country,
        city: updatedProfile.city,
        bio: updatedProfile.bio,
        company_size: updatedProfile.companySize,
      };
      
      console.log('[DEBUG] Saving company profile to API:', apiPayload);
      
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(storedToken && { 'Authorization': `Bearer ${storedToken}` }),
        },
        credentials: 'include',
        body: JSON.stringify(apiPayload),
      });
      
      const responseData = await response.json();
      console.log('[DEBUG] Company profile save response:', responseData);
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to save company profile');
      }
      
      localStorage.setItem('company_profile_cache', JSON.stringify(responseData));
      setCompanySummaryDialog(false);
      toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
    } catch (error) {
      console.error('Error saving company profile:', error);
      toast({ 
        title: t('common.error'), 
        description: error instanceof Error ? error.message : t('profile.saveFailed'),
        variant: 'destructive',
      });
    }
  };

  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const processFile = async (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: t('common.error'),
        description: t('profile.cvInvalidFileType'),
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t('common.error'),
        description: t('profile.cvFileTooLarge'),
        variant: 'destructive',
      });
      return;
    }

    setCvUploading(true);
    setCvFileName(file.name);
    setCvFileSize(file.size);

    try {
      const token = localStorage.getItem('sinopia_token');
      const formData = new FormData();
      formData.append('cvFile', file);
      
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/upload-cv', {
        method: 'POST',
        headers,
        body: formData,
      });
      
      const data = await response.json();
      console.log('[DEBUG] CV Upload response:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload CV');
      }
      
      // Extract cvData from response
      const cvData = data.data?.cvData || data.cvData || {};
      console.log('[DEBUG] Extracted cvData:', JSON.stringify(cvData, null, 2));
      
      // Map extracted data to our profile structure
      const extractedData = {
        // Personal Info
        full_name: cvData.name || '',
        phone: cvData.contact?.phone || '',
        email: cvData.contact?.email || '',
        linkedin: cvData.contact?.linkedin || '',
        city: cvData.contact?.city || '',
        country: cvData.contact?.country || '',
        summary: cvData.summary || '',
        
        // Skills - map to our format (convert technical_skills→technical, soft_skills→soft)
        skills: (cvData.skills || []).map((skill: { skill_name?: string; name?: string; skill_type?: string; level?: string }) => ({
          id: generateId(),
          name: skill.skill_name || skill.name || '',
          skill_type: normalizeSkillType(skill.skill_type),
          level: capitalizeFirstLetter(skill.level || 'intermediate') as SkillLevel,
        })).filter((s: Skill) => s.name),
        
        // Education - map fields
        education: (cvData.education || []).map((edu: { degree?: string; institution?: string; graduation_year?: string | number; gpa?: string | number }) => ({
          id: generateId(),
          degree: edu.degree || '',
          institution: edu.institution || '',
          graduationYear: edu.graduation_year?.toString() || '',
          gpa: edu.gpa?.toString() || '',
        })),
        
        // Experience - transform details array to string
        experience: (cvData.experience || []).map((exp: { title?: string; company?: string; start_date?: string; end_date?: string; details?: string | string[] }) => ({
          id: generateId(),
          title: exp.title || 'Position',
          company: exp.company || '',
          startDate: exp.start_date || '',
          endDate: exp.end_date || '',
          current: !exp.end_date || exp.end_date.toLowerCase() === 'present',
          details: Array.isArray(exp.details) ? exp.details.join('\n') : (exp.details || ''),
        })),
        
        // Projects - map fields
        projects: (cvData.projects || []).map((proj: { project_name?: string; name?: string; description?: string; project_url?: string; url?: string; technologies?: string[] }) => ({
          id: generateId(),
          name: proj.project_name || proj.name || '',
          description: proj.description || '',
          url: proj.project_url || proj.url || '',
          technologies: proj.technologies || [],
        })),
        
        // Certifications
        certifications: (cvData.certifications || []).map((cert: { name?: string; issuer?: string; date?: string; expiry?: string; credential_id?: string }) => ({
          id: generateId(),
          name: cert.name || '',
          issuer: cert.issuer || '',
          date: cert.date || '',
          expiryDate: cert.expiry || '',
          credentialId: cert.credential_id || '',
        })),
      };
      
      console.log('[DEBUG] Mapped extracted data:', JSON.stringify(extractedData, null, 2));
      
      // Update giver profile with extracted data
      setGiverProfile(prev => ({
        ...prev,
        bio: extractedData.summary || prev.bio,
        // Add new skills, avoiding duplicates
        skills: [
          ...prev.skills,
          ...extractedData.skills.filter((newSkill: Skill) => 
            !prev.skills.some(existingSkill => 
              existingSkill.name.toLowerCase() === newSkill.name.toLowerCase()
            )
          ),
        ],
        // Replace if empty, otherwise keep existing
        experience: extractedData.experience.length > 0 && prev.experience.length === 0 
          ? extractedData.experience 
          : prev.experience,
        education: extractedData.education.length > 0 && prev.education.length === 0 
          ? extractedData.education 
          : prev.education,
        certifications: extractedData.certifications.length > 0 && prev.certifications.length === 0 
          ? extractedData.certifications 
          : prev.certifications,
        personalProjects: extractedData.projects.length > 0 && prev.personalProjects.length === 0 
          ? extractedData.projects 
          : prev.personalProjects,
      }));
      
      // Update cached user profile
      const cacheUpdateData: Record<string, unknown> = {};
      if (extractedData.full_name) cacheUpdateData.full_name = extractedData.full_name;
      if (extractedData.phone) cacheUpdateData.phone = extractedData.phone;
      if (extractedData.email) cacheUpdateData.email = extractedData.email;
      if (extractedData.linkedin) cacheUpdateData.linkedin = extractedData.linkedin;
      if (extractedData.city) cacheUpdateData.city = extractedData.city;
      if (extractedData.country) cacheUpdateData.country = extractedData.country;
      if (extractedData.summary) cacheUpdateData.summary = extractedData.summary;
      if (extractedData.skills.length > 0) cacheUpdateData.skills = extractedData.skills;
      if (extractedData.education.length > 0) cacheUpdateData.education = extractedData.education;
      if (extractedData.experience.length > 0) cacheUpdateData.experience = extractedData.experience;
      if (extractedData.projects.length > 0) cacheUpdateData.projects = extractedData.projects;
      if (extractedData.certifications.length > 0) cacheUpdateData.certifications = extractedData.certifications;
      
      updateProfileCache(cacheUpdateData);
      
      // Update cached profile display values
      setCachedUserProfile(prev => ({
        ...prev,
        fullName: extractedData.full_name || prev.fullName,
        email: extractedData.email || prev.email,
        phone: extractedData.phone || prev.phone,
        linkedin: extractedData.linkedin || prev.linkedin,
        city: extractedData.city || prev.city,
        country: extractedData.country || prev.country,
      }));

      setCvUploaded(true);
      updateCvStatus(true, file.name, file.size);
      toast({
        title: t('profile.cvUploadSuccess'),
        description: t('profile.cvExtractionComplete'),
      });
    } catch (error) {
      console.error('[DEBUG] CV Upload error:', error);
      setCvFileName(null);
      setCvFileSize(null);
      toast({
        title: t('common.error'),
        description: t('profile.cvExtractionFailed'),
        variant: 'destructive',
      });
    } finally {
      setCvUploading(false);
      if (cvInputRef.current) {
        cvInputRef.current.value = '';
      }
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleRemoveFile = () => {
    setCvFileName(null);
    setCvFileSize(null);
    setCvUploaded(false);
    updateCvStatus(false, undefined, undefined);
    if (cvInputRef.current) {
      cvInputRef.current.value = '';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">{t('profile.pageTitle')}</h1>
          <p className="text-muted-foreground">
            {isSkillGiver ? t('profile.pageSubtitleGiver') : t('profile.pageSubtitleSearcher')}
          </p>
        </div>


        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6 text-center">
              <h2 className="font-semibold text-xl" data-testid="text-profile-fullname">
                {cachedUserProfile.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || ''}
              </h2>
              {isSkillGiver && (
                <p className="text-muted-foreground" data-testid="text-profile-job-title">{displayValue(giverProfile.jobTitle)}</p>
              )}
              {!isSkillGiver && (
                <p className="text-muted-foreground">{displayValue(searcherProfile.companyName)}</p>
              )}

              <div className="mt-6 space-y-3 text-left">
                {isSkillGiver && (
                  <>
                    {(cachedUserProfile.city || cachedUserProfile.country) && (
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span data-testid="text-profile-address">
                          {[cachedUserProfile.city, cachedUserProfile.country].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    )}
                    {(cachedUserProfile.email || user?.email) && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span data-testid="text-profile-email">
                          {cachedUserProfile.email || user?.email}
                        </span>
                      </div>
                    )}
                    {cachedUserProfile.phone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span data-testid="text-profile-phone">
                          {cachedUserProfile.phone}
                        </span>
                      </div>
                    )}
                    {cachedUserProfile.linkedin && (
                      <div className="flex items-center gap-3 text-sm">
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                        <a
                          href={formatLinkedInUrl(cachedUserProfile.linkedin)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate"
                          data-testid="link-profile-linkedin"
                        >
                          {cachedUserProfile.linkedin.trim().replace('https://', '').replace('http://', '')}
                        </a>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={openContactDialog}
                      data-testid="button-edit-contact"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      {t('profile.editContactInfo')}
                    </Button>
                  </>
                )}

                {!isSkillGiver && (
                  <>
                    {(searcherProfile.city || searcherProfile.country) && (
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span data-testid="text-profile-location">
                          {[searcherProfile.city, searcherProfile.country].filter(Boolean).join(', ')}
                        </span>
                      </div>
                    )}
                    {(searcherProfile.contactEmail || user?.email) && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span data-testid="text-searcher-email">{searcherProfile.contactEmail || user?.email}</span>
                      </div>
                    )}
                    {searcherProfile.contactPhone && (
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span data-testid="text-searcher-phone">{searcherProfile.contactPhone}</span>
                      </div>
                    )}
                    {searcherProfile.website && (
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <a 
                          href={searcherProfile.website} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate"
                          data-testid="link-searcher-website"
                        >
                          {searcherProfile.website.replace('https://', '').replace('http://', '')}
                        </a>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={openCompanySummaryDialog}
                      data-testid="button-edit-company-summary"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      {t('profile.editCompanyInfo')}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {!isSkillGiver && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    {t('profile.companyInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">{t('profile.companySize')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.companySize)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.industry')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.industry)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.street')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.street)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.zipCode')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.zipCode)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.city')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.city)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.state')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.state)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.country')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.country)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.companyName')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.companyName)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.website')}: </span>
                      {searcherProfile.website ? (
                        <a 
                          href={searcherProfile.website} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-medium text-primary hover:underline"
                          data-testid="link-company-website"
                        >
                          {searcherProfile.website.replace('https://', '').replace('http://', '')}
                        </a>
                      ) : (
                        <span className="font-medium"></span>
                      )}
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.contactEmail')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.contactEmail)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t('profile.contactPhone')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.contactPhone)}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-muted-foreground">{t('profile.bio')}: </span>
                      <span className="font-medium">{displayValue(searcherProfile.bio)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isSkillGiver && (
              <Card className="border-2 border-dashed border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {t('profile.cvUploadTitle')}
                  </CardTitle>
                  {cvUploaded && (
                    <Badge variant="default" className="flex items-center gap-1 bg-green-600">
                      <CheckCircle className="w-3 h-3" />
                      {t('profile.cvUploaded')}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvUpload}
                    className="hidden"
                    id="profile-cv-upload"
                    data-testid="input-profile-cv"
                  />
                  
                  {/* Show AI Animation when uploading - always visible during upload */}
                  {cvUploading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      {/* Glow effect container with explicit dimensions */}
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        {/* Outer glow rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-orange-200/40 dark:bg-orange-500/20 animate-ping" style={{ animationDuration: '2s' }} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-orange-300/30 dark:bg-orange-400/20 animate-pulse" />
                        </div>
                        {/* Icon container with glow background */}
                        <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/40">
                          <Brain className="w-6 h-6 text-orange-600 dark:text-orange-400 animate-pulse" />
                        </div>
                      </div>
                      {/* Text */}
                      <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('profile.cvExtracting')}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground text-center max-w-xs">
                        {t('profile.cvExtractingDescription')}
                      </p>
                    </div>
                  ) : !cvUploaded && !cvFileName ? (
                    <div
                      ref={dropzoneRef}
                      role="button"
                      tabIndex={0}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => !cvUploading && cvInputRef.current?.click()}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && !cvUploading) {
                          e.preventDefault();
                          cvInputRef.current?.click();
                        }
                      }}
                      className={`
                        relative cursor-pointer rounded-lg border-2 border-dashed p-8 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                        ${isDragOver 
                          ? 'border-primary bg-primary/10 scale-[1.02]' 
                          : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5'
                        }
                        ${cvUploading ? 'pointer-events-none opacity-60' : ''}
                      `}
                      data-testid="dropzone-cv"
                    >
                      <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="w-8 h-8 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {isDragOver ? t('profile.cvDropHere') : t('profile.cvUploadDescription')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t('profile.cvUploadSupported')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-muted/30">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{cvFileName}</p>
                          {cvFileSize && (
                            <p className="text-xs text-muted-foreground">{formatFileSize(cvFileSize)}</p>
                          )}
                        </div>
                        {!cvUploading && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile();
                            }}
                            className="text-muted-foreground hover:text-destructive"
                            data-testid="button-remove-cv"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      {cvUploaded && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <p className="text-sm">{t('profile.cvExtractionComplete')}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!cvUploaded && !cvUploading && (
                    <div className="mt-4">
                      <Button
                        onClick={() => cvInputRef.current?.click()}
                        className="w-full"
                        data-testid="button-upload-cv-ai"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {t('profile.cvUploadButton')}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {t('profile.about')}
                  </CardTitle>
                  {editingSection === 'about' ? (
                    <SectionActions section="about" />
                  ) : (
                    <SectionEditButton section="about" />
                  )}
                </CardHeader>
                <CardContent>
                  {editingSection === 'about' && editBuffer ? (
                    <Textarea
                      value={editBuffer.bio}
                      onChange={(e) => setEditBuffer({ ...editBuffer, bio: e.target.value })}
                      rows={8}
                      className="min-h-[150px] resize-y"
                      placeholder={t('profile.bio')}
                    data-testid="input-profile-bio"
                  />
                ) : (
                  <p className="text-muted-foreground whitespace-pre-wrap" data-testid="text-profile-bio">
                    {cachedUserProfile.summary?.trim() || profile.bio?.trim() || t('emptyState.notSet')}
                  </p>
                )}
              </CardContent>
            </Card>
            )}

            {isSkillGiver && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    {t('profile.skills')}
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedSkillIds.length > 0 && (
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isBulkDeleting}
                        onClick={() => {
                          if (window.confirm(t('profile.confirmBulkDeleteSkills').replace('{count}', String(selectedSkillIds.length)))) {
                            handleBulkDeleteSkills();
                          }
                        }}
                        data-testid="button-bulk-delete-skills"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        {isBulkDeleting ? t('common.loading') : `${t('profile.deleteSelected')} (${selectedSkillIds.length})`}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSkillDialog({ open: true, skill: null })}
                      data-testid="button-add-skill"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      {t('profile.addSkill')}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {giverProfile.skills.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noSkills')}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 pb-2 border-b border-border">
                        <Checkbox
                          checked={selectedSkillIds.length === giverProfile.skills.length && giverProfile.skills.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSkillIds(giverProfile.skills.map(s => s.id));
                            } else {
                              setSelectedSkillIds([]);
                            }
                          }}
                          data-testid="checkbox-select-all-skills"
                        />
                        <span className="text-sm text-muted-foreground">{t('profile.selectAll')}</span>
                      </div>
                      {giverProfile.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border"
                          data-testid={`skill-item-${skill.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedSkillIds.includes(skill.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSkillIds(prev => [...prev, skill.id]);
                                } else {
                                  setSelectedSkillIds(prev => prev.filter(id => id !== skill.id));
                                }
                              }}
                              data-testid={`checkbox-skill-${skill.id}`}
                            />
                            <div>
                              <p className="font-medium">{skill.name}</p>
                              <div className="flex gap-1 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {getLevelLabel(skill.level)}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {getSkillTypeLabel(skill.skill_type)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => setSkillDialog({ open: true, skill })}
                              data-testid={`button-edit-skill-${skill.id}`}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteSkill(skill.id)}
                              className="text-destructive hover:text-destructive"
                              data-testid={`button-delete-skill-${skill.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    {t('profile.experience')}
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setExpDialog({ open: true, exp: null })}
                    data-testid="button-add-experience"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {t('profile.addExperience')}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {giverProfile.experience.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noExperience')}
                    </p>
                  ) : (
                    giverProfile.experience.map((exp) => (
                      <div key={exp.id} className="flex gap-4 p-4 rounded-lg border border-border" data-testid={`exp-item-${exp.id}`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{exp.title}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {exp.startDate} - {exp.current ? t('profile.present') : exp.endDate}
                          </p>
                          {exp.details && (
                            <p className="text-sm mt-2">{exp.details}</p>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setExpDialog({ open: true, exp })}
                            data-testid={`button-edit-exp-${exp.id}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-exp-${exp.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    {t('profile.education')}
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEduDialog({ open: true, edu: null })}
                    data-testid="button-add-education"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {t('profile.addEducation')}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {giverProfile.education.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noEducation')}
                    </p>
                  ) : (
                    giverProfile.education.map((edu) => (
                      <div key={edu.id} className="flex gap-4 p-4 rounded-lg border border-border" data-testid={`edu-item-${edu.id}`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {edu.graduationYear} {edu.gpa && `• GPA: ${edu.gpa}`}
                          </p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setEduDialog({ open: true, edu })}
                            data-testid={`button-edit-edu-${edu.id}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteEducation(edu.id)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-edu-${edu.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    {t('profile.certifications')}
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCertDialog({ open: true, cert: null })}
                    data-testid="button-add-certification"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {t('profile.addCertification')}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {giverProfile.certifications.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noCertifications')}
                    </p>
                  ) : (
                    giverProfile.certifications.map((cert) => (
                      <div key={cert.id} className="flex gap-4 p-4 rounded-lg border border-border" data-testid={`cert-item-${cert.id}`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.authority}</p>
                          <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setCertDialog({ open: true, cert })}
                            data-testid={`button-edit-cert-${cert.id}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteCertification(cert.id)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-cert-${cert.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <FolderKanban className="w-5 h-5" />
                    {t('profile.personalProjects')}
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProjDialog({ open: true, proj: null })}
                    data-testid="button-add-project"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {t('profile.addProject')}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {giverProfile.personalProjects.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noPersonalProjects')}
                    </p>
                  ) : (
                    giverProfile.personalProjects.map((proj) => (
                      <div key={proj.id} className="flex gap-4 p-4 rounded-lg border border-border" data-testid={`proj-item-${proj.id}`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <FolderKanban className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{proj.name}</h4>
                          {proj.technologies && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(Array.isArray(proj.technologies) ? proj.technologies : (typeof proj.technologies === 'string' ? proj.technologies.split(',') : [])).map((tech: string, i: number) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tech.trim()}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">{proj.duration}</p>
                          {proj.description && (
                            <p className="text-sm mt-2 text-muted-foreground">{proj.description}</p>
                          )}
                        </div>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setProjDialog({ open: true, proj })}
                            data-testid={`button-edit-proj-${proj.id}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteProject(proj.id)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-proj-${proj.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    {t('profile.languages')}
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openLangDialog(null)}
                    data-testid="button-add-language"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {t('profile.addLanguage')}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {languages.length === 0 ? (
                    <p className="text-muted-foreground text-sm">{t('profile.noLanguages')}</p>
                  ) : (
                    languages.map((lang) => (
                      <div key={lang.id} className="flex items-center justify-between gap-4 p-3 rounded-lg border" data-testid={`lang-item-${lang.id}`}>
                        <div className="flex items-center gap-3">
                          <span className="font-medium" data-testid={`text-lang-name-${lang.id}`}>{lang.language}</span>
                          <Badge variant="secondary" data-testid={`badge-lang-level-${lang.id}`}>
                            {lang.level ? capitalizeFirstLetter(lang.level) : ''}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => openLangDialog(lang)}
                            data-testid={`button-edit-lang-${lang.id}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteLanguage(lang.id)}
                            className="text-destructive hover:text-destructive"
                            data-testid={`button-delete-lang-${lang.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Dialog open={langDialog.open} onOpenChange={(open) => { if (!open) setLangDialog({ open: false, lang: null }); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {langDialog.lang ? t('profile.editLanguage') : t('profile.addLanguage')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>{t('profile.languageName')}</Label>
              <Input
                value={langForm.language}
                onChange={(e) => setLangForm(prev => ({ ...prev, language: e.target.value }))}
                placeholder={t('profile.languageNamePlaceholder')}
                data-testid="input-language-name"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.languageLevel')}</Label>
              <Select value={langForm.level} onValueChange={(val) => setLangForm(prev => ({ ...prev, level: val }))}>
                <SelectTrigger data-testid="select-language-level">
                  <SelectValue placeholder={t('profile.selectLevel')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">{t('profile.languageLevelBeginner')}</SelectItem>
                  <SelectItem value="Intermediate">{t('profile.languageLevelIntermediate')}</SelectItem>
                  <SelectItem value="Advanced">{t('profile.languageLevelAdvanced')}</SelectItem>
                  <SelectItem value="Expert">{t('profile.languageLevelExpert')}</SelectItem>
                  <SelectItem value="Native">{t('profile.languageLevelNative')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setLangDialog({ open: false, lang: null })} data-testid="button-cancel-language">
              <X className="w-4 h-4 mr-1" />
              {t('common.cancel')}
            </Button>
            <Button onClick={handleSaveLanguage} disabled={langSaving || !langForm.language.trim() || !langForm.level} data-testid="button-save-language">
              <Save className="w-4 h-4 mr-1" />
              {langSaving ? t('common.saving') : t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ContactDialog
        open={contactDialog}
        onOpenChange={setContactDialog}
        form={contactForm}
        setForm={setContactForm}
        onSave={handleSaveContact}
        saving={contactSaving}
        t={t}
      />

      <SkillDialog
        open={skillDialog.open}
        onOpenChange={(open) => setSkillDialog({ open, skill: null })}
        skill={skillDialog.skill}
        onSave={handleSaveSkill}
        t={t}
        getLevelLabel={getLevelLabel}
        getSkillTypeLabel={getSkillTypeLabel}
      />

      <ExperienceDialog
        open={expDialog.open}
        onOpenChange={(open) => setExpDialog({ open, exp: null })}
        exp={expDialog.exp}
        onSave={handleSaveExperience}
        t={t}
      />

      <EducationDialog
        open={eduDialog.open}
        onOpenChange={(open) => setEduDialog({ open, edu: null })}
        edu={eduDialog.edu}
        onSave={handleSaveEducation}
        t={t}
      />

      <CertificationDialog
        open={certDialog.open}
        onOpenChange={(open) => setCertDialog({ open, cert: null })}
        cert={certDialog.cert}
        onSave={handleSaveCertification}
        t={t}
      />

      <ProjectDialog
        open={projDialog.open}
        onOpenChange={(open) => setProjDialog({ open, proj: null })}
        proj={projDialog.proj}
        onSave={handleSaveProject}
        t={t}
      />

      <CompanySummaryDialog
        open={companySummaryDialog}
        onOpenChange={setCompanySummaryDialog}
        form={companySummaryForm}
        setForm={setCompanySummaryForm}
        onSave={handleSaveCompanySummary}
        t={t}
      />
    </DashboardLayout>
  );
}

interface ContactFormType {
  full_name: string;
  linkedin: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  summary: string;
}

function ContactDialog({ open, onOpenChange, form, setForm, onSave, saving, t }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ContactFormType;
  setForm: React.Dispatch<React.SetStateAction<ContactFormType>>;
  onSave: () => void;
  saving?: boolean;
  t: (key: string) => string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('profile.editContactInfo')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* 1. Full Name */}
          <div className="space-y-2">
            <Label>{t('profile.fullName')}</Label>
            <Input
              value={form.full_name}
              onChange={(e) => setForm(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder={t('profile.fullNamePlaceholder')}
              data-testid="input-contact-full-name"
            />
          </div>
          
          {/* 2. LinkedIn */}
          <div className="space-y-2">
            <Label>{t('profile.linkedinUrl')}</Label>
            <Input
              value={form.linkedin}
              onChange={(e) => setForm(prev => ({ ...prev, linkedin: e.target.value }))}
              placeholder={t('profile.linkedinPlaceholder')}
              data-testid="input-contact-linkedin"
            />
          </div>
          
          {/* 3. Email */}
          <div className="space-y-2">
            <Label>{t('profile.email')}</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder={t('profile.emailPlaceholder')}
              data-testid="input-contact-email"
            />
          </div>
          
          {/* 4. Phone */}
          <div className="space-y-2">
            <Label>{t('profile.phone')}</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
              placeholder={t('profile.phonePlaceholder')}
              data-testid="input-contact-phone"
            />
          </div>
          
          {/* 5. Country & 6. City */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('profile.country')}</Label>
              <Input
                value={form.country}
                onChange={(e) => setForm(prev => ({ ...prev, country: e.target.value }))}
                placeholder={t('profile.countryPlaceholder')}
                data-testid="input-contact-country"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.city')}</Label>
              <Input
                value={form.city}
                onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))}
                placeholder={t('profile.cityPlaceholder')}
                data-testid="input-contact-city"
              />
            </div>
          </div>
          
          {/* 7. Summary (labeled as Bio) */}
          <div className="space-y-2">
            <Label>{t('profile.bio')}</Label>
            <Textarea
              value={form.summary}
              onChange={(e) => setForm(prev => ({ ...prev, summary: e.target.value }))}
              placeholder={t('profile.bioPlaceholder')}
              rows={4}
              data-testid="input-contact-summary"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>{t('common.cancel')}</Button>
          <Button onClick={onSave} disabled={saving} data-testid="button-save-contact">
            {saving ? t('common.saving') : t('common.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SkillDialog({ open, onOpenChange, skill, onSave, t, getLevelLabel, getSkillTypeLabel }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: Skill | null;
  onSave: (skill: Skill) => void;
  t: (key: string) => string;
  getLevelLabel: (level: SkillLevel) => string;
  getSkillTypeLabel: (skillType: SkillType) => string;
}) {
  const [form, setForm] = useState<Skill>({ id: '', name: '', level: 'Intermediate', skill_type: 'technical' });

  useEffect(() => {
    if (skill) {
      setForm(skill);
    } else {
      setForm({ id: '', name: '', level: 'Intermediate', skill_type: 'technical' });
    }
  }, [skill, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{skill ? t('profile.editSkill') : t('profile.addSkill')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('profile.skillName')}</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t('profile.skillNamePlaceholder')}
              data-testid="input-skill-name"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.skillType')}</Label>
            <Select value={form.skill_type} onValueChange={(v) => setForm({ ...form, skill_type: v as SkillType })}>
              <SelectTrigger data-testid="select-skill-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">{getSkillTypeLabel('technical')}</SelectItem>
                <SelectItem value="soft">{getSkillTypeLabel('soft')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t('profile.skillLevel')}</Label>
            <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v as SkillLevel })}>
              <SelectTrigger data-testid="select-skill-level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">{getLevelLabel('Beginner')}</SelectItem>
                <SelectItem value="Intermediate">{getLevelLabel('Intermediate')}</SelectItem>
                <SelectItem value="Advanced">{getLevelLabel('Advanced')}</SelectItem>
                <SelectItem value="Expert">{getLevelLabel('Expert')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel')}</Button>
          <Button onClick={() => onSave(form)} disabled={!form.name.trim()}>{t('common.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ExperienceDialog({ open, onOpenChange, exp, onSave, t }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exp: Experience | null;
  onSave: (exp: Experience) => void;
  t: (key: string) => string;
}) {
  const [form, setForm] = useState<Experience>({ id: '', title: '', company: '', startDate: '', endDate: '', current: false, details: '' });

  useEffect(() => {
    if (exp) {
      setForm(exp);
    } else {
      setForm({ id: '', title: '', company: '', startDate: '', endDate: '', current: false, details: '' });
    }
  }, [exp, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{exp ? t('profile.experience') : t('profile.addExperience')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('profile.experienceTitle')}</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder={t('profile.experienceTitlePlaceholder')}
              data-testid="input-exp-title"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.experienceCompany')}</Label>
            <Input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder={t('profile.experienceCompanyPlaceholder')}
              data-testid="input-exp-company"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('profile.experienceStartDate')}</Label>
              <Input
                type="month"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                data-testid="input-exp-start"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.experienceEndDate')}</Label>
              <Input
                type="month"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                disabled={form.current}
                data-testid="input-exp-end"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="exp-current"
              checked={form.current}
              onCheckedChange={(checked) => setForm({ ...form, current: !!checked, endDate: checked ? '' : form.endDate })}
              data-testid="checkbox-exp-current"
            />
            <Label htmlFor="exp-current" className="cursor-pointer">{t('profile.experiencePresent')}</Label>
          </div>
          <div className="space-y-2">
            <Label>{t('profile.experienceDetails')}</Label>
            <Textarea
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              placeholder={t('profile.experienceDetailsPlaceholder')}
              rows={3}
              data-testid="input-exp-details"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel')}</Button>
          <Button onClick={() => onSave(form)} disabled={!form.title.trim() || !form.company.trim()}>{t('common.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EducationDialog({ open, onOpenChange, edu, onSave, t }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  edu: Education | null;
  onSave: (edu: Education) => void;
  t: (key: string) => string;
}) {
  const [form, setForm] = useState<Education>({ id: '', degree: '', institution: '', graduationYear: '', gpa: '' });

  useEffect(() => {
    if (edu) {
      setForm(edu);
    } else {
      setForm({ id: '', degree: '', institution: '', graduationYear: '', gpa: '' });
    }
  }, [edu, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{edu ? t('profile.education') : t('profile.addEducation')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('profile.educationDegree')}</Label>
            <Input
              value={form.degree}
              onChange={(e) => setForm({ ...form, degree: e.target.value })}
              placeholder={t('profile.educationDegreePlaceholder')}
              data-testid="input-edu-degree"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.educationInstitution')}</Label>
            <Input
              value={form.institution}
              onChange={(e) => setForm({ ...form, institution: e.target.value })}
              placeholder={t('profile.educationInstitutionPlaceholder')}
              data-testid="input-edu-institution"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('profile.educationGraduationYear')}</Label>
              <Input
                value={form.graduationYear}
                onChange={(e) => setForm({ ...form, graduationYear: e.target.value })}
                placeholder={t('profile.educationGraduationYearPlaceholder')}
                data-testid="input-edu-year"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.educationGpa')}</Label>
              <Input
                value={form.gpa}
                onChange={(e) => setForm({ ...form, gpa: e.target.value })}
                placeholder={t('profile.educationGpaPlaceholder')}
                data-testid="input-edu-gpa"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel')}</Button>
          <Button onClick={() => onSave(form)} disabled={!form.degree.trim() || !form.institution.trim()}>{t('common.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CertificationDialog({ open, onOpenChange, cert, onSave, t }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cert: Certification | null;
  onSave: (cert: Certification) => void;
  t: (key: string) => string;
}) {
  const [form, setForm] = useState<Certification>({ id: '', name: '', authority: '', date: '' });

  useEffect(() => {
    if (cert) {
      setForm(cert);
    } else {
      setForm({ id: '', name: '', authority: '', date: '' });
    }
  }, [cert, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cert ? t('profile.certifications') : t('profile.addCertification')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('profile.certificationName')}</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t('profile.certificationNamePlaceholder')}
              data-testid="input-cert-name"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.certificationAuthority')}</Label>
            <Input
              value={form.authority}
              onChange={(e) => setForm({ ...form, authority: e.target.value })}
              placeholder={t('profile.certificationAuthorityPlaceholder')}
              data-testid="input-cert-authority"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.certificationDate')}</Label>
            <Input
              type="month"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              data-testid="input-cert-date"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel')}</Button>
          <Button onClick={() => onSave(form)} disabled={!form.name.trim() || !form.authority.trim()}>{t('common.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProjectDialog({ open, onOpenChange, proj, onSave, t }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proj: PersonalProject | null;
  onSave: (proj: PersonalProject) => void;
  t: (key: string) => string;
}) {
  const [form, setForm] = useState<PersonalProject>({ id: '', name: '', description: '', technologies: '', duration: '', projectUrl: '' });

  useEffect(() => {
    if (proj) {
      setForm({ ...proj, projectUrl: proj.projectUrl || '' });
    } else {
      setForm({ id: '', name: '', description: '', technologies: '', duration: '', projectUrl: '' });
    }
  }, [proj, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{proj ? t('profile.personalProjects') : t('profile.addProject')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('profile.projectName')}</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t('profile.projectNamePlaceholder')}
              data-testid="input-proj-name"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.projectDescription')}</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder={t('profile.projectDescriptionPlaceholder')}
              rows={3}
              data-testid="input-proj-description"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.projectTechnologies')}</Label>
            <Input
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder={t('profile.projectTechnologiesPlaceholder')}
              data-testid="input-proj-technologies"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.projectDuration')}</Label>
            <Input
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder={t('profile.projectDurationPlaceholder')}
              data-testid="input-proj-duration"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.projectUrl')}</Label>
            <Input
              type="url"
              value={form.projectUrl}
              onChange={(e) => setForm({ ...form, projectUrl: e.target.value })}
              placeholder={t('profile.projectUrlPlaceholder')}
              data-testid="input-proj-url"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel')}</Button>
          <Button onClick={() => onSave(form)} disabled={!form.name.trim()}>{t('common.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CompanySummaryDialog({ open, onOpenChange, form, setForm, onSave, t }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: { companyName: string; website: string; city: string; country: string; companySize: string; contactEmail: string; contactPhone: string; industry: string; bio: string; street: string; zipCode: string; state: string };
  setForm: (form: { companyName: string; website: string; city: string; country: string; companySize: string; contactEmail: string; contactPhone: string; industry: string; bio: string; street: string; zipCode: string; state: string }) => void;
  onSave: () => void;
  t: (key: string) => string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('profile.editCompanyInfo')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          <div className="space-y-2">
            <Label>{t('profile.companyName')}</Label>
            <Input
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              placeholder={t('profile.companyNamePlaceholder')}
              data-testid="input-summary-company-name"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.website')}</Label>
            <Input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder={t('profile.websitePlaceholder')}
              data-testid="input-summary-website"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.street')}</Label>
            <Input
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              placeholder={t('profile.streetPlaceholder')}
              data-testid="input-summary-street"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('profile.zipCode')}</Label>
              <Input
                value={form.zipCode}
                onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                placeholder={t('profile.zipCodePlaceholder')}
                data-testid="input-summary-zip-code"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.city')}</Label>
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder={t('profile.cityPlaceholder')}
                data-testid="input-summary-city"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('profile.state')}</Label>
              <Input
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder={t('profile.statePlaceholder')}
                data-testid="input-summary-state"
              />
            </div>
            <div className="space-y-2">
              <Label>{t('profile.country')}</Label>
              <Input
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                placeholder={t('profile.countryPlaceholder')}
                data-testid="input-summary-country"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>{t('profile.companySize')}</Label>
            <Select
              value={form.companySize}
              onValueChange={(value) => setForm({ ...form, companySize: value })}
            >
              <SelectTrigger data-testid="select-summary-company-size">
                <SelectValue placeholder={t('profile.companySizePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10</SelectItem>
                <SelectItem value="11-50">11-50</SelectItem>
                <SelectItem value="51-200">51-200</SelectItem>
                <SelectItem value="201-500">201-500</SelectItem>
                <SelectItem value="501-1000">501-1000</SelectItem>
                <SelectItem value="1000+">1000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t('profile.contactEmail')}</Label>
            <Input
              type="email"
              value={form.contactEmail}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              placeholder={t('profile.emailPlaceholder')}
              data-testid="input-summary-contact-email"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.contactPhone')}</Label>
            <Input
              value={form.contactPhone}
              onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
              placeholder={t('profile.phonePlaceholder')}
              data-testid="input-summary-contact-phone"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.industry')}</Label>
            <Input
              value={form.industry}
              onChange={(e) => setForm({ ...form, industry: e.target.value })}
              placeholder={t('profile.industryPlaceholder')}
              data-testid="input-summary-industry"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.bio')}</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder={t('profile.bioPlaceholder')}
              rows={4}
              data-testid="input-summary-bio"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel')}</Button>
          <Button onClick={onSave} data-testid="button-save-company-summary">{t('common.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
