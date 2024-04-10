const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    screenshotsFolder: false,
    /* excludeSpecPattern: 'cypress/e2e/side_cart.cy.js' */
  },
  retries: 1,
});
