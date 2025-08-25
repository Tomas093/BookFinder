import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '@/pages/app/App';
import BibliotecaFavoritos from '@/pages/library/library';

function NotFound() {
  return <div style={{ padding: 40, textAlign: 'center' }}>404 - Page Not Found</div>;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/biblioteca" element={<BibliotecaFavoritos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}