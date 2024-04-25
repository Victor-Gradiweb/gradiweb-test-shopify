import { visitAndBreakPassword } from "../commands/visit-web-site"

Cypress.on('uncaught:exception', () => { return false })

describe('E-commerce Testing: Product Page', () => {
  beforeEach(() => {
    visitAndBreakPassword()
    cy.visit(`/products/${Cypress.env('HANDLE_PRODUCT')}?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
  })

  it('Should verify the addition of the product to the side cart', () => {
    cy.verifyProductAdditionToSideCart()
  })
  it('should check the redirection: The first two elements of the breadcrumbs', () => {
    cy.checkBreadcrumbRedirection()
  })
  it('Should be checked for consistency: Product title and last item of breadcrumbs', () => {
    cy.verifyTitleAndBreadcrumbConsistency()
  })
  it('Product image navigation test: Navigation arrows next', () => {
    cy.nextImageMedia()
  })
  it('Product image navigation test: Navigation arrows prev', () => {
    cy.nextImageMedia().then(() => cy.prevImageMedia())

  })

})
