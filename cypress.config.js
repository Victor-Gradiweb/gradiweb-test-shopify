const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    "BASE_URL": "",
    "PREVIEW_THEME": "",
    "PASSWORD_STORE": "",
    "PATH_COLLECTION": "",
    "HANDLE_PRODUCT": ""
  },
  e2e: {
    screenshotsFolder: false,
    /* excludeSpecPattern: 'cypress/e2e/side_cart.cy.js' */
  },
  retries: 1,
});