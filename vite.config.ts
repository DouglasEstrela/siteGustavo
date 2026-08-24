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
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor-react'
            }
            if (id.includes('/three/')) {
              return 'vendor-three'
            }
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'vendor-animation'
            }
            if (id.includes('@tsparticles')) {
              return 'vendor-particles'
            }
            if (id.includes('/ogl/')) {
              return 'vendor-ogl'
            }
            if (id.includes('lucide-react') || id.includes('embla-carousel')) {
              return 'vendor-ui'
            }
          }
        },
      },
    },
  },
})



