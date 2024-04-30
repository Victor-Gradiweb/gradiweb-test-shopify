import { visitAndBreakPassword } from "../../commands/visit-web-site"
import designSystem from '../.env/design-system.json'

describe('E-commerce Testing: Dual section', () => {
    beforeEach(() => {
        visitAndBreakPassword()
    })

    it('Verify headdings', () => { cy.verifyHeadings(designSystem.sections.dual_section, 'h1, h2, h3, h4, h5, h6') })
    it('Verify headdings Exception', () => { cy.verifyHeadings(designSystem.sections.footer, 'h2', { size: 18 }) })
    it('Verify button large', () => { cy.verifyButtons(designSystem.sections.call_to_action, 'large') })
    it('Verify button meidum', () => { cy.verifyButtons(designSystem.sections.call_to_action, 'medium') })
    // it('Verify button small', () => { cy.verifyButtons(designSystem.sections.call_to_action, 'small') }) // error empty data
    it('Verify p and span text styles', () => { cy.paragraphText(designSystem.sections.dual_section) })
    it('Verify text p and span styles per object', () => { 
        cy.paragraphText(designSystem.sections.dual_section, {
          fontSize: {
            p: 16, // Custom font size for <p>
            span: 14 // Custom font size for <span>
          }
        })
      })
})