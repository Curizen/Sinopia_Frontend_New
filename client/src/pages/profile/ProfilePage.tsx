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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
} from 'lucide-react';
import { UnderDevelopment } from '@/components/common/UnderDevelopment';

type EditingSection = 'about' | 'skills' | 'experience' | 'education' | 'certifications' | 'company' | 'contact' | 'projects' | null;
type SkillLevel = 'junior' | 'intermediate' | 'advance' | 'expert';

interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
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
}

const STORAGE_KEY = 'sinopia_skill_giver_profile';
const SEARCHER_STORAGE_KEY = 'sinopia_skill_searcher_profile';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

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
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        bio: parsed.bio ?? defaults.bio,
        jobTitle: parsed.jobTitle ?? parsed.title ?? defaults.jobTitle,
        address: parsed.address ?? parsed.location ?? defaults.address,
        email: parsed.email ?? defaults.email,
        phone: parsed.phone ?? defaults.phone,
        linkedinUrl: parsed.linkedinUrl ?? defaults.linkedinUrl,
        availability: parsed.availability ?? defaults.availability,
        skills: Array.isArray(parsed.skills) ? parsed.skills.map((s: { id?: string; name?: string; level?: SkillLevel; icon?: string }) => ({
          id: s.id || generateId(),
          name: s.name || '',
          level: s.level || 'intermediate',
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
  });

  const loadSearcherProfileFromStorage = (): SkillSearcherProfile => {
    const defaults = createEmptySearcherProfile();
    try {
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
  const [expDialog, setExpDialog] = useState<{ open: boolean; exp: Experience | null }>({ open: false, exp: null });
  const [eduDialog, setEduDialog] = useState<{ open: boolean; edu: Education | null }>({ open: false, edu: null });
  const [certDialog, setCertDialog] = useState<{ open: boolean; cert: Certification | null }>({ open: false, cert: null });
  const [projDialog, setProjDialog] = useState<{ open: boolean; proj: PersonalProject | null }>({ open: false, proj: null });
  const [contactDialog, setContactDialog] = useState(false);
  const [companySummaryDialog, setCompanySummaryDialog] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(user?.cvUploaded || false);
  const [cvFileName, setCvFileName] = useState<string | null>(user?.cvFileName || null);
  const [cvFileSize, setCvFileSize] = useState<number | null>(user?.cvFileSize || null);
  const [isDragOver, setIsDragOver] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const [contactForm, setContactForm] = useState({ 
    jobTitle: '', 
    address: '', 
    email: '', 
    phone: '', 
    linkedinUrl: '' 
  });

  const [companySummaryForm, setCompanySummaryForm] = useState({
    companyName: '',
    website: '',
    city: '',
    country: '',
    companySize: '',
    contactEmail: '',
    contactPhone: '',
  });

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
      <Button size="sm" onClick={() => handleSave(section)} data-testid={`button-save-${section}`}>
        <Save className="w-4 h-4 mr-1" />
        {t('common.save')}
      </Button>
    </div>
  );

  const currentData = editBuffer || profile;

  const displayValue = (value: string | undefined) => {
    return value?.trim() ? value : t('emptyState.notSet');
  };

  const getLevelLabel = (level: SkillLevel) => {
    const labels: Record<SkillLevel, string> = {
      junior: t('profile.levelJunior'),
      intermediate: t('profile.levelIntermediate'),
      advance: t('profile.levelAdvance'),
      expert: t('profile.levelExpert'),
    };
    return labels[level];
  };

  const handleSaveSkill = (skill: Skill) => {
    if (skill.id) {
      setGiverProfile(prev => ({
        ...prev,
        skills: prev.skills.map(s => s.id === skill.id ? skill : s),
      }));
    } else {
      setGiverProfile(prev => ({
        ...prev,
        skills: [...prev.skills, { ...skill, id: generateId() }],
      }));
    }
    setSkillDialog({ open: false, skill: null });
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const handleDeleteSkill = (id: string) => {
    setGiverProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
    }));
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const handleSaveExperience = (exp: Experience) => {
    if (exp.id) {
      setGiverProfile(prev => ({
        ...prev,
        experience: prev.experience.map(e => e.id === exp.id ? exp : e),
      }));
    } else {
      setGiverProfile(prev => ({
        ...prev,
        experience: [...prev.experience, { ...exp, id: generateId() }],
      }));
    }
    setExpDialog({ open: false, exp: null });
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const handleDeleteExperience = (id: string) => {
    setGiverProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id),
    }));
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const handleSaveEducation = (edu: Education) => {
    if (edu.id) {
      setGiverProfile(prev => ({
        ...prev,
        education: prev.education.map(e => e.id === edu.id ? edu : e),
      }));
    } else {
      setGiverProfile(prev => ({
        ...prev,
        education: [...prev.education, { ...edu, id: generateId() }],
      }));
    }
    setEduDialog({ open: false, edu: null });
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const handleDeleteEducation = (id: string) => {
    setGiverProfile(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id),
    }));
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const handleSaveCertification = async (cert: Certification) => {
    const token = localStorage.getItem('sinopia_token');
    
    if (cert.id) {
      // Update existing certification (local only for now)
      setGiverProfile(prev => ({
        ...prev,
        certifications: prev.certifications.map(c => c.id === cert.id ? cert : c),
      }));
      setCertDialog({ open: false, cert: null });
      toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
    } else {
      // Add new certification via API
      try {
        // Convert YYYY-MM format to YYYY-MM-DD (first day of month)
        const dateForApi = cert.date ? `${cert.date}-01` : '';
        
        const response = await fetch('/api/certificates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
          body: JSON.stringify({
            name: cert.name,
            authority: cert.authority,
            date: dateForApi,
          }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Use the ID from the server response if available, otherwise generate one
          const newCertId = data.data?.id?.toString() || generateId();
          
          setGiverProfile(prev => ({
            ...prev,
            certifications: [...prev.certifications, { ...cert, id: newCertId }],
          }));
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
        console.error('Failed to add certificate:', error);
        toast({ 
          title: t('common.error'), 
          description: t('profile.saveFailed'),
          variant: 'destructive',
        });
      }
    }
  };

  const handleDeleteCertification = (id: string) => {
    setGiverProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id),
    }));
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const handleSaveProject = (proj: PersonalProject) => {
    if (proj.id) {
      setGiverProfile(prev => ({
        ...prev,
        personalProjects: prev.personalProjects.map(p => p.id === proj.id ? proj : p),
      }));
    } else {
      setGiverProfile(prev => ({
        ...prev,
        personalProjects: [...prev.personalProjects, { ...proj, id: generateId() }],
      }));
    }
    setProjDialog({ open: false, proj: null });
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const handleDeleteProject = (id: string) => {
    setGiverProfile(prev => ({
      ...prev,
      personalProjects: prev.personalProjects.filter(p => p.id !== id),
    }));
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
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

  const handleSaveContact = () => {
    const normalizedUrl = normalizeLinkedInUrl(contactForm.linkedinUrl);
    setGiverProfile(prev => ({
      ...prev,
      jobTitle: contactForm.jobTitle.trim(),
      address: contactForm.address.trim(),
      email: contactForm.email.trim(),
      phone: contactForm.phone.trim(),
      linkedinUrl: normalizedUrl,
    }));
    setContactDialog(false);
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const openContactDialog = () => {
    setContactForm({ 
      jobTitle: giverProfile.jobTitle, 
      address: giverProfile.address, 
      email: giverProfile.email || user?.email || '',
      phone: giverProfile.phone, 
      linkedinUrl: giverProfile.linkedinUrl 
    });
    setContactDialog(true);
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
    });
    setCompanySummaryDialog(true);
  };

  const handleSaveCompanySummary = () => {
    if (companySummaryForm.website && !isValidUrl(companySummaryForm.website)) {
      toast({ title: t('common.error'), description: t('profile.invalidWebsiteUrl'), variant: 'destructive' });
      return;
    }
    setSearcherProfile(prev => ({
      ...prev,
      companyName: companySummaryForm.companyName.trim(),
      website: normalizeUrl(companySummaryForm.website),
      city: companySummaryForm.city.trim(),
      country: companySummaryForm.country.trim(),
      companySize: companySummaryForm.companySize.trim(),
      contactEmail: companySummaryForm.contactEmail.trim(),
      contactPhone: companySummaryForm.contactPhone.trim(),
    }));
    setCompanySummaryDialog(false);
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
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
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockExtractedData = {
        skills: [
          { id: generateId(), name: 'JavaScript', level: 'expert' as SkillLevel },
          { id: generateId(), name: 'React', level: 'advance' as SkillLevel },
          { id: generateId(), name: 'Node.js', level: 'intermediate' as SkillLevel },
        ],
        experience: [
          {
            id: generateId(),
            title: 'Senior Developer',
            company: 'Tech Company',
            startDate: '2020-01',
            endDate: '',
            current: true,
            details: 'Full-stack development with modern technologies.',
          },
        ],
        education: [
          {
            id: generateId(),
            degree: 'Bachelor of Science',
            institution: 'University',
            graduationYear: '2018',
            gpa: '',
          },
        ],
        certifications: [] as Certification[],
      };

      setGiverProfile(prev => ({
        ...prev,
        skills: [...prev.skills, ...mockExtractedData.skills.filter(newSkill => 
          !prev.skills.some(existingSkill => existingSkill.name.toLowerCase() === newSkill.name.toLowerCase())
        )],
        experience: mockExtractedData.experience.length > 0 && prev.experience.length === 0 
          ? mockExtractedData.experience 
          : prev.experience,
        education: mockExtractedData.education.length > 0 && prev.education.length === 0 
          ? mockExtractedData.education 
          : prev.education,
        certifications: mockExtractedData.certifications.length > 0 && prev.certifications.length === 0 
          ? mockExtractedData.certifications 
          : prev.certifications,
      }));

      setCvUploaded(true);
      updateCvStatus(true, file.name, file.size);
      toast({
        title: t('profile.cvUploadSuccess'),
        description: t('profile.cvExtractionComplete'),
      });
    } catch {
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

        <UnderDevelopment className="mb-6" />

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardContent className="pt-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-semibold text-xl">
                {user?.firstName} {user?.lastName}
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
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span data-testid="text-profile-address">{displayValue(giverProfile.address)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span data-testid="text-profile-email">{displayValue(giverProfile.email) !== t('emptyState.notSet') ? giverProfile.email : (user?.email || t('emptyState.notSet'))}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span data-testid="text-profile-phone">{displayValue(giverProfile.phone)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                      {giverProfile.linkedinUrl ? (
                        <a
                          href={giverProfile.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate"
                          data-testid="link-profile-linkedin"
                        >
                          {giverProfile.linkedinUrl.replace('https://', '')}
                        </a>
                      ) : (
                        <span>{t('emptyState.notSet')}</span>
                      )}
                    </div>
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
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span data-testid="text-profile-location">
                        {searcherProfile.city && searcherProfile.country
                          ? `${searcherProfile.city}, ${searcherProfile.country}`
                          : t('profile.locationNotSet')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span data-testid="text-searcher-email">{displayValue(searcherProfile.contactEmail) !== t('emptyState.notSet') ? searcherProfile.contactEmail : (user?.email || t('emptyState.notSet'))}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span data-testid="text-searcher-phone">{displayValue(searcherProfile.contactPhone)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      {searcherProfile.website ? (
                        <a 
                          href={searcherProfile.website} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline truncate"
                          data-testid="link-searcher-website"
                        >
                          {searcherProfile.website.replace('https://', '').replace('http://', '')}
                        </a>
                      ) : (
                        <span>{t('emptyState.notSet')}</span>
                      )}
                    </div>
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
                  {editingSection === 'company' ? (
                    <SectionActions section="company" />
                  ) : (
                    <SectionEditButton section="company" />
                  )}
                </CardHeader>
                <CardContent>
                  {editingSection === 'company' && editBuffer && 'companyName' in editBuffer ? (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t('profile.companyName')}</label>
                          <Input
                            value={editBuffer.companyName}
                            onChange={(e) => setEditBuffer({ ...editBuffer, companyName: e.target.value })}
                            data-testid="input-company-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t('profile.industry')}</label>
                          <Input
                            value={editBuffer.industry}
                            onChange={(e) => setEditBuffer({ ...editBuffer, industry: e.target.value })}
                            data-testid="input-industry"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t('profile.city')}</label>
                          <Input
                            value={editBuffer.city}
                            onChange={(e) => setEditBuffer({ ...editBuffer, city: e.target.value })}
                            data-testid="input-profile-city"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t('profile.country')}</label>
                          <Input
                            value={editBuffer.country}
                            onChange={(e) => setEditBuffer({ ...editBuffer, country: e.target.value })}
                            data-testid="input-profile-country"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t('profile.companySize')}</label>
                          <Input
                            value={editBuffer.companySize}
                            onChange={(e) => setEditBuffer({ ...editBuffer, companySize: e.target.value })}
                            data-testid="input-profile-company-size"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t('profile.website')}</label>
                          <Input
                            value={editBuffer.website}
                            onChange={(e) => setEditBuffer({ ...editBuffer, website: e.target.value })}
                            data-testid="input-website"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t('profile.contactEmail')}</label>
                          <Input
                            type="email"
                            value={editBuffer.contactEmail}
                            onChange={(e) => setEditBuffer({ ...editBuffer, contactEmail: e.target.value })}
                            data-testid="input-contact-email"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{t('profile.contactPhone')}</label>
                          <Input
                            value={editBuffer.contactPhone}
                            onChange={(e) => setEditBuffer({ ...editBuffer, contactPhone: e.target.value })}
                            data-testid="input-contact-phone"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
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
                        <span className="text-muted-foreground">{t('profile.city')}: </span>
                        <span className="font-medium">{displayValue(searcherProfile.city)}</span>
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
                          <span className="font-medium">{t('emptyState.notSet')}</span>
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
                    </div>
                  )}
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
                  
                  {!cvUploaded && !cvFileName ? (
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
                        {cvUploading ? (
                          <>
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            <div className="space-y-1">
                              <p className="text-sm font-medium">{t('profile.cvUploading')}</p>
                              <p className="text-xs text-muted-foreground">{t('profile.cvExtracting')}</p>
                            </div>
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
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
                    rows={4}
                    placeholder={t('profile.bio')}
                    data-testid="input-profile-bio"
                  />
                ) : (
                  <p className="text-muted-foreground">
                    {profile.bio?.trim() ? profile.bio : t('emptyState.notSet')}
                  </p>
                )}
              </CardContent>
            </Card>


            {isSkillGiver && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    {t('profile.skills')}
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSkillDialog({ open: true, skill: null })}
                    data-testid="button-add-skill"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    {t('profile.addSkill')}
                  </Button>
                </CardHeader>
                <CardContent>
                  {giverProfile.skills.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noSkills')}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {giverProfile.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border"
                          data-testid={`skill-item-${skill.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium">{skill.name}</p>
                              <Badge variant="secondary" className="text-xs">
                                {getLevelLabel(skill.level)}
                              </Badge>
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
                              {proj.technologies.split(',').map((tech, i) => (
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
          </div>
        </div>
      </div>

      <ContactDialog
        open={contactDialog}
        onOpenChange={setContactDialog}
        form={contactForm}
        setForm={setContactForm}
        onSave={handleSaveContact}
        t={t}
      />

      <SkillDialog
        open={skillDialog.open}
        onOpenChange={(open) => setSkillDialog({ open, skill: null })}
        skill={skillDialog.skill}
        onSave={handleSaveSkill}
        t={t}
        getLevelLabel={getLevelLabel}
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

function ContactDialog({ open, onOpenChange, form, setForm, onSave, t }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: { jobTitle: string; address: string; email: string; phone: string; linkedinUrl: string };
  setForm: (form: { jobTitle: string; address: string; email: string; phone: string; linkedinUrl: string }) => void;
  onSave: () => void;
  t: (key: string) => string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('profile.editContactInfo')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('profile.jobTitle')}</Label>
            <Input
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              placeholder={t('profile.jobTitlePlaceholder')}
              data-testid="input-contact-job-title"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.address')}</Label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder={t('profile.addressPlaceholder')}
              data-testid="input-contact-address"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.email')}</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t('profile.emailPlaceholder')}
              data-testid="input-contact-email"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.phone')}</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder={t('profile.phonePlaceholder')}
              data-testid="input-contact-phone"
            />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.linkedinUrl')}</Label>
            <Input
              value={form.linkedinUrl}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              placeholder={t('profile.linkedinPlaceholder')}
              data-testid="input-contact-linkedin"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel')}</Button>
          <Button onClick={onSave}>{t('common.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SkillDialog({ open, onOpenChange, skill, onSave, t, getLevelLabel }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: Skill | null;
  onSave: (skill: Skill) => void;
  t: (key: string) => string;
  getLevelLabel: (level: SkillLevel) => string;
}) {
  const [form, setForm] = useState<Skill>({ id: '', name: '', level: 'intermediate' });

  useEffect(() => {
    if (skill) {
      setForm(skill);
    } else {
      setForm({ id: '', name: '', level: 'intermediate' });
    }
  }, [skill, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{skill ? t('profile.skills') : t('profile.addSkill')}</DialogTitle>
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
            <Label>{t('profile.skillLevel')}</Label>
            <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v as SkillLevel })}>
              <SelectTrigger data-testid="select-skill-level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">{getLevelLabel('junior')}</SelectItem>
                <SelectItem value="intermediate">{getLevelLabel('intermediate')}</SelectItem>
                <SelectItem value="advance">{getLevelLabel('advance')}</SelectItem>
                <SelectItem value="expert">{getLevelLabel('expert')}</SelectItem>
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
  const [form, setForm] = useState<PersonalProject>({ id: '', name: '', description: '', technologies: '', duration: '' });

  useEffect(() => {
    if (proj) {
      setForm(proj);
    } else {
      setForm({ id: '', name: '', description: '', technologies: '', duration: '' });
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
  form: { companyName: string; website: string; city: string; country: string; companySize: string; contactEmail: string; contactPhone: string };
  setForm: (form: { companyName: string; website: string; city: string; country: string; companySize: string; contactEmail: string; contactPhone: string }) => void;
  onSave: () => void;
  t: (key: string) => string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('profile.editCompanyInfo')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
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
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t('profile.city')}</Label>
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder={t('profile.cityPlaceholder')}
                data-testid="input-summary-city"
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
            <Input
              value={form.companySize}
              onChange={(e) => setForm({ ...form, companySize: e.target.value })}
              placeholder={t('profile.companySizePlaceholder')}
              data-testid="input-summary-company-size"
            />
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel')}</Button>
          <Button onClick={onSave} data-testid="button-save-company-summary">{t('common.save')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
