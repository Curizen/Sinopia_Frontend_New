import { useState, useEffect } from 'react';
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
  Palette,
  Database,
  Cloud,
  Megaphone,
  FolderKanban,
  Trash2,
} from 'lucide-react';
import { UnderDevelopment } from '@/components/common/UnderDevelopment';

type EditingSection = 'about' | 'skills' | 'experience' | 'education' | 'certifications' | 'company' | 'contact' | 'projects' | null;
type SkillLevel = 'junior' | 'intermediate' | 'advance' | 'expert';
type SkillIconKey = 'code' | 'design' | 'database' | 'cloud' | 'marketing' | 'pm';

interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
  icon: SkillIconKey;
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
  title: string;
  location: string;
  availability: string;
  phone: string;
  linkedinUrl: string;
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

const skillIcons: Record<SkillIconKey, React.ComponentType<{ className?: string }>> = {
  code: Code,
  design: Palette,
  database: Database,
  cloud: Cloud,
  marketing: Megaphone,
  pm: FolderKanban,
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [editingSection, setEditingSection] = useState<EditingSection>(null);

  const isSkillGiver = user?.role === 'skill_giver';

  const emptySkillGiverProfile: SkillGiverProfile = {
    bio: '',
    title: '',
    location: '',
    availability: '',
    phone: '',
    linkedinUrl: '',
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    personalProjects: [],
  };

  const emptySkillSearcherProfile: SkillSearcherProfile = {
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
  };

  const loadGiverProfile = (): SkillGiverProfile => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...emptySkillGiverProfile, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Failed to load profile:', e);
    }
    return emptySkillGiverProfile;
  };

  const [giverProfile, setGiverProfile] = useState<SkillGiverProfile>(loadGiverProfile);
  const [searcherProfile, setSearcherProfile] = useState<SkillSearcherProfile>(emptySkillSearcherProfile);
  const [editBuffer, setEditBuffer] = useState<SkillGiverProfile | SkillSearcherProfile | null>(null);

  const [skillDialog, setSkillDialog] = useState<{ open: boolean; skill: Skill | null }>({ open: false, skill: null });
  const [expDialog, setExpDialog] = useState<{ open: boolean; exp: Experience | null }>({ open: false, exp: null });
  const [eduDialog, setEduDialog] = useState<{ open: boolean; edu: Education | null }>({ open: false, edu: null });
  const [certDialog, setCertDialog] = useState<{ open: boolean; cert: Certification | null }>({ open: false, cert: null });
  const [projDialog, setProjDialog] = useState<{ open: boolean; proj: PersonalProject | null }>({ open: false, proj: null });
  const [contactDialog, setContactDialog] = useState(false);

  const [contactForm, setContactForm] = useState({ phone: '', linkedinUrl: '' });

  useEffect(() => {
    if (isSkillGiver) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(giverProfile));
    }
  }, [giverProfile, isSkillGiver]);

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

  const getIconLabel = (icon: SkillIconKey) => {
    const labels: Record<SkillIconKey, string> = {
      code: t('profile.iconCode'),
      design: t('profile.iconDesign'),
      database: t('profile.iconDatabase'),
      cloud: t('profile.iconCloud'),
      marketing: t('profile.iconMarketing'),
      pm: t('profile.iconPM'),
    };
    return labels[icon];
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

  const handleSaveCertification = (cert: Certification) => {
    if (cert.id) {
      setGiverProfile(prev => ({
        ...prev,
        certifications: prev.certifications.map(c => c.id === cert.id ? cert : c),
      }));
    } else {
      setGiverProfile(prev => ({
        ...prev,
        certifications: [...prev.certifications, { ...cert, id: generateId() }],
      }));
    }
    setCertDialog({ open: false, cert: null });
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
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

  const handleSaveContact = () => {
    let url = contactForm.linkedinUrl.trim();
    if (url && !url.startsWith('http')) {
      url = 'https://' + url;
    }
    setGiverProfile(prev => ({
      ...prev,
      phone: contactForm.phone.trim(),
      linkedinUrl: url,
    }));
    setContactDialog(false);
    toast({ title: t('profile.profileUpdated'), description: t('profile.changesSaved') });
  };

  const openContactDialog = () => {
    setContactForm({ phone: giverProfile.phone, linkedinUrl: giverProfile.linkedinUrl });
    setContactDialog(true);
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
                <p className="text-muted-foreground">{displayValue(giverProfile.title)}</p>
              )}
              {!isSkillGiver && (
                <p className="text-muted-foreground">{displayValue(searcherProfile.companyName)}</p>
              )}

              <div className="mt-6 space-y-3 text-left">
                {isSkillGiver && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{displayValue(giverProfile.location)}</span>
                  </div>
                )}
                {!isSkillGiver && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span data-testid="text-profile-location">
                      {user?.city && user?.country
                        ? `${user.city}, ${user.country}`
                        : t('profile.locationNotSet')}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.email || t('emptyState.notSet')}</span>
                </div>

                {isSkillGiver && (
                  <>
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
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{displayValue(searcherProfile.contactPhone)}</span>
                    </div>
                    {searcherProfile.website && (
                      <div className="flex items-center gap-3 text-sm">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <a href={searcherProfile.website} className="text-primary hover:underline">
                          {searcherProfile.website.replace('https://', '')}
                        </a>
                      </div>
                    )}
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
                  <CardTitle>{t('profile.skills')}</CardTitle>
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
                      {giverProfile.skills.map((skill) => {
                        const IconComponent = skillIcons[skill.icon];
                        return (
                          <div
                            key={skill.id}
                            className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border"
                            data-testid={`skill-item-${skill.id}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                <IconComponent className="w-4 h-4 text-primary" />
                              </div>
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
                        );
                      })}
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
        getIconLabel={getIconLabel}
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
    </DashboardLayout>
  );
}

function ContactDialog({ open, onOpenChange, form, setForm, onSave, t }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: { phone: string; linkedinUrl: string };
  setForm: (form: { phone: string; linkedinUrl: string }) => void;
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

function SkillDialog({ open, onOpenChange, skill, onSave, t, getLevelLabel, getIconLabel }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: Skill | null;
  onSave: (skill: Skill) => void;
  t: (key: string) => string;
  getLevelLabel: (level: SkillLevel) => string;
  getIconLabel: (icon: SkillIconKey) => string;
}) {
  const [form, setForm] = useState<Skill>({ id: '', name: '', level: 'intermediate', icon: 'code' });

  useEffect(() => {
    if (skill) {
      setForm(skill);
    } else {
      setForm({ id: '', name: '', level: 'intermediate', icon: 'code' });
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
          <div className="space-y-2">
            <Label>{t('profile.skillIcon')}</Label>
            <Select value={form.icon} onValueChange={(v) => setForm({ ...form, icon: v as SkillIconKey })}>
              <SelectTrigger data-testid="select-skill-icon">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="code">{getIconLabel('code')}</SelectItem>
                <SelectItem value="design">{getIconLabel('design')}</SelectItem>
                <SelectItem value="database">{getIconLabel('database')}</SelectItem>
                <SelectItem value="cloud">{getIconLabel('cloud')}</SelectItem>
                <SelectItem value="marketing">{getIconLabel('marketing')}</SelectItem>
                <SelectItem value="pm">{getIconLabel('pm')}</SelectItem>
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
