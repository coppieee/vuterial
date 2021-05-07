const buildTarget = process.env.BUILD_TARGET
const publicPath = buildTarget === 'docs' ? '/vuterial/':'/'
module.exports = {
  parallel: false,
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
        sassOptions:{
          includePaths: ['node_modules'],
        },
      },
    },
  },
}