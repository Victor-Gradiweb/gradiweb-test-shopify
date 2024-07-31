describe('SIDECART', () => {
  let data; // It will contain the selectors loaded from the fixture file.
  before(() => {
    // Before all tests, load the selectors from the 'sidecart-selectors' file as fixture.
    cy.fixture('sidecart-selectors').then($el => {
      data = $el
    })
  })

  beforeEach(() => {
    cy.unlockTheme()
  })

  context('Sidecart opening tests', () => {
    it('Test 1: Verify visibility of the cart icon', () => {
      cy.verifyCartIcon()
    })
    it('Test 2: Open sidecart on clicking the cart icon', () => {
      cy.sidecartOpen(true)
    })
    it('Test 3: Open sidecart when adding a product from product page', () => {
      cy.addProductFromProductPage()
    })

    it('Test 4: Open sidecart when adding a product from upsell', () => {
      cy.addProductFromUpsell()
    })
  })

  context('Sidecart Closing Tests', () => {
    it('Test 5: Verify visibility of the X icon in the Sidecar', () => {
      cy.sidecartOpen(true)
      cy.verifyCartIconClose()
    })

    it('Test 6: Cerrar carro lateral al hacer clic en el icono X', () => {
      cy.sidecartOpen(true)
      cy.sidecartOpen(false)
    })

    it('Test 7: Close the sidecar by clicking outside the sidecar in the overlay', () => {
      cy.sidecartOpen(true)
      cy.closeSidecartOutside()
    })
  })

  context('Product Management Tests inside the side cart ', () => {
    it('Test 8: increase units of a product', () => {
      cy.addProductFromProductPage()
      cy.increaseUnits()
    })

    it.only('Test 9: decrease units of a product', () => {
      cy.addProductFromProductPage()
      cy.decreaseUnits()
    })
    it('Test 10: delete product', () => {
      cy.addProductFromProductPage()
      cy.deleteProduct()
    })
  })

  context('Upsell inside the sidecar', () => {
    it('Test 11: upsell arrows', () => {
      cy.sidecartOpen(true)
      cy.upsellArrows()
    })
    it('Test 12: add product from upsell inside sidecart', () => {
      cy.sidecartOpen(true)
      cy.addProductFromUpsellInsideSidecar()
    })
  })

  context('Progress bar', () => {
    it('Test 13: add product from upsell inside sidecart', () => {
      cy.addProductFromProductPage()
      cy.progressBar()
    })
  })
})