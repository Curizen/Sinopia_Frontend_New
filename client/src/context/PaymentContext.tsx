import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Invoice, Payment } from '@/types';

interface PaymentContextType {
  invoices: Invoice[];
  payments: Payment[];
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [invoices] = useState<Invoice[]>([]);
  const [payments] = useState<Payment[]>([]);

  return (
    <PaymentContext.Provider value={{ invoices, payments }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayments() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayments must be used within a PaymentProvider');
  }
  return context;
}
