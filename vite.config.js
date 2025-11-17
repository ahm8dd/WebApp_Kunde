import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Aktiviert den Pfad-Alias "@/" für das Projekt-Root
      '@': resolve(__dirname, './'),
    },
  },
});