import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set the base to match your GitHub repo name
export default defineConfig({
  base: '/PathFindingVisualizer/',
  plugins: [react()]
})
