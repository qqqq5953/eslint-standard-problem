module.exports = {
  publicPath: '/eslint-standard-problem/dist/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/main.scss";`,
      }
    }
  },
  configureWebpack: {
    externals: {
      Vue: "vue"
    }
  }
}