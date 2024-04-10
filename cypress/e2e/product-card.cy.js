import globalEnvironment from '../.env/env.global.json';
Cypress.on('uncaught:exception', () => { return false })

describe('E-commerce Testing: Product Card Interaction', () => {
  beforeEach('visit website', () => {
    cy.session('break password', () => {
      cy.visit(`${globalEnvironment.BASE_URL}?preview_theme_id=${globalEnvironment.PREVIEW_THEME}`)
      cy.breakPassword()
    })
    cy.visit(`${globalEnvironment.BASE_URL}collections/${globalEnvironment.PATH_COLLECTION}?preview_theme_id=${globalEnvironment.PREVIEW_THEME}`)
  })

  it('should verify that the product card has an image', () => { 
    cy.checkImageWithoutHover()
  })

  it('should be able to add a product from the product card or the modal', () => { 
    cy.addToCartProductCard()
  })
})
