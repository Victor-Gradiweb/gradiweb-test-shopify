export class UnlockTheme {
  constructor () {
    const unlockThemeConfig = Cypress.env('unlock_store')

    this.input_password = unlockThemeConfig.input_password
    this.password_store = unlockThemeConfig.password_store
  }

  break_password () {
    cy.get(this.input_password).type(this.password_store + '{enter}')
  }
}
export const unlockTheme = new UnlockTheme()
