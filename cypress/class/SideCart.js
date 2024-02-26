/*
  The SideCart class represents the page object for the side cart functionality.
  It initializes selectors for side cart, open and close icons, items, input quantity, and delete product from Cypress environment variables.
*/

export class SideCart {
  constructor () {
    // Initialize selectors for side cart, open and close icons, items, input quantity, and delete product from Cypress environment variables
    const sideCartConfig = Cypress.env('sidecart')
    const globalConfig = Cypress.env('global')

    this.sidecartSelectors = {
      section_sidecart: sideCartConfig.section_sidecart,
      open_sidecart_icon: sideCartConfig.open_sidecart_icon,
      close_sidecart_icon: sideCartConfig.close_sidecart_icon,
      item_cart: sideCartConfig.item_cart,
      input_quantity: sideCartConfig.input_quantity,
      delete_product: sideCartConfig.delete_product
    }

    this.globalSelectors = {
      slider_next: globalConfig.slider_next,
      slider_prev: globalConfig.slider_prev,
      cta: globalConfig.cta
    }
  }

  /*
    Public method: openSideCart
    Description: Opens the side cart, clicking on the open side cart icon and checks if the side cart is active.
  */
  openSideCart () {
    this.clickOnOpenSideCartIcon()
    this.checkIfSideCartIsActive()
  }

  // Helper function: click
  click (selector) {
    cy.get(selector).click()
  }

