import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">Sinopia</span>
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
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/sign-in">
                <Button variant="ghost" data-testid="button-sign-in">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button data-testid="button-sign-up">Get Started</Button>
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
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Get Started</Button>
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
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">S</span>
                </div>
                <span className="font-display font-bold text-xl">Sinopia</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Connect skills with opportunities. Build your career or find the talent you need.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Talent</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/sign-up" className="hover:text-foreground">Find Projects</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground">Build Portfolio</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground">Get Paid</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">For Companies</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/sign-up" className="hover:text-foreground">Post Projects</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground">Find Talent</Link></li>
                <li><Link href="/sign-up" className="hover:text-foreground">Manage Teams</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Sinopia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
