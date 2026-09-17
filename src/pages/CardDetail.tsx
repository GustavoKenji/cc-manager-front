import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddPurchaseSheet from '../components/AddPurchaseSheet';
import { api } from '../lib/api';
import { formatarCicloCartao, formatarValor } from '../lib/date';
import { formatarMes, shiftMonth } from '../lib/invoices';
import { Card, Invoice } from '../types';
import { ArrowLeft, X, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import AddEditCardSheet from '../components/AddEditCardSheet';
import CardOptionsMenu from '../components/CardOptionsMenu';
import ConfirmDialog from '../components/ConfirmDialog';

export default function CardDetail() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<Card | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddPurchase, setShowAddPurchase] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [confirmDeleteCard, setConfirmDeleteCard] = useState(false);
  const [confirmDeletePurchase, setConfirmDeletePurchase] = useState<string | null>(null);

  useEffect(() => {
    if (!cardId) return;
    api
      .getCard(cardId)
      .then((c) => {
        setCard(c);
        setMonth(c.currentInvoiceMonth);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Erro ao carregar cartão'));
  }, [cardId]);

  useEffect(() => {
    if (!cardId || !month) return;
    setLoading(true);
    api
      .getInvoice(cardId, month)
      .then(setInvoice)
      .catch((err) => setError(err instanceof Error ? err.message : 'Erro ao carregar fatura'))
      .finally(() => setLoading(false));
  }, [cardId, month]);

  async function refetchInvoice() {
    if (!cardId || !month) return;
    setInvoice(await api.getInvoice(cardId, month));
  }

  function handlePurchaseSaved() {
    setShowAddPurchase(false);
    refetchInvoice();
  }

  async function handleToggleInvoicePaid() {
    if (!cardId || !invoice) return;
    const novoStatus = invoice.status === 'paid' ? 'pending' : 'paid';
    await api.updateInvoiceStatus(cardId, month!, novoStatus);
    refetchInvoice();
  }

  if (!card || !month) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted">{error ?? 'Carregando…'}</p>
      </div>
    );
  }

  async function handleDeleteCard() {
    if (!card) return;
    await api.deleteCard(card.id);
    navigate('/');
  }

  async function confirmAndDeletePurchase() {
    if (!cardId || !confirmDeletePurchase) return;
    await api.deletePurchase(cardId, confirmDeletePurchase);
    setConfirmDeletePurchase(null);
    refetchInvoice();
  }

  function handleCardUpdated(updated: Card) {
    setCard(updated);
    setShowEditCard(false);
  }

  return (
    <div className="relative min-h-screen p-4 pb-24">
      <div className="mb-4 flex items-center gap-3">
        <button onClick={() => navigate('/')} aria-label="Voltar">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 truncate text-base font-medium">{card.name}</h1>
        <CardOptionsMenu onEdit={() => setShowEditCard(true)} onDelete={() => setConfirmDeleteCard(true)} />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => setMonth(shiftMonth(month, -1))} aria-label="Mês anterior">
          <ChevronLeft size={20} />
        </button>
        <p className="text-sm font-medium">{formatarMes(month)}</p>
        <button onClick={() => setMonth(shiftMonth(month, 1))} aria-label="Próximo mês">
          <ChevronRight size={20} />
        </button>
      </div>

      {loading && <p className="text-center text-muted">Carregando fatura…</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {invoice && !loading && (
        <>
          <div className="mb-4 rounded bg-surface p-4 text-center">
            <p className="text-xs text-muted">Total da fatura</p>
            <p className="my-1 text-2xl font-medium">{formatarValor(invoice.total)}</p>
            <span
              className={`mb-3 inline-block rounded px-2.5 py-1 text-xs ${
                invoice.status === 'open'
                  ? 'bg-warning-bg text-warning'
                  : invoice.status === 'paid'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-line text-muted'
              }`}
            >
              {invoice.status === 'open' ? 'Aberta · ' : invoice.status === 'paid' ? 'Paga · ' : 'Fechada · '}
              {formatarCicloCartao(card)}
            </span>

            {invoice.installments.length > 0 && (
              <button
                onClick={handleToggleInvoicePaid}
                className={`block w-full rounded py-2 text-sm font-medium ${
                  invoice.status === 'paid' ? 'text-muted' : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                {invoice.status === 'paid' ? 'Desfazer pagamento' : 'Marcar fatura como paga'}
              </button>
            )}
          </div>

          <p className="mb-2 text-xs text-muted">Compras</p>

          {invoice.installments.length === 0 && (
            <p className="mt-6 text-center text-muted">Nenhuma compra nessa fatura.</p>
          )}

          <div className="flex flex-col">
            {invoice.installments.map((installment) => (
              <div key={installment.id} className="flex items-center gap-3 border-b border-line py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{installment.description}</p>
                  <p className="text-xs text-muted">
                    {installment.totalInstallments > 1
                      ? `Parcela ${installment.number}/${installment.totalInstallments}`
                      : 'À vista'}
                  </p>
                </div>
                <p className="text-sm font-medium">{formatarValor(installment.amount)}</p>
                <button
                  onClick={() => setConfirmDeletePurchase(installment.purchaseId)}
                  aria-label="Remover compra"
                  className="ml-1 text-muted hover:text-danger"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        onClick={() => setShowAddPurchase(true)}
        aria-label="Adicionar compra"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-lg hover:bg-primary-hover"
      >
        <Plus size={24} />
      </button>

      {showAddPurchase && (
        <AddPurchaseSheet cardId={card.id} onClose={() => setShowAddPurchase(false)} onSaved={handlePurchaseSaved} />
      )}
      {showEditCard && (
        <AddEditCardSheet card={card} onClose={() => setShowEditCard(false)} onSaved={handleCardUpdated} />
      )}
      {confirmDeleteCard && (
        <ConfirmDialog
          title="Excluir cartão"
          message={`Isso vai apagar "${card.name}" e todas as compras e parcelas associadas a ele. Essa ação não pode ser desfeita.`}
          confirmLabel="Excluir"
          danger
          onConfirm={handleDeleteCard}
          onCancel={() => setConfirmDeleteCard(false)}
        />
      )}
      {confirmDeletePurchase && (
        <ConfirmDialog
          title="Remover compra"
          message="Isso vai apagar essa compra e todas as parcelas associadas a ela."
          confirmLabel="Remover"
          danger
          onConfirm={confirmAndDeletePurchase}
          onCancel={() => setConfirmDeletePurchase(null)}
        />
      )}
    </div>
  );
}