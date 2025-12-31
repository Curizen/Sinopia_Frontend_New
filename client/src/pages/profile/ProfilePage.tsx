import { useState } from 'react';
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
} from 'lucide-react';
import { UnderDevelopment } from '@/components/common/UnderDevelopment';

type EditingSection = 'about' | 'skills' | 'experience' | 'education' | 'certifications' | 'company' | null;

interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

interface SkillGiverProfile {
  bio: string;
  title: string;
  skills: string[];
  location: string;
  availability: string;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
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

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useI18n();
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [newSkill, setNewSkill] = useState('');

  const isSkillGiver = user?.role === 'skill_giver';

  const emptySkillGiverProfile: SkillGiverProfile = {
    bio: '',
    title: '',
    skills: [],
    location: '',
    availability: '',
    experience: [],
    education: [],
    certifications: [],
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

  const [giverProfile, setGiverProfile] = useState<SkillGiverProfile>(emptySkillGiverProfile);
  const [searcherProfile, setSearcherProfile] = useState<SkillSearcherProfile>(emptySkillSearcherProfile);
  const [editBuffer, setEditBuffer] = useState<SkillGiverProfile | SkillSearcherProfile | null>(null);

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
    setNewSkill('');
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && editBuffer && 'skills' in editBuffer) {
      setEditBuffer({
        ...editBuffer,
        skills: [...editBuffer.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    if (editBuffer && 'skills' in editBuffer) {
      setEditBuffer({
        ...editBuffer,
        skills: editBuffer.skills.filter(s => s !== skill),
      });
    }
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
              {isSkillGiver && 'title' in profile && (
                <p className="text-muted-foreground">{displayValue(profile.title)}</p>
              )}
              {!isSkillGiver && 'companyName' in profile && (
                <p className="text-muted-foreground">{displayValue(profile.companyName)}</p>
              )}

              <div className="mt-6 space-y-3 text-left">
                {isSkillGiver && 'location' in profile && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{displayValue(profile.location)}</span>
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
                {!isSkillGiver && 'contactPhone' in profile && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{displayValue(profile.contactPhone)}</span>
                  </div>
                )}
                {!isSkillGiver && 'website' in profile && profile.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a href={profile.website} className="text-primary hover:underline">
                      {profile.website.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            {!isSkillGiver && 'companyName' in profile && (
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
                        <span className="font-medium">{displayValue(profile.companySize)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profile.industry')}: </span>
                        <span className="font-medium">{displayValue(profile.industry)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profile.city')}: </span>
                        <span className="font-medium">{displayValue(profile.city)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profile.country')}: </span>
                        <span className="font-medium">{displayValue(profile.country)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profile.companyName')}: </span>
                        <span className="font-medium">{displayValue(profile.companyName)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profile.contactEmail')}: </span>
                        <span className="font-medium">{displayValue(profile.contactEmail)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profile.contactPhone')}: </span>
                        <span className="font-medium">{displayValue(profile.contactPhone)}</span>
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

            {isSkillGiver && 'skills' in profile && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle>{t('profile.skills')}</CardTitle>
                  {editingSection === 'skills' ? (
                    <SectionActions section="skills" />
                  ) : (
                    <SectionEditButton section="skills" />
                  )}
                </CardHeader>
                <CardContent>
                  {(editingSection === 'skills' && editBuffer && 'skills' in editBuffer
                    ? editBuffer.skills
                    : profile.skills
                  ).length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noSkills')}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(editingSection === 'skills' && editBuffer && 'skills' in editBuffer
                        ? editBuffer.skills
                        : profile.skills
                      ).map((skill) => (
                        <Badge key={skill} variant="secondary" className="gap-1">
                          {skill}
                          {editingSection === 'skills' && (
                            <button onClick={() => handleRemoveSkill(skill)} data-testid={`button-remove-skill-${skill}`}>
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {editingSection === 'skills' && (
                    <div className="flex gap-2 mt-4">
                      <Input
                        placeholder={t('profile.addSkill')}
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                        data-testid="input-add-skill"
                      />
                      <Button type="button" variant="outline" onClick={handleAddSkill} data-testid="button-add-skill">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && 'experience' in profile && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    {t('profile.experience')}
                  </CardTitle>
                  {editingSection === 'experience' ? (
                    <SectionActions section="experience" />
                  ) : (
                    <SectionEditButton section="experience" />
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.experience.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noExperience')}
                    </p>
                  ) : (
                    profile.experience.map((exp) => (
                      <div key={exp.id} className="flex gap-4 p-4 rounded-lg border border-border">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{exp.role}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {exp.startDate} - {exp.current ? t('profile.present') : exp.endDate}
                          </p>
                          {exp.description && (
                            <p className="text-sm mt-2">{exp.description}</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && 'education' in profile && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    {t('profile.education')}
                  </CardTitle>
                  {editingSection === 'education' ? (
                    <SectionActions section="education" />
                  ) : (
                    <SectionEditButton section="education" />
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.education.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noEducation')}
                    </p>
                  ) : (
                    profile.education.map((edu) => (
                      <div key={edu.id} className="flex gap-4 p-4 rounded-lg border border-border">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {edu.startDate} - {edu.endDate}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && 'certifications' in profile && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    {t('profile.certifications')}
                  </CardTitle>
                  {editingSection === 'certifications' ? (
                    <SectionActions section="certifications" />
                  ) : (
                    <SectionEditButton section="certifications" />
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.certifications.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t('emptyState.noCertifications')}
                    </p>
                  ) : (
                    profile.certifications.map((cert) => (
                      <div key={cert.id} className="flex gap-4 p-4 rounded-lg border border-border">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
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
    </DashboardLayout>
  );
}
