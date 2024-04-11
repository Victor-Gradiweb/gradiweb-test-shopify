const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    // "BASE_URL": "https://gradi-theme-base.myshopify.com/",
    "PREVIEW_THEME": "135179665588",
    "PASSWORD_STORE": "gradiweb",
    "PATH_COLLECTION": "all",
    "HANDLE_PRODUCT": "ricoh-theta-sc2"
  },
  e2e: {
    baseUrl: "https://gradi-theme-base.myshopify.com", 
    screenshotsFolder: false,
    /* excludeSpecPattern: 'cypress/e2e/side_cart.cy.js' */
  },
  retries: 1,
});