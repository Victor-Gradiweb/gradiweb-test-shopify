import { visitAndBreakPassword } from "../../commands/visit-web-site";
import designSystemEnv from '../.env/design-system.json';

Cypress.on('uncaught:exception', () => false);

const $carouselProducts = () => cy.get(designSystemEnv.sections.carousel_products);
const $carouselProductCards = () => $carouselProducts().find(designSystemEnv.product_card.card);

/**
 * Creates a function that checks if an element's property is not empty.
 * @param {string} selector - The CSS selector for the property to be checked.
 * @param {string} errorMessage - The error message to be displayed if the property is empty.
 * @returns {function(JQuery<HTMLElement>, number): void} - A function that checks the element's property and logs the value if it's not empty.
 */
const checkElementNotEmpty = (selector, errorMessage) => {
  return ($element, i) => {
    cy.wrap($element)
      .find(selector)
      .should('not.be.empty')
      .then($item => {
        const itemText = $item.text().trim();
        if (itemText === '') {
          throw new Error(`${errorMessage} ${i}`);
        } else {
          cy.log(`${i}: ${itemText}`);
        }
      });
  };
};

/**
 * Checks if the number of images within an element falls within the specified range.
 * @param {JQuery<HTMLElement>} $card - The jQuery element containing the images to be checked.
 * @returns {void}
 */
const checkImageCount = ($card) => {
  cy.wrap($card).find('img').should('have.length.within', 1, 2);
};

/**
 * Checks that the title inside the element is not empty.
 * @type {function(JQuery<HTMLElement>, number): void}
 */
const checkTitleNotEmpty = checkElementNotEmpty(designSystemEnv.product_card.title_card, 'The title is empty in element');

/**
 * Checks that the price inside the element is not empty.
 * @type {function(JQuery<HTMLElement>, number): void}
 */
const checkPriceNotEmpty = checkElementNotEmpty(designSystemEnv.product_card.price, 'Price');

/**
 * Performs the action of adding a product.
 * @param {JQuery<HTMLElement>} $card - The jQuery element representing the product.
 * @returns {void}
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
};

describe('E-commerce Testing: carousel products', () => {
  beforeEach(() => {
    visitAndBreakPassword();
  });

  it('Verify wrapper 1440', () => {
    cy.wrapperHD(designSystemEnv.sections.dual_section);
  });

  it('Verify wrapper 1920', () => {
    cy.wrapperFullHD(designSystemEnv.sections.dual_section);
  });

  it('contains at least one image and maximum two images', () => {
    $carouselProductCards().each(($card) => {
      checkImageCount($card);
    });
  });

  it('the card should include a title', () => {
    $carouselProductCards().each(checkTitleNotEmpty);
  });

  it('should verify that each card includes a price', () => {
    $carouselProductCards().each(checkPriceNotEmpty);
  });

  it('Action to add product from the carousel', () => {
    $carouselProductCards().each(performAddProductAction);
  });
});