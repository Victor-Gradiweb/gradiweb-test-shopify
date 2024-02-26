export class ProductPage {
  constructor () {
    const productPageConfig = Cypress.env('product_page')
    const sidecartConfig = Cypress.env('sidecart')
    const globalConfig = Cypress.env('global')

    this.section_product = productPageConfig.section_product
    this.product_card = productPageConfig.product_card
    this.product_title = productPageConfig.product_title
    this.imagen_product = productPageConfig.imagen_product
    this.cta_product_page = productPageConfig.cta_product_page
    this.product_media = productPageConfig.product_media
    this.breadcrumbs = productPageConfig.breadcrumbs

    this.section_sidecart = sidecartConfig.section_sidecart
    this.item_cart = sidecartConfig.item_cart

    this.anchor = globalConfig.anchor
  }

  // method selector product collection
  selectorProductCollection () {
    this.clickRandomProductFromCollection(this.product_card)
  }

  clickRandomProductFromCollection (selector) {
    cy.get(selector)
      .then(($products) => {
        const randomProduct = $products[Math.floor(Math.random() * $products.length)]
        cy.wrap(randomProduct).click()
        cy.url().should('contain', 'products')
      })
  }

  // method Bradcrumb
  checkBreadcrumbHasHref (alias, shouldExist) {
    cy.get(alias)
      .find(this.anchor)
      .should(shouldExist ? 'have.attr' : 'not.have.attr', 'href')
      .then((elements) => {
        // Log the elements to help identify the issue
        cy.log(`Found elements: ${elements.length}`)
        cy.log(elements)
      })
  }

  checkTitleBreadcrumb () {
    cy.get(this.section_product)
      .find(this.product_title)
      .should('exist')
      .and('be.visible')
      .invoke('text')
      .as('titleProduct')

    cy.get(this.section_product)
      .find(this.breadcrumbs)
      .as('breadCrumbs')

    this.checkBreadcrumbHasHref('@breadCrumbs', true) // Adjust the second parameter based on your requirements
    this.checkLastBreadcrumbMatchesTitle('@breadCrumbs', '@titleProduct')
  }

  checkLastBreadcrumbMatchesTitle (breadcrumbsAlias, titleAlias) {
    cy.get(breadcrumbsAlias)
      .last()
      .invoke('text')
      .then((titleBreadcrumb) => {
        cy.get(titleAlias).should('include', titleBreadcrumb.trim())
      })
  }

  // method check Product img
  checkProductImage () {
    const imageSelector = this.section_product + ' ' + this.imagen_product
    this.checkElementExists(imageSelector, 'No images found for the product, please set at least 1')
    cy.get(imageSelector).should('be.visible')
  }

  checkElementExists (selector, errorMessage) {
    cy.get(selector).should('have.length.above', 0, {
      message: errorMessage
    })
  }

  // method product title
  checkProductTitle () {
    const titleSelector = this.section_product + ' ' + this.product_title
    this.checkElementTextIsH1(titleSelector, 'El texto obtenido no es un tag h1')
  }

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

  // method add Product
  addProduct () {
    const addProductSelector = this.section_product + ' ' + this.cta_product_page
    this.checkElementExistsAndIsEnabled(addProductSelector, 'The add product button does not exist or is disabled')
    cy.get(addProductSelector).click()
    this.checkCartItemExists()
  }

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

  checkCartItemExists () {
    cy.get(this.section_sidecart)
      .find(this.item_cart)
      .should('exist')
      .and('be.visible')
  }
}
export const productPage = new ProductPage()
