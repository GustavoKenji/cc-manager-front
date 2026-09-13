import { FormEvent, useState } from 'react';
import { api } from '../lib/api';

export default function AddPurchaseSheet({
  cardId,
  onClose,
  onSaved,
}: {
  cardId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState('');
  const [installmentsCount, setInstallmentsCount] = useState('1');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await api.createPurchase(cardId, {
        description,
        totalAmount: Number(totalAmount),
        purchaseDate,
        category: category || undefined,
        installmentsCount: Number(installmentsCount) || 1,
      });
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar compra');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-t-2xl bg-paper p-5"
      >
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-line" />
        <h2 className="mb-4 text-base font-medium">Nova compra</h2>

        <label className="mb-1 block text-sm text-muted">Descrição</label>
        <input
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Notebook Dell"
          className="mb-3 w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
        />

        <div className="mb-3 flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-muted">Valor total</label>
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              placeholder="0,00"
              className="w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          <div className="w-24">
            <label className="mb-1 block text-sm text-muted">Parcelas</label>
            <input
              required
              type="number"
              min="1"
              value={installmentsCount}
              onChange={(e) => setInstallmentsCount(e.target.value)}
              className="w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
            />
          </div>
        </div>

        <label className="mb-1 block text-sm text-muted">Data da compra</label>
        <input
          required
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className="mb-3 w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
        />

        <label className="mb-1 block text-sm text-muted">Categoria (opcional)</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Eletrônicos"
          className="mb-4 w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
        />

        {error && (
          <p role="alert" className="mb-3 text-sm text-danger">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded border border-line py-2.5">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded bg-primary py-2.5 font-medium text-white hover:bg-primary-hover disabled:opacity-60"
          >
            {submitting ? 'Salvando…' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}