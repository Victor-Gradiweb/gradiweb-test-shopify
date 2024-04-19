import dsEnvironment from '../.env/env.ds.json';
describe('E-commerce Testing: System Design Review Document', () => {
    beforeEach('visit website', () => {
        cy.session('break password', () => {
            cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
            cy.breakPassword()
        })
        cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
    })
 
    it('body Document', () => {
        cy.bodyDocument()
    })  
})