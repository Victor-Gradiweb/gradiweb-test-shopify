const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://gradi-theme-base.myshopify.com?preview_theme_id=134439108788',
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  },
  retries: 2
})
