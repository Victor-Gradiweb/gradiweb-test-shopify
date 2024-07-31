let data // It will contain the selectors loaded from the fixture file.
before(() => {
  // Before all tests, load the selectors from the 'sidecart-selectors' file as fixture.
  cy.fixture('sidecart-selectors').then($el => {
    data = $el
  })
})

/**
 * Checks if the cart icon is visible in the header. If not visible,
 * logs into the account first and then verifies the cart icon visibility.
 */
function verifyCartIcon() {
  cy.get('header').then(header => {
    if (header.find(data.sidecart.icon_open).length > 0) {
      cy.get(data.sidecart.icon_open).should('be.visible')
    } else {
      cy.loginAccount()
      cy.get(data.sidecart.icon_open).should('be.visible')
    }
  })
}

//  Checks if the cart icon close button is visible on the page.
function verifyCartIconClose() {
  cy.get(data.sidecart.icon_close).should('be.visible')
}
Cypress.Commands.add('verifyCartIconClose', verifyCartIconClose)

Cypress.Commands.add('verifyCartIcon', verifyCartIcon)
/**
 * Opens or closes the sidecart based on the provided isOpen parameter.
 * @param {boolean} isOpen - Determines whether to open (true) or close (false) the sidecart.
 * @example
 * // Opens the sidecart
 * cy.sidecartOpen(true)
 * 
 * // Closes the sidecart
 * cy.sidecartOpen(false)
 */
function sidecartOpen(isOpen) {
  if (isOpen) {
    cy.get(data.sidecart.icon_open).click()
  } else {
    cy.get(data.sidecart.icon_close).click()
  }
  cy.checkSidecartState(isOpen)
}
Cypress.Commands.add('sidecartOpen', sidecartOpen)

/**
 * Closes the sidecart by simulating a click on an overlay element outside the sidecart.
 * Ensures the sidecart state is checked to be closed.
 */
function closeSidecartOutside() {
  cy.get('.overlay').click()
  cy.checkSidecartState(false)
}
Cypress.Commands.add('closeSidecartOutside', closeSidecartOutside)

/**
 * Checks the state of the sidecart.
 * @param {boolean} expectedState - Expected state of the sidecart (true for open, false for closed).
 * @example
 * // Checks if the sidecart is open.
 * cy.checkSidecartState(true)
 * @example
 * // Check if the sidecart is closed.
 * cy.checkSidecartState(false)
 */
function checkSidecartState(expectedState) {
  cy.get(data.sidecart.sidecart_section).should('have.attr', 'data-active', expectedState.toString())
}
Cypress.Commands.add('checkSidecartState', checkSidecartState)

/**
 * @des Upsell module hosted on the sidecart.
 */

function upsellArrows() {
  cy.get(data.sidecart.sidecart_section).then(sidecart => {
    if (sidecart.find(data.sidecart.upsell_sidecart.upsell_section).length > 0) {
      cy.get(data.sidecart.upsell_sidecart.upsell_section).then(upsellSection => {
        if (upsellSection.find(data.sidecart.upsell_sidecart.arrow_next).length > 0) {
          arrowsNext()
          arrowsPrev()
        }
      })
    } else {
      // slide upsell
    }
  })
}
Cypress.Commands.add('upsellArrows', upsellArrows)

/**
 * Moves to the next swiper slide in the upsell sidecart and verifies the state.
 * Clicks on the next arrow button and ensures the slide changes correctly.
 * @function arrowsNext
 */
function arrowsNext() {
  cy.get(data.sidecart.upsell_sidecart.upsell_section)
    .find('swiper-slide')
    .first()
    .then(firstSlide => {
      cy.get(data.sidecart.upsell_sidecart.arrow_next)
        .click({ force: true })
        .then(() => {
          cy.wrap(firstSlide)
            .should('not.have.class', 'swiper-slide-active')
          cy.get(data.sidecart.upsell_sidecart.arrow_prev)
            .should('be.visible')
        })
    })
}

/**
 * Moves to the previous swiper slide in the upsell sidecart and verifies the state.
 * Clicks on the previous arrow button and ensures the slide changes correctly.
 * @function arrowsPrev
 */
function arrowsPrev() {
  cy.get(data.sidecart.upsell_sidecart.arrow_prev).click({ force: true })
    .then(() => {
      cy.get(data.sidecart.upsell_sidecart.upsell_section)
        .find('swiper-slide')
        .first()
        .should('have.class', 'swiper-slide-active')
      cy.get(data.sidecart.upsell_sidecart.arrow_prev)
        .should('not.exist')
    })
}

/**
 * Adds a product from upsell inside the sidecar.
 * 
 * This function interacts with the sidecart UI to add a product from an upsell section.
 * It clicks the first available 'Add Product' button, waits for a fixed time, and then
 * asserts that the item has been added to the cart.
 * @function addProductFromUpsellInsideSidecar
 */
function addProductFromUpsellInsideSidecar() {
  cy.get(data.sidecart.sidecart_section)
    .find(data.sidecart.upsell_sidecart.button_add_product)
    .first().click()
    .wait(2500)
  cy.get(data.sidecart.item_cart).should('have.length', 1)

}
Cypress.Commands.add('addProductFromUpsellInsideSidecar', addProductFromUpsellInsideSidecar)

