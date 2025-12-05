import { fileURLToPath, URL } from 'node:url'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Plugin to create 404.html for GitHub Pages SPA routing
const create404Html = () => {
  return {
    name: 'create-404-html',
    closeBundle() {
      const distPath = resolve(__dirname, 'dist')
      const indexPath = resolve(distPath, 'index.html')
      const html404Path = resolve(distPath, '404.html')
      
      try {
        // Copy index.html to 404.html for GitHub Pages SPA routing
        copyFileSync(indexPath, html404Path)
        console.log('✓ Created 404.html for GitHub Pages SPA routing')
      } catch (error) {
        console.error('Error creating 404.html:', error)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/music-notes-guesser/',
  plugins: [
    vue(),
    vueDevTools(),
    create404Html(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
