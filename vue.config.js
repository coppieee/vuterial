const buildTarget = process.env.BUILD_TARGET
const publicPath = buildTarget === 'docs' ? '/vuterial/':'/'
module.exports = {
  publicPath,
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