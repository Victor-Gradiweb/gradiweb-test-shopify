/*
  The UnlockTheme class represents the page object for unlocking a store theme.
  It initializes selectors for the password input and password from Cypress environment variables.
*/

export class UnlockTheme {
  constructor () {
    // Initialize selectors for the password input and password from Cypress environment variables
    const unlockThemeConfig = Cypress.env('unlock_store')

    this.input_password = unlockThemeConfig.input_password
    this.password_store = unlockThemeConfig.password_store
  }

  /*
    Public method: break_password
    Description: Enters the store password in the input field and submits to unlock the theme.
  */
  break_password () {
    cy.get(this.input_password).type(this.password_store + '{enter}')
  }
}

// Export an instance of UnlockTheme class
export const unlockTheme = new UnlockTheme()
