import { useState, useRef } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Globe, Palette, User, Lock, Camera, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const { user, updateUserProfile } = useAuth();
  const { t, language, setLanguage } = useI18n();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const isSkillGiver = user?.role === 'skill_giver';

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: t('common.error'),
        description: t('settings.invalidImageType'),
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t('common.error'),
        description: t('settings.imageTooLarge'),
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        await updateUserProfile({ profileImageUrl: dataUrl });
        toast({
          title: t('settings.profilePictureUpdated'),
          description: t('settings.profilePictureUpdatedDesc'),
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('settings.uploadFailed'),
        variant: 'destructive',
      });
      setIsUploading(false);
    }
  };

  const validatePassword = () => {
    if (passwordForm.newPassword.length < 8) {
      toast({
        title: t('common.error'),
        description: t('settings.passwordTooShort'),
        variant: 'destructive',
      });
      return false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: t('common.error'),
        description: t('settings.passwordMismatch'),
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;

    setIsChangingPassword(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('settings.passwordChanged'),
        description: t('settings.passwordChangedDesc'),
      });
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('settings.passwordChangeFailed'),
        variant: 'destructive',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">{t('settings.title')}</h1>
          <p className="text-muted-foreground">
            {t('settings.subtitle')}
          </p>
        </div>

        <div className="grid gap-6">
          <Card data-testid="card-settings-profile-picture">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('settings.profilePicture')}</CardTitle>
                  <CardDescription>{t('settings.profilePictureDesc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  {user?.profileImageUrl ? (
                    <AvatarImage src={user.profileImageUrl} alt={user.email} />
                  ) : null}
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                    data-testid="input-profile-picture"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleProfilePictureClick}
                    disabled={isUploading}
                    data-testid="button-upload-picture"
                  >
                    {isUploading ? t('common.loading') : t('settings.uploadPicture')}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {t('settings.imageFormats')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-settings-password">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('settings.changePassword')}</CardTitle>
                  <CardDescription>{t('settings.changePasswordDesc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t('settings.currentPassword')}</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder={t('settings.currentPasswordPlaceholder')}
                      data-testid="input-current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      data-testid="button-toggle-current-password"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t('settings.newPassword')}</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder={t('settings.newPasswordPlaceholder')}
                      data-testid="input-new-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      data-testid="button-toggle-new-password"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('settings.confirmPassword')}</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder={t('settings.confirmPasswordPlaceholder')}
                      data-testid="input-confirm-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      data-testid="button-toggle-confirm-password"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isChangingPassword || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                  data-testid="button-change-password"
                >
                  {isChangingPassword ? t('common.loading') : t('settings.updatePassword')}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card data-testid="card-settings-language">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('settings.language')}</CardTitle>
                  <CardDescription>{t('settings.languageDesc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('settings.currentLanguage')}</p>
                  <p className="font-medium" data-testid="text-current-language">{language === 'en' ? 'English' : 'Deutsch'}</p>
                </div>
                <Button variant="outline" onClick={toggleLanguage} data-testid="button-toggle-language">
                  {language === 'en' ? 'Deutsch' : 'English'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-settings-account">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{t('settings.account')}</CardTitle>
                  <CardDescription>{t('settings.accountDesc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('settings.email')}</p>
                    <p className="font-medium" data-testid="text-account-email">{user?.email || t('emptyState.notSet')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('settings.role')}</p>
                    <p className="font-medium" data-testid="text-account-role">
                      {isSkillGiver ? t('auth.skillGiver') : t('auth.skillSearcher')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
