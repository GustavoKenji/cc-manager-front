import { useEffect, useMemo, useState } from 'react';
import { ReportItem, api } from '../lib/api';
import { formatarValor } from '../lib/date';
import Header from '../components/Header';

function hojeISO(offsetDias = 0): string {
  const data = new Date();
  data.setDate(data.getDate() + offsetDias);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function formatarDataCurta(iso: string): string {
  const [, mes, dia] = iso.split('-');
  return `${dia}/${mes}`;
}

export default function Report() {
  const [itens, setItens] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [from, setFrom] = useState(hojeISO());
  const [to, setTo] = useState(hojeISO(30));

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .getInvoicesReport(from, to)
      .then(setItens)
      .catch((err) => setError(err instanceof Error ? err.message : 'Erro ao carregar relatório'))
      .finally(() => setLoading(false));
  }, [from, to]);

  const linhas = useMemo(() => {
    let acumulado = 0;
    return itens.map((item) => {
      acumulado += item.total;
      return { item, acumulado };
    });
  }, [itens]);

  const total = linhas.length > 0 ? linhas[linhas.length - 1].acumulado : 0;

  return (
    <div className="min-h-screen p-4">
      <Header />

      <div className="mb-4 flex gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-sm text-muted">De</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-sm text-muted">Até</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
          />
        </div>
      </div>

      {loading && <p className="text-muted">Carregando…</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-4 flex items-center justify-between rounded bg-surface p-3.5">
            <span className="text-sm text-muted">Total no período</span>
            <span className="text-lg font-medium">{formatarValor(total)}</span>
          </div>

          {linhas.length === 0 && (
            <p className="mt-8 text-center text-muted">Nenhuma fatura em aberto nesse período.</p>
          )}

          <div className="flex flex-col">
            {linhas.map(({ item, acumulado }) => (
              <div key={`${item.cardId}-${item.invoiceMonth}`} className="flex items-center gap-3 border-b border-line py-3">
                <div className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: item.cardColor }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{item.cardName}</p>
                  <p className="text-xs text-muted">Vence {formatarDataCurta(item.dueDate)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatarValor(item.total)}</p>
                  <p className="text-xs text-muted">Acum. {formatarValor(acumulado)}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}