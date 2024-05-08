import productPageEnvironment from '../e2e/.env/env.product_page.json'
import sideCartEnvironment from '../e2e/.env/env.side_cart.json'
import { verifyProductAddedToSideCart} from './sidecartUpsellTB'

export function verifyProductAdditionToSideCart() {
  cy.get(productPageEnvironment.GLOBAL.PARENT)
    .find(productPageEnvironment.GLOBAL.ADD_PRODUCT)
    .then((addProduct) => {
      if (addProduct.attr('disabled')) {
        cy.get(productPageEnvironment.GLOBAL.OUT_OF_STOCK).should('be.visible')
      } else {
        addProduct.click()
        verifyProductAddedToSideCart()
      }
    })
}

Cypress.Commands.add('verifyProductAdditionToSideCart', verifyProductAdditionToSideCart)

export function checkBreadcrumbRedirection() {
  cy.get(productPageEnvironment.GLOBAL.PARENT)
    .find(productPageEnvironment.GLOBAL.BREADCRUMBS)
    .as('breadcrumbs')
    .find('a')
    .each((a, index) => {
      if (index <= 1) {
        cy.wrap(a).should('have.attr', 'href')
        cy.request('GET', a.prop('href')).then((response) => {
          expect(response.status).to.equal(200)
        })
      }
    })
    verifyTitleAndBreadcrumbConsistency()
}

Cypress.Commands.add('checkBreadcrumbRedirection', checkBreadcrumbRedirection)

export function verifyTitleAndBreadcrumbConsistency() {
  cy.get('h1')
    .should('exist')
    .and('be.visible')
    .invoke('text')
    .then((productTitle) => {
      verifyBreadcrumbText(productTitle)
    })
}

export function verifyBreadcrumbText(productTitle) {
  cy.get(productPageEnvironment.GLOBAL.PARENT)
    .find(productPageEnvironment.GLOBAL.BREADCRUMBS)
    .eq(-1)
    .invoke('text')
    .then((breadcrumbText) => {
      const trimmedProductTitle = productTitle.trim()
      const trimmedBreadcrumbText = breadcrumbText.trim()
      expect(trimmedBreadcrumbText).to.equal(trimmedProductTitle)
    })
}

Cypress.Commands.add('verifyTitleAndBreadcrumbConsistency', verifyTitleAndBreadcrumbConsistency)

function navigateImageMedia(direction) {
  const $parent = cy.get(productPageEnvironment.GLOBAL.PARENT);
  const $images = $parent.find(productPageEnvironment.GLOBAL.PRODUCT_MEDIA_IMG);
  const $nextArrow = cy.get(sideCartEnvironment.UPSELL.ARROW_NEXT_UPSELL).eq(0);
  const $prevArrow = cy.get(sideCartEnvironment.UPSELL.ARROW_PREV_UPSELL).eq(0);

  $images.then(($el) => {
    const totalImages = $el.length;
    let clickedImages = 0;

    $images.each(() => {
      if (clickedImages < totalImages - 1) {
        if (direction === 'next') {
          $nextArrow.click();
        } else if (direction === 'prev') {
          $prevArrow.click();
        }
        clickedImages++;
      }
    });

    if (direction === 'next') {
      $nextArrow.should('be.disabled');
      $prevArrow.should('have.attr', 'aria-disabled', 'true');
    } else if (direction === 'prev') {
      $prevArrow.should('be.disabled');
      $nextArrow.should('have.attr', 'aria-disabled', 'true');
    }
  });
}

export function nextImageMedia() {
  navigateImageMedia('next');
}

export function prevImageMedia() {
  navigateImageMedia('prev');
}

Cypress.Commands.add('nextImageMedia', nextImageMedia);
Cypress.Commands.add('prevImageMedia', prevImageMedia);
