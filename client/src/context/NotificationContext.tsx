import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Notification } from '@/types';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ApiNotification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
  notification_types?: { type_name: string };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

function mapNotificationType(typeName?: string): 'info' | 'success' | 'warning' | 'error' {
  if (!typeName) return 'info';
  const lower = typeName.toLowerCase();
  if (lower.includes('success') || lower.includes('login')) return 'success';
  if (lower.includes('warning') || lower.includes('warn')) return 'warning';
  if (lower.includes('error') || lower.includes('fail')) return 'error';
  return 'info';
}

function mapApiToNotification(api: ApiNotification): Notification {
  return {
    id: String(api.id),
    title: api.title,
    message: api.message,
    type: mapNotificationType(api.notification_types?.type_name),
    read: api.is_read,
    createdAt: api.created_at,
  };
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, token } = useAuth();
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://sinopia.eu/api/notifications', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('Notifications API returned non-JSON response');
        setNotifications([]);
        return;
      }

      const data = await response.json();
      
      // Handle both array response and wrapped response
      const rawNotifications: ApiNotification[] = Array.isArray(data) ? data : (data.data || []);
      const mapped = rawNotifications.map(mapApiToNotification);
      
      // Sort by date, newest first
      mapped.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setNotifications(mapped);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Fetch notifications when user logs in
  useEffect(() => {
    if (user?.id && token) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [user?.id, token, fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    if (!token) return;
    
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }

      // Update local state
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read',
        variant: 'destructive',
      });
    }
  }, [token, toast]);

  const markAllAsRead = useCallback(async () => {
    if (!token) return;
    
    // Mark all unread notifications as read one by one
    const unreadNotifications = notifications.filter(n => !n.read);
    
    try {
      await Promise.all(
        unreadNotifications.map(n =>
          fetch(`/api/notifications/${n.id}/read`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        )
      );

      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark all notifications as read',
        variant: 'destructive',
      });
    }
  }, [token, notifications, toast]);

  const deleteNotification = useCallback(async (id: string) => {
    if (!token) return;
    
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }

      // Remove from local state immediately
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete notification',
        variant: 'destructive',
      });
    }
  }, [token, toast]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
