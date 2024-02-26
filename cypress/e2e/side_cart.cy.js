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

        it('open sidecart', () => {
          sideCart.openSideCart()
        })
        it('close sidecart', () => {
          sideCart.openSideCart()
          sideCart.closeSideCart()
        })
        it('slide upsell next', () => {
          sideCart.openSideCart()
          sideCart.navigateToNextUpsell()
        })
        it('slide upsell prev', () => {
          sideCart.openSideCart()
          sideCart.navigateToNextUpsell()
          sideCart.navigateToPreviousUpsell()
        })
        it('add product upsell type 1', () => {
          sideCart.openSideCart()
          sideCart.addFirstProductInUpsellSection()
        })
        it('add plus quantity product', () => {
          sideCart.openSideCart()
          sideCart.addFirstProductInUpsellSection()
          sideCart.plusQuantity()
        })
        it('remove quantity product', () => {
          sideCart.openSideCart()
          sideCart.addFirstProductInUpsellSection()
          sideCart.removeQuantity()
        })
        it('Delete quantity product', () => {
          sideCart.openSideCart()
          sideCart.addFirstProductInUpsellSection()
          sideCart.deleteFirstProduct()
        })
        // sideCart.goCheckout()
      })
    })
  })
})
