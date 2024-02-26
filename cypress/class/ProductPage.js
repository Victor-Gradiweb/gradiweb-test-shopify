/*
  The ProductPage class represents the page object for the product page.
  It initializes the selectors for product and sidecart elements from Cypress environment variables.
*/
export class ProductPage {
  constructor () {
    // Initialize selectors for product and sidecart elements from Cypress environment variables
    const productPageConfig = Cypress.env('product_page')
    const sidecartConfig = Cypress.env('sidecart')

    // Define selectors for product elements
    this.productSelectors = {
      section_product: productPageConfig.section_product,
      product_card: productPageConfig.product_card,
      product_title: productPageConfig.product_title,
      imagen_product: productPageConfig.imagen_product,
      cta_product_page: productPageConfig.cta_product_page,
      product_media: productPageConfig.product_media,
      breadcrumbs: productPageConfig.breadcrumbs
    }

    // Define selectors for sidecart elements
    this.sidecartSelectors = {
      section_sidecart: sidecartConfig.section_sidecart,
      item_cart: sidecartConfig.item_cart
    }
  }

  /*
    Private method: #clickRandomElementFromCollection
    Description: Clicks on a random element from a collection.
  */
  #clickRandomElementFromCollection (selector) {
    cy.get(selector)
      .then(($elements) => {
        const randomElement = $elements[Math.floor(Math.random() * $elements.length)]
        cy.wrap(randomElement).click()
        cy.url().should('contain', 'products')
      })
  }

  /*
    Public method: selectorProductCollection
    Description: Clicks on a random product card on the product page.
  */
  selectorProductCollection () {
    this.#clickRandomElementFromCollection(this.productSelectors.product_card)
  }

  /*
    Public method: checkProductImage
    Description: Checks if the product image is visible on the product page.
  */
  checkProductImage () {
    const imageSelector = this.productSelectors.section_product + ' ' + this.productSelectors.imagen_product
    this.checkElementExists(imageSelector, 'No images found for the product, please set at least 1')
    cy.get(imageSelector).should('be.visible')
  }

  /*
    Public method: checkBreadcrumbHasHref
    Description: Checks if the specified breadcrumb element has an href attribute.
  */
  checkBreadcrumbHasHref (alias, shouldExist) {
    cy.get(alias)
      .find('a')
      .should(shouldExist ? 'have.attr' : 'not.have.attr', 'href')
      .then((elements) => {
        // Log the elements to help identify the issue
        cy.log(`Found elements: ${elements.length}`)
        cy.log(elements)
      })
  }

  /*
    Public method: checkTitleBreadcrumb
    Description: Checks the existence and visibility of the product title and breadcrumbs on the product page.
  */
  checkTitleBreadcrumb () {
    cy.get(this.productSelectors.section_product)
      .find(this.productSelectors.product_title)
      .should('exist')
      .and('be.visible')
      .invoke('text')
      .as('titleProduct')

    cy.get(this.productSelectors.section_product)
      .find(this.productSelectors.breadcrumbs)
      .as('breadCrumbs')

    this.checkBreadcrumbHasHref('@breadCrumbs', true)
    this.checkLastBreadcrumbMatchesTitle('@breadCrumbs', '@titleProduct')
  }

  /*
    Public method: checkLastBreadcrumbMatchesTitle
    Description: Checks if the last breadcrumb matches the product title.
  */
  checkLastBreadcrumbMatchesTitle (breadcrumbsAlias, titleAlias) {
    cy.get(breadcrumbsAlias)
      .last()
      .invoke('text')
      .then((titleBreadcrumb) => {
        cy.get(titleAlias).should('include', titleBreadcrumb.trim())
      })
  }

  /*
    Public method: checkElementExists
    Description: Checks if an element with the specified selector exists.
  */
  checkElementExists (selector, errorMessage) {
    cy.get(selector).should('have.length.above', 0, {
      message: errorMessage
    })
  }

  /*
    Public method: checkProductTitle
    Description: Checks if the product title is present and in an h1 tag.
  */
  checkProductTitle () {
    const titleSelector = this.productSelectors.section_product + ' ' + this.productSelectors.product_title
    this.checkElementTextIsH1(titleSelector, 'The text obtained is not an h1 tag')
  }

  /*
    Public method: checkElementTextIsH1
    Description: Checks if the text of an element is inside an h1 tag.
  */
  checkElementTextIsH1 (selector, errorMessage) {
    cy.get(selector)
      .should('exist')
      .and('be.visible')
      .invoke('text')
      .then((text) => {
        const h1Tag = `<h1>${text}</h1>`
        if (!/^<h1[\s\S]*<\/h1>$/.test(h1Tag)) {
          throw new Error(errorMessage)
        }
        cy.log(text)
      })
  }

  /*
    Public method: addProduct
    Description: Clicks the add product button and checks if the cart item exists in the sidecart.
  */
  addProduct () {
    const addProductSelector = this.productSelectors.section_product + ' ' + this.productSelectors.cta_product_page
    this.checkElementExistsAndIsEnabled(addProductSelector, 'The add product button does not exist or is disabled')
    cy.get(addProductSelector).click()
    this.checkCartItemExists()
  }

  /*
    Public method: checkElementExistsAndIsEnabled
    Description: Checks if an element with the specified selector exists and is enabled.
  */
  checkElementExistsAndIsEnabled (selector, errorMessage) {
    cy.get(selector)
      .should('exist')
      .and('be.visible')
      .then(($element) => {
        if ($element.prop('disabled')) {
          throw new Error(errorMessage)
        }
      })
  }

  /*
    Public method: checkCartItemExists
    Description: Checks if the cart item exists in the sidecart.
  */
  checkCartItemExists () {
    cy.get(this.sidecartSelectors.section_sidecart)
      .find(this.sidecartSelectors.item_cart)
      .should('exist')
      .and('be.visible')
  }
}

// Export an instance of ProductPage class
export const productPage = new ProductPage()
