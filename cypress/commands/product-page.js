let data // It will contain the selectors loaded from the fixture file.
let dataSidecart
before(() => {
  // Before all tests, load the selectors from the 'product-page & sidecart-selectors' file as fixture.
  cy.fixture('sidecart-selectors').then($el => {
    dataSidecart = $el
  })

  cy.fixture('product-page').then($el => {
    data = $el
  })
})

/**
 * Visits a product page and adds the product to the cart.
 * @function addProductFromProductPage
 */
function addProductFromProductPage() {
  cy.visit(`/products/${Cypress.env('HANDLE_PRODUCT')}?preview_theme_id=${Cypress.env('PREVIEW_THEME')}`)
  cy.get(data.main_section).find(data.button_add_product).then(button => {
    if (!button.prop('disabled')) {
      cy.wrap(button).click()
      cy.wait(1000)
      cy.checkSidecartState(true)
      cy.get(dataSidecart.sidecart.item_cart).should('have.length', 1)
    }
  })
}
Cypress.Commands.add('addProductFromProductPage', addProductFromProductPage)

/**
 * Validates the number of breadcrumb links.
 * Ensures there are between 2 and 3 breadcrumb items.
 * @function validateBreadcrumbLinksCount
 */
function validateBreadcrumbLinksCount() {
  cy.get(data.breadcrumbs.section)
    .find('li')
    .should('have.length.gte', 2)
    .and('have.length.lte', 3)
}
Cypress.Commands.add('validateBreadcrumbLinksCount', validateBreadcrumbLinksCount)

/**
 * Verifies navigation to the home link (first breadcrumb item).
 * Asserts that the URL navigates to the root path ('/').
 * 
 * @function verifyHomeLinkNavigation
 */
function verifyHomeLinkNavigation() {
  cy.get(data.breadcrumbs.section)
    .find('li')
    .eq(0).click()
  cy.url().then(url => {
    const parsedUrl = new URL(url)
    const pathname = parsedUrl.pathname
    expect(pathname).to.equal('/')
  })
}
Cypress.Commands.add('verifyHomeLinkNavigation', verifyHomeLinkNavigation)

/**
 * Verifies redirection to the collection page when clicking the second breadcrumb link,
 * but only if there are exactly 3 breadcrumb items. Asserts that the URL includes 'collections'.
 * 
 * @function verifyRedirectionToCollection
 */
function verifyRedirectionToCollection() {
  cy.get(data.breadcrumbs.section)
    .find('li')
    .then($lis => {
      if ($lis.length === 3) {
        cy.get($lis).eq(1).click()
        cy.url().should('include', 'collections')
      } else {
        cy.log('Three "li" elements were not found within the breadcrumb navigation')
      }
    })
}
Cypress.Commands.add('verifyRedirectionToCollection', verifyRedirectionToCollection)

/**
 * Verify that all items in the breadcrumbs list, except the last one, are clickable.
 * 
 * - Checks that the first two items have valid links and respond with a status of 200.
 * - Ensures that the last item does not contain a link.
 *
 * @function verifyAllElementsAreClickableExceptLast
 */
function verifyAllElementsAreClickableExceptLast() {
  cy.get(data.breadcrumbs.section)
    .find('li')
    .should('have.length', 3)
    .then(($lis) => {
      const firstLink = $lis.eq(0).find('a').prop('href')
      const secondLink = $lis.eq(1).find('a').prop('href')

      expect(firstLink).to.exist
      expect(secondLink).to.exist

      cy.request({
        url: firstLink
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
      cy.request({
        url: secondLink
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
      cy.wrap($lis).eq(2).find('a').should('not.exist')
    })
}
Cypress.Commands.add('verifyAllElementsAreClickableExceptLast', verifyAllElementsAreClickableExceptLast)

/**
 * Verifies that the breadcrumb text matches the main header text on the page.
 * 
 * This function performs the following steps:
 * 1. Retrieves the text from the `<h1>` element, cleans it by trimming whitespace and newlines,
 *    and stores it in a Cypress alias `@headerText`.
 * 2. Retrieves the text from the third breadcrumb item (index 2) in the breadcrumb list,
 *    cleans it by trimming whitespace and newlines.
 * 3. Compares the cleaned breadcrumb text with the cleaned header text to ensure they match.
 * 
 * @function verifyBreadcrumbTitleProduct
 */
function verifyBreadcrumbTitleProduct() {
  cy.get('h1')
    .should('exist')
    .and('be.visible')
    .invoke('text')
    .then((text) => {
      // Clean up text by trimming whitespace and newlines
      const cleanedHeaderText = text.trim();
      cy.wrap(cleanedHeaderText).as('headerText');
    });

  cy.get(data.breadcrumbs.section)
    .find('li').eq(2)
    .invoke('text')
    .then((breadcrumbText) => {
      // Clean up breadcrumb text by trimming whitespace and newlines
      const cleanedBreadcrumbText = breadcrumbText.trim();
      
      // Retrieve the header text from alias and compare
      cy.get('@headerText').then((headerText) => {
        expect(headerText).to.equal(cleanedBreadcrumbText);
      });
    });
}

Cypress.Commands.add('verifyBreadcrumbTitleProduct', verifyBreadcrumbTitleProduct)

// product media
