import { Card } from '../types';
import { formatarFechamento, formatarValor, formatarVencimento, formatarCicloCartao } from '../lib/date';

export default function CardListItem({ card, onClick }: { card: Card; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded bg-surface p-4 text-left transition hover:bg-surface/80"
    >
      <div className="h-10 w-10 flex-shrink-0 rounded-lg" style={{ backgroundColor: card.color }} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{card.name}</p>
        {/* Mobile: fechamento e vencimento em linhas separadas */}
        <div className="md:hidden">
          <p className="mt-0.5 text-sm text-muted">{formatarFechamento(card)}</p>
          <p className="text-sm text-muted">{formatarVencimento(card)}</p>
        </div>
        {/* Desktop: junto numa linha só, como já era */}
        <p className="mt-0.5 hidden text-sm text-muted md:block">{formatarCicloCartao(card)}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="mt-0.5 text-sm font-medium">Disponível: {formatarValor(card.availableCredit)}</p>
        <p className="text-sm">Fatura atual: {formatarValor(card.currentInvoiceTotal)}</p>
      </div>
    </button>
  );
}