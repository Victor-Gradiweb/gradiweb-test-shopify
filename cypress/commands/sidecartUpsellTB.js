import sideCartEnvironment from '../e2e/.env/env.side_cart.json'
import { verifyProductAdditionToSideCart } from "./product-page";

export function toggleSidecartActive() {
  cy.get(sideCartEnvironment.GLOBAL.OPEN_SIDECART)
    .click()
    .then(() => toggleCartVisibility())
}

export function toggleSidecartInactive() {
  cy.get(sideCartEnvironment.GLOBAL.CLOSE_SIDECART)
    .click()
    .then(() => toggleCartVisibility())
}

export function toggleCartVisibility() {
  cy.get(sideCartEnvironment.GLOBAL.PARENT).then((statusSideCart) => {
    if (statusSideCart.attr('data-active') === 'true') {
      cy.wrap(statusSideCart).should('have.attr', 'data-active', 'true')
    } else {
      cy.wrap(statusSideCart).should('have.attr', 'data-active', 'false')
    }
  })
}

Cypress.Commands.add('toggleSidecartActive', toggleSidecartActive) //commands ⬆
Cypress.Commands.add('toggleSidecartInactive', toggleSidecartInactive)

export function navigateToUpsell(direction) {
  const arrowSelector = getArrowSelector(direction)
  const ariaDisabledValue = getAriaDisabledValue(direction)

  cy.get(sideCartEnvironment.GLOBAL.PARENT)
    .find(arrowSelector)
    .should('not.have.attr', 'aria-disabled', ariaDisabledValue)

  validateUpsellInCart().then((numberOfUpsells) => {
    if (numberOfUpsells > 0) {
      const clicksNeeded = numberOfUpsells - 1
      for (let i = 0; i < clicksNeeded; i++) {
        cy.get(sideCartEnvironment.GLOBAL.PARENT).find(arrowSelector).click()
      }
      cy.get(arrowSelector).should(
        'not.have.attr',
        'aria-disabled',
        ariaDisabledValue,)
    }
  })
}

export function validateUpsellInCart() {
  return cy
    .get(sideCartEnvironment.GLOBAL.PARENT)
    .find(sideCartEnvironment.UPSELL.CARD_UPSELL)
    .then((cards) => cards.length)
}

export function getArrowSelector(direction) {
  return direction === 'next'
    ? sideCartEnvironment.UPSELL.ARROW_NEXT_UPSELL
    : sideCartEnvironment.UPSELL.ARROW_PREV_UPSELL
}

export function getAriaDisabledValue(direction) {
  return direction === 'next' ? 'true' : 'true'
}

Cypress.Commands.add('navigateToNextUpsell', () => navigateToUpsell('next'))
Cypress.Commands.add('navigateToPrevUpsell', () => navigateToUpsell('prev'))

export function addProductToUpsell() {
  cy.get(sideCartEnvironment.GLOBAL.PARENT).then((sideCart) => {
    if (sideCart.find(sideCartEnvironment.UPSELL.CARD_UPSELL).length>0) {
      cy.get(sideCartEnvironment.UPSELL.CARD_UPSELL).find('button').first().click()
      verifyProductAddedToSideCart()
    } else {
      cy.visit(`/products/${Cypress.env('HANDLE_PRODUCT')}?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
      verifyProductAdditionToSideCart()
    }
  })
}

export function verifyProductAddedToSideCart(){
  cy.get(sideCartEnvironment.GLOBAL.ITEM).should('be.visible')
}

Cypress.Commands.add('addProductToUpsell', addProductToUpsell) //commands ⬆

export function plusQuantity() {
  increaseQuantityByOne();
  verifyQuantity(2);
}

export function removeQuantity() {
  decreaseQuantityByOne();
  verifyQuantity(1);
}

export function increaseQuantityByOne() {
  cy.get(sideCartEnvironment.GLOBAL.PARENT)
    .find(sideCartEnvironment.GLOBAL.PLUS_QUANTITY)
    .click({ force: true });
}

export function decreaseQuantityByOne() {
  cy.get(sideCartEnvironment.GLOBAL.PARENT)
    .find(sideCartEnvironment.GLOBAL.REMOVE_QUANTITY)
    .click({ force: true });
}

export function verifyQuantity(expectedQuantity) {
  cy.get(sideCartEnvironment.GLOBAL.INPUT_QUANTITY)
    .should('have.value', expectedQuantity);
}

export function deleteProduct() {
  cy.get(sideCartEnvironment.GLOBAL.DELETE_PRODUCT).click().then(()=> {
    cy.get(sideCartEnvironment.GLOBAL.ITEM).should('not.exist')
  })
}

Cypress.Commands.add('plusQuantity', plusQuantity) //commands ⬆
Cypress.Commands.add('removeQuantity', removeQuantity) 
Cypress.Commands.add('deleteProduct', deleteProduct) 