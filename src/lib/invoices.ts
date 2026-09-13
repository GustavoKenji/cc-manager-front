/** Mesma regra da API: replica localmente pra saber qual é a fatura "atual" ao abrir a tela. */
export function calcularInvoiceMonthAtual(closingDay: number): string {
  const hoje = new Date();
  const dia = hoje.getDate();
  let mes = hoje.getMonth();
  let ano = hoje.getFullYear();

  if (dia >= closingDay) {
    mes += 1;
  }

  ano += Math.floor(mes / 12);
  mes = ((mes % 12) + 12) % 12;

  return `${ano}-${String(mes + 1).padStart(2, '0')}`;
}

export function shiftMonth(month: string, delta: number): string {
  const [ano, mes] = month.split('-').map(Number);
  const data = new Date(ano, mes - 1 + delta, 1);
  return `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`;
}

export function formatarMes(month: string): string {
  const [ano, mes] = month.split('-').map(Number);
  const label = new Date(ano, mes - 1, 1).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  return label.charAt(0).toUpperCase() + label.slice(1);
}