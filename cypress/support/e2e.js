/**
 * Installs Cypress commands from the specified directory.
 * Also installs a logs collector for terminal reporting.
 * Prevents uncaught exceptions from failing tests.
 * 
 * @param {Object} context - The context object obtained from require.context.
 * @returns {void}
 */
const commandsContext = require.context('../commands/', true, /\.js$/);
commandsContext.keys().forEach(commandsContext);

/**
 * Installs a logs collector for Cypress terminal reporting.
 * Suppresses uncaught exceptions to prevent test failures.
 * 
 * @returns {void}
 */
require('cypress-terminal-report/src/installLogsCollector')();

/**
 * Suppresses uncaught exceptions globally to prevent them from failing tests.
 * 
 * @returns {boolean} Always returns false to indicate that uncaught exceptions should be ignored.
 */
Cypress.on('uncaught:exception', () => {
  return false;
});
