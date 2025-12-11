import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNotifications } from '@/context/NotificationContext';
import { useI18n } from '@/i18n';
import { formatDate } from '@/lib/utils/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import {
  Bell,
  CheckCheck,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { t } = useI18n();

  const formatRelativeTime = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return t('time.justNow');
    if (minutes < 60) return `${minutes}${t('time.minutesAgo')}`;
    if (hours < 24) return `${hours}${t('time.hoursAgo')}`;
    if (days < 7) return `${days}${t('time.daysAgo')}`;
    return formatDate(d);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900/30';
      case 'error':
        return 'bg-red-100 dark:bg-red-900/30';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold">{t('notifications.title')}</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? t('notifications.unreadCount').replace('{count}', String(unreadCount)) : t('notifications.allCaughtUp')}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead} data-testid="button-mark-all-read">
              <CheckCheck className="w-4 h-4 mr-2" />
              {t('notifications.markAllRead')}
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">{t('notifications.noNotifications')}</h3>
              <p className="text-muted-foreground">
                {t('notifications.noNotificationsDesc')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{t('notifications.recentActivity')}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 flex items-start gap-4 transition-colors ${
                      !notification.read ? 'bg-muted/50' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${getNotificationBg(notification.type)} flex items-center justify-center shrink-0`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className={`font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatRelativeTime(notification.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        {notification.link && (
                          <Link href={notification.link}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-primary hover:text-primary/80"
                            >
                              {t('notifications.viewDetails')}
                            </Button>
                          </Link>
                        )}
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-muted-foreground hover:text-foreground"
                            onClick={() => markAsRead(notification.id)}
                            data-testid={`button-mark-read-${notification.id}`}
                          >
                            {t('notifications.markAsRead')}
                          </Button>
                        )}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
