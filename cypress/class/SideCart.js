export class SideCart {
  constructor () {
    const sideCartConfig = Cypress.env('sidecart')
    const globalConfig = Cypress.env('global')
    // Properties
    this.section_sidecart = sideCartConfig.section_sidecart
    this.open_sidecart_icon = sideCartConfig.open_sidecart_icon
    this.close_sidecart_icon = sideCartConfig.close_sidecart_icon
    this.item_cart = sideCartConfig.item_cart
    this.input_quantity = sideCartConfig.input_quantity
    this.delete_product = sideCartConfig.delete_product

    this.next = globalConfig.slider_next
    this.prev = globalConfig.slider_prev
    this.cta = globalConfig.cta
  }

  // Method to open the SideCart
  openSideCart () {
    cy.get(this.open_sidecart_icon)
      .click()
      .then(() => {
        cy.get(this.section_sidecart).should('have.attr', 'data-active', 'true')
      })
  }

  // Method to close the SideCart
  closeSideCart () {
    this.openSideCart()
    cy.get(this.close_sidecart_icon)
      .click()
      .then(() => {
        cy.get(this.section_sidecart).should('have.attr', 'data-active', 'false')
      })
  }

  // Method to next upsell
  upsellNext () {
    cy.get(this.section_sidecart)
      .find(this.next)
      .click()
      .then(() => {
        cy.get(this.prev).should('not.have.attr', 'aria-disabled', 'false')
      })
  }

  // Method to prev upsell
  upsellPrev () {
    cy.get(this.section_sidecart)
      .find(this.prev)
      .click()
      .then(() => {
        cy.get(this.prev).should('not.have.attr', 'aria-disabled', 'true')
      })
  }

  // Method to add product
  addProductUpsell1 () {
    for (let i = 0; i < 3; i++) {
      cy.get(this.section_sidecart).find(this.cta).first().click()
      cy.get(this.item_cart).should('have.length', i + 1)
    }
  }

  addProductUpsell2 () {
    cy.get(this.section_sidecart).find(this.card_product).click()

    cy.get(this.section_product)
      .find(this.cta)
      .then(($button) => {
        if ($button.attr('disabled')) {
          cy.log('out of stock')
        } else {
          cy.wrap($button).click()
          cy.get(this.section_sidecart)
            .should('have.attr', 'data-active', 'true')
            .find(this.item_cart)
            .should('exist')
          this.closeSideCart()
          // add quantity of product and verify that the product is not duplicated
          cy.wrap($button)
            .click()
            .then(() => {
              cy.get(this.input_quantity).should(
                'have.attr',
                'data-quantity',
                '2'
              )
              cy.get(this.item_cart).should('have.length', 1)
            })
        }
      })
  }

  // Method to add quantity product
  plusQuantity () {
    cy.get(this.section_sidecart)
      .find('[data-action="plus"]')
      .first()
      .click()
      .then(() => {
        cy.get(this.section_sidecart)
          .find(this.input_quantity)
          .first()
          .should('have.attr', 'data-quantity', '2')
      })
  }

  // Method to remove quantity product
  removeQuantity () {
    cy.get(this.section_sidecart).find('[data-action="subtr"]').first().click()
      .then(() => {
        cy.get(this.item_cart).then(($itemProduct) => {
          if ($itemProduct.length > 0) {
            cy.get(this.input_quantity).first().should('have.attr', 'data-quantity', '1')
          } else {
            cy.get(this.item_cart).should('not.exist')
          }
        })
      })
  }

  // Method to Delete product
  deleteProduct () {
    cy.get(this.section_sidecart)
      .find(this.delete_product)
      .first()
      .click()
      .then(() => {
        cy.get(this.item_cart).then(($itemProduct) => {
          if ($itemProduct.length > 0) {
            cy.get(this.item_cart).should('have.length', $itemProduct.length - 1)
          } else {
            cy.get(this.item_cart).should('not.exist')
          }
        })
      })
  }

  // Method GO Checkout
  goCheckout () {
    cy.get(this.section_sidecart)
      .find(this.cta)
      .eq(6) // modify the index
      .click()
      .then(() => {
        cy.wait(500)
        cy.url().should('include', 'checkout')
      })
  }
}

export const sideCart = new SideCart()
