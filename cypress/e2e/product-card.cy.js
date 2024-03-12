import { productCard } from '../class/ProductCard'
import { unlockTheme } from '../class/UnlockTheme'

// Disable uncaught exception handling to allow Cypress to handle exceptions
Cypress.on('uncaught:exception', () => { return false })

// Define desktop device configuration
const deviceDesktop = [{ viewport: [1440, 900], type: 'WXGA+' }]

// Construct URLs based on Cypress environment variables
const collectionUrl = `collections/${Cypress.env('collection_url')}?preview_theme_id=${Cypress.env('preview_theme')}`
const urlPreview = `?preview_theme_id=${Cypress.env('preview_theme')}`

// Cypress test suite for template functionality.
describe('template spec', () => {
  // Before each test, break the store password session and visit the preview URL.
  beforeEach(() => {
    cy.session('break store password', () => {
      cy.visit(urlPreview)
      unlockTheme.break_password()
    })
    cy.visit(urlPreview)
  })

  // After each test, wait for 500 milliseconds.
  afterEach(() => {
    cy.wait(500)
  })

  context('Desktop Side Cart', () => {
    // Iterate through desktop device configurations.
    deviceDesktop.forEach((device) => {
      context(`Test for ${device.type}`, () => {
        /**
         * Before each test, set the viewport and visit the collection URL.
         * @param {Array} device.viewport - The viewport dimensions [width, height].
         */
        beforeEach(() => {
          const [width, height] = device.viewport
          cy.viewport(width, height)
          cy.visit(collectionUrl)
        })

        it('Check Image Product Card', () => {
          productCard.checkImageWithoutHover()
        })

        it('Add To Cart', () => {
          productCard.addToCart()
        })
      })
    })
  })
})
