import { type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';

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
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [location, setLocation] = useLocation();

  const isSkillGiver = user?.role === 'skill_giver';

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/projects', label: 'Projects', icon: FolderKanban },
    { href: '/offers', label: 'Offers', icon: FileText },
    { href: '/contracts', label: 'Contracts', icon: Handshake },
    { href: '/payments', label: isSkillGiver ? 'Invoices' : 'Payments', icon: CreditCard },
    { href: '/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const currentNav = navItems.find((item) => item.href === location);
  const pageTitle = currentNav?.label ?? 'Dashboard';

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      {/* Top header */}
      <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-border bg-background">
        {/* Left: logo + page title */}
        <div className="flex items-center gap-4">
          {/* Sinopia logo – stays as link to home */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src="https://curizen.com/products/sinopia2025/images/logo_sinopia.png" 
                alt="Sinopia Logo" 
                className="w-16 h-auto rounded-md object-cover"
              />
        
            </Link>   
            </div>
            <span className="font-display font-bold text-xl">Sinopia</span>
          </Link>
|
          <h1 className="text-xl font-semibold capitalize">
            {pageTitle}
          </h1>
        </div>

        {/* Right: notifications + user dropdown */}
        <div className="flex items-center gap-3">
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
              {/* User info */}
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isSkillGiver ? 'Skill Giver' : 'Skill Searcher'}
                </p>
              </div>

              <DropdownMenuSeparator />

              {/* Main navigation moved from sidebar into dropdown */}
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  asChild
                  className="cursor-pointer"
                  data-testid={`dropdown-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? (
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />

              {/* Settings (extra item) */}
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive cursor-pointer"
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
