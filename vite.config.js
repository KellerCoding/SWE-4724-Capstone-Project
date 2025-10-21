import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {configDefaults} from "vitest/config";
/// <reference types="vitest/config" />


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
    global: true,
    environment: 'jsdom',
  },
})
