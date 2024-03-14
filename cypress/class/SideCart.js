const productHandle = `products/${Cypress.env('product_handle')}?${Cypress.env('preview_theme')}`
/**
 * Represents a side cart functionality.
 * @module SideCart
 */
export class SideCart {
  /**
   * Creates an instance of SideCart.
   * @constructor
   */
  constructor () {
    /**
     * Selector for the side cart element.
     * @type {string}
     */
    this.sideCartSelector = Cypress.env('sidecart')

    /**
     * Selector for the product page element.
     * @type {string}
     */
    this.productPageSelector = Cypress.env('product_page')
  }

  /**
   * Opens the side cart.
   * @param {Object} body - The body element.
   * @returns {void}
   */
  openSideCart (body) {
    cy.get('body').then((body) => {
      this.checkIconCartExistence(body)
      this.click(this.sideCartSelector.open_sidecart_icon)
      this.checkIfSideCartIsActive()
    })
  }

  /**
   * Checks the existence of the cart icon.
   * @param {Object} body - The body element.
   * @returns {void}
   * @throws {Error} Throws an error if the cart icon is not found.
   */
  checkIconCartExistence (body) {
    if (body.find(this.sideCartSelector.open_sidecart_icon).length === 0) {
      throw new Error(
        `SideCart not found. Check the environment variable: ${this.sideCartSelector.open_sidecart_icon} or ensure the DOM section exists.`
      )
    }
  }

  /**
   * Clicks on a selector.
   * @param {string} selector - The selector to click.
   * @returns {void}
   */
  click (selector) {
    cy.get(selector).click()
  }

  /**
   * Checks an attribute of a selector.
   * @param {string} selector - The selector to check.
   * @param {string} attribute - The attribute to check.
   * @param {string} value - The expected value of the attribute.
   * @returns {void}
   */
  checkAttr (selector, attribute, value) {
    cy.get(selector).should('have.attr', attribute, value)
  }

  /**
   * Checks if the side cart is active.
   * @returns {void}
   */
  checkIfSideCartIsActive () {
    this.checkAttr(
      this.sideCartSelector.section_sidecart,
      'data-active',
      'true'
    )
  }

  /**
   * Checks if the side cart is inactive.
   * @returns {void}
   */
  checkIfSideCartIsInactive () {
    this.checkAttr(
      this.sideCartSelector.section_sidecart,
      'data-active',
      'false'
    )
  }

  /**
   * Closes the side cart.
   * @returns {void}
   */
  closeSideCart () {
    cy.get('body').then((body) => {
      if (body.get(this.checkIfSideCartIsActive()).length > 0) {
        this.click(this.sideCartSelector.close_sidecart_icon)
        this.checkIfSideCartIsInactive()
      }
    })
  }

  /**
   * Navigates to the next upsell.
   * @returns {void}
   */
  navigateToNextUpsell () {
    cy.get('body').then((body) => {
      if (body.get(this.checkIfSideCartIsActive()).length > 0) {
        this.clickNextUpsell()
      }
    })
  }

  /**
     * Navigates to the previous upsell.
     * @returns {void}
     */
  navigateToPrevtUpsell () {
    cy.get('body').then((body) => {
      if (body.get(this.checkIfSideCartIsActive()).length > 0) {
        this.clickPrevtUpsell()
      }
    })
  }

  /**
     * Clicks the next upsell arrow.
     * @returns {void}
     * @throws {Error} Throws an error if the next upsell arrow is not found.
     */
  clickNextUpsell () {
    const nextUpsell = this.sideCartSelector.arrow_next_upsell
    if (nextUpsell.length > 0) {
      cy.get(this.sideCartSelector.section_sidecart)
        .find(this.sideCartSelector.arrow_next_upsell)
        .click()
        .then(() => {
          this.checkPrevtUpsellEnabled()
        })
    } else {
      throw new Error(
          `SideCart arrows not found. Check the environment variable: ${this.sideCartSelector.arrow_next_upsell}, or ensure the DOM section exists`
      )
    }
  }

  /**
   * Clicks the previous upsell arrow.
   * @returns {void}
   * @throws {Error} Throws an error if the previous upsell arrow is not found.
   */
  clickPrevtUpsell () {
    const nextUpsell = this.sideCartSelector.arrow_prev_upsell
    if (nextUpsell.length > 0) {
      cy.get(this.sideCartSelector.section_sidecart)
        .find(this.sideCartSelector.arrow_prev_upsell)
        .click()
        .then(() => {
          this.checkPrevArrowDisabled()
        })
    } else {
      throw new Error(
        `SideCart arrows not found. Check the environment variable: ${this.sideCartSelector.arrow_prev_upsell}, or ensure the DOM section exists`
      )
    }
  }

  /**
   * Checks if the previous upsell arrow is disabled.
   * @returns {void}
   */
  checkPrevArrowDisabled () {
    cy.get(this.sideCartSelector.section_sidecart)
      .find(this.sideCartSelector.arrow_prev_upsell)
      .should('not.have.attr', 'aria-disabled', 'false')
  }

  /**
   * Checks if the previous upsell arrow is enabled.
   * @returns {void}
   */
  checkPrevtUpsellEnabled () {
    cy.get(this.sideCartSelector.section_sidecart)
      .find(this.sideCartSelector.arrow_prev_upsell)
      .should('not.have.attr', 'aria-disabled', 'true')
  }

