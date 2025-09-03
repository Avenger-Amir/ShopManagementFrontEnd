export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9098',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
