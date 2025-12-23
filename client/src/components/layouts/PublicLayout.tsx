import { type ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, LayoutDashboard, User, LogOut } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useAuth } from '@/context/AuthContext';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useI18n();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', labelKey: 'nav.home' },
    { href: '/about', labelKey: 'nav.about' },
    { href: '/vision', labelKey: 'nav.vision' },
    { href: '/imprint', labelKey: 'nav.imprint' },
    { href: '/contact', labelKey: 'nav.contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src="https://curizen.com/products/sinopia2025/images/logo_sinopia.png" 
                alt="Sinopia Logo" 
                className="w-16 h-auto rounded-md object-cover"
              />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    location === link.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  data-testid={`link-nav-${link.labelKey.split('.')[1]}`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-xs font-medium px-2"
                data-testid="button-language-toggle"
              >
                {language === 'en' ? 'DE' : 'EN'}
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2"
                      data-testid="button-user-avatar"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {user?.firstName?.[0]}
                          {user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>{t('nav.dashboard')}</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{t('nav.profile')}</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-destructive cursor-pointer"
                      data-testid="button-logout-public"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t('nav.signOut')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant="ghost" data-testid="button-sign-in">
                      {t('nav.signIn')}
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button data-testid="button-sign-up">{t('nav.getStarted')}</Button>
                  </Link>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium ${
                      location === link.href ? 'text-primary' : 'text-muted-foreground'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(link.labelKey)}
                  </Link>
                ))}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleLanguage}
                    className="text-xs"
                    data-testid="button-language-toggle-mobile"
                  >
                    {language === 'en' ? 'Deutsch' : 'English'}
                  </Button>
                </div>

                {isAuthenticated ? (
                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        {t('nav.dashboard')}
                      </Button>
                    </Link>
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-2">
                        <User className="w-4 h-4" />
                        {t('nav.profile')}
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 text-destructive" 
                      onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.signOut')}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full">{t('nav.signIn')}</Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">{t('nav.getStarted')}</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/terms" 
                className="text-muted-foreground hover:text-foreground transition-colors" 
                data-testid="link-footer-terms"
              >
                {t('footer.terms')}
              </Link>
              <Link 
                href="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors" 
                data-testid="link-footer-privacy"
              >
                {t('footer.privacy')}
              </Link>
              <Link 
                href="/contact" 
                className="text-muted-foreground hover:text-foreground transition-colors" 
                data-testid="link-footer-contact"
              >
                {t('footer.contactUs')}
              </Link>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Sinopia. {t('footer.copyright')}</p>
            </div>

            <div className="text-center">
              <a
                href="https://curizen.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                data-testid="link-powered-by"
              >
                {t('footer.poweredBy')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
