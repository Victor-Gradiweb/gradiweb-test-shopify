const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env:{
    PREVIEW_THEME: '',
    PASSWORD_STORE: '',
    PATH_COLLECTION: '',
    HANDLE_PRODUCT: ''
  },
  e2e: {
    screenshotsFolder: false,
    video: false,
    viewportWidth: 1440,
    setupNodeEvents(on, config) {
      require('cypress-terminal-report/src/installLogsPrinter')(on, {
        defaultTrimLength: 1000,
      });
    }
  },
  retries: {"runMode": 1, "openMode":0},
});
