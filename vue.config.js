const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "./",
  pwa: {
    name: "Search Pet",
  },
  transpileDependencies: true
})
