export class ProductPage {
  constructor () {
    const productPageConfig = Cypress.env('product_page')
    const sideCartConfig = Cypress.env('sidecart')
    const globalConfig = Cypress.env('global')

    this.section_product = productPageConfig.section_product
    this.product_card = productPageConfig.product_card
    this.section_sidecart = sideCartConfig.section_sidecart
    this.cta = globalConfig.cta
  }

  selectorProductCollection () {
    cy.get(this.product_card).then(($product) => {
      const randomProduct =
        $product[Math.floor(Math.random() * $product.length)]
      cy.wrap(randomProduct).click()
      cy.url().should('contain', 'products')
    })
  }

  addProduct () {
    cy.get(this.section_product)
      .find(this.cta)
      .then(($addProduct) => {
        if (!$addProduct.attr('disabled')) {
          $addProduct.click()
          cy.get(this.section_sidecart).should('have.attr', 'data-active', 'true')
        } else {
          this.add_product()
        }
      })
  }
}
export const productPage = new ProductPage()
