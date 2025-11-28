import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
} from 'lucide-react';

// todo: remove mock functionality
const mockSkillGiverProfile = {
  bio: 'Experienced full-stack developer with 8+ years in building web and mobile applications. Passionate about clean code and user-centric design.',
  title: 'Senior Full-Stack Developer',
  hourlyRate: 85,
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
  location: 'San Francisco, CA',
  availability: 'Full-time',
  experience: [
    { id: '1', company: 'TechCorp', role: 'Senior Developer', startDate: '2020-01', endDate: '', current: true, description: 'Leading frontend development' },
    { id: '2', company: 'StartupXYZ', role: 'Full-Stack Developer', startDate: '2017-03', endDate: '2019-12', current: false, description: 'Built core product features' },
  ],
  education: [
    { id: '1', institution: 'Stanford University', degree: 'M.S.', field: 'Computer Science', startDate: '2014', endDate: '2016' },
    { id: '2', institution: 'UC Berkeley', degree: 'B.S.', field: 'Computer Science', startDate: '2010', endDate: '2014' },
  ],
  certifications: [
    { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023-05' },
    { id: '2', name: 'Google Cloud Professional', issuer: 'Google', date: '2022-08' },
  ],
};

const mockSkillSearcherProfile = {
  companyName: 'TechCorp Inc.',
  industry: 'Technology',
  website: 'https://techcorp.example.com',
  bio: 'Leading technology company specializing in innovative software solutions for enterprise clients.',
  contactEmail: 'hiring@techcorp.com',
  contactPhone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
};

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const isSkillGiver = user?.role === 'skill_giver';
  const [profile, setProfile] = useState(isSkillGiver ? mockSkillGiverProfile : mockSkillSearcherProfile);

  const handleSave = () => {
    // todo: remove mock functionality
    toast({
      title: 'Profile updated!',
      description: 'Your changes have been saved successfully.',
    });
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && isSkillGiver && 'skills' in profile) {
      setProfile(prev => ({
        ...prev,
        skills: [...(prev as typeof mockSkillGiverProfile).skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    if (isSkillGiver && 'skills' in profile) {
      setProfile(prev => ({
        ...prev,
        skills: (prev as typeof mockSkillGiverProfile).skills.filter(s => s !== skill),
      }));
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">Profile</h1>
            <p className="text-muted-foreground">
              Manage your {isSkillGiver ? 'professional profile' : 'company profile'}
            </p>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} data-testid="button-save-profile">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} data-testid="button-edit-profile">
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
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

              {isSkillGiver && 'hourlyRate' in profile && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  <p className="text-2xl font-bold text-primary">${profile.hourlyRate}/hr</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    data-testid="input-profile-bio"
                  />
                ) : (
                  <p className="text-muted-foreground">{profile.bio}</p>
                )}
              </CardContent>
            </Card>

            {isSkillGiver && 'skills' in profile && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        {isEditing && (
                          <button onClick={() => handleRemoveSkill(skill)}>
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2 mt-4">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                        data-testid="input-add-skill"
                      />
                      <Button type="button" variant="outline" onClick={handleAddSkill}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {isSkillGiver && 'experience' in profile && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Experience
                  </CardTitle>
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
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </CardTitle>
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
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certifications
                  </CardTitle>
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
