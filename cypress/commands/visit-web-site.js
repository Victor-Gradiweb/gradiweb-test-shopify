/**
 * Visits a URL and breaks the password if necessary.
 * 
 * @param {string} [PREVIEW_THEME] The ID of the preview theme.
 * @returns {void}
 */
export function visitAndBreakPassword() {
    const url = `?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`
    cy.session('break password', () => {
        cy.visit(url)
        cy.url().then((url) => {
            if (url.includes('/password')) {
                cy.breakPassword()
            }
        })
    })
    cy.visit(url)
}
