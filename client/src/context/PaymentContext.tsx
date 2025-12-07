import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import type { Invoice, Payment } from '@/types';
import { useAuth } from './AuthContext';

interface PaymentContextType {
  invoices: Invoice[];
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
  createInvoice: (invoice: { projectId: string; amount: number; dueDate: string }) => Promise<void>;
  createPayment: (payment: { invoiceId: string; amount: number; method: string }) => Promise<void>;
  refetchPayments: () => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentData = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const [invoicesRes, paymentsRes] = await Promise.all([
        fetch('/api/invoices', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch('/api/payments', {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);
      
      if (!invoicesRes.ok) {
        throw new Error('Failed to fetch invoices');
      }
      if (!paymentsRes.ok) {
        throw new Error('Failed to fetch payments');
      }
      
      const [invoicesData, paymentsData] = await Promise.all([
        invoicesRes.json(),
        paymentsRes.json(),
      ]);
      
      setInvoices(invoicesData);
      setPayments(paymentsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch payment data');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchPaymentData();
    } else {
      setInvoices([]);
      setPayments([]);
    }
  }, [isAuthenticated, token, fetchPaymentData]);

  const createInvoice = useCallback(async (invoice: { projectId: string; amount: number; dueDate: string }) => {
    if (!token) return;
    
    const response = await fetch('/api/invoices', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(invoice),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to create invoice' }));
      throw new Error(errorData.error || 'Failed to create invoice');
    }
    
    const newInvoice = await response.json();
    setInvoices(prev => [...prev, newInvoice]);
  }, [token]);

  const createPayment = useCallback(async (payment: { invoiceId: string; amount: number; method: string }) => {
    if (!token) return;
    
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payment),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to create payment' }));
      throw new Error(errorData.error || 'Failed to create payment');
    }
    
    const newPayment = await response.json();
    setPayments(prev => [...prev, newPayment]);
    
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === payment.invoiceId
          ? { ...inv, status: 'paid' as const, paidDate: new Date().toISOString().split('T')[0] }
          : inv
      )
    );
  }, [token]);

  const refetchPayments = useCallback(async () => {
    await fetchPaymentData();
  }, [fetchPaymentData]);

  return (
    <PaymentContext.Provider value={{ invoices, payments, isLoading, error, createInvoice, createPayment, refetchPayments }}>
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
