import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RoutesPage from './pages/routes/RoutesPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RoutesPage />
  </StrictMode>,
)
