import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import ErrorBoundary from './components/common/ErrorBoundary'

createRoot(getElementByIdOrThrow()).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

function getElementByIdOrThrow() {
  const el = document.getElementById('root');
  if (!el) throw new Error('Root element not found');
  return el;
}