import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Contract } from '@/types';

interface ContractContextType {
  contracts: Contract[];
  signContract: (id: string) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function ContractProvider({ children }: { children: ReactNode }) {
  const [contracts, setContracts] = useState<Contract[]>([]);

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
