
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class CuriousMindsElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  connectedCallback() {
    const mountPoint = document.createElement('div');
    mountPoint.id = 'curious-minds-root';
    this.appendChild(mountPoint);

    this.root = ReactDOM.createRoot(mountPoint);
    this.root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
  }
}

if (!customElements.get('curious-minds')) {
  customElements.define('curious-minds', CuriousMindsElement);
}

// Also keep the standard root mounting for standalone preview
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
