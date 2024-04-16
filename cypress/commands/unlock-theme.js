import unlockStoreEnvironment from '../.env/env.global.json'

export function breakPassword() {
  cy.viewport(1440, 900)
  cy.get(unlockStoreEnvironment.INPUT_PASSWORD).then((inputPassword) => {
    if (inputPassword.length > 0) {
      cy.get(inputPassword).type(Cypress.env('PASSWORD_STORE')+ '{enter}',
      )
    }
  })
}

Cypress.Commands.add('breakPassword', breakPassword)
