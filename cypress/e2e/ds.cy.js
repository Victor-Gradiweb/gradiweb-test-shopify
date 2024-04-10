import globalEnvironment from '../.env/env.global.json';
Cypress.on('uncaught:exception', () => { return false })

describe('E-commerce Testing: System Design Review', () => {
    beforeEach('visit website', () => {
        cy.session('break password', () => {
            cy.visit(`${globalEnvironment.BASE_URL}?preview_theme_id=${globalEnvironment.PREVIEW_THEME}`)
            cy.breakPassword()
        })
        cy.visit(`${globalEnvironment.BASE_URL}?preview_theme_id=${globalEnvironment.PREVIEW_THEME}`)
    })

    it('Headings', () => {
        cy.headings()
    })
    
})