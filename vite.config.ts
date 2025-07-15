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
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'public/admin/index.html')
      },
      external: [],
      output: {
        // Ensure data files are treated as assets
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.includes('.json')) {
            return 'data/[name][extname]';
          }
          if (assetInfo.name && (assetInfo.name.includes('images/') || assetInfo.name.match(/\.(png|jpe?g|gif|svg|webp)$/i))) {
            return 'images/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    }
    emptyOutDir: true
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