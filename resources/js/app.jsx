import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

createInertiaApp({
  resolve: (name) => {
    // Import halaman dari berbagai direktori
    const pages = {
      ...import.meta.glob('./Pages/**/*.jsx', { eager: true }),
      ...import.meta.glob('./Auth/**/*.jsx', { eager: true }),
    };

    return pages[`./Pages/${name}.jsx`] || pages[`./Auth/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
