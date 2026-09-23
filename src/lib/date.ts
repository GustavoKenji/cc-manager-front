// src/lib/date.ts
export function formatarFechamento(card: { closingDay: number }): string {
  return `Fecha dia ${card.closingDay}`;
}

export function formatarVencimento(card: { dueDay: number }): string {
  return `Vence dia ${card.dueDay}`;
}

export function formatarCicloCartao(card: { closingDay: number; dueDay: number }): string {
  return `${formatarFechamento(card)} · ${formatarVencimento(card)}`;
}

export function formatarValor(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}