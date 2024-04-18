const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "6obxhn",
  env:{
    PREVIEW_THEME: '135179665588',
    PASSWORD_STORE: 'gradiweb',
    PATH_COLLECTION: 'all',
    HANDLE_PRODUCT: 'ricoh-theta-sc2'
  },
  e2e: {
    baseUrl: 'https://gradi-theme-base.myshopify.com',
    screenshotsFolder: false,
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on, {
        defaultTrimLength: 1000,
      });
    }
    /* excludeSpecPattern: 'cypress/e2e/side_cart.cy.js' */
  },
  // retries: 1,
});
