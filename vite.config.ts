import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 1753,
    host: true,
  },
  build: {
    // Increase warning limit slightly since we have heavy 3D libs
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom'],
          // Three.js (heavy 3D lib)
          'vendor-three': ['three', '@types/three'],
          // Animation libs
          'vendor-animation': ['framer-motion', 'gsap'],
          // Particles
          'vendor-particles': [
            '@tsparticles/engine',
            '@tsparticles/react',
            '@tsparticles/slim',
          ],
          // OGL (WebGL)
          'vendor-ogl': ['ogl'],
          // UI libs
          'vendor-ui': ['lucide-react', 'embla-carousel-react'],
        },
      },
    },
  },
})