  /**
   * Adds a product to the cart.
   * @returns {void}
   */
  addToCart () {
    cy.get('body').then((body) => {
      if (body.get(this.checkIfSideCartIsActive()).length > 0) {
        this.handleSideCartIsActive()
      } else {
        cy.visit(productHandle)
        this.handleProductPage()
      }
    })
  }

  /**
   * Handles actions when the side cart is active.
   * @returns {void}
   */
  handleSideCartIsActive () {
    if (this.sideCartSelector.card_upsell.length > 0) {
      this.handleCardUpsell()
    }
  }

  /**
     * Handles actions when there is a card upsell.
     * @returns {void}
     */
  handleCardUpsell () {
    if (this.sideCartSelector.add_product_upsell_btn.length > 0) {
      this.handleAddProductUpsellBtn()
    } else {
      this.handleCardUpsellClick()
    }
  }

  /**
     * Handles clicking the add product upsell button.
     * @returns {void}
     */
  handleAddProductUpsellBtn () {
    for (let i = 0; i < 2; i++) {
      cy.get(this.sideCartSelector.add_product_upsell_btn)
        .eq(i)
        .click()
        .then(() => {
          cy.get(this.sideCartSelector.cart_item).should('have.length', i + 1)
        })
    }
  }

  /**
     * Handles clicking on a card upsell.
     * @returns {void}
     */
  handleCardUpsellClick () {
    cy.get(this.sideCartSelector.card_upsell)
      .first()
      .click()
      .then(() => {
        cy.url().should('include', 'products/')
        this.handleProductPage()
      })
  }

  /**
     * Handles actions on the product page.
     * @returns {void}
     */
  handleProductPage () {
    cy.get('body').then((body) => {
      if (body.get(this.productPageSelector.section_product.length > 0)) {
        if (this.productPageSelector.add_product_product_page.is(':enabled')) {
          this.handleAddProductProductPage()
        } else {
          throw new Error(
            'This product is out of stock. Add quantity to product to add to cart.'
          )
        }
      }
    })
  }

  /**
   * Handles adding a product on the product page.
   * @returns {void}
   */
  handleAddProductProductPage () {
    cy.get(this.productPageSelector.add_product_product_page)
      .click()
      .then(() => {
        cy.get(this.sideCartSelector.cart_item).should('have.length', 1)
      })
  }

  /**
   * Increases the quantity of a product in the side cart.
   * @returns {void}
   * @throws {Error} Throws an error if there are no products in the side cart.
   */
  plusQuantity () {
    if (this.sideCartSelector.cart_item.length > 0) {
      this.clickPlusButton()
    } else {
      throw new Error('Make sure there is at least one product in your cart.')
    }
  }

  /**
   * Decreases the quantity of a product in the side cart.
   * @returns {void}
   * @throws {Error} Throws an error if there are no products in the side cart.
   */
  decrementQuantity () {
    if (this.sideCartSelector.cart_item.length > 0) {
      this.clickDecrementButton()
    } else {
      throw new Error('Make sure you have selected plusQuantity beforehand.')
    }
  }

  /**
   * Verifies the quantity of a product in the side cart.
   * @param {number} expectedQuantity - The expected quantity of the product.
   * @returns {void}
   */
  verifyQuantity (expectedQuantity) {
    cy.get(this.sideCartSelector.input_quantity)
      .first()
      .should('have.attr', 'data-quantity', expectedQuantity)
  }

  /**
   * Clicks the plus button to increase the quantity of a product in the side cart.
   * @returns {void}
   */
  clickPlusButton () {
    cy.get(this.sideCartSelector.section_sidecart)
      .find('[data-action="plus"]')
      .first()
      .click({ force: true })
      .then(() => this.verifyQuantity(2))
  }

  /**
   * Clicks the decrement button to decrease the quantity of a product in the side cart.
   * @returns {void}
   */
  clickDecrementButton () {
    cy.get(this.sideCartSelector.section_sidecart)
      .find('[data-action="subtr"]')
      .first()
      .click({ force: true })
      .then(() => this.verifyQuantity(1))
  }

  /**
   * Deletes the first product from the side cart.
   * @returns {void}
   */
  deleteFirstProduct () {
    this.getCartItems().then($cartItems => {
      this.clickDeleteButton($cartItems.first())
    })
  }

  /**
     * Retrieves all cart items.
     * @returns {Object} - A jQuery object representing the cart items.
     */
  getCartItems () {
    return cy.get(this.sideCartSelector.cart_item).should('exist')
  }

  /**
     * Clicks the delete button to remove a product from the side cart.
     * @param {Object} $cartItem - The cart item to delete.
     * @returns {void}
     */
  clickDeleteButton ($cartItem) {
    $cartItem.find(this.sideCartSelector.delete_product).click()
    cy.wait(1000)
    this.assertRemainingCartItems()
  }

  /**
     * Asserts the remaining number of items in the side cart.
     * @returns {void}
     */
  assertRemainingCartItems () {
    cy.get(this.sideCartSelector.cart_item).should('have.length', 1)
  }
}

/**
   * Represents a side cart instance.
   * @type {SideCart}
   */
export const sideCart = new SideCart()
