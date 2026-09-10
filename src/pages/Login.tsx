import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Se já tem sessão ativa, nem mostra o formulário.
  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('E-mail ou senha inválidos');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <span className="text-xl" aria-hidden="true">
              💳
            </span>
          </div>
          <h1 className="text-lg font-medium">Meus cartões</h1>
          <p className="mt-1 text-sm text-muted">Entre para gerenciar suas faturas</p>
        </div>

        <label className="mb-1 block text-sm text-muted" htmlFor="email">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
          placeholder="nome@exemplo.com"
        />

        <label className="mb-1 block text-sm text-muted" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded border border-line bg-surface px-3 py-2 outline-none focus:border-primary"
          placeholder="••••••••"
        />

        {error && (
          <p role="alert" className="mb-4 text-sm text-danger">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded bg-primary py-2.5 font-medium text-white transition hover:bg-primary-hover disabled:opacity-60"
        >
          {submitting ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
