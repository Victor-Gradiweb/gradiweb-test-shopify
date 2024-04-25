import { visitAndBreakPassword } from "../../commands/visit-web-site"
import designSystemEnv from '../.env/design-system.json'

const $section = designSystemEnv.sections.dual_section
/**
 * Verifies if there is an image present in the specified section.
 * @returns {void}
 */
function verificarImagen() {
    cy.get($section).find('img').should('be.visible')
}

/**
 * Verifies the existence of titles (h1 to h6) in the specified section and applies styles.
 * @returns {void}
 */
function verifyStylesTitles() {
    cy.get($section).find('h1, h2, h3, h4, h5, h6').should('exist').then(() => {
        cy.headings(designSystemEnv.sections.dual_section)
    })
}

/**
 * Verifies the existence of buttons in the specified section and applies styles.
 * @returns {void}
 */
function verifyStylesButton() {
    const buttonSelectors = Object.values(designSystemEnv.buttons)
    cy.get($section).then(() => {
        if (buttonSelectors.some(selector => Cypress.$(selector).length > 0)) {
            cy.buttons(designSystemEnv.sections.dual_section)
        }
    })
}



describe('E-commerce Testing: Dual section', () => {
    beforeEach(() => {
        visitAndBreakPassword()
    })

    it('Verify image', verificarImagen)

    it('Verify styles titles', verifyStylesTitles)

    it('Verify styles button', verifyStylesButton)

    it('Text body', () => { cy.body(designSystemEnv.sections.dual_section) })
})

