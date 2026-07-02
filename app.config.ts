import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  server: {
    preset: 'node-server'
  },
  // This configures your app to run on port 3030
  vite: {
    server: {
      port: 3030,
    }
  }
})
