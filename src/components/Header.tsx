import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChartBar, PlayingCardsFan, LogOut } from 'lucide-react';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function linkClass(path: string) {
    const active = location.pathname === path;
    return `flex items-center gap-2 pb-1 border-b-2 transition-colors ${
      active ? 'text-primary border-primary' : 'text-muted border-transparent'
    }`;
  }


  return (
    <div className="mb-10">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-lg font-medium text-primary">Card Manager</h1>
        <button onClick={() => logout()} className="text-sm text-muted flex gap-2">
          Sair
          <LogOut size={15} />
        </button>
      </div>

      <div className="mb-5 flex gap-10 justify-center">
        <button onClick={() => navigate('/')} className={linkClass('/')}>
          <PlayingCardsFan size={20} />
          <h2>Seus cartões</h2>
        </button>
        <button onClick={() => navigate('/relatorio')} className={linkClass('/relatorio')}>
          <ChartBar size={20} />
          <h2>Resumo de faturas</h2>
        </button>
      </div>
    </div>
  );
};