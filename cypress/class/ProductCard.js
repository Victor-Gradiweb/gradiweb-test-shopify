/**
 * Represents a ProductCard with methods for interacting with product cards on a web page.
 */
export class ProductCard {
  /**
   * Constructor for ProductCard class.
   * Initializes product card and sidecart selectors from Cypress environment variables.
   */
  constructor () {
    /** @type {Object} - Selector configuration for product card. */
    this.productCardSelector = Cypress.env('product_card')

    /** @type {Object} - Selector configuration for sidecart. */
    this.sidecartSelector = Cypress.env('sidecart')
  }

  // Checks the visibility and source URL of images within the product card without hover.
  checkImageWithoutHover () {
    cy.get('body').then((body) => {
      this.checkProductCardExistence(body)
      cy.get(this.productCardSelector.product_card).each((img, index) => {
        this.checkImageVisibilityAndSrc(img, index)
      })
    })
  }

  // Adds a random product to the cart, handling modal and sidecart interactions.
  addToCart () {
    cy.get('body').then((body) => {
      this.checkProductCardExistence(body)
      cy.get(this.productCardSelector.product_card).then((productCards) => {
        this.handleAddToCart(productCards)
      })
    })
  }

  /**
   * Checks if product cards exist on the page; throws an error if not.
   * @param {Object} body - The body element of the page.
   * @throws {Error} Throws an error if no product cards are found.
   */
  checkProductCardExistence (body) {
    if (body.find(this.productCardSelector.product_card).length === 0) {
      throw new Error(`Product cards not found. Check the environment variable: ${this.productCardSelector.product_card} or ensure the DOM section exists.`)
    }
  }

  /**
   * Checks the visibility and source URL of an image element.
   * Logs information or errors accordingly.
   * @param {Object} img - The image element.
   * @param {number} index - The index of the image.
   */
  checkImageVisibilityAndSrc (img, index) {
    try {
      cy.wrap(img)
        .find('img')
        .should('be.visible')
        .should('have.attr', 'src')
        .then((src) => {
          cy.log(`Image ${index + 1}: ${img}`)
          cy.log(`Image source URL: ${src}`)
        })
    } catch (error) {
      cy.log(`Error in Image ${index + 1}: ${error.message}`)
    }
  }

  /**
   * Handles the process of adding a random product to the cart.
   * @param {Object} productCards - The collection of product card elements.
   * @throws {Error} Throws an error if no product cards are found.
   */
  handleAddToCart (productCards) {
    if (productCards.length === 0) {
      throw new Error('No product cards found.')
    }

    const randomIndex = Math.floor(Math.random() * productCards.length)
    const randomProductCard = productCards.eq(randomIndex)

    if (randomProductCard.find('button').length > 0) {
      this.clickAddToCartButton(randomProductCard)
    } else {
      randomProductCard.click()
    }
  }

  /**
   * Clicks the "Add to Cart" button on a given product card.
   * @param {Object} randomProductCard - The randomly selected product card element.
   */
  clickAddToCartButton (randomProductCard) {
    cy.wrap(randomProductCard).find('button').click()
    this.handleProductModal()
  }

  /**
   * Handles interactions with the product modal and sidecart.
   */
  handleProductModal () {
    cy.get(this.productCardSelector.product_modal).then((modal) => {
      const isModalActive = modal.attr('data-active') === 'true'

      if (isModalActive) {
        cy.get(this.productCardSelector.product_modal).should('be.visible').find('button').click()
      } else {
        cy.get(this.sidecartSelector.section_sidecart).should('have.attr', 'data-active', 'true')
      }
    })
  }
}

/** @type {ProductCard} - An instance of the ProductCard class. */
export const productCard = new ProductCard()
