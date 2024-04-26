import { visitAndBreakPassword } from "../../commands/visit-web-site"
import designSystemEnv from '../.env/design-system.json'

Cypress.on('uncaught:exception', () => {
  return false
})

const $carouselProducts = () => cy.get(designSystemEnv.sections.carousel_products)
const $carouselProductCards = () => $carouselProducts().find(designSystemEnv.product_card.card)

/**
 * Checks if the number of images within an element falls within the specified range.
 * @param {JQuery<HTMLElement>} $card - The jQuery element containing the images to be checked.
 * @returns {void}
 */
const checkImageCount = ($card) => {
  cy.wrap($card).find('img').should('have.length.within', 1, 2)
}

/**
 * Checks that the title inside the element is not empty.
 * @param {JQuery<HTMLElement>} $card - The jQuery element containing the title to be checked.
 * @param {number} i - Index of the element for identification purposes.
 * @returns {void}
 */
const checkTitleNotEmpty = ($card, i) => {
  cy.wrap($card).find(designSystemEnv.product_card.title_card)
    .should('not.be.empty')
    .then($title => {
      const titleText = $title.text().trim()
      if (titleText === '') {
        throw new Error(`The title is empty in element ${i}`)
      } else {
        cy.log(`${i}: ${titleText}`)
      }
    })
}

/**
 * Checks that the price inside the element is not empty.
 * @param {JQuery<HTMLElement>} $card - The jQuery element containing the price to be checked.
 * @param {number} i - Index of the element for identification purposes.
 * @returns {void}
 */
const checkPriceNotEmpty = ($card, i) => {
  cy.wrap($card)
    .find(designSystemEnv.product_card.price)
    .invoke('text')
    .then(priceText => {
      expect(priceText.trim()).to.not.be.empty
      cy.log(`Price ${i + 1}: ${priceText}`)
    })
}

/**
 * Performs the action of adding a product.
 * @param {JQuery<HTMLElement>} $card - The jQuery element representing the product.
 * @returns {void}
 */
const performAddProductAction = ($card) => {
  cy.get($card).find(Object.values(designSystemEnv.buttons).join(', ')).then(($buttons) => {
    if ($buttons.length > 0) {
      cy.get($buttons).first().click({ force: true })
    } else {
      cy.get($card).click().then(() => {
        cy.url().should('include', '/products')
      })
    }
  })
}

describe('E-commerce Testing: carousel products', () => {
  beforeEach(() => {
    visitAndBreakPassword()
  })

  it('Verify wrapper 1440', () => {
    cy.wrapperHD(designSystemEnv.sections.dual_section)
  })

  it('Verify wrapper 1920', () => {
    cy.wrapperFullHD(designSystemEnv.sections.dual_section)
  })

  it('contains at least one image and maximum two images', () => {
    $carouselProductCards().each(($card, i) => {
      checkImageCount($card)
    })
  })

  it('the card should include a title', () => {
    $carouselProductCards().each(($card, i) => {
      checkTitleNotEmpty($card, i)
    })
  })

  it('should verify that each card includes a price', () => {
    $carouselProductCards().each(($card, i) => {
      checkPriceNotEmpty($card, i)
    })
  })

  it('Action to add product from the carousel', () => {
    $carouselProductCards().each(($card, i) => {
      performAddProductAction($card)
    })
  })
})