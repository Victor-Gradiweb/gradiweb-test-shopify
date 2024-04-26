import { visitAndBreakPassword } from "../../commands/visit-web-site"
import designSystemEnv from '../.env/design-system.json'

/**
 * Test an individual button.
 * @param {jQuery} $button The button element to be tested.
 * @returns {void}
 */
const testButton = ($button) => {
    cy.wrap($button)
        .should('be.visible')
        .invoke('attr', 'href')
        .then((href) => {
            cy.request('GET', href)
                .then((response) => {
                    expect(response.status).to.equal(200)
                })
        })
}

/**
 * Test the hover effect of an individual button.
 * @param {jQuery} $button The button element to be tested.
 * @returns {void}
 */
const testButtonHover = ($button) => {
    cy.wrap($button)
        .trigger('mouseover')
        .should('have.css', 'background-color')
        .and('not.eq', 'transparent')
}

/**
 * Test buttons based on their selectors.
 * @param {jQuery} $parent The parent element containing the buttons.
 * @param {Object} buttons An object containing the selectors of the buttons.
 * @returns {void}
 */
const testButtons = ($parent, buttons) => {
    Object.values(buttons).forEach((buttonSelector) => {
        cy.get($parent).find(buttonSelector).each(($button) => {
            testButton($button)
        })
    })
}

/**
 * Test the hover effect of buttons based on their selectors.
 * @param {jQuery} $parent The parent element containing the buttons.
 * @param {Object} buttons An object containing the selectors of the buttons.
 * @returns {void}
 */
const testButtonHoverEffect = ($parent, buttons) => {
    Object.values(buttons).forEach((buttonSelector) => {
        cy.get($parent).find(buttonSelector).each(($button) => {
            testButtonHover($button)
        })
    })
}

// Assigning values to parent and buttons variables
const parent = designSystemEnv.sections.call_to_action
const buttons = designSystemEnv.buttons

describe('E-commerce Testing: call to action', () => {
    beforeEach(() => {
        visitAndBreakPassword()
    })

    it('Button Links Check', () => {
        cy.get(parent).then(($parent) => {
            testButtons($parent, buttons)
        })
    })

    it('Buttons Hover Effect', () => {
        cy.get(parent).then(($parent) => {
            testButtonHoverEffect($parent, buttons)
        })
    })

    it('Verify styles titles', () => { cy.headings(designSystemEnv.sections.call_to_action) })

    it('Verify styles button', () => { cy.buttons(designSystemEnv.sections.call_to_action) })

})