import { type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { useI18n } from '@/i18n';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
  Settings,
  Menu,
  Home,
  Info,
  Mail,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [location, setLocation] = useLocation();
  const { t, language, setLanguage } = useI18n();

  const isSkillGiver = user?.role === 'skill_giver';

  const navItems = [
    { href: '/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { href: '/projects', labelKey: 'nav.projects', icon: FolderKanban },
    { href: '/offers', labelKey: 'nav.offers', icon: FileText },
    { href: '/contracts', labelKey: 'nav.contracts', icon: Handshake },
    { href: '/payments', labelKey: 'nav.payments', icon: CreditCard },
    { href: '/notifications', labelKey: 'nav.notifications', icon: Bell, badge: unreadCount },
    { href: '/profile', labelKey: 'nav.profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  const currentNav = navItems.find((item) => item.href === location);
  const pageTitle = currentNav ? t(currentNav.labelKey) : t('nav.dashboard');

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-background">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="https://curizen.com/products/sinopia2025/images/logo_sinopia.png" 
              alt="Sinopia Logo" 
              className="w-16 h-auto rounded-md object-cover"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-4 ml-2">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${location === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors ${location === '/about' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              data-testid="nav-about"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors ${location === '/contact' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              data-testid="nav-contact"
            >
              Contact
            </Link>
          </nav>

          <span className="hidden md:inline text-muted-foreground">|</span>
          <h1 className="text-xl font-semibold capitalize hidden md:block">
            {pageTitle}
          </h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                data-testid="button-mobile-menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/about" className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-xs font-medium px-2"
            data-testid="button-language-toggle-dashboard"
          >
            {language === 'en' ? 'DE' : 'EN'}
          </Button>

          <Link href="/notifications">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              data-testid="button-notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                data-testid="button-user-menu"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
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

              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className="cursor-pointer"
                  data-testid={`dropdown-nav-${item.labelKey.split('.')[1]}`}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    <span className="flex-1">{t(item.labelKey)}</span>
                    {item.badge ? (
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>{t('profile.settings')}</span>
                </Link>
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
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
