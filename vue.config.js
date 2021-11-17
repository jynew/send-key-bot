module.exports = {
  devServer: {
    open: true,
    proxy: {
      'api/': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}