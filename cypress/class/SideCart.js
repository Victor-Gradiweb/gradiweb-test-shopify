import { productPage } from '../class/ProductPage'

const productTest = `products/${Cypress.env('product_url')}?${Cypress.env('preview_theme')}`

/**
 * The SideCart class represents the page object for the side cart functionality.
 * It initializes selectors for side cart, open and close icons, items, input quantity, and delete product from Cypress environment variables.
 * @class
 */
export class SideCart {
  /**
   * @constructor
   * @description Initialize selectors for side cart, open and close icons, items, input quantity, and delete product from Cypress environment variables.
   */
  constructor () {
    /**
     * @type {Object}
     * * @property {string} section_header - Selector for the header section.
     * @property {string} section_sidecart - Selector for the side cart section.
     * @property {string} open_sidecart_icon - Selector for the open side cart icon.
     * @property {string} close_sidecart_icon - Selector for the close side cart icon.
     * @property {string} item_cart - Selector for the item cart.
     * @property {string} input_quantity - Selector for the input quantity.
     * @property {string} delete_product - Selector for the delete product button.
     */
    const sideCartConfig = Cypress.env('sidecart')
    const globalConfig = Cypress.env('global')

    this.sidecartSelectors = {
      section_header: sideCartConfig.section_header,
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

  /**
   * Public method: openSideCart
   * @description Opens the side cart, clicking on the open side cart icon and checks if the side cart is active.
   */
  openSideCart () {
    cy.get(this.sidecartSelectors.section_header).then((header) => {
      const openIconExists = header.find(this.sidecartSelectors.open_sidecart_icon).length > 0
      if (openIconExists) {
        this.clickOnOpenSideCartIcon()
        this.checkIfSideCartIsActive()
      } else {
        cy.log('The open_sidecart_icon element is not present in the section. The open test has been omitted.')
      }
    })
  }

  /**
   * Clicks on the specified selector.
   * @param {string} selector - The selector to click on.
   */
  click (selector) {
    cy.get(selector).click()
  }

  /**
   * Checks the attribute value of the specified selector.
   * @param {string} selector - The selector to check.
   * @param {string} attribute - The attribute to check.
   * @param {string} value - The expected value of the attribute.
   */
  checkAttr (selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value)
  }

  /**
   * Public method: clickOnOpenSideCartIcon
   * @description Clicks on the open side cart icon.
   */
  clickOnOpenSideCartIcon () {
    this.click(this.sidecartSelectors.open_sidecart_icon)
  }

  /**
   * Public method: checkIfSideCartIsActive
   * @description Checks if the side cart is active.
   */
  checkIfSideCartIsActive () {
    this.checkAttr(this.sidecartSelectors.section_sidecart, 'data-active', 'true')
  }

  /**
   * Public method: closeSideCart
   * @description Closes the side cart, clicking on the close side cart icon and checks if the side cart is inactive.
   */
  closeSideCart () {
    this.clickOnCloseSideCartIcon()
    this.checkIfSideCartIsInactive()
  }

  /**
   * Public method: clickOnCloseSideCartIcon
   * @description Clicks on the close side cart icon.
   */
  clickOnCloseSideCartIcon () {
    this.click(this.sidecartSelectors.close_sidecart_icon)
  }

  /**
   * Public method: checkIfSideCartIsInactive
   * @description Checks if the side cart is inactive.
   */
  checkIfSideCartIsInactive () {
    this.checkAttr(this.sidecartSelectors.section_sidecart, 'data-active', 'false')
  }

  /**
   * Public method: navigateToNextUpsell
   * @description Navigates to the next upsell.
   */
  navigateToNextUpsell () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .then(($sidecartSection) => {
        const ctaExists = $sidecartSection.find(this.globalSelectors.cta).length > 1
        if (ctaExists) {
          this.navigateToUpsell(this.globalSelectors.slider_next)
        } else {
          cy.log("The element 'upsell' is not found inside 'sidecart_section'. The arrow test has been omitted.")
        }
      })
  }

