import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Initialize theme before the app mounts to avoid flash of incorrect theme
function initTheme(): void {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
      return;
    }
    if (stored === 'light') {
      document.documentElement.classList.remove('dark');
      return;
    }
    // No stored preference: follow system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch {
    // ignore
  }
}

initTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);