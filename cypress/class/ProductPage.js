import { sideCart } from './SideCart'

export class ProductPage {
  constructor () {
    this.productPageSelector = Cypress.env('product_page')
    this.sideCartSelector = Cypress.env('sidecart')
  }

  checkBreadcrumb () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        cy.get(this.productPageSelector.section_product)
          .find(this.productPageSelector.breadcrumbs)
          .as('breadcrumbs')
          .find('a')
          .each(($a, index) => {
            if (index <= 1) {
              cy.wrap($a).should('have.attr', 'href')
            }
          })

        cy.get('h1').should('exist').and('be.visible').invoke('text').then(productTitle => {
          this.verifyBreadcrumbText(productTitle)
        })
      }
    })
  }

  verifyBreadcrumbText (productTitle) {
    cy.get('@breadcrumbs').eq(2).then(($breadcrumb) => {
      const breadcrumbText = $breadcrumb.text().trim()
      const trimmedProductTitle = productTitle.trim()
      cy.wrap(breadcrumbText).should('equal', trimmedProductTitle)
    })
  }

  isProductPageVisible () {
    return cy.get('body').then((body) => {
      return body.find(this.productPageSelector.section_product).length > 0
    })
  }

  clickArrow (selector) {
    cy.get(this.productPageSelector.section_product)
      .find(selector)
      .click()
  }

  verifyNextArrowEnables () {
    cy.get(this.productPageSelector.section_product)
      .find(this.productPageSelector.arrow_next_product_media)
      .should('be.enabled')
  }

  verifyPrevArrowDisables () {
    cy.get(this.productPageSelector.section_product)
      .find(this.productPageSelector.arrow_prev_product_media)
      .should('not.be.enabled')
  }

  checkProductImage () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        cy.get(this.productPageSelector.product_media_img).each((img) => {
          cy.wrap(img).should('exist')
        })
      }
    })
  }

  clickNextUpsell () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        this.clickArrow(this.productPageSelector.arrow_next_product_media)
        this.verifyNextArrowEnables()
      }
    })
  }

  clickPrevtUpsell () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        this.clickArrow(this.productPageSelector.arrow_prev_product_media)
        this.verifyPrevArrowDisables()
      }
    })
  }

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

  checkProductTitle () {
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        cy.get('h1').should('exist').and('be.visible').invoke('text').as('productTitle')
      }
    })
  }

  addToCartProductPage () {
    let productTitle
    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        cy.get('h1').should('exist').and('be.visible').invoke('text').then((title) => {
          productTitle = title.trim()

          cy.get(this.productPageSelector.section_product)
            .find(this.productPageSelector.add_product_product_page)
            .then((addProduct) => {
              if (!addProduct.prop('disabled')) {
                addProduct.click()
                sideCart.checkIfSideCartIsActive()
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

  addMultipleQuantityToCartProductPage () {
    let initialQuantity = 0

    this.isProductPageVisible().then((isVisible) => {
      if (isVisible) {
        this.getInitialQuantity().then((value) => {
          initialQuantity = parseInt(value)
          this.incrementQuantityAndAddToCart()
          this.verifyCartQuantity(initialQuantity)
        })
      }
    })
  }

  getInitialQuantity () {
    return cy.get(this.productPageSelector.input_quantity_from_productPage)
      .invoke('attr', 'value')
  }

  incrementQuantityAndAddToCart () {
    cy.get(this.productPageSelector.add_quantity_from_productPage).click()
    cy.get(this.productPageSelector.add_product_product_page).click()
    sideCart.checkIfSideCartIsActive()
  }

  verifyCartQuantity (initialQuantity) {
    cy.wrap(null).then(() => {
      cy.get(this.sideCartSelector.input_quantity)
        .should('have.value', (initialQuantity + 1).toString())
    })
  }
}

export const productPage = new ProductPage()
