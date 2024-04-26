import { visitAndBreakPassword } from "../../commands/visit-web-site"
import designSystemEnv from '../.env/design-system.json'

/**
 * Verifies the visibility of images within a designated section of the design system.
 * @returns {void}
 * @description This function verifies that images within a designated section of the design system are visible.
 */
function verificarImagen() {
    cy.get(designSystemEnv.sections.dual_section).find('img').should('be.visible')
}

describe('E-commerce Testing: Dual section', () => {
    beforeEach(() => {
        visitAndBreakPassword()
    })

    it('Verify wrapper 1440', () => { cy.wrapperHD(designSystemEnv.sections.dual_section) })

    it('Verify wrapper 1920', () => { cy.wrapperFullHD(designSystemEnv.sections.dual_section) })

    it('Verify image', verificarImagen)

    it('Verify styles titles', () => { cy.headings(designSystemEnv.sections.dual_section) })

    it('Verify styles text body', () => { cy.body(designSystemEnv.sections.dual_section) })

    it('Verify styles button', () => { cy.buttons(designSystemEnv.sections.dual_section) })

})

