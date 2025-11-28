import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Contract } from '@/types';

interface ContractContextType {
  contracts: Contract[];
  signContract: (id: string) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

// todo: remove mock functionality
const mockContracts: Contract[] = [
  {
    id: '1',
    projectId: '1',
    projectTitle: 'E-commerce Platform Redesign',
    clientId: '2',
    clientName: 'TechCorp Inc.',
    freelancerId: '1',
    freelancerName: 'John Smith',
    status: 'signed',
    amount: 15000,
    startDate: '2024-12-01',
    endDate: '2025-02-15',
  },
  {
    id: '2',
    projectId: '2',
    projectTitle: 'Mobile App Development',
    clientId: '2',
    clientName: 'TechCorp Inc.',
    freelancerId: '1',
    freelancerName: 'John Smith',
    status: 'sent',
    amount: 22000,
    startDate: '2025-01-15',
    endDate: '2025-03-30',
  },
  {
    id: '3',
    projectId: '4',
    projectTitle: 'API Integration Service',
    clientId: '2',
    clientName: 'TechCorp Inc.',
    freelancerId: '1',
    freelancerName: 'John Smith',
    status: 'draft',
    amount: 5000,
    startDate: '2025-02-01',
    endDate: '2025-02-28',
  },
];

export function ContractProvider({ children }: { children: ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);

  const signContract = useCallback((id: string) => {
    setContracts(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'signed' as const } : c))
    );
  }, []);

  return (
    <ContractContext.Provider value={{ contracts, signContract }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContracts() {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error('useContracts must be used within a ContractProvider');
  }
  return context;
}
