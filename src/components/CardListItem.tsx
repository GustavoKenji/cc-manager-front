import { Card } from '../types';
import { formatarCicloCartao, formatarValor } from '../lib/date';

export default function CardListItem({ card, onClick }: { card: Card; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded bg-surface p-4 text-left transition hover:bg-surface/80"
    >
      <div className="h-10 w-10 flex-shrink-0 rounded-lg" style={{ backgroundColor: card.color }} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{card.name}</p>
        <p className="mt-0.5 text-xs text-muted">{formatarCicloCartao(card)}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-sm font-medium">{formatarValor(card.currentInvoiceTotal)}</p>
        <p className="mt-0.5 text-xs text-muted">Disponível: {formatarValor(card.availableCredit)}</p>
      </div>
    </button>
  );
}