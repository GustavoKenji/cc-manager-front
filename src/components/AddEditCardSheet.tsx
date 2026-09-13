import { FormEvent, useState } from 'react';
import { api } from '../lib/api';
import { Card } from '../types';

const CORES = ['#7F77DD', '#378ADD', '#D85A30', '#1F5C4A', '#8A5A1E', '#22261F', '#DC143C', '#FFD700', '#FF69B4', '#00CED1'];

export default function AddEditCardSheet({
  onClose,
  onSaved,
  card,
}: {
  onClose: () => void;
  onSaved: (card: Card) => void;
  card?: Card;
}) {
  const [name, setName] = useState(card?.name ?? '');
  const [bank, setBank] = useState(card?.bank ?? '');
  const [limit, setLimit] = useState(card ? String(card.limit) : '');
  const [closingDay, setClosingDay] = useState(card ? String(card.closingDay) : '');
  const [dueDay, setDueDay] = useState(card ? String(card.dueDay) : '');
  const [color, setColor] = useState(card?.color ?? CORES[0]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const payload = { name, bank, limit: Number(limit), closingDay: Number(closingDay), dueDay: Number(dueDay), color };

    try {
      const saved = card ? await api.updateCard(card.id, payload) : await api.createCard(payload);
      onSaved(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar cartão');
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
        <h2 className="mb-4 text-base font-medium">{card ? 'Editar cartão' : 'Novo cartão'}</h2>

        <label className="mb-1 block text-sm text-muted">Nome</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nubank Roxo"
          className="mb-3 w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
        />

        <label className="mb-1 block text-sm text-muted">Banco</label>
        <input
          required
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          placeholder="Nubank"
          className="mb-3 w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
        />

        <label className="mb-1 block text-sm text-muted">Limite</label>
        <input
          required
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="5000"
          className="mb-3 w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
        />

        <div className="mb-3 flex gap-3">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-muted">Fechamento</label>
            <input
              required
              type="number"
              min={1}
              max={31}
              value={closingDay}
              onChange={(e) => setClosingDay(e.target.value)}
              placeholder="25"
              className="w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm text-muted">Vencimento</label>
            <input
              required
              type="number"
              min={1}
              max={31}
              value={dueDay}
              onChange={(e) => setDueDay(e.target.value)}
              placeholder="5"
              className="w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
            />
          </div>
        </div>

        <label className="mb-1 block text-sm text-muted">Cor</label>
        <div className="mb-4 flex gap-2">
          {CORES.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setColor(c)}
              style={{ backgroundColor: c }}
              className={`h-8 w-8 rounded-full ${color === c ? 'ring-2 ring-offset-2 ring-ink' : ''}`}
              aria-label={`Selecionar cor ${c}`}
            />
          ))}
        </div>

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