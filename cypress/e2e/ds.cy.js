import globalEnvironment from '../.env/env.global.json';
Cypress.on('uncaught:exception', () => { return false })

describe('E-commerce Testing: System Design Review', () => {
    beforeEach('visit website', () => {
        cy.session('break password', () => {
            cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
            cy.breakPassword()
        })
        cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
    })

    it('Headings', () => {
        cy.headings()
    })
    
})