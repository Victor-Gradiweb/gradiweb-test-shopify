export class UnlockTheme {
  constructor () {
    this.input = Cypress.env('unlock_store').input
    this.password = Cypress.env('unlock_store').password
  }

  password_store () {
    cy.get(this.input).type(this.password + '{enter}')
  }
}
export const unlockTheme = new UnlockTheme()
