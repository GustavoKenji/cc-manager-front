import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">Logado como {user?.email}</p>
        <button onClick={() => logout()} className="text-sm text-primary">
          Sair
        </button>
      </div>
      <p className="text-muted">Lista de cartões — em construção</p>
    </div>
  );
}
