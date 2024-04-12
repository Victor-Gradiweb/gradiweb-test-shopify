const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    // "BASE_URL": "https://gradi-theme-base.myshopify.com/",
    PREVIEW_THEME: '',
    PASSWORD_STORE: '',
    PATH_COLLECTION: '',
    HANDLE_PRODUCT: ''
  },
  e2e: {
    baseUrl: 'https://gradi-theme-base.myshopify.com',
    screenshotsFolder: false
    /* excludeSpecPattern: 'cypress/e2e/side_cart.cy.js' */
  },
  retries: 1
})
