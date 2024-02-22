export class SideCart {
  constructor() {
    const sideCartConfig = Cypress.env("side_cart");
    const globalConfig = Cypress.env("global");
    // Properties
    this.section = sideCartConfig.section;
    this.open = sideCartConfig.open;
    this.close = sideCartConfig.close;
    this.item = sideCartConfig.item_cart;
    this.input_quantity = sideCartConfig.input_quantity;
    this.delete = sideCartConfig.delete_product;

    this.next = globalConfig.slider_next;
    this.prev = globalConfig.slider_prev;
    this.cta = globalConfig.cta;
  }
  // Method to open the SideCart
  openSideCart() {
    cy.get(this.open)
      .click()
      .then(() => {
        cy.get(this.section).should("have.attr", "data-active", "true");
      });
  }
  // Method to close the SideCart
  closeSideCart() {
    this.openSideCart();
    cy.get(this.close)
      .click()
      .then(() => {
        cy.get(this.section).should("have.attr", "data-active", "false");
      });
  }
  // Method to next upsell
  upsellNext() {
    cy.get(this.section)
      .find(this.next)
      .click()
      .then(() => {
        cy.get(this.prev).should("not.have.attr", "aria-disabled", "false");
      });
  }
  // Method to prev upsell
  upsellPrev() {
    cy.get(this.section)
      .find(this.prev)
      .click()
      .then(() => {
        cy.get(this.prev).should("not.have.attr", "aria-disabled", "true");
      });
  }

  // Method to add product
  addProductUpsell1() {
    for (let i = 0; i < 3; i++) {
      cy.get(this.section).find(this.cta).first().click();
      cy.get(this.item).should("have.length", i + 1);
    }
  }

  addProductUpsell2() {
    cy.get(this.section).find(this.card_product).click();

    cy.get(this.sectionProductPage)
      .find(this.cta)
      .then(($button) => {
        if ($button.attr("disabled")) {
          cy.log("out of stock");
        } else {
          cy.wrap($button).click();
          cy.get(this.section)
            .should("have.attr", "data-active", "true")
            .find(this.item)
            .should("exist");
          this.closeSideCart();
          // add quantity of product and verify that the product is not duplicated
          cy.wrap($button)
            .click()
            .then(() => {
              cy.get(this.input_quantity).should(
                "have.attr",
                "data-quantity",
                "2"
              );
              cy.get(this.item).should("have.length", 1);
            });
        }
      });
  }

  // Method to add quantity product
  plusQuantity() {
    cy.get(this.section)
      .find('[data-action="plus"]')
      .first()
      .click()
      .then(() => {
        cy.get(this.section)
          .find(this.input_quantity)
          .first()
          .should("have.attr", "data-quantity", "2");
      });
  }
  // Method to remove quantity product
  removeQuantity() {
    cy.get(this.section).find('[data-action="subtr"]').first().click()
    .then(()=>{
      cy.get(this.item).then(($item_product)=>{
        if ($item_product.length > 0) {
          cy.get(this.input_quantity).first().should("have.attr", "data-quantity", "1")
        }else{
          cy.get(this.item).should("not.exist")
        }
      });
    });
  }
  // Method to Delete product
  deleteProduct() {
    cy.get(this.section)
      .find(this.delete)
      .first()
      .click()
      .then(()=>{
        cy.get(this.item).then(($item_product)=>{
          if ($item_product.length > 0) {
            cy.get(this.item).should("have.length", $item_product.length - 1);
          }else{
            cy.get(this.item).should("not.exist")
          }
        });
      });
  }
  // Method GO Checkout
  goCheckout() {
    cy.get(this.section)
      .find(this.cta)
      .eq(6) // modify the index
      .click()
      .then(() => {
        cy.wait(500);
        cy.url().should("include", "checkout");
      });
  }
}

export const sideCart = new SideCart();
