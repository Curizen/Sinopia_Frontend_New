import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Offer } from '@/types';

interface OfferContextType {
  offers: Offer[];
  acceptOffer: (id: string) => void;
  rejectOffer: (id: string) => void;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export function OfferProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>([]);

  const acceptOffer = useCallback((id: string) => {
    setOffers(prev =>
      prev.map(o => (o.id === id ? { ...o, status: 'accepted' as const } : o))
    );
  }, []);

  const rejectOffer = useCallback((id: string) => {
    setOffers(prev =>
      prev.map(o => (o.id === id ? { ...o, status: 'rejected' as const } : o))
    );
  }, []);

  return (
    <OfferContext.Provider value={{ offers, acceptOffer, rejectOffer }}>
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
