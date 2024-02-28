import { sideCart } from '../class/SideCart'
import { unlockTheme } from '../class/UnlockTheme'

Cypress.on('uncaught:exception', () => { return false })

const deviceDesktop = [{ viewport: [1440, 900], type: 'WXGA+' }]
const urlPreview = `?${Cypress.env('url').preview_theme}`

describe('template spec', () => {
  beforeEach(() => {
    cy.session('break store password', () => {
      cy.visit(urlPreview)
      unlockTheme.break_password()
    })
    cy.visit(urlPreview)
  })
  afterEach(() => {
    cy.wait(500)
  })

  context('Desktop Side Cart', () => {
    deviceDesktop.forEach((device) => {
      context(`Test for ${device.type}`, () => {
        beforeEach(() => {
          const [width, height] = device.viewport
          cy.viewport(width, height)
        })

        it('should open the side cart', () => {
          sideCart.openSideCart()
        })

        it('should close the side cart', () => {
          sideCart.openSideCart()
          sideCart.closeSideCart()
        })

        it('should navigate to the next upsell', () => {
          sideCart.openSideCart()
          sideCart.navigateToNextUpsell()
        })

        it('should navigate to the previous upsell', () => {
          sideCart.openSideCart()
          sideCart.navigateToPreviousUpsell()
        })

        it('should add a product to the cart', () => {
          sideCart.openSideCart()
          sideCart.addToCart()
        })

        it('should increase quantity of the added product', () => {
          sideCart.openSideCart()
          sideCart.addToCart()
          sideCart.plusQuantity()
        })

        it('should decrease quantity of the added product', () => {
          sideCart.openSideCart()
          sideCart.addToCart()
          sideCart.removeQuantity()
        })

        it('should delete the first product from the cart', () => {
          sideCart.openSideCart()
          sideCart.addToCart()
          sideCart.deleteFirstProduct()
        })
        // sideCart.goCheckout()
      })
    })
  })
})