// product management functions

/**
 * Validates that the current quantity in the input matches the expected value.
 * @param {string} expectedQuantity - The expected quantity as a string.
 */
function validateQuantity(expectedQuantity) {
  cy.get(data.sidecart.product_management.input_quantity)
    .invoke('val')
    .then(quantity => {
      expect(quantity).to.equal(expectedQuantity)
    })
}

/**
 * Changes the quantity by clicking the specified action (increase or decrease).
 * @param {string} action - The action to perform ('increase_units' or 'decrease_units').
 */
function changeUnits(action) {
  cy.get(data.sidecart.product_management[action])
    .eq(0)
    .click({ force: true })

  cy.wait(2500) // Consider moving this wait to a more appropriate place if possible

  cy.get(data.sidecart.product_management.input_quantity)
    .invoke('val')
    .then(newQuantity => {
      const expectedQuantity = action === 'increase_units' ? '2' : '1'
      expect(newQuantity).to.equal(expectedQuantity)
    })
}

/**
 * Increases the quantity of the product in the cart.
 * This function checks that the initial quantity is '1', then increases it
 * to '2' by clicking the increase button.
 */
function increaseUnits() {
  validateQuantity('1')
  changeUnits('increase_units')
}
Cypress.Commands.add('increaseUnits', increaseUnits)

/**
 * Decreases the quantity of the product in the cart.
 * This function first increases the quantity to '2', validates it, and then
 * decreases it back to '1' by clicking the decrease button.
 */
function decreaseUnits() {
  increaseUnits() // First increase the units
  validateQuantity('2')
  changeUnits('decrease_units')
}
Cypress.Commands.add('decreaseUnits', decreaseUnits)

/**
 * Deletes a product from the side cart in Cypress.
 * This function clicks on the delete product button and verifies that the item 
 * @function deleteProduct
 */
function deleteProduct() {
  cy.get(data.sidecart.product_management.delete_product).click({ force: true })
  cy.get(data.sidecart.item_cart).should('not.exist')
}
Cypress.Commands.add('deleteProduct', deleteProduct)

// Progress Bar functions

/**
 * Gets the progress limit and the residual value.
 * @returns {Cypress.Chainable<{ limitNumber: number, valueResiduary: number }>} An object containing the progress limit and residual value.
 */
function getLimitAndResiduary() {
  return cy.get(data.sidecart.progress_bar.progress_bar_data)
    .invoke('attr', 'data-limit')
    .then(limit => {
      const limitNumber = parseInt(limit, 10)
      return cy.get(data.sidecart.progress_bar.residuary)
        .then(residual => {
          const text = residual.text()
          const valueResiduary = Number(text.replace('€', '').trim())
          return { limitNumber, valueResiduary }
        })
    })
}

/**
 * Gets and formats the product price value.
 * @returns {Cypress.Chainable<number>} The product price value as a number.
 */
function getPriceValue() {
  return cy.get(data.sidecart.product_management.item_price)
    .find('span')
    .eq(0)
    .then(value => {
      const priceText = value.text().trim()
      const numericString = priceText.replace(/[^\d,.]/g, '')
      const formattedNumber = numericString.replace(',', '.')
      return parseFloat(formattedNumber)
    })
}

/**
 * Checks if the progress bar has reached 100% and that the residual value is not visible.
 * @param {number} limitNumber - The progress limit.
 * @param {number} valueResiduary - The residual value.
 * @throws {Error} If the progress bar style does not contain a valid percentage of 100%.
 */
function verifyProgressBarIsFull(limitNumber, valueResiduary) {
  cy.get(data.sidecart.progress_bar.bar)
    .invoke('attr', 'style')
    .then(style => {
      const widthMatch = style.match(/width:\s*([\d.]+)%/)
      if (widthMatch) {
        const percentage = parseFloat(widthMatch[1])
        expect(percentage).to.equal(100)
      } else {
        throw new Error('The width style does not contain a valid percentage of 100%.')
      }
      cy.get(data.sidecart.progress_bar.residuary).should('not.be.visible')
    })
}

/**
 * Checks if the progress bar is within the valid range (0% to 99.99%).
 * @throws {Error} If the progress bar style does not contain a valid percentage within the range.
 */
function verifyProgressBarIsWithinRange() {
  cy.get(data.sidecart.progress_bar.bar)
    .invoke('attr', 'style')
    .then(style => {
      const widthMatch = style.match(/width:\s*([\d.]+)%/)
      if (widthMatch) {
        const percentage = parseFloat(widthMatch[1])
        expect(percentage).to.be.within(0, 99.99)
      } else {
        throw new Error('Width style does not contain a valid percentage')
      }
    })
}

/**
 * Main function that controls the behavior of the progress bar according to the residual value and the price of the product.
 * @returns {void}
 */
function progressBar() {
  getLimitAndResiduary().then(({ limitNumber, valueResiduary }) => {
    getPriceValue().then(valuePrice => {
      const totalPorcent = limitNumber - valuePrice;
      if (totalPorcent <= 0) {
        verifyProgressBarIsFull(limitNumber, valueResiduary);
      } else {
        verifyProgressBarIsWithinRange();
      }
    });
  })
}

Cypress.Commands.add('progressBar', progressBar)