import { sideCart } from './SideCart'

/**
 * Represents a product page.
 */
export class ProductPage {
  /**
   * Constructs a ProductPage object.
   */
  constructor () {
    // Selectors for the product page and side cart.
    this.productPageSelector = Cypress.env('product_page')
    this.sideCartSelector = Cypress.env('sidecart')
  }

  /**
   * Checks if the breadcrumbs are correctly displayed.
   */
  checkBreadcrumb () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        // Iterate through each breadcrumb link.
        cy.get(this.productPageSelector.section_product)
          .find(this.productPageSelector.breadcrumbs)
          .as('breadcrumbs')
          .find('a')
          .each(($a, index) => {
            if (index <= 1) {
              cy.wrap($a).should('have.attr', 'href')
            }
          })

        // Verify breadcrumb text matches product title.
        cy.get('h1').should('exist').and('be.visible').invoke('text').then(productTitle => {
          this.verifyBreadcrumbText(productTitle)
        })
      }
    })
  }

  /**
   * Verifies if the breadcrumb text matches the product title.
   * @param {string} productTitle - The title of the product.
   */
  verifyBreadcrumbText (productTitle) {
    cy.get('@breadcrumbs').eq(2).then(($breadcrumb) => {
      const breadcrumbText = $breadcrumb.text().trim()
      const trimmedProductTitle = productTitle.trim()
      cy.wrap(breadcrumbText).should('equal', trimmedProductTitle)
    })
  }

  /**
   * Checks if the product page is visible.
   * @returns {Promise<boolean>} A promise resolving to true if the product page is visible, otherwise false.
   */
  isProductPageVisible () {
    return cy.get('body').then((body) => {
      return body.find(this.productPageSelector.section_product).length > 0
    })
  }

  /**
   * Clicks on the arrow element specified by the selector.
   * @param {string} selector - The selector for the arrow element.
   */
  clickArrow (selector) {
    cy.get(this.productPageSelector.section_product)
      .find(selector)
      .click()
  }

  /**
   * Verifies if the next arrow for product media is enabled.
   */
  verifyNextArrowEnables () {
    cy.get(this.productPageSelector.section_product)
      .find(this.productPageSelector.arrow_next_product_media)
      .should('be.enabled')
  }

  /**
 * Verify if the previous arrow for navigating through product media is disabled.
 * @returns {void}
 */
  verifyPrevArrowDisables () {
    cy.get(this.productPageSelector.section_product)
      .find(this.productPageSelector.arrow_prev_product_media)
      .should('not.be.enabled')
  }

  /**
 * Check if product image exists on the product page.
 * @returns {void}
 */
  checkProductImage () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        cy.get(this.productPageSelector.product_media_img).each((img) => {
          cy.wrap(img).should('exist')
        })
      }
    })
  }

  /**
 * Clicks on the next arrow for upsell products and verifies if it enables the next arrow.
 * @returns {void}
 */
  clickNextUpsell () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        this.clickArrow(this.productPageSelector.arrow_next_product_media)
        this.verifyNextArrowEnables()
      }
    })
  }

  /**
 * Clicks on the previous arrow for upsell products and verifies if it disables the previous arrow.
 * @returns {void}
 */
  clickPrevtUpsell () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        this.clickArrow(this.productPageSelector.arrow_prev_product_media)
        this.verifyPrevArrowDisables()
      }
    })
  }

  /**
 * Verify if the image changes upon clicking the navigation arrow.
 * @returns {void}
 */
  verifyImageChangeOnArrowClick () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        let currentImageSrc
        cy.get(this.productPageSelector.product_media_img)
          .invoke('attr', 'src')
          .then((src) => {
            currentImageSrc = src
          })
        this.clickArrow(this.productPageSelector.arrow_next_product_media)
        cy.get(this.productPageSelector.product_media_img)
          .invoke('attr', 'src')
          .should('not.equal', currentImageSrc)
      }
    })
  }

  /**
 * Clicks on the next arrow until it becomes disabled.
 * @returns {void}
 */
  clickNextUntilDisabled () {
    const clickNext = () => {
      cy.get(this.productPageSelector.arrow_next_product_media).then($button => {
        if (!$button.prop('disabled')) {
          $button.click()
          clickNext()
        }
      })
    }
    clickNext()
    cy.get(this.productPageSelector.arrow_next_product_media).should('be.disabled')
  }

  /**
 * Check if the product title exists and is visible on the product page.
 * @returns {void}
 */
  checkProductTitle () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        cy.get('h1').should('exist').and('be.visible').invoke('text').as('productTitle')
      }
    })
  }

  /**
   * Adds the currently displayed product to the cart.
   * @returns {void}
   */
  addToCartProductPage () {
    let productTitle

    // Check if product page is visible
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
      // Get product title
        cy.get('h1').should('exist').and('be.visible').invoke('text').then((title) => {
          productTitle = title.trim()

          // Find and click add to cart button
          cy.get(this.productPageSelector.section_product)
            .find(this.productPageSelector.add_product_product_page)
            .then((addProduct) => {
              if (!addProduct.prop('disabled')) {
                addProduct.click()
                sideCart.checkIfSideCartIsActive()

                // Verify product added to cart
                cy.get(this.sideCartSelector.cart_item)
                  .should('have.length', 1)
                  .and('contain', productTitle)
              } else {
                throw new Error('Configure a product with stock')
              }
            })
        })
      }
    })
  }

  /**
 * Adds multiple quantities of the product to the cart.
 * @returns {void}
 */
  addMultipleQuantityToCartProductPage () {
    let initialQuantity = 0

    // Check if product page is visible
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
      // Get initial quantity
        this.getInitialQuantity().then((value) => {
          initialQuantity = parseInt(value)

          // Increment quantity and add to cart
          this.incrementQuantityAndAddToCart()

          // Verify cart quantity
          this.verifyCartQuantity(initialQuantity)
        })
      }
    })
  }

  /**
 * Retrieves the initial quantity of the product.
 * @returns {Promise<string>} The initial quantity as a string.
 */
  getInitialQuantity () {
    return cy.get(this.productPageSelector.input_quantity_from_productPage)
      .invoke('attr', 'value')
  }

  /**
 * Increments quantity and adds the product to the cart.
 * @returns {void}
 */
  incrementQuantityAndAddToCart () {
  // Click add quantity button
    cy.get(this.productPageSelector.add_quantity_from_productPage).click()

    // Click add to cart button
    cy.get(this.productPageSelector.add_product_product_page).click()

    // Check if side cart is active
    sideCart.checkIfSideCartIsActive()
  }

  /**
 * Verifies the quantity in the cart after adding the product.
 * @param {number} initialQuantity - The initial quantity of the product.
 * @returns {void}
 */
  verifyCartQuantity (initialQuantity) {
    cy.wrap(null).then(() => {
    // Check if cart quantity is updated
      cy.get(this.sideCartSelector.input_quantity)
        .should('have.value', (initialQuantity + 1).toString())
    })
  }
}

// Export an instance of ProductPage
export const productPage = new ProductPage()
