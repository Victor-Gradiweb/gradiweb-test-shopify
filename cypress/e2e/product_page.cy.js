import { productPage } from '../class/ProductPage'
import { unlockTheme } from '../class/UnlockTheme'

Cypress.on('uncaught:exception', () => { return false })

const deviceDesktop = [{ viewport: [1440, 900], type: 'WXGA+' }]
const urlPreview = `?${Cypress.env('preview_theme')}`
const collections = `${Cypress.env('url').collections}?${Cypress.env('preview_theme')}`
const productTest = `products/${Cypress.env('product_page').product_1}?${Cypress.env('preview_theme')}`

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
          cy.visit(collections)
        })
        it('product ramdon collection', () => {
          productPage.selectorProductCollection()
          productPage.addToCartProductPage()
        })
      })
    })
  })

  context('Product page testing for a specific product', () => {
    deviceDesktop.forEach((device) => {
      context(`Test for ${device.type}`, () => {
        beforeEach(() => {
          const [width, height] = device.viewport
          cy.viewport(width, height)
        })

        context('Producto Type 1', () => {
          beforeEach(() => {
            cy.visit(productTest)
          })
          it('Breadcrumb title checker', () => {
            productPage.checkTitleBreadcrumb()
          })
          it('product image checker', () => {
            productPage.checkProductImage()
          })
          it('product title checker', () => {
            productPage.checkProductTitle()
          })
          it('Add product', () => {
            productPage.addToCartProductPage()
          })
          it('Should add two quantities of the product and compare them in the shopping cart', () => {
            productPage.addMultipleToCartProductPage()
          })
        })
      })
    })
  })
})
