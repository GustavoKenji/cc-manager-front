import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEditCardSheet from '../components/AddEditCardSheet';
import CardListItem from '../components/CardListItem';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { Card } from '../types';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    api
      .getCards()
      .then(setCards)
      .catch((err) => setError(err instanceof Error ? err.message : 'Erro ao carregar cartões'))
      .finally(() => setLoading(false));
  }, []);

  function handleCardCreated(card: Card) {
    setShowAddCard(false);
    // Vai direto pra fatura do cartão recém-criado, pra já poder
    // adicionar as compras que já existiam nele.
    navigate(`/cards/${card.id}`);
  }

  return (
    <div className="relative min-h-screen p-4 pb-24">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-lg font-medium">Seus cartões</h1>
        <button onClick={() => logout()} className="text-sm text-muted">
          Sair
        </button>
      </div>

      {loading && <p className="text-muted">Carregando…</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && cards.length === 0 && (
        <p className="mt-10 text-center text-muted">Você ainda não tem cartões cadastrados.</p>
      )}

      <div className="flex flex-col gap-3">
        {cards.map((card) => (
          <CardListItem key={card.id} card={card} onClick={() => navigate(`/cards/${card.id}`)} />
        ))}
      </div>

      <button
        onClick={() => setShowAddCard(true)}
        aria-label="Adicionar cartão"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-lg hover:bg-primary-hover"
      >
        +
      </button>

      {showAddCard && <AddEditCardSheet onClose={() => setShowAddCard(false)} onSaved={handleCardCreated} />}
    </div>
  );
}
