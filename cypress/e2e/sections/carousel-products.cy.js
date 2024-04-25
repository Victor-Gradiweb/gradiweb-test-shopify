import { visitAndBreakPassword } from "../../commands/visit-web-site"
import designSystemEnv from '../.env/design-system.json'
Cypress.on('uncaught:exception', () => { return false })

/**
 * Checks if the number of images within an element falls within the specified range.
 * @param {JQuery<HTMLElement>} $card - The jQuery element containing the images to be checked.
 * @returns {void}
 * @description This function checks if the number of images within the element is within the specified range.
 */
const checkImageCount = ($card) => {
  cy.wrap($card).find('img').should('have.length.within', 1, 2);
}

/**
 * Checks that the title inside the element is not empty.
 * @param {JQuery<HTMLElement>} $card - The jQuery element containing the title to be checked.
 * @param {number} i - Index of the element for identification purposes.
 * @returns {void}
 * @description This function verifies that the title inside the element is not empty. If it's empty, it throws an error.
 */
const checkTitleNotEmpty = ($card, i) => {
  cy.wrap($card).find(designSystemEnv.product_card.title_card).should('not.be.empty').then($title => {
    const titleText = $title.text().trim();
    if (titleText === '') {
      throw new Error('The title is empty in element ' + i);
    } else {
      cy.log(i + ':', titleText);
    }
  });
}

/**
 * Checks that the price inside the element is not empty.
 * @param {JQuery<HTMLElement>} $card - The jQuery element containing the price to be checked.
 * @param {number} i - Index of the element for identification purposes.
 * @returns {void}
 * @description This function verifies that the price inside the element is not empty.
 */
const checkPriceNotEmpty = ($card, i) => {
  cy.wrap($card)
    .find(designSystemEnv.product_card.price)
    .invoke('text')
    .then(priceText => {
      expect(priceText.trim()).to.not.be.empty;
      cy.log(`Price ${i + 1}: ${priceText}`);
    });
}

/**
 * Performs the action of adding a product.
 * @param {JQuery<HTMLElement>} $card - The jQuery element representing the product.
 * @returns {void}
 * @description This function performs the action of adding a product by clicking the add button if available, otherwise, it clicks on the product element and verifies that the URL changes to the products page.
 */
const performAddProductAction = ($card) => {
  cy.get($card).find(Object.values(designSystemEnv.buttons).join(', ')).then(($buttons) => {
    if ($buttons.length > 0) {
      cy.get($buttons).first().click({ force: true });
    } else {
      cy.get($card).click().then(() => {
        cy.url().should('include', '/products');
      });
    }
  });
}


describe('E-commerce Testing: carousel products', () => {
  beforeEach(() => {
    visitAndBreakPassword()
  })

  it('contains at least one image and maximum two images', () => {
    cy.get(designSystemEnv.sections.carousel_products).find(designSystemEnv.product_card.card).each(($card, i) => {
      checkImageCount($card)
    })
  })

  it('the card should include a title', () => {
    cy.get(designSystemEnv.sections.carousel_products).find(designSystemEnv.product_card.card).each(($card, i) => {
      checkTitleNotEmpty($card, i)
    })
  })

  it('should verify that each card includes a price', () => {
    cy.get(designSystemEnv.sections.carousel_products)
      .find(designSystemEnv.product_card.card)
      .each(($card, i) => {
        checkPriceNotEmpty($card, i)
      })
  })

  it('Action to add product from the carousel', () => {
    cy.get(designSystemEnv.sections.carousel_products).find(designSystemEnv.product_card.card).then(($card, i) => {
      performAddProductAction($card)
    })
  })
})
