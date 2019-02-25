module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.sass','.ts','.scss'],
    },
    plugins: [
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        includePaths: ['node_modules'],
      },
    },
  },
}