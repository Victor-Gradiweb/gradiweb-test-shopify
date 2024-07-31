let data // It will contain the selectors loaded from the fixture file.
before(() => {
  // Before all tests, load the selectors from the 'account' file as fixture.
  cy.fixture('account').then($el => {
    data = $el
  })
})

/**
 * Visit the page and unlock as needed.
 * If the URL includes 'password', enter the password stored in the environment.
 * @returns {void}
 */
function unlockTheme() {
  cy.session('unlockTheme', () => {
    cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
    cy.url().then(url => {
      if (url.includes('password')) {
        cy.get('#password').type(`${Cypress.env('PASSWORD_STORE')}{enter}`)
      }
    })
  })
  cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
}
Cypress.Commands.add('unlockTheme', unlockTheme)

/**
 * Custom Cypress command to login to the account.
 * Uses session handling to visit the account page and log in with provided credentials.
 * @function loginAccount
 */
function loginAccount() {
  cy.session('login Account', () => {
    cy.visit(`account/?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
    cy.url().then(url => {
      if (url.includes('account')) {
        cy.get(data.login.email_input).type(data.login.email)
        cy.get(data.login.password_input).type(`${data.login.password}{enter}`)
      }
    })
  })
  cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
}
Cypress.Commands.add('loginAccount', loginAccount)

