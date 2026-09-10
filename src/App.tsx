import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardDetail from './pages/CardDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/cards/:cardId" element={<CardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
