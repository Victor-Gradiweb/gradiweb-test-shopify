Cypress.on('uncaught:exception', () => { return false })

describe('E-commerce Testing: Product Card Interaction', () => {
  beforeEach('visit website', () => {
    cy.session('break password', () => {
      cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
      cy.breakPassword()
    })
    cy.visit(`/collections/${Cypress.env('PATH_COLLECTION')}?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
  })

  it('should verify that the product card has an image', () => { 
    cy.checkImageWithoutHover()
  })

  it.only('should be able to add a product from the product card or the modal', () => { 
    cy.addToCartProductCard()
  })
})
