// src/lib/date.ts
export function formatarCicloCartao(card: { closingDay: number; dueDay: number }): string {
  return `Fecha dia ${card.closingDay} · Vence dia ${card.dueDay}`;
}

export function formatarValor(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}