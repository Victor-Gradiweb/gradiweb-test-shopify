import sideCartEnvironment from '../.env/env.side_cart.json'
import globalEnvironment from '../.env/env.global.json'
import productPageEnvironment from '../.env/env.product_page.json'

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
  const arrowSelector =
    direction === 'next'
      ? sideCartEnvironment.UPSELL.ARROW_NEXT_UPSELL
      : sideCartEnvironment.UPSELL.ARROW_PREV_UPSELL
  const ariaDisabledValue = direction === 'next' ? 'true' : 'true'

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
        ariaDisabledValue,
      )
    }
  })
}

export function validateUpsellInCart() {
  return cy
    .get(sideCartEnvironment.GLOBAL.PARENT)
    .find(sideCartEnvironment.UPSELL.CARD_UPSELL)
    .then((cards) => cards.length)
}

Cypress.Commands.add('navigateToNextUpsell', () => navigateToUpsell('next')) //commands ⬆
Cypress.Commands.add('navigateToPrevUpsell', () => navigateToUpsell('prev'))

export function addProductToUpsell() {
  cy.get(sideCartEnvironment.GLOBAL.PARENT).then((sideCart) => {
    if (sideCart.find(sideCartEnvironment.UPSELL.CARD_UPSELL).length>0) {
      cy.get(sideCartEnvironment.UPSELL.CARD_UPSELL).find('button').first().click()
      verifyProductAddedToSideCart()
    } else {
      cy.visit(`${globalEnvironment.BASE_URL}/products/${globalEnvironment.HANDLE_PRODUCT}?preview_theme_id=${globalEnvironment.PREVIEW_THEME}`)
      addProductToProductPage()
    }
  })
}

export function addProductToProductPage (){
  cy.get(productPageEnvironment.PARENT).find(productPageEnvironment.ADD_PRODUCT).click()
  verifyProductAddedToSideCart()
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