describe('Product page', () => {
  let data; // It will contain the selectors loaded from the fixture file.
  before(() => {
    // Before all tests, load the selectors from the 'product-page' file as fixture.
    cy.fixture('product-page').then($el => {
      data = $el
    })
  })

  beforeEach(() => {
    cy.unlockTheme()
    cy.visit(`/products/${Cypress.env('HANDLE_PRODUCT')}?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
    cy.wait(500)
  })

  context.only('Breadcrumbs', () => {
    it('Test 1: should ensure there are 2 to 3 breadcrumb links', () => {
      cy.validateBreadcrumbLinksCount()
    })

    it('Test 2: Verify that clicking on the "Home" link navigates the user to the homepage', () => {
      cy.verifyHomeLinkNavigation()
    })

    it('Test 3: Verify that clicking on the "Collection" link navigates the user to the collections page', () => {
      cy.verifyRedirectionToCollection()
    })

    it('Test 4: verify that all links have a redirect except the last one', () => {
      cy.verifyAllElementsAreClickableExceptLast()
    })

    it('Test 5: verify breadcrumb matches title', () => {
      cy.verifyBreadcrumbTitleProduct()
    })
  })
})