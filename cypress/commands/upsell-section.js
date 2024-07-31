let data // It will contain the selectors loaded from the fixture file.
let dataReusableSections
before(() => {
  // Before all tests, load the selectors from the 'reusable-sections & sidecart-selectors' file as fixture.
  cy.fixture('sidecart-selectors').then($el => {
    data = $el
  })

  cy.fixture('reusable-sections').then($el => {
    dataReusableSections = $el
  })
})

/**
 * Clicks on a random product button within the upsell section and adds it to the cart.
 * Waits for the cart to update and verifies the item count.
 * @function addProductFromUpsell
 */
function addProductFromUpsell() {
  cy.get(dataReusableSections.upsell.section)
    .find('swiper-slide')
    .its('length')
    .then(slides => {
      const randomIndex = Math.floor(Math.random() * slides)
      cy.get(dataReusableSections.upsell.section)
      .find('swiper-slide')
      .eq(randomIndex)
      .find('button')
      .click({force: true})
      cy.wait(1000)
      cy.checkSidecartState(true)
      cy.get(data.sidecart.item_cart).should('have.length', 1)
    })
}
Cypress.Commands.add('addProductFromUpsell', addProductFromUpsell)