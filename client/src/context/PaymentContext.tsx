import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Invoice, Payment } from '@/types';

interface PaymentContextType {
  invoices: Invoice[];
  payments: Payment[];
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

// todo: remove mock functionality
const mockInvoices: Invoice[] = [
  {
    id: '1',
    projectId: '1',
    projectTitle: 'E-commerce Platform Redesign',
    amount: 5000,
    status: 'paid',
    dueDate: '2024-12-15',
    paidDate: '2024-12-14',
  },
  {
    id: '2',
    projectId: '1',
    projectTitle: 'E-commerce Platform Redesign',
    amount: 5000,
    status: 'pending',
    dueDate: '2025-01-15',
  },
  {
    id: '3',
    projectId: '3',
    projectTitle: 'Data Analytics Dashboard',
    amount: 8000,
    status: 'paid',
    dueDate: '2024-11-30',
    paidDate: '2024-11-28',
  },
  {
    id: '4',
    projectId: '2',
    projectTitle: 'Mobile App Development',
    amount: 7500,
    status: 'overdue',
    dueDate: '2024-12-01',
  },
];

const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceId: '1',
    projectTitle: 'E-commerce Platform Redesign',
    amount: 5000,
    date: '2024-12-14',
    method: 'Bank Transfer',
  },
  {
    id: '2',
    invoiceId: '3',
    projectTitle: 'Data Analytics Dashboard',
    amount: 8000,
    date: '2024-11-28',
    method: 'Credit Card',
  },
];

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [payments] = useState<Payment[]>(mockPayments);

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
