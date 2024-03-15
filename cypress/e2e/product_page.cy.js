import { productPage } from '../class/ProductPage'
import { unlockTheme } from '../class/UnlockTheme'

Cypress.on('uncaught:exception', () => { return false })

const deviceDesktop = [{ viewport: [1440, 900], type: 'WXGA+' }]
const urlPreview = `?${Cypress.env('preview_theme')}`
const productHandle = `products/${Cypress.env('product_handle')}?${Cypress.env('preview_theme')}`

describe('Product Page', () => {
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

  context('Product page test within a collection', () => {
    deviceDesktop.forEach((device) => {
      context(`Test for ${device.type}`, () => {
        beforeEach(() => {
          const [width, height] = device.viewport
          cy.viewport(width, height)
          cy.visit(productHandle)
        })
        it('product ramdon collection', () => {
          productPage.selectorProductCollection()
          productPage.addToCartProductPage()
        })
      })
    })
  })

  context.only('Product page testing for a specific product', () => {
    deviceDesktop.forEach((device) => {
      context(`Test for ${device.type}`, () => {
        beforeEach(() => {
          const [width, height] = device.viewport
          cy.viewport(width, height)
        })

        context('Producto Type 1', () => {
          beforeEach(() => {
            cy.visit(productHandle)
          })
          it('Should check breadcrumb links and title', () => {
            productPage.checkBreadcrumb()
          })
          it('Should verify existence of images in product media section', () => {
            productPage.checkProductImage()
          })
          it('Should check that the arrow is activated after clicking on the next arrow in the product media', () => {
            productPage.clickNextUpsell()
          })
          it('Should check that the arrow is deactivated after clicking on the prev arrow in product media', () => {
            productPage.clickNextUpsell()
            productPage.clickPrevtUpsell()
          })
          it('Should verify image change when clicking next arrow', () => {
            productPage.verifyImageChangeOnArrowClick()
          })
          it('Should check that the following arrow is disabled after clicking on the last image', () => {
            productPage.clickNextUntilDisabled()
          })
          it('Should verify that the Product Title on the Page Matches the Title h1', () => {
            productPage.checkProductTitle()
          })
          it('Add product and should validate that the product added matches the title of the product page', () => {
            productPage.addToCartProductPage()
          })
          it('Should add two quantities of the product and compare them in the shopping cart', () => {
            productPage.addMultipleQuantityToCartProductPage()
          })
        })
      })
    })
  })
})
