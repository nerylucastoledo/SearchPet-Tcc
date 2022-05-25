const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pwa: {
    name: "SearchPet",
    themeColor: "#36C9D2",
    backgroundColor: "#ffffff",
    icons: {
      favicon32: 'img/icons/favicon-32x32',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
  },
})
