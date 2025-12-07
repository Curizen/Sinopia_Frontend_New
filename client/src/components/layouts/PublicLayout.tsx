import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useI18n } from '@/i18n';

function GermanFlag() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <circle cx="16" cy="16" r="16" fill="#FFCE00" />
      <path d="M0,16 a16,16 0 0,1 32,0" fill="#000" />
      <path d="M0,16 a16,16 0 0,1 32,0" fill="#DD0000" transform="translate(0, 5.33)" />
    </svg>
  );
}

function EnglishFlag() {
  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <circle cx="16" cy="16" r="16" fill="#012169" />
      <path d="M16,0 L16,32 M0,16 L32,16" stroke="#fff" strokeWidth="6" />
      <path d="M16,0 L16,32 M0,16 L32,16" stroke="#C8102E" strokeWidth="3" />
      <path d="M0,0 L32,32 M32,0 L0,32" stroke="#fff" strokeWidth="3" />
      <path d="M0,0 L32,32 M32,0 L0,32" stroke="#C8102E" strokeWidth="1.5" />
    </svg>
  );
}

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useI18n();

  const navLinks = [
    { href: '/', labelKey: 'nav.home' },
    { href: '/about', labelKey: 'nav.about' },
    { href: '/contact', labelKey: 'nav.contact' },
  ];

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
              <button
                onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-border hover:border-primary transition-colors flex items-center justify-center"
                data-testid="button-language-toggle"
                title={language === 'en' ? t('common.switchToGerman') : t('common.switchToEnglish')}
              >
                {language === 'en' ? <GermanFlag /> : <EnglishFlag />}
              </button>
              <Link href="/sign-in">
                <Button variant="ghost" data-testid="button-sign-in">
                  {t('nav.signIn')}
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button data-testid="button-sign-up">{t('nav.getStarted')}</Button>
              </Link>
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
                <div className="flex items-center gap-3 py-2">
                  <span className="text-sm text-muted-foreground">{t('common.language')}:</span>
                  <button
                    onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-border hover:border-primary transition-colors flex items-center justify-center"
                    data-testid="button-mobile-language-toggle"
                  >
                    {language === 'en' ? <GermanFlag /> : <EnglishFlag />}
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'EN' : 'DE'}
                  </span>
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">{t('nav.signIn')}</Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">{t('nav.getStarted')}</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://curizen.com/products/sinopia2025/images/logo_sinopia.png" 
                  alt="Sinopia Logo" 
                  className="w-16 h-auto rounded-md object-cover"
                />
                <span className="font-display font-bold text-xl">{t('common.appName')}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.skillGiver')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/sign-up" className="hover:text-foreground">{t('footer.findProjects')}</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground">{t('footer.buildPortfolio')}</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground">{t('footer.getPaid')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.skillSearcher')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/sign-up" className="hover:text-foreground">{t('footer.postProjects')}</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground">{t('footer.findTalent')}</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground">{t('footer.manageTeams')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms" className="hover:text-foreground">{t('footer.terms')}</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground">{t('footer.privacy')}</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">{t('footer.contactUs')}</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {t('common.appName')}. {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
