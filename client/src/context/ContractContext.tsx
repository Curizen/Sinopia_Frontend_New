import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import type { Contract } from '@/types';
import { useAuth } from './AuthContext';

interface ContractContextType {
  contracts: Contract[];
  isLoading: boolean;
  error: string | null;
  signContract: (id: string) => Promise<void>;
  refetchContracts: () => Promise<void>;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export function ContractProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/contracts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch contracts');
      }
      
      const data = await response.json();
      setContracts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contracts');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchContracts();
    } else {
      setContracts([]);
    }
  }, [isAuthenticated, token, fetchContracts]);

  const signContract = useCallback(async (id: string) => {
    if (!token) return;
    
    const response = await fetch(`/api/contracts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'signed' }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to sign contract' }));
      throw new Error(errorData.error || 'Failed to sign contract');
    }
    
    const updatedContract = await response.json();
    setContracts(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedContract, status: 'signed' as const } : c))
    );
  }, [token]);

  const refetchContracts = useCallback(async () => {
    await fetchContracts();
  }, [fetchContracts]);

  return (
    <ContractContext.Provider value={{ contracts, isLoading, error, signContract, refetchContracts }}>
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
