// src/lib/date.ts
export function diasParaFechamento(closingDay: number): string {
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth();

  let proximoFechamento = new Date(anoAtual, mesAtual, closingDay);

  // Se o fechamento deste mês já passou, o próximo é no mês seguinte.
  if (proximoFechamento < hoje && proximoFechamento.getDate() !== hoje.getDate()) {
    proximoFechamento = new Date(anoAtual, mesAtual + 1, closingDay);
  }

  const diffMs = proximoFechamento.setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0);
  const dias = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (dias === 0) return 'Fecha hoje';
  if (dias === 1) return 'Fecha amanhã';
  return `Fecha em ${dias} dias`;
}

export function formatarValor(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}