  // Helper function: checkAttr
  checkAttr (selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value)
  }

  /*
    Public method: clickOnOpenSideCartIcon
    Description: Clicks on the open side cart icon.
  */
  clickOnOpenSideCartIcon () {
    this.click(this.sidecartSelectors.open_sidecart_icon)
  }

  /*
    Public method: checkIfSideCartIsActive
    Description: Checks if the side cart is active.
  */
  checkIfSideCartIsActive () {
    this.checkAttr(this.sidecartSelectors.section_sidecart, 'data-active', 'true')
  }

  /*
    Public method: closeSideCart
    Description: Closes the side cart, clicking on the close side cart icon and checks if the side cart is inactive.
  */
  closeSideCart () {
    this.clickOnCloseSideCartIcon()
    this.checkIfSideCartIsInactive()
  }

  /*
    Public method: clickOnCloseSideCartIcon
    Description: Clicks on the close side cart icon.
  */
  clickOnCloseSideCartIcon () {
    this.click(this.sidecartSelectors.close_sidecart_icon)
  }

  /*
    Public method: checkIfSideCartIsInactive
    Description: Checks if the side cart is inactive.
  */
  checkIfSideCartIsInactive () {
    this.checkAttr(this.sidecartSelectors.section_sidecart, 'data-active', 'false')
  }

  /*
    Public method: navigateToNextUpsell
    Description: Navigates to the next upsell.
  */
  navigateToNextUpsell () {
    this.navigateToUpsell(this.globalSelectors.slider_next)
  }

  /*
    Public method: navigateToPreviousUpsell
    Description: Navigates to the previous upsell.
  */
  navigateToPreviousUpsell () {
    this.navigateToUpsell(this.globalSelectors.slider_prev)
  }

  // Helper function: navigateToUpsell
  navigateToUpsell (selector) {
    cy.get(this.sidecartSelectors.section_sidecart).find(selector).click()
    cy.get(selector).should('not.have.attr', 'aria-disabled', 'false')
  }

  // Type 1
  /*
    Public method: addFirstProductInUpsellSection
    Description: Adds the first product in the upsell section.
  */
  addFirstProductInUpsellSection () {
    this.addProductInUpsellSection(3)
  }

  /*
    Public method: addSecondProductInUpsellSection
    Description: Adds the second product in the upsell section with a specific quantity.
  */
  addSecondProductInUpsellSection () {
    this.addProductInUpsellSectionWithQuantity(1, 2)
  }

  // Helper function: addProductInUpsellSection
  addProductInUpsellSection (quantity) {
    for (let i = 0; i < quantity; i++) {
      this.addProductFromUpsell()
      this.checkNumberOfItemCarts(i + 1)
    }
  }

  // Helper function: addProductInUpsellSectionWithQuantity
  addProductInUpsellSectionWithQuantity (quantity, expectedQuantity) {
    this.addProductFromUpsell()
    this.checkSideCartIsActive()
    this.checkNumberOfItemCarts(1)
    this.closeSideCart()
    this.addProductFromUpsell()
    this.checkQuantityInputValue(expectedQuantity)
    this.checkNumberOfItemCarts(1)
  }

  // Helper function: addProductFromUpsell
  addProductFromUpsell () {
    cy.get(this.sidecartSelectors.section_sidecart).find(this.globalSelectors.cta).first().click()
  }

  // Helper function: checkNumberOfItemCarts
  checkNumberOfItemCarts (number) {
    cy.get(this.sidecartSelectors.item_cart).should('have.length', number)
  }

  // Helper function: checkSideCartIsActive
  checkSideCartIsActive () {
    cy.get(this.sidecartSelectors.section_sidecart).should('have.attr', 'data-active', 'true')
  }

  // Helper function: checkQuantityInputValue
  checkQuantityInputValue (value) {
    cy.get(this.sidecartSelectors.input_quantity).should('have.attr', 'data-quantity', value.toString())
  }

  /*
    Public method: plusQuantity
    Description: Increases the quantity of the product.
  */
  plusQuantity () {
    this.incrementQuantity(2)
  }

  /*
    Public method: removeQuantity
    Description: Decreases the quantity of the product.
  */
  removeQuantity () {
    this.decrementQuantity()
  }

  /*
    Public method: incrementQuantity
    Description: Increases the quantity of the product.
  */
  incrementQuantity (value) {
    this.clickPlusButton()
    this.verifyQuantityAttribute(value)
  }

  /*
    Public method: decrementQuantity
    Description: Decreases the quantity of the product.
  */
  decrementQuantity () {
    this.clickSubtractButton()
    this.verifyQuantityAfterSubtraction()
  }

  // Method: clickPlusButton
  clickPlusButton () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find('[data-action="plus"]')
      .first()
      .click()
  }

  // Method: verifyQuantityAttribute
  verifyQuantityAttribute (expectedQuantity) {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find(this.sidecartSelectors.input_quantity)
      .first()
      .should('have.attr', 'data-quantity', expectedQuantity.toString())
  }

  // Method: clickSubtractButton
  clickSubtractButton () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find('[data-action="subtr"]')
      .first()
      .click()
  }

  // Method: verifyQuantityAfterSubtraction
  verifyQuantityAfterSubtraction () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find(this.sidecartSelectors.item_cart).then(($itemProduct) => {
        if ($itemProduct.length > 0) {
          this.verifyQuantityAttribute('1')
        } else {
          cy.get(this.sidecartSelectors.item_cart).should('not.exist')
        }
      })
  }

  /*
  Public method: getProductCountInCart
  Description: Retrieves the length of the item cart.
*/
  getProductCountInCart () {
    return cy.get(this.sidecartSelectors.item_cart).then(($itemProduct) => $itemProduct.length)
  }

  /*
  Public method: deleteFirstProduct
  Description: Deletes the first product in the side cart.
*/
  deleteFirstProduct () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find(this.sidecartSelectors.delete_product)
      .first()
      .click()
  }

  /*
  Public method: checkProductWasDeleted
  Description: Checks if the product was deleted.
*/
  checkProductWasDeleted () {
    this.getProductCountInCart().then((productCountBeforeDelete) => {
      this.deleteFirstProduct()
      this.getProductCountInCart().should('eq', productCountBeforeDelete - 1)
    })
  }

  /*
  Public method: deleteProduct
  Description: Deletes a product from the side cart.
*/
  deleteProduct () {
    this.checkProductWasDeleted()
  }

  /*
  Public method: goCheckout
  Description: Navigates to the checkout page by clicking on the checkout button in the side cart.
*/
  goCheckout () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find(this.globalSelectors.cta)
      .eq(6) // modify the index
      .click()
      .then(() => {
        cy.wait(500)
        cy.url().should('include', 'checkout')
      })
  }
}

// Export an instance of SideCart class
export const sideCart = new SideCart()
