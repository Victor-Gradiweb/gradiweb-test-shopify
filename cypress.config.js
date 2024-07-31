const { defineConfig } = require('cypress');

/**
 * Cypress configuration for end-to-end (e2e) tests.
 * @type {import('cypress').Config}
 */
module.exports = defineConfig({
  /**
   * Environment variables specific to the tests.
   * @type {Object}
   * @property {string} PREVIEW_THEME - Preview theme.
   * @property {string} PASSWORD_STORE - Password storage.
   * @property {string} PATH_COLLECTION - Collection to handle.
   * @property {string} HANDLE_PRODUCT - Product to handle.
   */
  env: {
    PREVIEW_THEME: '135179665588',
    PASSWORD_STORE: 'gradiweb',
    HANDLE_COLLECTION: '',
    HANDLE_PRODUCT: 'ricoh-theta-sc2'
  },
  
  /**
   * Specific configuration for e2e tests.
   * @type {Object}
   * @property {string} baseUrl - Base URL for e2e tests.
   * 
   * Comment out this line during code review. Uncomment for local testing.
   * @type {string}
   */
  e2e: {
    baseUrl: 'https://gradi-theme-base.myshopify.com',
    screenshotsFolder: false,
    video: false,
    viewportWidth: 1440,
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on, {
        defaultTrimLength: 1000,
      });
    }
  },
  
  /**
   * Retries configuration for tests.
   * @type {Object}
   * @property {number} runMode - Number of retries in run mode.
   * @property {number} openMode - Number of retries in open mode.
   */
  retries: {
    runMode: 1,
    openMode: 0
  },
});