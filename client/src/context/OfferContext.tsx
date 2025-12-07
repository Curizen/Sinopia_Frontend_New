import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import type { Offer } from '@/types';
import { useAuth } from './AuthContext';

interface OfferContextType {
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
  acceptOffer: (id: string) => Promise<void>;
  rejectOffer: (id: string) => Promise<void>;
  createOffer: (offer: { projectId: string; toUserId: string; amount: number; message?: string }) => Promise<void>;
  refetchOffers: () => Promise<void>;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export function OfferProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOffers = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/offers', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch offers');
      }
      
      const data = await response.json();
      setOffers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch offers');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchOffers();
    } else {
      setOffers([]);
    }
  }, [isAuthenticated, token, fetchOffers]);

  const acceptOffer = useCallback(async (id: string) => {
    if (!token) return;
    
    const response = await fetch(`/api/offers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'accepted' }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to accept offer' }));
      throw new Error(errorData.error || 'Failed to accept offer');
    }
    
    const updatedOffer = await response.json();
    setOffers(prev =>
      prev.map(o => (o.id === id ? { ...o, ...updatedOffer, status: 'accepted' as const } : o))
    );
  }, [token]);

  const rejectOffer = useCallback(async (id: string) => {
    if (!token) return;
    
    const response = await fetch(`/api/offers/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'rejected' }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to reject offer' }));
      throw new Error(errorData.error || 'Failed to reject offer');
    }
    
    const updatedOffer = await response.json();
    setOffers(prev =>
      prev.map(o => (o.id === id ? { ...o, ...updatedOffer, status: 'rejected' as const } : o))
    );
  }, [token]);

  const createOffer = useCallback(async (offer: { projectId: string; toUserId: string; amount: number; message?: string }) => {
    if (!token) return;
    
    const response = await fetch('/api/offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(offer),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to create offer' }));
      throw new Error(errorData.error || 'Failed to create offer');
    }
    
    const newOffer = await response.json();
    setOffers(prev => [newOffer, ...prev]);
  }, [token]);

  const refetchOffers = useCallback(async () => {
    await fetchOffers();
  }, [fetchOffers]);

  return (
    <OfferContext.Provider value={{ offers, isLoading, error, acceptOffer, rejectOffer, createOffer, refetchOffers }}>
      {children}
    </OfferContext.Provider>
  );
}

export function useOffers() {
  const context = useContext(OfferContext);
  if (context === undefined) {
    throw new Error('useOffers must be used within an OfferProvider');
  }
  return context;
}
