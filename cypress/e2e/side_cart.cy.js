Cypress.on('uncaught:exception', () => { return false })

describe('E-commerce Testing: Side Cart Interaction', () => {
  beforeEach('visit website', () => {
    cy.session('break password', () => {
      cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
      cy.breakPassword()
    })
    cy.visit(`?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
  })

  it('Should open the side cart', () => {
    cy.toggleSidecartActive()
  })

  it('Should close the side cart', () => {
    cy.toggleSidecartActive().then(() => cy.toggleSidecartInactive())
  })

  it('Should navigate to the next upsell card', () => {
    cy.toggleSidecartActive()
    cy.navigateToNextUpsell()
  })

  it('Should navigate to the next upsell card', () => {
    cy.toggleSidecartActive()
    cy.navigateToNextUpsell().then(() => cy.navigateToPrevUpsell())
  })

  it('Should add product', () => {
    cy.toggleSidecartActive()
    cy.addProductToUpsell()
    
  })

  it('Should increase quantity of the added product', () => {
    cy.toggleSidecartActive()
    cy.addProductToUpsell()
    cy.plusQuantity()
  })

  it('Should decrease quantity of the added product', () => {
    cy.toggleSidecartActive()
    cy.addProductToUpsell()
    cy.plusQuantity()
    cy.removeQuantity()
  })
  
  it('Should decrease quantity of the added product', () => {
    cy.toggleSidecartActive()
    cy.addProductToUpsell()
    cy.deleteProduct()
  })
})
