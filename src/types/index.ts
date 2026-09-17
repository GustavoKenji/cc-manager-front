export interface Card {
  id: string;
  name: string;
  bank: string;
  lastFourDigits?: string;
  limit: number;
  closingDay: number;
  dueDay: number;
  color: string;
  availableCredit: number;
  currentInvoiceTotal: number;
  currentInvoiceStatus: 'pending' | 'paid';
  currentInvoiceDueDate: string; // "YYYY-MM-DD"
  currentInvoiceMonth: string; // "YYYY-MM"
}

export interface Purchase {
  id: string;
  description: string;
  totalAmount: number;
  purchaseDate: string;
  category?: string;
  installmentsCount: number;
}

export type InstallmentStatus = 'pending' | 'paid';

export interface Installment {
  id: string;
  purchaseId: string;
  description: string;
  category?: string;
  number: number;
  totalInstallments: number;
  amount: number;
  invoiceMonth: string;
  status: InstallmentStatus;
}

export interface Invoice {
  month: string;
  total: number;
  status: 'open' | 'closed' | 'paid';
  installments: Installment[];
}

export type CardInput = Pick<Card, 'name' | 'bank' | 'lastFourDigits' | 'limit' | 'closingDay' | 'dueDay' | 'color'>;