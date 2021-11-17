module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}