  /**
   * Public method: navigateToPreviousUpsell
   * @description Navigates to the previous upsell.
   */
  navigateToPreviousUpsell () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .then(($sidecartSection) => {
        const ctaExists = $sidecartSection.find(this.globalSelectors.cta).length > 1
        if (ctaExists) {
          this.navigateToUpsell(this.globalSelectors.slider_next)
          this.navigateToUpsell(this.globalSelectors.slider_prev)
        } else {
          cy.log("The element 'upsell' is not found inside 'sidecart_section'. The arrow test has been omitted.")
        }
      })
  }

  /**
   * Navigates to the upsell using the specified selector.
   * @param {string} selector - The selector to navigate to.
   */
  navigateToUpsell (selector) {
    cy.get(this.sidecartSelectors.section_sidecart).find(selector).click()
    cy.get(selector).should('not.have.attr', 'aria-disabled', 'false')
  }

  /**
   * Adds a product to the cart.
   * If the 'cta' element is found within the 'sidecart_section', it adds a product from the upsell section.
   * Otherwise, logs a message and navigates to the product page to add the product to the cart.
   */
  addToCart () {
    cy.get(this.sidecartSelectors.section_sidecart).then(($sidecartSection) => {
      const ctaExists = $sidecartSection.find(this.globalSelectors.cta).length > 1
      if (ctaExists) {
        this.addProductInUpsellSection(3)
      } else {
        cy.log("The 'cta' element is not found within the 'sidecart_section'. Skipping product addition.")
        cy.visit(productTest)
        productPage.addToCartProductPage()
        sideCart.verifyQuantityAttribute(1)
      }
    })
  }

  /**
   * Public method: addSecondProductInUpsellSection
   * @description Adds the second product in the upsell section with a specific quantity.
   */
  addSecondProductInUpsellSection () {
    this.addProductInUpsellSectionWithQuantity(1, 2)
  }

  /**
   * Adds products to the upsell section.
   * @param {number} quantity - The quantity of products to add.
   */
  addProductInUpsellSection (quantity) {
    for (let i = 0; i < quantity; i++) {
      this.addProductFromUpsell()
      this.checkNumberOfItemCarts(i + 1)
    }
  }

  /**
   * Adds products to the upsell section with a specified quantity.
   * @param {number} quantity - The quantity of products to add.
   * @param {number} expectedQuantity - The expected quantity to check.
   */
  addProductInUpsellSectionWithQuantity (quantity, expectedQuantity) {
    this.addProductFromUpsell()
    this.checkSideCartIsActive()
    this.checkNumberOfItemCarts(1)
    this.closeSideCart()
    this.addProductFromUpsell()
    this.checkQuantityInputValue(expectedQuantity)
    this.checkNumberOfItemCarts(1)
  }

  /**
   * Adds a product from the upsell section.
   */
  addProductFromUpsell () {
    cy.get(this.sidecartSelectors.section_sidecart).find(this.globalSelectors.cta).first().click()
  }

  /**
   * Checks the number of item carts.
   * @param {number} number - The expected number of item carts.
   */
  checkNumberOfItemCarts (number) {
    cy.get(this.sidecartSelectors.item_cart).should('have.length', number)
  }

  /**
   * Checks if the side cart is active.
   */
  checkSideCartIsActive () {
    cy.get(this.sidecartSelectors.section_sidecart).should('have.attr', 'data-active', 'true')
  }

  /**
   * Checks the quantity input value.
   * @param {number} value - The expected quantity value.
   */
  checkQuantityInputValue (value) {
    cy.get(this.sidecartSelectors.input_quantity).should('have.attr', 'data-quantity', value.toString())
  }

  goToHomePageAndOpenCart () {
    cy.visit('')
    this.openSideCart()
  }

  /**
   * Public method: plusQuantity
   * @description Increases the quantity of the product.
   */
  plusQuantity () {
    this.goToHomePageAndOpenCart()
    this.incrementQuantity(2)
  }

  /**
   * Public method: removeQuantity
   * @description Decreases the quantity of the product.
   */
  removeQuantity () {
    this.plusQuantity()
    this.goToHomePageAndOpenCart()
    this.decrementQuantity(1)
  }

  /**
   * Public method: incrementQuantity
   * @description Increases the quantity of the product.
   * @param {number} value - The value to increment the quantity by.
   */
  incrementQuantity (value) {
    this.clickPlusButton()
    this.verifyQuantityAttribute(2)
  }

  /**
   * Public method: decrementQuantity
   * @description Decreases the quantity of the product.
   */
  decrementQuantity () {
    this.clickSubtractButton()
    this.verifyQuantityAfterSubtraction()
  }

  /**
   * Clicks the plus button to increment quantity.
   */
  clickPlusButton () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find('[data-action="plus"]')
      .first()
      .click({ force: true })
  }

  /**
   * Verifies the quantity attribute after incrementing.
   * @param {number} expectedQuantity - The expected quantity value.
   */
  verifyQuantityAttribute (expectedQuantity) {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find(this.sidecartSelectors.input_quantity)
      .first()
      .should('have.attr', 'data-quantity', expectedQuantity.toString())
  }

  /**
   * Clicks the subtract button to decrement quantity.
   */
  clickSubtractButton () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find('[data-action="subtr"]')
      .first()
      .click({ force: true })
  }

  /**
   * Verifies the quantity after subtraction.
   */
  verifyQuantityAfterSubtraction () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find(this.sidecartSelectors.item_cart)
      .then(($itemProduct) => {
        if ($itemProduct.length > 0) {
          this.verifyQuantityAttribute('1')
        } else {
          cy.get(this.sidecartSelectors.item_cart).should('not.exist')
        }
      })
  }

  /**
   * Public method: getProductCountInCart
   * @description Retrieves the length of the item cart.
   * @returns {Promise<number>} A promise that resolves to the number of items in the cart.
   */
  getProductCountInCart () {
    return cy.get(this.sidecartSelectors.item_cart).then(($itemProduct) => $itemProduct.length)
  }

  /**
   * Public method: deleteFirstProduct
   * @description Deletes the first product in the side cart.
   */
  deleteFirstProduct () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find(this.sidecartSelectors.delete_product)
      .first()
      .click()
  }

  /**
   * Public method: checkProductWasDeleted
   * @description Checks if the product was deleted.
   */
  checkProductWasDeleted () {
    this.getProductCountInCart().then((productCountBeforeDelete) => {
      this.deleteFirstProduct()
      this.getProductCountInCart().should('eq', productCountBeforeDelete - 1)
    })
  }

  /**
   * Public method: deleteProduct
   * @description Deletes a product from the side cart.
   */
  deleteProduct () {
    this.checkProductWasDeleted()
  }

  /**
   * Public method: goCheckout
   * @description Navigates to the checkout page by clicking on the checkout button in the side cart.
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

/**
 * Instance of the SideCart class.
 * @type {SideCart}
 */
export const sideCart = new SideCart()
