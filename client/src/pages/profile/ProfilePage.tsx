import { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
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

type EditingSection = 'about' | 'skills' | 'experience' | 'education' | 'certifications' | 'company' | null;

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, language } = useI18n();
  const [editingSection, setEditingSection] = useState<EditingSection>(null);
  const [newSkill, setNewSkill] = useState('');

  const isSkillGiver = user?.role === 'skill_giver';

  const mockSkillGiverProfile = useMemo(() => ({
    bio: t('profile.mock.giverBio'),
    title: t('profile.mock.giverTitle'),
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
    location: t('profile.mock.giverLocation'),
    availability: t('profile.mock.giverAvailability'),
    experience: [
      { id: '1', company: t('profile.mock.experience1Company'), role: t('profile.mock.experience1Role'), startDate: '2020-01', endDate: '', current: true, description: t('profile.mock.experience1Desc') },
      { id: '2', company: t('profile.mock.experience2Company'), role: t('profile.mock.experience2Role'), startDate: '2017-03', endDate: '2019-12', current: false, description: t('profile.mock.experience2Desc') },
    ],
    education: [
      { id: '1', institution: 'Stanford University', degree: 'M.S.', field: 'Computer Science', startDate: '2014', endDate: '2016' },
      { id: '2', institution: 'UC Berkeley', degree: 'B.S.', field: 'Computer Science', startDate: '2010', endDate: '2014' },
    ],
    certifications: [
      { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023-05' },
      { id: '2', name: 'Google Cloud Professional', issuer: 'Google', date: '2022-08' },
    ],
  }), [language, t]);

  const mockSkillSearcherProfile = useMemo(() => ({
    companyName: t('profile.mock.searcherCompany'),
    industry: t('profile.mock.searcherIndustry'),
    website: 'https://techcorp.example.com',
    bio: t('profile.mock.searcherBio'),
    contactEmail: 'hiring@techcorp.com',
    contactPhone: '+49 1512 847 6390',
    location: t('profile.mock.giverLocation'),
  }), [language, t]);

  const [profile, setProfile] = useState(isSkillGiver ? mockSkillGiverProfile : mockSkillSearcherProfile);
  const [editBuffer, setEditBuffer] = useState<typeof profile | null>(null);

  useEffect(() => {
    setProfile(isSkillGiver ? mockSkillGiverProfile : mockSkillSearcherProfile);
  }, [language, isSkillGiver, mockSkillGiverProfile, mockSkillSearcherProfile]);

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
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-semibold text-xl">
                {user?.firstName} {user?.lastName}
              </h2>
              {isSkillGiver && 'title' in profile && (
                <p className="text-muted-foreground">{profile.title}</p>
              )}
              {!isSkillGiver && 'companyName' in profile && (
                <p className="text-muted-foreground">{profile.companyName}</p>
              )}

              <div className="mt-6 space-y-3 text-left">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
                {!isSkillGiver && 'contactPhone' in profile && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.contactPhone}</span>
                  </div>
                )}
                {!isSkillGiver && 'website' in profile && (
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
                    data-testid="input-profile-bio"
                  />
                ) : (
                  <p className="text-muted-foreground">{profile.bio}</p>
                )}
              </CardContent>
            </Card>

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
                      <div className="space-y-2">
                        <label className="text-sm font-medium">{t('profile.website')}</label>
                        <Input
                          value={editBuffer.website}
                          onChange={(e) => setEditBuffer({ ...editBuffer, website: e.target.value })}
                          data-testid="input-website"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">{t('profile.companyName')}: </span>
                        <span className="font-medium">{profile.companyName}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profile.industry')}: </span>
                        <span className="font-medium">{profile.industry}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profile.contactEmail')}: </span>
                        <span className="font-medium">{profile.contactEmail}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('profile.contactPhone')}: </span>
                        <span className="font-medium">{profile.contactPhone}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

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
                  {profile.experience.map((exp) => (
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
                  ))}
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
                  {profile.education.map((edu) => (
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
                  ))}
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
                  {profile.certifications.map((cert) => (
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
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
