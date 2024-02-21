import { sideCart } from "../class/SideCart";
import { unlockTheme } from "../class/UnlockTheme";

describe("template spec", () => {
  beforeEach(() => {
    cy.session("break store password", () => {
      cy.visit("/");
      unlockTheme.password_store();
    });
    cy.visit("/");
  });
  afterEach(() => {
    cy.wait(500);
  });

  context("Basic behavior of the side cart", () => {
    it("open sidecart", () => {
      sideCart.openSideCart();
      // sideCart.closeSideCart();
      sideCart.upsellNext();
      sideCart.upsellPrev();
      sideCart.addProduct();
      sideCart.plusQuantity();
      sideCart.removeQuantity();
      sideCart.deleteProduct();
      sideCart.goCheckout();
    });
  });
});
