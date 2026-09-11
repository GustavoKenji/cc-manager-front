// src/lib/api.ts
import { Card, Installment, InstallmentStatus, Invoice, Purchase } from '../types';
import { auth } from './firebase';

const API_URL = import.meta.env.VITE_API_URL;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await auth.currentUser?.getIdToken();

  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error ?? 'Erro ao comunicar com a API');
  }

  return data as T;
}

export const api = {
  // Cartões
  getCards: () => request<Card[]>('/cards'),
  getCard: (cardId: string) => request<Card>(`/cards/${cardId}`),
  createCard: (data: Omit<Card, 'id' | 'availableCredit'>) =>
    request<Card>('/cards', { method: 'POST', body: JSON.stringify(data) }),
  updateCard: (cardId: string, data: Partial<Omit<Card, 'id' | 'availableCredit'>>) =>
    request<Card>(`/cards/${cardId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCard: (cardId: string) => request<void>(`/cards/${cardId}`, { method: 'DELETE' }),

  // Compras
  createPurchase: (
    cardId: string,
    data: {
      description: string;
      totalAmount: number;
      purchaseDate: string;
      category?: string;
      installmentsCount?: number;
    },
  ) => request<Purchase>(`/cards/${cardId}/purchases`, { method: 'POST', body: JSON.stringify(data) }),
  deletePurchase: (cardId: string, purchaseId: string) =>
    request<void>(`/cards/${cardId}/purchases/${purchaseId}`, { method: 'DELETE' }),

  // Faturas e parcelas
  getInvoice: (cardId: string, month: string) => request<Invoice>(`/cards/${cardId}/invoices/${month}`),
  listInvoiceMonths: (cardId: string) => request<string[]>(`/cards/${cardId}/invoices`),
  updateInstallmentStatus: (cardId: string, installmentId: string, status: InstallmentStatus) =>
    request<Installment>(`/cards/${cardId}/installments/${installmentId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};