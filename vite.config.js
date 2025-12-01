import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {configDefaults} from "vitest/config";
/// <reference types="vitest/config" />


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/__tests__/**/*.{test,spec}.{js,jsx}'],
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.js'],
  },
})
