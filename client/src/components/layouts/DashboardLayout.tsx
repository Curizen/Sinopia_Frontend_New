import { type ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { useI18n } from '@/i18n';
import sinopiaLogo from '@assets/sinopia_logo.png';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Handshake,
  CreditCard,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Settings,
  Home,
} from 'lucide-react';
import { ChatWidget } from '@/components/ChatWidget';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [location, setLocation] = useLocation();
  const { t, language, setLanguage } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSkillGiver = user?.role === 'skill_giver';

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const allNavItems = [
    { href: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { href: '/projects', labelKey: 'nav.projects', icon: FolderKanban },
    { href: '/offers', labelKey: 'nav.offers', icon: FileText, skillGiverOnly: true },
    { href: '/contracts', labelKey: 'nav.contracts', icon: Handshake },
    { href: '/payments', labelKey: 'nav.payments', icon: CreditCard },
    { href: '/notifications', labelKey: 'nav.notifications', icon: Bell, badge: unreadCount },
    { href: '/profile', labelKey: 'nav.profile', icon: User },
  ];

  const navItems = allNavItems.filter(item => !item.skillGiverOnly || isSkillGiver);

  const handleLogout = async () => {
    await logout();
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setLocation('/sign-in');
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setLocation('/');
  };

  const handleSettingsClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setLocation('/settings');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src={sinopiaLogo} 
                alt="Sinopia Logo" 
                className="w-12 h-auto rounded-md object-cover"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  data-testid={`nav-${item.labelKey.split('.')[1]}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{t(item.labelKey)}</span>
                  {item.badge ? (
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-xs font-medium px-2"
              data-testid="button-language-toggle-dashboard"
            >
              {language === 'en' ? 'DE' : 'EN'}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="button-user-menu"
                >
                  <User className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isSkillGiver ? t('auth.skillGiver') : t('auth.skillSearcher')}
                  </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleHomeClick}
                  className="cursor-pointer"
                  data-testid="link-home-from-dropdown"
                >
                  <Home className="w-4 h-4 mr-2" />
                  {t('nav.home')}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleSettingsClick}
                  className="cursor-pointer"
                  data-testid="link-settings"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t('settings.title')}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer"
                  data-testid="button-logout"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('nav.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <nav className="flex flex-col py-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                data-testid="mobile-nav-home"
              >
                <Home className="w-5 h-5" />
                <span className="flex-1">{t('nav.home')}</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    location === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${item.labelKey.split('.')[1]}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{t(item.labelKey)}</span>
                  {item.badge ? (
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
              <Link
                href="/settings"
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  location === '/settings'
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-nav-settings"
              >
                <Settings className="w-5 h-5" />
                <span className="flex-1">{t('settings.title')}</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6">
        {children}
      </main>

      {/* AI Chat Widget - Available for all authenticated users */}
      <ChatWidget />
    </div>
  );
}
