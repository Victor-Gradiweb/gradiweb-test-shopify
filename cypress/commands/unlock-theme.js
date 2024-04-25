import unlockStoreEnvironment from '../e2e/.env/env.global.json'

export function breakPassword() {
  cy.get(unlockStoreEnvironment.INPUT_PASSWORD).then((inputPassword) => {
    if (inputPassword.length > 0) {
      cy.get(inputPassword).type(Cypress.env('PASSWORD_STORE')+ '{enter}',
      )
    }
  })
}

Cypress.Commands.add('breakPassword', breakPassword)
