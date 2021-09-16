module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
      port: 8086
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/home'
    : '/'
}
