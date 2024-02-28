/**
 * @class UnlockTheme
 * @classdesc Represents the page object for unlocking a store theme.
 * Initializes selectors for the password input and password from Cypress environment variables.
 */
export class UnlockTheme {
  constructor () {
    /**
     * @member {string} input_password - Selector for the password input.
     * @member {string} password_store - Password retrieved from Cypress environment variables.
     */
    const unlockThemeConfig = Cypress.env('unlock_store')
    this.input_password = unlockThemeConfig.input_password
    this.password_store = unlockThemeConfig.password_store
  }

  /**
   * @method break_password
   * @description Enters the store password in the input field and submits to unlock the theme.
   * @returns {void}
   */
  break_password () {
    cy.get('body').then(($body) => {
      if ($body.find(this.input_password).length > 0) {
        cy.get(this.input_password).type(this.password_store + '{enter}') // Type password and submit
      } else {
        cy.log('The website operates without a password, and user session information is stored in cookies.')
      }
    })
  }
}

/**
 * @constant {UnlockTheme} unlockTheme - An instance of the UnlockTheme class.
 */
export const unlockTheme = new UnlockTheme()
