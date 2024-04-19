import dsEnvironment from '../.env/env.ds.json';
describe('E-commerce Testing: System Design Review', () => {
    beforeEach('visit website', () => {
        cy.session('break password', () => {
            cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
            cy.breakPassword()
        })
        cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
    })

    it('Headings', () => {
        cy.headings(dsEnvironment.PARENT.CTA)
    })
    it('body text', () => {
        cy.body(dsEnvironment.PARENT.CTA)
    })
    it('buttons', () => {
        cy.buttons(dsEnvironment.PARENT.DUAL)
    })  
})