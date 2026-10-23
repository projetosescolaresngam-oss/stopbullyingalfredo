import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { AppProvider } from './AppContext';
import { AccessibilityProvider } from './AccessibilityContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AccessibilityProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AccessibilityProvider>
    </ErrorBoundary>
  </StrictMode>,
);

