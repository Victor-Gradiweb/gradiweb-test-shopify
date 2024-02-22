Cypress.on('uncaught:exception', () => { return false })

import { sideCart } from "../class/SideCart";
import { unlockTheme } from "../class/UnlockTheme";

const deviceDesktop = [
  { viewport: [1440, 900], type: "WXGA+" },
  // { viewport: [1920, 1080], type: "FullHD" },
];
// const deviceMobile = [
//   { viewport: [375, 667], type: "iphone" },
//   // { viewport: [1920, 1080], type: "FullHD" },
// ];

describe("template spec", () => {
  beforeEach(() => {
    cy.session("break store password", () => {
      cy.visit("" + Cypress.env("url").preview);
      unlockTheme.password_store();
    });
    cy.visit("" + Cypress.env("url").preview);
  });
  afterEach(() => {
    cy.wait(500);
  });

  context("Desktop Side Cart", () => {
    deviceDesktop.forEach((device) => {
      context(`Test for ${device.type}`, () => {
        beforeEach(() => {
          const [width, height] = device.viewport;
          cy.viewport(width, height);
        });

        it("open sidecart", () => {
          sideCart.openSideCart();
        });
        it("close sidecart", () => {
          sideCart.closeSideCart();
        });
        it("slide upsell next", () => {
          sideCart.openSideCart();
          sideCart.upsellNext();
        });
        it("slide upsell prev", () => {
          sideCart.openSideCart();
          sideCart.upsellNext();
          sideCart.upsellPrev();
        });
        it("add product upsell type 1", () => {
          sideCart.openSideCart();
          sideCart.addProductUpsell1();
        });
        it("add plus quantity product", () => {
          sideCart.openSideCart();
          sideCart.addProductUpsell1();
          sideCart.plusQuantity();
        });
        it("remove quantity product", () => {
          sideCart.openSideCart();
          sideCart.addProductUpsell1();
          sideCart.removeQuantity();
        });
        it("remove quantity product", () => {
          sideCart.openSideCart();
          sideCart.addProductUpsell1();
          sideCart.deleteProduct();
        });
        // sideCart.goCheckout()
      });
    });
  });
});

// context('mobile',()=>{
//   deviceMobile.forEach((device) => {
//     context(`Test for ${device.type}`, () => {
//       beforeEach(() => {
//         const [width, height] = device.viewport;
//         cy.viewport(width, height);
//       });
//       it.only("open sidecart", () => {
//         cy.visit("")
//         cy.get('#password').type("gradiweb{enter}")
//         sideCart.openSideCart();
//       });
//     })})
// })