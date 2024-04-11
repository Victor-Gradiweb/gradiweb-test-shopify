const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    "BASE_URL": "https://gradi-theme-base.myshopify.com/",
    "PREVIEW_THEME": "135179665588",
    "INPUT_PASSWORD": "#password",
    "PASSWORD_STORE": "gradiweb",
    "PATH_COLLECTION": "all",
    "HANDLE_PRODUCT": "ricoh-theta-sc2"
  },
  e2e: {
    screenshotsFolder: false,
    /* excludeSpecPattern: 'cypress/e2e/side_cart.cy.js' */
  },
  retries: 1,
});
