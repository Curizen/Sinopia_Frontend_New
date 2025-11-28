import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Offer } from '@/types';

interface OfferContextType {
  offers: Offer[];
  acceptOffer: (id: string) => void;
  rejectOffer: (id: string) => void;
}

const OfferContext = createContext<OfferContextType | undefined>(undefined);

// todo: remove mock functionality
const mockOffers: Offer[] = [
  {
    id: '1',
    projectId: '2',
    projectTitle: 'Mobile App Development',
    fromUserId: '1',
    fromUserName: 'John Smith',
    toUserId: '2',
    status: 'pending',
    amount: 22000,
    message: 'I am excited to work on this mobile app project. My expertise in React Native will ensure a high-quality deliverable.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '2',
    projectId: '1',
    projectTitle: 'E-commerce Platform Redesign',
    fromUserId: '1',
    fromUserName: 'John Smith',
    toUserId: '2',
    status: 'accepted',
    amount: 15000,
    message: 'Ready to transform your e-commerce platform with modern design.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: '3',
    projectId: '3',
    projectTitle: 'Data Analytics Dashboard',
    fromUserId: '1',
    fromUserName: 'John Smith',
    toUserId: '2',
    status: 'rejected',
    amount: 10000,
    message: 'I can build comprehensive analytics dashboards.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
  },
];

export function OfferProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>(mockOffers);

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
