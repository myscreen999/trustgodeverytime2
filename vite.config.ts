import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: {
    global: 'globalThis',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'public/admin/index.html')
      },
      external: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.includes('images/')) {
            return 'images/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    copyPublicDir: true
  },
  server: {
    port: 5173,
    host: true,
    strictPort: false,
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: [],
    force: true
  },
  publicDir: 'public',
  assetsInclude: ['**/*.json'],
  esbuild: {
    target: 'es2020'
  }
});